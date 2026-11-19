"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1A, VIDEO_MATERI_K3B1A } from "./story/k3b1A-video";

/* Sub-Bab A Bab 1 Kelas 3 "Toples Permen Pak Joko" (bilangan tiga angka), awal cerita Toko Kelontong Pak Joko: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1A, { a: 1, k: 1 })];

export function VideoK3B1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
