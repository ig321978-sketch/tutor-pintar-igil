"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  besar,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  petunjukSalah,
  pilihanDari,
  puluhan,
  satuan,
  sesuaikan,
  type Langkah,
  type LangkahBingkai,
  type LangkahDasar,
  type LangkahKemas,
  type LangkahLanjut,
  type LangkahLoncat,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import type { Cara } from "./logika";
import { SETS } from "./data";
import {
  BINGKAI,
  JARI_KOTAK,
  JARI_LANJUT,
  JARI_LEPAS,
  KARTU_AWAL,
  KOTAK,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  UKURAN_KOLAM,
  UKURAN_LANJUT,
  UKURAN_LEPAS,
  UKURAN_SEL,
  UKURAN_SLOT,
  Y_HITUNGAN,
  Y_KOTAK_KLIK,
  letakBingkai,
  letakKolam,
  letakKotak,
  letakLanjut,
  letakLepas,
  letakSel,
  letakSlot,
  periksaCentang,
  periksaLingkari,
  pusatBingkai,
  pusatKotak,
  type Goresan,
  type Titik,
} from "./periksa";
import { JawabSuara50, JawabTulis50, PilihanAngka } from "./Jawab50";

/**
 * Satu soal CPA Kelas 2 Bab 1 Sub-Bab A: kegiatan metode (Metode IGIL: memindahkan kue ke kotak kue isi sepuluh, Ten Frame: membaca bingkai sepuluh,
 * Skip Counting: menghitung kotak meloncat sepuluh-sepuluh, Counting On: melanjutkan hitungan dari bilangan yang sudah diketahui), soal Cari kesalahan
 * (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab dengan caranya. Rupa: benda berwarna dengan emoji kue (Concrete), titik dan kotak polos (Pictorial),
 * kata dan angka saja (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai lima puluh memakai Jawab50.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
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
/** Langkah sekali saat soal dibuka (untuk soal yang langsung menjawab dari gambar yang sudah jadi). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
/** Soal yang langsung siap dijawab: rupa lambang (hanya kata dan angka) dan Rekam suara (gambar sudah jadi). */
const langsung = (rupa: Rupa, cara: Cara, diam?: boolean): boolean => !diam && (rupa === "lambang" || cara === "suara");

/* ------------------------------ Kue, kotak kue, dan bingkai ------------------------------ */
type Ik = { rupa: Rupa; set: string; x: number; y: number; s: number; hijau?: boolean; merah?: boolean; redup?: boolean; sorot?: boolean };
/** Satu kue: kotak berwarna dengan emoji (benda) atau titik polos bertepi tebal (diagram). */
function Kue({ rupa, set, x, y, s, hijau, merah, redup, sorot }: Ik) {
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

/** Kotak kue isi sepuluh dengan `isi` kue di lubangnya (dua baris lima). Pictorial: kotak berkisi polos. */
function KotakKue({ rupa, set, p, isi, sorot, hijau }: { rupa: Rupa; set: string; p: Titik; isi: number; sorot?: boolean; hijau?: boolean }) {
  const garis = hijau ? HIJAU : sorot ? "#B45309" : rupa === "benda" ? COKLAT : UNGU;
  return (
    <g aria-hidden="true">
      <rect x={p.x} y={p.y} width={KOTAK.w} height={KOTAK.h} rx={rupa === "benda" ? 6 : 2} fill={rupa === "benda" ? "#FDE68A" : "#F8FAFC"} stroke={garis} strokeWidth={hijau || sorot ? 3.4 : 2} />
      {Array.from({ length: 10 }, (_, j) => {
        const c = letakSlot(p, j);
        return j < isi ? <Kue key={j} rupa={rupa} set={set} x={c.x} y={c.y} s={UKURAN_SLOT} /> : <circle key={j} cx={c.x} cy={c.y} r={5} fill="none" stroke={garis} strokeWidth={0.9} strokeDasharray="2 2" opacity={0.5} />;
      })}
    </g>
  );
}

/** Bingkai sepuluh (dua baris lima kotak) dengan `isi` kotak terisi. `tandai`: nomor kotak yang sudah dihitung (Klik). */
function BingkaiSepuluh({ rupa, set, p, isi, hijau, sorot, tandai, onSel }: { rupa: Rupa; set: string; p: Titik; isi: number; hijau?: boolean; sorot?: boolean; tandai?: number[]; onSel?: (j: number) => void }) {
  const garis = hijau ? HIJAU : sorot ? "#B45309" : UNGU;
  return (
    <g aria-hidden={onSel ? undefined : "true"}>
      <rect x={p.x - 1} y={p.y - 1} width={BINGKAI.w + 2} height={BINGKAI.h + 2} rx={3} fill={rupa === "benda" ? "#FEF3C7" : "#FFFFFF"} stroke={garis} strokeWidth={hijau || sorot ? 3.4 : 2} />
      {Array.from({ length: 10 }, (_, j) => {
        const c = letakSel(p, j);
        const sudah = tandai?.includes(j);
        return (
          <g key={j} {...(onSel && j < isi ? ketuk(() => onSel(j)) : {})} aria-label={onSel ? `kotak ${kata(j + 1)}` : undefined}>
            <rect x={c.x - UKURAN_SEL / 2} y={c.y - 8} width={UKURAN_SEL} height={16} fill={sudah ? "#BBF7D0" : "transparent"} stroke={garis} strokeWidth={0.8} />
            {j < isi ? <Kue rupa={rupa} set={set} x={c.x} y={c.y} s={11} hijau={sudah} /> : null}
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

/* ------------------------------ Metode IGIL: hitung dan kemas sepuluh ------------------------------ */
function Kemas({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahKemas }) {
  const p = puluhan(l.n);
  const s = satuan(l.n);
  const [pindah, setPindah] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Satu kotak berisi 10" baris={[`Kotak penuh: ${p}`, `Kue lepas: ${s}`]} bawah={<>banyak semuanya = <Tanya /></>} />;
  const jumlahKotak = Math.ceil(l.n / 10);
  const ketukKue = () => {
    if (selesai || !interaktif) return;
    const baru = pindah + 1;
    setPindah(baru);
    if (baru === l.n) {
      setSelesai(true);
      siap(`Semua kue sudah dikemas. ${kalimatKunci(l)}`);
    } else info(kata(baru));
  };
  const periksa = () => {
    const lepas = Array.from({ length: s }, (_, i) => letakLepas(i, s));
    const r = periksaCentang(goresan, lepas, JARI_LEPAS);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kue, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk kue yang lepas. Kue di dalam kotak jangan diberi tanda." : "Masih ada kue lepas yang belum diberi tanda.");
    }
  };
  const gambar = interaktif || diam ? (
    <g>
      <Judul teks={diam ? "kue masih bertebaran: hitung semuanya" : "ketuk tiap kue, pindahkan ke kotak kue"} />
      {interaktif
        ? Array.from({ length: jumlahKotak }, (_, i) => <KotakKue key={i} rupa={rupa} set={l.set} p={letakKotak(i, jumlahKotak, Y_KOTAK_KLIK)} isi={Math.max(0, Math.min(10, pindah - i * 10))} hijau={pindah >= (i + 1) * 10} />)
        : null}
      {interaktif ? (
        <text x={150} y={100} textAnchor="middle" fontSize={20} fontWeight={900} fill={HIJAU} aria-label={`sudah dikemas ${kata(pindah)}`}>
          {pindah}
        </text>
      ) : null}
      {Array.from({ length: l.n - (interaktif ? pindah : 0) }, (_, i) => {
        const t = letakKolam(i);
        return (
          <g key={i} {...(interaktif ? ketuk(ketukKue) : {})} aria-label={`kue ${kata(i + 1)}`}>
            <rect x={t.x - 15} y={t.y - 15} width={30} height={30} fill="transparent" />
            <Kue rupa={rupa} set={l.set} x={t.x} y={t.y} s={UKURAN_KOLAM} />
          </g>
        );
      })}
    </g>
  ) : (
    <g>
      <Judul teks={kanvas ? "beri tanda pada tiap kue yang lepas" : "kotak kue yang penuh dan kue yang lepas"} />
      {Array.from({ length: p }, (_, i) => <KotakKue key={i} rupa={rupa} set={l.set} p={letakKotak(i, p)} isi={10} />)}
      {Array.from({ length: s }, (_, i) => {
        const t = letakLepas(i, s);
        return <Kue key={i} rupa={rupa} set={l.set} x={t.x} y={t.y} s={UKURAN_LEPAS} />;
      })}
    </g>
  );
  if (diam) return <Gambar label="Kue yang masih bertebaran">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={interaktif ? "Kue dipindahkan ke kotak kue" : "Kotak kue penuh dan kue lepas"}>{gambar}</Gambar>;
}

/* ------------------------------ Ten Frame: bingkai sepuluh ------------------------------ */
function Bingkai({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahBingkai }) {
  const p = puluhan(l.n);
  const s = satuan(l.n);
  const total = p + 1;
  const [penuh, setPenuh] = useState<number[]>([]);
  const [sel, setSel] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Bingkai sepuluh" baris={[`Bingkai penuh: ${p}`, `Kotak terisi di bingkai terakhir: ${s}`]} bawah={<>banyak semuanya = <Tanya /></>} />;
  const hitung = penuh.length * 10 + sel.length;
  const cek = (pf: number[], sl: number[]) => {
    if (pf.length === p && sl.length === s) {
      setSelesai(true);
      siap(`Semua sudah dihitung. ${kalimatKunci(l)}`);
    } else info(kata(pf.length * 10 + sl.length));
  };
  const ketukBingkai = (i: number) => {
    if (!interaktif || selesai) return;
    if (i === p) {
      salah("Bingkai terakhir belum penuh. Ketuk tiap kotak yang terisi di bingkai itu, satu per satu.");
      return;
    }
    if (penuh.includes(i)) {
      info("Bingkai itu sudah dihitung.");
      return;
    }
    const baru = [...penuh, i];
    setPenuh(baru);
    cek(baru, sel);
  };
  const ketukSel = (j: number) => {
    if (!interaktif || selesai) return;
    if (sel.includes(j)) {
      info("Kotak itu sudah dihitung.");
      return;
    }
    const baru = [...sel, j];
    setSel(baru);
    cek(penuh, baru);
  };
  const periksa = () => {
    const pusat = Array.from({ length: total }, (_, i) => pusatBingkai(i, total));
    const r = periksaLingkari(goresan, pusat, pusat.map((_, i) => i === p));
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Bingkai terakhir yang belum penuh. ${kalimatKunci(l)}`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu bingkai saja, yaitu yang belum penuh." : "Cari bingkai yang belum penuh, lalu lingkari.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk tiap bingkai penuh, lalu kotak terisi" : kanvas ? "lingkari bingkai yang belum penuh" : "bingkai sepuluh"} />
      {Array.from({ length: total }, (_, i) => {
        const pos = letakBingkai(i, total);
        const terakhir = i === p;
        return (
          <g key={i} {...(interaktif && !terakhir ? ketuk(() => ketukBingkai(i)) : {})} aria-label={terakhir ? "bingkai terakhir" : `bingkai penuh ${kata(i + 1)}`}>
            <BingkaiSepuluh rupa={rupa} set={l.set} p={pos} isi={terakhir ? s : 10} hijau={!terakhir && penuh.includes(i)} tandai={terakhir && interaktif ? sel : undefined} onSel={terakhir && interaktif ? ketukSel : undefined} />
          </g>
        );
      })}
      {interaktif ? <Hitungan angka={hitung} label="terhitung" /> : null}
    </g>
  );
  if (diam) return <Gambar label="Bingkai sepuluh">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bingkai sepuluh yang terisi">{gambar}</Gambar>;
}

/* ------------------------------ Skip Counting: hitung meloncat ------------------------------ */
function Loncat({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahLoncat }) {
  const [kotakDihitung, setKotakDihitung] = useState<number[]>([]);
  const [lepasDihitung, setLepasDihitung] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        atas="Hitung meloncat sepuluh-sepuluh"
        baris={[`Loncatan: ${Array.from({ length: l.k }, (_, i) => (i + 1) * 10).join(", ")}`, l.r > 0 ? `Kue lepas: ${l.r}` : "Tidak ada kue yang lepas"]}
        bawah={<>banyak semuanya = <Tanya /></>}
      />
    );
  const hitung = kotakDihitung.length * 10 + lepasDihitung.length;
  const cek = (kd: number[], ld: number[]) => {
    if (kd.length === l.k && ld.length === l.r) {
      setSelesai(true);
      siap(`Semua sudah dihitung. ${kalimatKunci(l)}`);
    } else info(kata(kd.length * 10 + ld.length));
  };
  const ketukKotak = (i: number) => {
    if (!interaktif || selesai) return;
    if (kotakDihitung.includes(i)) {
      info("Kotak itu sudah dihitung.");
      return;
    }
    const baru = [...kotakDihitung, i];
    setKotakDihitung(baru);
    cek(baru, lepasDihitung);
  };
  const ketukLepas = (i: number) => {
    if (!interaktif || selesai) return;
    if (kotakDihitung.length < l.k) {
      salah("Hitung dulu semua kotak penuh sepuluh-sepuluh, baru kue yang lepas.");
      return;
    }
    if (lepasDihitung.includes(i)) {
      info("Kue itu sudah dihitung.");
      return;
    }
    const baru = [...lepasDihitung, i];
    setLepasDihitung(baru);
    cek(kotakDihitung, baru);
  };
  const periksa = () => {
    const pusat = Array.from({ length: l.k }, (_, i) => pusatKotak(i, l.k));
    const r = periksaCentang(goresan, pusat, JARI_KOTAK);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk kotak yang penuh. Kue yang lepas jangan diberi tanda." : "Masih ada kotak penuh yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk tiap kotak penuh sepuluh-sepuluh" : kanvas ? "beri tanda pada tiap kotak penuh" : "hitung meloncat sepuluh-sepuluh"} />
      {Array.from({ length: l.k }, (_, i) => {
        const pos = letakKotak(i, l.k);
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukKotak(i)) : {})} aria-label={`kotak penuh ${kata(i + 1)}`}>
            <KotakKue rupa={rupa} set={l.set} p={pos} isi={10} hijau={kotakDihitung.includes(i)} />
          </g>
        );
      })}
      {Array.from({ length: l.r }, (_, i) => {
        const t = letakLepas(i, l.r);
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukLepas(i)) : {})} aria-label={`kue lepas ${kata(i + 1)}`}>
            <rect x={t.x - 15} y={t.y - 15} width={30} height={30} fill="transparent" />
            <Kue rupa={rupa} set={l.set} x={t.x} y={t.y} s={UKURAN_LEPAS} hijau={lepasDihitung.includes(i)} />
          </g>
        );
      })}
      {interaktif ? <Hitungan angka={hitung} label="terhitung" /> : null}
    </g>
  );
  if (diam) return <Gambar label="Kotak penuh dan kue lepas">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kotak penuh dihitung meloncat sepuluh-sepuluh">{gambar}</Gambar>;
}

/* ------------------------------ Counting On: hitung lanjut ------------------------------ */
function Lanjut({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahLanjut }) {
  const [dihitung, setDihitung] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(langsung(rupa, cara, diam), () => siap());
  const arah = l.mundur ? -1 : 1;
  if (rupa === "lambang")
    return (
      <Pernyataan
        atas={l.mundur ? "Hitung mundur" : "Hitung lanjut"}
        baris={[`Sudah diketahui: ${l.awal}`, l.mundur ? `Diambil: ${l.b}` : `Ditambah: ${l.b}`]}
        bawah={<>{l.mundur ? "sisanya" : "banyak semuanya"} = <Tanya /></>}
      />
    );
  const angka = l.awal + arah * dihitung.length;
  const ketukKue = (i: number) => {
    if (!interaktif || selesai) return;
    if (dihitung.includes(i)) {
      info("Kue itu sudah dihitung.");
      return;
    }
    const baru = [...dihitung, i];
    setDihitung(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else info(kata(l.awal + arah * baru.length));
  };
  const periksa = () => {
    const letak = Array.from({ length: l.b }, (_, i) => letakLanjut(i));
    const r = periksaCentang(goresan, letak, JARI_LANJUT);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kue, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk kue yang lepas. Nampan yang sudah diketahui jangan diberi tanda." : "Masih ada kue lepas yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? (l.mundur ? "ketuk tiap kue yang diambil, hitung mundur" : "ketuk tiap kue lepas, lanjutkan hitungan") : kanvas ? "beri tanda pada tiap kue yang lepas" : l.mundur ? "banyak yang diketahui, lalu sebagian diambil" : "banyak yang diketahui, lalu kue lepas"} />
      <g aria-label={`banyak yang sudah diketahui ${kata(l.awal)}`}>
        <rect x={KARTU_AWAL.x} y={KARTU_AWAL.y} width={KARTU_AWAL.w} height={KARTU_AWAL.h} rx={rupa === "benda" ? 10 : 3} fill={rupa === "benda" ? "#E2E8F0" : "#FFFFFF"} stroke={rupa === "benda" ? "#64748B" : UNGU} strokeWidth={2.4} />
        <text x={KARTU_AWAL.x + KARTU_AWAL.w / 2} y={KARTU_AWAL.y + 24} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#475569">
          sudah diketahui
        </text>
        <text x={KARTU_AWAL.x + KARTU_AWAL.w / 2} y={KARTU_AWAL.y + 58} textAnchor="middle" fontSize={32} fontWeight={900} fill={UNGU}>
          {l.awal}
        </text>
      </g>
      {Array.from({ length: l.b }, (_, i) => {
        const t = letakLanjut(i);
        const sudah = dihitung.includes(i);
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukKue(i)) : {})} aria-label={`${l.mundur ? "kue yang diambil" : "kue lepas"} ${kata(i + 1)}`}>
            <rect x={t.x - 18} y={t.y - 18} width={36} height={36} fill="transparent" />
            <Kue rupa={rupa} set={l.set} x={t.x} y={t.y} s={UKURAN_LANJUT} hijau={sudah && !l.mundur} redup={sudah && l.mundur} />
          </g>
        );
      })}
      {interaktif ? <Hitungan angka={angka} label={l.mundur ? "sisa" : "terhitung"} /> : null}
    </g>
  );
  if (diam) return <Gambar label="Banyak yang sudah diketahui dan kue lepas">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Hitung lanjut dari bilangan yang sudah diketahui">{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "kemas" ? <Kemas {...props} l={l} /> : l.tipe === "bingkai" ? <Bingkai {...props} l={l} /> : l.tipe === "loncat" ? <Loncat {...props} l={l} /> : <Lanjut {...props} l={l} />;
}

function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar) salah(`Lihat lagi. ${l.keliru}`);
    else {
      setTahap("alasan");
      info(`Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    }
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <Dasar l={l.dasar} rupa={rupa} cara={cara} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
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

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahEtalase({ ls, rupa, bicara, onBenar }: P) {
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
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${petunjukSalah(l, m)}`);
    }
  };
  const pk: PK = { rupa, cara, kanvas: cara === "kanvas", salah, siap, info };
  const tanya = sesuaikan(kalimatTanya(d), rupa);
  return (
    <RupaCtx.Provider value={rupa}>
      <div className="space-y-3">
        <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
        {siapJawab && !selesai ? (
          <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
            <p className="text-center text-sm font-black text-[#1C01A5]">{besar(tanya)}</p>
            {cara === "kanvas" ? (
              <JawabTulis50 kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
            ) : cara === "suara" ? (
              <JawabSuara50 kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
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
