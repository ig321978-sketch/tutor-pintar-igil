"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { AngkaBesar, BarisWadah, buatAdegan, BIRU, DaftarVideoCerita, Emo, ItemMini, Orang, PapanSvg, StripSvg, type VideoSiap } from "./video-k2b7-umum";
import { Capung } from "./dasar-k2b7";
import { SUB_B7 } from "./naskah-k2b7";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 7 Sub-Bab B: Membandingkan dan Mengurutkan          */
/* Bilangan. Tiga video, sembilan adegan. Diputar satu per satu saat siswa      */
/* mengetuk Putar. Naskah satu sumber: naskah-k2b7.ts (SUB_B7.videos).          */
/* Animasi SVG gratis di perangkat. Tanpa API.                                  */
/* Naskah: naskah/mtk-2-bab7-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B7.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B7.videos[v].adegan[a];

const KUPU = <Emo x={0} y={0} e="🦋" s={26} />;
const CAPUNG = (
  <g transform="translate(-18 -18)">
    <Capung ukuran={36} />
  </g>
);

/** Titik tengah sebuah kotak pada StripSvg (lebar sel 30, mulai x=15). */
const cx = (dari: number, n: number) => 15 + (n - dari) * 30 + 14;

/** Lengkung loncatan satu langkah di bawah garis angka: dari bilangan a ke b. */
function Loncat({ dari, a, b, teks, warna }: { dari: number; a: number; b: number; teks: string; warna: string }) {
  const x1 = cx(dari, a);
  const x2 = cx(dari, b);
  return (
    <Muncul tunda={0.1}>
      <path d={`M${x1} 152 Q${(x1 + x2) / 2} 178 ${x2} 152`} fill="none" stroke={warna} strokeWidth="3.2" strokeLinecap="round" />
      <path d={x2 > x1 ? `M${x2 - 6} 154 L${x2} 151 L${x2 - 2} 158` : `M${x2 + 6} 154 L${x2} 151 L${x2 + 2} 158`} fill="none" stroke={warna} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x={(x1 + x2) / 2} y="178" textAnchor="middle" fontSize="12" fontWeight="900" fill={warna}>
        {teks}
      </text>
    </Muncul>
  );
}

/* ------------------------- Video 1, adegan 1: Kupu-kupu --------------------------- */

function B1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <StripSvg x={15} y={104} dari={54} sampai={62} tandai={k >= 2 ? 60 : 58} sembunyi={k === 0 ? [58] : []} sorot={k === 0 ? [57, 59] : k >= 2 ? [58] : []} penanda={KUPU} />
      {k === 2 ? (
        <>
          <Loncat dari={54} a={58} b={59} teks="+1" warna="#16A34A" />
          <Loncat dari={54} a={59} b={60} teks="+1" warna="#16A34A" />
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.2}>
          <Label x={50} y={150} w={200} teks="2 lebihnya dari 58 = 60" ukuran={13} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Capung ------------------------------ */

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      <StripSvg x={15} y={104} dari={71} sampai={79} tandai={k >= 2 ? 72 : 75} sembunyi={k === 0 ? [75] : []} sorot={k === 0 ? [74, 76] : k >= 2 ? [75] : []} penanda={CAPUNG} />
      {k === 2 ? (
        <>
          <Loncat dari={71} a={75} b={74} teks="-1" warna="#E53E3E" />
          <Loncat dari={71} a={74} b={73} teks="-1" warna="#E53E3E" />
          <Loncat dari={71} a={73} b={72} teks="-1" warna="#E53E3E" />
        </>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.2}>
          <Label x={50} y={150} w={200} teks="3 kurangnya dari 75 = 72" ukuran={13} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Lebih dan kurang -------------------- */

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <StripSvg x={15} y={118} dari={74} sampai={82} tandai={78} penanda={KUPU} />
          <Muncul dx={-16}>
            <Label x={14} y={52} w={124} teks="← kurang: mundur" ukuran={12} />
          </Muncul>
          <Muncul dx={16} tunda={0.3}>
            <Label x={162} y={52} w={124} teks="lebih: maju →" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <StripSvg x={15} y={104} dari={74} sampai={82} tandai={78} sorot={[76]} penanda={KUPU} />
          <Loncat dari={74} a={76} b={77} teks="+1" warna="#16A34A" />
          <Loncat dari={74} a={77} b={78} teks="+1" warna="#16A34A" />
        </>
      ) : null}
      {k === 2 ? (
        <>
          <StripSvg x={15} y={104} dari={62} sampai={70} tandai={66} sorot={[67]} penanda={CAPUNG} />
          <Loncat dari={62} a={67} b={66} teks="-1" warna="#E53E3E" />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={150} y={92} e="📏" s={70} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={34} y={146} w={232} teks="maju dan mundur dengan teliti" ukuran={13} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Kelereng Halim dan Malosi ----------- */

function KantongLepas({ x, y, kantong, lepas }: { x: number; y: number; kantong: number; lepas: number }) {
  return (
    <g>
      <BarisWadah jenis="kelereng" n={kantong} x={x} y={y} w={32} h={24} kolom={3} gap={4} />
      {Array.from({ length: lepas }, (_, i) => (
        <Muncul key={i} tunda={0.2 + i * 0.08} dy={-6}>
          <ItemMini jenis="kelereng" i={i} x={x + 6 + i * 15} y={y + 80} r={6} />
        </Muncul>
      ))}
    </g>
  );
}

function B2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      {k === 0 ? (
        <>
          <Orang x={66} y={150} nama="halim" s={0.8} tampilNama={false} />
          <Orang x={234} y={150} nama="malosi" s={0.8} tampilNama={false} />
          <Muncul tunda={0.3}>
            <AngkaBesar x={66} y={176} teks="56" w={70} />
          </Muncul>
          <Muncul tunda={0.6}>
            <AngkaBesar x={234} y={176} teks="65" w={70} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <KantongLepas x={14} y={48} kantong={5} lepas={6} />
          <KantongLepas x={174} y={48} kantong={6} lepas={5} />
          <Label x={14} y={148} w={108} teks="Halim" ukuran={12} />
          <Label x={178} y={148} w={108} teks="Malosi" ukuran={12} />
        </>
      ) : null}
      {k >= 2 ? (
        <>
          <PapanSvg x={32} y={60} p={5} s={6} w={42} />
          <PapanSvg x={178} y={60} p={6} s={5} w={42} sorotP={k === 3} />
          {k === 2 ? <Label x={22} y={130} w={110} teks="Halim: 56" ukuran={12} /> : null}
          {k === 2 ? <Label x={168} y={130} w={110} teks="Malosi: 65" ukuran={12} /> : null}
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={222} y={46} e="👑" s={24} />
          </Lompat>
          <Muncul tunda={0.3}>
            <Label x={36} y={140} w={228} teks="65 lebih besar dari 56" ukuran={13} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Puluhan yang sama -------------------- */

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <>
          <AngkaBesar x={74} y={100} teks="54" w={96} />
          <AngkaBesar x={226} y={100} teks="58" w={96} />
          <Lompat>
            <Emo x={150} y={104} e="❓" s={44} />
          </Lompat>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          <PapanSvg x={32} y={60} p={5} s={4} w={44} sorotP={k === 1} sorotS={k >= 2} />
          <PapanSvg x={176} y={60} p={5} s={8} w={44} sorotP={k === 1} sorotS={k >= 2} />
        </>
      ) : null}
      {k === 1 ? (
        <Muncul tunda={0.2}>
          <Label x={50} y={148} w={200} teks="puluhan sama: lihat satuan" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 2 ? (
        <Muncul tunda={0.2}>
          <Label x={50} y={148} w={200} teks="4 satuan dan 8 satuan" ukuran={13} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Lompat>
            <Emo x={220} y={46} e="👑" s={24} />
          </Lompat>
          <Muncul tunda={0.2}>
            <Label x={40} y={152} w={220} teks="58 lebih besar dari 54" ukuran={13} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Kata dan tanda ----------------------- */

function B2_3({ k }: PropsAdegan) {
  const baris: [string, string][] = [
    ["lebih besar dari", ">"],
    ["lebih kecil dari", "<"],
    ["sama dengan", "="],
  ];
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          {baris.map(([kata, tanda], i) => (
            <Muncul key={kata} tunda={0.15 + i * 0.35} dx={-16}>
              <Label x={20} y={50 + i * 42} w={190} teks={kata} ukuran={14} />
              <text x="248" y={78 + i * 42} textAnchor="middle" fontSize="38" fontWeight="900" fill={BIRU}>
                {tanda}
              </text>
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Muncul>
            <AngkaBesar x={150} y={78} teks="65 > 56" w={210} />
          </Muncul>
          <Muncul tunda={0.5}>
            <AngkaBesar x={150} y={136} teks="56 < 65" w={210} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <Muncul skala={0.5}>
            <AngkaBesar x={150} y={96} teks="54 = 54" w={200} />
          </Muncul>
          <Muncul tunda={0.4}>
            <Label x={70} y={140} w={160} teks="sama dengan" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <AngkaBesar x={150} y={90} teks="65 > 56" w={210} />
          <Sorot x={136} y={62} w={30} h={56} />
          <Muncul tunda={0.3}>
            <Label x={30} y={140} w={240} teks="terbuka ke yang lebih besar" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Tiga bilangan ------------------------ */

const TIGA: [number, number, number][] = [
  [50, 7, 6],
  [150, 8, 3],
  [250, 5, 7],
];

function B3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {TIGA.map(([c, p, s], i) => (
        <Muncul key={c} tunda={0.1 + i * 0.2}>
          <AngkaBesar x={c} y={72} teks={`${p}${s}`} w={64} />
          {k >= 1 ? <PapanSvg x={c - 34} y={106} p={p} s={s} w={32} sorotP={(k === 2 && p === 8) || (k === 3 && p === 5)} /> : null}
        </Muncul>
      ))}
      {k === 2 ? (
        <Lompat>
          <Emo x={150} y={168} e="👑" s={28} />
        </Lompat>
      ) : null}
      {k === 3 ? (
        <Muncul tunda={0.2}>
          <Label x={190} y={162} w={104} teks="paling kecil" ukuran={12} />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Mengurutkan -------------------------- */

const POS = [60, 150, 240];

function B3_2({ k }: PropsAdegan) {
  const kartu = (n: number, awal: number, tujuan: number) => {
    const dipasang = (n === 57 && k >= 1) || (n !== 57 && k >= 2);
    const c = dipasang ? POS[tujuan] : POS[awal];
    const y = dipasang ? 130 : 66;
    return (
      <g key={n} style={{ transform: `translate(${c}px, ${y}px)`, transition: "transform 0.8s cubic-bezier(.3,1.2,.5,1)" }}>
        <AngkaBesar x={0} y={0} teks={String(n)} w={64} />
      </g>
    );
  };
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {POS.map((c) => (
        <rect key={c} x={c - 35} y={102} width="70" height="56" rx="12" fill="rgba(255,255,255,0.7)" stroke={BIRU} strokeWidth="3" strokeDasharray="6 5" />
      ))}
      {kartu(76, 0, 1)}
      {kartu(83, 1, 2)}
      {kartu(57, 2, 0)}
      {k === 3 ? (
        <>
          <text x="105" y="140" textAnchor="middle" fontSize="26" fontWeight="900" fill="#16A34A">
            &lt;
          </text>
          <text x="195" y="140" textAnchor="middle" fontSize="26" fontWeight="900" fill="#16A34A">
            &lt;
          </text>
          <Muncul tunda={0.3}>
            <Label x={40} y={168} w={220} teks="57 < 76 < 83" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Teka-teki Kira ----------------------- */

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Orang x={64} y={196} nama="kira" s={1} angkat />
          <Muncul tunda={0.3} dx={12}>
            <Label x={116} y={56} w={176} teks="+ 4 puluhan, + 3 satuan" ukuran={12} />
          </Muncul>
          <Muncul tunda={0.8} dx={12}>
            <Label x={116} y={92} w={176} teks="hasilnya 55" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <PapanSvg x={106} y={52} p={5} s={5} w={44} />
          <Muncul tunda={0.3}>
            <Label x={34} y={146} w={232} teks="55 = 5 puluhan, 5 satuan" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <PapanSvg x={10} y={56} p={5} s={5} w={30} />
          <text x="88" y="100" textAnchor="middle" fontSize="30" fontWeight="900" fill="#E53E3E">
            −
          </text>
          <PapanSvg x={106} y={56} p={4} s={3} w={30} />
          <text x="186" y="100" textAnchor="middle" fontSize="30" fontWeight="900" fill={BIRU}>
            =
          </text>
          <Muncul tunda={0.5}>
            <PapanSvg x={206} y={56} p={1} s={2} w={30} sorotP sorotS />
          </Muncul>
          <Label x={30} y={140} w={240} teks="5−4=1 puluhan, 5−3=2 satuan" ukuran={12} />
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.5}>
            <AngkaBesar x={150} y={100} teks="12" w={110} />
          </Muncul>
          <Lompat>
            <Emo x={236} y={74} e="🎉" s={34} />
          </Lompat>
          <Muncul tunda={0.4}>
            <Label x={28} y={146} w={244} teks="satu puluhan dan dua satuan" ukuran={12} />
          </Muncul>
        </>
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

export const ADEGAN_VIDEO_K2B7B = SUB_B7.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

const POSTER: { a: number; k: number }[] = [
  { a: 0, k: 3 },
  { a: 0, k: 3 },
  { a: 1, k: 3 },
];

export const VIDEO_SIAP_K2B7B: VideoSiap[] = SUB_B7.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B7B[i], poster: POSTER[i] }));

export function VideoK2B7B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO_SIAP_K2B7B} speakGuru={speakGuru} />;
}
