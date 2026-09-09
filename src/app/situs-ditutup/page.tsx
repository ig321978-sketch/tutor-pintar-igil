import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { kelasTombolUtama } from "@/lib/tema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Situs sementara ditutup · $IGIL",
  robots: { index: false, follow: false },
};

export default function HalamanSitusDitutup() {
  return (
    <PageShell
      judul="Situs sementara tidak tersedia"
      subjudul="www.igiligil.xyz sedang dinonaktifkan untuk publik. Admin dapat masuk untuk membuka website."
    >
      <Link
        href="/login?next=/tutor"
        className={`${kelasTombolUtama} igil-tombol inline-flex rounded-full px-5 py-3 text-sm font-bold`}
      >
        Masuk sebagai admin
      </Link>
    </PageShell>
  );
}
