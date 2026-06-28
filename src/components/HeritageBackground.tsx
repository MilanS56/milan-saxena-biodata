const rangoliOne = "/assets/decor/rangoli1.svg";
const rangoliTwo = "/assets/decor/rangoli2.svg";

export function HeritageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(242,183,96,.3),transparent_34%),linear-gradient(180deg,rgba(255,247,232,.82),rgba(255,247,232,.98)_60%,rgba(232,207,159,.38))]" />
      <div className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(30deg,rgba(59,33,24,.34)_12%,transparent_12.5%,transparent_87%,rgba(59,33,24,.34)_87.5%,rgba(59,33,24,.34)),linear-gradient(150deg,rgba(59,33,24,.34)_12%,transparent_12.5%,transparent_87%,rgba(59,33,24,.34)_87.5%,rgba(59,33,24,.34)),linear-gradient(30deg,rgba(59,33,24,.34)_12%,transparent_12.5%,transparent_87%,rgba(59,33,24,.34)_87.5%,rgba(59,33,24,.34)),linear-gradient(150deg,rgba(59,33,24,.34)_12%,transparent_12.5%,transparent_87%,rgba(59,33,24,.34)_87.5%,rgba(59,33,24,.34))] [background-position:0_0,0_0,22px_38px,22px_38px] [background-size:44px_76px]" />
      <img src={rangoliOne} alt="" className="absolute -left-16 top-24 h-56 w-56 opacity-30" />
      <img src={rangoliTwo} alt="" className="absolute -right-14 top-44 h-48 w-48 rotate-45 opacity-25" />      <svg className="absolute bottom-0 left-0 h-[52vh] w-full opacity-30" viewBox="0 0 1400 520" preserveAspectRatio="none">
        <path d="M0 520V210h92v-72h78v72h74v-96h96v96h70v-60h70v60h74V92h116v118h72v-80h84v80h68v-104h102v104h72v-72h78v72h92v310z" fill="#7f2635" />
        {Array.from({ length: 16 }).map((_, index) => {
          const x = 68 + index * 82;
          return (
            <path
              key={x}
              d={`M${x} 276c0-25 19-45 42-45s42 20 42 45v86H${x}z`}
              fill="#fff7e8"
              opacity="0.62"
            />
          );
        })}
      </svg>
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-antique/60 animate-floatDust"
          style={{
            left: `${6 + ((index * 17) % 88)}%`,
            top: `${12 + ((index * 23) % 68)}%`,
            animationDelay: `${index * 0.45}s`,
          }}
        />
      ))}
    </div>
  );
}



