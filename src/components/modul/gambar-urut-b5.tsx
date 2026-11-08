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
import { IsiKepalaUlat, warnaBaris } from "./urut-b5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab B: Menghitung Maju dan Mundur (Buku Siswa Kelas 1             */
/* hlm. 158-160). Maskot: Igil si burung hantu. Tokoh buku: Halim, Malosi,     */
/* Kira, Wei, Tika. Semua gambar dibuat di klien (SVG), tanpa panggilan API.   */
/* Naskah: naskah/mtk-1-bab5-sub-b-menghitung-maju-dan-mundur.md               */
/* ------------------------------------------------------------------------ */

const COKELAT = "#A8672D";

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

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 158: barisan kelereng Halim. Baris 12, 14, dan 15 sengaja tanpa angka, seperti pada buku. */
function AdeganBarisan() {
  const baris = [15, 14, 13, 12, 11, 10];
  const sembunyi = [15, 14, 12];
  return (
    <>
      <Latar />
      <rect x="8" y="34" width="208" height="114" rx="10" fill="#FDE9C4" stroke={COKELAT} strokeWidth="3.6" />
      {baris.map((n, i) => (
        <g key={n}>
          <text x="32" y={46 + i * 17 + 5} textAnchor="end" fontSize="12" fontWeight="900" fill={BIRU}>
            {sembunyi.includes(n) ? "…" : n}
          </text>
          {Array.from({ length: n }, (_, j) => (
            <g key={j}>
              <circle cx={42 + j * 11.4} cy={46 + i * 17} r="4.8" fill={warnaBaris(n)} stroke={BIRU} strokeWidth="1.4" />
              <ellipse cx={40.6 + j * 11.4} cy={44 + i * 17} rx="1.5" ry="1" fill="#FFFFFF" opacity="0.85" />
            </g>
          ))}
        </g>
      ))}
      <Tokoh x={258} y={190} rambut="#1F2937" baju={HIJAU} s={0.9} angkat />
      <Lencana x={258} y={92} teks="?" r={19} />
      <Label x={66} y={2} w={168} teks="10, 11, 12, ..., 15" />
    </>
  );
}

/** Tangga bilangan. `naik` menentukan arah anak tangga. Angka tertulis di tiap anak tangga. */
function Tangga({ naik, warna, penanda }: { naik: boolean; warna: string; penanda: number }) {
  const angka = naik ? [10, 11, 12, 13, 14, 15] : [15, 14, 13, 12, 11, 10];
  const lantai = 176;
  return (
    <>
      {angka.map((n, i) => {
        const tinggi = naik ? 24 + i * 14 : 94 - i * 14;
        const x = 14 + i * 41;
        return (
          <g key={n}>
            <rect x={x} y={lantai - tinggi} width="41" height={tinggi} rx="4" fill={n === penanda ? KUNING : warna} stroke={BIRU} strokeWidth="2.6" />
            <text x={x + 20.5} y={lantai - tinggi + 19} textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
              {n}
            </text>
          </g>
        );
      })}
    </>
  );
}

/** Malosi menghitung maju sambil menaiki tangga, dari 10 ke 15. */
function AdeganMaju() {
  // Anak tangga ke-3 (bilangan 12) berada di indeks 2. Puncaknya 176 - (24 + 2 * 14) = 124.
  return (
    <>
      <Latar />
      <Tangga naik warna="#BFDBFE" penanda={12} />
      <Tokoh x={14 + 2 * 41 + 20} y={124} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.62} angkat />
      <path d="M24 70 H254" stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
      <polygon points="262,70 250,62 250,78" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <Lencana x={280} y={44} teks="+1" r={17} />
      <Label x={68} y={6} w={164} teks="Maju: 10, 11, 12, ..." />
    </>
  );
}

/** Kira menghitung mundur sambil menuruni tangga, dari 15 ke 10. */
function AdeganMundur() {
  // Anak tangga ke-3 (bilangan 13) berada di indeks 2. Puncaknya 176 - (94 - 2 * 14) = 110.
  return (
    <>
      <Latar />
      <Tangga naik={false} warna="#FBCFE8" penanda={13} />
      <Tokoh x={14 + 2 * 41 + 20} y={110} rambut="#1F2937" baju={KUNING} s={0.62} angkat />
      <path d="M262 62 H34" stroke={MERAH_MUDA} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
      <polygon points="26,62 38,54 38,70" fill={MERAH_MUDA} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <Lencana x={20} y={34} teks="−1" r={17} />
      <Label x={64} y={6} w={172} teks="Mundur: 15, 14, 13, ..." />
    </>
  );
}

/** Ulat bilangan dengan satu badan kosong. Wei menunjuk. */
function AdeganUlat() {
  const badan = ["10", "11", "?", "13"];
  return (
    <>
      <Latar />
      <g transform="translate(8 82)">
        <IsiKepalaUlat />
      </g>
      {badan.map((t, i) => {
        const cx = 84 + i * 42;
        const kosong = t === "?";
        return (
          <g key={i}>
            <path d={`M${cx - 8} 128 V138 M${cx + 8} 128 V138`} stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
            <circle cx={cx} cy={110} r="19" fill={kosong ? "#FFFFFF" : "#BBF7D0"} stroke={BIRU} strokeWidth="3" strokeDasharray={kosong ? "5 4" : undefined} />
            <text x={cx} y={118} textAnchor="middle" fontSize="20" fontWeight="900" fill={BIRU}>
              {t}
            </text>
          </g>
        );
      })}
      <Tokoh x={262} y={190} rambut="#1F2937" baju={HIJAU} s={0.88} angkat />
      <Lencana x={168} y={66} teks="?" r={17} />
      <Label x={66} y={8} w={168} teks="10, 11, ..., 13" />
    </>
  );
}

/** Kisi bilangan 1 sampai 20 dengan beberapa kotak kosong, seperti nomor 3 pada buku. */
function AdeganKisi() {
  const kosong = [1, 3, 5, 8, 9, 11, 12, 14, 17, 18, 19];
  return (
    <>
      <Latar />
      {Array.from({ length: 20 }, (_, i) => {
        const n = i + 1;
        const x = 66 + (i % 5) * 34;
        const y = 40 + Math.floor(i / 5) * 26;
        const hilang = kosong.includes(n);
        return (
          <g key={n}>
            <rect x={x} y={y} width="34" height="26" fill={hilang ? "#FFF7CC" : "#FFFFFF"} stroke={BIRU} strokeWidth="2" strokeDasharray={hilang ? "3 3" : undefined} />
            <text x={x + 17} y={y + 19} textAnchor="middle" fontSize="15" fontWeight="900" fill={hilang ? "#9CA3AF" : BIRU}>
              {hilang ? "…" : n}
            </text>
          </g>
        );
      })}
      <Tokoh x={26} y={190} rambut="#7A4A1E" baju={EMAS} s={0.82} angkat />
      <Tokoh x={276} y={190} rambut="#1F2937" baju={MERAH_MUDA} s={0.82} angkat />
      <text x="151" y="162" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={BIRU}>
        kiri → kanan: maju
      </text>
      <text x="151" y="178" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#B91C1C">
        kanan → kiri: mundur
      </text>
      <Label x={72} y={4} w={156} teks="Kisi 1 sampai 20" />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita menghitung maju dan mundur">
      {id === "B5-S1" && <AdeganBarisan />}
      {id === "B5-S2" && <AdeganMaju />}
      {id === "B5-S3" && <AdeganMundur />}
      {id === "B5-S4" && <AdeganUlat />}
      {id === "B5-S5" && <AdeganKisi />}
    </svg>
  );
}

/** Lima adegan, mengikuti halaman buku (hlm. 158-160) dan pengayaan tangga bilangan. */
export const CERITA_B5: Cerita[] = [
  {
    id: "B5-S1",
    sceneType: "barisan-kelereng",
    voiceNarration:
      "Barisan kelereng Halim! Halim menyusun kelerengnya berderet. Baris merah ada sepuluh, baris kuning sebelas, baris biru dua belas, baris hijau tiga belas, baris merah muda empat belas, dan baris ungu lima belas. Perhatikan, setiap baris lebih banyak satu kelereng daripada baris di bawahnya. Ingatkah kamu cara Halim menghitung kelerengnya? Halim menghitung satu per satu, dan bilangannya terus bertambah satu.",
  },
  {
    id: "B5-S2",
    sceneType: "menghitung-maju",
    voiceNarration:
      "Malosi menaiki tangga bilangan. Dia mulai dari anak tangga sepuluh. Naik satu anak tangga, sebelas. Naik lagi, dua belas. Lalu tiga belas, empat belas, dan lima belas. Malosi menghitung maju. Menghitung maju artinya mulai dari bilangan kecil menuju bilangan besar, dan langkahnya sama, yaitu satu demi satu.",
  },
  {
    id: "B5-S3",
    sceneType: "menghitung-mundur",
    voiceNarration:
      "Sekarang Kira menuruni tangga yang sama. Dia mulai dari anak tangga lima belas. Turun satu anak tangga, empat belas. Turun lagi, tiga belas, dua belas, sebelas, dan sepuluh. Kira menghitung mundur. Menghitung mundur artinya mulai dari bilangan besar menuju bilangan kecil, dan langkahnya juga sama, yaitu satu demi satu.",
  },
  {
    id: "B5-S4",
    sceneType: "ulat-bilangan",
    voiceNarration:
      "Wei bertemu ulat bilangan. Badan ulat bertuliskan sepuluh, sebelas, lalu ada satu bulatan yang kosong, dan tiga belas. Bilangan apa yang hilang? Wei menghitung maju dari sepuluh. Sepuluh, sebelas, dua belas, tiga belas. Bilangan yang hilang adalah dua belas, yaitu satu lebih dari sebelas dan satu kurang dari tiga belas.",
  },
  {
    id: "B5-S5",
    sceneType: "kisi-bilangan",
    voiceNarration:
      "Tika dan Halim membuat kisi bilangan satu sampai dua puluh. Setiap baris berisi lima bilangan. Kalau kita membaca dari kiri ke kanan, kita menghitung maju. Kalau kita membaca dari kanan ke kiri, kita menghitung mundur. Beberapa kotak masih kosong. Ayo kita temukan bilangan yang hilang dengan menghitung maju atau mundur dari bilangan di sebelahnya.",
  },
];

/** Peta pikiran lima simpul: dari satu lebih satu kurang sampai mengecek di kisi dan garis bilangan. */
export const PETA_PIKIRAN_B5: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Satu Lebih, Satu Kurang",
    stepDesc:
      "Setiap bilangan punya tetangga. Bilangan di sebelah kanannya satu lebih banyak, dan bilangan di sebelah kirinya satu kurang. Pada barisan kelereng Halim, baris di atas selalu lebih banyak satu daripada baris di bawahnya.",
    icon: "🧮",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Hitung Maju",
    stepDesc:
      "Mulai dari bilangan kecil, lalu naik ke bilangan yang lebih besar. Langkahnya sama, satu demi satu: sepuluh, sebelas, dua belas, tiga belas. Kamu boleh mulai dari bilangan mana saja, tidak harus dari satu atau sepuluh.",
    icon: "⬆️",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Hitung Mundur",
    stepDesc:
      "Mulai dari bilangan besar, lalu turun ke bilangan yang lebih kecil. Langkahnya juga sama, satu demi satu: lima belas, empat belas, tiga belas. Hitung mundur seperti hitungan peluncuran roket.",
    icon: "⬇️",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Temukan yang Hilang",
    stepDesc:
      "Kalau ada bilangan yang hilang dalam deret, lihat bilangan di sebelahnya. Hitung maju dari bilangan sebelumnya, atau hitung mundur dari bilangan sesudahnya. Kedua cara harus memberi hasil yang sama.",
    icon: "🔎",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Cek di Kisi dan Garis Bilangan",
    stepDesc:
      "Di kisi dan garis bilangan, bergeser ke kanan berarti maju, bergeser ke kiri berarti mundur. Kalau kamu maju beberapa langkah lalu mundur dengan langkah yang sama, kamu kembali ke tempat semula.",
    icon: "🗺️",
  },
];

export function CeritaUrutB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B5} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
