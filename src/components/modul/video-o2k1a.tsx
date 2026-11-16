"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_MATERI_O2K1A } from "./story/o2k1a-video";

/* Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): satu video, Metode IGIL: Tunjuk, Geser, Isi, Tulis, dengan mesin animasi Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_O2K1A, { a: 2, k: 8 })];

export function VideoO2K1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
