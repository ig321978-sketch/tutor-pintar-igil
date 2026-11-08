"use client";

import React from "react";
import {
  BIRU,
  BukuCerita,
  EMAS,
  HIJAU,
  Latar,
  MERAH_MUDA,
  type Cerita,
} from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { MERAH_B5 } from "./belas-a5-dasar";
import { IsiPensil } from "./nilai-c5-dasar";
import { ApelG, BoluG } from "./kurang-c6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab C: Pengurangan yang Hasilnya Kurang dari 20                  */
/* (Buku Siswa Kelas 1 hlm. 189-195). Maskot: Igil si burung hantu. Tokoh     */
/* buku: Tika, Ibu, Malosi, Wei, Kira. Semua gambar dibuat di klien (SVG),    */
/* tanpa panggilan API.                                                       */
/* Naskah: naskah/mtk-1-bab6-sub-c-pengurangan-kurang-dari-20.md              */
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

/** Lingkaran bilangan untuk bagan pasangan. */
function Bulat({ x, y, r = 19, v, isi }: { x: number; y: number; r?: number; v: string; isi: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={isi} stroke={BIRU} strokeWidth="3" />
      <text x={x} y={y + 7} textAnchor="middle" fontSize={v.length > 1 ? 19 : 22} fontWeight="900" fill={BIRU}>
        {v}
      </text>
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 189: Tika membeli 15 apel, 3 apel dimakan ulat. */
function AdeganApel() {
  return (
    <>
      <Latar />
      {Array.from({ length: 6 }, (_, i) => (
        <ApelG key={`a${i}`} x={36 + i * 26} y={60} s={0.52} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <ApelG key={`b${i}`} x={36 + i * 26} y={77} s={0.52} />
      ))}
      <path d="M16 98 H172 L160 150 H28 Z" fill="#D6A25E" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <rect x="10" y="90" width="168" height="12" rx="5" fill="#B97C3A" stroke={BIRU} strokeWidth="3" />
      <path d="M40 112 H148 M44 128 H144" stroke={BIRU} strokeWidth="1.6" opacity="0.35" />
      {[212, 238, 264].map((x) => (
        <ApelG key={x} x={x} y={112} s={0.64} gigit />
      ))}
      <Ket x={238} y={142} teks="dimakan ulat: 3" warna="#B45309" ukuran={11.5} />
      <Ket x={94} y={164} teks="sisa 12 apel" ukuran={12} />
      <Label x={84} y={174} w={132} teks="15 – 3 = ?" ukuran={17} />
      <Tokoh x={264} y={204} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.48} angkat />
      <Label x={20} y={2} w={260} teks="Apel Tika dimakan ulat" ukuran={13} />
    </>
  );
}

/** Buku hlm. 190: menghitung mundur 15, 14, 13, 12. */
function AdeganMundur() {
  const lebar = 44;
  const mulai = 40;
  const pusat = (i: number) => mulai + i * lebar + lebar / 2;
  return (
    <>
      <Latar />
      {[0, 1, 2].map((k) => {
        const dari = 4 - k;
        const ke = 3 - k;
        return (
          <g key={k}>
            <path d={`M${pusat(dari)} 78 Q${(pusat(dari) + pusat(ke)) / 2} 48 ${pusat(ke) + 3} 76`} fill="none" stroke="#F59E0B" strokeWidth="3.4" strokeLinecap="round" />
            <path d={`M${pusat(ke) + 9} 70 L${pusat(ke) + 3} 76 L${pusat(ke) + 11} 80`} fill="none" stroke="#F59E0B" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <rect x={mulai + i * lebar} y="84" width={lebar} height="38" fill={i === 4 ? "#FDE68A" : i === 1 ? "#BBF7D0" : i % 2 ? "#F3E8FF" : "#E9D5F3"} stroke={BIRU} strokeWidth="2.6" />
          <text x={pusat(i)} y="110" textAnchor="middle" fontSize="19" fontWeight="900" fill={BIRU}>
            {11 + i}
          </text>
        </g>
      ))}
      <Ket x={150} y={152} teks="mulai dari 15, mundur 3 kali" ukuran={13} />
      <Ket x={150} y={178} teks="15 – 3 = 12" warna="#B91C1C" ukuran={20} />
      <Tokoh x={30} y={204} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.48} angkat />
      <Tokoh x={272} y={204} rambut="#1F2937" baju={HIJAU} s={0.48} angkat />
      <Label x={36} y={2} w={228} teks="Menghitung mundur" />
    </>
  );
}

/** Buku hlm. 190: pasangan bilangan. 15 dipisah menjadi 10 dan 5, 5 – 3 = 2. */
function AdeganPasangan() {
  return (
    <>
      <Latar />
      <path d="M46 72 L32 98 M74 72 L88 98" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <Bulat x={60} y={54} v="15" isi="#FFE566" />
      <Bulat x={30} y={116} v="10" isi="#FECACA" />
      <Bulat x={90} y={116} v="5" isi="#BFDBFE" />
      <Ket x={190} y={104} teks="5 – 3 = 2" ukuran={16} />
      <Ket x={190} y={130} teks="10 + 2 = 12" warna="#B91C1C" ukuran={16} />
      <Ket x={190} y={84} teks="15 dipisah 10 dan 5" ukuran={11.5} />
      <Label x={76} y={150} w={148} teks="15 – 3 = 12" ukuran={17} />
      <Label x={20} y={2} w={260} teks="Pasangan bilangan" ukuran={13} />
    </>
  );
}

/** Buku hlm. 190: nilai tempat. 1 puluhan dan 5 satuan, dikurangi 3 satuan. */
function AdeganNilaiTempat() {
  const t = { x: 26, y: 46, w: 150 };
  const kol = t.w / 2;
  return (
    <>
      <Latar />
      <rect x={t.x} y={t.y} width={t.w} height="90" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <rect x={t.x} y={t.y} width={t.w} height="16" fill="#E9D8F3" stroke={BIRU} strokeWidth="2.6" />
      <path d={`M${t.x + kol} ${t.y} V${t.y + 90} M${t.x} ${t.y + 64} H${t.x + t.w}`} stroke={BIRU} strokeWidth="1.8" />
      <path d={`M${t.x} ${t.y + 64} H${t.x + t.w}`} stroke={BIRU} strokeWidth="3.4" />
      <Ket x={t.x + kol / 2} y={t.y + 12} teks="Puluhan" ukuran={10} />
      <Ket x={t.x + kol * 1.5} y={t.y + 12} teks="Satuan" ukuran={10} />
      <Ket x={t.x + kol / 2} y={t.y + 38} teks="1" warna={MERAH_B5} ukuran={17} />
      <Ket x={t.x + kol * 1.5} y={t.y + 38} teks="5" warna="#1D4ED8" ukuran={17} />
      <Ket x={t.x + kol * 1.5} y={t.y + 58} teks="3" warna="#1D4ED8" ukuran={17} />
      <Ket x={t.x + kol / 2} y={t.y + 84} teks="1" warna={MERAH_B5} ukuran={18} />
      <Ket x={t.x + kol * 1.5} y={t.y + 84} teks="2" warna="#1D4ED8" ukuran={18} />
      <Ket x={t.x - 12} y={t.y + 58} teks="–" ukuran={22} />
      <Ket x={236} y={96} teks="puluhan tetap" ukuran={11.5} />
      <Ket x={236} y={116} teks="5 – 3 = 2" warna="#B45309" ukuran={13} />
      <Ket x={236} y={136} teks="hasilnya 12" warna="#B91C1C" ukuran={12.5} />
      <Ket x={150} y={170} teks="15 – 3 = 12" warna="#B91C1C" ukuran={17} />
      <Label x={36} y={2} w={228} teks="Nilai tempat" />
    </>
  );
}

/** Buku hlm. 192: Ibu membeli 13 bolu kukus, Malosi memakan 2. */
function AdeganBolu() {
  return (
    <>
      <Latar />
      <rect x="14" y="58" width="134" height="64" rx="8" fill="#FDE9C4" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 10 }, (_, i) => (
        <BoluG key={i} x={38 + (i % 5) * 25} y={82 + Math.floor(i / 5) * 28} s={0.54} />
      ))}
      <Ket x={81} y={140} teks="1 kotak = 10" ukuran={12} />
      {[192, 224, 256].map((x, i) => (
        <g key={x}>
          <BoluG x={x} y={96} s={0.66} />
          {i > 0 ? <path d={`M${x - 14} 80 L${x + 14} 112 M${x + 14} 80 L${x - 14} 112`} stroke="#DC2626" strokeWidth="4" strokeLinecap="round" /> : null}
        </g>
      ))}
      <Ket x={224} y={134} teks="lepas 3, dimakan 2" warna="#B45309" ukuran={11.5} />
      <Label x={84} y={152} w={132} teks="13 – 2 = 11" ukuran={17} />
      <Tokoh x={274} y={206} rambut="#1F2937" baju={HIJAU} s={0.46} angkat />
      <Label x={36} y={2} w={228} teks="Bolu kukus Ibu" />
    </>
  );
}

/** Buku hlm. 193: Wei punya 11 pensil warna, pensil Kira 3 kurangnya. */
function AdeganPensil() {
  const x = (i: number) => 18 + i * 13;
  return (
    <>
      <Latar />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={`w${i}`} transform={`translate(${x(i)} 48) scale(0.55)`}>
          <IsiPensil />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={`k${i}`} transform={`translate(${x(i)} 98) scale(0.55)`}>
          <IsiPensil warna="#A855F7" />
        </g>
      ))}
      {[8, 9, 10].map((i) => (
        <rect key={`h${i}`} x={x(i) + 1} y={101} width="9" height="31" rx="2" fill="none" stroke={EMAS} strokeWidth="2.4" strokeDasharray="4 3" />
      ))}
      <Label x={176} y={52} w={112} teks="Wei: 11" ukuran={15} />
      <Label x={176} y={102} w={112} teks="Kira: 8" ukuran={15} />
      <Ket x={232} y={146} teks="3 kurangnya" warna="#B45309" ukuran={11.5} />
      <Ket x={86} y={166} teks="11 – 3 = 8" warna="#B91C1C" ukuran={16} />
      <Ket x={214} y={166} teks="8 + 11 = 19" ukuran={16} />
      <Label x={20} y={2} w={260} teks="Pensil Wei dan Kira" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita pengurangan yang hasilnya kurang dari 20">
      {id === "C6-S1" && <AdeganApel />}
      {id === "C6-S2" && <AdeganMundur />}
      {id === "C6-S3" && <AdeganPasangan />}
      {id === "C6-S4" && <AdeganNilaiTempat />}
      {id === "C6-S5" && <AdeganBolu />}
      {id === "C6-S6" && <AdeganPensil />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 189-193): tiga cara pengurangan puluhan dengan satuan dan dua soal cerita. */
export const CERITA_C6: Cerita[] = [
  {
    id: "C6-S1",
    sceneType: "apel-dimakan-ulat",
    voiceNarration:
      "Masih ingatkah kamu cerita Ibu dan Tika? Ibu punya tujuh donat, Tika punya enam donat, dan selisihnya tujuh dikurangi enam sama dengan satu. Kita sudah belajar pengurangan satuan dengan satuan. Sekarang kita belajar pengurangan puluhan dengan satuan. Tika membeli lima belas apel. Ternyata tiga apel dimakan ulat. Berapakah sisa apel Tika yang masih bagus? Sisanya adalah lima belas dikurangi tiga. Kita bisa menghitungnya dengan beberapa cara.",
  },
  {
    id: "C6-S2",
    sceneType: "menghitung-mundur",
    voiceNarration:
      "Cara pertama adalah menghitung mundur. Mulai dari lima belas, lalu hitung mundur tiga kali. Empat belas, tiga belas, dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas. Sisa apel Tika adalah dua belas.",
  },
  {
    id: "C6-S3",
    sceneType: "pasangan-bilangan-kurang",
    voiceNarration:
      "Cara kedua adalah pasangan bilangan. Lima belas bisa dipisah menjadi sepuluh dan lima. Lima dikurangi tiga sama dengan dua. Lalu sepuluh ditambah dua sama dengan dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas.",
  },
  {
    id: "C6-S4",
    sceneType: "nilai-tempat-kurang",
    voiceNarration:
      "Cara ketiga adalah nilai tempat. Lima belas adalah satu puluhan dan lima satuan. Kita kurangkan satuannya, lima dikurangi tiga sama dengan dua. Puluhannya tetap satu. Jadi lima belas dikurangi tiga sama dengan dua belas. Sisa apel Tika adalah dua belas.",
  },
  {
    id: "C6-S5",
    sceneType: "bolu-kukus-ibu",
    voiceNarration:
      "Ibu membeli tiga belas bolu kukus. Malosi memakan dua bolu kukus. Berapakah sisa bolu kukus Ibu sekarang? Tiga belas adalah satu kotak berisi sepuluh dan tiga bolu lepas. Malosi memakan dua bolu lepas, jadi tinggal satu bolu lepas. Sepuluh ditambah satu sama dengan sebelas. Jadi tiga belas dikurangi dua sama dengan sebelas.",
  },
  {
    id: "C6-S6",
    sceneType: "pensil-wei-kira",
    voiceNarration:
      "Wei mempunyai sebelas pensil warna. Pensil warna Kira tiga kurangnya dari pensil warna Wei. Berapa banyak pensil warna Kira? Sebelas dikurangi tiga sama dengan delapan. Jadi pensil warna Kira ada delapan. Kalau pensil warna Kira dan Wei digabungkan, delapan ditambah sebelas sama dengan sembilan belas.",
  },
];

/** Peta pikiran enam simpul: dari membaca cerita sampai memilih cara dan membuat cerita sendiri. */
export const PETA_PIKIRAN_C6: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Baca Ceritanya",
    stepDesc:
      "Baca cerita dengan teliti. Kata sisa, dimakan, diambil, dan pergi menandakan pengurangan. Tentukan bilangan mula-mula dan banyak yang berkurang.",
    icon: "📖",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Menghitung Mundur",
    stepDesc:
      "Mulai dari bilangan yang besar, lalu hitung mundur sebanyak bilangan yang dikurangkan. Lima belas, lalu empat belas, tiga belas, dua belas.",
    icon: "⏪",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Pasangan Bilangan",
    stepDesc:
      "Pisahkan belasan menjadi sepuluh dan satuan. Lima belas dipisah menjadi sepuluh dan lima. Lima dikurangi tiga sama dengan dua, lalu sepuluh ditambah dua sama dengan dua belas.",
    icon: "🧩",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Nilai Tempat",
    stepDesc:
      "Kurangkan satuan dengan satuan, sedangkan puluhannya tetap. Lima dikurangi tiga sama dengan dua, puluhan tetap satu, jadi hasilnya dua belas.",
    icon: "🏷️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Cek dengan Menambah",
    stepDesc:
      "Periksa hasil pengurangan dengan penjumlahan. Dua belas ditambah tiga sama dengan lima belas, jadi lima belas dikurangi tiga memang dua belas.",
    icon: "🔄",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Pilih Cara dan Buat Ceritamu",
    stepDesc:
      "Pilih cara yang paling mudah, lalu jelaskan alasannya. Buat cerita pengurangan sendiri, misalnya apel di pohon, tulis operasinya, dan selesaikan.",
    icon: "✍️",
  },
];

export function CeritaKurangC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_C6} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
