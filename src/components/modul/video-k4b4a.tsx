"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_A44 } from "./naskah-k4b4";

const papan = (v: number, a: number) => SUB_A44.videos[v].adegan[a].papan;

function KisiMini({ x, y, n, m }: { x: number; y: number; n: number; m: number }) {
  const s = 14;
  return (
    <g>
      {Array.from({ length: m }, (_, r) =>
        Array.from({ length: n }, (_, c) => (
          <rect key={`${r}-${c}`} x={x + c * (s + 2)} y={y + r * (s + 2)} width={s} height={s} rx={3} fill="#F59E0B" stroke="#1C01A5" strokeWidth={1.5} />
        )),
      )}
    </g>
  );
}

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    return (
      <>
        <Papan teks={teks} />
        <Orang x={28} y={190} nama="kira" s={0.65} tampilNama={false} />
        <Orang x={260} y={190} nama="halim" s={0.65} tampilNama={false} />
        {v === 0 && k === 0 ? <Emo x={160} y={95} e="🪑" s={42} /> : null}
        {v === 0 && k === 1 ? <Muncul><><Emo x={120} y={90} e="💵" s={28} /><Emo x={160} y={90} e="💵" s={28} /><Emo x={200} y={90} e="💵" s={28} /></></Muncul> : null}
        {v === 0 && k === 2 ? <Lompat><Besar x={160} y={110} teks="1 satuan" ukuran={26} /></Lompat> : null}
        {v === 0 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="tidak baku" ukuran={26} /></Muncul> : null}
        {v === 1 && k === 0 ? <Muncul><KisiMini x={140} y={85} n={1} m={1} /></Muncul> : null}
        {v === 1 && k === 1 ? <Lompat><Besar x={160} y={110} teks="1 m²" ukuran={32} warna="#15803D" /></Lompat> : null}
        {v === 1 && k === 2 ? <Muncul><KisiMini x={110} y={75} n={4} m={3} /></Muncul> : null}
        {v === 1 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="13 cm²" ukuran={28} /></Muncul> : null}
        {v === 2 && k === 0 ? <Muncul><Besar x={160} y={105} teks="100×100" ukuran={28} /></Muncul> : null}
        {v === 2 && k === 1 ? <Lompat><Besar x={160} y={110} teks="10.000 cm²" ukuran={26} warna="#C2410C" /></Lompat> : null}
        {v === 2 && k === 2 ? <Emo x={160} y={95} e="✅" s={40} /> : null}
        {v === 2 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="ayo main" ukuran={26} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_A44.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_A44.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_A44.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B4A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
