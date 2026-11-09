"use client";

import React from "react";
import { BAWAH, BIRU, HIJAU, KUNING, MERAH_MUDA } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { BonekaSvg, BurungSvg, buatAdegan, DaftarVideoCerita, DonatSvg, JerukSvg, KartuTeks, MERAH, Teks, type VideoSiap } from "./video-k2b2-umum";
import { SUB_C } from "./naskah-k2b2";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 2 Sub-Bab C: Soal Cerita Penjumlahan dan           */
/* Pengurangan. Tiga video, delapan adegan. Diputar satu per satu saat siswa    */
/* mengetuk Putar. Naskah satu sumber: naskah-k2b2.ts (SUB_C.videos).           */
/* Animasi SVG gratis di perangkat siswa. Tanpa API.                           */
/* Naskah: naskah/mtk-2-bab2-video-cerita.md                                   */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";

const papan = (v: number, a: number) => SUB_C.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_C.videos[v].adegan[a];

/** Dahan pohon tempat burung hinggap. */
function Dahan() {
  return (
    <g>
      <path d="M0 92 Q80 78 160 90 T300 84" fill="none" stroke="#A8672D" strokeWidth="7" strokeLinecap="round" />
      <path d="M40 90 Q50 68 70 62 M210 88 Q222 66 246 60" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Burung --------------------------- */

function C1_1({ k }: PropsAdegan) {
  const xM = (i: number) => 38 + i * 56;
  const sorotMerah = k >= 2 && k <= 4 ? [4] : k === 6 ? [0, 1, 2, 3, 4] : [];
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Muncul dy={-16}>
        <g transform="translate(0 -6)">
          <Dahan />
        </g>
      </Muncul>
      {k >= 1 ? (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <Muncul key={`m${i}`} dy={-20} tunda={i * 0.08}>
              <g className={sorotMerah.includes(i) ? "vc-denyut" : undefined}>
                <BurungSvg x={xM(i)} y={78} warna="merah" s={0.78} />
              </g>
            </Muncul>
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <Muncul key={`h${i}`} dy={20} tunda={i * 0.08}>
              <g className={k === 6 ? "vc-denyut" : undefined}>
                <BurungSvg x={xM(i)} y={152} warna="hijau" s={0.78} />
              </g>
            </Muncul>
          ))}
          <Label x={10} y={40} w={96} teks="Merah: 5" ukuran={13} />
          <Label x={10} y={176} w={96} teks="Hijau: 4" ukuran={13} />
        </>
      ) : null}
      {k >= 2 ? (
        <g>
          {Array.from({ length: 4 }, (_, i) => (
            <path key={i} d={`M${xM(i)} 98 V132`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3 3" />
          ))}
        </g>
      ) : null}
      {k >= 3 && k <= 5 ? (
        <Muncul key={k}>
          <Label x={150} y={176} w={140} teks={["Hijau 1 kurangnya", "Merah 1 lebihnya", "Selisih: 1"][k - 3]} ukuran={12.5} />
        </Muncul>
      ) : null}
      {k === 6 ? <Lencana x={236} y={186} teks="9" r={20} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Empat kata kunci ----------------- */

function C1_2({ k }: PropsAdegan) {
  const kata = [
    { n: "lebihnya", tanda: "+/−", warna: "#DBEAFE" },
    { n: "kurangnya", tanda: "+/−", warna: "#FCE7F3" },
    { n: "selisih", tanda: "−", warna: "#FEF3C7" },
    { n: "jumlah", tanda: "+", warna: "#DCFCE7" },
  ];
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {kata.map((x, i) => (
        <Muncul key={x.n} dy={-14} tunda={i * 0.12}>
          <g className={(k === 1 && i === 3) || (k === 2 && i === 2) ? "vc-denyut" : undefined}>
            <rect x={i % 2 === 0 ? 18 : 158} y={i < 2 ? 46 : 98} width="124" height="42" rx="12" fill={x.warna} stroke={BIRU} strokeWidth="3" />
            <Teks x={(i % 2 === 0 ? 18 : 158) + 44} y={(i < 2 ? 46 : 98) + 27} teks={x.n} ukuran={14} />
            <circle cx={(i % 2 === 0 ? 18 : 158) + 104} cy={(i < 2 ? 46 : 98) + 21} r={x.tanda.length > 1 ? 15 : 13} fill={EMAS_C} stroke={BIRU} strokeWidth="2.4" />
            <Teks x={(i % 2 === 0 ? 18 : 158) + 104} y={(i < 2 ? 46 : 98) + (x.tanda.length > 1 ? 25 : 29)} teks={x.tanda} ukuran={x.tanda.length > 1 ? 11 : 22} />
          </g>
        </Muncul>
      ))}
      {k === 3 ? (
        <Muncul dy={10}>
          <Label x={34} y={152} w={232} teks="siapa yang punya lebih banyak?" ukuran={13} />
          <Tokoh x={74} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.55} angkat />
          <Tokoh x={226} y={206} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.55} angkat />
        </Muncul>
      ) : null}
    </>
  );
}
const EMAS_C = "#F0AB00";

/* ------------------------- Video 2, adegan 1: Donat ---------------------------- */

function Piring({ x, y, n, mulai = 0, sorot = [] }: { x: number; y: number; n: number; mulai?: number; sorot?: number[] }) {
  return (
    <g>
      <ellipse cx={x + 62} cy={y + 52} rx="66" ry="14" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} className={sorot.includes(i) ? "vc-denyut" : undefined}>
          <DonatSvg x={x + 20 + (i % 6) * 17} y={y + 18 + Math.floor(i / 6) * 17} s={0.55} warna={["#F9A8D4", "#FDE68A", "#A5B4FC"][(mulai + i) % 3]} />
        </g>
      ))}
    </g>
  );
}

function C2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Muncul dy={-16}>
        <Piring x={10} y={52} n={12} />
        <Label x={34} y={128} w={92} teks="Tika: 12" ukuran={13} />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={-16}>
          <Piring x={164} y={52} n={0} />
          <Lencana x={226} y={88} teks="?" r={20} />
          <Label x={178} y={128} w={104} teks="Malosi: ?" ukuran={13} />
          <KartuTeks x={172} y={150} w={110} baris={["5 kurangnya"]} ukuran={14} warna="#FDECEC" tepi={MERAH} />
        </Muncul>
      ) : null}
      {k === 2 ? <Lencana x={148} y={190} teks="a" r={16} /> : null}
      {k === 3 ? <Lencana x={148} y={190} teks="b" r={16} /> : null}
      <Lompat aktif={k >= 2}>
        <Tokoh x={52} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.55} angkat={k >= 2} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Diketahui dan ditanya ------------ */

function C2_2({ k }: PropsAdegan) {
  const langkah = k < 2 ? "Langkah 1: Diketahui" : "Langkah 2: Ditanya";
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <Muncul key={k < 2 ? "a" : "b"} dy={-14}>
        <KartuTeks x={20} y={46} w={260} baris={[langkah]} ukuran={17} warna="#FEF3C7" />
      </Muncul>
      {k === 1 ? (
        <Muncul dy={10}>
          <KartuTeks x={30} y={92} w={240} baris={["Tika punya 12 donat.", "Malosi punya 5 kurangnya", "dari donat Tika."]} ukuran={14} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul dy={10}>
          <KartuTeks x={30} y={92} w={240} baris={["a. Banyak donat Malosi?", "b. Jumlah donat Tika", "dan Malosi?"]} ukuran={14} />
        </Muncul>
      ) : null}
      {k === 0 || k === 2 ? (
        <g className="igil-lompat" style={BAWAH}>
          <svg x="120" y="110" width="60" height="42" viewBox="0 0 120 80">
            <IgilWajahIsi />
          </svg>
        </g>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Solusi dan kesimpulan ------------ */

function C2_3({ k }: PropsAdegan) {
  const baris = [
    ["Solusi a:", "12 − 5 = 7"],
    ["Jadi, Malosi", "memiliki 7 donat."],
    ["Solusi b:", "7 + 12 = 19"],
    ["Jadi, jumlah donat", "Tika dan Malosi", "adalah 19 donat."],
  ][k];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Muncul key={k} dy={-12}>
        <KartuTeks x={46} y={52} w={208} baris={baris} ukuran={k === 3 ? 15 : 19} warna={k % 2 === 1 ? "#DCFCE7" : "#FFF7CC"} tepi={k % 2 === 1 ? "#16A34A" : BIRU} />
      </Muncul>
      {k === 1 ? <Lencana x={150} y={150} teks="7" r={20} /> : null}
      {k === 3 ? <Lencana x={150} y={162} teks="19" r={22} /> : null}
      {k >= 2 ? (
        <Muncul dy={10}>
          <g transform="translate(0 0)">
            <DonatSvg x={62} y={196} s={0.7} />
            <Teks x={84} y={202} teks="+" ukuran={16} />
            <DonatSvg x={106} y={196} s={0.7} warna="#FDE68A" />
          </g>
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Jeruk Halim ---------------------- */

function JerukBaris({ x, y, n, kolom = 8, sorot = [] }: { x: number; y: number; n: number; kolom?: number; sorot?: number[] }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i} className={sorot.includes(i) ? "vc-denyut" : undefined}>
          <JerukSvg x={x + (i % kolom) * 17} y={y + Math.floor(i / kolom) * 17} s={0.5} />
        </g>
      ))}
    </g>
  );
}

function C3_1({ k }: PropsAdegan) {
  const tampilSisa = k >= 1 && k <= 3;
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Muncul dy={-14}>
        <path d="M14 112 H150 L142 150 Q82 160 22 150 Z" fill="#FFF7ED" stroke="#A8672D" strokeWidth="3.2" strokeLinejoin="round" />
        {k === 0 || k === 2 ? <Teks x={82} y={140} teks="?" ukuran={34} warna={EMAS_C} /> : null}
        {tampilSisa && k !== 2 ? <JerukBaris x={30} y={118} n={12} kolom={7} /> : null}
        {k >= 4 ? <JerukBaris x={26} y={110} n={16} kolom={8} sorot={[12, 13, 14, 15]} /> : null}
        <Label x={20} y={164} w={124} teks={k >= 4 ? "Halim semula: 16" : k >= 1 ? "Halim: sisa 12" : "Keranjang Halim"} ukuran={12} />
      </Muncul>
      {k >= 1 && k <= 3 ? (
        <Muncul dx={20}>
          <ellipse cx="226" cy="140" rx="48" ry="12" fill="#FDF2F8" stroke="#DB2777" strokeWidth="3" />
          <JerukBaris x={202} y={118} n={4} kolom={4} sorot={k === 1 ? [0, 1, 2, 3] : []} />
          <Label x={186} y={164} w={86} teks="Lili: 4" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul dy={-10}>
          <KartuTeks x={96} y={44} w={108} baris={["… − 4 = 12"]} ukuran={17} warna="#FFF7CC" />
        </Muncul>
      ) : null}
      {k === 4 ? (
        <Muncul dy={-10}>
          <KartuTeks x={96} y={44} w={108} baris={["12 + 4 = 16"]} ukuran={17} warna="#DCFCE7" tepi="#16A34A" />
        </Muncul>
      ) : null}
      {k === 5 ? <Lencana x={236} y={72} teks="16" r={22} /> : null}
      {k === 2 ? (
        <g className="igil-lompat" style={BAWAH}>
          <svg x="120" y="44" width="60" height="42" viewBox="0 0 120 80">
            <IgilWajahIsi />
          </svg>
        </g>
      ) : null}
      <Lompat aktif={k >= 4}>
        <Tokoh x={262} y={206} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.5} angkat={k >= 4} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Boneka tiga sahabat -------------- */

function Boneka({ x, y, n, warna, sorot = false }: { x: number; y: number; n: number; warna: string; sorot?: boolean }) {
  return (
    <g className={sorot ? "vc-denyut" : undefined}>
      {Array.from({ length: n }, (_, i) => (
        <BonekaSvg key={i} x={x + (i % 4) * 17} y={y + Math.floor(i / 4) * 24} s={0.5} warna={warna} />
      ))}
    </g>
  );
}

function C3_2({ k }: PropsAdegan) {
  const kelompok = [
    { nama: "Tika", n: 5, x: 12, warna: "#C08457" },
    { nama: "Kira", n: 7, x: 106, warna: "#E9A3C0" },
    { nama: "Lili", n: 8, x: 200, warna: "#8AB4F8" },
  ];
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {kelompok.map((g, i) => (
        <Muncul key={g.nama} dy={-14} tunda={i * 0.1}>
          <rect x={g.x} y={44} width="88" height="76" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
          <Boneka x={g.x + 16} y={66} n={g.n} warna={g.warna} sorot={(k === 3 && i < 2) || (k === 4 && i === 2)} />
          {k >= 1 ? <Label x={g.x + 8} y={128} w={72} teks={`${g.nama}: ${g.n}`} ukuran={12} /> : null}
        </Muncul>
      ))}
      {k === 2 ? <Lencana x={150} y={176} teks="?" r={22} /> : null}
      {k >= 3 ? (
        <Muncul dy={10} key={k}>
          <KartuTeks x={k === 3 ? 48 : 18} y={160} w={k === 3 ? 204 : 132} baris={["5 + 7 = 12"]} ukuran={16} warna="#FFF7CC" />
        </Muncul>
      ) : null}
      {k >= 4 ? (
        <Muncul dy={10}>
          <KartuTeks x={160} y={160} w={124} baris={["12 + 8 = 20"]} ukuran={16} warna={k === 4 ? "#FFF7CC" : "#DCFCE7"} tepi={k === 5 ? "#16A34A" : BIRU} />
        </Muncul>
      ) : null}
      {k === 5 ? <Lencana x={150} y={200} teks="20" r={16} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Soal buatan sendiri -------------- */

function C3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k >= 1 ? (
        <Muncul dy={-12}>
          {["Tokoh", "Benda", "Kata kunci"].map((n, i) => (
            <g key={n}>
              <rect x={14 + i * 96} y={50} width="88" height="34" rx="12" fill={["#DBEAFE", "#FEF3C7", "#FCE7F3"][i]} stroke={BIRU} strokeWidth="3" />
              <Teks x={58 + i * 96} y={72} teks={n} ukuran={13} />
            </g>
          ))}
        </Muncul>
      ) : null}
      {k >= 1 ? (
        <Muncul dy={10}>
          <KartuTeks x={44} y={98} w={212} baris={["Tika punya 9 donat. Kira", "punya 4 lebihnya. Berapa", "donat milik Kira?"]} ukuran={13} warna="#FFFDF2" />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dy={10}>
          <path d="M82 190 H218" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
          <path d="M92 184 L80 190 L92 196 M208 184 L220 190 L208 196" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </Muncul>
      ) : null}
      <Lompat aktif={k >= 2}>
        <Tokoh x={44} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.62} angkat={k >= 2} />
      </Lompat>
      <Lompat aktif={k >= 2}>
        <Tokoh x={256} y={206} rambut={RAMBUT_COKELAT} baju={KUNING} s={0.62} angkat={k >= 2} />
      </Lompat>
      {k === 3 ? <Sorot x={40} y={94} w={220} h={62} r={12} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [C1_1, C1_2],
  [C2_1, C2_2, C2_3],
  [C3_1, C3_2, C3_3],
];

export const ADEGAN_VIDEO_K2B2C = SUB_C.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 0, k: 6 },
  { a: 2, k: 3 },
  { a: 1, k: 5 },
];

export const VIDEO_SIAP_K2B2C: VideoSiap[] = SUB_C.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B2C[i], poster: POSTER[i] }));

export function VideoSoalCeritaK2B2C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B2C} speakGuru={speakGuru} />;
}
