"use client";

import React, { useEffect, useMemo, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { angkaJawab, benarSemua, kata, pilihanBenar, pilihanDari, utuhLangkah, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  IKATAN,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  letakBaris,
  letakDiBagian,
  letakDiUtuh,
  letakKartu,
  letakManik,
  periksaCentang,
  periksaLingkari,
  periksaPisah,
  selBatang,
  type Goresan,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 1 Sub-Bab D: kegiatan metode (semua pasangan, memisah, menggabung, ikatan bilangan, model batang,
 * rak manik), lalu menjawab dengan cara kelompoknya. Rupa: kue, kubus, dan manik (Concrete), titik dan diagram (Pictorial),
 * angka saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { l: Langkah; rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const WARNA_A = "#3B82F6";
const WARNA_B = "#EC4899";

/** Satu benda: kue (benda) atau titik (diagram). */
function Satu({ rupa, x, y, warna, redup = false, u = 20 }: { rupa: Rupa; x: number; y: number; warna: string; redup?: boolean; u?: number }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u} opacity={redup ? 0.3 : 1}>
        {EMOJI.kue}
      </text>
    );
  return <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.4} opacity={redup ? 0.3 : 1} />;
}

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}

/** Pilih semua pasangan yang benar (ketuk atau lingkari). */
function Semua({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "semua" }> }) {
  const [pilih, setPilih] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = pilihanBenar(l);
  const periksa = () => {
    if (kanvas) {
      const r = periksaLingkari(goresan, l.pilihan.map((_, i) => letakKartu(i)), l.pilihan.map((_, i) => benar.includes(i)));
      if (r.benar) {
        setSelesai(true);
        siap(`Betul! Semua pasangan ${kata(l.utuh)} sudah dilingkari.`);
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? `Ada yang utuhnya bukan ${kata(l.utuh)}. Hitung lagi kedua bagiannya.` : "Masih ada pasangan yang belum dilingkari.");
      }
      return;
    }
    if (benarSemua(l, pilih)) {
      setSelesai(true);
      siap(`Betul! Semua pasangan ${kata(l.utuh)} sudah ditemukan.`);
    } else salah(pilih.some((i) => !benar.includes(i)) ? `Ada yang utuhnya bukan ${kata(l.utuh)}. Hitung lagi kedua bagiannya.` : "Masih ada pasangan yang belum dipilih.");
  };
  const gambar = (
    <g>
      {l.pilihan.map(([a, b], i) => {
        const c = letakKartu(i);
        const on = pilih.includes(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => !selesai && setPilih(on ? pilih.filter((x) => x !== i) : [...pilih, i])))} aria-label={`pasangan ${a} dan ${b}`} aria-pressed={on}>
            <rect x={c.x - UKURAN_KARTU.w / 2} y={c.y - UKURAN_KARTU.h / 2} width={UKURAN_KARTU.w} height={UKURAN_KARTU.h} rx={10} fill={on ? "#FFE566" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={on ? 3.5 : 2} />
            {rupa === "lambang" ? (
              <text x={c.x} y={c.y + 7} textAnchor="middle" fontSize={18} fontWeight={900} fill="#DC2626">
                {a} dan {b}
              </text>
            ) : (
              <g>
                <line x1={c.x} y1={c.y - 24} x2={c.x} y2={c.y + 24} stroke="#1C01A5" strokeDasharray="3 3" />
                {Array.from({ length: a }, (_, j) => (
                  <Satu key={`a${j}`} rupa={rupa} x={c.x - 35 + (j % 3) * 13} y={c.y - 16 + Math.floor(j / 3) * 15} warna={WARNA_A} u={rupa === "benda" ? 12 : 16} />
                ))}
                {Array.from({ length: b }, (_, j) => (
                  <Satu key={`b${j}`} rupa={rupa} x={c.x + 9 + (j % 3) * 13} y={c.y - 16 + Math.floor(j / 3) * 15} warna={WARNA_B} u={rupa === "benda" ? 12 : 16} />
                ))}
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Kartu pasangan">
        {gambar}
      </svg>
      {!selesai ? <TombolPeriksa aktif={pilih.length > 0} onClick={periksa} /> : null}
    </div>
  );
}

/** Pisah: tarik garis tegak di antara bagian kiri dan kanan. */
function Pisah({ l, rupa, salah, siap }: PK & { l: Extract<Langkah, { tipe: "pisah" }> }) {
  const baris = useMemo(() => letakBaris(l.utuh), [l.utuh]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const periksa = () => {
    const r = periksaPisah(goresan, baris, l.a);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! ${kapital(kata(l.a))} di kiri dan ${kata(l.utuh - l.a)} di kanan. Utuhnya ${kata(l.utuh)}.`);
    } else {
      setGoresan([]);
      salah(r.salahTempat ? `Garisnya belum di tempat yang pas. Hitung ${kata(l.a)} dari kiri.` : "Tarik satu garis tegak dari atas ke bawah barisan.");
    }
  };
  const gambar = (
    <g>
      {baris.map((p, i) => (
        <Satu key={i} rupa={rupa} x={p.x} y={p.y} warna="#F59E0B" u={24} />
      ))}
      {selesai ? (
        <>
          <text x={baris[0].x - 4} y={60} fontSize={14} fontWeight={900} fill={WARNA_A}>
            {l.a}
          </text>
          <text x={baris[baris.length - 1].x} y={60} textAnchor="end" fontSize={14} fontWeight={900} fill={WARNA_B}>
            {l.utuh - l.a}
          </text>
        </>
      ) : null}
    </g>
  );
  return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
}

/** Gabung: dua kelompok bergeser menjadi satu baris. */
function Gabung({ l, rupa, siap }: PK & { l: Extract<Langkah, { tipe: "gabung" }> }) {
  const [gabung, setGabung] = useState(false);
  const utuh = l.a + l.b;
  const baris = letakBaris(Math.max(utuh, 1));
  if (rupa === "lambang")
    return (
      <p className="py-3 text-center text-3xl font-black text-[#1C01A5]">
        <span className="rounded-xl bg-[#DBEAFE] px-3">{l.a}</span> dan <span className="rounded-xl bg-[#FCE7F3] px-3">{l.b}</span> digabung menjadi <span className="rounded-xl bg-[#FFE566] px-3 text-[#DC2626]">?</span>
      </p>
    );
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Dua bagian untuk digabung">
        {Array.from({ length: utuh }, (_, i) => {
          const p = gabung ? baris[i] : i < l.a ? { x: 40 + i * 26, y: 70 } : { x: 186 + (i - l.a) * 26, y: 70 };
          return <Satu key={i} rupa={rupa} x={p.x} y={gabung ? 130 : p.y} warna={i < l.a ? WARNA_A : WARNA_B} u={24} />;
        })}
        {!gabung ? <line x1={150} y1={40} x2={150} y2={100} stroke="#1C01A5" strokeDasharray="4 4" /> : null}
      </svg>
      {!gabung ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setGabung(true);
              siap(`Dua bagian sudah digabung.`);
            }}
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]"
          >
            {"\u{1F91D}"} Gabungkan
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Ikatan bilangan: benda di lingkaran utuh dan dua lingkaran bagian; angka saja untuk lambang. */
function Ikatan({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "ikatan" }> }) {
  const utuh = l.a + l.b;
  const [pindah, setPindah] = useState(0);
  const [gabung, setGabung] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const kosong = l.cari === "b" && l.b === 0;
  useEffect(() => {
    if (rupa === "lambang" || (kanvas && kosong)) siap(kosong ? "Semua sudah di bagian pertama. Bagian kedua tidak ada isinya." : undefined);
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") {
    const t = (v: string, c: { x: number; y: number }, isi: string) => (
      <g>
        <circle cx={c.x} cy={c.y} r={30} fill={isi} stroke="#1C01A5" strokeWidth={2.5} />
        <text x={c.x} y={c.y + 9} textAnchor="middle" fontSize={26} fontWeight={900} fill={v === "?" ? "#DC2626" : "#1C01A5"}>
          {v}
        </text>
      </g>
    );
    return (
      <svg viewBox="0 0 300 200" className={SVG} aria-label="Ikatan bilangan">
        <line x1={150} y1={70} x2={80} y2={140} stroke="#1C01A5" strokeWidth={2.5} />
        <line x1={150} y1={70} x2={220} y2={140} stroke="#1C01A5" strokeWidth={2.5} />
        {t(l.cari === "utuh" ? "?" : String(utuh), { x: 150, y: 50 }, "#FFE566")}
        {t(String(l.a), { x: 80, y: 150 }, "#DBEAFE")}
        {t(l.cari === "b" ? "?" : String(l.b), { x: 220, y: 150 }, "#FCE7F3")}
      </svg>
    );
  }
  const ketukBenda = (i: number) => {
    if (selesai || l.cari !== "b" || i < l.a) return;
    if (i !== l.a + pindah) {
      salah("Ketuk berurutan, satu per satu.");
      return;
    }
    if (pindah + 1 >= l.b) {
      setSelesai(true);
      siap(`Bagian kedua berisi ${kata(l.b)}.`);
    }
    setPindah(pindah + 1);
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, Array.from({ length: utuh }, (_, i) => letakDiUtuh(i)), Array.from({ length: utuh }, (_, i) => i >= l.a));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu bagian keduanya.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Yang pudar sudah masuk bagian pertama. Lingkari yang lain saja." : "Masih ada yang belum dilingkari.");
    }
  };
  const posisi = (i: number) => {
    if (l.cari === "utuh") return gabung ? letakDiUtuh(i) : i < l.a ? letakDiBagian(IKATAN.a, i) : letakDiBagian(IKATAN.b, i - l.a);
    if (i >= l.a && i < l.a + pindah) return letakDiBagian(IKATAN.b, i - l.a);
    return letakDiUtuh(i);
  };
  const gambar = (
    <g>
      <line x1={IKATAN.utuh.x} y1={IKATAN.utuh.y + IKATAN.utuh.r} x2={IKATAN.a.x} y2={IKATAN.a.y - IKATAN.a.r} stroke="#1C01A5" strokeWidth={2} />
      <line x1={IKATAN.utuh.x} y1={IKATAN.utuh.y + IKATAN.utuh.r} x2={IKATAN.b.x} y2={IKATAN.b.y - IKATAN.b.r} stroke="#1C01A5" strokeWidth={2} />
      <circle cx={IKATAN.utuh.x} cy={IKATAN.utuh.y} r={IKATAN.utuh.r} fill="#FEF9C3" stroke="#1C01A5" strokeWidth={2.4} />
      <circle cx={IKATAN.a.x} cy={IKATAN.a.y} r={IKATAN.a.r} fill="#DBEAFE" stroke="#1C01A5" strokeWidth={2.4} />
      <circle cx={IKATAN.b.x} cy={IKATAN.b.y} r={IKATAN.b.r} fill="#FCE7F3" stroke="#1C01A5" strokeWidth={2.4} />
      <text x={IKATAN.a.x - IKATAN.a.r - 4} y={IKATAN.a.y - IKATAN.a.r + 4} textAnchor="end" fontSize={14} fontWeight={900} fill={WARNA_A}>
        {l.a}
      </text>
      {Array.from({ length: utuh }, (_, i) => {
        const p = posisi(i);
        return (
          <g key={i} {...(kanvas || l.cari !== "b" ? {} : ketuk(() => ketukBenda(i)))} aria-label={`benda ${i + 1}`}>
            <Satu rupa={rupa} x={p.x} y={p.y} warna={i < l.a ? WARNA_A : WARNA_B} redup={l.cari === "b" && i < l.a} u={rupa === "benda" ? 18 : 18} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || kosong} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Ikatan bilangan">
        {gambar}
      </svg>
      {l.cari === "utuh" && !gabung ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setGabung(true);
              setSelesai(true);
              siap("Kedua bagian sudah masuk ke lingkaran utuh.");
            }}
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]"
          >
            {"\u{1F91D}"} Gabungkan
          </button>
        </div>
      ) : null}
      {l.cari === "b" && l.b === 0 && !selesai ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setSelesai(true);
              siap("Semua sudah di bagian pertama. Bagian kedua tidak ada isinya.");
            }}
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-5 text-sm font-black text-[#1C01A5]"
          >
            Tidak ada yang tersisa
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Model batang: kubus atau sel; angka saja untuk lambang. */
function Batang({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "batang" }> }) {
  const utuh = l.a + l.b;
  const [isi, setIsi] = useState(0);
  const [sambung, setSambung] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="mx-auto max-w-sm space-y-1 py-2">
        <div className="rounded-lg border-4 border-[#1C01A5] bg-[#FFE566] py-1 text-center text-2xl font-black text-[#DC2626]">{l.cari === "utuh" ? "?" : utuh}</div>
        <div className="flex gap-1">
          <div className="rounded-lg border-4 border-[#1C01A5] bg-[#DBEAFE] py-1 text-center text-2xl font-black text-[#1C01A5]" style={{ flex: Math.max(l.a, 1) }}>
            {l.a}
          </div>
          <div className="rounded-lg border-4 border-[#1C01A5] bg-[#FCE7F3] py-1 text-center text-2xl font-black text-[#DC2626]" style={{ flex: Math.max(l.b, 1) }}>
            {l.cari === "b" ? "?" : l.b}
          </div>
        </div>
      </div>
    );
  const sasaran = l.cari === "b" ? Array.from({ length: l.b }, (_, j) => l.a + j) : Array.from({ length: utuh }, (_, j) => j);
  const tengahSel = (i: number) => {
    const s = selBatang(utuh, i);
    return { x: s.x + s.s / 2, y: s.y + s.s / 2 };
  };
  const ketukSel = (i: number) => {
    if (selesai || l.cari !== "b" || i < l.a) return;
    if (i !== l.a + isi) {
      salah("Isi kotak kosong berurutan dari kiri.");
      return;
    }
    if (isi + 1 >= l.b) {
      setSelesai(true);
      siap("Batang sudah penuh.");
    }
    setIsi(isi + 1);
  };
  const periksa = () => {
    const r = periksaCentang(goresan, sasaran.map(tengahSel), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap kotak.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak, satu tanda." : r.nyasar > 0 ? (l.cari === "b" ? "Beri tanda hanya pada kotak yang kosong." : "Beri tanda di dalam kotak batang.") : "Ada kotak yang belum diberi tanda.");
    }
  };
  const kubus = rupa === "benda";
  const sel = (i: number, x: number, y: number, terisi: boolean, warna: string) => (
    <g key={i} {...(kanvas || l.cari !== "b" ? {} : ketuk(() => ketukSel(i)))} aria-label={`kotak ${i + 1}`}>
      <rect x={x} y={y} width={26} height={26} rx={kubus ? 4 : 1} fill={terisi ? warna : "#FFFFFF"} stroke="#1C01A5" strokeWidth={kubus ? 2.2 : 1.6} strokeDasharray={terisi ? undefined : "4 3"} />
      {kubus && terisi ? <rect x={x + 4} y={y + 4} width={8} height={6} rx={1} fill="#FFFFFF" opacity={0.6} /> : null}
    </g>
  );
  const gambar =
    l.cari === "b" ? (
      <g>
        {Array.from({ length: utuh }, (_, i) => {
          const s = selBatang(utuh, i);
          const terisi = i < l.a || (!kanvas && i < l.a + isi);
          return sel(i, s.x, s.y, terisi, i < l.a ? WARNA_A : WARNA_B);
        })}
        <text x={150} y={70} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1C01A5">
          utuh {utuh}, bagian {l.a}
        </text>
      </g>
    ) : (
      <g>
        {Array.from({ length: utuh }, (_, i) => {
          const s = selBatang(utuh, i);
          const x = sambung || kanvas ? s.x : i < l.a ? 20 + i * 26 : 280 - (utuh - i) * 26;
          const y = sambung || kanvas ? s.y : i < l.a ? 50 : 130;
          return sel(i, x, y, true, i < l.a ? WARNA_A : WARNA_B);
        })}
      </g>
    );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Model batang">
        {gambar}
      </svg>
      {l.cari === "utuh" && !sambung ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setSambung(true);
              setSelesai(true);
              siap("Dua batang sudah disambung.");
            }}
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]"
          >
            {"\u{1F517}"} Sambung
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Rak manik: geser manik ke kiri satu per satu (atau lingkari yang di kanan). */
function Manik({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "manik" }> }) {
  const [geser, setGeser] = useState(kanvas ? l.kiri : 0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const kananKosong = l.utuh === l.kiri;
  useEffect(() => {
    if (rupa === "lambang" || (!kanvas && l.kiri === 0) || (kanvas && kananKosong)) siap(rupa === "lambang" ? undefined : l.kiri === 0 ? "Tidak ada manik yang digeser." : "Semua manik sudah di kiri.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-2 text-center text-xl font-black text-[#1C01A5]">
        <p>
          Ada <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">{l.utuh}</span> manik.
        </p>
        <p>
          <span className="rounded-lg bg-[#DBEAFE] px-2">{l.kiri}</span> di kiri, <span className="rounded-lg bg-[#FCE7F3] px-2 text-[#DC2626]">?</span> di kanan.
        </p>
      </div>
    );
  const ketukManik = (i: number) => {
    if (selesai || kanvas) return;
    if (i !== geser) {
      salah("Geser manik paling kiri dari barisan kanan, satu per satu.");
      return;
    }
    if (geser + 1 > l.kiri) {
      salah(`Cukup ${kata(l.kiri)} manik di kiri.`);
      return;
    }
    if (geser + 1 === l.kiri) {
      setSelesai(true);
      siap(`${kapital(kata(l.kiri))} manik sudah di kiri.`);
    }
    setGeser(geser + 1);
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, Array.from({ length: l.utuh }, (_, i) => letakManik(l.utuh, l.kiri, i)), Array.from({ length: l.utuh }, (_, i) => i >= l.kiri));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu manik di kanan.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari manik di kanan saja." : "Masih ada manik kanan yang belum dilingkari.");
    }
  };
  const gambar = (
    <g>
      <line x1={14} y1={100} x2={286} y2={100} stroke={rupa === "benda" ? "#78350F" : "#1C01A5"} strokeWidth={rupa === "benda" ? 4 : 2} />
      {rupa === "benda" ? (
        <>
          <rect x={8} y={70} width={8} height={60} rx={2} fill="#B45309" />
          <rect x={284} y={70} width={8} height={60} rx={2} fill="#B45309" />
        </>
      ) : null}
      <text x={30} y={62} fontSize={14} fontWeight={900} fill={WARNA_A}>
        kiri {l.kiri}
      </text>
      {Array.from({ length: l.utuh }, (_, i) => {
        const p = letakManik(l.utuh, geser, i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukManik(i)))} aria-label={`manik ${i + 1}`}>
            <circle cx={p.x} cy={p.y} r={rupa === "benda" ? 10 : 7} fill={rupa === "benda" ? (i < 5 ? "#EF4444" : "#F8FAFC") : "#1C01A5"} stroke="#1C01A5" strokeWidth={1.6} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || kananKosong} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Rak manik">
      {gambar}
    </svg>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung kedua bagian, lalu gabungkan menjadi utuh.",
  ikatan: "Utuh terdiri dari dua bagian. Hitung bagian yang belum diketahui.",
  batang: "Hitung kotak pada bagian yang dicari.",
  manik: "Hitung manik yang tinggal di kanan.",
};

export function LangkahPesta({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const tanpaKegiatan = rupa === "lambang" && l.tipe === "gabung";
  const [siapJawab, setSiapJawab] = useState(tanpaKegiatan);
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
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const pesanBenar = (m: number): string => {
    switch (l.tipe) {
      case "manik":
        return `Betul! ${kapital(kata(l.utuh))} adalah ${kata(l.kiri)} dan ${kata(m)}.`;
      case "gabung":
        return `Betul! ${kapital(kata(l.a))} dan ${kata(l.b)} digabung menjadi ${kata(m)}.`;
      default:
        return l.tipe === "ikatan" || l.tipe === "batang" ? `Betul! ${kapital(kata(utuhLangkah(l)))} adalah ${kata(l.a)} dan ${kata(l.b)}.` : `Betul! Jawabannya ${kata(m)}.`;
    }
  };
  const siap = (p?: string) => {
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) {
      setPesan(p);
      bicara(p);
    }
  };
  const jawab = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(pesanBenar(m));
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { l, rupa, kanvas: cara === "kanvas", salah, siap };
  const tanya = l.tipe === "gabung" || ((l.tipe === "ikatan" || l.tipe === "batang") && l.cari === "utuh") ? "Berapa utuhnya?" : l.tipe === "manik" ? "Berapa manik di kanan?" : "Berapa bagian yang lain?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "semua" ? <Semua {...pk} l={l} /> : l.tipe === "pisah" ? <Pisah {...pk} l={l} /> : l.tipe === "gabung" ? <Gabung {...pk} l={l} /> : l.tipe === "ikatan" ? <Ikatan {...pk} l={l} /> : l.tipe === "batang" ? <Batang {...pk} l={l} /> : <Manik {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulis kunci={n} onBenar={() => jawab(n)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuara kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "")} onPesan={setPesan} />
          ) : (
            <Pilihan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
