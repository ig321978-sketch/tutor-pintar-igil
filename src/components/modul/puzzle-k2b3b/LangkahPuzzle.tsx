"use client";

import React, { useMemo, useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import { HASIL_GABUNG, NAMA_JENIS, banyakGabung, gabung, geser, lipat, pusat, skala, urai, type Keping, type Titik } from "./bentuk";
import {
  awalPuzzle,
  barisLambang,
  dasarDari,
  jawaban,
  kalimatKunci,
  kalimatTanya,
  kata,
  petunjukSalah,
  pilihanAngka,
  pilihanNama,
  pasangKeping,
  type Gabung,
  type Langkah,
  type LangkahDasar,
  type LangkahHitung,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahUrut,
  type Rupa,
} from "./logika";
import { GAMBAR_KEPING, WARNA_KAYU } from "./data";
import { LEBAR_ADEGAN, TINGGI_ADEGAN } from "./periksa";
import { JawabSuaraBentuk, PilihanTeks, buatPilihan, type PilihanJawab } from "./Jawab";

/**
 * Satu soal CPA Kelas 2 Bab 3 Sub-Bab B. Jawabannya tidak hanya angka: pilih nama bentuk, susun keping ke bayangan, urutkan langkah,
 * Cari kesalahan (benar atau salah lalu alasan), tulis satu angka di kanvas, atau ucapkan angka atau nama bentuk.
 * Rupa: keping kayu bergambar taman (Concrete), keping polos di lembar bayangan (Pictorial), tabel kata dan lambang (Abstract).
 * Salah = goyang dan petunjuk yang menunjuk kesalahannya. Soal yang punya jawaban langsung siap dijawab (tanpa kegiatan lebih dulu).
 */
type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; salah: (p: string) => void; selesai: (p: string) => void; info: (p: string) => void };
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const poin = (t: readonly Titik[]) => t.map((p) => `${p.x},${p.y}`).join(" ");

/* ------------------------------ Bentuk dasar ------------------------------ */
function Gambar({ label, rupa, children }: { label: string; rupa: Rupa; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl" aria-label={label}>
      <rect x={0} y={0} width={LEBAR_ADEGAN} height={TINGGI_ADEGAN} fill={rupa === "diagram" ? "#1E293B" : "#E7C08E"} />
      {children}
    </svg>
  );
}
function Judul({ teks, rupa }: { teks: string; rupa: Rupa }) {
  return (
    <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={rupa === "diagram" ? "#F8FAFC" : UNGU}>
      {teks}
    </text>
  );
}
type Gaya = { sorot?: boolean; merah?: boolean; hijau?: boolean; putus?: boolean; kosong?: boolean };
/** Satu keping: kayu berwarna dengan gambar taman (benda) atau abu-abu polos (diagram). */
function Poli({ k, i, rupa, g = {} }: { k: Keping; i: number; rupa: Rupa; g?: Gaya }) {
  const c = pusat(k.titik);
  const garis = g.hijau ? HIJAU : g.merah ? MERAH : g.sorot ? "#B45309" : rupa === "diagram" ? "#0F172A" : "#92400E";
  const isi = g.kosong ? (rupa === "diagram" ? "#334155" : "#F5E6CC") : rupa === "diagram" ? "#CBD5E1" : WARNA_KAYU[i % WARNA_KAYU.length];
  return (
    <g>
      <polygon points={poin(k.titik)} fill={isi} stroke={garis} strokeWidth={g.hijau || g.merah || g.sorot ? 3 : 1.6} strokeDasharray={g.putus ? "4 3" : undefined} strokeLinejoin="round" />
      {rupa === "benda" && !g.kosong ? (
        <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize={11}>
          {GAMBAR_KEPING[i % GAMBAR_KEPING.length]}
        </text>
      ) : null}
    </g>
  );
}
const WARNA_GARIS = (rupa: Rupa) => (rupa === "diagram" ? "#FACC15" : MERAH);
const Garis = ({ a, b, rupa, id }: { a: Titik; b: Titik; rupa: Rupa; id: string }) => <line key={id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={WARNA_GARIS(rupa)} strokeWidth={2.6} strokeLinecap="round" />;

/** Keping `k` dipindah ke pusat (cx, cy) dan diskalakan `f` kali (untuk baki keping). */
function kecil(k: Keping, cx: number, cy: number, f: number): Keping {
  const c = pusat(k.titik);
  return { jenis: k.jenis, titik: geser(skala(k.titik, f, c.x, c.y), cx - c.x, cy - c.y) };
}

/** Bentuk satuan sebuah jenis untuk kumpulan keping (Pola Blok). */
function bentukJenis(jenis: Keping["jenis"], cx: number, cy: number, r: number): Keping {
  const t: Titik[] =
    jenis === "segitiga"
      ? [{ x: cx, y: cy - r }, { x: cx + r, y: cy + r * 0.8 }, { x: cx - r, y: cy + r * 0.8 }]
      : jenis === "persegi"
        ? [{ x: cx - r * 0.8, y: cy - r * 0.8 }, { x: cx + r * 0.8, y: cy - r * 0.8 }, { x: cx + r * 0.8, y: cy + r * 0.8 }, { x: cx - r * 0.8, y: cy + r * 0.8 }]
        : jenis === "segiEmpat"
          ? [{ x: cx - r, y: cy - r * 0.55 }, { x: cx + r, y: cy - r * 0.55 }, { x: cx + r, y: cy + r * 0.55 }, { x: cx - r, y: cy + r * 0.55 }]
          : Array.from({ length: jenis === "segiLima" ? 5 : 6 }, (_, q) => {
              const n = jenis === "segiLima" ? 5 : 6;
              const a = ((-90 + (360 / n) * q) * Math.PI) / 180;
              return { x: Math.round((cx + r * Math.cos(a)) * 10) / 10, y: Math.round((cy + r * Math.sin(a)) * 10) / 10 };
            });
  return { jenis, titik: t };
}
/** Urutan tampil kumpulan keping: bergantian antarjenis supaya harus dihitung teliti. */
export function urutanHitung(l: LangkahHitung): Keping["jenis"][] {
  const sisa = l.keping.map((k) => ({ jenis: k.jenis, n: k.n }));
  const out: Keping["jenis"][] = [];
  while (sisa.some((s) => s.n > 0)) for (const s of sisa) if (s.n > 0) { out.push(s.jenis); s.n -= 1; }
  return out;
}

/* ------------------------------ Gambar tiap jenis soal ------------------------------ */
function GUraian({ n, garis, rupa, sorot }: { n: number; garis: "miring" | "tengah" | "pojok" | "pusat"; rupa: Rupa; sorot?: boolean }) {
  const u = urai(n, garis, 150, 104, 62);
  return (
    <g>
      <Judul rupa={rupa} teks={garis === "pojok" ? "garis dari satu pojok" : garis === "pusat" ? "garis dari titik tengah" : garis === "miring" ? "garis miring" : "garis lurus di tengah"} />
      {u.keping.map((k, i) => (
        <Poli key={i} k={k} i={i} rupa={rupa} g={{ sorot }} />
      ))}
      {u.garis.map((g, i) => (
        <Garis key={i} id={`g${i}`} a={g[0]} b={g[1]} rupa={rupa} />
      ))}
    </g>
  );
}
function GGabung({ kind, rupa }: { kind: Gabung; rupa: Rupa }) {
  const g = gabung(kind, 150, 104, kind === "pendek" ? 36 : 40);
  return (
    <g>
      <Judul rupa={rupa} teks="keping disusun menjadi satu bentuk" />
      {g.keping.map((k, i) => (
        <Poli key={i} k={k} i={i} rupa={rupa} />
      ))}
    </g>
  );
}
function GHitung({ l, rupa }: { l: LangkahHitung; rupa: Rupa }) {
  const daftar = urutanHitung(l);
  const kolom = daftar.length > 5 ? Math.ceil(daftar.length / 2) : daftar.length;
  return (
    <g>
      <Judul rupa={rupa} teks={l.tanya === "semua" ? "hitung semua keping" : `hitung keping ${NAMA_JENIS[l.tanya]}`} />
      {daftar.map((j, i) => {
        const bar = Math.floor(i / kolom);
        const cx = 150 + (i % kolom - (kolom - 1) / 2) * 50;
        return <Poli key={i} k={bentukJenis(j, cx, 70 + bar * 62, 20)} i={i} rupa={rupa} />;
      })}
    </g>
  );
}
function GLipat({ l, rupa }: { l: Extract<LangkahDasar, { tipe: "lipat" }>; rupa: Rupa }) {
  const a = lipat(l.lipatan, 78, 104, 44);
  const b = lipat(l.lipatan, 220, 104, 44);
  const pc = pusat(b.luar);
  return (
    <g>
      <Judul rupa={rupa} teks="lipat, lalu gunting sepanjang lipatan" />
      <polygon points={poin(a.luar)} fill={rupa === "diagram" ? "#F8FAFC" : "#FFFBEB"} stroke={rupa === "diagram" ? "#0F172A" : "#92400E"} strokeWidth={1.8} />
      {a.garis.map((g, i) => (
        <line key={i} x1={g[0].x} y1={g[0].y} x2={g[1].x} y2={g[1].y} stroke="#2563EB" strokeWidth={2.2} strokeDasharray="5 3" />
      ))}
      <text x={150} y={108} textAnchor="middle" fontSize={16} fontWeight={900} fill={rupa === "diagram" ? "#F8FAFC" : UNGU}>
        {"→"}
      </text>
      {b.keping.map((k, i) => {
        const c = pusat(k.titik);
        const dx = (c.x - pc.x) * 0.22;
        const dy = (c.y - pc.y) * 0.22;
        return <Poli key={i} k={{ jenis: k.jenis, titik: geser(k.titik, dx, dy) }} i={i} rupa={rupa} />;
      })}
    </g>
  );
}
function GBayangan({ kind, rupa }: { kind: Gabung; rupa: Rupa }) {
  const g = gabung(kind, 150, 104, kind === "pendek" ? 36 : 40);
  return (
    <g>
      <Judul rupa={rupa} teks="bayangan ditutup keping" />
      <polygon points={poin(geser(g.luar, 4, 5))} fill={rupa === "diagram" ? "#020617" : "#78350F"} opacity={0.55} />
      {g.keping.map((k, i) => (
        <Poli key={i} k={k} i={i} rupa={rupa} />
      ))}
    </g>
  );
}
function GTumpuk({ rupa }: { rupa: Rupa }) {
  const g = gabung("kiriKanan", 150, 104, 40);
  const tindih = geser(g.keping[0].titik, 30, -6);
  return (
    <g>
      <Judul rupa={rupa} teks="dua keping ditumpuk" />
      <polygon points={poin(g.luar)} fill="none" stroke="#475569" strokeWidth={1.4} strokeDasharray="4 3" />
      {g.keping.map((k, i) => (
        <Poli key={i} k={k} i={i} rupa={rupa} />
      ))}
      <Poli k={{ jenis: "segitiga", titik: tindih }} i={3} rupa={rupa} g={{ merah: true }} />
    </g>
  );
}
/** Lembar kata dan lambang (Abstract): tabel dua kolom tanpa gambar benda atau bentuk. */
function Lambang({ l }: { l: LangkahDasar }) {
  const baris = barisLambang(l);
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-2xl border-4 border-dashed border-[#B45309] bg-[#FFFBEB] p-2" aria-label="Lembar petunjuk">
      <table className="w-full border-collapse text-sm font-black text-[#1C01A5]">
        <tbody>
          {baris.map(([a, b]) => (
            <tr key={a}>
              <td className="w-2/5 border-2 border-[#B45309]/60 bg-[#FEF3C7] px-2 py-1.5 align-top">{a}</td>
              <td className={`border-2 border-[#B45309]/60 bg-white px-2 py-1.5 align-top ${b === "?" ? "text-center text-xl text-[#DC2626]" : ""}`}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Gambar soal (tanpa kegiatan) untuk rupa benda dan diagram; Abstract memakai lembar kata. */
function Tampil({ l, rupa }: { l: LangkahDasar; rupa: Rupa }) {
  if (rupa === "lambang") return <Lambang l={l} />;
  const isi =
    l.tipe === "pola" ? <GUraian n={l.n} garis={l.dari} rupa={rupa} /> : l.tipe === "uraiNama" ? <GUraian n={l.n} garis={l.garis} rupa={rupa} /> : l.tipe === "gabungNama" ? <GGabung kind={l.kind} rupa={rupa} /> : l.tipe === "hitung" ? <GHitung l={l} rupa={rupa} /> : l.tipe === "lipat" ? <GLipat l={l} rupa={rupa} /> : l.tipe === "bayangan" ? <GBayangan kind={l.kind} rupa={rupa} /> : l.tipe === "tumpuk" ? <GTumpuk rupa={rupa} /> : null;
  return <Gambar label="Gambar keping" rupa={rupa}>{isi}</Gambar>;
}

/* ------------------------------ Kegiatan: menyusun keping ke bayangan ------------------------------ */
function Susun({ kind, rupa, salah, selesai, info }: PK & { kind: Gabung }) {
  const slot = useMemo(() => gabung(kind, 150, 62, kind === "pendek" ? 22 : 24), [kind]);
  const baki = useMemo(() => gabung(kind, 0, 0, 1).keping, [kind]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [k, setK] = useState(() => ({ ...awalPuzzle(), kind }));
  const [merah, setMerah] = useState(-1);
  const total = banyakGabung(kind);
  const pasang = (s: number) => {
    if (pilih === null) {
      info("Ketuk satu keping di bawah dulu, lalu ketuk bayangan tempatnya.");
      return;
    }
    const r = pasangKeping(k, pilih, s);
    if (r.ok) {
      setK(r.k);
      setPilih(null);
      setMerah(-1);
      if (r.k.terpasang.length === total) selesai(`Betul! Semua keping terpasang tanpa bertumpuk. Jadi ${NAMA_JENIS[HASIL_GABUNG[kind]]}.`);
      else info("Pas! Pasang keping berikutnya.");
    } else {
      setMerah(s);
      salah(k.terpasang.some((x) => x.s === s) ? "Tempat itu sudah terisi. Keping tidak boleh bertumpuk." : "Bentuk keping itu belum pas dengan bayangan di sini. Hitung banyak sisinya.");
    }
  };
  return (
    <Gambar label="Menyusun keping pada bayangan" rupa={rupa}>
      <Judul rupa={rupa} teks="ketuk keping, lalu ketuk bayangan" />
      {slot.keping.map((s, i) => {
        const isi = k.terpasang.find((x) => x.s === i);
        return (
          <g key={i} {...ketuk(() => pasang(i))} aria-label={`Tempat keping ${i + 1}`}>
            {isi ? <Poli k={s} i={isi.p} rupa={rupa} g={{ hijau: k.terpasang.length === total }} /> : <Poli k={s} i={i} rupa={rupa} g={{ kosong: true, putus: true, merah: merah === i }} />}
          </g>
        );
      })}
      {baki.map((b, p) => {
        const dipakai = k.terpasang.some((x) => x.p === p);
        const cx = 150 + (p - (baki.length - 1) / 2) * 64;
        if (dipakai) return null;
        return (
          <g key={p} {...ketuk(() => setPilih(p))} aria-label={`Keping ${p + 1}`}>
            <Poli k={kecil(b, cx, 158, 18)} i={p} rupa={rupa} g={{ sorot: pilih === p }} />
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Kegiatan: mengurutkan langkah ------------------------------ */
function Urut({ l, rupa, salah, selesai, info }: PK & { l: LangkahUrut }) {
  /** Urutan tombol diputar tetap (bukan acak) supaya langkah pertama tidak tampil paling atas. */
  const tampil = useMemo(() => l.langkah.map((_, i) => (i + 1) % l.langkah.length), [l.langkah]);
  const [sudah, setSudah] = useState<number[]>([]);
  const ketukLangkah = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === l.langkah.length) selesai("Betul! Urutan langkahnya sudah benar.");
      else info("Betul! Langkah berikutnya apa?");
    } else salah("Itu belum langkah berikutnya. Pikirkan apa yang dilakukan lebih dulu.");
  };
  return (
    <div className="space-y-2" role="group" aria-label="Urutkan langkah">
      {tampil.map((i) => {
        const nomor = sudah.indexOf(i);
        return (
          <button
            key={l.langkah[i]}
            type="button"
            onClick={() => ketukLangkah(i)}
            className={`flex min-h-[52px] w-full items-center gap-2 rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black ${nomor >= 0 ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : rupa === "diagram" ? "border-[#CBD5E1] bg-[#334155] text-[#F8FAFC]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-current text-xs">{nomor >= 0 ? nomor + 1 : "?"}</span>
            {l.langkah[i]}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function TombolBS({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)]">
      {teks}
    </button>
  );
}
function CariSalah({ l, rupa, salah, selesai, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geserAlasan = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geserAlasan) % 3);
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, pernyataan ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, pernyataan ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi gambarnya. ${l.keliru}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      selesai(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <Tampil l={l.dasar} rupa={rupa} />
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
          <p className="text-sm font-black text-[#1C01A5]">Pernyataan {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <TombolBS teks={"\u{2705} benar"} onClick={() => putus(true)} />
            <TombolBS teks={"\u{274C} salah"} onClick={() => putus(false)} />
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

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahPuzzle({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const d = dasarDari(l);
  const j = jawaban(l);
  const [selesaiS, setSelesaiS] = useState(false);
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
    setSelesaiS(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const pk: PK = { rupa, salah, selesai: tuntas, info };
  const pilihan = useMemo(() => buatPilihan(j && j.jenis === "angka" ? pilihanAngka(l) : [], j && j.jenis === "nama" ? pilihanNama(l) : [], rupa), [l, j, rupa]);
  const teksKunci = j ? (j.jenis === "angka" ? kata(j.nilai) : NAMA_JENIS[j.nilai]) : "";
  const kunciPilihan = j ? pilihan.find((p) => (j.jenis === "angka" ? p.angka === j.nilai : p.nama === j.nilai)) ?? null : null;
  const jawab = (p: PilihanJawab | null, dariSuara = false, ditunjukkan = false, terdengar?: string) => {
    if (!j) return;
    const benar = p !== null && (j.jenis === "angka" ? p.angka === j.nilai : p.nama === j.nilai);
    if (dariSuara && p) bicara(p.teks);
    if (benar || ditunjukkan) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(d)}`);
    else {
      if (p) setMati((m) => [...m, p.kunci]);
      salah(`${terdengar ? `Terdengar ${terdengar}. ` : ""}${petunjukSalah(l, p?.angka ?? p?.nama ?? "")}`);
    }
  };
  let isi: React.ReactNode;
  if (l.tipe === "salah") isi = <CariSalah {...pk} l={l} />;
  else if (l.tipe === "susun") isi = <Susun {...pk} kind={l.kind} />;
  else if (l.tipe === "urut") isi = <Urut {...pk} l={l} />;
  else isi = <Tampil l={l} rupa={rupa} />;
  return (
    <div className="space-y-3">
      <div className={goyang && !j ? "lm-goyang" : ""}>{isi}</div>
      {j && !selesaiS ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(d)}</p>
          {cara === "kanvas" && j.jenis === "angka" ? (
            <JawabTulis kunci={j.nilai} onBenar={(t) => jawab(kunciPilihan, false, t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraBentuk jawab={j} teksKunci={teksKunci} pilihan={pilihan} mati={mati} onJawab={(p, dengar, t, terdengar) => jawab(p, dengar, t, terdengar)} onPesan={setPesan} />
          ) : (
            <PilihanTeks pilihan={pilihan} mati={mati} onPilih={(p) => jawab(p)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesaiS ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
