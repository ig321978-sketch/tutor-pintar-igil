"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { BIRU, buatAdegan, DaftarVideoCerita, Emo, EMAS, Orang, TEKS_TEMPAT, type VideoSiap } from "./video-k3b1-umum";
import { SUB_E31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 1 Sub-Bab E: Pengurangan sampai 100. Tiga video,    */
/* sembilan adegan. Diputar satu per satu saat siswa mengetuk Putar.            */
/* Naskah satu sumber: naskah-k3b1.ts (SUB_E31.videos). Animasi SVG gratis di   */
/* perangkat. Tanpa API. Naskah: naskah/mtk-3-bab1-video-cerita.md              */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_E31.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_E31.videos[v].adegan[a];

const Besar = ({ x, y, teks, ukuran = 40, warna = BIRU }: { x: number; y: number; teks: string; ukuran?: number; warna?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna} stroke="#FFFFFF" strokeWidth={ukuran * 0.07} paintOrder="stroke">
    {teks}
  </text>
);

type TampilKurang = { pinjamP?: boolean; pinjamS?: boolean; satuan?: boolean; puluhan?: boolean };

/**
 * Pengurangan bersusun: kolom puluhan dan satuan. Bila satuan atas kurang dari satuan bawah, angka pinjaman merah muncul
 * di atas kolom (puluhan berkurang satu, satuan bertambah sepuluh). (x, y) kiri atas tabel.
 */
function KurangSvg({ x, y, a, b, tampil = {}, sorot = null }: { x: number; y: number; a: number; b: number; tampil?: TampilKurang; sorot?: "p" | "s" | null }) {
  const sa = a % 10;
  const sb = b % 10;
  const ambil = sa < sb;
  const hasil = a - b;
  const cx = [x + 38, x + 94, x + 150];
  const baris = [y + 38, y + 68, y + 100, y + 144];
  return (
    <g>
      <rect x={x} y={y} width="176" height="160" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={cx[1]} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="900" fill={TEKS_TEMPAT.p}>
        Puluhan
      </text>
      <text x={cx[2]} y={y + 17} textAnchor="middle" fontSize="11" fontWeight="900" fill={TEKS_TEMPAT.s}>
        Satuan
      </text>
      {sorot ? <rect className="vc-denyut" x={sorot === "p" ? cx[1] - 26 : cx[2] - 26} y={y + 22} width="52" height="132" rx="9" fill="none" stroke={EMAS} strokeWidth="3.4" strokeDasharray="6 4" /> : null}
      {ambil && tampil.pinjamP ? (
        <text x={cx[1]} y={baris[0] - 6} textAnchor="middle" fontSize="19" fontWeight="900" fill="#DC2626">
          {Math.floor(a / 10) - 1}
        </text>
      ) : null}
      {ambil && tampil.pinjamS ? (
        <text x={cx[2]} y={baris[0] - 6} textAnchor="middle" fontSize="19" fontWeight="900" fill="#DC2626">
          {sa + 10}
        </text>
      ) : null}
      <text x={cx[1]} y={baris[1]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU} opacity={ambil && tampil.pinjamP ? 0.45 : 1}>
        {Math.floor(a / 10)}
      </text>
      <text x={cx[2]} y={baris[1]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU} opacity={ambil && tampil.pinjamS ? 0.45 : 1}>
        {sa}
      </text>
      <text x={cx[0]} y={baris[2]} textAnchor="middle" fontSize="30" fontWeight="900" fill={BIRU}>
        −
      </text>
      <text x={cx[1]} y={baris[2]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {Math.floor(b / 10)}
      </text>
      <text x={cx[2]} y={baris[2]} textAnchor="middle" fontSize="32" fontWeight="900" fill={BIRU}>
        {sb}
      </text>
      <line x1={x + 14} y1={y + 110} x2={x + 162} y2={y + 110} stroke={BIRU} strokeWidth="3.4" strokeLinecap="round" />
      <text x={cx[1]} y={baris[3]} textAnchor="middle" fontSize="34" fontWeight="900" fill="#16A34A">
        {tampil.puluhan ? Math.floor(hasil / 10) : "?"}
      </text>
      <text x={cx[2]} y={baris[3]} textAnchor="middle" fontSize="34" fontWeight="900" fill="#16A34A">
        {tampil.satuan ? hasil % 10 : "?"}
      </text>
    </g>
  );
}

/** Tabel susun di kiri dan teks keterangan di kanan. */
const Samping = ({ a, b, tampil, sorot, baris }: { a: number; b: number; tampil?: TampilKurang; sorot?: "p" | "s" | null; baris: string[] }) => (
  <>
    <KurangSvg x={8} y={40} a={a} b={b} tampil={tampil} sorot={sorot ?? null} />
    {baris.map((t, i) => (
      <Muncul key={t} tunda={0.1 * i} dx={10}>
        <Label x={190} y={62 + i * 38} w={104} teks={t} ukuran={t.length > 12 ? 10 : 12} />
      </Muncul>
    ))}
  </>
);

/** Satu permen: lingkaran berwarna. */
const Permen = ({ x, y, warna, redup = false }: { x: number; y: number; warna: string; redup?: boolean }) => (
  <circle cx={x} cy={y} r="7" fill={warna} stroke={BIRU} strokeWidth="2" opacity={redup ? 0.28 : 1} strokeDasharray={redup ? "3 2" : undefined} />
);

/* ------------------------- Video 1, adegan 1: Berapa sisa permen ------------------------- */

function E1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <rect x="92" y="44" width="116" height="104" rx="14" fill="#E0F2FE" stroke={BIRU} strokeWidth="3" />
      <rect x="86" y="38" width="128" height="12" rx="5" fill="#BAE6FD" stroke={BIRU} strokeWidth="3" />
      {Array.from({ length: 25 }, (_, i) => {
        const dicabut = k >= 1 && i >= 13;
        return <Permen key={i} x={110 + (i % 5) * 20} y={66 + Math.floor(i / 5) * 18} warna={i % 2 ? "#F472B6" : "#FBBF24"} redup={dicabut} />;
      })}
      <Orang x={46} y={188} nama="halim" s={0.7} tampilNama={false} />
      {k >= 1 ? (
        <Muncul>
          <Orang x={254} y={188} nama="kira" s={0.7} tampilNama={false} />
        </Muncul>
      ) : null}
      {k === 1 ? <Label x={100} y={156} w={100} teks="diambil 12" ukuran={12} /> : null}
      {k === 2 ? (
        <Lompat>
          <Emo x={150} y={178} e="❓" s={40} />
        </Lompat>
      ) : null}
      {k === 3 ? <Besar x={150} y={184} teks="25 − 12" ukuran={40} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Tabel nilai tempat ------------------------- */

function E1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Samping
        a={25}
        b={12}
        tampil={{ satuan: k >= 2, puluhan: k >= 3 }}
        sorot={k === 2 ? "s" : k === 3 ? "p" : null}
        baris={k === 0 ? ["25 dan 12"] : k === 1 ? ["25 = 2 puluhan", "12 = 1 puluhan"] : k === 2 ? ["5 − 2 = 3"] : ["2 − 1 = 1", "sisa 13"]}
      />
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Susun pendek ------------------------- */

function E1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Samping
        a={25}
        b={12}
        tampil={{ satuan: k >= 2, puluhan: k >= 3 }}
        sorot={k === 1 ? "s" : k === 2 ? "p" : null}
        baris={k === 0 ? ["susun lurus"] : k === 1 ? ["satuan: 5 − 2 = 3"] : k === 2 ? ["puluhan: 2 − 1 = 1"] : ["25 − 12 = 13", "13 permen"]}
      />
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Berapa sisa buku ------------------------- */

const Buku = ({ x, y, warna, redup = false }: { x: number; y: number; warna: string; redup?: boolean }) => (
  <rect x={x} y={y} width="9" height="20" rx="1.5" fill={warna} stroke={BIRU} strokeWidth="1.6" opacity={redup ? 0.25 : 1} strokeDasharray={redup ? "3 2" : undefined} />
);

function E2_1({ k }: PropsAdegan) {
  const warna = ["#60A5FA", "#FBBF24", "#F87171", "#4ADE80", "#C084FC"];
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {[0, 1, 2].map((baris) => (
        <g key={baris}>
          <rect x="34" y={64 + baris * 26} width="232" height="5" rx="2" fill="#8B5E34" stroke={BIRU} strokeWidth="2" />
          {Array.from({ length: 15 }, (_, i) => {
            const nomor = baris * 15 + i;
            return <Buku key={i} x={40 + i * 15} y={44 + baris * 26} warna={warna[nomor % 5]} redup={k >= 1 && nomor >= 26} />;
          })}
        </g>
      ))}
      <Orang x={150} y={190} nama="paman" s={0.65} tampilNama={false} />
      {k === 1 ? <Label x={190} y={150} w={104} teks="dibeli 19" ukuran={12} /> : null}
      {k === 2 ? (
        <Lompat>
          <Emo x={64} y={170} e="❓" s={40} />
        </Lompat>
      ) : null}
      {k === 3 ? <Besar x={64} y={176} teks="45 − 19" ukuran={28} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Mengambil satu puluhan ------------------------- */

function E2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <Samping
        a={45}
        b={19}
        tampil={{ pinjamP: k >= 1, pinjamS: k >= 2, satuan: k >= 3 }}
        sorot={k === 0 ? "s" : k === 1 ? "p" : k === 2 ? "s" : null}
        baris={k === 0 ? ["5 kurang", "dari 9"] : k === 1 ? ["ambil 1 puluhan", "4 jadi 3"] : k === 2 ? ["10 + 5 = 15"] : ["15 − 9 = 6"]}
      />
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Puluhan dan hasil ------------------------- */

function E2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Samping
        a={45}
        b={19}
        tampil={{ pinjamP: true, pinjamS: true, satuan: true, puluhan: k >= 1 }}
        sorot={k <= 1 ? "p" : null}
        baris={k === 0 ? ["puluhan tinggal 3"] : k === 1 ? ["3 − 1 = 2"] : k === 2 ? ["45 − 19 = 26"] : ["26 buku tulis", "tersisa"]}
      />
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Uraikan bilangan ------------------------- */

function E3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? <Besar x={150} y={116} teks="45 − 19" ukuran={52} /> : null}
      {k >= 1 ? <Besar x={150} y={78} teks="45 = 40 + 5" ukuran={30} warna="#1D4ED8" /> : null}
      {k >= 1 ? <Besar x={150} y={116} teks="19 = 10 + 9" ukuran={30} warna="#DC2626" /> : null}
      {k >= 2 ? <Besar x={150} y={154} teks="40 = 30 + 10" ukuran={28} /> : null}
      {k === 3 ? <Besar x={150} y={192} teks="45 = 30 + 15" ukuran={28} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Kurangkan kelompok ------------------------- */

function E3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k >= 0 ? <Besar x={150} y={76} teks="15 − 9 = 6" ukuran={32} warna="#DC2626" /> : null}
      {k >= 1 ? <Besar x={150} y={116} teks="30 − 10 = 20" ukuran={32} warna="#1D4ED8" /> : null}
      {k >= 2 ? <Besar x={150} y={154} teks="20 + 6" ukuran={32} /> : null}
      {k === 3 ? <Besar x={150} y={194} teks="45 − 19 = 26" ukuran={32} warna="#16A34A" /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Periksa dengan penjumlahan ------------------------- */

function E3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? <Emo x={150} y={112} e="🔁" s={64} /> : null}
      {k >= 1 ? <Besar x={150} y={84} teks="45 − 19 = 26" ukuran={34} /> : null}
      {k >= 1 ? <Besar x={150} y={134} teks="26 + 19 = 45" ukuran={34} warna="#DC2626" /> : null}
      {k >= 2 ? <Emo x={150} y={182} e="✅" s={40} /> : null}
      {k === 3 ? <Label x={30} y={160} w={240} teks="periksa pekerjaanmu" ukuran={13} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [E1_1, E1_2, E1_3],
  [E2_1, E2_2, E2_3],
  [E3_1, E3_2, E3_3],
];

export const ADEGAN_VIDEO_K3B1E = SUB_E31.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 2, k: 3 },
  { a: 1, k: 3 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K3B1E: VideoSiap[] = SUB_E31.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K3B1E[i], poster: POSTER[i] }));

export function VideoK3B1E({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K3B1E} speakGuru={speakGuru} />;
}
