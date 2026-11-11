/**
 * Timpa berkas video-k4, video-k5, video-k6 (bukan -umum) menjadi Papan + AdeganVisual.
 * Jalankan: node scripts/rewrite-video-visual-k4k6.mjs
 */
import fs from "node:fs";
import path from "node:path";

const DIR = path.join("src", "components", "modul");
const files = fs
  .readdirSync(DIR)
  .filter((f) => /^video-k[4-6]b\d+[a-i]\.tsx$/.test(f))
  .sort();

function metaDari(nama) {
  const m = /^video-k(\d+)b(\d+)([a-i])\.tsx$/.exec(nama);
  if (!m) throw new Error(nama);
  const grade = Number(m[1]);
  const bab = Number(m[2]);
  const huruf = m[3].toUpperCase();
  const kode = `k${grade}b${bab}${m[3]}`;
  const sub = `SUB_${huruf}${grade}${bab}`;
  const naskah = `./naskah-k${grade}b${bab}`;
  const naskahFile = `naskah-k${grade}b${bab}.ts`;
  const ekspor = `VideoK${grade}B${bab}${huruf}`;
  return { kode, sub, naskah, naskahFile, ekspor, grade, bab };
}

function isi({ kode, sub, naskah, ekspor }) {
  return `"use client";
import React from "react";
import { Papan, type PropsAdegan } from "./video-cerita";
import { DaftarVideoCerita, buatAdegan, type VideoSiap } from "./video-k4b2-umum";
import { AdeganVisual } from "./video-visual-adegan";
import { ${sub} } from "${naskah}";

/* Visual diagram/animasi seirama ketukan suara — AdeganVisual (bukan teks besar). */
const KODE = "${kode}";
const papan = (v: number, a: number) => ${sub}.videos[v].adegan[a].papan;

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
  naskah: ${sub}.videos[vi],
  poster: { a: 0, k: Math.min(2, ${sub}.videos[vi].adegan[0].ketukan.length - 1) },
  adegan: ${sub}.videos[vi].adegan.map((ad, ai) => buatAdegan(ad, Adegan({ v: vi, a: ai }))),
}));

export function ${ekspor}({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
`;
}

let n = 0;
for (const f of files) {
  const meta = metaDari(f);
  // Pastikan SUB ada di naskah
  const naskahPath = path.join(DIR, meta.naskahFile);
  if (!fs.existsSync(naskahPath)) {
    console.warn(`LEWATI ${f}: naskah tidak ada`);
    continue;
  }
  const naskahTeks = fs.readFileSync(naskahPath, "utf8");
  if (!naskahTeks.includes(`export const ${meta.sub}`)) {
    console.warn(`LEWATI ${f}: ${meta.sub} tidak ada`);
    continue;
  }
  const blok = naskahTeks.split(`export const ${meta.sub}`)[1]?.split(/export const SUB_/)[0] ?? "";
  const jumlahVideo = [...blok.matchAll(/"id":\s*"K\d+B\d+[A-I]-V\d+"/gi)].length || 3;
  const indeks = jumlahVideo >= 3 ? "[0, 1, 2]" : jumlahVideo === 2 ? "[0, 1]" : "[0]";
  let body = isi(meta);
  body = body.replace("[0, 1, 2]", indeks);
  fs.writeFileSync(path.join(DIR, f), body);
  n += 1;
  console.log(`${f} → ${meta.kode} (${jumlahVideo} video)`);
}
console.log(`\nSelesai: ${n} berkas.`);
