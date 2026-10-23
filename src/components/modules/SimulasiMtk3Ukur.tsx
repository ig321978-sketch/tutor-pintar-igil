"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KelaminGuru } from "@/lib/guru";
import { hentikanSuaraGuruIgil, ucapkanGuruIgil } from "@/lib/suara-guru-igil";
import { KuisLima, PitaSuaraIgil, KUIS_MTK3_UKUR } from "./KuisLimaSimulasi";

export type TutorEventType =
  | "SCENE_START"
  | "ZERO_ALIGNMENT_WARNING"
  | "BROKEN_RULER_ACTIVE"
  | "ONE_KG_EQUIVALENCE"
  | "WEIGHTS_SUMMED"
  | "HANDWRITING_CHECKED"
  | "VOICE_ANSWERED"
  | "CHOICE_ANSWERED"
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

type TabLab = "penggaris" | "timbangan" | "konversi" | "kuis";
type Titik = { x: number; y: number };
type Kirim = (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "penggaris", label: "Penggaris" },
  { id: "timbangan", label: "Timbangan" },
  { id: "konversi", label: "Konversi" },
  { id: "kuis", label: "Kuis" },
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

const BENDA_PANJANG = [
  { nama: "Pensil", cm: 12, mm: 0 },
  { nama: "Kunci pas", cm: 8, mm: 5 },
  { nama: "Kuat cat", cm: 14, mm: 0 },
] as const;

const BENDA_BERAT = [
  { nama: "Sisir pisang", gram: 500 },
  { nama: "Karung beras", gram: 1000 },
  { nama: "Semangka", gram: 1500 },
  { nama: "Kotak paket", gram: 800 },
] as const;

const ANAK_TIMBANGAN = [
  { id: "kg", label: "1 kg", gram: 1000 },
  { id: "g500", label: "500 g", gram: 500 },
  { id: "g200", label: "200 g", gram: 200 },
  { id: "g100", label: "100 g", gram: 100 },
] as const;

function jamSekarang(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function titik(n: number): string {
  return n.toLocaleString("id-ID");
}

function baca(n: number): string {
  if (n === 0) return "nol";
  if (n < 10) return NAMA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${NAMA[n - 10]} belas`;
  if (n < 100) {
    const puluh = Math.floor(n / 10);
    const sisa = n % 10;
    return sisa ? `${NAMA[puluh]} puluh ${NAMA[sisa]}` : `${NAMA[puluh]} puluh`;
  }
  if (n === 100) return "seratus";
  if (n < 200) return n === 100 ? "seratus" : `seratus ${baca(n - 100)}`;
  if (n < 1000) {
    const ratus = Math.floor(n / 100);
    const sisa = n % 100;
    const kepala = `${NAMA[ratus]} ratus`;
    return sisa ? `${kepala} ${baca(sisa)}` : kepala;
  }
  if (n === 1000) return "seribu";
  if (n < 2000) return `seribu ${baca(n - 1000)}`;
  return String(n);
}

function aliasBilangan(n: number): string[] {
  return [baca(n), String(n), titik(n)];
}

function normalisasiSuara(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const utuh = normalisasiSuara(teks);
  const rapat = utuh.replace(/\s/g, "");
  if (!rapat) return false;
  return alias.some((item) => {
    const a = normalisasiSuara(item);
    return utuh.includes(a) || rapat === a.replace(/\s/g, "");
  });
}

function kataUtuh(teks: string, kata: string): boolean {
  return normalisasiSuara(teks).split(" ").includes(kata);
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
        className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black text-white ${
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
    const induk = kanvas.parentElement;
    if (!induk) return;
    const lebar = Math.max(induk.clientWidth, 72);
    const tinggi = 72;
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
  }, [siapkan, kunci]);

  const titikDari = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kanvas = canvasRef.current;
    if (!kanvas) return { x: 0, y: 0 };
    const kotak = kanvas.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
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

function PenggarisPita({
  awal,
  panjang,
  patah,
  plastik,
}: {
  awal: number;
  panjang: number;
  patah: boolean;
  plastik: boolean;
}) {
  const akhir = awal + panjang;
  return (
    <div className="rounded-2xl bg-amber-50 p-2">
      <div className="relative h-24">
        {plastik ? (
          <div className="absolute top-8 bottom-2 left-0 w-8 rounded-l-xl bg-rose-200" />
        ) : null}
        <div className="absolute top-8 right-0 left-8 h-12 overflow-hidden rounded-xl border-2 border-slate-400 bg-white/80">
          {Array.from({ length: 21 }, (_, cm) => (
            <span
              key={cm}
              className="absolute top-0 h-full border-l border-slate-500"
              style={{ left: `${(cm / 20) * 100}%` }}
            >
              <span className={`absolute top-0 text-[9px] font-black ${patah && cm < 3 ? "text-rose-400 line-through" : "text-slate-600"}`}>
                {cm}
              </span>
            </span>
          ))}
          <div
            className="absolute top-4 h-6 rounded-md bg-sky-500/80"
            style={{
              left: `${(Math.max(0, awal) / 20) * 100}%`,
              width: `${(panjang / 20) * 100}%`,
            }}
          />
        </div>
        {patah ? (
          <p className="absolute top-0 left-10 text-xs font-black text-rose-700">11 − 3 = 8 cm</p>
        ) : (
          <p className="absolute top-0 left-10 text-xs font-black text-[#1C01A5]">
            Pangkal {awal < 0 ? "di plastik" : `${awal} cm`} · ujung {akhir} cm
          </p>
        )}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <div className="flex h-14 w-28 items-end justify-between rounded-xl border-2 border-indigo-400 bg-white px-1">
          {Array.from({ length: 11 }, (_, mm) => (
            <span
              key={mm}
              className={`w-0.5 ${mm % 5 === 0 ? "h-8 bg-indigo-700" : "h-4 bg-indigo-300"}`}
            />
          ))}
        </div>
        <p className="text-xs font-black text-indigo-800">Lensa: 1 cm = 10 mm</p>
      </div>
    </div>
  );
}

function JarumTimbangan({ gram }: { gram: number }) {
  const sudut = -120 + (Math.max(0, Math.min(2000, gram)) / 2000) * 240;
  return (
    <div className="mx-auto w-44">
      <svg viewBox="0 0 120 100" className="h-36 w-full" aria-hidden>
        <path d="M18 78 A48 48 0 1 1 102 78" fill="none" stroke="#1C01A5" strokeWidth="8" />
        {[0, 500, 1000, 1500, 2000].map((nilai) => {
          const derajat = (-120 + (nilai / 2000) * 240) * (Math.PI / 180);
          const x = 60 + Math.sin(derajat) * 38;
          const y = 62 - Math.cos(derajat) * 38;
          return (
            <text key={nilai} x={x} y={y} textAnchor="middle" fontSize="8" fontWeight="800" fill="#1C01A5">
              {nilai === 0 ? "0" : nilai >= 1000 ? titik(nilai) : String(nilai)}
            </text>
          );
        })}
        <line
          x1="60"
          y1="62"
          x2="60"
          y2="28"
          stroke="#e11d48"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${sudut} 60 62)`}
        />
        <circle cx="60" cy="62" r="4" fill="#1e293b" />
      </svg>
    </div>
  );
}

function InsinyurIgil({ pesan, bicara, onUlang }: { pesan: string; bicara: boolean; onUlang: () => void }) {
  return (
    <div className="flex items-end gap-2 border-t border-amber-200 bg-amber-50 px-2 py-2">
      <span aria-hidden className={`select-none text-7xl leading-none ${bicara ? "igil-angguk" : ""}`}>
        🦉
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-black uppercase text-amber-800">Insinyur IGIL</p>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{pesan}</p>
      </div>
      <button
        type="button"
        onClick={onUlang}
        aria-label="Putar suara Insinyur IGIL"
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-[#1C01A5] text-lg font-black text-white"
      >
        ▶
      </button>
    </div>
  );
}

function ModePenggaris({ kirimEvent }: { kirimEvent: Kirim }) {
  const [indeks, setIndeks] = useState(0);
  const [offset, setOffset] = useState(0);
  const [patah, setPatah] = useState(false);
  const burukSebelum = useRef(false);
  const benda = BENDA_PANJANG[indeks];
  const awal = patah ? 3 : offset;
  const panjangCm = patah ? 8 : benda.cm;
  const mm = patah ? 0 : benda.mm;

  const geser = (nilai: number) => {
    const aman = Math.max(-1, Math.min(6, nilai));
    setOffset(aman);
    setPatah(false);
    const buruk = aman < 0;
    if (buruk && !burukSebelum.current) {
      kirimEvent("ZERO_ALIGNMENT_WARNING", {
        pesan: "Hati-hati! Pangkal bendanya harus pas di garis angka 0, bukan di pinggir plastik penggaris ya!",
        offset: aman,
      });
    }
    burukSebelum.current = buruk;
  };

  const aktifkanPatah = () => {
    setPatah(true);
    burukSebelum.current = false;
    kirimEvent("BROKEN_RULER_ACTIVE", {
      pesan: "Penggaris ini patah dan mulai dari angka 3 cm sampai 11 cm! Hitung selisih langkahnya: 11 dikurangi 3 sama dengan 8 cm!",
      start: 3,
      end: 11,
      length: 8,
    });
  };

  const ucapan = mm ? `${baca(panjangCm)} sentimeter ${baca(mm)} milimeter` : `${baca(panjangCm)} sentimeter`;
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [ucapan, `${panjangCm}`, baca(panjangCm), `${panjangCm} cm`]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${ucapan}.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Bengkel Penggaris dan Lensa Milimeter</h3>
      <div className="flex flex-wrap gap-2">
        {BENDA_PANJANG.map((item, i) => (
          <button
            key={item.nama}
            type="button"
            onClick={() => {
              setIndeks(i);
              setPatah(false);
            }}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
              indeks === i && !patah ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
            }`}
          >
            {item.nama} {item.mm ? `${item.cm} cm ${item.mm} mm` : `${item.cm} cm`}
          </button>
        ))}
      </div>
      <PenggarisPita awal={awal} panjang={panjangCm + mm / 10} patah={patah} plastik={!patah && offset < 0} />
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => geser(-1)} className="inline-flex min-h-12 items-center rounded-2xl bg-rose-600 px-3 text-xs font-black text-white">
          Pinggir plastik
        </button>
        <button type="button" onClick={() => geser(0)} className="inline-flex min-h-12 items-center rounded-2xl bg-emerald-600 px-3 text-xs font-black text-white">
          Pas di angka 0
        </button>
        <button type="button" onClick={aktifkanPatah} className="inline-flex min-h-12 items-center rounded-2xl bg-amber-500 px-3 text-xs font-black text-amber-950">
          Penggaris patah
        </button>
      </div>
      <label className="text-xs font-black text-[#1C01A5]">
        Geser penggaris
        <input
          type="range"
          min={-1}
          max={6}
          step={1}
          value={patah ? 3 : offset}
          onChange={(event) => geser(Number(event.target.value))}
          className="igil-geser mt-1 w-full"
        />
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <KanvasJawab
          kunci={`garis-${patah ? "patah" : indeks}`}
          expected={String(panjangCm)}
          label="Tulis cm"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${panjangCm} cm tepat.` : `Panjangnya ${panjangCm} cm.`,
              benar,
              terbaca,
              expected: String(panjangCm),
            });
          }}
        />
        {mm > 0 ? (
          <KanvasJawab
            kunci={`mm-${indeks}`}
            expected={String(mm)}
            label="Tulis mm"
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? `${mm} mm tepat.` : `Sisa milimeternya ${mm}.`,
                benar,
                terbaca,
                expected: String(mm),
              });
            }}
          />
        ) : null}
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={ucapan}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true })}
      />
    </div>
  );
}

function ModeTimbangan({ kirimEvent }: { kirimEvent: Kirim }) {
  const [indeks, setIndeks] = useState(0);
  const [terpilih, setTerpilih] = useState<string[]>([]);
  const sudahKilo = useRef(false);
  const sudahJumlah = useRef("");
  const benda = BENDA_BERAT[indeks];
  const jumlah = ANAK_TIMBANGAN.filter((item) => terpilih.includes(item.id)).reduce((total, item) => total + item.gram, 0);
  const seimbang = jumlah === benda.gram && terpilih.length > 0;

  const pilihBenda = (baru: number) => {
    setIndeks(baru);
    setTerpilih([]);
    sudahJumlah.current = "";
    const gram = BENDA_BERAT[baru].gram;
    if (gram === 1000 && !sudahKilo.current) {
      sudahKilo.current = true;
      kirimEvent("ONE_KG_EQUIVALENCE", {
        pesan: "Lihat jarumnya menunjuk 1.000 gram! 1.000 gram itu sama beratnya dengan 1 kilogram (1 kg)!",
        gram: 1000,
      });
    }
  };

  const ketuk = (id: string) => {
    const berikutnya = terpilih.includes(id) ? terpilih.filter((item) => item !== id) : [...terpilih, id];
    setTerpilih(berikutnya);
    const daftar = ANAK_TIMBANGAN.filter((item) => berikutnya.includes(item.id));
    const total = daftar.reduce((jumlahGram, item) => jumlahGram + item.gram, 0);
    const kunci = daftar.map((item) => item.id).join("+");
    if (total === benda.gram && daftar.length > 0 && sudahJumlah.current !== kunci) {
      sudahJumlah.current = kunci;
      const weightsList = daftar.map((item) => item.label).join(" dan ");
      kirimEvent("WEIGHTS_SUMMED", {
        pesan: `Hebat! Kamu menggabungkan anak timbangan ${weightsList} sehingga jumlahnya pas ${titik(total)} gram!`,
        weightsList,
        totalGrams: total,
      });
    }
  };

  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, [...aliasBilangan(benda.gram), `${benda.gram} gram`, baca(benda.gram)]);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${titik(benda.gram)} gram.`,
      benar: ok,
      transkrip: teks,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Timbangan Jarum dan Anak Timbangan</h3>
      <div className="flex flex-wrap gap-2">
        {BENDA_BERAT.map((item, i) => (
          <button
            key={item.nama}
            type="button"
            onClick={() => pilihBenda(i)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
              indeks === i ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
            }`}
          >
            {item.nama}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-amber-50 p-2 text-center">
          <p className="text-xs font-black text-amber-800">Timbangan jarum</p>
          <JarumTimbangan gram={benda.gram} />
          <p className="text-sm font-black text-[#1C01A5]">{titik(benda.gram)} g</p>
        </div>
        <div className={`rounded-2xl p-2 ${seimbang ? "bg-emerald-50" : "bg-sky-50"}`}>
          <p className="text-center text-xs font-black text-sky-800">
            {seimbang ? "Seimbang lurus" : `Anak timbangan ${titik(jumlah)} g`}
          </p>
          <div className="mt-2 flex min-h-16 items-end justify-center gap-1">
            <div className="rounded-xl bg-amber-300 px-2 py-3 text-center text-xs font-black text-amber-950">{benda.nama}</div>
            {ANAK_TIMBANGAN.filter((item) => terpilih.includes(item.id)).map((item) => (
              <div key={item.id} className="rounded-lg bg-slate-700 px-2 py-3 text-xs font-black text-white">
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {ANAK_TIMBANGAN.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => ketuk(item.id)}
            className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-sm font-black ${
              terpilih.includes(item.id) ? "bg-slate-800 text-white" : "bg-white text-slate-800 ring-2 ring-slate-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <KanvasJawab
          kunci={`gram-${indeks}`}
          expected={String(benda.gram)}
          label="Tulis gram"
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${titik(benda.gram)} g tepat.` : `Beratnya ${titik(benda.gram)} g.`,
              benar,
              terbaca,
              expected: String(benda.gram),
            });
          }}
        />
        {benda.gram % 1000 === 0 ? (
          <KanvasJawab
            kunci={`kg-${indeks}`}
            expected={String(benda.gram / 1000)}
            label="Tulis kg"
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", {
                pesan: benar ? `${benda.gram / 1000} kg tepat.` : `Itu ${benda.gram / 1000} kg.`,
                benar,
                terbaca,
                expected: String(benda.gram / 1000),
              });
            }}
          />
        ) : null}
      </div>
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={`${titik(benda.gram)} gram`}
        onUji={() => kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true })}
      />
    </div>
  );
}

function ModeKonversi({ kirimEvent }: { kirimEvent: Kirim }) {
  const [sisi, setSisi] = useState<"panjang" | "berat">("panjang");
  const [meter, setMeter] = useState(2);
  const [cm, setCm] = useState(45);
  const [kg, setKg] = useState(1);
  const [gram, setGram] = useState(300);
  const [urai, setUrai] = useState(false);
  const [zoomMm, setZoomMm] = useState(false);
  const [kantong, setKantong] = useState<"100" | "500">("100");
  const [alat, setAlat] = useState(0);
  const alatSoal = [
    { benda: "pintu", jawaban: "meteran", alias: ["meteran"] },
    { benda: "buku", jawaban: "penggaris", alias: ["penggaris"] },
    { benda: "tepung", jawaban: "timbangan", alias: ["timbangan"] },
  ][alat];
  const cmTotal = meter * 100 + cm;
  const gramTotal = kg * 1000 + gram;
  const expected = sisi === "panjang" ? String(cmTotal) : String(gramTotal);

  const mic = useMic((teks) => {
    const angkaOk = cocokSuara(teks, aliasBilangan(sisi === "panjang" ? cmTotal : gramTotal));
    const alatOk = cocokSuara(teks, alatSoal.alias);
    const ok = angkaOk || alatOk;
    kirimEvent("VOICE_ANSWERED", {
      pesan: alatOk
        ? `${alatSoal.benda} diukur dengan ${alatSoal.jawaban}.`
        : angkaOk
          ? "Angka konversi tepat!"
          : `Coba sebut ${expected} atau ${alatSoal.jawaban}.`,
      benar: ok,
      transkrip: teks,
    });
    if (alatOk) setAlat((n) => (n + 1) % 3);
  });

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-black text-[#1C01A5]">Konverter Pita Meteran dan Kantong Berat</h3>
      <div className="flex gap-2">
        <button type="button" onClick={() => setSisi("panjang")} className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl text-sm font-black ${sisi === "panjang" ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"}`}>
          Panjang
        </button>
        <button type="button" onClick={() => setSisi("berat")} className={`inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl text-sm font-black ${sisi === "berat" ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"}`}>
          Berat
        </button>
      </div>
      {sisi === "panjang" ? (
        <>
          <button type="button" onClick={() => setUrai((v) => !v)} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sky-600 px-3 text-sm font-black text-white">
            {urai ? "Satukan lagi 1 m" : "Urai 1 m jadi 100 cm"}
          </button>
          <div className={`h-12 rounded-xl ${urai ? "grid grid-cols-10 gap-0.5 bg-sky-100 p-1" : "bg-sky-600"}`}>
            {urai
              ? Array.from({ length: 10 }, (_, i) => (
                  <button key={i} type="button" onClick={() => setZoomMm(true)} className="min-h-8 rounded bg-sky-500 text-[10px] font-black text-white">
                    10
                  </button>
                ))
              : <span className="flex h-full items-center justify-center text-lg font-black text-white">1 m</span>}
          </div>
          {zoomMm ? (
            <div className="flex h-10 items-end justify-between rounded-xl bg-indigo-50 px-2">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} className={`w-0.5 ${i % 5 === 0 ? "h-8 bg-indigo-700" : "h-4 bg-indigo-300"}`} />
              ))}
            </div>
          ) : null}
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {meter} m {cm} cm = {meter * 100} cm + {cm} cm = {cmTotal} cm
          </p>
          <label className="text-xs font-black text-[#1C01A5]">
            Meter {meter}
            <input type="range" min={0} max={3} value={meter} onChange={(event) => setMeter(Number(event.target.value))} className="igil-geser w-full" />
          </label>
          <label className="text-xs font-black text-[#1C01A5]">
            Sentimeter {cm}
            <input type="range" min={0} max={99} value={cm} onChange={(event) => setCm(Number(event.target.value))} className="igil-geser w-full" />
          </label>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            <button type="button" onClick={() => { setUrai(true); setKantong("100"); }} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-amber-500 px-2 text-xs font-black text-amber-950">
              10 kantong 100 g
            </button>
            <button type="button" onClick={() => { setUrai(true); setKantong("500"); }} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-amber-700 px-2 text-xs font-black text-white">
              2 kantong 500 g
            </button>
          </div>
          <div className="flex min-h-14 items-center justify-center gap-1 rounded-xl bg-amber-100 p-2">
            {urai ? (
              Array.from({ length: kantong === "100" ? 10 : 2 }, (_, i) => (
                <span key={i} className="inline-flex h-12 min-w-8 items-center justify-center rounded-lg bg-amber-400 text-[10px] font-black text-amber-950">
                  {kantong}
                </span>
              ))
            ) : (
              <span className="text-lg font-black text-amber-900">Batu 1 kg</span>
            )}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {kg} kg {gram} g = {titik(kg * 1000)} g + {gram} g = {titik(gramTotal)} g
          </p>
          <label className="text-xs font-black text-[#1C01A5]">
            Kilogram {kg}
            <input type="range" min={0} max={3} value={kg} onChange={(event) => setKg(Number(event.target.value))} className="igil-geser w-full" />
          </label>
          <label className="text-xs font-black text-[#1C01A5]">
            Gram {gram}
            <input type="range" min={0} max={900} step={100} value={gram} onChange={(event) => setGram(Number(event.target.value))} className="igil-geser w-full" />
          </label>
        </>
      )}
      <p className="text-sm font-bold text-slate-700">{alatSoal.benda} diukur dengan alat apa?</p>
      <KanvasJawab
        kunci={`konversi-${sisi}-${expected}`}
        expected={expected}
        label={sisi === "panjang" ? "Tulis cm" : "Tulis gram"}
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? `${titik(Number(expected))} tepat.` : `Hasilnya ${titik(Number(expected))}.`,
            benar,
            terbaca,
            expected,
          });
        }}
      />
      <TombolMikrofon
        menyimak={mic.menyimak}
        onMulai={mic.mulai}
        labelUji={alatSoal.jawaban}
        onUji={() => {
          kirimEvent("VOICE_ANSWERED", { pesan: `${alatSoal.benda} diukur dengan ${alatSoal.jawaban}.`, benar: true });
          setAlat((n) => (n + 1) % 3);
        }}
      />
    </div>
  );
}

function ModeKuis({ kirimEvent }: { kirimEvent: Kirim }) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const soal = [
    {
      judul: "Penggaris patah",
      teks: "Pensil mulai di angka 2 cm dan ujungnya di angka 9 cm.",
      expected: "7",
      suara: ["tujuh sentimeter", "7 sentimeter", "tujuh cm", "tujuh", "7"],
      butuhSuara: true,
    },
    {
      judul: "Jarum timbangan",
      teks: "Jarum menunjuk angka 500 saat menimbang apel.",
      expected: "500",
      suara: [] as string[],
      butuhSuara: false,
    },
    {
      judul: "Meter ke sentimeter",
      teks: "Pita sepanjang 1 m 25 cm. Tulis semuanya dalam cm.",
      expected: "125",
      suara: [] as string[],
      butuhSuara: false,
    },
  ][nomor];
  const bolehLanjut = tulisOk && (!soal.butuhSuara || suaraOk);
  const mic = useMic((teks) => {
    const ok = cocokSuara(teks, soal.suara);
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : `Coba ucapkan ${soal.suara[0]}.`,
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });

  const lanjut = () => {
    kirimEvent("QUIZ_ANSWERED", { pesan: `Tantangan ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 2) {
      kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga tantangan mengukur selesai!" });
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">
        Tantangan {nomor + 1} dari 3 · {soal.judul}
      </p>
      <p className="text-sm font-bold text-slate-700">{soal.teks}</p>
      {nomor === 0 ? <PenggarisPita awal={2} panjang={7} patah={false} plastik={false} /> : null}
      {nomor === 1 ? <JarumTimbangan gram={500} /> : null}
      {nomor === 2 ? <p className="text-center text-2xl font-black text-[#1C01A5]">100 cm + 25 cm</p> : null}
      <KanvasJawab
        kunci={`kuis-${nomor}`}
        expected={soal.expected}
        label="Tulis jawaban"
        disabled={tulisOk}
        onHasil={(benar, terbaca) => {
          kirimEvent("HANDWRITING_CHECKED", {
            pesan: benar ? `${soal.expected} tepat.` : `Jawaban ${soal.expected}.`,
            benar,
            terbaca,
            expected: soal.expected,
            soal: nomor + 1,
          });
          if (benar) setTulisOk(true);
        }}
      />
      {soal.butuhSuara ? (
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          labelUji={soal.suara[0]}
          onUji={() => {
            setSuaraOk(true);
            kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: nomor + 1 });
          }}
        />
      ) : null}
      {bolehLanjut ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 2 ? "Selesai kuis" : "Tantangan berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

function ModeEvaluasi({ kirimEvent, onLulus }: { kirimEvent: Kirim; onLulus: (catatan: string) => void }) {
  const [nomor, setNomor] = useState(0);
  const [tulisOk, setTulisOk] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const [pilihan, setPilihan] = useState("");
  const soal = [
    {
      judul: "Sentimeter dan milimeter",
      teks: "Penghapus 4 cm 5 mm. Berapa mm seluruhnya?",
      expected: "45",
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
      pilihan: false,
    },
    {
      judul: "Satuan pintu",
      teks: "Untuk mengukur tinggi pintu kelas, satuan yang paling tepat: milimeter atau meter?",
      expected: "meter",
      suara: ["meter"],
      butuhTulis: false,
      butuhSuara: true,
      pilihan: false,
    },
    {
      judul: "Anak timbangan",
      teks: "Daging seimbang dengan 1 anak timbangan 1 kg dan 2 anak timbangan 200 g. Berapa gram seluruhnya?",
      expected: "1400",
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
      pilihan: false,
    },
    {
      judul: "Sisa tali",
      teks: "Tali 2 m dipotong 60 cm. Berapa cm sisanya?",
      expected: "140",
      suara: [] as string[],
      butuhTulis: true,
      butuhSuara: false,
      pilihan: false,
    },
    {
      judul: "Kapas dan besi",
      teks: "1 kg kapas dibanding 1.000 g besi. Beratnya bagaimana?",
      expected: "Sama berat",
      suara: ["sama berat"],
      butuhTulis: true,
      butuhSuara: true,
      pilihan: true,
    },
  ][nomor];
  const tulisSiap = !soal.butuhTulis || tulisOk;
  const suaraSiap = !soal.butuhSuara || suaraOk || (soal.pilihan && pilihan === "Sama berat");
  const bolehLanjut = nomor === 4 ? tulisOk || suaraOk || pilihan === "Sama berat" : tulisSiap && suaraSiap;

  const mic = useMic((teks) => {
    const ok = nomor === 1 ? kataUtuh(teks, "meter") : cocokSuara(teks, soal.suara);
    const meterSalah = nomor === 1 && normalisasiSuara(teks).includes("milimeter") && !kataUtuh(teks, "meter");
    kirimEvent("VOICE_ANSWERED", {
      pesan: ok ? "Ucapan tepat!" : meterSalah ? "Milimeter terlalu kecil untuk pintu. Coba meter." : `Coba ucapkan ${soal.suara[0]}.`,
      benar: ok,
      transkrip: teks,
      soal: nomor + 1,
    });
    if (ok) setSuaraOk(true);
  });

  const pilih = (teks: string) => {
    setPilihan(teks);
    const benar = teks === "Sama berat";
    kirimEvent("CHOICE_ANSWERED", {
      pesan: benar ? "Sama berat. 1 kg sama dengan 1.000 g." : "1 kg sama dengan 1.000 g. Kapas dan besi sama berat.",
      benar,
      pilihan: teks,
    });
  };

  const lanjut = () => {
    kirimEvent("EVAL_ANSWERED", { pesan: `Soal ${nomor + 1} selesai.`, soal: nomor + 1, benar: true });
    if (nomor >= 4) {
      onLulus("Evaluasi pengukuran selesai. Kamu insinyur satuan yang teliti!");
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
    setPilihan("");
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-black text-[#1C01A5]">
        Soal {nomor + 1} dari 5 · {soal.judul}
      </p>
      <p className="text-lg font-black leading-snug text-[#1C01A5]">{soal.teks}</p>
      {soal.pilihan ? (
        <div className="flex flex-wrap gap-2">
          {["Sama berat", "Lebih berat kapas", "Lebih berat besi"].map((opsi) => (
            <button
              key={opsi}
              type="button"
              onClick={() => pilih(opsi)}
              className={`inline-flex min-h-12 items-center rounded-2xl px-3 text-xs font-black ${
                pilihan === opsi ? "bg-emerald-600 text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
              }`}
            >
              {opsi}
            </button>
          ))}
        </div>
      ) : null}
      {soal.butuhTulis ? (
        <KanvasJawab
          kunci={`eval-${nomor}`}
          expected={soal.expected}
          label="Tulis jawaban"
          disabled={tulisOk}
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `${soal.expected} tepat.` : `Jawaban ${soal.expected}.`,
              benar,
              terbaca,
              expected: soal.expected,
            });
            if (benar) setTulisOk(true);
          }}
        />
      ) : null}
      {soal.butuhSuara ? (
        <TombolMikrofon
          menyimak={mic.menyimak}
          onMulai={mic.mulai}
          labelUji={soal.suara[0]}
          onUji={() => {
            setSuaraOk(true);
            kirimEvent("VOICE_ANSWERED", { pesan: "Ucapan tepat!", benar: true, soal: nomor + 1 });
          }}
        />
      ) : null}
      {bolehLanjut ? (
        <button type="button" onClick={lanjut} className="inline-flex min-h-12 items-center self-start rounded-2xl bg-emerald-500 px-4 text-sm font-black text-white">
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

export default function SimulasiMtk3Ukur({
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
  const [tab, setTab] = useState<TabLab>("penggaris");
  const [pesanIgil, setPesanIgil] = useState("Halo insinyur cilik! Yuk ukur panjang dan berat.");
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
      pesan: "Halo insinyur cilik! Yuk ukur panjang dan berat.",
      adegan: "penggaris",
    });
  }, [kirimEvent]);

  useEffect(() => () => hentikanSuaraGuruIgil(), []);

  const pembuka: Record<TabLab, string> = {
    penggaris: "Pangkal benda pas di angka 0. Satu sentimeter ada sepuluh milimeter.",
    timbangan: "Lihat jarumnya. Seribu gram sama dengan satu kilogram.",
    konversi: "Satu meter ada seratus sentimeter. Satu kilogram ada seribu gram.",
    kuis: "Lima soal berbeda. Pilih jawaban yang tepat.",
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
          <h2 className="text-lg font-black leading-tight">Pengukuran Panjang dan Berat</h2>
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
          {suaraAktif ? "Suara Aktif" : "Suara Mati"}
        </button>
      </div>
      <PitaSuaraIgil pesan={pesanIgil} bicara={bicara} onUlang={() => ucapkan(pesanIgil)} />
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
        {tab === "penggaris" ? <ModePenggaris kirimEvent={kirimEvent} /> : null}
        {tab === "timbangan" ? <ModeTimbangan kirimEvent={kirimEvent} /> : null}
        {tab === "konversi" ? <ModeKonversi kirimEvent={kirimEvent} /> : null}
        {tab === "kuis" ? <KuisLima butir={KUIS_MTK3_UKUR} onJawab={(pesan, benar, soal) => kirimEvent("QUIZ_ANSWERED", { pesan, benar, soal })} onSelesai={tandaiSelesai} /> : null}
      </div>
    </div>
  );
}
