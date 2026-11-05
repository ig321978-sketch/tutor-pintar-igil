import { IsiIkonMainan } from "./ikon-mainan";

export type ArahBuaya = "kiri" | "kanan" | "tutup";

const HIJAU = "#7FCB96";
const BIRU = "#1C01A5";
const MERAH_MUDA = "#E98989";
const EMAS = "#F0AB00";

function titikGigiAtas(x: number) {
  const y = 19 + ((x - 10) * 11) / 94;
  return `${x - 3.4},${y - 0.4} ${x + 3.4},${y + 0.4} ${x},${y + 6.5}`;
}

function titikGigiBawah(x: number) {
  const y = 45 - ((x - 10) * 11) / 94;
  return `${x - 3.4},${y + 0.4} ${x + 3.4},${y - 0.4} ${x},${y - 6.5}`;
}

/**
 * Mulut buaya untuk tanda lebih banyak, lebih sedikit, dan sama dengan.
 * "kiri": mulut terbuka ke kiri (tanda >). "kanan": terbuka ke kanan (tanda <).
 * "tutup": mulut menutup (tanda =).
 */
export function MulutBuaya({ arah, kelas = "h-10 w-20" }: { arah: ArahBuaya; kelas?: string }) {
  const garis = { stroke: BIRU, strokeWidth: 2.4, strokeLinejoin: "round" as const };
  const isi =
    arah === "tutup" ? (
      <>
        <path d="M104 31 L104 16 C80 6 40 6 10 14 C4 16 4 29 10 31 Z" fill={HIJAU} {...garis} />
        <path d="M104 33 L104 48 C80 58 40 58 10 50 C4 48 4 35 10 33 Z" fill={HIJAU} {...garis} />
        <path d="M10 32 H104" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
        <polygon points="26,32 33,32 29.5,38" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
        <polygon points="52,32 59,32 55.5,26" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
        <polygon points="76,32 83,32 79.5,38" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
        <circle cx="88" cy="17" r="5.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
        <circle cx="88" cy="17.5" r="2.4" fill={BIRU} />
      </>
    ) : (
      <>
        <path d="M104 30 L104 16 C80 6 40 4 10 8 C4 9 4 17 10 19 Z" fill={HIJAU} {...garis} />
        <path d="M104 34 L104 48 C80 58 40 60 10 56 C4 55 4 47 10 45 Z" fill={HIJAU} {...garis} />
        <polygon points="10,19 104,30 104,34 10,45" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.6" />
        {[22, 46, 70].map((x) => (
          <polygon key={`a${x}`} points={titikGigiAtas(x)} fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
        ))}
        {[34, 58, 82].map((x) => (
          <polygon key={`b${x}`} points={titikGigiBawah(x)} fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
        ))}
        <circle cx="88" cy="12" r="5.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" />
        <circle cx="88" cy="12.5" r="2.4" fill={BIRU} />
      </>
    );
  return (
    <svg viewBox="0 0 120 64" className={`shrink-0 ${kelas}`} aria-hidden="true">
      {arah === "kanan" ? <g transform="translate(120 0) scale(-1 1)">{isi}</g> : isi}
    </svg>
  );
}

function Benda({ jenis, x, y, s }: { jenis: string; x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <IsiIkonMainan jenis={jenis} />
    </g>
  );
}

function Burung({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="12" ry="8.5" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="2" />
      <path d="M-12 -2 L-21 -8 L-19 2 Z" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 -2 L19 1 L12 4 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="6" cy="-3" r="1.9" fill={BIRU} />
      <path d="M-3 8 V13 M3 8 V13" stroke={BIRU} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Wajah({ x, y, rambut }: { x: number; y: number; rambut: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="17" fill="#FFE0BD" stroke={BIRU} strokeWidth="2" />
      <path d="M-17 -2 C-17 -22 17 -22 17 -2 C8 -12 -8 -12 -17 -2 Z" fill={rambut} stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="-6" cy="3" r="2" fill={BIRU} />
      <circle cx="6" cy="3" r="2" fill={BIRU} />
      <path d="M-5 9 Q0 13 5 9" fill="none" stroke={BIRU} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
}

function Latar({ matahari = true }: { matahari?: boolean }) {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#EAF4FF" />
      {matahari ? <circle cx="262" cy="34" r="17" fill="#FFE566" stroke={EMAS} strokeWidth="3" /> : null}
      <ellipse cx="70" cy="30" rx="26" ry="10" fill="#FFFFFF" />
      <ellipse cx="92" cy="26" rx="18" ry="9" fill="#FFFFFF" />
      <rect x="0" y="150" width="300" height="58" fill="#CDEBD3" />
      <path d="M0 150 C60 140 120 158 190 148 C240 142 270 150 300 146 V158 H0 Z" fill="#B7E0C0" />
    </>
  );
}

export type JenisAdeganB =
  | "banding-sepeda-burung"
  | "banding-kursi-balon"
  | "banding-kelereng"
  | "banding-bola-renggang";

function AdeganSepedaBurung() {
  const xs = [14, 108, 202];
  return (
    <>
      <Latar />
      {xs.map((x) => (
        <g key={x}>
          <Benda jenis="sepeda" x={x} y={86} s={1.75} />
          <Burung x={x + 40} y={92} />
        </g>
      ))}
    </>
  );
}

function AdeganKursiBalon() {
  const xs = Array.from({ length: 6 }, (_, i) => 8 + i * 48);
  return (
    <>
      <Latar />
      {xs.map((x, i) => (
        <g key={x}>
          <Benda jenis="kursi" x={x} y={106} s={0.98} />
          {i < 4 ? <Benda jenis="balon" x={x} y={72} s={0.98} /> : null}
        </g>
      ))}
      <path d="M12 168 H288" stroke="#8FC9A0" strokeWidth="2" strokeDasharray="4 6" />
    </>
  );
}

function AdeganKelereng() {
  const kira = Array.from({ length: 5 }, (_, i) => 66 + i * 30);
  const tika = Array.from({ length: 8 }, (_, i) => 66 + i * 28);
  return (
    <>
      <Latar matahari={false} />
      <Wajah x={30} y={56} rambut="#1C01A5" />
      <Wajah x={30} y={126} rambut="#F0AB00" />
      {kira.map((x) => (
        <Benda key={`k${x}`} jenis="kelereng" x={x} y={40} s={0.62} />
      ))}
      {tika.map((x, i) => (
        <g key={`t${x}`}>
          {i >= 5 ? <circle cx={x + 14.9} cy={127} r={14} fill="none" stroke={EMAS} strokeWidth="3" strokeDasharray="5 4" /> : null}
          <Benda jenis="kelereng" x={x} y={112} s={0.62} />
        </g>
      ))}
      {kira.map((x, i) => (
        <path
          key={`g${x}`}
          d={`M${x + 14.9} 66 L${tika[i] + 14.9} 116`}
          stroke={BIRU}
          strokeWidth="2"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function AdeganBolaRenggang() {
  const rapat = Array.from({ length: 5 }, (_, i) => 70 + i * 30);
  const renggang = Array.from({ length: 5 }, (_, i) => 14 + i * 60);
  return (
    <>
      <Latar matahari={false} />
      {rapat.map((x) => (
        <Benda key={`r${x}`} jenis="bola" x={x} y={36} s={0.62} />
      ))}
      {renggang.map((x) => (
        <Benda key={`g${x}`} jenis="bola" x={x} y={118} s={0.62} />
      ))}
      {rapat.map((x, i) => (
        <path
          key={`p${x}`}
          d={`M${x + 14.9} 64 L${renggang[i] + 14.9} 122`}
          stroke={BIRU}
          strokeWidth="2"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />
      ))}
      <path d="M70 28 H219" stroke={EMAS} strokeWidth="3" strokeLinecap="round" />
      <path d="M14 172 H287" stroke={EMAS} strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

export function AdeganBandingB({ jenis }: { jenis: string }) {
  return (
    <svg
      viewBox="0 0 300 208"
      className="h-auto w-full rounded-2xl border-2 border-[#334155]/30 shadow-inner"
      role="img"
      aria-label="Gambar cerita membandingkan banyak benda"
    >
      {jenis === "banding-sepeda-burung" && <AdeganSepedaBurung />}
      {jenis === "banding-kursi-balon" && <AdeganKursiBalon />}
      {jenis === "banding-kelereng" && <AdeganKelereng />}
      {jenis === "banding-bola-renggang" && <AdeganBolaRenggang />}
    </svg>
  );
}

/** Garis bilangan 1 sampai 10 dengan dua katak. posisiBiru dan posisiJingga bernilai 1 sampai 10. */
export function GarisBilanganKatak({
  posisiBiru,
  posisiJingga,
}: {
  posisiBiru: number;
  posisiJingga: number;
}) {
  const x = (n: number) => 22 + (n - 1) * 28;
  const katak = (n: number, y: number, warna: string, kunci: string) => (
    <g key={kunci} transform={`translate(${x(n)} ${y})`}>
      <ellipse cx="0" cy="0" rx="12" ry="9" fill={warna} stroke={BIRU} strokeWidth="2" />
      <circle cx="-6" cy="-9" r="4.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <circle cx="6" cy="-9" r="4.5" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
      <circle cx="-6" cy="-9" r="1.7" fill={BIRU} />
      <circle cx="6" cy="-9" r="1.7" fill={BIRU} />
      <path d="M-5 3 Q0 7 5 3" fill="none" stroke={BIRU} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
  return (
    <svg viewBox="0 0 300 150" className="h-auto w-full" role="img" aria-label="Garis bilangan dengan dua katak">
      <rect x="0" y="0" width="300" height="150" rx="16" fill="#FFFFFF" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
        <g key={n}>
          <path d={`M${x(n)} 96 V108`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
          <text
            x={x(n)}
            y="130"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill={BIRU}
            fontFamily="inherit"
          >
            {n}
          </text>
        </g>
      ))}
      <path d={`M${x(1) - 12} 102 H${x(10) + 12}`} stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <path d={`M${x(10) + 12} 102 l-7 -5 M${x(10) + 12} 102 l-7 5`} stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x(posisiBiru)} 54 V94`} stroke="#3B82F6" strokeWidth="2" strokeDasharray="3 4" />
      <path d={`M${x(posisiJingga)} 82 V94`} stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 4" />
      {katak(posisiBiru, 42, "#93C5FD", "biru")}
      {katak(posisiJingga, 72, "#FDBA74", "jingga")}
    </svg>
  );
}
