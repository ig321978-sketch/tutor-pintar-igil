"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as AcaraPointer } from "react";
import type { KelaminGuru } from "@/lib/guru";

type TabLab = "luas" | "volume";

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

const TARGET_P = 5;
const TARGET_L = 4;
const TARGET_LUAS = TARGET_P * TARGET_L;

function normal(teks: string): string {
  return teks.toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ").trim();
}

function cocokSuara(teks: string, alias: string[]): boolean {
  const rapat = normal(teks).replace(/\s/g, "");
  return alias.some((item) => {
    const a = normal(item).replace(/\s/g, "");
    if (!a) return false;
    if (rapat === a) return true;
    if (rapat.includes(a)) {
      const sisa = rapat.slice(rapat.indexOf(a) + a.length);
      if (sisa.startsWith("belas") || sisa.startsWith("puluh") || sisa.startsWith("ratus") || sisa.startsWith("ribu")) return false;
      return a.length >= 4;
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
  return `inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl px-4 text-sm font-black transition ${
    aktif ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-indigo-200 hover:bg-indigo-50"
  }`;
}

function ProfesorIgil({ pesan, onUlang }: { pesan: string; onUlang: () => void }) {
  return (
    <div className="flex items-end gap-2">
      <button type="button" onClick={onUlang} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-200 text-4xl ring-2 ring-amber-400" aria-label="Baca suara IGIL">
        🦉
      </button>
      <p className="max-w-md rounded-2xl rounded-bl-md bg-amber-50 px-3 py-2 text-sm font-bold leading-snug text-amber-950 ring-2 ring-amber-200">
        <span className="mb-0.5 block text-[11px] font-black uppercase tracking-wide">IGIL</span>
        {pesan}
      </p>
    </div>
  );
}

function KanvasTulis({
  kunci,
  diterima,
  label,
  onHasil,
}: {
  kunci: string;
  diterima: string[];
  label: string;
  onHasil: (benar: boolean) => void;
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
    const lebar = Math.max(induk.clientWidth, 140);
    const tinggi = 120;
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
    if (!kanvas) return;
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
      setPesan("Tulis angkanya dulu.");
      onHasil(false);
      return;
    }
    let cocok = false;
    let terbaca = "";
    for (const contoh of diterima) {
      if (!/^\d+$/.test(contoh)) continue;
      const baca = kenaliAngka(kanvas, contoh.length);
      if (baca) terbaca = baca;
      if (baca === contoh) cocok = true;
    }
    const benar = cocok || (bantu && jumlahTinta(kanvas) > 18);
    setPesan(benar ? "Angkamu tepat." : terbaca ? `Terbaca ${terbaca}. Contohnya ${diterima[0]}.` : "IGIL belum yakin. Coba tulis lebih jelas.");
    if (!benar) setBantu(true);
    onHasil(benar);
  };

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{label}</p>
      {bantu ? <p className="text-2xl font-black tracking-widest text-indigo-300">{diterima[0]}</p> : null}
      <div className="mt-1 overflow-hidden rounded-2xl border-2 border-dashed border-indigo-300 bg-[#FFFDF6]">
        <canvas ref={refKanvas} aria-label="Kanvas tulis angka" className="block w-full cursor-crosshair touch-none" style={{ touchAction: "none" }} onPointerDown={mulai} onPointerMove={geser} onPointerUp={lepas} onPointerCancel={lepas} />
      </div>
      <div className="mt-2 flex gap-2">
        <button type="button" className={tombol()} onClick={siapkan}>Hapus</button>
        <button type="button" className={tombol(true)} onClick={periksa}>Cek</button>
      </div>
      {pesan ? <p className="mt-1 text-xs font-bold text-indigo-800">{pesan}</p> : null}
    </div>
  );
}

export default function SimulasiMtk4Bab4({ onBenar, onTutorEvent }: Props) {
  const [tab, setTab] = useState<TabLab>("luas");
  const [panjang, setPanjang] = useState(4);
  const [lebar, setLebar] = useState(3);
  const [ubin, setUbin] = useState<boolean[]>([]);
  const [ml, setMl] = useState(0);
  const [luasSiap, setLuasSiap] = useState(false);
  const [volumeSiap, setVolumeSiap] = useState(false);
  const [menyimak, setMenyimak] = useState(false);
  const [catatan, setCatatan] = useState("");
  const mic = useRef<MesinMic | null>(null);
  const selesaiRef = useRef(false);
  const terakhirBicara = useRef(0);

  const luas = panjang * lebar;
  const terpasang = ubin.filter(Boolean).length;
  const lantaiPas = panjang === TARGET_P && lebar === TARGET_L && terpasang === TARGET_LUAS;
  const tabungPenuh = ml === 1000;

  const pesan = (() => {
    if (luasSiap && volumeSiap) return "Dua tantangan selesai. Kamu sudah mengukur luas dan volume.";
    if (tab === "luas") {
      if (luasSiap) return "Luas 5 kali 4 sama dengan 20 cm². Sekarang coba tabung air.";
      if (!lantaiPas) return "Buat lantai panjang 5 cm dan lebar 4 cm. Pasang semua ubinnya.";
      return "Lantainya siap. Tulis 20 atau ucapkan dua puluh.";
    }
    if (volumeSiap) return "1.000 mL sama dengan 1 liter. Hebat!";
    if (!tabungPenuh) return "Isi tabung sampai tepat 1.000 mL. Itu 1 liter.";
    return "Tabung penuh. Tulis 1000 atau ucapkan satu liter.";
  })();

  useEffect(() => {
    const sekarang = Date.now();
    if (sekarang - terakhirBicara.current < 1500) return;
    terakhirBicara.current = sekarang;
    ucapkan(pesan);
  }, [pesan]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      mic.current?.stop();
    };
  }, []);

  const kirim = (jenis: string, isi: string, ekstra?: Record<string, unknown>) => {
    onTutorEvent?.(jenis, { pesan: isi, ...ekstra });
  };

  const gantiUkuran = (p: number, l: number) => {
    setPanjang(p);
    setLebar(l);
    setUbin((lama) => Array.from({ length: p * l }, (_, i) => Boolean(lama[i])));
  };

  const isiOtomatis = () => {
    setUbin(Array.from({ length: panjang * lebar }, () => true));
    kirim("TILES_FILLED", "Semua ubin terpasang.", { panjang, lebar, luas });
  };

  const ketukPetak = (indeks: number) => {
    setUbin((lama) => {
      const berikut = Array.from({ length: panjang * lebar }, (_, i) => Boolean(lama[i]));
      berikut[indeks] = !berikut[indeks];
      return berikut;
    });
  };

  const tuang = (tambah: number) => {
    setMl((lama) => {
      const berikut = Math.min(1000, lama + tambah);
      kirim("WATER_POURED", `Air sekarang ${berikut} mL.`, { ml: berikut });
      return berikut;
    });
  };

  const aliasLuas = ["20", "dua puluh"];
  const aliasVolume = ["1000", "seribu", "satu liter", "1 liter"];

  const terimaTulis = (benar: boolean) => {
    if (tab === "luas") {
      if (!lantaiPas) {
        setCatatan("Atur lantai 5 cm kali 4 cm dan pasang semua ubin dulu.");
        return;
      }
      setCatatan(benar ? "Luasnya 20 cm²." : "Coba tulis 20.");
      if (benar) {
        setLuasSiap(true);
        kirim("AREA_ANSWERED", "Luas 20 cm² tepat.", { luas: 20 });
      }
      return;
    }
    if (!tabungPenuh) {
      setCatatan("Isi tabung sampai 1.000 mL dulu.");
      return;
    }
    setCatatan(benar ? "1.000 mL sama dengan 1 liter." : "Coba tulis 1000.");
    if (benar) {
      setVolumeSiap(true);
      kirim("VOLUME_ANSWERED", "Volume 1 liter tepat.", { ml: 1000 });
    }
  };

  const dengar = (teks: string) => {
    if (tab === "luas") {
      if (!lantaiPas) {
        setCatatan("Atur lantai 5 cm kali 4 cm dan pasang semua ubin dulu.");
        return;
      }
      const ok = cocokSuara(teks, aliasLuas);
      setCatatan(ok ? "Ucapanmu tepat. Luasnya dua puluh." : "Coba ucapkan dua puluh.");
      if (ok) setLuasSiap(true);
      kirim("VOICE_ANSWERED", ok ? "Suara luas tepat." : "Suara luas belum tepat.", { transkrip: teks });
      return;
    }
    if (!tabungPenuh) {
      setCatatan("Isi tabung sampai 1.000 mL dulu.");
      return;
    }
    const ok = cocokSuara(teks, aliasVolume);
    setCatatan(ok ? "Ucapanmu tepat. Satu liter." : "Coba ucapkan satu liter.");
    if (ok) setVolumeSiap(true);
    kirim("VOICE_ANSWERED", ok ? "Suara volume tepat." : "Suara volume belum tepat.", { transkrip: teks });
  };

  const mulaiMic = () => {
    const win = window as Window & { SpeechRecognition?: new () => MesinMic; webkitSpeechRecognition?: new () => MesinMic };
    const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    const contoh = tab === "luas" ? "dua puluh" : "satu liter";
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

  useEffect(() => {
    if (!luasSiap || !volumeSiap || selesaiRef.current) return;
    selesaiRef.current = true;
    onBenar?.();
    kirim("LAB_COMPLETED", "Lab luas dan volume selesai.");
  }, [luasSiap, volumeSiap, onBenar]);

  const skala = [1000, 800, 600, 400, 200, 0];

  return (
    <section id="lab-mtk-4-bab4" className="relative flex min-h-[78vh] flex-col overflow-hidden rounded-3xl bg-[#F4F6FF] text-[#1C01A5]">
      <header className="flex flex-wrap gap-2 border-b border-indigo-100 bg-white px-3 py-3">
        <button type="button" className={tombol(tab === "luas")} onClick={() => { setTab("luas"); setCatatan(""); }}>Pasang Ubin Luas</button>
        <button type="button" className={tombol(tab === "volume")} onClick={() => { setTab("volume"); setCatatan(""); }}>Tuang Air Volume</button>
        <p className="ml-auto self-center text-xs font-black text-indigo-400">{luasSiap ? "Luas siap" : "Luas belum"} · {volumeSiap ? "Volume siap" : "Volume belum"}</p>
      </header>

      <div className="grid min-h-0 flex-1 gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex min-h-[320px] flex-col justify-between rounded-3xl bg-white p-4 ring-1 ring-indigo-100">
          {tab === "luas" ? (
            <>
              <div>
                <p className="text-center text-lg font-black">{panjang} cm × {lebar} cm = {luas} cm²</p>
                <p className="text-center text-xs font-bold text-indigo-400">Ubin terpasang {terpasang} dari {luas}</p>
                <div className="mx-auto mt-4 grid w-fit gap-1" style={{ gridTemplateColumns: `repeat(${panjang}, 2.25rem)` }}>
                  {Array.from({ length: luas }, (_, indeks) => (
                    <button key={indeks} type="button" aria-label={`Petak ${indeks + 1}`} onClick={() => ketukPetak(indeks)} className={`h-9 w-9 rounded-md transition ${ubin[indeks] ? "bg-sky-400" : "bg-sky-50 ring-2 ring-sky-200"}`} />
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <label className="block text-sm font-black">Panjang {panjang} cm
                  <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={10} value={panjang} onChange={(e) => gantiUkuran(Number(e.target.value), lebar)} />
                </label>
                <label className="block text-sm font-black">Lebar {lebar} cm
                  <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={1} max={8} value={lebar} onChange={(e) => gantiUkuran(panjang, Number(e.target.value))} />
                </label>
                <button type="button" className={tombol(true)} onClick={isiOtomatis}>Isi Ubin Otomatis</button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
              <div className="flex shrink-0 items-end gap-2">
                <div className="flex h-64 flex-col justify-between py-1 text-[11px] font-black text-indigo-400">
                  {skala.map((garis) => <span key={garis}>{garis === 1000 ? "1.000" : garis}</span>)}
                </div>
                <div className="relative h-64 w-24 overflow-hidden rounded-b-3xl rounded-t-md border-4 border-sky-300 bg-sky-50">
                  {Array.from({ length: 9 }, (_, indeks) => (
                    <span key={indeks} className="absolute left-0 right-0 border-t border-sky-200" style={{ bottom: `${(indeks + 1) * 10}%` }} />
                  ))}
                  <div className="absolute inset-x-1 bottom-1 rounded-b-2xl bg-sky-500 transition-all duration-500" style={{ height: `${Math.max(0, (ml / 1000) * 100 - 2)}%` }} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className={`rounded-2xl px-4 py-3 text-center text-lg font-black ${tabungPenuh ? "bg-emerald-100 text-emerald-800" : "bg-sky-50 text-[#1C01A5]"}`}>
                  {ml.toLocaleString("id-ID")} mL{tabungPenuh ? " = 1 Liter!" : ""}
                </p>
                <button type="button" className={tombol()} onClick={() => tuang(200)}>+ 1 Gelas (200 mL)</button>
                <button type="button" className={tombol()} onClick={() => tuang(500)}>+ 1 Botol (500 mL)</button>
                <button type="button" className={tombol(true)} onClick={() => setMl(0)}>Kosongkan Tabung</button>
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col justify-between gap-3 rounded-3xl bg-white p-4 ring-1 ring-indigo-100">
          <KanvasTulis
            kunci={tab}
            diterima={tab === "luas" ? ["20"] : ["1000"]}
            label={tab === "luas" ? "Tulis luasnya" : "Tulis 1000"}
            onHasil={terimaTulis}
          />
          <div>
            <p className="text-xs font-black uppercase tracking-wide">Suara</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className={tombol(menyimak)} onClick={mulaiMic}>{menyimak ? "Mendengar…" : "Mikrofon"}</button>
              <button type="button" className={tombol()} onClick={() => dengar(tab === "luas" ? "dua puluh" : "satu liter")}>Simulasi suara</button>
            </div>
            {catatan ? <p className="mt-2 text-sm font-bold text-indigo-800">{catatan}</p> : null}
          </div>
        </aside>
      </div>

      <footer className="border-t border-indigo-100 bg-white/80 p-3">
        <ProfesorIgil pesan={pesan} onUlang={() => ucapkan(pesan)} />
      </footer>
    </section>
  );
}
