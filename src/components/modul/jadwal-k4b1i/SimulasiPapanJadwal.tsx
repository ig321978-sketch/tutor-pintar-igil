"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalJadwal,
  bagiUji,
  catatPasang,
  hapusJadwal,
  hapusPasang,
  hasilBagi,
  kalimatFaktor,
  kalimatJadwal,
  kalimatPasang,
  kalimatUji,
  kata,
  loncatJadwal,
  mulaiLagiJadwal,
  periksaFaktor,
  periksaJadwal,
  periksaPasang,
  periksaUji,
  petunjukFaktor,
  petunjukJadwal,
  petunjukPasang,
  petunjukUji,
  pilihModeJadwal,
  pilihUji,
  sisaSusun,
  tandaiFaktor,
  tandaiJadwal,
  targetFaktor,
  targetJadwal,
  targetPasang,
  targetUji,
  ubahBaris,
  type KeadaanJadwal,
  type ModeJadwal,
} from "./logika";
import { MISI_JADWAL_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab I: Papan Jadwal (penutup bab, tema Penginapan Pulau Karang Indah). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Payung (atur banyak baris; alat menolak mencatat bila payung tidak habis dibagi; catat semua pasangan faktor), Faktor (tandai semua faktor), Jadwal (tandai kelipatan pada garis jadwal),
 * dan Uji (tekan Bagi, alat menolak memutuskan sebelum itu, lalu putuskan faktor atau bukan faktor).
 */
const MODE: { id: ModeJadwal; nama: string; ikon: string }[] = [
  { id: "pasang", nama: "Payung", ikon: "\u{1F302}" },
  { id: "faktor", nama: "Faktor", ikon: "\u{1F50D}" },
  { id: "jadwal", nama: "Jadwal", ikon: "\u{1F4C5}" },
  { id: "uji", nama: "Uji", ikon: "\u{1F50E}" },
];
const WARNA = ["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7", "#EC4899"];

export default function SimulasiPapanJadwal({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJadwal) => void }) {
  const [k, setK] = useState<KeadaanJadwal>(() => awalJadwal());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanJadwal, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const kecil = "min-h-[40px] min-w-[40px] rounded-full border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5] disabled:opacity-30";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#6D28D9] bg-[#6D28D9] text-white" : "border-[#6D28D9] bg-white text-[#6D28D9]"}`;
  const kotakAngka = (nyala: boolean) => `min-h-[40px] w-full rounded-lg border-2 px-0 text-sm font-black text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FDE68A]" : "border-[#C4B5FD] bg-white"}`;
  const putusan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#C4B5FD] bg-white"}`;

  const ganti = (m: ModeJadwal) => {
    ubah(
      pilihModeJadwal(k, m),
      m === "pasang" ? "Atur banyak baris sampai payung habis dibagi, lalu catat pasangannya." : m === "faktor" ? "Tandai semua bilangan yang menjadi faktor." : m === "jadwal" ? "Tandai kelipatan pada garis jadwal." : "Tekan Bagi, lalu putuskan faktor atau bukan faktor.",
    );
  };

  const tp = targetPasang(k);
  const tf = targetFaktor(k);
  const tj = targetJadwal(k);
  const tu = targetUji(k);
  const hb = hasilBagi(k);
  const kolomPayung = Math.floor(tp.n / k.baris);
  const sisaPayung = sisaSusun(k);
  /** Titik payung mengecil bila satu baris panjang, supaya satu baris tidak membungkus jadi dua. */
  const ukuranTitik = Math.max(6, Math.min(14, Math.floor(280 / Math.max(kolomPayung, sisaPayung, 1)) - 2));

  const atur = (d: number) => {
    const r = ubahBaris(k, d);
    if (!r.ok) return salah(d < 0 ? "Banyak baris sudah satu, tidak bisa lebih sedikit." : "Banyak baris sudah paling banyak.");
    ubah(r.k);
  };
  const catat = () => {
    const r = catatPasang(k);
    if (!r.ok) return ubah(r.k, "Alat menolak. Payung tidak habis dibagi dengan banyak baris itu, jadi ada sisa yang tidak muat.");
    ubah(r.k, "Pasangan tercatat.");
  };
  const periksaP = () => {
    const r = periksaPasang(k);
    if (r.ok) return ubah(r.k, "Betul! Semua pasangan faktor sudah tercatat.");
    ubah(r.k);
    salah(petunjukPasang(k));
  };
  const tandaF = (x: number) => ubah(tandaiFaktor(k, x).k);
  const periksaF = () => {
    const r = periksaFaktor(k);
    if (r.ok) return ubah(r.k, "Betul! Semua faktor sudah ditandai.");
    ubah(r.k);
    salah(petunjukFaktor(k));
  };
  const tandaJ = (x: number) => ubah(tandaiJadwal(k, x).k);
  const loncat = () => {
    const r = loncatJadwal(k);
    if (!r.ok) return salah("Lompatan berikutnya sudah melewati batas.");
    ubah(r.k);
  };
  const periksaJ = () => {
    const r = periksaJadwal(k);
    if (r.ok) return ubah(r.k, "Betul! Semua kelipatan sudah ditandai.");
    ubah(r.k);
    salah(petunjukJadwal(k));
  };
  const bagi = () => ubah(bagiUji(k), hb.sisa === 0 ? "Sudah dibagi. Tidak ada sisa." : `Sudah dibagi. Ada sisa ${kata(hb.sisa)}.`);
  const periksaU = () => {
    const r = periksaUji(k);
    if (r.ok) return ubah(r.k, "Betul! Putusannya sesuai dengan sisa pembagian.");
    ubah(r.k, k.sudahBagi ? undefined : petunjukUji(k));
    if (k.sudahBagi) salah(petunjukUji(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-papan-jadwal">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#6D28D9] bg-[#F5F3FF] p-2">
        <p className="text-sm font-black text-[#4C1D95]">Misi Papan Jadwal</p>
        <p className="text-xs font-bold text-[#4C1D95]/80">{MISI_JADWAL_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "pasang" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">Ada {tp.n} payung. Susun dalam baris sama banyak.</p>
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#6D28D9] bg-[#FEF3C7] p-2" role="img" aria-label={`${k.baris} baris, sisa ${sisaPayung}`}>
              {Array.from({ length: k.baris }, (_, r) => (
                <div key={r} className="flex flex-nowrap justify-center gap-0.5">
                  {Array.from({ length: kolomPayung }, (_, c) => (
                    <span key={c} className="block shrink-0 rounded-full border border-[#1C01A5]" style={{ width: ukuranTitik, height: ukuranTitik, backgroundColor: WARNA[(r * kolomPayung + c) % WARNA.length] }} />
                  ))}
                </div>
              ))}
              {sisaPayung > 0 ? (
                <div className="flex flex-nowrap justify-center gap-0.5 border-t-2 border-dashed border-[#DC2626] pt-1">
                  {Array.from({ length: sisaPayung }, (_, c) => (
                    <span key={c} className="block shrink-0 rounded-full border border-[#DC2626] bg-[#FCA5A5]" style={{ width: ukuranTitik, height: ukuranTitik }} />
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center gap-2">
              <button type="button" className={kecil} onClick={() => atur(-1)} aria-label="Kurangi baris">
                {"−"}
              </button>
              <span className="min-w-[6rem] text-center text-base font-black text-[#1C01A5]">{k.baris} baris</span>
              <button type="button" className={kecil} onClick={() => atur(1)} aria-label="Tambah baris">
                +
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Tercatat: {k.pasangCatat.length === 0 ? "belum ada" : [...k.pasangCatat].sort((a, b) => a - b).map((a) => `${a} x ${tp.n / a}`).join(", ")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={catat}>
                {"\u{1F4DD}"} Catat pasangan
              </button>
              <button type="button" className={tombol} onClick={() => ubah(hapusPasang(k), "Catatan dihapus.")}>
                {"\u{1F5D1}"} Hapus catatan
              </button>
              <button type="button" className={tombol} onClick={periksaP}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "faktor" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">Tandai semua faktor dari {tf.n}.</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5 rounded-xl border-4 border-[#6D28D9] bg-white p-2" role="group" aria-label="Bilangan kandidat">
              {tf.kandidat.map((x) => (
                <button key={x} type="button" onClick={() => tandaF(x)} aria-pressed={k.faktorPilih.includes(x)} className={kotakAngka(k.faktorPilih.includes(x))}>
                  {x}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaF}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jadwal" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">Tandai kelipatan {tj.b} sampai {tj.batas}.</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-6 gap-1 rounded-xl border-4 border-[#6D28D9] bg-white p-2" role="group" aria-label="Garis jadwal">
              {Array.from({ length: tj.batas }, (_, i) => i + 1).map((x) => (
                <button key={x} type="button" onClick={() => tandaJ(x)} aria-pressed={k.jadwalTanda.includes(x)} className={kotakAngka(k.jadwalTanda.includes(x))}>
                  {x}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={loncat}>
                {"\u{1F463}"} Loncat
              </button>
              <button type="button" className={tombol} onClick={() => ubah(hapusJadwal(k), "Tanda dihapus.")}>
                {"\u{1F5D1}"} Hapus tanda
              </button>
              <button type="button" className={tombol} onClick={periksaJ}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "uji" ? (
          <div className="space-y-2">
            <p className="text-center text-2xl font-black text-[#1C01A5]">
              {tu.n} : {tu.d}
              {k.sudahBagi ? ` = ${hb.hasil} sisa ${hb.sisa}` : " = ?"}
            </p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={bagi}>
                {"\u{2797}"} Bagi
              </button>
            </div>
            {k.sudahBagi ? (
              <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Pilih putusan">
                <button type="button" onClick={() => ubah(pilihUji(k, 0))} aria-pressed={k.ujiPilih === 0} className={putusan(k.ujiPilih === 0)}>
                  Faktor
                </button>
                <button type="button" onClick={() => ubah(pilihUji(k, 1))} aria-pressed={k.ujiPilih === 1} className={putusan(k.ujiPilih === 1)}>
                  Bukan faktor
                </button>
              </div>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaU}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJadwal(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "pasang" ? kalimatPasang(k) : k.mode === "faktor" ? kalimatFaktor(k) : k.mode === "jadwal" ? kalimatJadwal(k) : kalimatUji(k))}
      </p>
    </div>
  );
}
