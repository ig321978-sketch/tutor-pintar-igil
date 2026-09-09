import Link from "next/link";
import PageShell from "@/components/PageShell";

const PINTASAN = [
  {
    href: "/studio-kreator",
    judul: "Studio Kreator",
    isi: "Sunting, kunci, atau hapus cache naskah materi dan latihan.",
  },
] as const;

export default function DasborAdminPage() {
  return (
    <PageShell
      judul="Dasbor Admin"
      subjudul="Kelola materi dan cache tutor. Hanya akun dengan peran admin yang dapat membuka halaman ini."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {PINTASAN.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-3xl border border-[#1C01A5]/15 bg-white px-5 py-6 shadow-sm transition hover:border-[#F0AB00]"
            >
              <p className="text-lg font-extrabold text-[#1C01A5]">{item.judul}</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">{item.isi}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
