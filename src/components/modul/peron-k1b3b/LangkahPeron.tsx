"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { KURANG, angkaJawab, bacaKalimat, kalimatKedua, kalimatPertama, kata, nomorBenar, pasanganLangkah, pilihanDari, tulisKalimat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  BAGIAN_A,
  BAGIAN_B,
  GARIS_Y,
  KUMPULAN,
  LEBAR_ADEGAN,
  SUDAH,
  TINGGI_ADEGAN,
  TROLI,
  UKURAN_KARTU,
  UTUH,
  kursiKosong,
  letakBagian,
  letakKartu,
  letakKumpulan,
  letakKursi,
  letakTempat,
  letakTroli,
  letakUtuh,
  periksaCentang,
  periksaLingkari,
  sasaranGaris,
  xTempat,
  type Goresan,
  type Kotak,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 3 Sub-Bab B: kegiatan metode (dua kalimat dari satu bagan, dikurangi nol atau bilangan yang sama,
 * bagan pasangan, lompat mundur, pasangan sepuluh), lalu menjawab dengan caranya. Rupa: koper, tas, kursi, dan gerbong (Concrete),
 * titik, bagan, dan garis bilangan (Pictorial), angka dan tanda saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benda: string; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; benda: string; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const BIRU = "#2563EB";
const MERAH = "#DC2626";
const HIJAU = "#059669";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Satu({ rupa, e, x, y, warna = BIRU, pudar = false, u = 20 }: { rupa: Rupa; e: string; x: number; y: number; warna?: string; pudar?: boolean; u?: number }) {
  if (rupa === "benda")
    return (
      <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u} opacity={pudar ? 0.3 : 1}>
        {e}
      </text>
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

/** Rupa lambang: soal ditulis dengan angka dan tanda tanya. */
function Tanya({ atas, a, b }: { atas: string; a: number; b: number }) {
  return (
    <div className="space-y-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p>
        {a} <span className="text-[#DC2626]">{KURANG}</span> {b} <span className="text-[#DC2626]">=</span> <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
      </p>
    </div>
  );
}

/* ------------------------------ Dua: pilih kalimat kedua dari bagan yang sama ------------------------------ */
function Dua({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "dua" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorBenar(l);
  const pertama = kalimatPertama(l);
  const pesanBetul = `Betul! ${kapital(bacaKalimat(kalimatKedua(l)))}.`;
  const petunjuk = (i: number) => {
    const p = l.pilihan[i];
    if (p[0] === pertama[0] && p[1] === pertama[1] && p[2] === pertama[2]) return "Kalimat itu sudah ditulis. Cari kalimat kedua: utuh dikurangi bagian yang lain.";
    return "Sisanya belum pas. Utuh dikurangi satu bagian sama dengan bagian yang lain.";
  };
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
      salah(r.lebih > 0 ? "Ada kalimat lain ikut dilingkari. Lingkari kalimat kedua saja." : "Kalimat kedua belum dilingkari.");
    }
  };
  const b = l.u - l.a;
  const adegan =
    rupa === "lambang" ? (
      <g>
        <rect x={14} y={8} width={272} height={86} rx={12} fill="#F8FAFC" stroke="#1C01A5" strokeWidth={2} />
        <text x={150} y={36} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1C01A5">
          {`Utuh ${l.u}, bagian ${l.a} dan ${b}`}
        </text>
        <text x={150} y={72} textAnchor="middle" fontSize={15} fontWeight={900} fill={HIJAU}>
          {`Sudah ditulis: ${tulisKalimat(pertama)}`}
        </text>
      </g>
    ) : (
      <g>
        <Wadah k={KUMPULAN} isi={rupa === "benda" ? "#E0E7FF" : "#F8FAFC"} garis="#4338CA" nama={`utuh ${l.u}`} />
        {Array.from({ length: l.u }, (_, i) => {
          const p = letakKumpulan(i);
          return <Satu key={i} rupa={rupa} e={EMOJI[i < l.a ? benda : "tas"] ?? EMOJI.koper} x={p.x} y={p.y + 8} warna={i < l.a ? BIRU : "#DB2777"} u={22} />;
        })}
        <Wadah k={SUDAH} isi="#ECFDF5" garis={HIJAU} nama="sudah" />
        <text x={SUDAH.x + SUDAH.w / 2} y={SUDAH.y + 56} textAnchor="middle" fontSize={14} fontWeight={900} fill={HIJAU}>
          {tulisKalimat(pertama)}
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
  return <Gambar label="Dua kalimat dari satu bagan">{gambar}</Gambar>;
}

/* ------------------------------ Nol dan sama: troli ------------------------------ */
function NolSama({ l, rupa, benda, siap, salah }: PK & { l: Extract<Langkah, { tipe: "nolsama" }> }) {
  const [ambil, setAmbil] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <Tanya atas={`Ada ${l.a}, diambil ${l.b}.`} a={l.a} b={l.b} />;
  const ketukSatu = (i: number) => {
    if (selesai || ambil.includes(i)) return;
    if (l.b === 0) {
      salah("Tidak ada yang diambil. Tekan tombol tidak ada yang diambil.");
      return;
    }
    const baru = [...ambil, i];
    setAmbil(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap("Semua sudah diambil. Troli kosong.");
    }
  };
  return (
    <div className="space-y-2">
      <Gambar label="Troli">
        <Wadah k={TROLI} isi="#E2E8F0" garis="#334155" nama="troli" rx={6} />
        <circle cx={TROLI.x + 22} cy={TROLI.y + TROLI.h + 10} r={8} fill="#475569" />
        <circle cx={TROLI.x + TROLI.w - 22} cy={TROLI.y + TROLI.h + 10} r={8} fill="#475569" />
        {Array.from({ length: l.a }, (_, i) => {
          const p = letakTroli(i);
          const sudah = ambil.includes(i);
          return (
            <g key={i} {...(sudah ? {} : ketuk(() => ketukSatu(i)))} aria-label={`benda di troli ${i + 1}`}>
              <Satu rupa={rupa} e={EMOJI[benda] ?? EMOJI.koper} x={p.x} y={p.y} pudar={sudah} u={22} />
            </g>
          );
        })}
        <text x={150} y={36} textAnchor="middle" fontSize={13} fontWeight={900} fill={MERAH}>
          diambil: {ambil.length}
        </text>
      </Gambar>
      {l.b === 0 && !selesai ? (
        <div className="flex justify-center">
          <button
            type="button"
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-5 text-sm font-black text-[#1C01A5]"
            onClick={() => {
              setSelesai(true);
              siap("Tidak ada yang diambil. Banyaknya tetap.");
            }}
          >
            Tidak ada yang diambil
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Bagan pasangan: cari bagian yang lain ------------------------------ */
function Bagan({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "bagan" }> }) {
  const lain = l.u - l.a;
  const [keB, setKeB] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="mx-auto max-w-xs space-y-1 py-2 text-center text-2xl font-black text-[#1C01A5]">
        <div className="flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566]">{l.u}</span>
        </div>
        <div className="flex justify-center gap-16" aria-hidden="true">
          <span className="h-5 w-0.5 rotate-[30deg] bg-[#1C01A5]" />
          <span className="h-5 w-0.5 -rotate-[30deg] bg-[#1C01A5]" />
        </div>
        <div className="flex justify-center gap-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#DBEAFE]">{l.a}</span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-dashed border-[#DC2626] bg-white text-[#DC2626]">?</span>
        </div>
        <p className="pt-1 text-base">
          {l.u} {KURANG} {l.a} = ?
        </p>
      </div>
    );
  const ketukUtuh = (i: number) => {
    if (selesai || kanvas || i < l.a || keB.includes(i)) return;
    const baru = [...keB, i];
    setKeB(baru);
    if (baru.length === lain) {
      setSelesai(true);
      siap(`Bagian kedua berisi ${kata(lain)}.`);
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, Array.from({ length: l.u }, (_, i) => letakUtuh(i)), Array.from({ length: l.u }, (_, i) => i >= l.a));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu bagian keduanya.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Yang pudar sudah masuk bagian pertama. Lingkari yang lain saja." : "Masih ada yang belum dilingkari.");
    }
  };
  const e = EMOJI[benda] ?? EMOJI.koper;
  const garisBagan = rupa === "diagram";
  const gambar = (
    <g>
      <Wadah k={UTUH} isi={rupa === "benda" ? "#E2E8F0" : "#FEF9C3"} garis={rupa === "benda" ? "#334155" : "#A16207"} nama={rupa === "benda" ? "troli: utuh" : "utuh"} rx={garisBagan ? 38 : 10} />
      <Wadah k={BAGIAN_A} isi="#DBEAFE" garis="#1D4ED8" nama={rupa === "benda" ? "tas Abang" : "bagian"} rx={garisBagan ? 38 : 10} />
      <Wadah k={BAGIAN_B} isi="#FCE7F3" garis="#BE185D" nama={rupa === "benda" ? "tas Kaka" : "bagian"} rx={garisBagan ? 38 : 10} />
      {garisBagan ? (
        <g>
          <line x1={150} y1={UTUH.y + UTUH.h} x2={BAGIAN_A.x + BAGIAN_A.w / 2} y2={BAGIAN_A.y} stroke="#1C01A5" strokeWidth={2} />
          <line x1={150} y1={UTUH.y + UTUH.h} x2={BAGIAN_B.x + BAGIAN_B.w / 2} y2={BAGIAN_B.y} stroke="#1C01A5" strokeWidth={2} />
        </g>
      ) : null}
      {Array.from({ length: l.u }, (_, i) => {
        const n = keB.indexOf(i);
        const p = n >= 0 ? letakBagian(BAGIAN_B, n) : letakUtuh(i);
        return (
          <g key={i} {...(kanvas || i < l.a || n >= 0 ? {} : ketuk(() => ketukUtuh(i)))} aria-label={`benda utuh ${i + 1}`}>
            <Satu rupa={rupa} e={e} x={p.x} y={p.y} warna={i < l.a ? BIRU : "#DB2777"} pudar={i < l.a} u={20} />
          </g>
        );
      })}
      {Array.from({ length: l.a }, (_, i) => {
        const p = letakBagian(BAGIAN_A, i);
        return <Satu key={`a${i}`} rupa={rupa} e={e} x={p.x} y={p.y} warna={BIRU} u={20} />;
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bagan pasangan">{gambar}</Gambar>;
}

/* ------------------------------ Garis: lompat mundur ------------------------------ */
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
            <span className="text-lg text-[#DC2626]">{"\u{21A9}\u{FE0F}"}</span>
            <span className="rounded-xl border-4 border-dashed border-[#DC2626] bg-white px-3 text-[#DC2626]">?</span>
          </React.Fragment>
        ))}
        <span className="w-full text-center text-base">
          {l.a} {KURANG} {l.b} = ?
        </span>
      </div>
    );
  const posisi = l.a - (kanvas ? 0 : lompat);
  const ketukTempat = (n: number) => {
    if (selesai || kanvas) return;
    if (n !== posisi - 1) {
      salah("Lompat ke kiri satu tempat saja, satu per satu.");
      return;
    }
    setLompat(lompat + 1);
    if (lompat + 1 === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.a))}, lalu mundur: ${Array.from({ length: l.b }, (_, i) => kata(l.a - i - 1)).join(", ")}.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, sasaranGaris(l.a, l.b).map(letakTempat), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk satu lompatan ke kiri.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? `Beri tanda pada ${kata(l.b)} tempat tepat di sebelah kiri ${kata(l.a)}.` : r.dobel > 0 ? "Satu tempat, satu tanda." : "Ada lompatan yang belum diberi tanda.");
    }
  };
  const benda = rupa === "benda";
  const gambar = (
    <g>
      {benda ? <rect x={6} y={GARIS_Y + 14} width={288} height={6} rx={3} fill="#94A3B8" /> : <line x1={8} y1={GARIS_Y} x2={292} y2={GARIS_Y} stroke="#1C01A5" strokeWidth={2.6} />}
      {Array.from({ length: 11 }, (_, n) => {
        const p = letakTempat(n);
        return (
          <g key={n} {...(kanvas ? {} : ketuk(() => ketukTempat(n)))} aria-label={`tempat ${n}`}>
            {benda ? (
              <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={20} opacity={n > posisi ? 0.35 : 1}>
                {EMOJI.gerbong}
              </text>
            ) : (
              <line x1={p.x} y1={p.y - 7} x2={p.x} y2={p.y + 7} stroke="#1C01A5" strokeWidth={2} />
            )}
            <text x={p.x} y={p.y + 34} textAnchor="middle" fontSize={11} fontWeight={900} fill={n === posisi ? MERAH : "#1C01A5"}>
              {n}
            </text>
          </g>
        );
      })}
      {!kanvas
        ? Array.from({ length: lompat }, (_, j) => {
            const dari = xTempat(l.a - j);
            const ke = xTempat(l.a - j - 1);
            return <path key={j} d={`M ${dari} ${GARIS_Y - 14} Q ${(dari + ke) / 2} ${GARIS_Y - 40} ${ke} ${GARIS_Y - 14}`} fill="none" stroke={MERAH} strokeWidth={2.4} />;
          })
        : null}
      <text x={xTempat(posisi)} y={GARIS_Y - 44} textAnchor="middle" fontSize={22}>
        {benda ? EMOJI.igil : "\u{1F53B}"}
      </text>
      <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0F766E">
        mulai dari {l.a}, lompat ke kiri {l.b} kali
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Lompat mundur">{gambar}</Gambar>;
}

/* ------------------------------ Sepuluh: kursi kosong ------------------------------ */
function Sepuluh({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "sepuluh" }> }) {
  const [hitung, setHitung] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const kosong = kursiKosong(l.b);
  useEffect(() => {
    if (rupa === "lambang" || kosong.length === 0) siap(rupa === "lambang" ? undefined : "Semua kursi terisi. Tidak ada yang kosong.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <Tanya atas={`Sepuluh kursi, ${l.b} terisi.`} a={10} b={l.b} />;
  const ketukKursi = (i: number) => {
    if (selesai || kanvas) return;
    if (i < l.b) {
      salah("Kursi itu sudah terisi. Ketuk kursi yang kosong.");
      return;
    }
    if (hitung.includes(i)) return;
    const baru = [...hitung, i];
    setHitung(baru);
    if (baru.length === kosong.length) {
      setSelesai(true);
      siap(`${kapital(kata(l.b))} dan ${kata(kosong.length)} pasangan sepuluh.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, kosong.map(letakKursi), 13);
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
      <rect x={8} y={84} width={284} height={58} rx={16} fill={benda ? "#DBEAFE" : "#F8FAFC"} stroke="#1D4ED8" strokeWidth={2.4} />
      <text x={150} y={74} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1D4ED8">
        sepuluh kursi satu baris
      </text>
      {Array.from({ length: 10 }, (_, i) => {
        const p = letakKursi(i);
        const terisi = i < l.b;
        const n = hitung.indexOf(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukKursi(i)))} aria-label={`kursi ${i + 1}${terisi ? " terisi" : " kosong"}`}>
            {benda ? (
              <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={22}>
                {terisi ? EMOJI.penumpang : EMOJI.kursi}
              </text>
            ) : (
              <rect x={p.x - 11} y={p.y - 11} width={22} height={22} rx={3} fill={terisi ? "#1D4ED8" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={1.6} />
            )}
            {!kanvas && n >= 0 ? (
              <text x={p.x} y={p.y + 36} textAnchor="middle" fontSize={12} fontWeight={900} fill={MERAH}>
                {n + 1}
              </text>
            ) : null}
          </g>
        );
      })}
      <text x={150} y={184} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1D4ED8">
        terisi {l.b}, kosong berapa?
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || kosong.length === 0} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Sepuluh kursi">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Dikurangi nol tetap sama. Dikurangi bilangan yang sama hasilnya nol.",
  bagan: "Utuh dikurangi satu bagian sama dengan bagian yang lain.",
  garis: "Mulai dari bilangan pertama, lalu lompat ke kiri satu per satu.",
  sepuluh: "Cari pasangan sepuluhnya.",
};

export function LangkahPeron({ ls, rupa, benda, bicara, onBenar }: P) {
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
    const [a, b] = pasanganLangkah(l);
    if (m === n) tuntas(`Betul! ${kapital(bacaKalimat([a, b, m]))}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, benda, kanvas: cara === "kanvas", salah, siap };
  const tanya = l.tipe === "bagan" ? "Berapa bagian yang lain?" : l.tipe === "garis" ? "Berhenti di bilangan berapa?" : l.tipe === "sepuluh" ? "Berapa kursi yang kosong?" : "Berapa sisanya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "dua" ? <Dua {...pk} l={l} /> : l.tipe === "nolsama" ? <NolSama {...pk} l={l} /> : l.tipe === "bagan" ? <Bagan {...pk} l={l} /> : l.tipe === "garis" ? <Garis {...pk} l={l} /> : <Sepuluh {...pk} l={l} />}
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
