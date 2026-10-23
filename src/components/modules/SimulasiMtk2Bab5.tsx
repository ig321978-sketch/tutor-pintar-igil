"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";
import { KuisLima, PitaSuaraIgil, KUIS_MTK2_BAB5 } from "./KuisLimaSimulasi";

export type TutorEventType =
  | "SCENE_START"
  | "VOICE_ANSWERED"
  | "HANDWRITING_CHECKED"
  | "QUIZ_ANSWERED"
  | "QUIZ_COMPLETED"
  | "EVAL_ANSWERED"
  | "EVAL_COMPLETED";

export type TutorEventPayload = {
  pesan: string;
  [kunci: string]: unknown;
};

type TutorEventMasuk = { waktu: string; jenis: string; payload: TutorEventPayload };
type TabLab = "cerita" | "info" | "restoran" | "rangkuman" | "kuis";
type Titik = { x: number; y: number };
type JenisKanvas = "garis-tengah" | "silang" | "arsir-setengah" | "lingkar" | "tulis";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "cerita", label: "1. Cerita" },
  { id: "info", label: "2. Infografis" },
  { id: "restoran", label: "3. Restoran" },
  { id: "rangkuman", label: "4. Rangkuman" },
  { id: "kuis", label: "5. Kuis" },
];

const POLA_ANGKA: Record<string, string> = {
  "0": "011101000110001100011000101110",
  "1": "001000110000100001000100001110",
  "2": "011101000100010001000100011111",
  "3": "111100000100111000010000111110",
  "4": "100011000111111000010000100001",
  "5": "111111000011110000010000111110",
  "6": "011111000011110100011000101110",
  "7": "111110000100010001000100010000",
  "8": "011101000101110100011000101110",
  "9": "011101000101111000010000111110",
};

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function dukungRekamSuara(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as Window & {
    SpeechRecognition?: new () => unknown;
    webkitSpeechRecognition?: new () => unknown;
  };
  return Boolean(win.SpeechRecognition ?? win.webkitSpeechRecognition);
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/satu\s*per\s*dua/g, "setengah")
    .replace(/satu\s*per\s*empat/g, "seperempat")
    .replace(/1\s*\/\s*2/g, "setengah")
    .replace(/1\s*\/\s*4/g, "seperempat")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const n = normalisasiSuara(teks).replace(/\s/g, "");
  return alias.some((item) => {
    const a = normalisasiSuara(item).replace(/\s/g, "");
    return Boolean(a) && (n.includes(a) || a.includes(n));
  });
}

function tintaPixel(data: Uint8ClampedArray, i: number): boolean {
  const r = data[i];
  const b = data[i + 2];
  const a = data[i + 3];
  return a > 50 && r < 170 && b > r + 15;
}

function hitungTinta(data: Uint8ClampedArray, width: number, x1: number, y1: number, x2: number, y2: number): number {
  let n = 0;
  const xa = Math.max(0, Math.floor(Math.min(x1, x2)));
  const xb = Math.floor(Math.max(x1, x2));
  const ya = Math.max(0, Math.floor(Math.min(y1, y2)));
  const yb = Math.floor(Math.max(y1, y2));
  for (let y = ya; y < yb; y += 2) {
    for (let x = xa; x < xb; x += 2) {
      if (tintaPixel(data, (y * width + x) * 4)) n += 1;
    }
  }
  return n;
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
          if (tintaPixel(data, (y * width + x) * 4)) isi += 1;
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
  return terbaik;
}

function kenaliAngkaKanvas(kanvas: HTMLCanvasElement): string {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return "";
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let tinta = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (!tintaPixel(data, (y * width + x) * 4)) continue;
      tinta += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (tinta < 12) return "";
  return kenaliSatuAngka(data, width, minX, minY, maxX + 1, maxY + 1);
}

function adaGarisTengah(kanvas: HTMLCanvasElement): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const vert = hitungTinta(data, width, width * 0.42, height * 0.12, width * 0.58, height * 0.88);
  const horz = hitungTinta(data, width, width * 0.12, height * 0.42, width * 0.88, height * 0.58);
  const diag = hitungTinta(data, width, width * 0.2, height * 0.2, width * 0.8, height * 0.8);
  return vert > 14 || horz > 14 || diag > 40;
}

function adaSilang(kanvas: HTMLCanvasElement): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const vert = hitungTinta(data, width, width * 0.44, height * 0.12, width * 0.56, height * 0.88);
  const horz = hitungTinta(data, width, width * 0.12, height * 0.44, width * 0.88, height * 0.56);
  return vert > 12 && horz > 12;
}

function arsirSetengah(kanvas: HTMLCanvasElement): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const kiri = hitungTinta(data, width, 0, 0, width / 2, height);
  const kanan = hitungTinta(data, width, width / 2, 0, width, height);
  const total = kiri + kanan;
  if (total < 18) return false;
  const rasio = Math.min(kiri, kanan) / Math.max(1, Math.max(kiri, kanan));
  return rasio < 0.55;
}

function jumlahSelBerTinta(kanvas: HTMLCanvasElement, baris: number, kolom: number): number {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return 0;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const padX = width * 0.08;
  const padY = height * 0.16;
  const selW = (width - padX * 2) / kolom;
  const selH = (height - padY * 2) / baris;
  let n = 0;
  for (let r = 0; r < baris; r++) {
    for (let c = 0; c < kolom; c++) {
      const tinta = hitungTinta(
        data,
        width,
        padX + c * selW + selW * 0.12,
        padY + r * selH + selH * 0.12,
        padX + (c + 1) * selW - selW * 0.12,
        padY + (r + 1) * selH - selH * 0.12,
      );
      if (tinta > 8) n += 1;
    }
  }
  return n;
}

function cocokTulis(kanvas: HTMLCanvasElement, kunci: string[]): boolean {
  const angka = kenaliAngkaKanvas(kanvas);
  const silang = adaSilang(kanvas) || adaGarisTengah(kanvas);
  if (kunci.includes("1/2")) return angka.includes("2") || angka === "12" || (silang && (angka.includes("1") || angka.includes("2")));
  if (kunci.includes("1/4")) return angka.includes("4") || angka === "14" || (silang && (angka.includes("1") || angka.includes("4")));
  return kunci.some((k) => angka.includes(k));
}

type MesinMic = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function useMic(onTeks: (teks: string) => void) {
  const [menyimak, setMenyimak] = useState(false);
  const mesinRef = useRef<{ stop: () => void } | null>(null);

  const mulai = () => {
    if (menyimak) {
      mesinRef.current?.stop();
      mesinRef.current = null;
      setMenyimak(false);
      return;
    }
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
    const mesin = new Konstruktor();
    mesin.lang = "id-ID";
    mesin.continuous = false;
    mesin.interimResults = false;
    mesin.onresult = (event) => onTeks(event.results[0]?.[0]?.transcript ?? "");
    mesin.onerror = () => setMenyimak(false);
    mesin.onend = () => {
      setMenyimak(false);
      mesinRef.current = null;
    };
    try {
      mesinRef.current = mesin;
      mesin.start();
      setMenyimak(true);
    } catch {
      setMenyimak(false);
    }
  };

  return { menyimak, mulai, dukung: dukungRekamSuara() };
}

function Lambang({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <span className="inline-flex flex-col items-center px-1 align-middle font-black leading-none text-amber-900">
      <span className="text-xl">{atas}</span>
      <span className="my-0.5 block h-0.5 w-7 bg-amber-900" />
      <span className="text-xl">{bawah}</span>
    </span>
  );
}

function IgilKokiSvg({ bicara }: { bicara: boolean }) {
  return (
    <span aria-hidden className={`inline-flex h-24 w-20 items-center justify-center text-7xl leading-none ${bicara ? "igil-kedip" : ""}`}>
      🦉
    </span>
  );
}

function SudutKoki({ pesan, sedangBicara, onUlang }: { pesan: string; sedangBicara: boolean; onUlang: () => void }) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-30 flex max-w-[min(100%,24rem)] items-end gap-2">
      <div className="shrink-0">
        <IgilKokiSvg bicara={sedangBicara} />
      </div>
      <div className="mb-3 rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-lg ring-2 ring-amber-300">
        <p className="text-sm font-bold leading-snug text-amber-950">{pesan}</p>
        <button
          type="button"
          onClick={onUlang}
          className={`pointer-events-auto mt-1 inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl px-3 text-xs font-black ${
            sedangBicara ? "bg-emerald-400 text-emerald-950" : "bg-amber-400 text-amber-950"
          }`}
        >
          {sedangBicara ? "🔊 ..." : "🔊 Dengar"}
        </button>
      </div>
    </div>
  );
}

function TombolDengarGuru({ naskah, onBicara }: { naskah: string; onBicara: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        void ucapkanGuruIgil(naskah, { onBicara });
      }}
      className="z-20 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-amber-800 px-4 text-sm font-black text-white hover:bg-amber-900"
    >
      🔊 Dengarkan Penjelasan Guru
    </button>
  );
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
    <div className="relative z-20 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onMulai}
        className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-sm font-black text-white ${
          menyimak ? "igil-kedip bg-rose-500" : "bg-amber-800"
        }`}
      >
        {menyimak ? "Mendengar..." : "🎤 Ucapkan"}
      </button>
      <button
        type="button"
        onClick={onUji}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-100 px-3 text-xs font-black text-amber-900 ring-2 ring-amber-300"
      >
        Uji suara: {labelUji}
      </button>
    </div>
  );
}

function DialogBaris({ nama, teks }: { nama: string; teks: string }) {
  const warna =
    nama === "Rara"
      ? "border-pink-200 bg-pink-50"
      : nama === "Bimo"
        ? "border-sky-200 bg-sky-50"
        : nama === "Mochi"
          ? "border-orange-200 bg-orange-50"
          : "border-amber-200 bg-amber-50";
  const ikon = nama === "Rara" ? "👧" : nama === "Bimo" ? "👦" : nama === "Mochi" ? "🐱" : "🦉";
  return (
    <p className={`rounded-2xl border-2 px-3 py-2 text-sm font-semibold text-slate-700 ${warna}`}>
      <span className="mr-1 font-black text-amber-900">
        {ikon} {nama}:
      </span>
      {teks}
    </p>
  );
}

function MartabakSvg({ potong }: { potong: 1 | 2 | 4 }) {
  return (
    <svg viewBox="0 0 140 90" className="mx-auto h-24 w-40" aria-hidden>
      <ellipse cx="70" cy="48" rx="54" ry="30" fill="#b45309" stroke="#78350f" strokeWidth="3" />
      <ellipse cx="70" cy="42" rx="40" ry="18" fill="#fbbf24" />
      {potong >= 2 ? <line x1="70" y1="18" x2="70" y2="78" stroke="#fff7ed" strokeWidth="4" /> : null}
      {potong === 4 ? <line x1="20" y1="48" x2="120" y2="48" stroke="#fff7ed" strokeWidth="4" /> : null}
    </svg>
  );
}

function LingkaranPecahan({ potong, diwarnai }: { potong: 2 | 4; diwarnai: number }) {
  const r = 46;
  const irisan = (i: number) => {
    const a = (Math.PI * 2 * i) / potong - Math.PI / 2;
    const b = (Math.PI * 2 * (i + 1)) / potong - Math.PI / 2;
    return `M60 60 L${60 + r * Math.cos(a)} ${60 + r * Math.sin(a)} A${r} ${r} 0 0 1 ${60 + r * Math.cos(b)} ${60 + r * Math.sin(b)} Z`;
  };
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
      {Array.from({ length: potong }, (_, i) => (
        <path key={i} d={irisan(i)} fill={i < diwarnai ? "#f59e0b" : "#fff7ed"} stroke="#9a3412" strokeWidth="3" />
      ))}
    </svg>
  );
}

function PersegiBagian({ mode }: { mode: "silang" | "diagonal" | "tidak-sama" | "putar" }) {
  if (mode === "tidak-sama") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
        <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#b45309" strokeWidth="3" />
        <line x1="28" y1="8" x2="28" y2="92" stroke="#b45309" strokeWidth="2" />
        <line x1="48" y1="8" x2="48" y2="92" stroke="#b45309" strokeWidth="2" />
        <line x1="78" y1="8" x2="78" y2="92" stroke="#b45309" strokeWidth="2" />
        <rect x="8" y="8" width="20" height="84" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }
  if (mode === "diagonal") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
        <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#b45309" strokeWidth="3" />
        <line x1="8" y1="8" x2="92" y2="92" stroke="#b45309" strokeWidth="3" />
        <line x1="92" y1="8" x2="8" y2="92" stroke="#b45309" strokeWidth="3" />
        <path d="M8 8 L50 50 L92 8 Z" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }
  if (mode === "putar") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
        <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#b45309" strokeWidth="3" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#b45309" strokeWidth="2" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="#b45309" strokeWidth="2" />
        <rect x="50" y="50" width="42" height="42" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
      <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#b45309" strokeWidth="3" />
      <line x1="50" y1="8" x2="50" y2="92" stroke="#b45309" strokeWidth="2" />
      <line x1="8" y1="50" x2="92" y2="50" stroke="#b45309" strokeWidth="2" />
      <rect x="8" y="8" width="42" height="42" fill="#38bdf8" opacity="0.7" />
    </svg>
  );
}

function RotiTiga({ jenis }: { jenis: "kecil-besar" | "sama" | "miring" }) {
  if (jenis === "sama") {
    return (
      <svg viewBox="0 0 120 70" className="mx-auto h-16 w-28" aria-hidden>
        <rect x="8" y="14" width="48" height="42" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <rect x="64" y="14" width="48" height="42" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
      </svg>
    );
  }
  if (jenis === "miring") {
    return (
      <svg viewBox="0 0 120 70" className="mx-auto h-16 w-28" aria-hidden>
        <path d="M10 54 L58 10 L58 54 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
        <path d="M66 12 L110 54 L66 54 Z" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 70" className="mx-auto h-16 w-28" aria-hidden>
      <rect x="8" y="22" width="24" height="30" rx="4" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
      <rect x="44" y="10" width="68" height="48" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
    </svg>
  );
}

function KetupatPutus() {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
      <path d="M60 10 L110 60 L60 110 L10 60 Z" fill="#bbf7d0" stroke="#166534" strokeWidth="3" />
      <line x1="60" y1="10" x2="60" y2="110" stroke="#166534" strokeWidth="2" strokeDasharray="6 6" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="#166534" strokeWidth="2" strokeDasharray="6 6" />
    </svg>
  );
}

function SegitigaTidakSama() {
  return (
    <svg viewBox="0 0 140 110" className="mx-auto h-24 w-32" aria-hidden>
      <path d="M70 8 L128 100 L12 100 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
      <line x1="40" y1="48" x2="100" y2="48" stroke="#9a3412" strokeWidth="3" />
    </svg>
  );
}

function BiskuitLatar() {
  return (
    <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect x="28" y="28" width="104" height="104" rx="12" fill="#fbbf24" stroke="#92400e" strokeWidth="4" />
      <circle cx="58" cy="62" r="6" fill="#78350f" />
      <circle cx="102" cy="70" r="6" fill="#78350f" />
      <circle cx="80" cy="104" r="6" fill="#78350f" />
    </svg>
  );
}

function NavLangkah({
  indeks,
  total,
  onPrev,
  onNext,
  disableNext,
}: {
  indeks: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  disableNext?: boolean;
}) {
  return (
    <div className="relative z-20 flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={indeks === 0}
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-amber-900 ring-2 ring-amber-200 disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <p className="text-sm font-black text-amber-900">
        {indeks + 1} / {total}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={indeks >= total - 1 || disableNext}
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-amber-700 px-4 text-sm font-black text-white disabled:opacity-40"
      >
        Lanjut
      </button>
    </div>
  );
}

function KanvasTugas({
  kunci,
  jenis,
  latar,
  label,
  tulisKunci = [],
  targetLingkar,
  gridLingkar,
  onHasil,
}: {
  kunci: string;
  jenis: JenisKanvas;
  latar?: ReactNode;
  label: string;
  tulisKunci?: string[];
  targetLingkar?: number;
  gridLingkar?: { baris: number; kolom: number };
  onHasil: (benar: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);
  const [pesan, setPesan] = useState("");

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = Math.max(induk.clientWidth, 160);
    const tinggi = Math.max(induk.clientHeight, 160);
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
    ctx.clearRect(0, 0, lebar, tinggi);
  }, []);

  useEffect(() => {
    siapkan();
    const induk = canvasRef.current?.parentElement;
    if (!induk || typeof ResizeObserver === "undefined") return;
    const pengamat = new ResizeObserver(() => siapkan());
    pengamat.observe(induk);
    return () => pengamat.disconnect();
  }, [siapkan, kunci]);

  const titikDari = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const mulai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    gambar.current = true;
    terakhir.current = titikDari(event);
    try {
      kanvas.setPointerCapture(event.pointerId);
    } catch {
      /* sentuh */
    }
    ctx.beginPath();
    ctx.moveTo(terakhir.current.x, terakhir.current.y);
  };

  const geser = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    const sekarang = titikDari(event);
    if (!ctx || !terakhir.current) return;
    ctx.lineTo(sekarang.x, sekarang.y);
    ctx.stroke();
    terakhir.current = sekarang;
  };

  const selesai = () => {
    gambar.current = false;
    terakhir.current = null;
  };

  const periksa = () => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    let benar = false;
    if (jenis === "garis-tengah") benar = adaGarisTengah(kanvas);
    if (jenis === "silang") benar = adaSilang(kanvas);
    if (jenis === "arsir-setengah") benar = arsirSetengah(kanvas);
    if (jenis === "lingkar" && gridLingkar && targetLingkar != null) {
      const n = jumlahSelBerTinta(kanvas, gridLingkar.baris, gridLingkar.kolom);
      benar = n === targetLingkar || n === targetLingkar - 1 || n === targetLingkar + 1;
    }
    if (jenis === "tulis") benar = cocokTulis(kanvas, tulisKunci);
    setPesan(benar ? "Benar! Coretanmu rapi." : "Belum tepat. Hapus, lalu coba lagi.");
    onHasil(benar);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <div className="relative mx-auto h-48 max-w-sm overflow-hidden rounded-2xl bg-[#FFFDF6] ring-2 ring-amber-300 sm:h-56">
        {latar}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full touch-none cursor-crosshair"
          style={{ touchAction: "none" }}
          onPointerDown={mulai}
          onPointerMove={geser}
          onPointerUp={selesai}
          onPointerCancel={selesai}
        />
      </div>
      <div className="relative z-20 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            siapkan();
            setPesan("");
          }}
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-4 text-sm font-black text-amber-900 ring-2 ring-amber-200"
        >
          Hapus Coretan
        </button>
        <button type="button" onClick={periksa} className="inline-flex min-h-12 items-center rounded-2xl bg-amber-700 px-4 text-sm font-black text-white">
          Periksa Jawaban
        </button>
      </div>
      {pesan ? <p className={`text-sm font-black ${pesan.startsWith("Benar") ? "text-emerald-700" : "text-rose-700"}`}>{pesan}</p> : null}
    </div>
  );
}

function KuisPilih({
  soal,
  pilihan,
  benar,
  anak,
  onHasil,
}: {
  soal: string;
  pilihan: { id: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
  onHasil: (ok: boolean) => void;
}) {
  const [pilih, setPilih] = useState("");
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-700">{soal}</p>
      {anak}
      <div className="relative z-20 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setPilih(item.id);
              onHasil(item.id === benar);
            }}
            className={`min-h-12 rounded-2xl px-4 text-left text-sm font-black ${
              pilih === item.id ? (item.id === benar ? "bg-emerald-500 text-white" : "bg-rose-500 text-white") : "bg-amber-800 text-white"
            }`}
          >
            {item.teks}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SimulasiMtk2Bab5({
  kelas = "2 SD",
  kelamin,
  onTutorEvent,
  onBenar,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("cerita");
  const [pesanIgil, setPesanIgil] = useState("Halo koki cilik! Yuk belajar pecahan di dapur Koki Igil.");
  const [sedangBicara, setSedangBicara] = useState(false);
  const [suaraAktif, setSuaraAktif] = useState(true);
  const sudahLulus = useRef(false);
  const suaraRef = useRef(suaraAktif);
  suaraRef.current = suaraAktif;

  const ucapkan = useCallback(
    (teks: string) => {
      if (!suaraRef.current) return;
      void ucapkanGuruIgil(teks, { kelas, kelamin, onBicara: setSedangBicara });
    },
    [kelas, kelamin],
  );

  const kirimEvent = useCallback(
    (jenis: TutorEventType, payload: TutorEventPayload, bicara = true) => {
      setPesanIgil(payload.pesan);
      onTutorEvent?.(jenis, payload);
      if (bicara) ucapkan(payload.pesan);
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
    const pembukaAwal = "Halo koki cilik! Yuk belajar pecahan di dapur Koki Igil.";
    siapkanSuaraGuruIgil(pembukaAwal, { kelas, kelamin });
    kirimEvent("SCENE_START", { pesan: pembukaAwal, adegan: "cerita" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pembuka: Record<TabLab, string> = {
    cerita: "Halo koki cilik! Yuk belajar pecahan di dapur Koki Igil.",
    info: "Lihat ringkasan pecahan. Angka atas bagian yang diambil. Angka bawah semua potongan sama besar.",
    restoran: "Selamat datang di Restoran Berbagi Adil! Tamu hanya tersenyum jika potongannya sama besar.",
    rangkuman: "Ingat tiga kalimat kunci: setengah, seperempat, dan setengah kumpulan.",
    kuis: "Lima soal berbeda. Pilih jawaban yang tepat.",
  };

  const gantiTab = (id: TabLab) => {
    setTab(id);
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="rounded-[2rem] border-2 border-amber-100 bg-white shadow-xl shadow-amber-100/40">
      <style>{`
        @keyframes igil-kedip {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-6deg); }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
      `}</style>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-amber-700 to-orange-500 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Pecahan: Setengah dan Seperempat</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuaraAktif((v) => !v);
            if (suaraAktif) hentikanSuaraGuruIgil();
          }}
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-sm font-bold ${
            suaraAktif ? "bg-amber-200 text-amber-950" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>
      <PitaSuaraIgil pesan={pesanIgil} bicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
      <div className="flex flex-wrap gap-2 bg-amber-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-amber-900 shadow-sm" : "text-amber-800 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative h-[min(72vh,42rem)] bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="h-full overflow-y-auto p-3 sm:p-4">
        {tab === "cerita" ? <AdeganCerita kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
        {tab === "info" ? <AdeganInfo kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
        {tab === "restoran" ? <AdeganRestoran kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
        {tab === "rangkuman" ? <AdeganRangkuman onBicara={setSedangBicara} /> : null}
        {tab === "kuis" ? <KuisLima butir={KUIS_MTK2_BAB5} onJawab={(pesan, benar, soal) => kirimEvent("QUIZ_ANSWERED", { pesan, benar, soal })} onSelesai={tandaiSelesai} /> : null}
        </div>
      </div>
    </div>
  );
}

function AdeganCerita({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [langkah, setLangkah] = useState(0);
  const [cocok, setCocok] = useState<Record<string, string>>({});
  const [keping, setKeping] = useState<string[]>([]);
  const [wadah, setWadah] = useState<("meja" | "rara" | "bimo")[]>(["meja", "meja", "meja", "meja"]);
  const [angkaApel, setAngkaApel] = useState("");
  const total = 8;
  const naskah = [
    "Jika satu benda utuh dibagi menjadi dua bagian yang sama besar, setiap bagian disebut setengah atau satu per dua.",
    "Kalau satu benda utuh kita bagi menjadi empat bagian yang sama besar, satu bagiannya disebut seperempat atau satu per empat.",
    "Kita juga bisa mencari setengah dari kumpulan benda. Bagi benda-benda itu ke dalam dua wadah sama banyak.",
    "Ketuk roti yang dipotong dua sama besar.",
    "Pasangkan kue dengan label setengah atau seperempat.",
    "Apel dipotong empat, tapi ukurannya tidak sama. Apakah itu seperempat?",
    "Satukan dua keping setengah menjadi satu utuh.",
    "Bagi empat apel ke dua keranjang, lalu pilih setengahnya.",
  ];

  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah={naskah[langkah]} onBicara={onBicara} />
      {langkah === 0 ? <SubBabSetengah kirimEvent={kirimEvent} /> : null}
      {langkah === 1 ? <SubBabSeperempat kirimEvent={kirimEvent} /> : null}
      {langkah === 2 ? <SubBabKumpulan kirimEvent={kirimEvent} /> : null}
      {langkah === 3 ? (
        <KuisPilih
          soal="Ketuk roti yang menunjukkan pecahan setengah."
          benar="B"
          anak={
            <div className="grid grid-cols-3 gap-2">
              <RotiTiga jenis="kecil-besar" />
              <RotiTiga jenis="sama" />
              <RotiTiga jenis="miring" />
            </div>
          }
          pilihan={[
            { id: "A", teks: "A. Kecil dan besar" },
            { id: "B", teks: "B. Sama besar" },
            { id: "C", teks: "C. Miring tidak sama" },
          ]}
          onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Benar! Dua bagian sama besar itu setengah." : "Cari potongan yang sama besar.", benar: ok, soal: "a-g1" })}
        />
      ) : null}
      {langkah === 4 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Pasangkan kue ke labelnya.</p>
          {[
            { id: "pizza", tampil: "🍕 1/2 pizza", benar: "Setengah" },
            { id: "bolu", tampil: "🍰 1/4 bolu", benar: "Seperempat" },
            { id: "cokelat", tampil: "🍫 1/2 cokelat", benar: "Setengah" },
          ].map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-2xl bg-white px-3 py-2">
              <span className="text-sm font-black">{item.tampil}</span>
              {["Setengah", "Seperempat"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    const baru = { ...cocok, [item.id]: label };
                    setCocok(baru);
                    const ok = baru.pizza === "Setengah" && baru.bolu === "Seperempat" && baru.cokelat === "Setengah";
                    if (ok) kirimEvent("QUIZ_ANSWERED", { pesan: "Semua cocok! Pizza dan cokelat setengah. Bolu seperempat.", benar: true, soal: "a-g2" });
                  }}
                  className={`min-h-12 rounded-xl px-3 text-xs font-black ${
                    cocok[item.id] === label ? "bg-emerald-500 text-white" : "bg-amber-800 text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {langkah === 5 ? (
        <KuisPilih
          soal="Koki Igil memotong apel jadi 4. Satu besar, tiga kecil. Itu seperempat?"
          benar="B"
          anak={<p className="text-center text-3xl">🍎</p>}
          pilihan={[
            { id: "A", teks: "Benar" },
            { id: "B", teks: "Salah" },
          ]}
          onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Salah. Seperempat harus sama besar." : "Lihat ukurannya.", benar: ok, soal: "a-g3" })}
        />
      ) : null}
      {langkah === 6 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Ketuk 2 keping setengah ke piring.</p>
          <div className="flex min-h-24 items-center justify-center rounded-full bg-white ring-2 ring-amber-300">
            {keping.length === 0 ? <span className="text-sm font-bold text-slate-400">Piring kosong</span> : null}
            {keping.map((k) => (
              <LingkaranPecahan key={k} potong={2} diwarnai={1} />
            ))}
          </div>
          <div className="relative z-20 flex gap-2">
            {["kiri", "kanan"].map((k) => (
              <button
                key={k}
                type="button"
                disabled={keping.includes(k)}
                onClick={() => {
                  const baru = keping.includes(k) ? keping : [...keping, k];
                  setKeping(baru);
                  if (baru.length === 2) kirimEvent("QUIZ_ANSWERED", { pesan: "Hore! Dua keping setengah jadi satu utuh.", benar: true, soal: "a-g4" });
                }}
                className="min-h-12 flex-1 rounded-2xl bg-amber-800 text-sm font-black text-white disabled:opacity-40"
              >
                Keping 1/2
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {langkah === 7 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Ketuk apel ke keranjang Rara atau Bimo. Lalu pilih setengah dari 4.</p>
          <div className="grid grid-cols-3 gap-2">
            {(["meja", "rara", "bimo"] as const).map((nama) => (
              <div key={nama} className="rounded-2xl bg-white p-2 text-center ring-2 ring-amber-200">
                <p className="text-xs font-black uppercase">{nama === "meja" ? "Meja" : nama === "rara" ? "Rara" : "Bimo"}</p>
                {wadah.map((isi, i) =>
                  isi === nama ? (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setWadah((lama) => lama.map((v, idx) => (idx === i ? (v === "meja" ? "rara" : v === "rara" ? "bimo" : "meja") : v)))
                      }
                      className="min-h-12 min-w-12 text-2xl"
                    >
                      🍎
                    </button>
                  ) : null,
                )}
              </div>
            ))}
          </div>
          <div className="relative z-20 flex gap-2">
            {["1", "2", "4"].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setAngkaApel(n);
                  const ok = wadah.filter((v) => v === "rara").length === 2 && wadah.filter((v) => v === "bimo").length === 2 && n === "2";
                  kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Benar! Setengah dari 4 apel adalah 2." : "Bagi 2 dan 2, lalu pilih angka 2.", benar: ok, soal: "a-g5" });
                }}
                className={`min-h-12 flex-1 rounded-2xl text-sm font-black ${angkaApel === n ? "bg-emerald-500 text-white" : "bg-amber-800 text-white"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <NavLangkah indeks={langkah} total={total} onPrev={() => setLangkah((n) => Math.max(0, n - 1))} onNext={() => setLangkah((n) => Math.min(total - 1, n + 1))} />
    </div>
  );
}

function SubBabSetengah({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const mic = useMic((teks) => cek(teks));
  const cek = (teks: string) => {
    const ok = cocokSuara(teks, ["setengah", "satu per dua", "1/2"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar! Itu setengah atau satu per dua." : "Ucapkan setengah atau satu per dua.", benar: ok });
  };
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-amber-900">Sub-Bab 5.1 · Setengah dari Benda Utuh</p>
      <MartabakSvg potong={2} />
      <p className="text-center text-lg font-black text-amber-900">
        setengah = <Lambang atas="1" bawah="2" />
      </p>
      <DialogBaris nama="Rara" teks="Martabaknya cuma satu, tapi Rara dan Bimo sama-sama mau makan!" />
      <DialogBaris nama="Bimo" teks="Kalau dipotong asal-asalan, nanti ada yang dapat potongan kecil." />
      <DialogBaris nama="Koki Igil" teks="Tenang! Potong tepat di tengah. Satu bagian namanya setengah atau satu per dua." />
      <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} onUji={() => cek("setengah")} labelUji="Setengah" />
      <KanvasTugas
        kunci="a1-kanvas"
        jenis="garis-tengah"
        label="Gambar 1 garis lurus tepat di tengah biskuit."
        latar={<BiskuitLatar />}
        onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Garis di tengah! Dua bagian sama besar." : "Gambar garis membelah tengah.", benar: ok })}
      />
    </div>
  );
}

function SubBabSeperempat({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const mic = useMic((teks) => cek(teks));
  const cek = (teks: string) => {
    const ok = cocokSuara(teks, ["seperempat", "satu per empat", "1/4"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar! Itu seperempat atau satu per empat." : "Ucapkan seperempat.", benar: ok });
  };
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-amber-900">Sub-Bab 5.2 · Seperempat dari Benda Utuh</p>
      <LingkaranPecahan potong={4} diwarnai={1} />
      <p className="text-center text-lg font-black text-amber-900">
        seperempat = <Lambang atas="1" bawah="4" />
      </p>
      <DialogBaris nama="Bimo" teks="Ada 4 orang: aku, Rara, Koki Igil, dan Mochi!" />
      <DialogBaris nama="Koki Igil" teks="Satu semangka dipotong 4 sama besar. Satu potong seperempat." />
      <DialogBaris nama="Mochi" teks="Meong! Piringku juga sama besar." />
      <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} onUji={() => cek("seperempat")} labelUji="Seperempat" />
      <KanvasTugas
        kunci="a2-kanvas"
        jenis="tulis"
        label="Tuliskan lambang 1/4 di kotak tulis."
        tulisKunci={["1/4", "4"]}
        onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Tepat! 1/4." : "Tulis 1 di atas, 4 di bawah.", benar: ok })}
      />
    </div>
  );
}

function SubBabKumpulan({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const mic = useMic((teks) => cek(teks));
  const cek = (teks: string) => {
    const ok = cocokSuara(teks, ["3", "tiga"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar! Setengah dari 6 adalah 3." : "Ucapkan tiga.", benar: ok });
  };
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-amber-900">Sub-Bab 5.3 · Setengah dari Kumpulan Benda</p>
      <p className="text-center text-2xl">🍩🍩🍩🍩 | 🍩🍩🍩🍩</p>
      <DialogBaris nama="Rara" teks="Ada 8 donat. Rara mau membawa setengahnya untuk bekal." />
      <DialogBaris nama="Koki Igil" teks="Bagi ke 2 kotak satu per satu. Masing-masing 4. Setengah dari 8 adalah 4." />
      <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} onUji={() => cek("tiga")} labelUji="Tiga" />
      <KanvasTugas
        kunci="a3-kanvas"
        jenis="lingkar"
        label="Lingkari 5 jeruk dari 10 jeruk di kanvas."
        targetLingkar={5}
        gridLingkar={{ baris: 2, kolom: 5 }}
        latar={<p className="absolute inset-0 flex flex-wrap content-center justify-center gap-2 p-3 text-3xl">🍊🍊🍊🍊🍊 🍊🍊🍊🍊🍊</p>}
        onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Lima jeruk. Setengah dari 10." : "Lingkari tepat 5 jeruk.", benar: ok })}
      />
    </div>
  );
}

function AdeganInfo({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [langkah, setLangkah] = useState(0);
  const [isiKue, setIsiKue] = useState(0);
  const total = 8;
  const naskah = [
    "Pada pecahan satu per dua, angka 1 di atas artinya 1 bagian yang dipilih. Angka 2 di bawah artinya jumlah seluruh potongan yang sama besar.",
    "Pada pecahan seperempat, satu benda utuh dibagi menjadi 4 bagian yang sama besar. Kalau ukurannya tidak sama, itu bukan seperempat.",
    "Untuk mencari setengah dari banyak benda, bagilah menjadi 2 kelompok yang sama banyak.",
    "Pilih persegi seperempat yang diputar.",
    "Mana yang lebih besar, setengah atau seperempat semangka?",
    "Cocokkan setengah kumpulan dengan angkanya.",
    "Ketuk gambar yang pembagiannya tidak sama besar.",
    "Ketuk plus seperempat kue sampai piring penuh.",
  ];
  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah={naskah[langkah]} onBicara={onBicara} />
      {langkah === 0 ? <InfoSetengah kirimEvent={kirimEvent} /> : null}
      {langkah === 1 ? <InfoSeperempat kirimEvent={kirimEvent} /> : null}
      {langkah === 2 ? <InfoKumpulan kirimEvent={kirimEvent} /> : null}
      {langkah === 3 ? (
        <KuisPilih
          soal="Persegi diarsir seperempat di kiri atas. Pilih yang juga seperempat, meski diputar."
          benar="B"
          anak={
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-black">
              <div>
                <LingkaranPecahan potong={2} diwarnai={1} />
                A
              </div>
              <div>
                <PersegiBagian mode="putar" />
                B
              </div>
              <div>
                <PersegiBagian mode="tidak-sama" />
                C
              </div>
            </div>
          }
          pilihan={[
            { id: "A", teks: "A. Setengah lingkaran" },
            { id: "B", teks: "B. Persegi 1/4 diputar" },
            { id: "C", teks: "C. 4 potong tidak sama" },
          ]}
          onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Satu dari empat tetap seperempat." : "Cari 1 petak dari 4.", benar: ok })}
        />
      ) : null}
      {langkah === 4 ? (
        <KuisPilih
          soal="Pilih potongan semangka yang lebih besar."
          benar="A"
          anak={
            <div className="grid grid-cols-2 gap-2">
              <LingkaranPecahan potong={2} diwarnai={1} />
              <LingkaranPecahan potong={4} diwarnai={1} />
            </div>
          }
          pilihan={[
            { id: "A", teks: "A. Potongan 1/2" },
            { id: "B", teks: "B. Potongan 1/4" },
            { id: "C", teks: "C. Sama besar" },
          ]}
          onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Setengah lebih besar daripada seperempat." : "Bandingkan ukurannya.", benar: ok })}
        />
      ) : null}
      {langkah === 5 ? <PasanganKumpulan kirimEvent={kirimEvent} /> : null}
      {langkah === 6 ? (
        <KuisPilih
          soal="Ketuk 1 gambar yang pembagian 4-nya tidak sama besar."
          benar="C"
          anak={
            <div className="grid grid-cols-3 gap-2">
              <PersegiBagian mode="silang" />
              <LingkaranPecahan potong={4} diwarnai={0} />
              <PersegiBagian mode="tidak-sama" />
            </div>
          }
          pilihan={[
            { id: "A", teks: "A. Persegi 4 sama" },
            { id: "B", teks: "B. Lingkaran 4 sama" },
            { id: "C", teks: "C. Persegi tidak sama" },
          ]}
          onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Itu yang tidak adil." : "Cari yang beda ukuran.", benar: ok })}
        />
      ) : null}
      {langkah === 7 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Ketuk + 1/4 kue sampai piring penuh. Butuh 4 kali.</p>
          <LingkaranPecahan potong={4} diwarnai={isiKue} />
          <button
            type="button"
            onClick={() => {
              const n = Math.min(4, isiKue + 1);
              setIsiKue(n);
              if (n === 4) kirimEvent("QUIZ_ANSWERED", { pesan: "Penuh! Empat kali seperempat menjadi 1 utuh.", benar: true });
            }}
            className="relative z-20 inline-flex min-h-12 items-center rounded-2xl bg-amber-700 px-4 text-sm font-black text-white"
          >
            + 1/4 Kue
          </button>
          <p className="text-sm font-black text-amber-900">Terisi {isiKue} dari 4</p>
        </div>
      ) : null}
      <NavLangkah indeks={langkah} total={total} onPrev={() => setLangkah((n) => Math.max(0, n - 1))} onNext={() => setLangkah((n) => Math.min(total - 1, n + 1))} />
    </div>
  );
}

function InfoSetengah({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, ["2", "dua"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Dua! Itu angka di bawah." : "Ucapkan dua.", benar: ok });
  });
  return (
    <div className="space-y-2">
      <p className="text-sm font-black text-amber-900">1 benda utuh → dibagi 2 sama besar → 2 bagian setengah</p>
      <p className="text-sm font-semibold text-slate-700">
        <Lambang atas="1" bawah="2" /> = 1 bagian yang diwarnai, dari 2 bagian sama besar.
      </p>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Dua! Itu angka di bawah.", benar: true })}
        labelUji="Dua"
      />
      <KanvasTugas
        kunci="b1-kanvas"
        jenis="arsir-setengah"
        label="Arsir 1 dari 2 bagian lingkaran."
        latar={<LingkaranPecahan potong={2} diwarnai={0} />}
        onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Satu belahan terarsir. Itu 1/2." : "Arsir satu sisi saja.", benar: ok })}
      />
    </div>
  );
}

function InfoSeperempat({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, ["4", "empat"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Empat bagian sama besar." : "Ucapkan empat.", benar: ok });
  });
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-center text-xs font-black text-emerald-700">Sama besar = 1/4</p>
          <PersegiBagian mode="silang" />
        </div>
        <div>
          <p className="text-center text-xs font-black text-rose-700">Beda ukuran = bukan</p>
          <PersegiBagian mode="tidak-sama" />
        </div>
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Empat bagian sama besar.", benar: true })}
        labelUji="Empat"
      />
      <KanvasTugas
        kunci="b2-kanvas"
        jenis="silang"
        label="Tebalkan garis silang pada ketupat."
        latar={<KetupatPutus />}
        onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Silang rapi. Empat bagian sama." : "Gambar garis tegak dan mendatar.", benar: ok })}
      />
    </div>
  );
}

function InfoKumpulan({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, ["2", "dua"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Setengah dari 4 bintang adalah 2." : "Ucapkan dua.", benar: ok });
  });
  return (
    <div className="space-y-2">
      <p className="text-center text-2xl">🍓🍓🍓 | 🍓🍓🍓</p>
      <p className="text-sm font-black text-amber-900">Setengah dari 6 adalah 3.</p>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Setengah dari 4 bintang adalah 2.", benar: true })}
        labelUji="Dua"
      />
      <KanvasTugas
        kunci="b3-kanvas"
        jenis="tulis"
        label="Tuliskan setengah dari 8 kelereng."
        tulisKunci={["4"]}
        latar={<p className="absolute inset-x-0 top-2 text-center text-2xl">🔵🔵🔵🔵 🔵🔵🔵🔵</p>}
        onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "4. Setengah dari 8." : "Tulis angka 4.", benar: ok })}
      />
    </div>
  );
}

function PasanganKumpulan({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const baris = [
    { id: "sepuluh", tampil: "Setengah dari 10", benar: "5" },
    { id: "enam", tampil: "Setengah dari 6", benar: "3" },
    { id: "dua", tampil: "Setengah dari 2", benar: "1" },
  ];
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-700">Cocokkan kartu setengah kumpulan.</p>
      {baris.map((item) => (
        <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-2xl bg-white px-3 py-2">
          <span className="text-sm font-black">{item.tampil}</span>
          {["5", "3", "1"].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                const baru = { ...pilih, [item.id]: n };
                setPilih(baru);
                const ok = baris.every((b) => baru[b.id] === b.benar);
                if (ok) kirimEvent("QUIZ_ANSWERED", { pesan: "Semua cocok!", benar: true });
              }}
              className={`min-h-12 min-w-12 rounded-xl text-sm font-black ${pilih[item.id] === n ? "bg-emerald-500 text-white" : "bg-amber-800 text-white"}`}
            >
              {n}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function AdeganRestoran({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [bintang, setBintang] = useState(0);
  const [kueTarik, setKueTarik] = useState(0);
  const mic7 = useMic((teks) => {
    const ok = cocokSuara(teks, ["setengah", "satu per dua", "1/2"]);
    if (ok) setBintang((n) => Math.min(10, n + 1));
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Setengah. Pelanggan tersenyum!" : "Ucapkan setengah.", benar: ok, soal: 7 });
  });
  const mic8 = useMic((teks) => {
    const ok = cocokSuara(teks, ["5", "lima"]);
    if (ok) setBintang((n) => Math.min(10, n + 1));
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Lima biskuit. Adil!" : "Ucapkan lima.", benar: ok, soal: 8 });
  });
  const catat = (ok: boolean, pesan: string, soal: number) => {
    if (ok) setBintang((n) => Math.min(10, n + 1));
    kirimEvent("QUIZ_ANSWERED", { pesan, benar: ok, soal });
  };
  const naskah =
    "Setiap tamu hanya mau menerima makanan jika potongannya adil dan sama besar. Bantu Koki Igil di 10 pesanan.";

  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah={naskah} onBicara={onBicara} />
      <p className="text-sm font-black text-amber-900">Bintang kepuasan {"⭐".repeat(bintang)} ({bintang}/10)</p>
      {nomor === 0 ? (
        <KuisPilih
          soal="2 kelinci memesan 1 wortel dibagi setengah. Pilih potongan adil."
          benar="A"
          anak={<p className="text-center text-3xl">🥕🥕</p>}
          pilihan={[
            { id: "A", teks: "A. Sama besar" },
            { id: "B", teks: "B. Satu panjang, satu pendek" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Wortel adil. Dua kelinci senang!" : "Potong sama besar.", 1)}
        />
      ) : null}
      {nomor === 1 ? (
        <KuisPilih
          soal="4 beruang memesan 1 pizza. Pilih loyang 4 bagian sama besar."
          benar="A"
          anak={<LingkaranPecahan potong={4} diwarnai={0} />}
          pilihan={[
            { id: "A", teks: "A. 4 juring sama besar" },
            { id: "B", teks: "B. 4 potong beda ukuran" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Pizza adil untuk 4 beruang." : "Empat potong harus sama.", 2)}
        />
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Tarik 3 dari 6 kue mangkuk. Ketuk kue ke kotak pesanan.</p>
          <p className="text-center text-2xl">🧁🧁🧁🧁🧁🧁</p>
          <p className="text-sm font-black">Di kotak: {kueTarik} kue</p>
          <div className="relative z-20 flex gap-2">
            <button
              type="button"
              onClick={() => setKueTarik((n) => Math.min(6, n + 1))}
              className="min-h-12 flex-1 rounded-2xl bg-amber-800 text-sm font-black text-white"
            >
              Tarik 1 kue
            </button>
            <button
              type="button"
              onClick={() => {
                const ok = kueTarik === 3;
                catat(ok, ok ? "Tiga kue. Setengah dari 6." : "Setengah dari 6 adalah 3.", 3);
              }}
              className="min-h-12 flex-1 rounded-2xl bg-emerald-600 text-sm font-black text-white"
            >
              Kirim pesanan
            </button>
          </div>
        </div>
      ) : null}
      {nomor === 3 ? (
        <KuisPilih
          soal="Puding dipotong mendatar. Atas kecil, bawah lebar. Setujui sebagai setengah?"
          benar="B"
          anak={<SegitigaTidakSama />}
          pilihan={[
            { id: "A", teks: "Setuju" },
            { id: "B", teks: "Tidak setuju" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Tolak. Tidak sama besar." : "Lihat ukurannya.", 4)}
        />
      ) : null}
      {nomor === 4 ? (
        <KuisPilih
          soal="Rara mengambil 1 dari 4 potong apel sama besar. Tiket pecahannya?"
          benar="B"
          anak={<LingkaranPecahan potong={4} diwarnai={1} />}
          pilihan={[
            { id: "A", teks: "1/2" },
            { id: "B", teks: "1/4" },
            { id: "C", teks: "4/1" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "1/4. Satu dari empat." : "Hitung 4 bagian.", 5)}
        />
      ) : null}
      {nomor === 5 ? (
        <KuisPilih
          soal="Ada 12 anggur. Koki Igil memberi setengahnya, yaitu 6. Benar atau salah?"
          benar="A"
          anak={<p className="text-center text-xl">🍇🍇🍇🍇🍇🍇 | 🍇🍇🍇🍇🍇🍇</p>}
          pilihan={[
            { id: "A", teks: "Benar" },
            { id: "B", teks: "Salah" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Benar! Setengah 12 adalah 6." : "Bagi 12 jadi 6 dan 6.", 6)}
        />
      ) : null}
      {nomor === 6 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Mochi mengambil 1 dari 2 bagian ikan sama besar. Ucapkan namanya.</p>
          <LingkaranPecahan potong={2} diwarnai={1} />
          <TombolMikrofon
            menyimak={mic7.menyimak}
            onMulai={mic7.mulai}
            onUji={() => {
              setBintang((n) => Math.min(10, n + 1));
              kirimEvent("VOICE_ANSWERED", { pesan: "Setengah. Pelanggan tersenyum!", benar: true, soal: 7 });
            }}
            labelUji="Setengah"
          />
        </div>
      ) : null}
      {nomor === 7 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Ada 10 biskuit. Pelanggan minta setengah. Ucapkan angkanya.</p>
          <p className="text-center text-2xl">🍪🍪🍪🍪🍪 🍪🍪🍪🍪🍪</p>
          <TombolMikrofon
            menyimak={mic8.menyimak}
            onMulai={mic8.mulai}
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Lima biskuit. Adil!", benar: true, soal: 8 })}
            labelUji="Lima"
          />
        </div>
      ) : null}
      {nomor === 8 ? (
        <KanvasTugas
          kunci="c9-kanvas"
          jenis="silang"
          label="Gambar 2 garis potong pada roti persegi agar jadi 4 bagian sama besar."
          latar={<BiskuitLatar />}
          onHasil={(ok) => {
            if (ok) setBintang((n) => Math.min(10, n + 1));
            kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Silang rapi. Empat bagian." : "Gambar garis tegak dan mendatar.", benar: ok, soal: 9 });
          }}
        />
      ) : null}
      {nomor === 9 ? (
        <KanvasTugas
          kunci="c10-kanvas"
          jenis="tulis"
          label="Tuliskan lambang 1/2 pada papan menu."
          tulisKunci={["1/2", "2"]}
          onHasil={(ok) => {
            if (ok) setBintang((n) => Math.min(10, n + 1));
            kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Menu 1/2 siap!" : "Tulis 1 di atas, 2 di bawah.", benar: ok, soal: 10 });
          }}
        />
      ) : null}
      <NavLangkah indeks={nomor} total={10} onPrev={() => setNomor((n) => Math.max(0, n - 1))} onNext={() => setNomor((n) => Math.min(9, n + 1))} />
    </div>
  );
}

function AdeganRangkuman({ onBicara }: { onBicara: (v: boolean) => void }) {
  const naskah =
    "Setengah: satu bagian dari benda utuh yang dibagi 2 sama besar. Seperempat: satu bagian dari benda utuh yang dibagi 4 sama besar. Setengah kumpulan: bagi menjadi 2 kelompok sama banyak.";
  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah={naskah} onBicara={onBicara} />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-3 text-center ring-2 ring-amber-200">
          <LingkaranPecahan potong={2} diwarnai={1} />
          <p className="mt-2 text-sm font-black text-amber-900">Setengah 1/2</p>
          <p className="text-xs font-semibold text-slate-600">1 bagian dari 2 sama besar</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center ring-2 ring-amber-200">
          <LingkaranPecahan potong={4} diwarnai={1} />
          <p className="mt-2 text-sm font-black text-amber-900">Seperempat 1/4</p>
          <p className="text-xs font-semibold text-slate-600">1 bagian dari 4 sama besar</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center ring-2 ring-amber-200">
          <p className="text-2xl">🍓🍓🍓 | 🍓🍓🍓</p>
          <p className="mt-2 text-sm font-black text-amber-900">Setengah kumpulan</p>
          <p className="text-xs font-semibold text-slate-600">2 kelompok sama banyak</p>
        </div>
      </div>
      <p className="text-center text-base font-black text-amber-900">Sama besar, sama banyak.</p>
    </div>
  );
}

function AdeganEvaluasi({
  kirimEvent,
  onBicara,
  onLulus,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
  onLulus: (catatan: string) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [skor, setSkor] = useState(0);
  const [pasangan, setPasangan] = useState<Record<string, string>>({});
  const mic7 = useMic((teks) => {
    const ok = cocokSuara(teks, ["6", "enam"]);
    if (ok) setSkor((n) => n + 1);
    kirimEvent("EVAL_ANSWERED", { pesan: ok ? "Enam sosis. Setengah 3 berarti utuh 6." : "Kalau setengahnya 3, utuhnya 6.", benar: ok, soal: 7 });
  });
  const mic8 = useMic((teks) => {
    const ok = cocokSuara(teks, ["seperempat", "satu per empat", "1/4"]);
    if (ok) setSkor((n) => n + 1);
    kirimEvent("EVAL_ANSWERED", { pesan: ok ? "Seperempat. Satu dari empat kuning." : "Ucapkan seperempat.", benar: ok, soal: 8 });
  });
  const catat = (ok: boolean, pesan: string, soal: number) => {
    if (ok) setSkor((n) => n + 1);
    kirimEvent("EVAL_ANSWERED", { pesan, benar: ok, soal });
    if (soal === 10 && ok) onLulus("Evaluasi pecahan selesai. Kamu koki adil!");
  };
  const naskah = "Ada 10 soal seru tentang pecahan setengah dan seperempat. Perhatikan gambarnya. Pastikan bagiannya sama besar.";
  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah={naskah} onBicara={onBicara} />
      <p className="text-sm font-black text-amber-900">Skor {Math.min(skor, 10)} / 10</p>
      {nomor === 0 ? (
        <KuisPilih
          soal="Gambar A dan B dibagi 4 sama besar. Gambar C tidak sama. Bagian biru yang keduanya seperempat ada pada..."
          benar="A"
          anak={
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-black text-amber-900">
              <div>
                <PersegiBagian mode="silang" />
                A
              </div>
              <div>
                <PersegiBagian mode="diagonal" />
                B
              </div>
              <div>
                <PersegiBagian mode="tidak-sama" />
                C
              </div>
            </div>
          }
          pilihan={[
            { id: "A", teks: "A dan B" },
            { id: "B", teks: "A dan C" },
            { id: "C", teks: "B dan C" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "A dan B sama besar. C tidak adil." : "Cari dua gambar yang potongannya sama.", 1)}
        />
      ) : null}
      {nomor === 1 ? (
        <KuisPilih
          soal="Rara makan 1/2 semangka. Bimo makan 1/4. Siapa makan lebih besar?"
          benar="A"
          anak={
            <div className="grid grid-cols-2 gap-2">
              <LingkaranPecahan potong={2} diwarnai={1} />
              <LingkaranPecahan potong={4} diwarnai={1} />
            </div>
          }
          pilihan={[
            { id: "A", teks: "Rara (1/2)" },
            { id: "B", teks: "Bimo (1/4)" },
            { id: "C", teks: "Sama besar" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Rara. Setengah lebih besar." : "Bandingkan ukurannya.", 2)}
        />
      ) : null}
      {nomor === 2 ? (
        <KuisPilih
          soal="Satu segitiga kecil bernilai seperempat. Berapa segitiga supaya utuh?"
          benar="C"
          pilihan={[
            { id: "A", teks: "2 segitiga" },
            { id: "B", teks: "3 segitiga" },
            { id: "C", teks: "4 segitiga" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Empat seperempat menjadi utuh." : "Seperempat artinya 4 bagian.", 3)}
        />
      ) : null}
      {nomor === 3 ? (
        <KuisPilih
          soal="Ibu punya 8 apel. Setengah ke Nenek. Rara makan 1 dari sisa. Sisa Ibu?"
          benar="B"
          anak={<p className="text-center text-2xl">🍎🍎🍎🍎 🍎🍎🍎🍎</p>}
          pilihan={[
            { id: "A", teks: "4 apel" },
            { id: "B", teks: "3 apel" },
            { id: "C", teks: "2 apel" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Setengah 8 adalah 4. 4 kurang 1 sama dengan 3." : "Setengah dulu, lalu kurangi 1.", 4)}
        />
      ) : null}
      {nomor === 4 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Pasangkan setengah kumpulan.</p>
          {[
            { id: "lebah", tampil: "🐝🐝🐝🐝", benar: "2" },
            { id: "ikan", tampil: "🐟🐟🐟🐟🐟🐟🐟🐟", benar: "4" },
            { id: "balon", tampil: "🎈×10", benar: "5" },
          ].map((item) => (
            <div key={item.id} className="flex flex-wrap items-center gap-2 rounded-2xl bg-white px-3 py-2">
              <span className="text-sm font-black">{item.tampil}</span>
              {["2", "4", "5"].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    const baru = { ...pasangan, [item.id]: n };
                    setPasangan(baru);
                    const ok = baru.lebah === "2" && baru.ikan === "4" && baru.balon === "5";
                    if (ok) catat(true, "Semua cocok! 4→2, 8→4, 10→5.", 5);
                  }}
                  className={`min-h-12 min-w-12 rounded-xl text-sm font-black ${pasangan[item.id] === n ? "bg-emerald-500 text-white" : "bg-amber-800 text-white"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      {nomor === 5 ? (
        <KuisPilih
          soal='Segitiga dipotong mendatar. Atas kecil, bawah lebar. Bimo bilang bagian atas bernilai setengah. Bimo benar?'
          benar="B"
          anak={<SegitigaTidakSama />}
          pilihan={[
            { id: "A", teks: "Benar" },
            { id: "B", teks: "Salah" },
          ]}
          onHasil={(ok) => catat(ok, ok ? "Salah. Tidak sama besar." : "Lihat atas kecil, bawah lebar.", 6)}
        />
      ) : null}
      {nomor === 6 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Setengah sosis Bimo adalah 3. Berapa seluruh sosis mula-mula?</p>
          <p className="text-center text-2xl">🌭🌭🌭 | ☐ ☐ ☐</p>
          <TombolMikrofon
            menyimak={mic7.menyimak}
            onMulai={mic7.mulai}
            onUji={() => catat(true, "Enam sosis. Setengah 3 berarti utuh 6.", 7)}
            labelUji="Enam"
          />
        </div>
      ) : null}
      {nomor === 7 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">1 bagian kuning dari 4 bagian lingkaran. Ucapkan pecahannya.</p>
          <LingkaranPecahan potong={4} diwarnai={1} />
          <TombolMikrofon
            menyimak={mic8.menyimak}
            onMulai={mic8.mulai}
            onUji={() => catat(true, "Seperempat. Satu dari empat kuning.", 8)}
            labelUji="Seperempat"
          />
        </div>
      ) : null}
      {nomor === 8 ? (
        <KanvasTugas
          kunci="e9-kanvas"
          jenis="lingkar"
          label="Lingkari 3 kupu-kupu dari 6 kupu-kupu."
          targetLingkar={3}
          gridLingkar={{ baris: 2, kolom: 3 }}
          latar={<p className="absolute inset-0 flex flex-wrap content-center justify-center gap-3 p-3 text-3xl">🦋🦋🦋 🦋🦋🦋</p>}
          onHasil={(ok) => catat(ok, ok ? "Tiga kupu-kupu. Setengah dari 6." : "Lingkari 3 kupu-kupu.", 9)}
        />
      ) : null}
      {nomor === 9 ? (
        <KanvasTugas
          kunci="e10-kanvas"
          jenis="tulis"
          label="Tuliskan setengah dari 12 telur."
          tulisKunci={["6"]}
          latar={<p className="absolute inset-x-0 top-2 text-center text-xl">🥚🥚🥚🥚🥚🥚 | 🥚🥚🥚🥚🥚🥚</p>}
          onHasil={(ok) => catat(ok, ok ? "6. Setengah dari 12." : "Tulis angka 6.", 10)}
        />
      ) : null}
      <NavLangkah
        indeks={nomor}
        total={10}
        onPrev={() => setNomor((n) => Math.max(0, n - 1))}
        onNext={() => {
          if (nomor >= 9) onLulus("Evaluasi pecahan selesai. Kamu koki adil!");
          else setNomor((n) => n + 1);
        }}
      />
    </div>
  );
}
