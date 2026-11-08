"use client";

import React from "react";
import {
  BIRU,
  BukuCerita,
  Bunga,
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
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";
import { DonatG, KupuG } from "./selisih-a6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab A: Mengenal Konsep Lebih dari, Kurang dari, dan Selisih      */
/* (Buku Siswa Kelas 1 hlm. 176-182). Maskot: Igil si burung hantu. Tokoh     */
/* buku: Ibu, Tika, Wei, Kira, Halim, Malosi. Semua gambar dibuat di klien    */
/* (SVG), tanpa panggilan API.                                                */
/* Naskah: naskah/mtk-1-bab6-sub-a-lebih-dari-kurang-dari-selisih.md          */
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

function Ket({ x, y, teks, warna = BIRU, ukuran = 12.5 }: { x: number; y: number; teks: string; warna?: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna}>
      {teks}
    </text>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 177: Ibu menghias 7 donat, Tika menghias 6 donat. */
function AdeganDonat() {
  return (
    <>
      <Latar />
      <rect x="12" y="66" width="198" height="34" rx="10" fill="#FDE9C4" stroke={BIRU} strokeWidth="3" />
      <rect x="12" y="106" width="198" height="34" rx="10" fill="#FDE9C4" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 7 }, (_, i) => (
        <DonatG key={`i${i}`} x={30 + i * 26} y={83} s={0.62} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <DonatG key={`t${i}`} x={30 + i * 26} y={123} s={0.62} coklat />
      ))}
      <Label x={216} y={70} w={76} teks="Ibu: 7" />
      <Label x={216} y={110} w={76} teks="Tika: 6" />
      <Tokoh x={60} y={198} rambut="#1F2937" baju={HIJAU} s={0.7} angkat />
      <Tokoh x={118} y={198} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.58} angkat />
      <Lencana x={250} y={166} teks="?" r={19} />
      <Label x={46} y={2} w={208} teks="Membantu Ibu" />
    </>
  );
}

/** Buku hlm. 178: donat Ibu dan donat Tika dipasangkan, satu donat Ibu tidak berpasangan. */
function AdeganPasangan() {
  return (
    <>
      <Latar />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${34 + i * 30} 78 V108`} stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <DonatG key={`i${i}`} x={34 + i * 30} y={62} s={0.72} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <DonatG key={`t${i}`} x={34 + i * 30} y={122} s={0.72} coklat />
      ))}
      <circle cx={214} cy={62} r={19} fill="none" stroke={EMAS} strokeWidth="3.6" strokeDasharray="7 5" />
      <Ket x={214} y={98} teks="lebihnya 1" warna="#B45309" ukuran={13} />
      <Ket x={150} y={164} teks="Donat Ibu 1 lebihnya dari donat Tika" ukuran={12} />
      <Ket x={150} y={184} teks="Donat Tika 1 kurangnya dari donat Ibu" ukuran={12} />
      <Label x={50} y={2} w={200} teks="Pasangkan donat" />
    </>
  );
}

/** Buku hlm. 179: 5 bunga dan 7 kupu-kupu. */
function AdeganKupu() {
  const warnaBunga = [MERAH_MUDA, "#FFFFFF", KUNING, MERAH_MUDA, "#FFFFFF"];
  const posisiKupu: [number, number][] = [
    [30, 60],
    [72, 84],
    [112, 58],
    [152, 86],
    [192, 60],
    [232, 86],
    [268, 94],
  ];
  return (
    <>
      <Latar />
      {warnaBunga.map((w, i) => (
        <g key={i} transform={`translate(${42 + i * 54} 128) scale(2.3)`}>
          <Bunga x={0} y={0} warna={w} />
        </g>
      ))}
      {posisiKupu.map(([x, y], i) => (
        <KupuG key={i} x={x} y={y} s={0.78} warna={i % 2 ? "#FACC15" : "#FB923C"} />
      ))}
      <Label x={84} y={170} w={132} teks="7 – 5 = 2" ukuran={17} />
      <Label x={36} y={2} w={228} teks="Berapa lebihnya kupu-kupu?" ukuran={13} />
    </>
  );
}

/** Buku hlm. 178: kata beda dan selisih, 7 - 6 = 1. */
function AdeganPapan() {
  return (
    <>
      <Latar />
      <Tokoh x={62} y={196} rambut="#7A4A1E" baju="#F97316" s={0.95} angkat />
      <rect x="14" y="94" width="100" height="36" rx="9" fill="#BAE6FD" stroke={BIRU} strokeWidth="3" />
      <text x="64" y="119" textAnchor="middle" fontSize="18" fontWeight="900" fill={BIRU}>
        7 – 6 = 1
      </text>
      <Label x={150} y={40} w={140} teks="lebih dari" />
      <Label x={150} y={78} w={140} teks="kurang dari" />
      <Label x={150} y={116} w={140} teks="beda atau selisih" ukuran={13.5} />
      <Ket x={218} y={168} teks="besar dikurangi kecil" warna="#B45309" ukuran={12.5} />
      <Label x={36} y={2} w={228} teks="Beda atau selisih" />
    </>
  );
}

/** Buku hlm. 180: dua barisan laki-laki dan perempuan. */
function AdeganBarisan() {
  return (
    <>
      <Latar />
      {Array.from({ length: 4 }, (_, i) => (
        <path key={i} d={`M${34 + i * 42} 106 V138`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 6" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <Tokoh key={`l${i}`} x={34 + i * 42} y={102} rambut="#1F2937" baju="#60A5FA" s={0.46} angkat />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <Tokoh key={`p${i}`} x={34 + i * 42} y={174} rambut="#7A4A1E" baju="#F9A8D4" s={0.46} angkat />
      ))}
      <circle cx={202} cy={88} r={24} fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="7 5" />
      <Ket x={262} y={88} teks="laki-laki 5" ukuran={11} />
      <Ket x={262} y={106} teks="lebihnya 1" warna="#B45309" ukuran={11} />
      <Ket x={262} y={158} teks="perempuan 4" ukuran={11} />
      <Label x={32} y={2} w={236} teks="Ayo Bermain: dua barisan" ukuran={13} />
    </>
  );
}

/** Buku hlm. 181: boneka Wei (7) dan boneka Kira (9) di garis bilangan. */
function AdeganGaris() {
  const x = (n: number) => 24 + (n - 4) * 31;
  return (
    <>
      <Latar />
      <path d="M10 112 H290 M284 106 L290 112 L284 118" fill="none" stroke={BIRU} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: 9 }, (_, i) => {
        const n = 4 + i;
        const sorot = n === 7 || n === 9;
        return (
          <g key={n}>
            <path d={`M${x(n)} ${sorot ? 102 : 105} V119`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
            <text x={x(n)} y="138" textAnchor="middle" fontSize={sorot ? 14 : 11.5} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {[7, 8].map((n) => {
        const tengah = (x(n) + x(n + 1)) / 2;
        return <path key={n} d={`M${x(n)} 100 Q${tengah} 66 ${x(n + 1)} 100`} fill="none" stroke={BIRU_B5} strokeWidth="3.2" strokeLinecap="round" />;
      })}
      {[7, 9].map((n, i) => (
        <g key={n}>
          <path d={`M${x(n)} 98 V80`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 5" />
          <circle cx={x(n)} cy="64" r="15" fill={i === 0 ? "#BFDBFE" : "#FFE566"} stroke={BIRU} strokeWidth="3" />
          <text x={x(n)} y="70" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
            {n}
          </text>
          <Ket x={x(n)} y={45} teks={i === 0 ? "Wei" : "Kira"} ukuran={13} />
        </g>
      ))}
      <Ket x={150} y={168} teks="9 – 7 = 2" warna="#B91C1C" ukuran={20} />
      <Tokoh x={40} y={200} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.5} angkat />
      <Tokoh x={262} y={200} rambut="#1F2937" baju={HIJAU} s={0.5} angkat />
      <Label x={36} y={2} w={228} teks="Selisih di garis bilangan" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita lebih dari, kurang dari, dan selisih">
      {id === "A6-S1" && <AdeganDonat />}
      {id === "A6-S2" && <AdeganPasangan />}
      {id === "A6-S3" && <AdeganKupu />}
      {id === "A6-S4" && <AdeganPapan />}
      {id === "A6-S5" && <AdeganBarisan />}
      {id === "A6-S6" && <AdeganGaris />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 177-181) dan pengayaan pasangan serta garis bilangan. */
export const CERITA_A6: Cerita[] = [
  {
    id: "A6-S1",
    sceneType: "membantu-ibu-donat",
    voiceNarration:
      "Hari Minggu telah tiba. Tika membantu Ibu memasak di dapur. Mereka membuat donat. Ibu menghias tujuh donat. Tika menghias enam donat. Tika sangat senang. Siapa yang memiliki donat lebih banyak? Bagaimana kita tahu? Kita hitung dulu donat Ibu, lalu donat Tika, kemudian kita bandingkan.",
  },
  {
    id: "A6-S2",
    sceneType: "pasangkan-donat",
    voiceNarration:
      "Ayo kita pasangkan donat Ibu dengan donat Tika, satu demi satu. Donat Ibu ada tujuh. Donat Tika ada enam. Setelah dipasangkan, satu donat Ibu tidak punya pasangan. Jadi donat Ibu lebih banyak dari donat Tika. Donat Ibu satu lebihnya dari donat Tika. Donat Tika lebih sedikit dari donat Ibu. Donat Tika satu kurangnya dari donat Ibu.",
  },
  {
    id: "A6-S3",
    sceneType: "bunga-dan-kupu-kupu",
    voiceNarration:
      "Ada lima bunga yang sedang mekar. Ada tujuh kupu-kupu terbang di atas bunga. Berapa lebihnya banyak kupu-kupu dari bunga? Berapa kurangnya banyak bunga dari kupu-kupu? Tujuh lebih banyak dari lima. Tujuh dikurangi lima sama dengan dua. Banyak kupu-kupu dua lebihnya dari banyak bunga. Banyak bunga dua kurangnya dari banyak kupu-kupu. Beda banyak bunga dan kupu-kupu adalah dua.",
  },
  {
    id: "A6-S4",
    sceneType: "beda-atau-selisih",
    voiceNarration:
      "Beda dua bilangan bisa ditunjukkan dengan kata lebih dari, kurang dari, beda, atau selisih. Banyaknya donat Ibu berbeda dengan banyaknya donat Tika. Beda banyaknya donat Ibu dan Tika adalah satu. Selisih banyaknya donat Ibu dan Tika adalah satu. Kita menemukan beda dua bilangan dengan mengurangkannya. Bilangan yang lebih besar dikurangi bilangan yang lebih kecil. Tujuh dikurangi enam sama dengan satu.",
  },
  {
    id: "A6-S5",
    sceneType: "dua-barisan-anak",
    voiceNarration:
      "Ayo bermain! Buatlah dua barisan, satu barisan anak laki-laki dan satu barisan anak perempuan. Di gambar ini ada lima anak laki-laki dan empat anak perempuan. Kita pasangkan satu demi satu. Satu anak laki-laki tidak punya pasangan. Jadi anak laki-laki satu lebihnya dari anak perempuan, dan selisih banyaknya adalah satu. Cobalah bersama temanmu, lalu ceritakan hasilnya dengan kata lebih dari, kurang dari, dan selisih.",
  },
  {
    id: "A6-S6",
    sceneType: "selisih-di-garis-bilangan",
    voiceNarration:
      "Garis bilangan juga bisa menunjukkan selisih. Wei mempunyai tujuh boneka. Kira mempunyai sembilan boneka. Dari tujuh ke sembilan, kita melompat dua langkah ke kanan. Jadi selisih banyak boneka Wei dan Kira adalah dua. Sembilan dikurangi tujuh sama dengan dua.",
  },
];

/** Peta pikiran enam simpul: dari menghitung sampai membuat cerita perbandingan. */
export const PETA_PIKIRAN_A6: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Hitung Masing-Masing",
    stepDesc:
      "Hitung banyak benda di setiap kelompok dengan teliti. Donat Ibu ada tujuh dan donat Tika ada enam. Kita perlu kedua bilangan itu sebelum membandingkan.",
    icon: "🔢",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Pasangkan Satu-Satu",
    stepDesc:
      "Pasangkan satu benda dengan satu benda dari kelompok lain. Benda yang tidak punya pasangan adalah sisanya. Kelompok yang punya sisa adalah kelompok yang lebih banyak.",
    icon: "🔗",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Lebihnya dan Kurangnya",
    stepDesc:
      "Sisa itulah lebihnya. Donat Ibu satu lebihnya dari donat Tika. Donat Tika satu kurangnya dari donat Ibu. Lebihnya dan kurangnya sama besar.",
    icon: "⚖️",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Beda atau Selisih",
    stepDesc:
      "Banyaknya benda yang berbeda disebut beda atau selisih. Beda banyak donat Ibu dan Tika adalah satu. Kata beda dan selisih artinya sama.",
    icon: "🔍",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Cari dengan Pengurangan",
    stepDesc:
      "Selisih dua bilangan dicari dengan mengurangkannya. Bilangan yang lebih besar dikurangi bilangan yang lebih kecil. Tujuh dikurangi enam sama dengan satu.",
    icon: "➖",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Cerita Perbandingan",
    stepDesc:
      "Kita bisa membuat cerita perbandingan dan mencari bilangan yang belum diketahui. Kalau diketahui lebihnya, kita menambah. Kalau diketahui kurangnya, kita mengurangi.",
    icon: "📖",
  },
];

export function CeritaSelisihA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A6} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
