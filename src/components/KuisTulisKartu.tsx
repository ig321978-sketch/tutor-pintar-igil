"use client";

import { useState } from "react";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";

export default function KuisTulisKartu({
  id,
  pertanyaan = "Tuliskan jawaban atau kesimpulan dari materi kartu ini.",
  rapat = false,
}: {
  id: string;
  pertanyaan?: string;
  rapat?: boolean;
}) {
  const kuis = useKuisMateri();
  const sudah = Boolean(kuis?.sudahBenar(id));
  const [terkirim, setTerkirim] = useState(sudah);

  return (
    <div
      className={
        rapat
          ? "space-y-3"
          : "mt-6 space-y-3 border-t-2 border-[#1C01A5]/10 pt-5"
      }
    >
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ TULIS:
      </p>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        {pertanyaan}
      </p>
      <p className="text-xs font-bold text-[#1C01A5]/70">
        PC: pilih Ketik Teks. HP atau pena: pilih Tulis Tangan.
      </p>
      {terkirim || sudah ? (
        <p className="text-sm font-black text-emerald-700">
          Jawaban tertulis sudah dikirim.
        </p>
      ) : (
        <WritingCanvas
          onSubmit={() => {
            setTerkirim(true);
            kuis?.tandaiBenar(id);
          }}
        />
      )}
    </div>
  );
}
