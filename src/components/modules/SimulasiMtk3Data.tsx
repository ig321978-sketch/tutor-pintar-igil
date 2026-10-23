"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as AcaraPointer } from "react";
import type { KelaminGuru } from "@/lib/guru";

export type TutorEventType =
  | "SCENE_START"
  | "SORT_ORDER_HINT"
  | "DATA_SORTED_SUCCESS"
  | "TABLE_AUDIT_MISMATCH"
  | "TABLE_AUDIT_MATCHED"
  | "CONDITIONAL_FILTER_APPLIED"
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

type TabLab = "sortir" | "tabel" | "filter" | "kuis" | "evaluasi";
type Titik = { x: number; y: number };
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
type KartuAngka = { id: number; nilai: number };
type PresetId = "bibit" | "sepatu";

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "sortir", label: "Sortir" },
  { id: "tabel", label: "Tabel" },
  { id: "filter", label: "Filter" },
  { id: "kuis", label: "Kuis" },
  { id: "evaluasi", label: "Evaluasi" },
];

const PRESET: Record<PresetId, { judul: string; satuan: string; angka: number[] }> = {
  bibit: { judul: "Tinggi bibit (cm)", satuan: "cm", angka: [35, 28, 40, 28, 32, 38, 28, 35] },
  sepatu: { judul: "Nomor sepatu", satuan: "", angka: [31, 33, 30, 32, 34, 31, 32, 31] },
};

const MENTAH_AWAL = [70, 80, 90, 70, 100, 80, 90, 80, 70, 100, 90, 80, 100, 90, 80];

const BARIS_NILAI = [
  { nilai: 70, banyak: 5 },
  { nilai: 80, banyak: 9 },
  { nilai: 90, banyak: 6 },
  { nilai: 100, banyak: 4 },
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

const SATU_KATA: Record<string, number> = {
  nol: 0,
  satu: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  lima: 5,
  enam: 6,
  tujuh: 7,
  delapan: 8,
  sembilan: 9,
};

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function kartuDari(angka: number[]): KartuAngka[] {
  return angka.map((nilai, id) => ({ id, nilai }));
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenAngka(teks: string): number[] {
  let kalimat = normalisasiSuara(teks);
  kalimat = kalimat
    .replace(/\bsebelas\b/g, " 11 ")
    .replace(/\bdua belas\b/g, " 12 ")
    .replace(/\btiga belas\b/g, " 13 ")
    .replace(/\bempat belas\b/g, " 14 ")
    .replace(/\blima belas\b/g, " 15 ")
    .replace(/\bdelapan belas\b/g, " 18 ")
    .replace(/\bsepuluh\b/g, " 10 ");
  kalimat = kalimat.replace(/\b(dua|tiga|empat) puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)\b/g, (_, puluh: string, satuan: string) => {
    const dasar = puluh === "dua" ? 20 : puluh === "tiga" ? 30 : 40;
    return ` ${dasar + SATU_KATA[satuan]} `;
  });
  kalimat = kalimat.replace(/\b(dua|tiga|empat) puluh\b/g, (_, puluh: string) => ` ${puluh === "dua" ? 20 : puluh === "tiga" ? 30 : 40} `);
  for (const [kata, angka] of Object.entries(SATU_KATA)) {
    kalimat = kalimat.replace(new RegExp(`\\b${kata}\\b`, "g"), ` ${angka} `);
  }
  return (kalimat.match(/\d+/g) ?? []).map((angka) => Number(angka));
}

function cocokSatu(teks: string, jumlah: number): boolean {
  const token = tokenAngka(teks);
  return token.length === 1 && token[0] === jumlah;
}

function ringkasan(angka: number[]) {
  const urut = [...angka].sort((a, b) => a - b);
  const hitung = new Map<number, number>();
  for (const nilai of urut) hitung.set(nilai, (hitung.get(nilai) ?? 0) + 1);
  let sering = urut[0];
  let kali = 0;
  for (const [nilai, banyak] of hitung) {
    if (banyak > kali) {
      sering = nilai;
      kali = banyak;
    }
  }
  const terkecil = urut[0];
  const terbesar = urut[urut.length - 1];
  return { urut, terkecil, terbesar, selisih: terbesar - terkecil, sering, kali };
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
  return { data: img.data, width, minX, minY, maxX, maxY };
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
  const lebar = Math.max(8, maxX - minX);
  const angka: string[] = [];
  for (let s = 0; s < jumlah; s++) {
    const ax = minX + (lebar * s) / jumlah;
    const bx = minX + (lebar * (s + 1)) / jumlah;
    const huruf = kenaliSatuAngka(data, width, ax, minY, bx, maxY);
    if (!huruf) return "";
    angka.push(huruf);
  }
  return angka.join("");
}

function adaTinta(kanvas: HTMLCanvasElement): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const img = ctx.getImageData(0, 0, kanvas.width, kanvas.height);
  let tinta = 0;
  for (let i = 0; i < img.data.length; i += 16) {
    if (tintaPixel(img.data, i)) tinta += 1;
  }
  return tinta > 8;
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
        className={`inline-flex min-h-12 min-w-12 items-center rounded-2xl px-3 text-sm font-black text-white ${menyimak ? "bg-rose-500" : "bg-emerald-600"}`}
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

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (!kanvas) return;
    siapkanKanvas(kanvas, 64);
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
    const terbaca = kenaliAngkaKanvas(kanvas, expected.length);
    const benar = terbaca === expected;
    setPesan(benar ? "Tepat!" : terbaca ? `Terbaca ${terbaca}. Coba lagi.` : "Tulis lebih besar, ya.");
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
            if (!kanvas) return;
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
        <button type="button" disabled={disabled} onClick={periksa} className="inline-flex min-h-12 items-center rounded-xl bg-[#1C01A5] px-3 text-xs font-black text-white">
          Cek coretan
        </button>
      </div>
      {pesan ? <p className="text-xs font-bold text-indigo-800">{pesan}</p> : null}
      {bantu && !disabled ? (
        <button type="button" onClick={() => onHasil(true, expected)} className="mt-1 inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-3 text-xs font-black text-amber-950">
          Bantuan: pakai {expected}
        </button>
      ) : null}
    </div>
  );
}

function KanvasLingkar({ kunci, onLingkar }: { kunci: string; onLingkar: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<Titik | null>(null);

  const siapkan = useCallback(() => {
    const kanvas = canvasRef.current;
    if (kanvas) siapkanKanvas(kanvas, 56);
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: AcaraPointer<HTMLCanvasElement>) => {
    const kotak = canvasRef.current?.getBoundingClientRect();
    if (!kotak) return { x: 0, y: 0 };
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  return (
    <div>
      <p className="text-[11px] font-black uppercase text-[#1C01A5]">Lingkari baris yang menyala</p>
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-amber-300 bg-[#FFFDF6]">
        <canvas
          ref={canvasRef}
          aria-label="Lingkari baris tabel"
          className="block w-full cursor-crosshair touch-none"
          style={{ touchAction: "none" }}
          onPointerDown={(event) => {
            event.preventDefault();
            canvasRef.current?.setPointerCapture(event.pointerId);
            gambar.current = true;
            terakhir.current = titikDari(event);
          }}
          onPointerMove={(event) => {
            if (!gambar.current) return;
            const ctx = canvasRef.current?.getContext("2d");
            const sekarang = titikDari(event);
            if (!ctx || !terakhir.current) return;
            ctx.beginPath();
            ctx.moveTo(terakhir.current.x, terakhir.current.y);
            ctx.lineTo(sekarang.x, sekarang.y);
            ctx.stroke();
            terakhir.current = sekarang;
          }}
          onPointerUp={() => {
            gambar.current = false;
            if (canvasRef.current && adaTinta(canvasRef.current)) onLingkar();
          }}
        />
      </div>
    </div>
  );
}

function Turus({ jumlah }: { jumlah: number }) {
  const grup: number[] = [];
  for (let sisa = jumlah; sisa > 0; sisa -= 5) grup.push(Math.min(5, sisa));
  if (grup.length === 0) return <span className="text-xs font-bold text-slate-400">belum ada</span>;
  return (
    <div className="flex flex-wrap items-end gap-2">
      {grup.map((banyak, indeks) => (
        <svg key={`${indeks}-${banyak}`} width="40" height="44" viewBox="0 0 40 44" aria-hidden>
          {Array.from({ length: Math.min(4, banyak) }, (_, garis) => (
            <line key={garis} x1={6 + garis * 8} y1={4} x2={6 + garis * 8} y2={40} stroke="#1C01A5" strokeWidth="3" strokeLinecap="round" />
          ))}
          {banyak === 5 ? <line x1={4} y1={36} x2={34} y2={6} stroke="#E11D48" strokeWidth="3" strokeLinecap="round" /> : null}
        </svg>
      ))}
    </div>
  );
}

function IlmuwanIgil({ pesan, bicara, onUlang }: { pesan: string; bicara: boolean; onUlang: () => void }) {
  return (
    <div className="flex items-end gap-2 border-t border-emerald-200 bg-emerald-50 px-2 py-2">
      <svg width="78" height="88" viewBox="0 0 88 100" aria-hidden className={bicara ? "igil-angguk" : ""}>
        <circle cx="36" cy="36" r="16" fill="#f6d7b0" />
        <circle cx="30" cy="36" r="6" fill="none" stroke="#16a34a" strokeWidth="2.4" />
        <circle cx="43" cy="36" r="6" fill="none" stroke="#16a34a" strokeWidth="2.4" />
        <path d="M36 36 H37" stroke="#16a34a" strokeWidth="2" />
        <circle cx="30" cy="36" r="1.4" fill="#1C01A5" />
        <circle cx="43" cy="36" r="1.4" fill="#1C01A5" />
        <path d="M31 44 Q36 48 41 44" fill="none" stroke="#1C01A5" strokeWidth="1.6" />
        <path d="M16 58 L36 48 L56 58 L62 96 L10 96 Z" fill="#ffffff" stroke="#1C01A5" strokeWidth="2" />
        <path d="M36 52 V94" stroke="#1C01A5" strokeWidth="2" />
        <circle cx="36" cy="70" r="2" fill="#16a34a" />
        <circle cx="36" cy="80" r="2" fill="#16a34a" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase text-emerald-800">Ilmuwan IGIL</p>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{pesan}</p>
      </div>
      <button
        type="button"
        onClick={onUlang}
        aria-label="Putar suara Ilmuwan IGIL"
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#1C01A5] text-lg font-black text-white"
      >
        ▶
      </button>
    </div>
  );
}

function ModeSortir({ kirimEvent, bicara }: { kirimEvent: Kirim; bicara: (teks: string) => void }) {
  const [preset, setPreset] = useState<PresetId>("bibit");
  const paket = PRESET[preset];
  const fakta = ringkasan(paket.angka);
  const [sisa, setSisa] = useState<KartuAngka[]>(() => kartuDari(paket.angka));
  const [urut, setUrut] = useState<KartuAngka[]>([]);
  const [tumpuk, setTumpuk] = useState(false);
  const [sedang, setSedang] = useState(false);
  const [kunciTulis, setKunciTulis] = useState(0);
  const sudahRapi = useRef(false);
  const timer = useRef<number[]>([]);
  const lengkap = urut.length === paket.angka.length && sisa.length === 0;

  const bersihkan = () => {
    timer.current.forEach((id) => window.clearTimeout(id));
    timer.current = [];
  };

  useEffect(() => () => bersihkan(), []);

  const muat = (id: PresetId) => {
    bersihkan();
    sudahRapi.current = false;
    setPreset(id);
    setSedang(false);
    setSisa(kartuDari(PRESET[id].angka));
    setUrut([]);
    setKunciTulis((n) => n + 1);
  };

  const umumkanRapi = (barisan: KartuAngka[]) => {
    if (sudahRapi.current) return;
    sudahRapi.current = true;
    const min = barisan[0]?.nilai;
    const max = barisan[barisan.length - 1]?.nilai;
    kirimEvent("DATA_SORTED_SUCCESS", {
      pesan: `Rapi sekali! Sekarang langsung terlihat: ujung paling kiri adalah Data Terkecil (${min}), dan ujung paling kanan adalah Data Terbesar (${max}).`,
      min,
      max,
    });
  };

  const pilih = (kartu: KartuAngka) => {
    if (sedang || sisa.length === 0) return;
    const terkecil = Math.min(...sisa.map((item) => item.nilai));
    if (kartu.nilai !== terkecil) {
      kirimEvent("SORT_ORDER_HINT", {
        pesan: `Eits, coba lihat lagi di papan atas! Masih ada angka ${terkecil} yang lebih kecil dari ${kartu.nilai}. Kita urutkan dari yang paling kecil dulu ya!`,
        smallestRemaining: terkecil,
        pickedNumber: kartu.nilai,
      });
      return;
    }
    const baruUrut = [...urut, kartu];
    const baruSisa = sisa.filter((item) => item.id !== kartu.id);
    setUrut(baruUrut);
    setSisa(baruSisa);
    if (baruSisa.length === 0) umumkanRapi(baruUrut);
  };

  const urutOtomatis = () => {
    bersihkan();
    const semua = [...sisa, ...urut].sort((a, b) => a.nilai - b.nilai || a.id - b.id);
    sudahRapi.current = false;
    setSedang(true);
    setSisa(semua);
    setUrut([]);
    semua.forEach((kartu, indeks) => {
      const id = window.setTimeout(() => {
        setSisa((lama) => lama.filter((item) => item.id !== kartu.id));
        setUrut((lama) => (lama.some((item) => item.id === kartu.id) ? lama : [...lama, kartu]));
        if (indeks === semua.length - 1) {
          setSedang(false);
          umumkanRapi(semua);
        }
      }, 220 * (indeks + 1));
      timer.current.push(id);
    });
  };

  const menara = () => {
    const kolom: KartuAngka[][] = [];
    for (const kartu of urut) {
      const akhir = kolom[kolom.length - 1];
      if (tumpuk && akhir && akhir[0].nilai === kartu.nilai) akhir.push(kartu);
      else kolom.push([kartu]);
    }
    return kolom;
  };

  const mic = useMic((teks) => {
    const token = tokenAngka(teks);
    const kena = token.includes(fakta.terkecil) || token.includes(fakta.terbesar) || token.includes(fakta.selisih);
    const lengkapSuara = token.includes(fakta.terkecil) && token.includes(fakta.terbesar) && token.includes(fakta.selisih);
    kirimEvent("VOICE_ANSWERED", {
      pesan: lengkapSuara ? "Tiga angka itu tepat!" : kena ? "Bagus, satu angkanya tepat. Sebutkan juga yang lain." : "Sebutkan yang terkecil, terbesar, atau selisihnya.",
      benar: lengkapSuara || kena,
      transkrip: teks,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-black text-[#1C01A5]">Mesin Sortir & Coret Data</h3>
        {(["bibit", "sepatu"] as PresetId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => muat(id)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${preset === id ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"}`}
          >
            {PRESET[id].judul}
          </button>
        ))}
      </div>
      <p className="text-xs font-black uppercase text-slate-500">Papan data acak</p>
      <div className="flex flex-wrap gap-2">
        {kartuDari(paket.angka).map((kartu) => {
          const sudah = urut.some((item) => item.id === kartu.id);
          return (
            <button
              key={kartu.id}
              type="button"
              disabled={sudah || sedang}
              onClick={() => pilih(kartu)}
              className={`relative inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-3 text-lg font-black ${sudah ? "bg-slate-100 text-slate-400 line-through" : "bg-amber-200 text-[#1C01A5]"}`}
            >
              {kartu.nilai}
              {sudah ? <span className="absolute inset-x-2 top-1/2 h-1 -translate-y-1/2 rounded bg-rose-500" /> : null}
            </button>
          );
        })}
      </div>
      <p className="text-xs font-black uppercase text-slate-500">Jalur urutan, kecil ke besar</p>
      <div className="flex min-h-16 flex-wrap items-end gap-2 rounded-2xl bg-sky-50 px-2 py-2">
        {urut.length === 0 ? <p className="text-sm font-bold text-sky-800">Ketuk angka paling kecil.</p> : null}
        {menara().map((grup) => (
          <div key={grup[0].id} className="flex flex-col-reverse">
            {grup.map((kartu, indeks) => (
              <span
                key={kartu.id}
                className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-emerald-500 px-2 text-lg font-black text-white"
                style={{ marginTop: indeks === 0 ? 0 : -28 }}
              >
                {kartu.nilai}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Data terkecil", lengkap ? String(fakta.terkecil) : "…"],
          ["Data terbesar", lengkap ? String(fakta.terbesar) : "…"],
          ["Selisih", lengkap ? String(fakta.selisih) : "…"],
          ["Paling sering", lengkap ? `${fakta.sering} (${fakta.kali} kali)` : "…"],
        ].map(([judul, isi]) => (
          <div key={judul} className="rounded-2xl bg-white px-2 py-2 text-center ring-2 ring-indigo-100">
            <p className="text-[10px] font-black uppercase text-slate-500">{judul}</p>
            <p className="text-lg font-black text-[#1C01A5]">{isi}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={urutOtomatis} className="inline-flex min-h-12 items-center rounded-2xl bg-sky-600 px-3 text-sm font-black text-white">
          Urutkan Otomatis dengan Animasi!
        </button>
        <button
          type="button"
          onClick={() => {
            setTumpuk((lama) => !lama);
            bicara(tumpuk ? "Angka kembar kembali berjajar." : "Angka yang sama sekarang bertumpuk. Menara paling tinggi itu yang paling sering.");
          }}
          className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${tumpuk ? "bg-amber-400 text-amber-950" : "bg-white text-[#1C01A5] ring-2 ring-amber-300"}`}
        >
          Tumpuk angka kembar
        </button>
        <button type="button" onClick={() => muat(preset)} className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-sm font-black text-[#1C01A5] ring-2 ring-slate-200">
          Acak lagi
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <KanvasJawab
          kunci={`${preset}-min-${kunciTulis}`}
          expected={String(fakta.terkecil)}
          label="Tulis terkecil"
          onHasil={(benar, terbaca) =>
            kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? `Terkecil ${fakta.terkecil}.` : "Lihat ujung kiri jalur.", benar, terbaca, expected: String(fakta.terkecil) })
          }
        />
        <KanvasJawab
          kunci={`${preset}-max-${kunciTulis}`}
          expected={String(fakta.terbesar)}
          label="Tulis terbesar"
          onHasil={(benar, terbaca) =>
            kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? `Terbesar ${fakta.terbesar}.` : "Lihat ujung kanan jalur.", benar, terbaca, expected: String(fakta.terbesar) })
          }
        />
        <KanvasJawab
          kunci={`${preset}-selisih-${kunciTulis}`}
          expected={String(fakta.selisih)}
          label="Tulis selisih"
          onHasil={(benar, terbaca) =>
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `Selisih ${fakta.selisih}.` : `${fakta.terbesar} dikurangi ${fakta.terkecil}.`,
              benar,
              terbaca,
              expected: String(fakta.selisih),
            })
          }
        />
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={`${fakta.terkecil}, ${fakta.terbesar}, selisih ${fakta.selisih}`}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: "Tiga angka itu tepat!",
            benar: true,
            transkrip: `${fakta.terkecil} ${fakta.terbesar} ${fakta.selisih}`,
          })
        }
      />
    </div>
  );
}

function ModeTabel({ kirimEvent, bicara }: { kirimEvent: Kirim; bicara: (teks: string) => void }) {
  const mentah = MENTAH_AWAL;
  const [pilih, setPilih] = useState<number | null>(null);
  const [masuk, setMasuk] = useState<number[]>([]);
  const cocokRef = useRef(false);
  const turus: Record<number, number> = { 70: 0, 80: 0, 90: 0, 100: 0 };
  for (const indeks of masuk) turus[mentah[indeks]] += 1;
  const jumlah = masuk.length;
  const pas = jumlah === mentah.length;

  const laporkan = (sum: number) => {
    if (sum === mentah.length) {
      if (cocokRef.current) return;
      cocokRef.current = true;
      kirimEvent("TABLE_AUDIT_MATCHED", {
        pesan: `Sempurna! Jumlah di tabel sudah pas ${mentah.length}, sama persis dengan jumlah data aslinya.`,
        rawTotal: mentah.length,
        tableSum: sum,
      });
      return;
    }
    kirimEvent("TABLE_AUDIT_MISMATCH", {
      pesan: `Perhatikan Neraca Audit! Di kotak kiri ada ${mentah.length} data, tapi jumlah di tabelmu baru ${sum}. Yuk cek data mana yang belum dicoret!`,
      rawTotal: mentah.length,
      tableSum: sum,
    });
  };

  const ketukKartu = (indeks: number) => {
    if (masuk.includes(indeks)) return;
    setPilih(indeks);
  };

  const ketukBaris = (nilai: number) => {
    if (pilih === null) {
      bicara("Coret satu kartu di kiri dulu, lalu ketuk barisnya.");
      return;
    }
    if (mentah[pilih] !== nilai) {
      bicara(`Kartu itu nilainya ${mentah[pilih]}. Ketuk baris ${mentah[pilih]}.`);
      return;
    }
    if (masuk.includes(pilih)) return;
    const total = masuk.length + 1;
    setMasuk([...masuk, pilih]);
    setPilih(null);
    if (total === mentah.length) laporkan(total);
  };

  const ulang = () => {
    cocokRef.current = false;
    setPilih(null);
    setMasuk([]);
  };

  const mic = useMic((teks) => {
    const ok = cocokSatu(teks, 15);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Totalnya lima belas." : "Ucapkan jumlah seluruh data.",
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="grid gap-2 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <h3 className="text-sm font-black text-[#1C01A5]">Kotak data mentah</h3>
        <p className="text-xs font-bold text-slate-600">Ketuk satu nilai, lalu ketuk baris tabel yang sama.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {mentah.map((nilai, indeks) => {
            const selesai = masuk.includes(indeks);
            const aktif = pilih === indeks;
            return (
              <button
                key={`${nilai}-${indeks}`}
                type="button"
                onClick={() => ketukKartu(indeks)}
                className={`relative inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-2 text-base font-black ${
                  selesai ? "bg-slate-200 text-slate-500" : aktif ? "bg-amber-300 text-[#1C01A5] ring-4 ring-amber-500" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
                }`}
              >
                {nilai}
                {selesai ? <span className="absolute left-1 right-1 top-1/2 h-1 -rotate-12 rounded bg-rose-500" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-black text-[#1C01A5]">Tabel frekuensi</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse text-sm font-bold text-[#1C01A5]">
            <thead>
              <tr className="bg-indigo-50">
                <th className="border border-indigo-200 px-2 py-1">Nilai</th>
                <th className="border border-indigo-200 px-2 py-1">Turus</th>
                <th className="border border-indigo-200 px-2 py-1">Banyaknya</th>
              </tr>
            </thead>
            <tbody>
              {[70, 80, 90, 100].map((nilai) => (
                <tr key={nilai}>
                  <td className="border border-indigo-100 px-2 py-1 text-center">{nilai}</td>
                  <td className="border border-indigo-100 px-2 py-1">
                    <Turus jumlah={turus[nilai]} />
                  </td>
                  <td className="border border-indigo-100 px-2 py-1 text-center">
                    <button type="button" onClick={() => ketukBaris(nilai)} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-emerald-600 px-3 text-lg font-black text-white">
                      {turus[nilai]}
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-amber-50">
                <td className="border border-indigo-100 px-2 py-2 font-black" colSpan={2}>
                  Jumlah total data
                </td>
                <td className="border border-indigo-100 px-2 py-2 text-center text-lg font-black">{jumlah}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`mt-2 rounded-2xl px-3 py-2 text-sm font-black ${pas ? "bg-emerald-200 text-emerald-950" : jumlah === 0 ? "bg-amber-100 text-amber-950" : "bg-amber-300 text-amber-950"}`}>
          Neraca audit: data mentah {mentah.length} {pas ? "=" : "≠"} tabel {jumlah}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={() => laporkan(jumlah)} className="inline-flex min-h-12 items-center rounded-2xl bg-[#1C01A5] px-3 text-sm font-black text-white">
            Cek neraca
          </button>
          <button type="button" onClick={ulang} className="inline-flex min-h-12 items-center rounded-2xl bg-white px-3 text-sm font-black text-[#1C01A5] ring-2 ring-slate-200">
            Ulangi tabel
          </button>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <KanvasJawab
            kunci="frekuensi-80"
            expected="5"
            label="Banyak nilai 80"
            onHasil={(benar, terbaca) => kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Nilai 80 ada 5." : "Hitung turus baris 80.", benar, terbaca, expected: "5" })}
          />
          <KanvasJawab
            kunci="total-15"
            expected="15"
            label="Jumlah total"
            onHasil={(benar, terbaca) => kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Total 15." : "Jumlahkan kolom banyaknya.", benar, terbaca, expected: "15" })}
          />
        </div>
        <div className="mt-2">
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            labelUji="lima belas"
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Totalnya lima belas.", benar: true, transkrip: "lima belas" })}
          />
        </div>
      </div>
    </div>
  );
}

function ModeFilter({ kirimEvent, bicara }: { kirimEvent: Kirim; bicara: (teks: string) => void }) {
  const [mode, setMode] = useState<"selisih" | "atas" | "kurang" | null>(null);
  const aktif = mode === "selisih" ? [100, 70] : mode === "atas" ? [90, 100] : mode === "kurang" ? [70] : [];
  const rumus = mode === "selisih" ? "100 − 70 = 30" : mode === "atas" ? "6 + 4 = 10" : mode === "kurang" ? "baris 70 = 5" : "Pilih lampu sorot";
  const jawab = mode === "selisih" ? 30 : mode === "atas" ? 10 : mode === "kurang" ? 5 : 0;

  const pilih = (id: "selisih" | "atas" | "kurang") => {
    setMode(id);
    if (id === "atas") {
      kirimEvent("CONDITIONAL_FILTER_APPLIED", {
        pesan: "Hati-hati! 'Nilai di atas 80' berarti nilai 80 TIDAK ikut dihitung, yang kita gabungkan adalah baris nilai 90 dan 100!",
        filter: "di atas 80",
      });
      return;
    }
    if (id === "selisih") {
      bicara("Nilai paling tinggi 100. Paling rendah 70. Selisihnya 30.");
      return;
    }
    bicara("Yang kurang dari 80 hanya baris 70. Ada 5 siswa.");
  };

  const mic = useMic((teks) => {
    if (!mode) return;
    const ok = cocokSatu(teks, jawab);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Hasilnya ${jawab}.` : "Lihat papan kalkulator, lalu ucapkan hasilnya.",
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="grid gap-2 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h3 className="text-sm font-black text-[#1C01A5]">Lampu sorot kriteria</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" onClick={() => pilih("selisih")} className="inline-flex min-h-12 items-center rounded-2xl bg-sky-600 px-3 text-left text-xs font-black text-white">
            Sorot nilai tertinggi dan terendah
          </button>
          <button type="button" onClick={() => pilih("atas")} className="inline-flex min-h-12 items-center rounded-2xl bg-amber-500 px-3 text-left text-xs font-black text-amber-950">
            Sorot nilai di atas 80
          </button>
          <button type="button" onClick={() => pilih("kurang")} className="inline-flex min-h-12 items-center rounded-2xl bg-orange-500 px-3 text-left text-xs font-black text-white">
            Sorot nilai kurang dari 80
          </button>
        </div>
        <table className="mt-2 w-full border-collapse text-sm font-bold text-[#1C01A5]">
          <thead>
            <tr className="bg-indigo-50">
              <th className="border border-indigo-200 px-2 py-2">Nilai</th>
              <th className="border border-indigo-200 px-2 py-2">Banyak siswa</th>
            </tr>
          </thead>
          <tbody>
            {BARIS_NILAI.map((baris) => {
              const nyala = aktif.includes(baris.nilai);
              const redup = mode === "atas" && baris.nilai === 80;
              return (
                <tr key={baris.nilai} className={nyala ? "bg-amber-200" : redup ? "bg-slate-100 text-slate-400" : "bg-white"}>
                  <td className="border border-indigo-100 px-2 py-2 text-center text-lg">{baris.nilai}</td>
                  <td className="border border-indigo-100 px-2 py-2 text-center text-lg">{baris.banyak}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-2">
          <KanvasLingkar kunci={mode ?? "kosong"} onLingkar={() => kirimEvent("HANDWRITING_CHECKED", { pesan: "Barisnya sudah dilingkari.", benar: true, jenis: "lingkar" })} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-black text-[#1C01A5]">Papan kalkulator</h3>
        <p className="rounded-2xl bg-[#1C01A5] px-3 py-4 text-center text-2xl font-black text-white">{rumus}</p>
        {mode ? (
          <KanvasJawab
            kunci={`filter-${mode}`}
            expected={String(jawab)}
            label="Tulis hasil"
            onHasil={(benar, terbaca) =>
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? `Hasil ${jawab}.` : "Lihat angka di papan kalkulator.", benar, terbaca, expected: String(jawab) })
            }
          />
        ) : (
          <p className="text-sm font-bold text-slate-600">Pilih satu lampu sorot.</p>
        )}
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          labelUji={mode ? String(jawab) : "pilih dulu"}
          onUji={() => {
            if (!mode) return;
            kirimEvent("VOICE_ANSWERED", { pesan: `Hasilnya ${jawab}.`, benar: true, transkrip: String(jawab) });
          }}
        />
      </div>
    </div>
  );
}

function ModeKuis({ kirimEvent }: { kirimEvent: Kirim }) {
  const [nomor, setNomor] = useState(0);
  const [urut, setUrut] = useState<number[]>([]);
  const [coret, setCoret] = useState<boolean[]>(() => Array(10).fill(false));
  const deret = [8, 9, 7, 8, 10, 8, 9, 8, 7, 8];
  const coretDelapan = deret.every((nilai, indeks) => (nilai === 8) === coret[indeks]);
  const [tulisKecil, setTulisKecil] = useState(false);
  const [tulisBesar, setTulisBesar] = useState(false);
  const [tulisLima, setTulisLima] = useState(false);
  const [suaraLima, setSuaraLima] = useState(false);
  const [tulisDelapan, setTulisDelapan] = useState(false);
  const mic = useMic((teks) => {
    const ok = cocokSatu(teks, 5);
    setSuaraLima(ok);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Lima. Tepat!" : "Angka 8 muncul lima kali. Ucapkan lima.", benar: ok, transkrip: teks, soal: 2 });
  });

  const pilihLabu = (nilai: number) => {
    const belum = [7, 4, 9, 5, 6].map((angka, indeks) => ({ angka, indeks })).filter((item) => !urut.includes(item.indeks));
    const kecil = Math.min(...belum.map((item) => item.angka));
    const kartu = belum.find((item) => item.angka === nilai);
    if (!kartu) return;
    if (kartu.angka !== kecil) {
      kirimEvent("SORT_ORDER_HINT", {
        pesan: `Eits, coba lihat lagi di papan atas! Masih ada angka ${kecil} yang lebih kecil dari ${kartu.angka}. Kita urutkan dari yang paling kecil dulu ya!`,
        smallestRemaining: kecil,
        pickedNumber: kartu.angka,
      });
      return;
    }
    setUrut((lama) => [...lama, kartu.indeks]);
  };

  const labuSiap = urut.length === 5 && tulisKecil && tulisBesar;
  const hitungSiap = coretDelapan && tulisLima && suaraLima;
  const boleh = nomor === 0 ? labuSiap : nomor === 1 ? hitungSiap : tulisDelapan;

  const lanjut = () => {
    kirimEvent("QUIZ_ANSWERED", { pesan: `Tantangan ${nomor + 1} selesai.`, benar: true, soal: nomor + 1 });
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan data selesai." });
      return;
    }
    setNomor((n) => n + 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Tantangan {nomor + 1} dari 3</h3>
      {nomor === 0 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Urutkan berat labu dari yang terkecil.</p>
          <div className="flex flex-wrap gap-2">
            {[7, 4, 9, 5, 6].map((nilai, indeks) => (
              <button
                key={`${nilai}-${indeks}`}
                type="button"
                disabled={urut.includes(indeks)}
                onClick={() => pilihLabu(nilai)}
                className={`inline-flex h-12 min-w-12 items-center justify-center rounded-2xl px-3 text-lg font-black ${urut.includes(indeks) ? "bg-slate-200 text-slate-400 line-through" : "bg-orange-200 text-[#1C01A5]"}`}
              >
                {nilai}
              </button>
            ))}
          </div>
          <p className="text-lg font-black text-emerald-700">{urut.map((indeks) => [7, 4, 9, 5, 6][indeks]).join("  ") || "…"}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <KanvasJawab kunci="kuis-kecil" expected="4" label="Paling kecil" disabled={tulisKecil} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Paling kecil 4." : "Cari labu paling ringan.", benar, terbaca, expected: "4" }); if (benar) setTulisKecil(true); }} />
            <KanvasJawab kunci="kuis-besar" expected="9" label="Paling besar" disabled={tulisBesar} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Paling besar 9." : "Cari labu paling berat.", benar, terbaca, expected: "9" }); if (benar) setTulisBesar(true); }} />
          </div>
        </>
      ) : null}
      {nomor === 1 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Coret setiap angka 8. Lalu tulis berapa kalinya.</p>
          <div className="flex flex-wrap gap-2">
            {deret.map((nilai, indeks) => (
              <button
                key={`${nilai}-${indeks}`}
                type="button"
                onClick={() =>
                  setCoret((lama) => {
                    const salin = [...lama];
                    salin[indeks] = !salin[indeks];
                    return salin;
                  })
                }
                className={`relative inline-flex h-12 min-w-12 items-center justify-center rounded-2xl text-lg font-black ${coret[indeks] ? "bg-rose-100 text-rose-700" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"}`}
              >
                {nilai}
                {coret[indeks] ? <span className="absolute left-1 right-1 h-1 rotate-12 rounded bg-rose-500" /> : null}
              </button>
            ))}
          </div>
          <KanvasJawab kunci="kuis-lima" expected="5" label="Berapa kali angka 8?" disabled={tulisLima} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Angka 8 muncul 5 kali." : "Hitung coretan pada angka 8.", benar, terbaca, expected: "5" }); if (benar) setTulisLima(true); }} />
          <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} labelUji="lima" onUji={() => { setSuaraLima(true); kirimEvent("VOICE_ANSWERED", { pesan: "Lima. Tepat!", benar: true, soal: 2 }); }} />
        </>
      ) : null}
      {nomor === 2 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Berapa siswa yang nilainya 90 atau lebih?</p>
          <table className="w-full border-collapse text-sm font-bold text-[#1C01A5]">
            <tbody>
              {[
                ["70", "4"],
                ["80", "8"],
                ["90", "5"],
                ["100", "3"],
              ].map(([nilai, banyak]) => (
                <tr key={nilai} className={nilai === "90" || nilai === "100" ? "bg-amber-100" : ""}>
                  <td className="border border-indigo-100 px-2 py-2">Nilai {nilai}</td>
                  <td className="border border-indigo-100 px-2 py-2 text-center">{banyak} siswa</td>
                </tr>
              ))}
            </tbody>
          </table>
          <KanvasJawab kunci="kuis-gabung" expected="8" label="Tulis 5 + 3" disabled={tulisDelapan} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "5 + 3 = 8 siswa." : "Gabungkan baris 90 dan 100.", benar, terbaca, expected: "8" }); if (benar) setTulisDelapan(true); }} />
        </>
      ) : null}
      {boleh ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 2 ? "Kuis selesai" : "Tantangan berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

function ModeEvaluasi({ kirimEvent, onLulus }: { kirimEvent: Kirim; onLulus: (catatan: string) => void }) {
  const [nomor, setNomor] = useState(0);
  const [siap, setSiap] = useState(false);
  const micSering = useMic((teks) => {
    const ok = cocokSatu(teks, 15);
    if (ok) setSiap(true);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Lima belas. Itu yang paling sering." : "Lima belas muncul tiga kali.", benar: ok, transkrip: teks, soal: 2 });
  });
  const micApel = useMic((teks) => {
    const ok = cocokSatu(teks, 10);
    if (ok) setSiap(true);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Apel sekarang 10." : "8 ditambah 2 sama dengan 10.", benar: ok, transkrip: teks, soal: 5 });
  });

  const lanjut = () => {
    kirimEvent("EVAL_ANSWERED", { pesan: `Soal ${nomor + 1} tepat.`, benar: true, soal: nomor + 1 });
    if (nomor >= 4) {
      onLulus("Lima soal data selesai.");
      return;
    }
    setSiap(false);
    setNomor((n) => n + 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Soal {nomor + 1} dari 5</h3>
      {nomor === 0 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Total lomba 30 siswa. Mewarnai 12, menyanyi 10. Berapa yang membaca puisi?</p>
          <p className="text-lg font-black text-[#1C01A5]">30 − 12 − 10 = ?</p>
          <KanvasJawab kunci="eval-puisi" expected="8" label="Tulis banyak siswa puisi" disabled={siap} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "30 − 22 = 8." : "Jumlahkan 12 dan 10, lalu kurangkan dari 30.", benar, terbaca, expected: "8" }); if (benar) setSiap(true); }} />
        </>
      ) : null}
      {nomor === 1 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Angka mana yang paling sering muncul?</p>
          <p className="text-center text-xl font-black text-[#1C01A5]">10  10  12  15  15  15  18  20</p>
          <TombolMikrofon menyimak={micSering.menyimak} onMulai={micSering.mulai} labelUji="lima belas" onUji={() => { setSiap(true); kirimEvent("VOICE_ANSWERED", { pesan: "Lima belas. Itu yang paling sering.", benar: true, soal: 2 }); }} />
        </>
      ) : null}
      {nomor === 2 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Data 4, 2, 6, 3, 5. Setelah diurut, angka di posisi ke-3?</p>
          <p className="text-lg font-black text-emerald-700">2  3  4  5  6</p>
          <KanvasJawab kunci="eval-tengah" expected="4" label="Tulis angka tengah" disabled={siap} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Posisi ketiga adalah 4." : "Hitung dari kiri: 2, 3, lalu 4.", benar, terbaca, expected: "4" }); if (benar) setSiap(true); }} />
        </>
      ) : null}
      {nomor === 3 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Selisih hewan paling banyak dan paling sedikit?</p>
          <p className="text-sm font-bold text-[#1C01A5]">Kucing 15 · Ikan 10 · Kelinci 6</p>
          <KanvasJawab kunci="eval-selisih" expected="9" label="Tulis 15 − 6" disabled={siap} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "15 − 6 = 9." : "Kucing 15, kelinci 6.", benar, terbaca, expected: "9" }); if (benar) setSiap(true); }} />
        </>
      ) : null}
      {nomor === 4 ? (
        <>
          <p className="text-base font-black text-[#1C01A5]">Apel 8, jeruk 11, mangga 9. Dua anak pindah dari jeruk ke apel. Apel sekarang?</p>
          <p className="text-lg font-black text-[#1C01A5]">8 + 2 = ?</p>
          <KanvasJawab kunci="eval-apel" expected="10" label="Tulis jumlah apel" disabled={siap} onHasil={(benar, terbaca) => { kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Apel sekarang 10." : "Tambahkan 2 pada apel.", benar, terbaca, expected: "10" }); if (benar) setSiap(true); }} />
          <TombolMikrofon menyimak={micApel.menyimak} onMulai={micApel.mulai} labelUji="sepuluh" onUji={() => { setSiap(true); kirimEvent("VOICE_ANSWERED", { pesan: "Apel sekarang 10.", benar: true, soal: 5 }); }} />
        </>
      ) : null}
      {siap ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

export default function SimulasiMtk3Data({
  kelas = "3 SD",
  onTutorEvent,
  onBenar,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("sortir");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanIgil, setPesanIgil] = useState("Halo peneliti cilik! Yuk urutkan data dan baca tabel.");
  const [sedangBicara, setSedangBicara] = useState(false);
  const [suaraAktif, setSuaraAktif] = useState(true);
  const sudahLulus = useRef(false);
  const sudahMulai = useRef(false);
  const suaraRef = useRef(true);
  suaraRef.current = suaraAktif;

  const ucapkan = useCallback((teks: string) => {
    if (!suaraRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(teks);
    u.lang = "id-ID";
    u.rate = 0.95;
    u.onstart = () => setSedangBicara(true);
    u.onend = () => setSedangBicara(false);
    u.onerror = () => setSedangBicara(false);
    window.speechSynthesis.speak(u);
  }, []);

  const bicara = useCallback(
    (teks: string) => {
      setPesanIgil(teks);
      ucapkan(teks);
    },
    [ucapkan],
  );

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
    kirimEvent("SCENE_START", { pesan: "Halo peneliti cilik! Yuk urutkan data dan baca tabel.", adegan: "sortir" });
  }, [kirimEvent]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const pembuka: Record<TabLab, string> = {
    sortir: "Ketuk angka dari yang paling kecil. Ujung kiri terkecil, ujung kanan terbesar.",
    tabel: "Coret satu data, lalu ketuk baris tabel yang sama. Turus kelima digaris miring.",
    filter: "Nyalakan lampu sorot. Nilai di atas 80 tidak menghitung baris 80.",
    kuis: "Tiga tantangan. Urutkan labu, hitung angka 8, lalu gabungkan baris.",
    evaluasi: "Lima soal. Tulis atau ucapkan hasilnya.",
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
      `}</style>
      <div className="flex items-center justify-between gap-2 bg-[#1C01A5] px-3 py-2 text-white">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Lab IGIL · Matematika {kelas}</p>
          <h2 className="text-lg font-black leading-tight">Penyajian Data</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            setSuaraAktif((v) => !v);
            if (suaraAktif) window.speechSynthesis?.cancel();
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
            className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-xl px-1 text-[11px] font-black sm:text-xs ${tab === item.id ? "bg-white text-[#1C01A5]" : "text-indigo-800"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {tab === "sortir" ? <ModeSortir kirimEvent={kirimEvent} bicara={bicara} /> : null}
        {tab === "tabel" ? <ModeTabel kirimEvent={kirimEvent} bicara={bicara} /> : null}
        {tab === "filter" ? <ModeFilter kirimEvent={kirimEvent} bicara={bicara} /> : null}
        {tab === "kuis" ? <ModeKuis kirimEvent={kirimEvent} /> : null}
        {tab === "evaluasi" ? <ModeEvaluasi kirimEvent={kirimEvent} onLulus={tandaiSelesai} /> : null}
      </div>
      <IlmuwanIgil pesan={pesanIgil} bicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
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
