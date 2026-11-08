"use client";

import React from "react";
import { BAWAH, BIRU, BukuCerita, EMAS, HIJAU, KUNING, Latar, MERAH_MUDA, type Cerita } from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab B: Nilai Tempat (Buku Siswa Kelas II hlm. 17-22).    */
/* Tokoh buku: Malosi, Tika, Lili. Balok disusun seperti balok Dienes: batang */
/* sepuluh ruas untuk satu puluhan dan kubus untuk satu satuan. Semua gambar  */
/* dibuat di klien (SVG), tanpa panggilan API. Naskah: naskah/mtk-2-bab1-sub-b-*.md */
/* ------------------------------------------------------------------------ */

const WARNA_BALOK = ["#F97316", "#3B82F6", "#22C55E", "#EAB308", "#EC4899"];

function Label({ x, y, w, teks, ukuran = 14 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="11" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 18.5} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Batang puluhan: sepuluh balok yang disusun menjadi satu batang. */
function BatangG({ x, y, h = 66 }: { x: number; y: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width="13" height={h} rx="3" fill="#F97316" stroke={BIRU} strokeWidth="2.2" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${x} ${y + ((i + 1) * h) / 10} H${x + 13}`} stroke={BIRU} strokeWidth="1.2" opacity="0.7" />
      ))}
    </g>
  );
}

/** Kubus satuan: satu balok. */
function KubusG({ x, y, s = 13, warna = 1 }: { x: number; y: number; s?: number; warna?: number }) {
  return <rect x={x} y={y} width={s} height={s} rx="2.5" fill={WARNA_BALOK[warna % 5]} stroke={BIRU} strokeWidth="1.8" />;
}

/** Satuan lepas disusun dalam baris, sembilan per baris. */
function Satuan({ x, y, n, s = 13, jarak = 15, kolom = 9 }: { x: number; y: number; n: number; s?: number; jarak?: number; kolom?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <KubusG key={i} x={x + (i % kolom) * jarak} y={y + Math.floor(i / kolom) * jarak} s={s} warna={i} />
      ))}
    </>
  );
}

/** Tabel nilai tempat kecil di dalam adegan. */
function TabelMini({ x, y, p, s }: { x: number; y: number; p: number | string; s: number | string }) {
  return (
    <g>
      <rect x={x} y={y} width="74" height="18" rx="4" fill="#FECACA" stroke={BIRU} strokeWidth="2" />
      <rect x={x + 76} y={y} width="74" height="18" rx="4" fill="#BFDBFE" stroke={BIRU} strokeWidth="2" />
      <text x={x + 37} y={y + 13} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
        Puluhan
      </text>
      <text x={x + 113} y={y + 13} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
        Satuan
      </text>
      <rect x={x} y={y + 20} width="74" height="34" rx="6" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <rect x={x + 76} y={y + 20} width="74" height="34" rx="6" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <text x={x + 37} y={y + 46} textAnchor="middle" fontSize="24" fontWeight="900" fill={BIRU}>
        {p}
      </text>
      <text x={x + 113} y={y + 46} textAnchor="middle" fontSize="24" fontWeight="900" fill={BIRU}>
        {s}
      </text>
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 18: Malosi bermain balok dan ingin menghitung banyak balok. */
function AdeganMainBalok() {
  const sebar: [number, number][] = [
    [96, 60], [124, 84], [152, 56], [180, 88], [208, 62], [236, 90], [108, 112], [138, 130], [168, 112], [198, 134],
    [226, 116], [124, 156], [156, 150], [190, 160],
  ];
  return (
    <>
      <Latar />
      {sebar.map(([x, y], i) => (
        <KubusG key={i} x={x} y={y} s={17} warna={i} />
      ))}
      <Tokoh x={44} y={192} rambut="#1F2937" baju={HIJAU} s={0.92} angkat />
      <Lencana x={256} y={50} teks="?" r={20} />
      <Label x={68} y={6} w={164} teks="Berapa balokku?" />
    </>
  );
}

/** Sepuluh balok disusun satu batang. Empat balok sisa. */
function AdeganSatuPuluhan() {
  return (
    <>
      <Latar />
      <BatangG x={44} y={54} h={84} />
      <Satuan x={92} y={96} n={4} s={17} jarak={21} kolom={4} />
      <text x="52" y="156" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        10 balok
      </text>
      <text x="26" y="172" fontSize="11.5" fontWeight="900" fill={BIRU}>
        = 1 puluhan
      </text>
      <text x="124" y="132" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        4 satuan
      </text>
      <TabelMini x={150} y={34} p={1} s={4} />
      <Lencana x={226} y={118} teks="14" r={22} />
      <Label x={152} y={150} w={140} teks="1 puluhan + 4 satuan" ukuran={11} />
      <Tokoh x={262} y={202} rambut="#7A4A1E" baju={KUNING} s={0.62} angkat />
    </>
  );
}

/** Buku hlm. 17: dua puluhan dan delapan satuan sama dengan 28. */
function AdeganTabelDuaPuluhan() {
  return (
    <>
      <Latar />
      <BatangG x={24} y={46} h={78} />
      <BatangG x={44} y={46} h={78} />
      <Satuan x={72} y={72} n={8} s={15} jarak={18} kolom={4} />
      <TabelMini x={150} y={30} p={2} s={8} />
      <Lencana x={226} y={112} teks="28" r={22} />
      <Label x={146} y={148} w={146} teks="2 puluhan + 8 satuan" ukuran={11} />
      <Label x={8} y={142} w={108} teks="Tabel nilai tempat" ukuran={10.5} />
      <Tokoh x={266} y={202} rambut="#1F2937" baju={MERAH_MUDA} s={0.6} angkat />
    </>
  );
}

/** Cara 1 (hlm. 18): 26 satuan, tidak ada puluhan. */
function AdeganCara1() {
  return (
    <>
      <Latar />
      <Satuan x={10} y={50} n={26} s={14} jarak={17} kolom={9} />
      <TabelMini x={150} y={112} p={0} s={26} />
      <Label x={8} y={6} w={110} teks="Cara 1" ukuran={15} />
      <Label x={128} y={6} w={164} teks="26 satuan" ukuran={14} />
      <Lencana x={256} y={70} teks="26" r={20} />
      <Tokoh x={52} y={202} rambut="#1F2937" baju={HIJAU} s={0.7} angkat />
    </>
  );
}

/** Cara 2 (hlm. 19): 1 puluhan dan 16 satuan. */
function AdeganCara2() {
  return (
    <>
      <Latar />
      <BatangG x={22} y={44} h={84} />
      <Satuan x={56} y={50} n={16} s={14} jarak={17} kolom={8} />
      <TabelMini x={150} y={112} p={1} s={16} />
      <Label x={8} y={6} w={110} teks="Cara 2" ukuran={15} />
      <Label x={128} y={6} w={164} teks="1 puluhan 16 satuan" ukuran={12} />
      <Lencana x={256} y={72} teks="26" r={20} />
      <Tokoh x={36} y={202} rambut="#7A4A1E" baju={KUNING} s={0.7} angkat />
    </>
  );
}

/** Cara 3 (hlm. 19): 2 puluhan dan 6 satuan, cara yang paling ringkas. */
function AdeganCara3() {
  return (
    <>
      <Latar />
      <BatangG x={22} y={44} h={84} />
      <BatangG x={42} y={44} h={84} />
      <Satuan x={76} y={70} n={6} s={16} jarak={20} kolom={3} />
      <TabelMini x={150} y={112} p={2} s={6} />
      <Label x={8} y={6} w={110} teks="Cara 3" ukuran={15} />
      <Label x={128} y={6} w={164} teks="2 puluhan 6 satuan" ukuran={12} />
      <Lencana x={256} y={72} teks="26" r={20} />
      <g className="igil-lompat" style={BAWAH}>
        <text x="206" y="104" fontSize="26" aria-hidden="true">
          ⭐
        </text>
      </g>
      <Tokoh x={36} y={202} rambut="#1F2937" baju={EMAS} s={0.7} angkat />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita nilai tempat">
      {id === "K2B-S1" && <AdeganMainBalok />}
      {id === "K2B-S2" && <AdeganSatuPuluhan />}
      {id === "K2B-S3" && <AdeganTabelDuaPuluhan />}
      {id === "K2B-S4" && <AdeganCara1 />}
      {id === "K2B-S5" && <AdeganCara2 />}
      {id === "K2B-S6" && <AdeganCara3 />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 17-19). Naskah dibacakan Suara Guru, tidak ditulis di layar. */
export const CERITA_K2B: Cerita[] = [
  {
    id: "K2B-S1",
    sceneType: "main-balok",
    voiceNarration:
      "Malosi sedang bermain balok. Balok-balok berserakan di lantai. Malosi ingin tahu berapa banyak balok yang ia punya. Kalau dihitung satu per satu, bisa lama dan mudah salah. Ada cara yang lebih rapi, yaitu memakai nilai tempat. Kita menghitung banyak benda dengan memakai puluhan dan satuan. Ayo kita lihat caranya bersama Malosi.",
  },
  {
    id: "K2B-S2",
    sceneType: "satu-puluhan",
    voiceNarration:
      "Sepuluh balok disusun menjadi satu batang. Satu batang berisi sepuluh balok disebut satu puluhan. Balok yang tersisa, tidak sampai sepuluh, disebut satuan. Di sini ada satu puluhan dan empat satuan. Kita tulis di tabel nilai tempat. Satu di kolom puluhan dan empat di kolom satuan. Satu puluhan dan empat satuan sama dengan empat belas.",
  },
  {
    id: "K2B-S3",
    sceneType: "tabel-nilai-tempat",
    voiceNarration:
      "Ini adalah tabel nilai tempat. Kolom kiri untuk puluhan, kolom kanan untuk satuan. Dua batang berarti dua puluhan, dan delapan balok lepas berarti delapan satuan. Tulis dua di kolom puluhan dan delapan di kolom satuan. Dua puluhan dan delapan satuan sama dengan dua puluh delapan. Angka di sebelah kiri menunjukkan banyak puluhan, dan angka di sebelah kanan menunjukkan banyak satuan.",
  },
  {
    id: "K2B-S4",
    sceneType: "cara-satu",
    voiceNarration:
      "Malosi punya dua puluh enam balok. Ia menuliskannya dengan tiga cara. Cara pertama, semua balok dibiarkan lepas. Nol puluhan dan dua puluh enam satuan. Dua puluh enam adalah dua puluh enam satuan. Cara ini benar, tetapi kita harus menghitung dua puluh enam balok satu per satu.",
  },
  {
    id: "K2B-S5",
    sceneType: "cara-dua",
    voiceNarration:
      "Cara kedua. Malosi menyusun sepuluh balok menjadi satu batang. Sisanya masih lepas, ada enam belas balok. Satu puluhan dan enam belas satuan. Dua puluh enam adalah satu puluhan dan enam belas satuan. Periksa: sepuluh ditambah enam belas sama dengan dua puluh enam. Cara ini juga benar, tetapi masih ada sepuluh balok lepas yang bisa disusun lagi.",
  },
  {
    id: "K2B-S6",
    sceneType: "cara-tiga",
    voiceNarration:
      "Cara ketiga. Malosi menyusun semua sepuluh balok yang bisa disusun. Ada dua batang dan enam balok lepas. Dua puluhan dan enam satuan. Dua puluh enam adalah dua puluhan dan enam satuan. Ini cara yang paling ringkas, karena satuannya kurang dari sepuluh. Jadi bilangan dua puluh enam bisa ditulis dengan tiga cara. Kita menuliskan dua puluh enam dengan dua puluhan dan enam satuan. Setiap cara menghasilkan jumlah yang sama.",
  },
];

/** Peta pikiran enam simpul: dari mengelompokkan sepuluh sampai menulis cara yang paling ringkas. */
export const PETA_PIKIRAN_K2B: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Kelompokkan Sepuluh",
    stepDesc:
      "Susun setiap sepuluh benda menjadi satu kelompok, misalnya satu batang balok. Balok Dienes adalah alat peraga yang dipakai di banyak sekolah: satu kubus kecil untuk satu satuan, satu batang sepuluh ruas untuk satu puluhan. Dengan alat ini, sepuluh terlihat sekaligus sebagai satu benda.",
    icon: "🧱",
    flowFrom: "Kelompokkan sepuluh",
    flowTo: "Puluhan dan satuan",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Puluhan dan Satuan",
    stepDesc:
      "Satu kelompok sepuluh disebut satu puluhan. Benda yang tersisa, kurang dari sepuluh, disebut satuan. Empat belas adalah satu puluhan dan empat satuan. Dua puluh delapan adalah dua puluhan dan delapan satuan.",
    icon: "🔟",
    flowFrom: "Puluhan dan satuan",
    flowTo: "Tabel nilai tempat",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Tabel Nilai Tempat",
    stepDesc:
      "Tabel nilai tempat punya dua kolom. Kolom kiri untuk puluhan dan kolom kanan untuk satuan. Tuliskan banyak puluhan dan banyak satuan. Bilangan yang terbentuk dibaca dari kiri: puluhan dulu, lalu satuan. Papan manik emas Montessori memakai ide yang sama.",
    icon: "📋",
    flowFrom: "Tabel nilai tempat",
    flowTo: "Nilai angka",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Nilai Angka",
    stepDesc:
      "Letak angka menentukan nilainya. Pada 26, angka 2 ada di tempat puluhan jadi nilainya 20, dan angka 6 ada di tempat satuan jadi nilainya 6. Karena itu 26 dan 62 berbeda, dan 24 tidak sama dengan 42. Itulah mengapa dinamakan nilai tempat.",
    icon: "🔍",
    flowFrom: "Nilai angka",
    flowTo: "Tukar sepuluh satuan",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Tukar Sepuluh Satuan",
    stepDesc:
      "Sepuluh satuan bisa ditukar menjadi satu puluhan, dan satu puluhan bisa dibuka lagi menjadi sepuluh satuan. Nilainya tidak berubah. Karena itu 26 bisa ditulis 26 satuan, 1 puluhan 16 satuan, atau 2 puluhan 6 satuan. Pertukaran ini juga dipakai nanti saat menjumlah dan mengurang dengan meminjam atau menyimpan.",
    icon: "🔁",
    flowFrom: "Tukar sepuluh satuan",
    flowTo: "Cara paling ringkas",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Cara Paling Ringkas",
    stepDesc:
      "Tukarkan semua sepuluh satuan sampai satuannya kurang dari sepuluh. Itulah cara menulis yang paling ringkas dan paling umum: dua puluhan dan enam satuan. Periksa selalu dengan menghitung nilainya: 20 ditambah 6 sama dengan 26.",
    icon: "⭐",
    flowFrom: "Cara paling ringkas",
    flowTo: "Nilai tempat siap dipakai",
  },
];

export function CeritaNilaiK2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_K2B} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
