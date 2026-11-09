"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BaganGabung, BaganKM, KalimatBesar } from "./diagram-k3b2";
import { M, P } from "./data-k3b2";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 2 (Kalimat Matematika). Gambar saja: teks    */
/* panel dan suara berasal dari naskah-k3b2.ts. Hanya bagan batang dan angka,    */
/* tanpa gambar benda. Tanpa API.                                               */
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

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK3B2A(): React.ReactNode[] {
  return [
    /* 1 Kalimat Matematika */
    <KotakPoster key="1" warna="#E0E7FF">
      <div className="space-y-1 text-center">
        <Chip>30 + … = 50</Chip>
        <Cap>titik-titik menunjukkan bilangan yang belum diketahui</Cap>
      </div>
    </KotakPoster>,
    /* 2 Bilangan Belum Diketahui */
    <KotakPoster key="2" warna="#FEF9C3">
      <div className="space-y-1 text-center">
        <Chip warna="#BAE6FD">… + 16 = 54</Chip>
        <Chip warna="#BBF7D0">30 + … = 50</Chip>
        <Cap>boleh di depan atau di tengah kalimat</Cap>
      </div>
    </KotakPoster>,
    /* 3 Tiga Puluh Tambah Titik-Titik */
    <KotakPoster key="3" warna="#DBEAFE">
      <KalimatBesar p={P(30, 20, "y")} kecil />
      <Cap>Galih 30, Andi belum diketahui, jumlah 50</Cap>
    </KotakPoster>,
    /* 4 Bagan Jumlah */
    <KotakPoster key="4" warna="#DCFCE7">
      <div className="flex justify-center">
        <BaganKM p={P(30, 20, "y")} />
      </div>
    </KotakPoster>,
    /* 5 Jumlah Dikurangi Bagian */
    <KotakPoster key="5" warna="#FEE2E2">
      <div className="space-y-1 text-center">
        <Chip>50 − 30 = 20</Chip>
        <Cap>jumlah dikurangi bagian yang diketahui</Cap>
      </div>
    </KotakPoster>,
    /* 6 Delapan Tambah Titik-Titik */
    <KotakPoster key="6" warna="#FFF7ED">
      <Baris daftar={[["8 + … = 19", "#1C01A5"], ["19 − 8 = 11", "#DC2626"], ["8 + 11 = 19", "#16A34A"]]} />
    </KotakPoster>,
    /* 7 Titik-Titik Tambah Enam Belas */
    <KotakPoster key="7" warna="#F5F3FF">
      <Baris daftar={[["… + 16 = 54", "#1C01A5"], ["54 − 16 = 38", "#DC2626"], ["38 + 16 = 54", "#16A34A"]]} />
    </KotakPoster>,
    /* 8 Memeriksa */
    <KotakPoster key="8" warna="#ECFCCB">
      <div className="space-y-1 text-center">
        <Chip warna="#BBF7D0">30 + 20 = 50</Chip>
        <Cap>jumlahnya sama dengan jumlah semula</Cap>
      </div>
    </KotakPoster>,
    /* 9 Banyak Kemungkinan */
    <KotakPoster key="9" warna="#FCE7F3">
      <div className="flex flex-col items-center gap-1">
        <BaganGabung a={60} b={40} />
        <BaganGabung a={75} b={25} />
        <Cap>semuanya berjumlah 100</Cap>
      </div>
    </KotakPoster>,
    /* 10 Cara Mengisi */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Baca kalimat Matematika", "2. Lihat bilangan yang diketahui", "3. Kurangkan jumlah dengan bilangan itu", "4. Periksa dengan menjumlahkan"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

export function visualInfografisK3B2B(): React.ReactNode[] {
  return [
    /* 1 Kalimat Matematika */
    <KotakPoster key="1" warna="#FCE7F3">
      <div className="space-y-1 text-center">
        <Chip>80 − … = 45</Chip>
        <Cap>titik-titik menunjukkan bilangan yang belum diketahui</Cap>
      </div>
    </KotakPoster>,
    /* 2 Mencari yang Dikurangkan */
    <KotakPoster key="2" warna="#FEF9C3">
      <div className="space-y-1 text-center">
        <Chip warna="#BAE6FD">80 − … = 45</Chip>
        <Cap>kurangi bilangan awal dengan sisanya</Cap>
      </div>
    </KotakPoster>,
    /* 3 Delapan Puluh Kurang Titik-Titik */
    <KotakPoster key="3" warna="#DBEAFE">
      <KalimatBesar p={M(80, 35, "y")} kecil />
      <Cap>80 ayam, sisa 45, yang dijual belum diketahui</Cap>
    </KotakPoster>,
    /* 4 Bagan Pengurangan */
    <KotakPoster key="4" warna="#DCFCE7">
      <div className="flex justify-center">
        <BaganKM p={M(80, 35, "y")} />
      </div>
    </KotakPoster>,
    /* 5 Awal Dikurangi Sisa */
    <KotakPoster key="5" warna="#FEE2E2">
      <div className="space-y-1 text-center">
        <Chip>80 − 45 = 35</Chip>
        <Cap>bilangan awal dikurangi sisa</Cap>
      </div>
    </KotakPoster>,
    /* 6 Titik-Titik Kurang Empat Puluh Lima */
    <KotakPoster key="6" warna="#FFF7ED">
      <KalimatBesar p={M(72, 45, "x")} kecil />
      <Cap>bilangan awal belum diketahui</Cap>
    </KotakPoster>,
    /* 7 Awal Sama dengan Dikurangkan Tambah Sisa */
    <KotakPoster key="7" warna="#F5F3FF">
      <div className="flex flex-col items-center gap-1">
        <BaganKM p={M(72, 45, "x")} />
        <Chip warna="#BBF7D0">45 + 27 = 72</Chip>
      </div>
    </KotakPoster>,
    /* 8 Memeriksa */
    <KotakPoster key="8" warna="#ECFCCB">
      <div className="space-y-1 text-center">
        <Chip warna="#BBF7D0">72 − 45 = 27</Chip>
        <Cap>hasilnya sama dengan sisa semula</Cap>
      </div>
    </KotakPoster>,
    /* 9 Banyak Kemungkinan */
    <KotakPoster key="9" warna="#FCE7F3">
      <div className="flex flex-col items-center gap-1">
        <BaganGabung a={45} b={55} />
        <BaganGabung a={60} b={40} />
        <Cap>terjual ditambah sisa sama dengan 100</Cap>
      </div>
    </KotakPoster>,
    /* 10 Cara Mengisi */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Baca kalimat Matematika", "2. Lihat letak titik-titik", "3. Kurangkan atau tambahkan", "4. Periksa dengan mengurangkan lagi"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}
