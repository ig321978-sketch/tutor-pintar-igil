"use client";
import React from "react";
import { SUARA_SERAGAM } from "@/lib/suara-guru-seragam";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K2B1A, VIDEO_MATERI_K2B1A } from "./story/k2b1A-video";

/* Sub-Bab A Bab 1 Kelas 2 "Kue Kiriman dari Dapur" (menghitung, membaca, dan menulis bilangan sampai lima puluh), awal cerita Kue di Kantin Sekolah: video Metode Kurikulum dan Metode Global dengan mesin Story. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K2B1A, { a: 0, k: 0 }), keVideoSiap(VIDEO_LUAR_K2B1A, { a: 1, k: 1 })];

export function VideoK2B1A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} jedaAntarParagrafMs={SUARA_SERAGAM.jedaAntarParagrafMs} />;
}
