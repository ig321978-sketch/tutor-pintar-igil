"use client";

import React from "react";
import { visualK4 } from "./video-visual-k4";
import { visualK5 } from "./video-visual-k5";
import { visualK6 } from "./video-visual-k6";

export type KodeVideo = string;

/**
 * Diagram/animasi SVG seirama ketukan suara untuk Story K4B1–K6B4.
 * `kode` contoh: "k5b4a", "k4b1c", "k6b4b".
 */
export function AdeganVisual({ kode, v, a, k }: { kode: string; v: number; a: number; k: number }) {
  const kunci = kode.toLowerCase();
  if (kunci.startsWith("k4")) return <>{visualK4(kunci, v, a, k)}</>;
  if (kunci.startsWith("k5")) return <>{visualK5(kunci, v, a, k)}</>;
  if (kunci.startsWith("k6")) return <>{visualK6(kunci, v, a, k)}</>;
  return null;
}
