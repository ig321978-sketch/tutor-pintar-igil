"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { ChipData, KartuTurus, TabelNilaiTurus, TitikKelompokLima } from "./diagram-k3b5";
import { TABEL_NILAI_BUKU } from "./data-k3b5";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 5 (Penyajian Data dalam Tabel). Gambar      */
/* saja: teks panel dan suara berasal dari naskah-k3b5.ts. Tanpa API.          */
/* ------------------------------------------------------------------------ */

const Cap = ({ children, warna = "#1C01A5" }: { children: React.ReactNode; warna?: string }) => (
  <p className="text-center text-[11px] font-black leading-tight" style={{ color: warna }}>
    {children}
  </p>
);

const Chip = ({ children, warna = "#FFE566" }: { children: React.ReactNode; warna?: string }) => (
  <span className="inline-block rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
    {children}
  </span>
);

export function visualInfografisK3B5A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#E0E7FF">
      <ChipData data={[3, 5, 7, 7]} />
      <div className="flex justify-center pt-1">
        <Chip>dari terkecil ke terbesar</Chip>
      </div>
    </KotakPoster>,
    <KotakPoster key="2" warna="#FEF9C3">
      <p className="text-center text-4xl font-black text-[#1C01A5]">5</p>
      <Cap>data terkecil</Cap>
    </KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE">
      <p className="text-center text-4xl font-black text-[#1C01A5]">10</p>
      <Cap>data terbesar</Cap>
    </KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7">
      <p className="text-center text-2xl font-black text-[#DC2626]">10 − 5 = 5</p>
      <Cap>jangkauan</Cap>
    </KotakPoster>,
    <KotakPoster key="5" warna="#FEE2E2">
      <div className="flex justify-center">
        <KartuTurus n={4} kecil />
      </div>
      <Cap>4 garis turus</Cap>
    </KotakPoster>,
    <KotakPoster key="6" warna="#FFF7ED">
      <div className="flex justify-center">
        <KartuTurus n={5} kecil />
      </div>
      <Cap>kelompok lima</Cap>
    </KotakPoster>,
    <KotakPoster key="7" warna="#F5F3FF">
      <p className="text-center text-3xl font-black text-[#1C01A5]">nilai 9</p>
      <Chip warna="#BBF7D0">5 siswa</Chip>
    </KotakPoster>,
    <KotakPoster key="8" warna="#ECFCCB">
      <p className="text-center text-3xl font-black text-[#1C01A5]">nilai 10</p>
      <Chip warna="#FDE68A">2 siswa</Chip>
    </KotakPoster>,
    <KotakPoster key="9" warna="#FFE4E6">
      <ChipData data={[5, 6, 7, 8, 9, 10]} />
      <Cap>enam macam nilai</Cap>
    </KotakPoster>,
    <KotakPoster key="10" warna="#E0F2FE">
      <TabelNilaiTurus baris={TABEL_NILAI_BUKU.slice(0, 3)} kecil />
      <Cap>siap ke tabel</Cap>
    </KotakPoster>,
  ];
}

export function visualInfografisK3B5B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF9C3">
      <div className="flex justify-center">
        <KartuTurus n={4} kecil />
      </div>
      <Cap>empat lidi tegak</Cap>
    </KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE">
      <div className="flex justify-center">
        <KartuTurus n={5} kecil />
      </div>
      <Cap>empat tegak + satu miring</Cap>
    </KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7">
      <div className="flex justify-center">
        <KartuTurus n={10} kecil />
      </div>
      <Cap>dua kelompok = 10</Cap>
    </KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2">
      <div className="flex justify-center">
        <KartuTurus n={13} kecil />
      </div>
      <Cap>10 + 3 = 13</Cap>
    </KotakPoster>,
    <KotakPoster key="5" warna="#E0E7FF">
      <div className="space-y-1 text-center text-xs font-black text-[#1C01A5]">
        <p>nilai / warna / huruf</p>
        <p>turus</p>
        <p>banyak</p>
      </div>
      <Chip>tiga kolom</Chip>
    </KotakPoster>,
    <KotakPoster key="6" warna="#FFE4E6">
      <p className="text-center text-4xl">🔴🔵⚫</p>
      <Cap>manik merah, biru, hitam</Cap>
    </KotakPoster>,
    <KotakPoster key="7" warna="#FEF3C7">
      <p className="text-center text-3xl font-black text-[#1C01A5]">T</p>
      <Chip warna="#BBF7D0">3 kali pada STATISTIKA</Chip>
    </KotakPoster>,
    <KotakPoster key="8" warna="#ECFCCB">
      <p className="text-center text-3xl font-black text-[#1C01A5]">K</p>
      <Chip warna="#FDE68A">1 kali pada STATISTIKA</Chip>
    </KotakPoster>,
    <KotakPoster key="9" warna="#F5F3FF">
      <p className="text-center text-2xl font-black text-[#1C01A5]">&gt; 7</p>
      <Cap>jumlahkan 8 + 9 + 10</Cap>
    </KotakPoster>,
    <KotakPoster key="10" warna="#E0F2FE">
      <div className="flex justify-center">
        <TitikKelompokLima n={15} />
      </div>
      <Cap>data rapi di tabel</Cap>
    </KotakPoster>,
  ];
}
