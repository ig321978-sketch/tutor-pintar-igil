"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { BIRU, buatAdegan, DaftarVideoCerita, Emo, Orang, type VideoSiap } from "./video-k3b1-umum";
import { SUB_G31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab G: Pembagian sampai 100. Tiga video,      */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.            */
/* Naskah satu sumber: naskah-k3b1.ts (SUB_G31.videos). Animasi SVG gratis di   */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab1-video-cerita.md              */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_G31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_G31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

const Biskuit = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r="8" fill="#D9A441" stroke={BIRU} strokeWidth="2" />
    <circle cx={x - 2.5} cy={y - 2} r="1.2" fill="#451A03" />
    <circle cx={x + 2.5} cy={y + 1.5} r="1.2" fill="#451A03" />
  </g>
);

const Manik = ({ x, y, i }: { x: number; y: number; i: number }) => <circle cx={x} cy={y} r="4.4" fill={["#F87171", "#60A5FA", "#FBBF24", "#4ADE80", "#C084FC"][i % 5]} stroke={BIRU} strokeWidth="1.5" />;

/* ------------------------- Video 1, adegan 1: Bagi biskuit ------------------------- */

function G1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <rect x="100" y="44" width="100" height="84" rx="14" fill="#E0F2FE" stroke={BIRU} strokeWidth="3" />
      <rect x="94" y="38" width="112" height="12" rx="5" fill="#BAE6FD" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <Biskuit key={i} x={118 + (i % 4) * 22} y={68 + Math.floor(i / 4) * 22} />
      ))}
      <Orang x={44} y={190} nama="lili" s={0.7} tampilNama={false} />
      {k >= 1 ? (
        <Muncul>
          <Orang x={234} y={190} nama="upe" s={0.62} tampilNama={false} />
          <Orang x={272} y={190} nama="halim" s={0.62} tampilNama={false} />
        </Muncul>
      ) : null}
      {k === 1 ? <Label x={100} y={140} w={100} teks="untuk 2 anak" ukuran={12} /> : null}
      {k === 2 ? (
        <Lompat>
          <Emo x={150} y={176} e="❓" s={40} />
        </Lompat>
      ) : null}
      {k === 3 ? <Besar x={150} y={176} teks="12 − 2 − 2 − ..." ukuran={21} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Kurangi berulang ------------------------- */

const LANGKAH_12 = ["12 − 2 = 10", "10 − 2 = 8", "8 − 2 = 6", "6 − 2 = 4", "4 − 2 = 2", "2 − 2 = 0"];

function G1_2({ k }: PropsAdegan) {
  const tampil = k === 0 ? 2 : k === 1 ? 4 : 6;
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {LANGKAH_12.slice(0, tampil).map((t, i) => (
        <Muncul key={t} tunda={0.05 * (i % 2)} dy={-6}>
          <Besar x={84 + (i % 2) * 136} y={78 + Math.floor(i / 2) * 42} teks={t} ukuran={19} warna={i % 2 ? "#DC2626" : "#1D4ED8"} />
        </Muncul>
      ))}
      {k === 3 ? <Besar x={150} y={200} teks="dikurangi 6 kali" ukuran={26} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Tulis pembagian ------------------------- */

function G1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Besar x={150} y={78} teks="12 − 2 − 2 − 2 − 2 − 2 − 2 = 0" ukuran={15} warna="#DC2626" />
      {k >= 1 ? <Label x={70} y={92} w={160} teks="disebut pembagian" ukuran={12} /> : null}
      {k >= 2 ? <Besar x={150} y={160} teks="12 : 2 = 6" ukuran={52} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={60} y={170} w={180} teks="dibaca: 12 dibagi 2" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Siapkan manik-manik ------------------------- */

const ORANG_KELOMPOK = [
  { x: 52, nama: "tika" },
  { x: 116, nama: "upe" },
  { x: 184, nama: "lili" },
  { x: 250, nama: "halim" },
] as const;

function G2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {ORANG_KELOMPOK.map((o) => (
        <Orang key={o.nama} x={o.x} y={190} nama={o.nama} s={0.62} tampilNama={false} />
      ))}
      {k >= 1 ? (
        <Muncul>
          <rect x="18" y="84" width="76" height="52" rx="12" fill="#E0F2FE" stroke={BIRU} strokeWidth="3" />
          {Array.from({ length: 15 }, (_, i) => (
            <Manik key={i} x={30 + (i % 5) * 13} y={98 + Math.floor(i / 5) * 14} i={i} />
          ))}
        </Muncul>
      ) : null}
      {k === 0 ? <Label x={60} y={44} w={180} teks="ketua dan 3 anggota" ukuran={12} /> : null}
      {k >= 2
        ? [1, 2, 3].map((n) => (
            <Muncul key={n} tunda={0.12 * n}>
              <Manik x={ORANG_KELOMPOK[n].x} y={108} i={n} />
            </Muncul>
          ))
        : null}
      {k === 3 ? <Label x={110} y={150} w={160} teks="terus sampai kosong" ukuran={12} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Hitung yang diperoleh ------------------------- */

function G2_2({ k }: PropsAdegan) {
  const putaran = k === 0 ? 1 : k === 1 ? 3 : 5;
  const sisa = 15 - putaran * 3;
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {ORANG_KELOMPOK.map((o) => (
        <Orang key={o.nama} x={o.x} y={190} nama={o.nama} s={0.62} tampilNama={false} />
      ))}
      <rect x="18" y="84" width="76" height="52" rx="12" fill="#E0F2FE" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: sisa }, (_, i) => (
        <Manik key={i} x={30 + (i % 5) * 13} y={98 + Math.floor(i / 5) * 14} i={i} />
      ))}
      {[1, 2, 3].map((n) =>
        Array.from({ length: putaran }, (_, j) => <Manik key={`${n}-${j}`} x={ORANG_KELOMPOK[n].x - 14 + (j % 3) * 11} y={128 - Math.floor(j / 3) * 11} i={j} />),
      )}
      <Besar x={56} y={72} teks={`sisa ${sisa}`} ukuran={20} warna="#DC2626" />
      {k === 3 ? <Besar x={190} y={76} teks="tiap anggota 5" ukuran={24} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Tulis pembagian ------------------------- */

function G2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Besar x={150} y={84} teks="15 − 3 − 3 − 3 − 3 − 3 = 0" ukuran={17} warna="#DC2626" />
      {k >= 1 ? <Besar x={150} y={152} teks="15 : 3 = 5" ukuran={52} warna="#16A34A" /> : null}
      {k === 2 ? <Label x={50} y={170} w={200} teks="ada bilangan 3 sebanyak 5" ukuran={13} /> : null}
      {k === 3 ? <Label x={50} y={170} w={200} teks="Aktivitas 5 = pembagian" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Dari pembagian ke perkalian ------------------------- */

function G3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? <Besar x={150} y={116} teks="15 : 3 = ?" ukuran={56} /> : null}
      {k === 1 ? <Besar x={150} y={100} teks="5 × 3" ukuran={56} warna="#1D4ED8" /> : null}
      {k === 1 ? <Label x={70} y={120} w={160} teks="3 sebanyak 5" ukuran={13} /> : null}
      {k === 2 ? <Besar x={150} y={84} teks="5 × 3" ukuran={42} warna="#1D4ED8" /> : null}
      {k === 2 ? <Besar x={150} y={150} teks="3+3+3+3+3" ukuran={34} warna="#DC2626" /> : null}
      {k === 3 ? <Besar x={150} y={124} teks="5 × 3 = 15" ukuran={56} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Saling berkaitan ------------------------- */

function G3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <Besar x={150} y={78} teks="15 : 3 = 5" ukuran={36} warna="#1D4ED8" />
      <Besar x={150} y={124} teks="5 × 3 = 15" ukuran={36} warna="#DC2626" />
      {k === 1 ? <Label x={20} y={146} w={260} teks="hasil bagi × pembagi = dibagi" ukuran={13} /> : null}
      {k === 2 ? <Label x={14} y={146} w={82} teks="dibagi 15" ukuran={11} /> : null}
      {k === 2 ? <Label x={109} y={146} w={82} teks="pembagi 3" ukuran={11} /> : null}
      {k === 2 ? <Label x={204} y={146} w={82} teks="hasil bagi 5" ukuran={11} /> : null}
      {k === 3 ? <Label x={40} y={152} w={220} teks="periksa dengan perkalian" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Contoh lain ------------------------- */

function G3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k <= 1 ? <Besar x={150} y={80} teks="28 : 7 = 4" ukuran={38} warna="#1D4ED8" /> : null}
      {k <= 1 ? <Besar x={150} y={108} teks="28 − 7 − 7 − 7 − 7 = 0" ukuran={17} /> : null}
      {k === 1 ? <Besar x={150} y={162} teks="4 × 7 = 28" ukuran={38} warna="#DC2626" /> : null}
      {k >= 2 ? <Besar x={150} y={86} teks="5 : 1 = 5" ukuran={38} warna="#1D4ED8" /> : null}
      {k >= 2 ? <Besar x={150} y={136} teks="6 : 6 = 1" ukuran={38} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={50} y={160} w={200} teks="saling menguatkan" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [G1_1, G1_2, G1_3],
  [G2_1, G2_2, G2_3],
  [G3_1, G3_2, G3_3],
];

export const ADEGAN_VIDEO_K3B1G = SUB_G31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 2, k: 2 },
  { a: 2, k: 1 },
  { a: 0, k: 3 },
];

export const VIDEO_SIAP_K3B1G: VideoSiap[] = SUB_G31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1G[i], poster: POSTER[i] }));

export function VideoK3B1G({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1G} speakGuru={speakGuru} />;
}
