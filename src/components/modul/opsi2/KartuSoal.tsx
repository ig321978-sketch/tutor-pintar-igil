"use client";

import React, { useMemo, useState } from "react";
import { ambilTindakan, buatSoal } from "@/lib/opsi2";
import { UMPAN_HABIS, UMPAN_SALAH_BAWAAN, umpanBenar } from "@/lib/opsi2/umpan";
import type { SoalSpec } from "@/lib/opsi2/tipe";
import type { PropsLangkah } from "../SubBabA2Penjumlahan";
import { TombolSuaraGuru } from "../tahap-b-gaya";
import { KOMPONEN_TINDAKAN } from "./registri-komponen";

/**
 * Satu soal tindakan: instruksi bersuara, area tindakan (komponen dari KOMPONEN_TINDAKAN[id]), percobaan,
 * umpan balik, petunjuk berbentuk tindakan, penjelasan, dan tombol lanjut. TANPA penilaian: tidak ada skor,
 * poin, peringkat, atau catatan benar-salah; hanya umpan belajar. Soal dibangkitkan sekali per tampil (satu putaran).
 */

type Status = "main" | "benar" | "habis";

export function KartuSoal({ spec, d, total, benih }: { spec: SoalSpec; d: PropsLangkah; total: number; benih?: number }) {
  const [benihSoal] = useState(() => benih ?? Math.floor(Math.random() * 4294967296));
  const tindakan = ambilTindakan(spec.tindakan);
  const instans = useMemo(() => (tindakan ? buatSoal(spec, benihSoal) : null), [tindakan, spec, benihSoal]);
  const [status, setStatus] = useState<Status>("main");
  const [riwayat, setRiwayat] = useState<unknown[]>([]);
  const [kedip, setKedip] = useState<string[]>([]);
  const [putaran, setPutaran] = useState(0);
  const [umpan, setUmpan] = useState("");
  const Aksi = KOMPONEN_TINDAKAN[spec.tindakan];
  const bicara = d.speakGuru;

  if (!tindakan || !Aksi || !instans) {
    return <p className="rounded-2xl border-4 border-dashed border-[#DC2626] bg-white p-3 text-sm font-black text-[#DC2626]">Soal ini belum disiapkan.</p>;
  }

  const kirim = (jawaban: unknown) => {
    if (status !== "main") return;
    const hasil = tindakan.periksa(instans, jawaban);
    if (hasil.benar) {
      const teks = `${umpanBenar(spec.nomor)} ${instans.penjelasan}`;
      setStatus("benar");
      setKedip([]);
      setUmpan(teks);
      bicara(teks);
      return;
    }
    const baru = [...riwayat, jawaban];
    setRiwayat(baru);
    setPutaran(putaran + 1);
    if (baru.length >= instans.percobaan) {
      const teks = `${UMPAN_HABIS} ${instans.penjelasan}`;
      setStatus("habis");
      setKedip([]);
      setUmpan(teks);
      bicara(teks);
      return;
    }
    const teks = hasil.petunjuk?.pesan ?? UMPAN_SALAH_BAWAAN;
    setKedip(hasil.petunjuk?.sasaran ?? []);
    setUmpan(teks);
    bicara(teks);
  };

  const sisa = Math.max(0, instans.percobaan - riwayat.length);
  const selesai = status !== "main";
  const gayaUmpan = status === "benar" ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : status === "habis" ? "border-[#D97706] bg-[#FEF3C7] text-[#78350F]" : "border-[#E11D48] bg-[#FFE4E6] text-[#881337]";

  return (
    <div className="space-y-3 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
      <div className="flex items-center gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black text-[#1C01A5]" aria-label={`Soal ${d.nomor} dari ${total}`}>
          {d.nomor}
        </span>
        <p className="min-w-0 flex-1 text-lg font-black leading-snug text-[#1C01A5]">{instans.layar}</p>
        <TombolSuaraGuru onClick={() => bicara(instans.suara)} label="Dengarkan soal" />
      </div>

      <Aksi instans={instans} kedip={kedip} putaran={putaran} terkunci={selesai} tunjukBenar={status === "habis" ? tindakan.jawabanBenar(instans) : null} riwayat={riwayat} kirim={kirim} bicara={bicara} />

      {!selesai && (
        <p className="flex items-center justify-center gap-1 text-sm font-black text-[#1C01A5]/70" aria-label={`Kesempatan tersisa ${sisa}`}>
          <span aria-hidden="true">Kesempatan</span>
          {Array.from({ length: instans.percobaan }, (_, i) => (
            <span key={i} aria-hidden="true" className={`inline-block h-3 w-3 rounded-full border-2 border-[#1C01A5] ${i < sisa ? "bg-[#FFE566]" : "bg-white"}`} />
          ))}
        </p>
      )}

      <div role="status" aria-live="polite" className={umpan ? `rounded-2xl border-4 px-3 py-2 text-base font-black leading-snug ${gayaUmpan}` : "sr-only"}>
        {umpan}
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="button"
          disabled={!selesai}
          onClick={d.lanjut}
          className="min-h-[52px] rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-3 text-sm font-black text-[#FFE566] shadow-[0_5px_0_rgba(28,1,165,0.35)] disabled:opacity-40"
        >
          {d.teksLanjut}
        </button>
      </div>
    </div>
  );
}
