"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, Kotak, PilihAngka, Persamaan, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { BatangBanding, Donat, DiagramSelisih, GarisSelisih } from "./selisih-a6-dasar";
import { LangkahBarisan, LangkahKalimat, LangkahPiring, LangkahSamakan } from "./SubBabA6Concrete";
import { KartuBatang, KartuGaris, KartuLingkari } from "./SubBabA6Picture";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab A: Mengenal Konsep Lebih dari, Kurang dari, dan Selisih      */
/* (Buku Siswa Kelas 1 hlm. 176-182). Semua di klien, tanpa API.              */
/* Naskah: naskah/mtk-1-bab6-sub-a-lebih-dari-kurang-dari-selisih.md          */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Donat di Piring (seret ke piring), 2 Samakan Kelompok         */
/*            (tambah dan ambil), 3 Dua Barisan Anak (seret anak),            */
/*            4 Kalimat Selisih (seret kartu kata).                           */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Lingkari Lebihnya, 6 Samakan Batang,                          */
/*            7 Selisih di Garis Bilangan.                                    */
/*  Abstract: 8 Besar Dikurangi Kecil, 9 Teka-Teki Lebihnya dan Kurangnya,    */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman lebih dari, kurang dari, dan selisih. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_A6 = [
  {
    ikon: "🔗",
    nama: "Sisa pasangan = lebihnya",
    ket: "Lebihnya sama dengan kurangnya",
    suara: "Kalau benda dipasangkan satu-satu, benda yang tidak punya pasangan adalah lebihnya. Lebihnya selalu sama dengan kurangnya.",
  },
  {
    ikon: "➖",
    nama: "Besar dikurangi kecil",
    ket: "Itulah selisih",
    suara: "Selisih dua bilangan dicari dengan mengurangkannya. Bilangan yang lebih besar dikurangi bilangan yang lebih kecil.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

function BarisDonat({ n, coklat = false }: { n: number; coklat?: boolean }) {
  return (
    <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label={`${n} donat`}>
      {Array.from({ length: n }, (_, i) => (
        <Donat key={i} coklat={coklat} kelas="h-7 w-7" />
      ))}
    </span>
  );
}

export function InfografisSelisihA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Lebih dari, Kurang dari, dan Selisih</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="DUA KELOMPOK DONAT"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Ibu menghias tujuh donat. Tika menghias enam donat. Siapa yang memiliki donat lebih banyak? Kita hitung dan kita pasangkan satu demi satu. Donat Ibu lebih banyak dari donat Tika. Donat Tika lebih sedikit dari donat Ibu."
      >
        <div className="space-y-1.5">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Donat Ibu: 7</p>
            <BarisDonat n={7} />
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Donat Tika: 6</p>
            <BarisDonat n={6} coklat />
          </div>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-base font-black leading-snug text-[#1C01A5]">
          7 lebih banyak dari 6
          <br />6 lebih sedikit dari 7
        </p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="PASANGKAN SATU-SATU"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Pasangkan satu titik merah dengan satu titik biru. Titik merah ada tujuh, titik biru ada enam. Setelah dipasangkan, satu titik merah tidak punya pasangan. Itulah lebihnya. Selisihnya satu."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <DiagramSelisih a={7} b={6} />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="LEBIHNYA DAN KURANGNYA"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Donat Ibu satu lebihnya dari donat Tika. Donat Tika satu kurangnya dari donat Ibu. Lebihnya dan kurangnya selalu sama besar. Begitu juga dengan kupu-kupu dan bunga. Kupu-kupu dua lebihnya dari bunga, dan bunga dua kurangnya dari kupu-kupu."
      >
        <div className="space-y-1.5">
          {[
            { teks: "Donat Ibu 1 lebihnya dari donat Tika.", warna: "#FECACA" },
            { teks: "Donat Tika 1 kurangnya dari donat Ibu.", warna: "#BFDBFE" },
            { teks: "Kupu-kupu 2 lebihnya dari bunga.", warna: "#FECACA" },
            { teks: "Bunga 2 kurangnya dari kupu-kupu.", warna: "#BFDBFE" },
          ].map((k) => (
            <p key={k.teks} className="rounded-2xl border-4 border-[#1C01A5] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
              {k.teks}
            </p>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="BEDA ATAU SELISIH"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Beda dua bilangan bisa ditunjukkan dengan kata lebih dari, kurang dari, beda, atau selisih. Beda banyaknya donat Ibu dan Tika adalah satu. Selisih banyaknya donat Ibu dan Tika juga satu. Tujuh dikurangi enam sama dengan satu."
      >
        <div className="grid grid-cols-3 gap-1.5">
          {["lebih dari", "kurang dari", "beda atau selisih"].map((k) => (
            <p key={k} className="flex items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-sm font-black leading-tight text-[#1C01A5]">
              {k}
            </p>
          ))}
        </div>
        <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2 text-center text-3xl font-black text-[#1C01A5]">7 – 6 = 1</p>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="MODEL BATANG"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Model batang membantu kita melihat selisih. Batang A tujuh kotak, batang B lima kotak. Dua kotak emas yang melebihi batang B adalah selisihnya. Tujuh dikurangi lima sama dengan dua."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <BatangBanding a={7} b={5} />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="GARIS BILANGAN"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Di garis bilangan, selisih adalah banyak langkah dari bilangan yang kecil ke bilangan yang besar. Dari tujuh ke sembilan ada dua langkah. Jadi selisih tujuh dan sembilan adalah dua. Sembilan dikurangi tujuh sama dengan dua."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisSelisih dari={4} sampai={12} kecil={7} besar={9} />
          <p className="text-center text-sm font-black text-[#1C01A5]">7 ke 9: 2 langkah, selisih 2</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="CARA MENCARI SELISIH"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Cara mencari selisih ada tiga langkah. Pertama, cari bilangan yang lebih besar. Kedua, cari bilangan yang lebih kecil. Ketiga, kurangkan bilangan yang besar dengan bilangan yang kecil. Contohnya delapan dikurangi tujuh sama dengan satu, delapan dikurangi enam sama dengan dua, dan sembilan dikurangi enam sama dengan tiga."
      >
        <div className="space-y-1.5">
          {["Cari bilangan yang lebih besar", "Cari bilangan yang lebih kecil", "Besar dikurangi kecil"].map((t, i) => (
            <p key={t} className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-sm font-black leading-tight text-[#1C01A5]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-base">{i + 1}</span>
              {t}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          {[
            { s: "8 – 7 = 1", n: "kelereng" },
            { s: "8 – 6 = 2", n: "apel, mangga" },
            { s: "9 – 6 = 3", n: "pesawat, mobil" },
          ].map((c) => (
            <div key={c.s} className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-0.5 py-1.5">
              <p className="text-base font-black text-[#1C01A5]">{c.s}</p>
              <p className="text-[10px] font-black leading-tight text-[#1C01A5]/80">{c.n}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="KALIMAT PEMBANDING"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Ada tiga kalimat untuk menceritakan perbandingan. Banyak kupu-kupu dua lebihnya dari banyak bunga. Banyak bunga dua kurangnya dari banyak kupu-kupu. Beda banyak bunga dan kupu-kupu adalah dua."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          {[
            ["Banyak kupu-kupu 2 lebihnya dari banyak bunga.", "kata lebihnya"],
            ["Banyak bunga 2 kurangnya dari banyak kupu-kupu.", "kata kurangnya"],
            ["Beda banyak bunga dan kupu-kupu adalah 2.", "kata beda atau selisih"],
          ].map(([k, ket], i) => (
            <div key={k} className={`px-2 py-1 ${i % 2 ? "bg-[#FFF7ED]" : "bg-white"}`}>
              <p className="text-sm font-black leading-tight text-[#1C01A5]">{k}</p>
              <p className="text-xs font-black leading-tight text-[#EA580C]">{ket}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="MENCARI BILANGAN YANG BELUM DIKETAHUI"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Kadang kita diberi tahu lebihnya atau kurangnya. Malosi punya lima kelereng. Halim punya dua kelereng lebihnya dari Malosi. Lebihnya berarti ditambah, jadi lima ditambah dua sama dengan tujuh. Wei punya sebelas pensil warna. Pensil Kira tiga kurangnya dari pensil Wei. Kurangnya berarti dikurangi, jadi sebelas dikurangi tiga sama dengan delapan."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FECACA] px-1.5 py-2 text-center">
            <p className="text-xs font-black leading-tight text-[#1C01A5]">Malosi 5. Halim 2 lebihnya.</p>
            <p className="text-[11px] font-black text-[#B91C1C]">lebihnya → tambah</p>
            <p className="text-2xl font-black text-[#1C01A5]">5 + 2 = 7</p>
          </div>
          <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-[#BFDBFE] px-1.5 py-2 text-center">
            <p className="text-xs font-black leading-tight text-[#1C01A5]">Wei 11. Kira 3 kurangnya.</p>
            <p className="text-[11px] font-black text-[#1D4ED8]">kurangnya → kurang</p>
            <p className="text-2xl font-black text-[#1C01A5]">11 – 3 = 8</p>
          </div>
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_A6.map((i) => (
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

type TipeConcrete = "piring" | "samakan" | "barisan" | "kalimat";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "piring" },
  { nomor: 2, tipe: "samakan" },
  { nomor: 3, tipe: "barisan" },
  { nomor: 4, tipe: "kalimat" },
];

export function ConcreteSelisihA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Taruh, samakan, dan bariskan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "piring" ? <LangkahPiring {...dasar} /> : null}
        {langkah.tipe === "samakan" ? <LangkahSamakan {...dasar} /> : null}
        {langkah.tipe === "barisan" ? <LangkahBarisan {...dasar} /> : null}
        {langkah.tipe === "kalimat" ? <LangkahKalimat {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "lingkari" | "batang" | "garis";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "lingkari" },
  { nomor: 6, tipe: "batang" },
  { nomor: 7, tipe: "garis" },
];

export function PictureSelisihA(props: Umum) {
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
        {kartu.tipe === "lingkari" ? <KartuLingkari {...dasar} /> : null}
        {kartu.tipe === "batang" ? <KartuBatang {...dasar} /> : null}
        {kartu.tipe === "garis" ? <KartuGaris {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Besar Dikurangi Kecil ----------------------------- */

const RONDE_KURANG: { a: number; b: number }[] = [
  { a: 7, b: 5 },
  { a: 6, b: 9 },
  { a: 8, b: 7 },
  { a: 12, b: 15 },
  { a: 18, b: 13 },
];

function RondeKurang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_KURANG[ronde];
  const akhir = ronde === RONDE_KURANG.length - 1;
  const besar = Math.max(a, b);
  const kecil = Math.min(a, b);
  const d = besar - kecil;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salahBesar, setSalahBesar] = useState<number | null>(null);
  const [salahHasil, setSalahHasil] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a6-kurang"] === true && akhir;
  useBicara(akhir ? suara : beres, `Bilangan yang lebih besar adalah ${sebut(besar)}. ${sebut(besar)} dikurangi ${sebut(kecil)} sama dengan ${sebut(d)}. Selisihnya ${sebut(d)}.`);

  const pilihBesar = (n: number) => {
    if (tahap !== 0) return;
    if (n === besar) {
      setSalahBesar(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahBesar(n);
      setKabar({ teks: "Selisih dicari dengan bilangan yang lebih besar dikurangi bilangan yang lebih kecil. Cari dulu bilangan yang lebih besar.", ok: false });
    }
  };

  const pilihHasil = (v: number) => {
    if (tahap !== 1 || beres) return;
    if (v === d) {
      setSalahHasil(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahHasil(v);
      setKabar({ teks: `Hitung ${sebut(besar)} dikurangi ${sebut(kecil)}. Bisa menghitung mundur dari ${sebut(besar)}, atau menghitung maju dari ${sebut(kecil)}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Selisihmu tepat!" : tahap === 0 ? "Mana yang lebih besar?" : "Besar dikurangi kecil"}
        teks={`Cari selisih dua bilangan. Pertama, ketuk bilangan yang lebih besar. Kedua, kurangkan bilangan yang besar dengan bilangan yang kecil.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        {tahap === 0 ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Ketuk bilangan yang lebih besar</p>
            <div className="grid grid-cols-2 gap-3">
              {[a, b].map((n) => (
                <button
                  key={`${n}-${salahBesar === n ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih bilangan ${n}`}
                  onClick={() => pilihBesar(n)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-4 text-5xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salahBesar === n ? "igil-goyang" : ""}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Persamaan a={besar} b={kecil} c={beres ? d : "?"} t1="–" />
            {!beres ? <PilihAngka opsi={opsiSekitar(d)} keliru={salahHasil} onPilih={pilihHasil} /> : null}
          </div>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `Selisih ${besar} dan ${kecil}: ?` : `Selisih ${besar} dan ${kecil} adalah ${d}.`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuKurang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KURANG[RONDE_KURANG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Besar Dikurangi Kecil"
      warna="#BBF7D0"
      petunjuk="Cari selisih dua bilangan. Ketuk dulu bilangan yang lebih besar. Lalu kurangkan bilangan yang besar dengan bilangan yang kecil dan pilih hasilnya. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-kurang"
      jumlahRonde={RONDE_KURANG.length}
      kunciAkhir={Math.abs(terakhir.a - terakhir.b)}
      belumSiap="Cari selisihnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKurang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Teka-Teki Lebihnya dan Kurangnya ------------------ */

type RondeCariData = { tahu: string; cari: string; benda: string; n: number; d: number; kata: "lebihnya" | "kurangnya" };

const RONDE_CARI: RondeCariData[] = [
  { tahu: "Malosi", cari: "Halim", benda: "kelereng", n: 5, d: 2, kata: "lebihnya" },
  { tahu: "Wei", cari: "Kira", benda: "pensil warna", n: 11, d: 3, kata: "kurangnya" },
  { tahu: "Upe", cari: "Kira", benda: "bola kecil", n: 5, d: 2, kata: "lebihnya" },
  { tahu: "kepik merah", cari: "kepik kuning", benda: "kepik", n: 4, d: 2, kata: "kurangnya" },
  { tahu: "Tika", cari: "Malosi", benda: "stiker", n: 15, d: 4, kata: "kurangnya" },
];

function RondeCari({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const r = RONDE_CARI[ronde];
  const akhir = ronde === RONDE_CARI.length - 1;
  const tambah = r.kata === "lebihnya";
  const hasil = tambah ? r.n + r.d : r.n - r.d;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salahOp, setSalahOp] = useState<string | null>(null);
  const [salahHasil, setSalahHasil] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a6-cari"] === true && akhir;
  const cerita = `${r.tahu} punya ${sebut(r.n)} ${r.benda}. Banyak ${r.cari} ${sebut(r.d)} ${r.kata} dari banyak ${r.tahu}. Berapa banyak ${r.cari}?`;
  useBicara(
    akhir ? suara : beres,
    `${r.kata === "lebihnya" ? "Lebihnya berarti ditambah" : "Kurangnya berarti dikurangi"}. ${sebut(r.n)} ${tambah ? "ditambah" : "dikurangi"} ${sebut(r.d)} sama dengan ${sebut(hasil)}.`
  );

  const pilihOp = (op: string) => {
    if (tahap !== 0) return;
    if (op === (tambah ? "tambah" : "kurang")) {
      setSalahOp(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahOp(op);
      setKabar({
        teks: tambah ? "Kata lebihnya berarti jumlahnya bertambah. Pilih tambah." : "Kata kurangnya berarti jumlahnya berkurang. Pilih kurang.",
        ok: false,
      });
    }
  };

  const pilihHasil = (v: number) => {
    if (tahap !== 1 || beres) return;
    if (v === hasil) {
      setSalahHasil(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahHasil(v);
      setKabar({ teks: `Hitung ${sebut(r.n)} ${tambah ? "ditambah" : "dikurangi"} ${sebut(r.d)} dengan teliti.`, ok: false });
    }
  };

  const opsiOp: { v: string; teks: string }[] = [
    { v: "tambah", teks: "➕ tambah" },
    { v: "kurang", teks: "➖ kurang" },
  ];

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: hasilnya" : suara ? "Hebat!" : beres ? "Jawabanmu tepat!" : tahap === 0 ? "Tambah atau kurang?" : "Berapa hasilnya?"}
        teks={`${cerita} Pilih dulu tambah atau kurang, lalu pilih hasilnya.${akhir ? " Di akhir, ucapkan hasilnya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-lg font-black leading-snug text-[#1C01A5]">
          <p>
            {r.tahu}: {r.n}
          </p>
          <p>
            {r.cari}: {r.d} {r.kata} dari {r.tahu}
          </p>
          <p>
            {r.cari}: {beres ? hasil : "?"}
          </p>
        </div>
        {tahap === 0 ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Pilih cara menghitung</p>
            <div className="grid grid-cols-2 gap-2">
              {opsiOp.map((o) => (
                <button
                  key={`${o.v}-${salahOp === o.v ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih ${o.v}`}
                  onClick={() => pilihOp(o.v)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salahOp === o.v ? "igil-goyang" : ""}`}
                >
                  {o.teks}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Persamaan a={r.n} b={r.d} c={beres ? hasil : "?"} t1={tambah ? "+" : "–"} />
            {!beres ? <PilihAngka opsi={opsiSekitar(hasil)} keliru={salahHasil} onPilih={pilihHasil} /> : null}
          </div>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${r.n} ${tambah ? "+" : "–"} ${r.d} = ?` : `${r.n} ${tambah ? "+" : "–"} ${r.d} = ${hasil}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuCari({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_CARI[RONDE_CARI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Teka-Teki Lebihnya dan Kurangnya"
      warna="#FDE68A"
      petunjuk="Baca cerita pendeknya. Kalau diketahui lebihnya, kita menambah. Kalau diketahui kurangnya, kita mengurangi. Pilih dulu tambah atau kurang, lalu pilih hasilnya. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-cari"
      jumlahRonde={RONDE_CARI.length}
      kunciAkhir={terakhir.kata === "lebihnya" ? terakhir.n + terakhir.d : terakhir.n - terakhir.d}
      belumSiap="Selesaikan teka-tekinya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCari ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

type PasanganTulis = { id: string; a: number; b: number };
const AWAL_TULIS: PasanganTulis = { id: "awal", a: 7, b: 9 };
const PILIHAN_TULIS: PasanganTulis[] = [
  { id: "p1", a: 8, b: 5 },
  { id: "p2", a: 10, b: 6 },
  { id: "p3", a: 12, b: 7 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((x) => x.id === pilih) ?? null;
  const soal: PasanganTulis | null = tahap === 0 ? AWAL_TULIS : pil;
  const n = soal ? Math.abs(soal.a - soal.b) : null;
  const id = tahap === 0 ? "a6-tulis-0" : `a6-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(
    suara && n !== null && soal !== null,
    n !== null && soal ? `Selisih ${sebut(soal.a)} dan ${sebut(soal.b)} adalah ${kata(n).toLowerCase()}. ${sebut(Math.max(soal.a, soal.b))} dikurangi ${sebut(Math.min(soal.a, soal.b))} sama dengan ${kata(n).toLowerCase()}. Sekarang guratkan angkanya di kanvas.` : ""
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Cari selisih dua bilangan, ucapkan selisihnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih pasangan bilanganmu sendiri.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa selisihnya?" : soal ? "Ucapkan selisihnya" : "Pilih satu pasangan bilangan"}
          teks={
            tahap === 0
              ? "Wei punya tujuh boneka. Kira punya sembilan boneka. Berapa selisih banyak boneka mereka? Ucapkan selisihnya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu pasangan bilangan sesukamu. Cari selisihnya dengan besar dikurangi kecil. Ucapkan selisihnya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 && pilih === null ? (
            <div className="grid grid-cols-3 gap-2">
              {PILIHAN_TULIS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={`Pilih ${x.a} dan ${x.b}`}
                  onClick={() => setPilih(x.id)}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {x.a} dan {x.b}
                </button>
              ))}
            </div>
          ) : soal ? (
            <>
              <div className="flex items-center justify-center gap-2">
                <Kotak v={soal.a} />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFF7CC] text-4xl font-black text-[#1C01A5]">–</span>
                <Kotak v={soal.b} />
              </div>
              <p className="text-center text-xl font-black text-[#1C01A5]">Selisihnya: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          ) : null}
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
  "Ingat selalu! Kalau benda dipasangkan satu-satu, benda yang tidak punya pasangan adalah lebihnya. Donat Ibu satu lebihnya dari donat Tika, dan donat Tika satu kurangnya dari donat Ibu. Lebihnya sama dengan kurangnya, dan itulah beda atau selisih. Selisih dicari dengan bilangan besar dikurangi bilangan kecil. Kalau diketahui lebihnya, kita menambah. Kalau diketahui kurangnya, kita mengurangi.";

const POIN_A6: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "⚖️",
    nama: "Lebih dari, kurang dari",
    isi: (
      <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
        7 lebih banyak dari 6
        <br />6 lebih sedikit dari 7
      </p>
    ),
    suara: "Tujuh lebih banyak dari enam. Enam lebih sedikit dari tujuh.",
  },
  {
    ikon: "🔗",
    nama: "Lebihnya dan kurangnya",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">donat Ibu 1 lebihnya • donat Tika 1 kurangnya</p>,
    suara: "Donat Ibu satu lebihnya dari donat Tika. Donat Tika satu kurangnya dari donat Ibu. Lebihnya dan kurangnya sama besar.",
  },
  {
    ikon: "🔍",
    nama: "Beda atau selisih",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">beda = selisih = 1</p>,
    suara: "Beda dan selisih artinya sama. Beda banyaknya donat Ibu dan Tika adalah satu.",
  },
  {
    ikon: "➖",
    nama: "Besar dikurangi kecil",
    isi: <p className="text-center text-2xl font-black text-[#1C01A5]">7 – 6 = 1</p>,
    suara: "Selisih dicari dengan mengurangkan. Bilangan yang lebih besar dikurangi bilangan yang lebih kecil. Tujuh dikurangi enam sama dengan satu.",
  },
  {
    ikon: "📏",
    nama: "Selisih di garis bilangan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">7 ke 9 = 2 langkah, selisih 2</p>,
    suara: "Di garis bilangan, selisih adalah banyak langkah dari bilangan yang kecil ke bilangan yang besar. Dari tujuh ke sembilan ada dua langkah.",
  },
  {
    ikon: "🧩",
    nama: "Cari yang belum diketahui",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">lebihnya → tambah • kurangnya → kurang</p>,
    suara: "Kalau diketahui lebihnya, kita menambah. Kalau diketahui kurangnya, kita mengurangi.",
  },
];

const REFLEKSI = [
  "Aku sudah mengerti tentang lebih dari, kurang dari, dan selisih.",
  "Aku sudah bisa penjumlahan yang hasilnya kurang dari 20.",
  "Aku sudah bisa pengurangan yang hasilnya kurang dari 20.",
];

function Refleksi({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => REFLEKSI.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {REFLEKSI.map((tx, i) => (
        <button
          key={tx}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${tx} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${tx} Iya.` : tx);
          }}
          className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingA6({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A6.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan selisih"
            onClick={() => speakGuru("Cara menyebutkan selisih. Donat Ibu satu lebihnya dari donat Tika. Selisih banyaknya donat Ibu dan Tika adalah satu.")}
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
              { teks: "Donat Ibu", warna: "#FFFFFF" },
              { teks: "1 lebihnya", warna: "#FECACA" },
              { teks: "dari donat Tika", warna: "#BFDBFE" },
              { teks: "selisihnya 1", warna: "#FFF7CC" },
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
            Ayo Bermain di rumah: siapkan dua kelompok benda, misalnya sendok dan garpu, atau batu kecil dan biji. Hitung masing-masing, pasangkan satu-satu, lalu ceritakan hasilnya dengan kata lebih dari, kurang dari, dan selisih.
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "kurang" | "cari" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "kurang" },
  { nomor: 9, tipe: "cari" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractSelisihA(props: Umum) {
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
        <PoinPentingA6
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "kurang" ? <KartuKurang {...dasar} /> : null}
          {kartu.tipe === "cari" ? <KartuCari {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
