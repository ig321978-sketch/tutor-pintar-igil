"use client";

import React from "react";
import {
  BAWAH,
  BIRU,
  BukuCerita,
  EMAS,
  HIJAU,
  KUNING,
  Latar,
  MERAH_MUDA,
  TENGAH,
  type Cerita,
} from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 2 Sub-Bab B: Berbagai Cara Melakukan Penjumlahan (Buku Siswa hlm. 51-64). */
/* Maskot: Igil. Tokoh buku: Kira, Upe, Wei, Halim, Malosi, Tika.            */
/* Semua gambar dibuat di klien (SVG). Tidak ada panggilan API.               */
/* Naskah: naskah/mtk-1-bab2-sub-b-berbagai-cara.md                           */
/* ------------------------------------------------------------------------ */

const MERAH = "#E11D48";
const BIRU_BOLA = "#38BDF8";
const KULIT_TANGAN = "#F7C59F";

/* ------------------------------ Gambar benda ---------------------------- */

function Apel({ x, y, warna }: { x: number; y: number; warna: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -10 Q-1 -15 3 -17" fill="none" stroke="#7A4A1E" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 -14 Q9 -19 12 -13 Q6 -9 2 -14 Z" fill="#4ADE80" stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
      <path
        d="M0 -10 C-8 -14 -17 -6 -14 4 C-12 12 -5 14 0 11 C5 14 12 12 14 4 C17 -6 8 -14 0 -10 Z"
        fill={warna}
        stroke={BIRU}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M-9 -3 Q-8 -7 -4 -8" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </g>
  );
}

function PanahEmas({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g className="igil-denyut" style={TENGAH}>
      <path d={`M${x1} ${y} H${x2 - 6}`} stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points={`${x2},${y} ${x2 - 10},${y - 7} ${x2 - 10},${y + 7}`} fill={EMAS} stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
    </g>
  );
}

export function Lencana({ x, y, teks, r = 17 }: { x: number; y: number; teks: string; r?: number }) {
  return (
    <g className="igil-lompat" style={BAWAH}>
      <circle cx={x} cy={y} r={r} fill={EMAS} stroke={BIRU} strokeWidth="3" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize={teks.length > 2 ? 15 : 21} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Pola totol seperti mata dadu untuk satu sayap (0 sampai 5). Titik pusat sayap = (0, 0). */
const POLA_TOTOL: [number, number][][] = [
  [],
  [[0, 0]],
  [
    [-13, -22],
    [13, 22],
  ],
  [
    [-14, -26],
    [0, 0],
    [14, 26],
  ],
  [
    [-14, -22],
    [14, -22],
    [-14, 22],
    [14, 22],
  ],
  [
    [-14, -24],
    [14, -24],
    [0, 0],
    [-14, 24],
    [14, 24],
  ],
];

/** Kepik dari atas. Sayap kiri dan sayap kanan punya totol sendiri-sendiri (hlm. 59-60). */
export function Kepik({ kiri, kanan, kelas = "h-auto w-full max-w-[220px]" }: { kiri: number; kanan: number; kelas?: string }) {
  const sayapKiri = "M100 36 C46 34 22 78 30 118 C36 144 78 148 100 148 Z";
  const sayapKanan = "M100 36 C154 34 178 78 170 118 C164 144 122 148 100 148 Z";
  return (
    <svg viewBox="0 0 200 160" className={`mx-auto block ${kelas}`} role="img" aria-label={`Kepik. Sayap kiri ${kiri} totol, sayap kanan ${kanan} totol.`}>
      <path d="M72 40 L58 18 M128 40 L142 18" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <circle cx="57" cy="17" r="3.4" fill={BIRU} />
      <circle cx="143" cy="17" r="3.4" fill={BIRU} />
      <path d="M36 70 L14 62 M34 100 L10 104 M44 128 L24 142 M164 70 L186 62 M166 100 L190 104 M156 128 L176 142" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <path d="M78 40 Q100 4 122 40 Z" fill="#1F2937" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="90" cy="30" r="3.2" fill="#FFFFFF" />
      <circle cx="110" cy="30" r="3.2" fill="#FFFFFF" />
      <path d={sayapKiri} fill={MERAH} stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
      <path d={sayapKanan} fill={MERAH} stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M100 36 V148" stroke={BIRU} strokeWidth="3.4" />
      {POLA_TOTOL[Math.min(kiri, 5)].map(([dx, dy], i) => (
        <circle key={`k${i}`} cx={64 + dx} cy={92 + dy} r="8.6" fill="#1F2937" />
      ))}
      {POLA_TOTOL[Math.min(kanan, 5)].map(([dx, dy], i) => (
        <circle key={`n${i}`} cx={136 + dx} cy={92 + dy} r="8.6" fill="#1F2937" />
      ))}
    </svg>
  );
}

/** Bingkai sepuluh kecil: bola merah dan bola biru, sisanya kosong (hlm. 62). */
export function BingkaiMini({ merah, biru, kelas = "w-full max-w-[130px]" }: { merah: number; biru: number; kelas?: string }) {
  return (
    <svg viewBox="0 0 110 46" className={`mx-auto block h-auto ${kelas}`} role="img" aria-label={`Bingkai sepuluh: ${merah} titik merah, ${biru} titik biru`}>
      <rect x="2" y="2" width="106" height="42" rx="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
      <path d="M2 23 H108 M23 2 V44 M44 2 V44 M65 2 V44 M86 2 V44" stroke="#C7D2FE" strokeWidth="1.6" />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 12.5 + (i % 5) * 21;
        const cy = i < 5 ? 12.5 : 33.5;
        const warna = i < merah ? MERAH : i < merah + biru ? BIRU_BOLA : "none";
        return <circle key={i} cx={cx} cy={cy} r="7.6" fill={warna} stroke={warna === "none" ? "none" : BIRU} strokeWidth="1.4" />;
      })}
    </svg>
  );
}

function Tangan({ x, y, buka, s = 1, balik = false }: { x: number; y: number; buka: number; s?: number; balik?: boolean }) {
  const jari = [
    { dx: -17, r: -34, h: 17 },
    { dx: -8.5, r: -15, h: 22 },
    { dx: 0, r: 0, h: 24 },
    { dx: 8.5, r: 15, h: 21 },
    { dx: 17, r: 34, h: 15 },
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${balik ? -s : s} ${s})`}>
      {jari.map((j, i) => {
        const terbuka = i < buka;
        return (
          <g key={i} transform={`translate(${j.dx} -6) rotate(${j.r})`}>
            <rect
              x="-4.4"
              y={terbuka ? -j.h : -8}
              width="8.8"
              height={terbuka ? j.h : 9}
              rx="4.4"
              fill={KULIT_TANGAN}
              stroke={BIRU}
              strokeWidth="1.8"
            />
          </g>
        );
      })}
      <ellipse cx="0" cy="6" rx="21" ry="16" fill={KULIT_TANGAN} stroke={BIRU} strokeWidth="2.2" />
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 51: keranjang berisi lima apel, tiga merah dan dua hijau. */
function AdeganKeranjang() {
  return (
    <>
      <Latar />
      <Tokoh x={238} y={190} rambut={BIRU} baju={KUNING} s={1} angkat />
      <path d="M62 126 H178 L166 184 H74 Z" fill="#E7B66B" stroke="#8A5322" strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M70 146 H170 M72 164 H168 M92 128 L98 184 M120 128 V184 M148 128 L142 184" stroke="#B9843F" strokeWidth="2.4" />
      <Apel x={88} y={122} warna={MERAH} />
      <Apel x={118} y={116} warna={MERAH} />
      <Apel x={148} y={122} warna={MERAH} />
      <Apel x={102} y={136} warna="#86EFAC" />
      <Apel x={136} y={136} warna="#86EFAC" />
      <path d="M62 126 H178" stroke="#8A5322" strokeWidth="5" strokeLinecap="round" />
      <g className="igil-lompat" style={BAWAH}>
        <rect x="14" y="40" width="118" height="42" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
        <path d="M44 82 L36 98 L62 82 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        <rect x="40" y="80" width="22" height="4" fill="#FFFFFF" />
        <text x="73" y="58" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
          Bagaimana caramu
        </text>
        <text x="73" y="74" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
          menjumlahkan?
        </text>
      </g>
      <Lencana x={206} y={86} teks="5" />
    </>
  );
}

/** Buku hlm. 51-52: bagan pasangan bilangan. Gabungan 5, Sebagian 3 dan 2. */
function AdeganBagan() {
  return (
    <>
      <Latar />
      <rect x="86" y="22" width="196" height="132" rx="10" fill="#FFFFFF" stroke="#A8672D" strokeWidth="6" />
      <path d="M130 154 V184 M238 154 V184" stroke="#A8672D" strokeWidth="6" strokeLinecap="round" />
      <path d="M150 86 L214 54 M150 90 L214 122" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="128" cy="88" r="26" fill={KUNING} stroke={BIRU} strokeWidth="3.4" />
      <circle cx="238" cy="52" r="20" fill="#C7D2FE" stroke={BIRU} strokeWidth="3.4" />
      <circle cx="238" cy="124" r="20" fill="#C7D2FE" stroke={BIRU} strokeWidth="3.4" />
      <g fontWeight="900" fill={BIRU} textAnchor="middle">
        <text x="128" y="100" fontSize="32">
          5
        </text>
        <text x="238" y="62" fontSize="26">
          3
        </text>
        <text x="238" y="134" fontSize="26">
          2
        </text>
        <text x="128" y="132" fontSize="9">
          Gabungan
        </text>
        <text x="238" y="84" fontSize="9">
          Sebagian
        </text>
        <text x="238" y="156" fontSize="9">
          Sebagian
        </text>
      </g>
      <g className="igil-lompat" style={BAWAH}>
        <svg x="2" y="110" width="88" height="58" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
    </>
  );
}

/** Buku hlm. 55-56: melompat tiga petak dari angka 5 sampai 8. */
function AdeganLompat() {
  const tengah = (i: number) => 22 + i * 26 + 13;
  return (
    <>
      <Latar />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <rect
            x={22 + i * 26}
            y="150"
            width="26"
            height="28"
            rx="3"
            fill={i >= 4 && i <= 7 ? KUNING : "#EDE9FE"}
            stroke={BIRU}
            strokeWidth="2.2"
          />
          <text x={tengah(i)} y="170" textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
            {i + 1}
          </text>
        </g>
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={tengah(4)} y={148} rambut="#1F2937" baju={MERAH_MUDA} s={0.85} angkat />
      </g>
      {[4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${tengah(i)} 144 Q${tengah(i) + 13} 112 ${tengah(i + 1)} 144`}
          fill="none"
          stroke={MERAH}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeDasharray="1 7"
        />
      ))}
      <Lencana x={226} y={82} teks="+3" />
      <Lencana x={tengah(7)} y={122} teks="8" r={14} />
    </>
  );
}

/** Buku hlm. 59-60: kepik kembar, tiga totol di sayap kiri dan kanan. */
function AdeganKepik() {
  return (
    <>
      <Latar />
      <path d="M-6 190 C20 120 120 96 232 110 C270 120 300 150 306 190 Z" fill="#4ADE80" stroke={BIRU} strokeWidth="3" />
      <path d="M40 176 C90 140 150 128 230 132" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <svg x="86" y="26" width="128" height="104" viewBox="0 0 200 160">
        <g className="igil-lompat" style={BAWAH}>
          <path d="M72 40 L58 18 M128 40 L142 18" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
          <path d="M78 40 Q100 4 122 40 Z" fill="#1F2937" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
          <path d="M100 36 C46 34 22 78 30 118 C36 144 78 148 100 148 Z" fill={MERAH} stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M100 36 C154 34 178 78 170 118 C164 144 122 148 100 148 Z" fill={MERAH} stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
          <path d="M100 36 V148" stroke={BIRU} strokeWidth="3.4" />
          {POLA_TOTOL[3].map(([dx, dy], i) => (
            <circle key={`k${i}`} cx={64 + dx} cy={92 + dy} r="8.6" fill="#1F2937" />
          ))}
          {POLA_TOTOL[3].map(([dx, dy], i) => (
            <circle key={`n${i}`} cx={136 + dx} cy={92 + dy} r="8.6" fill="#1F2937" />
          ))}
        </g>
      </svg>
      <Lencana x={46} y={60} teks="3" />
      <Lencana x={254} y={60} teks="3" />
      <rect x="92" y="158" width="116" height="34" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x="150" y="182" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
        3 + 3 = 6
      </text>
    </>
  );
}

/** Buku hlm. 61: tiga anak menunjukkan jari, delapan terbuka dan dua tertutup. */
function AdeganJari() {
  return (
    <>
      <Latar />
      <Tokoh x={50} y={130} rambut="#1F2937" baju={EMAS} s={0.95} angkat />
      <Tokoh x={150} y={130} rambut={MERAH_MUDA} baju={HIJAU} s={0.95} angkat />
      <Tokoh x={250} y={130} rambut="#7A4A1E" baju={KUNING} s={0.95} angkat />
      <rect x="40" y="132" width="220" height="62" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <Tangan x={100} y={170} buka={5} s={1.05} />
      <Tangan x={160} y={170} buka={3} s={1.05} balik />
      <text x="214" y="182" textAnchor="middle" fontSize="19" fontWeight="900" fill={BIRU}>
        8 + 2
      </text>
      <Lencana x={150} y={34} teks="10" />
    </>
  );
}

/** Buku hlm. 62: Wei menunjukkan bingkai sepuluh, sembilan merah dan satu biru. */
function AdeganBingkai() {
  return (
    <>
      <Latar />
      <rect x="20" y="30" width="206" height="96" rx="8" fill="#FFFFFF" stroke="#A8672D" strokeWidth="5" />
      <path d="M20 78 H226 M61 30 V126 M102 30 V126 M144 30 V126 M185 30 V126" stroke="#C7D2FE" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 40.6 + (i % 5) * 41.2;
        const cy = i < 5 ? 54 : 102;
        return <circle key={i} cx={cx} cy={cy} r="15" fill={i === 9 ? BIRU_BOLA : MERAH} stroke={BIRU} strokeWidth="2.4" />;
      })}
      <path d="M60 126 V180 M186 126 V180" stroke="#A8672D" strokeWidth="5" strokeLinecap="round" />
      <Tokoh x={266} y={190} rambut="#1F2937" baju={HIJAU} s={0.95} angkat />
      <Lencana x={262} y={66} teks="9+1" />
      <rect x="66" y="156" width="136" height="34" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x="134" y="180" textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
        9 + 1 = 10
      </text>
    </>
  );
}

/** Wajah Igil tanpa pembungkus svg, dipakai di dalam adegan. */
export function IgilWajahIsi() {
  return (
    <>
      <path d="M24 28 L16 6 L42 18 Z M96 28 L104 6 L78 18 Z" fill="#8B7CF6" stroke={BIRU} strokeWidth="3.2" strokeLinejoin="round" />
      <ellipse cx="60" cy="46" rx="44" ry="31" fill="#A5B4FC" stroke={BIRU} strokeWidth="3.4" />
      <ellipse cx="60" cy="66" rx="22" ry="9" fill="#E0E7FF" />
      <circle cx="40" cy="42" r="15" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <circle cx="80" cy="42" r="15" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <circle cx="42" cy="43" r="7" fill={BIRU} />
      <circle cx="78" cy="43" r="7" fill={BIRU} />
      <circle cx="44" cy="40" r="2.4" fill="#FFFFFF" />
      <circle cx="80" cy="40" r="2.4" fill="#FFFFFF" />
      <path d="M52 52 L60 64 L68 52 Z" fill={EMAS} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita berbagai cara penjumlahan">
      {id === "B2-S1" && <AdeganKeranjang />}
      {id === "B2-S2" && <AdeganBagan />}
      {id === "B2-S3" && <AdeganLompat />}
      {id === "B2-S4" && <AdeganKepik />}
      {id === "B2-S5" && <AdeganJari />}
      {id === "B2-S6" && <AdeganBingkai />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 51-62). Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_B2: Cerita[] = [
  {
    id: "B2-S1",
    sceneType: "keranjang-apel",
    voiceNarration:
      "Kira membawa keranjang berisi lima buah apel. Tiga apel merah dan dua apel hijau. Igil bertanya: bagaimana caramu menjumlahkan? Hari ini kita belajar berbagai cara melakukan penjumlahan.",
  },
  {
    id: "B2-S2",
    sceneType: "bagan-pasangan",
    voiceNarration:
      "Igil menggambar bagan di papan. Lingkaran besar disebut gabungan, isinya lima. Dua lingkaran kecil disebut sebagian, isinya tiga dan dua. Tiga dan dua jika digabungkan menjadi lima. Dua dan tiga juga menjadi lima.",
  },
  {
    id: "B2-S3",
    sceneType: "lompat-petak",
    voiceNarration:
      "Upe berdiri di angka lima. Dia melompat tiga langkah ke depan. Enam, tujuh, delapan. Sekarang Upe ada di angka delapan. Lima ditambah tiga sama dengan delapan. Ini cara menghitung maju.",
  },
  {
    id: "B2-S4",
    sceneType: "kepik-kembar",
    voiceNarration:
      "Lihat kepik ini. Sayap kirinya punya tiga totol. Sayap kanannya juga punya tiga totol. Tiga ditambah tiga sama dengan enam. Menambahkan bilangan yang sama disebut penjumlahan berulang.",
  },
  {
    id: "B2-S5",
    sceneType: "jari-sepuluh",
    voiceNarration:
      "Kira, Halim, dan Wei menunjukkan jari mereka. Ada delapan jari terbuka dan dua jari tertutup. Semuanya ada sepuluh jari. Delapan ditambah dua sama dengan sepuluh.",
  },
  {
    id: "B2-S6",
    sceneType: "bingkai-sepuluh",
    voiceNarration:
      "Wei menunjukkan bingkai sepuluh. Ada sembilan bola merah dan satu bola biru. Jika digabungkan menjadi sepuluh bola. Sembilan ditambah satu sama dengan sepuluh. Apakah kamu menemukan pasangan lainnya?",
  },
];

/** Peta pikiran lima simpul: empat cara dan satu pilihan. */
export const PETA_PIKIRAN_B2: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Pasangan Bilangan",
    stepDesc:
      "Dua bilangan jika digabungkan menjadi satu bilangan. Tiga dan dua menjadi lima. Dua dan tiga juga menjadi lima, jadi boleh ditukar tempat.",
    icon: "🍎",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Menghitung Maju",
    stepDesc:
      "Mulai dari bilangan pertama, lalu melompat ke depan sebanyak bilangan kedua. Mulai dari lima, lompat tiga langkah, sampai di delapan.",
    icon: "🏃",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Penjumlahan Berulang",
    stepDesc:
      "Menambahkan bilangan yang sama. Tiga ditambah tiga sama dengan enam. Empat ditambah empat sama dengan delapan.",
    icon: "🐞",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Hasilnya 10",
    stepDesc:
      "Ada pasangan bilangan yang jumlahnya sepuluh: sembilan dan satu, delapan dan dua, tujuh dan tiga, enam dan empat, lima dan lima.",
    icon: "🔟",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Pilih Caramu",
    stepDesc:
      "Semua cara menghasilkan jawaban yang sama. Pilih cara yang paling kamu suka, lalu periksa dengan cara lain.",
    icon: "🌟",
  },
];

export function CeritaCaraB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B2} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
