"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";
import { KuisLima, PitaSuaraIgil, KUIS_MTK2_BAB4 } from "./KuisLimaSimulasi";

export type TutorEventType =
  | "SCENE_START"
  | "REFERENCE_OBJECT_CHANGED"
  | "SPATIAL_SWAP"
  | "PATTERN_UNIT_HIGHLIGHTED"
  | "SOUND_PATTERN_PLAYED"
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
type TabLab = "rak" | "kereta" | "musik" | "kuis";
type Titik = { x: number; y: number };
type IdBenda = "boneka" | "robot" | "mobil" | "tas" | "buku" | "botol" | "bola" | "jam" | "sepatu";
type Arah = "atas" | "bawah" | "kiri" | "kanan";
type JenisPola = "bentuk" | "warna" | "ukuran";
type BentukIrama = "segitiga" | "lingkaran" | "persegi" | null;
type BentukGambar = "lingkaran" | "segitiga" | "persegi" | "silang" | "lain";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "rak", label: "1. Rak Posisi" },
  { id: "kereta", label: "2. Kereta Pola" },
  { id: "musik", label: "3. Musik Gerak" },
  { id: "kuis", label: "4. Kuis" },
];

const BENDA: Record<IdBenda, { label: string; ikon: string; alias: string[] }> = {
  boneka: { label: "Boneka", ikon: "🧸", alias: ["boneka"] },
  robot: { label: "Robot", ikon: "🤖", alias: ["robot"] },
  mobil: { label: "Mobil-mobilan", ikon: "🚗", alias: ["mobil", "mobilmobilan", "mobil-mobilan"] },
  tas: { label: "Tas", ikon: "🎒", alias: ["tas"] },
  buku: { label: "Buku", ikon: "📘", alias: ["buku"] },
  botol: { label: "Botol Minum", ikon: "🍼", alias: ["botol", "botol minum", "minum"] },
  bola: { label: "Bola", ikon: "⚽", alias: ["bola"] },
  jam: { label: "Jam Beker", ikon: "⏰", alias: ["jam", "jam beker", "beker"] },
  sepatu: { label: "Sepatu", ikon: "👟", alias: ["sepatu"] },
};

const RAK_AWAL: IdBenda[][] = [
  ["boneka", "robot", "mobil"],
  ["tas", "buku", "botol"],
  ["bola", "jam", "sepatu"],
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

function cariSel(rak: IdBenda[][], id: IdBenda): { r: number; c: number } | null {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (rak[r][c] === id) return { r, c };
    }
  }
  return null;
}

function tetanggaRak(rak: IdBenda[][], r: number, c: number): Record<Arah, IdBenda | null> {
  return {
    atas: r > 0 ? rak[r - 1][c] : null,
    bawah: r < 2 ? rak[r + 1][c] : null,
    kiri: c > 0 ? rak[r][c - 1] : null,
    kanan: c < 2 ? rak[r][c + 1] : null,
  };
}

function tukarRak(rak: IdBenda[][], a: IdBenda, b: IdBenda): IdBenda[][] {
  const salin = rak.map((baris) => [...baris]);
  const pa = cariSel(salin, a);
  const pb = cariSel(salin, b);
  if (!pa || !pb) return salin;
  const tmp = salin[pa.r][pa.c];
  salin[pa.r][pa.c] = salin[pb.r][pb.c];
  salin[pb.r][pb.c] = tmp;
  return salin;
}

function sudutTajam(poly: Titik[]): number {
  if (poly.length < 6) return 0;
  const langkah = Math.max(1, Math.floor(poly.length / 18));
  const titik: Titik[] = [];
  for (let i = 0; i < poly.length; i += langkah) titik.push(poly[i]);
  if (titik.length < 4) return 0;
  let tajam = 0;
  for (let i = 1; i < titik.length - 1; i++) {
    const a = titik[i - 1];
    const b = titik[i];
    const c = titik[i + 1];
    const v1x = a.x - b.x;
    const v1y = a.y - b.y;
    const v2x = c.x - b.x;
    const v2y = c.y - b.y;
    const d1 = Math.hypot(v1x, v1y);
    const d2 = Math.hypot(v2x, v2y);
    if (d1 < 4 || d2 < 4) continue;
    const cos = (v1x * v2x + v1y * v2y) / (d1 * d2);
    const sudut = Math.acos(Math.max(-1, Math.min(1, cos)));
    if (sudut < 2.2) tajam += 1;
  }
  return tajam;
}

function pathSilang(poly: Titik[]): boolean {
  const n = poly.length;
  if (n < 12) return false;
  const ruas = (i: number) => [poly[i], poly[Math.min(n - 1, i + Math.floor(n / 8))]] as const;
  const silangSegmen = (p1: Titik, p2: Titik, p3: Titik, p4: Titik) => {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (Math.abs(d) < 0.001) return false;
    const t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    const u = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
    return t > 0.08 && t < 0.92 && u > 0.08 && u < 0.92;
  };
  for (let i = 0; i < n - 8; i += 3) {
    const [a, b] = ruas(i);
    for (let j = i + 8; j < n - 2; j += 3) {
      const [c, d] = ruas(j);
      if (silangSegmen(a, b, c, d)) return true;
    }
  }
  return false;
}

function kenaliGambar(poly: Titik[], lebar: number, tinggi: number): { bentuk: BentukGambar; ukuran: "besar" | "kecil" } {
  if (poly.length < 8) return { bentuk: "lain", ukuran: "kecil" };
  const xs = poly.map((p) => p.x);
  const ys = poly.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const bw = Math.max(1, maxX - minX);
  const bh = Math.max(1, maxY - minY);
  const tutup = jarak(poly[0], poly[poly.length - 1]) < Math.max(22, Math.min(bw, bh) * 0.4);
  const aspek = bw / bh;
  const ukuran = Math.max(bw, bh) < Math.min(lebar, tinggi) * 0.45 ? "kecil" : "besar";
  const tajam = sudutTajam(poly);
  if (!tutup && pathSilang(poly)) return { bentuk: "silang", ukuran };
  if (!tutup && bw > 28 && bh > 28 && tajam <= 1) return { bentuk: "silang", ukuran };
  if (tajam >= 2 && tajam <= 4 && aspek > 0.55 && aspek < 1.7) return { bentuk: "segitiga", ukuran };
  if (tajam >= 5 && tajam <= 9 && Math.abs(aspek - 1) < 0.55) return { bentuk: "persegi", ukuran };
  if (tutup && Math.abs(aspek - 1) < 0.5 && tajam <= 3) return { bentuk: "lingkaran", ukuran };
  if (tutup && Math.abs(aspek - 1) < 0.35) return { bentuk: "lingkaran", ukuran };
  return { bentuk: "lain", ukuran };
}

let audioCtx: AudioContext | null = null;

function ctxAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

function bunyiBentuk(jenis: "segitiga" | "lingkaran" | "persegi") {
  const ctx = ctxAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  if (jenis === "segitiga") {
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.14), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.028));
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1800;
    const gain = ctx.createGain();
    gain.gain.value = 0.85;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    return;
  }
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  if (jenis === "lingkaran") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.26);
    gain.gain.setValueAtTime(0.9, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.stop(now + 0.3);
  } else {
    osc.type = "triangle";
    osc.frequency.value = 1480;
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.stop(now + 0.14);
  }
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
}

function IgilSvg({ bicara, menari }: { bicara: boolean; menari?: boolean }) {
  return (
    <span aria-hidden className={`inline-flex h-24 w-20 items-center justify-center text-7xl leading-none ${bicara || menari ? "igil-kedip" : ""}`}>
      🦉
    </span>
  );
}

function SudutIgil({
  pesan,
  sedangBicara,
  onUlang,
  menari,
}: {
  pesan: string;
  sedangBicara: boolean;
  onUlang: () => void;
  menari?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-30 flex max-w-[min(100%,24rem)] items-end gap-2">
      <div className="pointer-events-auto shrink-0">
        <IgilSvg bicara={sedangBicara} menari={menari} />
      </div>
      <div className="pointer-events-auto mb-3 rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-lg ring-2 ring-lime-300">
        <p className="text-sm font-bold leading-snug text-lime-950">{pesan}</p>
        <button
          type="button"
          onClick={onUlang}
          className={`mt-1 inline-flex min-h-12 min-w-12 items-center justify-center gap-1 rounded-xl px-3 text-xs font-black ${
            sedangBicara ? "bg-emerald-400 text-emerald-950" : "bg-lime-400 text-lime-950"
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
          menyimak ? "bg-rose-500 igil-kedip" : "bg-lime-800"
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
      <p className="text-center text-[11px] font-black uppercase tracking-wide text-lime-800">{label}</p>
      <div className="overflow-hidden rounded-2xl border-2 border-dashed border-lime-300 bg-[#FFFDF6]">
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
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-3 text-xs font-black text-lime-800 ring-2 ring-lime-200"
        >
          Hapus Coretan
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={periksa}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-lime-800 px-3 text-xs font-black text-white"
        >
          Periksa Jawaban
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-lime-900">{pesan}</p> : null}
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
  warna = "#ea580c",
}: {
  onSelesai: (poly: Titik[], dx: number, dy: number, lebar: number, tinggi: number) => void;
  disabled?: boolean;
  warna?: string;
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
    ctx.lineWidth = 5;
    ctx.strokeStyle = warna;
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
    const kanvas = canvasRef.current;
    onSelesai(poly, dx, dy, kanvas?.clientWidth ?? 1, kanvas?.clientHeight ?? 1);
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

function selDariJejak(poly: Titik[], kolom: number, baris: number, lebar: number, tinggi: number): number {
  const cx = poly.reduce((s, p) => s + p.x, 0) / poly.length;
  const cy = poly.reduce((s, p) => s + p.y, 0) / poly.length;
  const c = Math.max(0, Math.min(kolom - 1, Math.floor((cx / Math.max(1, lebar)) * kolom)));
  const r = Math.max(0, Math.min(baris - 1, Math.floor((cy / Math.max(1, tinggi)) * baris)));
  return r * kolom + c;
}

function BentukSvg({
  jenis,
  ukuran = "sedang",
  warna = "#0f766e",
}: {
  jenis: "segitiga" | "lingkaran" | "persegi" | "bintang" | "apel" | "pisang";
  ukuran?: "besar" | "kecil" | "sedang";
  warna?: string;
}) {
  const skala = ukuran === "besar" ? 1 : ukuran === "kecil" ? 0.55 : 0.82;
  if (jenis === "apel") return <span className="text-4xl">{ukuran === "kecil" ? "🍎" : "🍎"}</span>;
  if (jenis === "pisang") return <span className="text-4xl">🍌</span>;
  return (
    <svg viewBox="0 0 64 64" width={56 * skala} height={56 * skala} aria-hidden>
      {jenis === "segitiga" ? <polygon points="32,6 58,56 6,56" fill={warna} /> : null}
      {jenis === "lingkaran" ? <circle cx="32" cy="32" r="24" fill={warna} /> : null}
      {jenis === "persegi" ? <rect x="10" y="10" width="44" height="44" rx="4" fill={warna} /> : null}
      {jenis === "bintang" ? (
        <polygon points="32,4 40,24 62,24 44,38 52,58 32,46 12,58 20,38 2,24 24,24" fill={warna} />
      ) : null}
    </svg>
  );
}

type Gerbong = {
  id: string;
  kosong?: boolean;
  bentuk?: "segitiga" | "lingkaran" | "persegi" | "bintang" | "apel" | "pisang";
  ukuran?: "besar" | "kecil";
  warna?: string;
  label?: string;
};

function dataPola(jenis: JenisPola): { gerbong: Gerbong[]; unit: number; jawaban: string; jawabanAlias: string[]; jawabanBentuk: BentukGambar; jawabanUkuran?: "kecil" | "besar"; unitLabel: string } {
  if (jenis === "bentuk") {
    return {
      gerbong: [
        { id: "b0", bentuk: "segitiga", warna: "#f97316" },
        { id: "b1", bentuk: "lingkaran", warna: "#0ea5e9" },
        { id: "b2", bentuk: "segitiga", warna: "#f97316" },
        { id: "b3", bentuk: "lingkaran", warna: "#0ea5e9" },
        { id: "b4", bentuk: "segitiga", warna: "#f97316" },
        { id: "b5", kosong: true },
      ],
      unit: 2,
      jawaban: "Lingkaran",
      jawabanAlias: ["lingkaran"],
      jawabanBentuk: "lingkaran",
      unitLabel: "segitiga lalu lingkaran",
    };
  }
  if (jenis === "warna") {
    return {
      gerbong: [
        { id: "w0", bentuk: "apel", label: "Apel merah" },
        { id: "w1", bentuk: "apel", label: "Apel merah" },
        { id: "w2", bentuk: "pisang", label: "Pisang kuning" },
        { id: "w3", bentuk: "apel", label: "Apel merah" },
        { id: "w4", bentuk: "apel", label: "Apel merah" },
        { id: "w5", kosong: true },
      ],
      unit: 3,
      jawaban: "Pisang kuning",
      jawabanAlias: ["pisang", "kuning"],
      jawabanBentuk: "lain",
      unitLabel: "merah, merah, kuning",
    };
  }
  return {
    gerbong: [
      { id: "u0", bentuk: "bintang", ukuran: "besar", warna: "#eab308" },
      { id: "u1", bentuk: "bintang", ukuran: "kecil", warna: "#eab308" },
      { id: "u2", bentuk: "bintang", ukuran: "besar", warna: "#eab308" },
      { id: "u3", bentuk: "bintang", ukuran: "kecil", warna: "#eab308" },
      { id: "u4", bentuk: "bintang", ukuran: "besar", warna: "#eab308" },
      { id: "u5", kosong: true },
      { id: "u6", kosong: true },
    ],
    unit: 2,
    jawaban: "Bintang kecil",
    jawabanAlias: ["kecil", "bintang kecil"],
    jawabanBentuk: "lain",
    jawabanUkuran: "kecil",
    unitLabel: "besar lalu kecil",
  };
}

export default function SimulasiMtk2Bab4({
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
  const [tab, setTab] = useState<TabLab>("rak");
  const [pesanIgil, setPesanIgil] = useState("Ketuk benda acuan di rak. Lihat atas, bawah, kiri, dan kanannya!");
  const [suaraAktif, setSuaraAktif] = useState(true);
  const [sedangBicara, setSedangBicara] = useState(false);
  const [igilMenari, setIgilMenari] = useState(false);
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
    const pembuka = "Ketuk benda acuan di rak. Lihat atas, bawah, kiri, dan kanannya!";
    siapkanSuaraGuruIgil(pembuka, { kelas, kelamin });
    kirimEvent("SCENE_START", { pesan: pembuka, adegan: "rak" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gantiTab = (id: TabLab) => {
    setTab(id);
    setIgilMenari(false);
    const pembuka: Record<TabLab, string> = {
      rak: "Ketuk benda acuan di rak. Lihat atas, bawah, kiri, dan kanannya!",
      kereta: "Lihat gerbong kereta. Pola apa yang berulang? Isi gerbong kosong!",
      musik: "Susun irama di slot, lalu mainkan bersama IGIL!",
      kuis: "Lima soal berbeda. Pilih jawaban yang tepat.",
    };
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="rounded-[2rem] border-2 border-lime-100 bg-white shadow-xl shadow-lime-100/40">
      <style>{`
        @keyframes igil-kedip {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-6deg); }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-lime-600 to-amber-500 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lime-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Posisi Benda dan Pola</h2>
        </div>
        <button
          type="button"
          onClick={() => setSuaraAktif((v) => !v)}
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-sm font-bold ${
            suaraAktif ? "bg-lime-200 text-lime-950" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>

      <PitaSuaraIgil pesan={pesanIgil} bicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
      <div className="flex flex-wrap gap-2 bg-lime-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-lime-900 shadow-sm" : "text-lime-800 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[34rem] bg-gradient-to-b from-lime-50 to-amber-50 p-3 sm:min-h-[38rem] sm:p-4">
        {tab === "rak" ? <AdeganRak kirimEvent={kirimEvent} /> : null}
        {tab === "kereta" ? <AdeganKereta kirimEvent={kirimEvent} /> : null}
        {tab === "musik" ? <AdeganMusik kirimEvent={kirimEvent} onMenari={setIgilMenari} /> : null}
        {tab === "kuis" ? <KuisLima butir={KUIS_MTK2_BAB4} onJawab={(pesan, benar, soal) => kirimEvent("QUIZ_ANSWERED", { pesan, benar, soal })} onSelesai={tandaiSelesai} /> : null}
      </div>

    </div>
  );
}

function AdeganRak({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [rak, setRak] = useState<IdBenda[][]>(() => RAK_AWAL.map((baris) => [...baris]));
  const [acuan, setAcuan] = useState<IdBenda>("buku");
  const [tanya, setTanya] = useState(false);
  const [lingkar, setLingkar] = useState<IdBenda | null>(null);
  const [suaraOk, setSuaraOk] = useState(false);
  const tarik = useRef<IdBenda | null>(null);
  const pos = cariSel(rak, acuan) ?? { r: 1, c: 1 };
  const arah = tetanggaRak(rak, pos.r, pos.c);
  const misiTanya = (["kanan", "kiri", "atas", "bawah"] as Arah[]).find((k) => arah[k]) ?? "kanan";
  const targetTanya = arah[misiTanya];
  const kataMisi = misiTanya === "atas" ? "di atas" : misiTanya === "bawah" ? "di bawah" : `di sebelah ${misiTanya}`;

  const pilihAcuan = (id: IdBenda) => {
    setAcuan(id);
    setLingkar(null);
    setSuaraOk(false);
    kirimEvent("REFERENCE_OBJECT_CHANGED", {
      pesan: `Sekarang kita jadikan ${BENDA[id].label} sebagai patokan! Lihat benda apa yang ada di atas, bawah, kiri, dan kanannya.`,
      object: BENDA[id].label,
    });
  };

  const lepasDiSel = (id: IdBenda) => {
    const asal = tarik.current;
    tarik.current = null;
    if (asal && asal !== id) {
      const baru = tukarRak(rak, asal, id);
      setRak(baru);
      setLingkar(null);
      setSuaraOk(false);
      const selA = cariSel(baru, asal);
      const baris = selA ? baru[selA.r] : baru[1];
      kirimEvent("SPATIAL_SWAP", {
        pesan: `Wah, posisi ${BENDA[asal].label} dan ${BENDA[id].label} bertukar! Sekarang benda apa yang berada di antara ${BENDA[baris[0]].label} dan ${BENDA[baris[2]].label}?`,
        objA: BENDA[asal].label,
        objB: BENDA[id].label,
        leftObj: BENDA[baris[0]].label,
        rightObj: BENDA[baris[2]].label,
      });
      return;
    }
    pilihAcuan(id);
  };

  const cekSuara = (teks: string) => {
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Browser ini belum dukung mikrofon. Pakai tombol uji.", benar: false });
      return;
    }
    const target = tanya && targetTanya ? targetTanya : acuan;
    const ok = cocokSuara(teks, BENDA[target].alias.concat(Object.entries(arah).flatMap(([k, v]) => (v ? [k, BENDA[v].label] : []))));
    const namaOk = tanya && targetTanya ? cocokSuara(teks, BENDA[targetTanya].alias) : cocokSuara(teks, ["atas", "bawah", "kiri", "kanan", "di antara", "antara", ...BENDA[acuan].alias]);
    const benar = tanya ? namaOk : ok;
    kirimEvent("VOICE_ANSWERED", {
      pesan: benar
        ? tanya && targetTanya
          ? `Benar! ${BENDA[targetTanya].label} ada ${kataMisi} ${BENDA[acuan].label}.`
          : "Posisi terdengar jelas!"
        : `Kamu bilang: "${teks}". Coba lagi.`,
      benar,
      transkrip: teks,
    });
    if (benar) setSuaraOk(true);
  };
  const mic = useMic(cekSuara);

  const labelArah = (id: IdBenda) => {
    if (id === arah.atas) return "Atas";
    if (id === arah.bawah) return "Bawah";
    if (id === arah.kiri) return "Kiri";
    if (id === arah.kanan) return "Kanan";
    return "";
  };

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setTanya((v) => !v);
            setLingkar(null);
            setSuaraOk(false);
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
            tanya ? "bg-orange-500 text-white" : "bg-white text-orange-800 ring-2 ring-orange-200"
          }`}
        >
          Mode Tanya IGIL
        </button>
        <button
          type="button"
          onClick={() => {
            setRak(RAK_AWAL.map((baris) => [...baris]));
            setAcuan("buku");
            setLingkar(null);
            setSuaraOk(false);
          }}
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-sm font-black text-lime-900 ring-2 ring-lime-200"
        >
          Rapikan rak
        </button>
        <p className="rounded-2xl bg-white px-3 py-3 text-xs font-bold text-lime-900 ring-2 ring-lime-200">
          Geser dua benda untuk bertukar. Ketuk satu benda jadi acuan.
        </p>
      </div>

      <div id="kanvas-rak-igil" className="relative min-h-[16rem] flex-1 overflow-hidden rounded-3xl bg-[#8B5A2B] p-3 ring-4 ring-amber-800">
        <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
          {rak.flatMap((baris, r) =>
            baris.map((id, c) => {
              const info = BENDA[id];
              const terpilih = acuan === id;
              const dilingkar = lingkar === id;
              const arahLabel = terpilih ? "Acuan" : labelArah(id);
              return (
                <button
                  key={`${r}-${c}-${id}`}
                  type="button"
                  onPointerDown={() => {
                    if (tanya) return;
                    tarik.current = id;
                  }}
                  onPointerUp={() => {
                    if (tanya) {
                      setLingkar(id);
                      const benar = Boolean(targetTanya && id === targetTanya);
                      kirimEvent("HANDWRITING_CHECKED", {
                        pesan: benar
                          ? `Tepat! ${BENDA[id].label} ada ${kataMisi} ${BENDA[acuan].label}.`
                          : `Itu ${BENDA[id].label}. Cari yang ${kataMisi} ${BENDA[acuan].label}.`,
                        benar,
                        object: BENDA[id].label,
                      });
                      return;
                    }
                    lepasDiSel(id);
                  }}
                  className={`relative z-20 flex min-h-12 flex-col items-center justify-center rounded-2xl bg-[#fde68a] px-1 text-xs font-black text-amber-950 ${
                    terpilih ? "ring-4 ring-sky-500" : dilingkar ? "ring-4 ring-emerald-500" : "ring-2 ring-amber-700"
                  }`}
                >
                  {arahLabel ? <span className="absolute left-1 top-1 rounded bg-white/90 px-1 text-[10px] font-black text-sky-800">{arahLabel}</span> : null}
                  <span className="text-3xl sm:text-4xl">{info.ikon}</span>
                  {info.label}
                </button>
              );
            }),
          )}
        </div>
        {tanya ? (
          <KanvasCoret
            onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
              const idx = selDariJejak(poly, 3, 3, lebar, tinggi);
              const r = Math.floor(idx / 3);
              const c = idx % 3;
              const id = rak[r][c];
              setLingkar(id);
              const benar = Boolean(targetTanya && id === targetTanya);
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar
                  ? `Tepat! ${BENDA[id].label} ada ${kataMisi} ${BENDA[acuan].label}.`
                  : `Lingkaranmu di ${BENDA[id].label}. Cari yang ${kataMisi} ${BENDA[acuan].label}.`,
                benar,
                object: BENDA[id].label,
              });
            }}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-black text-lime-950">
          {tanya
            ? `Lingkari benda yang berada tepat ${kataMisi} ${BENDA[acuan].label}! Ucapkan namanya.`
            : `Acuan: ${BENDA[acuan].label}. Atas ${arah.atas ? BENDA[arah.atas].label : "-"}, bawah ${arah.bawah ? BENDA[arah.bawah].label : "-"}, kiri ${arah.kiri ? BENDA[arah.kiri].label : "-"}, kanan ${arah.kanan ? BENDA[arah.kanan].label : "-"}.`}
        </p>
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          onUji={() => cekSuara(tanya && targetTanya ? BENDA[targetTanya].label : "kanan")}
          labelUji={tanya && targetTanya ? `Ucapkan ${BENDA[targetTanya].label}` : "Ucapkan kanan"}
        />
        {suaraOk ? <p className="text-sm font-black text-emerald-700">Suara tepat!</p> : null}
      </div>
    </div>
  );
}

function PaletJawaban({
  opsi,
  onPilih,
  disabled,
}: {
  opsi: { id: string; label: string }[];
  onPilih: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {opsi.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={disabled}
          onClick={() => onPilih(item.id)}
          className="inline-flex min-h-12 items-center rounded-2xl bg-amber-200 px-3 text-sm font-black text-amber-950 disabled:opacity-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function AdeganKereta({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [jenis, setJenis] = useState<JenisPola>("bentuk");
  const [unitNyala, setUnitNyala] = useState(false);
  const [isiKosong, setIsiKosong] = useState<string | null>(null);
  const [suaraOk, setSuaraOk] = useState(false);
  const data = dataPola(jenis);

  const gantiJenis = (id: JenisPola) => {
    setJenis(id);
    setUnitNyala(false);
    setIsiKosong(null);
    setSuaraOk(false);
  };

  const cekIsi = (nilai: string, dariGambar = false) => {
    const alias = data.jawabanAlias.concat([data.jawaban.toLowerCase()]);
    const benar = cocokSuara(nilai, alias) || (dariGambar && nilai === data.jawabanBentuk) || (data.jawabanUkuran && nilai === data.jawabanUkuran);
    kirimEvent("HANDWRITING_CHECKED", {
      pesan: benar ? `Tepat! Gerbong kosong berisi ${data.jawaban}.` : "Belum tepat. Lihat unit polanya.",
      benar,
      terbaca: nilai,
      expected: data.jawaban,
    });
    if (benar) setIsiKosong(data.jawaban);
  };

  const cekSuara = (teks: string) => {
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Mikrofon belum bisa. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, data.jawabanAlias);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Benar! ${data.jawaban}.` : `Kamu bilang: "${teks}". Coba lagi.`,
      benar: ok,
      transkrip: teks,
    });
    if (ok) {
      setSuaraOk(true);
      setIsiKosong(data.jawaban);
    }
  };
  const mic = useMic(cekSuara);

  const palet =
    jenis === "bentuk"
      ? [
          { id: "segitiga", label: "Segitiga" },
          { id: "lingkaran", label: "Lingkaran" },
          { id: "persegi", label: "Persegi" },
        ]
      : jenis === "warna"
        ? [
            { id: "apel", label: "Apel merah" },
            { id: "pisang", label: "Pisang kuning" },
          ]
        : [
            { id: "besar", label: "Bintang besar" },
            { id: "kecil", label: "Bintang kecil" },
          ];

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["bentuk", "Pola Bentuk AB"],
            ["warna", "Pola Warna AAB"],
            ["ukuran", "Pola Ukuran"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => gantiJenis(id)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
              jenis === id ? "bg-lime-800 text-white" : "bg-white text-lime-900 ring-2 ring-lime-200"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const nyala = !unitNyala;
            setUnitNyala(nyala);
            if (nyala) {
              kirimEvent("PATTERN_UNIT_HIGHLIGHTED", {
                pesan: `Lihat kotak putus-putus itu! Ternyata polanya berulang setiap ${data.unit} benda. Jadi gerbong kosong berikutnya pasti berisi ${data.jawaban}!`,
                unitLength: data.unit,
                answer: data.jawaban,
              });
            }
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
            unitNyala ? "bg-amber-400 text-amber-950" : "bg-white text-amber-900 ring-2 ring-amber-300"
          }`}
        >
          Tampilkan Kotak Unit Pola
        </button>
      </div>

      <div className="relative min-h-[12rem] flex-1 overflow-hidden rounded-3xl bg-sky-100 ring-2 ring-sky-200">
        <div className="flex h-full items-center gap-2 overflow-x-auto px-3 py-4">
          <div className="flex min-h-20 min-w-16 items-center justify-center rounded-2xl bg-rose-500 text-2xl font-black text-white">🚂</div>
          {data.gerbong.map((gerbong, i) => {
            const dalamUnit = unitNyala && !gerbong.kosong && Math.floor(i / data.unit) === Math.floor((data.gerbong.findIndex((g) => g.kosong) - 1) / data.unit);
            const bungkus = unitNyala && !gerbong.kosong && i % data.unit === 0;
            return (
              <div
                key={gerbong.id}
                className={`relative flex min-h-[7.5rem] min-w-[6.2rem] flex-col items-center justify-center rounded-2xl bg-amber-50 px-2 ring-2 ${
                  gerbong.kosong ? "ring-dashed ring-lime-600" : "ring-amber-400"
                } ${unitNyala && !gerbong.kosong ? "outline outline-2 outline-dashed outline-amber-500" : ""} ${bungkus ? "ml-1" : ""}`}
              >
                {dalamUnit ? <span className="absolute -top-2 text-[10px] font-black text-amber-700">unit</span> : null}
                {gerbong.kosong ? (
                  <div className="relative h-full w-full">
                    <p className="pt-6 text-center text-3xl font-black text-lime-800">{isiKosong ? "✓" : "?"}</p>
                    <p className="text-center text-[11px] font-bold text-lime-900">{isiKosong ?? "Gambar di sini"}</p>
                    {!isiKosong ? (
                      <KanvasCoret
                        onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                          const hasil = kenaliGambar(poly, lebar, tinggi);
                          if (jenis === "bentuk") {
                            cekIsi(hasil.bentuk, true);
                            return;
                          }
                          if (jenis === "ukuran") {
                            cekIsi(hasil.ukuran, true);
                            return;
                          }
                          kirimEvent("HANDWRITING_CHECKED", {
                            pesan: "Pilih apel atau pisang di palet, atau ucapkan jawabannya.",
                            benar: false,
                            terbaca: hasil.bentuk,
                          });
                        }}
                      />
                    ) : null}
                  </div>
                ) : (
                  <>
                    {gerbong.bentuk ? <BentukSvg jenis={gerbong.bentuk} ukuran={gerbong.ukuran ?? "sedang"} warna={gerbong.warna} /> : null}
                    <p className="mt-1 text-center text-[11px] font-black text-amber-950">{gerbong.label ?? gerbong.bentuk}</p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <PaletJawaban
          opsi={palet}
          disabled={Boolean(isiKosong)}
          onPilih={(id) => {
            if (jenis === "bentuk") cekIsi(id, true);
            else if (jenis === "warna") cekIsi(id === "pisang" ? "pisang" : "apel");
            else cekIsi(id);
          }}
        />
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          onUji={() => cekSuara(data.jawaban)}
          labelUji={`Ucapkan ${data.jawaban}`}
        />
        {suaraOk ? <p className="text-sm font-black text-emerald-700">Suara tepat!</p> : null}
      </div>
    </div>
  );
}

function AdeganMusik({
  kirimEvent,
  onMenari,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
  onMenari: (v: boolean) => void;
}) {
  const [slot, setSlot] = useState<BentukIrama[]>(() => Array(6).fill(null));
  const [palet, setPalet] = useState<Exclude<BentukIrama, null>>("segitiga");
  const [nyala, setNyala] = useState(-1);
  const [main, setMain] = useState(false);
  const timer = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timer.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const labelBunyi = (item: BentukIrama) => {
    if (item === "segitiga") return "Prok";
    if (item === "lingkaran") return "Boom";
    if (item === "persegi") return "Ting";
    return "";
  };

  const mainkan = () => {
    timer.current.forEach((id) => window.clearTimeout(id));
    const isi = slot.map((item, i) => ({ item, i })).filter((x) => x.item);
    if (isi.length === 0) {
      kirimEvent("SOUND_PATTERN_PLAYED", { pesan: "Isi slot dulu, ya. Ketuk bentuk, lalu ketuk slot." });
      return;
    }
    setMain(true);
    onMenari(true);
    isi.forEach((baris, urut) => {
      const id = window.setTimeout(() => {
        setNyala(baris.i);
        bunyiBentuk(baris.item as Exclude<BentukIrama, null>);
        if (urut === isi.length - 1) {
          const selesai = window.setTimeout(() => {
            setNyala(-1);
            setMain(false);
            onMenari(false);
            const pola = slot.map((item) => labelBunyi(item) || "-").join(" · ");
            kirimEvent("SOUND_PATTERN_PLAYED", {
              pesan: `Asyik! Polamu berbunyi: ${pola}. Keteraturan pola juga bisa kita dengar lewat irama musik!`,
              patternString: pola,
            });
          }, 420);
          timer.current.push(selesai);
        }
      }, urut * 520);
      timer.current.push(id);
    });
  };

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            ["segitiga", "Segitiga · Prok!"],
            ["lingkaran", "Lingkaran · Boom!"],
            ["persegi", "Persegi · Ting!"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setPalet(id);
              bunyiBentuk(id);
            }}
            className={`inline-flex min-h-12 items-center gap-2 rounded-2xl px-3 text-sm font-black ${
              palet === id ? "bg-lime-800 text-white" : "bg-white text-lime-900 ring-2 ring-lime-200"
            }`}
          >
            <BentukSvg jenis={id} ukuran="kecil" warna={id === "segitiga" ? "#f97316" : id === "lingkaran" ? "#0ea5e9" : "#a855f7"} />
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={mainkan}
          disabled={main}
          className="inline-flex min-h-12 items-center rounded-2xl bg-amber-400 px-4 text-sm font-black text-amber-950 disabled:opacity-60"
        >
          Mainkan Pola Bersama IGIL!
        </button>
        <button
          type="button"
          onClick={() => {
            setSlot(Array(6).fill(null));
            setNyala(-1);
          }}
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-sm font-black text-lime-900 ring-2 ring-lime-200"
        >
          Kosongkan
        </button>
      </div>

      <div className="relative flex min-h-[14rem] flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-violet-50 ring-2 ring-violet-200">
        {main ? (
          <div className="igil-kedip">
            <IgilSvg bicara menari />
          </div>
        ) : (
          <p className="text-sm font-black text-violet-900">IGIL siap bertepuk dan menari sesuai slotmu.</p>
        )}
        <div className="flex flex-wrap justify-center gap-2 px-2">
          {slot.map((item, i) => (
            <button
              key={`slot-${i}`}
              type="button"
              onClick={() => {
                setSlot((lama) => lama.map((isi, idx) => (idx === i ? palet : isi)));
              }}
              className={`flex min-h-20 min-w-16 flex-col items-center justify-center rounded-2xl bg-white text-xs font-black text-violet-950 ring-2 ${
                nyala === i ? "ring-amber-400 igil-kedip" : "ring-violet-200"
              }`}
            >
              {item ? (
                <BentukSvg jenis={item} ukuran="sedang" warna={item === "segitiga" ? "#f97316" : item === "lingkaran" ? "#0ea5e9" : "#a855f7"} />
              ) : (
                <span className="text-2xl text-violet-300">{i + 1}</span>
              )}
              {item ? labelBunyi(item) : "isi"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModeKuis({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [lingkar, setLingkar] = useState("");
  const [gambarOk, setGambarOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);

  const reset = () => {
    setLingkar("");
    setGambarOk(false);
    setSuaraOk(false);
  };

  const lanjut = () => {
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan kuis selesai. Hebat!" });
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
    if (nomor === 0) cekSuara(teks, ["buku"], "Benar! Buku ada di atas jam beker.");
    if (nomor === 1) cekSuara(teks, ["kecil"], "Benar! Berikutnya lingkaran kecil.");
    if (nomor === 2) cekSuara(teks, ["persegi", "segiempat", "segi empat"], "Benar! Yang hilang persegi.");
  });

  const selesaiSoal = nomor === 0 ? lingkar === "buku" && suaraOk : gambarOk && suaraOk;

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-lime-900">Tantangan {nomor + 1} dari 3</p>

      {nomor === 0 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Lingkari benda tepat di atas Jam Beker. Ucapkan namanya.</p>
          <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-3xl bg-[#8B5A2B] p-2 ring-4 ring-amber-800">
            <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
              {RAK_AWAL.flatMap((baris, r) =>
                baris.map((id) => (
                  <button
                    key={`k1-${id}`}
                    type="button"
                    onClick={() => {
                      setLingkar(id);
                      const benar = id === "buku";
                      kirimEvent("QUIZ_ANSWERED", {
                        pesan: benar ? "Tepat! Buku ada di atas jam beker." : `${BENDA[id].label} bukan yang di atas jam.`,
                        benar,
                        soal: 1,
                      });
                    }}
                    className={`relative z-20 flex min-h-12 flex-col items-center justify-center rounded-2xl bg-[#fde68a] text-xs font-black ${
                      lingkar === id ? (id === "buku" ? "ring-4 ring-emerald-500" : "ring-4 ring-rose-400") : "ring-2 ring-amber-700"
                    }`}
                  >
                    <span className="text-3xl">{BENDA[id].ikon}</span>
                    {BENDA[id].label}
                  </button>
                )),
              )}
            </div>
            <KanvasCoret
              onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                const idx = selDariJejak(poly, 3, 3, lebar, tinggi);
                const r = Math.floor(idx / 3);
                const c = idx % 3;
                const id = RAK_AWAL[r][c];
                setLingkar(id);
                const benar = id === "buku";
                kirimEvent("QUIZ_ANSWERED", {
                  pesan: benar ? "Tepat! Buku ada di atas jam beker." : `${BENDA[id].label} bukan yang di atas jam.`,
                  benar,
                  soal: 1,
                });
              }}
            />
          </div>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("buku", ["buku"], "Benar! Buku ada di atas jam beker.")}
            labelUji="Ucapkan Buku"
          />
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Lingkaran besar, lingkaran kecil, lingkaran besar, lalu? Gambar yang kecil. Ucapkan kecil.</p>
          <div className="flex flex-wrap items-center gap-2">
            <BentukSvg jenis="lingkaran" ukuran="besar" warna="#0ea5e9" />
            <BentukSvg jenis="lingkaran" ukuran="kecil" warna="#0ea5e9" />
            <BentukSvg jenis="lingkaran" ukuran="besar" warna="#0ea5e9" />
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-dashed border-lime-600 bg-white">
              {gambarOk ? <BentukSvg jenis="lingkaran" ukuran="kecil" warna="#22c55e" /> : null}
              {!gambarOk ? (
                <KanvasCoret
                  onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                    const hasil = kenaliGambar(poly, lebar, tinggi);
                    const benar = hasil.bentuk === "lingkaran" && hasil.ukuran === "kecil";
                    kirimEvent("QUIZ_ANSWERED", {
                      pesan: benar ? "Lingkaran kecil, tepat!" : "Gambar lingkaran yang lebih kecil.",
                      benar,
                      soal: 2,
                    });
                    if (benar) setGambarOk(true);
                  }}
                />
              ) : null}
            </div>
          </div>
          <PaletJawaban
            opsi={[
              { id: "besar", label: "Besar" },
              { id: "kecil", label: "Kecil" },
            ]}
            disabled={gambarOk}
            onPilih={(id) => {
              const benar = id === "kecil";
              kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "Kecil, tepat!" : "Yang kecil, ya.", benar, soal: 2 });
              if (benar) setGambarOk(true);
            }}
          />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("kecil", ["kecil"], "Benar! Berikutnya lingkaran kecil.")}
            labelUji="Ucapkan Kecil"
          />
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Segitiga, persegi, lingkaran, segitiga, lalu? Gambar persegi. Ucapkan persegi.</p>
          <div className="flex flex-wrap items-center gap-2">
            <BentukSvg jenis="segitiga" warna="#f97316" />
            <BentukSvg jenis="persegi" warna="#a855f7" />
            <BentukSvg jenis="lingkaran" warna="#0ea5e9" />
            <BentukSvg jenis="segitiga" warna="#f97316" />
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-dashed border-lime-600 bg-white">
              {gambarOk ? <BentukSvg jenis="persegi" warna="#22c55e" /> : null}
              {!gambarOk ? (
                <KanvasCoret
                  onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                    const hasil = kenaliGambar(poly, lebar, tinggi);
                    const benar = hasil.bentuk === "persegi";
                    kirimEvent("QUIZ_ANSWERED", {
                      pesan: benar ? "Persegi, tepat!" : "Gambar persegi di kotak kosong.",
                      benar,
                      soal: 3,
                    });
                    if (benar) setGambarOk(true);
                  }}
                />
              ) : null}
            </div>
            <BentukSvg jenis="lingkaran" warna="#0ea5e9" />
          </div>
          <PaletJawaban
            opsi={[
              { id: "segitiga", label: "Segitiga" },
              { id: "persegi", label: "Persegi" },
              { id: "lingkaran", label: "Lingkaran" },
            ]}
            disabled={gambarOk}
            onPilih={(id) => {
              const benar = id === "persegi";
              kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "Persegi, tepat!" : "Coba lihat unit ABC.", benar, soal: 3 });
              if (benar) setGambarOk(true);
            }}
          />
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("persegi", ["persegi", "segiempat", "segi empat"], "Benar! Yang hilang persegi.")}
            labelUji="Ucapkan Persegi"
          />
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
  const [pilih, setPilih] = useState("");
  const [gambarOk, setGambarOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const [tulisOk, setTulisOk] = useState(false);
  const [coret, setCoret] = useState(-1);

  const reset = () => {
    setPilih("");
    setGambarOk(false);
    setSuaraOk(false);
    setTulisOk(false);
    setCoret(-1);
  };

  const lanjut = () => {
    if (nomor >= 4) {
      onLulus("Evaluasi posisi dan pola selesai. Lima soal sudah dijawab.");
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
    if (nomor === 0) cekSuara(teks, ["siti"], "Benar! Siti di kiri Budi.");
    if (nomor === 1) cekSuara(teks, ["sendok"], "Benar! Sendok di antara piring dan gelas.");
    if (nomor === 3) cekSuara(teks, ["biru"], "Benar! Bendera terakhir mestinya biru.");
  });

  const anak = [
    { id: "siti", label: "Siti", ikon: "👧" },
    { id: "budi", label: "Budi", ikon: "👦" },
    { id: "edo", label: "Edo", ikon: "🧒" },
  ];
  const meja = [
    { id: "piring", label: "Piring", ikon: "🍽️" },
    { id: "sendok", label: "Sendok", ikon: "🥄" },
    { id: "gelas", label: "Gelas", ikon: "🥛" },
  ];
  const bendera = ["Merah", "Biru", "Merah", "Biru", "Merah", "Merah"];
  const bintang = [1, 2, 3, 1];

  const selesaiSoal =
    nomor === 0 ? pilih === "siti" && suaraOk : nomor === 1 ? suaraOk : nomor === 2 ? gambarOk : nomor === 3 ? coret === 5 && suaraOk : tulisOk;

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-lime-900">Soal {nomor + 1} dari 5</p>

      {nomor === 0 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Siti, Budi, Edo duduk berjajar. Lingkari anak di sebelah kiri Budi. Ucapkan namanya.</p>
          <div className="relative min-h-[10rem] overflow-hidden rounded-3xl bg-amber-50 p-3 ring-2 ring-amber-200">
            <div className="grid h-full grid-cols-3 gap-2">
              {anak.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPilih(item.id);
                    const benar = item.id === "siti";
                    kirimEvent("EVAL_ANSWERED", {
                      pesan: benar ? "Tepat! Siti di kiri Budi." : `${item.label} bukan di kiri Budi.`,
                      benar,
                      pilihan: item.id,
                      soal: 1,
                    });
                  }}
                  className={`relative z-20 flex min-h-24 flex-col items-center justify-center rounded-2xl bg-white text-sm font-black ${
                    pilih === item.id ? (item.id === "siti" ? "ring-4 ring-emerald-500" : "ring-4 ring-rose-400") : "ring-2 ring-lime-200"
                  }`}
                >
                  <span className="text-4xl">{item.ikon}</span>
                  {item.label}
                </button>
              ))}
            </div>
            <KanvasCoret
              onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                const idx = selDariJejak(poly, 3, 1, lebar, tinggi);
                const item = anak[idx];
                setPilih(item.id);
                const benar = item.id === "siti";
                kirimEvent("EVAL_ANSWERED", {
                  pesan: benar ? "Tepat! Siti di kiri Budi." : `${item.label} bukan di kiri Budi.`,
                  benar,
                  pilihan: item.id,
                  soal: 1,
                });
              }}
            />
          </div>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("siti", ["siti"], "Benar! Siti di kiri Budi.")}
            labelUji="Ucapkan Siti"
          />
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Piring, sendok, gelas. Benda apa di antara piring dan gelas? Ucapkan namanya.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {meja.map((item) => (
              <div key={item.id} className="flex min-h-24 min-w-24 flex-col items-center justify-center rounded-2xl bg-white ring-2 ring-lime-200">
                <span className="text-4xl">{item.ikon}</span>
                <span className="text-sm font-black">{item.label}</span>
              </div>
            ))}
          </div>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("sendok", ["sendok"], "Benar! Sendok di antara piring dan gelas.")}
            labelUji="Ucapkan Sendok"
          />
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Segitiga, segitiga, lingkaran, segitiga, segitiga, lalu? Gambar lingkaran.</p>
          <div className="flex flex-wrap items-center gap-2">
            <BentukSvg jenis="segitiga" warna="#f97316" />
            <BentukSvg jenis="segitiga" warna="#f97316" />
            <BentukSvg jenis="lingkaran" warna="#0ea5e9" />
            <BentukSvg jenis="segitiga" warna="#f97316" />
            <BentukSvg jenis="segitiga" warna="#f97316" />
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-dashed border-lime-600 bg-white">
              {gambarOk ? <BentukSvg jenis="lingkaran" warna="#22c55e" /> : null}
              {!gambarOk ? (
                <KanvasCoret
                  onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                    const hasil = kenaliGambar(poly, lebar, tinggi);
                    const benar = hasil.bentuk === "lingkaran";
                    kirimEvent("EVAL_ANSWERED", { pesan: benar ? "Lingkaran, tepat!" : "Polanya AAB. Berikutnya lingkaran.", benar, soal: 3 });
                    if (benar) setGambarOk(true);
                  }}
                />
              ) : null}
            </div>
          </div>
          <PaletJawaban
            opsi={[
              { id: "segitiga", label: "Segitiga" },
              { id: "lingkaran", label: "Lingkaran" },
              { id: "persegi", label: "Persegi" },
            ]}
            disabled={gambarOk}
            onPilih={(id) => {
              const benar = id === "lingkaran";
              kirimEvent("EVAL_ANSWERED", { pesan: benar ? "Lingkaran, tepat!" : "Dua segitiga, satu lingkaran.", benar, soal: 3 });
              if (benar) setGambarOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 3 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Bendera merah-biru berulang. Coret yang salah. Ucapkan warna yang benar.</p>
          <div className="relative min-h-[8rem] overflow-hidden rounded-3xl bg-white p-3 ring-2 ring-lime-200">
            <div className="grid h-full grid-cols-6 gap-2">
              {bendera.map((warna, i) => (
                <button
                  key={`bd-${i}`}
                  type="button"
                  onClick={() => {
                    setCoret(i);
                    const benar = i === 5;
                    kirimEvent("EVAL_ANSWERED", {
                      pesan: benar ? "Itu yang salah. Seharusnya biru." : "Cari bendera yang tidak mengikuti pola.",
                      benar,
                      soal: 4,
                    });
                  }}
                  className={`relative z-20 flex min-h-20 items-center justify-center rounded-xl text-xs font-black text-white ${
                    warna === "Merah" ? "bg-rose-500" : "bg-sky-500"
                  } ${coret === i ? "ring-4 ring-amber-400" : ""}`}
                >
                  {warna}
                  {coret === i ? <span className="absolute inset-0 text-4xl text-slate-900">✕</span> : null}
                </button>
              ))}
            </div>
            <KanvasCoret
              warna="#111827"
              onSelesai={(poly, _dx, _dy, lebar, tinggi) => {
                const idx = selDariJejak(poly, 6, 1, lebar, tinggi);
                const hasil = kenaliGambar(poly, lebar, tinggi);
                setCoret(idx);
                const benar = idx === 5 || (hasil.bentuk === "silang" && idx >= 4);
                kirimEvent("EVAL_ANSWERED", {
                  pesan: benar ? "Itu yang salah. Seharusnya biru." : "Coret bendera terakhir yang salah.",
                  benar,
                  soal: 4,
                });
                if (benar) setCoret(5);
              }}
            />
          </div>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("biru", ["biru"], "Benar! Bendera terakhir mestinya biru.")}
            labelUji="Ucapkan Biru"
          />
        </>
      ) : null}

      {nomor === 4 ? (
        <>
          <p className="text-sm font-bold text-slate-700">1 bintang, 2 bintang, 3 bintang, 1 bintang, lalu berapa? Tulis angkanya.</p>
          <div className="flex flex-wrap items-center gap-3">
            {bintang.map((n, i) => (
              <div key={`bt-${i}`} className="min-w-16 rounded-2xl bg-white p-2 text-center ring-2 ring-amber-200">
                <p className="text-xl">{Array.from({ length: n }, () => "⭐").join("")}</p>
                <p className="text-xs font-black">{n}</p>
              </div>
            ))}
            <div className="min-w-[7rem] rounded-2xl border-2 border-dashed border-lime-600 bg-white p-2">
              <KanvasTulis
                kunci="e5"
                expected="2"
                label="Tulis 2"
                opsiScaffold={["2", "3", "4"]}
                disabled={tulisOk}
                onHasil={(benar, terbaca) => {
                  kirimEvent("EVAL_ANSWERED", {
                    pesan: benar ? "2 tepat! Polanya 1, 2, 3, lalu ulang." : "Hitung lagi. Setelah 1, berikutnya 2.",
                    benar,
                    terbaca,
                    soal: 5,
                  });
                  if (benar) setTulisOk(true);
                }}
              />
            </div>
          </div>
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
