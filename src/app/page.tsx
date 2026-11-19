import type { Metadata } from "next";
import { Suspense } from "react";

import GerbangMasuk from "@/components/auth/GerbangMasuk";

export const metadata: Metadata = {
  title: "$IGIL · Daftar atau Masuk",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-indigo-950" />}>
      <GerbangMasuk />
    </Suspense>
  );
}
