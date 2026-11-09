"use client";

import React from "react";
import { Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { buatAdegan, Angka, D1, D2, VideoCeritaSatuLayar, FigG, GelasG, H, MERAH, Pisau, PotG, SendokG, Tanda, Tk, V, BIRU, type VideoSiap } from "./video-k2b5-umum";
import { Lup, Tanya } from "./video-k2b3-umum";
import { SUB_A5 } from "./naskah-k2b5";
import type { Garis } from "./data-k2b5";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 5 Sub-Bab A: Setengah dari Benda Utuh. Tiga video,  */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah     */
/* satu sumber: naskah-k2b5.ts (SUB_A5.videos). Animasi SVG gratis di perangkat. */
/* Tanpa API. Naskah: naskah/mtk-2-bab5-video-cerita.md                          */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A5.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A5.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Oleh-oleh martabak -------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k <= 1 ? (
        <>
          <Tk x={62} nama="ibu" s={1.05} angkat={k === 0} />
          <Lompat aktif={k === 1}>
            <Tk x={232} nama="kira" angkat={k === 1} />
          </Lompat>
        </>
      ) : null}
      {k === 0 ? (
        <Muncul dx={-40}>
          <PotG jenis="martabak" x={124} y={112} w={54} />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul dy={-10}>
            <PotG jenis="martabak" x={130} y={124} w={44} />
          </Muncul>
          <Muncul>
            <ellipse cx="150" cy="72" rx="46" ry="28" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
            <circle cx="196" cy="108" r="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
            <circle cx="206" cy="120" r="3" fill="#FFFFFF" stroke={BIRU} strokeWidth="2" />
            <Tk x={150} y={92} nama="tika" s={0.5} tampilNama={false} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <rect x="196" y="82" width="74" height="70" fill="#FDE68A" stroke={BIRU} strokeWidth="3" />
          <path d="M190 84 L233 50 L276 84 Z" fill="#F87171" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
          <rect x="222" y="112" width="22" height="40" fill="#92400E" stroke={BIRU} strokeWidth="2.4" />
          <Muncul dx={30}>
            <Tk x={256} nama="tika" s={0.9} />
          </Muncul>
          <Tk x={k === 2 ? 110 : 76} nama="kira" />
        </>
      ) : null}
      {k === 2 ? (
        <Muncul dy={-8}>
          <PotG jenis="martabak" x={124} y={134} w={40} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul skala={0.4}>
          <PotG jenis="martabak" x={96} y={42} w={86} garis={[V]} jarak={0.45} />
          <Label x={104} y={138} w={96} teks="Sama banyak" ukuran={12} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Pesan Ibu --------------------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Tk x={58} nama="ibu" s={1.05} angkat={k <= 1} />
      <Tk x={238} nama="kira" angkat={k === 2} />
      <PotG jenis="martabak" x={118} y={118} w={64} />
      {k === 0 ? (
        <Muncul>
          <Label x={90} y={50} w={120} teks="Bagi adil, ya!" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <Muncul>
          <path d="M150 52 L178 100 L122 100 Z" fill="#FDE047" stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
          <text x="150" y="94" textAnchor="middle" fontSize="30" fontWeight="900" fill={BIRU}>
            !
          </text>
          <Pisau x={190} y={110} putar={-20} s={0.75} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul dx={30}>
            <Pisau x={142} y={140} putar={-24} s={0.95} />
          </Muncul>
          <Muncul>
            <Label x={84} y={52} w={132} teks="Pisau aman anak" ukuran={13} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Bagaimana memotongnya ------------------ */

function A1_3({ k }: PropsAdegan) {
  const geser: Garis = [[28, 0], [28, 100]];
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <PotG jenis="martabak" x={96} y={46} w={108} />
          <Tanya x={226} y={78} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PotG jenis="martabak" x={100} y={46} w={100} garis={[geser]} jarak={0.9} />
          <Muncul>
            <Label x={38} y={150} w={90} teks="sedikit" ukuran={13} />
            <Label x={160} y={150} w={100} teks="banyak" ukuran={13} />
          </Muncul>
          <Tanda x={150} y={118} benar={false} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PotG jenis="martabak" x={96} y={46} w={108} />
          <line x1="150" y1="42" x2="150" y2="154" stroke="#475569" strokeWidth="3.4" strokeDasharray="7 5" strokeLinecap="round" className="vc-denyut" />
          <Sorot x={92} y={40} w={116} h={116} />
          <Lencana x={244} y={84} teks="Tengah" r={32} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Memotong menjadi dua ------------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? <PotG jenis="martabak" x={86} y={42} w={128} /> : null}
      {k === 1 ? (
        <>
          <PotG jenis="martabak" x={86} y={42} w={128} />
          <Muncul skala={0.2}>
            <line x1="150" y1="40" x2="150" y2="162" stroke={BIRU} strokeWidth="3.4" strokeDasharray="7 5" strokeLinecap="round" />
          </Muncul>
          <Muncul dx={30} dy={-10}>
            <Pisau x={156} y={28} putar={70} s={0.8} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? <PotG jenis="martabak" x={86} y={42} w={128} garis={[V]} jarak={0.5} /> : null}
      {k === 2 ? (
        <Muncul>
          <Angka x={36} y={96} teks="1" r={20} />
          <text x="150" y="102" textAnchor="middle" fontSize="26" fontWeight="900" fill={BIRU} aria-hidden="true">
            →
          </text>
          <Angka x={264} y={96} teks="2" r={20} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Sorot x={96} y={46} w={54} h={112} />
          <Muncul skala={0.3}>
            <Angka x={150} y={178} teks="½" r={22} isi="#FFE566" />
          </Muncul>
          <Label x={180} y={166} w={104} teks="setengah" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Setengah di sekitar kita --------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <Muncul dy={-12}>
            <PotG jenis="semangka" x={30} y={70} w={70} sisa="setengah" />
          </Muncul>
          <Muncul dy={-12} tunda={0.15}>
            <GelasG x={118} y={64} w={64} level={0.5} />
          </Muncul>
          <Muncul dy={-12} tunda={0.3}>
            <PotG jenis="kueBolu" x={196} y={70} w={72} sisa="setengah" variasi={0} />
          </Muncul>
          <Lup x={150} y={50} s={1.1} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul skala={0.4}>
            <PotG jenis="semangka" x={46} y={50} w={90} sisa="setengah" />
            <Label x={36} y={148} w={110} teks="setengah semangka" ukuran={10} />
          </Muncul>
          <Muncul skala={0.4} tunda={0.2}>
            <PotG jenis="kueBolu" x={164} y={52} w={96} sisa="setengah" />
            <Label x={160} y={148} w={110} teks="setengah kue bolu" ukuran={10} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul skala={0.4}>
            <GelasG x={46} y={48} w={92} level={0.5} />
            <Label x={36} y={148} w={110} teks="setengah gelas air" ukuran={10} />
          </Muncul>
          <Muncul skala={0.4} tunda={0.2}>
            <SendokG x={170} y={104} s={1.3} />
            <Label x={160} y={148} w={110} teks="setengah sendok" ukuran={10} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.4}>
            <FigG bentuk="persegi" garis={[V]} diwarnai={[true, false]} x={100} y={44} w={100} putus={[V]} />
          </Muncul>
          <Label x={74} y={152} w={152} teks="lipatan kertas" ukuran={13} />
        </>
      ) : null}
      {k === 4 ? (
        <>
          {(["semangka", "kueBolu", "roti"] as const).map((j, i) => (
            <Muncul key={j} tunda={i * 0.15} dy={10}>
              <PotG jenis={j} x={20 + i * 62} y={66} w={54} sisa="setengah" variasi={i} />
            </Muncul>
          ))}
          <Muncul tunda={0.45} dy={10}>
            <GelasG x={206} y={62} w={50} level={0.5} />
          </Muncul>
          <Lompat>
            <Tk x={150} nama="kira" s={0.8} angkat />
          </Lompat>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Ayo melipat kertas --------------------- */

function A2_3({ k }: PropsAdegan) {
  const empat: { g: Garis; n: string }[] = [
    { g: V, n: "tegak" },
    { g: H, n: "mendatar" },
    { g: D1, n: "miring" },
    { g: D2, n: "miring" },
  ];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <Muncul dy={-12}>
          <FigG bentuk="persegi" x={96} y={46} w={108} alas="#FEF3C7" />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <>
          <FigG bentuk="persegi" garis={[V]} diwarnai={[true, false]} x={96} y={46} w={108} putus={[V]} alas="#FEF3C7" warna="#FBBF24" />
          <Muncul>
            <Label x={74} y={158} w={152} teks="sama besar" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          {empat.map((e, i) => (
            <Muncul key={i} tunda={i * 0.25} dy={10}>
              <FigG bentuk="persegi" garis={[e.g]} diwarnai={[true, false]} x={12 + i * 72} y={70} w={64} putus={[e.g]} alas="#FEF3C7" warna="#FBBF24" />
              <Label x={12 + i * 72} y={136} w={64} teks={e.n} ukuran={11} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.4}>
            <FigG bentuk="persegiPanjang" diwarnai={[true]} x={26} y={60} w={100} warna="#FBBF24" />
            <Label x={22} y={146} w={108} teks="persegi panjang" ukuran={10} />
          </Muncul>
          <Muncul skala={0.4} tunda={0.25}>
            <FigG bentuk="segitiga" diwarnai={[true]} x={174} y={52} w={100} warna="#FB923C" />
            <Label x={176} y={146} w={96} teks="segitiga" ukuran={11} />
          </Muncul>
          <Lencana x={150} y={104} teks="½" r={20} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Memotong lingkaran --------------------- */

function A3_1({ k }: PropsAdegan) {
  const tiga: { g: Garis; n: string }[] = [
    { g: V, n: "tegak" },
    { g: H, n: "mendatar" },
    { g: D1, n: "miring" },
  ];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <FigG bentuk="lingkaran" x={72} y={44} w={110} alas="#FEF3C7" />
          <Muncul dx={50}>
            <Pisau x={190} y={110} putar={-160} s={0.9} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          {tiga.map((e, i) => (
            <Muncul key={i} tunda={i * 0.25} dy={10}>
              <FigG bentuk="lingkaran" garis={[e.g]} diwarnai={[true, false]} x={12 + i * 98} y={56} w={86} putus={[e.g]} alas="#FEF3C7" warna="#FBBF24" />
              <circle cx={55 + i * 98} cy={99} r="3.4" fill={MERAH} stroke="#FFFFFF" strokeWidth="1.4" />
              <Label x={12 + i * 98} y={146} w={86} teks={e.n} ukuran={12} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <FigG bentuk="lingkaran" garis={[V]} diwarnai={[true, false]} x={80} y={44} w={104} warna="#FBBF24" />
          <circle cx="132" cy="96" r="3.8" fill={MERAH} stroke="#FFFFFF" strokeWidth="1.4" />
          <Lencana x={226} y={80} teks="½" r={26} />
          <Label x={78} y={152} w={108} teks="selalu setengah" ukuran={11} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Memotong segi empat -------------------- */

function A3_2({ k }: PropsAdegan) {
  const tiga: { g: Garis; n: string }[] = [
    { g: V, n: "tegak" },
    { g: H, n: "mendatar" },
    { g: D1, n: "pojok ke pojok" },
  ];
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? <FigG bentuk="persegiPanjang" x={75} y={24} w={150} alas="#DBEAFE" /> : null}
      {k === 1 ? (
        <>
          {tiga.map((e, i) => (
            <Muncul key={i} tunda={i * 0.25} dy={10}>
              <FigG bentuk="persegi" garis={[e.g]} diwarnai={[true, false]} x={12 + i * 98} y={56} w={86} putus={[e.g]} alas="#DBEAFE" warna="#60A5FA" />
              <Label x={8 + i * 98} y={146} w={94} teks={e.n} ukuran={e.n.length > 8 ? 10 : 12} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <>
          {tiga.map((e, i) => (
            <Muncul key={i} tunda={i * 0.2}>
              <FigG bentuk="persegi" garis={[e.g]} diwarnai={[true, false]} x={12 + i * 98} y={56} w={86} warna="#60A5FA" alas="#DBEAFE" />
              <Angka x={55 + i * 98} y={156} teks="½" r={16} isi="#FFE566" />
            </Muncul>
          ))}
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Gambar A dan gambar B ------------------ */

function A3_3({ k }: PropsAdegan) {
  const geser: Garis[] = [[[28, 0], [28, 100]]];
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <FigG bentuk="persegiPanjang" x={14} y={25} w={128} alas="#DBEAFE" />
          <FigG bentuk="persegiPanjang" x={158} y={25} w={128} alas="#DBEAFE" />
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <FigG bentuk="persegiPanjang" garis={[V]} diwarnai={[true, false]} x={14} y={25} w={128} warna="#60A5FA" alas="#DBEAFE" />
          {k >= 2 ? (
            <FigG bentuk="persegiPanjang" garis={geser} diwarnai={[true, false]} x={158} y={25} w={128} warna="#60A5FA" alas="#DBEAFE" />
          ) : (
            <FigG bentuk="persegiPanjang" x={158} y={25} w={128} alas="#DBEAFE" />
          )}
        </>
      ) : null}
      <Label x={46} y={124} w={64} teks="A" ukuran={16} />
      <Label x={190} y={124} w={64} teks="B" ukuran={16} />
      {k === 1 ? (
        <Muncul skala={0.3}>
          <Tanda x={78} y={52} benar />
          <Label x={30} y={158} w={96} teks="setengah" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul skala={0.3}>
          <Tanda x={222} y={52} benar={false} />
          <Label x={168} y={158} w={110} teks="bukan setengah" ukuran={11} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Sorot x={10} y={60} w={136} h={62} />
          <Label x={58} y={158} w={184} teks="dua bagian sama besar" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [A1_1, A1_2, A1_3],
  [A2_1, A2_2, A2_3],
  [A3_1, A3_2, A3_3],
];

export const ADEGAN_VIDEO_K2B5A = SUB_A5.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

export const VIDEO_SIAP_K2B5A: VideoSiap[] = SUB_A5.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B5A[i] }));

export function VideoK2B5A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_A5} videos={VIDEO_SIAP_K2B5A} speakGuru={speakGuru} />;
}
