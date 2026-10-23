"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";

export type TutorEventType =
  | "SCENE_START"
  | "HUNDRED_BUNDLED"
  | "ZERO_PLACEHOLDER_ALERT"
  | "THOUSAND_REACHED"
  | "NUMBER_LINE_ZOOMED"
  | "THREE_DIGIT_TRAP_CHECK"
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

type TabLab = "pabrik" | "teropong" | "timbangan" | "kuis" | "evaluasi";
type Titik = { x: number; y: number };
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "pabrik", label: "Pabrik Balok" },
  { id: "teropong", label: "Teropong" },
  { id: "timbangan", label: "Timbangan" },
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

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function titikRibuan(n: number): string {
  return n.toLocaleString("id-ID");
}

function baca(n: number): string {
  if (n === 0) return "nol";
  if (n === 1000) return "seribu";
  if (n < 10) return NAMA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${NAMA[n - 10]} belas`;
  if (n < 100) {
    const puluh = Math.floor(n / 10);
    const sisa = n % 10;
    return sisa ? `${NAMA[puluh]} puluh ${NAMA[sisa]}` : `${NAMA[puluh]} puluh`;
  }
  const ratus = Math.floor(n / 100);
  const sisa = n % 100;
  const kepala = ratus === 1 ? "seratus" : `${NAMA[ratus]} ratus`;
  return sisa ? `${kepala} ${baca(sisa)}` : kepala;
}

function aliasBilangan(n: number): string[] {
  const daftar = [baca(n), String(n), titikRibuan(n)];
  if (n === 1000) daftar.push("satu ribu", "seribu");
  if (n === 100) daftar.push("satu ratus", "satu ratusan", "seratus");
  if (n >= 100 && n % 100 > 0 && n % 100 < 10) {
    const kepala = Math.floor(n / 100) === 1 ? "seratus" : `${NAMA[Math.floor(n / 100)]} ratus`;
    daftar.push(`${kepala} kosong ${NAMA[n % 10]}`, `${kepala} nol ${NAMA[n % 10]}`);
  }
  return daftar;
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
  if (!n) return false;
  return alias.some((item) => {
    const a = normalisasiSuara(item).replace(/\s/g, "");
    return n.includes(a) || a.includes(n);
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
  return { data: img.data, width, minX, minY, maxX, maxY };
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

function kenaliTanda(kanvas: HTMLCanvasElement): string {
  const kotak = kotakTinta(kanvas);
  if (!kotak) return "";
  const { data, width, minX, minY, maxX, maxY } = kotak;
  const tinggi = Math.max(1, maxY - minY);
  const lebar = Math.max(1, maxX - minX);
  const ys = [0, 0, 0];
  const kanan = [-1, -1, -1];
  const kiri = [width, width, width];
  let n = 0;
  for (let y = minY; y <= maxY; y += 2) {
    for (let x = minX; x <= maxX; x += 2) {
      const i = (y * width + x) * 4;
      if (!tintaPixel(data, i)) continue;
      n += 1;
      const zona = Math.min(2, Math.floor(((y - minY) / tinggi) * 3));
      ys[zona] += 1;
      if (x > kanan[zona]) kanan[zona] = x;
      if (x < kiri[zona]) kiri[zona] = x;
    }
  }
  if (n < 12) return "";
  const tengahKosong = ys[1] < n * 0.12;
  if (ys[0] > n * 0.15 && ys[2] > n * 0.15 && tengahKosong && lebar > tinggi * 0.7) return "=";
  const gap = lebar * 0.12;
  if (kanan[1] > kanan[0] + gap && kanan[1] > kanan[2] + gap) return ">";
  if (kiri[1] < kiri[0] - gap && kiri[1] < kiri[2] - gap) return "<";
  const pusat = (minX + maxX) / 2;
  if (pusat < kanvas.width * 0.42 && lebar < kanvas.width * 0.55) return "lingkar-kiri";
  return "";
}

function TombolBulat({
  anak,
  onClick,
  warna,
  disabled,
}: {
  anak: string;
  onClick: () => void;
  warna: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl px-3 text-sm font-black text-white disabled:opacity-40 ${warna}`}
    >
      {anak}
    </button>
  );
}

function Lempeng({ goyang }: { goyang?: boolean }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" className={goyang ? "igil-nyatu" : ""} aria-hidden>
      {Array.from({ length: 100 }, (_, i) => (
        <rect
          key={i}
          x={2 + (i % 10) * 3}
          y={2 + Math.floor(i / 10) * 3}
          width="2.4"
          height="2.4"
          rx="0.4"
          fill="#2563eb"
        />
      ))}
    </svg>
  );
}

function Batang({ goyang }: { goyang?: boolean }) {
  return (
    <svg width="12" height="40" viewBox="0 0 12 40" className={goyang ? "igil-nyatu" : ""} aria-hidden>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x="1" y={2 + i * 3.6} width="10" height="3" rx="1" fill="#16a34a" />
      ))}
    </svg>
  );
}

function KubusKecil() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#fb923c" stroke="#c2410c" />
    </svg>
  );
}

function KubusEmas() {
  return (
    <svg width="120" height="110" viewBox="0 0 120 110" className="igil-emas" aria-hidden>
      <polygon points="20,40 60,18 100,40 60,62" fill="#fde047" stroke="#a16207" strokeWidth="2" />
      <polygon points="20,40 60,62 60,100 20,78" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      <polygon points="100,40 60,62 60,100 100,78" fill="#eab308" stroke="#a16207" strokeWidth="2" />
      <text x="60" y="72" textAnchor="middle" fontSize="16" fontWeight="800" fill="#713f12">
        1.000
      </text>
    </svg>
  );
}

function BalokBilangan({ n, sorot }: { n: number; sorot?: "r" | "p" | "s" | null }) {
  const r = Math.floor(n / 100);
  const p = Math.floor((n % 100) / 10);
  const s = n % 10;
  return (
    <div className="flex flex-wrap items-end justify-center gap-1">
      <span className={`flex flex-wrap justify-center gap-0.5 rounded-xl p-1 ${sorot === "r" ? "bg-amber-200" : ""}`}>
        {Array.from({ length: r }, (_, i) => (
          <Lempeng key={i} />
        ))}
      </span>
      <span className={`flex items-end gap-0.5 rounded-xl p-1 ${sorot === "p" ? "bg-amber-200" : ""}`}>
        {Array.from({ length: p }, (_, i) => (
          <Batang key={i} />
        ))}
      </span>
      <span className={`flex flex-wrap gap-0.5 rounded-xl p-1 ${sorot === "s" ? "bg-amber-200" : ""}`}>
        {Array.from({ length: s }, (_, i) => (
          <KubusKecil key={i} />
        ))}
      </span>
    </div>
  );
}

function KanvasJawab({
  kunci,
  expected,
  label,
  mode,
  terimaLingkar,
  disabled,
  onHasil,
}: {
  kunci: string;
  expected: string;
  label: string;
  mode: "angka" | "tanda";
  terimaLingkar?: boolean;
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
    const tinggi = mode === "tanda" ? 72 : 78;
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
  }, [mode]);

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
    const terbaca = mode === "tanda" ? kenaliTanda(kanvas) : kenaliAngkaKanvas(kanvas, expected.length);
    const benar =
      terbaca === expected || (Boolean(terimaLingkar) && expected === ">" && terbaca === "lingkar-kiri");
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

function ArsitekIgil({
  pesan,
  bicara,
  onUlang,
}: {
  pesan: string;
  bicara: boolean;
  onUlang: () => void;
}) {
  return (
    <div className="flex items-end gap-2 border-t border-amber-200 bg-amber-50 px-2 py-2">
      <span aria-hidden className={`select-none text-7xl leading-none ${bicara ? "igil-angguk" : ""}`}>
        🦉
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase text-amber-800">Arsitek IGIL</p>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{pesan}</p>
      </div>
      <button
        type="button"
        onClick={onUlang}
        aria-label="Putar suara Arsitek IGIL"
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#1C01A5] text-lg font-black text-white"
      >
        ▶
      </button>
    </div>
  );
}

function ModePabrik({ kirimEvent }: { kirimEvent: Kirim }) {
  const [r, setR] = useState(0);
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [tulis, setTulis] = useState([false, false, false]);
  const [suaraOk, setSuaraOk] = useState(false);
  const [umpan, setUmpan] = useState("");
  const nolSebelum = useRef(true);
  const ribuSudah = useRef(false);
  const total = Math.min(1000, r * 100 + p * 10 + s);
  const seribu = r >= 10;
  const digit = seribu ? ["1", "0", "0", "0"] : [String(r), String(p), String(s)];

  useEffect(() => {
    if (s < 10 && p < 10) return;
    if (s >= 10) {
      const t = window.setTimeout(() => {
        setS(0);
        setP((v) => v + 1);
      }, 650);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setP(0);
      setR((v) => v + 1);
      kirimEvent("HUNDRED_BUNDLED", {
        pesan: "Hebat! 10 batang puluhan berkumpul menjadi 1 Lempeng Ratusan (100)!",
      });
    }, 650);
    return () => window.clearTimeout(t);
  }, [s, p, kirimEvent]);

  useEffect(() => {
    if (r < 10) {
      ribuSudah.current = false;
      return;
    }
    if (ribuSudah.current) return;
    ribuSudah.current = true;
    if (p !== 0 || s !== 0) {
      setP(0);
      setS(0);
    }
    kirimEvent("THOUSAND_REACHED", {
      pesan: "Luar biasa! 10 lempeng ratusan bergabung menjadi 1.000, dibaca SERIBU!",
    });
  }, [r, p, s, kirimEvent]);

  useEffect(() => {
    const kosong = r > 0 && r < 10 && p === 0 && s > 0;
    if (kosong && !nolSebelum.current) {
      const tanpaNol = Number(`${r}${s}`);
      kirimEvent("ZERO_PLACEHOLDER_ALERT", {
        pesan:
          total === 305
            ? "Lihat, Kamar Puluhannya kosong! Kita tetap harus menulis angka 0 di tengah supaya menjadi 305 (tiga ratus lima), bukan 35 ya!"
            : `Lihat, Kamar Puluhannya kosong! Kita tetap harus menulis angka 0 di tengah supaya menjadi ${total} (${baca(total)}), bukan ${tanpaNol} ya!`,
      });
    }
    nolSebelum.current = kosong;
  }, [r, p, s, total, kirimEvent]);

  const pasang = (n: number) => {
    const batas = Math.max(0, Math.min(1000, n));
    setR(Math.floor(batas / 100));
    setP(Math.floor((batas % 100) / 10));
    setS(batas % 10);
    setTulis([false, false, false]);
    setSuaraOk(false);
  };

  const tambah = (unit: number) => {
    if (s >= 10 || p >= 10) return;
    if (unit === 1) {
      if (r >= 10) return;
      setS((v) => v + 1);
      return;
    }
    if (unit === 10) {
      if (r >= 10) return;
      setP((v) => v + 1);
      return;
    }
    if (unit === 100) {
      if (total + 100 >= 1000) pasang(1000);
      else setR((v) => v + 1);
      return;
    }
    if (total + unit < 0) return;
    const baru = total + unit;
    setR(Math.floor(baru / 100));
    setP(Math.floor((baru % 100) / 10));
    setS(baru % 10);
  };

  const mic = useMic((teks) => {
    if (!teks) {
      setUmpan("Mikrofon belum ada. Pakai tombol uji.");
      return;
    }
    const ok = cocokSuara(teks, aliasBilangan(total));
    setUmpan(ok ? "Namanya tepat!" : `Kamu bilang: "${teks}".`);
    if (ok) setSuaraOk(true);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? `${baca(total)} tepat!` : `Coba ucapkan ${baca(total)}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-white px-2 py-2 text-center">
        <span className="text-xl font-black text-blue-700">{r * 100}</span>
        <span className="font-black text-slate-400">+</span>
        <span className="text-xl font-black text-emerald-700">{p * 10}</span>
        <span className="font-black text-slate-400">+</span>
        <span className="text-xl font-black text-orange-600">{s}</span>
        <span className="font-black text-slate-400">=</span>
        <span className="text-2xl font-black text-[#1C01A5]">{titikRibuan(total)}</span>
        <span className="w-full text-sm font-bold text-slate-600">{baca(total)}</span>
      </div>
      <div className="grid min-h-36 grid-cols-3 gap-2">
        <div className={`flex min-h-0 flex-col rounded-xl p-1 ${p >= 10 ? "" : "bg-blue-50"}`}>
          <p className="text-center text-[11px] font-black text-blue-800">Kamar Ratusan</p>
          <div className="flex flex-1 flex-wrap content-start justify-center gap-0.5 overflow-hidden">
            {seribu ? <KubusEmas /> : Array.from({ length: Math.min(r, 9) }, (_, i) => <Lempeng key={i} />)}
          </div>
          <div className="flex justify-center gap-1">
            <TombolBulat anak="+100" warna="bg-blue-600" onClick={() => tambah(100)} disabled={seribu} />
            <TombolBulat anak="−100" warna="bg-blue-800" onClick={() => tambah(-100)} disabled={total < 100} />
          </div>
        </div>
        <div className="flex min-h-0 flex-col rounded-xl bg-emerald-50 p-1">
          <p className="text-center text-[11px] font-black text-emerald-800">Kamar Puluhan</p>
          <div className={`flex flex-1 items-end justify-center gap-0.5 ${p >= 10 ? "igil-nyatu" : ""}`}>
            {Array.from({ length: Math.min(p, 10) }, (_, i) => (
              <Batang key={i} goyang={p >= 10} />
            ))}
          </div>
          <div className="flex justify-center gap-1">
            <TombolBulat anak="+10" warna="bg-emerald-600" onClick={() => tambah(10)} disabled={seribu} />
            <TombolBulat anak="−10" warna="bg-emerald-800" onClick={() => tambah(-10)} disabled={total < 10} />
          </div>
        </div>
        <div className="flex min-h-0 flex-col rounded-xl bg-orange-50 p-1">
          <p className="text-center text-[11px] font-black text-orange-800">Kamar Satuan</p>
          <div className={`flex flex-1 flex-wrap content-end justify-center gap-0.5 ${s >= 10 ? "igil-nyatu" : ""}`}>
            {Array.from({ length: Math.min(s, 10) }, (_, i) => (
              <KubusKecil key={i} />
            ))}
          </div>
          <div className="flex justify-center gap-1">
            <TombolBulat anak="+1" warna="bg-orange-500" onClick={() => tambah(1)} disabled={seribu} />
            <TombolBulat anak="−1" warna="bg-orange-700" onClick={() => tambah(-1)} disabled={total < 1} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => pasang(total === 305 ? 350 : 305)}
          className="inline-flex min-h-12 items-center rounded-2xl bg-amber-300 px-3 text-xs font-black text-amber-950"
        >
          Uji Angka Nol Tengah (305 vs 350)
        </button>
        <button
          type="button"
          onClick={() => pasang(1000)}
          className="inline-flex min-h-12 items-center rounded-2xl bg-yellow-400 px-3 text-xs font-black text-yellow-950"
        >
          Genapkan 1.000!
        </button>
      </div>
      <div className="flex gap-2">
        {digit.slice(0, 3).map((angka, i) => (
          <KanvasJawab
            key={`${total}-${i}`}
            kunci={`${total}-${i}`}
            expected={angka}
            label={["Ratusan", "Puluhan", "Satuan"][i]}
            mode="angka"
            disabled={tulis[i]}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? `${["Ratusan", "Puluhan", "Satuan"][i]} ${angka} tepat.` : `Tulis ${angka}.`,
                benar,
                terbaca,
              });
              if (benar) setTulis((lama) => lama.map((v, idx) => (idx === i ? true : v)));
            }}
          />
        ))}
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => {
          setSuaraOk(true);
          kirimEvent("VOICE_ANSWERED", { pesan: `${baca(total)} tepat!`, benar: true, transkrip: baca(total) });
        }}
        labelUji={baca(total)}
      />
      {umpan || suaraOk ? <p className="text-xs font-bold text-emerald-800">{suaraOk ? "Suara tepat!" : umpan}</p> : null}
    </div>
  );
}

function ModeTeropong({ kirimEvent }: { kirimEvent: Kirim }) {
  const [jendela, setJendela] = useState(400);
  const [posisi, setPosisi] = useState(420);
  const [tebak, setTebak] = useState(false);
  const [tebakOk, setTebakOk] = useState(false);
  const jendelaLama = useRef(jendela);

  useEffect(() => {
    if (jendelaLama.current === jendela) return;
    jendelaLama.current = jendela;
    kirimEvent("NUMBER_LINE_ZOOMED", {
      pesan: `Teropong kita sekarang memperbesar angka di antara ${jendela} dan ${jendela + 100}. Setiap garis kecil di sini bernilai 10 langkah!`,
      startHundred: jendela,
      endHundred: jendela + 100,
    });
  }, [jendela, kirimEvent]);

  const lompat = (langkah: number) => {
    const baru = Math.max(0, Math.min(1000, posisi + langkah));
    setPosisi(baru);
    const mulai = baru >= 1000 ? 900 : Math.floor(baru / 100) * 100;
    if (mulai !== jendela) setJendela(mulai);
  };

  const tersembunyi = tebak && jendela === 600;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">Garis 0 sampai 1.000. Penanda di {titikRibuan(posisi)}.</p>
      <svg viewBox="0 0 1000 70" className="h-16 w-full">
        <line x1="20" y1="40" x2="980" y2="40" stroke="#1C01A5" strokeWidth="4" />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={20 + i * 96} y1="28" x2={20 + i * 96} y2="52" stroke="#1C01A5" strokeWidth="3" />
            <text x={20 + i * 96} y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1C01A5">
              {i === 10 ? "1.000" : i * 100}
            </text>
          </g>
        ))}
        <rect x={20 + (jendela / 100) * 96} y="18" width="96" height="36" fill="#fde047" opacity="0.45" rx="8" />
        <circle cx={20 + (posisi / 1000) * 960} cy="40" r="10" fill="#e11d48" />
      </svg>
      <label className="text-xs font-black text-[#1C01A5]">
        Geser teropong
        <input
          type="range"
          min={0}
          max={900}
          step={100}
          value={jendela}
          onChange={(e) => setJendela(Number(e.target.value))}
          className="igil-geser mt-1 w-full"
        />
      </label>
      <div className="rounded-xl bg-yellow-50 px-2 py-2">
        <p className="text-center text-xs font-black text-amber-900">
          Jendela {jendela}–{jendela + 100}
        </p>
        <svg viewBox="0 0 1000 80" className="h-20 w-full">
          <line x1="30" y1="36" x2="970" y2="36" stroke="#a16207" strokeWidth="4" />
          {Array.from({ length: 11 }, (_, i) => {
            const nilai = jendela + i * 10;
            const sembunyi = tersembunyi && nilai === 640;
            return (
              <g key={nilai}>
                <line x1={30 + i * 94} y1="24" x2={30 + i * 94} y2="48" stroke="#a16207" strokeWidth="3" />
                <text x={30 + i * 94} y="70" textAnchor="middle" fontSize="22" fontWeight="800" fill={sembunyi ? "#e11d48" : "#1C01A5"}>
                  {sembunyi ? "?" : nilai}
                </text>
              </g>
            );
          })}
          {posisi >= jendela && posisi <= jendela + 100 ? (
            <circle cx={30 + ((posisi - jendela) / 100) * 940} cy="36" r="12" fill="#e11d48" />
          ) : null}
        </svg>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <TombolBulat anak="Lompat +100" warna="bg-[#1C01A5]" onClick={() => lompat(100)} />
        <TombolBulat anak="Lompat +10" warna="bg-emerald-600" onClick={() => lompat(10)} />
        <TombolBulat anak="Lompat +1" warna="bg-orange-500" onClick={() => lompat(1)} />
        <button
          type="button"
          onClick={() => {
            setTebak(true);
            setJendela(600);
            setPosisi(630);
          }}
          className="inline-flex min-h-12 items-center rounded-2xl bg-rose-500 px-3 text-sm font-black text-white"
        >
          Mode Tebak Titik
        </button>
      </div>
      {tebak ? (
        <div>
          <p className="mb-1 text-center text-sm font-bold text-slate-700">Di antara 630 dan 650, angka yang hilang berapa?</p>
          <KanvasJawab
            kunci="tebak-640"
            expected="640"
            label="Tulis angka yang hilang"
            mode="angka"
            disabled={tebakOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? "640 tepat! Di antara 630 dan 650." : "Hitung 10 langkah dari 630.",
                benar,
                terbaca,
                expected: "640",
              });
              if (benar) setTebakOk(true);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function ModeTimbangan({ kirimEvent }: { kirimEvent: Kirim }) {
  const pasangan = [
    { kiri: 589, kanan: 612 },
    { kiri: 742, kanan: 748 },
  ];
  const [indeks, setIndeks] = useState(0);
  const [langkah, setLangkah] = useState(0);
  const [tandaOk, setTandaOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const { kiri, kanan } = pasangan[indeks];
  const tanda = kiri < kanan ? "<" : kiri > kanan ? ">" : "=";
  const sorot: "r" | "p" | "s" | null = langkah === 1 ? "r" : langkah === 2 ? "p" : langkah === 3 ? "s" : null;

  const cekLangkah = () => {
    const bedaRatus = Math.floor(kiri / 100) !== Math.floor(kanan / 100);
    if (langkah === 0) {
      setLangkah(1);
      if (bedaRatus && kiri === 589 && kanan === 612) {
        kirimEvent("THREE_DIGIT_TRAP_CHECK", {
          pesan:
            "Jangan terkecoh angka 8 dan 9 pada 589! Kita cek Ratusannya dulu: 612 punya 6 lempeng ratusan, sedangkan 589 baru 5 lempeng ratusan. Jadi 589 kurang dari 612!",
        });
        setLangkah(4);
      }
      return;
    }
    if (langkah === 1) {
      if (bedaRatus) setLangkah(4);
      else setLangkah(2);
      return;
    }
    if (langkah === 2) {
      const bedaPuluh = Math.floor((kiri % 100) / 10) !== Math.floor((kanan % 100) / 10);
      setLangkah(bedaPuluh ? 4 : 3);
      return;
    }
    setLangkah(4);
  };

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [
      kiri < kanan ? "kurang dari" : "lebih besar",
      kiri < kanan ? "lebih kecil" : "lebih dari",
      baca(kiri < kanan ? kanan : kiri),
      `${baca(kiri)} ${kiri < kanan ? "kurang dari" : "lebih besar dari"} ${baca(kanan)}`,
    ]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Kalimat perbandingannya tepat!" : `Coba: ${baca(kiri)} ${kiri < kanan ? "kurang dari" : "lebih besar dari"} ${baca(kanan)}.`,
      benar: ok,
      transkrip: teks,
    });
    if (ok) setSuaraOk(true);
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-center gap-2">
        {pasangan.map((item, i) => (
          <button
            key={item.kiri}
            type="button"
            onClick={() => {
              setIndeks(i);
              setLangkah(0);
              setTandaOk(false);
              setSuaraOk(false);
            }}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
              indeks === i ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
            }`}
          >
            {item.kiri} vs {item.kanan}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div className="text-center">
          <p className="text-3xl font-black text-[#1C01A5]">{kiri}</p>
          <BalokBilangan n={kiri} sorot={sorot} />
        </div>
        <div className="w-28 self-center">
          <p className="mb-1 text-center text-3xl font-black text-rose-600">{langkah >= 4 ? tanda : "?"}</p>
          <KanvasJawab
            kunci={`${kiri}-${kanan}`}
            expected={tanda}
            label="Tulis tanda"
            mode="tanda"
            disabled={tandaOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? `Tanda ${tanda} tepat.` : `Tulis ${tanda}.`,
                benar,
                terbaca,
              });
              if (benar) setTandaOk(true);
            }}
          />
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-[#1C01A5]">{kanan}</p>
          <BalokBilangan n={kanan} sorot={sorot} />
        </div>
      </div>
      <button
        type="button"
        onClick={cekLangkah}
        className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-amber-400 px-3 text-sm font-black text-amber-950"
      >
        Cek Langkah demi Langkah (Mulai dari Ratusan)
      </button>
      {langkah >= 4 ? (
        <p className="text-center text-sm font-black text-emerald-800">
          {kiri} {tanda} {kanan}
        </p>
      ) : null}
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        onUji={() => {
          setSuaraOk(true);
          kirimEvent("VOICE_ANSWERED", { pesan: "Kalimat perbandingannya tepat!", benar: true });
        }}
        labelUji={kiri < kanan ? "kurang dari" : "lebih besar"}
      />
      {suaraOk ? <p className="text-xs font-bold text-emerald-800">Suara tepat!</p> : null}
    </div>
  );
}

function ModeKuis({ kirimEvent }: { kirimEvent: Kirim }) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const selesai = useRef(false);
  const soal = [
    {
      judul: "Jebakan nol tengah",
      petunjuk: "4 lempeng, kamar puluhan kosong, 8 kubus. Tulis angkanya, lalu ucapkan.",
      expected: "408",
      suara: ["empat ratus delapan"],
      butuhSuara: true,
    },
    {
      judul: "Teropong garis bilangan",
      petunjuk: "700, 710, 720, kotak kosong, 740. Tulis angka yang hilang.",
      expected: "730",
      suara: [],
      butuhSuara: false,
    },
    {
      judul: "Bandingkan dua bilangan",
      petunjuk: "Tulis tanda > atau lingkari 815. Lalu ucapkan nama bilangan yang lebih besar.",
      expected: ">",
      suara: ["delapan ratus lima belas"],
      butuhSuara: true,
    },
  ] as const;
  const aktif = soal[nomor];
  const bolehLanjut = tulisOk && (!aktif.butuhSuara || suaraOk);

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [...aktif.suara]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${aktif.suara[0]}.`,
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });

  const lanjut = () => {
    kirimEvent("QUIZ_ANSWERED", { pesan: `Tantangan ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 2) {
      if (!selesai.current) {
        selesai.current = true;
        kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan selesai. Hebat!" });
      }
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">
        Tantangan {nomor + 1} dari 3 · {aktif.judul}
      </p>
      <p className="text-sm font-bold text-slate-700">{aktif.petunjuk}</p>
      {nomor === 0 ? (
        <div className="flex flex-wrap items-end justify-center gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Lempeng key={i} />
          ))}
          <span className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-500">0 puluhan</span>
          {Array.from({ length: 8 }, (_, i) => (
            <KubusKecil key={i} />
          ))}
        </div>
      ) : null}
      {nomor === 1 ? (
        <p className="text-center text-2xl font-black text-[#1C01A5]">700 · 710 · 720 · ? · 740</p>
      ) : null}
      {nomor === 2 ? (
        <p className="text-center text-4xl font-black text-[#1C01A5]">815 &nbsp; ? &nbsp; 799</p>
      ) : null}
      <KanvasJawab
        kunci={`kuis-${nomor}`}
        expected={aktif.expected}
        label={nomor === 2 ? "Tulis > atau lingkari 815" : "Tulis jawaban"}
        mode={nomor === 2 ? "tanda" : "angka"}
        terimaLingkar={nomor === 2}
        disabled={tulisOk}
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? "Coretan tepat!" : `Jawaban ${aktif.expected}.`,
            benar,
            terbaca,
            expected: aktif.expected,
          });
          if (benar) setTulisOk(true);
        }}
      />
      {aktif.butuhSuara ? (
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          onUji={() => {
            setSuaraOk(true);
            kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: nomor + 1 });
          }}
          labelUji={aktif.suara[0]}
        />
      ) : null}
      {bolehLanjut ? (
        <button
          type="button"
          onClick={lanjut}
          className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white"
        >
          {nomor >= 2 ? "Kuis selesai" : "Tantangan berikutnya"}
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
      judul: "Susun dari yang diacak",
      teks: "Suatu bilangan terdiri dari 5 Satuan, 8 Ratusan, dan 0 Puluhan.",
      expected: "805",
      mode: "angka" as const,
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
    },
    {
      judul: "Bacakan angkanya",
      teks: "Ucapkan nama bilangan ini.",
      expected: "690",
      mode: "angka" as const,
      suara: ["enam ratus sembilan puluh"],
      butuhTulis: false,
      butuhSuara: true,
    },
    {
      judul: "Puluhan lebih dari 10",
      teks: "3 lempeng ratusan dan 12 batang puluhan. Berapa jumlahnya?",
      expected: "420",
      mode: "angka" as const,
      suara: [],
      butuhTulis: true,
      butuhSuara: false,
    },
    {
      judul: "Bilangan paling kecil",
      teks: "Kartu 7, 2, dan 9. Susun bilangan tiga angka paling kecil.",
      expected: "279",
      mode: "angka" as const,
      suara: [],
      butuhTulis: true,
      butuhSuara: false,
    },
    {
      judul: "Menuju 1.000",
      teks: "Ada 9 lempeng ratusan. Tambah berapa supaya genap 1.000?",
      expected: "100",
      mode: "angka" as const,
      suara: ["seratus", "satu ratus", "satu ratusan", "100"],
      butuhTulis: true,
      butuhSuara: true,
    },
  ];
  const aktif = soal[nomor];
  const tulisSiap = !aktif.butuhTulis || tulisOk;
  const suaraSiap = !aktif.butuhSuara || suaraOk;
  const bolehLanjut = nomor === 4 ? tulisOk || suaraOk : tulisSiap && suaraSiap;

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, aktif.suara);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${aktif.suara[0]}.`,
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });

  const lanjut = () => {
    kirimEvent("EVAL_ANSWERED", { pesan: `Soal ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 4) {
      onLulus("Evaluasi bilangan sampai 1.000 selesai. Kamu arsitek angka yang teliti!");
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">
        Soal {nomor + 1} dari 5 · {aktif.judul}
      </p>
      <p className="text-sm font-bold text-slate-700">{aktif.teks}</p>
      {nomor === 1 ? <p className="text-center text-6xl font-black text-[#1C01A5]">690</p> : null}
      {nomor === 2 ? (
        <div className="flex flex-wrap items-end justify-center gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <Lempeng key={i} />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <Batang key={i} />
          ))}
        </div>
      ) : null}
      {nomor === 3 ? (
        <div className="flex justify-center gap-2">
          {["7", "2", "9"].map((kartu) => (
            <span key={kartu} className="inline-flex h-16 w-14 items-center justify-center rounded-xl bg-amber-300 text-3xl font-black text-amber-950">
              {kartu}
            </span>
          ))}
        </div>
      ) : null}
      {nomor === 4 ? (
        <div className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: 9 }, (_, i) => (
            <Lempeng key={i} />
          ))}
        </div>
      ) : null}
      {aktif.butuhTulis ? (
        <KanvasJawab
          kunci={`eval-${nomor}`}
          expected={aktif.expected}
          label="Tulis jawaban"
          mode="angka"
          disabled={tulisOk}
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${aktif.expected} tepat.` : `Jawaban ${aktif.expected}.`,
              benar,
              terbaca,
              expected: aktif.expected,
            });
            if (benar) setTulisOk(true);
          }}
        />
      ) : null}
      {aktif.butuhSuara ? (
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          onUji={() => {
            setSuaraOk(true);
            kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: nomor + 1 });
          }}
          labelUji={aktif.suara[0]}
        />
      ) : null}
      {bolehLanjut ? (
        <button
          type="button"
          onClick={lanjut}
          className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white"
        >
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

export default function SimulasiMtk3Bab1({
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
  const [tab, setTab] = useState<TabLab>("pabrik");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanIgil, setPesanIgil] = useState("Halo arsitek cilik! Yuk susun balok sampai seribu.");
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
      pesan: "Halo arsitek cilik! Yuk susun balok sampai seribu.",
      adegan: "pabrik",
    });
  }, [kirimEvent]);

  useEffect(() => () => hentikanSuaraGuruIgil(), []);

  const pembuka: Record<TabLab, string> = {
    pabrik: "Tambah baloknya. Sepuluh satuan menyatu jadi satu puluhan. Sepuluh puluhan jadi satu lempeng ratusan.",
    teropong: "Geser teropong ke ratusan yang kamu cari. Lalu lompat seratus, sepuluh, atau satu.",
    timbangan: "Cek ratusan dulu. Jangan terkecoh puluhan yang kelihatan besar.",
    kuis: "Tiga tantangan. Nol di tengah, angka hilang, lalu bandingkan.",
    evaluasi: "Lima soal juara. Tulis atau ucapkan jawabannya.",
  };

  const gantiTab = (id: TabLab) => {
    setTab(id);
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="flex h-[min(740px,calc(100dvh-10rem))] min-h-[32rem] flex-col overflow-hidden bg-[#FFFDF8]">
      <style>{`
        @keyframes igil-nyatu {
          0% { transform: scale(1); }
          40% { transform: scale(1.2); }
          100% { transform: scale(0.2); opacity: 0.2; }
        }
        @keyframes igil-emas {
          0% { transform: scale(0.4); }
          100% { transform: scale(1); }
        }
        @keyframes igil-angguk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .igil-nyatu { animation: igil-nyatu 0.65s ease-in forwards; }
        .igil-emas { animation: igil-emas 0.6s ease-out; }
        .igil-angguk { animation: igil-angguk 0.6s ease-in-out infinite; }
        .igil-geser { height: 48px; accent-color: #1C01A5; }
      `}</style>
      <div className="flex items-center justify-between gap-2 bg-[#1C01A5] px-3 py-2 text-white">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200">Lab IGIL · Matematika {kelas}</p>
          <h2 className="text-lg font-black leading-tight">Bilangan Cacah sampai 1.000</h2>
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
        {tab === "pabrik" ? <ModePabrik kirimEvent={kirimEvent} /> : null}
        {tab === "teropong" ? <ModeTeropong kirimEvent={kirimEvent} /> : null}
        {tab === "timbangan" ? <ModeTimbangan kirimEvent={kirimEvent} /> : null}
        {tab === "kuis" ? <ModeKuis kirimEvent={kirimEvent} /> : null}
        {tab === "evaluasi" ? <ModeEvaluasi kirimEvent={kirimEvent} onLulus={tandaiSelesai} /> : null}
      </div>
      <ArsitekIgil pesan={pesanIgil} bicara={bicara} onUlang={() => ucapkan(pesanIgil)} />
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
