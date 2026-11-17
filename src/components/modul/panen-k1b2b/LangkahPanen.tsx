"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { angkaJawab, bacaBerulang, bacaKalimat, kalimatTukar, kata, nomorTukar, pilihanDari, tulisBerulang, tulisKalimat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  BINGKAI,
  GARIS,
  KANTONG,
  KERANJANG_KANAN,
  KERANJANG_KIRI,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  diKantong,
  letakDi,
  letakKartu,
  periksaCentang,
  periksaLingkari,
  tengahKantong,
  tengahSel,
  titikAngka,
  xAngka,
  xKantong,
  type Goresan,
  type Kotak,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 2 Sub-Bab B: kegiatan metode (tukar tempat, pasangan bilangan, garis bilangan, kantong berulang,
 * membuat sepuluh), lalu menjawab dengan caranya. Rupa: sayur panen (Concrete), titik dan diagram (Pictorial),
 * angka dan tanda saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benda: string; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; benda: string; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const WARNA_A = "#2563EB";
const WARNA_B = "#DB2777";
const TOMBOL = "min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Satu({ rupa, benda, x, y, warna, u = 20 }: { rupa: Rupa; benda: string; x: number; y: number; warna: string; u?: number }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u}>
        {EMOJI[benda] ?? EMOJI.bibit}
      </text>
    );
  return <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.4} />;
}

function Keranjang({ k, rupa, n, warna, benda }: { k: Kotak; rupa: Rupa; n: number; warna: string; benda: string }) {
  return (
    <g>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={12} fill={rupa === "benda" ? "#FDE68A" : "#F1F5F9"} stroke={rupa === "benda" ? "#92400E" : "#1C01A5"} strokeWidth={2.4} />
      {rupa === "benda" ? <path d={`M${k.x + 8} ${k.y + 14} H${k.x + k.w - 8} M${k.x + 8} ${k.y + 40} H${k.x + k.w - 8}`} stroke="#B45309" strokeWidth={1} opacity={0.5} /> : null}
      {Array.from({ length: n }, (_, i) => {
        const p = letakDi(k, i);
        return <Satu key={i} rupa={rupa} benda={benda} x={p.x} y={p.y + 8} warna={warna} />;
      })}
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

/* ------------------------------ Tukar tempat: pilih kalimat sesudah ditukar ------------------------------ */
function Tukar({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "tukar" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorTukar(l);
  const pesan = `Betul! ${kapital(bacaKalimat(kalimatTukar(l)))}. Hasilnya sama dengan sebelum ditukar.`;
  const petunjuk = (i: number) => (l.pilihan[i][0] + l.pilihan[i][1] !== l.pilihan[i][2] ? "Hasilnya belum pas. Ditukar tempat, hasilnya tetap sama." : "Lihat keranjang kiri dulu, lalu keranjang kanan.");
  const ketukKartu = (i: number) => {
    if (selesai || mati.includes(i)) return;
    setPilih(i);
    if (benar.includes(i)) {
      setSelesai(true);
      siap(pesan);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjuk(i));
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, l.pilihan.map((_, i) => letakKartu(i)), l.pilihan.map((_, i) => benar.includes(i)));
    if (r.benar) {
      setSelesai(true);
      siap(pesan);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Ada kalimat yang tidak cocok ikut dilingkari. Lingkari satu kalimat saja." : "Kalimat yang cocok belum dilingkari.");
    }
  };
  const adegan =
    rupa === "lambang" ? (
      <g>
        <rect x={14} y={8} width={272} height={84} rx={12} fill="#F8FAFC" stroke="#1C01A5" strokeWidth={2} />
        <text x={150} y={38} textAnchor="middle" fontSize={15} fontWeight={900} fill="#64748B">
          Sebelum: kiri {l.a}, kanan {l.b}
        </text>
        <text x={150} y={72} textAnchor="middle" fontSize={17} fontWeight={900} fill="#DB2777">
          Sesudah ditukar: kiri {l.b}, kanan {l.a}
        </text>
      </g>
    ) : (
      <g>
        <Keranjang k={KERANJANG_KIRI} rupa={rupa} n={l.b} warna={WARNA_B} benda={benda} />
        <Keranjang k={KERANJANG_KANAN} rupa={rupa} n={l.a} warna={WARNA_A} benda={benda} />
        <text x={150} y={102} textAnchor="middle" fontSize={11} fontWeight={900} fill="#DB2777">
          {"\u{1F504}"} sesudah ditukar
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
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukKartu(i)))} aria-label={`kalimat ${tulisKalimat(p)}`} aria-disabled={m}>
            <rect x={c.x - UKURAN_KARTU.w / 2} y={c.y - UKURAN_KARTU.h / 2} width={UKURAN_KARTU.w} height={UKURAN_KARTU.h} rx={10} fill={on ? "#BBF7D0" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={on ? 3.2 : 1.8} opacity={m ? 0.35 : 1} />
            <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={rupa === "lambang" ? 17 : 11} fontWeight={900} fill="#1C01A5" opacity={m ? 0.35 : 1}>
              {rupa === "lambang" ? tulisKalimat(p) : bacaKalimat(p)}
            </text>
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tukar tempat">{gambar}</Gambar>;
}

/* ------------------------------ Pasangan bilangan: tekan Tukar tempat ------------------------------ */
function Pasangan({ l, rupa, benda, siap }: PK & { l: Extract<Langkah, { tipe: "pasangan" }> }) {
  const [ditukar, setDitukar] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
        <p>
          {l.a} + {l.b} = <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
        </p>
        <p className="text-lg text-[#DB2777]">
          {"\u{1F504}"} {l.b} + {l.a} = <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
        </p>
      </div>
    );
  const kiri = ditukar ? l.b : l.a;
  const kanan = ditukar ? l.a : l.b;
  return (
    <div className="space-y-2">
      <Gambar label="Pasangan bilangan">
        <Keranjang k={KERANJANG_KIRI} rupa={rupa} n={kiri} warna={ditukar ? WARNA_B : WARNA_A} benda={benda} />
        <Keranjang k={KERANJANG_KANAN} rupa={rupa} n={kanan} warna={ditukar ? WARNA_A : WARNA_B} benda={benda} />
        <text x={80} y={112} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1C01A5">
          kiri {kata(kiri)}
        </text>
        <text x={220} y={112} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1C01A5">
          kanan {kata(kanan)}
        </text>
        {ditukar ? (
          <text x={150} y={150} textAnchor="middle" fontSize={13} fontWeight={900} fill="#DB2777">
            ditukar, banyaknya tetap
          </text>
        ) : null}
      </Gambar>
      {!ditukar ? (
        <div className="flex justify-center">
          <button
            type="button"
            className={TOMBOL}
            onClick={() => {
              setDitukar(true);
              siap("Keranjang sudah ditukar. Banyaknya tetap sama.");
            }}
          >
            {"\u{1F504}"} Tukar tempat
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Garis bilangan: melompat ------------------------------ */
function Garis({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "garis" }> }) {
  const [lompat, setLompat] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="flex flex-wrap items-center justify-center gap-1.5 py-3 text-2xl font-black text-[#1C01A5]">
        <span className="rounded-xl border-4 border-[#1C01A5] bg-[#DBEAFE] px-3">{l.a}</span>
        {Array.from({ length: l.b }, (_, j) => (
          <React.Fragment key={j}>
            <span className="text-base text-[#DC2626]">{"\u{2934}\u{FE0F}"}</span>
            <span className="rounded-xl border-4 border-dashed border-[#DB2777] bg-white px-3 text-[#DC2626]">?</span>
          </React.Fragment>
        ))}
        <span className="w-full text-center text-base">
          {l.a} + {l.b} = ?
        </span>
      </div>
    );
  const pos = l.a + lompat;
  const ketukAngka = (n: number) => {
    if (selesai || kanvas) return;
    if (n !== pos + 1) {
      salah(n <= pos ? "Lompat ke kanan, ke angka berikutnya." : "Satu lompatan hanya maju satu angka.");
      return;
    }
    setLompat(lompat + 1);
    if (lompat + 1 === l.b) {
      setSelesai(true);
      siap(`Mendarat di ${kata(l.a + l.b)}.`);
    }
  };
  const periksa = () => {
    const sasaran = Array.from({ length: l.b }, (_, j) => titikAngka(l.a + j + 1, rupa === "benda"));
    const r = periksaCentang(goresan, sasaran, 11);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Tiap tempat mendarat sudah diberi tanda.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? "Angka awal tidak ditandai. Beri tanda hanya pada angka tempat mendarat." : r.dobel > 0 ? "Satu angka, satu tanda." : "Ada tempat mendarat yang belum diberi tanda.");
    }
  };
  const kayu = rupa === "benda";
  const gambar = (
    <g>
      {kayu ? <rect x={6} y={GARIS.y - 6} width={288} height={30} rx={14} fill="#A3E635" opacity={0.35} /> : <line x1={GARIS.x0 - 10} y1={GARIS.y} x2={xAngka(10) + 10} y2={GARIS.y} stroke="#1C01A5" strokeWidth={2.4} strokeLinecap="round" />}
      {Array.from({ length: 11 }, (_, n) => {
        const awal = n === l.a;
        const lewat = !kanvas && n > l.a && n <= pos;
        const isi = awal ? "#DBEAFE" : lewat ? "#FCE7F3" : "#FFFFFF";
        return (
          <g key={n} {...(kanvas ? {} : ketuk(() => ketukAngka(n)))} aria-label={`${kayu ? "batu" : "angka"} ${n}${awal ? " awal" : ""}`}>
            {kayu ? (
              <ellipse cx={xAngka(n)} cy={GARIS.y + 9} rx={12} ry={10} fill={awal ? "#BFDBFE" : lewat ? "#FBCFE8" : "#D6D3D1"} stroke="#57534E" strokeWidth={awal ? 3 : 1.6} />
            ) : (
              <>
                <line x1={xAngka(n)} y1={GARIS.y - 8} x2={xAngka(n)} y2={GARIS.y + 8} stroke="#1C01A5" strokeWidth={2} />
                <circle cx={xAngka(n)} cy={GARIS.y + 30} r={11} fill={isi} stroke={awal ? WARNA_A : "#1C01A5"} strokeWidth={awal ? 3 : 1.4} />
              </>
            )}
            <text x={xAngka(n)} y={kayu ? GARIS.y + 14 : GARIS.y + 35} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5">
              {n}
            </text>
          </g>
        );
      })}
      {Array.from({ length: kanvas ? 0 : lompat }, (_, j) => (
        <path key={j} d={`M${xAngka(l.a + j)} ${GARIS.y - 18} Q${xAngka(l.a + j) + GARIS.s / 2} ${GARIS.y - 46} ${xAngka(l.a + j + 1)} ${GARIS.y - 18}`} fill="none" stroke="#DC2626" strokeWidth={2.6} />
      ))}
      {kayu ? (
        <text x={xAngka(pos)} y={GARIS.y - 50} textAnchor="middle" fontSize={20}>
          {"\u{1F407}"}
        </text>
      ) : (
        <circle cx={xAngka(pos)} cy={GARIS.y - 56} r={7} fill={WARNA_B} stroke="#1C01A5" strokeWidth={1.4} />
      )}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Garis bilangan">{gambar}</Gambar>;
}

/* ------------------------------ Kantong berulang ------------------------------ */
function Berulang({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "berulang" }> }) {
  const [buka, setBuka] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-3 text-center font-black text-[#1C01A5]">
        <p className="text-2xl">{tulisBerulang(l.n, l.k).replace(/= \d+$/, "= ?")}</p>
        <p className="text-sm text-[#DB2777]">
          {l.k} kali {l.n}, bilangan yang sama ditambahkan
        </p>
      </div>
    );
  const ketukKantong = (j: number) => {
    if (selesai || kanvas) return;
    if (j !== buka) {
      salah("Hitung kantong berurutan dari kiri.");
      return;
    }
    setBuka(buka + 1);
    if (buka + 1 === l.k) {
      setSelesai(true);
      siap(`${kapital(Array.from({ length: l.k }, (_, i) => kata(l.n * (i + 1))).join(", "))}.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, Array.from({ length: l.k }, (_, j) => tengahKantong(l.k, j)), 24);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap kantong.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kantong, satu tanda." : r.nyasar > 0 ? "Beri tanda di dalam kantong." : "Ada kantong yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      {Array.from({ length: l.k }, (_, j) => {
        const x = xKantong(l.k, j);
        return (
          <g key={j} {...(kanvas ? {} : ketuk(() => ketukKantong(j)))} aria-label={`kantong ${j + 1}`}>
            <rect x={x} y={KANTONG.y} width={KANTONG.w} height={KANTONG.h} rx={rupa === "benda" ? 18 : 6} fill={!kanvas && j < buka ? "#DCFCE7" : rupa === "benda" ? "#FDE68A" : "#F8FAFC"} stroke={rupa === "benda" ? "#92400E" : "#1C01A5"} strokeWidth={2.2} />
            {rupa === "benda" ? <line x1={x + 14} y1={KANTONG.y} x2={x + KANTONG.w - 14} y2={KANTONG.y} stroke="#92400E" strokeWidth={4} /> : null}
            {Array.from({ length: l.n }, (_, i) => {
              const p = diKantong(l.k, j, i);
              return <Satu key={i} rupa={rupa} benda={benda} x={p.x} y={p.y} warna={j % 2 ? WARNA_B : WARNA_A} u={18} />;
            })}
            {!kanvas && j < buka ? (
              <text x={x + KANTONG.w / 2} y={KANTONG.y + KANTONG.h + 22} textAnchor="middle" fontSize={16} fontWeight={900} fill="#DC2626">
                {l.n * (j + 1)}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kantong sama banyak">{gambar}</Gambar>;
}

/* ------------------------------ Membuat sepuluh ------------------------------ */
function Sepuluh({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "sepuluh" }> }) {
  const [isi, setIsi] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const kosong = 10 - l.a;
  useEffect(() => {
    if (rupa === "lambang" || kosong === 0) siap(rupa === "lambang" ? undefined : "Bingkai sudah penuh. Tidak ada kotak kosong.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <p>
          {l.a} + <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span> = 10
        </p>
        <p className="text-sm text-[#DB2777]">pasangan sepuluh dari {l.a}</p>
      </div>
    );
  const ketukSel = (i: number) => {
    if (selesai || kanvas || i < l.a + isi) return;
    if (i !== l.a + isi) {
      salah("Isi kotak kosong berikutnya: dari kiri, baris atas dulu.");
      return;
    }
    setIsi(isi + 1);
    if (isi + 1 === kosong) {
      setSelesai(true);
      siap("Bingkai penuh sepuluh.");
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, Array.from({ length: kosong }, (_, j) => tengahSel(l.a + j)), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Semua kotak kosong sudah diberi tanda.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak, satu tanda." : r.nyasar > 0 ? "Beri tanda hanya pada kotak yang kosong." : "Ada kotak kosong yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <rect x={BINGKAI.x - 8} y={BINGKAI.y - 8} width={BINGKAI.s * 5 + 16} height={BINGKAI.s * 2 + 16} rx={10} fill={rupa === "benda" ? "#FDE68A" : "#EEF2FF"} stroke={rupa === "benda" ? "#92400E" : "#1C01A5"} strokeWidth={2.4} />
      {Array.from({ length: 10 }, (_, i) => {
        const c = tengahSel(i);
        const terisi = i < l.a || (!kanvas && i < l.a + isi);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSel(i)))} aria-label={`kotak ${i + 1}${terisi ? " terisi" : " kosong"}`}>
            <rect x={c.x - BINGKAI.s / 2} y={c.y - BINGKAI.s / 2} width={BINGKAI.s} height={BINGKAI.s} fill="#FFFFFF" stroke="#1C01A5" strokeWidth={1.4} />
            {terisi ? <Satu rupa={rupa} benda={benda} x={c.x} y={c.y} warna={i < l.a ? WARNA_A : WARNA_B} u={18} /> : null}
          </g>
        );
      })}
      <text x={150} y={142} textAnchor="middle" fontSize={13} fontWeight={900} fill="#DB2777">
        penuhkan sampai sepuluh
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || kosong === 0} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bingkai sepuluh">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Ditukar tempat, banyaknya tetap. Hitung kedua keranjang.",
  garis: "Mulai dari bilangan pertama, lalu hitung lompatannya.",
  kembar: "Hitung lompat: tambahkan isi tiap kantong.",
  sepuluh: "Hitung kotak yang masih kosong.",
};

export function LangkahPanen({ ls, rupa, benda, bicara, onBenar }: P) {
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
  const pesanBenar = (m: number): string => {
    switch (l.tipe) {
      case "berulang":
        return `Betul! ${kapital(bacaBerulang(l.n, l.k))}.`;
      case "sepuluh":
        return `Betul! ${kapital(kata(l.a))} dan ${kata(m)} adalah pasangan sepuluh.`;
      case "pasangan":
      case "garis":
        return `Betul! ${kapital(bacaKalimat([l.a, l.b, m]))}.`;
      default:
        return "Betul!";
    }
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
    if (m === n) tuntas(pesanBenar(m));
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, benda, kanvas: cara === "kanvas", salah, siap };
  const tanya = l.tipe === "sepuluh" ? "Berapa lagi supaya sepuluh?" : "Berapa semuanya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "tukar" ? <Tukar {...pk} l={l} /> : l.tipe === "pasangan" ? <Pasangan {...pk} l={l} /> : l.tipe === "garis" ? <Garis {...pk} l={l} /> : l.tipe === "berulang" ? <Berulang {...pk} l={l} /> : <Sepuluh {...pk} l={l} />}
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
