"use client";

import { useMemo, useRef, useState } from "react";
import { buatAcak } from "@/lib/modul-kedua/acak";
import { eja } from "@/lib/modul-kedua/eja";
import type { CatatanButir, DataModul } from "@/lib/modul-kedua/tipe";
import type { HasilLatihan } from "./LatihanTahap";
import TombolSuara from "./TombolSuara";
import { KotakSepuluh } from "./VisualSoal";
import { suaraNyala, ucapkan } from "./suara";

/**
 * Tahap S (Simulasi): manipulatif virtual (keranjang bola + garis bilangan + kotak sepuluh yang saling terhubung).
 * Alur: eksplorasi bebas -> tantangan terpandu -> refleksi.
 */

function Manipulatif({ n, ubah, mode }: { n: number; ubah: (v: number, ucap?: boolean) => void; mode: "bola" | "garis" | "keduanya" }) {
  const [ketuk, setKetuk] = useState(0);
  return (
    <div className="space-y-3">
      {mode !== "garis" ? (
        <div className="rounded-3xl border-4 border-sky-300 bg-sky-50 p-3">
          <div className="flex min-h-24 flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-amber-500 bg-amber-50 p-2">
            {n === 0 ? <span className="text-base font-bold text-amber-800">🧺 Keranjang kosong</span> : null}
            {Array.from({ length: n }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`bola ${i + 1}`}
                onClick={() => {
                  setKetuk(i + 1);
                  if (suaraNyala()) ucapkan(eja(i + 1));
                }}
                className={`relative h-12 w-12 rounded-full text-3xl ${i < ketuk ? "bg-emerald-200" : "bg-white"} shadow`}
              >
                ⚽
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <button type="button" onClick={() => { setKetuk(0); ubah(Math.max(0, n - 1), true); }} className="min-h-14 rounded-2xl border-4 border-rose-500 bg-rose-100 text-2xl font-black text-rose-900">➖</button>
            <button type="button" onClick={() => { setKetuk(0); ubah(0); }} className="min-h-14 rounded-2xl border-4 border-slate-400 bg-slate-100 text-base font-black text-slate-800">Kosongkan</button>
            <button type="button" onClick={() => { setKetuk(0); ubah(Math.min(10, n + 1), true); }} className="min-h-14 rounded-2xl border-4 border-emerald-600 bg-emerald-100 text-2xl font-black text-emerald-900">➕</button>
          </div>
          <p className="mt-1 text-center text-sm font-bold text-sky-900">Ketuk bola untuk menghitung. Bola yang sudah dihitung berwarna hijau.</p>
        </div>
      ) : null}

      <div className="rounded-3xl border-4 border-indigo-300 bg-white p-3">
        <p className="mb-1 text-center text-sm font-black text-indigo-900">Garis bilangan: ketuk sebuah angka</p>
        <div className="grid grid-cols-11 gap-1">
          {Array.from({ length: 11 }, (_, v) => (
            <div key={v} className="flex flex-col items-center">
              <span className={`text-lg leading-none ${v === n ? "" : "invisible"}`}>🦉</span>
              <button
                type="button"
                onClick={() => ubah(v, true)}
                aria-label={`bilangan ${v}`}
                className={`min-h-11 w-full rounded-lg border-2 text-base font-black ${v === n ? "border-amber-600 bg-amber-300 text-indigo-950" : "border-indigo-300 bg-indigo-50 text-indigo-900"}`}
              >
                {v}
              </button>
            </div>
          ))}
        </div>
      </div>

      {mode === "keduanya" ? (
        <div className="rounded-3xl border-4 border-orange-300 bg-orange-50 p-3 text-center">
          <p className="text-7xl font-black leading-none text-indigo-950">{n}</p>
          <p className="text-2xl font-black text-orange-800">{eja(n)}</p>
          <KotakSepuluh jumlah={n} />
        </div>
      ) : null}
    </div>
  );
}

export default function TahapSimulasi({ data, benih, saatSelesai }: { data: DataModul; benih: number; saatSelesai: (h: HasilLatihan) => void }) {
  const { eksplorasi, tantangan, refleksi } = data.simulasi;
  const [fase, setFase] = useState<"eksplorasi" | "tantangan" | "refleksi">("eksplorasi");
  const [n, setN] = useState(3);
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
  const awalC = (idx: number) => (tantangan[idx].max === 0 ? 4 : 0);
  const isi = (s: string) => s.replace(/\{n\}/g, String(target));

  function ubah(v: number, ucap?: boolean) {
    setN(v);
    setGerak((g) => g + 1);
    if (ucap && suaraNyala()) ucapkan(eja(v));
  }

  function periksa() {
    const p = percobaan + 1;
    setPercobaan(p);
    if (n === target) {
      butir.current.push({
        idSoal: `sim-${t.id}`,
        gen: `sim-${t.jenis}`,
        level: c < 2 ? "Dasar" : "Mahir",
        kognitif: c < 2 ? "knowing" : "applying",
        elemen: t.jenis === "buat-jumlah" ? "membilang" : "mengurutkan",
        benar: true,
        percobaan: Math.min(p, 3),
        petunjuk: 0,
        detik: Math.round((performance.now() - mulaiC.current) / 1000),
      });
      setUmpan({ benar: true, teks: `Betul! ${isi(t.mengapa)}` });
      setSelesaiC(true);
    } else if (p >= 3) {
      butir.current.push({
        idSoal: `sim-${t.id}`, gen: `sim-${t.jenis}`, level: c < 2 ? "Dasar" : "Mahir", kognitif: c < 2 ? "knowing" : "applying",
        elemen: t.jenis === "buat-jumlah" ? "membilang" : "mengurutkan", benar: false, percobaan: 3, petunjuk: 0,
        detik: Math.round((performance.now() - mulaiC.current) / 1000),
      });
      setUmpan({ benar: false, teks: `Yang diminta ${target}. ${isi(t.mengapa)}` });
      setSelesaiC(true);
    } else {
      setUmpan({
        benar: false,
        teks: n < target ? `Sekarang ${n}. Kamu perlu ${target}, jadi masih kurang ${target - n}. Tambah lagi.` : `Sekarang ${n}. Kamu perlu ${target}, jadi lebih ${n - target}. Kurangi.`,
      });
    }
  }

  function lanjutC() {
    if (c + 1 < tantangan.length) {
      setC(c + 1);
      setN(awalC(c + 1));
      setPercobaan(0);
      setUmpan(null);
      setSelesaiC(false);
      mulaiC.current = performance.now();
    } else setFase("refleksi");
  }

  if (fase === "eksplorasi") {
    return (
      <section className="space-y-3">
        <h2 className="text-2xl font-black text-indigo-950">S: Simulasi 🎮 Bermain Bebas</h2>
        <p className="text-base font-bold text-indigo-900">{eksplorasi}</p>
        <TombolSuara teks={eksplorasi} />
        <Manipulatif n={n} ubah={ubah} mode="keduanya" />
        <button
          type="button"
          disabled={gerak < 4}
          onClick={() => {
            setFase("tantangan");
            setN(awalC(0));
            mulaiC.current = performance.now();
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
        <Manipulatif key={c} n={n} ubah={ubah} mode={t.jenis === "buat-jumlah" ? "bola" : "garis"} />
        {umpan ? (
          <p role="status" className={`rounded-2xl border-4 p-3 text-base font-bold ${umpan.benar ? "border-emerald-500 bg-emerald-50 text-emerald-950" : "border-rose-400 bg-rose-50 text-rose-900"}`}>
            {umpan.teks}
          </p>
        ) : null}
        {selesaiC ? (
          <button type="button" onClick={lanjutC} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
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
