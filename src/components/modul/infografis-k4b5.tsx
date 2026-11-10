"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { SvgBangun } from "./diagram-k4b5";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B5A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-lg font-black">≥3 sisi lurus</p><Cap>segi banyak</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><p className="text-center text-lg font-black">sisi & sudut sama</p><Cap>beraturan</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><SvgBangun jenis="segitiga" kecil /><Cap>3 sisi 3 sudut</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-xl font-black">90°</p><Cap>siku-siku</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><SvgBangun jenis="persegi" kecil /><Cap>persegi</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><SvgBangun jenis="persegi-panjang" kecil /><Cap>persegi panjang</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><SvgBangun jenis="jajargenjang" kecil /><Cap>2 pasang sejajar</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><SvgBangun jenis="trapesium" kecil /><Cap>1 pasang sejajar</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><SvgBangun jenis="segilima" kecil /><Cap>segilima</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab B</p><Cap>komposisi</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B5B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-lg font-black">bagian → utuh</p><Cap>komposisi</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FEE2E2"><p className="text-center text-lg font-black">utuh → bagian</p><Cap>dekomposisi</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><SvgBangun jenis="persegi" kecil /><Cap>□ → 2△</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><SvgBangun jenis="segitiga" kecil /><Cap>2△ → □</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><SvgBangun jenis="segienam" kecil /><Cap>→ 6△</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><SvgBangun jenis="trapesium" kecil /><Cap>3△ → ⏢</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-3xl">🏠</p><Cap>persegi + atap</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">tanpa celah</p><Cap>syarat susun</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">banyak cara</p><Cap>kreatif</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">Bab 5 A–B siap</p><Cap>Materi</Cap></KotakPoster>,
  ];
}
