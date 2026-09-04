import { pecahNaskahTampil } from "@/lib/format-naskah";

export default function TeksNaskah({
  teks,
  ringkas = false,
  className = "",
}: {
  teks: string;
  ringkas?: boolean;
  className?: string;
}) {
  const blok = pecahNaskahTampil(teks);
  if (blok.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {blok.map((item, indeks) => {
        if (item.jenis === "rumus") {
          return (
            <p
              key={`rumus-${indeks}`}
              className="rounded-xl bg-white/80 px-3 py-2 font-semibold tabular-nums tracking-wide text-[#1C01A5] shadow-sm"
            >
              {item.teks}
            </p>
          );
        }
        if (item.jenis === "uraian" && !ringkas) {
          return (
            <p
              key={`uraian-${indeks}`}
              className="text-sm font-medium leading-relaxed text-slate-700 sm:text-base"
            >
              {item.teks}
            </p>
          );
        }
        return (
          <p
            key={`plain-${indeks}`}
            className={
              ringkas
                ? "text-xs font-medium leading-snug text-slate-600 sm:text-sm"
                : "text-sm font-medium leading-relaxed text-slate-700 sm:text-base"
            }
          >
            {item.teks}
          </p>
        );
      })}
    </div>
  );
}
