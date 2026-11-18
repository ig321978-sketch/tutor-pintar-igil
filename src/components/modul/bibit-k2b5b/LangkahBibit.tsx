"use client";

import React, { useState } from "react";
import { JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import {
  EMOJI_BENDA,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  langkahUrut,
  namaBenda,
  petunjukBagi,
  petunjukPindah,
  petunjukSalah,
  petunjukUrut,
  pilihanAngka,
  pilihanKata,
  siapLangsung,
  urutTampil,
  type Cara,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type LBagi,
  type LGiliran,
  type LKali,
  type LNeraca,
  type Rupa,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, tataGrid } from "./periksa";
import { JawabSuaraBibit, PilihanKata, teksKunci } from "./JawabBibit";

/**
 * Satu tugas CPA Kelas 2 Bab 5 Sub-Bab B (setengah dari kumpulan benda). Kegiatan metode: Satu-Satu Sampai Habis (membagi bergantian ke dua petak),
 * Dealing Out (mengurutkan langkah membagi), Balance Scale (memindahkan benda sampai neraca seimbang), Doubling Check (menggandakan setengahnya).
 * Tugas Cari kesalahan: putuskan benar atau salah, pilih alasan, lalu jawab sendiri (bila ada jawaban lagi). Menjawab menurut cara: pilih angka atau kata,
 * tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: benda beremoji (Concrete), titik polos (Pictorial), kata dan bilangan saja (Abstract). Semua kegiatan aktif di ketiga rupa. Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const BIRU = "#1C01A5";
const COKLAT = "#78350F";

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Gambar benda ------------------------------ */
/** Satu benda berpusat di (cx, cy) dengan sisi s: emoji hasil kebun (Concrete) atau titik polos (Pictorial). Tidak dipakai untuk Abstract. */
function Item({ rupa, benda, cx, cy, s }: { rupa: Rupa; benda: string; cx: number; cy: number; s: number }) {
  if (rupa === "benda")
    return (
      <text x={cx} y={cy + s * 0.34} textAnchor="middle" fontSize={s * 0.92}>
        {EMOJI_BENDA[benda] ?? EMOJI_BENDA.bibit}
      </text>
    );
  return <circle cx={cx} cy={cy} r={s * 0.38} fill="#DBEAFE" stroke={BIRU} strokeWidth={1.6} />;
}
function Kumpulan({ n, rupa, benda, x, y, w, h, maks = 5 }: { n: number; rupa: Rupa; benda: string; x: number; y: number; w: number; h: number; maks?: number }) {
  const g = tataGrid(n, x, y, w, h, maks);
  return (
    <g>
      {g.titik.map((t, i) => (
        <Item key={i} rupa={rupa} benda={benda} cx={t.x} cy={t.y} s={g.s} />
      ))}
    </g>
  );
}
const Kotak = ({ x, y, w, h, rupa, sorot }: { x: number; y: number; w: number; h: number; rupa: Rupa; sorot?: boolean }) =>
  rupa === "benda" ? (
    <rect x={x} y={y} width={w} height={h} rx={8} fill={sorot ? "#B45309" : "#92400E"} fillOpacity={0.85} stroke="#451A03" strokeWidth={1.6} />
  ) : (
    <rect x={x} y={y} width={w} height={h} rx={6} fill="#EEF2FF" stroke={sorot ? "#DC2626" : "#A5B4FC"} strokeWidth={sorot ? 2.4 : 1.4} strokeDasharray="4 3" />
  );
const Judul = ({ x, y, isi, terang }: { x: number; y: number; isi: string; terang?: boolean }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={9.5} fontWeight={900} fill={terang ? "#FEF3C7" : BIRU}>
    {isi}
  </text>
);

/** Adegan membagi: tumpukan di meja (`sisa`), petak kiri dan kanan. `hitung`: tampilkan banyak benda tiap petak. */
function AdeganBagi({ rupa, benda, sisa, kiri, kanan, hitung, label }: { rupa: Rupa; benda: string; sisa: number; kiri: number; kanan: number; hitung?: boolean; label: string }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      <rect x={58} y={20} width={184} height={64} rx={8} fill={rupa === "benda" ? "#FEF3C7" : "#F8FAFC"} stroke={rupa === "benda" ? "#B45309" : "#94A3B8"} strokeWidth={1.6} />
      <Judul x={150} y={15} isi={`tumpukan di meja${hitung ? `: ${sisa}` : ""}`} />
      {sisa > 0 ? <Kumpulan n={sisa} rupa={rupa} benda={benda} x={64} y={24} w={172} h={56} maks={5} /> : null}
      <Kotak x={14} y={110} w={128} h={78} rupa={rupa} />
      <Kotak x={158} y={110} w={128} h={78} rupa={rupa} />
      <Judul x={78} y={104} isi={`petak kiri${hitung ? `: ${kiri}` : ""}`} />
      <Judul x={222} y={104} isi={`petak kanan${hitung ? `: ${kanan}` : ""}`} />
      {kiri > 0 ? <Kumpulan n={kiri} rupa={rupa} benda={benda} x={18} y={114} w={120} h={70} maks={5} /> : null}
      {kanan > 0 ? <Kumpulan n={kanan} rupa={rupa} benda={benda} x={162} y={114} w={120} h={70} maks={5} /> : null}
    </svg>
  );
}

/** Adegan neraca: piringan kiri dan kanan miring ke sisi yang lebih banyak. */
function AdeganNeraca({ rupa, benda, kiri, kanan, label }: { rupa: Rupa; benda: string; kiri: number; kanan: number; label: string }) {
  const dy = kiri > kanan ? 10 : kiri < kanan ? -10 : 0;
  const yl = 54 + dy;
  const yr = 54 - dy;
  const pan = (n: number, cx: number, y: number) => (
    <g>
      <line x1={cx} y1={y} x2={cx} y2={y + 14} stroke={COKLAT} strokeWidth={1.6} />
      <rect x={cx - 38} y={y + 14} width={76} height={6} rx={3} fill={rupa === "benda" ? "#FDE68A" : "#E0E7FF"} stroke={rupa === "benda" ? "#92400E" : BIRU} strokeWidth={1.4} />
      {n > 0 ? <Kumpulan n={n} rupa={rupa} benda={benda} x={cx - 36} y={y - 32} w={72} h={44} maks={5} /> : null}
    </g>
  );
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      <rect x={147} y={50} width={6} height={104} rx={2} fill="#B45309" stroke="#78350F" strokeWidth={1} />
      <rect x={122} y={152} width={56} height={8} rx={3} fill="#92400E" stroke="#451A03" strokeWidth={1.2} />
      <line x1={96} y1={yl} x2={204} y2={yr} stroke="#78350F" strokeWidth={3.6} strokeLinecap="round" />
      <circle cx={150} cy={54} r={4} fill="#FDE68A" stroke="#78350F" strokeWidth={1.4} />
      {pan(kiri, 96, yl)}
      {pan(kanan, 204, yr)}
      <Judul x={96} y={188} isi="piringan kiri" />
      <Judul x={204} y={188} isi="piringan kanan" />
    </svg>
  );
}

/** Adegan menggandakan: satu tumpukan setengah, tumpukan kedua bila digandakan (atau banyak semula yang diperiksa). */
function AdeganKali({ rupa, benda, h, ganda, semula, label }: { rupa: Rupa; benda: string; h: number; ganda: boolean; semula?: number; label: string }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      <Kotak x={14} y={34} w={126} h={96} rupa={rupa} />
      <Judul x={77} y={28} isi="setengahnya" />
      <Kumpulan n={h} rupa={rupa} benda={benda} x={18} y={38} w={118} h={88} maks={3} />
      {ganda ? (
        <g>
          <Kotak x={160} y={34} w={126} h={96} rupa={rupa} sorot />
          <Judul x={223} y={28} isi="gandaannya" />
          <Kumpulan n={h} rupa={rupa} benda={benda} x={164} y={38} w={118} h={88} maks={3} />
          <text x={150} y={90} textAnchor="middle" fontSize={20} fontWeight={900} fill="#DC2626">
            +
          </text>
        </g>
      ) : semula !== undefined ? (
        <g>
          <rect x={160} y={34} width={126} height={96} rx={6} fill="#FFFBEB" stroke="#B45309" strokeWidth={1.4} strokeDasharray="4 3" />
          <Judul x={223} y={28} isi="banyak semula" />
          <Kumpulan n={semula} rupa={rupa} benda={benda} x={164} y={38} w={118} h={88} maks={5} />
        </g>
      ) : (
        <g>
          <rect x={160} y={34} width={126} height={96} rx={6} fill="none" stroke="#B45309" strokeWidth={1.4} strokeDasharray="4 3" />
          <text x={223} y={90} textAnchor="middle" fontSize={26} fontWeight={900} fill="#B45309">
            ?
          </text>
        </g>
      )}
    </svg>
  );
}

/* ------------------------------ Lembar kata dan bilangan (Abstract) ------------------------------ */
function Lembar({ baris, judul }: { baris: [string, string][]; judul: string }) {
  return (
    <div className="space-y-1.5 rounded-2xl border-4 border-[#0F766E] bg-white p-3" role="group" aria-label={judul}>
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#0F766E]">{judul}</p>
      <div className="divide-y divide-[#99F6E4] rounded-xl border-2 border-[#99F6E4]">
        {baris.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm font-black text-[#134E4A]">
            <span>{k}</span>
            <span className="min-w-[2rem] rounded-md bg-[#CCFBF1] px-2 text-center text-lg">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Kegiatan ------------------------------ */
/** Membagi bergantian: beri satu benda ke petak kiri atau kanan sampai habis. */
function Bagikan({ l, rupa, salah, siap, info }: PK & { l: LBagi }) {
  const b = namaBenda(l, rupa);
  const [s, setS] = useState({ sisa: l.total, kiri: 0, kanan: 0, terakhir: -1 as -1 | 0 | 1 });
  const beri = (sisi: 0 | 1) => {
    if (s.sisa === 0) return;
    if (s.terakhir === sisi) {
      salah(petunjukBagi(sisi));
      return;
    }
    const baru = { sisa: s.sisa - 1, kiri: s.kiri + (sisi === 0 ? 1 : 0), kanan: s.kanan + (sisi === 1 ? 1 : 0), terakhir: sisi };
    setS(baru);
    if (baru.sisa === 0) siap(kalimatKunci(l, "klik"));
    else info(`Sisa ${kata(baru.sisa)} ${b}. Beri ke petak ${sisi === 0 ? "kanan" : "kiri"} berikutnya.`);
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <Lembar judul="bagi satu-satu" baris={[["Di meja", String(s.sisa)], ["Petak kiri", String(s.kiri)], ["Petak kanan", String(s.kanan)]]} />
      ) : (
        <AdeganBagi rupa={rupa} benda={l.benda ?? "bibit"} sisa={s.sisa} kiri={s.kiri} kanan={s.kanan} hitung label="Membagi benda ke dua petak" />
      )}
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Beri satu benda">
        <Tombol teks="Beri satu ke petak kiri" mati={s.sisa === 0} onClick={() => beri(0)} />
        <Tombol teks="Beri satu ke petak kanan" mati={s.sisa === 0} onClick={() => beri(1)} />
      </div>
    </div>
  );
}

/** Mengurutkan langkah Bagi Satu-Satu: ketuk kartu langkah dari yang pertama. */
function UrutLangkah({ l, rupa, salah, siap, info }: PK & { l: LGiliran }) {
  const urut = langkahUrut(l, rupa);
  const [sudah, setSudah] = useState<number[]>([]);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i !== sudah.length) {
      salah(petunjukUrut(sudah.length));
      return;
    }
    const baru = [...sudah, i];
    setSudah(baru);
    if (baru.length === urut.length) siap(kalimatKunci(l, "klik"));
    else info("Betul! Langkah berikutnya apa?");
  };
  return (
    <div className="space-y-2">
      <ol className="space-y-1" aria-label="Langkah yang sudah disusun">
        {urut.map((t, i) => (
          <li key={t} className={`flex min-h-[40px] items-center gap-2 rounded-xl border-4 px-2 text-sm font-black ${i < sudah.length ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#B45309] bg-[#FFFBEB] text-[#B45309]/60"}`}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-xs">{i + 1}</span>
            {i < sudah.length ? urut[i] : "?"}
          </li>
        ))}
      </ol>
      <div className="space-y-1.5" role="group" aria-label="Kartu langkah">
        {urutTampil(l).map((i) => (
          <button key={i} type="button" disabled={sudah.includes(i)} onClick={() => ketuk(i)} className="block min-h-[46px] w-full rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-left text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
            {urut[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Memindahkan benda dari piringan yang lebih banyak sampai neraca seimbang. */
function Seimbangkan({ l, rupa, salah, siap, info }: PK & { l: LNeraca }) {
  const [p, setP] = useState({ kiri: l.kiri, kanan: l.kanan });
  const pindah = (dari: "kiri" | "kanan") => {
    if (p.kiri === p.kanan) return;
    const berat = p.kiri > p.kanan ? "kiri" : "kanan";
    if (dari !== berat) {
      salah(petunjukPindah());
      return;
    }
    const baru = { kiri: p.kiri + (dari === "kiri" ? -1 : 1), kanan: p.kanan + (dari === "kanan" ? -1 : 1) };
    setP(baru);
    if (baru.kiri === baru.kanan) siap(kalimatKunci(l, "klik"));
    else info(`Neraca masih miring. Piringan kiri ${kata(baru.kiri)} dan kanan ${kata(baru.kanan)}.`);
  };
  const seimbang = p.kiri === p.kanan;
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <Lembar judul={seimbang ? "neraca seimbang" : "neraca miring"} baris={[["Piringan kiri", String(p.kiri)], ["Piringan kanan", String(p.kanan)]]} />
      ) : (
        <AdeganNeraca rupa={rupa} benda={l.benda ?? "bibit"} kiri={p.kiri} kanan={p.kanan} label="Neraca yang harus diseimbangkan" />
      )}
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pindahkan satu benda">
        <Tombol teks="Pindah satu dari kiri ke kanan" mati={seimbang} onClick={() => pindah("kiri")} />
        <Tombol teks="Pindah satu dari kanan ke kiri" mati={seimbang} onClick={() => pindah("kanan")} />
      </div>
    </div>
  );
}

/** Menggandakan setengahnya: ketuk Gandakan, lalu pilih banyak seluruhnya. */
function Gandakan({ l, rupa, siap }: PK & { l: LKali }) {
  const [ganda, setGanda] = useState(false);
  const ketuk = () => {
    setGanda(true);
    siap(`Dua tumpukan sama banyak: ${kata(l.h)} dan ${kata(l.h)}. Berapa seluruhnya?`);
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <Lembar judul="gandakan setengahnya" baris={[["Setengahnya", String(l.h)], ["Gandaannya", ganda ? String(l.h) : "?"]]} />
      ) : (
        <AdeganKali rupa={rupa} benda={l.benda ?? "bibit"} h={l.h} ganda={ganda} label="Setengah yang akan digandakan" />
      )}
      <div className="flex justify-center">
        <Tombol teks="Gandakan" mati={ganda} onClick={ketuk} />
      </div>
    </div>
  );
}

/* ------------------------------ Dasar: tampilan tiap jenis ------------------------------ */
function Dasar(props: PK & { l: Langkah }) {
  const { rupa, cara, diam } = props;
  const l = dasarDari(props.l);
  const aktif = cara === "klik" && !diam;
  const b = l.benda ?? "bibit";
  if (l.tipe === "bagi") {
    if (aktif) return <Bagikan {...props} l={l} />;
    const pisah = l.pisah;
    if (rupaLambang(rupa))
      return pisah ? (
        <Lembar judul="pembagian yang dibuat" baris={[["Seluruhnya", String(l.total)], ["Petak kiri", String(pisah[0])], ["Petak kanan", String(pisah[1])], ["Tersisa", String(l.total - pisah[0] - pisah[1])]]} />
      ) : (
        <Lembar judul="bagi satu-satu sampai habis" baris={[["Seluruhnya", String(l.total)], ["Petak kiri", cara === "kanvas" || cara === "suara" ? "?" : "0"], ["Petak kanan", cara === "kanvas" || cara === "suara" ? "?" : "0"]]} />
      );
    return pisah ? (
      <AdeganBagi rupa={rupa} benda={b} sisa={l.total - pisah[0] - pisah[1]} kiri={pisah[0]} kanan={pisah[1]} label="Pembagian yang dibuat" />
    ) : (
      <AdeganBagi rupa={rupa} benda={b} sisa={l.total} kiri={0} kanan={0} label="Benda yang akan dibagi" />
    );
  }
  if (l.tipe === "giliran") {
    if (aktif) return <UrutLangkah {...props} l={l} />;
    return rupaLambang(rupa) ? (
      <Lembar judul="satu putaran" baris={[["Seluruhnya", String(l.total)], ["Satu putaran", "1 kiri + 1 kanan"], ["Putaran", String(l.putaran)]]} />
    ) : (
      <AdeganBagi rupa={rupa} benda={b} sisa={l.total} kiri={0} kanan={0} label="Benda yang dibagi bergantian per putaran" />
    );
  }
  if (l.tipe === "neraca") {
    if (aktif) return <Seimbangkan {...props} l={l} />;
    return rupaLambang(rupa) ? (
      <Lembar judul={l.kiri === l.kanan ? "neraca seimbang" : "neraca miring"} baris={[["Piringan kiri", String(l.kiri)], ["Piringan kanan", String(l.kanan)]]} />
    ) : (
      <AdeganNeraca rupa={rupa} benda={b} kiri={l.kiri} kanan={l.kanan} label="Neraca dengan dua piringan" />
    );
  }
  if (aktif) return <Gandakan {...props} l={l} />;
  const periksa = cara === "suara";
  return rupaLambang(rupa) ? (
    <Lembar judul={periksa ? "periksa gandaan" : "gandakan setengahnya"} baris={periksa ? [["Banyak semula", String(l.semula)], ["Setengahnya", String(l.h)]] : [["Setengahnya", String(l.h)], ["Seluruhnya", "?"]]} />
  ) : (
    <AdeganKali rupa={rupa} benda={b} h={l.h} ganda={false} semula={periksa ? l.semula : undefined} label="Setengah yang akan digandakan" />
  );
}
const rupaLambang = (r: Rupa): boolean => r === "lambang";

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} diam salah={salah} siap={() => undefined} info={info} />
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
export function LangkahBibit({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas yang langsung siap dijawab (kanvas dan suara) tidak memakai kegiatan lebih dulu. */
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata atau angka yang dipilih, ditulis, atau diucapkan. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const angka = kunci?.jenis === "angka" ? pilihanAngka(l) : [];
  const pilihan = kunci?.jenis === "kata" ? pilihanKata(l) : [];
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraBibit
              kunci={kunci}
              pilihan={kunci.jenis === "angka" ? angka.map(kata) : pilihan}
              mati={mati}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "angka" ? (
            <Pilihan pilihan={angka} rupa={rupa} mati={matiAngka} onPilih={(n) => jawab(n, n === kunci.n)} />
          ) : (
            <PilihanKata pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
