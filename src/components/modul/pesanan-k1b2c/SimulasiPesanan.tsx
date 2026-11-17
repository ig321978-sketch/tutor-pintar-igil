"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { URUT_SAYUR_PESAN, awalPesanan, ceritaPesanan, jawabanPesanan, kata, kirimPesanan, periksaTukar, ubahBilangan, type KeadaanPesanan, type SayurPesan } from "./logika";
import { EMOJI } from "./data";

/**
 * Simulasi Kelas 1 Bab 2 Sub-Bab C: Misi Pesanan bagian satu, pembuat pesanan. Eksplorasi bebas tanpa skor: anak membuat cerita
 * pesanannya sendiri (sayur, jenis cerita, dua bilangan), lalu melihat cerita, gambar, kalimat penjumlahan, dan jawaban lengkap
 * berubah bersama. Tombol Periksa menukar tempat untuk memeriksa, tombol Kirim mencatat pesanan.
 */
const NAMA: Record<SayurPesan, string> = { tomat: "Tomat", timun: "Timun", wortel: "Wortel" };

export default function SimulasiPesanan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPesanan) => void }) {
  const [k, setK] = useState<KeadaanPesanan>(() => awalPesanan());
  const [tukar, setTukar] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const e = EMOJI[k.sayur];
  const ubah = (sisi: "a" | "b", d: 1 | -1) => {
    const baru = ubahBilangan(k, sisi, d);
    if (baru === k) speakGuru(d === 1 ? "Paling banyak sepuluh sayur." : "Sudah nol.");
    setTukar(false);
    setK(baru);
  };
  const periksa = () => {
    setTukar(true);
    speakGuru(`Periksa dengan tukar tempat. ${kata(k.b)} ditambah ${kata(k.a)} juga ${kata(k.a + k.b)}.`);
    setK(periksaTukar(k));
  };
  const kirim = () => {
    const baru = kirimPesanan(k);
    speakGuru(baru === k ? "Pesanan ini sudah dikirim. Coba buat cerita lain." : `Pesanan dikirim. ${jawabanPesanan(k)}`);
    setK(baru);
  };
  const tombolAngka = (sisi: "a" | "b") => (
    <div className="flex items-center justify-center gap-2">
      <button type="button" onClick={() => ubah(sisi, -1)} aria-label={`Turunkan bilangan ${sisi === "a" ? "pertama" : "kedua"}`} className="h-11 w-11 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black text-[#1C01A5]">
        {"\u{2212}"}
      </button>
      <span className="min-w-[2.5rem] text-center text-2xl font-black" style={{ color: sisi === "a" ? "#2563EB" : "#DB2777" }}>
        {k[sisi]}
      </span>
      <button type="button" onClick={() => ubah(sisi, 1)} aria-label={`Naikkan bilangan ${sisi === "a" ? "pertama" : "kedua"}`} className="h-11 w-11 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black text-[#1C01A5]">
        +
      </button>
    </div>
  );
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Pembuat pesanan. Pilih sayur dan jenis cerita, atur dua bilangan, lalu <b>Periksa</b> dan <b>Kirim pesanan</b>.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih sayur">
        {URUT_SAYUR_PESAN.map((x) => (
          <button key={x} type="button" aria-pressed={k.sayur === x} onClick={() => setK({ ...k, sayur: x })} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.sayur === x ? "border-[#4338CA] bg-[#4338CA] text-white" : "border-[#4338CA] bg-white text-[#4338CA]"}`}>
            {EMOJI[x]} {NAMA[x]}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1.5" role="group" aria-label="Pilih jenis cerita">
        {(["datang", "gabung"] as const).map((j) => (
          <button key={j} type="button" aria-pressed={k.jenis === j} onClick={() => setK({ ...k, jenis: j })} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.jenis === j ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`}>
            {j === "datang" ? "\u{1F4E5} Datang lagi" : "\u{1F45C} Dua kantong"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border-4 border-[#2563EB] bg-[#EFF6FF] p-2">
          <p className="text-center text-xs font-black text-[#1D4ED8]">{k.jenis === "datang" ? "Ada di meja" : "Kantong kiri"}</p>
          {tombolAngka("a")}
          <div className="mt-1 flex min-h-[30px] flex-wrap justify-center" aria-hidden="true">
            {Array.from({ length: k.a }, (_, i) => (
              <span key={i} className="text-xl leading-none">
                {e}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
          <p className="text-center text-xs font-black text-[#BE185D]">{k.jenis === "datang" ? "Dipesan lagi" : "Kantong kanan"}</p>
          {tombolAngka("b")}
          <div className="mt-1 flex min-h-[30px] flex-wrap justify-center" aria-hidden="true">
            {Array.from({ length: k.b }, (_, i) => (
              <span key={i} className="text-xl leading-none">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Perwakilan terhubung: cerita, kalimat, jawaban */}
      <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF5] p-3">
        <p className="text-center text-sm font-bold text-[#1C01A5]">
          {"\u{1F4E8}"} {ceritaPesanan(k)}
        </p>
        <p className="text-center text-3xl font-black text-[#1C01A5]" aria-label="Kalimat penjumlahan">
          <span className="text-[#2563EB]">{tukar ? k.b : k.a}</span> <span className="text-[#DC2626]">+</span> <span className="text-[#DB2777]">{tukar ? k.a : k.b}</span> <span className="text-[#DC2626]">=</span> {k.a + k.b}
        </p>
        <p className="text-center text-sm font-black text-[#15803D]">
          Jadi, {k.a + k.b} {k.sayur}.{tukar ? " Ditukar, hasilnya tetap sama." : ""}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={periksa} className="min-h-[48px] rounded-full border-4 border-[#DB2777] bg-[#FCE7F3] px-4 text-sm font-black text-[#BE185D]">
          {"\u{1F50D}"} Periksa: tukar tempat
        </button>
        <button type="button" onClick={kirim} className="min-h-[48px] rounded-full border-4 border-[#16A34A] bg-[#DCFCE7] px-4 text-sm font-black text-[#15803D]">
          {"\u{1F69A}"} Kirim pesanan
        </button>
      </div>

      <div className="rounded-2xl border-4 border-[#4338CA] bg-[#EEF2FF] p-2">
        <p className="text-center text-sm font-black text-[#312E81]">Pesanan terkirim</p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {k.kirim.length === 0 ? <span className="text-xs font-bold text-[#312E81]/60">Belum ada.</span> : null}
          {k.kirim.map((p) => {
            const [j, kal, s] = p.split(":");
            return (
              <span key={p} className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#1C01A5]">
                {EMOJI[s]} {kal.replace("+", " + ").replace("=", " = ")} {j === "datang" ? "\u{1F4E5}" : "\u{1F45C}"}
              </span>
            );
          })}
        </div>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {jawabanPesanan(k)}
      </p>
    </div>
  );
}
