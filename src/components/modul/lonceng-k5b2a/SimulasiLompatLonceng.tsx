"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK5B1 } from "../eja-k5b1";
import {
  awalLonceng,
  hurufBesar,
  hasilKali,
  kalimatBetulCek,
  kalimatBetulKali,
  kalimatBetulLompat,
  kalimatBetulWarnai,
  kalimatCek,
  kalimatKali,
  kalimatLompat,
  kalimatWarnai,
  kurangiCek,
  lompatLagi,
  lompatMaks,
  lompatMundur,
  mulaiLagiLonceng,
  periksaCek,
  periksaKali,
  periksaLompat,
  periksaWarnai,
  petunjukCek,
  petunjukKali,
  petunjukKurangiCek,
  petunjukLompat,
  petunjukWarnai,
  pilihCek,
  pilihModeLonceng,
  sasaranCek,
  sasaranKali,
  sasaranLompat,
  sasaranWarnai,
  ubahKali,
  ubahWarna,
  type KeadaanLonceng,
  type ModeLonceng,
} from "./logika";
import { MISI_LONCENG_TEKS } from "./data-sim";
import { KOLOM_TABEL, kata } from "./logika-data";
import { GarisLompat } from "./GambarLonceng";

/**
 * Simulasi Kelas 5 Bab 2 Sub-Bab A: Lompat Lonceng (Misi Lonceng). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Lompat (lompat dengan jarak yang sama sampai kelipatan terakhir sebelum batas), Warnai (warnai kelipatan pada tabel bilangan), Cek (kurangi dengan pembagi sampai sisa lebih kecil,
 * lalu pilih kelipatan atau bukan; alat menolak bila sisa masih bisa dikurangi) dan Kali (atur pengali; alat menolak pengali nol karena nol bukan kelipatan).
 * Garis lompat digambar dari bilangan; tabel dan alat Kali dari data.
 */
const MODE: { id: ModeLonceng; nama: string; ikon: string }[] = [
  { id: "lompat", nama: "Lompat", ikon: "\u{1F463}" },
  { id: "warnai", nama: "Warnai", ikon: "\u{1F3A8}" },
  { id: "cek", nama: "Cek", ikon: "➗" },
  { id: "kali", nama: "Kali", ikon: "✖️" },
];

export default function SimulasiLompatLonceng({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLonceng) => void }) {
  const [k, setK] = useState<KeadaanLonceng>(() => awalLonceng());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap aksi baru mengosongkan pesan lama; pesan baru hanya bila `ucap` diberikan. */
  const ubah = (baru: KeadaanLonceng, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada sasaran berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(ejaK5B1(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK5B1(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#B45309] bg-white px-3 text-sm font-black text-[#7C2D12] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full min-w-0 rounded-xl border-4 px-2 py-2 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#B45309] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeLonceng) =>
    ubah(
      pilihModeLonceng(k, m),
      m === "lompat"
        ? "Lompat dengan jarak yang sama sampai batas."
        : m === "warnai"
          ? "Warnai semua kelipatan pada tabel bilangan."
          : m === "cek"
            ? "Kurangi dengan pembagi, lalu putuskan kelipatan atau bukan."
            : "Atur pengali sampai hasil kali sama dengan sasaran.",
    );

  /* ------------------------------ Lompat ------------------------------ */
  const sl = sasaranLompat(k);
  const maksL = lompatMaks(sl);
  const lompatKu = () => {
    const r = lompatLagi(k);
    if (r.ok) return ubah(r.k);
    ubah(r.k);
    salah(`Alat menolak. Lompatan berikutnya melewati batas ${sl.batas}, jadi tekan Periksa.`);
  };
  const periksaLompatKu = () => {
    const r = periksaLompat(k);
    if (r.ok) return ubah(r.k, kalimatBetulLompat(sl));
    ubah(r.k);
    salah(petunjukLompat(k));
  };
  /* ------------------------------ Warnai ------------------------------ */
  const sw = sasaranWarnai(k);
  const periksaWarnaiKu = () => {
    const r = periksaWarnai(k);
    if (r.ok) return ubah(r.k, kalimatBetulWarnai(sw));
    ubah(r.k);
    salah(petunjukWarnai(k));
  };
  /* ------------------------------ Cek ------------------------------ */
  const sc = sasaranCek(k);
  const banyakKurang = Math.floor((sc.n - k.cekSisa) / sc.b);
  const kurangiKu = () => {
    const r = kurangiCek(k);
    if (r.ok) return ubah(r.k);
    ubah(r.k);
    salah(petunjukKurangiCek);
  };
  const periksaCekKu = () => {
    const r = periksaCek(k);
    if (r.ok) return ubah(r.k, kalimatBetulCek(sc));
    ubah(r.k);
    salah(petunjukCek(k));
  };
  /* ------------------------------ Kali ------------------------------ */
  const sk = sasaranKali(k);
  const periksaKaliKu = () => {
    const r = periksaKali(k);
    if (r.ok) return ubah(r.k, kalimatBetulKali(sk));
    ubah(r.k);
    salah(petunjukKali(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-lompat-lonceng">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Lompat Lonceng</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_LONCENG_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "lompat" ? (
          <div className="space-y-2" key={`lo${k.lompatKe}`}>
            <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">
              {hurufBesar(sl.benda)} tiap {kata(sl.b)} {sl.satuan}. Lompat sampai batas {kata(sl.batas)}.
            </p>
            <GarisLompat b={sl.b} p={maksL} buat={k.lompatBuat} rupa="benda" satuan={sl.satuan} label={`Garis lompat jarak ${sl.b}, ${k.lompatBuat} dari ${maksL} lompatan`} />
            <p className="text-center text-xs font-black text-[#1C01A5]">
              Lompatan: {k.lompatBuat} · jarak {sl.b} {sl.satuan}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" className={tombol} onClick={lompatKu}>
                {"\u{1F463}"} Lompat
              </button>
              <button type="button" className={tombol} disabled={k.lompatBuat === 0} onClick={() => ubah(lompatMundur(k))}>
                {"↩️"} Mundur
              </button>
              <button type="button" className={tombol} onClick={periksaLompatKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "warnai" ? (
          <div className="space-y-2" key={`wa${k.warnaiKe}`}>
            <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">
              Warnai kelipatan {kata(sw.b)} pada tabel bilangan satu sampai {kata(sw.sampai)} ({sw.benda}).
            </p>
            <div className="mx-auto grid max-w-[420px] gap-[3px] px-1" style={{ gridTemplateColumns: `repeat(${KOLOM_TABEL}, minmax(0, 1fr))` }} role="group" aria-label="Tabel bilangan">
              {Array.from({ length: sw.sampai }, (_, i) => i + 1).map((n) => {
                const nyala = k.warnaiPilih.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={nyala}
                    aria-label={`Bilangan ${n}${nyala ? ", berwarna" : ""}`}
                    onClick={() => ubah(ubahWarna(k, n))}
                    className={`flex min-h-[36px] min-w-0 items-center justify-center rounded-md border-2 text-[12px] font-black ${nyala ? "border-[#C2410C] bg-[#FDBA74] text-[#7C2D12]" : "border-[#CBD5E1] bg-white text-[#475569]"}`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaWarnaiKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "cek" ? (
          <div className="space-y-2" key={`ce${k.cekKe}`}>
            <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">
              {hurufBesar(sc.benda)}: {kata(sc.n)} {sc.satuan}. Apakah {kata(sc.n)} kelipatan {kata(sc.b)}?
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">
              Sudah dikurangi {banyakKurang} kali · sisa sekarang {k.cekSisa}
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-9 gap-[3px] px-1" aria-label={`${banyakKurang} potongan sudah diambil`}>
              {Array.from({ length: Math.floor(sc.n / sc.b) }, (_, i) => (
                <span key={i} className={`flex h-7 min-w-0 items-center justify-center rounded-md border-2 text-[11px] font-black ${i < banyakKurang ? "border-[#C2410C] bg-[#FDBA74] text-[#7C2D12]" : "border-dashed border-[#CBD5E1] bg-white text-[#CBD5E1]"}`}>
                  {i < banyakKurang ? `−${sc.b}` : "·"}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 px-2">
              <button type="button" onClick={() => ubah(pilihCek(k, 0))} aria-pressed={k.cekPilih === 0} className={pilihan(k.cekPilih === 0)}>
                kelipatan
              </button>
              <button type="button" onClick={() => ubah(pilihCek(k, 1))} aria-pressed={k.cekPilih === 1} className={pilihan(k.cekPilih === 1)}>
                bukan kelipatan
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={tombol} onClick={kurangiKu}>
                {"➖"} Kurangi {sc.b}
              </button>
              <button type="button" className={tombol} onClick={periksaCekKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kali" ? (
          <div className="space-y-2" key={`ka${k.kaliKe}`}>
            <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">
              {hurufBesar(sk.benda)}: tiap {kata(sk.b)} {sk.satuan}. Sasaran: {kata(sk.n)} {sk.satuan}.
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-9 gap-[3px] px-1" aria-label={`${k.kaliP} lonceng`}>
              {Array.from({ length: 9 }, (_, i) => (
                <span key={i} className={`flex h-8 items-center justify-center rounded-md border-2 text-base ${i < k.kaliP ? "border-[#B45309] bg-[#FEF3C7]" : "border-dashed border-[#CBD5E1] bg-white text-transparent"}`}>
                  {"\u{1F514}"}
                </span>
              ))}
            </div>
            <div className="mx-auto grid max-w-[300px] grid-cols-[56px_1fr_56px] items-center gap-2 px-2">
              <button type="button" aria-label="Kurangi pengali" className={tombol} onClick={() => ubah(ubahKali(k, -1))}>
                −
              </button>
              <p className="text-center text-xl font-black text-[#1C01A5]" data-hasil={hasilKali(k)}>
                {k.kaliP} × {sk.b} = {hasilKali(k)}
              </p>
              <button type="button" aria-label="Naikkan pengali" className={tombol} onClick={() => ubah(ubahKali(k, 1))}>
                +
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKaliKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiLonceng(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "lompat" ? kalimatLompat(k) : k.mode === "warnai" ? kalimatWarnai(k) : k.mode === "cek" ? kalimatCek(k) : kalimatKali(k)))}
      </p>
    </div>
  );
}
