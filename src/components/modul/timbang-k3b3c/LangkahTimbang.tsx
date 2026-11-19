"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  ACUAN,
  barisKartu,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kunciJawab,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  siapLangsung,
  ucapkan,
  type Cara,
  type JenisAlat,
  type LAcuan,
  type LAlat,
  type LBanding,
  type LBaca,
  type LNol,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraTimbang, PilihanKata, teksKunci } from "./JawabTimbang";

/**
 * Satu tugas CPA Kelas 3 Bab 3 Sub-Bab C: metode IGIL (Jarum di Nol, Baca, Tulis Satuan: membaca timbangan duduk dan timbangan digital), Hefting (Mengangkat dan Merasakan: dua benda di dua tangan),
 * Benchmark Weights (Berat Acuan: kantong gula satu kilogram dan butir telur lima puluh gram), dan Zero Check (Cek Angka Nol), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih ukuran, tangan, langkah, atau timbangan; tulis satu angka di kanvas; atau ucapkan). Rupa: benda beremoji di lantai gudang pakan (Concrete),
 * jarum, layar, dan batang polos di papan timbangan (Pictorial), kartu kata dan angka di catatan juru pakan (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const C_TANYA = "#D97706";

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}
function Tombol({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#78350F] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#1C01A5]">
          {b}
        </span>
      ))}
    </div>
  );
}
const PapanInfo = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#A16207] bg-[#FFFBEB] p-2 font-mono">{children}</div>;

/* ------------------------------ Benda di atas timbangan ------------------------------ */
/** Benda di atas pelat: emoji berwarna (Concrete) atau kotak polos berlabel kata (Pictorial). */
function BendaAtas({ x, y, rupa, emoji, nama, lebar = 84 }: { x: number; y: number; rupa: Rupa; emoji?: string; nama: string; lebar?: number }) {
  if (rupa === "benda" && emoji)
    return (
      <text x={x} y={y} textAnchor="middle" fontSize={26} aria-hidden="true">
        {emoji}
      </text>
    );
  return (
    <g aria-hidden="true">
      <rect x={x - lebar / 2} y={y - 18} width={lebar} height={18} rx={4} fill="#E2E8F0" stroke={UNGU} strokeWidth={1.2} />
      <text x={x} y={y - 6} textAnchor="middle" fontSize={nama.length > 16 ? 7.4 : 8.6} fontWeight={800} fill={UNGU}>
        {nama}
      </text>
    </g>
  );
}

/** Sudut jarum (derajat dari atas, searah jarum jam): nol di -135 dan tiap angka 27 derajat. */
const sudut = (n: number): number => -135 + 27 * n;
const titik = (cx: number, cy: number, r: number, n: number): [number, number] => {
  const a = (sudut(n) * Math.PI) / 180;
  return [Math.round((cx + r * Math.sin(a)) * 10) / 10, Math.round((cy - r * Math.cos(a)) * 10) / 10];
};

/** Timbangan duduk berjarum: pelat, badan, lingkaran angka nol sampai sepuluh, dan jarum yang menunjuk `nilai` (kilogram). */
export function Duduk({ nilai, rupa, emoji, nama, benda = true, cx = 150, cy = 112, r = 42 }: { nilai: number; rupa: Rupa; emoji?: string; nama: string; benda?: boolean; cx?: number; cy?: number; r?: number }) {
  const warnaBadan = rupa === "benda" ? "#F59E0B" : "#94A3B8";
  const [jx, jy] = titik(cx, cy, r - 9, nilai);
  return (
    <g aria-hidden="true">
      {benda ? <BendaAtas x={cx} y={cy - r - 24} rupa={rupa} emoji={emoji} nama={nama} /> : null}
      <rect x={cx - 38} y={cy - r - 14} width={76} height={7} rx={3} fill="#CBD5E1" stroke={UNGU} strokeWidth={1.2} />
      <rect x={cx - r - 8} y={cy - r - 7} width={2 * r + 16} height={2 * r + 18} rx={14} fill={warnaBadan} stroke={UNGU} strokeWidth={1.6} />
      <circle cx={cx} cy={cy} r={r} fill="#FFFBEB" stroke={UNGU} strokeWidth={1.4} />
      {Array.from({ length: 11 }, (_, i) => {
        const [x1, y1] = titik(cx, cy, r - 1, i);
        const [x2, y2] = titik(cx, cy, r - 6, i);
        const [tx, ty] = titik(cx, cy, r - 14, i);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={UNGU} strokeWidth={i === 0 ? 2.4 : 1.2} />
            {i < 10 ? (
              <text x={tx} y={ty + 3} textAnchor="middle" fontSize={8.4} fontWeight={900} fill={i === 0 ? "#DC2626" : UNGU}>
                {i}
              </text>
            ) : null}
          </g>
        );
      })}
      <line x1={cx} y1={cy} x2={jx} y2={jy} stroke="#DC2626" strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3.6} fill="#DC2626" stroke={UNGU} strokeWidth={1} />
    </g>
  );
}

/** Timbangan digital: pelat, badan, layar gelap dengan angka `angka`, dan tombol nol. */
export function Layar({ angka, rupa, emoji, nama, benda = true }: { angka: number; rupa: Rupa; emoji?: string; nama: string; benda?: boolean }) {
  const warnaBadan = rupa === "benda" ? "#38BDF8" : "#94A3B8";
  return (
    <g aria-hidden="true">
      {benda ? <BendaAtas x={150} y={66} rupa={rupa} emoji={emoji} nama={nama} /> : null}
      <rect x={104} y={70} width={92} height={7} rx={3} fill="#CBD5E1" stroke={UNGU} strokeWidth={1.2} />
      <rect x={84} y={78} width={132} height={72} rx={10} fill={warnaBadan} stroke={UNGU} strokeWidth={1.6} />
      <rect x={96} y={88} width={108} height={30} rx={5} fill="#052E16" stroke={UNGU} strokeWidth={1.2} />
      <text x={150} y={110} textAnchor="middle" fontSize={22} fontWeight={900} fill="#86EFAC" fontFamily="monospace">
        {angka}
      </text>
      <circle cx={186} cy={136} r={7} fill="#FEF08A" stroke={UNGU} strokeWidth={1.2} />
      <text x={186} y={138.6} textAnchor="middle" fontSize={7} fontWeight={900} fill={UNGU}>
        nol
      </text>
    </g>
  );
}

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilBaca({ l, rupa, cara }: { l: LBaca; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Membaca timbangan" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const emoji = rupa === "benda" ? l.emoji : undefined;
  return (
    <Gambar label="Timbangan dengan benda" judul={l.alat === "jarum" ? "timbangan duduk, jarum sudah di nol" : "timbangan digital, layar sudah di nol"}>
      {l.alat === "jarum" ? <Duduk nilai={l.angka} rupa={rupa} emoji={emoji} nama={l.benda} /> : <Layar angka={l.angka} rupa={rupa} emoji={emoji} nama={l.benda} />}
      <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={C_TANYA}>
        {cara === "suara" ? "satuannya = ?" : cara === "kanvas" ? "jarum menunjuk: ?" : "berat = ?"}
      </text>
    </Gambar>
  );
}

function TampilNol({ l, rupa, cara }: { l: LNol; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Cek angka nol" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  return (
    <Gambar label="Timbangan yang belum di nol" judul={l.alat === "jarum" ? "jarum belum di nol" : "layar belum di nol"}>
      {l.alat === "jarum" ? <Duduk nilai={l.awal} rupa={rupa} nama="belum ada benda" benda={false} cy={104} /> : <Layar angka={l.awal} rupa={rupa} nama="belum ada benda" benda={false} />}
      <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={C_TANYA}>
        benda belum diletakkan
      </text>
    </Gambar>
  );
}

function TampilBanding({ l, rupa, cara }: { l: LBanding; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Dua benda di kedua tangan" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const berat = lebihBeratIndeks(l);
  const sisi: { x: number; i: 0 | 1 }[] = [
    { x: 78, i: 0 },
    { x: 222, i: 1 },
  ];
  return (
    <Gambar label="Dua benda di kedua tangan" judul="tangan yang lebih berat turun lebih rendah">
      {sisi.map(({ x, i }) => {
        const atas = i === berat ? 98 : 74;
        return (
          <g key={i} aria-hidden="true">
            <BendaAtas x={x} y={atas - 8} rupa={rupa} emoji={rupa === "benda" ? l.emoji[i] : undefined} nama={l.benda[i]} lebar={92} />
            <rect x={x - 30} y={atas} width={60} height={9} rx={4} fill={rupa === "benda" ? "#FBBF24" : "#CBD5E1"} stroke={UNGU} strokeWidth={1.4} />
            <rect x={x - 8} y={atas + 9} width={16} height={150 - atas - 9} rx={3} fill={rupa === "benda" ? "#FDE68A" : "#E2E8F0"} stroke={UNGU} strokeWidth={1.2} />
            <text x={x} y={165} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#475569">
              tangan {i === 0 ? "kiri" : "kanan"}
            </text>
            <rect x={x - 38} y={170} width={76} height={20} rx={5} fill="#FFFBEB" stroke={C_TANYA} strokeWidth={1.4} />
            <text x={x} y={184} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
              {l.berat[i]} {l.satuan}
            </text>
          </g>
        );
      })}
      <text x={150} y={118} textAnchor="middle" fontSize={20} fontWeight={900} fill={C_TANYA}>
        {cara === "kanvas" ? "selisih?" : "?"}
      </text>
    </Gambar>
  );
}
const lebihBeratIndeks = (l: LBanding): 0 | 1 => (l.berat[0] > l.berat[1] ? 0 : 1);

function TampilAcuan({ l, rupa, cara }: { l: LAcuan; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Berat acuan" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const a = ACUAN[l.acuan];
  const benda = rupa === "benda";
  const kolom = 10;
  const ukur = l.n > 10 ? 25 : 30;
  const x0 = 150 - (Math.min(l.n, kolom) * ukur) / 2;
  const emoji = l.acuan === "gula" ? "\u{1F6CD}\u{FE0F}" : "\u{1F95A}";
  return (
    <Gambar label="Benda acuan" judul={benda ? `${a.nama}: satu = ${a.satu} ${a.satuan}` : `tiap kotak = ${a.satu} ${a.satuan}`}>
      {Array.from({ length: l.n }, (_, i) => {
        const x = x0 + (i % kolom) * ukur;
        const y = 44 + Math.floor(i / kolom) * (ukur + 4);
        return benda ? (
          <text key={i} x={x + ukur / 2} y={y + ukur - 6} textAnchor="middle" fontSize={ukur - 6} aria-hidden="true">
            {emoji}
          </text>
        ) : (
          <rect key={i} x={x + 2} y={y + 2} width={ukur - 4} height={ukur - 4} rx={4} fill="#BFDBFE" stroke={UNGU} strokeWidth={1.2} aria-hidden="true" />
        );
      })}
      <text x={150} y={128} textAnchor="middle" fontSize={11} fontWeight={800} fill="#475569">
        banyaknya: {l.n}
      </text>
      <rect x={70} y={140} width={160} height={30} rx={8} fill="#FEF3C7" stroke={C_TANYA} strokeWidth={2} strokeDasharray="5 3" />
      <text x={150} y={160} textAnchor="middle" fontSize={15} fontWeight={900} fill={C_TANYA}>
        {cara === "klik" ? "berat seluruhnya = ?" : "banyak kilogram = ?"}
      </text>
    </Gambar>
  );
}

/** Tiga ikon timbangan kecil: digital (layar), duduk (lingkaran), badan (pelat pipih dengan layar). */
function IkonTimbang({ x, jenis, rupa }: { x: number; jenis: JenisAlat; rupa: Rupa }) {
  const badan = rupa === "benda" ? (jenis === "digital" ? "#38BDF8" : jenis === "duduk" ? "#F59E0B" : "#A3E635") : "#CBD5E1";
  return (
    <g aria-hidden="true">
      {jenis === "digital" ? (
        <>
          <rect x={x - 26} y={104} width={52} height={36} rx={6} fill={badan} stroke={UNGU} strokeWidth={1.4} />
          <rect x={x - 18} y={110} width={36} height={13} rx={3} fill="#052E16" />
          <text x={x} y={120} textAnchor="middle" fontSize={9} fontWeight={900} fill="#86EFAC" fontFamily="monospace">
            0
          </text>
        </>
      ) : jenis === "duduk" ? (
        <>
          <rect x={x - 26} y={100} width={52} height={44} rx={9} fill={badan} stroke={UNGU} strokeWidth={1.4} />
          <circle cx={x} cy={122} r={14} fill="#FFFBEB" stroke={UNGU} strokeWidth={1.2} />
          <line x1={x} y1={122} x2={x + 7} y2={114} stroke="#DC2626" strokeWidth={1.8} strokeLinecap="round" />
        </>
      ) : (
        <>
          <rect x={x - 28} y={124} width={56} height={14} rx={6} fill={badan} stroke={UNGU} strokeWidth={1.4} />
          <rect x={x - 12} y={127} width={24} height={7} rx={2} fill="#052E16" />
        </>
      )}
    </g>
  );
}
function TampilAlat({ l, rupa, cara }: { l: LAlat; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Memilih timbangan" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const jenis: JenisAlat[] = ["digital", "duduk", "badan"];
  return (
    <Gambar label="Memilih timbangan" judul="tiga jenis timbangan di gudang">
      <BendaAtas x={150} y={64} rupa={rupa} emoji={rupa === "benda" ? l.emoji : undefined} nama={l.benda} lebar={110} />
      {jenis.map((j, i) => (
        <g key={j}>
          <IkonTimbang x={50 + i * 100} jenis={j} rupa={rupa} />
          <text x={50 + i * 100} y={160} textAnchor="middle" fontSize={10} fontWeight={800} fill="#475569" aria-hidden="true">
            {j}
          </text>
        </g>
      ))}
      <text x={150} y={188} textAnchor="middle" fontSize={11} fontWeight={900} fill={C_TANYA}>
        timbangan yang cocok = ?
      </text>
    </Gambar>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  switch (l.tipe) {
    case "baca":
      return <TampilBaca l={l} rupa={props.rupa} cara={props.cara} />;
    case "nol":
      return <TampilNol l={l} rupa={props.rupa} cara={props.cara} />;
    case "banding":
      return <TampilBanding l={l} rupa={props.rupa} cara={props.cara} />;
    case "acuan":
      return <TampilAcuan l={l} rupa={props.rupa} cara={props.cara} />;
    case "alat":
      return <TampilAlat l={l} rupa={props.rupa} cara={props.cara} />;
  }
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Posisi alasan benar ditentukan dari teks tugas (tetap, tanpa acak saat render) supaya tidak selalu di tombol yang sama. */
  const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  const lain = [0, 1, 2].filter((i) => i !== l.benar);
  const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} />
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

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahTimbang({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas hitung, kata, dan semua tugas kanvas dan suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata, ukuran, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? ucapkan(String(j)) : ucapkan(j));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara);
  const cocokKlik = (n: string): boolean => kunci !== null && n === teksKunci(kunci);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} salah={salah} siap={siap} info={info} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraTimbang kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : (
            <PilihanKata pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, cocokKlik(n))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
