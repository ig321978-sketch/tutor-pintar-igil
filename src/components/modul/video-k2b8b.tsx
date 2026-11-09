"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Angka, AwanData, BarisEmo, BarisLambangSvg, buatAdegan, BIRU, DaftarVideoCerita, Emo, LambangVideo, Orang, Panah, TabelSvg, Ucap, type VideoSiap } from "./video-k2b8-umum";
import { DATA, LAMBANG_SEMUA, aliran, kat } from "./data-k2b8";
import { SUB_B8 } from "./naskah-k2b8";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 8 Sub-Bab B: Diagram Gambar. Tiga video, sembilan    */
/* adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu sumber: */
/* naskah-k2b8.ts (SUB_B8.videos). Animasi SVG gratis di perangkat. Tanpa API.  */
/* Naskah: naskah/mtk-2-bab8-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B8.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B8.videos[v].adegan[a];

const BUAH = DATA.buah.kategori;
const BUNGA = DATA.bunga.kategori;
const KUE = DATA.kue.kategori;
const PERMAINAN = DATA.permainan.kategori;
const LARI = DATA.lari.kategori;
const Cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const SEMUA_BUAH = aliran(BUAH.map((b) => [b.id, b.n] as [string, number]), 0).map((id) => ({ e: kat("buah", id).ikon, s: 20 }));

/** Baris tabel berisi lambang polos. */
const barisBintang = (kt: typeof BUAH, jenis: (typeof LAMBANG_SEMUA)[number] = "bintang", tampilAngka = true) =>
  kt.map((x) => ({ nama: Cap(x.nama), isi: (t: number) => <BarisLambangSvg x={0} y={(t - 15) / 2} n={x.n} jenis={jenis} warna={x.warna} r={7.5} d={16.5} />, angka: tampilAngka ? x.n : undefined }));
/** Baris tabel berisi gambar benda. */
const barisEmo = (kt: typeof BUAH) => kt.map((x) => ({ nama: Cap(x.nama), isi: (t: number) => <BarisEmo x={0} y={(t - 14) / 2} n={x.n} e={x.ikon} s={14} d={15} />, angka: x.n }));

/* ------------------------- Video 1, adegan 1: Mengingat data buah ------------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k <= 1 ? <AwanData benda={SEMUA_BUAH} x={56} y={66} w={188} h={70} /> : null}
      {k === 0 ? (
        <>
          <Orang x={36} y={196} nama="lili" s={0.85} tampilNama={false} />
          <Ucap x={70} y={152} w={190} teks="Ingat buah kesukaan kita?" ukuran={11} />
        </>
      ) : null}
      {k === 1 ? (
        <Muncul tunda={0.2}>
          <Panah x1={150} y1={150} x2={150} y2={172} />
          <Label x={64} y={174} w={172} teks="diagram gambar" ukuran={13} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <>
          {BUAH.map((b, i) => (
            <Muncul key={b.id} tunda={i * 0.2} dx={-12}>
              <LambangVideo jenis="bintang" x={64} y={60 + i * 34} r={12} warna={b.warna} />
              <Emo x={108} y={60 + i * 34} e={b.ikon} s={24} />
              <text x={136} y={65 + i * 34} fontSize="14" fontWeight="900" fill={BIRU}>
                {b.nama}
              </text>
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.3}>
          <Emo x={248} y={104} e="🔢" s={46} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Satu bintang, satu buah ------------------------- */

function B1_2({ k }: PropsAdegan) {
  const tampil = [1, 2, 4, 4][k];
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <TabelSvg kepala={["Buah", "Banyak Anak", "Jml"]} baris={barisBintang(BUAH)} tampil={tampil} y={44} />
      {k === 3 ? (
        <>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1={96 + 16.5 * i + 7.5} y1={46} x2={96 + 16.5 * i + 7.5} y2={176} stroke={BIRU} strokeWidth="1" strokeDasharray="3 4" opacity="0.4" />
          ))}
          <Label x={40} y={182} w={220} teks="ukuran dan jarak sama" ukuran={13} />
        </>
      ) : (
        <Muncul key={k} tunda={0.3}>
          <Label x={50} y={182} w={200} teks={["1 bintang = 1 buah", "jeruk: 6 bintang", "apel 4, pisang 3", ""][k]} ukuran={13} />
        </Muncul>
      )}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Gambar lain boleh ------------------------- */

function B1_3({ k }: PropsAdegan) {
  const baris = LAMBANG_SEMUA.map((j, i) => ({ nama: ["Bintang", "Lingkaran", "Hati", "Senyum"][i], isi: (t: number) => <BarisLambangSvg x={0} y={(t - 15) / 2} n={4} jenis={j} warna={["#F59E0B", "#F43F5E", "#A78BFA", "#FACC15"][i]} r={7.5} d={17} /> }));
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <TabelSvg baris={baris} tampil={k === 0 ? 2 : 4} tampilAngka={false} y={46} tinggi={30} kolomNama={80} />
      {k === 1 ? <Label x={40} y={176} w={220} teks="1 gambar = 1 benda" ukuran={13} /> : null}
      {k === 2 ? <Label x={40} y={176} w={220} teks="gambar harus sama" ukuran={13} /> : null}
      {k === 3 ? <Label x={20} y={176} w={260} teks="Setiap gambar mewakili 1 anak." ukuran={12} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Tika merangkai bunga ------------------------- */

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k <= 2 ? (
        <>
          <path d="M92 118 H208 Q204 158 150 160 Q96 158 92 118 Z" fill="#EA580C" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
          <Orang x={48} y={196} nama="tika" s={0.9} tampilNama={false} />
        </>
      ) : null}
      {k >= 1 && k <= 2
        ? BUNGA.map((b, i) => (
            <Muncul key={b.id} tunda={i * 0.2} dy={-10}>
              <Emo x={112 + i * 26} y={102 - (i % 2) * 10} e={b.ikon} s={30} />
            </Muncul>
          ))
        : null}
      {k === 2 ? (
        <Muncul tunda={0.3}>
          <Label x={96} y={170} w={150} teks="mawar, lili, tulip, aster" ukuran={11} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <TabelSvg kepala={["Bunga", "Banyak Bunga", "Jml"]} baris={BUNGA.map((b) => ({ nama: Cap(b.nama) }))} tampilAngka={false} y={46} />
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Diagram bunga ------------------------- */

function B2_2({ k }: PropsAdegan) {
  const tampil = [1, 2, 4, 4][k];
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <TabelSvg kepala={["Bunga", "Banyak Bunga", "Jml"]} baris={barisEmo(BUNGA)} tampil={tampil} y={44} tinggi={30} />
      <Muncul key={k} tunda={0.3}>
        <Label x={40} y={182} w={220} teks={["mawar: 7 gambar", "lili: 4 gambar", "tulip 5, aster 4", "mudah dilihat paling banyak"][k]} ukuran={12} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Membaca diagram bunga ------------------------- */

function B2_3({ k }: PropsAdegan) {
  const sorot = [[0], [1, 3], [1, 2], [0, 3]][k];
  const teks = ["paling banyak: mawar", "lili dan aster sama banyak", "tulip 1 lebihnya dari lili", "aster 3 kurangnya dari mawar"][k];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <TabelSvg kepala={["Bunga", "Banyak Bunga", "Jml"]} baris={barisEmo(BUNGA)} sorot={sorot} y={44} tinggi={30} />
      {k === 0 ? (
        <Lompat>
          <Emo x={262} y={36} e="👑" s={24} />
        </Lompat>
      ) : null}
      <Muncul key={k} tunda={0.2}>
        <Label x={30} y={182} w={240} teks={teks} ukuran={12} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Kue kesukaan ------------------------- */

function B3_1({ k }: PropsAdegan) {
  const tampil = [1, 2, 4, 4][k];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <TabelSvg kepala={["Kue", "Banyak Anak", "Jml"]} baris={KUE.map((x) => ({ nama: Cap(x.nama), isi: (t: number) => <BarisLambangSvg x={0} y={(t - 15) / 2} n={x.n} jenis="bintang" warna="#F43F5E" r={7.5} d={16} />, angka: x.n }))} tampil={tampil} sorot={k === 3 ? [3] : []} y={44} />
      {k === 3 ? (
        <Lompat>
          <Emo x={262} y={36} e="👑" s={24} />
        </Lompat>
      ) : null}
      <Muncul key={k} tunda={0.3}>
        <Label x={30} y={182} w={240} teks={["kue cucur: 6 anak", "onde-onde: 5 anak", "setiap bintang = 1 anak", "paling banyak: kue talam"][k]} ukuran={12} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Permainan tradisional ------------------------- */

function B3_2({ k }: PropsAdegan) {
  const tampil = [1, 2, 4, 4][k];
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? <Orang x={44} y={196} nama="upe" s={0.85} tampilNama={false} /> : null}
      <TabelSvg x={k === 0 ? 74 : 14} w={k === 0 ? 212 : 272} kepala={["Permainan", "Banyak Anak", "Jml"]} baris={barisBintang(PERMAINAN, "lingkaran")} tampil={tampil} y={44} />
      <Muncul key={k} tunda={0.3}>
        <Label x={30} y={182} w={240} teks={["karet: 4 anak", "lompat tali: 6 anak", "petak umpet 5, benteng 7", "1 gambar = 1 anak"][k]} ukuran={12} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Para pelari ------------------------- */

function B3_3({ k }: PropsAdegan) {
  const tampil = [1, 2, 4, 4][k];
  const sorot = k === 2 ? [2, 3] : [];
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <TabelSvg kepala={["Putaran", "Banyak Siswa", "Jml"]} baris={barisBintang(LARI, "senyum")} tampil={tampil} sorot={sorot} y={44} />
      <Muncul key={k} tunda={0.3}>
        <Label x={30} y={182} w={240} teks={["14 siswa berlari", "5, 3, 4, dan 2 siswa", "lebih dari 2 putaran: 4 + 2 = 6", "baca dengan teliti"][k]} ukuran={12} />
      </Muncul>
      {k === 2 ? (
        <Muncul tunda={0.5}>
          <Angka x={262} y={184} teks="6" r={13} isi="#FFE566" />
        </Muncul>
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

export const ADEGAN_VIDEO_K2B8B = SUB_B8.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 1, k: 3 },
  { a: 0, k: 3 },
];

export const VIDEO_SIAP_K2B8B: VideoSiap[] = SUB_B8.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B8B[i], poster: POSTER[i] }));

export function VideoK2B8B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B8B} speakGuru={speakGuru} />;
}
