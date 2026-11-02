"use client";

import { useState } from "react";
import { KuisMateriProvider } from "@/components/KuisMateriContext";
import NaskahMtk1Bab1 from "@/components/NaskahMtk1Bab1";

export default function HalamanMtk1Bab1() {
  const [selesai, setSelesai] = useState<string[]>([]);
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <KuisMateriProvider
        selesai={selesai}
        onBenar={(id) =>
          setSelesai((daftar) => (daftar.includes(id) ? daftar : [...daftar, id]))
        }
      >
        <NaskahMtk1Bab1 />
      </KuisMateriProvider>
    </main>
  );
}
