"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { MeteranSvg, PenggarisBatang, PenggarisDuaBatang, PenggarisSvg } from "./diagram-k3b3";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 3 (Pengukuran Panjang dan Berat). Gambar saja:  */
/* teks panel dan suara berasal dari naskah-k3b3.ts. Hanya penggaris, batang      */
/* polos, garis meteran, dan angka. Tanpa API.                                    */
/* ------------------------------------------------------------------------ */

const Cap = ({ children, warna = "#1C01A5" }: { children: React.ReactNode; warna?: string }) => (
  <p className="text-center text-[11px] font-black leading-tight" style={{ color: warna }}>
    {children}
  </p>
);

const Chip = ({ children, warna = "#FFE566" }: { children: React.ReactNode; warna?: string }) => (
  <span className="inline-block rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
    {children}
  </span>
);

const Langkah = ({ daftar, warna }: { daftar: string[]; warna: string[] }) => (
  <>
    {daftar.map((t, i) => (
      <div key={t} className={`rounded-xl border-2 border-[#1C01A5] px-2 py-1 text-xs font-black text-[#1C01A5] ${i ? "mt-1" : ""}`} style={{ backgroundColor: warna[i % warna.length] }}>
        {t}
      </div>
    ))}
  </>
);

const Baris = ({ daftar }: { daftar: [string, string][] }) => (
  <div className="space-y-1 text-center text-sm font-black text-[#1C01A5]">
    {daftar.map(([t, warna]) => (
      <p key={t} style={{ color: warna }}>
        {t}
      </p>
    ))}
  </div>
);

const Kecil = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[150px]">{children}</div>;

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK3B3A(): React.ReactNode[] {
  return [
    /* 1 Satuan Tidak Baku */
    <KotakPoster key="1" warna="#FEF9C3">
      <div className="space-y-1 text-center">
        <Chip warna="#FDE68A">1 jengkal</Chip>
        <Chip warna="#FECACA">1 pensil</Chip>
        <Cap>jengkal setiap orang berbeda</Cap>
      </div>
    </KotakPoster>,
    /* 2 Satuan Baku */
    <KotakPoster key="2" warna="#E0E7FF">
      <div className="space-y-1 text-center">
        <Chip warna="#BAE6FD">cm</Chip> <Chip warna="#BBF7D0">m</Chip>
        <Cap>sentimeter dan meter sama untuk semua orang</Cap>
      </div>
    </KotakPoster>,
    /* 3 Penggaris */
    <KotakPoster key="3" warna="#FFF7ED">
      <Kecil>
        <PenggarisSvg maks={8} ringkas label="Penggaris 0 sampai 8 sentimeter" />
      </Kecil>
      <Cap>jarak antar angka 1 cm</Cap>
    </KotakPoster>,
    /* 4 Mulai dari Nol */
    <KotakPoster key="4" warna="#DBEAFE">
      <Kecil>
        <PenggarisBatang panjang={6} maks={8} ringkas />
      </Kecil>
      <Cap>ujung batang di angka 0</Cap>
    </KotakPoster>,
    /* 5 Membaca Panjang */
    <KotakPoster key="5" warna="#DCFCE7">
      <Kecil>
        <PenggarisBatang panjang={7} maks={8} ringkas warna="#60A5FA" />
      </Kecil>
      <Cap warna="#16A34A">panjang batang 7 cm</Cap>
    </KotakPoster>,
    /* 6 Meteran */
    <KotakPoster key="6" warna="#FEE2E2">
      <div className="space-y-1 text-center">
        <p className="text-2xl" aria-hidden="true">
          🧰 🚪 📺
        </p>
        <Cap>meteran untuk benda panjang</Cap>
      </div>
    </KotakPoster>,
    /* 7 Memilih Alat */
    <KotakPoster key="7" warna="#F5F3FF">
      <Baris daftar={[["pensil → penggaris", "#1C01A5"], ["pintu → meteran", "#B45309"], ["meja → meteran", "#B45309"]]} />
    </KotakPoster>,
    /* 8 Ukuran Wajar */
    <KotakPoster key="8" warna="#ECFCCB">
      <Baris daftar={[["pensil ± 15 cm", "#1C01A5"], ["buku tulis ± 30 cm", "#1C01A5"], ["pintu ± 2 m", "#B45309"]]} />
    </KotakPoster>,
    /* 9 Selisih Panjang */
    <KotakPoster key="9" warna="#FCE7F3">
      <Kecil>
        <PenggarisDuaBatang a={9} b={5} maks={10} />
      </Kecil>
      <Cap>9 − 5 = 4 cm</Cap>
    </KotakPoster>,
    /* 10 Cara Mengukur */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Pilih alat ukur", "2. Ujung benda di angka 0", "3. Baca angka ujung lain", "4. Tulis dengan satuan"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

export function visualInfografisK3B3B(): React.ReactNode[] {
  return [
    /* 1 Meteran */
    <KotakPoster key="1" warna="#FCE7F3">
      <Kecil>
        <MeteranSvg cm={100} meter={2} ringkas />
      </Kecil>
      <Cap>mulai dari angka 0</Cap>
    </KotakPoster>,
    /* 2 100 cm = 1 m */
    <KotakPoster key="2" warna="#FEF9C3">
      <div className="space-y-1 text-center">
        <Chip>100 cm = 1 m</Chip>
        <Chip warna="#BAE6FD">2 m = 200 cm</Chip>
      </div>
    </KotakPoster>,
    /* 3 Meter ke Sentimeter */
    <KotakPoster key="3" warna="#DBEAFE">
      <div className="space-y-1 text-center">
        <Chip warna="#FECACA">× 100</Chip>
        <Cap>3 m = 3 × 100 cm = 300 cm</Cap>
      </div>
    </KotakPoster>,
    /* 4 Sentimeter ke Meter */
    <KotakPoster key="4" warna="#DCFCE7">
      <div className="space-y-1 text-center">
        <Chip warna="#BFDBFE">÷ 100</Chip>
        <Cap>700 cm : 100 = 7 m</Cap>
      </div>
    </KotakPoster>,
    /* 5 1 m 17 cm */
    <KotakPoster key="5" warna="#FEE2E2">
      <Baris daftar={[["1 m 17 cm", "#1C01A5"], ["100 cm + 17 cm", "#DC2626"], ["= 117 cm", "#16A34A"]]} />
    </KotakPoster>,
    /* 6 Garis Meteran */
    <KotakPoster key="6" warna="#FFF7ED">
      <Kecil>
        <MeteranSvg cm={200} meter={3} ringkas />
      </Kecil>
      <Cap>batang sampai 2 m = 200 cm</Cap>
    </KotakPoster>,
    /* 7 Menjumlahkan */
    <KotakPoster key="7" warna="#F5F3FF">
      <Baris daftar={[["4 m 37 cm", "#1C01A5"], ["+ 7 m 43 cm", "#1C01A5"], ["= 11 m 80 cm", "#16A34A"]]} />
    </KotakPoster>,
    /* 8 Mengurangkan */
    <KotakPoster key="8" warna="#ECFCCB">
      <Baris daftar={[["75 m 80 cm", "#1C01A5"], ["− 38 m 45 cm", "#DC2626"], ["= 37 m 35 cm", "#16A34A"]]} />
    </KotakPoster>,
    /* 9 Membandingkan */
    <KotakPoster key="9" warna="#FCE7F3">
      <div className="space-y-1 text-center">
        <Chip warna="#BBF7D0">120 cm &gt; 117 cm</Chip>
        <Cap>ubah ke satuan yang sama dulu</Cap>
      </div>
    </KotakPoster>,
    /* 10 Cara Mengubah */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Ingat 1 m = 100 cm", "2. m ke cm: kali 100", "3. cm ke m: bagi 100", "4. Periksa kebalikannya"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}
