"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatematikaKelas1Bab1, {
  type ChapterCompletionPayload,
} from "@/components/modul/MatematikaKelas1Bab1";

function simpanLokal(payload: ChapterCompletionPayload) {
  try {
    window.sessionStorage.setItem(
      "igil-selesai-mat-k1-b1",
      JSON.stringify(payload),
    );
  } catch {
    // Penyimpanan di perangkat ini saja. Tidak ada panggilan API.
  }
}

function ModulBab1() {
  const params = useSearchParams();
  const nama = params.get("nama")?.trim() || "Sahabat Cilik IGIL";
  return (
    <MatematikaKelas1Bab1 studentName={nama} onChapterComplete={simpanLokal} />
  );
}

export default function HalamanMtk1Bab1() {
  return (
    <Suspense fallback={null}>
      <ModulBab1 />
    </Suspense>
  );
}
