"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import {
  IgilBicara,
  KERTAS_ANGKA,
  KERTAS_GAMBAR,
  TOMBOL_KECIL,
  TOTAL_GAME,
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
import { TENGAH } from "./CeritaBandingB";
import {
  Bangun,
  Benda,
  BendaDi,
  CIRI,
  DAFTAR_BENDA,
  GOLONGAN_BANGUN,
  GOLONGAN_URUT,
  NAMA_GOLONGAN,
  NAMA_PENDEK,
  WARNA_GOLONGAN,
  type Golongan,
  type JenisBangun,
  type JenisBenda,
} from "./bentuk-a4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab A: Mendeskripsikan Benda Berdasarkan Bentuk (Buku Siswa       */
/* Kelas 1 hlm. 117-126). Semua di klien, tanpa API.                          */
/* Naskah: naskah/mtk-1-bab4-sub-a-mendeskripsikan-bentuk.md                   */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Keranjang Tiga Bentuk (seret), 2 Berburu Bentuk di Kamar      */
/*            (cari dan ketuk), 3 Bayangan Siapa Ini (tebak), 4 Papan Paku    */
/*            dan Karet Gelang (bentangkan karet).                            */
/*  Picture:  (bentuk polos saja, tanpa gambar benda)                         */
/*            5 Warnai Menurut Nama (mewarnai), 6 Tabel Tally Bentuk          */
/*            (menghitung dan mencatat), 7 Hubungkan Garis Putus-putus.       */
/*  Abstract: 8 Kartu Ciri-ciri (jodohkan kata), 9 Detektif Bentuk Misterius  */
/*            (petunjuk kata), 10 Kanvas Guratan dan Suara.                   */
/* ------------------------------------------------------------------------ */

const kataK = (n: number) => kata(n).toLowerCase();

/** Petunjuk tanpa menyebut nama bentuknya. Dibacakan Suara Guru saat jawaban belum tepat. */
function petunjukBenda(j: JenisBenda): string {
  const { nama, golongan } = DAFTAR_BENDA[j];
  const n = nama.toLowerCase();
  if (golongan === "lengkung") return `Raba tepi ${n}. Tepinya melengkung terus dan tidak ada pojok.`;
  return `Hitung pojok ${n}. Ada ${golongan === "segitiga" ? "tiga" : "empat"} pojok.`;
}

function petunjukBangun(jenis: JenisBangun): string {
  const g = GOLONGAN_BANGUN[jenis];
  if (g === "lengkung") return "Telusuri tepinya dengan jarimu. Tepinya melengkung terus, tanpa pojok.";
  return `Hitung pojoknya. Ada ${g === "segitiga" ? "tiga" : "empat"} pojok.`;
}

/** Penjelasan satu benda setelah dijawab benar. */
function ucapBenda(j: JenisBenda): string {
  const { nama, golongan } = DAFTAR_BENDA[j];
  if (golongan === "lengkung") return `${nama} berbentuk lengkung. Tepinya melengkung, tidak ada sisi lurus dan tidak ada sudut.`;
  if (golongan === "segitiga") return `${nama} berbentuk segitiga. ${nama} punya tiga sisi lurus dan tiga sudut.`;
  return `${nama} berbentuk segi empat. ${nama} punya empat sisi lurus dan empat sudut.`;
}

/* ------------------------------ Pembungkus game -------------------------- */

/** Seperti GameRonde, tetapi jawaban suara boleh tidak ada (kunciAkhir kosong). */
export function GameBentuk({
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
  kunciAkhir?: number;
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
      ) : kunciAkhir === undefined ? (
        selesai ? (
          <TombolLanjut teks={teksLanjut} onClick={lanjut} />
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

/** Tiga tombol nama bentuk. Tanpa gambar, hanya kata. */
function PilihNama({ onPilih, keliru, mati = false }: { onPilih: (g: Golongan) => void; keliru: Golongan | null; mati?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {GOLONGAN_URUT.map((g) => (
        <button
          key={`${g}-${keliru === g ? "x" : "o"}`}
          type="button"
          aria-label={`Pilih ${NAMA_GOLONGAN[g]}`}
          disabled={mati}
          onClick={() => onPilih(g)}
          className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
            keliru === g ? "igil-goyang" : ""
          }`}
        >
          {NAMA_PENDEK[g]}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman bentuk benda. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const CONTOH: Record<Golongan, JenisBenda[]> = {
  lengkung: ["donat", "piring", "telur", "melon", "jam", "bola"],
  segitiga: ["semangka", "risol", "penggaris", "lupis", "tenda"],
  segiempat: ["lapis", "jendela", "pintu", "buku", "bingkai", "bendera"],
};

const SUARA_CIRI: Record<Golongan, string> = {
  lengkung: "Bentuk lengkung tepinya melengkung. Tidak ada sisi lurus dan tidak ada sudut. Contohnya donat, piring, jam dinding, dan telur.",
  segitiga: "Segitiga punya tiga sisi lurus dan tiga sudut. Contohnya tenda, irisan semangka, kue risol, dan penggaris segitiga.",
  segiempat: "Segi empat punya empat sisi lurus dan empat sudut. Contohnya pintu, jendela, buku, dan bingkai foto.",
};

const INGAT_A4 = [
  {
    ikon: "📏",
    nama: "Sisi",
    ket: "Garis lurus di tepi bentuk",
    suara: "Sisi adalah garis lurus di tepi sebuah bentuk. Hitung sisinya satu per satu. Segitiga punya tiga sisi. Segi empat punya empat sisi.",
  },
  {
    ikon: "📐",
    nama: "Sudut",
    ket: "Pojok tempat dua sisi bertemu",
    suara: "Sudut adalah pojok, tempat dua sisi bertemu. Segitiga punya tiga sudut. Segi empat punya empat sudut. Bentuk lengkung tidak punya sudut.",
  },
];

export function InfografisBentukA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Bentuk Benda</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="TIGA BENTUK DI SEKITAR KITA"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Benda di sekitar kita punya tiga bentuk. Bentuk lengkung, segitiga, dan segi empat. Donat bentuknya lengkung. Irisan semangka bentuknya segitiga. Kue lapis bentuknya segi empat."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {GOLONGAN_URUT.map((g) => {
            const jenisBangun: JenisBangun = g === "lengkung" ? "bulat" : g === "segitiga" ? "segitiga" : "persegi";
            return (
              <div key={g} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
                <Bangun jenis={jenisBangun} isi={WARNA_GOLONGAN[g]} kelas="mx-auto h-14 w-14" />
                <p className="text-sm font-black leading-tight text-[#1C01A5]">{NAMA_PENDEK[g]}</p>
                <div className="flex justify-center gap-0.5">
                  {CONTOH[g].slice(0, 2).map((j) => (
                    <Benda key={j} jenis={j} kelas="h-9 w-9" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="CIRI-CIRI TIGA BENTUK"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Tabel ciri-ciri. Bentuk lengkung: nol sisi lurus, nol sudut. Segitiga: tiga sisi lurus, tiga sudut. Segi empat: empat sisi lurus, empat sudut. Sisi adalah garis lurus. Sudut adalah pojok."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="px-1 py-1.5 text-left text-xs">Bentuk</th>
                <th className="px-1 py-1.5 text-xs">Sisi lurus</th>
                <th className="px-1 py-1.5 text-xs">Sudut</th>
              </tr>
            </thead>
            <tbody>
              {GOLONGAN_URUT.map((g) => (
                <tr key={g} className="border-t-2 border-[#1C01A5]/20">
                  <td className="px-1 py-1 text-left text-xs">
                    <span className="flex items-center gap-1.5">
                      <Bangun jenis={g === "lengkung" ? "bulat" : g === "segitiga" ? "segitiga" : "persegi"} isi={WARNA_GOLONGAN[g]} tebal={4} kelas="h-8 w-8" />
                      {NAMA_PENDEK[g]}
                    </span>
                  </td>
                  <td className="px-1 py-1 text-2xl">{CIRI[g].sisi}</td>
                  <td className="bg-[#FFF7CC] px-1 py-1 text-2xl text-[#166534]">{CIRI[g].sudut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="BENTUK LENGKUNG"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Bentuk lengkung punya dua rupa. Ada yang bulat, seperti piring. Ada yang lonjong, seperti telur. Keduanya tepinya melengkung dan tidak punya sudut, jadi keduanya bentuk lengkung."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          {(
            [
              ["bulat", "piring", "Bulat"],
              ["lonjong", "telur", "Lonjong"],
            ] as [JenisBangun, JenisBenda, string][]
          ).map(([b, j, nama]) => (
            <div key={nama} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <Bangun jenis={b} isi={WARNA_GOLONGAN.lengkung} kelas="mx-auto h-14 w-20" />
              <Benda jenis={j} kelas="mx-auto h-10 w-10" />
              <p className="text-sm font-black text-[#1C01A5]">{nama}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Dua-duanya bentuk lengkung</p>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="SEGITIGA SELALU SEGITIGA"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Segitiga tetap segitiga walaupun posisinya berubah. Segitiga yang tegak, yang terbalik, dan yang miring, semuanya punya tiga sisi dan tiga sudut. Jadi semuanya segitiga."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {(
            [
              ["segitiga", "Tegak"],
              ["segitigaTerbalik", "Terbalik"],
              ["segitigaSiku", "Miring"],
            ] as [JenisBangun, string][]
          ).map(([b, nama]) => (
            <div key={b} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
              <Bangun jenis={b} isi={WARNA_GOLONGAN.segitiga} kelas="mx-auto h-14 w-14" />
              <p className="text-xs font-black text-[#1C01A5]">{nama}</p>
              <p className="text-lg font-black text-[#166534]">3 sisi</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="SEGI EMPAT, UKURAN BEDA"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Segi empat juga punya banyak rupa. Ada yang sisinya sama panjang. Ada yang panjang dan pendek. Ada yang berdiri tegak. Ada yang miring seperti belah ketupat. Semuanya punya empat sisi dan empat sudut, jadi semuanya segi empat."
      >
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {(
            [
              ["persegi", "Sama sisi"],
              ["persegiPanjang", "Panjang"],
              ["persegiPanjangTegak", "Tegak"],
              ["belahKetupat", "Miring"],
            ] as [JenisBangun, string][]
          ).map(([b, nama]) => (
            <div key={b} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-2">
              <Bangun jenis={b} isi={WARNA_GOLONGAN.segiempat} kelas="mx-auto h-12 w-12" />
              <p className="text-[11px] font-black leading-tight text-[#1C01A5]">{nama}</p>
              <p className="text-base font-black text-[#166534]">4 sisi</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="BENDA DAN BENTUKNYA"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Tabel benda dan bentuknya. Bentuk lengkung: donat, piring, telur, melon, jam dinding, dan bola. Segitiga: irisan semangka, kue risol, penggaris segitiga, kue lupis, dan tenda. Segi empat: kue lapis, jendela, pintu, buku, bingkai foto, dan bendera."
      >
        <div className="space-y-2">
          {GOLONGAN_URUT.map((g) => (
            <div key={g} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <p className="mb-1 inline-block rounded-full border-2 border-[#1C01A5] px-2 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: WARNA_GOLONGAN[g] }}>
                {NAMA_PENDEK[g]}
              </p>
              <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-1">
                {CONTOH[g].map((j) => (
                  <span key={j} className="flex w-14 flex-col items-center">
                    <Benda jenis={j} kelas="h-10 w-10" />
                    <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">{DAFTAR_BENDA[j].nama}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="CARA MENDESKRIPSIKAN BENDA"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Cara mendeskripsikan benda ada empat langkah. Lihat bendanya. Raba tepinya. Hitung sisi dan sudutnya. Lalu sebut bentuknya. Contohnya: Jendela berbentuk segi empat. Jendela punya empat sisi lurus dan empat sudut."
      >
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {[
            ["👀", "Lihat"],
            ["☝️", "Raba"],
            ["🔢", "Hitung"],
            ["🗣️", "Sebut"],
          ].map(([ikon, nama]) => (
            <div key={nama} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
              <p className="text-2xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-xs font-black text-[#1C01A5]">{nama}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border-4 border-dashed border-[#0F766E] bg-[#F0FDFA] px-2 py-2">
          <Benda jenis="jendela" kelas="h-12 w-12" />
          <p className="text-sm font-black leading-snug text-[#134E4A]">
            Jendela berbentuk <span className="rounded bg-[#7FCB96] px-1">segi empat</span>. Jendela punya{" "}
            <span className="rounded bg-[#FFE566] px-1">4</span> sisi lurus dan <span className="rounded bg-[#FFE566] px-1">4</span> sudut.
          </p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="KUE TRADISIONAL KITA"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Tahukah kamu? Kue tradisional Indonesia punya bentuk yang berbeda-beda. Kue lupis berbentuk segitiga. Kue lapis berbentuk segi empat. Kue cucur bulat, jadi bentuknya lengkung. Kue apa saja yang ada di daerahmu? Tanyakan pada Ibu atau Nenek."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Benda jenis="lupis" kelas="mx-auto h-12 w-12" />
            <p className="text-xs font-black text-[#1C01A5]">Kue lupis</p>
            <p className="text-xs font-black text-[#B91C1C]">segitiga</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Benda jenis="lapis" kelas="mx-auto h-12 w-12" />
            <p className="text-xs font-black text-[#1C01A5]">Kue lapis</p>
            <p className="text-xs font-black text-[#166534]">segi empat</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <Bangun jenis="bulat" isi="#E7B16A" kelas="mx-auto h-12 w-12" label="Kue cucur yang bulat" />
            <p className="text-xs font-black text-[#1C01A5]">Kue cucur</p>
            <p className="text-xs font-black text-[#A16207]">lengkung</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="BERMAIN BENTUK DENGAN TUBUH"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Ayo bermain bentuk dengan tubuh. Berdiri melingkar bersama teman membentuk bentuk lengkung. Dua tangan di atas kepala bertemu seperti atap membentuk segitiga. Jari-jari membentuk bingkai membentuk segi empat. Lalu cari benda di rumahmu yang bentuknya sama."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ["🤝", "Melingkar", "lengkung"],
            ["🙌", "Atap", "segitiga"],
            ["🖼️", "Bingkai jari", "segi empat"],
          ].map(([ikon, nama, bentuk]) => (
            <div key={nama} className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
              <p className="text-3xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-xs font-black text-[#1C01A5]">{nama}</p>
              <p className="text-xs font-black text-[#4338CA]">{bentuk}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_A4.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="igil-tanpa-tepi space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-lg font-black text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete. Benda nyata. Seret, cari, tebak, dan bentangkan karet.  */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 1. Keranjang Tiga Bentuk (hlm. 117-119) -------------- */

const RONDE_KERANJANG: JenisBenda[][] = [
  ["donat", "semangka", "lapis", "telur", "risol", "buku"],
  ["jam", "tenda", "pintu", "piring", "penggaris", "jendela", "melon", "bingkai", "bendera"],
];

const WARNA_KERANJANG: Record<Golongan, string> = {
  lengkung: "#FFF7CC",
  segitiga: "#FDECEC",
  segiempat: "#E8F7EE",
};

function RondeKeranjang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const awal = RONDE_KERANJANG[ronde];
  const akhir = ronde === RONDE_KERANJANG.length - 1;
  const [sisa, setSisa] = useState<JenisBenda[]>(awal);
  const [isi, setIsi] = useState<Record<Golongan, JenisBenda[]>>({ lengkung: [], segitiga: [], segiempat: [] });
  const [terpilih, setTerpilih] = useState<JenisBenda | null>(null);
  const [keliru, setKeliru] = useState<JenisBenda | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = sisa.length === 0;
  const suara = panel.suara["a4-keranjang"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Semua benda sudah masuk keranjang. Keranjang lengkung berisi ${kataK(isi.lengkung.length)}. Keranjang segitiga berisi ${kataK(isi.segitiga.length)}. Keranjang segi empat berisi ${kataK(isi.segiempat.length)}.`
  );

  const taruh = (j: JenisBenda, g: Golongan) => {
    if (!sisa.includes(j)) return;
    if (DAFTAR_BENDA[j].golongan !== g) {
      setKeliru(j);
      setTerpilih(null);
      setKabar({ teks: petunjukBenda(j), ok: false });
      return;
    }
    const baru = sisa.filter((x) => x !== j);
    setSisa(baru);
    setIsi({ ...isi, [g]: [...isi[g], j] });
    setTerpilih(null);
    setKeliru(null);
    setKabar(null);
    ucap(ucapBenda(j));
    if (baru.length === 0) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: isi keranjang lengkung" : "Masukkan benda ke keranjang"}
        teks="Ada beberapa benda di meja. Seret setiap benda ke keranjang yang bentuknya sama, atau ketuk bendanya lalu ketuk keranjangnya. Ada tiga keranjang: lengkung, segitiga, dan segi empat. Setelah semua benda masuk, ucapkan berapa banyak benda di keranjang lengkung."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[104px] flex-wrap items-end justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {sisa.map((j) => (
            <BendaSeret
              key={j}
              id={j}
              aktif={!beres}
              label={DAFTAR_BENDA[j].nama}
              onKetuk={() => {
                setTerpilih(j);
                ucap(DAFTAR_BENDA[j].nama);
              }}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("k4-")) taruh(j, z.slice(3) as Golongan);
              }}
              kelas="rounded-2xl"
            >
              <span
                key={`${j}-${keliru === j ? "x" : "o"}`}
                className={`flex w-[68px] flex-col items-center rounded-2xl px-1 py-1 ${terpilih === j ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${keliru === j ? "igil-goyang" : ""}`}
              >
                <Benda jenis={j} kelas="h-14 w-14" />
                <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">{DAFTAR_BENDA[j].nama}</span>
              </span>
            </BendaSeret>
          ))}
          {beres ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {GOLONGAN_URUT.map((g) => (
            <button
              key={g}
              type="button"
              data-zona={`k4-${g}`}
              aria-label={`Keranjang ${NAMA_GOLONGAN[g]}, berisi ${isi[g].length}`}
              onClick={() => {
                if (terpilih) taruh(terpilih, g);
                else ucap(`Keranjang ${NAMA_GOLONGAN[g]}.`);
              }}
              className="igil-tanpa-tepi flex min-h-[124px] flex-col items-center gap-1 rounded-3xl border-4 border-[#1C01A5] px-1 py-2"
              style={{ backgroundColor: WARNA_KERANJANG[g] }}
            >
              <span className="text-2xl" aria-hidden="true">
                🧺
              </span>
              <span className="text-sm font-black leading-tight text-[#1C01A5]">{NAMA_PENDEK[g]}</span>
              <span className="flex flex-wrap justify-center gap-0.5">
                {isi[g].map((j) => (
                  <span key={j} className="igil-muncul">
                    <Benda jenis={j} kelas="h-7 w-7" />
                  </span>
                ))}
              </span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-xs font-black text-[#1C01A5]">{isi[g].length}</span>
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKeranjang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Keranjang Tiga Bentuk"
      warna="#FFE566"
      petunjuk="Seret setiap benda ke keranjang yang bentuknya sama. Ada keranjang lengkung, segitiga, dan segi empat. Kalau bingung, raba tepinya dan hitung pojoknya. Setelah semua masuk, ucapkan berapa benda di keranjang lengkung."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-keranjang"
      jumlahRonde={RONDE_KERANJANG.length}
      kunciAkhir={3}
      belumSiap="Masukkan semua benda ke keranjang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKeranjang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Berburu Bentuk di Kamar (hlm. 119, 122) ------------ */

type ItemKamar = { j: JenisBenda; x: number; y: number; w: number };

const ISI_KAMAR: ItemKamar[] = [
  { j: "jendela", x: 14, y: 14, w: 58 },
  { j: "jam", x: 116, y: 6, w: 44 },
  { j: "pintu", x: 238, y: 30, w: 58 },
  { j: "bingkai", x: 80, y: 52, w: 40 },
  { j: "piring", x: 74, y: 88, w: 38 },
  { j: "semangka", x: 114, y: 88, w: 38 },
  { j: "telur", x: 148, y: 94, w: 30 },
  { j: "tenda", x: 186, y: 112, w: 46 },
  { j: "penggaris", x: 238, y: 124, w: 42 },
  { j: "buku", x: 14, y: 126, w: 40 },
];

const RONDE_BURU: Golongan[] = ["lengkung", "segitiga", "segiempat"];

function RondeBuru({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const sasaran = RONDE_BURU[ronde];
  const akhir = ronde === RONDE_BURU.length - 1;
  const target = ISI_KAMAR.filter((i) => DAFTAR_BENDA[i.j].golongan === sasaran);
  const [ketemu, setKetemu] = useState<JenisBenda[]>([]);
  const [goyang, setGoyang] = useState<JenisBenda | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = ketemu.length === target.length;
  const suara = panel.suara["a4-buru"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Kamu menemukan ${kataK(target.length)} benda ${NAMA_GOLONGAN[sasaran]}: ${target.map((t) => DAFTAR_BENDA[t.j].nama.toLowerCase()).join(", ")}.`
  );

  const ketuk = (j: JenisBenda) => {
    if (beres || ketemu.includes(j)) return;
    if (DAFTAR_BENDA[j].golongan === sasaran) {
      const baru = [...ketemu, j];
      setKetemu(baru);
      setGoyang(null);
      setKabar(null);
      ucap(DAFTAR_BENDA[j].nama);
      if (baru.length === target.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang(j);
      setKabar({ teks: petunjukBenda(j), ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: benda segi empat" : "Semua ketemu!") : `Cari benda ${NAMA_GOLONGAN[sasaran]}`}
        teks={`Ayo berburu bentuk di kamar. Ketuk semua benda yang berbentuk ${NAMA_GOLONGAN[sasaran]}. ${
          akhir ? "Setelah semua ketemu, ucapkan berapa banyak benda segi empat yang kamu temukan." : "Ketuk semua yang kamu temukan."
        }`}
      />
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] px-3 py-1 text-sm font-black text-[#1C01A5]" style={{ backgroundColor: WARNA_GOLONGAN[sasaran] }}>
            🔎 {NAMA_PENDEK[sasaran]}
          </span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-1 text-sm font-black text-[#1C01A5]">
            Ketemu {ketemu.length} dari {target.length}
          </span>
        </div>
        <svg viewBox="0 0 300 190" className="block h-auto w-full rounded-2xl border-4 border-[#1C01A5] bg-white" role="group" aria-label="Kamar Kira. Ketuk benda yang kamu temukan.">
          <rect x="0" y="0" width="300" height="190" fill="#FFF7E6" />
          <rect x="0" y="150" width="300" height="40" fill="#F3C98A" />
          <rect x="0" y="146" width="300" height="5" fill="#A8672D" />
          <rect x="66" y="122" width="116" height="8" rx="3" fill="#C98A4B" stroke="#1C01A5" strokeWidth="2" />
          <path d="M74 130 V168 M174 130 V168" stroke="#1C01A5" strokeWidth="3.4" strokeLinecap="round" />
          {ISI_KAMAR.map((it) => {
            const sudah = ketemu.includes(it.j);
            const salah = goyang === it.j;
            return (
              <g
                key={`${it.j}-${salah ? "x" : "o"}`}
                role="button"
                tabIndex={0}
                aria-label={`${DAFTAR_BENDA[it.j].nama}${sudah ? ", sudah ketemu" : ""}`}
                onClick={() => ketuk(it.j)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(it.j);
                  }
                }}
                className={salah ? "igil-goyang" : undefined}
                style={{ cursor: beres ? "default" : "pointer", ...(salah ? TENGAH : {}) }}
              >
                <rect x={it.x - 2} y={it.y - 2} width={it.w + 4} height={it.w + 4} fill="transparent" />
                <BendaDi jenis={it.j} x={it.x} y={it.y} w={it.w} />
                {sudah ? (
                  <g className="igil-muncul">
                    <circle cx={it.x + it.w - 4} cy={it.y + 6} r="9" fill="#7FCB96" stroke="#1C01A5" strokeWidth="2" />
                    <path d={`M${it.x + it.w - 8} ${it.y + 6} l3 3 l6 -7`} fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahBuru({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Berburu Bentuk di Kamar"
      warna="#BBF7D0"
      petunjuk="Lihat kamar Kira. Ketuk semua benda yang bentuknya sama dengan yang diminta. Ronde pertama lengkung, kedua segitiga, ketiga segi empat. Setelah ronde terakhir, ucapkan berapa banyak benda segi empat yang ketemu."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-buru"
      jumlahRonde={RONDE_BURU.length}
      kunciAkhir={ISI_KAMAR.filter((i) => DAFTAR_BENDA[i.j].golongan === "segiempat").length}
      belumSiap="Temukan semua bendanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBuru ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Bayangan Siapa Ini? (hlm. 117-119) ---------------- */

const RONDE_BAYANGAN: JenisBenda[] = ["jam", "lupis", "pintu", "telur"];

function RondeBayangan({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const j = RONDE_BAYANGAN[ronde];
  const benar = DAFTAR_BENDA[j].golongan;
  const [selesai, setSelesai] = useState(false);
  const [keliru, setKeliru] = useState<Golongan | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  useBicara(selesai, ucapBenda(j));

  const pilih = (g: Golongan) => {
    if (selesai) return;
    if (g === benar) {
      setSelesai(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(g);
      setKabar({ teks: `Lihat garis tepi bayangannya. ${petunjukBenda(j)}`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={selesai ? "Hebat!" : "Bayangan siapa ini?"}
        teks="Ada bayangan hitam sebuah benda. Perhatikan garis tepinya. Apakah melengkung, atau punya pojok? Pilih nama bentuk bayangan itu."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC]">
          {selesai ? (
            <span className="igil-muncul">
              <Benda jenis={j} kelas="h-28 w-28" />
            </span>
          ) : (
            <Benda jenis={j} kelas="h-28 w-28" bayangan />
          )}
        </div>
        <p className="text-center text-lg font-black text-[#1C01A5]">{selesai ? `${DAFTAR_BENDA[j].nama} berbentuk ${NAMA_GOLONGAN[benar]}` : "❓ Bayangan benda"}</p>
        <PilihNama onPilih={pilih} keliru={keliru} mati={selesai} />
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahBayangan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bayangan Siapa Ini?"
      warna="#C7D2FE"
      petunjuk="Ada bayangan hitam sebuah benda. Lihat garis tepinya, lalu pilih nama bentuknya. Kalau benar, bendanya muncul berwarna."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-bayangan"
      jumlahRonde={RONDE_BAYANGAN.length}
      belumSiap=""
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBayangan ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Papan Paku dan Karet Gelang (hlm. 120) ------------ */

type Titik2 = { x: number; y: number };
const JARAK_PAKU = 40;
const TEPI_PAKU = 20;
const titikPaku = (i: number): Titik2 => ({ x: TEPI_PAKU + (i % 5) * JARAK_PAKU, y: TEPI_PAKU + Math.floor(i / 5) * JARAK_PAKU });

const orientasi = (p: Titik2, q: Titik2, r: Titik2) => (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);

function berpotongan(a: Titik2, b: Titik2, c: Titik2, d: Titik2) {
  const d1 = orientasi(c, d, a);
  const d2 = orientasi(c, d, b);
  const d3 = orientasi(a, b, c);
  const d4 = orientasi(a, b, d);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

/** Karet gelang yang dibentangkan harus membentuk bentuk tertutup tanpa garis lurus tunggal dan tanpa bersilang. */
function periksaKaret(indeks: number[]): "ok" | "lurus" | "silang" {
  const p = indeks.map(titikPaku);
  const n = p.length;
  for (let i = 0; i < n; i++) {
    if (orientasi(p[i], p[(i + 1) % n], p[(i + 2) % n]) === 0) return "lurus";
  }
  if (n === 4 && (berpotongan(p[0], p[1], p[2], p[3]) || berpotongan(p[1], p[2], p[3], p[0]))) return "silang";
  return "ok";
}

const RONDE_PAKU = [
  { sisi: 3, nama: "segitiga", g: "segitiga" as Golongan },
  { sisi: 4, nama: "segi empat", g: "segiempat" as Golongan },
];

function RondePaku({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_PAKU[ronde];
  const akhir = ronde === RONDE_PAKU.length - 1;
  const [pilih, setPilih] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [sah, setSah] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a4-paku"] === true && akhir;
  useBicara(
    akhir ? suara : sah,
    `Karet gelang membentuk ${d.nama}. Hitung sisinya: ${kataK(d.sisi)}. Hitung sudutnya, yaitu pojok yang diikat paku: ${kataK(d.sisi)}.`
  );

  const ketuk = (i: number) => {
    if (sah || pilih.includes(i) || pilih.length >= d.sisi) return;
    const baru = [...pilih, i];
    setPilih(baru);
    setKabar(null);
    if (baru.length === d.sisi) {
      const hasil = periksaKaret(baru);
      if (hasil === "ok") {
        setSah(true);
        letusan.picu();
        onBeres();
      } else if (hasil === "lurus") {
        setKabar({ teks: "Tiga paku berurutan itu segaris, jadi karet tidak membentuk pojok. Pilih paku lain.", ok: false });
      } else {
        setKabar({ teks: "Karetnya bersilang. Pilih paku mengelilingi bentuknya, jangan melompat ke seberang.", ok: false });
      }
    }
  };

  const penuh = pilih.length === d.sisi;
  const titik = pilih.map(titikPaku);
  const garis = titik.map((t) => `${t.x},${t.y}`).join(" ");

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : sah ? (akhir ? "Ucapkan: banyak sudut" : "Karetmu pas!") : `Buat ${d.nama} dengan karet`}
        teks={`Ini papan paku. Ketuk ${kataK(d.sisi)} paku satu per satu, berurutan mengelilingi bentuk. Karet gelang akan terbentang. Buatlah ${d.nama}.${
          akhir ? " Setelah itu ucapkan berapa sudut yang ada pada segi empat." : ""
        }`}
      />
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Paku dipilih {pilih.length} dari {d.sisi}
        </p>
        <svg viewBox="0 0 200 200" className="mx-auto block h-auto w-full max-w-[280px] rounded-2xl border-4 border-[#1C01A5]" role="group" aria-label={`Papan paku untuk membuat ${d.nama}`}>
          <rect x="0" y="0" width="200" height="200" fill="#E3B67A" />
          <path d="M0 40 H200 M0 80 H200 M0 120 H200 M0 160 H200" stroke="#C98A4B" strokeWidth="1.2" opacity="0.5" />
          {pilih.length >= 2 ? (
            penuh ? (
              <polygon points={garis} fill={sah ? "rgba(225,29,72,0.18)" : "none"} stroke="#E11D48" strokeWidth="4" strokeLinejoin="round" />
            ) : (
              <polyline points={garis} fill="none" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            )
          ) : null}
          {Array.from({ length: 25 }, (_, i) => {
            const t = titikPaku(i);
            const urut = pilih.indexOf(i);
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`Paku baris ${Math.floor(i / 5) + 1} kolom ${(i % 5) + 1}${urut >= 0 ? `, dipilih ke-${urut + 1}` : ""}`}
                onClick={() => ketuk(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(i);
                  }
                }}
                style={{ cursor: sah ? "default" : "pointer" }}
              >
                <circle cx={t.x} cy={t.y} r="16" fill="transparent" />
                <circle cx={t.x} cy={t.y} r={urut >= 0 ? 8 : 4.6} fill={urut >= 0 ? "#F0AB00" : "#F3F4F6"} stroke="#1C01A5" strokeWidth="2" />
                {urut >= 0 ? (
                  <text x={t.x} y={t.y + 3.6} textAnchor="middle" fontSize="10" fontWeight="900" fill="#1C01A5">
                    {urut + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        {penuh && !sah ? (
          <button
            type="button"
            onClick={() => {
              setPilih([]);
              setKabar(null);
            }}
            className={TOMBOL_KECIL}
          >
            ↩ Ulangi
          </button>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahPaku({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Papan Paku dan Karet Gelang"
      warna="#FDE68A"
      petunjuk="Ini papan paku. Ketuk paku satu per satu, berurutan mengelilingi bentuk, sampai karet gelang membentuk segitiga. Lalu coba segi empat. Karet lurus tidak bisa melengkung. Terakhir, ucapkan berapa sudut pada segi empat."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-paku"
      jumlahRonde={RONDE_PAKU.length}
      kunciAkhir={4}
      belumSiap="Bentangkan karet segi empat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePaku ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

type TipeConcrete = "keranjang" | "buru" | "bayangan" | "paku";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "keranjang" },
  { nomor: 2, tipe: "buru" },
  { nomor: 3, tipe: "bayangan" },
  { nomor: 4, tipe: "paku" },
];

export function ConcreteBentukA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, seret, dan cari!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "keranjang" ? <LangkahKeranjang {...dasar} /> : null}
        {langkah.tipe === "buru" ? <LangkahBuru {...dasar} /> : null}
        {langkah.tipe === "bayangan" ? <LangkahBayangan {...dasar} /> : null}
        {langkah.tipe === "paku" ? <LangkahPaku {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Bentuk polos saja. Tidak ada gambar benda.               */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Warnai Menurut Nama (hlm. 121-122) ---------------- */

const RONDE_WARNAI: JenisBangun[][] = [
  ["bulat", "segitiga", "persegiPanjang", "lonjong", "segitigaTerbalik", "persegi"],
  [
    "lonjong",
    "segitigaSiku",
    "belahKetupat",
    "bulat",
    "segitigaTerbalik",
    "persegiPanjangTegak",
    "bulat",
    "segitiga",
    "persegi",
    "persegiPanjang",
  ],
];

const WARNA_KRAYON: Record<Golongan, string> = WARNA_GOLONGAN;
const NAMA_WARNA: Record<Golongan, string> = { lengkung: "kuning", segitiga: "merah muda", segiempat: "hijau" };

function RondeWarnai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const daftar = RONDE_WARNAI[ronde];
  const akhir = ronde === RONDE_WARNAI.length - 1;
  const [krayon, setKrayon] = useState<Golongan | null>(null);
  const [warna, setWarna] = useState<(Golongan | null)[]>(() => daftar.map(() => null));
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlahSegitiga = daftar.filter((b) => GOLONGAN_BANGUN[b] === "segitiga").length;
  const beres = warna.every((w) => w !== null);
  const suara = panel.suara["a4-warnai"] === true && akhir;
  useBicara(akhir ? suara : beres, `Semua bentuk sudah diwarnai. Ada ${kataK(jumlahSegitiga)} segitiga berwarna merah muda.`);

  const ketuk = (i: number) => {
    if (beres || warna[i]) return;
    if (!krayon) {
      setKabar({ teks: "Pilih krayonnya dulu, ya.", ok: false });
      return;
    }
    if (GOLONGAN_BANGUN[daftar[i]] !== krayon) {
      setGoyang(i);
      setKabar({ teks: petunjukBangun(daftar[i]), ok: false });
      return;
    }
    const baru = warna.slice();
    baru[i] = krayon;
    setWarna(baru);
    setGoyang(null);
    setKabar(null);
    if (baru.every((w) => w !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak segitiga" : "Semua sudah berwarna") : "Pilih krayon, lalu warnai"}
        teks={`Kuning untuk bentuk lengkung. Merah muda untuk segitiga. Hijau untuk segi empat. Ketuk krayon, lalu ketuk bentuk yang cocok untuk mewarnainya.${
          akhir ? " Setelah selesai, ucapkan berapa banyak segitiga merah muda." : ""
        }`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-3 gap-2">
          {GOLONGAN_URUT.map((g) => (
            <button
              key={g}
              type="button"
              aria-label={`Krayon ${NAMA_WARNA[g]} untuk ${NAMA_GOLONGAN[g]}`}
              aria-pressed={krayon === g}
              onClick={() => {
                setKrayon(g);
                setKabar(null);
              }}
              className={`igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5 ${krayon === g ? "ring-4 ring-[#F0AB00]" : ""}`}
            >
              <span className="block h-6 w-12 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_KRAYON[g] }} />
              <span className="text-xs font-black leading-tight text-[#1C01A5]">{NAMA_PENDEK[g]}</span>
            </button>
          ))}
        </div>
        <div className={`grid gap-2 ${daftar.length > 6 ? "grid-cols-5" : "grid-cols-3"}`}>
          {daftar.map((b, i) => (
            <button
              key={`${i}-${goyang === i ? "x" : "o"}`}
              type="button"
              aria-label={`Bentuk ke-${i + 1}${warna[i] ? ", sudah diwarnai" : ""}`}
              onClick={() => ketuk(i)}
              className={`igil-tanpa-tepi flex items-center justify-center rounded-2xl border-4 border-dashed border-[#6B7280]/50 bg-white py-2 ${goyang === i ? "igil-goyang" : ""}`}
            >
              <Bangun jenis={b} isi={warna[i] ? WARNA_KRAYON[warna[i] as Golongan] : "#FFFFFF"} kelas={daftar.length > 6 ? "h-12 w-12" : "h-16 w-16"} />
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuWarnai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Menurut Nama"
      warna="#FDE68A"
      petunjuk="Pilih krayon. Kuning untuk bentuk lengkung, merah muda untuk segitiga, hijau untuk segi empat. Ketuk bentuk yang cocok untuk mewarnainya. Ingat, bentuk yang miring atau terbalik tetap sama namanya. Terakhir, ucapkan berapa banyak segitiga merah muda."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-warnai"
      jumlahRonde={RONDE_WARNAI.length}
      kunciAkhir={RONDE_WARNAI[1].filter((b) => GOLONGAN_BANGUN[b] === "segitiga").length}
      belumSiap="Warnai semua bentuknya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarnai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tabel Tally Bentuk (hlm. 122) --------------------- */

const RONDE_TALLY: JenisBangun[][] = [
  ["bulat", "segitiga", "persegi", "segitigaTerbalik", "lonjong", "persegiPanjang", "segitigaSiku"],
  ["segitiga", "bulat", "persegiPanjang", "persegi", "segitigaTerbalik", "bulat", "belahKetupat", "segitigaSiku", "persegiPanjangTegak"],
];

const TINTA = "#1C01A5";

/** Goresan tally: empat garis tegak, goresan kelima mencoret. */
function GoresanTally({ n }: { n: number }) {
  const grup = Math.max(1, Math.ceil(n / 5));
  return (
    <svg viewBox={`0 0 ${grup * 40} 36`} className="h-9 shrink-0" style={{ width: grup * 34 }} role="img" aria-label={`${n} goresan tally`}>
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const k = i % 5;
        const gx = g * 40 + 4;
        return k < 4 ? (
          <line key={i} x1={gx + 4 + k * 8} y1={4} x2={gx + 4 + k * 8} y2={32} stroke={TINTA} strokeWidth={3.4} strokeLinecap="round" />
        ) : (
          <line key={i} x1={gx} y1={28} x2={gx + 34} y2={8} stroke="#E11D48" strokeWidth={3.4} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

function RondeTally({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const daftar = RONDE_TALLY[ronde];
  const akhir = ronde === RONDE_TALLY.length - 1;
  const benar: Record<Golongan, number> = {
    lengkung: daftar.filter((b) => GOLONGAN_BANGUN[b] === "lengkung").length,
    segitiga: daftar.filter((b) => GOLONGAN_BANGUN[b] === "segitiga").length,
    segiempat: daftar.filter((b) => GOLONGAN_BANGUN[b] === "segiempat").length,
  };
  const [tanda, setTanda] = useState<boolean[]>(() => daftar.map(() => false));
  const [tally, setTally] = useState<Record<Golongan, number>>({ lengkung: 0, segitiga: 0, segiempat: 0 });
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = GOLONGAN_URUT.every((g) => tally[g] === benar[g]);
  const suara = panel.suara["a4-tally"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Hasil hitunganmu: bentuk lengkung ${kataK(benar.lengkung)}, segitiga ${kataK(benar.segitiga)}, segi empat ${kataK(benar.segiempat)}. Semuanya ada ${kataK(daftar.length)} bentuk.`
  );

  const ubah = (g: Golongan, d: 1 | -1) => {
    if (beres) return;
    const n = Math.max(0, Math.min(10, tally[g] + d));
    if (n === tally[g]) return;
    const baru = { ...tally, [g]: n };
    setTally(baru);
    if (GOLONGAN_URUT.every((k) => baru[k] === benar[k])) {
      setKabar(null);
      letusan.picu();
      onBeres();
    } else if (d === 1 && n > benar[g]) {
      setKabar({ teks: "Goresanmu lebih banyak dari bentuknya. Hitung lagi dengan menandai bentuk satu per satu.", ok: false });
    } else {
      setKabar(null);
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlah semua bentuk" : "Tabelmu pas!") : "Hitung, lalu catat dengan goresan"}
        teks={`Ketuk setiap bentuk untuk menandainya sambil menghitung. Lalu tekan tombol tambah di tabel untuk membuat goresan tally, satu goresan untuk satu bentuk.${
          akhir ? " Setelah tabel pas, ucapkan berapa banyak bentuk semuanya." : ""
        }`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-4 gap-1.5">
          {daftar.map((b, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Bentuk ke-${i + 1}${tanda[i] ? ", sudah ditandai" : ""}`}
              onClick={() => {
                const baru = tanda.slice();
                baru[i] = !baru[i];
                setTanda(baru);
              }}
              className={`igil-tanpa-tepi relative flex items-center justify-center rounded-xl border-4 bg-white py-1.5 ${tanda[i] ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#6B7280]/40"}`}
            >
              <Bangun jenis={b} isi="#E5E7EB" kelas="h-11 w-11" />
              {tanda[i] ? (
                <span className="igil-muncul absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#7FCB96] text-xs font-black text-[#1C01A5]">
                  ✓
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="px-2 py-1 text-left text-xs">Bentuk</th>
                <th className="px-1 py-1 text-xs">Goresan</th>
                <th className="px-1 py-1 text-xs">Ubah</th>
              </tr>
            </thead>
            <tbody>
              {GOLONGAN_URUT.map((g) => {
                const pas = tally[g] === benar[g];
                return (
                  <tr key={g} className="border-t-2 border-[#1C01A5]/20" style={{ backgroundColor: pas ? "#E8F7EE" : undefined }}>
                    <td className="px-2 py-1 text-xs">
                      <span className="flex items-center gap-1">
                        <Bangun jenis={g === "lengkung" ? "bulat" : g === "segitiga" ? "segitiga" : "persegi"} isi={WARNA_GOLONGAN[g]} tebal={4} kelas="h-7 w-7" />
                        {NAMA_PENDEK[g]}
                      </span>
                    </td>
                    <td className="min-w-[72px] px-1 py-1">{tally[g] > 0 ? <GoresanTally n={tally[g]} /> : <span className="text-xs text-[#1C01A5]/40">kosong</span>}</td>
                    <td className="px-1 py-1">
                      <span className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          aria-label={`Kurangi goresan ${NAMA_PENDEK[g]}`}
                          disabled={beres || tally[g] === 0}
                          onClick={() => ubah(g, -1)}
                          className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none disabled:opacity-40"
                        >
                          −
                        </button>
                        <button
                          type="button"
                          aria-label={`Tambah goresan ${NAMA_PENDEK[g]}`}
                          disabled={beres}
                          onClick={() => ubah(g, 1)}
                          className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none disabled:opacity-40"
                        >
                          +
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTally({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tabel Tally Bentuk"
      warna="#FDE68A"
      petunjuk="Hitung bentuk satu per satu. Ketuk bentuk untuk menandainya supaya tidak terhitung dua kali. Lalu catat dengan goresan tally di tabel. Terakhir, ucapkan berapa banyak bentuk semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-tally"
      jumlahRonde={RONDE_TALLY.length}
      kunciAkhir={RONDE_TALLY[1].length}
      belumSiap="Lengkapi tabel tally dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTally ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Hubungkan Garis Putus-putus (hlm. 121) ------------ */

function busur(): string[] {
  const hasil: string[] = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3 - Math.PI / 2;
    const b = ((k + 1) * Math.PI) / 3 - Math.PI / 2;
    const x1 = (32 + 26 * Math.cos(a)).toFixed(2);
    const y1 = (32 + 26 * Math.sin(a)).toFixed(2);
    const x2 = (32 + 26 * Math.cos(b)).toFixed(2);
    const y2 = (32 + 26 * Math.sin(b)).toFixed(2);
    hasil.push(`M${x1} ${y1} A26 26 0 0 1 ${x2} ${y2}`);
  }
  return hasil;
}

const RONDE_TITIK: { g: Golongan; nama: string; segmen: string[]; lurus: number }[] = [
  { g: "lengkung", nama: "lengkung", segmen: busur(), lurus: 0 },
  {
    g: "segiempat",
    nama: "segi empat",
    segmen: ["M4 16 H60", "M60 16 V48", "M60 48 H4", "M4 48 V16"],
    lurus: 4,
  },
  {
    g: "segitiga",
    nama: "segitiga",
    segmen: ["M32 6 L60 56", "M60 56 L4 56", "M4 56 L32 6"],
    lurus: 3,
  },
];

function RondeTitik({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TITIK[ronde];
  const akhir = ronde === RONDE_TITIK.length - 1;
  const [jadi, setJadi] = useState<boolean[]>(() => d.segmen.map(() => false));
  const [keliru, setKeliru] = useState<Golongan | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const tersambung = jadi.every(Boolean);
  const suara = panel.suara["a4-titik"] === true && akhir;
  useBicara(
    akhir ? suara : selesai,
    d.lurus === 0
      ? "Garis yang kamu sambung melengkung terus. Itu bentuk lengkung. Tidak ada garis lurus dan tidak ada sudut."
      : `Kamu menyambung ${kataK(d.lurus)} garis lurus. Itu ${d.nama}. Ada ${kataK(d.lurus)} sisi dan ${kataK(d.lurus)} sudut.`
  );

  const sambung = (i: number) => {
    if (jadi[i] || selesai) return;
    const baru = jadi.slice();
    baru[i] = true;
    setJadi(baru);
  };
  const pilih = (g: Golongan) => {
    if (selesai || !tersambung) return;
    if (g === d.g) {
      setSelesai(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(g);
      setKabar({ teks: d.lurus === 0 ? "Telusuri garis yang kamu buat. Ada pojok atau tidak?" : `Hitung garis lurus yang kamu sambung. Ada ${kataK(d.lurus)}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : selesai ? (akhir ? "Ucapkan: banyak garis lurus" : "Namanya tepat!") : tersambung ? "Sebut nama bentuknya" : "Sambung garis putus-putusnya"}
        teks={`Ketuk setiap garis putus-putus supaya tersambung. Setelah bentuknya utuh, pilih namanya.${akhir ? " Terakhir, ucapkan berapa garis lurus yang kamu sambung." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 64 64" className="mx-auto block h-44 w-44 rounded-2xl border-4 border-[#1C01A5]/30 bg-white" role="group" aria-label="Garis putus-putus yang harus disambung">
          {d.segmen.map((p, i) => (
            <g
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Garis putus-putus ke-${i + 1}${jadi[i] ? ", sudah tersambung" : ""}`}
              onClick={() => sambung(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  sambung(i);
                }
              }}
              style={{ cursor: jadi[i] || selesai ? "default" : "pointer" }}
            >
              <path d={p} fill="none" stroke="transparent" strokeWidth="14" strokeLinecap="round" />
              <path
                d={p}
                fill="none"
                stroke={jadi[i] ? TINTA : "#9CA3AF"}
                strokeWidth={jadi[i] ? 3.4 : 2.4}
                strokeDasharray={jadi[i] ? undefined : "3 4"}
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Tersambung {jadi.filter(Boolean).length} dari {d.segmen.length}
        </p>
        {tersambung ? <PilihNama onPilih={pilih} keliru={keliru} mati={selesai} /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTitik({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hubungkan Garis Putus-putus"
      warna="#FDE68A"
      petunjuk="Ketuk garis putus-putus supaya tersambung. Setelah bentuknya utuh, pilih namanya. Ada tiga bentuk: lengkung, segi empat, dan segitiga. Terakhir, ucapkan berapa garis lurus pada segitiga."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-titik"
      jumlahRonde={RONDE_TITIK.length}
      kunciAkhir={3}
      belumSiap="Sambung garisnya dan sebut namanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTitik ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

type TipePicture = "warnai" | "tally" | "titik";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "warnai" },
  { nomor: 6, tipe: "tally" },
  { nomor: 7, tipe: "titik" },
];

export function PictureBentukA(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat bentuk dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "warnai" ? <KartuWarnai {...dasar} /> : null}
        {kartu.tipe === "tally" ? <KartuTally {...dasar} /> : null}
        {kartu.tipe === "titik" ? <KartuTitik {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

const TULIS_CIRI: Record<Golongan, string> = {
  lengkung: "tepi melengkung • 0 sudut",
  segitiga: "3 sisi lurus • 3 sudut",
  segiempat: "4 sisi lurus • 4 sudut",
};

/* --------- Permainan 8. Kartu Ciri-ciri (hlm. 122-123) -------------------- */

type SoalCiri = { tipe: "nama"; g: Golongan } | { tipe: "ciri"; g: Golongan; urut: Golongan[] };

const RONDE_CIRI: SoalCiri[] = [
  { tipe: "nama", g: "segitiga" },
  { tipe: "nama", g: "lengkung" },
  { tipe: "nama", g: "segiempat" },
  { tipe: "ciri", g: "segiempat", urut: ["lengkung", "segiempat", "segitiga"] },
];

function RondeCiri({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_CIRI[ronde];
  const akhir = ronde === RONDE_CIRI.length - 1;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<Golongan | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["a4-ciri"] === true && akhir;
  useBicara(akhir ? suara : benar, `${NAMA_PENDEK[s.g]}: ${TULIS_CIRI[s.g].replace("•", "dan").replace("0 sudut", "nol sudut")}.`);

  const pilih = (g: Golongan) => {
    if (benar) return;
    if (g === s.g) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(g);
      setKabar({ teks: "Belum cocok. Hitung sisi dan sudutnya sekali lagi, ya.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat! Ucapkan jawabannya." : benar ? (akhir ? "Ucapkan: sisi lurus bentuk lengkung" : "Kartunya cocok!") : s.tipe === "nama" ? "Siapa pemilik kartu ciri ini?" : "Pilih kartu ciri yang cocok"}
        teks={
          s.tipe === "nama"
            ? "Baca kartu ciri-ciri. Lalu pilih nama bentuk yang punya ciri itu."
            : "Ada tiga kartu ciri-ciri. Pilih kartu yang cocok untuk segi empat."
        }
      />
      <div className={KERTAS_ANGKA}>
        {s.tipe === "nama" ? (
          <>
            <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-4 text-center text-2xl font-black leading-snug text-[#1C01A5]">
              {TULIS_CIRI[s.g]}
            </p>
            <PilihNama onPilih={pilih} keliru={keliru} mati={benar} />
          </>
        ) : (
          <>
            <p className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-center text-2xl font-black text-[#1C01A5]">{NAMA_GOLONGAN[s.g]}</p>
            <div className="space-y-2">
              {s.urut.map((g) => (
                <button
                  key={`${g}-${keliru === g ? "x" : "o"}`}
                  type="button"
                  aria-label={`Kartu ${TULIS_CIRI[g]}`}
                  disabled={benar}
                  onClick={() => pilih(g)}
                  className={`igil-tanpa-tepi block w-full rounded-2xl border-4 px-3 py-3 text-center text-xl font-black text-[#1C01A5] ${
                    benar && g === s.g ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"
                  } ${keliru === g ? "igil-goyang" : ""}`}
                >
                  {TULIS_CIRI[g]}
                </button>
              ))}
            </div>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuCiri({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kartu Ciri-ciri"
      warna="#C7D2FE"
      petunjuk="Baca kartu ciri-ciri, lalu jodohkan dengan nama bentuknya. Pada soal terakhir, kamu memilih kartu yang cocok. Setelah itu, ucapkan berapa sisi lurus pada bentuk lengkung."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-ciri"
      jumlahRonde={RONDE_CIRI.length}
      kunciAkhir={0}
      belumSiap="Jodohkan kartunya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCiri ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Bentuk Misterius ------------------------- */

const RONDE_DETEKTIF: { g: Golongan; petunjuk: string[] }[] = [
  { g: "segitiga", petunjuk: ["Aku punya 3 sudut."] },
  { g: "lengkung", petunjuk: ["Tepiku melengkung terus.", "Aku tidak punya sudut."] },
  { g: "segiempat", petunjuk: ["Aku punya 4 sisi lurus.", "Banyak sudutku sama dengan banyak sisiku."] },
  {
    g: "segitiga",
    petunjuk: [
      "Aku punya sisi lurus.",
      "Banyak sudutku sama dengan banyak sisiku.",
      "Sisiku paling sedikit di antara semua bentuk yang bersisi lurus.",
    ],
  },
];

function RondeDetektif({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_DETEKTIF[ronde];
  const akhir = ronde === RONDE_DETEKTIF.length - 1;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<Golongan | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["a4-detektif"] === true && akhir;
  useBicara(akhir ? suara : benar, `Kasus terpecahkan. Aku adalah ${NAMA_GOLONGAN[d.g]}.`);

  const pilih = (g: Golongan) => {
    if (benar) return;
    if (g === d.g) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(g);
      setKabar({ teks: "Belum tepat. Baca semua petunjuknya lagi, ya.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Kasus selesai! Ucapkan sudutnya." : benar ? (akhir ? "Ucapkan: banyak sudutku" : "Kasus terpecahkan!") : "Siapa aku?"}
        teks={`Baca petunjuknya. ${d.petunjuk.join(" ")} Siapa aku? Pilih nama bentuk yang tepat.${akhir ? " Setelah itu, ucapkan berapa banyak sudutku." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1.5 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-3">
          {d.petunjuk.map((p, i) => (
            <p key={p} className="text-lg font-black leading-snug text-[#1C01A5]">
              <span aria-hidden="true">🔍 </span>
              {i + 1}. {p}
            </p>
          ))}
        </div>
        <PilihNama onPilih={pilih} keliru={keliru} mati={benar} />
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuDetektif({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Bentuk Misterius"
      warna="#C7D2FE"
      petunjuk="Bentuk misterius memberi petunjuk. Baca semua petunjuknya, lalu pilih namanya. Pada kasus terakhir, ucapkan berapa banyak sudut bentuk itu."
      speakGuru={speakGuru}
      panel={panel}
      id="a4-detektif"
      jumlahRonde={RONDE_DETEKTIF.length}
      kunciAkhir={3}
      belumSiap="Pecahkan kasusnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<Golongan | null>(null);
  const [lulus, setLulus] = useState(false);
  const g: Golongan | null = tahap === 0 ? "segitiga" : pilih;
  const c = g ? CIRI[g].sudut : 0;
  const id = tahap === 0 ? "a4-tulis-0" : `a4-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && g !== null, g ? `${NAMA_PENDEK[g]} punya ${kataK(c)} sudut. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() =>
          speakGuru("Ucapkan banyak sudut sebuah bentuk, lalu guratkan angkanya di kanvas. Setelah itu, pilih bentuk milikmu sendiri.")
        }
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
        {tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}
      </p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={
            suara
              ? "Hebat! Guratkan angkanya."
              : tahap === 0
                ? "Segitiga punya berapa sudut?"
                : pilih
                  ? `Ucapkan: sudut ${NAMA_GOLONGAN[pilih]}`
                  : "Pilih satu bentuk"
          }
          teks={
            tahap === 0
              ? "Segitiga punya berapa sudut? Ucapkan jawabannya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih satu bentuk sesukamu. Ucapkan berapa banyak sudutnya, lalu guratkan angkanya di kanvas. Bentuk lengkung punya nol sudut."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 ? <PilihNama onPilih={(x) => setPilih(x)} keliru={null} mati={pilih !== null} /> : null}
          {g ? (
            <p className="text-center text-3xl font-black text-[#1C01A5]">
              {NAMA_PENDEK[g]} • sudut = {suara ? c : "?"}
            </p>
          ) : null}
        </div>
        {g ? <JawabSuara id={id} jumlah={c} panel={panel} siap belumSiap="" /> : null}
        {suara && g ? (
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
  "Ingat selalu! Bentuk lengkung tepinya melengkung, tidak punya sisi lurus dan sudut. Segitiga punya tiga sisi lurus dan tiga sudut. Segi empat punya empat sisi lurus dan empat sudut. Untuk mengenal bentuk, lihat, raba, hitung, lalu sebut namanya. Bentuk tidak berubah walau diputar atau ukurannya berbeda.";

const POIN_A4: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🟡",
    nama: "Bentuk lengkung",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">{TULIS_CIRI.lengkung}</p>,
    suara: "Bentuk lengkung tepinya melengkung. Tidak punya sisi lurus dan tidak punya sudut. Contohnya donat, piring, dan telur.",
  },
  {
    ikon: "🔺",
    nama: "Segitiga",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">{TULIS_CIRI.segitiga}</p>,
    suara: "Segitiga punya tiga sisi lurus dan tiga sudut. Contohnya tenda dan penggaris segitiga.",
  },
  {
    ikon: "🟩",
    nama: "Segi empat",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">{TULIS_CIRI.segiempat}</p>,
    suara: "Segi empat punya empat sisi lurus dan empat sudut. Contohnya pintu, jendela, dan buku.",
  },
  {
    ikon: "🔍",
    nama: "Cara mengenali",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Lihat • Raba • Hitung • Sebut</p>,
    suara: "Cara mengenali bentuk benda: lihat bendanya, raba tepinya, hitung sisi dan sudutnya, lalu sebut namanya.",
  },
  {
    ikon: "🔄",
    nama: "Posisi dan ukuran",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">diputar atau berbeda ukuran, namanya tetap</p>,
    suara: "Bentuk tidak berubah walaupun diputar, dibalik, atau ukurannya lebih besar atau lebih kecil. Segitiga yang terbalik tetap segitiga.",
  },
];

const CATATANKU = [
  "Aku bisa menyebutkan tiga bentuk: lengkung, segitiga, dan segi empat.",
  "Aku bisa menghitung sisi dan sudut sebuah bentuk.",
  "Aku bisa mencari benda di sekitarku yang bentuknya sama.",
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
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}
          >
            {iya[i] ? "😊" : ""}
          </span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{t}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingA4({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A4.map((p) => (
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
            aria-label="Dengarkan: Cara mendeskripsikan"
            onClick={() => speakGuru("Cara mendeskripsikan benda. Benda ini berbentuk segi empat. Benda ini punya empat sisi lurus dan empat sudut.")}
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🗣️</span>
              Cara mendeskripsikan
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { teks: "Benda ini berbentuk", warna: "#FFFFFF" },
              { teks: "segi empat", warna: "#7FCB96" },
              { teks: "punya 4 sisi lurus", warna: "#FFE566" },
              { teks: "dan 4 sudut", warna: "#FFE566" },
            ].map((k) => (
              <span key={k.teks} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.teks}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            🏠
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Mencoba di rumah: cari tiga benda. Satu berbentuk lengkung, satu segitiga, dan satu segi empat. Tuliskan namanya, lalu ceritakan kepada Ibu atau Ayah.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "ciri" | "detektif" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "ciri" },
  { nomor: 9, tipe: "detektif" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractBentukA(props: Umum) {
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
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Kata dan angka" warna="#1C01A5" />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      {poin ? (
        <PoinPentingA4
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "ciri" ? <KartuCiri {...dasar} /> : null}
          {kartu.tipe === "detektif" ? <KartuDetektif {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
