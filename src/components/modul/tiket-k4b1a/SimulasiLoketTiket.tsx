"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalTiket,
  empatAngka,
  fmt,
  hapusNol,
  hapusSusun,
  hurufBesar,
  isiNol,
  isiSusun,
  kalimatBaca,
  kalimatNol,
  kalimatSusun,
  kalimatTempat,
  kata,
  mulaiLagiTiket,
  periksaBaca,
  periksaNol,
  periksaSusun,
  periksaTempat,
  petunjukBaca,
  petunjukNol,
  petunjukSusun,
  petunjukTempat,
  pilihanBaca,
  pilihBaca,
  pilihKotakNol,
  pilihKotakSusun,
  pilihModeTiket,
  pilihTempat,
  targetBaca,
  targetNol,
  targetSusun,
  targetTempat,
  terkunciNol,
  type KeadaanTiket,
  type ModeTiket,
} from "./logika";
import { MISI_TIKET_TEKS, NAMA_TEMPAT } from "./data-sim";
import { ejaK4B1 } from "../eja-k4b1";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab A: Loket Tiket (Misi Tiket). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Susun (isi empat kotak dengan kartu angka dari ucapan; alat menolak memeriksa selama masih ada kotak kosong), Baca (pilih cara membaca tiket),
 * Nol (isi kotak kosong yang nolnya hilang; alat menolak mengubah angka yang sudah ada), dan Tempat (tentukan tempat angka yang ditandai).
 */
const MODE: { id: ModeTiket; nama: string; ikon: string }[] = [
  { id: "susun", nama: "Susun", ikon: "\u{1F0CF}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F5E3}" },
  { id: "nol", nama: "Nol", ikon: "\u{1F50D}" },
  { id: "tempat", nama: "Tempat", ikon: "\u{1F4CD}" },
];
const ANGKA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function SimulasiLoketTiket({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTiket) => void }) {
  const [k, setK] = useState<KeadaanTiket>(() => awalTiket());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanTiket, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ejaK4B1(ucap));
    }
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B1(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#C2410C] bg-[#C2410C] text-white" : "border-[#C2410C] bg-white text-[#C2410C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FDBA74] bg-white"}`;
  const kotak = (nyala: boolean, kunci = false, tanda = false) =>
    `relative min-h-[64px] min-w-[44px] flex-1 rounded-xl border-4 px-1 py-1 text-center text-3xl font-black ${tanda ? "border-[#DC2626] bg-[#FEE2E2] text-[#991B1B]" : nyala ? "border-[#DC2626] bg-[#FEF3C7] text-[#1C01A5]" : kunci ? "border-[#9CA3AF] bg-[#F3F4F6] text-[#4B5563]" : "border-[#C2410C] bg-white text-[#1C01A5]"}`;
  const kartu = "min-h-[48px] min-w-[44px] flex-1 rounded-lg border-2 border-[#C2410C] bg-[#FFEDD5] text-xl font-black text-[#7C2D12]";

  const ganti = (m: ModeTiket) =>
    ubah(
      pilihModeTiket(k, m),
      m === "susun"
        ? "Dengarkan ucapan Bu Maya, lalu isi keempat kotak dengan kartu angka."
        : m === "baca"
          ? "Lihat nomor tiket, lalu pilih cara membacanya."
          : m === "nol"
            ? "Isi kotak kosong yang nolnya hilang."
            : "Pilih nama tempat angka yang diberi tanda.",
    );

  /* ------------------------------ Susun ------------------------------ */
  const isiKartu = (d: number) => {
    const r = isiSusun(k, d);
    if (!r.ok) return salah("Keempat kotak sudah terisi. Hapus satu kotak atau tekan Periksa.");
    ubah(r.k);
  };
  const periksaSusunKu = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, `Betul! ${hurufBesar(kata(targetSusun(k)))} ditulis ${fmt(targetSusun(k))}.`);
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  /* ------------------------------ Baca ------------------------------ */
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, `Betul! ${fmt(targetBaca(k))} dibaca ${kata(targetBaca(k))}.`);
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  /* ------------------------------ Nol ------------------------------ */
  const ketukNol = (i: number) => {
    if (k.nol[i] !== null && !terkunciNol(k, i)) {
      const r = hapusNol(k, i);
      return r.ok ? ubah(r.k) : undefined;
    }
    const r = pilihKotakNol(k, i);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Angka itu sudah benar dan tidak boleh diubah. Isi kotak yang kosong saja.");
    }
    ubah(r.k);
  };
  const isiKartuNol = (d: number) => {
    const r = isiNol(k, d);
    if (!r.ok) {
      ubah(r.k);
      return salah(k.nol.some((x) => x === null) ? "Alat menolak. Pilih dulu kotak yang kosong." : "Semua kotak sudah terisi. Tekan Periksa Nol.");
    }
    ubah(r.k);
  };
  const periksaNolKu = () => {
    const r = periksaNol(k);
    if (r.ok) return ubah(r.k, `Betul! ${hurufBesar(kata(targetNol(k).angka))} ditulis ${fmt(targetNol(k).angka)}.`);
    ubah(r.k);
    salah(petunjukNol(k));
  };
  /* ------------------------------ Tempat ------------------------------ */
  const periksaTempatKu = () => {
    const r = periksaTempat(k);
    if (r.ok) return ubah(r.k, `Betul! Angka itu ada di tempat ${NAMA_TEMPAT[targetTempat(k).urut]}.`);
    ubah(r.k);
    salah(petunjukTempat(k));
  };

  const pilB = pilihanBaca(k);
  const tt = targetTempat(k);
  const tn = targetNol(k);

  return (
    <div className="space-y-3" data-uji="simulasi-loket-tiket">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Loket Tiket</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_TIKET_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "susun" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#C2410C] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">Bu Maya mengucapkan: {kata(targetSusun(k))}</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Papan empat kotak">
              {NAMA_TEMPAT.map((t, i) => (
                <div key={t} className="flex-1 text-center">
                  <span className="block text-[10px] font-black text-[#9A3412]">{t}</span>
                  <button type="button" onClick={() => ubah(pilihKotakSusun(k, i))} aria-pressed={k.susunSel === i} aria-label={`Kotak ${t}`} className={`${kotak(k.susunSel === i)} w-full`}>
                    {k.susun[i] ?? ""}
                  </button>
                </div>
              ))}
            </div>
            <div className="mx-auto flex max-w-[420px] flex-wrap gap-1" role="group" aria-label="Kartu angka">
              {ANGKA.map((d) => (
                <button key={d} type="button" className={kartu} onClick={() => isiKartu(d)} aria-label={`Kartu angka ${kata(d)}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                className={tombol}
                onClick={() => {
                  const r = hapusSusun(k);
                  if (r.ok) ubah(r.k);
                  else salah("Belum ada kartu yang bisa dihapus.");
                }}
              >
                {"\u{21A9}"} Hapus
              </button>
              <button type="button" className={tombol} onClick={periksaSusunKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">Bagaimana nomor tiket ini dibaca?</p>
            <p className="mx-auto max-w-[420px] rounded-xl border-4 border-[#EA580C] bg-[#FDBA74] py-2 text-center text-4xl font-black text-[#1C01A5]">{fmt(targetBaca(k))}</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-1.5" role="group" aria-label="Pilih cara membaca">
              {pilB.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihBaca(k, i))} aria-pressed={k.bacaPilih === i} className={pilihan(k.bacaPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBacaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "nol" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#C2410C] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">Bu Maya mengucapkan: {kata(tn.angka)}</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Papan empat kotak">
              {NAMA_TEMPAT.map((t, i) => (
                <div key={t} className="flex-1 text-center">
                  <span className="block text-[10px] font-black text-[#9A3412]">{t}</span>
                  <button type="button" onClick={() => ketukNol(i)} aria-pressed={k.nolSel === i} aria-label={`Kotak ${t}`} className={`${kotak(k.nolSel === i, terkunciNol(k, i))} w-full`}>
                    {k.nol[i] ?? ""}
                  </button>
                </div>
              ))}
            </div>
            <div className="mx-auto flex max-w-[420px] flex-wrap gap-1" role="group" aria-label="Kartu angka">
              {ANGKA.map((d) => (
                <button key={d} type="button" className={kartu} onClick={() => isiKartuNol(d)} aria-label={`Kartu angka ${kata(d)}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaNolKu}>
                {"\u{1F50D}"} Periksa Nol
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tempat" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">Angka yang diberi tanda ada di tempat apa?</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Bilangan">
              {empatAngka(tt.angka).map((d, i) => (
                <span key={i} className={`${kotak(false, false, i === tt.urut)} flex items-center justify-center`}>
                  {d}
                </span>
              ))}
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Pilih nama tempat">
              {NAMA_TEMPAT.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihTempat(k, i))} aria-pressed={k.tempatPilih === i} className={pilihan(k.tempatPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTempatKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTiket(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "susun" ? kalimatSusun(k) : k.mode === "baca" ? kalimatBaca(k) : k.mode === "nol" ? kalimatNol(k) : kalimatTempat(k)))}
      </p>
    </div>
  );
}
