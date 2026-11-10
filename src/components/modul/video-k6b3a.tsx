"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_A63 } from "./naskah-k6b3";
const papan = (v: number, a: number) => SUB_A63.videos[v].adegan[a].papan;
function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    return (
      <>
        <Papan teks={teks} />
        <Orang x={28} y={190} nama="kira" s={0.65} tampilNama={false} />
        <Orang x={260} y={190} nama="halim" s={0.65} tampilNama={false} />
        {v===0&&k===0?<Muncul><Besar x={160} y={105} teks="2 kubus" ukuran={24}/></Muncul>:null}
        {v===0&&k===1?<Lompat><Besar x={160} y={110} teks="bentuk L" ukuran={24}/></Lompat>:null}
        {v===0&&k===2?<Muncul><Besar x={160} y={105} teks="gabung/urai" ukuran={20}/></Muncul>:null}
        {v===0&&k>=3?<Emo x={160} y={95} e="🧊" s={40}/>:null}
        {v===1&&k===0?<Muncul><Besar x={160} y={105} teks="lapisan" ukuran={26}/></Muncul>:null}
        {v===1&&k===1?<Lompat><Besar x={160} y={110} teks="tidak melayang" ukuran={18}/></Lompat>:null}
        {v===1&&k===2?<Muncul><Besar x={160} y={105} teks="27 / 8 / 30" ukuran={20}/></Muncul>:null}
        {v===1&&k>=3?<Emo x={160} y={95} e="📚" s={40}/>:null}
        {v===2&&k===0?<Muncul><Besar x={160} y={105} teks="putar 3D" ukuran={24}/></Muncul>:null}
        {v===2&&k===1?<Lompat><Besar x={160} y={110} teks="cek tersembunyi" ukuran={16}/></Lompat>:null}
        {v===2&&k===2?<Emo x={160} y={95} e="✅" s={40}/>:null}
        {v===2&&k>=3?<Muncul><Besar x={160} y={105} teks="ayo main" ukuran={24}/></Muncul>:null}
      </>
    );
  };
}
const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_A63.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_A63.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_A63.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));
export function VideoK6B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
