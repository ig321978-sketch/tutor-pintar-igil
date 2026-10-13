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
      <div className="mt-2 flex flex-wrap gap-2">
        {butir.map((item, indeks) => (
          <div
            key={`${item.ikon}-${item.teks}`}
            className={`min-w-[6.5rem] flex-1 basis-[30%] rounded-2xl border-2 px-2 py-3 text-center shadow-sm ${
              ["border-sky-300 bg-sky-50", "border-emerald-300 bg-emerald-50", "border-violet-300 bg-violet-50", "border-rose-300 bg-rose-50", "border-cyan-300 bg-cyan-50"][indeks % 5]
            }`}
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
