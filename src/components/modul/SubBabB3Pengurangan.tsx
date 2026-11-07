"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useMemo, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { TeksCerita, WARNA_ADA, WARNA_DATANG } from "./diagram-pictorial";
import { BingkaiMini } from "./gambar-cara-b2";
import { Bagan } from "./gambar-pasangan-d";
import {
  GameRonde,
  IgilBicara,
  KERTAS_ANGKA,
  KERTAS_GAMBAR,
  Persamaan,
  PilihAngka,
  TOMBOL_KECIL,
  TOTAL_GAME,
  kataK,
  type PropsLangkah,
} from "./SubBabA2Penjumlahan";
import { opsiKurang, ucapKurang } from "./SubBabA3Pengurangan";
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

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab B: Berbagai Cara Melakukan Pengurangan (Buku Siswa Kelas 1   */
/* hlm. 88-100). Semua di klien, tanpa API. Naskah: naskah/mtk-1-bab3-sub-b-  */
/* berbagai-cara.md.                                                          */
/*                                                                            */
/* Tiga cara: (1) pasangan bilangan, (2) menghitung mundur, (3) dari 10.      */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Telur Utuh Telur Pecah (ketuk), 2 Balon Dua Warna (seret dan  */
/*            pilah), 3 Lompat Mundur di Batu (ketuk berurutan), 4 Kantong    */
/*            Sepuluh Bola (ambil dari kantong).                              */
/*  Picture:  (diagram saja, tanpa gambar benda)                              */
/*            5 Bagan Pasangan (isi lingkaran kosong), 6 Garis Bilangan       */
/*            (lompat ke belakang), 7 Bingkai Sepuluh (warnai yang kosong).   */
/*  Abstract: 8 Dua Kalimat dari Satu Bagan, 9 Hitung Mundur Berantai,        */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const PersK = (p: { a: number | "?" | null; b: number | "?" | null; c: number | "?" | null; kecil?: boolean; nyala?: number[] }) => (
  <Persamaan a={p.a} b={p.b} c={p.c} t1="−" kecil={p.kecil} nyala={p.nyala} />
);

const TINTA = "#1C01A5";
const MERAH_BALON = "#EF4444";
const KUNING_BALON = "#FACC15";
const BIRU_BOLA = "#38BDF8";

/** Urutan selang-seling supaya warna tidak mengumpul di satu sisi. */
const PERM = [0, 3, 6, 9, 2, 5, 8, 1, 4, 7];
function susunWarna<T extends string>(jumlah: number, k: number, utama: T, lain: T): T[] {
  const w: T[] = Array.from({ length: jumlah }, () => lain);
  const posisi = PERM.filter((p) => p < jumlah);
  for (let i = 0; i < k; i++) w[posisi[i]] = utama;
  return w;
}

function BalonSVG({ warna, kelas = "h-14 w-10" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 36 54" className={`block ${kelas}`} aria-hidden="true">
      <path d="M18 40 Q22 46 17 53" fill="none" stroke={TINTA} strokeWidth="1.6" />
      <ellipse cx="18" cy="19" rx="15" ry="18" fill={warna} stroke={TINTA} strokeWidth="2.4" />
      <path d="M9 12 Q10 6 17 5" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.9" />
      <path d="M14.5 38 L21.5 38 L18 33 Z" fill={warna} stroke={TINTA} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** Telur utuh atau telur pecah (kulit bergerigi dengan kuning telur). */
function TelurSVG({ pecah = false, kelas = "h-14 w-12" }: { pecah?: boolean; kelas?: string }) {
  return (
    <svg viewBox="0 0 40 52" className={`block ${kelas}`} aria-hidden="true">
      {pecah ? (
        <>
          <path
            d="M5 30 L10 22 L15 29 L20 20 L25 29 L30 22 L35 30 L35 36 Q35 49 20 49 Q5 49 5 36 Z"
            fill="#FFF1D6"
            stroke={TINTA}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <ellipse cx="20" cy="34" rx="8.5" ry="7" fill="#FBBF24" stroke={TINTA} strokeWidth="1.8" />
          <path d="M16 31 Q17 29 20 29" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="20" cy="27" rx="15" ry="21" fill="#FFF1D6" stroke={TINTA} strokeWidth="2.4" />
          <path d="M10 18 Q12 10 19 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
        </>
      )}
    </svg>
  );
}

function BolaSVG({ warna, kelas = "h-11 w-11" }: { warna: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`block ${kelas}`} aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill={warna} stroke={TINTA} strokeWidth="2.6" />
      <path d="M10 17 Q12 9 21 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

/** Garis bilangan 0 sampai 10 yang tidak bisa diketuk. Dipakai di poster. */
function GarisStatik({ mulai, langkah }: { mulai: number; langkah: number }) {
  const cx = (n: number) => (n + 0.5) * 30;
  const akhir = mulai - langkah;
  return (
    <svg viewBox="0 0 330 74" className="mx-auto block h-auto w-full max-w-[330px]" role="img" aria-label={`Garis bilangan: mulai ${mulai}, lompat ${langkah} langkah ke belakang, mendarat di ${akhir}`}>
      {Array.from({ length: langkah }, (_, h) => (
        <path
          key={h}
          d={`M ${cx(mulai - h)} 44 Q ${(cx(mulai - h) + cx(mulai - h - 1)) / 2} 4 ${cx(mulai - h - 1)} 44`}
          fill="none"
          stroke={WARNA_DATANG}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
      <line x1="2" y1="58" x2="328" y2="58" stroke={TINTA} strokeWidth="2" />
      {Array.from({ length: 11 }, (_, n) => (
        <g key={n}>
          <circle cx={cx(n)} cy="58" r="12" fill={n === mulai ? "#FFE566" : n === akhir ? WARNA_ADA : "#FFFFFF"} stroke={TINTA} strokeWidth="2.4" />
          <text x={cx(n)} y="63" textAnchor="middle" fontSize="14" fontWeight="900" fill={n === akhir ? "#FFFFFF" : TINTA}>
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman berbagai cara melakukan pengurangan. Ada tiga cara: pasangan bilangan, menghitung mundur, dan pengurangan dari sepuluh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B3 = [
  {
    ikon: "🔵",
    nama: "Gabungan",
    ket: "Bilangan terbesar di bagan",
    suara: "Gabungan adalah bilangan yang paling besar di bagan. Gabungan selalu ditulis pertama pada kalimat pengurangan.",
  },
  {
    ikon: "🤝",
    nama: "Periksa",
    ket: "Sebagian + sebagian = gabungan",
    suara: "Periksa jawabanmu dengan menggabung. Dua sebagian jika digabung harus sama dengan gabungan.",
  },
];

const PASANGAN_SEPULUH: [number, number][] = [
  [1, 9],
  [2, 8],
  [3, 7],
  [4, 6],
  [5, 5],
];

export function InfografisPenguranganB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Berbagai Cara Mengurangkan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="PASANGAN BILANGAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Ada enam telur di piring. Empat telur masih utuh. Dua telur pecah. Enam adalah gabungan. Empat dan dua adalah sebagian. Empat dan dua jika digabung menjadi enam."
      >
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <p className="text-xs font-black text-[#1C01A5]/70">Masih utuh</p>
              <span className="flex flex-wrap items-center justify-center gap-1">
                {Array.from({ length: 4 }, (_, i) => (
                  <TelurSVG key={i} kelas="h-9 w-7" />
                ))}
              </span>
            </div>
            <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] px-2 py-2">
              <p className="text-xs font-black text-[#1C01A5]/70">Pecah</p>
              <span className="flex flex-wrap items-center justify-center gap-1">
                {Array.from({ length: 2 }, (_, i) => (
                  <TelurSVG key={i} pecah kelas="h-9 w-7" />
                ))}
              </span>
            </div>
          </div>
          <Bagan gabungan={6} a={4} b={2} nama kelas="w-full max-w-[230px]" />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="SATU BAGAN, DUA PENGURANGAN"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Dari satu bagan kita bisa menulis dua pengurangan. Enam dikurangi dua sama dengan empat. Enam dikurangi empat sama dengan dua. Gabungan selalu ditulis pertama."
      >
        <div className="grid grid-cols-2 items-center gap-2 text-center">
          <Bagan gabungan={6} a={4} b={2} kelas="w-full max-w-[150px]" />
          <div className="space-y-2">
            <PersK a={6} b={2} c={4} kecil />
            <PersK a={6} b={4} c={2} kecil />
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="MENGHITUNG MUNDUR"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Aku di angka lima. Aku melompat tiga langkah ke belakang. Empat, tiga, dua. Aku mendarat di dua. Lima dikurangi tiga sama dengan dua. Menghitung mundur artinya menyebut angka dari besar ke kecil."
      >
        <div className="space-y-2 text-center">
          <GarisStatik mulai={5} langkah={3} />
          <PersK a={5} b={3} c={2} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="TIGA LANGKAH MUNDUR"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Tiga langkah menghitung mundur. Satu, tunjuk bilangan awal. Dua, lompat ke belakang sebanyak bilangan pengurang, sambil menyebut angkanya. Tiga, angka tempat mendarat adalah hasilnya."
      >
        <div className="space-y-1.5">
          {[
            { ikon: "👆", nama: "Tunjuk angka awal", ket: "Contoh: 5" },
            { ikon: "🐸", nama: "Lompat ke belakang", ket: "Sebanyak pengurang, sebut: 4, 3, 2" },
            { ikon: "🎯", nama: "Lihat tempat mendarat", ket: "Itulah hasilnya: 2" },
          ].map((c, i) => (
            <div key={c.nama} className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-xl" aria-hidden="true">
                {c.ikon}
              </span>
              <p className="min-w-0 text-sm font-black leading-tight text-[#1C01A5]">
                {i + 1}. {c.nama}
                <span className="block text-[11px] font-black text-[#1C01A5]/75">{c.ket}</span>
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="NOL DAN BILANGAN YANG SAMA"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Kalau yang dikurangi nol, hasilnya tetap sama. Lima dikurangi nol sama dengan lima. Kalau yang dikurangi sama besar dengan bilangan awal, hasilnya nol. Tiga dikurangi tiga sama dengan nol."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Dikurangi nol</p>
            <PersK a={5} b={0} c={5} kecil />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">hasilnya tetap sama</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Dikurangi dirinya</p>
            <PersK a={3} b={3} c={0} kecil />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">hasilnya nol</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="PENGURANGAN DARI 10"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Ada sepuluh bola. Tujuh bola merah dan tiga bola biru. Sepuluh dikurangi tujuh sama dengan tiga. Sepuluh dikurangi tiga sama dengan tujuh. Bingkai sepuluh membantu kita melihat yang kosong."
      >
        <div className="grid grid-cols-2 items-center gap-2 text-center">
          <BingkaiMini merah={7} biru={3} kelas="w-full max-w-[150px]" />
          <div className="space-y-2">
            <PersK a={10} b={7} c={3} kecil />
            <PersK a={10} b={3} c={7} kecil />
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="PASANGAN SEPULUH"
        warna="#9333EA"
        speakGuru={speakGuru}
        suara="Pasangan sepuluh. Satu dan sembilan. Dua dan delapan. Tiga dan tujuh. Empat dan enam. Lima dan lima. Kalau kamu hafal pasangan sepuluh, pengurangan dari sepuluh jadi sangat cepat."
      >
        <div className="grid grid-cols-5 gap-1.5 text-center">
          {PASANGAN_SEPULUH.map(([a, b]) => (
            <div key={a} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-xl font-black leading-none text-[#1C01A5]">{a}</p>
              <p className="text-[10px] font-black leading-none text-[#1C01A5]/60">dan</p>
              <p className="text-xl font-black leading-none text-[#E11D48]">{b}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="TIGA CARA MENGURANGKAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Tiga cara mengurangkan. Pertama, pasangan bilangan: cari sebagian yang hilang dari gabungan. Kedua, menghitung mundur: lompat ke belakang pada garis bilangan. Ketiga, pengurangan dari sepuluh: lihat petak yang kosong. Pilih cara yang paling kamu suka."
      >
        <div className="space-y-1.5">
          {[
            { ikon: "🔵", nama: "Pasangan bilangan", ket: "6 − 2: cari pasangan 2 untuk 6, ketemu 4." },
            { ikon: "🐸", nama: "Menghitung mundur", ket: "5 − 3: mundur 4, 3, 2. Hasilnya 2." },
            { ikon: "🔟", nama: "Dari 10", ket: "10 − 7: tiga petak masih kosong." },
          ].map((c, i) => (
            <div key={c.nama} className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-xl" aria-hidden="true">
                {c.ikon}
              </span>
              <p className="min-w-0 text-sm font-black leading-tight text-[#1C01A5]">
                {i + 1}. {c.nama}
                <span className="block text-[11px] font-black text-[#1C01A5]/75">{c.ket}</span>
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_B3.map((g) => (
            <button
              key={g.nama}
              type="button"
              aria-label={`Dengarkan: ${g.nama}`}
              onClick={() => speakGuru(g.suara)}
              className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl bg-[#F0FDF4] px-1 py-2 text-center"
            >
              <span className="text-3xl">{g.ikon}</span>
              <span className="text-base font-black leading-tight text-[#14532D]">{g.nama}</span>
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]/80">{g.ket}</span>
              <LencanaSuara kelas="h-7 w-7" />
            </button>
          ))}
        </div>
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete. Empat permainan dengan benda yang bisa dipegang.        */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 1. Telur Utuh, Telur Pecah (hlm. 88) ----------------- */

const RONDE_TELUR = [
  { mula: 6, pecah: 2 },
  { mula: 8, pecah: 3 },
];

function RondeTelur({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TELUR[ronde];
  const utuh = d.mula - d.pecah;
  const [pecah, setPecah] = useState<boolean[]>(() => Array.from({ length: d.mula }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = pecah.filter(Boolean).length;
  const beres = jumlah === d.pecah;
  const akhir = ronde === RONDE_TELUR.length - 1;
  const suara = panel.suara["b3-telur"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(
    akhir ? suara : beres,
    `${ucapKurang(d.mula, d.pecah, utuh)}. ${ucapKurang(d.mula, utuh, d.pecah)}. Telur yang masih utuh ada ${kataK(utuh)}.`
  );

  const ketuk = (i: number) => {
    if (beres) return;
    const baru = pecah.slice();
    if (pecah[i]) {
      baru[i] = false;
      setPecah(baru);
      setKabar(null);
      return;
    }
    if (jumlah >= d.pecah) {
      setKabar({ teks: `Cukup! Yang pecah hanya ${d.pecah} telur.`, ok: false });
      return;
    }
    baru[i] = true;
    setPecah(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.pecah) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: telur yang utuh" : "Ketuk telur yang pecah!"}
        teks={`Ada ${kataK(d.mula)} telur di piring. ${kata(d.pecah)} telur pecah. Ketuk telur yang pecah. Lihat dua kalimat pengurangannya, lalu hitung telur yang masih utuh dan ucapkan banyaknya.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Ada {d.mula} telur. {d.pecah} telur pecah.
        </p>
        <div className="flex min-h-[110px] flex-wrap items-center justify-center gap-2 rounded-[2rem] border-4 border-[#1C01A5] bg-white px-3 py-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          {pecah.map((p, i) => (
            <button
              key={i}
              type="button"
              aria-label={p ? `Telur ke-${i + 1} sudah pecah` : `Telur ke-${i + 1}, ketuk untuk memecahkan`}
              aria-pressed={p}
              disabled={beres}
              onClick={() => ketuk(i)}
              className={`igil-tanpa-tepi ${p ? "igil-muncul" : ""}`}
            >
              <TelurSVG pecah={p} />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Semua {d.mula}</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">Pecah {jumlah}</span>
        </div>
        {beres ? (
          <div className="igil-muncul space-y-1.5">
            <PersK a={d.mula} b={d.pecah} c={bukaC ? utuh : "?"} kecil />
            {bukaC ? <PersK a={d.mula} b={utuh} c={d.pecah} kecil /> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahTelur({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Telur Utuh, Telur Pecah"
      warna="#FFE566"
      petunjuk="Ada telur di piring. Ketuk telur yang pecah, sebanyak yang diminta. Lihat dua kalimat pengurangan dari pisahan itu. Lalu hitung telur yang masih utuh dan ucapkan banyaknya."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-telur"
      jumlahRonde={RONDE_TELUR.length}
      kunciAkhir={5}
      belumSiap="Pecahkan telur sebanyak yang diminta dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTelur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Balon Dua Warna (hlm. 89) ------------------------- */

type WarnaBalon = "merah" | "kuning";
const RONDE_BALON = [
  { mula: 7, merah: 5 },
  { mula: 9, merah: 6 },
];

function RondeBalon({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BALON[ronde];
  const kuning = d.mula - d.merah;
  const warna = useMemo(() => susunWarna<WarnaBalon>(d.mula, d.merah, "merah", "kuning"), [d.mula, d.merah]);
  const [masuk, setMasuk] = useState<(WarnaBalon | null)[]>(() => Array.from({ length: d.mula }, () => null));
  const [pilih, setPilih] = useState<number | null>(null);
  const [jawab, setJawab] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const rapi = masuk.every((m) => m !== null);
  const akhir = ronde === RONDE_BALON.length - 1;
  const suara = panel.suara["b3-balon"] === true && akhir;
  const bukaKedua = !akhir || suara;
  useBicara(
    akhir ? suara : jawab,
    `${ucapKurang(d.mula, d.merah, kuning)}. ${ucapKurang(d.mula, kuning, d.merah)}.`
  );

  const taruh = (i: number, z: WarnaBalon) => {
    if (masuk[i] !== null || rapi) return;
    if (warna[i] !== z) {
      setKabar({ teks: `Balon itu berwarna ${warna[i]}. Masukkan ke keranjang ${warna[i]}.`, ok: false });
      return;
    }
    const baru = masuk.slice();
    baru[i] = z;
    setMasuk(baru);
    setPilih(null);
    setKabar(null);
  };

  const pilihAngka = (n: number) => {
    if (jawab) return;
    if (n === kuning) {
      setJawab(true);
      setKeliru(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung balon yang tidak merah, ya.", ok: false });
    }
  };

  const isiKeranjang = (z: WarnaBalon) => masuk.filter((m) => m === z).length;

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : jawab ? "Ucapkan: kalimat kedua" : rapi ? "Pilih hasilnya!" : "Pilah balonnya!"}
        teks={`Ada ${kataK(d.mula)} balon. Seret tiap balon ke keranjang yang warnanya sama, atau ketuk balon lalu ketuk keranjangnya. Setelah rapi, pilih hasil kalimat pengurangan yang pertama. Lalu ucapkan hasil kalimat yang kedua.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">Ada {d.mula} balon. Pilah menurut warnanya.</p>
        <div className="flex min-h-[84px] flex-wrap items-center justify-center gap-1.5 rounded-[2rem] border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          {masuk.map((m, i) =>
            m !== null ? null : (
              <BendaSeret
                key={i}
                id={String(i)}
                aktif={!rapi}
                label={`Balon ${warna[i]} ke-${i + 1}`}
                kelas={pilih === i ? "rounded-2xl ring-4 ring-[#F0AB00]" : ""}
                onKetuk={() => setPilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z === "b3-merah") taruh(i, "merah");
                  else if (z === "b3-kuning") taruh(i, "kuning");
                }}
              >
                <BalonSVG warna={warna[i] === "merah" ? MERAH_BALON : KUNING_BALON} />
              </BendaSeret>
            )
          )}
          {rapi ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["merah", "kuning"] as WarnaBalon[]).map((z) => (
            <button
              key={z}
              type="button"
              data-zona={`b3-${z}`}
              aria-label={`Keranjang balon ${z}, isi ${isiKeranjang(z)}`}
              onClick={() => (pilih !== null ? taruh(pilih, z) : undefined)}
              className="igil-tanpa-tepi flex min-h-[96px] flex-col items-center justify-start gap-1 rounded-3xl border-4 px-2 py-2"
              style={{ borderColor: TINTA, backgroundColor: z === "merah" ? "#FEE2E2" : "#FEF9C3" }}
            >
              <span className="text-sm font-black text-[#1C01A5]">
                Keranjang {z} • {isiKeranjang(z)}
              </span>
              <span className="flex flex-wrap items-center justify-center gap-0.5">
                {masuk.map((m, i) =>
                  m === z ? <BalonSVG key={i} warna={z === "merah" ? MERAH_BALON : KUNING_BALON} kelas="h-9 w-6" /> : null
                )}
              </span>
            </button>
          ))}
        </div>
        {rapi ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <p className="mb-1 text-center text-xs font-black text-[#1C01A5]/70">
                Gabungan {d.mula}, sebagian {d.merah} dan {kuning}. Berapa {d.mula} − {d.merah}?
              </p>
              <PersK a={d.mula} b={d.merah} c={jawab ? kuning : "?"} nyala={jawab ? [] : [4]} />
            </div>
            {!jawab ? <PilihAngka opsi={opsiKurang(kuning)} keliru={keliru} onPilih={pilihAngka} /> : null}
            {jawab && bukaKedua ? <PersK a={d.mula} b={kuning} c={d.merah} kecil /> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahBalon({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Balon Dua Warna"
      warna="#FDBA74"
      petunjuk="Pilah balon ke keranjang yang warnanya sama. Setelah rapi, pilih hasil pengurangan yang pertama. Pada soal terakhir, ucapkan hasil pengurangan yang kedua."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-balon"
      jumlahRonde={RONDE_BALON.length}
      kunciAkhir={6}
      belumSiap="Pilah semua balon dan pilih hasilnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBalon ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Lompat Mundur di Batu (hlm. 94-95) ---------------- */

const RONDE_BATU = [
  { mula: 3, kurang: 2, nama: "Upe" },
  { mula: 5, kurang: 3, nama: "Kira" },
  { mula: 7, kurang: 4, nama: "Wei" },
];
const JUMLAH_BATU = 8;

function RondeBatu({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BATU[ronde];
  const c = d.mula - d.kurang;
  const [pos, setPos] = useState(d.mula);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const lompat = d.mula - pos;
  const beres = lompat === d.kurang;
  const akhir = ronde === RONDE_BATU.length - 1;
  const suara = panel.suara["b3-batu"] === true && akhir;
  const bukaC = !akhir || suara;
  const jejak = Array.from({ length: lompat + 1 }, (_, i) => d.mula - i);
  useBicara(akhir ? suara : beres, `${jejak.map((n) => kataK(n)).join(", ")}. ${ucapKurang(d.mula, d.kurang, c)}.`);

  const letak = (n: number) => ({ left: `${(n - 0.5) * (100 / JUMLAH_BATU)}%`, top: n % 2 === 0 ? "62%" : "30%" });

  const ketuk = (n: number) => {
    if (beres) return;
    if (n === pos - 1) {
      setPos(n);
      setKabar(null);
      if (d.mula - n === d.kurang) {
        letusan.picu();
        onBeres();
      }
    } else if (n >= pos) {
      setKabar({ teks: "Mundur artinya ke angka yang lebih kecil. Ketuk batu di belakangmu.", ok: false });
    } else {
      setKabar({ teks: "Lompat satu langkah saja. Ketuk batu tepat di belakangmu.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? `Ucapkan: ${d.nama} mendarat di mana?` : `${d.nama} lompat mundur!`}
        teks={`${d.nama} berdiri di batu angka ${kataK(d.mula)}. ${d.nama} melompat ${kataK(d.kurang)} langkah ke belakang. Ketuk batu tepat di belakang ${d.nama}, lagi dan lagi, sebanyak ${kataK(d.kurang)} kali. Lalu ucapkan di angka berapa ${d.nama} mendarat.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {d.nama} di angka {d.mula}. Lompat {d.kurang} langkah ke belakang.
        </p>
        <div className="relative h-44 overflow-hidden rounded-3xl border-4 border-[#1C01A5] bg-[#9CCBF5]">
          <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M10 22 q10 -6 20 0 t20 0 M120 84 q10 -6 20 0 t20 0 M230 26 q10 -6 20 0 t20 0 M60 90 q10 -6 20 0" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
          </svg>
          {Array.from({ length: JUMLAH_BATU }, (_, i) => i + 1).map((n) => {
            const pernah = n < d.mula && n >= pos;
            const sini = n === pos;
            return (
              <button
                key={n}
                type="button"
                aria-label={`Batu angka ${n}${sini ? ", tempat berdiri" : ""}`}
                disabled={beres}
                onClick={() => ketuk(n)}
                style={letak(n)}
                className={`igil-tanpa-tepi absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[45%] border-4 border-[#1C01A5] text-xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${
                  sini ? "bg-[#FFE566]" : pernah ? "bg-[#BBF7D0]" : n === d.mula ? "bg-[#FDE68A]" : "bg-[#E5E7EB]"
                }`}
              >
                {n}
              </button>
            );
          })}
          <span
            className="pointer-events-none absolute -translate-x-1/2 text-3xl leading-none transition-all duration-300"
            style={{ left: letak(pos).left, top: `calc(${letak(pos).top} - 44px)` }}
            aria-hidden="true"
          >
            🧒
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Mulai {d.mula}</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">
            Lompatan {lompat} dari {d.kurang}
          </span>
          {lompat > 0 && !beres ? (
            <button
              type="button"
              aria-label="Ulangi dari awal"
              onClick={() => {
                setPos(d.mula);
                setKabar(null);
              }}
              className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]"
            >
              ↩ Ulangi
            </button>
          ) : null}
        </div>
        {beres ? <PersK a={d.mula} b={d.kurang} c={bukaC ? c : "?"} /> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahBatu({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Lompat Mundur di Batu"
      warna="#BAE6FD"
      petunjuk="Seorang anak berdiri di batu bernomor. Ketuk batu tepat di belakangnya, lagi dan lagi, sebanyak yang diminta. Lalu ucapkan di angka berapa anak itu mendarat."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-batu"
      jumlahRonde={RONDE_BATU.length}
      kunciAkhir={3}
      belumSiap="Lompat mundur sebanyak yang diminta dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBatu ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kantong Sepuluh Bola (hlm. 98) -------------------- */

type WarnaBola = "merah" | "biru";
const RONDE_KANTONG = [
  { merah: 7, biru: 3 },
  { merah: 10, biru: 0 },
  { merah: 4, biru: 6 },
];

function RondeKantong({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KANTONG[ronde];
  const warna = useMemo(() => susunWarna<WarnaBola>(10, d.merah, "merah", "biru"), [d.merah]);
  const [diambil, setDiambil] = useState<boolean[]>(() => Array.from({ length: 10 }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = diambil.filter(Boolean).length;
  const beres = jumlah === d.merah;
  const akhir = ronde === RONDE_KANTONG.length - 1;
  const suara = panel.suara["b3-kantong"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(
    akhir ? suara : beres,
    `${ucapKurang(10, d.merah, d.biru)}. ${ucapKurang(10, d.biru, d.merah)}. Bola yang tinggal di kantong ada ${kataK(d.biru)}.`
  );

  const ambil = (i: number) => {
    if (beres || diambil[i]) return;
    if (warna[i] !== "merah") {
      setKabar({ teks: "Yang diambil bola merah saja. Bola biru tetap di kantong.", ok: false });
      return;
    }
    const baru = diambil.slice();
    baru[i] = true;
    setDiambil(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.merah) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: bola di kantong" : "Ambil bola merah!"}
        teks="Ada sepuluh bola di dalam kantong. Ketuk semua bola merah untuk mengambilnya ke meja. Lalu hitung bola yang masih tinggal di kantong dan ucapkan banyaknya."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">Ada 10 bola di kantong. Ambil bola merah.</p>
        <div className="rounded-[2rem] border-4 border-[#1C01A5] bg-[#E0E7FF] px-2 pb-3 pt-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">👜 Kantong</p>
          <div className="flex min-h-[110px] flex-wrap items-center justify-center gap-1">
            {diambil.map((a, i) =>
              a ? null : (
                <button
                  key={i}
                  type="button"
                  aria-label={`Bola ${warna[i]}`}
                  disabled={beres}
                  onClick={() => ambil(i)}
                  className="igil-tanpa-tepi"
                >
                  <BolaSVG warna={warna[i] === "merah" ? MERAH_BALON : BIRU_BOLA} />
                </button>
              )
            )}
            {beres && d.biru === 0 ? <span className="text-sm font-black text-[#1C01A5]/70">Kantong kosong</span> : null}
          </div>
        </div>
        <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] p-2">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Di meja • {jumlah}</p>
          <span className="flex min-h-[40px] flex-wrap items-center justify-center gap-1">
            {diambil.map((a, i) => (a ? <BolaSVG key={i} warna={MERAH_BALON} kelas="igil-muncul h-8 w-8" /> : null))}
          </span>
        </div>
        {beres ? (
          <div className="igil-muncul space-y-1.5">
            <PersK a={10} b={d.merah} c={bukaC ? d.biru : "?"} kecil />
            {bukaC ? <PersK a={10} b={d.biru} c={d.merah} kecil /> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKantong({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kantong Sepuluh Bola"
      warna="#FCA5A5"
      petunjuk="Ada sepuluh bola di dalam kantong. Ketuk semua bola merah untuk mengambilnya. Lalu hitung bola yang masih tinggal di kantong dan ucapkan banyaknya pada soal terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-kantong"
      jumlahRonde={RONDE_KANTONG.length}
      kunciAkhir={6}
      belumSiap="Ambil semua bola merah dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKantong ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "telur" | "balon" | "batu" | "kantong";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "telur" },
  { nomor: 2, tipe: "balon" },
  { nomor: 3, tipe: "batu" },
  { nomor: 4, tipe: "kantong" },
];

export function ConcretePenguranganB(props: Umum) {
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
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang, pilah, dan lompat!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span
            key={l.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "telur" ? <LangkahTelur {...dasar} /> : null}
        {langkah.tipe === "balon" ? <LangkahBalon {...dasar} /> : null}
        {langkah.tipe === "batu" ? <LangkahBatu {...dasar} /> : null}
        {langkah.tipe === "kantong" ? <LangkahKantong {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram saja. Tidak ada gambar benda.                    */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Bagan Pasangan: Cari Sebagian (hlm. 88-92) -------- */

const RONDE_BAGAN: { g: number; a: number; b: number; hilang: "a" | "b" }[] = [
  { g: 6, a: 4, b: 2, hilang: "b" },
  { g: 7, a: 2, b: 5, hilang: "b" },
  { g: 3, a: 3, b: 0, hilang: "b" },
  { g: 8, a: 5, b: 3, hilang: "a" },
];

function RondeBagan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BAGAN[ronde];
  const kunci = d.hilang === "a" ? d.a : d.b;
  const tahu = d.hilang === "a" ? d.b : d.a;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_BAGAN.length - 1;
  const suara = panel.suara["b3-bagan"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : benar, `${ucapKurang(d.g, d.a, d.b)}. ${ucapKurang(d.g, d.b, d.a)}.`);

  const pilih = (n: number) => {
    if (benar) return;
    if (n === kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Gabungan dikurangi sebagian yang ada, hasilnya sebagian yang kosong.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : benar ? "Ucapkan: kalimat kedua" : "Isi lingkaran yang kosong"}
        teks={`Lihat bagan pasangan. Gabungan ${kataK(d.g)}. Satu sebagian ${kataK(tahu)}. Pilih angka untuk lingkaran yang kosong. Gabungan dikurangi sebagian yang ada, hasilnya sebagian yang kosong.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Gabungannya ${d.g}.`, `Satu sebagiannya ${tahu}.`, "Berapa sebagian yang lain?"]} />
        <Bagan
          gabungan={d.g}
          a={d.hilang === "a" ? (benar ? d.a : "?") : d.a}
          b={d.hilang === "b" ? (benar ? d.b : "?") : d.b}
          nama
          nyala={benar ? [] : [d.hilang]}
          kelas="w-full max-w-[250px]"
        />
        {!benar ? <PilihAngka opsi={opsiKurang(kunci)} keliru={keliru} onPilih={pilih} /> : null}
        {benar ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Dari bagan ini, dua pengurangan:</p>
            <PersK a={d.g} b={d.hilang === "b" ? d.a : d.b} c={d.hilang === "b" ? d.b : d.a} kecil />
            {bukaC ? <PersK a={d.g} b={d.hilang === "b" ? d.b : d.a} c={d.hilang === "b" ? d.a : d.b} kecil /> : <PersK a={d.g} b={d.a} c="?" kecil />}
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuBagan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Bagan Pasangan: Cari Sebagian"
      warna="#C7D2FE"
      petunjuk="Lihat bagan pasangan bilangan. Pilih angka untuk lingkaran yang kosong. Gabungan dikurangi sebagian yang ada, hasilnya sebagian yang kosong. Pada soal terakhir, ucapkan hasil kalimat pengurangan yang masih bertanda tanya."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-bagan"
      jumlahRonde={RONDE_BAGAN.length}
      kunciAkhir={3}
      belumSiap="Isi lingkaran yang kosong dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBagan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Garis Bilangan: Lompat ke Belakang (hlm. 94-97) --- */

const RONDE_GARIS = [
  { mula: 5, kurang: 1 },
  { mula: 6, kurang: 3 },
  { mula: 9, kurang: 4 },
];

function RondeGaris({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_GARIS[ronde];
  const c = d.mula - d.kurang;
  const [pos, setPos] = useState(d.mula);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const lompat = d.mula - pos;
  const beres = lompat === d.kurang;
  const akhir = ronde === RONDE_GARIS.length - 1;
  const suara = panel.suara["b3-garis"] === true && akhir;
  const bukaC = !akhir || suara;
  const cx = (n: number) => (n + 0.5) * 30;
  useBicara(akhir ? suara : beres, `${ucapKurang(d.mula, d.kurang, c)}. Mendarat di angka ${kataK(c)}.`);

  const ketuk = (n: number) => {
    if (beres) return;
    if (n === pos - 1) {
      setPos(n);
      setKabar(null);
      if (d.mula - n === d.kurang) {
        letusan.picu();
        onBeres();
      }
    } else if (n >= pos) {
      setKabar({ teks: "Mundur artinya ke kiri, ke angka yang lebih kecil.", ok: false });
    } else {
      setKabar({ teks: "Lompat satu langkah saja. Ketuk angka tepat di sebelah kiri.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: angka tempat berhenti" : "Ketuk angka di sebelah kiri"}
        teks={`Aku di angka ${kataK(d.mula)}. Aku melompat ${kataK(d.kurang)} langkah ke belakang. Ketuk angka tepat di sebelah kiri titik merah, lagi dan lagi, sebanyak ${kataK(d.kurang)} kali. Lalu ucapkan di angka berapa aku berhenti.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={[`Aku di angka ${d.mula}.`, `Aku melompat ${d.kurang} langkah ke belakang.`, "Di angka berapakah aku?"]} />
        <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 pb-2 pt-1">
          <svg viewBox="0 0 330 44" className="block h-auto w-full" aria-hidden="true">
            {Array.from({ length: lompat }, (_, h) => (
              <path
                key={h}
                d={`M ${cx(d.mula - h)} 42 Q ${(cx(d.mula - h) + cx(d.mula - h - 1)) / 2} -6 ${cx(d.mula - h - 1)} 42`}
                fill="none"
                stroke={WARNA_DATANG}
                strokeWidth="3.6"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="grid grid-cols-11" role="group" aria-label="Garis bilangan nol sampai sepuluh">
            {Array.from({ length: 11 }, (_, n) => {
              const sini = n === pos;
              const awal = n === d.mula;
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Angka ${n}${sini ? ", titik merah di sini" : awal ? ", titik mulai" : ""}`}
                  disabled={beres}
                  onClick={() => ketuk(n)}
                  className="igil-tanpa-tepi flex h-10 items-center justify-center"
                >
                  <span
                    className={`flex h-[26px] w-[26px] items-center justify-center rounded-full border-[3px] border-[#1C01A5] text-sm font-black leading-none ${
                      sini ? "text-white" : "text-[#1C01A5]"
                    }`}
                    style={{ backgroundColor: sini ? WARNA_ADA : awal ? "#FFE566" : "#FFFFFF" }}
                  >
                    {n}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="pt-1 text-center text-sm font-black text-[#1C01A5]">
            Lompatan {lompat} dari {d.kurang}
          </p>
        </div>
        {lompat > 0 && !beres ? (
          <button
            type="button"
            aria-label="Ulangi dari awal"
            onClick={() => {
              setPos(d.mula);
              setKabar(null);
            }}
            className={TOMBOL_KECIL}
          >
            ↩ Ulangi
          </button>
        ) : null}
        {beres ? <PersK a={d.mula} b={d.kurang} c={bukaC ? c : "?"} /> : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuGaris({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Garis Bilangan: Lompat ke Belakang"
      warna="#FDE68A"
      petunjuk="Ketuk angka tepat di sebelah kiri titik merah, lagi dan lagi, sebanyak yang diminta. Setiap lompatan menggambar satu busur. Lalu ucapkan di angka berapa kamu berhenti pada soal terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-garis"
      jumlahRonde={RONDE_GARIS.length}
      kunciAkhir={5}
      belumSiap="Lompat ke belakang sebanyak yang diminta dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGaris ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Bingkai Sepuluh: Warnai yang Kosong (hlm. 99-100) - */

const RONDE_BINGKAI = [{ isi: 6 }, { isi: 4 }, { isi: 9 }];

function RondeBingkai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const isi = RONDE_BINGKAI[ronde].isi;
  const kosong = 10 - isi;
  const [biru, setBiru] = useState<boolean[]>(() => Array.from({ length: 10 }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = biru.filter(Boolean).length;
  const beres = jumlah === kosong;
  const akhir = ronde === RONDE_BINGKAI.length - 1;
  const suara = panel.suara["b3-bingkai"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${ucapKurang(10, isi, kosong)}. ${ucapKurang(10, kosong, isi)}.`);

  const ketuk = (i: number) => {
    if (beres) return;
    if (i < isi) {
      setKabar({ teks: "Petak itu sudah terisi titik merah. Warnai petak yang kosong.", ok: false });
      return;
    }
    const baru = biru.slice();
    baru[i] = !baru[i];
    setBiru(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === kosong) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: banyak petak biru" : "Warnai petak yang kosong"}
        teks={`Bingkai sepuluh punya sepuluh petak. ${kata(isi)} petak terisi titik merah. Ketuk petak yang kosong untuk mewarnainya biru, sampai bingkai penuh. Lalu hitung petak biru.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={["Semua ada 10 petak.", `Terisi ${isi} titik merah.`, "Berapa petak yang kosong?"]} />
        <div className="mx-auto grid max-w-[270px] grid-cols-5 gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white p-2" role="group" aria-label="Bingkai sepuluh">
          {Array.from({ length: 10 }, (_, i) => {
            const terisi = i < isi;
            return (
              <button
                key={i}
                type="button"
                aria-label={terisi ? `Petak ${i + 1}, terisi merah` : biru[i] ? `Petak ${i + 1}, sudah biru` : `Petak ${i + 1}, kosong`}
                disabled={beres && !terisi}
                onClick={() => ketuk(i)}
                className="igil-tanpa-tepi flex aspect-square items-center justify-center rounded-lg border-[3px] border-[#1C01A5]/60 bg-[#F8FAFF]"
              >
                {terisi ? (
                  <span className="block h-[62%] w-[62%] rounded-full border-[3px] border-[#1C01A5]" style={{ backgroundColor: WARNA_ADA }} />
                ) : biru[i] ? (
                  <span className="igil-muncul block h-[62%] w-[62%] rounded-full border-[3px] border-[#1C01A5]" style={{ backgroundColor: WARNA_DATANG }} />
                ) : null}
              </button>
            );
          })}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Merah {isi} • Biru {jumlah}
        </p>
        {beres ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2">
            <p className="text-sm font-black text-[#1C01A5]">Dua pengurangan dari 10:</p>
            <PersK a={10} b={isi} c={bukaC ? kosong : "?"} kecil />
            {bukaC ? <PersK a={10} b={kosong} c={isi} kecil /> : null}
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuBingkai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Bingkai Sepuluh: Warnai yang Kosong"
      warna="#FCA5A5"
      petunjuk="Bingkai sepuluh punya sepuluh petak. Ketuk petak yang kosong untuk mewarnainya biru sampai bingkai penuh. Banyaknya petak biru adalah hasil sepuluh dikurangi yang terisi. Pada soal terakhir, ucapkan banyak petak biru."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-bingkai"
      jumlahRonde={RONDE_BINGKAI.length}
      kunciAkhir={1}
      belumSiap="Warnai semua petak yang kosong dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBingkai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Picture --------------------------------------------- */

type TipePicture = "bagan" | "garis" | "bingkai";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "bagan" },
  { nomor: 6, tipe: "garis" },
  { nomor: 7, tipe: "bingkai" },
];

export function PicturePenguranganB(props: Umum) {
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
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat, isi, dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span
            key={k.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "bagan" ? <KartuBagan {...dasar} /> : null}
        {kartu.tipe === "garis" ? <KartuGaris {...dasar} /> : null}
        {kartu.tipe === "bingkai" ? <KartuBingkai {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tiga permainan angka dan simbol, lalu Poin Penting.     */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Dua Kalimat dari Satu Bagan (hlm. 88-90) ---------- */

const RONDE_KARTU: { g: number; a: number; b: number; urut: number[] }[] = [
  { g: 6, a: 4, b: 2, urut: [2, 0, 3, 1] },
  { g: 7, a: 5, b: 2, urut: [1, 3, 0, 2] },
  { g: 3, a: 3, b: 0, urut: [3, 1, 2, 0] },
  { g: 10, a: 7, b: 3, urut: [0, 2, 1, 3] },
];

function RondeKartu({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const d = RONDE_KARTU[ronde];
  const kartuAsli = [
    { teks: `${d.g} − ${d.a} = ${d.b}`, benar: true },
    { teks: `${d.g} − ${d.b} = ${d.a}`, benar: true },
    {
      teks: d.a === d.g ? `${d.g} − ${d.b} = ${d.b}` : `${d.a} − ${d.g} = ${d.b}`,
      benar: false,
    },
    { teks: `${d.g} − ${d.a} = ${d.b + 1}`, benar: false },
  ];
  const kartu = d.urut.map((i) => kartuAsli[i]);
  const [terpilih, setTerpilih] = useState<boolean[]>(() => kartu.map(() => false));
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = terpilih.filter(Boolean).length;
  const beres = jumlah >= 2;
  useBicara(beres, `${ucapKurang(d.g, d.a, d.b)}. ${ucapKurang(d.g, d.b, d.a)}.`);

  const ketuk = (i: number) => {
    if (beres || terpilih[i]) return;
    if (kartu[i].benar) {
      const baru = terpilih.slice();
      baru[i] = true;
      setTerpilih(baru);
      setKeliru(null);
      setKabar(null);
      if (baru.filter(Boolean).length >= 2) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(i);
      setKabar({ teks: "Belum tepat. Gabungan harus ditulis pertama, dan hasilnya harus cocok dengan bagan.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Dua kalimat sudah ketemu!" : `Pilih 2 kalimat yang benar (${jumlah} dari 2)`}
        teks={`Gabungan ${kataK(d.g)}. Sebagian ${kataK(d.a)} dan ${kataK(d.b)}. Pilih dua kartu kalimat pengurangan yang benar.`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">
          Gabungan <span className="rounded-full bg-[#FFE566] px-2">{d.g}</span> • Sebagian{" "}
          <span className="rounded-full bg-[#C7D2FE] px-2">{d.a}</span> dan <span className="rounded-full bg-[#C7D2FE] px-2">{d.b}</span>
        </p>
        <div className="grid grid-cols-2 gap-2">
          {kartu.map((k, i) => (
            <button
              key={`${k.teks}-${keliru === i ? "x" : "o"}`}
              type="button"
              aria-label={`Kartu kalimat ${k.teks}${terpilih[i] ? ", sudah benar" : ""}`}
              disabled={beres && !terpilih[i]}
              onClick={() => ketuk(i)}
              className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-2xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                terpilih[i] ? "bg-[#BBF7D0]" : "bg-[#FFE566]"
              } ${keliru === i ? "igil-goyang" : ""} disabled:opacity-50`}
            >
              {terpilih[i] ? "✅ " : ""}
              {k.teks}
            </button>
          ))}
        </div>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuKalimat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Dua Kalimat dari Satu Bagan"
      warna="#C7D2FE"
      petunjuk="Lihat gabungan dan dua sebagian. Pilih dua kartu kalimat pengurangan yang benar. Terakhir, ucapkan hasil kalimat pertama."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-kartu"
      jumlahRonde={RONDE_KARTU.length}
      kunciAkhir={3}
      belumSiap="Pilih dua kalimat yang benar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKartu ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Hitung Mundur Berantai (hlm. 94-96) --------------- */

const RONDE_RANTAI = [
  { a: 5, b: 2 },
  { a: 8, b: 3 },
  { a: 10, b: 4 },
];

function RondeRantai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_RANTAI[ronde];
  const c = d.a - d.b;
  const [rantai, setRantai] = useState<number[]>([d.a]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const langkah = rantai.length - 1;
  const beres = langkah === d.b;
  const sekarang = rantai[rantai.length - 1];
  const akhir = ronde === RONDE_RANTAI.length - 1;
  const suara = panel.suara["b3-rantai"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(akhir ? suara : beres, `${rantai.map((n) => kataK(n)).join(", ")}. ${ucapKurang(d.a, d.b, c)}.`);

  const opsi = useMemo(() => {
    const dasar = [sekarang - 1, sekarang - 2, Math.min(sekarang + 1, 10)];
    const putar = (langkah + ronde) % 3;
    return [...dasar.slice(putar), ...dasar.slice(0, putar)];
  }, [sekarang, langkah, ronde]);

  const pilih = (n: number) => {
    if (beres) return;
    if (n === sekarang - 1) {
      const baru = [...rantai, n];
      setRantai(baru);
      setKeliru(null);
      setKabar(null);
      if (baru.length - 1 === d.b) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(n);
      setKabar({ teks: "Mundur satu langkah saja: angka yang tepat satu lebih kecil.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: hasil akhir" : `Mundur ${d.b} langkah (${langkah} dari ${d.b})`}
        teks={`Mulai dari angka ${kataK(d.a)}. Mundur ${kataK(d.b)} langkah. Setiap langkah, pilih angka yang tepat satu lebih kecil.`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="text-center text-lg font-black leading-snug text-[#1C01A5]">
          <span aria-hidden="true">🔍 </span>
          {d.a} − {d.b}: mulai dari {d.a}, mundur {d.b} langkah.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1" aria-label={`Rantai angka: ${rantai.join(", ")}`}>
          {rantai.map((n, i) => (
            <React.Fragment key={i}>
              {i > 0 ? (
                <span className="text-xl font-black text-[#1C01A5]/50" aria-hidden="true">
                  →
                </span>
              ) : null}
              <span
                className={`igil-muncul flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-3xl font-black text-[#1C01A5] ${
                  i === 0 ? "bg-[#FFE566]" : i === rantai.length - 1 && beres ? "bg-[#BBF7D0]" : "bg-white"
                }`}
              >
                {n}
              </span>
            </React.Fragment>
          ))}
          {!beres ? (
            <>
              <span className="text-xl font-black text-[#1C01A5]/50" aria-hidden="true">
                →
              </span>
              <span className="igil-denyut flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-dashed border-[#1C01A5]/60 bg-white text-3xl font-black text-[#1C01A5]">
                ?
              </span>
            </>
          ) : null}
        </div>
        {!beres ? <PilihAngka opsi={opsi} keliru={keliru} onPilih={pilih} /> : null}
        {beres ? <PersK a={d.a} b={d.b} c={bukaC ? c : "?"} /> : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuRantai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Hitung Mundur Berantai"
      warna="#C7D2FE"
      petunjuk="Mulai dari angka awal. Pilih angka yang tepat satu lebih kecil, lagi dan lagi, sebanyak bilangan pengurang. Angka terakhir adalah hasilnya. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b3-rantai"
      jumlahRonde={RONDE_RANTAI.length}
      kunciAkhir={6}
      belumSiap="Selesaikan rantai angkanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRantai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara (hlm. 91-93, 99) -------- */

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [a, setA] = useState(9);
  const [b, setB] = useState(4);
  const [lulus, setLulus] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const mula = tahap === 0 ? 10 : a;
  const kurang = tahap === 0 ? 6 : b;
  const c = mula - kurang;
  const id = tahap === 0 ? "b3-tulis-1" : `b3-tulis-2-${a}-${b}`;
  const suara = panel.suara[id] === true;
  useBicara(suara, `${ucapKurang(mula, kurang, c)}.`);

  const ubahA = (delta: number) => {
    if (suara) return;
    const na = a + delta;
    if (na < 1 || na > 10) {
      setKabar({ teks: na < 1 ? "Paling sedikit satu, ya." : "Paling banyak sepuluh, ya.", ok: false });
      return;
    }
    setKabar(null);
    setA(na);
    if (b > na) setB(na);
  };
  const ubahB = (delta: number) => {
    if (suara) return;
    const nb = b + delta;
    if (nb < 0) {
      setKabar({ teks: "Yang dikurangi paling sedikit nol, ya.", ok: false });
      return;
    }
    if (nb > a) {
      setKabar({ teks: "Yang dikurangi tidak boleh lebih besar dari bilangan awal.", ok: false });
      return;
    }
    setKabar(null);
    setB(nb);
  };

  const stepper = (judul: string, nilai: number, ubah: (d: number) => void, nama: string) => (
    <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2 text-center">
      <p className="text-xs font-black text-[#1C01A5]/70">{judul}</p>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label={`Kurangi ${nama}`}
          disabled={suara}
          onClick={() => ubah(-1)}
          className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
        >
          −
        </button>
        <span className="min-w-8 text-center text-3xl font-black text-[#1C01A5]">{nilai}</span>
        <button
          type="button"
          aria-label={`Tambah ${nama}`}
          disabled={suara}
          onClick={() => ubah(1)}
          className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() =>
          speakGuru("Ucapkan hasil pengurangan, lalu guratkan angkanya di kanvas. Setelah itu, buat kalimat pengurangan milikmu sendiri.")
        }
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
        {tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}
      </p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Ucapkan hasilnya" : "Buat kalimatmu, lalu ucapkan"}
          teks={
            tahap === 0
              ? "Sepuluh dikurangi enam sama dengan berapa? Ucapkan hasilnya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih bilangan awal dan bilangan yang dikurangi sesukamu. Yang dikurangi boleh nol, boleh sama dengan bilangan awal. Ucapkan hasilnya, lalu guratkan angkanya."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {stepper("Bilangan awal", a, ubahA, "bilangan awal")}
              {stepper("Dikurangi", b, ubahB, "bilangan yang dikurangi")}
            </div>
          ) : null}
          <PersK a={mula} b={kurang} c={suara ? c : "?"} />
          <KabarChip kabar={kabar} />
        </div>
        <JawabSuara id={id} jumlah={c} panel={panel} siap belumSiap="" />
        {suara ? (
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
  "Ingat selalu! Ada tiga cara mengurangkan. Satu, pasangan bilangan: gabungan dikurangi sebagian, hasilnya sebagian yang lain. Satu bagan menghasilkan dua pengurangan. Dua, menghitung mundur: lompat ke belakang pada garis bilangan, tempat mendarat adalah hasilnya. Tiga, pengurangan dari sepuluh: hasilnya adalah petak yang kosong. Bilangan dikurangi nol hasilnya tetap. Bilangan dikurangi dirinya sendiri hasilnya nol.";

const POIN_B3: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🔵",
    nama: "Gabungan dan sebagian",
    isi: <Persamaan a={4} b={2} c={6} kecil />,
    suara: "Empat dan dua jika digabung menjadi enam. Enam adalah gabungan. Empat dan dua adalah sebagian.",
  },
  {
    ikon: "✌️",
    nama: "Satu bagan, dua pengurangan",
    isi: (
      <div className="space-y-1">
        <PersK a={6} b={2} c={4} kecil />
        <PersK a={6} b={4} c={2} kecil />
      </div>
    ),
    suara: "Dari satu bagan ada dua pengurangan. Enam dikurangi dua sama dengan empat. Enam dikurangi empat sama dengan dua.",
  },
  {
    ikon: "🐸",
    nama: "Hitung mundur",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">5 → 4 → 3 → 2, jadi 5 − 3 = 2</p>,
    suara: "Menghitung mundur. Lima, empat, tiga, dua. Lima dikurangi tiga sama dengan dua. Tempat mendarat adalah hasilnya.",
  },
  {
    ikon: "0️⃣",
    nama: "Nol dan bilangan sama",
    isi: (
      <div className="space-y-1">
        <PersK a={5} b={0} c={5} kecil />
        <PersK a={5} b={5} c={0} kecil />
      </div>
    ),
    suara: "Lima dikurangi nol sama dengan lima, hasilnya tetap. Lima dikurangi lima sama dengan nol.",
  },
  {
    ikon: "🔟",
    nama: "Pengurangan dari 10",
    isi: (
      <div className="space-y-1">
        <PersK a={10} b={7} c={3} kecil />
        <PersK a={10} b={3} c={7} kecil />
      </div>
    ),
    suara: "Sepuluh dikurangi tujuh sama dengan tiga. Sepuluh dikurangi tiga sama dengan tujuh. Petak yang kosong adalah hasilnya.",
  },
];

const CATATANKU = [
  "Aku sudah mengerti pasangan bilangan.",
  "Aku bisa menghitung mundur pada garis bilangan.",
  "Aku bisa mengurangkan dari 10.",
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
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${
              iya[i] ? "bg-[#FFE566]" : "bg-white"
            }`}
          >
            {iya[i] ? "😊" : ""}
          </span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{t}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingB3({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B3.map((p) => (
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
            aria-label="Dengarkan: Pasangan sepuluh"
            onClick={() =>
              speakGuru("Pasangan sepuluh. Satu dan sembilan. Dua dan delapan. Tiga dan tujuh. Empat dan enam. Lima dan lima.")
            }
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🔟</span>
              Pasangan sepuluh
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {PASANGAN_SEPULUH.map(([x, y]) => (
              <span
                key={x}
                className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-base font-black text-[#1C01A5]"
              >
                {x} + {y}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            💡
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Periksa jawabanmu dengan menggabung: sebagian ditambah sebagian harus sama dengan gabungan.
          </p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "kalimat" | "rantai" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "kalimat" },
  { nomor: 9, tipe: "rantai" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractPenguranganB(props: Umum) {
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
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan simbol" warna="#1C01A5" />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      {poin ? (
        <PoinPentingB3
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "kalimat" ? <KartuKalimat {...dasar} /> : null}
          {kartu.tipe === "rantai" ? <KartuRantai {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}