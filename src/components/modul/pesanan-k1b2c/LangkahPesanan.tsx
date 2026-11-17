"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { angkaJawab, bacaKalimat, jawabLengkap, kata, kataCerita, kisah, nomorBenar, nomorBilangan, pilihanDari, tulisKalimat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  KANTONG,
  LEBAR_ADEGAN,
  RAK_A,
  RAK_B,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  diKantong,
  diRak,
  hitungTitikBaris,
  letakKartu,
  periksaCentang,
  periksaLingkari,
  selA,
  selB,
  slotGambar,
  type Goresan,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 2 Sub-Bab C: cerita pesanan ditampilkan, lalu kegiatan metode (pilih kalimat, cari dua bilangan,
 * peragakan, baca-gambar-tulis, model batang), lalu menjawab dengan caranya. Rupa: sayur pesanan (Concrete), titik dan batang
 * (Pictorial), angka, tanda, dan kata saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benda: string; nama: string; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; benda: string; nama: string; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const WARNA_A = "#2563EB";
const WARNA_B = "#DB2777";
const TOMBOL = "min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Satu({ rupa, benda, x, y, warna, u = 20 }: { rupa: Rupa; benda: string; x: number; y: number; warna: string; u?: number }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u}>
        {EMOJI[benda] ?? EMOJI.bibit}
      </text>
    );
  return <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.4} />;
}
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
/** Kartu cerita pesanan (teks), dipakai semua kegiatan kecuali cari bilangan. */
const KartuCerita = ({ l, nama }: { l: Langkah; nama: string }) => (
  <p className="mx-auto max-w-[420px] rounded-xl border-2 border-dashed border-[#1C01A5]/50 bg-[#FFFDF5] px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
    {"\u{1F4E8}"} {kisah(l.jenis, l.a, l.b, nama)}
  </p>
);

/* ------------------------------ Kalimat: pilih kalimat yang cocok dengan cerita ------------------------------ */
function Kalimat({ l, rupa, nama, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "kalimat" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorBenar(l);
  const pesan = `Betul! ${kapital(bacaKalimat([l.a, l.b, l.a + l.b]))}. ${jawabLengkap(l, nama)}`;
  const ketukKartu = (i: number) => {
    if (selesai || mati.includes(i)) return;
    if (benar.includes(i)) {
      setSelesai(true);
      siap(pesan);
    } else {
      setMati((m) => [...m, i]);
      salah(l.pilihan[i][0] + l.pilihan[i][1] !== l.pilihan[i][2] ? "Hasilnya belum pas. Hitung lagi semuanya." : "Bilangannya belum sama dengan cerita. Cari lagi dua bilangannya.");
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, l.pilihan.map((_, i) => letakKartu(i)), l.pilihan.map((_, i) => benar.includes(i)));
    if (r.benar) {
      setSelesai(true);
      siap(pesan);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Ada kalimat yang tidak cocok ikut dilingkari. Lingkari satu kalimat saja." : "Kalimat yang cocok belum dilingkari.");
    }
  };
  const kata2 = kisah(l.jenis, l.a, l.b, nama).split(". ");
  const gambar = (
    <g>
      <rect x={14} y={8} width={272} height={84} rx={14} fill="#FFFDF5" stroke="#1C01A5" strokeWidth={2} strokeDasharray="6 4" />
      {kata2.map((t, i) => (
        <text key={i} x={150} y={32 + i * 22} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={i === kata2.length - 1 ? "#DB2777" : "#1C01A5"}>
          {t.endsWith("?") || t.endsWith(".") ? t : `${t}.`}
        </text>
      ))}
      {l.pilihan.map((p, i) => {
        const c = letakKartu(i);
        const on = selesai && benar.includes(i);
        const m = mati.includes(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukKartu(i)))} aria-label={`kalimat ${tulisKalimat(p)}`} aria-disabled={m}>
            <rect x={c.x - UKURAN_KARTU.w / 2} y={c.y - UKURAN_KARTU.h / 2} width={UKURAN_KARTU.w} height={UKURAN_KARTU.h} rx={10} fill={on ? "#BBF7D0" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={on ? 3.2 : 1.8} opacity={m ? 0.35 : 1} />
            <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={rupa === "lambang" ? 17 : 11} fontWeight={900} fill="#1C01A5" opacity={m ? 0.35 : 1}>
              {rupa === "lambang" ? tulisKalimat(p) : bacaKalimat(p)}
            </text>
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Pilih kalimat untuk cerita">{gambar}</Gambar>;
}

/* ------------------------------ Cerita: ketuk dua bilangan ------------------------------ */
function Cerita({ l, nama, salah, siap }: PK & { l: Extract<Langkah, { tipe: "cerita" }> }) {
  const [dapat, setDapat] = useState<number[]>([]);
  const kata2 = kataCerita(l, nama);
  const sasaran = nomorBilangan(l, nama);
  const ketukKata = (i: number) => {
    if (dapat.length === 2 || dapat.includes(i)) return;
    if (!sasaran.includes(i)) {
      salah(/[?]$/.test(kata2[i]) || kata2[i].toLowerCase().startsWith("berapa") ? "Itu pertanyaannya. Cari kata bilangan." : "Itu bukan bilangan. Cari kata bilangan, seperti tiga atau lima.");
      return;
    }
    const baru = [...dapat, i];
    setDapat(baru);
    if (baru.length === 2) siap(`Dua bilangannya ${kata(l.a)} dan ${kata(l.b)}.`);
  };
  return (
    <div className="mx-auto max-w-[420px] rounded-2xl border-4 border-dashed border-[#1C01A5]/50 bg-[#FFFDF5] p-3" role="group" aria-label="Cerita pesanan">
      <div className="flex flex-wrap justify-center gap-1">
        {kata2.map((k, i) => (
          <button key={i} type="button" onClick={() => ketukKata(i)} className={`min-h-[40px] rounded-lg border-2 px-2 text-sm font-black ${dapat.includes(i) ? "border-[#DC2626] bg-[#FEE2E2] text-[#DC2626]" : "border-transparent text-[#1C01A5] hover:border-[#1C01A5]/30"}`}>
            {k}
          </button>
        ))}
      </div>
      {dapat.length === 2 ? <p className="mt-2 text-center text-lg font-black text-[#DC2626]">{l.a} + {l.b} = ?</p> : null}
    </div>
  );
}

/* ------------------------------ Peragakan: masukkan semua ke kantong ------------------------------ */
function Peraga({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "peraga" }> }) {
  const [masuk, setMasuk] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const total = l.a + l.b;
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <p className="py-3 text-center text-3xl font-black text-[#1C01A5]">
        <span className="rounded-xl bg-[#DBEAFE] px-3">{l.a}</span> + <span className="rounded-xl bg-[#FCE7F3] px-3">{l.b}</span> = <span className="rounded-xl bg-[#FFE566] px-3 text-[#DC2626]">?</span>
      </p>
    );
  const letakAsal = (i: number) => (i < l.a ? diRak(RAK_A, i) : diRak(RAK_B, i - l.a));
  const ketukBenda = (i: number) => {
    if (selesai || kanvas || masuk.includes(i)) return;
    const baru = [...masuk, i];
    setMasuk(baru);
    if (baru.length === total) {
      setSelesai(true);
      siap("Semua sudah masuk ke kantong pesanan.");
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, Array.from({ length: total }, (_, i) => letakAsal(i)), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap benda di kedua rak.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Beri tanda pada benda di rak saja." : "Ada benda yang belum diberi tanda.");
    }
  };
  const kotak = (r: { x: number; y: number; w: number; h: number }, nama: string, isi: string, garis: string) => (
    <g>
      <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={8} fill={isi} stroke={garis} strokeWidth={2.2} />
      <text x={r.x + 6} y={r.y + 12} fontSize={10} fontWeight={900} fill={garis}>
        {nama}
      </text>
    </g>
  );
  const gambar = (
    <g>
      {kotak(RAK_A, "rak pertama", "#EFF6FF", "#1D4ED8")}
      {kotak(RAK_B, "rak kedua", "#FDF2F8", "#BE185D")}
      {kotak(KANTONG, "kantong pesanan", rupa === "benda" ? "#FDE68A" : "#F8FAFC", "#92400E")}
      {l.a === 0 ? (
        <text x={RAK_A.x + RAK_A.w / 2} y={RAK_A.y + 48} textAnchor="middle" fontSize={11} fontWeight={900} fill="#64748B">
          kosong, nol
        </text>
      ) : null}
      {l.b === 0 ? (
        <text x={RAK_B.x + RAK_B.w / 2} y={RAK_B.y + 48} textAnchor="middle" fontSize={11} fontWeight={900} fill="#64748B">
          kosong, nol
        </text>
      ) : null}
      {Array.from({ length: total }, (_, i) => {
        const n = masuk.indexOf(i);
        const p = n >= 0 ? diKantong(n) : letakAsal(i);
        return (
          <g key={i} {...(kanvas || n >= 0 ? {} : ketuk(() => ketukBenda(i)))} aria-label={`benda ${i + 1}`}>
            <Satu rupa={rupa} benda={benda} x={p.x} y={p.y} warna={i < l.a ? WARNA_A : WARNA_B} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Peragakan pesanan">{gambar}</Gambar>;
}

/* ------------------------------ Baca-gambar-tulis: gambar titik ------------------------------ */
function GambarTitik({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "gambar" }> }) {
  const [isi, setIsi] = useState<[number[], number[]]>([[], []]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-1 py-2 text-center font-black text-[#1C01A5]">
        <p className="text-sm">baca {"\u{2192}"} gambar {"\u{2192}"} tulis</p>
        <p className="text-3xl">
          {l.a} + {l.b} = <span className="rounded-xl bg-[#FFE566] px-3 text-[#DC2626]">?</span>
        </p>
      </div>
    );
  const ketukSlot = (baris: 0 | 1, i: number) => {
    if (selesai || kanvas) return;
    const daftar = isi[baris];
    const batas = baris === 0 ? l.a : l.b;
    if (daftar.includes(i)) {
      const baru: [number[], number[]] = baris === 0 ? [daftar.filter((x) => x !== i), isi[1]] : [isi[0], daftar.filter((x) => x !== i)];
      setIsi(baru);
      return;
    }
    if (daftar.length >= batas) {
      salah(`Baris ${baris === 0 ? "atas" : "bawah"} cukup ${kata(batas)} titik.`);
      return;
    }
    const baru: [number[], number[]] = baris === 0 ? [[...daftar, i], isi[1]] : [isi[0], [...daftar, i]];
    setIsi(baru);
    if (baru[0].length === l.a && baru[1].length === l.b) {
      setSelesai(true);
      siap(`Gambarnya ${kata(l.a)} titik dan ${kata(l.b)} titik.`);
    }
  };
  const periksa = () => {
    const r = hitungTitikBaris(goresan);
    if (r.coretan === 0 && r.atas === l.a && r.bawah === l.b) {
      setSelesai(true);
      siap(`Betul! ${kapital(kata(l.a))} titik di atas dan ${kata(l.b)} titik di bawah.`);
    } else {
      setGoresan([]);
      salah(r.coretan > 0 ? "Gambar titik kecil saja, satu ketukan satu titik." : r.atas !== l.a ? `Baris atas perlu ${kata(l.a)} titik.` : `Baris bawah perlu ${kata(l.b)} titik.`);
    }
  };
  const gambar = (
    <g>
      <rect x={8} y={20} width={284} height={78} rx={10} fill="#EFF6FF" stroke="#1D4ED8" strokeWidth={2} />
      <rect x={8} y={104} width={284} height={78} rx={10} fill="#FDF2F8" stroke="#BE185D" strokeWidth={2} />
      <text x={14} y={34} fontSize={10} fontWeight={900} fill="#1D4ED8">
        atas: {kata(l.a)}
      </text>
      <text x={14} y={118} fontSize={10} fontWeight={900} fill="#BE185D">
        bawah: {kata(l.b)}
      </text>
      {!kanvas
        ? ([0, 1] as const).map((b) =>
            Array.from({ length: 10 }, (_, i) => {
              const p = slotGambar(b, i);
              const on = isi[b].includes(i);
              return (
                <g key={`${b}-${i}`} {...ketuk(() => ketukSlot(b, i))} aria-label={`kotak ${b === 0 ? "atas" : "bawah"} ${i + 1}${on ? " bertitik" : ""}`}>
                  <rect x={p.x - 12} y={p.y - 14} width={24} height={28} rx={4} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth={1.2} />
                  {on ? <circle cx={p.x} cy={p.y} r={7} fill={b === 0 ? WARNA_A : WARNA_B} /> : null}
                </g>
              );
            }),
          )
        : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Gambar titik">{gambar}</Gambar>;
}

/* ------------------------------ Model batang ------------------------------ */
function Batang({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "batang" }> }) {
  const [sambung, setSambung] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const total = l.a + l.b;
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="mx-auto max-w-sm space-y-1 py-2">
        <div className="rounded-lg border-4 border-[#1C01A5] bg-[#FFE566] py-1 text-center text-2xl font-black text-[#DC2626]">?</div>
        <div className="flex gap-1">
          <div className="rounded-lg border-4 border-[#1C01A5] bg-[#DBEAFE] py-1 text-center text-2xl font-black text-[#1C01A5]" style={{ flex: Math.max(l.a, 1) }}>
            {l.a}
          </div>
          <div className="rounded-lg border-4 border-[#1C01A5] bg-[#FCE7F3] py-1 text-center text-2xl font-black text-[#1C01A5]" style={{ flex: Math.max(l.b, 1) }}>
            {l.b}
          </div>
        </div>
      </div>
    );
  const periksa = () => {
    const letak = [...Array.from({ length: l.a }, (_, i) => selA(i)), ...Array.from({ length: l.b }, (_, i) => selB(l.a, i))];
    const r = periksaCentang(goresan, letak, 11);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap kotak.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak, satu tanda." : r.nyasar > 0 ? "Beri tanda di dalam kotak batang." : "Ada kotak yang belum diberi tanda.");
    }
  };
  const kotak = (p: { x: number; y: number }, warna: string, k: string) => <rect key={k} x={p.x - 12} y={p.y - 12} width={24} height={24} rx={rupa === "benda" ? 4 : 1} fill={warna} stroke="#1C01A5" strokeWidth={1.6} />;
  const gambar = (
    <g>
      <text x={14} y={46} fontSize={10} fontWeight={900} fill="#1D4ED8">
        bilangan pertama
      </text>
      {Array.from({ length: l.a }, (_, i) => kotak(selA(i), "#BFDBFE", `a${i}`))}
      {l.a === 0 ? (
        <text x={40} y={70} fontSize={11} fontWeight={900} fill="#64748B">
          nol
        </text>
      ) : null}
      <text x={14} y={96} fontSize={10} fontWeight={900} fill="#BE185D">
        bilangan kedua
      </text>
      {Array.from({ length: l.b }, (_, i) => kotak(selB(l.a, i), "#FBCFE8", `b${i}`))}
      {sambung ? (
        <g>
          {Array.from({ length: total }, (_, i) => kotak({ x: 40 + i * 24, y: 166 }, "#FDE68A", `u${i}`))}
          <text x={40 + (total * 24) / 2 - 12} y={148} textAnchor="middle" fontSize={14} fontWeight={900} fill="#DC2626">
            semuanya ?
          </text>
        </g>
      ) : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label="Model batang">{gambar}</Gambar>
      {!sambung ? (
        <div className="flex justify-center">
          <button
            type="button"
            className={TOMBOL}
            onClick={() => {
              setSambung(true);
              setSelesai(true);
              siap("Dua batang sudah disambung.");
            }}
          >
            {"\u{1F517}"} Sambung
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Cari dua bilangan dalam cerita, lalu jumlahkan.",
  peraga: "Hitung semua benda di kantong pesanan.",
  gambar: "Hitung semua titik di kedua baris.",
  batang: "Hitung semua kotak di kedua batang.",
};

export function LangkahPesanan({ ls, rupa, benda, nama, bicara, onBenar }: P) {
  const l = ls.langkah;
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
    if (p) {
      setPesan(p);
      bicara(p);
    }
  };
  const jawab = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(`Betul! ${kapital(bacaKalimat([l.a, l.b, m]))}. ${jawabLengkap(l, nama)}`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, benda, nama, kanvas: cara === "kanvas", salah, siap };
  return (
    <div className="space-y-3">
      {l.tipe !== "cerita" && l.tipe !== "kalimat" ? <KartuCerita l={l} nama={nama} /> : null}
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "kalimat" ? <Kalimat {...pk} l={l} /> : l.tipe === "cerita" ? <Cerita {...pk} l={l} /> : l.tipe === "peraga" ? <Peraga {...pk} l={l} /> : l.tipe === "gambar" ? <GambarTitik {...pk} l={l} /> : <Batang {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">Berapa {nama} semuanya?</p>
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
