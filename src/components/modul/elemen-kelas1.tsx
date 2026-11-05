"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Nunito } from "next/font/google";
import { IkonMainan } from "./ikon-mainan";
import {
  bangunTitikAngka,
  bangunTitikJumlah,
  coretanMengikutiJejak,
  LEBAR_KANVAS_JUMLAH,
  TINGGI_KANVAS_JUMLAH,
  type Titik,
} from "@/components/titikAngkaKanvas";

export const fontAnak = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const SEBUTAN_ANGKA = [
  "Satu",
  "Dua",
  "Tiga",
  "Empat",
  "Lima",
  "Enam",
  "Tujuh",
  "Delapan",
  "Sembilan",
  "Sepuluh",
];

export function RakBendaNyata({
  jenis,
  terisi,
  kapasitas,
  rapat = false,
}: {
  jenis: string;
  terisi: number;
  kapasitas: number;
  rapat?: boolean;
}) {
  const kolom = rapat ? (kapasitas <= 2 ? kapasitas : 2) : kapasitas <= 3 ? kapasitas : 2;
  return (
    <div
      className={`mx-auto grid w-full ${rapat ? "gap-1" : "gap-2"}`}
      style={{
        gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))`,
        maxWidth: rapat ? (kapasitas === 1 ? 52 : 148) : kapasitas === 1 ? 112 : 280,
      }}
    >
      {Array.from({ length: kapasitas }, (_, i) => (
        <span
          key={i}
          className={`flex items-center justify-center border-2 ${
            rapat ? "h-9 rounded-xl" : "aspect-square rounded-2xl"
          } ${i < terisi ? "border-[#1C01A5] bg-white" : "border-dashed border-[#93C5FD] bg-white"}`}
        >
          {i < terisi ? <IkonMainan jenis={jenis} besar={!rapat} /> : null}
        </span>
      ))}
    </div>
  );
}

export function KepalaConcrete({ judul, onSuara }: { judul: string; onSuara: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">{judul}</h3>
      <button
        type="button"
        onClick={onSuara}
        className="shrink-0 rounded-xl border border-[#3B82F6] bg-white px-3 py-1 text-xs font-black text-[#1E3A8A]"
      >
        🔊 Suara Guru
      </button>
    </div>
  );
}

export function TombolLanjutConcrete({ pictorial, onClick }: { pictorial: boolean; onClick: () => void }) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md"
      >
        {pictorial ? "LANJUTKAN KE PICTORIAL ⬇️" : "LANJUTKAN ⬇️"}
      </button>
    </div>
  );
}

export function TombolJawabanSuara({
  sudah,
  jumlah,
  kata,
  sedang,
  pesan,
  onTekan,
}: {
  sudah: boolean;
  jumlah: number;
  kata: string;
  sedang: boolean;
  pesan: string;
  onTekan: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={sudah ? `${jumlah} ${kata}` : "Jawab dengan suara"}
      onClick={() => {
        if (sudah) return;
        onTekan();
      }}
      className={`flex min-h-16 w-full min-w-0 flex-col items-center justify-center rounded-2xl border-2 bg-white px-2 py-1 ${
        sudah ? "border-solid border-[#1C01A5]" : sedang ? "border-solid border-[#F0AB00]" : "border-dashed border-[#93C5FD]"
      }`}
    >
      {sudah ? (
        <>
          <span className="text-3xl font-black leading-none text-[#1C01A5]">{jumlah}</span>
          <span className="text-sm font-black leading-tight text-[#1C01A5]">{kata}</span>
        </>
      ) : (
        <span className="text-center text-sm font-black leading-tight text-[#1C01A5]">
          {sedang ? (pesan.startsWith("Memeriksa") ? "Memeriksa..." : "Mendengarkan...") : "Jawab dengan suara"}
        </span>
      )}
    </button>
  );
}

export function DottedNumberTracingCanvas({
  digit,
  kata,
  onCompletedTrace,
}: {
  digit: number;
  kata?: string;
  onCompletedTrace?: () => void;
}) {
  const lebar = kata ? LEBAR_KANVAS_JUMLAH : 170;
  const tinggi = kata ? TINGGI_KANVAS_JUMLAH : 150;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const goresanRef = useRef<Titik[][]>([]);
  const jejakRef = useRef<Titik[][]>([]);
  const sedangRef = useRef(false);
  const [lulus, setLulus] = useState(false);
  const [pernahCoba, setPernahCoba] = useState(false);

  const gambarUlang = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#64748B";
    for (const gores of jejakRef.current) {
      for (const titik of gores) {
        ctx.beginPath();
        ctx.arc(titik.x, titik.y, 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const gores of goresanRef.current) {
      if (gores.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(gores[0].x, gores[0].y);
      for (let i = 1; i < gores.length; i++) ctx.lineTo(gores[i].x, gores[i].y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    let batal = false;
    goresanRef.current = [];
    jejakRef.current = [];
    sedangRef.current = false;
    setLulus(false);
    setPernahCoba(false);
    gambarUlang();
    const siapkan = async () => {
      try {
        await document.fonts.load(`900 120px ${fontAnak.style.fontFamily}`);
      } catch {
        /* Huruf cadangan tetap bisa dijadikan titik. */
      }
      if (batal) return;
      jejakRef.current = kata
        ? bangunTitikJumlah(digit, kata, fontAnak.style.fontFamily)
        : bangunTitikAngka(digit, fontAnak.style.fontFamily);
      gambarUlang();
    };
    void siapkan();
    return () => {
      batal = true;
    };
  }, [digit, kata, gambarUlang]);

  const koordinat = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const mulai = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const titik = koordinat(e);
    sedangRef.current = true;
    goresanRef.current.push([titik]);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* Browser menolak tangkapan jika jari sudah lepas. */
    }
    gambarUlang();
  };

  const geser = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!sedangRef.current) return;
    const gores = goresanRef.current[goresanRef.current.length - 1];
    if (!gores) return;
    gores.push(koordinat(e));
    gambarUlang();
  };

  const selesai = () => {
    if (!sedangRef.current) return;
    sedangRef.current = false;
    const adaGoresan = goresanRef.current.some((gores) => gores.length > 1);
    if (!adaGoresan) return;
    setPernahCoba(true);
    const mirip = coretanMengikutiJejak(goresanRef.current, jejakRef.current);
    setLulus(mirip);
    if (mirip && onCompletedTrace) onCompletedTrace();
  };

  const ulangi = () => {
    goresanRef.current = [];
    sedangRef.current = false;
    setLulus(false);
    setPernahCoba(false);
    gambarUlang();
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${kata ? "w-full" : ""}`}>
      <canvas
        ref={canvasRef}
        width={lebar}
        height={tinggi}
        onPointerDown={mulai}
        onPointerMove={geser}
        onPointerUp={selesai}
        onPointerCancel={selesai}
        style={kata ? { aspectRatio: `${lebar} / ${tinggi}` } : undefined}
        className={
          kata
            ? "h-auto w-full max-w-[340px] rounded-2xl border-2 border-[#1C01A5] bg-white cursor-crosshair touch-none shadow-sm"
            : "w-[170px] h-[150px] rounded-2xl border-2 border-[#1C01A5] bg-white cursor-crosshair touch-none shadow-sm"
        }
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={ulangi}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#334155] text-xs font-bold border border-slate-300"
        >
          Ulangi Tulis
        </button>
        <span className="text-xs font-bold text-[#1C01A5]">
          {lulus ? "✅ Bagus!" : pernahCoba ? "Belum mirip" : "Ikuti titik-titik"}
        </span>
      </div>
    </div>
  );
}

