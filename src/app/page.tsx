import type { Metadata } from "next";
import { Suspense } from "react";

import GerbangMasuk from "@/components/auth/GerbangMasuk";

export const metadata: Metadata = {
  title: "$IGIL · Masuk",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4">
          <p className="text-sm font-bold text-amber-200">Menyiapkan…</p>
        </main>
      }
    >
      <GerbangMasuk />
    </Suspense>
  );
}
