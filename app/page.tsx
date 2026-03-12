import Hero from "@/components/layout/hero";
import Gallary from "@/components/layout/gallary";
import Packages from "@/components/layout/packages";
import Why from "@/components/layout/why";
import FAQ from "@/components/layout/faq";
import Blog from "@/components/layout/blog";
import Image from "next/image";
import Contact from "@/components/layout/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Packages />
      <Why />
      <Gallary />
      <section className="bg-background-6 relative py-10 pt-20 sm:py-20 md:py-28 lg:py-36 xl:py-40 2xl:py-44">
        <div className="absolute -top-1 left-0 z-4 h-[796px] w-full md:h-[760px] lg:-top-4 2xl:-top-12">
          <Image
            src={"/images/opai-1.png"}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            fill
          />
        </div>
        <FAQ />
        <Blog />
      </section>
      <Contact />
    </>
  );
}
