import type { ReactNode } from "react";

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
  kelas = "",
  materi = "",
  children,
}: {
  kelas?: string;
  materi?: string;
  children?: ReactNode;
}) {
  const { nomor, judul } = pecahBab(materi);
  const lencana = nomor ? `${tulisKelas(kelas)} • Bab ${nomor}` : tulisKelas(kelas);
  const adaJudul = Boolean(kelas.trim() && materi.trim());
  return (
    <div className="-mx-2 w-[calc(100%+1rem)] bg-white text-[#1C01A5]">
      {adaJudul ? (
        <div className="px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-indigo-500 bg-indigo-700/80 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              {lencana}
            </span>
            <span className="rounded-full border border-emerald-600/30 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
              Zero-Cost Client-Side
            </span>
          </div>
          <h1 className="mt-0.5 text-lg font-extrabold tracking-tight md:text-xl">{judul}</h1>
        </div>
      ) : null}
      {children}
    </div>
  );
}
