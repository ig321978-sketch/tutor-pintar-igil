"use client";

import React from "react";
import { BAWAH, BIRU, BukuCerita, EMAS, HIJAU, KUNING, Latar, MERAH_MUDA, TENGAH, type Cerita } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Label, Meja, Ruang } from "./gambar-bentuk-a4";
import { BendaBDi, type JenisBendaB, type Warna } from "./kelompok-b4-dasar";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab B: Mengelompokkan Benda (Buku Siswa Kelas 1 hlm. 127-133).   */
/* Maskot: Igil si burung hantu. Tokoh buku: Kira, Upe, Wei, Halim, Malosi,   */
/* Tika. Semua gambar dibuat di klien (SVG), tanpa panggilan API.             */
/* Naskah: naskah/mtk-1-bab4-sub-b-mengelompokkan-benda.md                     */
/* ------------------------------------------------------------------------ */

const COKELAT = "#A8672D";

/** Nampan kue. Isi diletakkan di atasnya oleh pemanggil. */
function Nampan({ x, y, w, h, isi = "#FFF3D6" }: { x: number; y: number; w: number; h: number; isi?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx="10" fill={isi} stroke={COKELAT} strokeWidth="3.4" />;
}

function Teks({ x, y, teks, ukuran = 12 }: { x: number; y: number; teks: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
      {teks}
    </text>
  );
}

type Letak = { j: JenisBendaB; x: number; y: number; w: number; warna?: Warna };

function Sebar({ daftar }: { daftar: Letak[] }) {
  return (
    <>
      {daftar.map((d, i) => (
        <BendaBDi key={`${d.j}-${i}`} jenis={d.j} warna={d.warna} x={d.x} y={d.y} w={d.w} />
      ))}
    </>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 127: enam kue tradisional di meja. Apakah ada yang sama? */
function AdeganMejaKue() {
  return (
    <>
      <Ruang />
      <Meja x={34} y={124} lebar={232} />
      <Sebar
        daftar={[
          { j: "talam", x: 44, y: 90, w: 34 },
          { j: "risol", x: 82, y: 90, w: 34 },
          { j: "lapisHijau", x: 120, y: 90, w: 34 },
          { j: "cucur", x: 158, y: 90, w: 34 },
          { j: "lupis", x: 196, y: 90, w: 34 },
          { j: "brownies", x: 232, y: 90, w: 34 },
        ]}
      />
      <Tokoh x={18} y={192} rambut="#1F2937" baju={HIJAU} s={0.88} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={284} y={192} rambut="#7A4A1E" baju={KUNING} s={0.88} />
      </g>
      <Lencana x={150} y={62} teks="?" r={19} />
      <Label x={72} y={12} w={156} teks="Sama atau beda?" ukuran={14} />
    </>
  );
}

/** Buku hlm. 128: kelompok menurut bentuk. Dua kue di setiap nampan. */
function AdeganMenurutBentuk() {
  const nampan = [
    { x: 8, nama: "Lengkung", isi: ["cucur", "talam"] as JenisBendaB[] },
    { x: 104, nama: "Segitiga", isi: ["risol", "lupis"] as JenisBendaB[] },
    { x: 200, nama: "Segi empat", isi: ["lapisHijau", "brownies"] as JenisBendaB[] },
  ];
  return (
    <>
      <Ruang />
      <rect x="4" y="138" width="292" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2.2" />
      {nampan.map((n) => (
        <g key={n.nama}>
          <Nampan x={n.x} y={52} w={92} h={84} />
          <Teks x={n.x + 46} y={72} teks={n.nama} ukuran={13} />
          <BendaBDi jenis={n.isi[0]} x={n.x + 8} y={86} w={34} />
          <BendaBDi jenis={n.isi[1]} x={n.x + 50} y={86} w={34} />
        </g>
      ))}
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={40} y={204} rambut="#1F2937" baju={EMAS} s={0.62} angkat />
      </g>
      <Tokoh x={262} y={204} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.62} angkat />
      <Label x={80} y={10} w={140} teks="Menurut bentuk" ukuran={14} />
    </>
  );
}

/** Buku hlm. 128: kelompok menurut warna. Kue yang sama masuk kelompok lain. */
function AdeganMenurutWarna() {
  return (
    <>
      <Ruang />
      <rect x="4" y="138" width="292" height="9" rx="3" fill="#C98A4B" stroke={BIRU} strokeWidth="2.2" />
      <Nampan x={8} y={52} w={136} h={84} isi="#F3D9B8" />
      <Teks x={76} y={72} teks="Cokelat" ukuran={14} />
      <Sebar
        daftar={[
          { j: "cucur", x: 14, y: 88, w: 36 },
          { j: "risol", x: 54, y: 88, w: 36 },
          { j: "brownies", x: 94, y: 88, w: 36 },
        ]}
      />
      <Nampan x={156} y={52} w={136} h={84} isi="#D7F2E0" />
      <Teks x={224} y={72} teks="Hijau" ukuran={14} />
      <Sebar
        daftar={[
          { j: "talam", x: 162, y: 88, w: 36 },
          { j: "lapisHijau", x: 202, y: 88, w: 36 },
          { j: "lupis", x: 242, y: 88, w: 36 },
        ]}
      />
      <Tokoh x={40} y={204} rambut="#1F2937" baju={HIJAU} s={0.62} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={262} y={204} rambut="#7A4A1E" baju={KUNING} s={0.62} />
      </g>
      <Label x={80} y={10} w={140} teks="Menurut warna" ukuran={14} />
    </>
  );
}

/** Buku hlm. 129 (Ayo Mencoba): buah besar dan buah kecil. */
function AdeganBuah() {
  return (
    <>
      <Latar />
      <path d="M170 50 V150" stroke={EMAS} strokeWidth="4" strokeDasharray="3 8" strokeLinecap="round" />
      <Sebar
        daftar={[
          { j: "semangka", x: 18, y: 70, w: 80 },
          { j: "melon", x: 104, y: 84, w: 64 },
          { j: "anggur", x: 186, y: 108, w: 40 },
          { j: "sawo", x: 238, y: 110, w: 38 },
        ]}
      />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={60} y={200} rambut={BIRU} baju={EMAS} s={0.7} angkat />
      </g>
      <Tokoh x={246} y={200} rambut="#7A4A1E" baju={HIJAU} s={0.7} />
      <Label x={40} y={14} w={100} teks="Besar" ukuran={16} />
      <Label x={184} y={14} w={66} teks="Kecil" ukuran={16} />
    </>
  );
}

/** Kotak mainan Tika. Setiap benda punya tiga ciri: bentuk, warna, dan ukuran. */
function AdeganKotakMainan() {
  return (
    <>
      <Ruang />
      <Sebar
        daftar={[
          { j: "bola", warna: "merah", x: 84, y: 56, w: 52 },
          { j: "kotak", warna: "biru", x: 138, y: 70, w: 38 },
          { j: "topi", warna: "hijau", x: 178, y: 66, w: 40 },
          { j: "bola", warna: "kuning", x: 222, y: 86, w: 26 },
        ]}
      />
      <path d="M62 104 H238 L228 148 H72 Z" fill="#C98A4B" stroke={BIRU} strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M72 120 H228" stroke="#A8672D" strokeWidth="3" />
      <Label x={6} y={10} w={84} teks="bentuk" ukuran={13} />
      <Label x={108} y={10} w={84} teks="warna" ukuran={13} />
      <Label x={210} y={10} w={84} teks="ukuran" ukuran={13} />
      <g className="igil-lompat" style={BAWAH}>
        <svg x="0" y="112" width="74" height="50" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
      <Tokoh x={268} y={196} rambut="#1F2937" baju={MERAH_MUDA} s={0.86} angkat />
    </>
  );
}

/** Kira merapikan mainan menurut warna. Satu rak untuk satu warna. */
function AdeganMerapikan() {
  const baris: { y: number; warna: Warna }[] = [
    { y: 40, warna: "merah" },
    { y: 74, warna: "kuning" },
    { y: 108, warna: "biru" },
  ];
  return (
    <>
      <Ruang />
      <rect x="64" y="26" width="172" height="118" rx="6" fill="#F6E3C4" stroke={BIRU} strokeWidth="3.4" />
      <path d="M64 68 H236 M64 102 H236" stroke={BIRU} strokeWidth="3.4" />
      {baris.map((b) => (
        <g key={b.warna}>
          <BendaBDi jenis="bola" warna={b.warna} x={92} y={b.y} w={26} />
          <BendaBDi jenis="kotak" warna={b.warna} x={136} y={b.y} w={26} />
          <BendaBDi jenis="topi" warna={b.warna} x={180} y={b.y} w={26} />
        </g>
      ))}
      <g className="igil-denyut" style={TENGAH}>
        <Label x={102} y={158} w={96} teks="Rapi!" ukuran={16} />
      </g>
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={26} y={196} rambut="#1F2937" baju={EMAS} s={0.9} angkat />
      </g>
      <Tokoh x={276} y={196} rambut="#7A4A1E" baju={HIJAU} s={0.9} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita mengelompokkan benda">
      {id === "B4-S1" && <AdeganMejaKue />}
      {id === "B4-S2" && <AdeganMenurutBentuk />}
      {id === "B4-S3" && <AdeganMenurutWarna />}
      {id === "B4-S4" && <AdeganBuah />}
      {id === "B4-S5" && <AdeganKotakMainan />}
      {id === "B4-S6" && <AdeganMerapikan />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 127-129) dan diperkaya. Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_B4: Cerita[] = [
  {
    id: "B4-S1",
    sceneType: "meja-kue-tradisional",
    voiceNarration:
      "Ibu menyiapkan kue tradisional di meja. Ada kue cucur yang cokelat dan bulat. Ada kue risol yang cokelat dan runcing. Ada kue talam yang hijau. Ada kue lapis hijau yang bertingkat. Ada bolu cokelat yang berpojok empat. Dan ada kue lupis yang hijau berbentuk segitiga. Igil bertanya, apakah ada yang sama? Ayo kita kelompokkan. Mengelompokkan artinya mengumpulkan benda yang punya ciri sama. Bagaimana kamu mengelompokkannya? Jelaskan alasanmu.",
  },
  {
    id: "B4-S2",
    sceneType: "kelompok-menurut-bentuk",
    voiceNarration:
      "Kira dan Upe mengelompokkan kue menurut bentuknya. Di nampan pertama ada kue cucur dan kue talam. Tepi keduanya melengkung, jadi mereka bentuk lengkung. Di nampan kedua ada kue risol dan kue lupis. Keduanya berbentuk segitiga. Di nampan ketiga ada kue lapis hijau dan bolu cokelat. Keduanya berbentuk segi empat. Lihat, ada dua kue di setiap nampan. Satu aturan, yaitu bentuk, membuat tiga kelompok.",
  },
  {
    id: "B4-S3",
    sceneType: "kelompok-menurut-warna",
    voiceNarration:
      "Sekarang Wei dan Tika mengelompokkan kue yang sama, tetapi dengan aturan lain, yaitu warna. Nampan pertama untuk warna cokelat: kue cucur, kue risol, dan bolu cokelat. Nampan kedua untuk warna hijau: kue talam, kue lapis hijau, dan kue lupis. Kue yang sama bisa masuk kelompok yang berbeda kalau aturannya berbeda. Menurut bentuk, kue talam masuk kelompok lengkung. Menurut warna, kue talam masuk kelompok hijau. Ada tiga kue cokelat dan tiga kue hijau.",
  },
  {
    id: "B4-S4",
    sceneType: "buah-besar-kecil",
    voiceNarration:
      "Malosi dan Halim membawa buah ke meja. Ada semangka, melon, anggur, dan sawo. Semangka dan melon ukurannya besar. Anggur dan sawo ukurannya kecil. Selain menurut bentuk dan warna, benda juga bisa dikelompokkan menurut ukuran. Ada kelompok besar dan kelompok kecil. Semua buah ini bentuknya lengkung, tetapi ukurannya tidak sama. Besar dan kecil dibandingkan dengan benda lain yang ada di dekatnya.",
  },
  {
    id: "B4-S5",
    sceneType: "kotak-mainan-tiga-ciri",
    voiceNarration:
      "Tika punya kotak mainan. Isinya bola merah yang besar, kotak hadiah biru, topi pesta hijau, dan bola kuning yang kecil. Igil berkata, setiap benda punya tiga ciri. Ciri pertama adalah bentuk. Ciri kedua adalah warna. Ciri ketiga adalah ukuran. Kita boleh memilih satu ciri untuk dijadikan aturan. Sebelum mulai, putuskan dulu aturannya. Lalu periksa setiap benda: cocok dengan aturan, atau tidak?",
  },
  {
    id: "B4-S6",
    sceneType: "merapikan-mainan",
    voiceNarration:
      "Kamar Kira berantakan. Kira merapikan mainannya dengan satu aturan, yaitu warna. Rak pertama untuk mainan merah. Rak kedua untuk mainan kuning. Rak ketiga untuk mainan biru. Sekarang kamar Kira rapi, dan mainan mudah dicari. Lain kali, Kira bisa merapikan menurut bentuk atau menurut ukuran. Mengelompokkan membantu kita merapikan, mencari, dan menghitung benda dengan cepat. Ayo kelompokkan benda di sekitarmu.",
  },
];

/** Peta pikiran enam simpul: dari mengamati benda sampai mengganti aturan. */
export const PETA_PIKIRAN_B4: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Amati Semua Benda",
    stepDesc:
      "Lihat semua benda dengan teliti. Tanyakan pada dirimu: apa yang sama, dan apa yang berbeda? Perhatikan tiga hal: bentuknya, warnanya, dan ukurannya. Jangan terburu-buru, karena ciri yang sama kadang tersembunyi.",
    icon: "👀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Pilih Satu Aturan",
    stepDesc:
      "Pilih satu ciri untuk dijadikan aturan. Aturannya bisa bentuk, warna, atau ukuran. Pakai satu aturan saja dalam satu kali mengelompokkan. Kalau aturannya dicampur, kelompoknya jadi membingungkan.",
    icon: "📏",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Periksa Tiap Benda",
    stepDesc:
      "Ambil benda satu per satu, lalu tanyakan: apakah benda ini cocok dengan aturan? Kalau aturannya warna hijau, tanyakan: apakah benda ini hijau? Kalau jawabannya ya, benda itu boleh masuk. Kalau tidak, ia mencari kelompok lain.",
    icon: "🔍",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Taruh di Kelompoknya",
    stepDesc:
      "Letakkan benda di kelompok yang cocok, misalnya di keranjang atau di nampan. Benda yang ciri aturannya sama berkumpul di tempat yang sama. Setiap benda hanya masuk satu kelompok dalam satu aturan.",
    icon: "🧺",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Beri Nama Kelompok",
    stepDesc:
      "Beri nama kelompok sesuai aturannya. Contohnya kelompok bentuk lengkung, kelompok warna cokelat, atau kelompok ukuran besar. Setelah itu hitung ada berapa benda di setiap kelompok, lalu jumlahkan semuanya.",
    icon: "🏷️",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Ganti Aturan, Coba Lagi",
    stepDesc:
      "Benda yang sama bisa dikelompokkan dengan aturan lain. Kue talam masuk kelompok lengkung menurut bentuk, dan masuk kelompok hijau menurut warna. Tidak ada kelompok yang salah, asalkan semua anggotanya cocok dengan aturannya.",
    icon: "🔄",
  },
];

export function CeritaKelompokB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B4} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
