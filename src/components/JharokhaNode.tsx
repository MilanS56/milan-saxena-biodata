import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";
const jharokhaFrame = "/assets/frames/jharokha.png";
import type { FamilyMember } from "../types/family";

type JharokhaNodeProps = {
  member: FamilyMember;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  revealed: boolean;
  isRoot?: boolean;
  collapsed: boolean;
  hasChildren: boolean;
  onToggle: (id: string) => void;
  onRootReveal?: () => void;
};

const fallbackInitials = (name: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=f8e7bf,1f5c4a,7f2635&fontFamily=Georgia&fontWeight=600`;

export function JharokhaNode({
  member,
  x,
  y,
  width,
  height,
  depth,
  revealed,
  isRoot = false,
  collapsed,
  hasChildren,
  onToggle,
  onRootReveal,
}: JharokhaNodeProps) {
  const spouse = member.spouse;
  const displayName = spouse ? `${member.name} & ${spouse.name}` : member.name;
  const displayRelation = member.relation;
  const displayImage = member.image;
  const imageSlot = member.metadata?.imageSlot;
  const canToggle = hasChildren || isRoot;

  const handleClick = () => {
    if (isRoot && onRootReveal) {
      onRootReveal();
      return;
    }
    if (hasChildren) onToggle(member.id);
  };

  return (
    <AnimatePresence>
      {revealed ? (
        <motion.button
          type="button"
          initial={isRoot ? { opacity: 0, scale: 0.82, y: 32 } : { opacity: 0, scale: 0.52, y: -72 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: isRoot ? 0 : 0.1 + depth * 0.12 }}
          onClick={handleClick}
          onPointerDown={(event) => event.stopPropagation()}
          className={`absolute z-10 text-left outline-none ${canToggle ? "cursor-pointer" : "cursor-default"}`}
          style={{ left: x, top: y, width, height }}
          aria-label={`${displayName}, ${displayRelation}`}
        >
          <span className="absolute -inset-4 rounded-t-full bg-amberglow/25 blur-2xl" />
          <span className="relative block h-full w-full transition duration-500 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-antique">
            <img
              src={jharokhaFrame}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_26px_36px_rgba(59,33,24,0.22)]"
            />
            <span className="relative z-10 grid h-full place-items-center px-8 pb-10 pt-[74px]">
              <span className="grid place-items-center gap-2">
                <img
                  src={displayImage}
                  alt={`${displayName} photo slot${imageSlot ? `: ${imageSlot}` : ""}`}
                  title={imageSlot ? `Photo slot: ${imageSlot}.jpg` : displayName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackInitials(displayName);
                  }}
                  className={`${spouse ? "h-24 w-24" : "h-20 w-20"} rounded-full border-2 border-antique bg-ivory object-cover shadow-gold`}
                />
                <span className="max-w-[170px] text-center font-serif text-[0.95rem] font-semibold leading-tight text-royal">
                  {displayName}
                </span>
                <span className="max-w-[166px] text-center text-[0.58rem] uppercase tracking-[0.16em] text-mehendi">
                  {displayRelation}
                </span>
                <span className="min-h-8 max-w-[166px] text-center text-[0.68rem] leading-relaxed text-royal/72">
                  {member.metadata?.profession ?? member.title ?? member.metadata?.note ?? ""}
                  {member.metadata?.location ? `, ${member.metadata.location}` : ""}
                </span>
                {canToggle ? (
                  <span className="inline-flex items-center gap-1 bg-white/55 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-royal/70 shadow-sm">
                    {isRoot ? <Sparkles size={12} /> : collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
                    {isRoot ? "Unfold" : collapsed ? "Expand" : "Fold"}
                  </span>
                ) : null}
              </span>
            </span>
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

