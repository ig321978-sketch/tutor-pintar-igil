"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import { bagiBangun, lintasanSektor, ujungGaris, type Bangun, type Potong } from "./geometri";
import {
  BENDA,
  PITA_BARIS,
  UKURAN_SATUAN,
  adilEmpat,
  dasarDari,
  garisSah,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  namaKunci,
  petunjukBagi,
  petunjukSalah,
  petunjukSusun,
  petunjukUrut,
  petunjukWarnai,
  pilihanAngka,
  pilihanNamaDari,
  seperempat,
  siapLangsung,
  urutanKartu,
  type Cara,
  type Klaim,
  type LAdil,
  type LGaris,
  type LHitung,
  type LNama,
  type LPilih,
  type LSusun,
  type LUrut,
  type LWarnai,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, angkaDariUcapan, tataBangun } from "./periksa";
import { JawabSuaraPanen, PilihanKata, teksKunci } from "./JawabPanen";

/**
 * Satu tugas CPA Kelas 2 Bab 5 Sub-Bab C: memilih pembagian yang adil, menarik dua garis, mewarnai seperempat, menyusun pita, mengurutkan langkah, memilih
 * angka, tugas Cari kesalahan (putuskan benar atau salah, pilih alasan), lalu menjawab menurut caranya (pilih, tulis satu angka di kanvas, atau ucapkan).
 * Rupa: benda berwarna beremoji (Concrete), bangun polos berwarna (Pictorial), kartu kata dan lambang saja (Abstract). Luas bagian dihitung program.
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

const bangunDari = (kode: string): Bangun => BENDA[kode]?.bangun ?? (kode === "lingkaran" ? "lingkaran" : "persegi");
const SILANG: Potong[] = [{ a: 90 }, { a: 0 }];

/* ------------------------------ Bangun yang dibagi ------------------------------ */
/**
 * Satu bangun yang dibagi garis, berpusat di (cx, cy) dengan jari-jari (lingkaran) atau setengah sisi (persegi) `r`. Tiap bagian bisa diwarnai dan diketuk.
 * Benda (Concrete): warna benda dan emoji di atasnya. Diagram (Pictorial): bangun polos berwarna biru muda.
 */
function Bentuk({ kode, bangun, potong, warna = [], rupa, cx, cy, r, tap, tanda }: { kode: string; bangun: Bangun; potong: readonly Potong[]; warna?: readonly number[]; rupa: Rupa; cx: number; cy: number; r: number; tap?: (i: number) => void; tanda?: boolean }) {
  const bagian = bagiBangun(bangun, potong);
  const dasar = rupa === "benda" ? (BENDA[kode]?.warna ?? "#FDE68A") : "#EFF6FF";
  const diwarnai = rupa === "benda" ? "#EA580C" : "#2563EB";
  const garis = { stroke: UNGU, strokeWidth: 1.8, strokeLinejoin: "round" as const };
  return (
    <g>
      {rupa === "benda" ? (
        <text x={cx} y={cy - r - 5} textAnchor="middle" fontSize={15} aria-hidden="true">
          {BENDA[kode]?.emoji}
        </text>
      ) : null}
      {bagian.map((b, i) => {
        const aktif = warna.includes(i);
        const isi = aktif ? diwarnai : dasar;
        const k = tap ? ketuk(() => tap(i)) : {};
        if (b.titik) {
          const pts = b.titik.map(([x, y]) => `${(cx + x * r).toFixed(1)},${(cy + y * r).toFixed(1)}`).join(" ");
          return <polygon key={i} points={pts} fill={isi} {...garis} {...k} aria-label={`bagian ${i + 1}`} />;
        }
        return <path key={i} d={lintasanSektor(cx, cy, r, b.dari ?? 0, b.ke ?? 360)} fill={isi} {...garis} {...k} aria-label={`bagian ${i + 1}`} />;
      })}
      {tanda ? <circle cx={cx} cy={cy} r={r + 5} fill="none" stroke={HIJAU} strokeWidth={3} /> : null}
    </g>
  );
}

/** Deret pita sama panjang: `n` pita selebar total `lebar` di (x, y). */
function Pita({ n, x, y, lebar, tinggi = 22, rupa, sorot = false, teks, warna }: { n: number; x: number; y: number; lebar: number; tinggi?: number; rupa: Rupa; sorot?: boolean; teks?: string; warna?: string }) {
  const isi = warna ?? (rupa === "benda" ? "#FBCFE8" : "#BFDBFE");
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x + (i * lebar) / n} y={y} width={lebar / n} height={tinggi} rx={2} fill={isi} stroke={sorot ? MERAH : UNGU} strokeWidth={sorot ? 2.8 : 1.5} />
          {teks ? (
            <text x={x + ((i + 0.5) * lebar) / n} y={y + tinggi / 2 + 3} textAnchor="middle" fontSize={n > 2 ? 6.4 : 8} fontWeight={800} fill={UNGU}>
              {teks}
            </text>
          ) : null}
        </g>
      ))}
    </g>
  );
}

/** Kartu kata dan lambang (Abstract): satu kotak berisi lambang pecahan dan kata, tanpa gambar benda. */
function KartuLambang({ baris, judul }: { baris: string[]; judul: string }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#166534] bg-[#F0FDF4] p-3 text-center" aria-label={judul} role="img">
      <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-[#166534]">{judul}</p>
      {baris.map((b) => (
        <p key={b} className="text-lg font-black text-[#14532D]">
          {b}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------ Gambar untuk tugas Hitung dan Nama ------------------------------ */
const POTONG_P: Record<number, Potong[]> = { 2: [{ a: 90 }], 4: SILANG };

function GambarHitung({ l, rupa }: { l: LHitung; rupa: Rupa }) {
  if (rupa === "lambang") {
    switch (l.jenis) {
      case "potong":
        return <KartuLambang judul="kartu hitung" baris={[`${l.n} ${BENDA[l.benda]?.nama ?? l.benda}`, `tiap-tiapnya ${l.p} bagian sama besar`, "jumlah potong = ?"]} />;
      case "lipatan":
        return <KartuLambang judul="kartu hitung" baris={[`${l.n} ${BENDA[l.benda]?.nama ?? l.benda}`, "tiap-tiapnya dilipat 2 kali", "jumlah lipatan = ?"]} />;
      case "dinding":
        return <KartuLambang judul="kartu dinding" baris={["baris pertama: 1 pita utuh", "baris kedua: ½ ½", "baris ketiga: ¼ ¼ ¼ ¼"]} />;
      case "sisa":
        return <KartuLambang judul="kartu hitung" baris={["4 bagian sama besar", `${l.berwarna} bagian diwarnai`, "belum diwarnai = ?"]} />;
      case "fakta":
        return <KartuLambang judul="kartu pecahan" baris={[`? buah ${l.kecil === "seperempat" ? "¼" : "½"} = 1 ${l.besar}`]} />;
      case "kali":
        return <KartuLambang judul="kartu bagi dua" baris={["1 utuh → ½ → ¼", `membagi dua sampai ${l.bagian} bagian`, "berapa kali?"]} />;
    }
  }
  if (l.jenis === "potong" || l.jenis === "lipatan") {
    const n = l.n;
    const t = tataBangun(n);
    const bangun = bangunDari(l.benda);
    const potong = l.jenis === "potong" ? POTONG_P[l.p] : SILANG;
    return (
      <Gambar label="Benda yang dibagi" judul={l.jenis === "potong" ? "tiap benda dibagi sama besar" : "tiap kertas dilipat dua kali"}>
        {t.pusat.map((p, i) => (
          <Bentuk key={i} kode={l.benda} bangun={bangun} potong={potong} rupa={rupa} cx={p.x} cy={p.y} r={t.r} />
        ))}
      </Gambar>
    );
  }
  if (l.jenis === "sisa") {
    const bangun = bangunDari(l.benda);
    return (
      <Gambar label="Benda dengan bagian berwarna" judul="satu benda, empat bagian sama besar">
        <Bentuk kode={l.benda} bangun={bangun} potong={SILANG} warna={Array.from({ length: l.berwarna }, (_, i) => i)} rupa={rupa} cx={150} cy={108} r={52} />
      </Gambar>
    );
  }
  if (l.jenis === "dinding") {
    return (
      <Gambar label="Dinding pita" judul="dinding pita tiga baris">
        {PITA_BARIS.map((n, b) => (
          <g key={b}>
            <text x={20} y={53 + b * 38} textAnchor="middle" fontSize={8} fontWeight={800} fill={UNGU}>
              {b + 1}
            </text>
            <Pita n={n} x={34} y={36 + b * 38} lebar={236} rupa={rupa} sorot={l.baris.includes(b)} />
          </g>
        ))}
      </Gambar>
    );
  }
  return null;
}

function GambarNama({ l, rupa }: { l: LNama; rupa: Rupa }) {
  if (rupa === "lambang") {
    switch (l.jenis) {
      case "satuan":
        return <KartuLambang judul="kartu pecahan" baris={[`${l.n} × ¼ = ?`]} />;
      case "setengahSetengah":
        return <KartuLambang judul="kartu pecahan" baris={["½ dari ½ = ?"]} />;
      case "bagian":
        return <KartuLambang judul="kartu pecahan" baris={[`${l.n} bagian sama besar`, "tiap bagian = ¼ ?"]} />;
      default:
        return null;
    }
  }
  if (l.jenis === "sebut" || l.jenis === "adil") {
    const warna = l.jenis === "sebut" ? l.warna : [];
    return (
      <Gambar label="Benda yang dibagi" judul={l.jenis === "sebut" ? "satu bagian berwarna" : "bagian-bagiannya"}>
        <Bentuk kode={l.benda} bangun={l.bangun} potong={l.potong} warna={warna} rupa={rupa} cx={150} cy={108} r={54} />
      </Gambar>
    );
  }
  if (l.jenis === "satuan") {
    return (
      <Gambar label="Pita seperempat berderet" judul="pita seperempat berderet">
        <Pita n={l.n} x={34} y={86} lebar={(236 * l.n) / 4} rupa={rupa} />
        <Pita n={1} x={34} y={130} lebar={236} rupa={rupa} warna={rupa === "benda" ? "#FDE68A" : "#E0E7FF"} teks="pita pembanding" />
      </Gambar>
    );
  }
  return null;
}

/* ------------------------------ Pilih pembagian yang adil ------------------------------ */
function Adil({ l, rupa, salah, siap }: PK & { l: LAdil }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const ketukPilihan = (i: number) => {
    if (dapat !== null || mati.includes(i)) return;
    if (adilEmpat(l.bangun, l.pilihan[i])) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, i]);
      salah(petunjukBagi(l.bangun, l.pilihan[i]));
    }
  };
  return (
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih pembagian yang adil">
      {l.pilihan.map((p, i) => (
        <button
          key={i}
          type="button"
          disabled={mati.includes(i)}
          onClick={() => ketukPilihan(i)}
          aria-label={`Pembagian ${String.fromCharCode(65 + i)}`}
          className={`rounded-2xl border-4 bg-white p-1 disabled:opacity-35 ${dapat === i ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#1C01A5]"}`}
        >
          <svg viewBox="0 0 100 110" className="mx-auto block h-[110px] w-full max-w-[130px]" aria-hidden="true">
            <Bentuk kode={l.benda} bangun={l.bangun} potong={p} rupa={rupa} cx={50} cy={58} r={36} />
            <text x={50} y={106} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
              {String.fromCharCode(65 + i)}
            </text>
          </svg>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Tarik dua garis ------------------------------ */
const HURUF_GARIS = ["A", "B", "C", "D"];
function Garis({ l, rupa, salah, siap, info }: PK & { l: LGaris }) {
  const [pilih, setPilih] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const r = 62;
  const ketukGaris = (i: number) => {
    if (selesai || pilih.includes(i)) return;
    const baru = [...pilih, i];
    if (baru.length < 2) {
      setPilih(baru);
      info("Pilih satu garis lagi.");
      return;
    }
    if (garisSah(l, baru[0], baru[1])) {
      setPilih(baru);
      setSelesai(true);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setPilih(baru);
      salah(petunjukBagi(l.bangun, [l.kandidat[baru[0]], l.kandidat[baru[1]]]));
      window.setTimeout(() => setPilih([]), 900);
    }
  };
  return (
    <div className="space-y-2">
      <Gambar label="Bangun dengan empat garis pilihan" judul="ketuk dua garis, lalu lihat bagiannya">
        <Bentuk kode={l.benda} bangun={l.bangun} potong={selesai ? pilih.map((i) => l.kandidat[i]) : []} rupa={rupa} cx={150} cy={108} r={r} />
        {l.kandidat.map((p, i) => {
          const [a, b] = ujungGaris(p, 150, 108, r, r + 12);
          const aktif = pilih.includes(i);
          return (
            <g key={i} {...ketuk(() => ketukGaris(i))} aria-label={`Garis ${HURUF_GARIS[i]}`}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="transparent" strokeWidth={18} />
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={aktif ? MERAH : "#7C3AED"} strokeWidth={aktif ? 3.4 : 2.2} strokeDasharray={aktif ? undefined : "6 4"} />
              <circle cx={b[0]} cy={b[1]} r={7} fill="#FFFFFF" stroke={aktif ? MERAH : "#7C3AED"} strokeWidth={1.6} />
              <text x={b[0]} y={b[1] + 3} textAnchor="middle" fontSize={8.4} fontWeight={900} fill={UNGU}>
                {HURUF_GARIS[i]}
              </text>
            </g>
          );
        })}
      </Gambar>
    </div>
  );
}

/* ------------------------------ Warnai seperempat ------------------------------ */
function Warnai({ l, rupa, salah, siap }: PK & { l: LWarnai }) {
  const [warna, setWarna] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const bagian = bagiBangun(l.bangun, l.potong);
  const tap = (i: number) => {
    if (selesai) return;
    setWarna((w) => (w.includes(i) ? w.filter((x) => x !== i) : [...w, i]));
  };
  const periksa = () => {
    if (seperempat(l.bangun, l.potong, warna)) {
      setSelesai(true);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukWarnai(l, warna));
  };
  return (
    <div className="space-y-2">
      <Gambar label="Bangun yang dibagi" judul={`ketuk bagian untuk mewarnai (${kata(bagian.length)} bagian)`}>
        <Bentuk kode={l.benda} bangun={l.bangun} potong={l.potong} warna={warna} rupa={rupa} cx={150} cy={108} r={58} tap={tap} tanda={selesai} />
      </Gambar>
      <div className="flex justify-center">
        <Tombol teks="Periksa" mati={selesai || warna.length === 0} onClick={periksa} />
      </div>
    </div>
  );
}

/* ------------------------------ Susun pita ------------------------------ */
function Susun({ l, rupa, salah, siap }: PK & { l: LSusun }) {
  const [isi, setIsi] = useState<number[]>([]);
  const jumlah = isi.reduce((s, x) => s + x, 0);
  const sasaran = UKURAN_SATUAN[l.sasaran];
  const unit = 56;
  const tambah = (u: number) => {
    if (jumlah >= sasaran) return;
    if (jumlah + u > sasaran) {
      salah("Pita setengah terlalu panjang untuk sisa tempat. Pakai pita seperempat.");
      return;
    }
    const baru = [...isi, u];
    setIsi(baru);
    if (baru.reduce((s, x) => s + x, 0) === sasaran) siap(kalimatKunci(l, "klik", rupa));
  };
  const periksaKurang = () => salah(petunjukSusun(l, jumlah));
  return (
    <div className="space-y-2">
      <Gambar label="Pita sasaran dan pita yang disusun" judul={`susun sampai sama panjang dengan pita ${l.sasaran}`}>
        <text x={34} y={52} fontSize={8.4} fontWeight={900} fill={UNGU}>
          pita {l.sasaran}
        </text>
        <rect x={34} y={58} width={sasaran * unit} height={26} rx={3} fill={rupa === "benda" ? "#FDE68A" : "#E0E7FF"} stroke={UNGU} strokeWidth={1.8} />
        <text x={34} y={112} fontSize={8.4} fontWeight={900} fill={UNGU}>
          pitamu
        </text>
        <rect x={34} y={118} width={sasaran * unit} height={26} rx={3} fill="none" stroke="#94A3B8" strokeDasharray="4 3" />
        {isi.map((u, i) => {
          const x = 34 + isi.slice(0, i).reduce((s, v) => s + v, 0) * unit;
          return <rect key={i} x={x} y={118} width={u * unit} height={26} rx={3} fill={u === 1 ? (rupa === "benda" ? "#FBCFE8" : "#BFDBFE") : rupa === "benda" ? "#FDBA74" : "#93C5FD"} stroke={UNGU} strokeWidth={1.6} />;
        })}
      </Gambar>
      <div className="flex flex-wrap justify-center gap-2">
        <Tombol teks="+ pita seperempat" mati={jumlah >= sasaran} onClick={() => tambah(1)} />
        {l.izinSetengah ? <Tombol teks="+ pita setengah" mati={jumlah >= sasaran} onClick={() => tambah(2)} /> : null}
        <Tombol teks="Ulangi" mati={isi.length === 0 || jumlah >= sasaran} onClick={() => setIsi([])} />
        <Tombol teks="Sudah sama?" mati={jumlah >= sasaran} onClick={periksaKurang} />
      </div>
    </div>
  );
}

/* ------------------------------ Urutkan langkah ------------------------------ */
function Urut({ l, salah, siap, info }: PK & { l: LUrut }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const kartu = urutanKartu(l.langkah.length);
  const ketukKartu = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === l.langkah.length) siap(kalimatKunci(l, "klik"));
      else info("Betul! Langkah berikutnya apa?");
    } else salah(petunjukUrut(l, i));
  };
  return (
    <div className="space-y-1.5" role="group" aria-label="Kartu langkah">
      {kartu.map((i) => (
        <button
          key={i}
          type="button"
          disabled={sudah.includes(i)}
          onClick={() => ketukKartu(i)}
          className={`flex min-h-[52px] w-full items-center gap-2 rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#166534] text-xs font-black text-white" aria-hidden="true">
            {sudah.includes(i) ? i + 1 : "?"}
          </span>
          {l.langkah[i]}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Pilih angka ------------------------------ */
function KartuPilih({ l }: { l: LPilih }) {
  return l.jenis === "fakta" ? (
    <KartuLambang judul="kartu pecahan" baris={[`? buah ${l.kecil === "seperempat" ? "¼" : "½"} = 1 ${l.besar === "setengah" ? "½" : "utuh"}`]} />
  ) : (
    <KartuLambang judul="kartu lipat" baris={[`kertas dilipat ${l.kali} kali`, "bagian sama besar = ?"]} />
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "gambar")
    return (
      <Gambar label="Gambar yang dibicarakan" judul="gambar yang dibicarakan">
        <Bentuk kode={k.benda} bangun={k.bangun} potong={k.potong} rupa={rupa} cx={150} cy={108} r={54} />
      </Gambar>
    );
  return <KartuLambang judul="kartu pecahan" baris={[`${k.n} × ${k.kecil === "seperempat" ? "¼" : "½"} = 1 ${k.besar}`]} />;
}
function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  const betul = klaimBenar(l.klaim);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar === betul) {
      setTahap("alasan");
      info(betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${l.keliru}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <GambarKlaim k={l.klaim} rupa={rupa} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
        </p>
      </div>
      {tahap === "putus" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <Tombol teks={"\u{2705} benar"} onClick={() => putus(true)} />
            <Tombol teks={"\u{274C} salah"} onClick={() => putus(false)} />
          </div>
        </div>
      ) : tahap === "alasan" ? (
        <div className="space-y-1.5" role="group" aria-label="Pilih alasan">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pilih alasan yang tepat:</p>
          {urut.map((i) => (
            <button key={l.alasan[i]} type="button" disabled={mati.includes(i)} onClick={() => alasan(i)} className="block min-h-[48px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] disabled:opacity-30">
              {l.alasan[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Dasar({ l, rupa, ...pk }: PK & { l: Langkah }) {
  const d = dasarDari(l);
  if (!d) return null;
  switch (d.tipe) {
    case "adil":
      return <Adil {...pk} rupa={rupa} l={d} />;
    case "garis":
      return <Garis {...pk} rupa={rupa} l={d} />;
    case "warnai":
      return <Warnai {...pk} rupa={rupa} l={d} />;
    case "susun":
      return <Susun {...pk} rupa={rupa} l={d} />;
    case "urut":
      return <Urut {...pk} rupa={rupa} l={d} />;
    case "pilih":
      return <KartuPilih l={d} />;
    case "hitung":
      return <GambarHitung l={d} rupa={rupa} />;
    case "nama":
      return <GambarNama l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahPanen({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas memilih angka (klik), semua tugas kanvas, dan semua tugas suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
  const [matiAngka, setMatiAngka] = useState<number[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    if (kunci === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  /** Satu-satunya jalur memeriksa jawaban: `j` kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const nama = l.tipe === "nama" ? namaKunci(l) : null;
  const pilihanTeks = kunci?.jenis === "nama" && nama ? pilihanNamaDari(nama) : kunci?.jenis === "angka" ? pilihanAngka(kunci.n).map(kata) : [];
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraPanen
              kunci={kunci}
              pilihan={pilihanTeks}
              mati={mati}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(kunci.jenis === "angka" ? (angkaDariUcapan(t)[0] ?? t) : t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "angka" ? (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih angkanya">
              {pilihanAngka(kunci.n).map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={matiAngka.includes(n)}
                  onClick={() => jawab(n, n === kunci.n)}
                  className="min-h-[52px] min-w-[72px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
                >
                  {n}
                </button>
              ))}
            </div>
          ) : (
            <PilihanKata pilihan={pilihanTeks} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
