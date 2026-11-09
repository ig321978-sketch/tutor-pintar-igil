"use client";

import React from "react";
import { BAWAH, BIRU, HIJAU, MERAH_MUDA } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Gerak, Lompat, Muncul, Papan, Sorot, tumbuh, type PropsAdegan } from "./video-cerita";
import { BondSvg, BIRU_SOAL, buatAdegan, VideoCeritaSatuLayar, JalurSvg, JambuBaris, KartuTeks, KeranjangSvg, MERAH, PohonJambu, TabelSvg, Teks, type VideoSiap } from "./video-k2b2-umum";
import { SUB_A } from "./naskah-k2b2";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 2 Sub-Bab A: Berbagai Cara Melakukan Penjumlahan.  */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk       */
/* Putar. Naskah satu sumber: naskah-k2b2.ts (SUB_A.videos).                    */
/* Animasi SVG gratis di perangkat siswa. Tanpa API.                           */
/* Naskah: naskah/mtk-2-bab2-video-cerita.md                                   */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";
const KUNING_JAMBU = "#F59E0B";

const papan = (v: number, a: number) => SUB_A.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A.videos[v].adegan[a];

/** Sepuluh kubus satuan berjajar. */
function SepuluhKubus({ x, y, n = 10 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + i * 13} y={y} width="11" height="11" rx="2" fill="#60A5FA" stroke={BIRU} strokeWidth="1.6" />
      ))}
    </g>
  );
}

/** Satu batang puluhan tegak. */
function BatangSvg({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="14" height="62" rx="3" fill="#F97316" stroke={BIRU} strokeWidth="2.2" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${x} ${y + (i + 1) * 6.2} H${x + 14}`} stroke={BIRU} strokeWidth="1" opacity="0.7" />
      ))}
    </g>
  );
}

/* ------------------------- Video 1, adegan 1: Pohon jambu --------------------- */

function A1_1({ k }: PropsAdegan) {
  const buah = [3, 5, 16, 16][k];
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Muncul dy={-40} durasi={0.8}>
        <PohonJambu x={206} y={176} buah={buah} s={1.05} />
      </Muncul>
      <Lompat aktif={k === 2}>
        <Tokoh x={60} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.95} angkat={k >= 1} />
      </Lompat>
      {k === 1 ? (
        <Muncul dx={-20}>
          <g>
            <path d="M92 122 H118 L114 140 H96 Z" fill="#93C5FD" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M118 126 L134 120" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <ellipse key={i} cx={140 + i * 6} cy={130 + i * 10} rx="2.4" ry="3.6" fill="#38BDF8" stroke={BIRU} strokeWidth="1" className="vc-denyut" />
            ))}
          </g>
        </Muncul>
      ) : null}
      {k === 2 ? <Lencana x={136} y={70} teks="Lebat!" r={26} /> : null}
      {k === 3 ? (
        <Gerak x={0} durasi={1.2}>
          <Tokoh x={128} y={198} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.9} angkat />
        </Gerak>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Memetik ------------------------- */

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Muncul dy={-24}>
        <JambuBaris x={20} y={62} n={12} kolom={6} s={0.5} warna={KUNING_JAMBU} />
        <KeranjangSvg x={14} y={102} w={112} label="Tika: 12" />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={-24}>
          <JambuBaris x={166} y={44} n={18} kolom={6} s={0.5} sorot={k === 1 ? [12, 13, 14, 15, 16, 17] : []} />
          <KeranjangSvg x={160} y={102} w={124} label="Kira: 18" />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <Muncul tunda={0.3}>
          <Label x={168} y={150} w={116} teks="6 lebih banyak" ukuran={11.5} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <>
          <Muncul dy={8}>
            <text x="6" y="180" fontSize="22" aria-hidden="true">💛</text>
          </Muncul>
          <Muncul dy={8} tunda={0.2}>
            <text x="274" y="180" fontSize="22" aria-hidden="true">⭐</text>
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <Muncul>
          <Label x={72} y={176} w={156} teks="manis dan penuh vitamin" ukuran={12} />
        </Muncul>
      ) : null}
      <Lompat aktif={k >= 2}>
        <Tokoh x={36} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.62} angkat />
      </Lompat>
      <Lompat aktif={k >= 2}>
        <Tokoh x={270} y={206} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.62} angkat />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Dua pertanyaan ------------------ */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k >= 1 ? (
        <Muncul dy={-20}>
          <KartuTeks x={18} y={50} w={118} baris={["1. Jumlah", "Tika + Kira"]} ukuran={14} warna="#DBEAFE" />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dy={-20}>
          <KartuTeks x={164} y={50} w={118} baris={["2. Selisih", "Tika dan Kira"]} ukuran={14} warna="#FCE7F3" />
        </Muncul>
      ) : null}
      {k >= 3 ? (
        <Muncul dy={20}>
          <JambuBaris x={64} y={160} n={6} kolom={6} s={0.7} sorot={[0, 1, 2, 3, 4, 5]} />
          <Label x={118} y={176} w={64} teks="Kira" ukuran={12} />
        </Muncul>
      ) : null}
      {k >= 4 ? (
        <Muncul dy={-10}>
          <KartuTeks x={74} y={102} w={152} baris={["12 + 6 = ?"]} ukuran={22} warna="#FFF7CC" />
        </Muncul>
      ) : null}
      {k === 6 ? (
        <g className="igil-lompat" style={BAWAH}>
          <svg x="116" y="148" width="68" height="46" viewBox="0 0 120 80">
            <IgilWajahIsi />
          </svg>
        </g>
      ) : null}
      <Lompat aktif={k >= 4}>
        <Tokoh x={40} y={204} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.62} angkat={k >= 4} />
      </Lompat>
      <Lompat aktif={k >= 4}>
        <Tokoh x={262} y={204} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.62} angkat={k >= 4} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Hitung maju --------------------- */

function A2_1({ k, t }: PropsAdegan) {
  const hop = k < 3 ? 0 : k === 3 ? tumbuh(t, 0, 6, 1.4) : 6;
  const pos = 12 + hop;
  const busur: [number, number][] = Array.from({ length: hop }, (_, i) => [12 + i, 13 + i]);
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Muncul dy={-16}>
        <JalurSvg x={8} y={74} dari={11} sampai={20} mulai={12} pos={k >= 2 ? pos : undefined} lompat={busur} sorot={k === 4 || k === 5 ? [18] : []} lebar={284} />
      </Muncul>
      {k === 1 ? (
        <Muncul>
          <KartuTeks x={84} y={130} w={132} baris={["12 + 6 = ?"]} ukuran={22} warna="#FFF7CC" />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul>
          <Label x={86} y={134} w={128} teks="Mulai dari 12" ukuran={14} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Label x={96} y={132} w={108} teks={`Lompatan ke-${hop}`} ukuran={13} />
          {hop > 0 ? <Teks x={150} y={170} teks={Array.from({ length: hop }, (_, i) => 13 + i).join(", ")} ukuran={14} warna={BIRU_SOAL} /> : null}
        </>
      ) : null}
      {k === 4 ? (
        <Muncul>
          <KartuTeks x={74} y={128} w={152} baris={["12 + 6 = 18"]} ukuran={24} warna="#DCFCE7" tepi="#16A34A" />
        </Muncul>
      ) : null}
      {k === 5 ? (
        <>
          <Muncul>
            <KeranjangSvg x={92} y={128} w={116} label="Kira: 18 jambu" />
          </Muncul>
          <Lencana x={150} y={118} teks="18" r={20} />
        </>
      ) : null}
      <Lompat aktif={k === 4 || k === 5}>
        <Tokoh x={36} y={204} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.7} angkat={k >= 4} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Bersusun ------------------------ */

function A2_2({ k }: PropsAdegan) {
  const atas: [{ n: number | null }, { n: number | null }] = k >= 1 ? [{ n: 1 }, { n: 2 }] : [{ n: null }, { n: null }];
  const bawah: [{ n: number | null }, { n: number | null }] = k >= 2 ? [{ n: null }, { n: 6 }] : [{ n: null }, { n: null }];
  const hasil: [{ n: number | null }, { n: number | null }] = [{ n: k >= 5 ? 1 : null }, { n: k >= 4 ? 8 : null }];
  const nyala = k === 3 || k === 4 ? "s" : k === 5 ? "p" : null;
  const kartu = [
    ["Cara 2", "Bersusun"],
    ["12 = 1 puluhan", "2 satuan"],
    ["6 = 6 satuan"],
    ["Satuan lurus", "dengan satuan"],
    ["Satuan:", "2 + 6 = 8"],
    ["Puluhan:", "hanya 1"],
    ["Hasil:", "12 + 6 = 18"],
  ][k];
  return (
    <>
      <Papan teks={papan(1, 1)[k]} y={4} />
      <TabelSvg x={10} y={34} op="+" atas={atas} bawah={bawah} hasil={hasil} nyala={nyala} />
      <Muncul key={k} dx={20}>
        <KartuTeks x={166} y={70} w={124} baris={kartu} ukuran={14} warna={k === 6 ? "#DCFCE7" : "#FFFFFF"} tepi={k === 6 ? "#16A34A" : BIRU} />
      </Muncul>
      {k === 6 ? <Lencana x={228} y={58} teks="18" r={20} /> : null}
      <Lompat aktif={k === 6}>
        <Tokoh x={232} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.62} angkat={k === 6} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Pasangan bilangan --------------- */

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <BondSvg x={62} y={96} besar={12} a={k >= 1 ? 10 : null} b={k >= 1 ? 2 : null} nyala={k === 1 ? ["a", "b"] : []} />
      {k >= 2 ? (
        <Muncul dx={20}>
          <KartuTeks x={170} y={62} w={112} baris={["2 + 6 = 8"]} ukuran={18} warna={k === 2 ? "#FFF7CC" : "#FFFFFF"} />
        </Muncul>
      ) : null}
      {k >= 3 ? (
        <Muncul dx={20}>
          <KartuTeks x={170} y={102} w={112} baris={["10 + 8 = 18"]} ukuran={18} warna={k === 3 ? "#FFF7CC" : "#FFFFFF"} />
        </Muncul>
      ) : null}
      {k >= 4 ? <Label x={86} y={146} w={128} teks="12 + 6 = 18" ukuran={16} /> : null}
      {k === 5 ? (
        <Muncul dy={10}>
          {["Maju", "Susun", "Pasang"].map((n, i) => (
            <g key={n}>
              <rect x={22 + i * 92} y={176} width="84" height="26" rx="12" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.6" />
              <Teks x={64 + i * 92} y={194} teks={`${n} = 18`} ukuran={12.5} />
            </g>
          ))}
        </Muncul>
      ) : null}
      <Lompat aktif={k >= 4}>
        <Tokoh x={36} y={150} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.55} angkat={k >= 4} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Kira memetik dua lagi ---------- */

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Muncul dy={-20}>
        <JambuBaris x={34} y={62} n={18} kolom={9} s={0.5} />
        <KeranjangSvg x={26} y={104} w={168} label="Kira: 18 jambu" />
      </Muncul>
      {k >= 1 ? (
        <Muncul dx={40}>
          <JambuBaris x={222} y={62} n={2} kolom={2} s={0.62} sorot={[0, 1]} />
          <Label x={206} y={92} w={78} teks="+ 2 lagi" ukuran={13} />
        </Muncul>
      ) : null}
      {k >= 2 ? <Lencana x={150} y={176} teks="?" r={22} /> : null}
      {k >= 3 ? (
        <g className="igil-lompat" style={BAWAH}>
          <svg x="228" y="140" width="58" height="42" viewBox="0 0 120 80">
            <IgilWajahIsi />
          </svg>
        </g>
      ) : null}
      <Lompat aktif={k === 1}>
        <Tokoh x={52} y={206} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.7} angkat={k >= 1} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Pasangan dan pindah ------------ */

function A3_2({ k }: PropsAdegan) {
  const tabel = k >= 3;
  const atas: [{ n: number; atas?: string }, { n: number }] = [{ n: 1, atas: k >= 5 ? "+1" : undefined }, { n: 8 }];
  const hasilS = k >= 5 ? { n: 0, atas: "10" } : { n: null as number | null };
  const hasilP = k >= 6 ? { n: 2 } : { n: null as number | null };
  const kartu = [
    ["18 = 10 dan 8"],
    ["8 + 2 = 10"],
    ["10 + 10 = 20"],
    ["Satuan:", "8 + 2 = 10"],
    ["10 satuan", "= 1 puluhan"],
    ["Pindah ke", "kolom puluhan!"],
    ["Puluhan:", "1 + 1 = 2"],
    ["18 + 2 = 20"],
  ][k];
  return (
    <>
      <Papan teks={papan(2, 1)[k]} y={4} />
      {!tabel ? (
        <>
          <BondSvg x={62} y={100} besar={18} a={10} b={8} nyala={k === 0 ? ["a", "b"] : []} />
          <Muncul key={k} dx={20}>
            <KartuTeks x={170} y={80} w={112} baris={kartu} ukuran={17} warna="#FFF7CC" />
          </Muncul>
        </>
      ) : (
        <>
          <TabelSvg x={10} y={34} op="+" atas={atas} bawah={[{ n: null }, { n: 2 }]} hasil={[hasilP, hasilS]} nyala={k === 3 || k === 4 ? "s" : k === 5 || k === 6 ? "p" : null} />
          <Muncul key={k} dx={20}>
            <KartuTeks x={166} y={60} w={124} baris={kartu} ukuran={14} warna={k === 7 ? "#DCFCE7" : "#FFFFFF"} tepi={k === 7 ? "#16A34A" : BIRU} />
          </Muncul>
          {k === 4 ? <SepuluhKubus x={162} y={132} /> : null}
          {k === 4 ? <Teks x={226} y={162} teks="= 1 batang" ukuran={12} /> : null}
          {k === 5 ? (
            <Muncul>
              <path d="M118 120 Q96 88 70 100" fill="none" stroke={MERAH} strokeWidth="3" strokeLinecap="round" />
              <path d="M76 90 L68 101 L82 104" fill="none" stroke={MERAH} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </Muncul>
          ) : null}
          {k === 7 ? <Lencana x={228} y={50} teks="20" r={20} /> : null}
        </>
      )}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Ingat pindah ------------------- */

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <Muncul dy={-16}>
        <SepuluhKubus x={20} y={84} />
        <Teks x={170} y={96} teks="=" ukuran={26} />
        <BatangSvg x={190} y={58} />
        <Teks x={197} y={134} teks="1 puluhan" ukuran={11.5} />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={10}>
          <Label x={30} y={150} w={110} teks="satuan: 0" ukuran={13} />
          <Label x={160} y={150} w={110} teks="puluhan: +1" ukuran={13} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dy={10}>
          <KartuTeks x={22} y={178} w={116} baris={["13 + 7 = 20"]} ukuran={15} warna="#DCFCE7" tepi="#16A34A" />
          <KartuTeks x={160} y={178} w={116} baris={["16 + 4 = 20"]} ukuran={15} warna="#DCFCE7" tepi="#16A34A" />
        </Muncul>
      ) : null}
      <Sorot x={14} y={78} w={140} h={26} />
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [A1_1, A1_2, A1_3],
  [A2_1, A2_2, A2_3],
  [A3_1, A3_2, A3_3],
];

export const ADEGAN_VIDEO_K2B2A = SUB_A.videos.map((v, vi) =>
  v.adegan.map((a, ai) => {
    const waktu = vi === 1 && ai === 0;
    return buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p), { waktu, minimal: waktu ? { 3: 6.6 } : undefined });
  }),
);

export const VIDEO_SIAP_K2B2A: VideoSiap[] = SUB_A.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B2A[i] }));

export function VideoPenjumlahanK2B2A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_A} videos={VIDEO_SIAP_K2B2A} speakGuru={speakGuru} />;
}