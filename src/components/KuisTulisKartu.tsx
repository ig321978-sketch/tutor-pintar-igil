"use client";

import { useState } from "react";
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
}: {
  id: string;
  pertanyaan?: string;
  alias?: string[];
  konteks?: string;
  rapat?: boolean;
}) {
  const kuis = useKuisMateri();
  const sudah = Boolean(kuis?.sudahBenar(id));
  const [status, setStatus] = useState<StatusJawaban>(sudah ? "benar" : null);
  const [pesan, setPesan] = useState("");

  const nilaiJawaban = async (data: string) => {
    setPesan("");
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
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        {pertanyaan}
      </p>
      <p className="text-xs font-bold text-[#1C01A5]/70">
        PC: pilih Ketik Teks. HP atau pena: pilih Tulis Tangan.
      </p>
      <WritingCanvas
        disabled={status === "benar"}
        onSubmit={nilaiJawaban}
      />
      <div className="flex flex-wrap items-center gap-2">
        {status === "benar" ? (
          <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-black tracking-wide text-white">
            BENAR
          </span>
        ) : null}
        {status === "salah" ? (
          <span className="rounded-full bg-rose-600 px-4 py-2 text-sm font-black tracking-wide text-white">
            SALAH
          </span>
        ) : null}
      </div>
      {status === "salah" ? (
        <p className="text-sm font-semibold text-rose-700">
          Jawaban belum tepat. Coba tulis atau ketik lagi.
        </p>
      ) : null}
      {pesan ? (
        <p className="text-sm font-black text-rose-600">{pesan}</p>
      ) : null}
    </div>
  );
}
