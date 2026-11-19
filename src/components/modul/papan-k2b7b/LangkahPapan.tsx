"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  barisTurun,
  bentukKartu,
  dasarDari,
  hasilGaris,
  jendelaTali,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  namaKunci,
  petunjukKartu,
  petunjukKetuk,
  petunjukSalah,
  petunjukUrut,
  pilihanAngka,
  pilihanGaris,
  pilihanNamaDari,
  puluhanDari,
  puluhanKartu,
  satuanDari,
  siapLangsung,
  tengahAntara,
  urutanBenar,
  urutanKartu,
  type Cara,
  type Klaim,
  type LAntara,
  type LBanding,
  type LGaris,
  type LKartu,
  type LTurun,
  type LUrut,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Nama,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, angkaDariUcapan } from "./periksa";
import { JawabSuaraPapan, PilihanKata, teksKunci } from "./JawabPapan";

/**
 * Satu tugas CPA Kelas 2 Bab 7 Sub-Bab B: membandingkan dan mengurutkan bilangan sampai seratus. Jenis tugas: angka di tempat puluhan atau satuan, membandingkan dua bilangan,
 * memilih kata, kepik di tali (maju dan mundur), banyak langkah, tabel seratus, bilangan di antara, patokan, mengurutkan kartu, kartu angka, teka-teki, dan Cari kesalahan
 * (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: ikatan botol dan benda gudang beremoji (Concrete), batang puluhan, kotak satuan, garis bilangan, dan tabel polos tanpa emoji (Pictorial), kartu kata dan lambang saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";

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

/* ------------------------------ Gambar bilangan: papan, tali, tabel seratus ------------------------------ */
/**
 * Papan bilangan `n` pada (x, y) selebar w: puluhan sebagai ikatan (kotak bertali) dan satuan sebagai benda lepas.
 * Benda (Concrete): ikatan botol dan kaleng lepas beremoji. Diagram (Pictorial): batang puluhan dan kotak satuan polos, tanpa emoji.
 */
export function Papan({ n, x, y, w, rupa, angka = true, tanya }: { n: number; x: number; y: number; w: number; rupa: Rupa; angka?: boolean; tanya?: boolean }) {
  const benda = rupa === "benda";
  const p = puluhanDari(n);
  const s = satuanDari(n);
  const bw = Math.min(14, (w - 10) / 9.6);
  return (
    <g>
      <rect x={x} y={y} width={w} height={76} rx={6} fill={benda ? "#FEF3C7" : "#FFFFFF"} stroke={benda ? COKLAT : UNGU} strokeWidth={3} />
      {angka ? (
        <text x={x + w / 2} y={y + 16} textAnchor="middle" fontSize={15} fontWeight={900} fill={UNGU}>
          {tanya ? "?" : n}
        </text>
      ) : null}
      {Array.from({ length: p }, (_, i) => (
        <g key={`p${i}`}>
          <rect x={x + 6 + i * (bw + 1.4)} y={y + 24} width={bw} height={24} rx={2} fill={benda ? "#BBF7D0" : "#E0E7FF"} stroke={benda ? HIJAU : UNGU} strokeWidth={1.4} />
          {benda ? (
            <text x={x + 6 + i * (bw + 1.4) + bw / 2} y={y + 40} textAnchor="middle" fontSize={bw * 0.85} aria-hidden="true">
              {"\u{1F37E}"}
            </text>
          ) : (
            <line x1={x + 6 + i * (bw + 1.4)} y1={y + 36} x2={x + 6 + i * (bw + 1.4) + bw} y2={y + 36} stroke={UNGU} strokeWidth={1} />
          )}
          <line x1={x + 6 + i * (bw + 1.4)} y1={y + 36} x2={x + 6 + i * (bw + 1.4) + bw} y2={y + 36} stroke={benda ? COKLAT : UNGU} strokeWidth={1.6} />
        </g>
      ))}
      {Array.from({ length: s }, (_, i) =>
        benda ? (
          <text key={`s${i}`} x={x + 8 + i * 13} y={y + 70} fontSize={12} aria-hidden="true">
            {"\u{1F96B}"}
          </text>
        ) : (
          <rect key={`s${i}`} x={x + 8 + i * 13} y={y + 58} width={9} height={9} fill="#E0E7FF" stroke={UNGU} strokeWidth={1.3} />
        ),
      )}
    </g>
  );
}

/** Dua papan bilangan berdampingan, dengan tanda tanya di tengah bila `tanya`. */
function DuaPapan({ a, b, rupa, tanya, angka = true }: { a: number; b: number; rupa: Rupa; tanya?: boolean; angka?: boolean }) {
  return (
    <Gambar label="Dua papan bilangan" judul={rupa === "benda" ? "dua papan di gudang" : "dua papan bilangan"}>
      <Papan n={a} x={6} y={50} w={130} rupa={rupa} angka={angka} />
      <Papan n={b} x={164} y={50} w={130} rupa={rupa} angka={angka} />
      {tanya ? (
        <text x={150} y={98} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
          ?
        </text>
      ) : null}
    </Gambar>
  );
}

/**
 * Tali garis angka dari bilangan `dari` sampai `sampai`. Benda: tali jemuran dengan penjepit berangka dan kepik beremoji. Diagram: garis bilangan polos dengan titik.
 * `kepik`: bilangan tempat kepik, `tanda`: bilangan yang diberi bendera, `kosong`: bilangan tanpa penjepit (diberi tanda tanya).
 */
export function Tali({ dari, sampai, rupa, kepik, tanda, kosong, penanda = "\u{1F41E}" }: { dari: number; sampai: number; rupa: Rupa; kepik?: number; tanda?: number; kosong?: number; penanda?: string }) {
  const benda = rupa === "benda";
  const banyak = sampai - dari;
  const x = (n: number) => 22 + ((n - dari) * 256) / banyak;
  const daftar = Array.from({ length: banyak + 1 }, (_, i) => dari + i);
  const y = 100;
  return (
    <g>
      {benda ? <line x1={10} y1={y} x2={290} y2={y} stroke={COKLAT} strokeWidth={2.4} /> : <line x1={10} y1={y} x2={290} y2={y} stroke={UNGU} strokeWidth={2.2} />}
      {daftar.map((n) => (
        <g key={n}>
          {n === kosong ? (
            <text x={x(n)} y={y + 28} textAnchor="middle" fontSize={16} fontWeight={900} fill={MERAH}>
              ?
            </text>
          ) : (
            <>
              {benda ? <rect x={x(n) - 4} y={y - 1} width={8} height={13} rx={1.5} fill={["#EF4444", "#FACC15", "#22C55E", "#3B82F6"][n % 4]} stroke={UNGU} strokeWidth={1} /> : <line x1={x(n)} y1={y - 5} x2={x(n)} y2={y + 5} stroke={UNGU} strokeWidth={1.6} />}
              <text x={x(n)} y={y + 28} textAnchor="middle" fontSize={banyak > 9 ? 8.5 : 10} fontWeight={900} fill={UNGU}>
                {n}
              </text>
            </>
          )}
        </g>
      ))}
      {kepik !== undefined ? (
        benda ? (
          <text x={x(kepik)} y={y - 8} textAnchor="middle" fontSize={20} aria-hidden="true">
            {penanda}
          </text>
        ) : (
          <circle cx={x(kepik)} cy={y} r={5.5} fill={MERAH} stroke={UNGU} strokeWidth={1.4} />
        )
      ) : null}
      {tanda !== undefined ? (
        benda ? (
          <text x={x(tanda)} y={y - 10} textAnchor="middle" fontSize={20} aria-hidden="true">
            {"\u{1F6A9}"}
          </text>
        ) : (
          <polygon points={`${x(tanda)},${y - 22} ${x(tanda) - 6},${y - 10} ${x(tanda) + 6},${y - 10}`} fill={HIJAU} stroke={UNGU} strokeWidth={1.2} />
        )
      ) : null}
    </g>
  );
}

/**
 * Tabel seratus polos: baris yang memuat bilangan `awal` dan `tujuan` (kotak ditandai). `onKetuk` membuat kotak bisa diketuk.
 * Benda: kotak berwarna dengan emoji kepik di kotak awal. Diagram: kotak putih tanpa emoji.
 */
export function Tabel100({ awal, tujuan, rupa, onKetuk, mati = [], benar }: { awal: number; tujuan: number; rupa: Rupa; onKetuk?: (n: number) => void; mati?: number[]; benar?: number | null }) {
  const baris0 = Math.floor((Math.min(awal, tujuan) - 1) / 10);
  const baris1 = Math.floor((Math.max(awal, tujuan) - 1) / 10);
  const cw = 26;
  const ch = Math.min(19, 150 / (baris1 - baris0 + 1));
  const benda = rupa === "benda";
  const sel: number[] = [];
  for (let b = baris0; b <= baris1; b += 1) for (let k = 1; k <= 10; k += 1) sel.push(b * 10 + k);
  return (
    <g>
      {sel.map((n) => {
        const b = Math.floor((n - 1) / 10) - baris0;
        const k = (n - 1) % 10;
        const cx = 20 + k * cw;
        const cy = 26 + b * ch;
        const mulai = n === awal;
        const akhir = !onKetuk && n === tujuan;
        const dapat = benar === n;
        const isi = dapat ? "#BBF7D0" : mulai ? "#FDE047" : akhir ? "#FECACA" : mati.includes(n) ? "#E5E7EB" : benda ? "#FEF9C3" : "#FFFFFF";
        return (
          <g key={n} onClick={onKetuk && !mati.includes(n) && benar == null ? () => onKetuk(n) : undefined} style={onKetuk ? { cursor: "pointer" } : undefined} role={onKetuk ? "button" : undefined} aria-label={onKetuk ? `kotak ${n}` : undefined}>
            <rect x={cx} y={cy} width={cw} height={ch} fill={isi} stroke={mulai || akhir ? UNGU : "#94A3B8"} strokeWidth={mulai || akhir ? 2 : 0.8} />
            <text x={cx + cw / 2} y={cy + ch / 2 + 3} textAnchor="middle" fontSize={8.6} fontWeight={800} fill={UNGU}>
              {n}
            </text>
            {benda && mulai ? (
              <text x={cx + cw - 3} y={cy + 8} textAnchor="end" fontSize={8} aria-hidden="true">
                {"\u{1F41E}"}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Gambar untuk tugas yang dijawab di bawah gambar ------------------------------ */
function KartuTeka({ mulai, arah, k, rupa }: { mulai: number; arah: "lebih" | "kurang"; k: number; rupa: Rupa }) {
  const kalimat = `Aku ${k} ${arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${mulai}`;
  if (rupa === "benda")
    return (
      <div className="mx-auto flex w-full max-w-[420px] items-center gap-2 rounded-2xl border-4 border-[#92400E] bg-[#FEF3C7] p-3" role="img" aria-label="Teka-teki">
        <span className="text-3xl" aria-hidden="true">
          {"\u{1F9E2}"}
        </span>
        <p className="text-lg font-black text-[#78350F]">{kalimat}. Bilangan apa aku?</p>
      </div>
    );
  return <KartuLambang judul="teka-teki bilangan" baris={[kalimat, "bilangan apa aku?"]} />;
}

function GambarTugas({ l, rupa }: { l: Exclude<ReturnType<typeof dasarDari>, null>; rupa: Rupa }) {
  switch (l.tipe) {
    case "tempat":
      return rupa === "lambang" ? (
        <KartuLambang judul="kartu bilangan" baris={[String(l.n), `angka di tempat ${l.tanya} = ?`]} />
      ) : (
        <Gambar label="Papan bilangan" judul={rupa === "benda" ? "ikatan botol dan botol lepas" : "batang puluhan dan kotak satuan"}>
          <Papan n={l.n} x={70} y={46} w={160} rupa={rupa} angka={false} />
          <text x={150} y={150} textAnchor="middle" fontSize={11} fontWeight={800} fill={UNGU}>
            {l.tanya === "puluhan" ? "ikat atau batang = puluhan" : "yang lepas = satuan"}
          </text>
        </Gambar>
      );
    case "banding":
      return rupa === "lambang" ? <KartuLambang judul="dua bilangan" baris={[`pertama: ${l.a}`, `kedua: ${l.b}`]} /> : <DuaPapan a={l.a} b={l.b} rupa={rupa} />;
    case "tanda":
      return rupa === "lambang" ? <KartuLambang judul="dua bilangan" baris={[`${l.a}  ?  ${l.b}`]} /> : <DuaPapan a={l.a} b={l.b} rupa={rupa} tanya />;
    case "langkah": {
      if (rupa === "lambang") return <KartuLambang judul="kepik pindah" baris={[`dari ${l.dari}`, `ke ${l.ke}`, "banyak langkah = ?"]} />;
      const j = jendelaTali(l);
      return (
        <Gambar label="Kepik di tali" judul={rupa === "benda" ? "kepik pindah di tali jemuran" : "titik pindah di garis bilangan"}>
          <Tali dari={j.dari} sampai={j.sampai} rupa={rupa} kepik={l.dari} tanda={l.ke} />
          <text x={150} y={150} textAnchor="middle" fontSize={10} fontWeight={800} fill={UNGU}>
            mulai di {l.dari}, bendera di {l.ke}
          </text>
        </Gambar>
      );
    }
    case "rank":
      return <BarisBilangan item={l.item} sasaran={l.sasaran} rupa={rupa} />;
    case "kartu":
      return <KartuAngka l={l} rupa={rupa} />;
    case "patokan":
      return rupa === "lambang" ? (
        <KartuLambang judul="bilangan dan patokan" baris={[`bilangan: ${l.n}`, `patokan: ${l.patokan}`]} />
      ) : (
        <Gambar label="Bilangan dan patokan" judul={`bandingkan dengan patokan ${l.patokan}`}>
          <Papan n={l.n} x={30} y={50} w={130} rupa={rupa} />
          <rect x={186} y={64} width={86} height={46} rx={8} fill={rupa === "benda" ? "#FEF9C3" : "#FFFFFF"} stroke={UNGU} strokeWidth={2.4} />
          <text x={229} y={82} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
            patokan
          </text>
          <text x={229} y={102} textAnchor="middle" fontSize={17} fontWeight={900} fill={MERAH}>
            {l.patokan}
          </text>
          {rupa === "benda" ? (
            <text x={262} y={64} fontSize={16} aria-hidden="true">
              {"\u{1F6A9}"}
            </text>
          ) : null}
        </Gambar>
      );
    case "turun":
      return rupa === "lambang" ? (
        <KartuLambang judul="tabel seratus" baris={[`kotak awal: ${l.dari}`, `kotak tujuan: ${l.ke}`, "baris turun = ?"]} />
      ) : (
        <Gambar label="Tabel seratus" judul="tabel seratus: kotak awal kuning, kotak tujuan merah">
          <Tabel100 awal={l.dari} tujuan={l.ke} rupa={rupa} />
        </Gambar>
      );
    case "teka":
      return <KartuTeka mulai={l.mulai} arah={l.arah} k={l.k} rupa={rupa} />;
    default:
      return null;
  }
}

/** Deretan bilangan tidak berurutan; bilangan sasaran bertanda tanya. */
function BarisBilangan({ item, sasaran, rupa }: { item: readonly number[]; sasaran: number; rupa: Rupa }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-[#7C3AED] bg-white/90 p-2" role="img" aria-label="Deretan bilangan">
      <div className="flex flex-wrap justify-center gap-1.5">
        {item.map((n, i) => (
          <span key={n} className={`rounded-xl border-2 px-3 py-2 text-xl font-black ${i === sasaran ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#7C3AED] bg-[#F5F3FF] text-[#4C1D95]"}`}>
            {rupa === "benda" ? "\u{1F37E} " : ""}
            {i === sasaran ? "? " : ""}
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Dua kartu angka dan dua tempat (puluhan, satuan) yang masih kosong. */
function KartuAngka({ l, rupa }: { l: LKartu; rupa: Rupa }) {
  const benda = rupa === "benda";
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-[#7C3AED] bg-white/90 p-2" role="img" aria-label="Dua kartu angka">
      <p className="mb-1 text-center text-xs font-black text-[#6D28D9]">dua kartu angka</p>
      <div className="flex justify-center gap-3">
        {[l.a, l.b].map((n) => (
          <span key={n} className={`rounded-xl border-4 px-5 py-2 text-3xl font-black ${benda ? "border-[#92400E] bg-[#FEF3C7] text-[#78350F]" : "border-[#7C3AED] bg-[#F5F3FF] text-[#4C1D95]"}`}>
            {n}
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-3 text-sm font-black text-[#1C01A5]">
        <span className="rounded-lg border-2 border-dashed border-[#1C01A5] px-4 py-1">puluhan: ?</span>
        <span className="rounded-lg border-2 border-dashed border-[#DC2626] px-4 py-1">satuan: ?</span>
      </div>
    </div>
  );
}

/* ------------------------------ Tugas dengan kegiatan ------------------------------ */
/** Ketuk bilangan yang paling besar atau kecil dari dua bilangan. */
function KetukBanding({ l, rupa, salah, siap }: PK & { l: LBanding }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const benar = l.cari === "besar" ? Math.max(l.a, l.b) : Math.min(l.a, l.b);
  const ketuk = (n: number) => {
    if (dapat !== null || mati.includes(n)) return;
    if (n === benar) {
      setDapat(n);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, n]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? <KartuLambang judul="dua bilangan" baris={[`pertama: ${l.a}`, `kedua: ${l.b}`]} /> : <DuaPapan a={l.a} b={l.b} rupa={rupa} angka={false} />}
      <div className="grid grid-cols-2 gap-2" role="group" aria-label={`Ketuk bilangan yang paling ${l.cari}`}>
        {[l.a, l.b].map((n) => (
          <button key={n} type="button" disabled={mati.includes(n)} onClick={() => ketuk(n)} className={`min-h-[56px] rounded-2xl border-4 px-2 text-2xl font-black disabled:opacity-35 ${dapat === n ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Kepik di tali bergerak beberapa langkah; ketuk bilangan tempat berhenti. */
function Garis({ l, rupa, salah, siap }: PK & { l: LGaris }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const hasil = hasilGaris(l);
  const pilihan = pilihanGaris(l);
  const j = jendelaTali(l);
  const ketuk = (n: number) => {
    if (dapat !== null || mati.includes(n)) return;
    if (n === hasil) {
      setDapat(n);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, n]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <KartuLambang judul="kartu kepik" baris={[`mulai di ${l.dari}`, `${l.arah} ${l.langkah} langkah`, "berhenti di = ?"]} />
      ) : (
        <Gambar label="Kepik di tali" judul={rupa === "benda" ? `kepik ${l.arah} ${l.langkah} langkah` : `titik ${l.arah} ${l.langkah} langkah`}>
          <Tali dari={j.dari} sampai={j.sampai} rupa={rupa} kepik={l.dari} />
        </Gambar>
      )}
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Ketuk bilangan tempat berhenti">
        {pilihan.map((n) => (
          <button key={n} type="button" disabled={mati.includes(n)} onClick={() => ketuk(n)} className={`min-h-[52px] min-w-[72px] rounded-2xl border-4 px-3 text-xl font-black disabled:opacity-35 ${dapat === n ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Bilangan di antara dua penjepit. */
function Antara({ l, rupa, salah, siap }: PK & { l: LAntara }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const j = jendelaTali(l);
  const tengah = tengahAntara(l);
  const ketuk = (n: number) => {
    if (dapat !== null || mati.includes(n)) return;
    if (n === tengah) {
      setDapat(n);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, n]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <KartuLambang judul="dua bilangan" baris={[`${l.kiri}  ?  ${l.kanan}`]} />
      ) : (
        <Gambar label="Dua penjepit di tali" judul={rupa === "benda" ? "satu penjepit hilang di tali jemuran" : "satu bilangan hilang di garis"}>
          <Tali dari={j.dari} sampai={j.sampai} rupa={rupa} kosong={tengah} />
        </Gambar>
      )}
      <div className="grid grid-cols-4 gap-2" role="group" aria-label="Ketuk bilangan di antara">
        {l.pilihan.map((n) => (
          <button key={n} type="button" disabled={mati.includes(n)} onClick={() => ketuk(n)} className={`min-h-[52px] rounded-2xl border-4 px-1 text-xl font-black disabled:opacity-35 ${dapat === n ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Tabel seratus: ketuk kotak tempat berhenti setelah turun beberapa baris. */
function TurunKlik({ l, rupa, salah, siap }: PK & { l: LTurun }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const ketuk = (n: number) => {
    if (dapat !== null || mati.includes(n)) return;
    if (n === l.ke) {
      setDapat(n);
      siap(kalimatKunci(l, "klik", rupa));
    } else {
      setMati((m) => [...m, n]);
      salah(petunjukKetuk(l));
    }
  };
  if (rupa === "lambang")
    return (
      <div className="space-y-2">
        <KartuLambang judul="tabel seratus" baris={[`kotak awal: ${l.dari}`, `turun ${barisTurun(l)} baris`, "kotak tujuan = ?"]} />
        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Ketuk kotak tujuan">
          {[l.ke, l.ke - 10, l.ke + 10, l.ke + 1].sort((a, b) => a - b).map((n) => (
            <button key={n} type="button" disabled={mati.includes(n)} onClick={() => ketuk(n)} className={`min-h-[52px] rounded-2xl border-4 px-1 text-xl font-black disabled:opacity-35 ${dapat === n ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}>
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  return (
    <Gambar label="Tabel seratus" judul="ketuk kotak tempat berhenti (awal kuning)">
      <Tabel100 awal={l.dari} tujuan={l.ke} rupa={rupa} onKetuk={ketuk} mati={mati} benar={dapat} />
    </Gambar>
  );
}

/** Urutkan bilangan dengan mengetuk kartu dari yang paling kecil. */
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
      else info("Betul! Bilangan berikutnya yang paling kecil yang mana?");
    } else salah(petunjukUrut(l, i, sudah));
  };
  return (
    <div className="space-y-1.5" role="group" aria-label="Kartu bilangan">
      <div className="grid grid-cols-2 gap-2">
        {kartu.map((i) => (
          <button
            key={l.item[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketukKartu(i)}
            className={`flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-4 px-3 py-1.5 text-2xl font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : rupa === "benda" ? "border-[#92400E] bg-[#FEF3C7] text-[#78350F]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            <span>
              {rupa === "benda" ? "\u{1F37E} " : ""}
              {l.item[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Pasang dua kartu angka: ketuk kartu untuk tempat puluhan, lalu periksa. */
function Pasang({ l, rupa, salah, siap }: PK & { l: LKartu }) {
  const [puluhan, setPuluhan] = useState<number | null>(null);
  const [selesai, setSelesai] = useState(false);
  const satuan = puluhan === null ? null : l.a + l.b - puluhan;
  const periksa = () => {
    if (puluhan === null) {
      salah("Ketuk dulu satu kartu untuk dipasang di tempat puluhan.");
      return;
    }
    if (puluhan === puluhanKartu(l)) {
      setSelesai(true);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukKartu(l));
  };
  const benda = rupa === "benda";
  return (
    <div className="space-y-2">
      <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-[#7C3AED] bg-white/90 p-2">
        <div className="flex justify-center gap-3">
          {[l.a, l.b].map((n) => (
            <button
              key={n}
              type="button"
              disabled={selesai}
              onClick={() => setPuluhan(puluhan === n ? null : n)}
              aria-pressed={puluhan === n}
              className={`rounded-xl border-4 px-5 py-2 text-3xl font-black disabled:opacity-60 ${puluhan === n ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : benda ? "border-[#92400E] bg-[#FEF3C7] text-[#78350F]" : "border-[#7C3AED] bg-[#F5F3FF] text-[#4C1D95]"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-3 text-sm font-black text-[#1C01A5]">
          <span className="rounded-lg border-2 border-dashed border-[#1C01A5] px-4 py-1">puluhan: {puluhan ?? "?"}</span>
          <span className="rounded-lg border-2 border-dashed border-[#DC2626] px-4 py-1">satuan: {satuan ?? "?"}</span>
        </div>
        {puluhan !== null && satuan !== null ? <p className="mt-1 text-center text-lg font-black text-[#4C1D95]">terbentuk {bentukKartu(puluhan, satuan)}</p> : null}
      </div>
      <div className="flex justify-center">
        <Tombol teks="Periksa" mati={selesai} onClick={periksa} />
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "banding") return rupa === "lambang" ? <KartuLambang judul="dua bilangan" baris={[`pertama: ${k.a}`, `kedua: ${k.b}`]} /> : <DuaPapan a={k.a} b={k.b} rupa={rupa} />;
  if (rupa === "lambang") return <KartuLambang judul="kartu kepik" baris={[`mulai di ${k.dari}`, `${k.arah} ${k.langkah} langkah`]} />;
  const j = jendelaTali({ tipe: "garis", dari: k.dari, arah: k.arah, langkah: k.langkah });
  return (
    <Gambar label="Kepik di tali" judul={`kepik ${k.arah} ${k.langkah} langkah`}>
      <Tali dari={j.dari} sampai={j.sampai} rupa={rupa} kepik={k.dari} />
    </Gambar>
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
    case "banding":
      return pk.cara === "klik" ? <KetukBanding {...pk} rupa={rupa} l={d} /> : <GambarTugas l={d} rupa={rupa} />;
    case "garis":
      return <Garis {...pk} rupa={rupa} l={d} />;
    case "antara":
      return <Antara {...pk} rupa={rupa} l={d} />;
    case "turun":
      return pk.cara === "klik" ? <TurunKlik {...pk} rupa={rupa} l={d} /> : <GambarTugas l={d} rupa={rupa} />;
    case "urut":
      return <Urut {...pk} rupa={rupa} l={d} />;
    case "kartu":
      return pk.cara === "klik" ? <Pasang {...pk} rupa={rupa} l={d} /> : <GambarTugas l={d} rupa={rupa} />;
    default:
      return <GambarTugas l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahPapan({ ls, rupa, bicara, onBenar }: P) {
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
    bicara(typeof j === "number" ? kata(j) : (LABEL_NAMA[j as Nama] ?? j));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const nama = l.tipe === "banding" || l.tipe === "tanda" || l.tipe === "langkah" || l.tipe === "patokan" ? namaKunci(l) : null;
  const pilihanTeks: string[] = kunci?.jenis === "nama" && nama ? pilihanNamaDari(nama) : kunci?.jenis === "angka" ? pilihanAngka(kunci.n).map(kata) : [];
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraPapan
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
