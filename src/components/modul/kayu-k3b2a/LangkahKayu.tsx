"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  barisKartu,
  belumDiketahui,
  dasarDari,
  kalimatKunci,
  kalimatLambang,
  kalimatTanya,
  kunciJawab,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  puluhanBerikut,
  siapLangsung,
  ucapkan,
  type Cara,
  type LBagan,
  type LKal,
  type LKira,
  type LMaju,
  type LTimbang,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraKayu, PilihanKata, teksKunci } from "./JawabKayu";

/**
 * Satu tugas CPA Kelas 3 Bab 2 Sub-Bab A: metode IGIL (Kurangi Jumlah, Periksa Jumlahnya: kalimat Matematika dengan titik-titik di depan atau di tengah), Bar Model (Bagan Batang),
 * Counting On (Menghitung Maju di garis bilangan) dan Balance Scale (Timbangan Seimbang, juga banyak kemungkinan), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih bilangan atau pasangan, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji di tikar kemah (Concrete: kaleng sepuluh biskuit dan biskuit satuan),
 * bagan, garis bilangan, dan timbangan polos di peta kemah (Pictorial), kartu kata dan angka di papan pengumuman (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const C_TANYA = "#D97706";
const EMOJI_KALENG = "\u{1F96B}";
const EMOJI_BISKUIT = "\u{1F36A}";
const EMOJI_RANSEL = "\u{1F392}";
const EMOJI_TENDA = "\u{26FA}";
const EMOJI_APEL = "\u{1F34E}";

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

/* ------------------------------ Susunan benda: puluhan dan satuan ------------------------------ */
type Gaya = "benda" | "polos";
/** Satu baris benda untuk bilangan `n`: puluhan (kaleng sepuluh biskuit atau batang polos) lalu satuan (biskuit atau kotak polos). Pojok kiri x, garis dasar y. */
function Susun({ n, x, y, gaya }: { n: number; x: number; y: number; gaya: Gaya }) {
  const t = Math.floor(n / 10);
  const o = n % 10;
  const mulaiO = x + t * (gaya === "benda" ? 17 : 12) + (t > 0 ? 8 : 0);
  return (
    <g aria-hidden="true">
      {Array.from({ length: t }, (_, i) =>
        gaya === "benda" ? (
          <text key={`t${i}`} x={x + i * 17} y={y} fontSize={17}>
            {EMOJI_KALENG}
          </text>
        ) : (
          <rect key={`t${i}`} x={x + i * 12} y={y - 24} width={9} height={24} rx={1} fill="#BFDBFE" stroke="#1E3A8A" strokeWidth={1.2} />
        ),
      )}
      {Array.from({ length: o }, (_, i) =>
        gaya === "benda" ? (
          <text key={`o${i}`} x={mulaiO + i * 13} y={y} fontSize={13}>
            {EMOJI_BISKUIT}
          </text>
        ) : (
          <rect key={`o${i}`} x={mulaiO + i * 11} y={y - 8} width={8} height={8} rx={1} fill="#FECACA" stroke="#7F1D1D" strokeWidth={1.1} />
        ),
      )}
    </g>
  );
}
/** Kotak putus-putus tanda bilangan yang belum diketahui. */
function Tanya({ x, y, lebar = 120 }: { x: number; y: number; lebar?: number }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y - 24} width={lebar} height={26} rx={8} fill="#FEF3C7" stroke={C_TANYA} strokeWidth={2} strokeDasharray="5 3" />
      <text x={x + lebar / 2} y={y - 5} textAnchor="middle" fontSize={16} fontWeight={900} fill={C_TANYA}>
        ?
      </text>
    </g>
  );
}
function Legenda({ gaya }: { gaya: Gaya }) {
  const isi = gaya === "benda" ? [`${EMOJI_KALENG} kaleng = sepuluh biskuit`, `${EMOJI_BISKUIT} biskuit = satu`] : ["batang = sepuluh kotak", "kotak = satu"];
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Keterangan benda">
      {isi.map((t) => (
        <li key={t} className="rounded-full border-2 border-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 text-[11px] font-black text-[#9A3412]">
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, besar }: { judul?: string; baris: string[]; besar?: boolean }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#78350F] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b, i) => (
        <span key={b} className={`block font-bold leading-snug text-[#1C01A5] ${besar && i === 0 ? "py-1 text-center text-2xl font-black" : "text-sm"}`}>
          {b}
        </span>
      ))}
    </div>
  );
}
const PapanInfo = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#A16207] bg-[#FFFBEB] p-2 font-mono">{children}</div>;

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function TampilKal({ l, rupa, cara }: { l: LKal; rupa: Rupa; cara: Cara }) {
  const periksa = cara === "suara" && l.tanya === "periksa";
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={periksa ? "Periksa dengan menjumlahkan" : "Kalimat Matematika"} baris={barisKartu(l, cara)} besar />
      </PapanInfo>
    );
  const gaya: Gaya = rupa === "benda" ? "benda" : "polos";
  const u = belumDiketahui(l);
  const baris = periksa
    ? [
        { n: l.a, tanya: false, label: `${l.a}` },
        { n: u, tanya: false, label: `${u}` },
        { n: -1, tanya: true, label: "jumlah?" },
      ]
    : l.depan
      ? [
          { n: -1, tanya: true, label: "belum diketahui" },
          { n: l.a, tanya: false, label: `${l.a}` },
          { n: l.c, tanya: false, label: `${l.c}` },
        ]
      : [
          { n: l.a, tanya: false, label: `${l.a}` },
          { n: -1, tanya: true, label: "belum diketahui" },
          { n: l.c, tanya: false, label: `${l.c}` },
        ];
  const nama = periksa ? ["bagian diketahui", "bilangan ditemukan", "jumlah semuanya"] : l.depan ? ["bagian pertama", "bagian kedua", "jumlah semuanya"] : ["bagian pertama", "bagian kedua", "jumlah semuanya"];
  const ys = [50, 96, 142];
  return (
    <div className="space-y-2">
      <Gambar label="Kalimat Matematika dengan benda" judul={periksa ? "jumlahkan, lalu periksa" : "kalimat Matematika dengan titik-titik"}>
        {baris.map((b, i) => (
          <g key={i}>
            <text x={8} y={ys[i] - 26} fontSize={8.6} fontWeight={800} fill="#78350F">
              {nama[i]}
              {b.tanya ? "" : `: ${b.label}`}
            </text>
            {b.tanya ? <Tanya x={8} y={ys[i]} /> : <Susun n={b.n} x={8} y={ys[i]} gaya={gaya} />}
          </g>
        ))}
        <text x={150} y={188} textAnchor="middle" fontSize={20} fontWeight={900} fill={UNGU}>
          {periksa ? `${l.a} + ${u} = ?` : kalimatLambang(l)}
        </text>
      </Gambar>
      <Legenda gaya={gaya} />
    </div>
  );
}

function TampilBagan({ l, rupa, cara }: { l: LBagan; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Bagan jumlah dan bagian" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const benda = rupa === "benda";
  const sorot = cara === "suara" ? (l.sorot ?? "total") : null;
  const X0 = 20;
  const LEB = 260;
  const wBag = (LEB * l.bagian) / l.total;
  const warna = benda ? { total: "#FDBA74", bagian: "#86EFAC", tanya: "#FEF08A" } : { total: "#CBD5E1", bagian: "#BFDBFE", tanya: "#FFFFFF" };
  const garisTebal = (b: "total" | "bagian") => (sorot === b ? 4.5 : 1.8);
  return (
    <div className="space-y-2">
      <Gambar label="Bagan batang jumlah dan bagian" judul="batang atas jumlah, batang bawah bagian">
        <text x={X0} y={40} fontSize={9} fontWeight={800} fill="#78350F">
          {sorot === "total" ? "batang ini disebut apa?" : "jumlah semuanya"}
        </text>
        <rect x={X0} y={46} width={LEB} height={32} rx={4} fill={warna.total} stroke={sorot === "total" ? "#DC2626" : UNGU} strokeWidth={garisTebal("total")} />
        <text x={X0 + LEB / 2} y={68} textAnchor="middle" fontSize={17} fontWeight={900} fill={UNGU}>
          {benda ? `${EMOJI_RANSEL} ` : ""}
          {l.total}
        </text>
        <text x={X0} y={102} fontSize={9} fontWeight={800} fill="#78350F">
          {sorot === "bagian" ? "batang ini disebut apa?" : "bagian"}
        </text>
        <rect x={X0} y={108} width={wBag} height={32} rx={4} fill={warna.bagian} stroke={sorot === "bagian" ? "#DC2626" : UNGU} strokeWidth={garisTebal("bagian")} />
        <text x={X0 + wBag / 2} y={130} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
          {benda ? `${EMOJI_APEL} ` : ""}
          {l.bagian}
        </text>
        <rect x={X0 + wBag} y={108} width={LEB - wBag} height={32} rx={4} fill={warna.tanya} stroke={C_TANYA} strokeWidth={2.4} strokeDasharray="5 3" />
        <text x={X0 + wBag + (LEB - wBag) / 2} y={130} textAnchor="middle" fontSize={17} fontWeight={900} fill={C_TANYA}>
          ?
        </text>
        {Array.from({ length: Math.floor(l.total / 10) - 1 }, (_, i) => (
          <line key={i} x1={X0 + (LEB * (i + 1) * 10) / l.total} y1={78} x2={X0 + (LEB * (i + 1) * 10) / l.total} y2={46} stroke="#64748B" strokeWidth={0.7} strokeDasharray="2 2" />
        ))}
        <text x={150} y={170} textAnchor="middle" fontSize={10} fontWeight={800} fill="#475569">
          {cara === "suara" ? "baca batang yang disorot" : "bagian lain belum diketahui"}
        </text>
      </Gambar>
    </div>
  );
}

function TampilMaju({ l, rupa, cara }: { l: LMaju; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul="Menghitung maju" baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const benda = rupa === "benda";
  const kiri = Math.floor(l.dari / 10) * 10;
  const kanan = Math.ceil(l.ke / 10) * 10;
  const px = (v: number): number => 22 + (256 * (v - kiri)) / (kanan - kiri);
  const puluhan: number[] = [];
  for (let v = kiri; v <= kanan; v += 10) puluhan.push(v);
  const y = 120;
  const p1 = puluhanBerikut(l.dari);
  const p2 = Math.floor(l.ke / 10) * 10;
  const lompat: [number, number][] = [[l.dari, Math.min(p1, l.ke)]];
  if (p2 > p1) lompat.push([p1, p2]);
  if (l.ke > p2 && p1 <= p2) lompat.push([p2, l.ke]);
  const busur = (a: number, b: number, tinggi: number) => `M${px(a)} ${y} Q${(px(a) + px(b)) / 2} ${y - tinggi} ${px(b)} ${y}`;
  return (
    <div className="space-y-2">
      <Gambar label="Garis bilangan dengan lompatan" judul={cara === "kanvas" ? "lompat dulu ke puluhan terdekat" : "lompat maju dari bilangan awal"}>
        <line x1={14} y1={y} x2={286} y2={y} stroke={UNGU} strokeWidth={2.2} />
        {puluhan.map((v) => (
          <g key={v}>
            <line x1={px(v)} y1={y - 5} x2={px(v)} y2={y + 5} stroke={UNGU} strokeWidth={1.6} />
            <text x={px(v)} y={y + 17} textAnchor="middle" fontSize={8.5} fill="#64748B">
              {v}
            </text>
          </g>
        ))}
        {lompat.map(([a, b], i) => (
          <g key={i}>
            <path d={busur(a, b, 38 - i * 4)} fill="none" stroke={i === 0 && cara === "kanvas" ? "#DC2626" : "#EA580C"} strokeWidth={i === 0 && cara === "kanvas" ? 3.6 : 2.4} />
            <circle cx={px(b)} cy={y} r={2.6} fill="#EA580C" />
          </g>
        ))}
        <circle cx={px(l.dari)} cy={y} r={5} fill="#16A34A" stroke={UNGU} strokeWidth={1.6} />
        <circle cx={px(l.ke)} cy={y} r={5} fill="#DC2626" stroke={UNGU} strokeWidth={1.6} />
        <text x={px(l.dari)} y={y + 36} textAnchor="middle" fontSize={13} fontWeight={900} fill="#166534">
          {l.dari}
        </text>
        <text x={px(l.ke)} y={y + 36} textAnchor="middle" fontSize={13} fontWeight={900} fill="#991B1B">
          {l.ke}
        </text>
        {benda ? (
          <>
            <text x={px(l.dari)} y={y - 44} textAnchor="middle" fontSize={20}>
              {EMOJI_RANSEL}
            </text>
            <text x={px(l.ke)} y={y - 44} textAnchor="middle" fontSize={20}>
              {EMOJI_TENDA}
            </text>
          </>
        ) : null}
        <text x={150} y={52} textAnchor="middle" fontSize={20} fontWeight={900} fill={C_TANYA}>
          {cara === "kanvas" ? "lompatan pertama = ?" : "seluruhnya = ?"}
        </text>
        <text x={150} y={190} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#475569">
          mulai {l.dari}, sampai {l.ke}
        </text>
      </Gambar>
    </div>
  );
}

function Piring({ x, y, lebar, isi }: { x: number; y: number; lebar: number; isi: React.ReactNode }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={lebar} height={6} rx={3} fill="#CBD5E1" stroke={UNGU} strokeWidth={1.4} />
      {isi}
    </g>
  );
}
function BlokAngka({ x, y, w, teks, warna, emoji, tanya }: { x: number; y: number; w: number; teks: string; warna: string; emoji?: string; tanya?: boolean }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y - 30} width={w} height={30} rx={5} fill={warna} stroke={tanya ? C_TANYA : UNGU} strokeWidth={tanya ? 2.4 : 1.6} strokeDasharray={tanya ? "5 3" : undefined} />
      <text x={x + w / 2} y={y - 10} textAnchor="middle" fontSize={15} fontWeight={900} fill={tanya ? C_TANYA : UNGU}>
        {emoji ? `${emoji} ` : ""}
        {teks}
      </text>
    </g>
  );
}
function TampilTimbang({ l, rupa, cara }: { l: LTimbang | LKira; rupa: Rupa; cara: Cara }) {
  const kira = l.tipe === "kira";
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={kira ? "Banyak kemungkinan" : "Timbangan seimbang"} baris={barisKartu(l, cara)} />
      </PapanInfo>
    );
  const benda = rupa === "benda";
  const kanan = kira ? l.jumlah : l.c;
  const w1 = benda ? "#FDBA74" : "#BFDBFE";
  const w2 = benda ? "#86EFAC" : "#E2E8F0";
  return (
    <div className="space-y-2">
      <Gambar label="Timbangan seimbang" judul={kira ? "banyak kemungkinan di sisi kiri" : "kedua sisi harus sama"}>
        <rect x={146} y={52} width={8} height={110} rx={2} fill="#B7814A" stroke="#6B4423" strokeWidth={1.2} />
        <rect x={110} y={156} width={80} height={8} rx={3} fill="#B7814A" stroke="#6B4423" strokeWidth={1.2} />
        <rect x={34} y={48} width={232} height={7} rx={3} fill="#D6A15E" stroke="#6B4423" strokeWidth={1.4} />
        <text x={150} y={42} textAnchor="middle" fontSize={16} fontWeight={900} fill="#DC2626">
          =
        </text>
        <line x1={52} y1={55} x2={52} y2={118} stroke={UNGU} strokeWidth={1} />
        <line x1={118} y1={55} x2={118} y2={118} stroke={UNGU} strokeWidth={1} />
        <line x1={182} y1={55} x2={182} y2={118} stroke={UNGU} strokeWidth={1} />
        <line x1={248} y1={55} x2={248} y2={118} stroke={UNGU} strokeWidth={1} />
        <Piring
          x={40}
          y={118}
          lebar={90}
          isi={
            kira ? (
              <>
                <BlokAngka x={44} y={118} w={38} teks="?" warna="#FEF3C7" tanya />
                <BlokAngka x={88} y={118} w={38} teks="?" warna="#FEF3C7" tanya />
              </>
            ) : (
              <>
                <BlokAngka x={44} y={118} w={38} teks={`${l.a}`} warna={w1} emoji={benda ? EMOJI_KALENG : undefined} />
                <BlokAngka x={88} y={118} w={38} teks="?" warna="#FEF3C7" tanya />
              </>
            )
          }
        />
        <Piring x={170} y={118} lebar={90} isi={<BlokAngka x={190} y={118} w={50} teks={`${kanan}`} warna={w2} emoji={benda ? EMOJI_RANSEL : undefined} />} />
        <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {kira ? `? + ? = ${kanan}` : `${l.a} + … = ${kanan}`}
        </text>
      </Gambar>
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  switch (l.tipe) {
    case "kal":
      return <TampilKal l={l} rupa={props.rupa} cara={props.cara} />;
    case "bagan":
      return <TampilBagan l={l} rupa={props.rupa} cara={props.cara} />;
    case "maju":
      return <TampilMaju l={l} rupa={props.rupa} cara={props.cara} />;
    case "timbang":
    case "kira":
      return <TampilTimbang l={l} rupa={props.rupa} cara={props.cara} />;
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
export function LangkahKayu({ ls, rupa, bicara, onBenar }: P) {
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata, bilangan, atau pasangan yang dipilih atau diucapkan, atau angka yang ditulis. */
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
            <JawabSuaraKayu kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
