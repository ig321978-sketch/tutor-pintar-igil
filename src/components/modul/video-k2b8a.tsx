"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { AwanData, BarisEmo, buatAdegan, BIRU, DaftarVideoCerita, Emo, Orang, Panah, TabelSvg, TurusSvg, Ucap, Angka, type VideoSiap } from "./video-k2b8-umum";
import { DATA, aliran, kat } from "./data-k2b8";
import { SUB_A8 } from "./naskah-k2b8";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 8 Sub-Bab A: Diagram Turus. Tiga video, sembilan    */
/* adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu sumber: */
/* naskah-k2b8.ts (SUB_A8.videos). Animasi SVG gratis di perangkat. Tanpa API.  */
/* Naskah: naskah/mtk-2-bab8-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A8.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A8.videos[v].adegan[a];

const BUAH = DATA.buah.kategori;
const HEWAN = DATA.hewan.kategori;
const MAINAN = DATA.mainan.kategori;
const SAYUR = DATA.sayur.kategori;
const BUNGA = DATA.bunga.kategori;
const Cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const barisTurus = (kt: typeof BUAH, tampilAngka = true) => kt.map((x) => ({ nama: Cap(x.nama), isi: (t: number) => <TurusSvg x={0} y={(t - 18) / 2} n={x.n} tinggi={18} jarak={5} />, angka: tampilAngka ? x.n : undefined }));

/* ------------------------- Video 1, adegan 1: Hari buah ------------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {k === 0 ? (
        <>
          <rect x="94" y="42" width="112" height="26" rx="8" fill="#16A34A" stroke={BIRU} strokeWidth="3" />
          <text x="150" y="60" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
            KANTIN SEHAT
          </text>
          <Orang x={66} y={150} nama="lili" s={0.85} tampilNama={false} />
          <Orang x={150} y={150} nama="tika" s={0.85} tampilNama={false} />
          <Orang x={234} y={150} nama="kira" s={0.85} tampilNama={false} />
          <rect x="18" y="124" width="264" height="16" rx="6" fill="#C08457" stroke={BIRU} strokeWidth="3" />
          <Muncul tunda={0.4}>
            <Emo x={100} y={118} e="🍎" s={22} />
            <Emo x={198} y={118} e="🍌" s={22} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          {BUAH.map((b, i) => (
            <Muncul key={b.id} tunda={i * 0.25} skala={0.5}>
              <Emo x={48 + i * 68} y={104} e={b.ikon} s={46} />
            </Muncul>
          ))}
          <Label x={40} y={148} w={220} teks="anggur, jeruk, apel, pisang" ukuran={12} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Lompat>
            <Emo x={96} y={104} e="🍊" s={78} />
          </Lompat>
          <Muncul tunda={0.4}>
            <Emo x={206} y={100} e="💪" s={56} />
          </Muncul>
          <Label x={60} y={152} w={180} teks="vitamin, tubuh sehat" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          {BUAH.map((b, i) => (
            <Emo key={b.id} x={62 + i * 58} y={64} e={b.ikon} s={30} />
          ))}
          <Lompat>
            <Emo x={150} y={120} e="❓" s={58} />
          </Lompat>
          <Label x={40} y={160} w={220} teks="paling disukai? berapa anak?" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Data buah ------------------------- */

const SEMUA_BUAH = aliran(BUAH.map((b) => [b.id, b.n] as [string, number]), 0).map((id) => ({ e: kat("buah", id).ikon, s: 22 }));

function A1_2({ k }: PropsAdegan) {
  const kotak = [
    [18, 44],
    [160, 44],
    [18, 100],
    [160, 100],
  ];
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? <AwanData benda={SEMUA_BUAH} x={44} y={60} w={212} h={92} /> : null}
      {k === 1 || k === 2
        ? BUAH.map((b, i) => (
            <Muncul key={b.id} tunda={i * 0.2} skala={0.6}>
              <rect x={kotak[i][0]} y={kotak[i][1]} width="122" height="48" rx="10" fill="#E0F2FE" stroke={BIRU} strokeWidth="3" />
              <text x={kotak[i][0] + 8} y={kotak[i][1] + 15} fontSize="11" fontWeight="900" fill={BIRU}>
                {Cap(b.nama)}
              </text>
              <BarisEmo x={kotak[i][0] + 6} y={kotak[i][1] + 22} n={b.n} e={b.ikon} s={14} d={16} />
              {k === 2 ? <Angka x={kotak[i][0] + 108} y={kotak[i][1] + 12} teks={String(b.n)} r={10} isi="#FFE566" /> : null}
            </Muncul>
          ))
        : null}
      {k === 3 ? <TabelSvg kepala={["Nama Buah", "Turus", "Banyak"]} baris={barisTurus(BUAH)} y={46} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Mengenal turus ------------------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Muncul key={i} tunda={i * 0.15} dy={-8}>
              <rect x={112 + i * 16} y={62} width="9" height="74" rx="4" fill="#C08457" stroke={BIRU} strokeWidth="2.4" />
            </Muncul>
          ))}
          <rect x="106" y="92" width="96" height="9" rx="4" fill="#EF4444" stroke={BIRU} strokeWidth="2" />
          <Label x={80} y={150} w={140} teks="seperti lidi" ukuran={14} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          {[1, 2, 3].map((n, i) => (
            <Muncul key={n} tunda={i * 0.3} dx={-10}>
              <Emo x={44} y={68 + i * 40} e="🍊" s={26} />
              <text x={70} y={74 + i * 40} fontSize="12" fontWeight="900" fill={BIRU}>
                {n} jeruk
              </text>
              <TurusSvg x={150} y={58 + i * 40} n={n} tinggi={22} jarak={9} tebal={3.4} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul skala={0.6}>
            <TurusSvg x={92} y={60} n={5} tinggi={64} jarak={19} tebal={5.4} />
          </Muncul>
          <Label x={84} y={146} w={132} teks="lima benda" ukuran={14} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <TurusSvg x={40} y={64} n={10} tinggi={54} jarak={13} tebal={4.6} />
          <Sorot x={34} y={54} w={62} h={72} />
          <Sorot x={98} y={54} w={62} h={72} />
          <Muncul tunda={0.3}>
            <Label x={70} y={140} w={160} teks="kelompok lima" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Peternakan ------------------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <path d="M150 70 L205 44 L260 70 Z" fill="#B91C1C" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
          <rect x="156" y="70" width="98" height="70" fill="#C08457" stroke={BIRU} strokeWidth="3" />
          <rect x="190" y="98" width="30" height="42" rx="4" fill="#7C3F12" stroke={BIRU} strokeWidth="2.4" />
          <Orang x={70} y={178} nama="paman" s={1.15} tampilNama={false} angkat />
          <Label x={32} y={184} w={96} teks="Paman Halim" ukuran={11} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          {HEWAN.map((h, i) => (
            <Muncul key={h.id} tunda={i * 0.25} skala={0.5}>
              <Emo x={48 + i * 68} y={96} e={h.ikon} s={44} />
              <text x={48 + i * 68} y={136} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                {h.nama}
              </text>
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <>
          <TabelSvg kepala={["Nama Hewan", "Turus", "Banyak"]} baris={HEWAN.map((h) => ({ nama: Cap(h.nama) }))} tampilAngka={false} y={46} />
          <Label x={50} y={182} w={200} teks="hitung, lalu catat" ukuran={13} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <TabelSvg
            kepala={["Nama Hewan", "Turus", "Banyak"]}
            baris={HEWAN.map((h, i) => ({ nama: Cap(h.nama), isi: i === 0 ? (t: number) => <TurusSvg x={0} y={(t - 18) / 2} n={1} /> : undefined }))}
            tampilAngka={false}
            y={46}
          />
          <Emo x={238} y={72} e="✏️" s={22} />
          <Label x={40} y={182} w={220} teks="satu hewan, satu garis" ukuran={13} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Membuat turus ------------------------- */

const LABEL_A22 = ["10: dua kelompok lima", "8: satu kelompok lima, tiga garis", "6: satu kelompok lima, satu garis", "11: dua kelompok lima, satu garis"];

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <TabelSvg kepala={["Nama Hewan", "Turus", "Banyak"]} baris={barisTurus(HEWAN)} tampil={k + 1} sorot={[k]} y={44} />
      <Muncul key={k} tunda={0.2}>
        <Label x={20} y={180} w={260} teks={LABEL_A22[k]} ukuran={11} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Membaca diagram ------------------------- */

function A2_3({ k }: PropsAdegan) {
  const sorot = [[3], [0, 3], [0, 3], [1, 2]][k];
  const teks = ["paling banyak: bebek", "bebek 1 lebihnya dari ayam", "ayam 1 kurangnya dari bebek", "kambing 2 lebihnya dari sapi"][k];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <TabelSvg kepala={["Nama Hewan", "Turus", "Banyak"]} baris={barisTurus(HEWAN)} sorot={sorot} y={44} />
      {k === 0 ? (
        <Lompat>
          <Emo x={262} y={36} e="👑" s={24} />
        </Lompat>
      ) : null}
      <Muncul key={k} tunda={0.2}>
        <Label x={30} y={180} w={240} teks={teks} ukuran={12} />
      </Muncul>
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Bertanya kepada teman ------------------------- */

function A3_1({ k }: PropsAdegan) {
  const jeruk = BUAH[1];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={70} y={190} nama="kira" s={1.1} tampilNama={false} angkat />
          <Ucap x={100} y={62} w={176} teks="Buah apa yang kamu suka?" ukuran={11} />
          <Orang x={240} y={190} nama="malosi" s={0.95} tampilNama={false} />
        </>
      ) : null}
      {k === 1 ? (
        <>
          {Array.from({ length: 15 }, (_, i) => (
            <Muncul key={i} tunda={i * 0.07} dy={-6}>
              <circle cx={30 + (i % 8) * 34} cy={84 + Math.floor(i / 8) * 40} r="13" fill={["#FBCFE8", "#BAE6FD", "#FDE68A", "#BBF7D0"][i % 4]} stroke={BIRU} strokeWidth="2.6" />
              <circle cx={25 + (i % 8) * 34} cy={81 + Math.floor(i / 8) * 40} r="1.6" fill={BIRU} />
              <circle cx={35 + (i % 8) * 34} cy={81 + Math.floor(i / 8) * 40} r="1.6" fill={BIRU} />
            </Muncul>
          ))}
          <Label x={50} y={172} w={200} teks="lima belas teman" ukuran={13} />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Orang x={44} y={196} nama="kira" s={0.85} tampilNama={false} />
          <TabelSvg x={90} y={40} w={198} tinggi={26} kolomNama={58} kolomAngka={30} kepala={["Buah", "Turus", "Banyak"]} baris={BUAH.map((b) => ({ nama: Cap(b.nama), isi: b.id === jeruk.id ? (t: number) => <TurusSvg x={0} y={(t - 18) / 2} n={1} jarak={5} /> : undefined }))} tampilAngka={false} sorot={[1]} />
          <Ucap x={92} y={168} w={150} teks="Aku suka jeruk!" ukuran={11} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={150} y={90} e="✏️" s={56} />
          </Lompat>
          <Label x={50} y={140} w={200} teks="catat dengan tertib" ukuran={14} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Data mainan Kira ------------------------- */

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Orang x={50} y={190} nama="kira" s={1} tampilNama={false} />
          {MAINAN.map((m, i) => (
            <Muncul key={m.id} tunda={i * 0.2} skala={0.5}>
              <Emo x={110 + i * 46} y={110} e={m.ikon} s={36} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k >= 1 ? (
        <TabelSvg kepala={["Mainan", "Turus", "Banyak"]} baris={barisTurus(MAINAN, k >= 2)} sorot={k === 3 ? [3] : []} y={44} />
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={262} y={36} e="👑" s={24} />
          </Lompat>
          <Label x={30} y={182} w={240} teks="paling banyak: mainan balok" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Sayur dan bunga ------------------------- */

function JajarData({ y, data, sorot = [] }: { y: number; data: typeof SAYUR; sorot?: number[] }) {
  return (
    <>
      {data.map((d, i) => (
        <Muncul key={d.id} tunda={i * 0.12} dy={-6}>
          <Emo x={48 + i * 68} y={y} e={d.ikon} s={32} />
          <text x={48 + i * 68} y={y + 26} textAnchor="middle" fontSize="10" fontWeight="900" fill={BIRU}>
            {d.nama}
          </text>
          <Angka x={48 + i * 68} y={y + 44} teks={String(d.n)} r={11} isi={sorot.includes(i) ? "#FFE566" : "#FFFFFF"} />
        </Muncul>
      ))}
      {sorot.map((i) => (
        <Sorot key={i} x={48 + i * 68 - 30} y={y - 20} w={60} h={80} />
      ))}
    </>
  );
}

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? <JajarData y={72} data={SAYUR} /> : null}
      {k === 1 ? <JajarData y={72} data={BUNGA} /> : null}
      {k === 2 ? (
        <>
          <JajarData y={72} data={BUNGA} sorot={[1, 3]} />
          <Label x={60} y={168} w={180} teks="lili dan aster sama banyak" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <JajarData y={72} data={BUNGA} sorot={[0, 3]} />
          <Panah x1={48} y1={150} x2={252} y2={150} />
          <Label x={50} y={160} w={200} teks="mawar 3 lebihnya dari aster" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [A1_1, A1_2, A1_3],
  [A2_1, A2_2, A2_3],
  [A3_1, A3_2, A3_3],
];

export const ADEGAN_VIDEO_K2B8A = SUB_A8.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 1, k: 3 },
  { a: 1, k: 3 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K2B8A: VideoSiap[] = SUB_A8.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B8A[i], poster: POSTER[i] }));

export function VideoK2B8A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B8A} speakGuru={speakGuru} />;
}
