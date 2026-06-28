import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
const heroPortrait = "/assets/portraits/me-hero.webp";
const rangoliOne = "/assets/decor/rangoli1.svg";
const rangoliTwo = "/assets/decor/rangoli2.svg";
import type { ProfileContent } from "../types/family";

type HeroSectionProps = {
  profile: ProfileContent["person"];
};

export function HeroSection({ profile }: HeroSectionProps) {
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!portraitRef.current) return;
    gsap.fromTo(
      portraitRef.current,
      { y: 36, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 1.25, ease: "power3.out" },
    );
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-ivory px-6 pb-10 pt-6 text-royal md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_23%,rgba(242,183,96,.38),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(127,38,53,.13),transparent_30%),linear-gradient(135deg,#fff9ef_0%,#f7e6c6_48%,#fff7e8_100%)]" />
      <div className="hero-paper-texture absolute inset-0 opacity-70" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(30deg,rgba(197,159,90,.24)_12%,transparent_12.5%,transparent_87%,rgba(197,159,90,.24)_87.5%,rgba(197,159,90,.24)),linear-gradient(150deg,rgba(127,38,53,.18)_12%,transparent_12.5%,transparent_87%,rgba(127,38,53,.18)_87.5%,rgba(127,38,53,.18))] [background-size:58px_96px]" />
      <div className="hero-palace-silhouette absolute inset-x-0 bottom-0 h-[42vh] opacity-20" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(180deg,transparent,rgba(127,38,53,.14))]" />
      <img src={rangoliOne} alt="" className="hero-mandala-watermark pointer-events-none absolute left-[42%] top-[-4rem] h-[29rem] w-[29rem] opacity-[.075]" />
      <img src={rangoliTwo} alt="" className="pointer-events-none absolute -right-24 bottom-8 h-96 w-96 rotate-45 opacity-[.14]" />
      <div className="absolute left-[9%] top-[18%] hidden h-20 w-48 border-y border-antique/25 md:block" aria-hidden="true">
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-antique/55 to-transparent" />
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-antique/50 bg-ivory/60" />
      </div>
      {Array.from({ length: 30 }).map((_, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-antique/60 animate-floatDust"
          style={{
            width: `${index % 3 === 0 ? 3 : 5}px`,
            height: `${index % 3 === 0 ? 3 : 5}px`,
            left: `${7 + ((index * 19) % 86)}%`,
            top: `${10 + ((index * 29) % 76)}%`,
            animationDelay: `${index * 0.28}s`,
            opacity: 0.26 + (index % 5) * 0.08,
          }}
        />
      ))}

      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between py-3">
        <a href="#top" className="font-serif text-xl font-semibold tracking-wide text-royal">
          {profile.name}'s Biodata
        </a>
        <div className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.28em] text-royal/70 md:flex">
          <a href="#about">About</a>
          <a href="#details">Details</a>
          <a href="#lineage">Lineage</a>
          <a href="#contact">Share</a>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5.5rem)] max-w-7xl items-center gap-8 lg:grid-cols-[.86fr_1.14fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-2xl pt-4 lg:pt-0"
        >
          
          <h1 className="font-display text-6xl font-semibold leading-[0.9] text-royal md:text-8xl xl:text-9xl">
            {profile.name}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-antique" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-antique to-transparent" />
            <span className="h-2 w-2 rotate-45 bg-antique/70" />
            <span className="h-px w-28 bg-gradient-to-r from-antique/70 to-transparent" />
          </div>
          <div className="mt-5 max-w-xl border border-antique/35 bg-ivory/76 p-5 shadow-[0_24px_70px_rgba(59,33,24,.16)] backdrop-blur-xl">
            <p className="text-lg leading-8 text-royal/78 md:text-xl">{profile.intro}</p>
          </div>

        </motion.div>

        <div ref={portraitRef} className="relative mx-auto grid min-h-[580px] w-full max-w-[680px] place-items-center lg:min-h-[700px]">
          <div className="absolute h-[42rem] w-[42rem] rounded-full bg-amberglow/28 blur-3xl" aria-hidden="true" />
          <div className="absolute h-[34rem] w-[28rem] rounded-[999px] border border-antique/25 bg-ivory/20 shadow-[0_48px_120px_rgba(59,33,24,.18)]" aria-hidden="true" />
          <div className="absolute bottom-8 h-52 w-[88%] bg-royal/18 blur-3xl" aria-hidden="true" />
          <div className="hero-portrait-float relative h-[600px] w-[435px] md:h-[700px] md:w-[505px]">
            <div className="absolute inset-[5%] rounded-[999px] bg-gradient-to-b from-antique/32 via-ivory/40 to-pomegranate/10 blur-2xl" aria-hidden="true" />
            <div className="hero-oval-frame absolute inset-x-[6%] inset-y-[4%] overflow-hidden rounded-[999px] bg-ivory/45 shadow-[0_38px_100px_rgba(59,33,24,.24)]">
              <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_48%_22%,rgba(242,183,96,.30),transparent_32%),linear-gradient(90deg,rgba(255,247,232,.38),transparent_24%,transparent_72%,rgba(59,33,24,.16)),linear-gradient(180deg,transparent_70%,rgba(59,33,24,.20))]" aria-hidden="true" />
              <img
                src={heroPortrait}
                alt={profile.name}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(min-width: 1024px) 505px, 90vw"
                className="h-full w-full scale-[1.04] object-cover object-[50%_34%] saturate-[1.08] contrast-[1.05]"
              />
            </div>
            <div className="absolute inset-x-[2%] inset-y-[1%] rounded-[999px] border border-antique/50" aria-hidden="true" />
            <div className="absolute inset-x-[9%] inset-y-[7%] rounded-[999px] border border-ivory/70" aria-hidden="true" />
            <div className="absolute -right-5 top-[18%] h-28 w-28 rounded-full border border-antique/35 bg-ivory/35 blur-[1px]" aria-hidden="true" />
            <div className="absolute -left-5 bottom-[22%] h-24 w-24 rounded-full border border-mehendi/15 bg-sandal/20 blur-[1px]" aria-hidden="true" />
            <div className="absolute bottom-[4%] left-1/2 z-30 -translate-x-1/2 border border-antique/45 bg-ivory/84 px-6 py-3 text-center shadow-gold backdrop-blur-xl">
              <p className="font-serif text-2xl font-semibold leading-none text-royal">{profile.name}</p>
              <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-mehendi">{profile.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




