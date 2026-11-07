import IgilModulePlayer from "@/components/IgilModulePlayer";

export default async function ModulPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ bab?: string }>;
}) {
  const { bab } = await searchParams;
  return <IgilModulePlayer bab={bab === "mtk-1-bab2" ? "mtk-1-bab2" : "mtk-1-bab1"} />;
}
