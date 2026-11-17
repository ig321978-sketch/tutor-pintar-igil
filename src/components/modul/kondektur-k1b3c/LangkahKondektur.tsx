"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { KURANG, angkaJawab, bacaOp, benarOp, kalimatJawab, kata, nomorBenar, pemeriksa, pilihanDari, tulisOp, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  CATATAN,
  GERBONG,
  GERBONG_KECIL,
  KANAN,
  KIRI,
  LEBAR_ADEGAN,
  POJOK_KANAN,
  POJOK_KIRI,
  PUCUK,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  kursiHilang,
  letakDi,
  letakGerbong,
  letakGerbongKecil,
  letakKartu,
  letakKursi,
  letakPojok,
  letakPucuk,
  periksaCentang,
  periksaLingkari,
  type Goresan,
  type Kotak,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 3 Sub-Bab C: kegiatan metode (memeriksa pengurangan dengan penjumlahan, tukar tempat, keluarga fakta,
 * segitiga fakta, bilangan hilang dengan hitung maju), lalu menjawab dengan caranya. Rupa: penumpang dan kursi (Concrete),
 * titik dan segitiga (Pictorial), angka dan tanda saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benda: string; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const BIRU = "#2563EB";
const MERAH = "#DC2626";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Satu penumpang: emoji dengan lingkaran baju berwarna (benda) atau titik berwarna (diagram). */
function Satu({ rupa, x, y, warna = BIRU, pudar = false, u = 20 }: { rupa: Rupa; x: number; y: number; warna?: string; pudar?: boolean; u?: number }) {
  if (rupa === "benda")
    return (
      <g opacity={pudar ? 0.3 : 1}>
        <circle cx={x} cy={y + 2} r={u * 0.6} fill={warna === BIRU ? "#BFDBFE" : "#FECACA"} stroke={warna} strokeWidth={1.4} />
        <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u}>
          {EMOJI.penumpang}
        </text>
      </g>
    );
  return <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.4} opacity={pudar ? 0.3 : 1} />;
}

function Wadah({ k, isi, garis, nama, rx = 10 }: { k: Kotak; isi: string; garis: string; nama?: string; rx?: number }) {
  return (
    <g>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={rx} fill={isi} stroke={garis} strokeWidth={2.4} />
      {nama ? (
        <text x={k.x + 6} y={k.y + 13} fontSize={10} fontWeight={900} fill={garis}>
          {nama}
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

/** Kalimat tanya untuk rupa lambang. */
const Tanya = ({ atas, kalimat }: { atas: string; kalimat: string }) => (
  <div className="space-y-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
    <p className="text-lg">{atas}</p>
    <p>{kalimat}</p>
  </div>
);

/* ------------------------------ Periksa: pilih penjumlahan pemeriksa ------------------------------ */
function Periksa({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "periksa" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorBenar(l);
  const pesanBetul = `Betul! ${kapital(bacaOp(pemeriksa(l)))}. Catatannya cocok.`;
  const petunjuk = (i: number) => (l.pilihan[i].op === "-" ? "Itu pengurangan. Periksa dengan penjumlahan: sisa ditambah yang turun." : !benarOp(l.pilihan[i]) ? "Hasilnya belum pas. Sisa ditambah yang turun harus kembali ke mula-mula." : "Coba yang lain.");
  const ketukKartu = (i: number) => {
    if (selesai || mati.includes(i)) return;
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
    const r = periksaLingkari(goresan, l.pilihan.map((_, i) => letakKartu(i)), l.pilihan.map((_, i) => benar.includes(i)));
    if (r.benar) {
      setSelesai(true);
      siap(pesanBetul);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Ada kalimat lain ikut dilingkari. Lingkari satu penjumlahan saja." : "Penjumlahan pemeriksanya belum dilingkari.");
    }
  };
  const catatan = `${l.a} ${KURANG} ${l.b} = ${l.a - l.b}`;
  const adegan =
    rupa === "lambang" ? (
      <g>
        <rect x={14} y={8} width={272} height={86} rx={12} fill="#F8FAFC" stroke="#1C01A5" strokeWidth={2} />
        <text x={150} y={40} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1C01A5">
          Catatan kondektur:
        </text>
        <text x={150} y={74} textAnchor="middle" fontSize={22} fontWeight={900} fill={MERAH}>
          {catatan}
        </text>
      </g>
    ) : (
      <g>
        <Wadah k={GERBONG_KECIL} isi={rupa === "benda" ? "#E0E7FF" : "#F8FAFC"} garis="#4338CA" nama={`mula-mula ${l.a}, turun ${l.b}`} rx={16} />
        {Array.from({ length: l.a }, (_, i) => {
          const p = letakGerbongKecil(i);
          return <Satu key={i} rupa={rupa} x={p.x} y={p.y + 8} warna={i >= l.a - l.b ? MERAH : BIRU} pudar={i >= l.a - l.b} u={20} />;
        })}
        <Wadah k={CATATAN} isi="#FEF9C3" garis="#A16207" nama="catatan" />
        <text x={CATATAN.x + CATATAN.w / 2} y={CATATAN.y + 56} textAnchor="middle" fontSize={14} fontWeight={900} fill={MERAH}>
          {catatan}
        </text>
      </g>
    );
  const gambar = (
    <g>
      {adegan}
      {l.pilihan.map((p, i) => {
        const c = letakKartu(i);
        const on = pilih === i && selesai;
        const m = mati.includes(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukKartu(i)))} aria-label={`kalimat ${tulisOp(p)}`} aria-disabled={m}>
            <rect x={c.x - UKURAN_KARTU.w / 2} y={c.y - UKURAN_KARTU.h / 2} width={UKURAN_KARTU.w} height={UKURAN_KARTU.h} rx={10} fill={on ? "#BBF7D0" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={on ? 3.2 : 1.8} opacity={m ? 0.35 : 1} />
            <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={rupa === "lambang" ? 17 : 11} fontWeight={900} fill="#1C01A5" opacity={m ? 0.35 : 1}>
              {rupa === "lambang" ? tulisOp(p) : bacaOp(p)}
            </text>
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Memeriksa dengan penjumlahan">{gambar}</Gambar>;
}

/* ------------------------------ Tukar tempat ------------------------------ */
function Tukar({ l, rupa, siap }: PK & { l: Extract<Langkah, { tipe: "tukar" }> }) {
  const [ditukar, setDitukar] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <Tanya atas={`${l.a} + ${l.b} = ${l.b} + ${l.a}`} kalimat={`${l.b} + ${l.a} = ?`} />;
  const kiri = ditukar ? l.b : l.a;
  const kanan = ditukar ? l.a : l.b;
  return (
    <div className="space-y-2">
      <Gambar label="Tukar tempat">
        <Wadah k={KIRI} isi="#DBEAFE" garis="#1D4ED8" nama="kiri" />
        <Wadah k={KANAN} isi="#FEE2E2" garis="#B91C1C" nama="kanan" />
        {Array.from({ length: kiri }, (_, i) => {
          const p = letakDi(KIRI, i);
          return <Satu key={`k${i}`} rupa={rupa} x={p.x} y={p.y} warna={ditukar ? MERAH : BIRU} u={20} />;
        })}
        {Array.from({ length: kanan }, (_, i) => {
          const p = letakDi(KANAN, i);
          return <Satu key={`n${i}`} rupa={rupa} x={p.x} y={p.y} warna={ditukar ? BIRU : MERAH} u={20} />;
        })}
        <text x={150} y={160} textAnchor="middle" fontSize={22} fontWeight={900} fill="#1C01A5">
          {`${kiri} + ${kanan} = ?`}
        </text>
        <text x={150} y={188} textAnchor="middle" fontSize={11} fontWeight={900} fill="#7C3AED">
          {ditukar ? `tadi ${l.a} + ${l.b}, sekarang ${l.b} + ${l.a}` : "tekan tukar tempat"}
        </text>
      </Gambar>
      {!ditukar ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]"
            onClick={() => {
              setDitukar(true);
              siap("Sudah ditukar. Hasilnya tetap sama.");
            }}
          >
            {"\u{1F504}"} Tukar tempat
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Keluarga fakta: yang biru turun ------------------------------ */
function Keluarga({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "keluarga" }> }) {
  const z = l.x + l.y;
  const [turun, setTurun] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-2 py-2 text-center text-xl font-black text-[#1C01A5]">
        <span className="rounded-xl bg-[#DBEAFE] py-1">{`${l.x} + ${l.y} = ${z}`}</span>
        <span className="rounded-xl bg-[#DBEAFE] py-1">{`${l.y} + ${l.x} = ${z}`}</span>
        <span className="rounded-xl border-4 border-dashed border-[#DC2626] bg-white py-1">
          {`${z} ${KURANG} ${l.x} = `}
          <span className="text-[#DC2626]">?</span>
        </span>
        <span className="rounded-xl bg-[#FEE2E2] py-1">{`${z} ${KURANG} ${l.y} = ${l.x}`}</span>
      </div>
    );
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || turun.includes(i)) return;
    if (i >= l.x) {
      salah("Yang ini berwarna merah. Ketuk yang biru saja.");
      return;
    }
    const baru = [...turun, i];
    setTurun(baru);
    if (baru.length === l.x) {
      setSelesai(true);
      siap("Semua yang biru sudah turun.");
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, Array.from({ length: l.x }, (_, i) => letakGerbong(i)), 18);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap yang biru.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? "Beri tanda pada yang biru saja." : r.dobel > 0 ? "Satu benda, satu tanda." : "Ada yang biru belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Wadah k={GERBONG} isi={rupa === "benda" ? "#EEF2FF" : "#F8FAFC"} garis="#4338CA" nama={`keluarga ${l.x}, ${l.y}, ${z}`} rx={18} />
      {Array.from({ length: z }, (_, i) => {
        const p = letakGerbong(i);
        const sudah = turun.includes(i);
        return (
          <g key={i} {...(kanvas || sudah ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${i < l.x ? "biru" : "merah"} ${i + 1}`}>
            <Satu rupa={rupa} x={p.x} y={p.y} warna={i < l.x ? BIRU : MERAH} pudar={sudah} u={22} />
          </g>
        );
      })}
      <text x={150} y={156} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1C01A5">
        {`${l.x} + ${l.y} = ${z}    ${l.y} + ${l.x} = ${z}`}
      </text>
      <text x={150} y={182} textAnchor="middle" fontSize={15} fontWeight={900} fill={MERAH}>
        {`${z} ${KURANG} ${l.x} = ?    ${z} ${KURANG} ${l.y} = ${l.x}`}
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Keluarga fakta">{gambar}</Gambar>;
}

/* ------------------------------ Segitiga fakta ------------------------------ */
function Segitiga({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "segitiga" }> }) {
  const z = l.x + l.y;
  const n = l.tutup === "z" ? z : l.y;
  const [hitung, setHitung] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") {
    const sudut = (isi: string, kelas: string) => <span className={`flex h-14 w-14 items-center justify-center rounded-xl border-4 ${kelas}`}>{isi}</span>;
    return (
      <div className="mx-auto max-w-xs space-y-1 py-2 text-center text-2xl font-black text-[#1C01A5]">
        <div className="flex justify-center">{sudut(l.tutup === "z" ? "?" : String(z), l.tutup === "z" ? "border-dashed border-[#DC2626] text-[#DC2626]" : "border-[#7C3AED] bg-[#EDE9FE]")}</div>
        <p className="text-3xl leading-none text-[#7C3AED]">{"\u{25B3}"}</p>
        <div className="flex justify-center gap-12">
          {sudut(String(l.x), "border-[#7C3AED] bg-[#EDE9FE]")}
          {sudut(l.tutup === "y" ? "?" : String(l.y), l.tutup === "y" ? "border-dashed border-[#DC2626] text-[#DC2626]" : "border-[#7C3AED] bg-[#EDE9FE]")}
        </div>
      </div>
    );
  }
  // Sasaran: tutup pucuk = semua benda di dua pojok; tutup pojok kanan = benda di pucuk yang tidak ada di pojok kiri.
  const sasaran = l.tutup === "z" ? [...Array.from({ length: l.x }, (_, i) => letakPojok(POJOK_KIRI, i)), ...Array.from({ length: l.y }, (_, i) => letakPojok(POJOK_KANAN, i))] : Array.from({ length: l.y }, (_, j) => letakPucuk(l.x + j));
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || hitung.includes(i)) return;
    const baru = [...hitung, i];
    setHitung(baru);
    if (baru.length === n) {
      setSelesai(true);
      siap(l.tutup === "z" ? `Semuanya ${kata(n)}.` : `Pojok kanan berisi ${kata(n)}.`);
    }
  };
  const periksa = () => {
    if (l.tutup === "z") {
      const r = periksaCentang(goresan, sasaran, 11);
      if (r.benar) {
        setSelesai(true);
        siap("Betul! Semua benda di dua pojok sudah diberi tanda.");
      } else {
        setGoresan([]);
        salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Beri tanda di dua pojok bawah saja." : "Ada benda di pojok bawah yang belum diberi tanda.");
      }
      return;
    }
    const r = periksaLingkari(goresan, Array.from({ length: z }, (_, i) => letakPucuk(i)), Array.from({ length: z }, (_, i) => i >= l.x));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu isi pojok kanan.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Yang pudar sudah ada di pojok kiri. Lingkari yang lain." : "Masih ada yang belum dilingkari.");
    }
  };
  const diagram = rupa === "diagram";
  const kain = (k: Kotak) => (
    <g>
      <rect x={k.x + 4} y={k.y + 18} width={k.w - 8} height={k.h - 24} rx={8} fill="#94A3B8" stroke="#475569" strokeWidth={2} />
      <text x={k.x + k.w / 2} y={k.y + k.h / 2 + 12} textAnchor="middle" fontSize={22} fontWeight={900} fill="#FFFFFF">
        ?
      </text>
    </g>
  );
  const gambar = (
    <g>
      {diagram ? (
        <polygon points={`${PUCUK.x + PUCUK.w / 2},${PUCUK.y + PUCUK.h} ${POJOK_KIRI.x + POJOK_KIRI.w / 2},${POJOK_KIRI.y} ${POJOK_KANAN.x + POJOK_KANAN.w / 2},${POJOK_KANAN.y}`} fill="#EDE9FE" stroke="#7C3AED" strokeWidth={3} />
      ) : null}
      <Wadah k={PUCUK} isi={diagram ? "#FFFFFF" : "#FEF9C3"} garis="#7C3AED" nama={diagram ? "pucuk" : "semua"} rx={diagram ? 30 : 10} />
      <Wadah k={POJOK_KIRI} isi={diagram ? "#FFFFFF" : "#DBEAFE"} garis="#7C3AED" nama={diagram ? "pojok" : "biru"} rx={diagram ? 30 : 10} />
      <Wadah k={POJOK_KANAN} isi={diagram ? "#FFFFFF" : "#FEE2E2"} garis="#7C3AED" nama={diagram ? "pojok" : "merah"} rx={diagram ? 30 : 10} />
      {l.tutup === "z"
        ? kain(PUCUK)
        : Array.from({ length: z }, (_, i) => {
            const p = letakPucuk(i);
            const sudah = hitung.includes(i);
            return (
              <g key={`p${i}`} {...(kanvas || i < l.x || sudah ? {} : ketuk(() => ketukSatu(i)))} aria-label={`pucuk ${i + 1}`}>
                <Satu rupa={rupa} x={p.x} y={p.y} warna={i < l.x ? BIRU : MERAH} pudar={i < l.x} u={18} />
                {!kanvas && sudah ? (
                  <text x={p.x} y={p.y - 11} textAnchor="middle" fontSize={10} fontWeight={900} fill={MERAH}>
                    {hitung.indexOf(i) + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
      {Array.from({ length: l.x }, (_, i) => {
        const p = letakPojok(POJOK_KIRI, i);
        const sudah = hitung.includes(100 + i);
        return (
          <g key={`a${i}`} {...(kanvas || l.tutup !== "z" || sudah ? {} : ketuk(() => ketukSatu(100 + i)))} aria-label={`pojok kiri ${i + 1}`}>
            <Satu rupa={rupa} x={p.x} y={p.y} warna={BIRU} u={18} pudar={sudah} />
          </g>
        );
      })}
      {l.tutup === "y"
        ? kain(POJOK_KANAN)
        : Array.from({ length: l.y }, (_, i) => {
            const p = letakPojok(POJOK_KANAN, i);
            const sudah = hitung.includes(200 + i);
            return (
              <g key={`b${i}`} {...(kanvas || sudah ? {} : ketuk(() => ketukSatu(200 + i)))} aria-label={`pojok kanan ${i + 1}`}>
                <Satu rupa={rupa} x={p.x} y={p.y} warna={MERAH} u={18} pudar={sudah} />
              </g>
            );
          })}
      {!kanvas && l.tutup === "z" ? (
        <text x={150} y={104} textAnchor="middle" fontSize={12} fontWeight={900} fill={MERAH}>
          dihitung: {hitung.length}
        </text>
      ) : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Segitiga fakta">{gambar}</Gambar>;
}

/* ------------------------------ Bilangan hilang: hitung maju ------------------------------ */
function Hilang({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "hilang" }> }) {
  const c = l.a + l.b;
  const [maju, setMaju] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang" || l.b === 0) siap(rupa === "lambang" ? undefined : "Semua kursi sudah terisi. Tidak ada yang kosong.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <Tanya atas={`Cari bilangan yang hilang.`} kalimat={`${l.a} + ? = ${c}`} />;
  const ketukKursi = (i: number) => {
    if (selesai || kanvas || i < l.a) return;
    if (i !== l.a + maju) {
      salah("Hitung maju berurutan dari kiri, satu per satu.");
      return;
    }
    setMaju(maju + 1);
    if (maju + 1 === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.a))}, lalu ${Array.from({ length: l.b }, (_, j) => kata(l.a + j + 1)).join(", ")}.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, kursiHilang(l.a, l.b).map((i) => letakKursi(c, i)), 13);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap kursi kosong.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? "Beri tanda pada kursi kosong saja." : r.dobel > 0 ? "Satu kursi, satu tanda." : "Ada kursi kosong yang belum diberi tanda.");
    }
  };
  const benda = rupa === "benda";
  const gambar = (
    <g>
      <text x={150} y={46} textAnchor="middle" fontSize={22} fontWeight={900} fill="#1C01A5">
        {`${l.a} + ? = ${c}`}
      </text>
      <rect x={10} y={88} width={280} height={50} rx={14} fill={benda ? "#E0E7FF" : "#F8FAFC"} stroke="#4338CA" strokeWidth={2.4} />
      {Array.from({ length: c }, (_, i) => {
        const p = letakKursi(c, i);
        const isi = i < l.a;
        const sudah = !kanvas && i >= l.a && i < l.a + maju;
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukKursi(i)))} aria-label={`kursi ${i + 1}${isi ? " terisi" : " kosong"}`}>
            {benda ? (
              <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={22}>
                {isi ? EMOJI.penumpang : EMOJI.kursi}
              </text>
            ) : (
              <rect x={p.x - 11} y={p.y - 11} width={22} height={22} rx={3} fill={isi ? "#4338CA" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={1.6} />
            )}
            {i === l.a - 1 || sudah ? (
              <text x={p.x} y={p.y + 38} textAnchor="middle" fontSize={13} fontWeight={900} fill={sudah ? MERAH : "#1C01A5"}>
                {i + 1}
              </text>
            ) : null}
          </g>
        );
      })}
      <text x={150} y={186} textAnchor="middle" fontSize={11} fontWeight={900} fill="#4338CA">
        mulai dari {l.a}, hitung maju sampai {c}
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || l.b === 0} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bilangan yang hilang">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Tukar tempat pada penjumlahan, hasilnya tetap sama.",
  keluarga: "Semua dikurangi satu bagian sama dengan bagian yang lain.",
  segitiga: "Pucuk tertutup: jumlahkan. Pojok tertutup: kurangi.",
  pikir: "Hitung maju dari bilangan pertama sampai bilangan terakhir.",
};

export function LangkahKondektur({ ls, rupa, bicara, onBenar }: P) {
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
    const kj = kalimatJawab(l);
    if (m === n) tuntas(kj ? `Betul! ${kapital(bacaOp(kj))}.` : "Betul!");
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap };
  const tanya = l.tipe === "keluarga" ? "Berapa yang tinggal?" : l.tipe === "segitiga" ? "Berapa bilangan yang tertutup?" : l.tipe === "hilang" ? "Berapa bilangan yang hilang?" : "Berapa hasilnya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "periksa" ? <Periksa {...pk} l={l} /> : l.tipe === "tukar" ? <Tukar {...pk} l={l} /> : l.tipe === "keluarga" ? <Keluarga {...pk} l={l} /> : l.tipe === "segitiga" ? <Segitiga {...pk} l={l} /> : <Hilang {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
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
