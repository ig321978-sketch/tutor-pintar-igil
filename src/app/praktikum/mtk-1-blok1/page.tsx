import type { Metadata } from "next";
import { KartuPagarLangganan } from "@/components/pembayaran/KartuPagarLangganan";
import PraktikumBlok from "@/components/praktikum/PraktikumBlok";
import { bacaKeputusanLangganan } from "@/lib/akses-langganan-server";

export const metadata: Metadata = {
  title: "$IGIL · Praktikum Blok 1 Matematika Kelas 1",
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ anak?: string }> };

export default async function HalamanPraktikumMtk1Blok1({ searchParams }: Props) {
  const { anak } = await searchParams;
  const dipilih = typeof anak === "string" ? anak : null;
  const keputusan = await bacaKeputusanLangganan(dipilih);
  if (!keputusan.boleh) {
    return (
      <KartuPagarLangganan
        alasan={keputusan.alasan ?? "nonaktif"}
        anak={keputusan.anak}
        anakDipilih={dipilih}
        kembali="/praktikum/mtk-1-blok1"
      />
    );
  }
  return <PraktikumBlok blokId="mtk-1-blok1" />;
}
