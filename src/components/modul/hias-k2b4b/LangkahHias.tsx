"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  WARNA_UNSUR,
  banyakTampak,
  barisan,
  dasarDari,
  hurufKode,
  jenisUnsur,
  kalimatKunci,
  kalimatTanya,
  kata,
  kodeSatuan,
  kunciJawab,
  petunjukIsi,
  petunjukKode,
  petunjukSalah,
  pilihanIsi,
  pilihanKata,
  siapLangsung,
  unsurB,
  unsurIsi,
  type Cara,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type LKode,
  type LPita,
  type LTepuk,
  type Rupa,
  type Unsur,
} from "./logika-cpa";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, tataBaris } from "./periksa";
import { JawabSuaraHias, PilihanKata, teksKunci } from "./JawabHias";

/**
 * Satu tugas CPA Kelas 2 Bab 4 Sub-Bab B (pola). Kegiatan metode: Cari Satuan, Ulangi, Periksa (memilih unsur berikutnya, pola atau bukan); Pattern Strips (mengisi
 * kotak kosong di pita); Letter Coding (menyusun kartu huruf satu satuan); Rhythm Clap (melanjutkan irama dengan mengetuk bunyi). Tugas Cari kesalahan: putuskan
 * benar atau salah, pilih alasan, lalu jawab sendiri. Menjawab menurut cara: pilih kata, tulis satu angka di kanvas, atau ucapkan satu kata.
 * Rupa: benda berwarna dengan emoji (Concrete), bangun polos (Pictorial), kata dan huruf saja (Abstract). Semua kegiatan aktif di ketiga rupa. Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const UNGU = "#1C01A5";
const COKLAT = "#78350F";
const EMOJI_BENDA: Record<string, string> = { bintang: "\u{2B50}", hati: "\u{2764}\u{FE0F}", daun: "\u{1F343}", bunga: "\u{1F33C}" };
const EMOJI_BUNYI: Record<string, string> = { keras: "\u{1F44F}", pelan: "\u{1F44F}", diam: "\u{1F92B}" };

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Gambar satu unsur ------------------------------ */
/** Satu unsur berpusat di (cx, cy) dengan sisi s: manik atau emoji (Concrete), bangun polos (Pictorial). Tidak dipakai untuk Abstract. */
function Glyph({ u, cx, cy, s, rupa }: { u: Unsur; cx: number; cy: number; s: number; rupa: Rupa }) {
  const j = jenisUnsur(u);
  const garis = rupa === "benda" ? COKLAT : UNGU;
  if (j === "warna") {
    const w = WARNA_UNSUR[u] ?? "#CBD5E1";
    return rupa === "benda" ? (
      <g>
        <circle cx={cx} cy={cy} r={s / 2} fill={w} stroke={garis} strokeWidth={1.8} />
        <circle cx={cx - s * 0.14} cy={cy - s * 0.16} r={s * 0.12} fill="#FFFFFF" fillOpacity={0.7} />
      </g>
    ) : (
      <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={3} fill={w} stroke={garis} strokeWidth={1.6} />
    );
  }
  if (j === "benda")
    return (
      <text x={cx} y={cy + s * 0.32} textAnchor="middle" fontSize={s * 0.95}>
        {EMOJI_BENDA[u]}
      </text>
    );
  if (j === "polos") {
    const r = s * 0.46;
    const umum = { fill: "#DBEAFE", stroke: garis, strokeWidth: 1.8, strokeLinejoin: "round" as const };
    if (u === "bulat") return <circle cx={cx} cy={cy} r={r} {...umum} />;
    if (u === "kotak") return <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx={2} {...umum} />;
    return <polygon points={`${cx},${cy - r} ${cx + r},${cy + r * 0.8} ${cx - r},${cy + r * 0.8}`} {...umum} />;
  }
  if (rupa === "benda")
    return (
      <text x={cx} y={cy + s * 0.3} textAnchor="middle" fontSize={u === "keras" ? s * 1.05 : u === "pelan" ? s * 0.55 : s * 0.8}>
        {EMOJI_BUNYI[u]}
      </text>
    );
  if (u === "diam") return <circle cx={cx} cy={cy} r={s * 0.3} fill="none" stroke={garis} strokeWidth={1.6} strokeDasharray="3 2" />;
  return <circle cx={cx} cy={cy} r={u === "keras" ? s * 0.48 : s * 0.2} fill={u === "keras" ? "#93C5FD" : "#BFDBFE"} stroke={garis} strokeWidth={1.8} />;
}

/** Tombol pilihan satu unsur dengan gambar kecilnya (kata saja untuk Abstract). */
function TombolUnsur({ u, rupa, mati, onClick }: { u: Unsur; rupa: Rupa; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="flex min-h-[52px] min-w-[84px] items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {rupa !== "lambang" ? (
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
          <Glyph u={u} cx={16} cy={16} s={22} rupa={rupa} />
        </svg>
      ) : null}
      {u}
    </button>
  );
}

/* ------------------------------ Barisan ------------------------------ */
type Item = Unsur | null;
type Tampil = { items: Item[]; rupa: Rupa; label: string; judul: string; sorotKe?: number; huruf?: LKode; kurung?: number };

/** Barisan unsur (atau huruf kode) sebagai gambar (Concrete, Pictorial) atau kartu kata (Abstract). `null` = kotak kosong. */
function Barisan({ items, rupa, label, judul, sorotKe, huruf, kurung }: Tampil) {
  const n = items.length;
  const teksItem = (u: Item): string => (u === null ? "?" : huruf ? hurufKode(huruf, u) : u);
  if (rupa === "lambang")
    return (
      <div className="space-y-1.5 rounded-2xl border-4 border-[#312E81] bg-[#1E1B4B] p-3" role="group" aria-label={label}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#FDE68A]">{judul}</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {items.map((u, i) => (
            <span
              key={i}
              className={`inline-flex min-h-[40px] min-w-[44px] items-center justify-center rounded-xl border-2 px-2 text-sm font-black ${u === null ? `border-dashed border-[#FDE68A] bg-transparent text-[#FDE68A] ${sorotKe === i ? "animate-pulse" : ""}` : "border-[#C7D2FE] bg-[#312E81] text-white"} ${kurung !== undefined && i < kurung ? "ring-2 ring-[#FDE047]" : ""}`}
            >
              {teksItem(u)}
            </span>
          ))}
        </div>
      </div>
    );
  const t = tataBaris(n);
  const y = 96;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {rupa === "benda" ? <line x1={12} y1={y} x2={288} y2={y} stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" /> : <rect x={8} y={y - t.s / 2 - 8} width={284} height={t.s + 16} rx={6} fill="#EEF2FF" stroke="#C7D2FE" strokeWidth={1.4} />}
      {items.map((u, i) => {
        const cx = t.x0 + t.d * i;
        if (u === null)
          return (
            <g key={i}>
              <rect x={cx - t.s / 2} y={y - t.s / 2} width={t.s} height={t.s} rx={4} fill="#FFFBEB" stroke="#B45309" strokeWidth={sorotKe === i ? 2.6 : 1.6} strokeDasharray="4 3" />
              <text x={cx} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill="#B45309">
                ?
              </text>
            </g>
          );
        if (huruf)
          return (
            <g key={i}>
              <rect x={cx - t.s / 2} y={y - t.s / 2} width={t.s} height={t.s} rx={5} fill={hurufKode(huruf, u) === "A" ? "#FDE68A" : "#BAE6FD"} stroke={UNGU} strokeWidth={1.6} />
              <text x={cx} y={y + 5} textAnchor="middle" fontSize={t.s * 0.6} fontWeight={900} fill={UNGU}>
                {hurufKode(huruf, u)}
              </text>
            </g>
          );
        return <Glyph key={i} u={u} cx={cx} cy={y} s={t.s} rupa={rupa} />;
      })}
      {kurung ? (
        <path d={`M${t.x0 - t.s / 2} ${y + t.s / 2 + 12} L${t.x0 - t.s / 2} ${y + t.s / 2 + 19} L${t.x0 + t.d * (kurung - 1) + t.s / 2} ${y + t.s / 2 + 19} L${t.x0 + t.d * (kurung - 1) + t.s / 2} ${y + t.s / 2 + 12}`} fill="none" stroke="#DC2626" strokeWidth={2.6} />
      ) : null}
    </svg>
  );
}

/** Arti huruf kode (A dan B) sebagai kata. */
function ArtiKode({ l }: { l: LKode }) {
  return (
    <p className="rounded-xl bg-[#FEF9C3] px-2 py-1 text-center text-sm font-black text-[#1C01A5]">
      A berarti {l.unit[0]} &nbsp;·&nbsp; B berarti {unsurB(l)}
    </p>
  );
}

/* ------------------------------ Mengisi kotak: Pita Pola dan Tepuk Irama ------------------------------ */
function Isi({ l, rupa, salah, siap, info }: PK & { l: LPita | LTepuk }) {
  const perlu = unsurIsi(l);
  const [isi, setIsi] = useState<Unsur[]>([]);
  const dasar = barisan(l).slice(0, banyakTampak(l));
  const items: Item[] = [...dasar, ...perlu.map((_, i) => (i < isi.length ? isi[i] : null))];
  const pilih = (u: Unsur) => {
    if (isi.length >= perlu.length) return;
    if (u === perlu[isi.length]) {
      const baru = [...isi, u];
      setIsi(baru);
      if (baru.length === perlu.length) siap(kalimatKunci(l, "klik"));
      else info("Betul! Isi kotak berikutnya.");
    } else salah(petunjukIsi(l, u, items[dasar.length + isi.length - 1] ?? dasar[dasar.length - 1]));
  };
  const tepuk = l.tipe === "tepuk";
  return (
    <div className="space-y-2">
      <Barisan items={items} rupa={rupa} sorotKe={dasar.length + isi.length} label={tepuk ? "Irama yang harus dilanjutkan" : "Pita dengan kotak kosong"} judul={tepuk ? "lanjutkan irama dengan mengetuk bunyi" : "isi kotak kosong di pita"} />
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={tepuk ? "Pilih bunyi" : "Pilih unsur"}>
        {pilihanIsi(l).map((u) => (
          <TombolUnsur key={u} u={u} rupa={rupa} mati={isi.length >= perlu.length} onClick={() => pilih(u)} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Menyusun kartu huruf: Kode Huruf ------------------------------ */
function SusunKode({ l, rupa, salah, siap, info }: PK & { l: LKode }) {
  const benar = kodeSatuan(l);
  const [susun, setSusun] = useState<string[]>([]);
  const ketuk = (h: string) => {
    if (susun.length >= benar.length) return;
    if (h === benar[susun.length]) {
      const baru = [...susun, h];
      setSusun(baru);
      if (baru.length === benar.length) siap(kalimatKunci(l, "klik"));
      else info("Betul! Susun huruf berikutnya.");
    } else salah(petunjukKode(l, susun.length));
  };
  return (
    <div className="space-y-2">
      <Barisan items={barisan(l)} rupa={rupa} label="Pola yang akan ditulis dengan huruf" judul="tulis kode satu satuan pola" />
      <ArtiKode l={l} />
      <div className="flex justify-center gap-1.5" role="group" aria-label="Susunan kartu huruf">
        {benar.map((_, i) => (
          <span key={i} className={`flex h-11 w-11 items-center justify-center rounded-xl border-4 text-xl font-black ${i < susun.length ? "border-[#15803D] bg-[#DCFCE7] text-[#15803D]" : "border-dashed border-[#B45309] bg-[#FFFBEB] text-[#B45309]"}`}>
            {i < susun.length ? susun[i] : "?"}
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-3" role="group" aria-label="Kartu huruf">
        {["A", "B"].map((h) => (
          <button key={h} type="button" disabled={susun.length >= benar.length} onClick={() => ketuk(h)} className="min-h-[52px] min-w-[72px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
            {h}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Dasar: tampilan tiap jenis ------------------------------ */
function Dasar(props: PK & { l: Langkah }) {
  const { rupa, cara, diam } = props;
  const l = dasarDari(props.l);
  const aktif = cara === "klik" && !diam;
  if (l.tipe === "pita" || l.tipe === "tepuk") {
    if (aktif) return <Isi {...props} l={l} />;
    const tampak = banyakTampak(l);
    const items: Item[] = barisan(l).map((u, i) => (l.tipe === "pita" && i >= tampak ? null : u));
    const tepuk = l.tipe === "tepuk";
    const judul = cara === "kanvas" ? (tepuk ? `hitung tepuk ${l.hitung}` : "hitung satuan yang berulang") : cara === "suara" ? (tepuk ? "bunyi berikutnya?" : "isi kotak pertama yang kosong") : tepuk ? "irama" : "pita dengan kotak kosong";
    return <Barisan items={items} rupa={rupa} sorotKe={l.tipe === "pita" ? tampak : undefined} label={tepuk ? "Irama keras dan pelan" : "Pita kotak-kotak"} judul={judul} />;
  }
  if (l.tipe === "kode") {
    if (aktif) return <SusunKode {...props} l={l} />;
    const huruf = cara !== "klik";
    return (
      <div className="space-y-2">
        <Barisan items={barisan(l)} rupa={rupa} huruf={huruf ? l : undefined} label={huruf ? "Pola yang ditulis dengan huruf" : "Pola yang akan ditulis dengan huruf"} judul={huruf ? "pola ditulis dengan huruf" : "tulis kode satu satuan pola"} />
        <ArtiKode l={l} />
      </div>
    );
  }
  if (l.tipe === "bukan") return <Barisan items={l.barisan} rupa={rupa} label="Susunan yang diperiksa" judul="periksa susunan: pola atau bukan?" />;
  const judul = cara === "kanvas" ? "cari satuan, hitung unsurnya" : cara === "suara" ? "unsur berikutnya?" : "cari satuan, lanjutkan";
  return <Barisan items={[...barisan(l), ...(cara === "klik" || cara === "suara" ? [null] : [])]} rupa={rupa} sorotKe={cara === "kanvas" ? undefined : barisan(l).length} label="Barisan yang diperiksa" judul={judul} />;
}

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
export function LangkahHias({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas yang langsung siap dijawab (kanvas, suara, memilih unsur berikutnya, pola atau bukan) tidak memakai kegiatan lebih dulu. */
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata atau angka yang dipilih, ditulis, atau diucapkan. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
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
            <JawabSuaraHias kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
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
