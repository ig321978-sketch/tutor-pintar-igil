"use client";
import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Batang, Besar, DaftarVideoCerita, Emo, Orang, Pizza, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_D42 } from "./naskah-k4b2";

const papan = (v: number, a: number) => SUB_D42.videos[v].adegan[a].papan;

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    const potong = v === 0 ? { p: 1, q: 10 } : { p: 1, q: 100 };
    const banding = v === 0 ? { p: 3, q: 10 } : { p: 25, q: 100 };
    return (
      <>
        <Papan teks={teks} />
        <Orang x={36} y={190} nama="kira" s={0.7} tampilNama={false} />
        <Orang x={250} y={190} nama="halim" s={0.7} tampilNama={false} />
        {k === 0 ? <Emo x={150} y={95} e={v === 0 ? "🍞" : "🍪"} s={44} /> : null}
        {k === 1 ? <Muncul><Pizza x={150} y={95} q={Math.min(potong.q, 20)} p={potong.p} r={40} /></Muncul> : null}
        {k === 2 ? (
          <Lompat>
            <Batang x={70} y={70} q={Math.min(banding.q, 20)} p={Math.min(banding.p, 20)} />
            <Label x={70} y={115} w={160} teks={teks.slice(0, 22)} ukuran={12} />
          </Lompat>
        ) : null}
        {k >= 3 ? <Muncul><Besar x={150} y={100} teks={teks.slice(0, 16)} ukuran={24} /></Muncul> : null}
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_D42.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_D42.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_D42.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK4B2D({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
