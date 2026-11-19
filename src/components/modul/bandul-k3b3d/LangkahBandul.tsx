"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  EMOJI_BENDA,
  barisKartu,
  dasarDari,
  fmtBerat,
  fmtG,
  fmtKg,
  kalimatKunci,
  kalimatTanya,
  kata,
  kataBil,
  kolomTabel,
  kunciJawab,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  potongan,
  ribuan,
  setDari,
  siapLangsung,
  totalGaris,
  totalTabel,
  totalUbah,
  type Benda,
  type Cara,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type LGabung,
  type LGaris,
  type LPecah,
  type LTabel,
  type Rupa,
  type SetBandul,
} from "./logika-cpa";
import { JawabSuaraBandul, PilihanKata, teksKunci } from "./JawabBandul";
import { EMAS, GrupBandul, POLOS } from "./GambarBandul";

/**
 * Satu tugas CPA Kelas 3 Bab 3 Sub-Bab D: metode IGIL (Kali Seribu ke Gram, Ambil Seribu ke Kilogram: mengubah kilogram dan gram, menjumlahkan dan mengurangkan berat, bandul timbangan kodok, ons),
 * Place Value Chart (Tabel Tempat Angka), Double Number Line (Garis Bilangan Ganda) dan Chunking (Pecah Seribu-Seribu), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih ukuran, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji kebun binatang dan bandul logam di meja periksa dokter hewan (Concrete),
 * bandul polos, layar timbangan polos, tabel, garis ganda, dan potongan seribu gram di kertas biru pucat (Pictorial), kartu kata dan angka di rekam medis hewan (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const BIRU = "#2563EB";
const MERAH = "#DC2626";

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
const Info = ({ children }: { children: React.ReactNode }) => <p className="text-center text-sm font-black text-[#1C01A5]">{children}</p>;

/** Ucapan ukuran bersatuan tanpa digit: "1.200 g" menjadi "seribu dua ratus gram". */
const ucapUkuran = (t: string): string => t.replace(/\d[\d.]*\d|\d/g, (d) => kataBil(Number(d.replace(/\./g, "")))).replace(/ kg\b/g, " kilogram").replace(/ g\b/g, " gram");

/* ------------------------------ Concrete: timbangan kodok dengan benda beremoji dan bandul ------------------------------ */
function Timbangan({ benda, set }: { benda: Benda; set: SetBandul }) {
  const ada = set.filter((n) => n > 0).length;
  const baris = Math.max(1, Math.ceil(ada / 2));
  const atas = 134 - baris * 28;
  return (
    <Gambar label="Timbangan kodok seimbang dengan benda dan bandul" judul="timbangan kodok seimbang: benda di kiri, bandul di kanan">
      <rect x={128} y={186} width={44} height={6} rx={3} fill="#92400E" />
      <rect x={147} y={40} width={6} height={148} fill="#B45309" />
      <line x1={50} y1={40} x2={250} y2={40} stroke="#92400E" strokeWidth={4} strokeLinecap="round" />
      <circle cx={150} cy={40} r={6} fill="#FBBF24" stroke="#92400E" strokeWidth={1.6} />
      <line x1={62} y1={40} x2={22} y2={142} stroke="#78350F" strokeWidth={1.2} />
      <line x1={62} y1={40} x2={102} y2={142} stroke="#78350F" strokeWidth={1.2} />
      <line x1={238} y1={40} x2={198} y2={142} stroke="#78350F" strokeWidth={1.2} />
      <line x1={238} y1={40} x2={278} y2={142} stroke="#78350F" strokeWidth={1.2} />
      <rect x={18} y={142} width={88} height={7} rx={3} fill="#D6A15E" stroke="#92400E" strokeWidth={1.2} />
      <rect x={194} y={142} width={88} height={7} rx={3} fill="#D6A15E" stroke="#92400E" strokeWidth={1.2} />
      {[0, 1, 2].map((i) => (
        <text key={i} x={40 + i * 22} y={136} textAnchor="middle" fontSize={21} aria-hidden="true">
          {EMOJI_BENDA[benda]}
        </text>
      ))}
      <GrupBandul set={set} x0={204} y0={atas} logam={EMAS} />
      <text x={62} y={166} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#92400E" aria-hidden="true">
        benda
      </text>
      <text x={238} y={166} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#92400E" aria-hidden="true">
        bandul
      </text>
    </Gambar>
  );
}

/* ------------------------------ Pictorial: bandul polos, layar, dua berat ------------------------------ */
function RakBandulPolos({ set }: { set: SetBandul }) {
  const ada = set.filter((n) => n > 0).length;
  const lebar = Math.min(ada, 3) * 40;
  return (
    <Gambar label="Bandul logam polos" judul="bandul logam polos bertulisan">
      <line x1={30} y1={150} x2={270} y2={150} stroke={UNGU} strokeWidth={3} strokeLinecap="round" />
      <GrupBandul set={set} x0={150 - lebar / 2} y0={70} logam={POLOS} kolom={3} lebarSel={40} />
      <text x={150} y={176} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU} aria-hidden="true">
        satu piring bandul
      </text>
    </Gambar>
  );
}
function LayarPolos({ teks, tanya }: { teks: string; tanya: string }) {
  return (
    <Gambar label="Layar timbangan polos" judul="layar timbangan polos menunjukkan berat">
      <rect x={50} y={36} width={200} height={70} rx={10} fill="#14532D" stroke="#166534" strokeWidth={3} />
      <rect x={58} y={44} width={184} height={54} rx={6} fill="#052E16" />
      <text x={150} y={82} textAnchor="middle" fontSize={26} fontWeight={900} fill="#BBF7D0">
        {teks}
      </text>
      <text x={150} y={134} textAnchor="middle" fontSize={9} fontWeight={900} fill="#475569" aria-hidden="true">
        berat pada layar
      </text>
      <text x={150} y={176} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
        {tanya}
      </text>
    </Gambar>
  );
}
/** Dua berat yang dicampur atau dikurangi: dua kartu dan tanda di tengah. `benda` hanya pada Concrete. */
function DuaBerat({ a, b, op, benda }: { a: string; b: string; op: LGabung["op"]; benda: Benda | null }) {
  const kartu = (x: number, teks: string) => (
    <g>
      <rect x={x} y={44} width={112} height={82} rx={10} fill={benda ? "#FEF3C7" : "#052E16"} stroke={benda ? "#92400E" : "#166534"} strokeWidth={2.4} />
      {benda ? (
        <text x={x + 56} y={74} textAnchor="middle" fontSize={20} aria-hidden="true">
          {`${EMOJI_BENDA[benda]}${EMOJI_BENDA[benda]}`}
        </text>
      ) : null}
      <text x={x + 56} y={benda ? 108 : 92} textAnchor="middle" fontSize={14} fontWeight={900} fill={benda ? UNGU : "#BBF7D0"}>
        {teks}
      </text>
    </g>
  );
  return (
    <Gambar label="Dua berat" judul={op === "tambah" ? "dua berat dicampur" : "berat semula dikurangi berat yang diambil"}>
      {kartu(14, a)}
      {kartu(174, b)}
      <text x={150} y={96} textAnchor="middle" fontSize={32} fontWeight={900} fill={UNGU}>
        {op === "tambah" ? "+" : "−"}
      </text>
      <text x={150} y={170} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
        = ?
      </text>
    </Gambar>
  );
}

/* ------------------------------ Tabel tempat angka ------------------------------ */
function TabelTempat({ l, benda, sembunyi }: { l: LTabel; benda: Benda | null; sembunyi: LTabel["kanvas"] | null }) {
  const kol = kolomTabel(l);
  const kepala = [
    ["kilogram", "ribuan g"],
    ["ratusan", "gram"],
    ["puluhan", "gram"],
    ["satuan", "gram"],
  ];
  const warna = ["#DBEAFE", "#DCFCE7", "#FEF9C3", "#FCE7F3"];
  const garis = [BIRU, HIJAU, "#A16207", "#BE185D"];
  const nomorSembunyi = sembunyi === "ratus" ? 1 : sembunyi === "puluh" ? 2 : sembunyi === "satuan" ? 3 : -1;
  return (
    <Gambar label="Tabel tempat angka" judul="tabel tempat angka: kilogram, ratusan, puluhan, satuan">
      {benda
        ? [0, 1, 2, 3, 4].map((i) => (
            <text key={i} x={90 + i * 30} y={40} textAnchor="middle" fontSize={17} aria-hidden="true">
              {EMOJI_BENDA[benda]}
            </text>
          ))
        : null}
      {kol.map((d, c) => {
        const x = 14 + c * 68;
        const tutup = c === nomorSembunyi;
        return (
          <g key={c}>
            <rect x={x} y={48} width={68} height={32} fill={warna[c]} stroke={garis[c]} strokeWidth={1.8} />
            <text x={x + 34} y={60} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={garis[c]}>
              {kepala[c][0]}
            </text>
            <text x={x + 34} y={74} textAnchor="middle" fontSize={7.6} fontWeight={900} fill={garis[c]} aria-hidden="true">
              {kepala[c][1]}
            </text>
            <rect x={x} y={80} width={68} height={50} fill="#FFFFFF" stroke={garis[c]} strokeWidth={1.8} strokeDasharray={tutup ? "4 3" : undefined} />
            <text x={x + 34} y={116} textAnchor="middle" fontSize={32} fontWeight={900} fill={tutup ? MERAH : UNGU}>
              {tutup ? "?" : d}
            </text>
          </g>
        );
      })}
      <text x={150} y={150} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU} aria-hidden="true">
        kolom kilogram mewakili ribuan gram
      </text>
      <text x={150} y={178} textAnchor="middle" fontSize={sembunyi ? 15 : 13} fontWeight={900} fill={sembunyi ? UNGU : MERAH}>
        {sembunyi ? `berat: ${fmtG(totalTabel(l))}` : "berat dalam gram: ?"}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Garis bilangan ganda ------------------------------ */
function GarisGanda({ l, benda }: { l: LGaris; benda: Benda | null }) {
  const t = totalGaris(l);
  const m = l.kg + 1;
  const s = 250 / m;
  const X = (kg: number): number => 25 + kg * s;
  const xt = X(t / 1000);
  const yA = 66;
  const yB = 140;
  const diberi = l.arah === "kg-g" ? fmtBerat(t) : fmtG(t);
  return (
    <Gambar label="Garis bilangan ganda" judul="garis atas kilogram, garis bawah gram">
      <text x={25} y={44} fontSize={8.6} fontWeight={900} fill={BIRU} aria-hidden="true">
        kilogram (kg)
      </text>
      <text x={25} y={120} fontSize={8.6} fontWeight={900} fill={HIJAU} aria-hidden="true">
        gram (g)
      </text>
      <line x1={X(0)} y1={yA} x2={X(m)} y2={yA} stroke={BIRU} strokeWidth={2.4} />
      <line x1={X(0)} y1={yB} x2={X(m)} y2={yB} stroke={HIJAU} strokeWidth={2.4} />
      {Array.from({ length: m + 1 }, (_, i) => (
        <g key={i}>
          <line x1={X(i)} y1={yA - 5} x2={X(i)} y2={yA + 5} stroke={BIRU} strokeWidth={1.8} />
          <text x={X(i)} y={yA + 16} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={BIRU}>
            {i}
          </text>
          <line x1={X(i)} y1={yB - 5} x2={X(i)} y2={yB + 5} stroke={HIJAU} strokeWidth={1.8} />
          <text x={X(i)} y={yB + 15} textAnchor="middle" fontSize={6.6} fontWeight={900} fill={HIJAU}>
            {ribuan(i * 1000)}
          </text>
        </g>
      ))}
      {l.setengah ? (
        <>
          <line x1={xt} y1={yA - 4} x2={xt} y2={yA + 4} stroke={BIRU} strokeWidth={1.4} />
          <line x1={xt} y1={yB - 4} x2={xt} y2={yB + 4} stroke={HIJAU} strokeWidth={1.4} />
        </>
      ) : null}
      <line x1={xt} y1={yA} x2={xt} y2={yB} stroke="#7C3AED" strokeWidth={1.6} strokeDasharray="4 3" />
      <circle cx={xt} cy={yA} r={4.6} fill={l.arah === "kg-g" ? "#F59E0B" : "#FFFFFF"} stroke={UNGU} strokeWidth={1.6} />
      <circle cx={xt} cy={yB} r={4.6} fill={l.arah === "kg-g" ? "#FFFFFF" : "#F59E0B"} stroke={UNGU} strokeWidth={1.6} />
      {benda ? (
        <text x={xt} y={38} textAnchor="middle" fontSize={16} aria-hidden="true">
          {EMOJI_BENDA[benda]}
        </text>
      ) : null}
      {l.arah === "kg-g" ? (
        <>
          <text x={xt} y={57} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
            {diberi}
          </text>
          <text x={xt} y={186} textAnchor="middle" fontSize={20} fontWeight={900} fill={MERAH}>
            ?
          </text>
        </>
      ) : (
        <>
          <text x={xt} y={57} textAnchor="middle" fontSize={16} fontWeight={900} fill={MERAH}>
            ?
          </text>
          <text x={xt} y={186} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
            {diberi}
          </text>
        </>
      )}
    </Gambar>
  );
}

/* ------------------------------ Pecah seribu-seribu ------------------------------ */
function Potongan({ l, benda }: { l: LPecah; benda: Benda | null }) {
  const { k, r } = potongan(l.total);
  const bw = Math.min(26, 258 / (k + 1)) - 2;
  const lebarSisa = r === 0 ? 0 : Math.max(12, bw * (r / 1000));
  const jumlah = k * (bw + 2) + (r === 0 ? 0 : lebarSisa + 2);
  const x0 = 150 - jumlah / 2;
  return (
    <Gambar label="Berat dipecah seribu-seribu" judul="berat dipecah menjadi potongan seribu gram dan sisanya">
      <text x={150} y={42} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
        {`berat seluruhnya: ${fmtG(l.total)}`}
      </text>
      {Array.from({ length: k }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (bw + 2)} y={58} width={bw} height={50} rx={3} fill="#BFDBFE" stroke={BIRU} strokeWidth={1.4} />
          <text x={x0 + i * (bw + 2) + bw / 2} y={benda ? 72 : 88} textAnchor="middle" fontSize={6.2} fontWeight={900} fill={UNGU}>
            {ribuan(1000)}
          </text>
          {benda ? (
            <text x={x0 + i * (bw + 2) + bw / 2} y={98} textAnchor="middle" fontSize={13} aria-hidden="true">
              {EMOJI_BENDA[benda]}
            </text>
          ) : null}
        </g>
      ))}
      {r > 0 ? (
        <g>
          <rect x={x0 + k * (bw + 2)} y={58} width={lebarSisa} height={50} rx={3} fill="#FDE68A" stroke="#B45309" strokeWidth={1.4} />
          <text x={x0 + k * (bw + 2) + lebarSisa / 2} y={125} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#92400E">
            {`${r} g`}
          </text>
        </g>
      ) : null}
      <text x={150} y={150} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU} aria-hidden="true">
        potongan seribu gram dan sisanya
      </text>
      <text x={150} y={184} textAnchor="middle" fontSize={18} fontWeight={900} fill={MERAH}>
        … kg … g
      </text>
    </Gambar>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, sorot }: { judul?: string; baris: string[]; sorot?: number }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b, i) => (
        <span key={b} className={`block text-sm font-bold leading-snug text-[#1C01A5] ${sorot === i ? "rounded bg-[#FEF08A] px-1 font-black underline" : ""}`}>
          {b}
        </span>
      ))}
    </div>
  );
}
const RekamMedis = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#B45309] bg-white p-2 font-mono">{children}</div>;
const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  ubah: "Mengubah satuan berat",
  gabung: "Jumlah dan kurang berat",
  bandul: "Bandul timbangan kodok",
  ons: "Kilogram, ons, dan gram",
  tabel: "Tabel tempat angka",
  garis: "Garis bilangan ganda",
  pecah: "Pecah seribu-seribu",
};

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function Dasar(props: PK & { l: Langkah }) {
  const d = dasarDari(props.l);
  const { rupa, cara } = props;
  if (rupa === "lambang")
    return (
      <RekamMedis>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d)} />
      </RekamMedis>
    );
  const b = rupa === "benda" ? d.benda : null;
  switch (d.tipe) {
    case "ubah": {
      const diberi = d.arah === "kg-g" ? fmtKg(d.kg, d.g) : fmtG(totalUbah(d));
      return rupa === "benda" ? (
        <div className="space-y-1.5">
          <Timbangan benda={d.benda} set={setDari(totalUbah(d))} />
          <Info>Berat benda: {diberi}</Info>
        </div>
      ) : (
        <LayarPolos teks={diberi} tanya={d.arah === "kg-g" ? "= … g" : "= … kg … g"} />
      );
    }
    case "gabung":
      return <DuaBerat a={fmtBerat(d.a)} b={fmtBerat(d.b)} op={d.op} benda={b} />;
    case "bandul":
      return rupa === "benda" ? (
        <div className="space-y-1.5">
          <Timbangan benda={d.benda} set={d.set} />
          <Info>Berat seluruh bandul: … g</Info>
        </div>
      ) : (
        <div className="space-y-1.5">
          <RakBandulPolos set={d.set} />
          <Info>Berat seluruh bandul: … g</Info>
        </div>
      );
    case "ons": {
      const set: SetBandul = d.arah === "kg-ons" ? [0, 0, 0, 0, d.n] : [0, d.n, 0, 0, 0];
      const tanya = d.arah === "kg-ons" ? "Banyak ons seluruhnya: …" : "Berat seluruhnya: … g";
      return rupa === "benda" ? (
        <div className="space-y-1.5">
          <Timbangan benda={d.benda} set={set} />
          <Info>{tanya}</Info>
        </div>
      ) : (
        <div className="space-y-1.5">
          <RakBandulPolos set={set} />
          <Info>{tanya}</Info>
        </div>
      );
    }
    case "tabel":
      return <TabelTempat l={d} benda={b} sembunyi={cara === "kanvas" ? d.kanvas : null} />;
    case "garis":
      return <GarisGanda l={d} benda={b} />;
    case "pecah":
      return <Potongan l={d} benda={b} />;
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
export function LangkahBandul({ ls, rupa, bicara, onBenar }: P) {
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
  /** Satu-satunya jalur memeriksa jawaban: `j` ukuran, kata, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : ucapUkuran(j));
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
            <JawabSuaraBandul kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
