"use client";

import { type PointerEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Clock3, MapPin } from "lucide-react";
import { DirectionAwareHover } from "@/components//ui/direction-aware-hover";

type TrekPackage = {
  id: string;
  name: string;
  imageUrl: string;
  distance: string;
  duration: string;
};

type RenderCard = {
  key: string;
  ghosted?: boolean;
  pkg: TrekPackage;
};

type OverlayCard = {
  height: number;
  key: string;
  left: number;
  pkg: TrekPackage;
  side: "left" | "right";
  top: number;
  width: number;
};

const packages: TrekPackage[] = [
  {
    id: "langtang",
    name: "Langtang Valley Trek",
    imageUrl: "/images/langtang.webp",
    distance: "65 KM",
    duration: "10 Days",
  },
  {
    id: "manaslu",
    name: "Manaslu Circuit Trek",
    imageUrl: "/images/manaslu.webp",
    distance: "180 KM",
    duration: "14 Days",
  },
  {
    id: "everest",
    name: "Everest Base Camp Trek",
    imageUrl: "/images/everest.webp",
    distance: "130 KM",
    duration: "15 Days",
  },
  {
    id: "mardi",
    name: "Mardi Himal Trek",
    imageUrl: "/images/mardi-himal.webp",
    distance: "60 KM",
    duration: "9 Days",
  },
  {
    id: "annapurna",
    name: "Annapurna Circuit Trek",
    imageUrl: "/images/annapurna.webp",
    distance: "230 KM",
    duration: "21 Days",
  },
];

const dragThreshold = 96;
const visibleCardCount = 4;
const rotationDuration = 0.82;
const rotationEase = "power2.inOut";
const getTransformOrigin = (side: "left" | "right") =>
  side === "left" ? "bottom left" : "bottom right";

export default function Packages() {
  const cardKeyRef = useRef(visibleCardCount);
  const trackRef = useRef<HTMLDivElement>(null);
  const startIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const dragRef = useRef({
    active: false,
    deltaX: 0,
    pointerId: -1,
    startX: 0,
  });

  const createRenderCard = (pkg: TrekPackage): RenderCard => ({
    key: `${pkg.id}-${cardKeyRef.current++}`,
    pkg,
  });

  const [renderCardsState, setRenderCardsState] = useState<RenderCard[]>(() =>
    Array.from({ length: visibleCardCount }, (_, offset) => {
      const pkg = packages[offset % packages.length];

      return {
        key: `${pkg.id}-${offset}`,
        pkg,
      };
    }),
  );
  const [leavingOverlayState, setLeavingOverlayState] =
    useState<OverlayCard | null>(null);
  const [enteringOverlayState, setEnteringOverlayState] =
    useState<OverlayCard | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const renderCardsRef = useRef(renderCardsState);

  const setRenderCards = (cards: RenderCard[]) => {
    renderCardsRef.current = cards;
    setRenderCardsState(cards);
  };

  const renderPackageCard = (pkg: TrekPackage) => (
    <DirectionAwareHover
      imageUrl={pkg.imageUrl}
      className="!h-[39rem] !w-full rounded-[3px]"
      childrenClassName="bottom-6 left-6 right-6"
    >
      <div
        className="flex flex-col gap-3"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        <p className="text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
          {pkg.name}
        </p>
        <div className="flex flex-wrap items-center gap-5 text-[1rem] font-medium text-white/95">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-4" />
            <span>{pkg.distance}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="size-4" />
            <span>{pkg.duration}</span>
          </span>
        </div>
      </div>
    </DirectionAwareHover>
  );

  const rotatePackages = (forward: boolean) => {
    const track = trackRef.current;

    if (!track || isAnimatingRef.current) {
      return;
    }

    const currentCards = renderCardsRef.current;
    const currentElements = Array.from(
      track.querySelectorAll<HTMLElement>(
      "[data-package-card]",
      ),
    );

    if (!currentCards.length || !currentElements.length) {
      return;
    }

    const trackRect = track.getBoundingClientRect();
    const currentRects = currentElements.map((element) =>
      element.getBoundingClientRect(),
    );
    const slotDelta =
      currentRects.length > 1
        ? currentRects[1].left - currentRects[0].left
        : currentRects[0].width;
    const nextStartIndex =
      (startIndexRef.current + (forward ? 1 : -1) + packages.length) %
      packages.length;
    const enteringSide = forward ? "right" : "left";
    const leavingSide = forward ? "left" : "right";
    const enteringPackage =
      packages[
        forward
          ? (startIndexRef.current + visibleCardCount) % packages.length
          : (startIndexRef.current - 1 + packages.length) % packages.length
      ];
    const leavingIndex = forward ? 0 : currentCards.length - 1;
    const leavingCard = currentCards[leavingIndex];
    const targetIndex = forward ? currentCards.length - 1 : 0;
    const leavingRect = currentRects[leavingIndex];
    const enteringRect = currentRects[targetIndex];
    const stagedCards = currentCards.map((card, index) =>
      index === leavingIndex
        ? {
            ...card,
            ghosted: true,
          }
        : card,
    );
    const nextCards = forward
      ? [
          ...currentCards.slice(1),
          {
            ...createRenderCard(enteringPackage),
          },
        ]
      : [
          {
            ...createRenderCard(enteringPackage),
          },
          ...currentCards.slice(0, -1),
        ];
    let hasFinalized = false;

    const finalizeRotation = () => {
      if (hasFinalized) {
        return;
      }

      hasFinalized = true;
      startIndexRef.current = nextStartIndex;
      isAnimatingRef.current = false;

      flushSync(() => {
        setEnteringOverlayState(null);
        setLeavingOverlayState(null);
        setRenderCards(
          nextCards.map((card) => ({
            ...card,
            ghosted: false,
          })),
        );
      });

      gsap.set(track.querySelectorAll("[data-package-card]"), {
        clearProps: "transform",
      });
    };

    isAnimatingRef.current = true;

    flushSync(() => {
      setRenderCards(stagedCards);
      setEnteringOverlayState({
        height: enteringRect.height,
        key: `${enteringPackage.id}-entering-overlay`,
        left: enteringRect.left - trackRect.left,
        pkg: enteringPackage,
        side: enteringSide,
        top: enteringRect.top - trackRect.top,
        width: enteringRect.width,
      });
      setLeavingOverlayState(
        {
          height: leavingRect.height,
          key: leavingCard.key,
          left: leavingRect.left - trackRect.left,
          pkg: leavingCard.pkg,
          side: leavingSide,
          top: leavingRect.top - trackRect.top,
          width: leavingRect.width,
        },
      );
    });

    const movingElements = Array.from(
      track.querySelectorAll<HTMLElement>("[data-package-card]"),
    ).filter((element) => element.dataset.packageGhosted !== "true");
    const leavingOverlayElement = track.querySelector<HTMLElement>(
      `[data-package-leaving-overlay="${leavingCard.key}"]`,
    );
    const enteringOverlayElement = track.querySelector<HTMLElement>(
      `[data-package-entering-overlay="${enteringPackage.id}-entering-overlay"]`,
    );
    const shiftX = forward ? -slotDelta : slotDelta;
    const timeline = gsap.timeline({
      defaults: {
        duration: rotationDuration,
        ease: rotationEase,
        overwrite: "auto",
      },
      onComplete: () => {
        flushSync(() => {
          setRenderCards(nextCards);
        });
        finalizeRotation();
      },
      onInterrupt: finalizeRotation,
    });

    if (movingElements.length) {
      timeline.to(
        movingElements,
        {
          x: shiftX,
        },
        0,
      );
    }

    if (leavingOverlayElement) {
      timeline.to(
        leavingOverlayElement,
        {
          opacity: 0,
          scale: 0,
          transformOrigin: getTransformOrigin(leavingSide),
        },
        0,
      );
    }

    if (enteringOverlayElement) {
      timeline.fromTo(
        enteringOverlayElement,
        {
          opacity: 0,
          scale: 0,
          x: -shiftX,
          transformOrigin: getTransformOrigin(enteringSide),
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
        },
        0,
      );
    }
  };

  const resetTrackPosition = (onComplete?: () => void) => {
    const track = trackRef.current;

    if (!track) {
      onComplete?.();
      return;
    }

    gsap.to(track, {
      x: 0,
      duration: 0.2,
      ease: "power3.out",
      overwrite: "auto",
      onComplete,
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (isAnimatingRef.current) {
      return;
    }

    dragRef.current = {
      active: true,
      deltaX: 0,
      pointerId: event.pointerId,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (
      !track ||
      !dragRef.current.active ||
      dragRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    dragRef.current.deltaX = event.clientX - dragRef.current.startX;

    gsap.set(track, {
      x: dragRef.current.deltaX,
      overwrite: "auto",
    });
  };

  const finishDrag = (
    event: PointerEvent<HTMLDivElement>,
    cancelled = false,
  ) => {
    if (
      !dragRef.current.active ||
      dragRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const { deltaX } = dragRef.current;

    dragRef.current = {
      active: false,
      deltaX: 0,
      pointerId: -1,
      startX: 0,
    };

    setIsDragging(false);

    if (!cancelled && Math.abs(deltaX) >= dragThreshold) {
      resetTrackPosition(() => {
        rotatePackages(deltaX < 0);
      });
      return;
    }

    resetTrackPosition();
  };

  return (
    <section className="px-2 pb-8 pt-6 md:px-4 lg:px-5 lg:pb-10">
      <div className="mx-auto w-full max-w-[1860px]">
        <div className="relative mb-7 flex flex-col items-center gap-4 lg:mb-8">
          <div className="max-w-5xl text-center">
            <h2
              className="text-balance text-[clamp(2rem,3.4vw,4.2rem)] font-black uppercase leading-none tracking-[-0.06em] text-black"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <span>Our </span>
              <span className="inline-block bg-indigo-500 px-3 py-1 text-white">
                Best Selling
              </span>
              <span> Packages</span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-4xl text-balance text-base leading-7 text-black/75 md:text-[1.08rem]"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Explore our most popular and highly rated travel packages, curated
              for unforgettable adventures.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <button
              type="button"
              aria-label="Previous package"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
              onClick={() => rotatePackages(true)}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next package"
              className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
              onClick={() => rotatePackages(false)}
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden touch-pan-y select-none">
          <div
            ref={trackRef}
            className={`relative flex gap-2 will-change-transform ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={(event) => finishDrag(event)}
            onPointerCancel={(event) => finishDrag(event, true)}
          >
            {leavingOverlayState ? (
              <div
                className="pointer-events-none absolute z-0 overflow-hidden"
                style={{
                  height: leavingOverlayState.height,
                  left: leavingOverlayState.left,
                  top: leavingOverlayState.top,
                  width: leavingOverlayState.width,
                }}
              >
                <div
                  data-package-leaving-overlay={leavingOverlayState.key}
                  className="h-full w-full"
                  style={{
                    transformOrigin: getTransformOrigin(leavingOverlayState.side),
                  }}
                >
                  {renderPackageCard(leavingOverlayState.pkg)}
                </div>
              </div>
            ) : null}
            {enteringOverlayState ? (
              <div
                className="pointer-events-none absolute z-[2] overflow-hidden"
                style={{
                  height: enteringOverlayState.height,
                  left: enteringOverlayState.left,
                  top: enteringOverlayState.top,
                  width: enteringOverlayState.width,
                }}
              >
                <div
                  data-package-entering-overlay={enteringOverlayState.key}
                  className="h-full w-full"
                  style={{
                    transformOrigin: getTransformOrigin(enteringOverlayState.side),
                  }}
                >
                  {renderPackageCard(enteringOverlayState.pkg)}
                </div>
              </div>
            ) : null}
            {renderCardsState.map((card) => (
              <div
                key={card.key}
                data-package-card
                data-package-ghosted={card.ghosted ? "true" : undefined}
                className="relative z-[1] min-w-0 shrink-0 basis-[84vw] md:basis-[calc((100%-0.5rem)/2)] xl:basis-[calc((100%-1.5rem)/4)]"
                style={card.ghosted ? { visibility: "hidden" } : undefined}
              >
                {renderPackageCard(card.pkg)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
