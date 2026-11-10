"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_B45 } from "./naskah-k4b5";

const papan = (v: number, a: number) => SUB_B45.videos[v].adegan[a].papan;

function Segi({ x, y, n, s = 22 }: { x: number; y: number; n: number; s?: number }) {
  const pts = Array.from({ length: n }, (_, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return `${x + s * Math.cos(ang)},${y + s * Math.sin(ang)}`;
  }).join(" ");
  return <polygon points={pts} fill="#F59E0B" stroke="#1C01A5" strokeWidth={2} fillOpacity={0.9} />;
}

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    return (
      <>
        <Papan teks={teks} />
        <Orang x={28} y={190} nama="kira" s={0.65} tampilNama={false} />
        <Orang x={260} y={190} nama="halim" s={0.65} tampilNama={false} />
        {v === 0 && k === 0 ? <Muncul><><Segi x={120} y={100} n={3} s={18} /><Segi x={170} y={100} n={3} s={18} /></></Muncul> : null}
        {v === 0 && k === 1 ? <Lompat><Besar x={160} y={110} teks="2△ → □" ukuran={28} /></Lompat> : null}
        {v === 0 && k === 2 ? <Emo x={160} y={95} e="🏠" s={42} /> : null}
        {v === 0 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="komposisi" ukuran={26} /></Muncul> : null}
        {v === 1 && k === 0 ? <Muncul><Segi x={160} y={100} n={4} s={28} /></Muncul> : null}
        {v === 1 && k === 1 ? <Lompat><Besar x={160} y={110} teks="□ → 2△" ukuran={28} warna="#BE123C" /></Lompat> : null}
        {v === 1 && k === 2 ? <Emo x={160} y={95} e="🗺️" s={40} /> : null}
        {v === 1 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="dekomposisi" ukuran={24} /></Muncul> : null}
        {v === 2 && k === 0 ? <Muncul><Besar x={160} y={105} teks="banyak cara" ukuran={26} /></Muncul> : null}
        {v === 2 && k === 1 ? <Lompat><Besar x={160} y={110} teks="tanpa celah" ukuran={26} warna="#15803D" /></Lompat> : null}
        {v === 2 && k === 2 ? <Emo x={160} y={95} e="✅" s={40} /> : null}
        {v === 2 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="ayo main" ukuran={26} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_B45.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_B45.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_B45.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B5B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
