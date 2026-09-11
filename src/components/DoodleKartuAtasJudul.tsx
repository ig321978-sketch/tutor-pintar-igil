import type { ReactNode } from "react";

const TINTA = "#1C01A5";

function garisUmum() {
  return {
    fill: "none",
    stroke: TINTA,
    strokeWidth: 3.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

function Bingkai({
  alt,
  children,
}: {
  alt: string;
  children: ReactNode;
}) {
  return (
    <figure
      className="relative mx-auto mb-4 w-full max-w-[220px] rotate-[-0.5deg] md:max-w-[260px]"
      aria-label={alt}
    >
      <div className="rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea] p-2.5 shadow-inner">
        <svg viewBox="0 0 200 200" className="h-auto w-full" role="img">
          <title>{alt}</title>
          <rect width="200" height="200" fill="#fbf6ea" />
          {children}
        </svg>
      </div>
    </figure>
  );
}

function Anak({ x = 100, y = 118 }: { x?: number; y?: number }) {
  const g = garisUmum();
  return (
    <g>
      <circle cx={x} cy={y - 38} r="16" {...g} />
      <path d={`M${x} ${y - 22} L${x} ${y + 18}`} {...g} />
      <path d={`M${x} ${y - 8} L${x - 22} ${y + 6}`} {...g} />
      <path d={`M${x} ${y - 8} L${x + 22} ${y + 6}`} {...g} />
      <path d={`M${x} ${y + 18} L${x - 16} ${y + 42}`} {...g} />
      <path d={`M${x} ${y + 18} L${x + 16} ${y + 42}`} {...g} />
    </g>
  );
}

function Adegan({ id }: { id: string }) {
  const g = garisUmum();
  switch (id) {
    case "pai-1-bab1-A":
      return (
        <g>
          <path d="M48 58 L48 152 L100 136 L152 152 L152 58 L100 74 Z" {...g} />
          <path d="M100 74 L100 136" {...g} />
          <path d="M62 88 C78 80 86 92 100 86" {...g} />
          <path d="M62 108 C80 98 88 112 100 104" {...g} />
        </g>
      );
    case "pai-1-bab1-B":
      return (
        <g>
          <path d="M86 78 Q100 58 114 78" {...g} />
          <path d="M86 128 Q100 148 114 128" {...g} />
          <path d="M128 70 Q146 62 138 88" {...g} />
          <circle cx="100" cy="104" r="28" {...g} />
        </g>
      );
    case "pai-1-bab1-C":
      return (
        <g>
          <Anak x={86} y={120} />
          <path d="M128 58 L168 58 L168 118 L148 108 L128 118 Z" {...g} />
          <path d="M138 76 L158 76" {...g} />
          <path d="M138 90 L158 90" {...g} />
        </g>
      );
    case "pai-1-bab2-A":
      return (
        <g>
          <path d="M32 92 L100 42 L168 92" {...g} />
          <path d="M44 92 L44 158 L156 158 L156 92" {...g} />
          <path d="M62 158 L62 112" {...g} />
          <path d="M86 158 L86 112" {...g} />
          <path d="M114 158 L114 112" {...g} />
          <path d="M138 158 L138 112" {...g} />
          <path d="M100 158 L100 112" {...g} />
        </g>
      );
    case "pai-1-bab2-B":
      return (
        <g>
          <path d="M100 46 L100 70" {...g} />
          <path d="M42 88 Q100 48 158 88" {...g} />
          <path d="M38 88 Q100 168 162 88" {...g} />
          <circle cx="70" cy="150" r="8" {...g} />
          <circle cx="100" cy="156" r="8" {...g} />
          <circle cx="130" cy="150" r="8" {...g} />
        </g>
      );
    case "pai-1-bab2-C":
      return (
        <g>
          <Anak x={78} y={118} />
          <path d="M122 96 L168 96 L158 128 L112 128 Z" {...g} />
          <circle cx="154" cy="156" r="12" {...g} />
          <path d="M146 156 L138 164" {...g} />
        </g>
      );
    case "pai-1-bab3-A":
      return (
        <g>
          <Anak x={78} y={116} />
          <ellipse cx="142" cy="128" rx="28" ry="16" {...g} />
          <path d="M118 120 L166 120" {...g} />
          <path d="M142 88 L142 112" {...g} />
          <path d="M132 98 L152 98" {...g} />
        </g>
      );
    case "pai-1-bab3-B":
      return (
        <g>
          <Anak x={70} y={120} />
          <Anak x={130} y={120} />
          <circle cx="100" cy="86" r="14" {...g} />
        </g>
      );
    case "pai-1-bab4-A":
      return (
        <g>
          <path d="M56 78 L86 78 L96 128 L46 128 Z" {...g} />
          <path d="M114 78 L144 78 L154 128 L104 128 Z" {...g} />
          <path d="M70 58 Q78 48 86 58" {...g} />
          <path d="M128 58 Q136 48 144 58" {...g} />
          <path d="M40 148 L160 148" {...g} />
        </g>
      );
    case "pai-1-bab4-B":
      return (
        <g>
          <path d="M70 46 L130 46 L148 158 L52 158 Z" {...g} />
          <path d="M84 70 Q100 90 116 70" {...g} />
          <path d="M88 108 L112 108" {...g} />
          <path d="M100 46 L100 28" {...g} />
        </g>
      );
    case "pai-1-bab5-A":
      return (
        <g>
          <path d="M70 158 L130 158 L124 96 L76 96 Z" {...g} />
          <path d="M64 96 L136 96 L100 58 Z" {...g} />
          <circle cx="100" cy="128" r="10" {...g} />
          <path d="M40 168 Q100 148 160 168" {...g} />
        </g>
      );
    case "pai-1-bab5-B":
      return (
        <g>
          <Anak x={72} y={118} />
          <rect x="118" y="96" width="40" height="28" rx="6" {...g} />
          <path d="M126 110 L138 118 L154 100" {...g} />
        </g>
      );
    case "pai-1-bab6-A":
      return (
        <g>
          <rect x="48" y="52" width="44" height="44" rx="8" {...g} />
          <rect x="108" y="52" width="44" height="44" rx="8" {...g} />
          <rect x="48" y="112" width="44" height="44" rx="8" {...g} />
          <rect x="108" y="112" width="44" height="44" rx="8" {...g} />
        </g>
      );
    case "pai-1-bab6-B":
      return (
        <g>
          <circle cx="100" cy="92" r="36" {...g} />
          <path d="M100 56 L100 48" {...g} />
          <path d="M64 92 L56 92" {...g} />
          <path d="M144 92 L152 92" {...g} />
          <path d="M76 68 L70 60" {...g} />
          <path d="M124 68 L130 60" {...g} />
          <path d="M40 148 Q100 128 160 148" {...g} />
        </g>
      );
    case "pai-1-bab7-A":
      return (
        <g>
          <path d="M28 88 L100 38 L172 88" {...g} />
          <path d="M40 88 L40 160 L160 160 L160 88" {...g} />
          <path d="M58 160 L58 108" {...g} />
          <path d="M82 160 L82 108" {...g} />
          <path d="M100 160 L100 108" {...g} />
          <path d="M118 160 L118 108" {...g} />
          <path d="M142 160 L142 108" {...g} />
        </g>
      );
    case "pai-1-bab7-B":
      return (
        <g>
          <Anak x={70} y={122} />
          <Anak x={130} y={122} />
          <path d="M54 58 Q70 42 86 58" {...g} />
          <path d="M114 58 Q130 42 146 58" {...g} />
          <path d="M48 70 Q70 78 88 70" {...g} />
          <path d="M112 70 Q130 78 152 70" {...g} />
        </g>
      );
    case "pai-1-bab8-A":
      return (
        <g>
          <Anak x={74} y={118} />
          <rect x="118" y="88" width="46" height="38" rx="6" {...g} />
          <path d="M118 102 L141 88 L164 102" {...g} />
          <path d="M141 88 L141 126" {...g} />
        </g>
      );
    case "pai-1-bab8-B":
      return (
        <g>
          <path d="M100 158 L100 96" {...g} />
          <path d="M100 96 Q72 86 68 62 Q86 70 100 58 Q114 70 132 62 Q128 86 100 96" {...g} />
          <path d="M48 158 L72 128 L88 146 L112 118 L132 140 L152 122 L164 158 Z" {...g} />
        </g>
      );
    case "pai-1-bab9-A":
      return (
        <g>
          <path d="M62 46 L90 46 L90 78" {...g} />
          <path d="M90 70 Q110 92 90 108" {...g} />
          <path d="M86 118 Q100 138 86 150" {...g} />
          <Anak x={128} y={120} />
        </g>
      );
    case "pai-1-bab9-B":
      return (
        <g>
          <path d="M48 128 L88 128 L96 152 L40 152 Z" {...g} />
          <path d="M112 128 L152 128 L160 152 L104 152 Z" {...g} />
          <path d="M56 128 L56 108 L80 108 L80 128" {...g} />
          <path d="M120 128 L120 108 L144 108 L144 128" {...g} />
        </g>
      );
    case "pai-1-bab10-A":
      return (
        <g>
          <Anak x={100} y={108} />
          <path d="M40 162 Q70 140 100 158 Q130 140 160 162 Q130 176 100 168 Q70 176 40 162" {...g} />
        </g>
      );
    case "pai-1-bab10-B":
      return (
        <g>
          <circle cx="100" cy="100" r="46" {...g} />
          <path d="M62 92 Q88 78 118 96 Q142 110 148 88" {...g} />
          <path d="M70 128 Q100 118 136 132" {...g} />
          <path d="M100 54 L100 146" {...g} />
        </g>
      );
    default:
      return (
        <g>
          <path d="M58 70 L58 148 L100 134 L142 148 L142 70 L100 84 Z" {...g} />
          <path d="M100 84 L100 134" {...g} />
        </g>
      );
  }
}

export default function DoodleKartuAtasJudul({
  id,
  alt,
}: {
  id: string;
  alt: string;
}) {
  return (
    <Bingkai alt={alt}>
      <Adegan id={id} />
    </Bingkai>
  );
}
