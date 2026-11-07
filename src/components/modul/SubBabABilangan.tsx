"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { IkonMainan } from "./ikon-mainan";
import { BAWAH, BIRU, EMAS, KUNING } from "./CeritaBandingB";
import { KelinciSVG, KelinciWajah } from "./gambar-bilangan-a";
import {
  JawabSuara,
  JudulGame,
  KABAR_TULIS_OK,
  KabarChip,
  Letusan,
  PanelPoster,
  STIKER,
  TombolLanjut,
  kata,
  useLetusan,
  type Kabar,
  type PanelSuara,
  type Umum,
} from "./SubBabBBanding";
import {
  ALAS,
  BendaSeret,
  CatatanPensil,
  CatatanTempel,
  LencanaSuara,
  PitaTahap,
  SuaraCtx,
  TombolSuaraGuru,
  useBicara,
  zonaDi,
} from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10.          */
/* Semua di klien, tanpa API. Maskot: Kelinci.                                */
/* Pelajaran bilangan nol dipasang di setiap tahap, bukan di satu tempat.     */
/* Tanpa simbol tambah, kurang, dan banding. Hanya kata, panah, dan bilangan. */
/* ------------------------------------------------------------------------ */

const DAFTAR_MAINAN = [
  { id: "jungkat", nama: "Jungkat-jungkit", n: 1 },
  { id: "ayunan", nama: "Ayunan", n: 2 },
  { id: "perosotan", nama: "Perosotan", n: 3 },
  { id: "sepeda", nama: "Sepeda", n: 4 },
  { id: "kursi", nama: "Kursi", n: 5 },
  { id: "balon", nama: "Balon", n: 6 },
  { id: "buku", nama: "Buku", n: 7 },
  { id: "layangan", nama: "Layang-layang", n: 8 },
  { id: "kelereng", nama: "Kelereng", n: 9 },
  { id: "bola", nama: "Bola", n: 10 },
] as const;

const kecil = (n: number) => kata(n).toLowerCase();

function urut(dari: number, sampai: number): number[] {
  const hasil: number[] = [];
  for (let n = dari; n <= sampai; n++) hasil.push(n);
  return hasil;
}

/* ------------------------------ Perangkat gambar ------------------------- */

/** Kelinci dan gelembung kata pendek. Diketuk, kelinci membacakan petunjuk lengkapnya. */
function KelinciBicara({ pendek, teks }: { pendek: string; teks?: string }) {
  const ucap = useContext(SuaraCtx);
  const isi = teks ?? pendek;
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${isi}`}
      onClick={() => ucap(isi)}
      className="igil-tanpa-tepi flex w-full items-end gap-2 text-left"
    >
      <KelinciWajah kelas="h-14 w-20 shrink-0 igil-lompat" />
      <span className="relative flex min-w-0 flex-1 items-center justify-between gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-lg font-black leading-snug text-[#1C01A5]">
        <span className="min-w-0">{pendek}</span>
        <LencanaSuara />
      </span>
    </button>
  );
}

/** Deretan bilangan beranak panah. */
function Rantai({ deret, warna = KUNING }: { deret: (number | string)[]; warna?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5">
      {deret.map((n, i) => (
        <React.Fragment key={i}>
          {i > 0 ? (
            <span className="text-lg font-black leading-none text-[#1C01A5]" aria-hidden="true">
              →
            </span>
          ) : null}
          <span
            className="flex h-9 min-w-9 items-center justify-center rounded-full border-4 border-[#1C01A5] px-1 text-lg font-black leading-none text-[#1C01A5]"
            style={{ backgroundColor: warna }}
          >
            {n}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/** Keranjang anyaman tanpa isi. Dipakai sebagai gambar "nol". */
function IkonKeranjang({ kelas = "h-8 w-8 shrink-0" }: { kelas?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={kelas} aria-hidden="true">
      <path d="M11 21 Q24 0 37 21" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M5 21 H43 L38 43 H10 Z" fill="#F3C98A" stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <ellipse cx="24" cy="21" rx="19" ry="3.4" fill="#A8672D" stroke={BIRU} strokeWidth="2.2" />
      <path d="M8 30 H40 M9.5 37 H38.5" stroke="#A8672D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ANYAM: React.CSSProperties = {
  backgroundImage: "repeating-linear-gradient(90deg, rgba(124,74,29,0.35) 0 2px, transparent 2px 13px)",
};

/** Keranjang beserta isinya. Bila onAmbil diberikan, setiap isi bisa diketuk untuk diambil. */
function KeranjangIsi({
  jenis,
  isi,
  mini = false,
  onAmbil,
}: {
  jenis: string;
  isi: number;
  mini?: boolean;
  onAmbil?: () => void;
}) {
  const ukuran = mini ? "h-7 w-7" : "h-11 w-11";
  return (
    <div className="flex w-full flex-col items-center">
      <div className={`relative z-0 flex flex-wrap items-end justify-center gap-0.5 px-1 ${mini ? "-mb-1.5 min-h-7" : "-mb-3 min-h-12"}`}>
        {Array.from({ length: isi }, (_, i) =>
          onAmbil ? (
            <button
              key={i}
              type="button"
              aria-label="Ambil satu benda dari keranjang"
              onClick={onAmbil}
              className="igil-lompat rounded-full"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <IkonMainan jenis={jenis} kelas={`${ukuran} shrink-0`} />
            </button>
          ) : (
            <IkonMainan key={i} jenis={jenis} kelas={`${ukuran} shrink-0`} />
          )
        )}
      </div>
      <div
        className={`relative z-10 max-w-full rounded-b-[1.6rem] rounded-t-lg border-4 border-[#7C4A1D] bg-[#F3C98A] ${mini ? "h-9 w-[5.5rem]" : "h-14 w-full max-w-[9rem]"}`}
        style={ANYAM}
      >
        <span className="absolute inset-x-1.5 top-0.5 h-2.5 rounded-full bg-[#7C4A1D]/45" aria-hidden="true" />
      </div>
    </div>
  );
}

/** Kelompok benda. Bila jumlahnya nol, yang tampak hanyalah keranjang kosong. */
function KelompokIkon({ jenis, n, ukuran = "h-9 w-9" }: { jenis: string; n: number; ukuran?: string }) {
  if (n === 0) return <IkonKeranjang kelas="h-14 w-14 shrink-0" />;
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {Array.from({ length: n }, (_, i) => (
        <IkonMainan key={i} jenis={jenis} kelas={`${ukuran} shrink-0`} />
      ))}
    </div>
  );
}

/** Bingkai sepuluh: dua baris, lima petak. `ada` menandai petak yang terisi. */
function BingkaiSepuluh({
  ada,
  panduan = 0,
  jenis,
  onKetuk,
  nyala = false,
}: {
  ada: boolean[];
  panduan?: number;
  jenis?: string;
  onKetuk?: (i: number) => void;
  nyala?: boolean;
}) {
  return (
    <div className={`grid grid-cols-5 gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-2 ${nyala ? "ring-4 ring-[#FFE566]" : ""}`}>
      {Array.from({ length: 10 }, (_, i) => {
        const terisi = ada[i] === true;
        const petunjuk = !terisi && i < panduan;
        const bisa = Boolean(onKetuk) && (terisi || petunjuk);
        return (
          <button
            key={i}
            type="button"
            aria-label={`Petak ${i + 1}`}
            disabled={!bisa}
            onClick={() => onKetuk?.(i)}
            className={`flex aspect-square min-w-0 items-center justify-center rounded-xl border-4 ${
              terisi
                ? "igil-muncul border-[#1C01A5] bg-[#FFE566]"
                : petunjuk
                  ? "border-dashed border-[#F0AB00] bg-[#FFF7CC]"
                  : "border-[#1C01A5]/25 bg-[#F5F6FF]"
            }`}
          >
            {terisi ? (
              jenis ? (
                <IkonMainan jenis={jenis} kelas="h-[78%] w-[78%]" />
              ) : (
                <span className="block h-[58%] w-[58%] rounded-full bg-[#1C01A5]" />
              )
            ) : petunjuk && jenis ? (
              <IkonMainan jenis={jenis} kelas="h-[78%] w-[78%] opacity-30" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

const GN = (n: number) => 20 + n * 30;

/** Garis bilangan 0 sampai 10. Kelinci bisa berdiri di satu titik dan melompat. */
function GarisNol({
  posisi,
  sorot = [],
  busur = [],
  bintang,
  onPilih,
}: {
  posisi?: number;
  sorot?: number[];
  busur?: { dari: number; ke: number }[];
  bintang?: number;
  onPilih?: (n: number) => void;
}) {
  return (
    <svg viewBox="0 0 340 100" className="block h-auto w-full" role="img" aria-label="Garis bilangan nol sampai sepuluh">
      <line x1="6" x2="334" y1="76" y2="76" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {busur.map((b, i) => (
        <path
          key={i}
          d={`M${GN(b.dari)} 64 Q${(GN(b.dari) + GN(b.ke)) / 2} 34 ${GN(b.ke)} 64`}
          fill="none"
          stroke={EMAS}
          strokeWidth="3.2"
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
      ))}
      {Array.from({ length: 11 }, (_, n) => (
        <g
          key={n}
          role={onPilih ? "button" : undefined}
          aria-label={onPilih ? `Titik ${n}` : undefined}
          onClick={onPilih ? () => onPilih(n) : undefined}
          style={onPilih ? { cursor: "pointer" } : undefined}
        >
          <circle cx={GN(n)} cy="76" r="12" fill={sorot.includes(n) ? KUNING : "#FFFFFF"} stroke={BIRU} strokeWidth="3" />
          <text x={GN(n)} y="81.5" textAnchor="middle" fontSize={n >= 10 ? 12 : 15} fontWeight="900" fill={BIRU}>
            {n}
          </text>
        </g>
      ))}
      {bintang !== undefined ? (
        <text x={GN(bintang)} y="50" textAnchor="middle" fontSize="20" className="igil-denyut" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          ⭐
        </text>
      ) : null}
      {posisi !== undefined ? (
        <g style={{ transform: `translateX(${GN(posisi)}px)`, transition: "transform 0.35s ease-out" }}>
          <g key={posisi} className="igil-lompat" style={BAWAH}>
            <KelinciSVG x={0} y={58} s={0.62} />
          </g>
        </g>
      ) : null}
    </svg>
  );
}

/** Rak manik dua baris. Setiap ketukan menambah satu manik sampai penuh. */
function RakManik({ isi, kapasitas, onKetuk }: { isi: number; kapasitas: number; onKetuk: () => void }) {
  const baris = (mulai: number, jumlah: number, y: number) =>
    Array.from({ length: jumlah }, (_, i) => {
      const nomor = mulai + i;
      const ada = nomor < isi;
      return (
        <circle
          key={nomor}
          cx={36 + i * 56}
          cy={y}
          r="21"
          fill={ada ? (nomor % 2 === 0 ? EMAS : "#E98989") : "#FFFFFF"}
          stroke={BIRU}
          strokeWidth={ada ? 3.4 : 2.6}
          strokeDasharray={ada ? undefined : "5 5"}
          className={ada && nomor === isi - 1 ? "igil-muncul" : undefined}
          style={ada && nomor === isi - 1 ? { transformBox: "fill-box", transformOrigin: "50% 50%" } : undefined}
        />
      );
    });
  const atas = Math.min(5, kapasitas);
  const bawah = Math.max(0, kapasitas - 5);
  return (
    <button
      type="button"
      aria-label="Rak manik. Ketuk untuk menambah satu manik"
      onClick={onKetuk}
      className="igil-tanpa-tepi block w-full rounded-2xl border-4 border-[#7C4A1D] bg-[#FBE3BC] p-1"
    >
      <svg viewBox="0 0 300 136" className="block h-auto w-full" aria-hidden="true">
        <path d="M14 38 H286 M14 98 H286" stroke="#7C4A1D" strokeWidth="5" strokeLinecap="round" />
        {baris(0, atas, 38)}
        {bawah > 0 ? baris(atas, bawah, 98) : null}
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman bilangan nol sampai sepuluh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT = [
  {
    ikon: <IkonKeranjang kelas="h-9 w-9" />,
    nama: "Nol",
    ket: "tidak ada",
    suara: "Nol artinya tidak ada benda sama sekali. Keranjang yang kosong banyaknya nol.",
  },
  {
    ikon: <span className="text-3xl">👆</span>,
    nama: "Satu-satu",
    ket: "tunjuk, sebut",
    suara: "Hitung benda satu per satu. Tunjuk, lalu sebut. Setiap benda hanya dihitung satu kali.",
  },
  {
    ikon: <span className="text-3xl">✏️</span>,
    nama: "Baca, tulis",
    ket: "kata dan angka",
    suara: "Bilangan dibaca dengan kata dan ditulis dengan lambang. Contohnya, tujuh ditulis dengan lambang 7.",
  },
];

export function InfografisBilanganA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Bilangan 0 sampai 10</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="NOL: TIDAK ADA"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Perhatikan dua keranjang. Keranjang di kiri kosong, tidak ada bola sama sekali. Banyaknya adalah nol, ditulis dengan lambang 0. Keranjang di kanan berisi tiga bola, ditulis dengan lambang 3."
      >
        <div className="grid grid-cols-2 gap-3">
          {[0, 3].map((n) => (
            <div key={n} className="space-y-1 text-center">
              <KeranjangIsi jenis="bola" isi={n} mini />
              <p className="text-4xl font-black leading-none text-[#1C01A5]">{n}</p>
              <p className="text-base font-black leading-tight text-[#6D28D9]">{kata(n)}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="MAINAN DAN JUMLAHNYA"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Ini mainan di taman dan jumlahnya. Tekan satu baris untuk mendengar nama mainan dan banyaknya. Keranjang kosong ada di paling atas, banyaknya nol."
      >
        <div className="space-y-1.5">
          <button
            type="button"
            aria-label="Keranjang kosong"
            onClick={() => speakGuru("Keranjang kosong. Tidak ada benda di dalamnya. Banyaknya nol.")}
            className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 rounded-2xl border-4 border-[#7C3AED] bg-[#F5F3FF] px-2 py-1.5 text-left"
          >
            <IkonKeranjang kelas="h-9 w-9" />
            <span className="text-sm font-black leading-tight text-[#1C01A5]">Kosong</span>
            <span className="text-right">
              <span className="block text-3xl font-black leading-none text-[#1C01A5]">0</span>
              <span className="block text-xs font-black text-[#6D28D9]">Nol</span>
            </span>
          </button>
          {DAFTAR_MAINAN.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-label={m.nama}
              onClick={() => speakGuru(`${m.nama} ada ${kecil(m.n)}.`)}
              className="grid w-full grid-cols-[1fr_auto] items-center gap-2 rounded-2xl border-4 border-[#F0AB00] bg-white px-2 py-1.5 text-left"
            >
              <span className="min-w-0 space-y-0.5">
                <span className="block text-sm font-black leading-tight text-[#1C01A5]">{m.nama}</span>
                <span className="flex flex-wrap gap-0.5">
                  {Array.from({ length: m.n }, (_, i) => (
                    <IkonMainan key={i} jenis={m.id} kelas="h-5 w-5 shrink-0" />
                  ))}
                </span>
              </span>
              <span className="text-right">
                <span className="block text-3xl font-black leading-none text-[#1C01A5]">{m.n}</span>
                <span className="block text-xs font-black text-[#92400E]">{kata(m.n)}</span>
              </span>
            </button>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="BINGKAI SEPULUH"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Bingkai sepuluh punya sepuluh petak. Kalau tidak ada titik di dalamnya, banyaknya nol. Kalau ada enam titik di dalamnya, banyaknya enam."
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1 text-center">
            <BingkaiSepuluh ada={Array(10).fill(false)} />
            <p className="text-3xl font-black leading-none text-[#1C01A5]">0</p>
          </div>
          <div className="space-y-1 text-center">
            <BingkaiSepuluh ada={Array.from({ length: 10 }, (_, i) => i < 6)} />
            <p className="text-3xl font-black leading-none text-[#1C01A5]">6</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="GARIS BILANGAN"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Garis bilangan dimulai dari nol, lalu satu, dua, sampai sepuluh. Semakin ke kanan, bilangannya semakin besar. Nol ada di paling kiri, jadi nol adalah bilangan paling kecil."
      >
        <GarisNol sorot={[0]} posisi={0} busur={[{ dari: 0, ke: 10 }]} />
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="BACA DAN TULIS"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Ini cara membaca dan menulis bilangan nol sampai sepuluh. Tekan satu kotak untuk mendengar bacaannya."
      >
        <div className="grid grid-cols-4 gap-1.5">
          {urut(0, 10).map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} dibaca ${kecil(n)}`}
              onClick={() => speakGuru(`${n} dibaca ${kecil(n)}.`)}
              className={`flex flex-col items-center rounded-2xl border-4 border-[#1C01A5] px-0.5 py-1 ${n === 0 ? "bg-[#FFE566]" : "bg-white"}`}
            >
              <span className="text-3xl font-black leading-none text-[#1C01A5]">{n}</span>
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kata(n)}</span>
            </button>
          ))}
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-3 gap-2">
          {INGAT.map((g) => (
            <button
              key={g.nama}
              type="button"
              aria-label={`Dengarkan: ${g.nama}`}
              onClick={() => speakGuru(g.suara)}
              className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl bg-[#F0FDF4] px-1 py-2 text-center"
            >
              {g.ikon}
              <span className="text-base font-black leading-tight text-[#14532D]">{g.nama}</span>
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]/80">{g.ket}</span>
              <LencanaSuara kelas="h-7 w-7" />
            </button>
          ))}
        </div>
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete (delapan kegiatan)                                       */
/* ------------------------------------------------------------------------ */

type LangkahA = {
  kegiatan: number;
  tipe: "bilang" | "nol" | "pasang" | "banding" | "urut" | "cerita" | "tulis" | "lab";
  putaran?: 0 | 1;
};

const LANGKAH_CONCRETE: LangkahA[] = [
  { kegiatan: 1, tipe: "bilang", putaran: 0 },
  { kegiatan: 1, tipe: "bilang", putaran: 1 },
  { kegiatan: 2, tipe: "nol" },
  { kegiatan: 3, tipe: "pasang" },
  { kegiatan: 4, tipe: "banding" },
  { kegiatan: 5, tipe: "urut" },
  { kegiatan: 6, tipe: "cerita", putaran: 0 },
  { kegiatan: 6, tipe: "cerita", putaran: 1 },
  { kegiatan: 7, tipe: "tulis", putaran: 0 },
  { kegiatan: 7, tipe: "tulis", putaran: 1 },
  { kegiatan: 8, tipe: "lab" },
];

const JUMLAH_KEGIATAN = 8;

const SUARA_BILANG =
  "Ayo menghitung mainan. Pindahkan mainan ke tempatnya satu per satu sambil membilang. Setelah semuanya pindah, ucapkan banyaknya.";
const SUARA_NOL =
  "Ini keranjang bola. Ambil bolanya satu per satu sampai habis. Lalu ucapkan berapa banyak bola yang tersisa. Sesudah itu cari keranjang yang isinya nol.";
const SUARA_PASANG =
  "Pasangkan kartu bilangan dengan kelompok benda yang sama banyak. Kalau tidak ada benda sama sekali, pilih kartu yang tepat. Seret kartunya, atau ketuk kartu lalu ketuk kelompoknya.";
const SUARA_BANDING =
  "Lihat dua kelompok benda. Ketuk kelompok yang sesuai dengan pertanyaan di atas. Hitung dulu bendanya, kalau kosong berarti tidak ada.";
const SUARA_URUT =
  "Susun kelompok benda dari yang paling sedikit sampai yang paling banyak. Mulailah dari kelompok yang tidak punya benda sama sekali.";
const SUARA_CERITA_1 =
  "Di taman ada satu jungkat-jungkit. Tekan tombol supaya ayunan datang. Hitung semua mainan, lalu ucapkan banyaknya.";
const SUARA_CERITA_2 =
  "Ada tiga burung di dahan. Ketuk setiap burung supaya terbang. Lalu ucapkan berapa burung yang masih ada di dahan.";
const SUARA_TULIS =
  "Lihat benda yang ada di kotak, lalu tulis angka dan katanya di kanvas. Ikuti titik-titiknya dengan jari.";
const SUARA_LAB =
  "Selamat datang di laboratorium. Pilih satu permainan. Kamu boleh mencoba sebanyak yang kamu suka.";

type PropsLangkah = { speakGuru: (t: string) => void; lanjut: () => void; nomor: number };

/** Kegiatan 1: pindahkan mainan ke tempatnya satu per satu, lalu ucapkan banyaknya. */
const BILANG = [
  { jenis: "sepeda", nama: "sepeda", n: 4, tempat: "🏠 GARASI", sukses: "Hebat! Ada empat sepeda di garasi." },
  { jenis: "kursi", nama: "kursi", n: 6, tempat: "🌳 TAMAN", sukses: "Hebat! Ada enam kursi di taman." },
];

function LangkahBilang({
  putaran,
  speakGuru,
  lanjut,
  nomor,
  panel,
}: PropsLangkah & { putaran: 0 | 1; panel: PanelSuara }) {
  const d = BILANG[putaran];
  const [pakai, setPakai] = useState<number[]>([]);
  const letusan = useLetusan();
  const id = `a-bilang-${putaran + 1}`;
  const suara = panel.suara[id] === true;
  const penuh = pakai.length >= d.n;
  useBicara(suara, d.sukses);

  const taruh = (i: number) => {
    if (pakai.includes(i) || pakai.length >= d.n) return;
    const baru = [...pakai, i];
    setPakai(baru);
    if (baru.length >= d.n) letusan.picu();
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Hitung Mainan" onSuara={() => speakGuru(SUARA_BILANG)} warna="#FDE68A" />
      <KelinciBicara
        pendek={suara ? "Hebat!" : penuh ? "Ucapkan jumlahnya" : `Pindahkan ${d.nama} satu-satu`}
        teks={
          suara
            ? `Hebat! Kamu sudah menyebut banyaknya ${d.nama}.`
            : penuh
              ? `Semua ${d.nama} sudah pindah! Hitung ${d.nama} di tempatnya, lalu ucapkan banyaknya.`
              : `Seret ${d.nama} ke tempatnya satu per satu, atau ketuk ${d.nama}. Sambil membilang, ya!`
        }
      />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        <div data-zona="rak" className="rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#FFF6E5] p-2">
          <p className="mb-1 text-xs font-black tracking-wide text-[#6B3F12]">{d.tempat}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: d.n }, (_, i) => (
              <span
                key={i}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 ${
                  i < pakai.length ? "igil-muncul border-[#1C01A5] bg-white" : "border-dashed border-[#A8672D]/60 bg-white/60"
                }`}
              >
                {i < pakai.length ? <IkonMainan jenis={d.jenis} kelas="h-11 w-11" /> : null}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: d.n }, (_, i) =>
            pakai.includes(i) ? (
              <span key={i} className="block h-14 w-14 rounded-2xl border-2 border-dashed border-[#A8672D]/50" />
            ) : (
              <BendaSeret
                key={i}
                id={`bilang-${i}`}
                label={`${d.nama}, pindahkan ke tempatnya`}
                onKetuk={() => taruh(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "rak") taruh(i);
                }}
                kelas="flex h-14 w-14 items-center justify-center"
              >
                <IkonMainan jenis={d.jenis} besar kelas="h-12 w-12 drop-shadow-[0_4px_2px_rgba(90,50,10,0.45)]" />
              </BendaSeret>
            )
          )}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <JawabSuara id={id} jumlah={d.n} panel={panel} siap={penuh} belumSiap="Pindahkan semuanya dulu, ya." />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/** Kegiatan 2: keranjang kosong. Ambil sampai habis, ucapkan nol, lalu cari keranjang yang nol. */
const RONDE_NOL = [
  { jenis: "balon", isi: [2, 0, 4] },
  { jenis: "kelereng", isi: [1, 3, 0] },
];

function LangkahNol({ speakGuru, lanjut, nomor, panel }: PropsLangkah & { panel: PanelSuara }) {
  const [fase, setFase] = useState<"ambil" | "pilih">("ambil");
  const [sisa, setSisa] = useState(3);
  const [ronde, setRonde] = useState(0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const id = "a-nol-ambil";
  const suara = panel.suara[id] === true;
  useBicara(
    suara,
    "Betul! Tidak ada bola sama sekali di keranjang. Banyaknya adalah nol. Kita menulisnya dengan lambang 0."
  );
  const data = RONDE_NOL[ronde];
  const terakhir = ronde >= RONDE_NOL.length - 1;

  const ambil = () => {
    if (sisa <= 0) return;
    const baru = sisa - 1;
    setSisa(baru);
    speakGuru(baru > 0 ? kata(baru) : "Habis!");
    if (baru === 0) letusan.picu();
  };

  const pilih = (i: number) => {
    if (benar) return;
    if (data.isi[i] === 0) {
      setBenar(true);
      setKeliru(null);
      setKabar({ teks: "Betul! Keranjang yang tidak ada isinya banyaknya nol.", ok: true });
      letusan.picu();
    } else {
      setKeliru(i);
      setKabar({ teks: "Hitung dulu isinya. Nol artinya tidak ada benda sama sekali.", ok: false });
    }
  };

  if (fase === "ambil") {
    return (
      <>
        <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Ambil Bola" onSuara={() => speakGuru(SUARA_NOL)} warna="#DDD6FE" />
        <KelinciBicara
          pendek={sisa > 0 ? "Ambil bolanya" : suara ? "Hebat!" : "Ucapkan jumlahnya"}
          teks={
            sisa > 0
              ? "Ketuk bola di keranjang supaya diambil, satu demi satu, sampai habis."
              : suara
                ? "Hebat! Kamu sudah menyebut banyaknya bola di keranjang."
                : "Keranjangnya sudah kosong! Berapa banyak bola di keranjang sekarang? Ucapkan bilangannya."
          }
        />
        <div className={`relative space-y-3 p-3 ${ALAS}`}>
          <div className="mx-auto max-w-[11rem]">
            <KeranjangIsi jenis="bola" isi={sisa} onAmbil={sisa > 0 ? ambil : undefined} />
          </div>
          <Letusan id={letusan.id} />
        </div>
        <JawabSuara id={id} jumlah={0} panel={panel} siap={sisa === 0} belumSiap="Ambil semua bolanya dulu, ya." />
        <TombolLanjut teks="LANJUT ➡️" onClick={() => setFase("pilih")} />
      </>
    );
  }

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Mana yang Nol?" onSuara={() => speakGuru(SUARA_NOL)} warna="#DDD6FE" />
      <KelinciBicara pendek="Mana yang nol?" teks="Ketuk keranjang yang banyak isinya nol." />
      <div key={ronde} className={`relative space-y-3 p-3 ${ALAS}`}>
        <div className="grid grid-cols-3 gap-2">
          {data.isi.map((n, i) => (
            <button
              key={`${i}-${keliru === i ? "x" : "o"}`}
              type="button"
              aria-label={`Keranjang ${i + 1}`}
              onClick={() => pilih(i)}
              className={`rounded-2xl border-4 bg-white px-1 py-2 ${
                benar && n === 0 ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]"
              } ${keliru === i && !benar ? "igil-goyang" : ""}`}
            >
              <KeranjangIsi jenis={data.jenis} isi={n} mini />
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {benar ? (
        <div className="igil-muncul space-y-1 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-5xl font-black leading-none text-[#1C01A5]">0</p>
          <p className="text-lg font-black text-[#14532D]">Nol</p>
        </div>
      ) : null}
      {benar ? (
        <TombolLanjut
          teks={terakhir ? "LANJUTKAN ⬇️" : "PUTARAN 2 ➡️"}
          onClick={() => {
            if (terakhir) {
              lanjut();
              return;
            }
            setRonde(ronde + 1);
            setBenar(false);
            setKeliru(null);
            setKabar(null);
          }}
        />
      ) : null}
    </>
  );
}

/** Kegiatan 3: pasangkan kartu bilangan dengan kelompok benda, termasuk kelompok kosong. */
const PASANGAN = [
  { n: 0, jenis: "bola" },
  { n: 2, jenis: "ayunan" },
  { n: 3, jenis: "perosotan" },
  { n: 4, jenis: "sepeda" },
];
const KARTU_PASANG = [3, 0, 4, 2];

function KartuAngka({ n, sorot = false }: { n: number; sorot?: boolean }) {
  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
        sorot ? "bg-[#FFE566] ring-4 ring-[#F0AB00]" : "bg-[#FFE566]"
      }`}
    >
      {n}
    </div>
  );
}

function LangkahPasang({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [terpasang, setTerpasang] = useState<Record<number, number>>({});
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const pakai = Object.values(terpasang);
  const selesai = PASANGAN.every((_, i) => terpasang[i] !== undefined);

  const coba = (n: number | null, g: number) => {
    if (n === null || selesai || terpasang[g] !== undefined || pakai.includes(n)) return;
    if (PASANGAN[g].n === n) {
      const baru = { ...terpasang, [g]: n };
      setTerpasang(baru);
      setDipilih(null);
      setKeliru(null);
      if (PASANGAN.every((_, i) => baru[i] !== undefined)) {
        setKabar({ teks: "Pas semuanya! Kartu nol cocok dengan keranjang yang kosong.", ok: true });
        letusan.picu();
      } else {
        setKabar({ teks: "Benar. Pasangkan kartu yang lain.", ok: true });
      }
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum pas. Hitung dulu bendanya. Kalau tidak ada benda, bilangannya nol.", ok: false });
    }
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Pasang Kartu" onSuara={() => speakGuru(SUARA_PASANG)} warna="#BBF7D0" />
      <KelinciBicara pendek="Cocokkan kartunya" teks="Seret kartu bilangan ke kelompok benda yang sama banyak. Atau ketuk kartu dulu, lalu ketuk kelompoknya!" />
      <div className="relative space-y-3">
        <div className={`grid grid-cols-2 gap-2 p-3 ${ALAS}`}>
          {PASANGAN.map((p, g) => {
            const isi = terpasang[g];
            return (
              <button
                key={g}
                type="button"
                data-zona={`grup-${g}`}
                aria-label={`Kelompok benda ${g + 1}`}
                onClick={() => coba(dipilih, g)}
                className={`relative flex min-h-28 flex-col items-center justify-center rounded-2xl border-4 p-2 ${
                  isi !== undefined ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#7C4A1D]/70 bg-[#FFF6E5]"
                }`}
              >
                <KelompokIkon jenis={p.jenis} n={p.n} ukuran="h-8 w-8" />
                {isi !== undefined ? (
                  <span className="igil-muncul absolute -right-2 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5]">
                    {isi}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-around gap-1 rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2">
          {KARTU_PASANG.map((n) =>
            pakai.includes(n) ? (
              <span key={n} className="block h-14 w-14 rounded-2xl border-2 border-dashed border-[#A8672D]/50" />
            ) : (
              <BendaSeret
                key={n}
                id={`kartu-${n}`}
                label={`Kartu bilangan ${n}`}
                onKetuk={() => setDipilih(dipilih === n ? null : n)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("grup-")) coba(n, Number(z.slice(5)));
                }}
                kelas={keliru === n ? "igil-goyang" : ""}
              >
                <KartuAngka n={n} sorot={dipilih === n} />
              </BendaSeret>
            )
          )}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/** Kegiatan 4: banyak dan sedikit, termasuk membandingkan dengan keranjang kosong. */
const RONDE_BANDING = [
  {
    kiri: { jenis: "sepeda", n: 4 },
    kanan: { jenis: "ayunan", n: 2 },
    tanya: "banyak" as const,
    kunci: "kiri" as const,
    benar: "Betul! Empat lebih banyak dari dua.",
  },
  {
    kiri: { jenis: "bola", n: 0 },
    kanan: { jenis: "balon", n: 1 },
    tanya: "sedikit" as const,
    kunci: "kiri" as const,
    benar: "Betul! Nol lebih sedikit dari satu. Tidak ada benda berarti paling sedikit.",
  },
  {
    kiri: { jenis: "kelereng", n: 3 },
    kanan: { jenis: "bola", n: 0 },
    tanya: "sedikit" as const,
    kunci: "kanan" as const,
    benar: "Betul! Nol lebih sedikit dari tiga.",
  },
];

function LangkahBanding({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [ronde, setRonde] = useState(0);
  const d = RONDE_BANDING[ronde];
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<"kiri" | "kanan" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const terakhir = ronde >= RONDE_BANDING.length - 1;

  const pilih = (sisi: "kiri" | "kanan") => {
    if (benar) return;
    if (sisi === d.kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar({ teks: d.benar, ok: true });
      letusan.picu();
    } else {
      setKeliru(sisi);
      setKabar({ teks: "Belum tepat. Hitung dulu kedua kelompok, lalu bandingkan.", ok: false });
    }
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Mana Banyak?" onSuara={() => speakGuru(SUARA_BANDING)} warna="#FED7AA" />
      <KelinciBicara
        pendek={d.tanya === "banyak" ? "⬆️ Lebih banyak" : "⬇️ Lebih sedikit"}
        teks={d.tanya === "banyak" ? "Ketuk kelompok yang lebih banyak!" : "Ketuk kelompok yang lebih sedikit!"}
      />
      <div key={ronde} className={`relative space-y-3 p-3 ${ALAS}`}>
        <div className="grid grid-cols-2 gap-3">
          {(["kiri", "kanan"] as const).map((sisi) => {
            const g = d[sisi];
            const tepat = benar && sisi === d.kunci;
            return (
              <button
                key={`${sisi}-${keliru === sisi ? "x" : "o"}`}
                type="button"
                aria-label={sisi === "kiri" ? "Kelompok kiri" : "Kelompok kanan"}
                onClick={() => pilih(sisi)}
                className={`flex min-h-32 items-center justify-center rounded-2xl border-4 p-2 ${
                  tepat ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"
                } ${keliru === sisi && !benar ? "igil-goyang" : ""}`}
              >
                <KelompokIkon jenis={g.jenis} n={g.n} ukuran="h-9 w-9" />
              </button>
            );
          })}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {benar ? (
        <TombolLanjut
          teks={terakhir ? "LANJUTKAN ⬇️" : `PUTARAN ${ronde + 2} ➡️`}
          onClick={() => {
            if (terakhir) {
              lanjut();
              return;
            }
            setRonde(ronde + 1);
            setBenar(false);
            setKeliru(null);
            setKabar(null);
          }}
        />
      ) : null}
    </>
  );
}

/** Kegiatan 5: susun lima kelompok dari paling sedikit sampai paling banyak. */
const KELOMPOK_URUT = [
  { n: 0, jenis: "bola" },
  { n: 1, jenis: "jungkat" },
  { n: 2, jenis: "ayunan" },
  { n: 3, jenis: "perosotan" },
  { n: 4, jenis: "sepeda" },
];
const AWAL_URUT = [3, 0, 4, 2, 1];

function KartuKelompok({ n, kecilKartu = true }: { n: number; kecilKartu?: boolean }) {
  const k = KELOMPOK_URUT.find((x) => x.n === n)!;
  return (
    <div
      className={`flex w-full items-center justify-center rounded-lg border-4 border-[#1C01A5] bg-white p-0.5 shadow-[0_3px_0_rgba(28,1,165,0.25)] ${
        kecilKartu ? "min-h-16" : "min-h-20"
      }`}
    >
      {n === 0 ? (
        <IkonKeranjang kelas="h-10 w-10" />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-0.5">
          {Array.from({ length: n }, (_, i) => (
            <IkonMainan key={i} jenis={k.jenis} kelas="h-5 w-5 shrink-0" />
          ))}
        </div>
      )}
    </div>
  );
}

function LangkahUrut({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [slot, setSlot] = useState<(number | null)[]>(() => KELOMPOK_URUT.map(() => null));
  const [kabar, setKabar] = useState<Kabar>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const letusan = useLetusan();
  const selesai = slot.every((s) => s !== null);

  const taruh = (n: number, i: number) => {
    if (selesai || slot.includes(n) || slot[i] !== null) return;
    if (KELOMPOK_URUT[i].n === n) {
      const baru = [...slot];
      baru[i] = n;
      setSlot(baru);
      setKeliru(null);
      if (baru.every((s) => s !== null)) {
        setKabar({ teks: "Urutannya pas! Dari yang tidak ada sampai yang paling banyak.", ok: true });
        letusan.picu();
      } else {
        setKabar({ teks: "Benar. Cari kelompok berikutnya.", ok: true });
      }
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum pas. Cari kelompok yang lebih sedikit dulu. Yang kosong paling sedikit.", ok: false });
    }
  };
  const ketuk = (n: number) => {
    const i = slot.findIndex((s) => s === null);
    if (i >= 0) taruh(n, i);
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Susun Mainan" onSuara={() => speakGuru(SUARA_URUT)} warna="#C7D2FE" />
      <KelinciBicara pendek="⬇️ Sedikit ke banyak" teks="Susun dari yang paling sedikit ke yang paling banyak. Seret kelompok ke kotak kosong, atau ketuk kelompoknya!" />
      <div className="relative space-y-3">
        <div className={`space-y-2 p-3 ${ALAS}`}>
          <div className="flex items-center justify-between px-1 text-sm font-black text-[#6B3F12]" aria-hidden="true">
            <span>Sedikit</span>
            <span>→</span>
            <span>Banyak</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 border-b-8 border-double border-[#7C4A1D] pb-2">
            {slot.map((n, i) => (
              <div
                key={i}
                data-zona={`slot-${i}`}
                className={`flex min-h-16 items-center justify-center rounded-lg ${
                  n !== null ? "igil-muncul" : "border-4 border-dashed border-[#7C4A1D]/60 bg-[#FFF6E5]"
                }`}
              >
                {n !== null ? <KartuKelompok n={n} /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1.5 rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2">
          {AWAL_URUT.map((n) =>
            slot.includes(n) ? (
              <span key={n} className="block min-h-16 rounded-lg border-2 border-dashed border-[#A8672D]/50" />
            ) : (
              <BendaSeret
                key={n}
                id={`urut-${n}`}
                label={`Kelompok benda ${n}`}
                onKetuk={() => ketuk(n)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("slot-")) taruh(n, Number(z.slice(5)));
                }}
                kelas={keliru === n ? "igil-goyang" : ""}
              >
                <KartuKelompok n={n} />
              </BendaSeret>
            )
          )}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/** Kegiatan 6: cerita taman. Ayunan datang, lalu burung terbang sampai tidak ada lagi. */
function LangkahCerita({
  putaran,
  speakGuru,
  lanjut,
  nomor,
  panel,
}: PropsLangkah & { putaran: 0 | 1; panel: PanelSuara }) {
  const [datang, setDatang] = useState(false);
  const [terbang, setTerbang] = useState<number[]>([]);
  const letusan = useLetusan();
  const id = `a-cerita-${putaran + 1}`;
  const suara = panel.suara[id] === true;
  const kunci = putaran === 0 ? 3 : 0;
  const siap = putaran === 0 ? datang : terbang.length >= 3;
  useBicara(
    suara,
    putaran === 0
      ? "Betul! Satu jungkat-jungkit dan dua ayunan, semuanya ada tiga mainan."
      : "Betul! Semua burung sudah terbang. Tidak ada burung di dahan. Banyaknya adalah nol."
  );

  const terbangkan = (i: number) => {
    if (terbang.includes(i)) return;
    const baru = [...terbang, i];
    setTerbang(baru);
    speakGuru(baru.length >= 3 ? "Habis!" : kata(3 - baru.length));
    if (baru.length >= 3) letusan.picu();
  };

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={JUMLAH_KEGIATAN}
        judul="Cerita Taman"
        onSuara={() => speakGuru(putaran === 0 ? SUARA_CERITA_1 : SUARA_CERITA_2)}
        warna="#FBCFE8"
      />
      <KelinciBicara
        pendek={suara ? "Hebat!" : siap ? "Ucapkan jumlahnya" : putaran === 0 ? "Panggil ayunan" : "Ketuk burungnya"}
        teks={
          suara
            ? "Hebat! Jawabanmu tepat."
            : siap
              ? putaran === 0
                ? "Semua mainan sudah ada di taman. Hitung semuanya, lalu ucapkan banyaknya."
                : "Burungnya sudah terbang semua. Berapa burung yang masih ada di dahan sekarang? Ucapkan bilangannya."
              : putaran === 0
                ? "Di taman ada satu jungkat-jungkit. Tekan tombol supaya ayunan datang."
                : "Ada tiga burung di dahan. Ketuk setiap burung supaya terbang."
        }
      />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        {putaran === 0 ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex min-h-24 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
                <IkonMainan jenis="jungkat" besar kelas="h-16 w-16" />
              </div>
              <div
                className={`flex min-h-24 items-center justify-center gap-1 rounded-2xl border-4 p-2 ${
                  datang ? "igil-muncul border-[#1C01A5] bg-white" : "border-dashed border-[#7C4A1D]/60 bg-white/60"
                }`}
              >
                {datang ? (
                  <>
                    <IkonMainan jenis="ayunan" besar kelas="h-14 w-14" />
                    <IkonMainan jenis="ayunan" besar kelas="h-14 w-14" />
                  </>
                ) : (
                  <span className="text-4xl font-black text-[#7C4A1D]/50">?</span>
                )}
              </div>
            </div>
            {!datang ? (
              <button
                type="button"
                onClick={() => {
                  setDatang(true);
                  letusan.picu();
                }}
                className="igil-lompat mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-lg font-black text-[#FFE566] shadow-[0_5px_0_rgba(28,1,165,0.35)]"
              >
                Datangkan ayunan
              </button>
            ) : null}
          </>
        ) : (
          <div className="space-y-1">
            <div className="flex min-h-16 items-end justify-around px-3">
              {[0, 1, 2].map((i) =>
                terbang.includes(i) ? (
                  <span key={i} className="block h-14 w-14" />
                ) : (
                  <button
                    key={i}
                    type="button"
                    aria-label="Ketuk burung supaya terbang"
                    onClick={() => terbangkan(i)}
                    className="igil-lompat igil-tanpa-tepi text-6xl leading-none"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
                    🐦
                  </button>
                )
              )}
            </div>
            <div className="h-3 rounded-full border-2 border-[#1C01A5] bg-[#A8672D]" aria-hidden="true" />
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <JawabSuara id={id} jumlah={kunci} panel={panel} siap={siap} belumSiap={putaran === 0 ? "Datangkan ayunannya dulu, ya." : "Ketuk semua burungnya dulu, ya."} />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/** Kegiatan 7: tulis angka dan kata. Putaran kedua menulis lambang nol. */
function LangkahTulis({ putaran, speakGuru, lanjut, nomor }: PropsLangkah & { putaran: 0 | 1 }) {
  const [lulus, setLulus] = useState(false);
  const n = putaran === 0 ? 4 : 0;
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Menulis" onSuara={() => speakGuru(SUARA_TULIS)} warna="#FED7AA" />
      <KelinciBicara
        pendek="Tulis angkanya"
        teks={
          putaran === 0
            ? "Hitung sepeda di kotak, lalu tulis angka dan katanya di kanvas."
            : "Keranjang ini tidak ada isinya. Tulis lambang bilangannya dan katanya di kanvas. Bentuknya bulat, seperti telur."
        }
      />
      <div className={`p-3 ${ALAS}`}>
        <div className="flex min-h-20 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
          <KelompokIkon jenis="sepeda" n={n} ukuran="h-10 w-10" />
        </div>
      </div>
      <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
        <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
        <DottedNumberTracingCanvas key={`a-tulis-${putaran}`} digit={n} kata={kata(n)} onCompletedTrace={() => setLulus(true)} />
        <KabarChip
          kabar={
            lulus
              ? { teks: n === 0 ? "Tulisanmu rapi! Nol artinya tidak ada, dan lambangnya bulat." : "Tulisanmu rapi dan tepat!", ok: true }
              : null
          }
        />
      </div>
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/* ------------------------------ Laboratorium ----------------------------- */

function LabKeranjang({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [n, setN] = useState(0);
  const ubah = (baru: number) => {
    const b = Math.min(10, Math.max(0, baru));
    if (b === n) return;
    setN(b);
    speakGuru(b === 0 ? "Nol. Keranjangnya kosong." : kata(b));
  };
  return (
    <div className="space-y-3">
      <div className="mx-auto max-w-[12rem]">
        <KeranjangIsi jenis="bola" isi={n} />
      </div>
      <BingkaiSepuluh ada={Array.from({ length: 10 }, (_, i) => i < n)} />
      <div className="text-center">
        <p className="text-6xl font-black leading-none text-[#1C01A5]">{n}</p>
        <p className="text-xl font-black text-[#6D28D9]">{kata(n)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => ubah(n - 1)}
          disabled={n <= 0}
          className="rounded-2xl border-4 border-[#1C01A5] bg-[#C7D2FE] py-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40"
        >
          ⬇️ Ambil satu
        </button>
        <button
          type="button"
          onClick={() => ubah(n + 1)}
          disabled={n >= 10}
          className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40"
        >
          ⬆️ Taruh satu
        </button>
      </div>
    </div>
  );
}

function LabGaris({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [pos, setPos] = useState(0);
  const [sudah, setSudah] = useState<number[]>([0]);
  const pindah = (n: number) => {
    setPos(n);
    setSudah((s) => (s.includes(n) ? s : [...s, n]));
    speakGuru(n === 0 ? "Nol. Titik awal." : kata(n));
  };
  return (
    <div className="space-y-2">
      <GarisNol posisi={pos} sorot={sudah} onPilih={pindah} />
      <div className="text-center">
        <p className="text-6xl font-black leading-none text-[#1C01A5]">{pos}</p>
        <p className="text-xl font-black text-[#6D28D9]">{kata(pos)}</p>
      </div>
      <p className="text-center text-sm font-black text-[#1C01A5]/80">👆 Ketuk angka, kelinci melompat</p>
    </div>
  );
}

const TAB_LAB = [
  { id: "keranjang" as const, ikon: <IkonKeranjang kelas="h-9 w-9" />, nama: "Keranjang" },
  { id: "garis" as const, ikon: <span className="text-3xl">📏</span>, nama: "Garis" },
];

function LangkahLab({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [tab, setTab] = useState<"keranjang" | "garis">("keranjang");
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Laboratorium" onSuara={() => speakGuru(SUARA_LAB)} warna="#FEF08A" />
      <KelinciBicara pendek="Bermain bebas!" teks="Selamat datang di laboratorium. Pilih satu permainan: keranjang atau garis bilangan. Kamu boleh mencoba sebanyak yang kamu suka." />
      <div className="grid grid-cols-2 gap-2">
        {TAB_LAB.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center rounded-2xl border-4 border-[#1C01A5] py-2 text-sm font-black text-[#1C01A5] ${
              tab === t.id ? "bg-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.3)]" : "bg-white"
            }`}
          >
            {t.ikon}
            {t.nama}
          </button>
        ))}
      </div>
      <div className={`p-3 ${ALAS}`}>
        {tab === "keranjang" ? <LabKeranjang speakGuru={speakGuru} /> : null}
        {tab === "garis" ? <LabGaris speakGuru={speakGuru} /> : null}
      </div>
      <TombolLanjut teks="LANJUTKAN KE PICTORIAL ⬇️" onClick={lanjut} />
    </>
  );
}

export function ConcreteBilanganA(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <ConcreteIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function ConcreteIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const langkah = LANGKAH_CONCRETE[indeks];
  const terakhir = indeks >= LANGKAH_CONCRETE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = { speakGuru, lanjut, nomor: langkah.kegiatan };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan pindahkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Kegiatan ${langkah.kegiatan} dari ${JUMLAH_KEGIATAN}`}>
        {Array.from({ length: JUMLAH_KEGIATAN }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${
              i < langkah.kegiatan ? "bg-[#FFE566]" : "bg-white"
            }`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "bilang" ? <LangkahBilang putaran={langkah.putaran ?? 0} panel={panel} {...dasar} /> : null}
        {langkah.tipe === "nol" ? <LangkahNol panel={panel} {...dasar} /> : null}
        {langkah.tipe === "pasang" ? <LangkahPasang {...dasar} /> : null}
        {langkah.tipe === "banding" ? <LangkahBanding {...dasar} /> : null}
        {langkah.tipe === "urut" ? <LangkahUrut {...dasar} /> : null}
        {langkah.tipe === "cerita" ? <LangkahCerita putaran={langkah.putaran ?? 0} panel={panel} {...dasar} /> : null}
        {langkah.tipe === "tulis" ? <LangkahTulis putaran={langkah.putaran ?? 0} {...dasar} /> : null}
        {langkah.tipe === "lab" ? <LangkahLab {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture (empat kartu diagram)                                     */
/* ------------------------------------------------------------------------ */

type KartuGambarA = {
  id: string;
  bentuk: "kosong" | "isi" | "lompat";
  jenis?: string;
  judul: string;
  kunci: number;
  pendekBantu: string;
  tugasPendek: string;
  suara: string;
  bantuan: string;
  hasil: string;
  rangkaian: number[];
  tulis: boolean;
};

const KARTU_GAMBAR_A: KartuGambarA[] = [
  {
    id: "a-gambar-p1",
    bentuk: "kosong",
    judul: "Bingkai Kosong",
    kunci: 0,
    pendekBantu: "Ketuk titiknya!",
    tugasPendek: "Ucapkan dan tulis",
    suara:
      "Bingkai sepuluh ini berisi beberapa titik. Ketuk titiknya satu per satu sampai habis. Lalu ucapkan banyaknya titik sekarang, dan tulis lambangnya.",
    bantuan: "Ketuk setiap titik di bingkai supaya hilang. Kalau semuanya sudah hilang, ucapkan dan tulis banyaknya.",
    hasil: "Bingkai yang tidak ada titiknya banyaknya nol. Lambangnya 0.",
    rangkaian: [3, 2, 1, 0],
    tulis: true,
  },
  {
    id: "a-gambar-p2",
    bentuk: "isi",
    jenis: "kursi",
    judul: "Kursi Taman",
    kunci: 5,
    pendekBantu: "Isi petaknya!",
    tugasPendek: "Ucapkan jumlahnya",
    suara:
      "Kursi di taman. Ketuk petak bergambar kursi sampai semuanya terisi. Lalu hitung kursinya dan ucapkan jumlahnya.",
    bantuan: "Ketuk petak yang bergambar kursi samar sampai semuanya terisi, lalu ucapkan jumlahnya.",
    hasil: "Lima kursi memenuhi lima petak di baris atas bingkai.",
    rangkaian: [1, 2, 3, 4, 5],
    tulis: false,
  },
  {
    id: "a-gambar-p3",
    bentuk: "isi",
    jenis: "balon",
    judul: "Balon Warna",
    kunci: 6,
    pendekBantu: "Isi petaknya!",
    tugasPendek: "Ucapkan dan tulis",
    suara:
      "Balon warna-warni. Ketuk petak bergambar balon sampai semuanya terisi. Lalu hitung, ucapkan, dan tulis jumlahnya.",
    bantuan: "Ketuk petak yang bergambar balon samar sampai semuanya terisi. Ucapkan dan tulis jumlahnya.",
    hasil: "Lima balon di baris atas ditambah satu balon di baris bawah menjadi enam.",
    rangkaian: [1, 2, 3, 4, 5, 6],
    tulis: true,
  },
  {
    id: "a-gambar-p4",
    bentuk: "lompat",
    judul: "Lompat Kelinci",
    kunci: 7,
    pendekBantu: "Ketuk kelinci!",
    tugasPendek: "Ucapkan bilangannya",
    suara:
      "Kelinci mulai dari nol di garis bilangan. Ketuk kelinci supaya melompat satu langkah, sampai tiba di bintang. Lalu ucapkan bilangan tempat kelinci berhenti.",
    bantuan: "Ketuk kelinci berkali-kali sampai berdiri di bawah bintang. Lalu ucapkan bilangan tempatnya.",
    hasil: "Kelinci mulai dari nol, melompat satu per satu, dan berhenti di tujuh.",
    rangkaian: urut(0, 7),
    tulis: false,
  },
];

function IsiKartuGambarA({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: {
  kartu: KartuGambarA;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const [ada, setAda] = useState<boolean[]>(() =>
    Array.from({ length: 10 }, (_, i) => (kartu.bentuk === "kosong" ? i < 3 : false))
  );
  const [pos, setPos] = useState(0);
  const [lulus, setLulus] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara[kartu.id] === true;
  const terakhir = indeks >= total - 1;
  const jumlahAda = ada.filter(Boolean).length;
  const penuh =
    kartu.bentuk === "kosong" ? jumlahAda === 0 : kartu.bentuk === "isi" ? jumlahAda === kartu.kunci : pos === kartu.kunci;
  useBicara(suara, kartu.hasil);

  const ketukPetak = (i: number) => {
    if (penuh) return;
    const baru = [...ada];
    if (kartu.bentuk === "kosong") {
      if (!baru[i]) return;
      baru[i] = false;
    } else {
      if (baru[i] || i >= kartu.kunci) return;
      baru[i] = true;
    }
    setAda(baru);
    const sisa = baru.filter(Boolean).length;
    if ((kartu.bentuk === "kosong" && sisa === 0) || (kartu.bentuk === "isi" && sisa === kartu.kunci)) letusan.picu();
  };
  const lompat = () => {
    if (pos >= kartu.kunci) return;
    const baru = pos + 1;
    setPos(baru);
    if (baru >= kartu.kunci) letusan.picu();
  };

  const hint = suara ? "Hebat! Lihat rangkaiannya di bawah." : penuh ? kartu.tugasPendek : kartu.bantuan;

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul={kartu.judul} onSuara={() => speakGuru(kartu.suara)} warna="#FDE68A" />
      <CatatanTempel pendek={suara ? "Hebat!" : penuh ? kartu.tugasPendek : kartu.pendekBantu} teks={hint} />

      <div className="relative space-y-3 rounded-lg border-[3px] border-[#6B7280] bg-white/90 p-3 shadow-[3px_4px_0_rgba(0,0,0,0.12)]">
        {kartu.bentuk !== "lompat" ? (
          <BingkaiSepuluh
            ada={ada}
            panduan={kartu.bentuk === "isi" ? kartu.kunci : 0}
            jenis={kartu.jenis}
            onKetuk={ketukPetak}
            nyala={penuh}
          />
        ) : (
          <button
            type="button"
            aria-label="Ketuk kelinci supaya melompat"
            onClick={lompat}
            className="igil-tanpa-tepi block w-full space-y-1 rounded-xl border-2 border-dashed border-[#9CA3AF] bg-white p-1 text-center"
          >
            <GarisNol
              posisi={pos}
              bintang={kartu.kunci}
              sorot={urut(0, pos)}
              busur={Array.from({ length: pos }, (_, i) => ({ dari: i, ke: i + 1 }))}
            />
            <span className={`inline-block text-lg font-black text-[#1C01A5] ${pos < kartu.kunci ? "igil-lompat" : ""}`}>
              {pos < kartu.kunci ? "👆 Ketuk kelinci" : "🌟"}
            </span>
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>

      <JawabSuara id={kartu.id} jumlah={kartu.kunci} panel={panel} siap={penuh} belumSiap="Selesaikan diagramnya dulu, ya." />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-3xl">🌟</p>
          <Rantai deret={kartu.rangkaian} />
        </div>
      ) : null}

      {kartu.tulis ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
          <DottedNumberTracingCanvas
            key={`gambar-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
        </div>
      ) : null}

      <TombolLanjut teks={terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} />
    </>
  );
}

export function PictureBilanganA(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_GAMBAR_A[indeks];
  const terakhir = indeks >= KARTU_GAMBAR_A.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5">
        {KARTU_GAMBAR_A.map((k, i) => (
          <span
            key={k.id}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <IsiKartuGambarA
        key={kartu.id}
        kartu={kartu}
        indeks={indeks}
        total={KARTU_GAMBAR_A.length}
        speakGuru={speakGuru}
        panel={panel}
        lanjut={lanjut}
      />
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract (empat kartu lambang) dan Poin Penting                   */
/* ------------------------------------------------------------------------ */

type KartuLambangA = {
  id: string;
  bentuk: "deret" | "manik";
  deret?: (number | null)[];
  pilihan?: number[];
  kunci: number;
  judul: string;
  pendek: string;
  bantuan: string;
  suara: string;
  salah?: string;
  kalimat: string;
  tulis: boolean;
};

const KARTU_LAMBANG_A: KartuLambangA[] = [
  {
    id: "a-lambang-l1",
    bentuk: "deret",
    deret: [null, 1, 2, 3, 4],
    pilihan: [2, 0, 5],
    kunci: 0,
    judul: "Angka Hilang",
    pendek: "Isi kotak kosong",
    bantuan: "Barisan ini dimulai dari bilangan paling kecil. Pilih angka yang hilang, ucapkan, lalu tulis.",
    suara:
      "Perhatikan barisan bilangan yang dimulai dari bilangan paling kecil. Pilih bilangan yang hilang di kotak kosong, lalu ucapkan dan tulis.",
    salah: "Belum tepat. Bilangan paling kecil adalah bilangan untuk benda yang tidak ada. Coba lagi.",
    kalimat: "Barisan bilangan dimulai dari nol. Nol artinya tidak ada, dan nol adalah bilangan paling kecil.",
    tulis: true,
  },
  {
    id: "a-lambang-l2",
    bentuk: "manik",
    kunci: 8,
    judul: "Rak Manik",
    pendek: "Penuhi rak manik",
    bantuan: "Ketuk rak supaya manik bertambah satu-satu sampai barisnya penuh. Lalu ucapkan dan tulis.",
    suara:
      "Rak manik. Ketuk rak supaya manik bertambah satu per satu sampai semua tempatnya penuh. Lalu ucapkan dan tulis lambangnya.",
    kalimat: "Lima manik di baris atas dan tiga manik di baris bawah menjadi delapan.",
    tulis: true,
  },
  {
    id: "a-lambang-l3",
    bentuk: "manik",
    kunci: 9,
    judul: "Rak Manik",
    pendek: "Penuhi rak manik",
    bantuan: "Ketuk rak supaya manik bertambah satu-satu sampai barisnya penuh. Lalu ucapkan dan tulis.",
    suara:
      "Rak manik. Ketuk rak supaya manik bertambah satu per satu sampai semua tempatnya penuh. Lalu ucapkan dan tulis lambangnya.",
    kalimat: "Lima manik di baris atas dan empat manik di baris bawah menjadi sembilan.",
    tulis: true,
  },
  {
    id: "a-lambang-l4",
    bentuk: "manik",
    kunci: 10,
    judul: "Rak Manik",
    pendek: "Penuhi rak manik",
    bantuan: "Ketuk rak supaya manik bertambah satu-satu sampai kedua barisnya penuh. Lalu ucapkan dan tulis.",
    suara:
      "Rak manik. Ketuk rak supaya manik bertambah satu per satu sampai kedua baris penuh. Lalu ucapkan dan tulis lambangnya.",
    kalimat: "Lima manik di baris atas dan lima manik di baris bawah menjadi sepuluh. Lambangnya angka satu dan nol.",
    tulis: true,
  },
];

function IsiKartuLambangA({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: {
  kartu: KartuLambangA;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const [dipilih, setDipilih] = useState(false);
  const [manik, setManik] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [lulus, setLulus] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara[kartu.id] === true;
  const siap = kartu.bentuk === "deret" ? dipilih : manik >= kartu.kunci;
  useBicara(suara, kartu.kalimat);

  const pilih = (n: number) => {
    if (dipilih) return;
    if (n === kartu.kunci) {
      setDipilih(true);
      setKeliru(null);
      setKabar({ teks: "Angkanya sudah pas! Sekarang ucapkan bilangannya.", ok: true });
    } else {
      setKeliru(n);
      setKabar({ teks: kartu.salah ?? "Belum tepat. Coba lagi.", ok: false });
    }
  };
  const tambahManik = () => {
    if (manik >= kartu.kunci) return;
    const baru = manik + 1;
    setManik(baru);
    if (baru >= kartu.kunci) letusan.picu();
  };

  const hint = suara ? "Hebat! Lihat rangkaiannya di bawah." : siap ? "Sekarang ucapkan bilangannya." : kartu.bantuan;
  const rangkaian = kartu.bentuk === "deret" ? (kartu.deret ?? []).map((n) => n ?? kartu.kunci) : urut(1, kartu.kunci);

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul={kartu.judul} onSuara={() => speakGuru(kartu.suara)} warna="#C7D2FE" />
      <CatatanPensil pendek={suara ? "Hebat!" : siap ? "Ucapkan bilangannya" : kartu.pendek} teks={hint} />

      {kartu.bentuk === "deret" ? (
        <>
          <div className="flex items-center justify-between gap-0.5 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-2">
            {(kartu.deret ?? []).map((n, i) => (
              <React.Fragment key={i}>
                {i > 0 ? (
                  <span className="text-xl font-black text-[#1C01A5]" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <span
                  className={`flex h-14 min-w-0 max-w-[3.2rem] flex-1 items-center justify-center rounded-xl border-4 ${n !== null && n >= 10 ? "text-2xl" : "text-3xl"} font-black text-[#1C01A5] ${
                    n === null
                      ? dipilih
                        ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]"
                        : "border-dashed border-[#1C01A5] bg-[#FFF7CC]"
                      : "border-[#1C01A5] bg-white"
                  }`}
                >
                  {n === null ? (dipilih ? kartu.kunci : "?") : n}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(kartu.pilihan ?? []).map((n) => (
              <button
                key={`${n}-${keliru === n ? "x" : "o"}`}
                type="button"
                aria-label={`Pilih angka ${n}`}
                onClick={() => pilih(n)}
                disabled={dipilih && n !== kartu.kunci}
                className={`rounded-2xl border-4 border-[#1C01A5] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
                  dipilih && n === kartu.kunci ? "bg-[#7FCB96]" : "bg-[#FFE566]"
                } ${keliru === n && !dipilih ? "igil-goyang" : ""}`}
              >
                {n}
              </button>
            ))}
          </div>
          <KabarChip kabar={kabar} />
        </>
      ) : (
        <div className="relative">
          <RakManik isi={manik} kapasitas={kartu.kunci} onKetuk={tambahManik} />
          <Letusan id={letusan.id} />
        </div>
      )}

      <JawabSuara
        id={kartu.id}
        jumlah={kartu.kunci}
        panel={panel}
        siap={siap}
        belumSiap={kartu.bentuk === "deret" ? "Pilih angka yang hilang dulu, ya." : "Penuhi rak manik dulu, ya."}
      />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-3xl">🌟</p>
          <Rantai deret={rangkaian} />
        </div>
      ) : null}

      {kartu.tulis ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
          <DottedNumberTracingCanvas
            key={`lambang-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
        </div>
      ) : null}

      <TombolLanjut teks={indeks >= total - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} />
    </>
  );
}

const SUARA_POIN =
  "Ingat selalu! Nol artinya tidak ada benda sama sekali, dan lambangnya 0. Hitung benda satu per satu dari satu sampai sepuluh. Nol adalah bilangan paling kecil, dan sepuluh paling besar di sini. Kelompok yang lebih banyak bilangannya lebih besar.";

const POIN_A = [
  {
    ikon: <IkonKeranjang kelas="h-9 w-9" />,
    nama: "Nol: tidak ada",
    suara: "Nol artinya tidak ada benda sama sekali. Keranjang kosong banyaknya nol, dan lambangnya 0.",
    deret: [0],
    warna: "#FFFFFF",
  },
  {
    ikon: <span className="text-3xl">👆</span>,
    nama: "Hitung satu-satu",
    suara: "Hitung benda satu per satu. Tunjuk, lalu sebut: satu, dua, tiga, empat, lima.",
    deret: [1, 2, 3, 4, 5],
    warna: KUNING,
  },
  {
    ikon: <span className="text-3xl">📏</span>,
    nama: "Dari nol sampai sepuluh",
    suara: "Urutan bilangannya dimulai dari nol, lalu satu, dua, terus sampai sepuluh. Nol paling kecil. Sepuluh paling besar.",
    deret: urut(0, 10),
    warna: "#C7D2FE",
  },
  {
    ikon: <span className="text-3xl">⚖️</span>,
    nama: "Banyak dan sedikit",
    suara: "Kelompok yang lebih banyak punya bilangan yang lebih besar. Kelompok yang lebih sedikit punya bilangan yang lebih kecil. Nol adalah yang paling sedikit.",
    deret: [0, 2, 4, 6],
    warna: "#BBF7D0",
  },
];

function PoinPentingA({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="igil-tanpa-tepi block w-full space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                {p.ikon}
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            <Rantai deret={p.deret} warna={p.warna} />
          </button>
        ))}
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

export function AbstractBilanganA(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_LAMBANG_A.length;
  const kartu = KARTU_LAMBANG_A[Math.min(indeks, KARTU_LAMBANG_A.length - 1)];
  const langkahTotal = KARTU_LAMBANG_A.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan kata" warna="#1C01A5" />
      <div className="flex items-center gap-1.5">
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      {poin ? (
        <PoinPentingA
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <IsiKartuLambangA
          key={kartu.id}
          kartu={kartu}
          indeks={indeks}
          total={KARTU_LAMBANG_A.length}
          speakGuru={speakGuru}
          panel={panel}
          lanjut={lanjut}
        />
      )}
    </BingkaiTahap>
  );
}