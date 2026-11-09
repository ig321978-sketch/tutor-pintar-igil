"use client";

import React from "react";
import { BIRU, HIJAU, MERAH_MUDA } from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Label } from "./gambar-nilai-k2b";
import { Tokoh } from "./gambar-maju-mundur-c";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { BENTUK, jalurBentuk, type Titik } from "./data-k2b3";
import { buatAdegan, DaftarVideoCerita, KartuTeks, ObjDatar, PanahG, SarangG, Sh, Lup, Tanya, Teks, type VideoSiap } from "./video-k2b3-umum";
import { SUB_A3 } from "./naskah-k2b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 3 Sub-Bab A: Bangun Datar. Tiga video, sembilan     */
/* adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu        */
/* sumber: naskah-k2b3.ts (SUB_A3.videos). Animasi SVG gratis di perangkat     */
/* siswa. Tanpa API. Naskah: naskah/mtk-2-bab3-video-cerita.md                 */
/* ------------------------------------------------------------------------ */

const RAMBUT_GELAP = "#1F2937";
const RAMBUT_COKELAT = "#7A4A1E";

const papan = (v: number, a: number) => SUB_A3.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A3.videos[v].adegan[a];

/* ------------------------- Video 1, adegan 1: Paman datang -------------------- */

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Lompat aktif={k >= 2}>
        <Tokoh x={62} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.95} angkat={k >= 2} />
      </Lompat>
      <Muncul dx={50}>
        <Tokoh x={238} y={198} rambut={RAMBUT_COKELAT} baju="#60A5FA" s={1.05} />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={-16}>
          <g>
            <rect x="166" y="160" width="30" height="34" rx="6" fill="#FDE68A" stroke={BIRU} strokeWidth="2.6" />
            <rect x="164" y="154" width="34" height="9" rx="3" fill="#92400E" stroke={BIRU} strokeWidth="2.2" />
            <text x="181" y="182" textAnchor="middle" fontSize="9" fontWeight="900" fill={BIRU}>
              Madu
            </text>
          </g>
        </Muncul>
      ) : null}
      {k >= 2 ? <Lencana x={62} y={84} teks="Baru!" r={24} /> : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.3}>
            <SarangG x={150} y={102} s={1.15} />
          </Muncul>
          <Sorot x={96} y={50} w={108} h={104} />
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Permukaan segi enam ------------- */

function A1_2({ k }: PropsAdegan) {
  const hex = BENTUK.segiEnam.titik as readonly Titik[];
  const besar = k === 0;
  const w = besar ? 130 : 78;
  const ox = besar ? 85 : 212;
  const oy = besar ? 46 : 52;
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <Sh id="segiEnam" x={ox} y={oy} w={w} warna="#FBBF24" />
      {besar
        ? hex.map((p, i) => {
            const q = hex[(i + 1) % 6];
            const mx = (p[0] + q[0]) / 2;
            const my = (p[1] + q[1]) / 2;
            const bx = ox + (50 + (mx - 50) * 1.3) * (w / 100);
            const by = oy + (50 + (my - 50) * 1.3) * (w / 100);
            return (
              <Muncul key={i} tunda={i * 0.25}>
                <circle cx={bx} cy={by} r="9" fill="#FFE566" stroke={BIRU} strokeWidth="2.2" />
                <text x={bx} y={by + 4.5} textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
                  {i + 1}
                </text>
              </Muncul>
            );
          })
        : null}
      {k >= 1 ? (
        <Lompat aktif={k === 1}>
          <Tokoh x={60} y={198} rambut={RAMBUT_GELAP} baju={MERAH_MUDA} s={0.95} angkat={k >= 2} />
        </Lompat>
      ) : null}
      {k === 1 ? (
        <Muncul>
          <Label x={96} y={70} w={104} teks="Tidak sabar!" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul dy={10}>
          <Label x={14} y={64} w={160} teks="Madu menyehatkan" ukuran={13} />
          <text x="40" y="116" fontSize="26" aria-hidden="true">
            💪
          </text>
          <text x="110" y="116" fontSize="26" aria-hidden="true">
            💛
          </text>
        </Muncul>
      ) : null}
      {k === 3 ? <Tanya x={140} y={96} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Ayo cari bentuk ----------------- */

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k < 2 ? (
        <>
          <Muncul dy={-14}>
            <ObjDatar id="jamDinding" x={36} y={62} w={52} />
          </Muncul>
          <Muncul dy={-14} tunda={0.15}>
            <ObjDatar id="jendela" x={212} y={62} w={52} />
          </Muncul>
          <Muncul dy={14} tunda={0.3}>
            <ObjDatar id="piring" x={124} y={126} w={52} />
          </Muncul>
          {k === 0 ? <Lup x={150} y={86} s={1.3} /> : null}
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sorot x={30} y={56} w={64} h={64} />
          <Muncul>
            <Label x={14} y={130} w={90} teks="6 sisi?" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          {(["segitiga", "persegi", "segiLima", "segiEnam", "lingkaran"] as const).map((id, i) => (
            <Muncul key={id} tunda={i * 0.15} dy={12}>
              <Sh id={id} x={14 + i * 56} y={80} w={44} warna={["#FDE68A", "#BFDBFE", "#BBF7D0", "#FBCFE8", "#DDD6FE"][i]} />
            </Muncul>
          ))}
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Tiga bentuk dasar --------------- */

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Muncul dy={-16}>
        <Sh id="segitiga" x={26} y={62} w={76} warna="#FDE68A" />
      </Muncul>
      <Muncul dy={-16} tunda={0.2}>
        <Sh id="persegi" x={112} y={62} w={76} warna="#BFDBFE" />
      </Muncul>
      <Muncul dy={-16} tunda={0.4}>
        <Sh id="lingkaran" x={198} y={62} w={76} warna="#FBCFE8" />
      </Muncul>
      {k >= 1 ? (
        <Muncul dy={8}>
          <Label x={24} y={146} w={80} teks="Segitiga" ukuran={12} />
          <Label x={110} y={146} w={80} teks="Segi empat" ukuran={11} />
          <Label x={196} y={146} w={80} teks="Lengkung" ukuran={12} />
        </Muncul>
      ) : null}
      {k >= 2 ? (
        <Muncul dy={8}>
          <Label x={64} y={176} w={172} teks="Bangun datar" ukuran={15} />
        </Muncul>
      ) : null}
      {k === 3 ? <Sorot x={18} y={56} w={264} h={92} /> : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Garis lurus dan sisi ------------ */

function A2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k < 3 ? (
        <>
          <Sh id="segiLima" x={95} y={44} w={110} warna="#BBF7D0" />
          <Muncul>
            <g transform="translate(95 44) scale(1.1)">
              <path d={jalurBentuk("segiLima")} fill="none" stroke="#E53E3E" strokeWidth="5" strokeLinejoin="round" />
            </g>
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <Muncul>
          <Label x={16} y={64} w={60} teks="sisi" ukuran={14} />
          <PanahG x1={70} y1={92} x2={112} y2={96} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul dy={10}>
          <Label x={64} y={164} w={172} teks="Segi banyak" ukuran={15} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          {(
            [
              ["segitiga", "3 sisi"],
              ["persegi", "4 sisi"],
              ["segiLima", "5 sisi"],
              ["segiEnam", "6 sisi"],
            ] as const
          ).map(([id, t], i) => (
            <Muncul key={id} tunda={i * 0.2} dy={12}>
              <Sh id={id} x={16 + i * 70} y={70} w={60} warna={["#FDE68A", "#BFDBFE", "#BBF7D0", "#FBCFE8"][i]} />
              <Teks x={46 + i * 70} y={150} teks={t} ukuran={13} />
            </Muncul>
          ))}
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Kurva --------------------------- */

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Muncul>
            <path d="M20 120 C60 50 110 190 150 105 S240 60 282 118" fill="none" stroke="#E53E3E" strokeWidth="6" strokeLinecap="round" />
          </Muncul>
          <Muncul dy={10} tunda={0.3}>
            <Label x={110} y={160} w={80} teks="kurva" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sh id="lingkaran" x={100} y={44} w={100} warna="#FBCFE8" />
          <Muncul>
            <g transform="translate(100 44) scale(1)">
              <path d={jalurBentuk("lingkaran")} fill="none" stroke="#E53E3E" strokeWidth="5" />
            </g>
          </Muncul>
          <Muncul dy={10}>
            <Label x={76} y={156} w={148} teks="Bentuk lengkung" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          {(
            [
              ["lingkaran", "Lingkaran"],
              ["oval", "Bentuk telur"],
              ["hati", "Bentuk hati"],
            ] as const
          ).map(([id, t], i) => (
            <Muncul key={id} tunda={i * 0.2} dy={12}>
              <Sh id={id} x={24 + i * 88} y={62} w={76} warna={["#FDE68A", "#BFDBFE", "#FBCFE8"][i]} />
              <Label x={20 + i * 88} y={146} w={84} teks={t} ukuran={11} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul dx={-30}>
            <KartuTeks x={14} y={70} w={130} baris={["Garis lurus", "segi banyak"]} ukuran={14} warna="#DBEAFE" />
          </Muncul>
          <Muncul dx={30} tunda={0.2}>
            <KartuTeks x={156} y={70} w={130} baris={["Garis lengkung", "bentuk lengkung"]} ukuran={13} warna="#FCE7F3" />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Hitung sisinya ------------------ */

function A3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k === 0 ? (
        <Muncul dy={-14}>
          <KartuTeks x={50} y={70} w={200} baris={["Banyak sisi", "menentukan nama"]} ukuran={19} warna="#FEF3C7" />
        </Muncul>
      ) : null}
      {k === 1 ? (
        <>
          <Sh id="segitiga" x={100} y={44} w={100} warna="#FDE68A" />
          <Lencana x={214} y={70} teks="3" r={20} />
          <Muncul dy={10}>
            <Label x={72} y={156} w={156} teks="Segitiga: 3 sisi" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Sh id="persegi" x={100} y={44} w={100} warna="#BFDBFE" />
          <Lencana x={214} y={70} teks="4" r={20} />
          <Muncul dy={10}>
            <Label x={62} y={156} w={176} teks="Segi empat: 4 sisi" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Sh id="segiLima" x={36} y={56} w={100} warna="#BBF7D0" />
          <Sh id="segiEnam" x={164} y={56} w={100} warna="#FBCFE8" />
          <Tanya x={150} y={104} />
          <Muncul dy={10}>
            <Label x={62} y={162} w={176} teks="5 sisi? 6 sisi?" ukuran={15} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Segi lima dan segi enam --------- */

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k === 0 ? (
        <>
          <Sh id="segiLima" x={95} y={44} w={110} warna="#BBF7D0" />
          <Lencana x={218} y={64} teks="5" r={20} />
          <Muncul dy={10}>
            <Label x={74} y={160} w={152} teks="Segi lima" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sh id="segiEnam" x={95} y={44} w={110} warna="#FBCFE8" />
          <Lencana x={218} y={64} teks="6" r={20} />
          <Muncul dy={10}>
            <Label x={74} y={160} w={152} teks="Segi enam" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul skala={0.4}>
            <Sh id="segiLima" x={100} y={36} w={100} warna="#F9A8D4" putar={0} />
            <circle cx="150" cy="90" r="9" fill="#FDE047" stroke={BIRU} strokeWidth="2.4" />
          </Muncul>
          <path d="M150 140 V172" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
          <path d="M150 158 Q120 150 116 164 Q140 172 150 158 Z M150 164 Q180 156 184 170 Q160 178 150 164 Z" fill="#4ADE80" stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
          <Muncul dy={10}>
            <Label x={62} y={176} w={176} teks="Bunga morning glory" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.4}>
            <SarangG x={150} y={100} s={1.2} />
          </Muncul>
          <Muncul dy={10}>
            <Label x={80} y={164} w={140} teks="Sarang lebah" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 4 ? (
        <>
          {(
            [
              ["rumahBurung", "Rumah burung"],
              ["tehCelup", "Teh celup"],
              ["ubinLantai", "Ubin lantai"],
              ["jamDinding", "Jam dinding"],
            ] as const
          ).map(([id, t], i) => (
            <Muncul key={id} tunda={i * 0.2} dy={12}>
              <ObjDatar id={id} x={12 + i * 72} y={72} w={64} />
              <Teks x={44 + i * 72} y={150} teks={t} ukuran={10.5} />
            </Muncul>
          ))}
          <Muncul tunda={1}>
            <Label x={50} y={168} w={200} teks="5 sisi dan 6 sisi" ukuran={13} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Lingkaran ----------------------- */

function A3_3({ k, t }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Muncul skala={0.4}>
            <ObjDatar id="koin" x={105} y={50} w={90} />
          </Muncul>
          <Muncul dy={10}>
            <Label x={80} y={156} w={140} teks="Uang logam" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <rect x="70" y="44" width="160" height="116" rx="6" fill="#FFFFFF" stroke="#6B7280" strokeWidth="3" />
          <Muncul>
            <Sh id="lingkaran" x={105} y={52} w={90} kosong putus />
          </Muncul>
          <Muncul dx={50}>
            <ObjDatar id="koin" x={236} y={110} w={44} />
          </Muncul>
          <Muncul dy={10}>
            <Label x={72} y={168} w={156} teks="Cetak tepinya" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <rect x="70" y="44" width="160" height="116" rx="6" fill="#FFFFFF" stroke="#6B7280" strokeWidth="3" />
          <Sh id="lingkaran" x={105} y={52} w={90} kosong putus />
          <g transform={`rotate(${t * 70} 150 97)`}>
            <ObjDatar id="koin" x={105} y={52} w={90} />
          </g>
          <Muncul dy={10}>
            <Label x={72} y={168} w={156} teks="Selalu pas!" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Sh id="lingkaran" x={100} y={44} w={100} warna="#FCD34D" />
          <Muncul dy={10}>
            <Label x={36} y={156} w={228} teks="Lingkaran: bulat sempurna" ukuran={14} />
          </Muncul>
          <Lompat>
            <Tokoh x={36} y={198} rambut={RAMBUT_GELAP} baju={HIJAU} s={0.55} angkat />
          </Lompat>
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

export const ADEGAN_VIDEO_K2B3A = SUB_A3.videos.map((v, vi) =>
  v.adegan.map((a, ai) => {
    const waktu = vi === 2 && ai === 2;
    return buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p), { waktu });
  }),
);

const POSTER: { a: number; k: number }[] = [
  { a: 0, k: 3 },
  { a: 0, k: 3 },
  { a: 1, k: 0 },
];

export const VIDEO_SIAP_K2B3A: VideoSiap[] = SUB_A3.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B3A[i], poster: POSTER[i] }));

export function VideoK2B3A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B3A} speakGuru={speakGuru} />;
}