"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { AngkaBerwarna, PapanDari } from "./diagram-k4b1";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B1KA(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#EDE9FE"><p className="text-center text-3xl font-black text-[#6D28D9]">1.000</p><Cap>ribuan / satu peti</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><p className="text-center text-3xl font-black text-[#15803D]">100</p><Cap>ratusan / satu dus</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-3xl font-black text-[#1D4ED8]">10</p><Cap>puluhan</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-3xl font-black text-[#DC2626]">1</p><Cap>satuan</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FEF3C7"><AngkaBerwarna n={5274} /><Cap>baca dari kiri</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#F5F3FF"><p className="text-center text-xl font-black text-[#1C01A5]">8.004</p><Cap>delapan ribu empat</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#E0E7FF"><p className="text-center text-xl font-black text-[#1C01A5]">1.830</p><Cap>seribu delapan ratus tiga puluh</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FFF7ED"><PapanDari n={6038} kecil /><Cap>nol menjaga tempat</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-lg font-black text-[#1C01A5]">10 dus = 1 peti</p><Cap>penukaran</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-2xl font-black text-[#1C01A5]">10.000</p><Cap>sepuluh ribu</Cap></KotakPoster>,
  ];
}
