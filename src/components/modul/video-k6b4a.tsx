"use client";
import React from "react";
import { Papan, type PropsAdegan } from "./video-cerita";
import { DaftarVideoCerita, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { AdeganVisual } from "./video-visual-adegan";
import { SUB_A64 } from "./naskah-k6b4";

/* Visual diagram/animasi seirama ketukan suara — AdeganVisual (bukan teks besar). */
const KODE = "k6b4a";
const papan = (v: number, a: number) => SUB_A64.videos[v].adegan[a].papan;

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    return (
      <>
        <Papan teks={papan(v, a)[k] ?? ""} />
        <AdeganVisual kode={KODE} v={v} a={a} k={k} />
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_A64.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_A64.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_A64.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function VideoK6B4A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
