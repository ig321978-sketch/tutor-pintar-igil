"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K4B1E, VIDEO_MATERI_K4B1E } from "./story/k4b1e-video";

/* Sub-Bab E Bab 1 Kelas 4 "Meja Resepsi Bu Rina" (penjumlahan bilangan sampai seribu), lanjutan cerita Penginapan Pulau Karang Indah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K4B1E, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K4B1E, { a: 1, k: 1 })];

export function VideoK4B1E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
