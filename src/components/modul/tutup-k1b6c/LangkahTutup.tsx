"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  bagianSatuan,
  bagianSepuluh,
  dasarDari,
  kata,
  petunjukSalah,
  pilihanDari,
  satuan,
  sisa,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { EMOJI, LANGKAH_LEWAT, NAMA_BENDA, WARNA_BENDA } from "./data";
import { BAGIAN, IKATAN, KISI, LEBAR_ADEGAN, TINGGI_ADEGAN, letakBagian, letakKisi, periksaLingkari, pusatBagian, type Goresan } from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 6 Sub-Bab C: kegiatan metode (Metode IGIL mengambil satuan dari kisi sepuluh, Think Addition mengisi tempat kosong,
 * Fact Family memilih bagian yang diambil, Subtract Through Ten dua langkah lewat sepuluh, atau mengurutkan langkahnya di Abstract),
 * soal Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab dengan caranya.
 * Rupa: benda berwarna dengan emoji (Concrete), titik dan bingkai polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Cara menjawab bilangan sampai dua puluh memakai ulang Bab 5 Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const JINGGA = "#EA580C";
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
  <text x={150} y={22} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
);
function KartuTanya({ atas, bawah, bantu }: { atas: React.ReactNode; bawah: React.ReactNode; bantu?: string }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p className="text-2xl">{bawah}</p>
      {bantu ? <p className="text-sm text-[#1C01A5]/70">{bantu}</p> : null}
    </div>
  );
}
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#DB2777] bg-[#FDF2F8] px-3 py-0.5 text-[#9D174D]">{children}</span>;
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk rupa lambang yang langsung menjawab). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Butir: satu benda (Concrete) atau satu titik (Pictorial) ------------------------------ */
type Tampil = "biasa" | "coret1" | "coret2" | "kosong" | "baru" | "sisa";
function Butir({ x, y, rupa, jenis, tampil }: { x: number; y: number; rupa: Rupa; jenis: string; tampil: Tampil }) {
  const [isi, garis] = WARNA_BENDA[jenis] ?? ["#BFDBFE", "#1D4ED8"];
  const coret = tampil === "coret1" || tampil === "coret2";
  const cincin = tampil === "baru" || tampil === "sisa" ? HIJAU : null;
  return (
    <g>
      {tampil === "kosong" ? (
        <circle cx={x} cy={y} r={11} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.4} strokeDasharray="4 3" />
      ) : (
        <g opacity={coret ? 0.35 : 1}>
          <circle cx={x} cy={y} r={11} fill={rupa === "benda" ? isi : "#93C5FD"} stroke={cincin ?? (rupa === "benda" ? garis : UNGU)} strokeWidth={cincin ? 3 : 1.6} />
          {rupa === "benda" ? (
            <text x={x} y={y + 5.5} textAnchor="middle" fontSize={15}>
              {EMOJI[jenis] ?? EMOJI.apel}
            </text>
          ) : null}
        </g>
      )}
      {coret ? (
        <g stroke={tampil === "coret1" ? MERAH : JINGGA} strokeWidth={2.6} strokeLinecap="round">
          <line x1={x - 8} y1={y - 8} x2={x + 8} y2={y + 8} />
          <line x1={x - 8} y1={y + 8} x2={x + 8} y2={y - 8} />
        </g>
      ) : null}
    </g>
  );
}
const label = (rupa: Rupa, jenis: string, kecil = false) => (rupa === "benda" ? `${NAMA_BENDA[jenis] ?? "benda"}${kecil ? "" : " di tiang"}` : "titik di peta");

/** Kisi sepuluh: butir ke-i di letakKisi(i), baris atas diberi bingkai ikatan sepuluh. */
function Kisi({ n, rupa, jenis, tampil, onKetuk, tulisan = true }: { n: number; rupa: Rupa; jenis: string; tampil: (i: number) => Tampil; onKetuk?: (i: number) => void; tulisan?: boolean }) {
  return (
    <g>
      <rect x={IKATAN.x} y={IKATAN.y} width={IKATAN.w} height={IKATAN.h} rx={rupa === "benda" ? 14 : 3} fill={rupa === "benda" ? "rgba(146,64,14,0.1)" : "none"} stroke={rupa === "benda" ? "#92400E" : UNGU} strokeWidth={1.8} strokeDasharray={rupa === "benda" ? "5 3" : undefined} />
      {tulisan ? (
        <>
          <text x={IKATAN.x + 4} y={IKATAN.y - 4} fontSize={9} fontWeight={900} fill={UNGU}>
            satu ikatan sepuluh
          </text>
          <text x={IKATAN.x + 4} y={KISI.y0 + KISI.dy - 18} fontSize={9} fontWeight={900} fill={UNGU}>
            satuan
          </text>
        </>
      ) : null}
      {Array.from({ length: n }, (_, i) => {
        const t = letakKisi(i);
        return (
          <g key={i} {...(onKetuk ? ketuk(() => onKetuk(i)) : {})} aria-label={`${label(rupa, jenis, true)} ${kata(i + 1)}`}>
            <Butir x={t.x} y={t.y} rupa={rupa} jenis={jenis} tampil={tampil(i)} />
          </g>
        );
      })}
    </g>
  );
}
const semuaLetak = (n: number) => Array.from({ length: n }, (_, i) => letakKisi(i));

/* ------------------------------ Metode IGIL: ambil dari satuan, puluhan tetap ------------------------------ */
function Igil({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahDasar }) {
  const k = sisa(l);
  const [ambil, setAmbil] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>{l.a}</Kotak> – <Kotak>{l.b}</Kotak>
          </>
        }
        bawah={
          <>
            = <Tanya />
          </>
        }
        bantu="Satuannya dulu, puluhannya tetap."
      />
    );
  const ketukButir = (i: number) => {
    if (selesai || kanvas || diam || ambil.includes(i)) return;
    if (i < 10) {
      salah("Puluhannya tetap. Ambil dari baris satuan, di bawah.");
      return;
    }
    const baru = [...ambil, i];
    setAmbil(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap(`Satuan tinggal ${kata(satuan(l.a) - l.b)}. Puluhannya tetap satu.`);
    } else info(kata(baru.length));
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, semuaLetak(l.a), Array.from({ length: l.a }, (_, i) => i < k));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu yang masih tersisa.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Yang dicoret sudah diambil. Lingkari hanya yang tersisa." : "Masih ada yang tersisa belum terlingkari. Boleh pakai lebih dari satu lingkaran.");
    }
  };
  const tampil = (i: number): Tampil => (kanvas || diam ? (i >= k ? "coret1" : "biasa") : ambil.includes(i) ? "coret1" : selesai ? "sisa" : "biasa");
  const gambar = (
    <g>
      <Judul teks={kanvas ? "lingkari yang masih tersisa" : "ambil dari baris satuan"} />
      <Kisi n={l.a} rupa={rupa} jenis={l.jenis} tampil={tampil} onKetuk={kanvas || diam ? undefined : ketukButir} />
    </g>
  );
  if (diam) return <Gambar label="Bilangan belasan dengan yang diambil">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={`${besar(label(rupa, l.jenis))}: satu ikatan sepuluh dan satuan`}>{gambar}</Gambar>;
}

/* ------------------------------ Think Addition: isi tempat kosong sampai penuh ------------------------------ */
function Pikir({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahDasar }) {
  const k = sisa(l);
  const [isi, setIsi] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>{l.b}</Kotak> + <Tanya /> = <Kotak>{l.a}</Kotak>
          </>
        }
        bawah={
          <>
            {l.a} – {l.b} = <Tanya />
          </>
        }
        bantu="Pengurangan dipikirkan sebagai penjumlahan."
      />
    );
  const ketukTempat = (i: number) => {
    if (selesai || kanvas || diam || isi.includes(i)) return;
    if (i < l.b) {
      info("Itu sudah ada. Ketuk tempat yang kosong.");
      return;
    }
    const baru = [...isi, i];
    setIsi(baru);
    if (baru.length === k) {
      setSelesai(true);
      siap(`${besar(kata(l.b))} ditambah ${kata(k)} sama dengan ${kata(l.a)}.`);
    } else info(kata(baru.length));
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, semuaLetak(l.a), Array.from({ length: l.a }, (_, i) => i >= l.b));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu tempat yang masih kosong.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Yang sudah terisi jangan ikut dilingkari. Lingkari tempat kosong saja." : "Masih ada tempat kosong belum terlingkari. Boleh pakai lebih dari satu lingkaran.");
    }
  };
  const tampil = (i: number): Tampil => (i < l.b ? "biasa" : kanvas || diam ? "kosong" : isi.includes(i) ? "baru" : "kosong");
  const gambar = (
    <g>
      <Judul teks={kanvas ? "lingkari tempat yang masih kosong" : "isi tempat kosong sampai penuh"} />
      <Kisi n={l.a} rupa={rupa} jenis={l.jenis} tampil={tampil} onKetuk={kanvas || diam ? undefined : ketukTempat} />
    </g>
  );
  if (diam) return <Gambar label="Tempat terisi dan tempat kosong">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={`${besar(label(rupa, l.jenis))}: sebagian sudah ada, sisanya tempat kosong`}>{gambar}</Gambar>;
}

/* ------------------------------ Fact Family: dua bagian digabung, pilih yang diambil ------------------------------ */
function Keluarga({ l, rupa, kanvas, diam, salah, siap }: PK & { l: LangkahDasar }) {
  const jumlah = [l.b, sisa(l)];
  const [tutup, setTutup] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>{l.b}</Kotak> + <Kotak>{sisa(l)}</Kotak> = <Kotak>{l.a}</Kotak>
          </>
        }
        bawah={
          <>
            {l.a} – {l.b} = <Tanya />
          </>
        }
        bantu="Satu kalimat penjumlahan membuka kalimat pengurangannya."
      />
    );
  const pilih = (g: number) => {
    if (selesai || kanvas || diam) return;
    if (g === 0) {
      setTutup(true);
      setSelesai(true);
      siap(`Yang diambil ${kata(l.b)}, jadi yang tampak adalah sisanya.`);
    } else salah(`Itu bagian sisanya. Cari bagian yang berjumlah ${kata(l.b)}.`);
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, [pusatBagian(0), pusatBagian(1)], [false, true]);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu bagian yang tersisa.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? `Bagian yang berjumlah ${kata(l.b)} sudah diambil. Lingkari bagian satunya.` : "Lingkari bagian yang tersisa, yang tidak diambil.");
    }
  };
  const diambil = tutup || kanvas || diam;
  const gambar = (
    <g>
      <Judul teks={kanvas ? "lingkari bagian yang tersisa" : "dua bagian digabung, satu diambil"} />
      {[0, 1].map((g) => {
        const b = BAGIAN[g];
        const hilang = g === 0 && diambil;
        const sisaTerang = g === 1 && selesai;
        return (
          <g key={g} {...(kanvas || diam ? {} : ketuk(() => pilih(g)))} aria-label={`bagian ${g === 0 ? "kiri" : "kanan"}`}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={rupa === "benda" ? 16 : 4} fill={g === 0 ? (rupa === "benda" ? "#DBEAFE" : "#FFFFFF") : rupa === "benda" ? "#FCE7F3" : "#FFFFFF"} stroke={sisaTerang ? HIJAU : UNGU} strokeWidth={sisaTerang ? 4 : 2} strokeDasharray={hilang ? "5 4" : undefined} opacity={hilang ? 0.6 : 1} />
            {Array.from({ length: jumlah[g] }, (_, i) => {
              const t = letakBagian(g, i);
              return <Butir key={i} x={t.x} y={t.y} rupa={rupa} jenis={l.jenis} tampil={hilang ? "coret1" : "biasa"} />;
            })}
            <text x={b.x + b.w / 2} y={b.y + b.h + 16} textAnchor="middle" fontSize={10} fontWeight={900} fill={hilang ? MERAH : UNGU}>
              {hilang ? "diambil" : g === 0 ? "bagian kiri" : "bagian kanan"}
            </text>
          </g>
        );
      })}
    </g>
  );
  if (diam) return <Gambar label="Dua bagian, satu bagian diambil">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Dua bagian yang digabung">{gambar}</Gambar>;
}

/* ------------------------------ Subtract Through Ten: dua langkah lewat sepuluh ------------------------------ */
function UrutLangkah({ l, salah, siap, info }: { l: LangkahDasar; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void }) {
  const [urut, setUrut] = useState<number[]>([]);
  const tampilan = [2, 0, 1];
  const pilih = (j: number) => {
    if (urut.includes(j)) return;
    if (j !== urut.length) {
      salah(j === 2 ? "Memeriksa dengan menambah dilakukan paling akhir, sesudah hasilnya ketemu." : "Langkah itu belum waktunya. Mana yang lebih dulu?");
      return;
    }
    const baru = [...urut, j];
    setUrut(baru);
    if (baru.length === 3) siap(`Betul! Sepuluh dulu, lalu sisanya, lalu periksa. ${besar(kata(l.a))} dikurangi ${kata(l.b)}.`);
    else info(`Langkah ${kata(baru.length)} tepat.`);
  };
  return (
    <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
      <p className="text-xl">
        <Kotak>{l.a}</Kotak> – <Kotak>{l.b}</Kotak>
      </p>
      <p className="text-sm">Urutkan langkah Kurangi Lewat Sepuluh. Ketuk dari yang paling dulu.</p>
      <div className="flex flex-col gap-1.5" role="group" aria-label="Langkah yang diurutkan">
        {tampilan.map((j) => (
          <button key={j} type="button" disabled={urut.includes(j)} onClick={() => pilih(j)} className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-sm font-black text-[#1C01A5] disabled:border-[#15803D] disabled:bg-[#DCFCE7]">
            {urut.includes(j) ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#15803D] text-xs text-white">{urut.indexOf(j) + 1}</span> : null}
            {LANGKAH_LEWAT[j]}
          </button>
        ))}
      </div>
    </div>
  );
}

function Lewat({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahDasar }) {
  const s = bagianSatuan(l);
  const r = bagianSepuluh(l);
  const k = sisa(l);
  const [a1, setA1] = useState<number[]>([]);
  const [a2, setA2] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && kanvas && !diam, () => siap());
  if (rupa === "lambang") {
    if (kanvas || diam)
      return (
        <KartuTanya
          atas={
            <>
              <Kotak>{l.a}</Kotak> – <Kotak>{l.b}</Kotak>
            </>
          }
          bawah={
            <>
              = <Tanya />
            </>
          }
          bantu="Kurangi sampai sepuluh dulu, lalu sisanya."
        />
      );
    return <UrutLangkah l={l} salah={salah} siap={siap} info={info} />;
  }
  const langkah1 = a1.length < s;
  const ketukButir = (i: number) => {
    if (selesai || kanvas || diam || a1.includes(i) || a2.includes(i)) return;
    if (langkah1) {
      if (i < 10) {
        salah("Kurangi dulu yang di baris satuan, sampai tinggal sepuluh.");
        return;
      }
      const baru = [...a1, i];
      setA1(baru);
      if (baru.length === s) info(`Tinggal sepuluh. Sekarang kurangi ${kata(r)} lagi dari ikatan sepuluh.`);
      else info(kata(baru.length));
      return;
    }
    if (i >= 10) return;
    const baru = [...a2, i];
    setA2(baru);
    if (baru.length === r) {
      setSelesai(true);
      siap(`Sepuluh dikurangi ${kata(r)} sama dengan ${kata(k)}.`);
    } else info(kata(baru.length));
  };
  const periksa = () => {
    const h = periksaLingkari(goresan, semuaLetak(l.a), Array.from({ length: l.a }, (_, i) => i < 10 - r));
    if (h.benar) {
      setSelesai(true);
      siap("Betul! Itu yang masih tersisa.");
    } else {
      setGoresan([]);
      salah(h.lebih > 0 ? "Yang dicoret sudah diambil. Lingkari hanya yang tersisa." : "Masih ada yang tersisa belum terlingkari. Boleh pakai lebih dari satu lingkaran.");
    }
  };
  const tampil = (i: number): Tampil =>
    kanvas || diam ? (i >= 10 ? "coret1" : i >= 10 - r ? "coret2" : "biasa") : a1.includes(i) ? "coret1" : a2.includes(i) ? "coret2" : selesai && i < 10 - r ? "sisa" : "biasa";
  const gambar = (
    <g>
      <Judul teks={kanvas ? "lingkari yang masih tersisa" : langkah1 ? "langkah satu: kurangi baris satuan" : "langkah dua: kurangi dari sepuluh"} />
      <Kisi n={l.a} rupa={rupa} jenis={l.jenis} tampil={tampil} onKetuk={kanvas || diam ? undefined : ketukButir} />
    </g>
  );
  if (diam) return <Gambar label="Dua langkah lewat sepuluh">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={`${besar(label(rupa, l.jenis))}: kurangi lewat sepuluh`}>{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "igil" ? <Igil {...props} l={l} /> : l.tipe === "pikir" ? <Pikir {...props} l={l} /> : l.tipe === "keluarga" ? <Keluarga {...props} l={l} /> : <Lewat {...props} l={l} />;
}

function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
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
      <Dasar l={l.dasar} rupa={rupa} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
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
export function LangkahTutup({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
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
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const tanya = d.tipe === "pikir" ? "Berapa yang harus ditambahkan?" : "Berapa sisanya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai ? (
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
