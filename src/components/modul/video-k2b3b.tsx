"use client";

import React from "react";
import { HIJAU, MERAH_MUDA } from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Gerak, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { GABUNGAN_B, RONDE_GARIS_B, RONDE_GUNTING_B, RONDE_HITUNG_B, RONDE_KOMPOSIT_B, RONDE_RAKIT_B, SEGITIGA_DASAR_B, type Titik } from "./data-k2b3";
import { buatAdegan, VideoCeritaSatuLayar, GarisPutus, KartuTeks, Lup, PanahG, Pol, PolDi, Sh, Tanya, TangramG, UraiG, WARNA_KEPING, type VideoSiap } from "./video-k2b3-umum";
import { SUB_B3 } from "./naskah-k2b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 3 Sub-Bab B: Mengurai dan Menyusun Bangun Datar.    */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk       */
/* Putar. Naskah satu sumber: naskah-k2b3.ts (SUB_B3.videos). Tanpa API.        */
/* Naskah: naskah/mtk-2-bab3-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";

const papan = (v: number, a: number) => SUB_B3.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B3.videos[v].adegan[a];

const PERSEGI_8 = RONDE_GUNTING_B[0].titik;
const H1 = RONDE_HITUNG_B[1];
const G4 = RONDE_GARIS_B[3];
const KEP3 = RONDE_KOMPOSIT_B[2].keping;

const HEX_MENDATAR: Titik[][] = [
  [[0, 50], [20, 30], [20, 70]],
  [[20, 30], [60, 30], [60, 70], [20, 70]],
  [[60, 30], [80, 50], [60, 70]],
];
const HEX_TEGAK: Titik[][] = [
  [[40, 0], [60, 20], [20, 20]],
  [[20, 20], [60, 20], [60, 60], [20, 60]],
  [[20, 60], [60, 60], [40, 80]],
];

/* ------------------------- Video 1, adegan 1: Satu bangun, banyak bagian ------ */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Muncul dy={-16}>
        <UraiG titik={G4.titik} batas={G4.batas} ruas={[]} x={60} y={13} w={180} />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={10}>
          <Label x={86} y={160} w={128} teks="satu → banyak" ukuran={15} />
        </Muncul>
      ) : null}
      {k >= 2 ? <GarisPutus titik={G4.titik} ruas={G4.solusi} x={60} y={13} w={180} /> : null}
      {k === 3 ? <Tanya x={262} y={68} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Dua segitiga, satu segi empat --- */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? <UraiG titik={H1.titik} batas={H1.batas} ruas={H1.ruas} x={60} y={13} w={180} /> : null}
      {k === 1 ? (
        <>
          <UraiG titik={H1.titik} batas={H1.batas} ruas={H1.ruas} x={60} y={13} w={180} jarak={0.3} />
          <Muncul dy={10}>
            <Label x={14} y={164} w={118} teks="2 segitiga" ukuran={14} />
            <Label x={150} y={164} w={136} teks="1 segi empat" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? <UraiG titik={G4.titik} batas={G4.batas} ruas={G4.solusi} x={60} y={13} w={180} /> : null}
      {k === 3 ? (
        <>
          <UraiG titik={G4.titik} batas={G4.batas} ruas={G4.solusi} x={60} y={13} w={180} jarak={0.28} />
          <Muncul dy={10}>
            <Label x={30} y={164} w={240} teks="2 segitiga + 2 segi empat" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Cara memengaruhi hasil ---------- */

function B1_3({ k }: PropsAdegan) {
  const ruas = [[0, 4], [1, 5], [2, 6], [7, 3]] as [number, number][];
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <UraiG titik={PERSEGI_8} batas={8} ruas={[]} x={95} y={37} w={110} />
          <GarisPutus titik={PERSEGI_8} ruas={ruas} x={95} y={37} w={110} />
          <Muncul dy={10}>
            <Label x={86} y={160} w={128} teks="banyak cara" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <Muncul dy={-14}>
          <KartuTeks x={40} y={70} w={220} baris={["Cara yang dipakai", "memengaruhi hasil"]} ukuran={18} warna="#FEF3C7" />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <UraiG titik={PERSEGI_8} batas={8} ruas={[[0, 4]]} x={95} y={37} w={110} jarak={0.28} />
          <Muncul dy={10}>
            <Label x={70} y={160} w={160} teks="garis miring: 2 segitiga" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <UraiG titik={PERSEGI_8} batas={8} ruas={[[1, 5]]} x={95} y={37} w={110} jarak={0.28} />
          <Muncul dy={10}>
            <Label x={60} y={160} w={180} teks="garis tengah: 2 segi empat" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Beberapa bangun jadi satu ------- */

function B2_1({ k }: PropsAdegan) {
  const warna = ["#FCA5A5", "#93C5FD", "#86EFAC"];
  const posisi: [number, number][] = [[40, 66], [118, 60], [214, 66]];
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {KEP3.map((p, i) => (
        <Muncul key={i} tunda={i * 0.2} dy={-12}>
          <PolDi titik={p.titik} ox={posisi[i][0]} oy={posisi[i][1]} skala={1.6} warna={i === 2 ? warna[2] : warna[i]} />
        </Muncul>
      ))}
      {k >= 1 ? (
        <Muncul dy={-8}>
          <PanahG x1={70} y1={138} x2={120} y2={158} />
          <PanahG x1={150} y1={138} x2={150} y2={156} />
          <PanahG x1={230} y1={138} x2={180} y2={158} />
        </Muncul>
      ) : null}
      {k >= 1 ? (
        <Muncul dy={10}>
          <Label x={70} y={164} w={160} teks="banyak → satu" ukuran={15} />
        </Muncul>
      ) : null}
      {k === 2 ? <Sorot x={26} y={54} w={248} h={86} /> : null}
      {k === 3 ? <Tanya x={266} y={168} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Segi enam ----------------------- */

function B2_2({ k }: PropsAdegan) {
  const mendatar = k <= 1;
  const rapat = k === 1 || k === 3;
  const set = mendatar ? HEX_MENDATAR : HEX_TEGAK;
  const skala = mendatar ? 2.2 : 1.7;
  const ox = mendatar ? 62 : 82;
  const oy = mendatar ? -5 : 50;
  const geser: [number, number][] = mendatar ? [[-18, 0], [0, 0], [18, 0]] : [[0, -14], [0, 0], [0, 14]];
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {set.map((p, i) => (
        <Gerak key={`${mendatar}-${i}`} x={rapat ? 0 : geser[i][0]} y={rapat ? 0 : geser[i][1]} durasi={0.9}>
          <Pol titik={p} x={ox} y={oy} skala={skala} warna={WARNA_KEPING[[1, 3, 0][i]]} />
        </Gerak>
      ))}
      {k === 1 ? (
        <Muncul dy={10}>
          <Label x={74} y={164} w={152} teks="Segi enam" ukuran={15} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul dx={20}>
          <KartuTeks x={196} y={92} w={92} baris={["segitiga", "atas dan", "bawah"]} ukuran={12} warna="#FEF3C7" />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul dx={20}>
          <KartuTeks x={196} y={92} w={92} baris={["cara", "lain"]} ukuran={15} warna="#FCE7F3" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Hasil berbeda ------------------- */

function B2_3({ k }: PropsAdegan) {
  const [g1, g2] = [GABUNGAN_B[0], GABUNGAN_B[1]];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          {(["segitiga", "persegi", "segiEnam"] as const).map((id, i) => (
            <Muncul key={id} tunda={i * 0.2} dy={12}>
              <Sh id={id} x={30 + i * 86} y={70} w={70} warna={["#FDE68A", "#BFDBFE", "#FBCFE8"][i]} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <Muncul dy={-14}>
          <KartuTeks x={40} y={70} w={220} baris={["Cara menyusun", "memengaruhi hasil"]} ukuran={18} warna="#FEF3C7" />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <>
          <Pol titik={SEGITIGA_DASAR_B} x={106} y={60} skala={2.2} warna="#F9A8D4" />
          <Muncul dx={20}>
            <Pol titik={g1.keping2} x={106} y={60} skala={2.2} warna="#93C5FD" />
          </Muncul>
          <Muncul dy={10}>
            <Label x={90} y={160} w={120} teks="persegi" ukuran={16} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Pol titik={SEGITIGA_DASAR_B} x={114} y={124} skala={1.8} warna="#F9A8D4" />
          <Muncul dy={-16}>
            <Pol titik={g2.keping2} x={114} y={124} skala={1.8} warna="#93C5FD" />
          </Muncul>
          <Muncul dx={20}>
            <KartuTeks x={200} y={100} w={92} baris={["segitiga", "lebih besar"]} ukuran={12} warna="#FEF3C7" />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Mengenal tangram ---------------- */

function B3_1({ k }: PropsAdegan) {
  const rumah = RONDE_RAKIT_B[1];
  const perahu = RONDE_RAKIT_B[2];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k <= 2 ? (
        <Muncul skala={0.6}>
          <TangramG x={75} y={40} w={150} terurai={k === 0 ? 0 : 0.14} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul dy={10}>
          <Label x={34} y={176} w={232} teks="5 segitiga • 1 persegi • 1 miring" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul dy={-12}>
            {rumah.slot.map((s, i) => (
              <Pol key={`r${i}`} titik={s.titik} x={20} y={52} skala={1.15} warna={rumah.warna[i]} tebal={2.4} />
            ))}
          </Muncul>
          <Muncul dy={-12} tunda={0.3}>
            {perahu.slot.map((s, i) => (
              <Pol key={`p${i}`} titik={s.titik} x={162} y={52} skala={1.15} warna={perahu.warna[i]} tebal={2.4} />
            ))}
          </Muncul>
          <Muncul dy={10} tunda={0.6}>
            <Label x={26} y={170} w={110} teks="rumah" ukuran={14} />
            <Label x={166} y={170} w={110} teks="perahu" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Aturan main --------------------- */

const ATURAN = ["✅ Pakai semua keping", "🚫 Tidak bertumpuk", "🤝 Sisi menempel", "🔄 Putar dan balik"];

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <TangramG x={10} y={62} w={118} terurai={k === 1 ? 0.1 : 0} />
      {ATURAN.slice(0, k + 1).map((t, i) => (
        <Muncul key={t} dx={30}>
          <Label x={136} y={52 + i * 36} w={156} teks={t} ukuran={12} />
        </Muncul>
      ))}
      {k === 3 ? (
        <Muncul>
          <Lencana x={68} y={186} teks="↻" r={16} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Berlawanan ---------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Muncul skala={0.4}>
            <text x="150" y="120" textAnchor="middle" fontSize="70" fontWeight="900" fill="#1C01A5">
              ⇄
            </text>
          </Muncul>
          <Muncul dy={10}>
            <Label x={60} y={150} w={180} teks="saling berlawanan" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sh id="persegi" x={18} y={70} w={96} warna="#FDE68A" />
          <PanahG x1={120} y1={118} x2={158} y2={118} />
          <TangramG x={164} y={66} w={122} terurai={0.2} />
          <Muncul dy={10}>
            <Label x={58} y={172} w={184} teks="Mengurai: 1 → 7" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <TangramG x={12} y={66} w={122} terurai={0.2} />
          <PanahG x1={140} y1={118} x2={176} y2={118} />
          <TangramG x={180} y={70} w={104} />
          <Muncul dy={10}>
            <Label x={58} y={172} w={184} teks="Menyusun: 7 → 1" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <TangramG x={100} y={44} w={100} terurai={0.1} />
          <Lencana x={226} y={78} teks="7" r={26} />
          <Muncul dy={10}>
            <Label x={50} y={160} w={200} teks="Tetap 7 keping" ukuran={16} />
          </Muncul>
          <Tokoh x={36} y={198} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.6} angkat />
          <Tokoh x={266} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.6} angkat />
        </>
      ) : null}
      {k === 0 ? <Lup x={262} y={80} s={0.9} /> : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [B1_1, B1_2, B1_3],
  [B2_1, B2_2, B2_3],
  [B3_1, B3_2, B3_3],
];

export const ADEGAN_VIDEO_K2B3B = SUB_B3.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

export const VIDEO_SIAP_K2B3B: VideoSiap[] = SUB_B3.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B3B[i] }));

export function VideoK2B3B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_B3} videos={VIDEO_SIAP_K2B3B} speakGuru={speakGuru} />;
}
