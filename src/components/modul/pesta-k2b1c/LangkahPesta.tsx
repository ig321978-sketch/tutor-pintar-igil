"use client";

import React, { useEffect, useMemo, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  PATOKAN,
  angkaJawab,
  awalGaris,
  dasarDari,
  dicari,
  kalimatKunci,
  kalimatTanya,
  kata,
  pilihanDari,
  siapLangsung,
  petunjukSalah,
  puluhanSama,
  sasaranLangkah,
  type Cara,
  type Langkah,
  type LangkahBatang,
  type LangkahDasar,
  type LangkahGaris,
  type LangkahPatokan,
  type LangkahPuluhan,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { KUE } from "./data";
import {
  KOTAK,
  LEBAR_ADEGAN,
  LEPAS,
  SATUAN_BATANG,
  SKALA_TIGA,
  TINGGI_ADEGAN,
  X_BARIS,
  Y_DASAR_PATOKAN,
  periksaLingkari,
  pojokBenda,
  pojokDiagram,
  pusatBaris,
  pusatBendera,
  pusatDua,
  pusatPatokanBenda,
  pusatTiga,
  slotTiga,
  tataBaris,
  tataBenda,
  tataDiagram,
  titikGaris,
  xBilPatokan,
  xGaris,
  xPatokan,
  yBaris,
  BATANG_PULUHAN,
  KUBUS,
  GARIS,
  type Goresan,
} from "./periksa";
import { JawabSuaraPesta, JawabTulisPesta, PilihanPesta } from "./Jawab50";

/**
 * Satu soal CPA Kelas 2 Bab 1 Sub-Bab C: kegiatan metode (Metode IGIL: bandingkan dua bilangan puluhan dulu, Number Line: susun nampan atau letakkan titik
 * di garis bilangan, Benchmark Numbers: pilih patokan terdekat, Bar Model: bandingkan batang sejajar), soal Cari kesalahan (putuskan benar atau salah,
 * pilih alasan, lalu jawab), lalu menjawab dengan caranya. Rupa: benda berwarna dengan emoji (Concrete), diagram polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai lima puluh memakai Jawab50 (dua kotak untuk dua angka).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";
const HURUF = ["A", "B", "C"];
/** Jenis kue nampan ke-i dari kumpulan yang berbeda (dua atau tiga nampan memakai kue yang berlainan). */
const kueKe = (kue: number, i: number): number => (kue + 3 * i) % KUE.length;

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
function Gambar({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      {children}
    </svg>
  );
}
function Judul({ teks }: { teks: string }) {
  return (
    <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
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
/** Langkah sekali saat soal dibuka (untuk soal yang langsung menjawab dari gambar yang sudah jadi). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Bilangan: kotak sepuluh dan kue lepas (benda), batang puluhan dan kubus satuan (diagram) ------------------------------ */
type Gaya = { sorot?: boolean; merah?: boolean; hijau?: boolean };
const garisGaya = (g: Gaya) => (g.hijau ? HIJAU : g.merah ? MERAH : g.sorot ? "#B45309" : UNGU);
const tebalGaya = (g: Gaya) => (g.hijau || g.merah || g.sorot ? 2.8 : 1.3);

function Bil({ rupa, n, c, skala = 1, kue, ...g }: { rupa: Rupa; n: number; c: { x: number; y: number }; skala?: number; kue: number } & Gaya) {
  const garis = garisGaya(g);
  const tebal = tebalGaya(g);
  if (rupa === "benda") {
    const t = tataBenda(n);
    const o = pojokBenda(c, skala);
    return (
      <g aria-hidden="true">
        {t.kotak.map((k, i) => (
          <g key={i}>
            <rect x={o.x + k.x * skala} y={o.y + k.y * skala} width={KOTAK.w * skala} height={KOTAK.h * skala} rx={3} fill="#FDBA74" stroke={garis} strokeWidth={tebal} />
            <text x={o.x + (k.x + KOTAK.w / 2) * skala} y={o.y + (k.y + 11.5) * skala} textAnchor="middle" fontSize={9 * skala} fontWeight={900} fill={UNGU}>
              10
            </text>
          </g>
        ))}
        {t.lepas.map((l, j) => (
          <text key={j} x={o.x + l.x * skala} y={o.y + l.y * skala + 5 * skala} textAnchor="middle" fontSize={LEPAS.u * skala}>
            {KUE[kue].emoji}
          </text>
        ))}
      </g>
    );
  }
  const t = tataDiagram(n);
  const o = pojokDiagram(c, skala);
  return (
    <g aria-hidden="true">
      {t.kotak.map((k, i) => (
        <g key={i}>
          <rect x={o.x + k.x * skala} y={o.y + k.y * skala} width={BATANG_PULUHAN.w * skala} height={BATANG_PULUHAN.h * skala} fill="#FFFFFF" stroke={garis} strokeWidth={tebal} />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((q) => (
            <line key={q} x1={o.x + k.x * skala} x2={o.x + (k.x + BATANG_PULUHAN.w) * skala} y1={o.y + (k.y + q * 3) * skala} y2={o.y + (k.y + q * 3) * skala} stroke={garis} strokeWidth={0.6} />
          ))}
        </g>
      ))}
      {t.lepas.map((l, j) => (
        <rect key={j} x={o.x + l.x * skala} y={o.y + l.y * skala} width={KUBUS.u * skala} height={KUBUS.u * skala} fill="#FFFFFF" stroke={garis} strokeWidth={tebal} />
      ))}
    </g>
  );
}

/** Pernyataan data untuk rupa lambang. */
function Pernyataan({ baris, atas, bawah }: { baris: string[]; atas?: string; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
      {atas ? <p className="text-sm text-[#7C3AED]">{atas}</p> : null}
      <ul className="mx-auto grid max-w-md grid-cols-1 gap-1">
        {baris.map((b) => (
          <li key={b} className="rounded-lg border-2 border-[#F9A8D4] bg-[#FDF2F8] px-2 py-1 text-sm text-[#831843]">
            {b}
          </li>
        ))}
      </ul>
      <p className="text-lg">{bawah}</p>
    </div>
  );
}
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;

const pesanPuluhan = (a: number, b: number, rupa: Rupa) => (puluhanSama(a, b) ? `Puluhannya sama. Bandingkan ${rupa === "benda" ? "kue lepasnya" : "kubus satuannya"}.` : `Lihat ${rupa === "benda" ? "kotak sepuluhnya" : "batang puluhannya"} dulu. Yang puluhannya lebih banyak lebih besar.`);

/* ------------------------------ Metode IGIL: puluhan dulu, lalu satuan ------------------------------ */
function Puluhan({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahPuluhan }) {
  const sasaran = sasaranLangkah(l);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return <Pernyataan atas="Dua bilangan" baris={[`Bilangan pertama: ${l.a}`, `Bilangan kedua: ${l.b}`]} bawah={<>{kalimatTanya(l, rupa).replace(/[?]s*$/, "")} <Tanya /></>} />;
  const ketukSisi = (i: number) => {
    if (!interaktif || selesai) return;
    if (i === sasaran) {
      setMerah(-1);
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setMerah(i);
      salah(pesanPuluhan(l.a, l.b, rupa));
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, [pusatDua(0), pusatDua(1)], [sasaran === 0, sasaran === 1]);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu saja." : pesanPuluhan(l.a, l.b, rupa));
    }
  };
  const bil = [l.a, l.b];
  const kata2 = l.tanya === "besar" ? (rupa === "benda" ? "lebih banyak" : "lebih besar") : rupa === "benda" ? "lebih sedikit" : "lebih kecil";
  const gambar = (
    <g>
      <Judul teks={interaktif ? `ketuk yang ${kata2}: puluhan dulu` : kanvas ? `lingkari yang ${kata2}` : diam ? "dua bilangan" : "bandingkan: puluhan dulu, lalu satuan"} />
      {bil.map((n, i) => {
        const c = pusatDua(i);
        const bentuk = (
          <>
            <rect x={c.x - 66} y={c.y - 38} width={132} height={92} rx={8} fill={selesai && i === sasaran ? "#DCFCE7" : "#FFFBEB"} stroke={merah === i ? MERAH : selesai && i === sasaran ? HIJAU : "#D97706"} strokeWidth={merah === i || (selesai && i === sasaran) ? 3 : 1.4} strokeDasharray={rupa === "benda" ? undefined : "5 3"} />
            <Bil rupa={rupa} n={n} c={c} kue={kueKe(l.kue, i)} merah={merah === i} hijau={selesai && i === sasaran} />
            <text x={c.x} y={c.y + 70} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={UNGU}>
              {rupa === "benda" ? `nampan ${i === 0 ? "kiri" : "kanan"} ${KUE[kueKe(l.kue, i)].emoji}` : `diagram ${i === 0 ? "kiri" : "kanan"}`}
            </text>
          </>
        );
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukSisi(i)) : {})} aria-label={`${rupa === "benda" ? "nampan" : "diagram"} ${i === 0 ? "kiri" : "kanan"}`}>
            {bentuk}
          </g>
        );
      })}
    </g>
  );
  if (diam) return <Gambar label="Dua bilangan yang dibandingkan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Membandingkan dua bilangan, puluhan dulu">{gambar}</Gambar>;
}

/* ------------------------------ Number Line: nampan disusun atau titik di garis bilangan ------------------------------ */
function GarisAngka({ isi, awal, label, dipasang, sorot, merah, onKetuk, jangkau }: { isi: readonly number[]; awal: number; label: boolean; dipasang: number[]; sorot?: number; merah?: number; onKetuk?: (n: number) => void; jangkau?: boolean }) {
  const ticks = Array.from({ length: 16 }, (_, q) => awal + q);
  return (
    <g>
      <line x1={GARIS.x - 8} x2={GARIS.x + GARIS.w + 8} y1={GARIS.y} y2={GARIS.y} stroke={UNGU} strokeWidth={2.4} />
      {ticks.map((n) => {
        const x = xGaris(isi, n);
        const besarTanda = n % 5 === 0;
        return (
          <g key={n} {...(onKetuk ? ketuk(() => onKetuk(n)) : {})} aria-label={`tanda ${kata(n)}`}>
            {onKetuk ? <rect x={x - 8} y={GARIS.y - 30} width={16} height={66} fill="transparent" /> : null}
            <line x1={x} x2={x} y1={GARIS.y - (besarTanda ? 8 : 4)} y2={GARIS.y + (besarTanda ? 8 : 4)} stroke={UNGU} strokeWidth={besarTanda ? 2.2 : 1.2} />
            {besarTanda || jangkau ? (
              <text x={x} y={GARIS.y + 22} textAnchor="middle" fontSize={besarTanda ? 9 : 6.5} fontWeight={900} fill={UNGU}>
                {n}
              </text>
            ) : null}
          </g>
        );
      })}
      {dipasang.map((n) => {
        const t = titikGaris(isi, n);
        const warna = merah === n ? MERAH : sorot === n ? HIJAU : "#2563EB";
        return (
          <g key={n} aria-hidden="true">
            <circle cx={t.x} cy={t.y} r={6.5} fill={warna} stroke={UNGU} strokeWidth={1.6} />
            {label ? (
              <text x={t.x} y={t.y - 12} textAnchor="middle" fontSize={11} fontWeight={900} fill={warna}>
                {n}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function Garis({ l, rupa, cara, kanvas, diam, salah, siap, info }: PK & { l: LangkahGaris }) {
  const sasaranBil = dicari(l.isi, l.tanya);
  const awal = awalGaris(l.isi);
  const urutBenar = useMemo(() => [...l.isi.keys()].sort((p, q) => l.isi[p] - l.isi[q]), [l]);
  const [urut, setUrut] = useState<number[]>([]);
  const [pasang, setPasang] = useState<number[]>([]);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Bilangan pada garis bilangan" baris={[`Bilangan: ${l.isi.join(", ")}`]} bawah={<>{kalimatTanya(l, rupa).replace(/[?]s*$/, "")} <Tanya /></>} />;
  const targetLingkar = l.isi.map((n) => n === sasaranBil);

  /* Concrete: nampan disusun dari paling sedikit di kiri. */
  const ketukNampan = (i: number) => {
    if (!interaktif || selesai || urut.includes(i)) return;
    const sisa = urutBenar.filter((x) => !urut.includes(x));
    if (l.isi[i] === l.isi[sisa[0]]) {
      const baru = [...urut, i];
      setUrut(baru);
      setMerah(-1);
      if (baru.length === l.isi.length) {
        setSelesai(true);
        siap(`Semua nampan sudah tersusun dari yang paling sedikit. ${kalimatKunci(l)}`);
      } else info(`Sudah ${kata(baru.length)} nampan. Cari yang paling sedikit di antara sisanya.`);
    } else {
      setMerah(i);
      salah("Cari nampan yang kuenya paling sedikit di antara yang tersisa. Lihat kotak sepuluhnya dulu.");
    }
  };
  /* Pictorial: ketuk tanda bilangan di garis bilangan. */
  const diminta = l.isi[pasang.length];
  const ketukTanda = (n: number) => {
    if (!interaktif || selesai || diminta === undefined) return;
    if (n === diminta) {
      const baru = [...pasang, n];
      setPasang(baru);
      setMerah(-1);
      if (baru.length === l.isi.length) {
        setSelesai(true);
        siap(`Semua titik sudah di garis bilangan. ${kalimatKunci(l)}`);
      } else info(`Titik berikutnya: tandai bilangan yang tertulis di atas garis.`);
    } else {
      setMerah(n);
      salah("Itu bukan tandanya. Hitung dari bilangan yang tertulis di garis, satu tanda satu bilangan.");
    }
  };
  const periksa = () => {
    const pts = rupa === "benda" ? l.isi.map((_, i) => pusatTiga(i)) : l.isi.map((n) => titikGaris(l.isi, n));
    const r = periksaLingkari(goresan, pts, targetLingkar);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu saja." : `Cari yang ${l.tanya === "besar" ? "paling ke kanan" : "paling ke kiri"}: yang lebih ke kanan lebih besar.`);
    }
  };

  if (rupa === "benda") {
    /** Nampan yang sedang tampil: urutan yang sudah disusun di slot, sisanya di atas. Kanvas: urutan data. Suara dan diam: sudah tersusun. */
    const tersusun = interaktif ? urut : diam || cara === "suara" ? urutBenar : [];
    const atas = interaktif || kanvas ? l.isi.map((_, i) => i).filter((i) => !tersusun.includes(i)) : [];
    const gambar = (
      <g>
        <Judul teks={interaktif ? "ketuk nampan dari yang paling sedikit" : kanvas ? `lingkari nampan yang paling ${l.tanya === "besar" ? "kanan" : "kiri"}` : "nampan dari paling sedikit ke paling banyak"} />
        {[0, 1, 2].slice(0, l.isi.length).map((i) => {
          const s = slotTiga(i);
          return <rect key={i} x={s.x - 46} y={s.y - 34} width={92} height={64} rx={8} fill="#FEF9C3" stroke="#D97706" strokeWidth={1.4} strokeDasharray="5 3" />;
        })}
        <text x={150} y={197} textAnchor="middle" fontSize={8.4} fontWeight={900} fill={COKLAT}>
          paling sedikit (kiri) ... paling banyak (kanan)
        </text>
        {tersusun.map((i, rank) => (
          <g key={`s${i}`} aria-hidden="true">
            <Bil rupa="benda" n={l.isi[i]} c={slotTiga(rank)} skala={SKALA_TIGA} kue={kueKe(l.kue, i)} hijau={selesai} />
          </g>
        ))}
        {atas.map((i) => (
          <g key={`a${i}`} {...(interaktif ? ketuk(() => ketukNampan(i)) : {})} aria-label={`nampan ${HURUF[i]}`}>
            <rect x={pusatTiga(i).x - 46} y={pusatTiga(i).y - 38} width={92} height={74} rx={8} fill="#FFFBEB" stroke={merah === i ? MERAH : "#D97706"} strokeWidth={merah === i ? 3 : 1.4} />
            <Bil rupa="benda" n={l.isi[i]} c={pusatTiga(i)} skala={SKALA_TIGA} kue={kueKe(l.kue, i)} merah={merah === i} />
          </g>
        ))}
      </g>
    );
    if (diam) return <Gambar label="Tiga nampan tersusun dari paling sedikit">{gambar}</Gambar>;
    if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
    return <Gambar label="Menyusun nampan dari paling sedikit">{gambar}</Gambar>;
  }

  /* Pictorial: garis bilangan. */
  const titikTampil = interaktif ? pasang : l.isi;
  const gambar = (
    <g>
      <Judul teks={interaktif ? (diminta === undefined ? "semua titik sudah dipasang" : `ketuk tanda untuk ${diminta}`) : kanvas ? `lingkari titik yang ${l.tanya === "besar" ? "paling ke kanan" : "paling ke kiri"}` : "garis bilangan: kanan lebih besar"} />
      <GarisAngka isi={l.isi} awal={awal} label={!interaktif || true} dipasang={titikTampil} sorot={selesai ? sasaranBil : undefined} merah={interaktif && merah >= 0 ? merah : undefined} onKetuk={interaktif ? ketukTanda : undefined} jangkau={interaktif} />
      <text x={150} y={176} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
        kiri lebih kecil ... kanan lebih besar
      </text>
    </g>
  );
  if (diam) return <Gambar label="Titik pada garis bilangan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Garis bilangan">{gambar}</Gambar>;
}

/* ------------------------------ Benchmark Numbers: bilangan patokan ------------------------------ */
function Patokan({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahPatokan }) {
  const sasaran = sasaranLangkah(l);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [mati, setMati] = useState<number[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  const pesan = (m: number) => (m > sasaran ? "Patokan itu terlalu besar. Pilih patokan yang jaraknya paling pendek dari bilangannya." : "Patokan itu terlalu kecil. Pilih patokan yang jaraknya paling pendek dari bilangannya.");
  const pilihPatokan = (i: number) => {
    if (diam || selesai) return;
    if (i === sasaran) {
      setSelesai(true);
      setMerah(-1);
      siap(kalimatKunci(l));
    } else {
      setMerah(i);
      setMati((m) => [...m, i]);
      salah(pesan(i));
    }
  };
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
        <p className="text-sm text-[#7C3AED]">Bilangan dan patokan</p>
        <ul className="mx-auto grid max-w-md grid-cols-1 gap-1">
          <li className="rounded-lg border-2 border-[#F9A8D4] bg-[#FDF2F8] px-2 py-1 text-sm text-[#831843]">Bilangan: {l.n}</li>
          <li className="rounded-lg border-2 border-[#F9A8D4] bg-[#FDF2F8] px-2 py-1 text-sm text-[#831843]">Patokan: {PATOKAN.join(", ")}</li>
        </ul>
        {l.angka ? (
          <p className="text-lg">
            patokan terdekat = <Tanya />
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih patokan">
            {PATOKAN.map((p, i) => (
              <Tombol key={p} teks={String(p)} mati={mati.includes(i) || selesai} onClick={() => pilihPatokan(i)} />
            ))}
          </div>
        )}
      </div>
    );
  const periksa = () => {
    const pts = PATOKAN.map((_, i) => (rupa === "benda" ? pusatPatokanBenda(i) : pusatBendera(i)));
    const r = periksaLingkari(goresan, pts, PATOKAN.map((_, i) => i === sasaran));
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu patokan saja." : "Cari patokan yang jaraknya paling pendek dari bilangannya, lalu lingkari.");
    }
  };
  const bisaKetuk = interaktif;
  const gambar =
    rupa === "benda" ? (
      <g>
        <Judul teks={bisaKetuk ? "ketuk patokan yang paling dekat" : kanvas ? "lingkari patokan yang paling dekat" : "kira-kira dekat patokan mana?"} />
        <rect x={98} y={22} width={104} height={62} rx={8} fill="#FFFBEB" stroke="#D97706" strokeWidth={1.4} />
        <Bil rupa="benda" n={l.n} c={{ x: 150, y: 52 }} kue={l.kue} />
        {PATOKAN.map((p, i) => {
          const c = pusatPatokanBenda(i);
          const warna = merah === i ? MERAH : selesai && i === sasaran ? HIJAU : "#D97706";
          return (
            <g key={p} {...(bisaKetuk ? ketuk(() => pilihPatokan(i)) : {})} aria-label={`patokan ${kata(p)}`}>
              <rect x={c.x - 24} y={c.y - 36} width={48} height={62} rx={6} fill={selesai && i === sasaran ? "#DCFCE7" : "#FEF9C3"} stroke={warna} strokeWidth={merah === i || (selesai && i === sasaran) ? 3 : 1.2} />
              {Array.from({ length: i + 1 }, (_, q) => (
                <rect key={q} x={c.x - 10} y={c.y + 8 - q * 9} width={20} height={7} rx={2} fill="#FDBA74" stroke={UNGU} strokeWidth={0.8} />
              ))}
              <text x={c.x} y={c.y + 23} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
                {p}
              </text>
            </g>
          );
        })}
      </g>
    ) : (
      <g>
        <Judul teks={bisaKetuk ? "ketuk bendera patokan yang paling dekat dengan titik" : kanvas ? "lingkari bendera patokan yang paling dekat" : "titik di antara bendera patokan"} />
        <line x1={24} x2={286} y1={Y_DASAR_PATOKAN} y2={Y_DASAR_PATOKAN} stroke={UNGU} strokeWidth={2.4} />
        {PATOKAN.map((p, i) => {
          const x = xPatokan(i);
          const warna = merah === i ? MERAH : selesai && i === sasaran ? HIJAU : UNGU;
          return (
            <g key={p} {...(bisaKetuk ? ketuk(() => pilihPatokan(i)) : {})} aria-label={`bendera patokan ${kata(p)}`}>
              <rect x={x - 26} y={44} width={52} height={84} fill="transparent" />
              <line x1={x} x2={x} y1={58} y2={Y_DASAR_PATOKAN} stroke={warna} strokeWidth={2.6} />
              <rect x={x - 15} y={58} width={30} height={16} rx={3} fill="#FFFFFF" stroke={warna} strokeWidth={merah === i || (selesai && i === sasaran) ? 3 : 1.4} />
              <text x={x} y={70} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
                {p}
              </text>
            </g>
          );
        })}
        <circle cx={xBilPatokan(l.n)} cy={Y_DASAR_PATOKAN + 14} r={6} fill="#2563EB" stroke={UNGU} strokeWidth={1.6} />
        <text x={xBilPatokan(l.n)} y={Y_DASAR_PATOKAN + 36} textAnchor="middle" fontSize={11} fontWeight={900} fill="#2563EB">
          {l.n}
        </text>
      </g>
    );
  if (diam) return <Gambar label="Bilangan dan bendera patokan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bilangan dan patokan terdekat">{gambar}</Gambar>;
}

/* ------------------------------ Bar Model: batang sejajar dari garis yang sama ------------------------------ */
function Batang({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahBatang }) {
  const sasaran = sasaranLangkah(l);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Panjang batang" baris={l.isi.map((n, i) => `Batang ${HURUF[i]}: ${n}`)} bawah={<>{kalimatTanya(l, rupa).replace(/[?]s*$/, "")} <Tanya /></>} />;
  const t = l.tanya === "besar" ? "paling panjang" : "paling pendek";
  const ketukBaris = (i: number) => {
    if (!interaktif || selesai) return;
    if (i === sasaran) {
      setMerah(-1);
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setMerah(i);
      salah(`Itu bukan batang yang ${t}. Bandingkan panjangnya dari garis yang sama di kiri.`);
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, l.isi.map((_, i) => pusatBaris(i)), l.isi.map((_, i) => i === sasaran));
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu saja." : `Cari yang ${t}: bandingkan panjangnya dari garis yang sama.`);
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? `ketuk yang ${t}` : kanvas ? `lingkari yang ${t}` : "batang sejajar dari garis yang sama"} />
      <line x1={X_BARIS - 6} x2={X_BARIS - 6} y1={30} y2={186} stroke={UNGU} strokeWidth={2.6} />
      {l.isi.map((n, i) => {
        const y = yBaris(i);
        const warna = merah === i ? MERAH : selesai && i === sasaran ? HIJAU : UNGU;
        const lebarBar = n * SATUAN_BATANG;
        const baris = tataBaris(n);
        return (
          <g key={i} {...(interaktif ? ketuk(() => ketukBaris(i)) : {})} aria-label={`${rupa === "benda" ? "deretan" : "batang"} ${HURUF[i]}`}>
            <rect x={2} y={y - 22} width={296} height={44} fill="transparent" />
            <text x={20} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
              {rupa === "benda" ? KUE[kueKe(l.kue, i)].emoji : HURUF[i]}
            </text>
            {rupa === "benda" ? (
              <g>
                {baris.kotak.map((k, q) => (
                  <g key={q}>
                    <rect x={X_BARIS + k.x} y={y - 8} width={KOTAK.w} height={KOTAK.h} rx={3} fill="#FDBA74" stroke={warna} strokeWidth={warna === UNGU ? 1.3 : 2.8} />
                    <text x={X_BARIS + k.x + KOTAK.w / 2} y={y + 3.5} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
                      10
                    </text>
                  </g>
                ))}
                {baris.lepas.map((p, q) => (
                  <text key={q} x={X_BARIS + p.x} y={y + 5} textAnchor="middle" fontSize={11}>
                    {KUE[kueKe(l.kue, i)].emoji}
                  </text>
                ))}
              </g>
            ) : (
              <g>
                <rect x={X_BARIS} y={y - 8} width={lebarBar} height={16} rx={2} fill="#BFDBFE" stroke={warna} strokeWidth={warna === UNGU ? 1.4 : 3} />
                {Array.from({ length: Math.floor(n / 10) }, (_, q) => (
                  <line key={q} x1={X_BARIS + (q + 1) * 10 * SATUAN_BATANG} x2={X_BARIS + (q + 1) * 10 * SATUAN_BATANG} y1={y - 8} y2={y + 8} stroke={UNGU} strokeWidth={1} strokeDasharray="2 2" />
                ))}
                <text x={Math.min(X_BARIS + lebarBar + 12, 290)} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                  {n}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
  if (diam) return <Gambar label="Batang sejajar dari garis yang sama">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Membandingkan panjang batang">{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "puluhan" ? <Puluhan {...props} l={l} /> : l.tipe === "garis" ? <Garis {...props} l={l} /> : l.tipe === "patokan" ? <Patokan {...props} l={l} /> : <Batang {...props} l={l} />;
}

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
    } else salah(l.betul ? `Lihat lagi. ${l.keliru}` : `Lihat lagi. ${l.keliru}`);
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
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

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahPesta({ ls, rupa, bicara, onBenar }: P) {
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
  const pk: PK = { rupa, cara, kanvas: cara === "kanvas", salah, siap, info };
  const tanya = kalimatTanya(d, rupa);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisPesta kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraPesta kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanPesta pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}

