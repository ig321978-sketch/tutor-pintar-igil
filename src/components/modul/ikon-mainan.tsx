/* Gambar mainan bergaya buku cerita anak. Garis tebal biru ungu, warna cerah, kilau putih.
   Semua gambar memakai kotak 48 x 48 supaya tetap jelas saat dikecilkan. */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";
const KUNING = "#FFE566";
const MERAH = "#F28B9B";
const HIJAU = "#7FCB96";
const HIJAU_TUA = "#4FA970";
const UNGU = "#9B8CFF";
const KULIT = "#FFD6A5";

const GARIS = {
  fill: "none",
  stroke: BIRU,
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Titik pada lingkaran bola (pusat 24,24 jari-jari 14). */
const TITIK_BOLA = [
  [24, 10],
  [36.12, 17],
  [36.12, 31],
  [24, 38],
  [11.88, 31],
  [11.88, 17],
];
const WARNA_BOLA = [EMAS, "#FFFFFF", MERAH, EMAS, "#FFFFFF", MERAH];

/** Isi gambar benda pada kotak 48 x 48. Dipakai di ikon kecil dan di adegan cerita. */
export function IsiIkonMainan({ jenis }: { jenis: string }) {
  const garis = GARIS;
  return (
    <>
      {jenis === "jungkat" && (
        <>
          <path d="M24 30 L15 44 H33 Z" {...garis} fill={EMAS} />
          <g transform="rotate(-14 24 31)">
            <rect x="3" y="28.5" width="42" height="5.5" rx="2.75" {...garis} fill={UNGU} />
          </g>
          <circle cx="9.5" cy="28" r="4.6" {...garis} fill={KULIT} />
          <circle cx="8" cy="27.4" r="0.9" fill={BIRU} />
          <circle cx="11.2" cy="27.4" r="0.9" fill={BIRU} />
          <path d="M8.2 30 Q9.6 31.3 11 30" {...garis} strokeWidth={1.2} />
          <circle cx="38.5" cy="19" r="4.6" {...garis} fill={KULIT} />
          <circle cx="37" cy="18.4" r="0.9" fill={BIRU} />
          <circle cx="40.2" cy="18.4" r="0.9" fill={BIRU} />
          <path d="M37.2 21 Q38.6 22.3 40 21" {...garis} strokeWidth={1.2} />
          <path d="M33.5 15.2 Q38.5 11.5 43.2 15.4" {...garis} strokeWidth={2} stroke={MERAH} />
        </>
      )}
      {jenis === "ayunan" && (
        <>
          <path d="M5 45 L13 6 M43 45 L35 6" {...garis} strokeWidth={3} />
          <rect x="8" y="3.5" width="32" height="5.5" rx="2.75" {...garis} fill={MERAH} />
          <path d="M16 9 V33 M32 9 V33" {...garis} strokeWidth={1.8} />
          <rect x="19.5" y="21.5" width="9" height="11" rx="3" {...garis} fill={HIJAU} />
          <circle cx="24" cy="16.5" r="5.2" {...garis} fill={KULIT} />
          <circle cx="22.2" cy="16" r="0.9" fill={BIRU} />
          <circle cx="25.8" cy="16" r="0.9" fill={BIRU} />
          <path d="M22.4 18.6 Q24 20 25.6 18.6" {...garis} strokeWidth={1.2} />
          <rect x="12" y="32" width="24" height="6" rx="3" {...garis} fill={EMAS} />
        </>
      )}
      {jenis === "perosotan" && (
        <>
          <path d="M20 12 H26 C36 12 38 26 41 42" fill="none" stroke={BIRU} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 12 H26 C36 12 38 26 41 42" fill="none" stroke={KUNING} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 13 C33 14 35 24 37 33" fill="none" stroke="#FFFFFF" strokeWidth={1.4} strokeLinecap="round" opacity={0.9} />
          <path d="M9 12 V45 M17 12 V45" {...garis} strokeWidth={2.6} />
          <path d="M9 21 H17 M9 29 H17 M9 37 H17" {...garis} strokeWidth={2.2} />
          <rect x="6" y="7" width="16" height="5.5" rx="2.75" {...garis} fill={MERAH} />
        </>
      )}
      {jenis === "sepeda" && (
        <>
          <circle cx="11" cy="33" r="8.5" {...garis} fill="#FFFFFF" />
          <circle cx="37" cy="33" r="8.5" {...garis} fill="#FFFFFF" />
          <circle cx="11" cy="33" r="2.4" {...garis} strokeWidth={1.6} fill={EMAS} />
          <circle cx="37" cy="33" r="2.4" {...garis} strokeWidth={1.6} fill={EMAS} />
          <path d="M11 33 L19 17 H32 L37 33 M19 17 L25 33 H11 M25 33 L32 17" fill="none" stroke={BIRU} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 33 L19 17 H32 L37 33 M19 17 L25 33 H11 M25 33 L32 17" fill="none" stroke={MERAH} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 13.5 H22" {...garis} strokeWidth={3.4} />
          <path d="M32 17 L31 10 H37" {...garis} strokeWidth={2.4} />
          <circle cx="38.5" cy="9.5" r="2.1" {...garis} strokeWidth={1.4} fill={EMAS} />
        </>
      )}
      {jenis === "kursi" && (
        <>
          <rect x="11" y="31" width="4.6" height="13.5" rx="2" {...garis} fill={UNGU} />
          <rect x="31.4" y="31" width="4.6" height="13.5" rx="2" {...garis} fill={UNGU} />
          <rect x="8" y="4" width="7.5" height="26" rx="3.4" {...garis} fill={MERAH} />
          <rect x="8" y="24.5" width="32" height="8" rx="3.4" {...garis} fill={EMAS} />
          <path d="M11.2 8 V16" fill="none" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" opacity={0.85} />
          <path d="M14 27.8 H26" fill="none" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" opacity={0.85} />
        </>
      )}
      {jenis === "balon" && (
        <>
          <path d="M24 33 Q17 38 25 41 Q31 44 25 47" {...garis} strokeWidth={1.8} />
          <ellipse cx="24" cy="18" rx="12" ry="14" {...garis} fill={MERAH} />
          <path d="M24 31.4 L20.4 36 H27.6 Z" {...garis} strokeWidth={1.8} fill={MERAH} />
          <ellipse cx="18.2" cy="12" rx="3" ry="4.6" fill="#FFFFFF" opacity={0.85} transform="rotate(24 18.2 12)" />
          <circle cx="20" cy="19" r="1.2" fill={BIRU} />
          <circle cx="28" cy="19" r="1.2" fill={BIRU} />
          <path d="M20.6 23 Q24 26.4 27.4 23" {...garis} strokeWidth={1.6} />
        </>
      )}
      {jenis === "buku" && (
        <>
          <path d="M11 41.5 H39 Q41 41.5 41 39 V9 Q41 6.5 39 6.5 H11 Z" {...garis} fill={HIJAU} />
          <rect x="7" y="6.5" width="8.5" height="35" rx="2.4" {...garis} fill={HIJAU_TUA} />
          <rect x="20" y="12" width="15.5" height="10" rx="2.4" {...garis} strokeWidth={2} fill={KUNING} />
          <path d="M23 16 H32.5 M23 19.2 H29.5" {...garis} strokeWidth={1.4} />
          <path d="M27.6 30 L29.2 33.2 L32.8 33.7 L30.2 36.2 L30.8 39.7 L27.6 38 L24.4 39.7 L25 36.2 L22.4 33.7 L26 33.2 Z" {...garis} strokeWidth={1.4} fill={EMAS} />
        </>
      )}
      {jenis === "layangan" && (
        <>
          <path d="M24 34 Q16 37.5 22 40 Q28 42.5 23 45" {...garis} strokeWidth={1.6} />
          <polygon points="24,2 40,17 24,34 8,17" fill={MERAH} stroke="none" />
          <polygon points="24,2 40,17 24,17" fill={KUNING} stroke="none" />
          <polygon points="24,34 8,17 24,17" fill={KUNING} stroke="none" />
          <polygon points="24,2 40,17 24,34 8,17" {...garis} />
          <path d="M24 2 V34 M8 17 H40" {...garis} strokeWidth={1.8} />
          <circle cx="19.4" cy="38.6" r="2" {...garis} strokeWidth={1.4} fill={HIJAU} />
          <circle cx="26" cy="42.4" r="2" {...garis} strokeWidth={1.4} fill={EMAS} />
        </>
      )}
      {jenis === "kelereng" && (
        <>
          <circle cx="24" cy="24" r="14" {...garis} fill={HIJAU} />
          <path d="M11 27 Q18 17 26 25 Q32 31 37.4 21" fill="none" stroke={KUNING} strokeWidth={3.4} strokeLinecap="round" />
          <path d="M12.5 32 Q19 24 26 31 Q31 35.5 35 30" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" opacity={0.8} />
          <circle cx="24" cy="24" r="14" {...garis} />
          <ellipse cx="17.6" cy="16.8" rx="4.4" ry="2.4" fill="#FFFFFF" transform="rotate(-35 17.6 16.8)" />
        </>
      )}
      {jenis === "bola" && (
        <>
          {TITIK_BOLA.map(([x, y], i) => {
            const [x2, y2] = TITIK_BOLA[(i + 1) % TITIK_BOLA.length];
            return <path key={i} d={`M24 24 L${x} ${y} A14 14 0 0 1 ${x2} ${y2} Z`} fill={WARNA_BOLA[i]} stroke={BIRU} strokeWidth={1.4} strokeLinejoin="round" />;
          })}
          <circle cx="24" cy="24" r="14" {...garis} />
          <circle cx="24" cy="24" r="3" {...garis} strokeWidth={1.6} fill="#FFFFFF" />
          <ellipse cx="17.4" cy="15.4" rx="2.6" ry="1.5" fill="#FFFFFF" transform="rotate(-35 17.4 15.4)" opacity={0.95} />
        </>
      )}
    </>
  );
}

export function IkonMainan({
  jenis,
  besar = false,
  kelas,
}: {
  jenis: string;
  besar?: boolean;
  kelas?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={kelas ?? (besar ? "h-14 w-14 shrink-0" : "h-8 w-8 shrink-0")}
      aria-hidden="true"
    >
      <IsiIkonMainan jenis={jenis} />
    </svg>
  );
}
