import { motion } from "framer-motion";
import { OrnamentDivider } from "../components/OrnamentDivider";
import type { ProfileContent } from "../types/family";

type DetailsSectionProps = {
  details: ProfileContent["details"];
};

export function DetailsSection({ details }: DetailsSectionProps) {
  return (
    <section id="details" className="relative bg-mehendi px-6 py-24 text-ivory md:px-10">
      <div className="absolute inset-0 bg-jali bg-[length:18px_18px] opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <OrnamentDivider label="Details" />
        <div className="grid gap-8 md:grid-cols-[.8fr_1.2fr]">
          <h2 className="font-display text-5xl font-semibold leading-tight md:text-7xl">A concise portrait.</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {details.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="border border-ivory/18 bg-ivory/8 p-5 backdrop-blur"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.26em] text-sandal">{item.label}</dt>
                <dd className="mt-2 font-serif text-2xl text-ivory">{item.value}</dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
