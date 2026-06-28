import { ShareActions } from "../components/ShareActions";
const krishnaImage = "/assets/decor/krishna.png";
const rangoliOne = "/assets/decor/rangoli1.svg";
const rangoliTwo = "/assets/decor/rangoli2.svg";
import type { ProfileContent } from "../types/family";

type ClosingSectionProps = {
  contact: ProfileContent["contact"];
};

export function ClosingSection({ contact }: ClosingSectionProps) {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 text-center md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_44%,rgba(242,183,96,.28),transparent_32%),radial-gradient(circle_at_16%_70%,rgba(31,92,74,.12),transparent_30%)]" aria-hidden="true" />
      <img src={rangoliOne} alt="" className="pointer-events-none absolute -left-20 bottom-8 h-64 w-64 opacity-20" />
      <img src={rangoliTwo} alt="" className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rotate-45 opacity-20" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_.72fr] lg:text-left">
        <div>
          <p className="font-serif text-lg uppercase tracking-[0.34em] text-mehendi">With respect and warmth</p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-tight text-royal md:text-7xl">
            Share this profile with the family.
          </h2>
         
          <div className="mt-10 lg:flex lg:justify-start">
            <ShareActions phone={contact.phone} message={contact.whatsappMessage} targetId="profile-showcase" />
          </div>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <div className="border border-antique/30 bg-ivory/65 px-5 py-4 shadow-[0_16px_36px_rgba(59,33,24,.1)] backdrop-blur-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-mehendi">Father's Contact</p>
              <p className="mt-2 font-serif text-2xl text-royal">+91 {contact.parents.fatherPhone.slice(2)}</p>
            </div>
            <div className="border border-antique/30 bg-ivory/65 px-5 py-4 shadow-[0_16px_36px_rgba(59,33,24,.1)] backdrop-blur-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-mehendi">Mother's Contact</p>
              <p className="mt-2 font-serif text-2xl text-royal">+91 {contact.parents.motherPhone.slice(2)}</p>
            </div>
          </div>
        </div>
        <div className="relative mx-auto grid min-h-[420px] w-full max-w-md place-items-center">
          <span className="absolute h-80 w-80 rounded-full border border-antique/30 bg-amberglow/10 shadow-gold" aria-hidden="true" />
          <span className="absolute h-64 w-64 rounded-full border border-mehendi/15" aria-hidden="true" />
          <img
            src={krishnaImage}
            alt="Lord Krishna blessing artwork"
            className="relative z-10 h-[26rem] w-[26rem] object-contain drop-shadow-[0_34px_46px_rgba(59,33,24,0.22)]"
          />
        </div>
      </div>
    </section>
  );
}

