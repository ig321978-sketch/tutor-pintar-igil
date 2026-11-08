"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, Persamaan, PilihAngka, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { BingkaiGanda, GarisBilangan, Ikatan, LingkariSepuluh, sebut } from "./belas-a5-dasar";
import { LangkahHitung, LangkahIkat, LangkahKotak, LangkahTebak } from "./SubBabA5Concrete";
import { KartuJodoh, KartuLoncat, KartuWarna } from "./SubBabA5Picture";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 20       */
/* (Buku Siswa Kelas 1 hlm. 147-158). Semua di klien, tanpa API.              */
/* Naskah: naskah/mtk-1-bab5-sub-a-menghitung-membaca-menulis-bilangan.md      */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Isi Kotak Sepuluh (seret), 2 Hitung Satu per Satu (ketuk),    */
/*            3 Ikat Sepuluh Pensil (pilih dan ikat), 4 Tebak Isi Stoples     */
/*            (menebak dan membuktikan).                                      */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Warnai Dua Bingkai, 6 Jodohkan Gambar dan Pasangan,           */
/*            7 Loncat di Garis Bilangan.                                     */
/*  Abstract: 8 Isi Kalimat Bilangan, 9 Detektif Bilangan Misterius,          */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman bilangan sebelas sampai dua puluh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_A5 = [
  {
    ikon: "📦",
    nama: "Sepuluh dulu",
    ket: "Isi sepuluh, baru hitung sisanya",
    suara: "Isi sepuluh dulu sampai penuh. Setelah itu hitung sisanya. Sepuluh ditambah sisanya adalah banyak seluruhnya.",
  },
  {
    ikon: "🗣️",
    nama: "Belas",
    ket: "Sepuluh dan beberapa lagi",
    suara: "Nama bilangan tiga belas sampai sembilan belas memakai kata belas. Belas artinya sepuluh dan beberapa lagi.",
  },
];

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2";

const TABEL_11_15: [number, string, string][] = [
  [11, "sebelas", "se-be-las"],
  [12, "dua belas", "dua-be-las"],
  [13, "tiga belas", "ti-ga-be-las"],
  [14, "empat belas", "em-pat-be-las"],
  [15, "lima belas", "li-ma-be-las"],
];

const TABEL_16_20: [number, string, string][] = [
  [16, "enam belas", "e-nam-be-las"],
  [17, "tujuh belas", "tu-juh-be-las"],
  [18, "delapan belas", "de-la-pan-be-las"],
  [19, "sembilan belas", "sem-bi-lan-be-las"],
  [20, "dua puluh", "dua-pu-luh"],
];

function TabelBilangan({ baris }: { baris: [number, string, string][] }) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
      <div className="grid grid-cols-[3.2rem_1fr_1fr_3.6rem] bg-[#FFE566] px-1 py-1 text-[10px] font-black leading-tight text-[#1C01A5]">
        <span>Lambang</span>
        <span>Nama</span>
        <span>Cara membaca</span>
        <span>10 +</span>
      </div>
      {baris.map(([n, nama, baca], i) => (
        <div key={n} className={`grid grid-cols-[3.2rem_1fr_1fr_3.6rem] items-center px-1 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
          <span className="text-2xl font-black text-[#1C01A5]">{n}</span>
          <span className="text-sm font-black leading-tight text-[#1C01A5]">{nama}</span>
          <span className="text-xs font-black leading-tight text-[#7C3AED]">{baca}</span>
          <span className="text-sm font-black text-[#166534]">{n === 20 ? "10" : n - 10}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisBelasA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Bilangan sampai 20</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="SEPULUH DULU, LALU SISANYA"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Untuk menghitung banyak benda yang lebih dari sepuluh, isi dulu satu bingkai sampai penuh. Bingkai penuh berisi sepuluh. Setelah itu hitung sisanya di bingkai kedua. Di sini sisanya tiga. Sepuluh ditambah tiga menjadi tiga belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <BingkaiGanda isi={13} kelas="h-16 w-full max-w-[320px]" />
          <p className="pt-1 text-center text-2xl font-black text-[#1C01A5]">10 + 3 = 13</p>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Merah: sepuluh yang pertama. Biru: sisanya.</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="BILANGAN 11 SAMPAI 15"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Sebelas, sepuluh ditambah satu. Dua belas, sepuluh ditambah dua. Tiga belas, sepuluh ditambah tiga. Empat belas, sepuluh ditambah empat. Lima belas, sepuluh ditambah lima. Perhatikan cara membacanya: se-be-las, dua-be-las, ti-ga-be-las, em-pat-be-las, li-ma-be-las."
      >
        <TabelBilangan baris={TABEL_11_15} />
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="BILANGAN 16 SAMPAI 20"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Enam belas, sepuluh ditambah enam. Tujuh belas, sepuluh ditambah tujuh. Delapan belas, sepuluh ditambah delapan. Sembilan belas, sepuluh ditambah sembilan. Dua puluh, sepuluh ditambah sepuluh. Dua puluh tidak memakai kata belas, namanya dua puluh."
      >
        <TabelBilangan baris={TABEL_16_20} />
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="PASANGAN BILANGAN"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Bagan pasangan bilangan menunjukkan bilangan utuh di atas dan dua bagiannya di bawah. Empat belas terdiri dari sepuluh dan empat. Tujuh belas terdiri dari sepuluh dan tujuh. Kita membacanya: sepuluh ditambah empat menjadi empat belas."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className={SEL}>
            <Ikatan atas={14} kiri={10} kanan={4} />
            <p className="text-center text-xs font-black text-[#1C01A5]">10 ditambah 4 menjadi 14</p>
          </div>
          <div className={SEL}>
            <Ikatan atas={17} kiri={10} kanan={7} />
            <p className="text-center text-xs font-black text-[#1C01A5]">10 ditambah 7 menjadi 17</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="SATU PULUHAN, BERAPA SATUAN"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Bilangan sebelas sampai dua puluh ditulis dengan dua angka. Angka di kiri menunjukkan banyak puluhan, angka di kanan menunjukkan banyak satuan. Pada tiga belas, angka satu di kiri berarti satu puluhan, yaitu sepuluh. Angka tiga di kanan berarti tiga satuan. Jadi tiga belas sama dengan sepuluh ditambah tiga. Nanti di sub-bab nilai tempat, kita belajar lebih dalam."
      >
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FECACA] text-5xl font-black text-[#1C01A5]">1</span>
            <p className="pt-1 text-[11px] font-black text-[#1C01A5]">satu puluhan</p>
            <p className="text-xs font-black text-[#B91C1C]">= 10</p>
          </div>
          <div className="text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#BFDBFE] text-5xl font-black text-[#1C01A5]">3</span>
            <p className="pt-1 text-[11px] font-black text-[#1C01A5]">tiga satuan</p>
            <p className="text-xs font-black text-[#1D4ED8]">= 3</p>
          </div>
          <p className="text-xl font-black text-[#1C01A5]">
            = 10 + 3
            <br />= 13
          </p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="GARIS BILANGAN 10 SAMPAI 20"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Di garis bilangan, bilangan makin ke kanan makin besar. Mulai dari sepuluh, lalu melompat lima kali ke kanan. Kita mendarat di lima belas. Jadi sepuluh ditambah lima sama dengan lima belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisBilangan lompat={[[10, 15]]} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Mulai di 10, loncat 5 kali, mendarat di 15</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="DUA PULUH: DUA BINGKAI PENUH"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Kalau dua bingkai sama-sama penuh, banyaknya sepuluh ditambah sepuluh. Hasilnya dua puluh. Dua puluh adalah bilangan terbesar yang kita pelajari di bab ini."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <BingkaiGanda isi={20} kelas="h-16 w-full max-w-[320px]" />
          <p className="pt-1 text-center text-2xl font-black text-[#1C01A5]">10 + 10 = 20</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="LINGKARI SETIAP SEPULUH"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Ketika benda tersebar, lingkari sepuluh benda lebih dulu. Benda yang sudah dilingkari tidak perlu dihitung lagi. Lalu hitung benda yang tidak dilingkari. Di sini sisanya empat, jadi sepuluh ditambah empat sama dengan empat belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <LingkariSepuluh jumlah={14} />
          <p className="text-center text-xl font-black text-[#1C01A5]">10 + 4 = 14</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="TEBAK DAN BUKTIKAN"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Kita boleh menebak atau mengira-ngira banyak benda. Tiga langkahnya: tebak, hitung, lalu bandingkan. Hitung benda untuk membuktikan tebakanmu. Kegiatan ini melatih kemampuan berhitung."
      >
        <div className="grid grid-cols-3 gap-1 text-center">
          {[
            ["🤔", "Tebak", "kira-kira berapa?"],
            ["🔢", "Hitung", "satu per satu"],
            ["⚖️", "Bandingkan", "tebakan dan hitungan"],
          ].map(([ikon, nama, ket], i) => (
            <div key={nama} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-[10px] font-black text-[#0E7490]">{i + 1}</p>
              <p className="text-2xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-xs font-black leading-tight text-[#1C01A5]">{nama}</p>
              <p className="text-[10px] font-black leading-tight text-[#1C01A5]/70">{ket}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_A5.map((i) => (
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

type TipeConcrete = "kotak" | "hitung" | "ikat" | "tebak";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "kotak" },
  { nomor: 2, tipe: "hitung" },
  { nomor: 3, tipe: "ikat" },
  { nomor: 4, tipe: "tebak" },
];

export function ConcreteBelasA(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, seret, dan hitung!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "kotak" ? <LangkahKotak {...dasar} /> : null}
        {langkah.tipe === "hitung" ? <LangkahHitung {...dasar} /> : null}
        {langkah.tipe === "ikat" ? <LangkahIkat {...dasar} /> : null}
        {langkah.tipe === "tebak" ? <LangkahTebak {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "warna" | "jodoh" | "loncat";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "warna" },
  { nomor: 6, tipe: "jodoh" },
  { nomor: 7, tipe: "loncat" },
];

export function PictureBelasA(props: Umum) {
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
        {kartu.tipe === "warna" ? <KartuWarna {...dasar} /> : null}
        {kartu.tipe === "jodoh" ? <KartuJodoh {...dasar} /> : null}
        {kartu.tipe === "loncat" ? <KartuLoncat {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/** Tiga pilihan di sekitar kunci, urutan diputar supaya kunci tidak selalu di tengah. */
function opsiBelas(n: number): number[] {
  const dasar = [n - 1, n, n + 1];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/* --------- Permainan 8. Isi Kalimat Bilangan ------------------------------ */

type SoalIsi = { bentuk: "kalimat" | "tambah"; a: number; b: number | "?"; c: number | "?"; jawab: number; petunjuk: string };

const RONDE_ISI: SoalIsi[] = [
  { bentuk: "kalimat", a: 10, b: 3, c: "?", jawab: 13, petunjuk: "Sepuluh ditambah tiga. Mulai dari sepuluh, lalu hitung maju tiga kali." },
  { bentuk: "kalimat", a: 10, b: 7, c: "?", jawab: 17, petunjuk: "Sepuluh ditambah tujuh. Angka satuannya adalah tujuh." },
  { bentuk: "tambah", a: 10, b: 5, c: "?", jawab: 15, petunjuk: "Mulai dari sepuluh, hitung maju lima kali." },
  { bentuk: "tambah", a: 10, b: "?", c: 16, jawab: 6, petunjuk: "Enam belas itu sepuluh dan berapa lagi? Hitung maju dari sepuluh sampai enam belas." },
  { bentuk: "tambah", a: 10, b: 8, c: "?", jawab: 18, petunjuk: "Sepuluh ditambah delapan. Hitung maju delapan kali dari sepuluh." },
];

function RondeIsi({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_ISI[ronde];
  const akhir = ronde === RONDE_ISI.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const total = d.c === "?" ? d.jawab : d.c;
  const bagian = d.b === "?" ? d.jawab : d.b;
  const suara = panel.suara["a5-isi"] === true && akhir;
  const kalimat = `${sebut(10)} ditambah ${sebut(bagian)} sama dengan ${sebut(total)}`;
  useBicara(akhir ? suara : beres, `${kalimat}.`);

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
      setKabar({ teks: d.petunjuk, ok: false });
    }
  };

  const tampilB = d.b === "?" ? (beres ? d.jawab : "?") : d.b;
  const tampilC = d.c === "?" ? (beres && !(akhir && !suara) ? d.jawab : "?") : d.c;

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: hasilnya" : "Kalimatmu benar!") : "Lengkapi kalimatnya"}
        teks={`Lengkapi kalimat bilangan ini. ${d.bentuk === "kalimat" ? `Sepuluh ditambah ${sebut(bagian)} menjadi berapa?` : d.b === "?" ? `Sepuluh ditambah berapa sama dengan ${sebut(total)}?` : `Sepuluh ditambah ${sebut(bagian)} sama dengan berapa?`}${akhir ? " Terakhir, ucapkan hasilnya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        {d.bentuk === "kalimat" ? (
          <p className="text-center text-3xl font-black leading-snug text-[#1C01A5]">
            10 ditambah {d.b}
            <br />
            menjadi <span className="inline-block min-w-[3.5rem] rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-2">{tampilC}</span>
          </p>
        ) : (
          <Persamaan a={d.a} b={tampilB as number | "?"} c={tampilC as number | "?"} />
        )}
        <PilihAngka opsi={opsiBelas(d.jawab)} keliru={keliru} onPilih={pilih} mati={beres} />
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuIsi({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Kalimat Bilangan"
      warna="#BBF7D0"
      petunjuk="Lengkapi kalimat bilangan dengan mengetuk angka yang benar. Ada kalimat sepuluh ditambah sekian menjadi sekian, dan ada yang bagian tengahnya hilang. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-isi"
      jumlahRonde={RONDE_ISI.length}
      kunciAkhir={RONDE_ISI[RONDE_ISI.length - 1].jawab}
      belumSiap="Lengkapi kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeIsi ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Bilangan Misterius ----------------------- */

type SoalDetektif = { petunjuk: string[]; opsi: number[]; jawab: number; salah: string };

const RONDE_DETEKTIF: SoalDetektif[] = [
  {
    petunjuk: ["Aku datang tepat setelah 14.", "Aku lebih kecil dari 16."],
    opsi: [16, 15, 13],
    jawab: 15,
    salah: "Hitung maju satu dari empat belas. Bilangan itu juga lebih kecil dari enam belas.",
  },
  {
    petunjuk: ["Namaku tujuh belas.", "Tulislah lambangku."],
    opsi: [7, 17, 71],
    jawab: 17,
    salah: "Tujuh belas ditulis dengan angka satu di kiri dan angka tujuh di kanan: satu puluhan dan tujuh satuan.",
  },
  {
    petunjuk: ["Aku sama dengan 10 ditambah 6.", "Namaku memakai kata belas."],
    opsi: [6, 15, 16],
    jawab: 16,
    salah: "Sepuluh ditambah enam menjadi enam belas. Bilangan enam saja bukan bilangan belas.",
  },
  {
    petunjuk: ["Aku datang tepat sebelum 20.", "Aku punya dua angka."],
    opsi: [18, 19, 20],
    jawab: 19,
    salah: "Hitung mundur satu dari dua puluh. Bilangan itu bernama sembilan belas.",
  },
];

function RondeDetektif({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_DETEKTIF[ronde];
  const akhir = ronde === RONDE_DETEKTIF.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a5-detektif"] === true && akhir;
  useBicara(akhir ? suara : beres, `Bilangan misterius itu adalah ${sebut(d.jawab)}. Lambangnya ${d.jawab}.`);

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

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangan itu" : "Kamu detektif hebat!") : "Siapa aku?"}
        teks={`Aku bilangan misterius. ${d.petunjuk.join(" ")} Bilangan apakah aku?${akhir ? " Setelah ketemu, ucapkan bilangan itu." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1.5">
          {d.petunjuk.map((p, i) => (
            <p key={p} className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
              🔎 Petunjuk {i + 1}: {p}
            </p>
          ))}
        </div>
        <PilihAngka opsi={d.opsi.slice().sort((a, b) => a - b)} keliru={keliru} onPilih={pilih} mati={beres} />
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? "Aku bilangan: ?" : `Aku bilangan ${d.jawab}, dibaca ${sebut(d.jawab)}.`}
          </p>
        ) : null}
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
      judul="Detektif Bilangan Misterius"
      warna="#FDE68A"
      petunjuk="Baca petunjuk tentang bilangan misterius, lalu pilih bilangan yang cocok dengan semua petunjuk. Pada soal terakhir, ucapkan bilangan itu."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-detektif"
      jumlahRonde={RONDE_DETEKTIF.length}
      kunciAkhir={RONDE_DETEKTIF[RONDE_DETEKTIF.length - 1].jawab}
      belumSiap="Temukan bilangan misterius dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

const PILIHAN_TULIS: { id: string; n: number }[] = [
  { id: "lima-belas", n: 15 },
  { id: "tujuh-belas", n: 17 },
  { id: "dua-puluh", n: 20 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((p) => p.id === pilih) ?? null;
  const n = tahap === 0 ? 12 : (pil?.n ?? null);
  const id = tahap === 0 ? "a5-tulis-0" : `a5-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && n !== null, n !== null ? `${kata(n)}. Lambangnya ${n}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Baca nama bilangannya, ucapkan, lalu guratkan angkanya di kanvas. Setelah itu, pilih bilangan yang kamu suka.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Baca dan ucapkan namanya" : n ? `Ucapkan: ${kata(n)}` : "Pilih satu bilangan"}
          teks={
            tahap === 0
              ? "Baca nama bilangan ini: dua belas. Ucapkan namanya, lalu guratkan lambangnya di kanvas. Dua belas ditulis dengan angka satu dan angka dua."
              : "Ayo mencoba. Pilih satu bilangan sesukamu: lima belas, tujuh belas, atau dua puluh. Ucapkan namanya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Nama bilangan: dua belas • sepuluh ditambah dua</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {PILIHAN_TULIS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Pilih ${kata(p.n)}`}
                  disabled={pilih !== null}
                  onClick={() => setPilih(p.id)}
                  className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${
                    pilih === p.id ? "bg-[#7FCB96]" : "bg-[#FFE566]"
                  }`}
                >
                  {kata(p.n)}
                </button>
              ))}
            </div>
          )}
          {n !== null ? (
            <p className="text-center text-2xl font-black text-[#1C01A5]">
              {kata(n)} = {suara ? n : "?"}
            </p>
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
  "Ingat selalu! Isi sepuluh dulu, baru hitung sisanya. Sepuluh ditambah sisanya adalah banyak seluruhnya. Bilangan sebelas sampai sembilan belas terdiri dari sepuluh dan beberapa lagi. Dua puluh adalah sepuluh ditambah sepuluh. Di garis bilangan, bilangan makin ke kanan makin besar. Kamu boleh menebak dulu, lalu membuktikan dengan menghitung.";

const NAMA_BILANGAN: [number, string][] = [
  [11, "sebelas"],
  [12, "dua belas"],
  [13, "tiga belas"],
  [14, "empat belas"],
  [15, "lima belas"],
  [16, "enam belas"],
  [17, "tujuh belas"],
  [18, "delapan belas"],
  [19, "sembilan belas"],
  [20, "dua puluh"],
];

const POIN_A5: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "📦",
    nama: "Sepuluh dulu",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 + sisanya = seluruhnya</p>,
    suara: "Isi sepuluh dulu sampai penuh. Lalu hitung sisanya. Sepuluh ditambah sisanya adalah banyak seluruhnya.",
  },
  {
    ikon: "🗣️",
    nama: "Nama bilangan",
    isi: (
      <div className="grid grid-cols-2 gap-1">
        {NAMA_BILANGAN.map(([n, nama]) => (
          <span key={n} className="rounded-xl border-2 border-[#1C01A5] bg-[#FFE566] px-1 py-0.5 text-center text-sm font-black leading-tight text-[#1C01A5]">
            {n} {nama}
          </span>
        ))}
      </div>
    ),
    suara:
      "Sebelas, dua belas, tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas, sembilan belas, dan dua puluh. Nama bilangan tiga belas sampai sembilan belas memakai kata belas.",
  },
  {
    ikon: "➕",
    nama: "Sepuluh ditambah",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 + 4 = 14</p>,
    suara: "Bilangan sebelas sampai sembilan belas adalah sepuluh ditambah satuannya. Sepuluh ditambah empat menjadi empat belas.",
  },
  {
    ikon: "🔟",
    nama: "Dua puluh",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 + 10 = 20</p>,
    suara: "Dua bingkai yang sama-sama penuh berisi sepuluh ditambah sepuluh. Hasilnya dua puluh.",
  },
  {
    ikon: "📏",
    nama: "Garis bilangan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">makin ke kanan makin besar</p>,
    suara: "Di garis bilangan, bilangan makin ke kanan makin besar. Mulai dari sepuluh, melompat ke kanan sebanyak sisanya.",
  },
  {
    ikon: "🔍",
    nama: "Tebak dan buktikan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">tebak, hitung, bandingkan</p>,
    suara: "Kita boleh menebak banyak benda. Lalu hitung untuk membuktikan, dan bandingkan tebakan dengan hasil hitungan.",
  },
];

const REFLEKSI = [
  "Aku bisa menghitung benda sampai 20.",
  "Aku bisa membaca dan menulis bilangan 11 sampai 20.",
  "Aku tahu cara menghitung yang rapi: sepuluh dulu.",
  "Aku tidak malu menebak lalu membuktikan.",
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
          className="igil-tanpa-tepi flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingA5({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_A5.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan banyak benda"
            onClick={() => speakGuru("Cara menyebutkan banyak benda. Banyak kelereng Halim adalah lima belas.")}
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
              { teks: "Banyak kelereng Halim", warna: "#FFFFFF" },
              { teks: "adalah", warna: "#FFFFFF" },
              { teks: "15", warna: "#FFE566" },
              { teks: "lima belas", warna: "#7FCB96" },
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
            Ayo Bermain di rumah: siapkan stoples kosong atau kantong plastik kosong. Masukkan beberapa benda, lalu minta temanmu menebak banyaknya. Hitung bersama, dan lihat apakah tebakannya tepat.
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB A ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "isi" | "detektif" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "isi" },
  { nomor: 9, tipe: "detektif" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractBelasA(props: Umum) {
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
        <PoinPentingA5
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "isi" ? <KartuIsi {...dasar} /> : null}
          {kartu.tipe === "detektif" ? <KartuDetektif {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
