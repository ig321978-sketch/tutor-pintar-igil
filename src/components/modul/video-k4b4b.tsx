"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_B44 } from "./naskah-k4b4";

const papan = (v: number, a: number) => SUB_B44.videos[v].adegan[a].papan;

function Botol({ x, y, label, h = 50 }: { x: number; y: number; label: string; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={28} height={h} rx={6} fill="#BFDBFE" stroke="#1C01A5" strokeWidth={2} />
      <rect x={x + 8} y={y - 10} width={12} height={12} rx={3} fill="#93C5FD" stroke="#1C01A5" strokeWidth={1.5} />
      <text x={x + 14} y={y + h + 16} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5">{label}</text>
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
        {v === 0 && k === 0 ? <Muncul><><Botol x={110} y={90} label="A" h={60} /><Botol x={160} y={105} label="B" h={40} /><Botol x={210} y={115} label="C" h={28} /></></Muncul> : null}
        {v === 0 && k === 1 ? <Lompat><Besar x={160} y={110} teks="A = 4B" ukuran={30} warna="#15803D" /></Lompat> : null}
        {v === 0 && k === 2 ? <Muncul><Besar x={160} y={110} teks="A = 10C" ukuran={30} warna="#BE123C" /></Muncul> : null}
        {v === 0 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="tidak baku" ukuran={26} /></Muncul> : null}
        {v === 1 && k === 0 ? <Muncul><><Emo x={110} y={90} e="🥄" s={28} /><Emo x={160} y={90} e="☕" s={28} /><Emo x={210} y={90} e="🥤" s={28} /></></Muncul> : null}
        {v === 1 && k === 1 ? <Lompat><Besar x={160} y={110} teks="1.000 ml = 1 l" ukuran={24} /></Lompat> : null}
        {v === 1 && k === 2 ? <Muncul><Besar x={160} y={105} teks="8 botol kecil" ukuran={24} /></Muncul> : null}
        {v === 1 && k >= 3 ? <Emo x={160} y={95} e="🧴" s={42} /> : null}
        {v === 2 && k === 0 ? <Emo x={160} y={95} e="🎲" s={42} /> : null}
        {v === 2 && k === 1 ? <Muncul><Besar x={160} y={105} teks="24 cm³ / 9 cm³" ukuran={24} /></Muncul> : null}
        {v === 2 && k === 2 ? <Lompat><Besar x={160} y={110} teks="1 m³ = 1.000 l" ukuran={24} warna="#15803D" /></Lompat> : null}
        {v === 2 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="siap main" ukuran={26} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_B44.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_B44.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_B44.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
