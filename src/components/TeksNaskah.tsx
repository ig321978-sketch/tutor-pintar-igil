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
        if (item.jenis === "soal" || item.jenis === "kunci") {
          if (ringkas) return null;
          const judul = /^(contoh|latihan|kunci)\b/i.test(item.teks);
          return (
            <p
              key={`soal-${indeks}`}
              className={
                judul
                  ? "mt-3 text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]"
                  : item.jenis === "kunci"
                    ? "rounded-xl border border-[#1C01A5]/15 bg-white/70 px-3 py-2 text-sm font-semibold tabular-nums text-[#1C01A5]/80"
                    : "rounded-xl border-2 border-[#F0AB00]/50 bg-[#FFF8E8] px-3 py-2 text-sm font-medium tabular-nums leading-relaxed text-slate-700"
              }
            >
              {item.teks}
            </p>
          );
        }
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
