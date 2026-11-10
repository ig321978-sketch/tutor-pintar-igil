"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BatangSkala, KartuDadu, KartuKoin, KantongBola, RodaPutarRingkas } from "./skala-peluang";
const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);
export function visualInfografisK6B4A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#E2E8F0"><p className="text-center text-lg font-black">Tidak mungkin</p><Cap>peluang 0</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BAE6FD"><p className="text-center text-lg font-black">Kurang mungkin</p><Cap>jarang</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FDE68A"><p className="text-center text-lg font-black">Mungkin</p><Cap>bisa terjadi</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FDBA74"><p className="text-center text-lg font-black">Sangat mungkin</p><Cap>sering</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#86EFAC"><p className="text-center text-lg font-black">Pasti</p><Cap>selalu</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#DBEAFE"><p className="mb-1 text-center text-sm font-black">Spectrum 5 tangga</p><BatangSkala kecil /><Cap>Likelihood Spectrum</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEF3C7"><p className="mb-1 text-center text-sm font-black">Koin 2 sisi</p><KartuKoin sisi="dua" /><Cap>sama mungkin</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#E0E7FF"><p className="mb-1 text-center text-sm font-black">Dadu 1–6</p><KartuDadu sisi={[1,2,3,4,5,6]} /><Cap>satu angka = mungkin</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FCE7F3"><p className="mb-1 text-center text-sm font-black">Roda putar</p><RodaPutarRingkas sektor={[{ label: "Merah", kelas: "#f87171", bagian: 3 }, { label: "Biru", kelas: "#60a5fa", bagian: 1 }, { label: "Hijau", kelas: "#4ade80", bagian: 1 }]} /><Cap>area ≈ peluang</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">lanjut B</p><Cap>bandingkan rasio</Cap></KotakPoster>,
  ];
}
export function visualInfografisK6B4B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#BBF7D0"><p className="text-center text-lg font-black">Favorable</p><Cap>hasil untung</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE"><p className="text-center text-lg font-black">Total</p><Cap>semua hasil</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-lg font-black">a / n</p><Cap>Favorable-to-Total</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FCE7F3"><p className="text-center text-lg font-black">Bandingkan</p><Cap>Comparative Ratio</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#E0E7FF"><p className="text-center text-lg font-black">Adil</p><Cap>peluang sama</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FECACA"><p className="text-center text-lg font-black">Kurang adil</p><Cap>peluang beda</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEF3C7"><p className="mb-1 text-center text-sm font-black">Koin 1/2</p><KartuKoin sisi="gambar" /><Cap>lebih besar dari 1/6</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#E0E7FF"><p className="mb-1 text-center text-sm font-black">Dadu angka 6</p><KartuDadu sisi={[6]} /><Cap>1 dari 6</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFEDD5"><p className="mb-1 text-center text-sm font-black">Mantap 4/7</p><KantongBola isi={[{ warna: "biru", jumlah: 4, kelas: "bg-sky-400" }, { warna: "lain", jumlah: 3, kelas: "bg-rose-300" }]} /><Cap>lebih dari 3/7</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">besar ≠ pasti</p><Cap>Relative Decision</Cap></KotakPoster>,
  ];
}
