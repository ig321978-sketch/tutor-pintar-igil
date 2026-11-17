"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { KURANG, angkaJawab, bacaKalimat, kalimatCerita, kata, kataKunci, nomorBenar, pilihanDari, teksCerita, tulisKalimat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  CERITA_KECIL,
  KARTU_CERITA,
  LEBAR_ADEGAN,
  MEJA,
  NAMPAN,
  PERGI,
  SEL,
  TINGGI_ADEGAN,
  UKURAN_KARTU,
  UKURAN_KATA,
  letakKartu,
  letakKata,
  letakMeja,
  letakNampan,
  letakPergi,
  letakSel,
  periksaCentang,
  periksaCoretBebas,
  periksaLingkari,
  selDicari,
  type Goresan,
  type Kotak,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 3 Sub-Bab D: cerita hitungan dibaca dulu, lalu kegiatan metode (pilih kalimat, yang pergi, model batang,
 * kata kunci CUBES, berkurang dua kali dengan sketsa), lalu menjawab dengan caranya. Rupa: kue, jeruk, permen, teh, dan rambutan
 * (Concrete), titik dan model batang (Pictorial), angka dan tanda saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const BIRU = "#2563EB";
const MERAH = "#DC2626";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

function Satu({ rupa, benda, x, y, warna = BIRU, pudar = false, coret, u = 22 }: { rupa: Rupa; benda: string; x: number; y: number; warna?: string; pudar?: boolean; coret?: string; u?: number }) {
  return (
    <g opacity={pudar ? 0.35 : 1}>
      {rupa === "benda" ? (
        <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u}>
          {EMOJI[benda] ?? EMOJI.kue}
        </text>
      ) : (
        <circle cx={x} cy={y} r={u * 0.38} fill={warna} stroke="#1C01A5" strokeWidth={1.4} />
      )}
      {coret ? <line x1={x - u * 0.5} y1={y - u * 0.45} x2={x + u * 0.5} y2={y + u * 0.45} stroke={coret} strokeWidth={3.2} strokeLinecap="round" /> : null}
    </g>
  );
}

function Wadah({ k, isi, garis, nama, rx = 10, putus = false }: { k: Kotak; isi: string; garis: string; nama?: string; rx?: number; putus?: boolean }) {
  return (
    <g>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={rx} fill={isi} stroke={garis} strokeWidth={2.4} strokeDasharray={putus ? "6 4" : undefined} />
      {nama ? (
        <text x={k.x + 6} y={k.y + 13} fontSize={10} fontWeight={900} fill={garis}>
          {nama}
        </text>
      ) : null}
    </g>
  );
}

/** Kartu cerita tiga baris dengan angka. */
function KartuCerita({ l, k = KARTU_CERITA, rupa }: { l: Langkah; k?: Kotak; rupa: Rupa }) {
  const baris = teksCerita(l);
  const jarak = (k.h - 18) / 3;
  return (
    <g>
      <rect x={k.x} y={k.y} width={k.w} height={k.h} rx={10} fill="#FFFBEB" stroke="#B45309" strokeWidth={2} />
      {rupa === "benda" ? (
        <text x={k.x + 26} y={k.y + k.h / 2 + 10} textAnchor="middle" fontSize={26}>
          {EMOJI[l.benda]}
        </text>
      ) : null}
      {baris.map((b, i) => (
        <text key={i} x={k.x + k.w / 2 + (rupa === "benda" ? 14 : 0)} y={k.y + 22 + i * jarak} textAnchor="middle" fontSize={13} fontWeight={900} fill={i === 2 ? MERAH : "#1C01A5"}>
          {b}
        </text>
      ))}
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

/** Rupa lambang: cerita dengan angka, lalu kalimat bertanda tanya. */
function Tanya({ l, kalimat }: { l: Langkah; kalimat: string }) {
  return (
    <div className="space-y-2 rounded-2xl border-2 border-[#B45309] bg-[#FFFBEB] p-3 text-center font-black text-[#1C01A5]">
      {teksCerita(l).map((b, i) => (
        <p key={i} className={i === 2 ? "text-lg text-[#DC2626]" : "text-lg"}>
          {b}
        </p>
      ))}
      <p className="text-2xl">{kalimat}</p>
    </div>
  );
}

/* ------------------------------ Cerita: pilih kalimat yang cocok ------------------------------ */
function Cerita({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "cerita" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const benar = nomorBenar(l);
  const pesanBetul = `Betul! ${kapital(bacaKalimat(kalimatCerita(l)))}.`;
  const petunjuk = (i: number) => (l.pilihan[i][0] - l.pilihan[i][1] !== l.pilihan[i][2] ? "Hitung lagi sisanya." : "Bilangannya belum sama dengan cerita. Lingkari lagi bilangan di cerita.");
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
      salah(r.lebih > 0 ? "Ada kalimat lain ikut dilingkari. Lingkari satu kalimat saja." : "Kalimat yang cocok belum dilingkari.");
    }
  };
  const gambar = (
    <g>
      <KartuCerita l={l} rupa={rupa} />
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
  return <Gambar label="Cerita hitungan">{gambar}</Gambar>;
}

/* ------------------------------ Jawab: ketuk yang pergi ------------------------------ */
function Jawab({ l, rupa, salah, siap }: PK & { l: Extract<Langkah, { tipe: "jawab" }> }) {
  const [pergi, setPergi] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang" || l.b === 0) siap(rupa === "lambang" ? undefined : "Tidak ada yang pergi.");
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <Tanya l={l} kalimat={`${l.a} ${KURANG} ${l.b} = ?`} />;
  const tanda = (i: number) => i >= l.a - l.b;
  const ketukSatu = (i: number) => {
    if (selesai || pergi.includes(i)) return;
    if (!tanda(i)) {
      salah("Yang ini tidak pergi. Ketuk yang bergaris putus-putus.");
      return;
    }
    const baru = [...pergi, i];
    setPergi(baru);
    if (baru.length === l.b) {
      setSelesai(true);
      siap(`${kapital(kata(l.b))} sudah ${l.kata}. Hitung yang tersisa.`);
    }
  };
  return (
    <div className="space-y-2">
      <Tanya l={l} kalimat="" />
      <Gambar label="Yang pergi">
        <Wadah k={MEJA} isi="#FEF3C7" garis="#92400E" nama="meja" />
        <Wadah k={PERGI} isi="#F1F5F9" garis="#64748B" nama={l.kata} putus />
        {Array.from({ length: l.a }, (_, i) => {
          const n = pergi.indexOf(i);
          const p = n >= 0 ? letakPergi(n) : letakMeja(i);
          return (
            <g key={i} {...(n >= 0 ? {} : ketuk(() => ketukSatu(i)))} aria-label={`${tanda(i) ? "akan pergi" : "tetap"} ${i + 1}`}>
              {tanda(i) && n < 0 ? <circle cx={p.x} cy={p.y} r={17} fill="none" stroke={MERAH} strokeWidth={2} strokeDasharray="4 3" /> : null}
              <Satu rupa={rupa} benda={l.benda} x={p.x} y={p.y} warna={tanda(i) ? MERAH : BIRU} u={22} />
            </g>
          );
        })}
      </Gambar>
    </div>
  );
}

/* ------------------------------ Batang: hitung bagian yang dicari ------------------------------ */
function Batang({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "batang" }> }) {
  const [hitung, setHitung] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const dicari = selDicari(l.a, l.b);
  const n = l.a - l.b;
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <div className="space-y-2">
        <Tanya l={l} kalimat={`${l.a} ${KURANG} ${l.b} = ?`} />
        <div className="mx-auto flex max-w-xs flex-col gap-1 text-center text-xl font-black text-[#1C01A5]">
          <span className="rounded border-2 border-[#1C01A5] bg-[#FFE566] py-1">{l.a}</span>
          <div className="flex gap-1">
            <span className="rounded border-2 border-[#1C01A5] bg-[#DBEAFE] py-1" style={{ flex: Math.max(1, l.b) }}>
              {l.b}
            </span>
            <span className="rounded border-2 border-dashed border-[#DC2626] bg-white py-1 text-[#DC2626]" style={{ flex: Math.max(1, n) }}>
              ?
            </span>
          </div>
        </div>
      </div>
    );
  const ketukSel = (i: number) => {
    if (selesai || kanvas || hitung.includes(i)) return;
    if (!dicari.includes(i)) {
      salah(l.cari === "sisa" ? "Bagian itu sudah dimakan. Ketuk bagian yang dicari." : "Bagian itu yang tersisa. Ketuk bagian yang dicari.");
      return;
    }
    const baru = [...hitung, i];
    setHitung(baru);
    if (baru.length === n) {
      setSelesai(true);
      siap(`Bagian yang dicari ada ${kata(n)}.`);
    }
  };
  const periksa = () => {
    const r = periksaCentang(goresan, dicari.map((i) => letakSel(l.a, i)), 12);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap bagian yang dicari.");
    } else {
      setGoresan([]);
      salah(r.nyasar > 0 ? "Beri tanda pada bagian yang dicari saja." : r.dobel > 0 ? "Satu bagian, satu tanda." : "Ada bagian yang dicari belum diberi tanda.");
    }
  };
  const benda = rupa === "benda";
  const x0 = letakSel(l.a, 0).x - SEL / 2;
  const xb = x0 + l.b * SEL;
  const tahu = l.cari === "sisa" ? "dimakan" : "tinggal";
  const gambar = (
    <g>
      <KartuCerita l={l} k={{ x: 14, y: 6, w: 272, h: 70 }} rupa={rupa} />
      {benda ? <rect x={x0 - 8} y={92} width={l.a * SEL + 16} height={40} rx={18} fill="#E5E7EB" stroke="#6B7280" strokeWidth={2} /> : <rect x={x0} y={86} width={l.a * SEL} height={14} rx={2} fill="#FFE566" stroke="#1C01A5" strokeWidth={1.6} />}
      {!benda ? (
        <text x={x0 + (l.a * SEL) / 2} y={97} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
          {l.a}
        </text>
      ) : null}
      {Array.from({ length: l.a }, (_, i) => {
        const p = letakSel(l.a, i);
        const cari = dicari.includes(i);
        const dihitung = hitung.indexOf(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSel(i)))} aria-label={`bagian ${i + 1}${cari ? " dicari" : ""}`}>
            {benda ? (
              cari && l.cari === "pergi" ? (
                <circle cx={p.x} cy={p.y} r={11} fill="none" stroke={MERAH} strokeWidth={2} strokeDasharray="4 3" />
              ) : (
                <Satu rupa={rupa} benda={l.benda} x={p.x} y={p.y} u={20} pudar={!cari && l.cari === "sisa"} coret={!cari && l.cari === "sisa" ? MERAH : undefined} />
              )
            ) : (
              <rect x={p.x - SEL / 2} y={p.y - 12} width={SEL} height={24} fill={cari ? "#FFFFFF" : "#BFDBFE"} stroke={cari ? MERAH : "#1C01A5"} strokeWidth={1.6} strokeDasharray={cari ? "4 3" : undefined} />
            )}
            {!kanvas && dihitung >= 0 ? (
              <text x={p.x} y={p.y + 30} textAnchor="middle" fontSize={12} fontWeight={900} fill={MERAH}>
                {dihitung + 1}
              </text>
            ) : null}
          </g>
        );
      })}
      <text x={x0 + (l.b * SEL) / 2} y={160} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
        {l.b > 0 ? `${tahu} ${l.b}` : ""}
      </text>
      <text x={xb + (n * SEL) / 2} y={160} textAnchor="middle" fontSize={11} fontWeight={900} fill={MERAH}>
        ?
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Model batang">{gambar}</Gambar>;
}

/* ------------------------------ Kunci: pilih kata kunci ------------------------------ */
function Kunci({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "kunci" }> }) {
  const tiga = kataKunci(l);
  const [mati, setMati] = useState<number[]>([]);
  const [benarI, setBenarI] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const ketukKata = (i: number) => {
    if (benarI !== null || mati.includes(i)) return;
    if (tiga[i] === l.kata) {
      setBenarI(i);
      siap(`Betul! Kata ${l.kata} berarti berkurang.`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Kata ${tiga[i]} berarti bertambah. Cari kata yang berarti berkurang.`);
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, tiga.map((_, i) => letakKata(i)), tiga.map((t) => t === l.kata));
    if (r.benar) {
      setBenarI(tiga.indexOf(l.kata));
      siap(`Betul! Kata ${l.kata} berarti berkurang.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu kata saja, yang berarti berkurang." : "Kata kuncinya belum dilingkari.");
    }
  };
  const gambar = (
    <g>
      <KartuCerita l={l} k={CERITA_KECIL} rupa={rupa} />
      <text x={150} y={100} textAnchor="middle" fontSize={11} fontWeight={900} fill="#15803D">
        kata kunci yang berarti berkurang:
      </text>
      {tiga.map((t, i) => {
        const c = letakKata(i);
        const m = mati.includes(i);
        const on = benarI === i;
        return (
          <g key={t} {...(kanvas ? {} : ketuk(() => ketukKata(i)))} aria-label={`kata ${t}`} aria-disabled={m}>
            <rect x={c.x - UKURAN_KATA.w / 2} y={c.y - UKURAN_KATA.h / 2} width={UKURAN_KATA.w} height={UKURAN_KATA.h} rx={6} fill={on ? "#BBF7D0" : "#FFFFFF"} stroke={on ? "#15803D" : "#1C01A5"} strokeWidth={on ? 3.2 : 1.8} opacity={m ? 0.35 : 1} />
            <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5" opacity={m ? 0.35 : 1}>
              {t}
            </text>
          </g>
        );
      })}
      <text x={150} y={170} textAnchor="middle" fontSize={rupa === "lambang" ? 18 : 13} fontWeight={900} fill="#1C01A5">
        {benarI !== null ? `${l.a} ${KURANG} ${l.b} = ?` : ""}
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={benarI !== null} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kata kunci">{gambar}</Gambar>;
}

/* ------------------------------ Dua: berkurang dua kali ------------------------------ */
function Dua({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "dua" }> }) {
  const [pertama, setPertama] = useState<number[]>([]);
  const [kedua, setKedua] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang") return <Tanya l={l} kalimat={`${l.a} ${KURANG} ${l.b} ${KURANG} ${l.c} = ?`} />;
  const ketukSatu = (i: number) => {
    if (selesai || kanvas || pertama.includes(i) || kedua.includes(i)) return;
    if (pertama.length < l.b) {
      const baru = [...pertama, i];
      setPertama(baru);
      if (baru.length === l.b && l.c === 0) {
        setSelesai(true);
        siap("Sudah dicoret. Hitung yang tersisa.");
      }
      return;
    }
    const baru = [...kedua, i];
    setKedua(baru);
    if (baru.length === l.c) {
      setSelesai(true);
      siap(`${kapital(kata(l.b))} lalu ${kata(l.c)} sudah dicoret. Hitung yang tersisa.`);
    }
  };
  const letak = Array.from({ length: l.a }, (_, i) => letakNampan(i));
  const periksa = () => {
    const r = periksaCoretBebas(goresan, letak, l.b + l.c);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! ${kapital(kata(l.b + l.c))} sudah dicoret. Hitung yang tersisa.`);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda, satu coretan." : r.nyasar > 0 ? "Coret tepat di atas bendanya." : r.kena > l.b + l.c ? "Terlalu banyak yang dicoret." : "Belum cukup. Coret yang dimakan dan yang diberikan.");
    }
  };
  const gambar = (
    <g>
      <text x={150} y={20} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5">
        {`Ada ${l.a}. Dimakan ${l.b}, lalu diberikan ${l.c}.`}
      </text>
      <Wadah k={NAMPAN} isi="#FFF7ED" garis="#C2410C" nama="nampan" rx={20} />
      {letak.map((p, i) => {
        const merah = pertama.includes(i);
        const biru = kedua.includes(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => ketukSatu(i)))} aria-label={`benda ${i + 1}${merah || biru ? " dicoret" : ""}`}>
            <Satu rupa={rupa} benda={l.benda} x={p.x} y={p.y} u={26} pudar={merah || biru} coret={merah ? MERAH : biru ? BIRU : undefined} />
          </g>
        );
      })}
      {!kanvas ? (
        <text x={150} y={184} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1C01A5">
          {`dimakan ${pertama.length} dari ${l.b}, diberikan ${kedua.length} dari ${l.c}`}
        </text>
      ) : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Berkurang dua kali">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Mula-mula dikurangi yang pergi sama dengan sisa.",
  batang: "Utuh dikurangi bagian yang diketahui.",
  cubes: "Kata kunci berkurang berarti dikurangi.",
  sketsa: "Kurangi dua kali, atau gabungkan dulu yang pergi.",
};

export function LangkahRumah({ ls, rupa, bicara, onBenar }: P) {
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
    if (m === n) {
      const kal = l.tipe === "dua" ? `${kata(l.a)} dikurangi ${kata(l.b)} dikurangi ${kata(l.c)} sama dengan ${kata(m)}` : bacaKalimat([l.a, l.b, m]);
      tuntas(`Betul! ${kapital(kal)}. Jadi, jawabannya ${kata(m)}.`);
    } else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap };
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "cerita" ? <Cerita {...pk} l={l} /> : l.tipe === "jawab" ? <Jawab {...pk} l={l} /> : l.tipe === "batang" ? <Batang {...pk} l={l} /> : l.tipe === "kunci" ? <Kunci {...pk} l={l} /> : <Dua {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{l.tipe === "batang" && l.cari === "pergi" ? "Berapa yang dimakan?" : "Berapa yang tersisa?"}</p>
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
