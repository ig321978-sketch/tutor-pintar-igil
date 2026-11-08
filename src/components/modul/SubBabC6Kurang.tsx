"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, PilihAngka, Persamaan, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { Ikatan, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { GarisLompat } from "./tambah-b6-dasar";
import { Apel, BagianUtuh, DeretMundur, TabelKurang } from "./kurang-c6-dasar";
import { Refleksi } from "./SubBabA6Selisih";
import { LangkahKembali, LangkahKotak, LangkahPeran, LangkahUlat } from "./SubBabC6Concrete";
import { KartuIkatanKurang, KartuMundur, KartuTabelKurang } from "./SubBabC6Picture";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab C: Pengurangan yang Hasilnya Kurang dari 20                  */
/* (Buku Siswa Kelas 1 hlm. 189-195). Semua di klien, tanpa API.              */
/* Naskah: naskah/mtk-1-bab6-sub-c-pengurangan-kurang-dari-20.md              */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Apel Dimakan Ulat (ketuk), 2 Kotak Bolu Kukus (seret),        */
/*            3 Kembalikan Apel (seret kembali), 4 Kartu Peran Bilangan       */
/*            (seret kartu angka).                                            */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Mundur di Garis Bilangan, 6 Bagan Pasangan,                   */
/*            7 Isi Tabel Pengurangan.                                        */
/*  Abstract: 8 Rantai Pengurangan, 9 Keluarga Kalimat,                       */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman pengurangan yang hasilnya kurang dari dua puluh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_C6 = [
  {
    ikon: "🏷️",
    nama: "Puluhan tetap, satuan dikurangi",
    ket: "Kurangkan satuan dengan satuan",
    suara: "Untuk belasan dikurangi satuan, kurangkan satuan dengan satuan dulu. Puluhannya tetap sama.",
  },
  {
    ikon: "🔄",
    nama: "Cek dengan menambah",
    ket: "12 + 3 = 15",
    suara: "Periksa pengurangan dengan penjumlahan. Dua belas ditambah tiga sama dengan lima belas, jadi lima belas dikurangi tiga memang dua belas.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisKurangC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Pengurangan yang Hasilnya Kurang dari 20</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="SISA APEL TIKA"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Tika membeli lima belas apel. Ternyata tiga apel dimakan ulat. Berapakah sisa apel Tika yang masih bagus? Sisanya adalah lima belas dikurangi tiga. Dua belas apel masih bagus dan tiga apel dimakan ulat."
      >
        <div className="grid grid-cols-1 gap-1.5">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Masih bagus: 12</p>
            <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label="12 apel masih bagus">
              {Array.from({ length: 12 }, (_, i) => (
                <Apel key={i} kelas="h-7 w-7" />
              ))}
            </span>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Dimakan ulat: 3</p>
            <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label="3 apel dimakan ulat">
              {Array.from({ length: 3 }, (_, i) => (
                <Apel key={i} gigit kelas="h-8 w-8" />
              ))}
            </span>
          </div>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-2xl font-black text-[#1C01A5]">15 – 3 = 12</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="MENGHITUNG MUNDUR"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Cara pertama adalah menghitung mundur. Mulai dari lima belas, lalu hitung mundur tiga kali. Empat belas, tiga belas, dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <DeretMundur dari={11} sampai={15} />
          <p className="text-center text-sm font-black text-[#1C01A5]">mulai dari 15, mundur 3 kali</p>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-xl font-black text-[#1C01A5]">15, 14, 13, 12</p>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="PASANGAN BILANGAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Cara kedua adalah pasangan bilangan. Lima belas bisa dipisah menjadi sepuluh dan lima. Lima dikurangi tiga sama dengan dua. Lalu sepuluh ditambah dua sama dengan dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas."
      >
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
            <Ikatan atas={15} kiri={10} kanan={5} kelas="h-24 w-28" />
            <p className="text-center text-xs font-black text-[#1C01A5]">15 dipisah 10 dan 5</p>
          </div>
          <div className="space-y-1.5">
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-lg font-black text-[#1C01A5]">5 – 3 = 2</p>
            <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center text-lg font-black text-[#1C01A5]">10 + 2 = 12</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="NILAI TEMPAT"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Cara ketiga adalah nilai tempat. Lima belas adalah satu puluhan dan lima satuan. Kurangkan satuannya, lima dikurangi tiga sama dengan dua. Puluhannya tetap satu. Jadi lima belas dikurangi tiga sama dengan dua belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <TabelKurang a={15} b={3} puluhHasil={1} satuHasil={2} />
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">Satuan: 5 – 3 = 2 • Puluhan tetap 1</p>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="KEBALIKAN PENJUMLAHAN"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Pengurangan dan penjumlahan saling berkebalikan. Utuhnya lima belas. Kalau tiga diambil, sisanya dua belas. Kalau dua belas dan tiga digabung lagi, kembali menjadi lima belas. Jadi kita bisa memeriksa pengurangan dengan penjumlahan."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <BagianUtuh utuh={15} diambil={3} />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="GARIS BILANGAN MUNDUR"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Di garis bilangan, menghitung mundur berarti melompat ke kiri. Mulai dari lima belas, melompat tiga kali ke kiri, mendarat di dua belas. Jadi lima belas dikurangi tiga sama dengan dua belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisLompat dari={10} sampai={16} mulai={15} lompat={[14, 13, 12]} />
          <p className="text-center text-sm font-black text-[#1C01A5]">melompat ke kiri 3 kali</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="PILIH CARA TERMUDAH"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Pilih cara yang paling mudah menurutmu. Lima belas dikurangi dua mudah dengan menghitung mundur karena yang dikurangkan kecil. Tujuh belas dikurangi empat mudah dengan pasangan bilangan. Delapan belas dikurangi lima mudah dengan nilai tempat. Kamu juga boleh memeriksa hasilnya dengan penjumlahan."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          {[
            ["15 – 2", "menghitung mundur", "yang dikurangkan kecil"],
            ["17 – 4", "pasangan bilangan", "pisahkan 10 dan 7"],
            ["18 – 5", "nilai tempat", "satuan 8 – 5, puluhan tetap"],
            ["13 – 2", "mundur atau nilai tempat", "dua cara sama baik"],
          ].map(([s, cara, ket], i) => (
            <div key={s} className={`flex items-center gap-2 px-2 py-1 ${i % 2 ? "bg-[#EEF2FF]" : "bg-white"}`}>
              <span className="w-16 shrink-0 text-lg font-black text-[#B91C1C]">{s}</span>
              <span className="min-w-0">
                <span className="block text-sm font-black leading-tight text-[#1C01A5]">{cara}</span>
                <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/70">{ket}</span>
              </span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="SATUAN HABIS"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Kadang satuannya habis. Enam belas dikurangi enam sama dengan sepuluh. Delapan belas dikurangi delapan sama dengan sepuluh. Sembilan belas dikurangi sembilan sama dengan sepuluh. Satuannya nol, puluhannya tetap satu, jadi hasilnya sepuluh."
      >
        <div className="grid grid-cols-3 gap-1.5">
          {["16 – 6 = 10", "18 – 8 = 10", "19 – 9 = 10"].map((k) => (
            <p key={k} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-3 text-center text-base font-black leading-tight text-[#1C01A5]">
              {k}
            </p>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Satuan 0, puluhan tetap 1, hasilnya 10.</p>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="KATA PENGURANGAN"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Kata-kata ini menandakan pengurangan: sisa, dikurangi, diambil, dimakan, dan pergi. Contohnya, Ibu membeli tiga belas bolu kukus. Malosi memakan dua bolu kukus. Sisanya tiga belas dikurangi dua sama dengan sebelas."
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {["sisa", "dikurangi", "diambil", "dimakan", "pergi"].map((k) => (
            <span key={k} className="rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-0.5 text-base font-black text-[#1C01A5]">
              {k}
            </span>
          ))}
        </div>
        <p className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2 text-center text-sm font-black leading-snug text-[#1C01A5]">
          13 bolu kukus, dimakan 2.
          <br />
          13 – 2 = 11
        </p>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_C6.map((i) => (
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

type TipeConcrete = "ulat" | "kotak" | "kembali" | "peran";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "ulat" },
  { nomor: 2, tipe: "kotak" },
  { nomor: 3, tipe: "kembali" },
  { nomor: 4, tipe: "peran" },
];

export function ConcreteKurangC(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Ketuk, seret, dan periksa!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "ulat" ? <LangkahUlat {...dasar} /> : null}
        {langkah.tipe === "kotak" ? <LangkahKotak {...dasar} /> : null}
        {langkah.tipe === "kembali" ? <LangkahKembali {...dasar} /> : null}
        {langkah.tipe === "peran" ? <LangkahPeran {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "mundur" | "ikatan" | "tabel";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "mundur" },
  { nomor: 6, tipe: "ikatan" },
  { nomor: 7, tipe: "tabel" },
];

export function PictureKurangC(props: Umum) {
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
        {kartu.tipe === "mundur" ? <KartuMundur {...dasar} /> : null}
        {kartu.tipe === "ikatan" ? <KartuIkatanKurang {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabelKurang {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Rantai Pengurangan -------------------------------- */

const RONDE_RANTAI: { a: number; b: number }[] = [
  { a: 17, b: 4 },
  { a: 15, b: 4 },
  { a: 19, b: 7 },
  { a: 14, b: 3 },
  { a: 18, b: 3 },
];

function RondeRantai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_RANTAI[ronde];
  const akhir = ronde === RONDE_RANTAI.length - 1;
  const s = a - 10;
  const r = s - b;
  const hasil = a - b;
  const [tahap, setTahap] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c6-rantai"] === true && akhir;
  const benarTahap = [s, r, hasil];
  useBicara(
    akhir ? suara : beres,
    `${sebut(a)} dipisah menjadi sepuluh dan ${sebut(s)}. ${sebut(s)} dikurangi ${sebut(b)} sama dengan ${sebut(r)}. Sepuluh ditambah ${sebut(r)} sama dengan ${sebut(hasil)}. Jadi ${sebut(a)} dikurangi ${sebut(b)} sama dengan ${sebut(hasil)}.`
  );

  const soal = [`${a} = 10 + ?`, `${s} – ${b} = ?`, `10 + ${r} = ?`];
  const petunjuk = [
    `Belasan adalah sepuluh ditambah satuannya. ${sebut(a)} adalah sepuluh dan berapa?`,
    `Kurangkan satuannya: ${sebut(s)} dikurangi ${sebut(b)}. Hitung mundur dari ${sebut(s)} kalau perlu.`,
    `Sepuluh ditambah ${sebut(r)}. Puluhannya satu dan satuannya ${sebut(r)}.`,
  ];

  const pilih = (v: number) => {
    if (beres) return;
    if (v === benarTahap[tahap]) {
      setSalah(null);
      setKabar(null);
      if (tahap === 2) {
        setBeres(true);
        letusan.picu();
        onBeres();
      } else {
        setTahap(tahap + 1);
      }
    } else {
      setSalah(v);
      setKabar({ teks: petunjuk[tahap], ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Rantaimu lengkap!" : "Susun rantai pengurangan"}
        teks={`Hitung ${sebut(a)} dikurangi ${sebut(b)} dengan pasangan bilangan. Isi tiga langkah: pisahkan belasan menjadi sepuluh dan satuan, kurangkan satuannya, lalu tambahkan sepuluh.${akhir ? " Di akhir, ucapkan sisanya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-xl font-black leading-snug text-[#1C01A5]">
          <p>
            {a} – {b} = {beres && !(akhir && !suara) ? hasil : "?"}
          </p>
          <p className={tahap >= 1 ? "" : "opacity-40"}>
            {a} = 10 + {tahap >= 1 ? s : "?"}
          </p>
          <p className={tahap >= 2 ? "" : "opacity-40"}>
            {tahap >= 1 ? s : "?"} – {b} = {tahap >= 2 ? r : "?"}
          </p>
          <p className={tahap >= 2 ? "" : "opacity-40"}>
            10 + {tahap >= 2 ? r : "?"} = {beres && !(akhir && !suara) ? hasil : "?"}
          </p>
        </div>
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Langkah {tahap + 1} dari 3: {soal[tahap]}
            </p>
            <PilihAngka opsi={opsiSekitar(benarTahap[tahap])} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} – ${b} = 10 + ${r} = ?` : `${a} – ${b} = 10 + ${r} = ${hasil}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuRantai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_RANTAI[RONDE_RANTAI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Rantai Pengurangan"
      warna="#BBF7D0"
      petunjuk="Hitung dengan pasangan bilangan. Isi tiga langkah: belasan dipisah menjadi sepuluh dan satuan, satuannya dikurangi, lalu sepuluh ditambah hasilnya. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-rantai"
      jumlahRonde={RONDE_RANTAI.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Susun rantainya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRantai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Keluarga Kalimat ---------------------------------- */

type KalimatKeluarga = { teks: string; benar: boolean };
type RondeKeluargaData = { a: number; b: number; c: number; kalimat: KalimatKeluarga[] };

const RONDE_KELUARGA: RondeKeluargaData[] = [
  {
    a: 15,
    b: 3,
    c: 12,
    kalimat: [
      { teks: "12 – 3 = 15", benar: false },
      { teks: "12 + 3 = 15", benar: true },
      { teks: "15 + 3 = 12", benar: false },
      { teks: "15 – 12 = 3", benar: true },
      { teks: "3 + 15 = 12", benar: false },
      { teks: "3 + 12 = 15", benar: true },
    ],
  },
  {
    a: 17,
    b: 5,
    c: 12,
    kalimat: [
      { teks: "17 + 5 = 12", benar: false },
      { teks: "12 + 5 = 17", benar: true },
      { teks: "5 + 12 = 17", benar: true },
      { teks: "12 – 5 = 17", benar: false },
      { teks: "17 – 12 = 5", benar: true },
      { teks: "5 + 17 = 12", benar: false },
    ],
  },
  {
    a: 13,
    b: 2,
    c: 11,
    kalimat: [
      { teks: "11 + 2 = 13", benar: true },
      { teks: "13 + 2 = 11", benar: false },
      { teks: "2 + 11 = 13", benar: true },
      { teks: "11 – 2 = 13", benar: false },
      { teks: "2 + 13 = 11", benar: false },
      { teks: "13 – 11 = 2", benar: true },
    ],
  },
  {
    a: 18,
    b: 6,
    c: 12,
    kalimat: [
      { teks: "18 + 6 = 12", benar: false },
      { teks: "12 + 6 = 18", benar: true },
      { teks: "6 + 12 = 18", benar: true },
      { teks: "12 – 6 = 18", benar: false },
      { teks: "6 + 18 = 12", benar: false },
      { teks: "18 – 12 = 6", benar: true },
    ],
  },
];

function RondeKeluarga({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KELUARGA[ronde];
  const akhir = ronde === RONDE_KELUARGA.length - 1;
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [goyang, setGoyang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c6-keluarga"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(d.a)} dikurangi ${sebut(d.b)} sama dengan ${sebut(d.c)}. Kalimat yang berhubungan: ${sebut(d.c)} ditambah ${sebut(d.b)} sama dengan ${sebut(d.a)}, ${sebut(d.b)} ditambah ${sebut(d.c)} sama dengan ${sebut(d.a)}, dan ${sebut(d.a)} dikurangi ${sebut(d.c)} sama dengan ${sebut(d.b)}.`
  );

  const balik = (i: number) => {
    if (beres) return;
    setKabar(null);
    setDipilih((l) => (l.includes(i) ? l.filter((v) => v !== i) : [...l, i]));
  };

  const periksa = () => {
    if (beres) return;
    const salahPilih = dipilih.filter((i) => !d.kalimat[i].benar);
    const lewat = d.kalimat.map((k, i) => (k.benar && !dipilih.includes(i) ? i : -1)).filter((i) => i >= 0);
    if (salahPilih.length === 0 && lewat.length === 0) {
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
      return;
    }
    setGoyang((g) => g + 1);
    setKabar({
      teks:
        salahPilih.length > 0
          ? "Ada kalimat yang kamu pilih tetapi salah. Hitung ulang setiap kalimat, lalu lepaskan pilihan yang salah."
          : "Masih ada kalimat benar yang belum kamu pilih. Ketuk semua kalimat yang benar.",
      ok: false,
    });
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Keluargamu lengkap!" : "Pilih semua kalimat yang benar"}
        teks={`Kita tahu ${sebut(d.a)} dikurangi ${sebut(d.b)} sama dengan ${sebut(d.c)}. Ketuk semua kalimat yang benar dan berhubungan dengan kalimat itu, lalu tekan periksa.${akhir ? " Di akhir, ucapkan sisanya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2 text-center text-3xl font-black text-[#1C01A5]">
          {d.a} – {d.b} = {beres && akhir && !suara ? "?" : d.c}
        </p>
        <div key={goyang} className={`grid grid-cols-2 gap-2 ${goyang > 0 && !beres ? "igil-goyang" : ""}`}>
          {d.kalimat.map((k, i) => {
            const aktif = dipilih.includes(i);
            const tampil = beres ? (k.benar ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/30 bg-white opacity-60") : aktif ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-white";
            return (
              <button
                key={k.teks}
                type="button"
                aria-pressed={aktif}
                aria-label={`Kalimat: ${k.teks}`}
                onClick={() => balik(i)}
                className={`rounded-2xl border-4 px-1 py-3 text-xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] ${tampil}`}
              >
                {k.teks}
              </button>
            );
          })}
        </div>
        {!beres ? (
          <button
            type="button"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa kalimat
          </button>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            Penjumlahan memeriksa pengurangan: {d.c} + {d.b} = {d.a}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuKeluarga({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KELUARGA[RONDE_KELUARGA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Keluarga Kalimat"
      warna="#FDE68A"
      petunjuk="Satu kalimat pengurangan punya keluarga kalimat yang benar. Ketuk semua kalimat yang benar, lalu tekan periksa. Kalimat yang salah jangan dipilih. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-keluarga"
      jumlahRonde={RONDE_KELUARGA.length}
      kunciAkhir={terakhir.c}
      belumSiap="Pilih kalimat yang benar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKeluarga ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

const KARTU_A = [16, 17, 18];
const KARTU_B = [2, 3, 4];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilihA, setPilihA] = useState<number | null>(null);
  const [pilihB, setPilihB] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const soal: { a: number; b: number } | null = tahap === 0 ? { a: 15, b: 3 } : pilihA !== null && pilihB !== null ? { a: pilihA, b: pilihB } : null;
  const n = soal ? soal.a - soal.b : null;
  const id = tahap === 0 ? "c6-tulis-0" : `c6-tulis-1-${pilihA ?? "x"}-${pilihB ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(
    suara && n !== null && soal !== null,
    n !== null && soal ? `${sebut(soal.a)} dikurangi ${sebut(soal.b)} sama dengan ${kata(n).toLowerCase()}. Sekarang guratkan angkanya di kanvas.` : ""
  );

  const kartu = (daftar: number[], nilai: number | null, set: (n: number) => void, nama: string) => (
    <div className="grid grid-cols-3 gap-2">
      {daftar.map((v) => (
        <button
          key={v}
          type="button"
          aria-label={`Pilih kartu ${nama} ${v}`}
          onClick={() => set(v)}
          className={`rounded-2xl border-4 border-[#1C01A5] py-2 text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${nilai === v ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "bg-[#FFE566]"}`}
        >
          {v}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Kurangkan dua bilangan, ucapkan hasilnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih satu kartu dari kelompok A dan satu kartu dari kelompok B.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa sisanya?" : soal ? "Ucapkan hasilnya" : "Pilih satu kartu A dan satu kartu B"}
          teks={
            tahap === 0
              ? "Tika membeli lima belas apel. Tiga apel dimakan ulat. Berapa sisanya? Ucapkan hasilnya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu kartu dari kelompok A dan satu kartu dari kelompok B. Kurangkan, pilih cara yang paling mudah menurutmu, ucapkan hasilnya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 && soal === null ? (
            <div className="space-y-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Kelompok A</p>
              {kartu(KARTU_A, pilihA, setPilihA, "A")}
              <p className="text-center text-sm font-black text-[#1C01A5]">Kelompok B</p>
              {kartu(KARTU_B, pilihB, setPilihB, "B")}
            </div>
          ) : soal ? (
            <>
              <Persamaan a={soal.a} b={soal.b} c={suara && n !== null ? n : "?"} t1="–" />
              <p className="text-center text-xl font-black text-[#1C01A5]">Sisanya: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
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
  "Ingat selalu! Kurang berarti ada yang diambil, dimakan, atau pergi. Kita bisa menghitung mundur dari bilangan pertama. Kita bisa memisahkan belasan menjadi sepuluh dan satuan, lalu mengurangkan satuannya. Dengan nilai tempat, satuan dikurangi satuan dan puluhan tetap. Kita bisa memeriksa hasil pengurangan dengan penjumlahan. Pilih cara yang paling mudah menurutmu.";

const POIN_C6: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "➖",
    nama: "Kurang artinya diambil",
    isi: <p className="text-center text-2xl font-black text-[#1C01A5]">15 – 3 = 12</p>,
    suara: "Kurang berarti ada yang diambil, dimakan, atau pergi. Lima belas dikurangi tiga sama dengan dua belas.",
  },
  {
    ikon: "⏪",
    nama: "Menghitung mundur",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">15, 14, 13, 12</p>,
    suara: "Mulai dari lima belas, hitung mundur tiga kali. Empat belas, tiga belas, dua belas.",
  },
  {
    ikon: "🧩",
    nama: "Pasangan bilangan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">15 = 10 + 5 • 5 – 3 = 2 • 10 + 2 = 12</p>,
    suara: "Lima belas dipisah menjadi sepuluh dan lima. Lima dikurangi tiga sama dengan dua. Sepuluh ditambah dua sama dengan dua belas.",
  },
  {
    ikon: "🏷️",
    nama: "Nilai tempat",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">satuan dikurangi • puluhan tetap</p>,
    suara: "Kurangkan satuan dengan satuan. Puluhannya tetap sama. Lima belas dikurangi tiga sama dengan dua belas.",
  },
  {
    ikon: "🔄",
    nama: "Cek dengan menambah",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">12 + 3 = 15</p>,
    suara: "Periksa pengurangan dengan penjumlahan. Dua belas ditambah tiga sama dengan lima belas, jadi hasilnya benar.",
  },
  {
    ikon: "✅",
    nama: "Pilih cara termudah",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">mundur untuk yang kecil • pasangan untuk belasan</p>,
    suara: "Pilih cara yang paling mudah menurutmu. Kalau yang dikurangkan kecil, hitung mundur. Untuk belasan, pakai pasangan bilangan atau nilai tempat.",
  },
];

function PoinPentingC6({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_C6.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan pengurangan"
            onClick={() => speakGuru("Cara menyebutkan pengurangan. Lima belas dikurangi tiga sama dengan dua belas. Sisa apel Tika adalah dua belas.")}
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
              { teks: "lima belas", warna: "#FECACA" },
              { teks: "dikurangi", warna: "#FFFFFF" },
              { teks: "tiga", warna: "#BFDBFE" },
              { teks: "sama dengan dua belas", warna: "#FFF7CC" },
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
            Ayo Berkarya di rumah: gambar buah apel pada pohon. Buat soal cerita pengurangan dari gambarmu, tulis operasi hitungnya, lalu selesaikan. Ceritakan hasilnya kepada temanmu atau keluargamu, dan periksa dengan penjumlahan.
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB C ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "rantai" | "keluarga" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "rantai" },
  { nomor: 9, tipe: "keluarga" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractKurangC(props: Umum) {
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
        <PoinPentingC6
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "rantai" ? <KartuRantai {...dasar} /> : null}
          {kartu.tipe === "keluarga" ? <KartuKeluarga {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
