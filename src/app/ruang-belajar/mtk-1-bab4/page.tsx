"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatematikaKelas1Bab4, {
  type ChapterCompletionPayload,
} from "@/components/modul/MatematikaKelas1Bab4";

function catatLokal(payload: ChapterCompletionPayload) {
  try {
    window.sessionStorage.setItem(
      "igil-selesai-mat-k1-b4",
      JSON.stringify(payload),
    );
  } catch {
    // Catatan di perangkat ini saja. Tidak ada panggilan API.
  }
}

function ModulBab4() {
  const params = useSearchParams();
  const nama = params.get("nama")?.trim() || "Sahabat Cilik IGIL";
  return (
    <MatematikaKelas1Bab4 studentName={nama} onChapterComplete={catatLokal} />
  );
}

export default function HalamanMtk1Bab4() {
  return (
    <Suspense fallback={null}>
      <ModulBab4 />
    </Suspense>
  );
}
