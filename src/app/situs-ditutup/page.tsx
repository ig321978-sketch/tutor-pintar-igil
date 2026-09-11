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
      judul="Materi ini masih dikunci"
      subjudul="Publik saat ini hanya dapat membuka Pendidikan Agama Islam dan Budi Pekerti Kelas 1 SD. Materi dan fitur lain tetap terkunci."
    >
      <div className="flex flex-wrap gap-3">
        <Link
          href="/ruang-belajar"
          className={`${kelasTombolUtama} igil-tombol inline-flex rounded-full px-5 py-3 text-sm font-bold`}
        >
          Belajar PAI Kelas 1 SD
        </Link>
        <Link
          href="/login?next=/tutor"
          className="igil-tombol inline-flex rounded-full border-2 border-[#1C01A5] px-5 py-3 text-sm font-bold text-[#1C01A5]"
        >
          Masuk sebagai admin
        </Link>
      </div>
    </PageShell>
  );
}
