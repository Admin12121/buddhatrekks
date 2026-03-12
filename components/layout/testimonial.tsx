import { cn } from "@/lib/utils";

const TestimonialStars = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-x-1", className)} aria-hidden>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        className={cn("fill-[#FFF049]", className)}
      >
        <g clipPath="url(#clip0_6163_15851)">
          <path d="M5.44254 0.622517C5.64879 0.136244 6.35124 0.136245 6.55749 0.622518L7.77475 3.49259C7.86175 3.69759 8.05835 3.83766 8.28402 3.8554L11.4436 4.10381C11.979 4.14589 12.196 4.80103 11.7882 5.14366L9.38089 7.16583C9.20896 7.3103 9.13382 7.53695 9.18636 7.75288L9.92182 10.7765C10.0464 11.2888 9.47816 11.6937 9.01982 11.4192L6.31474 9.79886C6.12152 9.68312 5.87851 9.68312 5.6853 9.79886L2.9802 11.4192C2.52187 11.6937 1.95358 11.2888 2.07819 10.7765L2.81366 7.75288C2.86619 7.53695 2.7911 7.3103 2.61916 7.16583L0.211838 5.14366C-0.196031 4.80103 0.0210408 4.14589 0.556376 4.10381L3.71602 3.8554C3.94171 3.83766 4.1383 3.69759 4.22525 3.49259L5.44254 0.622517Z" />
        </g>
        <defs>
          <clipPath id="clip0_6163_15851">
            <rect
              width="12"
              height="12"
              fill="white"
              transform="translate(0 0.257812)"
            />
          </clipPath>
        </defs>
      </svg>
    ))}
  </div>
);

import NumberAnimation from "@/components/animation/number-animation";
import RevealAnimation from "@/components/animation/reveal-animation";
import Image from "next/image";

const Testimonial = () => {
  return (
    <section className="py-14 md:py-24 lg:py-28 xl:py-36 2xl:py-44">
      <div className="main-container space-y-10 md:space-y-14">
        {/* Content Section */}
        <div className="space-y-4 text-center md:pb-5">
          <RevealAnimation delay={0.2}>
            <h2 className="font-manrope text-manrope-heading-4 md:text-manrope-heading-3 lg:text-manrope-heading-2 text-background-13/90 font-medium max-md:leading-[1.1]">
              The Trust{" "}
              <span className="font-instrument-serif text-background-13/30 italic">
                We&#39;ve Earned
              </span>
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={0.3}>
            <p className="font-inter-tight text-tagline-2 text-background-13/60">
              Hear from real users who've experienced the magic of Nepal with
              us.
              <br className="hidden md:block" />
              Their stories of their Journeys.
            </p>
          </RevealAnimation>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* Top Row */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Stat Card 1 */}
              <RevealAnimation delay={0.1}>
                <div
                  className="relative h-[397px] w-full overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-7 md:p-10.5"
                  style={{ backgroundImage: "url('/images/sky.jpeg')" }}
                >
                  <div className="absolute -bottom-20 left-0 z-5 h-[194px] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.80)_10.91%,rgba(255,255,255,0.31)_76.79%)] blur-[45px]" />
                  <div className="relative z-10 flex h-full flex-col justify-end gap-1 sm:gap-2">
                    <h3 className="font-instrument-serif text-is-heading-4 text-background-6 flex items-center">
                      <NumberAnimation
                        number={1259}
                        speed={2000}
                        interval={200}
                        rooms={4}
                        heightSpaceRatio={2.9}
                      />
                      +
                    </h3>
                    <p className="font-inter-tight text-tagline-3 text-background-13/60">
                      Satisfied clients and counting!
                    </p>
                  </div>
                </div>
              </RevealAnimation>

              {/* Testimonial Card - Sofia Patel */}
              <RevealAnimation delay={0.2}>
                <div className="bg-background-8 flex h-[397px] w-full flex-col justify-between rounded-xl p-7 md:p-10.5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <TestimonialStars className="fill-background-6!" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="font-inter-tight text-tagline-2 text-background-13/60 font-normal">
                        We did the Lantang trek and it was amazing thaks to
                        buddha trakks! They help us and made our trek the best.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <figure className="size-12 overflow-hidden rounded-full">
                      <Image
                        src="/images/opai-avatar-img-01.png"
                        alt="Sofia Patel"
                        width={48}
                        height={48}
                        className="size-full object-cover"
                      />
                    </figure>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-instrument-serif text-is-heading-6 text-background-6">
                        Sofia Patel
                      </h4>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            </div>

            {/* Testimonial Card - Liam Thompson */}
            <RevealAnimation delay={0.1}>
              <div className="bg-background-8 flex min-h-[300px] w-full flex-col justify-between rounded-xl p-7 md:p-10.5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <TestimonialStars className="fill-background-6!" />
                  </div>
                  <p className="font-inter-tight text-tagline-2 text-background-13/60 font-normal">
                    Best travel agency in Nepal! I&#39;ve done 2 treks with them
                    and couldn&#39;t be more satisfied. All the staff is very
                    kind, helpful and reliable. They helped me with everything I
                    needed during all my staying in Nepal.
                  </p>
                </div>
                <div className="space-y-2">
                  <figure className="size-12 overflow-hidden rounded-full">
                    <Image
                      src="/images/opai-avatar-img-02.png"
                      alt="Liam Thompson"
                      width={48}
                      height={48}
                      className="size-full object-cover"
                    />
                  </figure>
                  <div className="space-y-0.5">
                    <h4 className="font-instrument-serif text-is-heading-6 text-background-6">
                      Liam Thompson
                    </h4>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="flex flex-col gap-8 sm:flex-row">
              {/* Testimonial Card - Ethan Garcia */}
              <RevealAnimation delay={0.3}>
                <div className="bg-background-8 flex h-[300px] w-full flex-col justify-between rounded-xl p-7 md:p-10.5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-0.5">
                      <TestimonialStars className="fill-background-6! gap-0.5" />
                    </div>
                    <p className="font-inter-tight text-tagline-2 text-background-13/60 font-normal">
                      this place is awesome recommend the Buddha Trekks
                    </p>
                  </div>
                  <div className="space-y-2">
                    <figure className="size-12 overflow-hidden rounded-full">
                      <Image
                        src="/images/opai-avatar-img-03.png"
                        alt="Ethan Garcia"
                        width={48}
                        height={48}
                        className="size-full object-cover"
                      />
                    </figure>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-instrument-serif text-is-heading-6 text-background-6">
                        Jane Exell
                      </h4>
                    </div>
                  </div>
                </div>
              </RevealAnimation>

              {/* Stat Card 2 */}
              <RevealAnimation delay={0.4}>
                <div className="bg-background-8 relative h-[300px] w-full overflow-hidden rounded-xl p-7 md:p-10.5">
                  <figure className="absolute -top-[43%] -right-[34%] z-0 size-full -rotate-1">
                    <Image
                      src="/images/opai-15.png"
                      alt="gradient-img"
                      width={400}
                      height={400}
                      className="size-full object-cover"
                    />
                  </figure>
                  <div className="relative z-10 flex h-full flex-col justify-end gap-1 sm:gap-2">
                    <h3 className="font-instrument-serif text-is-heading-4 text-background-6 flex items-center">
                      <NumberAnimation
                        number={90}
                        speed={2000}
                        interval={200}
                        rooms={2}
                        heightSpaceRatio={2.9}
                        showPercentage
                      />
                    </h3>
                    <p className="font-inter-tight text-tagline-3 text-background-13/60">
                      Positive Response from our customers!
                    </p>
                  </div>
                </div>
              </RevealAnimation>
            </div>

            {/* Stat Card 3 - Full Width */}
            <RevealAnimation delay={0.1}>
              <div
                className="relative h-[397px] w-full overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-7 md:p-10.5"
                style={{ backgroundImage: "url('/images/annapurna.webp')" }}
              >
                <div className="absolute -bottom-20 left-0 z-5 h-[194px] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.80)_10.91%,rgba(255,255,255,0.31)_76.79%)] blur-[45px]" />
                <div className="relative z-10 flex h-full flex-col justify-end gap-1 sm:gap-2">
                  <h3 className="font-instrument-serif text-is-heading-4 text-background-6 flex items-center">
                    <NumberAnimation
                      number={157}
                      speed={2000}
                      interval={200}
                      rooms={3}
                      heightSpaceRatio={2.9}
                    />
                    +
                  </h3>
                  <p className="font-inter-tight text-tagline-2 text-background-13/60 font-normal">
                    Treks and tour destinations explored with us!
                  </p>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
