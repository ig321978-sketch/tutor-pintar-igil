"use client";

import React, { useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  dasarDari,
  kalimatJumlah,
  kata,
  kartuBagan,
  kembarDari,
  kePuluh,
  opsiKembar,
  opsiMulai,
  opsiPisah,
  opsiSatuan,
  opsiSisa,
  pasanganKembar,
  petunjukSalah,
  pilihanDari,
  satuan,
  sisaPuluh,
  type Cara,
  type Langkah,
  type LangkahBagan,
  type LangkahBelasan,
  type LangkahDasar,
  type LangkahKembar,
  type LangkahLompat,
  type LangkahMaju,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { EMOJI } from "./data";
import { BINGKAI, KARTU_KEMBAR, KOTAK_KELOMPOK, LEBAR_ADEGAN, TINGGI_ADEGAN, GARIS, letakIsi, letakKartuKembar, letakKelompok, letakSisa, periksaLingkari, petak, sel, xGaris, type Goresan } from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 6 Sub-Bab B: kegiatan metode (Metode IGIL: hitung maju dan belasan ditambah satuan; Doubles Plus One: kembar tambah satu;
 * Part-Whole Model: pisah supaya jadi sepuluh lalu susun langkah; Number Line Jumps: lompat menuju sepuluh dulu), soal Cari kesalahan
 * (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab dengan caranya.
 * Rupa: karcis, balon, kue, lampion, dan permen berwarna (Concrete), titik, kotak, bingkai, bagan, dan garis polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Cara menjawab bilangan sampai dua puluh memakai ulang Sub-Bab A Bab 5 (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const MERAH_MUDA = "#F87171";
const BIRU_MUDA = "#60A5FA";
const emoji = (j: string) => EMOJI[j] ?? EMOJI.karcis;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

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
const Judul = ({ teks }: { teks: string }) => (
  <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
);
const Tombol = ({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) => (
  <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
    {teks}
  </button>
);
const Perintah = ({ teks }: { teks: string }) => <p className="text-center text-sm font-black text-[#1C01A5]">{teks}</p>;
/** Satu benda: emoji (Concrete) atau titik polos (Pictorial) di titik (x, y). */
function Isi({ x, y, rupa, jenis, warna = MERAH_MUDA, tanda = false }: { x: number; y: number; rupa: Rupa; jenis: string; warna?: string; tanda?: boolean }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + 5} textAnchor="middle" fontSize={16} opacity={tanda ? 1 : 0.95}>
        {emoji(jenis)}
      </text>
    );
  if (rupa === "diagram") return <circle cx={x} cy={y} r={7} fill={warna} stroke={UNGU} strokeWidth={1.2} />;
  return null;
}
/** Kotak kelompok i (nol kiri, satu kanan) dengan angka di atasnya. */
function Kotak({ i, rupa, label, garis = UNGU }: { i: number; rupa: Rupa; label: number; garis?: string }) {
  const c = letakKelompok(i);
  return (
    <g aria-hidden="true">
      <rect x={c.x - KOTAK_KELOMPOK.w / 2} y={c.y - KOTAK_KELOMPOK.h / 2 - 4} width={KOTAK_KELOMPOK.w} height={KOTAK_KELOMPOK.h + 8} rx={rupa === "benda" ? 14 : 4} fill={rupa === "benda" ? "#FEF9C3" : "#FFFFFF"} stroke={garis} strokeWidth={2} />
      <text x={c.x} y={c.y - KOTAK_KELOMPOK.h / 2 - 10} textAnchor="middle" fontSize={13} fontWeight={900} fill={MERAH}>
        {label}
      </text>
    </g>
  );
}
/* ------------------------------ Metode IGIL: hitung maju dari bilangan sesudahnya ------------------------------ */
function Maju({ l, rupa, diam, salah, siap, info }: PK & { l: LangkahMaju }) {
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [mati, setMati] = useState<number[]>([]);
  const [tap, setTap] = useState<number[]>([]);
  const [chip, setChip] = useState<number>(0);
  const sebut = rupa === "lambang" ? chip : tap.length;
  const pilihMulai = (m: number) => {
    if (m === l.a + 1) {
      setTahap(1);
      info(`Betul, mulai dari ${kata(l.a + 1)}. Sekarang maju ${kata(l.b)} langkah.`);
    } else {
      setMati((s) => [...s, m]);
      salah(m === l.a ? `${besar(kata(l.a))} sudah ada di kepala, jangan disebut lagi. Hitung maju dimulai dari bilangan sesudahnya.` : `Terlalu jauh. Mulai tepat sesudah ${kata(l.a)}.`);
    }
  };
  const maju = (i?: number) => {
    if (tahap !== 1 || diam) return;
    if (i !== undefined && tap.includes(i)) return;
    const n = sebut + 1;
    if (i !== undefined) setTap((t) => [...t, i]);
    else setChip(n);
    if (n >= l.b) {
      setTahap(2);
      siap(kalimatJumlah(l));
    } else info(kata(l.a + n));
  };
  const gambar = (
    <g>
      <Judul teks={rupa === "lambang" ? "hitung maju" : "mulai dari bilangan sesudahnya"} />
      {rupa === "lambang" ? (
        <g>
          <text x={150} y={72} textAnchor="middle" fontSize={34} fontWeight={900} fill={UNGU}>
            {l.a} + {l.b}
          </text>
          <text x={150} y={112} textAnchor="middle" fontSize={15} fontWeight={900} fill={HIJAU}>
            {tahap === 0 ? "mulai dari ?" : `mulai dari ${l.a + 1}`}
          </text>
          <text x={150} y={150} textAnchor="middle" fontSize={16} fontWeight={900} fill={MERAH}>
            {tahap === 0 ? "" : Array.from({ length: sebut }, (_, i) => l.a + 1 + i).join(", ")}
          </text>
        </g>
      ) : (
        <g>
          <Kotak i={0} rupa={rupa} label={l.a} />
          <Kotak i={1} rupa={rupa} label={l.b} garis={HIJAU} />
          {Array.from({ length: l.a }, (_, i) => (
            <Isi key={`a${i}`} x={letakKelompok(0).x + letakIsi(i).x} y={letakKelompok(0).y + letakIsi(i).y} rupa={rupa} jenis={l.jenis} />
          ))}
          {Array.from({ length: l.b }, (_, i) => {
            const p = { x: letakKelompok(1).x + letakIsi(i).x, y: letakKelompok(1).y + letakIsi(i).y };
            const urutTap = tap.indexOf(i);
            return (
              <g key={`b${i}`} {...(tahap === 1 && !diam ? ketuk(() => maju(i)) : {})} aria-label={`ditambahkan ${kata(i + 1)}`}>
                <circle cx={p.x} cy={p.y} r={11} fill={urutTap >= 0 ? "#DCFCE7" : "transparent"} stroke={urutTap >= 0 ? HIJAU : "none"} strokeWidth={1.4} />
                <Isi x={p.x} y={p.y} rupa={rupa} jenis={l.jenis} warna={BIRU_MUDA} tanda={urutTap >= 0} />
                {urutTap >= 0 ? (
                  <text x={p.x} y={p.y - 13} textAnchor="middle" fontSize={9.5} fontWeight={900} fill={MERAH}>
                    {l.a + urutTap + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
          <text x={150} y={176} textAnchor="middle" fontSize={14} fontWeight={900} fill={HIJAU}>
            {tahap === 0 ? "mulai dari ?" : `mulai dari ${l.a + 1}${sebut > 0 ? `, sekarang ${l.a + sebut}` : ""}`}
          </text>
        </g>
      )}
    </g>
  );
  if (diam) return <Gambar label="Hitung maju">{gambar}</Gambar>;
  return (
    <div className="space-y-2">
      <Gambar label={rupa === "lambang" ? "Hitung maju dengan bilangan" : "Dua kumpulan untuk dihitung maju"}>{gambar}</Gambar>
      {tahap === 0 ? (
        <div className="space-y-1">
          <Perintah teks="Hitung maju dimulai dari bilangan berapa?" />
          <PilihanIkan pilihan={opsiMulai(l)} rupa={rupa} mati={mati} onPilih={pilihMulai} />
        </div>
      ) : tahap === 1 ? (
        <div className="space-y-1 text-center">
          <Perintah teks={rupa === "lambang" ? "Maju satu langkah tiap tekan." : "Ketuk benda di kotak kanan satu per satu."} />
          {rupa === "lambang" ? <Tombol teks="Maju satu" onClick={() => maju()} /> : null}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Metode IGIL: belasan ditambah satuan ------------------------------ */
function Belasan({ l, rupa, diam, salah, siap, info }: PK & { l: LangkahBelasan }) {
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [mati, setMati] = useState<number[]>([]);
  const [matiP, setMatiP] = useState<string[]>([]);
  const u = satuan(l.a);
  const s = u + l.b;
  const pilihPuluhan = (tetap: boolean) => {
    if (tetap) {
      setTahap(1);
      info("Betul, puluhannya tetap. Sekarang jumlahkan satuannya.");
    } else {
      setMatiP((m) => [...m, "bertambah"]);
      salah("Yang ditambahkan hanya satuan. Puluhannya tidak ikut bertambah.");
    }
  };
  const pilihSatuan = (m: number) => {
    if (m === s) {
      setTahap(2);
      siap(kalimatJumlah(l));
    } else {
      setMati((x) => [...x, m]);
      salah(m === u ? "Itu satuan yang tadi. Jumlahkan dengan yang ditambahkan." : m < s ? "Masih kurang. Hitung lagi satuannya." : "Terlalu banyak. Hitung lagi satuannya.");
    }
  };
  const gambar = (
    <g>
      <Judul teks="puluhan tetap, jumlahkan satuannya" />
      {rupa === "lambang" ? (
        <g>
          <text x={150} y={66} textAnchor="middle" fontSize={32} fontWeight={900} fill={UNGU}>
            {l.a} + {l.b}
          </text>
          <text x={150} y={102} textAnchor="middle" fontSize={15} fontWeight={900} fill={HIJAU}>
            {l.a} = 1 puluhan + {u} satuan
          </text>
          <text x={150} y={136} textAnchor="middle" fontSize={15} fontWeight={900} fill={MERAH}>
            {tahap >= 1 ? `puluhan tetap 1` : "puluhan ?"}
          </text>
          <text x={150} y={168} textAnchor="middle" fontSize={15} fontWeight={900} fill={MERAH}>
            {tahap >= 2 ? `${u} + ${l.b} = ${s}` : `${u} + ${l.b} = ?`}
          </text>
        </g>
      ) : (
        <g>
          <Kotak i={0} rupa={rupa} label={l.a} />
          <Kotak i={1} rupa={rupa} label={l.b} garis={HIJAU} />
          <rect x={letakKelompok(0).x - 54} y={letakKelompok(0).y - 36} width={108} height={46} rx={rupa === "benda" ? 10 : 2} fill="none" stroke={UNGU} strokeWidth={1.6} strokeDasharray="4 3" />
          {Array.from({ length: l.a }, (_, i) => (
            <Isi key={`a${i}`} x={letakKelompok(0).x + letakIsi(i).x} y={letakKelompok(0).y + letakIsi(i).y} rupa={rupa} jenis={l.jenis} />
          ))}
          {Array.from({ length: l.b }, (_, i) => (
            <Isi key={`b${i}`} x={letakKelompok(1).x + letakIsi(i).x} y={letakKelompok(1).y + letakIsi(i).y} rupa={rupa} jenis={l.jenis} warna={BIRU_MUDA} />
          ))}
          <text x={150} y={176} textAnchor="middle" fontSize={13} fontWeight={900} fill={HIJAU}>
            {tahap >= 2 ? `satuan ${u} + ${l.b} = ${s}, puluhan tetap` : tahap === 1 ? "puluhan tetap, jumlahkan satuan" : "ikatan sepuluh = 1 puluhan"}
          </text>
        </g>
      )}
    </g>
  );
  if (diam) return <Gambar label="Belasan ditambah satuan">{gambar}</Gambar>;
  return (
    <div className="space-y-2">
      <Gambar label={rupa === "lambang" ? "Belasan ditambah satuan dengan bilangan" : "Belasan dan satuan yang ditambahkan"}>{gambar}</Gambar>
      {tahap === 0 ? (
        <div className="space-y-1 text-center">
          <Perintah teks="Puluhannya tetap atau bertambah?" />
          <div className="flex justify-center gap-2">
            <Tombol teks="bertambah" mati={matiP.includes("bertambah")} onClick={() => pilihPuluhan(false)} />
            <Tombol teks="tetap" onClick={() => pilihPuluhan(true)} />
          </div>
        </div>
      ) : tahap === 1 ? (
        <div className="space-y-1">
          <Perintah teks="Berapa jumlah satuannya?" />
          <PilihanIkan pilihan={opsiSatuan(l)} rupa={rupa} mati={mati} onPilih={pilihSatuan} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Doubles Plus One: kembar tambah satu ------------------------------ */
function KartuKembar({ i, v, rupa, jenis, tanda }: { i: number; v: number; rupa: Rupa; jenis: string; tanda: "biasa" | "pilih" | "benar" | "salah" }) {
  const c = letakKartuKembar(i);
  const garis = tanda === "benar" ? HIJAU : tanda === "salah" ? MERAH : tanda === "pilih" ? "#B45309" : UNGU;
  return (
    <g>
      <rect x={c.x - KARTU_KEMBAR.w / 2} y={c.y - KARTU_KEMBAR.h / 2} width={KARTU_KEMBAR.w} height={KARTU_KEMBAR.h} rx={rupa === "lambang" ? 10 : rupa === "benda" ? 12 : 3} fill={tanda === "benar" ? "#DCFCE7" : tanda === "pilih" ? "#FEF3C7" : tanda === "salah" ? "#FEE2E2" : rupa === "benda" ? "#FEF9C3" : "#FFFFFF"} stroke={garis} strokeWidth={tanda === "biasa" ? 2 : 3.5} />
      {rupa === "benda" ? (
        <text x={c.x} y={c.y - 14} textAnchor="middle" fontSize={20}>
          {emoji(jenis)}
        </text>
      ) : null}
      <text x={c.x} y={c.y + (rupa === "benda" ? 22 : 10)} textAnchor="middle" fontSize={rupa === "benda" ? 22 : 30} fontWeight={900} fill={UNGU}>
        {v}
      </text>
    </g>
  );
}

function KembarPilih({ l, rupa, cara, diam, salah, siap }: PK & { l: LangkahKembar }) {
  const kartu = l.kartu ?? [];
  const benar = pasanganKembar(kartu) ?? [0, 1];
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const ketukKartu = (i: number) => {
    if (selesai || cara === "kanvas" || diam) return;
    const baru = dipilih.includes(i) ? dipilih.filter((x) => x !== i) : [...dipilih, i];
    if (baru.length < 2) {
      setDipilih(baru);
      return;
    }
    if (baru.includes(benar[0]) && baru.includes(benar[1])) {
      setDipilih(baru);
      setSelesai(true);
      siap(kalimatJumlah({ ...l, kartu: kartu }));
    } else {
      setDipilih([]);
      salah("Dua kartu itu selisihnya bukan satu. Cari dua bilangan yang berdekatan, selisihnya hanya satu.");
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, kartu.map((_, i) => letakKartuKembar(i)), kartu.map((_, i) => benar.includes(i)));
    if (r.benar) {
      setSelesai(true);
      siap(kalimatJumlah({ ...l, kartu: kartu }));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 && r.kurang > 0 ? "Ada kartu yang salah dilingkari, dan dua kartu yang selisihnya satu belum lengkap. Lingkari dua kartu yang berdekatan." : r.lebih > 0 ? "Lingkari hanya dua kartu yang selisihnya satu." : "Masih ada kartu kembar yang belum dilingkari. Cari dua bilangan yang selisihnya satu.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={cara === "kanvas" ? "lingkari dua kartu yang selisihnya satu" : "ketuk dua kartu yang selisihnya satu"} />
      {kartu.map((v, i) => (
        <g key={i} {...(cara === "kanvas" || diam ? {} : ketuk(() => ketukKartu(i)))} aria-label={`kartu ${kata(v)}`}>
          <KartuKembar i={i} v={v} rupa={rupa} jenis={l.jenis} tanda={selesai && benar.includes(i) ? "benar" : dipilih.includes(i) ? "pilih" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (diam) return <Gambar label="Empat kartu bilangan">{gambar}</Gambar>;
  if (cara === "kanvas") return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Empat kartu bilangan, pilih dua yang selisihnya satu">{gambar}</Gambar>;
}

function Kembar({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LangkahKembar }) {
  const d = kembarDari(l);
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [mati, setMati] = useState<number[]>([]);
  const [salahKartu, setSalahKartu] = useState(-1);
  if (l.kartu) return <KembarPilih l={l} rupa={rupa} cara={cara} diam={diam} salah={salah} siap={siap} info={info} />;
  const ketukKelompok = (i: number) => {
    if (tahap !== 0 || diam) return;
    const v = i === 0 ? l.a : l.b;
    if (v === d) {
      setSalahKartu(-1);
      setTahap(1);
      info(`Betul, ${kata(d)} yang menjadi kembar. ${besar(kata(d))} ditambah ${kata(d)}.`);
    } else {
      setSalahKartu(i);
      salah("Kembar itu dua bilangan yang sama. Pakai bilangan yang lebih kecil, yang satunya lebih satu.");
    }
  };
  const pilihKembar = (m: number) => {
    if (m === 2 * d) {
      setTahap(2);
      siap(kalimatJumlah(l));
    } else {
      setMati((x) => [...x, m]);
      salah(m < 2 * d ? "Itu kurang. Kembar berarti bilangan yang sama ditambahkan dua kali." : "Itu terlalu banyak. Tambahkan bilangan yang sama saja, tanpa tambahan satu.");
    }
  };
  const gambar = (
    <g>
      <Judul teks="kembar tambah satu" />
      {rupa === "lambang" ? (
        <g>
          {[l.a, l.b].map((v, i) => (
            <g key={i} {...(tahap === 0 && !diam ? ketuk(() => ketukKelompok(i)) : {})} aria-label={`bilangan ${kata(v)}`}>
              <KartuKembar i={i === 0 ? 1 : 2} v={v} rupa={rupa} jenis={l.jenis} tanda={salahKartu === i ? "salah" : tahap >= 1 && v === d ? "benar" : "biasa"} />
            </g>
          ))}
          <text x={150} y={176} textAnchor="middle" fontSize={15} fontWeight={900} fill={HIJAU}>
            {tahap >= 2 ? `${d} + ${d} = ${2 * d}, tambah 1 jadi ${l.a + l.b}` : tahap === 1 ? `kembar ${d} + ${d} = ?` : "mana yang kembar?"}
          </text>
        </g>
      ) : (
        <g>
          {[l.a, l.b].map((v, i) => (
            <g key={i} {...(tahap === 0 && !diam ? ketuk(() => ketukKelompok(i)) : {})} aria-label={`kumpulan ${kata(v)}`}>
              <Kotak i={i} rupa={rupa} label={v} garis={salahKartu === i ? MERAH : tahap >= 1 && v === d ? HIJAU : UNGU} />
              {Array.from({ length: v }, (_, j) => (
                <Isi key={j} x={letakKelompok(i).x + letakIsi(j).x * 1.3} y={letakKelompok(i).y + letakIsi(j).y} rupa={rupa} jenis={l.jenis} warna={j < d ? MERAH_MUDA : "#FBBF24"} />
              ))}
            </g>
          ))}
          <text x={150} y={176} textAnchor="middle" fontSize={14} fontWeight={900} fill={HIJAU}>
            {tahap >= 2 ? `kembar ${d} + ${d} = ${2 * d}, tambah 1 jadi ${l.a + l.b}` : tahap === 1 ? `kembar ${d} + ${d} = ?` : "mana yang kembar?"}
          </text>
        </g>
      )}
    </g>
  );
  if (diam) return <Gambar label="Dua bilangan yang selisih satu">{gambar}</Gambar>;
  return (
    <div className="space-y-2">
      <Gambar label="Dua bilangan yang selisih satu">{gambar}</Gambar>
      {tahap === 0 ? <Perintah teks="Ketuk bilangan yang menjadi kembar, yaitu yang lebih kecil." /> : null}
      {tahap === 1 ? (
        <div className="space-y-1">
          <Perintah teks="Berapa hasil kembarnya?" />
          <PilihanIkan pilihan={opsiKembar(l)} rupa={rupa} mati={mati} onPilih={pilihKembar} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Part-Whole Model: pisah supaya jadi sepuluh, lalu susun langkah ------------------------------ */
/** Urutan tampil kartu langkah (diputar tetap, bukan urutan yang benar). */
const URUT_TAMPIL = [2, 0, 1];
function Bagan({ l, rupa, diam, salah, siap, info }: PK & { l: LangkahBagan }) {
  const c = kePuluh(l);
  const r = sisaPuluh(l);
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [mati, setMati] = useState<number[]>([]);
  const [urut, setUrut] = useState<number[]>([]);
  const kartu = kartuBagan(l);
  const pilihPisah = (m: number) => {
    if (m === c) {
      setTahap(1);
      info(`Betul, ${kata(c)}. ${besar(kata(l.a))} ditambah ${kata(c)} sama dengan sepuluh. Sekarang susun langkahnya.`);
    } else {
      setMati((x) => [...x, m]);
      salah(m < c ? `Belum sepuluh. Berapa lagi dari ${kata(l.a)} menuju sepuluh?` : `Lewat dari sepuluh. Berapa lagi dari ${kata(l.a)} menuju sepuluh?`);
    }
  };
  const ketukKartu = (i: number) => {
    if (tahap !== 1 || diam || urut.includes(i)) return;
    if (i !== urut.length) {
      salah(i === 2 ? "Itu langkah terakhir. Genapkan sepuluh dulu." : "Langkah ini belum waktunya. Genapkan sepuluh dulu, lalu lihat sisanya, lalu tambahkan.");
      return;
    }
    const baru = [...urut, i];
    setUrut(baru);
    if (baru.length === 3) {
      setTahap(2);
      siap(kalimatJumlah(l));
    } else info(baru.length === 1 ? `Sisanya ${kata(r)}.` : "Lalu tambahkan sisanya pada sepuluh.");
  };
  const pindah = tahap >= 1;
  const gambar = (
    <g>
      <Judul teks={rupa === "lambang" ? "pisahkan, genapkan sepuluh" : "genapkan sepuluh dulu"} />
      {rupa === "lambang" ? (
        <g>
          <text x={150} y={64} textAnchor="middle" fontSize={32} fontWeight={900} fill={UNGU}>
            {l.a} + {l.b}
          </text>
          <text x={150} y={100} textAnchor="middle" fontSize={15} fontWeight={900} fill={HIJAU}>
            {l.b} dipisah menjadi {pindah ? c : "?"} dan {pindah ? r : "?"}
          </text>
          <text x={150} y={134} textAnchor="middle" fontSize={15} fontWeight={900} fill={MERAH}>
            {pindah ? `${l.a} + ${c} = 10` : `${l.a} + ? = 10`}
          </text>
        </g>
      ) : rupa === "diagram" ? (
        <g>
          <text x={52} y={76} textAnchor="middle" fontSize={26} fontWeight={900} fill={UNGU}>
            {l.a}
          </text>
          <text x={52} y={96} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
            bilangan pertama
          </text>
          <line x1={150} x2={100} y1={78} y2={104} stroke={UNGU} strokeWidth={2} />
          <line x1={150} x2={200} y1={78} y2={104} stroke={UNGU} strokeWidth={2} />
          {[{ x: 150, y: 60, t: l.b, w: "#FEF9C3" }, { x: 100, y: 120, t: pindah ? c : "?", w: "#DCFCE7" }, { x: 200, y: 120, t: pindah ? r : "?", w: "#DBEAFE" }].map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r={19} fill={b.w} stroke={UNGU} strokeWidth={2.2} />
              <text x={b.x} y={b.y + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill={MERAH}>
                {b.t}
              </text>
            </g>
          ))}
          <text x={150} y={170} textAnchor="middle" fontSize={14} fontWeight={900} fill={HIJAU}>
            {pindah ? `${l.a} + ${c} = 10` : `${l.a} + ? = 10`}
          </text>
        </g>
      ) : (
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={sel(i).x - BINGKAI.sel / 2} y={sel(i).y - BINGKAI.sel / 2} width={BINGKAI.sel} height={BINGKAI.sel} fill={i < l.a + (pindah ? c : 0) ? "#FEF9C3" : "#FFFFFF"} stroke={UNGU} strokeWidth={1.4} rx={3} />
          ))}
          {Array.from({ length: l.a + (pindah ? c : 0) }, (_, i) => (
            <Isi key={`f${i}`} x={sel(i).x} y={sel(i).y} rupa={rupa} jenis={l.jenis} warna={i < l.a ? MERAH_MUDA : "#34D399"} />
          ))}
          {Array.from({ length: pindah ? r : l.b }, (_, i) => (
            <Isi key={`s${i}`} x={letakSisa(i).x} y={letakSisa(i).y} rupa={rupa} jenis={l.jenis} warna={BIRU_MUDA} />
          ))}
          <text x={BINGKAI.x + 50} y={BINGKAI.y - 6} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
            bingkai sepuluh
          </text>
          <text x={216} y={BINGKAI.y - 6} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
            yang ditambahkan: {l.b}
          </text>
        </g>
      )}
    </g>
  );
  if (diam) return <Gambar label="Bagan bagian dan keseluruhan">{gambar}</Gambar>;
  return (
    <div className="space-y-2">
      <Gambar label={rupa === "benda" ? "Bingkai sepuluh dan benda yang ditambahkan" : rupa === "diagram" ? "Bagan bagian dan keseluruhan" : "Pisahkan bilangan dengan angka"}>{gambar}</Gambar>
      {tahap === 0 ? (
        <div className="space-y-1">
          <Perintah teks="Pisahkan yang ditambahkan. Berapa yang menggenapkan bilangan pertama menjadi sepuluh?" />
          <PilihanIkan pilihan={opsiPisah(l)} rupa={rupa} mati={mati} onPilih={pilihPisah} />
        </div>
      ) : tahap === 1 ? (
        <div className="space-y-1.5" role="group" aria-label="Susun langkah">
          <Perintah teks="Ketuk langkah-langkah ini berurutan, dari yang pertama." />
          {URUT_TAMPIL.map((i) => (
            <button key={i} type="button" disabled={urut.includes(i)} onClick={() => ketukKartu(i)} className="block min-h-[44px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-base font-black text-[#1C01A5] disabled:border-[#15803D] disabled:bg-[#DCFCE7]">
              {urut.includes(i) ? `${urut.indexOf(i) + 1}. ` : ""}
              {kartu[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Number Line Jumps: lompat menuju sepuluh dulu ------------------------------ */
function Lompat({ l, rupa, diam, salah, siap, info }: PK & { l: LangkahLompat }) {
  const c = kePuluh(l);
  const r = sisaPuluh(l);
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [mati, setMati] = useState<number[]>([]);
  const posisi = tahap === 0 ? l.a : tahap === 1 ? 10 : l.a + l.b;
  const pilihPertama = (m: number) => {
    if (m === c) {
      setTahap(1);
      setMati([]);
      info(`Betul, lompat ${kata(c)} sampai sepuluh. Sekarang lompat lagi.`);
    } else {
      setMati((x) => [...x, m]);
      salah(m < c ? `Belum sampai sepuluh. Berapa langkah dari ${kata(l.a)} menuju sepuluh?` : `Melewati sepuluh. Berapa langkah dari ${kata(l.a)} menuju sepuluh?`);
    }
  };
  const pilihKedua = (m: number) => {
    if (m === r) {
      setTahap(2);
      siap(kalimatJumlah(l));
    } else {
      setMati((x) => [...x, m]);
      salah(m === c ? "Itu lompatan yang pertama. Lompatan kedua sebanyak sisanya dari yang ditambahkan." : m < r ? "Lompatan kedua belum cukup jauh. Lompat sebanyak sisanya." : "Terlalu jauh. Lompat sebanyak sisanya saja.");
    }
  };
  const gambar = (
    <g>
      <Judul teks="lompat menuju sepuluh dulu" />
      {rupa === "benda" ? (
        <g>
          <text x={150} y={38} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
            mulai di petak ke {l.a}, tambah {l.b}
          </text>
          {Array.from({ length: 20 }, (_, i) => {
            const p = petak(i + 1);
            const lalu = i + 1 <= posisi;
            return (
              <g key={i} aria-hidden="true">
                <rect x={p.x - 12} y={p.y - 12} width={24} height={24} rx={6} fill={i + 1 === 10 ? "#FDE68A" : lalu ? "#DCFCE7" : "#FFFFFF"} stroke={i + 1 === 10 ? "#B45309" : UNGU} strokeWidth={i + 1 === 10 ? 2.4 : 1.2} />
                <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={14} opacity={i + 1 === l.a || i + 1 === posisi ? 0.4 : 1}>
                  {emoji(l.jenis)}
                </text>
              </g>
            );
          })}
          <text x={petak(posisi).x} y={petak(posisi).y - 14} textAnchor="middle" fontSize={20}>
            {"\u{1F438}"}
          </text>
          <text x={150} y={176} textAnchor="middle" fontSize={13} fontWeight={900} fill={HIJAU}>
            {tahap === 0 ? "katak di petak awal" : tahap === 1 ? `katak di petak sepuluh, lompat lagi ${r}` : `katak mendarat di petak ${l.a + l.b}`}
          </text>
        </g>
      ) : rupa === "diagram" ? (
        <g>
          <line x1={GARIS.x0} x2={GARIS.x1} y1={GARIS.y} y2={GARIS.y} stroke={UNGU} strokeWidth={2} />
          {Array.from({ length: 21 }, (_, n) => (
            <g key={n}>
              <line x1={xGaris(n)} x2={xGaris(n)} y1={GARIS.y - (n % 5 ? 3 : 6)} y2={GARIS.y + (n % 5 ? 3 : 6)} stroke={UNGU} strokeWidth={1} />
              {n % 5 === 0 || n === l.a || n === l.a + l.b ? (
                <text x={xGaris(n)} y={GARIS.y + 18} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={n === 10 ? MERAH : UNGU}>
                  {n}
                </text>
              ) : null}
            </g>
          ))}
          <circle cx={xGaris(l.a)} cy={GARIS.y} r={5} fill={HIJAU} />
          {tahap >= 1 ? <path d={`M ${xGaris(l.a)} ${GARIS.y - 4} Q ${(xGaris(l.a) + xGaris(10)) / 2} ${GARIS.y - 30} ${xGaris(10)} ${GARIS.y - 4}`} fill="none" stroke={MERAH} strokeWidth={2.2} /> : null}
          {tahap >= 2 ? <path d={`M ${xGaris(10)} ${GARIS.y - 4} Q ${(xGaris(10) + xGaris(l.a + l.b)) / 2} ${GARIS.y - 30} ${xGaris(l.a + l.b)} ${GARIS.y - 4}`} fill="none" stroke="#7C3AED" strokeWidth={2.2} /> : null}
          <circle cx={xGaris(posisi)} cy={GARIS.y} r={5.5} fill="#FBA919" stroke={UNGU} strokeWidth={1.4} />
          <text x={150} y={62} textAnchor="middle" fontSize={22} fontWeight={900} fill={UNGU}>
            {l.a} + {l.b}
          </text>
          <text x={150} y={176} textAnchor="middle" fontSize={13} fontWeight={900} fill={HIJAU}>
            {tahap === 0 ? "mulai dari bilangan pertama" : tahap === 1 ? `sampai 10, sisa ${r}` : `mendarat di ${l.a + l.b}`}
          </text>
        </g>
      ) : (
        <g>
          <text x={150} y={64} textAnchor="middle" fontSize={32} fontWeight={900} fill={UNGU}>
            {l.a} + {l.b}
          </text>
          <text x={150} y={106} textAnchor="middle" fontSize={17} fontWeight={900} fill={HIJAU}>
            {l.a} → {tahap >= 1 ? 10 : "?"} → {tahap >= 2 ? l.a + l.b : "?"}
          </text>
          <text x={150} y={142} textAnchor="middle" fontSize={14} fontWeight={900} fill={MERAH}>
            {tahap === 0 ? "lompatan pertama ?" : tahap === 1 ? `lompatan pertama ${c}, kedua ?` : `lompatan ${c} dan ${r}`}
          </text>
        </g>
      )}
    </g>
  );
  if (diam) return <Gambar label="Lompat di garis bilangan">{gambar}</Gambar>;
  return (
    <div className="space-y-2">
      <Gambar label={rupa === "benda" ? "Katak melompat di petak lampion" : rupa === "diagram" ? "Garis bilangan dan lompatan" : "Lompatan dengan angka"}>{gambar}</Gambar>
      {tahap === 0 ? (
        <div className="space-y-1">
          <Perintah teks="Lompat menuju sepuluh dulu. Berapa langkah?" />
          <PilihanIkan pilihan={opsiPisah(l)} rupa={rupa} mati={mati} onPilih={pilihPertama} />
        </div>
      ) : tahap === 1 ? (
        <div className="space-y-1">
          <Perintah teks="Lompat lagi dari sepuluh. Berapa langkah?" />
          <PilihanIkan pilihan={opsiSisa(l)} rupa={rupa} mati={mati} onPilih={pilihKedua} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "maju" ? <Maju {...props} l={l} /> : l.tipe === "belasan" ? <Belasan {...props} l={l} /> : l.tipe === "kembar" ? <Kembar {...props} l={l} /> : l.tipe === "bagan" ? <Bagan {...props} l={l} /> : <Lompat {...props} l={l} />;
}

function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar) salah(`Lihat lagi. ${l.keliru}`);
    else {
      setTahap("alasan");
      info(`Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    }
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
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo; Jawabanku {l.jawabTokoh}.
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
export function LangkahKarcis({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
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
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    bicara(kata(m));
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${petunjukSalah(l, m)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const d = dasarDari(l);
  const tanya = d.tipe === "kembar" && d.kartu ? "" : "Berapa jumlahnya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanIkan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
