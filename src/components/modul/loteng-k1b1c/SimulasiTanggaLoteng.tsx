"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { awalLoteng, isiRak, kalimatTangga, kata, langkahTangga, rakPenuh, taruhKardus, type KeadaanLoteng } from "./logika";
import { HILANG_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 1 Sub-Bab C: Misi Gudang Loteng bagian satu. Eksplorasi bebas tanpa skor: Igil naik dan turun tangga
 * sambil menghitung, kardus bernomor disusun di rak loteng, dan dua kardus tanpa nomor (empat dan sembilan, berbeda dari Story)
 * dilengkapi setelah tetangganya terisi. Tombol Baca mundur membaca rak dari kanan.
 */
export default function SimulasiTanggaLoteng({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLoteng) => void }) {
  const [k, setK] = useState<KeadaanLoteng>(() => awalLoteng(HILANG_SIM, 5));
  const [pilih, setPilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);

  const gerak = (d: 1 | -1) => {
    const b = langkahTangga(k, d);
    if (b === k) {
      speakGuru(d === 1 ? "Sudah di anak tangga paling atas, sepuluh." : "Sudah di lantai, nol.");
      return;
    }
    speakGuru(b.pos === 0 ? "Nol. Sampai di lantai." : kata(b.pos));
    setK(b);
  };
  const taruh = (n: number) => {
    if (!pilih) {
      speakGuru("Ketuk satu kardus di lantai dulu.");
      return;
    }
    const r = taruhKardus(k, pilih, n);
    if (r.tolak) {
      setGoyang(n);
      window.setTimeout(() => setGoyang(null), 480);
      const kd = k.kardus.find((x) => x.id === pilih);
      speakGuru(
        r.tolak === "terisi"
          ? "Tempat ini sudah terisi."
          : r.tolak === "tetangga"
            ? "Kardus tanpa nomor. Isi dulu tetangga kiri dan kanannya, lalu hitung nomor yang hilang."
            : kd?.bernomor
              ? `Ini kardus nomor ${kata(kd.nomor)}. Cari tempat ${kata(kd.nomor)}.`
              : "Kardus tanpa nomor. Hitung maju dari tetangganya untuk mencari tempatnya.",
      );
      return;
    }
    const kd = r.k.kardus.find((x) => x.id === pilih);
    if (kd && !kd.bernomor) speakGuru(`Betul! Nomor yang hilang adalah ${kata(n)}.`);
    setK(r.k);
    setPilih(null);
  };
  const bacaMundur = () => {
    if (!rakPenuh(k)) {
      speakGuru("Rak belum penuh. Susun semua kardus dulu.");
      return;
    }
    speakGuru(`Dibaca mundur dari kanan: ${Array.from({ length: 10 }, (_, i) => kata(10 - i)).join(", ")}.`);
    setK({ ...k, bacaMundur: true });
  };
  const lantai = k.kardus.filter((x) => x.tempat === "lantai");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Tangga loteng. Tekan <b>Naik</b> dan <b>Turun</b> sambil menghitung. Ketuk kardus di lantai, lalu ketuk tempatnya di rak loteng.
      </p>

      <div className="rounded-2xl border-4 border-[#78350F] p-2" style={{ background: "linear-gradient(180deg,#E0E7FF,#FFFBEB)" }}>
        <div className="flex h-36 items-end gap-0.5" aria-label="Tangga sepuluh anak tangga">
          <div className="flex w-8 flex-col items-center justify-end">
            {k.pos === 0 ? <span className="text-2xl">{"\u{1F467}"}</span> : null}
            <span className="w-full rounded-sm bg-[#78350F] text-center text-[10px] font-black text-white">0</span>
          </div>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-end">
              {k.pos === i + 1 ? <span className="text-2xl lm-muncul">{"\u{1F467}"}</span> : null}
              <span className={`w-full rounded-t-sm border-2 text-center text-[11px] font-black ${k.pos === i + 1 ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]" : "border-[#78350F] bg-[#D6A15E] text-white"}`} style={{ height: `${14 + i * 9}px` }}>
                {i + 1}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-1 text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
          {kalimatTangga(k)}
        </p>
        <div className="mt-1 flex justify-center gap-2">
          <button type="button" onClick={() => gerak(-1)} className="min-h-[44px] rounded-full border-4 border-[#DC2626] bg-[#FEE2E2] px-5 text-sm font-black text-[#991B1B]">
            {"\u{2B07}\u{FE0F}"} Turun
          </button>
          <button type="button" onClick={() => gerak(1)} className="min-h-[44px] rounded-full border-4 border-[#16A34A] bg-[#DCFCE7] px-5 text-sm font-black text-[#15803D]">
            {"\u{2B06}\u{FE0F}"} Naik
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <p className="mb-1 text-center text-sm font-black text-[#1C01A5]">Rak loteng</p>
        <div className="grid grid-cols-5 gap-1 sm:grid-cols-10" role="group" aria-label="Rak loteng">
          {Array.from({ length: 10 }, (_, i) => {
            const n = i + 1;
            const kd = isiRak(k, n);
            return (
              <button key={n} type="button" onClick={() => taruh(n)} aria-label={kd ? `Kardus ${n} di rak` : `Tempat rak ${n}`} className={`flex h-12 flex-col items-center justify-center rounded-md border-2 text-sm font-black ${kd ? "border-[#92400E] bg-[#D6A15E] text-white" : "border-dashed border-[#1C01A5]/40 bg-[#F8FAFC] text-[#1C01A5]/30"} ${goyang === n ? "lm-goyang" : ""}`}>
                {kd ? (
                  <>
                    <span className="text-base leading-none">{"\u{1F4E6}"}</span>
                    {kd.nomor}
                  </>
                ) : (
                  "\u{00B7}"
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-1.5 flex justify-center">
          <button type="button" onClick={bacaMundur} className="min-h-[40px] rounded-full border-2 border-[#7C3AED] bg-[#EDE9FE] px-4 text-xs font-black text-[#5B21B6]">
            {"\u{2B05}\u{FE0F}"} Baca mundur dari kanan
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FDE7C8] p-2">
        <p className="mb-1 text-xs font-black text-[#92400E]">Lantai ({lantai.length === 0 ? "kosong, semua sudah di rak" : "ketuk satu kardus"})</p>
        <div className="flex flex-wrap gap-1.5">
          {lantai.map((x) => (
            <button key={x.id} type="button" onClick={() => setPilih(pilih === x.id ? null : x.id)} aria-pressed={pilih === x.id} aria-label={x.bernomor ? `Kardus nomor ${x.nomor}` : "Kardus tanpa nomor"} className={`flex h-12 w-12 flex-col items-center justify-center rounded-md border-2 text-sm font-black ${pilih === x.id ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5] ring-4 ring-[#1C01A5]" : "border-[#92400E] bg-[#D6A15E] text-white"}`}>
              <span className="text-base leading-none">{"\u{1F4E6}"}</span>
              {x.bernomor ? x.nomor : "?"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
