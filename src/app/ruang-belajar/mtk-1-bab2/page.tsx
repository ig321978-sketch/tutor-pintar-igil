"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatematikaKelas1Bab2, {
  type ChapterCompletionPayload,
} from "@/components/modul/MatematikaKelas1Bab2";

function catatLokal(payload: ChapterCompletionPayload) {
  try {
    window.sessionStorage.setItem(
      "igil-selesai-mat-k1-b2",
      JSON.stringify(payload),
    );
  } catch {
    // Catatan di perangkat ini saja. Tidak ada panggilan API.
  }
}

function ModulBab2() {
  const params = useSearchParams();
  const nama = params.get("nama")?.trim() || "Sahabat Cilik IGIL";
  return (
    <MatematikaKelas1Bab2 studentName={nama} onChapterComplete={catatLokal} />
  );
}

export default function HalamanMtk1Bab2() {
  return (
    <Suspense fallback={null}>
      <ModulBab2 />
    </Suspense>
  );
}
