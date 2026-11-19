import type { Metadata } from "next";
import { Suspense } from "react";

import FormPendaftaran from "@/components/info/FormPendaftaran";

export const metadata: Metadata = {
  title: "$IGIL · Daftar",
  robots: { index: false, follow: false },
};

export default function HalamanDaftar() {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-10 text-center text-sm font-bold text-indigo-950">Menyiapkan pendaftaran…</p>
      }
    >
      <FormPendaftaran />
    </Suspense>
  );
}
