"use client";

import React from "react";

import { PizzaSvg, nyalaDariWaktu } from "./video-visual-kit";

/** Koreografi visual Story Kelas 5 — seirama ketukan `k` + waktu suara `t`. */
export function visualK5(kode: string, v: number, a: number, k: number, t = 0): React.ReactNode {
  return <PizzaSvg k={Math.max(0, nyalaDariWaktu(t, 4, 1.2) - 1)} q={4} p={1} />;
}
