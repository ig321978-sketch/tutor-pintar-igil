"use client";

import React from "react";
import { Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { buatAdegan, Angka, D1, D2, VideoCeritaSatuLayar, FigG, H, Pisau, PotG, Tanda, Tk, V, BIRU, type VideoSiap } from "./video-k2b5-umum";
import { Lup, Tanya } from "./video-k2b3-umum";
import { SUB_C5 } from "./naskah-k2b5";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 5 Sub-Bab C: Seperempat dari Benda Utuh. Tiga       */
/* video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.     */
/* Naskah satu sumber: naskah-k2b5.ts (SUB_C5.videos). Tanpa API.               */
/* Naskah: naskah/mtk-2-bab5-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_C5.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_C5.videos[v].adegan[a];

const EMPAT = [
  { nama: "kira", x: 44 },
  { nama: "malosi", x: 118 },
  { nama: "upe", x: 192 },
  { nama: "tika", x: 266 },
] as const;

/** Juring lingkaran: kipas dengan sudut 90 derajat. Dipakai menyusun ikan kertas. */
function Kipas({ vx, vy, putar, r, warna }: { vx: number; vy: number; putar: number; r: number; warna: string }) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const p1: [number, number] = [vx + r * Math.cos(rad(putar - 45)), vy + r * Math.sin(rad(putar - 45))];
  const p2: [number, number] = [vx + r * Math.cos(rad(putar + 45)), vy + r * Math.sin(rad(putar + 45))];
  return <path d={`M${vx} ${vy} L${p1[0]} ${p1[1]} A${r} ${r} 0 0 1 ${p2[0]} ${p2[1]} Z`} fill={warna} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />;
}

/** Ikan dari satu setengah lingkaran dan tiga seperempat lingkaran. (cx, cy) pusat badan. */
function IkanKertas({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <Kipas vx={cx} vy={cy} putar={0} r={46} warna="#60A5FA" />
      <Kipas vx={cx - 5} vy={cy - 40} putar={-90} r={26} warna="#34D399" />
      <Kipas vx={cx - 5} vy={cy + 40} putar={90} r={26} warna="#34D399" />
      <path d={`M${cx} ${cy - 40} A40 40 0 0 0 ${cx} ${cy + 40} Z`} fill="#FB923C" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <circle cx={cx - 22} cy={cy - 10} r="5" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.2" />
      <circle cx={cx - 23} cy={cy - 10} r="2.2" fill={BIRU} />
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Kira ingin berbagi --------------------- */

function C1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <Lompat>
            <Tk x={74} nama="kira" angkat />
          </Lompat>
          <Muncul dx={40}>
            <PotG jenis="martabak" x={138} y={84} w={86} />
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          {EMPAT.map((t, i) => (
            <Muncul key={t.nama} aktif={i === 0 || k >= 1} dy={i === 0 ? 0 : 14} tunda={i === 0 ? 0 : i * 0.2}>
              <Tk x={t.x} nama={t.nama} s={0.78} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <Muncul skala={0.3}>
          {EMPAT.map((t, i) => (
            <Angka key={t.nama} x={t.x} y={96} teks={String(i + 1)} r={14} isi="#FFE566" />
          ))}
          <Label x={76} y={50} w={148} teks="1 martabak, 4 anak" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul skala={0.3}>
          <PotG jenis="martabak" x={100} y={40} w={100} garis={[V, H]} jarak={0.35} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Memotong menjadi empat ----------------- */

function C1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? <PotG jenis="martabak" x={86} y={42} w={128} /> : null}
      {k === 1 ? (
        <>
          <PotG jenis="martabak" x={94} y={36} w={112} garis={[V, H]} jarak={0.35} />
          <Muncul skala={0.3}>
            <Label x={90} y={166} w={120} teks="4 bagian sama" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PotG jenis="martabak" x={86} y={42} w={128} />
          <Muncul skala={0.2}>
            <line x1="150" y1="38" x2="150" y2="168" stroke={BIRU} strokeWidth="3.2" strokeDasharray="7 5" strokeLinecap="round" />
            <line x1="82" y1="106" x2="218" y2="106" stroke={BIRU} strokeWidth="3.2" strokeDasharray="7 5" strokeLinecap="round" />
          </Muncul>
          <Pisau x={228} y={140} putar={-150} s={0.8} />
          <Tanya x={36} y={92} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Seperempat ----------------------------- */

function C1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k <= 1 ? (
        <>
          <PotG jenis="martabak" x={90} y={34} w={120} garis={[V, H]} jarak={0.4} />
          {[[117, 70], [183, 70], [117, 128], [183, 128]].map(([x, y], i) => (
            <Muncul key={i} tunda={i * 0.2} skala={0.3}>
              <Angka x={x} y={y} teks={String(i + 1)} r={11} isi="#FFE566" />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sorot x={94} y={38} w={58} h={54} />
          <Lencana x={268} y={84} teks="¼" r={22} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          {EMPAT.map((t, i) => (
            <Muncul key={t.nama} tunda={i * 0.2} dy={-10}>
              <PotG jenis="martabak" x={t.x - 24} y={80} w={48} sisa="seperempat" variasi={i} />
              <Tk x={t.x} nama={t.nama} s={0.78} />
            </Muncul>
          ))}
          <Label x={64} y={46} w={172} teks="masing-masing ¼" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Apel yang dipotong --------------------- */

function C2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? <PotG jenis="apel" x={92} y={44} w={116} sisa="utuh" /> : null}
      {k === 1 ? (
        <>
          <PotG jenis="apel" x={92} y={44} w={116} sisa="setengah" />
          <Label x={84} y={158} w={132} teks="setengah apel" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PotG jenis="apel" x={92} y={44} w={116} sisa="seperempat" variasi={1} />
          <Label x={72} y={158} w={156} teks="seperempat apel" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Dua kali memotong ---------------------- */

function C2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <PotG jenis="martabak" x={92} y={44} w={116} />
          <Angka x={54} y={96} teks="2×" r={24} isi="#FFE566" />
          <Pisau x={246} y={110} putar={-160} s={0.8} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PotG jenis="martabak" x={92} y={44} w={116} garis={[V]} jarak={0.4} />
          <Label x={88} y={158} w={124} teks="potong pertama" ukuran={12} />
          <Lencana x={256} y={90} teks="½" r={24} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PotG jenis="martabak" x={92} y={44} w={116} garis={[V]} jarak={0.15} />
          <Muncul skala={0.2}>
            <line x1="94" y1="104" x2="206" y2="104" stroke={BIRU} strokeWidth="3.2" strokeDasharray="7 5" strokeLinecap="round" />
          </Muncul>
          <Label x={88} y={158} w={124} teks="potong kedua" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <PotG jenis="martabak" x={92} y={44} w={116} garis={[V, H]} jarak={0.5} />
          <Sorot x={96} y={48} w={54} h={54} />
          <Lencana x={256} y={90} teks="¼" r={26} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Seperempat di sekitar ------------------ */

function C2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Muncul dy={-12}>
            <PotG jenis="apel" x={26} y={66} w={70} sisa="seperempat" />
          </Muncul>
          <Muncul dy={-12} tunda={0.15}>
            <PotG jenis="puding" x={116} y={66} w={70} sisa="seperempat" variasi={1} />
          </Muncul>
          <Muncul dy={-12} tunda={0.3}>
            <PotG jenis="kueBolu" x={206} y={70} w={74} sisa="seperempat" variasi={2} />
          </Muncul>
          <Lup x={150} y={50} s={1.1} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          {(
            [
              ["apel", "apel", 30],
              ["puding", "puding", 116],
              ["kueBolu", "kue bolu", 202],
            ] as const
          ).map(([j, n, x], i) => (
            <Muncul key={j} tunda={i * 0.2} skala={0.4}>
              <PotG jenis={j} x={x} y={54} w={74} sisa="seperempat" variasi={i} />
              <Label x={x - 4} y={136} w={82} teks={`¼ ${n}`} ukuran={12} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PotG jenis="puding" x={16} y={70} w={70} sisa="seperempat" variasi={0} />
          <text x="98" y="112" textAnchor="middle" fontSize="28" fontWeight="900" fill={BIRU}>
            +
          </text>
          <PotG jenis="puding" x={108} y={70} w={70} sisa="seperempat" variasi={1} />
          <text x="190" y="112" textAnchor="middle" fontSize="28" fontWeight="900" fill={BIRU}>
            =
          </text>
          <Muncul skala={0.3}>
            <PotG jenis="puding" x={206} y={66} w={80} sisa="setengah" />
          </Muncul>
          <Label x={60} y={150} w={180} teks="¼ + ¼ = ½" ukuran={16} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          {[0, 1, 2, 3].map((i) => (
            <PotG key={i} jenis="pizza" x={6 + i * 44} y={76} w={40} sisa="seperempat" variasi={i} />
          ))}
          <text x="186" y="104" textAnchor="middle" fontSize="26" fontWeight="900" fill={BIRU}>
            =
          </text>
          <Muncul skala={0.3}>
            <PotG jenis="pizza" x={204} y={60} w={86} sisa="utuh" />
          </Muncul>
          <Label x={50} y={150} w={200} teks="4 × ¼ = 1 utuh" ukuran={15} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Lipat menjadi empat -------------------- */

function C3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <Muncul dy={-12}>
          <FigG bentuk="persegi" x={96} y={46} w={108} alas="#FEF3C7" />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <>
          <FigG bentuk="persegi" garis={[V, H]} x={96} y={46} w={108} alas="#FEF3C7" putus={[V, H]} />
          <Muncul skala={0.3}>
            <Label x={74} y={158} w={152} teks="4 bagian sama besar" ukuran={11} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <FigG bentuk="persegi" garis={[V, H]} diwarnai={[true, false, false, false]} x={96} y={46} w={108} alas="#FEF3C7" warna="#FBBF24" />
          <Lencana x={244} y={84} teks="¼" r={28} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Banyak cara ---------------------------- */

function C3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <FigG bentuk="persegi" garis={[V]} x={30} y={56} w={100} alas="#FEF3C7" putus={[V]} />
          <FigG bentuk="persegi" garis={[D1]} x={170} y={56} w={100} alas="#FEF3C7" putus={[D1]} />
          <Tanya x={150} y={104} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <FigG bentuk="persegi" garis={[V, H]} diwarnai={[true, false, false, false]} x={96} y={46} w={108} alas="#FEF3C7" warna="#FBBF24" />
          <Label x={64} y={158} w={172} teks="empat persegi kecil" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <FigG bentuk="persegi" garis={[D1, D2]} diwarnai={[true, false, false, false]} x={96} y={46} w={108} alas="#FEF3C7" warna="#FB923C" />
          <Label x={64} y={158} w={172} teks="empat segitiga" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <FigG bentuk="persegi" garis={[V, H]} diwarnai={[true, false, false, false]} x={24} y={56} w={100} alas="#FEF3C7" warna="#FBBF24" />
          <FigG bentuk="persegi" garis={[D1, D2]} diwarnai={[true, false, false, false]} x={176} y={56} w={100} alas="#FEF3C7" warna="#FB923C" />
          <Tanda x={150} y={104} benar />
          <Label x={70} y={166} w={160} teks="harus sama besar" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Ayo berkarya --------------------------- */

function C3_3({ k }: PropsAdegan) {
  const x = (i: number) => 10 + i * 72;
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          {[0, 1, 2, 3].map((i) => (
            <Muncul key={i} tunda={i * 0.15} dy={10}>
              <FigG bentuk="lingkaran" x={x(i)} y={70} w={64} alas="#FEF3C7" />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <>
          {[0, 1, 2, 3].map((i) => (i === 0 ? <FigG key={i} bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} x={x(i)} y={70} w={64} alas="#FEF3C7" warna="#FB923C" putus={[V]} /> : <FigG key={i} bentuk="lingkaran" x={x(i)} y={70} w={64} alas="#FEF3C7" />))}
          <Label x={x(0) - 2} y={140} w={68} teks="½" ukuran={16} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <FigG bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} x={x(0)} y={70} w={64} alas="#FEF3C7" warna="#FB923C" />
          {[1, 2, 3].map((i) => (
            <FigG key={i} bentuk="lingkaran" garis={[V, H]} diwarnai={[true, false, false, false]} x={x(i)} y={70} w={64} alas="#FEF3C7" warna="#34D399" putus={[V, H]} />
          ))}
          <Label x={x(1) + 6} y={140} w={190} teks="3 × ¼" ukuran={16} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.4}>
            <IkanKertas cx={118} cy={98} />
          </Muncul>
          <Lompat>
            <Tk x={262} nama="kira" s={0.8} angkat />
          </Lompat>
          <Label x={50} y={160} w={170} teks="½ + ¼ + ¼ + ¼" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [C1_1, C1_2, C1_3],
  [C2_1, C2_2, C2_3],
  [C3_1, C3_2, C3_3],
];

export const ADEGAN_VIDEO_K2B5C = SUB_C5.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

export const VIDEO_SIAP_K2B5C: VideoSiap[] = SUB_C5.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B5C[i] }));

export function VideoK2B5C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_C5} videos={VIDEO_SIAP_K2B5C} speakGuru={speakGuru} />;
}
