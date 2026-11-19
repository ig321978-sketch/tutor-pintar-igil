"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  EMOJI_BENDA,
  EMOJI_KRAT,
  barisKartu,
  dasarDari,
  hasilPeriksa,
  kalimatKunci,
  kalimatLayar,
  kalimatTanya,
  kata,
  kunciJawab,
  langkahPertama,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  puluhanTerdekat,
  siapLangsung,
  sisaGaris,
  type Benda,
  type Cara,
  type LFakta,
  type LGaris,
  type LKalimat,
  type LNaik,
  type LPeriksa,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraBotol, PilihanKata, teksKunci } from "./JawabBotol";

/**
 * Satu tugas CPA Kelas 3 Bab 2 Sub-Bab B: metode IGIL (Awal Dikurangi Sisa, Dikurangkan Ditambah Sisa: kalimat pengurangan dengan titik-titik dan memeriksa dengan mengurangkan lagi),
 * Fact Family (Keluarga Fakta: tiga bilangan satu keluarga), Counting Up (Menghitung Naik) dan Number Line (Garis Bilangan), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih bilangan, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji perkemahan di rak kayu pos jaga (Concrete), bagan batang, segitiga, dan garis bilangan polos di kertas milimeter (Pictorial),
 * kartu kata dan angka di lembar catatan jaga (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const BIRU = "#2563EB";
const MERAH = "#DC2626";
const HIJAU_BAGIAN = "#16A34A";

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={15} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
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

/* ------------------------------ Concrete: tiga rak benda ------------------------------ */
type Zona = { judul: string; warna: string; muda: string; n: number | null };
const ZONA_KALIMAT = [
  { judul: "awal", warna: BIRU, muda: "#DBEAFE" },
  { judul: "dikurangkan", warna: MERAH, muda: "#FEE2E2" },
  { judul: "sisa", warna: HIJAU_BAGIAN, muda: "#DCFCE7" },
] as const;

/** Tiga rak kayu (lebar sembilan puluh dua): krat berisi sepuluh dan benda lepas sesuai bilangan, atau tanda tanya bila belum diketahui. */
function ZonaBenda({ zona, benda }: { zona: Zona[]; benda: Benda }) {
  return (
    <g>
      {zona.map((z, c) => {
        const x0 = 8 + c * 96;
        const puluh = z.n === null ? 0 : Math.min(9, Math.floor(z.n / 10));
        const lepas = z.n === null ? 0 : z.n % 10;
        return (
          <g key={c}>
            <rect x={x0} y={24} width={92} height={150} rx={8} fill={z.muda} stroke={z.warna} strokeWidth={1.8} />
            <rect x={x0} y={24} width={92} height={16} rx={8} fill={z.warna} />
            <text x={x0 + 46} y={35.5} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#FFFFFF" aria-hidden="true">
              {z.judul}
            </text>
            {z.n === null ? (
              <text x={x0 + 46} y={118} textAnchor="middle" fontSize={56} fontWeight={900} fill={z.warna}>
                ?
              </text>
            ) : (
              <>
                {Array.from({ length: puluh }, (_, i) => (
                  <text key={`p${i}`} x={x0 + 20 + (i % 3) * 26} y={64 + Math.floor(i / 3) * 21} textAnchor="middle" fontSize={17} aria-hidden="true">
                    {EMOJI_KRAT}
                  </text>
                ))}
                {Array.from({ length: lepas }, (_, i) => (
                  <text key={`l${i}`} x={x0 + 16 + (i % 5) * 15} y={138 + Math.floor(i / 5) * 17} textAnchor="middle" fontSize={13} aria-hidden="true">
                    {EMOJI_BENDA[benda]}
                  </text>
                ))}
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}
function Legenda({ benda }: { benda: Benda }) {
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Keterangan benda">
      {[`${EMOJI_KRAT} = sepuluh`, `${EMOJI_BENDA[benda]} = satu`].map((t) => (
        <li key={t} className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Pictorial: bagan batang, segitiga, garis bilangan ------------------------------ */
/** Bagan batang: batang atas = bilangan awal, dua batang di bawah = dua bagian (lebar sebanding dengan bilangan sebenarnya). `null` = belum diketahui. */
function BaganBatang({ atas, kiri, kanan, lebar, nama, kalimat }: { atas: number | null; kiri: number | null; kanan: number | null; lebar: [number, number]; nama: [string, string]; kalimat: string }) {
  const lebarKiri = Math.round((260 * lebar[0]) / (lebar[0] + lebar[1]));
  const lebarKanan = 260 - lebarKiri;
  return (
    <Gambar label="Bagan batang" judul="batang atas: bilangan awal, batang bawah: dua bagian">
      <rect x={20} y={32} width={260} height={34} rx={5} fill={BIRU} stroke={UNGU} strokeWidth={1.8} />
      <text x={150} y={55} textAnchor="middle" fontSize={17} fontWeight={900} fill="#FFFFFF">
        {atas ?? "?"}
      </text>
      <text x={150} y={80} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={BIRU} aria-hidden="true">
        awal
      </text>
      <rect x={20} y={90} width={lebarKiri} height={34} rx={5} fill={MERAH} stroke={UNGU} strokeWidth={1.8} />
      <rect x={20 + lebarKiri} y={90} width={lebarKanan} height={34} rx={5} fill={HIJAU_BAGIAN} stroke={UNGU} strokeWidth={1.8} />
      <text x={20 + lebarKiri / 2} y={113} textAnchor="middle" fontSize={17} fontWeight={900} fill="#FFFFFF">
        {kiri ?? "?"}
      </text>
      <text x={20 + lebarKiri + lebarKanan / 2} y={113} textAnchor="middle" fontSize={17} fontWeight={900} fill="#FFFFFF">
        {kanan ?? "?"}
      </text>
      <text x={20 + lebarKiri / 2} y={138} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={MERAH} aria-hidden="true">
        {nama[0]}
      </text>
      <text x={20 + lebarKiri + lebarKanan / 2} y={138} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={HIJAU} aria-hidden="true">
        {nama[1]}
      </text>
      <text x={150} y={180} textAnchor="middle" fontSize={24} fontWeight={900} fill={UNGU}>
        {kalimat}
      </text>
    </Gambar>
  );
}
/** Segitiga keluarga fakta polos: puncak = bilangan awal, dua sudut bawah = dua bagian. */
function SegitigaPolos({ awal, b1, b2 }: { awal: number | null; b1: number | null; b2: number | null }) {
  const lingkar = (x: number, y: number, isi: number | null, warna: string, muda: string, nama: string, nx: number, ny: number, anchor: "start" | "middle" | "end") => (
    <g>
      <circle cx={x} cy={y} r={27} fill={muda} stroke={warna} strokeWidth={3} />
      <text x={x} y={y + 8} textAnchor="middle" fontSize={22} fontWeight={900} fill={warna}>
        {isi ?? "?"}
      </text>
      <text x={nx} y={ny} textAnchor={anchor} fontSize={9} fontWeight={900} fill={warna} aria-hidden="true">
        {nama}
      </text>
    </g>
  );
  return (
    <Gambar label="Segitiga keluarga fakta" judul="tiga bilangan satu keluarga: awal di puncak, dua bagian di bawah">
      <polygon points="150,48 70,148 230,148" fill="none" stroke={UNGU} strokeWidth={2.4} strokeLinejoin="round" />
      {lingkar(150, 56, awal, BIRU, "#DBEAFE", "awal", 190, 60, "start")}
      {lingkar(70, 148, b1, MERAH, "#FEE2E2", "bagian", 70, 188, "middle")}
      {lingkar(230, 148, b2, HIJAU_BAGIAN, "#DCFCE7", "bagian", 230, 188, "middle")}
    </Gambar>
  );
}

type Titik = { n: number; label: string; warna: string; emoji?: string };
type Busur = { a: number; b: number; label?: string; warna: string };
/** Garis bilangan dari `dari` sampai `sampai` (kelipatan sepuluh), dengan titik berlabel dan busur lompatan. */
function GarisBil({ dari, sampai, titik, busur, atas, judul }: { dari: number; sampai: number; titik: Titik[]; busur: Busur[]; atas?: string; judul: string }) {
  const X = (n: number) => 20 + ((n - dari) / (sampai - dari)) * 260;
  const Y = 132;
  const tanda: number[] = [];
  for (let n = dari; n <= sampai; n += 10) tanda.push(n);
  return (
    <Gambar label="Garis bilangan" judul={judul}>
      <line x1={X(dari)} y1={Y} x2={X(sampai)} y2={Y} stroke={UNGU} strokeWidth={2.4} />
      {tanda.map((n) => (
        <g key={n}>
          <line x1={X(n)} y1={Y - 5} x2={X(n)} y2={Y + 5} stroke={UNGU} strokeWidth={1.8} />
          <text x={X(n)} y={Y + 18} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU}>
            {n}
          </text>
        </g>
      ))}
      {busur.map((b, i) => {
        const x1 = X(b.a);
        const x2 = X(b.b);
        const h = 16 + (Math.abs(b.b - b.a) / (sampai - dari)) * 34;
        return (
          <g key={i}>
            <path d={`M${x1} ${Y} Q${(x1 + x2) / 2} ${Y - h * 1.7} ${x2} ${Y}`} fill="none" stroke={b.warna} strokeWidth={2.4} strokeLinecap="round" />
            {b.label ? (
              <text x={(x1 + x2) / 2} y={Y - h * 0.85 - 4} textAnchor="middle" fontSize={10} fontWeight={900} fill={b.warna}>
                {b.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {titik.map((t) => (
        <g key={`${t.n}-${t.label}`}>
          <circle cx={X(t.n)} cy={Y} r={5.5} fill={t.warna} stroke={UNGU} strokeWidth={1.4} />
          <text x={X(t.n)} y={Y + 34} textAnchor="middle" fontSize={11} fontWeight={900} fill={t.warna}>
            {t.label}
          </text>
          {t.emoji ? (
            <text x={X(t.n)} y={Y - 12} textAnchor="middle" fontSize={17} aria-hidden="true">
              {t.emoji}
            </text>
          ) : null}
        </g>
      ))}
      {atas ? (
        <text x={150} y={52} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
          {atas}
        </text>
      ) : null}
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, sorot }: { judul?: string; baris: string[]; sorot?: number }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#78350F] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b, i) => (
        <span key={b} className={`block text-sm font-bold leading-snug text-[#1C01A5] ${sorot === i ? "rounded bg-[#FEF08A] px-1 font-black underline" : ""}`}>
          {b}
        </span>
      ))}
    </div>
  );
}
const LembarJaga = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#94A3B8] bg-white p-2 font-mono">{children}</div>;

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilKalimat({ l, rupa, cara }: { l: LKalimat | LPeriksa; rupa: Rupa; cara: Cara }) {
  void cara;
  if (rupa === "lambang")
    return (
      <LembarJaga>
        <KartuKata judul={l.tipe === "periksa" ? "Periksa hasil" : "Kalimat Matematika"} baris={barisKartu(l)} />
      </LembarJaga>
    );
  const periksa = l.tipe === "periksa";
  const nilaiKiri = periksa ? l.awal : l.hilang === "awal" ? null : l.awal;
  const nilaiTengah = periksa ? l.kurang : l.hilang === "kurang" ? null : l.kurang;
  const nilaiAkhir = periksa ? null : l.sisa;
  if (rupa === "benda") {
    const zona: Zona[] = [
      { ...ZONA_KALIMAT[0], n: nilaiKiri },
      { ...ZONA_KALIMAT[1], n: nilaiTengah },
      { ...ZONA_KALIMAT[2], judul: periksa ? "hasil" : "sisa", n: nilaiAkhir },
    ];
    return (
      <div className="space-y-2">
        <Gambar label="Kalimat pengurangan dengan benda" judul={periksa ? "awal dikurangi yang dikurangkan: berapa hasilnya?" : "awal dikurangi dikurangkan sama dengan sisa"}>
          <ZonaBenda zona={zona} benda={l.benda} />
        </Gambar>
        <Legenda benda={l.benda} />
      </div>
    );
  }
  return periksa ? (
    <BaganBatang atas={l.awal} kiri={l.kurang} kanan={null} lebar={[l.kurang, hasilPeriksa(l)]} nama={["dikurangkan", "hasil"]} kalimat={kalimatLayar(l)} />
  ) : (
    <BaganBatang atas={l.hilang === "awal" ? null : l.awal} kiri={l.hilang === "kurang" ? null : l.kurang} kanan={l.sisa} lebar={[l.kurang, l.sisa]} nama={["dikurangkan", "sisa"]} kalimat={kalimatLayar(l)} />
  );
}
function TampilFakta({ l, rupa }: { l: LFakta; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <LembarJaga>
        <KartuKata judul="Keluarga tiga bilangan" baris={barisKartu(l)} />
      </LembarJaga>
    );
  const a = l.hilang === "awal" ? null : l.awal;
  const b1 = l.hilang === "b1" ? null : l.b1;
  const b2 = l.hilang === "b2" ? null : l.b2;
  if (rupa === "diagram") return <SegitigaPolos awal={a} b1={b1} b2={b2} />;
  const zona: Zona[] = [
    { judul: "bagian", warna: MERAH, muda: "#FEE2E2", n: b1 },
    { judul: "bagian", warna: HIJAU_BAGIAN, muda: "#DCFCE7", n: b2 },
    { judul: "awal", warna: BIRU, muda: "#DBEAFE", n: a },
  ];
  return (
    <div className="space-y-2">
      <Gambar label="Keluarga tiga bilangan dengan benda" judul="dua bagian bersama jadi bilangan awal">
        <ZonaBenda zona={zona} benda={l.benda} />
      </Gambar>
      <Legenda benda={l.benda} />
    </div>
  );
}
function TampilNaik({ l, rupa, cara }: { l: LNaik; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <LembarJaga>
        <KartuKata judul="Menghitung naik" baris={barisKartu(l)} />
      </LembarJaga>
    );
  const T = puluhanTerdekat(l.sisa);
  const dari = Math.floor(l.sisa / 10) * 10;
  const benda = rupa === "benda";
  const langkahPuluh = (l.awal - T) / 10;
  const busur: Busur[] = [{ a: l.sisa, b: T, label: cara === "kanvas" ? (l.kanvas === "langkah" ? "?" : `+${langkahPertama(l)}`) : undefined, warna: BIRU }];
  if (cara === "kanvas" && l.kanvas === "puluh") for (let i = 0; i < langkahPuluh; i += 1) busur.push({ a: T + i * 10, b: T + (i + 1) * 10, label: i === 0 ? "+10" : undefined, warna: HIJAU_BAGIAN });
  else busur.push({ a: T, b: l.awal, label: cara === "kanvas" ? `+${l.awal - T}` : undefined, warna: HIJAU_BAGIAN });
  const titik: Titik[] = [
    { n: l.sisa, label: String(l.sisa), warna: MERAH, emoji: benda ? "\u{1F392}" : undefined },
    { n: T, label: String(T), warna: "#F59E0B" },
    { n: l.awal, label: String(l.awal), warna: BIRU, emoji: benda ? "\u{26FA}" : undefined },
  ];
  const atas = cara === "kanvas" ? (l.kanvas === "langkah" ? "langkah pertama: ?" : "lompatan puluhan: ?") : "jarak seluruhnya: ?";
  return <GarisBil dari={dari} sampai={l.awal} titik={titik} busur={busur} atas={atas} judul="naik dari bilangan kecil sampai bilangan besar" />;
}
function TampilGaris({ l, rupa, cara }: { l: LGaris; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <LembarJaga>
        <KartuKata judul="Garis bilangan" baris={barisKartu(l)} />
      </LembarJaga>
    );
  const S = sisaGaris(l);
  const puluh = Math.floor(l.kurang / 10);
  const dari = Math.floor(S / 10) * 10;
  const sampai = Math.ceil(l.awal / 10) * 10;
  const benda = rupa === "benda";
  const busur: Busur[] = [];
  for (let i = 0; i < puluh; i += 1) busur.push({ a: l.awal - (i + 1) * 10, b: l.awal - i * 10, warna: MERAH });
  busur.push({ a: S, b: l.awal - puluh * 10, label: cara === "kanvas" ? (l.kanvas === "satuan" ? "?" : `−${l.kurang % 10}`) : undefined, warna: "#F59E0B" });
  const titik: Titik[] = [
    { n: l.awal, label: String(l.awal), warna: BIRU, emoji: benda ? "\u{26FA}" : undefined },
    { n: S, label: "?", warna: HIJAU_BAGIAN, emoji: benda ? "\u{1F392}" : undefined },
  ];
  return <GarisBil dari={dari} sampai={sampai} titik={titik} busur={busur} atas={`mundur ${l.kurang}`} judul="dari bilangan awal melompat mundur: puluhan dulu, lalu satuan" />;
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  switch (l.tipe) {
    case "kalimat":
    case "periksa":
      return <TampilKalimat l={l} rupa={props.rupa} cara={props.cara} />;
    case "fakta":
      return <TampilFakta l={l} rupa={props.rupa} />;
    case "naik":
      return <TampilNaik l={l} rupa={props.rupa} cara={props.cara} />;
    case "garis":
      return <TampilGaris l={l} rupa={props.rupa} cara={props.cara} />;
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
export function LangkahBotol({ ls, rupa, bicara, onBenar }: P) {
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : /^\d+$/.test(j) ? kata(Number(j)) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara);
  const cocokKlik = (n: string): boolean => (kunci?.jenis === "angka" ? n === String(kunci.n) : kunci !== null && n === teksKunci(kunci));
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} salah={salah} siap={siap} info={info} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraBotol kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
