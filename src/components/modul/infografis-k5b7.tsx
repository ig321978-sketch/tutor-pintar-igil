"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);
export function visualInfografisK5B7A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FFEDD5"><p className="text-center text-lg font-black">Inequality</p><Cap>{"a+b>c"}</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE"><p className="text-center text-lg font-black">lancip</p><Cap>{"3 sudut <90°"}</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7"><p className="text-center text-lg font-black">siku-siku</p><Cap>1 sudut 90°</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FEF3C7"><p className="text-center text-lg font-black">tumpul</p><Cap>{"1 sudut >90°"}</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#FCE7F3"><p className="text-center text-lg font-black">Angle Sum</p><Cap>180°</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#EDE9FE"><p className="text-center text-lg font-black">sama kaki</p><Cap>2 sisi sama</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><p className="text-center text-lg font-black">sama sisi</p><Cap>3 sisi = 60°</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#FFEDD5"><p className="text-center text-lg font-black">sembarang</p><Cap>sisi beda</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#DBEAFE"><p className="text-center text-lg font-black">Inclusive</p><Cap>sama sisi ⊂ sama kaki</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">lanjut B</p><Cap>segi empat</Cap></KotakPoster>,
  ];
}
export function visualInfografisK5B7B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE"><p className="text-center text-lg font-black">segi empat</p><Cap>4 sisi</Cap></KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7"><p className="text-center text-lg font-black">trapesium</p><Cap>≥1 sejajar</Cap></KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7"><p className="text-center text-lg font-black">jajargenjang</p><Cap>2 pasang sejajar</Cap></KotakPoster>,
    <KotakPoster key="4" warna="#FCE7F3"><p className="text-center text-lg font-black">persegi panjang</p><Cap>4 siku</Cap></KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE"><p className="text-center text-lg font-black">belah ketupat</p><Cap>4 sisi sama</Cap></KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5"><p className="text-center text-lg font-black">persegi</p><Cap>siku + sama</Cap></KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2"><p className="text-center text-lg font-black">layang-layang</p><Cap>sisi berurutan</Cap></KotakPoster>,
    <KotakPoster key="8" warna="#DBEAFE"><p className="text-center text-lg font-black">hierarki</p><Cap>inklusif</Cap></KotakPoster>,
    <KotakPoster key="9" warna="#DCFCE7"><p className="text-center text-lg font-black">Van Hiele</p><Cap>Property Matrix</Cap></KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3"><p className="text-center text-lg font-black">Bab 7 A–B</p><Cap>Materi siap</Cap></KotakPoster>,
  ];
}
