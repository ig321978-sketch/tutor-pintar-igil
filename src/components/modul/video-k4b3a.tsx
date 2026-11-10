"use client";
import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_A43 } from "./naskah-k4b3";

const papan = (v: number, a: number) => SUB_A43.videos[v].adegan[a].papan;

function Tumpuk({ x, y, n, e }: { x: number; y: number; n: number; e: string }) {
  return (
    <g>
      {Array.from({ length: Math.min(n, 8) }, (_, i) => (
        <text key={i} x={x + (i % 4) * 18 - 24} y={y - Math.floor(i / 4) * 20} fontSize={18} textAnchor="middle">{e}</text>
      ))}
      <Label x={x - 28} y={y + 18} w={56} teks={String(n)} ukuran={14} />
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
        {v === 0 && k === 0 ? <Muncul><><Tumpuk x={100} y={120} n={2} e="🟠" /><Tumpuk x={170} y={120} n={4} e="🟠" /><Tumpuk x={240} y={120} n={6} e="🟠" /></></Muncul> : null}
        {v === 0 && k === 1 ? <Lompat><Besar x={160} y={110} teks="+2" ukuran={36} warna="#C2410C" /></Lompat> : null}
        {v === 0 && k === 2 ? <Muncul><Tumpuk x={160} y={115} n={8} e="🟠" /></Muncul> : null}
        {v === 0 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="14 jeruk" ukuran={28} /></Muncul> : null}
        {v === 1 && k === 0 ? <Muncul><><Tumpuk x={100} y={120} n={9} e="🍬" /><Tumpuk x={170} y={120} n={7} e="🍬" /><Tumpuk x={240} y={120} n={5} e="🍬" /></></Muncul> : null}
        {v === 1 && k === 1 ? <Lompat><Besar x={160} y={110} teks="−2" ukuran={36} warna="#BE123C" /></Lompat> : null}
        {v === 1 && k === 2 ? <Muncul><Tumpuk x={160} y={115} n={3} e="🍬" /></Muncul> : null}
        {v === 1 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="sisa 1" ukuran={28} /></Muncul> : null}
        {v === 2 && k === 0 ? <Emo x={160} y={95} e="👀" s={40} /> : null}
        {v === 2 && k === 1 ? <Muncul><Besar x={160} y={105} teks={teks.slice(0, 14)} ukuran={26} /></Muncul> : null}
        {v === 2 && k === 2 ? <Lompat><Besar x={160} y={105} teks={k % 2 === 0 ? "+ ?" : "− ?"} ukuran={32} /></Lompat> : null}
        {v === 2 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="lanjutkan" ukuran={26} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_A43.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_A43.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_A43.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
