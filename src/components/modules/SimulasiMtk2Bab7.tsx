"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, siapkanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SCENE_START"
  | "TEN_BUNDLED"
  | "HUNDRED_REACHED"
  | "CHART_NEIGHBOR_INSPECTED"
  | "PLACE_VALUE_TRAP_CHECK"
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
type TabLab = "mutiara" | "peta" | "timbang";
type Titik = { x: number; y: number };
type JenisKanvas = "tulis" | "lingkar-kiri" | "lingkar-kanan";
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
type Lompat = 2 | 5 | 10;

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "mutiara", label: "1. Mutiara" },
  { id: "peta", label: "2. Peta 100" },
  { id: "timbang", label: "3. Banding" },
];

const SATUAN_KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN_KATA = [
  "",
  "sepuluh",
  "dua puluh",
  "tiga puluh",
  "empat puluh",
  "lima puluh",
  "enam puluh",
  "tujuh puluh",
  "delapan puluh",
  "sembilan puluh",
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

function bacaBilangan(n: number): string {
  if (n === 100) return "seratus";
  if (n < 0 || n > 100) return String(n);
  if (n < 10) return SATUAN_KATA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN_KATA[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? PULUHAN_KATA[p] : `${PULUHAN_KATA[p]} ${SATUAN_KATA[s]}`;
}

function aliasBilangan(n: number): string[] {
  return [String(n), bacaBilangan(n), bacaBilangan(n).replace(/\s/g, "")];
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/satu ratus/g, "seratus")
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

function IgilPenyelamSvg({ bicara }: { bicara: boolean }) {
  return (
    <span aria-hidden className={`inline-flex h-24 w-20 items-center justify-center text-7xl leading-none ${bicara ? "igil-kedip" : ""}`}>
      🦉
    </span>
  );
}

function SudutPenyelam({ pesan, sedangBicara, onUlang }: { pesan: string; sedangBicara: boolean; onUlang: () => void }) {
  return (
    <div className="pointer-events-none absolute bottom-2 left-2 z-30 flex max-w-[min(100%,24rem)] items-end gap-2">
      <div className="shrink-0">
        <IgilPenyelamSvg bicara={sedangBicara} />
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
    setPesan(benar ? "Benar! Coretanmu rapi." : "Belum tepat. Hapus, lalu coba lagi.");
    onHasil(benar);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-700">{label}</p>
      <div className="relative mx-auto h-44 max-w-md overflow-hidden rounded-2xl bg-[#F8FBFF] ring-2 ring-sky-300 sm:h-52">
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

function PapanDekomposisi({ total }: { total: number }) {
  const puluhan = Math.floor(total / 10);
  const satuan = total % 10;
  const pTampil = total === 100 ? 10 : puluhan;
  const sTampil = total === 100 ? 0 : satuan;
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-2xl bg-amber-100 px-2 py-2 ring-2 ring-amber-300">
        <p className="text-[10px] font-black uppercase text-amber-900">Puluhan</p>
        <p className="text-3xl font-black text-amber-950">{pTampil}</p>
      </div>
      <div className="rounded-2xl bg-sky-100 px-2 py-2 ring-2 ring-sky-300">
        <p className="text-[10px] font-black uppercase text-sky-900">Satuan</p>
        <p className="text-3xl font-black text-sky-950">{sTampil}</p>
      </div>
      <div className="rounded-2xl bg-emerald-100 px-2 py-2 ring-2 ring-emerald-300">
        <p className="text-[10px] font-black uppercase text-emerald-900">Total</p>
        <p className="text-3xl font-black text-emerald-950">{total}</p>
      </div>
      <p className="col-span-3 text-sm font-black text-[#1C01A5]">
        {pTampil} puluhan + {sTampil} satuan = {total} · {bacaBilangan(total)}
      </p>
    </div>
  );
}

function BarisMutiara({ puluhan, satuan, ikat, seratus }: { puluhan: number; satuan: number; ikat: boolean; seratus: boolean }) {
  if (seratus) {
    return (
      <div className="flex min-h-28 items-center justify-center rounded-2xl bg-amber-200 ring-4 ring-yellow-400 igil-pesta">
        <p className="text-center text-lg font-black text-amber-950">🏆 Peti Emas 100 · Seratus!</p>
      </div>
    );
  }
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className="rounded-2xl bg-teal-700/40 p-2 ring-2 ring-teal-200">
        <p className="text-center text-[10px] font-black uppercase text-white">Karang Puluhan</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {Array.from({ length: puluhan }, (_, i) => (
            <span
              key={i}
              className={`rounded-lg bg-amber-100 px-1.5 py-1 text-center text-[10px] font-black text-amber-950 ${
                ikat && i === puluhan - 1 ? "igil-ikat" : ""
              }`}
            >
              🐚10
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-cyan-50/80 p-2 ring-2 ring-cyan-200">
        <p className="text-center text-[10px] font-black uppercase text-sky-900">Pasir Satuan</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1 text-lg">
          {Array.from({ length: satuan }, (_, i) => (
            <span key={i}>⚪</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BatangKapal({ nilai, sorot, langkah }: { nilai: number; sorot: "puluhan" | "satuan" | "tidak"; langkah: 0 | 1 | 2 }) {
  const p = Math.floor(nilai / 10);
  const s = nilai % 10;
  const aktifP = langkah >= 1 && sorot === "puluhan";
  const aktifS = langkah >= 2 && sorot === "satuan";
  return (
    <div className="space-y-1">
      <p className={`rounded-xl px-2 py-1 text-center text-3xl font-black ${aktifP || aktifS ? "bg-yellow-300 text-yellow-950" : "text-white"}`}>
        {nilai}
      </p>
      <div className={`flex flex-wrap justify-center gap-1 rounded-xl p-1 ${aktifP ? "bg-yellow-200" : ""}`}>
        {Array.from({ length: p }, (_, i) => (
          <span key={i} className="rounded bg-amber-100 px-1 text-[10px] font-black text-amber-950">
            📦10
          </span>
        ))}
      </div>
      <div className={`flex flex-wrap justify-center gap-0.5 rounded-xl p-1 text-sm ${aktifS ? "bg-yellow-200" : ""}`}>
        {Array.from({ length: s }, (_, i) => (
          <span key={i}>⚪</span>
        ))}
      </div>
    </div>
  );
}

function AdeganMutiara({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [total, setTotal] = useState(73);
  const [ikat, setIkat] = useState(false);
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(total));
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Tepat! ${total} dibaca ${bacaBilangan(total)}.` : "Ucapkan nama bilangannya, misalnya tujuh puluh tiga.",
      benar: ok,
      angka: total,
    });
  });

  const ubah = (nextMentah: number, dariTombol: "plus1" | "lain") => {
    const prev = total;
    const next = Math.max(0, Math.min(100, nextMentah));
    if (dariTombol === "plus1" && prev % 10 === 9 && next > prev && next % 10 === 0) {
      setIkat(true);
      window.setTimeout(() => setIkat(false), 800);
      const tens = Math.floor(next / 10);
      kirimEvent("TEN_BUNDLED", {
        pesan: `Sepuluh mutiara satuan berkumpul menjadi 1 Kerang Puluhan baru! Sekarang kita punya ${tens} puluhan.`,
        tens,
      });
    }
    setTotal(next);
    if (next === 100 && prev < 100) {
      kirimEvent("HUNDRED_REACHED", {
        pesan: "Luar biasa! 10 Kerang Puluhan sudah penuh semua. 10 puluhan sama dengan 100, dibaca SERATUS!",
      });
    }
  };

  const puluhan = total === 100 ? 10 : Math.floor(total / 10);
  const satuan = total === 100 ? 0 : total % 10;

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Kumpulkan setiap 10 mutiara ke 1 kerang besar. Angka depan puluhan, angka belakang satuan. 10 puluhan sama dengan 100, dibaca seratus."
        onBicara={onBicara}
      />
      <PapanDekomposisi total={total} />
      <BarisMutiara puluhan={puluhan} satuan={satuan} ikat={ikat} seratus={total === 100} />
      <div className="relative z-20 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <button type="button" onClick={() => ubah(total + 10, "lain")} className="min-h-12 rounded-2xl bg-amber-400 px-3 text-sm font-black text-amber-950">
          +10 Puluhan
        </button>
        <button type="button" onClick={() => ubah(total - 10, "lain")} className="min-h-12 rounded-2xl bg-white px-3 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200">
          −10
        </button>
        <button type="button" onClick={() => ubah(total + 1, "plus1")} className="min-h-12 rounded-2xl bg-sky-400 px-3 text-sm font-black text-sky-950">
          +1 Satuan
        </button>
        <button type="button" onClick={() => ubah(total - 1, "lain")} className="min-h-12 rounded-2xl bg-white px-3 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200">
          −1
        </button>
        <button
          type="button"
          onClick={() => ubah(51 + Math.floor(Math.random() * 49), "lain")}
          className="min-h-12 rounded-2xl bg-violet-500 px-3 text-sm font-black text-white"
        >
          Acak 51–99
        </button>
        <button type="button" onClick={() => ubah(100, "lain")} className="min-h-12 rounded-2xl bg-emerald-500 px-3 text-sm font-black text-white">
          Genapkan 100!
        </button>
      </div>
      <KanvasTugas
        kunci="mutiara-tulis"
        jenis="tulis"
        tulisKunci={[String(total)]}
        label="Tuliskan lambang bilangan totalnya di kotak kanvas."
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? `Coretan tepat untuk ${total}.` : `Tulis ${total}.`,
            benar: ok,
            angka: total,
          })
        }
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: `Tepat! ${total} dibaca ${bacaBilangan(total)}.`,
            benar: true,
            angka: total,
          })
        }
        labelUji={bacaBilangan(total)}
      />
    </div>
  );
}

function AdeganPeta({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [pilih, setPilih] = useState(75);
  const [lompat, setLompat] = useState<Lompat>(10);
  const [nyala, setNyala] = useState<number[]>([]);
  const [ping, setPing] = useState<number | null>(null);
  const timerRef = useRef<number[]>([]);

  const tetangga = (n: number) => ({
    kiri: n % 10 === 1 ? null : n - 1,
    kanan: n % 10 === 0 ? null : n + 1,
    atas: n <= 10 ? null : n - 10,
    bawah: n > 90 ? null : n + 10,
  });

  const sembunyi = (() => {
    const t = tetangga(pilih);
    if (t.bawah != null) return t.bawah;
    if (t.atas != null) return t.atas;
    if (t.kanan != null) return t.kanan;
    return t.kiri;
  })();

  const jalankanLompat = (langkah: Lompat) => {
    timerRef.current.forEach((id) => window.clearTimeout(id));
    timerRef.current = [];
    setLompat(langkah);
    const deret: number[] = [];
    for (let n = langkah; n <= 100; n += langkah) deret.push(n);
    setNyala([]);
    setPing(null);
    deret.forEach((n, i) => {
      const id = window.setTimeout(() => {
        setNyala((lama) => [...lama, n]);
        setPing(n);
      }, i * 140);
      timerRef.current.push(id);
    });
  };

  useEffect(() => {
    return () => timerRef.current.forEach((id) => window.clearTimeout(id));
  }, []);

  const ketuk = (n: number) => {
    setPilih(n);
    const nPlus10 = n + 10 <= 100 ? n + 10 : null;
    kirimEvent("CHART_NEIGHBOR_INSPECTED", {
      pesan:
        nPlus10 != null
          ? `Perhatikan angka ${n}! Kalau turun 1 baris di tabel seratus, angkanya selalu bertambah 10 menjadi ${nPlus10}!`
          : `Perhatikan angka ${n}! Ini baris paling bawah. Naik 1 baris berarti kurang 10.`,
      n,
      nPlus10,
    });
  };

  const t = tetangga(pilih);
  const mic = useMic((teks) => {
    const kunci = sembunyi == null ? [] : aliasBilangan(sembunyi);
    const ok = cocokSuara(teks, kunci);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `Tepat! Tetangga itu ${sembunyi}.` : "Sebutkan angka yang tersembunyi.",
      benar: ok,
    });
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Papan seratus seperti radar kapal selam. Lompat 2, 5, atau 10. Ketuk sebuah angka, lalu lihat kiri kanan atas bawah."
        onBicara={onBicara}
      />
      <div className="relative z-20 flex flex-wrap gap-2">
        {([2, 5, 10] as const).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => jalankanLompat(n)}
            className={`min-h-12 rounded-2xl px-3 text-sm font-black ${
              lompat === n && nyala.length > 0 ? "bg-emerald-500 text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"
            }`}
          >
            Lompat {n}-{n}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-10 gap-0.5 rounded-2xl bg-slate-900 p-1.5">
        {Array.from({ length: 100 }, (_, i) => {
          const n = i + 1;
          const detektif = n === pilih || n === t.kiri || n === t.kanan || n === t.atas || n === t.bawah;
          const hilang = n === sembunyi;
          const kelipatan = nyala.includes(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => ketuk(n)}
              className={`min-h-8 rounded-md text-[10px] font-black sm:min-h-9 sm:text-xs ${
                n === pilih
                  ? "bg-yellow-300 text-yellow-950"
                  : hilang
                    ? "bg-slate-700 text-slate-500"
                    : kelipatan
                      ? ping === n
                        ? "igil-sonar bg-cyan-300 text-cyan-950"
                        : "bg-cyan-500 text-white"
                      : detektif
                        ? "bg-sky-200 text-sky-950"
                        : "bg-slate-800 text-cyan-100"
              }`}
            >
              {hilang ? "?" : n}
            </button>
          );
        })}
      </div>
      <p className="text-xs font-bold text-slate-700">
        Jendela detektif {pilih}: kiri {t.kiri ?? "—"} · kanan {t.kanan ?? "—"} · atas {t.atas ?? "—"} · bawah {t.bawah ?? "—"}
      </p>
      {sembunyi != null ? (
        <KanvasTugas
          kunci={`peta-${pilih}`}
          jenis="tulis"
          tulisKunci={[String(sembunyi)]}
          label={`Satu petak tetangga ${pilih} disembunyikan. Tuliskan angkanya!`}
          onHasil={(ok) =>
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: ok ? `Benar, tetangganya ${sembunyi}.` : `Coba hitung +1, −1, +10, atau −10 dari ${pilih}.`,
              benar: ok,
            })
          }
        />
      ) : null}
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: sembunyi != null ? `Tepat! Tetangga itu ${sembunyi}.` : "Pilih angka dulu.",
            benar: true,
          })
        }
        labelUji={sembunyi != null ? bacaBilangan(sembunyi) : "pilih angka"}
      />
    </div>
  );
}

function AdeganTimbang({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [kiri, setKiri] = useState(81);
  const [kanan, setKanan] = useState(79);
  const [langkah, setLangkah] = useState<0 | 1 | 2>(0);
  const pKiri = Math.floor(kiri / 10);
  const pKanan = Math.floor(kanan / 10);
  const puluhanSama = pKiri === pKanan;
  const lebihKiri = kiri > kanan;
  const sorot: "puluhan" | "satuan" | "tidak" = langkah === 0 ? "tidak" : langkah === 1 || !puluhanSama ? "puluhan" : "satuan";

  const mic = useMic((teks) => {
    const besar = Math.max(kiri, kanan);
    const ok = cocokSuara(teks, [...aliasBilangan(besar), "lebih", "lebih besar", "lebih dari"]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${bacaBilangan(besar)} lebih besar.` : "Sebutkan bilangan yang lebih besar.",
      benar: ok,
    });
  });

  const ujiJebakan = () => {
    setKiri(81);
    setKanan(79);
    setLangkah(1);
    kirimEvent("PLACE_VALUE_TRAP_CHECK", {
      pesan: "Jangan terkecoh angka satuan 9 pada 79! Lihat puluhannya dulu: 81 punya 8 puluhan, sedangkan 79 cuma 7 puluhan. Jadi 81 lebih besar!",
    });
  };

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Bandingkan puluhan dulu. Kalau puluhannya sama, baru lihat satuan. Jangan terkecoh angka belakang."
        onBicara={onBicara}
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-rose-500 p-2">
          <p className="text-center text-[10px] font-black uppercase text-white">Kapal Merah</p>
          <BatangKapal nilai={kiri} sorot={sorot} langkah={langkah} />
        </div>
        <div className="rounded-2xl bg-sky-600 p-2">
          <p className="text-center text-[10px] font-black uppercase text-white">Kapal Biru</p>
          <BatangKapal nilai={kanan} sorot={sorot} langkah={langkah} />
        </div>
      </div>
      <div className="relative z-20 grid grid-cols-2 gap-2">
        <label className="text-sm font-black text-[#1C01A5]">
          Kiri {kiri}
          <input
            type="range"
            min={51}
            max={100}
            value={kiri}
            onChange={(e) => {
              setLangkah(0);
              setKiri(Number(e.target.value));
            }}
            className="mt-1 w-full"
          />
        </label>
        <label className="text-sm font-black text-[#1C01A5]">
          Kanan {kanan}
          <input
            type="range"
            min={51}
            max={100}
            value={kanan}
            onChange={(e) => {
              setLangkah(0);
              setKanan(Number(e.target.value));
            }}
            className="mt-1 w-full"
          />
        </label>
        <button type="button" onClick={ujiJebakan} className="min-h-12 rounded-2xl bg-rose-500 px-3 text-xs font-black text-white">
          Uji Jebakan 81 vs 79
        </button>
        <button
          type="button"
          onClick={() => {
            setKiri(74);
            setKanan(78);
            setLangkah(1);
          }}
          className="min-h-12 rounded-2xl bg-violet-500 px-3 text-xs font-black text-white"
        >
          Uji Puluhan Sama 74 vs 78
        </button>
        <button
          type="button"
          onClick={() => {
            const next: 0 | 1 | 2 = langkah === 0 ? 1 : puluhanSama ? 2 : 1;
            setLangkah(next);
            if (kiri === 81 && kanan === 79) {
              kirimEvent("PLACE_VALUE_TRAP_CHECK", {
                pesan: "Jangan terkecoh angka satuan 9 pada 79! Lihat puluhannya dulu: 81 punya 8 puluhan, sedangkan 79 cuma 7 puluhan. Jadi 81 lebih besar!",
              });
            }
          }}
          className="col-span-2 min-h-12 rounded-2xl bg-[#1C01A5] px-3 text-sm font-black text-white"
        >
          Sorot Langkah Pembandingan
        </button>
      </div>
      {langkah >= 1 ? (
        <p className="text-sm font-black text-[#1C01A5]">
          {puluhanSama
            ? `Puluhan sama ${pKiri}. Lihat satuan: ${kiri} vs ${kanan}.`
            : `${lebihKiri ? kiri : kanan} lebih besar karena puluhannya lebih banyak.`}
        </p>
      ) : null}
      <KanvasTugas
        kunci={`band-${kiri}-${kanan}`}
        jenis={lebihKiri ? "lingkar-kiri" : "lingkar-kanan"}
        label="Lingkari kapal yang NILAINYA LEBIH BESAR."
        latar={
          <div className="absolute inset-0 grid grid-cols-2 place-items-center text-4xl font-black text-[#1C01A5]">
            <span>🔴 {kiri}</span>
            <span>🔵 {kanan}</span>
          </div>
        }
        onHasil={(ok) =>
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: ok ? `${Math.max(kiri, kanan)} lebih besar.` : "Cek puluhan dulu, jangan terkecoh satuan.",
            benar: ok,
          })
        }
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() =>
          kirimEvent("VOICE_ANSWERED", {
            pesan: `${bacaBilangan(Math.max(kiri, kanan))} lebih besar.`,
            benar: true,
          })
        }
        labelUji={bacaBilangan(Math.max(kiri, kanan))}
      />
    </div>
  );
}

function AdeganKuis({ kirimEvent, onBicara }: { kirimEvent: Kirim; onBicara: (v: boolean) => void }) {
  const [nomor, setNomor] = useState(0);
  const mic1 = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(76));
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Tujuh puluh enam. Tepat!" : "Ucapkan tujuh puluh enam.", benar: ok, soal: 1 });
  });
  const mic3 = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(86));
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Delapan puluh enam lebih besar." : "Sebutkan 86.", benar: ok, soal: 3 });
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Tiga tantangan palung. Hitung kerang, lengkapi tabel seratus, lalu bandingkan dua bilangan."
        onBicara={onBicara}
      />
      <p className="text-sm font-black text-[#1C01A5]">Tantangan {nomor + 1} / 3</p>
      {nomor === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Ada 7 kerang puluhan dan 6 mutiara satuan. Tulis 76 dan ucapkan tujuh puluh enam.</p>
          <BarisMutiara puluhan={7} satuan={6} ikat={false} seratus={false} />
          <KanvasTugas
            kunci="kuis-1"
            jenis="tulis"
            tulisKunci={["76"]}
            label="Tuliskan lambang bilangannya."
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "76. Tujuh puluh enam!" : "7 puluhan + 6 satuan = 76.", benar: ok, soal: 1 })}
          />
          <TombolMikrofon
            menyimak={mic1.menyimak}
            onMulai={mic1.mulai}
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Tujuh puluh enam. Tepat!", benar: true, soal: 1 })}
            labelUji="Tujuh puluh enam"
          />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Turun satu kotak bertambah 10. Lengkapi: 64, 74, [ ? ].</p>
          <div className="mx-auto w-24 overflow-hidden rounded-xl border-2 border-[#1C01A5] text-center text-lg font-black text-[#1C01A5]">
            <p className="border-b border-[#1C01A5]/20 py-1">64</p>
            <p className="border-b border-[#1C01A5]/20 py-1">74</p>
            <p className="bg-amber-50 py-1">?</p>
          </div>
          <KanvasTugas
            kunci="kuis-2"
            jenis="tulis"
            tulisKunci={["84"]}
            label="Tuliskan angka di bawah 74."
            onHasil={(ok) => kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "84. 74 tambah 10." : "Tiap turun tambah 10.", benar: ok, soal: 2 })}
          />
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Mana yang lebih besar: 68 atau 86? Lingkari yang lebih besar, lalu ucapkan.</p>
          <KanvasTugas
            kunci="kuis-3"
            jenis="lingkar-kanan"
            label="Lingkari 86 di kanan."
            latar={
              <div className="absolute inset-0 grid grid-cols-2 place-items-center text-4xl font-black text-[#1C01A5]">
                <span>68</span>
                <span>86</span>
              </div>
            }
            onHasil={(ok) =>
              kirimEvent("QUIZ_ANSWERED", { pesan: ok ? "86 lebih besar. 8 puluhan > 6 puluhan." : "Cek puluhan dulu.", benar: ok, soal: 3 })
            }
          />
          <TombolMikrofon
            menyimak={mic3.menyimak}
            onMulai={mic3.mulai}
            onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Delapan puluh enam lebih besar.", benar: true, soal: 3 })}
            labelUji="Delapan puluh enam"
          />
        </div>
      ) : null}
      <NavLangkah
        indeks={nomor}
        total={3}
        labelAkhir="Selesai kuis"
        onPrev={() => setNomor((n) => Math.max(0, n - 1))}
        onNext={() => {
          if (nomor >= 2) kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan palung selesai. Hebat!" });
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
  const mic2 = useMic((teks) => {
    const ok = cocokSuara(teks, ["sepuluh", "10"]);
    catat(ok, ok ? "Sepuluh lagi menjadi 100." : "90 butuh 10 lagi.", 2);
  });
  const mic5 = useMic((teks) => {
    const ok = cocokSuara(teks, aliasBilangan(85));
    catat(ok, ok ? "Delapan puluh lima paling besar." : "Letakkan 8 di depan.", 5);
  });

  return (
    <div className="space-y-3">
      <TombolDengarGuru
        naskah="Lima soal juara palung. Perhatikan nilai tempat puluhan dan satuan. Jangan terbalik!"
        onBicara={onBicara}
      />
      <p className="text-sm font-black text-[#1C01A5]">Soal {nomor + 1} / 5</p>
      {nomor === 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Aku terdiri dari 4 Satuan dan 9 Puluhan. Tuliskan lambang bilangannya. Jangan terbalik!</p>
          <KanvasTugas
            kunci="e1"
            jenis="tulis"
            tulisKunci={["94"]}
            label="Tuliskan angkanya."
            onHasil={(ok) => catat(ok, ok ? "94. Sembilan puluhan di depan." : "9 puluhan di depan, 4 satuan di belakang.", 1)}
          />
        </div>
      ) : null}
      {nomor === 1 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Sudah 9 batang puluhan (90). Butuh tambah berapa lagi supaya genap 100?</p>
          <BarisMutiara puluhan={9} satuan={0} ikat={false} seratus={false} />
          <TombolMikrofon
            menyimak={mic2.menyimak}
            onMulai={mic2.mulai}
            onUji={() => catat(true, "Sepuluh lagi menjadi 100.", 2)}
            labelUji="Sepuluh"
          />
        </div>
      ) : null}
      {nomor === 2 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">6 kantong puluhan dan 13 mutiara satuan. 10 satuan jadi 1 puluhan baru. Tulis jumlahnya.</p>
          <BarisMutiara puluhan={6} satuan={13} ikat={false} seratus={false} />
          <KanvasTugas
            kunci="e3"
            jenis="tulis"
            tulisKunci={["73"]}
            label="Tuliskan totalnya."
            onHasil={(ok) => catat(ok, ok ? "73. 7 puluhan dan 3 satuan." : "6 puluhan + 1 puluhan baru + 3 sisa = 73.", 3)}
          />
        </div>
      ) : null}
      {nomor === 3 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Lompat mundur 5: 95 − 90 − 85 − [ ? ] − 75. Tulis angka yang hilang.</p>
          <p className="text-center text-lg font-black text-[#1C01A5]">95 − 90 − 85 − ? − 75</p>
          <KanvasTugas
            kunci="e4"
            jenis="tulis"
            tulisKunci={["80"]}
            label="Tuliskan angka yang hilang."
            onHasil={(ok) => catat(ok, ok ? "80. 85 kurang 5." : "Tiap lompat mundur kurang 5.", 4)}
          />
        </div>
      ) : null}
      {nomor === 4 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-700">Kartu 5 dan 8. Susun bilangan dua angka PALING BESAR, tulis dan ucapkan.</p>
          <p className="text-center text-3xl font-black text-[#1C01A5]">5 · 8</p>
          <KanvasTugas
            kunci="e5"
            jenis="tulis"
            tulisKunci={["85"]}
            label="Tuliskan bilangan terbesar."
            onHasil={(ok) => catat(ok, ok ? "85. Delapan puluhan di depan." : "Letakkan angka terbesar di depan.", 5)}
          />
          <TombolMikrofon
            menyimak={mic5.menyimak}
            onMulai={mic5.mulai}
            onUji={() => catat(true, "Delapan puluh lima paling besar.", 5)}
            labelUji="Delapan puluh lima"
          />
        </div>
      ) : null}
      <NavLangkah
        indeks={nomor}
        total={5}
        labelAkhir="Selesai uji"
        onPrev={() => setNomor((n) => Math.max(0, n - 1))}
        onNext={() => {
          if (nomor >= 4) onLulus("Evaluasi membilang sampai 100 selesai. Kamu penyelam teliti!");
          else setNomor((n) => n + 1);
        }}
      />
    </div>
  );
}

export default function SimulasiMtk2Bab7({
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
  const [tab, setTab] = useState<TabLab>("mutiara");
  const [pesanIgil, setPesanIgil] = useState("Halo penyelam cilik! Yuk hitung mutiara sampai 100 bersama Penyelam IGIL.");
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
    const pembukaAwal = "Halo penyelam cilik! Yuk hitung mutiara sampai 100 bersama Penyelam IGIL.";
    siapkanSuaraGuruIgil(pembukaAwal, { kelas, kelamin });
    kirimEvent("SCENE_START", {
      pesan: pembukaAwal,
      adegan: "mutiara",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pembuka: Record<TabLab, string> = {
    mutiara: "Tambah puluhan dan satuan. Kalau satuan penuh 10, ikat jadi 1 kerang puluhan. 10 kerang jadi peti seratus.",
    peta: "Papan 1 sampai 100. Lompat 2, 5, atau 10. Ketuk angka, lalu lihat tetangga plus-minus 1 dan 10.",
    timbang: "Bandingkan dua kapal. Cek puluhan dulu. Jangan terkecoh satuan yang lebih besar.",
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
        @keyframes igil-ikat {
          0% { transform: scale(1); }
          40% { transform: scale(1.25) rotate(-8deg); }
          100% { transform: scale(1); }
        }
        @keyframes igil-pesta {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes igil-sonar {
          0% { box-shadow: 0 0 0 0 rgba(103, 232, 249, 0.7); }
          100% { box-shadow: 0 0 0 10px rgba(103, 232, 249, 0); }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
        .igil-ikat { animation: igil-ikat 0.8s ease-in-out; }
        .igil-pesta { animation: igil-pesta 0.8s ease-in-out infinite; }
        .igil-sonar { animation: igil-sonar 0.6s ease-out; }
      `}</style>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-[#1C01A5] to-cyan-500 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Ayo Membilang sampai dengan 100</h2>
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
      <div className="relative h-[min(72vh,42rem)] bg-gradient-to-b from-sky-100 to-cyan-600">
        <div className="h-full overflow-y-auto p-3 pb-32 sm:p-4">
          {tab === "mutiara" ? <AdeganMutiara kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "peta" ? <AdeganPeta kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
          {tab === "timbang" ? <AdeganTimbang kirimEvent={kirimEvent} onBicara={setSedangBicara} /> : null}
        </div>
        <SudutPenyelam pesan={pesanIgil} sedangBicara={sedangBicara} onUlang={() => ucapkan(pesanIgil)} />
      </div>
    </div>
  );
}
