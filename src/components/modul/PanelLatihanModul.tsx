"use client";

import ModuleRenderer from "@/components/ModuleRenderer";
import { hurufKunci } from "@/lib/kuis";
import { kelasTombolUtama } from "@/lib/tema";

export default function PanelLatihanModul({
  soal,
  kunciJawaban,
  jawaban,
  motivasi,
  onPilih,
  onLanjutUjian,
}: {
  soal: string[];
  kunciJawaban?: string[];
  jawaban: Record<string, string>;
  motivasi: string;
  onPilih: (nomor: number, huruf: string) => void;
  onLanjutUjian: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-[#F0AB00]/40 bg-[#FFF8E8] p-6 shadow-sm">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C48800]">
          Latihan
        </p>
        <h2 className="mt-2 text-2xl font-black text-[#1C01A5]">
          10 pilihan ganda
        </h2>
        <p className="mt-1 text-sm font-semibold text-[#C48800]">
          3 Reguler · 7 HOTS
        </p>
        <div className="mt-6 space-y-8">
          {soal.map((item, indeks) => {
            const nomor = indeks + 1;
            const pilihan = jawaban[String(nomor)];
            const kunci = hurufKunci(kunciJawaban, nomor);
            const sudahJawab = Boolean(pilihan);
            const benar = sudahJawab && pilihan === kunci;
            return (
              <div key={`soal-${nomor}`}>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/50">
                  Soal {nomor}
                </p>
                <ModuleRenderer konten={item} className="mt-1" />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["A", "B", "C", "D"].map((huruf) => {
                    const aktif = pilihan === huruf;
                    const tampilKunci = sudahJawab && huruf === kunci;
                    return (
                      <button
                        key={huruf}
                        type="button"
                        onClick={() => onPilih(nomor, huruf)}
                        disabled={sudahJawab}
                        className={`rounded-xl border-2 px-4 py-2 text-sm font-extrabold ${
                          tampilKunci
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : aktif
                              ? "border-rose-600 bg-rose-600 text-white"
                              : "border-[#1C01A5]/20 bg-white text-[#1C01A5] hover:border-[#F0AB00] disabled:opacity-60"
                        }`}
                      >
                        {huruf}
                      </button>
                    );
                  })}
                </div>
                {sudahJawab ? (
                  <p
                    className={`mt-2 text-sm font-extrabold ${
                      benar ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {benar
                      ? "Benar. Jawabanmu tepat."
                      : kunci
                        ? `Salah. Jawaban yang benar adalah ${kunci}.`
                        : "Jawaban tersimpan. Kunci soal belum tersedia untuk modul ini."}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onLanjutUjian}
          className={`${kelasTombolUtama} mt-8 flex w-full items-center justify-center rounded-2xl px-6 py-3 text-base font-extrabold`}
        >
          Lanjut ke ujian
        </button>
      </div>
      {motivasi ? (
        <p className="rounded-xl border-2 border-dashed border-[#F0AB00]/50 bg-white p-4 text-center text-sm font-bold text-[#1C01A5]">
          {motivasi}
        </p>
      ) : null}
    </div>
  );
}
