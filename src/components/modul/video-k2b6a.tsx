"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { buatAdegan, BIRU, DaftarVideoCerita, Emo, Kemoceng, NeracaSvg, Obj, Orang, RuangKelas, SatuanSvg, type VideoSiap, Panah, Ucap } from "./video-k2b6-umum";
import { SUB_A6 } from "./naskah-k2b6";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 6 Sub-Bab A: Berat. Tiga video, sembilan adegan.    */
/* Diputar satu per satu saat siswa mengetuk Putar. Naskah satu sumber:         */
/* naskah-k2b6.ts (SUB_A6.videos). Animasi SVG gratis di perangkat. Tanpa API.   */
/* Naskah: naskah/mtk-2-bab6-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A6.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A6.videos[v].adegan[a];

const ENAM = ["upe", "lili", "halim", "kira", "malosi", "tika"] as const;
const X6 = [30, 78, 126, 174, 222, 270];

/* ------------------------- Video 1, adegan 1: Giliran piket ---------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <RuangKelas />
      <Papan teks={papan(0, 0)[k]} />
      {k === 0
        ? ENAM.map((n, i) => (
            <Muncul key={n} dy={14} tunda={i * 0.12}>
              <Orang x={X6[i]} y={192} nama={n} s={0.62} />
            </Muncul>
          ))
        : null}
      {k === 1 ? (
        <>
          <Lompat>
            <Obj id="meja" x={104} y={86} w={92} h={71} />
          </Lompat>
          <Orang x={78} y={192} nama="upe" s={0.85} angkat />
          <Orang x={222} y={192} nama="halim" s={0.85} angkat />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul dy={10}>
            <Obj id="kursi" x={40} y={116} w={34} h={56} />
          </Muncul>
          <Orang x={92} y={192} nama="malosi" s={0.8} angkat />
          <Muncul tunda={0.2}>
            <Emo x={236} y={78} e="✨" s={22} />
          </Muncul>
          <Orang x={236} y={192} nama="tika" s={0.8} angkat />
          <Orang x={150} y={192} nama="kira" s={0.8} />
          <Muncul tunda={0.3}>
            <Emo x={176} y={176} e="🧹" s={30} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Obj id="meja" x={96} y={104} w={78} h={60} />
          <Lompat>
            <Kemoceng x={196} y={92} s={1.5} />
          </Lompat>
          <Orang x={226} y={192} nama="lili" s={0.85} angkat />
          {[[130, 98], [150, 92], [168, 100]].map(([a, b], i) => (
            <Muncul key={i} tunda={0.2 + i * 0.15} dy={-6}>
              <Emo x={a} y={b} e="✨" s={14} />
            </Muncul>
          ))}
          <Orang x={46} y={192} nama="upe" s={0.62} tampilNama={false} />
          <Orang x={72} y={192} nama="halim" s={0.62} tampilNama={false} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Berat atau ringan? ----------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <RuangKelas />
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? (
        <>
          <Lompat>
            <Obj id="meja" x={98} y={84} w={104} h={80} />
          </Lompat>
          <Orang x={70} y={192} nama="upe" s={0.85} angkat />
          <Orang x={232} y={192} nama="halim" s={0.85} angkat />
          <Muncul tunda={0.3}>
            <Ucap x={112} y={40} w={76} teks="berat!" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Lompat>
            <Kemoceng x={170} y={100} s={2} />
          </Lompat>
          <Orang x={130} y={192} nama="lili" s={1} angkat />
          <Muncul tunda={0.3}>
            <Ucap x={120} y={40} w={80} teks="ringan!" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Obj id="meja" x={24} y={104} w={66} h={51} />
          <Orang x={20} y={192} nama="upe" s={0.7} angkat tampilNama={false} />
          <Orang x={106} y={192} nama="halim" s={0.7} angkat tampilNama={false} />
          <Muncul tunda={0.3}>
            <Label x={14} y={40} w={104} teks="2 orang" />
          </Muncul>
          <Kemoceng x={206} y={118} s={1.4} />
          <Orang x={250} y={192} nama="lili" s={0.8} angkat tampilNama={false} />
          <Muncul tunda={0.5}>
            <Label x={176} y={40} w={110} teks="1 tangan" />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Obj id="meja" x={100} y={84} w={100} h={77} />
          <Muncul tunda={0.2} dy={-20}>
            <Panah x1={150} y1={46} x2={150} y2={82} />
          </Muncul>
          <Muncul tunda={0.5}>
            <Label x={64} y={166} w={172} teks="ditarik ke bawah" />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Bercerita dengan kata berat -------- */

function A1_3({ k }: PropsAdegan) {
  const baris = (
    <>
      <Obj id="meja" x={26} y={84} w={84} h={65} />
      <Obj id="kursi" x={138} y={96} w={32} h={52} />
      <Kemoceng x={224} y={118} s={1.5} />
    </>
  );
  return (
    <>
      {k < 3 ? <RuangKelas /> : null}
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          {["lebih berat", "paling berat", "paling ringan"].map((t, i) => (
            <Muncul key={t} tunda={i * 0.25} dy={10}>
              <Label x={74} y={56 + i * 40} w={152} teks={t} ukuran={15} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k >= 1 && k <= 2 ? (
        <>
          {baris}
          <Muncul tunda={0.3}>
            <text x="122" y="122" textAnchor="middle" fontSize="30" fontWeight="900" fill={BIRU}>
              &gt;
            </text>
          </Muncul>
          <Muncul tunda={0.5}>
            <text x="190" y="122" textAnchor="middle" fontSize="30" fontWeight="900" fill={BIRU}>
              &gt;
            </text>
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Lompat>
            <Emo x={68} y={72} e="⭐" s={26} />
          </Lompat>
          <Label x={14} y={158} w={104} teks="paling berat" ukuran={12} />
          <Label x={180} y={158} w={110} teks="paling ringan" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={84} y={96} e="🎈" s={64} />
          </Lompat>
          <Muncul tunda={0.2}>
            <svg x={190} y={112} width="50" height="40" viewBox="0 0 40 40">
              <path d="M6 32 Q4 18 15 12 Q26 7 33 17 Q38 28 29 33 Q18 38 6 32 Z" fill="#9CA3AF" stroke="#374151" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M13 20 Q18 15 23 18" stroke="#E5E7EB" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            </svg>
          </Muncul>
          <Label x={24} y={162} w={120} teks="besar, ringan" ukuran={13} />
          <Label x={160} y={162} w={120} teks="kecil, berat" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Timbangan jungkat-jungkit ---------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <Muncul skala={0.4}>
            <NeracaSvg x={50} y={92} s={0.4} miring={-1} kiri={<Emo x={0} y={-14} e="🍎" s={26} />} kanan={<Emo x={0} y={-12} e="🍇" s={20} />} />
          </Muncul>
          <Muncul skala={0.4} tunda={0.3}>
            <NeracaSvg x={150} y={80} s={0.4} gantung miring={-1} kiri={<Emo x={0} y={-8} e="🍉" s={26} />} kanan={<Emo x={0} y={-6} e="🍎" s={20} />} />
          </Muncul>
          <Muncul skala={0.4} tunda={0.6}>
            <Emo x={250} y={112} e="🤲" s={52} />
          </Muncul>
          {["jungkat-jungkit", "gantungan baju", "kedua tangan"].map((t, i) => (
            <Muncul key={t} tunda={0.8 + i * 0.1}>
              <text x={[50, 150, 250][i]} y="168" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                {t}
              </text>
            </Muncul>
          ))}
        </>
      ) : null}
      {k >= 1 ? (
        <NeracaSvg
          x={150}
          y={88}
          s={0.95}
          miring={k === 1 ? 0 : -1}
          kiri={k >= 2 ? <Emo x={0} y={-16} e="🍎" s={32} /> : null}
          kanan={k >= 2 ? <Emo x={0} y={-14} e="🍇" s={26} /> : null}
        />
      ) : null}
      {k === 1 ? (
        <Muncul tunda={0.2}>
          <Label x={50} y={178} w={200} teks="papan yang ujungnya naik turun" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul tunda={0.2}>
            <Label x={6} y={38} w={140} teks="berat: lebih bawah" ukuran={12} />
          </Muncul>
          <Muncul tunda={0.5}>
            <Label x={154} y={38} w={140} teks="ringan: lebih atas" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Gantungan baju dan dua tangan ------ */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k <= 1 ? (
        <NeracaSvg
          x={150}
          y={84}
          s={1}
          gantung
          miring={k === 0 ? 0 : -1}
          kiri={k === 1 ? <Emo x={0} y={-10} e="🍉" s={28} /> : null}
          kanan={k === 1 ? <Emo x={0} y={-8} e="🍎" s={22} /> : null}
        />
      ) : null}
      {k === 0 ? (
        <Muncul tunda={0.2}>
          <Label x={64} y={168} w={172} teks="satu benda di tiap ujung" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 1 ? <Sorot x={52} y={104} w={56} h={48} /> : null}
      {k >= 2 ? (
        <>
          <Muncul>
            <Emo x={84} y={150} e="🤲" s={60} />
          </Muncul>
          <Muncul tunda={0.2}>
            <Emo x={216} y={150} e="🤲" s={60} />
          </Muncul>
          <Lompat>
            <Emo x={84} y={104} e="🍊" s={34} />
          </Lompat>
          <Lompat>
            <Emo x={216} y={104} e="🍎" s={34} />
          </Lompat>
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.2}>
          <Label x={128} y={86} w={44} teks="=" ukuran={20} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Paling berat, paling ringan -------- */

function A2_3({ k }: PropsAdegan) {
  const buah: [string, number, number, string][] = [
    ["🍉", 46, 52, "semangka"],
    ["🍎", 114, 34, "apel"],
    ["🍊", 176, 34, "jeruk"],
    ["🍇", 244, 24, "anggur"],
  ];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 || k >= 2 ? (
        <>
          {buah.map(([e, x, s, nama], i) => (
            <Muncul key={nama} tunda={k === 0 ? i * 0.15 : 0} dy={10}>
              <Emo x={x} y={110} e={e} s={s} />
              <text x={x} y="154" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                {nama}
              </text>
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <>
          <NeracaSvg x={78} y={96} s={0.5} miring={-1} kiri={<Emo x={0} y={-12} e="🍉" s={30} />} kanan={<Emo x={0} y={-10} e="🍎" s={24} />} />
          <NeracaSvg x={222} y={96} s={0.5} miring={-1} kiri={<Emo x={0} y={-10} e="🍎" s={26} />} kanan={<Emo x={0} y={-8} e="🍇" s={20} />} />
          <Label x={22} y={168} w={112} teks="semangka > apel" ukuran={12} />
          <Label x={166} y={168} w={112} teks="apel > anggur" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Lompat>
            <Emo x={46} y={66} e="⭐" s={24} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={10} y={166} w={106} teks="paling berat" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={244} y={78} e="⭐" s={24} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={186} y={166} w={108} teks="paling ringan" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Satuan tidak baku ------------------ */

const SATUAN4 = [
  { id: "balok", nama: "mainan balok" },
  { id: "kelereng", nama: "kelereng" },
  { id: "koin", nama: "koin" },
  { id: "bolaTenis", nama: "bola tenis" },
] as const;

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k <= 1 ? (
        <>
          {SATUAN4.map((s, i) => (
            <Muncul key={s.id} tunda={i * 0.15} dy={8}>
              <SatuanSvg id={s.id} x={42 + i * 72} y={100} s={44} />
              <text x={42 + i * 72} y="146" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                {s.nama}
              </text>
            </Muncul>
          ))}
          {k === 0 ? (
            <Muncul tunda={0.8}>
              <Label x={36} y={166} w={228} teks="benda kecil, ukurannya sama" ukuran={12} />
            </Muncul>
          ) : (
            <Sorot x={10} y={66} w={282} h={92} />
          )}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={66} y={196} nama="tika" s={1} angkat />
          <Lompat>
            <Emo x={134} y={130} e="🧸" s={44} />
          </Lompat>
          <Muncul tunda={0.3}>
            <SatuanSvg id="bolaTenis" x={190} y={156} s={34} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <NeracaSvg x={150} y={90} s={0.9} miring={-1} kiri={<Emo x={0} y={-16} e="🧸" s={34} />} kanan={<SatuanSvg id="bolaTenis" x={0} y={-12} s={22} />} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Satu, dua, tiga, empat ------------- */

const POS_TENIS: [number, number][] = [[-11, -12], [11, -12], [-11, -31], [11, -31]];

function A3_2({ k }: PropsAdegan) {
  const n = k + 1;
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <NeracaSvg
        x={150}
        y={92}
        s={0.95}
        miring={k < 3 ? -1 : 0}
        kiri={<Emo x={0} y={-17} e="🧸" s={36} />}
        kanan={
          <>
            {POS_TENIS.slice(0, n).map(([a, b], i) => (
              <SatuanSvg key={i} id="bolaTenis" x={a} y={b} s={19} />
            ))}
          </>
        }
      />
      {k === 3 ? <Sorot x={188} y={86} w={70} h={60} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Alat ukur yang berbeda ------------- */

const POS_KELERENG: [number, number][] = Array.from({ length: 10 }, (_, i) => [-22 + (i % 5) * 11, -9 - Math.floor(i / 5) * 12]);

function A3_3({ k }: PropsAdegan) {
  const kecil = (n: number) => (
    <>
      {POS_KELERENG.slice(0, n).map(([a, b], i) => (
        <SatuanSvg key={i} id="kelereng" x={a} y={b} s={10} />
      ))}
    </>
  );
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k <= 1 ? (
        <NeracaSvg x={150} y={92} s={0.95} miring={k === 0 ? -1 : 0} kiri={<Emo x={0} y={-17} e="🧸" s={36} />} kanan={kecil(k === 0 ? 4 : 10)} />
      ) : null}
      {k >= 2 ? (
        <>
          <NeracaSvg x={76} y={92} s={0.52} miring={0} kiri={<Emo x={0} y={-14} e="🧸" s={28} />} kanan={<>{POS_TENIS.map(([a, b], i) => <SatuanSvg key={i} id="bolaTenis" x={a} y={b} s={19} />)}</>} />
          <NeracaSvg x={224} y={92} s={0.52} miring={0} kiri={<Emo x={0} y={-14} e="🧸" s={28} />} kanan={kecil(10)} />
          <Muncul tunda={0.2}>
            <Label x={22} y={146} w={108} teks="4 bola tenis" ukuran={12} />
          </Muncul>
          <Muncul tunda={0.4}>
            <Label x={170} y={146} w={108} teks="10 kelereng" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.2}>
          <Label x={34} y={176} w={232} teks="alat ukur berbeda, hasil berbeda" ukuran={12} />
        </Muncul>
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

export const ADEGAN_VIDEO_K2B6A = SUB_A6.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 0 },
  { a: 0, k: 2 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K2B6A: VideoSiap[] = SUB_A6.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B6A[i], poster: POSTER[i] }));

export function VideoK2B6A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B6A} speakGuru={speakGuru} />;
}
