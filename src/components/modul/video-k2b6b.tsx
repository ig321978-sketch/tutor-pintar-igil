"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Angka, BatangWaktu, buatAdegan, BIRU, DaftarVideoCerita, Dinding, Emo, JamSvg, LangitHari, Obj, Orang, Panah, type VideoSiap } from "./video-k2b6-umum";
import { SUB_B6 } from "./naskah-k2b6";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 6 Sub-Bab B: Waktu. Tiga video, sembilan adegan.    */
/* Diputar satu per satu saat siswa mengetuk Putar. Naskah satu sumber:         */
/* naskah-k2b6.ts (SUB_B6.videos). Animasi SVG gratis di perangkat. Tanpa API.   */
/* Naskah: naskah/mtk-2-bab6-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B6.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B6.videos[v].adegan[a];

/** Satu baris batang lama kegiatan dengan nama di kiri dan lamanya di kanan batang. */
function BarisLama({ y, nama, lebar, lama, warna, e }: { y: number; nama: string; lebar: number; lama: string; warna: string; e?: string }) {
  return (
    <Muncul dy={8}>
      {e ? <Emo x={22} y={y + 9} e={e} s={24} /> : null}
      <text x={e ? 40 : 12} y={y - 5} fontSize="11" fontWeight="900" fill={BIRU}>
        {nama}
      </text>
      <BatangWaktu x={e ? 40 : 12} y={y} w={lebar} warna={warna} teks={lama} />
    </Muncul>
  );
}

/* ------------------------- Video 1, adegan 1: Bagian-bagian jam ------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Dinding />
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <Muncul skala={0.3}>
          <JamSvg x={84} y={40} w={132} jam={5} />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <>
          <JamSvg x={8} y={46} w={130} jam={5} />
          {["jarum pendek", "jarum panjang", "angka 1 sampai 12"].map((t, i) => (
            <Muncul key={t} tunda={i * 0.3} dx={20}>
              <Label x={146} y={58 + i * 42} w={146} teks={t} ukuran={13} />
              <circle cx="154" cy={71 + i * 42} r="5" fill={["#1C01A5", "#E11D48", "#F0AB00"][i]} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <JamSvg x={10} y={52} w={112} jam={5} />
          <Muncul tunda={0.3}>
            <Panah x1={126} y1={108} x2={160} y2={108} />
          </Muncul>
          <Muncul tunda={0.6} skala={0.4}>
            <rect x="166" y="78" width="124" height="60" rx="10" fill="#111827" stroke={BIRU} strokeWidth="3" />
            <text x="228" y="119" textAnchor="middle" fontSize="34" fontWeight="900" fill="#FFE566" fontFamily="monospace">
              05.00
            </text>
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Pukul lima tepat -------------------- */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Dinding />
      <Papan teks={papan(0, 1)[k]} />
      {k <= 1 ? (
        <>
          <JamSvg x={16} y={44} w={134} jam={5} tonjol={k === 0 ? "pendek" : "panjang"} />
          <Muncul key={k} tunda={0.2} dx={20}>
            <Label x={160} y={88} w={132} teks={k === 0 ? "pendek: jam" : "panjang: menit"} ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <JamSvg x={14} y={46} w={130} jam={5} />
          <Muncul tunda={0.2}>
            <Angka x={190} y={84} teks="5" r={18} isi="#BFDBFE" />
            <text x="216" y="90" fontSize="12" fontWeight="900" fill={BIRU}>
              pendek
            </text>
          </Muncul>
          <Muncul tunda={0.5}>
            <Angka x={190} y={132} teks="12" r={18} isi="#FECACA" />
            <text x="216" y="138" fontSize="12" fontWeight="900" fill={BIRU}>
              panjang
            </text>
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul dy={8}>
            <Obj id="tempatTidur" x={14} y={118} w={104} h={55} />
          </Muncul>
          <Lompat>
            <Orang x={166} y={196} nama="halim" s={1} angkat />
          </Lompat>
          <JamSvg x={206} y={44} w={82} jam={5} />
          <Muncul tunda={0.4}>
            <Label x={196} y={134} w={96} teks="pukul 5" ukuran={13} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Membaca pukul tepat ----------------- */

function B1_3({ k }: PropsAdegan) {
  const jam = [6, 6, 7, 12][k];
  return (
    <>
      <Dinding />
      <Papan teks={papan(0, 2)[k]} />
      <JamSvg x={22} y={44} w={132} jam={jam} tonjol={k === 0 ? "panjang" : undefined} />
      <Muncul key={k} skala={0.3}>
        <Angka x={228} y={96} teks={k === 0 ? "12" : String(jam)} r={34} isi={k === 0 ? "#FECACA" : "#FFE566"} />
      </Muncul>
      <Muncul key={`l${k}`} tunda={0.2}>
        <Label x={176} y={142} w={104} teks={k === 0 ? "jarum panjang" : `pukul ${jam}`} ukuran={13} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Pagi hari --------------------------- */

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      {k === 0 ? <Dinding /> : <LangitHari fase="pagi" />}
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <Obj id="meja" x={30} y={100} w={90} h={69} />
          <Muncul tunda={0.2}>
            <Emo x={76} y={96} e="🍳" s={30} />
          </Muncul>
          <Lompat>
            <Orang x={166} y={196} nama="tika" s={1} angkat />
          </Lompat>
          <JamSvg x={206} y={44} w={78} jam={6} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Emo x={74} y={118} e="🏫" s={78} />
          <Orang x={156} y={196} nama="tika" s={0.8} tampilNama={false} />
          <Orang x={196} y={196} nama="lili" s={0.8} tampilNama={false} />
          <Orang x={236} y={196} nama="upe" s={0.8} tampilNama={false} />
          <JamSvg x={190} y={40} w={70} jam={7} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={70} y={196} nama="tika" s={0.95} />
          <Muncul tunda={0.3}>
            <Panah x1={190} y1={96} x2={190} y2={118} warna="#EA580C" />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Siang dan sore ---------------------- */

function B2_2({ k }: PropsAdegan) {
  const fase = k === 1 ? "siang" : k >= 2 ? "sore" : null;
  return (
    <>
      {fase ? <LangitHari fase={fase} /> : <Dinding />}
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <rect x="18" y="66" width="150" height="92" rx="8" fill="#FDE68A" stroke={BIRU} strokeWidth="3" />
          <rect x="30" y="76" width="126" height="22" rx="6" fill="#16A34A" stroke={BIRU} strokeWidth="2.4" />
          <text x="93" y="92" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF">
            KANTIN SEHAT
          </text>
          <Emo x={64} y={130} e="🍱" s={30} />
          <Emo x={118} y={130} e="🥗" s={30} />
          <Lompat>
            <Orang x={216} y={196} nama="tika" s={0.9} angkat />
          </Lompat>
          <JamSvg x={196} y={40} w={72} jam={12} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Orang x={80} y={196} nama="tika" s={0.85} tampilNama={false} />
          <Orang x={220} y={196} nama="lili" s={0.85} tampilNama={false} />
          <Muncul tunda={0.3}>
            <Label x={74} y={96} w={152} teks="matahari paling tinggi" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <Lompat>
            <Orang x={140} y={196} nama="tika" s={0.9} angkat />
          </Lompat>
          <Orang x={200} y={196} nama="upe" s={0.62} tampilNama={false} />
          <Muncul tunda={0.3}>
            <Emo x={236} y={178} e="⚽" s={22} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? <JamSvg x={206} y={40} w={64} jam={4} /> : null}
      {k === 3 ? (
        <>
          <Muncul tunda={0.2}>
            <Panah x1={64} y1={78} x2={64} y2={104} warna="#EA580C" />
          </Muncul>
          <Muncul tunda={0.5}>
            <Label x={110} y={60} w={160} teks="matahari mulai turun" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Malam hari -------------------------- */

const EMPAT = [
  { e: "🌅", t: "pagi", w: "#FEF3C7" },
  { e: "☀️", t: "siang", w: "#BAE6FD" },
  { e: "🌇", t: "sore", w: "#FDBA74" },
  { e: "🌙", t: "malam", w: "#C7D2FE" },
];

function B2_3({ k }: PropsAdegan) {
  return (
    <>
      {k === 0 ? <Dinding /> : k === 1 ? <LangitHari fase="malam" /> : <Dinding />}
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Obj id="tempatTidur" x={30} y={112} w={130} h={68} />
          <Lompat>
            <Emo x={96} y={110} e="😴" s={34} />
          </Lompat>
          <JamSvg x={196} y={44} w={82} jam={9} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Emo x={84} y={140} e="🏠" s={50} />
          <Muncul tunda={0.3}>
            <Emo x={196} y={140} e="😴" s={40} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          {EMPAT.map((q, i) => (
            <Muncul key={q.t} tunda={i * 0.25} dy={10}>
              <rect x={10 + i * 72} y="50" width="64" height="92" rx="12" fill={q.w} stroke={BIRU} strokeWidth="3" />
              <Emo x={42 + i * 72} y={88} e={q.e} s={34} />
              <text x={42 + i * 72} y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
                {q.t}
              </text>
            </Muncul>
          ))}
          <Muncul tunda={1.1}>
            <Label x={62} y={158} w={176} teks="satu hari" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <JamSvg x={20} y={44} w={120} jam={9} />
          <Lompat>
            <Emo x={216} y={96} e="✅" s={56} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={160} y={140} w={130} teks="waktu yang tepat" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Kira berolahraga -------------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      {k === 1 ? null : <Dinding />}
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <rect x="108" y="44" width="100" height="100" rx="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
          <rect x="108" y="44" width="100" height="26" rx="8" fill="#E53E3E" stroke={BIRU} strokeWidth="3" />
          <text x="158" y="63" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FFFFFF">
            MINGGU
          </text>
          <Muncul tunda={0.3}>
            <Emo x={158} y={104} e="🌤️" s={44} />
          </Muncul>
          <Orang x={64} y={196} nama="kira" s={1} angkat />
          <Muncul tunda={0.5}>
            <Emo x={246} y={110} e="👟" s={40} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Obj id="pohon" x={14} y={72} w={60} h={95} />
          <Obj id="pohon" x={236} y={72} w={60} h={95} />
          <ellipse cx="150" cy="190" rx="116" ry="9" fill="none" stroke="#A8672D" strokeWidth="3" strokeDasharray="8 6" />
          <Lompat>
            <Orang x={150} y={186} nama="kira" s={1} angkat />
          </Lompat>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <JamSvg x={26} y={58} w={96} jam={6} />
          <Muncul tunda={0.2}>
            <Panah x1={126} y1={106} x2={172} y2={106} />
          </Muncul>
          <Muncul tunda={0.5}>
            <JamSvg x={178} y={58} w={96} jam={7} />
          </Muncul>
          <Label x={44} y={160} w={96} teks="pukul 6" ukuran={13} />
          <Label x={160} y={160} w={96} teks="pukul 7" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={150} y={98} e="🚿" s={70} />
          </Lompat>
          {[[96, 70], [210, 80], [120, 134], [190, 130]].map(([a, b], i) => (
            <Muncul key={i} tunda={0.2 + i * 0.15}>
              <Emo x={a} y={b} e="✨" s={20} />
            </Muncul>
          ))}
          <Muncul tunda={0.5}>
            <Label x={80} y={162} w={140} teks="badan segar kembali" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Lebih lama atau lebih sebentar ------ */

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Dinding />
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Lompat>
            <Emo x={150} y={94} e="❓" s={64} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={50} y={150} w={200} teks="olahraga atau mandi?" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <BarisLama y={70} nama="berolahraga" lebar={168} lama="1 jam" warna="#7FCB96" e="🏃" />
          <BarisLama y={150} nama="mandi" lebar={46} lama="15 menit" warna="#FDBA74" e="🚿" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Sorot x={34} y={60} w={186} h={40} />
          <Muncul tunda={0.2}>
            <Label x={88} y={106} w={124} teks="lebih lama" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Sorot x={34} y={142} w={64} h={38} />
          <Muncul tunda={0.2}>
            <Label x={84} y={178} w={140} teks="lebih sebentar" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Membandingkan waktu ----------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Dinding />
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Lompat>
            <Emo x={150} y={94} e="⏳" s={70} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={60} y={148} w={180} teks="bandingkan waktu" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul dx={-20}>
            <Emo x={80} y={92} e="🐢" s={50} />
            <Label x={22} y={124} w={116} teks="lebih lama" ukuran={14} />
          </Muncul>
          <Muncul dx={20} tunda={0.4}>
            <Emo x={220} y={92} e="⚡" s={50} />
            <Label x={162} y={124} w={116} teks="lebih sebentar" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <BarisLama y={84} nama="tidur malam" lebar={170} lama="8 jam" warna="#A5B4FC" e="😴" />
          <BarisLama y={146} nama="menyikat gigi" lebar={18} lama="3 menit" warna="#FDBA74" e="🦷" />
          <Muncul tunda={0.5}>
            <Label x={52} y={170} w={196} teks="tidur lebih lama" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <BarisLama y={84} nama="bermain bola" lebar={140} lama="1 jam" warna="#7FCB96" e="⚽" />
          <BarisLama y={146} nama="mencuci tangan" lebar={12} lama="1 menit" warna="#FDBA74" e="🧼" />
          <Muncul tunda={0.5}>
            <Label x={36} y={170} w={228} teks="mencuci tangan lebih sebentar" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [B1_1, B1_2, B1_3],
  [B2_1, B2_2, B2_3],
  [B3_1, B3_2, B3_3],
];

export const ADEGAN_VIDEO_K2B6B = SUB_B6.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 0, k: 1 },
  { a: 1, k: 2 },
];

export const VIDEO_SIAP_K2B6B: VideoSiap[] = SUB_B6.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B6B[i], poster: POSTER[i] }));

export function VideoK2B6B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B6B} speakGuru={speakGuru} />;
}
