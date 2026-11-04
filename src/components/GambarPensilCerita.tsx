type AdeganCerita =
  | "garden-visit"
  | "picking-fruits"
  | "counting-table"
  | "empty-basket"
  | "comparing-scales"
  | "frog-river"
  | "number-tree";

function Matahari() {
  const sinar = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <g>
      <circle cx="362" cy="38" r="15" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.2" />
      <circle cx="362" cy="38" r="15" fill="none" stroke="#FACC15" strokeWidth="1" strokeDasharray="3 2" />
      {sinar.map((sudut) => {
        const rad = (sudut * Math.PI) / 180;
        return (
          <line
            key={sudut}
            x1={362 + Math.cos(rad) * 20}
            y1={38 + Math.sin(rad) * 20}
            x2={362 + Math.cos(rad) * 31}
            y2={38 + Math.sin(rad) * 31}
            stroke="#EAB308"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function LangitRumput({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <filter id={`${id}-bintik`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix
            values="0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0 0.16  0 0 0 0.45 0"
          />
        </filter>
        <pattern id={`${id}-arsir`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#166534" strokeWidth="1.1" opacity="0.28" />
        </pattern>
      </defs>
      <rect width="420" height="220" fill="#FFF8EC" />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d={`M ${12 + (i % 4) * 104} ${18 + Math.floor(i / 4) * 18} q 16 -6 32 1 t 28 -1`}
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      <path d="M0 156 Q 90 138 180 154 T 360 148 T 420 156 L 420 220 L 0 220 Z" fill="#86EFAC" />
      <path d="M0 156 Q 90 138 180 154 T 360 148 T 420 156" fill="none" stroke="#166534" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="0" y="156" width="420" height="64" fill={`url(#${id}-arsir)`} />
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={`rumput-${i}`}
          d={`M ${10 + i * 23} 176 q 3 -12 7 1`}
          fill="none"
          stroke="#15803D"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
      <rect width="420" height="220" filter={`url(#${id}-bintik)`} opacity="0.45" />
    </g>
  );
}

function AnakPensil({ x, y, baju, rambut }: { x: number; y: number; baju: string; rambut: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-11 16 Q 0 26 11 16 L 13 40 Q 0 46 -13 40 Z" fill={baju} stroke="#7C2D12" strokeWidth="2" />
      <path d="M-6 40 L-8 52 M6 40 L9 52" fill="none" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="0" cy="0" r="13" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
      <path d="M-12 0 Q -8 -16 0 -14 Q 8 -17 12 -1" fill={rambut} stroke="#7C2D12" strokeWidth="1.6" />
      <circle cx="-4" cy="2" r="1.5" fill="#1C01A5" />
      <circle cx="4" cy="2" r="1.5" fill="#1C01A5" />
      <path d="M-3 7 Q 0 10 3 7" fill="none" stroke="#B45309" strokeWidth="1.4" strokeLinecap="round" />
    </g>
  );
}

function BurungPensil({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="16" rx="16" ry="15" fill="#FDE68A" stroke="#92400E" strokeWidth="2" />
      <circle cx="0" cy="2" r="13" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
      <circle cx="-5" cy="2" r="4.5" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="1.6" />
      <circle cx="5" cy="2" r="4.5" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="1.6" />
      <circle cx="-5" cy="2.5" r="1.8" fill="#1C01A5" />
      <circle cx="5" cy="2.5" r="1.8" fill="#1C01A5" />
      <path d="M-2 8 L0 12 L2 8 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      <path d="M-14 -2 L14 -2 L10 -10 L-10 -10 Z" fill="#1C01A5" />
      <rect x="-7" y="-15" width="14" height="5" rx="1" fill="#1C01A5" />
      <path d="M7 -12 Q 16 -6 14 -1" fill="none" stroke="#FFE566" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Apel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="2" r="9" fill="#F87171" stroke="#991B1B" strokeWidth="1.8" />
      <path d="M0 -6 Q 4 -12 7 -8" fill="none" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="-3" cy="0" rx="2" ry="3" fill="#FECACA" opacity="0.7" />
    </g>
  );
}

function Jeruk({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="2" r="9" fill="#FB923C" stroke="#C2410C" strokeWidth="1.8" />
      <path d="M-4 1 Q 0 -2 4 1" fill="none" stroke="#9A3412" strokeWidth="1" />
      <path d="M0 -6 L1 -11" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function Pisang({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x} ${y} q 14 -16 22 -2 q -8 4 -16 10 q -8 2 -6 -8`}
      fill="#FDE047"
      stroke="#A16207"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  );
}

function Mangga({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x - 8} ${y} Q ${x} ${y - 12} ${x + 9} ${y - 1} Q ${x + 4} ${y + 10} ${x - 8} ${y}`}
      fill="#FACC15"
      stroke="#A16207"
      strokeWidth="1.6"
    />
  );
}

function Stroberi({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 8 Q -8 2 -6 -4 Q 0 -8 6 -4 Q 8 2 0 8 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.4" />
      <path d="M-4 -4 Q 0 -9 4 -4 L 0 -2 Z" fill="#16A34A" />
    </g>
  );
}

function Jambu({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="5" fill="#F9A8D4" stroke="#BE185D" strokeWidth="1.3" />;
}

function Keranjang({ x, y, lebar }: { x: number; y: number; lebar: number }) {
  return (
    <g>
      <path
        d={`M ${x} ${y} L ${x + lebar} ${y} L ${x + lebar - 10} ${y + 42} L ${x + 10} ${y + 42} Z`}
        fill="#FDE68A"
        stroke="#92400E"
        strokeWidth="2.2"
      />
      {Array.from({ length: 4 }, (_, i) => (
        <path
          key={i}
          d={`M ${x + 8 + i * (lebar / 5)} ${y + 4} L ${x + 4 + i * (lebar / 5)} ${y + 40}`}
          fill="none"
          stroke="#B45309"
          strokeWidth="1.2"
          opacity="0.7"
        />
      ))}
    </g>
  );
}

function PohonBuah() {
  return (
    <g>
      <path d="M78 158 Q 82 118 90 96 Q 98 120 104 158 Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="2" />
      <circle cx="90" cy="74" r="38" fill="#4ADE80" stroke="#166534" strokeWidth="2.4" />
      <path d="M62 74 q 12 -10 24 0 t 26 2" fill="none" stroke="#166534" strokeWidth="1.6" opacity="0.55" />
      <path d="M68 88 q 14 -8 28 1 t 22 0" fill="none" stroke="#15803D" strokeWidth="1.5" opacity="0.5" />
      <Apel x={72} y={66} />
      <Apel x={104} y={60} />
      <Apel x={90} y={88} />
    </g>
  );
}

function AdeganKebun() {
  return (
    <g>
      <PohonBuah />
      <BurungPensil x={196} y={112} />
      <AnakPensil x={262} y={118} baju="#F9A8D4" rambut="#7C2D12" />
      <AnakPensil x={318} y={122} baju="#93C5FD" rambut="#1C01A5" />
    </g>
  );
}

function AdeganPetik() {
  return (
    <g>
      <Keranjang x={48} y={108} lebar={130} />
      <Apel x={88} y={124} />
      <Apel x={112} y={128} />
      <Apel x={136} y={124} />
      <Keranjang x={230} y={108} lebar={150} />
      <Jeruk x={268} y={124} />
      <Jeruk x={296} y={128} />
      <Pisang x={312} y={122} />
      <Pisang x={334} y={130} />
    </g>
  );
}

function AdeganMeja() {
  return (
    <g>
      <path d="M48 132 L372 132 L360 150 L60 150 Z" fill="#D97706" stroke="#78350F" strokeWidth="2" />
      <path d="M70 150 L62 176 M350 150 L358 176" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <Apel x={100} y={112} />
      <Apel x={138} y={114} />
      <Apel x={176} y={112} />
      <Jeruk x={230} y={114} />
      <Jeruk x={268} y={112} />
      <Pisang x={300} y={108} />
    </g>
  );
}

function AdeganPiringKosong() {
  return (
    <g>
      <ellipse cx="210" cy="148" rx="78" ry="22" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.4" />
      <ellipse cx="210" cy="144" rx="58" ry="14" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.6" />
      <AnakPensil x={108} y={96} baju="#FDBA74" rambut="#44403C" />
      <AnakPensil x={312} y={96} baju="#86EFAC" rambut="#166534" />
    </g>
  );
}

function AdeganBanding() {
  return (
    <g>
      <Keranjang x={36} y={100} lebar={150} />
      <Mangga x={78} y={122} />
      <Mangga x={108} y={128} />
      <Mangga x={138} y={120} />
      <Mangga x={118} y={112} />
      <Keranjang x={230} y={112} lebar={140} />
      <Stroberi x={276} y={132} />
      <Stroberi x={308} y={136} />
      <path d="M118 122 Q 210 70 290 134" fill="none" stroke="#1C01A5" strokeWidth="1.6" strokeDasharray="4 3" />
    </g>
  );
}

function AdeganSungai() {
  return (
    <g>
      <path d="M0 128 Q 70 118 140 130 T 280 126 T 420 132 L 420 188 L 0 188 Z" fill="#7DD3FC" opacity="0.85" />
      <path d="M20 150 Q 60 144 100 152" fill="none" stroke="#0369A1" strokeWidth="1.6" opacity="0.6" />
      <path d="M180 158 Q 230 150 280 160" fill="none" stroke="#0369A1" strokeWidth="1.6" opacity="0.6" />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx={36 + i * 48}
          cy={158}
          rx="16"
          ry="9"
          fill="#E7E5E4"
          stroke="#57534E"
          strokeWidth="1.7"
        />
      ))}
      <g transform="translate(168 132)">
        <ellipse cx="0" cy="8" rx="16" ry="11" fill="#4ADE80" stroke="#166534" strokeWidth="2" />
        <circle cx="-8" cy="-2" r="6" fill="#86EFAC" stroke="#166534" strokeWidth="1.6" />
        <circle cx="8" cy="-2" r="6" fill="#86EFAC" stroke="#166534" strokeWidth="1.6" />
        <circle cx="-8" cy="-2" r="2" fill="#1C01A5" />
        <circle cx="8" cy="-2" r="2" fill="#1C01A5" />
        <path d="M-4 10 Q 0 14 4 10" fill="none" stroke="#166534" strokeWidth="1.3" />
        <path d="M-14 6 Q -24 -6 -8 -2" fill="none" stroke="#166534" strokeWidth="1.6" />
      </g>
    </g>
  );
}

function AdeganPohonPasangan() {
  return (
    <g>
      <path d="M210 78 Q 150 110 132 132" fill="none" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
      <path d="M210 78 Q 270 110 288 132" fill="none" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
      <circle cx="210" cy="52" r="28" fill="#FDE047" stroke="#A16207" strokeWidth="2.2" />
      <Jambu x={198} y={48} />
      <Jambu x={214} y={44} />
      <Jambu x={222} y={58} />
      <Jambu x={204} y={60} />
      <circle cx="128" cy="148" r="26" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2.2" />
      <Jambu x={118} y={142} />
      <Jambu x={136} y={150} />
      <circle cx="292" cy="148" r="26" fill="#BFDBFE" stroke="#1D4ED8" strokeWidth="2.2" />
      <Jambu x={282} y={142} />
      <Jambu x={300} y={152} />
    </g>
  );
}

export default function GambarPensilCerita({
  sceneType,
}: {
  sceneType: AdeganCerita;
}) {
  return (
    <svg
      viewBox="0 0 420 220"
      role="img"
      aria-label="Gambar cerita pensil warna"
      className="h-52 w-full rounded-2xl border-2 border-[#334155]/30 bg-[#FFF8EC] shadow-inner"
    >
      <LangitRumput id={sceneType} />
      <Matahari />
      {sceneType === "garden-visit" ? <AdeganKebun /> : null}
      {sceneType === "picking-fruits" ? <AdeganPetik /> : null}
      {sceneType === "counting-table" ? <AdeganMeja /> : null}
      {sceneType === "empty-basket" ? <AdeganPiringKosong /> : null}
      {sceneType === "comparing-scales" ? <AdeganBanding /> : null}
      {sceneType === "frog-river" ? <AdeganSungai /> : null}
      {sceneType === "number-tree" ? <AdeganPohonPasangan /> : null}
      <rect width="420" height="220" filter={`url(#${sceneType}-bintik)`} opacity="0.22" />
    </svg>
  );
}
