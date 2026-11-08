"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
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
import { CatatanPensil, LencanaSuara, PitaTahap, SuaraCtx, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";
import { BIRU, MERAH_MUDA, HIJAU } from "./CeritaBandingB";
import { sebut } from "./belas-a5-dasar";
import { KupuG } from "./selisih-a6-dasar";
import { AnakSvg, HurufBulat, PensilG, PilihKata, PohonG, RefleksiBab7, WARNA_PENSIL } from "./ukur-7-dasar";
import { LangkahBaris, LangkahKata, LangkahKupu, LangkahSejajar } from "./SubBabA7Concrete";
import { KartuJodoh, KartuPilihBatang, KartuTangga } from "./SubBabA7Picture";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab A: Membandingkan dan Mengurutkan Panjang Benda               */
/* (Buku Siswa Kelas 1 hlm. 199-207). Semua di klien, tanpa API.              */
/* Naskah: naskah/mtk-1-bab7-sub-a-membandingkan-mengurutkan-panjang.md       */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Berbaris Menurut Tinggi (seret anak), 2 Sejajarkan di Garis   */
/*            Awal (ketuk pensil), 3 Kartu Kata Perbandingan (seret kartu),   */
/*            4 Kupu-Kupu Terbang (seret ke ketinggian).                      */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Pilih Batang, 6 Susun Tangga Batang, 7 Jodohkan Diagram.      */
/*  Abstract: 8 Teka-Teki Pembanding, 9 Benar atau Salah,                     */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman membandingkan dan mengurutkan panjang benda. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_A7 = [
  {
    ikon: "↕️",
    nama: "Dua benda: lebih",
    ket: "lebih tinggi • lebih pendek",
    suara: "Untuk membandingkan dua benda, kita memakai kata lebih. Lebih tinggi, lebih pendek, lebih panjang, atau lebih rendah.",
  },
  {
    ikon: "🥇",
    nama: "Tiga benda atau lebih: paling",
    ket: "paling tinggi • paling pendek",
    suara: "Untuk membandingkan tiga benda atau lebih, kita memakai kata paling. Paling tinggi, paling pendek, paling panjang, atau paling rendah.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

/** Pohon-pohon pisang dalam satu gambar. `garis` menggambar garis putus-putus pada tinggi tertentu. */
function KebunPoster({ tinggi, huruf, garis = null }: { tinggi: number[]; huruf: string[]; garis?: number | null }) {
  const n = tinggi.length;
  const x = (i: number) => (300 / (n + 1)) * (i + 1);
  return (
    <svg viewBox="0 0 300 138" className="block h-auto w-full" role="img" aria-label={`Pohon pisang ${huruf.join(", ")} dengan tinggi berbeda atau sama`}>
      <path d="M6 116 H294" stroke="#8FC9A0" strokeWidth="3" strokeLinecap="round" />
      {garis !== null ? <path d={`M10 ${116 - garis} H290`} stroke="#F59E0B" strokeWidth="2.2" strokeDasharray="5 5" strokeLinecap="round" /> : null}
      {tinggi.map((t, i) => (
        <g key={i}>
          <PohonG x={x(i)} y={116} tinggi={t} />
          <HurufBulat x={x(i)} y={130} teks={huruf[i]} r={8.5} />
        </g>
      ))}
    </svg>
  );
}

function PensilPoster({ panjang, warna, geser = [0, 0, 0], awal = true }: { panjang: number[]; warna: string[]; geser?: number[]; awal?: boolean }) {
  return (
    <svg viewBox="0 0 300 116" className="block h-auto w-full" role="img" aria-label="Tiga pensil warna dibandingkan panjangnya">
      {awal ? <path d="M22 6 V110" stroke="#DC2626" strokeWidth="2.2" strokeDasharray="5 4" strokeLinecap="round" /> : null}
      {panjang.map((p, i) => (
        <PensilG key={i} x={22 + geser[i]} y={24 + i * 34} panjang={p} warna={warna[i]} />
      ))}
    </svg>
  );
}

const KATA_BANDING = ["lebih tinggi", "lebih pendek", "sama tinggi", "lebih panjang", "lebih rendah", "paling tinggi", "paling pendek", "paling panjang", "paling rendah", "sama panjang"];

export function InfografisUkurA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Membandingkan dan Mengurutkan Panjang Benda</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="BERJAJAR MENURUT TINGGI"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Kira, Upe, Malosi, dan Wei berbaris berjajar. Kita bisa mengurutkan mereka dari yang paling pendek sampai yang paling tinggi. Kira paling pendek dan Malosi paling tinggi. Tinggi badan kita berbeda-beda. Itu adalah ciptaan Tuhan yang harus disyukuri. Kita harus saling menghargai."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <div className="flex items-end justify-center gap-2.5">
            {[
              { nama: "Kira", h: 0.74, rambut: "#1F2937", baju: MERAH_MUDA },
              { nama: "Wei", h: 0.84, rambut: "#1F2937", baju: "#93C5FD" },
              { nama: "Upe", h: 0.94, rambut: "#7A4A1E", baju: "#FDE047" },
              { nama: "Malosi", h: 1.1, rambut: "#111827", baju: HIJAU },
            ].map((a) => (
              <span key={a.nama} className="flex flex-col items-center">
                <AnakSvg tinggi={a.h} rambut={a.rambut} baju={a.baju} kelas="h-[84px] w-[52px]" />
                <span className="text-[11px] font-black leading-none text-[#1C01A5]">{a.nama}</span>
              </span>
            ))}
          </div>
          <div className="mx-auto mt-0.5 h-1.5 w-[96%] rounded-full bg-[#B7E0C0]" aria-hidden="true" />
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]">Tinggi badan kita berbeda-beda. Itu ciptaan Tuhan. Kita saling menghargai.</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="LEBIH TINGGI, LEBIH PENDEK"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Kita bandingkan tinggi pohon A dan pohon B. Pohon A lebih tinggi dari pohon B. Pohon B lebih pendek dari pohon A. Untuk membandingkan dua benda, kita memakai kata lebih tinggi dan lebih pendek."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <KebunPoster tinggi={[100, 72]} huruf={["A", "B"]} garis={100} />
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]">
          A lebih tinggi dari B
          <br />B lebih pendek dari A
        </p>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="SAMA TINGGI"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Pohon B dan pohon C ujung atasnya sama tinggi. Pohon B sama tinggi dengan pohon C. Dua benda ada yang sama tingginya. Kita memakai kata sama tinggi."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <KebunPoster tinggi={[86, 86]} huruf={["B", "C"]} garis={86} />
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-lg font-black text-[#1C01A5]">B sama tinggi dengan C</p>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="PALING TINGGI, PALING PENDEK"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Kita bandingkan empat pohon A, B, C, dan D. Pohon A lebih tinggi dari pohon B, C, dan D, jadi pohon A paling tinggi. Pohon D lebih pendek dari pohon A, B, dan C, jadi pohon D paling pendek. Untuk tiga benda atau lebih, kita memakai kata paling tinggi dan paling pendek."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <KebunPoster tinggi={[100, 82, 82, 60]} huruf={["A", "B", "C", "D"]} />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <p className="rounded-xl border-4 border-[#1C01A5] bg-white px-1 py-1 text-center text-sm font-black text-[#1C01A5]">A paling tinggi</p>
          <p className="rounded-xl border-4 border-[#1C01A5] bg-white px-1 py-1 text-center text-sm font-black text-[#1C01A5]">D paling pendek</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="DUA URUTAN YANG BENAR"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Urutan pohon dari yang paling tinggi adalah A, B, C, dan D, atau A, C, B, dan D. Keduanya benar karena pohon B dan pohon C sama tinggi, jadi boleh bertukar tempat. Urutan dari yang paling pendek adalah D, C, B, dan A, atau D, B, C, dan A."
      >
        <div className="space-y-1.5">
          {[
            ["paling tinggi ➜", "A, B, C, D", "A, C, B, D"],
            ["paling pendek ➜", "D, C, B, A", "D, B, C, A"],
          ].map(([judul, satu, dua]) => (
            <div key={judul} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <p className="text-xs font-black text-[#1C01A5]/70">Urutan dari {judul}</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-0.5 text-base font-black text-[#1C01A5]">{satu}</span>
                <span className="text-sm font-black text-[#1C01A5]">atau</span>
                <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-0.5 text-base font-black text-[#1C01A5]">{dua}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">B dan C sama tinggi, jadi boleh bertukar.</p>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="LEBIH PANJANG, LEBIH PENDEK"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Untuk benda yang berbentuk batang, kita membandingkan panjangnya. Pensil hijau lebih pendek dari pensil merah. Pensil merah lebih pendek dari pensil biru. Pensil biru paling panjang dan pensil hijau paling pendek. Kita memakai kata lebih panjang, lebih pendek, paling panjang, dan paling pendek."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <PensilPoster panjang={[210, 165, 120]} warna={[WARNA_PENSIL.biru, WARNA_PENSIL.merah, WARNA_PENSIL.hijau]} />
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]">
          biru paling panjang
          <br />
          hijau paling pendek
        </p>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="MULAI DARI GARIS AWAL"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Supaya adil, benda yang dibandingkan harus dimulai dari garis awal yang sama. Gambar di kiri benar, karena ujung kiri semua pensil sejajar. Gambar di kanan salah, karena pensil mulai dari tempat yang berbeda sehingga pensil yang pendek terlihat lebih panjang. Ingat, sejajarkan dulu sebelum membandingkan."
      >
        <div className="grid grid-cols-2 gap-1.5">
          <div className="space-y-0.5 rounded-2xl border-4 border-[#16A34A] bg-white px-1 py-1">
            <p className="text-center text-xs font-black text-[#14532D]">✔ benar</p>
            <svg viewBox="0 0 150 80" className="block h-auto w-full" role="img" aria-label="Dua pensil sejajar di garis awal">
              <path d="M12 4 V76" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="4 3" />
              <PensilG x={12} y={22} panjang={116} warna={WARNA_PENSIL.biru} />
              <PensilG x={12} y={52} panjang={76} warna={WARNA_PENSIL.hijau} />
            </svg>
          </div>
          <div className="space-y-0.5 rounded-2xl border-4 border-[#DC2626] bg-white px-1 py-1">
            <p className="text-center text-xs font-black text-[#7F1D1D]">✘ salah</p>
            <svg viewBox="0 0 150 80" className="block h-auto w-full" role="img" aria-label="Dua pensil tidak sejajar sehingga membingungkan">
              <path d="M12 4 V76" stroke="#DC2626" strokeWidth="1.8" strokeDasharray="4 3" />
              <PensilG x={12} y={22} panjang={90} warna={WARNA_PENSIL.biru} />
              <PensilG x={50} y={52} panjang={76} warna={WARNA_PENSIL.hijau} />
            </svg>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="POSISI: TINGGI DAN RENDAH"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Kita juga bisa membandingkan posisi benda. Kupu-kupu hijau terbang paling tinggi. Kupu-kupu merah terbang lebih tinggi dari kupu-kupu kuning. Kupu-kupu kuning terbang paling rendah. Untuk posisi, kita memakai kata lebih tinggi, lebih rendah, paling tinggi, dan paling rendah."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-[#DFF1FF] px-1 py-1">
          <svg viewBox="0 0 300 130" className="block h-auto w-full" role="img" aria-label="Tiga kupu-kupu terbang pada tiga ketinggian">
            <path d="M24 118 V12" stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
            {[
              { x: 96, y: 98, w: "#FACC15" },
              { x: 168, y: 62, w: "#EF4444" },
              { x: 240, y: 26, w: "#4ADE80" },
            ].map((k) => (
              <g key={k.w}>
                <path d={`M19 ${k.y} H29`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
                <path d={`M32 ${k.y} H${k.x - 22}`} stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="3 4" strokeLinecap="round" />
                <KupuG x={k.x} y={k.y} s={1.1} warna={k.w} />
              </g>
            ))}
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["hijau: paling tinggi", "merah: di tengah", "kuning: paling rendah"].map((t) => (
            <p key={t} className="rounded-xl border-4 border-[#1C01A5] bg-white px-0.5 py-1 text-center text-xs font-black leading-tight text-[#1C01A5]">
              {t}
            </p>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="KATA PERBANDINGAN"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Ini kata-kata untuk membandingkan. Untuk dua benda, kita memakai lebih tinggi, lebih pendek, lebih panjang, atau lebih rendah. Kalau sama, kita memakai sama tinggi atau sama panjang. Untuk tiga benda atau lebih, kita memakai paling tinggi, paling pendek, paling panjang, atau paling rendah."
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {KATA_BANDING.map((k) => (
            <span key={k} className="rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] px-2.5 py-0.5 text-sm font-black text-[#1C01A5]">
              {k}
            </span>
          ))}
        </div>
        <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5 text-center text-sm font-black leading-snug text-[#1C01A5]">
          dua benda ➜ lebih
          <br />
          tiga benda atau lebih ➜ paling
        </p>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_A7.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-lg font-black leading-tight text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete                                                          */
/* ------------------------------------------------------------------------ */

type TipeConcrete = "baris" | "sejajar" | "kata" | "kupu";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "baris" },
  { nomor: 2, tipe: "sejajar" },
  { nomor: 3, tipe: "kata" },
  { nomor: 4, tipe: "kupu" },
];

export function ConcreteUkurA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Seret, ketuk, dan bandingkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "baris" ? <LangkahBaris {...dasar} /> : null}
        {langkah.tipe === "sejajar" ? <LangkahSejajar {...dasar} /> : null}
        {langkah.tipe === "kata" ? <LangkahKata {...dasar} /> : null}
        {langkah.tipe === "kupu" ? <LangkahKupu {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "batang" | "tangga" | "jodoh";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "batang" },
  { nomor: 6, tipe: "tangga" },
  { nomor: 7, tipe: "jodoh" },
];

export function PictureUkurA(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat diagram dan pilih" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "batang" ? <KartuPilihBatang {...dasar} /> : null}
        {kartu.tipe === "tangga" ? <KartuTangga {...dasar} /> : null}
        {kartu.tipe === "jodoh" ? <KartuJodoh {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Teka-Teki Pembanding ------------------------------ */

type RondeTeka = { petunjuk: string[]; tanya: string; opsi: string[]; jawab: string; urutan: string; bantu: string };

const RONDE_TEKA: RondeTeka[] = [
  {
    petunjuk: ["Pensil hijau lebih pendek dari pensil merah.", "Pensil merah lebih pendek dari pensil biru."],
    tanya: "Pensil mana yang paling panjang?",
    opsi: ["hijau", "merah", "biru"],
    jawab: "biru",
    urutan: "hijau < merah < biru",
    bantu: "Urutkan dulu dari yang paling pendek: hijau, lalu merah. Pensil biru lebih panjang dari merah.",
  },
  {
    petunjuk: ["Pohon A lebih tinggi dari pohon B.", "Pohon C lebih tinggi dari pohon A."],
    tanya: "Pohon mana yang paling tinggi?",
    opsi: ["A", "B", "C"],
    jawab: "C",
    urutan: "B < A < C",
    bantu: "Pohon C lebih tinggi dari pohon A, dan pohon A lebih tinggi dari pohon B. Susun urutannya.",
  },
  {
    petunjuk: ["Kira lebih pendek dari Upe.", "Upe lebih pendek dari Wei.", "Wei lebih pendek dari Malosi."],
    tanya: "Siapa yang paling pendek?",
    opsi: ["Kira", "Upe", "Wei", "Malosi"],
    jawab: "Kira",
    urutan: "Kira < Upe < Wei < Malosi",
    bantu: "Cari anak yang lebih pendek dari semua anak yang lain. Tidak ada yang lebih pendek dari dia.",
  },
  {
    petunjuk: ["Burung P terbang lebih rendah dari burung Q.", "Burung R terbang lebih tinggi dari burung Q.", "Burung S terbang lebih rendah dari burung P."],
    tanya: "Burung mana yang terbang paling rendah?",
    opsi: ["P", "Q", "R", "S"],
    jawab: "S",
    urutan: "S < P < Q < R",
    bantu: "Burung S lebih rendah dari burung P, dan burung P lebih rendah dari burung Q. Siapa yang paling rendah?",
  },
  {
    petunjuk: ["Tali merah sama panjang dengan tali biru.", "Tali hijau lebih panjang dari tali merah.", "Tali kuning lebih pendek dari tali biru."],
    tanya: "Tali mana yang paling panjang?",
    opsi: ["merah", "biru", "hijau", "kuning"],
    jawab: "hijau",
    urutan: "kuning < merah = biru < hijau",
    bantu: "Tali merah dan tali biru sama panjang. Tali hijau lebih panjang dari merah, jadi lebih panjang dari biru juga.",
  },
];

function RondeTekaTeki({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TEKA[ronde];
  const akhir = ronde === RONDE_TEKA.length - 1;
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a7-teka"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.petunjuk.join(" ")} Jawabannya ${d.jawab}.${akhir ? ` Ada ${sebut(3)} tali yang lebih pendek dari tali hijau.` : ""}`);

  const pilih = (t: string) => {
    if (beres) return;
    if (t === d.jawab) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(t);
      setKabar({ teks: d.bantu, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih pendek" : suara ? "Hebat!" : beres ? "Tekamu tepat!" : "Baca petunjuk, lalu tebak"}
        teks={`Baca petunjuknya baik-baik. ${d.petunjuk.join(" ")} ${d.tanya}${akhir ? " Di akhir, ucapkan berapa tali yang lebih pendek dari tali hijau." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
          {d.petunjuk.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-lg font-black text-[#1C01A5]">{d.tanya}</p>
            <PilihKata opsi={d.opsi} keliru={salah} onPilih={pilih} kolom={d.opsi.length > 3 ? 2 : 3} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.urutan.split(" < ").slice(-1)[0]} paling panjang. Yang lebih pendek: ?` : d.urutan}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTeka({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Teka-Teki Pembanding"
      warna="#BBF7D0"
      petunjuk="Baca petunjuk perbandingan, lalu tebak siapa atau mana yang paling tinggi, paling pendek, atau paling panjang. Pada soal terakhir, ucapkan berapa tali yang lebih pendek dari tali hijau."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-teka"
      jumlahRonde={RONDE_TEKA.length}
      kunciAkhir={3}
      belumSiap="Tebak dulu jawabannya, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTekaTeki ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Benar atau Salah ----------------------------------- */

type RondeBenar = { fakta: string[]; pernyataan: { teks: string; benar: boolean }[] };

const RONDE_BENAR: RondeBenar[] = [
  {
    fakta: ["Urutan dari paling pendek:", "Kira, Upe, Wei, Malosi."],
    pernyataan: [
      { teks: "Wei lebih tinggi dari Upe.", benar: true },
      { teks: "Kira paling tinggi.", benar: false },
      { teks: "Malosi lebih pendek dari Kira.", benar: false },
    ],
  },
  {
    fakta: ["Pensil A sama panjang dengan pensil C.", "Pensil B lebih panjang dari pensil A."],
    pernyataan: [
      { teks: "Pensil B paling panjang.", benar: true },
      { teks: "Pensil C lebih panjang dari pensil B.", benar: false },
      { teks: "Pensil A sama panjang dengan pensil C.", benar: true },
    ],
  },
  {
    fakta: ["Urutan dari paling tinggi:", "burung X, burung Y, burung Z."],
    pernyataan: [
      { teks: "Burung Z terbang paling rendah.", benar: true },
      { teks: "Burung Y terbang lebih rendah dari burung X.", benar: true },
      { teks: "Burung X terbang lebih rendah dari burung Z.", benar: false },
    ],
  },
];

function RondeBenarSalah({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BENAR[ronde];
  const akhir = ronde === RONDE_BENAR.length - 1;
  const [langkah, setLangkah] = useState(0);
  const [goyang, setGoyang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= d.pernyataan.length;
  const suara = panel.suara["a7-benar"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.fakta.join(" ")} ${d.pernyataan.filter((p) => p.benar).map((p) => p.teks).join(" ")}${akhir ? ` Ada ${sebut(2)} burung yang terbang lebih rendah dari burung X.` : ""}`);

  const jawab = (nilai: boolean) => {
    if (beres) return;
    if (d.pernyataan[langkah].benar === nilai) {
      setKabar(null);
      const berikut = langkah + 1;
      setLangkah(berikut);
      if (berikut >= d.pernyataan.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang((g) => g + 1);
      setKabar({ teks: "Periksa lagi dengan keterangan di atas. Bandingkan kata lebih dan paling dengan urutannya.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih rendah" : suara ? "Hebat!" : beres ? "Semua tepat!" : "Benar atau salah?"}
        teks={`Baca keterangannya. ${d.fakta.join(" ")} Lalu putuskan, setiap kalimat benar atau salah.${akhir ? " Di akhir, ucapkan berapa burung yang terbang lebih rendah dari burung X." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-0.5 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
          {d.fakta.map((f) => (
            <p key={f}>{f}</p>
          ))}
        </div>
        <ul className="space-y-1" aria-label="Kalimat yang harus diputuskan">
          {d.pernyataan.map((p, i) => (
            <li
              key={p.teks}
              className={`flex items-center justify-between gap-2 rounded-2xl border-4 px-2 py-1.5 text-base font-black leading-snug ${
                i < langkah ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : i === langkah ? "border-[#1C01A5] bg-white text-[#1C01A5]" : "border-[#1C01A5]/25 bg-white/60 text-[#1C01A5]/40"
              }`}
            >
              <span className="min-w-0">{p.teks}</span>
              {i < langkah ? <span className="shrink-0 text-sm">{p.benar ? "✔ benar" : "✘ salah"}</span> : null}
            </li>
          ))}
        </ul>
        {!beres ? (
          <div key={goyang} className={`grid grid-cols-2 gap-2 ${goyang > 0 ? "igil-goyang" : ""}`}>
            <button type="button" aria-label="Benar" onClick={() => jawab(true)} className="rounded-2xl border-4 border-[#14532D] bg-[#BBF7D0] py-3 text-xl font-black text-[#14532D] shadow-[0_4px_0_rgba(20,83,45,0.3)]">
              ✔ Benar
            </button>
            <button type="button" aria-label="Salah" onClick={() => jawab(false)} className="rounded-2xl border-4 border-[#7F1D1D] bg-[#FECACA] py-3 text-xl font-black text-[#7F1D1D] shadow-[0_4px_0_rgba(127,29,29,0.3)]">
              ✘ Salah
            </button>
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Burung yang terbang lebih rendah dari burung X: ?" : "Semua kalimat sudah kamu putuskan dengan tepat"}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuBenarSalah({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Benar atau Salah"
      warna="#FDE68A"
      petunjuk="Baca keterangan tentang urutan tinggi atau panjang. Lalu putuskan apakah setiap kalimat benar atau salah. Pada soal terakhir, ucapkan berapa burung yang terbang lebih rendah dari burung X."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-benar"
      jumlahRonde={RONDE_BENAR.length}
      kunciAkhir={2}
      belumSiap="Putuskan semua kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBenarSalah ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara -------------------------- */

const UKURAN_KELOMPOK = [3, 4, 5];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const n = tahap === 0 ? 3 : pilih !== null ? pilih - 1 : null;
  const id = tahap === 0 ? "a7-tulis-0" : `a7-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(
    suara && n !== null,
    n !== null ? (tahap === 0 ? `Ada ${kata(n).toLowerCase()} anak yang lebih tinggi dari Kira. Sekarang guratkan angkanya di kanvas.` : `Ada ${kata(n).toLowerCase()} benda yang lebih panjang dari benda yang paling pendek. Sekarang guratkan angkanya di kanvas.`) : ""
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Hitung berapa benda yang lebih tinggi atau lebih panjang, ucapkan hasilnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih sendiri berapa benda yang kamu bandingkan.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa anak yang lebih tinggi?" : n === null ? "Pilih banyak benda" : "Ucapkan hasilnya"}
          teks={
            tahap === 0
              ? "Urutan dari paling pendek adalah Kira, Upe, Wei, Malosi. Ada berapa anak yang lebih tinggi dari Kira? Ucapkan hasilnya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Kamu menyusun beberapa benda dari yang paling pendek. Pilih banyak bendanya. Lalu ucapkan berapa benda yang lebih panjang dari benda yang paling pendek, dan guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <>
              <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2 text-center text-base font-black leading-snug text-[#1C01A5]">Urutan dari paling pendek: Kira, Upe, Wei, Malosi.</p>
              <p className="text-center text-xl font-black text-[#1C01A5]">Yang lebih tinggi dari Kira: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          ) : pilih === null ? (
            <div className="space-y-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Kamu menyusun berapa benda dari yang paling pendek?</p>
              <div className="grid grid-cols-3 gap-2">
                {UKURAN_KELOMPOK.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-label={`Pilih ${v} benda`}
                    onClick={() => setPilih(v)}
                    className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-2 text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2 text-center text-base font-black leading-snug text-[#1C01A5]">Kamu menyusun {pilih} benda dari yang paling pendek.</p>
              <p className="text-center text-xl font-black text-[#1C01A5]">Yang lebih panjang dari benda terpendek: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          )}
        </div>
        {n !== null ? <JawabSuara id={id} jumlah={n} panel={panel} siap belumSiap="" /> : null}
        {suara && n !== null ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={n} kata={kata(n)} onCompletedTrace={() => setLulus(true)} />
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
  "Ingat selalu! Untuk membandingkan dua benda, kita memakai kata lebih, misalnya lebih tinggi atau lebih pendek. Kalau ujungnya sama, kita memakai sama tinggi atau sama panjang. Untuk tiga benda atau lebih, kita memakai kata paling, misalnya paling tinggi atau paling pendek. Kita bisa mengurutkan benda dari yang paling pendek atau dari yang paling tinggi. Benda yang dibandingkan harus dimulai dari garis awal yang sama. Dan tinggi badan kita berbeda-beda, itu ciptaan Tuhan yang harus disyukuri.";

const POIN_A7: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "↕️",
    nama: "Dua benda: lebih",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">A lebih tinggi dari B • B lebih pendek dari A</p>,
    suara: "Untuk dua benda, kita memakai kata lebih. Pohon A lebih tinggi dari pohon B. Pohon B lebih pendek dari pohon A.",
  },
  {
    ikon: "🟰",
    nama: "Sama tinggi, sama panjang",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">B sama tinggi dengan C</p>,
    suara: "Kalau ujung atas dua benda sama, kita memakai sama tinggi. Kalau ujung kanannya sama, kita memakai sama panjang.",
  },
  {
    ikon: "🥇",
    nama: "Tiga benda atau lebih: paling",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">paling tinggi • paling pendek</p>,
    suara: "Untuk tiga benda atau lebih, kita memakai kata paling. Pohon A paling tinggi dan pohon D paling pendek.",
  },
  {
    ikon: "🔢",
    nama: "Urutkan benda",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">paling pendek ➜ paling tinggi</p>,
    suara: "Kita bisa mengurutkan benda dari yang paling pendek sampai yang paling tinggi, atau sebaliknya. Kalau ada dua benda sama tinggi, urutannya boleh bertukar.",
  },
  {
    ikon: "📍",
    nama: "Garis awal yang sama",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">sejajarkan ujung kiri, lalu lihat ujung kanan</p>,
    suara: "Supaya adil, mulai dari garis awal yang sama. Sejajarkan ujung kiri benda, lalu lihat ujung kanannya.",
  },
  {
    ikon: "🦋",
    nama: "Posisi: tinggi dan rendah",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">lebih tinggi • lebih rendah • paling rendah</p>,
    suara: "Untuk posisi benda yang terbang atau menggantung, kita memakai lebih tinggi, lebih rendah, paling tinggi, dan paling rendah.",
  },
];

const REFLEKSI_A7 = [
  "Aku sudah bisa membandingkan dan mengurutkan panjang benda.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
  "Aku belajar dengan hati senang.",
  "Aku belajar dengan tertib.",
];

function PoinPentingA7({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A7.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
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
            aria-label="Dengarkan: Cara menyebutkan perbandingan"
            onClick={() => speakGuru("Cara menyebutkan perbandingan. Pohon A lebih tinggi dari pohon B. Pohon A paling tinggi.")}
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🗣️</span>
              Cara menyebutkan
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { teks: "pohon A", warna: "#BBF7D0" },
              { teks: "lebih tinggi", warna: "#FFF7CC" },
              { teks: "dari", warna: "#FFFFFF" },
              { teks: "pohon B", warna: "#BFDBFE" },
            ].map((k) => (
              <span key={k.teks} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.teks}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <p className="flex items-center gap-2 text-base font-black text-[#14532D]">
            <span className="text-3xl" aria-hidden="true">
              🏠
            </span>
            Ayo Bermain dan Ayo Mencoba
          </p>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Bermain: berbarislah bersama 6 orang teman. Amati dan bandingkan tinggi badan kalian, lalu buat kalimat perbandingan dengan kata sama tinggi, lebih tinggi, dan paling tinggi. Tinggi badan kita berbeda-beda, itu ciptaan Tuhan yang harus disyukuri, dan kita harus saling menghargai.
          </p>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Mencoba: amati 3 benda di sekitarmu. Bandingkan panjang atau tingginya, lalu buat cerita perbandingannya dengan kata lebih panjang, lebih pendek, paling panjang, paling pendek, dan sama panjang.
          </p>
        </div>
        <RefleksiBab7 items={REFLEKSI_A7} speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "teka" | "benar" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "teka" },
  { nomor: 9, tipe: "benar" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractUkurA(props: Umum) {
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
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Kata dan angka" warna={BIRU} />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      {poin ? (
        <PoinPentingA7
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "teka" ? <KartuTeka {...dasar} /> : null}
          {kartu.tipe === "benar" ? <KartuBenarSalah {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}