"use client";
import React from "react";
import { DaftarVideoCerita } from "./daftar-video-cerita";
import { keVideoSiap } from "./story/mesin-story";
import { VIDEO_LUAR_K5B2E, VIDEO_MATERI_K5B2E } from "./story/k5b2e-video";

/* Sub-Bab E (menentukan KPK dan FPB dengan faktor prima, penutup bab): dua video terpisah, Materi Kurikulum dan Metode Luar, dengan mesin animasi Story baru. */
const VIDEO = [keVideoSiap(VIDEO_MATERI_K5B2E, { a: 2, k: 6 }), keVideoSiap(VIDEO_LUAR_K5B2E, { a: 7, k: 2 })];

export function VideoK5B2E({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
