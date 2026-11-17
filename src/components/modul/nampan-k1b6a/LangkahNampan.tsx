"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  barisPasang,
  kata,
  petunjukSalah,
  pilihanDari,
  selisihAB,
  type Langkah,
  type LangkahBatang,
  type LangkahDasar,
  type LangkahGaris,
  type LangkahPasang,
  type LangkahSalah,
  type LangkahSamakan,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { EMOJI, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  BARIS,
  BATANG,
  GARIS,
  KARTU_BARIS,
  LEBAR_ADEGAN,
  RADIUS_TANDA,
  TINGGI_ADEGAN,
  X_ITEM,
  Y_BATU,
  jarakBatu,
  letakBaris,
  letakBatu,
  letakBilangan,
  letakDipasang,
  letakItem,
  letakKotak,
  letakLangkah,
  periksaCentang,
  periksaLingkari,
  xGaris,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 6 Sub-Bab A: kegiatan metode (Metode IGIL memasangkan benda satu-satu, Bar Model mengetuk atau membuat kotak batang,
 * Number Line Difference meloncat di jalur, Equalizing menambah atau mengambil sampai sama banyak), soal Cari kesalahan
 * (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab dengan caranya.
 * Rupa: buah, kue, dan katak berwarna di tampah (Concrete), titik, kotak, dan garis bilangan polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Cara menjawab bilangan sampai dua puluh memakai ulang Bab 5 Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const EMAS = "#FACC15";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const emoji = (j: string) => EMOJI[j] ?? "";
const warnaAlas = (j: string) => (WARNA_BENDA[j] ?? ["#E5E7EB", "#6B7280"])[0];
const namaBenda = (j: string) => NAMA_BENDA[j] ?? "benda";

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
const Gambar = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
    {children}
  </svg>
);
const Judul = ({ teks }: { teks: string }) => (
  <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
);
function KartuTanya({ atas, bawah }: { atas: React.ReactNode; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p className="text-2xl">{bawah}</p>
    </div>
  );
}
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#DB2777] bg-[#FDF2F8] px-3 py-0.5 text-[#9D174D]">{children}</span>;
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk rupa lambang yang langsung menjawab). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Alas deret benda di tampah (Concrete): pita berwarna di belakang satu baris. */
const Alas = ({ y, jenis }: { y: number; jenis: string }) => <rect x={X_ITEM - 12} y={y - 13} width={250} height={26} rx={13} fill={warnaAlas(jenis)} opacity={0.75} aria-hidden="true" />;
/** Satu benda di (x, y): emoji (Concrete) atau titik polos (Pictorial). */
function Benda({ x, y, rupa, jenis, baris, sorot = false, pudar = false }: { x: number; y: number; rupa: Rupa; jenis: string; baris: number; sorot?: boolean; pudar?: boolean }) {
  return (
    <g opacity={pudar ? 0.25 : 1}>
      {sorot ? <circle cx={x} cy={y} r={8.5} fill="#FEF3C7" stroke="#B45309" strokeWidth={1.4} /> : null}
      {rupa === "benda" ? (
        <text x={x} y={y + 4.5} textAnchor="middle" fontSize={12}>
          {emoji(jenis)}
        </text>
      ) : (
        <circle cx={x} cy={y} r={5.5} fill={baris === 0 ? "#F87171" : "#60A5FA"} stroke={UNGU} strokeWidth={1.1} />
      )}
    </g>
  );
}

/* ------------------------------ Metode IGIL: pasangkan satu-satu ------------------------------ */
function Pasang({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahPasang }) {
  const min = Math.min(l.a, l.b);
  const [pindah, setPindah] = useState<number[]>([]);
  const [salahBaris, setSalahBaris] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const mana = l.tanya !== "selisih";
  const target = mana ? barisPasang(l as LangkahPasang & { tanya: "lebih" | "kurang" }) : -1;
  const kataBanding = l.tanya === "lebih" ? "banyak" : "sedikit";
  const lambangLangsung = rupa === "lambang" && !mana && !diam;
  useSiapLangsung(lambangLangsung, () => siap());
  const habis = pindah.length >= min;
  const pilihBaris = (b: number) => {
    if (selesai || !mana || diam) return;
    if (rupa !== "lambang" && !habis && !kanvas) {
      salah("Pasangkan dulu tiap benda atas dengan pasangannya di baris bawah.");
      return;
    }
    if (b === target) {
      setSelesai(true);
      setSalahBaris(-1);
      siap(rupa === "lambang" ? `Betul! Bilangan itu lebih ${kataBanding}.` : `Betul! Baris ${b === 0 ? "atas" : "bawah"} lebih ${kataBanding}.`);
    } else {
      setSalahBaris(b);
      const sisa = (b === 0 ? l.a : l.b) > (b === 0 ? l.b : l.a);
      salah(rupa === "lambang" ? (sisa ? "Bilangan itu masih punya sisa, jadi lebih banyak." : "Bilangan itu habis duluan, jadi lebih sedikit.") : sisa ? "Baris itu masih punya sisa, jadi lebih banyak." : "Baris itu habis duluan, jadi lebih sedikit.");
    }
  };
  if (rupa === "lambang" && !mana)
    return (
      <KartuTanya
        atas={
          <>
            pasangkan <Kotak>{l.a}</Kotak> dan <Kotak>{l.b}</Kotak>
          </>
        }
        bawah={
          <>
            selisih = <Tanya />
          </>
        }
      />
    );
  if (rupa === "lambang" && !kanvas && !diam)
    return (
      <div className="flex justify-center gap-3 py-2" role="group" aria-label="Pilih bilangan">
        {[0, 1].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => pilihBaris(b)}
            className={`min-h-[64px] min-w-[96px] rounded-2xl border-4 text-3xl font-black text-[#9D174D] ${selesai && b === target ? "border-[#15803D] bg-[#DCFCE7]" : salahBaris === b ? "border-[#DC2626] bg-[#FEE2E2]" : "border-[#DB2777] bg-[#FDF2F8]"}`}
          >
            {b === 0 ? l.a : l.b}
          </button>
        ))}
      </div>
    );
  const ketukAtas = (i: number) => {
    if (selesai || kanvas || diam || pindah.includes(i)) return;
    if (pindah.length >= min) {
      info("Baris bawah sudah habis. Yang ini tidak punya pasangan.");
      return;
    }
    const baru = [...pindah, i];
    setPindah(baru);
    if (baru.length === min) {
      if (mana) info(`${besar(kata(min))} pasang. Ketuk kartu baris yang lebih ${kataBanding}.`);
      else {
        setSelesai(true);
        siap(`${besar(kata(min))} pasang. Hitung benda yang tidak punya pasangan.`);
      }
    } else info(kata(baru.length));
  };
  const sisaBaris = l.a > l.b ? 0 : 1;
  const sisaLetak = Array.from({ length: selisihAB(l) }, (_, j) => letakItem(sisaBaris, min + j));
  const kartuLetak = rupa === "lambang" ? [0, 1].map(letakBilangan) : [0, 1].map(letakBaris);
  const periksa = () => {
    if (mana) {
      const r = periksaLingkari(goresan, kartuLetak, [target === 0, target === 1]);
      if (r.benar) {
        setSelesai(true);
        siap(rupa === "lambang" ? `Betul! Bilangan itu lebih ${kataBanding}.` : `Betul! Baris ${target === 0 ? "atas" : "bawah"} lebih ${kataBanding}.`);
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? (rupa === "lambang" ? "Jangan dua-duanya. Lingkari satu bilangan yang tepat." : "Lingkari satu kartu baris saja.") : rupa === "lambang" ? `Pasangkan satu-satu dalam pikiranmu. Lingkari bilangan yang lebih ${kataBanding}.` : `Baris yang punya sisa lebih banyak. Lingkari kartu baris yang lebih ${kataBanding}.`);
      }
      return;
    }
    const p = periksaCentang(goresan, sisaLetak, RADIUS_TANDA);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Itu yang tidak punya pasangan.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu benda, satu tanda." : p.nyasar > 0 ? "Yang sudah berpasangan jangan diberi tanda." : "Masih ada yang tanpa pasangan belum diberi tanda.");
    }
  };
  const garisPasang = kanvas || diam;
  const benda = (b: number, i: number) => {
    const tergeser = b === 0 && pindah.includes(i);
    const pos = tergeser ? letakDipasang(pindah.indexOf(i)) : letakItem(b, i);
    const sisa = i >= min && (garisPasang || habis);
    return (
      <g key={`${b}-${i}`} {...(b === 0 && !kanvas && !diam ? ketuk(() => ketukAtas(i)) : {})} aria-label={`${b === 0 ? "atas" : "bawah"} ${kata(i + 1)}${tergeser ? ", sudah dipasangkan" : ""}`}>
        <Benda x={pos.x} y={pos.y} rupa={rupa} jenis={b === 0 ? l.jenis : l.jenis2} baris={b} sorot={sisa} />
      </g>
    );
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? (mana ? `lingkari kartu baris yang lebih ${kataBanding}` : "tandai yang tanpa pasangan") : `dipasangkan: ${pindah.length}`} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          <Alas y={BARIS[0]} jenis={l.jenis} />
          <Alas y={BARIS[1]} jenis={l.jenis2} />
        </g>
      ) : null}
      {garisPasang ? Array.from({ length: min }, (_, i) => <line key={i} x1={letakItem(0, i).x} x2={letakItem(1, i).x} y1={letakItem(0, i).y + 9} y2={letakItem(1, i).y - 9} stroke={HIJAU} strokeWidth={1.3} strokeDasharray="3 2" />) : null}
      {rupa === "lambang" ? (
        kanvas && !diam ? (
          [0, 1].map((b) => (
            <g key={b}>
              <rect x={letakBilangan(b).x - 30} y={letakBilangan(b).y - 25} width={60} height={50} rx={12} fill="#FDF2F8" stroke="#DB2777" strokeWidth={3} />
              <text x={letakBilangan(b).x} y={letakBilangan(b).y + 11} textAnchor="middle" fontSize={32} fontWeight={900} fill="#9D174D">
                {b === 0 ? l.a : l.b}
              </text>
            </g>
          ))
        ) : null
      ) : (
        [0, 1].map((b) => {
          const t = letakBaris(b);
          return (
            <g key={b} {...(mana && !kanvas && !diam ? ketuk(() => pilihBaris(b)) : {})} aria-label={`kartu baris ${b === 0 ? "atas" : "bawah"}`}>
              <rect x={t.x - KARTU_BARIS.w / 2} y={t.y - KARTU_BARIS.h / 2} width={KARTU_BARIS.w} height={KARTU_BARIS.h} rx={6} fill={selesai && b === target ? "#DCFCE7" : salahBaris === b ? "#FEE2E2" : "#FFFFFF"} stroke={UNGU} strokeWidth={2} />
              <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
                {b === 0 ? "atas" : "bawah"}
              </text>
            </g>
          );
        })
      )}
      {rupa === "lambang" ? null : (
        <>
          {Array.from({ length: l.a }, (_, i) => benda(0, i))}
          {Array.from({ length: l.b }, (_, i) => benda(1, i))}
        </>
      )}
    </g>
  );
  if (diam) return <Gambar label="Dua baris berpasangan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? `Dua baris benda: ${namaBenda(l.jenis)} dan ${namaBenda(l.jenis2)}` : "Titik merah dan titik biru"}>{gambar}</Gambar>;
}

/* ------------------------------ Bar Model: kotak batang ------------------------------ */
function Batang({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahBatang }) {
  const s = selisihAB(l);
  const min = Math.min(l.a, l.b);
  const panjang = l.a > l.b ? 0 : 1;
  const [tap, setTap] = useState<number[]>([]);
  const [ditambah, setDitambah] = useState(0);
  const [diambil, setDiambil] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const jenisBaris = (b: number) => (b === 0 ? l.jenis : l.jenis2);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  useSiapLangsung(rupa !== "lambang" && kanvas && l.tanya !== "selisih" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.tanya === "selisih" ? (
            <>
              batang <Kotak>{l.a}</Kotak> dan <Kotak>{l.b}</Kotak>
            </>
          ) : l.tanya === "tambah" ? (
            <>
              pendek <Kotak>{l.a}</Kotak>, lebihnya <Kotak>{l.b - l.a}</Kotak>
            </>
          ) : (
            <>
              panjang <Kotak>{l.a}</Kotak>, kurangnya <Kotak>{l.a - l.b}</Kotak>
            </>
          )
        }
        bawah={
          <>
            {l.tanya === "selisih" ? "selisih" : l.tanya === "tambah" ? "panjang" : "pendek"} = <Tanya />
          </>
        }
      />
    );
  /* Panjang tiap batang saat ini. */
  const panjangSekarang = l.tanya === "selisih" ? [l.a, l.b] : l.tanya === "tambah" ? [l.a, l.a + (diam || kanvas ? 0 : ditambah)] : [l.a, l.a - (diam || kanvas ? 0 : diambil)];
  const ketukKotak = (b: number, i: number) => {
    if (selesai || kanvas || diam) return;
    if (l.tanya === "selisih") {
      if (b !== panjang || i < min) {
        salah(b !== panjang ? "Ketuk kotak di batang yang lebih panjang." : "Kotak itu masih sejajar dengan batang pendek. Ketuk kotak yang melebihi.");
        return;
      }
      if (tap.includes(i)) return;
      const baru = [...tap, i];
      setTap(baru);
      if (baru.length === s) {
        setSelesai(true);
        siap("Semua kotak yang melebihi sudah ditandai. Hitung kotak berwarna emas.");
      } else info(kata(baru.length));
    } else if (l.tanya === "kurang") {
      if (b !== 1 || i !== l.a - diambil - 1) {
        salah("Ketuk kotak di ujung kanan batang bawah.");
        return;
      }
      const n = diambil + 1;
      setDiambil(n);
      if (n === s) {
        setSelesai(true);
        siap("Kotak di ujung sudah diambil sebanyak kurangnya. Berapa isi batang bawah sekarang?");
      } else info(kata(n));
    }
  };
  const tambahKotak = () => {
    if (selesai || kanvas || diam || l.tanya !== "tambah") return;
    const n = ditambah + 1;
    setDitambah(n);
    if (n === s) {
      setSelesai(true);
      siap("Batang bawah sudah lebih panjang sebanyak lebihnya. Berapa isi batang bawah sekarang?");
    } else info(kata(n));
  };
  const extra = Array.from({ length: s }, (_, j) => letakKotak(panjang, min + j));
  const periksa = () => {
    const p = periksaCentang(goresan, extra, RADIUS_TANDA);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Itu kotak yang melebihi batang pendek.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu kotak, satu tanda." : p.nyasar > 0 ? "Yang sejajar dengan batang pendek jangan diberi tanda." : "Masih ada kotak yang melebihi belum diberi tanda.");
    }
  };
  const kotak = (b: number, i: number) => {
    const c = letakKotak(b, i);
    const ujung = l.tanya === "kurang" && b === 1 && i >= panjangSekarang[1];
    const sorot = l.tanya === "selisih" && b === panjang && i >= min && (tap.includes(i) || diam || (selesai && !kanvas));
    const lawan = l.tanya === "kurang" && b === 1 && i >= l.b && i < l.a && (diam || kanvas);
    const bisa = !kanvas && !diam && (l.tanya === "selisih" || (l.tanya === "kurang" && b === 1));
    return (
      <g key={`${b}-${i}`} {...(bisa ? ketuk(() => ketukKotak(b, i)) : {})} aria-label={`batang ${b === 0 ? "atas" : "bawah"}, kotak ${kata(i + 1)}`}>
        {rupa === "benda" ? (
          <>
            {sorot ? <circle cx={c.x} cy={c.y} r={8.5} fill="#FEF3C7" stroke="#B45309" strokeWidth={1.4} /> : null}
            <text x={c.x} y={c.y + 4.5} textAnchor="middle" fontSize={12} opacity={ujung ? 0.25 : 1}>
              {emoji(jenisBaris(b))}
            </text>
          </>
        ) : (
          <rect x={c.x - BATANG.w / 2} y={c.y - BATANG.h / 2} width={BATANG.w} height={BATANG.h} fill={sorot ? EMAS : ujung || lawan ? "#F1F5F9" : "#FFFFFF"} stroke={UNGU} strokeWidth={1.2} strokeDasharray={ujung ? "2 2" : undefined} />
        )}
      </g>
    );
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? "tandai kotak yang melebihi" : l.tanya === "selisih" ? "ketuk kotak yang melebihi" : l.tanya === "tambah" ? `ditambah: ${ditambah}` : `diambil: ${diambil}`} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          <rect x={BATANG.x0 - 4} y={BATANG.ys[0] - 3} width={panjangSekarang[0] * BATANG.w + 8} height={BATANG.h + 6} rx={9} fill={warnaAlas(l.jenis)} opacity={0.75} />
          <rect x={BATANG.x0 - 4} y={BATANG.ys[1] - 3} width={Math.max(panjangSekarang[1], 1) * BATANG.w + 8} height={BATANG.h + 6} rx={9} fill={warnaAlas(l.jenis2)} opacity={0.75} />
        </g>
      ) : null}
      <line x1={BATANG.x0} x2={BATANG.x0} y1={BATANG.ys[0] - 10} y2={BATANG.ys[1] + BATANG.h + 10} stroke={HIJAU} strokeWidth={1.4} strokeDasharray="3 3" aria-hidden="true" />
      <text x={BATANG.x0} y={BATANG.ys[0] - 13} fontSize={8.5} fontWeight={900} fill={UNGU}>
        atas
      </text>
      <text x={BATANG.x0} y={BATANG.ys[1] - 6} fontSize={8.5} fontWeight={900} fill={UNGU}>
        bawah
      </text>
      {Array.from({ length: l.tanya === "kurang" && !diam && !kanvas ? l.a : panjangSekarang[0] }, (_, i) => kotak(0, i))}
      {Array.from({ length: l.tanya === "kurang" && !diam && !kanvas ? l.a : panjangSekarang[1] }, (_, i) => kotak(1, i))}
      {l.tanya === "tambah" && !selesai && !kanvas && !diam ? (
        <g {...ketuk(tambahKotak)} aria-label="tempat kosong di ujung batang bawah, ketuk untuk menambah">
          <rect x={letakKotak(1, panjangSekarang[1]).x - BATANG.w / 2} y={BATANG.ys[1]} width={BATANG.w} height={BATANG.h} fill="#FFFFFF" fillOpacity={0.6} stroke={MERAH} strokeWidth={1.6} strokeDasharray="3 2" />
          <text x={letakKotak(1, panjangSekarang[1]).x} y={letakKotak(1, panjangSekarang[1]).y + 4} textAnchor="middle" fontSize={12} fontWeight={900} fill={MERAH}>
            +
          </text>
        </g>
      ) : null}
    </g>
  );
  if (diam) return <Gambar label="Dua batang kotak">{gambar}</Gambar>;
  if (kanvas && l.tanya === "selisih") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Dua deret benda sejajar" : "Dua batang kotak polos"}>{gambar}</Gambar>;
}

/* ------------------------------ Number Line Difference: loncat di jalur ------------------------------ */
function Bendera({ x, y, isi }: { x: number; y: number; isi: string }) {
  return (
    <g aria-hidden="true">
      <line x1={x} x2={x} y1={y - 38} y2={y} stroke="#78350F" strokeWidth={2} />
      <path d={`M ${x} ${y - 38} L ${x + 22} ${y - 31} L ${x} ${y - 24} Z`} fill="#F87171" stroke="#B91C1C" strokeWidth={1} />
      <text x={x + 9} y={y - 28.5} textAnchor="middle" fontSize={8} fontWeight={900} fill="#FFFFFF">
        {isi}
      </text>
    </g>
  );
}

function Garis({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahGaris }) {
  const lo = Math.min(l.a, l.b);
  const hi = Math.max(l.a, l.b);
  const d = hi - lo;
  const mundur = l.tanya === "mundur";
  const mulai = l.tanya === "selisih" ? lo : l.a;
  const [h, setH] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  useSiapLangsung(rupa !== "lambang" && kanvas && l.tanya !== "selisih" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.tanya === "selisih" ? (
            <>
              dari <Kotak>{lo}</Kotak> ke <Kotak>{hi}</Kotak>
            </>
          ) : (
            <>
              mulai <Kotak>{l.a}</Kotak>, {mundur ? "mundur" : "maju"} <Kotak>{d}</Kotak> langkah
            </>
          )
        }
        bawah={<>{l.tanya === "selisih" ? "langkahnya" : "sampai di"} = <Tanya /></>}
      />
    );
  const langkahKe = (n: number) => {
    if (selesai || kanvas || diam) return;
    if (n !== h) {
      salah(mundur ? "Meloncatlah satu langkah demi satu langkah ke kiri." : "Meloncatlah satu langkah demi satu langkah ke kanan, mulai dari tempat mulai.");
      return;
    }
    const baru = h + 1;
    setH(baru);
    if (baru === d) {
      setSelesai(true);
      siap(l.tanya === "selisih" ? "Sudah sampai di bilangan besar. Berapa langkahnya?" : "Semua langkah sudah dilompati. Sampai di bilangan berapa?");
    } else info(kata(baru));
  };
  const hh = diam ? d : h;
  const posisi = mulai + (mundur ? -hh : hh);
  /* Letak tanda kanvas dan ketuk. */
  const letakKanvas = rupa === "benda" ? Array.from({ length: d }, (_, j) => letakBatu(j + 1, d, "kanan")) : Array.from({ length: d }, (_, j) => letakLangkah(lo + j));
  const periksa = () => {
    const p = periksaCentang(goresan, letakKanvas, rupa === "benda" ? 10 : 6.5);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Itu langkah dari bilangan kecil ke bilangan besar.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu langkah, satu tanda." : p.nyasar > 0 ? "Beri tanda hanya di langkah antara dua bilangan." : "Masih ada langkah yang belum diberi tanda.");
    }
  };
  let gambar: React.ReactNode;
  if (rupa === "benda") {
    const arah = mundur ? "kiri" : "kanan";
    const kodeKiri = letakBatu(0, d, arah);
    const kodeKanan = letakBatu(d, d, arah);
    const sp = jarakBatu(d);
    gambar = (
      <g>
        <Judul teks={kanvas ? "tandai tiap batu pijakan" : `loncatan katak: ${hh}`} />
        <rect x={20} y={Y_BATU - 4} width={260} height={30} rx={15} fill="#BAE6FD" opacity={0.7} aria-hidden="true" />
        <Bendera x={kodeKiri.x} y={Y_BATU} isi={String(mulai)} />
        <Bendera x={kodeKanan.x} y={Y_BATU} isi={l.tanya === "selisih" ? String(mundur ? lo : hi) : "?"} />
        {Array.from({ length: d }, (_, j) => {
          const t = letakBatu(j + 1, d, arah);
          const sudah = j < hh;
          return (
            <g key={j} {...(kanvas || diam ? {} : ketuk(() => langkahKe(j)))} aria-label={`batu ${kata(j + 1)}${sudah ? ", sudah dilompati" : ""}`}>
              <ellipse cx={t.x} cy={t.y + 8} rx={Math.min(10, sp / 2 - 2)} ry={5.5} fill={sudah ? "#A3E635" : "#A8A29E"} stroke="#57534E" strokeWidth={1.3} />
              <rect x={t.x - sp / 2} y={t.y - 28} width={sp} height={46} fill="transparent" />
            </g>
          );
        })}
        <g aria-label="katak">
          <text x={letakBatu(hh, d, arah).x} y={Y_BATU - 4} textAnchor="middle" fontSize={20}>
            {emoji(l.jenis) || "\u{1F438}"}
          </text>
        </g>
      </g>
    );
  } else {
    const dir = mundur ? -1 : 1;
    const maxSlot = l.tanya === "selisih" ? d : mundur ? mulai : 20 - mulai;
    const slotVal = (j: number) => (dir > 0 ? mulai + j : mulai - j - 1);
    gambar = (
      <g>
        <Judul teks={kanvas ? "tandai tiap langkah di garis bilangan" : `loncatan: ${hh}`} />
        <line x1={xGaris(0) - 6} x2={xGaris(20) + 6} y1={GARIS.y} y2={GARIS.y} stroke={UNGU} strokeWidth={1.8} aria-hidden="true" />
        {Array.from({ length: 21 }, (_, v) => (
          <g key={v} aria-hidden="true">
            <line x1={xGaris(v)} x2={xGaris(v)} y1={GARIS.y - 4} y2={GARIS.y + 4} stroke={UNGU} strokeWidth={1.2} />
            <text x={xGaris(v)} y={GARIS.y + 15} textAnchor="middle" fontSize={7.4} fontWeight={800} fill={UNGU}>
              {v}
            </text>
          </g>
        ))}
        {Array.from({ length: hh }, (_, j) => {
          const v = slotVal(j);
          const x1 = xGaris(dir > 0 ? v : v + 1);
          const x2 = xGaris(dir > 0 ? v + 1 : v);
          return <path key={j} d={`M ${x1} ${GARIS.y - 4} Q ${(x1 + x2) / 2} ${GARIS.y - 26} ${x2} ${GARIS.y - 4}`} fill="none" stroke={HIJAU} strokeWidth={1.8} />;
        })}
        {l.tanya === "selisih" ? (
          <>
            <circle cx={xGaris(lo)} cy={GARIS.y} r={4.8} fill="#2563EB" stroke="#FFFFFF" strokeWidth={1.2} />
            <circle cx={xGaris(hi)} cy={GARIS.y} r={4.8} fill={MERAH} stroke="#FFFFFF" strokeWidth={1.2} />
          </>
        ) : (
          <circle cx={xGaris(l.a)} cy={GARIS.y} r={4.8} fill="#2563EB" stroke="#FFFFFF" strokeWidth={1.2} />
        )}
        <circle cx={xGaris(posisi)} cy={GARIS.y - 9} r={4} fill={HIJAU} stroke="#FFFFFF" strokeWidth={1} aria-hidden="true" />
        {kanvas || diam
          ? null
          : Array.from({ length: maxSlot }, (_, j) => (
              <g key={`s${j}`} {...ketuk(() => langkahKe(j))} aria-label={`langkah ${kata(j + 1)}`}>
                <rect x={letakLangkah(slotVal(j)).x - GARIS.jarak / 2} y={GARIS.y - 40} width={GARIS.jarak} height={46} fill="transparent" />
              </g>
            ))}
      </g>
    );
  }
  if (diam) return <Gambar label="Garis bilangan">{gambar}</Gambar>;
  if (kanvas && l.tanya === "selisih") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Katak di batu pijakan" : "Garis bilangan nol sampai dua puluh"}>{gambar}</Gambar>;
}

/* ------------------------------ Equalizing: samakan dua baris ------------------------------ */
function Samakan({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahSamakan }) {
  const s = selisihAB(l);
  const kecil = l.a < l.b ? 0 : 1;
  const banyak = 1 - kecil;
  const nKecil = Math.min(l.a, l.b);
  const nBanyak = Math.max(l.a, l.b);
  const [tambah, setTambah] = useState(0);
  const [diambil, setDiambil] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const jenisBaris = (b: number) => (b === 0 ? l.jenis : l.jenis2);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  useSiapLangsung(rupa !== "lambang" && kanvas && l.tanya === "ambil" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>{l.a}</Kotak> dan <Kotak>{l.b}</Kotak> disamakan
          </>
        }
        bawah={
          <>
            {l.tanya === "tambah" ? "ditambah" : "diambil"} = <Tanya />
          </>
        }
      />
    );
  const selesaiSama = (p: string) => {
    setSelesai(true);
    siap(l.angka ? p : "Betul! Kedua baris sudah sama banyak.");
  };
  const tambahSatu = () => {
    if (selesai || kanvas || diam || l.tanya !== "tambah") return;
    const n = tambah + 1;
    setTambah(n);
    if (n === s) selesaiSama("Sekarang kedua baris sama banyak. Hitung yang kamu tambahkan.");
    else info(kata(n));
  };
  const ambilSatu = (i: number) => {
    if (selesai || kanvas || diam || l.tanya !== "ambil" || diambil.includes(i)) return;
    const baru = [...diambil, i];
    setDiambil(baru);
    if (baru.length === s) selesaiSama("Sekarang kedua baris sama banyak. Hitung yang kamu ambil.");
    else info(kata(baru.length));
  };
  const slotKanvas = Array.from({ length: s }, (_, j) => letakItem(kecil, nKecil + j));
  const periksa = () => {
    const p = periksaCentang(goresan, slotKanvas, RADIUS_TANDA);
    if (p.benar) {
      setSelesai(true);
      siap(l.angka ? "Betul! Itu tempat yang perlu ditambahkan." : "Betul! Kedua baris jadi sama banyak.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu tempat, satu tanda." : p.nyasar > 0 ? "Beri tanda hanya di tempat kosong yang perlu ditambahkan." : "Masih ada tempat kosong yang belum diberi tanda.");
    }
  };
  const sudahSama = selesai && !kanvas;
  const barisItem = (b: number) => {
    const n = b === kecil ? nKecil + (l.tanya === "tambah" && !kanvas && !diam ? tambah : 0) : nBanyak;
    return Array.from({ length: n }, (_, i) => {
      const p = letakItem(b, i);
      const baru = b === kecil && i >= nKecil;
      const diambilIni = b === banyak && diambil.includes(i);
      const ambilBisa = l.tanya === "ambil" && b === banyak && !kanvas && !diam && !selesai && !diambilIni;
      return (
        <g key={`${b}-${i}`} {...(ambilBisa ? ketuk(() => ambilSatu(i)) : {})} aria-label={`${b === 0 ? "atas" : "bawah"} ${kata(i + 1)}${diambilIni ? ", sudah diambil" : ""}`}>
          <Benda x={p.x} y={p.y} rupa={rupa} jenis={jenisBaris(b)} baris={b} sorot={baru} pudar={diambilIni} />
        </g>
      );
    });
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? "tandai tempat kosong yang perlu ditambah" : sudahSama ? "sama banyak!" : l.tanya === "tambah" ? `ditambah: ${tambah}` : `diambil: ${diambil.length}`} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          <Alas y={BARIS[0]} jenis={l.jenis} />
          <Alas y={BARIS[1]} jenis={l.jenis2} />
        </g>
      ) : null}
      {[0, 1].map((b) => {
        const t = letakBaris(b);
        return (
          <g key={b} aria-label={`kartu baris ${b === 0 ? "atas" : "bawah"}`}>
            <rect x={t.x - KARTU_BARIS.w / 2} y={t.y - KARTU_BARIS.h / 2} width={KARTU_BARIS.w} height={KARTU_BARIS.h} rx={6} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
            <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
              {b === 0 ? "atas" : "bawah"}
            </text>
          </g>
        );
      })}
      {barisItem(0)}
      {barisItem(1)}
      {l.tanya === "tambah" && (kanvas || diam)
        ? slotKanvas.map((p, j) => <circle key={`k${j}`} cx={p.x} cy={p.y} r={6.5} fill="#FFFFFF" fillOpacity={0.6} stroke={MERAH} strokeWidth={1.4} strokeDasharray="3 2" />)
        : null}
      {l.tanya === "tambah" && !kanvas && !diam && !selesai ? (
        <g {...ketuk(tambahSatu)} aria-label="tempat kosong di baris yang lebih sedikit, ketuk untuk menambah">
          <circle cx={letakItem(kecil, nKecil + tambah).x} cy={letakItem(kecil, nKecil + tambah).y} r={7} fill="#FFFFFF" fillOpacity={0.6} stroke={MERAH} strokeWidth={1.6} strokeDasharray="3 2" />
          <text x={letakItem(kecil, nKecil + tambah).x} y={letakItem(kecil, nKecil + tambah).y + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={MERAH}>
            +
          </text>
        </g>
      ) : null}
    </g>
  );
  if (diam) return <Gambar label="Dua baris yang disamakan">{gambar}</Gambar>;
  if (kanvas && l.tanya === "tambah") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Dua baris benda yang disamakan" : "Dua baris titik yang disamakan"}>{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "pasang" ? <Pasang {...props} l={l} /> : l.tipe === "batang" ? <Batang {...props} l={l} /> : l.tipe === "garis" ? <Garis {...props} l={l} /> : <Samakan {...props} l={l} />;
}

function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
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
      <Dasar l={l.dasar} rupa={rupa} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo; Jawabanku {l.jawabTokoh}.
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
function pertanyaan(d: LangkahDasar, rupa: Rupa): string {
  switch (d.tipe) {
    case "pasang":
      return d.tanya === "selisih" ? "Berapa selisihnya?" : "";
    case "batang":
      return d.tanya === "selisih" ? "Berapa selisihnya?" : rupa === "benda" ? "Berapa isi deret bawah?" : "Berapa kotak di batang yang dicari?";
    case "garis":
      return d.tanya === "selisih" ? "Berapa langkahnya?" : "Sampai di bilangan berapa?";
    case "samakan":
      return d.tanya === "tambah" ? "Berapa yang ditambahkan?" : "Berapa yang diambil?";
  }
}

export function LangkahNampan({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
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
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const d = l.tipe === "salah" ? l.dasar : l;
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{pertanyaan(d, rupa)}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanIkan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
