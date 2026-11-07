"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import {
  BarisTitik,
  BatangSepuluh,
  DuaKelompokTitik,
  GarisMini,
  TeksCerita,
  WARNA_ADA,
  WARNA_DATANG,
} from "./diagram-pictorial";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { BingkaiMini } from "./gambar-cara-b2";
import { Kendaraan, NAMA_KENDARAAN, RODA_PER, type JenisKendaraan } from "./gambar-soal-cerita-c2";
import {
  GameRonde,
  Kelompok,
  KERTAS_ANGKA,
  KERTAS_GAMBAR,
  Kotak,
  Persamaan,
  PilihAngka,
  Tanda,
  TOMBOL_KECIL,
  TOTAL_GAME,
  kataK,
  opsiTiga,
  ucapTambah,
  type PropsLangkah,
} from "./SubBabA2Penjumlahan";
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
/* Bab 2 Sub-Bab C: Soal Cerita Penjumlahan (Buku Siswa hlm. 65-74).          */
/* Semua di klien, tanpa API. Naskah: naskah/mtk-1-bab2-sub-c-soal-cerita.md.  */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Isi Dua Stoples lalu Tuang (ketuk stoples), 2 Hitung Roda      */
/*            (ketuk kendaraan), 3 Parkiran Pilih-Pilih (seret yang disebut),  */
/*            4 Susun Cerita dengan Kartu (urutkan).                           */
/*  Picture:  (diagram saja, tanpa gambar benda; lihat diagram-pictorial.tsx) */
/*            5 Cerita ke Model Batang (warnai batang, baca penggaris),        */
/*            6 Cerita ke Diagram (pilih bingkai, garis, batang),              */
/*            7 Tabel Hitung Cerita (strip titik, isi tabel).                  */
/*  Abstract: 8 Tulis Penyelesaian dan Jawaban (kartu dan kalimat),            */
/*            9 Pasangan Sembilan (cari kalimat), 10 Kanvas Guratan dan Suara. */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Bagian bersama -------------------------- */

type KelompokK = { jenis: JenisKendaraan; n: number };

const ulang = (k: KelompokK): JenisKendaraan[] => Array.from({ length: k.n }, () => k.jenis);

const CHIP_BIRU = "rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]";
const CHIP_EMAS = "rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]";

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman soal cerita penjumlahan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_C2 = [
  {
    ikon: "📦",
    nama: "Diketahui",
    ket: "Bilangan di cerita",
    suara: "Diketahui adalah bilangan yang ada di dalam cerita. Ada empat burung. Datang lagi dua burung.",
  },
  {
    ikon: "❓",
    nama: "Pertanyaan",
    ket: "Yang ditanyakan",
    suara: "Pertanyaan adalah hal yang ingin kita cari. Berapa jumlah semua burung?",
  },
  {
    ikon: "✏️",
    nama: "Penyelesaian",
    ket: "Kalimat penjumlahan",
    suara: "Penyelesaian adalah kalimat penjumlahan. Empat ditambah dua sama dengan enam.",
  },
  {
    ikon: "💬",
    nama: "Jawaban",
    ket: "Kalimat lengkap",
    suara: "Jawaban ditulis dalam kalimat lengkap dengan nama bendanya. Semuanya ada enam burung.",
  },
];

const KATA_PETUNJUK = [
  { kata: "datang lagi", contoh: "Datang lagi 2 burung." },
  { kata: "diberi lagi", contoh: "Kira diberi 3 apel lagi." },
  { kata: "bergabung", contoh: "5 anak bergabung dengan 2 anak." },
  { kata: "jumlah semua", contoh: "Berapa jumlah semua pensil?" },
  { kata: "semuanya", contoh: "Semuanya ada berapa?" },
];

const CARA_PERIKSA = [
  { ikon: "🔄", nama: "Tukar tempat", isi: "4 + 2 = 6 dan 2 + 4 = 6", suara: "Periksa dengan tukar tempat. Empat ditambah dua sama dengan enam. Dua ditambah empat juga enam." },
  { ikon: "🏃", nama: "Hitung maju", isi: "Mulai 4, lompat 5, 6", suara: "Periksa dengan menghitung maju. Mulai dari empat, lompat dua kali: lima, enam." },
  { ikon: "🖐️", nama: "Pakai jari", isi: "Buka 4 jari, lalu 2 jari", suara: "Periksa dengan jari. Buka empat jari, lalu tambah dua jari. Hitung semuanya sampai enam." },
  { ikon: "🖍️", nama: "Gambar", isi: "Gambar 4 titik dan 2 titik", suara: "Periksa dengan gambar. Gambar empat titik, lalu dua titik. Hitung semua titiknya." },
];

const LANGKAH_CERITAKU = [
  { ikon: "💭", teks: "Buat ceritanya", suara: "Langkah satu, buat ceritanya. Pilih benda dan dua bilangan." },
  { ikon: "🖍️", teks: "Gambar ceritanya", suara: "Langkah dua, gambar ceritanya sesuai bilangan." },
  { ikon: "✏️", teks: "Tulis kalimat penjumlahan", suara: "Langkah tiga, tulis kalimat penjumlahannya." },
  { ikon: "🔢", teks: "Hitung hasilnya", suara: "Langkah empat, hitung hasilnya dengan cara yang kamu suka." },
  { ikon: "🎤", teks: "Sampaikan di kelas", suara: "Langkah lima, sampaikan ceritamu di depan kelas." },
];

/** Lima kotak: bilangan, tanda, bilangan, tanda, hasil. Masing-masing diberi nama. */
function KolomPenyelesaian() {
  const kolom: { isi: React.ReactNode; nama: string }[] = [
    { isi: <Kotak v={4} kecil />, nama: "bilangan pertama" },
    { isi: <Tanda t="+" kecil />, nama: "tambah" },
    { isi: <Kotak v={2} kecil />, nama: "bilangan kedua" },
    { isi: <Tanda t="=" kecil />, nama: "sama dengan" },
    { isi: <Kotak v={6} kecil />, nama: "hasil" },
  ];
  return (
    <div className="flex items-start justify-center gap-1">
      {kolom.map((k, i) => (
        <div key={i} className="flex w-[52px] flex-col items-center gap-1">
          {k.isi}
          <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]/80">{k.nama}</span>
        </div>
      ))}
    </div>
  );
}

export function InfografisSoalC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Cara Menyelesaikan Soal Cerita</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="TIGA BAGIAN SOAL CERITA"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Soal cerita punya tiga bagian. Bagian pertama, berapa yang sudah ada: ada empat burung di pohon. Bagian kedua, berapa yang datang lagi: datang lagi dua burung. Bagian ketiga, pertanyaannya: berapa jumlah semua burung?"
      >
        <div className="space-y-2">
          {[
            { label: "📦 ADA", teks: "Ada 4 burung di pohon.", ikon: "🐦", n: 4, warna: "#FEE2E2" },
            { label: "➕ DATANG LAGI", teks: "Datang lagi 2 burung.", ikon: "🐦", n: 2, warna: "#DCFCE7" },
            { label: "❓ PERTANYAAN", teks: "Berapa jumlah semua burung?", ikon: "", n: 0, warna: "#FEF9C3" },
          ].map((b) => (
            <div key={b.label} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] px-2 py-1.5" style={{ backgroundColor: b.warna }}>
              <p className="text-[11px] font-black tracking-wide text-[#1C01A5]/70">{b.label}</p>
              <p className="text-base font-black leading-snug text-[#1C01A5]">{b.teks}</p>
              {b.n > 0 ? <Kelompok ikon={b.ikon} n={b.n} kelas="text-2xl" /> : null}
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="KATA PETUNJUK TAMBAH"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Ada kata yang memberi petunjuk tambah. Datang lagi. Diberi lagi. Bergabung. Jumlah semua. Semuanya. Kalau kamu menemukan kata ini, bendanya bertambah dan kita memakai tanda tambah."
      >
        <div className="space-y-1.5">
          {KATA_PETUNJUK.map((k) => (
            <div key={k.kata} className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#F0AB00] text-lg font-black text-[#1C01A5]">
                +
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-black leading-tight text-[#1C01A5]">{k.kata}</span>
                <span className="block text-xs font-black leading-tight text-[#1C01A5]/70">{k.contoh}</span>
              </span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="TULIS PENYELESAIAN"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Tulis penyelesaiannya. Bilangan pertama empat. Tanda tambah. Bilangan kedua dua. Tanda sama dengan. Hasilnya enam. Empat ditambah dua sama dengan enam."
      >
        <div className="space-y-2 text-center">
          <KolomPenyelesaian />
          <Kelompok ikon="🐦" n={6} kelas="text-2xl" />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="JAWABAN KALIMAT"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Tulis jawabanmu dalam kalimat lengkap. Semuanya ada enam burung. Halim memiliki tujuh pensil. Di dalam kelas ada delapan siswa. Selalu ada hasilnya dan nama bendanya."
      >
        <div className="space-y-1.5">
          {[
            { awal: "Semuanya ada", n: 6, benda: "burung" },
            { awal: "Halim memiliki", n: 7, benda: "pensil" },
            { awal: "Di dalam kelas ada", n: 8, benda: "siswa" },
          ].map((j) => (
            <p key={j.benda} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">
              {j.awal}{" "}
              <span className="rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] px-1.5">{j.n}</span>{" "}
              <span className="rounded-lg border-2 border-[#1C01A5] bg-[#BFDBFE] px-1.5">{j.benda}</span>.
            </p>
          ))}
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Kuning: hasil. Biru: nama benda.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="SATU CERITA, DUA PERTANYAAN"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Satu cerita bisa punya dua pertanyaan. Ada tiga sepeda dan satu becak. Pertanyaan pertama, berapa jumlah semua kendaraan? Tiga ditambah satu sama dengan empat. Pertanyaan kedua, berapa jumlah semua roda? Tiap sepeda punya dua roda, jadi enam roda. Becak punya tiga roda. Enam ditambah tiga sama dengan sembilan."
      >
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-4 gap-1">
            {(["sepeda", "sepeda", "sepeda", "becak"] as JenisKendaraan[]).map((j, i) => (
              <Kendaraan key={i} jenis={j} kelas="w-full" />
            ))}
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
            <p className="text-xs font-black text-[#1C01A5]/70">Jumlah semua kendaraan?</p>
            <Persamaan a={3} b={1} c={4} kecil />
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
            <p className="text-xs font-black text-[#1C01A5]/70">Jumlah semua roda?</p>
            <Persamaan a={6} b={3} c={9} kecil />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className={CHIP_BIRU}>Sepeda 2 roda</span>
            <span className={CHIP_BIRU}>Becak 3 roda</span>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="PERIKSA JAWABANMU"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Periksa jawabanmu dengan cara lain. Tukar tempat. Hitung maju. Pakai jari. Atau gambar. Kalau hasilnya sama, jawabanmu benar."
      >
        <div className="grid grid-cols-2 gap-2">
          {CARA_PERIKSA.map((c) => (
            <button
              key={c.nama}
              type="button"
              aria-label={`Dengarkan: ${c.nama}`}
              onClick={() => speakGuru(c.suara)}
              className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center"
            >
              <span className="text-3xl">{c.ikon}</span>
              <span className="text-sm font-black leading-tight text-[#1C01A5]">{c.nama}</span>
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]/70">{c.isi}</span>
            </button>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="BUAT CERITAMU SENDIRI"
        warna="#4F46E5"
        speakGuru={speakGuru}
        suara="Ayo buat ceritamu sendiri. Satu, buat ceritanya. Dua, gambar ceritanya. Tiga, tulis kalimat penjumlahan. Empat, hitung hasilnya. Lima, sampaikan di kelas."
      >
        <div className="space-y-1.5">
          {LANGKAH_CERITAKU.map((l, i) => (
            <button
              key={l.teks}
              type="button"
              aria-label={`Dengarkan: ${l.teks}`}
              onClick={() => speakGuru(l.suara)}
              className="igil-tanpa-tepi flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-lg font-black text-white">
                {i + 1}
              </span>
              <span className="text-2xl">{l.ikon}</span>
              <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{l.teks}</span>
              <LencanaSuara kelas="h-7 w-7" />
            </button>
          ))}
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_C2.map((g) => (
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

/* --------- Permainan 1. Isi Dua Stoples lalu Tuang (hlm. 70, 73) ---------- */

const RONDE_STOPLES = [
  { ikonA: "🍬", ikonB: "🍭", a: 3, b: 2, kataA: "permen bulat", kataB: "permen tongkat", benda: "permen" },
  { ikonA: "🔴", ikonB: "🔵", a: 3, b: 4, kataA: "kelereng merah", kataB: "kelereng biru", benda: "kelereng" },
  { ikonA: "🔴", ikonB: "🔵", a: 4, b: 5, kataA: "kelereng merah", kataB: "kelereng biru", benda: "kelereng" },
];

function RondeStoples({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_STOPLES[ronde];
  const c = d.a + d.b;
  const [n, setN] = useState<[number, number]>([0, 0]);
  const [tuang, setTuang] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_STOPLES.length - 1;
  const suara = panel.suara["c2-stoples"] === true && akhir;
  const bukaC = !akhir || suara;
  const siap = n[0] === d.a && n[1] === d.b;
  useBicara(tuang, `${ucapTambah(d.a, d.b, c)}. Semuanya ada ${kataK(c)} ${d.benda}.`);

  const target = [d.a, d.b];
  const ubah = (i: 0 | 1, delta: number) => {
    if (tuang) return;
    const baru = n[i] + delta;
    if (baru < 0) return;
    if (baru > target[i]) {
      setKabar({ teks: `Cukup! Di cerita hanya ada ${kataK(target[i])}.`, ok: false });
      return;
    }
    setKabar(null);
    setN(i === 0 ? [baru, n[1]] : [n[0], baru]);
  };

  const stoples = (i: 0 | 1) => {
    const ikon = i === 0 ? d.ikonA : d.ikonB;
    const nama = i === 0 ? d.kataA : d.kataB;
    return (
      <div className="space-y-1.5">
        <button
          type="button"
          aria-label={`Masukkan satu ${nama} ke stoples ${i === 0 ? "kiri" : "kanan"}`}
          disabled={tuang}
          onClick={() => ubah(i, 1)}
          className="igil-tanpa-tepi block w-full"
        >
          <span className="mx-auto block h-3 w-4/5 rounded-md border-4 border-[#1C01A5] bg-[#93C5FD]" />
          <span className="mx-auto flex min-h-[112px] w-full flex-wrap content-end items-end justify-center gap-0.5 rounded-b-3xl rounded-t-lg border-4 border-[#1C01A5] bg-[#DBEAFE]/70 p-1.5">
            {Array.from({ length: n[i] }, (_, k) => (
              <span key={k} className="igil-muncul text-2xl leading-none">
                {ikon}
              </span>
            ))}
          </span>
        </button>
        <p className="text-center text-xs font-black leading-tight text-[#1C01A5]/80">{nama}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="min-w-6 text-center text-2xl font-black text-[#1C01A5]">{n[i]}</span>
          <button
            type="button"
            aria-label={`Ambil satu ${nama} kembali`}
            disabled={tuang || n[i] === 0}
            onClick={() => ubah(i, -1)}
            className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5] disabled:opacity-40"
          >
            ↩ Ambil
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : tuang ? "Ucapkan: semua benda" : siap ? "Tuang jadi satu!" : "Isi dua stoples sesuai cerita"}
        teks={`Dengar ceritanya. Ketuk stoples untuk memasukkan benda satu per satu. Isi stoples kiri sebanyak ${kataK(d.a)} dan stoples kanan sebanyak ${kataK(d.b)}. Lalu tuang jadi satu dan ucapkan berapa semuanya.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Ada ${d.a} ${d.kataA}.`, `Ada ${d.b} ${d.kataB}.`, `Berapa jumlah semua ${d.benda}?`]} />
        {!tuang ? (
          <div className="grid grid-cols-2 gap-3">
            {stoples(0)}
            {stoples(1)}
          </div>
        ) : (
          <div className="igil-muncul mx-auto w-4/5 space-y-1">
            <span className="mx-auto block h-3 w-4/5 rounded-md border-4 border-[#1C01A5] bg-[#93C5FD]" />
            <span className="flex min-h-[112px] flex-wrap content-end items-end justify-center gap-0.5 rounded-b-3xl rounded-t-lg border-4 border-[#1C01A5] bg-[#DBEAFE]/70 p-1.5">
              {Array.from({ length: d.a }, (_, k) => (
                <span key={`a${k}`} className="text-2xl leading-none">
                  {d.ikonA}
                </span>
              ))}
              {Array.from({ length: d.b }, (_, k) => (
                <span key={`b${k}`} className="text-2xl leading-none">
                  {d.ikonB}
                </span>
              ))}
            </span>
          </div>
        )}
        {siap && !tuang ? (
          <button
            type="button"
            onClick={() => {
              setTuang(true);
              letusan.picu();
              onBeres();
            }}
            className={TOMBOL_KECIL}
          >
            ⬇️ Tuang jadi satu
          </button>
        ) : null}
        {tuang ? <Persamaan a={d.a} b={d.b} c={bukaC ? c : "?"} kecil /> : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahStoples({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Isi Dua Stoples lalu Tuang"
      warna="#FFE566"
      petunjuk="Dengar ceritanya. Ketuk stoples untuk memasukkan benda sebanyak yang disebut cerita. Lalu tuang jadi satu, dan ucapkan berapa semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-stoples"
      jumlahRonde={RONDE_STOPLES.length}
      kunciAkhir={9}
      belumSiap="Isi kedua stoples dulu, lalu tuang jadi satu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeStoples ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Hitung Roda (hlm. 69, 72) ------------------------- */

const RONDE_RODA: [KelompokK, KelompokK][] = [
  [
    { jenis: "motor", n: 1 },
    { jenis: "mobil", n: 1 },
  ],
  [
    { jenis: "sepeda", n: 2 },
    { jenis: "becak", n: 1 },
  ],
  [
    { jenis: "sepeda", n: 3 },
    { jenis: "becak", n: 1 },
  ],
];

function RondeRoda({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [k1, k2] = RONDE_RODA[ronde];
  const daftar: (0 | 1)[] = [...Array.from({ length: k1.n }, () => 0 as const), ...Array.from({ length: k2.n }, () => 1 as const)];
  const roda = (w: 0 | 1) => RODA_PER[(w === 0 ? k1 : k2).jenis];
  const a = k1.n * RODA_PER[k1.jenis];
  const b = k2.n * RODA_PER[k2.jenis];
  const c = a + b;
  const ucap = useContext(SuaraCtx);
  const [hitung, setHitung] = useState<boolean[]>(() => daftar.map(() => false));
  const letusan = useLetusan();
  const beres = hitung.every(Boolean);
  const akhir = ronde === RONDE_RODA.length - 1;
  const suara = panel.suara["c2-roda"] === true && akhir;
  const bukaC = !akhir || suara;
  const total = daftar.reduce<number>((s, w, i) => (hitung[i] ? s + roda(w) : s), 0);
  useBicara(beres, `${ucapTambah(a, b, c)}. Semuanya ada ${kataK(c)} roda.`);

  const ketuk = (i: number) => {
    if (hitung[i]) return;
    const baru = hitung.slice();
    baru[i] = true;
    setHitung(baru);
    const jumlah = total + roda(daftar[i]);
    if (baru.every(Boolean)) {
      letusan.picu();
      onBeres();
    } else {
      ucap(kataK(jumlah));
    }
  };

  const nama = (k: KelompokK) => `${k.n} ${NAMA_KENDARAAN[k.jenis]}`;

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua roda" : "Ketuk kendaraan, hitung rodanya"}
        teks={`Ada ${nama(k1)} dan ${nama(k2)}. Berapa jumlah semua rodanya? Ketuk tiap kendaraan satu per satu. Rodanya bertambah. Lalu ucapkan berapa semua roda.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Ada ${nama(k1)}.`, `Ada ${nama(k2)}.`, "Berapa jumlah semua rodanya?"]} />
        <div className="grid grid-cols-2 gap-2">
          {[k1, k2].map((k) => (
            <div key={k.jenis} className="flex items-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-1">
              <Kendaraan jenis={k.jenis} kelas="w-12" />
              <span className="text-xs font-black leading-tight text-[#1C01A5]">
                {NAMA_KENDARAAN[k.jenis]}
                <span className="block text-sm">{RODA_PER[k.jenis]} roda</span>
              </span>
            </div>
          ))}
        </div>
        <div className={`grid gap-1.5 ${daftar.length > 3 ? "grid-cols-4" : "grid-cols-3"}`}>
          {daftar.map((w, i) => {
            const k = w === 0 ? k1 : k2;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Hitung roda ${NAMA_KENDARAAN[k.jenis]}`}
                disabled={hitung[i]}
                onClick={() => ketuk(i)}
                className={`relative rounded-xl border-4 px-0.5 pb-1 pt-3 shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
                  hitung[i] ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"
                }`}
              >
                <Kendaraan jenis={k.jenis} kelas="w-full" />
                {hitung[i] ? (
                  <span className="igil-muncul absolute -right-1 -top-2 rounded-full border-2 border-[#1C01A5] bg-[#F0AB00] px-1.5 text-sm font-black text-[#1C01A5]">
                    +{roda(w)}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className={CHIP_EMAS}>Roda sekarang {total}</span>
          <span className={CHIP_BIRU}>
            Dihitung {hitung.filter(Boolean).length} dari {daftar.length}
          </span>
        </div>
        {beres ? <Persamaan a={a} b={b} c={bukaC ? c : "?"} kecil /> : null}
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahRoda({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Hitung Roda"
      warna="#FFE566"
      petunjuk="Ketuk tiap kendaraan untuk menghitung rodanya. Sepeda dua roda, becak tiga roda, motor dua roda, mobil empat roda. Setelah semua dihitung, ucapkan berapa semua roda."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-roda"
      jumlahRonde={RONDE_RODA.length}
      kunciAkhir={9}
      belumSiap="Hitung semua kendaraan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRoda ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Parkiran Pilih-Pilih (hlm. 69, 72) ---------------- */

const RONDE_PARKIR: { a: KelompokK; b: KelompokK; ganggu: KelompokK }[] = [
  { a: { jenis: "motor", n: 3 }, b: { jenis: "mobil", n: 2 }, ganggu: { jenis: "sepeda", n: 2 } },
  { a: { jenis: "sepeda", n: 4 }, b: { jenis: "becak", n: 2 }, ganggu: { jenis: "motor", n: 2 } },
  { a: { jenis: "motor", n: 4 }, b: { jenis: "sepeda", n: 3 }, ganggu: { jenis: "mobil", n: 2 } },
];

function RondeParkir({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_PARKIR[ronde];
  const total = d.a.n + d.b.n;
  const mentah = [...ulang(d.a), ...ulang(d.b), ...ulang(d.ganggu)];
  const pool = mentah
    .map((jenis, i) => ({ jenis, i }))
    .sort((x, y) => ((x.i * 5 + 2) % mentah.length) - ((y.i * 5 + 2) % mentah.length));
  const [masuk, setMasuk] = useState<boolean[]>(() => mentah.map(() => false));
  const [parkir, setParkir] = useState<JenisKendaraan[]>([]);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = parkir.length >= total;
  const akhir = ronde === RONDE_PARKIR.length - 1;
  const suara = panel.suara["c2-parkir"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(d.a.n, d.b.n, total)}. Semuanya ada ${kataK(total)} kendaraan.`);

  const taruh = (i: number, jenis: JenisKendaraan) => {
    if (masuk[i] || beres) return;
    if (jenis === d.a.jenis || jenis === d.b.jenis) {
      setSalah(null);
      setKabar(null);
      const baru = masuk.slice();
      baru[i] = true;
      setMasuk(baru);
      const daftar = [...parkir, jenis];
      setParkir(daftar);
      if (daftar.length >= total) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(i);
      setKabar({ teks: `Cerita tidak menyebut ${NAMA_KENDARAAN[jenis]}. Pilih kendaraan yang ada di cerita.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua kendaraan" : "Pilih hanya yang ada di cerita"}
        teks={`Dengar ceritanya. Ada ${d.a.n} ${NAMA_KENDARAAN[d.a.jenis]} dan ${d.b.n} ${NAMA_KENDARAAN[d.b.jenis]}. Seret atau ketuk hanya kendaraan yang disebut di cerita ke tempat parkir. Kendaraan lain jangan diajak. Lalu ucapkan jumlah semua kendaraan.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita
          baris={[`Ada ${d.a.n} ${NAMA_KENDARAAN[d.a.jenis]}.`, `Ada ${d.b.n} ${NAMA_KENDARAAN[d.b.jenis]}.`, "Berapa jumlah semua kendaraan?"]}
        />
        <div className="grid min-h-[72px] grid-cols-4 gap-1.5 rounded-2xl border-4 border-dashed border-[#A8672D] bg-white/70 p-1.5">
          {pool.map(({ jenis, i }) =>
            masuk[i] ? null : (
              <BendaSeret
                key={`${i}-${salah === i ? "x" : "o"}`}
                id={String(i)}
                aktif={!beres}
                label={`Kendaraan ${NAMA_KENDARAAN[jenis]}`}
                kelas={salah === i ? "igil-goyang" : ""}
                onKetuk={() => taruh(i, jenis)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "c2-parkir") taruh(i, jenis);
                }}
              >
                <Kendaraan jenis={jenis} kelas="w-full" />
              </BendaSeret>
            )
          )}
        </div>
        <div
          data-zona="c2-parkir"
          className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#9CA3AF] px-2 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]"
        >
          <p className="text-center text-sm font-black text-white">🅿️ Tempat parkir</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: total }, (_, i) => (
              <span
                key={i}
                className="flex h-12 w-14 items-center justify-center rounded-lg border-4 border-dashed border-white/80 bg-[#6B7280]/40"
              >
                {parkir[i] ? <Kendaraan jenis={parkir[i]} kelas="igil-muncul w-12" /> : null}
              </span>
            ))}
          </div>
          <p className="text-center text-sm font-black text-white">
            {parkir.length} dari {total}
          </p>
        </div>
        {beres ? <Persamaan a={d.a.n} b={d.b.n} c={bukaC ? total : "?"} kecil /> : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahParkir({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Parkiran Pilih-Pilih"
      warna="#FFE566"
      petunjuk="Dengar ceritanya. Seret atau ketuk ke tempat parkir hanya kendaraan yang disebut di cerita. Kendaraan lain tidak ikut. Setelah selesai, ucapkan jumlah semua kendaraan."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-parkir"
      jumlahRonde={RONDE_PARKIR.length}
      kunciAkhir={7}
      belumSiap="Isi tempat parkir sesuai cerita dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeParkir ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Susun Cerita dengan Kartu (hlm. 65-68) ------------ */

const RONDE_SUSUN: {
  kartu: { t: string; ikon: string; n: number }[];
  a: number;
  b: number;
  acak: number[];
  benda: string;
}[] = [
  {
    kartu: [
      { t: "Halim mempunyai 3 pensil merah.", ikon: "✏️", n: 3 },
      { t: "Halim mempunyai 4 pensil hijau.", ikon: "✏️", n: 4 },
      { t: "Berapa jumlah semua pensil Halim?", ikon: "❓", n: 0 },
    ],
    a: 3,
    b: 4,
    acak: [2, 0, 1],
    benda: "pensil",
  },
  {
    kartu: [
      { t: "Ada 5 siswa di dalam kelas.", ikon: "🧒", n: 5 },
      { t: "Datang lagi 3 siswa.", ikon: "🧒", n: 3 },
      { t: "Berapakah jumlah semua siswa sekarang?", ikon: "❓", n: 0 },
    ],
    a: 5,
    b: 3,
    acak: [1, 2, 0],
    benda: "siswa",
  },
  {
    kartu: [
      { t: "Ada 4 burung di pohon.", ikon: "🐦", n: 4 },
      { t: "Datang lagi 2 burung.", ikon: "🐦", n: 2 },
      { t: "Berapa jumlah semua burung?", ikon: "❓", n: 0 },
    ],
    a: 4,
    b: 2,
    acak: [2, 1, 0],
    benda: "burung",
  },
];

const PETUNJUK_URUT = [
  "Mulai dari bagian pertama: berapa yang sudah ada.",
  "Sekarang bagian kedua: yang ditambahkan.",
  "Terakhir, pertanyaannya.",
];

function RondeSusun({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_SUSUN[ronde];
  const c = d.a + d.b;
  const [n, setN] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = n >= 3;
  const akhir = ronde === RONDE_SUSUN.length - 1;
  const suara = panel.suara["c2-susun"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${d.kartu.map((k) => k.t).join(" ")} ${ucapTambah(d.a, d.b, c)}.`);

  const ketuk = (k: number) => {
    if (beres || k < n) return;
    if (k === n) {
      setSalah(null);
      setKabar(null);
      const baru = n + 1;
      setN(baru);
      if (baru >= 3) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(k);
      setKabar({ teks: PETUNJUK_URUT[n], ok: false });
    }
  };

  const wajah = (k: number) => {
    const kt = d.kartu[k];
    return (
      <>
        {kt.n > 0 ? <Kelompok ikon={kt.ikon} n={kt.n} kelas="text-xl" /> : <span className="text-3xl leading-none">{kt.ikon}</span>}
        <span className="block text-sm font-black leading-snug text-[#1C01A5]">{kt.t}</span>
      </>
    );
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: jumlah semuanya" : "Susun ceritanya berurutan"}
        teks="Ada tiga kartu cerita yang tercampur. Ketuk kartu secara berurutan: bagian yang menyebut yang sudah ada, lalu bagian yang menambah, lalu pertanyaannya."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="min-h-[96px] space-y-1.5 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white p-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Ceritaku</p>
          {Array.from({ length: n }, (_, k) => (
            <div key={k} className="igil-muncul space-y-0.5 rounded-xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-1 text-center">
              {wajah(k)}
            </div>
          ))}
          {n === 0 ? <p className="py-2 text-center text-2xl text-[#1C01A5]/40">1 ➡️ 2 ➡️ 3</p> : null}
        </div>
        {!beres ? (
          <div className="grid gap-1.5">
            {d.acak.map((k) =>
              k < n ? null : (
                <button
                  key={`${k}-${salah === k ? "x" : "o"}`}
                  type="button"
                  aria-label={`Kartu cerita: ${d.kartu[k].t}`}
                  onClick={() => ketuk(k)}
                  className={`space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5 text-center shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
                    salah === k ? "igil-goyang" : ""
                  }`}
                >
                  {wajah(k)}
                </button>
              )
            )}
          </div>
        ) : (
          <Persamaan a={d.a} b={d.b} c={bukaC ? c : "?"} kecil />
        )}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahSusun({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Susun Cerita dengan Kartu"
      warna="#FFE566"
      petunjuk="Ada tiga kartu cerita yang tercampur. Ketuk secara berurutan: yang sudah ada, yang ditambahkan, lalu pertanyaannya. Setelah ceritanya utuh, ucapkan jumlah semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-susun"
      jumlahRonde={RONDE_SUSUN.length}
      kunciAkhir={6}
      belumSiap="Susun ketiga kartu cerita dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusun ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "stoples" | "roda" | "parkir" | "susun";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "stoples" },
  { nomor: 2, tipe: "roda" },
  { nomor: 3, tipe: "parkir" },
  { nomor: 4, tipe: "susun" },
];

export function ConcreteSoalC(props: Umum) {
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
        {langkah.tipe === "stoples" ? <LangkahStoples {...dasar} /> : null}
        {langkah.tipe === "roda" ? <LangkahRoda {...dasar} /> : null}
        {langkah.tipe === "parkir" ? <LangkahParkir {...dasar} /> : null}
        {langkah.tipe === "susun" ? <LangkahSusun {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Tiga permainan diagram (tanpa gambar benda).             */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Cerita ke Model Batang (hlm. 65, 67-68, 71) ------- */
/* Diagram murni: dua batang petak dan penggaris. Tanpa gambar benda.          */

const RONDE_BATANG = [
  { a: 4, b: 2, nama: "burung" },
  { a: 3, b: 4, nama: "pensil" },
  { a: 5, b: 3, nama: "siswa" },
];

function RondeBatang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BATANG[ronde];
  const c = d.a + d.b;
  const [nA, setNA] = useState(0);
  const [nB, setNB] = useState(0);
  const [skala, setSkala] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const batangSiap = nA === d.a && nB === d.b;
  const akhir = ronde === RONDE_BATANG.length - 1;
  const suara = panel.suara["c2-batang"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(skala, `${ucapTambah(d.a, d.b, c)}. Batang jumlah berakhir di angka ${kataK(c)}.`);

  const ubah = (g: "a" | "b", arah: 1 | -1) => {
    if (batangSiap) return;
    const target = g === "a" ? d.a : d.b;
    const kini = g === "a" ? nA : nB;
    if (arah === 1 && kini >= target) {
      setKabar({ teks: `Cukup! Ceritanya hanya ${target}.`, ok: false });
      return;
    }
    if (arah === -1 && kini <= 0) return;
    setKabar(null);
    if (g === "a") setNA(kini + arah);
    else setNB(kini + arah);
  };

  const pilihSkala = (n: number) => {
    if (!batangSiap || skala) return;
    if (n === c) {
      setKeliru(null);
      setKabar(null);
      setSkala(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Lihat ujung batang yang panjang. Angka di bawahnya adalah jumlah semua.", ok: false });
    }
  };

  const stepper = (g: "a" | "b", judul: string, n: number, warna: string) => (
    <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
      <p className="text-sm font-black" style={{ color: warna }}>
        {judul}
      </p>
      <div className="flex items-center gap-2">
        <button type="button" aria-label={`Kurangi petak ${judul}`} onClick={() => ubah(g, -1)} className={TOMBOL_KECIL}>
          −
        </button>
        <div className="min-w-0 flex-1">
          {g === "a" ? <BatangSepuluh a={n} /> : <BatangSepuluh a={0} b={n} />}
        </div>
        <button type="button" aria-label={`Tambah petak ${judul}`} onClick={() => ubah(g, 1)} className={TOMBOL_KECIL}>
          +
        </button>
      </div>
      <p className="text-center text-sm font-black text-[#1C01A5]">Petak {n}</p>
    </div>
  );

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : skala ? "Ucapkan: jumlah semua" : batangSiap ? "Ketuk angka di ujung batang" : "Warnai batang sesuai cerita"}
        teks="Baca ceritanya. Tekan tanda tambah untuk mewarnai petak pada batang, sebanyak bilangan di cerita. Lalu lihat batang gabungan, dan ketuk angka di ujungnya pada penggaris."
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Ada ${d.a} ${d.nama}.`, `Datang lagi ${d.b} ${d.nama}.`, `Berapa jumlah semua ${d.nama}?`]} />
        {stepper("a", `Batang yang ada: ${d.a}`, nA, WARNA_ADA)}
        {stepper("b", `Batang datang lagi: ${d.b}`, nB, "#0369A1")}
        {batangSiap ? (
          <div className="igil-muncul space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Dua batang digabung</p>
            <BatangSepuluh a={d.a} b={d.b} />
            <div className="grid grid-cols-10 gap-0.5" role="group" aria-label="Penggaris satu sampai sepuluh">
              {Array.from({ length: 10 }, (_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Angka ${n}`}
                    disabled={skala}
                    onClick={() => pilihSkala(n)}
                    className={`flex aspect-square w-full items-center justify-center rounded-md border-[3px] border-[#1C01A5] p-0 text-sm font-black leading-none text-[#1C01A5] ${
                      skala && n === c ? "bg-[#F0AB00]" : keliru === n ? "igil-goyang bg-[#FECACA]" : "bg-[#EDE9FE]"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
        {skala ? <Persamaan a={d.a} b={d.b} c={bukaC ? c : "?"} kecil /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuBatang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Cerita ke Model Batang"
      warna="#FDE68A"
      petunjuk="Baca ceritanya. Warnai satu batang untuk yang ada, dan satu batang untuk yang datang lagi. Lalu lihat batang gabungan, ketuk angka di ujungnya pada penggaris, dan ucapkan jumlah semua."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-batang"
      jumlahRonde={RONDE_BATANG.length}
      kunciAkhir={8}
      belumSiap="Warnai batang dan baca penggarisnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBatang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Cerita ke Diagram (hlm. 70) ----------------------- */
/* Tiap ronde memakai bentuk diagram yang berbeda: bingkai, garis, batang.     */

type OpsiDiagram = { a: number; b: number };
type RondeCocokData = {
  bentuk: "bingkai" | "garis" | "batang";
  judul: string;
  cerita: string[];
  opsi: OpsiDiagram[];
  benar: number;
};

const RONDE_COCOK: RondeCocokData[] = [
  {
    bentuk: "bingkai",
    judul: "Pilih bingkai sepuluh yang cocok",
    cerita: ["Ada 3 siswa.", "Datang lagi 4 siswa.", "Merah = yang ada. Biru = datang lagi."],
    opsi: [
      { a: 3, b: 3 },
      { a: 3, b: 4 },
      { a: 4, b: 3 },
    ],
    benar: 1,
  },
  {
    bentuk: "garis",
    judul: "Pilih garis bilangan yang cocok",
    cerita: ["Ada 5 kue.", "Datang lagi 2 kue.", "Mulai dari 5, lalu hitung maju."],
    opsi: [
      { a: 5, b: 3 },
      { a: 2, b: 5 },
      { a: 5, b: 2 },
    ],
    benar: 2,
  },
  {
    bentuk: "batang",
    judul: "Pilih model batang yang cocok",
    cerita: ["Ada 6 bunga.", "Datang lagi 2 bunga.", "Merah = yang ada. Biru = datang lagi."],
    opsi: [
      { a: 6, b: 2 },
      { a: 6, b: 3 },
      { a: 5, b: 2 },
    ],
    benar: 0,
  },
];

function DiagramOpsi({ bentuk, a, b }: { bentuk: RondeCocokData["bentuk"]; a: number; b: number }) {
  if (bentuk === "bingkai") return <BingkaiMini merah={a} biru={b} kelas="mx-auto block w-full max-w-[150px]" />;
  if (bentuk === "garis") return <GarisMini mulai={a} lompat={b} />;
  return <BatangSepuluh a={a} b={b} kelas="mx-auto w-full max-w-[230px]" />;
}

function RondeCocok({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_COCOK[ronde];
  const bnr = d.opsi[d.benar];
  const c = bnr.a + bnr.b;
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terpilih === d.benar;
  const akhir = ronde === RONDE_COCOK.length - 1;
  const suara = panel.suara["c2-cocok"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(bnr.a, bnr.b, c)}.`);

  const ketuk = (i: number) => {
    if (beres) return;
    if (i === d.benar) {
      setTerpilih(i);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(i);
      setKabar({ teks: "Cocokkan bilangan di cerita dengan diagramnya, ya.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: jumlah semua" : "Pilih diagram yang cocok"}
        teks={`Dengar ceritanya. ${d.cerita.join(" ")} ${d.judul}.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={d.cerita} />
        <p className="text-center text-sm font-black text-[#1C01A5]/70">{d.judul}</p>
        <div className="space-y-2">
          {d.opsi.map((o, i) => (
            <button
              key={`${ronde}-${i}`}
              type="button"
              aria-label={`Diagram ${i + 1}`}
              disabled={beres && i !== d.benar}
              onClick={() => ketuk(i)}
              className={`igil-tanpa-tepi relative block w-full rounded-2xl border-4 bg-white px-2 py-2 ${
                beres && i === d.benar ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]"
              } ${keliru === i ? "igil-goyang" : ""} ${beres && i !== d.benar ? "opacity-50" : ""}`}
            >
              <DiagramOpsi bentuk={d.bentuk} a={o.a} b={o.b} />
              <span className="absolute -left-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-sm font-black text-[#1C01A5]">
                {i + 1}
              </span>
            </button>
          ))}
        </div>
        {beres ? <Persamaan a={bnr.a} b={bnr.b} c={bukaC ? c : "?"} kecil /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuCocok({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Cerita ke Diagram"
      warna="#FDE68A"
      petunjuk="Dengar ceritanya. Pilih satu dari tiga diagram yang cocok dengan cerita. Bentuk diagramnya berganti tiap soal: bingkai sepuluh, garis bilangan, lalu model batang. Terakhir, ucapkan jumlah semua."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-cocok"
      jumlahRonde={RONDE_COCOK.length}
      kunciAkhir={8}
      belumSiap="Pilih diagram yang cocok dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCocok ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Tabel Hitung Cerita (hlm. 69, 72) ----------------- */
/* Tabel dengan strip titik. Nama kendaraan hanya kata, bukan gambar.          */

const RONDE_TABEL: { a: KelompokK; b: KelompokK }[] = [
  { a: { jenis: "sepeda", n: 3 }, b: { jenis: "becak", n: 1 } },
  { a: { jenis: "motor", n: 3 }, b: { jenis: "mobil", n: 2 } },
  { a: { jenis: "sepeda", n: 4 }, b: { jenis: "motor", n: 3 } },
];

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TABEL[ronde];
  const c = d.a.n + d.b.n;
  const nilai = [d.a.n, d.b.n, c];
  const [langkah, setLangkah] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  const akhir = ronde === RONDE_TABEL.length - 1;
  const suara = panel.suara["c2-tabel"] === true && akhir;
  useBicara(beres, `${ucapTambah(d.a.n, d.b.n, c)}. Semuanya ada ${kataK(c)} kendaraan.`);

  const pilih = (n: number) => {
    if (beres) return;
    if (n === nilai[langkah]) {
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
      setKabar({
        teks: langkah === 2 ? "Jumlah semua adalah dua baris titik digabung. Tambahkan lagi." : "Hitung titik pada baris ini satu per satu, ya.",
        ok: false,
      });
    }
  };

  const baris = [
    { k: d.a, sel: 0, warna: WARNA_ADA },
    { k: d.b, sel: 1, warna: WARNA_DATANG },
  ];

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: jumlah semua" : langkah === 2 ? "Isi jumlah semua" : "Hitung titik, isi tabel"}
        teks={`Dengar ceritanya. Hitung titik pada baris ${NAMA_KENDARAAN[d.a.jenis]} dan baris ${NAMA_KENDARAAN[d.b.jenis]}. Isi tabel dari atas ke bawah dengan memilih angka. Terakhir isi jumlah semua kendaraan.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita
          baris={[
            `Ada ${d.a.n} ${NAMA_KENDARAAN[d.a.jenis]}.`,
            `Ada ${d.b.n} ${NAMA_KENDARAAN[d.b.jenis]}.`,
            "Berapa jumlah semua kendaraan?",
          ]}
        />
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          {baris.map(({ k, sel, warna }) => (
            <div key={sel} className="flex items-center gap-2 border-b-4 border-[#1C01A5] px-2 py-2">
              <span className="w-[72px] shrink-0 text-base font-black capitalize text-[#1C01A5]">{NAMA_KENDARAAN[k.jenis]}</span>
              <span className="min-w-0 flex-1">
                <BarisTitik n={k.n} warna={warna} />
              </span>
              <Kotak v={langkah > sel ? nilai[sel] : "?"} nyala={langkah === sel} kecil />
            </div>
          ))}
          <div className="flex items-center gap-2 bg-[#FFF7CC] px-2 py-2">
            <span className="w-[72px] shrink-0 text-base font-black text-[#1C01A5]">Jumlah semua</span>
            <span className="min-w-0 flex-1">
              <DuaKelompokTitik a={d.a.n} b={d.b.n} />
            </span>
            <Kotak v={langkah > 2 ? c : "?"} nyala={langkah === 2} kecil />
          </div>
        </div>
        {!beres ? <PilihAngka opsi={opsiTiga(nilai[langkah])} keliru={keliru} onPilih={pilih} /> : <Persamaan a={d.a.n} b={d.b.n} c={c} kecil />}
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
      judul="Tabel Hitung Cerita"
      warna="#FDE68A"
      petunjuk="Dengar ceritanya. Hitung titik pada tiap baris tabel. Isi tabel dari atas ke bawah dengan memilih angka. Terakhir isi jumlah semua kendaraan, lalu ucapkan."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={7}
      belumSiap="Isi seluruh tabel dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Picture --------------------------------------------- */

type TipePicture = "batang" | "cocok" | "tabel";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "batang" },
  { nomor: 6, tipe: "cocok" },
  { nomor: 7, tipe: "tabel" },
];

export function PictureSoalC(props: Umum) {
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
        {kartu.tipe === "batang" ? <KartuBatang {...dasar} /> : null}
        {kartu.tipe === "cocok" ? <KartuCocok {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tiga permainan angka dan simbol, lalu Poin Penting.     */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Tulis Penyelesaian dan Jawaban (hlm. 67-68) ------- */

const RONDE_JAWAB: {
  cerita: string[];
  a: number;
  b: number;
  awal: string;
  benda: string;
  pilihBenda: string[];
}[] = [
  {
    cerita: ["Ada 5 siswa di dalam kelas.", "Datang lagi 3 siswa.", "Berapakah jumlah semua siswa sekarang?"],
    a: 5,
    b: 3,
    awal: "Di dalam kelas ada",
    benda: "siswa",
    pilihBenda: ["guru", "siswa", "meja"],
  },
  {
    cerita: ["Halim mempunyai 3 pensil merah.", "Halim mempunyai 4 pensil hijau.", "Berapa jumlah semua pensil Halim?"],
    a: 3,
    b: 4,
    awal: "Halim memiliki",
    benda: "pensil",
    pilihBenda: ["pensil", "buku", "penghapus"],
  },
];

function RondeJawab({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_JAWAB[ronde];
  const c = d.a + d.b;
  const urutan: (number | string)[] = [d.a, "+", d.b, "=", c];
  const kartu: (number | string)[] = ["=", d.b, c, "+", d.a];
  const [n, setN] = useState(0);
  const [pakai, setPakai] = useState<(number | string)[]>([]);
  const [keliru, setKeliru] = useState<number | string | null>(null);
  const [angka, setAngka] = useState<number | null>(null);
  const [benda, setBenda] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const fase = n < 5 ? 0 : angka === null ? 1 : benda === null ? 2 : 3;
  const akhir = ronde === RONDE_JAWAB.length - 1;
  const suara = panel.suara["c2-jawab"] === true && akhir;
  useBicara(fase === 3, `${ucapTambah(d.a, d.b, c)}. ${d.awal} ${kataK(c)} ${d.benda}.`);

  const taruh = (v: number | string) => {
    if (fase !== 0) return;
    if (v === urutan[n]) {
      setKeliru(null);
      setKabar(null);
      setPakai((p) => [...p, v]);
      setN(n + 1);
    } else {
      setKeliru(v);
      setKabar({
        teks:
          n === 0
            ? "Mulai dari bilangan pertama di cerita."
            : n === 1
              ? "Sekarang pilih tanda tambah."
              : n === 2
                ? "Lalu bilangan kedua di cerita."
                : n === 3
                  ? "Sekarang pilih tanda sama dengan."
                  : "Terakhir, hasilnya.",
        ok: false,
      });
    }
  };

  const pilihAngka = (x: number) => {
    if (fase !== 1) return;
    if (x === c) {
      setKeliru(null);
      setKabar(null);
      setAngka(x);
    } else {
      setKeliru(x);
      setKabar({ teks: "Lihat hasil penjumlahan yang tadi kamu tulis.", ok: false });
    }
  };

  const pilihBenda = (b: string) => {
    if (fase !== 2) return;
    if (b === d.benda) {
      setKabar(null);
      setBenda(b);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(b);
      setKabar({ teks: `Yang dihitung di cerita adalah ${d.benda}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : fase === 3 ? "Ucapkan: hasilnya" : fase === 2 ? "Pilih nama bendanya" : fase === 1 ? "Pilih hasilnya" : "Tulis penyelesaiannya"}
        teks="Baca ceritanya. Pertama susun kalimat penjumlahan dengan mengetuk kartu berurutan. Lalu lengkapi kalimat jawaban dengan hasil dan nama bendanya."
      />
      <div className={KERTAS_ANGKA}>
        <TeksCerita baris={d.cerita} />
        <Persamaan
          a={n > 0 ? d.a : null}
          t1={n > 1 ? "+" : null}
          b={n > 2 ? d.b : null}
          t2={n > 3 ? "=" : null}
          c={n > 4 ? c : null}
          nyala={fase === 0 ? [n] : []}
        />
        {fase === 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {kartu.map((v) =>
              pakai.includes(v) ? null : (
                <button
                  key={`${v}-${keliru === v ? "x" : "o"}`}
                  type="button"
                  aria-label={`Kartu ${v}`}
                  onClick={() => taruh(v)}
                  className={`h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-3xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                    keliru === v ? "igil-goyang" : ""
                  }`}
                >
                  {v}
                </button>
              )
            )}
          </div>
        ) : (
          <>
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2 text-center text-lg font-black leading-snug text-[#1C01A5]">
              {d.awal}{" "}
              <span className="rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] px-2">{angka ?? "…"}</span>{" "}
              <span className="rounded-lg border-2 border-[#1C01A5] bg-[#BFDBFE] px-2">{benda ?? "…"}</span>.
            </p>
            {fase === 1 ? <PilihAngka opsi={opsiTiga(c)} keliru={typeof keliru === "number" ? keliru : null} onPilih={pilihAngka} /> : null}
            {fase === 2 ? (
              <div className="grid grid-cols-3 gap-2">
                {d.pilihBenda.map((b) => (
                  <button
                    key={`${b}-${keliru === b ? "x" : "o"}`}
                    type="button"
                    aria-label={`Pilih ${b}`}
                    onClick={() => pilihBenda(b)}
                    className={`rounded-2xl border-4 border-[#1C01A5] bg-[#BFDBFE] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                      keliru === b ? "igil-goyang" : ""
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            ) : null}
          </>
        )}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuJawab({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Tulis Penyelesaian dan Jawaban"
      warna="#C7D2FE"
      petunjuk="Baca ceritanya. Susun kalimat penjumlahan dengan mengetuk kartu berurutan. Lalu lengkapi kalimat jawaban dengan hasil dan nama bendanya. Terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-jawab"
      jumlahRonde={RONDE_JAWAB.length}
      kunciAkhir={7}
      belumSiap="Lengkapi penyelesaian dan jawabannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJawab ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Pasangan Sembilan (hlm. 71, Evaluasi 4) ----------- */

const TARGET_SEMBILAN = 4;

function RondeSembilan({ panel, onBeres }: { panel: PanelSuara; onBeres: () => void }) {
  const [a, setA] = useState<number | null>(null);
  const [b, setB] = useState<number | null>(null);
  const [temu, setTemu] = useState<string[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = temu.length >= TARGET_SEMBILAN;
  const suara = panel.suara["c2-sembilan"] === true;
  useBicara(beres, "Hebat! Kamu menemukan banyak pasangan yang jumlahnya sembilan. Satu dan delapan, dua dan tujuh, tiga dan enam, empat dan lima. Semuanya sembilan.");

  const pilih = (sisi: "a" | "b", n: number) => {
    if (beres) return;
    const mulaiBaru = a !== null && b !== null;
    let na = mulaiBaru ? null : a;
    let nb = mulaiBaru ? null : b;
    if (sisi === "a") na = n;
    else nb = n;
    setA(na);
    setB(nb);
    if (na === null || nb === null) {
      setKabar(null);
      return;
    }
    const jumlah = na + nb;
    const kunci = `${na}+${nb}`;
    if (jumlah !== 9) {
      setKabar({ teks: `${kataK(na)} ditambah ${kataK(nb)} sama dengan ${kataK(jumlah)}, bukan sembilan. Coba pasangan lain.`, ok: false });
    } else if (temu.includes(kunci)) {
      setKabar({ teks: "Kalimat itu sudah kamu temukan. Cari kalimat yang lain.", ok: false });
    } else {
      const baru = [...temu, kunci];
      setTemu(baru);
      setKabar({ teks: `${ucapTambah(na, nb, 9)}. Betul!`, ok: true });
      if (baru.length >= TARGET_SEMBILAN) {
        letusan.picu();
        onBeres();
      }
    }
  };

  const baris = (sisi: "a" | "b", nilai: number | null, judul: string) => (
    <div className="space-y-1">
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{judul}</p>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 8 }, (_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${judul} ${n}`}
              disabled={beres}
              onClick={() => pilih(sisi, n)}
              className={`aspect-square rounded-xl border-4 border-[#1C01A5] p-0 text-xl font-black leading-none text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
                nilai === n ? "bg-[#F0AB00] ring-2 ring-[#1C01A5]" : "bg-[#FFE566]"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: hasilnya" : `Cari ${TARGET_SEMBILAN} kalimat hasilnya 9`}
        teks={`Pilih satu bilangan di baris atas dan satu di baris bawah. Cari ${kataK(TARGET_SEMBILAN)} kalimat penjumlahan yang hasilnya sembilan. Kalimat tukar tempat juga boleh. Setelah ketemu semua, ucapkan sembilan.`}
      />
      <div className={KERTAS_ANGKA}>
        {baris("a", a, "Bilangan pertama")}
        {baris("b", b, "Bilangan kedua")}
        <Persamaan a={a} b={b} c={a !== null && b !== null ? a + b : "?"} nyala={beres ? [] : a === null ? [0] : b === null ? [2] : []} />
        <div className="min-h-[34px] space-y-1">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {temu.map((k) => (
              <span key={k} className="igil-muncul rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-2.5 py-0.5 text-sm font-black text-[#1C01A5]">
                {k.replace("+", " + ")} = 9
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-1.5" aria-label={`${temu.length} dari ${TARGET_SEMBILAN} kalimat ditemukan`}>
            {Array.from({ length: TARGET_SEMBILAN }, (_, i) => (
              <span key={i} className="text-2xl" aria-hidden="true">
                {i < temu.length ? "⭐" : "☆"}
              </span>
            ))}
          </div>
        </div>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuSembilan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Pasangan Sembilan"
      warna="#C7D2FE"
      petunjuk="Pilih satu bilangan di baris atas dan satu di baris bawah. Cari empat kalimat penjumlahan berbeda yang hasilnya sembilan. Kalimat tukar tempat juga boleh. Setelah ketemu semua, ucapkan sembilan."
      speakGuru={speakGuru}
      panel={panel}
      id="c2-sembilan"
      jumlahRonde={1}
      kunciAkhir={9}
      belumSiap="Temukan empat kalimat yang hasilnya sembilan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondeSembilan panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara (hlm. 71, 73) ----------- */

const CARA_BERKARYA = [
  { ikon: "🖐️", nama: "Jari", suara: "Hebat! Kamu memakai jari. Buka jari sebanyak bilangan pertama, lalu tambah jari sebanyak bilangan kedua." },
  { ikon: "🏃", nama: "Hitung maju", suara: "Hebat! Kamu menghitung maju. Mulai dari bilangan pertama, lalu lompat sebanyak bilangan kedua." },
  { ikon: "🔄", nama: "Tukar tempat", suara: "Hebat! Kamu memeriksa dengan tukar tempat. Hasilnya tetap sama." },
  { ikon: "🖍️", nama: "Gambar", suara: "Hebat! Kamu menggambar kelereng di stoples, lalu menghitung semuanya." },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [lulus, setLulus] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const jumlahA = tahap === 0 ? 6 : a;
  const jumlahB = tahap === 0 ? 4 : b;
  const c = jumlahA + jumlahB;
  const id = tahap === 0 ? "c2-tulis-1" : `c2-tulis-2-${a}-${b}`;
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

  const cerita =
    tahap === 0
      ? ["Ada 6 siswa di dalam kelas.", "Datang lagi 4 siswa.", "Berapakah jumlah semua siswa sekarang?"]
      : [`Ada ${a} kelereng merah di stoples pertama.`, `Ada ${b} kelereng biru di stoples kedua.`, "Berapa jumlah semua kelereng?"];

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() =>
          speakGuru("Ucapkan hasil penjumlahan, lalu guratkan angkanya di kanvas. Setelah itu, di Ayo Berkarya, buat cerita stoples kelerengmu sendiri dengan cara yang kamu suka.")
        }
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
        {tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Berkarya"}
      </p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Ucapkan hasilnya" : "Buat ceritamu, lalu ucapkan"}
          teks={
            tahap === 0
              ? "Enam siswa di dalam kelas. Datang lagi empat siswa. Berapa jumlah semua siswa? Ucapkan hasilnya, lalu guratkan angkanya di kanvas."
              : "Ayo berkarya. Atur jumlah kelereng di dua stoples, paling banyak jumlahnya sepuluh. Dengar ceritamu, lalu ucapkan hasilnya dan guratkan angkanya."
          }
        />
        <div className={KERTAS_ANGKA}>
          <TeksCerita baris={cerita} />
          {tahap === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["a", a, "🔴"],
                  ["b", b, "🔵"],
                ] as const
              ).map(([sisi, nilai, ikon]) => (
                <div key={sisi} className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
                  <Kelompok ikon={ikon} n={nilai} kelas="text-xl" />
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label={`Kurangi stoples ${sisi === "a" ? "pertama" : "kedua"}`}
                      disabled={suara}
                      onClick={() => ubah(sisi, -1)}
                      className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-3xl font-black text-[#1C01A5]">{nilai}</span>
                    <button
                      type="button"
                      aria-label={`Tambah stoples ${sisi === "a" ? "pertama" : "kedua"}`}
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
        {suara && tahap === 1 ? (
          <div className="space-y-1.5 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-2">
            <p className="text-center text-sm font-black text-[#14532D]">Cara apa yang kamu pakai? Ketuk salah satu.</p>
            <div className="grid grid-cols-4 gap-1.5">
              {CARA_BERKARYA.map((k) => (
                <button
                  key={k.nama}
                  type="button"
                  aria-label={`Cara ${k.nama}`}
                  onClick={() => speakGuru(k.suara)}
                  className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-xl bg-[#F0FDF4] px-0.5 py-1.5 text-center"
                >
                  <span className="text-2xl">{k.ikon}</span>
                  <span className="text-[11px] font-black leading-tight text-[#14532D]">{k.nama}</span>
                </button>
              ))}
            </div>
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
            ▶ Ayo Berkarya
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting dan Catatanku ------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Soal cerita punya tiga bagian: yang ada, yang datang lagi, dan pertanyaan. Kata datang lagi dan jumlah semua memberi petunjuk tambah. Tulis penyelesaian dengan kalimat penjumlahan. Tulis jawaban dalam kalimat lengkap dengan nama benda. Terakhir, periksa jawabanmu dengan cara lain.";

const POIN_C2: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "📖",
    nama: "Tiga bagian cerita",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Yang ada • Datang lagi • Pertanyaan</p>,
    suara: "Soal cerita punya tiga bagian. Yang sudah ada. Yang datang lagi. Dan pertanyaannya.",
  },
  {
    ikon: "➕",
    nama: "Kata petunjuk tambah",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">datang lagi • jumlah semua • bergabung</p>,
    suara: "Kata datang lagi, jumlah semua, dan bergabung memberi petunjuk tambah.",
  },
  {
    ikon: "✏️",
    nama: "Penyelesaian",
    isi: <Persamaan a={4} b={2} c={6} kecil />,
    suara: "Penyelesaian adalah kalimat penjumlahan. Empat ditambah dua sama dengan enam.",
  },
  {
    ikon: "💬",
    nama: "Jawaban kalimat",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">Semuanya ada 6 burung.</p>,
    suara: "Jawaban ditulis dalam kalimat lengkap. Semuanya ada enam burung.",
  },
  {
    ikon: "🌟",
    nama: "Periksa jawabanmu",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Tukar tempat atau hitung maju</p>,
    suara: "Periksa jawabanmu dengan cara lain, misalnya tukar tempat atau hitung maju.",
  },
];

const CATATANKU = [
  "Aku sudah mengerti cerita penjumlahan.",
  "Aku bisa melakukan penjumlahan dengan berbagai cara.",
  "Aku bisa menyelesaikan soal cerita penjumlahan.",
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

function PoinPentingC2({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_C2.map((p) => (
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
            Satu cerita boleh punya dua pertanyaan. Baca pertanyaannya baik-baik sebelum menghitung.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB C ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "jawab" | "sembilan" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "jawab" },
  { nomor: 9, tipe: "sembilan" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractSoalC(props: Umum) {
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
        <PoinPentingC2
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "jawab" ? <KartuJawab {...dasar} /> : null}
          {kartu.tipe === "sembilan" ? <KartuSembilan {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}