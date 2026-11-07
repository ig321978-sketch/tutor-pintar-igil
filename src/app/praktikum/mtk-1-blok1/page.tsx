import type { Metadata } from "next";
import PraktikumBlok from "@/components/praktikum/PraktikumBlok";

export const metadata: Metadata = {
  title: "$IGIL · Praktikum Blok 1 Matematika Kelas 1",
};

export default function HalamanPraktikumMtk1Blok1() {
  return <PraktikumBlok blokId="mtk-1-blok1" />;
}
