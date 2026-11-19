import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "$IGIL · Hubungi Kami",
  description: "Alamat dan nomor WhatsApp Insan Gemar Ilmu dan Logika (IGIL).",
};

const WA_TAMPIL = "0812 2044 7910";
const WA_TAUTAN = "https://wa.me/6281220447910";

export default function HalamanHubungiKami() {
  return (
    <main className="flex min-h-[80vh] flex-1 flex-col items-center justify-center bg-[#1C01A5] px-4 py-10 text-white">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon-512.png"
          alt="Logo IGIL"
          width={80}
          height={80}
          className="mx-auto h-20 w-20 rounded-3xl ring-4 ring-amber-400"
        />
        <h1 className="text-3xl font-black text-amber-400">Hubungi Kami</h1>

        <address
          className="space-y-1 border-y-2 border-amber-400 py-5 text-lg font-semibold not-italic leading-relaxed"
          data-testid="alamat-igil"
        >
          <p className="text-xl font-black">Insan Gemar Ilmu dan Logika</p>
          <p>Desa Cilimus, Kecamatan Cilimus</p>
          <p>Kabupaten Kuningan, Jawa Barat</p>
          <p>Indonesia 45556</p>
        </address>

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-amber-400">WhatsApp</p>
          <a
            href={WA_TAUTAN}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="tautan-wa"
            className="mt-2 inline-flex min-h-[48px] items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-lg font-black text-indigo-950 hover:bg-amber-300"
          >
            {WA_TAMPIL}
          </a>
        </div>

        <Link href="/" className="inline-block text-sm font-bold text-indigo-100 underline underline-offset-2">
          Kembali
        </Link>
      </div>
    </main>
  );
}
