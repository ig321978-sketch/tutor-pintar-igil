"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";
import { KuisLima, PitaSuaraIgil, KUIS_MTK2_BAB2 } from "./KuisLimaSimulasi";

export type TutorEventType =
  | "SCENE_START"
  | "OVERFLOW_TEN_DETECTED"
  | "UNBUNDLE_REQUIRED"
  | "BUNDLE_TEN"
  | "UNBUNDLE_TEN"
  | "TEN_JUMP_EXECUTED"
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

type TutorEventMasuk = {
  waktu: string;
  jenis: string;
  payload: TutorEventPayload;
};

type TabLab = "meja" | "katak" | "pasangan" | "kuis";
type Titik = { x: number; y: number };
type Operasi = "plus" | "minus";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "meja", label: "1. Meja Rakit" },
  { id: "katak", label: "2. Lompat Katak" },
  { id: "pasangan", label: "3. Pasangan" },
  { id: "kuis", label: "4. Kuis" },
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
    return n.includes(a) || a.includes(n);
  });
}

function pecah(n: number): { puluhan: number; satuan: number } {
  return { puluhan: Math.floor(n / 10), satuan: n % 10 };
}

function tintaPixel(data: Uint8ClampedArray, i: number): boolean {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  return a > 50 && r < 170 && b > r + 15;
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

function IgilSvg({ bicara }: { bicara: boolean }) {
  return (
    <span aria-hidden className={`inline-flex h-24 w-20 items-center justify-center text-7xl leading-none ${bicara ? "igil-kedip" : ""}`}>
      🦉
    </span>
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
          menyimak ? "bg-rose-500 igil-kedip" : "bg-indigo-600"
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
      <p className="text-center text-[11px] font-black uppercase tracking-wide text-indigo-600">{label}</p>
      <div className="overflow-hidden rounded-2xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
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
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-3 text-xs font-black text-indigo-800 ring-2 ring-indigo-200"
        >
          Hapus Coretan
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={periksa}
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-indigo-600 px-3 text-xs font-black text-white"
        >
          Periksa Jawaban
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-indigo-800">{pesan}</p> : null}
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
  onSelesai: (poly: Titik[], dx: number) => void;
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
    kanvas.setPointerCapture(event.pointerId);
    gambar.current = true;
    jejak.current = [titikDari(event)];
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
    if (poly.length < 6) return;
    const dx = poly[poly.length - 1].x - poly[0].x;
    onSelesai(poly, dx);
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

function BatangPuluhan({
  warna,
  dicoret,
  kedip,
  onClick,
}: {
  warna: string;
  dicoret?: boolean;
  kedip?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex min-h-12 min-w-12 flex-col items-center justify-end rounded-xl p-1 ring-2 ${
        kedip ? "igil-kedip ring-amber-400" : "ring-indigo-200"
      }`}
      style={{ background: `${warna}22` }}
      aria-label="Batang puluhan"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="mb-0.5 h-1.5 w-7 rounded-sm" style={{ background: warna }} />
      ))}
      {dicoret ? <span className="absolute inset-0 flex items-center justify-center text-2xl font-black text-rose-700">✕</span> : null}
    </button>
  );
}

function KubusSatuan({
  warna,
  dicoret,
  onClick,
}: {
  warna: string;
  dicoret?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-lg ring-2 ring-indigo-200"
      style={{ background: warna }}
      aria-label="Kubus satuan"
    >
      <span className="text-lg" aria-hidden>
        🍎
      </span>
      {dicoret ? <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">✕</span> : null}
    </button>
  );
}

function PapanBersusun({
  operasi,
  atas,
  bawah,
  simpan,
  pinjamSatuan,
  hasil,
}: {
  operasi: "+" | "−";
  atas: [number, number];
  bawah: [number, number];
  simpan?: number;
  pinjamSatuan?: number;
  hasil?: number;
}) {
  const hasilP = hasil == null ? "" : String(Math.floor(hasil / 10));
  const hasilS = hasil == null ? "" : String(hasil % 10);
  return (
    <div className="min-w-[9rem] rounded-2xl bg-white px-3 py-3 ring-2 ring-indigo-200">
      <p className="mb-1 text-center text-[11px] font-black uppercase tracking-wide text-indigo-600">Cara bersusun pendek</p>
      <div className="grid grid-cols-[1.5rem_2.2rem_2.2rem] items-end justify-center gap-y-1 text-center">
        <span />
        <span className="text-sm font-black text-rose-600">{simpan ? simpan : pinjamSatuan != null ? Math.floor(atas[0]) - 1 : ""}</span>
        <span className="text-sm font-black text-rose-600">{pinjamSatuan != null ? pinjamSatuan : ""}</span>
        <span />
        <span className="text-3xl font-black text-indigo-800">{atas[0]}</span>
        <span className="text-3xl font-black text-indigo-800">{atas[1]}</span>
        <span className="text-2xl font-black text-indigo-500">{operasi}</span>
        <span className="text-3xl font-black text-indigo-800">{bawah[0]}</span>
        <span className="text-3xl font-black text-indigo-800">{bawah[1]}</span>
        <span className="col-span-3 border-t-2 border-indigo-800" />
        <span />
        <span className="text-3xl font-black text-emerald-700">{hasilP}</span>
        <span className="text-3xl font-black text-emerald-700">{hasilS}</span>
      </div>
    </div>
  );
}

function KatakSvg() {
  return (
    <svg width="44" height="40" viewBox="0 0 44 40" aria-hidden>
      <ellipse cx="22" cy="24" rx="16" ry="12" fill="#22c55e" stroke="#166534" strokeWidth="1.6" />
      <circle cx="14" cy="14" r="6" fill="#4ade80" stroke="#166534" strokeWidth="1.4" />
      <circle cx="30" cy="14" r="6" fill="#4ade80" stroke="#166534" strokeWidth="1.4" />
      <circle cx="14" cy="14" r="2.4" fill="#0f172a" />
      <circle cx="30" cy="14" r="2.4" fill="#0f172a" />
    </svg>
  );
}

export default function SimulasiMtk2Bab2({
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
  const [tab, setTab] = useState<TabLab>("meja");
  const [pesanIgil, setPesanIgil] = useState("Yuk rakit jambu di meja puluhan dan satuan. 27 + 15, mulai dari satuan!");
  const [suaraAktif, setSuaraAktif] = useState(true);
  const [sedangBicara, setSedangBicara] = useState(false);
  const sudahLulus = useRef(false);
  const suaraRef = useRef(suaraAktif);
  suaraRef.current = suaraAktif;

  const ucapkan = useCallback(
    (teks: string) => {
      if (!suaraRef.current) return;
      void ucapkanGuruIgil(teks, {
        kelas,
        kelamin,
        onBicara: setSedangBicara,
      });
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
    const pembuka = "Yuk rakit jambu di meja puluhan dan satuan. 27 + 15, mulai dari satuan!";
    siapkanSuaraGuruIgil(pembuka, { kelas, kelamin });
    kirimEvent("SCENE_START", { pesan: pembuka, adegan: "meja" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gantiTab = (id: TabLab) => {
    setTab(id);
    const pembuka: Record<TabLab, string> = {
      meja: "Yuk rakit jambu di meja puluhan dan satuan. 27 + 15, mulai dari satuan!",
      katak: "Katak mulai di 24. Lompat besar +10, lalu lompat kecil +1 tiga kali.",
      pasangan: "Lingkaran atas total. Dua lingkaran bawah bagian. Cari yang hilang!",
      kuis: "Lima soal berbeda. Pilih jawaban yang tepat.",
    };
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="rounded-[2rem] border-2 border-rose-100 bg-white shadow-xl shadow-rose-100/40">
      <style>{`
        @keyframes igil-kedip {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-rose-500 to-indigo-600 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Penjumlahan dan Pengurangan</h2>
        </div>
        <button
          type="button"
          onClick={() => setSuaraAktif((v) => !v)}
          className={`inline-flex min-h-12 items-center rounded-xl px-3 text-sm font-bold ${
            suaraAktif ? "bg-amber-400 text-slate-900" : "bg-white/20 text-white"
          }`}
        >
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>

      <PitaSuaraIgil pesan={pesanIgil} bicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
      <div className="flex flex-wrap gap-2 bg-rose-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-rose-700 shadow-sm" : "text-rose-600 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[34rem] bg-gradient-to-b from-rose-50 to-amber-50 p-3 sm:min-h-[38rem] sm:p-4">
        {tab === "meja" ? <AdeganMeja kirimEvent={kirimEvent} /> : null}
        {tab === "katak" ? <AdeganKatak kirimEvent={kirimEvent} /> : null}
        {tab === "pasangan" ? <AdeganPasangan kirimEvent={kirimEvent} /> : null}
        {tab === "kuis" ? <KuisLima butir={KUIS_MTK2_BAB2} onJawab={(pesan, benar, soal) => kirimEvent("QUIZ_ANSWERED", { pesan, benar, soal })} onSelesai={tandaiSelesai} /> : null}
      </div>

    </div>
  );
}

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

function AdeganMeja({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [operasi, setOperasi] = useState<Operasi>("plus");
  const [bundled, setBundled] = useState(false);
  const [unbundled, setUnbundled] = useState(false);
  const [diambil, setDiambil] = useState(false);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const overflowRef = useRef(false);
  const unbundleRef = useRef(false);

  const a = operasi === "plus" ? 27 : 32;
  const b = 15;
  const { puluhan: pa, satuan: sa } = pecah(a);
  const { puluhan: pb, satuan: sb } = pecah(b);
  const satuanGabung = sa + sb;
  const perluIkat = operasi === "plus" && satuanGabung >= 10 && !bundled;
  const perluBongkar = operasi === "minus" && sa < sb && !unbundled;
  const puluhanKini =
    operasi === "plus" ? pa + pb + (bundled ? 1 : 0) : unbundled ? pa - 1 - (diambil ? pb : 0) : pa - (diambil ? pb : 0);
  const satuanKini =
    operasi === "plus" ? (bundled ? satuanGabung - 10 : satuanGabung) : unbundled ? sa + 10 - (diambil ? sb : 0) : sa;
  const hasil = operasi === "plus" ? a + b : a - b;
  const siapTulis = operasi === "plus" ? bundled || satuanGabung < 10 : diambil;

  useEffect(() => {
    overflowRef.current = false;
    unbundleRef.current = false;
    setBundled(false);
    setUnbundled(false);
    setDiambil(false);
    setTulisOk(false);
    setSuaraOk(false);
  }, [operasi]);

  useEffect(() => {
    if (perluIkat && !overflowRef.current) {
      overflowRef.current = true;
      kirimEvent("OVERFLOW_TEN_DETECTED", {
        pesan: `Wah, kubus satuannya ada ${satuanGabung}! Yuk lingkari atau klik 'Ikat 10 Jadi Puluhan' supaya pindah ke kamar Puluhan.`,
        onesTotal: satuanGabung,
      });
    }
    if (perluBongkar && !unbundleRef.current) {
      unbundleRef.current = true;
      kirimEvent("UNBUNDLE_REQUIRED", {
        pesan: `Kubus satuannya cuma ${sa}, belum cukup diambil ${sb}. Yuk bongkar 1 Batang Puluhan di kiri menjadi 10 satuan!`,
        ones: sa,
        subOnes: sb,
      });
    }
  }, [perluIkat, perluBongkar, satuanGabung, sa, sb, kirimEvent]);

  const ikat = () => {
    if (!perluIkat) return;
    setBundled(true);
    kirimEvent("BUNDLE_TEN", {
      pesan: "Hore! 10 satuan jadi 1 puluhan. Tulis 42, lalu ucapkan empat puluh dua.",
      hasil: 42,
    });
  };

  const bongkar = () => {
    if (!perluBongkar) return;
    setUnbundled(true);
    kirimEvent("UNBUNDLE_TEN", {
      pesan: "Satu puluhan dibongkar jadi 10 satuan. Sekarang satuan 12, cukup diambil 5. Ketuk Ambil 15.",
    });
  };

  const ambil = () => {
    if (operasi !== "minus" || diambil) return;
    if (sa < sb && !unbundled) {
      bongkar();
      return;
    }
    setDiambil(true);
    kirimEvent("UNBUNDLE_TEN", {
      pesan: "15 sudah diambil. Sisa 17. Tulis 17, lalu ucapkan tujuh belas.",
      hasil: 17,
    });
  };

  const cekSuara = (teks: string) => {
    const alias = operasi === "plus" ? ["empat puluh dua", "42"] : ["tujuh belas", "17"];
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Browser ini belum dukung mikrofon. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, alias);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Benar! ${alias[0]}.` : `Kamu bilang: "${teks}". Coba lagi.`,
      benar: ok,
      transkrip: teks,
    });
    if (ok) setSuaraOk(true);
  };

  const mic = useMic(cekSuara);
  const expected = String(hasil);
  const warnaA = "#fb7185";
  const warnaB = "#2dd4bf";

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setOperasi("plus")}
          className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black ${
            operasi === "plus" ? "bg-indigo-600 text-white" : "bg-white text-indigo-700 ring-2 ring-indigo-200"
          }`}
        >
          Penjumlahan (+)
        </button>
        <button
          type="button"
          onClick={() => setOperasi("minus")}
          className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black ${
            operasi === "minus" ? "bg-indigo-600 text-white" : "bg-white text-indigo-700 ring-2 ring-indigo-200"
          }`}
        >
          Pengurangan (−)
        </button>
        <p className="self-center text-lg font-black text-indigo-800">
          {a} {operasi === "plus" ? "+" : "−"} {b}
        </p>
        {operasi === "plus" ? (
          <button
            type="button"
            onClick={ikat}
            disabled={!perluIkat}
            className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black text-white disabled:opacity-40 ${
              perluIkat ? "igil-kedip bg-orange-500" : "bg-orange-400"
            }`}
          >
            Ikat 10 Jadi 1 Puluhan!
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={bongkar}
              disabled={!perluBongkar}
              className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black text-white disabled:opacity-40 ${
                perluBongkar ? "igil-kedip bg-orange-500" : "bg-orange-400"
              }`}
            >
              Bongkar 1 Puluhan Jadi 10 Satuan
            </button>
            <button
              type="button"
              onClick={ambil}
              disabled={diambil || (sa < sb && !unbundled)}
              className="inline-flex min-h-12 items-center rounded-2xl bg-rose-500 px-4 text-sm font-black text-white disabled:opacity-40"
            >
              Ambil {b}
            </button>
          </>
        )}
        <p className="self-center text-sm font-bold text-slate-700">
          Puluhan {puluhanKini} · Satuan {satuanKini}
        </p>
      </div>

      <div className="grid min-h-[14rem] flex-1 gap-3 lg:grid-cols-[1fr_1fr_12rem]">
        <div className="rounded-3xl bg-indigo-50 p-3 ring-2 ring-indigo-200">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-wide text-indigo-700">Puluhan</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: Math.max(0, puluhanKini) }).map((_, i) => (
              <BatangPuluhan
                key={`p-${i}`}
                warna={i < pa - (operasi === "minus" && unbundled ? 1 : 0) ? warnaA : warnaB}
                kedip={perluBongkar && i === 0}
                onClick={perluBongkar ? bongkar : undefined}
              />
            ))}
          </div>
        </div>
        <div className="relative rounded-3xl bg-amber-50 p-3 ring-2 ring-amber-200">
          <p className="mb-2 text-center text-[11px] font-black uppercase tracking-wide text-amber-800">Satuan</p>
          <div className="flex flex-wrap justify-center gap-1">
            {Array.from({ length: Math.max(0, satuanKini) }).map((_, i) => (
              <KubusSatuan key={`s-${i}`} warna={i < (operasi === "plus" ? sa : satuanKini) ? warnaA : warnaB} />
            ))}
          </div>
          {perluIkat ? <KanvasCoret onSelesai={(_p, _dx) => ikat()} /> : null}
        </div>
        <PapanBersusun
          operasi={operasi === "plus" ? "+" : "−"}
          atas={[pa, sa]}
          bawah={[pb, sb]}
          simpan={bundled ? 1 : undefined}
          pinjamSatuan={unbundled ? 12 : undefined}
          hasil={siapTulis ? hasil : undefined}
        />
      </div>

      {siapTulis ? (
        <div className="flex flex-wrap items-end gap-4">
          <KanvasTulis
            kunci={`${operasi}-hasil`}
            expected={expected}
            label="Tulis hasil"
            opsiScaffold={operasi === "plus" ? ["42", "32", "41"] : ["17", "27", "15"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? `${expected} tepat!` : "Belum tepat. Hitung lagi satuan, lalu puluhan.",
                benar,
                terbaca,
                expected,
              });
              if (benar) setTulisOk(true);
            }}
          />
          <div className="space-y-2">
            <TombolMikrofon
              menyimak={mic.menyimak}
              onMulai={mic.mulai}
              onUji={() => cekSuara(operasi === "plus" ? "empat puluh dua" : "tujuh belas")}
              labelUji={operasi === "plus" ? "Ucapkan 42" : "Ucapkan 17"}
            />
            {suaraOk ? <p className="text-sm font-black text-emerald-700">Suara tepat!</p> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AdeganKatak({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [pos, setPos] = useState(24);
  const [jejak, setJejak] = useState<number[]>([]);
  const [tulisOk, setTulisOk] = useState(false);

  const lompat = (langkah: number) => {
    setPos((lama) => {
      const next = Math.max(0, Math.min(50, lama + langkah));
      if (Math.abs(langkah) === 10) {
        kirimEvent("TEN_JUMP_EXECUTED", {
          pesan: `Lompatan besar 10 langkah membawa katak ke angka ${next}! Sekarang lanjutkan dengan lompatan kecil satuan ya.`,
          current: next,
          langkah,
        });
      }
      return next;
    });
    setJejak((lama) => [...lama, langkah]);
  };

  const gambarLompat = (_poly: Titik[], dx: number) => {
    const besar = Math.abs(dx) > 80;
    const arah = dx >= 0 ? 1 : -1;
    lompat(arah * (besar ? 10 : 1));
  };

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-bold text-indigo-800">Misi: 24 + 13. Katak mulai di 24. Lompat +10 sekali, lalu +1 tiga kali.</p>
      <div className="relative min-h-[11rem] flex-1 overflow-x-auto rounded-3xl bg-[linear-gradient(180deg,#e0f2fe_0%,#fef3c7_100%)] p-3">
        <div className="relative mx-auto h-40 w-[48rem] max-w-none">
          <div className="absolute bottom-8 left-0 right-0 h-1.5 rounded bg-indigo-800" />
          {Array.from({ length: 51 }).map((_, n) => (
            <span
              key={n}
              className="absolute bottom-6 w-0.5 bg-indigo-700"
              style={{ left: `${(n / 50) * 100}%`, height: n % 5 === 0 ? "18px" : "10px" }}
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <span
              key={`l${i}`}
              className="absolute bottom-0 -translate-x-1/2 text-[11px] font-black text-indigo-800"
              style={{ left: `${(i * 5) / 50 * 100}%` }}
            >
              {i * 5}
            </span>
          ))}
          <span className="absolute bottom-12 -translate-x-1/2" style={{ left: `${(pos / 50) * 100}%` }}>
            <KatakSvg />
          </span>
          <KanvasCoret onSelesai={gambarLompat} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => lompat(10)} className="inline-flex min-h-12 items-center rounded-2xl bg-sky-500 px-4 text-sm font-black text-white">
          Lompat Besar +10
        </button>
        <button type="button" onClick={() => lompat(-10)} className="inline-flex min-h-12 items-center rounded-2xl bg-sky-700 px-4 text-sm font-black text-white">
          Lompat Besar −10
        </button>
        <button type="button" onClick={() => lompat(1)} className="inline-flex min-h-12 items-center rounded-2xl bg-orange-400 px-4 text-sm font-black text-white">
          Lompat Kecil +1
        </button>
        <button type="button" onClick={() => lompat(-1)} className="inline-flex min-h-12 items-center rounded-2xl bg-orange-600 px-4 text-sm font-black text-white">
          Lompat Kecil −1
        </button>
        <button
          type="button"
          onClick={() => {
            setPos(24);
            setJejak([]);
            setTulisOk(false);
          }}
          className="inline-flex min-h-12 items-center rounded-2xl bg-white px-4 text-sm font-black text-indigo-700 ring-2 ring-indigo-200"
        >
          Ulang 24
        </button>
        <p className="self-center text-sm font-black text-indigo-800">Katak di {pos}</p>
      </div>
      {pos === 37 ? (
        <KanvasTulis
          kunci="katak-37"
          expected="37"
          label="Tulis 24 + 13"
          opsiScaffold={["37", "27", "34"]}
          disabled={tulisOk}
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? "37 tepat! Satu puluhan dan tiga satuan." : "Belum tepat. +10 lalu +1 tiga kali.",
              benar,
              terbaca,
              expected: "37",
              jejak,
            });
            if (benar) setTulisOk(true);
          }}
        />
      ) : null}
    </div>
  );
}

function AdeganPasangan({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [mode, setMode] = useState<"total" | "bagian">("total");
  const [ok, setOk] = useState(false);
  const expected = mode === "total" ? "35" : "20";
  const hilang = mode === "total" ? "total" : "kiri";

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("total");
            setOk(false);
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black ${
            mode === "total" ? "bg-indigo-600 text-white" : "bg-white text-indigo-700 ring-2 ring-indigo-200"
          }`}
        >
          Cari Total (Penjumlahan)
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("bagian");
            setOk(false);
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-4 text-sm font-black ${
            mode === "bagian" ? "bg-indigo-600 text-white" : "bg-white text-indigo-700 ring-2 ring-indigo-200"
          }`}
        >
          Cari Bagian Hilang (Pengurangan)
        </button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <LingkaranAngka nilai={hilang === "total" ? "?" : "35"} sorot={hilang === "total"} label="Total" />
        <svg width="180" height="36" aria-hidden>
          <line x1="90" y1="0" x2="40" y2="36" stroke="#4338ca" strokeWidth="3" />
          <line x1="90" y1="0" x2="140" y2="36" stroke="#4338ca" strokeWidth="3" />
        </svg>
        <div className="flex gap-8">
          <LingkaranAngka nilai={hilang === "kiri" ? "?" : "20"} sorot={hilang === "kiri"} label="Bagian 1" />
          <LingkaranAngka nilai="15" label="Bagian 2" />
        </div>
        <div className="mt-2 flex w-full max-w-md overflow-hidden rounded-2xl ring-2 ring-indigo-300">
          <div className="flex h-12 w-[57%] items-center justify-center bg-rose-300 text-sm font-black text-rose-950">20</div>
          <div className="flex h-12 w-[43%] items-center justify-center bg-teal-300 text-sm font-black text-teal-950">15</div>
        </div>
        <p className="text-sm font-bold text-indigo-800">{mode === "total" ? "20 + 15 = ?" : "35 − 15 = ?"}</p>
      </div>
      <KanvasTulis
        kunci={`pasangan-${mode}`}
        expected={expected}
        label={mode === "total" ? "Tulis total" : "Tulis bagian kiri"}
        opsiScaffold={mode === "total" ? ["35", "25", "30"] : ["20", "15", "35"]}
        disabled={ok}
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar
              ? mode === "total"
                ? "35 tepat! 20 + 15 = 35. Kebalikannya 35 − 15 = 20."
                : "20 tepat! 35 − 15 = 20. Kebalikannya 20 + 15 = 35."
              : "Belum tepat. Lihat batang panjang di bawah.",
            benar,
            terbaca,
            expected,
          });
          if (benar) setOk(true);
        }}
      />
    </div>
  );
}

function LingkaranAngka({ nilai, label, sorot }: { nilai: string; label: string; sorot?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-black text-indigo-800 ring-4 ${
          sorot ? "ring-amber-400" : "ring-indigo-300"
        }`}
      >
        {nilai}
      </div>
      <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-indigo-600">{label}</p>
    </div>
  );
}

function ModeKuis({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const [bundled, setBundled] = useState(false);
  const [unbundled, setUnbundled] = useState(false);
  const [pos, setPos] = useState(35);
  const [lompatBesar, setLompatBesar] = useState(0);
  const [lompatKecil, setLompatKecil] = useState(0);

  const resetLokal = () => {
    setTulisOk(false);
    setSuaraOk(false);
    setBundled(false);
    setUnbundled(false);
    setPos(35);
    setLompatBesar(0);
    setLompatKecil(0);
  };

  const lanjut = () => {
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan kuis selesai. Hebat!" });
      return;
    }
    setNomor((n) => n + 1);
    resetLokal();
  };

  const cekSuara = (teks: string) => {
    const alias = ["tiga puluh sembilan", "39"];
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Mikrofon belum bisa. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, alias);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar! Tiga puluh sembilan." : `Kamu bilang: "${teks}".`, benar: ok, transkrip: teks });
    if (ok) setSuaraOk(true);
  };
  const mic = useMic(cekSuara);

  const selesaiSoal =
    nomor === 0 ? tulisOk && suaraOk : nomor === 1 ? tulisOk && lompatBesar >= 1 && lompatKecil >= 2 && pos === 23 : tulisOk && unbundled;

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-indigo-800">Tantangan {nomor + 1} dari 3</p>
      {nomor === 0 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Gabungkan 23 + 16. Tulis 39 dan ucapkan tiga puluh sembilan.</p>
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 2 }).map((_, i) => (
                <BatangPuluhan key={`a${i}`} warna="#fb7185" />
              ))}
              {Array.from({ length: 3 }).map((_, i) => (
                <KubusSatuan key={`as${i}`} warna="#fb7185" />
              ))}
            </div>
            <span className="self-center text-2xl font-black text-indigo-700">+</span>
            <div className="flex gap-1">
              <BatangPuluhan warna="#2dd4bf" />
              {Array.from({ length: 6 }).map((_, i) => (
                <KubusSatuan key={`bs${i}`} warna="#2dd4bf" />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setBundled(true)}
            className="inline-flex min-h-12 self-start rounded-2xl bg-orange-500 px-4 text-sm font-black text-white"
          >
            Gabungkan balok
          </button>
          {bundled ? <p className="text-lg font-black text-emerald-700">3 puluhan + 9 satuan</p> : null}
          <div className="flex flex-wrap items-end gap-4">
            <KanvasTulis
              kunci="k1"
              expected="39"
              label="Tulis 39"
              opsiScaffold={["39", "29", "36"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "39 tepat!" : "3 puluhan dan 9 satuan.", benar, terbaca, soal: 1 });
                if (benar) setTulisOk(true);
              }}
            />
            <TombolMikrofon
              menyimak={mic.menyimak}
              onMulai={mic.mulai}
              onUji={() => cekSuara("tiga puluh sembilan")}
              labelUji="Ucapkan 39"
            />
          </div>
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <p className="text-sm font-bold text-slate-700">35 − 12. Lompat −10 sekali, lalu −1 dua kali. Tulis 23.</p>
          <p className="text-lg font-black text-indigo-800">Katak di {pos}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setPos((p) => {
                  const next = Math.max(0, p - 10);
                  kirimEvent("TEN_JUMP_EXECUTED", {
                    pesan: `Lompatan besar 10 langkah membawa katak ke angka ${next}! Sekarang lanjutkan dengan lompatan kecil satuan ya.`,
                    current: next,
                  });
                  return next;
                });
                setLompatBesar((n) => n + 1);
              }}
              className="inline-flex min-h-12 items-center rounded-2xl bg-sky-600 px-4 text-sm font-black text-white"
            >
              Lompat Besar −10
            </button>
            <button
              type="button"
              onClick={() => {
                setPos((p) => Math.max(0, p - 1));
                setLompatKecil((n) => n + 1);
              }}
              className="inline-flex min-h-12 items-center rounded-2xl bg-orange-500 px-4 text-sm font-black text-white"
            >
              Lompat Kecil −1
            </button>
          </div>
          {pos === 23 ? (
            <KanvasTulis
              kunci="k2"
              expected="23"
              label="Tulis 23"
              opsiScaffold={["23", "25", "13"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "23 tepat!" : "35 − 10 − 1 − 1 = 23.", benar, terbaca, soal: 2 });
                if (benar) setTulisOk(true);
              }}
            />
          ) : null}
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-sm font-bold text-slate-700">34 − 8. Satuan 4 kurang dari 8. Bongkar 1 puluhan, coret 8 satuan, tulis 26.</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: unbundled ? 2 : 3 }).map((_, i) => (
              <BatangPuluhan key={`q3p${i}`} warna="#fb7185" kedip={!unbundled && i === 0} onClick={() => setUnbundled(true)} />
            ))}
            {Array.from({ length: unbundled ? 14 : 4 }).map((_, i) => (
              <KubusSatuan key={`q3s${i}`} warna="#fbbf24" dicoret={unbundled && i < 8} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setUnbundled(true);
              kirimEvent("UNBUNDLE_REQUIRED", {
                pesan: "Kubus satuannya cuma 4, belum cukup diambil 8. Yuk bongkar 1 Batang Puluhan di kiri menjadi 10 satuan!",
                ones: 4,
                subOnes: 8,
              });
            }}
            disabled={unbundled}
            className={`inline-flex min-h-12 self-start rounded-2xl px-4 text-sm font-black text-white disabled:opacity-40 ${
              unbundled ? "bg-orange-400" : "igil-kedip bg-orange-500"
            }`}
          >
            Bongkar 1 Puluhan Jadi 10 Satuan
          </button>
          {unbundled ? (
            <KanvasTulis
              kunci="k3"
              expected="26"
              label="Tulis 26"
              opsiScaffold={["26", "24", "16"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("QUIZ_ANSWERED", { pesan: benar ? "26 tepat! 14 − 8 = 6, puluhan sisa 2." : "Setelah bongkar, 14 − 8 = 6.", benar, terbaca, soal: 3 });
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
  const [coretPuluhan, setCoretPuluhan] = useState(0);
  const [coretSatuan, setCoretSatuan] = useState(0);

  const resetLokal = () => {
    setTulisOk(false);
    setSuaraOk(false);
    setCoretPuluhan(0);
    setCoretSatuan(0);
  };

  const lanjut = () => {
    if (nomor >= 4) {
      onLulus("Evaluasi panen jambu selesai. Lima soal sudah dijawab.");
      return;
    }
    setNomor((n) => n + 1);
    resetLokal();
  };

  const cekSuara = (teks: string, alias: string[], benarPesan: string) => {
    if (!teks) {
      kirimEvent("VOICE_ANSWERED", { pesan: "Mikrofon belum bisa. Pakai tombol uji.", benar: false });
      return;
    }
    const ok = cocokSuara(teks, alias);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? benarPesan : `Kamu bilang: "${teks}".`, benar: ok, transkrip: teks, soal: nomor + 1 });
    if (ok) setSuaraOk(true);
  };
  const mic = useMic((teks) => {
    if (nomor === 1) cekSuara(teks, ["dua puluh lima", "25"], "Benar! Dua puluh lima.");
    if (nomor === 4) cekSuara(teks, ["empat puluh tiga", "43"], "Benar! Empat puluh tiga.");
  });

  const selesaiSoal =
    nomor === 0
      ? tulisOk
      : nomor === 1
        ? suaraOk && coretPuluhan >= 2 && coretSatuan >= 3
        : nomor === 2
          ? tulisOk
          : nomor === 3
            ? tulisOk
            : tulisOk && suaraOk;

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-indigo-800">Soal {nomor + 1} dari 5</p>

      {nomor === 0 ? (
        <>
          <p className="text-sm font-bold text-slate-700">3 puluhan + 2 satuan, ditambah 1 puluhan + 5 satuan. 32 + 15. Tulis hasilnya.</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <BatangPuluhan key={`e1a${i}`} warna="#fb7185" />
            ))}
            {Array.from({ length: 2 }).map((_, i) => (
              <KubusSatuan key={`e1as${i}`} warna="#fb7185" />
            ))}
            <span className="self-center text-2xl font-black">+</span>
            <BatangPuluhan warna="#2dd4bf" />
            {Array.from({ length: 5 }).map((_, i) => (
              <KubusSatuan key={`e1bs${i}`} warna="#2dd4bf" />
            ))}
          </div>
          <KanvasTulis
            kunci="e1"
            expected="47"
            label="Tulis 32 + 15"
            opsiScaffold={["47", "37", "46"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("EVAL_ANSWERED", { pesan: benar ? "47 tepat!" : "2 + 5 = 7 satuan. 3 + 1 = 4 puluhan.", benar, terbaca, soal: 1 });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <p className="text-sm font-bold text-slate-700">48 jeruk, diambil 23. Coret 2 puluhan dan 3 satuan, lalu ucapkan dua puluh lima.</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <BatangPuluhan
                key={`e2p${i}`}
                warna="#f97316"
                dicoret={i < coretPuluhan}
                onClick={() => setCoretPuluhan((n) => Math.min(4, n + 1))}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <KubusSatuan
                key={`e2s${i}`}
                warna="#fb923c"
                dicoret={i < coretSatuan}
                onClick={() => setCoretSatuan((n) => Math.min(8, n + 1))}
              />
            ))}
          </div>
          <p className="text-sm font-bold text-slate-700">
            Dicoret: {coretPuluhan} puluhan + {coretSatuan} satuan
          </p>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("dua puluh lima", ["dua puluh lima", "25"], "Benar! Dua puluh lima.")}
            labelUji="Ucapkan 25"
          />
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Katak di 21, lompat +10 ke 31, lalu +4 ke 35. 21 + ? = 35.</p>
          <div className="flex items-end gap-2 text-2xl font-black text-indigo-800">
            <span>21</span>
            <span className="text-sky-600">+10</span>
            <span>31</span>
            <span className="text-orange-500">+4</span>
            <span>35</span>
          </div>
          <KanvasTulis
            kunci="e3"
            expected="14"
            label="Tulis angka hilang"
            opsiScaffold={["14", "10", "4"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("EVAL_ANSWERED", { pesan: benar ? "14 tepat! 10 + 4 = 14." : "Jumlahkan lompatan 10 dan 4.", benar, terbaca, soal: 3 });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 3 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Total 40. Bagian kiri 10. Bagian kanan berapa?</p>
          <div className="flex flex-col items-center gap-2">
            <LingkaranAngka nilai="40" label="Total" />
            <div className="flex gap-8">
              <LingkaranAngka nilai="10" label="Bagian 1" />
              <LingkaranAngka nilai="?" sorot label="Bagian 2" />
            </div>
          </div>
          <KanvasTulis
            kunci="e4"
            expected="30"
            label="Tulis bagian kanan"
            opsiScaffold={["30", "40", "20"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("EVAL_ANSWERED", { pesan: benar ? "30 tepat! 40 − 10 = 30." : "Total kurang bagian kiri.", benar, terbaca, soal: 4 });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 4 ? (
        <>
          <p className="text-sm font-bold text-slate-700">Igil punya 25 balon merah dan 18 balon biru. Tulis 43 dan ucapkan empat puluh tiga.</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <BatangPuluhan key={`e5a${i}`} warna="#fb7185" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <KubusSatuan key={`e5as${i}`} warna="#fb7185" />
            ))}
            <span className="self-center text-2xl font-black">+</span>
            <BatangPuluhan warna="#38bdf8" />
            {Array.from({ length: 8 }).map((_, i) => (
              <KubusSatuan key={`e5bs${i}`} warna="#38bdf8" />
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <KanvasTulis
              kunci="e5"
              expected="43"
              label="Tulis 25 + 18"
              opsiScaffold={["43", "33", "42"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("EVAL_ANSWERED", { pesan: benar ? "43 tepat!" : "5 + 8 = 13, ikat 10, sisa 3. Puluhan 2+1+1=4.", benar, terbaca, soal: 5 });
                if (benar) setTulisOk(true);
              }}
            />
            <TombolMikrofon
              menyimak={mic.menyimak}
              onMulai={mic.mulai}
              onUji={() => cekSuara("empat puluh tiga", ["empat puluh tiga", "43"], "Benar! Empat puluh tiga.")}
              labelUji="Ucapkan 43"
            />
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
