const GARIS = {
  fill: "none",
  stroke: "#1C01A5",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Isi gambar benda pada kotak 48 x 48. Dipakai di ikon kecil dan di adegan cerita. */
export function IsiIkonMainan({ jenis }: { jenis: string }) {
  const garis = GARIS;
  return (
    <>
      {jenis === "jungkat" && (
        <>
          <path d="M24 32 L17 44 H31 Z" {...garis} fill="#F0AB00" />
          <path d="M5 31 L43 15" {...garis} strokeWidth={3} />
          <circle cx="9" cy="28" r="3.2" {...garis} fill="#E98989" />
          <circle cx="39" cy="17" r="3.2" {...garis} fill="#7FCB96" />
        </>
      )}
      {jenis === "ayunan" && (
        <>
          <path d="M10 8 H38" {...garis} />
          <path d="M16 8 L14 32" {...garis} />
          <path d="M32 8 L34 32" {...garis} />
          <path d="M12 32 H36" {...garis} strokeWidth={3} />
          <rect x="14" y="32" width="20" height="6" rx="2" {...garis} fill="#F0AB00" />
        </>
      )}
      {jenis === "perosotan" && (
        <>
          <path d="M8 8 V42 M16 8 V26 M8 16 H16 M8 24 H16" {...garis} />
          <path d="M16 12 H28 C38 12 40 24 40 42" stroke="#F0AB00" strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d="M16 12 H28 C38 12 40 24 40 42" {...garis} />
        </>
      )}
      {jenis === "sepeda" && (
        <>
          <circle cx="14" cy="32" r="8" {...garis} />
          <circle cx="34" cy="32" r="8" {...garis} />
          <path d="M14 32 L22 16 H32 L34 32 L22 32 Z" {...garis} />
          <circle cx="22" cy="16" r="2.2" fill="#1C01A5" />
        </>
      )}
      {jenis === "kursi" && (
        <>
          <path d="M12 10 V28 H36" {...garis} />
          <path d="M14 28 V42 M34 28 V42" {...garis} />
          <path d="M10 28 H38" {...garis} strokeWidth={4} />
        </>
      )}
      {jenis === "balon" && (
        <>
          <ellipse cx="24" cy="18" rx="11" ry="13" {...garis} fill="#E98989" />
          <path d="M24 31 L21 36 H27 Z" fill="#1C01A5" />
          <path d="M24 36 Q18 42 26 46" {...garis} />
        </>
      )}
      {jenis === "buku" && (
        <>
          <path d="M8 10 H24 V40 H8 Z" {...garis} fill="#7FCB96" />
          <path d="M24 10 H40 V40 H24 Z" {...garis} fill="#F0AB00" />
          <path d="M24 10 V40" {...garis} />
        </>
      )}
      {jenis === "layangan" && (
        <>
          <polygon points="24,4 42,24 24,42 6,24" {...garis} fill="#E98989" />
          <path d="M24 4 V42 M6 24 H42" {...garis} />
          <path d="M24 42 Q30 46 22 48" {...garis} />
        </>
      )}
      {jenis === "kelereng" && (
        <>
          <circle cx="24" cy="24" r="13" {...garis} fill="#7FCB96" />
          <ellipse cx="19" cy="19" rx="4" ry="2.2" fill="#FFFFFF" />
        </>
      )}
      {jenis === "bola" && (
        <>
          <circle cx="24" cy="24" r="14" {...garis} fill="#F0AB00" />
          <path d="M10 24 H38 M24 10 C16 18 16 30 24 38 M24 10 C32 18 32 30 24 38" {...garis} />
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
