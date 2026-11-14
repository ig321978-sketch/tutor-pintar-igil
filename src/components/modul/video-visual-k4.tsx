"use client";

import React from "react";
import { Muncul } from "./video-cerita";
import { LabelSvg } from "./video-visual-kit";

/** Koreografi visual Story Kelas 4 — seirama ketukan `k` + waktu suara `t`. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function visualK4(kode: string, v: number, a: number, k: number, t = 0): React.ReactNode {
  return (
    <Muncul>
      <LabelSvg x={80} y={100} w={140} teks={kode.toUpperCase()} ukuran={14} />
    </Muncul>
  );
}
