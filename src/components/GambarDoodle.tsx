type UkuranDoodle = "kecil" | "sedang" | "lebar";

export type GambarSisipan = {
  setelahParagraf: number;
  src: string;
  alt: string;
  ukuran: UkuranDoodle;
};

function kelasLebarDoodle(ukuran: UkuranDoodle): string {
  if (ukuran === "kecil") return "max-w-[220px] md:max-w-[260px]";
  if (ukuran === "sedang") return "max-w-md";
  return "max-w-3xl";
}

export default function GambarDoodle({
  src,
  alt,
  ukuran,
  keterangan,
}: {
  src: string;
  alt: string;
  ukuran: UkuranDoodle;
  keterangan?: string;
}) {
  return (
    <figure
      className={`relative mx-auto w-full ${kelasLebarDoodle(ukuran)} rotate-[-0.4deg]`}
    >
      <div className="rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea] p-2.5 shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full rounded-xl object-cover" />
      </div>
      {keterangan ? (
        <figcaption className="mt-3 text-center text-sm font-medium italic text-slate-500">
          {keterangan}
        </figcaption>
      ) : null}
    </figure>
  );
}
