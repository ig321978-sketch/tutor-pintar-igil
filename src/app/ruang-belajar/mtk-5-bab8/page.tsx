"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MatematikaKelas5Bab8, {
  type ChapterCompletionPayload,
} from "@/components/modul/MatematikaKelas5Bab8";

function catatLokal(payload: ChapterCompletionPayload) {
  try {
    window.sessionStorage.setItem(
      "igil-selesai-mat-k5-b8",
      JSON.stringify(payload),
    );
  } catch {
    // Catatan di perangkat ini saja. Tidak ada panggilan API.
  }
}

function ModulBab8() {
  const params = useSearchParams();
  const nama = params.get("nama")?.trim() || "Penjelajah Muda";
  return (
    <MatematikaKelas5Bab8 studentName={nama} onChapterComplete={catatLokal} />
  );
}

export default function HalamanMtk5Bab8() {
  return (
    <Suspense fallback={null}>
      <ModulBab8 />
    </Suspense>
  );
}
