"use client";
import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b1-umum";
import { SUB_I41 } from "./naskah-k4b1";

const papan = (v: number, a: number) => SUB_I41.videos[v].adegan[a].papan;
const contoh = 12;

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    return (
      <>
        <Papan teks={teks} />
        <Orang x={50} y={190} nama="kira" s={0.75} tampilNama={false} />
        <Orang x={250} y={190} nama="halim" s={0.75} tampilNama={false} />
        {k >= 1 ? <Muncul><Besar x={150} y={100} teks={teks.slice(0, 18)} ukuran={22} /></Muncul> : <Emo x={150} y={100} e="🔢" s={42} />}
        {k >= 2 ? <Lompat><Label x={70} y={150} w={160} teks="ayo hitung" ukuran={12} /></Lompat> : null}
        {k === 3 ? <Besar x={150} y={55} teks={String(contoh)} ukuran={28} /> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_I41.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_I41.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_I41.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B1I({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
