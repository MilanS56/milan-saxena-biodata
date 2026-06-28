type OrnamentDividerProps = {
  label?: string;
};

export function OrnamentDivider({ label }: OrnamentDividerProps) {
  return (
    <div className="my-10 flex items-center gap-4 text-antique" aria-hidden={!label}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-antique/70 to-antique/30" />
      <svg className="h-8 w-16 shrink-0" viewBox="0 0 120 56">
        <path d="M60 4c10 20 24 30 50 24-20 9-31 20-32 24-9-12-23-17-18-48z" fill="currentColor" opacity=".72" />
        <path d="M60 4C50 24 36 34 10 28c20 9 31 20 32 24 9-12 23-17 18-48z" fill="currentColor" opacity=".72" />
        <circle cx="60" cy="28" r="7" fill="currentColor" />
      </svg>
      {label ? <span className="font-serif text-sm uppercase tracking-[0.34em] text-royal/70">{label}</span> : null}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-antique/70 to-antique/30" />
    </div>
  );
}
