"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B1C, VIDEO_MATERI_K5B1C } from "./story/k5b1c-video";

/* Sub-Bab C Bab 1 Kelas 5 "Bundel Tiket Bu Lestari" (menguraikan bilangan), lanjutan cerita Hari Pertandingan di Stadion Kota: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B1C, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K5B1C, { a: 1, k: 1 })];

export function VideoK5B1C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
