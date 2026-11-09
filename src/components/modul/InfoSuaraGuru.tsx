"use client";

import React, { useEffect, useState } from "react";
import { naskahPerkenalanGuru, profilGuru, type KelaminGuru } from "@/lib/guru";
import { kelaminGuruTersimpan, pilihanSuaraSeragamSaatIni, ucapkanGuruModul } from "@/lib/suara-guru-modul";

/**
 * Info suara guru untuk PILOT suara seragam (Materi Kelas 1 Bab 1 Sub-Bab A).
 * Menunjukkan guru pilihan siswa dan suara perangkat yang benar-benar dipakai, supaya terlihat jelas
 * mengapa suara bisa berbeda antar perangkat, dan menyediakan tombol uji suara.
 */

type Info = {
  nama: string;
  kelamin: KelaminGuru;
  suara: string | null;
  laju: number;
  nada: number;
  keterangan: string;
};

const angka = (n: number) => String(n).replace(".", ",");

export function InfoSuaraGuru({ kelas = "1 SD" }: { kelas?: string }) {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    const baca = () => {
      const kelamin = kelaminGuruTersimpan();
      const pilihan = pilihanSuaraSeragamSaatIni(kelamin);
      setInfo({
        nama: profilGuru(kelas, kelamin).nama,
        kelamin,
        suara: pilihan.suara?.name ?? null,
        laju: pilihan.laju,
        nada: pilihan.nada,
        keterangan: pilihan.keterangan,
      });
    };
    const mesin = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
    const id = window.setTimeout(baca, 0);
    mesin?.addEventListener("voiceschanged", baca);
    return () => {
      window.clearTimeout(id);
      mesin?.removeEventListener("voiceschanged", baca);
    };
  }, [kelas]);

  if (!info) return null;

  const coba = () => {
    // Baca ulang pilihan guru saat ditekan, supaya selalu sama dengan yang dipakai pemutar suara lain.
    const kelamin = kelaminGuruTersimpan();
    const guru = profilGuru(kelas, kelamin);
    const pilihan = pilihanSuaraSeragamSaatIni(kelamin);
    setInfo({ nama: guru.nama, kelamin, suara: pilihan.suara?.name ?? null, laju: pilihan.laju, nada: pilihan.nada, keterangan: pilihan.keterangan });
    ucapkanGuruModul(naskahPerkenalanGuru(guru), { kelas, kelamin, seragam: true });
  };

  return (
    <div className="space-y-1 rounded-2xl border-2 border-[#1C01A5]/30 bg-[#F5F3FF] px-3 py-2 text-xs font-bold leading-snug text-[#1C01A5]">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 font-black">
          🔊 Guru: {info.nama} ({info.kelamin === "pria" ? "pria" : "wanita"})
        </p>
        <button type="button" onClick={coba} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-xs font-black text-[#1C01A5]">
          ▶ Coba suara
        </button>
      </div>
      <p>
        Suara perangkat: {info.suara ?? "belum ada suara Bahasa Indonesia"} • laju {angka(info.laju)} • nada {angka(info.nada)}
      </p>
      <p className="text-[#1C01A5]/80">{info.keterangan}</p>
    </div>
  );
}
