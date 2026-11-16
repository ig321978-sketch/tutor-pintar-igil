"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_O2K1A, VIDEO_MATERI_O2K1A } from "./story/o2k1a-video";

/* Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): dua video terpisah, Materi Kurikulum dan Cara Lain Menghitung, dengan mesin animasi Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_O2K1A, { a: 3, k: 5 }), keVideoSiap(VIDEO_LUAR_O2K1A, { a: 2, k: 2 })];

export function VideoO2K1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
