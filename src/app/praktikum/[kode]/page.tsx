import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KartuPagarLangganan } from "@/components/pembayaran/KartuPagarLangganan";
import PraktikumBlok from "@/components/praktikum/PraktikumBlok";
import { bacaKeputusanLangganan } from "@/lib/akses-langganan-server";
import { buatPraktikumBab } from "@/lib/praktikum-pilot";
import { KODE_BAB_PRAKTIKUM, muatRingkasBab } from "@/lib/praktikum-sumber";

type Props = { params: Promise<{ kode: string }>; searchParams: Promise<{ anak?: string }> };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return KODE_BAB_PRAKTIKUM.map((kode) => ({ kode }));
}

async function tugasDari(kode: string) {
  const ringkas = await muatRingkasBab(kode);
  return ringkas ? buatPraktikumBab(ringkas) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kode } = await params;
  const hasil = await tugasDari(kode);
  return { title: hasil ? `$IGIL · ${hasil.tugas.title}` : "$IGIL · Praktikum" };
}

export default async function HalamanPraktikumBab({ params, searchParams }: Props) {
  const { kode } = await params;
  const sp = await searchParams;
  const anak = typeof sp.anak === "string" ? sp.anak : null;
  const keputusan = await bacaKeputusanLangganan(anak);
  if (!keputusan.boleh) {
    return (
      <KartuPagarLangganan
        alasan={keputusan.alasan ?? "nonaktif"}
        anak={keputusan.anak}
        anakDipilih={anak}
        kembali={`/praktikum/${kode}`}
      />
    );
  }
  const hasil = await tugasDari(kode);
  if (!hasil) notFound();
  // Kunci jawaban (hasil.kunci) sengaja tidak dikirim ke peramban: penilaian tersembunyi sampai akhir bulan.
  return <PraktikumBlok blokId={hasil.tugas.blok_id} tugas={hasil.tugas} />;
}
