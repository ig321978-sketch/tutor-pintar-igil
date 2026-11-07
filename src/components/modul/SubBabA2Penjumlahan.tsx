"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { Bagan } from "./gambar-pasangan-d";
import { IgilWajah, PensilIkon } from "./gambar-penjumlahan-a2";
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
/* Bab 2 Sub-Bab A: Penjumlahan (Buku Siswa Kelas 1 hlm. 43-50). Semua di     */
/* klien, tanpa API. Naskah: naskah/mtk-1-bab2-sub-a-cerita-penjumlahan.md.   */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Teman Datang Lagi (ketuk), 2 Kotak Pensil (seret),            */
/*            3 Lengkapi Cerita (isi kalimat), 4 Tebak Dua Piring (tebak).    */
/*  Picture:  5 Bingkai Sepuluh Dua Warna (warnai), 6 Hitung lalu Pindahkan   */
/*            (bagan), 7 Jodohkan Gambar dan Kalimat (pasangkan).             */
/*  Abstract: 8 Susun Kalimat (kartu simbol), 9 Detektif Angka Hilang,        */
/*            10 Kanvas Guratan dan Suara (tulis dan ucapkan).                */
/* ------------------------------------------------------------------------ */

export const TOTAL_GAME = 10;

export type PropsLangkah = {
  speakGuru: (t: string) => void;
  lanjut: () => void;
  nomor: number;
  panel: PanelSuara;
  teksLanjut: string;
};

export const kataK = (n: number) => kata(n).toLowerCase();
export const ucapTambah = (a: number, b: number, c: number) => `${kataK(a)} ditambah ${kataK(b)} sama dengan ${kataK(c)}`;

/** Tiga pilihan angka di sekitar kunci. Urutan diputar supaya kunci tidak selalu di tengah. */
export function opsiTiga(n: number): number[] {
  const mulai = n <= 1 ? 1 : n >= 10 ? 8 : n - 1;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

export const TOMBOL_KECIL =
  "mx-auto block rounded-full border-4 border-[#1C01A5] bg-white px-5 py-2 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)]";

/* ------------------------------ Bagian bersama -------------------------- */

/** Igil dan gelembung kata pendek. Diketuk, Igil membacakan petunjuk lengkapnya. */
export function IgilBicara({ pendek, teks }: { pendek: string; teks?: string }) {
  const ucap = useContext(SuaraCtx);
  const isi = teks ?? pendek;
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${isi}`}
      onClick={() => ucap(isi)}
      className="igil-tanpa-tepi flex w-full items-end gap-2 text-left"
    >
      <IgilWajah kelas="h-14 w-20 shrink-0 igil-lompat" />
      <span className="relative flex min-w-0 flex-1 items-center justify-between gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-lg font-black leading-snug text-[#1C01A5]">
        <span className="min-w-0">{pendek}</span>
        <LencanaSuara />
      </span>
    </button>
  );
}

export type Isi = number | "?" | null;

export function Kotak({ v, nyala, kecil }: { v: Isi; nyala?: boolean; kecil?: boolean }) {
  const ukuran = kecil ? "h-11 w-11 text-2xl" : "h-14 w-14 text-4xl";
  const warna =
    v === null ? "border-dashed border-[#1C01A5]/50 bg-white" : v === "?" ? "border-[#1C01A5] bg-[#FFE566]" : "border-[#1C01A5] bg-white";
  return (
    <span
      className={`flex items-center justify-center rounded-2xl border-4 font-black text-[#1C01A5] ${ukuran} ${warna} ${
        nyala ? "igil-denyut ring-4 ring-[#F0AB00]" : ""
      }`}
    >
      {v === null ? "" : v}
    </span>
  );
}

export function Tanda({ t, nyala, kecil }: { t: string | null; nyala?: boolean; kecil?: boolean }) {
  const ukuran = kecil ? "h-9 w-9 text-2xl" : "h-11 w-11 text-3xl";
  return (
    <span
      className={`flex items-center justify-center rounded-full border-4 font-black leading-none text-[#1C01A5] ${ukuran} ${
        t === null ? "border-dashed border-[#1C01A5]/50 bg-white" : "border-[#1C01A5] bg-[#F0AB00]"
      } ${nyala ? "igil-denyut ring-4 ring-[#F0AB00]" : ""}`}
    >
      {t ?? ""}
    </span>
  );
}

/** Kalimat matematika `a + b = c`. Nyala memakai indeks 0 sampai 4 (a, tambah, b, sama dengan, c). */
export function Persamaan({
  a,
  b,
  c,
  t1 = "+",
  t2 = "=",
  nyala = [],
  kecil = false,
}: {
  a: Isi;
  b: Isi;
  c: Isi;
  t1?: string | null;
  t2?: string | null;
  nyala?: number[];
  kecil?: boolean;
}) {
  const baca = [a, t1, b, t2, c].map((x) => (x === null ? "kosong" : x === "?" ? "tanda tanya" : x)).join(" ");
  return (
    <div role="img" aria-label={`Kalimat matematika: ${baca}`} className="flex flex-wrap items-center justify-center gap-1.5">
      <Kotak v={a} nyala={nyala.includes(0)} kecil={kecil} />
      <Tanda t={t1} nyala={nyala.includes(1)} kecil={kecil} />
      <Kotak v={b} nyala={nyala.includes(2)} kecil={kecil} />
      <Tanda t={t2} nyala={nyala.includes(3)} kecil={kecil} />
      <Kotak v={c} nyala={nyala.includes(4)} kecil={kecil} />
    </div>
  );
}

export function Kelompok({ ikon, n, kelas = "text-3xl" }: { ikon: string; n: number; kelas?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-1 leading-none ${kelas}`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i}>{ikon}</span>
      ))}
    </span>
  );
}

export function PilihAngka({
  opsi,
  keliru,
  onPilih,
  mati = false,
}: {
  opsi: number[];
  keliru: number | null;
  onPilih: (n: number) => void;
  mati?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {opsi.map((n) => (
        <button
          key={`${n}-${keliru === n ? "x" : "o"}`}
          type="button"
          aria-label={`Pilih angka ${n}`}
          onClick={() => onPilih(n)}
          disabled={mati}
          className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
            keliru === n ? "igil-goyang" : ""
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

/** Pembungkus permainan berronde: judul, penanda ronde, isi per ronde, lalu suara dan tombol lanjut. */
export function GameRonde({
  nomor,
  judul,
  warna,
  petunjuk,
  speakGuru,
  panel,
  id,
  jumlahRonde,
  kunciAkhir,
  belumSiap,
  teksLanjut,
  lanjut,
  isi,
}: {
  nomor: number;
  judul: string;
  warna: string;
  petunjuk: string;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  id: string;
  jumlahRonde: number;
  kunciAkhir: number;
  belumSiap: string;
  teksLanjut: string;
  lanjut: () => void;
  isi: (ronde: number, beres: () => void) => React.ReactNode;
}) {
  const [ronde, setRonde] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const terakhir = ronde >= jumlahRonde - 1;
  const suara = panel.suara[id] === true;
  return (
    <>
      <JudulGame nomor={nomor} total={TOTAL_GAME} judul={judul} onSuara={() => speakGuru(petunjuk)} warna={warna} />
      {jumlahRonde > 1 ? (
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Ronde {ronde + 1} dari {jumlahRonde}
        </p>
      ) : null}
      <div key={ronde} className="space-y-3">
        {isi(ronde, () => setSelesai(true))}
      </div>
      {!terakhir ? (
        selesai ? (
          <button
            type="button"
            onClick={() => {
              panel.bersih();
              setRonde((r) => r + 1);
              setSelesai(false);
            }}
            className={TOMBOL_KECIL}
          >
            ▶ Soal berikutnya
          </button>
        ) : null
      ) : (
        <>
          <JawabSuara id={id} jumlah={kunciAkhir} panel={panel} siap={selesai} belumSiap={belumSiap} />
          {suara ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
        </>
      )}
    </>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman penjumlahan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_A2 = [
  {
    ikon: "➕",
    nama: "Tambah",
    ket: "Menggabungkan benda",
    suara: "Tanda tambah artinya menggabungkan. Ada yang datang lagi, atau dua kelompok digabung. Bendanya jadi lebih banyak.",
  },
  {
    ikon: "=",
    nama: "Sama dengan",
    ket: "Menunjukkan hasilnya",
    suara: "Tanda sama dengan menunjukkan hasilnya. Setelah tanda sama dengan, kita tulis banyaknya benda semuanya.",
  },
];

const KATA_BACA = [
  { teks: "empat", warna: "#FFFFFF" },
  { teks: "ditambah", warna: "#F0AB00" },
  { teks: "dua", warna: "#FFFFFF" },
  { teks: "sama dengan", warna: "#F0AB00" },
  { teks: "enam", warna: "#FFE566" },
];

export function InfografisPenjumlahanA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Penjumlahan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="DATANG LAGI"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Empat anak bermain lompat tali. Datang lagi dua anak. Sekarang ada enam anak. Empat ditambah dua sama dengan enam."
      >
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <p className="text-xs font-black text-[#1C01A5]/70">Mula-mula</p>
              <Kelompok ikon="🧒" n={4} kelas="text-2xl" />
            </div>
            <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] px-2 py-2">
              <p className="text-xs font-black text-[#1C01A5]/70">Datang lagi</p>
              <Kelompok ikon="🧒" n={2} kelas="text-2xl" />
            </div>
          </div>
          <p className="text-2xl" aria-hidden="true">
            ⬇️
          </p>
          <Persamaan a={4} b={2} c={6} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="DIGABUNGKAN"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Tiga pensil merah digabung dengan empat pensil biru. Semuanya tujuh pensil. Tiga ditambah empat sama dengan tujuh."
      >
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-wrap items-end justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              {Array.from({ length: 3 }, (_, i) => (
                <PensilIkon key={i} warna="merah" kelas="h-9 w-4" />
              ))}
            </div>
            <div className="flex flex-wrap items-end justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              {Array.from({ length: 4 }, (_, i) => (
                <PensilIkon key={i} warna="biru" kelas="h-9 w-4" />
              ))}
            </div>
          </div>
          <p className="text-2xl" aria-hidden="true">
            ⬇️
          </p>
          <div className="flex flex-wrap items-end justify-center gap-0.5 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2">
            {Array.from({ length: 3 }, (_, i) => (
              <PensilIkon key={`m${i}`} warna="merah" kelas="h-9 w-4" />
            ))}
            {Array.from({ length: 4 }, (_, i) => (
              <PensilIkon key={`b${i}`} warna="biru" kelas="h-9 w-4" />
            ))}
          </div>
          <Persamaan a={3} b={4} c={7} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="TANDA TAMBAH DAN SAMA DENGAN"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Ini tanda tambah. Tanda tambah artinya menggabungkan. Ini tanda sama dengan. Tanda sama dengan menunjukkan hasilnya."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            <Tanda t="+" />
            <p className="text-base font-black text-[#1C01A5]">tambah</p>
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">datang lagi atau digabung</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            <Tanda t="=" />
            <p className="text-base font-black text-[#1C01A5]">sama dengan</p>
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">hasil semuanya</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="CARA MEMBACA"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Cara membaca kalimat matematika. Empat, ditambah, dua, sama dengan, enam. Empat ditambah dua sama dengan enam."
      >
        <div className="space-y-2">
          <Persamaan a={4} b={2} c={6} kecil />
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {KATA_BACA.map((k) => (
              <button
                key={k.teks}
                type="button"
                aria-label={`Dengarkan: ${k.teks}`}
                onClick={() => speakGuru(k.teks)}
                className="igil-tanpa-tepi rounded-full border-4 border-[#1C01A5] px-3 py-1 text-base font-black text-[#1C01A5]"
                style={{ backgroundColor: k.warna }}
              >
                {k.teks}
              </button>
            ))}
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="KATA KUNCI"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Kata kunci penjumlahan: datang lagi, bertambah, digabung, dan semuanya. Kalau kamu menemukan kata ini, kita pakai tanda tambah."
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {["datang lagi", "bertambah", "digabung", "semuanya"].map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-base font-black text-[#1C01A5]"
            >
              {k} <span className="text-xl">➕</span>
            </span>
          ))}
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_A2.map((g) => (
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

/* --------- Permainan 1. Teman Datang Lagi (hlm. 43-44) -------------------- */

function RondeTali({ panel, onBeres }: { panel: PanelSuara; onBeres: () => void }) {
  const [datang, setDatang] = useState(0);
  const letusan = useLetusan();
  const beres = datang >= 2;
  const suara = panel.suara["a2-tali"] === true;
  useBicara(suara, `Empat ditambah dua sama dengan enam. Ada enam anak yang bermain lompat tali.`);

  const panggil = () => {
    if (beres) return;
    const n = datang + 1;
    setDatang(n);
    if (n >= 2) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua anak" : "Ketuk teman yang menunggu!"}
        teks="Empat anak bermain lompat tali. Ketuk anak yang menunggu supaya ikut bermain. Setelah semua ikut, ucapkan berapa semua anak."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-2">
          <p className="text-center text-xs font-black text-[#14532D]">Sedang bermain lompat tali</p>
          <span className="flex flex-wrap items-center justify-center gap-1 text-4xl leading-none">
            {Array.from({ length: 4 + datang }, (_, i) => (
              <span key={i} className={i >= 4 ? "igil-muncul" : ""}>
                🧒
              </span>
            ))}
          </span>
        </div>
        {!beres ? (
          <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] p-2">
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Menunggu giliran</p>
            <span className="flex items-center justify-center gap-3">
              {Array.from({ length: 2 - datang }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label="Ajak teman ikut bermain"
                  onClick={panggil}
                  className="igil-tanpa-tepi igil-lompat text-5xl leading-none"
                >
                  🧒
                </button>
              ))}
            </span>
          </div>
        ) : null}
        <div className="flex items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Mula-mula 4</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">
            Datang lagi {datang}
          </span>
        </div>
        {beres ? <Persamaan a={4} b={2} c={suara ? 6 : "?"} /> : null}
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahTali({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Teman Datang Lagi"
      warna="#FFE566"
      petunjuk="Empat anak bermain lompat tali. Ketuk anak yang menunggu supaya ikut bermain. Setelah semua ikut, ucapkan berapa semua anak."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-tali"
      jumlahRonde={1}
      kunciAkhir={6}
      belumSiap="Ketuk teman yang menunggu dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondeTali panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Kotak Pensil Kira (hlm. 45) ----------------------- */

const PENSIL: ("merah" | "biru")[] = ["merah", "merah", "merah", "biru", "biru", "biru", "biru"];

function RondePensil({ panel, onBeres }: { panel: PanelSuara; onBeres: () => void }) {
  const [masuk, setMasuk] = useState<boolean[]>(() => PENSIL.map(() => false));
  const letusan = useLetusan();
  const total = masuk.filter(Boolean).length;
  const beres = total === PENSIL.length;
  const suara = panel.suara["a2-pensil"] === true;
  useBicara(suara, "Tiga pensil merah ditambah empat pensil biru. Tiga ditambah empat sama dengan tujuh.");

  const ke = (i: number, nilai: boolean) => {
    if (beres) return;
    const baru = masuk.slice();
    baru[i] = nilai;
    setMasuk(baru);
    if (baru.every(Boolean)) {
      letusan.picu();
      onBeres();
    }
  };
  const masukkan = (i: number) => ke(i, true);
  const hitung = (w: "merah" | "biru") => PENSIL.filter((x, i) => x === w && masuk[i]).length;

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua pensil" : "Masukkan semua pensil!"}
        teks="Kira punya tiga pensil merah. Upe punya empat pensil biru. Seret semua pensil ke kotak pensil, atau ketuk pensilnya. Lalu ucapkan berapa semua pensil."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[84px] flex-wrap items-end justify-center gap-3 rounded-2xl border-4 border-dashed border-[#A8672D] bg-white/70 p-2">
          {PENSIL.map((w, i) =>
            masuk[i] ? null : (
              <BendaSeret
                key={i}
                id={String(i)}
                aktif={!beres}
                label={`Pensil ${w}`}
                onKetuk={() => masukkan(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "a2-kotak") masukkan(i);
                }}
              >
                <PensilIkon warna={w} kelas="h-16 w-8" />
              </BendaSeret>
            )
          )}
          {total === PENSIL.length ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div
          data-zona="a2-kotak"
          className="flex min-h-[132px] flex-col items-center justify-between gap-1 rounded-3xl border-4 border-[#1C01A5] bg-[#F3C98A] px-2 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]"
        >
          <span className="text-sm font-black text-[#1C01A5]/70">Kotak pensil</span>
          <span className="flex min-h-[64px] flex-wrap items-end justify-center gap-1">
            {PENSIL.map((w, i) =>
              masuk[i] ? (
                <button
                  key={i}
                  type="button"
                  aria-label="Keluarkan pensil"
                  disabled={beres}
                  onClick={() => ke(i, false)}
                  className="igil-tanpa-tepi igil-muncul p-0"
                >
                  <PensilIkon warna={w} kelas="h-14 w-7" />
                </button>
              ) : null
            )}
          </span>
          <span className="flex items-center gap-2">
            <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#E11D48]">Merah {hitung("merah")}</span>
            <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#2563EB]">Biru {hitung("biru")}</span>
          </span>
        </div>
        {beres ? <Persamaan a={3} b={4} c={suara ? 7 : "?"} /> : null}
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahPensil({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kotak Pensil Kira"
      warna="#FFE566"
      petunjuk="Kira punya tiga pensil merah. Upe punya empat pensil biru. Seret semua pensil ke kotak pensil, atau ketuk pensilnya. Lalu ucapkan berapa semua pensil."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-pensil"
      jumlahRonde={1}
      kunciAkhir={7}
      belumSiap="Masukkan semua pensil ke kotak dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondePensil panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Lengkapi Cerita (hlm. 46) ------------------------- */

const RONDE_CERITA = [
  { ikon1: "🚕", nama1: "mobil kuning", ikon2: "🚗", nama2: "mobil merah", a: 4, b: 4, benda: "mobil" },
  { ikon1: "🍰", nama1: "kue lapis", ikon2: "🧁", nama2: "kue bolu", a: 3, b: 5, benda: "kue" },
];

function RondeCerita({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const d = RONDE_CERITA[ronde];
  const c = d.a + d.b;
  const kunci = [d.a, d.b, c];
  const [langkah, setLangkah] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  useBicara(beres, `${ucapTambah(d.a, d.b, c)}. Semuanya ada ${kataK(c)} ${d.benda}.`);

  const pilih = (n: number) => {
    if (beres) return;
    if (n === kunci[langkah]) {
      setKeliru(null);
      setKabar(null);
      const baru = langkah + 1;
      setLangkah(baru);
      if (baru >= 3) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung dulu bendanya satu per satu, ya.", ok: false });
    }
  };

  const blank = (i: number) => {
    const nilai: Isi = langkah > i ? kunci[i] : langkah === i ? "?" : null;
    return <Kotak v={nilai} kecil nyala={langkah === i} />;
  };

  return (
    <>
      <IgilBicara
        pendek={beres ? "Ucapkan: semuanya" : "Hitung, lalu isi kotak!"}
        teks="Hitung bendanya satu per satu. Isi kotak kosong pada cerita. Lalu ucapkan berapa semuanya."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Kelompok ikon={d.ikon1} n={d.a} />
          </div>
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Kelompok ikon={d.ikon2} n={d.b} />
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] p-2 text-lg font-black leading-snug text-[#1C01A5]">
          <p className="flex flex-wrap items-center gap-2">
            Ada {blank(0)} {d.nama1}.
          </p>
          <p className="flex flex-wrap items-center gap-2">
            Ada {blank(1)} {d.nama2}.
          </p>
          <p className="flex flex-wrap items-center gap-2">
            Semuanya ada {blank(2)} {d.benda}.
          </p>
        </div>
        {!beres ? <PilihAngka opsi={opsiTiga(kunci[langkah])} keliru={keliru} onPilih={pilih} /> : <Persamaan a={d.a} b={d.b} c={c} />}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahCerita({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Lengkapi Cerita"
      warna="#FFE566"
      petunjuk="Hitung bendanya satu per satu. Isi kotak kosong pada cerita. Lalu ucapkan berapa semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-cerita"
      jumlahRonde={RONDE_CERITA.length}
      kunciAkhir={8}
      belumSiap="Isi semua kotak cerita dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCerita ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Tebak Dua Piring (hlm. 50) ------------------------ */

const RONDE_PIRING: [number, number][] = [
  [5, 3],
  [4, 5],
];
const WARNA_KELERENG = ["#E98989", "#7FCB96", "#FFE566", "#93C5FD", "#F0AB00"];

function RondePiring({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [a, b] = RONDE_PIRING[ronde];
  const c = a + b;
  const [tebak, setTebak] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [buka, setBuka] = useState<[boolean, boolean]>([false, false]);
  const [urut, setUrut] = useState<Record<string, number>>({});
  const letusan = useLetusan();
  const terhitung = Object.keys(urut).length;
  const beres = terhitung === c;
  const akhir = ronde === RONDE_PIRING.length - 1;
  const suara = panel.suara["a2-piring"] === true && akhir;
  const bukaC = !akhir || suara;
  const tepat = tebak === c;
  useBicara(suara, `${ucapTambah(a, b, c)}. Ada ${kataK(c)} kelereng.`);

  const pilihTebak = (n: number) => {
    setKeliru(null);
    setTebak(n);
  };
  const hitung = (kunci: string) => {
    if (urut[kunci] !== undefined || beres) return;
    const baru = { ...urut, [kunci]: terhitung + 1 };
    setUrut(baru);
    if (Object.keys(baru).length === c) {
      letusan.picu();
      onBeres();
    }
  };

  const piring = (p: 0 | 1, n: number, nama: string) => {
    const terbuka = buka[p];
    return (
      <div className="flex min-h-[132px] flex-col items-center justify-between gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
        <span className="text-sm font-black text-[#1C01A5]/70">{nama}</span>
        {terbuka ? (
          <span className="flex flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: n }, (_, i) => {
              const kunci = `${p}-${i}`;
              const no = urut[kunci];
              return (
                <button
                  key={kunci}
                  type="button"
                  aria-label={`Hitung kelereng ${i + 1}`}
                  onClick={() => hitung(kunci)}
                  className="igil-tanpa-tepi igil-muncul flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#1C01A5] text-lg font-black text-[#1C01A5]"
                  style={{ backgroundColor: no ? "#FFFFFF" : WARNA_KELERENG[(i + p * 2) % WARNA_KELERENG.length] }}
                >
                  {no ?? ""}
                </button>
              );
            })}
          </span>
        ) : (
          <button
            type="button"
            disabled={tebak === null}
            aria-label={`Buka kain ${nama}`}
            onClick={() => setBuka((s) => (p === 0 ? [true, s[1]] : [s[0], true]))}
            className="igil-tanpa-tepi flex h-16 w-full items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#C7D2FE] text-3xl disabled:opacity-50"
          >
            🧺 <span className="ml-1 text-sm font-black text-[#1C01A5]">Buka</span>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua kelereng" : tebak === null ? "Tebak dulu: berapa semua?" : "Buka kain, hitung kelerengnya!"}
        teks="Dua piring ditutup kain. Tebak dulu berapa semua kelereng. Lalu buka kainnya dan ketuk tiap kelereng untuk menghitung."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">Tebakanmu berapa kelereng semuanya?</p>
        <PilihAngka opsi={opsiTiga(c)} keliru={keliru} onPilih={pilihTebak} mati={tebak !== null} />
        {tebak !== null ? (
          <p className="igil-muncul text-center text-lg font-black text-[#1C01A5]">
            Tebakanmu: <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3">{tebak}</span>
          </p>
        ) : null}
        <div className="grid grid-cols-2 gap-2">
          {piring(0, a, "Piring Upe")}
          {piring(1, b, "Piring Wei")}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">Terhitung: {terhitung}</p>
        {beres ? (
          <>
            <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-3 py-2 text-center text-lg font-black text-[#14532D]">
              {tepat ? "Tebakanmu tepat!" : `Hampir! Ternyata ada ${c} kelereng.`}
            </p>
            <Persamaan a={a} b={b} c={bukaC ? c : "?"} />
          </>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahPiring({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Tebak Dua Piring"
      warna="#FFE566"
      petunjuk="Dua piring ditutup kain. Tebak dulu berapa semua kelereng. Lalu buka kainnya dan ketuk tiap kelereng untuk menghitung. Terakhir, ucapkan berapa semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-piring"
      jumlahRonde={RONDE_PIRING.length}
      kunciAkhir={9}
      belumSiap="Buka kedua kain dan hitung semua kelereng dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePiring ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "tali" | "pensil" | "cerita" | "piring";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "tali" },
  { nomor: 2, tipe: "pensil" },
  { nomor: 3, tipe: "cerita" },
  { nomor: 4, tipe: "piring" },
];

export function ConcretePenjumlahanA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan pindahkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span
            key={l.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "tali" ? <LangkahTali {...dasar} /> : null}
        {langkah.tipe === "pensil" ? <LangkahPensil {...dasar} /> : null}
        {langkah.tipe === "cerita" ? <LangkahCerita {...dasar} /> : null}
        {langkah.tipe === "piring" ? <LangkahPiring {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Tiga permainan dengan gambar dan diagram.                */
/* ------------------------------------------------------------------------ */

export const KERTAS_GAMBAR =
  "relative space-y-3 rounded-lg border-[3px] border-[#6B7280] bg-white/90 p-3 shadow-[3px_4px_0_rgba(0,0,0,0.12)]";

/* --------- Permainan 5. Bingkai Sepuluh Dua Warna (hlm. 47) --------------- */

const RONDE_BINGKAI = [
  { ikonA: "🟢", ikonB: "🟡", a: 4, b: 2, nama: "bola" },
  { ikonA: "🍎", ikonB: "🍏", a: 6, b: 2, nama: "apel" },
];

function RondeBingkai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BINGKAI[ronde];
  const c = d.a + d.b;
  const [terisi, setTerisi] = useState<boolean[]>(() => Array.from({ length: 10 }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = terisi.filter(Boolean).length;
  const beres = jumlah === d.b;
  const akhir = ronde === RONDE_BINGKAI.length - 1;
  const suara = panel.suara["a2-bingkai"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(d.a, d.b, c)}. Bingkai sepuluh terisi ${kataK(c)}.`);

  const ketuk = (i: number) => {
    if (i < d.a || beres) return;
    if (terisi[i]) {
      const baru = terisi.slice();
      baru[i] = false;
      setTerisi(baru);
      setKabar(null);
      return;
    }
    if (jumlah >= d.b) {
      setKabar({ teks: `Cukup! Hanya ${d.b} ${d.nama} yang datang.`, ok: false });
      return;
    }
    const baru = terisi.slice();
    baru[i] = true;
    setTerisi(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.b) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semuanya" : "Warnai kotak untuk yang datang"}
        teks={`Ada ${kataK(d.a)} ${d.nama} berwarna pertama. Datang lagi ${kataK(d.b)} ${d.nama} berwarna kedua. Ketuk kotak kosong untuk mewarnai yang datang lagi.`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
            <Kelompok ikon={d.ikonA} n={d.a} />
          </div>
          <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
            <Kelompok ikon={d.ikonB} n={d.b} />
          </div>
        </div>
        <div className="mx-auto grid max-w-[300px] grid-cols-5 gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
          {Array.from({ length: 10 }, (_, i) => {
            const awal = i < d.a;
            const baru = terisi[i];
            return (
              <button
                key={i}
                type="button"
                aria-label={`Kotak ${i + 1}`}
                disabled={awal}
                onClick={() => ketuk(i)}
                className={`aspect-square w-full rounded-full border-4 border-[#1C01A5] p-0 shadow-[0_3px_0_rgba(28,1,165,0.22)] ${
                  awal ? "bg-[#F0AB00]" : baru ? "igil-muncul bg-[#7FCB96]" : "bg-white"
                }`}
              />
            );
          })}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Emas {d.a} • Hijau {jumlah}
        </p>
        {beres ? <Persamaan a={d.a} b={d.b} c={bukaC ? c : "?"} /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuBingkai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Bingkai Sepuluh Dua Warna"
      warna="#FDE68A"
      petunjuk="Kotak emas adalah benda yang sudah ada. Ketuk kotak kosong untuk mewarnai benda yang datang lagi. Lalu ucapkan berapa semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-bingkai"
      jumlahRonde={RONDE_BINGKAI.length}
      kunciAkhir={8}
      belumSiap="Warnai kotak untuk benda yang datang lagi dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBingkai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Hitung lalu Pindahkan (hlm. 47-48) ---------------- */

const RONDE_JEMBATAN = [
  { ikon: "🐰", a: 3, b: 4 },
  { ikon: "🍓", a: 3, b: 2 },
  { ikon: "🌼", a: 4, b: 4 },
];

const TITIK_BAGAN = [
  { cx: 132, cy: 22, r: 19 },
  { cx: 132, cy: 78, r: 19 },
  { cx: 38, cy: 50, r: 27 },
];

function RondeJembatan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_JEMBATAN[ronde];
  const c = d.a + d.b;
  const [hA, setHA] = useState(0);
  const [hB, setHB] = useState(0);
  const [salin, setSalin] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const siapA = hA >= d.a;
  const siapB = hB >= d.b;
  const siapSemua = siapA && siapB;
  const beres = salin >= 3;
  const akhir = ronde === RONDE_JEMBATAN.length - 1;
  const suara = panel.suara["a2-jembatan"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(d.a, d.b, c)}.`);

  const hitungKe = (g: "a" | "b") => {
    if (g === "a" && !siapA) setHA((n) => n + 1);
    if (g === "b" && !siapB) setHB((n) => n + 1);
  };

  const salinKe = (urutan: number) => {
    if (!siapSemua) {
      setKabar({ teks: "Hitung dulu kedua kelompok, ya.", ok: false });
      return;
    }
    if (beres) return;
    if (urutan !== salin) {
      setKabar({
        teks: salin === 0 ? "Mulai dari lingkaran Sebagian yang atas." : salin === 1 ? "Sekarang lingkaran Sebagian yang bawah." : "Terakhir, lingkaran Gabungan.",
        ok: false,
      });
      return;
    }
    setKabar(null);
    const baru = salin + 1;
    setSalin(baru);
    if (baru >= 3) {
      letusan.picu();
      onBeres();
    }
  };

  const nilaiBagan = {
    a: siapA ? d.a : "?",
    b: siapB ? d.b : "?",
    g: siapSemua ? c : "?",
  } as const;

  const kelompok = (g: "a" | "b", n: number, h: number) => (
    <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
      <span className="flex flex-wrap items-center justify-center gap-1 text-3xl leading-none">
        {Array.from({ length: n }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Hitung ${g === "a" ? "kelompok kiri" : "kelompok kanan"} ${i + 1}`}
            onClick={() => hitungKe(g)}
            className={`igil-tanpa-tepi rounded-full p-0.5 leading-none ${i < h ? "bg-[#FFE566] ring-2 ring-[#1C01A5]" : ""}`}
          >
            {d.ikon}
          </button>
        ))}
      </span>
      <p className="text-center text-sm font-black text-[#1C01A5]">Terhitung {h}</p>
    </div>
  );

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semuanya" : !siapSemua ? "Ketuk gambar untuk menghitung" : "Ketuk lingkaran, pindahkan ke kalimat"}
        teks="Pertama, ketuk tiap gambar untuk menghitung. Lalu ketuk lingkaran pada bagan secara berurutan untuk memindahkan angkanya ke kalimat matematika."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          {kelompok("a", d.a, hA)}
          {kelompok("b", d.b, hB)}
        </div>
        <div className="relative mx-auto w-full max-w-[220px]">
          <Bagan
            gabungan={nilaiBagan.g}
            a={nilaiBagan.a}
            b={nilaiBagan.b}
            nyala={siapSemua && !beres ? [(["a", "b", "g"] as const)[salin]] : []}
          />
          {TITIK_BAGAN.map((t, i) => (
            <button
              key={i}
              type="button"
              aria-label={i === 2 ? "Lingkaran Gabungan" : i === 0 ? "Lingkaran Sebagian atas" : "Lingkaran Sebagian bawah"}
              onClick={() => salinKe(i)}
              className="igil-tanpa-tepi absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent p-0"
              style={{ left: `${t.cx / 1.7}%`, top: `${t.cy}%`, width: `${(t.r * 2) / 1.7}%`, aspectRatio: "1 / 1" }}
            />
          ))}
        </div>
        <Persamaan
          a={salin > 0 ? d.a : null}
          b={salin > 1 ? d.b : null}
          c={salin > 2 ? (bukaC ? c : "?") : null}
          t1={salin > 0 ? "+" : null}
          t2={salin > 1 ? "=" : null}
          nyala={siapSemua && !beres ? [salin === 0 ? 0 : salin === 1 ? 2 : 4] : []}
        />
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuJembatan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Hitung lalu Pindahkan"
      warna="#FDE68A"
      petunjuk="Ketuk tiap gambar untuk menghitung. Lalu ketuk lingkaran pada bagan secara berurutan, supaya angkanya pindah ke kalimat matematika. Terakhir, ucapkan berapa semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-jembatan"
      jumlahRonde={RONDE_JEMBATAN.length}
      kunciAkhir={8}
      belumSiap="Pindahkan angka ke kalimat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJembatan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Jodohkan Gambar dan Kalimat (hlm. 49) ------------- */

const GAMBAR_JODOH = [
  { ikon: "🦆", a: 5, b: 2, nama: "bebek" },
  { ikon: "⚽", a: 3, b: 3, nama: "bola" },
  { ikon: "🍎", a: 6, b: 3, nama: "apel" },
];
const URUT_PITA = [1, 2, 0];
const WARNA_JODOH = ["#F0AB00", "#7FCB96", "#E98989"];

function RondeJodoh({ speakGuru, panel, onBeres }: { speakGuru: (t: string) => void; panel: PanelSuara; onBeres: () => void }) {
  const [pilih, setPilih] = useState<number | null>(null);
  const [cocok, setCocok] = useState<boolean[]>([false, false, false]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = cocok.every(Boolean);
  const suara = panel.suara["a2-jodoh"] === true;
  useBicara(suara, "Tiga cerita sudah berjodoh. Lima ditambah dua sama dengan tujuh. Ada tujuh bebek.");

  const ketukGambar = (i: number) => {
    if (cocok[i] || beres) return;
    setPilih(i);
    setKabar(null);
  };
  const ketukPita = (k: number) => {
    if (cocok[k] || beres) return;
    if (pilih === null) {
      setKabar({ teks: "Pilih gambarnya dulu, ya.", ok: false });
      return;
    }
    if (pilih === k) {
      const baru = cocok.slice();
      baru[k] = true;
      setCocok(baru);
      setPilih(null);
      setKeliru(null);
      setKabar(null);
      const g = GAMBAR_JODOH[k];
      speakGuru(`${ucapTambah(g.a, g.b, g.a + g.b)}.`);
      if (baru.every(Boolean)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(k);
      setKabar({ teks: "Belum cocok. Hitung gambarnya lagi, ya.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: jumlah bebek" : "Jodohkan gambar dan kalimat"}
        teks="Ketuk satu gambar, lalu ketuk kalimat penjumlahan yang cocok."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="space-y-2">
          {GAMBAR_JODOH.map((g, i) => (
            <button
              key={g.nama}
              type="button"
              aria-label={`Gambar ${g.nama}`}
              onClick={() => ketukGambar(i)}
              className={`igil-tanpa-tepi relative block w-full rounded-2xl border-4 bg-white px-2 py-2 ${
                pilih === i ? "ring-4 ring-[#F0AB00]" : ""
              } ${cocok[i] ? "border-[#7FCB96]" : "border-[#1C01A5]"}`}
            >
              <span className="flex items-center justify-center gap-2">
                <Kelompok ikon={g.ikon} n={g.a} kelas="text-2xl" />
                <span className="text-sm font-black text-[#1C01A5]">dan</span>
                <Kelompok ikon={g.ikon} n={g.b} kelas="text-2xl" />
              </span>
              {cocok[i] ? (
                <span
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1C01A5] text-sm font-black text-[#1C01A5]"
                  style={{ backgroundColor: WARNA_JODOH[i] }}
                >
                  {i + 1}
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <p className="text-center text-xl" aria-hidden="true">
          ↕️
        </p>
        <div className="space-y-2">
          {URUT_PITA.map((k) => {
            const g = GAMBAR_JODOH[k];
            return (
              <button
                key={k}
                type="button"
                aria-label={`Kalimat ${g.a} + ${g.b} = ${g.a + g.b}`}
                onClick={() => ketukPita(k)}
                className={`igil-tanpa-tepi relative block w-full rounded-full border-4 px-3 py-2 text-center text-2xl font-black text-[#1C01A5] ${
                  cocok[k] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFE566]"
                } ${keliru === k ? "igil-goyang" : ""}`}
              >
                {g.a} + {g.b} = {g.a + g.b}
                {cocok[k] ? (
                  <span
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1C01A5] text-sm font-black text-[#1C01A5]"
                    style={{ backgroundColor: WARNA_JODOH[k] }}
                  >
                    {k + 1}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuJodoh({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Jodohkan Gambar dan Kalimat"
      warna="#FDE68A"
      petunjuk="Ketuk satu gambar, lalu ketuk kalimat penjumlahan yang cocok. Setelah ketiganya berjodoh, ucapkan berapa jumlah semua bebek."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-jodoh"
      jumlahRonde={1}
      kunciAkhir={7}
      belumSiap="Jodohkan ketiga gambar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondeJodoh speakGuru={speakGuru} panel={panel} onBeres={beres} />}
    />
  );
}

type TipePicture = "bingkai" | "jembatan" | "jodoh";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "bingkai" },
  { nomor: 6, tipe: "jembatan" },
  { nomor: 7, tipe: "jodoh" },
];

export function PicturePenjumlahanA(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span
            key={k.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "bingkai" ? <KartuBingkai {...dasar} /> : null}
        {kartu.tipe === "jembatan" ? <KartuJembatan {...dasar} /> : null}
        {kartu.tipe === "jodoh" ? <KartuJodoh {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tiga permainan angka dan simbol, lalu Poin Penting.     */
/* ------------------------------------------------------------------------ */

export const KERTAS_ANGKA = "relative space-y-3 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-3";

/* --------- Permainan 8. Susun Kalimat (hlm. 44) --------------------------- */

const RONDE_SUSUN: [number, number, number][] = [
  [4, 2, 6],
  [5, 3, 8],
  [3, 4, 7],
];
const KARTU_SIMBOL = ["=", ">", "+", "<"];

function RondeSusun({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const [a, b, c] = RONDE_SUSUN[ronde];
  const [n, setN] = useState(0);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = n >= 2;
  useBicara(beres, `${ucapTambah(a, b, c)}.`);

  const taruh = (s: string) => {
    if (beres) return;
    const harus = n === 0 ? "+" : "=";
    if (s === harus) {
      setKeliru(null);
      setKabar(null);
      const baru = n + 1;
      setN(baru);
      if (baru >= 2) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(s);
      setKabar({
        teks: n === 0 ? "Benda yang digabung memakai tanda tambah." : "Hasilnya memakai tanda sama dengan.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Kalimat sudah jadi!" : n === 0 ? "Pilih tanda untuk menggabungkan" : "Pilih tanda untuk hasilnya"}
        teks="Lengkapi kalimat matematika. Pilih kartu simbol yang tepat untuk kotak yang menyala."
      />
      <div className={KERTAS_ANGKA}>
        <Persamaan a={a} b={b} c={c} t1={n >= 1 ? "+" : null} t2={n >= 2 ? "=" : null} nyala={beres ? [] : [n === 0 ? 1 : 3]} />
        <div className="grid grid-cols-4 gap-2">
          {KARTU_SIMBOL.map((s) => (
            <button
              key={`${s}-${keliru === s ? "x" : "o"}`}
              type="button"
              aria-label={`Kartu simbol ${s}`}
              disabled={beres}
              onClick={() => taruh(s)}
              className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-4xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
                keliru === s ? "igil-goyang" : ""
              }`}
            >
              {s}
            </button>
          ))}
        </div>
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
      judul="Susun Kalimat"
      warna="#C7D2FE"
      petunjuk="Lengkapi kalimat matematika. Pilih kartu simbol yang tepat untuk kotak yang menyala. Terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-susun"
      jumlahRonde={RONDE_SUSUN.length}
      kunciAkhir={7}
      belumSiap="Lengkapi kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusun ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Angka Hilang ----------------------------- */

const RONDE_DETEKTIF: { a: number; b: number; hilang: "b" | "c"; ikon: string; nama: string }[] = [
  { a: 5, b: 2, hilang: "c", ikon: "🍎", nama: "apel" },
  { a: 3, b: 4, hilang: "b", ikon: "⭐", nama: "bintang" },
  { a: 2, b: 5, hilang: "c", ikon: "🍌", nama: "pisang" },
  { a: 6, b: 3, hilang: "c", ikon: "🐟", nama: "ikan" },
];

function RondeDetektif({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const d = RONDE_DETEKTIF[ronde];
  const c = d.a + d.b;
  const kunci = d.hilang === "c" ? c : d.b;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  useBicara(benar, `${ucapTambah(d.a, d.b, c)}.`);

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
      setKabar({ teks: "Belum tepat. Periksa petunjuknya lagi, ya.", ok: false });
    }
  };

  const petunjuk =
    d.hilang === "c"
      ? `Ada ${kataK(d.a)} ${d.nama}. Datang lagi ${kataK(d.b)} ${d.nama}. Berapa semuanya?`
      : `Ada ${kataK(d.a)} ${d.nama}. Setelah ada yang datang lagi, semuanya jadi ${kataK(c)}. Berapa yang datang lagi?`;

  return (
    <>
      <CatatanPensil pendek={benar ? "Kasus terpecahkan!" : "Temukan angka yang hilang"} teks={petunjuk} />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">
          <span aria-hidden="true">🔍 </span>
          {petunjuk}
        </p>
        {d.hilang === "c" ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
              <Kelompok ikon={d.ikon} n={d.a} kelas="text-2xl" />
            </div>
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
              <Kelompok ikon={d.ikon} n={d.b} kelas="text-2xl" />
            </div>
          </div>
        ) : null}
        <Persamaan
          a={d.a}
          b={d.hilang === "b" ? (benar ? d.b : "?") : d.b}
          c={d.hilang === "c" ? (benar ? c : "?") : c}
          nyala={benar ? [] : [d.hilang === "b" ? 2 : 4]}
        />
        <PilihAngka opsi={opsiTiga(kunci)} keliru={keliru} onPilih={pilih} mati={benar} />
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuDetektif({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Detektif Angka Hilang"
      warna="#C7D2FE"
      petunjuk="Temukan angka yang hilang pada kalimat penjumlahan. Baca petunjuknya, lalu pilih angka yang tepat. Terakhir, ucapkan hasil kasus yang terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="a2-detektif"
      jumlahRonde={RONDE_DETEKTIF.length}
      kunciAkhir={9}
      belumSiap="Pecahkan kasusnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara (hlm. 44-50) ------------ */

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [lulus, setLulus] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const jumlahA = tahap === 0 ? 5 : a;
  const jumlahB = tahap === 0 ? 3 : b;
  const c = jumlahA + jumlahB;
  const id = tahap === 0 ? "a2-tulis-1" : `a2-tulis-2-${a}-${b}`;
  const suara = panel.suara[id] === true;
  useBicara(suara, `${ucapTambah(jumlahA, jumlahB, c)}.`);

  const ubah = (sisi: "a" | "b", delta: number) => {
    if (suara) return;
    const na = sisi === "a" ? a + delta : a;
    const nb = sisi === "b" ? b + delta : b;
    if (na < 1 || nb < 1) {
      setKabar({ teks: "Paling sedikit satu, ya.", ok: false });
      return;
    }
    if (na + nb > 10) {
      setKabar({ teks: "Jumlahnya paling banyak sepuluh, ya.", ok: false });
      return;
    }
    setKabar(null);
    setA(na);
    setB(nb);
  };

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() =>
          speakGuru("Ucapkan hasil penjumlahan, lalu guratkan angkanya di kanvas. Setelah itu, buat kalimat penjumlahanmu sendiri.")
        }
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
        {tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}
      </p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Ucapkan hasilnya" : "Buat kalimatmu, lalu ucapkan"}
          teks={
            tahap === 0
              ? "Lima ditambah tiga sama dengan berapa? Ucapkan hasilnya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih dua bilangan sesukamu, paling banyak jumlahnya sepuluh. Ucapkan hasilnya, lalu guratkan angkanya."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["a", a, "⭐"],
                  ["b", b, "🌙"],
                ] as const
              ).map(([sisi, nilai, ikon]) => (
                <div key={sisi} className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
                  <Kelompok ikon={ikon} n={nilai} kelas="text-xl" />
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label={`Kurangi ${sisi === "a" ? "bilangan pertama" : "bilangan kedua"}`}
                      disabled={suara}
                      onClick={() => ubah(sisi, -1)}
                      className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-3xl font-black text-[#1C01A5]">{nilai}</span>
                    <button
                      type="button"
                      aria-label={`Tambah ${sisi === "a" ? "bilangan pertama" : "bilangan kedua"}`}
                      disabled={suara}
                      onClick={() => ubah(sisi, 1)}
                      className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <Persamaan a={jumlahA} b={jumlahB} c={suara ? c : "?"} />
          <KabarChip kabar={kabar} />
        </div>
        <JawabSuara id={id} jumlah={c} panel={panel} siap belumSiap="" />
        {suara ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={c} kata={kata(c)} onCompletedTrace={() => setLulus(true)} />
            <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
          </div>
        ) : null}
        {suara && tahap === 0 ? (
          <button
            type="button"
            onClick={() => {
              panel.bersih();
              setLulus(false);
              setTahap(1);
            }}
            className={TOMBOL_KECIL}
          >
            ▶ Ayo Mencoba
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Menjumlahkan artinya menggabungkan. Tanda tambah dipakai kalau benda datang lagi atau digabung. Tanda sama dengan menunjukkan hasilnya. Kita membaca: empat ditambah dua sama dengan enam.";

const POIN_A2 = [
  {
    ikon: "🤝",
    nama: "Menjumlahkan = menggabungkan",
    suara: "Menjumlahkan artinya menggabungkan. Tiga pensil merah digabung empat pensil biru menjadi tujuh pensil.",
    a: 3,
    b: 4,
    c: 7,
  },
  {
    ikon: "➕",
    nama: "Tanda tambah",
    suara: "Tanda tambah dipakai kalau benda datang lagi atau digabung. Empat anak, datang lagi dua anak.",
    a: 4,
    b: 2,
    c: "?" as Isi,
  },
  {
    ikon: "=",
    nama: "Tanda sama dengan",
    suara: "Tanda sama dengan menunjukkan hasilnya. Lima ditambah tiga sama dengan delapan.",
    a: 5,
    b: 3,
    c: 8,
  },
];

function PoinPentingA2({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A2.map((p) => (
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
            <Persamaan a={p.a} b={p.b} c={p.c} kecil />
          </button>
        ))}
        <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <button
            type="button"
            aria-label="Dengarkan: Cara membaca"
            onClick={() => speakGuru("Cara membaca: empat ditambah dua sama dengan enam.")}
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">📖</span>
              Cara membaca
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {KATA_BACA.map((k) => (
              <span
                key={k.teks}
                className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]"
                style={{ backgroundColor: k.warna }}
              >
                {k.teks}
              </span>
            ))}
          </div>
        </div>
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

type TipeAbstract = "susun" | "detektif" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "susun" },
  { nomor: 9, tipe: "detektif" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractPenjumlahanA(props: Umum) {
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
        <PoinPentingA2
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "susun" ? <KartuSusun {...dasar} /> : null}
          {kartu.tipe === "detektif" ? <KartuDetektif {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
