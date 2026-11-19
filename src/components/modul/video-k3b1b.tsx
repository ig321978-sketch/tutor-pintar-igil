"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1B, VIDEO_MATERI_K3B1B } from "./story/k3b1B-video";

/* Sub-Bab B Bab 1 Kelas 3 "Kartu Harga Bu Wati" (tempat angka), cerita Toko Kelontong Pak Joko: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1B, { a: 1, k: 1 })];

export function VideoK3B1B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
