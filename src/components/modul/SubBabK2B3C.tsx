"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, KotakPoster, PoinK2B2 } from "./kit-k2b2";
import { BendaRuangSvg, BentukSvg, ModelRuangSvg } from "./dasar-k2b3";
import { KotakKecil } from "./kit-k2b3";
import { BenarSalahGame, DetektifTeks, SusunKata } from "./permainan-k2b3";
import { NAMA_RUANG, RONDE_BENARSALAH_C, RONDE_DETEKTIF_C, RONDE_KALIMAT_C, type IdBentuk, type JenisRuang } from "./data-k2b3";
import { SUB_C3 } from "./naskah-k2b3";
import { LangkahCetakK2B3C, LangkahGelindingK2B3C, LangkahPilahK2B3C, LangkahTasK2B3C } from "./SubBabK2B3CConcrete";
import { KartuBayanganK2B3C, KartuNamaK2B3C, KartuTabelK2B3C } from "./SubBabK2B3CPicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab C: Bangun Ruang. Poster Infografis (sepuluh panel dari */
/* naskah), tiga permainan Abstract, dan pembungkus tiga tahap permainan.      */
/* Naskah: naskah/mtk-2-bab3-sub-c-bangun-ruang.md. Tanpa API.                 */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman bangun ruang. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

/** Panel satu bangun ruang: dua benda nyata dan beberapa fakta singkat. */
function KartuBangun({ benda, fakta }: { benda: string[]; fakta: string[] }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-3">
      <div className="flex flex-col items-center gap-1">
        {benda.map((b) => (
          <BendaRuangSvg key={b} id={b} kelas="h-16 w-16" />
        ))}
      </div>
      <ul className="space-y-1">
        {fakta.map((f) => (
          <li key={f} className="rounded-xl border-2 border-[#1C01A5] bg-[#F5F3FF] px-2 py-1 text-xs font-black leading-tight text-[#1C01A5]">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

const CETAK_PANEL: [JenisRuang, IdBentuk | null, string][] = [
  ["kubus", "persegi", "segi empat sama sisi"],
  ["balok", "persegiPanjang", "segi empat beda sisi"],
  ["tabung", "lingkaran", "lingkaran (alas)"],
  ["kerucut", "lingkaran", "lingkaran (alas)"],
  ["bola", null, "tidak ada yang rata"],
];

function visualInfografis(): React.ReactNode[] {
  return [
    /* 1 Bangun Datar dan Bangun Ruang */
    <div key="1" className="grid grid-cols-2 gap-2">
      <KotakKecil ket="Bangun datar: 1 permukaan" warna="#DBEAFE">
        <div className="flex items-center justify-center gap-0.5">
          <BentukSvg id="segitiga" warna="#FDE68A" kelas="h-10 w-10" />
          <BentukSvg id="persegi" warna="#BBF7D0" kelas="h-10 w-10" />
          <BentukSvg id="lingkaran" warna="#FBCFE8" kelas="h-10 w-10" />
        </div>
      </KotakKecil>
      <KotakKecil ket="Bangun ruang: ada ruang di dalam" warna="#FEF3C7">
        <div className="flex items-center justify-center gap-0.5">
          <BendaRuangSvg id="kardus" kelas="h-10 w-10" />
          <BendaRuangSvg id="topi" kelas="h-10 w-10" />
          <BendaRuangSvg id="botol" kelas="h-10 w-10" />
        </div>
      </KotakKecil>
    </div>,
    /* 2 Bisa Diisi? */
    <div key="2" className="grid grid-cols-2 gap-2">
      <KotakPoster warna="#DCFCE7">
        <div className="flex items-center justify-center gap-1">
          <BendaRuangSvg id="kardus" kelas="h-12 w-12" />
          <BendaRuangSvg id="botol" kelas="h-12 w-12" />
        </div>
        <p className="text-center text-sm font-black text-[#14532D]">✔ Bisa diisi</p>
        <p className="text-center text-xs font-black text-[#14532D]/80">bangun ruang</p>
      </KotakPoster>
      <KotakPoster warna="#FEE2E2">
        <div className="flex items-center justify-center">
          <BentukSvg id="persegi" warna="#FFFFFF" kelas="h-12 w-12" />
        </div>
        <p className="text-center text-sm font-black text-[#7F1D1D]">✘ Tidak bisa diisi</p>
        <p className="text-center text-xs font-black text-[#7F1D1D]/80">bangun datar (tipis)</p>
      </KotakPoster>
    </div>,
    /* 3 Permukaan Datar dan Lengkung */
    <div key="3" className="space-y-1.5">
      <p className="text-sm font-black text-[#1C01A5]">Permukaan datar</p>
      <div className="grid grid-cols-2 gap-1.5">
        {(["kubus", "balok"] as const).map((j) => (
          <KotakKecil key={j} ket={NAMA_RUANG[j]} warna="#DBEAFE">
            <ModelRuangSvg jenis={j} kelas="h-14 w-14" />
          </KotakKecil>
        ))}
      </div>
      <p className="text-sm font-black text-[#1C01A5]">Permukaan lengkung</p>
      <div className="grid grid-cols-3 gap-1.5">
        {(["tabung", "kerucut", "bola"] as const).map((j) => (
          <KotakKecil key={j} ket={NAMA_RUANG[j]} warna="#FCE7F3">
            <ModelRuangSvg jenis={j} kelas="h-14 w-14" />
          </KotakKecil>
        ))}
      </div>
    </div>,
    /* 4 Menggelinding atau Tidak */
    <div key="4" className="grid grid-cols-2 gap-2">
      <KotakKecil ket="🌀 Menggelinding" warna="#DCFCE7">
        <div className="flex items-center justify-center gap-0.5">
          <BendaRuangSvg id="bola" kelas="h-10 w-10" />
          <BendaRuangSvg id="botol" kelas="h-10 w-10" />
          <BendaRuangSvg id="topi" kelas="h-10 w-10" />
        </div>
      </KotakKecil>
      <KotakKecil ket="🧱 Diam" warna="#FEE2E2">
        <div className="flex items-center justify-center gap-0.5">
          <BendaRuangSvg id="dadu" kelas="h-10 w-10" />
          <BendaRuangSvg id="kardus" kelas="h-10 w-10" />
        </div>
      </KotakKecil>
    </div>,
    /* 5 Kubus */
    <KartuBangun key="5" benda={["dadu", "kotakHadiah"]} fakta={["6 permukaan datar", "Semua segi empat yang sama ukurannya", "Contoh: dadu, kotak hadiah"]} />,
    /* 6 Balok */
    <KartuBangun key="6" benda={["kardus", "kotakPensil"]} fakta={["6 permukaan datar", "Segi empat yang berbeda ukurannya", "Contoh: kardus, kotak pensil"]} />,
    /* 7 Tabung */
    <KartuBangun key="7" benda={["kaleng", "botol"]} fakta={["Permukaan lengkung", "Alasnya lingkaran", "Bisa menggelinding"]} />,
    /* 8 Kerucut */
    <KartuBangun key="8" benda={["topi", "esKrim"]} fakta={["Satu ujung runcing", "Alasnya lingkaran", "Bisa menggelinding"]} />,
    /* 9 Bola */
    <KartuBangun key="9" benda={["bola", "kelereng"]} fakta={["Seluruhnya lengkung", "Tidak punya ujung", "Paling mudah menggelinding"]} />,
    /* 10 Cetak Permukaannya */
    <div key="10" className="space-y-1">
      {CETAK_PANEL.map(([j, bentuk, ket]) => (
        <div key={j} className="grid grid-cols-[auto_auto_1fr] items-center gap-2 rounded-xl border-2 border-[#1C01A5] bg-[#F5F3FF] px-2 py-1">
          <ModelRuangSvg jenis={j} kelas="h-9 w-9" />
          <span className="text-xl font-black text-[#1C01A5]" aria-hidden="true">
            ➜
          </span>
          <span className="flex items-center gap-2 text-xs font-black leading-tight text-[#1C01A5]">
            {bentuk ? <BentukSvg id={bentuk} kosong putus kelas="h-8 w-8" /> : <span className="flex h-8 w-8 items-center justify-center text-xl">🚫</span>}
            {NAMA_RUANG[j]}: {ket}
          </span>
        </div>
      ))}
    </div>,
  ];
}

export function InfografisK2B3CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C3} judul="Bangun Ruang" suaraInfo={SUARA_INFO} visual={visualInfografis()} speakGuru={speakGuru} />;
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar benda.                 */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Benar atau Salah? --------------------------------- */

function RondeBenarSalah({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  return (
    <>
      <CatatanPensil pendek="Benar atau salah?" teks="Baca tiap pernyataan, lalu tekan Benar atau Salah. Kalau jawabanmu keliru, dengarkan penjelasannya, lalu coba lagi." />
      <BenarSalahGame pernyataan={RONDE_BENARSALAH_C[ronde]} onBeres={onBeres} pesanBeres="Semua pernyataan sudah kamu nilai dengan tepat." />
    </>
  );
}

export function KartuBenarSalahK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Benar atau Salah?"
      warna="#BBF7D0"
      petunjuk="Baca tiap pernyataan tentang bangun datar dan bangun ruang. Tekan Benar atau Salah. Kalau keliru, dengarkan penjelasannya dan coba lagi."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-benarsalah"
      jumlahRonde={RONDE_BENARSALAH_C.length}
      belumSiap="Nilai semua pernyataan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBenarSalah ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Bangun Ruang ----------------------------- */

function RondeDetektif({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  return (
    <>
      <CatatanPensil pendek="Baca dua petunjuk" teks="Baca kedua petunjuk. Ketuk petunjuk untuk mendengarnya. Lalu pilih nama bangun ruang yang cocok dengan kedua petunjuk." />
      <DetektifTeks soal={RONDE_DETEKTIF_C[ronde]} onBeres={onBeres} pesanBeres={(n) => `Betul! Bangun ruang itu adalah ${n}.`} />
    </>
  );
}

export function KartuDetektifK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Bangun Ruang"
      warna="#FDE68A"
      petunjuk="Baca kedua petunjuk tentang bangun ruang misterius. Lalu pilih nama yang cocok dengan kedua petunjuk."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-detektif"
      jumlahRonde={RONDE_DETEKTIF_C.length}
      belumSiap="Temukan namanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Susun Kalimat ------------------------------------ */

function RondeKalimat({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_KALIMAT_C[ronde];
  return (
    <>
      <CatatanPensil pendek="Susun kalimatnya" teks="Susun kalimat dari kartu kata. Ketuk kartu kata secara berurutan. Ada satu kartu yang tidak cocok, jangan dipakai. Kalau salah, tekan Urungkan. Lalu tekan Periksa." />
      <SusunKata kata={r.kata} pengecoh={r.pengecoh} nomor={ronde} onBeres={onBeres} />
    </>
  );
}

export function KartuKalimatK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Kalimat"
      warna="#C7D2FE"
      petunjuk="Susun kalimat tentang bangun ruang dari kartu kata. Ketuk kartu secara berurutan. Ada satu kartu yang tidak cocok. Tekan Urungkan kalau salah, lalu tekan Periksa."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-kalimat"
      jumlahRonde={RONDE_KALIMAT_C.length}
      belumSiap="Susun kalimatnya dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKalimat ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahGelindingK2B3C {...d} /> },
  { nomor: 2, render: (d) => <LangkahTasK2B3C {...d} /> },
  { nomor: 3, render: (d) => <LangkahCetakK2B3C {...d} /> },
  { nomor: 4, render: (d) => <LangkahPilahK2B3C {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuBayanganK2B3C {...d} /> },
  { nomor: 6, render: (d) => <KartuTabelK2B3C {...d} /> },
  { nomor: 7, render: (d) => <KartuNamaK2B3C {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuBenarSalahK2B3C {...d} /> },
  { nomor: 9, render: (d) => <KartuDetektifK2B3C {...d} /> },
  { nomor: 10, render: (d) => <KartuKalimatK2B3C {...d} /> },
];

export function ConcreteK2B3C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Gelindingkan, raba, dan pilah!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B3C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat model dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B3C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_C3} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />}
    />
  );
}
