"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1A, VIDEO_MATERI_K4B1A } from "./story/k4b1a-video";

/* Sub-Bab A Bab 1 Kelas 4 "Loket Tiket Bu Maya" (membaca dan menulis bilangan sampai sepuluh ribu), awal cerita Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1A, { a: 1, k: 1 })];

export function VideoK4B1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
