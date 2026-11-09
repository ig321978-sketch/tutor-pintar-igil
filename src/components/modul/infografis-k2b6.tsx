"use client";

import React from "react";
import { KotakPoster, TabelPoster } from "./kit-k2b2";
import { BendaB6, NeracaBenda, Tumpukan } from "./dasar-k2b6";
import { JamMuka } from "./diagram-k2b6";
import { digital } from "./data-k2b6";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 6 (Pengukuran: Berat dan Waktu). Gambar     */
/* saja: teks panel dan suara berasal dari naskah-k2b6.ts. Semua dari SVG,     */
/* emoji, dan komponen neraca atau jam. Tanpa API.                            */
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

const Ubin = ({ children, ket, warna }: { children: React.ReactNode; ket?: React.ReactNode; warna?: string }) => (
  <KotakPoster warna={warna}>
    <div className="flex justify-center">{children}</div>
    {ket ? <Cap>{ket}</Cap> : null}
  </KotakPoster>
);

const Mini = ({ children }: { children: React.ReactNode }) => <div className="w-full max-w-[150px]">{children}</div>;

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK2B6A(): React.ReactNode[] {
  return [
    /* 1 Tiga Cara Menimbang */
    <div key="1" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="jungkat-jungkit" warna="#FEF3C7">
        <Mini>
          <NeracaBenda miring={-1} kiri={<BendaB6 id="apel" ukuran={26} />} kanan={<BendaB6 id="anggur" ukuran={22} />} label="Jungkat-jungkit: apel turun, anggur naik" />
        </Mini>
      </Ubin>
      <Ubin ket="gantungan baju" warna="#E0F2FE">
        <Mini>
          <NeracaBenda varian="gantung" miring={-1} kiri={<BendaB6 id="semangka" ukuran={26} />} kanan={<BendaB6 id="apel" ukuran={22} />} label="Gantungan baju: semangka turun" />
        </Mini>
      </Ubin>
      <Ubin ket="kedua tangan" warna="#FCE7F3">
        <span className="text-6xl leading-none" role="img" aria-label="Dua tangan">
          🤲
        </span>
      </Ubin>
    </div>,
    /* 2 Posisi pada Timbangan */
    <KotakPoster key="2" warna="#FEF3C7">
      <div className="flex justify-center">
        <NeracaBenda miring={-1} kiri={<BendaB6 id="apel" ukuran={38} />} kanan={<BendaB6 id="anggur" ukuran={30} />} label="Apel lebih berat, posisinya lebih bawah" kelas="max-w-[230px]" />
      </div>
      <div className="flex justify-center gap-2 pt-1">
        <Chip warna="#FDE68A">berat: lebih bawah</Chip>
        <Chip warna="#BAE6FD">ringan: lebih atas</Chip>
      </div>
    </KotakPoster>,
    /* 3 Tiga Kata Perbandingan */
    <div key="3" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="lebih berat" warna="#FDE68A">
        <Mini>
          <NeracaBenda miring={-1} kiri={<BendaB6 id="apel" ukuran={24} />} kanan={<BendaB6 id="anggur" ukuran={18} />} label="Apel lebih berat dari anggur" />
        </Mini>
      </Ubin>
      <Ubin ket="lebih ringan" warna="#BAE6FD">
        <Mini>
          <NeracaBenda miring={1} kiri={<BendaB6 id="anggur" ukuran={18} />} kanan={<BendaB6 id="apel" ukuran={24} />} label="Anggur lebih ringan dari apel" />
        </Mini>
      </Ubin>
      <Ubin ket="sama berat" warna="#BBF7D0">
        <Mini>
          <NeracaBenda miring={0} kiri={<BendaB6 id="jeruk" ukuran={24} />} kanan={<BendaB6 id="apel" ukuran={24} />} label="Jeruk sama berat dengan apel" />
        </Mini>
      </Ubin>
    </div>,
    /* 4 Paling Berat dan Paling Ringan */
    <KotakPoster key="4" warna="#F0FDF4">
      <div className="flex items-end justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <BendaB6 id="semangka" ukuran={56} />
          <Chip warna="#FDE68A">paling berat</Chip>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BendaB6 id="apel" ukuran={38} />
          <Chip warna="#FFFFFF">di tengah</Chip>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BendaB6 id="anggur" ukuran={26} />
          <Chip warna="#BAE6FD">paling ringan</Chip>
        </div>
      </div>
    </KotakPoster>,
    /* 5 Besar Belum Tentu Berat */
    <div key="5" className="grid grid-cols-2 gap-2">
      <Ubin ket="besar, tetapi ringan" warna="#E0F2FE">
        <span className="text-6xl leading-none" role="img" aria-label="Balon besar">
          🎈
        </span>
      </Ubin>
      <Ubin ket="kecil, tetapi berat" warna="#FEF3C7">
        <svg viewBox="0 0 40 40" className="h-14 w-14" role="img" aria-label="Batu kecil">
          <path d="M8 30 Q6 18 16 12 Q26 8 32 18 Q36 28 28 32 Q18 36 8 30 Z" fill="#9CA3AF" stroke="#374151" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M14 20 Q18 16 22 18" stroke="#E5E7EB" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
      </Ubin>
    </div>,
    /* 6 Empat Satuan Tidak Baku */
    <div key="6" className="grid grid-cols-4 gap-1.5">
      {(["balok", "kelereng", "koin", "bolaTenis"] as const).map((id, i) => (
        <Ubin key={id} ket={["mainan balok", "kelereng", "koin", "bola tenis"][i]} warna={["#FEF3C7", "#DBEAFE", "#FEF9C3", "#DCFCE7"][i]}>
          <BendaB6 id={id} ukuran={40} />
        </Ubin>
      ))}
    </div>,
    /* 7 Cara Mengukur Berat */
    <KotakPoster key="7" warna="#FEF3C7">
      <div className="grid grid-cols-2 gap-1.5">
        {["1. Tebak dulu", "2. Taruh satuan satu per satu", "3. Berhenti saat seimbang", "4. Tulis hasilnya"].map((t, i) => (
          <div key={t} className="rounded-xl border-2 border-[#1C01A5] px-1.5 py-1 text-xs font-black leading-tight text-[#1C01A5]" style={{ backgroundColor: ["#FFFFFF", "#FDE68A", "#BBF7D0", "#E0E7FF"][i] }}>
            {t}
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-1">
        <NeracaBenda miring={0} kiri={<BendaB6 id="boneka" ukuran={34} />} kanan={<Tumpukan id="bolaTenis" n={4} />} label="Boneka seimbang dengan empat bola tenis" kelas="max-w-[220px]" />
      </div>
    </KotakPoster>,
    /* 8 Satu Boneka, Dua Hasil */
    <div key="8" className="grid grid-cols-2 gap-2">
      <Ubin ket="1 boneka = 4 bola tenis" warna="#DCFCE7">
        <Mini>
          <NeracaBenda miring={0} kiri={<BendaB6 id="boneka" ukuran={28} />} kanan={<Tumpukan id="bolaTenis" n={4} />} label="Boneka sama dengan empat bola tenis" />
        </Mini>
      </Ubin>
      <Ubin ket="1 boneka = 10 kelereng" warna="#DBEAFE">
        <Mini>
          <NeracaBenda miring={0} kiri={<BendaB6 id="boneka" ukuran={28} />} kanan={<Tumpukan id="kelereng" n={10} />} label="Boneka sama dengan sepuluh kelereng" />
        </Mini>
      </Ubin>
    </div>,
    /* 9 Satuan Ringan, Hitungan Banyak */
    <KotakPoster key="9" warna="#F0FDF4">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1 rounded-xl border-2 border-[#1C01A5] bg-white px-1.5 py-1">
          <div className="flex flex-wrap justify-center">
            <Tumpukan id="bolaTenis" n={4} />
          </div>
          <Cap>bola tenis lebih berat: 4</Cap>
        </div>
        <div className="space-y-1 rounded-xl border-2 border-[#1C01A5] bg-white px-1.5 py-1">
          <div className="flex flex-wrap justify-center">
            <Tumpukan id="kelereng" n={10} />
          </div>
          <Cap>kelereng lebih ringan: 10</Cap>
        </div>
      </div>
    </KotakPoster>,
    /* 10 Rantai Perbandingan */
    <KotakPoster key="10" warna="#FEF3C7">
      {[
        ["pepaya", 1, "mangga", 2],
        ["mangga", 1, "manggis", 2],
        ["pepaya", 1, "manggis", 4],
      ].map(([a, na, b, nb], i) => (
        <div key={i} className={`flex items-center justify-center gap-1.5 rounded-xl px-1 py-1 ${i === 2 ? "bg-[#FFE566]" : "bg-white"} ${i ? "mt-1" : ""}`}>
          <span className="text-sm font-black text-[#1C01A5]">{na as number}</span>
          <BendaB6 id={a as "pepaya"} ukuran={30} />
          <span className="text-lg font-black text-[#1C01A5]">=</span>
          <span className="text-sm font-black text-[#1C01A5]">{nb as number}</span>
          <span className="flex flex-wrap items-center">
            <Tumpukan id={b as "mangga"} n={nb as number} />
          </span>
        </div>
      ))}
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

const JamKecil = ({ jam, menit = 0, gaya = "garis" as "garis" | "dinding", tonjol }: { jam: number; menit?: number; gaya?: "garis" | "dinding"; tonjol?: "pendek" | "panjang" }) => (
  <JamMuka jam={jam} menit={menit} gaya={gaya} kelas="w-full max-w-[96px]" tonjol={tonjol} />
);

export function visualInfografisK2B6B(): React.ReactNode[] {
  return [
    /* 1 Bagian Jam Analog */
    <KotakPoster key="1" warna="#DCFCE7">
      <div className="flex items-center justify-center gap-3">
        <JamMuka jam={5} gaya="dinding" kelas="w-full max-w-[130px]" />
        <div className="space-y-1">
          <Chip warna="#BFDBFE">jarum pendek</Chip>
          <br />
          <Chip warna="#FECACA">jarum panjang</Chip>
          <br />
          <Chip warna="#FDE68A">angka 1 sampai 12</Chip>
        </div>
      </div>
    </KotakPoster>,
    /* 2 Jarum Pendek dan Panjang */
    <div key="2" className="grid grid-cols-2 gap-2">
      <Ubin ket="jarum pendek: jam" warna="#DBEAFE">
        <JamKecil jam={5} tonjol="pendek" />
      </Ubin>
      <Ubin ket="jarum panjang: menit" warna="#FEE2E2">
        <JamKecil jam={5} tonjol="panjang" />
      </Ubin>
    </div>,
    /* 3 Pukul Tepat */
    <div key="3" className="grid grid-cols-2 gap-2">
      <Ubin ket="pukul 5 tepat" warna="#FEF3C7">
        <JamKecil jam={5} />
      </Ubin>
      <Ubin ket="pukul 6 tepat" warna="#DCFCE7">
        <JamKecil jam={6} />
      </Ubin>
    </div>,
    /* 4 Jam Analog dan Digital */
    <KotakPoster key="4" warna="#EEF2FF">
      <div className="flex items-center justify-center gap-3">
        <JamKecil jam={5} gaya="dinding" />
        <span className="text-2xl font-black text-[#1C01A5]">→</span>
        <span className="rounded-xl border-4 border-[#1C01A5] bg-[#111827] px-3 py-1 font-mono text-3xl font-black text-[#FFE566]" role="img" aria-label="Jam digital nol lima titik nol nol">
          {digital(5)}
        </span>
      </div>
    </KotakPoster>,
    /* 5 Empat Bagian Hari */
    <div key="5" className="grid grid-cols-4 gap-1.5">
      {[
        ["🌅", "pagi", "#FEF3C7"],
        ["☀️", "siang", "#FEF9C3"],
        ["🌇", "sore", "#FFEDD5"],
        ["🌙", "malam", "#E0E7FF"],
      ].map(([e, t, w]) => (
        <Ubin key={t} ket={t} warna={w}>
          <span className="text-4xl leading-none" role="img" aria-label={t}>
            {e}
          </span>
        </Ubin>
      ))}
    </div>,
    /* 6 Kegiatan Tika */
    <KotakPoster key="6" warna="#F0FDF4">
      {[
        [6, "sarapan"],
        [7, "belajar di sekolah"],
        [12, "makan di kantin"],
        [16, "bermain dengan adik"],
        [21, "tidur"],
      ].map(([j, t], i) => (
        <div key={t as string} className={`flex items-center gap-2 rounded-xl bg-white px-1.5 py-0.5 ${i ? "mt-1" : ""}`}>
          <JamMuka jam={j as number} kelas="h-10 w-10 shrink-0" />
          <span className="text-sm font-black leading-tight text-[#1C01A5]">
            {digital(j as number)} {t as string}
          </span>
        </div>
      ))}
    </KotakPoster>,
    /* 7 Waktu dan Bagian Hari */
    <TabelPoster key="7" kepala={["Jam", "Bagian hari"]} kolom="1fr 1fr" baris={[["06.00", "pagi"], ["07.00", "pagi"], ["12.00", "siang"], ["16.00", "sore"], ["21.00", "malam"]]} />,
    /* 8 Lebih Lama, Lebih Sebentar */
    <KotakPoster key="8" warna="#FEF3C7">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="w-20 text-xs font-black text-[#1C01A5]">olahraga</span>
          <span className="h-5 w-[78%] rounded-md border-2 border-[#1C01A5] bg-[#7FCB96]" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 text-xs font-black text-[#1C01A5]">mandi</span>
          <span className="h-5 w-[24%] rounded-md border-2 border-[#1C01A5] bg-[#FDBA74]" />
        </div>
      </div>
      <div className="flex justify-center gap-2 pt-1">
        <Chip warna="#BBF7D0">olahraga lebih lama</Chip>
        <Chip warna="#FED7AA">mandi lebih sebentar</Chip>
      </div>
    </KotakPoster>,
    /* 9 Lama Beberapa Kegiatan */
    <TabelPoster key="9" kepala={["Kegiatan", "Lamanya"]} kolom="1.4fr 1fr" baris={[["mencuci tangan", "1 menit"], ["menyisir rambut", "5 menit"], ["mandi", "15 menit"], ["berolahraga", "1 jam"], ["tidur malam", "8 jam"]]} />,
    /* 10 Jarum Bergerak Satu Jam */
    <KotakPoster key="10" warna="#DCFCE7">
      <div className="flex items-center justify-center gap-2">
        <div>
          <JamKecil jam={6} />
          <Cap>pukul 6</Cap>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black text-[#1C01A5]">→</span>
          <Chip warna="#FFE566">1 jam</Chip>
        </div>
        <div>
          <JamKecil jam={7} />
          <Cap>pukul 7</Cap>
        </div>
      </div>
    </KotakPoster>,
  ];
}
