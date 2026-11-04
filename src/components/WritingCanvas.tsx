"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { kelasTombolUtama } from "@/lib/tema";

type WritingCanvasProps = {
  onSubmit: (data: string) => void | Promise<void>;
  disabled?: boolean;
  hanyaKanvas?: boolean;
};

export default function WritingCanvas({
  onSubmit,
  disabled = false,
}: WritingCanvasProps) {
  const [adaCoretan, setAdaCoretan] = useState(false);
  const [pesan, setPesan] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sedangGambar = useRef(false);
  const titikTerakhir = useRef<{ x: number; y: number } | null>(null);

  const siapkanKanvas = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = Math.max(induk.clientWidth, 240);
    const tinggi = Math.max(220, Math.round(lebar * 0.42));
    const dpr = window.devicePixelRatio || 1;
    kanvas.width = Math.floor(lebar * dpr);
    kanvas.height = Math.floor(tinggi * dpr);
    kanvas.style.width = `${lebar}px`;
    kanvas.style.height = `${tinggi}px`;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3.2;
    ctx.strokeStyle = "#1C01A5";
    ctx.fillStyle = "#FFFDF6";
    ctx.fillRect(0, 0, lebar, tinggi);
    setAdaCoretan(false);
  }, []);

  useEffect(() => {
    siapkanKanvas();
    const induk = canvasRef.current?.parentElement;
    if (!induk || typeof ResizeObserver === "undefined") return;
    const pengamat = new ResizeObserver(() => siapkanKanvas());
    pengamat.observe(induk);
    return () => pengamat.disconnect();
  }, [siapkanKanvas]);

  const titikDariPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return {
      x: event.clientX - kotak.left,
      y: event.clientY - kotak.top,
    };
  };

  const mulaiGambar = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled || mengirim) return;
    event.preventDefault();
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    kanvas.setPointerCapture(event.pointerId);
    sedangGambar.current = true;
    titikTerakhir.current = titikDariPointer(event);
    ctx.beginPath();
    ctx.moveTo(titikTerakhir.current.x, titikTerakhir.current.y);
  };

  const geserGambar = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!sedangGambar.current || disabled) return;
    event.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    const sekarang = titikDariPointer(event);
    if (!ctx || !titikTerakhir.current) return;
    ctx.beginPath();
    ctx.moveTo(titikTerakhir.current.x, titikTerakhir.current.y);
    ctx.lineTo(sekarang.x, sekarang.y);
    ctx.stroke();
    titikTerakhir.current = sekarang;
    setAdaCoretan(true);
    setPesan("");
  };

  const selesaiGambar = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!sedangGambar.current) return;
    event.preventDefault();
    sedangGambar.current = false;
    titikTerakhir.current = null;
    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer sudah lepas */
    }
  };

  const hapusCoretan = () => {
    siapkanKanvas();
    setPesan("");
  };

  const kirimJawaban = async () => {
    if (disabled || mengirim) return;
    const kanvas = canvasRef.current;
    if (!kanvas || !adaCoretan) {
      setPesan("Coretkan jawaban di papan tulis dulu, lalu kirim.");
      return;
    }
    setPesan("");
    setMengirim(true);
    try {
      await onSubmit(kanvas.toDataURL("image/png"));
    } finally {
      setMengirim(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="overflow-hidden rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6]">
          <canvas
            ref={canvasRef}
            className="block h-[220px] w-full cursor-crosshair touch-none"
            style={{ touchAction: "none" }}
            onPointerDown={mulaiGambar}
            onPointerMove={geserGambar}
            onPointerUp={selesaiGambar}
            onPointerCancel={selesaiGambar}
          />
        </div>
        <button
          type="button"
          disabled={disabled || mengirim}
          onClick={hapusCoretan}
          className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-2 text-sm font-black text-[#1C01A5] hover:bg-[#F8F7FF]"
        >
          Hapus Coretan
        </button>
      </div>
      <button
        type="button"
        disabled={disabled || mengirim}
        onClick={kirimJawaban}
        className={`${kelasTombolUtama} rounded-xl px-4 py-2 text-sm font-black`}
      >
        {mengirim ? "Menilai..." : "Kirim Jawaban"}
      </button>
      {pesan ? <p className="text-sm font-black text-rose-600">{pesan}</p> : null}
    </div>
  );
}
