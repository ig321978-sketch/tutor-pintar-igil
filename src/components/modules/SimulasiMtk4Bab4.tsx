"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as AcaraPointer } from "react";
import type { KelaminGuru } from "@/lib/guru";

type TabLab = "luas" | "air" | "kubus" | "misi";
type SatuanLuas = "origami" | "cm" | "m";
type AlatUbin = "utuh" | "setengah" | "hapus";
type Sel = "kosong" | "utuh" | "setengah" | "celah" | "tumpuk";
type LogBaris = { jenis: string; pesan: string };

export type TutorEventUkur = {
  pesan: string;
  [kunci: string]: unknown;
};

type Props = {
  kelas?: string;
  kelamin?: KelaminGuru;
  onBenar?: () => void;
  onTutorEvent?: (eventType: string, payload: TutorEventUkur) => void;
};

const KOLOM = 10;
const BARIS = 6;
const WARNA_LAPIS = ["#38bdf8", "#34d399", "#fbbf24", "#f472b6"];

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

const PESAN_SETENGAH = "Cerdas! Dua ubin segitiga setengah (1/2 + 1/2) jika disatukan nilainya tepat menjadi 1 persegi satuan utuh!";
const PESAN_SAMA = "Lihat! Walaupun Bangun A dan Bangun B bentuknya berbeda, keduanya sama-sama tersusun dari 12 persegi satuan, jadi luasnya sama-sama 12 cm²!";
const PESAN_LITER = "Air sudah mencapai garis 1.000 mL! Ingat aturan emas di Buku Siswa: 1.000 mililiter (mL) itu sama persis dengan 1 Liter (L)!";
const PESAN_ILUSI = "Jangan tertipu tinggi airnya ya! Di tabung sempit airnya terlihat tinggi, dan di mangkuk lebar terlihat pendek, tapi isi keduanya tetap sama-sama 500 mL!";

function normal(teks: string): string {
  return teks.toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ").trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const rapat = normal(teks).replace(/\s/g, "");
  return alias.some((item) => {
    const a = normal(item).replace(/\s/g, "");
    if (!a) return false;
    if (rapat === a) return true;
    if (a.length >= 4 && rapat.includes(a)) {
      const sisa = rapat.slice(rapat.indexOf(a) + a.length);
      return !sisa.startsWith("belas") && !sisa.startsWith("puluh") && !sisa.startsWith("ratus") && !sisa.startsWith("ribu");
    }
    return false;
  });
}

function ucapkan(teks: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(teks);
  u.lang = "id-ID";
  u.rate = 0.95;
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
  return `inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl px-3 text-left text-sm font-black transition ${
    aktif ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200 hover:bg-indigo-50"
  }`;
}

function papanKosong(): Sel[] {
  return Array.from({ length: KOLOM * BARIS }, () => "kosong");
}

function isiPersegi(panjang: number, lebar: number, jenis: Sel = "utuh"): Sel[] {
  const papan = papanKosong();
  for (let y = 0; y < lebar; y += 1) {
    for (let x = 0; x < panjang; x += 1) papan[y * KOLOM + x] = jenis;
  }
  return papan;
}

function papanCelah(panjang: number, lebar: number): Sel[] {
  const papan = isiPersegi(panjang, lebar);
  if (papan.length > 2) papan[1] = "celah";
  if (lebar > 1) papan[KOLOM] = "tumpuk";
  return papan;
}

function hitung(papan: Sel[]): { utuh: number; setengah: number; luas: number } {
  let utuh = 0;
  let setengah = 0;
  for (const sel of papan) {
    if (sel === "utuh") utuh += 1;
    if (sel === "setengah") setengah += 1;
  }
  return { utuh, setengah, luas: utuh + setengah / 2 };
}

function angkaLuas(nilai: number): string {
  return Number.isInteger(nilai) ? String(nilai) : nilai.toLocaleString("id-ID", { maximumFractionDigits: 1 });
}

function satuanTeks(satuan: SatuanLuas): string {
  if (satuan === "origami") return "origami";
  if (satuan === "cm") return "cm²";
  return "m²";
}

function sisiTeks(satuan: SatuanLuas): string {
  if (satuan === "cm") return "cm";
  if (satuan === "m") return "m";
  return "";
}

function titikIso(x: number, y: number, z: number, ox: number, oy: number, u: number): [number, number] {
  return [ox + (x - y) * u, oy + (x + y) * u * 0.5 - z * u];
}

function poli(titik: [number, number][]): string {
  return titik.map((p) => p.join(",")).join(" ");
}

function KanvasTulis({
  kunci,
  target,
  kata,
  siap,
  onBenar,
}: {
  kunci: string;
  target: string;
  kata: string[];
  siap: boolean;
  onBenar: () => void;
}) {
  const refKanvas = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const terakhir = useRef<{ x: number; y: number } | null>(null);
  const [pesan, setPesan] = useState("");
  const [bantu, setBantu] = useState(false);

  const siapkan = useCallback(() => {
    const kanvas = refKanvas.current;
    const induk = kanvas?.parentElement;
    if (!kanvas || !induk) return;
    const lebar = Math.max(induk.clientWidth, 160);
    const tinggi = 112;
    const dpr = window.devicePixelRatio || 1;
    kanvas.width = Math.floor(lebar * dpr);
    kanvas.height = Math.floor(tinggi * dpr);
    kanvas.style.width = `${lebar}px`;
    kanvas.style.height = `${tinggi}px`;
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1C01A5";
  }, []);

  useEffect(() => {
    siapkan();
    setPesan("");
    setBantu(false);
  }, [kunci, siapkan]);

  const posisi = (e: AcaraPointer<HTMLCanvasElement>) => {
    const kotak = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - kotak.left, y: e.clientY - kotak.top };
  };

  const mulai = (e: AcaraPointer<HTMLCanvasElement>) => {
    gambar.current = true;
    terakhir.current = posisi(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const geser = (e: AcaraPointer<HTMLCanvasElement>) => {
    if (!gambar.current || !terakhir.current) return;
    const ctx = refKanvas.current?.getContext("2d");
    if (!ctx) return;
    const kini = posisi(e);
    ctx.beginPath();
    ctx.moveTo(terakhir.current.x, terakhir.current.y);
    ctx.lineTo(kini.x, kini.y);
    ctx.stroke();
    terakhir.current = kini;
  };

  const hapus = () => {
    const kanvas = refKanvas.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, kanvas.width, kanvas.height);
    ctx.restore();
    setPesan("");
    setBantu(false);
  };

  const periksa = () => {
    const kanvas = refKanvas.current;
    if (!kanvas) return;
    if (!siap) {
      setPesan("Selesaikan susunan atau takarannya dulu, baru tulis angkanya.");
      return;
    }
    const baca = kenaliAngka(kanvas, target.length);
    const cocok = baca === target || cocokSuara(baca, [target, ...kata]);
    if (cocok || (bantu && jumlahTinta(kanvas) > 18)) {
      setPesan("Angkanya cocok dengan hasil ukurmu.");
      onBenar();
      return;
    }
    setBantu(true);
    setPesan(bantu ? "Coretanmu sudah cukup. Angka itu diterima." : `Coba tulis ${target}.`);
    if (bantu && jumlahTinta(kanvas) > 18) onBenar();
  };

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kanvas tulis</p>
      <div className="mt-1 overflow-hidden rounded-2xl bg-amber-50 ring-2 ring-amber-200">
        <canvas ref={refKanvas} className="w-full touch-none" onPointerDown={mulai} onPointerMove={geser} onPointerUp={() => { gambar.current = false; }} onPointerLeave={() => { gambar.current = false; }} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" className={tombol()} onClick={hapus}>Hapus Coretan</button>
        <button type="button" className={tombol(true)} onClick={periksa}>Periksa Eksplorasi</button>
      </div>
      {pesan ? <p className="mt-2 text-sm font-bold text-indigo-800">{pesan}</p> : null}
    </div>
  );
}

function SelUbin({ sel, onClick }: { sel: Sel; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="relative h-8 w-8 overflow-hidden rounded-md bg-sky-50 ring-2 ring-sky-200 transition sm:h-9 sm:w-9" aria-label={sel}>
      {sel === "utuh" ? <span className="absolute inset-0.5 rounded-sm bg-sky-400 transition-all" /> : null}
      {sel === "setengah" ? <span className="absolute inset-0.5 bg-amber-400 transition-all" style={{ clipPath: "polygon(0 100%, 100% 100%, 0 0)" }} /> : null}
      {sel === "celah" ? <span className="absolute inset-1 rounded-sm border-2 border-dashed border-rose-400" /> : null}
      {sel === "tumpuk" ? (
        <>
          <span className="absolute bottom-1 left-1 h-5 w-5 rounded-sm bg-sky-300" />
          <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-sm bg-sky-600" />
        </>
      ) : null}
    </button>
  );
}

function PanggungUbin({ papan, kolom, onPilih }: { papan: Sel[]; kolom: number; onPilih: (indeks: number) => void }) {
  return (
    <div className="grid w-fit gap-1" style={{ gridTemplateColumns: `repeat(${kolom}, 2.25rem)` }}>
      {papan.map((sel, indeks) => (
        <SelUbin key={indeks} sel={sel} onClick={() => onPilih(indeks)} />
      ))}
    </div>
  );
}

function TabungAir({ ml, tinggiKelas = "h-64" }: { ml: number; tinggiKelas?: string }) {
  const persen = Math.max(0, Math.min(100, (ml / 2000) * 100));
  return (
    <div className={`relative w-24 overflow-hidden rounded-b-3xl rounded-t-md border-4 border-sky-300 bg-sky-50 ${tinggiKelas}`}>
      {Array.from({ length: 21 }, (_, indeks) => {
        const tanda = indeks * 100;
        const tebal = tanda === 1000 || tanda === 2000;
        return <span key={tanda} className={`absolute left-0 right-0 ${tebal ? "z-10 border-t-2 border-rose-500" : "border-t border-sky-200"}`} style={{ bottom: `${(tanda / 2000) * 100}%` }} />;
      })}
      <div className="absolute inset-x-1 bottom-1 overflow-hidden rounded-b-2xl bg-sky-500 transition-all duration-500" style={{ height: `${Math.max(0, persen - 1)}%` }}>
        <span className="igil-ombak absolute -top-3 left-[-30%] h-6 w-[160%] rounded-[40%] bg-sky-300/90" />
      </div>
    </div>
  );
}

function WadahIlusi({ nama, tinggi, air, bentuk }: { nama: string; tinggi: string; air: string; bentuk: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`relative w-16 overflow-hidden border-4 border-sky-300 bg-sky-50 ${tinggi} ${bentuk}`}>
        <div className="absolute inset-x-1 bottom-1 bg-sky-500" style={{ height: air }} />
      </div>
      <p className="text-center text-xs font-black text-[#1C01A5]">{nama}</p>
      <p className="text-xs font-bold text-emerald-700">500 mL</p>
    </div>
  );
}

function KubusIsometrik({ panjang, lebar, tinggi, terisi, pisah }: { panjang: number; lebar: number; tinggi: number; terisi: number; pisah: boolean }) {
  const u = panjang + lebar > 7 ? 11 : 14;
  const ox = 150;
  const oy = 168;
  const muka: { titik: [number, number][]; warna: string }[] = [];
  let n = 0;
  for (let z = 0; z < tinggi; z += 1) {
    for (let y = lebar - 1; y >= 0; y -= 1) {
      for (let x = 0; x < panjang; x += 1) {
        const tampil = n < terisi;
        n += 1;
        if (!tampil) continue;
        const zz = z + (pisah ? z * 0.65 : 0);
        const dasar = WARNA_LAPIS[z % WARNA_LAPIS.length];
        const p = (dx: number, dy: number, dz: number) => titikIso(x + dx, y + dy, zz + dz, ox, oy, u);
        muka.push(
          { titik: [p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)], warna: dasar },
          { titik: [p(0, 1, 0), p(0, 1, 1), p(1, 1, 1), p(1, 1, 0)], warna: "#0369a1" },
          { titik: [p(1, 0, 0), p(1, 0, 1), p(1, 1, 1), p(1, 1, 0)], warna: "#0284c7" },
        );
      }
    }
  }
  return (
    <svg viewBox="0 0 300 230" className="h-56 w-full max-w-sm">
      {muka.map((sisi, indeks) => (
        <polygon key={indeks} points={poli(sisi.titik)} fill={sisi.warna} stroke="#0f172a" strokeWidth="0.6" />
      ))}
    </svg>
  );
}

export default function SimulasiMtk4Bab4({ onBenar, onTutorEvent }: Props) {
  const [tab, setTab] = useState<TabLab>("luas");
  const [satuan, setSatuan] = useState<SatuanLuas>("cm");
  const [alat, setAlat] = useState<AlatUbin>("utuh");
  const [kembar, setKembar] = useState(false);
  const [papanA, setPapanA] = useState<Sel[]>(() => isiPersegi(4, 3));
  const [papanB, setPapanB] = useState<Sel[]>(() => papanKosong());
  const [panjang, setPanjang] = useState(4);
  const [lebar, setLebar] = useState(3);
  const [ml, setMl] = useState(0);
  const [ilusi, setIlusi] = useState(false);
  const [pKubus, setPKubus] = useState(4);
  const [lKubus, setLKubus] = useState(3);
  const [tKubus, setTKubus] = useState(2);
  const [terisi, setTerisi] = useState(24);
  const [pisah, setPisah] = useState(false);
  const [misi, setMisi] = useState<1 | 2 | 3>(1);
  const [misiSel, setMisiSel] = useState<Sel[]>(() => Array.from({ length: 16 }, () => "kosong"));
  const [alatMisi, setAlatMisi] = useState<AlatUbin>("utuh");
  const [misi1, setMisi1] = useState(false);
  const [misi2, setMisi2] = useState(false);
  const [misi3, setMisi3] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [log, setLog] = useState<LogBaris[]>([]);
  const [menyimak, setMenyimak] = useState(false);
  const mic = useRef<MesinMic | null>(null);
  const selesaiRef = useRef(false);
  const mlLama = useRef(0);
  const isiTimer = useRef<number | null>(null);
  const ucapTerakhir = useRef(0);

  const kirim = useCallback((jenis: string, pesan: string, ekstra?: Record<string, unknown>) => {
    onTutorEvent?.(jenis, { pesan, ...ekstra });
    setLog((lama) => [...lama.slice(-3), { jenis, pesan }]);
    setCatatan(pesan);
  }, [onTutorEvent]);

  const hitungA = hitung(papanA);
  const hitungB = hitung(papanB);
  const aktif = hitungA;
  const alas = pKubus * lKubus;
  const volumeKubus = alas * tKubus;
  const liter = Math.floor(ml / 1000);
  const sisaMl = ml % 1000;
  const gelas = ml / 250;
  const misiUtuh = misiSel.filter((sel) => sel === "utuh").length;
  const misiSetengah = misiSel.filter((sel) => sel === "setengah").length;
  const misiLuasSiap = misiUtuh === 10 && misiSetengah === 4;
  const kubusSiap = pKubus === 4 && lKubus === 3 && tKubus === 2;

  const targetTulis = tab === "misi"
    ? misi === 1 ? "12" : misi === 2 ? "1500" : "24"
    : tab === "air" ? String(ml) : tab === "kubus" ? String(volumeKubus) : String(Math.round(aktif.luas));
  const kataTulis = tab === "misi"
    ? misi === 1 ? ["dua belas"] : misi === 2 ? ["seribu lima ratus", "seribu lima ratus mililiter"] : ["dua puluh empat"]
    : [];
  const tulisSiap = tab === "misi"
    ? (misi === 1 && misiLuasSiap) || (misi === 2 && ml === 1500) || (misi === 3 && kubusSiap)
    : tab === "air" ? ml > 0 : tab === "kubus" ? volumeKubus > 0 : aktif.luas > 0;

  const pesanIgil = catatan || (
    tab === "luas"
      ? satuan === "m"
        ? "1 m sama dengan 100 cm. Jadi 1 m² sama dengan 10.000 cm²."
        : "Pasang ubin tanpa celah dan tanpa tumpuk. Bentuk beda bisa luasnya sama."
      : tab === "air"
        ? "1.000 mL sama dengan 1 liter. Tinggi air bisa menipu jika wadahnya beda."
        : tab === "kubus"
          ? "Jangan hanya hitung kubus yang kelihatan di depan. Buka lapisannya."
          : misi === 1
            ? "Pasang 10 persegi utuh dan 4 segitiga setengah. Luasnya 12 cm²."
            : misi === 2
              ? "Isi tabung sampai 1 liter 500 mL, yaitu 1.500 mL."
              : "Balok 4 × 3 × 2. Buka lapisan, lalu tulis 24."
  );

  useEffect(() => {
    const kini = Date.now();
    if (kini - ucapTerakhir.current < 1200) return;
    ucapTerakhir.current = kini;
    ucapkan(pesanIgil);
  }, [pesanIgil]);

  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    if (isiTimer.current) window.clearInterval(isiTimer.current);
  }, []);

  useEffect(() => {
    if (mlLama.current < 1000 && ml >= 1000) kirim("BPG_LITER_MILLILITER_LINK", PESAN_LITER, { ml });
    mlLama.current = ml;
  }, [ml, kirim]);

  useEffect(() => {
    if (!misi1 || !misi2 || !misi3 || selesaiRef.current) return;
    selesaiRef.current = true;
    onBenar?.();
    kirim("MISI_SELESAI", "Tiga misi luas dan volume selesai.");
  }, [misi1, misi2, misi3, onBenar, kirim]);

  const gantiPapan = (berikut: Sel[]) => {
    setPapanA(berikut);
  };

  const pasangPada = (papan: 0 | 1, indeks: number) => {
    const sumber = papan === 0 ? papanA : papanB;
    const salin = [...sumber];
    const sekarang = salin[indeks] ?? "kosong";
    if (alat === "hapus") salin[indeks] = "kosong";
    else if (alat === "utuh") salin[indeks] = "utuh";
    else if (sekarang === "setengah") {
      salin[indeks] = "utuh";
      kirim("BPG_HALF_TRIANGLE_COMBINED", PESAN_SETENGAH);
    } else salin[indeks] = "setengah";
    if (papan === 0) setPapanA(salin);
    else setPapanB(salin);
  };

  const aturSlider = (p: number, l: number) => {
    setPanjang(p);
    setLebar(l);
    setKembar(false);
    gantiPapan(isiPersegi(p, l));
  };

  const ujiCelah = () => {
    setKembar(false);
    gantiPapan(papanCelah(panjang, lebar));
    setCatatan("Ubin yang renggang atau bertumpuk tidak dihitung sebagai luas. Tutup harus rapat, tanpa celah.");
  };

  const rapikan = () => {
    setKembar(false);
    gantiPapan(isiPersegi(panjang, lebar));
    setCatatan("Ubin sudah rapi. Setiap petak tertutup satu kali, tanpa celah.");
  };

  const ujiSama = () => {
    setSatuan("cm");
    setKembar(true);
    setPanjang(4);
    setLebar(3);
    setPapanA(isiPersegi(4, 3));
    setPapanB(isiPersegi(6, 2));
    kirim("BPG_CONSERVATION_OF_AREA", PESAN_SAMA, { luas: 12 });
  };

  const tuang = (delta: number) => {
    setIlusi(false);
    setMl((lama) => Math.max(0, Math.min(2000, lama + delta)));
  };

  const ujiIlusi = () => {
    setIlusi(true);
    kirim("BPG_VOLUME_CONSERVATION", PESAN_ILUSI, { ml: 500 });
  };

  const isiLapis = () => {
    if (isiTimer.current) window.clearInterval(isiTimer.current);
    setTerisi(0);
    setPisah(false);
    let langkah = 0;
    const tujuan = pKubus * lKubus * tKubus;
    isiTimer.current = window.setInterval(() => {
      langkah += 1;
      setTerisi(langkah);
      if (langkah >= tujuan && isiTimer.current) {
        window.clearInterval(isiTimer.current);
        isiTimer.current = null;
      }
    }, 90);
  };

  const bukaLapis = () => {
    const total = pKubus * lKubus * tKubus;
    setTerisi(total);
    setPisah(true);
    const pesan = `Awas, jangan hanya menghitung kubus yang kelihatan di depan! Dengan membuka tiap lapisan, kita tahu setiap lapis berisi ${alas} kubus. Karena ada ${tKubus} lapis, totalnya adalah ${total} cm³!`;
    kirim("BPG_HIDDEN_CUBES_REVEALED", pesan, { baseCount: alas, layers: tKubus, totalCubes: total });
  };

  const pasangMisi = (indeks: number) => {
    const salin = [...misiSel];
    const sekarang = salin[indeks];
    if (alatMisi === "hapus") salin[indeks] = "kosong";
    else if (alatMisi === "utuh") salin[indeks] = "utuh";
    else if (sekarang === "setengah") {
      salin[indeks] = "utuh";
      kirim("BPG_HALF_TRIANGLE_COMBINED", PESAN_SETENGAH);
    } else salin[indeks] = "setengah";
    setMisiSel(salin);
  };

  const terimaTulis = () => {
    if (tab === "misi" && misi === 1 && misiLuasSiap) setMisi1(true);
    if (tab === "misi" && misi === 2 && ml === 1500) setMisi2(true);
    if (tab === "misi" && misi === 3 && kubusSiap) setMisi3(true);
    if (tab !== "misi") setCatatan("Hasil tulismu cocok dengan angka di panggung.");
  };

  const dengar = (ucapan: string) => {
    const alias = [targetTulis, ...kataTulis];
    const cocok = cocokSuara(ucapan, alias);
    if (!tulisSiap) {
      setCatatan("Atur dulu ubin, air, atau kubusnya, baru sebutkan angkanya.");
      return;
    }
    if (!cocok) {
      setCatatan("Ulangi angkanya pelan-pelan.");
      return;
    }
    terimaTulis();
    setCatatan("Ucapanmu cocok dengan hasil ukur.");
  };

  const mulaiMic = () => {
    const contoh = kataTulis[0] || targetTulis;
    const W = window as Window & { SpeechRecognition?: new () => MesinMic; webkitSpeechRecognition?: new () => MesinMic };
    const Konstruktor = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!Konstruktor) {
      dengar(contoh);
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
      dengar(contoh);
    }
  };

  const rumusSisi = sisiTeks(satuan);
  const akhiran = satuanTeks(satuan);

  return (
    <section className="relative flex min-h-[82vh] flex-col overflow-hidden rounded-3xl bg-[#F4F6FF] text-[#1C01A5]">
      <style>{`@keyframes igil-ombak{0%{transform:translateX(0)}50%{transform:translateX(-18%)}100%{transform:translateX(0)}}.igil-ombak{animation:igil-ombak 1.8s ease-in-out infinite}`}</style>
      <header className="flex flex-wrap gap-2 border-b border-indigo-100 bg-white px-3 py-3">
        {([
          ["luas", "Studio Ubin Luas"],
          ["air", "Laboratorium Fluida"],
          ["kubus", "Kubus Satuan 3D"],
          ["misi", "Misi Terbimbing"],
        ] as [TabLab, string][]).map(([id, label]) => (
          <button key={id} type="button" className={tombol(tab === id)} onClick={() => { setTab(id); setCatatan(""); }}>{label}</button>
        ))}
        <p className="ml-auto self-center text-xs font-black text-indigo-400">
          {misi1 ? "Misi 1 siap" : "Misi 1"} · {misi2 ? "Misi 2 siap" : "Misi 2"} · {misi3 ? "Misi 3 siap" : "Misi 3"}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-h-[320px] rounded-3xl bg-white p-4 ring-1 ring-indigo-100">
          {tab === "luas" ? (
            <div className="space-y-3">
              <p className="text-center text-lg font-black">
                Persegi utuh {aktif.utuh} · Segitiga setengah {aktif.setengah}
              </p>
              <p className="text-center text-sm font-bold text-indigo-500">2 segitiga setengah = 1 persegi</p>
              <p className="text-center text-base font-black">
                {panjang}{rumusSisi ? ` ${rumusSisi}` : ""} × {lebar}{rumusSisi ? ` ${rumusSisi}` : ""} = {panjang * lebar} {akhiran}
              </p>
              <p className="text-center text-sm font-bold">Ubin terpasang {angkaLuas(kembar ? hitungA.luas : aktif.luas)} {akhiran}{kembar ? ` · Bangun B ${angkaLuas(hitungB.luas)} ${akhiran}` : ""}</p>
              <div className={`flex flex-wrap justify-center gap-4 ${kembar ? "" : ""}`}>
                <div>
                  {kembar ? <p className="mb-1 text-center text-xs font-black">Bangun A · 4 × 3</p> : null}
                  <PanggungUbin papan={papanA} kolom={KOLOM} onPilih={(i) => pasangPada(0, i)} />
                </div>
                {kembar ? (
                  <div>
                    <p className="mb-1 text-center text-xs font-black">Bangun B · 6 × 2</p>
                    <PanggungUbin papan={papanB} kolom={KOLOM} onPilih={(i) => pasangPada(1, i)} />
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={tombol(alat === "utuh")} onClick={() => setAlat("utuh")}>Ubin Persegi Utuh (1 satuan)</button>
                <button type="button" className={tombol(alat === "setengah")} onClick={() => setAlat("setengah")}>Ubin Segitiga Setengah (1/2 satuan)</button>
                <button type="button" className={tombol(alat === "hapus")} onClick={() => setAlat("hapus")}>Penghapus Ubin</button>
              </div>
              <label className="block text-sm font-black">Panjang {panjang}
                <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={10} value={panjang} onChange={(e) => aturSlider(Number(e.target.value), lebar)} />
              </label>
              <label className="block text-sm font-black">Lebar {lebar}
                <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={6} value={lebar} onChange={(e) => aturSlider(panjang, Number(e.target.value))} />
              </label>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={tombol(satuan === "origami")} onClick={() => setSatuan("origami")}>Kertas Origami (Satuan Tak Baku)</button>
                <button type="button" className={tombol(satuan === "cm")} onClick={() => setSatuan("cm")}>Sentimeter Persegi (cm² - Buku/Meja)</button>
                <button type="button" className={tombol(satuan === "m")} onClick={() => setSatuan("m")}>Meter Persegi (m² - Lantai Kelas/Lapangan)</button>
                <button type="button" className={tombol()} onClick={() => setKembar((v) => !v)}>{kembar ? "Layar Tunggal" : "Layar Kembar"}</button>
                <button type="button" className={tombol()} onClick={ujiCelah}>Uji Salah Pasang (Ada Celah / Tumpuk)</button>
                <button type="button" className={tombol(true)} onClick={rapikan}>Rapikan Tanpa Celah!</button>
                <button type="button" className={tombol(true)} onClick={ujiSama}>Uji Bentuk Berbeda, Luas Sama (12 cm²)</button>
              </div>
            </div>
          ) : null}

          {tab === "air" || (tab === "misi" && misi === 2) ? (
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-end gap-3">
                <div className="flex h-64 flex-col justify-between text-[11px] font-black text-indigo-400">
                  {[2000, 1500, 1000, 500, 0].map((garis) => <span key={garis}>{garis === 1000 || garis === 2000 ? garis.toLocaleString("id-ID") : garis}</span>)}
                </div>
                <TabungAir ml={ilusi ? 500 : ml} />
              </div>
              <div className={`w-full max-w-sm space-y-2 rounded-2xl p-3 ${ml === 1000 || ml === 2000 ? "bg-emerald-50" : "bg-sky-50"}`}>
                <p className="text-sm font-black">Layar Konverter Volume</p>
                <p className="text-sm font-bold">{gelas.toLocaleString("id-ID", { maximumFractionDigits: 1 })} Gelas (@250 mL)</p>
                <p className="text-lg font-black">{ml.toLocaleString("id-ID")} mL</p>
                <p className="text-sm font-black">{ml.toLocaleString("id-ID")} mL = {liter} Liter {sisaMl.toLocaleString("id-ID")} mL</p>
              </div>
              {ilusi ? (
                <div className="flex items-end gap-3">
                  <WadahIlusi nama="Tabung sempit" tinggi="h-40" air="78%" bentuk="rounded-b-3xl rounded-t-md" />
                  <WadahIlusi nama="Mangkuk lebar" tinggi="h-20 w-24" air="35%" bentuk="rounded-b-[2rem] rounded-t-md" />
                  <WadahIlusi nama="Labu" tinggi="h-32" air="48%" bentuk="rounded-[2rem]" />
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                <button type="button" className={tombol()} onClick={() => tuang(100)}>+ 1 Sendok/Cangkir Kecil (100 mL)</button>
                <button type="button" className={tombol()} onClick={() => tuang(250)}>+ 1 Gelas Takar (250 mL)</button>
                <button type="button" className={tombol()} onClick={() => tuang(500)}>+ 1 Botol Sedang (500 mL)</button>
                <button type="button" className={tombol()} onClick={() => tuang(1000)}>+ 1 Kotak Susu Besar (1.000 mL / 1 Liter)</button>
                <button type="button" className={tombol()} onClick={() => tuang(-100)}>- Kuras 100 mL</button>
                <button type="button" className={tombol(true)} onClick={() => { setIlusi(false); setMl(0); }}>Kosongkan Tabung</button>
                <button type="button" className={tombol(true)} onClick={ujiIlusi}>Tuang ke 3 Bentuk Wadah Berbeda</button>
              </div>
            </div>
          ) : null}

          {tab === "kubus" || (tab === "misi" && misi === 3) ? (
            <div className="space-y-3">
              <KubusIsometrik panjang={pKubus} lebar={lKubus} tinggi={tKubus} terisi={terisi} pisah={pisah} />
              <p className="text-center text-sm font-black">
                Alas (Panjang × Lebar) = {pKubus} × {lKubus} = {alas} kubus per lapis × Tinggi ({tKubus} lapis) = {volumeKubus} cm³
              </p>
              <label className="block text-sm font-black">Panjang {pKubus} kubus
                <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={5} value={pKubus} onChange={(e) => { const v = Number(e.target.value); setPKubus(v); setTerisi(v * lKubus * tKubus); setPisah(false); }} />
              </label>
              <label className="block text-sm font-black">Lebar {lKubus} kubus
                <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={4} value={lKubus} onChange={(e) => { const v = Number(e.target.value); setLKubus(v); setTerisi(pKubus * v * tKubus); setPisah(false); }} />
              </label>
              <label className="block text-sm font-black">Tinggi {tKubus} lapis
                <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={4} value={tKubus} onChange={(e) => { const v = Number(e.target.value); setTKubus(v); setTerisi(pKubus * lKubus * v); setPisah(false); }} />
              </label>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={tombol(true)} onClick={isiLapis}>Isi Lapis demi Lapis (Animasi Stack)</button>
                <button type="button" className={tombol(pisah)} onClick={bukaLapis}>Mode Sinar-X / Pisahkan Lapisan (Exploded View)</button>
              </div>
            </div>
          ) : null}

          {tab === "misi" && misi === 1 ? (
            <div className="space-y-3">
              <p className="text-sm font-black">Misi 1 · 10 persegi utuh + 4 segitiga setengah = 12 cm²</p>
              <p className="text-sm font-bold text-indigo-500">Utuh {misiUtuh}/10 · Setengah {misiSetengah}/4</p>
              <div className="grid w-fit grid-cols-4 gap-1">
                {misiSel.map((sel, indeks) => <SelUbin key={indeks} sel={sel} onClick={() => pasangMisi(indeks)} />)}
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={tombol(alatMisi === "utuh")} onClick={() => setAlatMisi("utuh")}>Ubin Persegi Utuh (1 satuan)</button>
                <button type="button" className={tombol(alatMisi === "setengah")} onClick={() => setAlatMisi("setengah")}>Ubin Segitiga Setengah (1/2 satuan)</button>
                <button type="button" className={tombol(alatMisi === "hapus")} onClick={() => setAlatMisi("hapus")}>Penghapus Ubin</button>
              </div>
            </div>
          ) : null}

          {tab === "misi" ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className={tombol(misi === 1)} onClick={() => setMisi(1)}>Misi 1 Luas</button>
              <button type="button" className={tombol(misi === 2)} onClick={() => setMisi(2)}>Misi 2 Liter</button>
              <button type="button" className={tombol(misi === 3)} onClick={() => { setMisi(3); setPKubus(4); setLKubus(3); setTKubus(2); setTerisi(24); }}>Misi 3 Kubus</button>
            </div>
          ) : null}
        </div>

        <aside className="flex flex-col gap-3 rounded-3xl bg-white p-4 ring-1 ring-indigo-100">
          <KanvasTulis kunci={`${tab}-${misi}`} target={targetTulis} kata={kataTulis} siap={tulisSiap} onBenar={terimaTulis} />
          <div>
            <p className="text-xs font-black uppercase tracking-wide">Suara</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={tombol(menyimak)} onClick={mulaiMic}>{menyimak ? "Mendengar…" : "Mikrofon"}</button>
              <button type="button" className={tombol()} onClick={() => dengar(kataTulis[0] || targetTulis)}>Simulasi suara</button>
            </div>
          </div>
        </aside>
      </div>

      <footer className="border-t border-indigo-100 bg-white/90 p-3">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex items-end gap-2">
            <button type="button" onClick={() => ucapkan(pesanIgil)} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-200 text-4xl ring-2 ring-amber-400" aria-label="Baca suara IGIL">🦉</button>
            <p className="max-w-xl rounded-2xl rounded-bl-md bg-amber-50 px-3 py-2 text-sm font-bold leading-snug text-amber-950 ring-2 ring-amber-200">
              <span className="mb-0.5 block text-[11px] font-black uppercase tracking-wide">Profesor Arsitek IGIL</span>
              {pesanIgil}
            </p>
          </div>
          <div className="min-w-[220px] flex-1">
            <p className="text-xs font-black uppercase tracking-wide text-indigo-400">Log Pedagogis BPG-IGIL</p>
              {log.length === 0 ? <p className="text-xs font-semibold text-slate-500">Belum ada catatan.</p> : log.slice(-2).map((baris, indeks) => (
              <p key={`${baris.jenis}-${indeks}`} className="text-xs font-semibold leading-snug text-slate-700"><span className="font-black text-[#1C01A5]">{baris.jenis}</span> {baris.pesan}</p>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
