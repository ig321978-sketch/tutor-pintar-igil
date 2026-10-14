"use client";

import { useEffect, useRef, useState } from "react";
import { bunyiKetukan, siapkanAudioPemanasan } from "@/components/brain-activation/audioPemanasan";

type Sisi = "kiri" | "kanan";

export default function CrossCrawlTap({
  targetRounds,
  tempoBpm,
  onProgress,
  onSelesai,
}: {
  targetRounds: number;
  tempoBpm: number;
  onProgress: (persen: number) => void;
  onSelesai: () => void;
}) {
  const target = Math.max(2, targetRounds) * 2;
  const jedaMs = Math.round(60000 / Math.max(48, tempoBpm));
  const [mulai, setMulai] = useState(false);
  const [giliran, setGiliran] = useState<Sisi>("kiri");
  const [terbuka, setTerbuka] = useState(false);
  const [hitung, setHitung] = useState(0);
  const [goyang, setGoyang] = useState<Sisi | null>(null);
  const selesaiRef = useRef(false);
  const mulaiRef = useRef(false);
  const giliranRef = useRef<Sisi>("kiri");
  const terbukaRef = useRef(false);
  const hitungRef = useRef(0);
  const tungguRef = useRef<number | null>(null);
  const ketukRef = useRef<(sisi: Sisi) => void>(() => {});

  useEffect(() => {
    return () => {
      if (tungguRef.current) window.clearTimeout(tungguRef.current);
    };
  }, []);

  const bukaGiliran = (sisi: Sisi) => {
    giliranRef.current = sisi;
    terbukaRef.current = true;
    setGiliran(sisi);
    setTerbuka(true);
    bunyiKetukan();
  };

  const mulaiIrama = () => {
    if (mulaiRef.current || selesaiRef.current) return;
    mulaiRef.current = true;
    siapkanAudioPemanasan();
    setMulai(true);
    bukaGiliran("kiri");
  };

  const ketuk = (sisi: Sisi) => {
    if (!mulaiRef.current || selesaiRef.current) {
      if (!mulaiRef.current) mulaiIrama();
      return;
    }
    if (!terbukaRef.current) return;
    if (sisi !== giliranRef.current) {
      setGoyang(sisi);
      window.setTimeout(() => setGoyang(null), 350);
      return;
    }
    terbukaRef.current = false;
    setTerbuka(false);
    const berikutnya = hitungRef.current + 1;
    hitungRef.current = berikutnya;
    setHitung(berikutnya);
    onProgress(Math.round((berikutnya / target) * 100));
    if (berikutnya >= target) {
      selesaiRef.current = true;
      onSelesai();
      return;
    }
    const lawan: Sisi = sisi === "kiri" ? "kanan" : "kiri";
    tungguRef.current = window.setTimeout(() => bukaGiliran(lawan), jedaMs);
  };

  ketukRef.current = ketuk;

  useEffect(() => {
    const padaTombol = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      ketukRef.current(event.key === "ArrowLeft" ? "kiri" : "kanan");
    };
    window.addEventListener("keydown", padaTombol);
    return () => window.removeEventListener("keydown", padaTombol);
  }, []);

  const tombol = (sisi: Sisi, ikon: string, nama: string) => {
    const aktif = mulai && terbuka && giliran === sisi;
    return (
      <button
        type="button"
        onClick={() => ketuk(sisi)}
        aria-label={aktif ? `Ketuk rak ${nama} sekarang` : `Rak ${nama}`}
        className={`touch-manipulation min-h-36 rounded-3xl border-4 px-3 py-4 text-center shadow-sm transition sm:min-h-48 ${
          aktif
            ? "animate-pulse border-amber-300 bg-amber-50 ring-4 ring-amber-200"
            : "border-teal-200 bg-white"
        } ${goyang === sisi ? "igil-goyang" : ""}`}
      >
        <span className="block text-5xl" aria-hidden>
          {ikon}
        </span>
        <span className="mt-2 block text-lg font-black text-[#1C01A5]">Rak {nama}</span>
        <span className="mt-1 block text-sm font-bold text-teal-800">
          {aktif ? "Ketuk sekarang!" : mulai ? "Tunggu ketukan" : "Siap"}
        </span>
      </button>
    );
  };

  return (
    <div>
      <p className="mb-3 text-center text-sm font-black text-teal-800">
        {mulai ? `Ketukan ${hitung} dari ${target}` : "Dengarkan ketukan, lalu ketuk rak yang menyala."}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {tombol("kiri", "📚", "kiri")}
        {tombol("kanan", "📖", "kanan")}
      </div>
      {mulai ? null : (
        <button
          type="button"
          onClick={mulaiIrama}
          className="mt-4 w-full rounded-full bg-[#1C01A5] px-5 py-3 text-base font-black text-white"
        >
          Ayo mulai
        </button>
      )}
    </div>
  );
}
