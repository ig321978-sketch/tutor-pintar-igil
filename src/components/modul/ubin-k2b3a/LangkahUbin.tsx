"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  EMOJI_BENDA,
  INFO,
  NAMA_ZONA,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  namaBendaKe,
  petunjukBuru,
  petunjukSalah,
  petunjukVenn,
  pilihanNama,
  pilihanNamaDari,
  siapLangsung,
  sisiHitung,
  sisiPapan,
  zonaVenn,
  type Cara,
  type Kind,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type LBuru,
  type LHitung,
  type LPapan,
  type LVenn,
  type Rupa,
  type Zona,
} from "./logika-cpa";
import {
  LEBAR_ADEGAN,
  PUSAT_HITUNG,
  R_HITUNG,
  TINGGI_ADEGAN,
  VENN,
  WARNA_BENDA,
  bakiVenn,
  hurufPaku,
  jalurBentuk,
  pusatBuru,
  sisiTengah,
  tempatVenn,
  titikBentuk,
  titikPaku,
  warnaVenn,
} from "./periksa";
import { JawabSuaraUbin, PilihanNama, teksKunci } from "./JawabUbin";

/**
 * Satu soal CPA Kelas 2 Bab 3 Sub-Bab A: kegiatan metode (Tandai Awal Hitung Berputar: ketuk sisi berurutan; Geoboard: rentangkan karet pada paku; Venn Diagram:
 * pilah bentuk; Shape Hunt: ketuk benda berbentuk sasaran), soal Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab menurut caranya
 * (pilih nama, tulis satu angka di kanvas, atau ucapkan). Rupa: benda berwarna dengan emoji (Concrete), bentuk polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
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
/** Papan tulis hijau berisi kata dan lambang saja (Abstract). */
function Pernyataan({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="space-y-1 rounded-2xl border-4 border-[#92400E] bg-[#14532D] p-3 text-center">
      <p className="text-xs font-black uppercase tracking-wide text-[#FDE68A]">{judul}</p>
      {baris.map((b) => (
        <p key={b} className="text-base font-black text-white">
          {b}
        </p>
      ))}
    </div>
  );
}

/* ------------------------------ Bentuk ------------------------------ */
type Gaya = { sorot?: boolean; merah?: boolean; hijau?: boolean };
function Bangun({ kind, cx, cy, r, rupa, isi, rot = 0, ...g }: { kind: Kind; cx: number; cy: number; r: number; rupa: Rupa; isi?: string; rot?: number } & Gaya) {
  const d = jalurBentuk(kind, cx, cy, r, rot);
  const garis = g.hijau ? HIJAU : g.merah ? MERAH : g.sorot ? "#B45309" : rupa === "benda" ? COKLAT : UNGU;
  const tebal = g.hijau || g.merah || g.sorot ? 3.2 : rupa === "benda" ? 2.6 : 1.6;
  const warna = isi ?? (rupa === "benda" ? WARNA_BENDA[kind] : "#F8FAFC");
  return (
    <g>
      <path d={d} fill={warna} stroke={garis} strokeWidth={tebal} strokeLinejoin="round" />
      {rupa === "benda" ? <path d={jalurBentuk(kind, cx, cy, r * 0.7, rot)} fill="none" stroke="#FFFFFF" strokeOpacity={0.65} strokeWidth={1.2} strokeLinejoin="round" /> : null}
    </g>
  );
}
const namaKartu = (k: Kind): string => (INFO[k].lengkung && k !== "lingkaran" ? "lengkung" : INFO[k].nama);

/* ------------------------------ Metode IGIL: tandai awal, hitung berputar ------------------------------ */
function Hitung({ l, rupa, cara, diam, salah, siap }: PK & { l: LHitung }) {
  const n = sisiHitung(l);
  const [urut, setUrut] = useState<number[]>([]);
  const interaktif = cara === "klik" && !diam && rupa !== "lambang";
  if (rupa === "lambang")
    return cara === "kanvas" ? (
      <Pernyataan judul="Sebuah bentuk" baris={[`Namanya: ${INFO[l.bentuk].nama}`, "Tepinya lurus semua", "Tanda awal di sisi pertama"]} />
    ) : (
      <Pernyataan judul="Sebuah bentuk" baris={[`Banyak sisi: ${n}`, "Tepinya lurus semua", "Tanda awal di sisi pertama; hitung berputar sampai kembali ke tanda"]} />
    );
  const pts = titikBentuk(l.bentuk, PUSAT_HITUNG.x, PUSAT_HITUNG.y, R_HITUNG);
  const tanda = sisiTengah(pts, l.awal, 17);
  const berikut = (l.awal + urut.length) % n;
  const ketukSisi = (i: number) => {
    if (!interaktif || urut.length >= n) return;
    if (i === berikut) {
      const baru = [...urut, i];
      setUrut(baru);
      if (baru.length === n) siap(kalimatKunci(l, "klik"));
    } else if (urut.includes(i)) salah("Sisi itu sudah dihitung. Lanjut ke sisi di sebelahnya, ikuti arah putaran.");
    else salah(urut.length === 0 ? "Mulai dari sisi yang bertanda awal." : "Ikuti arah putaran: ketuk sisi di sebelah sisi yang terakhir dihitung.");
  };
  return (
    <Gambar label="Bentuk dengan sisi bertanda awal" judul={interaktif ? "ketuk sisi dari tanda awal, ikuti putaran" : "hitung sisi dari tanda awal"}>
      <Bangun kind={l.bentuk} cx={PUSAT_HITUNG.x} cy={PUSAT_HITUNG.y} r={R_HITUNG} rupa={rupa} hijau={urut.length === n} />
      {pts.map((a, i) => {
        const b = pts[(i + 1) % n];
        const sudah = urut.includes(i);
        const awal = i === l.awal;
        return (
          <g key={i}>
            {sudah || awal ? <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={sudah ? "#2563EB" : MERAH} strokeWidth={awal && !sudah ? 4.4 : 4} strokeLinecap="round" /> : null}
            {interaktif ? <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={20} strokeLinecap="round" {...ketuk(() => ketukSisi(i))} aria-label={`sisi ${i + 1}`} /> : null}
          </g>
        );
      })}
      {urut.map((s, q) => {
        const t = sisiTengah(pts, s, 13);
        return (
          <text key={s} x={t.x} y={t.y + 3.5} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1D4ED8">
            {q + 1}
          </text>
        );
      })}
      {rupa === "benda" ? (
        <text x={tanda.x} y={tanda.y + 5} textAnchor="middle" fontSize={16}>
          {"\u{1F6A9}"}
        </text>
      ) : (
        <text x={tanda.x} y={tanda.y + 3} textAnchor="middle" fontSize={9} fontWeight={900} fill={MERAH}>
          awal
        </text>
      )}
    </Gambar>
  );
}

/* ------------------------------ Geoboard: karet pada papan paku ------------------------------ */
function Papan({ l, rupa, cara, diam, salah, siap }: PK & { l: LPapan }) {
  const n = sisiPapan(l);
  const [pasang, setPasang] = useState(0);
  const interaktif = cara === "klik" && !diam && rupa !== "lambang";
  if (rupa === "lambang") {
    const huruf = l.paku.map((_, i) => hurufPaku(i)).join(", ");
    return <Pernyataan judul="Geoboard: papan paku" baris={[`Karet melewati paku ${huruf}`, `Lalu karet kembali ke paku ${hurufPaku(0)}`]} />;
  }
  const lengkap = interaktif ? pasang === n : true;
  const jumlah = interaktif ? pasang : n;
  const titik = l.paku.map(([c, r]) => titikPaku(c, r));
  const ketukPaku = (c: number, r: number) => {
    if (!interaktif || pasang >= n) return;
    const [bc, br] = l.paku[pasang];
    if (bc === c && br === r) {
      const baru = pasang + 1;
      setPasang(baru);
      if (baru === n) siap(kalimatKunci(l, "klik"));
    } else if (l.paku.slice(0, pasang).some(([pc, pr]) => pc === c && pr === r)) salah("Paku itu sudah dipasangi karet. Lanjut ke paku bernomor berikutnya.");
    else salah(`Ikuti nomor paku. Sekarang rentangkan karet ke paku bernomor ${kata(pasang + 1)}.`);
  };
  return (
    <Gambar label="Papan paku dengan karet" judul={interaktif ? "rentangkan karet sesuai nomor paku" : "karet pada papan paku"}>
      {rupa === "benda" ? <rect x={54} y={22} width={192} height={164} rx={10} fill="#FDE68A" stroke={COKLAT} strokeWidth={3} /> : null}
      {lengkap ? <path d={`M${titik.map((p) => `${p.x} ${p.y}`).join(" L")} Z`} fill={rupa === "benda" ? "rgba(249,115,22,0.25)" : "rgba(37,99,235,0.12)"} stroke="none" /> : null}
      {titik.map((p, i) => {
        const q = titik[(i + 1) % n];
        const tampak = i + 1 < jumlah || (lengkap && i === n - 1);
        return tampak ? <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={rupa === "benda" ? "#EA580C" : "#2563EB"} strokeWidth={rupa === "benda" ? 4 : 2.6} strokeLinecap="round" /> : null;
      })}
      {Array.from({ length: 25 }, (_, q) => {
        const c = q % 5;
        const r = Math.floor(q / 5);
        const p = titikPaku(c, r);
        const urutan = l.paku.findIndex(([pc, pr]) => pc === c && pr === r);
        const dipakai = urutan >= 0 && urutan < jumlah;
        return (
          <g key={q}>
            <circle cx={p.x} cy={p.y} r={dipakai ? 5 : 3.6} fill={rupa === "benda" ? (dipakai ? "#F59E0B" : "#A16207") : dipakai ? UNGU : "#64748B"} stroke={rupa === "benda" ? COKLAT : "none"} strokeWidth={1} />
            {interaktif && urutan >= 0 ? (
              <text x={p.x + 8} y={p.y - 5} fontSize={9} fontWeight={900} fill={MERAH}>
                {urutan + 1}
              </text>
            ) : null}
            {interaktif ? <circle cx={p.x} cy={p.y} r={15} fill="transparent" {...ketuk(() => ketukPaku(c, r))} aria-label={`paku kolom ${c + 1} baris ${r + 1}`} /> : null}
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Venn Diagram ------------------------------ */
function Venn({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LVenn }) {
  const interaktif = cara === "klik" && !diam;
  const [tempat, setTempat] = useState<(Zona | null)[]>(() => (interaktif ? l.isi.map(() => null) : l.isi.map(zonaVenn)));
  const [pilih, setPilih] = useState<number | null>(null);
  const warnaB = rupa === "diagram" ? "gelap" : "merah";
  const ke = (i: number): { x: number; y: number } => {
    const z = tempat[i];
    if (z) return tempatVenn(z, tempat.slice(0, i).filter((t) => t === z).length);
    const sisa = tempat.map((t, q) => (t === null ? q : -1)).filter((q) => q >= 0);
    return bakiVenn(sisa.indexOf(i), sisa.length);
  };
  const taruh = (z: Zona) => {
    if (pilih === null) {
      info("Ketuk satu bentuk dulu, lalu ketuk tempatnya.");
      return;
    }
    if (zonaVenn(l.isi[pilih]) !== z) {
      salah(petunjukVenn(l.isi[pilih], rupa));
      return;
    }
    const baru = tempat.map((t, i) => (i === pilih ? z : t));
    setTempat(baru);
    setPilih(null);
    if (baru.every((t) => t !== null)) siap(kalimatKunci(l, "klik"));
    else info("Betul! Ketuk bentuk berikutnya.");
  };
  return (
    <div className="space-y-2">
      <Gambar label="Diagram Venn" judul={interaktif ? "pilah ke diagram Venn" : "diagram Venn"}>
        <circle cx={VENN.kiri.x} cy={VENN.kiri.y} r={VENN.r} fill="rgba(59,130,246,0.13)" stroke="#2563EB" strokeWidth={2.2} />
        <circle cx={VENN.kanan.x} cy={VENN.kanan.y} r={VENN.r} fill={rupa === "diagram" ? "rgba(100,116,139,0.2)" : "rgba(248,113,113,0.16)"} stroke={rupa === "diagram" ? "#475569" : MERAH} strokeWidth={2.2} />
        <text x={96} y={38} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#1D4ED8">
          segi banyak
        </text>
        <text x={204} y={38} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={rupa === "diagram" ? "#475569" : MERAH}>
          {warnaB}
        </text>
        {l.isi.map((it, i) => {
          const c = ke(i);
          const dipilih = pilih === i;
          const bisa = interaktif && tempat[i] === null;
          return (
            <g key={i} {...(bisa ? ketuk(() => setPilih(dipilih ? null : i)) : {})} aria-label={`bentuk ${i + 1}`}>
              {rupa === "lambang" ? (
                <g>
                  <rect x={c.x - 24} y={c.y - 11} width={48} height={22} rx={5} fill="#FEF9C3" stroke={dipilih ? "#B45309" : UNGU} strokeWidth={dipilih ? 3 : 1.2} />
                  <text x={c.x} y={c.y - 1} textAnchor="middle" fontSize={6.6} fontWeight={900} fill={UNGU}>
                    {namaKartu(it.bentuk)}
                  </text>
                  <text x={c.x} y={c.y + 7} textAnchor="middle" fontSize={6.2} fontWeight={800} fill={it.merah ? MERAH : "#64748B"}>
                    {it.merah ? "merah" : "bukan merah"}
                  </text>
                </g>
              ) : (
                <>
                  {dipilih ? <circle cx={c.x} cy={c.y} r={17} fill="none" stroke="#B45309" strokeWidth={2.6} strokeDasharray="4 3" /> : null}
                  <Bangun kind={it.bentuk} cx={c.x} cy={c.y} r={11} rupa={rupa} isi={warnaVenn(it.merah, rupa)} />
                </>
              )}
            </g>
          );
        })}
      </Gambar>
      {interaktif ? (
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih tempat">
          {(["kiri", "tengah", "kanan", "luar"] as Zona[]).map((z) => (
            <Tombol key={z} teks={NAMA_ZONA[z].replace("merah", warnaB)} onClick={() => taruh(z)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Shape Hunt: berburu bentuk ------------------------------ */
function Buru({ l, rupa, cara, diam, salah, siap }: PK & { l: LBuru }) {
  const interaktif = cara === "klik" && !diam;
  const [ketemu, setKetemu] = useState<number[]>([]);
  const target = l.isi.map((k, i) => (k === l.sasaran ? i : -1)).filter((i) => i >= 0);
  const pilihBenda = (i: number) => {
    if (!interaktif || ketemu.includes(i)) return;
    if (l.isi[i] === l.sasaran) {
      const baru = [...ketemu, i];
      setKetemu(baru);
      if (baru.length === target.length) siap(kalimatKunci(l, "klik"));
    } else salah(petunjukBuru(l.isi[i], l.sasaran));
  };
  const judul = interaktif ? `ketuk semua ${INFO[l.sasaran].nama}` : cara === "kanvas" ? `hitung ${INFO[l.sasaran].nama}` : "benda di taman";
  if (rupa === "lambang")
    return (
      <div className="space-y-1.5 rounded-2xl border-4 border-[#92400E] bg-[#14532D] p-2" role="group" aria-label="Daftar benda di taman">
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#FDE68A]">{interaktif ? `Ketuk semua yang ${INFO[l.sasaran].nama}` : cara === "kanvas" ? `Hitung yang ${INFO[l.sasaran].nama}` : "Daftar benda di taman"}</p>
        {l.isi.map((k, i) => {
          const dapat = ketemu.includes(i);
          const baris = (
            <>
              <span>{cara === "suara" && !diam && i === l.sorot ? "\u{25B6} " : ""}{namaBendaKe(l.isi, i)}</span>
              <span>{INFO[k].lengkung ? "tepi lengkung" : `${INFO[k].sisi} sisi`}</span>
            </>
          );
          const gaya = `flex min-h-[40px] w-full items-center justify-between rounded-xl border-2 px-3 text-sm font-black ${dapat ? "border-[#FDE047] bg-[#166534] text-[#FDE047]" : "border-white/60 bg-[#166534]/60 text-white"}`;
          return interaktif ? (
            <button key={i} type="button" onClick={() => pilihBenda(i)} className={gaya}>
              {baris}
            </button>
          ) : (
            <div key={i} className={`${gaya} ${cara === "suara" && i === l.sorot ? "border-[#FDE047]" : ""}`}>
              {baris}
            </div>
          );
        })}
      </div>
    );
  return (
    <Gambar label="Benda di taman bermain" judul={judul}>
      {l.isi.map((k, i) => {
        const c = pusatBuru(i);
        const dapat = ketemu.includes(i);
        return (
          <g key={i} {...(interaktif ? ketuk(() => pilihBenda(i)) : {})} aria-label={namaBendaKe(l.isi, i)}>
            <rect x={c.x - 38} y={c.y - 36} width={76} height={72} rx={8} fill={dapat ? "#DCFCE7" : "#FFFBEB"} stroke={dapat ? HIJAU : "#D97706"} strokeWidth={dapat ? 3 : 1.2} strokeDasharray={rupa === "benda" ? undefined : "5 3"} />
            <Bangun kind={k} cx={c.x} cy={c.y - 6} r={21} rupa={rupa} hijau={dapat} />
            {rupa === "benda" ? (
              <text x={c.x} y={c.y + 1} textAnchor="middle" fontSize={15}>
                {EMOJI_BENDA[k]}
              </text>
            ) : null}
            {rupa === "benda" ? (
              <text x={c.x} y={c.y + 30} textAnchor="middle" fontSize={7.6} fontWeight={800} fill={UNGU}>
                {namaBendaKe(l.isi, i)}
              </text>
            ) : null}
            {cara === "suara" && !diam && i === l.sorot ? (
              <text x={c.x} y={c.y - 40} textAnchor="middle" fontSize={14} fill={MERAH}>
                {"\u{25BC}"}
              </text>
            ) : null}
          </g>
        );
      })}
    </Gambar>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  return l.tipe === "hitung" ? <Hitung {...props} l={l} /> : l.tipe === "papan" ? <Papan {...props} l={l} /> : l.tipe === "venn" ? <Venn {...props} l={l} /> : <Buru {...props} l={l} />;
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

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahUbin({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Abstract hitung dan papan (klik) serta semua soal kanvas dan suara langsung siap dijawab, tanpa kegiatan lebih dulu. */
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
  /** Satu-satunya jalur memeriksa jawaban: `j` nama atau angka yang dipilih, ditulis, atau diucapkan. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const nama = kunci?.jenis === "nama" ? kunci.nama : "";
  const pilihan = cara === "klik" ? pilihanNama(l) : nama ? pilihanNamaDari(nama) : [];
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraUbin kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : (
            <PilihanNama pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
