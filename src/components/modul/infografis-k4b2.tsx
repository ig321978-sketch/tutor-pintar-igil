"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BatangPecahan, KotakPecahan, LingkaranPecahan, NotasiPecahan } from "./diagram-k4b2";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B2A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><NotasiPecahan pec={{ p: 1, q: 4 }} besar /><Cap>pembilang satu</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FFEDD5"><LingkaranPecahan pec={{ p: 1, q: 4 }} ukuran={72} /><Cap>pizza 1/4</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#EDE9FE"><p className="text-center text-xl font-black">pembilang</p><Cap>angka atas</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DBEAFE"><p className="text-center text-xl font-black">penyebut</p><Cap>angka bawah</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DCFCE7"><LingkaranPecahan pec={{ p: 1, q: 2 }} ukuran={64} label={false} /><Cap>1/2 &gt; 1/4</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FEE2E2"><LingkaranPecahan pec={{ p: 1, q: 10 }} ukuran={64} /><Cap>1/10 &lt; 1/5</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#F5F3FF"><BatangPecahan pec={{ p: 1, q: 5 }} lebar={120} tinggi={24} /><Cap>baca arsir</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">n besar → 1/n kecil</p><Cap>aturan unit</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">1/2 kg &gt; 1/4 kg</p><Cap>cerita Tiara</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab B</p><Cap>penyebut sama</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B2B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><NotasiPecahan pec={{ p: 1, q: 3 }} besar /><Cap>penyebut 3</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BFDBFE"><NotasiPecahan pec={{ p: 2, q: 3 }} besar /><Cap>1/3 &lt; 2/3</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7"><p className="text-center text-lg font-black">lihat pembilang</p><Cap>jika q sama</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEF3C7"><BatangPecahan pec={{ p: 2, q: 10 }} lebar={130} tinggi={24} /><Cap>2/10</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FFEDD5"><BatangPecahan pec={{ p: 1, q: 10 }} lebar={130} tinggi={24} /><Cap>1/10</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#EDE9FE"><p className="text-center text-xl font-black">2/10 &gt; 1/10</p><Cap>pembilang lebih besar</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><LingkaranPecahan pec={{ p: 3, q: 6 }} ukuran={64} /><Cap>tongkat Asep</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FCE7F3"><LingkaranPecahan pec={{ p: 2, q: 6 }} ukuran={64} /><Cap>tongkat Azizah</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-lg font-black">3/6 &gt; 2/6</p><Cap>cerita buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab C</p><Cap>pecahan senilai</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B2C(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><NotasiPecahan pec={{ p: 2, q: 6 }} besar /><Cap>2/6</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><NotasiPecahan pec={{ p: 1, q: 3 }} besar /><Cap>= 1/3</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-xl font-black">×k / ×k</p><Cap>kalikan keduanya</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#EDE9FE"><p className="text-center text-xl font-black">÷k / ÷k</p><Cap>bagi keduanya</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FFEDD5"><LingkaranPecahan pec={{ p: 1, q: 2 }} ukuran={64} /><Cap>1/2</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FEE2E2"><LingkaranPecahan pec={{ p: 2, q: 4 }} ukuran={64} /><Cap>2/4 senilai</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#F5F3FF"><BatangPecahan pec={{ p: 3, q: 9 }} lebar={120} tinggi={24} /><Cap>3/9 = 1/3</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">nilai sama</p><Cap>bentuk boleh beda</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">coklat 2/6</p><Cap>cerita buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab D</p><Cap>desimal</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B2D(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#ECFDF5"><NotasiPecahan pec={{ p: 1, q: 10 }} besar /><Cap>roti 1/10</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#D1FAE5"><p className="text-center text-3xl font-black text-[#059669]">0,1</p><Cap>persepuluhan</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><NotasiPecahan pec={{ p: 1, q: 100 }} besar /><Cap>biskuit 1/100</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FFEDD5"><p className="text-center text-3xl font-black text-[#C2410C]">0,01</p><Cap>perseratusan</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DBEAFE"><p className="text-center text-xl font-black">1 digit → 10</p><Cap>aturan koma</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#EDE9FE"><p className="text-center text-xl font-black">2 digit → 100</p><Cap>aturan koma</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><BatangPecahan pec={{ p: 3, q: 10 }} lebar={130} tinggi={24} /><Cap>0,3</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FCE7F3"><KotakPecahan pec={{ p: 25, q: 100 }} /><Cap>0,25</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#F5F3FF"><p className="text-center text-lg font-black">7/100 = 0,07</p><Cap>contoh buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab E</p><Cap>menuju persen</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B2E(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-4xl font-black text-[#D97706]">%</p><Cap>per seratus</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FFEDD5"><p className="text-center text-2xl font-black">0,75</p><Cap>desimal</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><NotasiPecahan pec={{ p: 75, q: 100 }} besar /><Cap>pecahan</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><p className="text-center text-3xl font-black text-[#15803D]">75%</p><Cap>hasil</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-xl font-black">× 100%</p><Cap>cara langsung</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FEE2E2"><p className="text-center text-lg font-black">geser koma 2×</p><Cap>tips buku</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-2xl font-black">246%</p><Cap>2,46</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-xl font-black">20/50 = 40%</p><Cap>cerita kelas</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#F5F3FF"><p className="text-center text-xl font-black">18% → 0,18</p><Cap>balik</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">A–E lengkap</p><Cap>Bab 2 pecahan</Cap></KotakPoster>,
  ];
}
