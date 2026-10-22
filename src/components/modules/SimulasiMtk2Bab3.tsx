"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SCENE_START"
  | "POLYGON_INSPECTED"
  | "CIRCLE_INSPECTED"
  | "STAMP_3D_TO_2D"
  | "SHAPE_DECOMPOSED"
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
type TabLab = "sisi" | "stempel" | "bengkel" | "kuis" | "evaluasi";
type Titik = { x: number; y: number };
type NamaDatar = "segitiga" | "segiempat" | "segilima" | "segienam" | "lingkaran";
type NamaRuang = "kubus" | "balok" | "tabung" | "kerucut" | "bola";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "sisi", label: "1. Sisi & Sudut" },
  { id: "stempel", label: "2. Stempel Ruang" },
  { id: "bengkel", label: "3. Rakit & Gunting" },
  { id: "kuis", label: "Kuis" },
  { id: "evaluasi", label: "Evaluasi" },
];

const NAMA_DATAR: Record<NamaDatar, { label: string; sisi: number; sudut: number; alias: string[] }> = {
  segitiga: { label: "Segitiga", sisi: 3, sudut: 3, alias: ["segitiga"] },
  segiempat: { label: "Segiempat", sisi: 4, sudut: 4, alias: ["segiempat", "segi empat", "persegi"] },
  segilima: { label: "Segilima", sisi: 5, sudut: 5, alias: ["segilima", "segi lima", "pentagon"] },
  segienam: { label: "Segienam", sisi: 6, sudut: 6, alias: ["segienam", "segi enam", "heksagon"] },
  lingkaran: { label: "Lingkaran", sisi: 1, sudut: 0, alias: ["lingkaran"] },
};

const NAMA_RUANG: Record<NamaRuang, { label: string; benda: string; jejak: string; alias: string[]; jejakAlias: string[] }> = {
  kubus: { label: "Kubus", benda: "Dadu", jejak: "Persegi", alias: ["kubus", "dadu"], jejakAlias: ["persegi", "segiempat", "segi empat"] },
  balok: { label: "Balok", benda: "Kotak tisu", jejak: "Persegi panjang", alias: ["balok", "kotak"], jejakAlias: ["persegi panjang", "segiempat", "segi empat"] },
  tabung: { label: "Tabung", benda: "Kaleng susu", jejak: "Lingkaran", alias: ["tabung", "kaleng"], jejakAlias: ["lingkaran"] },
  kerucut: { label: "Kerucut", benda: "Topi ulang tahun", jejak: "Lingkaran", alias: ["kerucut", "topi"], jejakAlias: ["lingkaran"] },
  bola: { label: "Bola", benda: "Bola sepak", jejak: "Titik", alias: ["bola"], jejakAlias: ["titik", "lingkaran", "menggelinding"] },
};

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

const WARNA_SISI = ["#f97316", "#0ea5e9", "#22c55e", "#a855f7", "#e11d48", "#eab308"];

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
  return teks.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const n = normalisasiSuara(teks).replace(/\s/g, "");
  return alias.some((item) => {
    const a = normalisasiSuara(item).replace(/\s/g, "");
    return n.includes(a) || a.includes(n);
  });
}

function tintaPixel(data: Uint8ClampedArray, i: number): boolean {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  return a > 50 && r < 170 && b > r + 15;
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
          if (tintaPixel(data, i)) isi += 1;
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
  const img = ctx.getImageData(0, 0, width, height);
  const { data } = img;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let tinta = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * 4;
      if (!tintaPixel(data, i)) continue;
      tinta += 1;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (tinta < 18) return "";
  const kotakW = Math.max(8, maxX - minX);
  const hist = new Array(kotakW + 1).fill(0);
  for (let y = minY; y <= maxY; y += 2) {
    for (let x = minX; x <= maxX; x += 2) {
      const i = (y * width + x) * 4;
      if (tintaPixel(data, i)) hist[x - minX] += 1;
    }
  }
  const potong: number[] = [];
  const kiriZona = Math.floor(kotakW * 0.28);
  const kananZona = Math.floor(kotakW * 0.72);
  let minHist = Infinity;
  let idxMin = Math.floor(kotakW / 2);
  for (let x = kiriZona; x <= kananZona; x++) {
    if (hist[x] < minHist) {
      minHist = hist[x];
      idxMin = x;
    }
  }
  const rata = hist.reduce((a, b) => a + b, 0) / (hist.length || 1);
  if (minHist < rata * 0.22 && kotakW > 40) potong.push(idxMin);
  const batas = [0, ...potong, kotakW];
  const angka: string[] = [];
  for (let s = 0; s < batas.length - 1; s++) {
    const ax = minX + batas[s];
    const bx = minX + batas[s + 1];
    if (bx - ax < 8) continue;
    angka.push(kenaliSatuAngka(data, width, ax, minY, bx, maxY));
  }
  return angka.join("");
}

function jarak(a: Titik, b: Titik): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function jarakKeRuas(p: Titik, a: Titik, b: Titik): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const panj = dx * dx + dy * dy;
  if (panj === 0) return jarak(p, a);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / panj;
  t = Math.max(0, Math.min(1, t));
  return jarak(p, { x: a.x + t * dx, y: a.y + t * dy });
}

function poligonTeratur(n: number, cx = 160, cy = 118, r = 88): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const sudut = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + r * Math.cos(sudut), y: cy + r * Math.sin(sudut) };
  });
}

function IgilSvg({ bicara }: { bicara: boolean }) {
  return (
    <svg viewBox="0 0 80 92" width="86" height="99" aria-hidden className={bicara ? "igil-kedip" : ""}>
      <ellipse cx="40" cy="84" rx="18" ry="5" fill="#000" opacity="0.12" />
      <ellipse cx="40" cy="60" rx="26" ry="24" fill="#f59e0b" />
      <ellipse cx="40" cy="64" rx="16" ry="14" fill="#fde68a" />
      <circle cx="40" cy="32" r="22" fill="#f59e0b" />
      <path d="M20 18 L26 6 L32 22" fill="#d97706" />
      <path d="M60 18 L54 6 L48 22" fill="#d97706" />
      <circle cx="31" cy="31" r="9" fill="#fff" />
      <circle cx="49" cy="31" r="9" fill="#fff" />
      <circle cx="32" cy="33" r="4.2" fill="#1e1b4b" />
      <circle cx="50" cy="33" r="4.2" fill="#1e1b4b" />
      <path d="M40 36 L47 45 L33 45 Z" fill="#ea580c" />
      <text x="40" y="78" textAnchor="middle" fontSize="9" fontWeight="800" fill="#92400e">
        IGIL
      </text>
    </svg>
  );
}

function SudutIgil({
  pesan,
  sedangBicara,
  onUlang,
}: {
  pesan: string;
  sedangBicara: boolean;
  onUlang: () => void;
}) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-30 flex max-w-[min(100%,24rem)] items-end gap-2">
      <div className="pointer-events-auto shrink-0">
        <IgilSvg bicara={sedangBicara} />
      </div>
      <div className="pointer-events-auto mb-3 rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-lg ring-2 ring-amber-300">
        <p className="text-sm font-bold leading-snug text-indigo-900">{pesan}</p>
        <button
          type="button"
          onClick={onUlang}
          className={`mt-1 inline-flex min-h-12 min-w-12 items-center justify-center gap-1 rounded-xl px-3 text-xs font-black ${
            sedangBicara ? "bg-emerald-400 text-emerald-950" : "bg-amber-400 text-amber-950"
          }`}
        >
          {sedangBicara ? "🔊 ..." : "🔊 Dengar"}
        </button>
      </div>
    </div>
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
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onMulai}
        className={`inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black text-white ${
          menyimak ? "bg-rose-500 igil-kedip" : "bg-teal-700"
        }`}
      >
        {menyimak ? "Mendengar..." : "🎤 Ucapkan"}
      </button>
      <button
        type="button"
        onClick={onUji}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-100 px-3 text-xs font-black text-amber-900 ring-2 ring-amber-300"
      >
        Mikrofon sulit? {labelUji}
      </button>
    </div>
  );
}

function KanvasTulis({
  kunci,
  expected,
  label,
  onHasil,
  disabled = false,
  opsiScaffold,
}: {
  kunci: string;
  expected: string;
  label: string;
  onHasil: (benar: boolean, terbaca: string) => void;
  disabled?: boolean;
  opsiScaffold: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);
  const [adaCoretan, setAdaCoretan] = useState(false);
  const [pesan, setPesan] = useState("");
  const [scaffold, setScaffold] = useState(false);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = Math.max(induk.clientWidth, 88);
    const tinggi = Math.max(96, Math.round(lebar * 0.7));
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
    if (disabled) return;
    event.preventDefault();
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    gambar.current = true;
    terakhir.current = titikDari(event);
    try {
      kanvas.setPointerCapture(event.pointerId);
    } catch {
      /* sentuh tanpa capture */
    }
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
    setPesan("");
  };

  const selesai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current) return;
    event.preventDefault();
    gambar.current = false;
    terakhir.current = null;
    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* lepas */
    }
  };

  const periksa = () => {
    const kanvas = canvasRef.current;
    if (!kanvas || !adaCoretan) {
      setPesan("Tulis angkanya dulu, ya.");
      return;
    }
    const terbaca = kenaliAngkaKanvas(kanvas);
    const benar = terbaca === expected;
    if (benar) {
      setPesan(`IGIL membaca: ${terbaca}. Tepat!`);
      setScaffold(false);
      onHasil(true, terbaca);
      return;
    }
    setPesan(terbaca ? `IGIL membaca: ${terbaca}. Belum tepat.` : "IGIL belum yakin. Tulis lebih besar, atau pilih angka.");
    setScaffold(true);
    onHasil(false, terbaca || "?");
  };

  return (
    <div className="min-w-[7.5rem] flex-1 space-y-2">
      <p className="text-center text-[11px] font-black uppercase tracking-wide text-teal-700">{label}</p>
      <div className="overflow-hidden rounded-2xl border-2 border-dashed border-teal-300 bg-[#FFFDF6]">
        <canvas
          ref={canvasRef}
          className="block w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={mulai}
          onPointerMove={geser}
          onPointerUp={selesai}
          onPointerCancel={selesai}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            siapkan();
            setPesan("");
            setScaffold(false);
          }}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-3 text-xs font-black text-teal-800 ring-2 ring-teal-200"
        >
          Hapus Coretan
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={periksa}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-700 px-3 text-xs font-black text-white"
        >
          Periksa Jawaban
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-teal-900">{pesan}</p> : null}
      {scaffold && !disabled ? (
        <div className="flex flex-wrap gap-2">
          {opsiScaffold.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                const benar = item === expected;
                setPesan(benar ? `IGIL membaca: ${item}. Tepat!` : "Belum tepat. Coba lagi.");
                if (benar) setScaffold(false);
                onHasil(benar, item);
              }}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl bg-amber-200 px-3 text-lg font-black text-amber-950"
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function KanvasCoret({
  onSelesai,
  disabled,
}: {
  onSelesai: (poly: Titik[], dx: number, dy: number) => void;
  disabled?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const jejak = useRef<Titik[]>([]);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = induk.clientWidth;
    const tinggi = induk.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    kanvas.width = Math.floor(lebar * dpr);
    kanvas.height = Math.floor(tinggi * dpr);
    kanvas.style.width = `${lebar}px`;
    kanvas.style.height = `${tinggi}px`;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, lebar, tinggi);
  }, []);

  useEffect(() => {
    siapkan();
    const induk = canvasRef.current?.parentElement;
    if (!induk || typeof ResizeObserver === "undefined") return;
    const pengamat = new ResizeObserver(() => siapkan());
    pengamat.observe(induk);
    return () => pengamat.disconnect();
  }, [siapkan]);

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
    gambar.current = true;
    jejak.current = [titikDari(event)];
    try {
      kanvas.setPointerCapture(event.pointerId);
    } catch {
      /* sentuh tanpa capture */
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f97316";
    ctx.beginPath();
    ctx.moveTo(jejak.current[0].x, jejak.current[0].y);
  };

  const geser = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current || disabled) return;
    event.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    const sekarang = titikDari(event);
    if (!ctx) return;
    jejak.current.push(sekarang);
    ctx.lineTo(sekarang.x, sekarang.y);
    ctx.stroke();
  };

  const selesai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gambar.current) return;
    event.preventDefault();
    gambar.current = false;
    const poly = jejak.current;
    jejak.current = [];
    try {
      canvasRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* lepas */
    }
    if (poly.length < 1) return;
    const dx = poly[poly.length - 1].x - poly[0].x;
    const dy = poly[poly.length - 1].y - poly[0].y;
    onSelesai(poly, dx, dy);
    const kanvas = canvasRef.current;
    const ctx = kanvas?.getContext("2d");
    if (kanvas && ctx) ctx.clearRect(0, 0, kanvas.clientWidth, kanvas.clientHeight);
  };

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-10 h-full w-full touch-none ${disabled ? "pointer-events-none" : "cursor-crosshair"}`}
      style={{ touchAction: "none" }}
      onPointerDown={mulai}
      onPointerMove={geser}
      onPointerUp={selesai}
      onPointerCancel={selesai}
    />
  );
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
    mesin.onresult = (event) => {
      const teks = event.results[0]?.[0]?.transcript ?? "";
      onTeks(teks);
    };
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

export default function SimulasiMtk2Bab3({
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
  const [tab, setTab] = useState<TabLab>("sisi");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanIgil, setPesanIgil] = useState("Ketuk sisi dan sudut bangun. Hitung ruas garisnya, ya!");
  const [suaraAktif, setSuaraAktif] = useState(true);
  const [sedangBicara, setSedangBicara] = useState(false);
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
    const pembuka = "Ketuk sisi dan sudut bangun. Hitung ruas garisnya, ya!";
    siapkanSuaraGuruIgil(pembuka, { kelas, kelamin });
    kirimEvent("SCENE_START", { pesan: pembuka, adegan: "sisi" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gantiTab = (id: TabLab) => {
    setTab(id);
    const pembuka: Record<TabLab, string> = {
      sisi: "Ketuk sisi dan sudut bangun. Hitung ruas garisnya, ya!",
      stempel: "Cap alas bangun ruang ke kertas IGIL. Lihat jejak datarnya!",
      bengkel: "Rakit dua segitiga, atau gunting persegi dari sudut ke sudut.",
      kuis: "Satu tantangan per layar. Tandai, tulis, dan ucapkan.",
      evaluasi: "Sarang lebah punya berapa sisi? Tulis angkanya.",
    };
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="rounded-[2rem] border-2 border-amber-100 bg-white shadow-xl shadow-amber-100/40">
      <style>{`
        @keyframes igil-kedip {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-amber-500 to-teal-600 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Bentuk di Sekitar Kita</h2>
        </div>
        <button
          type="button"
          onClick={() => setSuaraAktif((v) => !v)}
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-sm font-bold ${
            suaraAktif ? "bg-amber-300 text-slate-900" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 bg-amber-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-teal-800 shadow-sm" : "text-amber-800 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[34rem] bg-gradient-to-b from-amber-50 to-teal-50 p-3 sm:min-h-[38rem] sm:p-4">
        {tab === "sisi" ? <AdeganSisi kirimEvent={kirimEvent} /> : null}
        {tab === "stempel" ? <AdeganStempel kirimEvent={kirimEvent} /> : null}
        {tab === "bengkel" ? <AdeganBengkel kirimEvent={kirimEvent} /> : null}
        {tab === "kuis" ? <ModeKuis kirimEvent={kirimEvent} /> : null}
        {tab === "evaluasi" ? <ModeEvaluasi kirimEvent={kirimEvent} onLulus={tandaiSelesai} /> : null}
        <SudutIgil pesan={pesanIgil} sedangBicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
      </div>

      <div className="border-t-2 border-slate-200 bg-slate-900 p-4 text-slate-100">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-black uppercase tracking-widest text-amber-300">Panel Log Event IGIL</p>
          <button type="button" onClick={() => setLog([])} className="min-h-12 rounded-xl bg-slate-700 px-3 text-xs font-bold text-white">
            Hapus log
          </button>
        </div>
        {log.length === 0 ? (
          <p className="text-sm text-slate-400">Belum ada event. Main di lab, pesan onTutorEvent muncul di sini.</p>
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

function AdeganSisi({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [bangun, setBangun] = useState<NamaDatar>("segitiga");
  const [titik, setTitik] = useState<Titik[]>(() => poligonTeratur(3));
  const [sisiTandai, setSisiTandai] = useState<number[]>([]);
  const [sudutTandai, setSudutTandai] = useState<number[]>([]);
  const [geser, setGeser] = useState(false);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const tarik = useRef<number | null>(null);
  const sudahLapor = useRef(false);
  const info = NAMA_DATAR[bangun];

  const ganti = (id: NamaDatar) => {
    setBangun(id);
    setTitik(id === "lingkaran" ? [] : poligonTeratur(NAMA_DATAR[id].sisi));
    setSisiTandai([]);
    setSudutTandai([]);
    setTulisOk(false);
    setSuaraOk(false);
    sudahLapor.current = false;
    if (id === "lingkaran") {
      kirimEvent("CIRCLE_INSPECTED", {
        pesan: "Lihat, lingkaran hanya punya 1 sisi lengkung dan 0 titik sudut!",
        shapeName: "Lingkaran",
        sides: 1,
        vertices: 0,
      });
    }
  };

  const semuaSelesai =
    bangun === "lingkaran"
      ? sisiTandai.includes(0)
      : sisiTandai.length === info.sisi && sudutTandai.length === info.sudut;

  useEffect(() => {
    if (!semuaSelesai || sudahLapor.current || bangun === "lingkaran") return;
    sudahLapor.current = true;
    kirimEvent("POLYGON_INSPECTED", {
      pesan: `Hebat! Bangun ini punya ${info.sisi} ruas garis dan ${info.sudut} titik sudut, makanya dinamakan ${info.label}!`,
      shapeName: info.label,
      sides: info.sisi,
      vertices: info.sudut,
    });
  }, [semuaSelesai, bangun, info, kirimEvent]);

  const tandaiSisi = (i: number) => {
    setSisiTandai((lama) => (lama.includes(i) ? lama : [...lama, i]));
  };
  const tandaiSudut = (i: number) => {
    setSudutTandai((lama) => (lama.includes(i) ? lama : [...lama, i]));
  };

  const coretBangun = (poly: Titik[]) => {
    const induk = document.getElementById("kanvas-sisi-igil");
    if (!induk || poly.length === 0) return;
    const skalaX = 320 / Math.max(1, induk.clientWidth);
    const skalaY = 236 / Math.max(1, induk.clientHeight);
    const titikCoret = poly.filter((_, i) => i % 3 === 0).map((p) => ({ x: p.x * skalaX, y: p.y * skalaY }));
    if (bangun === "lingkaran") {
      if (titikCoret.some((p) => Math.abs(jarak(p, { x: 160, y: 118 }) - 88) < 28)) tandaiSisi(0);
      return;
    }
    for (const p of titikCoret) {
      let sisiTerbaik = -1;
      let dSisi = 22;
      titik.forEach((a, i) => {
        const b = titik[(i + 1) % titik.length];
        const d = jarakKeRuas(p, a, b);
        if (d < dSisi) {
          dSisi = d;
          sisiTerbaik = i;
        }
      });
      if (sisiTerbaik >= 0) tandaiSisi(sisiTerbaik);
      let sudutTerbaik = -1;
      let dSudut = 22;
      titik.forEach((a, i) => {
        const d = jarak(p, a);
        if (d < dSudut) {
          dSudut = d;
          sudutTerbaik = i;
        }
      });
      if (sudutTerbaik >= 0) tandaiSudut(sudutTerbaik);
    }
  };

  const cekSuara = (teks: string) => {
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Browser ini belum dukung mikrofon. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, info.alias);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Benar! Namanya ${info.label}.` : `Kamu bilang: "${teks}". Coba lagi.`,
      benar: ok,
      transkrip: teks,
    });
    if (ok) setSuaraOk(true);
  };
  const mic = useMic(cekSuara);

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(NAMA_DATAR) as NamaDatar[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => ganti(id)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
              bangun === id ? "bg-teal-700 text-white" : "bg-white text-teal-800 ring-2 ring-teal-200"
            }`}
          >
            {NAMA_DATAR[id].label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setGeser((v) => !v)}
          disabled={bangun === "lingkaran"}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black disabled:opacity-40 ${
            geser ? "bg-orange-500 text-white" : "bg-white text-orange-800 ring-2 ring-orange-200"
          }`}
        >
          Ubah Bentuk (Vertex Drag)
        </button>
        <button
          type="button"
          onClick={() => ganti(bangun)}
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-sm font-black text-teal-800 ring-2 ring-teal-200"
        >
          Ulang rapi
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <p className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-teal-900 ring-2 ring-teal-200">
          Jumlah Sisi {sisiTandai.length}/{info.sisi}
        </p>
        <p className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-amber-900 ring-2 ring-amber-200">
          Jumlah Titik Sudut {sudutTandai.length}/{info.sudut}
        </p>
      </div>

      <div id="kanvas-sisi-igil" className="relative min-h-[15rem] flex-1 overflow-hidden rounded-3xl bg-white ring-2 ring-amber-200">
        <svg viewBox="0 0 320 236" className="h-full w-full">
          {bangun === "lingkaran" ? (
            <circle
              cx="160"
              cy="118"
              r="88"
              fill="#fef3c7"
              stroke={sisiTandai.includes(0) ? "#f97316" : "#0f766e"}
              strokeWidth={sisiTandai.includes(0) ? 8 : 5}
              className="cursor-pointer"
              onClick={() => tandaiSisi(0)}
            />
          ) : (
            <>
              <polygon
                points={titik.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="#ecfdf5"
                stroke="#0f766e"
                strokeWidth="3"
              />
              {titik.map((a, i) => {
                const b = titik[(i + 1) % titik.length];
                const nyala = sisiTandai.includes(i);
                return (
                  <g key={`s${i}`}>
                    <line
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={nyala ? WARNA_SISI[i % WARNA_SISI.length] : "#0f766e"}
                      strokeWidth={nyala ? 8 : 5}
                      strokeLinecap="round"
                      className="cursor-pointer"
                      onClick={() => tandaiSisi(i)}
                    />
                    {nyala ? (
                      <text
                        x={(a.x + b.x) / 2}
                        y={(a.y + b.y) / 2 - 8}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill={WARNA_SISI[i % WARNA_SISI.length]}
                      >
                        {sisiTandai.indexOf(i) + 1}
                      </text>
                    ) : null}
                  </g>
                );
              })}
              {titik.map((p, i) => (
                <circle
                  key={`v${i}`}
                  cx={p.x}
                  cy={p.y}
                  r={geser ? 12 : 10}
                  fill={sudutTandai.includes(i) ? "#fbbf24" : "#fff"}
                  stroke="#0f766e"
                  strokeWidth="3"
                  className={sudutTandai.includes(i) ? "igil-kedip cursor-pointer" : "cursor-pointer"}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    tandaiSudut(i);
                    if (!geser) return;
                    tarik.current = i;
                    (event.target as SVGCircleElement).setPointerCapture(event.pointerId);
                  }}
                  onPointerMove={(event) => {
                    if (tarik.current !== i) return;
                    const svg = (event.target as SVGCircleElement).ownerSVGElement;
                    if (!svg) return;
                    const box = svg.getBoundingClientRect();
                    const nx = ((event.clientX - box.left) / box.width) * 320;
                    const ny = ((event.clientY - box.top) / box.height) * 236;
                    setTitik((lama) => lama.map((item, idx) => (idx === i ? { x: Math.max(16, Math.min(304, nx)), y: Math.max(16, Math.min(220, ny)) } : item)));
                  }}
                  onPointerUp={() => {
                    tarik.current = null;
                  }}
                />
              ))}
            </>
          )}
        </svg>
        {!geser ? <KanvasCoret onSelesai={(poly) => coretBangun(poly)} /> : null}
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <KanvasTulis
          kunci={`sisi-${bangun}`}
          expected={String(info.sisi)}
          label="Tulis jumlah sisi"
          opsiScaffold={[String(info.sisi), "4", "0"]}
          disabled={tulisOk}
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${info.sisi} sisi, tepat!` : "Hitung ruas garis yang sudah menyala.",
              benar,
              terbaca,
              expected: String(info.sisi),
            });
            if (benar) setTulisOk(true);
          }}
        />
        <div className="space-y-2">
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara(info.label)}
            labelUji={`Ucapkan ${info.label}`}
          />
          {suaraOk ? <p className="text-sm font-black text-emerald-700">Nama tepat!</p> : null}
        </div>
      </div>
    </div>
  );
}

function GambarRuang({ jenis, benda }: { jenis: NamaRuang; benda: boolean }) {
  if (jenis === "kubus") {
    return (
      <svg viewBox="0 0 120 110" className="h-28 w-32">
        {benda ? <text x="60" y="18" textAnchor="middle" fontSize="22">🎲</text> : null}
        <polygon points="30,40 70,28 110,40 70,58" fill="#fde68a" stroke="#92400e" />
        <polygon points="30,40 70,58 70,98 30,80" fill="#fbbf24" stroke="#92400e" />
        <polygon points="70,58 110,40 110,80 70,98" fill="#f59e0b" stroke="#92400e" />
      </svg>
    );
  }
  if (jenis === "balok") {
    return (
      <svg viewBox="0 0 140 110" className="h-28 w-36">
        {benda ? <text x="70" y="18" textAnchor="middle" fontSize="20">📦</text> : null}
        <polygon points="20,48 100,32 128,48 48,66" fill="#bfdbfe" stroke="#1e3a8a" />
        <polygon points="20,48 48,66 48,98 20,80" fill="#60a5fa" stroke="#1e3a8a" />
        <polygon points="48,66 128,48 128,80 48,98" fill="#3b82f6" stroke="#1e3a8a" />
      </svg>
    );
  }
  if (jenis === "tabung") {
    return (
      <svg viewBox="0 0 100 120" className="h-32 w-24">
        {benda ? <text x="50" y="16" textAnchor="middle" fontSize="20">🥫</text> : null}
        <ellipse cx="50" cy="92" rx="28" ry="10" fill="#5eead4" stroke="#0f766e" />
        <rect x="22" y="36" width="56" height="56" fill="#2dd4bf" stroke="#0f766e" />
        <ellipse cx="50" cy="36" rx="28" ry="10" fill="#99f6e4" stroke="#0f766e" />
      </svg>
    );
  }
  if (jenis === "kerucut") {
    return (
      <svg viewBox="0 0 100 120" className="h-32 w-24">
        {benda ? <text x="50" y="16" textAnchor="middle" fontSize="20">🎉</text> : null}
        <polygon points="50,28 22,92 78,92" fill="#fda4af" stroke="#9f1239" />
        <ellipse cx="50" cy="92" rx="28" ry="10" fill="#fb7185" stroke="#9f1239" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 110" className="h-28 w-24">
      {benda ? <text x="50" y="16" textAnchor="middle" fontSize="20">⚽</text> : null}
      <circle cx="50" cy="62" r="32" fill="#86efac" stroke="#166534" />
      <ellipse cx="50" cy="62" rx="14" ry="32" fill="none" stroke="#166534" />
    </svg>
  );
}

function JejakCap({ jenis }: { jenis: NamaRuang }) {
  if (jenis === "kubus") return <rect x="18" y="18" width="64" height="64" fill="#fde68a" stroke="#92400e" strokeWidth="3" />;
  if (jenis === "balok") return <rect x="10" y="28" width="80" height="44" fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="3" />;
  if (jenis === "bola") return <circle cx="50" cy="50" r="6" fill="#166534" />;
  return <circle cx="50" cy="50" r="32" fill="#99f6e4" stroke="#0f766e" strokeWidth="3" />;
}

function AdeganStempel({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [jenis, setJenis] = useState<NamaRuang>("kubus");
  const [benda, setBenda] = useState(false);
  const [cap, setCap] = useState(false);
  const [tekan, setTekan] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const info = NAMA_RUANG[jenis];

  const capAlas = () => {
    setTekan(true);
    window.setTimeout(() => {
      setTekan(false);
      setCap(true);
      kirimEvent("STAMP_3D_TO_2D", {
        pesan: `Ternyata kalau bagian bawah ${info.label} kita cap ke kertas, jejaknya berbentuk bangun datar ${info.jejak}!`,
        shape3D: info.label,
        face2D: info.jejak,
      });
    }, 420);
  };

  const cekSuara = (teks: string) => {
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Mikrofon belum bisa. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, info.alias) || (cap && cocokSuara(teks, info.jejakAlias));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Benar! ${info.label}, jejaknya ${info.jejak}.` : `Kamu bilang: "${teks}".`,
      benar: ok,
      transkrip: teks,
    });
    if (ok) setSuaraOk(true);
  };
  const mic = useMic(cekSuara);

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(NAMA_RUANG) as NamaRuang[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setJenis(id);
              setCap(false);
              setSuaraOk(false);
            }}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
              jenis === id ? "bg-teal-700 text-white" : "bg-white text-teal-800 ring-2 ring-teal-200"
            }`}
          >
            {NAMA_RUANG[id].label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setBenda((v) => !v)}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
            benda ? "bg-orange-500 text-white" : "bg-white text-orange-800 ring-2 ring-orange-200"
          }`}
        >
          Lihat Benda Nyata di Sekitar Kita
        </button>
        <button
          type="button"
          onClick={capAlas}
          className="inline-flex min-h-12 items-center rounded-2xl bg-amber-500 px-4 text-sm font-black text-amber-950"
        >
          Cap Alasnya ke Kertas!
        </button>
      </div>

      <div className="grid min-h-[14rem] flex-1 gap-3 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-3 ring-2 ring-teal-200">
          <p className="mb-2 text-[11px] font-black uppercase tracking-wide text-teal-700">
            {benda ? info.benda : info.label}
          </p>
          <div className={tekan ? "translate-y-6 transition" : "transition"}>
            <GambarRuang jenis={jenis} benda={benda} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-3xl bg-[#fff7ed] p-3 ring-2 ring-amber-300">
          <p className="mb-2 text-[11px] font-black uppercase tracking-wide text-amber-800">Kertas Cap IGIL</p>
          <svg viewBox="0 0 100 100" className="h-32 w-32 rounded-xl bg-white shadow-inner">
            {cap ? <JejakCap jenis={jenis} /> : <text x="50" y="55" textAnchor="middle" fontSize="10" fill="#94a3b8">kosong</text>}
          </svg>
          {cap ? <p className="mt-2 text-sm font-black text-teal-800">Jejak: {info.jejak}</p> : null}
        </div>
      </div>

      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => cekSuara(info.label)}
        labelUji={`Ucapkan ${info.label}`}
      />
      {suaraOk ? <p className="text-sm font-black text-emerald-700">Suara tepat!</p> : null}
    </div>
  );
}

function AdeganBengkel({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [mode, setMode] = useState<"rakit" | "gunting">("rakit");
  const [hasil, setHasil] = useState<"segiempat" | "segienam" | null>(null);
  const [target, setTarget] = useState<"persegi" | "segienam">("persegi");
  const [terbelah, setTerbelah] = useState(false);

  const rakit = (jenis: "segiempat" | "segienam") => {
    setHasil(jenis);
    kirimEvent("SHAPE_DECOMPOSED", {
      pesan:
        jenis === "segiempat"
          ? "Dua segitiga rapat jadi satu segiempat!"
          : "Enam segitiga sama sisi jadi satu segienam. Itu sarang lebah!",
      mode: "compose",
      hasil: jenis,
    });
  };

  const gunting = (poly: Titik[], dx: number, dy: number) => {
    const diagonal = Math.abs(dx) > 40 && Math.abs(dy) > 40;
    const tegak = Math.abs(dx) < 40 && Math.abs(dy) > 50;
    if (target === "persegi" && (diagonal || tegak)) {
      setTerbelah(true);
      kirimEvent("SHAPE_DECOMPOSED", {
        pesan: "Wah, satu segiempat yang kamu potong miring dari sudut ke sudut berubah menjadi 2 segitiga!",
        mode: "decompose",
        hasil: "2 segitiga",
      });
      return;
    }
    if (target === "segienam" && (diagonal || tegak)) {
      setTerbelah(true);
      kirimEvent("SHAPE_DECOMPOSED", {
        pesan: "Wah, satu segienam terbelah. Ada bangun baru di dalamnya!",
        mode: "decompose",
        hasil: "belahan segienam",
      });
    }
  };

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("rakit");
            setHasil(null);
            setTerbelah(false);
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black ${
            mode === "rakit" ? "bg-teal-700 text-white" : "bg-white text-teal-800 ring-2 ring-teal-200"
          }`}
        >
          Mode Rakit
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("gunting");
            setTerbelah(false);
            setHasil(null);
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black ${
            mode === "gunting" ? "bg-teal-700 text-white" : "bg-white text-teal-800 ring-2 ring-teal-200"
          }`}
        >
          Mode Gunting Kanvas
        </button>
      </div>

      {mode === "rakit" ? (
        <>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => rakit("segiempat")} className="inline-flex min-h-12 items-center rounded-2xl bg-orange-500 px-4 text-sm font-black text-white">
              Rakit 2 Segitiga Jadi Segiempat
            </button>
            <button type="button" onClick={() => rakit("segienam")} className="inline-flex min-h-12 items-center rounded-2xl bg-amber-500 px-4 text-sm font-black text-amber-950">
              Rakit 6 Segitiga Jadi Segienam
            </button>
          </div>
          <div className="relative flex min-h-[14rem] flex-1 items-center justify-center rounded-3xl bg-white ring-2 ring-amber-200">
            {hasil === "segiempat" ? (
              <svg viewBox="0 0 200 180" className="h-40 w-44">
                <polygon points="30,30 170,30 30,170" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
                <polygon points="170,30 170,170 30,170" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
              </svg>
            ) : hasil === "segienam" ? (
              <svg viewBox="0 0 200 180" className="h-44 w-52">
                {poligonTeratur(6, 100, 90, 70).map((a, i, arr) => (
                  <polygon key={i} points={`100,90 ${a.x},${a.y} ${arr[(i + 1) % 6].x},${arr[(i + 1) % 6].y}`} fill={i % 2 ? "#fde047" : "#facc15"} stroke="#a16207" />
                ))}
              </svg>
            ) : (
              <p className="text-sm font-bold text-slate-500">Ketuk tombol rakit. Dua segitiga atau enam segitiga.</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setTarget("persegi");
                setTerbelah(false);
              }}
              className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
                target === "persegi" ? "bg-orange-500 text-white" : "bg-white text-orange-800 ring-2 ring-orange-200"
              }`}
            >
              Persegi
            </button>
            <button
              type="button"
              onClick={() => {
                setTarget("segienam");
                setTerbelah(false);
              }}
              className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
                target === "segienam" ? "bg-orange-500 text-white" : "bg-white text-orange-800 ring-2 ring-orange-200"
              }`}
            >
              Segienam
            </button>
            <p className="self-center text-sm font-bold text-teal-900">Gambar garis potong di kanvas.</p>
          </div>
          <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-3xl bg-white ring-2 ring-amber-200">
            <svg viewBox="0 0 320 220" className="h-full w-full">
              {target === "persegi" && !terbelah ? (
                <rect x="80" y="40" width="160" height="140" fill="#ecfdf5" stroke="#0f766e" strokeWidth="4" />
              ) : null}
              {target === "persegi" && terbelah ? (
                <>
                  <polygon points="80,40 240,40 80,180" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
                  <polygon points="240,40 240,180 80,180" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
                </>
              ) : null}
              {target === "segienam" && !terbelah ? (
                <polygon points={poligonTeratur(6, 160, 110, 80).map((p) => `${p.x},${p.y}`).join(" ")} fill="#fef3c7" stroke="#a16207" strokeWidth="4" />
              ) : null}
              {target === "segienam" && terbelah ? (
                <>
                  <polygon points="160,30 230,70 230,150 160,110" fill="#fde047" stroke="#a16207" strokeWidth="3" />
                  <polygon points="160,30 90,70 90,150 160,110 160,190 90,150" fill="#facc15" stroke="#a16207" strokeWidth="3" />
                </>
              ) : null}
            </svg>
            {!terbelah ? <KanvasCoret onSelesai={gunting} /> : null}
          </div>
        </>
      )}
    </div>
  );
}

function ModeKuis({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [sisi, setSisi] = useState<number[]>([]);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const [jejak, setJejak] = useState(false);
  const [terbelah, setTerbelah] = useState(false);
  const lima = poligonTeratur(5, 160, 110, 80);

  const reset = () => {
    setSisi([]);
    setTulisOk(false);
    setSuaraOk(false);
    setJejak(false);
    setTerbelah(false);
  };

  const lanjut = () => {
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan kuis selesai. Hebat!" });
      return;
    }
    setNomor((n) => n + 1);
    reset();
  };

  const cekSuara = (teks: string) => {
    const alias = nomor === 0 ? NAMA_DATAR.segilima.alias : nomor === 1 ? NAMA_RUANG.tabung.alias : ["dua", "2"];
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Mikrofon belum bisa. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, alias);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar!" : `Kamu bilang: "${teks}".`, benar: ok, transkrip: teks });
    if (ok) setSuaraOk(true);
  };
  const mic = useMic(cekSuara);

  const selesaiSoal = nomor === 0 ? sisi.length === 5 && tulisOk && suaraOk : nomor === 1 ? jejak && suaraOk : terbelah && tulisOk;

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-teal-900">Tantangan {nomor + 1} dari 3</p>
      {nomor === 0 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Tandai 5 sisi segilima. Tulis 5. Ucapkan segilima.</p>
          <div id="kanvas-kuis1-igil" className="relative min-h-[12rem] flex-1 rounded-3xl bg-white ring-2 ring-amber-200">
            <svg viewBox="0 0 320 220" className="h-full w-full">
              <polygon points={lima.map((p) => `${p.x},${p.y}`).join(" ")} fill="#fce7f3" stroke="#9d174d" strokeWidth="3" />
              {lima.map((a, i) => {
                const b = lima[(i + 1) % 5];
                const nyala = sisi.includes(i);
                return (
                  <line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={nyala ? WARNA_SISI[i] : "#9d174d"}
                    strokeWidth={nyala ? 8 : 5}
                    className="cursor-pointer"
                    onClick={() => setSisi((lama) => (lama.includes(i) ? lama : [...lama, i]))}
                  />
                );
              })}
            </svg>
            <KanvasCoret
              onSelesai={(poly) => {
                const induk = document.getElementById("kanvas-kuis1-igil");
                if (!induk || poly.length === 0) return;
                const skalaX = 320 / Math.max(1, induk.clientWidth);
                const skalaY = 220 / Math.max(1, induk.clientHeight);
                for (const mentah of poly.filter((_, i) => i % 3 === 0)) {
                  const p = { x: mentah.x * skalaX, y: mentah.y * skalaY };
                  lima.forEach((a, i) => {
                    const b = lima[(i + 1) % 5];
                    if (jarakKeRuas(p, a, b) < 24) setSisi((lama) => (lama.includes(i) ? lama : [...lama, i]));
                  });
                }
              }}
            />
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <KanvasTulis
              kunci="k1"
              expected="5"
              label="Tulis 5"
              opsiScaffold={["5", "4", "6"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "5 tepat!" : "Hitung sisi yang menyala.", benar, terbaca, soal: 1 });
                if (benar) setTulisOk(true);
              }}
            />
            <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} onUji={() => cekSuara("segilima")} labelUji="Ucapkan Segilima" />
          </div>
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Ini kaleng susu. Cap alasnya, atau gambar lingkaran. Ucapkan tabung.</p>
          <div className="flex flex-wrap items-center gap-4">
            <GambarRuang jenis="tabung" benda />
            <button
              type="button"
              onClick={() => {
                setJejak(true);
                kirimEvent("STAMP_3D_TO_2D", {
                  pesan: "Ternyata kalau bagian bawah Tabung kita cap ke kertas, jejaknya berbentuk bangun datar Lingkaran!",
                  shape3D: "Tabung",
                  face2D: "Lingkaran",
                });
              }}
              className="inline-flex min-h-12 items-center rounded-2xl bg-amber-500 px-4 text-sm font-black text-amber-950"
            >
              Cap Alasnya ke Kertas!
            </button>
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-white ring-2 ring-amber-200">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {jejak ? <circle cx="50" cy="50" r="32" fill="#99f6e4" stroke="#0f766e" strokeWidth="3" /> : null}
              </svg>
              {!jejak ? (
                <KanvasCoret
                  onSelesai={(poly) => {
                    const xs = poly.map((p) => p.x);
                    const ys = poly.map((p) => p.y);
                    const w = Math.max(...xs) - Math.min(...xs);
                    const h = Math.max(...ys) - Math.min(...ys);
                    const tutup = jarak(poly[0], poly[poly.length - 1]) < 40;
                    if (tutup && w > 40 && h > 40 && Math.abs(w - h) < 50) setJejak(true);
                  }}
                />
              ) : null}
            </div>
          </div>
          <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} onUji={() => cekSuara("tabung")} labelUji="Ucapkan Tabung" />
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Gunting persegi panjang di tengah, jadi 2 persegi. Tulis 2.</p>
          <div className="relative min-h-[12rem] flex-1 overflow-hidden rounded-3xl bg-white ring-2 ring-amber-200">
            <svg viewBox="0 0 320 180" className="h-full w-full">
              {!terbelah ? <rect x="40" y="40" width="240" height="100" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="4" /> : null}
              {terbelah ? (
                <>
                  <rect x="40" y="40" width="120" height="100" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
                  <rect x="160" y="40" width="120" height="100" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="3" />
                </>
              ) : null}
            </svg>
            {!terbelah ? (
              <KanvasCoret
                onSelesai={(_p, dx, dy) => {
                  if (Math.abs(dy) > 40 && Math.abs(dx) < 50) {
                    setTerbelah(true);
                    kirimEvent("SHAPE_DECOMPOSED", {
                      pesan: "Wah, satu persegi panjang terbelah menjadi 2 persegi!",
                      hasil: "2 persegi",
                    });
                  }
                }}
              />
            ) : null}
          </div>
          {terbelah ? (
            <KanvasTulis
              kunci="k3"
              expected="2"
              label="Tulis 2"
              opsiScaffold={["2", "3", "1"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "2 tepat!" : "Dua bangun baru.", benar, terbaca, soal: 3 });
                if (benar) setTulisOk(true);
              }}
            />
          ) : null}
        </>
      ) : null}

      {selesaiSoal ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 self-start rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white">
          {nomor >= 2 ? "Kuis selesai" : "Tantangan berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

function ModeEvaluasi({
  kirimEvent,
  onLulus,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onLulus: (catatan: string) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const [pilih, setPilih] = useState("");
  const enam = poligonTeratur(6, 160, 110, 80);

  const reset = () => {
    setTulisOk(false);
    setSuaraOk(false);
    setPilih("");
  };

  const lanjut = () => {
    if (nomor >= 4) {
      onLulus("Evaluasi sarang lebah selesai. Lima soal sudah dijawab.");
      return;
    }
    setNomor((n) => n + 1);
    reset();
  };

  const cekSuara = (teks: string, alias: string[], pesanBenar: string) => {
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Mikrofon belum bisa. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, alias);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? pesanBenar : `Kamu bilang: "${teks}".`, benar: ok, transkrip: teks, soal: nomor + 1 });
    if (ok) setSuaraOk(true);
  };
  const mic = useMic((teks) => {
    if (nomor === 1) cekSuara(teks, ["segitiga"], "Benar! Aku segitiga.");
    if (nomor === 4) cekSuara(teks, ["segiempat", "segi empat", "persegi"], "Benar! Jadi segiempat.");
  });

  const selesaiSoal =
    nomor === 0 ? tulisOk : nomor === 1 ? suaraOk : nomor === 2 ? pilih === "sepatu" : nomor === 3 ? tulisOk : suaraOk;

  const bendaEval = [
    { id: "dadu", label: "Dadu", ikon: "🎲" },
    { id: "bola", label: "Bola basket", ikon: "🏀" },
    { id: "sepatu", label: "Kotak sepatu", ikon: "📦" },
    { id: "topi", label: "Topi kerucut", ikon: "🎉" },
  ];

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-teal-900">Soal {nomor + 1} dari 5</p>

      {nomor === 0 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Ini sarang lebah. Tulis jumlah sisinya.</p>
          <svg viewBox="0 0 320 200" className="h-40 w-full">
            <polygon points={enam.map((p) => `${p.x},${p.y}`).join(" ")} fill="#fde047" stroke="#a16207" strokeWidth="4" />
          </svg>
          <KanvasTulis
            kunci="e1"
            expected="6"
            label="Tulis 6"
            opsiScaffold={["6", "5", "8"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("EVAL_ANSWERED", { pesan: benar ? "6 tepat!" : "Hitung sisi sarang lebah.", benar, terbaca, soal: 1 });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Aku bangun datar yang punya 3 sisi lurus dan 3 titik sudut. Siapakah aku?</p>
          <svg viewBox="0 0 120 100" className="h-24">
            <polygon points="60,10 110,90 10,90" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
          </svg>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("segitiga", ["segitiga"], "Benar! Aku segitiga.")}
            labelUji="Ucapkan Segitiga"
          />
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Lingkari atau ketuk benda yang berbentuk balok.</p>
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {bendaEval.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPilih(item.id);
                    const benar = item.id === "sepatu";
                    kirimEvent("EVAL_ANSWERED", {
                      pesan: benar ? "Tepat! Kotak sepatu itu balok." : "Balok seperti kotak sepatu, bukan dadu.",
                      benar,
                      pilihan: item.id,
                      soal: 3,
                    });
                  }}
                  className={`flex min-h-24 flex-col items-center justify-center rounded-2xl bg-white text-sm font-black ring-2 ${
                    pilih === item.id ? (item.id === "sepatu" ? "ring-emerald-500" : "ring-rose-400") : "ring-teal-200"
                  }`}
                >
                  <span className="text-3xl">{item.ikon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {nomor === 3 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Kubus. Berapa banyak persegi di seluruh sisinya?</p>
          <GambarRuang jenis="kubus" benda />
          <KanvasTulis
            kunci="e4"
            expected="6"
            label="Tulis 6"
            opsiScaffold={["6", "4", "8"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("EVAL_ANSWERED", { pesan: benar ? "6 tepat! Kubus punya 6 persegi." : "Hitung muka kubus. Ada 6.", benar, terbaca, soal: 4 });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 4 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Dua segitiga siku-siku digabung. Ucapkan nama bangun barunya.</p>
          <svg viewBox="0 0 200 180" className="h-32">
            <polygon points="30,30 170,30 30,170" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
            <polygon points="170,30 170,170 30,170" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
          </svg>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("segiempat", ["segiempat", "segi empat", "persegi"], "Benar! Jadi segiempat.")}
            labelUji="Ucapkan Segiempat"
          />
        </>
      ) : null}

      {selesaiSoal ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 self-start rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white">
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}
