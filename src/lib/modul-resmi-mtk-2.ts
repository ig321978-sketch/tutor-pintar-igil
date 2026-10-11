import { MODUL_MTK2_BAB1 } from "@/lib/modul-resmi-mtk-2-bab1";
import { MODUL_MTK2_BAB2 } from "@/lib/modul-resmi-mtk-2-bab2";
import { MODUL_MTK2_BAB3 } from "@/lib/modul-resmi-mtk-2-bab3";
import { MODUL_MTK2_BAB4 } from "@/lib/modul-resmi-mtk-2-bab4";
import { MODUL_MTK2_BAB5 } from "@/lib/modul-resmi-mtk-2-bab5";
import { MODUL_MTK2_BAB6 } from "@/lib/modul-resmi-mtk-2-bab6";
import { MODUL_MTK2_BAB7 } from "@/lib/modul-resmi-mtk-2-bab7";
import { MODUL_MTK2_BAB8 } from "@/lib/modul-resmi-mtk-2-bab8";
import { MODUL_MTK2_BAB9 } from "@/lib/modul-resmi-mtk-2-bab9";
import { MODUL_MTK2_BAB10 } from "@/lib/modul-resmi-mtk-2-bab10";
import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

export const MODUL_MTK2_BAB1_8: readonly ModulResmiPai[] = [
  MODUL_MTK2_BAB1,
  MODUL_MTK2_BAB2,
  MODUL_MTK2_BAB3,
  MODUL_MTK2_BAB4,
  MODUL_MTK2_BAB5,
  MODUL_MTK2_BAB6,
  MODUL_MTK2_BAB7,
  MODUL_MTK2_BAB8,
  MODUL_MTK2_BAB9,
  MODUL_MTK2_BAB10,
];

export const MODUL_MTK2_BAB1_4 = MODUL_MTK2_BAB1_8.slice(0, 4);
export const MODUL_MTK2_BAB5_8 = MODUL_MTK2_BAB1_8.slice(4, 8);
export const MODUL_MTK2_BAB9_SATU = [MODUL_MTK2_BAB9] as const;
export const MODUL_MTK2_BAB10_SATU = [MODUL_MTK2_BAB10] as const;
