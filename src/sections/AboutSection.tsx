import { motion } from "framer-motion";
import { OrnamentDivider } from "../components/OrnamentDivider";
const krishnaImage = "/assets/decor/krishna.webp";
const rangoliOne = "/assets/decor/rangoli1.svg";
const rangoliTwo = "/assets/decor/rangoli2.svg";

type AboutSectionProps = {
  paragraphs: string[];
};

export function AboutSection({ paragraphs }: AboutSectionProps) {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 md:px-10">
      <img src={rangoliOne} alt="" className="pointer-events-none absolute -left-20 top-16 h-64 w-64 opacity-15" />
      <img src={rangoliTwo} alt="" className="pointer-events-none absolute right-4 bottom-10 h-52 w-52 rotate-45 opacity-15" />
      <div className="mx-auto max-w-6xl">
        <OrnamentDivider label="About" />
        <div className="grid gap-12 lg:grid-cols-[.64fr_.86fr_.7fr] lg:items-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="font-display text-5xl font-semibold leading-tight text-royal md:text-7xl"
          >
            Warm roots, modern rhythm.
          </motion.h2>
          <div className="space-y-6 text-lg leading-9 text-royal/75">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto grid min-h-[390px] w-full max-w-sm place-items-center"
          >
            <span className="absolute h-72 w-72 rounded-full border border-antique/25 bg-amberglow/10 shadow-gold" aria-hidden="true" />
            <span className="absolute h-56 w-56 rounded-full border border-mehendi/15" aria-hidden="true" />
            <img
              src={krishnaImage}
              alt="Lord Krishna blessing artwork"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 384px, 70vw"
              className="relative z-10 h-[24rem] w-[24rem] object-contain drop-shadow-[0_28px_42px_rgba(59,33,24,0.2)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


