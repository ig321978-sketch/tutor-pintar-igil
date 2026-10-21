const IKON = {
  Rara: "/doodle-mtk/ikon-rara.png",
  Bimo: "/doodle-mtk/ikon-bimo.png",
  burung: "/doodle-mtk/ikon-igil-burung.png",
  tikus: "/doodle-mtk/ikon-igil-tikus.png",
  nenek: "/doodle-mtk/ikon-igil-nenek.png",
} as const;

export function NamaDialog({
  nama,
  igil = "burung",
}: {
  nama: string;
  igil?: "burung" | "tikus" | "nenek";
}) {
  return (
    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
      <IkonKarakter nama={nama} igil={igil} />
      {nama}
    </p>
  );
}

function IkonKarakter({ nama, igil }: { nama: string; igil: "burung" | "tikus" | "nenek" }) {
  const sumber =
    nama === "Rara" ? IKON.Rara : nama === "Bimo" ? IKON.Bimo : nama === "Igil" ? IKON[igil] : "";
  if (!sumber) return null;
  return (
    <span className="inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-[#1C01A5]/15" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sumber} alt="" className="h-full w-full object-cover" />
    </span>
  );
}
