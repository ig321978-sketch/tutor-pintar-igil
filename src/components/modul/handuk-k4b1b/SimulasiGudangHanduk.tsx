"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_JENIS_SIM,
  NAMA_TEMPAT_SIM,
  PILIHAN_BANDING,
  awalHanduk,
  bilanganBagan,
  bilanganIsi,
  bilanganTukar,
  bilSim,
  digitSim,
  formatBilSim,
  kalimatArti,
  kalimatBagan,
  kalimatIsi,
  kalimatTukar,
  kata,
  kosongkanIsi,
  kurangIsi,
  lihatTempat,
  mulaiLagiHanduk,
  periksaArti,
  periksaBagan,
  periksaIsi,
  periksaTukar,
  petunjukArti,
  petunjukBagan,
  petunjukIsi,
  petunjukTukar,
  pertanyaanArti,
  pilihanArti,
  pilihArti,
  pilihBanding,
  pilihModeHanduk,
  pilihTempatTukar,
  tambahIsi,
  targetArti,
  targetBagan,
  targetIsi,
  targetTukar,
  tukarTempat,
  ubahBagan,
  ulangTukar,
  type KeadaanHanduk,
  type ModeHanduk,
} from "./logika";
import { MISI_HANDUK_TEKS } from "./data-sim";
import { BalokSvg, PapanSvg } from "./GambarHanduk";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab B: Gudang Handuk (tema Penginapan Pulau Karang Indah). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Isi (isi peti, kotak, ikat, dan lembar sampai sama dengan bilangan; sepuluh lembar otomatis menjadi satu ikat), Bagan (tulis angka tiap kolom bagan tempat dari balok yang sudah tersusun),
 * Arti (tekan Lihat tempat, alat menolak menjawab sebelum itu, lalu pilih banyaknya angka yang dilingkari), dan Tukar (pilih dua tempat, tekan Tukar, lalu bandingkan bilangan baru).
 */
const MODE: { id: ModeHanduk; nama: string; ikon: string }[] = [
  { id: "isi", nama: "Isi", ikon: "\u{1F9F1}" },
  { id: "bagan", nama: "Bagan", ikon: "\u{1F4CB}" },
  { id: "arti", nama: "Arti", ikon: "\u{1F50D}" },
  { id: "tukar", nama: "Tukar tempat", ikon: "\u{1F501}" },
];

export default function SimulasiGudangHanduk({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanHanduk) => void }) {
  const [k, setK] = useState<KeadaanHanduk>(() => awalHanduk());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanHanduk, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeHanduk) => {
    ubah(
      pilihModeHanduk(k, m),
      m === "isi" ? "Isi peti, kotak, ikat, dan lembar sampai sama dengan bilangan." : m === "bagan" ? "Hitung balok tiap baris, lalu tulis angkanya pada bagan tempat." : m === "arti" ? "Tekan Lihat tempat, lalu pilih arti angka yang dilingkari." : "Pilih dua tempat, tekan Tukar, lalu bandingkan bilangan barunya.",
    );
  };

  const tambah = (p: number) => {
    const r = tambahIsi(k, p);
    if (!r.ok) return salah("Peti sudah sembilan, tidak bisa ditambah lagi.");
    ubah(r.k, r.tukar >= 0 ? `Sepuluh ${NAMA_JENIS_SIM[p]} ditukar menjadi satu ${NAMA_JENIS_SIM[r.tukar]}.` : undefined);
  };
  const kurang = (p: number) => {
    const r = kurangIsi(k, p);
    if (!r.ok) return salah(`Tidak ada ${NAMA_JENIS_SIM[p]} yang bisa dikurangi.`);
    ubah(r.k);
  };
  const periksaIsiKu = () => {
    const r = periksaIsi(k);
    if (r.ok) return ubah(r.k, "Betul! Gudang sudah berisi sesuai bilangan.");
    ubah(r.k);
    salah(petunjukIsi(k));
  };
  const baganUbah = (c: number, d: number) => {
    const h = ubahBagan(k, c, d);
    if (!h.ok) return salah(d < 0 ? "Angka sudah nol, tidak bisa lebih kecil." : "Angka sudah sembilan, tidak bisa lebih besar.");
    ubah(h.k, kata(h.k.bagan[c]));
  };
  const periksaBaganKu = () => {
    const r = periksaBagan(k);
    if (r.ok) return ubah(r.k, "Betul! Bagan tempat sudah sesuai dengan balok.");
    ubah(r.k);
    salah(petunjukBagan(k));
  };
  const lihat = () => ubah(lihatTempat(k), "Tempat angka sudah terlihat. Pilih jawaban yang tepat.");
  const periksaArtiKu = () => {
    const r = periksaArti(k);
    if (r.ok) return ubah(r.k, "Betul! Banyaknya angka itu sudah tepat.");
    ubah(r.k);
    salah(petunjukArti(k));
  };
  const pilihTukar = (c: number) => {
    const r = pilihTempatTukar(k, c);
    if (!r.ok) return salah(k.sudahTukar ? "Sudah ditukar. Tekan Ulang untuk mencoba lagi." : "Dua tempat sudah dipilih. Tekan Tukar, atau ketuk tempat yang sama untuk membatalkan.");
    ubah(r.k);
  };
  const tukar = () => {
    const r = tukarTempat(k);
    if (!r.ok) return salah("Pilih dulu dua tempat yang akan ditukar.");
    ubah(r.k, "Sudah ditukar. Sekarang bandingkan bilangan baru dengan bilangan semula.");
  };
  const periksaTukarKu = () => {
    const r = periksaTukar(k);
    if (r.ok) return ubah(r.k, "Betul! Tempat yang ditukar dan perbandingannya tepat.");
    ubah(r.k);
    salah(petunjukTukar(k));
  };

  const ti = targetIsi(k);
  const tb = targetBagan(k);
  const ta = targetArti(k);
  const tt = targetTukar(k);
  const pilArti = pilihanArti(k);
  const digitTukar = digitSim(bilanganTukar(k));

  return (
    <div className="space-y-3" data-uji="simulasi-gudang-handuk">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Gudang Handuk</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_HANDUK_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "isi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">Isi gudang sampai bilangannya {formatBilSim(ti)}.</p>
            <BalokSvg n={bilanganIsi(k)} rupa="benda" label />
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#92400E] bg-white p-2">
              {NAMA_JENIS_SIM.map((nama, p) => (
                <div key={nama} className="flex items-center gap-2">
                  <span className="w-[64px] text-sm font-black text-[#1C01A5]">{nama}</span>
                  <button type="button" className={kecil} onClick={() => kurang(p)} aria-label={`Kurangi ${nama}`}>
                    {"−"}
                  </button>
                  <span className="min-w-[1.8rem] text-center text-lg font-black text-[#15803D]">{k.isi[p]}</span>
                  <button type="button" className={kecil} onClick={() => tambah(p)} aria-label={`Tambah ${nama}`}>
                    +
                  </button>
                  <span className="text-xs font-bold text-[#1C01A5]/70">{NAMA_TEMPAT_SIM[p]}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]">Gudang sekarang: {formatBilSim(bilanganIsi(k))}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(kosongkanIsi(k), "Gudang dikosongkan. Isi lagi dari awal.")}>
                {"\u{1F5D1}"} Kosongkan
              </button>
              <button type="button" className={tombol} onClick={periksaIsiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagan" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">Tulis angka tiap kolom sesuai balok pada barisnya.</p>
            <BalokSvg n={bilSim(tb)} rupa="benda" label />
            <PapanSvg digit={k.bagan} rupa="benda" kepala />
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1">
              {NAMA_TEMPAT_SIM.map((nama, c) => (
                <div key={nama} className="flex flex-col items-center gap-1">
                  <button type="button" className={kecil} onClick={() => baganUbah(c, 1)} aria-label={`Tambah angka ${nama}`}>
                    +
                  </button>
                  <button type="button" className={kecil} onClick={() => baganUbah(c, -1)} aria-label={`Kurangi angka ${nama}`}>
                    {"−"}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]">Bilangan pada bagan: {formatBilSim(bilanganBagan(k))}</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBaganKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "arti" ? (
          <div className="space-y-2">
            <PapanSvg digit={digitSim(ta.n)} rupa="benda" kepala={k.sudahLihat} tanda={ta.tanda} />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={lihat}>
                {"\u{1F441}"} Lihat tempat
              </button>
            </div>
            {k.sudahLihat ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">{pertanyaanArti(k)}</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jawaban">
                  {pilArti.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihArti(k, i))} aria-pressed={k.artiPilih === i} className={pilihan(k.artiPilih === i)}>
                      {formatBilSim(p)}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaArtiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tukar" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">
              Tukar tempat {NAMA_TEMPAT_SIM[Math.min(tt.a, tt.b)]} dan tempat {NAMA_TEMPAT_SIM[Math.max(tt.a, tt.b)]}.
            </p>
            <PapanSvg digit={digitTukar} rupa="benda" kepala pilih={k.tukarPilih} tukar={k.sudahTukar && k.tukarPilih.length === 2 ? [k.tukarPilih[0], k.tukarPilih[1]] : undefined} />
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1">
              {NAMA_TEMPAT_SIM.map((nama, c) => (
                <button key={nama} type="button" onClick={() => pilihTukar(c)} aria-pressed={k.tukarPilih.includes(c)} className={saklar(k.tukarPilih.includes(c))}>
                  {nama}
                </button>
              ))}
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Semula {formatBilSim(tt.n)}
              {k.sudahTukar ? `, sekarang ${formatBilSim(bilanganTukar(k))}` : ""}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={tukar}>
                {"\u{1F501}"} Tukar sekarang
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangTukar(k), "Pilih dua tempat lagi.")}>
                {"\u{21A9}"} Ulang
              </button>
            </div>
            {k.sudahTukar ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Bilangan baru dibanding bilangan semula:</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih perbandingan">
                  {PILIHAN_BANDING.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihBanding(k, i))} aria-pressed={k.bandingPilih === i} className={pilihan(k.bandingPilih === i)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTukarKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiHanduk(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "isi" ? kalimatIsi(k) : k.mode === "bagan" ? kalimatBagan(k) : k.mode === "arti" ? kalimatArti(k) : kalimatTukar(k))}
      </p>
    </div>
  );
}
