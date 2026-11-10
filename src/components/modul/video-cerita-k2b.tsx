"use client";

import React from "react";
import { BIRU, EMAS, HIJAU, KUNING } from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import { BatangG, CERITA_K2B, KubusG, Label, Satuan, TabelMini } from "./gambar-nilai-k2b";
import { Gerak, kalimatDari, Lompat, Muncul, Papan, Sorot, tumbuh, type AdeganVideo, type PropsAdegan } from "./video-cerita";
import { DaftarVideoCerita } from "./daftar-video-cerita";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 1 Sub-Bab B: Nilai Tempat (puluhan dan satuan).   */
/* Naskah = CERITA_K2B. Tiga video (enam adegan) lewat DaftarVideoCerita.     */
/* Naskah: naskah/mtk-2-bab1-video-cerita.md                                  */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";

/* ----------------------------- Adegan 1: Main balok ---------------------- */

const SEBAR: [number, number][] = [
  [96, 60], [124, 84], [152, 56], [180, 88], [208, 62], [236, 90], [108, 112], [138, 130], [168, 112], [198, 134],
  [226, 116], [124, 156], [156, 150], [190, 160],
];

const PAPAN_1 = [
  "Malosi main balok",
  "Balok berserakan",
  "Berapa balokku?",
  "Lama dan mudah salah",
  "Cara lebih rapi: nilai tempat",
  "Puluhan dan satuan",
  "Ayo lihat caranya!",
];

function Adegan1({ k, t }: PropsAdegan) {
  const hitung = k === 3 ? tumbuh(t, 0, 14, 2.6) : 0;
  return (
    <>
      <Papan teks={PAPAN_1[k]} />
      <Gerak x={k >= 0 ? 0 : -110} durasi={1.2}>
        <Lompat aktif={k === 6}>
          <Tokoh x={44} y={192} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.92} angkat={k === 2 || k === 6} />
        </Lompat>
      </Gerak>
      {k >= 1 && k <= 3
        ? SEBAR.map(([x, y], i) => (
            <Muncul key={i} dy={-20} tunda={k === 1 ? i * 0.1 : 0} durasi={0.45}>
              <KubusG x={x} y={y} s={17} warna={i} />
            </Muncul>
          ))
        : null}
      {k === 3
        ? SEBAR.slice(0, hitung).map(([x, y], i) => (
            <g key={i}>
              <circle cx={x + 8.5} cy={y + 8.5} r="6.6" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.3" />
              <text x={x + 8.5} y={y + 11.8} textAnchor="middle" fontSize="8.6" fontWeight="900" fill={BIRU}>
                {i + 1}
              </text>
            </g>
          ))
        : null}
      {k === 2 ? <Lencana x={50} y={92} teks="?" r={20} /> : null}
      {k === 3 ? (
        <Muncul tunda={3.4}>
          <text x="50" y="104" textAnchor="middle" fontSize="30" aria-hidden="true">
            ❌
          </text>
        </Muncul>
      ) : null}
      {k >= 4 ? (
        <Muncul dy={-24}>
          <TabelMini x={130} y={34} p="" s="" />
        </Muncul>
      ) : null}
      {k >= 5 ? (
        <>
          <Muncul dy={-30}>
            <BatangG x={160} y={104} h={66} />
          </Muncul>
          <Muncul tunda={0.4}>
            <Satuan x={200} y={134} n={4} s={15} jarak={18} kolom={4} />
          </Muncul>
          <Muncul tunda={0.7}>
            <Label x={128} y={176} w={70} teks="puluhan" ukuran={11.5} />
          </Muncul>
          <Muncul tunda={0.9}>
            <Label x={206} y={176} w={70} teks="satuan" ukuran={11.5} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Adegan 2: Satu puluhan -------------------- */

const PAPAN_2 = [
  "10 balok jadi 1 batang",
  "1 batang = 1 puluhan",
  "Sisanya disebut satuan",
  "1 puluhan dan 4 satuan",
  "Tabel nilai tempat",
  "Tulis di kolomnya",
  "1 puluhan + 4 satuan = 14",
];

function Adegan2({ k, t }: PropsAdegan) {
  const batang = k > 0 || t > 2.2;
  return (
    <>
      <Papan teks={PAPAN_2[k]} />
      {!batang ? (
        <Muncul>
          <Satuan x={26} y={62} n={10} s={17} jarak={21} kolom={5} />
        </Muncul>
      ) : null}
      {batang ? (
        <Muncul dy={-10} skala={0.7}>
          <BatangG x={44} y={54} h={84} />
        </Muncul>
      ) : null}
      {k === 1 || k === 3 ? <Sorot x={36} y={48} w={30} h={96} r={8} /> : null}
      {k >= 1 ? (
        <Muncul tunda={0.2}>
          <Label x={8} y={146} w={82} teks="1 puluhan" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <Muncul>
          <text x="51" y="47" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={BIRU}>
            10 balok
          </text>
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dx={20}>
          <Satuan x={92} y={96} n={4} s={17} jarak={21} kolom={4} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul tunda={0.5}>
          <Label x={100} y={146} w={80} teks="4 satuan" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? <Sorot x={88} y={92} w={92} h={26} r={8} /> : null}
      {k >= 4 ? (
        <Muncul dy={-20}>
          <TabelMini x={150} y={34} p={k >= 5 ? 1 : ""} s={k >= 5 && (k > 5 || t > 1.8) ? 4 : ""} />
        </Muncul>
      ) : null}
      {k === 5 ? <Sorot x={148} y={52} w={74} h={38} r={7} /> : null}
      {k === 5 && t > 1.8 ? <Sorot x={226} y={52} w={74} h={38} r={7} /> : null}
      {k >= 6 ? <Lencana x={226} y={126} teks="14" r={22} /> : null}
      {k >= 6 ? (
        <Muncul tunda={0.3}>
          <Label x={152} y={158} w={140} teks="1 puluhan + 4 satuan" ukuran={11} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ----------------------- Adegan 3: Dua puluhan delapan satuan ------------- */

const PAPAN_3 = [
  "Tabel nilai tempat",
  "Kiri: puluhan, kanan: satuan",
  "2 batang dan 8 balok",
  "Tulis di tabel",
  "2 puluhan + 8 satuan = 28",
  "Kiri = puluhan, kanan = satuan",
];

function Adegan3({ k, t }: PropsAdegan) {
  const p = k >= 3 ? 2 : "";
  const s = k >= 3 && (k > 3 || t > 1.8) ? 8 : "";
  return (
    <>
      <Papan teks={PAPAN_3[k]} />
      <Muncul dy={-24}>
        <TabelMini x={150} y={36} p={p} s={s} />
      </Muncul>
      {k === 1 && t < 2 ? <Sorot x={148} y={54} w={74} h={38} r={7} /> : null}
      {k === 1 && t >= 2 ? <Sorot x={226} y={54} w={74} h={38} r={7} /> : null}
      {k >= 2 ? (
        <>
          <Muncul dy={-30}>
            <BatangG x={24} y={50} h={78} />
          </Muncul>
          <Muncul dy={-30} tunda={0.3}>
            <BatangG x={44} y={50} h={78} />
          </Muncul>
          {Array.from({ length: 8 }, (_, i) => (
            <Muncul key={i} dy={-16} tunda={0.7 + i * 0.18}>
              <KubusG x={72 + (i % 4) * 18} y={76 + Math.floor(i / 4) * 18} s={15} warna={i} />
            </Muncul>
          ))}
          <Muncul tunda={0.5}>
            <Label x={6} y={134} w={78} teks="2 puluhan" ukuran={11} />
          </Muncul>
          <Muncul tunda={1.6}>
            <Label x={90} y={134} w={70} teks="8 satuan" ukuran={11} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? <Sorot x={148} y={54} w={74} h={38} r={7} /> : null}
      {k === 3 && t > 1.8 ? <Sorot x={226} y={54} w={74} h={38} r={7} /> : null}
      {k === 4 ? <Lencana x={226} y={128} teks="28" r={24} /> : null}
      {k === 4 ? (
        <Muncul>
          <Label x={150} y={164} w={146} teks="2 puluhan + 8 satuan" ukuran={11} />
        </Muncul>
      ) : null}
      {k === 5 ? (
        <>
          <Muncul>
            <Label x={166} y={100} w={52} teks="← kiri" ukuran={11} />
          </Muncul>
          <Muncul tunda={0.3}>
            <Label x={232} y={100} w={64} teks="kanan →" ukuran={11} />
          </Muncul>
          <Muncul tunda={0.6}>
            <Label x={166} y={134} w={130} teks="2 = banyak puluhan" ukuran={10.5} />
          </Muncul>
          <Muncul tunda={1.1}>
            <Label x={166} y={166} w={130} teks="8 = banyak satuan" ukuran={10.5} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* --------------------- Adegan 4: Cara 1, 26 satuan --------------------- */

const PAPAN_4 = [
  "Malosi punya 26 balok",
  "Menulis 26 dengan tiga cara",
  "Cara 1: semua balok lepas",
  "0 puluhan dan 26 satuan",
  "26 adalah 26 satuan",
  "Benar, tetapi harus dihitung satu per satu",
];

function Adegan4({ k, t }: PropsAdegan) {
  const hitung = k === 5 ? tumbuh(t, 0, 26, 6) : 0;
  return (
    <>
      <Papan teks={PAPAN_4[k]} ukuran={k === 5 ? 11 : 13} />
      {Array.from({ length: 26 }, (_, i) => (
        <Muncul key={i} dy={-18} tunda={k === 0 ? i * 0.07 : 0} durasi={0.4}>
          <KubusG x={10 + (i % 9) * 17} y={50 + Math.floor(i / 9) * 17} s={14} warna={i} />
        </Muncul>
      ))}
      {k === 5
        ? Array.from({ length: hitung }, (_, i) => (
            <g key={i}>
              <circle cx={10 + (i % 9) * 17 + 7} cy={50 + Math.floor(i / 9) * 17 + 7} r="5.6" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.1" />
              <text x={10 + (i % 9) * 17 + 7} y={50 + Math.floor(i / 9) * 17 + 10} textAnchor="middle" fontSize="7.4" fontWeight="900" fill={BIRU}>
                {i + 1}
              </text>
            </g>
          ))
        : null}
      {k === 0 || k === 4 ? <Lencana x={256} y={78} teks="26" r={20} /> : null}
      {k === 1 ? (
        <>
          <Muncul dy={16}>
            <Label x={10} y={118} w={88} teks="Cara 1" ukuran={14} />
          </Muncul>
          <Muncul dy={16} tunda={0.6}>
            <Label x={106} y={118} w={88} teks="Cara 2" ukuran={14} />
          </Muncul>
          <Muncul dy={16} tunda={1.2}>
            <Label x={202} y={118} w={88} teks="Cara 3" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? <Sorot x={6} y={46} w={158} h={58} r={8} /> : null}
      {k >= 3 ? (
        <Muncul dy={-16}>
          <TabelMini x={150} y={112} p={0} s={26} />
        </Muncul>
      ) : null}
      {k === 3 ? <Sorot x={146} y={130} w={78} h={40} r={7} /> : null}
      {k === 4 ? (
        <Muncul>
          <Label x={154} y={172} w={138} teks="26 satuan" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 5 ? (
        <Muncul tunda={0.2}>
          <Label x={152} y={176} w={140} teks="Benar ✓" ukuran={14} />
        </Muncul>
      ) : null}
      <Lompat aktif={k === 4}>
        <Tokoh x={52} y={204} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.66} angkat={k === 4} />
      </Lompat>
    </>
  );
}

/* -------------------- Adegan 5: Cara 2, 1 puluhan 16 satuan ----------------- */

const PAPAN_5 = [
  "Cara 2",
  "Susun 10 balok jadi 1 batang",
  "Sisanya 16 balok lepas",
  "1 puluhan dan 16 satuan",
  "26 = 1 puluhan + 16 satuan",
  "Periksa: 10 + 16 = 26",
  "Benar, tetapi masih bisa disusun lagi",
];

function Adegan5({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={PAPAN_5[k]} ukuran={k === 6 ? 11.5 : 13} />
      {k === 0 ? (
        <Satuan x={10} y={50} n={26} s={14} jarak={17} kolom={9} />
      ) : (
        <>
          <Muncul dy={-12} skala={0.7}>
            <BatangG x={22} y={44} h={84} />
          </Muncul>
          <Satuan x={56} y={50} n={16} s={14} jarak={17} kolom={8} />
        </>
      )}
      {k === 2 ? <Sorot x={52} y={46} w={142} h={58} r={8} /> : null}
      {k === 2 ? (
        <Muncul>
          <Label x={60} y={112} w={118} teks="16 balok lepas" ukuran={12} />
        </Muncul>
      ) : null}
      {k >= 3 ? (
        <Muncul dy={-16}>
          <TabelMini x={150} y={112} p={1} s={16} />
        </Muncul>
      ) : null}
      {k === 4 ? <Lencana x={256} y={74} teks="26" r={20} /> : null}
      {k === 5 ? (
        <Muncul>
          <Label x={176} y={84} w={116} teks="10 + 16 = 26 ✓" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 6 ? (
        <>
          <Sorot x={52} y={46} w={142} h={22} r={8} />
          <Sorot x={52} y={63} w={38} h={22} r={8} />
          <Muncul>
            <Label x={100} y={86} w={170} teks="10 balok masih bisa disusun" ukuran={10.5} />
          </Muncul>
        </>
      ) : null}
      <Lompat aktif={k === 4 || k === 5}>
        <Tokoh x={36} y={204} rambut={RAMBUT_COKELAT} baju={KUNING} s={0.6} angkat={k === 1} />
      </Lompat>
    </>
  );
}

/* ----------------- Adegan 6: Cara 3, 2 puluhan 6 satuan --------------------- */

const PAPAN_6 = [
  "Cara 3",
  "Susun semua yang bisa disusun",
  "2 batang dan 6 balok lepas",
  "2 puluhan dan 6 satuan",
  "26 = 2 puluhan + 6 satuan",
  "Paling ringkas: satuan kurang dari 10",
  "26 bisa ditulis dengan 3 cara",
  "Kita pakai 2 puluhan 6 satuan",
  "Jumlahnya sama: 26",
];

const TIGA_CARA: { judul: string; p: number; s: number }[] = [
  { judul: "Cara 1", p: 0, s: 26 },
  { judul: "Cara 2", p: 1, s: 16 },
  { judul: "Cara 3", p: 2, s: 6 },
];

function Adegan6({ k }: PropsAdegan) {
  const rangkuman = k >= 6;
  return (
    <>
      <Papan teks={PAPAN_6[k]} ukuran={k === 5 ? 11.5 : 13} />
      {!rangkuman ? (
        <>
          <BatangG x={22} y={44} h={84} />
          {k >= 1 ? (
            <Muncul dy={-14} skala={0.7}>
              <BatangG x={42} y={44} h={84} />
            </Muncul>
          ) : null}
          {k === 0 ? <Satuan x={56} y={50} n={16} s={14} jarak={17} kolom={8} /> : <Satuan x={76} y={70} n={6} s={16} jarak={20} kolom={3} />}
          {k === 2 ? (
            <>
              <Muncul>
                <Label x={10} y={134} w={70} teks="2 batang" ukuran={11.5} />
              </Muncul>
              <Muncul tunda={0.4}>
                <Label x={84} y={134} w={96} teks="6 balok lepas" ukuran={11.5} />
              </Muncul>
            </>
          ) : null}
          {k >= 3 ? (
            <Muncul dy={-16}>
              <TabelMini x={150} y={112} p={2} s={6} />
            </Muncul>
          ) : null}
          {k === 4 ? <Lencana x={256} y={74} teks="26" r={20} /> : null}
          {k === 5 ? (
            <>
              <Lompat>
                <text x="206" y="102" fontSize="28" aria-hidden="true">
                  ⭐
                </text>
              </Lompat>
              <Muncul>
                <Label x={96} y={168} w={142} teks="6 kurang dari 10 ✓" ukuran={11.5} />
              </Muncul>
            </>
          ) : null}
        </>
      ) : (
        <>
          {TIGA_CARA.map((c, i) => (
            <Muncul key={c.judul} dy={20} tunda={k === 6 ? i * 0.5 : 0}>
              <g transform={`translate(${6 + i * 99} 64) scale(0.64)`}>
                <TabelMini x={0} y={0} p={c.p} s={c.s} />
              </g>
              <Label x={20 + i * 99} y={38} w={64} teks={c.judul} ukuran={12} />
            </Muncul>
          ))}
          {k === 7 ? <Sorot x={200} y={34} w={96} h={80} r={8} /> : null}
          {k === 8
            ? TIGA_CARA.map((c, i) => (
                <Muncul key={c.judul} tunda={0.3 + i * 0.5}>
                  <text x={54 + i * 99} y="130" textAnchor="middle" fontSize="20" fontWeight="900" fill={EMAS} stroke={BIRU} strokeWidth="1.2" paintOrder="stroke">
                    = 26
                  </text>
                </Muncul>
              ))
            : null}
          {k === 8 ? <Lencana x={150} y={176} teks="26" r={22} /> : null}
        </>
      )}
      <Lompat aktif={k === 5 || k === 8}>
        <Tokoh x={k >= 6 ? 36 : 276} y={206} rambut={RAMBUT_GELAP} baju={EMAS} s={0.5} angkat={k === 8} />
      </Lompat>
    </>
  );
}

/* ------------------------------ Susunan adegan --------------------------- */

const JUDUL_ADEGAN = ["Malosi main balok", "Satu puluhan", "Dua puluhan delapan satuan", "Cara 1", "Cara 2", "Cara 3"];
const RENDER = [Adegan1, Adegan2, Adegan3, Adegan4, Adegan5, Adegan6];

export const ADEGAN_VIDEO_K2B: AdeganVideo[] = CERITA_K2B.map((c, i) => ({
  id: c.id,
  judul: JUDUL_ADEGAN[i],
  ketukan: kalimatDari(c.voiceNarration),
  render: (p) => RENDER[i](p),
  waktu: i === 0 || i === 1 || i === 2 || i === 3,
  minimal:
    i === 0
      ? { 1: 2.4, 3: 5.8, 5: 2.4 }
      : i === 1
        ? { 0: 3.4, 5: 3.4 }
        : i === 2
          ? { 1: 3.6, 2: 3.4, 3: 3.4 }
          : i === 3
            ? { 0: 3.4, 5: 5.2 }
            : undefined,
}));

export const VIDEO_SIAP_K2B = [
  {
    naskah: { id: "k2b-v1", judul: "Balok Malosi", subjudul: "Main balok · satu puluhan" },
    adegan: ADEGAN_VIDEO_K2B.slice(0, 2),
    poster: { a: 1, k: 4 },
  },
  {
    naskah: { id: "k2b-v2", judul: "Dua Puluhan", subjudul: "Tabel nilai tempat · cara 1" },
    adegan: ADEGAN_VIDEO_K2B.slice(2, 4),
    poster: { a: 0, k: 4 },
  },
  {
    naskah: { id: "k2b-v3", judul: "Tiga Cara Menulis", subjudul: "Cara 2 dan cara 3" },
    adegan: ADEGAN_VIDEO_K2B.slice(4, 6),
    poster: { a: 1, k: 6 },
  },
];

export function VideoNilaiK2B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B} speakGuru={speakGuru} />;
}
