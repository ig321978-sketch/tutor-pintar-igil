"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1C, VIDEO_MATERI_K3B1C } from "./story/k3b1C-video";

/* Sub-Bab C Bab 1 Kelas 3 "Karung Pak Dodi" (membandingkan dan mengurutkan bilangan): video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1C, { a: 1, k: 1 })];

export function VideoK3B1C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
