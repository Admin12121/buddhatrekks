import Image from "next/image";

import RevealAnimation from "@/components/animation/reveal-animation";
import FaqContact from "@/components/layout/faq-contact";
import {
  Accordion,
  AccordionAction,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

const faqData = [
  {
    value: "item-one",
    question: "Which trekking destinations do you organize in Nepal?",
    answer:
      "We organize some of Nepal's most loved trekking experiences, including Everest Base Camp, Annapurna Circuit, Langtang Valley, Mardi Himal, Manaslu Circuit, and custom cultural or village journeys. We help you choose the right route based on your time, fitness, and travel goals.",
  },
  {
    value: "item-two",
    question: "Are your guides licensed and experienced?",
    answer:
      "Yes. We work with highly qualified local guides who understand the trails, mountain conditions, local culture, and day-to-day trekking logistics. Their experience helps make your journey safer, smoother, and much more enjoyable.",
  },
  {
    value: "item-three",
    question: "Can beginners join your trekking packages?",
    answer:
      "Absolutely. Not every trek in Nepal is only for experienced hikers. We can recommend beginner-friendly routes, gentler itineraries, and proper acclimatization plans so first-time trekkers can enjoy the mountains with confidence.",
  },
  {
    value: "item-four",
    question: "What is usually included in a trekking package?",
    answer:
      "Most packages include guides, permits, transportation, accommodation during the trek, and pre-trip support. Depending on the route and package, porter service, meals, airport pickup, and extra sightseeing activities can also be included.",
  },
  {
    value: "item-five",
    question: "When is the best time to go trekking in Nepal?",
    answer:
      "Spring and autumn are the most popular seasons because of clearer skies, better mountain views, and more stable trail conditions. Winter and monsoon can still be rewarding for selected routes, and we can guide you toward the best option for your travel dates.",
  },
  {
    value: "item-six",
    question: "Can you customize the itinerary for our group?",
    answer:
      "Yes. We can tailor a trip around your group size, trekking experience, travel style, available days, and budget. Whether you want a private trek, a family-friendly route, or extra cultural activities before or after the trek, we can build a plan that fits.",
  },
  {
    value: "item-seven",
    question: "How do you handle safety and altitude concerns?",
    answer:
      "Safety is a core part of every journey we run. We plan proper acclimatization, keep a close eye on pace and wellness on the trail, and adjust the itinerary when needed. Our guides know when to rest, when to descend, and how to respond to changing mountain conditions.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-background-6 py-10 md:py-28 lg:py-30 xl:py-40 2xl:py-44 mt-[200px]">
      <div className="main-container space-y-10 md:space-y-19.5">
        <div className="space-y-1.5 text-center md:space-y-3">
          <h2 className="font-sora text-sora-heading-4 md:text-sora-heading-3 lg:text-sora-heading-2 max-md:-leading-[110%] mx-auto max-w-[700px] font-normal">
            <span className="font-normal text-white/90"> Your questions, </span>
            <span className="text-white/30"> answered </span>
          </h2>
          <p className="font-inter-tight text-tagline-2 mx-auto max-w-[300px] text-white/60">
            Everything you need to know before booking your trek in Nepal.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-y-10 overflow-hidden md:items-center lg:flex-row lg:items-start lg:gap-x-10 xl:gap-x-[100px]">
          <RevealAnimation direction="left" offset={100} delay={0.3}>
            <div className="w-full max-w-[595px]">
              <Accordion defaultOpen="item-one" type="single">
                {faqData.map((item) => (
                  <AccordionItem
                    key={item.value}
                    value={item.value}
                    className="border-stroke-1/10 rounded-lg border px-6"
                  >
                    <AccordionAction>{item.question}</AccordionAction>
                    <AccordionContent contentClassName="font-inter-tight text-tagline-2 max-w-[531px] cursor-text pb-6 font-extralight text-white/50">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </RevealAnimation>

          <FaqContact />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
