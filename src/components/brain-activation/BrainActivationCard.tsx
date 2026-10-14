"use client";

import { useEffect, useState } from "react";
import CrossCrawlTap from "@/components/brain-activation/CrossCrawlTap";
import KonfetiLokal from "@/components/brain-activation/KonfetiLokal";
import { bunyiBerhasil } from "@/components/brain-activation/audioPemanasan";
import { modulPemanasan, variasiHariIni, type EmosiMaskot, type VariasiKetuk } from "@/data/brainActivationConfig";
import type { BagianIsi } from "@/lib/bagian-modul";

const LATAR: Record<string, string> = {
  "from-emerald-400 to-teal-600": "bg-gradient-to-r from-emerald-400 to-teal-600",
  "from-indigo-500 to-purple-600": "bg-gradient-to-r from-indigo-500 to-purple-600",
  "from-amber-400 to-orange-500": "bg-gradient-to-r from-amber-400 to-orange-500",
  "from-sky-400 to-cyan-600": "bg-gradient-to-r from-sky-400 to-cyan-600",
  "from-violet-500 to-fuchsia-600": "bg-gradient-to-r from-violet-500 to-fuchsia-600",
  "from-rose-400 to-orange-500": "bg-gradient-to-r from-rose-400 to-orange-500",
};

function Maskot({ emosi }: { emosi: EmosiMaskot }) {
  const gerak = emosi === "celebrating" ? "animate-bounce" : emosi === "excited" ? "animate-pulse" : "";
  return (
    <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-amber-100 text-6xl shadow-inner ${gerak}`} aria-hidden>
      🦉
    </div>
  );
}

function MeterFokus({ persen }: { persen: number }) {
  const isi = Math.max(0, Math.min(100, persen));
  const bintang = Math.round(isi / 20);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-xs font-black uppercase tracking-wide text-teal-800">Meter Fokus</p>
      <p className="text-center text-sm font-black text-[#1C01A5]" aria-hidden>
        {"⭐".repeat(bintang)}
        {"☆".repeat(5 - bintang)}
      </p>
      <div
        className="h-3 overflow-hidden rounded-full bg-teal-100 md:hidden"
        role="meter"
        aria-label="Meter Fokus"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isi}
      >
        <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-emerald-500 transition-all duration-300" style={{ width: `${isi}%` }} />
      </div>
      <div className="hidden h-64 items-end overflow-hidden rounded-full bg-teal-100 md:flex" aria-hidden>
        <div className="w-full rounded-full bg-gradient-to-t from-amber-300 to-emerald-500 transition-all duration-300" style={{ height: `${isi}%` }} />
      </div>
      <p className="text-center text-sm font-black text-teal-900">{isi}%</p>
    </div>
  );
}

export default function BrainActivationCard({
  chapterNumber,
  durasi,
  antrian,
  onComplete,
  onSkip,
}: {
  chapterNumber: number;
  durasi: "penuh" | "kilat";
  antrian?: BagianIsi | null;
  onComplete: () => void;
  onSkip?: () => void;
}) {
  const modul = modulPemanasan(chapterNumber);
  const variasi: VariasiKetuk | null = modul?.type === "cross_crawl_tap" ? variasiHariIni(modul) : null;
  const [persen, setPersen] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [sudahBunyi, setSudahBunyi] = useState(false);

  useEffect(() => {
    if (!selesai || sudahBunyi) return;
    setSudahBunyi(true);
    bunyiBerhasil();
  }, [selesai, sudahBunyi]);

  if (!modul || !variasi) return null;

  const emosi: EmosiMaskot = selesai ? "celebrating" : modul.mascotEmotion;
  const latar = LATAR[variasi.themeColor] ?? "bg-gradient-to-r from-emerald-400 to-teal-600";
  const pesan = selesai ? "Fokusmu sudah menyala. Ayo lanjut!" : variasi.instruksi;
  const ketukan = durasi === "kilat" ? variasi.ketukanKilat : variasi.ketukanPenuh;
  const labelLanjut = antrian === "ujian" || durasi === "kilat" ? "Lanjut ke Ujian" : "Lanjut ke Materi";

  return (
    <section className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-[#1C01A5]/15 bg-white shadow-sm">
      <style>{`
        @keyframes igil-goyang {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .igil-goyang { animation: igil-goyang 0.35s ease; }
        @keyframes igil-konfeti {
          0% { transform: translateY(-12px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(280px) rotate(160deg); opacity: 0; }
        }
        .igil-konfeti { animation-name: igil-konfeti; animation-timing-function: ease-in; animation-fill-mode: forwards; }
      `}</style>
      {selesai ? <KonfetiLokal /> : null}
      <header className={`flex items-start justify-between gap-3 px-4 py-4 text-white ${latar}`}>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em]">Pemanasan otak · {variasi.judul}</p>
          <h2 className="mt-1 text-xl font-black leading-tight sm:text-2xl">{modul.title}</h2>
          <p className="mt-1 text-sm font-bold text-white/90">
            {durasi === "kilat" ? "Pemanasan kilat, sekitar 20–30 detik" : "Sekitar setengah menit"}
          </p>
        </div>
        {onSkip ? (
          <button
            type="button"
            onClick={onSkip}
            className="shrink-0 rounded-full border border-white/70 bg-white/15 px-3 py-2 text-sm font-black text-white"
          >
            Lewati
          </button>
        ) : null}
      </header>
      <div className="grid gap-4 p-4 md:grid-cols-[13rem_minmax(0,1fr)_6.5rem] md:items-start">
        <aside className="flex items-center gap-3 md:flex-col md:items-stretch">
          <Maskot emosi={emosi} />
          <p className="rounded-2xl bg-amber-50 px-3 py-3 text-sm font-bold leading-relaxed text-amber-950" aria-live="polite">
            {pesan}
          </p>
        </aside>
        <div>
          {modul.type === "cross_crawl_tap" ? (
            <CrossCrawlTap
              targetKetukan={ketukan}
              tempoBpm={variasi.tempoBpm}
              ikonKiri={variasi.ikonKiri}
              ikonKanan={variasi.ikonKanan}
              namaKiri={variasi.namaKiri}
              namaKanan={variasi.namaKanan}
              onProgress={setPersen}
              onSelesai={() => setSelesai(true)}
            />
          ) : (
            <p className="text-sm font-bold text-slate-600">Pemanasan ini belum dipasang di bab ini.</p>
          )}
        </div>
        <MeterFokus persen={persen} />
      </div>
      <div className="px-4 pb-4">
        <button
          type="button"
          disabled={!selesai}
          onClick={onComplete}
          className={`w-full rounded-full px-5 py-3 text-base font-black ${
            selesai ? "animate-pulse bg-emerald-500 text-white" : "cursor-not-allowed bg-slate-200 text-slate-400"
          }`}
        >
          {labelLanjut}
        </button>
        {antrian ? (
          <p className="mt-2 text-center text-sm font-bold text-[#1C01A5]">
            {antrian === "ujian" ? "Ujian terbuka setelah pemanasan ini." : "Bagian yang kamu pilih terbuka setelah pemanasan ini."}
          </p>
        ) : null}
      </div>
    </section>
  );
}
