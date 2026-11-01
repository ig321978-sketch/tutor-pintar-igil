"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatematikaKelas1Bab5, {
  type ChapterCompletionPayload,
} from "@/components/modul/MatematikaKelas1Bab5";

function catatLokal(payload: ChapterCompletionPayload) {
  try {
    window.sessionStorage.setItem(
      "igil-selesai-mat-k1-b5",
      JSON.stringify(payload),
    );
  } catch {
    // Catatan di perangkat ini saja. Tidak ada panggilan API.
  }
}

function ModulBab5() {
  const params = useSearchParams();
  const nama = params.get("nama")?.trim() || "Sahabat Cilik IGIL";
  return (
    <MatematikaKelas1Bab5 studentName={nama} onChapterComplete={catatLokal} />
  );
}

export default function HalamanMtk1Bab5() {
  return (
    <Suspense fallback={null}>
      <ModulBab5 />
    </Suspense>
  );
}
