"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BangunSvg, JenisGarisSvg, RuasPenggaris } from "./diagram-k3b4";
import { BusurSvg, SudutSvg } from "./diagram-k3b4b";
import { BangunSederhanaSvg, PetakSvg } from "./diagram-k3b4c";
import { SJ, TL } from "./data-k3b4";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 4 (Unsur-Unsur Bangun Datar). Gambar saja: teks  */
/* panel dan suara berasal dari naskah-k3b4.ts. Hanya garis, titik, huruf, dan     */
/* bangun datar polos. Tanpa API.                                                 */
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

export function visualInfografisK3B4A(): React.ReactNode[] {
  return [
    /* 1 Titik dan Garis */
    <KotakPoster key="1" warna="#E0E7FF">
      <div className="space-y-1 text-center">
        <Chip warna="#FECACA">titik</Chip> <Chip warna="#BAE6FD">garis lurus</Chip> <Chip warna="#BBF7D0">kurva</Chip>
        <Cap>garis dibuat dari titik-titik</Cap>
      </div>
    </KotakPoster>,
    /* 2 Sinar Garis */
    <KotakPoster key="2" warna="#FEF9C3">
      <Kecil>
        <JenisGarisSvg g={{ jenis: "sinar", a: "A", b: "B" }} ringkas />
      </Kecil>
      <Cap>sinar garis AB: satu sisi</Cap>
    </KotakPoster>,
    /* 3 Garis */
    <KotakPoster key="3" warna="#DBEAFE">
      <Kecil>
        <JenisGarisSvg g={{ jenis: "garis", a: "C", b: "D" }} ringkas />
      </Kecil>
      <Cap>garis CD: kedua sisi</Cap>
    </KotakPoster>,
    /* 4 Ruas Garis */
    <KotakPoster key="4" warna="#DCFCE7">
      <Kecil>
        <JenisGarisSvg g={{ jenis: "ruas", a: "K", b: "L" }} ringkas />
      </Kecil>
      <Cap>ruas garis KL: panjang tetap</Cap>
    </KotakPoster>,
    /* 5 Kurva */
    <KotakPoster key="5" warna="#FEE2E2">
      <Kecil>
        <JenisGarisSvg g={{ jenis: "kurva", a: "E", b: "F", v: 0 }} ringkas />
      </Kecil>
      <Cap>kurva: garis lengkung</Cap>
    </KotakPoster>,
    /* 6 Dua Titik */
    <KotakPoster key="6" warna="#FFF7ED">
      <Baris daftar={[["satu ruas garis lurus", "#16A34A"], ["banyak kurva", "#B45309"]]} />
    </KotakPoster>,
    /* 7 Satuan cm dan mm */
    <KotakPoster key="7" warna="#F5F3FF">
      <div className="space-y-1 text-center">
        <Chip>1 cm = 10 mm</Chip>
        <Cap>5 mm = 0,5 cm</Cap>
      </div>
    </KotakPoster>,
    /* 8 Mengukur Ruas Garis */
    <KotakPoster key="8" warna="#ECFCCB">
      <Kecil>
        <RuasPenggaris mm={55} maks={8} ringkas />
      </Kecil>
      <Cap>AB = 5 cm 5 mm = 5,5 cm</Cap>
    </KotakPoster>,
    /* 9 Sisi */
    <KotakPoster key="9" warna="#FCE7F3">
      <Kecil>
        <BangunSvg n={3} huruf={["E", "F", "G"]} ringkas />
      </Kecil>
      <Cap>segitiga EFG: 3 sisi</Cap>
    </KotakPoster>,
    /* 10 Cara Mengukur */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Angka 0 di titik awal", "2. Lihat titik akhir", "3. Baca cm dan mm", "4. Tulis dengan satuan"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

const DuaKolom = ({ kiri, kanan }: { kiri: React.ReactNode; kanan: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-1">
    <div>{kiri}</div>
    <div>{kanan}</div>
  </div>
);

export function visualInfografisK3B4B(): React.ReactNode[] {
  return [
    /* 1 Sudut */
    <KotakPoster key="1" warna="#E0E7FF">
      <Kecil>
        <SudutSvg deg={60} />
      </Kecil>
      <Cap>dua garis bertemu di satu titik</Cap>
    </KotakPoster>,
    /* 2 Titik Sudut dan Kaki */
    <KotakPoster key="2" warna="#FEF9C3">
      <Kecil>
        <SudutSvg deg={55} huruf={["A", "O", "B"]} />
      </Kecil>
      <Cap>O titik sudut, OA dan OB kaki</Cap>
    </KotakPoster>,
    /* 3 Membandingkan Sudut */
    <KotakPoster key="3" warna="#DBEAFE">
      <DuaKolom
        kiri={
          <>
            <SudutSvg deg={30} ringkas />
            <Cap>lebih kecil</Cap>
          </>
        }
        kanan={
          <>
            <SudutSvg deg={100} ringkas />
            <Cap>lebih besar</Cap>
          </>
        }
      />
    </KotakPoster>,
    /* 4 Sudut Siku-siku */
    <KotakPoster key="4" warna="#DCFCE7">
      <Kecil>
        <SudutSvg deg={90} />
      </Kecil>
      <Cap>sudut siku-siku: tepat 90°</Cap>
    </KotakPoster>,
    /* 5 Satuan Sudut */
    <KotakPoster key="5" warna="#FEE2E2">
      <Baris daftar={[["satuan besar: 3 satuan", "#B45309"], ["satuan kecil: 6 satuan", "#16A34A"]]} />
      <Cap>sudutnya sama</Cap>
    </KotakPoster>,
    /* 6 Busur Derajat */
    <KotakPoster key="6" warna="#FFF7ED">
      <BusurSvg deg={50} huruf={false} />
      <Cap>baca derajatnya</Cap>
    </KotakPoster>,
    /* 7 Lancip dan Tumpul */
    <KotakPoster key="7" warna="#F5F3FF">
      <DuaKolom
        kiri={
          <>
            <SudutSvg deg={45} ringkas />
            <Cap>lancip</Cap>
          </>
        }
        kanan={
          <>
            <SudutSvg deg={130} ringkas />
            <Cap>tumpul</Cap>
          </>
        }
      />
    </KotakPoster>,
    /* 8 Sudut Lurus */
    <KotakPoster key="8" warna="#ECFCCB">
      <Kecil>
        <SudutSvg deg={180} />
      </Kecil>
      <Cap>sudut lurus: tepat 180°</Cap>
    </KotakPoster>,
    /* 9 Sudut Refleks */
    <KotakPoster key="9" warna="#FCE7F3">
      <Kecil>
        <SudutSvg deg={300} />
      </Kecil>
      <Cap>refleks: 180° sampai 360°</Cap>
    </KotakPoster>,
    /* 10 Cara Mengukur Sudut */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Titik tengah di titik sudut", "2. Kaki pertama di garis nol", "3. Lihat kaki kedua", "4. Baca derajatnya"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab C                                                                */
/* ====================================================================== */

export function visualInfografisK3B4C(): React.ReactNode[] {
  return [
    /* 1 Bertemu dan Tidak Bertemu */
    <KotakPoster key="1" warna="#E0E7FF">
      <DuaKolom
        kiri={
          <>
            <PetakSvg pasang={TL[1]} ringkas tanda={false} />
            <Cap>bertemu</Cap>
          </>
        }
        kanan={
          <>
            <PetakSvg pasang={SJ[0]} ringkas tanda={false} />
            <Cap>tidak bertemu</Cap>
          </>
        }
      />
    </KotakPoster>,
    /* 2 Garis Tegak Lurus */
    <KotakPoster key="2" warna="#FEF9C3">
      <Kecil>
        <PetakSvg pasang={TL[0]} />
      </Kecil>
      <Cap>bertemu di sudut siku-siku</Cap>
    </KotakPoster>,
    /* 3 Lambang Tegak Lurus */
    <KotakPoster key="3" warna="#DBEAFE">
      <div className="space-y-1 text-center">
        <Chip warna="#FDE68A">AB ⊥ BC</Chip>
        <Cap>dibaca AB tegak lurus BC</Cap>
      </div>
    </KotakPoster>,
    /* 4 Kertas Lipat */
    <KotakPoster key="4" warna="#DCFCE7">
      <Baris daftar={[["lipat dua kali", "#B45309"], ["pojok kertas = siku-siku", "#16A34A"]]} />
    </KotakPoster>,
    /* 5 Garis Sejajar */
    <KotakPoster key="5" warna="#FEE2E2">
      <Kecil>
        <PetakSvg pasang={SJ[0]} />
      </Kecil>
      <Cap>jarak sama, tidak bertemu</Cap>
    </KotakPoster>,
    /* 6 Lambang Sejajar */
    <KotakPoster key="6" warna="#FFF7ED">
      <div className="space-y-1 text-center">
        <Chip warna="#BBF7D0">AB // CD</Chip>
        <Cap>dibaca AB sejajar CD</Cap>
      </div>
    </KotakPoster>,
    /* 7 Segitiga */
    <KotakPoster key="7" warna="#F5F3FF">
      <Kecil>
        <BangunSederhanaSvg jenis="segitiga" huruf />
      </Kecil>
      <Cap>3 sisi, 3 sudut</Cap>
    </KotakPoster>,
    /* 8 Persegi dan Persegi Panjang */
    <KotakPoster key="8" warna="#ECFCCB">
      <DuaKolom
        kiri={
          <>
            <BangunSederhanaSvg jenis="persegi" ringkas />
            <Cap>persegi</Cap>
          </>
        }
        kanan={
          <>
            <BangunSederhanaSvg jenis="persegi panjang" ringkas />
            <Cap>persegi panjang</Cap>
          </>
        }
      />
    </KotakPoster>,
    /* 9 Lingkaran */
    <KotakPoster key="9" warna="#FCE7F3">
      <Kecil>
        <BangunSederhanaSvg jenis="lingkaran" />
      </Kecil>
      <Cap>garis lengkung, tanpa sudut</Cap>
    </KotakPoster>,
    /* 10 Cara Memeriksa Garis */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Lipat kertas dua kali", "2. Pojok di pertemuan garis", "3. Lihat apakah pas", "4. Pas: tegak lurus"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}
