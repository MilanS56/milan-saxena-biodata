import { motion } from "framer-motion";
import { OrnamentDivider } from "../components/OrnamentDivider";
import type { ProfileContent } from "../types/family";

type ValuesSectionProps = {
  values: ProfileContent["values"];
};

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="relative overflow-hidden bg-royal px-6 py-24 text-ivory md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(242,183,96,.22),transparent_32%),radial-gradient(circle_at_78%_70%,rgba(31,92,74,.42),transparent_28%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <OrnamentDivider label="Values" />
        <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
          <h2 className="font-display text-5xl font-semibold leading-tight md:text-7xl">The home we hope to build.</h2>
          <div className="space-y-5">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="border-l-2 border-antique bg-ivory/7 p-6"
              >
                <h3 className="font-serif text-3xl text-sandal">{value.title}</h3>
                <p className="mt-3 text-base leading-8 text-ivory/72">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
