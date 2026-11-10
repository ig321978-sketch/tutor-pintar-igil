"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { DiagramBatangMini, PiktogramMini } from "./diagram-k4b6";
import { BATANG_TRANSPORT, DS_MAINAN, DS_WARNA } from "./data-k4b6";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B6A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-lg font-black">diagram gambar</p><Cap>piktogram</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><p className="text-center text-xl font-black">1 = 1</p><Cap>skala satu</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><p className="text-center text-xl font-black">1 = n</p><Cap>skala n</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEE2E2"><PiktogramMini ds={{ ...DS_MAINAN, item: DS_MAINAN.item.slice(0, 3) }} kecil /><Cap>mainan</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-3xl font-black">9</p><Cap>kelereng terbanyak</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-3xl font-black">1</p><Cap>puzzle tersedikit</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><PiktogramMini ds={DS_WARNA} kecil /><Cap>warna</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-xl font-black">× skala</p><Cap>cara baca</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-xl font-black">total</p><Cap>jumlah semua</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab B</p><Cap>diagram batang</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B6B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-lg font-black">persegi panjang</p><Cap>diagram batang</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FEE2E2"><p className="text-center text-lg font-black">Y = banyak</p><Cap>sumbu tegak</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-lg font-black">X = kategori</p><Cap>sumbu datar</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><DiagramBatangMini batang={BATANG_TRANSPORT.slice(0, 4)} arah="tegak" /><Cap>tegak</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><DiagramBatangMini batang={BATANG_TRANSPORT.slice(0, 3)} arah="mendatar" /><Cap>mendatar</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-xl font-black">tinggi = nilai</p><Cap>cara baca</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><p className="text-center text-3xl">🚶</p><Cap>contoh transport</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">bandingkan</p><Cap>paling banyak</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">jumlahkan</p><Cap>total</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">Bab 6 A–B siap</p><Cap>Materi</Cap></KotakPoster>,
  ];
}
