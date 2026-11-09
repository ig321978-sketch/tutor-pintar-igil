"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BarisLambang, GambarTurus, KartuTurus, TabelGambar, TabelTurus } from "./diagram-k2b8";
import { BarisIkon, Kumpulan, SemuaKumpulan } from "./dasar-k2b8";
import { DATA } from "./data-k2b8";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 8 (Berbagai Diagram). Gambar saja: teks      */
/* panel dan suara berasal dari naskah-k2b8.ts. Tanpa API.                      */
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

const barisTurus = (set: "buah" | "hewan" | "mainan") => DATA[set].kategori.map((k) => ({ nama: k.nama[0].toUpperCase() + k.nama.slice(1), n: k.n }));
const barisGambarBenda = (set: "bunga" | "kue" | "parsel") =>
  DATA[set].kategori.map((k) => ({ nama: k.nama[0].toUpperCase() + k.nama.slice(1), isi: <BarisIkon ikon={k.ikon} n={k.n} ukuran={17} /> }));

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK2B8A(): React.ReactNode[] {
  return [
    /* 1 Apa Itu Data? */
    <KotakPoster key="1" warna="#FEF9C3">
      <div className="flex justify-center">
        <SemuaKumpulan set="buah" ukuran={16} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip>buah yang dibawa = data</Chip>
      </div>
    </KotakPoster>,
    /* 2 Mengelompokkan Data */
    <KotakPoster key="2" warna="#DBEAFE">
      <div className="grid grid-cols-4 gap-1">
        {DATA.buah.kategori.map((k) => (
          <div key={k.id} className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-[#1C01A5] bg-white px-0.5 py-1">
            <Kumpulan ikon={k.ikon} n={k.n} ukuran={13} />
            <span className="text-[10px] font-black text-[#1C01A5]">{k.nama}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-1">
        <Chip warna="#BBF7D0">kelompokkan, lalu hitung</Chip>
      </div>
    </KotakPoster>,
    /* 3 Tanda Turus */
    <KotakPoster key="3" warna="#FEF3C7">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="space-y-0.5">
            <KartuTurus n={n} kecil />
            <Cap>{n} benda</Cap>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-1">
        <Chip>1 garis = 1 benda</Chip>
      </div>
    </KotakPoster>,
    /* 4 Kelompok Lima */
    <KotakPoster key="4" warna="#F0FDF4">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0.5">
          <KartuTurus n={5} />
          <Cap>5 = empat garis + coret</Cap>
        </div>
        <div className="space-y-0.5">
          <KartuTurus n={10} />
          <Cap>10 = dua kelompok lima</Cap>
        </div>
      </div>
    </KotakPoster>,
    /* 5 Turus Buah Kesukaan */
    <KotakPoster key="5" warna="#EEF2FF">
      <TabelTurus judul="Diagram Turus Buah Kesukaan" kolom={["Nama Buah", "Turus", "Banyak Anak"]} baris={barisTurus("buah")} kecil />
    </KotakPoster>,
    /* 6 Turus Hewan Ternak */
    <KotakPoster key="6" warna="#FFF7ED">
      <TabelTurus judul="Diagram Turus Hewan Ternak" kolom={["Nama Hewan", "Turus", "Banyak"]} baris={barisTurus("hewan")} kecil />
    </KotakPoster>,
    /* 7 Membaca Diagram Turus */
    <KotakPoster key="7" warna="#E0F2FE">
      <TabelTurus judul="Diagram Turus Mainan Kesukaan" kolom={["Mainan", "Turus", "Banyak"]} baris={barisTurus("mainan")} kecil />
      <div className="flex flex-wrap justify-center gap-1 pt-1">
        <Chip warna="#BBF7D0">terpanjang: paling banyak</Chip>
        <Chip warna="#FECACA">terpendek: paling sedikit</Chip>
      </div>
    </KotakPoster>,
    /* 8 Lebihnya dan Kurangnya */
    <KotakPoster key="8" warna="#FCE7F3">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0.5">
          <KartuTurus n={10} kecil />
          <Cap>ayam 10</Cap>
        </div>
        <div className="space-y-0.5">
          <KartuTurus n={11} kecil />
          <Cap>bebek 11</Cap>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-1 pt-1">
        <Chip warna="#BBF7D0">bebek 1 lebihnya</Chip>
        <Chip warna="#FECACA">ayam 1 kurangnya</Chip>
      </div>
    </KotakPoster>,
    /* 9 Cara Membuat Diagram Turus */
    <KotakPoster key="9" warna="#F0FDF4">
      <Langkah daftar={["1. Kelompokkan data", "2. Tulis 1 garis untuk 1 benda", "3. Kelompokkan setiap lima turus", "4. Tulis banyaknya"]} warna={["#FFFFFF", "#FDE68A", "#BAE6FD", "#BBF7D0"]} />
    </KotakPoster>,
    /* 10 Pentingnya Makan Buah */
    <KotakPoster key="10" warna="#ECFCCB">
      <div className="grid grid-cols-2 gap-1.5">
        {[["🍊", "sumber vitamin"], ["💧", "sumber air"], ["🌿", "obat luar"], ["🛡️", "cegah penyakit"]].map(([e, t]) => (
          <div key={t} className="flex items-center gap-1 rounded-xl border-2 border-[#1C01A5] bg-white px-1.5 py-1">
            <span className="text-xl" aria-hidden="true">
              {e}
            </span>
            <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{t}</span>
          </div>
        ))}
      </div>
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

export function visualInfografisK2B8B(): React.ReactNode[] {
  const buah = DATA.buah.kategori;
  return [
    /* 1 Dari Turus ke Gambar */
    <KotakPoster key="1" warna="#FEF9C3">
      <div className="flex items-center justify-center gap-2">
        <KartuTurus n={6} kecil />
        <span className="text-2xl font-black text-[#1C01A5]">→</span>
        <div className="max-w-[118px]">
          <BarisLambang n={6} jenis="bintang" warna="#F59E0B" ukuran={18} />
        </div>
      </div>
      <div className="flex justify-center pt-1">
        <Chip>data sama, bentuk berbeda</Chip>
      </div>
    </KotakPoster>,
    /* 2 Bintang Mewakili Satu */
    <KotakPoster key="2" warna="#DBEAFE">
      <div className="flex items-center justify-center gap-2">
        <BarisLambang n={2} jenis="bintang" warna="#38BDF8" ukuran={22} />
        <span className="text-sm font-black text-[#1C01A5]">= 2 anggur</span>
      </div>
      <div className="flex justify-center pt-1">
        <Chip warna="#BBF7D0">1 bintang = 1 buah</Chip>
      </div>
    </KotakPoster>,
    /* 3 Diagram Gambar Buah */
    <KotakPoster key="3" warna="#EEF2FF">
      <TabelGambar judul="Diagram Gambar Buah Kesukaan" kolom={["Buah", "Banyak Anak"]} baris={buah.map((k) => ({ nama: k.nama[0].toUpperCase() + k.nama.slice(1), isi: <BarisLambang n={k.n} jenis="bintang" warna={k.warna} ukuran={17} /> }))} />
    </KotakPoster>,
    /* 4 Gambar Lain Boleh */
    <KotakPoster key="4" warna="#FCE7F3">
      <div className="space-y-1">
        <BarisLambang n={4} jenis="bintang" warna="#F59E0B" ukuran={22} kelas="justify-center" />
        <BarisLambang n={4} jenis="lingkaran" warna="#F43F5E" ukuran={22} kelas="justify-center" />
        <BarisLambang n={4} jenis="hati" warna="#A78BFA" ukuran={22} kelas="justify-center" />
        <BarisLambang n={4} jenis="senyum" warna="#FACC15" ukuran={22} kelas="justify-center" />
      </div>
    </KotakPoster>,
    /* 5 Diagram Gambar Bunga */
    <KotakPoster key="5" warna="#FEF3C7">
      <TabelGambar judul="Diagram Gambar Banyak Bunga" kolom={["Bunga", "Banyak Bunga"]} baris={barisGambarBenda("bunga")} />
    </KotakPoster>,
    /* 6 Cara Membuat Diagram Gambar */
    <KotakPoster key="6" warna="#F0FDF4">
      <Langkah daftar={["1. Hitung data tiap jenis", "2. Tulis nama jenis", "3. Gambar lambang sebanyak data", "4. Tulis judul dan keterangan"]} warna={["#FFFFFF", "#FDE68A", "#BAE6FD", "#BBF7D0"]} />
    </KotakPoster>,
    /* 7 Membaca Diagram Gambar */
    <KotakPoster key="7" warna="#E0F2FE">
      <TabelGambar judul="Diagram Gambar Kue Kesukaan" kolom={["Kue", "Banyak Anak"]} baris={barisGambarBenda("kue")} />
      <div className="flex justify-center pt-1">
        <Chip warna="#BBF7D0">baris terpanjang: paling banyak</Chip>
      </div>
    </KotakPoster>,
    /* 8 Turus dan Gambar Berdampingan */
    <KotakPoster key="8" warna="#FFF7ED">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0.5">
          <div className="flex justify-center">
            <GambarTurus n={6} tinggi={34} />
          </div>
          <Cap>turus: jeruk 6</Cap>
        </div>
        <div className="space-y-0.5">
          <div className="flex justify-center">
            <BarisLambang n={6} jenis="bintang" warna="#F59E0B" ukuran={17} kelas="max-w-[110px] justify-center" />
          </div>
          <Cap>gambar: jeruk 6</Cap>
        </div>
      </div>
    </KotakPoster>,
    /* 9 Menjumlahkan Data */
    <KotakPoster key="9" warna="#ECFCCB">
      <TabelGambar judul="Diagram Gambar Buah dalam Parsel" kolom={["Buah", "Banyak Buah"]} baris={barisGambarBenda("parsel")} />
      <div className="flex flex-wrap justify-center gap-1 pt-1">
        <Chip>apel + jeruk = 7</Chip>
        <Chip warna="#BAE6FD">semua = 15</Chip>
      </div>
    </KotakPoster>,
    /* 10 Mempresentasikan Data */
    <KotakPoster key="10" warna="#F0FDF4">
      <Langkah daftar={["1. Sebutkan judul diagram", "2. Ceritakan paling banyak dan sedikit", "3. Ceritakan lebihnya dan kurangnya"]} warna={["#FFFFFF", "#FDE68A", "#BBF7D0"]} />
    </KotakPoster>,
  ];
}
