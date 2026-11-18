import { ambilDetailStudio } from "@/lib/studio-kreator-data";
import StudioKreatorDetail from "./detail-client";

export default async function StudioKreatorDetailPage({
  params,
}: {
  params: Promise<{ kunci: string }>;
}) {
  const { kunci: mentah } = await params;
  const kunci = decodeURIComponent(mentah || "").trim();
  if (!kunci) {
    return (
      <main className="px-2 py-10 font-semibold text-rose-600">
        Kunci modul tidak valid.
      </main>
    );
  }
  const awal = await ambilDetailStudio(kunci);
  return <StudioKreatorDetail kunci={kunci} awal={awal} />;
}
