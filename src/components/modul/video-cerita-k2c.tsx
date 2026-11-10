"use client";

import React from "react";
import { BAWAH, BIRU, HIJAU, KUNING, MERAH_MUDA } from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { CERITA_K2C, CincinSepuluh, JalurKotak, KartuAngka, KelompokPermen, jarakPermen, Stoples } from "./gambar-banding-k2c";
import { Tokoh } from "./gambar-maju-mundur-c";
import { BatangG, KubusG, Label, TabelMini } from "./gambar-nilai-k2b";
import { kalimatDari, Lompat, Muncul, Papan, Sorot, tumbuh, type AdeganVideo, type PropsAdegan } from "./video-cerita";
import { DaftarVideoCerita } from "./daftar-video-cerita";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 1 Sub-Bab C: Membandingkan Dua Bilangan atau       */
/* Lebih. Naskah = CERITA_K2C. Tiga video (enam adegan) lewat DaftarVideoCerita. */
/* Naskah: naskah/mtk-2-bab1-video-cerita.md                                  */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";

/* ---------------------- Adegan 1: Stoples permen Kira -------------------- */

const PAPAN_1 = [
  "Kira berulang tahun!",
  "Satu stoples permen",
  "Bagi permen ke teman",
  "Berapa banyak permen?",
  "Tebakan Malosi",
  "Tebakan Halim",
  "Buktikan dengan menghitung",
];

function Adegan1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={PAPAN_1[k]} />
      <Muncul dx={-60} durasi={0.9}>
        <Lompat aktif={k === 0}>
          <Tokoh x={36} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.95} angkat={k <= 2} />
        </Lompat>
      </Muncul>
      {k === 0 ? (
        <>
          <Muncul dy={14}>
            <text x="68" y="110" fontSize="30" aria-hidden="true">
              🎂
            </text>
          </Muncul>
          <Muncul dy={14} tunda={0.3}>
            <text x="150" y="80" fontSize="22" aria-hidden="true">
              🎉
            </text>
          </Muncul>
          <Muncul dy={14} tunda={0.5}>
            <text x="234" y="96" fontSize="22" aria-hidden="true">
              🎈
            </text>
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <Muncul dy={-40}>
          <Stoples x={104} y={112} isi={16} s={1.05} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <>
          <Muncul dx={110} durasi={1}>
            <Tokoh x={198} y={202} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.74} angkat={k === 4} />
          </Muncul>
          <Muncul dx={140} durasi={1.2}>
            <Tokoh x={262} y={202} rambut={RAMBUT_COKELAT} baju={KUNING} s={0.74} angkat={k === 5} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? <Lencana x={104} y={60} teks="?" r={19} /> : null}
      {k >= 4 ? <Lencana x={196} y={96} teks="20?" r={20} /> : null}
      {k >= 5 ? <Lencana x={262} y={100} teks="30?" r={20} /> : null}
      {k === 6 ? (
        <Lompat>
          <text x="86" y="82" fontSize="30" aria-hidden="true">
            🔍
          </text>
        </Lompat>
      ) : null}
    </>
  );
}

/* ---------------------- Adegan 2: Menghitung permen ---------------------- */

const PAPAN_2 = ["Hitung permen di stoples", "Kelompokkan tiap sepuluh", "10, 20", "Sisanya: 21 sampai 26", "Ada 26 permen!"];

function Adegan2({ k, t }: PropsAdegan) {
  const sisa = k === 3 ? tumbuh(t, 0, 6, 1.7) : k >= 4 ? 6 : 0;
  return (
    <>
      <Papan teks={PAPAN_2[k]} />
      {k === 0 ? (
        <Muncul dy={-30}>
          <Stoples x={150} y={96} isi={16} s={1.35} />
        </Muncul>
      ) : null}
      {k >= 1 ? (
        <>
          <Muncul skala={0.6}>
            <CincinSepuluh x={32} y={68} />
            <KelompokPermen x={32} y={68} n={10} mulai={0} />
          </Muncul>
          <Muncul skala={0.6} tunda={0.5}>
            <CincinSepuluh x={166} y={68} />
            <KelompokPermen x={166} y={68} n={10} mulai={2} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <Muncul dy={10}>
            <Label x={46} y={102} w={44} teks="10" ukuran={14} />
          </Muncul>
          <Muncul dy={10} tunda={0.9}>
            <Label x={180} y={102} w={44} teks="20" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k >= 3
        ? Array.from({ length: sisa }, (_, i) => (
            <Muncul key={i} dy={-16} durasi={0.35}>
              <KelompokPermen x={74 + i * jarakPermen(0.72)} y={150} n={1} mulai={4 + i} />
              <text x={74 + i * jarakPermen(0.72)} y={174} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
                {21 + i}
              </text>
            </Muncul>
          ))
        : null}
      {k === 4 ? <Lencana x={258} y={146} teks="26" r={22} /> : null}
      <Lompat aktif={k === 4}>
        <Tokoh x={30} y={206} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.55} angkat />
      </Lompat>
    </>
  );
}

/* ------------------------ Adegan 3: Tebakan lebih dekat ------------------- */

const PAPAN_3 = [
  "Tebakan atau hitungan?",
  "Tebakan dan permen Kira",
  "Dari 20 maju: 6 langkah",
  "Dari 30 mundur: 4 langkah",
  "Tebakan Halim lebih dekat!",
  "Menebak itu boleh",
  "Menebak melatih berhitung",
];

function Adegan3({ k, t }: PropsAdegan) {
  const maju = k === 2 ? tumbuh(t, 0, 6, 1.7) : k > 2 ? 6 : 0;
  const mundur = k === 3 ? tumbuh(t, 0, 4, 1.7) : k > 3 ? 4 : 0;
  return (
    <>
      <Papan teks={PAPAN_3[k]} />
      <Muncul dy={20}>
        <JalurKotak x={18} y={118} dari={20} sorot={26} />
      </Muncul>
      {k >= 1 ? (
        <>
          <Muncul dy={12}>
            <Label x={4} y={150} w={104} teks="Tebakan Malosi" ukuran={10.5} />
          </Muncul>
          <Muncul dy={12} tunda={0.4}>
            <Label x={114} y={150} w={78} teks="Permen 26" ukuran={10.5} />
          </Muncul>
          <Muncul dy={12} tunda={0.8}>
            <Label x={196} y={150} w={100} teks="Tebakan Halim" ukuran={10.5} />
          </Muncul>
          <Muncul dy={-20} tunda={0.8}>
            <g className="igil-lompat" style={BAWAH}>
              <text x="138" y="205" fontSize="22" aria-hidden="true">
                🎯
              </text>
            </g>
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? <path d="M30 116 Q102 60 174 116" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" /> : null}
      {k >= 3 ? <path d="M270 116 Q222 70 174 116" fill="none" stroke="#E53E3E" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" /> : null}
      {Array.from({ length: maju }, (_, i) => (
        <Muncul key={`m${i}`} dy={-10} durasi={0.3}>
          <circle cx={18 + (i + 1) * 24 + 12} cy="108" r="7.4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.4" />
          <text x={18 + (i + 1) * 24 + 12} y="111.4" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF">
            {i + 1}
          </text>
        </Muncul>
      ))}
      {Array.from({ length: mundur }, (_, i) => (
        <Muncul key={`n${i}`} dy={-10} durasi={0.3}>
          <circle cx={18 + (10 - 1 - i) * 24 + 12} cy="108" r="7.4" fill="#E53E3E" stroke="#FFFFFF" strokeWidth="1.4" />
          <text x={18 + (10 - 1 - i) * 24 + 12} y="111.4" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF">
            {i + 1}
          </text>
        </Muncul>
      ))}
      {k >= 2 && k <= 3 ? (
        <Muncul key={k}>
          <Label x={k === 2 ? 52 : 176} y={k === 2 ? 60 : 72} w={100} teks={k === 2 ? "6 langkah" : "4 langkah"} ukuran={12} />
        </Muncul>
      ) : null}
      {k >= 4 ? (
        <Muncul dy={-14}>
          <Label x={104} y={74} w={92} teks="4 < 6" ukuran={18} />
        </Muncul>
      ) : null}
      {k >= 4 ? (
        <Lompat>
          <text x="256" y="130" fontSize="26" aria-hidden="true">
            ⭐
          </text>
        </Lompat>
      ) : null}
      <Lompat aktif={k >= 4}>
        <Tokoh x={30} y={206} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.5} angkat={k >= 5} />
      </Lompat>
      <Lompat aktif={k >= 4}>
        <Tokoh x={270} y={206} rambut={RAMBUT_COKELAT} baju={KUNING} s={0.5} angkat={k >= 4} />
      </Lompat>
    </>
  );
}

/* --------------------- Adegan 4 dan 5: Kira dan Tika ---------------------- */

function BendaKira() {
  return (
    <>
      <BatangG x={26} y={96} h={62} />
      <BatangG x={46} y={96} h={62} />
      {Array.from({ length: 6 }, (_, i) => (
        <KubusG key={i} x={80 + (i % 3) * 17} y={104 + Math.floor(i / 3) * 17} s={14} warna={i} />
      ))}
    </>
  );
}

function BendaTika() {
  return (
    <>
      <BatangG x={178} y={96} h={62} />
      <BatangG x={198} y={96} h={62} />
      <BatangG x={218} y={96} h={62} />
      {Array.from({ length: 2 }, (_, i) => (
        <KubusG key={i} x={252 + i * 17} y={104} s={14} warna={i + 2} />
      ))}
    </>
  );
}

const PAPAN_4 = [
  "Kira: 26 permen",
  "Tika: 32 permen",
  "Permen siapa lebih banyak?",
  "Mengapa?",
  "Tabel nilai tempat",
  "26 = 2 puluhan + 6 satuan",
  "32 = 3 puluhan + 2 satuan",
];

function Adegan4({ k, t }: PropsAdegan) {
  const pKiri = k >= 5 ? 2 : "";
  const sKiri = k >= 5 && (k > 5 || t > 1.4) ? 6 : "";
  const pKanan = k >= 6 ? 3 : "";
  const sKanan = k >= 6 && t > 1.4 ? 2 : "";
  const tabel = k >= 4;
  return (
    <>
      <Papan teks={PAPAN_4[k]} ukuran={k === 2 ? 12 : 13} />
      {!tabel ? (
        <>
          <Muncul dx={-50}>
            <Lompat aktif={k === 0}>
              <Tokoh x={70} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.95} angkat={k === 0} />
            </Lompat>
          </Muncul>
          {k >= 1 ? (
            <Muncul dx={50}>
              <Lompat aktif={k === 1}>
                <Tokoh x={230} y={198} rambut={RAMBUT_COKELAT} baju={KUNING} s={0.95} angkat={k === 1} />
              </Lompat>
            </Muncul>
          ) : null}
          <Muncul dy={10}>
            <Lencana x={70} y={118} teks="26" r={22} />
          </Muncul>
          {k >= 1 ? (
            <Muncul dy={10}>
              <Lencana x={230} y={118} teks="32" r={22} />
            </Muncul>
          ) : null}
          {k >= 2 ? <Lencana x={150} y={110} teks={k === 2 ? "?" : "?!"} r={22} /> : null}
        </>
      ) : (
        <>
          <Muncul dy={-24}>
            <g transform="translate(2 40) scale(0.94)">
              <TabelMini x={0} y={0} p={pKiri} s={sKiri} />
            </g>
          </Muncul>
          <Muncul dy={-24} tunda={0.3}>
            <g transform="translate(154 40) scale(0.94)">
              <TabelMini x={0} y={0} p={pKanan} s={sKanan} />
            </g>
          </Muncul>
          {k >= 5 ? (
            <Muncul dy={-24} dx={0}>
              <g transform="translate(0 10)">
                <BendaKira />
              </g>
            </Muncul>
          ) : null}
          {k >= 6 ? (
            <Muncul dy={-24}>
              <g transform="translate(0 10)">
                <BendaTika />
              </g>
            </Muncul>
          ) : null}
          <Label x={8} y={172} w={116} teks="Kira: 26 permen" ukuran={11} />
          <Label x={176} y={172} w={116} teks="Tika: 32 permen" ukuran={11} />
          {k === 5 ? <Sorot x={0} y={36} w={150} h={66} r={8} /> : null}
          {k === 6 ? <Sorot x={152} y={36} w={150} h={66} r={8} /> : null}
        </>
      )}
    </>
  );
}

const PAPAN_5 = [
  "Lihat kolom puluhan",
  "Mana yang lebih banyak?",
  "26: dua puluhan",
  "32: tiga puluhan",
  "32 punya lebih banyak puluhan",
  "Lebih banyak = lebih besar",
  "32 lebih besar dari 26",
  "26 lebih kecil dari 32",
];

function Adegan5({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={PAPAN_5[k]} ukuran={k === 4 ? 12 : 13} />
      <g transform="translate(2 40) scale(0.94)">
        <TabelMini x={0} y={0} p={2} s={6} />
      </g>
      <g transform="translate(154 40) scale(0.94)">
        <TabelMini x={0} y={0} p={3} s={2} />
      </g>
      <g transform="translate(0 10)">
        <BendaKira />
        <BendaTika />
      </g>
      {k === 0 ? (
        <>
          <Sorot x={0} y={57} w={75} h={38} r={7} />
          <Sorot x={152} y={57} w={75} h={38} r={7} />
        </>
      ) : null}
      {k === 1 ? <Lencana x={150} y={130} teks="?" r={19} /> : null}
      {k === 2 ? (
        <>
          <Sorot x={20} y={100} w={52} h={72} r={8} />
          <Muncul>
            <Label x={8} y={172} w={116} teks="2 puluhan" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Sorot x={172} y={100} w={72} h={72} r={8} />
          <Muncul>
            <Label x={176} y={172} w={116} teks="3 puluhan" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k >= 4 ? (
        <>
          <path d="M32 104 Q108 70 184 104" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeDasharray="4 4" strokeLinecap="round" />
          <path d="M52 104 Q128 60 204 104" fill="none" stroke="#16A34A" strokeWidth="2.6" strokeDasharray="4 4" strokeLinecap="round" />
          <ellipse cx="224.5" cy="136" rx="15" ry="36" fill="none" stroke="#E53E3E" strokeWidth="3" strokeDasharray="5 4" />
        </>
      ) : null}
      {k === 4 ? (
        <Muncul>
          <Label x={176} y={172} w={116} teks="lebih banyak" ukuran={11.5} />
        </Muncul>
      ) : null}
      {k === 5 ? (
        <>
          <Lompat>
            <text x="228" y="108" fontSize="26" aria-hidden="true">
              ⭐
            </text>
          </Lompat>
          <Muncul>
            <Label x={176} y={172} w={116} teks="lebih besar" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 6 ? (
        <Muncul>
          <Label x={104} y={174} w={92} teks="32 > 26" ukuran={18} />
        </Muncul>
      ) : null}
      {k === 7 ? (
        <Muncul>
          <Label x={104} y={174} w={92} teks="26 < 32" ukuran={18} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------ Adegan 6: Urutkan kartu ------------------------ */

const ACAK = [25, 12, 35, 21];
const URUT = [12, 21, 25, 35];
const PAPAN_6 = [
  "Empat kartu bilangan",
  "Mana yang paling kecil?",
  "12: hanya 1 puluhan",
  "Mana yang paling besar?",
  "35: tiga puluhan",
  "21 dan 25: lihat satuannya",
  "1 lebih kecil dari 5",
  "Urut dari yang paling kecil",
];

/** Batang puluhan dan satuan kecil di bawah kartu bilangan n. */
function BendaKartu({ n, i, satuan = false }: { n: number; i: number; satuan?: boolean }) {
  const puluhan = Math.floor(n / 10);
  const sisa = n % 10;
  const tengah = 16 + i * 70 + 28;
  const lebar = puluhan * 17 - 4;
  return (
    <Muncul dy={-12}>
      {Array.from({ length: puluhan }, (_, j) => (
        <BatangG key={j} x={tengah - lebar / 2 + j * 17} y={96} h={34} />
      ))}
      {satuan
        ? Array.from({ length: sisa }, (_, j) => <KubusG key={j} x={tengah - 27 + j * 11.5} y={138} s={9} warna={j} />)
        : null}
    </Muncul>
  );
}

function Adegan6({ k }: PropsAdegan) {
  const sorot = k === 2 ? [12] : k === 4 ? [35] : k === 5 || k === 6 ? [21, 25] : [];
  return (
    <>
      <Papan teks={PAPAN_6[k]} />
      {ACAK.map((n, i) => (
        <Muncul key={n} dy={-26} tunda={k === 0 ? i * 0.5 : 0}>
          <KartuAngka x={16 + i * 70} y={40} n={n} warna="#F9A8D4" />
        </Muncul>
      ))}
      {sorot.map((n) => (
        <Sorot key={n} x={13 + ACAK.indexOf(n) * 70} y={37} w={62} h={52} r={10} />
      ))}
      {k === 2 ? <BendaKartu n={12} i={ACAK.indexOf(12)} /> : null}
      {k === 4 ? <BendaKartu n={35} i={ACAK.indexOf(35)} /> : null}
      {k === 5 || k === 6 ? (
        <>
          <BendaKartu n={21} i={ACAK.indexOf(21)} satuan />
          <BendaKartu n={25} i={ACAK.indexOf(25)} satuan />
        </>
      ) : null}
      {k === 1 || k === 3 ? <Lencana x={150} y={128} teks="?" r={21} /> : null}
      {k === 6 ? (
        <Muncul>
          <Label x={104} y={160} w={92} teks="1 < 5" ukuran={18} />
        </Muncul>
      ) : null}
      {k >= 7 ? (
        <>
          <Muncul dy={-12}>
            <text x="150" y="104" textAnchor="middle" fontSize="22" aria-hidden="true">
              ⬇️
            </text>
          </Muncul>
          {URUT.map((n, i) => (
            <Muncul key={n} dy={-30} tunda={0.3 + i * 0.5}>
              <KartuAngka x={16 + i * 70} y={112} n={n} warna={i === 0 ? "#BBF7D0" : "#FDE68A"} />
            </Muncul>
          ))}
          {[0, 1, 2].map((i) => (
            <Muncul key={i} tunda={0.8 + i * 0.5}>
              <text x={16 + i * 70 + 63} y={144} textAnchor="middle" fontSize="20" fontWeight="900" fill="#E53E3E">
                &lt;
              </text>
            </Muncul>
          ))}
          <Muncul tunda={2.4}>
            <Label x={64} y={166} w={172} teks="dari yang paling kecil" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      <Lompat aktif={k === 7}>
        <Tokoh x={36} y={206} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.5} angkat={k === 7} />
      </Lompat>
      <Lompat aktif={k === 7}>
        <Tokoh x={266} y={206} rambut={RAMBUT_COKELAT} baju={MERAH_MUDA} s={0.5} angkat={k === 7} />
      </Lompat>
    </>
  );
}

/* ------------------------------ Susunan adegan --------------------------- */

const JUDUL_ADEGAN = ["Stoples permen Kira", "Menghitung permen", "Tebakan lebih dekat", "Kira dan Tika", "Kolom puluhan", "Urutkan kartu"];
const RENDER = [Adegan1, Adegan2, Adegan3, Adegan4, Adegan5, Adegan6];

export const ADEGAN_VIDEO_K2C: AdeganVideo[] = CERITA_K2C.map((c, i) => ({
  id: c.id,
  judul: JUDUL_ADEGAN[i],
  ketukan: kalimatDari(c.voiceNarration),
  render: (p) => RENDER[i](p),
  waktu: i === 1 || i === 2 || i === 3,
  minimal: i === 1 ? { 1: 2.6, 2: 3, 3: 4.6 } : i === 2 ? { 2: 4.4, 3: 3.4 } : i === 3 ? { 5: 3.4, 6: 3.4 } : undefined,
}));

export const VIDEO_SIAP_K2C = [
  {
    naskah: { id: "k2c-v1", judul: "Stoples Permen Kira", subjudul: "Tebak dan hitung · 2 adegan" },
    adegan: ADEGAN_VIDEO_K2C.slice(0, 2),
    poster: { a: 1, k: 3 },
  },
  {
    naskah: { id: "k2c-v2", judul: "Tebakan Lebih Dekat", subjudul: "Kira dan Tika · 2 adegan" },
    adegan: ADEGAN_VIDEO_K2C.slice(2, 4),
    poster: { a: 0, k: 4 },
  },
  {
    naskah: { id: "k2c-v3", judul: "Banding dan Urut", subjudul: "Puluhan dulu · urutkan kartu · 2 adegan" },
    adegan: ADEGAN_VIDEO_K2C.slice(4, 6),
    poster: { a: 1, k: 5 },
  },
];

export function VideoBandingK2C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2C} speakGuru={speakGuru} />;
}
