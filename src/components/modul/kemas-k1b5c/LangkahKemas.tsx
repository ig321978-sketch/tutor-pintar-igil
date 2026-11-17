"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  GUDANG_SEDOTAN,
  alasanCari,
  angkaJawab,
  isiBaki,
  kata,
  klaimCari,
  petunjukTokoh,
  pilihanDari,
  puluhanDari,
  satuanDari,
  type Langkah,
  type LangkahSoal,
  type Rupa,
  type Tempat2,
} from "./logika";
import { EMOJI, EMOJI_TOKOH, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  BAKI_SATUAN,
  BATANG,
  IKATAN,
  IKAT_ATAS,
  IKAT_SEDOTAN,
  JARI_BARANG,
  KARTU_DIGIT,
  KOLOM,
  KUBUS,
  LEBAR_ADEGAN,
  LEBAR_KATA,
  SEDOTAN,
  TINGGI_ADEGAN,
  letakBakiIkat,
  letakBakiLepas,
  letakBatang,
  letakDigit,
  letakGudangIkat,
  letakGudangLepas,
  letakIkatAtas,
  letakIsiPuluhan,
  letakIsiSatuan,
  letakKata,
  letakKolom,
  letakKubus,
  letakKumpul,
  letakLepasAtas,
  letakMeja,
  letakMejaKanvas,
  letakSatuan,
  periksaCentang,
  periksaLingkari,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 5 Sub-Bab C: kegiatan metode (Metode IGIL kumpulkan sepuluh lalu ikat karet, sisanya ke baki satuan;
 * Base Ten Blocks balok puluhan dan kubus satuan; Place Value Chart pindahkan ke kolom puluhan dan satuan; Bundling Sticks buat bilangan
 * sendiri dari ikatan sedotan; Cari kesalahan menilai jawaban tokoh lalu memilih alasan), lalu menjawab dengan caranya.
 * Rupa: barang berwarna di plastik gelembung (Concrete), kotak polos dan garis (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk. Cara menjawab bilangan sampai dua puluh memakai ulang Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void; bicara: (t: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const KUNING = "#FACC15";
const KARET = "#DC2626";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const TOMBOL = "min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-4 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30";
type Tanda = "biasa" | "pilih" | "sorot";
const garisTanda = (t: Tanda, dasar: string) => (t === "pilih" ? HIJAU : t === "sorot" ? "#CA8A04" : dasar);
const isiTanda = (t: Tanda, dasar: string) => (t === "pilih" ? "#DCFCE7" : t === "sorot" ? "#FEF08A" : dasar);

/* ------------------------------ Gambar barang, ikatan, balok, sedotan ------------------------------ */
/** Satu barang lepas: barang berwarna dengan gambar (benda) atau kotak polos (diagram). */
function Barang({ x, y, rupa, jenis, tanda = "biasa", r = JARI_BARANG }: { x: number; y: number; rupa: Rupa; jenis: string; tanda?: Tanda; r?: number }) {
  if (rupa === "benda") {
    const [isi, garis] = WARNA_BENDA[jenis] ?? ["#BFDBFE", "#1D4ED8"];
    return (
      <g>
        <circle cx={x} cy={y} r={r} fill={isiTanda(tanda, isi)} stroke={garisTanda(tanda, garis)} strokeWidth={tanda === "biasa" ? 1.3 : 3} />
        <text x={x} y={y + r * 0.38} textAnchor="middle" fontSize={r * 1.1}>
          {EMOJI[jenis] ?? EMOJI.pakan}
        </text>
      </g>
    );
  }
  const s = r * 1.5;
  return <rect x={x - s / 2} y={y - s / 2} width={s} height={s} fill={isiTanda(tanda, "#FFFFFF")} stroke={garisTanda(tanda, UNGU)} strokeWidth={tanda === "biasa" ? 1.6 : 3} />;
}

/** Satu ikat isi sepuluh: datar (dua baris lima) atau tegak (satu kolom sepuluh). Benda diikat karet merah; diagram kotak polos. */
function Sepuluh({ x, y, w, h, rupa, jenis, tegak = false, tanda = "biasa" }: { x: number; y: number; w: number; h: number; rupa: Rupa; jenis: string; tegak?: boolean; tanda?: Tanda }) {
  const kol = tegak ? 1 : 5;
  const bar = tegak ? 10 : 2;
  const cw = w / kol;
  const ch = h / bar;
  const [isi, garis] = rupa === "benda" ? (WARNA_BENDA[jenis] ?? ["#BFDBFE", "#1D4ED8"]) : ["#FFFFFF", UNGU];
  return (
    <g>
      <rect x={x - w / 2 - 2} y={y - h / 2 - 2} width={w + 4} height={h + 4} rx={rupa === "benda" ? 6 : 1} fill={isiTanda(tanda, isi)} stroke={garisTanda(tanda, garis)} strokeWidth={tanda === "biasa" ? 1.6 : 3.2} />
      {Array.from({ length: 10 }, (_, j) => {
        const cx = x - w / 2 + cw * ((j % kol) + 0.5);
        const cy = y - h / 2 + ch * (Math.floor(j / kol) + 0.5);
        return rupa === "benda" ? (
          <text key={j} x={cx} y={cy + Math.min(cw, ch) * 0.3} textAnchor="middle" fontSize={Math.min(cw, ch) * 0.82}>
            {EMOJI[jenis] ?? EMOJI.pakan}
          </text>
        ) : (
          <rect key={j} x={cx - cw / 2} y={cy - ch / 2} width={cw} height={ch} fill="none" stroke={UNGU} strokeWidth={1} />
        );
      })}
      {rupa === "benda" ? (
        tegak ? (
          <rect x={x - w / 2 - 4} y={y - 2} width={w + 8} height={4} rx={2} fill={KARET} />
        ) : (
          <rect x={x - 2} y={y - h / 2 - 4} width={4} height={h + 8} rx={2} fill={KARET} />
        )
      ) : null}
    </g>
  );
}

/** Sedotan lepas atau satu ikat sepuluh sedotan. */
function Sedotan({ x, y, rupa, ikat, i = 0, tanda = "biasa" }: { x: number; y: number; rupa: Rupa; ikat: boolean; i?: number; tanda?: Tanda }) {
  const warna = ["#F472B6", "#60A5FA", "#FBBF24", "#34D399"];
  const h = SEDOTAN.h;
  const satu = (sx: number, k: number, lebar: number) =>
    rupa === "benda" ? (
      <g key={k}>
        <rect x={sx - lebar / 2} y={y - h / 2} width={lebar} height={h} rx={lebar / 2} fill={warna[(i + k) % 4]} stroke="#475569" strokeWidth={0.6} />
        <line x1={sx} x2={sx} y1={y - h / 2 + 3} y2={y + h / 2 - 3} stroke="#FFFFFF" strokeWidth={lebar / 4} strokeDasharray="4 4" />
      </g>
    ) : (
      <line key={k} x1={sx} x2={sx} y1={y - h / 2} y2={y + h / 2} stroke={UNGU} strokeWidth={1.8} />
    );
  const sorot = tanda !== "biasa" ? <rect x={x - (ikat ? IKAT_SEDOTAN.w : SEDOTAN.w) / 2 - 4} y={y - h / 2 - 4} width={(ikat ? IKAT_SEDOTAN.w : SEDOTAN.w) + 8} height={h + 8} rx={4} fill={isiTanda(tanda, "none")} stroke={garisTanda(tanda, UNGU)} strokeWidth={2.4} /> : null;
  if (!ikat)
    return (
      <g>
        {sorot}
        {satu(x, 0, SEDOTAN.w - 2)}
      </g>
    );
  return (
    <g>
      {sorot}
      {Array.from({ length: 10 }, (_, k) => satu(x - IKAT_SEDOTAN.w / 2 + 1.2 + k * 2.4, k, 2.6))}
      <rect x={x - IKAT_SEDOTAN.w / 2 - 2} y={y - 4} width={IKAT_SEDOTAN.w + 4} height={8} rx={2} fill={rupa === "benda" ? KARET : "#FFFFFF"} stroke={rupa === "benda" ? "#7F1D1D" : UNGU} strokeWidth={1.4} />
    </g>
  );
}

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
const Gambar = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
    {children}
  </svg>
);
const Judul = ({ teks }: { teks: string }) => (
  <text x={150} y={18} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
);

/** Rupa lambang: kartu tulisan besar seperti label harga. */
function KartuTanya({ atas, bawah }: { atas: React.ReactNode; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p className="text-2xl">{bawah}</p>
    </div>
  );
}
const Kotak = ({ children, sorot = false }: { children: React.ReactNode; sorot?: boolean }) => (
  <span className={`mx-0.5 inline-block rounded-sm border-2 border-dashed border-[#334155] px-2.5 py-0.5 font-mono ${sorot ? "bg-[#FEF08A]" : "bg-white"} text-[#0F172A]`}>{children}</span>
);
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;
/** Siap langsung saat dibuka (rupa lambang: tanpa kegiatan gambar). */
function useSiapAwal(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Metode IGIL: kumpulkan sepuluh, ikat karet, sisanya satuan ------------------------------ */
function Ikat({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "ikat" }> }) {
  const sisa = l.n - 10;
  const [kumpul, setKumpul] = useState(0);
  const [terikat, setTerikat] = useState(false);
  const [satuan, setSatuan] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useSiapAwal(rupa === "lambang", () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.tanya === "bilangan" ? (
            <>
              <Kotak>1</Kotak> ikat sepuluh dan <Kotak>{sisa}</Kotak> lepas
            </>
          ) : (
            <>
              <Kotak>{l.n}</Kotak> = <Kotak>1</Kotak> ikat sepuluh dan <Tanya /> lepas
            </>
          )
        }
        bawah={l.tanya === "bilangan" ? <>= <Tanya /></> : <>satuan = <Tanya /></>}
      />
    );
  const meja = l.n - kumpul - satuan;
  const ambil = () => {
    if (selesai || kanvas) return;
    if (!terikat) {
      if (kumpul >= 10) {
        salah("Sudah sepuluh di kumpulan. Ikat dulu dengan karet sebelum mengambil lagi.");
        return;
      }
      setKumpul(kumpul + 1);
      info(kumpul + 1 === 10 ? "Sepuluh! Sekarang ikat dengan karet." : kata(kumpul + 1));
      return;
    }
    const b = satuan + 1;
    setSatuan(b);
    if (b === sisa) {
      setSelesai(true);
      siap("Meja kosong. Satu ikat di kiri, sisanya di baki satuan.");
    } else info(kata(b));
  };
  const ikatKaret = () => {
    if (selesai) return;
    if (kumpul !== 10) {
      salah(`Kumpulanmu baru ${kata(kumpul)}. Satu ikat harus tepat sepuluh, ambil lagi.`);
      return;
    }
    setTerikat(true);
    if (sisa === 0) {
      setSelesai(true);
      siap("Diikat! Satu puluhan. Meja kosong, tidak ada sisa.");
    } else info("Diikat! Satu puluhan. Sekarang pindahkan sisanya ke baki satuan satu per satu.");
  };
  const periksa = () => {
    const letak = Array.from({ length: l.n }, (_, i) => letakMejaKanvas(i));
    const r = periksaLingkari(goresan, letak, letak.map((_, i) => i < 10));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu baris sepuluh, itu satu ikat. Sisanya satuan.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkaranmu ikut memuat barang di baris bawah. Satu ikat hanya sepuluh." : "Masih ada barang di baris atas yang belum masuk lingkaran. Satu ikat berisi sepuluh.");
    }
  };
  if (kanvas) {
    const gambar = (
      <g>
        <Judul teks="lingkari satu baris berisi sepuluh" />
        {Array.from({ length: l.n }, (_, i) => {
          const p = letakMejaKanvas(i);
          return <Barang key={i} x={p.x} y={p.y} rupa={rupa} jenis={l.jenis} />;
        })}
      </g>
    );
    return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  }
  return (
    <div className="space-y-2">
      <Gambar label={`Meja kemas berisi ${NAMA_BENDA[l.jenis] ?? "kotak"}`}>
        <Judul teks={terikat ? `satu ikat · baki satuan: ${satuan}` : `kumpulan: ${kumpul}`} />
        {Array.from({ length: meja }, (_, i) => {
          const p = letakMeja(i);
          return (
            <g key={`m${i}`} {...ketuk(ambil)} aria-label="barang di meja, ketuk untuk dipindah">
              <Barang x={p.x} y={p.y} rupa={rupa} jenis={l.jenis} />
            </g>
          );
        })}
        <rect x={IKATAN.x} y={IKATAN.y} width={IKATAN.w} height={IKATAN.h} rx={8} fill={terikat ? "#FEF3C7" : "#FFFFFF"} stroke="#B45309" strokeWidth={2} strokeDasharray={terikat ? "0" : "5 4"} />
        <text x={IKATAN.x + IKATAN.w / 2} y={IKATAN.y + 11} textAnchor="middle" fontSize={9} fontWeight={900} fill="#78350F">
          {terikat ? "satu ikat = sepuluh" : "kumpulan sepuluh"}
        </text>
        {terikat ? (
          <Sepuluh x={IKATAN.x + IKATAN.w / 2} y={IKATAN.y + 50} w={110} h={50} rupa={rupa} jenis={l.jenis} />
        ) : (
          Array.from({ length: kumpul }, (_, j) => {
            const p = letakKumpul(j);
            return <Barang key={`k${j}`} x={p.x} y={p.y} rupa={rupa} jenis={l.jenis} r={10} />;
          })
        )}
        <rect x={BAKI_SATUAN.x} y={BAKI_SATUAN.y} width={BAKI_SATUAN.w} height={BAKI_SATUAN.h} rx={8} fill="#ECFDF5" stroke={HIJAU} strokeWidth={2} />
        <text x={BAKI_SATUAN.x + BAKI_SATUAN.w / 2} y={BAKI_SATUAN.y + 11} textAnchor="middle" fontSize={9} fontWeight={900} fill="#14532D">
          baki satuan
        </text>
        {Array.from({ length: satuan }, (_, j) => {
          const p = letakSatuan(j);
          return <Barang key={`s${j}`} x={p.x} y={p.y} rupa={rupa} jenis={l.jenis} r={10} />;
        })}
      </Gambar>
      {!terikat && !selesai ? (
        <div className="flex justify-center">
          <button type="button" className={TOMBOL} onClick={ikatKaret}>
            {"\u{1F380}"} Ikat dengan karet
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Base Ten Blocks: balok puluhan dan kubus satuan ------------------------------ */
function Balok({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "balok" }> }) {
  const p = puluhanDari(l.n);
  const s = satuanDari(l.n);
  const [dapat, setDapat] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useSiapAwal(rupa === "lambang", () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.tanya === "bilangan" ? (
            <>
              <Kotak>{p}</Kotak> puluhan <Kotak>{s}</Kotak> satuan
            </>
          ) : l.tanya === "puluhan" ? (
            <>
              <Kotak>{l.n}</Kotak> = <Tanya /> puluhan <Kotak>{s}</Kotak> satuan
            </>
          ) : (
            <>
              <Kotak>{l.n}</Kotak> = <Kotak>{p}</Kotak> puluhan <Tanya /> satuan
            </>
          )
        }
        bawah={l.tanya === "bilangan" ? <>= <Tanya /></> : <>{l.tanya} = <Tanya /></>}
      />
    );
  const letak = [...Array.from({ length: p }, (_, i) => letakBatang(i)), ...Array.from({ length: s }, (_, j) => letakKubus(j))];
  const ketukPotong = (i: number) => {
    if (selesai || kanvas || i < dapat) return;
    if (i !== dapat) {
      salah(dapat < p ? "Hitung balok sepuluh dulu, baru kubus satuan." : "Ketuk kubus berurutan, satu per satu.");
      return;
    }
    const b = dapat + 1;
    setDapat(b);
    const hasil = b <= p ? b * 10 : p * 10 + (b - p);
    if (b === p + s) {
      setSelesai(true);
      siap(`${besar(kata(hasil))}. Semua sudah dihitung.`);
    } else info(kata(hasil));
  };
  const periksa = () => {
    const r = periksaCentang(goresan, letak, 14);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Tiap balok sepuluh, tiap kubus satu.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Ada yang diberi dua tanda. Satu balok atau kubus, satu tanda." : r.nyasar > 0 ? "Ada tanda di luar balok dan kubus." : "Masih ada balok atau kubus yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? "beri tanda tiap balok dan kubus" : `terhitung: ${dapat <= p ? dapat * 10 : p * 10 + dapat - p}`} />
      {p > 0 ? (
        <text x={letakBatang(0).x + (p - 1) * 17} y={190} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
          puluhan
        </text>
      ) : null}
      {s > 0 ? (
        <text x={164} y={170} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
          satuan
        </text>
      ) : null}
      {Array.from({ length: p }, (_, i) => {
        const q = letakBatang(i);
        return (
          <g key={`b${i}`} {...(kanvas ? {} : ketuk(() => ketukPotong(i)))} aria-label={`balok sepuluh${i < dapat ? ", sudah dihitung" : ""}`}>
            <Sepuluh x={q.x} y={q.y} w={BATANG.w - 4} h={BATANG.h - 4} rupa={rupa} jenis={l.jenis} tegak tanda={i < dapat ? "pilih" : "biasa"} />
          </g>
        );
      })}
      {Array.from({ length: s }, (_, j) => {
        const q = letakKubus(j);
        return (
          <g key={`k${j}`} {...(kanvas ? {} : ketuk(() => ketukPotong(p + j)))} aria-label={`kubus satu${p + j < dapat ? ", sudah dihitung" : ""}`}>
            <Barang x={q.x} y={q.y} rupa={rupa} jenis={l.jenis} r={KUBUS / 2} tanda={p + j < dapat ? "pilih" : "biasa"} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Kotak isi sepuluh dan barang lepas" : "Balok puluhan dan kubus satuan"}>{gambar}</Gambar>;
}

/* ------------------------------ Place Value Chart: pindahkan ke kolom puluhan dan satuan ------------------------------ */
function PilihanTempat({ mati, onPilih }: { mati: Tempat2[]; onPilih: (t: Tempat2) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tempatnya">
      {(["puluhan", "satuan"] as Tempat2[]).map((t) => (
        <button key={t} type="button" disabled={mati.includes(t)} onClick={() => onPilih(t)} className={`${TOMBOL} min-w-[120px]`}>
          {t}
        </button>
      ))}
    </div>
  );
}

/** Potongan di atas kolom: ikatan dan barang lepas (benda), atau dua kartu angka (diagram, lambang). */
type Potong = { jenis: "ikat" | "lepas" | "angka"; tempat: Tempat2; x: number; y: number; teks?: string };
function potongTabel(n: number, rupa: Rupa): Potong[] {
  const p = puluhanDari(n);
  const s = satuanDari(n);
  if (rupa === "benda")
    return [
      ...Array.from({ length: p }, (_, i): Potong => ({ jenis: "ikat", tempat: "puluhan", ...letakIkatAtas(i) })),
      ...Array.from({ length: s }, (_, j): Potong => ({ jenis: "lepas", tempat: "satuan", ...letakLepasAtas(j) })),
    ];
  return [
    { jenis: "angka", tempat: "puluhan", teks: String(p), ...letakDigit(0) },
    { jenis: "angka", tempat: "satuan", teks: String(s), ...letakDigit(1) },
  ];
}
function GambarPotong({ q, rupa, jenis, tanda }: { q: Potong; rupa: Rupa; jenis: string; tanda: Tanda }) {
  if (q.jenis === "ikat") return <Sepuluh x={q.x} y={q.y} w={IKAT_ATAS.w - 4} h={IKAT_ATAS.h - 4} rupa={rupa} jenis={jenis} tanda={tanda} />;
  if (q.jenis === "lepas") return <Barang x={q.x} y={q.y} rupa={rupa} jenis={jenis} r={10} tanda={tanda} />;
  return (
    <g>
      <rect x={q.x - KARTU_DIGIT.w / 2} y={q.y - KARTU_DIGIT.h / 2} width={KARTU_DIGIT.w} height={KARTU_DIGIT.h} rx={4} fill={isiTanda(tanda, "#FFFFFF")} stroke={garisTanda(tanda, UNGU)} strokeWidth={tanda === "biasa" ? 2 : 3.4} />
      <text x={q.x} y={q.y + 13} textAnchor="middle" fontSize={38} fontWeight={900} fill={UNGU}>
        {q.teks}
      </text>
    </g>
  );
}
function Kolom({ rupa, jenis, isi }: { rupa: Rupa; jenis: string; isi: Potong[] }) {
  return (
    <g>
      {(["puluhan", "satuan"] as Tempat2[]).map((t, i) => {
        const c = letakKolom(i);
        return (
          <g key={t}>
            <rect x={c.x - KOLOM.w / 2} y={c.y - KOLOM.h / 2} width={KOLOM.w} height={KOLOM.h} rx={rupa === "benda" ? 14 : 0} fill={rupa === "benda" ? (i === 0 ? "#FEF3C7" : "#ECFDF5") : "#FFFFFF"} stroke={rupa === "benda" ? (i === 0 ? "#B45309" : HIJAU) : UNGU} strokeWidth={2} />
            {rupa !== "benda" ? <line x1={c.x - KOLOM.w / 2} x2={c.x + KOLOM.w / 2} y1={c.y - KOLOM.h / 2 + 18} y2={c.y - KOLOM.h / 2 + 18} stroke={UNGU} strokeWidth={1.6} /> : null}
            <text x={c.x} y={c.y - KOLOM.h / 2 + 13} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
              {rupa === "benda" ? `baki ${t}` : t}
            </text>
          </g>
        );
      })}
      {isi.map((q, k) => {
        if (q.jenis === "angka") {
          const c = letakKolom(q.tempat === "puluhan" ? 0 : 1);
          return (
            <text key={k} x={c.x} y={c.y + 22} textAnchor="middle" fontSize={34} fontWeight={900} fill={UNGU}>
              {q.teks}
            </text>
          );
        }
        const urut = isi.slice(0, k).filter((z) => z.jenis === q.jenis).length;
        if (q.jenis === "ikat") {
          const c = letakIsiPuluhan(urut);
          return <Sepuluh key={k} x={c.x} y={c.y} w={48} h={28} rupa={rupa} jenis={jenis} />;
        }
        const c = letakIsiSatuan(urut);
        return <Barang key={k} x={c.x} y={c.y} rupa={rupa} jenis={jenis} r={9} />;
      })}
    </g>
  );
}

function Tabel({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "tabel" }> }) {
  const potong = potongTabel(l.n, rupa);
  const [pindah, setPindah] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [mati, setMati] = useState<Tempat2[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const tempat = l.tanya === "tempat";
  useSiapAwal(rupa === "lambang" && !tempat, () => siap());
  const iSorot = potong.findIndex((q) => q.tempat === l.sorot);
  const alasanTempat =
    l.sorot === "puluhan"
      ? rupa === "benda"
        ? "Yang kuning itu satu ikat isi sepuluh, jadi tempatnya puluhan."
        : "Yang kuning angka kiri. Angka kiri ada di tempat puluhan."
      : rupa === "benda"
        ? "Yang kuning itu barang lepas, satu saja, jadi tempatnya satuan."
        : "Yang kuning angka kanan. Angka kanan ada di tempat satuan.";
  if (rupa === "lambang" && !tempat)
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>{l.n}</Kotak>
          </>
        }
        bawah={
          <>
            angka {l.tanya} = <Tanya />
          </>
        }
      />
    );
  const pilihTempat = (t: Tempat2) => {
    if (selesai) return;
    if (t === l.sorot) {
      setSelesai(true);
      siap(`Betul! ${alasanTempat}`);
    } else {
      setMati((m) => [...m, t]);
      salah(`Belum tepat. ${alasanTempat}`);
    }
  };
  const ketukPotong = (i: number) => {
    if (selesai || kanvas || tempat || pindah.includes(i)) return;
    setPilih(i);
  };
  const ketukKolom = (t: Tempat2) => {
    if (selesai || kanvas || tempat) return;
    if (pilih === null) {
      salah(rupa === "benda" ? "Ketuk satu barang atau ikatan dulu, lalu ketuk bakinya." : "Ketuk satu angka dulu, lalu ketuk kolomnya.");
      return;
    }
    const q = potong[pilih];
    if (q.tempat !== t) {
      salah(
        q.jenis === "ikat"
          ? "Itu satu ikat isi sepuluh. Ikatan masuk baki puluhan."
          : q.jenis === "lepas"
            ? "Itu barang lepas, satu saja. Masuk baki satuan."
            : q.tempat === "puluhan"
              ? "Itu angka kiri. Angka kiri masuk kolom puluhan."
              : "Itu angka kanan. Angka kanan masuk kolom satuan.",
      );
      return;
    }
    const baru = [...pindah, pilih];
    setPindah(baru);
    setPilih(null);
    if (baru.length === potong.length) {
      setSelesai(true);
      siap("Semua sudah di tempatnya.");
    }
  };
  const periksa = () => {
    if (tempat) {
      const r = periksaLingkari(goresan, [0, 1].map(letakKata), [l.sorot === "puluhan", l.sorot === "satuan"]);
      if (r.benar) {
        setSelesai(true);
        siap(`Betul! ${alasanTempat}`);
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? `Lingkari satu kata saja. ${alasanTempat}` : "Lingkari kata puluhan atau satuan di bawah.");
      }
      return;
    }
    const r = periksaLingkari(goresan, [0, 1].map(letakKolom), [l.tanya === "puluhan", l.tanya === "satuan"]);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Itu kolom ${l.tanya}.`);
    } else {
      setGoresan([]);
      salah(l.tanya === "puluhan" ? "Kolom puluhan ada di kiri. Lingkari kolom itu saja." : "Kolom satuan ada di kanan. Lingkari kolom itu saja.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={tempat ? "yang kuning ada di tempat apa?" : kanvas ? `lingkari kolom ${l.tanya}` : "ketuk satu, lalu ketuk tempatnya"} />
      {potong.map((q, i) =>
        !tempat && (kanvas || pindah.includes(i)) ? null : (
          <g key={i} {...(kanvas || tempat ? {} : ketuk(() => ketukPotong(i)))} aria-label={q.jenis === "angka" ? `angka ${q.teks}` : q.jenis === "ikat" ? "satu ikat isi sepuluh" : "barang lepas"}>
            <GambarPotong q={q} rupa={rupa} jenis={l.jenis} tanda={tempat ? (i === iSorot ? "sorot" : "biasa") : pilih === i ? "pilih" : "biasa"} />
          </g>
        ),
      )}
      {tempat ? (
        (["puluhan", "satuan"] as Tempat2[]).map((t, i) => {
          const c = letakKata(i);
          return kanvas ? (
            <g key={t}>
              <rect x={c.x - LEBAR_KATA / 2} y={c.y - 16} width={LEBAR_KATA} height={32} rx={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
              <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={14} fontWeight={900} fill={UNGU}>
                {t}
              </text>
            </g>
          ) : null;
        })
      ) : (
        <g>
          <Kolom rupa={rupa} jenis={l.jenis} isi={kanvas ? potong : pindah.map((i) => potong[i])} />
          {!kanvas
            ? (["puluhan", "satuan"] as Tempat2[]).map((t, i) => {
                const c = letakKolom(i);
                return <rect key={t} x={c.x - KOLOM.w / 2} y={c.y - KOLOM.h / 2} width={KOLOM.w} height={KOLOM.h} fill="transparent" {...ketuk(() => ketukKolom(t))} aria-label={`tempat ${t}`} />;
              })
            : null}
        </g>
      )}
    </g>
  );
  if (rupa === "lambang" && tempat && !kanvas)
    return (
      <div className="space-y-3">
        <KartuTanya
          atas={
            <>
              <Kotak sorot={l.sorot === "puluhan"}>{puluhanDari(l.n)}</Kotak>
              <Kotak sorot={l.sorot === "satuan"}>{satuanDari(l.n)}</Kotak>
            </>
          }
          bawah={<>angka yang kuning ada di tempat <Tanya /></>}
        />
        {!selesai ? <PilihanTempat mati={mati} onPilih={pilihTempat} /> : null}
      </div>
    );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-3">
      <Gambar label={rupa === "benda" ? "Baki puluhan dan baki satuan" : "Tabel puluhan dan satuan"}>{gambar}</Gambar>
      {tempat && !selesai ? <PilihanTempat mati={mati} onPilih={pilihTempat} /> : null}
    </div>
  );
}

/* ------------------------------ Bundling Sticks: buat bilangan sendiri dari ikatan sedotan ------------------------------ */
function Ikatsedotan({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "sedotan" }> }) {
  const p = puluhanDari(l.n);
  const s = satuanDari(l.n);
  const [bIkat, setBIkat] = useState(0);
  const [bLepas, setBLepas] = useState(0);
  const [dapat, setDapat] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useSiapAwal(rupa === "lambang", () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.tanya === "bilangan" ? (
            <>
              <Kotak>{p}</Kotak> ikat dan <Kotak>{s}</Kotak> lepas
            </>
          ) : l.tanya === "ikat" ? (
            <>
              <Kotak>{l.n}</Kotak> = <Tanya /> ikat dan <Kotak>{s}</Kotak> lepas
            </>
          ) : (
            <>
              <Kotak>{l.n}</Kotak> = <Kotak>{p}</Kotak> ikat dan <Tanya /> lepas
            </>
          )
        }
        bawah={l.tanya === "bilangan" ? <>= <Tanya /></> : <>{l.tanya} = <Tanya /></>}
      />
    );
  /* Hitung yang sudah ada di baki: ikatan dulu, lalu sedotan lepas. */
  if (l.tanya === "bilangan") {
    const ketukSedotan = (i: number) => {
      if (selesai || kanvas || i < dapat) return;
      if (i !== dapat) {
        salah(dapat < p ? "Hitung ikatan dulu: tiap ikat sepuluh." : "Hitung lanjut sedotan lepas satu per satu.");
        return;
      }
      const b = dapat + 1;
      setDapat(b);
      const hasil = b <= p ? b * 10 : p * 10 + (b - p);
      if (b === p + s) {
        setSelesai(true);
        siap(`${besar(kata(hasil))}. Semua sudah dihitung.`);
      } else info(kata(hasil));
    };
    const lepasLetak = Array.from({ length: s }, (_, j) => letakBakiLepas(j));
    const periksa = () => {
      const r = periksaCentang(goresan, lepasLetak, 11);
      if (r.benar) {
        setSelesai(true);
        siap("Betul! Ikatan sepuluh, lalu hitung lanjut sedotan lepas.");
      } else {
        setGoresan([]);
        salah(r.nyasar > 0 ? "Ikatan tidak perlu ditandai, isinya sudah sepuluh. Tandai sedotan lepas saja." : r.dobel > 0 ? "Satu sedotan, satu tanda." : "Masih ada sedotan lepas yang belum ditandai.");
      }
    };
    const gambar = (
      <g>
        <Judul teks={kanvas ? "tandai tiap sedotan lepas" : `terhitung: ${dapat <= p ? dapat * 10 : p * 10 + dapat - p}`} />
        <rect x={6} y={110} width={288} height={84} rx={10} fill={rupa === "benda" ? "#F5F3FF" : "#FFFFFF"} stroke={UNGU} strokeWidth={2} />
        {Array.from({ length: p }, (_, i) => {
          const q = letakBakiIkat(i);
          return (
            <g key={`i${i}`} {...(kanvas ? {} : ketuk(() => ketukSedotan(i)))} aria-label="satu ikat sepuluh sedotan">
              <Sedotan x={q.x} y={q.y} rupa={rupa} ikat i={i} tanda={!kanvas && i < dapat ? "pilih" : "biasa"} />
            </g>
          );
        })}
        {lepasLetak.map((q, j) => (
          <g key={`l${j}`} {...(kanvas ? {} : ketuk(() => ketukSedotan(p + j)))} aria-label="sedotan lepas">
            <Sedotan x={q.x} y={q.y} rupa={rupa} ikat={false} i={j} tanda={!kanvas && p + j < dapat ? "pilih" : "biasa"} />
          </g>
        ))}
      </g>
    );
    if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
    return <Gambar label="Baki berisi ikatan sedotan dan sedotan lepas">{gambar}</Gambar>;
  }
  /* Buat bilangan sendiri: pindahkan dari gudang ke baki. */
  const isi = isiBaki(bIkat, bLepas);
  const cek = (ik: number, lp: number) => {
    const v = isiBaki(ik, lp);
    if (v === l.n) {
      setSelesai(true);
      siap(`${besar(kata(l.n))}! Bilanganmu sudah jadi.`);
    } else if (v > l.n) salah(`Di baki ada ${kata(v)}, kelebihan. Kembalikan yang tidak perlu.`);
    else info(kata(v));
  };
  const ambil = (ikat: boolean) => {
    if (selesai) return;
    if (ikat) {
      if (bIkat >= GUDANG_SEDOTAN.ikat) return;
      setBIkat(bIkat + 1);
      cek(bIkat + 1, bLepas);
    } else {
      if (bLepas >= GUDANG_SEDOTAN.lepas) return;
      setBLepas(bLepas + 1);
      cek(bIkat, bLepas + 1);
    }
  };
  const balik = (ikat: boolean) => {
    if (selesai) return;
    if (ikat) {
      setBIkat(bIkat - 1);
      info(kata(isiBaki(bIkat - 1, bLepas)));
    } else {
      setBLepas(bLepas - 1);
      info(kata(isiBaki(bIkat, bLepas - 1)));
    }
  };
  return (
    <Gambar label={`Gudang sedotan dan baki, buat ${kata(l.n)}`}>
      <Judul teks={`buat ${l.n} · di baki: ${isi}`} />
      <text x={8} y={32} fontSize={9} fontWeight={900} fill="#475569">
        gudang
      </text>
      {Array.from({ length: GUDANG_SEDOTAN.ikat - bIkat }, (_, i) => {
        const q = letakGudangIkat(i);
        return (
          <g key={`gi${i}`} {...ketuk(() => ambil(true))} aria-label="satu ikat sepuluh sedotan di gudang">
            <Sedotan x={q.x} y={q.y} rupa={rupa} ikat i={i} />
          </g>
        );
      })}
      {Array.from({ length: GUDANG_SEDOTAN.lepas - bLepas }, (_, j) => {
        const q = letakGudangLepas(j);
        return (
          <g key={`gl${j}`} {...ketuk(() => ambil(false))} aria-label="sedotan lepas di gudang">
            <Sedotan x={q.x} y={q.y} rupa={rupa} ikat={false} i={j} />
          </g>
        );
      })}
      <rect x={6} y={110} width={288} height={84} rx={10} fill={rupa === "benda" ? "#F5F3FF" : "#FFFFFF"} stroke={selesai ? HIJAU : UNGU} strokeWidth={2} />
      <text x={150} y={190} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
        baki (ketuk untuk mengembalikan)
      </text>
      {Array.from({ length: bIkat }, (_, i) => {
        const q = letakBakiIkat(i);
        return (
          <g key={`bi${i}`} {...ketuk(() => balik(true))} aria-label="ikatan di baki, ketuk untuk mengembalikan">
            <Sedotan x={q.x} y={q.y - 6} rupa={rupa} ikat i={i} tanda={selesai ? "pilih" : "biasa"} />
          </g>
        );
      })}
      {Array.from({ length: bLepas }, (_, j) => {
        const q = letakBakiLepas(j);
        return (
          <g key={`bl${j}`} {...ketuk(() => balik(false))} aria-label="sedotan lepas di baki, ketuk untuk mengembalikan">
            <Sedotan x={q.x} y={q.y - 6} rupa={rupa} ikat={false} i={j} tanda={selesai ? "pilih" : "biasa"} />
          </g>
        );
      })}
      <text x={290} y={32} textAnchor="end" fontSize={12} fill={KUNING} aria-hidden="true">
        {rupa === "benda" ? EMOJI.sedotan : ""}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Cari kesalahan: nilai jawaban tokoh, lalu pilih alasan ------------------------------ */
function Cari({ l, rupa, salah, siap, info, bicara }: PK & { l: Extract<Langkah, { tipe: "cari" }> }) {
  const [tahap, setTahap] = useState<"putus" | "alasan">("putus");
  const [mati, setMati] = useState<number[]>([]);
  const [salahPilih, setSalahPilih] = useState(false);
  const alasan = alasanCari(l);
  /** Putaran tetap (bukan acak) yang tidak pernah menaruh alasan benar (indeks 0) di tombol pertama. */
  const geser = 1 + (alasan[0].teks.length % (alasan.length - 1));
  const urut = alasan.map((_, i) => (i + geser) % alasan.length);
  const p = puluhanDari(l.n);
  const s = satuanDari(l.n);
  const putuskan = (benar: boolean) => {
    if (benar) {
      setSalahPilih(true);
      salah(petunjukTokoh(l));
      return;
    }
    setTahap("alasan");
    info(`Betul, jawaban ${l.tokoh} keliru. Sekarang pilih alasan yang benar.`);
  };
  const pilihAlasan = (i: number) => {
    const a = alasan[i];
    if (a.benar) siap(`Betul! ${a.teks}`);
    else {
      setMati((m) => [...m, i]);
      salah(a.petunjuk);
    }
  };
  const lepasSemua = l.salah === "lepas";
  return (
    <div className="space-y-3">
      {rupa !== "lambang" ? (
        <Gambar label={lepasSemua ? `${kata(l.n)} barang lepas` : `${kata(p)} ikat dan ${kata(s)} lepas`}>
          <Judul teks={lepasSemua ? "barang di meja" : "ikatan dan barang lepas"} />
          {lepasSemua
            ? Array.from({ length: l.n }, (_, i) => {
                const q = letakMeja(i);
                return <Barang key={i} x={q.x} y={q.y + 40} rupa={rupa} jenis={l.jenis} />;
              })
            : potongTabel(l.n, "benda").map((q, i) => <GambarPotong key={i} q={{ ...q, y: q.y + 40 }} rupa={rupa} jenis={l.jenis} tanda="biasa" />)}
        </Gambar>
      ) : null}
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        {rupa === "benda" ? (
          <span className="text-3xl" aria-hidden="true">
            {EMOJI_TOKOH[l.tokoh]}
          </span>
        ) : null}
        <p className="flex-1 text-base font-black text-[#1C01A5]">
          {l.tokoh}: &ldquo;{klaimCari(l)}&rdquo;
        </p>
        <button type="button" onClick={() => bicara(`${l.tokoh} berkata: ${klaimCari(l, kata)}`)} aria-label="Dengar jawaban tokoh" className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm">
          {"\u{1F50A}"}
        </button>
      </div>
      {tahap === "putus" ? (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Jawaban ${l.tokoh} benar atau salah`}>
          <button type="button" className={TOMBOL} disabled={salahPilih} onClick={() => putuskan(true)}>
            {"\u{2705}"} Benar
          </button>
          <button type="button" className={TOMBOL} onClick={() => putuskan(false)}>
            {"\u{274C}"} Salah
          </button>
        </div>
      ) : (
        <div className="space-y-2" role="group" aria-label="Pilih alasan yang benar">
          {urut.map((i) => (
            <button key={i} type="button" disabled={mati.includes(i)} onClick={() => pilihAlasan(i)} className={`${TOMBOL} block w-full text-left text-sm`}>
              {alasan[i].teks}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Sepuluh diikat menjadi satu puluhan. Hitung lagi yang tersisa.",
  balok: "Tiap balok sepuluh. Hitung balok dulu, lalu hitung lanjut kubusnya.",
  tabel: "Angka kiri puluhan, angka kanan satuan.",
  sedotan: "Satu ikat sedotan isinya sepuluh. Sedotan lepas isinya satu.",
};

export function LangkahKemas({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
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
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  /** Petunjuk salah yang menunjuk kesalahan anak (mis. menjawab satuan saat ditanya semuanya). */
  const petunjukSalah = (m: number): string => {
    if (n === null) return PETUNJUK[ls.metode];
    const total = l.n;
    if (m === satuanDari(total) && n === total) return `${besar(kata(m))} itu hanya satuannya. Jangan lupa ikatan sepuluhnya.`;
    if (m === total && n !== total) return `${besar(kata(m))} itu semuanya. Yang ditanya hanya satu tempat.`;
    if (m === puluhanDari(total) + satuanDari(total) && m !== n) return "Jangan menjumlah dua angkanya. Angka kiri berarti puluhan.";
    if (m === n + 1 || m === n - 1) return `${besar(kata(m))} kurang tepat, selisih satu. Hitung lagi pelan-pelan. ${PETUNJUK[ls.metode]}`;
    return PETUNJUK[ls.metode];
  };
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    bicara(kata(m));
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${petunjukSalah(m)}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info, bicara };
  const tanya =
    l.tipe === "ikat"
      ? l.tanya === "bilangan"
        ? "Berapa semuanya?"
        : "Berapa satuannya?"
      : l.tipe === "balok"
        ? l.tanya === "bilangan"
          ? "Berapa semuanya?"
          : `Berapa ${l.tanya}nya?`
        : l.tipe === "tabel"
          ? `Berapa angka ${l.tanya}nya?`
          : l.tipe === "sedotan"
            ? l.tanya === "bilangan"
              ? "Berapa semuanya?"
              : l.tanya === "ikat"
                ? "Berapa ikat yang dipakai?"
                : "Berapa sedotan lepas yang dipakai?"
            : "";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "ikat" ? (
          <Ikat {...pk} l={l} />
        ) : l.tipe === "balok" ? (
          <Balok {...pk} l={l} />
        ) : l.tipe === "tabel" ? (
          <Tabel {...pk} l={l} />
        ) : l.tipe === "sedotan" ? (
          <Ikatsedotan {...pk} l={l} />
        ) : (
          <Cari {...pk} l={l} />
        )}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanIkan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
