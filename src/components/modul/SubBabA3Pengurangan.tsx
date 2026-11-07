"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { Tally, TeksCerita, WARNA_ADA } from "./diagram-pictorial";
import {
  GameRonde,
  IgilBicara,
  KERTAS_ANGKA,
  KERTAS_GAMBAR,
  Kelompok,
  Kotak,
  Persamaan,
  PilihAngka,
  TOMBOL_KECIL,
  TOTAL_GAME,
  Tanda,
  kataK,
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
/* Bab 3 Sub-Bab A: Cerita Pengurangan (Buku Siswa Kelas 1 hlm. 76-87).       */
/* Semua di klien, tanpa API. Naskah: naskah/mtk-1-bab3-sub-a-cerita-         */
/* pengurangan.md.                                                            */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Teman Pulang (ketuk), 2 Kue Ibu (seret), 3 Lengkapi Cerita    */
/*            (isi kalimat), 4 Tebak Sisa Kelereng (tebak, ambil, hitung).    */
/*  Picture:  (diagram saja, tanpa gambar benda; lihat diagram-pictorial.tsx) */
/*            5 Bingkai Sepuluh Dicoret, 6 Goresan Tally Dicoret,             */
/*            7 Jodohkan Diagram dan Kalimat.                                 */
/*  Abstract: 8 Susun Kalimat, 9 Detektif Angka Hilang, 10 Kanvas Guratan     */
/*            dan Suara.                                                      */
/* ------------------------------------------------------------------------ */

export const ucapKurang = (a: number, b: number, c: number) => `${kataK(a)} dikurangi ${kataK(b)} sama dengan ${kataK(c)}`;

/** Tiga pilihan angka di sekitar kunci. Sisa boleh nol, jadi pilihan bisa mulai dari 0. */
export function opsiKurang(n: number): number[] {
  const mulai = n <= 0 ? 0 : n >= 10 ? 8 : n - 1;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/** Kelompok benda: yang tersisa tampak penuh, yang berkurang tampak pudar. */
function KelompokKurang({ ikon, mula, kurang, kelas = "text-3xl" }: { ikon: string; mula: number; kurang: number; kelas?: string }) {
  return (
    <span role="img" aria-label={`Gambar benda, ${kurang} dari ${mula} berkurang`} className={`flex flex-wrap items-center justify-center gap-1 leading-none ${kelas}`}>
      {Array.from({ length: mula }, (_, i) => (
        <span key={i} className={i >= mula - kurang ? "opacity-30 grayscale" : ""}>
          {ikon}
        </span>
      ))}
    </span>
  );
}

const PersK = (p: { a: number | "?" | null; b: number | "?" | null; c: number | "?" | null; kecil?: boolean; nyala?: number[] }) => (
  <Persamaan a={p.a} b={p.b} c={p.c} t1="−" kecil={p.kecil} nyala={p.nyala} />
);

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman pengurangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_A3 = [
  {
    ikon: "👋",
    nama: "Berkurang",
    ket: "Benda jadi lebih sedikit",
    suara: "Mengurangi artinya jumlah benda berkurang. Ada yang pergi, turun, dimakan, terbang, atau pecah. Bendanya jadi lebih sedikit.",
  },
  {
    ikon: "🔢",
    nama: "Sisa",
    ket: "Benda yang masih tinggal",
    suara: "Sisa adalah benda yang masih tinggal setelah ada yang berkurang. Kita menulis sisa setelah tanda sama dengan.",
  },
];

const KATA_BACA = [
  { teks: "enam", warna: "#FFFFFF" },
  { teks: "dikurangi", warna: "#F0AB00" },
  { teks: "dua", warna: "#FFFFFF" },
  { teks: "sama dengan", warna: "#F0AB00" },
  { teks: "empat", warna: "#FFE566" },
];

const KATA_KUNCI = [
  { teks: "pulang", ikon: "🚶" },
  { teks: "turun", ikon: "⬇️" },
  { teks: "dimakan", ikon: "😋" },
  { teks: "terbang", ikon: "🕊️" },
  { teks: "pecah", ikon: "💥" },
  { teks: "diambil", ikon: "🤲" },
  { teks: "hilang", ikon: "❓" },
];

export function InfografisPenguranganA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Pengurangan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="BERKURANG"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Enam anak bermain tutup mata. Dua anak pulang. Sisanya empat anak. Enam dikurangi dua sama dengan empat."
      >
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <p className="text-xs font-black text-[#1C01A5]/70">Masih bermain</p>
              <Kelompok ikon="🧒" n={4} kelas="text-2xl" />
            </div>
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-[#F3F4F6] px-2 py-2">
              <p className="text-xs font-black text-[#1C01A5]/70">Pulang</p>
              <span className="opacity-40 grayscale">
                <Kelompok ikon="🧒" n={2} kelas="text-2xl" />
              </span>
            </div>
          </div>
          <p className="text-2xl" aria-hidden="true">
            ⬇️
          </p>
          <PersK a={6} b={2} c={4} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="TIGA BAGIAN CERITA"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Setiap cerita pengurangan punya tiga bagian. Mula-mula, berkurang, dan sisa. Anak: enam, dua, empat. Kue: enam, satu, lima. Orang di mobil: tiga, tiga, nol."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="px-1 py-1.5 text-left text-xs">Cerita</th>
                <th className="px-1 py-1.5 text-xs">Mula-mula</th>
                <th className="px-1 py-1.5 text-xs">Berkurang</th>
                <th className="px-1 py-1.5 text-xs">Sisa</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["🧒", "Anak", 6, 2, 4],
                ["🧁", "Kue", 6, 1, 5],
                ["🚗", "Orang di mobil", 3, 3, 0],
              ].map(([ikon, nama, a, b, c]) => (
                <tr key={nama as string} className="border-t-2 border-[#1C01A5]/20">
                  <td className="px-1 py-1.5 text-left text-xs">
                    <span className="mr-1 text-lg">{ikon}</span>
                    {nama}
                  </td>
                  <td className="px-1 py-1.5 text-xl">{a}</td>
                  <td className="px-1 py-1.5 text-xl text-[#E11D48]">{b}</td>
                  <td className="bg-[#FFF7CC] px-1 py-1.5 text-xl text-[#166534]">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="TANDA KURANG DAN SAMA DENGAN"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Ini tanda kurang. Tanda kurang dipakai untuk pengurangan dan dibaca dikurangi. Ini tanda sama dengan. Tanda sama dengan menunjukkan sisanya."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            <Tanda t="−" />
            <p className="text-base font-black text-[#1C01A5]">kurang</p>
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">benda berkurang, dibaca dikurangi</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            <Tanda t="=" />
            <p className="text-base font-black text-[#1C01A5]">sama dengan</p>
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">sisanya, atau hasilnya</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="CARA MEMBACA"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Cara membaca kalimat matematika. Enam, dikurangi, dua, sama dengan, empat. Enam dikurangi dua sama dengan empat. Boleh juga dibaca: enam dikurangi dua hasilnya empat."
      >
        <div className="space-y-2">
          <PersK a={6} b={2} c={4} kecil />
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
          <button
            type="button"
            aria-label="Dengarkan cara membaca kedua"
            onClick={() => speakGuru("Cara kedua: enam dikurangi dua hasilnya empat.")}
            className="igil-tanpa-tepi mx-auto flex items-center gap-2 rounded-2xl border-4 border-dashed border-[#0891B2] bg-white px-3 py-1 text-sm font-black text-[#1C01A5]"
          >
            Atau: enam dikurangi dua hasilnya empat
            <LencanaSuara kelas="h-7 w-7" />
          </button>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="KATA KUNCI"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Kata kunci pengurangan: pulang, turun, dimakan, terbang, pecah, diambil, dan hilang. Kalau kamu menemukan kata ini, benda berkurang dan kita pakai tanda kurang."
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {KATA_KUNCI.map((k) => (
            <span
              key={k.teks}
              className="inline-flex items-center gap-1 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-base font-black text-[#1C01A5]"
            >
              <span className="text-xl" aria-hidden="true">
                {k.ikon}
              </span>
              {k.teks}
            </span>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="SISA NOL DAN TIDAK ADA YANG BERKURANG"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Kalau semua benda berkurang, sisanya nol. Tiga dikurangi tiga hasilnya nol. Nol artinya tidak ada yang tersisa. Kalau tidak ada yang berkurang, sisanya tetap. Lima dikurangi nol hasilnya lima."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Semua pergi</p>
            <PersK a={3} b={3} c={0} kecil />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">sisa nol, tidak ada yang tinggal</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Tidak ada yang pergi</p>
            <PersK a={5} b={0} c={5} kecil />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">sisa tetap sama</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="TAMBAH DAN KURANG BERLAWANAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Tambah dan kurang berlawanan. Tambah dipakai kalau benda datang lagi, jadi bendanya lebih banyak. Kurang dipakai kalau benda pergi, jadi bendanya lebih sedikit."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#2563EB] bg-white px-1 py-2">
            <p className="text-sm font-black text-[#1C01A5]">➕ Tambah</p>
            <Persamaan a={4} b={2} c={6} kecil />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">datang lagi, jadi lebih banyak</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#E11D48] bg-white px-1 py-2">
            <p className="text-sm font-black text-[#1C01A5]">➖ Kurang</p>
            <PersK a={6} b={2} c={4} kecil />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">pergi, jadi lebih sedikit</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="TIGA CARA MELIHAT SISA"
        warna="#9333EA"
        speakGuru={speakGuru}
        suara="Tiga cara melihat sisa. Pertama, benda nyata: singkirkan benda yang pergi, lalu hitung yang tinggal. Kedua, gambar: coret titik atau goresan, lalu hitung yang tidak dicoret. Ketiga, angka: tulis enam dikurangi dua sama dengan empat."
      >
        <div className="space-y-1.5">
          {[
            { ikon: "🧸", nama: "Benda nyata", ket: "Singkirkan yang pergi, hitung yang tinggal." },
            { ikon: "🖍️", nama: "Gambar", ket: "Coret titik atau goresan, hitung yang tidak dicoret." },
            { ikon: "✏️", nama: "Angka", ket: "Tulis kalimat: 6 − 2 = 4." },
          ].map((c, i) => (
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
          {INGAT_A3.map((g) => (
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

/* --------- Permainan 1. Teman Pulang, Sisa Berapa? (hlm. 77-78) ----------- */

const RONDE_TUTUP = [
  { mula: 6, kurang: 2, cerita: "Malosi dan Tika harus pulang." },
  { mula: 7, kurang: 3, cerita: "Halim, Wei, dan Upe harus pulang." },
];

function RondeTutup({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TUTUP[ronde];
  const c = d.mula - d.kurang;
  const [pulang, setPulang] = useState<boolean[]>(() => Array.from({ length: d.mula }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = pulang.filter(Boolean).length;
  const beres = jumlah === d.kurang;
  const akhir = ronde === RONDE_TUTUP.length - 1;
  const suara = panel.suara["a3-tutup"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${ucapKurang(d.mula, d.kurang, c)}. Sekarang tinggal ${kataK(c)} anak.`);

  const ketuk = (i: number) => {
    if (beres) return;
    if (pulang[i]) {
      const baru = pulang.slice();
      baru[i] = false;
      setPulang(baru);
      setKabar(null);
      return;
    }
    if (jumlah >= d.kurang) {
      setKabar({ teks: `Cukup! Yang pulang hanya ${d.kurang} anak.`, ok: false });
      return;
    }
    const baru = pulang.slice();
    baru[i] = true;
    setPulang(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.kurang) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: anak yang tinggal" : "Ketuk anak yang pulang!"}
        teks={`${d.mula} anak bermain tutup mata. ${d.cerita} Ketuk anak yang pulang. Lalu hitung anak yang masih tinggal, dan ucapkan banyaknya.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-2">
          <p className="text-center text-xs font-black text-[#14532D]">Bermain tutup mata</p>
          <span className="flex min-h-[52px] flex-wrap items-center justify-center gap-1">
            {pulang.map((p, i) =>
              p ? null : (
                <button
                  key={i}
                  type="button"
                  aria-label={`Anak ke-${i + 1}`}
                  disabled={beres}
                  onClick={() => ketuk(i)}
                  className="igil-tanpa-tepi text-4xl leading-none"
                >
                  🧒
                </button>
              )
            )}
          </span>
        </div>
        <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] p-2">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Sudah pulang</p>
          <span className="flex min-h-[44px] flex-wrap items-center justify-center gap-2">
            {pulang.map((p, i) =>
              p ? (
                <button
                  key={i}
                  type="button"
                  aria-label="Panggil anak kembali"
                  disabled={beres}
                  onClick={() => ketuk(i)}
                  className="igil-tanpa-tepi igil-muncul text-3xl leading-none"
                >
                  🚶
                </button>
              ) : null
            )}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Mula-mula {d.mula}</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">
            Pulang {jumlah}
          </span>
        </div>
        {beres ? <PersK a={d.mula} b={d.kurang} c={bukaC ? c : "?"} /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahTutup({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Teman Pulang, Sisa Berapa?"
      warna="#FFE566"
      petunjuk="Anak-anak bermain tutup mata. Ketuk anak yang harus pulang. Setelah semua yang harus pulang sudah pulang, hitung anak yang masih tinggal dan ucapkan banyaknya."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-tutup"
      jumlahRonde={RONDE_TUTUP.length}
      kunciAkhir={4}
      belumSiap="Ketuk anak yang pulang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTutup ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Kue Ibu untuk Upe (hlm. 79) ----------------------- */

const RONDE_KUE = [
  { mula: 6, kurang: 1, pemakan: "Upe" },
  { mula: 8, kurang: 3, pemakan: "Wei" },
];

function RondeKue({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KUE[ronde];
  const c = d.mula - d.kurang;
  const [dimakan, setDimakan] = useState<boolean[]>(() => Array.from({ length: d.mula }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = dimakan.filter(Boolean).length;
  const beres = jumlah === d.kurang;
  const akhir = ronde === RONDE_KUE.length - 1;
  const suara = panel.suara["a3-kue"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${ucapKurang(d.mula, d.kurang, c)}. Sisa kue ada ${kataK(c)}.`);

  const makan = (i: number) => {
    if (beres || dimakan[i]) return;
    if (jumlah >= d.kurang) {
      setKabar({ teks: `${d.pemakan} sudah kenyang. Hanya makan ${d.kurang} kue.`, ok: false });
      return;
    }
    const baru = dimakan.slice();
    baru[i] = true;
    setDimakan(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.kurang) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: sisa kue" : `Beri kue untuk ${d.pemakan}!`}
        teks={`Ibu mempunyai ${kataK(d.mula)} kue. ${d.pemakan} memakan ${kataK(d.kurang)} kue. Seret kue dari piring ke ${d.pemakan}, atau ketuk kuenya. Lalu hitung kue yang masih ada di piring, dan ucapkan banyaknya.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Ibu punya {d.mula} kue. {d.pemakan} makan {d.kurang} kue.
        </p>
        <div className="flex min-h-[132px] flex-wrap items-center justify-center gap-2 rounded-[2rem] border-4 border-[#1C01A5] bg-white px-3 py-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          {dimakan.map((m, i) =>
            m ? null : (
              <BendaSeret
                key={i}
                id={String(i)}
                aktif={!beres}
                label={`Kue ke-${i + 1}`}
                onKetuk={() => makan(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "a3-mulut") makan(i);
                }}
              >
                <span className="block text-5xl leading-none">🧁</span>
              </BendaSeret>
            )
          )}
          {beres ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div
          data-zona="a3-mulut"
          className="flex flex-col items-center justify-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-2"
        >
          <span className="text-4xl leading-none" aria-hidden="true">
            {jumlah > 0 ? "😋" : "😮"}
          </span>
          <span className="text-sm font-black text-[#1C01A5]">Mulut {d.pemakan}</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Dimakan {jumlah}</span>
        </div>
        {beres ? <PersK a={d.mula} b={d.kurang} c={bukaC ? c : "?"} /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKue({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kue Ibu untuk Upe"
      warna="#FFE566"
      petunjuk="Ibu punya beberapa kue di piring. Seret kue ke mulut yang makan, atau ketuk kuenya, sebanyak yang dimakan. Setelah itu hitung kue yang masih ada di piring dan ucapkan banyaknya."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-kue"
      jumlahRonde={RONDE_KUE.length}
      kunciAkhir={5}
      belumSiap="Beri kue sebanyak yang dimakan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKue ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Lengkapi Cerita Pengurangan (hlm. 79, 81) --------- */

const RONDE_CERITA = [
  {
    ikon: "🔴",
    benda: "kelereng",
    mula: 7,
    kurang: 2,
    baris: [
      ["Mula-mula ada", "kelereng."],
      ["Halim mengambil", "kelereng."],
      ["Sekarang tersisa", "kelereng."],
    ],
  },
  {
    ikon: "🧑",
    benda: "orang",
    mula: 3,
    kurang: 3,
    baris: [
      ["Mula-mula ada", "orang di mobil."],
      ["Turun dari mobil", "orang."],
      ["Sekarang di mobil ada", "orang."],
    ],
  },
  {
    ikon: "🦋",
    benda: "kupu-kupu",
    mula: 6,
    kurang: 2,
    baris: [
      ["Mula-mula ada", "kupu-kupu di bunga."],
      ["Terbang", "kupu-kupu."],
      ["Sekarang tersisa", "kupu-kupu."],
    ],
  },
];

function RondeCerita({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const d = RONDE_CERITA[ronde];
  const c = d.mula - d.kurang;
  const kunci = [d.mula, d.kurang, c];
  const [langkah, setLangkah] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  useBicara(beres, c === 0 ? `${ucapKurang(d.mula, d.kurang, c)}. Tidak ada ${d.benda} yang tersisa.` : `${ucapKurang(d.mula, d.kurang, c)}. Tersisa ${kataK(c)} ${d.benda}.`);

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
    const nilai = langkah > i ? kunci[i] : langkah === i ? "?" : null;
    return <Kotak v={nilai} kecil nyala={langkah === i} />;
  };

  return (
    <>
      <IgilBicara
        pendek={beres ? "Ucapkan: sisanya" : "Hitung, lalu isi kotak!"}
        teks="Hitung bendanya satu per satu. Benda yang pudar adalah benda yang berkurang. Isi kotak kosong pada cerita. Lalu ucapkan berapa sisanya."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <KelompokKurang ikon={d.ikon} mula={d.mula} kurang={d.kurang} />
        </div>
        <div className="space-y-2 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] p-2 text-lg font-black leading-snug text-[#1C01A5]">
          {d.baris.map((b, i) => (
            <p key={i} className="flex flex-wrap items-center gap-2">
              {b[0]} {blank(i)} {b[1]}
            </p>
          ))}
        </div>
        {!beres ? <PilihAngka opsi={opsiKurang(kunci[langkah])} keliru={keliru} onPilih={pilih} /> : <PersK a={d.mula} b={d.kurang} c={c} />}
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
      judul="Lengkapi Cerita Pengurangan"
      warna="#FFE566"
      petunjuk="Hitung bendanya satu per satu. Benda yang pudar adalah benda yang berkurang. Isi kotak kosong pada cerita. Terakhir, ucapkan berapa sisanya pada cerita yang terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-cerita"
      jumlahRonde={RONDE_CERITA.length}
      kunciAkhir={4}
      belumSiap="Isi semua kotak cerita dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCerita ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Tebak Sisa Kelereng (hlm. 80) --------------------- */

const RONDE_TEBAK = [
  { mula: 7, kurang: 2 },
  { mula: 9, kurang: 4 },
];
const WARNA_KELERENG = ["#E98989", "#7FCB96", "#FFE566", "#93C5FD", "#F0AB00"];

function RondeTebak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { mula, kurang } = RONDE_TEBAK[ronde];
  const c = mula - kurang;
  const [tebak, setTebak] = useState<number | null>(null);
  const [ambil, setAmbil] = useState<boolean[]>(() => Array.from({ length: mula }, () => false));
  const [urut, setUrut] = useState<Record<number, number>>({});
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const terambil = ambil.filter(Boolean).length;
  const selesaiAmbil = terambil === kurang;
  const terhitung = Object.keys(urut).length;
  const beres = terhitung === c;
  const akhir = ronde === RONDE_TEBAK.length - 1;
  const suara = panel.suara["a3-tebak"] === true && akhir;
  const bukaC = !akhir || suara;
  const tepat = tebak === c;
  useBicara(akhir ? suara : beres, `${ucapKurang(mula, kurang, c)}. Tersisa ${kataK(c)} kelereng.`);

  const ketuk = (i: number) => {
    if (tebak === null || beres) return;
    if (!selesaiAmbil) {
      if (ambil[i]) return;
      const baru = ambil.slice();
      baru[i] = true;
      setAmbil(baru);
      setKabar(null);
      return;
    }
    if (ambil[i] || urut[i] !== undefined) return;
    const baruUrut = { ...urut, [i]: terhitung + 1 };
    setUrut(baruUrut);
    if (Object.keys(baruUrut).length === c) {
      letusan.picu();
      onBeres();
    }
  };

  const pesan =
    tebak === null
      ? "Tebak dulu: berapa sisanya?"
      : !selesaiAmbil
        ? `Ambil ${kurang} kelereng ke kantong`
        : beres
          ? suara
            ? "Hebat!"
            : "Ucapkan: sisa kelereng"
          : "Hitung kelereng yang tinggal";

  return (
    <>
      <IgilBicara
        pendek={pesan}
        teks={`Ada ${kataK(mula)} kelereng di nampan. Halim akan mengambil ${kataK(kurang)} kelereng. Tebak dulu berapa sisanya. Lalu ketuk ${kataK(kurang)} kelereng untuk masuk ke kantong Halim, dan ketuk kelereng yang tinggal untuk menghitungnya.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Ada {mula} kelereng. Halim mengambil {kurang}. Tebakanmu berapa sisanya?
        </p>
        <PilihAngka
          opsi={opsiKurang(c)}
          keliru={null}
          onPilih={(n) => {
            setTebak(n);
          }}
          mati={tebak !== null}
        />
        {tebak !== null ? (
          <p className="igil-muncul text-center text-lg font-black text-[#1C01A5]">
            Tebakanmu: <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3">{tebak}</span>
          </p>
        ) : null}
        <div className="flex min-h-[96px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {Array.from({ length: mula }, (_, i) => {
            if (ambil[i]) return null;
            const no = urut[i];
            return (
              <button
                key={i}
                type="button"
                aria-label={selesaiAmbil ? `Hitung kelereng ${i + 1}` : `Ambil kelereng ${i + 1}`}
                disabled={tebak === null || beres}
                onClick={() => ketuk(i)}
                className="igil-tanpa-tepi flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1C01A5] text-lg font-black text-[#1C01A5] disabled:opacity-60"
                style={{ backgroundColor: no ? "#FFFFFF" : WARNA_KELERENG[i % WARNA_KELERENG.length] }}
              >
                {no ?? ""}
              </button>
            );
          })}
        </div>
        <div className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] px-2 py-2">
          <span className="text-sm font-black text-[#1C01A5]/70">👝 Kantong Halim: {terambil}</span>
          <span className="flex flex-wrap items-center justify-center gap-1">
            {ambil.map((a, i) =>
              a ? (
                <span
                  key={i}
                  className="igil-muncul inline-block h-6 w-6 rounded-full border-[3px] border-[#1C01A5]"
                  style={{ backgroundColor: WARNA_KELERENG[i % WARNA_KELERENG.length] }}
                />
              ) : null
            )}
          </span>
        </div>
        {selesaiAmbil ? (
          <p className="text-center text-sm font-black text-[#1C01A5]">Terhitung: {terhitung}</p>
        ) : null}
        {beres ? (
          <>
            <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-3 py-2 text-center text-lg font-black text-[#14532D]">
              {tepat ? "Tebakanmu tepat!" : `Hampir! Ternyata tersisa ${c} kelereng.`}
            </p>
            <PersK a={mula} b={kurang} c={bukaC ? c : "?"} />
          </>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahTebak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Tebak Sisa Kelereng"
      warna="#FFE566"
      petunjuk="Tebak dulu berapa sisa kelereng. Lalu ambil kelereng ke kantong Halim sebanyak yang diambil. Hitung kelereng yang tinggal dengan mengetuknya satu per satu. Terakhir, ucapkan berapa sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-tebak"
      jumlahRonde={RONDE_TEBAK.length}
      kunciAkhir={5}
      belumSiap="Ambil kelereng dan hitung yang tinggal dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTebak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "tutup" | "kue" | "cerita" | "tebak";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "tutup" },
  { nomor: 2, tipe: "kue" },
  { nomor: 3, tipe: "cerita" },
  { nomor: 4, tipe: "tebak" },
];

export function ConcretePenguranganA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan singkirkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span
            key={l.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "tutup" ? <LangkahTutup {...dasar} /> : null}
        {langkah.tipe === "kue" ? <LangkahKue {...dasar} /> : null}
        {langkah.tipe === "cerita" ? <LangkahCerita {...dasar} /> : null}
        {langkah.tipe === "tebak" ? <LangkahTebak {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram saja. Tidak ada gambar benda.                    */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Bingkai Sepuluh Dicoret (hlm. 82-83) -------------- */

const RONDE_BINGKAI = [
  { a: 6, b: 2, nama: "anak", kerja: "Pulang" },
  { a: 8, b: 3, nama: "apel", kerja: "Dimakan" },
];

function RondeBingkai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BINGKAI[ronde];
  const c = d.a - d.b;
  const [coret, setCoret] = useState<boolean[]>(() => Array.from({ length: 10 }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = coret.filter(Boolean).length;
  const beres = jumlah === d.b;
  const akhir = ronde === RONDE_BINGKAI.length - 1;
  const suara = panel.suara["a3-bingkai"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${ucapKurang(d.a, d.b, c)}. Titik yang tidak dicoret ada ${kataK(c)}.`);

  const ketuk = (i: number) => {
    if (i >= d.a || beres) return;
    if (coret[i]) {
      const baru = coret.slice();
      baru[i] = false;
      setCoret(baru);
      setKabar(null);
      return;
    }
    if (jumlah >= d.b) {
      setKabar({ teks: `Cukup! Yang berkurang hanya ${d.b}.`, ok: false });
      return;
    }
    const baru = coret.slice();
    baru[i] = true;
    setCoret(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.b) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: titik yang tidak dicoret" : "Coret titik yang berkurang"}
        teks={`Ada ${kataK(d.a)} ${d.nama}. Titik merah di bingkai mewakili ${d.nama} yang mula-mula ada. ${d.kerja} ${kataK(d.b)} ${d.nama}. Ketuk titik merah untuk mencoretnya. Lalu hitung titik yang tidak dicoret.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Ada ${d.a} ${d.nama}.`, `${d.kerja} ${d.b} ${d.nama}.`, "Berapa sisanya?"]} />
        <div className="mx-auto grid max-w-[300px] grid-cols-5 gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
          {Array.from({ length: 10 }, (_, i) => {
            const ada = i < d.a;
            const dicoret = coret[i];
            return (
              <button
                key={i}
                type="button"
                aria-label={ada ? `Titik ${i + 1}${dicoret ? ", dicoret" : ""}` : `Kotak kosong ${i + 1}`}
                disabled={!ada}
                onClick={() => ketuk(i)}
                className={`flex aspect-square w-full items-center justify-center rounded-full border-4 border-[#1C01A5] p-0 text-2xl font-black leading-none shadow-[0_3px_0_rgba(28,1,165,0.22)] ${
                  !ada ? "bg-white" : dicoret ? "igil-muncul bg-white text-[#E11D48]" : "bg-[#E11D48]"
                }`}
              >
                {ada && dicoret ? "✕" : ""}
              </button>
            );
          })}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Titik {d.a} • Dicoret {jumlah}
        </p>
        {beres ? <PersK a={d.a} b={d.b} c={bukaC ? c : "?"} /> : null}
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
      judul="Bingkai Sepuluh Dicoret"
      warna="#FDE68A"
      petunjuk="Titik merah adalah benda yang mula-mula ada. Ketuk titik merah untuk mencoret sebanyak yang berkurang. Lalu hitung titik yang tidak dicoret dan ucapkan banyaknya."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-bingkai"
      jumlahRonde={RONDE_BINGKAI.length}
      kunciAkhir={5}
      belumSiap="Coret titik sebanyak yang berkurang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBingkai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Goresan Tally Dicoret (hlm. 83-84) ---------------- */

const TINTA = "#1C01A5";

/** Goresan tally. Goresan yang dicoret memakai warna abu dan tanda silang merah. Yang dicoret adalah goresan terakhir. */
function TallyCoret({ n, coret, kelas = "w-full max-w-[220px]" }: { n: number; coret: number; kelas?: string }) {
  const grup = Math.max(1, Math.ceil(n / 5));
  return (
    <svg
      viewBox={`0 0 ${grup * 46} 40`}
      className={`mx-auto block h-auto ${kelas}`}
      role="img"
      aria-label={`${n} goresan tally, ${coret} dicoret`}
    >
      <line x1={2} y1={37} x2={grup * 46 - 2} y2={37} stroke="#D1D5DB" strokeWidth={2} strokeDasharray="4 4" />
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = g * 46 + 4;
        const dicoret = i >= n - coret;
        const warna = dicoret ? "#9CA3AF" : TINTA;
        const [x1, y1, x2, y2] = k < 4 ? [gx + 6 + k * 8, 5, gx + 6 + k * 8, 33] : [gx + 1, 29, gx + 38, 9];
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={warna} strokeWidth={4} strokeLinecap="round" />
            {dicoret ? (
              <path
                d={`M ${mx - 4} ${my - 4} L ${mx + 4} ${my + 4} M ${mx - 4} ${my + 4} L ${mx + 4} ${my - 4}`}
                stroke="#E11D48"
                strokeWidth={3}
                strokeLinecap="round"
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

const RONDE_TALLY = [
  { a: 5, b: 2, nama: "pensil", kerja: "Dipinjam" },
  { a: 7, b: 4, nama: "anak", kerja: "Pulang" },
  { a: 9, b: 3, nama: "buku", kerja: "Dibawa pergi" },
];

function RondeTally({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TALLY[ronde];
  const c = d.a - d.b;
  const [coret, setCoret] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = coret === d.b;
  const akhir = ronde === RONDE_TALLY.length - 1;
  const suara = panel.suara["a3-tally"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${ucapKurang(d.a, d.b, c)}. Goresan yang tinggal ada ${kataK(c)}.`);

  const ubah = (arah: 1 | -1) => {
    if (beres) return;
    if (arah === 1 && coret >= d.b) {
      setKabar({ teks: `Cukup! Yang berkurang hanya ${d.b}.`, ok: false });
      return;
    }
    if (arah === -1 && coret <= 0) return;
    setKabar(null);
    const baru = coret + arah;
    setCoret(baru);
    if (baru === d.b) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: goresan yang tinggal" : "Coret goresan yang berkurang"}
        teks={`Baca ceritanya. Goresan tally mewakili ${d.nama} yang mula-mula ada. Tekan tombol coret untuk mencoret satu goresan, sebanyak yang berkurang. Lalu hitung goresan yang tinggal.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Ada ${d.a} ${d.nama}.`, `${d.kerja} ${d.b} ${d.nama}.`, "Berapa sisanya?"]} />
        <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
          <p className="text-sm font-black" style={{ color: WARNA_ADA }}>
            Yang mula-mula ada: {d.a}
          </p>
          <TallyCoret n={d.a} coret={coret} />
          <div className="flex items-center justify-center gap-2 pt-1">
            <button type="button" aria-label="Batalkan satu coretan" disabled={beres || coret === 0} onClick={() => ubah(-1)} className="rounded-full border-4 border-[#1C01A5] bg-white px-4 py-2 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] disabled:opacity-40">
              ↩ Batal
            </button>
            <button
              type="button"
              aria-label="Coret satu goresan"
              disabled={beres}
              onClick={() => ubah(1)}
              className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 py-2 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] disabled:opacity-50"
            >
              ✕ Coret satu
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Dicoret {coret}</p>
        </div>
        {beres ? (
          <div className="igil-muncul space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Goresan yang tidak dicoret</p>
            <div className="flex justify-center">
              <Tally n={c} kelas="w-full max-w-[200px]" />
            </div>
            <PersK a={d.a} b={d.b} c={bukaC ? c : "?"} kecil />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTally({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Goresan Tally Dicoret"
      warna="#FDE68A"
      petunjuk="Baca ceritanya. Coret goresan tally sebanyak yang berkurang. Lalu hitung goresan yang tidak dicoret dan ucapkan banyaknya pada cerita terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-tally"
      jumlahRonde={RONDE_TALLY.length}
      kunciAkhir={6}
      belumSiap="Coret goresan sebanyak yang berkurang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTally ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Jodohkan Diagram dan Kalimat (hlm. 83-84) --------- */

const DIAGRAM_JODOH = [
  { bentuk: "bingkai", label: "Bingkai sepuluh", a: 8, b: 3 },
  { bentuk: "tally", label: "Goresan tally", a: 6, b: 2 },
  { bentuk: "batang", label: "Model batang", a: 7, b: 5 },
] as const;
const URUT_PITA = [2, 0, 1];
const WARNA_JODOH = ["#F0AB00", "#7FCB96", "#E98989"];

/** Bingkai sepuluh mini. Titik merah tersisa, titik putih bersilang adalah yang berkurang. */
function BingkaiCoretMini({ a, b, kelas = "mx-auto block w-full max-w-[150px]" }: { a: number; b: number; kelas?: string }) {
  return (
    <svg viewBox="0 0 130 56" className={kelas} role="img" aria-label={`Bingkai sepuluh: ${a} titik, ${b} dicoret`}>
      <rect x="2" y="2" width="126" height="52" rx="6" fill="#FFFFFF" stroke={TINTA} strokeWidth="3" />
      <path d="M2 28 H128 M27 2 V54 M52 2 V54 M77 2 V54 M102 2 V54" stroke={TINTA} strokeWidth="2" opacity="0.5" />
      {Array.from({ length: 10 }, (_, i) => {
        const cx = 14.5 + (i % 5) * 25;
        const cy = 15 + Math.floor(i / 5) * 26;
        if (i >= a) return null;
        const dicoret = i >= a - b;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="8.6" fill={dicoret ? "#FFFFFF" : WARNA_ADA} stroke={TINTA} strokeWidth="2.2" />
            {dicoret ? <path d={`M ${cx - 4.6} ${cy - 4.6} L ${cx + 4.6} ${cy + 4.6} M ${cx - 4.6} ${cy + 4.6} L ${cx + 4.6} ${cy - 4.6}`} stroke="#E11D48" strokeWidth="2.6" strokeLinecap="round" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Model batang sepuluh petak. Merah tersisa, abu bersilang adalah yang berkurang. */
function BatangKurang({ a, b, kelas = "" }: { a: number; b: number; kelas?: string }) {
  return (
    <div
      className={`grid grid-cols-10 overflow-hidden rounded-lg border-[3px] border-[#1C01A5] ${kelas}`}
      role="img"
      aria-label={`Batang: ${a} petak, ${b} petak dicoret`}
    >
      {Array.from({ length: 10 }, (_, i) => {
        const tersisa = i < a - b;
        const berkurang = !tersisa && i < a;
        return (
          <span
            key={i}
            className="flex h-7 items-center justify-center border-r-2 border-[#1C01A5]/40 text-sm font-black leading-none text-[#E11D48] last:border-r-0"
            style={{ backgroundColor: tersisa ? WARNA_ADA : berkurang ? "#E5E7EB" : "#FFFFFF" }}
          >
            {berkurang ? "✕" : ""}
          </span>
        );
      })}
    </div>
  );
}

function GambarJodoh({ i }: { i: number }) {
  const g = DIAGRAM_JODOH[i];
  if (g.bentuk === "bingkai") return <BingkaiCoretMini a={g.a} b={g.b} />;
  if (g.bentuk === "tally") return <TallyCoret n={g.a} coret={g.b} kelas="w-full max-w-[170px]" />;
  return <BatangKurang a={g.a} b={g.b} kelas="mx-auto w-full max-w-[220px]" />;
}

function RondeJodoh({ speakGuru, panel, onBeres }: { speakGuru: (t: string) => void; panel: PanelSuara; onBeres: () => void }) {
  const [pilih, setPilih] = useState<number | null>(null);
  const [cocok, setCocok] = useState<boolean[]>([false, false, false]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = cocok.every(Boolean);
  const suara = panel.suara["a3-jodoh"] === true;
  useBicara(suara, "Tiga diagram sudah berjodoh. Enam dikurangi dua sama dengan empat. Goresan tally yang tinggal ada empat.");

  const ketukGambar = (i: number) => {
    if (cocok[i] || beres) return;
    setPilih(i);
    setKabar(null);
  };
  const ketukPita = (k: number) => {
    if (cocok[k] || beres) return;
    if (pilih === null) {
      setKabar({ teks: "Pilih diagramnya dulu, ya.", ok: false });
      return;
    }
    if (pilih === k) {
      const baru = cocok.slice();
      baru[k] = true;
      setCocok(baru);
      setPilih(null);
      setKeliru(null);
      setKabar(null);
      const g = DIAGRAM_JODOH[k];
      speakGuru(`${ucapKurang(g.a, g.b, g.a - g.b)}.`);
      if (baru.every(Boolean)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(k);
      setKabar({ teks: "Belum cocok. Hitung titik yang tidak dicoret, ya.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: goresan yang tinggal" : "Jodohkan diagram dan kalimat"}
        teks="Ketuk satu diagram, lalu ketuk kalimat pengurangan yang cocok. Bagian yang bersilang adalah yang berkurang."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="space-y-2">
          {DIAGRAM_JODOH.map((g, i) => (
            <button
              key={g.bentuk}
              type="button"
              aria-label={`Diagram ${g.label}`}
              onClick={() => ketukGambar(i)}
              className={`igil-tanpa-tepi relative block w-full rounded-2xl border-4 bg-white px-2 py-2 ${
                pilih === i ? "ring-4 ring-[#F0AB00]" : ""
              } ${cocok[i] ? "border-[#7FCB96]" : "border-[#1C01A5]"}`}
            >
              <GambarJodoh i={i} />
              <span className="mt-1 block text-center text-xs font-black text-[#1C01A5]/70">{g.label}</span>
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
            const g = DIAGRAM_JODOH[k];
            return (
              <button
                key={k}
                type="button"
                aria-label={`Kalimat ${g.a} − ${g.b} = ${g.a - g.b}`}
                onClick={() => ketukPita(k)}
                className={`igil-tanpa-tepi relative block w-full rounded-full border-4 px-3 py-2 text-center text-2xl font-black text-[#1C01A5] ${
                  cocok[k] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFE566]"
                } ${keliru === k ? "igil-goyang" : ""}`}
              >
                {g.a} − {g.b} = {g.a - g.b}
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
      judul="Jodohkan Diagram dan Kalimat"
      warna="#FDE68A"
      petunjuk="Ketuk satu diagram, lalu ketuk kalimat pengurangan yang cocok. Setelah ketiganya berjodoh, ucapkan berapa goresan tally yang tinggal."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-jodoh"
      jumlahRonde={1}
      kunciAkhir={4}
      belumSiap="Jodohkan ketiga diagram dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondeJodoh speakGuru={speakGuru} panel={panel} onBeres={beres} />}
    />
  );
}

type TipePicture = "bingkai" | "tally" | "jodoh";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "bingkai" },
  { nomor: 6, tipe: "tally" },
  { nomor: 7, tipe: "jodoh" },
];

export function PicturePenguranganA(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan coret" warna="#B45309" />
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
        {kartu.tipe === "tally" ? <KartuTally {...dasar} /> : null}
        {kartu.tipe === "jodoh" ? <KartuJodoh {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tiga permainan angka dan simbol, lalu Poin Penting.     */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Susun Kalimat (hlm. 78) --------------------------- */

const RONDE_SUSUN: [number, number, number][] = [
  [3, 3, 0],
  [5, 1, 4],
  [6, 2, 4],
];
const KARTU_SIMBOL = ["+", "−", "=", "<"];

function RondeSusun({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const [a, b, c] = RONDE_SUSUN[ronde];
  const [n, setN] = useState(0);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = n >= 2;
  useBicara(beres, `${ucapKurang(a, b, c)}.`);

  const taruh = (s: string) => {
    if (beres) return;
    const harus = n === 0 ? "−" : "=";
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
        teks: n === 0 ? "Benda yang berkurang memakai tanda kurang." : "Sisanya memakai tanda sama dengan.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Kalimat sudah jadi!" : n === 0 ? "Pilih tanda untuk berkurang" : "Pilih tanda untuk sisanya"}
        teks="Lengkapi kalimat matematika. Pilih kartu simbol yang tepat untuk kotak yang menyala."
      />
      <div className={KERTAS_ANGKA}>
        <Persamaan a={a} b={b} c={c} t1={n >= 1 ? "−" : null} t2={n >= 2 ? "=" : null} nyala={beres ? [] : [n === 0 ? 1 : 3]} />
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
      id="a3-susun"
      jumlahRonde={RONDE_SUSUN.length}
      kunciAkhir={4}
      belumSiap="Lengkapi kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusun ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Angka Hilang ----------------------------- */

const RONDE_DETEKTIF: { a: number; b: number; hilang: "b" | "c"; cerita: string }[] = [
  { a: 5, b: 2, hilang: "c", cerita: "Ada 5 apel. Dimakan 2 apel. Berapa sisanya?" },
  { a: 7, b: 3, hilang: "b", cerita: "Ada 7 bintang. Sebagian terbang. Tersisa 4 bintang. Berapa bintang yang terbang?" },
  { a: 9, b: 4, hilang: "c", cerita: "Ada 9 buku. Dipinjam 4 buku. Berapa sisanya?" },
  { a: 8, b: 5, hilang: "c", cerita: "Ada 8 balon. Pecah 5 balon. Berapa sisanya?" },
];

function RondeDetektif({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const d = RONDE_DETEKTIF[ronde];
  const c = d.a - d.b;
  const kunci = d.hilang === "c" ? c : d.b;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  useBicara(benar, `${ucapKurang(d.a, d.b, c)}.`);

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

  return (
    <>
      <CatatanPensil pendek={benar ? "Kasus terpecahkan!" : "Temukan angka yang hilang"} teks={d.cerita} />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">
          <span aria-hidden="true">🔍 </span>
          {d.cerita}
        </p>
        <Persamaan
          a={d.a}
          b={d.hilang === "b" ? (benar ? d.b : "?") : d.b}
          c={d.hilang === "c" ? (benar ? c : "?") : c}
          t1="−"
          nyala={benar ? [] : [d.hilang === "b" ? 2 : 4]}
        />
        <PilihAngka opsi={opsiKurang(kunci)} keliru={keliru} onPilih={pilih} mati={benar} />
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
      petunjuk="Temukan angka yang hilang pada kalimat pengurangan. Baca petunjuknya, lalu pilih angka yang tepat. Terakhir, ucapkan hasil kasus yang terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="a3-detektif"
      jumlahRonde={RONDE_DETEKTIF.length}
      kunciAkhir={3}
      belumSiap="Pecahkan kasusnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara (hlm. 80, 87) ----------- */

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [a, setA] = useState(8);
  const [b, setB] = useState(3);
  const [lulus, setLulus] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const mula = tahap === 0 ? 5 : a;
  const kurang = tahap === 0 ? 1 : b;
  const c = mula - kurang;
  const id = tahap === 0 ? "a3-tulis-1" : `a3-tulis-2-${a}-${b}`;
  const suara = panel.suara[id] === true;
  useBicara(suara, `${ucapKurang(mula, kurang, c)}.`);

  const ubahA = (delta: number) => {
    if (suara) return;
    const na = a + delta;
    if (na < 2 || na > 10) {
      setKabar({ teks: na < 2 ? "Mula-mula paling sedikit dua, ya." : "Paling banyak sepuluh, ya.", ok: false });
      return;
    }
    setKabar(null);
    setA(na);
    if (b > na - 1) setB(na - 1);
  };
  const ubahB = (delta: number) => {
    if (suara) return;
    const nb = b + delta;
    if (nb < 1) {
      setKabar({ teks: "Yang berkurang paling sedikit satu, ya.", ok: false });
      return;
    }
    if (nb > a - 1) {
      setKabar({ teks: "Yang berkurang harus lebih sedikit dari mula-mula, supaya masih ada sisa.", ok: false });
      return;
    }
    setKabar(null);
    setB(nb);
  };

  const stepper = (judul: string, nilai: number, ubah: (d: number) => void, nama: string) => (
    <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2 text-center">
      <p className="text-xs font-black text-[#1C01A5]/70">{judul}</p>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label={`Kurangi ${nama}`}
          disabled={suara}
          onClick={() => ubah(-1)}
          className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
        >
          −
        </button>
        <span className="min-w-8 text-center text-3xl font-black text-[#1C01A5]">{nilai}</span>
        <button
          type="button"
          aria-label={`Tambah ${nama}`}
          disabled={suara}
          onClick={() => ubah(1)}
          className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() =>
          speakGuru("Ucapkan hasil pengurangan, lalu guratkan angkanya di kanvas. Setelah itu, buat kalimat pengurangan milikmu sendiri.")
        }
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
        {tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}
      </p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Ucapkan sisanya" : "Buat kalimatmu, lalu ucapkan"}
          teks={
            tahap === 0
              ? "Lima dikurangi satu sama dengan berapa? Ucapkan sisanya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih bilangan mula-mula dan bilangan yang berkurang sesukamu, supaya masih ada sisa. Ucapkan sisanya, lalu guratkan angkanya."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {stepper("Mula-mula", a, ubahA, "bilangan mula-mula")}
              {stepper("Berkurang", b, ubahB, "bilangan yang berkurang")}
            </div>
          ) : null}
          <PersK a={mula} b={kurang} c={suara ? c : "?"} />
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

/* --------- Poin Penting dan Catatanku ------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Mengurangi artinya jumlah benda berkurang. Setiap cerita pengurangan punya tiga bagian: mula-mula, berkurang, dan sisa. Tanda kurang dibaca dikurangi. Kalau semua benda berkurang, sisanya nol. Kita membaca: enam dikurangi dua sama dengan empat.";

const POIN_A3: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "👋",
    nama: "Mengurangi = berkurang",
    isi: <PersK a={6} b={2} c={4} kecil />,
    suara: "Mengurangi artinya jumlah benda berkurang. Enam anak, dua anak pulang, sisanya empat anak.",
  },
  {
    ikon: "📋",
    nama: "Tiga bagian cerita",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Mula-mula • Berkurang • Sisa</p>,
    suara: "Cerita pengurangan punya tiga bagian. Mula-mula. Berkurang. Dan sisa.",
  },
  {
    ikon: "➖",
    nama: "Tanda kurang",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">dibaca dikurangi</p>,
    suara: "Tanda kurang dipakai untuk pengurangan dan dibaca dikurangi.",
  },
  {
    ikon: "0️⃣",
    nama: "Sisa nol",
    isi: <PersK a={3} b={3} c={0} kecil />,
    suara: "Kalau semua benda berkurang, sisanya nol. Tiga dikurangi tiga hasilnya nol.",
  },
  {
    ikon: "🔑",
    nama: "Kata kunci",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">pulang • turun • dimakan • terbang • pecah</p>,
    suara: "Kata pulang, turun, dimakan, terbang, dan pecah memberi petunjuk bahwa benda berkurang.",
  },
];

const CATATANKU = [
  "Aku sudah mengerti cerita pengurangan.",
  "Aku bisa menyebutkan mula-mula, berkurang, dan sisa.",
  "Aku bisa menulis dan membaca kalimat pengurangan.",
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

function PoinPentingA3({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A3.map((p) => (
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
        <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <button
            type="button"
            aria-label="Dengarkan: Cara membaca"
            onClick={() => speakGuru("Cara membaca: enam dikurangi dua sama dengan empat. Atau enam dikurangi dua hasilnya empat.")}
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
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            💡
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Periksa jawabanmu dengan menggabung: sisa ditambah yang berkurang harus sama dengan mula-mula.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "susun" | "detektif" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "susun" },
  { nomor: 9, tipe: "detektif" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractPenguranganA(props: Umum) {
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
        <PoinPentingA3
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
