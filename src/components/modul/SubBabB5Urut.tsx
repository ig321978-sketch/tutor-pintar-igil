"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, Kotak, PilihAngka, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { BarisKelerengPoster, GarisDuaArah, KisiBilangan, opsiSekitar, type Arah } from "./urut-b5-dasar";
import { LangkahBaris, LangkahEsKrim, LangkahRoket, LangkahUlat } from "./SubBabB5Concrete";
import { KartuGaris, KartuKisi, KartuWarnai } from "./SubBabB5Picture";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab B: Menghitung Maju dan Mundur (Buku Siswa Kelas 1            */
/* hlm. 158-160). Semua di klien, tanpa API.                                  */
/* Naskah: naskah/mtk-1-bab5-sub-b-menghitung-maju-dan-mundur.md              */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Barisan Kelereng Halim (tambah dan ambil), 2 Ulat Bilangan    */
/*            (taruh kartu), 3 Roket Hitung Mundur (padamkan lampu),          */
/*            4 Susun Es Krim (tukar tempat).                                 */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Isi Garis Bilangan, 6 Kisi Dua Puluh,                         */
/*            7 Warnai Langkahnya.                                            */
/*  Abstract: 8 Mesin Deret (tentukan arah, lanjutkan), 9 Tetangga Bilangan,  */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman menghitung maju dan mundur. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B5 = [
  {
    ikon: "👣",
    nama: "Langkahnya sama",
    ket: "Satu demi satu, tidak melompat",
    suara: "Saat menghitung maju atau mundur, langkahnya sama, yaitu satu demi satu. Jangan ada bilangan yang terlewat.",
  },
  {
    ikon: "🔁",
    nama: "Kembali ke awal",
    ket: "Maju lalu mundur sama banyak",
    suara: "Kalau kamu maju beberapa langkah lalu mundur dengan langkah yang sama banyak, kamu kembali ke bilangan semula.",
  },
];

const RAKIT_MAJU = [10, 11, 12, 13, 14];
const RAKIT_MUNDUR = [15, 14, 13, 12, 11];

function RantaiBilangan({ daftar, arah }: { daftar: number[]; arah: Arah }) {
  const maju = arah === "maju";
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3" role="img" aria-label={`Hitung ${arah}: ${daftar.join(", ")}`}>
      {daftar.map((n, i) => (
        <React.Fragment key={n}>
          {i > 0 ? (
            <span className={`flex flex-col items-center text-xs font-black leading-none ${maju ? "text-[#1D4ED8]" : "text-[#B91C1C]"}`}>
              <span>{maju ? "+1" : "−1"}</span>
              <span className="text-xl">→</span>
            </span>
          ) : null}
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-2xl font-black text-[#1C01A5]"
            style={{ backgroundColor: maju ? "#BFDBFE" : "#FECACA" }}
          >
            {n}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

const NOMOR_LEBIH_KURANG = [12, 13, 14, 15, 16, 17, 18];
const NOMOR_NAMA = Array.from({ length: 11 }, (_, i) => 10 + i);

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisUrutB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Maju dan Mundur</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="BARISAN KELERENG HALIM"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Ini barisan kelereng Halim. Barisnya sepuluh, sebelas, dua belas, tiga belas, empat belas, dan lima belas. Setiap baris lebih banyak satu kelereng daripada baris di bawahnya. Itulah satu lebih."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <BarisKelerengPoster />
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Naik satu baris, kelerengnya satu lebih banyak.</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="MENGHITUNG MAJU"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Menghitung maju: sepuluh, sebelas, dua belas, tiga belas, empat belas. Mulai dari bilangan kecil menuju bilangan besar. Langkahnya sama, yaitu satu demi satu. Kamu boleh mulai dari bilangan mana saja, tidak harus dari satu atau sepuluh."
      >
        <RantaiBilangan daftar={RAKIT_MAJU} arah="maju" />
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Mulai dari bilangan kecil ke besar • langkahnya sama</p>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="MENGHITUNG MUNDUR"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Menghitung mundur: lima belas, empat belas, tiga belas, dua belas, sebelas. Mulai dari bilangan besar menuju bilangan kecil. Langkahnya juga sama, satu demi satu. Seperti hitungan saat roket akan diluncurkan."
      >
        <RantaiBilangan daftar={RAKIT_MUNDUR} arah="mundur" />
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Mulai dari bilangan besar ke kecil • langkahnya sama</p>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="SATU LEBIH, SATU KURANG"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Setiap bilangan punya satu kurang dan satu lebih. Satu kurang dari tiga belas adalah dua belas. Satu lebih dari tiga belas adalah empat belas. Bilangan di sebelah kiri satu kurang, bilangan di sebelah kanan satu lebih."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid grid-cols-3 bg-[#FFE566] px-1 py-1 text-center text-[11px] font-black leading-tight text-[#1C01A5]">
            <span>◀ satu kurang</span>
            <span>bilangan</span>
            <span>satu lebih ▶</span>
          </div>
          {NOMOR_LEBIH_KURANG.map((n, i) => (
            <div key={n} className={`grid grid-cols-3 items-center px-1 py-0.5 text-center ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
              <span className="text-xl font-black text-[#B91C1C]">{n - 1}</span>
              <span className="text-2xl font-black text-[#1C01A5]">{n}</span>
              <span className="text-xl font-black text-[#1D4ED8]">{n + 1}</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="TETANGGA BILANGAN"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Bilangan juga punya tetangga. Tetangga kiri disebut bilangan sebelum, tetangga kanan disebut bilangan sesudah. Bilangan sebelum lima belas adalah empat belas, dan bilangan sesudahnya adalah enam belas. Empat belas ada di antara tiga belas dan lima belas."
      >
        <div className="space-y-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="flex items-start justify-center gap-2">
            {[
              ["14", "sebelum", "#FECACA"],
              ["15", "bilangan", "#FFE566"],
              ["16", "sesudah", "#BFDBFE"],
            ].map(([n, nama, warna]) => (
              <div key={nama} className="text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-3xl font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
                  {n}
                </span>
                <p className="pt-0.5 text-[11px] font-black text-[#1C01A5]">{nama}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">14 ada di antara 13 dan 15</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="NAMA BILANGAN: MAJU DAN MUNDUR"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Ini nama bilangan saat maju dan saat mundur. Maju: sepuluh, sebelas, dua belas, terus sampai dua puluh. Mundur: dua puluh, sembilan belas, delapan belas, terus sampai sepuluh. Nama bilangannya sama, hanya urutannya yang berbalik."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-1">
            <p className="text-center text-xs font-black text-[#1D4ED8]">Maju ➡️</p>
            {NOMOR_NAMA.map((n) => (
              <p key={n} className="flex items-center justify-between rounded-lg bg-[#EFF6FF] px-1.5 py-0.5 text-sm font-black leading-tight text-[#1C01A5]">
                <span className="text-lg">{n}</span>
                <span className="text-xs">{sebut(n)}</span>
              </p>
            ))}
          </div>
          <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-1">
            <p className="text-center text-xs font-black text-[#B91C1C]">⬅️ Mundur</p>
            {NOMOR_NAMA.slice()
              .reverse()
              .map((n) => (
                <p key={n} className="flex items-center justify-between rounded-lg bg-[#FEF2F2] px-1.5 py-0.5 text-sm font-black leading-tight text-[#1C01A5]">
                  <span className="text-lg">{n}</span>
                  <span className="text-xs">{sebut(n)}</span>
                </p>
              ))}
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="KISI BILANGAN 1 SAMPAI 20"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Ini kisi bilangan satu sampai dua puluh. Setiap baris berisi lima bilangan. Membaca dari kiri ke kanan berarti menghitung maju. Membaca dari kanan ke kiri berarti menghitung mundur."
      >
        <KisiBilangan />
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Kiri ke kanan: maju • Kanan ke kiri: mundur</p>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="GARIS BILANGAN DUA ARAH"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Di garis bilangan, maju berarti bergeser ke kanan, mundur berarti bergeser ke kiri. Dari tiga belas maju tiga langkah sampai enam belas. Dari enam belas mundur tiga langkah kembali ke tiga belas. Maju dan mundur dengan langkah yang sama membawamu kembali ke tempat semula."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisDuaArah dari={12} sampai={18} mulai={13} akhir={16} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Maju 3 langkah: 13 → 16 • Mundur 3 langkah: 16 → 13
          </p>
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_B5.map((i) => (
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
/* Tahap 4: Concrete                                                          */
/* ------------------------------------------------------------------------ */

type TipeConcrete = "baris" | "ulat" | "roket" | "eskrim";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "baris" },
  { nomor: 2, tipe: "ulat" },
  { nomor: 3, tipe: "roket" },
  { nomor: 4, tipe: "eskrim" },
];

export function ConcreteUrutB(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, ambil, dan hitung!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "baris" ? <LangkahBaris {...dasar} /> : null}
        {langkah.tipe === "ulat" ? <LangkahUlat {...dasar} /> : null}
        {langkah.tipe === "roket" ? <LangkahRoket {...dasar} /> : null}
        {langkah.tipe === "eskrim" ? <LangkahEsKrim {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "garis" | "kisi" | "warnai";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "garis" },
  { nomor: 6, tipe: "kisi" },
  { nomor: 7, tipe: "warnai" },
];

export function PictureUrutB(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat diagram dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "garis" ? <KartuGaris {...dasar} /> : null}
        {kartu.tipe === "kisi" ? <KartuKisi {...dasar} /> : null}
        {kartu.tipe === "warnai" ? <KartuWarnai {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Mesin Deret --------------------------------------- */

const RONDE_MESIN: { deret: number[]; jawab: number }[] = [
  { deret: [13, 14, 15], jawab: 16 },
  { deret: [18, 17, 16], jawab: 15 },
  { deret: [11, 12, 13], jawab: 14 },
  { deret: [20, 19, 18], jawab: 17 },
  { deret: [14, 15, 16], jawab: 17 },
];

function RondeMesin({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_MESIN[ronde];
  const arah: Arah = d.deret[1] > d.deret[0] ? "maju" : "mundur";
  const akhir = ronde === RONDE_MESIN.length - 1;
  const [arahOk, setArahOk] = useState(false);
  const [arahSalah, setArahSalah] = useState<Arah | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b5-mesin"] === true && akhir;
  useBicara(akhir ? suara : beres, `${[...d.deret, d.jawab].map(sebut).join(", ")}. Deret ini menghitung ${arah}, langkahnya sama, satu demi satu.`);

  const pilihArah = (a: Arah) => {
    if (arahOk) return;
    if (a === arah) {
      setArahOk(true);
      setArahSalah(null);
      setKabar(null);
    } else {
      setArahSalah(a);
      setKabar({ teks: "Bandingkan dua bilangan pertama. Kalau makin besar, itu maju. Kalau makin kecil, itu mundur.", ok: false });
    }
  };

  const pilih = (n: number) => {
    if (beres || !arahOk) return;
    if (n === d.jawab) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: arah === "maju" ? "Menghitung maju: bilangan berikutnya satu lebih besar dari bilangan terakhir." : "Menghitung mundur: bilangan berikutnya satu lebih kecil dari bilangan terakhir.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: bilangan berikutnya" : suara ? "Hebat!" : beres ? "Deretmu benar!" : arahOk ? "Lanjutkan deretnya" : "Maju atau mundur?"}
        teks={`Lihat deret bilangan ini. Pertama, tentukan: deret ini menghitung maju atau mundur? Kedua, pilih bilangan yang melanjutkan deret.${akhir ? " Terakhir, ucapkan bilangan yang melanjutkan deret." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {d.deret.map((n) => (
            <Kotak key={n} v={n} />
          ))}
          <Kotak v={beres && !(akhir && !suara) ? d.jawab : "?"} nyala={arahOk && !beres} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["maju", "mundur"] as Arah[]).map((a) => (
            <button
              key={`${a}-${arahSalah === a ? "x" : "o"}`}
              type="button"
              disabled={arahOk}
              aria-label={`Deret ini menghitung ${a}`}
              onClick={() => pilihArah(a)}
              className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${
                arahOk && a === arah ? "bg-[#7FCB96]" : "bg-[#FFE566]"
              } ${arahSalah === a ? "igil-goyang" : ""}`}
            >
              {a === "maju" ? "➡️ Maju" : "⬅️ Mundur"}
            </button>
          ))}
        </div>
        {arahOk && !beres ? <PilihAngka opsi={opsiSekitar(d.jawab)} keliru={keliru} onPilih={pilih} /> : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            Deret {arah}: {[...d.deret, akhir && !suara ? "?" : d.jawab].join(", ")}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuMesin({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Mesin Deret"
      warna="#BBF7D0"
      petunjuk="Lihat deret bilangan. Pertama, pilih apakah deret itu menghitung maju atau mundur. Kedua, pilih bilangan yang melanjutkan deret. Pada soal terakhir, ucapkan bilangan yang melanjutkan deret."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-mesin"
      jumlahRonde={RONDE_MESIN.length}
      kunciAkhir={RONDE_MESIN[RONDE_MESIN.length - 1].jawab}
      belumSiap="Lanjutkan deretnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeMesin ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Tetangga Bilangan --------------------------------- */

type IsiKamar = number | "?" | null;
type SoalTetangga = { kiri: IsiKamar; tengah: IsiKamar; kanan: IsiKamar; jawab: number; soal: string; salah: string };

const RONDE_TETANGGA: SoalTetangga[] = [
  { kiri: null, tengah: 14, kanan: "?", jawab: 15, soal: "Bilangan sesudah 14", salah: "Sesudah berarti di sebelah kanan, satu lebih. Hitung maju satu dari empat belas." },
  { kiri: "?", tengah: 17, kanan: null, jawab: 16, soal: "Bilangan sebelum 17", salah: "Sebelum berarti di sebelah kiri, satu kurang. Hitung mundur satu dari tujuh belas." },
  { kiri: 12, tengah: "?", kanan: 14, jawab: 13, soal: "Bilangan di antara 12 dan 14", salah: "Hitung maju satu dari dua belas. Hasilnya harus sama dengan hitung mundur satu dari empat belas." },
  { kiri: "?", tengah: 20, kanan: null, jawab: 19, soal: "Satu kurang dari 20", salah: "Satu kurang berarti hitung mundur satu dari dua puluh." },
  { kiri: null, tengah: 17, kanan: "?", jawab: 18, soal: "Satu lebih dari 17", salah: "Satu lebih berarti hitung maju satu dari tujuh belas." },
];

function RondeTetangga({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TETANGGA[ronde];
  const akhir = ronde === RONDE_TETANGGA.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b5-tetangga"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.soal} adalah ${sebut(d.jawab)}. Lambangnya ${d.jawab}.`);

  const pilih = (n: number) => {
    if (beres) return;
    if (n === d.jawab) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: d.salah, ok: false });
    }
  };

  const tampil = (v: IsiKamar): IsiKamar => (v === "?" ? (beres && !(akhir && !suara) ? d.jawab : "?") : v);

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: bilangan itu" : suara ? "Hebat!" : beres ? "Tetanggamu ketemu!" : d.soal}
        teks={`Tiga kotak ini adalah tetangga bilangan. Kotak kiri adalah bilangan sebelum, kotak tengah bilangannya, kotak kanan adalah bilangan sesudah. ${d.soal}, berapa?${akhir ? " Setelah ketemu, ucapkan bilangan itu." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-center text-base font-black leading-snug text-[#1C01A5]">🔎 {d.soal}</p>
        <div className="flex items-start justify-center gap-2">
          {[
            ["sebelum", d.kiri],
            ["bilangan", d.tengah],
            ["sesudah", d.kanan],
          ].map(([nama, isi]) => (
            <div key={nama as string} className="flex flex-col items-center gap-0.5">
              <Kotak v={tampil(isi as IsiKamar)} nyala={isi === "?" && !beres} />
              <span className="text-[11px] font-black text-[#1C01A5]/80">{nama as string}</span>
            </div>
          ))}
        </div>
        <PilihAngka opsi={opsiSekitar(d.jawab)} keliru={keliru} onPilih={pilih} mati={beres} />
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? "Jawabannya: ?" : `${d.soal} = ${d.jawab}, dibaca ${sebut(d.jawab)}.`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTetangga({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tetangga Bilangan"
      warna="#FDE68A"
      petunjuk="Tiga kotak ini adalah tetangga bilangan: sebelum, bilangan, dan sesudah. Baca soalnya, lalu pilih bilangan yang cocok. Bilangan sebelum berarti satu kurang, bilangan sesudah berarti satu lebih. Pada soal terakhir, ucapkan bilangan itu."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-tetangga"
      jumlahRonde={RONDE_TETANGGA.length}
      kunciAkhir={RONDE_TETANGGA[RONDE_TETANGGA.length - 1].jawab}
      belumSiap="Temukan bilangannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTetangga ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

type DeretTulis = { id: string; deret: string[]; n: number; arah: Arah };

const DERET_AWAL: DeretTulis = { id: "awal", deret: ["10", "11", "?", "13"], n: 12, arah: "maju" };
const PILIHAN_TULIS: DeretTulis[] = [
  { id: "maju", deret: ["14", "15", "?", "17"], n: 16, arah: "maju" },
  { id: "mundur", deret: ["19", "18", "?", "16"], n: 17, arah: "mundur" },
  { id: "mundur-dua", deret: ["20", "?", "18", "17"], n: 19, arah: "mundur" },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((p) => p.id === pilih) ?? null;
  const soal: DeretTulis | null = tahap === 0 ? DERET_AWAL : pil;
  const id = tahap === 0 ? "b5-tulis-0" : `b5-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && soal !== null, soal ? `${kata(soal.n)}. Lambangnya ${soal.n}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Lihat deret bilangan, temukan bilangan yang hilang, ucapkan namanya, lalu guratkan angkanya di kanvas. Setelah itu, pilih deretmu sendiri.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Temukan bilangan yang hilang" : soal ? "Ucapkan bilangan yang hilang" : "Pilih satu deret"}
          teks={
            tahap === 0
              ? "Lihat deret ini: sepuluh, sebelas, bilangan yang hilang, tiga belas. Ucapkan bilangan yang hilang, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu deret sesukamu. Temukan bilangan yang hilang, ucapkan namanya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 && pilih === null ? (
            <div className="space-y-2">
              {PILIHAN_TULIS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Pilih deret ${p.deret.join(" ")}`}
                  onClick={() => setPilih(p.id)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-2 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {p.deret.map((t, i) => (
                    <span key={i} className="min-w-8 text-center">
                      {t}
                    </span>
                  ))}
                </button>
              ))}
            </div>
          ) : soal ? (
            <>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {soal.deret.map((t, i) => (
                  <Kotak key={i} v={t === "?" ? (suara ? soal.n : "?") : Number(t)} nyala={t === "?" && !suara} />
                ))}
              </div>
              <p className="text-center text-base font-black text-[#1C01A5]">
                Deret {soal.arah} • {suara ? `${kata(soal.n)} = ${soal.n}` : "bilangan hilang = ?"}
              </p>
            </>
          ) : null}
        </div>
        {soal !== null ? <JawabSuara id={id} jumlah={soal.n} panel={panel} siap belumSiap="" /> : null}
        {suara && soal !== null ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={soal.n} kata={kata(soal.n)} onCompletedTrace={() => setLulus(true)} />
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
  "Ingat selalu! Menghitung maju berarti mulai dari bilangan kecil menuju bilangan besar. Menghitung mundur berarti mulai dari bilangan besar menuju bilangan kecil. Langkahnya selalu sama, satu demi satu. Bilangan di sebelah kanan satu lebih, bilangan di sebelah kiri satu kurang. Kalau maju lalu mundur dengan langkah yang sama, kamu kembali ke bilangan semula.";

const POIN_B5: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "⬆️",
    nama: "Hitung maju",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 → 11 → 12 → 13</p>,
    suara: "Menghitung maju: mulai dari bilangan kecil menuju bilangan besar. Sepuluh, sebelas, dua belas, tiga belas. Langkahnya sama.",
  },
  {
    ikon: "⬇️",
    nama: "Hitung mundur",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">15 → 14 → 13 → 12</p>,
    suara: "Menghitung mundur: mulai dari bilangan besar menuju bilangan kecil. Lima belas, empat belas, tiga belas, dua belas. Langkahnya sama.",
  },
  {
    ikon: "🧮",
    nama: "Satu lebih, satu kurang",
    isi: <p className="text-center text-lg font-black text-[#1C01A5]">14 ◀ 15 ▶ 16</p>,
    suara: "Bilangan di sebelah kanan satu lebih banyak, bilangan di sebelah kiri satu kurang. Satu kurang dari lima belas adalah empat belas, satu lebih dari lima belas adalah enam belas.",
  },
  {
    ikon: "🏘️",
    nama: "Tetangga bilangan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">sebelum • sesudah • di antara</p>,
    suara: "Bilangan sebelum ada di sebelah kiri, bilangan sesudah ada di sebelah kanan. Empat belas ada di antara tiga belas dan lima belas.",
  },
  {
    ikon: "🗺️",
    nama: "Kisi dan garis bilangan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">kanan = maju • kiri = mundur</p>,
    suara: "Di kisi dan di garis bilangan, bergeser ke kanan berarti maju, bergeser ke kiri berarti mundur.",
  },
  {
    ikon: "🔁",
    nama: "Maju lalu mundur",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">13 → 16 → 13</p>,
    suara: "Maju tiga langkah dari tiga belas sampai enam belas. Mundur tiga langkah, kembali ke tiga belas. Maju dan mundur sama banyak membawamu kembali ke awal.",
  },
];

const REFLEKSI = [
  "Aku bisa menghitung maju dan mundur sampai 20.",
  "Aku tahu bilangan sebelum dan sesudah sebuah bilangan.",
  "Aku bisa mengisi bilangan yang hilang pada deret.",
  "Aku tahu maju lalu mundur sama banyak membawaku kembali.",
];

function Refleksi({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => REFLEKSI.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Refleksiku</p>
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

function PoinPentingB5({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B5.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan bilangan sesudah"
            onClick={() => speakGuru("Cara menyebutkan bilangan sesudah. Bilangan sesudah lima belas adalah enam belas.")}
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
              { teks: "Bilangan sesudah 15", warna: "#FFFFFF" },
              { teks: "adalah", warna: "#FFFFFF" },
              { teks: "16", warna: "#FFE566" },
              { teks: "enam belas", warna: "#7FCB96" },
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
            Ayo Bermain di rumah: hitung langkahmu saat naik tangga dan turun tangga. Naik, hitung maju. Turun, hitung mundur. Sebelum bermain, hitung mundur dulu: lima, empat, tiga, dua, satu, mulai!
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "mesin" | "tetangga" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "mesin" },
  { nomor: 9, tipe: "tetangga" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractUrutB(props: Umum) {
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
        <PoinPentingB5
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "mesin" ? <KartuMesin {...dasar} /> : null}
          {kartu.tipe === "tetangga" ? <KartuTetangga {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
