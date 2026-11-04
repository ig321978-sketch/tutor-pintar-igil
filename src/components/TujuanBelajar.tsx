export default function TujuanBelajar({
  butir,
  judul = "Tujuan Pembelajaran",
  selesai,
}: {
  butir: string[];
  judul?: string;
  selesai?: boolean[];
}) {
  return (
    <div className="mt-4 rounded-2xl border-2 border-[#F0AB00]/70 bg-[#FFF8E8] px-4 py-3">
      <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">{judul}</p>
      <ul className="mt-3 space-y-2">
        {butir.map((teks, indeks) => {
          const tercapai = selesai?.[indeks] === true;
          return (
            <li key={teks} className="flex items-start gap-2 text-sm font-semibold leading-snug text-slate-700">
              {tercapai ? (
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-xs font-black text-white" aria-label="Tercapai">
                  ✓
                </span>
              ) : (
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden>
                  <circle cx="12" cy="12" r="9" fill="none" stroke="#1C01A5" strokeWidth="2" />
                  <circle cx="12" cy="12" r="5.5" fill="none" stroke="#F0AB00" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2.2" fill="#E11D48" />
                </svg>
              )}
              <span>{teks}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
