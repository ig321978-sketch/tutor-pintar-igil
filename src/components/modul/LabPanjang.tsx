"use client";

import React, { useState } from "react";
import SimulasiBandingPanjang from "./SimulasiBandingPanjang";
import SimulasiPosisi from "./SimulasiPosisi";
import SimulasiMejaUkur from "./SimulasiMejaUkur";
import type { KeadaanBab7 } from "./misi-bab7";

/* ------------------------------------------------------------------------ */
/* Laboratorium Panjang (Bab 7): satu meja kerja, alat bertambah per sub-bab.  */
/*   tahap "A": Bandingkan (pensil, tanpa angka) + Tinggi dan Rendah.          */
/*   tahap "B": semua alat A + Meja Ukur, dan Bandingkan kini memakai angka   */
/*              kotak. Sub-Bab B adalah simulasi pencapaian misi bab ini.     */
/* Semua alat tetap terpasang (disembunyikan) agar keadaan tidak hilang saat   */
/* anak berpindah alat. Tiap alat melapor ke papan misi lewat onKeadaan.      */
/* ------------------------------------------------------------------------ */

type IdAlat = "banding" | "posisi" | "ukur";

export default function LabPanjang({
  tahap,
  speakGuru,
  onKeadaan,
}: {
  tahap: "A" | "B";
  speakGuru: (t: string) => void;
  onKeadaan: (k: KeadaanBab7) => void;
}) {
  const [alat, setAlat] = useState<IdAlat>("banding");
  const daftar: { id: IdAlat; nama: string }[] = [
    { id: "banding", nama: "Bandingkan" },
    { id: "posisi", nama: "Tinggi dan Rendah" },
    ...(tahap === "B" ? [{ id: "ukur" as const, nama: "Meja Ukur" }] : []),
  ];

  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="Alat laboratorium panjang" className="flex flex-wrap gap-1.5">
        {daftar.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={alat === d.id}
            onClick={() => setAlat(d.id)}
            className={`min-h-11 rounded-2xl border-4 px-3 py-1.5 text-sm font-black ${
              alat === d.id ? "border-[#F0AB00] bg-[#1C01A5] text-[#FFE566]" : "border-[#BDB4F6] bg-white text-[#1C01A5]"
            }`}
          >
            {d.nama}
          </button>
        ))}
      </div>

      <div role="tabpanel" hidden={alat !== "banding"}>
        {tahap === "A" ? (
          <SimulasiBandingPanjang
            speakGuru={speakGuru}
            judul="Bandingkan Pensil"
            tampil={["sejajar", "paling", "urut", "dua"]}
            jumlah={4}
            gaya={{ benda: "pensil", satuan: "stik", angka: false }}
            onKeadaan={onKeadaan}
          />
        ) : (
          <SimulasiBandingPanjang
            speakGuru={speakGuru}
            judul="Bandingkan Hasil Ukur"
            tampil={["sejajar", "paling", "urut", "dua"]}
            jumlah={4}
            gaya={{ benda: "pensil", satuan: "kotak", angka: true }}
            awal={[5, 9, 3, 6]}
            onKeadaan={onKeadaan}
          />
        )}
      </div>
      <div role="tabpanel" hidden={alat !== "posisi"}>
        <SimulasiPosisi speakGuru={speakGuru} onKeadaan={onKeadaan} />
      </div>
      {tahap === "B" ? (
        <div role="tabpanel" hidden={alat !== "ukur"}>
          <SimulasiMejaUkur speakGuru={speakGuru} onKeadaan={onKeadaan} />
        </div>
      ) : null}
    </div>
  );
}
