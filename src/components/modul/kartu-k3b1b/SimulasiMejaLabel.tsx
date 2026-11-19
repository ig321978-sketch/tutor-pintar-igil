"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { PapanSvg } from "./GambarKartu";
import { BATAS_KARTU, MISI_LABEL_TEKS } from "./data-sim";
import {
  awalLabel,
  bilanganSusun,
  kalimatLabel,
  mulaiLagiLabel,
  periksaNol,
  periksaSama,
  periksaSusun,
  periksaTabel,
  periksaUrai,
  pilihModeLabel,
  pilihSama,
  targetNol,
  targetSusun,
  targetTabel,
  targetUrai,
  tugasSama,
  ubahNol,
  ubahSusun,
  ubahTabel,
  ubahUrai,
  ulangSusun,
  type Hasil,
  type KeadaanLabel,
  type ModeLabel,
} from "./logika";
import { BOBOT, NAMA_TEMPAT, WARNA_TEMPAT, WARNA_TULIS, type Tempat } from "./logika-cpa";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab B: Meja Label (Misi Meja Label). Lima alat tanpa skor: Susun (kartu seratus, sepuluh, dan satu menjadi label), Uraikan (jumlah yang diwakili tiap angka),
 * Tabel (tabel tiga tempat diisi angka), Nol (nol penjaga tempat), Sama (angka sama di tempat berbeda).
 */
const MODE: { id: ModeLabel; nama: string; ikon: string }[] = [
  { id: "susun", nama: "Susun", ikon: "\u{1F0CF}" },
  { id: "uraikan", nama: "Uraikan", ikon: "\u{2795}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CA}" },
  { id: "nol", nama: "Nol", ikon: "\u{2B55}" },
  { id: "sama", nama: "Sama", ikon: "\u{1F501}" },
];
const SEMUA: Tempat[] = [0, 1, 2];
const NAMA_JUDUL = ["Ratusan", "Puluhan", "Satuan"];

export default function SimulasiMejaLabel({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabel) => void }) {
  const [k, setK] = useState<KeadaanLabel>(() => awalLabel());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanLabel, ucap?: string) => {
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
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 text-sm font-black ${nyala ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#B45309] bg-[#FFFBEB] text-[#78350F]"}`;
  const ganti = (m: ModeLabel) => ubah(pilihModeLabel(k, m), kalimatLabel(pilihModeLabel(k, m)));

  /** Satu baris pengatur dengan tombol kurang dan tambah. */
  const pengatur = ({ t, nilai, tampil, onKurang, onTambah, maks }: { t: Tempat; nilai: number; tampil?: string; onKurang: () => void; onTambah: () => void; maks: number }) => (
    <div key={t} className="flex items-center justify-between gap-2 rounded-xl bg-white px-2 py-1">
      <span className="w-20 rounded-md px-1 text-center text-sm font-black text-white" style={{ background: WARNA_TEMPAT[t] }}>
        {NAMA_JUDUL[t]}
      </span>
      <button type="button" className={tombol} aria-label={`Kurangi ${NAMA_TEMPAT[t]}`} disabled={nilai <= 0} onClick={onKurang}>
        -
      </button>
      <span className="w-14 text-center text-lg font-black" style={{ color: WARNA_TULIS[t] }}>
        {tampil ?? nilai}
      </span>
      <button type="button" className={tombol} aria-label={`Tambah ${NAMA_TEMPAT[t]}`} disabled={nilai >= maks} onClick={onTambah}>
        +
      </button>
    </div>
  );
  const periksa = (onClick: () => void) => (
    <div className="mt-2 flex justify-center">
      <button type="button" className={tombol} onClick={onClick}>
        Periksa
      </button>
    </div>
  );

  const ts = targetSusun(k);
  const tu = targetUrai(k);
  const tt = targetTabel(k);
  const tn = targetNol(k);
  const sm = tugasSama(k);
  const ulang = () => {
    if (k.mode === "susun") ubah(ulangSusun(k), "Kartu dikembalikan. Susun lagi sesuai label.");
    else if (k.mode === "uraikan") ubah({ ...k, urai: [0, 0, 0] }, "Jumlah dikembalikan. Atur lagi tiap tempat.");
    else if (k.mode === "tabel") ubah({ ...k, tabel: [0, 0, 0] }, "Tabel dikosongkan. Isi lagi dengan angka.");
    else if (k.mode === "nol") ubah({ ...k, nol: [1, 1, 1] }, "Tulisan dikembalikan. Hitung kartu, lalu tulis labelnya.");
    else ubah({ ...k, samaPilih: null }, "Pilihan dibatalkan. Pilih tempat lagi.");
  };

  return (
    <div className="space-y-3" data-uji="simulasi-meja-label">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FEF3C7] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Meja Label</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_LABEL_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#B45309] bg-[#FFFBEB] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "susun" ? (
          <>
            <p className="mb-1 text-center text-sm font-black text-[#78350F]">Susun kartu sampai sama dengan label {ts}</p>
            <PapanSvg rupa="benda" n={bilanganSusun(k)} banyak={k.susun} ik={"\u{1F36C}"} />
            <div className="mt-2 grid grid-cols-1 gap-1" role="group" aria-label="Atur banyak kartu tiap tempat">
              {SEMUA.map((t) => pengatur({ t, nilai: k.susun[t], maks: BATAS_KARTU, onKurang: () => terapkan(ubahSusun(k, t, -1)), onTambah: () => terapkan(ubahSusun(k, t, 1)) }))}
            </div>
            <p className="mt-1 text-center text-sm font-black text-[#1C01A5]">Bilangan di meja: {bilanganSusun(k)}</p>
            {periksa(() => terapkan(periksaSusun(k)))}
          </>
        ) : null}
        {k.mode === "uraikan" ? (
          <>
            <p className="mb-1 text-center text-sm font-black text-[#78350F]">Uraikan bilangan {tu}: atur jumlah yang diwakili tiap angka</p>
            <PapanSvg rupa="diagram" n={tu} />
            <div className="mt-2 grid grid-cols-1 gap-1" role="group" aria-label="Atur jumlah tiap tempat">
              {SEMUA.map((t) => pengatur({ t, nilai: k.urai[t], maks: BATAS_KARTU * BOBOT[t], onKurang: () => ubah(ubahUrai(k, t, -1)), onTambah: () => ubah(ubahUrai(k, t, 1)) }))}
            </div>
            <p className="mt-1 text-center text-base font-black text-[#1C01A5]">
              {tu} = {k.urai[0]} + {k.urai[1]} + {k.urai[2]}
            </p>
            {periksa(() => terapkan(periksaUrai(k)))}
          </>
        ) : null}
        {k.mode === "tabel" ? (
          <>
            <p className="mb-1 text-center text-sm font-black text-[#78350F]">Isi tabel tiga tempat untuk bilangan {tt} dengan angka</p>
            <PapanSvg rupa="diagram" n={tt} sembunyi />
            <div className="mt-2 grid grid-cols-1 gap-1" role="group" aria-label="Isi angka tiap tempat">
              {SEMUA.map((t) => pengatur({ t, nilai: k.tabel[t], maks: BATAS_KARTU, onKurang: () => ubah(ubahTabel(k, t, -1)), onTambah: () => ubah(ubahTabel(k, t, 1)) }))}
            </div>
            {periksa(() => terapkan(periksaTabel(k)))}
          </>
        ) : null}
        {k.mode === "nol" ? (
          <>
            <p className="mb-1 text-center text-sm font-black text-[#78350F]">Hitung kartu di tiap tempat, lalu tulis labelnya</p>
            <PapanSvg rupa="benda" n={tn} sembunyi ik={"\u{1F96B}"} />
            <div className="mt-2 grid grid-cols-1 gap-1" role="group" aria-label="Tulis angka tiap tempat">
              {SEMUA.map((t) => pengatur({ t, nilai: k.nol[t], maks: BATAS_KARTU, onKurang: () => ubah(ubahNol(k, t, -1)), onTambah: () => ubah(ubahNol(k, t, 1)) }))}
            </div>
            <p className="mt-1 text-center text-sm font-black text-[#1C01A5]">Labelmu: {k.nol.join("")}</p>
            {periksa(() => terapkan(periksaNol(k)))}
          </>
        ) : null}
        {k.mode === "sama" ? (
          <>
            <p className="mb-1 text-center text-sm font-black text-[#78350F]">Angka {sm.d} muncul dua kali. Di tempat mana jumlahnya paling besar?</p>
            <PapanSvg rupa="diagram" n={sm.n} ring={sm.d} />
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Pilih tempat">
              {SEMUA.map((t) => (
                <button key={t} type="button" aria-pressed={k.samaPilih === t} className={pilihan(k.samaPilih === t)} onClick={() => ubah(pilihSama(k, t))}>
                  {NAMA_JUDUL[t]}
                </button>
              ))}
            </div>
            {periksa(() => terapkan(periksaSama(k)))}
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiLabel(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatLabel(k)}
      </p>
    </div>
  );
}
