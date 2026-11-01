"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatematikaKelas1Bab3, {
  type ChapterCompletionPayload,
} from "@/components/modul/MatematikaKelas1Bab3";

function catatLokal(payload: ChapterCompletionPayload) {
  try {
    window.sessionStorage.setItem(
      "igil-selesai-mat-k1-b3",
      JSON.stringify(payload),
    );
  } catch {
    // Catatan di perangkat ini saja. Tidak ada panggilan API.
  }
}

function ModulBab3() {
  const params = useSearchParams();
  const nama = params.get("nama")?.trim() || "Sahabat Cilik IGIL";
  return (
    <MatematikaKelas1Bab3 studentName={nama} onChapterComplete={catatLokal} />
  );
}

export default function HalamanMtk1Bab3() {
  return (
    <Suspense fallback={null}>
      <ModulBab3 />
    </Suspense>
  );
}
