"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BandingMini, PapanLima } from "./diagram-k5b1";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK5B1A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-lg font-black">PR RB R P S</p><Cap>lima tempat</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><PapanLima n={14500} kecil /><Cap>14.500</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-base font-black">66.500</p><Cap>baca dari kiri</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-xl font-black">10.000</p><Cap>nilai PR</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-xl font-black">1.000</p><Cap>nilai RB</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-3xl font-black">0</p><Cap>nol penjaga</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-lg font-black">7 → ribuan</p><Cap>87.986</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">titik ribuan</p><Cap>14.500</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">isi kolom</p><Cap>cara tulis</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab B</p><Cap>banding</Cap></KotakPoster>,
  ];
}

export function visualInfografisK5B1B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-lg font-black">mulai PR</p><Cap>dari kiri</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FEE2E2"><BandingMini a={56560} b={57000} tanda="<" /><Cap>contoh</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-3xl font-black">&gt;</p><Cap>lebih besar</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><p className="text-center text-3xl font-black">&lt;</p><Cap>lebih kecil</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-3xl font-black">=</p><Cap>sama</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-lg font-black">56.560</p><Cap>dakon terkecil</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-lg font-black">75.360</p><Cap>dakon terbesar</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">naik</p><Cap>kecil → besar</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">turun</p><Cap>besar → kecil</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">lanjut Sub-Bab C</p><Cap>komposisi</Cap></KotakPoster>,
  ];
}

export function visualInfografisK5B1C(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DCFCE7"><p className="text-center text-lg font-black">komposisi</p><Cap>susun pecahan</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE"><p className="text-center text-lg font-black">dekomposisi</p><Cap>bentuk panjang</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-lg font-black">38.600</p><Cap>Asep</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><p className="text-center text-lg font-black">63.500</p><Cap>Lukas</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-lg font-black">45.600</p><Cap>Komang</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-base font-black">40k+5k+600</p><Cap>uraian</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-lg font-black">banyak cara</p><Cap>setara</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">digit &gt;9</p><Cap>boleh sementara</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">cek total</p><Cap>harus sama</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">lanjut Sub-Bab D</p><Cap>operasi</Cap></KotakPoster>,
  ];
}

export function visualInfografisK5B1D(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-3xl font-black">+</p><Cap>jumlah</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FEE2E2"><p className="text-center text-3xl font-black">−</p><Cap>selisih</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-3xl font-black">×</p><Cap>kali</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><p className="text-center text-3xl font-black">÷</p><Cap>bagi</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-lg font-black">79.500</p><Cap>bakti sosial</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-lg font-black">2.150</p><Cap>sisa warung</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-lg font-black">60.000</p><Cap>12 angpau</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">16.000</p><Cap>bagi 4</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">susun kolom</p><Cap>nilai tempat</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">Bab 1 A–D siap</p><Cap>Materi</Cap></KotakPoster>,
  ];
}
