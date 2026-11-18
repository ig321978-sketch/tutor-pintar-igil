import type { Metadata } from "next";
import DaftarPraktikum, { type BabPraktikum } from "@/components/praktikum/DaftarPraktikum";
import { uraiKode } from "@/lib/praktikum-pilot";
import { KODE_BAB_PRAKTIKUM, muatRingkasBab } from "@/lib/praktikum-sumber";

export const metadata: Metadata = {
  title: "$IGIL · Praktikum",
};

export default async function HalamanPraktikum() {
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
