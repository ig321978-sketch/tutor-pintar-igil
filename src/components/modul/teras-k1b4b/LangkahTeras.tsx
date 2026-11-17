"use client";

import React, { useState } from "react";
import { CariKesalahan } from "../CariKesalahan";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import {
  NAMA_NILAI,
  NILAI,
  URUT_ATURAN,
  angkaJawab,
  klaimBenar,
  isiKeranjang,
  kalimatBenda,
  kartuKata,
  kata,
  nilai,
  nilaiKiri,
  petunjukTebak,
  pilihanDari,
  yangBeda,
  type Aturan,
  type Benda,
  type Langkah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { EMOJI, IKON_ATURAN, NAMA_BENDA, WARNA } from "./data";
import {
  JARI,
  JARI_BEDA,
  JARI_MINI,
  KANAN,
  KARTU,
  KARTU_ATURAN,
  KIRI,
  LEBAR_ADEGAN,
  PITA_BARU,
  TINGGI_ADEGAN,
  jariUkuran,
  keranjangBawah,
  letakAtas,
  letakBaru,
  letakBeda,
  letakKartuAturan,
  letakPita,
  periksaLingkari,
  pitaLama,
  slotMini,
  slotTebak,
  type Goresan,
  type Kotak,
  type Titik,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 4 Sub-Bab B: kegiatan metode (Metode IGIL memilah semua barang ke keranjang menurut satu aturan,
 * Attribute Sort mengganti aturan, Guess My Rule menebak aturan rahasia, Odd One Out mencari yang beda), lalu menjawab banyaknya dengan caranya.
 * Rupa: potongan bahan berwarna beremoji (Concrete), bangun polos berwarna (Pictorial), kartu kata (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const COKLAT = "#92400E";

/** Nama barang untuk pembaca layar. Abstract membaca kartunya; Concrete dan Pictorial menyebut ketiga ciri yang tampak. */
const namaUntuk = (b: Benda, rupa: Rupa) => (rupa === "lambang" ? `kartu ${kalimatBenda(b)}` : rupa === "benda" ? `${NAMA_BENDA[b.bentuk]} ${b.warna} ${b.ukuran}` : `bangun ${kalimatBenda(b)}`);

/** Satu barang: potongan bahan beremoji (benda), bangun polos berwarna (diagram), atau kartu kata (lambang). `mini` untuk isi keranjang. */
function Barang({ b, rupa, x, y, r, mini = false, tanda = "biasa" }: { b: Benda; rupa: Rupa; x: number; y: number; r: number; mini?: boolean; tanda?: "biasa" | "pilih" | "pudar" }) {
  const op = tanda === "pudar" ? 0.3 : 1;
  const pilih = tanda === "pilih";
  if (rupa === "lambang") {
    if (mini) return <rect x={x - 8} y={y - 5} width={16} height={10} rx={2} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.2} opacity={op} />;
    const [a, c] = kartuKata(b);
    return (
      <g opacity={op}>
        <rect x={x - KARTU.w / 2} y={y - KARTU.h / 2} width={KARTU.w} height={KARTU.h} rx={6} fill={pilih ? "#BBF7D0" : "#FFFFFF"} stroke={pilih ? HIJAU : UNGU} strokeWidth={pilih ? 2.6 : 1.5} />
        <text x={x} y={y - 2} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU}>
          {a}
        </text>
        <text x={x} y={y + 9} textAnchor="middle" fontSize={8} fontWeight={700} fill={UNGU}>
          {c}
        </text>
      </g>
    );
  }
  const rr = jariUkuran(r, b.ukuran === "besar");
  const [isi, garisBenda] = WARNA[b.warna];
  const benda = rupa === "benda";
  const garis = pilih ? HIJAU : benda ? garisBenda : UNGU;
  const tebal = pilih ? 3.4 : benda ? 2.4 : 1.4;
  const bentuk =
    b.bentuk === "lengkung" ? (
      <circle cx={x} cy={y} r={rr * 0.9} fill={isi} stroke={garis} strokeWidth={tebal} />
    ) : b.bentuk === "segitiga" ? (
      <path d={`M ${x} ${y - rr} L ${x + rr * 0.95} ${y + rr * 0.75} L ${x - rr * 0.95} ${y + rr * 0.75} Z`} fill={isi} stroke={garis} strokeWidth={tebal} strokeLinejoin="round" />
    ) : (
      <rect x={x - rr * 0.8} y={y - rr * 0.8} width={rr * 1.6} height={rr * 1.6} rx={benda ? 2 : 0} fill={isi} stroke={garis} strokeWidth={tebal} />
    );
  return (
    <g opacity={op}>
      {benda && !mini ? <ellipse cx={x + 1.5} cy={y + rr * 0.9} rx={rr * 0.8} ry={2.2} fill="#000000" opacity={0.12} /> : null}
      {bentuk}
      {rupa === "benda" && !mini ? (
        <text x={x} y={y + rr * 0.3} textAnchor="middle" fontSize={Math.max(8, rr * 0.75)}>
          {EMOJI[b.bentuk]}
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

/** Keranjang: kotak coklat muda dengan bibir dan papan nama. */
function Keranjang({ t, nama, aktif = false, sorot = false }: { t: Kotak; nama: string; aktif?: boolean; sorot?: boolean }) {
  return (
    <g>
      <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={9} fill={aktif ? "#DCFCE7" : sorot ? "#FEF9C3" : "#F5DEB3"} stroke={aktif ? HIJAU : sorot ? "#CA8A04" : COKLAT} strokeWidth={aktif || sorot ? 3 : 1.8} />
      <rect x={t.x - 2} y={t.y - 3} width={t.w + 4} height={7} rx={3.5} fill="#D69E2E" stroke={COKLAT} strokeWidth={1} />
      <text x={t.x + t.w / 2} y={t.y + 17} textAnchor="middle" fontSize={10} fontWeight={900} fill={aktif ? HIJAU : COKLAT}>
        {nama}
      </text>
    </g>
  );
}

const Judul = ({ y = 11, children }: { y?: number; children: React.ReactNode }) => (
  <text x={150} y={y} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
    {children}
  </text>
);

/* ------------------------------ Metode IGIL: pilah semua barang menurut satu aturan ------------------------------ */
function Pilah({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "pilah" }> }) {
  const [taruh, setTaruh] = useState<number[]>([]);
  const [aktif, setAktif] = useState<string | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const nilaiA = NILAI[l.aturan];
  const kr = nilaiA.map((_, j) => keranjangBawah(j, nilaiA.length));
  const letak = l.isi.map((_, i) => letakAtas(i, l.isi.length));
  const tanya = NAMA_NILAI[l.tanya];
  const ketukBarang = (i: number) => {
    if (selesai || kanvas || taruh.includes(i)) return;
    if (!aktif) {
      salah("Ketuk keranjangnya dulu, lalu ketuk barang yang cocok.");
      return;
    }
    if (nilai(l.isi[i], l.aturan) !== aktif) {
      salah(`Yang itu bukan ${NAMA_NILAI[aktif]}. Ia masuk keranjang lain.`);
      return;
    }
    const baru = [...taruh, i];
    setTaruh(baru);
    if (baru.length === l.isi.length) {
      setSelesai(true);
      setAktif(null);
      siap(`Semua sudah tertaruh. Sekarang hitung isi keranjang ${tanya}.`);
    }
  };
  const periksa = () => {
    const p = periksaLingkari(goresan, letak, l.isi.map((b) => nilai(b, l.aturan) === l.tanya));
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Itu isi keranjang ${tanya}.`);
    } else {
      setGoresan([]);
      salah(p.lebih > 0 ? `Ada yang bukan ${tanya} ikut dilingkari.` : `Masih ada yang ${tanya} belum dilingkari.`);
    }
  };
  const gambar = (
    <g>
      <Judul>{kanvas ? `aturan: ${l.aturan} · lingkari isi keranjang ${tanya}` : `aturan: ${l.aturan}${aktif ? ` · keranjang ${NAMA_NILAI[aktif]}` : ""}`}</Judul>
      {kr.map((t, j) => (
        <g key={nilaiA[j]} {...(kanvas || selesai ? {} : ketuk(() => setAktif(nilaiA[j])))} aria-label={`keranjang ${NAMA_NILAI[nilaiA[j]]}${aktif === nilaiA[j] ? ", aktif" : ""}`}>
          <Keranjang t={t} nama={NAMA_NILAI[nilaiA[j]]} aktif={aktif === nilaiA[j]} sorot={(kanvas || selesai) && nilaiA[j] === l.tanya} />
          {taruh
            .filter((i) => nilai(l.isi[i], l.aturan) === nilaiA[j])
            .map((i, n) => {
              const p = slotMini(t, n);
              return <Barang key={i} b={l.isi[i]} rupa={rupa} x={p.x} y={p.y} r={JARI_MINI} mini />;
            })}
        </g>
      ))}
      {l.isi.map((b, i) =>
        taruh.includes(i) ? null : (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukBarang(i)))} aria-label={namaUntuk(b, rupa)}>
            <circle cx={letak[i].x} cy={letak[i].y} r={24} fill="transparent" />
            <Barang b={b} rupa={rupa} x={letak[i].x} y={letak[i].y} r={JARI} />
          </g>
        ),
      )}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={`Pilah menurut ${l.aturan}`}>{gambar}</Gambar>;
}

/* ------------------------------ Attribute Sort: ganti aturan ------------------------------ */
function Ganti({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "ganti" }> }) {
  const [pindah, setPindah] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const kartu = rupa === "lambang";
  const lama = NILAI[l.dari];
  const pita = lama.map((_, j) => pitaLama(j, lama.length));
  const letak: Titik[] = l.isi.map(() => ({ x: 0, y: 0 }));
  lama.forEach((v, j) => isiKeranjang(l.isi, l.dari, v).forEach((i, n) => (letak[i] = letakPita(pita[j], n, kartu))));
  const sasaran = isiKeranjang(l.isi, l.ke, l.tanya);
  const tanya = NAMA_NILAI[l.tanya];
  const ketukBarang = (i: number) => {
    if (selesai || kanvas || pindah.includes(i)) return;
    if (nilai(l.isi[i], l.ke) !== l.tanya) {
      salah(`Yang itu bukan ${tanya}. Ia tidak masuk keranjang ${tanya}.`);
      return;
    }
    const baru = [...pindah, i];
    setPindah(baru);
    if (baru.length === sasaran.length) {
      setSelesai(true);
      siap(`Semua yang ${tanya} sudah pindah ke keranjang baru.`);
    }
  };
  const periksa = () => {
    const p = periksaLingkari(goresan, letak, l.isi.map((b) => nilai(b, l.ke) === l.tanya));
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Itu semua yang ${tanya}.`);
    } else {
      setGoresan([]);
      salah(p.lebih > 0 ? `Ada yang bukan ${tanya} ikut dilingkari.` : `Masih ada yang ${tanya} belum dilingkari.`);
    }
  };
  const gambar = (
    <g>
      <Judul>{`aturan lama: ${l.dari} · aturan baru: ${l.ke}`}</Judul>
      {pita.map((t, j) => (
        <g key={lama[j]}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={8} fill="#F5DEB3" stroke={COKLAT} strokeWidth={1.6} />
          <text x={t.x + 26} y={t.y + t.h / 2 + 4} textAnchor="middle" fontSize={9} fontWeight={900} fill={COKLAT}>
            {NAMA_NILAI[lama[j]]}
          </text>
        </g>
      ))}
      <rect x={PITA_BARU.x} y={PITA_BARU.y} width={PITA_BARU.w} height={PITA_BARU.h} rx={9} fill="#DCFCE7" stroke={HIJAU} strokeWidth={2.4} strokeDasharray="6 4" />
      <text x={PITA_BARU.x + 34} y={PITA_BARU.y + 19} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={HIJAU}>
        keranjang
      </text>
      <text x={PITA_BARU.x + 34} y={PITA_BARU.y + 32} textAnchor="middle" fontSize={10} fontWeight={900} fill={HIJAU}>
        {tanya}
      </text>
      {pindah.map((i, n) => {
        const p = letakBaru(n);
        return <Barang key={`b${i}`} b={l.isi[i]} rupa={rupa} x={p.x} y={p.y} r={JARI_MINI} mini />;
      })}
      {l.isi.map((b, i) => (
        <g key={i} {...(kanvas || pindah.includes(i) ? {} : ketuk(() => ketukBarang(i)))} aria-label={`${namaUntuk(b, rupa)}${pindah.includes(i) ? ", sudah pindah" : ""}`}>
          <circle cx={letak[i].x} cy={letak[i].y} r={20} fill="transparent" />
          <Barang b={b} rupa={rupa} x={letak[i].x} y={letak[i].y} r={JARI} tanda={pindah.includes(i) ? "pudar" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Ganti aturan">{gambar}</Gambar>;
}

/* ------------------------------ Guess My Rule: tebak aturan rahasia ------------------------------ */
function Tebak({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "tebak" }> }) {
  const [mati, setMati] = useState<Aturan[]>([]);
  const [benar, setBenar] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const kartu = rupa === "lambang";
  const v = NAMA_NILAI[nilaiKiri(l)];
  const pesanBetul = `Betul! Aturannya ${l.aturan}. Keranjang kiri ${v}, keranjang kanan bukan ${v}.`;
  const letakKartu = URUT_ATURAN.map((_, i) => letakKartuAturan(i));
  const pilih = (a: Aturan) => {
    if (benar || kanvas || mati.includes(a)) return;
    if (a === l.aturan) {
      setBenar(true);
      siap(pesanBetul);
    } else {
      setMati((m) => [...m, a]);
      salah(petunjukTebak(l, a));
    }
  };
  const periksa = () => {
    const p = periksaLingkari(goresan, letakKartu, URUT_ATURAN.map((a) => a === l.aturan));
    if (p.benar) {
      setBenar(true);
      siap(pesanBetul);
    } else {
      setGoresan([]);
      salah(p.lebih > 0 ? "Lingkari satu kartu aturan saja, yang cocok dengan kedua keranjang." : "Kartu aturan belum dilingkari.");
    }
  };
  const isi = (t: Kotak, daftar: Benda[]) =>
    daftar.map((b, n) => {
      const p = slotTebak(t, n, kartu);
      return (
        <g key={n} aria-label={namaUntuk(b, rupa)}>
          <Barang b={b} rupa={rupa} x={p.x} y={p.y} r={JARI} />
        </g>
      );
    });
  const gambar = (
    <g>
      <Judul>aturan rahasia?</Judul>
      <Keranjang t={KIRI} nama={benar ? `kiri: ${v}` : "keranjang kiri"} sorot={l.tanya === "kiri" && benar} />
      <Keranjang t={KANAN} nama={benar ? `kanan: bukan ${v}` : "keranjang kanan"} sorot={l.tanya === "kanan" && benar} />
      {isi(KIRI, l.kiri)}
      {isi(KANAN, l.kanan)}
      {URUT_ATURAN.map((a, i) => {
        const p = letakKartu[i];
        const tepat = benar && a === l.aturan;
        return (
          <g key={a} {...(kanvas ? {} : ketuk(() => pilih(a)))} aria-label={`kartu aturan ${a}`} aria-disabled={mati.includes(a)} opacity={mati.includes(a) ? 0.3 : 1}>
            <rect x={p.x - KARTU_ATURAN.w / 2} y={p.y - KARTU_ATURAN.h / 2} width={KARTU_ATURAN.w} height={KARTU_ATURAN.h} rx={8} fill={tepat ? "#BBF7D0" : "#FEF9C3"} stroke={tepat ? HIJAU : "#A16207"} strokeWidth={tepat ? 3 : 2} />
            <text x={p.x} y={p.y + 4.5} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
              {kartu ? a : `${IKON_ATURAN[a]} ${a}`}
            </text>
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={benar} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tebak aturan">{gambar}</Gambar>;
}

/* ------------------------------ Odd One Out: cari yang beda ------------------------------ */
function Beda({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "beda" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [benar, setBenar] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const odd = yangBeda(l);
  const letak = l.isi.map((_, i) => letakBeda(i, l.isi.length));
  const pesanBetul = `Betul! Yang itu beda ${odd.ciri}nya.`;
  const pilih = (i: number) => {
    if (benar || kanvas || mati.includes(i)) return;
    if (i === odd.indeks) {
      setBenar(true);
      siap(pesanBetul);
    } else {
      setMati((m) => [...m, i]);
      salah("Yang itu sama dengan yang lain. Bandingkan bentuk, warna, dan ukurannya.");
    }
  };
  const periksa = () => {
    const p = periksaLingkari(goresan, letak, l.isi.map((_, i) => i === odd.indeks));
    if (p.benar) {
      setBenar(true);
      siap(pesanBetul);
    } else {
      setGoresan([]);
      salah(p.lebih > 0 ? "Lingkari satu saja, yang berbeda dari semua yang lain." : "Yang beda belum dilingkari.");
    }
  };
  const gambar = (
    <g>
      <rect x={8} y={36} width={284} height={156} rx={14} fill="#F8FAFC" stroke="#CBD5E1" strokeWidth={1.4} strokeDasharray="5 4" />
      <Judul y={22}>cari yang beda</Judul>
      {l.isi.map((b, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => pilih(i)))} aria-label={namaUntuk(b, rupa)} aria-disabled={mati.includes(i)}>
          <circle cx={letak[i].x} cy={letak[i].y} r={26} fill="transparent" />
          <Barang b={b} rupa={rupa} x={letak[i].x} y={letak[i].y} r={JARI_BEDA} tanda={benar && i === odd.indeks ? "pilih" : mati.includes(i) ? "pudar" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={benar} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Cari yang beda">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung lagi isi keranjang itu satu per satu. Keranjang kosong isinya nol.",
  pilah: "Hitung lagi yang masuk keranjang baru.",
  tebak: "Hitung lagi isi keranjang itu satu per satu.",
  beda: "Hitung yang sama saja, tanpa yang beda.",
};
function tanyaAngka(l: Langkah): string {
  switch (l.tipe) {
    case "pilah":
      return `Berapa isi keranjang ${NAMA_NILAI[l.tanya]}?`;
    case "ganti":
      return `Berapa yang masuk keranjang ${NAMA_NILAI[l.tanya]}?`;
    case "tebak":
      return `Berapa isi keranjang ${l.tanya ?? "kiri"}?`;
    case "beda":
      return "Berapa yang sama?";
  }
}

export function LangkahTeras({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
  const klaim = l.tipe === "pilah" ? l.klaim : undefined;
  const [dinilai, setDinilai] = useState(!klaim);
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
        {!dinilai && klaim && l.tipe === "pilah" ? (
          <CariKesalahan
            tokoh={klaim.tokoh}
            ucapan={`Isi keranjang ${NAMA_NILAI[l.tanya]} ada ${klaim.angka}.`}
            benar={klaimBenar(l)}
            alasan={klaim.alasan}
            salah={salah}
            onLulus={(p) => {
              setDinilai(true);
              setPesan(p);
              bicara(p);
            }}
          />
        ) : l.tipe === "pilah" ? <Pilah {...pk} l={l} /> : l.tipe === "ganti" ? <Ganti {...pk} l={l} /> : l.tipe === "tebak" ? <Tebak {...pk} l={l} /> : <Beda {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanyaAngka(l)}</p>
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
