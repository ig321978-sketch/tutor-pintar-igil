"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K3B1F, VIDEO_MATERI_K3B1F } from "./story/k3b1F-video";

/* Sub-Bab F Kelas 3 Bab 1 "Telur Bu Mirna" (perkalian sampai seratus), Toko Kelontong Pak Joko: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K3B1F, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K3B1F, { a: 1, k: 1 })];

export function VideoK3B1F({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
