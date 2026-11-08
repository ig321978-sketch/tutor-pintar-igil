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
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { MERAH_B5 } from "./belas-a5-dasar";
import { IsiIkatPensil, IsiPensil } from "./nilai-c5-dasar";
import { DonatG } from "./selisih-a6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab B: Penjumlahan yang Hasilnya Kurang dari 20                  */
/* (Buku Siswa Kelas 1 hlm. 182-189). Maskot: Igil si burung hantu. Tokoh     */
/* buku: Ibu, Tika, Upe, Malosi, Halim, Kira. Semua gambar dibuat di klien    */
/* (SVG), tanpa panggilan API.                                                */
/* Naskah: naskah/mtk-1-bab6-sub-b-penjumlahan-kurang-dari-20.md              */
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

/** Buku hlm. 182: Ibu punya 7 donat, Tika punya 6 donat. Berapa jumlahnya? */
function AdeganJumlah() {
  return (
    <>
      <Latar />
      <rect x="12" y="56" width="198" height="34" rx="10" fill="#FDE9C4" stroke={BIRU} strokeWidth="3" />
      <rect x="12" y="98" width="198" height="34" rx="10" fill="#FDE9C4" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 7 }, (_, i) => (
        <DonatG key={`i${i}`} x={30 + i * 26} y={73} s={0.62} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <DonatG key={`t${i}`} x={30 + i * 26} y={115} s={0.62} coklat />
      ))}
      <Label x={216} y={60} w={76} teks="Ibu: 7" />
      <Label x={216} y={102} w={76} teks="Tika: 6" />
      <Label x={76} y={142} w={148} teks="7 + 6 = ?" ukuran={18} />
      <Tokoh x={38} y={202} rambut="#1F2937" baju={HIJAU} s={0.6} angkat />
      <Tokoh x={262} y={202} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.5} angkat />
      <Label x={36} y={2} w={228} teks="Berapa jumlahnya?" />
    </>
  );
}

/** Buku hlm. 182: menghitung maju 7, 8, 9, 10, 11, 12, 13. */
function AdeganMaju() {
  const lebar = 36;
  const mulai = 24;
  const pusat = (i: number) => mulai + i * lebar + lebar / 2;
  return (
    <>
      <Latar />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <path d={`M${pusat(i)} 74 Q${(pusat(i) + pusat(i + 1)) / 2} 46 ${pusat(i + 1) - 3} 72`} fill="none" stroke="#F59E0B" strokeWidth="3.4" strokeLinecap="round" />
          <path d={`M${pusat(i + 1) - 9} 66 L${pusat(i + 1) - 3} 72 L${pusat(i + 1) - 11} 76`} fill="none" stroke="#F59E0B" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i}>
          <rect x={mulai + i * lebar} y="80" width={lebar} height="38" fill={i === 0 ? "#FDE68A" : i % 2 ? "#F3E8FF" : "#E9D5F3"} stroke={BIRU} strokeWidth="2.6" />
          <text x={pusat(i)} y="106" textAnchor="middle" fontSize="19" fontWeight="900" fill={BIRU}>
            {7 + i}
          </text>
        </g>
      ))}
      <Ket x={150} y={148} teks="mulai dari 7, maju 6 kali" ukuran={13} />
      <Ket x={150} y={176} teks="7 + 6 = 13" warna="#B91C1C" ukuran={20} />
      <Tokoh x={30} y={204} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.48} angkat />
      <Tokoh x={272} y={204} rambut="#1F2937" baju={HIJAU} s={0.48} angkat />
      <Label x={36} y={2} w={228} teks="Menghitung maju" />
    </>
  );
}

/** Buku hlm. 183: menghitung dengan 10. Tujuh dan tiga menjadi sepuluh, sisanya tiga. */
function AdeganSepuluh() {
  const sel = 26;
  const awalX = 18;
  const awalY = 60;
  const pos = (i: number) => ({ x: awalX + (i % 5) * sel + sel / 2, y: awalY + Math.floor(i / 5) * sel + sel / 2 });
  return (
    <>
      <Latar />
      <rect x={awalX} y={awalY} width={sel * 5} height={sel * 2} fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <path d={`M${awalX} ${awalY + sel} H${awalX + sel * 5} M${awalX + sel} ${awalY} V${awalY + sel * 2} M${awalX + sel * 2} ${awalY} V${awalY + sel * 2} M${awalX + sel * 3} ${awalY} V${awalY + sel * 2} M${awalX + sel * 4} ${awalY} V${awalY + sel * 2}`} stroke={BIRU} strokeWidth="1.4" opacity="0.5" />
      {Array.from({ length: 10 }, (_, i) => (
        <DonatG key={i} x={pos(i).x} y={pos(i).y} s={0.6} coklat={i >= 7} />
      ))}
      <Ket x={awalX + (sel * 5) / 2} y={awalY + sel * 2 + 18} teks="7 dan 3 menjadi 10" ukuran={12} />
      {Array.from({ length: 3 }, (_, i) => (
        <DonatG key={`s${i}`} x={204 + i * 30} y={84} s={0.66} coklat />
      ))}
      <Ket x={234} y={120} teks="sisa 3" warna="#B45309" ukuran={13} />
      <path d={`M${awalX + sel * 5 + 6} 86 H190`} stroke="#F59E0B" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="1 7" />
      <Ket x={150} y={168} teks="7 + 6 = 10 + 3 = 13" warna="#B91C1C" ukuran={17} />
      <Tokoh x={36} y={204} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.48} angkat />
      <Tokoh x={266} y={204} rambut="#1F2937" baju={HIJAU} s={0.48} angkat />
      <Label x={32} y={2} w={236} teks="Menghitung dengan 10" />
    </>
  );
}

/** Buku hlm. 183: penjumlahan berulang. Tujuh dipisah menjadi satu dan enam, enam ditambah enam. */
function AdeganBerulang() {
  return (
    <>
      <Latar />
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${30 + i * 30} 80 V108`} stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <DonatG key={`a${i}`} x={30 + i * 30} y={66} s={0.66} />
      ))}
      <DonatG x={228} y={66} s={0.66} />
      <circle cx={228} cy={66} r={19} fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="7 5" />
      <Ket x={228} y={100} teks="tinggal 1" warna="#B45309" ukuran={12.5} />
      {Array.from({ length: 6 }, (_, i) => (
        <DonatG key={`b${i}`} x={30 + i * 30} y={122} s={0.66} coklat />
      ))}
      <Ket x={105} y={156} teks="6 + 6 = 12" ukuran={15} />
      <Ket x={150} y={178} teks="12 + 1 = 13" warna="#B91C1C" ukuran={18} />
      <Tokoh x={272} y={204} rambut="#1F2937" baju={HIJAU} s={0.48} angkat />
      <Label x={32} y={2} w={236} teks="Penjumlahan berulang" />
    </>
  );
}

/** Buku hlm. 184: pensil Upe (12) dan pensil Malosi (3). */
function AdeganPensil() {
  return (
    <>
      <Latar />
      <g transform="translate(14 54)">
        <IsiIkatPensil />
      </g>
      <g transform="translate(106 62)">
        <IsiPensil />
      </g>
      <g transform="translate(128 62)">
        <IsiPensil />
      </g>
      <Lencana x={170} y={96} teks="+" r={14} />
      {[198, 220, 242].map((x) => (
        <g key={x} transform={`translate(${x} 62)`}>
          <IsiPensil warna="#A855F7" />
        </g>
      ))}
      <Label x={10} y={136} w={150} teks="12 pensil Upe" ukuran={13} />
      <Label x={172} y={136} w={122} teks="3 pensil Malosi" ukuran={12.5} />
      <Label x={90} y={170} w={120} teks="12 + 3 = ?" ukuran={17} />
      <Label x={36} y={2} w={228} teks="Pensil Upe dan Malosi" />
    </>
  );
}

/** Buku hlm. 185: pasangan bilangan dan nilai tempat untuk 12 + 3. */
function AdeganPasangan() {
  const tabel = { x: 124, y: 98, w: 158 };
  const kol = tabel.w / 2;
  return (
    <>
      <Latar />
      <path d="M46 68 L32 98 M68 68 L82 98" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      <Bulat x={56} y={50} v="12" isi="#FFE566" />
      <Bulat x={28} y={116} v="10" isi="#FECACA" />
      <Bulat x={86} y={116} v="2" isi="#BFDBFE" />
      <Ket x={172} y={58} teks="2 + 3 = 5" ukuran={15} />
      <Ket x={172} y={82} teks="10 + 5 = 15" warna="#B91C1C" ukuran={15} />
      <rect x={tabel.x} y={tabel.y} width={tabel.w} height="74" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.6" />
      <rect x={tabel.x} y={tabel.y} width={tabel.w} height="16" fill="#E9D8F3" stroke={BIRU} strokeWidth="2.6" />
      <path d={`M${tabel.x + kol} ${tabel.y} V${tabel.y + 74} M${tabel.x} ${tabel.y + 34} H${tabel.x + tabel.w} M${tabel.x} ${tabel.y + 52} H${tabel.x + tabel.w}`} stroke={BIRU} strokeWidth="1.8" />
      <Ket x={tabel.x + kol / 2} y={tabel.y + 12} teks="Puluhan" ukuran={10} />
      <Ket x={tabel.x + kol * 1.5} y={tabel.y + 12} teks="Satuan" ukuran={10} />
      <Ket x={tabel.x + kol / 2} y={tabel.y + 30} teks="1" warna={MERAH_B5} ukuran={15} />
      <Ket x={tabel.x + kol * 1.5} y={tabel.y + 30} teks="2" warna="#1D4ED8" ukuran={15} />
      <Ket x={tabel.x + kol * 1.5} y={tabel.y + 48} teks="3" warna="#1D4ED8" ukuran={15} />
      <Ket x={tabel.x + kol / 2} y={tabel.y + 70} teks="1" warna={MERAH_B5} ukuran={16} />
      <Ket x={tabel.x + kol * 1.5} y={tabel.y + 70} teks="5" warna="#1D4ED8" ukuran={16} />
      <Ket x={tabel.x - 8} y={tabel.y + 48} teks="+" ukuran={18} />
      <Label x={20} y={2} w={260} teks="Pasangan dan nilai tempat" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita penjumlahan yang hasilnya kurang dari 20">
      {id === "B6-S1" && <AdeganJumlah />}
      {id === "B6-S2" && <AdeganMaju />}
      {id === "B6-S3" && <AdeganSepuluh />}
      {id === "B6-S4" && <AdeganBerulang />}
      {id === "B6-S5" && <AdeganPensil />}
      {id === "B6-S6" && <AdeganPasangan />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 182-185): tiga cara satuan dengan satuan dan dua cara puluhan dengan satuan. */
export const CERITA_B6: Cerita[] = [
  {
    id: "B6-S1",
    sceneType: "jumlah-donat",
    voiceNarration:
      "Ibu mempunyai tujuh donat. Tika mempunyai enam donat. Berapakah jumlah donat Ibu dan Tika? Jumlah berarti kedua kelompok digabungkan. Kita bisa menjumlahkan tujuh dan enam dengan berbagai cara. Ayo kita coba satu per satu.",
  },
  {
    id: "B6-S2",
    sceneType: "menghitung-maju",
    voiceNarration:
      "Cara pertama adalah menghitung maju. Mulai dari bilangan tujuh, lalu kita hitung maju sebanyak enam kali. Delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas. Jumlah donat mereka adalah tiga belas.",
  },
  {
    id: "B6-S3",
    sceneType: "menghitung-dengan-sepuluh",
    voiceNarration:
      "Cara kedua adalah menghitung dengan sepuluh. Tujuh dan tiga menjadi sepuluh. Jadi enam kita pisah menjadi tiga dan tiga. Tujuh ditambah tiga sama dengan sepuluh. Sepuluh ditambah tiga sama dengan tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas.",
  },
  {
    id: "B6-S4",
    sceneType: "penjumlahan-berulang",
    voiceNarration:
      "Cara ketiga adalah penjumlahan berulang. Enam dan enam menjadi dua belas. Tujuh kita pisah menjadi satu dan enam. Enam ditambah enam sama dengan dua belas, lalu dua belas ditambah satu sama dengan tiga belas. Jadi tujuh ditambah enam sama dengan tiga belas.",
  },
  {
    id: "B6-S5",
    sceneType: "pensil-upe-malosi",
    voiceNarration:
      "Upe mempunyai dua belas pensil. Malosi mempunyai tiga pensil. Berapakah jumlah pensil Upe dan Malosi? Dua belas pensil Upe terdiri dari satu ikat berisi sepuluh pensil dan dua pensil lepas. Pensil Malosi ada tiga. Kita bisa menjumlahkan dua belas dan tiga dengan berbagai cara.",
  },
  {
    id: "B6-S6",
    sceneType: "pasangan-dan-nilai-tempat",
    voiceNarration:
      "Dua belas dipisah menjadi sepuluh dan dua. Dua ditambah tiga sama dengan lima. Sepuluh ditambah lima sama dengan lima belas. Dengan nilai tempat, dua belas adalah satu puluhan dan dua satuan. Kita tambahkan satuannya, dua ditambah tiga sama dengan lima. Puluhannya tetap satu. Jadi dua belas ditambah tiga sama dengan lima belas.",
  },
];

/** Peta pikiran enam simpul: dari membaca cerita sampai memilih cara yang paling mudah. */
export const PETA_PIKIRAN_B6: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Baca Ceritanya",
    stepDesc:
      "Baca cerita dengan teliti dan cari dua bilangan yang digabungkan. Kata jumlah, digabungkan, dan datang lagi menandakan penjumlahan.",
    icon: "📖",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Menghitung Maju",
    stepDesc:
      "Simpan bilangan pertama di kepala, lalu hitung maju sebanyak bilangan kedua. Tujuh, lalu delapan, sembilan, sepuluh, sebelas, dua belas, tiga belas.",
    icon: "🚶",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Menghitung dengan 10",
    stepDesc:
      "Genapkan sepuluh dulu. Tujuh membutuhkan tiga untuk menjadi sepuluh, jadi enam dipisah menjadi tiga dan tiga. Sepuluh ditambah tiga sama dengan tiga belas.",
    icon: "🔟",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Penjumlahan Berulang",
    stepDesc:
      "Cari dua bilangan yang hampir kembar. Tujuh dipisah menjadi satu dan enam. Enam ditambah enam sama dengan dua belas, lalu ditambah satu menjadi tiga belas.",
    icon: "👯",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Puluhan dengan Satuan",
    stepDesc:
      "Untuk bilangan belasan, pisahkan puluhannya. Dua belas dipisah menjadi sepuluh dan dua. Dua ditambah tiga sama dengan lima, lalu sepuluh ditambah lima sama dengan lima belas.",
    icon: "🧩",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Nilai Tempat dan Pilih Cara",
    stepDesc:
      "Tambahkan satuan dengan satuan, sedangkan puluhannya tetap. Pilih cara yang paling mudah menurutmu, lalu jelaskan alasannya.",
    icon: "🏷️",
  },
];

export function CeritaTambahB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B6} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
