"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  angkaPukul,
  bagianHari,
  dasarDari,
  jam12,
  kalimatKunci,
  kalimatTanya,
  kata,
  kataPukul,
  klaimBenar,
  kotakBatang,
  kunciJawab,
  lamaAngka,
  namaKunci,
  petunjukBanding,
  petunjukCocok,
  petunjukSalah,
  petunjukSet,
  petunjukUrut,
  pilihanAngka,
  pilihanNamaDari,
  siapLangsung,
  tulisDigital,
  urutanBenar,
  urutanKartu,
  type Bagian,
  type Cara,
  type Dur,
  type Keg,
  type Klaim,
  type LBanding,
  type LCocok,
  type LKotak,
  type LRank,
  type LSelisih,
  type LSet,
  type LUrut,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, angkaDariUcapan } from "./periksa";
import { JawabSuaraJadwal, PilihanKata, teksKunci } from "./JawabJadwal";

/**
 * Satu tugas CPA Kelas 2 Bab 6 Sub-Bab B: membaca jam analog dan digital, memutar jarum pendek, mencocokkan jam analog dan digital, mengurutkan kegiatan,
 * membandingkan batang lama kegiatan, tugas Cari kesalahan (putuskan benar atau salah, pilih alasan), lalu menjawab menurut caranya (pilih, tulis satu angka
 * di kanvas, atau ucapkan). Rupa: jam dinding berwarna dan benda lapangan beremoji (Concrete), muka jam polos, jam digital, jalur kotak, dan batang polos
 * (Pictorial), kartu kata dan lambang saja (Abstract). Semua jam tepat. Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const EMOJI_HARI: Record<Bagian, string> = { pagi: "\u{1F305}", siang: "\u{1F31E}", sore: "\u{1F307}", malam: "\u{1F319}" };

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

/* ------------------------------ Jam analog dan jam digital ------------------------------ */
/**
 * Jam dinding tepat pukul `h12` (jarum panjang di dua belas) berpusat di (cx, cy) dengan jari-jari r.
 * Benda (Concrete): muka kuning dengan bingkai merah tebal dan emoji. Diagram (Pictorial): muka putih polos, tanpa emoji.
 */
export function Jam({ h12, rupa, cx, cy, r, sorot, semua = true }: { h12: number; rupa: Rupa; cx: number; cy: number; r: number; sorot?: "pendek" | "panjang"; semua?: boolean }) {
  const benda = rupa === "benda";
  const ujung = (derajat: number, panjang: number): [number, number] => [cx + panjang * Math.sin((derajat * Math.PI) / 180), cy - panjang * Math.cos((derajat * Math.PI) / 180)];
  const [px, py] = ujung(30 * (h12 % 12), r * 0.5);
  const [mx, my] = ujung(0, r * 0.78);
  const angka = semua ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [3, 6, 9, 12];
  const u = Math.max(7, r * 0.2);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={benda ? "#FDE68A" : "#FFFFFF"} stroke={benda ? MERAH : UNGU} strokeWidth={benda ? 5 : 2.5} />
      {angka.map((n) => {
        const [x, y] = ujung(30 * n, r * 0.78);
        return (
          <text key={n} x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u} fontWeight={900} fill={UNGU}>
            {n}
          </text>
        );
      })}
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke={sorot === "panjang" ? HIJAU : MERAH} strokeWidth={sorot === "panjang" ? 4 : 2.4} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={px} y2={py} stroke={sorot === "pendek" ? HIJAU : UNGU} strokeWidth={sorot === "pendek" ? 6.4 : 4.4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3.4} fill={UNGU} />
    </g>
  );
}
/** Jam digital kotak berisi `teks` ("HH.00"). Benda: layar gelap berangka hijau; diagram: kotak putih polos. */
export function Digital({ teks, x, y, w = 110, h = 44, rupa }: { teks: string; x: number; y: number; w?: number; h?: number; rupa: Rupa }) {
  const benda = rupa === "benda";
  return (
    <g role="img" aria-label={`jam digital ${teks}`}>
      <rect x={x} y={y} width={w} height={h} rx={6} fill={benda ? "#0F172A" : "#FFFFFF"} stroke={UNGU} strokeWidth={2.4} />
      <text x={x + w / 2} y={y + h / 2 + h * 0.18} textAnchor="middle" fontSize={h * 0.5} fontWeight={900} fill={benda ? "#4ADE80" : UNGU}>
        {teks}
      </text>
    </g>
  );
}
/** Kartu kata dan lambang (Abstract): satu kotak berisi baris kata dan angka, tanpa gambar benda. */
function KartuLambang({ baris, judul }: { baris: string[]; judul: string }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#7C3AED] bg-[#F5F3FF] p-3 text-center" aria-label={judul} role="img">
      <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-[#6D28D9]">{judul}</p>
      {baris.map((b) => (
        <p key={b} className="text-lg font-black text-[#4C1D95]">
          {b}
        </p>
      ))}
    </div>
  );
}
/** Deret kotak batang jam: `n` kotak setinggi 20 dari (x, y), tiap kotak selebar `lebar`; kotak berwarna dan emoji hanya pada rupa benda. */
export function Batang({ n, x, y, lebar, rupa, emoji, warna }: { n: number; x: number; y: number; lebar: number; rupa: Rupa; emoji?: string; warna?: string }) {
  const penuh = Math.floor(n);
  const sisa = n - penuh;
  const isi = warna ?? (rupa === "benda" ? "#BBF7D0" : "#E0E7FF");
  return (
    <g>
      {Array.from({ length: penuh }, (_, i) => (
        <rect key={i} x={x + i * lebar} y={y} width={lebar} height={20} rx={2} fill={isi} stroke={UNGU} strokeWidth={1.6} />
      ))}
      {sisa > 0 ? <rect x={x + penuh * lebar} y={y} width={lebar * sisa} height={20} rx={2} fill={isi} stroke={UNGU} strokeWidth={1.6} /> : null}
      {rupa === "benda" && emoji ? (
        <text x={x - 12} y={y + 16} textAnchor="middle" fontSize={16} aria-hidden="true">
          {emoji}
        </text>
      ) : null}
    </g>
  );
}

const namaKeg = (k: Keg | Dur, rupa: Rupa): string => (rupa === "benda" && k.emoji ? `${k.emoji} ${k.nama}` : k.nama);

/* ------------------------------ Gambar untuk tugas Baca, Selisih, Rank, Kotak, Bagian, Awal, Lama, Jarum ------------------------------ */
function GambarSelisih({ l, rupa }: { l: LSelisih; rupa: Rupa }) {
  const n = l.selesai - l.mulai;
  if (rupa === "lambang") return <KartuLambang judul="kartu kegiatan" baris={[`mulai: ${tulisDigital(l.mulai)}`, `selesai: ${tulisDigital(l.selesai)}`, "lama = ? jam"]} />;
  if (rupa === "benda")
    return (
      <Gambar label="Jam mulai dan jam selesai" judul="jam mulai dan jam selesai">
        <Jam h12={jam12(l.mulai)} rupa={rupa} cx={72} cy={96} r={44} semua={false} />
        <Jam h12={jam12(l.selesai)} rupa={rupa} cx={228} cy={96} r={44} semua={false} />
        <text x={72} y={160} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          mulai {EMOJI_HARI[bagianHari(l.mulai)]}
        </text>
        <text x={228} y={160} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          selesai {EMOJI_HARI[bagianHari(l.selesai)]}
        </text>
        <line x1={124} y1={96} x2={176} y2={96} stroke={MERAH} strokeWidth={3} markerEnd="url(#pk)" />
        <defs>
          <marker id="pk" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill={MERAH} />
          </marker>
        </defs>
        <text x={150} y={184} textAnchor="middle" fontSize={11} fontWeight={900} fill="#92400E">
          {kataPukul(l.mulai)} sampai {kataPukul(l.selesai)}
        </text>
      </Gambar>
    );
  const lebar = Math.min(40, 250 / n);
  const x0 = (300 - lebar * n) / 2;
  return (
    <Gambar label="Jalur jam" judul="jalur jam: satu kotak satu jam">
      <Batang n={n} x={x0} y={88} lebar={lebar} rupa={rupa} />
      <text x={x0} y={78} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {tulisDigital(l.mulai)}
      </text>
      <text x={x0 + n * lebar} y={78} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {tulisDigital(l.selesai)}
      </text>
      <text x={150} y={140} textAnchor="middle" fontSize={10} fontWeight={800} fill={UNGU}>
        mulai sampai selesai
      </text>
    </Gambar>
  );
}

function BarisKegiatan({ item, sasaran, rupa }: { item: readonly Keg[]; sasaran: number; rupa: Rupa }) {
  return (
    <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-xl border-4 border-[#7C3AED] bg-white/90 p-2" role="img" aria-label="Daftar kegiatan acara">
      {item.map((k, i) => (
        <p key={k.nama} className={`rounded-lg px-2 py-1 text-sm font-black ${i === sasaran ? "bg-[#FEF08A] text-[#78350F]" : "bg-[#F5F3FF] text-[#4C1D95]"}`}>
          {i === sasaran ? "? " : ""}
          {namaKeg(k, rupa)}: {rupa === "diagram" ? tulisDigital(k.h) : angkaPukul(k.h)}
        </p>
      ))}
    </div>
  );
}
function GambarRank({ l, rupa }: { l: LRank; rupa: Rupa }) {
  return <BarisKegiatan item={l.item} sasaran={l.sasaran} rupa={rupa} />;
}

function GambarKotak({ l, rupa }: { l: LKotak; rupa: Rupa }) {
  if (rupa === "lambang") {
    const kotakTeks = (n: number) => Array.from({ length: n }, () => "■").join(" ");
    return l.jenis === "hitung" ? (
      <KartuLambang judul="kartu batang" baris={[kotakTeks(l.n), "satu ■ = satu jam", "jumlah jam = ?"]} />
    ) : (
      <KartuLambang judul="kartu dua batang" baris={[`batang pertama: ${kotakTeks(l.a)}`, `batang kedua: ${kotakTeks(l.b)}`, "selisih = ?"]} />
    );
  }
  const lebar = (n: number) => Math.min(26, 220 / n);
  if (l.jenis === "hitung")
    return (
      <Gambar label="Batang kotak jam" judul="satu kotak berarti satu jam">
        <Batang n={l.n} x={(300 - lebar(l.n) * l.n) / 2} y={90} lebar={lebar(l.n)} rupa={rupa} emoji={"\u{1F3C3}"} />
        <text x={150} y={140} textAnchor="middle" fontSize={10} fontWeight={800} fill={UNGU}>
          batang lama kegiatan
        </text>
      </Gambar>
    );
  return (
    <Gambar label="Dua batang kotak jam" judul="dua batang, satu kotak satu jam">
      <Batang n={l.a} x={60} y={56} lebar={lebar(Math.max(l.a, l.b))} rupa={rupa} emoji={"\u{1F3C3}"} />
      <Batang n={l.b} x={60} y={102} lebar={lebar(Math.max(l.a, l.b))} rupa={rupa} emoji={"\u{26BD}"} warna={rupa === "benda" ? "#FECACA" : "#E0E7FF"} />
      <text x={150} y={150} textAnchor="middle" fontSize={10} fontWeight={800} fill={UNGU}>
        batang pertama dan batang kedua
      </text>
    </Gambar>
  );
}

function DuaBatang({ a, b, rupa }: { a: Dur; b: Dur; rupa: Rupa }) {
  const maks = Math.max(a.menit, b.menit);
  const lebarPerJam = Math.min(60, 170 / kotakBatang(maks));
  return (
    <Gambar label="Dua batang lama kegiatan" judul="dua batang lama kegiatan">
      <text x={10} y={50} fontSize={9.5} fontWeight={900} fill={UNGU}>
        {namaKeg(a, rupa)}
      </text>
      <Batang n={kotakBatang(a.menit)} x={60} y={56} lebar={lebarPerJam} rupa={rupa} warna={rupa === "benda" ? "#BBF7D0" : "#E0E7FF"} />
      <text x={64 + kotakBatang(a.menit) * lebarPerJam} y={70} fontSize={9.5} fontWeight={900} fill={MERAH}>
        {lamaAngka(a.menit)}
      </text>
      <text x={10} y={108} fontSize={9.5} fontWeight={900} fill={UNGU}>
        {namaKeg(b, rupa)}
      </text>
      <Batang n={kotakBatang(b.menit)} x={60} y={114} lebar={lebarPerJam} rupa={rupa} warna={rupa === "benda" ? "#FECACA" : "#E0E7FF"} />
      <text x={64 + kotakBatang(b.menit) * lebarPerJam} y={128} fontSize={9.5} fontWeight={900} fill={MERAH}>
        {lamaAngka(b.menit)}
      </text>
    </Gambar>
  );
}

function GambarTugas({ l, rupa }: { l: Exclude<ReturnType<typeof dasarDari>, null>; rupa: Rupa }) {
  switch (l.tipe) {
    case "baca":
      if (l.tampil === "analog" && rupa !== "lambang")
        return (
          <Gambar label="Jam dinding" judul={rupa === "benda" ? "jam dinding di lapangan" : "muka jam"}>
            <Jam h12={jam12(l.h)} rupa={rupa} cx={150} cy={108} r={66} />
          </Gambar>
        );
      if (rupa === "lambang") return <KartuLambang judul="kartu jam digital" baris={[tulisDigital(l.h), "dibaca dengan jam dua belas: pukul ?"]} />;
      return (
        <Gambar label="Jam digital" judul="jam digital dua puluh empat jam">
          <Digital teks={tulisDigital(l.h)} x={70} y={70} w={160} h={64} rupa={rupa} />
        </Gambar>
      );
    case "selisih":
      return <GambarSelisih l={l} rupa={rupa} />;
    case "rank":
      return <GambarRank l={l} rupa={rupa} />;
    case "kotak":
      return <GambarKotak l={l} rupa={rupa} />;
    case "bagian":
      if (rupa === "lambang") return <KartuLambang judul="kartu jam digital" baris={[tulisDigital(l.h), "bagian harinya = ?"]} />;
      if (rupa === "diagram")
        return (
          <Gambar label="Jam digital" judul="jam digital dua puluh empat jam">
            <Digital teks={tulisDigital(l.h)} x={70} y={70} w={160} h={64} rupa={rupa} />
          </Gambar>
        );
      return (
        <Gambar label="Jam dinding dan jam digital" judul="jam dinding dan jam digital">
          <Jam h12={jam12(l.h)} rupa={rupa} cx={90} cy={104} r={54} />
          <Digital teks={tulisDigital(l.h)} x={158} y={80} w={124} h={48} rupa={rupa} />
        </Gambar>
      );
    case "awal":
      return (
        <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-xl border-4 border-[#7C3AED] bg-white/90 p-2" role="img" aria-label="Dua kegiatan dan jamnya">
          {[l.a, l.b].map((k, i) => (
            <p key={k.nama} className={`rounded-lg px-2 py-1.5 text-base font-black ${i === 0 ? "bg-[#FEF08A] text-[#78350F]" : "bg-[#F5F3FF] text-[#4C1D95]"}`}>
              {i === 0 ? "pertama: " : "kedua: "}
              {namaKeg(k, rupa)}, {rupa === "lambang" ? angkaPukul(k.h) : rupa === "diagram" ? tulisDigital(k.h) : angkaPukul(k.h)}
            </p>
          ))}
        </div>
      );
    case "lama":
      return rupa === "lambang" ? (
        <KartuLambang judul="kartu dua kegiatan" baris={[`pertama: ${l.a.nama}, ${lamaAngka(l.a.menit)}`, `kedua: ${l.b.nama}, ${lamaAngka(l.b.menit)}`]} />
      ) : (
        <DuaBatang a={l.a} b={l.b} rupa={rupa} />
      );
    case "jarum":
      return rupa === "lambang" ? (
        <KartuLambang judul="kartu jam" baris={[l.yang === "pendek" ? "jarum yang pendek = ?" : "jarum yang panjang = ?", "pilihan: jam atau menit"]} />
      ) : (
        <Gambar label="Jam dengan satu jarum disorot" judul={l.yang === "pendek" ? "lihat jarum pendek (hijau)" : "lihat jarum panjang (hijau)"}>
          <Jam h12={10} rupa={rupa} cx={150} cy={108} r={64} sorot={l.yang} />
        </Gambar>
      );
    default:
      return null;
  }
}

/* ------------------------------ Mencocokkan jam ------------------------------ */
function Cocok({ l, rupa, salah, siap }: PK & { l: LCocok }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const benar = (c: number): boolean => (rupa === "diagram" ? jam12(c) === jam12(l.h) : c === l.h);
  const ketukPilihan = (i: number) => {
    if (dapat !== null || mati.includes(i)) return;
    if (benar(l.pilihan[i])) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, i]);
      salah(petunjukCocok(l, l.pilihan[i]));
    }
  };
  return (
    <div className="space-y-2">
      {rupa === "benda" ? (
        <Gambar label="Jam dinding yang ditunjuk" judul={`jam dinding ${EMOJI_HARI[bagianHari(l.h)]}`}>
          <Jam h12={jam12(l.h)} rupa={rupa} cx={150} cy={108} r={64} />
        </Gambar>
      ) : rupa === "diagram" ? (
        <Gambar label="Jam digital yang ditunjuk" judul="jam digital">
          <Digital teks={tulisDigital(l.h)} x={70} y={70} w={160} h={64} rupa={rupa} />
        </Gambar>
      ) : (
        <KartuLambang judul="kartu waktu" baris={[kataPukul(l.h)]} />
      )}
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih jam yang sama">
        {l.pilihan.map((c, i) => (
          <button
            key={c}
            type="button"
            disabled={mati.includes(i)}
            onClick={() => ketukPilihan(i)}
            aria-label={rupa === "diagram" ? `Jam analog pukul ${kata(jam12(c))}` : `Jam digital ${tulisDigital(c)}`}
            className={`rounded-2xl border-4 bg-white p-1 disabled:opacity-35 ${dapat === i ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#1C01A5]"}`}
          >
            {rupa === "diagram" ? (
              <svg viewBox="0 0 100 100" className="mx-auto block h-[96px] w-full max-w-[110px]" aria-hidden="true">
                <Jam h12={jam12(c)} rupa={rupa} cx={50} cy={50} r={44} semua={false} />
              </svg>
            ) : (
              <span className="block py-2 text-2xl font-black text-[#1C01A5]">{tulisDigital(c)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Putar jarum ------------------------------ */
function Putar({ l, rupa, salah, siap }: PK & { l: LSet }) {
  const sasaran = jam12(l.h);
  const [jam, setJam] = useState(sasaran === 12 ? 1 : 12);
  const [selesai, setSelesai] = useState(false);
  const maju = () => !selesai && setJam((j) => (j % 12) + 1);
  const periksa = () => {
    if (jam === sasaran) {
      setSelesai(true);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukSet(l, jam));
  };
  return (
    <div className="space-y-2">
      <Gambar label="Jam dinding yang diputar" judul="putar jarum pendek dengan tombol">
        <Jam h12={jam} rupa={rupa} cx={150} cy={108} r={66} />
      </Gambar>
      <div className="flex flex-wrap justify-center gap-2">
        <Tombol teks="Putar satu jam" mati={selesai} onClick={maju} />
        <Tombol teks="Periksa" mati={selesai} onClick={periksa} />
      </div>
    </div>
  );
}

/* ------------------------------ Urutkan kegiatan ------------------------------ */
function Urut({ l, rupa, salah, siap, info }: PK & { l: LUrut }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const kartu = urutanKartu(l.item);
  const benar = urutanBenar(l.item);
  const ketukKartu = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === benar[sudah.length]) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === l.item.length) siap(kalimatKunci(l, "klik", rupa));
      else info("Betul! Kegiatan berikutnya yang paling awal yang mana?");
    } else salah(petunjukUrut(l, i, sudah));
  };
  return (
    <div className="space-y-1.5" role="group" aria-label="Kartu kegiatan">
      {kartu.map((i) => {
        const k = l.item[i];
        return (
          <button
            key={k.nama}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketukKartu(i)}
            className={`flex min-h-[52px] w-full items-center gap-2 rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            <span className="flex-1">{namaKeg(k, rupa)}</span>
            <span className="text-[#B45309]">{rupa === "diagram" ? tulisDigital(k.h) : rupa === "lambang" ? kataPukul(k.h) : angkaPukul(k.h)}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------ Bandingkan batang ------------------------------ */
function Banding({ l, rupa, salah, siap }: PK & { l: LBanding }) {
  const [dapat, setDapat] = useState<"a" | "b" | null>(null);
  const [mati, setMati] = useState<("a" | "b")[]>([]);
  const lebih: "a" | "b" = l.a.menit > l.b.menit ? "a" : "b";
  const ketukSisi = (s: "a" | "b") => {
    if (dapat !== null || mati.includes(s)) return;
    if (s === lebih) {
      setDapat(s);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, s]);
      salah(petunjukBanding());
    }
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <KartuLambang judul="kartu dua kegiatan" baris={[`${l.a.nama}: ${lamaAngka(l.a.menit)}`, `${l.b.nama}: ${lamaAngka(l.b.menit)}`]} />
      ) : (
        <DuaBatang a={l.a} b={l.b} rupa={rupa} />
      )}
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ketuk kegiatan yang lebih lama">
        {(["a", "b"] as const).map((s) => (
          <button
            key={s}
            type="button"
            disabled={mati.includes(s)}
            onClick={() => ketukSisi(s)}
            className={`min-h-[56px] rounded-2xl border-4 px-2 text-sm font-black disabled:opacity-35 ${dapat === s ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            {namaKeg(s === "a" ? l.a : l.b, rupa)}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "baca")
    return k.tampil === "analog" ? (
      <Gambar label="Jam yang dibicarakan" judul="jam yang dibicarakan">
        <Jam h12={jam12(k.h)} rupa={rupa === "lambang" ? "diagram" : rupa} cx={150} cy={108} r={64} />
      </Gambar>
    ) : rupa === "lambang" ? (
      <KartuLambang judul="kartu jam digital" baris={[tulisDigital(k.h)]} />
    ) : (
      <Gambar label="Jam digital yang dibicarakan" judul="jam digital yang dibicarakan">
        <Digital teks={tulisDigital(k.h)} x={70} y={70} w={160} h={64} rupa={rupa} />
      </Gambar>
    );
  if (k.jenis === "bagian") return <KartuLambang judul="kartu waktu" baris={[tulisDigital(k.h)]} />;
  return rupa === "lambang" ? (
    <KartuLambang judul="kartu dua kegiatan" baris={[`${k.a.nama}: ${lamaAngka(k.a.menit)}`, `${k.b.nama}: ${lamaAngka(k.b.menit)}`]} />
  ) : (
    <DuaBatang a={k.a} b={k.b} rupa={rupa} />
  );
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
    case "cocok":
      return <Cocok {...pk} rupa={rupa} l={d} />;
    case "set":
      return <Putar {...pk} rupa={rupa} l={d} />;
    case "urut":
      return <Urut {...pk} rupa={rupa} l={d} />;
    case "banding":
      return <Banding {...pk} rupa={rupa} l={d} />;
    default:
      return <GambarTugas l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahJadwal({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas dengan jawaban pilihan (klik), semua tugas kanvas, dan semua tugas suara langsung siap dijawab, apa pun rupanya. */
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
  const nama = l.tipe === "bagian" || l.tipe === "awal" || l.tipe === "lama" || l.tipe === "jarum" ? namaKunci(l) : null;
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
            <JawabSuaraJadwal
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
