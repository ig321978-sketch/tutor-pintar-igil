import type { Metadata } from "next";
import { Suspense } from "react";
import LoginClient from "./login-client";

export const metadata: Metadata = {
  title: "Masuk · $IGIL",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 px-2 py-10 font-semibold text-slate-500">
          Memuat formulir masuk...
        </main>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
