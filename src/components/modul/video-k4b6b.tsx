"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_B46 } from "./naskah-k4b6";

const papan = (v: number, a: number) => SUB_B46.videos[v].adegan[a].papan;

function BatangSvg({ x, tinggi }: { x: number; tinggi: number }) {
  const y = 140 - tinggi;
  return <rect x={x} y={y} width={18} height={tinggi} rx={3} fill="#F59E0B" stroke="#1C01A5" strokeWidth={2} />;
}

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    return (
      <>
        <Papan teks={teks} />
        <Orang x={28} y={190} nama="kira" s={0.65} tampilNama={false} />
        <Orang x={260} y={190} nama="halim" s={0.65} tampilNama={false} />
        {v === 0 && k === 0 ? <Muncul><><BatangSvg x={130} tinggi={40} /><BatangSvg x={155} tinggi={70} /><BatangSvg x={180} tinggi={55} /></></Muncul> : null}
        {v === 0 && k === 1 ? <Lompat><Besar x={160} y={110} teks="X · Y" ukuran={28} /></Lompat> : null}
        {v === 0 && k === 2 ? <Muncul><Besar x={160} y={105} teks="tegak/mendatar" ukuran={22} /></Muncul> : null}
        {v === 0 && k >= 3 ? <Emo x={160} y={95} e="📊" s={40} /> : null}
        {v === 1 && k === 0 ? <Muncul><BatangSvg x={160} tinggi={80} /></Muncul> : null}
        {v === 1 && k === 1 ? <Lompat><rect x={100} y={100} width={120} height={18} rx={3} fill="#F59E0B" stroke="#1C01A5" strokeWidth={2} /></Lompat> : null}
        {v === 1 && k === 2 ? <Muncul><Besar x={160} y={105} teks="jumlahkan" ukuran={26} /></Muncul> : null}
        {v === 1 && k >= 3 ? <Emo x={160} y={95} e="➕" s={40} /> : null}
        {v === 2 && k === 0 ? <Muncul><Emo x={160} y={95} e="🚶" s={40} /></Muncul> : null}
        {v === 2 && k === 1 ? <Lompat><Besar x={160} y={110} teks="lomba/bunga" ukuran={24} /></Lompat> : null}
        {v === 2 && k === 2 ? <Emo x={160} y={95} e="✅" s={40} /> : null}
        {v === 2 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="ayo main" ukuran={26} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_B46.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_B46.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_B46.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B6B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
