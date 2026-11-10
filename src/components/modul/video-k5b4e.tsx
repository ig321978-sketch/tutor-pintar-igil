"use client";
import React from "react";
import { Lompat, Muncul, Papan, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { SUB_E54 } from "./naskah-k5b4";
const papan = (v: number, a: number) => SUB_E54.videos[v].adegan[a].papan;
function Adegan({ v, a }: { v: number; a: number }) {
  return function Komponen({ k }: PropsAdegan) {
    const teks = papan(v, a)[k] ?? "";
    return (
      <>
        <Papan teks={teks} />
        <Orang x={28} y={190} nama="kira" s={0.65} tampilNama={false} />
        <Orang x={260} y={190} nama="halim" s={0.65} tampilNama={false} />
        {v===0&&k===0?<Muncul><Besar x={160} y={105} teks="batas luar" ukuran={24}/></Muncul>:null}
        {v===0&&k===1?<Lompat><Besar x={160} y={110} teks="abaikan dalam" ukuran={20}/></Lompat>:null}
        {v===0&&k===2?<Muncul><Besar x={160} y={105} teks="jumlah luar" ukuran={22}/></Muncul>:null}
        {v===0&&k>=3?<Emo x={160} y={95} e="🏠" s={40}/>:null}
        {v===1&&k===0?<Muncul><Besar x={160} y={105} teks="bungkus" ukuran={26}/></Muncul>:null}
        {v===1&&k===1?<Lompat><Besar x={160} y={110} teks="36" ukuran={28}/></Lompat>:null}
        {v===1&&k===2?<Muncul><Besar x={160} y={105} teks="cari ?" ukuran={26}/></Muncul>:null}
        {v===1&&k>=3?<Emo x={160} y={95} e="📦" s={40}/>:null}
        {v===2&&k===0?<Muncul><Besar x={160} y={105} teks="cek luar" ukuran={24}/></Muncul>:null}
        {v===2&&k===1?<Lompat><Besar x={160} y={110} teks="24 & 16" ukuran={24}/></Lompat>:null}
        {v===2&&k===2?<Emo x={160} y={95} e="✅" s={40}/>:null}
        {v===2&&k>=3?<Muncul><Besar x={160} y={105} teks="Bab 4 siap" ukuran={22}/></Muncul>:null}
      </>
    );
  };
}
const VIDEO: VideoSiap[] = [0, 1, 2].map((vi) => ({
  naskah: SUB_E54.videos[vi],
  poster: { a: 0, k: Math.min(2, SUB_E54.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: SUB_E54.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));
export function VideoK5B4E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
