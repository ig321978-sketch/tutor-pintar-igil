import type { Metadata } from "next";
import KomunitasHalaman from "@/components/komunitas/KomunitasHalaman";

export const metadata: Metadata = {
  title: "$IGIL · Komunitas IGIL",
  description:
    "Profil sekolah komunitas IGIL, perankingan beasiswa berjenjang, dan Partner Guru pembimbing mingguan.",
};

export default function HalamanKomunitas() {
  return <KomunitasHalaman />;
}
