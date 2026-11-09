"use client";

import React from "react";
import { BAWAH, BIRU, EMAS, HIJAU, KUNING, MERAH_MUDA } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { CERITA_K2A, LokerRak, TasG } from "./gambar-hitung-k2a";
import { Label } from "./gambar-nilai-k2b";
import { Tokoh } from "./gambar-maju-mundur-c";
import { JalurKotak } from "./gambar-banding-k2c";
import { Gerak, kalimatDari, Lompat, Muncul, Papan, Sorot, tumbuh, VideoCerita, type AdeganVideo, type PropsAdegan } from "./video-cerita";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 1 Sub-Bab A: Menghitung, Membaca, dan Menulis      */
/* Bilangan sampai dengan 50. Naskah = CERITA_K2A (satu sumber dengan modul).  */
/* Animasi SVG gratis, diputar di perangkat siswa. Naskah: naskah/            */
/* mtk-2-bab1-video-cerita.md                                                  */
/* ------------------------------------------------------------------------ */

const BIRU_TAS = "#3B82F6";
const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";

/** Posisi (x, y) di dalam rak loker untuk bilangan n. Bilangan berkelok: baris bawah kiri ke kanan. */
function sel(xRak: number, yRak: number, n: number) {
  const i = n - 1;
  const r = Math.floor(i / 10);
  const c = i % 10;
  const kol = r % 2 === 0 ? c : 9 - c;
  return { cx: xRak + 5 + kol * 27, cy: yRak + 5 + (2 - r) * 26 };
}

/** Penanda emas di atas kotak loker yang sedang dihitung. */
function Penanda({ xRak, yRak, n }: { xRak: number; yRak: number; n: number }) {
  if (n < 1 || n > 30) return null;
  const { cx, cy } = sel(xRak, yRak, n);
  return (
    <g style={{ transform: `translate(${cx + 13.5}px, ${cy + 4}px)`, transition: "transform .25s ease-out" }}>
      <path d="M-7 -11 L7 -11 L0 1 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
    </g>
  );
}

/* ----------------------------- Adegan 1: Loker baru ---------------------- */

const PAPAN_1 = [
  "Loker baru!",
  "Hari pertama sekolah",
  "Senang sekali!",
  "Loker baru di kelas",
  "Simpan tas, kelas rapi",
  "Masukkan tas ke loker",
  "Rak masih kosong",
  "Berapa banyak anak?",
  "Bagaimana caranya?",
];

function Adegan1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={PAPAN_1[k]} />
      <Muncul dy={-70} durasi={0.9}>
        <LokerRak x={10} y={40} isi={0} />
      </Muncul>
      {k === 3 || k === 6 ? <Sorot x={6} y={36} w={288} h={96} r={10} /> : null}
      <Gerak x={k >= 1 ? 0 : -120} durasi={1.4}>
        <Lompat aktif={k === 2}>
          <Tokoh x={52} y={198} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.9} angkat={k === 2 || k === 8} />
        </Lompat>
      </Gerak>
      <Gerak x={k >= 1 ? 0 : 120} durasi={1.4}>
        <Lompat aktif={k === 2}>
          <Tokoh x={262} y={198} rambut={RAMBUT_COKELAT} baju={MERAH_MUDA} s={0.86} angkat={k === 2} />
        </Lompat>
      </Gerak>
      {k === 2 ? (
        <>
          <Muncul dy={10}>
            <text x="28" y="140" fontSize="22" aria-hidden="true">
              💛
            </text>
          </Muncul>
          <Muncul dy={10} tunda={0.25}>
            <text x="240" y="140" fontSize="22" aria-hidden="true">
              ⭐
            </text>
          </Muncul>
        </>
      ) : null}
      {k >= 4 ? (
        <Muncul dy={-30}>
          <g className="igil-lompat" style={BAWAH}>
            <TasG x={84} y={150} w={26} h={30} warna={BIRU_TAS} />
          </g>
        </Muncul>
      ) : null}
      {k >= 5 ? (
        <Muncul dy={24}>
          <Tokoh x={170} y={198} rambut={RAMBUT_COKELAT} baju={EMAS} s={0.95} angkat={k === 5} />
        </Muncul>
      ) : null}
      {k === 5 ? (
        <Muncul tunda={0.3}>
          <Label x={118} y={122} w={112} teks="Masukkan tas!" ukuran={12} />
        </Muncul>
      ) : null}
      {k >= 7 ? <Lencana x={222} y={152} teks="?" r={19} /> : null}
    </>
  );
}

/* --------------------------- Adegan 2: Tas bergantian -------------------- */

const PAPAN_2 = [
  "Bergantian",
  "1 anak, 1 tas, 1 loker",
  "Rapi, tidak berebut",
  "Malosi giliran terakhir",
  "banyak tas = banyak anak",
  "Tahu tas, tahu anak",
  "Cara menghitungnya?",
  "Hitung satu per satu",
];

function jumlahTas(k: number, t: number) {
  if (k === 0) return tumbuh(t, 0, 8, 2.2);
  if (k === 1) return 8;
  if (k === 2) return tumbuh(t, 8, 14, 2);
  if (k === 3) return tumbuh(t, 14, 26, 3.2);
  return 26;
}

function Adegan2({ k, t }: PropsAdegan) {
  const n = jumlahTas(k, t);
  const angkaHitung = k === 7 ? tumbuh(t, 0, 6, 1.6) : 0;
  return (
    <>
      <Papan teks={PAPAN_2[k]} />
      <LokerRak x={10} y={40} isi={n} nomor={k === 7} nomorSampai={k === 7 ? angkaHitung : undefined} />
      {k === 7 ? <Penanda xRak={10} yRak={40} n={angkaHitung} /> : null}
      <Lompat aktif={k === 2}>
        <Tokoh x={44} y={198} rambut={RAMBUT_COKELAT} baju={KUNING} s={0.9} angkat={k === 2} />
      </Lompat>
      {k <= 3 ? (
        <g className="igil-lompat" style={BAWAH}>
          <TasG x={72} y={152} w={24} h={28} warna={BIRU_TAS} />
        </g>
      ) : null}
      {k <= 3 ? (
        <>
          <Tokoh x={204} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.7} />
          <Tokoh x={234} y={198} rambut={RAMBUT_COKELAT} baju={EMAS} s={0.7} />
          <Gerak x={k >= 3 ? -118 : 0} durasi={1.8}>
            <Tokoh x={266} y={198} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.78} angkat={k === 3} />
          </Gerak>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul>
            <Label x={102} y={130} w={52} teks="1 anak" ukuran={11.5} />
          </Muncul>
          <Muncul tunda={0.35}>
            <Label x={158} y={130} w={46} teks="1 tas" ukuran={11.5} />
          </Muncul>
          <Muncul tunda={0.7}>
            <Label x={208} y={130} w={58} teks="1 loker" ukuran={11.5} />
          </Muncul>
        </>
      ) : null}
      {k === 4 || k === 5 ? (
        <Muncul dy={14}>
          <TasG x={96} y={142} w={34} h={40} warna={BIRU_TAS} />
          <text x="150" y="174" textAnchor="middle" fontSize="34" fontWeight="900" fill={BIRU}>
            =
          </text>
          <Tokoh x={198} y={198} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.66} />
        </Muncul>
      ) : null}
      {k === 5 ? <Sorot x={84} y={134} w={146} h={66} /> : null}
      {k === 6 ? <Lencana x={150} y={158} teks="?" r={22} /> : null}
    </>
  );
}

/* ------------------------- Adegan 3: Dua puluh enam tas ------------------ */

const PAPAN_3 = [
  "Semua tas sudah masuk",
  "Hitung satu per satu",
  "Baris bawah: 1 sampai 10",
  "Baris tengah: 11 sampai 20",
  "Baris atas: 21 sampai 26",
  "Ada 26 tas",
  "dua puluh enam = 26",
  "26 tas = 26 anak",
  "Apakah jawabanmu sama?",
];

function Adegan3({ k, t }: PropsAdegan) {
  const sampai = k < 2 ? 0 : k === 2 ? tumbuh(t, 0, 10, 3.3) : k === 3 ? tumbuh(t, 10, 20, 3.3) : k === 4 ? tumbuh(t, 20, 26, 3) : 26;
  const barisSorot = k === 2 ? 0 : k === 3 ? 1 : k === 4 ? 2 : -1;
  const yRak = 36;
  return (
    <>
      <Papan teks={PAPAN_3[k]} y={4} />
      <Muncul dy={-24}>
        <LokerRak x={10} y={yRak} isi={26} nomor nomorSampai={sampai} />
      </Muncul>
      {barisSorot >= 0 ? <Sorot x={11} y={yRak + 5 + (2 - barisSorot) * 26} w={278} h={26} r={5} warna="#E53E3E" /> : null}
      {k >= 2 && k <= 4 ? <Penanda xRak={10} yRak={yRak} n={sampai} /> : null}
      {k === 1 ? (
        <Muncul>
          <text x="150" y="146" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
            Satu tas, satu kali hitung
          </text>
        </Muncul>
      ) : null}
      {k >= 5 && k <= 6 ? <Lencana x={150} y={160} teks="26" r={k === 6 ? 27 : 21} /> : null}
      {k === 7 ? (
        <Muncul>
          <Label x={84} y={146} w={132} teks="26 anak di kelas" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 8 ? <Lencana x={150} y={160} teks="?" r={22} /> : null}
      <Lompat aktif={k >= 5 && k !== 8}>
        <Tokoh x={44} y={200} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.8} angkat={k >= 1} />
      </Lompat>
      <Lompat aktif={k === 7}>
        <Tokoh x={256} y={200} rambut={RAMBUT_COKELAT} baju={EMAS} s={0.8} angkat={k >= 1} />
      </Lompat>
    </>
  );
}

/* ------------------------ Adegan 4: Kelompok sepuluh --------------------- */

const WARNA_BENDA = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7"];
const COKELAT = "#A8672D";

const PAPAN_4 = [
  "Kelompokkan tiap sepuluh",
  "Satu ikat = 10 pensil",
  "Satu wadah = 10 telur",
  "Satu ikat = 10 lidi",
  "Satu susun = 10 balok",
  "Satu bingkai = 10 kancing",
  "Satu kantong = 10 kacang",
  "Lebih mudah, lebih cepat",
  "1 kelompok = 1 puluhan",
  "2 kelompok = 20",
  "3 kelompok = 30",
  "4 kelompok = 40",
  "5 kelompok = 50",
];

function Kotak({ x, y, judul, children }: { x: number; y: number; judul: string; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width="86" height="70" rx="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      {children}
      <text x={x + 43} y={y + 64} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
        {judul}
      </text>
    </g>
  );
}

const KOTAK_ISI: { x: number; y: number; judul: string; isi: React.ReactNode }[] = [
  {
    x: 10,
    y: 40,
    judul: "ikat pensil",
    isi: (
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={20 + i * 6.2} y="48" width="5" height="26" rx="1.5" fill={WARNA_BENDA[i % 5]} stroke={BIRU} strokeWidth="1" />
        ))}
        <rect x="18" y="58" width="66" height="5" rx="2" fill={EMAS} stroke={BIRU} strokeWidth="1" />
      </g>
    ),
  },
  {
    x: 107,
    y: 40,
    judul: "wadah telur",
    isi: (
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx={124 + (i % 5) * 13.5} cy={56 + Math.floor(i / 5) * 14} rx="5.4" ry="6.4" fill="#FFF3D6" stroke={BIRU} strokeWidth="1.2" />
        ))}
      </g>
    ),
  },
  {
    x: 204,
    y: 40,
    judul: "ikat lidi",
    isi: (
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${224 + i * 5.6} 48 V76`} stroke={COKELAT} strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <rect x="218" y="58" width="68" height="5" rx="2" fill="#16A34A" stroke={BIRU} strokeWidth="1" />
      </g>
    ),
  },
  {
    x: 10,
    y: 120,
    judul: "susun balok",
    isi: (
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={20 + (i % 5) * 13} y={128 + Math.floor(i / 5) * 16} width="11" height="13" rx="2" fill={WARNA_BENDA[i % 5]} stroke={BIRU} strokeWidth="1.2" />
        ))}
      </g>
    ),
  },
  {
    x: 107,
    y: 120,
    judul: "bingkai kancing",
    isi: (
      <g>
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <circle cx={124 + (i % 5) * 13.5} cy={136 + Math.floor(i / 5) * 15} r="5.4" fill={WARNA_BENDA[(i + 1) % 5]} stroke={BIRU} strokeWidth="1.2" />
            <circle cx={124 + (i % 5) * 13.5} cy={136 + Math.floor(i / 5) * 15} r="1.2" fill={BIRU} />
          </g>
        ))}
      </g>
    ),
  },
  {
    x: 204,
    y: 120,
    judul: "kantong kacang",
    isi: (
      <g>
        <path d="M234 130 H274 L280 168 H228 Z" fill="#FDE9C4" stroke={COKELAT} strokeWidth="2" />
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse key={i} cx={240 + (i % 4) * 8 + (Math.floor(i / 4) % 2) * 4} cy={142 + Math.floor(i / 4) * 8} rx="3" ry="2.2" fill="#B45309" />
        ))}
      </g>
    ),
  },
];

/** Satu ikat sepuluh batang, dipakai untuk mengenalkan puluhan. */
function IkatSepuluh({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={x + i * 4.6} y={y} width="3.8" height="54" rx="1.6" fill={WARNA_BENDA[i % 5]} stroke={BIRU} strokeWidth="1" />
      ))}
      <rect x={x - 2} y={y + 22} width="49" height="8" rx="3" fill={EMAS} stroke={BIRU} strokeWidth="1.4" />
    </g>
  );
}

function Adegan4({ k }: PropsAdegan) {
  const masihKotak = k < 8;
  const banyak = Math.max(0, Math.min(5, k - 7));
  return (
    <>
      <Papan teks={PAPAN_4[k]} />
      {k === 0 ? (
        <Muncul>
          <g>
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={96 + (i % 5) * 27} cy={92 + Math.floor(i / 5) * 30} r="10" fill={WARNA_BENDA[i % 5]} stroke={BIRU} strokeWidth="2" />
            ))}
            <rect x="78" y="68" width="148" height="86" rx="18" fill="none" stroke="#EF4444" strokeWidth="2.6" strokeDasharray="6 5" />
          </g>
        </Muncul>
      ) : null}
      {k === 0 ? <Lencana x={150} y={174} teks="10" r={20} /> : null}
      {masihKotak
        ? KOTAK_ISI.map((b, i) => (
            <Muncul key={b.judul} aktif={k >= i + 1} dy={-22}>
              <Lompat aktif={k === 7}>
                <Kotak x={b.x} y={b.y} judul={b.judul}>
                  {b.isi}
                </Kotak>
              </Lompat>
            </Muncul>
          ))
        : null}
      {!masihKotak
        ? Array.from({ length: banyak }, (_, i) => (
            <Muncul key={i} dy={-30} aktif={i < banyak}>
              <IkatSepuluh x={20 + i * 54} y={56} />
              <Label x={18 + i * 54} y={118} w={50} teks={`${(i + 1) * 10}`} ukuran={14} />
            </Muncul>
          ))
        : null}
      {!masihKotak ? (
        <Muncul key={k}>
          <Lencana x={150} y={170} teks={`${banyak * 10}`} r={22} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------- Adegan 5: Sepuluh, sepuluh, dan enam ---------------- */

const PAPAN_5 = [
  "Kelompokkan tiap sepuluh",
  "Baris pertama: 10 tas",
  "Baris kedua: 10 tas",
  "10 + 10 = 20",
  "Baris ketiga: 6 tas",
  "20 + 6 = 26",
  "Hasilnya sama: 26 tas",
  "Lebih cepat, tidak mudah salah",
];

function Adegan5({ k }: PropsAdegan) {
  const yRak = 30;
  const barisY = (r: number) => yRak + 5 + (2 - r) * 26;
  return (
    <>
      <Papan teks={PAPAN_5[k]} y={2} ukuran={12} />
      <Muncul dy={-20}>
        <LokerRak x={10} y={yRak + 6} isi={26} />
      </Muncul>
      {k === 1 ? <Sorot x={11} y={barisY(0) + 6} w={278} h={26} r={5} warna="#E53E3E" /> : null}
      {k === 2 ? <Sorot x={11} y={barisY(1) + 6} w={278} h={26} r={5} warna="#E53E3E" /> : null}
      {k === 4 ? <Sorot x={11} y={barisY(2) + 6} w={6 * 27 + 2} h={26} r={5} warna="#E53E3E" /> : null}
      {k === 1 || k === 2 ? (
        <Muncul key={k}>
          <Label x={100} y={128} w={100} teks="10 tas" ukuran={14} />
        </Muncul>
      ) : null}
      {k === 4 ? (
        <Muncul>
          <Label x={150} y={128} w={70} teks="6 tas" ukuran={14} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul>
          <Label x={87} y={128} w={126} teks="10 + 10 = 20" ukuran={13} />
        </Muncul>
      ) : null}
      {k >= 4 ? <Label x={20} y={128} w={112} teks="10 + 10 = 20" ukuran={12} /> : null}
      {k >= 5 ? (
        <Muncul>
          <Label x={160} y={128} w={112} teks="20 + 6 = 26" ukuran={12} />
        </Muncul>
      ) : null}
      {k >= 6 ? <Lencana x={150} y={182} teks="26" r={k === 6 ? 22 : 19} /> : null}
      <Lompat aktif={k >= 6}>
        <Tokoh x={34} y={204} rambut={RAMBUT_COKELAT} baju={MERAH_MUDA} s={0.7} angkat />
      </Lompat>
      <Lompat aktif={k >= 6}>
        <Tokoh x={266} y={204} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.7} angkat />
      </Lompat>
    </>
  );
}

/* ------------------------ Adegan 6: Maju dan mundur ---------------------- */

const PAPAN_6 = ["Maju dan mundur", "Maju: 20 sampai 30", "Mundur: 30 sampai 20", "dua puluh + satuannya", "Baca nyaring bersama Igil!"];

function Adegan6({ k, t }: PropsAdegan) {
  const maju = k === 1 ? 20 + tumbuh(t, 0, 10, 1.7) : k >= 2 ? 30 : 20;
  const mundur = k === 2 ? 30 - tumbuh(t, 0, 10, 1.7) : k >= 3 ? 20 : 30;
  const sorot1 = k === 1 ? maju : k === 3 ? 21 : 0;
  const sorot2 = k === 2 ? mundur : 0;
  return (
    <>
      <Papan teks={PAPAN_6[k]} />
      <Muncul dy={-16}>
        <text x="18" y="46" fontSize="11.5" fontWeight="900" fill={BIRU}>
          maju →
        </text>
        <JalurKotak x={18} y={50} dari={20} sorot={sorot1} />
      </Muncul>
      <Muncul dy={16} tunda={0.2}>
        <text x="282" y="106" textAnchor="end" fontSize="11.5" fontWeight="900" fill={BIRU}>
          ← mundur
        </text>
        <JalurKotak x={18} y={110} dari={20} sorot={sorot2} />
      </Muncul>
      {k === 1 ? (
        <Muncul key={maju}>
          <Label x={120} y={80} w={60} teks={`${maju}`} ukuran={15} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul key={mundur}>
          <Label x={120} y={140} w={60} teks={`${mundur}`} ukuran={15} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul>
          <Label x={70} y={160} w={150} teks="21 = dua puluh satu" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 4 ? (
        <Muncul>
          <Label x={84} y={164} w={136} teks="Baca nyaring!" ukuran={13} />
        </Muncul>
      ) : null}
      <Lompat aktif={k === 4}>
        <g className="igil-lompat" style={BAWAH}>
          <svg x="232" y="150" width="58" height="42" viewBox="0 0 120 80">
            <IgilWajahIsi />
          </svg>
        </g>
      </Lompat>
      <Lompat aktif={k === 4}>
        <Tokoh x={40} y={200} rambut={RAMBUT_GELAP} baju={KUNING} s={0.78} angkat={k === 4} />
      </Lompat>
    </>
  );
}

/* ------------------------------ Susunan adegan --------------------------- */

const JUDUL_ADEGAN = ["Loker baru", "Tas bergantian", "Menghitung 26 tas", "Kelompok sepuluh", "10 + 10 + 6", "Maju dan mundur"];
const RENDER = [Adegan1, Adegan2, Adegan3, Adegan4, Adegan5, Adegan6];

export const ADEGAN_VIDEO_K2A: AdeganVideo[] = CERITA_K2A.map((c, i) => ({
  id: c.id,
  judul: JUDUL_ADEGAN[i],
  ketukan: kalimatDari(c.voiceNarration),
  render: (p) => RENDER[i](p),
  waktu: i === 1 || i === 2 || i === 5,
  minimal: i === 1 ? { 0: 4.2, 2: 4, 3: 4, 7: 4.4 } : i === 2 ? { 2: 3.4, 3: 3.4, 4: 2.4 } : i === 5 ? { 1: 7, 2: 7 } : undefined,
}));

export function VideoHitungK2A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCerita judul="Loker Baru Kelas Malosi" subjudul="Menghitung bilangan sampai 50" adegan={ADEGAN_VIDEO_K2A} speakGuru={speakGuru} />;
}
