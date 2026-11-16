"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { AngkaBerwarna, ModelDari, PapanDari, TabelTempat } from "./diagram-k4b1";
import { empat, lambang, uraian } from "./data-k4b1";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B1A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#EDE9FE"><p className="text-center text-3xl font-black text-[#6D28D9]">1.000</p><Cap>ribuan / satu peti</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><p className="text-center text-3xl font-black text-[#15803D]">100</p><Cap>ratusan / satu dus</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-3xl font-black text-[#1D4ED8]">10</p><Cap>puluhan</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-3xl font-black text-[#DC2626]">1</p><Cap>satuan</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FEF3C7"><AngkaBerwarna n={3286} /><Cap>baca dari kiri</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#F5F3FF"><p className="text-center text-xl font-black text-[#1C01A5]">7.003</p><Cap>tujuh ribu tiga</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#E0E7FF"><p className="text-center text-xl font-black text-[#1C01A5]">1.025</p><Cap>seribu dua puluh lima</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FFF7ED"><PapanDari n={3254} kecil /><Cap>nol menjaga tempat</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-lg font-black text-[#1C01A5]">10 dus = 1 peti</p><Cap>penukaran</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-2xl font-black text-[#1C01A5]">10.000</p><Cap>sepuluh ribu</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B1B(): React.ReactNode[] {
  const d = empat(2150);
  return [
    <KotakPoster key="1" warna="#EDE9FE"><p className="text-center text-2xl font-black">digit ≠ nilai</p><Cap>2 bisa = 2.000</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DDD6FE"><p className="text-center text-3xl font-black text-[#6D28D9]">2.000</p><Cap>2 di ribuan</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#BBF7D0"><p className="text-center text-3xl font-black text-[#15803D]">100</p><Cap>1 di ratusan</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#BFDBFE"><p className="text-center text-3xl font-black text-[#1D4ED8]">50</p><Cap>5 di puluhan</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FECACA"><p className="text-center text-3xl font-black text-[#DC2626]">0</p><Cap>0 di satuan</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FEF3C7"><p className="text-center text-sm font-black">{uraian(2150)}</p><Cap>uraian</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#F5F3FF"><TabelTempat baris={[{ n: "7.812", rb: "7", r: "8", p: "1", s: "2" }]} /><Cap>tabel digit</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#DBEAFE"><p className="text-center text-lg font-black">4 kardus</p><Cap>aktivitas buku</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-xl font-black">6 → 60 / 600</p><Cap>tempat mengubah nilai</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#DCFCE7"><p className="text-center text-lg font-black">siap banding</p><Cap>lanjut Sub-Bab C</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B1C(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#EDE9FE"><p className="text-center text-xl font-black">ribuan dulu</p><Cap>langkah 1</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE"><p className="text-center text-lg font-black">lalu ke kanan</p><Cap>ratusan→puluhan→satuan</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7"><p className="text-center text-3xl font-black text-green-700">&gt;</p><Cap>8.750 &gt; 7.500</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-3xl font-black text-red-700">&lt;</p><Cap>4.352 &lt; 4.365</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FEF3C7"><p className="text-center text-3xl font-black">=</p><Cap>4.352 = 4.352</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#F5F3FF"><p className="text-center text-sm font-black">2.460 → 3.676 → 3.726</p><Cap>urutan naik</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FFF7ED"><p className="text-center text-sm font-black">dari terbesar</p><Cap>urutan turun</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#E0E7FF"><p className="text-center text-lg font-black">tempat penentu</p><Cap>pertama yang berbeda</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-xl font-black">9.521</p><Cap>dari digit 1,5,9,2</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">teliti tanda</p><Cap>dibalik = arti berubah</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B1D(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FCE7F3"><p className="text-center text-xl font-black">komposisi</p><Cap>susun nilai tempat</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#EDE9FE"><p className="text-center text-2xl font-black">6.348</p><Cap>6rb+3rt+4pl+8st</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-xl font-black">dekomposisi</p><Cap>urai ke nilai tempat</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><p className="text-center text-sm font-black">{uraian(6849)}</p><Cap>6.849</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FEF3C7"><p className="text-center text-xl font-black">6.035</p><Cap>nol ratusan tetap</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FEE2E2"><p className="text-center text-xl font-black">7.020</p><Cap>7rb + 2pl</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#F5F3FF"><p className="text-center text-xl font-black">9.999</p><Cap>semua sembilan</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FFF7ED"><p className="text-center text-lg font-black">7.300</p><Cap>uang Helen</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-lg font-black">saling balik</p><Cap>susun ↔ urai</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap E</p><Cap>lanjut penjumlahan</Cap></KotakPoster>,
  ];
}
export function visualInfografisK4B1E(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DCFCE7"><p className="text-center text-xl font-black">dari satuan</p><Cap>kanan → kiri</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BBF7D0"><p className="text-center text-2xl font-black">452</p><Cap>131+321</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-xl font-black">menyimpan</p><Cap>≥10 → simpan 1</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FDE68A"><p className="text-center text-2xl font-black">434</p><Cap>189+245</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DBEAFE"><p className="text-center text-lg font-black">susun pendek</p><Cap>bersusun</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#E0E7FF"><p className="text-center text-lg font-black">susun panjang</p><Cap>urai dulu</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#F5F3FF"><p className="text-center text-2xl font-black">898</p><Cap>tiga bilangan</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FEE2E2"><p className="text-center text-lg font-black">cerita</p><Cap>kelapa & lele</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-lg font-black">periksa</p><Cap>hitung lagi</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap F</p><Cap>lanjut pengurangan</Cap></KotakPoster>,
  ];
}
export function visualInfografisK4B1F(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-xl font-black">dari satuan</p><Cap>kanan → kiri</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BBF7D0"><p className="text-center text-2xl font-black">133</p><Cap>265−132</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FECACA"><p className="text-center text-xl font-black">mengambil</p><Cap>bila tidak cukup</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-2xl font-black">112</p><Cap>241−129</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FDE68A"><p className="text-center text-2xl font-black">77</p><Cap>253−176</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#E0E7FF"><p className="text-center text-lg font-black">satu / dua kali</p><Cap>ambil bertahap</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#DCFCE7"><p className="text-center text-lg font-black">periksa</p><Cap>hasil+pengurang</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#F5F3FF"><p className="text-center text-2xl font-black">66</p><Cap>241−175</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">susun pendek</p><Cap>bersusun</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">selesai F</p><Cap>siap bermain</Cap></KotakPoster>,
  ];
}
export function visualInfografisK4B1G(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-2xl font-black">12 × 4</p><Cap>array donat</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FDE68A"><p className="text-center text-3xl font-black">48</p><Cap>hasil</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#EDE9FE"><p className="text-center text-lg font-black">(10+2)×4</p><Cap>cara panjang</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DDD6FE"><p className="text-center text-lg font-black">40 + 8</p><Cap>jumlah uraian</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DBEAFE"><p className="text-center text-lg font-black">bersusun</p><Cap>dari satuan</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FECACA"><p className="text-center text-lg font-black">menyimpan</p><Cap>satuan ≥ 10</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#BBF7D0"><p className="text-center text-3xl font-black">70</p><Cap>14 × 5</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#F5F3FF"><p className="text-center text-3xl font-black">96</p><Cap>12 × 8</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">cerita</p><Cap>ayam & buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#DCFCE7"><p className="text-center text-lg font-black">siap H</p><Cap>lanjut bagi</Cap></KotakPoster>,
  ];
}
export function visualInfografisK4B1H(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-2xl font-black">48 : 4</p><Cap>permen</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BFDBFE"><p className="text-center text-3xl font-black">12</p><Cap>tiap anak</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#E0E7FF"><p className="text-center text-lg font-black">puluhan dulu</p><Cap>bersusun</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#C7D2FE"><p className="text-center text-lg font-black">4 : 4 = 1</p><Cap>langkah 1</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#A5B4FC"><p className="text-center text-lg font-black">8 : 4 = 2</p><Cap>langkah 2</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#BBF7D0"><p className="text-center text-2xl font-black">sisa 0</p><Cap>habis</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEF3C7"><p className="text-center text-lg font-black">12 × 4</p><Cap>periksa</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FDE68A"><p className="text-center text-2xl font-black">36 : 2</p><Cap>cerita</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FCE7F3"><p className="text-center text-2xl font-black">81 : 3</p><Cap>27 kotak</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#DCFCE7"><p className="text-center text-lg font-black">siap I</p><Cap>faktor</Cap></KotakPoster>,
  ];
}
export function visualInfografisK4B1I(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FCE7F3"><p className="text-center text-lg font-black">faktor</p><Cap>pembagi habis</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FBCFE8"><p className="text-center text-sm font-black">1,2,3,4,6,12</p><Cap>faktor 12</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FECACA"><p className="text-center text-lg font-black">5 ≠ faktor</p><Cap>sisa 2</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#EDE9FE"><p className="text-center text-sm font-black">1,2,4,5,10,20</p><Cap>faktor 20</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DBEAFE"><p className="text-center text-lg font-black">kelipatan</p><Cap>×1, ×2, …</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#BFDBFE"><p className="text-center text-sm font-black">2,4,6,8…</p><Cap>kelipatan 2</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#BBF7D0"><p className="text-center text-sm font-black">3,6,9,12…</p><Cap>kelipatan 3</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FEF3C7"><p className="text-center text-lg font-black">20,25,30</p><Cap>kelipatan 5</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">cerita</p><Cap>beras 10 kg</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#DCFCE7"><p className="text-center text-lg font-black">bab 1</p><Cap>selesai materi</Cap></KotakPoster>,
  ];
}
