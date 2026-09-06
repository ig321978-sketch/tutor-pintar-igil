"use client";

import ModuleRenderer from "@/components/ModuleRenderer";

export default function PanelUjianModul({
  soal,
  draf,
  jawaban,
  motivasi,
  onDraf,
  onKirim,
}: {
  soal: string[];
  draf: Record<string, string>;
  jawaban: Record<string, string>;
  motivasi: string;
  onDraf: (nomor: number, teks: string) => void;
  onKirim: (nomor: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#1C01A5]/20 bg-[#EEE9FF] p-6 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1C01A5]/60">
          Ujian
        </p>
        <h2 className="mt-2 text-2xl font-black text-[#1C01A5]">3 soal uraian</h2>
        <p className="mt-1 text-sm font-semibold text-[#C48800]">
          1 Reguler · 2 HOTS
        </p>
        <div className="mt-6 space-y-8">
          {soal.length === 0 ? (
            <p className="text-sm font-bold text-[#1C01A5]/70">
              Soal ujian belum tersedia di modul ini.
            </p>
          ) : (
            soal.map((item, indeks) => {
              const nomor = indeks + 1;
              const kunci = String(nomor);
              const sudahKirim = Boolean(jawaban[kunci]);
              return (
                <div key={`esai-${nomor}`}>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/50">
                    Soal {nomor}
                  </p>
                  <ModuleRenderer konten={item} className="mt-1" />
                  <textarea
                    value={sudahKirim ? jawaban[kunci] : (draf[kunci] ?? "")}
                    onChange={(e) => onDraf(nomor, e.target.value)}
                    disabled={sudahKirim}
                    rows={5}
                    placeholder="Tulis uraianmu di sini..."
                    className="mt-3 w-full rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none focus:border-[#F0AB00] disabled:bg-slate-50"
                  />
                  <button
                    type="button"
                    onClick={() => onKirim(nomor)}
                    disabled={sudahKirim || !(draf[kunci] ?? "").trim()}
                    className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-50"
                  >
                    {sudahKirim ? "Jawaban tersimpan" : "Kirim uraian"}
                  </button>
                  {sudahKirim ? (
                    <p className="mt-2 text-sm font-extrabold text-emerald-700">
                      Jawaban tersimpan. Rubrik ujian dipakai di rapor, tanpa menampilkan kunci lengkap.
                    </p>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>
      {motivasi ? (
        <p className="rounded-xl border-2 border-dashed border-[#F0AB00]/50 bg-white p-4 text-center text-sm font-bold text-[#1C01A5]">
          {motivasi}
        </p>
      ) : null}
    </div>
  );
}
