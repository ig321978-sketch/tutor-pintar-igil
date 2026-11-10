"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_B43 } from "./naskah-k4b3";

const papan = (v: number, a: number) => SUB_B43.videos[v].adegan[a].papan;

function Rantai({ x, y, suku, beda }: { x: number; y: number; suku: number[]; beda: string }) {
  return (
    <g>
      {suku.map((n, i) => (
        <g key={i}>
          <rect x={x + i * 52} y={y} width={44} height={36} rx={8} fill="#FFFFFF" stroke="#1C01A5" strokeWidth={2} />
          <text x={x + i * 52 + 22} y={y + 24} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1C01A5">{n}</text>
          {i < suku.length - 1 ? (
            <text x={x + i * 52 + 48} y={y + 22} textAnchor="middle" fontSize={11} fontWeight={900} fill="#D97706">{beda}</text>
          ) : null}
        </g>
      ))}
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
        {v === 0 && k === 0 ? <Muncul><Rantai x={70} y={95} suku={[3, 5, 7, 9]} beda="+2" /></Muncul> : null}
        {v === 0 && k === 1 ? <Lompat><Besar x={160} y={110} teks="+2" ukuran={36} warna="#15803D" /></Lompat> : null}
        {v === 0 && k === 2 ? <Muncul><Rantai x={50} y={95} suku={[1, 4, 7, 10]} beda="+3" /></Muncul> : null}
        {v === 0 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="13 berikutnya" ukuran={24} /></Muncul> : null}
        {v === 1 && k === 0 ? <Muncul><Rantai x={50} y={95} suku={[23, 18, 13, 8]} beda="−5" /></Muncul> : null}
        {v === 1 && k === 1 ? <Lompat><Besar x={160} y={110} teks="−5" ukuran={36} warna="#BE123C" /></Lompat> : null}
        {v === 1 && k === 2 ? <Muncul><Besar x={160} y={105} teks="selanjutnya 3" ukuran={24} /></Muncul> : null}
        {v === 1 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="mengecil" ukuran={28} /></Muncul> : null}
        {v === 2 && k === 0 ? <Emo x={160} y={95} e="🥚" s={42} /> : null}
        {v === 2 && k === 1 ? <Muncul><Rantai x={40} y={95} suku={[20, 28, 36, 44]} beda="+8" /></Muncul> : null}
        {v === 2 && k === 2 ? <Lompat><Besar x={160} y={110} teks="hari ke-5" ukuran={26} /></Lompat> : null}
        {v === 2 && k >= 3 ? <Muncul><Besar x={160} y={105} teks="52 telur" ukuran={28} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_B43.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_B43.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_B43.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
