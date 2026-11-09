"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { Label } from "./gambar-nilai-k2b";
import { Gerak, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import type { Titik } from "./data-k2b3";
import { buatAdegan, VideoCeritaSatuLayar, KartuTeks, Lup, ModelRuang, ObjRuang, PanahG, PolDi, Sh, Tanya, Teks, type VideoSiap } from "./video-k2b3-umum";
import { SUB_C3 } from "./naskah-k2b3";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 3 Sub-Bab C: Bangun Ruang. Tiga video, sembilan     */
/* adegan. Diputar satu per satu saat siswa mengetuk Putar. Naskah satu         */
/* sumber: naskah-k2b3.ts (SUB_C3.videos). Animasi SVG gratis. Tanpa API.       */
/* Naskah: naskah/mtk-2-bab3-video-cerita.md                                    */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_C3.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_C3.videos[v].adegan[a];

const BARIS4 = (id: string[], y: number, w = 56) =>
  id.map((b, i) => (
    <Muncul key={b} tunda={i * 0.15} dy={-12}>
      <ObjRuang id={b} x={16 + i * 70} y={y} w={w} />
    </Muncul>
  ));

/* ------------------------- Video 1, adegan 1: Benda di sekitar ---------------- */

function C1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      {BARIS4(["topi", "dadu", "botol", "bola"], 52)}
      {k === 1 ? <Sorot x={10} y={46} w={280} h={72} /> : null}
      {k >= 2 ? (
        <>
          {(["segitiga", "persegi", "lingkaran"] as const).map((id, i) => (
            <Muncul key={id} tunda={i * 0.15} dy={12}>
              <Sh id={id} x={56 + i * 74} y={128} w={46} warna={["#FDE68A", "#BFDBFE", "#FBCFE8"][i]} />
            </Muncul>
          ))}
          <Muncul dy={8} tunda={0.5}>
            <Label x={70} y={178} w={160} teks="bentuk yang tipis" ukuran={13} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? <Tanya x={270} y={150} /> : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 2: Bangun datar -------------------- */

function C1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? (
        <>
          <Muncul dx={-30}>
            <KartuTeks x={14} y={78} w={132} baris={["Bangun", "datar"]} ukuran={20} warna="#DBEAFE" />
          </Muncul>
          <Muncul dx={30} tunda={0.2}>
            <KartuTeks x={154} y={78} w={132} baris={["Bangun", "ruang"]} ukuran={20} warna="#FEF3C7" />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sh id="persegi" x={100} y={44} w={100} warna="#BFDBFE" />
          <rect x="84" y="160" width="132" height="5" rx="2" fill="#BFDBFE" stroke={BIRU} strokeWidth="2" />
          <Muncul dy={8}>
            <Label x={74} y={168} w={152} teks="satu permukaan" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k >= 2 ? (
        <>
          {(["segitiga", "persegi", "lingkaran"] as const).map((id, i) => (
            <Muncul key={id} tunda={i * 0.15} dy={12}>
              <Sh id={id} x={32 + i * 86} y={62} w={72} warna={["#FDE68A", "#BFDBFE", "#FBCFE8"][i]} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <Muncul dy={8} tunda={0.5}>
          <Label x={40} y={152} w={220} teks="lingkaran • segi empat • segitiga" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.3}>
            <text x="150" y="130" textAnchor="middle" fontSize="80" fontWeight="900" fill="#E53E3E" opacity="0.85">
              ✘
            </text>
          </Muncul>
          <Muncul dy={8}>
            <Label x={50} y={158} w={200} teks="tidak bisa diisi" ukuran={15} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 1, adegan 3: Bangun ruang -------------------- */

function C1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      {k === 0 ? (
        <>
          <ObjRuang id="kardus" x={100} y={64} w={100} />
          {[0, 1, 2].map((i) => (
            <Muncul key={i} tunda={0.2 + i * 0.25} dy={-24}>
              <circle cx={126 + i * 24} cy={82} r="9" fill={["#F87171", "#60A5FA", "#4ADE80"][i]} stroke={BIRU} strokeWidth="2.2" />
            </Muncul>
          ))}
          <Muncul dy={10} tunda={0.8}>
            <Label x={50} y={170} w={200} teks="ada ruang di dalam" ukuran={15} />
          </Muncul>
        </>
      ) : (
        BARIS4(["kardus", "dadu", "topi", "botol"], 62, 58)
      )}
      {k === 2 ? (
        <Muncul dy={10}>
          <Label x={50} y={150} w={200} teks="punya banyak permukaan" ukuran={14} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Muncul skala={0.3}>
            <text x="150" y="150" textAnchor="middle" fontSize="54" fontWeight="900" fill="#16A34A">
              ✔
            </text>
          </Muncul>
          <Muncul dy={10} tunda={0.3}>
            <Label x={14} y={164} w={272} teks="bisa diisi = bangun ruang" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 1: Gelindingkan benda -------------- */

const RAK = ["topi", "dadu", "botol", "kardus", "bola"];

function C2_1({ k }: PropsAdegan) {
  const turun = k >= 2;
  const nilai = (id: string): { x: number; y: number } => (!turun ? { x: 0, y: 0 } : id === "bola" ? { x: -6, y: 94 } : id === "botol" ? { x: 40, y: 94 } : { x: 0, y: 0 });
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <rect x="8" y="102" width="284" height="6" rx="3" fill="#A8672D" stroke={BIRU} strokeWidth="2" />
      {RAK.map((id, i) => (
        <Gerak key={id} x={nilai(id).x} y={nilai(id).y} durasi={1.2}>
          <ObjRuang id={id} x={14 + i * 56} y={52} w={50} />
        </Gerak>
      ))}
      {k === 1 ? (
        <Muncul>
          <PanahG x1={150} y1={116} x2={150} y2={150} />
        </Muncul>
      ) : null}
      {turun ? (
        <Muncul tunda={0.6}>
          <Label x={178} y={176} w={110} teks="menggelinding" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 3 ? (
        <>
          <Sorot x={64} y={46} w={56} h={58} />
          <Sorot x={176} y={46} w={56} h={58} />
          <Muncul>
            <Label x={30} y={118} w={130} teks="kubus dan kotak diam" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 2: Lengkung dan datar -------------- */

function C2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {k === 0 ? (
        <Muncul dy={-14}>
          <KartuTeks x={50} y={72} w={200} baris={["Lihat", "permukaannya"]} ukuran={20} warna="#FEF3C7" />
        </Muncul>
      ) : null}
      {k >= 1 ? (
        <>
          {(["tabung", "kerucut", "bola"] as const).map((j, i) => (
            <Muncul key={j} tunda={i * 0.15} dy={-12}>
              <ModelRuang jenis={j} x={30 + i * 84} y={40} w={58} />
            </Muncul>
          ))}
          <Muncul dy={8} tunda={0.5}>
            <Label x={36} y={102} w={228} teks="Lengkung: menggelinding" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? <Sorot x={24} y={34} w={252} h={64} /> : null}
      {k === 3 ? (
        <>
          {(["kubus", "balok"] as const).map((j, i) => (
            <Muncul key={j} tunda={i * 0.15} dy={12}>
              <ModelRuang jenis={j} x={84 + i * 84} y={128} w={52} />
            </Muncul>
          ))}
          <Muncul dy={8} tunda={0.4}>
            <Label x={74} y={180} w={152} teks="Datar: diam" ukuran={14} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 2, adegan 3: Mengapa? ------------------------ */

function C2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      {k === 0 ? (
        <>
          <Gerak x={0} durasi={1}>
            <ObjRuang id="bola" x={40} y={84} w={64} />
          </Gerak>
          <PanahG x1={120} y1={118} x2={262} y2={118} />
          <Muncul dy={8}>
            <Label x={70} y={162} w={160} teks="berguling terus" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 1 ? (
        <>
          <ObjRuang id="kardus" x={96} y={58} w={108} />
          <Muncul dy={8}>
            <Label x={60} y={166} w={180} teks="datar menahan benda" ukuran={14} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          {[0, 1, 2].map((i) => (
            <Muncul key={i} tunda={i * 0.3} dy={-24}>
              <ObjRuang id="kardus" x={70} y={140 - i * 34} w={58} />
            </Muncul>
          ))}
          <ObjRuang id="bola" x={196} y={140} w={52} />
          <PanahG x1={252} y1={166} x2={290} y2={166} />
          <Muncul dy={8} tunda={1}>
            <Label x={140} y={60} w={150} teks="ditumpuk • digelinding" ukuran={11} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <Lup x={150} y={98} s={2} />
          <Muncul dy={8}>
            <Label x={40} y={160} w={220} teks="datar dan lengkung" ukuran={15} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 1: Kubus dan balok ----------------- */

const RUANG5 = ["kubus", "balok", "tabung", "kerucut", "bola"] as const;
const NAMA5 = ["Kubus", "Balok", "Tabung", "Kerucut", "Bola"];

const PERSEGI_PANJANG: Titik[][] = [
  [[0, 0], [44, 0], [44, 26], [0, 26]],
  [[0, 0], [30, 0], [30, 20], [0, 20]],
  [[0, 0], [50, 0], [50, 12], [0, 12]],
];

function C3_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {k <= 1 ? (
        <>
          {RUANG5.map((j, i) => (
            <Muncul key={j} tunda={i * 0.15} dy={-12}>
              <ModelRuang jenis={j} x={8 + i * 58} y={66} w={54} />
              <Teks x={35 + i * 58} y={140} teks={NAMA5[i]} ukuran={11} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 1 ? (
        <>
          <Sorot x={4} y={60} w={120} h={86} />
          <Muncul dy={8}>
            <Label x={14} y={156} w={100} teks="datar" ukuran={15} />
          </Muncul>
        </>
      ) : null}
      {k === 2 ? (
        <>
          <ModelRuang jenis="kubus" x={26} y={56} w={104} />
          {[0, 1, 2].map((i) => (
            <Muncul key={i} tunda={i * 0.25}>
              <Sh id="persegi" x={158 + i * 44} y={62} w={38} warna="#FDE047" />
            </Muncul>
          ))}
          <Muncul dy={8} tunda={0.8}>
            <Label x={150} y={116} w={136} teks="sama ukurannya" ukuran={12} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          <ModelRuang jenis="balok" x={26} y={56} w={104} />
          {PERSEGI_PANJANG.map((p, i) => (
            <Muncul key={i} tunda={i * 0.25}>
              <PolDi titik={p} ox={150} oy={62 + i * 32} skala={1.5} warna="#F9A8D4" />
            </Muncul>
          ))}
          <Muncul dy={8} tunda={0.8}>
            <Label x={160} y={170} w={126} teks="beda ukurannya" ukuran={12} />
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 2: Tabung, kerucut, bola ----------- */

function C3_2({ k }: PropsAdegan) {
  const pasang: [string, string, string][] = [
    ["kaleng", "botol", "Tabung"],
    ["topi", "esKrim", "Kerucut"],
    ["bola", "kelereng", "Bola"],
  ];
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      {k <= 2 ? (
        <>
          <Muncul dy={-14}>
            <ObjRuang id={pasang[k][0]} x={64} y={54} w={78} />
          </Muncul>
          <Muncul dy={-14} tunda={0.2}>
            <ObjRuang id={pasang[k][1]} x={158} y={54} w={78} />
          </Muncul>
          <Muncul dy={8} tunda={0.4}>
            <Label x={80} y={150} w={140} teks={pasang[k][2]} ukuran={17} />
          </Muncul>
        </>
      ) : null}
      {k === 3 ? (
        <>
          {(["tabung", "kerucut", "bola"] as const).map((j, i) => (
            <Muncul key={j} tunda={i * 0.15} dy={-12}>
              <ModelRuang jenis={j} x={36 + i * 84} y={52} w={60} />
            </Muncul>
          ))}
          <Muncul dy={8} tunda={0.5}>
            <Label x={14} y={130} w={272} teks="lengkung → menggelinding" ukuran={15} />
          </Muncul>
          <Muncul dy={8} tunda={0.8}>
            <text x="150" y="186" textAnchor="middle" fontSize="26" fill={EMAS} aria-hidden="true">
              🌀 🌀 🌀
            </text>
          </Muncul>
        </>
      ) : null}
    </>
  );
}

/* ------------------------- Video 3, adegan 3: Cari bangun ruang --------------- */

function C3_3({ k }: PropsAdegan) {
  const benda = ["dadu", "kardus", "kaleng", "topi", "bola"];
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? (
        <>
          <Lup x={150} y={98} s={2.2} />
          <Muncul dy={8}>
            <Label x={50} y={160} w={200} teks="amati sekitarmu" ukuran={16} />
          </Muncul>
        </>
      ) : null}
      {k >= 1 ? (
        <>
          {benda.map((b, i) => (
            <Muncul key={b} tunda={i * 0.12} dy={-12}>
              <ObjRuang id={b} x={10 + i * 58} y={56} w={52} />
            </Muncul>
          ))}
        </>
      ) : null}
      {k === 2 ? (
        <Muncul dy={8}>
          {NAMA5.map((n, i) => (
            <Label key={n} x={10 + i * 58} y={118} w={54} teks={n} ukuran={9.5} />
          ))}
        </Muncul>
      ) : null}
      {k === 3 ? (
        <Muncul dy={10}>
          <KartuTeks x={40} y={126} w={220} baris={["Tulis di tabel:", "benda → nama bangun ruang"]} ukuran={13} warna="#FEF3C7" />
        </Muncul>
      ) : null}
    </>
  );
}

/* ------------------------------ Susunan video ---------------------------- */

const URUT: ((p: PropsAdegan) => React.ReactNode)[][] = [
  [C1_1, C1_2, C1_3],
  [C2_1, C2_2, C2_3],
  [C3_1, C3_2, C3_3],
];

export const ADEGAN_VIDEO_K2B3C = SUB_C3.videos.map((v, vi) => v.adegan.map((a, ai) => buatAdegan({ ...naskah(vi, ai), id: a.id }, (p) => URUT[vi][ai](p))));

export const VIDEO_SIAP_K2B3C: VideoSiap[] = SUB_C3.videos.map((v, i) => ({ naskah: v, adegan: ADEGAN_VIDEO_K2B3C[i] }));

export function VideoK2B3C({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <VideoCeritaSatuLayar subBab={SUB_C3} videos={VIDEO_SIAP_K2B3C} speakGuru={speakGuru} />;
}
