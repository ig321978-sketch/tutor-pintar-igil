import type { IkonNama } from "@/lib/modul-kedua/tipe";

/** Ikon SVG buatan sendiri (kotak 60x60), tanpa aset berhak cipta. Dipakai adegan cerita. */
const WARNA = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

function Gambar({ nama, i }: { nama: IkonNama; i: number }) {
  const w = WARNA[i % WARNA.length];
  switch (nama) {
    case "jungkat":
      return (
        <g>
          <polygon points="30,52 20,52 30,34 40,52" fill="#92400e" />
          <rect x="4" y="30" width="52" height="6" rx="3" fill={w} transform="rotate(-12 30 33)" />
          <circle cx="8" cy="22" r="5" fill="#fcd34d" />
        </g>
      );
    case "ayunan":
      return (
        <g>
          <line x1="10" y1="52" x2="22" y2="8" stroke="#92400e" strokeWidth="4" />
          <line x1="50" y1="52" x2="38" y2="8" stroke="#92400e" strokeWidth="4" />
          <line x1="20" y1="8" x2="40" y2="8" stroke="#92400e" strokeWidth="4" />
          <line x1="26" y1="8" x2="26" y2="38" stroke="#475569" strokeWidth="2" />
          <line x1="34" y1="8" x2="34" y2="38" stroke="#475569" strokeWidth="2" />
          <rect x="21" y="38" width="18" height="5" rx="2" fill={w} />
        </g>
      );
    case "perosotan":
      return (
        <g>
          <rect x="8" y="14" width="5" height="40" fill="#92400e" />
          <rect x="16" y="14" width="3" height="40" fill="#92400e" opacity="0.5" />
          <path d="M 13 16 Q 40 20 54 50" stroke={w} strokeWidth="9" fill="none" strokeLinecap="round" />
          <rect x="6" y="10" width="14" height="5" rx="2" fill="#475569" />
        </g>
      );
    case "sepeda":
      return (
        <g fill="none" stroke="#1e1b4b" strokeWidth="3.5" strokeLinecap="round">
          <circle cx="14" cy="40" r="11" />
          <circle cx="46" cy="40" r="11" />
          <path d="M 14 40 L 26 22 L 40 22 L 46 40 M 26 22 L 32 40 L 14 40 M 40 22 L 38 14 L 46 14" stroke={w} />
          <line x1="22" y1="20" x2="30" y2="20" stroke="#1e1b4b" />
        </g>
      );
    case "kursi":
      return (
        <g>
          <rect x="16" y="8" width="6" height="26" rx="2" fill={w} />
          <rect x="16" y="30" width="28" height="7" rx="3" fill={w} />
          <rect x="16" y="37" width="5" height="16" fill="#92400e" />
          <rect x="39" y="37" width="5" height="16" fill="#92400e" />
        </g>
      );
    case "balon":
      return (
        <g>
          <ellipse cx="30" cy="22" rx="14" ry="17" fill={w} />
          <ellipse cx="24" cy="15" rx="4" ry="6" fill="#fff" opacity="0.45" />
          <polygon points="30,38 26,43 34,43" fill={w} />
          <path d="M 30 43 Q 24 48 30 52 Q 36 56 30 58" stroke="#475569" strokeWidth="2" fill="none" />
        </g>
      );
    case "buku":
      return (
        <g>
          <rect x="10" y="12" width="40" height="38" rx="3" fill={w} />
          <rect x="14" y="12" width="32" height="34" fill="#fffbeb" />
          <rect x="10" y="12" width="6" height="38" rx="2" fill={w} />
          <line x1="22" y1="22" x2="42" y2="22" stroke="#94a3b8" strokeWidth="2" />
          <line x1="22" y1="30" x2="42" y2="30" stroke="#94a3b8" strokeWidth="2" />
        </g>
      );
    case "layang":
      return (
        <g>
          <polygon points="30,4 46,22 30,42 14,22" fill={w} />
          <line x1="30" y1="4" x2="30" y2="42" stroke="#fff" strokeWidth="2" />
          <line x1="14" y1="22" x2="46" y2="22" stroke="#fff" strokeWidth="2" />
          <path d="M 30 42 Q 22 48 30 52 Q 38 56 30 60" stroke="#475569" strokeWidth="2" fill="none" />
        </g>
      );
    case "kelereng":
      return (
        <g>
          <circle cx="30" cy="30" r="20" fill={w} />
          <path d="M 18 30 Q 30 14 42 30 Q 30 46 18 30" fill="#fff" opacity="0.35" />
          <circle cx="23" cy="22" r="5" fill="#fff" opacity="0.7" />
        </g>
      );
    case "bola":
      return (
        <g>
          <circle cx="30" cy="30" r="22" fill="#fff" stroke="#1e1b4b" strokeWidth="3" />
          <polygon points="30,19 40,26 36,38 24,38 20,26" fill="#1e1b4b" />
          <line x1="30" y1="19" x2="30" y2="9" stroke="#1e1b4b" strokeWidth="3" />
          <line x1="40" y1="26" x2="50" y2="22" stroke="#1e1b4b" strokeWidth="3" />
          <line x1="20" y1="26" x2="10" y2="22" stroke="#1e1b4b" strokeWidth="3" />
        </g>
      );
    case "keranjang":
      return (
        <g>
          <path d="M 6 24 L 54 24 L 46 54 L 14 54 Z" fill="#d97706" stroke="#92400e" strokeWidth="3" />
          <line x1="12" y1="34" x2="48" y2="34" stroke="#92400e" strokeWidth="2" />
          <line x1="14" y1="44" x2="46" y2="44" stroke="#92400e" strokeWidth="2" />
          <path d="M 14 24 Q 30 2 46 24" fill="none" stroke="#92400e" strokeWidth="4" />
        </g>
      );
  }
}

/** Ikon di dalam SVG yang sudah ada: posisi (x,y) sudut kiri atas, ukuran s piksel. */
export function IkonG({ nama, x, y, s, variasi = 0 }: { nama: IkonNama; x: number; y: number; s: number; variasi?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s / 60})`}>
      <Gambar nama={nama} i={variasi} />
    </g>
  );
}

/** Ikon berdiri sendiri (untuk dipakai di kartu atau infografis). */
export default function Ikon({ nama, ukuran = 48, variasi = 0 }: { nama: IkonNama; ukuran?: number; variasi?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={ukuran} height={ukuran} role="img" aria-label={nama}>
      <Gambar nama={nama} i={variasi} />
    </svg>
  );
}
