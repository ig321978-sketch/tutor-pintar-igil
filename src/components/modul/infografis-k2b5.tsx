"use client";

import React from "react";
import { KotakPoster, TabelPoster } from "./kit-k2b2";
import { BENDA_POTONG, BENTUK_P, NAMA_ITEM, bagiBanyak, kepingSisa, type Garis, type JenisItem, type JenisPotong, type SisaPotong } from "./data-k2b5";
import { BIRU, BendaPotongSvg, FiguraSvg, GelasSvg, ItemSvg, MERAH, HIJAU } from "./dasar-k2b5";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 5 (Pecahan). Gambar saja: teks panel dan     */
/* suara berasal dari naskah-k2b5.ts. Semua dari SVG, tanpa API.               */
/* ------------------------------------------------------------------------ */

const V: Garis = [[50, 0], [50, 100]];
const H: Garis = [[0, 50], [100, 50]];
const D1: Garis = [[0, 0], [100, 100]];
const D2: Garis = [[100, 0], [0, 100]];

const Cap = ({ children, warna = BIRU }: { children: React.ReactNode; warna?: string }) => (
  <p className="text-center text-[11px] font-black leading-tight" style={{ color: warna }}>
    {children}
  </p>
);

const Besar = ({ children, warna = BIRU }: { children: React.ReactNode; warna?: string }) => (
  <p className="text-center text-3xl font-black leading-none" style={{ color: warna }}>
    {children}
  </p>
);

function Ubin({ children, ket, warna }: { children: React.ReactNode; ket: React.ReactNode; warna?: string }) {
  return (
    <KotakPoster warna={warna}>
      <div className="flex justify-center">{children}</div>
      <Cap>{ket}</Cap>
    </KotakPoster>
  );
}

/** Benda yang dipotong dengan garis lurus penuh. `jarak` menggeser keping supaya terlihat terpisah. */
function Potongan({ jenis, garis, jarak = 0.3, kelas = "h-20 w-20" }: { jenis: JenisPotong; garis: Garis[]; jarak?: number; kelas?: string }) {
  const poly = BENTUK_P[BENDA_POTONG[jenis].bentuk].titik;
  return <BendaPotongSvg jenis={jenis} ada={bagiBanyak(poly, garis)} jarak={jarak} kelas={kelas} />;
}

function Sisa({ jenis, sisa, kelas = "h-20 w-20", variasi = 0 }: { jenis: JenisPotong; sisa: SisaPotong; kelas?: string; variasi?: number }) {
  const k = kepingSisa(jenis, sisa, variasi);
  return <BendaPotongSvg jenis={jenis} ada={k.ada} hilang={k.hilang} kelas={kelas} />;
}

const Operator = ({ children }: { children: React.ReactNode }) => <span className="self-center text-2xl font-black text-[#1C01A5]">{children}</span>;

function Kelompok({ jenis, n, mulai = 0, kelas = "h-8 w-8", warna = "#FFFFFF", ket, tanda }: { jenis: JenisItem; n: number; mulai?: number; kelas?: string; warna?: string; ket?: React.ReactNode; tanda?: "benar" | "salah" }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex min-h-12 flex-wrap items-center justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] px-1.5 py-1" style={{ backgroundColor: warna }}>
        {Array.from({ length: n }, (_, i) => (
          <ItemSvg key={i} jenis={jenis} warna={NAMA_ITEM[jenis].warna[(i + mulai) % NAMA_ITEM[jenis].warna.length]} kelas={kelas} />
        ))}
      </div>
      {ket ? <Cap warna={tanda === "salah" ? MERAH : BIRU}>{ket}</Cap> : null}
    </div>
  );
}

const Tiga = ({ nomor, teks, warna }: { nomor: string; teks: string; warna: string }) => (
  <KotakPoster warna={warna}>
    <p className="flex items-center gap-2 text-sm font-black leading-snug text-[#1C01A5]">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-white">{nomor}</span>
      {teks}
    </p>
  </KotakPoster>
);

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK2B5A(): React.ReactNode[] {
  return [
    /* 1 Berbagi Martabak */
    <div key="1" className="space-y-1">
      <div className="flex justify-center">
        <Potongan jenis="martabak" garis={[V]} jarak={0.5} kelas="h-28 w-44" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <KotakPoster warna="#DBEAFE"><Cap>Bagian Kira</Cap></KotakPoster>
        <KotakPoster warna="#FCE7F3"><Cap>Bagian Tika</Cap></KotakPoster>
      </div>
    </div>,
    /* 2 Setengah Itu Apa */
    <div key="2" className="flex items-center justify-center gap-3">
      <FiguraSvg bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} kelas="h-24 w-24" label="Lingkaran dibagi dua sama besar, satu bagian berwarna" />
      <div className="space-y-1">
        <KotakPoster warna="#FEF3C7">
          <Besar>½</Besar>
          <Cap>setengah</Cap>
        </KotakPoster>
        <Cap>2 bagian • sama besar</Cap>
      </div>
    </div>,
    /* 3 Setengah di Sekitar Kita */
    <div key="3" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="Setengah semangka"><Sisa jenis="semangka" sisa="setengah" kelas="h-14 w-14" /></Ubin>
      <Ubin ket="Setengah gelas air"><GelasSvg level={0.5} kelas="h-14 w-14" /></Ubin>
      <Ubin ket="Setengah kue bolu"><Sisa jenis="kueBolu" sisa="setengah" kelas="h-14 w-14" /></Ubin>
      <Ubin ket="Setengah roti"><Sisa jenis="roti" sisa="setengah" kelas="h-14 w-14" /></Ubin>
      <Ubin ket="Setengah lipatan kertas"><FiguraSvg bentuk="persegi" garis={[V]} diwarnai={[true, false]} kelas="h-14 w-14" label="Kertas dilipat setengah" /></Ubin>
    </div>,
    /* 4 Melipat Kertas */
    <div key="4" className="grid grid-cols-4 gap-1.5">
      {([[V, "tegak"], [H, "mendatar"], [D1, "miring 1"], [D2, "miring 2"]] as [Garis, string][]).map(([g, n]) => (
        <Ubin key={n} ket={n}><FiguraSvg bentuk="persegi" garis={[g]} diwarnai={[true, false]} kelas="h-12 w-12" /></Ubin>
      ))}
    </div>,
    /* 5 Setengah pada Segi Empat */
    <div key="5" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="garis tegak"><FiguraSvg bentuk="persegi" garis={[V]} diwarnai={[true, false]} kelas="h-16 w-16" /></Ubin>
      <Ubin ket="garis mendatar"><FiguraSvg bentuk="persegi" garis={[H]} diwarnai={[true, false]} kelas="h-16 w-16" /></Ubin>
      <Ubin ket="garis miring"><FiguraSvg bentuk="persegi" garis={[D1]} diwarnai={[true, false]} kelas="h-16 w-16" /></Ubin>
    </div>,
    /* 6 Setengah pada Lingkaran */
    <div key="6" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="garis tegak"><FiguraSvg bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} kelas="h-16 w-16" /></Ubin>
      <Ubin ket="garis mendatar"><FiguraSvg bentuk="lingkaran" garis={[H]} diwarnai={[true, false]} kelas="h-16 w-16" /></Ubin>
      <Ubin ket="garis miring"><FiguraSvg bentuk="lingkaran" garis={[D1]} diwarnai={[true, false]} kelas="h-16 w-16" /></Ubin>
    </div>,
    /* 7 Gambar A dan Gambar B */
    <div key="7" className="grid grid-cols-2 gap-2">
      <KotakPoster warna="#DCFCE7">
        <div className="flex justify-center">
          <FiguraSvg bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} kelas="h-20 w-20" />
        </div>
        <p className="text-center text-sm font-black" style={{ color: HIJAU }}>A: sama besar ✔</p>
        <Cap>setengah</Cap>
      </KotakPoster>
      <KotakPoster warna="#FEE2E2">
        <div className="flex justify-center">
          <FiguraSvg bentuk="lingkaran" garis={[[[28, 0], [28, 100]]]} diwarnai={[true, false]} kelas="h-20 w-20" />
        </div>
        <p className="text-center text-sm font-black" style={{ color: MERAH }}>B: tidak sama ✘</p>
        <Cap warna={MERAH}>bukan setengah</Cap>
      </KotakPoster>
    </div>,
    /* 8 Setengah Gelas Air */
    <div key="8" className="flex items-end justify-center gap-1.5">
      <Ubin ket="penuh"><GelasSvg level={1} kelas="h-16 w-16" /></Ubin>
      <Operator>→</Operator>
      <Ubin ket="setengah"><GelasSvg level={0.5} kelas="h-16 w-16" /></Ubin>
      <Operator>+</Operator>
      <Ubin ket="setengah"><GelasSvg level={0.5} kelas="h-16 w-16" /></Ubin>
    </div>,
    /* 9 Tiga Pertanyaan Pemeriksa */
    <div key="9" className="space-y-1.5">
      <Tiga nomor="1" teks="Apakah benda utuh dibagi menjadi dua bagian?" warna="#DBEAFE" />
      <Tiga nomor="2" teks="Apakah kedua bagian sama besar?" warna="#FEF3C7" />
      <Tiga nomor="3" teks="Apakah yang ditunjukkan satu bagian itu?" warna="#FCE7F3" />
    </div>,
    /* 10 Dua Setengah, Satu Utuh */
    <div key="10" className="flex items-center justify-center gap-2">
      <Ubin ket="½"><Sisa jenis="martabak" sisa="setengah" kelas="h-16 w-16" variasi={2} /></Ubin>
      <Operator>+</Operator>
      <Ubin ket="½"><Sisa jenis="martabak" sisa="setengah" kelas="h-16 w-16" /></Ubin>
      <Operator>=</Operator>
      <Ubin ket="1 utuh"><Sisa jenis="martabak" sisa="utuh" kelas="h-16 w-16" /></Ubin>
    </div>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

export function visualInfografisK2B5B(): React.ReactNode[] {
  return [
    /* 1 Kelereng Malosi */
    <div key="1" className="space-y-1.5">
      <Kelompok jenis="kelereng" n={4} ket="Malosi punya 4 kelereng" warna="#DBEAFE" />
      <div className="grid grid-cols-2 gap-2">
        <Kelompok jenis="kelereng" n={2} ket="Upe: 2" warna="#FCE7F3" />
        <Kelompok jenis="kelereng" n={2} mulai={2} ket="Malosi: 2" warna="#DBEAFE" />
      </div>
    </div>,
    /* 2 Setengah dari Kumpulan Benda */
    <div key="2" className="grid grid-cols-2 gap-2">
      <Kelompok jenis="apel" n={3} ket="kelompok 1" warna="#FEF3C7" />
      <Kelompok jenis="apel" n={3} mulai={1} ket="kelompok 2" warna="#DCFCE7" />
      <div className="col-span-2">
        <Cap>Dua kelompok sama banyak. Tiap kelompok adalah setengah.</Cap>
      </div>
    </div>,
    /* 3 Satu untukmu, Satu untukku */
    <div key="3" className="grid grid-cols-2 gap-2">
      <KotakPoster warna="#DBEAFE">
        <p className="text-center text-sm font-black text-[#1C01A5]">Malosi</p>
        <div className="flex justify-center gap-1">
          {[1, 3].map((n) => (
            <div key={n} className="relative">
              <ItemSvg jenis="kelereng" warna={NAMA_ITEM.kelereng.warna[n % 3]} kelas="h-9 w-9" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F0AB00] text-[10px] font-black text-[#1C01A5]">{n}</span>
            </div>
          ))}
        </div>
      </KotakPoster>
      <KotakPoster warna="#FCE7F3">
        <p className="text-center text-sm font-black text-[#1C01A5]">Upe</p>
        <div className="flex justify-center gap-1">
          {[2, 4].map((n) => (
            <div key={n} className="relative">
              <ItemSvg jenis="kelereng" warna={NAMA_ITEM.kelereng.warna[n % 3]} kelas="h-9 w-9" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F0AB00] text-[10px] font-black text-[#1C01A5]">{n}</span>
            </div>
          ))}
        </div>
      </KotakPoster>
      <div className="col-span-2">
        <Cap>Bergantian: 1 Malosi, 2 Upe, 3 Malosi, 4 Upe</Cap>
      </div>
    </div>,
    /* 4 Setengah dari 4 */
    <div key="4" className="flex items-center justify-center gap-2">
      <Kelompok jenis="kelereng" n={2} ket="2" warna="#FEF3C7" />
      <Operator>|</Operator>
      <Kelompok jenis="kelereng" n={2} mulai={2} ket="2" warna="#DBEAFE" />
      <KotakPoster warna="#FFE566">
        <p className="text-center text-sm font-black text-[#1C01A5]">½ dari 4</p>
        <Besar>2</Besar>
      </KotakPoster>
    </div>,
    /* 5 Setengah dari 6 Ikan */
    <div key="5" className="flex items-center justify-center gap-2">
      <Kelompok jenis="ikan" n={3} kelas="h-7 w-7" ket="3" warna="#FEF3C7" />
      <Operator>|</Operator>
      <Kelompok jenis="ikan" n={3} mulai={1} kelas="h-7 w-7" ket="3" warna="#DBEAFE" />
      <KotakPoster warna="#FFE566">
        <p className="text-center text-sm font-black text-[#1C01A5]">½ dari 6</p>
        <Besar>3</Besar>
      </KotakPoster>
    </div>,
    /* 6 Bukan Setengah */
    <div key="6" className="flex items-center justify-center gap-2">
      <Kelompok jenis="ikan" n={4} kelas="h-6 w-6" ket="4" warna="#FEE2E2" tanda="salah" />
      <Operator>|</Operator>
      <Kelompok jenis="ikan" n={2} mulai={1} kelas="h-6 w-6" ket="2" warna="#FEE2E2" tanda="salah" />
      <KotakPoster warna="#FEE2E2">
        <p className="text-center text-sm font-black" style={{ color: MERAH }}>✘ bukan setengah</p>
        <Cap warna={MERAH}>tidak sama banyak</Cap>
      </KotakPoster>
    </div>,
    /* 7 Delapan Pensil Tika */
    <div key="7" className="flex items-center justify-center gap-2">
      <Kelompok jenis="pensil" n={4} kelas="h-7 w-7" ket="4" warna="#FEF3C7" />
      <Operator>|</Operator>
      <Kelompok jenis="pensil" n={4} mulai={1} kelas="h-7 w-7" ket="4" warna="#DBEAFE" />
      <KotakPoster warna="#FFE566">
        <p className="text-center text-sm font-black text-[#1C01A5]">½ dari 8</p>
        <Besar>4</Besar>
      </KotakPoster>
    </div>,
    /* 8 Pola Setengah */
    <TabelPoster
      key="8"
      kolom="1.2fr 1fr"
      kepala={["Banyak benda", "Setengahnya"]}
      baris={[
        ["4", "2"],
        ["6", "3"],
        ["8", "4"],
        ["10", "5"],
      ]}
    />,
    /* 9 Kalau Banyaknya Ganjil */
    <div key="9" className="flex items-center justify-center gap-2">
      <Kelompok jenis="kelereng" n={2} ket="2" warna="#FEF3C7" />
      <Kelompok jenis="kelereng" n={2} mulai={1} ket="2" warna="#DBEAFE" />
      <Kelompok jenis="kelereng" n={1} mulai={2} ket="sisa 1" warna="#FEE2E2" tanda="salah" />
    </div>,
    /* 10 Periksa dengan Menggabung */
    <div key="10" className="flex items-center justify-center gap-1.5">
      <Kelompok jenis="ikan" n={3} kelas="h-6 w-6" ket="3" warna="#FEF3C7" />
      <Operator>+</Operator>
      <Kelompok jenis="ikan" n={3} mulai={1} kelas="h-6 w-6" ket="3" warna="#DBEAFE" />
      <Operator>=</Operator>
      <KotakPoster warna="#FFE566">
        <Besar>6</Besar>
        <Cap>ikan</Cap>
      </KotakPoster>
    </div>,
  ];
}

/* ====================================================================== */
/* Sub-Bab C                                                                */
/* ====================================================================== */

export function visualInfografisK2B5C(): React.ReactNode[] {
  return [
    /* 1 Martabak untuk Empat Sahabat */
    <div key="1" className="space-y-1">
      <div className="flex justify-center">
        <Potongan jenis="martabak" garis={[V, H]} jarak={0.45} kelas="h-28 w-44" />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {["Kira", "Malosi", "Upe", "Tika"].map((n, i) => (
          <KotakPoster key={n} warna={["#DBEAFE", "#FEF3C7", "#FCE7F3", "#DCFCE7"][i]}>
            <Cap>{n}</Cap>
          </KotakPoster>
        ))}
      </div>
    </div>,
    /* 2 Seperempat Itu Apa */
    <div key="2" className="flex items-center justify-center gap-3">
      <FiguraSvg bentuk="lingkaran" garis={[V, H]} diwarnai={[true, false, false, false]} kelas="h-24 w-24" label="Lingkaran dibagi empat sama besar, satu bagian berwarna" />
      <div className="space-y-1">
        <KotakPoster warna="#DCFCE7">
          <Besar>¼</Besar>
          <Cap>seperempat</Cap>
        </KotakPoster>
        <Cap>4 bagian • sama besar</Cap>
      </div>
    </div>,
    /* 3 Utuh, Setengah, Seperempat */
    <div key="3" className="flex items-center justify-center gap-1.5">
      <Ubin ket="1 utuh"><Sisa jenis="apel" sisa="utuh" kelas="h-16 w-16" /></Ubin>
      <Operator>→</Operator>
      <Ubin ket="½"><Sisa jenis="apel" sisa="setengah" kelas="h-16 w-16" /></Ubin>
      <Operator>→</Operator>
      <Ubin ket="¼"><Sisa jenis="apel" sisa="seperempat" kelas="h-16 w-16" /></Ubin>
    </div>,
    /* 4 Potong Dua Kali */
    <div key="4" className="flex items-center justify-center gap-2">
      <Ubin ket="potong 1: dua bagian"><FiguraSvg bentuk="lingkaran" garis={[V]} diwarnai={[false, false]} kelas="h-20 w-20" /></Ubin>
      <Operator>→</Operator>
      <Ubin ket="potong 2: empat bagian"><FiguraSvg bentuk="lingkaran" garis={[V, H]} diwarnai={[false, false, false, false]} kelas="h-20 w-20" /></Ubin>
    </div>,
    /* 5 Seperempat di Sekitar Kita */
    <div key="5" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="¼ apel"><Sisa jenis="apel" sisa="seperempat" kelas="h-14 w-14" variasi={1} /></Ubin>
      <Ubin ket="¼ puding"><Sisa jenis="puding" sisa="seperempat" kelas="h-14 w-14" variasi={2} /></Ubin>
      <Ubin ket="¼ kue bolu"><Sisa jenis="kueBolu" sisa="seperempat" kelas="h-14 w-14" variasi={3} /></Ubin>
    </div>,
    /* 6 Dua Seperempat */
    <div key="6" className="flex items-center justify-center gap-1.5">
      <Ubin ket="¼"><Sisa jenis="puding" sisa="seperempat" kelas="h-14 w-14" /></Ubin>
      <Operator>+</Operator>
      <Ubin ket="¼"><Sisa jenis="puding" sisa="seperempat" kelas="h-14 w-14" variasi={1} /></Ubin>
      <Operator>=</Operator>
      <Ubin ket="½"><Sisa jenis="puding" sisa="setengah" kelas="h-14 w-14" /></Ubin>
    </div>,
    /* 7 Empat Seperempat */
    <div key="7" className="flex items-center justify-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <Ubin ket="¼"><Sisa jenis="pizza" sisa="seperempat" kelas="h-11 w-11" variasi={i} /></Ubin>
          {i < 3 ? <Operator>+</Operator> : <Operator>=</Operator>}
        </React.Fragment>
      ))}
      <Ubin ket="1"><Sisa jenis="pizza" sisa="utuh" kelas="h-11 w-11" /></Ubin>
    </div>,
    /* 8 Melipat Menjadi Empat */
    <div key="8" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="persegi kecil"><FiguraSvg bentuk="persegi" garis={[V, H]} diwarnai={[true, false, false, false]} kelas="h-14 w-14" /></Ubin>
      <Ubin ket="segitiga"><FiguraSvg bentuk="persegi" garis={[D1, D2]} diwarnai={[true, false, false, false]} kelas="h-14 w-14" /></Ubin>
      <Ubin ket="jalur panjang"><FiguraSvg bentuk="persegi" garis={[[[30, 0], [30, 100]], V, [[70, 0], [70, 100]]]} diwarnai={[true, false, false, false]} kelas="h-14 w-14" /></Ubin>
    </div>,
    /* 9 Ikan dari Lingkaran */
    <div key="9" className="grid grid-cols-4 gap-1">
      <Ubin ket="½"><FiguraSvg bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} kelas="h-12 w-12" warna="#FB923C" /></Ubin>
      {[0, 1, 2].map((i) => (
        <Ubin key={i} ket="¼"><FiguraSvg bentuk="lingkaran" garis={[V, H]} diwarnai={[true, false, false, false]} kelas="h-12 w-12" warna="#60A5FA" /></Ubin>
      ))}
    </div>,
    /* 10 Tiga Pertanyaan Pemeriksa */
    <div key="10" className="space-y-1.5">
      <Tiga nomor="1" teks="Apakah benda utuh dibagi menjadi empat bagian?" warna="#DBEAFE" />
      <Tiga nomor="2" teks="Apakah keempat bagian sama besar?" warna="#FEF3C7" />
      <Tiga nomor="3" teks="Apakah yang ditunjukkan satu bagian itu?" warna="#FCE7F3" />
    </div>,
  ];
}
