"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { BaganSvg, Besar, buatAdegan, DaftarVideoCerita, Emo, Orang, Permen, TabelSvg, type VideoSiap } from "./video-k3b2-umum";
import { SUB_B32 } from "./naskah-k3b2";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 2 Sub-Bab B: Kalimat Matematika Pengurangan. Tiga     */
/* video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.      */
/* Naskah satu sumber: naskah-k3b2.ts (SUB_B32.videos). Animasi SVG gratis di    */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab2-video-cerita.md               */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B32.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B32.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Dua anak membawa permen ------------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Orang x={60} y={190} nama="lili" s={0.8} tampilNama={false} />
      <Orang x={240} y={190} nama="upe" s={0.8} tampilNama={false} />
      {k >= 1 ? (
        <Muncul>
          {[0, 1, 2].map((i) => (
            <Permen key={i} x={42 + i * 24} y={96} i={i} />
          ))}
          <rect x="196" y="80" width="82" height="34" rx="10" fill="#FFF7CC" stroke="#F0AB00" strokeWidth="3" strokeDasharray="6 4" />
          <text x="237" y="105" textAnchor="middle" fontSize="22" fontWeight="900" fill="#B45309">
            ?
          </text>
        </Muncul>
      ) : null}
      {k === 0 ? <Label x={90} y={72} w={120} teks="dua anak, permen" ukuran={12} /> : null}
      {k === 2 ? <Label x={90} y={132} w={120} teks="selisih diketahui" ukuran={12} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={120} e="❓" s={44} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Tabel permen ------------------------- */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <TabelSvg x={20} y={42} kepala={["Pertama", "Kedua", "Selisih"]} baris={k >= 2 ? [["3", "…", "1"], ["…", "6", "3"]] : [["3", "…", "1"]]} />
      {k === 1 ? <Besar x={150} y={150} teks="3 − … = 1" ukuran={46} /> : null}
      {k === 2 ? <Besar x={150} y={168} teks="… − 6 = 3" ukuran={46} /> : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={150} teks="3 − … = 1" ukuran={28} />
          <Label x={50} y={164} w={200} teks="kalimat Matematika" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Cara mencari ------------------------- */

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Besar x={150} y={70} teks="3 − … = 1" ukuran={28} />
      {k >= 0 ? <Besar x={78} y={112} teks="3 − 1 = 2" ukuran={26} warna="#DC2626" /> : null}
      {k >= 1 ? <Besar x={222} y={112} teks="3 − 2 = 1" ukuran={26} warna="#16A34A" /> : null}
      {k >= 2 ? <Besar x={150} y={142} teks="… − 6 = 3" ukuran={28} /> : null}
      {k >= 2 ? <Besar x={78} y={184} teks="3 + 6 = 9" ukuran={26} warna="#DC2626" /> : null}
      {k >= 3 ? <Besar x={222} y={184} teks="9 − 6 = 3" ukuran={26} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Ayam dijual ------------------------- */

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Orang x={50} y={190} nama="paman" s={0.75} tampilNama={false} />
      <rect x="100" y="56" width="140" height="78" rx="12" fill="#FEF3C7" stroke="#1C01A5" strokeWidth="3" />
      {[0, 1, 2].map((i) => (
        <Emo key={i} x={128 + i * 40} y={96} e="🐔" s={34} />
      ))}
      {k === 0 ? <Label x={110} y={142} w={120} teks="kandang Pak Slamet" ukuran={11} /> : null}
      {k === 1 ? <Label x={110} y={142} w={120} teks="80 ekor ayam" ukuran={13} /> : null}
      {k === 2 ? <Label x={100} y={142} w={140} teks="sisa 45 ekor" ukuran={13} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={178} e="❓" s={42} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Kalimatnya ------------------------- */

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <TabelSvg x={20} y={44} kepala={["Mula-mula", "Dijual", "Sisa"]} baris={[["80", k >= 3 ? "35" : "…", "45"]]} />
      {k >= 1 ? (
        <Muncul>
          <Besar x={150} y={142} teks="80 − … = 45" ukuran={42} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul>
          <Besar x={150} y={186} teks="80 − 35 = 45" ukuran={30} warna="#16A34A" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Bagan ------------------------- */

function B2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <BaganSvg x={30} y={48} w={240} total={80} a={35} b={45} hilang={k >= 3 ? null : 1} nama="awal" />
      {k === 1 ? <Label x={50} y={134} w={200} teks="awal dikurangi sisa" ukuran={13} /> : null}
      {k >= 2 ? <Besar x={150} y={158} teks="80 − 45 = 35" ukuran={40} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={60} y={170} w={180} teks="dijual 35 ekor" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Dijual 45 ekor ------------------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Orang x={50} y={190} nama="paman" s={0.75} tampilNama={false} />
      <rect x="100" y="56" width="140" height="78" rx="12" fill="#FEF3C7" stroke="#1C01A5" strokeWidth="3" />
      {[0, 1].map((i) => (
        <Emo key={i} x={134 + i * 56} y={96} e="🐔" s={34} />
      ))}
      {k === 0 ? <Label x={100} y={142} w={140} teks="dijual 45 ekor" ukuran={13} /> : null}
      {k === 1 ? <Label x={100} y={142} w={140} teks="sisa 27 ekor" ukuran={13} /> : null}
      {k === 2 ? <Label x={90} y={142} w={160} teks="mula-mula belum diketahui" ukuran={11} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={178} e="❓" s={42} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Kalimatnya ------------------------- */

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <TabelSvg x={20} y={44} kepala={["Mula-mula", "Dijual", "Sisa"]} baris={[[k >= 3 ? "72" : "…", "45", "27"]]} />
      {k >= 1 ? (
        <Muncul>
          <Besar x={150} y={142} teks="… − 45 = 27" ukuran={42} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul>
          <Besar x={150} y={186} teks="72 − 45 = 27" ukuran={30} warna="#16A34A" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Bagan ------------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <BaganSvg x={30} y={48} w={240} total={72} a={45} b={27} hilang={k >= 3 ? null : 0} nama="awal" />
      {k === 1 ? <Label x={50} y={134} w={200} teks="dijual ditambah sisa" ukuran={13} /> : null}
      {k >= 2 ? <Besar x={150} y={158} teks="45 + 27 = 72" ukuran={40} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={60} y={170} w={180} teks="mula-mula 72 ekor" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [B1_1, B1_2, B1_3],
  [B2_1, B2_2, B2_3],
  [B3_1, B3_2, B3_3],
];

export const ADEGAN_VIDEO_K3B2B = SUB_B32.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 2, k: 3 },
  { a: 2, k: 3 },
];

export const VIDEO_SIAP_K3B2B: VideoSiap[] = SUB_B32.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B2B[i], poster: POSTER[i] }));

export function VideoK3B2B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B2B} speakGuru={speakGuru} />;
}
