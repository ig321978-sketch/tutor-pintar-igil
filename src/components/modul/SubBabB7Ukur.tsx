"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, Kotak, PilihAngka, Tanda, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
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
import { BIRU, HIJAU } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { AdeganCara } from "./gambar-ukur-b7";
import {
  BukuG,
  DepaG,
  KakiG,
  KlipG,
  KoinG,
  MERAH_B7,
  MejaG,
  PensilG,
  PilihKata,
  RefleksiBab7,
  SedotanG,
  StikG,
  TanganG,
  WARNA_BATANG,
} from "./ukur-7-dasar";
import { LangkahBalok, LangkahDuaAlat, LangkahSusun, LangkahTebak } from "./SubBabB7Concrete";
import { KartuBandingKotak, KartuTabel, KartuWarnaiKotak } from "./SubBabB7Picture";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab B: Mengukur Panjang Benda (Buku Siswa Kelas 1 hlm. 208-218). */
/* Semua di klien, tanpa API.                                                 */
/* Naskah: naskah/mtk-1-bab7-sub-b-mengukur-panjang-benda.md                  */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Tebak, Lalu Ukur (taruh stik), 2 Susun Sedotan (seret),       */
/*            3 Dua Alat Ukur (ketuk dan hitung), 4 Tumpuk Balok (seret).     */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Warnai Kotak, 6 Bandingkan dalam Kotak, 7 Tabel Tebakan.      */
/*  Abstract: 8 Detektif Cara Mengukur, 9 Lambang dan Selisih Panjang,        */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman mengukur panjang benda. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B7 = [
  {
    ikon: "🤔",
    nama: "Tebak dulu, ukur kemudian",
    ket: "tebakanku • hasilku",
    suara: "Sebelum mengukur, tebak dulu kira-kira berapa panjangnya. Setelah mengukur, bandingkan tebakanmu dengan hasil pengukuran.",
  },
  {
    ikon: "🧰",
    nama: "Satu jenis alat ukur",
    ket: "pakai yang sama sampai selesai",
    suara: "Pakai satu jenis alat ukur yang sama dari awal sampai akhir. Jangan mencampur koin, stik es krim, dan penghapus dalam satu pengukuran.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const ALAT_POSTER: { nama: string; gambar: React.ReactNode }[] = [
  { nama: "jengkal", gambar: <TanganG x={30} y={22} s={0.58} /> },
  { nama: "telapak kaki", gambar: <KakiG x={30} y={22} s={0.54} /> },
  { nama: "depa", gambar: <DepaG x={30} y={38} s={0.52} /> },
  { nama: "stik es krim", gambar: <StikG x={8} y={14} w={44} h={13} /> },
  { nama: "pensil", gambar: <PensilG x={6} y={21} panjang={48} warna="#EF4444" /> },
  { nama: "koin", gambar: <KoinG x={17} y={8} d={26} /> },
  { nama: "sedotan", gambar: <SedotanG x={6} y={16} w={48} h={9} /> },
  { nama: "penjepit kertas", gambar: <KlipG x={10} y={12} w={40} h={16} /> },
];

export function InfografisUkurB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Mengukur Panjang Benda</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="AYO KITA UKUR"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Malosi adalah siswa paling tinggi. Berapa kira-kira tinggi badan Malosi? Kita bisa mengukur tinggi badan Malosi. Kita juga bisa mengukur panjang benda. Mengukur berarti membandingkan benda dengan alat ukur, lalu menghitung berapa kali alat ukur itu muat."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 130" className="block h-auto w-full" role="img" aria-label="Malosi dan alat ukur jengkal dan telapak kaki">
            <Tokoh x={64} y={122} rambut="#111827" baju={HIJAU} s={1.5} />
            <path d="M104 40 V122 M99 46 L104 40 L109 46 M99 116 L104 122 L109 116" fill="none" stroke={MERAH_B7} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <TanganG x={178} y={66} s={1.1} panah />
            <KakiG x={246} y={66} s={0.95} panah />
          </svg>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]">Mengukur = membandingkan dengan alat ukur</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="ALAT UKUR DI SEKITAR"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Ini benda yang bisa kita pakai untuk mengukur. Ada jengkal, telapak kaki, dan depa. Ada stik es krim, pensil, koin, sedotan, dan penjepit kertas. Kamu juga boleh memakai benda lain di sekitarmu. Benda yang dipakai untuk mengukur disebut alat ukur."
      >
        <div className="grid grid-cols-4 gap-1">
          {ALAT_POSTER.map((a) => (
            <div key={a.nama} className="rounded-xl border-4 border-[#1C01A5] bg-white px-0.5 py-0.5 text-center">
              <svg viewBox="0 0 60 44" className="block h-auto w-full" role="img" aria-label={a.nama}>
                {a.gambar}
              </svg>
              <span className="block text-[10px] font-black leading-tight text-[#1C01A5]">{a.nama}</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="EMPAT CARA MENGUKUR YANG BENAR"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Cara mengukur yang benar ada empat. Pertama, mulai dari ujung benda. Kedua, alat ukur rapat. Ketiga, alat ukur tidak bertumpuk. Keempat, alat ukur tidak miring. Panjang meja ini adalah empat sedotan."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 74" className="block h-auto w-full" role="img" aria-label="Meja diukur dengan empat sedotan dari ujung kiri">
            <path d="M30 6 V62 M270 6 V62" stroke={MERAH_B7} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
            <MejaG x={30} y={30} w={240} />
            {[0, 1, 2, 3].map((i) => (
              <SedotanG key={i} x={30 + i * 60} y={21} w={60} h={9} urut={i} />
            ))}
          </svg>
        </div>
        <ol className="space-y-1">
          {["Mulai dari ujung benda", "Alat ukur rapat", "Alat ukur tidak bertumpuk", "Alat ukur tidak miring"].map((t, i) => (
            <li key={t} className="flex items-center gap-2 rounded-xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-sm font-black text-[#1C01A5]">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-base">{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="BENAR ATAU SALAH"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Perhatikan gambar-gambar ini. Gambar dengan tanda centang hijau adalah cara mengukur yang benar. Gambar dengan tanda silang merah salah. Ada yang tidak mulai dari ujung, ada celah, bertumpuk, miring, dan ada yang memakai alat ukur campur. Jangan lakukan yang salah."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Satu cara mengukur yang benar dan lima cara yang salah">
            <AdeganCara />
          </svg>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="MENULIS HASIL UKUR"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Hasil pengukuran ditulis dengan angka dan nama alat ukurnya. Panjang meja adalah empat sedotan. Kalau diukur dengan jengkal tangan, panjang meja adalah lima jengkal tangan. Angka saja tidak cukup, tulis juga nama alat ukurnya."
      >
        <div className="space-y-1.5">
          {[
            ["Panjang meja =", "4", "sedotan"],
            ["Panjang meja =", "5", "jengkal tangan"],
          ].map(([a, b, c]) => (
            <div key={c} className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <span className="text-sm font-black text-[#1C01A5]">{a}</span>
              <span className="rounded-lg border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-2xl font-black text-[#1C01A5]">{b}</span>
              <span className="rounded-lg border-4 border-[#1C01A5] bg-[#BFDBFE] px-2 text-sm font-black text-[#1C01A5]">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">angka + nama alat ukur</p>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="ALAT UKUR BERBEDA, HASIL BERBEDA"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Buku yang sama diukur dengan dua alat ukur. Dengan stik es krim, panjang buku adalah dua stik es krim. Dengan koin, panjang buku adalah dua belas koin. Hasilnya berbeda karena panjang stik es krim dan koin berbeda. Alat ukur yang lebih panjang menghasilkan angka yang lebih sedikit."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 118" className="block h-auto w-full" role="img" aria-label="Buku diukur dengan dua stik es krim dan dua belas koin">
            <path d="M30 4 V112 M270 4 V112" stroke={MERAH_B7} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
            <BukuG x={30} y={8} w={240} h={30} />
            {[0, 1].map((i) => (
              <StikG key={i} x={30 + i * 120} y={46} w={120} h={14} />
            ))}
            {Array.from({ length: 12 }, (_, i) => (
              <KoinG key={i} x={30 + i * 20} y={68} d={20} />
            ))}
            <text x="150" y="104" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={BIRU}>
              2 stik es krim = 12 koin
            </text>
          </svg>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-xs font-black leading-snug text-[#1C01A5]">Alat ukur lebih panjang ➜ hasil lebih sedikit</p>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="MENGUKUR DI KERTAS BERPETAK"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Pada kertas berpetak, satu kotak adalah satu satuan. Pensil A panjangnya lima kotak. Pensil B panjangnya sembilan kotak. Pensil C panjangnya tiga kotak. Pensil B paling panjang dan pensil C paling pendek. Pensil B lebih panjang empat kotak dari pensil A, karena sembilan dikurangi lima sama dengan empat."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 108" className="block h-auto w-full" role="img" aria-label="Tiga pensil di kertas berpetak, lima, sembilan, dan tiga kotak">
            {Array.from({ length: 11 }, (_, i) => (
              <path key={i} d={`M${34 + i * 26} 4 V104`} stroke="#93C5FD" strokeWidth="1.4" />
            ))}
            {[5, 9, 3].map((p, i) => (
              <g key={i}>
                <circle cx="16" cy={22 + i * 32} r="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
                <text x="16" y={26.4 + i * 32} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
                  {["A", "B", "C"][i]}
                </text>
                <rect x="34" y={11 + i * 32} width={p * 26} height="22" rx="3" fill={WARNA_BATANG[i]} stroke={BIRU} strokeWidth="2.4" />
              </g>
            ))}
          </svg>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black leading-snug text-[#1C01A5]">
          A = 5 kotak • B = 9 kotak • C = 3 kotak
          <br />B lebih panjang 4 kotak dari A
        </p>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="TEBAKAN DAN HASIL"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Tulis tebakan dan hasil pengukuranmu pada tabel. Meja, tebakanku empat jengkal, hasil pengukuranku lima jengkal. Tebakanku kurang satu dari hasilnya. Selisih tebakan dan hasil adalah satu, karena lima dikurangi empat sama dengan satu."
      >
        <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#E9D8F3] text-xs">
                <th className="px-1 py-1">No.</th>
                <th className="px-1 py-1">Nama Benda</th>
                <th className="px-1 py-1">Tebakanku</th>
                <th className="px-1 py-1">Hasil Pengukuranku</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-1 py-1.5">1</td>
                <td className="px-1 py-1.5">Meja</td>
                <td className="px-1 py-1.5">4 jengkal</td>
                <td className="px-1 py-1.5">5 jengkal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">5 – 4 = 1 • selisih tebakan dan hasil 1</p>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="JARAK AMAN"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Jarak aman membaca buku kira-kira tiga puluh sentimeter, sekitar tiga jengkal. Jarak aman menonton di depan laptop atau ponsel kira-kira empat puluh sentimeter, sekitar empat jengkal. Kita memakai jarak aman supaya mata sehat. Apakah kamu sudah melakukannya?"
      >
        <div className="space-y-1.5">
          {[
            { n: 3, judul: "Membaca buku", ket: "30 cm ≈ 3 jengkal" },
            { n: 4, judul: "Menonton laptop atau ponsel", ket: "40 cm ≈ 4 jengkal" },
          ].map((j) => (
            <div key={j.judul} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1">
              <svg viewBox="0 0 300 52" className="block h-auto w-full" role="img" aria-label={`${j.n} jengkal tangan berurutan`}>
                {Array.from({ length: j.n }, (_, i) => (
                  <TanganG key={i} x={150 - (j.n * 42) / 2 + 25 + i * 42} y={28} s={0.7} />
                ))}
              </svg>
              <p className="text-center text-sm font-black leading-tight text-[#1C01A5]">{j.judul}</p>
              <p className="text-center text-xs font-black text-[#B45309]">{j.ket}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Jarak aman membuat mata tetap sehat.</p>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_B7.map((i) => (
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

type TipeConcrete = "tebak" | "susun" | "duaalat" | "balok";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "tebak" },
  { nomor: 2, tipe: "susun" },
  { nomor: 3, tipe: "duaalat" },
  { nomor: 4, tipe: "balok" },
];

export function ConcreteUkurB(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Ukur, seret, dan hitung!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "tebak" ? <LangkahTebak {...dasar} /> : null}
        {langkah.tipe === "susun" ? <LangkahSusun {...dasar} /> : null}
        {langkah.tipe === "duaalat" ? <LangkahDuaAlat {...dasar} /> : null}
        {langkah.tipe === "balok" ? <LangkahBalok {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "kotak" | "banding" | "tabel";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "kotak" },
  { nomor: 6, tipe: "banding" },
  { nomor: 7, tipe: "tabel" },
];

export function PictureUkurB(props: Umum) {
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
        {kartu.tipe === "kotak" ? <KartuWarnaiKotak {...dasar} /> : null}
        {kartu.tipe === "banding" ? <KartuBandingKotak {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Detektif Cara Mengukur ----------------------------- */

const ATURAN = ["Mulai dari ujung benda", "Alat ukur rapat", "Alat ukur tidak bertumpuk", "Alat ukur tidak miring", "Pakai alat ukur yang sama"];

type RondeDetektif = { langkah: string[]; salah: number; aturan: number };

const RONDE_DETEKTIF: RondeDetektif[] = [
  {
    langkah: ["Wei mulai dari ujung meja.", "Wei menaruh sedotan pertama rapat di ujung.", "Wei menaruh sedotan kedua di atas sedotan pertama.", "Wei menghitung semua sedotannya."],
    salah: 2,
    aturan: 2,
  },
  {
    langkah: ["Kira memilih sedotan untuk mengukur papan.", "Kira menaruh sedotan pertama di tengah papan.", "Kira menaruh sedotan berikutnya rapat.", "Kira menghitung sedotannya."],
    salah: 1,
    aturan: 0,
  },
  {
    langkah: ["Upe mulai dari ujung buku.", "Upe menaruh stik es krim pertama rapat.", "Upe menaruh stik kedua miring ke atas.", "Upe menghitung stik es krim."],
    salah: 2,
    aturan: 3,
  },
  {
    langkah: ["Malosi mulai dari ujung pensil.", "Malosi menaruh koin pertama di ujung.", "Ada celah di antara koin kedua dan koin ketiga.", "Malosi menghitung koinnya."],
    salah: 2,
    aturan: 1,
  },
  {
    langkah: ["Kira mulai dari ujung kotak pensil.", "Kira memakai koin untuk bagian awal.", "Kira memakai stik es krim untuk bagian tengah.", "Kira memakai penghapus untuk bagian akhir."],
    salah: 2,
    aturan: 4,
  },
];

function RondeDetektifUkur({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_DETEKTIF[ronde];
  const akhir = ronde === RONDE_DETEKTIF.length - 1;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salahLangkah, setSalahLangkah] = useState<number | null>(null);
  const [salahAturan, setSalahAturan] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b7-detektif"] === true && akhir;
  useBicara(akhir ? suara : beres, `Langkah yang salah adalah langkah ${sebut(d.salah + 1)}. Aturannya, ${ATURAN[d.aturan].toLowerCase()}.${akhir ? ` Ada ${sebut(ATURAN.length)} aturan emas mengukur panjang.` : ""}`);

  const pilihLangkah = (i: number) => {
    if (tahap !== 0) return;
    if (i === d.salah) {
      setSalahLangkah(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahLangkah(i);
      setKabar({ teks: "Langkah itu sudah benar. Cari langkah yang tidak mengikuti aturan mengukur.", ok: false });
    }
  };
  const pilihAturan = (t: string) => {
    if (tahap !== 1 || beres) return;
    if (t === ATURAN[d.aturan]) {
      setSalahAturan(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahAturan(t);
      setKabar({ teks: "Aturan itu bukan yang dilanggar. Baca lagi langkah yang salah, lalu cocokkan dengan aturannya.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: banyak aturan" : suara ? "Hebat!" : beres ? "Detektif jitu!" : tahap === 0 ? "Cari langkah yang salah" : "Aturan apa yang dilanggar?"}
        teks={`Baca cerita cara mengukur ini. Ketuk langkah yang salah, lalu pilih aturan mengukur yang dilanggar.${akhir ? " Di akhir, ucapkan ada berapa aturan emas mengukur panjang." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <ol className="space-y-1.5" aria-label="Langkah-langkah mengukur">
          {d.langkah.map((l, i) => {
            const terbukti = tahap === 1 && i === d.salah;
            return (
              <li key={`${i}-${salahLangkah === i ? "x" : "o"}`}>
                <button
                  type="button"
                  disabled={tahap !== 0}
                  aria-label={`Langkah ${i + 1}: ${l}`}
                  onClick={() => pilihLangkah(i)}
                  className={`flex w-full items-start gap-2 rounded-2xl border-4 px-2 py-1.5 text-left text-base font-black leading-snug text-[#1C01A5] ${
                    terbukti ? "border-[#E98989] bg-[#FDECEC]" : "border-[#1C01A5] bg-white"
                  } ${salahLangkah === i ? "igil-goyang" : ""} disabled:opacity-100`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-sm">{i + 1}</span>
                  <span className="min-w-0 flex-1">{l}</span>
                  {terbukti ? <span className="shrink-0 text-lg">✘</span> : null}
                </button>
              </li>
            );
          })}
        </ol>
        {tahap === 1 && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Aturan apa yang dilanggar?</p>
            <PilihKata opsi={ATURAN} keliru={salahAturan} onPilih={pilihAturan} kolom={1} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Banyak aturan emas mengukur = ?" : `Aturan: ${ATURAN[d.aturan]}`}
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
      judul="Detektif Cara Mengukur"
      warna="#BBF7D0"
      petunjuk="Baca cerita cara mengukur. Ketuk langkah yang salah, lalu pilih aturan mengukur yang dilanggar. Ada lima aturan emas mengukur panjang. Pada soal terakhir, ucapkan ada berapa aturan emas mengukur panjang."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-detektif"
      jumlahRonde={RONDE_DETEKTIF.length}
      kunciAkhir={ATURAN.length}
      belumSiap="Temukan langkah yang salah dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektifUkur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Lambang dan Selisih Panjang ------------------------ */

type RondeLambang = { benda1: string; benda2: string; satuan: string; a: number; b: number };

const RONDE_LAMBANG: RondeLambang[] = [
  { benda1: "buku", benda2: "pensil", satuan: "sedotan", a: 7, b: 5 },
  { benda1: "pita", benda2: "tali", satuan: "klip", a: 4, b: 9 },
  { benda1: "meja", benda2: "rak", satuan: "jengkal", a: 6, b: 6 },
  { benda1: "sisir", benda2: "gunting", satuan: "penjepit kertas", a: 11, b: 8 },
  { benda1: "tongkat", benda2: "pita", satuan: "kotak", a: 5, b: 12 },
];

function RondeLambangPanjang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_LAMBANG[ronde];
  const akhir = ronde === RONDE_LAMBANG.length - 1;
  const lambang = d.a > d.b ? ">" : d.a < d.b ? "<" : "=";
  const selisih = Math.abs(d.a - d.b);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salahLambang, setSalahLambang] = useState<string | null>(null);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b7-lambang"] === true && akhir;
  const kalimat =
    lambang === "="
      ? `Panjang ${d.benda1} sama dengan panjang ${d.benda2}. Selisihnya nol.`
      : `Panjang ${d.benda1} ${sebut(d.a)} ${d.satuan}, panjang ${d.benda2} ${sebut(d.b)} ${d.satuan}. ${d.benda1} ${d.a > d.b ? "lebih panjang" : "lebih pendek"} ${sebut(selisih)} ${d.satuan} dari ${d.benda2}.`;
  useBicara(akhir ? suara : beres, kalimat);

  const pilihLambang = (t: string) => {
    if (tahap !== 0) return;
    if (t === lambang) {
      setSalahLambang(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahLambang(t);
      setKabar({ teks: `Bandingkan bilangan ${sebut(d.a)} dan ${sebut(d.b)}. Bilangan yang lebih besar berarti benda yang lebih panjang, kalau alat ukurnya sama.`, ok: false });
    }
  };
  const pilihSelisih = (v: number) => {
    if (tahap !== 1 || beres) return;
    if (v === selisih) {
      setSalahAngka(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahAngka(v);
      setKabar({ teks: "Selisih adalah bilangan yang besar dikurangi bilangan yang kecil. Kalau sama besar, selisihnya nol.", ok: false });
    }
  };

  const opsiSelisih = selisih === 0 ? [1, 0, 2] : opsiSekitar(selisih);

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Lambangmu tepat!" : tahap === 0 ? "Pilih lambangnya" : "Cari selisihnya"}
        teks={`Bandingkan hasil ukur dengan lambang lebih dari, kurang dari, atau sama dengan. Lalu cari selisihnya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-0.5 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
          <p>
            Panjang {d.benda1} = {d.a} {d.satuan}.
          </p>
          <p>
            Panjang {d.benda2} = {d.b} {d.satuan}.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2" role="img" aria-label={`${d.a} ${tahap >= 1 ? lambang : "tanda belum dipilih"} ${d.b}`}>
          <Kotak v={d.a} />
          <Tanda t={tahap >= 1 ? lambang : null} nyala={tahap === 0} />
          <Kotak v={d.b} />
        </div>
        {tahap === 0 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{d.a} ... {d.b}</p>
            <PilihKata opsi={[">", "<", "="]} keliru={salahLambang} onPilih={pilihLambang} />
          </div>
        ) : null}
        {tahap === 1 && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Selisihnya = ?</p>
            <PilihAngka opsi={opsiSelisih} keliru={salahAngka} onPilih={pilihSelisih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.a} ${lambang} ${d.b} • selisihnya ?` : `${d.a} ${lambang} ${d.b} • selisihnya ${selisih}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuLambang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_LAMBANG[RONDE_LAMBANG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lambang dan Selisih Panjang"
      warna="#FDE68A"
      petunjuk="Dua benda diukur dengan alat ukur yang sama. Pilih lambang lebih dari, kurang dari, atau sama dengan, lalu cari selisihnya. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-lambang"
      jumlahRonde={RONDE_LAMBANG.length}
      kunciAkhir={Math.abs(terakhir.a - terakhir.b)}
      belumSiap="Pilih lambang dan selisihnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLambangPanjang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara -------------------------- */

const KARTU_BENDA = [
  { nama: "lemari", n: 6 },
  { nama: "pintu", n: 8 },
  { nama: "papan tulis", n: 10 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<(typeof KARTU_BENDA)[number] | null>(null);
  const [lulus, setLulus] = useState(false);
  const n = tahap === 0 ? 4 : pilih ? pilih.n : null;
  const id = tahap === 0 ? "b7-tulis-0" : `b7-tulis-1-${pilih?.nama ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(
    suara && n !== null,
    n !== null ? (tahap === 0 ? `Panjang meja adalah ${kata(n).toLowerCase()} sedotan. Sekarang guratkan angkanya di kanvas.` : `Panjang ${pilih?.nama} adalah ${kata(n).toLowerCase()} jengkal. Sekarang guratkan angkanya di kanvas.`) : ""
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Ucapkan hasil pengukuran, lalu guratkan angkanya di kanvas. Setelah itu, pilih sendiri satu benda yang sudah diukur dengan jengkal.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Berapa sedotan panjang meja?" : n === null ? "Pilih satu benda" : "Ucapkan hasilnya"}
          teks={
            tahap === 0
              ? "Meja diukur dengan sedotan dan hasilnya empat sedotan. Ucapkan hasil pengukurannya, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu benda yang sudah diukur dengan jengkal tangan. Ucapkan hasil pengukurannya, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <>
              <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2 text-center text-base font-black leading-snug text-[#1C01A5]">Meja diukur dengan sedotan: 4 sedotan.</p>
              <p className="text-center text-xl font-black text-[#1C01A5]">Panjang meja: {suara && n !== null ? `${n} sedotan (${kata(n)})` : "? sedotan"}</p>
            </>
          ) : pilih === null ? (
            <div className="space-y-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Pilih satu benda. Panjangnya diukur dengan jengkal.</p>
              <div className="grid grid-cols-3 gap-2">
                {KARTU_BENDA.map((b) => (
                  <button
                    key={b.nama}
                    type="button"
                    aria-label={`Pilih ${b.nama}, ${b.n} jengkal`}
                    onClick={() => setPilih(b)}
                    className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-center shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                  >
                    <span className="block text-3xl font-black text-[#1C01A5]">{b.n}</span>
                    <span className="block text-xs font-black leading-tight text-[#1C01A5]">jengkal</span>
                    <span className="block text-sm font-black leading-tight text-[#1C01A5]">{b.nama}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-2 text-center text-base font-black leading-snug text-[#1C01A5]">
                {pilih.nama} diukur dengan jengkal: {pilih.n} jengkal.
              </p>
              <p className="text-center text-xl font-black text-[#1C01A5]">Panjang {pilih.nama}: {suara && n !== null ? `${n} jengkal (${kata(n)})` : "? jengkal"}</p>
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
  "Ingat selalu! Mengukur berarti membandingkan benda dengan alat ukur, lalu menghitung berapa kali alat ukur itu muat. Mulai dari ujung benda. Letakkan alat ukur rapat, tidak bertumpuk, dan tidak miring. Pakai satu jenis alat ukur yang sama. Tulis hasilnya dengan angka dan nama alat ukur. Alat ukur yang berbeda memberi hasil yang berbeda. Tebak dulu sebelum mengukur, lalu bandingkan dengan hasilnya.";

const POIN_B7: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "📏",
    nama: "Mengukur itu membandingkan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">benda dibandingkan dengan alat ukur</p>,
    suara: "Mengukur berarti membandingkan benda dengan alat ukur, lalu menghitung berapa kali alat ukur itu muat.",
  },
  {
    ikon: "📍",
    nama: "Mulai dari ujung",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">ujung benda = titik mulai</p>,
    suara: "Selalu mulai mengukur dari ujung benda. Ujung benda adalah titik mulai.",
  },
  {
    ikon: "🧱",
    nama: "Rapat, tidak bertumpuk, tidak miring",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">tanpa celah • tanpa tumpukan • lurus</p>,
    suara: "Letakkan alat ukur rapat tanpa celah, tidak bertumpuk, dan tidak miring. Pindahkan satu per satu.",
  },
  {
    ikon: "✍️",
    nama: "Tulis angka dan nama alat ukur",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">Panjang meja = 4 sedotan</p>,
    suara: "Tulis hasil pengukuran dengan angka dan nama alat ukurnya. Panjang meja adalah empat sedotan.",
  },
  {
    ikon: "⚖️",
    nama: "Alat berbeda, hasil berbeda",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">alat ukur lebih panjang ➜ hasil lebih sedikit</p>,
    suara: "Alat ukur yang berbeda memberi hasil yang berbeda. Alat ukur yang lebih panjang menghasilkan angka yang lebih sedikit. Kalau membandingkan, pakai alat ukur yang sama.",
  },
  {
    ikon: "🤔",
    nama: "Tebak dulu, lalu ukur",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">tebakanku • hasilku • selisih</p>,
    suara: "Tebak dulu sebelum mengukur. Setelah mengukur, bandingkan tebakanmu dengan hasilnya dan cari selisihnya.",
  },
];

const REFLEKSI_B7 = [
  "Aku sudah bisa membandingkan dan mengurutkan panjang benda.",
  "Aku sudah bisa mengukur panjang benda.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
  "Aku belajar dengan hati senang.",
  "Aku belajar dengan tertib.",
];

function PoinPentingB7({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B7.map((p) => (
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
            aria-label="Dengarkan: Cara menyebutkan hasil ukur"
            onClick={() => speakGuru("Cara menyebutkan hasil ukur. Panjang meja adalah empat sedotan.")}
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
              { teks: "panjang meja", warna: "#BBF7D0" },
              { teks: "adalah", warna: "#FFFFFF" },
              { teks: "empat", warna: "#FFF7CC" },
              { teks: "sedotan", warna: "#BFDBFE" },
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
            Ayo Berkarya di rumah: mencetak kaki
          </p>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Cetak kakimu di kertas. Pilih dua benda untuk mengukur panjangnya, misalnya koin, pensil warna, atau krayon. Tulis hasil pengukuranmu. Bandingkan dengan panjang kaki dua temanmu, lalu ceritakan memakai kata lebih panjang, lebih pendek, paling panjang, paling pendek, dan sama panjang.
          </p>
        </div>
        <RefleksiBab7 items={REFLEKSI_B7} speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "detektif" | "lambang" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "detektif" },
  { nomor: 9, tipe: "lambang" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractUkurB(props: Umum) {
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
        <PoinPentingB7
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "detektif" ? <KartuDetektif {...dasar} /> : null}
          {kartu.tipe === "lambang" ? <KartuLambang {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
