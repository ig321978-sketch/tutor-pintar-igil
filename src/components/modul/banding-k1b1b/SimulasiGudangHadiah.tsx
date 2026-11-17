"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { MAKS_RAK, awalGudang, kalimatGudang, kata, lihat, pasangkan, ubahRak, type KeadaanHadiah, type TampilGudang } from "./logika";
import { AWAL_GUDANG, EMOJI, JENIS_GUDANG } from "./data";

/**
 * Simulasi Kelas 1 Bab 1 Sub-Bab B: Misi Hadiah Nenek bagian satu, gudang hadiah. Eksplorasi bebas tanpa skor:
 * ambil hadiah dari kotak ke rak Igil (robot) atau rak Kaka (yoyo), kembalikan ke kotak, tekan Pasangkan untuk melihat yang bersisa,
 * dan lihat kedua rak sebagai barisan, bingkai sepuluh, atau garis bilangan. Angka awal berbeda dari Story: robot 2, yoyo 7, kotak 6.
 */
const NAMA_TAMPIL: Record<TampilGudang, string> = { barisan: "Barisan", bingkai: "Bingkai sepuluh", garis: "Garis bilangan" };
const RAK = [
  { id: "igil" as const, nama: "Rak Igil", warna: "#3B82F6", muda: "#DBEAFE" },
  { id: "kaka" as const, nama: "Rak Kaka", warna: "#F97316", muda: "#FFEDD5" },
];

export default function SimulasiGudangHadiah({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanHadiah) => void }) {
  const [k, setK] = useState<KeadaanHadiah>(() => awalGudang(AWAL_GUDANG.igil, AWAL_GUDANG.kaka, AWAL_GUDANG.kotak));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);

  const ubah = (rak: "igil" | "kaka", d: 1 | -1) => {
    const baru = ubahRak(k, rak, d);
    if (baru === k) speakGuru(d === 1 ? (k.kotak === 0 ? "Kotak hadiah sudah kosong." : "Rak sudah penuh, sepuluh.") : "Rak ini sudah kosong, nol.");
    setK(baru);
  };
  const tekanPasang = () => {
    setK(pasangkan(k));
    speakGuru(`Dipasangkan satu-satu. ${kalimatGudang(k)}`);
  };
  const ganti = (t: TampilGudang) => {
    setK(lihat(k, t));
    speakGuru(`${NAMA_TAMPIL[t]}. ${kalimatGudang(k)}`);
  };
  const kecil = Math.min(k.igil, k.kaka);
  const isi = (rak: "igil" | "kaka", n: number) => {
    const e = EMOJI[JENIS_GUDANG[rak]];
    if (k.tampil === "bingkai")
      return (
        <div className="grid w-fit grid-cols-5 gap-0.5 rounded-md border-2 border-[#1C01A5] bg-[#1C01A5] p-0.5">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="flex h-8 w-8 items-center justify-center bg-white text-lg">
              {i < n ? e : ""}
            </span>
          ))}
        </div>
      );
    return (
      <div className="flex min-h-[40px] flex-wrap gap-0.5">
        {n === 0 ? <span className="text-xs font-bold text-[#78350F]/70">Kosong: nol</span> : null}
        {Array.from({ length: n }, (_, i) => {
          const sisa = k.dipasang && i >= kecil;
          return (
            <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-lg text-2xl ${sisa ? "bg-[#FFE566] ring-2 ring-[#DC2626]" : k.dipasang ? "bg-[#DCFCE7]" : "bg-white/70"}`}>
              {e}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Gudang hadiah Nenek. Ambil hadiah dari kotak ke rak, tekan <b>Pasangkan</b>, dan coba tiga cara melihat.
      </p>

      <div className="flex items-center justify-center gap-3 rounded-2xl border-4 border-dashed border-[#DC2626] bg-[#FEF2F2] p-2">
        <span className="text-4xl" aria-hidden="true">
          {"\u{1F381}"}
        </span>
        <div>
          <p className="text-sm font-black text-[#991B1B]">Kotak hadiah Nenek</p>
          <p className="text-xs font-bold text-[#991B1B]" aria-live="polite">
            Sisa {k.kotak}: {kata(k.kotak)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Cara melihat">
        {(Object.keys(NAMA_TAMPIL) as TampilGudang[]).map((t) => (
          <button key={t} type="button" aria-pressed={k.tampil === t} onClick={() => ganti(t)} className={`min-h-[40px] rounded-full border-2 px-3 text-xs font-black ${k.tampil === t ? "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}>
            {NAMA_TAMPIL[t]}
          </button>
        ))}
        <button type="button" onClick={tekanPasang} className="min-h-[40px] rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-3 text-xs font-black text-[#15803D]">
          {"\u{1F517}"} Pasangkan
        </button>
      </div>

      {k.tampil === "garis" ? (
        <div className="overflow-x-auto rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
          <svg viewBox="0 0 300 90" className="mx-auto block w-full max-w-[480px]" aria-label="Garis bilangan kedua rak">
            <line x1={12} y1={60} x2={288} y2={60} stroke="#1C01A5" strokeWidth={3} />
            {Array.from({ length: 11 }, (_, n) => (
              <g key={n}>
                <line x1={20 + n * 26} y1={54} x2={20 + n * 26} y2={66} stroke="#1C01A5" strokeWidth={2} />
                <text x={20 + n * 26} y={82} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1C01A5">
                  {n}
                </text>
              </g>
            ))}
            <text x={20 + k.igil * 26} y={28} textAnchor="middle" fontSize={20}>
              {EMOJI.robot}
            </text>
            <text x={20 + k.kaka * 26} y={48} textAnchor="middle" fontSize={20}>
              {EMOJI.yoyo}
            </text>
          </svg>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {RAK.map((r) => (
          <div key={r.id} className="rounded-2xl border-4 border-[#78350F] bg-[#E8C48F] p-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-black text-[#78350F]">
                {EMOJI[JENIS_GUDANG[r.id]]} {r.nama}
              </span>
              <span className="rounded-full border-2 bg-white px-2 text-sm font-black" style={{ borderColor: r.warna, color: r.warna }}>
                {k[r.id]} {kata(k[r.id])}
              </span>
            </div>
            <div className="rounded-xl bg-[#F5D7A1] p-1.5">{isi(r.id, k[r.id])}</div>
            <div className="mt-1.5 flex gap-1.5">
              <button type="button" onClick={() => ubah(r.id, -1)} aria-label={`Kembalikan satu dari ${r.nama} ke kotak`} className="min-h-[40px] flex-1 rounded-full border-2 border-[#1C01A5] bg-white text-xs font-black text-[#1C01A5]">
                Kembalikan
              </button>
              <button type="button" onClick={() => ubah(r.id, 1)} disabled={k.kotak === 0 || k[r.id] >= MAKS_RAK} aria-label={`Ambil satu hadiah ke ${r.nama}`} className="min-h-[40px] flex-1 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-xs font-black text-[#1C01A5] disabled:opacity-40">
                {"\u{1F381}"} Ambil hadiah
              </button>
            </div>
          </div>
        ))}
      </div>

      <p role="status" aria-live="polite" className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center text-sm font-black text-[#1C01A5]">
        {kalimatGudang(k)}
        {k.dipasang && k.igil !== k.kaka ? ` Yang bersisa ada ${kata(Math.abs(k.igil - k.kaka))}.` : ""}
      </p>
    </div>
  );
}
