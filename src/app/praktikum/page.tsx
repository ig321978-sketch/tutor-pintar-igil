import type { Metadata } from "next";
import { KartuPagarLangganan } from "@/components/pembayaran/KartuPagarLangganan";
import DaftarPraktikum, { type BabPraktikum } from "@/components/praktikum/DaftarPraktikum";
import { bacaKeputusanLangganan } from "@/lib/akses-langganan-server";
import { uraiKode } from "@/lib/praktikum-pilot";
import { KODE_BAB_PRAKTIKUM, muatRingkasBab } from "@/lib/praktikum-sumber";

export const metadata: Metadata = {
  title: "$IGIL · Praktikum",
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ anak?: string }> };

export default async function HalamanPraktikum({ searchParams }: Props) {
  const { anak } = await searchParams;
  const keputusan = await bacaKeputusanLangganan(typeof anak === "string" ? anak : null);
  if (!keputusan.boleh) {
    return (
      <KartuPagarLangganan
        alasan={keputusan.alasan ?? "nonaktif"}
        anak={keputusan.anak}
        anakDipilih={typeof anak === "string" ? anak : null}
        kembali="/praktikum"
      />
    );
  }
  // Hanya judul bab yang dikirim ke peramban; isi tugas dibuat saat halaman bab dibuka.
  const daftar = await Promise.all(
    KODE_BAB_PRAKTIKUM.map(async (kode): Promise<BabPraktikum | null> => {
      const r = await muatRingkasBab(kode);
      const pos = uraiKode(kode);
      if (!r || !pos) return null;
      return { kode, kelas: pos.kelas, bab: pos.bab, judul: r.title, kedua: kode.endsWith("-kedua") };
    }),
  );
  return <DaftarPraktikum bab={daftar.filter((b): b is BabPraktikum => b !== null)} />;
}
