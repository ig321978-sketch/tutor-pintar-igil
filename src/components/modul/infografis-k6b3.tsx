"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { DenahPetak, VisualBentukL, VisualMatriksKubus } from "./kubus-3d";
const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);
export function visualInfografisK6B3A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FFEDD5"><p className="text-center text-lg font-black">Construct</p><Cap>susun unit</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE"><p className="text-center text-lg font-black">Decompose</p><Cap>urai unit</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7"><p className="mb-1 text-center text-sm font-black">Bentuk L · 3 kubus</p><VisualBentukL kecil /><Cap>geser untuk putar</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEF3C7"><p className="text-center text-lg font-black">Layer Count</p><Cap>lantai demi lantai</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FCE7F3"><p className="text-center text-lg font-black">Hidden Support</p><Cap>tidak melayang</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#EDE9FE"><p className="mb-1 text-center text-sm font-black">2×2×2 = 8</p><VisualMatriksKubus matriks={[[2, 2], [2, 2]]} kecil /><Cap>putar cek tersembunyi</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><p className="text-center text-lg font-black">3×3×3</p><Cap>27 satuan</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FFEDD5"><p className="mb-1 text-center text-sm font-black">Tangga 1+2+3</p><VisualMatriksKubus matriks={[[1, 2, 3]]} kecil /><Cap>Hidden Support OK</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#DBEAFE"><p className="text-center text-lg font-black">Putar 3D</p><Cap>geser panggung</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">lanjut B</p><Cap>tampak 3 arah</Cap></KotakPoster>,
  ];
}
export function visualInfografisK6B3B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-lg font-black">Orthographic</p><Cap>3 tampak datar</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><p className="mb-1 text-center text-sm font-black">Height-Matrix</p><VisualMatriksKubus matriks={[[2, 1], [1, 2]]} kecil /><Cap>tinggi per petak</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-lg font-black">Occlusion Max</p><Cap>ambil maksimum</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FCE7F3"><p className="text-center text-lg font-black">Tampak atas</p><Cap>bukan tinggi</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="mb-1 text-center text-sm font-black">Tumpuk 4 → atas 1</p><VisualMatriksKubus matriks={[[4]]} kecil /><Cap>putar ke atas</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-lg font-black">Depan siluet</p><Cap>max kolom</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><p className="text-center text-lg font-black">Samping siluet</p><Cap>max baris</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#DBEAFE"><p className="mb-1 text-center text-sm font-black">Putar 3D</p><VisualMatriksKubus matriks={[[1, 2], [3, 1]]} kecil /><Cap>cek depan/samping/atas</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#DCFCE7"><p className="text-center text-lg font-black">Rekonstruksi</p><Cap>gambar ↔ model</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">lanjut C</p><Cap>lokasi petak</Cap></KotakPoster>,
  ];
}
export function visualInfografisK6B3C(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DCFCE7"><p className="text-center text-lg font-black">Huruf</p><Cap>sumbu vertikal</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE"><p className="text-center text-lg font-black">Angka</p><Cap>sumbu horizontal</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="mb-1 text-center text-sm font-black">C2 · Makassar</p><DenahPetak kolom={["A","B","C"]} baris={[1,2,3]} tanda={[{ huruf: "C", angka: 2, label: "★" }]} /><Cap>titik lokasi</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FCE7F3"><p className="text-center text-lg font-black">Manhattan</p><Cap>|Δh|+|Δa|</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="mb-1 text-center text-sm font-black">A3 → E5 = 6</p><DenahPetak tanda={[{ huruf: "A", angka: 3, label: "P" }, { huruf: "E", angka: 4, label: "Q", warna: "bg-emerald-300 text-emerald-950" }]} /><Cap>bukan diagonal</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-lg font-black">4 arah</p><Cap>bukan diagonal</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><p className="text-center text-lg font-black">Shortest Path</p><Cap>banyak cara</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#DBEAFE"><p className="text-center text-lg font-black">F1→D2</p><Cap>jarak 3</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#DCFCE7"><p className="text-center text-lg font-black">Denah kelas</p><Cap>kursi teman</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">Bab 3 A–C</p><Cap>Materi siap</Cap></KotakPoster>,
  ];
}
