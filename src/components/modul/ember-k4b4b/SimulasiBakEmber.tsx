"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalEmber,
  isiEmber,
  kalimatSusun,
  kalimatTangga,
  kalimatTuang,
  kosongkanEmber,
  kubusPerLapis,
  kurangiLapis,
  mulaiLagiEmber,
  periksaSusun,
  periksaTangga,
  periksaTuang,
  petunjukSusun,
  petunjukTangga,
  petunjukTuang,
  pilihArah,
  pilihHasil,
  pilihModeEmber,
  pilihTakar,
  tambahLapis,
  targetSusun,
  targetTangga,
  targetTuang,
  tuang,
  urungkanTuang,
  volumeSusun,
  type ArahTangga,
  type KeadaanEmber,
  type ModeEmber,
} from "./logika";
import { fmt } from "./logika-cpa";
import { BlokSvg, EmberSvg } from "./GambarEmber";
import { MISI_EMBER_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 4 Sub-Bab B: Bak Ember (penutup bab, tema Kolam Renang Tirta Ceria). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Tuang (pilih ukuran gelas takar lalu tuang ke ember sampai garis sasaran; alat menolak tuangan yang membuat ember meluap),
 * Susun (tumpuk lapisan kubus sampai volume sasaran; kubus digambar sungguh sebanyak lapisannya, dan alat menolak lapisan melebihi tinggi bak),
 * dan Tangga (pilih turun atau naik tangga lalu hasil ubah satuan liter dan mililiter). Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeEmber; nama: string; ikon: string }[] = [
  { id: "tuang", nama: "Tuang", ikon: "\u{1F95B}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F3B2}" },
  { id: "tangga", nama: "Tangga", ikon: "\u{1F522}" },
];

export default function SimulasiBakEmber({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanEmber) => void }) {
  const [k, setK] = useState<KeadaanEmber>(() => awalEmber());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap perubahan keadaan mengosongkan pesan lama; pesan baru hanya bila diberikan. */
  const ubah = (baru: KeadaanEmber, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ucap);
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0E7490] bg-[#0E7490] text-white" : "border-[#0E7490] bg-white text-[#0E7490]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-1 py-1 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeEmber) => {
    ubah(pilihModeEmber(k, m), m === "tuang" ? "Pilih ukuran gelas, lalu tuang sampai garis sasaran." : m === "susun" ? "Tumpuk lapisan kubus sampai volume sasaran." : "Pilih turun atau naik tangga, lalu pilih hasilnya.");
  };

  const tt = targetTuang(k);
  const ts = targetSusun(k);
  const tg = targetTangga(k);

  const tuangK = () => {
    const r = tuang(k);
    if (r.ok) return ubah(r.k);
    if (r.sebab === "luap") return ubah(r.k, "Alat menolak. Air akan meluap dari ember, jadi tuangan itu tidak dilakukan.");
    salah("Pilih ukuran gelas takar dulu, lalu tekan Tuang.");
  };
  const periksaT = () => {
    const r = periksaTuang(k);
    if (r.ok) return ubah(r.k, "Betul! Air di ember tepat pada garis sasaran.");
    ubah(r.k);
    salah(petunjukTuang(k));
  };
  const lapisK = () => {
    const r = tambahLapis(k);
    if (r.ok) return ubah(r.k);
    ubah(r.k, "Alat menolak. Bak sudah setinggi mungkin, jadi lapisan tidak bisa ditambah lagi.");
  };
  const periksaS = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, "Betul! Volume susunan sama dengan sasaran.");
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  const arahK = (a: ArahTangga) => ubah(pilihArah(k, a));
  const periksaG = () => {
    const r = periksaTangga(k);
    if (r.ok) return ubah(r.k, "Betul! Satuan sudah diubah dengan benar.");
    ubah(r.k);
    salah(petunjukTangga(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-bak-ember">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0E7490] bg-[#ECFEFF] p-2">
        <p className="text-sm font-black text-[#155E75]">Misi Bak Ember</p>
        <p className="text-xs font-bold text-[#155E75]/80">{MISI_EMBER_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tuang" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#155E75]">
              Sasaran {fmt(tt.target)} ml. Ember muat {fmt(tt.kapasitas)} ml.
            </p>
            <EmberSvg isi={isiEmber(k) / tt.kapasitas} label={`${fmt(isiEmber(k))} ml`} rupa="benda" kecil />
            <div className="mx-auto flex max-w-[420px] flex-wrap justify-center gap-1" role="list" aria-label="Gelas yang sudah dituang" data-tuangan={k.tuangan.length}>
              {k.tuangan.map((t, i) => (
                <span key={i} role="listitem" className="rounded-lg border-2 border-[#0891B2] bg-white px-1.5 py-0.5 text-xs font-black text-[#155E75]">
                  {fmt(t)} ml
                </span>
              ))}
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih ukuran gelas takar">
              {tt.takar.map((t) => (
                <button key={t} type="button" aria-pressed={k.takar === t} onClick={() => ubah(pilihTakar(k, t))} className={pilihan(k.takar === t)}>
                  <span aria-hidden="true">{"\u{1F95B}"}</span> {fmt(t)} ml
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={tuangK}>
                {"\u{1F4A7}"} Tuang
              </button>
              <button type="button" className={tombol} onClick={() => ubah(urungkanTuang(k))} disabled={k.tuangan.length === 0}>
                {"↩️"} Urungkan
              </button>
              <button type="button" className={tombol} onClick={() => ubah(kosongkanEmber(k), "Ember dikosongkan.")}>
                {"\u{1F5D1}"} Kosongkan
              </button>
              <button type="button" className={tombol} onClick={periksaT}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "susun" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#155E75]">
              Alas {ts.baris} baris × {ts.kolom} kubus, {kubusPerLapis(k)} kubus tiap lapisan. Sasaran {fmt(ts.target)} cm³.
            </p>
            <BlokSvg kolom={ts.kolom} baris={ts.baris} lapis={k.lapis} rupa="benda" />
            <p className="text-center text-xs font-black text-[#1C01A5]" data-lapis={k.lapis}>
              {k.lapis} lapisan = {fmt(volumeSusun(k))} cm³
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={lapisK}>
                {"➕"} Tambah lapisan
              </button>
              <button type="button" className={tombol} onClick={() => ubah(kurangiLapis(k))} disabled={k.lapis === 0}>
                {"➖"} Kurangi lapisan
              </button>
              <button type="button" className={tombol} onClick={periksaS}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tangga" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#155E75]">Satu liter sama dengan seribu mililiter. Ubah satuannya.</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Takaran">
              <div className="rounded-xl border-2 border-[#0E7490] bg-white px-2 py-1.5 text-center" data-diketahui={tg.arah === "turun" ? `${tg.n} l` : `${tg.n * 1000} ml`}>
                <p className="text-[10px] font-black text-[#155E75]">diketahui</p>
                <p className="text-xl font-black text-[#1C01A5]">{tg.arah === "turun" ? `${tg.n} l` : `${fmt(tg.n * 1000)} ml`}</p>
              </div>
              <div className="rounded-xl border-2 border-dashed border-[#DC2626] bg-[#FEF3C7] px-2 py-1.5 text-center">
                <p className="text-[10px] font-black text-[#155E75]">ubah ke</p>
                <p className="text-xl font-black text-[#DC2626]">{k.pilih >= 0 ? tg.pil[k.pilih] : "?"}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih arah tangga">
              <button type="button" className={saklar(k.arah === "turun")} aria-pressed={k.arah === "turun"} onClick={() => arahK("turun")}>
                {"⬇️"} Turun tangga
              </button>
              <button type="button" className={saklar(k.arah === "naik")} aria-pressed={k.arah === "naik"} onClick={() => arahK("naik")}>
                {"⬆️"} Naik tangga
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#155E75]">Pilih hasilnya</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil">
              {tg.pil.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihHasil(k, i))} aria-pressed={k.pilih === i} className={pilihan(k.pilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaG}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiEmber(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "tuang" ? kalimatTuang(k) : k.mode === "susun" ? kalimatSusun(k) : kalimatTangga(k))}
      </p>
    </div>
  );
}
