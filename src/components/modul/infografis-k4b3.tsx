"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BarisPola, RantaiBilangan } from "./diagram-k4b3";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B3A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><BarisPola suku={[2, 4, 6]} emoji="🟠" kecil /><Cap>jeruk +2</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FFEDD5"><p className="text-center text-2xl font-black text-[#C2410C]">+2</p><Cap>beda tetap</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7"><p className="text-center text-xl font-black">ke-7 = 14</p><Cap>tabel jeruk</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><BarisPola suku={[9, 7, 5]} emoji="🍬" kecil /><Cap>permen −2</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FCE7F3"><p className="text-center text-2xl font-black text-[#BE123C]">−2</p><Cap>beda negatif</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#DBEAFE"><p className="text-center text-xl font-black">ke-5 = 1</p><Cap>tabel permen</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#EDE9FE"><p className="text-center text-lg font-black">membesar</p><Cap>benda bertambah</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">mengecil</p><Cap>benda berkurang</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">tabel selisih</p><Cap>alat buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab B</p><Cap>pola bilangan</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B3B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><RantaiBilangan suku={[3, 5, 7, 9]} /><Cap>beda +2</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BFDBFE"><RantaiBilangan suku={[1, 4, 7, 10]} /><Cap>beda +3</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEE2E2"><RantaiBilangan suku={[23, 18, 13, 8]} /><Cap>beda −5</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FFEDD5"><p className="text-center text-xl font-black">20→28→36→44→52</p><Cap>telur +8</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DCFCE7"><p className="text-center text-lg font-black">membesar</p><Cap>beda positif</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FCE7F3"><p className="text-center text-lg font-black">mengecil</p><Cap>beda negatif</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#EDE9FE"><p className="text-center text-lg font-black">selisih sama</p><Cap>aturan tetap</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">tabel suku</p><Cap>cari berikutnya</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FEF3C7"><p className="text-center text-lg font-black">rak · kursi · TV</p><Cap>cerita buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">pola selesai</p><Cap>Bab 3 A–B</Cap></KotakPoster>,
  ];
}
