"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { TokohKeliru } from "./TokohKeliru";
import { KURANG, angkaJawab, bacaKalimat, kalimatBenar, kalimatTokoh, kata, nomorBenar, pilihanDari, tulisKalimat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  BINGKAI,
  GERBONG,
  LEBAR_ADEGAN,
  MEJA,
  PERON,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  WADAH_KALIMAT,
  jarakDeret,
  letakDeret,
  letakGerbong,
  letakKalimat,
  letakKartu,
  letakMeja,
  letakPeron,
  periksaCentang,
  periksaCoretBebas,
  periksaLingkari,
  sasaranMundur,
  selSasaran,
  tengahSel,
  type Goresan,
  type Kotak,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 3 Sub-Bab A: kegiatan metode (kalimat pengurangan, penumpang yang pergi, mengambil, menghitung mundur,
 * bingkai sepuluh), lalu menjawab sisanya dengan caranya. Rupa: bekal dan penumpang (Concrete), titik dan diagram (Pictorial),
 * angka dan tanda saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benda: string; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; benda: string; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const WARNA_ADA = "#2563EB";
const WARNA_PERGI = "#DC2626";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Satu benda: emoji (benda) atau titik (diagram). `pergi`: digambar pudar dengan coretan merah. */
function Satu({ rupa, benda, x, y, warna = WARNA_ADA, pudar = false, coret = false, u = 20 }: { rupa: Rupa; benda: string; x: number; y: number; warna?: string; pudar?: boolean; coret?: boolean; u?: number }) {
  return (
    <g opacity={pudar ? 0.3 : 1}>
      {rupa === "benda" ? (
        <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u}>
          {EMOJI[benda] ?? EMOJI.kue}
        </text>
      ) : (
        <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.4} />
      )}
      {coret ? <line x1={x - u * 0.5} y1={y - u * 0.45} x2={x + u * 0.5} y2={y + u * 0.45} stroke={WARNA_PERGI} strokeWidth={3} strokeLinecap="round" /> : null}
    </g>
  );
}

/** Wadah: kotak bekal (krem), gerbong (biru), peron (abu-abu bergaris), meja (kayu). */
function Wadah({ k, jenis, nama }: { k: Kotak; jenis: "bekal" | "gerbong" | "peron" | "meja"; nama?: string }) {
  const gaya = {
    bekal: { isi: "#FEF3C7", garis: "#92400E" },
    gerbong: { isi: "#DBEAFE", garis: "#1D4ED8" },
    peron: { isi: "#E2E8F0", garis: "#475569" },
    meja: { isi: "#FDE7C8", garis: "#9A3412" },
  }[jenis];
  return (
    <g>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={jenis === "gerbong" ? 18 : 10} fill={gaya.isi} stroke={gaya.garis} strokeWidth={2.4} strokeDasharray={jenis === "peron" ? "6 4" : undefined} />
      {jenis === "gerbong"
        ? [0, 1, 2, 3].map((i) => <rect key={i} x={k.x + 22 + i * 64} y={k.y + 6} width={40} height={8} rx={3} fill="#93C5FD" opacity={0.7} />)
        : null}
      {nama ? (
        <text x={k.x + 8} y={k.y + k.h - 6} fontSize={10} fontWeight={900} fill={gaya.garis}>
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

/** Rupa lambang: kotak angka mula-mula, berkurang, dan tanda tanya sisa. */
function KalimatTanya({ a, b, atas }: { a: number; b: number; atas: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p>
        {a} <span className="text-[#DC2626]">{KURANG}</span> {b} <span className="text-[#DC2626]">=</span> <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>
      </p>
    </div>
  );
}

/* ------------------------------ Kalimat: pilih kalimat yang cocok ------------------------------ */
function Kalimat({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "kalimat" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorBenar(l);
  const pesanBetul = `Betul! ${kapital(bacaKalimat(kalimatBenar(l.a, l.b)))}.`;
  const klaim = kalimatTokoh(l);
  const petunjuk = (i: number) =>
    klaim && l.pilihan[i] === klaim
      ? `Itu tulisan ${l.tokoh} yang keliru. Hitung lagi: mula-mula dikurangi yang pergi.`
      : l.pilihan[i][0] - l.pilihan[i][1] !== l.pilihan[i][2]
        ? "Hitung lagi sisanya. Sisanya belum pas."
        : "Bilangannya belum sama dengan ceritanya. Lihat lagi mula-mula dan yang pergi.";
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
      salah(r.lebih > 0 ? "Ada kalimat yang tidak cocok ikut dilingkari. Lingkari satu kalimat saja." : "Kalimat yang cocok belum dilingkari.");
    }
  };
  const makan = l.adegan === "makan";
  const e = makan ? benda : "penumpang";
  const adegan =
    rupa === "lambang" ? (
      <g>
        <rect x={14} y={8} width={272} height={84} rx={12} fill="#F8FAFC" stroke="#1C01A5" strokeWidth={2} />
        <text x={150} y={40} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1C01A5">
          {makan ? `Di kotak bekal ada ${l.a}` : `Di gerbong ada ${l.a} penumpang`}
        </text>
        <text x={150} y={72} textAnchor="middle" fontSize={16} fontWeight={900} fill="#DC2626">
          {makan ? `Dimakan ${l.b}` : `Turun ${l.b}`}
        </text>
      </g>
    ) : (
      <g>
        <Wadah k={WADAH_KALIMAT} jenis={makan ? "bekal" : "gerbong"} nama={makan ? `dimakan: dicoret` : "turun: dicoret"} />
        {Array.from({ length: l.a }, (_, i) => {
          const p = letakKalimat(i);
          const pergi = i >= l.a - l.b;
          return <Satu key={i} rupa={rupa} benda={e} x={p.x} y={p.y} pudar={pergi} coret={pergi} u={22} />;
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
  return <Gambar label="Kalimat pengurangan">{gambar}</Gambar>;
}

/* ------------------------------ Pergi: penumpang yang bergaris putus-putus turun ------------------------------ */
function Pergi({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "pergi" }> }) {
  const [turun, setTurun] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang" || l.b === 0) siap(rupa === "lambang" ? undefined : "Tidak ada yang pergi. Semuanya masih ada.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <KalimatTanya a={l.a} b={l.b} atas={`Mula-mula ${l.a}, pergi ${l.b}.`} />;
  const pergi = (i: number) => i >= l.a - l.b;
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || turun.includes(i)) return;
    if (!pergi(i)) {
      salah("Yang ini tidak pergi. Ketuk yang bergaris putus-putus.");
      return;
    }
    const baru = [...turun, i];
    setTurun(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap("Semua yang pergi sudah turun ke peron.");
    }
  };
  const sasaran = Array.from({ length: l.b }, (_, j) => l.a - l.b + j);
  const periksa = () => {
    const r = periksaCentang(goresan, sasaran.map(letakGerbong), 16);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap yang pergi.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu tanda." : r.nyasar > 0 ? "Beri tanda hanya pada yang bergaris putus-putus." : "Ada yang pergi belum diberi tanda.");
    }
  };
  const e = rupa === "benda" ? "penumpang" : benda;
  const gambar = (
    <g>
      <Wadah k={GERBONG} jenis="gerbong" nama="gerbong" />
      <Wadah k={PERON} jenis="peron" nama="peron" />
      {Array.from({ length: l.a }, (_, i) => {
        const n = turun.indexOf(i);
        const p = n >= 0 ? letakPeron(n) : letakGerbong(i);
        return (
          <g key={i} {...(kanvas || n >= 0 ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${pergi(i) ? "akan pergi" : "tetap"} ${i + 1}`}>
            {pergi(i) && n < 0 ? <circle cx={p.x} cy={p.y} r={16} fill="none" stroke={WARNA_PERGI} strokeWidth={2} strokeDasharray="4 3" /> : null}
            <Satu rupa={rupa} benda={e} x={p.x} y={p.y} warna={pergi(i) ? WARNA_PERGI : WARNA_ADA} u={22} />
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || l.b === 0} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Penumpang yang pergi">{gambar}</Gambar>;
}

/* ------------------------------ Ambil: coret b benda mana saja ------------------------------ */
function Ambil({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "ambil" }> }) {
  const [coret, setCoret] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <KalimatTanya a={l.a} b={l.b} atas={`Ada ${l.a}, diambil ${l.b}.`} />;
  const ketukSatu = (i: number) => {
    if (selesai || kanvas) return;
    const baru = coret.includes(i) ? coret.filter((x) => x !== i) : [...coret, i];
    setCoret(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.b))} sudah diambil. Hitung yang tinggal.`);
    }
  };
  const letak = Array.from({ length: l.a }, (_, i) => letakMeja(i));
  const periksa = () => {
    const r = periksaCoretBebas(goresan, letak, l.b);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! ${kapital(kata(l.b))} dicoret. Hitung yang tinggal.`);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu coretan." : r.nyasar > 0 ? "Coret tepat di atas bendanya." : r.kena > l.b ? `Terlalu banyak. Ambil ${kata(l.b)} saja.` : `Belum cukup. Ambil ${kata(l.b)}.`);
    }
  };
  const gambar = (
    <g>
      <Wadah k={MEJA} jenis="meja" nama="meja kereta" />
      {letak.map((p, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => ketukSatu(i)))} aria-label={`benda ${i + 1}${coret.includes(i) ? " diambil" : ""}`}>
          <Satu rupa={rupa} benda={benda} x={p.x} y={p.y} coret={coret.includes(i)} pudar={coret.includes(i)} u={26} />
        </g>
      ))}
      {!kanvas ? (
        <text x={150} y={22} textAnchor="middle" fontSize={12} fontWeight={900} fill={WARNA_PERGI}>
          diambil: {coret.length}
        </text>
      ) : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Mengambil benda">{gambar}</Gambar>;
}

/* ------------------------------ Mundur: hitung mundur dari ujung kanan ------------------------------ */
function Mundur({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "mundur" }> }) {
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
            <span className="text-lg text-[#DC2626]">{"\u{2190}"}</span>
            <span className="rounded-xl border-4 border-dashed border-[#DC2626] bg-white px-3 text-[#DC2626]">?</span>
          </React.Fragment>
        ))}
        <span className="w-full text-center text-base">
          {l.a} {KURANG} {l.b} = ?
        </span>
      </div>
    );
  const s = jarakDeret(l.a);
  const u = Math.min(26, s - 2);
  const ketukSatu = (i: number) => {
    if (selesai || kanvas) return;
    if (i !== l.a - 1 - hitung) {
      salah("Hitung mundur dari ujung kanan, satu per satu.");
      return;
    }
    setHitung(hitung + 1);
    if (hitung + 1 === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.a))}, lalu mundur: ${Array.from({ length: l.b }, (_, n) => kata(l.a - n - 1)).join(", ")}.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, sasaranMundur(l.a, l.b).map((i) => letakDeret(l.a, i)), s / 2 + 2);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Mundur dari ujung kanan.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? `Beri tanda pada ${kata(l.b)} yang paling kanan saja.` : r.dobel > 0 ? "Satu benda, satu tanda." : "Ada yang paling kanan belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <rect x={8} y={86} width={284} height={60} rx={12} fill={rupa === "benda" ? "#E0F2FE" : "#F1F5F9"} stroke="#0369A1" strokeWidth={2} />
      <line x1={14} y1={156} x2={286} y2={156} stroke="#64748B" strokeWidth={4} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={20 + i * 23} y1={150} x2={20 + i * 23} y2={162} stroke="#64748B" strokeWidth={3} />
      ))}
      {Array.from({ length: l.a }, (_, i) => {
        const p = letakDeret(l.a, i);
        const sudah = !kanvas && i > l.a - 1 - hitung;
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSatu(i)))} aria-label={`benda ${i + 1}`}>
            <Satu rupa={rupa} benda={benda} x={p.x} y={p.y} pudar={sudah} u={u} />
          </g>
        );
      })}
      <text x={letakDeret(l.a, l.a - 1).x} y={72} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1C01A5">
        {l.a}
      </text>
      {!kanvas
        ? Array.from({ length: hitung }, (_, n) => {
            const i = l.a - 2 - n;
            return i >= 0 ? (
              <text key={n} x={letakDeret(l.a, i).x} y={72} textAnchor="middle" fontSize={15} fontWeight={900} fill={WARNA_PERGI}>
                {l.a - n - 1}
              </text>
            ) : null;
          })
        : null}
      <text x={150} y={186} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0369A1">
        {"\u{2190}"} mundur dari kanan
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Hitung mundur">{gambar}</Gambar>;
}

/* ------------------------------ Bingkai sepuluh: kosongkan dari belakang ------------------------------ */
function Bingkai({ l, rupa, benda, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "bingkai" }> }) {
  const [kosong, setKosong] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang" || l.b === 0) siap(rupa === "lambang" ? undefined : "Tidak ada sekat yang dikosongkan.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <KalimatTanya a={l.a} b={l.b} atas={`Bingkai sepuluh berisi ${l.a}, kosongkan ${l.b}.`} />;
  const sasaran = selSasaran(l.a, l.b);
  const ketukSel = (i: number) => {
    if (selesai || kanvas) return;
    if (i >= l.a - kosong) return;
    if (i !== l.a - 1 - kosong) {
      salah("Kosongkan dari belakang: baris bawah dulu, dari kanan.");
      return;
    }
    setKosong(kosong + 1);
    if (kosong + 1 === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.b))} sekat sudah kosong.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, sasaran.map(tengahSel), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Sekat paling belakang sudah diberi tanda.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu sekat, satu tanda." : r.nyasar > 0 ? "Beri tanda hanya pada sekat terisi yang paling belakang." : "Ada sekat yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <rect x={BINGKAI.x - 8} y={BINGKAI.y - 8} width={BINGKAI.s * 5 + 16} height={BINGKAI.s * 2 + 16} rx={8} fill={rupa === "benda" ? "#C4B5FD" : "#EEF2FF"} stroke="#5B21B6" strokeWidth={2} />
      {Array.from({ length: 10 }, (_, i) => {
        const c = tengahSel(i);
        const terisi = i < l.a - (kanvas ? 0 : kosong);
        const baruKosong = !kanvas && i >= l.a - kosong && i < l.a;
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSel(i)))} aria-label={`sekat ${i + 1}${terisi ? " terisi" : " kosong"}`}>
            <rect x={c.x - BINGKAI.s / 2} y={c.y - BINGKAI.s / 2} width={BINGKAI.s} height={BINGKAI.s} fill={baruKosong ? "#FEE2E2" : rupa === "benda" ? "#F5F3FF" : "#FFFFFF"} stroke="#5B21B6" strokeWidth={1.4} />
            {terisi ? <Satu rupa={rupa} benda={benda} x={c.x} y={c.y} u={18} /> : null}
          </g>
        );
      })}
      <text x={150} y={150} textAnchor="middle" fontSize={12} fontWeight={900} fill={WARNA_PERGI}>
        {l.b === 0 ? "tidak ada yang dikosongkan" : `kosongkan dari belakang: ${l.b - (kanvas ? 0 : kosong)}`}
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai || l.b === 0} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Bingkai sepuluh">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Mula-mula dikurangi yang pergi. Hitung yang masih tinggal.",
  ambil: "Hitung benda yang tidak dicoret.",
  mundur: "Mulai dari bilangan pertama, lalu mundur satu per satu.",
  bingkai: "Hitung sekat yang masih terisi. Baris penuh berarti lima.",
};

export function LangkahBekal({ ls, rupa, benda, bicara, onBenar }: P) {
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
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    const awal = ditunjukkan ? "Ini jawaban yang benar. " : "Betul! ";
    bicara(kata(m));
    if (m === n) tuntas(`${awal}${kapital(bacaKalimat([l.a, l.b, m]))}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, benda, kanvas: cara === "kanvas", salah, siap };
  return (
    <div className="space-y-3">
      {l.tipe === "kalimat" && l.tokoh && kalimatTokoh(l) ? <TokohKeliru tokoh={l.tokoh} tulisan={rupa === "lambang" ? tulisKalimat(kalimatTokoh(l)!) : bacaKalimat(kalimatTokoh(l)!)} /> : null}
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "kalimat" ? <Kalimat {...pk} l={l} /> : l.tipe === "pergi" ? <Pergi {...pk} l={l} /> : l.tipe === "ambil" ? <Ambil {...pk} l={l} /> : l.tipe === "mundur" ? <Mundur {...pk} l={l} /> : <Bingkai {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">Berapa sisanya?</p>
          {cara === "kanvas" ? (
            <JawabTulis kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuara kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
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
