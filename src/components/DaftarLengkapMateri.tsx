import type { DaftarLengkapTampil, ItemPaketLengkap } from "@/lib/paket-lengkap-materi";

const WARNA = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
  "border-[#D97706] bg-[#FFFBEB]",
];

function KartuItem({
  item,
  indeks,
  jenis,
}: {
  item: ItemPaketLengkap;
  indeks: number;
  jenis: DaftarLengkapTampil["jenis"];
}) {
  const warna = WARNA[indeks % WARNA.length];
  if (jenis === "huruf") {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-2xl border-2 px-2 py-3 ${warna}`}
      >
        <p dir="rtl" lang="ar" className="font-arab text-3xl font-black leading-none text-[#1C01A5] sm:text-4xl">
          {item.lambang}
        </p>
        <p className="mt-2 text-center text-xs font-extrabold uppercase tracking-wide text-slate-700">
          {item.nama}
        </p>
      </div>
    );
  }
  if (jenis === "ayat") {
    return (
      <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          {item.nama}
        </p>
        {item.lambang ? (
          <p
            dir="rtl"
            lang="ar"
            className="font-arab mt-2 text-right text-xl font-bold leading-relaxed text-[#1C01A5] sm:text-2xl"
          >
            {item.lambang}
          </p>
        ) : null}
        {item.latin ? (
          <p className="mt-2 text-sm font-extrabold text-slate-800">{item.latin}</p>
        ) : null}
        {item.artinya ? (
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Artinya: {item.artinya}
          </p>
        ) : null}
      </article>
    );
  }
  return (
    <article className={`flex items-start gap-3 rounded-2xl border-2 px-3 py-2.5 ${warna}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-sm font-black text-white">
        {item.lambang && /^\d+$/.test(item.lambang) ? item.lambang : indeks + 1}
      </span>
      <div className="min-w-0">
        <p className="font-extrabold text-slate-800">{item.nama}</p>
        {item.artinya ? (
          <p className="mt-0.5 text-sm text-slate-600">{item.artinya}</p>
        ) : null}
      </div>
    </article>
  );
}

export default function DaftarLengkapMateri({
  data,
}: {
  data: DaftarLengkapTampil | DaftarLengkapTampil[];
}) {
  const semua = Array.isArray(data) ? data : [data];
  if (semua.length === 0) return null;
  return (
    <div className="space-y-6">
      {semua.map((paket) => (
        <section
          key={paket.judul}
          className="overflow-hidden rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-[#FBF6EA] px-3 py-4 sm:px-5 sm:py-5"
        >
          <h4 className="mb-4 text-center text-lg font-black uppercase tracking-wide text-[#1C01A5]">
            {paket.judul}
          </h4>
          <div
            className={
              paket.jenis === "huruf"
                ? "grid grid-cols-4 gap-2 sm:grid-cols-7"
                : "space-y-2"
            }
          >
            {paket.item.map((item, indeks) => (
              <KartuItem
                key={`${paket.judul}-${item.lambang ?? item.nama}-${indeks}`}
                item={item}
                indeks={indeks}
                jenis={paket.jenis}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
