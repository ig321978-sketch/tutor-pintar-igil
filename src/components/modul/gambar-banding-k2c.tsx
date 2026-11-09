"use client";

import React from "react";
import { BAWAH, BIRU, BukuCerita, EMAS, HIJAU, KUNING, Latar, MERAH_MUDA, type Cerita } from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { BatangG, KubusG, Label, TabelMini } from "./gambar-nilai-k2b";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab C: Membandingkan Dua Bilangan atau Lebih            */
/* (Buku Siswa Kelas II hlm. 23-30). Tokoh buku: Kira, Malosi, Halim, Tika,   */
/* Lili. Stoples permen Kira, tebakan, tabel nilai tempat, dan kartu bilangan.*/
/* Semua gambar dibuat di klien (SVG), tanpa panggilan API.                   */
/* Naskah: naskah/mtk-2-bab1-sub-c-membandingkan-bilangan.md                  */
/* ------------------------------------------------------------------------ */

const WARNA_PERMEN = ["#F472B6", "#38BDF8", "#FBBF24", "#A78BFA", "#34D399"];

/** Permen bungkus. Pusat di (x, y). */
export function Permen({ x, y, i = 0, s = 1 }: { x: number; y: number; i?: number; s?: number }) {
  const w = WARNA_PERMEN[i % WARNA_PERMEN.length];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-13 -6 L-6 0 L-13 6 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 -6 L6 0 L13 6 Z" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <ellipse cx="0" cy="0" rx="8.5" ry="6.4" fill={w} stroke={BIRU} strokeWidth="2" />
      <path d="M-3.5 -5 Q0 0 -3.5 5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" opacity="0.85" strokeLinecap="round" />
    </g>
  );
}

/** Jarak antar pusat permen: lebar permen (26 satuan) dikali skala, ditambah celah. */
export const jarakPermen = (s: number) => 26 * s + 4;

/** Sekelompok n permen dalam baris `kolom`. (x, y) adalah pusat permen pertama. */
export function KelompokPermen({ x, y, n, s = 0.72, mulai = 0, kolom = 5 }: { x: number; y: number; n: number; s?: number; mulai?: number; kolom?: number }) {
  const jarak = jarakPermen(s);
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Permen key={i} x={x + (i % kolom) * jarak} y={y + Math.floor(i / kolom) * (17 * s + 5)} i={mulai + i} s={s} />
      ))}
    </>
  );
}

/** Lingkaran putus-putus yang mengelilingi satu kelompok sepuluh (dua baris lima). */
export function CincinSepuluh({ x, y, s = 0.72 }: { x: number; y: number; s?: number }) {
  const jarak = jarakPermen(s);
  return <rect x={x - 17} y={y - 14} width={4 * jarak + 34} height={17 * s + 5 + 28} rx="16" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="5 4" />;
}

/** Stoples permen. Badan kaca, tutup emas, isi permen acak tetap. */
export function Stoples({ x, y, isi = 16, s = 1 }: { x: number; y: number; isi?: number; s?: number }) {
  const letak: [number, number][] = [
    [-18, -2], [0, -6], [18, 0], [-24, 16], [-6, 12], [14, 14], [28, 20], [-16, 30], [4, 28], [22, 34], [-30, 32], [-2, 44], [16, 46], [-20, 48], [30, 44], [8, 8],
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-26" y="-34" width="52" height="11" rx="5" fill={EMAS} stroke={BIRU} strokeWidth="2.6" />
      <path d="M-30 -22 C-46 -2 -46 46 -30 60 Q0 70 30 60 C46 46 46 -2 30 -22 Z" fill="#FFFFFF" fillOpacity="0.55" stroke={BIRU} strokeWidth="2.8" strokeLinejoin="round" />
      {letak.slice(0, isi).map(([px, py], i) => (
        <Permen key={i} x={px} y={py} i={i} s={0.62} />
      ))}
    </g>
  );
}

/** Jalur kotak bilangan seperti di buku: 11 kotak dari `dari` sampai `dari + 10`. */
export function JalurKotak({ x, y, dari, sorot }: { x: number; y: number; dari: number; sorot: number }) {
  return (
    <g>
      {Array.from({ length: 11 }, (_, i) => {
        const n = dari + i;
        const warna = i === 0 ? "#F9A8D4" : i === 10 ? "#7DD3FC" : n === sorot ? "#FDE68A" : "#EDE9FE";
        return (
          <g key={n}>
            <rect x={x + i * 24} y={y} width="24" height="26" fill={warna} stroke={BIRU} strokeWidth="2" />
            <text x={x + i * 24 + 12} y={y + 18} textAnchor="middle" fontSize={i === 0 || i === 10 || n === sorot ? 13 : 11} fontWeight="900" fill={BIRU}>
              {n}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Kartu bilangan kecil. */
export function KartuAngka({ x, y, n, warna = "#F9A8D4" }: { x: number; y: number; n: number; warna?: string }) {
  return (
    <g>
      <rect x={x} y={y} width="56" height="46" rx="9" fill={warna} stroke={BIRU} strokeWidth="2.8" />
      <rect x={x + 4} y={y + 4} width="48" height="38" rx="6" fill="#FFFFFF" fillOpacity="0.35" />
      <text x={x + 28} y={y + 33} textAnchor="middle" fontSize="26" fontWeight="900" fill={BIRU}>
        {n}
      </text>
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 23: Kira membawa stoples permen, Malosi menebak 20, Halim menebak 30. */
function AdeganUlangTahun() {
  return (
    <>
      <Latar />
      <Stoples x={104} y={112} isi={16} s={1.05} />
      <Tokoh x={36} y={198} rambut="#1F2937" baju={MERAH_MUDA} s={0.95} angkat />
      <Tokoh x={198} y={202} rambut="#1F2937" baju={HIJAU} s={0.74} angkat />
      <Tokoh x={262} y={202} rambut="#7A4A1E" baju={KUNING} s={0.74} angkat />
      <Lencana x={196} y={96} teks="20?" r={20} />
      <Lencana x={262} y={100} teks="30?" r={20} />
      <Label x={50} y={6} w={180} teks="Berapa permen Kira?" />
    </>
  );
}

/** Buku hlm. 24: permen dikelompokkan sepuluh-sepuluh, lalu sisanya satu per satu: 26 permen. */
function AdeganHitungPermen() {
  return (
    <>
      <Latar />
      <CincinSepuluh x={32} y={68} />
      <KelompokPermen x={32} y={68} n={10} mulai={0} />
      <CincinSepuluh x={166} y={68} />
      <KelompokPermen x={166} y={68} n={10} mulai={2} />
      <Label x={46} y={102} w={44} teks="10" ukuran={14} />
      <Label x={180} y={102} w={44} teks="20" ukuran={14} />
      <KelompokPermen x={74} y={150} n={6} mulai={4} kolom={6} />
      {Array.from({ length: 6 }, (_, i) => (
        <text key={i} x={74 + i * jarakPermen(0.72)} y={174} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
          {21 + i}
        </text>
      ))}
      <Lencana x={258} y={146} teks="26" r={22} />
      <Tokoh x={30} y={206} rambut="#1F2937" baju={MERAH_MUDA} s={0.55} angkat />
    </>
  );
}

/** Buku hlm. 24: tebakan Malosi 20, tebakan Halim 30, permen Kira 26. Jarak langkah dihitung. */
function AdeganTebakanDekat() {
  return (
    <>
      <Latar />
      <JalurKotak x={18} y={118} dari={20} sorot={26} />
      <path d="M30 116 Q102 60 174 116" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M270 116 Q222 70 174 116" fill="none" stroke="#E53E3E" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <Label x={52} y={60} w={100} teks="6 langkah" ukuran={12} />
      <Label x={176} y={72} w={100} teks="4 langkah" ukuran={12} />
      <Label x={4} y={150} w={104} teks="Tebakan Malosi" ukuran={10.5} />
      <Label x={196} y={150} w={100} teks="Tebakan Halim" ukuran={10.5} />
      <Label x={114} y={150} w={78} teks="Permen 26" ukuran={10.5} />
      <Tokoh x={30} y={206} rambut="#1F2937" baju={HIJAU} s={0.5} angkat />
      <Tokoh x={270} y={206} rambut="#7A4A1E" baju={KUNING} s={0.5} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <text x="136" y="196" fontSize="26" aria-hidden="true">
          🎯
        </text>
      </g>
      <Label x={72} y={6} w={156} teks="Siapa lebih dekat?" ukuran={13} />
    </>
  );
}

/** Buku hlm. 25: Kira 26 permen dan Tika 32 permen, dibandingkan di tabel nilai tempat. */
function AdeganKiraTika() {
  return (
    <>
      <Latar />
      <g transform="translate(2 28) scale(0.94)">
        <TabelMini x={0} y={0} p={2} s={6} />
      </g>
      <g transform="translate(154 28) scale(0.94)">
        <TabelMini x={0} y={0} p={3} s={2} />
      </g>
      <BatangG x={26} y={96} h={62} />
      <BatangG x={46} y={96} h={62} />
      {Array.from({ length: 6 }, (_, i) => (
        <KubusG key={i} x={80 + (i % 3) * 17} y={104 + Math.floor(i / 3) * 17} s={14} warna={i} />
      ))}
      <BatangG x={178} y={96} h={62} />
      <BatangG x={198} y={96} h={62} />
      <BatangG x={218} y={96} h={62} />
      {Array.from({ length: 2 }, (_, i) => (
        <KubusG key={i} x={252 + i * 17} y={104} s={14} warna={i + 2} />
      ))}
      <Label x={8} y={166} w={116} teks="Kira: 26 permen" ukuran={11} />
      <Label x={176} y={166} w={116} teks="Tika: 32 permen" ukuran={11} />
      <Lencana x={150} y={104} teks="?" r={17} />
      <Tokoh x={150} y={206} rambut="#1F2937" baju={MERAH_MUDA} s={0.5} angkat />
    </>
  );
}

/** Buku hlm. 25: kolom puluhan dibandingkan. 2 puluhan lebih sedikit dari 3 puluhan. */
function AdeganPuluhanDulu() {
  return (
    <>
      <Latar />
      <Label x={24} y={6} w={102} teks="26" ukuran={16} />
      <Label x={174} y={6} w={102} teks="32" ukuran={16} />
      <BatangG x={44} y={64} h={60} />
      <BatangG x={68} y={64} h={60} />
      <BatangG x={186} y={64} h={60} />
      <BatangG x={210} y={64} h={60} />
      <BatangG x={234} y={64} h={60} />
      <path d="M50 60 Q121 28 192 60" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeDasharray="4 4" strokeLinecap="round" />
      <path d="M74 60 Q145 16 216 60" fill="none" stroke="#16A34A" strokeWidth="2.6" strokeDasharray="4 4" strokeLinecap="round" />
      <ellipse cx="240.5" cy="94" rx="15" ry="38" fill="none" stroke="#E53E3E" strokeWidth="3" strokeDasharray="5 4" />
      <Label x={20} y={130} w={110} teks="2 puluhan" ukuran={12} />
      <Label x={170} y={130} w={110} teks="3 puluhan" ukuran={12} />
      <Label x={32} y={164} w={236} teks="32 lebih besar dari 26" ukuran={14} />
      <g className="igil-lompat" style={BAWAH}>
        <text x="122" y="112" fontSize="26" aria-hidden="true">
          ⭐
        </text>
      </g>
      <Tokoh x={282} y={206} rambut="#7A4A1E" baju={KUNING} s={0.5} angkat />
    </>
  );
}

/** Buku hlm. 29: empat kartu 25, 12, 35, 21 diurutkan dari yang paling kecil. */
function AdeganUrutkanKartu() {
  const acak = [25, 12, 35, 21];
  const urut = [12, 21, 25, 35];
  return (
    <>
      <Latar />
      {acak.map((n, i) => (
        <KartuAngka key={n} x={16 + i * 70} y={14} n={n} warna="#F9A8D4" />
      ))}
      <text x="150" y="82" textAnchor="middle" fontSize="24" aria-hidden="true">
        ⬇️
      </text>
      {urut.map((n, i) => (
        <KartuAngka key={n} x={16 + i * 70} y={92} n={n} warna={i === 0 ? "#BBF7D0" : "#FDE68A"} />
      ))}
      {[0, 1, 2].map((i) => (
        <text key={i} x={16 + i * 70 + 63} y={124} textAnchor="middle" fontSize="20" fontWeight="900" fill="#E53E3E">
          &lt;
        </text>
      ))}
      <Label x={14} y={148} w={272} teks="dari yang paling kecil" ukuran={13} />
      <Tokoh x={36} y={206} rambut="#1F2937" baju={HIJAU} s={0.5} angkat />
      <Tokoh x={262} y={206} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.5} angkat />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita membandingkan bilangan">
      {id === "K2C-S1" && <AdeganUlangTahun />}
      {id === "K2C-S2" && <AdeganHitungPermen />}
      {id === "K2C-S3" && <AdeganTebakanDekat />}
      {id === "K2C-S4" && <AdeganKiraTika />}
      {id === "K2C-S5" && <AdeganPuluhanDulu />}
      {id === "K2C-S6" && <AdeganUrutkanKartu />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 23-26 dan 29). Naskah dibacakan Suara Guru, tidak ditulis di layar. */
export const CERITA_K2C: Cerita[] = [
  {
    id: "K2C-S1",
    sceneType: "ulang-tahun-kira",
    voiceNarration:
      "Hari ini Kira berulang tahun. Kira membawa satu stoples berisi permen. Ia ingin membagikan permen kepada teman-temannya. Dapatkah kalian menebak banyak permen yang dibawa Kira? Malosi menebak, menurutku ada dua puluh permen. Halim menebak, menurutku ada tiga puluh permen. Menebak boleh saja, tetapi kita harus membuktikannya dengan menghitung.",
  },
  {
    id: "K2C-S2",
    sceneType: "hitung-permen",
    voiceNarration:
      "Ayo, kita hitung banyak permen di dalam stoples. Kita kelompokkan setiap sepuluh permen, seperti lingkaran putus-putus di buku. Sepuluh, dua puluh. Lalu sisanya kita hitung satu per satu: dua puluh satu, dua puluh dua, dua puluh tiga, dua puluh empat, dua puluh lima, dua puluh enam. Ternyata ada dua puluh enam permen.",
  },
  {
    id: "K2C-S3",
    sceneType: "tebakan-dekat",
    voiceNarration:
      "Sekarang kita bandingkan tebakan dengan hitungan. Tebakan Malosi dua puluh, tebakan Halim tiga puluh, dan banyak permen Kira dua puluh enam. Dari dua puluh maju ke dua puluh enam ada enam langkah. Dari tiga puluh mundur ke dua puluh enam ada empat langkah. Empat lebih sedikit daripada enam, jadi tebakan Halim lebih dekat. Kita dapat menebak banyak benda. Itu akan melatih kita dalam berhitung.",
  },
  {
    id: "K2C-S4",
    sceneType: "permen-kira-tika",
    voiceNarration:
      "Kira membawa dua puluh enam permen. Tika membawa tiga puluh dua permen. Permen siapa yang lebih banyak? Mengapa? Kita bisa menggunakan tabel nilai tempat untuk membandingkan bilangan. Dua puluh enam adalah dua puluhan dan enam satuan. Tiga puluh dua adalah tiga puluhan dan dua satuan.",
  },
  {
    id: "K2C-S5",
    sceneType: "puluhan-dulu",
    voiceNarration:
      "Amatilah kolom puluhan pada tabel nilai tempat. Mana yang lebih banyak? Bilangan dua puluh enam mempunyai dua puluhan. Bilangan tiga puluh dua mempunyai tiga puluhan. Bilangan tiga puluh dua mempunyai lebih banyak puluhan daripada bilangan dua puluh enam. Bilangan yang menunjukkan benda lebih banyak disebut bilangan lebih besar. Jadi, tiga puluh dua lebih besar dari dua puluh enam. Sebaliknya, dua puluh enam lebih kecil dari tiga puluh dua.",
  },
  {
    id: "K2C-S6",
    sceneType: "urutkan-kartu",
    voiceNarration:
      "Malosi memegang empat kartu bilangan: dua puluh lima, dua belas, tiga puluh lima, dan dua puluh satu. Mana yang paling kecil? Dua belas, karena hanya satu puluhan. Mana yang paling besar? Tiga puluh lima, karena tiga puluhan. Dua puluh satu dan dua puluh lima sama-sama dua puluhan, jadi kita lihat satuannya. Satu lebih kecil dari lima. Urutan dari yang paling kecil adalah dua belas, dua puluh satu, dua puluh lima, lalu tiga puluh lima.",
  },
];

/** Peta pikiran enam simpul: dari menebak sampai mengurutkan bilangan. */
export const PETA_PIKIRAN_K2C: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Tebak dan Hitung",
    stepDesc:
      "Sebelum menghitung, kita boleh menebak banyak benda. Setelah menghitung, bandingkan tebakan dengan hasil hitungan: tebakan bisa lebih kecil, lebih besar, atau tepat sama. Menebak melatih perasaan bilangan, dan hitungan memastikan jawaban yang tepat.",
    icon: "🤔",
    flowFrom: "Tebak dan hitung",
    flowTo: "Siapa lebih dekat",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Siapa Lebih Dekat?",
    stepDesc:
      "Untuk tahu tebakan siapa yang lebih dekat, hitung loncatannya di jalur bilangan. Dari dua puluh ke dua puluh enam ada enam langkah, dari tiga puluh ke dua puluh enam ada empat langkah. Loncatan yang lebih sedikit berarti tebakan lebih dekat. Bila loncatannya sama banyak, kedua tebakan sama dekat.",
    icon: "🎯",
    flowFrom: "Siapa lebih dekat",
    flowTo: "Banding puluhan dulu",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Banding Puluhan Dulu",
    stepDesc:
      "Untuk membandingkan dua bilangan, tulis keduanya di tabel nilai tempat dan lihat kolom puluhan lebih dulu. Dua puluh enam punya dua puluhan, tiga puluh dua punya tiga puluhan. Yang puluhannya lebih banyak adalah bilangan lebih besar. Memasangkan batang puluhan satu-satu juga menunjukkannya: batang yang tersisa milik bilangan yang lebih besar.",
    icon: "📋",
    flowFrom: "Banding puluhan dulu",
    flowTo: "Puluhan sama lihat satuan",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Puluhan Sama? Lihat Satuan",
    stepDesc:
      "Kalau puluhannya sama, lihat kolom satuan. Dua puluh empat dan dua puluh sembilan sama-sama dua puluhan, tetapi sembilan satuan lebih banyak daripada empat satuan, jadi dua puluh sembilan lebih besar. Kalau satuan sebuah bilangan sudah sepuluh atau lebih, tukar dulu sepuluh satuan menjadi satu puluhan, baru bandingkan. Jangan membandingkan satuan lebih dulu, karena satu puluhan nilainya sepuluh.",
    icon: "🔍",
    flowFrom: "Puluhan sama lihat satuan",
    flowTo: "Lebih besar kecil sama",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Lebih Besar, Lebih Kecil, Sama",
    stepDesc:
      "Bilangan yang menunjukkan benda lebih banyak disebut lebih besar, dan yang lebih sedikit disebut lebih kecil. Tiga puluh dua lebih besar dari dua puluh enam, dan dua puluh enam lebih kecil dari tiga puluh dua. Kalau nilainya persis sama, kita sebut sama dengan. Tanda lebih besar dan lebih kecil mirip mulut buaya yang selalu terbuka ke bilangan yang lebih besar.",
    icon: "🐊",
    flowFrom: "Lebih besar kecil sama",
    flowTo: "Urutkan bilangan",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Urutkan Bilangan",
    stepDesc:
      "Mengurutkan berarti menyusun bilangan dari yang paling kecil ke yang paling besar, atau sebaliknya. Bandingkan dua-dua: cari yang paling kecil dulu, lalu yang berikutnya. Dua belas, dua puluh satu, dua puluh lima, dan tiga puluh lima urut dari yang paling kecil. Untuk mengurutkan dari yang paling besar, balik urutannya.",
    icon: "📶",
    flowFrom: "Urutkan bilangan",
    flowTo: "Membandingkan bilangan siap dipakai",
  },
];

export function CeritaBandingK2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_K2C} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
