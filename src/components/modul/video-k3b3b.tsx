"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B3B, VIDEO_MATERI_K3B3B } from "./story/k3b3B-video";

/* Sub-Bab B Bab 3 Kelas 3 "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B3B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B3B, { a: 1, k: 1 })];

export function VideoK3B3B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
