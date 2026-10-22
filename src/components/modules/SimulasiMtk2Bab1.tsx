"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TutorEventType =
  | "SCENE_START"
  | "GROUP_TEN"
  | "VOICE_ANSWERED"
  | "HANDWRITING_CHECKED"
  | "PLACE_VALUE_MASTERED"
  | "COMPARE_SELECTED"
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

type TabLab = "adegan1" | "adegan2" | "adegan3" | "kuis" | "evaluasi";
type Titik = { x: number; y: number };
type Kelereng = { id: number; x: number; y: number; warna: string; ikat: 0 | 1 | 2 };

const TAB_LAB: { id: TabLab; label: string }[] = [
  { id: "adegan1", label: "1. Ikat 10" },
  { id: "adegan2", label: "2. Nilai Tempat" },
  { id: "adegan3", label: "3. Bandingkan" },
  { id: "kuis", label: "Kuis" },
  { id: "evaluasi", label: "Evaluasi" },
];

const WARNA_KELERENG = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#a855f7", "#ec4899"];

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

function dalamPoligon(x: number, y: number, poly: Titik[]): boolean {
  let dalam = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    const potong = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0001) + xi;
    if (potong) dalam = !dalam;
  }
  return dalam;
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

function buatKelereng(): Kelereng[] {
  return Array.from({ length: 26 }, (_, i) => {
    const kolom = i % 9;
    const baris = Math.floor(i / 9);
    const jitterX = ((i * 17) % 7) - 3;
    const jitterY = ((i * 11) % 7) - 3;
    return {
      id: i,
      x: 7 + kolom * 10.4 + jitterX * 0.35,
      y: 10 + baris * 30 + jitterY * 0.45,
      warna: WARNA_KELERENG[i % WARNA_KELERENG.length],
      ikat: 0 as const,
    };
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

function KelerengSvg({ warna, ukuran = 28 }: { warna: string; ukuran?: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="12" fill={warna} stroke="#1e1b4b" strokeWidth="1.4" />
      <ellipse cx="10" cy="10" rx="4" ry="3" fill="#fff" opacity="0.55" />
    </svg>
  );
}

function ToplesPuluhan() {
  return (
    <svg width="64" height="72" viewBox="0 0 64 72" aria-hidden>
      <rect x="18" y="4" width="28" height="10" rx="3" fill="#f59e0b" stroke="#92400e" strokeWidth="1.6" />
      <path d="M12 16 h40 v42 q0 10 -20 10 q-20 0 -20 -10 z" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.8" opacity="0.85" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <circle key={i} cx={22 + (i % 4) * 8} cy={28 + Math.floor(i / 4) * 10} r="3.2" fill={WARNA_KELERENG[i % 8]} />
      ))}
      <text x="32" y="66" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">
        10
      </text>
    </svg>
  );
}

function IkatLidi({ jumlah = 10 }: { jumlah?: number }) {
  return (
    <svg width="36" height="88" viewBox="0 0 36 88" aria-hidden>
      {Array.from({ length: jumlah }).map((_, i) => (
        <rect key={i} x={6 + i * 2.2} y="6" width="2" height="70" rx="1" fill="#b45309" />
      ))}
      <rect x="4" y="38" width="28" height="8" rx="3" fill="#dc2626" />
    </svg>
  );
}

function LidiSatuan() {
  return <rect width="6" height="52" rx="2" fill="#f59e0b" stroke="#92400e" strokeWidth="1" />;
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
          Periksa Tulisan
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
  onSelesai: (poly: Titik[], tengah: Titik) => void;
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
    if (poly.length < 8) return;
    const tengah = {
      x: poly.reduce((a, p) => a + p.x, 0) / poly.length,
      y: poly.reduce((a, p) => a + p.y, 0) / poly.length,
    };
    onSelesai(poly, tengah);
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

export default function SimulasiMtk2Bab1({
  onTutorEvent,
  onBenar,
}: {
  onTutorEvent?: (eventType: TutorEventType, payload: TutorEventPayload) => void;
  onBenar?: () => void;
}) {
  const [tab, setTab] = useState<TabLab>("adegan1");
  const [log, setLog] = useState<TutorEventMasuk[]>([]);
  const [pesanIgil, setPesanIgil] = useState("Ayo lingkari setiap 10 kelereng. Satu lingkaran jadi satu toples puluhan!");
  const [suaraAktif, setSuaraAktif] = useState(true);
  const [sedangBicara, setSedangBicara] = useState(false);
  const sudahLulus = useRef(false);
  const suaraRef = useRef(suaraAktif);
  suaraRef.current = suaraAktif;

  const ucapkan = useCallback((teks: string) => {
    if (!suaraRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const ucap = new SpeechSynthesisUtterance(teks);
    ucap.lang = "id-ID";
    ucap.rate = 0.92;
    ucap.pitch = 1.05;
    ucap.onstart = () => setSedangBicara(true);
    ucap.onend = () => setSedangBicara(false);
    ucap.onerror = () => setSedangBicara(false);
    window.speechSynthesis.speak(ucap);
  }, []);

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
    kirimEvent("SCENE_START", {
      pesan: "Ayo lingkari setiap 10 kelereng. Satu lingkaran jadi satu toples puluhan!",
      adegan: 1,
    });
    // hanya sekali saat lab dibuka
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gantiTab = (id: TabLab) => {
    setTab(id);
    const pembuka: Record<TabLab, string> = {
      adegan1: "Ayo lingkari setiap 10 kelereng. Satu lingkaran jadi satu toples puluhan!",
      adegan2: "Ini rumah nilai tempat. Tulis 3 di kamar puluhan, dan 5 di kamar satuan.",
      adegan3: "Jangan terkecoh satuan 8. Lingkari meja yang puluhannya lebih banyak.",
      kuis: "Satu soal per layar. Tulis dan ucapkan jawabannya, ya!",
      evaluasi: "Tiga puluh sembilan. Tulis angkanya di kotak.",
    };
    kirimEvent("SCENE_START", { pesan: pembuka[id], tab: id });
  };

  return (
    <div className="rounded-[2rem] border-2 border-sky-100 bg-white shadow-xl shadow-sky-100/40">
      <style>{`
        @keyframes igil-kedip {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .igil-kedip { animation: igil-kedip 0.7s ease-in-out infinite; }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.85rem] bg-gradient-to-r from-sky-500 to-indigo-600 p-4 text-white sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-100">Lab IGIL · Matematika Kelas 2 SD</p>
          <h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Ayo Membilang sampai dengan 50</h2>
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

      <div className="flex flex-wrap gap-2 bg-sky-50 p-2">
        {TAB_LAB.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => gantiTab(item.id)}
            className={`flex min-h-12 min-w-0 flex-1 basis-28 items-center justify-center rounded-2xl px-1 text-xs font-bold sm:text-sm ${
              tab === item.id ? "bg-white text-sky-700 shadow-sm" : "text-sky-600 hover:bg-white/70"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[34rem] bg-gradient-to-b from-sky-50 to-amber-50 p-3 sm:min-h-[38rem] sm:p-4">
        {tab === "adegan1" ? <AdeganKelereng kirimEvent={kirimEvent} /> : null}
        {tab === "adegan2" ? <AdeganNilaiTempat kirimEvent={kirimEvent} /> : null}
        {tab === "adegan3" ? <AdeganBanding kirimEvent={kirimEvent} /> : null}
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

function AdeganKelereng({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [kelereng, setKelereng] = useState<Kelereng[]>(() => buatKelereng());
  const [suaraOk, setSuaraOk] = useState(false);
  const [tulisOk, setTulisOk] = useState(false);
  const [umpanSuara, setUmpanSuara] = useState("");
  const areaRef = useRef<HTMLDivElement>(null);
  const toplesRef = useRef(0);
  const toples = [1, 2].filter((n) => kelereng.some((k) => k.ikat === n)).length;
  const sisa = kelereng.filter((k) => k.ikat === 0);
  const siapSuara = toples >= 2;

  const ikatDari = (calon: Kelereng[]) => {
    if (toplesRef.current >= 2 || calon.length < 8) return;
    const sudah = (toplesRef.current + 1) as 1 | 2;
    toplesRef.current = sudah;
    const idAmbil = new Set(calon.slice(0, 10).map((k) => k.id));
    setKelereng((lama) => lama.map((k) => (idAmbil.has(k.id) && k.ikat === 0 ? { ...k, ikat: sudah } : k)));
    kirimEvent("GROUP_TEN", {
      pesan:
        sudah === 1
          ? "Hore! Satu toples puluhan. Ikat 10 lagi, ya!"
          : "Ada 2 toples puluhan dan 6 kelereng satuan. Ucapkan ke mikrofon, berapa jumlah semuanya?",
      toples: sudah,
      sisa: 26 - sudah * 10,
    });
  };

  const lingkarSelesai = (poly: Titik[], _tengah: Titik) => {
    const kotak = areaRef.current?.getBoundingClientRect();
    if (!kotak) return;
    const diDalam = sisa.filter((k) => {
      const px = (k.x / 100) * kotak.width;
      const py = (k.y / 100) * kotak.height;
      return dalamPoligon(px, py, poly);
    });
    if (diDalam.length >= 8 && diDalam.length <= 12) ikatDari(diDalam);
  };

  const ikatBantu = () => {
    if (sisa.length < 10) return;
    ikatDari(sisa);
  };

  const cekSuara = (teks: string) => {
    const alias = ["dua puluh enam", "26", "dua puluh 6", "2 puluh 6"];
    if (!teks) {
      setUmpanSuara("Browser ini belum dukung mikrofon. Pakai tombol uji.");
      return;
    }
    const ok = cocokSuara(teks, alias);
    setUmpanSuara(ok ? "Benar! Dua puluh enam." : `Kamu bilang: "${teks}". Coba lagi: dua puluh enam.`);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar! Dua puluh enam. Sekarang tulis 26." : "Belum tepat. Ucapkan dua puluh enam.", benar: ok, transkrip: teks });
    if (ok) setSuaraOk(true);
  };

  const mic = useMic(cekSuara);

  return (
    <div className="flex h-full min-h-[30rem] flex-col gap-3 pb-28">
      <div ref={areaRef} className="relative min-h-[17rem] flex-1 overflow-hidden rounded-3xl bg-[linear-gradient(180deg,#e0f2fe_0%,#fef3c7_100%)]">
        {kelereng.map((k) =>
          k.ikat === 0 ? (
            <span key={k.id} className="absolute" style={{ left: `${k.x}%`, top: `${k.y}%` }}>
              <KelerengSvg warna={k.warna} />
            </span>
          ) : null,
        )}
        {[1, 2].map((n) => {
          const anggota = kelereng.filter((k) => k.ikat === n);
          if (anggota.length === 0) return null;
          const x = anggota.reduce((a, k) => a + k.x, 0) / anggota.length;
          const y = anggota.reduce((a, k) => a + k.y, 0) / anggota.length;
          return (
            <span key={`t${n}`} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
              <ToplesPuluhan />
            </span>
          );
        })}
        <KanvasCoret disabled={siapSuara} onSelesai={lingkarSelesai} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={ikatBantu}
          disabled={siapSuara}
          className="inline-flex min-h-12 items-center rounded-2xl bg-orange-500 px-4 text-sm font-black text-white disabled:opacity-40"
        >
          Ikat 10 Kelereng
        </button>
        <p className="text-sm font-bold text-slate-700">
          Toples: {toples} · Satuan: {sisa.length}
        </p>
      </div>
      {siapSuara ? (
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2">
            <TombolMikrofon
              menyimak={mic.menyimak}
              onMulai={mic.mulai}
              onUji={() => cekSuara("dua puluh enam")}
              labelUji="Ucapkan 26"
            />
            {umpanSuara ? <p className="text-xs font-bold text-indigo-800">{umpanSuara}</p> : null}
          </div>
          {suaraOk ? (
            <KanvasTulis
              kunci="a1-26"
              expected="26"
              label="Tulis 26"
              opsiScaffold={["26", "20", "62"]}
              disabled={tulisOk}
              onHasil={(benar, terbaca) => {
                kirimEvent("HANDWRITING_CHECKED", {
                  pesan: benar ? "Tulisan 26 tepat. Hebat!" : "Belum tepat. Tulis 26.",
                  benar,
                  terbaca,
                  expected: "26",
                });
                if (benar) setTulisOk(true);
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function AdeganNilaiTempat({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [puluh, setPuluh] = useState(false);
  const [satu, setSatu] = useState(false);
  const [suaraOk, setSuaraOk] = useState(false);
  const [umpan, setUmpan] = useState("");
  const mastered = useRef(false);

  const cobaMaster = (p: boolean, s: boolean, v: boolean) => {
    if (!p || !s || !v || mastered.current) return;
    mastered.current = true;
    kirimEvent("PLACE_VALUE_MASTERED", {
      pesan: "Tiga puluh lima. 3 puluhan dan 5 satuan. Hebat!",
      tens: 3,
      ones: 5,
      total: 35,
    });
  };

  const cekSuara = (teks: string) => {
    const alias = ["tiga puluh lima", "35", "tiga puluh 5"];
    if (!teks) {
      setUmpan("Mikrofon belum didukung. Pakai tombol uji.");
      return;
    }
    const ok = cocokSuara(teks, alias);
    setUmpan(ok ? "Benar! Tiga puluh lima." : `Kamu bilang: "${teks}". Ucapkan tiga puluh lima.`);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Benar! Tiga puluh lima." : "Belum tepat. Ucapkan tiga puluh lima.", benar: ok, transkrip: teks });
    if (ok) {
      setSuaraOk(true);
      cobaMaster(puluh, satu, true);
    }
  };

  const mic = useMic(cekSuara);

  return (
    <div className="flex min-h-[30rem] flex-col gap-3 pb-28">
      <div className="grid flex-1 grid-cols-2 gap-3">
        <div className="flex flex-col rounded-3xl bg-indigo-100/80 p-3">
          <p className="text-center text-sm font-black text-indigo-800">Kamar Puluhan</p>
          <div className="flex flex-1 flex-wrap items-end justify-center gap-2 py-3">
            <IkatLidi />
            <IkatLidi />
            <IkatLidi />
          </div>
          <KanvasTulis
            kunci="a2-p"
            expected="3"
            label="Tulis puluhan"
            opsiScaffold={["3", "5", "30"]}
            disabled={puluh}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Puluhan 3, tepat!" : "Tulis 3 di kamar puluhan.", benar, terbaca, expected: "3" });
              if (benar) {
                setPuluh(true);
                cobaMaster(true, satu, suaraOk);
              }
            }}
          />
        </div>
        <div className="flex flex-col rounded-3xl bg-amber-100/80 p-3">
          <p className="text-center text-sm font-black text-amber-900">Kamar Satuan</p>
          <div className="flex flex-1 flex-wrap items-end justify-center gap-1 py-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="56" viewBox="0 0 12 56" aria-hidden>
                <LidiSatuan />
              </svg>
            ))}
          </div>
          <KanvasTulis
            kunci="a2-s"
            expected="5"
            label="Tulis satuan"
            opsiScaffold={["5", "3", "35"]}
            disabled={satu}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Satuan 5, tepat!" : "Tulis 5 di kamar satuan.", benar, terbaca, expected: "5" });
              if (benar) {
                setSatu(true);
                cobaMaster(puluh, true, suaraOk);
              }
            }}
          />
        </div>
      </div>
      <TombolMikrofon menyimak={mic.menyimak} onMulai={mic.mulai} onUji={() => cekSuara("tiga puluh lima")} labelUji="Ucapkan 35" />
      {umpan ? <p className="text-xs font-bold text-indigo-800">{umpan}</p> : null}
    </div>
  );
}

function AdeganBanding({
  kirimEvent,
}: {
  kirimEvent: (jenis: TutorEventType, payload: TutorEventPayload, bicara?: boolean) => void;
}) {
  const [pilih, setPilih] = useState<"kiri" | "kanan" | null>(null);
  const [suaraOk, setSuaraOk] = useState(false);
  const [umpan, setUmpan] = useState("");
  const areaRef = useRef<HTMLDivElement>(null);

  const lingkarSelesai = (_poly: Titik[], tengah: Titik) => {
    const kotak = areaRef.current?.getBoundingClientRect();
    if (!kotak || pilih) return;
    const kiri = tengah.x < kotak.width / 2;
    if (kiri) {
      setPilih("kiri");
      kirimEvent("COMPARE_SELECTED", {
        pesan: "Meja kiri 42. Puluhannya 4, lebih banyak. Kenapa 42 lebih besar? Ucapkan ke mikrofon.",
        pilihan: 42,
        benar: true,
      });
    } else {
      setPilih("kanan");
      kirimEvent("COMPARE_SELECTED", {
        pesan: "Itu meja 38. Satuannya 8, tapi puluhannya cuma 3. Lingkari meja puluhan lebih banyak.",
        pilihan: 38,
        benar: false,
      });
      setTimeout(() => setPilih(null), 900);
    }
  };

  const cekSuara = (teks: string) => {
    const alias = ["empat puluhan", "4 puluhan", "empat puluh", "puluhan lebih banyak", "empat puluh dua", "42"];
    if (!teks) {
      setUmpan("Mikrofon belum didukung. Pakai tombol uji.");
      return;
    }
    const ok = cocokSuara(teks, alias);
    setUmpan(ok ? "Ya! Empat puluhan lebih banyak dari tiga puluhan." : `Kamu bilang: "${teks}". Sebut empat puluhan.`);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Ya! Empat puluhan lebih banyak dari tiga puluhan." : "Sebut empat puluhan.", benar: ok, transkrip: teks });
    if (ok) setSuaraOk(true);
  };

  const mic = useMic(cekSuara);

  return (
    <div className="flex min-h-[30rem] flex-col gap-3 pb-28">
      <div ref={areaRef} className="relative grid min-h-[16rem] flex-1 grid-cols-2 gap-3">
        <MejaBlok
          judul="Meja Kiri"
          puluhan={4}
          satuan={2}
          angka={42}
          sorot={pilih === "kiri"}
        />
        <MejaBlok
          judul="Meja Kanan"
          puluhan={3}
          satuan={8}
          angka={38}
          sorot={pilih === "kanan"}
        />
        <KanvasCoret disabled={pilih === "kiri"} onSelesai={lingkarSelesai} />
      </div>
      {pilih === "kiri" ? (
        <div className="space-y-2">
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("empat puluhan")}
            labelUji="Sebut empat puluhan"
          />
          {umpan ? <p className="text-xs font-bold text-indigo-800">{umpan}</p> : null}
          {suaraOk ? <p className="text-sm font-black text-emerald-700">42 lebih besar dari 38. Pintar!</p> : null}
        </div>
      ) : (
        <p className="text-sm font-bold text-slate-700">Lingkari meja yang puluhannya lebih banyak.</p>
      )}
    </div>
  );
}

function MejaBlok({
  judul,
  puluhan,
  satuan,
  angka,
  sorot,
}: {
  judul: string;
  puluhan: number;
  satuan: number;
  angka: number;
  sorot: boolean;
}) {
  return (
    <div className={`flex flex-col items-center rounded-3xl bg-white/80 p-3 ${sorot ? "ring-4 ring-emerald-400" : "ring-2 ring-slate-200"}`}>
      <p className="text-sm font-black text-slate-700">{judul}</p>
      <div className="mt-2 flex flex-wrap items-end justify-center gap-1">
        {Array.from({ length: puluhan }).map((_, i) => (
          <IkatLidi key={`p${i}`} />
        ))}
        {Array.from({ length: satuan }).map((_, i) => (
          <svg key={`s${i}`} width="10" height="48" viewBox="0 0 12 56" aria-hidden>
            <LidiSatuan />
          </svg>
        ))}
      </div>
      <p className="mt-2 text-3xl font-black text-indigo-800">{angka}</p>
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
  const [puluhOk, setPuluhOk] = useState(false);
  const [satuOk, setSatuOk] = useState(false);
  const [umpan, setUmpan] = useState("");
  const lulus = useRef(false);

  const soal = [
    {
      id: "q1",
      judul: "Kebun Jeruk IGIL",
      expected: "47",
      alias: ["empat puluh tujuh", "47"],
      opsi: ["47", "40", "74"],
      labelTulis: "Tulis 47",
      labelUji: "Ucapkan 47",
      butuhSuara: true,
    },
    {
      id: "q2",
      judul: "Kartu Nilai Tempat 50",
      expected: "50",
      alias: [],
      opsi: ["5", "0", "50"],
      labelTulis: "Puluhan dan satuan",
      labelUji: "",
      butuhSuara: false,
    },
    {
      id: "q3",
      judul: "Batu Lompat Sungai",
      expected: "35",
      alias: ["lompat lima", "loncat lima", "tambah lima", "plus 5", "lima"],
      opsi: ["35", "40", "32"],
      labelTulis: "Tulis 35",
      labelUji: "Sebut lompat lima",
      butuhSuara: true,
    },
  ] as const;

  const aktif = soal[nomor];
  const selesaiSoal = nomor === 1 ? puluhOk && satuOk : tulisOk && (!aktif.butuhSuara || suaraOk);

  const cekSuara = (teks: string) => {
    if (!teks) {
      setUmpan("Mikrofon belum didukung. Pakai tombol uji.");
      return;
    }
    const ok = cocokSuara(teks, [...aktif.alias]);
    setUmpan(ok ? "Suara tepat!" : `Kamu bilang: "${teks}". Coba lagi.`);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Suara tepat!" : "Coba ucapkan lagi.", benar: ok, transkrip: teks, soal: aktif.id });
    if (ok) setSuaraOk(true);
  };

  const mic = useMic(cekSuara);

  const lanjut = () => {
    kirimEvent("QUIZ_ANSWERED", { pesan: `Soal ${nomor + 1} selesai.`, soal: aktif.id, benar: true });
    if (nomor >= 2) {
      if (!lulus.current) {
        lulus.current = true;
        kirimEvent("QUIZ_COMPLETED", { pesan: "Tiga soal kuis selesai. Hebat!" });
      }
      return;
    }
    setNomor((n) => n + 1);
    setTulisOk(false);
    setSuaraOk(false);
    setPuluhOk(false);
    setSatuOk(false);
    setUmpan("");
  };

  return (
    <div className="flex min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-indigo-800">
        Soal {nomor + 1} dari 3 · {aktif.judul}
      </p>
      {nomor === 0 ? (
        <div className="flex flex-wrap items-end justify-center gap-3 rounded-3xl bg-white/70 py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <svg width="72" height="64" viewBox="0 0 72 64" aria-hidden>
                <ellipse cx="36" cy="18" rx="24" ry="10" fill="#fdba74" />
                <path d="M12 18 L18 54 Q36 62 54 54 L60 18" fill="#f97316" stroke="#9a3412" strokeWidth="2" />
                <text x="36" y="44" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
                  10
                </text>
              </svg>
              <p className="text-[11px] font-bold text-orange-800">keranjang</p>
            </div>
          ))}
          <div className="flex gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="text-2xl" aria-hidden>
                🍊
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {nomor === 1 ? (
        <p className="text-center text-7xl font-black text-indigo-700">50</p>
      ) : null}
      {nomor === 2 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {["20", "25", "30", "?", "40"].map((n) => (
            <div
              key={n}
              className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-black ${
                n === "?" ? "bg-amber-200 text-amber-900 ring-4 ring-amber-400" : "bg-sky-200 text-sky-900"
              }`}
            >
              {n}
            </div>
          ))}
        </div>
      ) : null}

      {nomor === 1 ? (
        <div className="flex gap-3">
          <KanvasTulis
            kunci="q2-p"
            expected="5"
            label="[ ] Puluhan"
            opsiScaffold={["5", "0", "50"]}
            disabled={puluhOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Puluhan 5." : "Tulis 5 di puluhan.", benar, terbaca, expected: "5" });
              if (benar) setPuluhOk(true);
            }}
          />
          <KanvasTulis
            kunci="q2-s"
            expected="0"
            label="[ ] Satuan"
            opsiScaffold={["0", "5", "10"]}
            disabled={satuOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "Satuan 0. Jadi 50!" : "Tulis 0 di satuan.", benar, terbaca, expected: "0" });
              if (benar) setSatuOk(true);
            }}
          />
        </div>
      ) : (
        <KanvasTulis
          kunci={aktif.id}
          expected={aktif.expected}
          label={aktif.labelTulis}
          opsiScaffold={[...aktif.opsi]}
          disabled={tulisOk}
          onHasil={(benar, terbaca) => {
            kirimEvent("HANDWRITING_CHECKED", {
              pesan: benar ? `Tulisan ${aktif.expected} tepat!` : `Tulis ${aktif.expected}.`,
              benar,
              terbaca,
              expected: aktif.expected,
            });
            if (benar) setTulisOk(true);
          }}
        />
      )}

      {aktif.butuhSuara ? (
        <div>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara(aktif.alias[0])}
            labelUji={aktif.labelUji}
          />
          {umpan ? <p className="mt-1 text-xs font-bold text-indigo-800">{umpan}</p> : null}
        </div>
      ) : null}

      {selesaiSoal ? (
        <button
          type="button"
          onClick={lanjut}
          className="inline-flex min-h-12 items-center justify-center self-start rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white"
        >
          {nomor >= 2 ? "Kuis selesai" : "Soal berikutnya"}
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
  const [urut, setUrut] = useState([false, false, false]);
  const [umpan, setUmpan] = useState("");
  const [pilihBalon, setPilihBalon] = useState<"34" | "43" | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const resetSoal = () => {
    setTulisOk(false);
    setSuaraOk(false);
    setUrut([false, false, false]);
    setUmpan("");
    setPilihBalon(null);
  };

  const selesaiSoal =
    nomor === 0
      ? tulisOk
      : nomor === 1
        ? tulisOk
        : nomor === 2
          ? suaraOk
          : nomor === 3
            ? pilihBalon === "43" && suaraOk
            : urut.every(Boolean);

  const cekSuara = (teks: string) => {
    const alias =
      nomor === 2 ? ["puluhan", "puluh"] : nomor === 3 ? ["empat puluh tiga", "43"] : [];
    if (!teks) {
      setUmpan("Mikrofon belum didukung. Pakai tombol uji.");
      return;
    }
    const ok = cocokSuara(teks, alias);
    setUmpan(ok ? "Suara tepat!" : `Kamu bilang: "${teks}". Coba lagi.`);
    kirimEvent("VOICE_ANSWERED", { pesan: ok ? "Suara tepat!" : "Coba ucapkan lagi.", benar: ok, transkrip: teks, soal: nomor + 1 });
    if (ok) setSuaraOk(true);
  };

  const mic = useMic(cekSuara);

  const lingkarBalon = (_poly: Titik[], tengah: Titik) => {
    const kotak = areaRef.current?.getBoundingClientRect();
    if (!kotak || pilihBalon === "43") return;
    const kiri = tengah.x < kotak.width / 2;
    if (!kiri) {
      setPilihBalon("43");
      kirimEvent("COMPARE_SELECTED", { pesan: "Balon 43. Ucapkan empat puluh tiga.", pilihan: 43, benar: true });
    } else {
      setPilihBalon("34");
      kirimEvent("COMPARE_SELECTED", { pesan: "Itu 34. Lingkari yang lebih besar.", pilihan: 34, benar: false });
      setTimeout(() => setPilihBalon(null), 800);
    }
  };

  const lanjut = () => {
    kirimEvent("EVAL_ANSWERED", { pesan: `Evaluasi soal ${nomor + 1} benar.`, soal: nomor + 1, benar: true });
    if (nomor >= 4) {
      onLulus("Lima soal evaluasi selesai. Kamu jago membilang sampai 50!");
      return;
    }
    const berikutnya = nomor + 1;
    setNomor(berikutnya);
    resetSoal();
    const prompt = [
      "Ada 2 batang puluhan dan 9 satuan. Tulis jumlahnya.",
      "Angka 4 berkedip biru. Ucapkan, itu puluhan atau satuan?",
      "Lingkari balon yang lebih besar, lalu ucapkan angkanya.",
      "Tulis urutan gerbong dari yang terkecil.",
    ][berikutnya - 1];
    if (prompt) kirimEvent("SCENE_START", { pesan: prompt, soal: berikutnya + 1 }, true);
  };

  return (
    <div className="flex min-h-[30rem] flex-col gap-3 pb-28">
      <p className="text-sm font-black text-indigo-800">Evaluasi {nomor + 1} dari 5</p>

      {nomor === 0 ? (
        <>
          <p className="text-base font-bold text-slate-800">Dengar IGIL, lalu tulis angkanya.</p>
          <KanvasTulis
            kunci="e1"
            expected="39"
            label="Tulis 39"
            opsiScaffold={["39", "93", "30"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "39, tepat!" : "Tulis 39.", benar, terbaca, expected: "39" });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 1 ? (
        <>
          <div className="flex flex-wrap items-end justify-center gap-2 rounded-3xl bg-white/70 py-3">
            <IkatLidi />
            <IkatLidi />
            {Array.from({ length: 9 }).map((_, i) => (
              <svg key={i} width="10" height="48" viewBox="0 0 12 56" aria-hidden>
                <LidiSatuan />
              </svg>
            ))}
          </div>
          <KanvasTulis
            kunci="e2"
            expected="29"
            label="Tulis jumlahnya"
            opsiScaffold={["29", "92", "11"]}
            disabled={tulisOk}
            onHasil={(benar, terbaca) => {
              kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? "29, tepat!" : "2 puluhan dan 9 satuan. Tulis 29.", benar, terbaca, expected: "29" });
              if (benar) setTulisOk(true);
            }}
          />
        </>
      ) : null}

      {nomor === 2 ? (
        <>
          <p className="text-center text-7xl font-black">
            <span className="igil-kedip inline-block text-sky-600">4</span>
            <span className="text-slate-800">1</span>
          </p>
          <p className="text-sm font-bold text-slate-700">Angka biru berkedip. Itu nilai tempat apa?</p>
          <TombolMikrofon
            menyimak={mic.menyimak}
            onMulai={mic.mulai}
            onUji={() => cekSuara("puluhan")}
            labelUji="Ucapkan puluhan"
          />
          {umpan ? <p className="text-xs font-bold text-indigo-800">{umpan}</p> : null}
        </>
      ) : null}

      {nomor === 3 ? (
        <>
          <div ref={areaRef} className="relative grid min-h-[12rem] grid-cols-2 gap-3">
            <BalonAngka angka={34} sorot={pilihBalon === "34"} />
            <BalonAngka angka={43} sorot={pilihBalon === "43"} />
            <KanvasCoret disabled={pilihBalon === "43"} onSelesai={lingkarBalon} />
          </div>
          {pilihBalon === "43" ? (
            <div>
              <TombolMikrofon
                menyimak={mic.menyimak}
                onMulai={mic.mulai}
                onUji={() => cekSuara("empat puluh tiga")}
                labelUji="Ucapkan 43"
              />
              {umpan ? <p className="mt-1 text-xs font-bold text-indigo-800">{umpan}</p> : null}
            </div>
          ) : (
            <p className="text-sm font-bold text-slate-700">Lingkari balon yang lebih besar.</p>
          )}
        </>
      ) : null}

      {nomor === 4 ? (
        <>
          <div className="flex flex-wrap items-end justify-center gap-2">
            {[28, 25, 27].map((n) => (
              <div key={n} className="flex h-16 w-20 items-end justify-center rounded-t-xl bg-rose-400 pb-2 text-xl font-black text-white">
                {n}
              </div>
            ))}
          </div>
          <p className="text-sm font-bold text-slate-700">Tulis dari yang terkecil.</p>
          <div className="flex gap-2">
            {["25", "27", "28"].map((n, i) => (
              <KanvasTulis
                key={n}
                kunci={`e5-${n}`}
                expected={n}
                label={`Ke-${i + 1}`}
                opsiScaffold={["25", "27", "28"]}
                disabled={urut[i]}
                onHasil={(benar, terbaca) => {
                  kirimEvent("HANDWRITING_CHECKED", { pesan: benar ? `${n} tepat.` : `Urutan ke-${i + 1} adalah ${n}.`, benar, terbaca, expected: n });
                  if (benar) setUrut((lama) => lama.map((v, idx) => (idx === i ? true : v)));
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      {selesaiSoal ? (
        <button
          type="button"
          onClick={lanjut}
          className="inline-flex min-h-12 items-center justify-center self-start rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white"
        >
          {nomor >= 4 ? "Selesai evaluasi" : "Soal berikutnya"}
        </button>
      ) : null}
    </div>
  );
}

function BalonAngka({ angka, sorot }: { angka: number; sorot: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-3xl bg-white/60 py-4 ${sorot ? "ring-4 ring-emerald-400" : ""}`}>
      <svg width="110" height="140" viewBox="0 0 110 140" aria-hidden>
        <ellipse cx="55" cy="52" rx="40" ry="48" fill={angka === 43 ? "#38bdf8" : "#f472b6"} stroke="#1e1b4b" strokeWidth="2" />
        <line x1="55" y1="100" x2="55" y2="136" stroke="#64748b" strokeWidth="3" />
        <text x="55" y="60" textAnchor="middle" fontSize="28" fontWeight="800" fill="#0f172a">
          {angka}
        </text>
      </svg>
    </div>
  );
}
