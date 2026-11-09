"use client";

import React from "react";
import { BAWAH, BIRU, HIJAU, MERAH_MUDA } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Lompat, Muncul, Papan, tumbuh, type PropsAdegan } from "./video-cerita";
import { BondSvg, BIRU_SOAL, buatAdegan, VideoCeritaSatuLayar, JalurSvg, JambuBaris, JambuSvg, KartuTeks, KeranjangSvg, MERAH, TabelSvg, Teks, type VideoSiap } from "./video-k2b2-umum";
import { SUB_B } from "./naskah-k2b2";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 2 Sub-Bab B: Berbagai Cara Melakukan Pengurangan.  */
/* Tiga video, delapan adegan. Diputar satu per satu saat siswa mengetuk        */
/* Putar. Naskah satu sumber: naskah-k2b2.ts (SUB_B.videos).                    */
/* Animasi SVG gratis di perangkat siswa. Tanpa API.                           */
/* Naskah: naskah/mtk-2-bab2-video-cerita.md                                   */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";
const KUNING_JAMBU = "#F59E0B";
const MERAH_JAMBU = "#DB2777";

const papan = (v: number, a: number) => SUB_B.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Selisih jambu ------------------- */

function B1_1({ k, t }: PropsAdegan) {
  const garis = k < 3 ? 0 : k === 3 ? tumbuh(t, 0, 12, 5.5) : 12;
  const x0 = 24;
  const jarak = 14.4;
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k >= 1 ? (
        <Muncul dy={-14}>
          <JambuBaris x={x0} y={72} n={18} kolom={18} s={0.4} warna={MERAH_JAMBU} sorot={k >= 4 ? [12, 13, 14, 15, 16, 17] : []} />
          <Label x={24} y={44} w={96} teks="Kira: 18" ukuran={13} />
        </Muncul>
      ) : null}
      <Muncul dy={14}>
        <JambuBaris x={x0} y={124} n={12} kolom={12} s={0.4} warna={KUNING_JAMBU} />
        <Label x={24} y={146} w={96} teks="Tika: 12" ukuran={13} />
      </Muncul>
      {Array.from({ length: garis }, (_, i) => (
        <path key={i} d={`M${x0 + i * jarak} 84 V112`} stroke={BIRU} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />
      ))}
      {k === 2 ? <Lencana x={236} y={100} teks="?" r={22} /> : null}
      {k >= 4 ? (
        <Muncul key={k}>
          <Label x={150} y={146} w={134} teks={k === 4 ? "sisa = selisih" : "Selisih: 6"} ukuran={13} />
        </Muncul>
      ) : null}
      {k === 5 ? <Lencana x={217} y={190} teks="6" r={16} /> : null}
      <Lompat aktif={k >= 5}>
        <Tokoh x={52} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.55} angkat={k >= 5} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Menemukan jawaban --------------- */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Muncul key={k === 0 ? "a" : "b"} dy={-14}>
        <KartuTeks x={74} y={58} w={152} baris={["18 − 12 = ?"]} ukuran={26} warna="#FFF7CC" />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={10}>
          <Label x={30} y={116} w={110} teks="bilangan besar" ukuran={13} />
          <Teks x={150} y={134} teks="−" ukuran={24} />
          <Label x={160} y={116} w={110} teks="bilangan kecil" ukuran={13} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dy={10}>
          {["Mundur", "Susun", "Pasang"].map((n, i) => (
            <g key={n}>
              <rect x={22 + i * 92} y={150} width="84" height="28" rx="12" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2.6" />
              <Teks x={64 + i * 92} y={169} teks={n} ukuran={13} />
            </g>
          ))}
        </Muncul>
      ) : null}
      {k === 3 ? (
        <g className="igil-lompat" style={BAWAH}>
          <svg x="120" y="176" width="60" height="38" viewBox="0 0 120 80">
            <IgilWajahIsi />
          </svg>
        </g>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Hitung mundur ------------------- */

function B2_1({ k, t }: PropsAdegan) {
  const hop = k < 3 ? 0 : k === 3 ? tumbuh(t, 0, 12, 2.2) : 12;
  const pos = 18 - hop;
  const busur: [number, number][] = Array.from({ length: hop }, (_, i) => [18 - i, 17 - i]);
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Muncul dy={-16}>
        <JalurSvg x={8} y={80} dari={5} sampai={20} mulai={18} pos={k >= 2 ? pos : undefined} lompat={busur} sorot={k === 4 ? [6] : []} lebar={284} />
      </Muncul>
      {k === 1 ? (
        <Muncul>
          <KartuTeks x={84} y={136} w={132} baris={["18 − 12 = ?"]} ukuran={22} warna="#FFF7CC" />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul>
          <Label x={86} y={140} w={128} teks="Mulai dari 18" ukuran={14} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Label x={86} y={134} w={128} teks={`Mundur ke-${hop}`} ukuran={13} />
          {hop > 0 ? <Teks x={150} y={172} teks={`${Math.max(pos, 6)}`} ukuran={20} warna={BIRU_SOAL} /> : null}
        </>
      ) : null}
      {k === 4 ? (
        <>
          <Muncul>
            <KartuTeks x={74} y={134} w={152} baris={["18 − 12 = 6"]} ukuran={24} warna="#DCFCE7" tepi="#16A34A" />
          </Muncul>
          <Lencana x={150} y={196} teks="6" r={16} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Bersusun ------------------------ */

function B2_2({ k }: PropsAdegan) {
  const atas: [{ n: number | null }, { n: number | null }] = k >= 1 ? [{ n: 1 }, { n: 8 }] : [{ n: null }, { n: null }];
  const bawah: [{ n: number | null }, { n: number | null }] = k >= 2 ? [{ n: 1 }, { n: 2 }] : [{ n: null }, { n: null }];
  const hasil: [{ n: number | null }, { n: number | null }] = [{ n: k >= 4 ? 0 : null }, { n: k >= 3 ? 6 : null }];
  const nyala = k === 3 ? "s" : k === 4 ? "p" : null;
  const kartu = [["Cara 2", "Bersusun"], ["18 = 1 puluhan", "8 satuan"], ["12 = 1 puluhan", "2 satuan"], ["Satuan:", "8 − 2 = 6"], ["Puluhan:", "1 − 1 = 0"], ["Hasil:", "18 − 12 = 6"]][k];
  return (
    <>
      <Papan teks={papan(1, 1)[k]} y={4} />
      <TabelSvg x={10} y={34} op="−" atas={atas} bawah={bawah} hasil={hasil} nyala={nyala} />
      <Muncul key={k} dx={20}>
        <KartuTeks x={166} y={70} w={124} baris={kartu} ukuran={14} warna={k === 5 ? "#DCFCE7" : "#FFFFFF"} tepi={k === 5 ? "#16A34A" : BIRU} />
      </Muncul>
      {k === 5 ? <Lencana x={228} y={58} teks="6" r={20} /> : null}
      <Lompat aktif={k === 5}>
        <Tokoh x={232} y={206} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.62} angkat={k === 5} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Pasangan bilangan --------------- */

function B2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <BondSvg x={44} y={80} besar={18} a={k >= 1 ? 10 : null} b={k >= 1 ? 8 : null} nyala={k === 1 ? ["a", "b"] : []} />
      <Teks x={150} y={86} teks="−" ukuran={28} />
      <BondSvg x={186} y={80} besar={12} a={k >= 1 ? 10 : null} b={k >= 1 ? 2 : null} nyala={k === 1 ? ["a", "b"] : []} />
      {k >= 2 ? (
        <Muncul dy={10}>
          <KartuTeks x={18} y={134} w={128} baris={["10 − 10 = 0"]} ukuran={16} warna={k === 2 ? "#FFF7CC" : "#FFFFFF"} />
        </Muncul>
      ) : null}
      {k >= 3 ? (
        <Muncul dy={10}>
          <KartuTeks x={154} y={134} w={128} baris={["8 − 2 = 6"]} ukuran={16} warna={k === 3 ? "#FFF7CC" : "#FFFFFF"} />
        </Muncul>
      ) : null}
      {k >= 4 ? <Label x={74} y={176} w={152} teks="18 − 12 = 6" ukuran={17} /> : null}
      {k === 5 ? (
        <Muncul dy={-8}>
          <JambuSvg x={252} y={186} s={0.7} warna={MERAH_JAMBU} />
          <Lencana x={276} y={150} teks="6" r={16} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Tika memberi jambu -------------- */

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Muncul dy={-18}>
        <JambuBaris x={24} y={62} n={12} kolom={6} s={0.5} warna={KUNING_JAMBU} />
        <KeranjangSvg x={16} y={102} w={112} label="Tika: 12" />
      </Muncul>
      {k >= 1 ? (
        <Muncul dx={30}>
          <JambuBaris x={186} y={62} n={8} kolom={4} s={0.5} warna={KUNING_JAMBU} sorot={[0, 1, 2, 3, 4, 5, 6, 7]} />
          <ellipse cx="226" cy="122" rx="42" ry="10" fill="#FDF2F8" stroke="#DB2777" strokeWidth="3" />
          <Label x={186} y={142} w={80} teks="Lili: 8" ukuran={13} />
        </Muncul>
      ) : null}
      {k >= 2 ? <Lencana x={150} y={176} teks="?" r={22} /> : null}
      {k === 3 ? (
        <Muncul>
          <KartuTeks x={104} y={150} w={92} baris={["12 − 8 = ?"]} ukuran={17} warna="#FFF7CC" />
        </Muncul>
      ) : null}
      <Lompat aktif={k === 1}>
        <Tokoh x={36} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.62} angkat={k >= 1} />
      </Lompat>
      <Lompat aktif={k === 1}>
        <Tokoh x={266} y={206} rambut={RAMBUT_COKELAT} baju={HIJAU} s={0.62} angkat={k >= 1} />
      </Lompat>
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Urai dan kurangi ---------------- */

function B3_2({ k }: PropsAdegan) {
  const urai = k >= 1;
  const atas: [{ n: number; atas?: string; bawah?: string }, { n: number; bawah?: string }] = [
    { n: 1, atas: urai ? "−1" : undefined, bawah: k >= 4 ? "0" : undefined },
    { n: 2, bawah: k >= 2 ? "12" : undefined },
  ];
  const hasil: [{ n: number | null }, { n: number | null }] = [{ n: k >= 4 ? 0 : null }, { n: k >= 3 ? 4 : null }];
  const kartu = [["2 − 8", "tidak cukup!"], ["Urai 1 puluhan", "jadi 10 satuan"], ["2 + 10 = 12", "satuan"], ["12 − 8 = 4", "satuan"], ["Puluhan:", "tinggal 0"], ["Sisa Tika:", "4 jambu"]][k];
  return (
    <>
      <Papan teks={papan(2, 1)[k]} y={4} />
      <TabelSvg x={10} y={34} op="−" atas={atas} bawah={[{ n: null }, { n: 8 }]} hasil={hasil} nyala={k === 0 || k === 2 || k === 3 ? "s" : k === 1 || k === 4 ? "p" : null} />
      <Muncul key={k} dx={20}>
        <KartuTeks x={166} y={70} w={124} baris={kartu} ukuran={14} warna={k === 5 ? "#DCFCE7" : k === 0 ? "#FDECEC" : "#FFFFFF"} tepi={k === 5 ? "#16A34A" : k === 0 ? MERAH : BIRU} />
      </Muncul>
      {k === 1 ? (
        <Muncul>
          <path d="M58 52 Q20 28 52 150" fill="none" stroke={MERAH} strokeWidth="2.6" strokeDasharray="5 4" strokeLinecap="round" />
        </Muncul>
      ) : null}
      {k === 5 ? <Lencana x={228} y={58} teks="4" r={20} /> : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Periksa ------------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <Muncul dy={-12}>
        <KartuTeks x={44} y={56} w={96} baris={["12 − 8 = 4"]} ukuran={16} warna="#FFFFFF" />
        <Teks x={150} y={80} teks="⇄" ukuran={26} />
        <KartuTeks x={160} y={56} w={96} baris={["4 + 8 = 12"]} ukuran={16} warna={k >= 1 ? "#DCFCE7" : "#FFFFFF"} tepi={k >= 1 ? "#16A34A" : BIRU} />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={10}>
          <Lencana x={150} y={134} teks="✔" r={22} />
          <Label x={76} y={160} w={148} teks="cocok dengan jambu semula" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul dy={10}>
          <Label x={64} y={192} w={172} teks="tidak cocok? hitung ulang" ukuran={12.5} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [B1_1, B1_2],
  [B2_1, B2_2, B2_3],
  [B3_1, B3_2, B3_3],
];

export const ADEGAN_VIDEO_K2B2B = SUB_B.videos.map((v, vi) =>
  v.adegan.map((a, ai) => {
    const waktu = (vi === 0 && ai === 0) || (vi === 1 && ai === 0);
    const minimal = vi === 0 && ai === 0 ? { 3: 6.4 } : vi === 1 && ai === 0 ? { 3: 7.8 } : undefined;
    return buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p), { waktu, minimal });
  }),
);

export const VIDEO_SIAP_K2B2B: VideoSiap[] = SUB_B.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B2B[i] }));

export function VideoPenguranganK2B2B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_B} videos={VIDEO_SIAP_K2B2B} speakGuru={speakGuru} />;
}
