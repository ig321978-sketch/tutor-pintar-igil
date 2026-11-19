import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import GerbangMasuk from "@/components/auth/GerbangMasuk";
import { PORTAL_MASUK_AKTIF } from "@/lib/situs-hanya-admin";

export const metadata: Metadata = {
  title: "$IGIL · Daftar atau Masuk",
  robots: { index: false, follow: false },
};

export default function Page() {
  // Portal Masuk dinonaktifkan sementara: langsung ke Ruang Belajar tanpa formulir.
  if (!PORTAL_MASUK_AKTIF) redirect("/ruang-belajar");
  return (
    <Suspense fallback={<main className="min-h-screen bg-indigo-950" />}>
      <GerbangMasuk />
    </Suspense>
  );
}
