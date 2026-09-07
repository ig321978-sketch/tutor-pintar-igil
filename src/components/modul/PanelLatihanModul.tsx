"use client";

import ModuleRenderer from "@/components/ModuleRenderer";
import { hurufKunci, pecahNaskahPilihanGanda } from "@/lib/kuis";
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
    <div className="space-y-8">
      {soal.map((item, indeks) => {
        const nomor = indeks + 1;
        const pilihan = jawaban[String(nomor)];
        const kunci = hurufKunci(kunciJawaban, nomor);
        const sudahJawab = Boolean(pilihan);
        const benar = sudahJawab && pilihan === kunci;
        const { naskah, pilihan: naskahPilihan } = pecahNaskahPilihanGanda(item);
        return (
          <div
            key={`soal-${nomor}`}
            className={indeks > 0 ? "border-t border-[#1C01A5]/10 pt-6" : ""}
          >
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]/50">
              Soal {nomor}
            </p>
            {naskah ? (
              <ModuleRenderer konten={naskah} padat className="mt-1" />
            ) : null}
            <div className="mt-3 flex flex-col gap-2">
              {(["A", "B", "C", "D"] as const).map((huruf) => {
                const aktif = pilihan === huruf;
                const tampilKunci = sudahJawab && huruf === kunci;
                const teksPilihan = naskahPilihan[huruf];
                return (
                  <div key={huruf} className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => onPilih(nomor, huruf)}
                      disabled={sudahJawab}
                      className={`mt-0.5 shrink-0 rounded-xl border-2 px-4 py-2 text-sm font-extrabold ${
                        tampilKunci
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : aktif
                            ? "border-rose-600 bg-rose-600 text-white"
                            : "border-[#1C01A5]/20 bg-white text-[#1C01A5] hover:border-[#F0AB00] disabled:opacity-60"
                      }`}
                    >
                      {huruf}
                    </button>
                    {teksPilihan ? (
                      <ModuleRenderer
                        konten={teksPilihan}
                        padat
                        className="min-w-0 flex-1 pt-1 text-slate-800"
                      />
                    ) : null}
                  </div>
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
      <button
        type="button"
        onClick={onLanjutUjian}
        className={`${kelasTombolUtama} flex w-full items-center justify-center rounded-2xl px-6 py-3 text-base font-extrabold`}
      >
        Lanjut ke ujian
      </button>
      {motivasi ? (
        <p className="text-center text-sm font-bold text-[#1C01A5]">{motivasi}</p>
      ) : null}
    </div>
  );
}
