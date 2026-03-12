"use client";

import { type KeyboardEvent, type PointerEvent, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import VerticalCutReveal from "@/components/ui/verticle-cut";

const heroHeadlinePrimary = "TREK BEYOND SUMMITS";
const heroHeadlineSecondary = "BREATHE NEPAL DEEPER";
const trailerImages = [
  "https://i.imgur.com/1QkISzk.png",
  "https://i.imgur.com/dTDiDHn.jpeg",
  "https://i.imgur.com/joo4QP1.png",
  "https://i.imgur.com/82ZHnLf.png",
];
const trailerImageWidthPx = 200;
const trailerImageHeightPx = 300;
const trailerOffsetLeftPx = 90;
const trailerOffsetTopPx = 75;

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const arrowRef = useRef<SVGPolylineElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const currentImageIndexRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastImageTimeRef = useRef(Date.now());

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".scrollDist",
            start: "0 0",
            end: "100% 100%",
            scrub: 1,
          },
        })
        .fromTo(".sky", { y: 0 }, { y: -200 }, 0)
        .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
        .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
        .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
        .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
        .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
        .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const createImageTrail = (event: PointerEvent<HTMLDivElement>) => {
    if (!svgRef.current || !trailerRef.current || !galleryRef.current) {
      return;
    }

    const dx = event.clientX - lastMousePosRef.current.x;
    const dy = event.clientY - lastMousePosRef.current.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 100) {
      return;
    }

    const now = Date.now();

    if (now - lastImageTimeRef.current < 70) {
      return;
    }

    const sourceImages = galleryRef.current.querySelectorAll<HTMLImageElement>(".image-item");

    if (!sourceImages.length) {
      return;
    }

    const image = sourceImages[currentImageIndexRef.current].cloneNode(true) as HTMLImageElement;
    currentImageIndexRef.current =
      (currentImageIndexRef.current + 1) % sourceImages.length;

    const ctm = svgRef.current.getScreenCTM();

    if (!ctm) {
      return;
    }

    const scaleX = Math.hypot(ctm.a, ctm.b) || 1;
    const scaleY = Math.hypot(ctm.c, ctm.d) || 1;
    const svgPoint = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      ctm.inverse()
    );
    image.style.width = `${trailerImageWidthPx / scaleX}px`;
    image.style.height = `${trailerImageHeightPx / scaleY}px`;
    image.style.left = `${svgPoint.x - trailerOffsetLeftPx / scaleX}px`;
    image.style.top = `${svgPoint.y - trailerOffsetTopPx / scaleY}px`;

    trailerRef.current.appendChild(image);

    gsap.fromTo(
      image,
      {
        opacity: 1,
        scale: 0,
        rotation: Math.random() * 40 - 20,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)",
      }
    );

    gsap.to(image, {
      opacity: 1,
      scale: 0,
      duration: 0.6,
      delay: 0.6,
      ease: "power2.in",
      onComplete: () => image.remove(),
    });

    lastMousePosRef.current = { x: event.clientX, y: event.clientY };
    lastImageTimeRef.current = now;
  };

  const handleFramePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    lastMousePosRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleFramePointerLeave = () => {
    lastImageTimeRef.current = 0;
  };

  const animateArrowIn = () => {
    if (!arrowRef.current) {
      return;
    }

    gsap.to(arrowRef.current, {
      y: 10,
      duration: 0.8,
      ease: "back.inOut(3)",
      overwrite: "auto",
    });
  };

  const animateArrowOut = () => {
    if (!arrowRef.current) {
      return;
    }

    gsap.to(arrowRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const scrollToNextPanel = () => {
    gsap.to(window, {
      scrollTo: window.innerHeight,
      duration: 1.5,
      ease: "power1.inOut",
      overwrite: "auto",
    });
  };

  const handleArrowKeyDown = (event: KeyboardEvent<SVGRectElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    scrollToNextPanel();
  };

  return (
    <section ref={sectionRef} className="hero-parallax">
      <div className="scrollDist" aria-hidden="true" />

      <div className="hero-parallax__stage">
        <div
          className="hero-parallax__frame"
          onPointerEnter={handleFramePointerEnter}
          onPointerMove={createImageTrail}
          onPointerLeave={handleFramePointerLeave}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            <mask id="hero-cloud-mask">
              <g className="cloud1">
                <rect fill="#fff" width="100%" height="801" y="799" />
                <image
                  xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg"
                  width="1200"
                  height="800"
                />
              </g>
            </mask>

            <image
              className="sky"
              xlinkHref="https://assets.codepen.io/721952/sky.jpg"
              width="1200"
              height="590"
            />
            <image
              className="mountBg"
              xlinkHref="https://assets.codepen.io/721952/mountBg.png"
              width="1200"
              height="800"
            />
            <image
              className="mountMg"
              xlinkHref="https://assets.codepen.io/721952/mountMg.png"
              width="1200"
              height="800"
            />
            <image
              className="cloud2"
              xlinkHref="https://assets.codepen.io/721952/cloud2.png"
              width="1200"
              height="800"
            />
            <image
              className="mountFg"
              xlinkHref="https://assets.codepen.io/721952/mountFg.png"
              width="1200"
              height="800"
            />
            <image
              className="cloud1"
              xlinkHref="https://assets.codepen.io/721952/cloud1.png"
              width="1200"
              height="800"
            />
            <image
              className="cloud3"
              xlinkHref="https://assets.codepen.io/721952/cloud3.png"
              width="1200"
              height="800"
            />

            <foreignObject
              x="150"
              y="278"
              width="900"
              height="80"
              className="pointer-events-none"
            >
              <div className="pointer-events-none flex h-full w-full items-center justify-center">
                <VerticalCutReveal
                  splitBy="characters"
                  staggerDuration={0.018}
                  staggerFrom="first"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 22,
                  }}
                  containerClassName="font-azeret-mono w-full max-w-[78vw] items-center justify-center text-center text-[clamp(1.15rem,2.8vw,2.35rem)] leading-[0.92] font-black tracking-[0.16em] uppercase text-white"
                >
                  {heroHeadlinePrimary}
                </VerticalCutReveal>
              </div>
            </foreignObject>

            <polyline
              ref={arrowRef}
              className="arrow"
              fill="#fff"
              points="599,350 599,389 590,379 590,382 600,392 610,382 610,379 601,389 601,350"
            />

            <g mask="url(#hero-cloud-mask)">
              <rect fill="#fff" width="100%" height="100%" />
              <foreignObject x="0" y="0" width="1200" height="800">
                <div className="pointer-events-none relative h-full w-full">
                  <div
                    ref={trailerRef}
                    className="pointer-events-none absolute inset-0"
                  />

                  <div
                    ref={galleryRef}
                    aria-hidden="true"
                    className="image-gallery hidden"
                  >
                    {trailerImages.map((src, index) => (
                      <img
                        key={src}
                        src={src}
                        alt={`Trail ${index + 1}`}
                        className="image-item pointer-events-none absolute rounded-[3px] object-cover opacity-0"
                      />
                    ))}
                  </div>
                </div>
              </foreignObject>
              <foreignObject
                x="150"
                y="278"
                width="900"
                height="80"
                className="pointer-events-none"
              >
                <div className="pointer-events-none flex h-full w-full items-center justify-center">
                  <VerticalCutReveal
                    splitBy="characters"
                    staggerDuration={0.018}
                    staggerFrom="last"
                    reverse
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 22,
                      delay: 0.22,
                    }}
                    containerClassName="font-azeret-mono w-full max-w-[78vw] items-center justify-center text-center text-[clamp(1.15rem,2.8vw,2.35rem)] leading-[0.92] font-black tracking-[0.16em] uppercase text-[#162a43]"
                  >
                    {heroHeadlineSecondary}
                  </VerticalCutReveal>
                </div>
              </foreignObject>
            </g>

            <rect
              id="arrow-btn"
              className="hero-parallax__arrow-ui"
              width="120"
              height="120"
              fill="transparent"
              stroke="none"
              x="540"
              y="320"
              role="button"
              tabIndex={0}
              aria-label="Scroll to explore further"
              style={{ cursor: "pointer", outline: "none" }}
              onPointerDown={(event) => event.preventDefault()}
              onClick={scrollToNextPanel}
              onFocus={animateArrowIn}
              onBlur={animateArrowOut}
              onMouseEnter={animateArrowIn}
              onMouseLeave={animateArrowOut}
              onKeyDown={handleArrowKeyDown}
            />
          </svg>

        </div>
      </div>
    </section>
  );
}
