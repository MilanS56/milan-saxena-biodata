import { FamilyGraphRenderer } from "../components/FamilyGraphRenderer";
import type { FamilyMember } from "../types/family";

type FamilyLineageSectionProps = {
  family: FamilyMember;
};

export function FamilyLineageSection({ family }: FamilyLineageSectionProps) {
  return (
    <section id="lineage" className="relative px-0 py-20">
      <FamilyGraphRenderer root={family} />
    </section>
  );
}
