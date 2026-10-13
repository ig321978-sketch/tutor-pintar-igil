export type ButirIkon = { ikon: string; teks: string };

export default function PanduanIkon({
  butir,
  judul = "Panduan simbol",
}: {
  butir: ButirIkon[];
  judul?: string;
}) {
  return (
    <div className="mt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      <div className={`mt-2 grid gap-2 ${butir.length > 3 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
        {butir.map((item) => (
          <div
            key={`${item.ikon}-${item.teks}`}
            className="rounded-2xl border-2 border-[#F0AB00]/80 bg-white px-2 py-3 text-center shadow-sm"
          >
            <p className="text-4xl leading-none" aria-hidden>
              {item.ikon}
            </p>
            <p className="mt-2 text-xs font-black leading-snug text-[#1C01A5]">{item.teks}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
