"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";
import { KuisLima, PitaSuaraIgil, KUIS_MTK2_BAB8 } from "./KuisLimaSimulasi";

export type TutorEventType =
  | "SCENE_START"
  | "FIFTH_TALLY_BOUND"
  | "UNBOUND_TALLY_WARNING"
  | "DUAL_REPRESENTATION_SYNC"
  | "DIFFERENCE_HIGHLIGHTED"
  | "SPACING_TRAP_REVEALED"
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
type TabLab = "turus" | "jembatan" | "detektif" | "kuis";
type Titik = { x: number; y: number };
type JenisKanvas = "tulis" | "lingkar-kiri" | "lingkar-kanan" | "miring";
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
type IdSatwa = "rusa" | "zebra" | "jerapah" | "gajah";
type IdBuah = "pisang" | "wortel" | "apel" | "jagung";
type IdBanding = "kakaktua" | "merak" | "jeruk" | "mangga";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "turus", label: "1. Turus" },
  { id: "jembatan", label: "2. Jembatan" },
  { id: "detektif", label: "3. Detektif" },
  { id: "kuis", label: "4. Kuis" },
];

const SATUAN_KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

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

const SATWA: { id: IdSatwa; nama: string; ikon: string }[] = [
  { id: "rusa", nama: "Rusa", ikon: "🦌" },
  { id: "zebra", nama: "Zebra", ikon: "🦓" },
  { id: "jerapah", nama: "Jerapah", ikon: "🦒" },
  { id: "gajah", nama: "Gajah", ikon: "🐘" },
];

const BUAH: { id: IdBuah; nama: string; ikon: string }[] = [
  { id: "pisang", nama: "Pisang", ikon: "🍌" },
  { id: "wortel", nama: "Wortel", ikon: "🥕" },
  { id: "apel", nama: "Apel", ikon: "🍎" },
  { id: "jagung", nama: "Jagung", ikon: "🌽" },
];

const BANDING: { id: IdBanding; nama: string; ikon: string; n: number }[] = [
  { id: "kakaktua", nama: "Kakaktua", ikon: "🦜", n: 8 },
  { id: "merak", nama: "Merak", ikon: "🦚", n: 5 },
  { id: "jeruk", nama: "Jeruk", ikon: "🍊", n: 9 },
  { id: "mangga", nama: "Mangga", ikon: "🥭", n: 6 },
];

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

function bacaBilangan(n: number): string {
  if (n < 0 || n > 20) return String(n);
  if (n < 10) return SATUAN_KATA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN_KATA[n - 10]} belas`;
  return "dua puluh";
}

function aliasBilangan(n: number): string[] {
  return [String(n), bacaBilangan(n), bacaBilangan(n).replace(/\s/g, "")];
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
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
  const kotakW = Math.max(8, maxX - minX);
  const hist = new Array(kotakW + 1).fill(0);
  for (let y = minY; y <= maxY; y += 2) {
    for (let x = minX; x <= maxX; x += 2) {
      if (tintaPixel(data, (y * width + x) * 4)) hist[x - minX] += 1;
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
  const rata = hist.reduce((a: number, b: number) => a + b, 0) / (hist.length || 1);
  if (minHist < rata * 0.22 && kotakW > 40) potong.push(idxMin);
  const batas = [0, ...potong, kotakW];
  const angka: string[] = [];
  for (let s = 0; s < batas.length - 1; s++) {
    const ax = minX + batas[s];
    const bx = minX + batas[s + 1];
    if (bx - ax < 8) continue;
    angka.push(kenaliSatuAngka(data, width, ax, minY, bx, maxY + 1));
  }
  return angka.join("");
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

function adaGarisMiring(kanvas: HTMLCanvasElement): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const { width, height } = kanvas;
  const { data } = ctx.getImageData(0, 0, width, height);
  const sampel = (x0: number, y0: number, x1: number, y1: number) => {
    let kena = 0;
    for (let i = 0; i < 20; i++) {
      const t = i / 19;
      const x = Math.floor(x0 + (x1 - x0) * t);
      const y = Math.floor(y0 + (y1 - y0) * t);
      if (tintaPixel(data, (y * width + x) * 4)) kena += 1;
    }
    return kena;
  };
  const a = sampel(Math.floor(width * 0.18), Math.floor(height * 0.78), Math.floor(width * 0.82), Math.floor(height * 0.22));
  const b = sampel(Math.floor(width * 0.18), Math.floor(height * 0.22), Math.floor(width * 0.82), Math.floor(height * 0.78));
  return Math.max(a, b) >= 7;
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

function IgilRangerSvg({ bicara }: { bicara: boolean }) {
  return (
    <span aria-hidden className={`inline-flex h-24 w-20 items-center justify-center text-7xl leading-none ${bicara ? "igil-kedip" : ""}`}>
      🦉
    </span>
  );
}

function SudutRanger({ pesan, sedangBicara, onUlang }: { pesan: string; sedangBicara: boolean; onUlang: () => void }) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-30 flex max-w-[min(100%,24rem)] items-end gap-2">
      <div className="shrink-0">
        <IgilRangerSvg bicara={sedangBicara} />
      </div>
      <div className="mb-3 rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-lg ring-2 ring-amber-400">
        <p className="text-sm font-bold leading-snug text-emerald-950">{pesan}</p>
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
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-100 px-3 text-xs font-black text-amber-950 ring-2 ring-amber-300"
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
  labelAkhir = "Berikutnya",
}: {
  indeks: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  labelAkhir?: string;
}) {
  const terakhir = indeks >= total - 1;
  return (
    <div className="relative z-20 flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={indeks === 0}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-amber-200 disabled:opacity-40"
      >
        Sebelumnya
      </button>
      <p className="text-sm font-black text-[#1C01A5]">
        {indeks + 1} / {total}
      </p>
      <button
        type="button"
        onClick={onNext}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1C01A5] px-4 text-sm font-black text-white"
      >
        {terakhir ? labelAkhir : "Berikutnya"}
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
  onHasil,
}: {
  kunci: string;
  jenis: JenisKanvas;
  latar?: ReactNode;
  label: string;
  tulisKunci?: string[];
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
      const angka = kenaliAngkaKanvas(kanvas).replace(/\s/g, "");
      benar = tulisKunci.some((k) => angka === k);
    }
    if (jenis === "lingkar-kiri") benar = sisiTinta(kanvas) === "kiri";
    if (jenis === "lingkar-kanan") benar = sisiTinta(kanvas) === "kanan";
    if (jenis === "miring") benar = adaGarisMiring(kanvas);
    setPesan(benar ? "Benar! Coretanmu rapi." : "Belum tepat. Hapus, lalu coba lagi.");
    onHasil(benar);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <div className="relative mx-auto h-44 max-w-md overflow-hidden rounded-2xl bg-[#FFFDF6] ring-2 ring-amber-300 sm:h-52">
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
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-4 text-sm font-black text-[#1C01A5] ring-2 ring-amber-200"
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

function IkatLima({ kedip = false }: { kedip?: boolean }) {
  return (
    <span className={`relative mx-1 mb-3 inline-flex h-8 items-end gap-0.5 px-1 ${kedip ? "igil-ikat" : ""}`}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-7 w-0.5 rounded-full bg-[#1C01A5]" />
      ))}
      <span className="absolute left-0 right-0 top-3 h-0.5 origin-center -rotate-[38deg] rounded-full bg-rose-500" />
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-black text-rose-700">5</span>
    </span>
  );
}

function GarisTegak({ n }: { n: number }) {
  return (
    <span className="inline-flex flex-wrap items-end gap-0.5">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="h-7 w-0.5 rounded-full bg-[#1C01A5]" />
      ))}
    </span>
  );
}

function LambangTurus({ n, tanpaIkat = false, kedipIkat = false }: { n: number; tanpaIkat?: boolean; kedipIkat?: boolean }) {
  if (tanpaIkat) return <GarisTegak n={n} />;
  const ikat = Math.floor(n / 5);
  const sisa = n % 5;
  return (
    <span className="inline-flex flex-wrap items-end">
      {Array.from({ length: ikat }, (_, i) => (
        <IkatLima key={i} kedip={kedipIkat && i === ikat - 1} />
      ))}
      <GarisTegak n={sisa} />
    </span>
  );
}

function EmpatGarisLatar() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center gap-4">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-24 w-1.5 rounded-full bg-[#1C01A5]/70" />
      ))}
    </div>
  );
}

function KolomGambar({
  nama,
  ikon,
  n,
  max = 12,
  tegak = true,
  sorotDari,
}: {
  nama: string;
  ikon: string;
  n: number;
  max?: number;
  tegak?: boolean;
  sorotDari?: number;
}) {
  const petak = Array.from({ length: max }, (_, i) => i < n);
  const isi = petak.map((ada, i) => {
    const lebih = sorotDari != null && ada && i >= sorotDari;
    return (
      <span
        key={i}
        className={`flex h-6 w-6 items-center justify-center rounded-md border text-sm ${
          ada ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"
        } ${lebih ? "igil-kedip-kuning ring-2 ring-yellow-400" : ""}`}
      >
        {ada ? ikon : ""}
      </span>
    );
  });
  return (
    <div className="px-1">
      {tegak ? <div className="flex flex-col-reverse items-center gap-0.5">{isi}</div> : <div className="flex flex-wrap gap-0.5">{isi}</div>}
      <p className="mt-1 text-center text-[10px] font-black uppercase text-[#1C01A5]">{nama}</p>
      <p className="text-center text-sm font-black text-slate-700">{n}</p>
    </div>
  );
}

function AdeganTurus({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [isi, setIsi] = useState<Record<IdSatwa, number>>({ rusa: 7, zebra: 5, jerapah: 6, gajah: 4 });
  const [aktif, setAktif] = useState<IdSatwa>("rusa");
  const [tanpaIkat, setTanpaIkat] = useState(false);
  const [kedip, setKedip] = useState(false);
  const n = isi[aktif];
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(n));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Tepat! ${n} dibaca ${bacaBilangan(n)}.` : `Ucapkan ${bacaBilangan(n)}.`,
      benar: ok,
      angka: n,
    });
  });

  const ubah = (id: IdSatwa, nextMentah: number) => {
    const prev = isi[id];
    const next = Math.max(0, Math.min(20, nextMentah));
    setIsi((lama) => ({ ...lama, [id]: next }));
    if (next > prev && next > 0 && next % 5 === 0 && !tanpaIkat) {
      setKedip(true);
      window.setTimeout(() => setKedip(false), 900);
      kirimEvent("FIFTH_TALLY_BOUND", {
        pesan:
          "Hitungan kelima! Kita tarik garis miring untuk mengikat 4 garis tegak menjadi 1 ikatan lima. Sekarang menghitungnya jadi cepat: lima, sepuluh!",
        angka: next,
        satwa: id,
      });
    }
  };

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Turus adalah garis tegak. Setiap hitungan kelima, tarik garis miring mengikat empat garis menjadi satu ikatan lima. Menghitungnya jadi cepat: lima, sepuluh, lima belas!"
        onBicara={onBicara}
      />
      <div className="relative z-20 flex flex-wrap gap-2">
        {SATWA.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setAktif(item.id);
              ubah(item.id, isi[item.id] + 1);
            }}
            className={`min-h-12 rounded-2xl px-3 text-sm font-black ${
              aktif === item.id ? "bg-amber-400 text-amber-950" : "bg-white text-[#1C01A5] ring-2 ring-amber-200"
            }`}
          >
            {item.ikon} {item.nama}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl bg-amber-50 ring-2 ring-amber-700">
        <p className="bg-amber-800 px-3 py-2 text-center text-xs font-black uppercase text-white">Papan Kayu Tabel Turus</p>
        <div className="grid grid-cols-[5.5rem_1fr_3rem] bg-amber-200 px-2 py-1 text-[10px] font-black uppercase text-amber-950">
          <span>Satwa</span>
          <span>Turus</span>
          <span>Angka</span>
        </div>
        {SATWA.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setAktif(item.id)}
            className={`grid w-full grid-cols-[5.5rem_1fr_3rem] items-center border-t border-amber-200 px-2 py-2 text-left ${
              aktif === item.id ? "bg-yellow-100" : "bg-amber-50"
            }`}
          >
            <span className="text-sm font-black text-[#1C01A5]">
              {item.ikon} {item.nama}
            </span>
            <LambangTurus n={isi[item.id]} tanpaIkat={tanpaIkat} kedipIkat={kedip && aktif === item.id} />
            <span className="text-center text-lg font-black text-emerald-700">{isi[item.id]}</span>
          </button>
        ))}
      </div>
      <div className="relative z-20 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <button type="button" onClick={() => ubah(aktif, n + 1)} className="min-h-12 rounded-2xl bg-sky-400 px-3 text-sm font-black text-sky-950">
          +1
        </button>
        <button type="button" onClick={() => ubah(aktif, n - 1)} className="min-h-12 rounded-2xl bg-white px-3 text-sm font-black text-[#1C01A5] ring-2 ring-amber-200">
          −1
        </button>
        <button type="button" onClick={() => ubah(aktif, n + 5)} className="min-h-12 rounded-2xl bg-amber-400 px-3 text-sm font-black text-amber-950">
          +5 Ikat
        </button>
        <button
          type="button"
          onClick={() => {
            const next = !tanpaIkat;
            setTanpaIkat(next);
            if (next) {
              kirimEvent("UNBOUND_TALLY_WARNING", {
                pesan: "Wah, kalau garisnya berjajar terus tanpa diikat lima-lima, mata kita jadi bingung menghitungnya ya!",
              });
            }
          }}
          className={`min-h-12 rounded-2xl px-3 text-xs font-black ${
            tanpaIkat ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
          }`}
        >
          {tanpaIkat ? "Mode Salah" : "Mode Benar"}
        </button>
      </div>
      {tanpaIkat && n >= 10 ? (
        <p className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-bold text-rose-900">|||||||||||| sulit dibaca. Ikat lima-lima jadi cepat!</p>
      ) : null}
      <KanvasTugas
        kunci="turus-tulis"
        jenis="tulis"
        tulisKunci={[String(n)]}
        label={`Tuliskan banyaknya ${SATWA.find((s) => s.id === aktif)?.nama ?? ""} di kotak kanvas.`}
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? `Coretan tepat untuk ${n}.` : `Tulis ${n}.`,
            benar: ok,
            angka: n,
          })
        }
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: `Tepat! ${n} dibaca ${bacaBilangan(n)}.`,
            benar: true,
            angka: n,
          })
        }
        labelUji={bacaBilangan(n)}
      />
    </div>
  );
}

function AdeganJembatan({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [isi, setIsi] = useState<Record<IdBuah, number>>({ pisang: 8, wortel: 5, apel: 6, jagung: 4 });
  const [tegak, setTegak] = useState(true);
  const terbanyak = BUAH.reduce((a, b) => (isi[b.id] > isi[a.id] ? b : a));
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [terbanyak.nama.toLowerCase(), terbanyak.id]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${terbanyak.nama} paling banyak.` : `Sebutkan ${terbanyak.nama}.`,
      benar: ok,
    });
  });

  const ubah = (id: IdBuah, nextMentah: number) => {
    const next = Math.max(0, Math.min(12, nextMentah));
    setIsi((lama) => ({ ...lama, [id]: next }));
    kirimEvent("DUAL_REPRESENTATION_SYNC", {
      pesan: "Lihat! Meskipun bentuknya berubah dari garis Turus menjadi susunan Gambar, jumlah datanya tetap sama persis!",
      kategori: id,
      angka: next,
    });
  };

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Tabel turus dan diagram gambar menunjukkan jumlah yang sama. Satu petak sama dengan satu gambar. Menara tertinggi paling banyak."
        onBicara={onBicara}
      />
      <button
        type="button"
        onClick={() => {
          setTegak((v) => !v);
          kirimEvent("DUAL_REPRESENTATION_SYNC", {
            pesan: "Lihat! Meskipun bentuknya berubah dari garis Turus menjadi susunan Gambar, jumlah datanya tetap sama persis!",
            orientasi: tegak ? "mendatar" : "tegak",
          });
        }}
        className="relative z-20 min-h-12 w-full rounded-2xl bg-emerald-600 px-3 text-sm font-black text-white"
      >
        {tegak ? "Diagram Tegak (Menara)" : "Diagram Mendatar (Baris)"}
      </button>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-amber-50 ring-2 ring-amber-700">
          <p className="bg-amber-800 px-2 py-1 text-center text-[10px] font-black uppercase text-white">Tabel Turus</p>
          {BUAH.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-1 border-t border-amber-200 px-2 py-1">
              <span className="w-16 text-xs font-black text-[#1C01A5]">
                {item.ikon} {item.nama}
              </span>
              <LambangTurus n={isi[item.id]} />
              <span className="w-6 text-center text-sm font-black text-emerald-700">{isi[item.id]}</span>
              <span className="flex gap-1">
                <button type="button" onClick={() => ubah(item.id, isi[item.id] - 1)} className="min-h-12 min-w-12 rounded-xl bg-white text-lg font-black ring-2 ring-amber-200">
                  −
                </button>
                <button type="button" onClick={() => ubah(item.id, isi[item.id] + 1)} className="min-h-12 min-w-12 rounded-xl bg-amber-400 text-lg font-black">
                  +
                </button>
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl bg-emerald-50 p-2 ring-2 ring-emerald-300">
          <p className="text-center text-[10px] font-black uppercase text-emerald-900">Diagram Gambar</p>
          <div className={`mt-2 flex ${tegak ? "justify-center gap-2" : "flex-col gap-2"}`}>
            {BUAH.map((item) => (
              <button key={item.id} type="button" onClick={() => ubah(item.id, isi[item.id] + 1)} className="rounded-xl">
                <KolomGambar nama={item.nama} ikon={item.ikon} n={isi[item.id]} tegak={tegak} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <KanvasTugas
        kunci="jembatan-tulis"
        jenis="tulis"
        tulisKunci={[String(isi[terbanyak.id])]}
        label={`Tuliskan banyaknya ${terbanyak.nama} (paling banyak).`}
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? `${terbanyak.nama} ada ${isi[terbanyak.id]}.` : `Tulis ${isi[terbanyak.id]}.`,
            benar: ok,
          })
        }
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: `${terbanyak.nama} paling banyak.`, benar: true })}
        labelUji={terbanyak.nama}
      />
    </div>
  );
}

function AdeganDetektif({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [a, setA] = useState<IdBanding>("kakaktua");
  const [b, setB] = useState<IdBanding>("merak");
  const [garis, setGaris] = useState(false);
  const [jebakan, setJebakan] = useState(false);
  const [rapi, setRapi] = useState(false);
  const itemA = BANDING.find((x) => x.id === a) ?? BANDING[0];
  const itemB = BANDING.find((x) => x.id === b) ?? BANDING[1];
  const tinggi = itemA.n >= itemB.n ? itemA : itemB;
  const rendah = itemA.n >= itemB.n ? itemB : itemA;
  const selisih = tinggi.n - rendah.n;
  const total = itemA.n + itemB.n;
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [tinggi.nama.toLowerCase(), ...aliasBilangan(selisih)]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${tinggi.nama} lebih banyak. Selisih ${selisih}.` : `Paling banyak ${tinggi.nama}. Selisih ${selisih}.`,
      benar: ok,
    });
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Pilih dua kategori. Garis batas selisih memotong di yang lebih sedikit. Kotak yang menonjol itulah selisihnya. Jangan terkecoh gambar besar yang ditaruh renggang."
        onBicara={onBicara}
      />
      <div className="relative z-20 grid grid-cols-2 gap-2">
        <label className="text-xs font-black text-[#1C01A5]">
          Kategori A
          <select
            value={a}
            onChange={(e) => {
              setA(e.target.value as IdBanding);
              setGaris(false);
            }}
            className="mt-1 min-h-12 w-full rounded-2xl bg-white px-2 text-sm font-black ring-2 ring-amber-200"
          >
            {BANDING.map((item) => (
              <option key={item.id} value={item.id}>
                {item.ikon} {item.nama} {item.n}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-black text-[#1C01A5]">
          Kategori B
          <select
            value={b}
            onChange={(e) => {
              setB(e.target.value as IdBanding);
              setGaris(false);
            }}
            className="mt-1 min-h-12 w-full rounded-2xl bg-white px-2 text-sm font-black ring-2 ring-amber-200"
          >
            {BANDING.map((item) => (
              <option key={item.id} value={item.id}>
                {item.ikon} {item.nama} {item.n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex justify-center gap-6">
        <KolomGambar nama={itemA.nama} ikon={itemA.ikon} n={itemA.n} max={9} sorotDari={garis ? rendah.n : undefined} />
        <KolomGambar nama={itemB.nama} ikon={itemB.ikon} n={itemB.n} max={9} sorotDari={garis ? rendah.n : undefined} />
      </div>
      {garis ? (
        <p className="text-center text-sm font-black text-amber-900">
          {tinggi.nama} − {rendah.nama} = {tinggi.n} − {rendah.n} = {selisih}
        </p>
      ) : null}
      <div className="grid grid-cols-2 gap-2 text-center text-xs font-black sm:grid-cols-4">
        <p className="rounded-xl bg-emerald-100 px-2 py-2">Paling banyak {tinggi.nama} {tinggi.n}</p>
        <p className="rounded-xl bg-sky-100 px-2 py-2">Paling sedikit {rendah.nama} {rendah.n}</p>
        <p className="rounded-xl bg-amber-100 px-2 py-2">Selisih {selisih}</p>
        <p className="rounded-xl bg-violet-100 px-2 py-2">Total {total}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          setGaris(true);
          kirimEvent("DIFFERENCE_HIGHLIGHTED", {
            pesan: `Ada ${selisih} kotak ${tinggi.nama} yang menonjol melewati batas ${rendah.nama}. Jadi selisihnya adalah ${tinggi.n} dikurangi ${rendah.n} sama dengan ${selisih}!`,
            diff: selisih,
            itemA: tinggi.nama,
            itemB: rendah.nama,
            countA: tinggi.n,
            countB: rendah.n,
          });
        }}
        className="relative z-20 min-h-12 w-full rounded-2xl bg-yellow-400 px-3 text-sm font-black text-yellow-950"
      >
        Tampilkan Garis Batas Selisih
      </button>
      <button
        type="button"
        onClick={() => {
          setJebakan(true);
          setRapi(false);
        }}
        className="relative z-20 min-h-12 w-full rounded-2xl bg-rose-500 px-3 text-sm font-black text-white"
      >
        Uji Jebakan Jarak Renggang
      </button>
      {jebakan ? (
        <div className="space-y-2 rounded-2xl bg-white p-3 ring-2 ring-rose-300">
          {rapi ? (
            <div className="flex justify-center gap-6">
              <KolomGambar nama="Semangka" ikon="🍉" n={5} max={7} />
              <KolomGambar nama="Stroberi" ikon="🍓" n={7} max={7} />
            </div>
          ) : (
            <div className="space-y-2 text-center">
              <p className="text-3xl tracking-[0.4em]">🍉 🍉 🍉 🍉 🍉</p>
              <p className="text-lg tracking-tight">🍓🍓🍓🍓🍓🍓🍓</p>
              <p className="text-sm font-bold text-rose-800">Baris semangka tampak lebih panjang. Jangan terkecoh!</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setRapi(true);
              kirimEvent("SPACING_TRAP_REVEALED", {
                pesan: "Masuk ke petak sama besar. Stroberi 7 lebih banyak daripada Semangka 5. Hitung jumlahnya, bukan panjang barisnya!",
              });
            }}
            className="min-h-12 w-full rounded-2xl bg-emerald-600 px-3 text-sm font-black text-white"
          >
            Masukkan ke Petak Standar!
          </button>
        </div>
      ) : null}
      <KanvasTugas
        kunci={`selisih-${a}-${b}`}
        jenis="tulis"
        tulisKunci={[String(selisih)]}
        label="Tuliskan selisihnya di kanvas."
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? `Selisih ${selisih}.` : `${tinggi.n} − ${rendah.n} = ${selisih}.`,
            benar: ok,
          })
        }
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: `${tinggi.nama} lebih banyak. Selisih ${selisih}.`, benar: true })}
        labelUji={tinggi.nama}
      />
    </div>
  );
}

function AdeganKuis({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [nomor, setNomor] = useState(0);
  const mic1 = useMic((teks) => {
    const ok = cocokSuara(teks, ["lima", "5"]);
    kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Lima! Ikatan sudah penuh." : "Ucapkan lima.", benar: ok, soal: 1 });
  });
  const mic2 = useMic((teks) => {
    const ok = cocokSuara(teks, ["tiga belas", "13"]);
    kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Tiga belas. 10 + 3." : "Ucapkan tiga belas.", benar: ok, soal: 2 });
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah="Tiga tantangan taman safari. Ikat lima, baca ikatan, lalu hitung selisih diagram." onBicara={onBicara} />
      <p className="text-sm font-black text-[#1C01A5]">Tantangan {nomor + 1} / 3</p>
      {nomor === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Ada 4 garis tegak untuk Kelinci, lalu datang 1 kelinci baru. Tarik garis miring pengikat. Ucapkan lima.</p>
          <p className="text-center text-2xl">🐰🐰🐰🐰 + 🐰</p>
          <KanvasTugas
            kunci="kuis-1"
            jenis="miring"
            latar={<EmpatGarisLatar />}
            label="Gambar garis miring yang memotong keempat garis tegak."
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Ikat lima!" : "Tarik garis miring memotong 4 garis.", benar: ok, soal: 1 })}
          />
          <TombolMikrofon
            menyimak={mic1.menyimak}
            onMulai={mic1.mulai}
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Lima! Ikatan sudah penuh.", benar: true, soal: 1 })}
            labelUji="lima"
          />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Tabel menampilkan 2 ikatan lima + 3 garis tegak. Tulis angkanya dan ucapkan tiga belas.</p>
          <div className="text-center">
            <LambangTurus n={13} />
          </div>
          <KanvasTugas
            kunci="kuis-2"
            jenis="tulis"
            tulisKunci={["13"]}
            label="Tuliskan 13."
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "13. Dua ikat plus 3." : "5 + 5 + 3 = 13.", benar: ok, soal: 2 })}
          />
          <TombolMikrofon
            menyimak={mic2.menyimak}
            onMulai={mic2.mulai}
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Tiga belas. 10 + 3.", benar: true, soal: 2 })}
            labelUji="tiga belas"
          />
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Kolom Kakaktua = 8 dan Merak = 5. Tulis selisihnya.</p>
          <div className="flex justify-center gap-4">
            <KolomGambar nama="Kakaktua" ikon="🦜" n={8} max={8} />
            <KolomGambar nama="Merak" ikon="🦚" n={5} max={8} />
          </div>
          <KanvasTugas
            kunci="kuis-3"
            jenis="tulis"
            tulisKunci={["3"]}
            label="Tuliskan selisih 8 − 5."
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "Selisih 3." : "8 − 5 = 3.", benar: ok, soal: 3 })}
          />
        </div>
      ) : null}
      <NavLangkah
        indeks={nomor}
        total={3}
        labelAkhir="Selesai kuis"
        onPrev={() => setNomor((n) => Math.max(0, n - 1))}
        onNext={() => {
          if (nomor >= 2) kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan taman safari selesai. Hebat!" });
          else setNomor((n) => n + 1);
        }}
      />
    </div>
  );
}

function AdeganEvaluasi({
  kirimEvent,
  onBicara,
  onLulus,
}: {
  kirimEvent: Kirim;
  onBicara: (v: boolean) => void;
  onLulus: (catatan: string) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const catat = (ok: boolean, pesan: string, soal: number) => {
    kirimEvent("EVAL_ANSWERED", { pesan, benar: ok, soal });
  };
  const mic3 = useMic((teks) => {
    const ok = cocokSuara(teks, ["dua", "2"]);
    catat(ok, ok ? "Dua kue keju lagi." : "7 − 5 = 2.", 3);
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru naskah="Lima soal juara. Hitung ikatan turus dan amati petak diagram dengan cermat." onBicara={onBicara} />
      <p className="text-sm font-black text-[#1C01A5]">Soal {nomor + 1} / 5</p>
      {nomor === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Total buah 12. Apel = 5 (1 ikat), Jeruk = 4. Tulis garis turus untuk Mangga.</p>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            🍎 <LambangTurus n={5} /> · 🍊 <LambangTurus n={4} /> · 🥭 ?
          </p>
          <KanvasTugas
            kunci="e1"
            jenis="tulis"
            tulisKunci={["3"]}
            label="Tuliskan 3."
            onHasil={(ok) => catat(ok, ok ? "3 garis. 12 − 9 = 3." : "5 + 4 = 9. 12 − 9 = 3.", 1)}
          />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">2 ikatan lima + 4 garis tegak. Tulis bilangannya.</p>
          <div className="text-center">
            <LambangTurus n={14} />
          </div>
          <KanvasTugas
            kunci="e2"
            jenis="tulis"
            tulisKunci={["14"]}
            label="Tuliskan 14."
            onHasil={(ok) => catat(ok, ok ? "14. 10 + 4." : "5 + 5 + 4 = 14.", 2)}
          />
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Kue Cokelat = 7, Kue Keju = 5. Berapa kue keju lagi supaya sama banyak? Ucapkan.</p>
          <div className="flex justify-center gap-4">
            <KolomGambar nama="Cokelat" ikon="🍫" n={7} max={7} />
            <KolomGambar nama="Keju" ikon="🧀" n={5} max={7} />
          </div>
          <TombolMikrofon
            menyimak={mic3.menyimak}
            onMulai={mic3.mulai}
            onUji={() => catat(true, "Dua kue keju lagi.", 3)}
            labelUji="dua"
          />
        </div>
      ) : null}
      {nomor === 3 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Sepak Bola = 10, Renang = 7, Bulu Tangkis = 4. Tulis selisih paling banyak dan paling sedikit.</p>
          <div className="flex justify-center gap-3">
            <KolomGambar nama="Bola" ikon="⚽" n={10} max={10} />
            <KolomGambar nama="Renang" ikon="🏊" n={7} max={10} />
            <KolomGambar nama="Bulu" ikon="🏸" n={4} max={10} />
          </div>
          <KanvasTugas
            kunci="e4"
            jenis="tulis"
            tulisKunci={["6"]}
            label="Tuliskan 6."
            onHasil={(ok) => catat(ok, ok ? "6. 10 − 4." : "Paling banyak 10, paling sedikit 4.", 4)}
          />
        </div>
      ) : null}
      {nomor === 4 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Pensil = 4, Penghapus = 3, Penggaris = 2. Tulis jumlah seluruh alat tulis.</p>
          <div className="flex justify-center gap-3">
            <KolomGambar nama="Pensil" ikon="✏️" n={4} max={4} />
            <KolomGambar nama="Hapus" ikon="🧽" n={3} max={4} />
            <KolomGambar nama="Garis" ikon="📏" n={2} max={4} />
          </div>
          <KanvasTugas
            kunci="e5"
            jenis="tulis"
            tulisKunci={["9"]}
            label="Tuliskan 9."
            onHasil={(ok) => catat(ok, ok ? "9. 4 + 3 + 2." : "4 + 3 + 2 = 9.", 5)}
          />
        </div>
      ) : null}
      <NavLangkah
        indeks={nomor}
        total={5}
        labelAkhir="Selesai uji"
        onPrev={() => setNomor((n) => Math.max(0, n - 1))}
        onNext={() => {
          if (nomor >= 4) onLulus("Evaluasi turus dan diagram gambar selesai. Kamu ranger teliti!");
          else setNomor((n) => n + 1);
        }}
      />
    </div>
  );
}

export default function SimulasiMtk2Bab8({
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
  const [tab, setTab] = useState<TabLab>("turus");
  const [pesanIgil, setPesanIgil] = useState("Halo penjaga hutan cilik! Yuk catat satwa dengan turus bersama Ranger IGIL.");
  const [sedangBicara, setSedangBicara] = useState(false);
  const [suaraAktif, setSuaraAktif] = useState(true);
  const sudahLulus = useRef(false);
  const sudahMulai = useRef(false);
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
    if (sudahMulai.current) return;
    sudahMulai.current = true;
    const pembukaAwal = "Halo penjaga hutan cilik! Yuk catat satwa dengan turus bersama Ranger IGIL.";
    siapkanSuaraGuruIgil(pembukaAwal, { kelas, kelamin });
    kirimEvent("SCENE_START", {
      pesan: pembukaAwal,
      adegan: "turus",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pembuka: Record<TabLab, string> = {
    turus: "Ketuk satwa atau tombol plus. Setiap lima garis, ikat dengan garis miring. Coba juga Mode Salah tanpa ikatan.",
    jembatan: "Ubah turus di kiri, gambar di kanan ikut berubah. Jumlahnya tetap sama. Boleh tegak atau mendatar.",
    detektif: "Pilih dua kategori, tampilkan garis selisih. Lalu uji jebakan semangka renggang versus stroberi rapat.",
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
        @keyframes igil-ikat {
          0% { transform: scale(1); }
          40% { transform: scale(1.25) rotate(-8deg); }
          100% { transform: scale(1); }
        }
        @keyframes igil-kedip-kuning {
          0%, 100% { background-color: #fef08a; }
          50% { background-color: #facc15; }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
        .igil-ikat { animation: igil-ikat 0.8s ease-in-out; }
        .igil-kedip-kuning { animation: igil-kedip-kuning 0.7s ease-in-out infinite; }
      `}</style>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-emerald-800 to-amber-500 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Berbagai Diagram</h2>
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
      <div className="flex flex-wrap gap-2 bg-emerald-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-[#1C01A5] shadow-sm" : "text-emerald-800 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="relative h-[min(72vh,42rem)] bg-gradient-to-b from-lime-100 to-green-700">
        <div className="h-full overflow-y-auto p-3 sm:p-4">
          {tab === "turus" ? <AdeganTurus kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "jembatan" ? <AdeganJembatan kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "detektif" ? <AdeganDetektif kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "kuis" ? <KuisLima butir={KUIS_MTK2_BAB8} onJawab={(pesan, benar, soal) => kirimEvent("QUIZ_ANSWERED", { pesan, benar, soal })} onSelesai={tandaiSelesai} /> : null}
        </div>
      </div>
    </div>
  );
}
