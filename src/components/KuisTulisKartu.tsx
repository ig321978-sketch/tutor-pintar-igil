"use client";

import { useState } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import {
  adalahGambarJawaban,
  jawabanTulisGenerik,
  jawabanTulisMemuatAlias,
} from "@/lib/nilai-kuis-tulis";

type StatusJawaban = "benar" | "salah" | null;

async function nilaiLewatApi(payload: {
  pertanyaan: string;
  alias: string[];
  konteks: string;
  jawaban: string;
}): Promise<{ benar: boolean; pesan?: string }> {
  const respons = await fetch("/api/kuis-tulis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await respons.json()) as {
    berhasil?: boolean;
    benar?: boolean;
    pesan?: string;
  };
  if (!respons.ok || !data.berhasil) {
    throw new Error(data.pesan || "Gagal menilai jawaban. Kirim lagi.");
  }
  return { benar: data.benar === true };
}

export default function KuisTulisKartu({
  id,
  pertanyaan = "Tuliskan jawaban atau kesimpulan dari materi kartu ini.",
  alias = [],
  konteks = "",
  rapat = false,
  hanyaKanvas = false,
}: {
  id: string;
  pertanyaan?: string;
  alias?: string[];
  konteks?: string;
  rapat?: boolean;
  hanyaKanvas?: boolean;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawaban>(null);
  const [pesan, setPesan] = useState("");
  const [cuplikan, setCuplikan] = useState("");

  const simpanCuplikan = (data: string) => {
    setCuplikan(adalahGambarJawaban(data) ? "tulisan tangan" : data.trim());
  };

  const nilaiJawaban = async (data: string) => {
    setPesan("");
    simpanCuplikan(data);
    if (jawabanTulisGenerik(data)) {
      setStatus("salah");
      return;
    }
    if (!adalahGambarJawaban(data) && alias.length > 0) {
      const benar = jawabanTulisMemuatAlias(data, alias);
      setStatus(benar ? "benar" : "salah");
      if (benar) kuis?.tandaiBenar(id);
      return;
    }
    try {
      const hasil = await nilaiLewatApi({
        pertanyaan,
        alias,
        konteks,
        jawaban: data,
      });
      setStatus(hasil.benar ? "benar" : "salah");
      if (hasil.benar) kuis?.tandaiBenar(id);
    } catch (error) {
      setStatus(null);
      setPesan(
        error instanceof Error
          ? error.message
          : "Gagal menilai jawaban. Kirim lagi.",
      );
    }
  };

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
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold leading-relaxed text-[#1C01A5]">
        {pertanyaan}
      </p>
      {hanyaKanvas ? (
        <p className="text-xs font-bold text-[#1C01A5]/70">
          Tidak ada keyboard. Coretkan huruf dengan jari atau mouse di kotak kanvas.
        </p>
      ) : (
        <p className="text-xs font-bold text-[#1C01A5]/70">
          PC: pilih Ketik Teks. HP atau pena: pilih Tulis Tangan.
        </p>
      )}
      <WritingCanvas
        disabled={status === "benar"}
        hanyaKanvas={hanyaKanvas}
        onSubmit={nilaiJawaban}
      />
      <HasilJawabanKuis
        status={status}
        cuplikan={cuplikan}
        pesanSalah="Jawaban belum tepat. Coba tulis atau ketik lagi."
      />
      {pesan ? (
        <p className="text-sm font-black text-rose-600">{pesan}</p>
      ) : null}
    </div>
  );
}
