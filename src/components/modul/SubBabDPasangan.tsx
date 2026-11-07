"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { TumpukanBalok } from "./alat-c";
import { Bagan, PohonPasangan, TupaiWajah, type Sel } from "./gambar-pasangan-d";
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
/* Sub-Bab D: Pasangan Bilangan (Buku Siswa hlm. 29-39). Semua di klien.      */
/* Naskah: naskah/mtk-1-bab1-sub-d-pasangan-bilangan.md                       */
/* Banyaknya kegiatan mengikuti halaman buku, bukan angka baku.               */
/*  Concrete 6 kegiatan, Picture 7 kartu, Abstract 5 kartu + Poin Penting.    */
/* Sepuluh permainan: lihat tiap judul permainan di bawah.                    */
/* Tanpa simbol tambah, kurang, dan sama dengan. Hanya kata dan bilangan.     */
/* ------------------------------------------------------------------------ */

type PropsLangkah = {
  speakGuru: (t: string) => void;
  lanjut: () => void;
  nomor: number;
  panel: PanelSuara;
};

/** Tupai dan gelembung kata pendek. Diketuk, tupai membacakan petunjuk lengkapnya. */
function TupaiBicara({ pendek, teks }: { pendek: string; teks?: string }) {
  const ucap = useContext(SuaraCtx);
  const isi = teks ?? pendek;
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${isi}`}
      onClick={() => ucap(isi)}
      className="igil-tanpa-tepi flex w-full items-end gap-2 text-left"
    >
      <TupaiWajah kelas="h-14 w-20 shrink-0 igil-lompat" />
      <span className="relative flex min-w-0 flex-1 items-center justify-between gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-lg font-black leading-snug text-[#1C01A5]">
        <span className="min-w-0">{pendek}</span>
        <LencanaSuara />
      </span>
    </button>
  );
}

const kunciPasangan = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

function ChipPasangan({ a, b, warna = "#FFFFFF" }: { a: number; b: number; warna?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border-4 border-[#1C01A5] px-2.5 py-0.5 text-lg font-black leading-none text-[#1C01A5]"
      style={{ backgroundColor: warna }}
    >
      <span>{a}</span>
      <span className="text-[10px]">dan</span>
      <span>{b}</span>
    </span>
  );
}

/** Bingkai sepuluh. `kuning` kotak pertama berwarna emas. Kalau ada onKetuk, tiap kotak bisa diketuk. */
function Bingkai({
  kuning,
  onKetuk,
  sisaPutih = false,
}: {
  kuning: number;
  onKetuk?: (i: number) => void;
  sisaPutih?: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-[300px] grid-cols-5 gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
      {Array.from({ length: 10 }, (_, i) => {
        const nyala = i < kuning;
        const sisa = !nyala && kuning > 0 && !sisaPutih;
        const kelas = `aspect-square w-full rounded-full border-4 border-[#1C01A5] ${
          nyala ? "bg-[#F0AB00]" : sisa ? "bg-[#C7D2FE]" : "bg-white"
        }`;
        return onKetuk ? (
          <button
            key={i}
            type="button"
            aria-label={`Kotak ${i + 1}`}
            onClick={() => onKetuk(i)}
            className={`${kelas} p-0 shadow-[0_3px_0_rgba(28,1,165,0.22)]`}
          />
        ) : (
          <span key={i} className={kelas} />
        );
      })}
    </div>
  );
}

function Kelompok({ ikon, n, kelas = "text-3xl" }: { ikon: string; n: number; kelas?: string }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-1 leading-none ${kelas}`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i}>{ikon}</span>
      ))}
    </span>
  );
}

function PilihAngka({
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

const TOMBOL_KECIL =
  "mx-auto block rounded-full border-4 border-[#1C01A5] bg-white px-5 py-2 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)]";

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman pasangan bilangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_D = [
  {
    ikon: "✂️",
    nama: "Dipisahkan",
    ket: "Satu bilangan menjadi dua bilangan",
    suara: "Dipisahkan. Satu bilangan bisa dipisahkan menjadi dua bilangan. Lima dipisahkan menjadi dua dan tiga.",
  },
  {
    ikon: "🤝",
    nama: "Digabungkan",
    ket: "Dua bilangan menjadi satu bilangan",
    suara: "Digabungkan. Dua bilangan bisa digabungkan menjadi satu bilangan. Tiga dan empat digabungkan menjadi tujuh.",
  },
];

export function InfografisPasanganD({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Pasangan Bilangan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="GABUNGAN DAN SEBAGIAN"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Lima kue terdiri dari dua dan tiga. Lima adalah Gabungan, yaitu semuanya. Dua dan tiga adalah Sebagian, yaitu bagian-bagiannya."
      >
        <Bagan gabungan={5} a={2} b={3} nama />
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="DIPISAHKAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Dipisahkan. Lima kue dipisahkan menjadi dua donat dan tiga kue bolu. Satu bilangan bisa dipisahkan menjadi dua bilangan."
      >
        <div className="space-y-2 text-center">
          <div className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2">
            <Kelompok ikon="🍩" n={2} />
            <Kelompok ikon="🧁" n={3} />
          </div>
          <p className="text-2xl" aria-hidden="true">
            ⬇️
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <Kelompok ikon="🍩" n={2} />
              <p className="text-2xl font-black text-[#1C01A5]">2</p>
            </div>
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <Kelompok ikon="🧁" n={3} />
              <p className="text-2xl font-black text-[#1C01A5]">3</p>
            </div>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="DIGABUNGKAN"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Digabungkan. Tiga bola hijau dan empat bola merah digabungkan menjadi tujuh bola. Dua bilangan bisa digabungkan menjadi satu bilangan."
      >
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <Kelompok ikon="🟢" n={3} />
              <p className="text-2xl font-black text-[#1C01A5]">3</p>
            </div>
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <Kelompok ikon="🔴" n={4} />
              <p className="text-2xl font-black text-[#1C01A5]">4</p>
            </div>
          </div>
          <p className="text-2xl" aria-hidden="true">
            ⬇️
          </p>
          <div className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2">
            <Kelompok ikon="🟢" n={3} kelas="text-2xl" />
            <Kelompok ikon="🔴" n={4} kelas="text-2xl" />
            <p className="text-2xl font-black text-[#1C01A5]">7</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="BANYAK PASANGAN"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Satu bilangan punya banyak pasangan. Lima punya pasangan satu dan empat, juga dua dan tiga. Enam punya pasangan satu dan lima, dua dan empat, juga tiga dan tiga."
      >
        <div className="space-y-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pasangan lima</p>
          <div className="grid grid-cols-2 gap-2">
            <Bagan gabungan={5} a={1} b={4} kelas="w-full" />
            <Bagan gabungan={5} a={2} b={3} kelas="w-full" />
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Pasangan enam</p>
          <div className="grid grid-cols-3 gap-1">
            <Bagan gabungan={6} a={1} b={5} kelas="w-full" />
            <Bagan gabungan={6} a={2} b={4} kelas="w-full" />
            <Bagan gabungan={6} a={3} b={3} kelas="w-full" />
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="PASANGAN SEPULUH"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Bingkai sepuluh membantu kita. Enam kotak emas dan empat kotak biru. Sepuluh terdiri dari enam dan empat. Pasangan sepuluh lainnya: satu dan sembilan, dua dan delapan, tiga dan tujuh, lima dan lima."
      >
        <div className="space-y-2">
          <div className="mx-auto grid max-w-[220px] grid-cols-5 gap-1 rounded-xl border-4 border-[#1C01A5] bg-white p-1.5">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-full border-2 border-[#1C01A5] ${i < 6 ? "bg-[#F0AB00]" : "bg-[#C7D2FE]"}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              [1, 9],
              [2, 8],
              [3, 7],
              [4, 6],
              [5, 5],
            ].map(([a, b]) => (
              <ChipPasangan key={`${a}-${b}`} a={a} b={b} warna="#FFE566" />
            ))}
          </div>
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_D.map((g) => (
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
/* Tahap 4: Concrete (enam kegiatan, lima permainan dan satu laboratorium)    */
/* ------------------------------------------------------------------------ */

type TipeConcrete = "piring" | "bola" | "jodoh" | "mobil" | "jari" | "lab";

const LANGKAH_CONCRETE: { kegiatan: number; tipe: TipeConcrete }[] = [
  { kegiatan: 1, tipe: "piring" },
  { kegiatan: 2, tipe: "bola" },
  { kegiatan: 3, tipe: "jodoh" },
  { kegiatan: 4, tipe: "mobil" },
  { kegiatan: 5, tipe: "jari" },
  { kegiatan: 6, tipe: "lab" },
];

const JUMLAH_KEGIATAN = LANGKAH_CONCRETE.length;

type Tempat = "g" | "k" | "n";

const hitungTempat = (l: Tempat[], t: Tempat) => l.filter((x) => x === t).length;

/**
 * Memisahkan sekumpulan benda ke dua tempat. Seret benda ke tempat, atau ketuk tempatnya.
 * Ketuk benda di tempat untuk mengembalikannya. Benda yang bisa diseret tidak boleh
 * berada di dalam zona, supaya titik lepas terbaca benar.
 */
function Pemisah({
  barang,
  namaKiri,
  namaKanan,
  onPisah,
}: {
  barang: string[];
  namaKiri: string;
  namaKanan: string;
  onPisah: (kiri: number, kanan: number) => void;
}) {
  const [lok, setLok] = useState<Tempat[]>(() => barang.map(() => "g" as Tempat));
  const [kabar, setKabar] = useState<Kabar>(null);
  const kiri = hitungTempat(lok, "k");
  const kanan = hitungTempat(lok, "n");
  const sisa = hitungTempat(lok, "g");
  const beres = sisa === 0 && kiri > 0 && kanan > 0;

  const pindah = (i: number, ke: Tempat) => {
    if (beres) return;
    const baru = lok.slice();
    baru[i] = ke;
    setLok(baru);
    const k = hitungTempat(baru, "k");
    const n = hitungTempat(baru, "n");
    const s = hitungTempat(baru, "g");
    if (s === 0 && k > 0 && n > 0) {
      setKabar(null);
      onPisah(k, n);
    } else if (s === 0) {
      setKabar({ teks: `Bagi ke dua tempat, ya. Jangan semua di satu tempat.`, ok: false });
    } else {
      setKabar(null);
    }
  };

  const tambah = (ke: Tempat) => {
    const i = lok.indexOf("g");
    if (i >= 0) pindah(i, ke);
  };

  const lepas = (id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    const i = Number(id);
    if (z === "pisah-k") pindah(i, "k");
    else if (z === "pisah-n") pindah(i, "n");
  };

  return (
    <div className={`${ALAS} space-y-3 p-3`}>
      <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#A8672D] bg-white/70 p-2">
        {lok.map((x, i) =>
          x === "g" ? (
            <BendaSeret
              key={i}
              id={String(i)}
              aktif={!beres}
              label={`Benda ${i + 1}`}
              onLepas={lepas}
              onKetuk={() => pindah(i, kiri <= kanan ? "k" : "n")}
            >
              <span className="block text-4xl leading-none">{barang[i]}</span>
            </BendaSeret>
          ) : null
        )}
        {sisa === 0 ? (
          <span className="text-3xl" aria-hidden="true">
            ✅
          </span>
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(["k", "n"] as const).map((t) => {
          const nama = t === "k" ? namaKiri : namaKanan;
          const isi = lok.map((x, i) => (x === t ? i : -1)).filter((i) => i >= 0);
          return (
            <div
              key={t}
              data-zona={`pisah-${t}`}
              role="button"
              tabIndex={0}
              aria-label={`Taruh satu benda di ${nama}`}
              onClick={() => tambah(t)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  tambah(t);
                }
              }}
              className={`flex min-h-[132px] flex-col items-center justify-between gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)] ${
                beres ? "" : "cursor-pointer"
              }`}
            >
              <span className="text-sm font-black text-[#1C01A5]/70">{nama}</span>
              <span className="flex min-h-[56px] flex-wrap items-center justify-center gap-1">
                {isi.map((i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label="Kembalikan benda"
                    disabled={beres}
                    onClick={(e) => {
                      e.stopPropagation();
                      pindah(i, "g");
                    }}
                    className="igil-tanpa-tepi igil-muncul p-0 text-3xl leading-none"
                  >
                    {barang[i]}
                  </button>
                ))}
              </span>
              <span className="flex h-11 min-w-11 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-2 text-2xl font-black text-[#1C01A5]">
                {isi.length}
              </span>
            </div>
          );
        })}
      </div>
      <KabarChip kabar={kabar} />
    </div>
  );
}

/* --------- Kegiatan 1. Permainan 1: Dua Piring Kira (hlm. 29) ------------- */

const BARANG_KUE = ["🍩", "🍩", "🧁", "🧁", "🧁"];

function LangkahPiring({ speakGuru, lanjut, nomor, panel }: PropsLangkah) {
  const [putaran, setPutaran] = useState(0);
  const [hasil, setHasil] = useState<[number, number] | null>(null);
  const letusan = useLetusan();
  const suara = panel.suara["d-piring"] === true;
  useBicara(
    hasil !== null,
    hasil ? `Lima kue dipisahkan menjadi ${kata(hasil[0]).toLowerCase()} dan ${kata(hasil[1]).toLowerCase()}. Lima terdiri dari ${kata(hasil[0]).toLowerCase()} dan ${kata(hasil[1]).toLowerCase()}.` : ""
  );

  const petunjuk =
    "Kira punya lima kue di piring besar. Pisahkan kue itu ke dua piring kecil. Seret kue ke piring, atau ketuk piringnya. Setelah selesai, ucapkan berapa semua kue Kira.";

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Dua Piring Kira" onSuara={() => speakGuru(petunjuk)} warna="#FFE566" />
      <TupaiBicara pendek={hasil ? "Ucapkan: semua kue" : "Pisahkan kue!"} teks={petunjuk} />
      <div className="relative">
        <Pemisah
          key={putaran}
          barang={BARANG_KUE}
          namaKiri="Piring"
          namaKanan="Piring"
          onPisah={(a, b) => {
            setHasil([a, b]);
            letusan.picu();
          }}
        />
        <Letusan id={letusan.id} />
      </div>
      {hasil ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3">
          <Bagan gabungan={5} a={hasil[0]} b={hasil[1]} nama />
          <button
            type="button"
            onClick={() => {
              setHasil(null);
              setPutaran((n) => n + 1);
            }}
            className={TOMBOL_KECIL}
          >
            🔄 Pisahkan lagi
          </button>
        </div>
      ) : null}
      <JawabSuara id="d-piring" jumlah={5} panel={panel} siap={hasil !== null} belumSiap="Pisahkan kuenya dulu, ya." />
      {suara ? <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kegiatan 2. Permainan 2: Gabung Bola (hlm. 30) ----------------- */

function LangkahBola({ speakGuru, lanjut, nomor, panel }: PropsLangkah) {
  const [masuk, setMasuk] = useState<boolean[]>(() => Array.from({ length: 7 }, () => false));
  const letusan = useLetusan();
  const total = masuk.filter(Boolean).length;
  const beres = total === 7;
  const suara = panel.suara["d-bola"] === true;
  useBicara(beres, "Tiga bola hijau dan empat bola merah digabungkan menjadi tujuh bola. Tujuh terdiri dari tiga dan empat.");

  const ke = (i: number, nilai: boolean) => {
    if (beres) return;
    const baru = masuk.slice();
    baru[i] = nilai;
    setMasuk(baru);
    if (baru.every(Boolean)) letusan.picu();
  };
  const tambah = () => {
    const i = masuk.indexOf(false);
    if (i >= 0) ke(i, true);
  };
  const lepas = (id: string, x: number, y: number) => {
    if (zonaDi(x, y) === "bola-keranjang") ke(Number(id), true);
  };
  const ikon = (i: number) => (i < 3 ? "🟢" : "🔴");

  const petunjuk =
    "Ada tiga bola hijau dan empat bola merah. Gabungkan semuanya ke dalam keranjang. Seret bola ke keranjang, atau ketuk keranjangnya. Lalu ucapkan banyak bola di keranjang.";

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Gabung Bola" onSuara={() => speakGuru(petunjuk)} warna="#C7D2FE" />
      <TupaiBicara pendek={beres ? "Ucapkan: semua bola" : "Gabungkan bola!"} teks={petunjuk} />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          {[
            { dari: 0, sampai: 3, nama: "Sebagian" },
            { dari: 3, sampai: 7, nama: "Sebagian" },
          ].map((g) => (
            <div
              key={g.dari}
              className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#A8672D] bg-white/70 p-2"
            >
              {Array.from({ length: g.sampai - g.dari }, (_, k) => g.dari + k).map((i) =>
                masuk[i] ? null : (
                  <BendaSeret key={i} id={String(i)} aktif={!beres} label={`Bola ${i + 1}`} onLepas={lepas} onKetuk={() => ke(i, true)}>
                    <span className="block text-4xl leading-none">{ikon(i)}</span>
                  </BendaSeret>
                )
              )}
            </div>
          ))}
        </div>
        <div
          data-zona="bola-keranjang"
          role="button"
          tabIndex={0}
          aria-label="Taruh satu bola di keranjang"
          onClick={tambah}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              tambah();
            }
          }}
          className="flex min-h-[132px] flex-col items-center justify-between gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]"
        >
          <span className="text-sm font-black text-[#1C01A5]/70">🧺 Gabungan</span>
          <span className="flex min-h-[56px] flex-wrap items-center justify-center gap-1">
            {masuk.map((m, i) =>
              m ? (
                <button
                  key={i}
                  type="button"
                  aria-label="Kembalikan bola"
                  disabled={beres}
                  onClick={(e) => {
                    e.stopPropagation();
                    ke(i, false);
                  }}
                  className="igil-tanpa-tepi igil-muncul p-0 text-3xl leading-none"
                >
                  {ikon(i)}
                </button>
              ) : null
            )}
          </span>
          <span className="flex h-11 min-w-11 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-2 text-2xl font-black text-[#1C01A5]">
            {total}
          </span>
        </div>
        <Letusan id={letusan.id} />
      </div>
      {beres ? (
        <div className="igil-muncul rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3">
          <Bagan gabungan={7} a={3} b={4} nama />
        </div>
      ) : null}
      <JawabSuara id="d-bola" jumlah={7} panel={panel} siap={beres} belumSiap="Gabungkan semua bolanya dulu, ya." />
      {suara ? <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kegiatan 3. Permainan 3: Pasangan Pas (hlm. 33 dan 34) --------- */

type RondeJodoh = { target: number; atas: number[]; bawah: number[]; alat: "bola" | "balok" };

const RONDE_JODOH: RondeJodoh[] = [
  { target: 5, atas: [1, 2, 3, 4], bawah: [1, 2, 3, 4], alat: "bola" },
  { target: 6, atas: [5, 4, 3, 2, 1], bawah: [2, 4, 5, 1, 3], alat: "balok" },
];

function KartuJodoh({
  n,
  alat,
  sisi,
  pilih,
  selesai,
  goyang,
  onKetuk,
}: {
  n: number;
  alat: "bola" | "balok";
  sisi: "atas" | "bawah";
  pilih: boolean;
  selesai: boolean;
  goyang: boolean;
  onKetuk: () => void;
}) {
  const gambar =
    alat === "bola" ? (
      <Kelompok ikon="🔴" n={n} kelas="text-base" />
    ) : (
      <TumpukanBalok n={n} petak={8} kelas="w-5" />
    );
  const kartu = (
    <button
      type="button"
      aria-label={`Kartu ${n}`}
      disabled={selesai}
      onClick={onKetuk}
      className={`flex h-14 w-full items-center justify-center rounded-2xl border-4 border-[#1C01A5] p-0 text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] ${
        selesai ? "bg-[#7FCB96]" : pilih ? "bg-[#F0AB00] igil-lompat" : "bg-[#FFE566]"
      } ${goyang ? "igil-goyang" : ""}`}
    >
      {n}
    </button>
  );
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 px-0.5">
      {sisi === "atas" ? (
        <>
          <div className="flex min-h-[44px] items-end justify-center">{gambar}</div>
          {kartu}
        </>
      ) : (
        <>
          {kartu}
          <div className="flex min-h-[44px] items-start justify-center">{gambar}</div>
        </>
      )}
    </div>
  );
}

function LangkahJodoh({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [ronde, setRonde] = useState(0);
  const [pilih, setPilih] = useState<{ sisi: "atas" | "bawah"; i: number } | null>(null);
  const [tautan, setTautan] = useState<[number, number][]>([]);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [salah, setSalah] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const r = RONDE_JODOH[ronde];
  const n = r.atas.length;
  const beres = tautan.length === n;
  const terakhir = ronde >= RONDE_JODOH.length - 1;

  const ketuk = (sisi: "atas" | "bawah", i: number) => {
    if (beres) return;
    const terpakai = tautan.some(([a, b]) => (sisi === "atas" ? a === i : b === i));
    if (terpakai) return;
    if (!pilih || pilih.sisi === sisi) {
      setPilih({ sisi, i });
      setKabar(null);
      return;
    }
    const a = sisi === "atas" ? i : pilih.i;
    const b = sisi === "bawah" ? i : pilih.i;
    setPilih(null);
    if (r.atas[a] + r.bawah[b] === r.target) {
      const baru: [number, number][] = [...tautan, [a, b]];
      setTautan(baru);
      setGoyang(null);
      setKabar({ teks: `${kata(r.atas[a])} dan ${kata(r.bawah[b])} digabungkan menjadi ${kata(r.target).toLowerCase()}.`, ok: true });
      if (baru.length === n) letusan.picu();
    } else {
      setGoyang(`${sisi}-${i}-${salah + 1}`);
      setSalah(salah + 1);
      setKabar({ teks: `Belum pas. Dua kartu itu harus digabungkan menjadi ${kata(r.target).toLowerCase()}.`, ok: false });
    }
  };

  const petunjuk = `Hubungkan dua kartu yang digabungkan menjadi ${kata(r.target).toLowerCase()}. Ketuk satu kartu di atas, lalu satu kartu di bawah.`;
  const terhubungAtas = new Set(tautan.map(([a]) => a));
  const terhubungBawah = new Set(tautan.map(([, b]) => b));

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={JUMLAH_KEGIATAN}
        judul={`Pasangan Pas ${r.target}`}
        onSuara={() => speakGuru(petunjuk)}
        warna="#FFD27A"
      />
      <TupaiBicara pendek={beres ? "Semua cocok!" : `Cari pasangan ${r.target}`} teks={petunjuk} />
      <div className={`${ALAS} relative p-3`}>
        <div className="mb-2 flex justify-center">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-4 py-1 text-xl font-black text-[#1C01A5]">
            Jumlah {r.target}
          </span>
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {r.atas.map((v, i) => (
            <KartuJodoh
              key={i}
              n={v}
              alat={r.alat}
              sisi="atas"
              pilih={pilih?.sisi === "atas" && pilih.i === i}
              selesai={terhubungAtas.has(i)}
              goyang={goyang?.startsWith(`atas-${i}-`) ?? false}
              onKetuk={() => ketuk("atas", i)}
            />
          ))}
        </div>
        <div className="relative h-16">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {tautan.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                x1={((a + 0.5) / n) * 100}
                y1="0"
                x2={((b + 0.5) / n) * 100}
                y2="100"
                stroke="#1C01A5"
                strokeWidth="4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {r.bawah.map((v, i) => (
            <KartuJodoh
              key={i}
              n={v}
              alat={r.alat}
              sisi="bawah"
              pilih={pilih?.sisi === "bawah" && pilih.i === i}
              selesai={terhubungBawah.has(i)}
              goyang={goyang?.startsWith(`bawah-${i}-`) ?? false}
              onKetuk={() => ketuk("bawah", i)}
            />
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {beres ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-3xl">🌟</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {tautan.map(([a, b]) => (
              <ChipPasangan key={`${a}-${b}`} a={r.atas[a]} b={r.bawah[b]} warna="#FFE566" />
            ))}
          </div>
        </div>
      ) : null}
      {beres && !terakhir ? (
        <TombolLanjut
          teks="PASANGAN ENAM ➡️"
          onClick={() => {
            setRonde((x) => x + 1);
            setTautan([]);
            setPilih(null);
            setKabar(null);
          }}
        />
      ) : null}
      {beres && terakhir ? <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kegiatan 4. Permainan 4: Banyak Cara Mobil Upe (hlm. 35) ------- */

const BARANG_MOBIL = Array.from({ length: 8 }, () => "🚗");
const PETAL = [
  { x: 60, y: 22 },
  { x: 98, y: 60 },
  { x: 60, y: 98 },
  { x: 22, y: 60 },
];

function BungaPasangan({ ditemukan }: { ditemukan: [number, number][] }) {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto block h-auto w-40" role="img" aria-label={`${ditemukan.length} dari 4 kelopak terisi`}>
      {PETAL.map((p, i) => {
        const ada = ditemukan[i];
        return (
          <g key={i} className={ada ? "igil-muncul" : ""}>
            <circle cx={p.x} cy={p.y} r="19" fill={ada ? "#FFE566" : "#FFFFFF"} stroke="#1C01A5" strokeWidth="3.4" strokeDasharray={ada ? undefined : "5 4"} />
            {ada ? (
              <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#1C01A5">
                {ada[0]} {ada[1]}
              </text>
            ) : null}
          </g>
        );
      })}
      <circle cx="60" cy="60" r="19" fill="#F0AB00" stroke="#1C01A5" strokeWidth="3.4" />
      <text x="60" y="68" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1C01A5">
        8
      </text>
    </svg>
  );
}

function LangkahMobil({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [putaran, setPutaran] = useState(0);
  const [hasil, setHasil] = useState<[number, number] | null>(null);
  const [ditemukan, setDitemukan] = useState<[number, number][]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = ditemukan.length >= 4;

  const petunjuk =
    "Upe punya delapan mobil. Pisahkan mobil itu ke dua garasi. Ada banyak cara memisahkan delapan mobil. Temukan empat cara berbeda, ya.";

  const pisah = (a: number, b: number) => {
    const kunci = kunciPasangan(a, b);
    if (ditemukan.some(([x, y]) => kunciPasangan(x, y) === kunci)) {
      setKabar({ teks: `Pasangan ${kata(a).toLowerCase()} dan ${kata(b).toLowerCase()} sudah ada. Cari cara yang lain.`, ok: false });
      setHasil(null);
      return;
    }
    const baru: [number, number][] = [...ditemukan, a <= b ? [a, b] : [b, a]];
    setDitemukan(baru);
    setHasil([a, b]);
    setKabar({ teks: `Delapan terdiri dari ${kata(a).toLowerCase()} dan ${kata(b).toLowerCase()}. Pasangan baru!`, ok: true });
    if (baru.length >= 4) letusan.picu();
  };

  const lagi = () => {
    setHasil(null);
    setKabar(null);
    setPutaran((n) => n + 1);
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Banyak Cara Mobil Upe" onSuara={() => speakGuru(petunjuk)} warna="#BBF7D0" />
      <TupaiBicara pendek={beres ? "Empat cara! Hebat!" : "Temukan empat cara"} teks={petunjuk} />
      <div className="relative">
        <Pemisah key={putaran} barang={BARANG_MOBIL} namaKiri="Garasi" namaKanan="Garasi" onPisah={pisah} />
        <Letusan id={letusan.id} />
      </div>
      {kabar && !hasil ? <KabarChip kabar={kabar} /> : null}
      {hasil ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3">
          <Bagan gabungan={8} a={hasil[0]} b={hasil[1]} />
        </div>
      ) : null}
      {hasil || kabar ? (
        beres ? null : (
          <button type="button" onClick={lagi} className={TOMBOL_KECIL}>
            🔄 Cari cara lain
          </button>
        )
      ) : null}
      <div className="space-y-2 rounded-3xl border-4 border-[#1C01A5] bg-white p-3">
        <BungaPasangan ditemukan={ditemukan} />
        <p className="text-center text-lg font-black text-[#1C01A5]" aria-label={`${ditemukan.length} dari 4 cara ditemukan`}>
          {Array.from({ length: 4 }, (_, i) => (i < ditemukan.length ? "⭐" : "☆")).join(" ")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {ditemukan.map(([a, b]) => (
            <ChipPasangan key={`${a}-${b}`} a={a} b={b} warna="#FFE566" />
          ))}
        </div>
      </div>
      {beres ? <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kegiatan 5. Permainan 5: Tebak Jari Tersembunyi (sepuluh) ------ */

const RONDE_JARI = [
  { terlihat: 6, opsi: [3, 4, 5], kunci: 4 },
  { terlihat: 3, opsi: [6, 7, 8], kunci: 7 },
  { terlihat: 8, opsi: [1, 2, 3], kunci: 2 },
];

function TanganJari({ terlihat, buka }: { terlihat: number; buka: boolean }) {
  const dasar = [0, 22, 44, 66, 88];
  const tinggiAtas = [46, 68, 78, 68, 52];
  const tangan = (mulai: number, x0: number) => (
    <g>
      <rect x={x0 - 6} y="82" width="122" height="56" rx="22" fill="#FFE0BD" stroke="#1C01A5" strokeWidth="3.4" />
      {dasar.map((dx, k) => {
        const idx = mulai + k;
        const naik = idx < terlihat || buka;
        const tinggi = naik ? tinggiAtas[k] : 20;
        return (
          <g key={k}>
            <rect
              x={x0 + dx}
              y={naik ? 86 - tinggi : 70}
              width="20"
              height={naik ? tinggi + 4 : 18}
              rx="10"
              fill={naik ? (idx < terlihat ? "#FFE0BD" : "#FFE566") : "#C7D2FE"}
              stroke="#1C01A5"
              strokeWidth="3"
              className={naik && buka && idx >= terlihat ? "igil-muncul" : ""}
            />
            {!naik ? (
              <text x={x0 + dx + 10} y="86" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1C01A5">
                ?
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 280 150" className="mx-auto block h-auto w-full max-w-[320px]" role="img" aria-label={`${terlihat} jari terlihat dari sepuluh`}>
      {tangan(0, 12)}
      {tangan(5, 152)}
    </svg>
  );
}

function LangkahJari({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [ronde, setRonde] = useState(0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const r = RONDE_JARI[ronde];
  const terakhir = ronde >= RONDE_JARI.length - 1;

  const petunjuk = `Ada sepuluh jari. Yang terlihat ${kata(r.terlihat).toLowerCase()} jari. Berapa jari yang bersembunyi? Pilih angkanya.`;

  const pilih = (n: number) => {
    if (benar) return;
    if (n === r.kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar({
        teks: `Sepuluh terdiri dari ${kata(r.terlihat).toLowerCase()} dan ${kata(r.kunci).toLowerCase()}. Betul!`,
        ok: true,
      });
      letusan.picu();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung jari yang terlihat, lalu pikirkan sisanya dari sepuluh.", ok: false });
    }
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Tebak Jari Tersembunyi" onSuara={() => speakGuru(petunjuk)} warna="#FBCFE8" />
      <TupaiBicara pendek={benar ? "Betul!" : "Berapa yang sembunyi?"} teks={petunjuk} />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <TanganJari terlihat={r.terlihat} buka={benar} />
        <div className="flex items-center justify-center gap-3">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-4 py-1 text-xl font-black text-[#1C01A5]">
            Terlihat {r.terlihat}
          </span>
          <span className="rounded-full border-4 border-dashed border-[#1C01A5] bg-[#FFF7CC] px-4 py-1 text-xl font-black text-[#1C01A5]">
            {benar ? `Sembunyi ${r.kunci}` : "Sembunyi ?"}
          </span>
        </div>
        <PilihAngka opsi={r.opsi} keliru={keliru} onPilih={pilih} mati={benar} />
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {benar ? (
        <div className="igil-muncul rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3">
          <Bagan gabungan={10} a={r.terlihat} b={r.kunci} nama />
        </div>
      ) : null}
      {benar && !terakhir ? (
        <TombolLanjut
          teks="TEBAK LAGI ➡️"
          onClick={() => {
            setRonde((x) => x + 1);
            setBenar(false);
            setKeliru(null);
            setKabar(null);
          }}
        />
      ) : null}
      {benar && terakhir ? <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kegiatan 6. Laboratorium: Ayo Mencoba (hlm. 30) ---------------- */

const ANGKA_LAB = [2, 3, 4, 5, 6, 7, 8, 9, 10];

function LangkahLab({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [total, setTotal] = useState<number | null>(null);
  const [putaran, setPutaran] = useState(0);
  const [hasil, setHasil] = useState<[number, number] | null>(null);
  const [lulus, setLulus] = useState(false);
  const letusan = useLetusan();

  const petunjuk =
    "Ayo mencoba! Pilih satu bilangan, lalu pisahkan bendanya menjadi dua kelompok. Hitung tiap kelompok. Coba dengan bilangan lain juga.";

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Ayo Mencoba" onSuara={() => speakGuru(petunjuk)} warna="#E9D5FF" />
      <TupaiBicara pendek={total ? "Pisahkan bendanya!" : "Pilih bilangan"} teks={petunjuk} />
      <div className="grid grid-cols-5 gap-2">
        {ANGKA_LAB.map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`Pilih bilangan ${n}`}
            onClick={() => {
              setTotal(n);
              setHasil(null);
              setLulus(false);
              setPutaran((x) => x + 1);
            }}
            className={`rounded-2xl border-4 border-[#1C01A5] py-2 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] ${
              total === n ? "bg-[#F0AB00]" : "bg-[#FFE566]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {total ? (
        <>
          <div className="relative">
            <Pemisah
              key={`${total}-${putaran}`}
              barang={Array.from({ length: total }, () => "⚽")}
              namaKiri="Kelompok"
              namaKanan="Kelompok"
              onPisah={(a, b) => {
                setHasil([a, b]);
                letusan.picu();
              }}
            />
            <Letusan id={letusan.id} />
          </div>
          {hasil ? (
            <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3">
              <Bagan gabungan={total} a={hasil[0]} b={hasil[1]} nama />
              <button
                type="button"
                onClick={() => {
                  setHasil(null);
                  setPutaran((x) => x + 1);
                }}
                className={TOMBOL_KECIL}
              >
                🔄 Pisahkan lagi
              </button>
            </div>
          ) : null}
          {hasil ? (
            <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
              <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis bilangannya</div>
              <DottedNumberTracingCanvas
                key={`lab-${total}`}
                digit={total}
                kata={kata(total)}
                onCompletedTrace={() => setLulus(true)}
              />
              <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
            </div>
          ) : null}
        </>
      ) : null}
      <TombolLanjut teks="LANJUTKAN KE PICTURE ⬇️" onClick={lanjut} />
    </>
  );
}

export function ConcretePasanganD(props: Umum) {
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
  const dasar = { speakGuru, lanjut, nomor: langkah.kegiatan, panel };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan pindahkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Kegiatan ${langkah.kegiatan} dari ${JUMLAH_KEGIATAN}`}>
        {Array.from({ length: JUMLAH_KEGIATAN }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i < langkah.kegiatan ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "piring" ? <LangkahPiring {...dasar} /> : null}
        {langkah.tipe === "bola" ? <LangkahBola {...dasar} /> : null}
        {langkah.tipe === "jodoh" ? <LangkahJodoh {...dasar} /> : null}
        {langkah.tipe === "mobil" ? <LangkahMobil {...dasar} /> : null}
        {langkah.tipe === "jari" ? <LangkahJari {...dasar} /> : null}
        {langkah.tipe === "lab" ? <LangkahLab {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture (tujuh kartu diagram)                                     */
/* ------------------------------------------------------------------------ */

type KartuGambarD =
  | {
      id: string;
      bentuk: "hilang";
      judul: string;
      gabungan: number;
      a: { ikon: string; n: number };
      b: { ikon: string; n: number };
      kosong: ("a" | "b")[];
      opsi: number[][];
      suara: string;
      hasil: string;
    }
  | { id: string; bentuk: "warnai"; judul: string; ikon: string; n: number; suara: string }
  | { id: string; bentuk: "bingkai"; judul: string; suara: string }
  | { id: string; bentuk: "pohon"; judul: string; suara: string };

const KARTU_GAMBAR_D: KartuGambarD[] = [
  {
    id: "d-gambar-1",
    bentuk: "hilang",
    judul: "Mangga dan Rambutan",
    gabungan: 8,
    a: { ikon: "🥭", n: 5 },
    b: { ikon: "🍒", n: 3 },
    kosong: ["b"],
    opsi: [[2, 3, 4]],
    suara:
      "Ada delapan buah. Lima di antaranya mangga. Sisanya rambutan. Lihat bagan pasangan, lalu pilih bilangan yang hilang di lingkaran Sebagian.",
    hasil: "Delapan buah terdiri dari lima mangga dan tiga rambutan.",
  },
  {
    id: "d-gambar-2",
    bentuk: "hilang",
    judul: "Jeruk dan Salak",
    gabungan: 9,
    a: { ikon: "🍊", n: 4 },
    b: { ikon: "🌰", n: 5 },
    kosong: ["a", "b"],
    opsi: [
      [3, 4, 5],
      [4, 5, 6],
    ],
    suara:
      "Ada sembilan buah, terdiri dari jeruk dan salak. Hitung jeruknya, lalu isi lingkaran pertama. Hitung salaknya, lalu isi lingkaran kedua.",
    hasil: "Sembilan buah terdiri dari empat jeruk dan lima salak.",
  },
  {
    id: "d-gambar-3",
    bentuk: "warnai",
    judul: "Kelinci Berbagi",
    ikon: "🐰",
    n: 5,
    suara:
      "Ada lima kelinci. Ketuk kelinci untuk memberi warna merah muda atau biru. Warnai semua kelinci dengan dua warna, lalu lihat pasangan bilangannya.",
  },
  {
    id: "d-gambar-4",
    bentuk: "warnai",
    judul: "Enam Kue Lezat",
    ikon: "🧁",
    n: 6,
    suara:
      "Ada enam kue. Ketuk kue untuk memberi warna merah muda atau biru. Warnai semua kue dengan dua warna, lalu lihat pasangan bilangannya.",
  },
  {
    id: "d-gambar-5",
    bentuk: "warnai",
    judul: "Tujuh Kue Lapis",
    ikon: "🍰",
    n: 7,
    suara:
      "Ada tujuh kue lapis. Ketuk kue untuk memberi warna merah muda atau biru. Warnai semuanya dengan dua warna, lalu lihat pasangan bilangannya.",
  },
  {
    id: "d-gambar-6",
    bentuk: "bingkai",
    judul: "Bingkai Sepuluh",
    suara:
      "Ini bingkai sepuluh. Ketuk sebuah kotak. Kotak dari awal sampai yang kamu ketuk jadi emas, sisanya biru. Temukan tiga pasangan sepuluh yang berbeda.",
  },
  {
    id: "d-gambar-7",
    bentuk: "pohon",
    judul: "Pohon Pasangan Malosi",
    suara:
      "Malosi punya delapan kelereng. Pohon ini memisahkan kelereng menjadi dua, lagi, dan lagi. Isi bilangan yang hilang satu per satu dari atas ke bawah.",
  },
];

type PropsKartu = {
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
};

function KartuPicture({
  judul,
  suara,
  pendek,
  teks,
  indeks,
  total,
  speakGuru,
  children,
}: {
  judul: string;
  suara: string;
  pendek: string;
  teks: string;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul={judul} onSuara={() => speakGuru(suara)} warna="#FDE68A" />
      <CatatanTempel pendek={pendek} teks={teks} />
      {children}
    </>
  );
}

const KERTAS_GAMBAR = "relative space-y-3 rounded-lg border-[3px] border-[#6B7280] bg-white/90 p-3 shadow-[3px_4px_0_rgba(0,0,0,0.12)]";

const TEKS_LANJUT_PICTURE = (terakhir: boolean) => (terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️");

/* --------- Permainan 6: Cabang yang Hilang (hlm. 31) ---------------------- */

function KartuHilang({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: PropsKartu & { kartu: Extract<KartuGambarD, { bentuk: "hilang" }> }) {
  const [langkah, setLangkah] = useState(0);
  const [isi, setIsi] = useState<{ a?: number; b?: number }>({});
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const penuh = langkah >= kartu.kosong.length;
  const sekarang = penuh ? null : kartu.kosong[langkah];
  const suaraOk = panel.suara[kartu.id] === true;
  const kunciAkhir = kartu.b.n;
  useBicara(suaraOk, kartu.hasil);

  const tampil = (sisi: "a" | "b"): Sel => {
    if (!kartu.kosong.includes(sisi)) return sisi === "a" ? kartu.a.n : kartu.b.n;
    if (isi[sisi] !== undefined) return isi[sisi] as number;
    return sekarang === sisi ? "?" : null;
  };

  const pilih = (n: number) => {
    if (!sekarang) return;
    const kunci = sekarang === "a" ? kartu.a.n : kartu.b.n;
    if (n === kunci) {
      setIsi((s) => ({ ...s, [sekarang]: n }));
      setKeliru(null);
      setKabar(null);
      const baru = langkah + 1;
      setLangkah(baru);
      if (baru >= kartu.kosong.length) letusan.picu();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung dulu bendanya satu per satu, ya.", ok: false });
    }
  };

  return (
    <KartuPicture
      judul={kartu.judul}
      suara={kartu.suara}
      pendek={suaraOk ? "Hebat!" : penuh ? "Ucapkan bilangan terakhir" : "Isi lingkaran yang hilang"}
      teks={suaraOk ? "Hebat! Kamu menemukan pasangannya." : kartu.suara}
      indeks={indeks}
      total={total}
      speakGuru={speakGuru}
    >
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          {[kartu.a, kartu.b].map((g, i) => (
            <div key={i} className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
              <Kelompok ikon={g.ikon} n={g.n} kelas="text-3xl" />
            </div>
          ))}
        </div>
        <Bagan gabungan={kartu.gabungan} a={tampil("a")} b={tampil("b")} nyala={sekarang ? [sekarang] : []} />
        {sekarang ? (
          <PilihAngka opsi={kartu.opsi[langkah]} keliru={keliru} onPilih={pilih} />
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      <JawabSuara
        id={kartu.id}
        jumlah={kunciAkhir}
        panel={panel}
        siap={penuh}
        belumSiap="Isi lingkaran yang hilang dulu, ya."
      />
      {suaraOk ? <TombolLanjut teks={TEKS_LANJUT_PICTURE(indeks >= total - 1)} onClick={lanjut} /> : null}
    </KartuPicture>
  );
}

/* --------- Permainan 7: Warnai dan Pisahkan (hlm. 32) --------------------- */

const WARNA_BENDA = ["#FFFFFF", "#F8C4C4", "#C7D2FE"];

function KartuWarnai({
  kartu,
  indeks,
  total,
  speakGuru,
  lanjut,
}: PropsKartu & { kartu: Extract<KartuGambarD, { bentuk: "warnai" }> }) {
  const [warna, setWarna] = useState<number[]>(() => Array.from({ length: kartu.n }, () => 0));
  const letusan = useLetusan();
  const merah = warna.filter((w) => w === 1).length;
  const biru = warna.filter((w) => w === 2).length;
  const beres = warna.every((w) => w > 0) && merah > 0 && biru > 0;
  useBicara(
    beres,
    `${kata(kartu.n)} terdiri dari ${kata(merah).toLowerCase()} dan ${kata(biru).toLowerCase()}.`
  );

  const ketuk = (i: number) => {
    if (beres) return;
    const baru = warna.slice();
    baru[i] = (baru[i] + 1) % 3;
    setWarna(baru);
    if (baru.every((w) => w > 0) && baru.some((w) => w === 1) && baru.some((w) => w === 2)) letusan.picu();
  };

  const semuaSatuWarna = !beres && warna.every((w) => w > 0);

  return (
    <KartuPicture
      judul={kartu.judul}
      suara={kartu.suara}
      pendek={beres ? "Hebat!" : "Warnai dua warna"}
      teks={beres ? `${kata(kartu.n)} terdiri dari ${kata(merah).toLowerCase()} dan ${kata(biru).toLowerCase()}.` : kartu.suara}
      indeks={indeks}
      total={total}
      speakGuru={speakGuru}
    >
      <div className={KERTAS_GAMBAR}>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white p-3">
          {warna.map((w, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Warnai benda ${i + 1}`}
              disabled={beres}
              onClick={() => ketuk(i)}
              className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#1C01A5] p-0 text-4xl leading-none shadow-[0_3px_0_rgba(28,1,165,0.22)]"
              style={{ backgroundColor: WARNA_BENDA[w] }}
            >
              {kartu.ikon}
            </button>
          ))}
        </div>
        <Bagan
          gabungan={kartu.n}
          a={beres ? merah : merah > 0 ? merah : "?"}
          b={beres ? biru : biru > 0 ? biru : "?"}
        />
        <Letusan id={letusan.id} />
      </div>
      {semuaSatuWarna ? (
        <KabarChip kabar={{ teks: "Pakai dua warna, ya. Jangan hanya satu warna.", ok: false }} />
      ) : null}
      {beres ? (
        <button
          type="button"
          onClick={() => setWarna(Array.from({ length: kartu.n }, () => 0))}
          className={TOMBOL_KECIL}
        >
          🔄 Warnai lagi
        </button>
      ) : null}
      {beres ? <TombolLanjut teks={TEKS_LANJUT_PICTURE(indeks >= total - 1)} onClick={lanjut} /> : null}
    </KartuPicture>
  );
}

/* --------- Permainan 8: Bingkai Sepuluh Dua Warna (hlm. 39) --------------- */

function KartuBingkai({
  kartu,
  indeks,
  total,
  speakGuru,
  lanjut,
}: PropsKartu & { kartu: Extract<KartuGambarD, { bentuk: "bingkai" }> }) {
  const [kuning, setKuning] = useState(0);
  const [ditemukan, setDitemukan] = useState<[number, number][]>([]);
  const letusan = useLetusan();
  const beres = ditemukan.length >= 3;

  const ketuk = (i: number) => {
    if (beres) return;
    const k = i + 1;
    setKuning(k);
    if (k >= 10) return;
    const kunci = kunciPasangan(k, 10 - k);
    if (!ditemukan.some(([a, b]) => kunciPasangan(a, b) === kunci)) {
      const baru: [number, number][] = [...ditemukan, [k, 10 - k]];
      setDitemukan(baru);
      if (baru.length >= 3) letusan.picu();
    }
  };

  return (
    <KartuPicture
      judul={kartu.judul}
      suara={kartu.suara}
      pendek={beres ? "Hebat!" : "Ketuk sebuah kotak"}
      teks={beres ? "Hebat! Sepuluh punya banyak pasangan." : kartu.suara}
      indeks={indeks}
      total={total}
      speakGuru={speakGuru}
    >
      <div className={KERTAS_GAMBAR}>
        <Bingkai kuning={kuning} onKetuk={ketuk} />
        <Bagan gabungan={10} a={kuning > 0 && kuning < 10 ? kuning : "?"} b={kuning > 0 && kuning < 10 ? 10 - kuning : "?"} />
        <p className="text-center text-lg font-black text-[#1C01A5]" aria-label={`${Math.min(3, ditemukan.length)} dari 3 pasangan`}>
          {Array.from({ length: 3 }, (_, i) => (i < ditemukan.length ? "⭐" : "☆")).join(" ")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {ditemukan.map(([a, b]) => (
            <ChipPasangan key={`${a}-${b}`} a={a} b={b} warna="#FFE566" />
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      {beres ? <TombolLanjut teks={TEKS_LANJUT_PICTURE(indeks >= total - 1)} onClick={lanjut} /> : null}
    </KartuPicture>
  );
}

/* --------- Permainan 9: Pohon Pasangan Malosi (hlm. 38) ------------------- */

const LANGKAH_POHON = [
  { sel: 2, kunci: 5, opsi: [4, 5, 6], ucap: "Delapan terdiri dari tiga dan lima." },
  { sel: 3, kunci: 3, opsi: [2, 3, 4], ucap: "Lima terdiri dari tiga dan dua." },
  { sel: 5, kunci: 1, opsi: [1, 2, 3], ucap: "Tiga terdiri dari satu dan dua." },
];

function KartuPohon({
  kartu,
  indeks,
  total,
  speakGuru,
  lanjut,
}: PropsKartu & { kartu: Extract<KartuGambarD, { bentuk: "pohon" }> }) {
  const [langkah, setLangkah] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= LANGKAH_POHON.length;
  const sekarang = beres ? null : LANGKAH_POHON[langkah];

  const sel: Sel[] = [8, 3, null, null, 2, null, 2];
  LANGKAH_POHON.forEach((l, i) => {
    sel[l.sel] = i < langkah ? l.kunci : i === langkah ? "?" : null;
  });

  const pilih = (n: number) => {
    if (!sekarang) return;
    if (n === sekarang.kunci) {
      setKeliru(null);
      setKabar({ teks: sekarang.ucap, ok: true });
      const baru = langkah + 1;
      setLangkah(baru);
      if (baru >= LANGKAH_POHON.length) letusan.picu();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Lihat dua bilangan di bawahnya, lalu pikirkan jumlahnya.", ok: false });
    }
  };

  return (
    <KartuPicture
      judul={kartu.judul}
      suara={kartu.suara}
      pendek={beres ? "Hebat!" : "Isi bilangan hilang"}
      teks={beres ? "Hebat! Delapan dipisahkan sampai ke satu." : kartu.suara}
      indeks={indeks}
      total={total}
      speakGuru={speakGuru}
    >
      <div className={KERTAS_GAMBAR}>
        <div className="flex items-center justify-center gap-1 text-2xl" aria-hidden="true">
          <Kelompok ikon="🔵" n={8} kelas="text-xl" />
        </div>
        <PohonPasangan sel={sel} sorot={sekarang?.sel} />
        {sekarang ? <PilihAngka opsi={sekarang.opsi} keliru={keliru} onPilih={pilih} /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {beres ? <TombolLanjut teks={TEKS_LANJUT_PICTURE(indeks >= total - 1)} onClick={lanjut} /> : null}
    </KartuPicture>
  );
}

export function PicturePasanganD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_GAMBAR_D[indeks];
  const terakhir = indeks >= KARTU_GAMBAR_D.length - 1;

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
  const dasar = { indeks, total: KARTU_GAMBAR_D.length, speakGuru, panel, lanjut };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_GAMBAR_D.length}`}>
        {KARTU_GAMBAR_D.map((k, i) => (
          <span
            key={k.id}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={kartu.id} className="space-y-3">
        {kartu.bentuk === "hilang" ? <KartuHilang kartu={kartu} {...dasar} /> : null}
        {kartu.bentuk === "warnai" ? <KartuWarnai kartu={kartu} {...dasar} /> : null}
        {kartu.bentuk === "bingkai" ? <KartuBingkai kartu={kartu} {...dasar} /> : null}
        {kartu.bentuk === "pohon" ? <KartuPohon kartu={kartu} {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract (lima kartu lambang) dan Poin Penting                    */
/* ------------------------------------------------------------------------ */

type KartuLambangD =
  | {
      id: string;
      bentuk: "rahasia";
      gabungan: Sel;
      a: Sel;
      b: Sel;
      kosong: "g" | "a" | "b";
      opsi: number[];
      kunci: number;
      pendek: string;
      suara: string;
      salah: string;
      kalimat: string;
      tulis: boolean;
    }
  | { id: string; bentuk: "tiga" }
  | { id: string; bentuk: "bilanganku" };

const KARTU_LAMBANG_D: KartuLambangD[] = [
  {
    id: "d-lambang-1",
    bentuk: "rahasia",
    gabungan: 9,
    a: 4,
    b: "?",
    kosong: "b",
    opsi: [4, 5, 6],
    kunci: 5,
    pendek: "Isi kotak rahasia",
    suara:
      "Sembilan dipisahkan menjadi empat dan satu bilangan rahasia. Pilih bilangan rahasia di kotak Sebagian, lalu ucapkan.",
    salah: "Belum tepat. Empat dan berapa digabungkan menjadi sembilan? Coba hitung lagi.",
    kalimat: "Sembilan terdiri dari empat dan lima.",
    tulis: false,
  },
  {
    id: "d-lambang-2",
    bentuk: "rahasia",
    gabungan: 6,
    a: "?",
    b: 2,
    kosong: "a",
    opsi: [3, 4, 5],
    kunci: 4,
    pendek: "Isi kotak rahasia",
    suara:
      "Enam dipisahkan menjadi satu bilangan rahasia dan dua. Pilih bilangan rahasia di kotak Sebagian, lalu ucapkan.",
    salah: "Belum tepat. Berapa dan dua digabungkan menjadi enam? Coba hitung lagi.",
    kalimat: "Enam terdiri dari empat dan dua.",
    tulis: false,
  },
  {
    id: "d-lambang-3",
    bentuk: "rahasia",
    gabungan: "?",
    a: 4,
    b: 1,
    kosong: "g",
    opsi: [3, 5, 6],
    kunci: 5,
    pendek: "Cari Gabungan rahasia",
    suara:
      "Empat dan satu digabungkan menjadi satu bilangan rahasia. Pilih bilangan rahasia di kotak Gabungan, ucapkan, lalu tulis di kanvas.",
    salah: "Belum tepat. Gabungkan empat dan satu. Berapa semuanya?",
    kalimat: "Empat dan satu digabungkan menjadi lima.",
    tulis: true,
  },
  { id: "d-lambang-4", bentuk: "tiga" },
  { id: "d-lambang-5", bentuk: "bilanganku" },
];

function KartuRahasia({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: PropsKartu & { kartu: Extract<KartuLambangD, { bentuk: "rahasia" }> }) {
  const [dipilih, setDipilih] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [lulus, setLulus] = useState(false);
  const suara = panel.suara[kartu.id] === true;
  useBicara(suara, kartu.kalimat);

  const pilih = (n: number) => {
    if (dipilih) return;
    if (n === kartu.kunci) {
      setDipilih(true);
      setKeliru(null);
      setKabar({ teks: "Bilangannya sudah pas! Sekarang ucapkan bilangannya.", ok: true });
    } else {
      setKeliru(n);
      setKabar({ teks: kartu.salah, ok: false });
    }
  };

  const isi = (s: Sel, sisi: "g" | "a" | "b"): Sel => (kartu.kosong === sisi && dipilih ? kartu.kunci : s);
  const hint = suara ? "Hebat! Lihat bagannya di bawah." : dipilih ? "Sekarang ucapkan bilangannya." : kartu.suara;

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul="Kotak Rahasia" onSuara={() => speakGuru(kartu.suara)} warna="#C7D2FE" />
      <CatatanPensil pendek={suara ? "Hebat!" : dipilih ? "Ucapkan bilangannya" : kartu.pendek} teks={hint} />

      <div className="rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-2">
        <Bagan
          gabungan={isi(kartu.gabungan, "g")}
          a={isi(kartu.a, "a")}
          b={isi(kartu.b, "b")}
          nyala={dipilih ? [kartu.kosong] : []}
          nama
        />
      </div>

      <PilihAngka opsi={kartu.opsi} keliru={keliru} onPilih={pilih} mati={dipilih} />
      <KabarChip kabar={kabar} />

      <JawabSuara id={kartu.id} jumlah={kartu.kunci} panel={panel} siap={dipilih} belumSiap="Pilih bilangan rahasia dulu, ya." />

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

      {suara ? <TombolLanjut teks={indeks >= total - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kartu 4. Tiga pasangan bilangan tujuh (hlm. 37 nomor 5) -------- */

const CHIP_TIGA: [number, number][] = [
  [6, 1],
  [2, 4],
  [5, 2],
  [4, 4],
  [3, 4],
  [6, 2],
];

function KartuTiga({ indeks, total, speakGuru, lanjut }: PropsKartu) {
  const [dapat, setDapat] = useState<[number, number][]>([]);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [salah, setSalah] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = dapat.length >= 3;

  const petunjuk =
    "Tujuh punya banyak pasangan. Ketuk tiga pasangan yang digabungkan menjadi tujuh. Hati-hati, ada pasangan yang bukan tujuh.";

  const ketuk = (a: number, b: number) => {
    if (beres) return;
    const kunci = kunciPasangan(a, b);
    if (a + b !== 7) {
      setGoyang(`${a}-${b}-${salah + 1}`);
      setSalah(salah + 1);
      setKabar({ teks: `${kata(a)} dan ${kata(b).toLowerCase()} bukan tujuh. Coba pasangan lain.`, ok: false });
      return;
    }
    if (dapat.some(([x, y]) => kunciPasangan(x, y) === kunci)) {
      setKabar({ teks: "Pasangan itu sudah kamu pilih. Cari yang lain.", ok: false });
      return;
    }
    const baru: [number, number][] = [...dapat, [a, b]];
    setDapat(baru);
    setGoyang(null);
    setKabar({ teks: `${kata(a)} dan ${kata(b).toLowerCase()} digabungkan menjadi tujuh. Betul!`, ok: true });
    if (baru.length >= 3) letusan.picu();
  };

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul="Tiga Pasangan Tujuh" onSuara={() => speakGuru(petunjuk)} warna="#BBF7D0" />
      <CatatanPensil pendek={beres ? "Hebat!" : "Pilih tiga pasangan"} teks={beres ? "Hebat! Tujuh punya tiga pasangan." : petunjuk} />
      <div className="relative grid grid-cols-3 gap-2 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-2">
        {Array.from({ length: 3 }, (_, i) => {
          const p = dapat[i];
          return <Bagan key={i} gabungan={7} a={p ? p[0] : "?"} b={p ? p[1] : "?"} kelas="w-full" />;
        })}
        <Letusan id={letusan.id} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {CHIP_TIGA.map(([a, b]) => {
          const sudah = dapat.some(([x, y]) => kunciPasangan(x, y) === kunciPasangan(a, b));
          return (
            <button
              key={`${a}-${b}-${goyang?.startsWith(`${a}-${b}-`) ? "x" : "o"}`}
              type="button"
              aria-label={`Pasangan ${a} dan ${b}`}
              disabled={sudah || beres}
              onClick={() => ketuk(a, b)}
              className={`flex items-center justify-center gap-1 rounded-2xl border-4 border-[#1C01A5] py-3 text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${
                sudah ? "bg-[#7FCB96]" : "bg-[#FFE566]"
              } ${goyang?.startsWith(`${a}-${b}-`) ? "igil-goyang" : ""}`}
            >
              <span>{a}</span>
              <span className="text-xs">dan</span>
              <span>{b}</span>
            </button>
          );
        })}
      </div>
      <KabarChip kabar={kabar} />
      {beres ? <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Kartu 5. Bilanganku (Ayo Berkarya, hlm. 38 dan 39) ------------- */

function KartuBilanganku({ indeks, total, speakGuru, lanjut }: PropsKartu) {
  const [n, setN] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const petunjuk =
    "Ayo berkarya! Pilih satu bilangan kesukaanmu. Lihat lambangnya, bingkai sepuluhnya, dan pasangannya. Lalu tulis bilangan itu di kanvas.";

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul="Bilanganku" onSuara={() => speakGuru(petunjuk)} warna="#FBCFE8" />
      <CatatanPensil pendek={n ? "Tulis bilanganku" : "Pilih satu bilangan"} teks={petunjuk} />
      <div className="grid grid-cols-5 gap-2">
        {ANGKA_LAB.map((x) => (
          <button
            key={x}
            type="button"
            aria-label={`Pilih bilangan ${x}`}
            onClick={() => {
              setN(x);
              setLulus(false);
            }}
            className={`rounded-2xl border-4 border-[#1C01A5] py-2 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] ${
              n === x ? "bg-[#F0AB00]" : "bg-[#FFE566]"
            }`}
          >
            {x}
          </button>
        ))}
      </div>
      {n ? (
        <div key={n} className="igil-muncul space-y-3 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-3">
          <button
            type="button"
            aria-label={`Dengarkan: ${kata(n)}`}
            onClick={() => speakGuru(`${kata(n)}. ${kata(n)} terdiri dari ${kata(1).toLowerCase()} dan ${kata(n - 1).toLowerCase()}.`)}
            className="igil-tanpa-tepi flex w-full items-center justify-center gap-4"
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-6xl font-black text-[#1C01A5]">
              {n}
            </span>
            <span className="flex flex-col items-start gap-1">
              <span className="text-2xl font-black text-[#1C01A5]">{kata(n)}</span>
              <LencanaSuara />
            </span>
          </button>
          <Bingkai kuning={n > 10 ? 10 : n} sisaPutih />
          <div className="grid grid-cols-2 gap-2">
            <Bagan gabungan={n} a={1} b={n - 1} kelas="w-full" />
            {n >= 3 ? <Bagan gabungan={n} a={2} b={n - 2} kelas="w-full" /> : <Bagan gabungan={n} a={1} b={n - 1} kelas="w-full" />}
          </div>
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`bilku-${n}`} digit={n} kata={kata(n)} onCompletedTrace={() => setLulus(true)} />
            <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
          </div>
        </div>
      ) : null}
      {n ? <TombolLanjut teks="LANJUTKAN KE POIN PENTING ⬇️" onClick={lanjut} /> : null}
    </>
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Gabungan adalah seluruhnya. Sebagian adalah bagian-bagiannya. Satu bilangan bisa dipisahkan menjadi dua bilangan. Dua bilangan bisa digabungkan menjadi satu bilangan. Satu bilangan punya banyak pasangan.";

const POIN_D = [
  {
    ikon: "🧺",
    nama: "Gabungan",
    suara: "Gabungan adalah seluruh banyaknya. Lima adalah Gabungan dari dua dan tiga.",
    g: 5 as Sel,
    a: 2 as Sel,
    b: 3 as Sel,
    nyala: ["g"] as ("g" | "a" | "b")[],
  },
  {
    ikon: "🧩",
    nama: "Sebagian",
    suara: "Sebagian adalah bagian dari Gabungan. Dua dan tiga adalah Sebagian dari lima.",
    g: 5 as Sel,
    a: 2 as Sel,
    b: 3 as Sel,
    nyala: ["a", "b"] as ("g" | "a" | "b")[],
  },
  {
    ikon: "✂️",
    nama: "Dipisahkan",
    suara: "Satu bilangan bisa dipisahkan menjadi dua bilangan. Tujuh dipisahkan menjadi tiga dan empat.",
    g: 7 as Sel,
    a: 3 as Sel,
    b: 4 as Sel,
    nyala: [] as ("g" | "a" | "b")[],
  },
  {
    ikon: "🤝",
    nama: "Digabungkan",
    suara: "Dua bilangan bisa digabungkan menjadi satu bilangan. Empat dan satu digabungkan menjadi lima.",
    g: 5 as Sel,
    a: 4 as Sel,
    b: 1 as Sel,
    nyala: [] as ("g" | "a" | "b")[],
  },
];

function PoinPentingD({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_D.map((p) => (
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
            <Bagan gabungan={p.g} a={p.a} b={p.b} nyala={p.nyala} kelas="w-full max-w-[170px]" />
          </button>
        ))}
        <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <button
            type="button"
            aria-label="Dengarkan: Banyak pasangan"
            onClick={() => speakGuru("Satu bilangan punya banyak pasangan. Delapan punya satu dan tujuh, dua dan enam, tiga dan lima, juga empat dan empat.")}
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🌻</span>
              Banyak pasangan
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              [1, 7],
              [2, 6],
              [3, 5],
              [4, 4],
            ].map(([a, b]) => (
              <ChipPasangan key={`${a}-${b}`} a={a} b={b} warna="#FFE566" />
            ))}
          </div>
        </div>
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB D ➡️" onClick={onSelesai} />
    </>
  );
}

export function AbstractPasanganD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_LAMBANG_D.length;
  const kartu = KARTU_LAMBANG_D[Math.min(indeks, KARTU_LAMBANG_D.length - 1)];
  const langkahTotal = KARTU_LAMBANG_D.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = { indeks, total: KARTU_LAMBANG_D.length, speakGuru, panel, lanjut };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan kata" warna="#1C01A5" />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      {poin ? (
        <PoinPentingD
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.id} className="space-y-3">
          {kartu.bentuk === "rahasia" ? <KartuRahasia kartu={kartu} {...dasar} /> : null}
          {kartu.bentuk === "tiga" ? <KartuTiga {...dasar} /> : null}
          {kartu.bentuk === "bilanganku" ? <KartuBilanganku {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
