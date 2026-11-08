"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, TOMBOL_KECIL, TOTAL_GAME, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { Bangun } from "./bentuk-a4-dasar";
import { GambarKereta, JUMLAH_KERETA, Keping, WARNA_C } from "./bangun-c4-dasar";
import { LangkahGabung, LangkahKereta, LangkahLidi, LangkahPas } from "./SubBabC4Concrete";
import { KartuFigur, KartuJodoh, KartuPotong } from "./SubBabC4Picture";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab C: Menyusun dan Mengurai Bentuk Bangun (Buku Siswa Kelas 1   */
/* hlm. 134-139). Semua di klien, tanpa API.                                  */
/* Naskah: naskah/mtk-1-bab4-sub-c-menyusun-dan-mengurai-bentuk.md             */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Gabung Dua Keping Kertas (seret), 2 Pas atau Tidak?            */
/*            (pilih potongan), 3 Bangun Kereta Balok (seret ke bayangan),     */
/*            4 Susun Lidi (ketuk garis putus-putus).                          */
/*  Picture:  (bentuk polos, tanpa gambar benda)                              */
/*            5 Garis Potong, 6 Jodohkan Keping dan Bangun,                    */
/*            7 Tunjuk dan Hitung.                                             */
/*  Abstract: 8 Benar atau Salah, 9 Hitung Keping,                             */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman menyusun dan mengurai bentuk. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_C4 = [
  {
    ikon: "🧩",
    nama: "Menyusun",
    ket: "Menggabungkan bentuk jadi bangun baru",
    suara: "Menyusun artinya menggabungkan beberapa bentuk menjadi bangun baru. Contohnya dua segitiga yang sama digabung menjadi segitiga yang lebih besar.",
  },
  {
    ikon: "🔧",
    nama: "Mengurai",
    ket: "Memisahkan bangun jadi bagian-bagiannya",
    suara: "Mengurai artinya memisahkan sebuah bangun menjadi bagian-bagiannya. Bagian yang kita dapat sama dengan bagian yang tadi digabungkan.",
  },
];

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2";
const TEPI = { stroke: BIRU, strokeWidth: 2.4, strokeLinejoin: "round" as const };
const PAN = { fill: "none", stroke: BIRU, strokeWidth: 3.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisSusunC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Menyusun dan Mengurai Bentuk</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="MENYUSUN DAN MENGURAI"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Menyusun artinya menggabungkan beberapa bentuk menjadi bangun baru. Mengurai artinya memisahkan sebuah bangun menjadi bagian-bagiannya. Menyusun dan mengurai adalah dua arah yang berlawanan."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <svg viewBox="0 0 300 110" className="h-auto w-full" role="img" aria-label="Dua segitiga menyusun segitiga besar, dan segitiga besar mengurai menjadi dua segitiga">
            <Keping titik={[[10, 80], [10, 36], [46, 80]]} isi={WARNA_C.merah} />
            <Keping titik={[[94, 80], [94, 36], [58, 80]]} isi={WARNA_C.biru} />
            <Keping titik={[[214, 80], [214, 36], [178, 80]]} isi={WARNA_C.merah} />
            <Keping titik={[[214, 80], [214, 36], [250, 80]]} isi={WARNA_C.biru} />
            <path d="M108 52 H172 M164 45 L172 52 L164 59" {...PAN} />
            <path d="M172 70 H108 M116 63 L108 70 L116 77" {...PAN} />
            <text x="140" y="42" textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
              menyusun
            </text>
            <text x="140" y="92" textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
              mengurai
            </text>
          </svg>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="DUA SEGITIGA, DUA CARA"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Dua segitiga yang sama besar dapat digabung dengan dua cara. Kalau dirapatkan pada sisi yang tegak, hasilnya segitiga yang lebih besar. Kalau dirapatkan pada sisi yang miring, hasilnya segi empat. Cara menggabungkan menentukan bangun yang terbentuk."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <svg viewBox="0 0 300 150" className="h-auto w-full" role="img" aria-label="Dua segitiga menjadi segitiga besar atau segi empat">
            <Keping titik={[[10, 60], [10, 20], [40, 60]]} isi={WARNA_C.merah} />
            <Keping titik={[[90, 60], [90, 20], [60, 60]]} isi={WARNA_C.biru} />
            <path d="M104 40 H160 M152 33 L160 40 L152 47" {...PAN} />
            <Keping titik={[[210, 60], [210, 20], [180, 60]]} isi={WARNA_C.merah} />
            <Keping titik={[[210, 60], [210, 20], [240, 60]]} isi={WARNA_C.biru} />
            <text x="268" y="44" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
              segitiga
            </text>
            <Keping titik={[[10, 132], [10, 92], [40, 132]]} isi={WARNA_C.biru} />
            <Keping titik={[[90, 92], [60, 92], [90, 132]]} isi={WARNA_C.merah} />
            <path d="M104 112 H160 M152 105 L160 112 L152 119" {...PAN} />
            <Keping titik={[[180, 132], [180, 92], [210, 132]]} isi={WARNA_C.biru} />
            <Keping titik={[[180, 92], [210, 92], [210, 132]]} isi={WARNA_C.merah} />
            <text x="256" y="116" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
              segi empat
            </text>
          </svg>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="BANGUN LAIN BISA DIGABUNG"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Bangun datar lain juga bisa digabung. Dua persegi yang sama besar, dirapatkan, menjadi persegi panjang. Bentuk bulat yang tinggal tiga perempat, digabung dengan potongan seperempat, menjadi bulat penuh. Dua bangun datar dapat digabungkan, dan hasilnya adalah bangun baru."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <svg viewBox="0 0 300 150" className="h-auto w-full" role="img" aria-label="Dua persegi menjadi persegi panjang, tiga perempat bulat dan seperempat menjadi bulat penuh">
            <rect x="8" y="26" width="28" height="28" fill={WARNA_C.kuning} {...TEPI} />
            <rect x="44" y="26" width="28" height="28" fill={WARNA_C.hijau} {...TEPI} />
            <path d="M82 40 H112 M104 33 L112 40 L104 47" {...PAN} />
            <rect x="122" y="26" width="28" height="28" fill={WARNA_C.kuning} {...TEPI} />
            <rect x="150" y="26" width="28" height="28" fill={WARNA_C.hijau} {...TEPI} />
            <text x="188" y="44" fontSize="11" fontWeight="900" fill={BIRU}>
              persegi panjang
            </text>
            <path d="M34 112 L56 112 A22 22 0 1 1 34 90 Z" fill={WARNA_C.merah} {...TEPI} />
            <path d="M84 112 L106 112 A22 22 0 0 0 84 90 Z" fill={WARNA_C.biru} {...TEPI} />
            <path d="M120 106 H146 M138 99 L146 106 L138 113" {...PAN} />
            <path d="M190 112 L212 112 A22 22 0 1 1 190 90 Z" fill={WARNA_C.merah} {...TEPI} />
            <path d="M190 112 L212 112 A22 22 0 0 0 190 90 Z" fill={WARNA_C.biru} {...TEPI} />
            <text x="262" y="116" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
              bulat penuh
            </text>
          </svg>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="KERETA DARI BENTUK"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara={`Kereta mainan disusun dari beberapa bentuk. Segi empat ada ${kataK(JUMLAH_KERETA.segiempat)}, yaitu cerobong, mesin, kabin, jendela, dan gerbong. Segitiga ada ${kataK(JUMLAH_KERETA.segitiga)}, yaitu moncong. Bentuk lengkung ada ${kataK(JUMLAH_KERETA.lengkung)}, yaitu roda. Semuanya ada sembilan bagian.`}
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <GambarKereta />
        </div>
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-xs text-[#FFE566]">
                <th className="px-1 py-1.5 text-left">Bentuk</th>
                <th className="px-1 py-1.5">Bagian kereta</th>
                <th className="px-1 py-1.5">Banyak</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Segi empat", "cerobong, mesin, kabin, jendela, gerbong", String(JUMLAH_KERETA.segiempat)],
                  ["Segitiga", "moncong", String(JUMLAH_KERETA.segitiga)],
                  ["Bentuk lengkung", "tiga roda", String(JUMLAH_KERETA.lengkung)],
                  ["Semuanya", "", "9"],
                ] as [string, string, string][]
              ).map(([b, bagian, n]) => (
                <tr key={b} className="border-t-2 border-[#1C01A5]/20">
                  <td className="px-1 py-1 text-left text-xs">{b}</td>
                  <td className="px-1 py-1 text-[10px] leading-tight">{bagian}</td>
                  <td className="bg-[#E8F7EE] px-1 py-1 text-lg text-[#166534]">{n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="RUMAH DAN PENYUSUNNYA"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Sebuah rumah mainan bisa diurai menjadi bagian-bagiannya. Atapnya segitiga. Dindingnya segi empat. Pintunya segi empat. Jendelanya juga segi empat. Jadi rumah ini tersusun dari satu segitiga dan tiga segi empat, semuanya ada empat bagian."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-xs text-[#FFE566]">
                <th className="px-1 py-1.5 text-left">Bagian rumah</th>
                <th className="px-1 py-1.5">Gambar</th>
                <th className="px-1 py-1.5">Bentuk</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Atap", "segitiga", "segitiga", WARNA_C.merah],
                  ["Dinding", "persegiPanjang", "segi empat", WARNA_C.kuning],
                  ["Pintu", "persegiPanjangTegak", "segi empat", WARNA_C.biru],
                  ["Jendela", "persegi", "segi empat", WARNA_C.biru],
                ] as ["Atap" | "Dinding" | "Pintu" | "Jendela", "segitiga" | "persegiPanjang" | "persegiPanjangTegak" | "persegi", string, string][]
              ).map(([bagian, jenis, nama, warna]) => (
                <tr key={bagian} className="border-t-2 border-[#1C01A5]/20">
                  <td className="px-1 py-1 text-left text-xs">{bagian}</td>
                  <td className="px-1 py-1">
                    <span className="flex justify-center">
                      <Bangun jenis={jenis} isi={warna} kelas="h-9 w-9" />
                    </span>
                  </td>
                  <td className="px-1 py-1 text-xs">{nama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">1 segitiga + 3 segi empat = 4 bagian</p>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="SUSUN DAN URAI ITU HITUNGAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Menyusun membuat bagian bertambah, jadi kita menjumlahkan. Kereta mainan: lima ditambah satu ditambah tiga sama dengan sembilan. Mengurai membuat bagian berkurang, jadi kita mengurangi. Kalau tiga roda dilepas, sembilan dikurang tiga sama dengan enam bagian yang tersisa."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className={SEL}>
            <p className="text-xs font-black text-[#0F766E]">Menyusun ➕</p>
            <p className="text-xl font-black text-[#1C01A5]">5 + 1 + 3 = 9</p>
            <p className="text-[11px] font-black text-[#1C01A5]/70">segi empat + segitiga + lengkung</p>
          </div>
          <div className={SEL}>
            <p className="text-xs font-black text-[#0F766E]">Mengurai ➖</p>
            <p className="text-xl font-black text-[#1C01A5]">9 − 3 = 6</p>
            <p className="text-[11px] font-black text-[#1C01A5]/70">tiga roda dilepas</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="BERAPA LIDI?"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Kita bisa menyusun bentuk dari lidi yang sama panjang. Segitiga memakai tiga lidi. Segi empat memakai empat lidi. Rumah memakai enam lidi, yaitu empat lidi untuk dinding dan dua lidi untuk atap. Sisi atas dinding juga menjadi dasar atap, jadi tidak perlu lidi tambahan di sana."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={SEL}>
            <svg viewBox="0 0 60 50" className="mx-auto h-12 w-14" aria-hidden="true">
              <path d="M30 6 L8 44 H52 Z" fill="none" stroke="#2F9E5B" strokeWidth="5" strokeLinejoin="round" />
            </svg>
            <p className="text-xs font-black text-[#1C01A5]">Segitiga</p>
            <p className="text-lg font-black text-[#166534]">3 lidi</p>
          </div>
          <div className={SEL}>
            <svg viewBox="0 0 60 50" className="mx-auto h-12 w-14" aria-hidden="true">
              <rect x="12" y="6" width="36" height="38" fill="none" stroke="#8B3FB5" strokeWidth="5" strokeLinejoin="round" />
            </svg>
            <p className="text-xs font-black text-[#1C01A5]">Segi empat</p>
            <p className="text-lg font-black text-[#166534]">4 lidi</p>
          </div>
          <div className={SEL}>
            <svg viewBox="0 0 60 50" className="mx-auto h-12 w-14" aria-hidden="true">
              <rect x="14" y="24" width="32" height="22" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinejoin="round" />
              <path d="M14 24 L30 6 L46 24" fill="none" stroke="#E53E3E" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-black text-[#1C01A5]">Rumah</p>
            <p className="text-lg font-black text-[#166534]">6 lidi</p>
          </div>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">4 lidi dinding + 2 lidi atap = 6 lidi</p>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="KREASI DARI BENTUK"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Dari bentuk-bentuk sederhana kita bisa membuat gambar yang menarik. Roket ini disusun dari satu segi empat, tiga segitiga, dan satu bentuk lengkung. Di Tiongkok ada permainan kuno bernama tangram. Tujuh keping bangun datar bisa disusun menjadi ribuan gambar. Kamu juga bisa berkreasi dengan potongan kertas warna."
      >
        <div className="flex items-center gap-3 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <svg viewBox="0 0 120 130" className="h-28 w-24 shrink-0" role="img" aria-label="Roket dari satu segi empat, tiga segitiga, dan satu bentuk lengkung">
            <polygon points="40,100 40,72 22,100" fill={WARNA_C.hijau} {...TEPI} />
            <polygon points="80,100 80,72 98,100" fill={WARNA_C.hijau} {...TEPI} />
            <rect x="40" y="36" width="40" height="64" fill={WARNA_C.biru} {...TEPI} />
            <polygon points="40,36 80,36 60,6" fill={WARNA_C.merah} {...TEPI} />
            <circle cx="60" cy="62" r="10" fill={WARNA_C.kuning} {...TEPI} />
          </svg>
          <p className="text-sm font-black leading-snug text-[#1C01A5]">
            Roket: <span className="rounded bg-[#FFE566] px-1">1 segi empat</span>, <span className="rounded bg-[#FFE566] px-1">3 segitiga</span>, dan{" "}
            <span className="rounded bg-[#FFE566] px-1">1 bentuk lengkung</span>. Tangram dari Tiongkok memakai 7 keping untuk ribuan gambar.
          </p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="AYO BERKARYA"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Ayo berkarya! Warnai bentuk-bentuk pada kertas. Gunting bentuk-bentuk itu dengan hati-hati. Susun menjadi gambar yang menarik. Lalu ceritakan kepada teman atau keluarga bentuk apa saja yang kamu pakai."
      >
        <div className="grid grid-cols-4 gap-1 text-center">
          {[
            ["🖍️", "Warnai"],
            ["✂️", "Gunting"],
            ["🧩", "Susun"],
            ["🗣️", "Ceritakan"],
          ].map(([ikon, nama], i) => (
            <div key={nama} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-[10px] font-black text-[#B45309]">{i + 1}</p>
              <p className="text-2xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-[10px] font-black leading-tight text-[#1C01A5]">{nama}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_C4.map((i) => (
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
/* Tahap 4: Concrete                                                          */
/* ------------------------------------------------------------------------ */

type TipeConcrete = "gabung" | "pas" | "kereta" | "lidi";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "gabung" },
  { nomor: 2, tipe: "pas" },
  { nomor: 3, tipe: "kereta" },
  { nomor: 4, tipe: "lidi" },
];

export function ConcreteSusunC(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, seret, dan susun!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "gabung" ? <LangkahGabung {...dasar} /> : null}
        {langkah.tipe === "pas" ? <LangkahPas {...dasar} /> : null}
        {langkah.tipe === "kereta" ? <LangkahKereta {...dasar} /> : null}
        {langkah.tipe === "lidi" ? <LangkahLidi {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Bentuk polos saja. Tidak ada gambar benda.               */
/* ------------------------------------------------------------------------ */

type TipePicture = "potong" | "jodoh" | "figur";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "potong" },
  { nomor: 6, tipe: "jodoh" },
  { nomor: 7, tipe: "figur" },
];

export function PictureSusunC(props: Umum) {
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
        {kartu.tipe === "potong" ? <KartuPotong {...dasar} /> : null}
        {kartu.tipe === "jodoh" ? <KartuJodoh {...dasar} /> : null}
        {kartu.tipe === "figur" ? <KartuFigur {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Benar atau Salah ---------------------------------- */

type SoalBenar = { kalimat: string; benar: boolean; jelas: string };

const RONDE_BENAR: SoalBenar[] = [
  {
    kalimat: "Dua segitiga yang sama besar bisa digabung menjadi segitiga yang lebih besar.",
    benar: true,
    jelas: "Betul. Kalau dua segitiga yang sama dirapatkan pada sisi yang tegak, hasilnya segitiga yang lebih besar.",
  },
  {
    kalimat: "Dua segitiga yang sama besar hanya bisa menjadi satu bangun saja.",
    benar: false,
    jelas: "Salah. Dua segitiga yang sama bisa menjadi segitiga yang lebih besar atau menjadi segi empat, tergantung cara menggabungkannya.",
  },
  {
    kalimat: "Mengurai artinya menggabungkan beberapa bentuk menjadi bangun baru.",
    benar: false,
    jelas: "Salah. Itu artinya menyusun. Mengurai artinya memisahkan sebuah bangun menjadi bagian-bagiannya.",
  },
  {
    kalimat: "Setelah sebuah bangun diurai, bagian-bagiannya bisa disusun lagi menjadi bangun yang sama.",
    benar: true,
    jelas: "Betul. Menyusun dan mengurai adalah dua arah yang berlawanan, jadi bagian-bagiannya bisa disusun kembali.",
  },
  {
    kalimat: "Kereta mainan disusun dari 5 segi empat, 1 segitiga, dan 3 bentuk lengkung. Semuanya ada 9 bagian.",
    benar: true,
    jelas: "Betul. Lima ditambah satu ditambah tiga sama dengan sembilan bagian.",
  },
];

function RondeBenar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_BENAR[ronde];
  const akhir = ronde === RONDE_BENAR.length - 1;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<boolean | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["c4-benar"] === true && akhir;
  useBicara(akhir ? suara : benar, s.jelas);

  const jawab = (j: boolean) => {
    if (benar) return;
    if (j === s.benar) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(j);
      setKabar({ teks: s.jelas.replace(/^(Betul|Salah)\.\s*/, ""), ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat! Ucapkan banyaknya." : benar ? (akhir ? "Ucapkan: banyak bagian kereta" : "Jawabanmu tepat!") : "Benar atau salah?"}
        teks={`Dengarkan kalimatnya. ${s.kalimat} Apakah kalimat itu benar atau salah? Ketuk jawabanmu.${akhir ? " Setelah itu, ucapkan berapa banyak bagian kereta semuanya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-4 text-center text-lg font-black leading-relaxed text-[#1C01A5]">{s.kalimat}</p>
        <div className="grid grid-cols-2 gap-2">
          {[true, false].map((j) => (
            <button
              key={`${j}-${keliru === j ? "x" : "o"}`}
              type="button"
              aria-label={j ? "Benar" : "Salah"}
              disabled={benar}
              onClick={() => jawab(j)}
              className={`rounded-2xl border-4 border-[#1C01A5] py-4 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-50 ${
                j ? "bg-[#BBF7D0]" : "bg-[#FECACA]"
              } ${benar && j === s.benar ? "ring-4 ring-[#7FCB96]" : ""} ${keliru === j ? "igil-goyang" : ""}`}
            >
              {j ? "✅ Benar" : "❌ Salah"}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuBenar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Benar atau Salah"
      warna="#C7D2FE"
      petunjuk="Dengarkan atau baca kalimatnya. Ketuk Benar atau Salah. Pada soal terakhir, ucapkan berapa banyak bagian kereta semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-benar"
      jumlahRonde={RONDE_BENAR.length}
      kunciAkhir={JUMLAH_KERETA.segiempat + JUMLAH_KERETA.segitiga + JUMLAH_KERETA.lengkung}
      belumSiap="Jawab Benar atau Salah dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBenar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Hitung Keping ------------------------------------- */

type SoalHitung = { cerita: string; a: number; op: "+" | "-"; b: number; petunjuk: string };

const RONDE_HITUNG: SoalHitung[] = [
  {
    cerita: "Wei menyusun 3 keping merah dan 3 keping biru menjadi satu bangun. Berapa keping yang Wei pakai?",
    a: 3,
    op: "+",
    b: 3,
    petunjuk: "Menyusun berarti menggabungkan. Mulai dari 3, lalu hitung maju 3 kali: empat, lima, enam.",
  },
  {
    cerita: "Sebuah bangun tersusun dari 8 keping. Halim mengurainya dan mengambil 3 keping. Berapa keping yang tersisa?",
    a: 8,
    op: "-",
    b: 3,
    petunjuk: "Mengurai berarti memisahkan, jadi keping berkurang. Mulai dari 8, lalu hitung mundur 3 kali: tujuh, enam, lima.",
  },
  {
    cerita: "Tika memakai 3 lidi untuk segitiga dan 4 lidi untuk segi empat. Berapa lidi semuanya?",
    a: 3,
    op: "+",
    b: 4,
    petunjuk: "Mulai dari 4, lalu hitung maju 3 kali: lima, enam, tujuh.",
  },
];

function RondeHitung({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_HITUNG[ronde];
  const akhir = ronde === RONDE_HITUNG.length - 1;
  const hasil = s.op === "+" ? s.a + s.b : s.a - s.b;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["c4-hitung"] === true && akhir;
  useBicara(akhir ? suara : benar, `${kataK(s.a)} ${s.op === "+" ? "ditambah" : "dikurang"} ${kataK(s.b)} sama dengan ${kataK(hasil)}.`);

  const pilih = (n: number) => {
    if (benar) return;
    if (n === hasil) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: s.petunjuk, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat! Ucapkan jawabannya." : benar ? (akhir ? "Ucapkan: banyak lidi semuanya" : "Hitunganmu tepat!") : "Hitung keping dan lidinya"}
        teks={`${s.cerita} Ketuk angka jawabanmu.${akhir ? " Setelah itu, ucapkan berapa banyak lidi semuanya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-3 text-center text-lg font-black leading-snug text-[#1C01A5]">{s.cerita}</p>
        <p className="text-center text-4xl font-black text-[#1C01A5]">
          {s.a} {s.op === "+" ? "+" : "−"} {s.b} = <span className={benar ? "text-[#166534]" : "text-[#1C01A5]/50"}>{benar ? hasil : "?"}</span>
        </p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, n) => (
            <button
              key={`${n}-${keliru === n ? "x" : "o"}`}
              type="button"
              aria-label={`Angka ${n}`}
              disabled={benar}
              onClick={() => pilih(n)}
              className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-50 ${
                keliru === n ? "igil-goyang" : ""
              } ${benar && n === hasil ? "ring-4 ring-[#7FCB96]" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuHitung({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhirSoal = RONDE_HITUNG[RONDE_HITUNG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung Keping"
      warna="#C7D2FE"
      petunjuk="Baca ceritanya. Menyusun berarti menjumlahkan, mengurai berarti mengurangi. Ketuk angka jawabanmu. Pada soal terakhir, ucapkan berapa lidi semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-hitung"
      jumlahRonde={RONDE_HITUNG.length}
      kunciAkhir={akhirSoal.a + akhirSoal.b}
      belumSiap="Jawab soalnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeHitung ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

const PILIHAN_TULIS: { id: string; teks: string; n: number }[] = [
  { id: "segitiga", teks: "Lidi untuk segitiga", n: 3 },
  { id: "rumah", teks: "Lidi untuk rumah", n: 6 },
  { id: "kereta", teks: "Segi empat pada kereta", n: 5 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((p) => p.id === pilih) ?? null;
  const g = tahap === 0 ? { teks: "Lidi untuk satu segi empat", n: 4 } : pil;
  const id = tahap === 0 ? "c4-tulis-0" : `c4-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && g !== null, g ? `${g.teks} ada ${kataK(g.n)}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Ucapkan banyaknya, lalu guratkan angkanya di kanvas. Setelah itu, pilih bagian yang kamu suka.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Lidi untuk segi empat ada berapa?" : pil ? `Ucapkan: banyak ${pil.teks.toLowerCase()}` : "Pilih satu hitungan"}
          teks={
            tahap === 0
              ? "Lidi untuk satu segi empat ada berapa? Segi empat punya empat sisi, dan setiap sisi memakai satu lidi. Ucapkan jawabannya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih satu hitungan sesukamu. Ucapkan jawabannya, lalu guratkan angkanya di kanvas. Lidi untuk segitiga ada tiga. Lidi untuk rumah ada enam. Segi empat pada kereta ada lima."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Satu segi empat • empat sisi • satu lidi tiap sisi</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {PILIHAN_TULIS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Pilih ${p.teks}`}
                  disabled={pilih !== null}
                  onClick={() => setPilih(p.id)}
                  className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-sm font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${
                    pilih === p.id ? "bg-[#7FCB96]" : "bg-[#FFE566]"
                  }`}
                >
                  {p.teks}
                </button>
              ))}
            </div>
          )}
          {g ? (
            <p className="text-center text-2xl font-black text-[#1C01A5]">
              {g.teks} = {suara ? g.n : "?"}
            </p>
          ) : null}
        </div>
        {g ? <JawabSuara id={id} jumlah={g.n} panel={panel} siap belumSiap="" /> : null}
        {suara && g ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={g.n} kata={kata(g.n)} onCompletedTrace={() => setLulus(true)} />
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
  "Ingat selalu! Menyusun artinya menggabungkan beberapa bentuk menjadi bangun baru. Mengurai artinya memisahkan bangun menjadi bagian-bagiannya. Dua segitiga yang sama bisa menjadi segitiga yang lebih besar atau segi empat. Kereta mainan tersusun dari lima segi empat, satu segitiga, dan tiga bentuk lengkung. Segitiga memakai tiga lidi, segi empat empat lidi, dan rumah enam lidi.";

const POIN_C4: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🧩",
    nama: "Menyusun",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">menggabungkan bentuk jadi bangun baru</p>,
    suara: "Menyusun artinya menggabungkan beberapa bentuk menjadi bangun baru. Dua bangun datar yang digabung menghasilkan bangun baru.",
  },
  {
    ikon: "🔧",
    nama: "Mengurai",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">memisahkan bangun jadi bagian-bagiannya</p>,
    suara: "Mengurai artinya memisahkan sebuah bangun menjadi bagian-bagiannya. Bagian yang didapat sama dengan bagian yang tadi digabungkan.",
  },
  {
    ikon: "🔺",
    nama: "Dua segitiga",
    isi: (
      <div className="flex flex-wrap justify-center gap-1.5">
        {["segitiga besar", "segi empat"].map((a) => (
          <span key={a} className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 text-sm font-black text-[#1C01A5]">
            {a}
          </span>
        ))}
      </div>
    ),
    suara: "Dua segitiga yang sama besar bisa menjadi segitiga yang lebih besar, atau menjadi segi empat. Cara menggabungkan menentukan hasilnya.",
  },
  {
    ikon: "🔢",
    nama: "Hitung bagian",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">5 + 1 + 3 = 9</p>,
    suara: "Setelah menyusun, hitung banyak bagian setiap jenis. Lima segi empat ditambah satu segitiga ditambah tiga bentuk lengkung sama dengan sembilan bagian.",
  },
  {
    ikon: "🪵",
    nama: "Banyak lidi",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">segitiga 3 • segi empat 4 • rumah 6</p>,
    suara: "Segitiga memakai tiga lidi. Segi empat memakai empat lidi. Rumah memakai enam lidi, karena sisi atas dinding juga menjadi dasar atap.",
  },
];

const CATATANKU = [
  "Aku sudah mengerti berbagai bentuk bangun.",
  "Aku dapat mengelompokkan bentuk.",
  "Aku dapat menyusun bentuk baru.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
];

function Catatanku({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => CATATANKU.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {CATATANKU.map((tx, i) => (
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
          className="igil-tanpa-tepi flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingC4({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_C4.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan susunan"
            onClick={() => speakGuru("Cara menyebutkan susunan. Kereta disusun dari lima segi empat, satu segitiga, dan tiga bentuk lengkung.")}
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
              { teks: "Kereta disusun dari", warna: "#FFFFFF" },
              { teks: "5 segi empat", warna: "#FFE566" },
              { teks: "1 segitiga", warna: "#7FCB96" },
              { teks: "3 bentuk lengkung", warna: "#FFE566" },
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
            Ayo Berkarya di rumah: gunting kertas warna menjadi beberapa bentuk. Susun menjadi gambar yang menarik, lalu ceritakan bentuk apa saja yang kamu pakai.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB C ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "benar" | "hitung" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "benar" },
  { nomor: 9, tipe: "hitung" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractSusunC(props: Umum) {
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
        <PoinPentingC4
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "benar" ? <KartuBenar {...dasar} /> : null}
          {kartu.tipe === "hitung" ? <KartuHitung {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
