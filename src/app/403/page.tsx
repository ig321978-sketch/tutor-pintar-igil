import Link from "next/link";
import PageShell from "@/components/PageShell";
import { kelasTombolUtama } from "@/lib/tema";

export default function HalamanAksesDitolak() {
  return (
    <PageShell
      judul="403 Akses Ditolak"
      subjudul="Halaman ini hanya untuk pengguna dengan peran admin."
    >
      <Link
        href="/"
        className={`${kelasTombolUtama} igil-tombol inline-flex rounded-full px-5 py-3 text-sm font-bold`}
      >
        Kembali ke beranda
      </Link>
    </PageShell>
  );
}
