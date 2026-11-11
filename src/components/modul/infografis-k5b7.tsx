"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { SvgSegitiga, SvgBangun } from "./diagram-k4b5";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

export function visualInfografisK5B7A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#FFEDD5">
      <p className="text-center text-lg font-black">Inequality</p>
      <Cap>{"a+b>c"}</Cap>
    </KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE">
      <div className="flex justify-center">
        <SvgSegitiga ciriSudut="lancip" ciriSisi="sembarang" kecil />
      </div>
      <Cap>{"lancip: 3 sudut <90°"}</Cap>
    </KotakPoster>,
    <KotakPoster key="3" warna="#DCFCE7">
      <div className="flex justify-center">
        <SvgSegitiga ciriSudut="siku" ciriSisi="sembarang" kecil />
      </div>
      <Cap>siku-siku: 1 sudut 90°</Cap>
    </KotakPoster>,
    <KotakPoster key="4" warna="#FEF3C7">
      <div className="flex justify-center">
        <SvgSegitiga ciriSudut="tumpul" ciriSisi="sembarang" kecil />
      </div>
      <Cap>{"tumpul: 1 sudut >90°"}</Cap>
    </KotakPoster>,
    <KotakPoster key="5" warna="#FCE7F3">
      <p className="text-center text-lg font-black">Angle Sum</p>
      <Cap>180°</Cap>
    </KotakPoster>,
    <KotakPoster key="6" warna="#EDE9FE">
      <div className="flex justify-center">
        <SvgSegitiga ciriSisi="sama-kaki" ciriSudut="lancip" kecil />
      </div>
      <Cap>sama kaki: 2 sisi sama</Cap>
    </KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2">
      <div className="flex justify-center">
        <SvgSegitiga ciriSisi="sama-sisi" ciriSudut="lancip" kecil />
      </div>
      <Cap>sama sisi: 3 sisi = 60°</Cap>
    </KotakPoster>,
    <KotakPoster key="8" warna="#FFEDD5">
      <div className="flex justify-center">
        <SvgSegitiga ciriSisi="sembarang" ciriSudut="lancip" kecil />
      </div>
      <Cap>sembarang: sisi beda</Cap>
    </KotakPoster>,
    <KotakPoster key="9" warna="#DBEAFE">
      <div className="flex justify-center gap-1">
        <SvgSegitiga ciriSisi="sama-sisi" kecil />
        <span className="self-center text-sm font-black text-[#1C01A5]">⊂</span>
        <SvgSegitiga ciriSisi="sama-kaki" kecil />
      </div>
      <Cap>sama sisi ⊂ sama kaki</Cap>
    </KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3">
      <p className="text-center text-lg font-black">lanjut B</p>
      <Cap>segi empat</Cap>
    </KotakPoster>,
  ];
}

export function visualInfografisK5B7B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#DBEAFE">
      <div className="flex justify-center">
        <SvgBangun jenis="persegi-panjang" kecil />
      </div>
      <Cap>segi empat · 4 sisi</Cap>
    </KotakPoster>,
    <KotakPoster key="2" warna="#DCFCE7">
      <div className="flex justify-center">
        <SvgBangun jenis="trapesium" kecil />
      </div>
      <Cap>trapesium · ≥1 sejajar</Cap>
    </KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7">
      <div className="flex justify-center">
        <SvgBangun jenis="jajargenjang" kecil />
      </div>
      <Cap>jajargenjang · 2 pasang sejajar</Cap>
    </KotakPoster>,
    <KotakPoster key="4" warna="#FCE7F3">
      <div className="flex justify-center">
        <SvgBangun jenis="persegi-panjang" kecil />
      </div>
      <Cap>persegi panjang · 4 siku</Cap>
    </KotakPoster>,
    <KotakPoster key="5" warna="#EDE9FE">
      <div className="flex justify-center">
        <SvgBangun jenis="belah-ketupat" kecil />
      </div>
      <Cap>belah ketupat · 4 sisi sama</Cap>
    </KotakPoster>,
    <KotakPoster key="6" warna="#FFEDD5">
      <div className="flex justify-center">
        <SvgBangun jenis="persegi" kecil />
      </div>
      <Cap>persegi · siku + sama</Cap>
    </KotakPoster>,
    <KotakPoster key="7" warna="#FEE2E2">
      <div className="flex justify-center">
        <SvgBangun jenis="layang-layang" kecil />
      </div>
      <Cap>layang-layang · sisi berurutan</Cap>
    </KotakPoster>,
    <KotakPoster key="8" warna="#DBEAFE">
      <p className="text-center text-lg font-black">hierarki</p>
      <Cap>inklusif</Cap>
    </KotakPoster>,
    <KotakPoster key="9" warna="#DCFCE7">
      <p className="text-center text-lg font-black">Van Hiele</p>
      <Cap>Property Matrix</Cap>
    </KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3">
      <p className="text-center text-lg font-black">Bab 7 A–B</p>
      <Cap>Materi siap</Cap>
    </KotakPoster>,
  ];
}
