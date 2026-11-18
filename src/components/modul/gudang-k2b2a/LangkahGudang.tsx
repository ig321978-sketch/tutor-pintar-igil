"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  NAMA_CARA_ID,
  angkaJawab,
  besar,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kurangSepuluh,
  petunjukBanding,
  petunjukSalah,
  pilihanDari,
  sesuaikan,
  type Cara,
  type Langkah,
  type LangkahBanding,
  type LangkahBulat,
  type LangkahDasar,
  type LangkahKembar,
  type LangkahMaju,
  type LangkahSalah,
  type LangkahSepuluh,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { SETS } from "./data";
import {
  JARI_BARIS,
  JARI_KECIL,
  JARI_PETAK,
  KARTU_AWAL,
  KOTAK_P,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  UKURAN_BARIS,
  UKURAN_KECIL,
  UKURAN_PETAK,
  UKURAN_TUMPUK,
  Y_HITUNGAN,
  letakBaris,
  letakKecil,
  letakPetak,
  letakTumpuk,
  periksaCentang,
  type Goresan,
} from "./periksa";
import { JawabSuara20, JawabTulis20, PilihanAngka } from "./Jawab20";

/**
 * Satu tugas CPA Kelas 2 Bab 2 Sub-Bab A: kegiatan metode (Metode IGIL: melanjutkan hitungan dari bilangan yang besar, Make a Ten: melengkapi kotak sepuluh petak,
 * Doubles Plus One: memasangkan dua baris benda yang berbeda satu, Round and Adjust: membulatkan ke sepuluh lalu menyesuaikan), tugas Cari kesalahan
 * (putuskan benar atau salah, pilih alasan, lalu jawab bila jawaban tokoh salah), tugas memilih cara termudah, lalu menjawab dengan caranya.
 * Rupa: benda berwarna dengan emoji (Concrete), titik dan petak polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai dua puluh memakai Jawab20.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void; tuntas: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";

const RupaCtx = React.createContext<Rupa>("benda");

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
function Gambar({ label, children }: { label: string; children: React.ReactNode }) {
  const rupa = React.useContext(RupaCtx);
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={sesuaikan(label, rupa)}>
      {children}
    </svg>
  );
}
function Judul({ teks }: { teks: string }) {
  const rupa = React.useContext(RupaCtx);
  return (
    <text x={150} y={18} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
      {sesuaikan(teks, rupa)}
    </text>
  );
}
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Kalimat setelah anak selesai menandai: hasil tidak disebut sebelum anak menjawab. */
const SIAP_TANDA = "Semua sudah ditandai. Sekarang jawab pertanyaannya.";
/** Langkah sekali saat tugas dibuka (untuk tugas yang langsung menjawab dari gambar yang sudah jadi). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat tugas dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
/** Tugas yang langsung siap dijawab: rupa lambang (hanya kata dan angka) dan Rekam suara (gambar sudah jadi). */
const langsung = (rupa: Rupa, cara: Cara, diam?: boolean): boolean => !diam && (rupa === "lambang" || cara === "suara");

/* ------------------------------ Benda, kotak sepuluh petak ------------------------------ */
type Ik = { rupa: Rupa; set: string; x: number; y: number; s: number; hijau?: boolean; merah?: boolean; redup?: boolean; sorot?: boolean };
/** Satu benda: kotak berwarna dengan emoji (benda) atau titik polos bertepi tebal (diagram). */
function Benda({ rupa, set, x, y, s, hijau, merah, redup, sorot }: Ik) {
  const garis = hijau ? HIJAU : merah ? MERAH : sorot ? "#B45309" : UNGU;
  const tebal = hijau || merah || sorot ? 2.6 : 1.2;
  const op = redup ? 0.3 : 1;
  const h = s / 2;
  if (rupa === "benda")
    return (
      <g opacity={op} aria-hidden="true">
        <rect x={x - h} y={y - h} width={s} height={s} rx={4} fill={SETS[set].warna} stroke={garis} strokeWidth={tebal} />
        <text x={x} y={y + s * 0.28} textAnchor="middle" fontSize={s * 0.72}>
          {SETS[set].emoji}
        </text>
      </g>
    );
  return (
    <g opacity={op} aria-hidden="true">
      <circle cx={x} cy={y} r={h * 0.82} fill="#FFFFFF" stroke={garis} strokeWidth={tebal} />
    </g>
  );
}

type Petak = "isi" | "kosong" | "hantu" | "hantuIsi" | "hijau";
/** Kotak sepuluh petak. `isi`: benda; `kosong`: petak kosong; `hantu`: petak tambahan putus-putus (belum diisi); `hantuIsi`: petak tambahan yang sudah diisi (merah). */
function KotakSepuluh({ rupa, set, petak, onPetak, label }: { rupa: Rupa; set: string; petak: Petak[]; onPetak?: (i: number) => void; label: string }) {
  const garis = rupa === "benda" ? COKLAT : UNGU;
  return (
    <g aria-label={label}>
      <rect x={KOTAK_P.x} y={KOTAK_P.y} width={KOTAK_P.w} height={KOTAK_P.h} rx={rupa === "benda" ? 6 : 2} fill={rupa === "benda" ? "#FED7AA" : "#F8FAFC"} stroke={garis} strokeWidth={2} />
      {petak.map((s, i) => {
        const c = letakPetak(i);
        const dapat = onPetak !== undefined && (s === "hantu" || s === "hantuIsi");
        return (
          <g key={i} {...(dapat ? ketuk(() => onPetak?.(i)) : {})} aria-label={dapat ? `petak tambahan ${kata(i + 1)}` : undefined}>
            <rect x={c.x - 11} y={c.y - 14} width={22} height={28} fill="transparent" />
            {s === "isi" || s === "hijau" ? <Benda rupa={rupa} set={set} x={c.x} y={c.y} s={UKURAN_PETAK} hijau={s === "hijau"} /> : null}
            {s === "hantuIsi" ? <Benda rupa={rupa} set={set} x={c.x} y={c.y} s={UKURAN_PETAK} merah /> : null}
            {s === "hantu" ? <rect x={c.x - 9} y={c.y - 9} width={18} height={18} rx={3} fill="none" stroke={MERAH} strokeWidth={1.6} strokeDasharray="3 2" /> : null}
            {s === "kosong" ? <rect x={c.x - 9} y={c.y - 9} width={18} height={18} rx={3} fill="none" stroke={garis} strokeWidth={0.9} strokeDasharray="2 2" opacity={0.55} /> : null}
          </g>
        );
      })}
    </g>
  );
}

/** Pernyataan data untuk rupa lambang. */
function Pernyataan({ baris, atas, bawah }: { baris: string[]; atas?: string; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]" data-uji="pernyataan">
      {atas ? <p className="text-sm text-[#7C3AED]">{atas}</p> : null}
      <ul className="mx-auto grid max-w-md grid-cols-1 gap-1">
        {baris.map((b) => (
          <li key={b} className="rounded-lg border-2 border-dashed border-[#64748B] bg-white px-2 py-1 font-mono text-sm text-[#0F172A]">
            {b}
          </li>
        ))}
      </ul>
      <p className="font-mono text-lg">{bawah}</p>
    </div>
  );
}
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;

/** Papan hitungan berjalan di bawah gambar. */
function Hitungan({ angka, label }: { angka: number; label: string }) {
  return (
    <text x={150} y={Y_HITUNGAN} textAnchor="middle" fontSize={11} fontWeight={900} fill={HIJAU} aria-label={`${label} ${kata(angka)}`}>
      {label}: {angka}
    </text>
  );
}

/** Tumpukan kedua: `n` benda dalam satu baris. `tap`: nomor benda yang sudah diketuk. */
function Tumpukan({ rupa, set, n, tap, onTap, label }: { rupa: Rupa; set: string; n: number; tap?: number[]; onTap?: (i: number) => void; label: string }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = letakTumpuk(i, n);
        const sudah = tap?.includes(i);
        return (
          <g key={i} {...(onTap ? ketuk(() => onTap(i)) : {})} aria-label={`${label} ${kata(i + 1)}`}>
            <rect x={t.x - 13} y={t.y - 14} width={26} height={28} fill="transparent" />
            <Benda rupa={rupa} set={set} x={t.x} y={t.y} s={UKURAN_TUMPUK} hijau={sudah} redup={false} />
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Metode IGIL: maju dari yang besar ------------------------------ */
function Maju({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahMaju }) {
  const [dihitung, setDihitung] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Hitung maju" baris={[`Sudah diketahui: ${l.besar}`, `Ditambah: ${l.kecil}`]} bawah={<>jumlahnya = <Tanya /></>} />;
  const angka = l.besar + dihitung.length;
  const ketukBenda = (i: number) => {
    if (!interaktif || selesai) return;
    if (dihitung.includes(i)) {
      info("Benda itu sudah dihitung.");
      return;
    }
    const baru = [...dihitung, i];
    setDihitung(baru);
    if (baru.length === l.kecil) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else info(kata(l.besar + baru.length));
  };
  const periksa = () => {
    const letak = Array.from({ length: l.kecil }, (_, i) => letakKecil(i));
    const r = periksaCentang(goresan, letak, JARI_KECIL);
    if (r.benar) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk benda kecil. Kartu bilangan yang sudah diketahui jangan diberi tanda." : "Masih ada benda kecil yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk tiap benda kecil, lanjutkan hitungan" : kanvas ? "beri tanda pada tiap benda kecil" : "bilangan yang diketahui, lalu benda kecil"} />
      <g aria-label={`bilangan yang sudah diketahui ${kata(l.besar)}`}>
        <rect x={KARTU_AWAL.x} y={KARTU_AWAL.y} width={KARTU_AWAL.w} height={KARTU_AWAL.h} rx={rupa === "benda" ? 10 : 3} fill={rupa === "benda" ? "#FEF3C7" : "#FFFFFF"} stroke={rupa === "benda" ? COKLAT : UNGU} strokeWidth={2.4} />
        <text x={KARTU_AWAL.x + KARTU_AWAL.w / 2} y={KARTU_AWAL.y + 24} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#475569">
          sudah diketahui
        </text>
        <text x={KARTU_AWAL.x + KARTU_AWAL.w / 2} y={KARTU_AWAL.y + 58} textAnchor="middle" fontSize={32} fontWeight={900} fill={UNGU}>
          {l.besar}
        </text>
      </g>
      {Array.from({ length: l.kecil }, (_, i) => {
        const t = letakKecil(i);
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukBenda(i)) : {})} aria-label={`benda kecil ${kata(i + 1)}`}>
            <rect x={t.x - 18} y={t.y - 18} width={36} height={36} fill="transparent" />
            <Benda rupa={rupa} set={l.set} x={t.x} y={t.y} s={UKURAN_KECIL} hijau={dihitung.includes(i)} />
          </g>
        );
      })}
      {interaktif ? <Hitungan angka={angka} label="terhitung" /> : null}
    </g>
  );
  if (diam) return <Gambar label="Bilangan yang sudah diketahui dan benda kecil">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Hitung maju dari bilangan yang sudah diketahui">{gambar}</Gambar>;
}

/* ------------------------------ Make a Ten: membuat sepuluh ------------------------------ */
function Sepuluh({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahSepuluh }) {
  const ambil = kurangSepuluh(l.a);
  const [tap, setTap] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return <Pernyataan atas="Membuat sepuluh" baris={[`Bilangan pertama: ${l.a}`, `Bilangan kedua: ${l.b}`, "Lengkapi bilangan pertama sampai sepuluh dengan mengambil dari bilangan kedua"]} bawah={<>jumlahnya = <Tanya /></>} />;
  const masuk = Math.min(tap.length, ambil);
  const angka = tap.length <= ambil ? l.a + tap.length : 10 + (tap.length - ambil);
  const petak: Petak[] = Array.from({ length: 10 }, (_, i) => (i < l.a ? "isi" : interaktif && i < l.a + masuk ? "hijau" : "kosong"));
  const ketukBenda = (i: number) => {
    if (!interaktif || selesai) return;
    if (tap.includes(i)) {
      info("Benda itu sudah dihitung.");
      return;
    }
    const baru = [...tap, i];
    setTap(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else if (baru.length === ambil) info("Kotak sudah penuh, sepuluh. Sekarang tambahkan sisanya.");
    else info(kata(baru.length <= ambil ? l.a + baru.length : 10 + (baru.length - ambil)));
  };
  const periksa = () => {
    const letak = Array.from({ length: ambil }, (_, i) => letakPetak(l.a + i));
    const r = periksaCentang(goresan, letak, JARI_PETAK);
    if (r.benar) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu petak, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk petak yang masih kosong. Petak yang sudah berisi jangan diberi tanda." : "Masih ada petak kosong yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk benda di tumpukan kedua, lengkapi sepuluh" : kanvas ? "beri tanda pada tiap petak yang kosong" : "kotak sepuluh petak dan tumpukan kedua"} />
      <KotakSepuluh rupa={rupa} set={l.set} petak={petak} label="Kotak sepuluh petak yang belum penuh" />
      <Tumpukan rupa={rupa} set={l.set} n={l.b} tap={interaktif ? tap : undefined} onTap={interaktif ? ketukBenda : undefined} label="benda di tumpukan kedua" />
      {interaktif ? <Hitungan angka={angka} label="terhitung" /> : null}
    </g>
  );
  if (diam) return <Gambar label="Kotak sepuluh petak dan tumpukan kedua">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kotak sepuluh petak dilengkapi dari tumpukan kedua">{gambar}</Gambar>;
}

/* ------------------------------ Doubles Plus One: kembar tambah satu ------------------------------ */
function Kembar({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahKembar }) {
  const [tap, setTap] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Kembar tambah satu" baris={[`Baris atas: ${l.x}`, `Baris bawah: ${l.x + 1}`]} bawah={<>jumlahnya = <Tanya /></>} />;
  const angka = tap.length <= l.x ? 2 * tap.length : 2 * l.x + 1;
  const ketukBenda = (i: number) => {
    if (!interaktif || selesai) return;
    if (tap.includes(i)) {
      info("Benda itu sudah dihitung.");
      return;
    }
    const baru = [...tap, i];
    setTap(baru);
    if (baru.length === l.x + 1) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else info(baru.length === l.x ? `Semua berpasangan, ${kata(2 * l.x)}. Tinggal satu benda yang tidak punya pasangan.` : kata(2 * baru.length));
  };
  const periksa = () => {
    const r = periksaCentang(goresan, [letakBaris(1, l.x, l.x + 1)], JARI_BARIS);
    if (r.benar) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Hanya satu benda yang tidak punya pasangan. Benda yang berpasangan jangan diberi tanda." : "Cari benda di baris bawah yang tidak punya pasangan, lalu beri tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk tiap benda di baris bawah untuk memasangkan" : kanvas ? "beri tanda pada benda tanpa pasangan" : "dua baris benda, beda satu"} />
      {Array.from({ length: l.x }, (_, i) => {
        const a = letakBaris(0, i, l.x);
        const b = letakBaris(1, i, l.x + 1);
        const sudah = tap.slice(0, l.x).includes(i);
        return <line key={i} x1={a.x} y1={a.y + 12} x2={b.x} y2={b.y - 12} stroke={sudah ? HIJAU : "#94A3B8"} strokeWidth={sudah ? 2.4 : 1} strokeDasharray={sudah ? undefined : "3 3"} aria-hidden="true" />;
      })}
      {Array.from({ length: l.x }, (_, i) => {
        const a = letakBaris(0, i, l.x);
        return <Benda key={i} rupa={rupa} set={l.set} x={a.x} y={a.y} s={UKURAN_BARIS} hijau={tap.length > i} />;
      })}
      {Array.from({ length: l.x + 1 }, (_, i) => {
        const b = letakBaris(1, i, l.x + 1);
        const urut = tap.indexOf(i);
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukBenda(i)) : {})} aria-label={`benda di baris bawah ${kata(i + 1)}`}>
            <rect x={b.x - 13} y={b.y - 14} width={26} height={28} fill="transparent" />
            <Benda rupa={rupa} set={l.set} x={b.x} y={b.y} s={UKURAN_BARIS} hijau={urut >= 0 && urut < l.x} merah={urut === l.x} />
          </g>
        );
      })}
      {interaktif ? <Hitungan angka={angka} label="terhitung" /> : null}
    </g>
  );
  if (diam) return <Gambar label="Dua baris benda yang berbeda satu">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Dua baris benda yang dipasangkan">{gambar}</Gambar>;
}

/* ------------------------------ Round and Adjust: bulatkan lalu sesuaikan ------------------------------ */
function Bulat({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahBulat }) {
  const tambahan = kurangSepuluh(l.a);
  const [bulatkan, setBulatkan] = useState<number[]>([]);
  const [tap, setTap] = useState<number[]>([]);
  const [kurang, setKurang] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return <Pernyataan atas="Bulatkan lalu sesuaikan" baris={[`Bilangan yang hampir sepuluh: ${l.a}`, `Dibulatkan menjadi 10, ditambah: ${tambahan}`, `Bilangan kedua: ${l.b}`]} bawah={<>jumlahnya = <Tanya /></>} />;
  const tahap = bulatkan.length < tambahan ? 0 : tap.length < l.b ? 1 : 2;
  const angka = tahap === 0 ? l.a + bulatkan.length : tahap === 1 ? 10 + tap.length : 10 + l.b - kurang.length;
  const petak: Petak[] = Array.from({ length: 10 }, (_, i) => {
    if (i < l.a) return "isi";
    const n = i - l.a;
    if (!interaktif) return "hantuIsi";
    if (!bulatkan.includes(n)) return "hantu";
    return kurang.includes(n) ? "hantu" : "hantuIsi";
  });
  const ketukPetak = (i: number) => {
    if (!interaktif || selesai) return;
    const n = i - l.a;
    if (tahap === 0) {
      if (bulatkan.includes(n)) return;
      const baru = [...bulatkan, n];
      setBulatkan(baru);
      info(baru.length === tambahan ? "Kotak sudah dibulatkan menjadi sepuluh. Sekarang ketuk benda di tumpukan kedua." : kata(l.a + baru.length));
    } else if (tahap === 1) {
      salah("Jumlahkan dulu tumpukan kedua, baru petak tambahan dikurangi.");
    } else {
      if (kurang.includes(n)) return;
      const baru = [...kurang, n];
      setKurang(baru);
      if (baru.length === tambahan) {
        setSelesai(true);
        siap(SIAP_TANDA);
      } else info(kata(10 + l.b - baru.length));
    }
  };
  const ketukBenda = (i: number) => {
    if (!interaktif || selesai) return;
    if (tahap === 0) {
      salah("Bulatkan dulu: ketuk tiap petak putus-putus sampai kotak penuh.");
      return;
    }
    if (tahap === 2) {
      salah("Benda di tumpukan kedua sudah dijumlahkan. Sekarang ketuk petak tambahan untuk menyesuaikan.");
      return;
    }
    if (tap.includes(i)) {
      info("Benda itu sudah dihitung.");
      return;
    }
    const baru = [...tap, i];
    setTap(baru);
    info(baru.length === l.b ? `Sekarang sepuluh ditambah ${kata(l.b)}, yaitu ${kata(10 + l.b)}. Ketuk petak tambahan untuk menyesuaikan.` : kata(10 + baru.length));
  };
  const periksa = () => {
    const letak = Array.from({ length: tambahan }, (_, i) => letakPetak(l.a + i));
    const r = periksaCentang(goresan, letak, JARI_PETAK);
    if (r.benar) {
      setSelesai(true);
      siap(SIAP_TANDA);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu petak, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk petak tambahan yang berwarna merah. Benda biasa jangan diberi tanda." : "Masih ada petak tambahan yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? (tahap === 0 ? "bulatkan: ketuk petak putus-putus" : tahap === 1 ? "jumlahkan: ketuk benda di tumpukan kedua" : "sesuaikan: ketuk petak tambahan") : kanvas ? "beri tanda pada tiap petak tambahan" : "kotak dibulatkan menjadi sepuluh"} />
      <KotakSepuluh rupa={rupa} set={l.set} petak={petak} onPetak={interaktif ? ketukPetak : undefined} label="Kotak sepuluh petak dengan petak tambahan" />
      <Tumpukan rupa={rupa} set={l.set} n={l.b} tap={interaktif ? tap : undefined} onTap={interaktif ? ketukBenda : undefined} label="benda di tumpukan kedua" />
      {interaktif ? <Hitungan angka={angka} label="terhitung" /> : null}
    </g>
  );
  if (diam) return <Gambar label="Kotak dibulatkan menjadi sepuluh dan tumpukan kedua">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kotak dibulatkan menjadi sepuluh lalu disesuaikan">{gambar}</Gambar>;
}

/* ------------------------------ Memilih cara termudah ------------------------------ */
function Banding({ l, rupa, salah, tuntas }: PK & { l: LangkahBanding }) {
  const [mati, setMati] = useState<Array<string>>([]);
  const [selesai, setSelesai] = useState(false);
  const pilih = (m: LangkahBanding["benar"]) => {
    if (selesai) return;
    if (m === l.benar) {
      setSelesai(true);
      tuntas(`Betul! ${l.alasan}`);
    } else {
      setMati((s) => [...s, m]);
      salah(petunjukBanding(l, m));
    }
  };
  const kartu = (n: number, warna: string) => (
    <div key={`${n}-${warna}`} className={`flex min-h-[72px] min-w-[96px] flex-col items-center justify-center rounded-2xl border-4 px-3 ${rupa === "benda" ? "border-[#92400E]" : "border-[#1C01A5]"}`} style={{ background: rupa === "benda" ? warna : "#FFFFFF" }} data-uji="kartu-bilangan">
      {rupa === "benda" ? (
        <span className="text-lg" aria-hidden="true">
          {SETS[l.set].emoji}
        </span>
      ) : null}
      <span className="text-4xl font-black text-[#1C01A5]">{n}</span>
    </div>
  );
  return (
    <div className="space-y-3">
      {rupa === "lambang" ? (
        <Pernyataan baris={[`${l.a} + ${l.b}`]} bawah={<>jumlahnya = <Tanya /></>} />
      ) : (
        <div className="flex items-center justify-center gap-2" aria-label={`${kata(l.a)} ditambah ${kata(l.b)}`}>
          {kartu(l.a, SETS[l.set].warna)}
          <span className="text-3xl font-black text-[#DC2626]" aria-hidden="true">
            +
          </span>
          {kartu(l.b, SETS[l.set].warna)}
        </div>
      )}
      <p className="text-center text-sm font-black text-[#1C01A5]">Cara mana yang paling mudah?</p>
      <div className="grid gap-2" role="group" aria-label="Pilih cara termudah">
        {l.pilihan.map((m) => (
          <button key={m} type="button" disabled={mati.includes(m) || selesai} onClick={() => pilih(m)} className={`min-h-[52px] rounded-2xl border-4 px-3 text-base font-black disabled:opacity-40 ${selesai && m === l.benar ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}>
            {NAMA_CARA_ID[m]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "maju" ? <Maju {...props} l={l} /> : l.tipe === "sepuluh" ? <Sepuluh {...props} l={l} /> : l.tipe === "kembar" ? <Kembar {...props} l={l} /> : <Bulat {...props} l={l} />;
}

function CariSalah({ l, rupa, cara, salah, siap, info, tuntas }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar === Boolean(l.betul)) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} sudah benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${l.keliru}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      if (l.betul) tuntas(`Betul! ${l.alasan[i]}`);
      else siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <Dasar l={l.dasar} rupa={rupa} cara={cara} kanvas={false} diam salah={salah} siap={() => undefined} info={info} tuntas={tuntas} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
        </p>
      </div>
      {tahap === "putus" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <Tombol teks={"\u{2705} benar"} onClick={() => putus(true)} />
            <Tombol teks={"\u{274C} salah"} onClick={() => putus(false)} />
          </div>
        </div>
      ) : tahap === "alasan" ? (
        <div className="space-y-1.5" role="group" aria-label="Pilih alasan">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pilih alasan yang tepat:</p>
          {urut.map((i) => (
            <button key={l.alasan[i]} type="button" disabled={mati.includes(i)} onClick={() => alasan(i)} className="block min-h-[48px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] disabled:opacity-30">
              {l.alasan[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahGudang({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const d = dasarDari(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const salah = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    setSiapJawab(true);
    if (p) info(p);
  };
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    bicara(kata(m));
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${d && l.tipe !== "salah" ? kalimatKunci(d) : `Jawabannya ${kata(m)}.`}`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${petunjukSalah(l, m, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, kanvas: cara === "kanvas", salah, siap, info, tuntas };
  const tanya = sesuaikan(kalimatTanya(), rupa);
  return (
    <RupaCtx.Provider value={rupa}>
      <div className="space-y-3">
        <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
          {l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : l.tipe === "banding" ? <Banding {...pk} kanvas={false} l={l} /> : d ? <Dasar {...pk} l={d} /> : null}
        </div>
        {siapJawab && !selesai && n !== null ? (
          <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
            <p className="text-center text-sm font-black text-[#1C01A5]">{besar(tanya)}</p>
            {cara === "kanvas" ? (
              <JawabTulis20 kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
            ) : cara === "suara" ? (
              <JawabSuara20 kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
            ) : (
              <PilihanAngka pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
            )}
          </div>
        ) : null}
        <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
          {pesan}
        </p>
      </div>
    </RupaCtx.Provider>
  );
}

