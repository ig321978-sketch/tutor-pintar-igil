"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { BaganSvg, Besar, buatAdegan, DaftarVideoCerita, Emo, Kelereng, Orang, TabelSvg, type VideoSiap } from "./video-k3b2-umum";
import { SUB_A32 } from "./naskah-k3b2";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 2 Sub-Bab A: Kalimat Matematika Penjumlahan. Tiga     */
/* video, sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.      */
/* Naskah satu sumber: naskah-k3b2.ts (SUB_A32.videos). Animasi SVG gratis di    */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab2-video-cerita.md               */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A32.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A32.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Kelereng Galih ------------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Orang x={44} y={190} nama="halim" s={0.75} tampilNama={false} />
      <rect x="92" y="58" width="124" height="74" rx="14" fill="#FEF3C7" stroke="#1C01A5" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <Kelereng key={i} x={110 + (i % 4) * 28} y={78 + Math.floor(i / 4) * 22} i={i} redup={k === 1} />
      ))}
      {k === 1 ? (
        <Lompat>
          <Emo x={154} y={112} e="❓" s={44} />
        </Lompat>
      ) : null}
      {k === 2 ? (
        <Muncul>
          {[0, 1, 2, 3, 4].map((i) => (
            <Kelereng key={i} x={236 + (i % 2) * 20} y={74 + Math.floor(i / 2) * 22} i={i + 2} />
          ))}
        </Muncul>
      ) : null}
      {k === 2 ? <Label x={216} y={140} w={78} teks="beli 5 lagi" ukuran={11} /> : null}
      {k === 3 ? <Besar x={150} y={176} teks="jumlah 17 butir" ukuran={28} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Berapa di rumah ------------------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? <Besar x={150} y={124} teks="?" ukuran={90} warna="#B45309" /> : null}
      {k === 1 ? <Besar x={150} y={124} teks="…" ukuran={90} warna="#B45309" /> : null}
      {k === 2 ? <Besar x={150} y={120} teks="… + 5 = 17" ukuran={50} /> : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={84} teks="… + 5 = 17" ukuran={38} />
          <Lompat>
            <Emo x={150} y={158} e="❓" s={46} />
          </Lompat>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Kalimat Matematika ------------------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Besar x={150} y={110} teks="… + 5 = 17" ukuran={52} />
      {k === 0 ? <Label x={60} y={140} w={180} teks="kalimat Matematika" ukuran={13} /> : null}
      {k >= 1 ? <Sorot x={52} y={66} w={52} h={56} /> : null}
      {k === 1 ? <Label x={40} y={140} w={220} teks="… belum diketahui, kita cari" ukuran={12} /> : null}
      {k === 2 ? <Emo x={150} y={172} e="📖" s={40} /> : null}
      {k === 3 ? <Label x={50} y={150} w={200} teks="mulai dari tabel kelereng" ukuran={12} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Jumlah 50 butir ------------------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Orang x={50} y={190} nama="halim" s={0.75} tampilNama={false} />
      <Orang x={250} y={190} nama="kira" s={0.75} tampilNama={false} />
      {k >= 1 ? (
        <Muncul>
          <rect x="100" y="60" width="100" height="70" rx="14" fill="#FEF3C7" stroke="#1C01A5" strokeWidth="3" />
          {Array.from({ length: 15 }, (_, i) => (
            <Kelereng key={i} x={116 + (i % 5) * 17} y={76 + Math.floor(i / 5) * 20} i={i} />
          ))}
        </Muncul>
      ) : null}
      {k === 0 ? <Label x={90} y={80} w={120} teks="Galih dan Andi" ukuran={13} /> : null}
      {k === 1 ? <Label x={90} y={142} w={120} teks="digabung 50 butir" ukuran={12} /> : null}
      {k === 2 ? <Label x={16} y={112} w={80} teks="Galih 30" ukuran={13} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={250} y={110} e="❓" s={40} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Tulis kalimatnya ------------------------- */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <TabelSvg x={20} y={44} kepala={["Galih", "Andi", "Jumlah"]} baris={[["30", k >= 3 ? "20" : "…", "50"]]} />
      {k >= 1 ? (
        <Muncul>
          <Besar x={150} y={142} teks="30 + … = 50" ukuran={42} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul>
          <Besar x={150} y={186} teks="30 + 20 = 50" ukuran={30} warna="#16A34A" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Bagan jumlah ------------------------- */

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <BaganSvg x={30} y={48} w={240} total={50} a={30} b={20} hilang={k >= 3 ? null : 2} nama="jumlah" />
      {k === 1 ? <Label x={50} y={134} w={200} teks="jumlah dikurangi bagian" ukuran={13} /> : null}
      {k >= 2 ? <Besar x={150} y={158} teks="50 − 30 = 20" ukuran={40} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={70} y={170} w={160} teks="Andi 20 butir" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 3: tiga contoh ------------------------- */

function Contoh({ k, teks, x, y, z, hilang, hitung, periksa }: { k: number; teks: string; x: number; y: number; z: number; hilang: 1 | 2; hitung: string; periksa: string }) {
  return (
    <>
      {k === 0 ? <Besar x={150} y={116} teks={teks} ukuran={54} /> : null}
      {k >= 1 ? <Besar x={150} y={74} teks={teks} ukuran={32} /> : null}
      {k >= 1 ? <BaganSvg x={34} y={88} w={232} total={z} a={x} b={y} hilang={k >= 3 ? null : hilang} nama="jumlah" /> : null}
      {k === 2 ? <Besar x={150} y={186} teks={hitung} ukuran={32} warna="#DC2626" /> : null}
      {k === 3 ? <Besar x={150} y={186} teks={periksa} ukuran={32} warna="#16A34A" /> : null}
    </>
  );
}

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Contoh k={k} teks="8 + … = 19" x={8} y={11} z={19} hilang={2} hitung="19 − 8 = 11" periksa="8 + 11 = 19" />
    </>
  );
}

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <Contoh k={k} teks="23 + … = 45" x={23} y={22} z={45} hilang={2} hitung="45 − 23 = 22" periksa="23 + 22 = 45" />
    </>
  );
}

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <Contoh k={k} teks="… + 16 = 54" x={38} y={16} z={54} hilang={1} hitung="54 − 16 = 38" periksa="38 + 16 = 54" />
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [A1_1, A1_2, A1_3],
  [A2_1, A2_2, A2_3],
  [A3_1, A3_2, A3_3],
];

export const ADEGAN_VIDEO_K3B2A = SUB_A32.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 2 },
  { a: 2, k: 3 },
  { a: 0, k: 3 },
];

export const VIDEO_SIAP_K3B2A: VideoSiap[] = SUB_A32.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B2A[i], poster: POSTER[i] }));

export function VideoK3B2A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B2A} speakGuru={speakGuru} />;
}
