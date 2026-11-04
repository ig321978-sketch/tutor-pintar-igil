export default function TabelInfoGrafis({
  judul,
  kepala,
  baris,
  kaki,
}: {
  judul?: string;
  kepala: [string, string, string];
  baris: Array<[string, string, string]>;
  kaki?: string;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border-4 border-sky-400">
      {judul ? (
        <p className="bg-[#5EBEFF] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-[#17324A]">
          {judul}
        </p>
      ) : null}
      <div className="grid grid-cols-3 bg-[#9AD8FF] px-3 py-2 text-[10px] font-black uppercase text-[#17324A] sm:text-xs">
        {kepala.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {baris.map((isi, indeks) => (
        <div
          key={isi.join("|")}
          className={`grid grid-cols-3 items-center gap-2 border-t border-sky-200 px-3 py-3 text-sm font-bold leading-snug ${
            indeks % 2 === 0 ? "bg-sky-50" : "bg-rose-50"
          }`}
        >
          <span className="text-lg leading-tight">{isi[0]}</span>
          <span>{isi[1]}</span>
          <span className="text-lg font-black text-[#0F74B8]">{isi[2]}</span>
        </div>
      ))}
      {kaki ? (
        <p className="border-t-4 border-sky-400 bg-emerald-50 px-3 py-3 text-center text-lg font-black text-[#0F74B8]">
          {kaki}
        </p>
      ) : null}
    </div>
  );
}
