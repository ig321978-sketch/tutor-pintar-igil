"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as AcaraPointer } from "react";
import type { KelaminGuru } from "@/lib/guru";

type TabLab = "gambar" | "jembatan" | "konteks" | "latihan";
type Bentuk = "kelereng" | "kubus" | "segitiga" | "apel";
type JenisPola = "besar" | "kecil";
type ModeCoret = "angka" | "aturan";
type LogBaris = { id: number; waktu: string; jenis: string; pesan: string };
type SkenarioId = "kursi" | "kaleng" | "rumah";

export type TutorEventPola = {
  pesan: string;
  [kunci: string]: unknown;
};

type Props = {
  kelas?: string;
  kelamin?: KelaminGuru;
  onBenar?: () => void;
  onTutorEvent?: (eventType: string, payload: TutorEventPola) => void;
};

const TAB: { id: TabLab; label: string }[] = [
  { id: "gambar", label: "Pola Gambar" },
  { id: "jembatan", label: "Jembatan Bilangan" },
  { id: "konteks", label: "Konteks Nyata" },
  { id: "latihan", label: "Latihan" },
];

const BENTUK: { id: Bentuk; label: string }[] = [
  { id: "kelereng", label: "Kelereng" },
  { id: "kubus", label: "Kubus Satuan" },
  { id: "segitiga", label: "Segitiga Stik" },
  { id: "apel", label: "Apel" },
];

const ATURAN_NAIK = [2, 3, 4, 5, 10];
const ATURAN_TURUN = [-2, -3, -4, -5, -10];

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

const NAMA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

const PESAN_MENGECIL =
  "Sekarang nilainya semakin kecil di setiap langkah! Ini disebut Pola Bilangan Mengecil karena selalu dikurangi dengan bilangan yang sama.";
const PESAN_TENGAH =
  "Trik Buku Guru: Kalau kotak yang kosong ada di tengah, lihat dulu dua angka sebelahnya yang berdampingan lengkap untuk menemukan selisih tetapnya!";

type Skenario = {
  id: SkenarioId;
  nama: string;
  label: string[];
  nilai: (number | null)[];
  jawab: number;
  tengah: boolean;
  langkah: number;
  operasi: "bertambah" | "berkurang";
};

const SKENARIO: Skenario[] = [
  {
    id: "kursi",
    nama: "Kursi gedung",
    label: ["Baris 1", "Baris 2", "Baris 3", "Baris 4", "Baris 5"],
    nilai: [10, 14, null, 22, 26],
    jawab: 18,
    tengah: true,
    langkah: 4,
    operasi: "bertambah",
  },
  {
    id: "kaleng",
    nama: "Kaleng",
    label: ["Tingkat 1", "Tingkat 2", "Tingkat 3", "Tingkat 4"],
    nilai: [25, 20, 15, null],
    jawab: 10,
    tengah: false,
    langkah: 5,
    operasi: "berkurang",
  },
  {
    id: "rumah",
    nama: "Nomor rumah",
    label: ["Rumah 1", "Rumah 2", "Rumah 3", "Rumah 4", "Rumah 5"],
    nilai: [12, 19, null, 33, 40],
    jawab: 26,
    tengah: true,
    langkah: 7,
    operasi: "bertambah",
  },
];

function jam(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function sebut(n: number): string {
  if (n < 0) return `minus ${sebut(-n)}`;
  if (n <= 10) return NAMA[n];
  if (n === 11) return "sebelas";
  if (n < 20) return `${NAMA[n - 10]} belas`;
  if (n < 100) {
    const puluh = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"][Math.floor(n / 10)];
    const sisa = n % 10;
    return sisa ? `${puluh} ${NAMA[sisa]}` : puluh;
  }
  if (n === 100) return "seratus";
  if (n < 200) {
    const sisa = n - 100;
    return sisa ? `seratus ${sebut(sisa)}` : "seratus";
  }
  return String(n);
}

function kataLangkah(nilai: number): string {
  const kata = sebut(Math.abs(nilai));
  return nilai < 0 ? `berkurang ${kata}` : `bertambah ${kata}`;
}

function tandaAturan(nilai: number): string {
  return nilai > 0 ? `+${nilai}` : String(nilai);
}

function pesanSorot(operasi: string, step: number): string {
  return `Lihat bagian yang berwarna emas! Dari Kumpulan 1 ke Kumpulan 2, lalu ke Kumpulan 3, jumlah bendanya selalu ${operasi} ${step} secara tetap!`;
}

function pesanSalah(operasi: string, step: number, expected: number): string {
  return `Coba hitung selisih dari Kumpulan 3 ke Kumpulan 4 dulu! Karena setiap langkah ${operasi} ${step}, maka Kumpulan 5 seharusnya berisi ${expected} benda.`;
}

function deretGambar(jenis: JenisPola): number[] {
  return jenis === "besar" ? [2, 5, 8, 11] : [16, 13, 10, 7];
}

function sukuKe(awal: number, aturan: number, indeks: number): number {
  return awal + aturan * indeks;
}

function normal(teks: string): string {
  return teks.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const rapat = normal(teks).replace(/\s/g, "");
  if (!rapat) return false;
  return alias.some((item) => {
    const a = normal(item).replace(/\s/g, "");
    if (!a) return false;
    if (rapat === a) return true;
    if (rapat.includes(a)) {
      const sisa = rapat.slice(rapat.indexOf(a) + a.length);
      if (sisa.startsWith("belas") || sisa.startsWith("puluh") || sisa.startsWith("ratus")) return false;
      return a.length >= 4;
    }
    return a.includes(rapat) && rapat.length >= Math.min(4, a.length);
  });
}

function ucapkan(teks: string, onAkhir?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onAkhir?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(teks);
  u.lang = "id-ID";
  u.rate = 0.95;
  u.onend = () => onAkhir?.();
  window.speechSynthesis.speak(u);
}

type MesinMic = {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function tintaPixel(data: Uint8ClampedArray, i: number): boolean {
  return data[i + 3] > 50 && data[i] < 170 && data[i + 2] > data[i] + 15;
}

function kenaliSatu(data: Uint8ClampedArray, width: number, x1: number, y1: number, x2: number, y2: number): string {
  let pola = "";
  const selW = Math.max(1, (x2 - x1) / 5);
  const selH = Math.max(1, (y2 - y1) / 6);
  for (let r = 0; r < 6; r += 1) {
    for (let c = 0; c < 5; c += 1) {
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
    for (let i = 0; i < n; i += 1) skor += pola[i] === template[i] ? (pola[i] === "1" ? 2 : 1) : -1;
    if (skor > skorMax) {
      skorMax = skor;
      terbaik = angka;
    }
  }
  return skorMax < 8 ? "" : terbaik;
}

function kotakTinta(kanvas: HTMLCanvasElement): { data: Uint8ClampedArray; width: number; height: number; minX: number; minY: number; maxX: number; maxY: number; tinta: number } | null {
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
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  if (tinta < 12) return null;
  return { data: img.data, width, height, minX, minY, maxX, maxY, tinta };
}

function bacaDigit(data: Uint8ClampedArray, width: number, x1: number, y1: number, x2: number, y2: number, jumlah: number): string {
  const lebar = Math.max(8, x2 - x1);
  const angka: string[] = [];
  for (let s = 0; s < jumlah; s += 1) {
    const huruf = kenaliSatu(data, width, x1 + (lebar * s) / jumlah, y1, x1 + (lebar * (s + 1)) / jumlah, y2);
    if (!huruf) return "";
    angka.push(huruf);
  }
  return angka.join("");
}

function kenaliAngka(kanvas: HTMLCanvasElement, jumlah: number): string {
  const kotak = kotakTinta(kanvas);
  if (!kotak || jumlah < 1) return "";
  return bacaDigit(kotak.data, kotak.width, kotak.minX, kotak.minY, kotak.maxX, kotak.maxY, jumlah);
}

function kenaliAturan(kanvas: HTMLCanvasElement): string {
  const kotak = kotakTinta(kanvas);
  if (!kotak) return "";
  const lebar = Math.max(8, kotak.maxX - kotak.minX);
  const batas = kotak.minX + lebar * 0.36;
  let zona = 0;
  let baris = 0;
  let kolom = 0;
  const y0 = kotak.minY + (kotak.maxY - kotak.minY) * 0.38;
  const y1 = kotak.minY + (kotak.maxY - kotak.minY) * 0.62;
  const xTengah = kotak.minX + (batas - kotak.minX) * 0.5;
  const pita = Math.max(2, (batas - kotak.minX) * 0.22);
  for (let y = kotak.minY; y <= kotak.maxY; y += 2) {
    for (let x = kotak.minX; x <= batas; x += 2) {
      const i = (y * kotak.width + x) * 4;
      if (i < 0 || i >= kotak.data.length || !tintaPixel(kotak.data, i)) continue;
      zona += 1;
      if (y >= y0 && y <= y1) baris += 1;
      if (Math.abs(x - xTengah) <= pita) kolom += 1;
    }
  }
  if (zona < 4) return "";
  const plus = kolom > zona * 0.16 && baris > zona * 0.16;
  const tanda = plus ? "+" : "-";
  const satu = bacaDigit(kotak.data, kotak.width, batas, kotak.minY, kotak.maxX, kotak.maxY, 1);
  const dua = bacaDigit(kotak.data, kotak.width, batas, kotak.minY, kotak.maxX, kotak.maxY, 2);
  if (dua.length === 2) return `${tanda}${dua}`;
  if (satu) return `${tanda}${satu}`;
  return "";
}

function jumlahTinta(kanvas: HTMLCanvasElement): number {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return 0;
  const { width, height } = kanvas;
  const img = ctx.getImageData(0, 0, width, height);
  let tinta = 0;
  for (let i = 0; i < img.data.length; i += 16) if (tintaPixel(img.data, i)) tinta += 1;
  return tinta;
}

function tombol(aktif = false): string {
  return `inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl px-3 text-sm font-black ${
    aktif ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200"
  }`;
}

function ProfesorIgil({ pesan, bicara, onUlang }: { pesan: string; bicara: boolean; onUlang: () => void }) {
  return (
    <div className="flex items-end gap-2">
      <button type="button" onClick={onUlang} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-200 text-4xl ring-2 ring-amber-400" aria-label="Putar suara Profesor IGIL">
        <span className={bicara ? "animate-bounce" : ""}>🦉</span>
      </button>
      <p className="max-w-xl rounded-2xl rounded-bl-md bg-amber-50 px-3 py-2 text-sm font-bold leading-snug text-amber-950 ring-2 ring-amber-200">
        <span className="mb-0.5 block text-[11px] font-black uppercase tracking-wide">Profesor IGIL</span>
        {pesan}
      </p>
    </div>
  );
}

function Titik({ rupa, bentuk }: { rupa: "biasa" | "biru" | "emas" | "hantu"; bentuk: Bentuk }) {
  if (rupa === "hantu") return <span className="h-3 w-3 rounded-full border border-dashed border-rose-500" />;
  if (bentuk === "segitiga") {
    const sisi = rupa === "emas" ? "border-b-amber-400" : rupa === "biru" ? "border-b-blue-500" : "border-b-indigo-500";
    return <span className={`h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent ${sisi} ${rupa === "emas" ? "drop-shadow" : ""}`} />;
  }
  const warna = rupa === "emas" ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]" : rupa === "biru" ? "bg-blue-500" : "bg-indigo-500";
  const radius = bentuk === "kubus" ? "rounded-sm" : "rounded-full";
  return (
    <span className={`relative inline-block h-3 w-3 ${radius} ${warna}`}>
      {bentuk === "apel" ? <span className="absolute -top-1 left-1 h-1.5 w-1 rounded-sm bg-emerald-600" /> : null}
    </span>
  );
}

function Kumpulan({
  judul,
  jumlah,
  sebelumnya,
  sorot,
  membesar,
  bentuk,
  rakit,
  pas,
}: {
  judul: string;
  jumlah: number;
  sebelumnya: number;
  sorot: boolean;
  membesar: boolean;
  bentuk: Bentuk;
  rakit?: boolean;
  pas?: boolean;
}) {
  const total = !sorot || membesar ? jumlah : Math.max(jumlah, sebelumnya);
  return (
    <div className={`min-w-0 rounded-xl px-1 py-2 ${rakit ? "border-2 border-dashed border-[#1C01A5]" : ""}`}>
      <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{judul}</p>
      <div className="mt-1 grid min-h-16 grid-cols-4 content-end justify-items-center gap-0.5">
        {Array.from({ length: total }, (_, indeks) => {
          let rupa: "biasa" | "biru" | "emas" | "hantu" = "biasa";
          if (sorot && membesar) rupa = indeks < sebelumnya && sebelumnya < jumlah ? "biru" : indeks < jumlah ? (sebelumnya > 0 && indeks >= sebelumnya ? "emas" : "biru") : "biasa";
          if (sorot && !membesar) rupa = indeks < jumlah ? "biru" : "hantu";
          return <Titik key={indeks} rupa={rupa} bentuk={bentuk} />;
        })}
      </div>
      <p className={`text-center text-xl font-black ${pas ? "text-emerald-600" : "text-blue-700"}`}>{jumlah}</p>
    </div>
  );
}

function KanvasLangkah({
  kunci,
  mode,
  diterima,
  label,
  onHasil,
}: {
  kunci: string;
  mode: ModeCoret;
  diterima: string[];
  label: string;
  onHasil: (benar: boolean, terbaca: string) => void;
}) {
  const refKanvas = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<{ x: number; y: number } | null>(null);
  const [ada, setAda] = useState(false);
  const [pesan, setPesan] = useState("");
  const [bantu, setBantu] = useState(false);

  const siapkan = useCallback(() => {
    const kanvas = refKanvas.current;
    const induk = kanvas?.parentElement;
    if (!kanvas || !induk) return;
    const lebar = Math.max(induk.clientWidth, 120);
    const tinggi = 112;
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
    setAda(false);
    setPesan("");
    setBantu(false);
  }, []);

  useEffect(() => {
    siapkan();
  }, [siapkan, kunci]);

  const titikDari = (event: AcaraPointer<HTMLCanvasElement>) => {
    const kotak = refKanvas.current?.getBoundingClientRect();
    if (!kotak) return { x: 0, y: 0 };
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const mulai = (event: AcaraPointer<HTMLCanvasElement>) => {
    event.preventDefault();
    const kanvas = refKanvas.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    try {
      kanvas.setPointerCapture(event.pointerId);
    } catch {
      /* tangkapan pointer tidak tersedia */
    }
    gambar.current = true;
    terakhir.current = titikDari(event);
  };

  const geser = (event: AcaraPointer<HTMLCanvasElement>) => {
    if (!gambar.current) return;
    event.preventDefault();
    const ctx = refKanvas.current?.getContext("2d");
    const sekarang = titikDari(event);
    if (!ctx || !terakhir.current) return;
    ctx.beginPath();
    ctx.moveTo(terakhir.current.x, terakhir.current.y);
    ctx.lineTo(sekarang.x, sekarang.y);
    ctx.stroke();
    terakhir.current = sekarang;
    setAda(true);
  };

  const lepas = (event: AcaraPointer<HTMLCanvasElement>) => {
    gambar.current = false;
    terakhir.current = null;
    try {
      refKanvas.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* pointer sudah lepas */
    }
  };

  const periksa = () => {
    const kanvas = refKanvas.current;
    if (!kanvas || !ada) {
      setPesan("Tulis atau gambar dulu.");
      onHasil(false, "");
      return;
    }
    const terbaca = mode === "aturan" ? kenaliAturan(kanvas) : "";
    let cocok = mode === "aturan" && diterima.includes(terbaca);
    let bacaAngka = terbaca;
    if (mode === "angka") {
      for (const contoh of diterima) {
        const baca = kenaliAngka(kanvas, contoh.length);
        if (baca) bacaAngka = baca;
        if (baca === contoh) cocok = true;
      }
    }
    const benar = cocok || (bantu && jumlahTinta(kanvas) > 18);
    setPesan(benar ? "Langkahmu tepat." : bacaAngka ? `Terbaca ${bacaAngka}. Contohnya ${diterima[0]}.` : `IGIL belum yakin. Contohnya ${diterima[0]}.`);
    if (!benar) setBantu(true);
    onHasil(benar, bacaAngka);
  };

  return (
    <div className="min-w-0">
      <p className="text-xs font-black uppercase text-[#1C01A5]">{label}</p>
      {bantu ? <p className="text-2xl font-black tracking-widest text-indigo-300">{diterima[0]}</p> : null}
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
        <canvas ref={refKanvas} aria-label="Kanvas tulis tangan" className="block w-full cursor-crosshair touch-none" style={{ touchAction: "none" }} onPointerDown={mulai} onPointerMove={geser} onPointerUp={lepas} onPointerCancel={lepas} />
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        <button type="button" className={tombol()} onClick={siapkan}>Hapus Coretan</button>
        <button type="button" className={tombol(true)} onClick={periksa}>Periksa Langkah</button>
      </div>
      {pesan ? <p className="mt-1 text-xs font-bold text-indigo-800">{pesan}</p> : null}
    </div>
  );
}

export default function SimulasiMtk4Bab3({ onBenar, onTutorEvent }: Props) {
  const [tab, setTab] = useState<TabLab>("gambar");
  const [bentuk, setBentuk] = useState<Bentuk>("kelereng");
  const [jenis, setJenis] = useState<JenisPola>("besar");
  const [sorot, setSorot] = useState(false);
  const [rakitan, setRakitan] = useState(0);
  const [awal, setAwal] = useState(3);
  const [aturan, setAturan] = useState(2);
  const [sembunyiBusur, setSembunyiBusur] = useState(false);
  const [sembunyiSuku, setSembunyiSuku] = useState(false);
  const [skenarioId, setSkenarioId] = useState<SkenarioId>("kursi");
  const [sorotTetangga, setSorotTetangga] = useState(false);
  const [misi, setMisi] = useState(0);
  const [sorotMisi, setSorotMisi] = useState(false);
  const [aturanMisi, setAturanMisi] = useState<number | null>(null);
  const [alatMisi, setAlatMisi] = useState(false);
  const [tulisBenar, setTulisBenar] = useState(false);
  const [suaraBenar, setSuaraBenar] = useState(false);
  const [pesan, setPesan] = useState("Pilih pola membesar atau mengecil. Lihat empat kumpulan dulu.");
  const [bicara, setBicara] = useState(false);
  const [menyimak, setMenyimak] = useState(false);
  const [log, setLog] = useState<LogBaris[]>([]);
  const mic = useRef<MesinMic | null>(null);
  const selesaiRef = useRef(false);
  const nomorLog = useRef(0);
  const terakhirBicara = useRef(0);

  const kirim = useCallback(
    (jenisEvent: string, isi: string, ekstra?: Record<string, unknown>, suara = true) => {
      onTutorEvent?.(jenisEvent, { pesan: isi, ...ekstra });
      const id = ++nomorLog.current;
      setLog((lama) => [...lama, { id, waktu: jam(), jenis: jenisEvent, pesan: isi }].slice(-5));
      setPesan(isi);
      const sekarang = Date.now();
      if (!suara || sekarang - terakhirBicara.current < 1500) return;
      terakhirBicara.current = sekarang;
      setBicara(true);
      ucapkan(isi, () => setBicara(false));
    },
    [onTutorEvent],
  );

  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    mic.current?.stop();
  }, []);

  const latihan = tab === "latihan";
  const misiGambar = latihan && misi === 0;
  const misiBilangan = latihan && misi === 1;
  const misiTengah = latihan && misi === 2;
  const membesar = misiGambar ? true : jenis === "besar";
  const angkaTetap = misiGambar ? [1, 4, 7] : deretGambar(jenis);
  const langkahGambar = 3;
  const operasiGambar = membesar ? "bertambah" : "berkurang";
  const targetGambar = angkaTetap[angkaTetap.length - 1] + (membesar ? langkahGambar : -langkahGambar);
  const skenario = SKENARIO.find((item) => item.id === skenarioId) ?? SKENARIO[0];
  const suku = Array.from({ length: 6 }, (_, indeks) => sukuKe(awal, aturan, indeks));
  const pasangan = skenario.nilai.flatMap((nilai, indeks) => (nilai !== null && skenario.nilai[indeks + 1] !== null ? [[indeks, indeks + 1]] : []));

  const resetJawab = () => {
    setTulisBenar(false);
    setSuaraBenar(false);
  };

  const gantiTab = (id: TabLab) => {
    setTab(id);
    resetJawab();
    if (id === "gambar") {
      setRakitan(0);
      setPesan("Pilih pola membesar atau mengecil. Lihat empat kumpulan dulu.");
    }
    if (id === "jembatan") setPesan("Atur suku awal dan aturan lompatan. Busur menghubungkan dua bilangan.");
    if (id === "konteks") setPesan("Ada suku yang kosong. Cari dua angka tetangga yang lengkap.");
    if (id === "latihan" && misi === 0) setPesan("Nyalakan sorotan +3. Rakit 10 persegi. Tulis 10. Ucapkan sepuluh.");
    if (id === "latihan" && misi === 1) setPesan("Barisan 45, 39, 33, 27. Pilih aturan berkurang 6. Tulis 21. Ucapkan dua puluh satu.");
    if (id === "latihan" && misi === 2) setPesan("Kursi 15, 20, kosong, 30, 35. Cari selisih tetangga, lalu tulis 25.");
  };

  const gantiJenis = (berikut: JenisPola) => {
    setJenis(berikut);
    setRakitan(0);
    setSorot(false);
    resetJawab();
    setPesan(berikut === "besar" ? "Pola gambar membesar. Benda berikutnya lebih banyak." : "Pola gambar mengecil. Benda berikutnya lebih sedikit.");
  };

  const gantiSorot = (untukMisi: boolean) => {
    if (untukMisi) {
      const nyala = !sorotMisi;
      setSorotMisi(nyala);
      if (nyala) kirim("BPG_VISUAL_DIFF_HIGHLIGHTED", pesanSorot("bertambah", 3), { operation: "bertambah", step: 3 });
      else setPesan("Sorotan perubahan dimatikan.");
      return;
    }
    const nyala = !sorot;
    setSorot(nyala);
    if (nyala) kirim("BPG_VISUAL_DIFF_HIGHLIGHTED", pesanSorot(operasiGambar, langkahGambar), { operation: operasiGambar, step: langkahGambar });
    else setPesan("Sorotan perubahan dimatikan.");
  };

  const ubahRakitan = (delta: 1 | -1) => {
    setRakitan((lama) => Math.max(0, Math.min(20, lama + delta)));
    resetJawab();
  };

  const cekRakitan = () => {
    const sekarang = rakitan;
    if (sekarang === targetGambar) {
      setPesan(misiGambar ? "Kumpulan 4 sudah 10 persegi." : `Kumpulan 5 sudah ${targetGambar} benda.`);
      return;
    }
    if (misiGambar) {
      setPesan("Kumpulan 3 ada 7. Setiap langkah bertambah 3. Kumpulan 4 ada 10.");
      return;
    }
    kirim("BPG_PATTERN_MISMATCH_HINT", pesanSalah(operasiGambar, langkahGambar, targetGambar), { operation: operasiGambar, step: langkahGambar, expected: targetGambar });
  };

  const gantiAturan = (nilai: number) => {
    const dariPlus = aturan > 0;
    setAturan(nilai);
    if (nilai < 0) {
      const cukup = -nilai * 5;
      setAwal((sekarang) => (sekarang < cukup ? Math.min(100, cukup) : sekarang));
    }
    resetJawab();
    if (dariPlus && nilai < 0) kirim("BPG_SHRINKING_NUMBER_PATTERN", PESAN_MENGECIL, { aturan: nilai });
    else setPesan(nilai > 0 ? "Pola bilangan membesar. Suku berikutnya lebih besar." : "Pola bilangan mengecil. Suku berikutnya lebih kecil.");
  };

  const pilihAturanMisi = (nilai: number) => {
    setAturanMisi(nilai);
    resetJawab();
    if (nilai === -6) kirim("BPG_SHRINKING_NUMBER_PATTERN", PESAN_MENGECIL, { aturan: -6 });
    else setPesan("Hitung 45 kurang 39. Selisihnya 6, jadi aturannya berkurang 6.");
  };

  const cariSelisih = (dariMisi: boolean) => {
    if (dariMisi) {
      setAlatMisi(true);
      kirim("BPG_MIDDLE_TERM_STRATEGY", PESAN_TENGAH, { skenario: "kursi", langkah: 5 });
      return;
    }
    setSorotTetangga(true);
    if (skenario.tengah) kirim("BPG_MIDDLE_TERM_STRATEGY", PESAN_TENGAH, { skenario: skenario.id, langkah: skenario.langkah });
    else setPesan(`Dua tingkat lengkap selisihnya ${skenario.langkah}. Tingkat berikutnya ${skenario.operasi} ${skenario.langkah}.`);
  };

  const harapan = (): { mode: ModeCoret; diterima: string[]; label: string; suara: string[] } => {
    if (misiGambar) return { mode: "angka", diterima: ["10"], label: "Tulis angka 10", suara: ["sepuluh", "10"] };
    if (misiBilangan) return { mode: "angka", diterima: ["21"], label: "Tulis suku 21", suara: ["dua puluh satu", "21"] };
    if (misiTengah) return { mode: "angka", diterima: ["25"], label: "Tulis 25 kursi", suara: ["dua puluh lima", "25"] };
    if (tab === "jembatan" && sembunyiBusur) {
      const tanda = tandaAturan(aturan);
      return { mode: "aturan", diterima: [tanda], label: `Tulis aturan ${tanda}`, suara: [kataLangkah(aturan), tanda, aturan > 0 ? "pola membesar" : "pola mengecil"] };
    }
    if (tab === "jembatan" && sembunyiSuku) {
      const kelima = suku[4];
      const keenam = suku[5];
      return {
        mode: "angka",
        diterima: [`${kelima}${keenam}`, String(kelima), String(keenam)],
        label: "Tulis suku ke-5 dan ke-6",
        suara: [sebut(keenam), String(keenam), aturan > 0 ? "pola membesar" : "pola mengecil"],
      };
    }
    if (tab === "jembatan") {
      const berikutnya = suku[5];
      return { mode: "angka", diterima: [String(berikutnya)], label: "Tulis suku ke-6", suara: [sebut(berikutnya), String(berikutnya), kataLangkah(aturan)] };
    }
    if (tab === "konteks") {
      return { mode: "angka", diterima: [String(skenario.jawab)], label: "Tulis suku yang kosong", suara: [sebut(skenario.jawab), String(skenario.jawab)] };
    }
    return {
      mode: "angka",
      diterima: [String(targetGambar)],
      label: "Tulis banyak benda kumpulan 5",
      suara: [sebut(targetGambar), String(targetGambar), membesar ? "pola membesar" : "pola mengecil"],
    };
  };

  const tugas = harapan();

  const dengar = (teks: string) => {
    const ok = cocokSuara(teks, tugas.suara);
    kirim("VOICE_ANSWERED", ok ? "Ucapanmu tepat." : `Coba ucapkan: ${tugas.suara[0]}.`, { benar: ok, transkrip: teks });
    if (ok) setSuaraBenar(true);
  };

  const mulaiMic = () => {
    const win = window as Window & { SpeechRecognition?: new () => MesinMic; webkitSpeechRecognition?: new () => MesinMic };
    const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!Konstruktor) {
      dengar(tugas.suara[0]);
      return;
    }
    mic.current?.stop();
    const rec = new Konstruktor();
    rec.lang = "id-ID";
    rec.onresult = (event) => {
      dengar(event.results[0][0].transcript);
      setMenyimak(false);
    };
    rec.onerror = () => setMenyimak(false);
    rec.onend = () => setMenyimak(false);
    mic.current = rec;
    setMenyimak(true);
    try {
      rec.start();
    } catch {
      setMenyimak(false);
      dengar(tugas.suara[0]);
    }
  };

  const misi1Siap = sorotMisi && rakitan === 10 && tulisBenar && suaraBenar;
  const misi2Siap = aturanMisi === -6 && tulisBenar && suaraBenar;
  const misi3Siap = alatMisi && tulisBenar;
  const misiSiap = misi === 0 ? misi1Siap : misi === 1 ? misi2Siap : misi3Siap;

  const bukaMisi = (indeks: number) => {
    setMisi(indeks);
    setRakitan(0);
    setSorotMisi(false);
    setAturanMisi(null);
    setAlatMisi(false);
    resetJawab();
    if (indeks === 0) setPesan("Nyalakan sorotan +3. Rakit 10 persegi. Tulis 10. Ucapkan sepuluh.");
    if (indeks === 1) setPesan("Barisan 45, 39, 33, 27. Pilih aturan berkurang 6. Tulis 21. Ucapkan dua puluh satu.");
    if (indeks === 2) setPesan("Kursi 15, 20, kosong, 30, 35. Cari selisih tetangga, lalu tulis 25.");
  };

  const lanjutMisi = () => {
    if (!misiSiap) return;
    if (misi < 2) {
      bukaMisi(misi + 1);
      return;
    }
    if (selesaiRef.current) return;
    selesaiRef.current = true;
    kirim("MISSION_COMPLETED", "Tiga misi selesai. Kamu bisa merakit pola, melanjutkan bilangan, dan mengisi suku tengah.", { misi: 3 });
    onBenar?.();
  };

  const judul =
    tab === "gambar" ? "Studio Pola Gambar Membesar & Mengecil" : tab === "jembatan" ? "Jembatan Pola Gambar ke Pola Bilangan" : tab === "konteks" ? "Simulator Konteks Nyata & Detektif Suku Tengah" : "Latihan Eksplorasi Terbimbing";
  const sorotAktif = misiGambar ? sorotMisi : sorot;
  const bentukAktif: Bentuk = misiGambar ? "kubus" : bentuk;

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-black text-[#1C01A5]">{judul}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {TAB.map((item) => (
            <button key={item.id} type="button" className={tombol(tab === item.id)} onClick={() => gantiTab(item.id)}>{item.label}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {tab === "gambar" || misiGambar ? (
          <>
            <div className={misiGambar ? "grid grid-cols-4 gap-1" : "grid grid-cols-5 gap-1"}>
              {angkaTetap.map((jumlah, indeks) => (
                <Kumpulan
                  key={angkaTetap.length === 3 ? `m-${indeks}` : `${jenis}-${indeks}`}
                  judul={`Kumpulan ${indeks + 1}`}
                  jumlah={jumlah}
                  sebelumnya={indeks === 0 ? jumlah : angkaTetap[indeks - 1]}
                  sorot={sorotAktif}
                  membesar={membesar}
                  bentuk={bentukAktif}
                />
              ))}
              <Kumpulan
                judul={misiGambar ? "Kumpulan 4" : "Kumpulan 5"}
                jumlah={rakitan}
                sebelumnya={angkaTetap[angkaTetap.length - 1]}
                sorot={sorotAktif}
                membesar={membesar}
                bentuk={bentukAktif}
                rakit
                pas={rakitan === targetGambar}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {misiGambar ? null : BENTUK.map((item) => (
                <button key={item.id} type="button" className={tombol(bentuk === item.id)} onClick={() => { setBentuk(item.id); resetJawab(); }}>{item.label}</button>
              ))}
              {misiGambar ? null : (
                <>
                  <button type="button" className={tombol(jenis === "besar")} onClick={() => gantiJenis("besar")}>Membesar</button>
                  <button type="button" className={tombol(jenis === "kecil")} onClick={() => gantiJenis("kecil")}>Mengecil</button>
                </>
              )}
              <button type="button" className={tombol(sorotAktif)} onClick={() => gantiSorot(misiGambar)}>Sorot perubahan</button>
              <button type="button" className={tombol()} onClick={() => ubahRakitan(1)}>+1</button>
              <button type="button" className={tombol()} onClick={() => ubahRakitan(-1)}>-1</button>
              <button type="button" className={tombol(rakitan === targetGambar)} onClick={cekRakitan}>Cek kumpulan</button>
            </div>
            {misiGambar ? <p className="text-sm font-black">Sorot: {sorotMisi ? "sudah" : "belum"}. Persegi: {rakitan === 10 ? "10 sudah" : `${rakitan} belum`}. Tulis: {tulisBenar ? "sudah" : "belum"}. Ucapan: {suaraBenar ? "sudah" : "belum"}.</p> : null}
          </>
        ) : null}

        {tab === "jembatan" || misiBilangan ? (
          <>
            {misiBilangan ? (
              <div className="grid grid-cols-5 gap-2">
                {[45, 39, 33, 27, null].map((nilai, indeks) => (
                  <div key={indeks} className="text-center">
                    <p className="text-[11px] font-black text-[#1C01A5]">Suku {indeks + 1}</p>
                    <p className="text-2xl font-black text-blue-700">{nilai ?? "?"}</p>
                    {indeks < 4 ? <p className="text-xs font-black text-emerald-700">{aturanMisi === -6 ? "−6" : "busur ?"}</p> : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {suku.map((nilai, indeks) => (
                  <div key={indeks} className="text-center">
                    <div className="mx-auto flex h-14 flex-col-reverse items-center justify-start gap-0.5">
                      {Array.from({ length: Math.min(6, Math.max(0, nilai)) }, (_, titik) => (
                        <span key={titik} className={`h-2 w-5 rounded-sm ${aturan < 0 ? "bg-orange-400" : "bg-blue-500"}`} />
                      ))}
                    </div>
                    <p className="text-2xl font-black text-blue-700">{sembunyiSuku && indeks >= 4 ? "?" : nilai}</p>
                    {indeks < 5 ? (
                      <p className="text-xs font-black text-emerald-700">
                        <svg viewBox="0 0 48 14" className="mx-auto h-3 w-10" aria-hidden><path d="M4 12 Q24 0 44 12" fill="none" stroke="#059669" strokeWidth="3" /></svg>
                        {sembunyiBusur ? "?" : tandaAturan(aturan)}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {misiBilangan ? (
                [-3, -6, -9].map((nilai) => (
                  <button key={nilai} type="button" className={tombol(aturanMisi === nilai)} onClick={() => pilihAturanMisi(nilai)}>{nilai}</button>
                ))
              ) : (
                <>
                  <button type="button" className={tombol()} onClick={() => { setAwal((nilai) => Math.max(1, nilai - 1)); resetJawab(); }}>Awal −1</button>
                  <span className="inline-flex min-h-12 min-w-12 items-center justify-center text-xl font-black text-blue-700">{awal}</span>
                  <button type="button" className={tombol()} onClick={() => { setAwal((nilai) => Math.min(100, nilai + 1)); resetJawab(); }}>Awal +1</button>
                  {ATURAN_NAIK.map((nilai) => (
                    <button key={nilai} type="button" className={tombol(aturan === nilai)} onClick={() => gantiAturan(nilai)}>+{nilai}</button>
                  ))}
                  {ATURAN_TURUN.map((nilai) => (
                    <button key={nilai} type="button" className={tombol(aturan === nilai)} onClick={() => gantiAturan(nilai)}>{nilai}</button>
                  ))}
                  <button type="button" className={tombol(sembunyiBusur)} onClick={() => { setSembunyiBusur((nyala) => !nyala); resetJawab(); }}>{sembunyiBusur ? "Tampilkan busur" : "Sembunyikan busur"}</button>
                  <button type="button" className={tombol(sembunyiSuku)} onClick={() => { setSembunyiSuku((nyala) => !nyala); resetJawab(); }}>{sembunyiSuku ? "Tampilkan suku" : "Sembunyikan suku 5–6"}</button>
                </>
              )}
            </div>
            {misiBilangan ? <p className="text-sm font-black">Aturan −6: {aturanMisi === -6 ? "sudah" : "belum"}. Tulis: {tulisBenar ? "sudah" : "belum"}. Ucapan: {suaraBenar ? "sudah" : "belum"}.</p> : null}
          </>
        ) : null}

        {tab === "konteks" || misiTengah ? (
          <>
            <div className={`grid gap-2 ${misiTengah ? "grid-cols-5" : "grid-cols-5"}`}>
              {(misiTengah ? [15, 20, null, 30, 35] : skenario.nilai).map((nilai, indeks) => {
                const nyala = misiTengah ? alatMisi && (indeks === 0 || indeks === 1 || indeks === 3 || indeks === 4) : sorotTetangga && pasangan.some((duo) => duo.includes(indeks));
                return (
                  <div key={indeks} className={`rounded-xl px-1 py-2 text-center ${nyala ? "ring-4 ring-amber-400" : ""}`}>
                    <p className="text-[11px] font-black text-[#1C01A5]">{misiTengah ? `Baris ${indeks + 1}` : skenario.label[indeks]}</p>
                    <div className="mx-auto mt-1 grid w-fit grid-cols-4 gap-0.5">
                      {Array.from({ length: Math.min(8, nilai ?? 0) }, (_, titik) => (
                        <span key={titik} className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
                      ))}
                    </div>
                    <p className="text-2xl font-black text-blue-700">{nilai ?? "?"}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {misiTengah ? null : SKENARIO.map((item) => (
                <button key={item.id} type="button" className={tombol(skenarioId === item.id)} onClick={() => { setSkenarioId(item.id); setSorotTetangga(false); resetJawab(); setPesan(`${item.nama}. Cari dua angka yang berdampingan lengkap.`); }}>{item.nama}</button>
              ))}
              <button type="button" className={tombol(misiTengah ? alatMisi : sorotTetangga)} onClick={() => cariSelisih(misiTengah)}>Cari selisih tetangga</button>
            </div>
            {misiTengah ? <p className="text-sm font-black">Aturan +5: {alatMisi ? "sudah" : "belum"}. Tulis 25: {tulisBenar ? "sudah" : "belum"}.</p> : <p className="text-sm font-black">{sorotTetangga ? `Selisih ${skenario.operasi} ${skenario.langkah}.` : "Tekan cari selisih dulu."}</p>}
          </>
        ) : null}

        {latihan ? (
          <div className="flex flex-wrap items-center gap-2">
            {[0, 1, 2].map((indeks) => (
              <button key={indeks} type="button" className={tombol(misi === indeks)} onClick={() => bukaMisi(indeks)}>Misi {indeks + 1}</button>
            ))}
            <button type="button" className={tombol(misiSiap)} disabled={!misiSiap} onClick={lanjutMisi}>{misi < 2 ? "Misi berikutnya" : "Selesai"}</button>
          </div>
        ) : null}

        <div className="grid items-end gap-3 lg:grid-cols-[auto_minmax(0,1fr)_16rem]">
          <ProfesorIgil pesan={pesan} bicara={bicara} onUlang={() => { setBicara(true); ucapkan(pesan, () => setBicara(false)); }} />
          <KanvasLangkah
            kunci={`${tab}-${misi}-${jenis}-${aturan}-${skenarioId}-${sembunyiBusur}-${sembunyiSuku}`}
            mode={tugas.mode}
            diterima={tugas.diterima}
            label={tugas.label}
            onHasil={(benar, terbaca) => {
              setTulisBenar(benar);
              kirim("HANDWRITING_CHECKED", benar ? "Coretan sesuai langkah." : `Coretan belum pas. ${tugas.label}.`, { benar, terbaca });
            }}
          />
          <div className="flex flex-col gap-2">
            <button type="button" className={tombol(menyimak)} onClick={mulaiMic}>{menyimak ? "Mendengar..." : "Mikrofon"}</button>
            <button type="button" className={tombol()} onClick={() => dengar(tugas.suara[0])}>Simulasi suara</button>
            <p className="text-xs font-bold text-indigo-700">Ucapkan: {tugas.suara[0]}</p>
          </div>
        </div>
      </div>

      <div className="px-1 text-xs">
        <p className="font-black">Log Pedagogis BPG-IGIL</p>
        {log.length === 0 ? <p className="text-slate-500">Belum ada jejak.</p> : log.map((baris) => (
          <p key={baris.id} className="truncate"><span className="font-black">{baris.waktu} {baris.jenis}</span> · {baris.pesan}</p>
        ))}
      </div>
    </div>
  );
}
