"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as AcaraPointer } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SCENE_START"
  | "RIGHT_ANGLE_FORMED"
  | "ARM_LENGTH_MISCONCEPTION_TEST"
  | "PARALLEL_LINES_DETECTED"
  | "PERPENDICULAR_LINES_DETECTED"
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

type TabLab = "sudut" | "garis" | "bangun";
type Titik = { x: number; y: number };
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
type JenisSudut = "siku" | "lancip" | "tumpul";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "sudut", label: "Sudut" },
  { id: "garis", label: "Garis" },
  { id: "bangun", label: "Bangun" },
];

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

const PESAN_SIKU =
  "Pas sekali dengan pojok kertas! Ini adalah Sudut Siku-Siku (90 derajat), tandanya berbentuk kotak kecil di pojok.";
const PESAN_KAKI =
  "Lihat! Walaupun garis kakinya kita perpanjang atau perpendek, lebar bukaan sudutnya tetap sama!";
const PESAN_SEJAJAR =
  "Kedua garis ini seperti rel kereta api! Jaraknya selalu sama dan tidak akan pernah bertabrakan, namanya Garis Sejajar.";
const PESAN_TEGAK =
  "Kedua garis berpotongan dan membentuk sudut siku-siku 90 derajat! Ini disebut Garis Tegak Lurus.";

type Pojok = { x: number; y: number; jenis: JenisSudut };
type BangunData = {
  id: string;
  nama: string;
  titik: Pojok[];
  cm: number[];
  grup: number[];
  sejajar: number[][];
  siku: number;
  lancip: number;
  tumpul: number;
};

const BANGUN: BangunData[] = [
  {
    id: "persegi",
    nama: "Persegi",
    titik: [
      { x: 40, y: 36, jenis: "siku" },
      { x: 148, y: 36, jenis: "siku" },
      { x: 148, y: 144, jenis: "siku" },
      { x: 40, y: 144, jenis: "siku" },
    ],
    cm: [4, 4, 4, 4],
    grup: [1, 1, 1, 1],
    sejajar: [
      [0, 2],
      [1, 3],
    ],
    siku: 4,
    lancip: 0,
    tumpul: 0,
  },
  {
    id: "persegi-panjang",
    nama: "Persegi Panjang",
    titik: [
      { x: 24, y: 48, jenis: "siku" },
      { x: 176, y: 48, jenis: "siku" },
      { x: 176, y: 124, jenis: "siku" },
      { x: 24, y: 124, jenis: "siku" },
    ],
    cm: [6, 4, 6, 4],
    grup: [1, 2, 1, 2],
    sejajar: [
      [0, 2],
      [1, 3],
    ],
    siku: 4,
    lancip: 0,
    tumpul: 0,
  },
  {
    id: "segitiga-siku",
    nama: "Segitiga Siku-Siku",
    titik: [
      { x: 36, y: 132, jenis: "siku" },
      { x: 156, y: 132, jenis: "lancip" },
      { x: 36, y: 36, jenis: "lancip" },
    ],
    cm: [6, 5, 4],
    grup: [0, 0, 0],
    sejajar: [],
    siku: 1,
    lancip: 2,
    tumpul: 0,
  },
  {
    id: "sama-sisi",
    nama: "Segitiga Sama Sisi",
    titik: [
      { x: 100, y: 28, jenis: "lancip" },
      { x: 168, y: 140, jenis: "lancip" },
      { x: 32, y: 140, jenis: "lancip" },
    ],
    cm: [4, 4, 4],
    grup: [1, 1, 1],
    sejajar: [],
    siku: 0,
    lancip: 3,
    tumpul: 0,
  },
  {
    id: "jajar",
    nama: "Jajar Genjang",
    titik: [
      { x: 64, y: 40, jenis: "lancip" },
      { x: 176, y: 40, jenis: "tumpul" },
      { x: 144, y: 132, jenis: "lancip" },
      { x: 32, y: 132, jenis: "tumpul" },
    ],
    cm: [5, 3, 5, 3],
    grup: [1, 2, 1, 2],
    sejajar: [
      [0, 2],
      [1, 3],
    ],
    siku: 0,
    lancip: 2,
    tumpul: 2,
  },
  {
    id: "trapesium",
    nama: "Trapesium Siku-Siku",
    titik: [
      { x: 48, y: 40, jenis: "siku" },
      { x: 128, y: 40, jenis: "tumpul" },
      { x: 168, y: 136, jenis: "lancip" },
      { x: 48, y: 136, jenis: "siku" },
    ],
    cm: [4, 6, 7, 5],
    grup: [0, 0, 0, 0],
    sejajar: [[0, 2]],
    siku: 2,
    lancip: 1,
    tumpul: 1,
  },
];

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function jenisDariDerajat(derajat: number): JenisSudut {
  if (derajat < 90) return "lancip";
  if (derajat === 90) return "siku";
  return "tumpul";
}

function labelJenis(jenis: JenisSudut): string {
  if (jenis === "lancip") return "Sudut Lancip (Lebih Kecil dari Siku-Siku)";
  if (jenis === "siku") return "Sudut Siku-Siku (90°)";
  return "Sudut Tumpul (Lebih Besar dari Siku-Siku)";
}

function cocokJenis(teks: string, jenis: JenisSudut): boolean {
  const n = normalisasiSuara(teks);
  const lancip = n.includes("lancip");
  const tumpul = n.includes("tumpul");
  const siku = n.split(" ").includes("siku");
  if (jenis === "lancip") return lancip && !tumpul && !siku;
  if (jenis === "tumpul") return tumpul && !lancip && !siku;
  return siku && !lancip && !tumpul;
}

function cocokHubungan(teks: string, derajat: number): boolean {
  const n = normalisasiSuara(teks);
  const sejajar = n.includes("sejajar");
  const tegak = n.includes("tegak");
  if (derajat === 0) return sejajar && !tegak;
  if (derajat === 90) return tegak && !sejajar;
  return n.includes("berpotongan") && !sejajar && !tegak;
}

function cocokSegitigaSiku(teks: string): boolean {
  const n = normalisasiSuara(teks);
  return n.includes("segitiga") && n.split(" ").includes("siku") && !n.includes("lancip") && !n.includes("tumpul");
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
  return { data: img.data, width, height, minX, minY, maxX, maxY, tinta };
}

function kenaliSatuAngka(data: Uint8ClampedArray, width: number, x1: number, y1: number, x2: number, y2: number): string {
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
        className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black text-white ${menyimak ? "bg-rose-500" : "bg-emerald-600"}`}
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

function siapkanKanvas(kanvas: HTMLCanvasElement, tinggi = 72) {
  const induk = kanvas.parentElement;
  if (!induk) return;
  const lebar = Math.max(induk.clientWidth, 72);
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
}

function KanvasJawab({
  kunci,
  expected,
  label,
  disabled,
  onHasil,
}: {
  kunci: string;
  expected: string;
  label: string;
  disabled?: boolean;
  onHasil: (benar: boolean, terbaca: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);
  const [adaCoretan, setAdaCoretan] = useState(false);
  const [pesan, setPesan] = useState("");
  const [bantu, setBantu] = useState(false);
  const angka = /^\d+$/.test(expected);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    siapkanKanvas(kanvas);
    setAdaCoretan(false);
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: AcaraPointer<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const selesai = (event: AcaraPointer<HTMLCanvasElement>) => {
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
    const terbaca = angka ? kenaliAngkaKanvas(kanvas, expected.length) : "";
    const benar = angka && terbaca === expected;
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
          onPointerDown={(event) => {
            if (disabled) return;
            event.preventDefault();
            const kanvas = canvasRef.current;
            const ctx = kanvas?.getContext("2d");
            if (!kanvas || !ctx) return;
            kanvas.setPointerCapture(event.pointerId);
            gambar.current = true;
            terakhir.current = titikDari(event);
          }}
          onPointerMove={(event) => {
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
          }}
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

function KanvasZona({
  kunci,
  onHasil,
}: {
  kunci: string;
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
    siapkanKanvas(kanvas, 96);
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    const lebar = kanvas.clientWidth;
    ctx.save();
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lebar / 2, 8);
    ctx.lineTo(lebar / 2, 88);
    ctx.stroke();
    ctx.fillStyle = "#64748b";
    ctx.font = "700 12px sans-serif";
    ctx.fillText("Sudut A", 12, 18);
    ctx.fillText("Sudut B", lebar / 2 + 12, 18);
    ctx.restore();
    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 5;
    setAdaCoretan(false);
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: AcaraPointer<HTMLCanvasElement>) => {
    const kotak = canvasRef.current?.getBoundingClientRect();
    if (!kotak) return { x: 0, y: 0 };
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const selesai = (event: AcaraPointer<HTMLCanvasElement>) => {
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
    const kotak = kanvas ? kotakTinta(kanvas) : null;
    if (!kanvas || !kotak) {
      setPesan("Lingkari dulu sudutnya.");
      setBantu(true);
      onHasil(false, "?");
      return;
    }
    let kiri = 0;
    let kanan = 0;
    const tengah = kotak.width / 2;
    for (let y = 0; y < kanvas.height; y += 2) {
      for (let x = 0; x < kanvas.width; x += 2) {
        const i = (y * kotak.width + x) * 4;
        if (!tintaPixel(kotak.data, i)) continue;
        if (x < tengah) kiri += 1;
        else kanan += 1;
      }
    }
    const benar = kiri > kanan && kiri > 8;
    setPesan(benar ? "Sudut A lebih besar!" : "Yang kakinya panjang belum tentu sudutnya lebih besar.");
    if (!benar) setBantu(true);
    onHasil(benar, benar ? "A" : "B");
  };

  return (
    <div>
      <p className="text-center text-[11px] font-black uppercase text-[#1C01A5]">Lingkari sudut yang lebih besar</p>
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
        <canvas
          ref={canvasRef}
          aria-label="Lingkari sudut yang lebih besar"
          className="block w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={(event) => {
            event.preventDefault();
            const kanvas = canvasRef.current;
            if (!kanvas) return;
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
            ctx.strokeStyle = "#1C01A5";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(terakhir.current.x, terakhir.current.y);
            ctx.lineTo(sekarang.x, sekarang.y);
            ctx.stroke();
            terakhir.current = sekarang;
            setAdaCoretan(true);
          }}
          onPointerUp={selesai}
          onPointerCancel={selesai}
        />
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        <button type="button" onClick={() => { siapkan(); setPesan(""); }} className="inline-flex min-h-12 items-center rounded-xl bg-white px-2 text-xs font-black text-[#1C01A5] ring-2 ring-indigo-200">
          Hapus
        </button>
        <button type="button" onClick={periksa} disabled={!adaCoretan} className="inline-flex min-h-12 items-center rounded-xl bg-[#1C01A5] px-3 text-xs font-black text-white">
          Cek coretan
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-indigo-800">{pesan}</p> : null}
      {bantu ? (
        <button type="button" onClick={() => onHasil(true, "A")} className="mt-1 inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-3 text-xs font-black text-amber-950">
          Bantuan: lingkari Sudut A
        </button>
      ) : null}
    </div>
  );
}

function KanvasTanda({
  kunci,
  label,
  onHasil,
}: {
  kunci: string;
  label: string;
  onHasil: (benar: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);
  const [pesan, setPesan] = useState("");
  const [bantu, setBantu] = useState(false);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    siapkanKanvas(kanvas, 88);
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    const lebar = kanvas.clientWidth;
    ctx.save();
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lebar / 2, 10);
    ctx.lineTo(lebar / 2, 78);
    ctx.moveTo(16, 44);
    ctx.lineTo(lebar - 16, 44);
    ctx.stroke();
    ctx.restore();
    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 5;
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: AcaraPointer<HTMLCanvasElement>) => {
    const kotak = canvasRef.current?.getBoundingClientRect();
    if (!kotak) return { x: 0, y: 0 };
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const selesai = (event: AcaraPointer<HTMLCanvasElement>) => {
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
    const kotak = kanvas ? kotakTinta(kanvas) : null;
    if (!kanvas || !kotak) {
      setPesan("Beri tanda siku di titik potong.");
      setBantu(true);
      onHasil(false);
      return;
    }
    const cx = kotak.width / 2;
    const cy = kanvas.height / 2;
    let tengah = 0;
    for (let y = 0; y < kanvas.height; y += 2) {
      for (let x = 0; x < kotak.width; x += 2) {
        const i = (y * kotak.width + x) * 4;
        if (!tintaPixel(kotak.data, i)) continue;
        if (Math.abs(x - cx) < kotak.width * 0.22 && Math.abs(y - cy) < kanvas.height * 0.35) tengah += 1;
      }
    }
    const benar = tengah > 6;
    setPesan(benar ? "Tanda siku ada di titik potong." : "Tanda kotaknya dekat titik potong, ya.");
    if (!benar) setBantu(true);
    onHasil(benar);
  };

  return (
    <div>
      <p className="text-center text-[11px] font-black uppercase text-[#1C01A5]">{label}</p>
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
        <canvas
          ref={canvasRef}
          aria-label={label}
          className="block w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={(event) => {
            event.preventDefault();
            const kanvas = canvasRef.current;
            if (!kanvas) return;
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
            ctx.strokeStyle = "#1C01A5";
            ctx.lineWidth = 5;
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
      <div className="mt-1 flex flex-wrap gap-1">
        <button type="button" onClick={() => { siapkan(); setPesan(""); }} className="inline-flex min-h-12 items-center rounded-xl bg-white px-2 text-xs font-black text-[#1C01A5] ring-2 ring-indigo-200">
          Hapus
        </button>
        <button type="button" onClick={periksa} className="inline-flex min-h-12 items-center rounded-xl bg-[#1C01A5] px-3 text-xs font-black text-white">
          Cek coretan
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-indigo-800">{pesan}</p> : null}
      {bantu ? (
        <button type="button" onClick={() => onHasil(true)} className="mt-1 inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-3 text-xs font-black text-amber-950">
          Bantuan: beri tanda siku
        </button>
      ) : null}
    </div>
  );
}

function GambarSudut({ derajat, panjang, pojok }: { derajat: number; panjang: boolean; pojok: boolean }) {
  const rad = (derajat * Math.PI) / 180;
  const ox = 36;
  const oy = 118;
  const kaki = panjang ? 150 : 78;
  const ax = ox + kaki;
  const ay = oy;
  const bx = ox + Math.cos(rad) * kaki;
  const by = oy - Math.sin(rad) * kaki;
  const jenis = jenisDariDerajat(derajat);
  const busur = `M ${ox + 28} ${oy} A 28 28 0 0 0 ${ox + Math.cos(rad) * 28} ${oy - Math.sin(rad) * 28}`;
  return (
    <svg viewBox="0 0 280 150" className="h-40 w-full rounded-2xl bg-sky-50" aria-hidden>
      {pojok ? <path d="M36 118 H84 V70 H36 Z" fill="#fde68a" opacity="0.85" /> : null}
      <path d={busur} fill="none" stroke={jenis === "siku" ? "#16a34a" : jenis === "lancip" ? "#ea580c" : "#7e22ce"} strokeWidth="4" />
      <line x1={ox} y1={oy} x2={ax} y2={ay} stroke="#1C01A5" strokeWidth="4" />
      <line x1={ox} y1={oy} x2={bx} y2={by} stroke="#e11d48" strokeWidth="4" />
      <circle cx={ox} cy={oy} r="5" fill="#f59e0b" stroke="#1C01A5" />
      {jenis === "siku" ? <path d="M36 102 H52 V118" fill="none" stroke="#16a34a" strokeWidth="3" /> : null}
      <text x={ox + 8} y={oy - 8} fontSize="11" fontWeight="800" fill="#1C01A5">
        O
      </text>
      <text x="120" y="18" fontSize="14" fontWeight="800" fill="#1C01A5">
        {derajat}°
      </text>
    </svg>
  );
}

function GambarGaris({ derajat }: { derajat: number }) {
  const rad = (derajat * Math.PI) / 180;
  const cx = 140;
  const cy = 86;
  const jauh = 120;
  const x2 = cx + Math.cos(rad) * jauh;
  const y2 = cy - Math.sin(rad) * jauh;
  const x1 = cx - Math.cos(rad) * jauh;
  const y1 = cy + Math.sin(rad) * jauh;
  return (
    <svg viewBox="0 0 280 160" className="h-40 w-full rounded-2xl bg-stone-100" aria-hidden>
      <rect x="0" y="70" width="280" height="32" fill="#d6d3d1" />
      {derajat === 0
        ? [40, 80, 120, 160, 200, 240].map((x) => <rect key={x} x={x} y="78" width="10" height="16" fill="#78716c" />)
        : null}
      <line x1="16" y1="86" x2="264" y2="86" stroke="#2563eb" strokeWidth="4" />
      {derajat === 0 ? (
        <line x1="16" y1="46" x2="264" y2="46" stroke="#e11d48" strokeWidth="4" />
      ) : (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e11d48" strokeWidth="4" />
      )}
      {derajat === 0 ? (
        <>
          <line x1="70" y1="46" x2="70" y2="86" stroke="#16a34a" strokeWidth="2" />
          <line x1="210" y1="46" x2="210" y2="86" stroke="#16a34a" strokeWidth="2" />
          <text x="78" y="70" fontSize="10" fontWeight="800" fill="#166534">
            jarak sama
          </text>
        </>
      ) : null}
      {derajat === 90 ? <path d="M140 70 V86 H156" fill="none" stroke="#16a34a" strokeWidth="3" /> : null}
      <text x="18" y="104" fontSize="11" fontWeight="800" fill="#1d4ed8">
        Garis 1
      </text>
      <text x="18" y="28" fontSize="11" fontWeight="800" fill="#be123c">
        Garis 2 · {derajat}°
      </text>
    </svg>
  );
}

function tandaSisi(a: Pojok, b: Pojok, grup: number) {
  if (grup <= 0) return null;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const panjang = Math.max(1, Math.hypot(dx, dy));
  const nx = -dy / panjang;
  const ny = dx / panjang;
  return Array.from({ length: grup }, (_, i) => {
    const geser = (i - (grup - 1) / 2) * 5;
    const px = mx + (dx / panjang) * geser;
    const py = my + (dy / panjang) * geser;
    return (
      <line
        key={`${px}-${py}`}
        x1={px - nx * 7}
        y1={py - ny * 7}
        x2={px + nx * 7}
        y2={py + ny * 7}
        stroke="#1C01A5"
        strokeWidth="2"
      />
    );
  });
}

function GambarBangun({
  bangun,
  sisi,
  sudut,
  sejajar,
}: {
  bangun: BangunData;
  sisi: boolean;
  sudut: boolean;
  sejajar: boolean;
}) {
  const titik = bangun.titik.map((p) => `${p.x},${p.y}`).join(" ");
  const pasangan = new Set(sejajar ? bangun.sejajar.flat() : []);
  return (
    <svg viewBox="0 0 200 160" className="mx-auto h-40 w-full max-w-xs" aria-hidden>
      <polygon points={titik} fill="#e0e7ff" stroke="#1C01A5" strokeWidth="3" />
      {bangun.titik.map((p, i) => {
        const q = bangun.titik[(i + 1) % bangun.titik.length];
        const mx = (p.x + q.x) / 2;
        const my = (p.y + q.y) / 2;
        return (
          <g key={`${bangun.id}-sisi-${i}`}>
            {pasangan.has(i) ? (
              <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#f59e0b" strokeWidth="6" />
            ) : null}
            {sisi ? tandaSisi(p, q, bangun.grup[i]) : null}
            {sisi ? (
              <text x={mx} y={my - 6} textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
                {bangun.cm[i]} cm
              </text>
            ) : null}
          </g>
        );
      })}
      {sudut
        ? bangun.titik.map((p, i) =>
            p.jenis === "siku" ? (
              <rect key={`pojok-${i}`} x={p.x + (p.x < 100 ? 2 : -12)} y={p.y + (p.y < 90 ? 2 : -12)} width="10" height="10" fill="none" stroke="#16a34a" strokeWidth="2" />
            ) : (
              <circle key={`pojok-${i}`} cx={p.x} cy={p.y} r="5" fill={p.jenis === "lancip" ? "#fb923c" : "#a855f7"} />
            ),
          )
        : null}
    </svg>
  );
}

function JamTiga() {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
      <circle cx="60" cy="60" r="52" fill="#fff7ed" stroke="#1C01A5" strokeWidth="4" />
      <line x1="60" y1="60" x2="96" y2="60" stroke="#1C01A5" strokeWidth="4" />
      <line x1="60" y1="60" x2="60" y2="22" stroke="#e11d48" strokeWidth="3" />
      <circle cx="60" cy="60" r="4" fill="#f59e0b" />
      <text x="60" y="112" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1C01A5">
        03.00
      </text>
    </svg>
  );
}

function KaptenGeometri({ pesan, bicara, onUlang }: { pesan: string; bicara: boolean; onUlang: () => void }) {
  return (
    <div className="flex items-end gap-2 border-t border-amber-200 bg-amber-50 px-2 py-2">
      <span aria-hidden className={`select-none text-7xl leading-none ${bicara ? "igil-angguk" : ""}`}>
        🦉
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase text-amber-800">Kapten Geometri IGIL</p>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{pesan}</p>
      </div>
      <button
        type="button"
        onClick={onUlang}
        aria-label="Putar suara Kapten Geometri IGIL"
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#1C01A5] text-lg font-black text-white"
      >
        ▶
      </button>
    </div>
  );
}

function ModeSudut({ kirimEvent }: { kirimEvent: Kirim }) {
  const [sudut, setSudut] = useState(45);
  const [pojok, setPojok] = useState(true);
  const [kakiPanjang, setKakiPanjang] = useState(false);
  const sudutRef = useRef(45);
  const jenis = jenisDariDerajat(sudut);
  const ucapan = jenis === "siku" ? "sudut siku-siku" : `sudut ${jenis}`;
  const mic = useMic((teks) => {
    const ok = cocokJenis(teks, jenis);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${ucapan}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  const ubahSudut = (nilai: number) => {
    const aman = Math.max(10, Math.min(170, Math.round(nilai)));
    if (aman === 90 && sudutRef.current !== 90) {
      kirimEvent("RIGHT_ANGLE_FORMED", { pesan: PESAN_SIKU, derajat: 90 });
    }
    sudutRef.current = aman;
    setSudut(aman);
  };

  const ubahKaki = () => {
    setKakiPanjang((lama) => !lama);
    kirimEvent("ARM_LENGTH_MISCONCEPTION_TEST", { pesan: PESAN_KAKI, derajat: sudut });
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Laboratorium Sudut dan Pojok Siku-Siku</h3>
      <GambarSudut derajat={sudut} panjang={kakiPanjang} pojok={pojok} />
      {pojok ? (
        <p className={`text-center text-sm font-black ${jenis === "lancip" ? "text-orange-600" : jenis === "siku" ? "text-emerald-700" : "text-purple-700"}`}>
          {labelJenis(jenis)}
        </p>
      ) : (
        <p className="text-center text-sm font-black text-[#1C01A5]">Bukaan {sudut}°</p>
      )}
      <label className="text-xs font-black text-[#1C01A5]">
        Geser sudut {sudut}°
        <input
          aria-label="Geser sudut"
          type="range"
          min={10}
          max={170}
          value={sudut}
          onChange={(event) => ubahSudut(Number(event.target.value))}
          className="igil-geser w-full"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => ubahSudut(45)} className="inline-flex min-h-12 items-center rounded-2xl bg-orange-100 px-3 text-xs font-black text-orange-800">
          Set Lancip (45°)
        </button>
        <button type="button" onClick={() => ubahSudut(90)} className="inline-flex min-h-12 items-center rounded-2xl bg-emerald-100 px-3 text-xs font-black text-emerald-800">
          Set Siku-Siku (90°)
        </button>
        <button type="button" onClick={() => ubahSudut(130)} className="inline-flex min-h-12 items-center rounded-2xl bg-purple-100 px-3 text-xs font-black text-purple-800">
          Set Tumpul (130°)
        </button>
        <button type="button" onClick={() => setPojok((v) => !v)} className="inline-flex min-h-12 items-center rounded-2xl bg-amber-200 px-3 text-xs font-black text-amber-950">
          {pojok ? "Pojok kertas hidup" : "Alat uji pojok kertas"}
        </button>
        <button type="button" onClick={ubahKaki} className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-xs font-black text-[#1C01A5] ring-2 ring-indigo-200">
          {kakiPanjang ? "Perpendek kaki" : "Perpanjang kaki"}
        </button>
      </div>
      <KanvasJawab
        kunci={`sudut-${sudut}`}
        expected={String(sudut)}
        label="Tulis derajat"
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? `${sudut} derajat tepat.` : `Bukaannya ${sudut} derajat.`,
            benar,
            terbaca,
            expected: String(sudut),
          });
        }}
      />
      <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} labelUji={ucapan} onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, transkrip: ucapan })} />
    </div>
  );
}

function ModeGaris({ kirimEvent }: { kirimEvent: Kirim }) {
  const [derajat, setDerajat] = useState(45);
  const derajatRef = useRef(45);
  const ucapan = derajat === 0 ? "sejajar" : derajat === 90 ? "tegak lurus" : "berpotongan";
  const mic = useMic((teks) => {
    const ok = cocokHubungan(teks, derajat);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${ucapan}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  const ubah = (nilai: number) => {
    const aman = Math.max(0, Math.min(90, Math.round(nilai)));
    if (aman === 0 && derajatRef.current !== 0) kirimEvent("PARALLEL_LINES_DETECTED", { pesan: PESAN_SEJAJAR, derajat: 0 });
    if (aman === 90 && derajatRef.current !== 90) kirimEvent("PERPENDICULAR_LINES_DETECTED", { pesan: PESAN_TEGAK, derajat: 90 });
    derajatRef.current = aman;
    setDerajat(aman);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Bengkel Rel Kereta dan Persimpangan</h3>
      <GambarGaris derajat={derajat} />
      <p className="text-center text-sm font-black text-[#1C01A5]">
        {derajat === 0 ? "Garis sejajar" : derajat === 90 ? "Garis tegak lurus" : "Garis berpotongan biasa"}
      </p>
      <label className="text-xs font-black text-[#1C01A5]">
        Kemiringan garis 2 · {derajat}°
        <input
          aria-label="Kemiringan garis 2"
          type="range"
          min={0}
          max={90}
          value={derajat}
          onChange={(event) => ubah(Number(event.target.value))}
          className="igil-geser w-full"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => ubah(0)} className="inline-flex min-h-12 items-center rounded-2xl bg-sky-100 px-3 text-xs font-black text-sky-900">
          Buat Garis Sejajar (0°)
        </button>
        <button type="button" onClick={() => ubah(45)} className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-xs font-black text-[#1C01A5] ring-2 ring-indigo-200">
          Buat Garis Berpotongan Biasa (45°)
        </button>
        <button type="button" onClick={() => ubah(90)} className="inline-flex min-h-12 items-center rounded-2xl bg-emerald-100 px-3 text-xs font-black text-emerald-900">
          Buat Garis Tegak Lurus (90°)
        </button>
      </div>
      <KanvasTanda
        kunci={`garis-${derajat}`}
        label="Gambar tanda garis"
        onHasil={(benar) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? "Tanda garis tercatat." : "Gambar dekat titik potong.",
            benar,
          });
        }}
      />
      <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} labelUji={ucapan} onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, transkrip: ucapan })} />
    </div>
  );
}

function ModeBangun({ kirimEvent }: { kirimEvent: Kirim }) {
  const [indeks, setIndeks] = useState(0);
  const [sisi, setSisi] = useState(false);
  const [sudut, setSudut] = useState(false);
  const [sejajar, setSejajar] = useState(false);
  const bangun = BANGUN[indeks];
  const mic = useMic((teks) => {
    const n = normalisasiSuara(teks);
    const nama = normalisasiSuara(bangun.nama);
    const ok = n.includes(nama) && (nama !== "persegi" || !n.includes("panjang"));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Nama bangun tepat!" : `Bangun ini ${bangun.nama}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Detektif Ciri Bangun Datar</h3>
      <div className="flex flex-wrap gap-2">
        {BANGUN.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndeks(i)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
              i === indeks ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
            }`}
          >
            {item.nama}
          </button>
        ))}
      </div>
      <GambarBangun bangun={bangun} sisi={sisi} sudut={sudut} sejajar={sejajar} />
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setSisi((v) => !v)} className="inline-flex min-h-12 items-center rounded-2xl bg-sky-100 px-3 text-xs font-black text-sky-900">
          {sisi ? "Sisi sama panjang hidup" : "Cek Sisi Sama Panjang"}
        </button>
        <button type="button" onClick={() => setSudut((v) => !v)} className="inline-flex min-h-12 items-center rounded-2xl bg-emerald-100 px-3 text-xs font-black text-emerald-900">
          {sudut ? "Jenis sudut hidup" : "Cek Jenis Sudut"}
        </button>
        <button type="button" onClick={() => setSejajar((v) => !v)} className="inline-flex min-h-12 items-center rounded-2xl bg-amber-100 px-3 text-xs font-black text-amber-950">
          {sejajar ? "Sisi sejajar hidup" : "Cek Sisi Sejajar"}
        </button>
      </div>
      <p className="text-xs font-bold text-indigo-800">
        Hijau kotak siku. Oranye lancip. Ungu tumpul. Tanda | untuk sisi yang sama.
      </p>
      <div className="flex flex-wrap gap-2">
        <KanvasJawab
          kunci={`${bangun.id}-siku`}
          expected={String(bangun.siku)}
          label="Sudut siku"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${bangun.siku} sudut siku.` : `${bangun.nama} punya ${bangun.siku} sudut siku.`,
              benar,
              terbaca,
              expected: String(bangun.siku),
            });
          }}
        />
        <KanvasJawab
          kunci={`${bangun.id}-lancip`}
          expected={String(bangun.lancip)}
          label="Sudut lancip"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${bangun.lancip} sudut lancip.` : `Lancipnya ${bangun.lancip}.`,
              benar,
              terbaca,
            });
          }}
        />
        <KanvasJawab
          kunci={`${bangun.id}-tumpul`}
          expected={String(bangun.tumpul)}
          label="Sudut tumpul"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${bangun.tumpul} sudut tumpul.` : `Tumpulnya ${bangun.tumpul}.`,
              benar,
              terbaca,
            });
          }}
        />
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={bangun.nama}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Nama bangun tepat!", benar: true, transkrip: bangun.nama })}
      />
    </div>
  );
}

function ModeKuis({ kirimEvent }: { kirimEvent: Kirim }) {
  const [nomor, setNomor] = useState(0);
  const [suaraOk, setSuaraOk] = useState(false);
  const [tulisOk, setTulisOk] = useState(false);
  const [tandaOk, setTandaOk] = useState(false);
  const mic = useMic((teks) => {
    const ok = nomor === 0 ? cocokJenis(teks, "lancip") : cocokHubungan(teks, 90);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : nomor === 0 ? "Coba ucapkan sudut lancip." : "Coba ucapkan tegak lurus.",
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });
  const boleh =
    nomor === 0 ? suaraOk : nomor === 1 ? suaraOk && tandaOk : tulisOk;

  const lanjut = () => {
    kirimEvent("QUIZ_ANSWERED", { pesan: `Tantangan ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan selesai. Kamu teliti membaca sudut dan garis!" });
      return;
    }
    setNomor((n) => n + 1);
    setSuaraOk(false);
    setTulisOk(false);
    setTandaOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">Tantangan {nomor + 1} dari 3</p>
      {nomor === 0 ? (
        <>
          <p className="text-lg font-black text-[#1C01A5]">Sudut ini lebih sempit dari pojok kertas. Jenisnya apa?</p>
          <GambarSudut derajat={50} panjang={false} pojok />
          <p className="text-center text-sm font-black text-orange-600">50°</p>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            labelUji="sudut lancip"
            onUji={() => {
              setSuaraOk(true);
              kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: 1 });
            }}
          />
        </>
      ) : null}
      {nomor === 1 ? (
        <>
          <p className="text-lg font-black text-[#1C01A5]">Persimpangan ini berbentuk tanda tambah. Hubungannya apa?</p>
          <GambarGaris derajat={90} />
          <KanvasTanda
            kunci="kuis-tegak"
            label="Beri tanda siku di titik potong"
            onHasil={(benar) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Tanda siku tepat." : "Beri tanda di titik potong.", benar, soal: 2 });
              if (benar) setTandaOk(true);
            }}
          />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            labelUji="tegak lurus"
            onUji={() => {
              setSuaraOk(true);
              kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: 2 });
            }}
          />
        </>
      ) : null}
      {nomor === 2 ? (
        <>
          <p className="text-lg font-black text-[#1C01A5]">Persegi panjang ini punya berapa sudut siku-siku?</p>
          <GambarBangun bangun={BANGUN[1]} sisi={false} sudut sejajar={false} />
          <KanvasJawab
            kunci="kuis-4"
            expected="4"
            label="Tulis jumlah sudut siku"
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "4 sudut siku." : "Hitung pojok yang siku.", benar, terbaca, expected: "4" });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}
      {boleh ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 2 ? "Selesai tantangan" : "Tantangan berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

function ModeEvaluasi({ kirimEvent, onLulus }: { kirimEvent: Kirim; onLulus: (catatan: string) => void }) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const mic = useMic((teks) => {
    const ok = nomor === 1 ? cocokJenis(teks, "siku") : nomor === 4 ? cocokSegitigaSiku(teks) : false;
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : nomor === 1 ? "Coba ucapkan sudut siku-siku." : "Coba ucapkan segitiga siku-siku.",
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });
  const boleh = nomor === 0 || nomor === 2 || nomor === 3 ? tulisOk : suaraOk;

  const lanjut = () => {
    kirimEvent("EVAL_ANSWERED", { pesan: `Soal ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 4) {
      onLulus("Evaluasi bangun datar selesai. Kamu kapten geometri yang teliti!");
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">Soal {nomor + 1} dari 5</p>
      {nomor === 0 ? (
        <>
          <p className="text-lg font-black leading-snug text-[#1C01A5]">
            Sudut A bukaan 90°, kakinya pendek. Sudut B bukaan 45°, kakinya panjang. Lingkari yang lebih besar.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <GambarSudut derajat={90} panjang={false} pojok={false} />
            <GambarSudut derajat={45} panjang pojok={false} />
          </div>
          <KanvasZona
            kunci="eval-zona"
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? "Sudut A lebih besar. Panjang kaki tidak mengubah bukaan." : "Bandingkan bukaannya, bukan panjang kakinya.",
                benar,
                terbaca,
                expected: "A",
              });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}
      {nomor === 1 ? (
        <>
          <p className="text-lg font-black text-[#1C01A5]">Jarum jam pukul 03.00 tepat. Sudut apa yang terbentuk?</p>
          <JamTiga />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            labelUji="sudut siku-siku"
            onUji={() => {
              setSuaraOk(true);
              kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: 2 });
            }}
          />
        </>
      ) : null}
      {nomor === 2 ? (
        <>
          <p className="text-lg font-black text-[#1C01A5]">Trapesium siku-siku ini punya berapa sudut siku-siku?</p>
          <GambarBangun bangun={BANGUN[5]} sisi={false} sudut sejajar={false} />
          <KanvasJawab
            kunci="eval-2"
            expected="2"
            label="Tulis jumlah sudut siku"
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "2 sudut siku." : "Ada 2 pojok yang siku.", benar, terbaca, expected: "2" });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}
      {nomor === 3 ? (
        <>
          <p className="text-lg font-black text-[#1C01A5]">Persegi panjang ABCD punya berapa pasang sisi yang sejajar dan sama panjang?</p>
          <GambarBangun bangun={BANGUN[1]} sisi sejajar sudut={false} />
          <KanvasJawab
            kunci="eval-pasangan"
            expected="2"
            label="Tulis jumlah pasang"
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "2 pasang sisi." : "Sisi yang berhadapan sepasang. Ada 2 pasang.", benar, terbaca, expected: "2" });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}
      {nomor === 4 ? (
        <>
          <p className="text-lg font-black leading-snug text-[#1C01A5]">
            Aku punya 3 sisi. Satu pojok siku-siku, dua pojok lancip. Bangun apakah aku?
          </p>
          <GambarBangun bangun={BANGUN[2]} sisi={false} sudut sejajar={false} />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            labelUji="segitiga siku-siku"
            onUji={() => {
              setSuaraOk(true);
              kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: 5 });
            }}
          />
        </>
      ) : null}
      {boleh ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

export default function SimulasiMtk3Bangun({
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
  const [tab, setTab] = useState<TabLab>("sudut");
  const [pesanIgil, setPesanIgil] = useState("Halo kapten cilik! Yuk kenali sisi, sudut, dan garis.");
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
      pesan: "Halo kapten cilik! Yuk kenali sisi, sudut, dan garis.",
      adegan: "sudut",
    });
  }, [kirimEvent]);

  useEffect(() => () => hentikanSuaraGuruIgil(), []);

  const pembuka: Record<TabLab, string> = {
    sudut: "Pojok kertas adalah sudut siku. Yang lebih kecil lancip. Yang lebih besar tumpul.",
    garis: "Rel kereta sejajar. Persimpangan siku disebut tegak lurus.",
    bangun: "Cek sisi, sudut, dan sisi yang sejajar.",
  };

  const gantiTab = (id: TabLab) => {
    setTab(id);
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="flex h-[min(740px,calc(100dvh-10rem))] min-h-[32rem] flex-col overflow-hidden bg-[#FFFDF8]">
      <style>{`
        @keyframes igil-angguk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .igil-angguk { animation: igil-angguk 0.6s ease-in-out infinite; }
        .igil-geser { height: 48px; accent-color: #1C01A5; }
      `}</style>
      <div className="flex items-center justify-between gap-2 bg-[#1C01A5] px-3 py-2 text-white">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Lab IGIL · Matematika {kelas}</p>
          <h2 className="text-lg font-black leading-tight">Unsur Bangun Datar</h2>
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
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-xs font-black ${suaraAktif ? "bg-amber-300 text-amber-950" : "bg-white/20 text-white"}`}
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
        {tab === "sudut" ? <ModeSudut kirimEvent={kirimEvent} /> : null}
        {tab === "garis" ? <ModeGaris kirimEvent={kirimEvent} /> : null}
        {tab === "bangun" ? <ModeBangun kirimEvent={kirimEvent} /> : null}
      </div>
      <KaptenGeometri pesan={pesanIgil} bicara={bicara} onUlang={() => ucapkan(pesanIgil)} />
    </div>
  );
}
