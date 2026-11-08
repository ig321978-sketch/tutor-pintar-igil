"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useEffect, useMemo, useState } from "react";
import { TeksCerita, WARNA_ADA, WARNA_DATANG, BarisTitik } from "./diagram-pictorial";
import {
  GameRonde,
  IgilBicara,
  KERTAS_ANGKA,
  KERTAS_GAMBAR,
  Persamaan,
  PilihAngka,
  TOMBOL_KECIL,
  kataK,
  opsiTiga,
  ucapTambah,
  type PropsLangkah,
} from "./SubBabA2Penjumlahan";
import { opsiKurang, ucapKurang } from "./SubBabA3Pengurangan";
import {
  KabarChip,
  Letusan,
  PanelPoster,
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
import {
  GelasSVG,
  KaosSVG,
  KelinciSVG,
  SegitigaBilangan,
  WARNA_COKELAT,
  WARNA_HITAM,
} from "./gambar-hubungan-c3";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab C: Hubungan Penjumlahan dan Pengurangan (Buku Siswa Kelas 1  */
/* hlm. 101-105). Semua di klien, tanpa API. Naskah: naskah/mtk-1-bab3-sub-c- */
/* hubungan.md.                                                               */
/*                                                                            */
/* Gagasan: tiga bilangan membentuk satu keluarga. Dari keluarga itu lahir    */
/* dua penjumlahan dan dua pengurangan. Pengurangan adalah kebalikan dari     */
/* penjumlahan, jadi bisa dipakai untuk memeriksa dan mencari angka hilang.   */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Kelinci Masuk Kandang (ketuk dan tukar tempat), 2 Kaos Diambil */
/*            dan Dikembalikan (periksa), 3 Seret Kartu ke Kandang (seret),    */
/*            4 Gelas Penutup (ketuk dan cari yang hilang).                    */
/*  Picture:  (diagram saja, tanpa gambar benda)                              */
/*            5 Segitiga Keluarga (isi sudut), 6 Garis Bilangan Pergi dan      */
/*            Pulang (maju lalu mundur), 7 Tabel Empat Kalimat (isi sel).      */
/*  Abstract: 8 Lingkari Hasil yang Sama, 9 Cari yang Hilang,                  */
/*            10 Tanda dan Susun Kalimat.                                      */
/* ------------------------------------------------------------------------ */

type Isi = number | "?" | null;

const Tambah = (p: { a: Isi; b: Isi; c: Isi; kecil?: boolean; nyala?: number[] }) => (
  <Persamaan a={p.a} b={p.b} c={p.c} t1="+" kecil={p.kecil} nyala={p.nyala} />
);
const Kurang = (p: { a: Isi; b: Isi; c: Isi; kecil?: boolean; nyala?: number[] }) => (
  <Persamaan a={p.a} b={p.b} c={p.c} t1="−" kecil={p.kecil} nyala={p.nyala} />
);

const TINTA = "#1C01A5";
const MERAH_BOLA = "#EF4444";
const BIRU_BOLA = "#38BDF8";
const KUNING_KAOS = "#FACC15";
const PINK_KAOS = "#F472B6";

function BolaS({ warna, kelas = "h-11 w-11" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`block ${kelas}`} aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill={warna} stroke={TINTA} strokeWidth="2.6" />
      <path d="M10 17 Q12 9 21 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Kalimat ringkas satu baris, muat dua sejajar di layar ponsel. Nyala memakai indeks 0 sampai 4. */
export function Kalimat({ a, t, b, c, nyala = [] }: { a: Isi; t: string; b: Isi; c: Isi; nyala?: number[] }) {
  const tok: (Isi | string)[] = [a, t, b, "=", c];
  const baca = tok.map((x) => (x === null ? "kosong" : x === "?" ? "tanda tanya" : x)).join(" ");
  return (
    <span
      role="img"
      aria-label={`Kalimat matematika: ${baca}`}
      className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-xl border-[3px] border-[#1C01A5] bg-white px-2 py-1 text-xl font-black leading-none text-[#1C01A5]"
    >
      {tok.map((x, i) => (
        <span key={i} className={nyala.includes(i) ? "igil-denyut rounded-md bg-[#FFE566] px-1 ring-2 ring-[#F0AB00]" : ""}>
          {x === null ? "" : x}
        </span>
      ))}
    </span>
  );
}
export const KT = (p: { a: Isi; b: Isi; c: Isi; nyala?: number[] }) => <Kalimat a={p.a} t="+" b={p.b} c={p.c} nyala={p.nyala} />;
export const KK = (p: { a: Isi; b: Isi; c: Isi; nyala?: number[] }) => <Kalimat a={p.a} t="−" b={p.b} c={p.c} nyala={p.nyala} />;

/**
 * Empat kalimat satu keluarga, disusun seperti tabel buku hlm. 102:
 * kiri dua penjumlahan, kanan dua pengurangan. `sembunyi` memuat indeks sel yang hasilnya ditutup.
 */
function Keluarga4({ a, b, g, sembunyi = [] }: { a: number; b: number; g: number; sembunyi?: number[] }) {
  const t = (i: number, v: number): Isi => (sembunyi.includes(i) ? "?" : v);
  return (
    <div className="grid grid-cols-2 justify-items-center gap-x-1 gap-y-1.5" role="group" aria-label="Empat kalimat satu keluarga bilangan">
      <KT a={a} b={b} c={t(0, g)} nyala={sembunyi.includes(0) ? [4] : []} />
      <KK a={g} b={b} c={t(1, a)} nyala={sembunyi.includes(1) ? [4] : []} />
      <KT a={b} b={a} c={t(2, g)} nyala={sembunyi.includes(2) ? [4] : []} />
      <KK a={g} b={a} c={t(3, b)} nyala={sembunyi.includes(3) ? [4] : []} />
    </div>
  );
}

/** Garis bilangan 0 sampai 10 yang tidak bisa diketuk. Busur biru di atas untuk maju, busur merah di bawah untuk mundur. */
function GarisPulangStatik({ mulai, langkah }: { mulai: number; langkah: number }) {
  const cx = (n: number) => (n + 0.5) * 30;
  return (
    <svg
      viewBox="0 0 330 102"
      className="mx-auto block h-auto w-full max-w-[330px]"
      role="img"
      aria-label={`Garis bilangan: maju ${langkah} langkah dari ${mulai} sampai ${mulai + langkah}, lalu mundur ${langkah} langkah kembali ke ${mulai}`}
    >
      {Array.from({ length: langkah }, (_, h) => (
        <path
          key={`maju${h}`}
          d={`M ${cx(mulai + h)} 38 Q ${(cx(mulai + h) + cx(mulai + h + 1)) / 2} -4 ${cx(mulai + h + 1)} 38`}
          fill="none"
          stroke={WARNA_DATANG}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
      {Array.from({ length: langkah }, (_, h) => (
        <path
          key={`mundur${h}`}
          d={`M ${cx(mulai + langkah - h)} 64 Q ${(cx(mulai + langkah - h) + cx(mulai + langkah - h - 1)) / 2} 106 ${cx(mulai + langkah - h - 1)} 64`}
          fill="none"
          stroke={WARNA_ADA}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
      <line x1="2" y1="51" x2="328" y2="51" stroke={TINTA} strokeWidth="2" />
      {Array.from({ length: 11 }, (_, n) => (
        <g key={n}>
          <circle cx={cx(n)} cy="51" r="12" fill={n === mulai ? "#FFE566" : n === mulai + langkah ? WARNA_DATANG : "#FFFFFF"} stroke={TINTA} strokeWidth="2.4" />
          <text x={cx(n)} y="56" textAnchor="middle" fontSize="14" fontWeight="900" fill={TINTA}>
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman hubungan penjumlahan dan pengurangan. Ada delapan panel. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_C3 = [
  {
    ikon: "↩️",
    nama: "Kebalikan",
    ket: "Kurang membalik tambah",
    suara: "Pengurangan adalah kebalikan dari penjumlahan. Kalau tiga tambah empat sama dengan tujuh, maka tujuh kurang tiga sama dengan empat.",
  },
  {
    ikon: "🔍",
    nama: "Periksa",
    ket: "Balik operasinya",
    suara: "Periksa jawabanmu dengan membalik operasinya. Hasil pengurangan ditambah yang dikurangi harus sama dengan bilangan awal.",
  },
];

const LANGKAH_TEMAN = [
  { ikon: "🤝", nama: "Cari teman", ket: "Bekerja berdua" },
  { ikon: "🧸", nama: "Ambil benda", ket: "Satu kelompok benda" },
  { ikon: "➕", nama: "Gabungkan", ket: "Dengan benda temanmu" },
  { ikon: "📖", nama: "Buat dua cerita", ket: "Tambah, lalu kurang" },
  { ikon: "🗣️", nama: "Jelaskan hubungannya", ket: "Sampaikan hasilmu" },
];

export function InfografisHubunganC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Hubungan Tambah dan Kurang</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="KELUARGA BILANGAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Satu keluarga bilangan terdiri dari tiga bilangan. Ada empat kelinci cokelat dan tiga kelinci hitam. Jika digabung, semuanya tujuh kelinci. Empat, tiga, dan tujuh adalah satu keluarga. Tujuh adalah yang terbesar. Empat dan tiga adalah sebagian."
      >
        <div className="space-y-2 text-center">
          <div className="flex flex-wrap items-end justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            {Array.from({ length: 4 }, (_, i) => (
              <KelinciSVG key={`c${i}`} warna={WARNA_COKELAT} kelas="h-9 w-8" />
            ))}
            <span className="px-1 text-2xl font-black text-[#1C01A5]">+</span>
            {Array.from({ length: 3 }, (_, i) => (
              <KelinciSVG key={`h${i}`} warna={WARNA_HITAM} kelas="h-9 w-8" />
            ))}
          </div>
          <SegitigaBilangan g={7} a={4} b={3} nama kelas="w-full max-w-[190px]" />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="DUA TAMBAH, DUA KURANG"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Dari satu keluarga bilangan ada empat kalimat. Dua penjumlahan: empat tambah tiga sama dengan tujuh, dan tiga tambah empat sama dengan tujuh. Dua pengurangan: tujuh kurang tiga sama dengan empat, dan tujuh kurang empat sama dengan tiga."
      >
        <div className="space-y-1.5 text-center">
          <div className="grid grid-cols-2 gap-1 text-xs font-black text-[#1C01A5]/75">
            <span>Penjumlahan</span>
            <span>Pengurangan</span>
          </div>
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Keluarga4 a={4} b={3} g={7} />
          </div>
          <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">Bilangan terbesar ditulis paling depan pada pengurangan.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="KEBALIKAN"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Pengurangan adalah kebalikan dari penjumlahan. Mulai dari empat, maju tiga langkah, sampai di tujuh. Empat tambah tiga sama dengan tujuh. Lalu mundur tiga langkah, kita kembali ke empat. Tujuh kurang tiga sama dengan empat. Maju, lalu mundur sama banyak, kita pulang ke tempat semula."
      >
        <div className="space-y-2 text-center">
          <GarisPulangStatik mulai={4} langkah={3} />
          <div className="grid grid-cols-2 items-center justify-items-center gap-1">
            <KT a={4} b={3} c={7} />
            <KK a={7} b={3} c={4} />
          </div>
          <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">
            Biru: maju (tambah). Merah: mundur (kurang).
          </p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="TUKAR TEMPAT"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Pada penjumlahan, dua kelompok boleh bertukar tempat. Empat tambah tiga sama dengan tujuh. Tiga tambah empat juga sama dengan tujuh. Jumlahnya tetap sama. Tetapi pengurangan tidak boleh bertukar tempat. Tujuh kurang tiga bisa dihitung. Tiga kurang tujuh tidak bisa, karena tiga lebih sedikit dari tujuh."
      >
        <div className="space-y-2 text-center">
          <div className="space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            <div className="flex items-center justify-center gap-1">
              <BarisTitik n={4} warna={WARNA_ADA} kelas="shrink-0" />
              <span className="text-lg font-black text-[#1C01A5]">+</span>
              <BarisTitik n={3} warna={WARNA_DATANG} kelas="shrink-0" />
            </div>
            <div className="flex items-center justify-center gap-1">
              <BarisTitik n={3} warna={WARNA_DATANG} kelas="shrink-0" />
              <span className="text-lg font-black text-[#1C01A5]">+</span>
              <BarisTitik n={4} warna={WARNA_ADA} kelas="shrink-0" />
            </div>
            <p className="text-sm font-black text-[#1C01A5]">Jumlahnya sama: 7 ✅</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1 rounded-2xl border-4 border-[#16A34A] bg-[#F0FDF4] px-1 py-1.5">
              <KK a={7} b={3} c={4} />
              <p className="text-[11px] font-black text-[#14532D]">bisa dihitung</p>
            </div>
            <div className="rounded-2xl border-4 border-[#DC2626] bg-[#FEF2F2] px-1 py-1.5">
              <p className="text-2xl font-black leading-none text-[#1C01A5]">3 − 7</p>
              <p className="text-[11px] font-black text-[#991B1B]">tidak bisa ❌</p>
            </div>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="PERIKSA DENGAN KEBALIKAN"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Kita bisa memeriksa jawaban dengan membalik operasinya. Sembilan kurang empat sama dengan lima. Periksa: lima tambah empat sama dengan sembilan. Cocok. Tiga tambah lima sama dengan delapan. Periksa: delapan kurang lima sama dengan tiga. Cocok."
      >
        <div className="space-y-2">
          {[
            { soal: <KK a={9} b={4} c={5} />, cek: <KT a={5} b={4} c={9} /> },
            { soal: <KT a={3} b={5} c={8} />, cek: <KK a={8} b={5} c={3} /> },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
              {r.soal}
              <span className="text-xl font-black text-[#16A34A]" aria-hidden="true">
                ✅
              </span>
              {r.cek}
            </div>
          ))}
          <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]/80">Kiri: soal. Kanan: pemeriksa.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="CARI YANG HILANG"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Untuk mencari angka yang hilang, pakai kebalikan. Enam tambah berapa sama dengan sembilan? Hitung sembilan kurang enam sama dengan tiga. Berapa dikurangi lima sama dengan dua? Hitung dua tambah lima sama dengan tujuh. Sembilan kurang berapa sama dengan tujuh? Hitung sembilan kurang tujuh sama dengan dua."
      >
        <div className="space-y-1.5">
          {[
            { soal: <KT a={6} b="?" c={9} nyala={[2]} />, cara: <KK a={9} b={6} c={3} /> },
            { soal: <KK a="?" b={5} c={2} nyala={[0]} />, cara: <KT a={2} b={5} c={7} /> },
            { soal: <KK a={9} b="?" c={7} nyala={[2]} />, cara: <KK a={9} b={7} c={2} /> },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5 text-center">
              {r.soal}
              <span className="text-lg font-black text-[#1C01A5]" aria-hidden="true">
                →
              </span>
              {r.cara}
            </div>
          ))}
          <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]/80">Kiri: soal. Kanan: cara mencarinya.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="PILIH TANDA"
        warna="#9333EA"
        speakGuru={speakGuru}
        suara="Memilih tanda tambah atau kurang. Lihat hasilnya. Empat berapa empat sama dengan delapan. Hasil delapan lebih besar dari empat, jadi tandanya tambah. Tujuh berapa tiga sama dengan empat. Hasil empat lebih kecil dari tujuh, jadi tandanya kurang."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Kalimat a={4} t="?" b={4} c={8} nyala={[1]} />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">8 lebih besar dari 4, jadi tandanya +</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Kalimat a={7} t="?" b={3} c={4} nyala={[1]} />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">4 lebih kecil dari 7, jadi tandanya −</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="AYO MENCOBA BERSAMA TEMAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Ayo mencoba bersama teman. Satu, cari seorang teman sebagai pasangan. Dua, ambil sekelompok benda. Tiga, gabungkan dengan benda milik temanmu. Empat, buat cerita penjumlahan dan cerita pengurangannya. Lima, tulis operasi penjumlahan dan operasi pengurangan. Enam, jelaskan hubungannya, lalu sampaikan hasil kalian."
      >
        <div className="space-y-1.5">
          {LANGKAH_TEMAN.map((c, i) => (
            <div key={c.nama} className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-xl" aria-hidden="true">
                {c.ikon}
              </span>
              <p className="min-w-0 text-sm font-black leading-tight text-[#1C01A5]">
                {i + 1}. {c.nama}
                <span className="block text-[11px] font-black text-[#1C01A5]/75">{c.ket}</span>
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_C3.map((g) => (
            <button
              key={g.nama}
              type="button"
              aria-label={`Dengarkan: ${g.nama}`}
              onClick={() => speakGuru(g.suara)}
              className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl bg-[#F0FDF4] px-1 py-2 text-center"
            >
              <span className="text-3xl">{g.ikon}</span>
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
/* Tahap 4: Concrete. Empat permainan dengan benda yang bisa dipegang.        */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 1. Kelinci Masuk Kandang (hlm. 101) ------------------ */

const RONDE_KANDANG = [
  { a: 4, b: 3 },
  { a: 5, b: 3 },
];

function RondeKandang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KANDANG[ronde];
  const c = d.a + d.b;
  const [masuk, setMasuk] = useState<boolean[]>(() => Array.from({ length: c }, () => false));
  const [benarJumlah, setBenarJumlah] = useState(false);
  const [ditukar, setDitukar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const semua = masuk.every(Boolean);
  const akhir = ronde === RONDE_KANDANG.length - 1;
  const suara = panel.suara["c3-kandang"] === true && akhir;
  const tampilC = akhir ? suara : benarJumlah;
  const siapTukar = semua && (akhir || benarJumlah) && !ditukar;
  useBicara(akhir ? suara : ditukar, `${ucapTambah(d.a, d.b, c)}. ${ucapTambah(d.b, d.a, c)}.`);

  const warnaKe = (i: number) => (i < d.a ? WARNA_COKELAT : WARNA_HITAM);
  const nCok = masuk.filter((m, i) => m && i < d.a).length;
  const nHit = masuk.filter((m, i) => m && i >= d.a).length;
  const idxCok = Array.from({ length: d.a }, (_, i) => i);
  const idxHit = Array.from({ length: d.b }, (_, i) => d.a + i);
  const urutPen = (ditukar ? [...idxHit, ...idxCok] : [...idxCok, ...idxHit]).filter((i) => masuk[i]);

  const masukkan = (i: number) => {
    if (masuk[i]) return;
    const baru = masuk.slice();
    baru[i] = true;
    setMasuk(baru);
    setKabar(null);
  };

  const pilihJumlah = (n: number) => {
    if (benarJumlah) return;
    if (n === c) {
      setBenarJumlah(true);
      setKeliru(null);
      setKabar(null);
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung semua kelinci di kandang, ya.", ok: false });
    }
  };

  const tukar = () => {
    setDitukar(true);
    letusan.picu();
    onBeres();
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : ditukar ? (akhir ? "Ucapkan: jumlah kelinci" : "Hebat! Jumlahnya tetap sama.") : siapTukar ? "Ayo tukar tempat!" : semua ? "Hitung semuanya!" : "Ketuk kelinci masuk kandang!"}
        teks={`Ada ${kataK(d.a)} kelinci cokelat dan ${kataK(d.b)} kelinci hitam. Ketuk tiap kelinci supaya masuk ke kandang. Setelah semua masuk, hitung jumlahnya. Lalu tukar tempat kelompok kelinci, dan lihat apakah jumlahnya tetap sama.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {d.a} kelinci cokelat dan {d.b} kelinci hitam.
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#DCFCE7] px-2 pb-2 pt-1 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">🌱 Halaman</p>
          <div className="flex min-h-[64px] flex-wrap items-end justify-center gap-1">
            {masuk.map((m, i) =>
              m ? null : (
                <button
                  key={i}
                  type="button"
                  aria-label={`Kelinci ${i < d.a ? "cokelat" : "hitam"} ke-${i < d.a ? i + 1 : i - d.a + 1}, ketuk supaya masuk kandang`}
                  onClick={() => masukkan(i)}
                  className="igil-tanpa-tepi"
                >
                  <KelinciSVG warna={warnaKe(i)} />
                </button>
              )
            )}
            {semua ? <span className="pb-3 text-sm font-black text-[#1C01A5]/70">Semua sudah masuk</span> : null}
          </div>
        </div>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7ED] px-2 pb-2 pt-1 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">🏠 Kandang</p>
          <div className="flex min-h-[64px] flex-wrap items-end justify-center gap-1" aria-live="polite">
            {urutPen.map((i) => (
              <span key={`${ditukar ? "t" : "a"}-${i}`} className="igil-muncul">
                <KelinciSVG warna={warnaKe(i)} kelas="h-12 w-10" />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Cokelat {nCok}</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#E5E7EB] px-3 py-0.5 text-sm font-black text-[#1C01A5]">Hitam {nHit}</span>
        </div>
        {semua ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <p className="mb-1 text-center text-xs font-black text-[#1C01A5]/70">
                {ditukar ? "Kelompok sudah bertukar tempat." : "Gabungkan dua kelompok kelinci."}
              </p>
              <div className="space-y-1.5">
                <Tambah a={d.a} b={d.b} c={tampilC ? c : "?"} nyala={tampilC || akhir ? [] : [4]} />
                {ditukar ? <Tambah a={d.b} b={d.a} c={tampilC ? c : "?"} /> : null}
              </div>
            </div>
            {!akhir && !benarJumlah ? <PilihAngka opsi={opsiTiga(c)} keliru={keliru} onPilih={pilihJumlah} /> : null}
            {siapTukar ? (
              <button type="button" onClick={tukar} className={TOMBOL_KECIL}>
                🔄 Tukar tempat
              </button>
            ) : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKandang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kelinci Masuk Kandang"
      warna="#BBF7D0"
      petunjuk="Ketuk tiap kelinci supaya masuk ke kandang. Hitung jumlah semuanya. Lalu tukar tempat dua kelompok kelinci dan lihat bahwa jumlahnya tetap sama. Pada soal terakhir, ucapkan jumlah semua kelinci."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-kandang"
      jumlahRonde={RONDE_KANDANG.length}
      kunciAkhir={8}
      belumSiap="Masukkan semua kelinci dan tukar tempat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKandang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Kaos Diambil dan Dikembalikan (hlm. 103) ---------- */

const RONDE_KAOS = [
  { k: 3, p: 2 },
  { k: 5, p: 3 },
];

function RondeKaos({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KAOS[ronde];
  const t = d.k + d.p;
  const [pos, setPos] = useState<("tali" | "keranjang")[]>(() => Array.from({ length: d.p }, () => "tali"));
  const [jawab, setJawab] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const diKeranjang = pos.filter((x) => x === "keranjang").length;
  const tahap = !jawab ? (diKeranjang < d.p ? 0 : 1) : diKeranjang > 0 ? 2 : 3;
  const beres = tahap === 3;
  const akhir = ronde === RONDE_KAOS.length - 1;
  const suara = panel.suara["c3-kaos"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${ucapKurang(t, d.p, d.k)}. ${ucapTambah(d.k, d.p, t)}.`);

  const ketukTali = (j: number) => {
    if (tahap !== 0) {
      setKabar({ teks: tahap === 1 ? "Kaos sudah diambil. Pilih sisanya dulu." : "Kaos itu tidak perlu diambil lagi.", ok: false });
      return;
    }
    const baru = pos.slice();
    baru[j] = "keranjang";
    setPos(baru);
    setKabar(null);
  };
  const ketukKuning = () => setKabar({ teks: "Yang diambil kaos merah muda saja. Kaos kuning tetap di tali.", ok: false });
  const ketukKeranjang = (j: number) => {
    if (tahap !== 0 && tahap !== 2) return;
    const baru = pos.slice();
    baru[j] = "tali";
    setPos(baru);
    setKabar(null);
    if (tahap === 2 && baru.every((x) => x === "tali")) {
      letusan.picu();
      onBeres();
    }
  };
  const pilihSisa = (n: number) => {
    if (jawab) return;
    if (n === d.k) {
      setJawab(true);
      setKeliru(null);
      setKabar(null);
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung kaos kuning yang masih di tali, ya.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlah semua kaos" : "Hebat! Jumlahnya kembali.") : tahap === 2 ? "Gantung kembali kaosnya!" : tahap === 1 ? "Berapa kaos yang tersisa?" : "Ambil kaos merah muda!"}
        teks={`Ada ${kataK(t)} kaos di tali jemuran. ${kata(d.k)} kaos kuning dan ${kataK(d.p)} kaos merah muda. Ketuk kaos merah muda untuk mengambilnya. Pilih berapa kaos yang tersisa di tali. Lalu gantung kembali kaos yang diambil, dan periksa apakah jumlahnya sama seperti semula.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {t} kaos di tali. {d.p} kaos merah muda diambil.
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#E0F2FE] px-2 pb-2 pt-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <div className="mb-1 h-1.5 rounded-full bg-[#1C01A5]/70" aria-hidden="true" />
          <div className="flex min-h-[56px] flex-wrap items-start justify-center gap-1.5">
            {Array.from({ length: d.k }, (_, i) => (
              <button key={`k${i}`} type="button" aria-label={`Kaos kuning ke-${i + 1}`} onClick={ketukKuning} className="igil-tanpa-tepi">
                <KaosSVG warna={KUNING_KAOS} />
              </button>
            ))}
            {pos.map((x, j) =>
              x === "tali" ? (
                <button
                  key={`p${j}`}
                  type="button"
                  aria-label={`Kaos merah muda ke-${j + 1}, ketuk untuk mengambil`}
                  onClick={() => ketukTali(j)}
                  className="igil-tanpa-tepi"
                >
                  <KaosSVG warna={PINK_KAOS} />
                </button>
              ) : (
                <span key={`p${j}`} className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-[#1C01A5]/40" aria-hidden="true" />
              )
            )}
          </div>
        </div>
        <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] p-2">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">🧺 Keranjang • {diKeranjang}</p>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-1">
            {pos.map((x, j) =>
              x === "keranjang" ? (
                <button
                  key={j}
                  type="button"
                  aria-label={`Kaos merah muda di keranjang${tahap === 2 ? ", ketuk untuk menggantung kembali" : ""}`}
                  disabled={tahap !== 0 && tahap !== 2}
                  onClick={() => ketukKeranjang(j)}
                  className="igil-tanpa-tepi igil-muncul disabled:opacity-60"
                >
                  <KaosSVG warna={PINK_KAOS} kelas="h-10 w-10" />
                </button>
              ) : null
            )}
          </div>
        </div>
        {tahap >= 1 ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <p className="mb-1 text-center text-xs font-black text-[#1C01A5]/70">
                {t} − {d.p}: berapa kaos yang tersisa di tali?
              </p>
              <Kurang a={t} b={d.p} c={jawab ? d.k : "?"} nyala={jawab ? [] : [4]} />
            </div>
            {tahap === 1 ? <PilihAngka opsi={opsiKurang(d.k)} keliru={keliru} onPilih={pilihSisa} /> : null}
          </div>
        ) : null}
        {tahap >= 2 ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="mb-1 text-center text-sm font-black text-[#1C01A5]">
              {beres ? "Periksa dengan menambah:" : `Gantung kembali ${d.p} kaos merah muda.`}
            </p>
            {beres ? <Tambah a={d.k} b={d.p} c={bukaC ? t : "?"} /> : null}
            {beres && bukaC ? <p className="pt-1 text-center text-sm font-black text-[#14532D]">Sama seperti semula. Jawabanmu benar! ✅</p> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKaos({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kaos Diambil dan Dikembalikan"
      warna="#FBCFE8"
      petunjuk="Ketuk kaos merah muda untuk mengambilnya dari tali. Pilih berapa kaos yang tersisa. Lalu gantung kembali kaos yang diambil. Tambahkan lagi, jumlahnya harus sama seperti semula. Pada soal terakhir, ucapkan jumlah semua kaos."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-kaos"
      jumlahRonde={RONDE_KAOS.length}
      kunciAkhir={8}
      belumSiap="Ambil, hitung sisanya, dan gantung kembali semua kaos dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKaos ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Seret Kartu ke Kandang (hlm. 101-102) ------------- */

type JenisBenda = "kelinci" | "bola";
const RONDE_SERET: { jenis: JenisBenda; a: number; b: number; na: string; nb: string; wa: string; wb: string }[] = [
  { jenis: "kelinci", a: 4, b: 3, na: "cokelat", nb: "hitam", wa: WARNA_COKELAT, wb: WARNA_HITAM },
  { jenis: "bola", a: 5, b: 3, na: "merah", nb: "biru", wa: MERAH_BOLA, wb: BIRU_BOLA },
];
/** Urutan kartu di atas dibuat berbeda dari urutan tempatnya. */
const URUT_KARTU = [2, 0, 3, 1];

function Benda({ jenis, warna, mati = false }: { jenis: JenisBenda; warna: string; mati?: boolean }) {
  return (
    <span className={mati ? "opacity-40" : ""}>
      {jenis === "kelinci" ? <KelinciSVG warna={warna} kelas="h-8 w-7" /> : <BolaS warna={warna} kelas="h-6 w-6" />}
    </span>
  );
}

function GambarSlot({ i, d }: { i: number; d: (typeof RONDE_SERET)[number] }) {
  const grup = (n: number, warna: string, mati = false) =>
    Array.from({ length: n }, (_, k) => <Benda key={`${warna}-${k}`} jenis={d.jenis} warna={warna} mati={mati} />);
  return (
    <span className="relative flex flex-wrap items-end justify-center gap-0.5">
      {i === 0 ? (
        <>
          {grup(d.a, d.wa)}
          <span className="px-0.5 text-lg font-black text-[#1C01A5]">+</span>
          {grup(d.b, d.wb)}
        </>
      ) : null}
      {i === 1 ? (
        <>
          {grup(d.b, d.wb)}
          <span className="px-0.5 text-lg font-black text-[#1C01A5]">+</span>
          {grup(d.a, d.wa)}
        </>
      ) : null}
      {i === 2 ? (
        <>
          {grup(d.a, d.wa)}
          <span className="relative flex items-end gap-0.5">
            {grup(d.b, d.wb, true)}
            <span className="absolute left-0 right-0 top-1/2 h-[3px] -rotate-6 rounded bg-[#E11D48]" aria-hidden="true" />
          </span>
        </>
      ) : null}
      {i === 3 ? (
        <>
          <span className="relative flex items-end gap-0.5">
            {grup(d.a, d.wa, true)}
            <span className="absolute left-0 right-0 top-1/2 h-[3px] -rotate-6 rounded bg-[#E11D48]" aria-hidden="true" />
          </span>
          {grup(d.b, d.wb)}
        </>
      ) : null}
    </span>
  );
}

function RondeSeret({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_SERET[ronde];
  const g = d.a + d.b;
  const [penuh, setPenuh] = useState<boolean[]>(() => [false, false, false, false]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = penuh.every(Boolean);
  const akhir = ronde === RONDE_SERET.length - 1;
  const suara = panel.suara["c3-seret"] === true && akhir;
  const buka = !akhir || suara;
  useBicara(
    akhir ? suara : beres,
    `${ucapTambah(d.a, d.b, g)}. ${ucapTambah(d.b, d.a, g)}. ${ucapKurang(g, d.b, d.a)}. ${ucapKurang(g, d.a, d.b)}.`
  );

  const teksKartu = (k: number) => {
    if (k === 0) return `${d.a} + ${d.b} = ${g}`;
    if (k === 1) return `${d.b} + ${d.a} = ${g}`;
    if (k === 2) return `${g} − ${d.b} = ${buka ? d.a : "?"}`;
    return `${g} − ${d.a} = ${buka ? d.b : "?"}`;
  };
  const labelSlot = [
    `${d.na} + ${d.nb}`,
    `${d.nb} + ${d.na}`,
    `${d.nb} pergi`,
    `${d.na} pergi`,
  ];

  const taruh = (k: number, s: number) => {
    if (penuh[k]) return;
    if (k !== s) {
      setKabar({
        teks: "Kartu itu belum cocok. Lihat gambar dan tandanya: + untuk menggabung, − untuk benda yang pergi.",
        ok: false,
      });
      return;
    }
    const baru = penuh.slice();
    baru[k] = true;
    setPenuh(baru);
    setPilih(null);
    setKabar(null);
    if (baru.every(Boolean)) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: sisa yang tinggal" : "Hebat! Keluarga lengkap.") : "Seret kartu ke kandangnya!"}
        teks={`Ada ${kataK(g)} benda: ${kataK(d.a)} yang ${d.na} dan ${kataK(d.b)} yang ${d.nb}. Seret setiap kartu kalimat ke kandang yang gambarnya cocok, atau ketuk kartu lalu ketuk kandangnya. Kandang dengan tanda tambah menggabung benda. Kandang dengan benda dicoret merah berarti benda itu pergi.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
          {URUT_KARTU.map((k) =>
            penuh[k] ? null : (
              <BendaSeret
                key={k}
                id={String(k)}
                aktif={!penuh[k]}
                label={`Kartu ${teksKartu(k)}`}
                kelas={pilih === k ? "rounded-2xl ring-4 ring-[#F0AB00]" : ""}
                onKetuk={() => setPilih(k)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("c3-slot-")) taruh(k, Number(z.slice(8)));
                }}
              >
                <span className="block rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1.5 text-xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)]">
                  {teksKartu(k)}
                </span>
              </BendaSeret>
            )
          )}
          {beres ? <span className="text-3xl">✅</span> : null}
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[0, 1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              data-zona={`c3-slot-${s}`}
              aria-label={`Kandang ${labelSlot[s]}${penuh[s] ? `, berisi kartu ${teksKartu(s)}` : ", kosong"}`}
              onClick={() => (pilih !== null ? taruh(pilih, s) : undefined)}
              className={`igil-tanpa-tepi flex items-center justify-between gap-2 rounded-3xl border-4 border-[#1C01A5] px-2 py-1.5 text-left ${
                penuh[s] ? "bg-[#BBF7D0]" : "bg-[#FFF7ED]"
              }`}
            >
              <span className="min-w-0 flex-1 space-y-0.5">
                <span className="block text-[11px] font-black uppercase leading-none text-[#1C01A5]/70">{labelSlot[s]}</span>
                <GambarSlot i={s} d={d} />
              </span>
              <span className="w-[112px] shrink-0 rounded-2xl border-4 border-dashed border-[#1C01A5]/40 bg-white px-1 py-2 text-center text-base font-black leading-none text-[#1C01A5]">
                {penuh[s] ? teksKartu(s) : "kartu di sini"}
              </span>
            </button>
          ))}
        </div>
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="mb-1 text-center text-sm font-black text-[#1C01A5]">Satu keluarga: {d.a}, {d.b}, dan {g}.</p>
            <Keluarga4 a={d.a} b={d.b} g={g} sembunyi={buka ? [] : [1]} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahSeret({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Seret Kartu ke Kandang"
      warna="#FDE68A"
      petunjuk="Ada empat kartu kalimat dan empat kandang bergambar. Seret tiap kartu ke kandang yang cocok. Tanda tambah artinya menggabung. Benda dicoret merah artinya benda itu pergi. Pada soal terakhir, hasil pengurangan ditutup. Ucapkan hasil delapan dikurangi tiga."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-seret"
      jumlahRonde={RONDE_SERET.length}
      kunciAkhir={5}
      belumSiap="Letakkan keempat kartu di kandang yang cocok dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSeret ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Gelas Penutup (hlm. 105) -------------------------- */

const RONDE_GELAS = [
  { total: 8, lihat: 5 },
  { total: 6, lihat: 2 },
  { total: 9, lihat: 4 },
];
const WARNA_KELERENG = ["#EF4444", "#38BDF8", "#FACC15", "#34D399"];

function RondeGelas({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_GELAS[ronde];
  const sembunyi = d.total - d.lihat;
  const [angkat, setAngkat] = useState(false);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_GELAS.length - 1;
  const suara = panel.suara["c3-gelas"] === true && akhir;
  const buka = akhir ? suara : benar;
  useBicara(
    akhir ? suara : benar,
    `${ucapTambah(d.lihat, sembunyi, d.total)}. ${ucapKurang(d.total, d.lihat, sembunyi)}.`
  );

  const angkatGelas = () => {
    if (angkat) return;
    setAngkat(true);
    setKabar(null);
    if (akhir) {
      letusan.picu();
      onBeres();
    }
  };
  const pilih = (n: number) => {
    if (benar) return;
    if (n === sembunyi) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung kelereng di bawah gelas tadi, ya.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : angkat ? (akhir ? "Ucapkan: kelereng di gelas" : "Berapa yang tadi tertutup?") : "Ketuk gelasnya!"}
        teks={`Ada ${kataK(d.total)} kelereng semuanya. ${kata(d.lihat)} kelereng kelihatan. Sisanya ditutup gelas. Ketuk gelas untuk mengangkatnya, lalu hitung kelereng yang tadi tertutup. Cocokkan dengan kalimat tambah dan kurang.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Ada {d.total} kelereng. {d.lihat} kelihatan. Sisanya di bawah gelas.
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <div className="flex min-h-[88px] flex-wrap items-end justify-center gap-1.5">
            {Array.from({ length: d.lihat }, (_, i) => (
              <BolaS key={i} warna={WARNA_KELERENG[i % WARNA_KELERENG.length]} />
            ))}
            <button
              type="button"
              aria-label={angkat ? `Gelas sudah diangkat, ada ${sembunyi} kelereng` : "Gelas penutup, ketuk untuk mengangkat"}
              onClick={angkatGelas}
              className="igil-tanpa-tepi relative flex min-h-[72px] min-w-[84px] items-end justify-center"
            >
              <span className="flex flex-wrap items-end justify-center gap-1">
                {Array.from({ length: sembunyi }, (_, i) => (
                  <span key={i} className={angkat ? "igil-muncul" : "opacity-0"}>
                    <BolaS warna={WARNA_KELERENG[(d.lihat + i) % WARNA_KELERENG.length]} kelas="h-9 w-9" />
                  </span>
                ))}
              </span>
              <span
                className="absolute inset-x-0 bottom-0 flex justify-center transition-all duration-500"
                style={{ transform: angkat ? "translateY(-46px) rotate(-18deg)" : undefined, opacity: angkat ? 0.45 : 1 }}
              >
                <GelasSVG />
              </span>
            </button>
          </div>
        </div>
        {angkat ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <p className="mb-1 text-center text-xs font-black text-[#1C01A5]/70">
                {d.lihat} + berapa = {d.total}?
              </p>
              <div className="space-y-1.5">
                <Tambah a={d.lihat} b={buka ? sembunyi : "?"} c={d.total} nyala={buka ? [] : [2]} />
                <Kurang a={d.total} b={d.lihat} c={buka ? sembunyi : "?"} />
              </div>
            </div>
            {!akhir && !benar ? <PilihAngka opsi={opsiKurang(sembunyi)} keliru={keliru} onPilih={pilih} /> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahGelas({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Gelas Penutup"
      warna="#BFDBFE"
      petunjuk="Sebagian kelereng ditutup gelas. Ketuk gelas untuk mengangkatnya, lalu hitung kelereng yang tadi tertutup. Kalimat tambah dan kurang akan menunjukkan hubungannya. Pada soal terakhir, ucapkan banyak kelereng yang tadi tertutup."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-gelas"
      jumlahRonde={RONDE_GELAS.length}
      kunciAkhir={5}
      belumSiap="Angkat gelasnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGelas ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "kandang" | "kaos" | "seret" | "gelas";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "kandang" },
  { nomor: 2, tipe: "kaos" },
  { nomor: 3, tipe: "seret" },
  { nomor: 4, tipe: "gelas" },
];

export function ConcreteHubunganC(props: Umum) {
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
  const dasar = {
    speakGuru,
    lanjut,
    nomor: langkah.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE PICTURE ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, gabung, dan kembalikan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span
            key={l.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "kandang" ? <LangkahKandang {...dasar} /> : null}
        {langkah.tipe === "kaos" ? <LangkahKaos {...dasar} /> : null}
        {langkah.tipe === "seret" ? <LangkahSeret {...dasar} /> : null}
        {langkah.tipe === "gelas" ? <LangkahGelas {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram saja. Tidak ada gambar benda.                    */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Segitiga Keluarga (hlm. 102-103) ------------------ */

type Sudut = "g" | "a" | "b";
const RONDE_SEGITIGA: { g: number; a: number; b: number; sembunyi: Sudut }[] = [
  { g: 7, a: 4, b: 3, sembunyi: "g" },
  { g: 8, a: 5, b: 3, sembunyi: "b" },
  { g: 9, a: 6, b: 3, sembunyi: "a" },
  { g: 10, a: 6, b: 4, sembunyi: "g" },
];

function RondeSegitiga({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_SEGITIGA[ronde];
  const kunci = d[d.sembunyi];
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_SEGITIGA.length - 1;
  const suara = panel.suara["c3-segitiga"] === true && akhir;
  const buka = !akhir || suara;
  useBicara(
    akhir ? suara : benar,
    `${ucapTambah(d.a, d.b, d.g)}. ${ucapTambah(d.b, d.a, d.g)}. ${ucapKurang(d.g, d.b, d.a)}. ${ucapKurang(d.g, d.a, d.b)}.`
  );

  const baris =
    d.sembunyi === "g"
      ? [`Dua sebagiannya ${d.a} dan ${d.b}.`, "Berapa gabungannya?", `${d.a} + ${d.b} = ?`]
      : [`Gabungannya ${d.g}.`, `Satu sebagiannya ${d.sembunyi === "a" ? d.b : d.a}.`, "Berapa sebagian yang lain?"];
  const petunjuk =
    d.sembunyi === "g"
      ? "Dua sudut bawah adalah sebagian. Tambahkan keduanya untuk mendapat puncak."
      : "Puncak adalah gabungan. Kurangi gabungan dengan sebagian yang ada.";

  const pilih = (n: number) => {
    if (benar) return;
    if (n === kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({
        teks: d.sembunyi === "g" ? "Belum tepat. Dua sebagian digabung menjadi puncak." : "Belum tepat. Puncak dikurangi sebagian yang ada.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : benar ? (akhir ? "Ucapkan: kalimat pengurangan terakhir" : "Hebat! Empat kalimat lengkap.") : "Isi sudut yang kosong"}
        teks={`Lihat segitiga keluarga. Puncaknya gabungan, dua sudut bawah sebagian. ${petunjuk} Pilih angka untuk sudut yang kosong. Lalu baca empat kalimat satu keluarga.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={baris} />
        <SegitigaBilangan
          g={d.sembunyi === "g" ? (benar ? d.g : "?") : d.g}
          a={d.sembunyi === "a" ? (benar ? d.a : "?") : d.a}
          b={d.sembunyi === "b" ? (benar ? d.b : "?") : d.b}
          nyala={benar ? [] : [d.sembunyi]}
          nama
          kelas="w-full max-w-[230px]"
        />
        {!benar ? <PilihAngka opsi={opsiKurang(kunci)} keliru={keliru} onPilih={pilih} /> : null}
        {benar ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Satu keluarga, empat kalimat:</p>
            <Keluarga4 a={d.a} b={d.b} g={d.g} sembunyi={buka ? [] : [1]} />
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuSegitiga({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Segitiga Keluarga"
      warna="#C7D2FE"
      petunjuk="Segitiga keluarga punya tiga bilangan. Puncak adalah gabungan, dua sudut bawah adalah sebagian. Pilih angka untuk sudut yang kosong, lalu baca empat kalimat satu keluarga. Pada soal terakhir, ucapkan hasil kalimat pengurangan yang masih bertanda tanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-segitiga"
      jumlahRonde={RONDE_SEGITIGA.length}
      kunciAkhir={6}
      belumSiap="Isi sudut yang kosong dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSegitiga ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Garis Bilangan Pergi dan Pulang (hlm. 102) -------- */

const RONDE_PULANG = [
  { mula: 4, tambah: 3 },
  { mula: 2, tambah: 5 },
  { mula: 5, tambah: 4 },
];

function RondePulang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_PULANG[ronde];
  const puncak = d.mula + d.tambah;
  const [pos, setPos] = useState(d.mula);
  const [fase, setFase] = useState<"pergi" | "pulang">("pergi");
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const maju = fase === "pergi" ? pos - d.mula : d.tambah;
  const mundur = fase === "pulang" ? puncak - pos : 0;
  const beres = fase === "pulang" && pos === d.mula;
  const akhir = ronde === RONDE_PULANG.length - 1;
  const suara = panel.suara["c3-pulang"] === true && akhir;
  const bukaC = !akhir || suara;
  const cx = (n: number) => (n + 0.5) * 30;
  useBicara(
    akhir ? suara : beres,
    `${ucapTambah(d.mula, d.tambah, puncak)}. ${ucapKurang(puncak, d.tambah, d.mula)}. Kita pulang ke angka ${kataK(d.mula)}.`
  );

  const ketuk = (n: number) => {
    if (beres) return;
    if (fase === "pergi") {
      if (n === pos + 1) {
        setPos(n);
        setKabar(null);
        if (n === puncak) {
          setFase("pulang");
          letusan.picu();
        }
      } else if (n <= pos) {
        setKabar({ teks: "Sekarang maju dulu. Ketuk angka tepat di sebelah kanan titik merah.", ok: false });
      } else {
        setKabar({ teks: "Maju satu langkah saja. Ketuk angka tepat di sebelah kanan.", ok: false });
      }
    } else {
      if (n === pos - 1) {
        setPos(n);
        setKabar(null);
        if (n === d.mula) {
          letusan.picu();
          onBeres();
        }
      } else if (n >= pos) {
        setKabar({ teks: "Sekarang pulang. Mundur artinya ke kiri, ke angka yang lebih kecil.", ok: false });
      } else {
        setKabar({ teks: "Mundur satu langkah saja. Ketuk angka tepat di sebelah kiri.", ok: false });
      }
    }
  };

  const ulang = () => {
    setPos(fase === "pergi" ? d.mula : puncak);
    setKabar(null);
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: angka tempat pulang" : "Hebat! Kamu kembali ke awal.") : fase === "pergi" ? "Maju ke kanan!" : "Sekarang pulang ke kiri!"}
        teks={`Titik merah mulai di angka ${kataK(d.mula)}. Maju ${kataK(d.tambah)} langkah ke kanan, satu langkah setiap ketukan. Lalu pulang: mundur ${kataK(d.tambah)} langkah ke kiri. Lihat, kita kembali ke tempat semula.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Mulai di angka ${d.mula}.`, `Maju ${d.tambah} langkah, lalu mundur ${d.tambah} langkah.`, "Di angka berapa kita pulang?"]} />
        <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 pb-1 pt-1">
          <svg viewBox="0 0 330 44" className="block h-auto w-full" aria-hidden="true">
            {Array.from({ length: maju }, (_, h) => (
              <path
                key={h}
                d={`M ${cx(d.mula + h)} 42 Q ${(cx(d.mula + h) + cx(d.mula + h + 1)) / 2} -6 ${cx(d.mula + h + 1)} 42`}
                fill="none"
                stroke={WARNA_DATANG}
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="grid grid-cols-11" role="group" aria-label="Garis bilangan nol sampai sepuluh">
            {Array.from({ length: 11 }, (_, n) => {
              const sini = n === pos;
              const awal = n === d.mula;
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Angka ${n}${sini ? ", titik merah di sini" : awal ? ", titik mulai" : ""}`}
                  disabled={beres}
                  onClick={() => ketuk(n)}
                  className="igil-tanpa-tepi flex h-10 items-center justify-center"
                >
                  <span
                    className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border-[3px] border-[#1C01A5] text-sm font-black leading-none ${
                      sini ? "text-white" : "text-[#1C01A5]"
                    }`}
                    style={{ backgroundColor: sini ? WARNA_ADA : awal ? "#FFE566" : "#FFFFFF" }}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
          <svg viewBox="0 0 330 44" className="block h-auto w-full" aria-hidden="true">
            {Array.from({ length: mundur }, (_, h) => (
              <path
                key={h}
                d={`M ${cx(puncak - h)} 2 Q ${(cx(puncak - h) + cx(puncak - h - 1)) / 2} 50 ${cx(puncak - h - 1)} 2`}
                fill="none"
                stroke={WARNA_ADA}
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <p className="pt-0.5 text-center text-sm font-black text-[#1C01A5]">
            Pergi {maju} dari {d.tambah} • Pulang {mundur} dari {d.tambah}
          </p>
        </div>
        {!beres && (fase === "pergi" ? pos > d.mula : pos < puncak) ? (
          <button type="button" aria-label="Ulangi dari awal" onClick={ulang} className={TOMBOL_KECIL}>
            ↩ Ulangi
          </button>
        ) : null}
        {fase === "pulang" || beres ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Pergi dan pulang:</p>
            <Tambah a={d.mula} b={d.tambah} c={puncak} kecil />
            <Kurang a={puncak} b={d.tambah} c={beres && bukaC ? d.mula : "?"} kecil nyala={beres || !bukaC ? [] : [4]} />
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuPulang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Garis Bilangan: Pergi dan Pulang"
      warna="#FDE68A"
      petunjuk="Titik merah mulai di sebuah angka. Ketuk angka di sebelah kanan, lagi dan lagi, untuk maju. Lalu ketuk angka di sebelah kiri, sebanyak langkah yang sama, untuk pulang. Pada soal terakhir, ucapkan di angka berapa kamu pulang."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-pulang"
      jumlahRonde={RONDE_PULANG.length}
      kunciAkhir={5}
      belumSiap="Maju lalu pulang sampai ke angka awal dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePulang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Tabel Empat Kalimat (hlm. 102) -------------------- */

/** Token kalimat: [bilangan, tanda, bilangan, "=", bilangan]. Posisi kosong memakai indeks 0, 2, atau 4. */
type Kosong = { sel: number; pos: 0 | 2 | 4 };
const RONDE_TABEL: { a: number; b: number; g: number; kosong: Kosong[]; suaraSel?: number }[] = [
  {
    a: 4,
    b: 3,
    g: 7,
    kosong: [
      { sel: 0, pos: 4 },
      { sel: 1, pos: 2 },
      { sel: 2, pos: 0 },
      { sel: 3, pos: 4 },
    ],
  },
  {
    a: 6,
    b: 3,
    g: 9,
    kosong: [
      { sel: 0, pos: 2 },
      { sel: 1, pos: 0 },
      { sel: 2, pos: 4 },
      { sel: 3, pos: 2 },
    ],
  },
  {
    a: 2,
    b: 6,
    g: 8,
    kosong: [
      { sel: 0, pos: 2 },
      { sel: 2, pos: 4 },
      { sel: 3, pos: 2 },
    ],
    suaraSel: 1,
  },
];

function tokenSel(d: { a: number; b: number; g: number }, sel: number): (number | string)[] {
  if (sel === 0) return [d.a, "+", d.b, "=", d.g];
  if (sel === 1) return [d.g, "−", d.b, "=", d.a];
  if (sel === 2) return [d.b, "+", d.a, "=", d.g];
  return [d.g, "−", d.a, "=", d.b];
}

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TABEL[ronde];
  const [terisi, setTerisi] = useState<boolean[]>(() => d.kosong.map(() => false));
  const [aktif, setAktif] = useState<number | null>(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terisi.every(Boolean);
  const akhir = ronde === RONDE_TABEL.length - 1;
  const suara = panel.suara["c3-tabel"] === true && akhir;
  const buka = !akhir || suara;
  useBicara(
    akhir ? suara : beres,
    `${ucapTambah(d.a, d.b, d.g)}. ${ucapKurang(d.g, d.b, d.a)}. ${ucapTambah(d.b, d.a, d.g)}. ${ucapKurang(d.g, d.a, d.b)}.`
  );

  const tray = useMemo(
    () => Array.from(new Set([d.a, d.b, d.g, Math.max(1, d.a - 1), Math.min(10, d.g + 1)])).sort((x, y) => x - y),
    [d.a, d.b, d.g]
  );

  const pilihAngka = (n: number) => {
    if (beres) return;
    if (aktif === null) {
      setKabar({ teks: "Ketuk kotak kosong di tabel dulu, lalu pilih angkanya.", ok: false });
      return;
    }
    const k = d.kosong[aktif];
    const benar = tokenSel(d, k.sel)[k.pos] as number;
    if (n === benar) {
      const baru = terisi.slice();
      baru[aktif] = true;
      setTerisi(baru);
      setKeliru(null);
      setKabar(null);
      const berikut = baru.findIndex((x) => !x);
      setAktif(berikut >= 0 ? berikut : null);
      if (baru.every(Boolean)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(n);
      setKabar({
        teks: k.sel === 1 || k.sel === 3 ? "Belum tepat. Pada pengurangan, bilangan terbesar ada di depan." : "Belum tepat. Pada penjumlahan, dua sebagian digabung menjadi yang terbesar.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: hasil kalimat yang bertanda tanya" : "Hebat! Tabelnya lengkap.") : "Isi kotak yang kosong"}
        teks={`Tabel ini berisi empat kalimat dari satu keluarga: ${kataK(d.a)}, ${kataK(d.b)}, dan ${kataK(d.g)}. Kiri adalah penjumlahan, kanan adalah pengurangan. Ketuk kotak kosong, lalu pilih angka yang cocok dari deretan angka di bawah tabel.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Satu keluarga: ${d.a}, ${d.b}, dan ${d.g}.`, "Lengkapi empat kalimat di tabel.", "Ketuk kotak, lalu pilih angka."]} />
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-1.5" role="group" aria-label="Tabel empat kalimat">
          {[0, 1, 2, 3].map((sel) => {
            const tok = tokenSel(d, sel);
            return (
              <div key={sel} className={`flex items-center justify-center gap-0.5 rounded-xl border-2 px-0.5 py-1.5 ${sel % 2 === 0 ? "border-[#2563EB]/50 bg-[#EFF6FF]" : "border-[#DC2626]/40 bg-[#FEF2F2]"}`}>
                {tok.map((v, p) => {
                  const idxKosong = d.kosong.findIndex((k) => k.sel === sel && k.pos === p);
                  const adaSuara = d.suaraSel === sel && p === 4;
                  if (adaSuara) {
                    return (
                      <span key={p} className="flex h-9 min-w-8 items-center justify-center rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-xl font-black text-[#1C01A5]">
                        {buka ? v : "?"}
                      </span>
                    );
                  }
                  if (idxKosong < 0) {
                    return (
                      <span key={p} className={`flex h-9 items-center justify-center text-xl font-black text-[#1C01A5] ${p % 2 === 1 ? "min-w-5" : "min-w-8"}`}>
                        {v}
                      </span>
                    );
                  }
                  const isi = terisi[idxKosong];
                  return (
                    <button
                      key={p}
                      type="button"
                      aria-label={isi ? `Kotak terisi ${v}` : `Kotak kosong ${idxKosong + 1}${aktif === idxKosong ? ", sedang dipilih" : ""}`}
                      disabled={isi}
                      onClick={() => setAktif(idxKosong)}
                      className={`igil-tanpa-tepi flex h-9 min-w-8 items-center justify-center rounded-lg border-2 text-xl font-black text-[#1C01A5] ${
                        isi ? "border-[#1C01A5] bg-[#BBF7D0]" : aktif === idxKosong ? "igil-denyut border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-dashed border-[#1C01A5]/60 bg-white"
                      }`}
                    >
                      {isi ? v : ""}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        {!beres ? (
          <div className="space-y-1">
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Pilih angka untuk kotak yang menyala:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {tray.map((n) => (
                <button
                  key={`${n}-${keliru === n ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih angka ${n}`}
                  onClick={() => pilihAngka(n)}
                  className={`h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === n ? "igil-goyang" : ""}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {beres ? <p className="igil-muncul text-center text-sm font-black text-[#14532D]">Tabel lengkap! Empat kalimat, satu keluarga. ✅</p> : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Tabel Empat Kalimat"
      warna="#FCA5A5"
      petunjuk="Tabel berisi empat kalimat dari satu keluarga bilangan. Kiri penjumlahan, kanan pengurangan. Ketuk kotak kosong, lalu pilih angka yang cocok. Pada soal terakhir, ucapkan hasil kalimat yang bertanda tanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={2}
      belumSiap="Isi semua kotak kosong dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Picture --------------------------------------------- */

type TipePicture = "segitiga" | "pulang" | "tabel";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "segitiga" },
  { nomor: 6, tipe: "pulang" },
  { nomor: 7, tipe: "tabel" },
];

export function PictureHubunganC(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_PICTURE[indeks];
  const terakhir = indeks >= KARTU_PICTURE.length - 1;

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
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat, isi, dan lompat" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span
            key={k.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "segitiga" ? <KartuSegitiga {...dasar} /> : null}
        {kartu.tipe === "pulang" ? <KartuPulang {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tiga permainan angka dan simbol, lalu Poin Penting.     */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Lingkari Hasil yang Sama (hlm. 104) --------------- */

const RONDE_LINGKARI: { target: number; kartu: { teks: string; nilai: number }[] }[] = [
  {
    target: 5,
    kartu: [
      { teks: "2 + 3", nilai: 5 },
      { teks: "3 + 4", nilai: 7 },
      { teks: "1 + 4", nilai: 5 },
      { teks: "7 − 2", nilai: 5 },
      { teks: "9 − 4", nilai: 5 },
      { teks: "8 − 4", nilai: 4 },
    ],
  },
  {
    target: 4,
    kartu: [
      { teks: "1 + 3", nilai: 4 },
      { teks: "2 + 3", nilai: 5 },
      { teks: "6 − 2", nilai: 4 },
      { teks: "8 − 4", nilai: 4 },
      { teks: "5 − 2", nilai: 3 },
      { teks: "7 − 2", nilai: 5 },
    ],
  },
  {
    target: 8,
    kartu: [
      { teks: "5 + 3", nilai: 8 },
      { teks: "6 + 1", nilai: 7 },
      { teks: "10 − 2", nilai: 8 },
      { teks: "9 − 2", nilai: 7 },
      { teks: "4 + 4", nilai: 8 },
      { teks: "9 − 1", nilai: 8 },
    ],
  },
];

function RondeLingkari({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_LINGKARI[ronde];
  const [dipilih, setDipilih] = useState<boolean[]>(() => d.kartu.map(() => false));
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const total = d.kartu.filter((k) => k.nilai === d.target).length;
  const jumlah = dipilih.filter(Boolean).length;
  const beres = jumlah === total;
  const akhir = ronde === RONDE_LINGKARI.length - 1;
  const suara = panel.suara["c3-lingkari"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Ada ${kataK(total)} kalimat yang hasilnya ${kataK(d.target)}. ${d.kartu
      .filter((k) => k.nilai === d.target)
      .map((k) => k.teks.replace("+", "ditambah").replace("−", "dikurangi"))
      .join(", ")}.`
  );

  const ketuk = (i: number) => {
    if (beres || dipilih[i]) return;
    if (d.kartu[i].nilai !== d.target) {
      setKeliru(i);
      setKabar({ teks: `Hasil ${d.kartu[i].teks} bukan ${d.target}. Hitung lagi, ya.`, ok: false });
      return;
    }
    const baru = dipilih.slice();
    baru[i] = true;
    setDipilih(baru);
    setKeliru(null);
    setKabar(null);
    if (baru.filter(Boolean).length === total) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak kartu yang dilingkari" : "Hebat! Semua tepat.") : `Lingkari yang hasilnya ${d.target}`}
        teks={`Hitung setiap kartu. Ketuk semua kartu yang hasilnya ${kataK(d.target)}. Kartu yang salah akan bergoyang. Setelah semuanya, ucapkan berapa kartu yang kamu lingkari.`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">
          Lingkari operasi yang hasilnya <span className="rounded-full bg-[#FFE566] px-2">{d.target}</span>
        </p>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Kartu operasi hitung">
          {d.kartu.map((k, i) => (
            <button
              key={`${k.teks}-${keliru === i ? "x" : "o"}`}
              type="button"
              aria-label={`Kartu ${k.teks}${dipilih[i] ? `, sudah dilingkari, hasilnya ${d.target}` : ""}`}
              disabled={beres && !dipilih[i]}
              onClick={() => ketuk(i)}
              className={`relative rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-2xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                dipilih[i] ? "bg-[#BBF7D0] ring-4 ring-[#16A34A]" : "bg-white"
              } ${keliru === i ? "igil-goyang" : ""} disabled:opacity-50`}
            >
              {k.teks}
              {dipilih[i] ? <span className="block text-sm text-[#14532D]">= {d.target}</span> : null}
            </button>
          ))}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Dilingkari {jumlah} dari {total}
        </p>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuLingkari({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Lingkari Hasil yang Sama"
      warna="#C7D2FE"
      petunjuk="Hitung setiap kartu operasi. Ketuk semua kartu yang hasilnya sama dengan angka yang diminta. Ada penjumlahan dan pengurangan yang hasilnya sama. Pada soal terakhir, ucapkan berapa kartu yang kamu lingkari."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-lingkari"
      jumlahRonde={RONDE_LINGKARI.length}
      kunciAkhir={4}
      belumSiap="Lingkari semua kartu yang hasilnya sama dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLingkari ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Cari yang Hilang (hlm. 105) ----------------------- */

type Hilang = "a" | "b" | "c";
const RONDE_HILANG: { a: number; b: number; c: number; op: "+" | "−"; hilang: Hilang }[] = [
  { a: 2, b: 6, c: 8, op: "+", hilang: "c" },
  { a: 6, b: 4, c: 10, op: "+", hilang: "a" },
  { a: 6, b: 3, c: 9, op: "+", hilang: "b" },
  { a: 9, b: 2, c: 7, op: "−", hilang: "b" },
  { a: 7, b: 5, c: 2, op: "−", hilang: "a" },
  { a: 3, b: 5, c: 8, op: "+", hilang: "b" },
];
const INDEKS_HILANG: Record<Hilang, number> = { a: 0, b: 2, c: 4 };

/** Kalimat kebalikan yang dipakai untuk mencari atau memeriksa angka yang hilang. */
function kebalikan(d: (typeof RONDE_HILANG)[number]): { a: number; t: "+" | "−"; b: number; c: number; ket: string } {
  if (d.op === "+") {
    if (d.hilang === "c") return { a: d.c, t: "−", b: d.b, c: d.a, ket: "Periksa dengan kebalikan:" };
    if (d.hilang === "a") return { a: d.c, t: "−", b: d.b, c: d.a, ket: "Cari dengan kebalikan:" };
    return { a: d.c, t: "−", b: d.a, c: d.b, ket: "Cari dengan kebalikan:" };
  }
  if (d.hilang === "a") return { a: d.c, t: "+", b: d.b, c: d.a, ket: "Cari dengan kebalikan:" };
  return { a: d.a, t: "−", b: d.c, c: d.b, ket: "Cari dengan kebalikan:" };
}

function RondeHilang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_HILANG[ronde];
  const kunci = d[d.hilang];
  const kb = kebalikan(d);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_HILANG.length - 1;
  const suara = panel.suara["c3-hilang"] === true && akhir;
  const buka = akhir ? suara : benar;
  const nyalaAkhir = akhir && !suara;
  // Ronde terakhir dijawab lewat suara saja. Tidak ada pilihan angka yang membuka gerbang suara,
  // jadi gerbang dibuka begitu ronde tampil.
  useEffect(() => {
    if (akhir) onBeres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useBicara(
    akhir ? suara : benar,
    `${d.op === "+" ? ucapTambah(d.a, d.b, d.c) : ucapKurang(d.a, d.b, d.c)}. Cara mencarinya: ${
      kb.t === "+" ? ucapTambah(kb.a, kb.b, kb.c) : ucapKurang(kb.a, kb.b, kb.c)
    }.`
  );
  const Pers = d.op === "+" ? Tambah : Kurang;
  const PersKb = kb.t === "+" ? Tambah : Kurang;

  const pilih = (n: number) => {
    if (benar) return;
    if (n === kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Balik operasinya, lalu hitung lagi.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : benar ? (akhir ? "Ucapkan: angka yang hilang" : "Cocok dengan kebalikan!") : "Cari angka yang hilang"}
        teks={`Cari angka yang hilang. Balik operasinya: kalau tambah, hitung dengan kurang. Kalau kurang, hitung dengan tambah. Soal ke-${kataK(ronde + 1)} dari ${kataK(RONDE_HILANG.length)}.`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Papan tulis Wei</p>
        <div className="rounded-2xl border-4 border-[#8A5322] bg-[#2F4F4F] px-2 py-3">
          <Pers
            a={d.hilang === "a" ? (buka ? d.a : "?") : d.a}
            b={d.hilang === "b" ? (buka ? d.b : "?") : d.b}
            c={d.hilang === "c" ? (buka ? d.c : "?") : d.c}
            nyala={buka ? [] : [INDEKS_HILANG[d.hilang]]}
          />
        </div>
        {!akhir && !benar ? <PilihAngka opsi={opsiKurang(kunci)} keliru={keliru} onPilih={pilih} /> : null}
        {akhir && !suara ? (
          <p className="text-center text-sm font-black text-[#1C01A5]/80">Balik operasinya, lalu ucapkan angka yang hilang.</p>
        ) : null}
        {benar || akhir ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">{kb.ket}</p>
            <PersKb
              a={kb.a}
              b={kb.b}
              c={nyalaAkhir ? "?" : kb.c}
              kecil
              nyala={nyalaAkhir ? [4] : []}
            />
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuHilang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Cari yang Hilang"
      warna="#FDE68A"
      petunjuk="Di papan tulis Wei ada kalimat yang kehilangan satu angka. Balik operasinya untuk mencari angka itu. Kalau tambah, hitung dengan kurang. Kalau kurang, hitung dengan tambah. Pada soal terakhir, ucapkan angka yang hilang."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-hilang"
      jumlahRonde={RONDE_HILANG.length}
      kunciAkhir={5}
      belumSiap="Cari angka yang hilang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeHilang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Tanda dan Susun Kalimat (hlm. 105) --------------- */

const TANDA_SOAL = [
  { a: 4, b: 4, c: 8, op: "+" },
  { a: 7, b: 3, c: 4, op: "−" },
  { a: 10, b: 4, c: 6, op: "−" },
  { a: 7, b: 2, c: 9, op: "+" },
] as const;

function RondeTanda({ onBeres }: { onBeres: () => void }) {
  const [pasang, setPasang] = useState<(string | null)[]>(() => TANDA_SOAL.map(() => null));
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = pasang.every((x) => x !== null);
  useBicara(
    beres,
    TANDA_SOAL.map((s) => (s.op === "+" ? ucapTambah(s.a, s.b, s.c) : ucapKurang(s.a, s.b, s.c))).join(". ") + "."
  );

  const pilih = (i: number, t: string) => {
    if (pasang[i] !== null) return;
    const s = TANDA_SOAL[i];
    if (t === s.op) {
      const baru = pasang.slice();
      baru[i] = t;
      setPasang(baru);
      setKeliru(null);
      setKabar(null);
      if (baru.every((x) => x !== null)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(`${i}${t}`);
      setKabar({
        teks: s.c > s.a ? `Hasilnya ${s.c}, lebih besar dari ${s.a}. Bendanya bertambah, jadi pakai tanda +.` : `Hasilnya ${s.c}, lebih kecil dari ${s.a}. Bendanya berkurang, jadi pakai tanda −.`,
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Semua tanda sudah pas!" : "Pilih tanda + atau −"}
        teks="Lihat hasilnya. Kalau hasilnya lebih besar dari bilangan pertama, pakai tanda tambah. Kalau hasilnya lebih kecil, pakai tanda kurang. Ketuk tanda yang tepat untuk setiap kalimat."
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">Gunakan tanda + atau −</p>
        <div className="space-y-2">
          {TANDA_SOAL.map((s, i) => (
            <div key={i} className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
              <span className="w-5 text-center text-sm font-black text-[#1C01A5]/60">{"abcd"[i]}.</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white text-2xl font-black text-[#1C01A5]">{s.a}</span>
              {pasang[i] ? (
                <span className="igil-muncul flex h-11 w-[84px] items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#F0AB00] text-3xl font-black leading-none text-[#1C01A5]">
                  {pasang[i]}
                </span>
              ) : (
                <span className="flex w-[84px] items-center justify-center gap-1">
                  {["+", "−"].map((t) => (
                    <button
                      key={`${t}-${keliru === `${i}${t}` ? "x" : "o"}`}
                      type="button"
                      aria-label={`Tanda ${t === "+" ? "tambah" : "kurang"} untuk kalimat ${"abcd"[i]}`}
                      onClick={() => pilih(i, t)}
                      className={`h-11 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black leading-none text-[#1C01A5] ${keliru === `${i}${t}` ? "igil-goyang" : ""}`}
                    >
                      {t}
                    </button>
                  ))}
                </span>
              )}
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white text-2xl font-black text-[#1C01A5]">{s.b}</span>
              <span className="text-2xl font-black text-[#1C01A5]">=</span>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white text-2xl font-black text-[#1C01A5]">{s.c}</span>
            </div>
          ))}
        </div>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

type Ubin = { tipe: "angka"; nilai: number } | { tipe: "tanda"; nilai: "+" | "−" };
const RONDE_SUSUN: {
  ubin: Ubin[];
  op: "+" | "−";
  /** Jika ada, hasil kalimat ditutup dan dijawab dengan suara. */
  jawabSuara?: number;
  judul: string;
}[] = [
  {
    ubin: [
      { tipe: "angka", nilai: 8 },
      { tipe: "angka", nilai: 2 },
      { tipe: "angka", nilai: 6 },
      { tipe: "tanda", nilai: "−" },
    ],
    op: "−",
    judul: "8, 2, 6, −, =",
  },
  {
    ubin: [
      { tipe: "angka", nilai: 10 },
      { tipe: "angka", nilai: 4 },
      { tipe: "angka", nilai: 6 },
      { tipe: "tanda", nilai: "+" },
    ],
    op: "+",
    judul: "10, 4, 6, +, =",
  },
  {
    ubin: [
      { tipe: "angka", nilai: 9 },
      { tipe: "angka", nilai: 6 },
      { tipe: "tanda", nilai: "−" },
    ],
    op: "−",
    jawabSuara: 3,
    judul: "9, 6, −, =",
  },
];

function RondeSusun({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_SUSUN[ronde - 1];
  const tutupHasil = s.jawabSuara !== undefined;
  // Tempat: 0 bilangan pertama, 1 tanda, 2 bilangan kedua, 3 hasil (jika tidak ditutup).
  const jumlahTempat = tutupHasil ? 3 : 4;
  const [tempat, setTempat] = useState<(number | null)[]>(() => Array.from({ length: jumlahTempat }, () => null));
  const [keliru, setKeliru] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const [beres, setBeres] = useState(false);
  const akhir = tutupHasil;
  const suara = panel.suara["c3-susun"] === true && akhir;
  const buka = !akhir || suara;
  const terpakai = new Set(tempat.filter((x): x is number => x !== null));
  const nilaiTempat = tempat.map((u) => (u === null ? null : s.ubin[u]));

  const kalimatTeks = () => {
    const [p, t, q, h] = nilaiTempat;
    if (!p || !t || !q) return "";
    const bil = (u: Ubin) => (u.tipe === "angka" ? u.nilai : 0);
    const a = bil(p);
    const b = bil(q);
    const c = tutupHasil ? s.jawabSuara! : h ? bil(h) : 0;
    return String(t.nilai) === "+" ? `${ucapTambah(a, b, c)}.` : `${ucapKurang(a, b, c)}.`;
  };
  useBicara(akhir ? suara : beres, kalimatTeks());

  const susunUlang = () => {
    setTempat(Array.from({ length: jumlahTempat }, () => null));
    setKeliru(false);
    setKabar(null);
  };

  const periksa = (baru: (number | null)[]) => {
    const nilai = baru.map((u) => (u === null ? null : s.ubin[u]));
    const [p, t, q, h] = nilai;
    if (!p || !t || !q || p.tipe !== "angka" || q.tipe !== "angka" || t.tipe !== "tanda") return false;
    if (!tutupHasil && (!h || h.tipe !== "angka")) return false;
    const a = p.nilai;
    const b = q.nilai;
    const hasil = t.nilai === "+" ? a + b : a - b;
    if (tutupHasil) return t.nilai === s.op && hasil === s.jawabSuara;
    return h && h.tipe === "angka" ? hasil === h.nilai && t.nilai === s.op : false;
  };

  const taruh = (u: number) => {
    if (beres || terpakai.has(u)) return;
    const slot = tempat.findIndex((x) => x === null);
    if (slot < 0) return;
    const ubin = s.ubin[u];
    const cocok = slot === 1 ? ubin.tipe === "tanda" : ubin.tipe === "angka";
    if (!cocok) {
      setKeliru(true);
      setKabar({ teks: slot === 1 ? "Di sini tempat tanda + atau −." : "Di sini tempat bilangan, bukan tanda.", ok: false });
      return;
    }
    const baru = tempat.slice();
    baru[slot] = u;
    setTempat(baru);
    setKeliru(false);
    setKabar(null);
    if (baru.every((x) => x !== null)) {
      if (periksa(baru)) {
        setBeres(true);
        letusan.picu();
        onBeres();
      } else {
        setKeliru(true);
        setKabar({ teks: "Kalimatnya belum benar. Susun ulang, ya.", ok: false });
      }
    }
  };

  const lepas = (slot: number) => {
    if (beres) return;
    const baru = tempat.slice();
    baru[slot] = null;
    setTempat(baru);
    setKeliru(false);
    setKabar(null);
  };

  const teksTempat = (slot: number) => {
    const u = tempat[slot];
    return u === null ? "" : String(s.ubin[u].nilai);
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: hasilnya" : "Kalimatmu benar!") : "Susun kalimat matematika"}
        teks={`Susun kalimat matematika dari kartu angka dan tanda. Ketuk kartu untuk menaruhnya di kotak yang kosong, dari kiri ke kanan. Ketuk kotak yang terisi untuk mengambil kartunya kembali.${
          tutupHasil ? " Pada soal ini, hasilnya kamu ucapkan dengan suara." : ""
        }`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">Buatlah operasi hitung</p>
        <p className="text-center text-sm font-black text-[#1C01A5]/75">Kartu: {s.judul}</p>
        <div className={`flex flex-wrap items-center justify-center gap-1.5 ${keliru ? "igil-goyang" : ""}`} role="group" aria-label="Susunan kalimat">
          {Array.from({ length: jumlahTempat }, (_, slot) => (
            <React.Fragment key={slot}>
              {slot === 3 ? (
                <span className="text-3xl font-black text-[#1C01A5]" aria-hidden="true">
                  =
                </span>
              ) : null}
              <button
                type="button"
                aria-label={tempat[slot] === null ? `Kotak ${slot + 1} kosong` : `Kotak ${slot + 1} berisi ${teksTempat(slot)}, ketuk untuk mengambil`}
                disabled={tempat[slot] === null || beres}
                onClick={() => lepas(slot)}
                className={`igil-tanpa-tepi flex h-14 items-center justify-center rounded-2xl border-4 text-3xl font-black text-[#1C01A5] ${
                  slot === 1 ? "w-14 rounded-full" : "w-16"
                } ${tempat[slot] === null ? "border-dashed border-[#1C01A5]/50 bg-white" : beres ? "border-[#16A34A] bg-[#BBF7D0]" : slot === 1 ? "border-[#1C01A5] bg-[#F0AB00]" : "border-[#1C01A5] bg-white"}`}
              >
                {teksTempat(slot)}
              </button>
            </React.Fragment>
          ))}
          {tutupHasil ? (
            <>
              <span className="text-3xl font-black text-[#1C01A5]" aria-hidden="true">
                =
              </span>
              <span className="flex h-14 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-3xl font-black text-[#1C01A5]">
                {buka ? s.jawabSuara : "?"}
              </span>
            </>
          ) : null}
        </div>
        {!beres ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {s.ubin.map((u, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Kartu ${u.nilai}`}
                disabled={terpakai.has(i)}
                onClick={() => taruh(i)}
                className={`h-14 w-14 rounded-2xl border-4 border-[#1C01A5] text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-30 ${
                  u.tipe === "tanda" ? "rounded-full bg-[#F0AB00]" : "bg-[#FFE566]"
                }`}
              >
                {u.nilai}
              </button>
            ))}
          </div>
        ) : null}
        {!beres && tempat.some((x) => x !== null) ? (
          <button type="button" onClick={susunUlang} className={TOMBOL_KECIL}>
            ↩ Susun ulang
          </button>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuSusun({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Tanda dan Susun Kalimat"
      warna="#FCA5A5"
      petunjuk="Ada empat ronde. Pertama, pilih tanda tambah atau kurang yang tepat. Lalu susun kalimat matematika dari kartu angka dan tanda. Pada soal terakhir, hasil kalimat ditutup. Susun kalimatnya, lalu ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="c3-susun"
      jumlahRonde={RONDE_SUSUN.length + 1}
      kunciAkhir={3}
      belumSiap="Susun kalimatnya sampai benar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => (r === 0 ? <RondeTanda onBeres={beres} /> : <RondeSusun ronde={r} panel={panel} onBeres={beres} />)}
    />
  );
}

/* --------- Poin Penting dan Catatanku ------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Tiga bilangan membentuk satu keluarga. Dari satu keluarga ada empat kalimat: dua penjumlahan dan dua pengurangan. Penjumlahan boleh bertukar tempat, pengurangan tidak. Pengurangan adalah kebalikan dari penjumlahan. Karena itu kita bisa memeriksa jawaban dengan membalik operasinya, dan mencari angka yang hilang dengan kebalikan. Untuk memilih tanda, lihat hasilnya: lebih besar berarti tambah, lebih kecil berarti kurang.";

const POIN_C3: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "👨‍👩‍👧",
    nama: "Satu keluarga, empat kalimat",
    isi: <Keluarga4 a={4} b={3} g={7} />,
    suara:
      "Empat, tiga, dan tujuh adalah satu keluarga. Empat tambah tiga sama dengan tujuh. Tiga tambah empat sama dengan tujuh. Tujuh kurang tiga sama dengan empat. Tujuh kurang empat sama dengan tiga.",
  },
  {
    ikon: "🔄",
    nama: "Tukar tempat",
    isi: (
      <div className="space-y-1">
        <Tambah a={4} b={3} c={7} kecil />
        <Tambah a={3} b={4} c={7} kecil />
      </div>
    ),
    suara: "Penjumlahan boleh bertukar tempat. Empat tambah tiga sama dengan tiga tambah empat. Pengurangan tidak boleh bertukar tempat.",
  },
  {
    ikon: "↩️",
    nama: "Kebalikan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">3 + 4 = 7 maka 7 − 3 = 4</p>,
    suara: "Pengurangan adalah kebalikan dari penjumlahan. Tiga tambah empat sama dengan tujuh, maka tujuh kurang tiga sama dengan empat.",
  },
  {
    ikon: "🔍",
    nama: "Periksa jawaban",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">9 − 4 = 5, periksa: 5 + 4 = 9 ✅</p>,
    suara: "Periksa jawaban dengan membalik operasi. Sembilan kurang empat sama dengan lima. Periksa, lima tambah empat sama dengan sembilan. Cocok.",
  },
  {
    ikon: "🕵️",
    nama: "Cari yang hilang",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">6 + ? = 9, hitung 9 − 6 = 3</p>,
    suara: "Mencari angka yang hilang. Enam tambah berapa sama dengan sembilan? Pakai kebalikan: sembilan kurang enam sama dengan tiga.",
  },
  {
    ikon: "➕",
    nama: "Pilih tanda",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Hasil lebih besar: +. Hasil lebih kecil: −.</p>,
    suara: "Memilih tanda. Kalau hasilnya lebih besar dari bilangan pertama, pakai tambah. Kalau hasilnya lebih kecil, pakai kurang.",
  },
];

const CATATANKU = [
  "Aku sudah mengerti hubungan penjumlahan dan pengurangan.",
  "Aku bisa menulis empat kalimat dari tiga bilangan.",
  "Aku bisa memeriksa jawabanku dengan kebalikan.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
];

function Catatanku({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => CATATANKU.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {CATATANKU.map((t, i) => (
        <button
          key={t}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${t} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${t} Iya.` : t);
          }}
          className="igil-tanpa-tepi flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${
              iya[i] ? "bg-[#FFE566]" : "bg-white"
            }`}
          >
            {iya[i] ? "😊" : ""}
          </span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{t}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingC3({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_C3.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="igil-tanpa-tepi block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            {p.isi}
          </button>
        ))}
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            💡
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Penjumlahan dan pengurangan saling membalik. Pakai yang satu untuk memeriksa yang lain.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB C ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "lingkari" | "hilang" | "susun";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "lingkari" },
  { nomor: 9, tipe: "hilang" },
  { nomor: 10, tipe: "susun" },
];

export function AbstractHubunganC(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_ABSTRACT.length;
  const kartu = KARTU_ABSTRACT[Math.min(indeks, KARTU_ABSTRACT.length - 1)];
  const langkahTotal = KARTU_ABSTRACT.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: indeks >= KARTU_ABSTRACT.length - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan simbol" warna="#1C01A5" />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      {poin ? (
        <PoinPentingC3
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "lingkari" ? <KartuLingkari {...dasar} /> : null}
          {kartu.tipe === "hilang" ? <KartuHilang {...dasar} /> : null}
          {kartu.tipe === "susun" ? <KartuSusun {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
