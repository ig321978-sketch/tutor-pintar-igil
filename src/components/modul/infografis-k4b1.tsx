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
