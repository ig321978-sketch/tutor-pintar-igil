"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B2C, VIDEO_MATERI_K4B2C } from "./story/k4b2c-video";

/* Sub-Bab C Bab 2 Kelas 4 "Meja Jahit Kak Sekar" (pecahan yang sama besar), cerita Sanggar Batik Kampung Mekar: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B2C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B2C, { a: 1, k: 1 })];

export function VideoK4B2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
