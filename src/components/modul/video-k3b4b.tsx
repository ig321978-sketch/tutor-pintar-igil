"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B4B, VIDEO_MATERI_K3B4B } from "./story/k3b4B-video";

/* Sub-Bab B Bab 4 Kelas 3 "Sudut Kak Anton" (sudut pada bidang datar), tengah cerita Festival Layang-layang Kampung: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B4B, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B4B, { a: 1, k: 1 })];

export function VideoK3B4B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
