"use client";

import { useEffect, useRef } from "react";
import { type KelaminGuru } from "@/lib/guru";
import { pasanganGuru } from "@/lib/guru";
import { putarTtsPendek } from "@/lib/putar-tts-klien";
import { kelasLabel } from "@/lib/tema";

const FRASA_PILIH_GURU = "Pilih Guru Pengajar";

type PropsPilihGuru = {
  kelas: string;
  nilai: KelaminGuru;
  onGanti: (kelamin: KelaminGuru) => void;
};

export default function PilihGuru({ kelas, nilai, onGanti }: PropsPilihGuru) {
  const sudahPutarAwal = useRef(false);
  const kelasTerakhir = useRef(kelas);

  useEffect(() => {
    if (sudahPutarAwal.current) return;
    sudahPutarAwal.current = true;
    void putarTtsPendek(FRASA_PILIH_GURU, nilai, kelas);
  }, [kelas, nilai]);

  useEffect(() => {
    if (!sudahPutarAwal.current) return;
    if (kelasTerakhir.current === kelas) return;
    kelasTerakhir.current = kelas;
    void putarTtsPendek(FRASA_PILIH_GURU, nilai, kelas);
  }, [kelas, nilai]);

  return (
    <div>
      <p className={kelasLabel}>Pilih guru pengajar</p>
      <div className="grid gap-3">
        {pasanganGuru(kelas).map((guru) => {
          const aktif = nilai === guru.kelamin;
          return (
            <button
              key={guru.kelamin}
              type="button"
              onClick={() => {
                onGanti(guru.kelamin);
                void putarTtsPendek(FRASA_PILIH_GURU, guru.kelamin, kelas);
              }}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                aktif
                  ? "border-[#1C01A5] bg-[#1C01A5]/5"
                  : "border-[#1C01A5]/15 bg-white"
              }`}
            >
              <p className="text-3xl" aria-hidden>
                {guru.kelamin === "wanita" ? "👩‍🏫" : "👨‍🏫"}
              </p>
              <p className="mt-2 font-extrabold text-[#1C01A5]">{guru.nama}</p>
              <p className="text-sm text-slate-600">{guru.peran}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
