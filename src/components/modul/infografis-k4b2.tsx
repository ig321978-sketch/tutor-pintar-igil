"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BatangPecahan, LingkaranPecahan, NotasiPecahan } from "./diagram-k4b2";

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
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">A–C lengkap</p><Cap>fondasi pecahan</Cap></KotakPoster>,
  ];
}
