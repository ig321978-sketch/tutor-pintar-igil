import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfilSekolah from "@/components/komunitas/ProfilSekolah";
import { cariSekolah, komunitasData } from "@/components/komunitas/komunitas-data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return komunitasData.sekolah.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const sekolah = cariSekolah(id);
  if (!sekolah) return { title: "$IGIL · Komunitas IGIL" };
  return {
    title: `$IGIL · ${sekolah.nama}`,
    description: `Profil komunitas IGIL ${sekolah.nama}, ${sekolah.kota}.`,
  };
}

export default async function HalamanProfilKomunitas({ params }: Props) {
  const { id } = await params;
  const sekolah = cariSekolah(id);
  if (!sekolah) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl px-2 py-6 sm:px-4 sm:py-8">
      <ProfilSekolah sekolah={sekolah} />
    </main>
  );
}
