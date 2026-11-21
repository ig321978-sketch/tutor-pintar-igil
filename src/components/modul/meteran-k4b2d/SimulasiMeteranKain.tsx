"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  aturBaris,
  aturLepas,
  aturWarna,
  awalMeteran,
  cekJembatan,
  desimalBalik,
  desimalJembatan,
  desimalSepuluh,
  desimalSeratus,
  hurufBesar,
  jumlahSeratus,
  kalimatBalik,
  kalimatJembatan,
  kalimatSepuluh,
  kalimatSeratus,
  mulaiLagiMeteran,
  periksaBalik,
  periksaJembatan,
  periksaSepuluh,
  periksaSeratus,
  petunjukBalik,
  petunjukJembatan,
  petunjukSepuluh,
  petunjukSeratus,
  petunjukTolak,
  pilihanBalik,
  pilihanJembatan,
  pilihBalik,
  pilihJembatan,
  pilihModeMeteran,
  targetJembatan,
  targetSepuluh,
  type KeadaanMeteran,
  type ModeMeteran,
} from "./logika";
import { MISI_METERAN_TEKS } from "./data-sim";
import { kataDes } from "./logika-cpa";
import { Jembatan, KisiSepuluh, KisiSeratus } from "./GambarMeteran";

/**
 * Simulasi Kelas 4 Bab 2 Sub-Bab D: Meteran Kain (Misi Meteran). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Warnai (warnai kolom kisi sepuluh kolom sebanyak angka di belakang koma), Susun (isi baris penuh dan kotak lepas pada kisi seratus kotak; alat menolak sepuluh kotak lepas),
 * Jembatan (pilih desimal dari pecahan, Cek Jembatan, lalu Periksa), dan Balik (pilih pecahan dari desimal). Pesan lama dikosongkan saat langkah berikutnya dilakukan.
 */
const MODE: { id: ModeMeteran; nama: string; ikon: string }[] = [
  { id: "sepuluh", nama: "Warnai", ikon: "\u{1F9F5}" },
  { id: "seratus", nama: "Susun", ikon: "\u{1F9F6}" },
  { id: "jembatan", nama: "Jembatan", ikon: "\u{1F380}" },
  { id: "balik", nama: "Balik", ikon: "\u{1F4CF}" },
];

export default function SimulasiMeteranKain({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanMeteran) => void }) {
  const [k, setK] = useState<KeadaanMeteran>(() => awalMeteran());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [hasilCek, setHasilCek] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Ubah keadaan; pesan lama dikosongkan kecuali ada ucapan baru. */
  const ubah = (baru: KeadaanMeteran, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#4338CA] bg-[#4338CA] text-white" : "border-[#4338CA] bg-white text-[#4338CA]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-1 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#A5B4FC] bg-white"}`;

  const ganti = (m: ModeMeteran) => {
    setHasilCek("");
    ubah(
      pilihModeMeteran(k, m),
      m === "sepuluh"
        ? "Warnai kolom kain sebanyak angka di belakang koma."
        : m === "seratus"
          ? "Isi baris penuh dan kotak lepas sesuai dua angka di belakang koma."
          : m === "jembatan"
            ? "Pilih desimal yang sama dengan pecahan, lalu tekan Cek Jembatan."
            : "Pilih pecahan yang sama besar dengan desimal di papan.",
    );
  };

  /* ------------------------------ Warnai ------------------------------ */
  const warna = (d: -1 | 1) => {
    const r = aturWarna(k, d);
    if (!r.ok) return salah(d > 0 ? "Kain hanya punya sepuluh kolom." : "Belum ada kolom berwarna yang bisa dikurangi.");
    ubah(r.k);
  };
  const periksaSepuluhKu = () => {
    const r = periksaSepuluh(k);
    if (r.ok) return ubah(r.k, `Betul! Kolom berwarna sesuai dengan ${kataDes(desimalSepuluh(k))}.`);
    ubah(r.k);
    salah(petunjukSepuluh(k));
  };
  /* ------------------------------ Susun ------------------------------ */
  const baris = (d: -1 | 1) => {
    const r = aturBaris(k, d);
    if (!r.ok) return salah(d > 0 ? "Tidak ada tempat lagi: kisi hanya punya sepuluh baris dan seratus kotak." : "Belum ada baris penuh yang bisa dikurangi.");
    ubah(r.k);
  };
  const lepas = (d: -1 | 1) => {
    const r = aturLepas(k, d);
    if (!r.ok) {
      ubah(r.k);
      return salah(d > 0 && r.k.tolak ? petunjukTolak() : "Belum ada kotak lepas yang bisa dikurangi.");
    }
    ubah(r.k);
  };
  const periksaSeratusKu = () => {
    const r = periksaSeratus(k);
    if (r.ok) return ubah(r.k, `Betul! Kotak berwarna sesuai dengan ${kataDes(desimalSeratus(k))}.`);
    ubah(r.k);
    salah(petunjukSeratus(k));
  };
  /* ------------------------------ Jembatan ------------------------------ */
  const cek = () => {
    const r = cekJembatan(k);
    if (!r.ok) return salah(petunjukJembatan(k));
    ubah(r.k);
    const pesan = r.cocok ? "Pecahan hasil cek sama dengan pecahan di kiri. Jembatannya cocok." : "Pecahan hasil cek belum sama dengan pecahan di kiri. Pilih desimal yang lain.";
    setHasilCek(`${r.teks} ${r.cocok ? "(sama dengan kiri)" : "(belum sama dengan kiri)"}`);
    setCatatan(pesan);
    speakGuru(pesan);
  };
  const periksaJembatanKu = () => {
    const r = periksaJembatan(k);
    if (r.ok) {
      setHasilCek("");
      return ubah(r.k, `Betul! Pecahan itu sama dengan ${kataDes(desimalJembatan(k))}.`);
    }
    ubah(r.k);
    salah(petunjukJembatan(k));
  };
  /* ------------------------------ Balik ------------------------------ */
  const periksaBalikKu = () => {
    const r = periksaBalik(k);
    if (r.ok) return ubah(r.k, `Betul! ${kataDes(desimalBalik(k))} sama besar dengan pecahan itu.`);
    ubah(r.k);
    salah(petunjukBalik(k));
  };

  const ts = targetSepuluh(k);
  const tj = targetJembatan(k);
  const pilJ = pilihanJembatan(k);
  const pilB = pilihanBalik(k);
  const jumSer = jumlahSeratus(k);

  return (
    <div className="space-y-3" data-uji="simulasi-meteran-kain">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#4338CA] bg-[#EEF2FF] p-2">
        <p className="text-sm font-black text-[#312E81]">Misi Meteran Kain</p>
        <p className="text-xs font-bold text-[#312E81]/80">{MISI_METERAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "sepuluh" ? (
          <div className="space-y-2">
            <p className="text-center text-lg font-black text-[#1C01A5]">Desimal di papan: {desimalSepuluh(k)}</p>
            <KisiSepuluh p={k.sepWarna} benda={ts.benda} rupa="benda" judul="warnai kolom sesuai desimal" />
            <div className="mx-auto flex max-w-[420px] items-center justify-center gap-2">
              <button type="button" className={`${tombol} min-w-[44px] px-0`} onClick={() => warna(-1)} aria-label="Kurangi satu kolom berwarna">
                {"\u{2796}"}
              </button>
              <p className="min-w-[150px] text-center text-sm font-black text-[#312E81]">Kolom berwarna: {k.sepWarna}</p>
              <button type="button" className={`${tombol} min-w-[44px] px-0`} onClick={() => warna(1)} aria-label="Tambah satu kolom berwarna">
                {"\u{2795}"}
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSepuluhKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "seratus" ? (
          <div className="space-y-2">
            <p className="text-center text-lg font-black text-[#1C01A5]">Desimal di papan: {desimalSeratus(k)}</p>
            <KisiSeratus q={jumSer} benda="kain" rupa="diagram" judul="isi baris penuh dan kotak lepas" sorotBaris />
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Baris penuh dan kotak lepas">
              <div className="space-y-1 rounded-xl border-2 border-[#A5B4FC] bg-white p-1 text-center">
                <p className="text-[11px] font-black text-[#312E81]">Baris penuh</p>
                <p className="text-xl font-black text-[#1C01A5]">{k.serBaris}</p>
                <div className="flex justify-center gap-1">
                  <button type="button" className={`${tombol} min-w-[44px] px-0`} onClick={() => baris(-1)} aria-label="Kurangi satu baris penuh">
                    {"\u{2796}"}
                  </button>
                  <button type="button" className={`${tombol} min-w-[44px] px-0`} onClick={() => baris(1)} aria-label="Tambah satu baris penuh">
                    {"\u{2795}"}
                  </button>
                </div>
              </div>
              <div className="space-y-1 rounded-xl border-2 border-[#A5B4FC] bg-white p-1 text-center">
                <p className="text-[11px] font-black text-[#312E81]">Kotak lepas</p>
                <p className="text-xl font-black text-[#1C01A5]">{k.serLepas}</p>
                <div className="flex justify-center gap-1">
                  <button type="button" className={`${tombol} min-w-[44px] px-0`} onClick={() => lepas(-1)} aria-label="Kurangi satu kotak lepas">
                    {"\u{2796}"}
                  </button>
                  <button type="button" className={`${tombol} min-w-[44px] px-0`} onClick={() => lepas(1)} aria-label="Tambah satu kotak lepas">
                    {"\u{2795}"}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-black text-[#312E81]">Kotak berwarna sekarang: {jumSer}</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSeratusKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jembatan" ? (
          <div className="space-y-2">
            <Jembatan m={tj.m} den={tj.den} kanan={k.jemPilih >= 0 ? pilJ[k.jemPilih] : "?"} benda="kain" rupa="diagram" judul="jembatan pecahan ke desimal" />
            <p className="text-center text-xs font-black text-[#1C01A5]">Desimal mana yang sama dengan pecahan?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih desimal">
              {pilJ.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setHasilCek("");
                    ubah(pilihJembatan(k, i));
                  }}
                  aria-pressed={k.jemPilih === i}
                  className={pilihan(k.jemPilih === i)}
                >
                  {p}
                </button>
              ))}
            </div>
            {hasilCek ? <p className="rounded-xl border-2 border-dashed border-[#4338CA] bg-white px-2 py-1 text-center text-sm font-black text-[#312E81]">{hasilCek}</p> : null}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={cek}>
                {"\u{1F380}"} Cek Jembatan
              </button>
              <button type="button" className={tombol} onClick={periksaJembatanKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "balik" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-[420px] rounded-2xl border-4 border-[#4338CA] bg-[#FFFDF5] p-3 text-center">
              <p className="text-xs font-black text-[#312E81]">desimal di papan</p>
              <p className="text-4xl font-black text-[#1C01A5]">{desimalBalik(k)}</p>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pecahan mana yang sama besar?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih pecahan">
              {pilB.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihBalik(k, i))} aria-pressed={k.balPilih === i} className={pilihan(k.balPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBalikKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasilCek("");
            ubah(mulaiLagiMeteran(), "Mulai lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "sepuluh" ? kalimatSepuluh(k) : k.mode === "seratus" ? kalimatSeratus(k) : k.mode === "jembatan" ? kalimatJembatan(k) : kalimatBalik(k)))}
      </p>
    </div>
  );
}
