"use client";

import React, { useEffect, useMemo, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  dasarDari,
  indeksTerbanyak,
  indeksTersedikit,
  kalimatKunci,
  kalimatTanya,
  kata,
  petunjukSalah,
  sesuaikan,
  pilihanDari,
  tanyaDari,
  turusTeks,
  urutanCampur,
  type Langkah,
  type LangkahDasar,
  type LangkahLingkaran,
  type LangkahPasang,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahTabel,
  type LangkahTurus,
  type Rupa,
} from "./logika";
import type { Cara } from "./logika";
import { SETS, namaJenis } from "./data";
import {
  JARI_PASANG,
  JARI_TUMPUK,
  LEBAR_ADEGAN,
  TABEL,
  TINGGI_ADEGAN,
  TURUS_TUMPUK,
  UKURAN_DALAM,
  UKURAN_PASANG,
  UKURAN_TUMPUK,
  barisAtas,
  barisTurus,
  letakDalam,
  letakKejadian,
  letakKolam,
  letakPasang,
  letakTumpukan,
  periksaCentang,
  periksaLingkari,
  pusatBaris,
  pusatLingkaran,
  rLingkaran,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 8 Sub-Bab A: kegiatan metode (Metode IGIL: tumpukan campur dan turus, Sorting Hoops: memindahkan benda ke lingkaran,
 * One-to-One Matching: memasangkan satu-satu, Frequency Table: memberi goresan di baris jenisnya), soal Cari kesalahan (putuskan benar atau salah,
 * pilih alasan, lalu jawab), lalu menjawab dengan caranya. Rupa: benda berwarna dengan emoji (Concrete), bentuk polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai delapan belas memakai ulang Bab 5 Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; kanvas: boolean; diam?: boolean; nama: string[]; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const TALI = "#B45309";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
function Gambar({ label, children }: { label: string; children: React.ReactNode }) {
  const rupa = React.useContext(RupaCtx);
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={sesuaikan(label, rupa)}>
      {children}
    </svg>
  );
}
const RupaCtx = React.createContext<Rupa>("benda");
function Judul({ teks }: { teks: string }) {
  const rupa = React.useContext(RupaCtx);
  return (
  <text x={150} y={18} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
    {sesuaikan(teks, rupa)}
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

/* ------------------------------ Benda berwarna (Concrete) dan bentuk polos (Pictorial) ------------------------------ */
type Ik = { rupa: Rupa; set: string; jenis: number; x: number; y: number; s: number; hijau?: boolean; merah?: boolean; redup?: boolean; sorot?: boolean };
/** Satu benda: kotak berwarna dengan emoji (benda) atau bentuk polos bertepi tebal (diagram). */
function Item({ rupa, set, jenis, x, y, s, hijau, merah, redup, sorot }: Ik) {
  const garis = hijau ? HIJAU : merah ? MERAH : sorot ? "#B45309" : UNGU;
  const tebal = hijau || merah || sorot ? 3 : 1.5;
  const op = redup ? 0.35 : 1;
  const h = s / 2;
  if (rupa === "benda")
    return (
      <g opacity={op} aria-hidden="true">
        <rect x={x - h} y={y - h} width={s} height={s} rx={5} fill={SETS[set].warna[jenis]} stroke={garis} strokeWidth={tebal} />
        <text x={x} y={y + s * 0.28} textAnchor="middle" fontSize={s * 0.7}>
          {SETS[set].emoji[jenis]}
        </text>
      </g>
    );
  const sty = { fill: "#FFFFFF", stroke: garis, strokeWidth: tebal } as const;
  return (
    <g opacity={op} aria-hidden="true">
      {jenis === 0 ? <circle cx={x} cy={y} r={h} {...sty} /> : null}
      {jenis === 1 ? <rect x={x - h * 0.9} y={y - h * 0.9} width={s * 0.9} height={s * 0.9} {...sty} /> : null}
      {jenis === 2 ? <polygon points={`${x},${y - h} ${x + h},${y + h * 0.85} ${x - h},${y + h * 0.85}`} {...sty} /> : null}
      {jenis === 3 ? <polygon points={`${x},${y - h} ${x + h},${y} ${x},${y + h} ${x - h},${y}`} {...sty} /> : null}
    </g>
  );
}

/** Goresan turus berkelompok lima (yang kelima dicoret miring). Pojok kiri-atas (x, y), tinggi 16. */
function Goresan5({ x, y, n, warna = UNGU }: { x: number; y: number; n: number; warna?: string }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const g = Math.floor(i / 5);
        const j = i % 5;
        const gx = x + g * 30;
        return j < 4 ? <line key={i} x1={gx + j * 6} x2={gx + j * 6} y1={y} y2={y + 16} stroke={warna} strokeWidth={2.4} strokeLinecap="round" /> : <line key={i} x1={gx - 3} x2={gx + 21} y1={y + 14} y2={y + 2} stroke={warna} strokeWidth={2.4} strokeLinecap="round" />;
      })}
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

/* ------------------------------ Metode IGIL: pilah lalu turus ------------------------------ */
function Turus({ l, rupa, cara, kanvas, diam, salah, siap, info, nama }: PK & { l: LangkahTurus }) {
  const urut = useMemo(() => urutanCampur(l.isi, l.benih), [l]);
  const pts = useMemo(() => letakTumpukan(urut.length, l.benih), [urut, l.benih]);
  const target = urut.flatMap((j, i) => (j === l.j ? [i] : []));
  const [hijau, setHijau] = useState<number[]>([]);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const suaraSaja = cara === "suara" && !diam;
  useSiapLangsung((rupa === "lambang" || suaraSaja) && !diam, () => siap());
  if (rupa === "lambang")
    return <Pernyataan atas="Turus: lima goresan dicoret miring" baris={l.isi.map((n, j) => `${besar(nama[j])}: ${turusTeks(n)}`)} bawah={<>banyak {nama[l.j]} = <Tanya /></>} />;
  if (suaraSaja)
    return (
      <Gambar label="Turus tiap jenis di papan">
        <Judul teks="turus di papan: satu benda, satu goresan" />
        {l.isi.map((n, j) => (
          <g key={j}>
            <Item rupa={rupa} set={l.set} jenis={j} x={36} y={barisTurus(j).y + 8} s={22} />
            <Goresan5 x={barisTurus(j).x} y={barisTurus(j).y} n={n} />
          </g>
        ))}
      </Gambar>
    );
  const ketukBenda = (i: number) => {
    if (selesai || kanvas || diam || hijau.includes(i)) return;
    if (urut[i] === l.j) {
      const baru = [...hijau, i];
      setHijau(baru);
      setMerah(-1);
      if (baru.length === target.length) {
        setSelesai(true);
        siap(kalimatKunci(l));
      } else info(kata(baru.length));
    } else {
      setMerah(i);
      salah(`Itu bukan ${nama[l.j]}. Ketuk hanya ${nama[l.j]}, satu goresan untuk tiap benda.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, target.map((i) => pts[i]), JARI_TUMPUK);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? `Tanda hanya untuk ${nama[l.j]}. Bentuk jenis lain jangan diberi tanda.` : `Masih ada ${nama[l.j]} yang belum diberi tanda.`);
    }
  };
  const gambar = (
    <g>
      <Judul teks={diam ? `tumpukan masih campur: hitung ${nama[l.j]}` : kanvas ? `beri tanda pada tiap ${nama[l.j]}` : `ketuk tiap ${nama[l.j]}: satu goresan satu benda`} />
      {urut.map((j, i) => (
        <g key={i} {...(kanvas || diam ? {} : ketuk(() => ketukBenda(i)))} aria-label={`${rupa === "benda" ? nama[j] : "bentuk"} ${kata(i + 1)}`}>
          <rect x={pts[i].x - 17} y={pts[i].y - 17} width={34} height={34} fill="transparent" />
          <Item rupa={rupa} set={l.set} jenis={j} x={pts[i].x} y={pts[i].y} s={UKURAN_TUMPUK} hijau={hijau.includes(i)} merah={merah === i} />
        </g>
      ))}
      {!kanvas && !diam ? (
        <g aria-label="Goresan turus">
          <line x1={14} x2={286} y1={TURUS_TUMPUK.y - 6} y2={TURUS_TUMPUK.y - 6} stroke={TALI} strokeWidth={1.2} strokeDasharray="4 3" />
          <Goresan5 x={TURUS_TUMPUK.x} y={TURUS_TUMPUK.y} n={hijau.length} warna={HIJAU} />
        </g>
      ) : null}
    </g>
  );
  if (diam) return <Gambar label="Tumpukan benda yang masih campur">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tumpukan benda campur dan goresan turus">{gambar}</Gambar>;
}

/* ------------------------------ Sorting Hoops: lingkaran pilah ------------------------------ */
function Lingkaran({ l, rupa, cara, kanvas, diam, salah, siap, info, nama }: PK & { l: LangkahLingkaran }) {
  const k = l.isi.length;
  const urut = useMemo(() => urutanCampur(l.isi, l.benih), [l]);
  const [taruh, setTaruh] = useState<number[]>([]);
  const [pilih, setPilih] = useState(-1);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung((rupa === "lambang" || (!interaktif && !kanvas)) && !diam, () => siap());
  if (rupa === "lambang") return <Pernyataan atas="Isi tiap lingkaran" baris={l.isi.map((n, j) => `Lingkaran ${nama[j]} berisi ${n}`)} bawah={<>{kalimatTanya(l.tanya, nama)} <Tanya /></>} />;
  const r = rLingkaran(k);
  const sasaran = l.lingkari === "tersedikit" ? indeksTersedikit(l.isi) : indeksTerbanyak(l.isi);
  /** Jenis tiap benda di lingkaran j, dalam urutan tersusun (kanvas, suara, dan Cari kesalahan memakai isi data). */
  const dalamJenis = (j: number) => (interaktif ? taruh.filter((i) => urut[i] === j) : Array.from({ length: l.isi[j] }, (_, s) => s));
  const ketukBenda = (i: number) => {
    if (!interaktif || selesai || taruh.includes(i)) return;
    setPilih(i);
    setMerah(-1);
  };
  const ketukLingkaran = (j: number) => {
    if (!interaktif || selesai) return;
    if (pilih < 0) {
      info("Ketuk satu benda dulu, lalu ketuk lingkarannya.");
      return;
    }
    if (urut[pilih] !== j) {
      setMerah(pilih);
      salah(rupa === "benda" ? "Benda itu bukan jenis lingkaran ini. Lihat gambar di bawah lingkaran." : "Bentuk itu bukan jenis lingkaran ini. Lihat bentuk di bawah lingkaran.");
      return;
    }
    const baru = [...taruh, pilih];
    setTaruh(baru);
    setPilih(-1);
    setMerah(-1);
    if (baru.length === urut.length) {
      setSelesai(true);
      siap(`Semua benda sudah masuk lingkaran jenisnya. ${kalimatKunci(l)}`);
    } else info(kata(baru.length));
  };
  const periksa = () => {
    const rr = periksaLingkari(goresan, l.isi.map((_, j) => pusatLingkaran(j, k)), l.isi.map((_, j) => j === sasaran));
    if (rr.benar) {
      setSelesai(true);
      siap(`Betul! Lingkaran itu ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} isinya.`);
    } else {
      setGoresan([]);
      salah(rr.lebih > 0 ? "Lingkari satu lingkaran saja." : `Cari lingkaran yang ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} isinya, lalu lingkari.`);
    }
  };
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk benda, lalu ketuk lingkaran jenisnya" : kanvas ? `lingkari lingkaran yang ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} isinya` : "isi tiap lingkaran"} />
      {l.isi.map((_, j) => {
        const c = pusatLingkaran(j, k);
        return (
          <g key={j} {...(interaktif ? ketuk(() => ketukLingkaran(j)) : {})} aria-label={`lingkaran ${nama[j]}`}>
            <circle cx={c.x} cy={c.y} r={r} fill={rupa === "benda" ? "#FEF3C7" : "#FFFFFF"} stroke={TALI} strokeWidth={4} strokeDasharray={rupa === "benda" ? undefined : "6 3"} />
            {dalamJenis(j).map((s, idx) => {
              const t = letakDalam(j, k, idx);
              return <Item key={s} rupa={rupa} set={l.set} jenis={j} x={t.x} y={t.y} s={k === 4 ? 14 : UKURAN_DALAM} />;
            })}
            <Item rupa={rupa} set={l.set} jenis={j} x={c.x} y={c.y + r + 14} s={18} />
          </g>
        );
      })}
      {interaktif
        ? urut.map((j, i) => {
            if (taruh.includes(i)) return null;
            const t = letakKolam(i, urut.length);
            return (
              <g key={i} {...ketuk(() => ketukBenda(i))} aria-label={`${rupa === "benda" ? nama[j] : "bentuk"} ${kata(i + 1)}`}>
                <rect x={t.x - 15} y={t.y - 15} width={30} height={30} fill="transparent" />
                <Item rupa={rupa} set={l.set} jenis={j} x={t.x} y={t.y} s={22} sorot={pilih === i} merah={merah === i} />
              </g>
            );
          })
        : null}
    </g>
  );
  if (diam) return <Gambar label="Benda dalam lingkaran pilah">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Lingkaran pilah">{gambar}</Gambar>;
}

/* ------------------------------ One-to-One Matching: pasangkan satu-satu ------------------------------ */
function Pasang({ l, rupa, cara, kanvas, diam, salah, siap, info, nama }: PK & { l: LangkahPasang }) {
  const [p, q] = l.isi;
  const kecil = Math.min(p, q);
  const panjangBaris = p > q ? 0 : 1;
  const [pasangan, setPasangan] = useState<[number, number][]>([]);
  const [pilihA, setPilihA] = useState(-1);
  const [pilihB, setPilihB] = useState(-1);
  const [hijau, setHijau] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [pilihJenis, setPilihJenis] = useState<number[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  const sisa = Array.from({ length: Math.max(p, q) - kecil }, (_, i) => kecil + i);
  const banyakSisa = Math.max(p, q) - kecil;
  const sudahPasang = pasangan.length === kecil;
  useSiapLangsung(!diam && (rupa === "lambang" ? l.angka : !interaktif && !kanvas), () => siap());
  if (rupa === "lambang") {
    const pilihJenisKetuk = (j: number) => {
      if (diam || selesai || pilihJenis.includes(j)) return;
      if ((j === 0 ? p : q) > (j === 0 ? q : p)) {
        setSelesai(true);
        siap(`Betul! ${besar(nama[j])} punya benda tanpa pasangan.`);
      } else {
        setPilihJenis((m) => [...m, j]);
        salah(`${besar(nama[j])} sudah berpasangan semua. Cari jenis yang bendanya lebih banyak.`);
      }
    };
    return (
      <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
        <p className="text-sm text-[#7C3AED]">Dipasangkan satu-satu</p>
        <ul className="mx-auto grid max-w-md grid-cols-1 gap-1">
          {l.isi.map((n, j) => (
            <li key={j} className="rounded-lg border-2 border-[#F9A8D4] bg-[#FDF2F8] px-2 py-1 text-sm text-[#831843]">
              {besar(nama[j])}: {n}
            </li>
          ))}
        </ul>
        {l.angka ? (
          <p className="text-lg">
            tanpa pasangan = <Tanya />
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jenis">
            {l.isi.map((_, j) => (
              <Tombol key={j} teks={besar(nama[j])} mati={pilihJenis.includes(j) || selesai} onClick={() => pilihJenisKetuk(j)} />
            ))}
          </div>
        )}
      </div>
    );
  }
  const ketukItem = (baris: number, i: number) => {
    if (!interaktif || selesai) return;
    if (!sudahPasang) {
      if (pasangan.some((x) => x[baris] === i)) return;
      const a = baris === 0 ? i : pilihA;
      const b = baris === 1 ? i : pilihB;
      if (baris === 0) setPilihA(i);
      else setPilihB(i);
      if (a >= 0 && b >= 0) {
        const baru: [number, number][] = [...pasangan, [a, b]];
        setPasangan(baru);
        setPilihA(-1);
        setPilihB(-1);
        if (baru.length === kecil) {
          if (l.angka) siap(`Semua yang bisa dipasangkan sudah berpasangan. ${kalimatKunci(l)}`);
          else info("Sekarang ketuk benda yang tidak punya pasangan.");
        } else info(kata(baru.length));
      }
      return;
    }
    if (baris !== panjangBaris || l.angka || pasangan.some((x) => x[baris] === i) || hijau.includes(i)) return;
    const baru = [...hijau, i];
    setHijau(baru);
    if (baru.length === banyakSisa) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else info(kata(baru.length));
  };
  const periksa = () => {
    const letak = sisa.map((i) => letakPasang(panjangBaris, i, Math.max(p, q)));
    const r = periksaCentang(goresan, letak, JARI_PASANG);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Tanda hanya untuk benda yang tidak punya pasangan. Benda yang berpasangan jangan diberi tanda." : "Masih ada benda tanpa pasangan yang belum diberi tanda.");
    }
  };
  const barisN = [p, q];
  const garisPasang: [number, number][] = interaktif ? pasangan : Array.from({ length: kecil }, (_, i) => [i, i] as [number, number]);
  const gambar = (
    <g>
      <Judul teks={interaktif ? (sudahPasang ? "ketuk benda yang tidak punya pasangan" : "ketuk satu benda di tiap jenis untuk memasangkan") : kanvas ? "beri tanda pada benda yang tidak punya pasangan" : "benda yang dipasangkan satu-satu"} />
      {garisPasang.map(([a, b]) => {
        const ta = letakPasang(0, a, p);
        const tb = letakPasang(1, b, q);
        return <line key={`${a}-${b}`} x1={ta.x} y1={ta.y + UKURAN_PASANG / 2} x2={tb.x} y2={tb.y - UKURAN_PASANG / 2} stroke={HIJAU} strokeWidth={2.4} />;
      })}
      {[0, 1].map((baris) =>
        Array.from({ length: barisN[baris] }, (_, i) => {
          const t = letakPasang(baris, i, barisN[baris]);
          const pilihIni = (baris === 0 ? pilihA : pilihB) === i;
          const leftover = sudahPasang && baris === panjangBaris && !pasangan.some((x) => x[baris] === i);
          return (
            <g key={`${baris}-${i}`} {...(interaktif ? ketuk(() => ketukItem(baris, i)) : {})} aria-label={`${rupa === "benda" ? nama[baris] : "bentuk"} ${kata(i + 1)} baris ${kata(baris + 1)}`}>
              <rect x={t.x - 15} y={t.y - 15} width={30} height={30} fill="transparent" />
              <Item rupa={rupa} set={l.set} jenis={baris} x={t.x} y={t.y} s={UKURAN_PASANG} sorot={pilihIni || (interaktif && leftover && !hijau.includes(i))} hijau={hijau.includes(i)} />
            </g>
          );
        }),
      )}
    </g>
  );
  if (diam) return <Gambar label="Dua jenis benda dipasangkan satu-satu">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Memasangkan dua jenis benda satu-satu">{gambar}</Gambar>;
}

/* ------------------------------ Frequency Table: tabel frekuensi ------------------------------ */
function TabelSvg({ rupa, set, nama, isi, onKetuk, sorot, merah }: { rupa: Rupa; set: string; nama: string[]; isi: number[]; onKetuk?: (r: number) => void; sorot?: number; merah?: number }) {
  return (
    <g>
      {isi.map((n, r) => {
        const y = barisAtas(r);
        return (
          <g key={r} {...(onKetuk ? ketuk(() => onKetuk(r)) : {})} aria-label={`baris ${nama[r]}`}>
            <rect x={TABEL.xLabel} y={y} width={TABEL.wLabel} height={TABEL.h} rx={4} fill={sorot === r ? "#FDE68A" : "#FFFFFF"} stroke={merah === r ? MERAH : UNGU} strokeWidth={merah === r || sorot === r ? 3 : 1.5} />
            <rect x={TABEL.xGoresan} y={y} width={TABEL.wGoresan} height={TABEL.h} rx={4} fill="#FFFFFF" stroke={merah === r ? MERAH : UNGU} strokeWidth={merah === r ? 3 : 1.5} />
            <Item rupa={rupa} set={set} jenis={r} x={TABEL.xLabel + 18} y={y + TABEL.h / 2} s={18} />
            <text x={TABEL.xLabel + 32} y={y + TABEL.h / 2 + 3} fontSize={8.4} fontWeight={900} fill={UNGU}>
              {nama[r]}
            </text>
            <Goresan5 x={TABEL.xGoresan + 10} y={y + 7} n={n} warna="#B91C1C" />
          </g>
        );
      })}
      <text x={TABEL.xLabel + TABEL.wLabel / 2} y={TABEL.y0 - 5} textAnchor="middle" fontSize={8.4} fontWeight={900} fill="#7C3AED">
        Jenis
      </text>
      <text x={TABEL.xGoresan + TABEL.wGoresan / 2} y={TABEL.y0 - 5} textAnchor="middle" fontSize={8.4} fontWeight={900} fill="#7C3AED">
        Goresan
      </text>
    </g>
  );
}

function Tabel({ l, rupa, cara, kanvas, diam, salah, siap, nama }: PK & { l: LangkahTabel }) {
  const kejadian = useMemo(() => urutanCampur(l.isi, l.benih), [l]);
  const [hitung, setHitung] = useState<number[]>(() => l.isi.map(() => 0));
  const [langkah, setLangkah] = useState(0);
  const [merah, setMerah] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung((rupa === "lambang" || (!interaktif && !kanvas)) && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
        <p className="text-sm text-[#7C3AED]">Tabel</p>
        <table className="mx-auto w-full max-w-xs border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-2 py-1">Jenis</th>
              <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-2 py-1">Banyak</th>
            </tr>
          </thead>
          <tbody>
            {l.isi.map((n, j) => (
              <tr key={j}>
                <td className="border-2 border-[#1C01A5] bg-white px-2 py-1">{besar(nama[j])}</td>
                <td className="border-2 border-[#1C01A5] bg-white px-2 py-1">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-base">
          {kalimatTanya(l.tanya, nama)} <Tanya />
        </p>
      </div>
    );
  const sasaran = l.lingkari === "tersedikit" ? indeksTersedikit(l.isi) : indeksTerbanyak(l.isi);
  const ketukBaris = (r: number) => {
    if (!interaktif || selesai) return;
    if (kejadian[langkah] !== r) {
      setMerah(r);
      salah(`Benda itu bukan ${nama[r]}. Beri goresan di baris jenis benda yang sedang muncul.`);
      return;
    }
    setMerah(-1);
    setHitung((h) => h.map((v, j) => (j === r ? v + 1 : v)));
    if (langkah + 1 === kejadian.length) {
      setLangkah(langkah + 1);
      setSelesai(true);
      siap(`Semua benda sudah diberi goresan. ${kalimatKunci(l)}`);
    } else setLangkah(langkah + 1);
  };
  const periksa = () => {
    const rr = periksaLingkari(goresan, l.isi.map((_, r) => pusatBaris(r)), l.isi.map((_, r) => r === sasaran));
    if (rr.benar) {
      setSelesai(true);
      siap(`Betul! Baris itu ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} goresannya.`);
    } else {
      setGoresan([]);
      salah(rr.lebih > 0 ? "Lingkari satu baris saja." : `Cari baris yang ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} goresannya, lalu lingkari.`);
    }
  };
  const tampil = interaktif ? hitung : l.isi;
  const gambar = (
    <g>
      <Judul teks={interaktif ? "beri satu goresan di baris benda yang muncul" : kanvas ? `lingkari baris yang ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} goresannya` : "tabel frekuensi"} />
      {interaktif ? (
        <g aria-label="Benda yang muncul satu per satu">
          {kejadian.map((j, i) => {
            const t = letakKejadian(i, kejadian.length);
            return <Item key={i} rupa={rupa} set={l.set} jenis={j} x={t.x} y={t.y + 8} s={16} sorot={i === langkah} redup={i < langkah} />;
          })}
        </g>
      ) : null}
      <TabelSvg rupa={rupa} set={l.set} nama={nama} isi={tampil} onKetuk={interaktif ? ketukBaris : undefined} merah={interaktif ? merah : undefined} />
    </g>
  );
  if (diam) return <Gambar label="Tabel frekuensi">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tabel frekuensi">{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "turus" ? <Turus {...props} l={l} /> : l.tipe === "lingkaran" ? <Lingkaran {...props} l={l} /> : l.tipe === "pasang" ? <Pasang {...props} l={l} /> : <Tabel {...props} l={l} />;
}

function CariSalah({ l, rupa, cara, salah, siap, info, nama }: PK & { l: LangkahSalah }) {
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} kanvas={false} diam nama={nama} salah={salah} siap={() => undefined} info={info} />
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
export function LangkahPustaka({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const d = dasarDari(l);
  const nama = namaJenis(d.set, rupa);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const salah = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p0: string) => {
    const p = sesuaikan(p0, rupa);
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
  const pk: PK = { rupa, cara, kanvas: cara === "kanvas", nama, salah, siap, info };
  const tanya = d.tipe === "pasang" ? sesuaikan("Berapa benda yang tidak punya pasangan?", rupa) : kalimatTanya(tanyaDari(d), nama);
  return (
    <RupaCtx.Provider value={rupa}>
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
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
    </RupaCtx.Provider>
  );
}
