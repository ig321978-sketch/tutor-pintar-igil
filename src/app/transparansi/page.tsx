import type { Metadata } from "next";
import LaporanTransparansi from "@/components/info/LaporanTransparansi";

export const metadata: Metadata = {
  title: "$IGIL · Laporan Transparansi",
};

export default function HalamanTransparansi() {
  return <LaporanTransparansi />;
}
