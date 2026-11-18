"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  acak,
  ambilDariRak,
  angkaJawab,
  bukaDiRak,
  caraTermudah,
  dasarDari,
  istilah,
  kalimatKeluarga,
  kalimatKunci,
  kalimatTanya,
  kartuKalimat,
  kata,
  modeLangkah,
  petunjukSalah,
  pilihanDari,
  rakAwal,
  rakSelesai,
  sesuaikanPetunjuk,
  type Langkah,
  type LangkahDasar,
  type LangkahKeluarga,
  type LangkahPikir,
  type LangkahSalah,
  type LangkahSepuluh,
  type LangkahSoal,
  type LangkahSusun,
  type Rupa,
  type Cara,
} from "./logika";
import { SETS } from "./data";
import {
  LEBAR_ADEGAN,
  SIMPUL_ATAS,
  SIMPUL_KANAN,
  SIMPUL_KIRI,
  TINGGI_ADEGAN,
  UKURAN_DERET,
  UKURAN_IKAT,
  UKURAN_KARTU_KALIMAT,
  UKURAN_LEPAS,
  UKURAN_SIMPUL,
  letakDeret,
  letakIkat,
  letakKartuKalimat,
  letakLepas,
  letakSepuluh,
  letakSisaSepuluh,
} from "./periksa";
import { JawabSuaraStok, JawabTulisStok, PilihanStok } from "./Jawab20";

/**
 * Satu tugas CPA Kelas 2 Bab 2 Sub-Bab B: kegiatan metode (Metode IGIL Susun dan Periksa: mengetuk barang yang terjual dan membuka satu ikat sepuluh bila barang lepas
 * tidak cukup, Think Addition: mengetuk tempat kosong sampai penuh, Fact Family: mengetuk bilangan utuh atau memilih empat kalimat satu keluarga, Subtract from Ten:
 * mengurangi dari sepuluh lalu menambahkan sisanya, serta membandingkan dua cara), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab
 * dengan caranya. Rupa: benda berwarna dengan emoji (Concrete), bingkai dan titik polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai dua puluh memakai Jawab20.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Gambar({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      {children}
    </svg>
  );
}
function Judul({ teks, y = 16 }: { teks: string; y?: number }) {
  return (
    <text x={150} y={y} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={UNGU}>
      {teks}
    </text>
  );
}
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/** Langkah sekali saat tugas dibuka (untuk tugas yang langsung menjawab dari gambar yang sudah jadi; memperhitungkan rupa lambang dan cara suara lewat modeLangkah). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat tugas dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Benda berwarna (Concrete) dan bentuk polos (Pictorial) ------------------------------ */
type Warna = { hijau?: boolean; merah?: boolean; sorot?: boolean; redup?: boolean; coret?: boolean };
const garisDari = (o: Warna, dasar: string) => (o.hijau ? HIJAU : o.merah ? MERAH : o.sorot ? "#B45309" : dasar);
const tebalDari = (o: Warna) => (o.hijau || o.merah || o.sorot ? 3 : 1.5);

/** Satu barang: kotak berhias emoji (benda) atau titik polos (diagram). Berpusat (x, y). `coret` menandai barang yang sudah diambil. */
function Barang({ rupa, set, x, y, s = UKURAN_LEPAS, ...o }: { rupa: Rupa; set: string; x: number; y: number; s?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  const dasar = o.coret ? 0.4 : o.redup ? 0.35 : 1;
  return (
    <g opacity={dasar} aria-hidden="true">
      {rupa === "benda" ? (
        <>
          <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={5} fill={SETS[set]?.warna ?? SETS.topi.warna} stroke={g} strokeWidth={tebalDari(o)} />
          <text x={x} y={y + s * 0.28} textAnchor="middle" fontSize={s * 0.66}>
            {SETS[set]?.emoji ?? SETS.topi.emoji}
          </text>
        </>
      ) : (
        <circle cx={x} cy={y} r={s * 0.34} fill={UNGU} stroke={g} strokeWidth={o.hijau || o.merah || o.sorot ? 3 : 1} />
      )}
      {o.coret ? (
        <>
          <line x1={x - s / 2} y1={y - s / 2} x2={x + s / 2} y2={y + s / 2} stroke={MERAH} strokeWidth={2.4} />
          <line x1={x - s / 2} y1={y + s / 2} x2={x + s / 2} y2={y - s / 2} stroke={MERAH} strokeWidth={2.4} />
        </>
      ) : null}
    </g>
  );
}
/** Tempat kosong bergaris putus (Berpikir Penjumlahan). */
function Kosong({ rupa, x, y, s = UKURAN_DERET, ...o }: { rupa: Rupa; x: number; y: number; s?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  return rupa === "benda" ? (
    <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={5} fill="#FFFBEB" stroke={g} strokeWidth={o.sorot ? 3 : 1.6} strokeDasharray="4 3" aria-hidden="true" />
  ) : (
    <circle cx={x} cy={y} r={s * 0.34} fill="#FFFFFF" stroke={g} strokeWidth={o.sorot ? 3 : 1.6} strokeDasharray="3 2" aria-hidden="true" />
  );
}
/** Satu ikat sepuluh: kotak berisi sepuluh barang mini (benda) atau bingkai berisi sepuluh titik (diagram). Berpusat (x, y). */
function Ikat({ rupa, set, x, y, w = UKURAN_IKAT.w, h = UKURAN_IKAT.h, ...o }: { rupa: Rupa; set: string; x: number; y: number; w?: number; h?: number } & Warna) {
  const g = garisDari(o, rupa === "benda" ? COKLAT : UNGU);
  return (
    <g opacity={o.redup ? 0.35 : 1} aria-hidden="true">
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={rupa === "benda" ? 7 : 3} fill={rupa === "benda" ? "#F5D7A1" : "#FFFFFF"} stroke={g} strokeWidth={o.sorot || o.merah || o.hijau ? 3.4 : 2.4} />
      {Array.from({ length: 10 }, (_, i) =>
        rupa === "benda" ? (
          <text key={i} x={x - w / 2 + w * (0.12 + (i % 5) * 0.19)} y={y - h / 2 + h * (0.46 + Math.floor(i / 5) * 0.4)} textAnchor="middle" fontSize={h * 0.3}>
            {SETS[set]?.emoji ?? SETS.topi.emoji}
          </text>
        ) : (
          <circle key={i} cx={x - w / 2 + w * (0.12 + (i % 5) * 0.19)} cy={y - h / 2 + h * (0.3 + Math.floor(i / 5) * 0.4)} r={3.4} fill={UNGU} />
        ),
      )}
    </g>
  );
}

/* ------------------------------ Metode IGIL: Susun dan Periksa ------------------------------ */
/** Gambar tanpa kegiatan: a barang, yang terjual dicoret. Lambang: tabel puluhan dan satuan. */
function StatisSusun({ l, rupa }: { l: LangkahSusun; rupa: Rupa }) {
  if (rupa === "lambang") return <TabelAngka a={l.a} b={l.b} />;
  return (
    <Gambar label="Barang di rak, yang terjual dicoret">
      <Judul teks={`${l.a} − ${l.b} = ?`} />
      {Array.from({ length: l.a }, (_, i) => {
        const p = letakDeret(i);
        return <Barang key={i} rupa={rupa} set={l.set} x={p.x} y={p.y} coret={i >= l.a - l.b} />;
      })}
      <text x={150} y={166} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        yang dicoret sudah terjual
      </text>
    </Gambar>
  );
}

/** Tabel puluhan dan satuan untuk lambang (Abstract): bilangan awal, yang dikurangkan, dan hasil yang ditanyakan. */
function TabelAngka({ a, b }: { a: number; b: number }) {
  const baris: [string, string, string][] = [
    [a >= 10 ? String(Math.floor(a / 10)) : "", String(a % 10), `${a}`],
    [b >= 10 ? String(Math.floor(b / 10)) : "", String(b % 10), `${b}`],
    ["?", "?", "?"],
  ];
  return (
    <Gambar label="Tabel puluhan dan satuan">
      <Judul teks={`${a} − ${b} = ?`} />
      <rect x={90} y={26} width={60} height={22} fill="#BFDBFE" stroke={UNGU} strokeWidth={1.6} />
      <rect x={150} y={26} width={60} height={22} fill="#FBCFE8" stroke={UNGU} strokeWidth={1.6} />
      <text x={120} y={41} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        Puluhan
      </text>
      <text x={180} y={41} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        Satuan
      </text>
      {baris.map(([p, s], r) => (
        <g key={r}>
          <rect x={90} y={48 + r * 40} width={60} height={40} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.6} />
          <rect x={150} y={48 + r * 40} width={60} height={40} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.6} />
          <text x={120} y={78 + r * 40} textAnchor="middle" fontSize={26} fontWeight={900} fill={r === 2 ? MERAH : UNGU}>
            {p}
          </text>
          <text x={180} y={78 + r * 40} textAnchor="middle" fontSize={26} fontWeight={900} fill={r === 2 ? MERAH : UNGU}>
            {s}
          </text>
        </g>
      ))}
      <text x={70} y={118} textAnchor="middle" fontSize={26} fontWeight={900} fill={MERAH}>
        −
      </text>
    </Gambar>
  );
}

/** Ambil barang yang terjual satu per satu; bila barang lepas habis atau kurang, buka satu ikat sepuluh dulu. */
function Ambil({ l, rupa, salah, siap, info }: PK & { l: LangkahSusun }) {
  const [rak, setRak] = useState(() => rakAwal(l.a, l.b));
  const [diambil, setDiambil] = useState<number[]>([]);
  const w = istilah(rupa);
  const lepas0 = l.a % 10;
  const totalLepas = lepas0 + 10 * rak.dibuka;
  const selesai = rakSelesai(rak);
  const ketukLepas = (j: number) => {
    if (selesai || diambil.includes(j)) return;
    const h = ambilDariRak(rak);
    if (!h.ok) {
      if (h.sebab === "habis") salah(`${besar(w.lepas)} sudah habis. Buka dulu satu ${w.ikat}.`);
      return;
    }
    setRak(h.r);
    setDiambil((d) => [...d, j]);
    if (rakSelesai(h.r)) siap(kalimatKunci(l));
    else info(`Sudah diambil ${kata(h.r.diambil)}. Masih perlu ${kata(l.b - h.r.diambil)} lagi.`);
  };
  const ketukIkat = () => {
    if (selesai) return;
    const h = bukaDiRak(rak);
    if (!h.ok) {
      if (h.sebab === "cukup") salah(`${besar(w.lepas)} masih cukup. Ambil dulu yang terjual, buka ${w.ikat} hanya bila ${w.lepas} kurang.`);
      return;
    }
    setRak(h.r);
    info(`${besar(w.ikat)} dibuka jadi sepuluh ${w.lepas}. Sekarang ambil yang terjual.`);
  };
  return (
    <Gambar label="Rak barang: ketuk barang yang terjual">
      <Judul teks={`ambil ${l.b} dari ${l.a}: sudah ${rak.diambil}`} />
      {Array.from({ length: rak.p }, (_, i) => {
        const p = letakIkat(i);
        return (
          <g key={`i${i}`} {...ketuk(ketukIkat)} aria-label={`${w.ikat}, ketuk untuk membuka`}>
            <Ikat rupa={rupa} set={l.set} x={p.x} y={p.y} sorot={rak.s < l.b - rak.diambil && !selesai} />
          </g>
        );
      })}
      {Array.from({ length: totalLepas }, (_, j) => {
        const p = letakLepas(j);
        const ambil = diambil.includes(j);
        return (
          <g key={`l${j}`} {...(ambil ? {} : ketuk(() => ketukLepas(j)))} aria-label={ambil ? `${w.lepas} sudah diambil` : `${w.lepas}, ketuk untuk mengambil`}>
            <Barang rupa={rupa} set={l.set} x={p.x} y={p.y} coret={ambil} />
          </g>
        );
      })}
      <text x={150} y={190} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {selesai ? `sisa di rak: ${10 * rak.p + rak.s}` : `ketuk ${w.lepas}; ketuk ${w.ikat} untuk membuka`}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Think Addition: berpikir penjumlahan ------------------------------ */
function Sisa({ l, rupa, diam, siap, info }: PK & { l: LangkahPikir }) {
  const [isi, setIsi] = useState<number[]>([]);
  const perlu = l.a - l.b;
  const ketukKosong = (i: number) => {
    if (diam || isi.includes(i)) return;
    const baru = [...isi, i];
    setIsi(baru);
    if (baru.length === perlu) siap(kalimatKunci(l));
    else info(`Sudah ${kata(baru.length)} tempat terisi.`);
  };
  if (rupa === "lambang")
    return (
      <Gambar label="Kalimat penjumlahan yang belum lengkap">
        <Judul teks="bilangan apa yang harus ditambahkan?" />
        <text x={150} y={112} textAnchor="middle" fontSize={34} fontWeight={900} fill={UNGU}>
          {l.b} + ? = {l.a}
        </text>
      </Gambar>
    );
  return (
    <Gambar label="Tempat yang masih kosong">
      <Judul teks={`${l.b} + ? = ${l.a}`} />
      {Array.from({ length: l.a }, (_, i) => {
        const p = letakDeret(i);
        if (i < l.b) return <Barang key={i} rupa={rupa} set={l.set} x={p.x} y={p.y} hijau />;
        if (isi.includes(i)) return <Barang key={i} rupa={rupa} set={l.set} x={p.x} y={p.y} sorot />;
        return (
          <g key={i} {...(diam ? {} : ketuk(() => ketukKosong(i)))} aria-label="tempat kosong">
            <Kosong rupa={rupa} x={p.x} y={p.y} sorot={!diam} />
          </g>
        );
      })}
      <text x={150} y={166} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {diam ? "tempat bergaris putus masih kosong" : "ketuk tiap tempat yang kosong"}
      </text>
    </Gambar>
  );
}

/* ------------------------------ Fact Family: keluarga bilangan ------------------------------ */
function Simpul({ x, y, isi, set, rupa, sorot, merah, hijau, onKetuk, nama }: { x: number; y: number; isi: string; set: string; rupa: Rupa; sorot?: boolean; merah?: boolean; hijau?: boolean; onKetuk?: () => void; nama: string }) {
  const g = merah ? MERAH : hijau ? HIJAU : sorot ? "#B45309" : UNGU;
  return (
    <g {...(onKetuk ? ketuk(onKetuk) : {})} aria-label={nama}>
      <rect x={x - UKURAN_SIMPUL.w / 2} y={y - UKURAN_SIMPUL.h / 2} width={UKURAN_SIMPUL.w} height={UKURAN_SIMPUL.h} rx={rupa === "lambang" ? 4 : 12} fill={isi === "?" ? "#FFF7CC" : "#FFFFFF"} stroke={g} strokeWidth={merah || sorot || hijau ? 3.4 : 2} />
      {rupa === "benda" ? (
        <text x={x - UKURAN_SIMPUL.w / 2 + 16} y={y + 8} textAnchor="middle" fontSize={20}>
          {SETS[set]?.emoji ?? SETS.topi.emoji}
        </text>
      ) : null}
      <text x={rupa === "benda" ? x + 10 : x} y={y + 11} textAnchor="middle" fontSize={30} fontWeight={900} fill={isi === "?" ? MERAH : UNGU}>
        {isi}
      </text>
    </g>
  );
}

function Keluarga({ l, rupa, cara, diam, salah, siap }: PK & { l: LangkahKeluarga }) {
  const mode = modeLangkah(l, rupa, cara);
  const [kenal, setKenal] = useState(false);
  const z = l.x + l.y;
  const tampak = (nilai: number, tanya: boolean) => (tanya ? "?" : String(nilai));
  const tanyaAtas = l.tanya === "tambah";
  const tanyaKiri = l.tanya === "kurang2";
  const tanyaKanan = l.tanya === "kurang";
  const kalimat = l.tanya === "tambah" ? `${l.x} + ${l.y} = ?` : l.tanya === "kurang" ? `${z} − ${l.x} = ?` : `${z} − ${l.y} = ?`;
  const total = mode === "total" && !diam && !kenal;
  const ketukAtas = () => {
    if (!total) return;
    setKenal(true);
    siap("Betul, bilangan yang paling besar adalah bilangan utuh.");
  };
  const ketukBagian = () => salah("Itu salah satu bagian. Bilangan utuh adalah bilangan yang paling besar.");
  return (
    <Gambar label="Keluarga bilangan: segitiga tiga bilangan">
      <Judul teks={kalimat} />
      <line x1={SIMPUL_ATAS.x} y1={SIMPUL_ATAS.y + 22} x2={SIMPUL_KIRI.x} y2={SIMPUL_KIRI.y - 22} stroke={UNGU} strokeWidth={2.2} />
      <line x1={SIMPUL_ATAS.x} y1={SIMPUL_ATAS.y + 22} x2={SIMPUL_KANAN.x} y2={SIMPUL_KANAN.y - 22} stroke={UNGU} strokeWidth={2.2} />
      <line x1={SIMPUL_KIRI.x + 42} y1={SIMPUL_KIRI.y} x2={SIMPUL_KANAN.x - 42} y2={SIMPUL_KANAN.y} stroke={UNGU} strokeWidth={2.2} strokeDasharray="5 4" />
      <Simpul x={SIMPUL_ATAS.x} y={SIMPUL_ATAS.y} isi={tampak(z, tanyaAtas)} set={l.set} rupa={rupa} sorot={total} hijau={kenal} onKetuk={total ? ketukAtas : undefined} nama="bilangan utuh" />
      <Simpul x={SIMPUL_KIRI.x} y={SIMPUL_KIRI.y} isi={tampak(l.x, tanyaKiri)} set={l.set} rupa={rupa} onKetuk={total ? ketukBagian : undefined} nama="bagian pertama" />
      <Simpul x={SIMPUL_KANAN.x} y={SIMPUL_KANAN.y} isi={tampak(l.y, tanyaKanan)} set={l.set} rupa={rupa} onKetuk={total ? ketukBagian : undefined} nama="bagian kedua" />
      <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {total ? "ketuk bilangan yang paling besar" : "utuh di atas, dua bagian di bawah"}
      </text>
    </Gambar>
  );
}

/** Pilih keempat kalimat satu keluarga dari enam kartu (dua kartu menipu). Tanpa jawaban angka. */
function Kalimat({ l, salah, siap, info }: PK & { l: LangkahKeluarga }) {
  const kartu = useMemo(() => kartuKalimat(l.x, l.y, l.benih), [l.x, l.y, l.benih]);
  const benar = kalimatKeluarga(l.x, l.y);
  const [pilih, setPilih] = useState<string[]>([]);
  const [goyang, setGoyang] = useState("");
  const z = l.x + l.y;
  const ketukKartu = (t: string) => {
    if (pilih.includes(t) || pilih.length >= 4) return;
    if (benar.benar.includes(t)) {
      const baru = [...pilih, t];
      setPilih(baru);
      if (baru.length === 4) siap(kalimatKunci(l));
      else info(`Betul, ${kata(baru.length)} kalimat sudah dipilih.`);
      return;
    }
    setGoyang(t);
    window.setTimeout(() => setGoyang(""), 480);
    salah(t === benar.salah[0] ? "Bilangan kecil tidak bisa dikurangi bilangan besar. Yang dikurangi harus bilangan utuh." : "Utuh dikurangi satu bagian sama dengan bagian yang lain, bukan bagian yang sama.");
  };
  return (
    <Gambar label="Enam kalimat, pilih empat dari satu keluarga">
      <Judul teks={`keluarga: ${l.x}, ${l.y}, dan ${z}`} />
      {kartu.map((t, i) => {
        const p = letakKartuKalimat(i);
        const ok = pilih.includes(t);
        return (
          <g key={t} {...(ok ? {} : ketuk(() => ketukKartu(t)))} aria-label={`kalimat ${t}`} className={goyang === t ? "lm-goyang" : undefined}>
            <rect x={p.x - UKURAN_KARTU_KALIMAT.w / 2} y={p.y - UKURAN_KARTU_KALIMAT.h / 2} width={UKURAN_KARTU_KALIMAT.w} height={UKURAN_KARTU_KALIMAT.h} rx={10} fill={ok ? "#DCFCE7" : goyang === t ? "#FEE2E2" : "#FFFFFF"} stroke={ok ? HIJAU : goyang === t ? MERAH : UNGU} strokeWidth={ok || goyang === t ? 3.4 : 2} />
            <text x={p.x} y={p.y + 6} textAnchor="middle" fontSize={16} fontWeight={900} fill={UNGU}>
              {t}
            </text>
          </g>
        );
      })}
    </Gambar>
  );
}

/* ------------------------------ Subtract from Ten: kurangi dari sepuluh ------------------------------ */
function Sepuluh({ l, rupa, cara, diam, salah, siap }: PK & { l: LangkahSepuluh }) {
  const mode = modeLangkah(l, rupa, cara);
  const interaktif = mode === "dua" && !diam;
  const [selesai1, setSelesai1] = useState(!interaktif);
  const [mati, setMati] = useState<number[]>([]);
  const satu = 10 - l.b;
  const sisa = l.a - 10;
  const pilihan = useMemo(() => {
    const c = [satu, l.b, satu + 1 <= 10 ? satu + 1 : satu - 1].filter((v, i, a) => a.indexOf(v) === i);
    for (let n = 0; c.length < 3; n += 1) if (!c.includes(n)) c.push(n);
    return acak(c.slice(0, 3), l.benih + l.a).sort((p, q) => p - q);
  }, [satu, l.b, l.a, l.benih]);
  const pilih = (n: number) => {
    if (n === satu) {
      setSelesai1(true);
      siap(`Betul, sepuluh dikurangi ${kata(l.b)} sama dengan ${kata(satu)}. Sekarang tambahkan sisa bilangan awalnya.`);
      return;
    }
    setMati((m) => [...m, n]);
    salah(`Hitung lagi dari sepuluh: sepuluh dikurangi ${kata(l.b)}.`);
  };
  const gambar =
    rupa === "lambang" ? (
      <Gambar label="Kurangi dari sepuluh">
        <Judul teks={`${l.a} − ${l.b} = ?`} />
        <text x={150} y={78} textAnchor="middle" fontSize={30} fontWeight={900} fill={UNGU}>
          {`10 − ${l.b} = ${selesai1 ? satu : "?"}`}
        </text>
        <text x={150} y={134} textAnchor="middle" fontSize={30} fontWeight={900} fill={selesai1 ? UNGU : "#94A3B8"}>
          {selesai1 ? `${satu} + ${sisa} = ?` : "lalu tambahkan sisanya"}
        </text>
      </Gambar>
    ) : (
      <Gambar label="Sepuluh barang dikurangi, lalu ditambah sisanya">
        <Judul teks={`10 − ${l.b} = ${selesai1 ? satu : "?"}, lalu + ${sisa}`} />
        {Array.from({ length: 10 }, (_, i) => {
          const p = letakSepuluh(i);
          return <Barang key={i} rupa={rupa} set={l.set} x={p.x} y={p.y} coret={selesai1 && i >= satu} />;
        })}
        {selesai1
          ? Array.from({ length: sisa }, (_, i) => {
              const p = letakSisaSepuluh(i);
              return <Barang key={i} rupa={rupa} set={l.set} x={p.x} y={p.y} sorot />;
            })
          : null}
        <text x={150} y={158} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {selesai1 ? "yang dicoret dikurangkan dari sepuluh;" : "sepuluh barang di atas"}
        </text>
        {selesai1 ? (
          <text x={150} y={174} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
            yang di bawah sisa bilangan awal
          </text>
        ) : null}
      </Gambar>
    );
  return (
    <div className="space-y-2">
      {gambar}
      {interaktif && !selesai1 ? (
        <div className="space-y-1">
          <p className="text-center text-sm font-black text-[#1C01A5]">Langkah pertama: sepuluh dikurangi {kata(l.b)} sama dengan berapa?</p>
          <PilihanStok pilihan={pilihan} rupa={rupa} mati={mati} onPilih={pilih} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Membandingkan dua cara ------------------------------ */
function Banding({ l, rupa, salah, siap }: PK & { l: LangkahDasar & { tipe: "banding" } }) {
  const [pilih, setPilih] = useState<"mundur" | "sepuluh" | null>(null);
  const benar = caraTermudah(l.a, l.b);
  const ikon = rupa === "benda";
  const coba = (c: "mundur" | "sepuluh") => {
    if (pilih === benar) return;
    if (c === benar) {
      setPilih(c);
      siap(kalimatKunci(l));
    } else salah(c === "mundur" ? "Yang dikurangkan hampir sepuluh, jadi mundur satu-satu itu panjang. Coba cara lain." : "Yang dikurangkan kecil, jadi tidak perlu lewat sepuluh. Coba cara lain.");
  };
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <Gambar label="Pengurangan yang akan dibandingkan">
          <Judul teks="dua cara, pilih yang lebih mudah" />
          <text x={150} y={112} textAnchor="middle" fontSize={36} fontWeight={900} fill={UNGU}>
            {l.a} − {l.b} = ?
          </text>
        </Gambar>
      ) : (
        <Gambar label="Barang di rak, yang dikurangkan dicoret">
          <Judul teks={`${l.a} − ${l.b} = ?`} />
          {Array.from({ length: l.a }, (_, i) => {
            const p = letakDeret(i);
            return <Barang key={i} rupa={rupa} set={l.set} x={p.x} y={p.y} coret={i >= l.a - l.b} />;
          })}
        </Gambar>
      )}
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih cara yang lebih mudah">
        <Tombol teks={`${ikon ? "\u{1F519} " : ""}Mundur satu-satu`} mati={pilih !== null} onClick={() => coba("mundur")} />
        <Tombol teks={`${ikon ? "\u{1F51F} " : ""}Kurangi dari Sepuluh`} mati={pilih !== null} onClick={() => coba("sepuluh")} />
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l, rupa } = props;
  if (l.tipe === "susun") return props.diam || modeLangkah(l, rupa, props.cara) !== "ambil" ? <StatisSusun l={l} rupa={rupa} /> : <Ambil {...props} l={l} />;
  if (l.tipe === "pikir") return <Sisa {...props} l={l} />;
  if (l.tipe === "keluarga") return l.tanya === "kalimat" ? <Kalimat {...props} l={l} /> : <Keluarga {...props} l={l} />;
  if (l.tipe === "sepuluh") return <Sepuluh {...props} l={l} />;
  return <Banding {...props} l={l} />;
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
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
          {l.jawabTokoh !== undefined ? ` Jawabanku ${l.jawabTokoh}.` : ""}
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
export function LangkahStok({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const d = dasarDari(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    const t = sesuaikanPetunjuk(p, rupa);
    setPesan(t);
    bicara(t);
  };
  const info = (p: string) => {
    const t = sesuaikanPetunjuk(p, rupa);
    setPesan(t);
    bicara(t);
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
      salah(sesuaikanPetunjuk(`${awalan}${petunjukSalah(l, m)}`, rupa));
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const tanya = kalimatTanya(d);
  useSiapLangsung(l.tipe !== "salah" && modeLangkah(l, rupa, cara) === "langsung", siap);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisStok benarnya={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraStok benarnya={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanStok pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
