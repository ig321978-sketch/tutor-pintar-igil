import type { Metadata } from "next";
import DasborInformasi from "@/components/info/DasborInformasi";

export const metadata: Metadata = {
  title: "$IGIL · Dasbor Akun",
  robots: { index: false, follow: false },
};

export default function HalamanDasbor() {
  return <DasborInformasi />;
}
