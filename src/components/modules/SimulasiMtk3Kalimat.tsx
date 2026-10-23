"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SCENE_START"
  | "IMBALANCE_DETECTED"
  | "BALANCE_FOUND"
  | "INVERSE_SUBTRACTION_SHOWN"
  | "SUBTRACTION_TRAP_ALERT"
  | "STRATEGY_CHOSEN"
  | "BAR_MERGED"
  | "MACHINE_REVERSED"
  | "HANDWRITING_CHECKED"
  | "VOICE_ANSWERED"
  | "QUIZ_ANSWERED"
  | "QUIZ_COMPLETED"
  | "EVAL_ANSWERED"
  | "EVAL_COMPLETED";

export type TutorEventPayload = {
  pesan: string;
  [kunci: string]: unknown;
};

type TutorEventMasuk = {
  waktu: string;
  jenis: string;
  payload: TutorEventPayload;
};

type TabLab = "timbangan" | "pita" | "mesin" | "kuis" | "evaluasi";
type Titik = { x: number; y: number };
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
type ModeKanvas = "angka" | "operasi";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "timbangan", label: "Timbangan" },
  { id: "pita", label: "Pita" },
  { id: "mesin", label: "Mesin" },
  { id: "kuis", label: "Kuis" },
  { id: "evaluasi", label: "Evaluasi" },
];

const NAMA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

const POLA_ANGKA: Record<string, string> = {
  "0": "011101000110001100011000101110",
  "1": "001000110000100001000010001110",
  "2": "011101000100010001000100011111",
  "3": "111100000100111000010000111110",
  "4": "100011000111111000010000100001",
  "5": "111111000011110000010000111110",
  "6": "011111000011110100011000101110",
  "7": "111110000100010001000100010000",
  "8": "011101000101110100011000101110",
  "9": "011101000101111000010000111110",
};

const SOAL_TIMBANG = [
  { kotakDepan: true, dikenal: 25, total: 60 },
  { kotakDepan: false, dikenal: 34, total: 80 },
] as const;

const SOAL_PITA = [
  { id: "A" as const, kalimat: "75 − [ ? ] = 45", total: 75, kiri: 30, kanan: 45, kotakDiDepan: false, jawaban: 30 },
  { id: "B" as const, kalimat: "[ ? ] − 20 = 45", total: 65, kiri: 20, kanan: 45, kotakDiDepan: true, jawaban: 65 },
];

const SOAL_MESIN = [
  { langkah: 18, op: "+" as const, keluar: 50, jawaban: 32 },
  { langkah: 25, op: "−" as const, keluar: 40, jawaban: 65 },
];

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function baca(n: number): string {
  if (n === 0) return "nol";
  if (n < 10) return NAMA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${NAMA[n - 10]} belas`;
  if (n < 100) {
    const puluh = Math.floor(n / 10);
    const sisa = n % 10;
    return sisa ? `${NAMA[puluh]} puluh ${NAMA[sisa]}` : `${NAMA[puluh]} puluh`;
  }
  if (n === 100) return "seratus";
  return String(n);
}

function aliasBilangan(n: number): string[] {
  return [baca(n), String(n)];
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const utuh = normalisasiSuara(teks);
  const rapat = utuh.replace(/\s/g, "");
  if (!rapat) return false;
  return alias.some((item) => {
    const a = normalisasiSuara(item);
    return utuh.includes(a) || rapat === a.replace(/\s/g, "");
  });
}

function dukungRekamSuara(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as Window & {
    SpeechRecognition?: new () => unknown;
    webkitSpeechRecognition?: new () => unknown;
  };
  return Boolean(win.SpeechRecognition ?? win.webkitSpeechRecognition);
}

type MesinMic = {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function useMic(onTeks: (teks: string) => void) {
  const [menyimak, setMenyimak] = useState(false);
  const mesin = useRef<MesinMic | null>(null);

  const mulai = () => {
    if (typeof window === "undefined") return;
    const win = window as Window & {
      SpeechRecognition?: new () => MesinMic;
      webkitSpeechRecognition?: new () => MesinMic;
    };
    const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!Konstruktor) {
      onTeks("");
      return;
    }
    mesin.current?.stop();
    const rec = new Konstruktor();
    rec.lang = "id-ID";
    rec.onresult = (event) => {
      onTeks(event.results[0][0].transcript);
      setMenyimak(false);
    };
    rec.onerror = () => setMenyimak(false);
    rec.onend = () => setMenyimak(false);
    mesin.current = rec;
    setMenyimak(true);
    rec.start();
  };

  useEffect(() => () => mesin.current?.stop(), []);

  return { menyimak, mulai, didukung: dukungRekamSuara() };
}

function tintaPixel(data: Uint8ClampedArray, i: number): boolean {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  return a > 50 && r < 170 && b > r + 15;
}

function kotakTinta(kanvas: HTMLCanvasElement) {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return null;
  const { width, height } = kanvas;
  const img = ctx.getImageData(0, 0, width, height);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let tinta = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * 4;
      if (!tintaPixel(img.data, i)) continue;
      tinta += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (tinta < 12) return null;
  return { data: img.data, width, minX, minY, maxX, maxY, tinta };
}

function kenaliSatuAngka(
  data: Uint8ClampedArray,
  width: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
  const kolom = 5;
  const baris = 6;
  const selW = Math.max(1, (x2 - x1) / kolom);
  const selH = Math.max(1, (y2 - y1) / baris);
  let pola = "";
  for (let r = 0; r < baris; r++) {
    for (let c = 0; c < kolom; c++) {
      let isi = 0;
      let total = 0;
      const sx = Math.floor(x1 + c * selW);
      const sy = Math.floor(y1 + r * selH);
      for (let y = sy; y < sy + selH; y += 2) {
        for (let x = sx; x < sx + selW; x += 2) {
          total += 1;
          const i = (y * width + x) * 4;
          if (i >= 0 && i < data.length && tintaPixel(data, i)) isi += 1;
        }
      }
      pola += isi / Math.max(1, total) > 0.18 ? "1" : "0";
    }
  }
  let terbaik = "";
  let skorMax = -Infinity;
  for (const [angka, template] of Object.entries(POLA_ANGKA)) {
    let skor = 0;
    const n = Math.min(pola.length, template.length);
    for (let i = 0; i < n; i++) {
      if (pola[i] === template[i]) skor += pola[i] === "1" ? 2 : 1;
      else skor -= 1;
    }
    if (skor > skorMax) {
      skorMax = skor;
      terbaik = angka;
    }
  }
  return skorMax < 8 ? "" : terbaik;
}

function kenaliAngkaKanvas(kanvas: HTMLCanvasElement, jumlah: number): string {
  const kotak = kotakTinta(kanvas);
  if (!kotak) return "";
  const { data, width, minX, minY, maxX, maxY } = kotak;
  const potong = Math.max(1, jumlah);
  const lebar = Math.max(8, maxX - minX);
  const angka: string[] = [];
  for (let s = 0; s < potong; s++) {
    const ax = minX + (lebar * s) / potong;
    const bx = minX + (lebar * (s + 1)) / potong;
    const huruf = kenaliSatuAngka(data, width, ax, minY, bx, maxY);
    if (!huruf) return "";
    angka.push(huruf);
  }
  return angka.join("");
}

function kenaliOperasi(kanvas: HTMLCanvasElement): string {
  const kotak = kotakTinta(kanvas);
  if (!kotak) return "";
  const { data, width, minX, minY, maxX, maxY } = kotak;
  const tinggi = Math.max(1, maxY - minY);
  const lebar = Math.max(1, maxX - minX);
  let tengahBaris = 0;
  let tengahKolom = 0;
  let n = 0;
  for (let y = minY; y <= maxY; y += 2) {
    for (let x = minX; x <= maxX; x += 2) {
      const i = (y * width + x) * 4;
      if (!tintaPixel(data, i)) continue;
      n += 1;
      if (y >= minY + tinggi * 0.35 && y <= minY + tinggi * 0.65) tengahBaris += 1;
      if (x >= minX + lebar * 0.35 && x <= minX + lebar * 0.65) tengahKolom += 1;
    }
  }
  if (n < 8) return "";
  const baris = tengahBaris / n;
  const kolom = tengahKolom / n;
  if (lebar > tinggi * 1.7 && baris > 0.4 && kolom < 0.62) return "−";
  if (baris > 0.22 && kolom > 0.22 && lebar < tinggi * 1.8) return "+";
  if (lebar > tinggi * 1.5) return "−";
  return "";
}

function kalimatTimbang(soal: (typeof SOAL_TIMBANG)[number]): string {
  return soal.kotakDepan ? `[ ? ] + ${soal.dikenal} = ${soal.total}` : `${soal.dikenal} + [ ? ] = ${soal.total}`;
}

function pesanKupas(soal: (typeof SOAL_TIMBANG)[number]): string {
  const jawaban = soal.total - soal.dikenal;
  const kalimat = kalimatTimbang(soal);
  return `Trik Detektif! Untuk mencari isi kotak pada ${kalimat}, kita kurangkan totalnya: ${soal.total} dikurangi ${soal.dikenal} sama dengan ${jawaban}!`;
}

function TombolMikrofon({
  menyimak,
  onMulai,
  onUji,
  labelUji,
}: {
  menyimak: boolean;
  onMulai: () => void;
  onUji: () => void;
  labelUji: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onMulai}
        className={`inline-flex min-h-12 items-center gap-2 rounded-2xl px-3 text-sm font-black text-white ${
          menyimak ? "bg-rose-500" : "bg-emerald-600"
        }`}
      >
        {menyimak ? "Mendengarkan…" : "Mikrofon"}
      </button>
      <button
        type="button"
        onClick={onUji}
        className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-xs font-black text-[#1C01A5] ring-2 ring-emerald-300"
      >
        Uji suara: {labelUji}
      </button>
    </div>
  );
}

function KanvasJawab({
  kunci,
  expected,
  label,
  mode,
  disabled,
  onHasil,
}: {
  kunci: string;
  expected: string;
  label: string;
  mode: ModeKanvas;
  disabled?: boolean;
  onHasil: (benar: boolean, terbaca: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);
  const [adaCoretan, setAdaCoretan] = useState(false);
  const [pesan, setPesan] = useState("");
  const [bantu, setBantu] = useState(false);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = Math.max(induk.clientWidth, 72);
    const tinggi = 72;
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
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#1C01A5";
    ctx.fillStyle = "#FFFDF6";
    ctx.fillRect(0, 0, lebar, tinggi);
    setAdaCoretan(false);
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const mulai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    event.preventDefault();
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    kanvas.setPointerCapture(event.pointerId);
    gambar.current = true;
    terakhir.current = titikDari(event);
    ctx.beginPath();
    ctx.moveTo(terakhir.current.x, terakhir.current.y);
  };

  const geser = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current || disabled) return;
    event.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    const sekarang = titikDari(event);
    if (!ctx || !terakhir.current) return;
    ctx.beginPath();
    ctx.moveTo(terakhir.current.x, terakhir.current.y);
    ctx.lineTo(sekarang.x, sekarang.y);
    ctx.stroke();
    terakhir.current = sekarang;
    setAdaCoretan(true);
  };

  const selesai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current) return;
    gambar.current = false;
    terakhir.current = null;
    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer sudah lepas */
    }
  };

  const periksa = () => {
    const kanvas = canvasRef.current;
    if (!kanvas || !adaCoretan) {
      setPesan("Tulis dulu, ya.");
      return;
    }
    const terbaca = mode === "operasi" ? kenaliOperasi(kanvas) : kenaliAngkaKanvas(kanvas, expected.length);
    const benar = terbaca === expected || (expected === "−" && terbaca === "-") || (expected === "+" && terbaca === "+");
    setPesan(benar ? "Tepat!" : terbaca ? `Terbaca ${terbaca}. Coba lagi.` : "IGIL belum yakin. Tulis lebih besar.");
    if (!benar) setBantu(true);
    onHasil(benar, terbaca || "?");
  };

  return (
    <div className="min-w-0 flex-1">
      <p className="text-center text-[11px] font-black uppercase text-[#1C01A5]">{label}</p>
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
        <canvas
          ref={canvasRef}
          aria-label={label}
          className="block w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={mulai}
          onPointerMove={geser}
          onPointerUp={selesai}
          onPointerCancel={selesai}
        />
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            siapkan();
            setPesan("");
          }}
          className="inline-flex min-h-12 items-center rounded-xl bg-white px-2 text-xs font-black text-[#1C01A5] ring-2 ring-indigo-200"
        >
          Hapus
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={periksa}
          className="inline-flex min-h-12 items-center rounded-xl bg-[#1C01A5] px-3 text-xs font-black text-white"
        >
          Cek coretan
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-indigo-800">{pesan}</p> : null}
      {bantu && !disabled ? (
        <button
          type="button"
          onClick={() => onHasil(true, expected)}
          className="mt-1 inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-3 text-xs font-black text-amber-950"
        >
          Bantuan: pakai {expected}
        </button>
      ) : null}
    </div>
  );
}

function CoretBeban({ kunci, onCoret }: { kunci: string; onCoret: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);
  const [sudah, setSudah] = useState(false);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = Math.max(induk.clientWidth, 72);
    const tinggi = 72;
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
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#be123c";
    ctx.fillStyle = "#FFFDF6";
    ctx.fillRect(0, 0, lebar, tinggi);
    setSudah(false);
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const selesai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current) return;
    gambar.current = false;
    terakhir.current = null;
    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer sudah lepas */
    }
    const kotak = canvasRef.current ? kotakTinta(canvasRef.current) : null;
    if (kotak && kotak.tinta >= 18) {
      setSudah(true);
      onCoret();
    }
  };

  return (
    <div className="min-w-0 flex-1">
      <p className="text-center text-[11px] font-black uppercase text-rose-700">Coret beban yang sama</p>
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-rose-300 bg-[#FFFDF6]">
        <canvas
          ref={canvasRef}
          aria-label="Coret beban yang sama"
          className="block w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={(event) => {
            event.preventDefault();
            const kanvas = canvasRef.current;
            const ctx = kanvas?.getContext("2d");
            if (!kanvas || !ctx) return;
            kanvas.setPointerCapture(event.pointerId);
            gambar.current = true;
            terakhir.current = titikDari(event);
          }}
          onPointerMove={(event) => {
            if (!gambar.current) return;
            event.preventDefault();
            const ctx = canvasRef.current?.getContext("2d");
            const sekarang = titikDari(event);
            if (!ctx || !terakhir.current) return;
            ctx.beginPath();
            ctx.moveTo(terakhir.current.x, terakhir.current.y);
            ctx.lineTo(sekarang.x, sekarang.y);
            ctx.stroke();
            terakhir.current = sekarang;
          }}
          onPointerUp={selesai}
          onPointerCancel={selesai}
        />
      </div>
      <button
        type="button"
        onClick={siapkan}
        className="mt-1 inline-flex min-h-12 items-center rounded-xl bg-white px-2 text-xs font-black text-rose-700 ring-2 ring-rose-200"
      >
        {sudah ? "Beban tercoret" : "Hapus coretan"}
      </button>
    </div>
  );
}

function BalokAngka({ teks, warna, angkat }: { teks: string; warna: string; angkat?: boolean }) {
  return (
    <div
      className={`flex h-14 min-w-12 items-center justify-center rounded-xl px-2 text-lg font-black text-white shadow ${warna} ${
        angkat ? "igil-angkat" : ""
      }`}
    >
      {teks}
    </div>
  );
}

function KotakMisteri({ isi }: { isi: string }) {
  return (
    <div className="flex h-14 min-w-14 items-center justify-center rounded-lg border-4 border-amber-700 bg-amber-300 px-2 text-xl font-black text-amber-950 shadow">
      {isi}
    </div>
  );
}

function BatangTimbangan({ kiri, kanan, selisih }: { kiri: ReactNode; kanan: ReactNode; selisih: number }) {
  const derajat = Math.max(-14, Math.min(14, -selisih * 0.28));
  const seimbang = Math.abs(selisih) < 0.5;
  const tanda = seimbang ? "=" : selisih > 0 ? ">" : "<";
  return (
    <div className="mx-auto w-full max-w-lg py-1">
      <div className="flex justify-center">
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl font-black ${
            seimbang ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
          }`}
        >
          {tanda}
        </span>
      </div>
      <div className="relative mx-auto mt-1 h-3 w-3 rounded-full bg-slate-800" />
      <div className="origin-top transition-transform duration-300" style={{ transform: `rotate(${derajat}deg)` }}>
        <div className="mx-auto h-2.5 w-[88%] rounded-full bg-slate-800" />
        <div className="mt-0 flex justify-between gap-4 px-1">
          <div className="flex flex-1 flex-col items-center">
            <div className="h-5 w-0.5 bg-slate-500" />
            <div className="flex min-h-16 items-end gap-1 rounded-2xl border-4 border-slate-700 bg-slate-100 px-2 py-1">{kiri}</div>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <div className="h-5 w-0.5 bg-slate-500" />
            <div className="flex min-h-16 items-end gap-1 rounded-2xl border-4 border-slate-700 bg-slate-100 px-2 py-1">{kanan}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetektifIgil({ pesan, bicara, onUlang }: { pesan: string; bicara: boolean; onUlang: () => void }) {
  return (
    <div className="flex items-end gap-2 border-t border-amber-200 bg-amber-50 px-2 py-2">
      <svg width="78" height="88" viewBox="0 0 88 100" aria-hidden className={bicara ? "igil-angguk" : ""}>
        <ellipse cx="34" cy="24" rx="20" ry="5" fill="#6b4423" />
        <path d="M16 24 Q16 8 34 6 Q52 8 52 24" fill="#8a5a2b" stroke="#4a2c12" strokeWidth="2" />
        <ellipse cx="14" cy="26" rx="10" ry="4" fill="#8a5a2b" stroke="#4a2c12" />
        <ellipse cx="54" cy="26" rx="12" ry="4" fill="#8a5a2b" stroke="#4a2c12" />
        <ellipse cx="34" cy="46" rx="16" ry="15" fill="#f6d7b0" />
        <circle cx="28" cy="44" r="5" fill="#fff" />
        <circle cx="41" cy="44" r="5" fill="#fff" />
        <circle cx="29" cy="45" r="2.2" fill="#1C01A5" />
        <circle cx="42" cy="45" r="2.2" fill="#1C01A5" />
        <path d="M31 52 L34 56 L37 52 Z" fill="#f59e0b" />
        <ellipse cx="34" cy="74" rx="16" ry="16" fill="#1C01A5" />
        <circle cx="70" cy="58" r="12" fill="#dbeafe" stroke="#0f172a" strokeWidth="3" />
        <line x1="62" y1="67" x2="50" y2="80" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase text-amber-800">Detektif IGIL</p>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{pesan}</p>
      </div>
      <button
        type="button"
        onClick={onUlang}
        aria-label="Putar suara Detektif IGIL"
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#1C01A5] text-lg font-black text-white"
      >
        ▶
      </button>
    </div>
  );
}

function ModeTimbangan({ kirimEvent }: { kirimEvent: Kirim }) {
  const [indeks, setIndeks] = useState(0);
  const [tebakan, setTebakan] = useState(10);
  const [kupas, setKupas] = useState(false);
  const tebakanRef = useRef(10);
  const kupasRef = useRef(false);
  const soal = SOAL_TIMBANG[indeks];
  const jawaban = soal.total - soal.dikenal;
  const kiriJumlah = kupas ? tebakan : tebakan + soal.dikenal;
  const kananJumlah = kupas ? jawaban : soal.total;
  const selisih = kiriJumlah - kananJumlah;

  const umumkan = (nilai: number, sudahKupas = kupasRef.current) => {
    const kiri = sudahKupas ? nilai : nilai + soal.dikenal;
    const kanan = sudahKupas ? soal.total - soal.dikenal : soal.total;
    if (kiri === kanan) {
      kirimEvent("BALANCE_FOUND", {
        pesan: `Seimbang! Isi kotak misterinya ${soal.total - soal.dikenal}.`,
        tebakan: nilai,
        kiri,
        kanan,
      });
      return;
    }
    kirimEvent("IMBALANCE_DETECTED", {
      pesan: `Timbangannya masih miring! Kalau diisi ${nilai}, jumlah di kiri jadi ${kiri}, belum sama dengan ${kanan}.`,
      tebakan: nilai,
      leftSum: kiri,
      rightTotal: kanan,
    });
  };

  const ubah = (nilai: number, umum: boolean) => {
    const aman = Math.max(0, Math.min(99, nilai));
    tebakanRef.current = aman;
    setTebakan(aman);
    if (umum) umumkan(aman);
  };

  const lakukanKupas = () => {
    if (kupasRef.current) return;
    kupasRef.current = true;
    setKupas(true);
    kirimEvent("INVERSE_SUBTRACTION_SHOWN", {
      pesan: pesanKupas(soal),
      kalimat: kalimatTimbang(soal),
      jawaban,
    });
  };

  const gantiSoal = (baru: number) => {
    setIndeks(baru);
    setKupas(false);
    kupasRef.current = false;
    tebakanRef.current = 10;
    setTebakan(10);
  };

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(jawaban));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${baca(jawaban)} tepat!` : `Coba ucapkan ${baca(jawaban)}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  const kotak = <KotakMisteri isi={String(tebakan)} />;
  const beban = <BalokAngka teks={String(soal.dikenal)} warna="bg-sky-600" angkat={kupas} />;
  const totalBlok = <BalokAngka teks={String(soal.total)} warna="bg-indigo-700" angkat={kupas} />;
  const sisaBlok = <BalokAngka teks={String(jawaban)} warna="bg-emerald-600" />;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Timbangan Kotak Misteri</h3>
      <p className="text-center text-2xl font-black tracking-wide text-[#1C01A5]">{kalimatTimbang(soal)}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => gantiSoal(0)}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
            indeks === 0 ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
          }`}
        >
          [ ? ] + 25 = 60
        </button>
        <button
          type="button"
          onClick={() => gantiSoal(1)}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
            indeks === 1 ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
          }`}
        >
          34 + [ ? ] = 80
        </button>
      </div>
      <BatangTimbangan
        selisih={selisih}
        kiri={
          <>
            {soal.kotakDepan ? kotak : null}
            {beban}
            {soal.kotakDepan ? null : kotak}
          </>
        }
        kanan={
          <>
            {totalBlok}
            {kupas ? sisaBlok : null}
          </>
        }
      />
      {kupas ? (
        <p className="text-center text-sm font-black text-emerald-700">
          [ ? ] = {soal.total} − {soal.dikenal} = {jawaban}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => ubah(tebakan - 10, true)} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-sky-600 text-sm font-black text-white">
          −10
        </button>
        <button type="button" onClick={() => ubah(tebakan - 1, true)} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-sky-500 text-sm font-black text-white">
          −1
        </button>
        <label className="min-w-36 flex-1 text-center text-xs font-black text-[#1C01A5]">
          Isi kotak {tebakan}
          <input
            type="range"
            min={0}
            max={99}
            value={tebakan}
            onChange={(event) => ubah(Number(event.target.value), false)}
            onPointerUp={() => umumkan(tebakanRef.current)}
            className="igil-geser mt-1 w-full"
          />
        </label>
        <button type="button" onClick={() => ubah(tebakan + 1, true)} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-sky-500 text-sm font-black text-white">
          +1
        </button>
        <button type="button" onClick={() => ubah(tebakan + 10, true)} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-sky-600 text-sm font-black text-white">
          +10
        </button>
      </div>
      <button
        type="button"
        onClick={lakukanKupas}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-rose-600 px-3 text-sm font-black text-white"
      >
        Kupas Beban Kedua Sisi (Kurangi {soal.dikenal})
      </button>
      <div className="flex flex-col gap-2 sm:flex-row">
        <CoretBeban kunci={`coret-${indeks}`} onCoret={lakukanKupas} />
        <KanvasJawab
          kunci={`timbang-${indeks}`}
          expected={String(jawaban)}
          label="Tulis isi kotak"
          mode="angka"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${jawaban} tepat.` : `Isi kotaknya ${jawaban}.`,
              benar,
              terbaca,
              expected: String(jawaban),
            });
          }}
        />
        <KanvasJawab
          kunci={`op-${indeks}`}
          expected="−"
          label="Tulis operasi kebalikan"
          mode="operasi"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? "Tanda kurang tepat." : "Operasi kebalikannya kurang.",
              benar,
              terbaca,
              expected: "−",
            });
          }}
        />
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={baca(jawaban)}
        onUji={() => {
          kirimEvent("VOICE_ANSWERED", { pesan: `${baca(jawaban)} tepat!`, benar: true });
        }}
      />
    </div>
  );
}

function ModePita({ kirimEvent }: { kirimEvent: Kirim }) {
  const [indeks, setIndeks] = useState(0);
  const [gabung, setGabung] = useState(false);
  const [terbuka, setTerbuka] = useState(false);
  const soal = SOAL_PITA[indeks];

  const ganti = (baru: number) => {
    setIndeks(baru);
    setGabung(false);
    setTerbuka(false);
  };

  const strategi = (jenis: "kurang" | "tambah") => {
    if (soal.kotakDiDepan && jenis === "kurang") {
      kirimEvent("SUBTRACTION_TRAP_ALERT", {
        pesan:
          "Awas jebakan! Kalau kotak diisi 25, coba kita cek: 25 dikurangi 20 hasilnya 5, bukan 45! Karena kotak ada di paling depan, itu adalah TOTAL-nya, jadi harus kita TAMBAHKAN: 45 + 20!",
        kasus: "B",
      });
      return;
    }
    if (!soal.kotakDiDepan && jenis === "tambah") {
      kirimEvent("STRATEGY_CHOSEN", {
        pesan: "Kotaknya ada di bagian bawah. Caranya dikurangi. 75 dikurangi 45 sama dengan 30.",
        benar: false,
      });
      return;
    }
    setTerbuka(true);
    kirimEvent("STRATEGY_CHOSEN", {
      pesan: soal.kotakDiDepan
        ? "Benar! Kotak di depan adalah total. 45 ditambah 20 sama dengan 65."
        : "Benar! Bagian yang hilang dicari dengan kurang. 75 dikurangi 45 sama dengan 30.",
      benar: true,
      jawaban: soal.jawaban,
    });
  };

  const gabungkan = () => {
    const berikutnya = !gabung;
    setGabung(berikutnya);
    if (!berikutnya) return;
    setTerbuka(true);
    kirimEvent("BAR_MERGED", {
      pesan: soal.kotakDiDepan
        ? "Dua bagian bawah menyatu jadi pita atas. 45 ditambah 20 sama dengan 65."
        : "Pita atas utuh 75. Bagian yang diketahui 45. Sisanya 75 dikurangi 45 sama dengan 30.",
      jawaban: soal.jawaban,
    });
  };

  const mic = useMic((teks) => {
    if (cocokSuara(teks, ["dikurangi", "kurang"])) {
      strategi("kurang");
      return;
    }
    if (cocokSuara(teks, ["ditambahkan", "ditambah", "tambah"])) {
      strategi("tambah");
      return;
    }
    const ok = cocokSuara(teks, aliasBilangan(soal.jawaban));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${baca(soal.jawaban)} tepat!` : `Coba ucapkan ${baca(soal.jawaban)}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  const lebarKiri = `${(soal.kiri / soal.total) * 100}%`;
  const lebarKanan = `${(soal.kanan / soal.total) * 100}%`;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Pita Bagian dan Total</h3>
      <p className="text-center text-2xl font-black text-[#1C01A5]">{soal.kalimat}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => ganti(0)}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
            indeks === 0 ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
          }`}
        >
          Kasus A · cari bagian
        </button>
        <button
          type="button"
          onClick={() => ganti(1)}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
            indeks === 1 ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
          }`}
        >
          Kasus B · cari total
        </button>
      </div>
      <div className="rounded-2xl bg-indigo-50 p-2">
        <div className="flex h-14 items-center justify-center rounded-xl bg-indigo-600 text-lg font-black text-white">
          {soal.kotakDiDepan ? (terbuka ? soal.jawaban : "[ ? ]") : soal.total}
          <span className="ml-2 text-xs font-bold text-indigo-100">TOTAL</span>
        </div>
        <div className={`mt-2 flex transition-transform duration-700 ${gabung ? "-translate-y-16 opacity-80" : ""}`}>
          <div
            style={{ width: lebarKiri }}
            className="flex h-14 items-center justify-center rounded-l-xl bg-amber-400 text-lg font-black text-amber-950"
          >
            {soal.kotakDiDepan ? soal.kiri : terbuka ? soal.jawaban : "[ ? ]"}
          </div>
          <div
            style={{ width: lebarKanan }}
            className="flex h-14 items-center justify-center rounded-r-xl bg-emerald-500 text-lg font-black text-white"
          >
            {soal.kanan}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => strategi("kurang")} className="inline-flex min-h-12 items-center rounded-2xl bg-rose-600 px-3 text-sm font-black text-white">
          Dikurangi
        </button>
        <button type="button" onClick={() => strategi("tambah")} className="inline-flex min-h-12 items-center rounded-2xl bg-emerald-600 px-3 text-sm font-black text-white">
          Ditambahkan
        </button>
        <button type="button" onClick={gabungkan} className="inline-flex min-h-12 items-center rounded-2xl bg-[#1C01A5] px-3 text-sm font-black text-white">
          Gabungkan / Pisahkan Pita
        </button>
      </div>
      <KanvasJawab
        kunci={`pita-${indeks}`}
        expected={String(soal.jawaban)}
        label="Tulis isi kotak"
        mode="angka"
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? `${soal.jawaban} tepat.` : `Isi kotaknya ${soal.jawaban}.`,
            benar,
            terbaca,
            expected: String(soal.jawaban),
          });
          if (benar) setTerbuka(true);
        }}
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={soal.kotakDiDepan ? "ditambahkan" : "dikurangi"}
        onUji={() => strategi(soal.kotakDiDepan ? "tambah" : "kurang")}
      />
    </div>
  );
}

function ModeMesin({ kirimEvent }: { kirimEvent: Kirim }) {
  const [indeks, setIndeks] = useState(0);
  const [balik, setBalik] = useState(false);
  const soal = SOAL_MESIN[indeks];
  const operasiBalik = soal.op === "+" ? "−" : "+";
  const operasiTampil = balik ? operasiBalik : soal.op;

  const ganti = (baru: number) => {
    setIndeks(baru);
    setBalik(false);
  };

  const putar = () => {
    const berikutnya = !balik;
    setBalik(berikutnya);
    if (!berikutnya) return;
    kirimEvent("MACHINE_REVERSED", {
      pesan: `Mesin berbalik! ${soal.op} ${soal.langkah} berubah jadi ${operasiBalik} ${soal.langkah}. ${soal.keluar} ${operasiBalik === "−" ? "dikurangi" : "ditambah"} ${soal.langkah} sama dengan ${soal.jawaban}.`,
      jawaban: soal.jawaban,
      operasi: operasiBalik,
    });
  };

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(soal.jawaban));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${baca(soal.jawaban)} tepat!` : `Coba ucapkan ${baca(soal.jawaban)}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Mesin Kebalikan Operasi</h3>
      <div className="flex flex-wrap gap-2">
        {SOAL_MESIN.map((item, i) => (
          <button
            key={`${item.op}${item.langkah}`}
            type="button"
            onClick={() => ganti(i)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
              indeks === i ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
            }`}
          >
            {item.op} {item.langkah}, keluar {item.keluar}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 rounded-3xl bg-sky-100 p-3">
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-amber-300 text-center shadow">
          <span className="text-[10px] font-black uppercase text-amber-800">Masuk</span>
          <span className="text-2xl font-black text-amber-950">{balik ? soal.jawaban : "[ ? ]"}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className={`text-3xl font-black text-sky-700 ${balik ? "igil-balik" : ""}`}>{balik ? "←" : "→"}</span>
          <span className="rounded-full bg-slate-800 px-3 py-2 text-lg font-black text-white">
            {operasiTampil} {soal.langkah}
          </span>
        </div>
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl bg-emerald-500 text-center shadow">
          <span className="text-[10px] font-black uppercase text-emerald-50">Keluar</span>
          <span className="text-2xl font-black text-white">{soal.keluar}</span>
        </div>
      </div>
      <button type="button" onClick={putar} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1C01A5] px-3 text-sm font-black text-white">
        Putar Balik Arah Mesin!
      </button>
      {balik ? (
        <p className="text-center text-sm font-black text-emerald-700">
          {soal.keluar} {operasiBalik} {soal.langkah} = {soal.jawaban}
        </p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <KanvasJawab
          kunci={`mesin-op-${indeks}`}
          expected={operasiBalik}
          label="Tulis operasi kebalikan"
          mode="operasi"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? "Operasi kebalikan tepat." : `Tulis ${operasiBalik}.`,
              benar,
              terbaca,
              expected: operasiBalik,
            });
          }}
        />
        <KanvasJawab
          kunci={`mesin-angka-${indeks}`}
          expected={String(soal.jawaban)}
          label="Tulis angka masuk"
          mode="angka"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${soal.jawaban} tepat.` : `Angka masuknya ${soal.jawaban}.`,
              benar,
              terbaca,
              expected: String(soal.jawaban),
            });
          }}
        />
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={baca(soal.jawaban)}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: `${baca(soal.jawaban)} tepat!`, benar: true })}
      />
    </div>
  );
}

function ModeKuis({ kirimEvent }: { kirimEvent: Kirim }) {
  const [nomor, setNomor] = useState(0);
  const [tebakan, setTebakan] = useState(10);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const soal = [
    {
      judul: "Timbangan penjumlahan",
      kalimat: "[ ? ] + 30 = 75",
      expected: "45",
      angka: 45,
      suara: aliasBilangan(45),
      butuhImbang: true,
      butuhSuara: true,
      petunjuk: "Seimbangkan timbangan, tulis 45, lalu ucapkan empat puluh lima.",
    },
    {
      judul: "Pita, cari pengurang",
      kalimat: "68 − [ ? ] = 28",
      expected: "40",
      angka: 40,
      suara: [] as string[],
      butuhImbang: false,
      butuhSuara: false,
      petunjuk: "Pita atas 68. Bagian yang tersisa 28. Tulis bagian yang hilang.",
    },
    {
      judul: "Jebakan angka awal",
      kalimat: "[ ? ] − 15 = 35",
      expected: "50",
      angka: 50,
      suara: aliasBilangan(50),
      butuhImbang: false,
      butuhSuara: true,
      petunjuk: "Kotak ada di pita total. 35 ditambah 15. Tulis 50 dan ucapkan lima puluh.",
    },
  ][nomor];
  const imbang = tebakan === soal.angka;
  const bolehLanjut = tulisOk && (!soal.butuhImbang || imbang) && (!soal.butuhSuara || suaraOk);

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, soal.suara);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${soal.suara[0]}.`,
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });

  const lanjut = () => {
    kirimEvent("QUIZ_ANSWERED", { pesan: `Tantangan ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan kotak misteri selesai!" });
      return;
    }
    setNomor((n) => n + 1);
    setTebakan(10);
    setTulisOk(false);
    setSuaraOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">
        Tantangan {nomor + 1} dari 3 · {soal.judul}
      </p>
      <p className="text-center text-3xl font-black text-[#1C01A5]">{soal.kalimat}</p>
      <p className="text-sm font-bold text-slate-700">{soal.petunjuk}</p>
      {nomor === 0 ? (
        <>
          <BatangTimbangan
            selisih={tebakan + 30 - 75}
            kiri={
              <>
                <KotakMisteri isi={String(tebakan)} />
                <BalokAngka teks="30" warna="bg-sky-600" />
              </>
            }
            kanan={<BalokAngka teks="75" warna="bg-indigo-700" />}
          />
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setTebakan((n) => Math.max(0, n - 1))} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-sky-500 text-sm font-black text-white">
              −1
            </button>
            <button type="button" onClick={() => setTebakan((n) => Math.min(99, n + 1))} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-sky-500 text-sm font-black text-white">
              +1
            </button>
            <button type="button" onClick={() => setTebakan((n) => Math.min(99, n + 10))} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-700 px-3 text-sm font-black text-white">
              +10
            </button>
            {imbang ? <span className="inline-flex min-h-12 items-center text-sm font-black text-emerald-700">Timbangan seimbang.</span> : null}
          </div>
        </>
      ) : null}
      {nomor === 1 ? (
        <div className="rounded-2xl bg-indigo-50 p-2">
          <div className="flex h-12 items-center justify-center rounded-xl bg-indigo-600 font-black text-white">68 · TOTAL</div>
          <div className="mt-2 flex">
            <div className="flex h-12 w-[59%] items-center justify-center rounded-l-xl bg-amber-400 font-black text-amber-950">[ ? ]</div>
            <div className="flex h-12 w-[41%] items-center justify-center rounded-r-xl bg-emerald-500 font-black text-white">28</div>
          </div>
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="rounded-2xl bg-indigo-50 p-2">
          <div className="flex h-12 items-center justify-center rounded-xl bg-indigo-600 font-black text-white">[ ? ] · TOTAL</div>
          <div className="mt-2 flex">
            <div className="flex h-12 w-[30%] items-center justify-center rounded-l-xl bg-amber-400 font-black text-amber-950">15</div>
            <div className="flex h-12 w-[70%] items-center justify-center rounded-r-xl bg-emerald-500 font-black text-white">35</div>
          </div>
        </div>
      ) : null}
      <KanvasJawab
        kunci={`kuis-${nomor}`}
        expected={soal.expected}
        label="Tulis isi kotak"
        mode="angka"
        disabled={tulisOk}
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? `${soal.expected} tepat.` : `Jawaban ${soal.expected}.`,
            benar,
            terbaca,
            expected: soal.expected,
            soal: nomor + 1,
          });
          if (benar) setTulisOk(true);
        }}
      />
      {soal.butuhSuara ? (
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          labelUji={soal.suara[0]}
          onUji={() => {
            setSuaraOk(true);
            kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: nomor + 1 });
          }}
        />
      ) : null}
      {bolehLanjut ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 2 ? "Selesai kuis" : "Tantangan berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

function ModeEvaluasi({ kirimEvent, onLulus }: { kirimEvent: Kirim; onLulus: (catatan: string) => void }) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const soal = [
    {
      judul: "Suku kedua hilang",
      teks: "46 + [ ? ] = 79. Tulis isi kotak.",
      expected: "33",
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
    },
    {
      judul: "Suku pertama lewat suara",
      teks: "[ ? ] + 40 = 90. Ucapkan isi kotak.",
      expected: "50",
      suara: aliasBilangan(50),
      butuhTulis: false,
      butuhSuara: true,
    },
    {
      judul: "Pengurang hilang",
      teks: "85 − [ ? ] = 50. Tulis isi kotak.",
      expected: "35",
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
    },
    {
      judul: "Angka awal hilang",
      teks: "[ ? ] − 24 = 36. Tulis angka di depan.",
      expected: "60",
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
    },
    {
      judul: "Kantong kelereng",
      teks: "Kantong misteri ditambah 18 kelereng menjadi 50. [ ? ] + 18 = 50.",
      expected: "32",
      suara: aliasBilangan(32),
      butuhTulis: true,
      butuhSuara: true,
    },
  ][nomor];
  const tulisSiap = !soal.butuhTulis || tulisOk;
  const suaraSiap = !soal.butuhSuara || suaraOk;
  const bolehLanjut = nomor === 4 ? tulisOk || suaraOk : tulisSiap && suaraSiap;

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, soal.suara);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${soal.suara[0]}.`,
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });

  const lanjut = () => {
    kirimEvent("EVAL_ANSWERED", { pesan: `Soal ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 4) {
      onLulus("Evaluasi kalimat matematika selesai. Kamu detektif kotak yang teliti!");
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">
        Soal {nomor + 1} dari 5 · {soal.judul}
      </p>
      <p className="text-lg font-black leading-snug text-[#1C01A5]">{soal.teks}</p>
      {nomor === 1 ? <p className="text-center text-5xl font-black text-[#1C01A5]">[ ? ] + 40 = 90</p> : null}
      {soal.butuhTulis ? (
        <KanvasJawab
          kunci={`eval-${nomor}`}
          expected={soal.expected}
          label="Tulis jawaban"
          mode="angka"
          disabled={tulisOk}
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${soal.expected} tepat.` : `Jawaban ${soal.expected}.`,
              benar,
              terbaca,
              expected: soal.expected,
            });
            if (benar) setTulisOk(true);
          }}
        />
      ) : null}
      {soal.butuhSuara ? (
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          onUji={() => {
            setSuaraOk(true);
            kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: nomor + 1 });
          }}
          labelUji={soal.suara[0]}
        />
      ) : null}
      {bolehLanjut ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

export default function SimulasiMtk3Kalimat({
  kelas = "3 SD",
  kelamin,
  onTutorEvent,
  onBenar,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("timbangan");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanIgil, setPesanIgil] = useState("Halo detektif cilik! Yuk cari angka di dalam kotak misteri.");
  const [bicara, setBicara] = useState(false);
  const [suaraAktif, setSuaraAktif] = useState(true);
  const sudahLulus = useRef(false);
  const sudahMulai = useRef(false);
  const suaraRef = useRef(true);
  suaraRef.current = suaraAktif;

  const ucapkan = useCallback((teks: string) => {
    if (!suaraRef.current) return;
    void ucapkanGuruIgil(teks, { kelas, kelamin, onBicara: setBicara });
  }, [kelas, kelamin]);

  const kirimEvent = useCallback<Kirim>(
    (jenis, payload, bicaraPesan = true) => {
      setLog((lama) => [{ waktu: jamSekarang(), jenis, payload }, ...lama].slice(0, 8));
      setPesanIgil(payload.pesan);
      onTutorEvent?.(jenis, payload);
      if (bicaraPesan) ucapkan(payload.pesan);
    },
    [onTutorEvent, ucapkan],
  );

  const tandaiSelesai = useCallback(
    (catatan: string) => {
      if (sudahLulus.current) return;
      sudahLulus.current = true;
      kirimEvent("EVAL_COMPLETED", { pesan: catatan });
      onBenar?.();
    },
    [kirimEvent, onBenar],
  );

  useEffect(() => {
    if (sudahMulai.current) return;
    sudahMulai.current = true;
    kirimEvent("SCENE_START", {
      pesan: "Halo detektif cilik! Yuk cari angka di dalam kotak misteri.",
      adegan: "timbangan",
    });
  }, [kirimEvent]);

  useEffect(() => () => hentikanSuaraGuruIgil(), []);

  const pembuka: Record<TabLab, string> = {
    timbangan: "Isi kotak misteri sampai timbangan lurus. Lalu kupas beban yang sama di kedua sisi.",
    pita: "Lihat pita atas dan dua bagian bawah. Kotak di depan berarti total, jadi ditambahkan.",
    mesin: "Putar balik mesin. Tambah berubah kurang. Kurang berubah tambah.",
    kuis: "Tiga tantangan. Seimbangkan, cari bagian, lalu waspadai kotak di depan.",
    evaluasi: "Lima soal. Tulis atau ucapkan isi kotaknya.",
  };

  const gantiTab = (id: TabLab) => {
    setTab(id);
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="flex h-[min(740px,calc(100dvh-10rem))] min-h-[32rem] flex-col overflow-hidden bg-[#FFFDF8]">
      <style>{`
        @keyframes igil-angkat {
          to { transform: translateY(-36px); opacity: 0.35; }
        }
        @keyframes igil-angguk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes igil-balik {
          from { transform: scaleX(1); }
          to { transform: scaleX(-1); }
        }
        .igil-angkat { animation: igil-angkat 0.6s ease-out forwards; }
        .igil-angguk { animation: igil-angguk 0.6s ease-in-out infinite; }
        .igil-balik { animation: igil-balik 0.45s ease-out forwards; }
        .igil-geser { height: 48px; accent-color: #1C01A5; }
      `}</style>
      <div className="flex items-center justify-between gap-2 bg-[#1C01A5] px-3 py-2 text-white">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Lab IGIL · Matematika {kelas}</p>
          <h2 className="text-lg font-black leading-tight">Kalimat Matematika</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuaraAktif((v) => !v);
            if (suaraAktif) {
              hentikanSuaraGuruIgil();
              setBicara(false);
            }
          }}
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-xs font-black ${
            suaraAktif ? "bg-amber-300 text-amber-950" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara hidup" : "Suara mati"}
        </button>
      </div>
      <div className="flex gap-1 bg-indigo-50 p-1">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-xl px-1 text-[11px] font-black sm:text-xs ${
              tab === item.id ? "bg-white text-[#1C01A5]" : "text-indigo-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {tab === "timbangan" ? <ModeTimbangan kirimEvent={kirimEvent} /> : null}
        {tab === "pita" ? <ModePita kirimEvent={kirimEvent} /> : null}
        {tab === "mesin" ? <ModeMesin kirimEvent={kirimEvent} /> : null}
        {tab === "kuis" ? <ModeKuis kirimEvent={kirimEvent} /> : null}
        {tab === "evaluasi" ? <ModeEvaluasi kirimEvent={kirimEvent} onLulus={tandaiSelesai} /> : null}
      </div>
      <DetektifIgil pesan={pesanIgil} bicara={bicara} onUlang={() => ucapkan(pesanIgil)} />
      <div className="border-t border-slate-700 bg-slate-900 px-3 py-2 text-slate-100">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-[11px] font-black uppercase tracking-widest text-amber-300">Log Event IGIL</p>
          <button type="button" onClick={() => setLog([])} className="min-h-12 rounded-xl bg-slate-700 px-3 text-xs font-bold">
            Hapus log
          </button>
        </div>
        {log.length === 0 ? (
          <p className="text-xs text-slate-400">Belum ada event.</p>
        ) : (
          <ul className="max-h-16 space-y-1 overflow-y-auto">
            {log.map((baris, i) => (
              <li key={`${baris.waktu}-${baris.jenis}-${i}`} className="text-xs">
                <span className="font-bold text-emerald-300">
                  {baris.waktu} · {baris.jenis}
                </span>{" "}
                {baris.payload.pesan}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
