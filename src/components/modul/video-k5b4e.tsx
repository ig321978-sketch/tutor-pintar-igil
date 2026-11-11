"use client";
import React from "react";
import { Papan, type PropsAdegan } from "./video-cerita";
import { DaftarVideoCerita, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { AdeganVisual } from "./video-visual-adegan";
import { SUB_E54 } from "./naskah-k5b4";

const KODE = "k5b4e";
const papan = (v: number, a: number) => SUB_E54.videos[v].adegan[a].papan;
const MINIMAL_JALAN: Partial<Record<number, number>> = { 0: 4, 1: 6, 2: 5 };

function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k, t }: PropsAdegan) {
    return (
      <>
        <Papan teks={papan(v, a)[k] ?? ""} />
        <AdeganVisual kode={KODE} v={v} a={a} k={k} t={t} />
      </>
    );
  };
}

const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_E54.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_E54.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_E54.videos[vi].adegan.map((ad, ai) =>
    buatAdegan(ad, Adegan({ v: vi, a: ai }), { waktu: true, minimal: MINIMAL_JALAN }),
  ),
}));

export function VideoK5B4E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
