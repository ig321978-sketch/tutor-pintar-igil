"use client";

import React from "react";
import { BAWAH, BIRU, BukuCerita, EMAS, HIJAU, KUNING, Latar, MERAH_MUDA, TENGAH, type Cerita } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Label, Meja, Ruang } from "./gambar-bentuk-a4";
import { GambarBagian, KERETA, Keping, WARNA_C } from "./bangun-c4-dasar";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab C: Menyusun dan Mengurai Bentuk Bangun (Buku Siswa Kelas 1   */
/* hlm. 134-139). Maskot: Igil si burung hantu. Tokoh buku: Kira, Upe, Wei,   */
/* Halim, Malosi, Tika. Semua gambar dibuat di klien (SVG), tanpa API.        */
/* Naskah: naskah/mtk-1-bab4-sub-c-menyusun-dan-mengurai-bentuk.md             */
/* ------------------------------------------------------------------------ */

const LIDI = ["#2F9E5B", "#8B3FB5", "#E53E3E", "#2563EB", "#F0AB00", "#EA580C"];

function Garis({ a, b, w = 5, c }: { a: [number, number]; b: [number, number]; w?: number; c: string }) {
  return (
    <>
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BIRU} strokeWidth={w + 3} strokeLinecap="round" />
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeLinecap="round" />
    </>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 134: dua segitiga sama besar di meja. Mau digabung jadi apa? */
function AdeganDuaSegitiga() {
  return (
    <>
      <Ruang />
      <Meja x={14} y={128} lebar={272} />
      <Keping titik={[[70, 126], [70, 78], [118, 126]]} isi={WARNA_C.merah} tebal={3} />
      <Keping titik={[[230, 126], [230, 78], [182, 126]]} isi={WARNA_C.biru} tebal={3} />
      <Tokoh x={22} y={196} rambut="#1F2937" baju={KUNING} s={0.88} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={280} y={196} rambut="#7A4A1E" baju={HIJAU} s={0.88} angkat />
      </g>
      <g className="igil-denyut" style={TENGAH}>
        <Lencana x={150} y={70} teks="?" r={19} />
      </g>
      <Label x={50} y={10} w={200} teks="Digabung jadi apa?" ukuran={15} />
    </>
  );
}

/** Buku hlm. 134-135: dua cara menggabungkan dua segitiga yang sama. */
function AdeganDuaCara() {
  return (
    <>
      <Ruang />
      <Meja x={8} y={128} lebar={284} />
      {/* Segitiga besar dari dua keping */}
      <Keping titik={[[62, 126], [62, 70], [26, 126]]} isi={WARNA_C.merah} tebal={3} />
      <Keping titik={[[62, 126], [62, 70], [98, 126]]} isi={WARNA_C.biru} tebal={3} />
      {/* Segi empat dari dua keping */}
      <Keping titik={[[190, 126], [190, 70], [226, 126]]} isi={WARNA_C.biru} tebal={3} />
      <Keping titik={[[190, 70], [226, 70], [226, 126]]} isi={WARNA_C.merah} tebal={3} />
      <path d="M118 98 H160" stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" strokeDasharray="1 7" />
      <Label x={14} y={10} w={96} teks="Segitiga" ukuran={15} />
      <Label x={166} y={10} w={118} teks="Segi empat" ukuran={15} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={146} y={200} rambut="#1F2937" baju={EMAS} s={0.68} angkat />
      </g>
    </>
  );
}

/** Buku hlm. 135: dua bangun datar digabung menjadi bangun baru. */
function AdeganBangunBaru() {
  const tiga = "M48 140 L76 140 A28 28 0 1 1 48 112 Z";
  const seperempat = "M96 140 L124 140 A28 28 0 0 0 96 112 Z";
  return (
    <>
      <Ruang />
      {/* Baris 1: potongan segi empat + segitiga kecil = segi empat utuh */}
      <polygon points="16,44 96,44 96,84 42,84 16,64" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="16,64 42,84 16,84" fill={WARNA_C.merah} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M106 64 H128 M120 56 L128 64 L120 72" fill="none" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="140" y="44" width="80" height="40" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="3" />
      <polygon points="140,64 166,84 140,84" fill={WARNA_C.merah} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      {/* Baris 2: tiga perempat bulat + seperempat = bulat penuh */}
      <path d={tiga} fill={WARNA_C.merah} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d={seperempat} fill={WARNA_C.biru} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M134 140 H156 M150 132 L158 140 L150 148" fill="none" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M212 140 L240 140 A28 28 0 1 1 212 112 Z" fill={WARNA_C.merah} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <path d="M212 140 L240 140 A28 28 0 0 0 212 112 Z" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={278} y={204} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.55} angkat />
      </g>
      <Label x={40} y={8} w={220} teks="Bangun baru!" ukuran={15} />
    </>
  );
}

/** Buku hlm. 136: kereta mainan disusun dari bentuk. */
function AdeganKereta() {
  return (
    <>
      <Latar />
      <g transform="translate(14 38) scale(0.9)">
        <path d="M8 138 H292" stroke="#A8672D" strokeWidth="4" strokeLinecap="round" />
        {KERETA.map((b) => (
          <GambarBagian key={b.id} b={b} tebal={2.8} />
        ))}
      </g>
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={22} y={206} rambut={BIRU} baju={EMAS} s={0.55} angkat />
      </g>
      <Tokoh x={282} y={206} rambut="#7A4A1E" baju={HIJAU} s={0.55} />
      <Label x={50} y={6} w={200} teks="Kereta dari bentuk" ukuran={15} />
    </>
  );
}

/** Mengurai rumah mainan menjadi bagian-bagiannya. */
function AdeganMengurai() {
  return (
    <>
      <Ruang />
      {/* Rumah utuh */}
      <rect x="22" y="106" width="76" height="44" fill="#FFD93D" stroke={BIRU} strokeWidth="3" />
      <polygon points="16,106 104,106 60,70" fill={WARNA_C.merah} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <rect x="54" y="124" width="14" height="26" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="2.4" />
      <rect x="30" y="116" width="14" height="14" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="2.4" />
      <path d="M108 112 H134 M128 104 L136 112 L128 120" fill="none" stroke={BIRU} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bagian terurai */}
      <polygon points="156,70 222,70 189,36" fill={WARNA_C.merah} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <rect x="150" y="90" width="76" height="40" fill="#FFD93D" stroke={BIRU} strokeWidth="3" />
      <rect x="244" y="92" width="16" height="38" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="2.6" />
      <rect x="248" y="40" width="22" height="22" fill={WARNA_C.biru} stroke={BIRU} strokeWidth="2.6" />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={128} y={202} rambut="#1F2937" baju={MERAH_MUDA} s={0.62} angkat />
      </g>
      <Tokoh x={276} y={204} rambut="#7A4A1E" baju={KUNING} s={0.6} />
      <Label x={46} y={6} w={208} teks="Diurai jadi bagian" ukuran={15} />
    </>
  );
}

/** Buku hlm. 139: bermain lidi. Segitiga tiga lidi, rumah enam lidi. */
function AdeganLidi() {
  return (
    <>
      <Ruang />
      <rect x="10" y="98" width="280" height="102" rx="14" fill="#FDE68A" stroke={BIRU} strokeWidth="3.2" />
      {/* Segitiga dari tiga lidi */}
      <Garis a={[44, 184]} b={[96, 184]} c={LIDI[0]} />
      <Garis a={[44, 184]} b={[70, 139]} c={LIDI[1]} />
      <Garis a={[96, 184]} b={[70, 139]} c={LIDI[2]} />
      {/* Rumah dari enam lidi */}
      <Garis a={[190, 184]} b={[236, 184]} c={LIDI[3]} />
      <Garis a={[190, 138]} b={[236, 138]} c={LIDI[4]} />
      <Garis a={[190, 138]} b={[190, 184]} c={LIDI[5]} />
      <Garis a={[236, 138]} b={[236, 184]} c={LIDI[0]} />
      <Garis a={[190, 138]} b={[213, 100]} c={LIDI[1]} />
      <Garis a={[236, 138]} b={[213, 100]} c={LIDI[2]} />
      {/* Beberapa lidi lepas */}
      <Garis a={[122, 120]} b={[168, 130]} c={LIDI[4]} w={4.4} />
      <Garis a={[122, 150]} b={[166, 164]} c={LIDI[3]} w={4.4} />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={48} y={100} rambut="#1F2937" baju={EMAS} s={0.6} angkat />
      </g>
      <Tokoh x={150} y={100} rambut="#7A4A1E" baju={HIJAU} s={0.6} />
      <svg x="236" y="58" width="56" height="40" viewBox="0 0 120 80">
        <IgilWajahIsi />
      </svg>
      <Label x={60} y={8} w={180} teks="Ayo bermain lidi!" ukuran={15} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita menyusun dan mengurai bentuk">
      {id === "C4-S1" && <AdeganDuaSegitiga />}
      {id === "C4-S2" && <AdeganDuaCara />}
      {id === "C4-S3" && <AdeganBangunBaru />}
      {id === "C4-S4" && <AdeganKereta />}
      {id === "C4-S5" && <AdeganMengurai />}
      {id === "C4-S6" && <AdeganLidi />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 134-139) dan diperkaya. Tokoh hanya Kira, Upe, Wei, Halim, Malosi, Tika, dan Igil. */
export const CERITA_C4: Cerita[] = [
  {
    id: "C4-S1",
    sceneType: "dua-segitiga-di-meja",
    voiceNarration:
      "Upe dan Wei punya dua kertas berbentuk segitiga yang sama besar. Satu berwarna merah dan satu berwarna biru. Upe berkata, kalau digabung, kertas ini akan menjadi segitiga. Wei berkata, kalau digabung, kertas ini akan menjadi segi empat. Siapa yang benar? Igil mengajak kita mencoba. Gabungkan dua segitiga yang sama. Bentuk apa yang kamu temukan?",
  },
  {
    id: "C4-S2",
    sceneType: "dua-cara-menggabungkan",
    voiceNarration:
      "Ternyata Upe dan Wei sama-sama benar! Kalau dua segitiga yang sama besar dirapatkan pada sisi yang tegak, hasilnya segitiga yang lebih besar. Kalau dirapatkan pada sisi yang miring, hasilnya segi empat. Dua segitiga yang sama bisa menjadi bangun yang berbeda, tergantung cara kita menggabungkannya. Menggabungkan beberapa bentuk menjadi bangun baru disebut menyusun.",
  },
  {
    id: "C4-S3",
    sceneType: "bangun-datar-digabung",
    voiceNarration:
      "Bukan hanya segitiga yang bisa digabung. Potongan biru yang sudut bawahnya terpotong dapat digabung dengan segitiga merah kecil, dan menjadi segi empat yang utuh. Bentuk bulat yang tinggal tiga perempat dapat digabung dengan potongan seperempat, dan menjadi bulat penuh. Dua bangun datar dapat digabungkan. Hasilnya adalah bangun baru.",
  },
  {
    id: "C4-S4",
    sceneType: "kereta-dari-bentuk",
    voiceNarration:
      "Halim punya kereta mainan dari balok kayu. Ayo amati bentuk bangun pada kereta itu. Cerobongnya segi empat. Mesinnya segi empat. Kabin merah dan jendelanya juga segi empat, dan gerbong biru yang panjang segi empat juga. Jadi segi empat ada lima. Moncong keretanya segitiga, ada satu. Rodanya bentuk lengkung, ada tiga. Kereta ini disusun dari lima segi empat, satu segitiga, dan tiga bentuk lengkung.",
  },
  {
    id: "C4-S5",
    sceneType: "mengurai-rumah",
    voiceNarration:
      "Setelah menyusun, kita juga bisa mengurai. Mengurai artinya memisahkan sebuah bangun menjadi bagian-bagiannya. Malosi menguraikan rumah mainan. Atapnya segitiga. Dindingnya segi empat. Pintunya segi empat, dan jendelanya juga segi empat. Kalau bagian-bagian itu disusun lagi, rumahnya kembali utuh. Menyusun dan mengurai seperti dua arah yang saling berlawanan.",
  },
  {
    id: "C4-S6",
    sceneType: "bermain-lidi",
    voiceNarration:
      "Ayo bermain! Tika, Kira, dan Halim menyiapkan lidi yang sama panjang. Mereka menyusunnya menjadi bentuk yang mereka suka. Tiga lidi bisa menjadi segitiga. Empat lidi bisa menjadi segi empat. Lalu Halim membuat rumah. Segi empat untuk dindingnya, dan dua lidi lagi untuk atapnya. Jadi rumah itu memakai enam lidi. Kamu juga boleh membuat bentuk yang kamu suka.",
  },
];

/** Peta pikiran enam simpul: dari mengamati bagian sampai memeriksa banyaknya. */
export const PETA_PIKIRAN_C4: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Amati Bagiannya",
    stepDesc:
      "Lihat bangun atau gambar itu dengan teliti. Tanyakan pada dirimu: bangun ini tersusun dari bagian apa saja? Tunjuk bagian-bagiannya satu per satu supaya tidak ada yang terlewat.",
    icon: "👀",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Kenali Tiap Bentuk",
    stepDesc:
      "Sebutkan nama setiap bagian. Apakah bagian ini segi empat, segitiga, atau bentuk lengkung? Ingat ciri-cirinya: segi empat punya empat sisi lurus, segitiga punya tiga sisi lurus, dan bentuk lengkung tidak punya sisi lurus.",
    icon: "🔎",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Gabungkan Jadi Bangun Baru",
    stepDesc:
      "Rapatkan dua bagian atau lebih pada sisi yang pas. Dua bangun datar yang digabung menghasilkan bangun baru. Itulah yang disebut menyusun. Dua segitiga yang sama besar bisa menjadi segitiga yang lebih besar, atau menjadi segi empat.",
    icon: "🧩",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Beri Nama Bangun Baru",
    stepDesc:
      "Perhatikan bangun yang terbentuk. Hitung sisinya dan lihat pojoknya. Tiga sisi lurus berarti segitiga, empat sisi lurus berarti segi empat. Cara menggabungkan yang berbeda bisa menghasilkan bangun yang berbeda.",
    icon: "🏷️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Uraikan Kembali",
    stepDesc:
      "Coba pisahkan bangun itu kembali menjadi bagian-bagiannya. Itulah yang disebut mengurai. Bagian yang kamu dapat sama dengan bagian yang tadi kamu gabungkan. Menyusun dan mengurai adalah dua arah yang berlawanan.",
    icon: "🔧",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Hitung dan Periksa",
    stepDesc:
      "Hitung banyak bagian setiap jenis, lalu jumlahkan semuanya. Kereta mainan punya lima segi empat, satu segitiga, dan tiga bentuk lengkung, jadi semuanya sembilan bagian. Kalau ada yang dilepas, banyak bagian yang tersisa berkurang.",
    icon: "🔢",
  },
];

export function CeritaSusunC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_C4} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
