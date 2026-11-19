import type { Metadata } from "next";
import { Suspense } from "react";

import CheckoutQris from "@/components/pembayaran/CheckoutQris";

export const metadata: Metadata = {
  title: "$IGIL · Berlangganan",
  robots: { index: false, follow: false },
};

export default function HalamanLangganan() {
  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-3 py-8">
      <Suspense fallback={<p className="text-center text-sm font-bold text-amber-200">Menyiapkan pembayaran…</p>}>
        <CheckoutQris />
      </Suspense>
    </main>
  );
}
