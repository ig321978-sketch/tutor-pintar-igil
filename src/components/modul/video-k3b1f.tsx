"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { BIRU, buatAdegan, DaftarVideoCerita, Emo, type VideoSiap } from "./video-k3b1-umum";
import { SUB_F31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab F: Perkalian sampai 100. Tiga video,      */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.            */
/* Naskah satu sumber: naskah-k3b1.ts (SUB_F31.videos). Animasi SVG gratis di   */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab1-video-cerita.md              */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_F31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_F31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

/** Satu piring: persegi panjang bundar tempat isi kelompok. (x, y) kiri atas. */
const Piring = ({ x, y, w, h, tunda = 0, children }: { x: number; y: number; w: number; h: number; tunda?: number; children: React.ReactNode }) => (
  <Muncul tunda={tunda} dy={-6}>
    <rect x={x} y={y} width={w} height={h} rx="11" fill="#FEF3C7" stroke={BIRU} strokeWidth="3" />
    {children}
  </Muncul>
);

const Pensil = ({ x, y, warna }: { x: number; y: number; warna: string }) => (
  <g>
    <rect x={x} y={y + 5} width="7" height="24" rx="1.5" fill={warna} stroke={BIRU} strokeWidth="1.6" />
    <polygon points={`${x},${y + 5} ${x + 7},${y + 5} ${x + 3.5},${y - 1}`} fill="#F5D0A9" stroke={BIRU} strokeWidth="1.4" strokeLinejoin="round" />
  </g>
);

const Bunga = ({ x, y }: { x: number; y: number }) => (
  <g>
    {[0, 72, 144, 216, 288].map((d) => (
      <circle key={d} cx={x + 4.6 * Math.cos((d * Math.PI) / 180)} cy={y + 4.6 * Math.sin((d * Math.PI) / 180)} r="3.2" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
    ))}
    <circle cx={x} cy={y} r="2.4" fill="#FBBF24" stroke={BIRU} strokeWidth="1" />
  </g>
);

const Mobil = ({ x, y, warna }: { x: number; y: number; warna: string }) => (
  <g>
    <rect x={x} y={y} width="18" height="8" rx="3" fill={warna} stroke={BIRU} strokeWidth="1.5" />
    <circle cx={x + 4.5} cy={y + 9} r="2.4" fill={BIRU} />
    <circle cx={x + 13.5} cy={y + 9} r="2.4" fill={BIRU} />
  </g>
);

const Gelas = ({ x, y, lebar = 40, tunda = 0, children }: { x: number; y: number; lebar?: number; tunda?: number; children?: React.ReactNode }) => (
  <Muncul tunda={tunda} dy={-6}>
    <polygon points={`${x},${y} ${x + lebar},${y} ${x + lebar - 5},${y + 42} ${x + 5},${y + 42}`} fill="#E0F2FE" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
    {children}
  </Muncul>
);

const Kerikil = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r="4" fill="#9CA3AF" stroke={BIRU} strokeWidth="1.6" />;

/* ------------------------- Video 1, adegan 1: Lima kelompok pensil ------------------------- */

function F1_1({ k }: PropsAdegan) {
  const warna = ["#F87171", "#60A5FA", "#4ADE80", "#FBBF24", "#C084FC"];
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {Array.from({ length: 5 }, (_, i) => (
        <Piring key={i} x={14 + i * 56} y={64} w={46} h={50} tunda={i * 0.1}>
          <Pensil x={14 + i * 56 + 12} y={74} warna={warna[i]} />
          <Pensil x={14 + i * 56 + 28} y={74} warna={warna[(i + 2) % 5]} />
        </Piring>
      ))}
      {k === 0 ? <Label x={60} y={140} w={180} teks="5 kelompok, tiap kelompok 2" ukuran={11} /> : null}
      {k === 1 ? <Besar x={150} y={168} teks="2+2+2+2+2" ukuran={34} warna="#DC2626" /> : null}
      {k === 2 ? <Besar x={150} y={172} teks="5 × 2" ukuran={50} /> : null}
      {k === 3 ? <Besar x={150} y={172} teks="5 × 2 = 10" ukuran={42} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Empat kelompok melati ------------------------- */

function F1_2({ k }: PropsAdegan) {
  const pos: [number, number][] = [[14, 14], [28, 14], [42, 14], [21, 32], [35, 32]];
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {Array.from({ length: 4 }, (_, i) => (
        <Piring key={i} x={14 + i * 70} y={62} w={56} h={52} tunda={i * 0.12}>
          {pos.map(([dx, dy], j) => (
            <Bunga key={j} x={14 + i * 70 + dx} y={62 + dy + 4} />
          ))}
        </Piring>
      ))}
      {k === 0 ? <Label x={60} y={140} w={180} teks="4 kelompok, tiap kelompok 5" ukuran={11} /> : null}
      {k === 1 ? <Besar x={150} y={172} teks="4 × 5" ukuran={50} /> : null}
      {k === 2 ? <Besar x={150} y={168} teks="5+5+5+5" ukuran={38} warna="#DC2626" /> : null}
      {k === 3 ? <Besar x={150} y={172} teks="4 × 5 = 20" ukuran={42} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Membaca perkalian ------------------------- */

function F1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Besar x={96} y={112} teks="4" ukuran={74} warna="#1D4ED8" />
      <Besar x={150} y={108} teks="×" ukuran={50} />
      <Besar x={204} y={112} teks="5" ukuran={74} warna="#DC2626" />
      {k === 0 ? <Label x={30} y={130} w={132} teks="banyak kelompok" ukuran={12} /> : null}
      {k === 1 ? <Label x={146} y={130} w={132} teks="isi tiap kelompok" ukuran={12} /> : null}
      {k === 2 ? <Besar x={150} y={176} teks="5+5+5+5" ukuran={38} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={20} y={150} w={260} teks="kelompok × isi = jumlah" ukuran={14} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Lima kelompok mobil ------------------------- */

function F2_1({ k }: PropsAdegan) {
  const warna = ["#F87171", "#60A5FA", "#4ADE80", "#FBBF24", "#C084FC", "#FB923C"];
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {Array.from({ length: 5 }, (_, i) => (
        <Piring key={i} x={12 + i * 57} y={60} w={50} h={62} tunda={i * 0.1}>
          {Array.from({ length: 6 }, (_, j) => (
            <Mobil key={j} x={12 + i * 57 + 4 + (j % 2) * 22} y={60 + 5 + Math.floor(j / 2) * 18} warna={warna[j]} />
          ))}
        </Piring>
      ))}
      {k === 0 ? <Label x={60} y={146} w={180} teks="5 kelompok mobil" ukuran={12} /> : null}
      {k === 1 ? <Label x={60} y={146} w={180} teks="tiap kelompok 6 mobil" ukuran={12} /> : null}
      {k === 2 ? <Besar x={150} y={172} teks="6+6+6+6+6 = 30" ukuran={26} warna="#DC2626" /> : null}
      {k === 3 ? <Besar x={150} y={174} teks="5 × 6 = 30" ukuran={42} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Enam kelompok mobil ------------------------- */

function F2_2({ k }: PropsAdegan) {
  const warna = ["#F87171", "#60A5FA", "#4ADE80", "#FBBF24", "#C084FC"];
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {Array.from({ length: 6 }, (_, i) => (
        <Piring key={i} x={10 + i * 47} y={54} w={40} h={72} tunda={i * 0.1}>
          {Array.from({ length: 5 }, (_, j) => (
            <Mobil key={j} x={10 + i * 47 + 11} y={54 + 6 + j * 13} warna={warna[j]} />
          ))}
        </Piring>
      ))}
      {k === 0 ? <Label x={60} y={146} w={180} teks="6 kelompok mobil" ukuran={12} /> : null}
      {k === 1 ? <Label x={60} y={146} w={180} teks="tiap kelompok 5 mobil" ukuran={12} /> : null}
      {k === 2 ? <Besar x={150} y={172} teks="5+5+5+5+5+5 = 30" ukuran={23} warna="#DC2626" /> : null}
      {k === 3 ? <Besar x={150} y={174} teks="6 × 5 = 30" ukuran={42} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Tukar tempat ------------------------- */

function F2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Besar x={150} y={84} teks="5 × 6 = 30" ukuran={40} warna="#1D4ED8" />
      {k >= 1 ? <Besar x={150} y={130} teks="6 × 5 = 30" ukuran={40} warna="#DC2626" /> : null}
      {k >= 2 ? <Besar x={150} y={168} teks="5 × 6 = 6 × 5" ukuran={34} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={80} y={176} w={140} teks="boleh ditukar" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Siapkan gelas dan kerikil ------------------------- */

function F3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {Array.from({ length: 5 }, (_, i) => (
        <Gelas key={i} x={14 + i * 56} y={84} tunda={i * 0.1}>
          {k >= 1
            ? [[10, 28], [24, 28], [10, 38], [24, 38]].map(([dx, dy], j) => <Kerikil key={j} x={14 + i * 56 + dx + 4} y={84 + dy} />)
            : null}
        </Gelas>
      ))}
      {k === 0 ? <Label x={90} y={146} w={120} teks="5 gelas" ukuran={13} /> : null}
      {k === 2 ? <Label x={70} y={146} w={160} teks="tiap gelas 4 kerikil" ukuran={12} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={150} y={176} e="❓" s={42} />
        </Lompat>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Jumlahkan kerikil ------------------------- */

function F3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {Array.from({ length: 5 }, (_, i) => (
        <Gelas key={i} x={14 + i * 56} y={64}>
          {[[10, 28], [24, 28], [10, 38], [24, 38]].map(([dx, dy], j) => (
            <Kerikil key={j} x={14 + i * 56 + dx + 4} y={64 + dy} />
          ))}
        </Gelas>
      ))}
      {k === 0 ? <Besar x={150} y={150} teks="4+4+4+4+4 = 20" ukuran={28} warna="#DC2626" /> : null}
      {k === 1 ? <Label x={70} y={134} w={160} teks="gelas × kerikil tiap gelas" ukuran={10} /> : null}
      {k === 2 ? <Besar x={150} y={156} teks="5 × 4 = 20" ukuran={44} /> : null}
      {k === 3 ? <Besar x={150} y={156} teks="20 kerikil" ukuran={44} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Ulangi dengan 4 gelas ------------------------- */

function F3_3({ k }: PropsAdegan) {
  const pos: [number, number][] = [[10, 26], [21, 26], [32, 26], [43, 26], [15, 37], [26, 37], [37, 37]];
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {Array.from({ length: 4 }, (_, i) => (
        <Gelas key={i} x={16 + i * 70} y={64} lebar={56}>
          {pos.map(([dx, dy], j) => (
            <Kerikil key={j} x={16 + i * 70 + dx + 1} y={64 + dy} />
          ))}
        </Gelas>
      ))}
      {k === 0 ? <Besar x={150} y={156} teks="4 gelas, tiap gelas 7" ukuran={26} /> : null}
      {k === 1 ? <Besar x={150} y={156} teks="7+7+7+7 = 28" ukuran={34} warna="#DC2626" /> : null}
      {k === 2 ? <Besar x={150} y={158} teks="4 × 7 = 28" ukuran={44} warna="#16A34A" /> : null}
      {k === 3 ? <Label x={30} y={140} w={240} teks="perkalian = penjumlahan berulang" ukuran={12} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [F1_1, F1_2, F1_3],
  [F2_1, F2_2, F2_3],
  [F3_1, F3_2, F3_3],
];

export const ADEGAN_VIDEO_K3B1F = SUB_F31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 2, k: 2 },
  { a: 1, k: 2 },
];

export const VIDEO_SIAP_K3B1F: VideoSiap[] = SUB_F31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1F[i], poster: POSTER[i] }));

export function VideoK3B1F({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1F} speakGuru={speakGuru} />;
}
