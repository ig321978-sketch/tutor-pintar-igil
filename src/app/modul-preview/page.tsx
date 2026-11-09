import IgilModulePlayer, { type BabBaru, type BabLama } from "@/components/IgilModulePlayer";
import PemutarBabBaru from "@/components/PemutarBabBaru";

const BAB_VALID: BabLama[] = ["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3", "mtk-1-bab4", "mtk-1-bab5", "mtk-1-bab6", "mtk-1-bab7", "mtk-1-bab8", "mtk-2-bab1", "mtk-2-bab2", "mtk-2-bab3", "mtk-2-bab4", "mtk-2-bab5", "mtk-2-bab6", "mtk-2-bab7", "mtk-2-bab8"];

export default async function ModulPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ bab?: string }>;
}) {
  const { bab } = await searchParams;
  if (bab && /^mtk-[3-6]-bab\d+$/.test(bab)) return <PemutarBabBaru bab={bab as BabBaru} />;
  const pilih = BAB_VALID.find((b) => b === bab) ?? "mtk-1-bab1";
  return <IgilModulePlayer bab={pilih} />;
}
