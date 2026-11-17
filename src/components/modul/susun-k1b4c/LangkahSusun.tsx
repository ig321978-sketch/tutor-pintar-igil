"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import {
  NAMA_BALOK,
  NAMA_BENTUK,
  URUT_BENTUK,
  angkaJawab,
  bentukGabung,
  bentukKeping,
  hitungUrai,
  jenisSlot,
  kalimatTanya,
  kata,
  pilihanDari,
  ruasLidi,
  sasaranBalok,
  sasaranKeping,
  sasaranUrai,
  slotKosong,
  type Bagian,
  type Balok,
  type Bentuk,
  type Langkah,
  type LangkahSoal,
  type Pt,
  type Rupa,
} from "./logika";
import { EMOJI, JENIS_BALOK, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  JARI_PILIHAN,
  LEBAR_ADEGAN,
  LEBAR_KARTU,
  PUSAT_BALOK,
  PUSAT_GABUNG,
  PUSAT_KEPING,
  SATUAN_BALOK,
  SATUAN_GABUNG,
  SATUAN_KEPING,
  TINGGI_ADEGAN,
  TINGGI_KARTU,
  geserKeping,
  geserUrai,
  letakKartu,
  letakLidi,
  letakPilihanBentuk,
  penempatan,
  periksaCentang,
  periksaLingkari,
  pusatBagian,
  pusatPoligon,
  titikBagian,
  type Goresan,
  type Titik,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 4 Sub-Bab C: kegiatan metode (Metode IGIL mengurai mainan gabungan, Tangram menggabung keping dan
 * menghitung keping, Pattern Blocks mengisi bayangan dengan balok pola, Toothpick Shapes meletakkan lidi), lalu menjawab dengan caranya.
 * Rupa: keping karton berwarna bergambar (Concrete), bangun polos (Pictorial), kata dan angka saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const HIJAU = "#15803D";
const jalur = (pts: readonly Titik[]): string => `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;
const warna = (jenis: string, rupa: Rupa): [string, string] => (rupa === "benda" ? WARNA_BENDA[jenis] ?? ["#E0E7FF", UNGU] : ["#EEF2FF", UNGU]);
const namaUntuk = (jenis: string, b: Bentuk, rupa: Rupa) => (rupa === "benda" ? NAMA_BENDA[jenis] ?? "keping" : rupa === "lambang" ? NAMA_BENTUK[b] : "bangun");

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
function KartuTanya({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="inline-block rounded-xl border-4 border-[#1C01A5] bg-[#FEF9C3] px-3 py-1 text-lg">{atas}</p>
      <p className="text-2xl">
        {bawah.replace(" = ?", " = ")}
        <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
      </p>
    </div>
  );
}
/** Kartu kata satu bentuk (rupa lambang). */
function Kartu({ teks, x, y, tanda = "biasa" }: { teks: string; x: number; y: number; tanda?: "biasa" | "pilih" | "pudar" }) {
  return (
    <g opacity={tanda === "pudar" ? 0.3 : 1}>
      <rect x={x - LEBAR_KARTU / 2} y={y - TINGGI_KARTU / 2} width={LEBAR_KARTU} height={TINGGI_KARTU} rx={8} fill={tanda === "pilih" ? "#BBF7D0" : "#FFFFFF"} stroke={tanda === "pilih" ? HIJAU : UNGU} strokeWidth={tanda === "pilih" ? 3 : 1.8} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={teks.length > 8 ? 9.5 : 11} fontWeight={900} fill={UNGU}>
        {teks}
      </text>
    </g>
  );
}
/** Lencana nomor hitungan. */
const Nomor = ({ p, n }: { p: Titik; n: number }) => (
  <g pointerEvents="none">
    <circle cx={p.x} cy={p.y} r={9} fill={MERAH} stroke="#FFFFFF" strokeWidth={2} />
    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FFFFFF">
      {n}
    </text>
  </g>
);

/** Satu bagian mainan: keping karton berwarna bergambar (benda) atau bangun polos (diagram). */
function GambarBagian({ b, rupa, dx = 0, dy = 0, tanda = "biasa" }: { b: Bagian; rupa: Rupa; dx?: number; dy?: number; tanda?: "biasa" | "pilih" | "pudar" }) {
  const [isi, garis] = warna(b.jenis, rupa);
  const g = tanda === "pilih" ? HIJAU : garis;
  const lebar = tanda === "pilih" ? 3.5 : rupa === "benda" ? 2.6 : 2;
  const p = pusatBagian(b);
  return (
    <g opacity={tanda === "pudar" ? 0.3 : 1} style={{ transform: `translate(${dx}px, ${dy}px)`, transition: "transform 0.45s ease-out" }}>
      {b.bentuk === "lengkung" ? <ellipse cx={b.x} cy={b.y} rx={b.w / 2} ry={b.h / 2} fill={isi} stroke={g} strokeWidth={lebar} /> : <path d={jalur(titikBagian(b))} fill={isi} stroke={g} strokeWidth={lebar} strokeLinejoin="round" />}
      {rupa === "benda" && EMOJI[b.jenis] ? (
        <text x={p.x} y={p.y + Math.min(b.w, b.h) * 0.16} textAnchor="middle" fontSize={Math.max(8, Math.min(16, Math.min(b.w, b.h) * 0.5))} pointerEvents="none">
          {EMOJI[b.jenis]}
        </text>
      ) : null}
    </g>
  );
}
/** Keping petak (tangram atau balok) yang sudah ditempatkan di kanvas. */
function GambarKeping({ pts, jenis, rupa, tanda = "biasa", geser }: { pts: Titik[]; jenis: string; rupa: Rupa; tanda?: "biasa" | "pilih"; geser?: Titik }) {
  const [isi, garis] = warna(jenis, rupa);
  const c = { x: pts.reduce((s, p) => s + p.x, 0) / pts.length, y: pts.reduce((s, p) => s + p.y, 0) / pts.length };
  return (
    <g style={{ transform: `translate(${geser?.x ?? 0}px, ${geser?.y ?? 0}px)`, transition: "transform 0.6s ease-in-out" }}>
      <path d={jalur(pts)} fill={isi} stroke={tanda === "pilih" ? HIJAU : garis} strokeWidth={tanda === "pilih" ? 3.5 : rupa === "benda" ? 2.6 : 2} strokeLinejoin="round" />
      {rupa === "benda" && EMOJI[jenis] ? (
        <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={13} pointerEvents="none">
          {EMOJI[jenis]}
        </text>
      ) : null}
    </g>
  );
}

/* ------------------------------ Metode IGIL: urai mainan gabungan ------------------------------ */
function Urai({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "urai" }> }) {
  const [kena, setKena] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const t = l.tanya;
  const lepas = typeof t === "object" ? t.lepas : null;
  const sasaran = sasaranUrai(l);
  const hitung = hitungUrai(l);
  const lambang = rupa === "lambang";
  const letak = l.bagian.map((b, i) => (lambang ? letakKartu(i, l.bagian.length) : pusatBagian(b)));
  /** Di kanvas mode lepas, bagian yang dilepas sudah terlepas sejak awal. */
  const terlepas = (i: number) => (lepas !== null && (kanvas ? sasaran.includes(i) : kena.includes(i)));
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || kena.includes(i)) return;
    if (!sasaran.includes(i)) {
      const nama = NAMA_BENTUK[(lepas ?? t) as Bentuk];
      salah(lepas ? `Yang itu bukan ${nama}. Lepas bagian ${nama} saja.` : `Yang itu bukan ${nama}. Ketuk bagian ${nama} saja.`);
      return;
    }
    const baru = [...kena, i];
    setKena(baru);
    if (baru.length === sasaran.length) {
      setSelesai(true);
      siap(t === "semua" ? "Mainan sudah terurai semua." : lepas ? `Semua ${NAMA_BENTUK[lepas]} sudah dilepas. Hitung bagian yang tersisa.` : `Semua ${NAMA_BENTUK[t as Bentuk]} sudah diurai.`);
    }
  };
  const periksa = () => {
    const p = periksaCentang(goresan, hitung.map((i) => letak[i]), lambang ? 24 : 18);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap bagian.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu bagian, satu tanda." : p.nyasar > 0 ? (lepas ? "Bagian yang dilepas tidak dihitung." : "Beri tanda hanya pada bagian yang ditanya.") : "Ada bagian yang belum diberi tanda.");
    }
  };
  const judul = kanvas ? (lepas ? `tandai yang tersisa` : `tandai: ${t === "semua" ? "semua bagian" : NAMA_BENTUK[t as Bentuk]}`) : lepas ? `dilepas: ${kena.length}` : `terurai: ${kena.length}`;
  const gambar = (
    <g>
      <text x={150} y={14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {l.nama} · {judul}
      </text>
      {l.bagian.map((b, i) => {
        const urai = !kanvas && kena.includes(i);
        const g = !lambang && (urai || terlepas(i)) ? geserUrai(l.bagian, i) : { x: 0, y: 0 };
        const tanda = terlepas(i) ? "pudar" : urai ? "pilih" : "biasa";
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${namaUntuk(b.jenis, b.bentuk, rupa)}${urai ? (lepas ? ", dilepas" : ", terurai") : ""}`}>
            {lambang ? <Kartu teks={NAMA_BENTUK[b.bentuk]} x={letak[i].x} y={letak[i].y} tanda={tanda} /> : <GambarBagian b={b} rupa={rupa} dx={g.x} dy={g.y} tanda={tanda} />}
          </g>
        );
      })}
      {!kanvas && !lepas ? kena.map((i, n) => <Nomor key={i} p={lambang ? { x: letak[i].x + LEBAR_KARTU / 2 - 6, y: letak[i].y - TINGGI_KARTU / 2 + 4 } : { x: letak[i].x + geserUrai(l.bagian, i).x, y: letak[i].y + geserUrai(l.bagian, i).y }} n={n + 1} />) : null}
    </g>
  );
  return (
    <div className="space-y-2">
      {lambang ? <KartuTanya {...kalimatTanya(l)} /> : null}
      {kanvas ? <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} /> : <Gambar label={`Urai ${l.nama}`}>{gambar}</Gambar>}
    </div>
  );
}

/* ------------------------------ Tangram: gabung keping, pilih bentuk barunya ------------------------------ */
function IkonBentuk({ b, x, y }: { b: Bentuk; x: number; y: number }) {
  const r = 18;
  if (b === "lengkung") return <circle cx={x} cy={y} r={r} fill="#FEF9C3" stroke={UNGU} strokeWidth={2} />;
  const pts = b === "segitiga" ? [{ x, y: y - r }, { x: x + r, y: y + r * 0.8 }, { x: x - r, y: y + r * 0.8 }] : [{ x: x - r, y: y - r * 0.7 }, { x: x + r, y: y - r * 0.7 }, { x: x + r, y: y + r * 0.7 }, { x: x - r, y: y + r * 0.7 }];
  return <path d={jalur(pts)} fill="#FEF9C3" stroke={UNGU} strokeWidth={2} strokeLinejoin="round" />;
}
function Gabung({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "gabung" }> }) {
  const lambang = rupa === "lambang";
  const [gabung, setGabung] = useState(kanvas || lambang);
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = URUT_BENTUK.indexOf(bentukGabung(l));
  const letak = URUT_BENTUK.map((_, i) => letakPilihanBentuk(i));
  const pesanBetul = `Betul! Bentuk barunya ${NAMA_BENTUK[URUT_BENTUK[benar]]}.`;
  const ketukPilih = (i: number) => {
    if (selesai || kanvas || mati.includes(i)) return;
    if (!gabung) {
      salah("Gabungkan dulu kepingnya.");
      return;
    }
    setPilih(i);
    if (i === benar) {
      setSelesai(true);
      siap(pesanBetul);
    } else {
      setMati((m) => [...m, i]);
      salah(URUT_BENTUK[i] === "lengkung" ? "Keping bersisi lurus tidak menjadi lengkung. Hitung sudut bentuk barunya." : "Bukan yang itu. Hitung sudut pada garis tepi bentuk barunya.");
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, letak, letak.map((_, i) => i === benar));
    if (r.benar) {
      setSelesai(true);
      siap(pesanBetul);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu bentuk saja, bentuk barunya." : "Bentuk barunya belum dilingkari.");
    }
  };
  const ke = penempatan(l.gabung, SATUAN_GABUNG, PUSAT_GABUNG.x, PUSAT_GABUNG.y);
  const tanya = kalimatTanya(l);
  const gambar = (
    <g>
      {lambang ? (
        <>
          <rect x={20} y={24} width={260} height={80} rx={12} fill="#FEF9C3" stroke={UNGU} strokeWidth={2} />
          <text x={150} y={56} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
            {tanya.atas.split(" (")[0]}
          </text>
          <text x={150} y={78} textAnchor="middle" fontSize={11} fontWeight={800} fill={UNGU}>
            {l.tempel}
          </text>
        </>
      ) : (
        <>
          {l.keping.map((p, i) => {
            const [dx, dy] = geserKeping(p.titik, l.gabung);
            return <GambarKeping key={i} pts={p.titik.map(ke)} jenis={p.jenis} rupa={rupa} geser={gabung ? { x: 0, y: 0 } : { x: dx, y: dy }} />;
          })}
          {gabung && !kanvas && selesai ? <path d={jalur(l.gabung.map(ke))} fill="none" stroke={HIJAU} strokeWidth={4} strokeLinejoin="round" pointerEvents="none" /> : null}
        </>
      )}
      <text x={150} y={128} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        bentuk barunya?
      </text>
      {URUT_BENTUK.map((b, i) => (
        <g key={b} {...(kanvas ? {} : ketuk(() => ketukPilih(i)))} aria-label={NAMA_BENTUK[b]} aria-disabled={mati.includes(i)} opacity={mati.includes(i) || (!gabung && !kanvas) ? 0.35 : 1}>
          <circle cx={letak[i].x} cy={letak[i].y} r={JARI_PILIHAN + 4} fill={pilih === i && selesai ? "#BBF7D0" : "transparent"} />
          {lambang ? <Kartu teks={NAMA_BENTUK[b]} x={letak[i].x} y={letak[i].y} /> : <IkonBentuk b={b} x={letak[i].x} y={letak[i].y} />}
        </g>
      ))}
    </g>
  );
  return (
    <div className="space-y-2">
      {kanvas ? <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} /> : <Gambar label="Gabung keping tangram">{gambar}</Gambar>}
      {!gabung ? (
        <div className="flex justify-center">
          <button type="button" onClick={() => setGabung(true)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-base font-black text-[#1C01A5]">
            {"\u{1F91D}"} Gabungkan
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Tangram (suara): hitung keping ------------------------------ */
function HitungKeping({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "keping" }> }) {
  const [kena, setKena] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const lambang = rupa === "lambang";
  const sasaran = sasaranKeping(l);
  const ke = penempatan(l.keping.flatMap((p) => p.titik), SATUAN_KEPING, PUSAT_KEPING.x, PUSAT_KEPING.y);
  const letak = l.keping.map((p, i) => (lambang ? letakKartu(i, l.keping.length) : pusatPoligon(p.titik, ke)));
  const apa = l.tanya === "semua" ? "keping" : NAMA_BENTUK[l.tanya];
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || kena.includes(i)) return;
    if (!sasaran.includes(i)) {
      salah(`Yang itu bukan ${apa}. Lihat sisi dan sudutnya.`);
      return;
    }
    const baru = [...kena, i];
    setKena(baru);
    if (baru.length === sasaran.length) {
      setSelesai(true);
      siap(`Semua ${apa} sudah dihitung.`);
    }
  };
  const periksa = () => {
    const p = periksaCentang(goresan, sasaran.map((i) => letak[i]), 18);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap keping.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu keping, satu tanda." : p.nyasar > 0 ? `Beri tanda hanya pada ${apa}.` : "Ada keping yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <text x={150} y={14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {l.nama} · {kanvas ? `tandai: ${apa}` : `${apa} terhitung: ${kena.length}`}
      </text>
      {l.keping.map((p, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${namaUntuk(p.jenis, bentukKeping(p), rupa)}${kena.includes(i) ? ", terhitung" : ""}`}>
          {lambang ? <Kartu teks={NAMA_BENTUK[bentukKeping(p)]} x={letak[i].x} y={letak[i].y} tanda={kena.includes(i) ? "pilih" : "biasa"} /> : <GambarKeping pts={p.titik.map(ke)} jenis={p.jenis} rupa={rupa} tanda={kena.includes(i) ? "pilih" : "biasa"} />}
        </g>
      ))}
      {kena.map((i, n) => (
        <Nomor key={i} p={lambang ? { x: letak[i].x + LEBAR_KARTU / 2 - 6, y: letak[i].y - TINGGI_KARTU / 2 + 4 } : letak[i]} n={n + 1} />
      ))}
    </g>
  );
  return (
    <div className="space-y-2">
      {lambang ? <KartuTanya {...kalimatTanya(l)} /> : null}
      {kanvas ? <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} /> : <Gambar label={`Hitung keping ${l.nama}`}>{gambar}</Gambar>}
    </div>
  );
}

/* ------------------------------ Pattern Blocks: isi bayangan dengan balok pola ------------------------------ */
function IkonBalok({ b }: { b: Balok }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path d={b === "segitiga" ? "M 12 3 L 22 21 L 2 21 Z" : "M 3 3 L 21 3 L 21 21 L 3 21 Z"} fill={b === "segitiga" ? "#FCA5A5" : "#D6A15E"} stroke={UNGU} strokeWidth={2} strokeLinejoin="round" />
    </svg>
  );
}
function IsiBalok({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "balok" }> }) {
  const [isi, setIsi] = useState<number[]>(l.isi);
  const [pegang, setPegang] = useState<Balok | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const lambang = rupa === "lambang";
  useEffect(() => {
    if (lambang) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (lambang) return <KartuTanya {...kalimatTanya(l)} />;
  const ke = penempatan(l.slot.flat(), SATUAN_BALOK, PUSAT_BALOK.x, PUSAT_BALOK.y);
  const kosong = slotKosong(l);
  const ketukSlot = (i: number) => {
    if (selesai || kanvas || isi.includes(i)) return;
    if (!pegang) {
      salah("Pilih balok di baki dulu.");
      return;
    }
    if (jenisSlot(l.slot[i]) !== pegang) {
      salah(`Bayangan itu bentuknya ${NAMA_BALOK[jenisSlot(l.slot[i])]}. Pilih balok yang cocok.`);
      return;
    }
    const baru = [...isi, i];
    setIsi(baru);
    if (kosong.every((k) => baru.includes(k))) {
      setSelesai(true);
      siap("Bayangan sudah penuh. Hitung baloknya.");
    }
  };
  const sasaran = sasaranBalok(l);
  const periksa = () => {
    const p = periksaCentang(goresan, sasaran.map((i) => pusatPoligon(l.slot[i], ke)), 16);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap balok.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu balok, satu tanda." : p.nyasar > 0 ? "Beri tanda hanya pada bayangan yang ditanya." : "Ada bayangan yang belum diberi tanda.");
    }
  };
  const diisi = isi.filter((i) => !l.isi.includes(i)).length;
  const gambar = (
    <g>
      <text x={150} y={14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {l.nama} · {kanvas ? (l.tanya === "sisa" ? "tandai yang kosong" : `tandai: ${l.tanya === "semua" ? "semua bayangan" : NAMA_BALOK[l.tanya]}`) : `balok baru: ${diisi}`}
      </text>
      {l.slot.map((s, i) => {
        const pts = s.map(ke);
        const j = jenisSlot(s);
        const penuh = isi.includes(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSlot(i)))} aria-label={`bayangan ${NAMA_BALOK[j]}${penuh ? ", terisi" : ""}`}>
            {penuh ? <GambarKeping pts={pts} jenis={JENIS_BALOK[j]} rupa={rupa} /> : <path d={jalur(pts)} fill="#E2E8F0" stroke="#64748B" strokeWidth={1.6} strokeDasharray="4 3" strokeLinejoin="round" />}
          </g>
        );
      })}
    </g>
  );
  return (
    <div className="space-y-2">
      {kanvas ? <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} /> : <Gambar label={`Bayangan ${l.nama}`}>{gambar}</Gambar>}
      {!kanvas && !selesai ? (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/40 bg-white/80 p-2" role="group" aria-label="Baki balok">
          <span className="text-xs font-black text-[#1C01A5]">baki:</span>
          {(["segitiga", "persegi"] as Balok[]).map((b) => (
            <button key={b} type="button" aria-pressed={pegang === b} onClick={() => setPegang(b)} className={`flex min-h-[44px] items-center gap-1.5 rounded-xl border-4 px-3 text-sm font-black ${pegang === b ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}>
              <IkonBalok b={b} />
              {rupa === "benda" ? `${EMOJI[JENIS_BALOK[b]]} ` : ""}
              {NAMA_BALOK[b]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Toothpick Shapes: letakkan lidi ------------------------------ */
function Lidi({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "lidi" }> }) {
  const [kena, setKena] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const lambang = rupa === "lambang";
  useEffect(() => {
    if (lambang) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (lambang) return <KartuTanya {...kalimatTanya(l)} />;
  const ruas = ruasLidi(l.bangun).map(([a, b]): [Titik, Titik] => [letakLidi(a), letakLidi(b)]);
  const tengah = ruas.map(([a, b]) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }));
  const ketukRuas = (i: number) => {
    if (selesai || kanvas || kena.includes(i)) return;
    const baru = [...kena, i];
    setKena(baru);
    if (baru.length === ruas.length) {
      setSelesai(true);
      siap("Semua lidi terpasang. Hitung lidinya.");
    }
  };
  const periksa = () => {
    const p = periksaCentang(goresan, tengah, 14);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap lidi.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu lidi, satu tanda. Sisi bersama cukup satu lidi." : p.nyasar > 0 ? "Beri tanda tepat di garis putus-putus." : "Ada garis putus-putus yang belum diberi tanda.");
    }
  };
  const benda = rupa === "benda";
  const gambar = (
    <g>
      <text x={150} y={14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {benda ? "\u{1F962} " : ""}
        {l.nama} · {kanvas ? "tandai tiap lidi" : `lidi terpasang: ${kena.length}`}
      </text>
      {l.bangun.map((b: Pt[], i) => (
        <path key={`b${i}`} d={jalur(b.map(letakLidi))} fill={benda ? "#FEF3C7" : "#F1F5F9"} stroke="none" />
      ))}
      {ruas.map(([a, b], i) => {
        const ada = kena.includes(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukRuas(i)))} aria-label={`garis ${i + 1}${ada ? ", lidi terpasang" : ""}`}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={18} />
            {ada ? (
              <>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={benda ? "#B45309" : UNGU} strokeWidth={benda ? 6 : 3.5} strokeLinecap="round" />
                {benda ? <circle cx={a.x} cy={a.y} r={3.5} fill="#7C2D12" /> : null}
              </>
            ) : (
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#94A3B8" strokeWidth={2.5} strokeDasharray="5 4" strokeLinecap="round" />
            )}
          </g>
        );
      })}
      {kena.map((i, n) => (
        <Nomor key={i} p={tengah[i]} n={n + 1} />
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={`Lidi ${l.nama}`}>{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung lagi bagian yang ditanya satu per satu.",
  tangram: "Hitung lagi keping yang ditanya satu per satu.",
  balok: "Hitung lagi balok yang ditanya satu per satu.",
  lidi: "Hitung lagi lidinya satu per satu. Sisi bersama cukup satu lidi.",
};

export function LangkahSusun({ ls, rupa, bicara, onBenar }: P) {
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
    if (p) {
      setPesan(p);
      bicara(p);
    }
  };
  const jawab = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(`Betul! Banyaknya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap };
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "urai" ? <Urai {...pk} l={l} /> : l.tipe === "gabung" ? <Gabung {...pk} l={l} /> : l.tipe === "keping" ? <HitungKeping {...pk} l={l} /> : l.tipe === "balok" ? <IsiBalok {...pk} l={l} /> : <Lidi {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">Berapa banyaknya?</p>
          {cara === "kanvas" ? (
            <JawabTulis kunci={n} onBenar={() => jawab(n)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuara kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "")} onPesan={setPesan} />
          ) : (
            <Pilihan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
