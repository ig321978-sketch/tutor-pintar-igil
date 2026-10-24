"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as AcaraPointer } from "react";
import type { KelaminGuru } from "@/lib/guru";

type TabLab = "pita" | "lipat" | "papan" | "latihan";
type ModePita = "satu" | "sama";
type BentukBawah = "lingkaran" | "garis";
type TampilanPapan = "sepuluh" | "seratus" | "tumpuk";
type ModeCoret = "angka" | "tanda";
type LogBaris = { id: number; waktu: string; jenis: string; pesan: string };
type DasarPecahan = { num: number; den: number };

export type TutorEventPecahan = {
  pesan: string;
  [kunci: string]: unknown;
};

type Props = {
  kelas?: string;
  kelamin?: KelaminGuru;
  onBenar?: () => void;
  onTutorEvent?: (eventType: string, payload: TutorEventPecahan) => void;
};

const TAB: { id: TabLab; label: string }[] = [
  { id: "pita", label: "Pita Pecahan" },
  { id: "lipat", label: "Kertas Senilai" },
  { id: "papan", label: "Papan Seratus" },
  { id: "latihan", label: "Latihan" },
];

const DASAR: DasarPecahan[] = [
  { num: 1, den: 2 },
  { num: 1, den: 3 },
  { num: 2, den: 3 },
  { num: 3, den: 4 },
];

const NAMA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas"];

const PESAN_SATU =
  "Ingat panduan di Buku Siswa: jika pembilangnya sama-sama 1, semakin BESAR angka penyebutnya, maka ukuran potongannya justru semakin KECIL!";
const PESAN_SAMA = "Karena penyebutnya sudah sama, kita cukup membandingkan angka pembilang di atasnya!";
const PESAN_DESIMAL =
  "Jangan terkecoh karena angka 25 terlihat lebih banyak dari 5! Pada desimal, 0,5 itu artinya 5 persepuluhan atau 50 perseratusan (50 kotak), jadi 0,5 lebih besar dari 0,25 (25 kotak)!";

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

function sebut(n: number): string {
  if (n >= 0 && n <= 12) return NAMA[n];
  if (n < 20) return `${NAMA[n - 10]} belas`;
  if (n < 100) {
    const puluh = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"][Math.floor(n / 10)];
    const sisa = n % 10;
    return sisa ? `${puluh} ${NAMA[sisa]}` : puluh;
  }
  if (n === 100) return "seratus";
  return String(n);
}

function sebutPecahan(num: number, den: number): string {
  if (num === 1 && den === 2) return "setengah";
  if (num === 1 && den === 4) return "seperempat";
  return `${sebut(num)} per ${sebut(den)}`;
}

function desimalTeks(jumlah: number): string {
  if (jumlah >= 100) return "1,00";
  return `0,${String(jumlah).padStart(2, "0")}`;
}

function pesanLipat(k: number, dasar: DasarPecahan): string {
  return `Lihat! Luas warna birunya tidak bertambah dan tidak berkurang, hanya potongannya yang terbagi menjadi ${k} kali lebih banyak. Itulah mengapa ${dasar.num}/${dasar.den} senilai dengan ${dasar.num * k}/${dasar.den * k}!`;
}

function pesanPersen(jumlah: number): string {
  return `Persen (%) artinya 'per seratus'. Karena ada ${jumlah} kotak yang diwarnai dari 100 kotak, maka pecahan ${jumlah}/100 sama dengan ${desimalTeks(jumlah)} dan sama dengan ${jumlah}%!`;
}

function selisihPecahan(numA: number, denA: number, numB: number, denB: number): number {
  return numA * denB - numB * denA;
}

function kataBanding(selisih: number): { simbol: string; kata: string } {
  if (selisih === 0) return { simbol: "=", kata: "sama dengan" };
  if (selisih > 0) return { simbol: ">", kata: "lebih dari" };
  return { simbol: "<", kata: "kurang dari" };
}

function papanKosong(): boolean[] {
  return Array.from({ length: 100 }, () => false);
}

function papanIsi(jumlah: number): boolean[] {
  return Array.from({ length: 100 }, (_, indeks) => indeks < jumlah);
}

function hitungPetak(petak: boolean[]): number {
  return petak.reduce((jumlah, isi) => jumlah + (isi ? 1 : 0), 0);
}

function tambahBaris(petak: boolean[]): boolean[] {
  const next = petak.slice();
  for (let baris = 0; baris < 10; baris += 1) {
    const awal = baris * 10;
    if (next.slice(awal, awal + 10).some((isi) => !isi)) {
      for (let kolom = 0; kolom < 10; kolom += 1) next[awal + kolom] = true;
      return next;
    }
  }
  return next;
}

function tambahKotak(petak: boolean[]): boolean[] {
  const indeks = petak.findIndex((isi) => !isi);
  if (indeks < 0) return petak;
  const next = petak.slice();
  next[indeks] = true;
  return next;
}

function normal(teks: string): string {
  return teks.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
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

function kenaliAngka(kanvas: HTMLCanvasElement, jumlah: number): string {
  const ctx = kanvas.getContext("2d");
  if (!ctx || jumlah < 1) return "";
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

function kenaliTanda(kanvas: HTMLCanvasElement): string {
  const ctx = kanvas.getContext("2d");
  if (!ctx) return "";
  const { width, height } = kanvas;
  const img = ctx.getImageData(0, 0, width, height);
  const baris = [0, 0, 0, 0, 0, 0, 0, 0];
  let tinta = 0;
  let kiri = 0;
  let kanan = 0;
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (!tintaPixel(img.data, (y * width + x) * 4)) continue;
      tinta += 1;
      baris[Math.min(7, Math.floor((y / height) * 8))] += 1;
      if (x < width / 2) kiri += 1;
      else kanan += 1;
    }
  }
  if (tinta < 8) return "";
  const puncak = baris.filter((n) => n > tinta * 0.12).length;
  const seimbang = Math.abs(kiri - kanan) < tinta * 0.18;
  if (seimbang && puncak >= 2) return "=";
  if (kiri > kanan * 1.2) return ">";
  if (kanan > kiri * 1.2) return "<";
  if (seimbang) return "=";
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

function Lambang({ num, den, warna = "text-blue-700" }: { num: number; den: number; warna?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${warna}`}>
      <span className="text-2xl font-black">{num}</span>
      <span className="my-0.5 h-1 w-8 bg-current" />
      <span className="text-2xl font-black">{den}</span>
    </span>
  );
}

function Pita({ num, den, warna, sorot }: { num: number; den: number; warna: string; sorot?: boolean }) {
  const lebar = 300 / den;
  return (
    <svg viewBox="0 0 300 36" className={`h-12 w-full ${sorot ? "rounded-lg ring-4 ring-amber-400" : ""}`} aria-hidden>
      {Array.from({ length: den }, (_, i) => (
        <rect key={i} x={i * lebar + 0.8} y={2} width={Math.max(1, lebar - 1.6)} height={32} rx={4} fill={i < num ? warna : "#F8FAFC"} stroke="#1C01A5" strokeWidth={1.6} />
      ))}
    </svg>
  );
}

function Lingkaran({ num, den, warna }: { num: number; den: number; warna: string }) {
  const sudut = 360 / den;
  const rad = (derajat: number) => ((derajat - 90) * Math.PI) / 180;
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden>
      {Array.from({ length: den }, (_, i) => {
        if (sudut >= 359) return <circle key={i} cx={50} cy={50} r={46} fill={warna} stroke="#1C01A5" strokeWidth={1.4} />;
        const mulai = i * sudut;
        const x1 = 50 + 46 * Math.cos(rad(mulai));
        const y1 = 50 + 46 * Math.sin(rad(mulai));
        const x2 = 50 + 46 * Math.cos(rad(mulai + sudut));
        const y2 = 50 + 46 * Math.sin(rad(mulai + sudut));
        const besar = sudut > 180 ? 1 : 0;
        return <path key={i} d={`M 50 50 L ${x1} ${y1} A 46 46 0 ${besar} 1 ${x2} ${y2} Z`} fill={i < num ? warna : "#F8FAFC"} stroke="#1C01A5" strokeWidth={1.2} />;
      })}
    </svg>
  );
}

function GarisBilangan({ kiri, kanan, den }: { kiri: number; kanan: number; den: number }) {
  const x = (nilai: number) => 20 + Math.max(0, Math.min(1, nilai)) * 280;
  return (
    <svg viewBox="0 0 320 52" className="h-14 w-full" aria-hidden>
      <line x1="20" y1="22" x2="300" y2="22" stroke="#1C01A5" strokeWidth="3" />
      <text x="12" y="44" fontSize="13" fill="#1C01A5" fontWeight="700">0</text>
      <text x="292" y="44" fontSize="13" fill="#1C01A5" fontWeight="700">1</text>
      {Array.from({ length: den - 1 }, (_, i) => (
        <line key={i} x1={x((i + 1) / den)} x2={x((i + 1) / den)} y1="16" y2="28" stroke="#94A3B8" strokeWidth="2" />
      ))}
      <circle cx={x(kiri)} cy={kiri === kanan ? 14 : 22} r="7" fill="#2563EB" />
      <circle cx={x(kanan)} cy={kiri === kanan ? 30 : 22} r="7" fill="#F59E0B" />
    </svg>
  );
}

function KertasLipat({ num, den, k, tembus = false }: { num: number; den: number; k: number; tembus?: boolean }) {
  const lebar = 160 / den;
  const tinggi = 100 / k;
  return (
    <svg viewBox="0 0 160 100" className="h-36 w-full max-w-sm" aria-hidden>
      {Array.from({ length: k }, (_, baris) =>
        Array.from({ length: den }, (_, kolom) => {
          const isi = kolom < num;
          return (
            <rect
              key={`${baris}-${kolom}`}
              x={kolom * lebar + 0.6}
              y={baris * tinggi + 0.6}
              width={Math.max(1, lebar - 1.2)}
              height={Math.max(1, tinggi - 1.2)}
              fill={isi ? "#60A5FA" : tembus ? "transparent" : "#F8FAFC"}
              fillOpacity={tembus && isi ? 0.55 : 1}
              stroke="#1C01A5"
              strokeWidth={0.8}
            />
          );
        }),
      )}
      {Array.from({ length: k - 1 }, (_, baris) => (
        <line key={baris} x1="0" x2="160" y1={(baris + 1) * tinggi} y2={(baris + 1) * tinggi} stroke="#1C01A5" strokeWidth="1.2" strokeDasharray="3 2" />
      ))}
    </svg>
  );
}

function PapanKali({ num, den, k }: { num: number; den: number; k: number }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="text-center">
        <p className="text-sm font-black text-emerald-700">× {k}</p>
        <svg viewBox="0 0 80 22" className="mx-auto h-5 w-16" aria-hidden>
          <path d="M6 18 Q 40 2 74 18" fill="none" stroke="#059669" strokeWidth="3" />
        </svg>
        <p className="text-4xl font-black text-blue-700">{num}</p>
        <div className="mx-auto my-1 h-1 w-12 bg-[#1C01A5]" />
        <p className="text-4xl font-black text-blue-700">{den}</p>
        <svg viewBox="0 0 80 22" className="mx-auto h-5 w-16" aria-hidden>
          <path d="M6 4 Q 40 20 74 4" fill="none" stroke="#059669" strokeWidth="3" />
        </svg>
        <p className="text-sm font-black text-emerald-700">× {k}</p>
      </div>
      <p className="text-3xl font-black">=</p>
      <div className="text-center text-emerald-700">
        <p className="text-4xl font-black">{num * k}</p>
        <div className="mx-auto my-1 h-1 w-12 bg-emerald-700" />
        <p className="text-4xl font-black">{den * k}</p>
      </div>
    </div>
  );
}

function Kisi({
  petak,
  tampilan,
  onCat,
  onBaris,
  onLepas,
}: {
  petak: boolean[];
  tampilan: TampilanPapan;
  onCat: (indeks: number) => void;
  onBaris: (baris: number) => void;
  onLepas: () => void;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const indeksDari = (event: AcaraPointer<SVGSVGElement>) => {
    const kotak = ref.current?.getBoundingClientRect();
    if (!kotak || kotak.width === 0 || kotak.height === 0) return { indeks: -1, baris: -1 };
    const x = Math.min(9, Math.max(0, Math.floor(((event.clientX - kotak.left) / kotak.width) * 10)));
    const y = Math.min(9, Math.max(0, Math.floor(((event.clientY - kotak.top) / kotak.height) * 10)));
    return { indeks: y * 10 + x, baris: y };
  };
  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      className="h-52 w-52 max-w-full touch-none"
      aria-label="Papan petak seratus"
      onPointerDown={(event) => {
        event.preventDefault();
        const kena = indeksDari(event);
        if (kena.indeks < 0) return;
        if (tampilan === "sepuluh") onBaris(kena.baris);
        else onCat(kena.indeks);
        try {
          ref.current?.setPointerCapture(event.pointerId);
        } catch {
          /* tangkapan pointer tidak tersedia */
        }
      }}
      onPointerMove={(event) => {
        if (tampilan === "sepuluh" || event.buttons !== 1) return;
        const kena = indeksDari(event);
        if (kena.indeks >= 0) onCat(kena.indeks);
      }}
      onPointerUp={onLepas}
      onPointerCancel={onLepas}
    >
      {(tampilan === "sepuluh" || tampilan === "tumpuk") &&
        Array.from({ length: 10 }, (_, baris) => {
          const isi = petak.slice(baris * 10, baris * 10 + 10).filter(Boolean).length;
          return <rect key={`baris-${baris}`} x={1} y={baris * 10 + 0.4} width={isi * 9.8} height={9.2} rx={0.6} fill="#FDE68A" />;
        })}
      {(tampilan === "seratus" || tampilan === "tumpuk") &&
        petak.map((isi, indeks) => (
          <rect
            key={indeks}
            x={(indeks % 10) * 10 + 0.45}
            y={Math.floor(indeks / 10) * 10 + 0.45}
            width={9.1}
            height={9.1}
            rx={0.5}
            fill={isi ? "#60A5FA" : tampilan === "tumpuk" ? "transparent" : "#F8FAFC"}
            stroke="#1C01A5"
            strokeWidth={0.4}
          />
        ))}
      {tampilan === "sepuluh" &&
        Array.from({ length: 10 }, (_, baris) => (
          <rect key={`bingkai-${baris}`} x={1} y={baris * 10 + 0.4} width={98} height={9.2} fill="none" stroke="#1C01A5" strokeWidth={0.6} />
        ))}
    </svg>
  );
}

function KisiDiam({ jumlah }: { jumlah: number }) {
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28" aria-hidden>
      {Array.from({ length: 100 }, (_, indeks) => (
        <rect key={indeks} x={(indeks % 10) * 10 + 0.5} y={Math.floor(indeks / 10) * 10 + 0.5} width={9} height={9} fill={indeks < jumlah ? "#60A5FA" : "#F8FAFC"} stroke="#1C01A5" strokeWidth={0.35} />
      ))}
    </svg>
  );
}

function Konverter({ jumlah }: { jumlah: number }) {
  const puluh = Math.floor(jumlah / 10);
  const sisa = jumlah % 10;
  const pecahan = jumlah % 10 === 0 && jumlah < 100 ? `${jumlah / 10}/10` : `${jumlah}/100`;
  return (
    <div className="min-w-0">
      <p className="text-xs font-black uppercase">Layar Konverter 3 Bahasa Matematika</p>
      <p className="mt-1 text-xs font-black">Pecahan biasa</p>
      <p className="text-3xl font-black text-blue-700">{pecahan}</p>
      {jumlah % 10 === 0 && jumlah < 100 ? <p className="text-sm font-bold">{jumlah}/100</p> : null}
      <p className="mt-1 text-xs font-black">Pecahan desimal</p>
      <p className="text-3xl font-black text-emerald-700">{desimalTeks(jumlah)}</p>
      <div className="mt-1 flex flex-wrap gap-1 text-center text-[11px] font-black">
        <span className="rounded-lg bg-slate-100 px-2 py-1">Satuan {jumlah >= 100 ? 1 : 0}</span>
        <span className="rounded-lg bg-amber-100 px-2 py-1">Persepuluhan {jumlah >= 100 ? 0 : puluh}</span>
        <span className="rounded-lg bg-sky-100 px-2 py-1">Perseratusan {jumlah >= 100 ? 0 : sisa}</span>
      </div>
      <p className="mt-1 text-xs font-black">Bentuk persen</p>
      <p className="text-3xl font-black text-fuchsia-700">{jumlah}%</p>
      <p className="text-xs font-bold">Per seratus.</p>
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
    if (mode === "tanda") {
      const terbaca = kenaliTanda(kanvas);
      const benar = diterima.includes(terbaca) || (bantu && jumlahTinta(kanvas) > 12);
      setPesan(benar ? "Tanda perbandingan kebaca." : "Tulis tanda yang lebih jelas.");
      if (!benar) setBantu(true);
      onHasil(benar, terbaca);
      return;
    }
    let terbaca = "";
    let cocok = false;
    for (const contoh of diterima) {
      const baca = kenaliAngka(kanvas, contoh.length);
      if (baca) terbaca = baca;
      if (baca === contoh) cocok = true;
    }
    const benar = cocok || (bantu && jumlahTinta(kanvas) > 18);
    setPesan(benar ? "Langkahmu tepat." : terbaca ? `Terbaca ${terbaca}. Contohnya ${diterima[0]}.` : `IGIL belum yakin. Contohnya ${diterima[0]}.`);
    if (!benar) setBantu(true);
    onHasil(benar, terbaca);
  };

  return (
    <div className="min-w-0">
      <p className="text-xs font-black uppercase text-[#1C01A5]">{label}</p>
      {bantu && mode === "angka" ? <p className="text-2xl font-black tracking-widest text-indigo-300">{diterima[0]}</p> : null}
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

export default function SimulasiMtk4Bab2({ onBenar, onTutorEvent }: Props) {
  const [tab, setTab] = useState<TabLab>("pita");
  const [modePita, setModePita] = useState<ModePita>("satu");
  const [denA, setDenA] = useState(2);
  const [denB, setDenB] = useState(4);
  const [denSama, setDenSama] = useState(8);
  const [numA, setNumA] = useState(3);
  const [numB, setNumB] = useState(5);
  const [bentuk, setBentuk] = useState<BentukBawah>("garis");
  const [dasarIndex, setDasarIndex] = useState(0);
  const [pengali, setPengali] = useState(1);
  const [tumpuk, setTumpuk] = useState(false);
  const [petak, setPetak] = useState<boolean[]>(() => papanKosong());
  const [tampilan, setTampilan] = useState<TampilanPapan>("seratus");
  const [menghapus, setMenghapus] = useState(false);
  const [bandingDesimal, setBandingDesimal] = useState(false);
  const [misi, setMisi] = useState(0);
  const [pilihan, setPilihan] = useState("");
  const [tulisBenar, setTulisBenar] = useState(false);
  const [suaraBenar, setSuaraBenar] = useState(false);
  const [pesan, setPesan] = useState("Dua pita sama panjang. Bandingkan potongan pembilang 1.");
  const [bicara, setBicara] = useState(false);
  const [menyimak, setMenyimak] = useState(false);
  const [log, setLog] = useState<LogBaris[]>([]);
  const mic = useRef<MesinMic | null>(null);
  const selesaiRef = useRef(false);
  const nomorLog = useRef(0);
  const petakRef = useRef(petak);
  const terakhirBicara = useRef(0);
  const persenTerakhir = useRef(-1);

  const kirim = useCallback(
    (jenis: string, isi: string, ekstra?: Record<string, unknown>, suara = true) => {
      onTutorEvent?.(jenis, { pesan: isi, ...ekstra });
      const id = ++nomorLog.current;
      setLog((lama) => [...lama, { id, waktu: jam(), jenis, pesan: isi }].slice(-5));
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
  const numKiri = latihan && misi === 0 ? 1 : modePita === "satu" ? 1 : numA;
  const denKiri = latihan && misi === 0 ? 4 : modePita === "satu" ? denA : denSama;
  const numKanan = latihan && misi === 0 ? 1 : modePita === "satu" ? 1 : numB;
  const denKanan = latihan && misi === 0 ? 6 : modePita === "satu" ? denB : denSama;
  const selisih = selisihPecahan(numKiri, denKiri, numKanan, denKanan);
  const banding = kataBanding(selisih);
  const dasar = latihan && misi === 1 ? DASAR[2] : DASAR[dasarIndex];
  const jumlah = hitungPetak(petak);
  const tampilPita = tab === "pita" || (latihan && misi === 0);
  const tampilLipat = tab === "lipat" || (latihan && misi === 1);
  const tampilPapan = tab === "papan" || (latihan && misi === 2);

  const ubahDen = (sisi: "a" | "b", nilai: number) => {
    const atas = sisi === "a" ? nilai : denA;
    const bawah = sisi === "b" ? nilai : denB;
    if (sisi === "a") setDenA(nilai);
    else setDenB(nilai);
    if (atas !== bawah) kirim("BPG_UNIT_FRACTION_RULE", PESAN_SATU, { kiri: `1/${atas}`, kanan: `1/${bawah}` });
    else setPesan("Penyebutnya sama, jadi potongannya sama besar.");
  };

  const ujiPenyebutBesar = () => {
    setModePita("satu");
    setDenA(3);
    setDenB(8);
    kirim("BPG_UNIT_FRACTION_RULE", PESAN_SATU, { kiri: "1/3", kanan: "1/8", sorot: "1/8 lebih kecil" });
  };

  const ubahPembilang = (sisi: "a" | "b", delta: 1 | -1) => {
    const sekarang = sisi === "a" ? numA : numB;
    const berikut = Math.max(0, Math.min(denSama, sekarang + delta));
    if (sisi === "a") setNumA(berikut);
    else setNumB(berikut);
    kirim("BPG_SAME_DENOMINATOR_RULE", PESAN_SAMA, { penyebut: denSama, kiri: sisi === "a" ? berikut : numA, kanan: sisi === "b" ? berikut : numB });
  };

  const gantiPengali = (nilai: number) => {
    setPengali(nilai);
    setTumpuk(false);
    if (nilai > 1) kirim("BPG_EQUIVALENT_FOLD", pesanLipat(nilai, dasar), { k: nilai, baseFrac: `${dasar.num}/${dasar.den}`, newFrac: `${dasar.num * nilai}/${dasar.den * nilai}` });
    else setPesan("Pengali x1. Kertas belum dilipat lagi.");
  };

  const gantiDasar = (indeks: number) => {
    setDasarIndex(indeks);
    setTumpuk(false);
    const berikutnya = DASAR[indeks];
    if (pengali > 1) kirim("BPG_EQUIVALENT_FOLD", pesanLipat(pengali, berikutnya), { k: pengali, baseFrac: `${berikutnya.num}/${berikutnya.den}`, newFrac: `${berikutnya.num * pengali}/${berikutnya.den * pengali}` });
  };

  const catatPersen = (total: number, suara = true) => {
    if (total === 0 || total === persenTerakhir.current) return;
    persenTerakhir.current = total;
    if (latihan && misi === 2 && total !== 35) {
      setPesan(`Sudah ${total} kotak. Lanjut sampai 35.`);
      return;
    }
    kirim("BPG_PERCENT_CONNECTION", pesanPersen(total), { count: total, decimal: desimalTeks(total) }, suara);
  };

  const sambungPersen = (berikut: boolean[], suara = true) => {
    petakRef.current = berikut;
    setPetak(berikut);
    setBandingDesimal(false);
    catatPersen(hitungPetak(berikut), suara);
  };

  const catSel = (indeks: number) => {
    const isi = !menghapus;
    const lama = petakRef.current;
    if (lama[indeks] === isi) return;
    const next = lama.slice();
    next[indeks] = isi;
    petakRef.current = next;
    setPetak(next);
  };

  const lepasPapan = () => {
    catatPersen(hitungPetak(petakRef.current), true);
  };

  const isiBaris = (baris: number) => {
    const next = petakRef.current.slice();
    const awal = baris * 10;
    const penuh = next.slice(awal, awal + 10).every(Boolean);
    for (let kolom = 0; kolom < 10; kolom += 1) next[awal + kolom] = !penuh;
    sambungPersen(next, true);
  };

  const suaraPecahan = (num: number, den: number) => [sebutPecahan(num, den), `${num} per ${den}`, `${num}/${den}`];

  const harapan = (): { mode: ModeCoret; diterima: string[]; label: string; suara: string[] } => {
    if (latihan && misi === 0) {
      return { mode: "angka", diterima: ["14"], label: "Tulis lambang 1/4", suara: ["satu per empat", "seperempat", "1/4"] };
    }
    if (latihan && misi === 1) {
      return { mode: "angka", diterima: ["4"], label: "Tulis pembilang 4", suara: ["empat per enam", "4 per 6", "4/6"] };
    }
    if (latihan && misi === 2) {
      return { mode: "angka", diterima: ["035", "35"], label: "Tulis 0,35 atau 35%", suara: ["tiga puluh lima persen", "35 persen", "35"] };
    }
    if (tampilLipat) {
      const pembilang = dasar.num * pengali;
      const penyebut = dasar.den * pengali;
      return { mode: "angka", diterima: [String(pembilang), `${pembilang}${penyebut}`], label: "Tulis pembilang senilai", suara: suaraPecahan(pembilang, penyebut) };
    }
    if (tampilPapan) {
      const angka = jumlah === 100 ? ["100"] : [String(jumlah).padStart(2, "0"), String(jumlah)];
      const bacaan = jumlah % 10 === 0 && jumlah < 100 ? [`nol koma ${sebut(jumlah / 10)}`] : [`nol koma ${sebut(Math.floor(jumlah / 10))} ${sebut(jumlah % 10)}`, `nol koma ${sebut(jumlah)}`];
      return { mode: "angka", diterima: angka, label: "Tulis desimal atau persen", suara: [...bacaan, `${sebut(jumlah)} persen`, `${jumlah} persen`] };
    }
    const hubungan = selisih === 0 ? "sama dengan" : selisih > 0 ? "lebih dari" : "kurang dari";
    return {
      mode: "tanda",
      diterima: [banding.simbol],
      label: "Tulis tanda perbandingan",
      suara: [`${sebutPecahan(numKiri, denKiri)} ${hubungan} ${sebutPecahan(numKanan, denKanan)}`, banding.kata],
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

  const misi1Siap = pilihan === "1/4" && tulisBenar;
  const misi2Siap = pengali === 2 && tulisBenar && suaraBenar;
  const misi3Siap = jumlah === 35 && tulisBenar && suaraBenar;
  const misiSiap = misi === 0 ? misi1Siap : misi === 1 ? misi2Siap : misi3Siap;

  const bukaMisi = (indeks: number) => {
    setMisi(indeks);
    setTulisBenar(false);
    setSuaraBenar(false);
    setPilihan("");
    if (indeks === 0) setPesan("Bandingkan 1/4 dan 1/6 pada pita. Pilih yang lebih besar, lalu tulis 1/4.");
    if (indeks === 1) {
      setPengali(1);
      setTumpuk(false);
      setPesan("Lipat kertas 2/3 dengan x2. Tulis angka 4, lalu ucapkan empat per enam.");
    }
    if (indeks === 2) {
      const kosong = papanKosong();
      petakRef.current = kosong;
      setPetak(kosong);
      persenTerakhir.current = -1;
      setBandingDesimal(false);
      setTampilan("seratus");
      setPesan("Warnai 35 kotak. Tulis 0,35 atau 35%. Ucapkan tiga puluh lima persen.");
    }
  };

  const lanjutMisi = () => {
    if (!misiSiap) return;
    if (misi < 2) {
      bukaMisi(misi + 1);
      return;
    }
    if (selesaiRef.current) return;
    selesaiRef.current = true;
    kirim("MISSION_COMPLETED", "Tiga misi selesai. Kamu bisa membandingkan, melipat, dan membaca persen.", { misi: 3 });
    onBenar?.();
  };

  const judul =
    tab === "pita"
      ? "Laboratorium Pita Pecahan & Pembanding"
      : tab === "lipat"
        ? "Mesin Lipat Kertas & Pecahan Senilai"
        : tab === "papan"
          ? "Papan Seratus: Desimal Persepuluhan, Perseratusan & Persen"
          : "Latihan Eksplorasi Terbimbing";

  return (
    <div className="flex flex-col gap-2 text-[#1C01A5]">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TAB.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tombol(tab === item.id)}
            onClick={() => {
              setTab(item.id);
              setTulisBenar(false);
              setSuaraBenar(false);
              if (item.id === "latihan" && misi === 0) setPesan("Bandingkan 1/4 dan 1/6 pada pita. Pilih yang lebih besar, lalu tulis 1/4.");
              if (item.id === "latihan" && misi === 1) setPesan("Lipat kertas 2/3 dengan x2. Tulis angka 4, lalu ucapkan empat per enam.");
              if (item.id === "latihan" && misi === 2) setPesan("Warnai 35 kotak. Tulis 0,35 atau 35%. Ucapkan tiga puluh lima persen.");
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-base font-black leading-snug">{judul}</h2>

        {tampilPita ? (
          <div className="grid gap-2 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <Lambang num={numKiri} den={denKiri} />
                <span className="text-xs font-black">Pita atas</span>
              </div>
              <Pita num={numKiri} den={denKiri} warna="#60A5FA" sorot={denKiri > denKanan && numKiri === 1 && numKanan === 1} />
              <div className="my-2 flex items-center justify-center">
                <p className="min-h-12 min-w-40 rounded-xl bg-amber-50 px-4 py-2 text-center text-lg font-black ring-2 ring-amber-300">
                  {banding.simbol} {banding.kata}
                </p>
              </div>
              <Pita num={numKanan} den={denKanan} warna="#FBBF24" sorot={denKanan > denKiri && numKiri === 1 && numKanan === 1} />
              <div className="mt-1 flex items-center justify-between gap-2">
                <Lambang num={numKanan} den={denKanan} warna="text-amber-700" />
                <span className="text-xs font-black">Pita bawah</span>
              </div>
              {numKiri === 1 && numKanan === 1 && ((denKiri === 3 && denKanan === 8) || (denKiri === 8 && denKanan === 3)) ? (
                <p className="mt-1 text-sm font-bold">1 pita untuk 8 orang. Potongannya jauh lebih kecil daripada untuk 3 orang.</p>
              ) : null}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                {bentuk === "lingkaran" ? (
                  <>
                    <Lingkaran num={numKiri} den={denKiri} warna="#60A5FA" />
                    <Lingkaran num={numKanan} den={denKanan} warna="#FBBF24" />
                  </>
                ) : (
                  <div className="w-full">
                    <GarisBilangan kiri={numKiri / denKiri} kanan={numKanan / denKanan} den={Math.max(denKiri, denKanan)} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {latihan && misi === 0 ? (
                <>
                  <p className="text-sm font-bold">Mana yang lebih besar?</p>
                  <button type="button" className={tombol(pilihan === "1/4")} onClick={() => { setPilihan("1/4"); setPesan("Benar. 1/4 lebih besar dari 1/6. Tulis 1/4 di kanvas."); }}>1/4 lebih besar</button>
                  <button type="button" className={tombol(pilihan === "1/6")} onClick={() => { setPilihan("1/6"); kirim("BPG_UNIT_FRACTION_RULE", PESAN_SATU, { kiri: "1/4", kanan: "1/6" }); }}>1/6 lebih besar</button>
                  <p className="text-sm font-black">Pilih 1/4: {pilihan === "1/4" ? "sudah" : "belum"}. Tulis: {tulisBenar ? "sudah" : "belum"}.</p>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className={tombol(modePita === "satu")} onClick={() => setModePita("satu")}>Pembilang 1</button>
                    <button type="button" className={tombol(modePita === "sama")} onClick={() => { setModePita("sama"); kirim("BPG_SAME_DENOMINATOR_RULE", PESAN_SAMA, { penyebut: denSama }); }}>Penyebut sama</button>
                    <button type="button" className={tombol(bentuk === "lingkaran")} onClick={() => setBentuk("lingkaran")}>Lingkaran</button>
                    <button type="button" className={tombol(bentuk === "garis")} onClick={() => setBentuk("garis")}>Garis 0–1</button>
                  </div>
                  {modePita === "satu" ? (
                    <>
                      <p className="text-xs font-black">Penyebut pita atas</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 11 }, (_, i) => i + 2).map((angka) => (
                          <button key={angka} type="button" className={tombol(denA === angka)} onClick={() => ubahDen("a", angka)}>{angka}</button>
                        ))}
                      </div>
                      <p className="text-xs font-black">Penyebut pita bawah</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 11 }, (_, i) => i + 2).map((angka) => (
                          <button key={angka} type="button" className={tombol(denB === angka)} onClick={() => ubahDen("b", angka)}>{angka}</button>
                        ))}
                      </div>
                      <button type="button" className={tombol()} onClick={ujiPenyebutBesar}>Uji Miskonsepsi Penyebut Besar (1/3 vs 1/8)</button>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-black">Penyebut yang sama</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 11 }, (_, i) => i + 2).map((angka) => (
                          <button key={angka} type="button" className={tombol(denSama === angka)} onClick={() => { setDenSama(angka); setNumA((n) => Math.min(n, angka)); setNumB((n) => Math.min(n, angka)); kirim("BPG_SAME_DENOMINATOR_RULE", PESAN_SAMA, { penyebut: angka }); }}>{angka}</button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className={tombol()} onClick={() => ubahPembilang("a", -1)} aria-label="Kurangi pembilang atas">Atas −</button>
                        <button type="button" className={tombol(true)} onClick={() => ubahPembilang("a", 1)} aria-label="Tambah pembilang atas">Atas +</button>
                        <button type="button" className={tombol()} onClick={() => ubahPembilang("b", -1)} aria-label="Kurangi pembilang bawah">Bawah −</button>
                        <button type="button" className={tombol(true)} onClick={() => ubahPembilang("b", 1)} aria-label="Tambah pembilang bawah">Bawah +</button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null}

        {tampilLipat ? (
          <div className="grid items-center gap-3 lg:grid-cols-2">
            <div>
              <div className="relative">
                {tumpuk ? <div className="absolute inset-0"><KertasLipat num={dasar.num} den={dasar.den} k={1} /></div> : null}
                <KertasLipat num={dasar.num} den={dasar.den} k={pengali} tembus={tumpuk} />
              </div>
              <p className="text-center text-sm font-black">{dasar.num}/{dasar.den} senilai {dasar.num * pengali}/{dasar.den * pengali}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-black uppercase">Papan persamaan pengali senilai</p>
              <PapanKali num={dasar.num} den={dasar.den} k={pengali} />
              {latihan && misi === 1 ? (
                <p className="text-sm font-bold">Lipat 2/3 dengan x2 sampai ketemu 4/6.</p>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {DASAR.map((item, indeks) => (
                    <button key={`${item.num}-${item.den}`} type="button" className={tombol(dasarIndex === indeks)} onClick={() => gantiDasar(indeks)}>{item.num}/{item.den}</button>
                  ))}
                </div>
              )}
              <p className="text-xs font-black">Lipat & bagi kertas</p>
              <div className="flex flex-wrap gap-1">
                {[1, 2, 3, 4].map((nilai) => (
                  <button key={nilai} type="button" className={tombol(pengali === nilai)} onClick={() => gantiPengali(nilai)}>x{nilai}</button>
                ))}
              </div>
              <button type="button" className={tombol(tumpuk)} onClick={() => setTumpuk((nyala) => !nyala)}>Uji Tumpuk Transparan</button>
              {latihan && misi === 1 ? <p className="text-sm font-black">Lipat x2: {pengali === 2 ? "sudah" : "belum"}. Tulis 4: {tulisBenar ? "sudah" : "belum"}. Ucapan: {suaraBenar ? "sudah" : "belum"}.</p> : null}
            </div>
          </div>
        ) : null}

        {tampilPapan ? (
          <div className="grid gap-3 lg:grid-cols-[auto_minmax(0,1fr)]">
            <div>
              {bandingDesimal ? (
                <div className="flex flex-wrap items-end gap-3">
                  <div>
                    <KisiDiam jumlah={50} />
                    <p className="text-center text-xs font-black">0,5 = 5 batang = 50%</p>
                  </div>
                  <p className="pb-8 text-3xl font-black">&gt;</p>
                  <div>
                    <KisiDiam jumlah={25} />
                    <p className="text-center text-xs font-black">0,25 = 2 batang + 5 kotak = 25%</p>
                  </div>
                </div>
              ) : (
                <Kisi petak={petak} tampilan={tampilan} onCat={catSel} onBaris={isiBaris} onLepas={lepasPapan} />
              )}
              {bandingDesimal ? null : <p className={`mt-1 text-center text-2xl font-black ${jumlah === 35 && latihan ? "text-emerald-600" : "text-blue-700"}`}>{jumlah}/100</p>}
            </div>
            <div className="flex flex-col gap-2">
              {bandingDesimal ? (
                <div>
                  <p className="text-sm font-black">0,5 lebih besar dari 0,25.</p>
                  <p className="text-sm font-bold">50 kotak lebih banyak daripada 25 kotak.</p>
                </div>
              ) : (
                <Konverter jumlah={jumlah} />
              )}
              <div className="flex flex-wrap gap-2">
                <button type="button" className={tombol(tampilan === "sepuluh")} onClick={() => { setTampilan("sepuluh"); setBandingDesimal(false); }}>10 Batang</button>
                <button type="button" className={tombol(tampilan === "seratus")} onClick={() => { setTampilan("seratus"); setBandingDesimal(false); }}>100 Kotak</button>
                <button type="button" className={tombol(tampilan === "tumpuk")} onClick={() => { setTampilan("tumpuk"); setBandingDesimal(false); if (jumlah > 0) kirim("BPG_PERCENT_CONNECTION", pesanPersen(jumlah), { count: jumlah, decimal: desimalTeks(jumlah) }); }}>Tumpuk batang dan kotak</button>
                <button type="button" className={tombol(menghapus)} onClick={() => setMenghapus((nyala) => !nyala)}>{menghapus ? "Mode hapus" : "Mode warnai"}</button>
              </div>
              {latihan && misi === 2 ? null : (
                <>
                  <button type="button" className={tombol()} onClick={() => sambungPersen(tambahBaris(petakRef.current))}>+1 Batang Persepuluhan (+10/100 = +0,1 = +10%)</button>
                  <button type="button" className={tombol()} onClick={() => sambungPersen(tambahKotak(petakRef.current))}>+1 Kotak Perseratusan (+1/100 = +0,01 = +1%)</button>
                  <button type="button" className={tombol(bandingDesimal)} onClick={() => { setBandingDesimal(true); kirim("BPG_DECIMAL_MISCONCEPTION_ALERT", PESAN_DESIMAL, { kiri: "0,5", kanan: "0,25" }); }}>Bandingkan 0,5 vs 0,25</button>
                  <p className="text-xs font-black">Pecahan istimewa ke persen</p>
                  <div className="flex flex-wrap gap-2">
                    {[[1, 2, 50], [1, 4, 25], [3, 4, 75]].map(([num, den, total]) => (
                      <button key={total} type="button" className={tombol(jumlah === total && !bandingDesimal)} onClick={() => sambungPersen(papanIsi(total))}>{num}/{den} = {total}%</button>
                    ))}
                  </div>
                </>
              )}
              {latihan && misi === 2 ? (
                <>
                  <button type="button" className={tombol()} onClick={() => sambungPersen(tambahKotak(petakRef.current), false)}>+1 kotak</button>
                  <button type="button" className={tombol()} onClick={() => { const kosong = papanKosong(); petakRef.current = kosong; setPetak(kosong); persenTerakhir.current = 0; }}>Kosongkan</button>
                  <p className="text-sm font-black">35 kotak: {jumlah === 35 ? "sudah" : `${jumlah} belum`}. Tulis: {tulisBenar ? "sudah" : "belum"}. Ucapan: {suaraBenar ? "sudah" : "belum"}.</p>
                </>
              ) : (
                <button type="button" className={tombol()} onClick={() => { const kosong = papanKosong(); petakRef.current = kosong; setPetak(kosong); persenTerakhir.current = 0; setBandingDesimal(false); }}>Kosongkan papan</button>
              )}
            </div>
          </div>
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
            kunci={`${tab}-${misi}`}
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
