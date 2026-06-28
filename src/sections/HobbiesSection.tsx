import { motion } from "framer-motion";
import { OrnamentDivider } from "../components/OrnamentDivider";
import type { ProfileContent } from "../types/family";

type HobbiesSectionProps = {
  hobbies: ProfileContent["hobbies"];
};

export function HobbiesSection({ hobbies }: HobbiesSectionProps) {
  return (
    <section className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <OrnamentDivider label="Interests" />
        <div className="grid gap-8 md:grid-cols-3">
          {hobbies.map((hobby, index) => (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative min-h-64 overflow-hidden border border-antique/35 bg-ivory/70 p-7 shadow-royal"
            >
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-antique/30" />
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-antique via-mehendi to-pomegranate" />
              <h3 className="font-display text-3xl font-semibold text-royal">{hobby.title}</h3>
              <p className="mt-5 text-base leading-8 text-royal/72">{hobby.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
