"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import {
  KARTU_KATA,
  NAMA_BENTUK,
  NAMA_PENDEK,
  TEKS_SYARAT,
  angkaJawab,
  benarMisteri,
  kata,
  memenuhi,
  pilihanDari,
  sasaranBuru,
  sasaranKantong,
  type Benda,
  type Langkah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { EMOJI, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  JARI_PETAK,
  JARI_PILIHAN,
  KANTONG,
  KOLOM_PAKU,
  BARIS_PAKU,
  LEBAR_ADEGAN,
  PUSAT_CIRI,
  TINGGI_ADEGAN,
  jalurPoligon,
  jariCiri,
  jariLengkung,
  letakKantong,
  letakMejaKanan,
  letakPaku,
  letakPetak,
  letakPilihan,
  periksaCentang,
  periksaLingkari,
  sudutBenda,
  tengahSisi,
  type Goresan,
  type Titik,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 4 Sub-Bab A: kegiatan metode (Metode IGIL menghitung sisi lurus dan sudut, Shape Hunt berburu bentuk,
 * Geoboard papan paku, Mystery Shape bentuk misterius dan kantong misterius), lalu menjawab banyaknya dengan caranya.
 * Rupa: barang bekas berwarna (Concrete), bangun garis polos (Pictorial), kata dan angka saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const HIJAU = "#15803D";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama benda untuk pembaca layar (tanpa memberi tahu bentuknya di Concrete dan Pictorial). */
const namaUntuk = (b: Benda, rupa: Rupa) => (rupa === "lambang" ? KARTU_KATA[b.jenis]?.teks ?? NAMA_PENDEK[b.bentuk] : rupa === "benda" ? NAMA_BENDA[b.jenis] ?? "benda" : "bangun");

/** Satu benda: barang bekas berwarna (benda), bangun polos bergaris (diagram), atau kartu kata (lambang). */
function Bangun({ b, rupa, x, y, r, tanda = "biasa" }: { b: Benda; rupa: Rupa; x: number; y: number; r: number; tanda?: "biasa" | "pilih" | "pudar" }) {
  const op = tanda === "pudar" ? 0.3 : 1;
  const garisPilih = tanda === "pilih" ? HIJAU : undefined;
  if (rupa === "lambang") {
    const t = KARTU_KATA[b.jenis]?.teks ?? NAMA_PENDEK[b.bentuk];
    const w = Math.max(48, t.length * 7.4 + 12);
    return (
      <g opacity={op}>
        <rect x={x - w / 2} y={y - 15} width={w} height={30} rx={8} fill={tanda === "pilih" ? "#BBF7D0" : "#FFFFFF"} stroke={garisPilih ?? UNGU} strokeWidth={tanda === "pilih" ? 3 : 1.8} />
        <text x={x} y={y + 5} textAnchor="middle" fontSize={12.5} fontWeight={900} fill={UNGU}>
          {t}
        </text>
      </g>
    );
  }
  const rr = r * (b.skala === 1 ? 0.72 : b.skala === 3 ? 1.12 : 1);
  const [isi, garis] = rupa === "benda" ? WARNA_BENDA[b.jenis] ?? ["#E0E7FF", UNGU] : ["#EEF2FF", UNGU];
  const tebal = rupa === "benda" ? 3 : 2;
  const bentuk =
    b.bentuk === "lengkung" ? (
      (() => {
        const j = jariLengkung(b, rr);
        return <ellipse cx={x} cy={y} rx={j.rx} ry={j.ry} transform={`rotate(${b.putar ?? 0} ${x} ${y})`} fill={isi} stroke={garisPilih ?? garis} strokeWidth={garisPilih ? 4 : tebal} />;
      })()
    ) : (
      <path d={jalurPoligon(sudutBenda(b, x, y, rr))} fill={isi} stroke={garisPilih ?? garis} strokeWidth={garisPilih ? 4 : tebal} strokeLinejoin="round" />
    );
  return (
    <g opacity={op}>
      {bentuk}
      {rupa === "benda" && b.bentuk === "lengkung" && b.jenis === "tutup" ? <ellipse cx={x} cy={y} rx={rr * 0.6} ry={rr * 0.6} fill="none" stroke={garis} strokeWidth={1.2} strokeDasharray="3 3" /> : null}
      {rupa === "benda" && EMOJI[b.jenis] ? (
        <text x={x} y={y + rr * 0.18} textAnchor="middle" fontSize={Math.max(12, rr * 0.5)}>
          {EMOJI[b.jenis]}
        </text>
      ) : null}
    </g>
  );
}

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

/** Rupa lambang: kartu tulisan besar dengan pertanyaan. */
function KartuTanya({ atas, bawah }: { atas: React.ReactNode; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p className="text-2xl">{bawah}</p>
    </div>
  );
}

/* ------------------------------ Metode IGIL: hitung sisi lurus atau sudut ------------------------------ */
function Ciri({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "ciri" }> }) {
  const [kena, setKena] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const lengkung = l.benda.bentuk === "lengkung";
  const apa = l.tanya === "sisi" ? "sisi lurus" : "sudut";
  useEffect(() => {
    if (rupa === "lambang") siap();
    else if (lengkung && kanvas) siap(`Tepinya melengkung terus. Tidak ada ${apa}.`);
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={<span className="rounded-xl border-4 border-[#1C01A5] bg-[#FEF9C3] px-3 py-1">{NAMA_PENDEK[l.benda.bentuk]}</span>}
        bawah={
          <>
            {apa} = <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
          </>
        }
      />
    );
  const r = jariCiri(l.benda);
  const sudut = sudutBenda(l.benda, PUSAT_CIRI.x, PUSAT_CIRI.y, r * (l.benda.skala === 1 ? 0.72 : l.benda.skala === 3 ? 1.12 : 1));
  const sasaran: Titik[] = l.tanya === "sisi" ? tengahSisi(sudut) : sudut;
  const ketukDi = (i: number) => {
    if (selesai || kanvas || kena.includes(i)) return;
    const baru = [...kena, i];
    setKena(baru);
    if (baru.length === sasaran.length) {
      setSelesai(true);
      siap(`${kapital(apa)}nya sudah dihitung semua.`);
    }
  };
  const ketukBenda = () => {
    if (selesai || kanvas) return;
    if (lengkung) {
      setSelesai(true);
      siap(`Tepinya melengkung terus. Tidak ada ${apa}.`);
    } else salah(l.tanya === "sisi" ? "Ketuk tepat di garis lurus pinggirnya." : "Ketuk tepat di pojoknya, tempat dua sisi lurus bertemu.");
  };
  const periksa = () => {
    const p = periksaCentang(goresan, sasaran, 18);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Satu tanda untuk tiap ${apa}.`);
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? `Satu ${apa}, satu tanda.` : p.nyasar > 0 ? (l.tanya === "sisi" ? "Beri tanda tepat di sisi lurus." : "Beri tanda tepat di pojok.") : `Ada ${apa} yang belum diberi tanda.`);
    }
  };
  const gambar = (
    <g>
      <g {...(kanvas ? {} : ketuk(ketukBenda))} aria-label={namaUntuk(l.benda, rupa)}>
        <Bangun b={l.benda} rupa={rupa} x={PUSAT_CIRI.x} y={PUSAT_CIRI.y} r={r} />
      </g>
      {!kanvas
        ? sasaran.map((p, i) => (
            <g key={i} {...ketuk(() => ketukDi(i))} aria-label={`${apa} ${i + 1}${kena.includes(i) ? " sudah dihitung" : ""}`}>
              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
              {kena.includes(i) ? (
                <>
                  <circle cx={p.x} cy={p.y} r={9} fill={MERAH} stroke="#FFFFFF" strokeWidth={2} />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FFFFFF">
                    {kena.indexOf(i) + 1}
                  </text>
                </>
              ) : null}
            </g>
          ))
        : null}
      <text x={150} y={192} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {kanvas ? `tandai tiap ${apa}` : `${apa} terhitung: ${kena.length}`}
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || lengkung} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={`Hitung ${apa}`}>{gambar}</Gambar>;
}

/* ------------------------------ Shape Hunt: berburu bentuk ------------------------------ */
function Buru({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "buru" }> }) {
  const [dapat, setDapat] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const sasaran = sasaranBuru(l);
  const letak = l.isi.map((_, i) => letakPetak(i));
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || dapat.includes(i)) return;
    if (l.isi[i].bentuk !== l.sasaran) {
      salah(`Yang itu bukan ${NAMA_BENDA_BENTUK(l.sasaran)}. Lihat tepinya lagi.`);
      return;
    }
    const baru = [...dapat, i];
    setDapat(baru);
    if (baru.length === sasaran.length) {
      setSelesai(true);
      siap(`Semua ${NAMA_BENDA_BENTUK(l.sasaran)} sudah tertangkap.`);
    }
  };
  const periksa = () => {
    const p = periksaLingkari(goresan, letak, l.isi.map((b) => b.bentuk === l.sasaran));
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Semua ${NAMA_BENDA_BENTUK(l.sasaran)} terlingkari.`);
    } else {
      setGoresan([]);
      salah(p.lebih > 0 ? `Ada yang bukan ${NAMA_BENDA_BENTUK(l.sasaran)} ikut dilingkari.` : `Masih ada ${NAMA_BENDA_BENTUK(l.sasaran)} yang belum dilingkari.`);
    }
  };
  const gambar = (
    <g>
      <text x={150} y={18} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
        {kanvas ? `buru: ${NAMA_PENDEK[l.sasaran]}` : `buru: ${NAMA_PENDEK[l.sasaran]} · tertangkap ${dapat.length}`}
      </text>
      {l.isi.map((b, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${namaUntuk(b, rupa)}${dapat.includes(i) ? ", tertangkap" : ""}`}>
          <circle cx={letak[i].x} cy={letak[i].y} r={27} fill="transparent" />
          <Bangun b={b} rupa={rupa} x={letak[i].x} y={letak[i].y} r={JARI_PETAK} tanda={dapat.includes(i) ? "pilih" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Berburu bentuk">{gambar}</Gambar>;
}
const NAMA_BENDA_BENTUK = (b: Extract<Langkah, { tipe: "buru" }>["sasaran"]) => (b === "lengkung" ? "bentuk lengkung" : NAMA_BENTUK[b]);

/* ------------------------------ Geoboard: papan paku ------------------------------ */
const WARNA_KARET = ["#DC2626", "#2563EB", "#16A34A"];
function Paku({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "paku" }> }) {
  const [kena, setKena] = useState<string[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <span className="flex flex-wrap justify-center gap-1.5">
            {l.bangun.map((b, i) => (
              <span key={i} className="rounded-xl border-4 border-[#1C01A5] bg-[#FEF9C3] px-2 py-0.5 text-lg">
                {b.length === 3 ? "segitiga" : "segi empat"}
              </span>
            ))}
          </span>
        }
        bawah={
          <>
            sudut semuanya = <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
          </>
        }
      />
    );
  const sudut = l.bangun.flat();
  const kunci = (c: number, r: number) => `${c},${r}`;
  const sudutSet = new Set(sudut.map(([c, r]) => kunci(c, r)));
  const total = sudut.length;
  const ketukPaku = (c: number, r: number) => {
    if (selesai || kanvas) return;
    const k = kunci(c, r);
    if (kena.includes(k)) return;
    if (!sudutSet.has(k)) {
      salah("Karet tidak berbelok di paku itu. Ketuk paku tempat karet berbelok.");
      return;
    }
    const baru = [...kena, k];
    setKena(baru);
    if (baru.length === total) {
      setSelesai(true);
      siap("Semua paku sudut sudah dihitung.");
    }
  };
  const periksa = () => {
    const p = periksaCentang(goresan, sudut.map(([c, r]) => letakPaku(c, r)), 16);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap sudut.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu sudut, satu tanda." : p.nyasar > 0 ? "Beri tanda hanya pada paku tempat karet berbelok." : "Ada sudut yang belum diberi tanda.");
    }
  };
  const benda = rupa === "benda";
  const gambar = (
    <g>
      <rect x={6} y={4} width={288} height={186} rx={12} fill={benda ? "#D6A15E" : "#FFFFFF"} stroke={benda ? "#78350F" : "#94A3B8"} strokeWidth={benda ? 3 : 1.4} />
      {benda ? Array.from({ length: 6 }, (_, i) => <line key={i} x1={10} x2={290} y1={20 + i * 30} y2={22 + i * 30} stroke="#B45309" strokeWidth={1} opacity={0.35} />) : null}
      {l.bangun.map((b, i) => (
        <path
          key={i}
          d={jalurPoligon(b.map(([c, r]) => letakPaku(c, r)))}
          fill={benda ? "transparent" : "#EEF2FF"}
          stroke={benda ? WARNA_KARET[i % 3] : UNGU}
          strokeWidth={benda ? 3.6 : 2}
          strokeLinejoin="round"
        />
      ))}
      {Array.from({ length: KOLOM_PAKU * BARIS_PAKU }, (_, n) => {
        const c = n % KOLOM_PAKU;
        const r = Math.floor(n / KOLOM_PAKU);
        const t = letakPaku(c, r);
        const k = kunci(c, r);
        const sudah = kena.includes(k);
        return (
          <g key={k} {...(kanvas ? {} : ketuk(() => ketukPaku(c, r)))} aria-label={`paku baris ${r + 1} kolom ${c + 1}${sudah ? ", sudut terhitung" : ""}`}>
            <circle cx={t.x} cy={t.y} r={13} fill="transparent" />
            <circle cx={t.x} cy={t.y} r={sudah ? 8 : benda ? 4.5 : 3} fill={sudah ? MERAH : benda ? "#FDE68A" : "#64748B"} stroke={benda ? "#78350F" : "none"} strokeWidth={1.2} />
            {sudah ? (
              <text x={t.x} y={t.y + 3.5} textAnchor="middle" fontSize={9} fontWeight={900} fill="#FFFFFF">
                {kena.indexOf(k) + 1}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Papan paku">{gambar}</Gambar>;
}

/* ------------------------------ Mystery Shape: pilih bentuk misterius ------------------------------ */
function Misteri({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "misteri" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = benarMisteri(l);
  const letak = l.pilihan.map((_, i) => letakPilihan(i));
  const pesanBetul = `Betul! Bentuk misterius itu ${NAMA_BENTUK[l.pilihan[benar[0]].bentuk]}.`;
  const petunjuk = (i: number) => {
    const gagal = l.syarat.find((s) => !memenuhi(l.pilihan[i].bentuk, s));
    return gagal ? `Bukan yang itu. Petunjuknya: ${TEKS_SYARAT[gagal].replace("Aku", "aku")}` : "Baca lagi petunjuknya.";
  };
  const ketukPilih = (i: number) => {
    if (selesai || kanvas || mati.includes(i)) return;
    setPilih(i);
    if (benar.includes(i)) {
      setSelesai(true);
      siap(pesanBetul);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjuk(i));
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, letak, l.pilihan.map((_, i) => benar.includes(i)));
    if (r.benar) {
      setSelesai(true);
      siap(pesanBetul);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu bentuk saja, yang cocok dengan semua petunjuk." : "Bentuk misterius belum dilingkari.");
    }
  };
  const gambar = (
    <g>
      <rect x={10} y={8} width={280} height={58} rx={12} fill="#FEF9C3" stroke="#A16207" strokeWidth={2} strokeDasharray="6 4" />
      <text x={24} y={26} fontSize={11} fontWeight={900} fill="#A16207">
        {"\u{2753}"} petunjuk
      </text>
      {l.syarat.map((s, i) => (
        <text key={s} x={150} y={42 + i * 16} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
          {TEKS_SYARAT[s]}
        </text>
      ))}
      {l.pilihan.map((b, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => ketukPilih(i)))} aria-label={namaUntuk(b, rupa)} aria-disabled={mati.includes(i)}>
          <circle cx={letak[i].x} cy={letak[i].y} r={JARI_PILIHAN + 6} fill="transparent" />
          <Bangun b={b} rupa={rupa} x={letak[i].x} y={letak[i].y} r={JARI_PILIHAN} tanda={mati.includes(i) ? "pudar" : pilih === i && selesai ? "pilih" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bentuk misterius">{gambar}</Gambar>;
}

/* ------------------------------ Mystery Shape (suara): kantong misterius ------------------------------ */
function Kantong({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "kantong" }> }) {
  const [keluar, setKeluar] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const sasaran = sasaranKantong(l);
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || keluar.includes(i)) return;
    if (!memenuhi(l.isi[i].bentuk, l.syarat)) {
      salah(`Yang itu tidak cocok. Petunjuknya: ${TEKS_SYARAT[l.syarat].replace("Aku", "aku")}`);
      return;
    }
    const baru = [...keluar, i];
    setKeluar(baru);
    if (baru.length === sasaran.length) {
      setSelesai(true);
      siap("Semua yang cocok sudah keluar dari kantong.");
    }
  };
  const letak = l.isi.map((_, i) => letakKantong(i));
  const periksa = () => {
    const p = periksaCentang(goresan, sasaran.map((i) => letak[i]), 22);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap yang cocok.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu benda, satu tanda." : p.nyasar > 0 ? "Ada tanda pada benda yang tidak cocok." : "Masih ada yang cocok belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <path d={`M ${KANTONG.x + 8} ${KANTONG.y + 14} Q ${KANTONG.x} ${KANTONG.y + KANTONG.h} ${KANTONG.x + 30} ${KANTONG.y + KANTONG.h} L ${KANTONG.x + KANTONG.w - 30} ${KANTONG.y + KANTONG.h} Q ${KANTONG.x + KANTONG.w} ${KANTONG.y + KANTONG.h} ${KANTONG.x + KANTONG.w - 8} ${KANTONG.y + 14} Z`} fill={rupa === "benda" ? "#E9D5FF" : "#F8FAFC"} stroke="#7E22CE" strokeWidth={2.4} />
      <text x={KANTONG.x + KANTONG.w / 2} y={KANTONG.y + 10} textAnchor="middle" fontSize={10} fontWeight={900} fill="#7E22CE">
        kantong misterius
      </text>
      <rect x={200} y={22} width={92} height={168} rx={10} fill="#F0FDF4" stroke={HIJAU} strokeWidth={2} strokeDasharray="5 4" />
      <text x={246} y={36} textAnchor="middle" fontSize={10} fontWeight={900} fill={HIJAU}>
        {kanvas ? "keluar" : `keluar: ${keluar.length}`}
      </text>
      {l.isi.map((b, i) => {
        const j = keluar.indexOf(i);
        const p = j >= 0 ? letakMejaKanan(j) : letak[i];
        return (
          <g key={i} {...(kanvas || j >= 0 ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${namaUntuk(b, rupa)}${j >= 0 ? ", sudah keluar" : ""}`}>
            <circle cx={p.x} cy={p.y} r={j >= 0 ? 18 : 25} fill="transparent" />
            <Bangun b={b} rupa={rupa} x={p.x} y={p.y} r={j >= 0 ? 14 : 19} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kantong misterius">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung lagi satu per satu. Bentuk lengkung tidak punya sisi lurus dan sudut.",
  buru: "Hitung benda yang tertangkap.",
  paku: "Hitung paku tempat karet berbelok. Segitiga punya tiga sudut, segi empat punya empat sudut.",
  misteri: "Hitung yang keluar dari kantong.",
};

export function LangkahBahan({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
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
    if (p) {
      setPesan(p);
      bicara(p);
    }
  };
  const jawab = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(`Betul! Banyaknya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap };
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "ciri" ? <Ciri {...pk} l={l} /> : l.tipe === "buru" ? <Buru {...pk} l={l} /> : l.tipe === "paku" ? <Paku {...pk} l={l} /> : l.tipe === "misteri" ? <Misteri {...pk} l={l} /> : <Kantong {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">Berapa banyaknya?</p>
          {cara === "kanvas" ? (
            <JawabTulis kunci={n} onBenar={() => jawab(n)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuara kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "")} onPesan={setPesan} />
          ) : (
            <Pilihan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
