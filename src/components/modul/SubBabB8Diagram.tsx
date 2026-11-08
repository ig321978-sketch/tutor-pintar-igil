"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, PilihAngka, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { BIRU } from "./CeritaBandingB";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { PilihKata, RefleksiBab7 } from "./ukur-7-dasar";
import { BendaSvg, SimbolSvg, TabelMendatar, tebar, type JenisBenda } from "./data-8-dasar";
import { LangkahBeriNama, LangkahKandang, LangkahKartuKalimat, LangkahSurvei } from "./SubBabB8Concrete";
import { KartuBacaDiagram, KartuTemukanSalah, KartuWarnai } from "./SubBabB8Picture";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab B: Diagram Gambar (Buku Siswa Kelas 1 hlm. 229-241).         */
/* Semua di klien, tanpa API.                                                 */
/* Naskah: naskah/mtk-1-bab8-sub-b-diagram-gambar.md                          */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Survei Sayur Kesukaan (ketuk), 2 Beri Nama Diagram (seret),   */
/*            3 Kartu Kalimat Data (seret), 4 Kandang Pak Budi (tambah-kurang)*/
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Warnai Diagram Gambar, 6 Baca Diagram,                        */
/*            7 Temukan yang Tidak Cocok.                                     */
/*  Abstract: 8 Kalimat Data, 9 Hitung dari Diagram,                          */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman diagram gambar. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B8 = [
  {
    ikon: "☝️",
    nama: "Satu gambar, satu data",
    ket: "tulis keterangan gambar",
    suara: "Pada diagram gambar, satu gambar mewakili satu data. Tulis keterangannya, misalnya gambar wajah mewakili satu anak.",
  },
  {
    ikon: "🧱",
    nama: "Mulai dari kotak pertama",
    ket: "rapat, tanpa celah",
    suara: "Saat membuat diagram gambar, mulai dari kotak pertama. Gambar disusun rapat tanpa celah, supaya mudah dihitung dan dibandingkan.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

type KategoriObjek = { nama: string; j: JenisBenda; n: number };

/** Diagram gambar dengan benda (poster). Tegak: kolom naik dari bawah. Mendatar: baris ke samping. */
function DiagramObjek({ arah, kategori, maks, kecil = false }: { arah: "tegak" | "mendatar"; kategori: KategoriObjek[]; maks: number; kecil?: boolean }) {
  const sel = kecil ? "h-7 w-7" : "h-8 w-8";
  const ikon = kecil ? "h-5 w-5" : "h-6 w-6";
  const kotak = `${sel} flex items-center justify-center border border-[#C4B5FD] bg-white`;
  if (arah === "tegak") {
    return (
      <div className="flex items-end justify-center gap-1" role="img" aria-label={`Diagram gambar tegak: ${kategori.map((c) => `${c.nama} ${c.n}`).join(", ")}`}>
        <div className="flex flex-col-reverse">
          {Array.from({ length: maks }, (_, j) => (
            <span key={j} className={`${sel} flex items-center justify-center rounded-md bg-[#E9D8F3] text-xs font-black text-[#1C01A5]`}>
              {j + 1}
            </span>
          ))}
        </div>
        {kategori.map((c) => (
          <div key={c.nama}>
            <div className="flex flex-col-reverse">
              {Array.from({ length: maks }, (_, j) => (
                <span key={j} className={kotak}>
                  {j < c.n ? <BendaSvg jenis={c.j} kelas={ikon} /> : null}
                </span>
              ))}
            </div>
            <p className={`${kecil ? "w-[3.9rem]" : "w-[4.4rem]"} bg-[#E9D8F3] py-0.5 text-center text-[10px] font-black leading-tight text-[#1C01A5]`}>{c.nama}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-0.5" role="img" aria-label={`Diagram gambar mendatar: ${kategori.map((c) => `${c.nama} ${c.n}`).join(", ")}`}>
      {kategori.map((c) => (
        <div key={c.nama} className="flex items-center justify-center gap-0.5">
          <p className="w-[4.6rem] shrink-0 rounded-md bg-[#E9D8F3] px-1 py-1 text-center text-[10px] font-black leading-tight text-[#1C01A5]">{c.nama}</p>
          <div className="flex">
            {Array.from({ length: maks }, (_, j) => (
              <span key={j} className={kotak}>
                {j < c.n ? <BendaSvg jenis={c.j} kelas={ikon} /> : null}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-0.5">
        <span className="w-[4.6rem] shrink-0" />
        <div className="flex">
          {Array.from({ length: maks }, (_, j) => (
            <span key={j} className={`${sel} flex items-center justify-center rounded-md bg-[#E9D8F3] text-xs font-black text-[#1C01A5]`}>
              {j + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SAYUR_OBJEK: KategoriObjek[] = [
  { nama: "Jagung", j: "jagung", n: 3 },
  { nama: "Wortel", j: "wortel", n: 4 },
  { nama: "Brokoli", j: "brokoli", n: 3 },
  { nama: "Kol", j: "kol", n: 2 },
];

function PapanSayur() {
  const urut: JenisBenda[] = ["jagung", "brokoli", "kol", "wortel", "brokoli", "kol", "wortel", "jagung", "wortel", "jagung", "wortel", "brokoli"];
  const pos = tebar(urut.length, 230, 84, 9);
  return (
    <div className="relative mx-auto w-full rounded-2xl border-4 border-[#1C01A5] bg-[#FEF9C3]" style={{ height: 112 }} role="img" aria-label="Dua belas sayur tercampur di papan">
      {urut.map((j, i) => (
        <span key={i} className="absolute block" style={{ left: `${((pos[i].x + 35) / 300) * 100}%`, top: pos[i].y + 8, transform: `translate(-50%, 0) rotate(${pos[i].rot}deg)` }}>
          <BendaSvg jenis={j} kelas="h-8 w-8" />
        </span>
      ))}
    </div>
  );
}

export function InfografisDiagramB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Diagram Gambar</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="SAYUR KESUKAAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Upe menanyakan sayur kesukaan teman-temannya. Hasilnya masih tercampur di papan, ada jagung, wortel, brokoli, dan kol. Susah menemukan yang paling disukai kalau tercampur. Kita bisa membuat diagram gambar dari data itu. Sayur sangat dibutuhkan tubuh. Sayur mengandung vitamin dan mineral, dan menjaga tubuh tetap sehat. Ayo makan sayur setiap hari."
      >
        <PapanSayur />
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {["vitamin", "mineral", "tubuh sehat"].map((t) => (
            <span key={t} className="rounded-full border-4 border-[#1C01A5] bg-[#BBF7D0] px-3 py-0.5 text-sm font-black text-[#14532D]">
              🥦 {t}
            </span>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="DARI DATA KE DIAGRAM"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Ini langkah membuat diagram gambar. Pertama, tanya temanmu. Kedua, catat jawaban dengan turus. Ketiga, tulis hasilnya dalam tabel. Keempat, gambar atau warnai diagram gambar. Setelah itu, baca dan ceritakan hasilnya."
      >
        <div className="grid grid-cols-4 gap-1">
          {[
            ["🙋", "Tanya"],
            ["✏️", "Turus"],
            ["📋", "Tabel"],
            ["📊", "Diagram"],
          ].map(([i, t], k) => (
            <div key={t} className="relative rounded-xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5 text-center">
              <span className="block text-2xl" aria-hidden="true">
                {i}
              </span>
              <span className="block text-[11px] font-black leading-tight text-[#1C01A5]">
                {k + 1}. {t}
              </span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="DIAGRAM GAMBAR TEGAK"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Ini diagram gambar tegak. Setiap gambar mewakili satu anak. Jagung ada tiga gambar, wortel empat gambar, brokoli tiga gambar, dan kol dua gambar. Angka di sebelah kiri menunjukkan banyak gambar. Wortel paling disukai karena kolomnya paling tinggi."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <p className="pb-1 text-center text-xs font-black text-[#1C01A5]">Diagram Sayur Kesukaan</p>
          <DiagramObjek arah="tegak" kategori={SAYUR_OBJEK} maks={4} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="DIAGRAM GAMBAR MENDATAR"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Ini bentuk lain dari diagram gambar, yaitu diagram mendatar. Gambarnya berjajar ke samping. Jagung ada tiga, wortel empat, brokoli tiga, dan kol dua. Angka di bawah menunjukkan banyak gambar. Wortel paling disukai karena barisnya paling panjang."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <p className="pb-1 text-center text-xs font-black text-[#1C01A5]">Diagram Sayur Kesukaan</p>
          <DiagramObjek arah="mendatar" kategori={SAYUR_OBJEK} maks={4} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="BAGIAN-BAGIAN DIAGRAM"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Diagram gambar punya beberapa bagian. Pertama, judul diagram, supaya kita tahu diagram ini tentang apa. Kedua, nama kolom atau baris, yaitu benda yang didata. Ketiga, gambar, satu gambar mewakili satu data. Keempat, angka yang menunjukkan banyak gambar. Kelima, keterangan gambar, misalnya satu gambar mewakili satu anak."
      >
        <ol className="space-y-1">
          {[
            ["Judul diagram", "tentang apa diagram ini"],
            ["Nama kolom atau baris", "benda yang didata"],
            ["Gambar", "satu gambar mewakili satu data"],
            ["Angka", "banyak gambar"],
            ["Keterangan", "gambar wajah mewakili 1 anak"],
          ].map(([a, b], i) => (
            <li key={a} className="flex items-center gap-2 rounded-xl border-4 border-[#1C01A5] bg-white px-2 py-1">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-sm font-black text-[#1C01A5]">{i + 1}</span>
              <span className="min-w-0 text-xs font-black leading-tight text-[#1C01A5]">
                {a}
                <span className="block text-[10px] text-[#1C01A5]/70">{b}</span>
              </span>
            </li>
          ))}
        </ol>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="CARA MEMBACA DIAGRAM"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Cara membaca diagram gambar. Hitung gambar pada kolom atau baris untuk mengetahui banyak datanya. Kolom yang paling tinggi atau baris yang paling panjang berarti paling banyak. Kolom yang paling pendek atau baris yang paling pendek berarti paling sedikit. Kolom yang sama tinggi berarti sama banyak."
      >
        <div className="space-y-1">
          {[
            ["Hitung gambar", "= banyak data"],
            ["Paling tinggi atau panjang", "= paling banyak"],
            ["Paling pendek", "= paling sedikit"],
            ["Sama tinggi", "= sama banyak"],
          ].map(([a, b]) => (
            <div key={a} className="flex items-center justify-between gap-2 rounded-xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <span className="min-w-0 text-xs font-black leading-tight text-[#1C01A5]">{a}</span>
              <span className="shrink-0 rounded-lg bg-[#FFE566] px-2 py-0.5 text-xs font-black text-[#1C01A5]">{b}</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="MAINAN KESUKAAN TIKA"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Tika menanyakan mainan kesukaan teman-temannya. Gambar wajah tersenyum mewakili satu anak. Ada lima anak yang suka kelereng. Ada empat anak yang suka mobil-mobilan. Ada dua anak yang suka boneka. Ada tiga anak yang suka gasing. Semua ada lima ditambah empat ditambah dua ditambah tiga sama dengan empat belas anak."
      >
        <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-1.5">
          {(
            [
              ["kelereng-biru", 5],
              ["mobil", 4],
              ["boneka", 2],
              ["gasing", 3],
            ] as [JenisBenda, number][]
          ).map(([j, n]) => (
            <div key={j} className="flex items-center gap-1 rounded-lg bg-[#F5F3FF] px-1 py-0.5">
              <BendaSvg jenis={j} kelas="h-7 w-7" />
              <span className="flex flex-1 items-center gap-0.5">
                {Array.from({ length: n }, (_, i) => (
                  <SimbolSvg key={i} jenis="wajah" kelas="h-6 w-6" />
                ))}
              </span>
            </div>
          ))}
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black text-[#1C01A5]">5 + 4 + 2 + 3 = 14 anak</p>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="BERMAIN KARET GELANG"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Malosi, Halim, dan Upe bermain karet gelang. Malosi mempunyai lima karet gelang. Halim mempunyai tiga karet gelang. Upe mempunyai empat karet gelang. Malosi mempunyai dua karet gelang lebih banyak dari Halim. Upe mempunyai satu karet gelang lebih sedikit dari Malosi. Malosi paling banyak dan Halim paling sedikit. Semuanya ada dua belas karet gelang."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <DiagramObjek
            arah="tegak"
            kategori={[
              { nama: "Malosi", j: "karet", n: 5 },
              { nama: "Halim", j: "karet", n: 3 },
              { nama: "Upe", j: "karet", n: 4 },
            ]}
            maks={5}
            kecil
          />
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-xs font-black leading-snug text-[#1C01A5]">
          Malosi 2 lebih banyak dari Halim
          <br />5 + 3 + 4 = 12 karet gelang
        </p>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="AYO MENABUNG"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Halim menabung dua kali seminggu. Wei menabung satu kali seminggu. Upe menabung tiga kali seminggu. Kita bisa menyajikannya dalam diagram gambar dengan mewarnai lingkaran. Satu lingkaran mewakili satu kali menabung. Yang paling rajin menabung adalah Upe."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {(
            [
              ["Halim", 2],
              ["Wei", 1],
              ["Upe", 3],
            ] as [string, number][]
          ).map(([nama, n]) => (
            <div key={nama} className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-1.5 py-1">
              <span className="w-12 shrink-0 text-sm font-black text-[#1C01A5]">{nama}</span>
              <span className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <SimbolSvg key={i} jenis="bulat" warna={i < n ? "#FBBF24" : "#FFFFFF"} kelas="h-7 w-7" />
                ))}
              </span>
              <span className="ml-auto text-xs font-black text-[#1C01A5]">{n} kali</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Satu lingkaran = 1 kali menabung • paling rajin: Upe</p>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_B8.map((i) => (
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

type TipeConcrete = "survei" | "nama" | "kalimat" | "kandang";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "survei" },
  { nomor: 2, tipe: "nama" },
  { nomor: 3, tipe: "kalimat" },
  { nomor: 4, tipe: "kandang" },
];

export function ConcreteDiagramB(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Catat, seret, dan atur!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "survei" ? <LangkahSurvei {...dasar} /> : null}
        {langkah.tipe === "nama" ? <LangkahBeriNama {...dasar} /> : null}
        {langkah.tipe === "kalimat" ? <LangkahKartuKalimat {...dasar} /> : null}
        {langkah.tipe === "kandang" ? <LangkahKandang {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "warnai" | "baca" | "salah";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "warnai" },
  { nomor: 6, tipe: "baca" },
  { nomor: 7, tipe: "salah" },
];

export function PictureDiagramB(props: Umum) {
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
        {kartu.tipe === "warnai" ? <KartuWarnai {...dasar} /> : null}
        {kartu.tipe === "baca" ? <KartuBacaDiagram {...dasar} /> : null}
        {kartu.tipe === "salah" ? <KartuTemukanSalah {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Kalimat Data --------------------------------------- */

type RondeKalimatData = { judul: string; nama: string[]; nilai: number[]; opsi: string[]; benar: number; bantu: string };

const RONDE_KALIMAT_DATA: RondeKalimatData[] = [
  {
    judul: "Banyak Karet Gelang",
    nama: ["Malosi", "Halim", "Upe"],
    nilai: [5, 3, 4],
    opsi: [
      "Halim mempunyai 2 karet gelang lebih banyak dari Malosi.",
      "Malosi mempunyai 2 karet gelang lebih banyak dari Halim.",
      "Upe mempunyai 3 karet gelang lebih banyak dari Halim.",
      "Malosi dan Upe mempunyai karet gelang sama banyak.",
    ],
    benar: 1,
    bantu: "Cari selisih dengan bilangan besar dikurangi bilangan kecil. Malosi 5 dan Halim 3, selisihnya 2.",
  },
  {
    judul: "Banyak Karet Gelang",
    nama: ["Malosi", "Halim", "Upe"],
    nilai: [5, 3, 4],
    opsi: [
      "Upe mempunyai 1 karet gelang lebih banyak dari Malosi.",
      "Upe mempunyai 2 karet gelang lebih sedikit dari Malosi.",
      "Upe mempunyai 1 karet gelang lebih sedikit dari Malosi.",
      "Upe mempunyai karet gelang paling sedikit.",
    ],
    benar: 2,
    bantu: "Upe 4 dan Malosi 5. Upe lebih sedikit dan selisihnya 5 dikurangi 4.",
  },
  {
    judul: "Hewan Pak Budi",
    nama: ["Ayam", "Bebek", "Kelinci"],
    nilai: [4, 2, 5],
    opsi: ["Hewan yang paling sedikit adalah ayam.", "Hewan yang paling banyak adalah ayam.", "Hewan yang paling sedikit adalah bebek.", "Ayam dan kelinci sama banyak."],
    benar: 2,
    bantu: "Cari angka yang paling kecil, lalu lihat nama hewannya.",
  },
  {
    judul: "Banyak Buah",
    nama: ["Jeruk", "Apel", "Mangga", "Belimbing"],
    nilai: [6, 3, 4, 5],
    opsi: ["Jeruk lebih banyak 9 dari apel.", "Mangga lebih banyak dari jeruk.", "Belimbing paling sedikit.", "Jeruk lebih banyak 3 dari apel."],
    benar: 3,
    bantu: "Jeruk 6 dan apel 3. Kurangkan 6 dengan 3, bukan menjumlahkannya.",
  },
  {
    judul: "Kue Kesukaan",
    nama: ["Kue Talam", "Kue Cucur", "Kue Lapis", "Kue Bugis"],
    nilai: [5, 3, 5, 6],
    opsi: ["Kue cucur dan kue lapis sama banyak.", "Kue bugis dan kue talam sama banyak.", "Kue talam dan kue lapis sama banyak.", "Kue cucur paling banyak."],
    benar: 2,
    bantu: "Cari dua kue yang angkanya sama. Kue talam 5 dan kue lapis 5.",
  },
];

function RondeKalimatDataTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KALIMAT_DATA[ronde];
  const akhir = ronde === RONDE_KALIMAT_DATA.length - 1;
  const total = d.nilai.reduce((a, b) => a + b, 0);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b8-kalimat-data"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.opsi[d.benar]}${akhir ? ` Jumlah semua anak ${sebut(total)}.` : ""}`);

  const pilih = (t: string) => {
    if (beres) return;
    if (t === d.opsi[d.benar]) {
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
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Kalimatmu tepat!" : "Pilih kalimat yang benar"}
        teks={`Baca datanya, lalu pilih kalimat yang benar.${akhir ? " Di akhir, ucapkan jumlah semua anak." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <TabelMendatar judul={d.judul} labelNama="Nama" labelBanyak="Banyaknya" nama={d.nama} nilai={d.nilai} kecil />
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Kalimat mana yang benar?</p>
            <PilihKata opsi={d.opsi} keliru={salah} onPilih={pilih} kolom={1} kecil />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua anak = ?" : d.opsi[d.benar]}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuKalimatData({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KALIMAT_DATA[RONDE_KALIMAT_DATA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kalimat Data"
      warna="#BBF7D0"
      petunjuk="Menceritakan data dengan kalimat. Baca datanya, lalu pilih kalimat yang benar tentang lebih banyak, lebih sedikit, paling sedikit, atau sama banyak. Pada soal terakhir, ucapkan jumlah semua anak."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-kalimat-data"
      jumlahRonde={RONDE_KALIMAT_DATA.length}
      kunciAkhir={terakhir.nilai.reduce((a, b) => a + b, 0)}
      belumSiap="Pilih kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKalimatDataTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Hitung dari Diagram -------------------------------- */

type RondeHitung = { judul: string; nama: string[]; nilai: [number, number, number] };

const RONDE_HITUNG: RondeHitung[] = [
  { judul: "Karet Gelang", nama: ["Malosi", "Halim", "Upe"], nilai: [5, 3, 4] },
  { judul: "Hewan Pak Budi", nama: ["Ayam", "Bebek", "Kelinci"], nilai: [6, 2, 5] },
  { judul: "Buah-buahan", nama: ["Apel", "Jeruk", "Mangga"], nilai: [4, 7, 3] },
  { judul: "Alat Tulis", nama: ["Pensil", "Penghapus", "Penggaris"], nilai: [3, 5, 6] },
];

function RondeHitungDiagram({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_HITUNG[ronde];
  const akhir = ronde === RONDE_HITUNG.length - 1;
  const [a, b, c] = d.nilai;
  const dua = a + b;
  const tiga = a + b + c;
  const selisih = Math.max(a, b, c) - Math.min(a, b, c);
  const kunci = [dua, tiga, selisih];
  const [langkah, setLangkah] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  const suara = panel.suara["b8-hitung-diagram"] === true && akhir;
  useBicara(akhir ? suara : beres, `${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(dua)}. Ditambah ${sebut(c)} sama dengan ${sebut(tiga)}. Selisih terbanyak dan tersedikit ${sebut(selisih)}.`);

  const tanya = [`${d.nama[0]} dan ${d.nama[1]} jumlahnya = ?`, "Jumlah ketiganya = ?", "Selisih yang paling banyak dan paling sedikit = ?"];
  const bantu = [
    `Jumlahkan ${sebut(a)} dan ${sebut(b)}. Mulai dari ${sebut(a)} lalu hitung maju ${sebut(b)}.`,
    `Tambahkan ${sebut(c)} pada ${sebut(dua)}.`,
    "Selisih adalah bilangan yang besar dikurangi bilangan yang kecil. Cari angka paling besar dan paling kecil.",
  ];

  const pilih = (v: number) => {
    if (beres) return;
    if (v === kunci[langkah]) {
      setSalah(null);
      setKabar(null);
      const berikut = langkah + 1;
      setLangkah(berikut);
      if (berikut >= 3) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(v);
      setKabar({ teks: bantu[langkah], ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah ketiganya" : suara ? "Hebat!" : beres ? "Hitunganmu tepat!" : "Hitung dari data"}
        teks={`Hitung dari data pada diagram. Jumlahkan, lalu cari selisihnya.${akhir ? " Di akhir, ucapkan jumlah ketiganya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <TabelMendatar judul={d.judul} labelNama="Nama" labelBanyak="Banyaknya" nama={d.nama} nilai={d.nilai} kecil />
        <div className="space-y-0.5 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-xl font-black leading-snug text-[#1C01A5]">
          <p>
            {a} + {b} = {langkah >= 1 ? dua : "?"}
          </p>
          <p className={langkah >= 1 ? "" : "opacity-40"}>
            {langkah >= 1 ? dua : "?"} + {c} = {langkah >= 2 ? tiga : "?"}
          </p>
          <p className={langkah >= 2 ? "" : "opacity-40"}>
            {Math.max(a, b, c)} – {Math.min(a, b, c)} = {langkah >= 3 ? selisih : "?"}
          </p>
        </div>
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Langkah {langkah + 1} dari 3: {tanya[langkah]}
            </p>
            <PilihAngka opsi={opsiSekitar(kunci[langkah])} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah ketiganya = ?" : `Jumlah ketiganya = ${tiga}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuHitungDiagram({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_HITUNG[RONDE_HITUNG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung dari Diagram"
      warna="#FDE68A"
      petunjuk="Menghitung dari data diagram. Jumlahkan dua data, jumlahkan ketiganya, lalu cari selisih yang paling banyak dan paling sedikit. Pada soal terakhir, ucapkan jumlah ketiganya."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-hitung-diagram"
      jumlahRonde={RONDE_HITUNG.length}
      kunciAkhir={terakhir.nilai.reduce((a, b) => a + b, 0)}
      belumSiap="Hitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeHitungDiagram ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara -------------------------- */

const KALI_MENABUNG = [1, 2, 3];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const n = tahap === 0 ? 12 : pilih !== null ? 6 + pilih : null;
  const id = tahap === 0 ? "b8-tulis-0" : `b8-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && n !== null, n !== null ? `Jumlah semuanya ${kata(n).toLowerCase()}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Jumlahkan semua data pada diagram, ucapkan hasilnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih sendiri berapa kali kamu menabung dalam seminggu.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Berkarya"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa semua karet gelang?" : n === null ? "Berapa kali kamu menabung?" : "Ucapkan jumlahnya"}
          teks={
            tahap === 0
              ? "Malosi mempunyai lima karet gelang, Halim tiga, dan Upe empat. Berapa jumlah semua karet gelang? Ucapkan jumlahnya, lalu guratkan lambangnya di kanvas."
              : "Ayo berkarya. Halim menabung dua kali seminggu, Wei satu kali, dan Upe tiga kali. Pilih berapa kali kamu menabung dalam seminggu. Jumlahkan semua, ucapkan jumlahnya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <>
              <TabelMendatar judul="Banyak Karet Gelang" labelNama="Nama" labelBanyak="Banyaknya" nama={["Malosi", "Halim", "Upe"]} nilai={[5, 3, 4]} kecil />
              <p className="text-center text-xl font-black text-[#1C01A5]">Jumlah semua: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          ) : pilih === null ? (
            <div className="space-y-2">
              <TabelMendatar judul="Banyak Menabung dalam 1 Minggu" labelNama="Nama" labelBanyak="Kali" nama={["Halim", "Wei", "Upe", "Aku"]} nilai={[2, 1, 3, "?"]} kecil />
              <p className="text-center text-sm font-black text-[#1C01A5]">Berapa kali kamu menabung dalam seminggu?</p>
              <div className="grid grid-cols-3 gap-2">
                {KALI_MENABUNG.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-label={`Pilih ${v} kali`}
                    onClick={() => setPilih(v)}
                    className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-2 text-center shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                  >
                    <span className="block text-3xl font-black text-[#1C01A5]">{v}</span>
                    <span className="block text-xs font-black text-[#1C01A5]">kali</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <TabelMendatar judul="Banyak Menabung dalam 1 Minggu" labelNama="Nama" labelBanyak="Kali" nama={["Halim", "Wei", "Upe", "Aku"]} nilai={[2, 1, 3, pilih]} kecil />
              <p className="text-center text-xl font-black text-[#1C01A5]">Jumlah semuanya: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
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
            ▶ Ayo Berkarya
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Diagram gambar menyajikan data dengan gambar. Satu gambar mewakili satu data, dan keterangannya ditulis. Mulai dari kotak pertama, rapat tanpa celah. Diagram bisa tegak atau mendatar. Kolom yang paling tinggi atau baris yang paling panjang berarti paling banyak. Langkah membuat diagram adalah tanya, turus, tabel, lalu diagram. Diagram gambar memudahkan kita membaca data.";

const POIN_B8: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "📊",
    nama: "Diagram gambar",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">data disajikan dengan gambar</p>,
    suara: "Diagram gambar menyajikan data dengan gambar, supaya mudah dibaca.",
  },
  {
    ikon: "☝️",
    nama: "Satu gambar, satu data",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">gambar wajah mewakili 1 anak</p>,
    suara: "Satu gambar mewakili satu data. Tulis keterangannya, misalnya gambar wajah mewakili satu anak.",
  },
  {
    ikon: "🧱",
    nama: "Mulai dari kotak pertama",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">rapat • tanpa celah</p>,
    suara: "Mulai dari kotak pertama, susun gambar rapat tanpa celah.",
  },
  {
    ikon: "↔️",
    nama: "Tegak dan mendatar",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">kolom ke atas • baris ke samping</p>,
    suara: "Diagram bisa tegak, gambarnya naik ke atas, atau mendatar, gambarnya berjajar ke samping. Datanya sama.",
  },
  {
    ikon: "🔍",
    nama: "Membaca diagram",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">paling tinggi = paling banyak</p>,
    suara: "Hitung gambarnya. Yang paling tinggi atau paling panjang berarti paling banyak, yang paling pendek berarti paling sedikit.",
  },
  {
    ikon: "🙋",
    nama: "Tanya, turus, tabel, diagram",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">empat langkah membuat diagram</p>,
    suara: "Untuk membuat diagram, tanya temanmu, catat dengan turus, tulis dalam tabel, lalu gambar diagramnya.",
  },
];

const REFLEKSI_B8 = [
  "Aku sudah bisa membaca diagram gambar.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
  "Aku belajar dengan hati senang.",
  "Aku belajar dengan tertib.",
];

function PoinPentingB8({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B8.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan diagram"
            onClick={() => speakGuru("Cara menyebutkan diagram. Ada empat anak yang suka wortel. Wortel paling disukai.")}
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
              { teks: "Ada", warna: "#FFFFFF" },
              { teks: "empat anak", warna: "#FFF7CC" },
              { teks: "suka wortel", warna: "#FED7AA" },
              { teks: "paling banyak", warna: "#BBF7D0" },
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
            Ayo Berkarya di rumah: Ayo Menabung
          </p>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Tanyakan kepada tiga temanmu berapa kali mereka menabung dalam satu minggu. Masukkan datanya ke dalam tabel bersama datamu. Sajikan dalam diagram gambar dengan mewarnai lingkaran. Ceritakan hasilnya di depan kelas, dan tentukan siapa yang paling rajin menabung.
          </p>
        </div>
        <RefleksiBab7 items={REFLEKSI_B8} speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "kalimat" | "hitung" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "kalimat" },
  { nomor: 9, tipe: "hitung" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractDiagramB(props: Umum) {
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
        <PoinPentingB8
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "kalimat" ? <KartuKalimatData {...dasar} /> : null}
          {kartu.tipe === "hitung" ? <KartuHitungDiagram {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
