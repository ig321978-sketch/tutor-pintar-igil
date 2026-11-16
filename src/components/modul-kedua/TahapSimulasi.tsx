"use client";

import { useMemo, useRef, useState } from "react";
import { buatAcak } from "@/lib/modul-kedua/acak";
import { eja } from "@/lib/modul-kedua/eja";
import type { CatatanButir, DataModul } from "@/lib/modul-kedua/tipe";
import type { HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";
import { suaraNyala, ucapkan } from "./suara";

/**
 * Tahap S (Simulasi): Laboratorium Bilangan 0 sampai 10 dengan benda (bola) di dalam keranjang.
 * Alur: eksplorasi bebas -> tantangan terpandu -> refleksi. Sub-Bab A hanya memakai alat benda.
 */

const kini = () => performance.now();

function Manipulatif({
  n,
  ketuk,
  mode,
  saatTambah,
  saatKurang,
  saatKosong,
  saatKetuk,
}: {
  n: number;
  ketuk: number;
  mode: "bola" | "tetap";
  saatTambah: () => void;
  saatKurang: () => void;
  saatKosong: () => void;
  saatKetuk: (i: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-3xl border-4 border-sky-300 bg-sky-50 p-3">
        <div className="flex min-h-28 flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-amber-500 bg-amber-50 p-2">
          {n === 0 ? <span className="text-lg font-bold text-amber-800">🧺 Keranjang kosong</span> : null}
          {Array.from({ length: n }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`bola ${i + 1}`}
              onClick={() => saatKetuk(i + 1)}
              className={`relative h-12 w-12 rounded-full text-3xl shadow ${i < ketuk ? "bg-emerald-200" : "bg-white"}`}
            >
              ⚽
              {i < ketuk ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white">{i + 1}</span>
              ) : null}
            </button>
          ))}
        </div>
        {mode === "bola" ? (
          <div className="mt-2 grid grid-cols-3 gap-2">
            <button type="button" aria-label="Kurangi satu bola" onClick={saatKurang} className="min-h-14 rounded-2xl border-4 border-rose-500 bg-rose-100 text-2xl font-black text-rose-900">➖</button>
            <button type="button" onClick={saatKosong} className="min-h-14 rounded-2xl border-4 border-slate-400 bg-slate-100 text-base font-black text-slate-800">Kosongkan</button>
            <button type="button" aria-label="Tambah satu bola" onClick={saatTambah} className="min-h-14 rounded-2xl border-4 border-emerald-600 bg-emerald-100 text-2xl font-black text-emerald-900">➕</button>
          </div>
        ) : null}
        <p className="mt-1 text-center text-sm font-bold text-sky-900">Ketuk bola untuk menghitung. Bola yang sudah dihitung berwarna hijau.</p>
      </div>
      <div className="rounded-3xl border-4 border-orange-300 bg-orange-50 p-3 text-center">
        <p className="text-7xl font-black leading-none text-indigo-950">{ketuk > 0 && mode === "tetap" ? ketuk : n}</p>
        <p className="text-2xl font-black text-orange-800">{eja(ketuk > 0 && mode === "tetap" ? ketuk : n)}</p>
      </div>
    </div>
  );
}

export default function TahapSimulasi({ data, benih, saatSelesai }: { data: DataModul; benih: number; saatSelesai: (h: HasilLatihan) => void }) {
  const { eksplorasi, tantangan, refleksi } = data.simulasi;
  const [fase, setFase] = useState<"eksplorasi" | "tantangan" | "refleksi">("eksplorasi");
  const [n, setN] = useState(3);
  const [ketuk, setKetuk] = useState(0);
  const [gerak, setGerak] = useState(0);
  const [c, setC] = useState(0);
  const [percobaan, setPercobaan] = useState(0);
  const [umpan, setUmpan] = useState<{ benar: boolean; teks: string } | null>(null);
  const [selesaiC, setSelesaiC] = useState(false);
  const [salahRef, setSalahRef] = useState<number[]>([]);
  const [benarRef, setBenarRef] = useState(false);
  const butir = useRef<CatatanButir[]>([]);
  const mulaiC = useRef(0);

  const sasaran = useMemo(() => {
    const r = buatAcak(benih);
    return tantangan.map((t) => r.int(t.min, t.max));
  }, [benih, tantangan]);
  const urutRef = useMemo(() => buatAcak(benih + 1).kocok(refleksi.pilihan.map((_, i) => i)), [benih, refleksi.pilihan]);

  const t = tantangan[c];
  const target = sasaran[c];
  const awalC = (idx: number) => (tantangan[idx].jenis === "ketuk-ke" ? 10 : tantangan[idx].max === 0 ? 4 : 0);
  const isi = (s: string) => s.replace(/\{n\}/g, String(target));

  const ucap = (v: number) => {
    if (suaraNyala()) ucapkan(eja(v));
  };
  const tambah = () => {
    const v = Math.min(10, n + 1);
    setN(v);
    setKetuk(0);
    setGerak((g) => g + 1);
    ucap(v);
  };
  const kurang = () => {
    const v = Math.max(0, n - 1);
    setN(v);
    setKetuk(0);
    setGerak((g) => g + 1);
    ucap(v);
  };
  const kosongkan = () => {
    setN(0);
    setKetuk(0);
    setGerak((g) => g + 1);
  };
  const ketukBola = (i: number) => {
    setKetuk(i);
    setGerak((g) => g + 1);
    ucap(i);
  };

  function catat(benar: boolean, p: number) {
    butir.current.push({
      idSoal: `sim-${t.id}`,
      gen: `sim-${t.jenis}`,
      level: c < 2 ? "Dasar" : "Mahir",
      kognitif: c < 2 ? "knowing" : "applying",
      elemen: "membilang",
      benar,
      percobaan: Math.min(p, 3),
      petunjuk: 0,
      detik: Math.round((kini() - mulaiC.current) / 1000),
    });
  }

  function periksa() {
    const p = percobaan + 1;
    setPercobaan(p);
    const nilai = t.jenis === "ketuk-ke" ? ketuk : n;
    if (nilai === target) {
      catat(true, p);
      setUmpan({ benar: true, teks: `Betul! ${isi(t.mengapa)}` });
      setSelesaiC(true);
    } else if (p >= 3) {
      catat(false, p);
      setUmpan({ benar: false, teks: `Yang diminta ${target}. ${isi(t.mengapa)}` });
      setSelesaiC(true);
    } else if (t.jenis === "ketuk-ke") {
      setUmpan({ benar: false, teks: `Kamu menghitung sampai ${ketuk}. Ketuk bola satu per satu dari awal sampai bilangan ${target}.` });
    } else {
      setUmpan({
        benar: false,
        teks: n < target ? `Sekarang ${n}. Kamu perlu ${target}, jadi masih kurang ${target - n}. Tambah lagi.` : `Sekarang ${n}. Kamu perlu ${target}, jadi lebih ${n - target}. Kurangi.`,
      });
    }
  }

  function mulaiTantangan(idx: number) {
    setC(idx);
    setN(awalC(idx));
    setKetuk(0);
    setPercobaan(0);
    setUmpan(null);
    setSelesaiC(false);
    mulaiC.current = kini();
  }

  if (fase === "eksplorasi") {
    return (
      <section className="space-y-3">
        <h2 className="text-2xl font-black text-indigo-950">S: Simulasi 🎮 Bermain Bebas</h2>
        <p className="text-base font-bold text-indigo-900">{eksplorasi}</p>
        <TombolSuara teks={eksplorasi} />
        <Manipulatif n={n} ketuk={ketuk} mode="bola" saatTambah={tambah} saatKurang={kurang} saatKosong={kosongkan} saatKetuk={ketukBola} />
        <button
          type="button"
          disabled={gerak < 4}
          onClick={() => {
            setFase("tantangan");
            mulaiTantangan(0);
          }}
          className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white disabled:opacity-40"
        >
          {gerak < 4 ? "Coba ketuk beberapa kali dulu" : "Mulai tantangan ➜"}
        </button>
      </section>
    );
  }

  if (fase === "tantangan") {
    return (
      <section className="space-y-3">
        <h2 className="text-2xl font-black text-indigo-950">
          Tantangan {c + 1} dari {tantangan.length}
        </h2>
        <div className="rounded-3xl border-4 border-amber-400 bg-white p-3">
          <p className="text-lg font-black text-indigo-950">{isi(t.instruksi)}</p>
          <TombolSuara teks={isi(t.instruksi)} label="Dengarkan" kecil />
        </div>
        <Manipulatif
          key={c}
          n={n}
          ketuk={ketuk}
          mode={t.jenis === "ketuk-ke" ? "tetap" : "bola"}
          saatTambah={tambah}
          saatKurang={kurang}
          saatKosong={kosongkan}
          saatKetuk={ketukBola}
        />
        {umpan ? (
          <p role="status" className={`rounded-2xl border-4 p-3 text-base font-bold ${umpan.benar ? "border-emerald-500 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-900"}`}>
            {umpan.teks}
          </p>
        ) : null}
        {selesaiC ? (
          <button
            type="button"
            onClick={() => (c + 1 < tantangan.length ? mulaiTantangan(c + 1) : setFase("refleksi"))}
            className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white"
          >
            {c + 1 < tantangan.length ? "Tantangan berikutnya ➜" : "Lanjut ➜"}
          </button>
        ) : (
          <button type="button" onClick={periksa} className="min-h-16 w-full rounded-2xl border-4 border-emerald-700 bg-emerald-500 text-xl font-black text-white">
            Periksa
          </button>
        )}
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-black text-indigo-950">Refleksi 💭</h2>
      <p className="text-lg font-bold text-indigo-900">{refleksi.tanya}</p>
      <div className="space-y-2">
        {urutRef.map((i) => (
          <button
            key={i}
            type="button"
            disabled={benarRef || salahRef.includes(i)}
            onClick={() => (i === refleksi.benar ? setBenarRef(true) : setSalahRef((s) => [...s, i]))}
            className={`min-h-16 w-full rounded-2xl border-4 px-3 py-2 text-left text-lg font-black ${
              benarRef && i === refleksi.benar ? "border-emerald-700 bg-emerald-200 text-emerald-950" : salahRef.includes(i) ? "border-rose-400 bg-rose-100 text-rose-400 line-through" : "border-indigo-900 bg-white text-indigo-950"
            }`}
          >
            {refleksi.pilihan[i]}
          </button>
        ))}
      </div>
      {salahRef.length > 0 && !benarRef ? <p className="rounded-2xl bg-rose-50 p-3 text-base font-bold text-rose-900">Pikirkan lagi apa yang tadi terjadi di keranjang, ya.</p> : null}
      {benarRef ? (
        <div className="space-y-2">
          <p className="rounded-2xl border-4 border-emerald-500 bg-emerald-50 p-3 text-base font-bold text-emerald-950">{refleksi.umpanBalik}</p>
          <button
            type="button"
            onClick={() => saatSelesai({ butir: butir.current, detik: butir.current.reduce((a, b) => a + b.detik, 0) })}
            className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white"
          >
            Selesai simulasi ➜
          </button>
        </div>
      ) : null}
    </section>
  );
}
