import type { Metadata } from "next";
import RaporHalaman from "@/components/rapor/RaporHalaman";

export const metadata: Metadata = {
  title: "$IGIL · Rapor & Sertifikat",
};

export default function HalamanRapor() {
  return <RaporHalaman />;
}
