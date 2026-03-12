"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Testimonial from "./testimonial";

type GalleryImage = {
  alt: string;
  areaClassName: string;
  objectClassName?: string;
  src: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/images/annapurna.webp",
    alt: "Annapurna trekking scene",
    areaClassName: "[grid-area:1/1/3/2]",
  },
  {
    src: "/images/sky.jpeg",
    alt: "Soft blue Himalayan sky",
    areaClassName: "[grid-area:1/2/2/3]",
    objectClassName: "object-top",
  },
  {
    src: "/images/langtang.webp",
    alt: "Langtang mountains at sunset",
    areaClassName: "[grid-area:2/2/4/3]",
  },
  {
    src: "/images/mountain.png",
    alt: "Snow peak framed by evening light",
    areaClassName: "[grid-area:1/3/3/4]",
  },
  {
    src: "/images/mardi-himal.webp",
    alt: "Trekkers climbing a mountain trail",
    areaClassName: "[grid-area:3/1/4/2]",
  },
  {
    src: "/images/manaslu.webp",
    alt: "Manaslu trek route through the valley",
    areaClassName: "[grid-area:3/3/5/4]",
  },
  {
    src: "/images/everest.webp",
    alt: "Everest base camp landscape",
    areaClassName: "[grid-area:4/1/5/2]",
  },
  {
    src: "/images/sky.jpeg",
    alt: "Cloud break above the mountains",
    areaClassName: "[grid-area:4/2/5/3]",
    objectClassName: "object-center",
  },
];

gsap.registerPlugin(ScrollTrigger, Flip);

export default function Gallary() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const flipContextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const gallery = galleryRef.current;

    if (!wrap || !gallery) {
      return;
    }

    const createTween = () => {
      const items = gallery.querySelectorAll<HTMLElement>(
        "[data-gallery-item]",
      );

      if (!items.length) {
        return;
      }

      flipContextRef.current?.revert();
      gallery.dataset.layout = "bento";

      flipContextRef.current = gsap.context(() => {
        gallery.dataset.layout = "final";
        const flipState = Flip.getState(items);
        gallery.dataset.layout = "bento";

        const flip = Flip.to(flipState, {
          ease: "expo.inOut",
          simple: true,
          targets: items,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: gallery,
              start: "center center",
              end: "+=100%",
              scrub: true,
              pin: wrap,
              invalidateOnRefresh: true,
            },
          })
          .add(flip, 0);

        return () => {
          gallery.dataset.layout = "bento";
          gsap.set(items, { clearProps: "all" });
        };
      }, wrap);
    };

    createTween();
    window.addEventListener("resize", createTween);

    return () => {
      window.removeEventListener("resize", createTween);
      flipContextRef.current?.revert();
    };
  }, []);

  return (
    <>
      <section
        ref={wrapRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <div
          ref={galleryRef}
          id="gallery-8"
          data-layout="bento"
          className="relative grid h-full w-full flex-none content-center justify-center gap-[1vh] [grid-template-columns:repeat(3,32.5vw)] [grid-template-rows:repeat(4,23vh)] data-[layout=final]:[grid-template-columns:repeat(3,100vw)] data-[layout=final]:[grid-template-rows:repeat(4,49.5vh)]"
        >
          {galleryImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              data-gallery-item
              className={`relative overflow-hidden bg-neutral-200 ${image.areaClassName}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover ${image.objectClassName ?? ""}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 py-12 sm:px-12 lg:px-20 bg-[#f8fafb]">
        <Testimonial/>
      </section>
    </>
  );
}
