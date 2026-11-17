"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { angkaJawab, bacaKalimat, kalimatBenar, kata, nomorBenar, pilihanDari, tulisKalimat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  BAGIAN_A,
  BAGIAN_B,
  BEDENG,
  BINGKAI,
  KARUNG,
  KERANJANG_KANAN,
  KERANJANG_KIRI,
  KIRIMAN,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  UTUH,
  letakBedeng,
  letakDi,
  letakKartu,
  letakKiriman,
  letakLuar,
  letakUtuh,
  periksaCentang,
  periksaLingkari,
  selSasaran,
  tengahSel,
  type Goresan,
  type Kotak,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 2 Sub-Bab A: kegiatan metode (kalimat penjumlahan, bibit datang, hitung maju dari karung,
 * tikar bagian-bagian-utuh, bingkai sepuluh), lalu menjawab dengan caranya. Rupa: bibit dan sayur (Concrete),
 * titik dan diagram (Pictorial), angka dan tanda saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benda: string; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; benda: string; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const WARNA_A = "#2563EB";
const WARNA_B = "#DB2777";
const TOMBOL = "min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]";

/** Satu benda: sayur (benda) atau titik (diagram). */
function Satu({ rupa, benda, x, y, warna, redup = false, u = 20 }: { rupa: Rupa; benda: string; x: number; y: number; warna: string; redup?: boolean; u?: number }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u} opacity={redup ? 0.3 : 1}>
        {EMOJI[benda] ?? EMOJI.bibit}
      </text>
    );
  return <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.4} opacity={redup ? 0.3 : 1} />;
}

/** Kotak wadah (keranjang, bedeng, tikar). */
function Wadah({ k, isi, garis, nama, putus = false }: { k: Kotak; isi: string; garis: string; nama?: string; putus?: boolean }) {
  return (
    <g>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={10} fill={isi} stroke={garis} strokeWidth={2.4} strokeDasharray={putus ? "5 4" : undefined} />
      {nama ? (
        <text x={k.x + 6} y={k.y + 12} fontSize={10} fontWeight={900} fill={garis}>
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

/* ------------------------------ Kalimat: pilih kalimat yang cocok ------------------------------ */
function Kalimat({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "kalimat" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorBenar(l);
  const petunjuk = (i: number) => (l.pilihan[i][0] + l.pilihan[i][1] !== l.pilihan[i][2] ? "Hitung lagi semuanya. Hasilnya belum pas." : "Bilangannya belum sama dengan ceritanya. Lihat lagi kedua kumpulan.");
  const ketukKartu = (i: number) => {
    if (selesai || mati.includes(i)) return;
    setPilih(i);
    if (benar.includes(i)) {
      setSelesai(true);
      siap(`Betul! ${kapital(bacaKalimat(kalimatBenar(l.a, l.b)))}.`);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjuk(i));
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, l.pilihan.map((_, i) => letakKartu(i)), l.pilihan.map((_, i) => benar.includes(i)));
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! ${kapital(bacaKalimat(kalimatBenar(l.a, l.b)))}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Ada kalimat yang tidak cocok ikut dilingkari. Lingkari satu kalimat saja." : "Kalimat yang cocok belum dilingkari.");
    }
  };
  const gabung = l.adegan === "gabung";
  const adegan =
    rupa === "lambang" ? (
      <g>
        <rect x={14} y={8} width={272} height={84} rx={12} fill="#F8FAFC" stroke="#1C01A5" strokeWidth={2} />
        <text x={150} y={38} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1C01A5">
          {gabung ? `Keranjang kiri ${l.a}, keranjang kanan ${l.b}` : `Di bedeng ada ${l.a}`}
        </text>
        <text x={150} y={70} textAnchor="middle" fontSize={16} fontWeight={900} fill="#DB2777">
          {gabung ? "Digabung jadi satu" : `Datang lagi ${l.b}`}
        </text>
      </g>
    ) : (
      <g>
        <Wadah k={KERANJANG_KIRI} isi={gabung ? "#FEF3C7" : "#E8C08A"} garis="#92400E" nama={gabung ? "keranjang" : "bedeng"} />
        <Wadah k={KERANJANG_KANAN} isi={gabung ? "#FEF3C7" : "#ECFCCB"} garis={gabung ? "#92400E" : "#4D7C0F"} nama={gabung ? "keranjang" : "datang lagi"} putus={!gabung} />
        {Array.from({ length: l.a }, (_, i) => {
          const p = letakDi(KERANJANG_KIRI, i);
          return <Satu key={`a${i}`} rupa={rupa} benda={benda} x={p.x} y={p.y + 8} warna={WARNA_A} u={20} />;
        })}
        {Array.from({ length: l.b }, (_, i) => {
          const p = letakDi(KERANJANG_KANAN, i);
          return <Satu key={`b${i}`} rupa={rupa} benda={benda} x={p.x} y={p.y + 8} warna={WARNA_B} u={20} />;
        })}
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
  return <Gambar label="Kalimat penjumlahan">{gambar}</Gambar>;
}

/* ------------------------------ Datang: tanam bibit yang datang ------------------------------ */
function Datang({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "datang" }> }) {
  const [tanam, setTanam] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
        <p>
          Ada <span className="rounded-lg bg-[#DBEAFE] px-2">{l.a}</span>, datang lagi <span className="rounded-lg bg-[#FCE7F3] px-2">{l.b}</span>.
        </p>
        <p>
          {l.a} <span className="text-[#DC2626]">+</span> {l.b} <span className="text-[#DC2626]">=</span> <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
        </p>
      </div>
    );
  const ketukBibit = (j: number) => {
    if (selesai || kanvas || tanam.includes(j)) return;
    const baru = [...tanam, j];
    setTanam(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap("Semua bibit yang datang sudah ditanam.");
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, Array.from({ length: l.b }, (_, j) => letakKiriman(j)), 13);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap bibit yang datang.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu bibit, satu tanda." : r.nyasar > 0 ? "Beri tanda hanya pada yang datang." : "Ada yang datang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Wadah k={BEDENG} isi="#E8C08A" garis="#92400E" nama="bedeng" />
      <Wadah k={KIRIMAN} isi="#ECFCCB" garis="#4D7C0F" nama="datang lagi" putus />
      {Array.from({ length: l.a }, (_, i) => {
        const p = letakBedeng(i);
        return <Satu key={`a${i}`} rupa={rupa} benda={benda} x={p.x} y={p.y} warna={WARNA_A} u={20} />;
      })}
      {Array.from({ length: l.b }, (_, j) => {
        const n = tanam.indexOf(j);
        const p = n >= 0 ? letakBedeng(l.a + n) : letakKiriman(j);
        return (
          <g key={`b${j}`} {...(kanvas || n >= 0 ? {} : ketuk(() => ketukBibit(j)))} aria-label={`bibit datang ${j + 1}`}>
            <Satu rupa={rupa} benda={benda} x={p.x} y={p.y} warna={WARNA_B} u={20} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bibit yang datang">{gambar}</Gambar>;
}

/* ------------------------------ Maju: hitung maju dari karung ------------------------------ */
function Maju({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "maju" }> }) {
  const [hitung, setHitung] = useState(0);
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
            <span className="text-lg text-[#16A34A]">{"\u{2192}"}</span>
            <span className="rounded-xl border-4 border-dashed border-[#DB2777] bg-white px-3 text-[#DC2626]">?</span>
          </React.Fragment>
        ))}
        <span className="w-full text-center text-base">
          {l.a} + {l.b} = ?
        </span>
      </div>
    );
  const ketukLuar = (j: number) => {
    if (selesai || kanvas) return;
    if (j !== hitung) {
      salah("Hitung maju berurutan dari kiri, satu per satu.");
      return;
    }
    setHitung(hitung + 1);
    if (hitung + 1 === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.a))}, lalu ${Array.from({ length: l.b }, (_, i) => kata(l.a + i + 1)).join(", ")}.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, Array.from({ length: l.b }, (_, j) => letakLuar(j)), 15);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Karungnya tidak dihitung lagi.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? "Karungnya jangan dihitung lagi. Beri tanda pada yang di luar karung saja." : r.dobel > 0 ? "Satu benda, satu tanda." : "Ada yang di luar karung belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <rect x={KARUNG.x} y={KARUNG.y} width={KARUNG.w} height={KARUNG.h} rx={26} fill={rupa === "benda" ? "#D6A15E" : "#E0E7FF"} stroke="#78350F" strokeWidth={2.6} />
      <rect x={KARUNG.x + 30} y={KARUNG.y - 8} width={KARUNG.w - 60} height={14} rx={5} fill={rupa === "benda" ? "#B45309" : "#A5B4FC"} stroke="#78350F" strokeWidth={2} />
      {rupa === "benda" ? (
        <text x={KARUNG.x + KARUNG.w / 2} y={KARUNG.y + 44} textAnchor="middle" fontSize={26}>
          {EMOJI[benda] ?? EMOJI.bibit}
        </text>
      ) : null}
      <text x={KARUNG.x + KARUNG.w / 2} y={KARUNG.y + (rupa === "benda" ? 84 : 66)} textAnchor="middle" fontSize={rupa === "benda" ? 28 : 40} fontWeight={900} fill="#1C01A5">
        {l.a}
      </text>
      {Array.from({ length: l.b }, (_, j) => {
        const p = letakLuar(j);
        return (
          <g key={j} {...(kanvas ? {} : ketuk(() => ketukLuar(j)))} aria-label={`benda di luar karung ${j + 1}`}>
            <Satu rupa={rupa} benda={benda} x={p.x} y={p.y} warna={WARNA_B} u={24} />
            {!kanvas && j < hitung ? (
              <text x={p.x} y={p.y - 22} textAnchor="middle" fontSize={15} fontWeight={900} fill="#DC2626">
                {l.a + j + 1}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Hitung maju dari karung">{gambar}</Gambar>;
}

/* ------------------------------ Bagian: tikar bagian-bagian-utuh ------------------------------ */
function Bagian({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "bagian" }> }) {
  const utuh = l.a + l.b;
  const [pindah, setPindah] = useState(false);
  const [keB, setKeB] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const kosong = l.cari === "b" && l.b === 0;
  useEffect(() => {
    if (rupa === "lambang" || (kanvas && kosong)) siap(kosong && rupa !== "lambang" ? "Semua sudah masuk bagian pertama. Bagian kedua tidak ada isinya." : undefined);
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") {
    const kotak = (isi: string, warna: string) => <span className={`rounded-xl border-4 border-[#1C01A5] px-4 py-1 ${warna} ${isi === "?" ? "text-[#DC2626]" : ""}`}>{isi}</span>;
    return (
      <div className="mx-auto max-w-xs space-y-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
        <div className="flex justify-center">{kotak(l.cari === "utuh" ? "?" : String(utuh), "bg-[#FFE566]")}</div>
        <p className="text-xs">utuh</p>
        <div className="flex justify-center gap-6">
          {kotak(String(l.a), "bg-[#DBEAFE]")}
          {kotak(l.cari === "b" ? "?" : String(l.b), "bg-[#FCE7F3]")}
        </div>
        <p className="text-xs">bagian dan bagian</p>
      </div>
    );
  }
  const ketukUtuh = (i: number) => {
    if (selesai || kanvas || l.cari !== "b" || i < l.a || keB.includes(i)) return;
    const baru = [...keB, i];
    setKeB(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap(`Bagian kedua berisi ${kata(l.b)}.`);
    }
  };
  const periksa = () => {
    if (l.cari === "b") {
      const r = periksaLingkari(goresan, Array.from({ length: utuh }, (_, i) => letakUtuh(i)), Array.from({ length: utuh }, (_, i) => i >= l.a));
      if (r.benar) {
        setSelesai(true);
        siap("Betul! Itu bagian keduanya.");
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? "Yang pudar sudah masuk bagian pertama. Lingkari yang lain saja." : "Masih ada yang belum dilingkari.");
      }
      return;
    }
    const letak = [...Array.from({ length: l.a }, (_, i) => letakDi(BAGIAN_A, i)), ...Array.from({ length: l.b }, (_, i) => letakDi(BAGIAN_B, i))];
    const r = periksaCentang(goresan, letak, 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Semua benda di kedua bagian sudah diberi tanda.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Beri tanda pada benda di kotak bagian saja." : "Ada benda di kotak bagian yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Wadah k={UTUH} isi="#FEF9C3" garis="#A16207" nama="utuh" />
      <Wadah k={BAGIAN_A} isi="#DBEAFE" garis="#1D4ED8" nama="bagian" />
      <Wadah k={BAGIAN_B} isi="#FCE7F3" garis="#BE185D" nama="bagian" />
      <line x1={150} y1={UTUH.y + UTUH.h} x2={BAGIAN_A.x + BAGIAN_A.w / 2} y2={BAGIAN_A.y} stroke="#1C01A5" strokeWidth={2} />
      <line x1={150} y1={UTUH.y + UTUH.h} x2={BAGIAN_B.x + BAGIAN_B.w / 2} y2={BAGIAN_B.y} stroke="#1C01A5" strokeWidth={2} />
      {l.cari === "utuh"
        ? Array.from({ length: utuh }, (_, i) => {
            const p = pindah ? letakUtuh(i) : i < l.a ? letakDi(BAGIAN_A, i) : letakDi(BAGIAN_B, i - l.a);
            return <Satu key={i} rupa={rupa} benda={benda} x={p.x} y={p.y + 6} warna={i < l.a ? WARNA_A : WARNA_B} u={20} />;
          })
        : Array.from({ length: utuh }, (_, i) => {
            const n = keB.indexOf(i);
            const p = n >= 0 ? letakDi(BAGIAN_B, n) : letakUtuh(i);
            return (
              <g key={i} {...(kanvas || i < l.a || n >= 0 ? {} : ketuk(() => ketukUtuh(i)))} aria-label={`benda ${i + 1}`}>
                <Satu rupa={rupa} benda={benda} x={p.x} y={n >= 0 ? p.y + 6 : p.y} warna={i < l.a ? WARNA_A : WARNA_B} redup={i < l.a} u={20} />
              </g>
            );
          })}
      {l.cari === "b"
        ? Array.from({ length: l.a }, (_, i) => {
            const p = letakDi(BAGIAN_A, i);
            return <Satu key={`k${i}`} rupa={rupa} benda={benda} x={p.x} y={p.y + 6} warna={WARNA_A} u={20} />;
          })
        : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || kosong} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label="Tikar bagian-bagian-utuh">{gambar}</Gambar>
      {l.cari === "utuh" && !pindah ? (
        <div className="flex justify-center">
          <button
            type="button"
            className={TOMBOL}
            onClick={() => {
              setPindah(true);
              setSelesai(true);
              siap("Kedua bagian sudah masuk ke kotak utuh.");
            }}
          >
            {"\u{2B06}\u{FE0F}"} Pindahkan ke utuh
          </button>
        </div>
      ) : null}
      {kosong && !selesai ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-5 text-sm font-black text-[#1C01A5]"
            onClick={() => {
              setSelesai(true);
              siap("Semua sudah masuk bagian pertama. Bagian kedua tidak ada isinya.");
            }}
          >
            Tidak ada yang tersisa
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Bingkai sepuluh ------------------------------ */
function Bingkai({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "bingkai" }> }) {
  const [isi, setIsi] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang" || l.b === 0) siap(rupa === "lambang" ? undefined : "Tidak ada yang perlu diisi.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2 py-2 text-center text-xl font-black text-[#1C01A5]">
        <p>
          Bingkai sepuluh berisi <span className="rounded-lg bg-[#DBEAFE] px-2">{l.a}</span>.
        </p>
        <p>
          Isi <span className="rounded-lg bg-[#FCE7F3] px-2">{l.b}</span> lagi.
        </p>
        <p className="text-2xl">
          {l.a} + {l.b} = <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
        </p>
      </div>
    );
  const sasaran = selSasaran(l.a, l.b);
  const ketukSel = (i: number) => {
    if (selesai || kanvas || i < l.a + isi) return;
    if (i !== l.a + isi) {
      salah("Isi kotak kosong berikutnya: dari kiri, baris atas dulu.");
      return;
    }
    if (isi + 1 > l.b) {
      salah(`Cukup ${kata(l.b)} lagi.`);
      return;
    }
    setIsi(isi + 1);
    if (isi + 1 === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.b))} kotak sudah diisi.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, sasaran.map(tengahSel), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Kotak kosong berikutnya sudah diberi tanda.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak, satu tanda." : r.nyasar > 0 ? "Beri tanda hanya pada kotak kosong berikutnya, mulai dari kotak kosong pertama." : "Ada kotak yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <rect x={BINGKAI.x - 8} y={BINGKAI.y - 8} width={BINGKAI.s * 5 + 16} height={BINGKAI.s * 2 + 16} rx={8} fill={rupa === "benda" ? "#D6A15E" : "#EEF2FF"} stroke="#1C01A5" strokeWidth={2} />
      {Array.from({ length: 10 }, (_, i) => {
        const c = tengahSel(i);
        const terisi = i < l.a || (!kanvas && i < l.a + isi);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSel(i)))} aria-label={`kotak ${i + 1}${terisi ? " terisi" : " kosong"}`}>
            <rect x={c.x - BINGKAI.s / 2} y={c.y - BINGKAI.s / 2} width={BINGKAI.s} height={BINGKAI.s} fill={rupa === "benda" ? "#F5DEB3" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={1.4} />
            {terisi ? <Satu rupa={rupa} benda={benda} x={c.x} y={c.y} warna={i < l.a ? WARNA_A : WARNA_B} u={18} /> : null}
          </g>
        );
      })}
      <text x={150} y={140} textAnchor="middle" fontSize={12} fontWeight={900} fill="#DB2777">
        isi lagi:
      </text>
      {Array.from({ length: Math.max(0, l.b - (kanvas ? 0 : isi)) }, (_, j) => (
        <Satu key={`t${j}`} rupa={rupa} benda={benda} x={150 - ((l.b - 1) * 24) / 2 + j * 24} y={166} warna={WARNA_B} u={18} />
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || l.b === 0} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bingkai sepuluh">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung yang sudah ada, lalu tambah yang datang.",
  maju: "Mulai dari bilangan pertama, lalu hitung maju.",
  bagian: "Bagian dan bagian digabung menjadi utuh.",
  bingkai: "Lihat baris yang penuh, lalu hitung kotak yang terisi.",
};

export function LangkahKebun({ ls, rupa, benda, bicara, onBenar }: P) {
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
  const pesanBenar = (m: number): string =>
    l.tipe === "bagian" && l.cari === "b" ? `Betul! Utuh ${kata(l.a + l.b)} adalah ${kata(l.a)} dan ${kata(m)}.` : `Betul! ${kapital(bacaKalimat([l.a, l.b, m]))}.`;
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
  const tanya = l.tipe === "bagian" && l.cari === "b" ? "Berapa bagian yang lain?" : "Berapa semuanya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "kalimat" ? <Kalimat {...pk} l={l} /> : l.tipe === "datang" ? <Datang {...pk} l={l} /> : l.tipe === "maju" ? <Maju {...pk} l={l} /> : l.tipe === "bagian" ? <Bagian {...pk} l={l} /> : <Bingkai {...pk} l={l} />}
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
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
