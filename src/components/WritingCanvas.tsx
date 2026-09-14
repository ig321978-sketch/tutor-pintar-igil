"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { kelasTombolUtama } from "@/lib/tema";

export type ModeTulis = "canvas" | "keyboard";

type WritingCanvasProps = {
  onSubmit: (data: string) => void | Promise<void>;
  disabled?: boolean;
};

export default function WritingCanvas({
  onSubmit,
  disabled = false,
}: WritingCanvasProps) {
  const [inputMode, setInputMode] = useState<ModeTulis>("canvas");
  const [teksKeyboard, setTeksKeyboard] = useState("");
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
    if (inputMode !== "canvas") return;
    siapkanKanvas();
    const induk = canvasRef.current?.parentElement;
    if (!induk || typeof ResizeObserver === "undefined") return;
    const pengamat = new ResizeObserver(() => siapkanKanvas());
    pengamat.observe(induk);
    return () => pengamat.disconnect();
  }, [inputMode, siapkanKanvas]);

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
    if (inputMode === "canvas") {
      const kanvas = canvasRef.current;
      if (!kanvas || !adaCoretan) {
        setPesan("Gambar dulu di papan tulis, atau pilih mode Ketik Teks.");
        return;
      }
      setPesan("");
      setMengirim(true);
      try {
        await onSubmit(kanvas.toDataURL("image/png"));
      } finally {
        setMengirim(false);
      }
      return;
    }
    const teks = teksKeyboard.trim();
    if (!teks) {
      setPesan("Ketik jawaban dulu, atau pilih mode Tulis Tangan.");
      return;
    }
    setPesan("");
    setMengirim(true);
    try {
      await onSubmit(teks);
    } finally {
      setMengirim(false);
    }
  };

  return (
    <div className="space-y-3">
      <div
        role="tablist"
        aria-label="Pilih cara menjawab"
        className="flex overflow-hidden rounded-2xl border-2 border-[#1C01A5]/20 bg-[#F8F7FF]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={inputMode === "canvas"}
          disabled={disabled || mengirim}
          onClick={() => {
            setInputMode("canvas");
            setPesan("");
          }}
          className={`flex-1 px-3 py-2.5 text-sm font-black ${
            inputMode === "canvas"
              ? "bg-[#1C01A5] text-white underline decoration-[#F0AB00] decoration-2 underline-offset-4"
              : "text-[#1C01A5] hover:bg-white"
          }`}
        >
          ✏️ Tulis Tangan
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={inputMode === "keyboard"}
          disabled={disabled || mengirim}
          onClick={() => {
            setInputMode("keyboard");
            setPesan("");
          }}
          className={`flex-1 px-3 py-2.5 text-sm font-black ${
            inputMode === "keyboard"
              ? "bg-[#1C01A5] text-white underline decoration-[#F0AB00] decoration-2 underline-offset-4"
              : "text-[#1C01A5] hover:bg-white"
          }`}
        >
          ⌨️ Ketik Teks
        </button>
      </div>

      {inputMode === "canvas" ? (
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
      ) : (
        <textarea
          value={teksKeyboard}
          disabled={disabled || mengirim}
          onChange={(event) => {
            setTeksKeyboard(event.target.value);
            setPesan("");
          }}
          rows={7}
          placeholder="Ketik jawabanmu di sini, seperti menulis di buku latihan..."
          className="min-h-[220px] w-full resize-y rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] px-4 py-3 text-lg leading-relaxed text-[#1C01A5] outline-none focus:border-[#F0AB00]"
          style={{
            fontFamily: '"Comic Sans MS", "Comic Neue", "Chalkboard SE", cursive',
          }}
        />
      )}

      <button
        type="button"
        disabled={disabled || mengirim}
        onClick={kirimJawaban}
        className={`${kelasTombolUtama} rounded-xl px-4 py-2 text-sm font-black`}
      >
        {mengirim ? "Menilai..." : "Kirim Jawaban"}
      </button>
      {pesan ? (
        <p className="text-sm font-black text-rose-600">{pesan}</p>
      ) : null}
    </div>
  );
}
