"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1E, VIDEO_MATERI_K3B1E } from "./story/k3b1E-video";

/* Sub-Bab E Bab 1 Kelas 3 "Sisa Stok Pak Anto" (pengurangan sampai seratus): video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1E, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1E, { a: 1, k: 1 })];

export function VideoK3B1E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
