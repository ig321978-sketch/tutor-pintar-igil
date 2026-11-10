"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { KisiLuas, SusunanKubusSvg, LabelSatuan } from "./diagram-k4b4";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK4B4A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FEF3C7"><p className="text-center text-lg font-black">tutup tanpa celah</p><Cap>arti luas</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#FFEDD5"><p className="text-center text-3xl">💵</p><Cap>satuan tidak baku</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DBEAFE"><LabelSatuan teks="1 cm²" /><Cap>baku kecil</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#DCFCE7"><LabelSatuan teks="1 m²" /><Cap>baku besar</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-xl font-black">10.000 cm²</p><Cap>1 m² = …</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FEE2E2"><KisiLuas sel={[[true, true], [true, true]]} kecil /><Cap>4 persegi satuan</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FCE7F3"><KisiLuas sel={[[true, true, true], [true, true, true], [true, true, true]]} kecil /><Cap>9 cm²</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#ECFDF5"><p className="text-center text-lg font-black">bentuk beda</p><Cap>luas bisa sama</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#FFF7ED"><p className="text-center text-lg font-black">13 cm²</p><Cap>contoh buku</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">siap Sub-Bab B</p><Cap>volume</Cap></KotakPoster>,
  ];
}

export function visualInfografisK4B4B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-lg font-black">isi ruang</p><Cap>arti volume</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#BFDBFE"><p className="text-center text-xl font-black">A = 4B</p><Cap>Kegiatan B.1</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEE2E2"><p className="text-center text-xl font-black">A = 10C</p><Cap>Kegiatan B.2</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEF3C7"><LabelSatuan teks="5 ml" /><Cap>sendok</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#DCFCE7"><LabelSatuan teks="1 l = 1.000 ml" /><Cap>konversi</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#EDE9FE"><LabelSatuan teks="1 cm³ = 1 ml" /><Cap>pejal ↔ cairan</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FFEDD5"><SusunanKubusSvg lapisan={[[1, 1], [1, 1]]} kecil /><Cap>4 cm³</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FCE7F3"><SusunanKubusSvg lapisan={[[1, 1, 1], [1, 1, 1], [1, 1, 1]]} kecil /><Cap>9 cm³</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#ECFDF5"><p className="text-center text-lg font-black">1 m³ = 1.000 l</p><Cap>wadah besar</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">Bab 4 A–B siap</p><Cap>Materi lengkap</Cap></KotakPoster>,
  ];
}
