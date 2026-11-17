"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K1B3A, VIDEO_MATERI_K1B3A } from "./story/k1b3a-video";

/* Sub-Bab A Bab 3 "Bekal untuk Nenek" (cerita pengurangan), awal Kereta ke Rumah Nenek: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K1B3A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K1B3A, { a: 1, k: 1 })];

export function VideoK1B3A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
