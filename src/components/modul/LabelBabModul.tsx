function pecahBab(materi: string) {
  const cocok = materi.trim().match(/^bab\s+(\d+)\s*:\s*(.*)$/i);
  if (!cocok) return { nomor: "", judul: materi.trim() };
  return { nomor: cocok[1], judul: cocok[2].trim() || materi.trim() };
}

function tulisKelas(kelas: string) {
  const bersih = kelas.trim();
  if (/^kelas\b/i.test(bersih)) return bersih;
  return `Kelas ${bersih}`;
}

export default function LabelBabModul({
  kelas,
  materi,
}: {
  kelas: string;
  materi: string;
}) {
  const { nomor, judul } = pecahBab(materi);
  const lencana = nomor ? `${tulisKelas(kelas)} • Bab ${nomor}` : tulisKelas(kelas);
  return (
    <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-950 px-4 py-3 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-400 text-xl font-black text-indigo-950 shadow-md">
          {nomor || "IG"}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-indigo-500 bg-indigo-700/80 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              {lencana}
            </span>
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
              Zero-Cost Client-Side
            </span>
          </div>
          <h1 className="mt-0.5 text-lg font-extrabold tracking-tight md:text-xl">{judul}</h1>
        </div>
      </div>
    </div>
  );
}
