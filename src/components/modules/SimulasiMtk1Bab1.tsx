"use client";

import { useCallback, useEffect, useState } from "react";
import { ucapkanGuruIgil } from "@/lib/suara-guru-igil";

const DATA_BILANGAN: Record<number, { kata: string; jari: string; warna: string }> = {
  0: { kata: "Nol (Kosong)", jari: "✊", warna: "text-slate-400" },
  1: { kata: "Satu", jari: "☝️", warna: "text-red-500" },
  2: { kata: "Dua", jari: "✌️", warna: "text-orange-500" },
  3: { kata: "Tiga", jari: "🤟", warna: "text-amber-500" },
  4: { kata: "Empat", jari: "🖖", warna: "text-yellow-600" },
  5: { kata: "Lima", jari: "🖐️", warna: "text-lime-600" },
  6: { kata: "Enam", jari: "🖐️☝️", warna: "text-green-600" },
  7: { kata: "Tujuh", jari: "🖐️✌️", warna: "text-emerald-600" },
  8: { kata: "Delapan", jari: "🖐️🤟", warna: "text-teal-600" },
  9: { kata: "Sembilan", jari: "🖐️🖖", warna: "text-cyan-600" },
  10: { kata: "Sepuluh", jari: "🖐️🖐️", warna: "text-blue-600" },
};

type ModeSimulasi = "explore" | "compare" | "challenge";
type Benda = "🍎" | "🍊" | "⭐";

export default function SimulasiMtk1Bab1({ onBenar }: { onBenar?: () => void }) {
  const [mode, setMode] = useState<ModeSimulasi>("explore");
  const [suaraAktif, setSuaraAktif] = useState(true);
  const [jumlah, setJumlah] = useState(3);
  const [benda, setBenda] = useState<Benda>("🍎");
  const [kiri, setKiri] = useState(4);
  const [kanan, setKanan] = useState(2);
  const [target, setTarget] = useState(5);
  const [jawaban, setJawaban] = useState(0);
  const [bintang, setBintang] = useState(0);
  const [umpan, setUmpan] = useState<"idle" | "correct" | "wrong">("idle");

  const ucapkan = useCallback(
    (teks: string) => {
      if (!suaraAktif) return;
      void ucapkanGuruIgil(teks, { kelas: "1 SD" });
    },
    [suaraAktif],
  );

  const soalBaru = useCallback(() => {
    const berikutnya = Math.floor(Math.random() * 10) + 1;
    setTarget(berikutnya);
    setJawaban(0);
    setUmpan("idle");
    ucapkan(`Ayo masukkan ${DATA_BILANGAN[berikutnya].kata} buah ke dalam kotak!`);
  }, [ucapkan]);

  useEffect(() => {
    if (mode === "challenge") soalBaru();
  }, [mode, soalBaru]);

  const ubahJumlah = (nilai: number) => {
    if (nilai < 0 || nilai > 10) return;
    setJumlah(nilai);
    ucapkan(DATA_BILANGAN[nilai].kata);
  };

  const periksaTantangan = () => {
    if (jawaban === target) {
      setUmpan("correct");
      setBintang((lama) => lama + 1);
      ucapkan(`Hebat sekali! Itu benar ${DATA_BILANGAN[target].kata}.`);
      onBenar?.();
      return;
    }
    setUmpan("wrong");
    ucapkan(
      `Belum tepat. Sekarang ada ${DATA_BILANGAN[jawaban].kata}, kita butuh ${DATA_BILANGAN[target].kata}. Ayo coba lagi!`,
    );
  };

  const kemiringan = kiri === kanan ? 0 : kiri > kanan ? -8 : 8;
  const hubungan =
    kiri > kanan ? "LEBIH BANYAK DARI" : kiri < kanan ? "LEBIH SEDIKIT DARI" : "SAMA BANYAK DENGAN";

  return (
    <div className="w-full overflow-hidden rounded-3xl border-4 border-sky-200 bg-white font-sans select-none shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white">
        <div>
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
            Matematika Kelas 1 SD • Bab 1
          </span>
          <h2 className="mt-1 text-xl font-extrabold">Lab Simulasi: Ayo Membilang 1–10</h2>
        </div>
        <button
          type="button"
          onClick={() => setSuaraAktif((aktif) => !aktif)}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-bold transition ${
            suaraAktif ? "bg-amber-400 text-slate-900 shadow-sm" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-sky-100 bg-sky-50 p-2">
        {(
          [
            ["explore", "1. Eksplorasi"],
            ["compare", "2. Bandingkan"],
            ["challenge", "3. Tantangan"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={`rounded-2xl px-3 py-2.5 text-sm font-bold transition sm:text-base ${
              mode === id
                ? "border-2 border-sky-300 bg-white text-sky-700 shadow-md"
                : "text-slate-600 hover:bg-white/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-b from-white to-sky-50/40 p-5 sm:p-6">
        {mode === "explore" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <button
                type="button"
                onClick={() => ucapkan(DATA_BILANGAN[jumlah].kata)}
                className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3"
              >
                <p className="text-xs font-bold uppercase text-amber-700">Lambang</p>
                <p className={`mt-1 text-5xl font-black sm:text-6xl ${DATA_BILANGAN[jumlah].warna}`}>{jumlah}</p>
              </button>
              <button
                type="button"
                onClick={() => ucapkan(DATA_BILANGAN[jumlah].kata)}
                className="flex flex-col justify-center rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3"
              >
                <p className="text-xs font-bold uppercase text-emerald-700">Nama Bilangan</p>
                <p className="mt-1 text-xl font-extrabold text-emerald-900 sm:text-2xl">{DATA_BILANGAN[jumlah].kata}</p>
                <span className="mt-1 text-[11px] text-emerald-600">Ketuk untuk dengar</span>
              </button>
              <div className="flex flex-col justify-center rounded-2xl border-2 border-purple-200 bg-purple-50 p-3">
                <p className="text-xs font-bold uppercase text-purple-700">Jari Tangan</p>
                <p className="mt-1 text-3xl tracking-tighter sm:text-4xl">{DATA_BILANGAN[jumlah].jari}</p>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Bingkai 10. Ketuk kotak untuk tambah atau kurangi benda.
                </span>
                <div className="flex gap-1.5">
                  {(["🍎", "🍊", "⭐"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setBenda(item)}
                      className={`rounded-xl border p-1.5 text-xl ${
                        benda === item ? "scale-110 border-sky-400 bg-white shadow-sm" : "border-transparent opacity-60"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                {Array.from({ length: 10 }).map((_, indeks) => {
                  const terisi = indeks < jumlah;
                  return (
                    <button
                      key={indeks}
                      type="button"
                      onClick={() => ubahJumlah(terisi ? indeks : indeks + 1)}
                      className={`flex aspect-square flex-col items-center justify-center rounded-2xl border-2 transition ${
                        terisi
                          ? "border-sky-400 bg-white shadow-md"
                          : "border-dashed border-slate-300 bg-slate-100/70 hover:border-sky-300"
                      }`}
                    >
                      <span className={`text-3xl transition sm:text-4xl ${terisi ? "scale-100" : "scale-0"}`}>{benda}</span>
                      <span className="mt-1 text-xs font-bold text-slate-400">{indeks + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => ubahJumlah(jumlah - 1)}
                disabled={jumlah === 0}
                className="rounded-2xl border-2 border-rose-300 bg-rose-100 px-6 py-3 text-lg font-extrabold text-rose-700 disabled:opacity-40"
              >
                Kurangi
              </button>
              <button
                type="button"
                onClick={() => ubahJumlah(0)}
                className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200"
              >
                Kosongkan
              </button>
              <button
                type="button"
                onClick={() => ubahJumlah(jumlah + 1)}
                disabled={jumlah === 10}
                className="rounded-2xl bg-emerald-500 px-6 py-3 text-lg font-extrabold text-white shadow-md hover:bg-emerald-600 disabled:opacity-40"
              >
                Tambah {benda}
              </button>
            </div>
          </div>
        ) : null}

        {mode === "compare" ? (
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
              <p className="text-xs font-bold uppercase text-indigo-600">Hasil Perbandingan</p>
              <p className="mt-1 text-xl font-black text-indigo-950 sm:text-2xl">
                {kiri} Apel <span className="underline decoration-amber-500 decoration-4">{hubungan}</span> {kanan} Jeruk
              </p>
            </div>
            <div className="px-2 py-6">
              <div
                style={{ transform: `rotate(${kemiringan}deg)` }}
                className="grid grid-cols-2 gap-6 border-b-8 border-slate-700 px-4 pb-3 transition-transform duration-500 ease-out"
              >
                <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center">
                  <p className="text-lg font-extrabold text-rose-700">Keranjang A: {kiri} apel</p>
                  <div className="my-2 grid min-h-[68px] grid-cols-5 items-center justify-items-center gap-1 rounded-xl border border-rose-100 bg-white p-2">
                    {Array.from({ length: kiri }).map((_, indeks) => (
                      <span key={indeks} className="text-2xl">🍎</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
                  <p className="text-lg font-extrabold text-amber-700">Keranjang B: {kanan} jeruk</p>
                  <div className="my-2 grid min-h-[68px] grid-cols-5 items-center justify-items-center gap-1 rounded-xl border border-amber-100 bg-white p-2">
                    {Array.from({ length: kanan }).map((_, indeks) => (
                      <span key={indeks} className="text-2xl">🍊</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mx-auto h-0 w-0 border-r-[28px] border-b-[36px] border-l-[28px] border-r-transparent border-b-slate-700 border-l-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-rose-50 p-3">
                <button type="button" onClick={() => setKiri((nilai) => Math.max(0, nilai - 1))} className="h-10 w-10 rounded-xl bg-white font-black text-rose-600 shadow">-</button>
                <span className="px-2 font-bold text-rose-900">Apel</span>
                <button type="button" onClick={() => setKiri((nilai) => Math.min(10, nilai + 1))} className="h-10 w-10 rounded-xl bg-rose-500 font-black text-white shadow">+</button>
              </div>
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-amber-50 p-3">
                <button type="button" onClick={() => setKanan((nilai) => Math.max(0, nilai - 1))} className="h-10 w-10 rounded-xl bg-white font-black text-amber-600 shadow">-</button>
                <span className="px-2 font-bold text-amber-900">Jeruk</span>
                <button type="button" onClick={() => setKanan((nilai) => Math.min(10, nilai + 1))} className="h-10 w-10 rounded-xl bg-amber-500 font-black text-white shadow">+</button>
              </div>
            </div>
          </div>
        ) : null}

        {mode === "challenge" ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3">
              <div>
                <span className="text-xs font-bold uppercase text-amber-700">Misi Tantangan</span>
                <p className="text-lg font-black text-slate-800 sm:text-xl">
                  Masukkan <span className="text-2xl text-rose-600 underline">{target} ({DATA_BILANGAN[target].kata})</span> apel ke kotak!
                </p>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-amber-700">Bintang Belajar</span>
                <span className="text-xl font-black text-amber-600">{bintang} bintang</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2.5 rounded-3xl border-2 border-slate-200 bg-slate-50 p-4">
              {Array.from({ length: 10 }).map((_, indeks) => {
                const aktif = indeks < jawaban;
                return (
                  <button
                    key={indeks}
                    type="button"
                    onClick={() => {
                      setUmpan("idle");
                      setJawaban(aktif ? indeks : indeks + 1);
                    }}
                    className={`flex aspect-square items-center justify-center rounded-2xl border-2 text-3xl transition ${
                      aktif ? "border-emerald-400 bg-white shadow-sm" : "border-dashed border-slate-300 bg-slate-100"
                    }`}
                  >
                    {aktif ? "🍎" : ""}
                  </button>
                );
              })}
            </div>
            {umpan !== "idle" ? (
              <div
                className={`rounded-2xl border p-3 text-center font-bold ${
                  umpan === "correct"
                    ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                    : "border-rose-300 bg-rose-100 text-rose-800"
                }`}
              >
                {umpan === "correct"
                  ? "Hebat! Jawabanmu tepat sekali!"
                  : `Sekarang ada ${jawaban} apel. Ayo sesuaikan supaya jadi ${target}!`}
              </div>
            ) : null}
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={periksaTantangan}
                className="rounded-2xl bg-sky-600 px-6 py-3 font-extrabold text-white shadow-md hover:bg-sky-700"
              >
                Periksa Jawaban
              </button>
              <button
                type="button"
                onClick={soalBaru}
                className="rounded-2xl bg-slate-200 px-5 py-3 font-bold text-slate-700 hover:bg-slate-300"
              >
                Soal Baru
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
