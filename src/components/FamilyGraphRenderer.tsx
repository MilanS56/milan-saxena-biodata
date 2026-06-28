import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { OrnamentDivider } from "./OrnamentDivider";
import type { FamilyMember } from "../types/family";

const jharokhaFrame = "/assets/frames/jharokha.webp";
const familyPreviewImage = "/assets/family/family.webp";

type FamilyGraphRendererProps = {
  root: FamilyMember;
};

type Wing = "paternal" | "maternal";
type JharokhaSize = "large" | "medium" | "small";

type PreviewImage = {
  name: string;
  relation: string;
  src: string;
};

const sizeClass: Record<JharokhaSize, string> = {
  large: "h-[22rem] w-[16.5rem] md:h-[24rem] md:w-[18rem]",
  medium: "h-[20rem] w-[15.5rem]",
  small: "h-[17.5rem] w-[13.5rem]",
};

const photoClass: Record<JharokhaSize, string> = {
  large: "h-[5.7rem] w-[5.7rem]",
  medium: "h-[4.65rem] w-[4.65rem]",
  small: "h-[3.85rem] w-[3.85rem]",
};

const contentClass: Record<JharokhaSize, string> = {
  large: "px-7 pb-10 pt-[5.15rem]",
  medium: "px-6 pb-9 pt-[4.55rem]",
  small: "px-5 pb-8 pt-[4.05rem]",
};

const namePlateClass: Record<JharokhaSize, string> = {
  large: "max-w-[12.1rem] px-3.5 py-3",
  medium: "max-w-[10.8rem] px-3 py-2.5",
  small: "max-w-[9.4rem] px-2.5 py-2",
};

const nameClass: Record<JharokhaSize, string> = {
  large: "text-[1rem] md:text-[1.08rem] leading-[1.05]",
  medium: "text-[0.9rem] leading-[1.04]",
  small: "text-[0.78rem] leading-[1.05]",
};

const relationClass: Record<JharokhaSize, string> = {
  large: "text-[0.57rem] tracking-[0.2em]",
  medium: "text-[0.52rem] tracking-[0.18em]",
  small: "text-[0.47rem] tracking-[0.15em]",
};

const noteClass: Record<JharokhaSize, string> = {
  large: "mt-1.5 text-[0.63rem] leading-[1.45]",
  medium: "mt-1 text-[0.58rem] leading-[1.4]",
  small: "mt-1 text-[0.52rem] leading-[1.35]",
};

const wingTitle: Record<Wing, string> = {
  paternal: "Paternal Family Wing",
  maternal: "Maternal Family Wing",
};

const imageVariants = [".webp", ".jpg", ".jpeg", ".png"];

const fallbackInitials = (name: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=f8e7bf,1f5c4a,7f2635&fontFamily=Georgia&fontWeight=600`;

const displayName = (member: FamilyMember) =>
  member.spouse ? `${member.name} & ${member.spouse.name}` : member.name;

const findMember = (member: FamilyMember, id: string): FamilyMember | undefined => {
  if (member.id === id) return member;
  for (const child of member.children ?? []) {
    const found = findMember(child, id);
    if (found) return found;
  }
  return undefined;
};

const findWingRoot = (root: FamilyMember, wing: Wing) =>
  root.children?.find((member) => member.side === wing) ?? root.children?.[0] ?? root;

const supportingText = (member: FamilyMember) =>
  member.metadata?.profession ?? member.metadata?.note ?? member.title ?? "";

const nextVariantSrc = (src: string, attempt: number) => {
  const base = src.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  return `${base}${imageVariants[attempt]}`;
};

function FamilyImageModal({
  image,
  onClose,
}: {
  image: PreviewImage | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-royal/80 px-4 py-6 backdrop-blur-md md:px-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-antique/55 bg-[linear-gradient(180deg,rgba(255,249,239,.98),rgba(246,232,206,.94))] p-4 shadow-[0_28px_90px_rgba(0,0,0,.34)] md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-antique/40 bg-ivory/90 text-royal shadow-gold transition hover:bg-white"
              aria-label="Close image preview"
            >
              <X size={18} />
            </button>
            <div className="grid gap-5 md:grid-cols-[1.05fr_.7fr] md:items-center">
              <div className="overflow-hidden rounded-[1.5rem] border border-antique/45 bg-ivory/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]">
                <img
                  src={image.src}
                  alt={image.name}
                  loading="eager"
                  decoding="async"
                  className="max-h-[72vh] w-full rounded-[1.1rem] object-contain bg-[#f7ecd8]"
                />
              </div>
              <div className="px-2 pb-2 md:px-4">
                <p className="font-serif text-xs uppercase tracking-[0.32em] text-mehendi">Family Portrait</p>
                <h4 className="mt-3 font-display text-3xl font-semibold leading-tight text-royal md:text-4xl">
                  {image.name}
                </h4>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-antique">
                  {image.relation}
                </p>
                <div className="mt-6 h-px w-24 bg-gradient-to-r from-antique via-antique/45 to-transparent" />
                <p className="mt-6 text-base leading-8 text-royal/74">
                  A closer look at this family photograph within the same warm heritage presentation.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FamilyJharokhaCard({
  member,
  size,
  active = false,
  onClick,
  onImagePreview,
}: {
  member: FamilyMember;
  size: JharokhaSize;
  active?: boolean;
  onClick?: () => void;
  onImagePreview?: (image: PreviewImage) => void;
}) {
  const name = displayName(member);
  const hasChildren = Boolean(member.children?.length);
  const interactive = Boolean(onClick && hasChildren);
  const note = supportingText(member);
  const memberImage = member.image ?? fallbackInitials(name);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const attempt = Number(image.dataset.attempt ?? "0") + 1;
    image.dataset.attempt = String(attempt);

    if (member.image && attempt < imageVariants.length) {
      image.src = nextVariantSrc(member.image, attempt);
      return;
    }

    image.onerror = null;
    image.src = fallbackInitials(name);
  };

  const handleImagePreview = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const image = event.currentTarget.querySelector("img");
    if (!image || !onImagePreview) return;

    onImagePreview({
      name,
      relation: member.relation,
      src: image.currentSrc || image.src || memberImage,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`group relative shrink-0 outline-none ${sizeClass[size]} ${interactive ? "cursor-pointer hover:-translate-y-1" : "cursor-default"}`}
      aria-label={`${name}, ${member.relation}`}
    >
      <span className={`absolute -inset-3 rounded-t-full blur-2xl transition ${active ? "bg-amberglow/45" : "bg-antique/14"}`} />
      <img
        src={jharokhaFrame}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_22px_34px_rgba(59,33,24,.22)]"
      />
      <span className={`relative z-10 flex h-full flex-col items-center justify-center ${contentClass[size]}`}>
        <button
          type="button"
          onClick={handleImagePreview}
          className="group/image rounded-full focus:outline-none focus:ring-2 focus:ring-antique/70 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label={`Open ${name} image`}
        >
          <img
            src={memberImage}
            alt={`${name} photo slot${member.metadata?.imageSlot ? `: ${member.metadata.imageSlot}` : ""}`}
            title={member.metadata?.imageSlot ? `Photo slot: ${member.metadata.imageSlot}` : name}
            data-attempt="0"
            loading="lazy"
            decoding="async"
            sizes="96px"
            onError={handleImageError}
            className={`${photoClass[size]} rounded-full border-2 border-antique bg-ivory object-cover shadow-gold ring-4 ring-ivory/80 transition duration-300 group-hover/image:scale-[1.04] group-hover/image:shadow-[0_14px_28px_rgba(59,33,24,.24)]`}
          />
        </button>
        <span
          className={`mt-2.5 grid w-full justify-items-center rounded-[1.1rem] border border-antique/55 bg-gradient-to-b from-ivory/95 via-[#fff7e8]/92 to-sandal/80 ${namePlateClass[size]} shadow-[0_12px_28px_rgba(59,33,24,.18),inset_0_1px_0_rgba(255,255,255,.82)] backdrop-blur-md`}
        >
          <span className={`text-center font-semibold uppercase text-mehendi ${relationClass[size]}`}>
            {member.relation}
          </span>
          <span className={`mt-1 text-center font-serif font-bold text-[#301713] [text-wrap:balance] ${nameClass[size]}`}>
            {name}
          </span>
          {note || member.metadata?.location ? (
            <span className={`max-w-full text-center font-medium text-royal/72 ${noteClass[size]}`}>
              {note}
              {member.metadata?.location ? `, ${member.metadata.location}` : ""}
            </span>
          ) : null}
        </span>
        {interactive ? (
          <span className="mt-2 inline-flex items-center gap-1 border border-antique/50 bg-royal/85 px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-ivory shadow-[0_8px_18px_rgba(59,33,24,.2)] transition group-hover:bg-mehendi">
            {active ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            {active ? "Open" : "View"}
          </span>
        ) : null}
      </span>
    </motion.div>
  );
}

function CoreFamilyCourtyard({
  root,
  onImagePreview,
}: {
  root: FamilyMember;
  onImagePreview: (image: PreviewImage) => void;
}) {
  const parents = findMember(root, "parents-family");
  const children = parents?.children ?? [];
  if (!parents || !children.length) return null;
  return (
    <div className="relative overflow-hidden border-y border-antique/30 bg-ivory/80 px-5 py-10 shadow-royal backdrop-blur md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(242,183,96,.25),transparent_32%),linear-gradient(90deg,rgba(127,38,53,.08),transparent_24%,transparent_76%,rgba(31,92,74,.09))]" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto max-w-3xl">
          <OrnamentDivider label="Lineage" />
        </div>
        <h3 className="-mt-1 font-display text-4xl font-semibold text-royal md:text-6xl">Core Family</h3>
        <div className="mt-6 grid justify-items-center gap-6">
          <FamilyJharokhaCard member={parents} size="large" onImagePreview={onImagePreview} />
          <div className="grid w-full max-w-xl justify-items-center gap-0" aria-hidden="true">
            <span className="h-8 w-px bg-gradient-to-b from-antique to-royal/35" />
            <span className="h-px w-[min(22rem,72vw)] bg-gradient-to-r from-transparent via-antique to-transparent" />
          </div>
          <div className="grid w-full max-w-[44rem] grid-cols-1 justify-items-center gap-y-6 sm:grid-cols-2 sm:gap-x-10">
            {children.map((child) => (
              <div key={child.id} className="grid justify-items-center gap-2.5">
                <span className="h-6 w-px bg-gradient-to-b from-royal/35 to-antique" aria-hidden="true" />
                <FamilyJharokhaCard member={child} size="medium" onImagePreview={onImagePreview} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FamilyWing({
  root,
  wing,
  onImagePreview,
}: {
  root: FamilyMember;
  wing: Wing;
  onImagePreview: (image: PreviewImage) => void;
}) {
  const [path, setPath] = useState<string[]>([]);
  const wingRoot = useMemo(() => findWingRoot(root, wing), [root, wing]);

  const toggleBranch = (member: FamilyMember, depth: number) => {
    if (!member.children?.length) return;
    setPath((previous) => {
      const next = depth === 0 ? [member.id] : [...previous.slice(0, depth), member.id];
      const same = previous.length === next.length && previous.every((id, index) => id === next[index]);
      return same ? previous.slice(0, depth) : next;
    });
  };

  const renderMember = (member: FamilyMember, depth: number, size: JharokhaSize) => {
    const active = path[depth] === member.id;
    const showChildren = active && Boolean(member.children?.length);

    return (
      <motion.div key={member.id} layout className="grid justify-items-center gap-4">
        <FamilyJharokhaCard
          member={member}
          size={size}
          active={active}
          onClick={() => toggleBranch(member, depth)}
          onImagePreview={onImagePreview}
        />
        <AnimatePresence>
          {showChildren ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="grid justify-items-center gap-4"
            >
              <div className="grid justify-items-center gap-2" aria-hidden="true">
                <span className="h-8 w-px bg-gradient-to-b from-antique to-royal/35" />
                <span className="h-px w-28 bg-gradient-to-r from-transparent via-antique to-transparent" />
              </div>
              <div className="flex flex-wrap justify-center gap-x-7 gap-y-8">
                {member.children!.map((child) =>
                  renderMember(child, depth + 1, child.children?.length ? "medium" : "small"),
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={wing}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.38 }}
        className="grid justify-items-center"
      >
        {renderMember(wingRoot, 0, "medium")}
      </motion.div>
    </AnimatePresence>
  );
}

function FamilyHeritageExplorer({
  root,
  onImagePreview,
}: {
  root: FamilyMember;
  onImagePreview: (image: PreviewImage) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeWing, setActiveWing] = useState<Wing>("paternal");

  return (
    <div className="relative overflow-hidden bg-royal px-5 py-14 text-ivory shadow-royal md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(242,183,96,.24),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(31,92,74,.42),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <p className="font-serif text-sm uppercase tracking-[0.34em] text-sandal">Extended Family</p>
        <h3 className="mt-3 font-display text-4xl font-semibold md:text-6xl">Explore Family</h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-ivory/72">
          Open one wing at a time for a guided introduction to the wider family, without overwhelming the page.
        </p>

        {!open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-xl"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-antique/45 bg-[linear-gradient(180deg,rgba(255,247,232,.18),rgba(242,183,96,.08))] p-3 shadow-[0_28px_70px_rgba(0,0,0,.24)]">
              <div className="absolute inset-x-[9%] top-4 h-16 rounded-full bg-amberglow/25 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.4rem] border border-antique/35 bg-ivory/10 p-2 backdrop-blur-md">
                <img
                  src={familyPreviewImage}
                  alt="Extended family collage"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 576px, 92vw"
                  className="h-[18rem] w-full rounded-[1rem] object-cover"
                />
              </div>
              <p className="relative mt-4 font-serif text-lg text-ivory">A glimpse of the wider family</p>
            </div>
          </motion.div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-8 inline-flex min-h-12 items-center gap-2 border border-antique/60 bg-ivory px-5 text-sm font-semibold uppercase tracking-[0.2em] text-royal shadow-gold transition hover:-translate-y-0.5 hover:bg-sandal focus:outline-none focus:ring-2 focus:ring-antique"
        >
          <Sparkles size={17} />
          {open ? "Close Family" : "Explore Family"}
        </button>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-10 rounded-none border border-antique/35 bg-ivory/92 p-4 text-royal shadow-royal md:p-8">
                <div className="mx-auto mb-8 flex w-fit border border-antique/45 bg-ivory p-1 shadow-royal">
                  {(["paternal", "maternal"] as Wing[]).map((wing) => (
                    <button
                      key={wing}
                      type="button"
                      onClick={() => setActiveWing(wing)}
                      className={`px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition ${
                        activeWing === wing ? "bg-royal text-ivory shadow-gold" : "text-royal/70 hover:bg-antique/15"
                      }`}
                    >
                      {wingTitle[wing]}
                    </button>
                  ))}
                </div>
                <FamilyWing root={root} wing={activeWing} onImagePreview={onImagePreview} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function FamilyGraphRenderer({ root }: FamilyGraphRendererProps) {
  const [previewImage, setPreviewImage] = useState<PreviewImage | null>(null);

  return (
    <>
      <div id="family-map" className="grid gap-0">
        <CoreFamilyCourtyard root={root} onImagePreview={setPreviewImage} />
        <FamilyHeritageExplorer root={root} onImagePreview={setPreviewImage} />
      </div>
      <FamilyImageModal image={previewImage} onClose={() => setPreviewImage(null)} />
    </>
  );
}






