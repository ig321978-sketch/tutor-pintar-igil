"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { BIRU, buatAdegan, DaftarVideoCerita, Emo, Orang, SusunSvg, TiangSvg, type VideoSiap } from "./video-k3b1-umum";
import { SUB_D31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab D: Penjumlahan sampai 100. Tiga video,    */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.            */
/* Naskah satu sumber: naskah-k3b1.ts (SUB_D31.videos). Animasi SVG gratis di   */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab1-video-cerita.md              */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_D31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_D31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

/** Tabel susun di kiri dan teks keterangan di kanan. */
const Samping = ({ a, b, tampil, sorot, baris }: { a: number; b: number; tampil?: { simpan?: boolean; satuan?: boolean; puluhan?: boolean }; sorot?: "p" | "s" | null; baris: string[] }) => (
  <>
    <SusunSvg x={8} y={40} a={a} b={b} tampil={tampil} sorot={sorot ?? null} />
    {baris.map((t, i) => (
      <Muncul key={t} tunda={0.1 * i} dx={10}>
        <Label x={190} y={62 + i * 38} w={104} teks={t} ukuran={t.length > 12 ? 10 : 12} />
      </Muncul>
    ))}
  </>
);

/* ------------------------- Video 1, adegan 1: Berapa semua buku ------------------------- */

function D1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <rect x="24" y="118" width="252" height="10" rx="3" fill="#8B5E34" stroke={BIRU} strokeWidth="3" />
      <rect x="24" y="74" width="252" height="10" rx="3" fill="#8B5E34" stroke={BIRU} strokeWidth="3" />
      {k === 0 ? (
        <>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Muncul key={`a${i}`} tunda={i * 0.08} dy={-6}>
              <rect x={34 + i * 14} y={46} width="11" height="28" rx="2" fill="#60A5FA" stroke={BIRU} strokeWidth="2" />
            </Muncul>
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <Muncul key={`b${i}`} tunda={0.6 + i * 0.08} dy={-6}>
              <rect x={150 + i * 14} y={46} width="11" height="28" rx="2" fill="#FBBF24" stroke={BIRU} strokeWidth="2" />
            </Muncul>
          ))}
          <Orang x={150} y={186} nama="halim" s={0.8} tampilNama={false} />
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <rect x="34" y="52" width="98" height="22" rx="4" fill="#60A5FA" stroke={BIRU} strokeWidth="2" />
          <rect x="150" y="52" width="84" height="22" rx="4" fill="#FBBF24" stroke={BIRU} strokeWidth="2" />
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Label x={34} y={140} w={110} teks="23 Matematika" ukuran={12} />
          <Label x={154} y={140} w={110} teks="16 Bahasa" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? <Besar x={150} y={168} teks="23 + 16" ukuran={44} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={160} e="❓" s={46} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Tabel nilai tempat ------------------------- */

function D1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Samping
        a={23}
        b={16}
        tampil={{ satuan: k >= 2, puluhan: k >= 3 }}
        sorot={k === 2 ? "s" : k === 3 ? "p" : null}
        baris={k === 0 ? ["23 dan 16"] : k === 1 ? ["23 = 2 puluhan", "16 = 1 puluhan"] : k === 2 ? ["3 + 6 = 9"] : ["2 + 1 = 3", "hasil 39"]}
      />
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Susun pendek ------------------------- */

function D1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Samping
        a={23}
        b={16}
        tampil={{ satuan: k >= 2, puluhan: k >= 3 }}
        sorot={k === 1 ? "s" : k === 2 ? "p" : null}
        baris={k === 0 ? ["susun lurus"] : k === 1 ? ["satuan: 3 + 6 = 9"] : k === 2 ? ["puluhan: 2 + 1 = 3"] : ["23 + 16 = 39", "39 buku"]}
      />
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Berapa jumlah siswa ------------------------- */

function D2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <TiangSvg x={150} y={186} tinggi={110} />
      {[50, 90, 210, 250].map((x, i) => (
        <Orang key={x} x={x} y={186} nama={(["upe", "tika", "lili", "kira"] as const)[i]} s={0.7} tampilNama={false} />
      ))}
      {k === 1 ? (
        <>
          <Label x={20} y={52} w={90} teks="48 laki-laki" ukuran={11} />
          <Label x={190} y={52} w={90} teks="16 perempuan" ukuran={11} />
        </>
      ) : null}
      {k === 2 ? (
        <Lompat>
          <Emo x={150} y={62} e="❓" s={40} />
        </Lompat>
      ) : null}
      {k === 3 ? <Besar x={150} y={80} teks="48 + 16" ukuran={44} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Menyimpan ------------------------- */

function D2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <Samping
        a={48}
        b={16}
        tampil={{ satuan: k >= 2, simpan: k >= 2 }}
        sorot={k <= 1 ? "s" : null}
        baris={k === 0 ? ["8 + 6 = 14"] : k === 1 ? ["14 = 1 puluhan", "+ 4 satuan"] : k === 2 ? ["tulis 4", "simpan 1"] : ["10 satuan", "jadi 1 puluhan"]}
      />
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Puluhan dan hasil ------------------------- */

function D2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Samping
        a={48}
        b={16}
        tampil={{ satuan: true, simpan: true, puluhan: k >= 2 }}
        sorot={k <= 1 ? "p" : null}
        baris={k === 0 ? ["puluhan:", "1 + 4 + 1"] : k === 1 ? ["= 6 puluhan"] : k === 2 ? ["48 + 16 = 64"] : ["64 siswa", "ikut upacara"]}
      />
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Uraikan bilangan ------------------------- */

function D3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? <Besar x={150} y={110} teks="54 + 29" ukuran={52} /> : null}
      {k >= 1 ? <Besar x={150} y={84} teks="54 = 50 + 4" ukuran={32} warna="#1D4ED8" /> : null}
      {k >= 2 ? <Besar x={150} y={130} teks="29 = 20 + 9" ukuran={32} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={30} y={156} w={240} teks="puluhan dengan puluhan" ukuran={12} /> : null}
      {k === 3 ? <Label x={30} y={186} w={240} teks="satuan dengan satuan" ukuran={12} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Jumlahkan kelompok ------------------------- */

function D3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k >= 0 ? <Besar x={150} y={76} teks="50 + 20 = 70" ukuran={32} warna="#1D4ED8" /> : null}
      {k >= 1 ? <Besar x={150} y={116} teks="4 + 9 = 13" ukuran={32} warna="#DC2626" /> : null}
      {k >= 2 ? <Besar x={150} y={154} teks="13 = 10 + 3" ukuran={30} /> : null}
      {k === 3 ? <Besar x={150} y={194} teks="70 + 10 + 3 = 83" ukuran={30} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Pilih cara yang mudah ------------------------- */

function D3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? <Emo x={150} y={112} e="🤔" s={64} /> : null}
      {k === 1 ? (
        <>
          <SusunSvg x={60} y={44} a={54} b={29} tampil={{ satuan: true, simpan: true, puluhan: true }} />
          <Label x={186} y={100} w={104} teks="susun pendek: cepat" ukuran={10} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Besar x={150} y={86} teks="54 = 50 + 4" ukuran={26} warna="#1D4ED8" />
          <Besar x={150} y={122} teks="29 = 20 + 9" ukuran={26} warna="#DC2626" />
          <Label x={50} y={140} w={200} teks="susun panjang: jelas" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? <Besar x={150} y={112} teks="hasil sama: 83" ukuran={42} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [D1_1, D1_2, D1_3],
  [D2_1, D2_2, D2_3],
  [D3_1, D3_2, D3_3],
];

export const ADEGAN_VIDEO_K3B1D = SUB_D31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 2, k: 3 },
  { a: 2, k: 2 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K3B1D: VideoSiap[] = SUB_D31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1D[i], poster: POSTER[i] }));

export function VideoK3B1D({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1D} speakGuru={speakGuru} />;
}
