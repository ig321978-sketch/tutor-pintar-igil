import IgilModulePlayer, { type BabModul } from "@/components/IgilModulePlayer";

const BAB_VALID: BabModul[] = ["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3", "mtk-1-bab4", "mtk-1-bab5", "mtk-1-bab6"];

export default async function ModulPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ bab?: string }>;
}) {
  const { bab } = await searchParams;
  const pilih = BAB_VALID.find((b) => b === bab) ?? "mtk-1-bab1";
  return <IgilModulePlayer bab={pilih} />;
}
