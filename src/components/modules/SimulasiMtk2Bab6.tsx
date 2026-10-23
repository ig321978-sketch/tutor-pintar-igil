"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SCENE_START"
  | "SIZE_WEIGHT_TRAP_TESTED"
  | "BALANCE_ACHIEVED"
  | "CLOCK_TIME_CHANGED"
  | "DURATION_CALCULATED"
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
type TabLab = "timbangan" | "jam" | "durasi" | "kuis" | "evaluasi";
type Titik = { x: number; y: number };
type JenisKanvas = "tulis" | "lingkar-kiri" | "lingkar-kanan" | "lingkar-sel" | "jarum";
type ModeTimbang = "banding" | "ukur";
type BendaId = "semangka" | "nanas" | "susu" | "batu" | "balon" | "mobil";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "timbangan", label: "1. Timbang" },
  { id: "jam", label: "2. Jam" },
  { id: "durasi", label: "3. Durasi" },
  { id: "kuis", label: "4. Kuis" },
  { id: "evaluasi", label: "5. Uji" },
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

type Benda = { id: BendaId; nama: string; ikon: string; berat: number; skala: number };

const BENDA: Benda[] = [
  { id: "semangka", nama: "Semangka", ikon: "🍉", berat: 9, skala: 1.45 },
  { id: "nanas", nama: "Nanas", ikon: "🍍", berat: 6, skala: 1.15 },
  { id: "susu", nama: "Kotak Susu", ikon: "🥛", berat: 4, skala: 1 },
  { id: "batu", nama: "Batu Kecil", ikon: "🪨", berat: 5, skala: 0.55 },
  { id: "balon", nama: "Balon Udara Besar", ikon: "🎈", berat: 1, skala: 1.85 },
];

const BENDA_UKUR: Benda[] = [
  ...BENDA,
  { id: "mobil", nama: "Mobil Mainan", ikon: "🚗", berat: 6, skala: 1.1 },
];

const PASANGAN_DURASI = [
  {
    id: "cuci",
    kiri: { nama: "Mencuci Tangan", ikon: "🧼", lama: false, gerak: "cepat" },
    kanan: { nama: "Tidur Malam", ikon: "😴", lama: true, gerak: "lambat" },
  },
  {
    id: "topi",
    kiri: { nama: "Memakai Topi", ikon: "🧢", lama: false, gerak: "cepat" },
    kanan: { nama: "Belajar di Sekolah", ikon: "📚", lama: true, gerak: "lambat" },
  },
  {
    id: "sepatu",
    kiri: { nama: "Mengikat Tali Sepatu", ikon: "👟", lama: false, gerak: "cepat" },
    kanan: { nama: "Perjalanan Kereta Antar Kota", ikon: "🚂", lama: true, gerak: "lambat" },
  },
] as const;

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
    .replace(/pukul\s*/g, "pukul")
    .replace(/jam\s*/g, "jam")
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

function sisiTinta(kanvas: HTMLCanvasElement): "kiri" | "kanan" | "kosong" {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return "kosong";
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const kiri = hitungTinta(data, width, 0, 0, width / 2, height);
  const kanan = hitungTinta(data, width, width / 2, 0, width, height);
  if (kiri + kanan < 10) return "kosong";
  return kiri >= kanan ? "kiri" : "kanan";
}

function selTintaTerbanyak(kanvas: HTMLCanvasElement, kolom: number): number {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return -1;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const pad = width * 0.06;
  const selW = (width - pad * 2) / kolom;
  let terbaik = -1;
  let max = 8;
  for (let c = 0; c < kolom; c++) {
    const n = hitungTinta(data, width, pad + c * selW, height * 0.12, pad + (c + 1) * selW, height * 0.88);
    if (n > max) {
      max = n;
      terbaik = c;
    }
  }
  return terbaik;
}

function tintaArahJam(kanvas: HTMLCanvasElement, jamTarget: number): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const target = (jamTarget / 12) * Math.PI * 2 - Math.PI / 2;
  let hit = 0;
  let lain = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (!tintaPixel(data, (y * width + x) * 4)) continue;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < Math.min(width, height) * 0.1) continue;
      let d = Math.abs(Math.atan2(dy, dx) - target);
      if (d > Math.PI) d = Math.PI * 2 - d;
      if (d < 0.5) hit += 1;
      else lain += 1;
    }
  }
  return hit > 14 && hit > lain * 0.35;
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

function IgilKaptenSvg({ bicara }: { bicara: boolean }) {
  return (
    <svg viewBox="0 0 80 114" width="82" height="116" aria-hidden className={bicara ? "igil-kedip" : ""}>
      <ellipse cx="40" cy="108" rx="18" ry="5" fill="#000" opacity="0.12" />
      <ellipse cx="40" cy="16" rx="26" ry="11" fill="#1d4ed8" />
      <rect x="12" y="16" width="56" height="11" rx="2" fill="#1e3a8a" />
      <circle cx="40" cy="14" r="5" fill="#fbbf24" />
      <ellipse cx="40" cy="78" rx="24" ry="22" fill="#c2410c" />
      <circle cx="40" cy="50" r="22" fill="#ea580c" />
      <circle cx="31" cy="48" r="9" fill="#fff" />
      <circle cx="49" cy="48" r="9" fill="#fff" />
      <circle cx="32" cy="50" r="4.2" fill="#1e1b4b" />
      <circle cx="50" cy="50" r="4.2" fill="#1e1b4b" />
      <path d="M40 54 L47 62 L33 62 Z" fill="#fbbf24" />
      <text x="40" y="98" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1e3a8a">
        KAPTEN
      </text>
    </svg>
  );
}

function SudutKapten({ pesan, sedangBicara, onUlang }: { pesan: string; sedangBicara: boolean; onUlang: () => void }) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-30 flex max-w-[min(100%,24rem)] items-end gap-2">
      <div className="shrink-0">
        <IgilKaptenSvg bicara={sedangBicara} />
      </div>
      <div className="mb-3 rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-lg ring-2 ring-sky-300">
        <p className="text-sm font-bold leading-snug text-sky-950">{pesan}</p>
        <button
          type="button"
          onClick={onUlang}
          className={`pointer-events-auto mt-1 inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl px-3 text-xs font-black ${
            sedangBicara ? "bg-emerald-400 text-emerald-950" : "bg-sky-400 text-sky-950"
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
      className="z-20 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#1C01A5] px-4 text-sm font-black text-white hover:bg-[#16017a]"
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
          menyimak ? "igil-kedip bg-rose-500" : "bg-[#1C01A5]"
        }`}
      >
        {menyimak ? "Mendengar..." : "🎤 Ucapkan"}
      </button>
      <button
        type="button"
        onClick={onUji}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-100 px-3 text-xs font-black text-sky-900 ring-2 ring-sky-300"
      >
        Uji suara: {labelUji}
      </button>
    </div>
  );
}

function NavLangkah({
  indeks,
  total,
  onPrev,
  onNext,
}: {
  indeks: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative z-20 flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={indeks === 0}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200 disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <p className="text-sm font-black text-[#1C01A5]">
        {indeks + 1} / {total}
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={indeks >= total - 1}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1C01A5] px-4 text-sm font-black text-white disabled:opacity-40"
      >
        Berikutnya
      </button>
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
              pilih === item.id ? (item.id === benar ? "bg-emerald-500 text-white" : "bg-rose-500 text-white") : "bg-[#1C01A5] text-white"
            }`}
          >
            {item.teks}
          </button>
        ))}
      </div>
    </div>
  );
}

function KanvasTugas({
  kunci,
  jenis,
  latar,
  label,
  tulisKunci = [],
  jamTarget,
  selTarget,
  selKolom = 3,
  onHasil,
}: {
  kunci: string;
  jenis: JenisKanvas;
  latar?: ReactNode;
  label: string;
  tulisKunci?: string[];
  jamTarget?: number;
  selTarget?: number;
  selKolom?: number;
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

  const titikDari = (event: PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const mulai = (event: PointerEvent<HTMLCanvasElement>) => {
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

  const geser = (event: PointerEvent<HTMLCanvasElement>) => {
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
    if (jenis === "tulis") {
      const angka = kenaliAngkaKanvas(kanvas);
      benar = tulisKunci.some((k) => angka === k || angka.includes(k));
    }
    if (jenis === "lingkar-kiri") benar = sisiTinta(kanvas) === "kiri";
    if (jenis === "lingkar-kanan") benar = sisiTinta(kanvas) === "kanan";
    if (jenis === "lingkar-sel" && selTarget != null) benar = selTintaTerbanyak(kanvas, selKolom) === selTarget;
    if (jenis === "jarum" && jamTarget != null) benar = tintaArahJam(kanvas, jamTarget);
    setPesan(benar ? "Benar! Coretanmu rapi." : "Belum tepat. Hapus, lalu coba lagi.");
    onHasil(benar);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <div className="relative mx-auto h-52 max-w-md overflow-hidden rounded-2xl bg-[#F8FBFF] ring-2 ring-sky-300 sm:h-60">
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
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200"
        >
          Hapus Coretan
        </button>
        <button type="button" onClick={periksa} className="inline-flex min-h-12 items-center rounded-2xl bg-[#1C01A5] px-4 text-sm font-black text-white">
          Periksa Jawaban
        </button>
      </div>
      {pesan ? <p className={`text-sm font-black ${pesan.startsWith("Benar") ? "text-emerald-700" : "text-rose-700"}`}>{pesan}</p> : null}
    </div>
  );
}

function TimbanganPhet({
  kiri,
  kanan,
  beratKiri,
  beratKanan,
}: {
  kiri: ReactNode;
  kanan: ReactNode;
  beratKiri: number;
  beratKanan: number;
}) {
  const selisih = beratKiri - beratKanan;
  const miring = Math.max(-18, Math.min(18, selisih * 2.2));
  const lurus = beratKiri === beratKanan && beratKiri > 0;
  return (
    <div className="mx-auto w-full max-w-lg">
      <svg viewBox="0 0 360 210" className="mx-auto h-48 w-full sm:h-56" aria-hidden>
        <ellipse cx="180" cy="198" rx="70" ry="8" fill="#1e3a8a" opacity="0.18" />
        <rect x="170" y="108" width="20" height="86" rx="3" fill="#92400e" />
        <circle cx="180" cy="108" r="10" fill="#1e3a8a" />
        <line
          x1="180"
          y1="108"
          x2={180 + Math.sin((miring * Math.PI) / 180) * 22}
          y2={88 - Math.cos((miring * Math.PI) / 180) * 18}
          stroke="#dc2626"
          strokeWidth="4"
          strokeLinecap="round"
          className="origin-center"
          style={{ transition: "all 500ms ease" }}
        />
        <g
          style={{
            transform: `rotate(${miring}deg)`,
            transformOrigin: "180px 108px",
            transition: "transform 500ms ease",
          }}
        >
          <rect x="38" y="102" width="284" height="12" rx="6" fill="#b45309" />
          <rect x="46" y="78" width="70" height="44" rx="8" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
          <rect x="244" y="78" width="70" height="44" rx="8" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
        </g>
        <text x="180" y="28" textAnchor="middle" fontSize="14" fontWeight="800" fill={lurus ? "#047857" : "#1e3a8a"}>
          {lurus ? "SEIMBANG LURUS" : miring > 2 ? "KIRI TURUN" : miring < -2 ? "KANAN TURUN" : "SIAP"}
        </text>
      </svg>
      <div className="-mt-28 grid grid-cols-2 gap-6 px-8 sm:-mt-32">
        <div className="flex min-h-16 items-end justify-center text-center">{kiri}</div>
        <div className="flex min-h-16 items-end justify-center text-center">{kanan}</div>
      </div>
    </div>
  );
}

function IkonBenda({ benda }: { benda: Benda }) {
  return (
    <span className="inline-block leading-none" style={{ fontSize: `${1.6 * benda.skala}rem` }} title={`${benda.nama} = ${benda.berat} kelereng`}>
      {benda.ikon}
    </span>
  );
}

function langitDariJam(jam: number): { label: string; kelas: string; ikon: string } {
  if (jam >= 5 && jam <= 10) return { label: "Pagi", kelas: "from-sky-200 to-amber-100", ikon: "☀️" };
  if (jam === 11 || jam === 12) return { label: "Siang", kelas: "from-amber-200 to-yellow-100", ikon: "🌤️" };
  if (jam >= 1 && jam <= 4) return { label: "Sore", kelas: "from-orange-200 to-rose-100", ikon: "🌅" };
  return { label: "Malam", kelas: "from-indigo-300 to-slate-400", ikon: "🌙" };
}

function busurJam(mulai: number, selesai: number): string {
  const polar = (jam: number, r: number) => {
    const a = (jam / 12) * Math.PI * 2 - Math.PI / 2;
    return [110 + r * Math.cos(a), 110 + r * Math.sin(a)] as const;
  };
  const durasi = (selesai - mulai + 12) % 12 || 12;
  const [x1, y1] = polar(mulai, 78);
  const [x2, y2] = polar(selesai, 78);
  const besar = durasi > 6 ? 1 : 0;
  return `M ${x1} ${y1} A 78 78 0 ${besar} 1 ${x2} ${y2}`;
}

function JamStasiun({
  jam,
  tampilPendek = true,
  mulai,
  selesai,
  hitungDurasi,
  onPilihJam,
  kecil = false,
}: {
  jam: number;
  tampilPendek?: boolean;
  mulai?: number;
  selesai?: number;
  hitungDurasi?: boolean;
  onPilihJam?: (n: number) => void;
  kecil?: boolean;
}) {
  const sudutJam = (jam / 12) * 360;
  const langit = langitDariJam(jam);
  const durasi = mulai != null && selesai != null ? (selesai - mulai + 12) % 12 : 0;
  return (
    <div className={`relative mx-auto rounded-full bg-gradient-to-b ${langit.kelas} p-2 ring-4 ring-sky-400 ${kecil ? "h-48 w-48" : "h-72 w-72"}`}>
      <svg viewBox="0 0 220 220" className="h-full w-full" aria-hidden>
        <circle cx="110" cy="110" r="100" fill="#fff" stroke="#1e3a8a" strokeWidth="6" />
        {hitungDurasi && mulai != null && selesai != null && durasi > 0 ? (
          <path d={busurJam(mulai, selesai)} fill="none" stroke="#facc15" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
        ) : null}
        {Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const a = (n / 12) * Math.PI * 2 - Math.PI / 2;
          const x = 110 + 78 * Math.cos(a);
          const y = 110 + 78 * Math.sin(a);
          return (
            <text key={n} x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#1e3a8a">
              {n}
            </text>
          );
        })}
        <line x1="110" y1="110" x2="110" y2="28" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
        {tampilPendek ? (
          <line
            x1="110"
            y1="110"
            x2={110 + 48 * Math.sin((sudutJam * Math.PI) / 180)}
            y2={110 - 48 * Math.cos((sudutJam * Math.PI) / 180)}
            stroke="#dc2626"
            strokeWidth="7"
            strokeLinecap="round"
            style={{ transition: "all 400ms ease" }}
          />
        ) : null}
        <circle cx="110" cy="110" r="7" fill="#1e3a8a" />
      </svg>
      {onPilihJam
        ? Array.from({ length: 12 }, (_, i) => {
            const n = i + 1;
            const a = (n / 12) * Math.PI * 2 - Math.PI / 2;
            return (
              <button
                key={n}
                type="button"
                onClick={() => onPilihJam(n)}
                className="absolute z-20 flex min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-black text-transparent"
                style={{ left: `${50 + 41 * Math.cos(a)}%`, top: `${50 + 41 * Math.sin(a)}%` }}
                aria-label={`Pukul ${n}`}
              >
                {n}
              </button>
            );
          })
        : null}
      <p className="absolute inset-x-0 -bottom-8 text-center text-sm font-black text-[#1C01A5]">
        {langit.ikon} {langit.label} · Pukul {String(jam).padStart(2, "0")}.00
      </p>
    </div>
  );
}

function AdeganTimbangan({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [mode, setMode] = useState<ModeTimbang>("banding");
  const [kiriId, setKiriId] = useState<BendaId>("semangka");
  const [kananId, setKananId] = useState<BendaId>("nanas");
  const [ukurId, setUkurId] = useState<BendaId>("nanas");
  const [kelereng, setKelereng] = useState(0);
  const [balok, setBalok] = useState(0);
  const jebakanRef = useRef("");
  const seimbangRef = useRef("");
  const kiri = BENDA.find((b) => b.id === kiriId) ?? BENDA[0];
  const kanan = BENDA.find((b) => b.id === kananId) ?? BENDA[1];
  const target = BENDA_UKUR.find((b) => b.id === ukurId) ?? BENDA_UKUR[1];
  const kananUkur = kelereng + balok * 2;
  const beratKiri = mode === "banding" ? kiri.berat : target.berat;
  const beratKanan = mode === "banding" ? kanan.berat : kananUkur;
  const lurus = beratKiri === beratKanan && beratKanan > 0;

  useEffect(() => {
    const pasangan = [kiriId, kananId].sort().join("|");
    const jebakan = (kiriId === "balon" && kananId === "batu") || (kiriId === "batu" && kananId === "balon");
    if (mode === "banding" && jebakan && jebakanRef.current !== pasangan) {
      jebakanRef.current = pasangan;
      kirimEvent("SIZE_WEIGHT_TRAP_TESTED", {
        pesan: "Lihat! Walaupun Balon ukurannya besar sekali, tapi Batu Kecil membuat timbangan turun ke bawah. Jadi ukuran besar belum tentu lebih berat ya!",
        kiri: kiriId,
        kanan: kananId,
      });
    }
  }, [mode, kiriId, kananId, kirimEvent]);

  useEffect(() => {
    if (mode !== "ukur" || !lurus) return;
    const kunci = `${ukurId}-${kananUkur}`;
    if (seimbangRef.current === kunci) return;
    seimbangRef.current = kunci;
    kirimEvent("BALANCE_ACHIEVED", {
      pesan: `Hore, timbangannya sudah lurus sejajar! Artinya berat 1 ${target.nama} sama dengan ${kananUkur} kelereng.`,
      itemName: target.nama,
      marbleCount: kananUkur,
    });
  }, [mode, lurus, ukurId, kananUkur, target.nama, kirimEvent]);

  const mic = useMic((teks) => {
    const lebihBerat = beratKiri > beratKanan ? "lebih berat" : beratKanan > beratKiri ? "lebih ringan" : "sama berat";
    const ok =
      (lebihBerat === "lebih berat" && cocokSuara(teks, ["lebih berat", "berat", "turun"])) ||
      (lebihBerat === "lebih ringan" && cocokSuara(teks, ["lebih ringan", "ringan", "naik"])) ||
      (lebihBerat === "sama berat" && cocokSuara(teks, ["sama berat", "sama", "seimbang", "lurus"]));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Tepat! Nampan kiri ${lebihBerat}.` : "Coba ucapkan lebih berat, lebih ringan, atau sama berat.",
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Pilih benda di nampan kiri dan kanan. Yang lebih berat membuat nampan turun. Ukuran besar belum tentu lebih berat. Isi kelereng sampai lurus untuk mengukur."
        onBicara={onBicara}
      />
      <div className="relative z-20 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("banding")}
          className={`min-h-12 rounded-2xl px-4 text-sm font-black ${mode === "banding" ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
        >
          Bandingkan 2 Benda
        </button>
        <button
          type="button"
          onClick={() => setMode("ukur")}
          className={`min-h-12 rounded-2xl px-4 text-sm font-black ${mode === "ukur" ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
        >
          Ukur dengan Kelereng
        </button>
      </div>
      <TimbanganPhet
        beratKiri={beratKiri}
        beratKanan={beratKanan}
        kiri={mode === "banding" ? <IkonBenda benda={kiri} /> : <IkonBenda benda={target} />}
        kanan={
          mode === "banding" ? (
            <IkonBenda benda={kanan} />
          ) : (
            <span className="text-lg leading-none">
              {"🔵".repeat(Math.min(kelereng, 10))}
              {"🟫".repeat(Math.min(balok, 6))}
            </span>
          )
        }
      />
      {mode === "banding" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {(["kiri", "kanan"] as const).map((sisi) => (
            <div key={sisi} className="rounded-2xl bg-white p-3 ring-2 ring-sky-100">
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Nampan {sisi}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {BENDA.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => (sisi === "kiri" ? setKiriId(item.id) : setKananId(item.id))}
                    className={`min-h-12 rounded-xl px-3 text-left text-sm font-bold ${(sisi === "kiri" ? kiriId : kananId) === item.id ? "bg-[#1C01A5] text-white" : "bg-sky-50 text-sky-950"}`}
                  >
                    {item.ikon} {item.nama.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 rounded-2xl bg-white p-3 ring-2 ring-sky-100">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Benda target di kiri</p>
          <div className="flex flex-wrap gap-2">
            {BENDA_UKUR.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setUkurId(item.id);
                  setKelereng(0);
                  setBalok(0);
                  seimbangRef.current = "";
                }}
                className={`min-h-12 rounded-xl px-3 text-sm font-bold ${ukurId === item.id ? "bg-[#1C01A5] text-white" : "bg-sky-50 text-sky-950"}`}
              >
                {item.ikon} {item.nama}
              </button>
            ))}
          </div>
          <p className="text-sm font-black text-[#1C01A5]">Kanan: {kananUkur} kelereng (balok = 2)</p>
          <div className="relative z-20 flex flex-wrap gap-2">
            <button type="button" onClick={() => setKelereng((n) => n + 1)} className="min-h-12 rounded-2xl bg-amber-400 px-4 text-sm font-black text-amber-950">
              + 1 Kelereng
            </button>
            <button type="button" onClick={() => setKelereng((n) => Math.max(0, n - 1))} className="min-h-12 rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200">
              − 1 Kelereng
            </button>
            <button type="button" onClick={() => setBalok((n) => n + 1)} className="min-h-12 rounded-2xl bg-orange-500 px-4 text-sm font-black text-white">
              + 1 Balok Kayu
            </button>
          </div>
        </div>
      )}
      <KanvasTugas
        kunci={`timbang-${mode}-${beratKanan}`}
        jenis="tulis"
        label="Tuliskan jumlah kelereng di nampan kanan, atau angka berat benda yang lebih berat."
        tulisKunci={mode === "ukur" ? [String(kananUkur), String(target.berat)] : [String(Math.max(beratKiri, beratKanan))]}
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? "Angkanya cocok dengan timbangan!" : "Lihat jumlah kelereng atau berat yang lebih besar.",
            benar: ok,
          })
        }
      />
      <p className="text-sm font-bold text-slate-700">Ucapkan: lebih berat, lebih ringan, atau sama berat.</p>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: beratKiri === beratKanan ? "Sama berat!" : beratKiri > beratKanan ? "Kiri lebih berat." : "Kiri lebih ringan.",
            benar: true,
          })
        }
        labelUji={beratKiri === beratKanan ? "Sama berat" : beratKiri > beratKanan ? "Lebih berat" : "Lebih ringan"}
      />
    </div>
  );
}

function AdeganJam({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [jam, setJam] = useState(8);
  const [modeDurasi, setModeDurasi] = useState(false);
  const [gambarJarum, setGambarJarum] = useState(false);
  const [mulai, setMulai] = useState(7);
  const [selesai, setSelesai] = useState(9);
  const durasi = (selesai - mulai + 12) % 12;

  const ubahJam = (n: number) => {
    const next = ((n - 1 + 12) % 12) + 1;
    setJam(next);
    kirimEvent("CLOCK_TIME_CHANGED", {
      pesan: `Jarum panjang di angka 12 dan jarum pendek menunjuk angka ${next}. Sekarang adalah Pukul ${next} tepat!`,
      hour: next,
    });
  };

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [String(jam), `pukul ${jam}`, `jam ${jam}`, angkaKata(jam)]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Benar, pukul ${jam} tepat.` : `Ucapkan pukul ${angkaKata(jam)}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="space-y-4">
      <TombolDengarGuru
        naskah="Jarum panjang di angka 12. Jarum pendek menunjuk jam. Putar maju atau mundur. Hitung lama kegiatan dari jam mulai sampai jam selesai."
        onBicara={onBicara}
      />
      <div className="pb-10 pt-2">
        <JamStasiun
          jam={modeDurasi ? selesai : jam}
          tampilPendek={!gambarJarum}
          mulai={mulai}
          selesai={selesai}
          hitungDurasi={modeDurasi}
          onPilihJam={ubahJam}
        />
      </div>
      <div className="relative z-20 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => ubahJam(jam - 1)} className="min-h-12 rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200">
          −1 Jam
        </button>
        <button type="button" onClick={() => ubahJam(jam + 1)} className="min-h-12 rounded-2xl bg-[#1C01A5] px-4 text-sm font-black text-white">
          +1 Jam
        </button>
        <button
          type="button"
          onClick={() => setModeDurasi((v) => !v)}
          className={`min-h-12 rounded-2xl px-4 text-sm font-black ${modeDurasi ? "bg-amber-400 text-amber-950" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
        >
          Hitung Lama Kegiatan
        </button>
        <button
          type="button"
          onClick={() => setGambarJarum((v) => !v)}
          className={`min-h-12 rounded-2xl px-4 text-sm font-black ${gambarJarum ? "bg-rose-500 text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
        >
          Latihan Gambar Jarum
        </button>
      </div>
      {modeDurasi ? (
        <div className="rounded-2xl bg-white p-3 ring-2 ring-amber-200">
          <p className="text-sm font-black text-[#1C01A5]">Kalkulator Durasi Jam</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <label className="text-xs font-bold text-slate-600">
              Jam mulai
              <select
                value={mulai}
                onChange={(e) => setMulai(Number(e.target.value))}
                className="mt-1 min-h-12 w-full rounded-xl bg-sky-50 px-3 text-sm font-black text-[#1C01A5]"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Pukul {String(i + 1).padStart(2, "0")}.00
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-slate-600">
              Jam selesai
              <select
                value={selesai}
                onChange={(e) => setSelesai(Number(e.target.value))}
                className="mt-1 min-h-12 w-full rounded-xl bg-sky-50 px-3 text-sm font-black text-[#1C01A5]"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Pukul {String(i + 1).padStart(2, "0")}.00
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="button"
            onClick={() =>
              kirimEvent("DURATION_CALCULATED", {
                pesan: `Dari pukul ${mulai} sampai pukul ${selesai}, jarum pendek bergerak ${durasi} langkah. Jadi lama kegiatannya adalah ${durasi} jam!`,
                start: mulai,
                end: selesai,
                duration: durasi,
              })
            }
            className="relative z-20 mt-2 min-h-12 w-full rounded-2xl bg-amber-400 text-sm font-black text-amber-950"
          >
            Hitung: {durasi} jam
          </button>
        </div>
      ) : null}
      {gambarJarum ? (
        <KanvasTugas
          kunci={`jarum-${jam}`}
          jenis="jarum"
          jamTarget={jam}
          label={`Gambar jarum pendek ke angka ${jam} (jarum panjang sudah di 12).`}
          latar={<JamStasiun jam={jam} tampilPendek={false} kecil />}
          onHasil={(ok) =>
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: ok ? `Jarum pendek menuju ${jam}. Pukul ${jam} tepat!` : "Gambar garis dari tengah ke angka yang benar.",
              benar: ok,
            })
          }
        />
      ) : null}
      <p className="text-sm font-bold text-slate-700">Ucapkan pukul berapa sekarang.</p>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: `Pukul ${jam} tepat.`, benar: true })}
        labelUji={angkaKata(jam)}
      />
    </div>
  );
}

function angkaKata(n: number): string {
  const kata = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"];
  return kata[n] ?? String(n);
}

function AdeganDurasi({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [indeks, setIndeks] = useState(0);
  const [cariLama, setCariLama] = useState(true);
  const pasangan = PASANGAN_DURASI[indeks];
  const mic = useMic((teks) => {
    const butuh = cariLama ? ["lama", "lebih lama"] : ["sebentar", "lebih sebentar"];
    const ok = cocokSuara(teks, butuh);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Benar, itu kegiatan yang ${cariLama ? "lebih lama" : "lebih sebentar"}.` : `Ucapkan ${cariLama ? "lama" : "sebentar"}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Bandingkan dua kegiatan. Yang selesai dalam hitungan detik itu sebentar. Yang butuh berjam-jam itu lama. Lingkari yang diminta, lalu ucapkan jawabannya."
        onBicara={onBicara}
      />
      <div className="relative z-20 flex flex-wrap gap-2">
        {PASANGAN_DURASI.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndeks(i)}
            className={`min-h-12 rounded-2xl px-3 text-xs font-black sm:text-sm ${i === indeks ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
          >
            {item.kiri.nama.split(" ")[0]} vs {item.kanan.nama.split(" ")[0]}
          </button>
        ))}
      </div>
      <div className="relative z-20 flex gap-2">
        <button
          type="button"
          onClick={() => setCariLama(true)}
          className={`min-h-12 flex-1 rounded-2xl text-sm font-black ${cariLama ? "bg-amber-400 text-amber-950" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
        >
          Cari yang LEBIH LAMA
        </button>
        <button
          type="button"
          onClick={() => setCariLama(false)}
          className={`min-h-12 flex-1 rounded-2xl text-sm font-black ${!cariLama ? "bg-emerald-400 text-emerald-950" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}
        >
          Cari yang LEBIH SEBENTAR
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-3 text-center ring-2 ring-sky-200">
          <p className={`text-5xl igil-${pasangan.kiri.gerak}`}>{pasangan.kiri.ikon}</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">{pasangan.kiri.nama}</p>
          <p className="text-xs font-bold text-slate-500">Sebentar</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center ring-2 ring-sky-200">
          <p className={`text-5xl igil-${pasangan.kanan.gerak}`}>{pasangan.kanan.ikon}</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">{pasangan.kanan.nama}</p>
          <p className="text-xs font-bold text-slate-500">Lama</p>
        </div>
      </div>
      <KanvasTugas
        kunci={`durasi-${pasangan.id}-${cariLama ? "lama" : "sebentar"}`}
        jenis={cariLama ? "lingkar-kanan" : "lingkar-kiri"}
        label={`Lingkari kegiatan yang ${cariLama ? "LEBIH LAMA" : "LEBIH SEBENTAR"}.`}
        latar={
          <div className="absolute inset-0 grid grid-cols-2 place-items-center text-5xl">
            <span>{pasangan.kiri.ikon}</span>
            <span>{pasangan.kanan.ikon}</span>
          </div>
        }
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? "Lingkaran tepat!" : "Lingkari sisi kegiatan yang diminta.",
            benar: ok,
          })
        }
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: cariLama ? "Itu lebih lama." : "Itu lebih sebentar.",
            benar: true,
          })
        }
        labelUji={cariLama ? "Lama" : "Sebentar"}
      />
    </div>
  );
}

function AdeganKuis({
  kirimEvent,
  onBicara,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onBicara: (v: boolean) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [kelereng, setKelereng] = useState(0);
  const mobil = BENDA_UKUR.find((b) => b.id === "mobil")!;
  const lurus = kelereng === mobil.berat;
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, ["delapan", "8", "pukul delapan", "jam delapan"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Delapan. Pukul 8 tepat!" : "Ucapkan delapan.", benar: ok, soal: 2 });
    if (ok) kirimEvent("QUIZ_ANSWERED", { pesan: "Tantangan jam berhasil.", benar: true, soal: 2 }, false);
  });
  const mic3 = useMic((teks) => {
    const ok = cocokSuara(teks, ["sebentar", "minum", "air"]);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Minum air lebih sebentar." : "Ucapkan sebentar atau minum air.", benar: ok, soal: 3 });
    if (ok) kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan kuis selesai. Lencana masinis bersinar!" }, false);
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Tiga tantangan stasiun. Seimbangkan mobil mainan, gambar jarum pukul delapan, lalu lingkari kegiatan yang lebih sebentar."
        onBicara={onBicara}
      />
      <p className="text-sm font-black text-[#1C01A5]">Tantangan {nomor + 1} / 3</p>
      {nomor === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">1 Mobil Mainan = 6 kelereng di kiri. Tambah kelereng di kanan sampai lurus, lalu tulis 6.</p>
          <TimbanganPhet
            beratKiri={mobil.berat}
            beratKanan={kelereng}
            kiri={<IkonBenda benda={mobil} />}
            kanan={<span className="text-lg">{"🔵".repeat(Math.min(kelereng, 10))}</span>}
          />
          <div className="relative z-20 flex gap-2">
            <button type="button" onClick={() => setKelereng((n) => n + 1)} className="min-h-12 rounded-2xl bg-amber-400 px-4 text-sm font-black text-amber-950">
              + 1 Kelereng
            </button>
            <button type="button" onClick={() => setKelereng((n) => Math.max(0, n - 1))} className="min-h-12 rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200">
              − 1 Kelereng
            </button>
          </div>
          {lurus ? <p className="text-sm font-black text-emerald-700">Sudah lurus! Tulis angka 6.</p> : null}
          <KanvasTugas
            kunci="kuis-1"
            jenis="tulis"
            tulisKunci={["6"]}
            label="Tuliskan jumlah kelereng agar seimbang."
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Enam kelereng. Mobil seimbang!" : "Tulis angka 6.", benar: ok, soal: 1 })}
          />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Gambar jarum pendek untuk Pukul 08.00 tepat, lalu ucapkan delapan.</p>
          <KanvasTugas
            kunci="kuis-2-jam"
            jenis="jarum"
            jamTarget={8}
            label="Gambar jarum pendek ke angka 8."
            latar={<JamStasiun jam={8} tampilPendek={false} kecil />}
            onHasil={(ok) => kirimEvent("HANDWRITING_CHECKED", { pesan: ok ? "Jarum ke 8. Pukul 8 tepat!" : "Gambar garis ke angka 8.", benar: ok, soal: 2 })}
          />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Delapan. Pukul 8 tepat!", benar: true, soal: 2 })}
            labelUji="Delapan"
          />
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Lingkari yang LEBIH SEBENTAR, lalu ucapkan jawabannya.</p>
          <div className="grid grid-cols-2 gap-2 text-center text-sm font-black text-[#1C01A5]">
            <p>🥤 Minum Segelas Air</p>
            <p>🍰 Memasak Kue Bolu</p>
          </div>
          <KanvasTugas
            kunci="kuis-3"
            jenis="lingkar-kiri"
            label="Lingkari Minum Segelas Air di kiri."
            latar={
              <div className="absolute inset-0 grid grid-cols-2 place-items-center text-5xl">
                <span>🥤</span>
                <span>🍰</span>
              </div>
            }
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Minum air lebih sebentar." : "Kiri yang sebentar.", benar: ok, soal: 3 })}
          />
          <TombolMikrofon
            menyimak={mic3.menyimak}
            onMulai={mic3.mulai}
            onUji={() => kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan kuis selesai. Lencana masinis bersinar!" })}
            labelUji="Sebentar"
          />
        </div>
      ) : null}
      <NavLangkah indeks={nomor} total={3} onPrev={() => setNomor((n) => Math.max(0, n - 1))} onNext={() => setNomor((n) => Math.min(2, n + 1))} />
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
  const sudah = useRef<Set<number>>(new Set());
  const catat = (ok: boolean, pesan: string, soal: number) => {
    if (ok && !sudah.current.has(soal)) {
      sudah.current.add(soal);
      setSkor((n) => n + 1);
    }
    kirimEvent("EVAL_ANSWERED", { pesan, benar: ok, soal });
    if (soal === 5 && ok) onLulus("Evaluasi pengukuran selesai. Kamu masinis teliti!");
  };
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, ["sebelas", "11", "pukul sebelas", "jam sebelas"]);
    catat(ok, ok ? "Pukul sebelas tepat." : "Ucapkan sebelas.", 3);
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah="Lima soal juara. Amati timbangan dan jarum jam. Lingkari, tulis, atau ucapkan dengan teliti." onBicara={onBicara} />
      <p className="text-sm font-black text-[#1C01A5]">Skor {Math.min(skor, 5)} / 5</p>
      {nomor === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Timbangan A: semangka &gt; nanas. Timbangan B: nanas &gt; apel. Lingkari buah PALING BERAT.</p>
          <div className="grid grid-cols-2 gap-2">
            <TimbanganPhet beratKiri={9} beratKanan={6} kiri={<span className="text-3xl">🍉</span>} kanan={<span className="text-3xl">🍍</span>} />
            <TimbanganPhet beratKiri={6} beratKanan={3} kiri={<span className="text-3xl">🍍</span>} kanan={<span className="text-3xl">🍎</span>} />
          </div>
          <KanvasTugas
            kunci="e1"
            jenis="lingkar-sel"
            selKolom={3}
            selTarget={0}
            label="Lingkari Semangka."
            latar={
              <div className="absolute inset-0 grid grid-cols-3 place-items-center text-4xl">
                <span>🍉</span>
                <span>🍍</span>
                <span>🍎</span>
              </div>
            }
            onHasil={(ok) => catat(ok, ok ? "Semangka paling berat." : "Yang menang di kedua timbangan adalah semangka.", 1)}
          />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Kotak susu = 5 kelereng. Roti = 2 kelereng. Keduanya di kiri. Tulis kelereng di kanan.</p>
          <TimbanganPhet beratKiri={7} beratKanan={0} kiri={<span className="text-3xl">🥛🍞</span>} kanan={<span className="text-xl">?</span>} />
          <KanvasTugas
            kunci="e2"
            jenis="tulis"
            tulisKunci={["7"]}
            label="Tuliskan 7."
            onHasil={(ok) => catat(ok, ok ? "5 tambah 2 sama dengan 7." : "Jumlahkan 5 dan 2.", 2)}
          />
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Jarum pendek di 11, jarum panjang di 12. Ucapkan pukul berapa.</p>
          <JamStasiun jam={11} />
          <div className="h-8" />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => catat(true, "Pukul sebelas tepat.", 3)}
            labelUji="Sebelas"
          />
        </div>
      ) : null}
      {nomor === 3 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Belajar mulai pukul 03.00, selesai 1 jam kemudian. Tulis pukul selesai.</p>
          <JamStasiun jam={3} />
          <div className="h-8" />
          <KanvasTugas
            kunci="e4"
            jenis="tulis"
            tulisKunci={["4"]}
            label="Tuliskan angka 4."
            onHasil={(ok) => catat(ok, ok ? "Pukul 3 tambah 1 jam = pukul 4." : "Tambah 1 jam dari 3.", 4)}
          />
        </div>
      ) : null}
      {nomor === 4 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Batu kecil turun, balon besar naik. Lingkari yang LEBIH BERAT.</p>
          <TimbanganPhet beratKiri={5} beratKanan={1} kiri={<span className="text-2xl">🪨</span>} kanan={<span className="text-5xl">🎈</span>} />
          <KanvasTugas
            kunci="e5"
            jenis="lingkar-kiri"
            label="Lingkari Batu Kecil di kiri."
            latar={
              <div className="absolute inset-0 grid grid-cols-2 place-items-center">
                <span className="text-4xl">🪨</span>
                <span className="text-6xl">🎈</span>
              </div>
            }
            onHasil={(ok) => catat(ok, ok ? "Batu kecil lebih berat, meski ukurannya kecil." : "Yang turun lebih berat.", 5)}
          />
        </div>
      ) : null}
      <NavLangkah
        indeks={nomor}
        total={5}
        onPrev={() => setNomor((n) => Math.max(0, n - 1))}
        onNext={() => {
          if (nomor >= 4) onLulus("Evaluasi pengukuran selesai. Kamu masinis teliti!");
          else setNomor((n) => n + 1);
        }}
      />
    </div>
  );
}

export default function SimulasiMtk2Bab6({
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
  const [tab, setTab] = useState<TabLab>("timbangan");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanIgil, setPesanIgil] = useState("Halo petugas cilik! Yuk ukur berat dan baca jam bersama Kapten IGIL.");
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
      setLog((lama) => [{ waktu: jamSekarang(), jenis, payload }, ...lama].slice(0, 12));
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
    const pembukaAwal = "Halo petugas cilik! Yuk ukur berat dan baca jam bersama Kapten IGIL.";
    siapkanSuaraGuruIgil(pembukaAwal, { kelas, kelamin });
    kirimEvent("SCENE_START", { pesan: pembukaAwal, adegan: "timbangan" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pembuka: Record<TabLab, string> = {
    timbangan: "Pilih benda di dua nampan. Yang lebih berat turun. Isi kelereng sampai lurus untuk mengukur.",
    jam: "Jarum panjang di 12. Jarum pendek menunjuk jam. Putar, hitung durasi, atau gambar jarumnya.",
    durasi: "Bandingkan dua kegiatan. Lingkari yang lebih lama atau lebih sebentar.",
    kuis: "Tiga tantangan stasiun. Seimbangkan, gambar jam, lalu pilih yang sebentar.",
    evaluasi: "Lima soal juara. Amati timbangan dan jarum jam dengan saksama.",
  };

  const gantiTab = (id: TabLab) => {
    setTab(id);
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="rounded-[2rem] border-2 border-sky-100 bg-white shadow-xl shadow-sky-100/40">
      <style>{`
        @keyframes igil-kedip {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-6deg); }
        }
        @keyframes igil-cepat {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(-8deg); }
        }
        @keyframes igil-lambat {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-4px); opacity: 0.7; }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
        .igil-cepat { animation: igil-cepat 0.45s ease-in-out infinite; }
        .igil-lambat { animation: igil-lambat 2.4s ease-in-out infinite; }
      `}</style>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-[#1C01A5] to-sky-500 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Pengukuran: Berat dan Waktu</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuaraAktif((v) => !v);
            if (suaraAktif) hentikanSuaraGuruIgil();
          }}
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-sm font-bold ${
            suaraAktif ? "bg-sky-200 text-sky-950" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 bg-sky-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-[#1C01A5] shadow-sm" : "text-sky-800 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative h-[min(72vh,42rem)] bg-gradient-to-b from-sky-50 to-blue-100">
        <div className="h-full overflow-y-auto p-3 pb-32 sm:p-4">
          {tab === "timbangan" ? <AdeganTimbangan kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "jam" ? <AdeganJam kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "durasi" ? <AdeganDurasi kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "kuis" ? <AdeganKuis kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "evaluasi" ? <AdeganEvaluasi kirimEvent={kirimEvent} onBicara={setSedangBicara} onLulus={tandaiSelesai} /> : null}
        </div>
        <SudutKapten pesan={pesanIgil} sedangBicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
      </div>
      <div className="border-t-2 border-slate-200 bg-slate-900 p-4 text-slate-100">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-widest text-sky-300">Panel Log Event IGIL</p>
          <button type="button" onClick={() => setLog([])} className="min-h-12 rounded-xl bg-slate-700 px-3 text-xs font-bold text-white">
            Hapus log
          </button>
        </div>
        {log.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada event. Main di stasiun, pesan muncul di sini.</p>
        ) : (
          <ul className="max-h-40 space-y-2 overflow-y-auto pr-1">
            {log.map((baris, i) => (
              <li key={`${baris.waktu}-${baris.jenis}-${i}`} className="rounded-xl bg-slate-800 px-3 py-2">
                <p className="text-[11px] font-bold text-emerald-300">
                  {baris.waktu} · {baris.jenis}
                </p>
                <p className="text-sm text-slate-100">{baris.payload.pesan}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
