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
  type Cerita,
} from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 20       */
/* (Buku Siswa Kelas 1 hlm. 147-158). Maskot: Igil si burung hantu. Tokoh      */
/* buku: Halim, Malosi, Kira, Wei, Tika. Semua gambar dibuat di klien (SVG),   */
/* tanpa panggilan API.                                                       */
/* Naskah: naskah/mtk-1-bab5-sub-a-menghitung-membaca-menulis-bilangan.md      */
/* ------------------------------------------------------------------------ */

const COKELAT = "#A8672D";

/** Label putih berbingkai. */
function Label({ x, y, w, teks, ukuran = 15 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Satu kelereng kecil di dalam adegan. */
function Gol({ x, y, r = 10, warna }: { x: number; y: number; r?: number; warna: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <ellipse cx={x - r * 0.35} cy={y - r * 0.4} rx={r * 0.3} ry={r * 0.2} fill="#FFFFFF" opacity="0.85" />
    </g>
  );
}

/** Kotak kayu dua baris lima. `isi` kelereng diletakkan dari kiri atas. */
function KotakSepuluh({ x, y, isi, warna, r = 10, jarak = 24 }: { x: number; y: number; isi: number; warna: string; r?: number; jarak?: number }) {
  const lebar = jarak * 5 + 8;
  const tinggi = jarak * 2 + 8;
  return (
    <g>
      <rect x={x} y={y} width={lebar} height={tinggi} rx="8" fill="#FDE9C4" stroke={COKELAT} strokeWidth="4" />
      <path d={`M${x + 4} ${y + tinggi / 2} H${x + lebar - 4}`} stroke={COKELAT} strokeWidth="1.6" strokeDasharray="3 4" opacity="0.6" />
      {Array.from({ length: isi }, (_, i) => (
        <Gol key={i} x={x + 4 + jarak / 2 + (i % 5) * jarak} y={y + 4 + jarak / 2 + Math.floor(i / 5) * jarak} r={r} warna={warna} />
      ))}
    </g>
  );
}

/** Stoples kaca berisi sejumlah kelereng. */
function Stoples({ x, y, w, h, isi, r = 9 }: { x: number; y: number; w: number; h: number; isi: number; r?: number }) {
  const warna = [MERAH_B5, BIRU_B5, "#16A34A", EMAS, "#9333EA"];
  const kolom = Math.max(1, Math.floor((w - 10) / (r * 2 + 2)));
  return (
    <g>
      <rect x={x + 4} y={y} width={w - 8} height="10" rx="3" fill={EMAS} stroke={BIRU} strokeWidth="2.6" />
      <rect x={x} y={y + 8} width={w} height={h - 8} rx="14" fill="#E0F2FE" fillOpacity="0.85" stroke={BIRU} strokeWidth="3.2" />
      {Array.from({ length: isi }, (_, i) => (
        <Gol
          key={i}
          x={x + 7 + r + (i % kolom) * (r * 2 + 2)}
          y={y + h - 8 - r - Math.floor(i / kolom) * (r * 2 + 1)}
          r={r}
          warna={warna[i % warna.length]}
        />
      ))}
      <path d={`M${x + 8} ${y + 20} V${y + h - 22}`} stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 147: Halim dan Malosi merapikan kelereng ke dalam stoples. */
function AdeganMerapikan() {
  const lepas: [number, number, string][] = [
    [86, 168, MERAH_B5],
    [104, 176, BIRU_B5],
    [196, 172, "#16A34A"],
    [216, 164, EMAS],
    [150, 182, "#9333EA"],
  ];
  return (
    <>
      <Latar />
      <Stoples x={122} y={84} w={56} h={70} isi={10} r={6} />
      {lepas.map(([x, y, w], i) => (
        <Gol key={i} x={x} y={y} r={8} warna={w} />
      ))}
      <Tokoh x={36} y={178} rambut="#1F2937" baju={HIJAU} s={0.9} angkat />
      <Tokoh x={264} y={178} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.88} angkat />
      <Lencana x={150} y={48} teks="?" r={19} />
      <Label x={72} y={8} w={156} teks="9, 10, 11, ..." />
    </>
  );
}

/** Sepuluh kelereng penuh di kotak, satu di luar. */
function AdeganSepuluhDulu() {
  return (
    <>
      <Latar />
      <KotakSepuluh x={56} y={70} isi={10} warna={MERAH_B5} />
      <Gol x={238} y={116} r={11} warna={BIRU_B5} />
      <text x="238" y="146" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        satu lagi
      </text>
      <Tokoh x={28} y={190} rambut="#1F2937" baju={HIJAU} s={0.85} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <svg x="238" y="148" width="58" height="42" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
      <Lencana x={150} y={46} teks="10" r={20} />
      <Label x={80} y={8} w={140} teks="10 + 1 = 11" />
    </>
  );
}

/** Sepuluh di kotak, lima biru berderet dengan nomor 11 sampai 15. */
function AdeganLimaBelas() {
  return (
    <>
      <Latar />
      <KotakSepuluh x={12} y={64} isi={10} warna={MERAH_B5} r={9} jarak={22} />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <Gol x={150 + i * 28} y={104} r={10} warna={BIRU_B5} />
          <text x={150 + i * 28} y={134} textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
            {11 + i}
          </text>
        </g>
      ))}
      <Tokoh x={36} y={192} rambut="#7A4A1E" baju={EMAS} s={0.8} angkat />
      <Lencana x={236} y={60} teks="15" r={20} />
      <Label x={76} y={8} w={148} teks="10 + 5 = 15" />
    </>
  );
}

/** Dua kotak penuh. Sepuluh dan sepuluh menjadi dua puluh. */
function AdeganDuaPuluh() {
  return (
    <>
      <Latar />
      <KotakSepuluh x={12} y={58} isi={10} warna={MERAH_B5} r={9} jarak={24} />
      <KotakSepuluh x={160} y={58} isi={10} warna={BIRU_B5} r={9} jarak={24} />
      <text x="143" y="104" textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
        +
      </text>
      <Tokoh x={150} y={192} rambut="#1F2937" baju={KUNING} s={0.82} angkat />
      <Lencana x={150} y={142} teks="20" r={20} />
      <Label x={62} y={8} w={176} teks="10 + 10 = 20" />
    </>
  );
}

/** Kira dan Wei membandingkan benda yang mereka kumpulkan. */
function AdeganBandingkan() {
  const titik = (n: number, x0: number, warna: string) =>
    Array.from({ length: n }, (_, i) => <Gol key={i} x={x0 + (i % 5) * 18} y={100 + Math.floor(i / 5) * 18} r={7} warna={warna} />);
  return (
    <>
      <Latar />
      <rect x="28" y="82" width="104" height="62" rx="10" fill="#FDE9C4" stroke={COKELAT} strokeWidth="3.6" />
      <rect x="168" y="82" width="104" height="62" rx="10" fill="#FDE9C4" stroke={COKELAT} strokeWidth="3.6" />
      {titik(13, 48, MERAH_B5)}
      {titik(15, 188, BIRU_B5)}
      <Label x={28} y={46} w={104} teks="Kira" ukuran={14} />
      <Label x={168} y={46} w={104} teks="Wei" ukuran={14} />
      <Tokoh x={16} y={192} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.7} angkat />
      <Tokoh x={284} y={192} rambut="#1F2937" baju={HIJAU} s={0.7} angkat />
      <Lencana x={150} y={104} teks="?" r={19} />
      <Label x={64} y={8} w={172} teks="Siapa lebih banyak?" ukuran={14} />
    </>
  );
}

/** Tebak dulu, lalu buktikan dengan menghitung. */
function AdeganTebak() {
  return (
    <>
      <Latar />
      <Stoples x={112} y={56} w={76} h={96} isi={17} r={6} />
      <Lencana x={150} y={34} teks="?" r={18} />
      <Tokoh x={40} y={182} rambut="#7A4A1E" baju={EMAS} s={0.9} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <Tokoh x={262} y={182} rambut="#1F2937" baju={HIJAU} s={0.88} />
      </g>
      <Label x={6} y={86} w={96} teks="Tebakanku" ukuran={13} />
      <Label x={198} y={86} w={96} teks="Hitunganku" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita menghitung bilangan sampai dua puluh">
      {id === "A5-S1" && <AdeganMerapikan />}
      {id === "A5-S2" && <AdeganSepuluhDulu />}
      {id === "A5-S3" && <AdeganLimaBelas />}
      {id === "A5-S4" && <AdeganDuaPuluh />}
      {id === "A5-S5" && <AdeganBandingkan />}
      {id === "A5-S6" && <AdeganTebak />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 147-158). Tokoh hanya Halim, Malosi, Kira, Wei, Tika, dan Igil. */
export const CERITA_A5: Cerita[] = [
  {
    id: "A5-S1",
    sceneType: "merapikan-mainan",
    voiceNarration:
      "Merapikan mainan! Halim dan Malosi selesai bermain kelereng. Mereka merapikan kelerengnya. Halim menghitung banyak kelereng: sembilan, sepuluh, sebelas, dan seterusnya. Lalu kelereng disimpan ke dalam stoples. Halim selalu ingat pesan Ibu: selesai bermain, rapikan mainanmu. Sekarang, berapa banyak kelereng Halim? Ayo kita bantu Halim menghitungnya.",
  },
  {
    id: "A5-S2",
    sceneType: "sepuluh-dulu",
    voiceNarration:
      "Igil punya cara menghitung yang rapi. Isi dulu kotak dengan sepuluh kelereng sampai penuh. Kotak yang penuh berisi sepuluh, kita tidak perlu menghitungnya lagi. Ada satu kelereng di luar kotak. Sepuluh ditambah satu menjadi sebelas. Jadi kelereng ini sebelas. Sebelas artinya sepuluh dan satu lagi.",
  },
  {
    id: "A5-S3",
    sceneType: "sampai-lima-belas",
    voiceNarration:
      "Halim terus menghitung kelereng di luar kotak. Sebelas, dua belas, tiga belas, empat belas, lima belas. Kotak berisi sepuluh, di luar kotak ada lima. Sepuluh ditambah lima menjadi lima belas. Ternyata Halim mempunyai lima belas kelereng. Perhatikan nama bilangannya. Setelah sebelas dan dua belas, nama bilangan memakai kata belas: tiga belas, empat belas, lima belas. Belas berarti sepuluh dan beberapa lagi.",
  },
  {
    id: "A5-S4",
    sceneType: "dua-puluh",
    voiceNarration:
      "Bagaimana kalau kelerengnya lebih banyak? Enam belas, tujuh belas, delapan belas, sembilan belas. Kalau kelereng di luar kotak sudah sepuluh, isi satu kotak lagi sampai penuh. Dua kotak penuh berarti sepuluh ditambah sepuluh. Hasilnya dua puluh. Dua puluh adalah bilangan terbesar yang kita pelajari di bab ini.",
  },
  {
    id: "A5-S5",
    sceneType: "membandingkan-benda",
    voiceNarration:
      "Kira dan Wei mengambil benda di sekitar mereka, lebih dari sepuluh. Kira mengambil tiga belas, Wei mengambil lima belas. Mereka menghitung dan menulis hasilnya di buku. Lalu mereka membandingkan. Benda siapa yang lebih banyak? Bagaimana kamu tahu? Kita bisa membandingkan lewat sepuluh dan sisanya. Sepuluh sama, sisa Wei lima, sisa Kira tiga. Lima lebih banyak dari tiga, jadi benda Wei lebih banyak.",
  },
  {
    id: "A5-S6",
    sceneType: "tebak-dan-buktikan",
    voiceNarration:
      "Tika melihat stoples penuh kelereng. Berapa banyak isinya? Tebak dulu! Kita boleh menebak atau mengira-ngira banyak benda. Setelah itu, hitung kelerengnya untuk membuktikan tebakanmu. Tebakan yang meleset tidak apa-apa. Menebak lalu membuktikan melatih kemampuan berhitung. Pernahkah kamu salah menghitung? Biasanya karena ada yang terhitung dua kali, atau terlewat. Tandai setiap benda yang sudah kamu hitung.",
  },
];

/** Peta pikiran enam simpul: dari menghitung satu per satu sampai menebak dan membuktikan. */
export const PETA_PIKIRAN_A5: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Hitung Satu per Satu",
    stepDesc:
      "Sentuh setiap benda satu kali sambil menyebut bilangannya. Tandai benda yang sudah dihitung supaya tidak terhitung dua kali dan tidak ada yang terlewat. Itulah korespondensi satu-satu.",
    icon: "🔢",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Isi Sepuluh Dulu",
    stepDesc:
      "Kumpulkan sepuluh benda dalam satu kotak, bingkai sepuluh, atau satu lingkaran. Sepuluh yang penuh dianggap satu kelompok, jadi tidak perlu dihitung dari awal lagi. Cara ini mirip menggabung satuan menjadi satu puluhan.",
    icon: "📦",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Tambah Sisanya",
    stepDesc:
      "Hitung benda yang berada di luar kelompok sepuluh. Sepuluh ditambah sisanya adalah banyak seluruh benda. Misalnya sepuluh ditambah empat menjadi empat belas, dan sepuluh ditambah sepuluh menjadi dua puluh.",
    icon: "➕",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Baca dan Tulis",
    stepDesc:
      "Bilangan 11 sampai 20 ditulis dengan dua angka. Angka kiri berarti satu puluhan, angka kanan berarti satuannya. Nama bilangan 13 sampai 19 memakai kata belas, seperti tiga belas dan empat belas. Bilangan 20 dibaca dua puluh.",
    icon: "🗣️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Cek di Garis Bilangan",
    stepDesc:
      "Mulai dari 10 di garis bilangan, lalu melompat ke kanan sebanyak sisanya. Lompat empat kali dari 10 mendarat di 14. Garis bilangan menunjukkan bahwa bilangan makin ke kanan makin besar.",
    icon: "📏",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Tebak dan Buktikan",
    stepDesc:
      "Kira-kira dulu banyak bendanya, lalu hitung untuk membuktikan. Bandingkan tebakan dengan hasil hitungan. Menebak melatih perasaan bilangan, dan menghitung memastikan jawaban yang tepat.",
    icon: "🔍",
  },
];

export function CeritaBelasA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A5} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
