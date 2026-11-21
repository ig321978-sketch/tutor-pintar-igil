"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalPameran,
  banyakWarna,
  geserKoma,
  hapusKisi,
  kalimatBaca,
  kalimatGeser,
  kalimatKisi,
  mulaiLagiPameran,
  periksaBaca,
  periksaGeser,
  periksaKisi,
  petunjukBaca,
  petunjukGeser,
  petunjukKisi,
  pilihBaca,
  pilihModePameran,
  tampilGeser,
  tandaPersen,
  targetBaca,
  targetGeser,
  targetKisi,
  warnaiBaris,
  warnaiKotak,
  type KeadaanPameran,
  type ModePameran,
} from "./logika";
import { desimalDari } from "./logika-cpa";
import { MISI_PAMERAN_TEKS, kisiBaca } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 2 Sub-Bab E: Papan Pameran (penutup bab, tema Sanggar Batik Kampung Mekar). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Kisi (warnai kotak pada kisi seratus sebanyak persen sasaran), Geser (geser koma dua tempat untuk desimal ke persen dan persen ke desimal; alat menolak menempel tanda persen
 * sebelum koma sampai di ujung kanan), dan Baca (kisi sudah berwarna; pilih persen dan desimalnya). Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModePameran; nama: string; ikon: string }[] = [
  { id: "kisi", nama: "Kisi", ikon: "\u{1F3A8}" },
  { id: "geser", nama: "Geser", ikon: "\u{1F457}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F455}" },
];

export default function SimulasiPapanPameran({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPameran) => void }) {
  const [k, setK] = useState<KeadaanPameran>(() => awalPameran());
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
  const ubah = (baru: KeadaanPameran, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9A3412] bg-[#9A3412] text-white" : "border-[#9A3412] bg-white text-[#9A3412]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-1 py-1 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FDBA74] bg-white"}`;

  const ganti = (m: ModePameran) => {
    ubah(pilihModePameran(k, m), m === "kisi" ? "Warnai kotak pada kisi sampai sebanyak persen sasaran." : m === "geser" ? "Geser koma untuk mengubah desimal dan persen." : "Baca kisi yang sudah berwarna, lalu pilih persen dan desimalnya.");
  };

  const tk = targetKisi(k);
  const tg = targetGeser(k);
  const tb = targetBaca(k);
  const kb = kisiBaca(tb);
  const terwarna = new Set(k.kisiWarna);

  const periksaK = () => {
    const r = periksaKisi(k);
    if (r.ok) return ubah(r.k, "Betul! Banyak kotak berwarna sama dengan persennya.");
    ubah(r.k);
    salah(petunjukKisi(k));
  };
  const geserK = (d: 1 | -1) => {
    const r = geserKoma(k, d);
    if (!r.ok) return salah(d > 0 ? "Koma sudah paling kanan, tidak bisa digeser lebih jauh." : "Koma sudah paling kiri, tidak bisa digeser lebih jauh.");
    ubah(r.k);
  };
  const persenK = () => {
    const r = tandaPersen(k);
    if (!r.ok) return ubah(r.k, "Alat menolak. Tanda persen hanya boleh ditempel bila koma sudah di ujung kanan, tanpa angka di belakang koma.");
    ubah(r.k);
  };
  const periksaG = () => {
    const r = periksaGeser(k);
    if (r.ok) return ubah(r.k, tg.arah === "kanan" ? "Betul! Koma digeser dua tempat ke kanan lalu tanda persen ditulis." : "Betul! Tanda persen dilepas dan koma digeser dua tempat ke kiri.");
    ubah(r.k);
    salah(petunjukGeser(k));
  };
  const periksaB = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, "Betul! Persen dan desimalnya cocok dengan kisi.");
    ubah(r.k);
    salah(petunjukBaca(k));
  };

  const huruf = Array.from(tampilGeser(k));
  const sumber = tg.arah === "kanan" ? desimalDari(tg.p) : `${tg.p}%`;

  return (
    <div className="space-y-3" data-uji="simulasi-papan-pameran">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9A3412] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Papan Pameran</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_PAMERAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "kisi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">
              Warnai kisi sampai {tk.p}%. Berwarna sekarang: {banyakWarna(k)} kotak.
            </p>
            <div className="mx-auto max-w-[420px] rounded-xl border-4 border-[#9A3412] bg-white p-1.5" role="group" aria-label="Kisi seratus kotak">
              <div className="grid gap-0.5" style={{ gridTemplateColumns: "26px repeat(10, minmax(0, 1fr))" }}>
                {Array.from({ length: 10 }, (_, r) => (
                  <React.Fragment key={r}>
                    <button type="button" onClick={() => ubah(warnaiBaris(k, r).k)} aria-label={`Warnai baris ${r + 1}`} className="min-h-[26px] rounded-md border border-[#9A3412] bg-[#FFEDD5] text-[10px] font-black text-[#7C2D12]">
                      {r + 1}
                    </button>
                    {Array.from({ length: 10 }, (_, c) => {
                      const i = r * 10 + c;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => ubah(warnaiKotak(k, i).k)}
                          aria-pressed={terwarna.has(i)}
                          aria-label={`Kotak ${i + 1}`}
                          data-kotak={terwarna.has(i) ? "1" : "0"}
                          className={`aspect-square min-h-[26px] rounded-sm border ${terwarna.has(i) ? "border-[#9A3412] bg-[#FB923C]" : "border-[#FDBA74] bg-[#FFFBEB]"}`}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(hapusKisi(k), "Warna dihapus.")}>
                {"\u{1F5D1}"} Hapus warna
              </button>
              <button type="button" className={tombol} onClick={periksaK}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "geser" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">{tg.arah === "kanan" ? `Ubah desimal ${sumber} menjadi persen.` : `Ubah persen ${sumber} menjadi desimal.`}</p>
            <div className="mx-auto flex max-w-[420px] justify-center gap-1 rounded-xl border-4 border-[#9A3412] bg-white p-2" role="img" aria-label={`Bilangan ${tampilGeser(k)}`}>
              {huruf.map((c, i) => (
                <span key={i} className={`flex h-12 items-center justify-center rounded-lg border-2 text-2xl font-black text-[#1C01A5] ${c === "," ? "w-5 border-[#FDBA74] bg-[#FFEDD5]" : c === "%" ? "w-10 border-[#DC2626] bg-[#FEF3C7]" : "w-9 border-[#1C01A5] bg-white"}`}>
                  {c}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geserK(-1)}>
                {"\u{2B05}\u{FE0F}"} Koma kiri
              </button>
              <button type="button" className={tombol} onClick={() => geserK(1)}>
                Koma kanan {"\u{27A1}\u{FE0F}"}
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={persenK} aria-pressed={k.persen}>
                {"\u{1F4AF}"} {k.persen ? "Lepas tanda persen" : "Tempel tanda persen"}
              </button>
              <button type="button" className={tombol} onClick={periksaG}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">
              {tb.peny ? `Kisi ini ${kb.jumlah} kotak, ${kb.warna} kotak berwarna. Pilih persen dan desimalnya.` : "Kisi sudah berwarna. Pilih persen dan desimalnya."}
            </p>
            <div
              className={`mx-auto grid gap-0.5 rounded-xl border-4 border-[#9A3412] bg-white p-1.5 ${kb.kolom === 5 ? "max-w-[210px]" : "max-w-[420px]"}`}
              style={{ gridTemplateColumns: `repeat(${kb.kolom}, minmax(0, 1fr))` }}
              role="img"
              aria-label={`Kisi ${kb.jumlah} kotak, ${kb.warna} kotak berwarna`}
            >
              {Array.from({ length: kb.jumlah }, (_, i) => (
                <span key={i} data-kotak={i < kb.warna ? "1" : "0"} className={`aspect-square min-h-[12px] rounded-sm border ${i < kb.warna ? "border-[#9A3412] bg-[#FB923C]" : "border-[#FDBA74] bg-[#FFFBEB]"}`} />
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#7C2D12]">Persen</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih persen">
              {tb.persen.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihBaca(k, "persen", i))} aria-pressed={k.bacaPersen === i} className={pilihan(k.bacaPersen === i)}>
                  {t}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#7C2D12]">Desimal</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih desimal">
              {tb.desimal.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihBaca(k, "desimal", i))} aria-pressed={k.bacaDesimal === i} className={pilihan(k.bacaDesimal === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaB}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPameran(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "kisi" ? kalimatKisi(k) : k.mode === "geser" ? kalimatGeser(k) : kalimatBaca(k))}
      </p>
    </div>
  );
}
