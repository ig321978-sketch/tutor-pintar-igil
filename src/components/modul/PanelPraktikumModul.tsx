"use client";

import { useState } from "react";
import { Play, Sparkles } from "lucide-react";
import { tambahTokenIgil } from "@/lib/progres";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

type Evaluasi = {
  lulus: boolean;
  judul: string;
  langkah: string;
  yangDiamati: string;
  umpanBalik: string;
  token: number;
};

export default function PanelPraktikumModul({
  nama,
  kelas,
  mapel,
  materi,
}: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
}) {
  const [ide, setIde] = useState("");
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState(false);
  const [evaluasi, setEvaluasi] = useState<Evaluasi | null>(null);

  const jalankan = async () => {
    setPesan("");
    if (ide.trim().length < 8) {
      setPesan("Tulis ide praktikummu, lalu jalankan.");
      return;
    }
    setMemuat(true);
    setEvaluasi(null);
    try {
      const respons = await fetch("/api/praktikum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          kelas,
          mapel,
          materi,
          ide: ide.trim(),
          pratinjau: false,
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        evaluasi?: Evaluasi;
      };
      if (!data.berhasil || !data.evaluasi) {
        setPesan(data.pesan || "Belum berhasil. Coba lagi.");
        return;
      }
      setEvaluasi(data.evaluasi);
      if (data.evaluasi.lulus && data.evaluasi.token > 0) {
        tambahTokenIgil(data.evaluasi.token);
      }
    } catch {
      setPesan("Koneksi terputus. Coba beberapa saat lagi.");
    } finally {
      setMemuat(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#1C01A5]">{materi}</h2>
        <p className="mt-1 text-sm font-bold text-[#1C01A5]/70">
          {mapel} · {kelas}
        </p>
        <label className={`${kelasLabel} mt-6`}>
          Apa yang ingin kamu praktikkan?
        </label>
        <textarea
          value={ide}
          onChange={(e) => setIde(e.target.value)}
          rows={5}
          placeholder="Contoh: Aku ingin mengukur panjang benda beberapa kali, lalu hitung rata-rata dan ketidakpastiannya."
          className={`${kelasKotak} min-h-32 resize-y text-lg`}
        />
        {pesan ? (
          <p className="mt-4 font-semibold text-rose-600">{pesan}</p>
        ) : null}
        <button
          type="button"
          onClick={() => void jalankan()}
          disabled={memuat}
          className={`${kelasTombolUtama} mt-5 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-extrabold shadow-lg shadow-[#1C01A5]/20`}
        >
          <Play className="h-5 w-5 fill-current" />
          {memuat ? "AI sedang menilai..." : "Jalankan praktikum"}
        </button>
      </div>

      {evaluasi ? (
        <div className="border-t border-[#1C01A5]/10 pt-6">
          <p className="text-sm font-extrabold uppercase tracking-wider text-[#1C01A5]">
            {evaluasi.lulus ? "Hasil: BERHASIL" : "Hasil: BELUM BERHASIL"}
          </p>
          <h3 className="mt-2 text-2xl font-extrabold text-[#1C01A5]">
            {evaluasi.judul}
          </h3>
          <p className="mt-3 text-lg font-medium text-slate-700">
            {evaluasi.umpanBalik}
          </p>
          {evaluasi.lulus ? (
            <p className="mt-3 inline-flex items-center gap-2 font-extrabold text-[#1C01A5]">
              <Sparkles className="h-4 w-4 text-[#F0AB00]" />
              +{evaluasi.token} token $IGIL ditambang
            </p>
          ) : (
            <p className="mt-3 font-bold text-rose-700">
              Belum ada token. Perbaiki ide, lalu coba lagi.
            </p>
          )}
          {evaluasi.langkah ? (
            <div className="mt-5 whitespace-pre-wrap text-slate-700">
              <p className="mb-2 font-extrabold text-[#1C01A5]">Langkah praktikum</p>
              {evaluasi.langkah}
            </div>
          ) : null}
          {evaluasi.yangDiamati ? (
            <p className="mt-4 text-slate-700">
              <span className="font-extrabold text-[#1C01A5]">Yang diamati: </span>
              {evaluasi.yangDiamati}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
