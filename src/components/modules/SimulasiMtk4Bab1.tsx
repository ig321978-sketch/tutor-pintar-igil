"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KelaminGuru } from "@/lib/guru";

type Rak = [number, number, number, number, number];
type TabLab = "nilai" | "bengkel" | "faktor" | "latihan";
type Alat = "balok" | "uang";
type Operasi = "tambah" | "kurang" | "kali" | "bagi";
type ModeCoret = "angka" | "busur";
type LogBaris = { waktu: string; jenis: string; pesan: string };
type Pasangan = [number, number];

export type TutorEventMtk4 = {
  pesan: string;
  [kunci: string]: unknown;
};

type Props = {
  kelas?: string;
  kelamin?: KelaminGuru;
  onBenar?: () => void;
  onTutorEvent?: (eventType: string, payload: TutorEventMtk4) => void;
};

const TAB: { id: TabLab; label: string }[] = [
  { id: "nilai", label: "Nilai Tempat" },
  { id: "bengkel", label: "Bengkel Hitung" },
  { id: "faktor", label: "Faktor" },
  { id: "latihan", label: "Latihan" },
];

const NAMA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const TARGET_FAKTOR = [12, 15, 18, 20, 24, 30];
const DASAR_LOMPAT = [3, 4, 6, 7, 8];
const PESAN_NOL =
  "Ingat panduan di kelas: meskipun tidak ada balok ratusan pada 4.058, angka 0 wajib ditulis sebagai penjaga nilai tempat supaya tidak terbaca 458!";
const PESAN_BANDING =
  "Jangan terkecoh angka 9 yang berderet pada 2.999! Bandingkan ribuannya dulu: 3 ribuan pasti lebih besar daripada 2 ribuan.";
const PESAN_REGROUP =
  "Lihat hubungan cara panjang dan cara pendek. Angka 1 kecil di atas puluhan itu hasil menyimpan. Nilainya 10 atau 100.";

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

function jam(): string {
  return new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function titik(n: number): string {
  return n.toLocaleString("id-ID");
}

function bacaBawah(n: number): string {
  if (n === 0) return "";
  if (n < 10) return NAMA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${NAMA[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s ? `${NAMA[p]} puluh ${NAMA[s]}` : `${NAMA[p]} puluh`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const kepala = r === 1 ? "seratus" : `${NAMA[r]} ratus`;
  return sisa ? `${kepala} ${bacaBawah(sisa)}` : kepala;
}

function baca(n: number): string {
  if (n === 0) return "nol";
  if (n === 10000) return "sepuluh ribu";
  if (n < 1000) return bacaBawah(n);
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const kepala = ribu === 1 ? "seribu" : ribu === 10 ? "sepuluh ribu" : `${bacaBawah(ribu)} ribu`;
  return sisa ? `${kepala} ${bacaBawah(sisa)}` : kepala;
}

function nilaiRak(rak: Rak): number {
  return rak[0] * 10000 + rak[1] * 1000 + rak[2] * 100 + rak[3] * 10 + rak[4];
}

function rakDari(n: number): Rak {
  const batas = Math.max(0, Math.min(10000, n));
  if (batas === 10000) return [1, 0, 0, 0, 0];
  return [0, Math.floor(batas / 1000), Math.floor(batas / 100) % 10, Math.floor(batas / 10) % 10, batas % 10];
}

function bentukPanjang(n: number): string {
  if (n >= 10000) return "10.000 = 10.000";
  const ri = Math.floor(n / 1000);
  const ra = Math.floor(n / 100) % 10;
  const pu = Math.floor(n / 10) % 10;
  const sa = n % 10;
  const ratus = ra === 0 ? "0" : titik(ra * 100);
  const puluh = pu === 0 ? "0" : String(pu * 10);
  return `${titik(ri * 1000)} + ${ratus} + ${puluh} + ${sa} = ${titik(n)}`;
}

function ubahRak(rak: Rak, indeks: number, delta: 1 | -1): Rak {
  const next: Rak = [...rak];
  if (delta > 0) {
    next[indeks] += 1;
    for (let i = indeks; i > 0; i -= 1) {
      if (next[i] < 10) break;
      next[i] = 0;
      next[i - 1] += 1;
    }
    if (next[0] > 1 || (next[0] === 1 && next.slice(1).some((angka) => angka > 0))) return [1, 0, 0, 0, 0];
    return next;
  }
  if (next[indeks] > 0) {
    next[indeks] -= 1;
    return next;
  }
  let sumber = indeks - 1;
  while (sumber >= 0 && next[sumber] === 0) sumber -= 1;
  if (sumber < 0) return next;
  next[sumber] -= 1;
  for (let k = sumber + 1; k < indeks; k += 1) next[k] = 9;
  next[indeks] = 9;
  return next;
}

function jejakKurang(atas: number, bawah: number): { ratus: number; puluh: number; satu: number } {
  let ratus = Math.floor(atas / 100);
  let puluh = Math.floor((atas % 100) / 10);
  let satu = atas % 10;
  const pb = Math.floor((bawah % 100) / 10);
  const sb = bawah % 10;
  if (satu < sb) {
    puluh -= 1;
    satu += 10;
  }
  if (puluh < pb) {
    ratus -= 1;
    puluh += 10;
  }
  return { ratus, puluh, satu };
}

function rakPertamaBeda(a: number, b: number): number {
  const da = rakDari(Math.min(a, 9999));
  const db = rakDari(Math.min(b, 9999));
  for (let i = 1; i <= 4; i += 1) {
    if (da[i] !== db[i]) return i;
  }
  return -1;
}

function normal(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const n = normal(teks).replace(/\s/g, "");
  if (!n) return false;
  return alias.some((item) => {
    const a = normal(item).replace(/\s/g, "");
    return a.length > 0 && (n.includes(a) || a.includes(n));
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

function dukungMic(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as Window & { SpeechRecognition?: new () => MesinMic; webkitSpeechRecognition?: new () => MesinMic };
  return Boolean(win.SpeechRecognition ?? win.webkitSpeechRecognition);
}

function tintaPixel(data: Uint8ClampedArray, i: number): boolean {
  return data[i + 3] > 50 && data[i] < 170 && data[i + 2] > data[i] + 15;
}

function kenaliSatu(
  data: Uint8ClampedArray,
  width: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): string {
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

function kenaliAngka(kanvas: HTMLCanvasElement, jumlah: number): string {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return "";
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
  if (tinta < 12) return "";
  const lebar = Math.max(8, maxX - minX);
  const angka: string[] = [];
  for (let s = 0; s < jumlah; s += 1) {
    const huruf = kenaliSatu(img.data, width, minX + (lebar * s) / jumlah, minY, minX + (lebar * (s + 1)) / jumlah, maxY);
    if (!huruf) return "";
    angka.push(huruf);
  }
  return angka.join("");
}

function adaBusur(kanvas: HTMLCanvasElement): boolean {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return false;
  const { width, height } = kanvas;
  const img = ctx.getImageData(0, 0, width, height);
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  let tinta = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (!tintaPixel(img.data, (y * width + x) * 4)) continue;
      tinta += 1;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  return tinta > 20 && maxX - minX > 36 && maxY - minY > 16;
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
      <p className="rounded-2xl rounded-bl-md bg-amber-50 px-3 py-2 text-sm font-bold leading-snug text-amber-950 ring-2 ring-amber-200">
        <span className="mb-0.5 block text-[11px] font-black uppercase tracking-wide">Profesor IGIL</span>
        {pesan}
      </p>
    </div>
  );
}

function Potongan({ alat, jenis, jumlah }: { alat: Alat; jenis: "ribu" | "ratus" | "puluh" | "satu" | "bundle"; jumlah: number }) {
  if (jenis === "bundle") {
    return <div className="rounded-lg bg-fuchsia-200 px-2 py-3 text-center text-xs font-black">{alat === "uang" ? "Uang 10.000" : "1 ikat 10.000"}</div>;
  }
  const gaya =
    jenis === "ribu"
      ? alat === "uang"
        ? "h-10 min-w-12 rounded-md bg-emerald-300 text-[10px]"
        : "h-8 w-8 rounded bg-amber-400"
      : jenis === "ratus"
        ? alat === "uang"
          ? "h-9 min-w-10 rounded-md bg-sky-300 text-[10px]"
          : "h-7 w-7 rounded-sm bg-orange-300"
        : jenis === "puluh"
          ? alat === "uang"
            ? "h-8 min-w-8 rounded-md bg-yellow-300 text-[10px]"
            : "h-8 w-2 rounded-sm bg-sky-500"
          : alat === "uang"
            ? "h-8 w-8 rounded-full bg-lime-200 text-[10px]"
            : "h-3 w-3 rounded-sm bg-emerald-500";
  const label = alat === "uang" ? (jenis === "ribu" ? "1.000" : jenis === "ratus" ? "100" : jenis === "puluh" ? "10" : "1") : "";
  return (
    <div className="flex max-h-16 flex-wrap content-start gap-0.5">
      {Array.from({ length: jumlah }, (_, i) => (
        <span key={i} className={`inline-flex items-center justify-center font-black ${gaya}`}>
          {label}
        </span>
      ))}
    </div>
  );
}

function KanvasLangkah({
  kunci,
  mode,
  expected,
  label,
  onHasil,
}: {
  kunci: string;
  mode: ModeCoret;
  expected: string;
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

  const titikDari = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kotak = refKanvas.current?.getBoundingClientRect();
    if (!kotak) return { x: 0, y: 0 };
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const mulai = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const kanvas = refKanvas.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    kanvas.setPointerCapture(event.pointerId);
    gambar.current = true;
    terakhir.current = titikDari(event);
    ctx.beginPath();
    ctx.moveTo(terakhir.current.x, terakhir.current.y);
  };

  const geser = (event: React.PointerEvent<HTMLCanvasElement>) => {
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

  const lepas = (event: React.PointerEvent<HTMLCanvasElement>) => {
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
    if (mode === "busur") {
      const benar = adaBusur(kanvas) || (bantu && jumlahTinta(kanvas) > 12);
      setPesan(benar ? "Lengkungnya kebaca." : "Gambar lengkung yang lebih lebar.");
      if (!benar) setBantu(true);
      onHasil(benar, benar ? "busur" : "");
      return;
    }
    const terbaca = kenaliAngka(kanvas, expected.length);
    const longgar = bantu && jumlahTinta(kanvas) > 18;
    const benar = terbaca === expected || longgar;
    setPesan(benar ? "Langkahmu tepat." : terbaca ? `Terbaca ${terbaca}. Contohnya ${expected}.` : `IGIL belum yakin. Contohnya ${expected}.`);
    if (!benar) setBantu(true);
    onHasil(benar, terbaca);
  };

  return (
    <div className="min-w-0">
      <p className="text-xs font-black uppercase text-[#1C01A5]">{label}</p>
      {bantu && mode === "angka" ? <p className="text-2xl font-black tracking-widest text-indigo-300">{expected}</p> : null}
      <div className="mt-1 overflow-hidden rounded-xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
        <canvas ref={refKanvas} className="block w-full cursor-crosshair touch-none" style={{ touchAction: "none" }} onPointerDown={mulai} onPointerMove={geser} onPointerUp={lepas} onPointerCancel={lepas} />
      </div>
      <div className="mt-1 flex flex-wrap gap-1">
        <button type="button" className={tombol()} onClick={siapkan}>Hapus Coretan</button>
        <button type="button" className={tombol(true)} onClick={periksa}>Periksa Langkah</button>
      </div>
      {pesan ? <p className="mt-1 text-xs font-bold text-indigo-800">{pesan}</p> : null}
    </div>
  );
}

export default function SimulasiMtk4Bab1({ onBenar, onTutorEvent }: Props) {
  const [tab, setTab] = useState<TabLab>("nilai");
  const [alat, setAlat] = useState<Alat>("balok");
  const [rak, setRak] = useState<Rak>([0, 1, 2, 3, 4]);
  const [lawan, setLawan] = useState(4005);
  const [operasi, setOperasi] = useState<Operasi>("tambah");
  const [a, setA] = useState(348);
  const [b, setB] = useState(275);
  const [lihat, setLihat] = useState(false);
  const [kaliA, setKaliA] = useState(124);
  const [kaliB, setKaliB] = useState(3);
  const [bagiA, setBagiA] = useState(84);
  const [bagiB, setBagiB] = useState(4);
  const [target, setTarget] = useState(18);
  const [pembagi, setPembagi] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<Pasangan[]>([]);
  const [dasar, setDasar] = useState(3);
  const [lompat, setLompat] = useState(0);
  const [misi, setMisi] = useState(0);
  const [tulisBenar, setTulisBenar] = useState(false);
  const [suaraBenar, setSuaraBenar] = useState(false);
  const [pesan, setPesan] = useState("Susun bilangan di empat kamar. Titik hanya pemisah ribuan.");
  const [bicara, setBicara] = useState(false);
  const [menyimak, setMenyimak] = useState(false);
  const [log, setLog] = useState<LogBaris[]>([]);
  const mic = useRef<MesinMic | null>(null);
  const selesaiRef = useRef(false);

  const bilangan = nilaiRak(rak);
  const beda = rakPertamaBeda(bilangan, lawan);
  const namaRak = ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];

  const kirim = useCallback(
    (jenis: string, isi: string, ekstra?: Record<string, unknown>) => {
      onTutorEvent?.(jenis, { pesan: isi, ...ekstra });
      setLog((lama) => [...lama, { waktu: jam(), jenis, pesan: isi }].slice(-5));
      setPesan(isi);
      setBicara(true);
      ucapkan(isi, () => setBicara(false));
    },
    [onTutorEvent],
  );

  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    mic.current?.stop();
  }, []);

  const pakaiRak = (next: Rak, preset = false) => {
    const sebelum = rak;
    setRak(next);
    const n = nilaiRak(next);
    const nolBaru = next[2] === 0 && sebelum[2] !== 0 || next[3] === 0 && sebelum[3] !== 0;
    if (n >= 1000 && n < 10000 && (next[2] === 0 || next[3] === 0) && (preset || nolBaru)) {
      kirim("BPG_ZERO_PLACEHOLDER_HINT", PESAN_NOL, { bilangan: titik(n) });
      return;
    }
    setPesan(`${titik(n)} dibaca ${baca(n)}.`);
  };

  const setPasanganUji = (kiri: number, kanan: number) => {
    setRak(rakDari(kiri));
    setLawan(kanan);
    if ((kiri === 2999 && kanan === 3001) || (kiri === 3001 && kanan === 2999)) {
      kirim("BPG_COMPARE_FROM_LEFT", PESAN_BANDING, { kiri, kanan });
      return;
    }
    if (rakDari(kiri)[2] === 0 || rakDari(kiri)[3] === 0) {
      kirim("BPG_ZERO_PLACEHOLDER_HINT", PESAN_NOL, { bilangan: titik(kiri) });
      return;
    }
    setPesan(`${titik(kiri)} dan ${titik(kanan)} dibanding dari kiri.`);
  };

  const hasilTambah = a + b;
  const hasilKurang = a - b;
  const hasilKali = kaliA * kaliB;
  const puluhBagi = Math.floor(bagiA / 10);
  const satuBagi = bagiA % 10;
  const puluhWadah = Math.floor(puluhBagi / bagiB);
  const sisaPuluh = puluhBagi % bagiB;
  const satuanTotal = sisaPuluh * 10 + satuBagi;
  const satuWadah = Math.floor(satuanTotal / bagiB);
  const sisaBagi = satuanTotal % bagiB;
  const hasilBagi = puluhWadah * 10 + satuWadah;

  const faktorUtuh = pasangan.flatMap(([kiri, kanan]) => [kiri, kanan]);
  const faktorUnik = [...new Set(faktorUtuh)].sort((x, y) => x - y);
  const faktorEnamBelas = [1, 2, 4, 8, 16].every((angka) => faktorUnik.includes(angka));

  const harapan = (): { mode: ModeCoret; expected: string; label: string; suara: string[] } => {
    if (tab === "latihan" && misi === 0) {
      return { mode: "angka", expected: "80", label: "Tulis nilai angka 8", suara: ["enam ribu delapan puluh empat", "6084"] };
    }
    if (tab === "latihan" && misi === 1) {
      return { mode: "angka", expected: "355", label: "Tulis hasil 523 − 168", suara: ["tiga ratus lima puluh lima", "355"] };
    }
    if (tab === "latihan" && misi === 2) {
      return { mode: "busur", expected: "busur", label: "Gambar lengkung pasangan faktor", suara: ["lima", "5 faktor", "lima faktor"] };
    }
    if (tab === "bengkel") {
      const hasil = operasi === "tambah" ? hasilTambah : operasi === "kurang" ? hasilKurang : operasi === "kali" ? hasilKali : hasilBagi;
      return { mode: "angka", expected: String(hasil), label: "Tulis hasil hitung", suara: [baca(hasil), String(hasil)] };
    }
    if (tab === "faktor") {
      const daftar = faktorUnik.length ? faktorUnik.map((angka) => NAMA[angka] ?? String(angka)).join(" ") : "faktor";
      return { mode: "busur", expected: "busur", label: "Gambar busur pelangi faktor", suara: [daftar, "faktor"] };
    }
    return { mode: "angka", expected: String(bilangan), label: "Tulis lambang bilangan", suara: [baca(bilangan), String(bilangan), titik(bilangan)] };
  };

  const tugas = harapan();

  const dengar = (teks: string) => {
    const ok = cocokSuara(teks, tugas.suara);
    kirim(ok ? "VOICE_ANSWERED" : "VOICE_ANSWERED", ok ? "Ucapanmu tepat." : `Coba ucapkan: ${tugas.suara[0]}.`, { benar: ok, transkrip: teks });
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
    rec.start();
  };

  const ujiPembagi = (angka: number, sasaran = target) => {
    setPembagi(angka);
    const sisa = sasaran % angka;
    if (sisa === 0) {
      const pasanganBaru: Pasangan = [Math.min(angka, sasaran / angka), Math.max(angka, sasaran / angka)];
      setPasangan((lama) => (lama.some(([kiri, kanan]) => kiri === pasanganBaru[0] && kanan === pasanganBaru[1]) ? lama : [...lama, pasanganBaru]));
      setPesan(`${angka} membagi ${sasaran} tanpa sisa. ${pasanganBaru[0]} × ${pasanganBaru[1]} = ${sasaran}.`);
      return;
    }
    kirim(
      "BPG_NON_FACTOR_REMAINDER",
      `Karena ${sasaran} dibagi ${angka} masih bersisa ${sisa} ubin, maka ${angka} BUKAN faktor dari ${sasaran}. Faktor harus membagi habis tanpa sisa!`,
      { target: sasaran, divisor: angka, rem: sisa },
    );
  };

  const misi1Siap = bilangan === 6084 && tulisBenar && suaraBenar;
  const misi2Siap = operasi === "kurang" && a === 523 && b === 168 && lihat && tulisBenar;
  const misi3Siap = target === 16 && faktorEnamBelas && tulisBenar && suaraBenar;
  const misiSiap = misi === 0 ? misi1Siap : misi === 1 ? misi2Siap : misi3Siap;

  const lanjutMisi = () => {
    if (misi < 2) {
      const berikut = misi + 1;
      setMisi(berikut);
      setTulisBenar(false);
      setSuaraBenar(false);
      if (berikut === 1) {
        setOperasi("kurang");
        setA(523);
        setB(168);
        setLihat(false);
        setPesan("523 − 168. Satuan 3 kurang dari 8. Tekan tombol meminjam, lalu tulis 355.");
      } else {
        setTarget(16);
        setPasangan([]);
        setPembagi(null);
        setPesan("Uji pembagi 16. Faktornya 1, 2, 4, 8, dan 16. Lalu ucapkan lima.");
      }
      return;
    }
    if (selesaiRef.current) return;
    selesaiRef.current = true;
    kirim("MISSION_COMPLETED", "Tiga misi selesai. Kamu teliti membaca, menghitung, dan mencari faktor.", { misi: 3 });
    onBenar?.();
  };

  const bukaMisi = (indeks: number) => {
    setMisi(indeks);
    setTulisBenar(false);
    setSuaraBenar(false);
    if (indeks === 0) setPesan("Susun 6.084. Nilai angka 8 adalah 80. Bacanya enam ribu delapan puluh empat.");
    if (indeks === 1) {
      setOperasi("kurang");
      setA(523);
      setB(168);
      setLihat(false);
      setPesan("Bongkar puluhan dan ratusan pada 523 − 168. Hasilnya 355.");
    }
    if (indeks === 2) {
      setTarget(16);
      setPasangan([]);
      setPembagi(null);
      setPesan("Cari semua faktor 16, gambar lengkungnya, lalu ucapkan lima.");
    }
  };

  const tampilNilai = tab === "nilai" || (tab === "latihan" && misi === 0);
  const tampilBengkel = tab === "bengkel" || (tab === "latihan" && misi === 1);
  const tampilFaktor = tab === "faktor" || (tab === "latihan" && misi === 2);
  const ringkas = tab === "latihan";

  return (
    <div className="flex flex-col gap-2 text-[#1C01A5]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TAB.map((item) => (
          <button key={item.id} type="button" className={tombol(tab === item.id)} onClick={() => { setTab(item.id); setTulisBenar(false); setSuaraBenar(false); }}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-3 ring-2 ring-indigo-100">
        {tampilNilai ? (
          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_17rem]">
            <div>
              <p className="text-center text-sm font-black">{bentukPanjang(bilangan)}</p>
              <p className="text-center text-sm font-bold text-indigo-700">{baca(bilangan)}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {namaRak.map((nama, indeks) => (
                  <div key={nama} className={`rounded-xl p-2 ${beda === indeks ? "bg-amber-100 ring-2 ring-amber-400" : "bg-indigo-50"}`}>
                    <p className="text-center text-[11px] font-black uppercase">{nama}</p>
                    <p className="text-center text-3xl font-black text-blue-700">{rak[indeks]}</p>
                    <p className="text-center text-[11px] font-bold">nilai {titik(rak[indeks] * 10 ** (4 - indeks))}</p>
                    <div className="mt-1 min-h-16">
                      <Potongan alat={alat} jenis={indeks === 0 ? "bundle" : indeks === 1 ? "ribu" : indeks === 2 ? "ratus" : indeks === 3 ? "puluh" : "satu"} jumlah={indeks === 0 ? rak[0] : rak[indeks]} />
                    </div>
                    <div className="mt-1 flex justify-center gap-1">
                      <button type="button" className={tombol()} onClick={() => pakaiRak(ubahRak(rak, indeks, -1))} aria-label={`Kurangi ${nama}`}>−</button>
                      <button type="button" className={tombol(true)} onClick={() => pakaiRak(ubahRak(rak, indeks, 1))} aria-label={`Tambah ${nama}`}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              {ringkas ? null : (
                <div className="mt-3">
                  <svg viewBox="0 0 400 56" className="h-14 w-full">
                    <line x1="16" y1="28" x2="384" y2="28" stroke="#1C01A5" strokeWidth="3" />
                    <text x="16" y="48" fontSize="12" fill="#1C01A5">0</text>
                    <text x="190" y="48" fontSize="12" fill="#1C01A5">5.000</text>
                    <text x="350" y="48" fontSize="12" fill="#1C01A5">10.000</text>
                    <circle cx={16 + (bilangan / 10000) * 368} cy="28" r="7" fill="#1C01A5" />
                    <circle cx={16 + (lawan / 10000) * 368} cy="28" r="7" fill="#F59E0B" />
                  </svg>
                  <p className="text-center text-sm font-black">
                    {titik(bilangan)} {bilangan === lawan ? "=" : bilangan > lawan ? ">" : "<"} {titik(lawan)}
                    {beda > 0 ? ` · beda di ${namaRak[beda]}` : ""}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button type="button" className={tombol(alat === "balok")} onClick={() => setAlat("balok")}>Balok</button>
                <button type="button" className={tombol(alat === "uang")} onClick={() => setAlat("uang")}>Uang</button>
              </div>
              {ringkas ? (
                <p className="text-sm font-bold">Target misi: 6 ribuan, 0 ratusan, 8 puluhan, 4 satuan.</p>
              ) : (
                <>
                  <button type="button" className={tombol()} onClick={() => setPasanganUji(4050, 4005)}>Uji Nol Tengah (4.050 vs 4.005)</button>
                  <button type="button" className={tombol()} onClick={() => setPasanganUji(2999, 3001)}>Uji Jebakan (2.999 vs 3.001)</button>
                  <button type="button" className={tombol()} onClick={() => { setRak([1, 0, 0, 0, 0]); setLawan(10000); setPesan("Sepuluh ribu. Satu ikat puluh ribuan."); }}>Genapkan 10.000!</button>
                </>
              )}
            </div>
          </div>
        ) : null}

        {tampilBengkel ? (
          <div className="flex flex-col gap-2">
            {ringkas ? null : (
              <div className="flex flex-wrap gap-2">
                {([
                  ["tambah", "Jumlah"],
                  ["kurang", "Selisih"],
                  ["kali", "Kali"],
                  ["bagi", "Bagi"],
                ] as [Operasi, string][]).map(([id, label]) => (
                  <button key={id} type="button" className={tombol(operasi === id)} onClick={() => { setOperasi(id); setLihat(false); }}>{label}</button>
                ))}
              </div>
            )}
            {operasi === "tambah" || operasi === "kurang" ? (
              <div className="grid gap-3 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase">Cara panjang</p>
                  <p className="text-lg font-black text-blue-700">{a} = {Math.floor(a / 100) * 100} + {Math.floor((a % 100) / 10) * 10} + {a % 10}</p>
                  <p className="text-lg font-black text-blue-700">{b} = {Math.floor(b / 100) * 100} + {Math.floor((b % 100) / 10) * 10} + {b % 10}</p>
                  {lihat && operasi === "tambah" ? (
                    <p className="text-sm font-bold">Satuan {(a % 10) + (b % 10)}. Puluhan menyimpan ke kiri. Hasil <span className="text-2xl text-emerald-600">{hasilTambah}</span>.</p>
                  ) : null}
                  {lihat && operasi === "kurang" ? (
                    <p className="text-sm font-bold">
                      {a % 10 < b % 10 ? "Satuan meminjam 1 dari puluhan." : "Satuan cukup."}
                      {Math.floor((a % 100) / 10) - (a % 10 < b % 10 ? 1 : 0) < Math.floor((b % 100) / 10) ? " Ratusan memberi 1." : ""}
                      {" "}Hasil <span className="text-2xl text-emerald-600">{hasilKurang}</span>.
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-xs font-black uppercase">Cara pendek</p>
                  {lihat && operasi === "tambah" ? <p className="text-sm font-black text-rose-600">Angka 1 kecil naik ke rak kiri.</p> : null}
                  {lihat && operasi === "kurang" ? <p className="text-sm font-black text-rose-600">Sesudah meminjam: ratusan {jejakKurang(a, b).ratus}, puluhan {jejakKurang(a, b).puluh}, satuan {jejakKurang(a, b).satu}.</p> : null}
                  <p className="text-3xl font-black text-blue-700">{operasi === "tambah" ? "+" : "−"} {a} dan {b}</p>
                  <p className="text-3xl font-black text-emerald-600">{lihat ? titik(operasi === "tambah" ? hasilTambah : hasilKurang) : "?"}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" className={tombol()} onClick={() => setA((n) => Math.max(operasi === "kurang" ? b : 0, n - 1))}>A −</button>
                    <button type="button" className={tombol()} onClick={() => setA((n) => Math.min(operasi === "tambah" ? 1000 - b : 999, n + 1))}>A +</button>
                    <button type="button" className={tombol()} onClick={() => setB((n) => Math.max(0, n - 1))}>B −</button>
                    <button type="button" className={tombol()} onClick={() => setB((n) => Math.min(operasi === "kurang" ? a : 1000 - a, n + 1))}>B +</button>
                  </div>
                </div>
                <button
                  type="button"
                  className={`${tombol(true)} col-span-full`}
                  onClick={() => {
                    setLihat(true);
                    kirim("BPG_REGROUP_OPERATION", PESAN_REGROUP, { operasi, a, b });
                  }}
                >
                  Lakukan Menyimpan / Meminjam
                </button>
              </div>
            ) : null}
            {operasi === "kali" && !ringkas ? (
              <div>
                <p className="text-sm font-black">{kaliA} × {kaliB}</p>
                <div className="mt-2 flex h-24 items-end gap-1">
                  {String(kaliA).padStart(3, "0").split("").map((huruf, indeks) => {
                    const tempat = 10 ** (2 - indeks);
                    const bagian = Number(huruf) * tempat * kaliB;
                    if (Number(huruf) === 0) return null;
                    return (
                      <div key={tempat} className="flex flex-col justify-end">
                        <div className="rounded-t-lg bg-indigo-200" style={{ width: 48 + Number(huruf) * 8, height: 28 + kaliB * 8 }} />
                        <p className="text-xs font-black">{titik(Number(huruf) * tempat)} × {kaliB} = {titik(bagian)}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-2xl font-black text-emerald-600">Total {titik(hasilKali)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" className={tombol()} onClick={() => { setKaliA(124); setKaliB(3); }}>124 × 3</button>
                  <button type="button" className={tombol()} onClick={() => { setKaliA(26); setKaliB(4); }}>26 × 4</button>
                </div>
              </div>
            ) : null}
            {operasi === "bagi" && !ringkas ? (
              <div>
                <p className="text-sm font-black">{bagiA} ÷ {bagiB}</p>
                <p className="text-sm font-bold">{puluhBagi} puluhan dibagi {bagiB} = {puluhWadah} tiap wadah. Sisa puluhan {sisaPuluh} dibongkar jadi satuan.</p>
                <p className="text-sm font-bold">Satuan yang dibagikan {satuanTotal}. Tiap wadah dapat {satuWadah}. Sisa {sisaBagi}.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Array.from({ length: bagiB }, (_, wadah) => (
                    <div key={wadah} className="min-h-16 min-w-16 rounded-xl bg-amber-50 p-2 ring-2 ring-amber-200">
                      <p className="text-[11px] font-black">Wadah {wadah + 1}</p>
                      <p className="text-sm font-black">{puluhWadah} puluh + {satuWadah}</p>
                    </div>
                  ))}
                </div>
                <p className="text-2xl font-black text-emerald-600">Hasil {hasilBagi}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button type="button" className={tombol()} onClick={() => { setBagiA(84); setBagiB(4); }}>84 ÷ 4</button>
                  <button type="button" className={tombol()} onClick={() => { setBagiA(96); setBagiB(3); }}>96 ÷ 3</button>
                  <button type="button" className={tombol()} onClick={() => { setBagiA(52); setBagiB(4); }}>52 ÷ 4 bongkar</button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {tampilFaktor ? (
          <div className="grid gap-3 lg:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase">Ubin faktor {target}</p>
              {ringkas ? null : (
                <div className="mt-1 flex flex-wrap gap-1">
                  {TARGET_FAKTOR.map((angka) => (
                    <button key={angka} type="button" className={tombol(target === angka)} onClick={() => { setTarget(angka); setPasangan([]); setPembagi(null); }}>{angka}</button>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-1">
                {Array.from({ length: target }, (_, i) => i + 1).map((angka) => (
                  <button key={angka} type="button" className={tombol(pembagi === angka)} onClick={() => ujiPembagi(angka, ringkas ? 16 : target)}>{angka}</button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {Array.from({ length: target }, (_, i) => {
                  const sisa = pembagi ? i >= target - (target % pembagi) && target % pembagi !== 0 : false;
                  return <span key={i} className={`h-4 w-4 rounded-sm ${sisa ? "animate-pulse bg-rose-500" : "bg-indigo-400"}`} />;
                })}
              </div>
              <p className="mt-2 text-sm font-black">Pasangan: {pasangan.map(([kiri, kanan]) => `${kiri} × ${kanan}`).join(", ") || "belum ada"}</p>
              <svg viewBox="0 0 240 70" className="mt-1 h-16 w-full">
                {pasangan.filter(([kiri, kanan]) => kiri !== kanan).map(([kiri, kanan]) => {
                  const x1 = 12 + ((kiri - 1) / Math.max(1, target - 1)) * 216;
                  const x2 = 12 + ((kanan - 1) / Math.max(1, target - 1)) * 216;
                  const tengah = (x1 + x2) / 2;
                  return <path key={`${kiri}-${kanan}`} d={`M ${x1} 58 Q ${tengah} 8 ${x2} 58`} fill="none" stroke="#7C3AED" strokeWidth="3" />;
                })}
              </svg>
            </div>
            {ringkas ? (
              <p className="text-sm font-bold">Faktor 16 yang sudah ketemu: {faktorUnik.join(", ") || "belum"}. Ucapkan lima bila lengkap.</p>
            ) : (
              <div>
                <p className="text-xs font-black uppercase">Lompat kelipatan</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {DASAR_LOMPAT.map((angka) => (
                    <button key={angka} type="button" className={tombol(dasar === angka)} onClick={() => { setDasar(angka); setLompat(0); }}>{angka}</button>
                  ))}
                </div>
                <button type="button" className={`${tombol(true)} mt-2`} onClick={() => setLompat((n) => Math.min(8, n + 1))}>Lompat Kelipatan Berikutnya!</button>
                <div className="mt-2 flex flex-wrap gap-1">
                  {Array.from({ length: 8 }, (_, i) => {
                    const angka = dasar * (i + 1);
                    return <span key={angka} className={`inline-flex h-12 w-12 items-center justify-center rounded-xl font-black ${i < lompat ? "bg-emerald-300" : "bg-slate-100"}`}>{angka}</span>;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {tab === "latihan" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {[0, 1, 2].map((indeks) => (
              <button key={indeks} type="button" className={tombol(misi === indeks)} onClick={() => bukaMisi(indeks)}>Misi {indeks + 1}</button>
            ))}
            <button type="button" className={tombol(misiSiap)} disabled={!misiSiap} onClick={lanjutMisi}>{misi < 2 ? "Misi berikutnya" : "Selesai"}</button>
          </div>
        ) : null}
      </div>

      <div className="grid items-end gap-3 lg:grid-cols-[auto_minmax(0,1fr)_16rem]">
        <ProfesorIgil pesan={pesan} bicara={bicara} onUlang={() => { setBicara(true); ucapkan(pesan, () => setBicara(false)); }} />
        <KanvasLangkah
          kunci={`${tab}-${misi}-${tugas.expected}`}
          mode={tugas.mode}
          expected={tugas.expected}
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

      <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs">
        <p className="font-black">Log Pedagogis BPG-IGIL</p>
        {log.length === 0 ? <p className="text-slate-500">Belum ada jejak.</p> : log.map((baris) => (
          <p key={`${baris.waktu}-${baris.jenis}`} className="truncate"><span className="font-black">{baris.waktu} {baris.jenis}</span> · {baris.pesan}</p>
        ))}
      </div>
    </div>
  );
}
