"use client";

import React from "react";
import {
  BIRU,
  BukuCerita,
  EMAS,
  HIJAU,
  KUNING,
  Latar,
  MERAH_MUDA,
  type Cerita,
} from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { IsiBalok, IsiIkatPensil, IsiKantong, IsiKelereng, IsiMenara, IsiPensil } from "./nilai-c5-dasar";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab C: Nilai Tempat (Buku Siswa Kelas 1 hlm. 160-164).           */
/* Maskot: Igil si burung hantu. Tokoh buku: Halim, Malosi, Kira, Wei, Tika.   */
/* Semua gambar dibuat di klien (SVG), tanpa panggilan API.                   */
/* Naskah: naskah/mtk-1-bab5-sub-c-nilai-tempat.md                            */
/* ------------------------------------------------------------------------ */

/** Label putih berbingkai. */
function Label({ x, y, w, teks, ukuran = 14 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Keterangan kecil di atas rumput. */
function Ket({ x, y, teks, warna = BIRU }: { x: number; y: number; teks: string; warna?: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={warna}>
      {teks}
    </text>
  );
}

/** Sel tabel nilai tempat di dalam adegan. */
function TabelAdegan({ x, y, w = 112, tinggi = 26, p, s }: { x: number; y: number; w?: number; tinggi?: number; p: string; s: string }) {
  const sel = w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={tinggi} fill="#E9D8F3" stroke={BIRU} strokeWidth="2.6" />
      <rect x={x} y={y + tinggi} width={w} height={tinggi + 6} fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <path d={`M${x + sel} ${y} V${y + tinggi * 2 + 6}`} stroke={BIRU} strokeWidth="2.6" />
      <text x={x + sel / 2} y={y + tinggi - 8} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
        Puluhan
      </text>
      <text x={x + sel + sel / 2} y={y + tinggi - 8} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
        Satuan
      </text>
      <text x={x + sel / 2} y={y + tinggi + 27} textAnchor="middle" fontSize="26" fontWeight="900" fill="#B91C1C">
        {p}
      </text>
      <text x={x + sel + sel / 2} y={y + tinggi + 27} textAnchor="middle" fontSize="26" fontWeight="900" fill="#1D4ED8">
        {s}
      </text>
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 161: Halim punya 15 kelereng. Sepuluh dalam kantong, lima di luar. */
function AdeganKantong() {
  const lepas: [number, number, number][] = [
    [204, 122, 1],
    [226, 118, 2],
    [248, 122, 3],
    [214, 142, 4],
    [238, 142, 5],
  ];
  return (
    <>
      <Latar />
      <g transform="translate(78 44) scale(1.2)">
        <IsiKantong />
      </g>
      {lepas.map(([x, y, w]) => (
        <g key={x} transform={`translate(${x - 10} ${y - 10}) scale(0.5)`}>
          <IsiKelereng warna={w} />
        </g>
      ))}
      <Tokoh x={34} y={190} rambut="#1F2937" baju={HIJAU} s={0.85} angkat />
      <Ket x={128} y={166} teks="1 puluhan" warna="#B91C1C" />
      <Ket x={228} y={166} teks="5 satuan" warna="#1D4ED8" />
      <Label x={72} y={4} w={156} teks="10 + 5 = 15" />
    </>
  );
}

/** Buku hlm. 161: Kira mengikat 10 pensil, tiga pensil lepas. */
function AdeganPensil() {
  return (
    <>
      <Latar />
      <g transform="translate(88 56) scale(1.22)">
        <IsiIkatPensil />
      </g>
      {[222, 242, 262].map((x) => (
        <g key={x} transform={`translate(${x} 104) scale(0.8)`}>
          <IsiPensil />
        </g>
      ))}
      <Tokoh x={34} y={190} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.85} angkat />
      <Ket x={140} y={168} teks="1 puluhan" warna="#B91C1C" />
      <Ket x={244} y={168} teks="3 satuan" warna="#1D4ED8" />
      <Label x={46} y={4} w={208} teks="1 puluhan dan 3 satuan = 13" ukuran={13} />
    </>
  );
}

/** Buku hlm. 162: Wei menyusun menara sepuluh balok, empat balok lepas. */
function AdeganBalok() {
  const lepas: [number, number][] = [
    [182, 110],
    [226, 110],
    [182, 138],
    [226, 138],
  ];
  return (
    <>
      <Latar />
      <g transform="translate(98 48)">
        <IsiMenara />
      </g>
      {lepas.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <IsiBalok />
        </g>
      ))}
      <Tokoh x={34} y={190} rambut="#1F2937" baju={EMAS} s={0.85} angkat />
      <Ket x={120} y={168} teks="1 puluhan" warna="#B91C1C" />
      <Ket x={226} y={176} teks="4 satuan" warna="#1D4ED8" />
      <Label x={46} y={4} w={208} teks="1 puluhan dan 4 satuan = 14" ukuran={13} />
    </>
  );
}

/** Buku hlm. 162, Ayo Mencoba: Tika mengikat sepuluh lidi, dua lidi lepas, lalu mengisi tabel. */
function AdeganLidi() {
  return (
    <>
      <Latar />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${34 + i * 4.6} 52 V128`} stroke="#A8672D" strokeWidth="3" strokeLinecap="round" />
      ))}
      <rect x="30" y="84" width="54" height="8" rx="2.5" fill="#FACC15" stroke={BIRU} strokeWidth="1.8" />
      {[100, 110].map((x) => (
        <path key={x} d={`M${x} 60 V128`} stroke="#A8672D" strokeWidth="3" strokeLinecap="round" />
      ))}
      <path d="M118 90 H138" stroke={EMAS} strokeWidth="5" strokeLinecap="round" />
      <polygon points="146,90 134,81 134,99" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <TabelAdegan x={156} y={52} w={112} p="1" s="2" />
      <Tokoh x={282} y={192} rambut="#7A4A1E" baju={HIJAU} s={0.82} angkat />
      <Ket x={58} y={148} teks="10 lidi diikat" warna="#B91C1C" />
      <Ket x={212} y={136} teks="1 puluhan dan 2 satuan = 12" warna={BIRU} />
      <Label x={64} y={2} w={172} teks="Ayo Mencoba: ikat lidi" ukuran={13} />
    </>
  );
}

/** Papan nilai tempat bilangan lima belas. */
function AdeganPapan() {
  return (
    <>
      <Latar />
      <TabelAdegan x={64} y={42} w={172} tinggi={30} p="1" s="5" />
      <path d="M96 122 V112" stroke={MERAH_B5} strokeWidth="3" strokeLinecap="round" />
      <polygon points="96,106 90,114 102,114" fill={MERAH_B5} />
      <path d="M204 122 V112" stroke={BIRU_B5} strokeWidth="3" strokeLinecap="round" />
      <polygon points="204,106 198,114 210,114" fill={BIRU_B5} />
      <Ket x={96} y={136} teks="kiri: puluhan" warna="#B91C1C" />
      <Ket x={204} y={136} teks="kanan: satuan" warna="#1D4ED8" />
      <Tokoh x={30} y={192} rambut="#1F2937" baju={KUNING} s={0.8} angkat />
      <Tokoh x={272} y={192} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.8} angkat />
      <Lencana x={150} y={168} teks="15" r={17} />
      <Label x={64} y={4} w={172} teks="Papan Nilai Tempat" />
    </>
  );
}

/** Dua angka satu pada bilangan sebelas, nilainya berbeda. */
function AdeganSama() {
  return (
    <>
      <Latar />
      <rect x="92" y="38" width="116" height="58" rx="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3.4" />
      <text x="124" y="84" textAnchor="middle" fontSize="48" fontWeight="900" fill="#B91C1C">
        1
      </text>
      <text x="176" y="84" textAnchor="middle" fontSize="48" fontWeight="900" fill="#1D4ED8">
        1
      </text>
      <path d="M124 98 V108 M176 98 V108" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(88 110) scale(0.62)">
        <IsiIkatPensil />
      </g>
      <g transform="translate(168 114) scale(0.58)">
        <IsiPensil />
      </g>
      <Ket x={118} y={172} teks="= 10" warna="#B91C1C" />
      <Ket x={176} y={172} teks="= 1" warna="#1D4ED8" />
      <Tokoh x={34} y={190} rambut="#1F2937" baju={MERAH_MUDA} s={0.85} angkat />
      <Tokoh x={268} y={190} rambut="#7A4A1E" baju={HIJAU} s={0.85} />
      <Label x={46} y={0} w={208} teks="Angka sama, nilai berbeda" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita nilai tempat puluhan dan satuan">
      {id === "C5-S1" && <AdeganKantong />}
      {id === "C5-S2" && <AdeganPensil />}
      {id === "C5-S3" && <AdeganBalok />}
      {id === "C5-S4" && <AdeganLidi />}
      {id === "C5-S5" && <AdeganPapan />}
      {id === "C5-S6" && <AdeganSama />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 160-164) dan pengayaan nilai angka. */
export const CERITA_C5: Cerita[] = [
  {
    id: "C5-S1",
    sceneType: "kantong-kelereng",
    voiceNarration:
      "Halim punya lima belas kelereng. Dapatkah kamu menemukan pasangan bilangan dari lima belas? Halim memasukkan sepuluh kelereng ke dalam satu kantong. Sepuluh kelereng yang digabungkan disebut satu puluhan. Masih ada lima kelereng di luar kantong. Satu kelereng disebut satu satuan, jadi lima kelereng adalah lima satuan. Nilai tempat lima belas adalah satu puluhan dan lima satuan. Sepuluh dan lima menjadi lima belas.",
  },
  {
    id: "C5-S2",
    sceneType: "ikat-pensil",
    voiceNarration:
      "Kira mengikat sepuluh pensil menjadi satu ikat. Satu ikat berisi sepuluh pensil, itulah satu puluhan. Kira masih punya tiga pensil yang tidak diikat. Tiga pensil itu adalah tiga satuan. Jadi satu puluhan dan tiga satuan sama dengan tiga belas.",
  },
  {
    id: "C5-S3",
    sceneType: "menara-balok",
    voiceNarration:
      "Wei menyusun balok menjadi satu menara. Menara itu berisi sepuluh balok, jadi satu puluhan. Di sebelahnya ada empat balok lepas, jadi empat satuan. Satu puluhan dan empat satuan sama dengan empat belas.",
  },
  {
    id: "C5-S4",
    sceneType: "ayo-mencoba-lidi",
    voiceNarration:
      "Ayo mencoba bersama Tika! Tika membawa lidi. Dia mengambil sepuluh lidi lalu mengikatnya. Dia menghitung lidi yang tidak diikat, ada dua. Tika menulis hasilnya di tabel: satu puluhan dan dua satuan sama dengan dua belas. Lalu dia menyampaikan hasilnya kepada temannya.",
  },
  {
    id: "C5-S5",
    sceneType: "papan-nilai-tempat",
    voiceNarration:
      "Ini papan nilai tempat. Papan ini punya dua kolom, puluhan dan satuan. Bilangan dua angka ditulis dengan dua angka. Angka di sebelah kiri menunjukkan banyak puluhan. Angka di sebelah kanan menunjukkan banyak satuan. Pada lima belas, angka satu di kiri berarti satu puluhan, dan angka lima di kanan berarti lima satuan.",
  },
  {
    id: "C5-S6",
    sceneType: "angka-sama-nilai-berbeda",
    voiceNarration:
      "Kira melihat bilangan sebelas. Ada dua angka satu, tetapi nilainya berbeda! Angka satu di sebelah kiri berada di tempat puluhan, jadi nilainya sepuluh. Angka satu di sebelah kanan berada di tempat satuan, jadi nilainya satu. Angka yang sama bisa punya nilai berbeda, tergantung tempatnya. Sepuluh dan satu menjadi sebelas.",
  },
];

/** Peta pikiran enam simpul: dari mengikat sepuluh sampai nilai angka bergantung tempatnya. */
export const PETA_PIKIRAN_C5: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Ikat Sepuluh",
    stepDesc:
      "Kumpulkan sepuluh benda lalu ikat, masukkan ke kantong, atau susun menjadi menara. Sepuluh benda yang digabungkan disebut satu puluhan. Seperti menukar sepuluh keping satuan dengan satu batang puluhan.",
    icon: "🎀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Hitung Satuan",
    stepDesc:
      "Benda yang tidak ikut diikat berdiri sendiri. Satu benda disebut satu satuan. Hitung berapa banyak benda yang lepas itu. Banyaknya selalu kurang dari sepuluh.",
    icon: "🔢",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Isi Tabel Nilai Tempat",
    stepDesc:
      "Tabel nilai tempat punya dua kolom: puluhan di kiri dan satuan di kanan. Tulis banyak puluhan di kolom puluhan, dan banyak satuan di kolom satuan.",
    icon: "📋",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Baca Angkanya",
    stepDesc:
      "Angka di kiri menunjukkan puluhan dan angka di kanan menunjukkan satuan. Pada tiga belas, angka satu berarti satu puluhan dan angka tiga berarti tiga satuan.",
    icon: "🔍",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Tulis Kalimatnya",
    stepDesc:
      "Tulis nilai tempat seperti ini: satu puluhan dan tiga satuan sama dengan tiga belas. Puluhan dan satuan digabung menjadi satu bilangan, yaitu sepuluh ditambah tiga.",
    icon: "✍️",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Angka Sama, Tempat Beda",
    stepDesc:
      "Angka yang sama bisa punya nilai berbeda. Pada sebelas, angka satu di kiri bernilai sepuluh, sedangkan angka satu di kanan bernilai satu. Nilai sebuah angka bergantung pada tempatnya.",
    icon: "⚖️",
  },
];

export function CeritaNilaiC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_C5} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
