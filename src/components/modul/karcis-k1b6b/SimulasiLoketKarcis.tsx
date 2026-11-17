"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_CARA_HITUNG,
  URUT_CARA_HITUNG,
  awalKarcis,
  bilanganRombongan,
  bisaCara,
  gantiCara,
  hitunganSelesai,
  kalimatKarcis,
  langkahBerikut,
  pilihRombongan,
  totalLangkah,
  ubahSendiri,
  ulangHitung,
  type CaraHitung,
  type KeadaanKarcis,
} from "./logika";
import { EMOJI, MISI_KARCIS, ROMBONGAN_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 6 Sub-Bab B: Misi Loket Karcis bagian satu. Rombongan di loket berbeda dari Story; eksplorasi bebas tanpa skor.
 * Pilih satu rombongan (atau atur rombongan buatan sendiri), pilih cara menghitung karcisnya (hitung maju, genapkan sepuluh, belasan tambah satuan),
 * jalankan langkahnya satu per satu, lalu hasilnya tercatat di papan catatan loket. Sub-Bab C melanjutkan dengan lapor sisa dagangan.
 */
const R = ROMBONGAN_SIM;
const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`;

/** Deret `n` karcis; yang indeksnya di bawah `terang` tampil penuh, sisanya pudar; `sorot` indeks dari sini disorot. */
function Karcis({ n, terang = n, sorot = n, warna = "#FEF08A" }: { n: number; terang?: number; sorot?: number; warna?: string }) {
  return (
    <span className="flex flex-wrap gap-[3px]" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={`flex h-6 w-8 items-center justify-center rounded-[3px] border-2 border-dashed text-[13px] ${i >= sorot ? "ring-2 ring-[#16A34A]" : ""}`} style={{ background: warna, borderColor: "#92400E", opacity: i < terang ? 1 : 0.35 }}>
          {EMOJI.karcis}
        </span>
      ))}
    </span>
  );
}

export default function SimulasiLoketKarcis({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKarcis) => void }) {
  const [k, setK] = useState<KeadaanKarcis>(() => awalKarcis(R));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanKarcis, ucap = true) => {
    setK(baru);
    if (ucap) speakGuru(kalimatKarcis(baru, R));
  };
  const { a, b } = bilanganRombongan(k, R);
  const sendiri = k.pilih === R.length - 1;
  const bisa = bisaCara(k.cara, a, b);
  const total = totalLangkah(k.cara, b);
  const selesai = hitunganSelesai(k, R);
  const pisah = 10 - a;

  /* Gambaran langkah: karcis kelompok pertama dan kedua menurut cara dan langkah. */
  const kelompokA = k.cara === "genap" && k.langkah >= 1 && bisa ? 10 : a;
  const kelompokB = k.cara === "genap" && k.langkah >= 1 && bisa ? b - pisah : b;
  const maju = k.cara === "maju" ? k.langkah : 0;

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_KARCIS}</p>

      {/* Loket: atap bergaris, jendela, dan tombol rombongan */}
      <div className="rounded-2xl border-4 border-[#7F1D1D] bg-[#FEF3C7] p-2">
        <div className="h-5 rounded-t-lg" style={{ background: "repeating-linear-gradient(90deg,#DC2626 0 16px,#FFFFFF 16px 32px)" }} aria-hidden="true" />
        <p className="mb-1 mt-1 text-center text-xs font-black text-[#7F1D1D]">{EMOJI.karcis} Loket karcis: pilih rombongan</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Pilih rombongan">
          {R.map((r, i) => {
            const dc = k.catat[i];
            const ab = i === R.length - 1 ? k.sendiri : { a: r.a, b: r.b };
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={k.pilih === i}
                onClick={() => ubah(pilihRombongan(k, i))}
                className={`flex min-h-[64px] flex-col items-center justify-center rounded-xl border-4 px-1 text-xs font-black ${k.pilih === i ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#B45309] bg-white"} text-[#1C01A5]`}
              >
                <span className="text-lg" aria-hidden="true">
                  {r.ikon}
                </span>
                {r.nama}
                <span className="text-[#B91C1C]">
                  {ab.a} + {ab.b}
                </span>
                {dc.length ? <span className="text-[#15803D]">{"\u{2705}"} tercatat</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      {sendiri ? (
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-[#7C3AED] bg-[#F5F3FF] p-2" role="group" aria-label="Atur dua bilangan">
          {(["a", "b"] as const).map((x) => (
            <span key={x} className="flex items-center gap-1 text-sm font-black text-[#4C1D95]">
              {x === "a" ? "Bilangan pertama" : "Ditambah"}
              <button type="button" className={tombol} aria-label={`Kurangi ${x === "a" ? "bilangan pertama" : "yang ditambahkan"}`} onClick={() => ubah(ubahSendiri(k, x, -1), false)}>
                −
              </button>
              <span className="w-7 text-center text-xl text-[#B91C1C]">{k.sendiri[x]}</span>
              <button type="button" className={tombol} aria-label={`Tambah ${x === "a" ? "bilangan pertama" : "yang ditambahkan"}`} onClick={() => ubah(ubahSendiri(k, x, 1), false)}>
                +
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih cara menghitung">
        {URUT_CARA_HITUNG.map((c: CaraHitung) => (
          <button key={c} type="button" aria-pressed={k.cara === c} className={`${saklar(k.cara === c)} ${bisaCara(c, a, b) ? "" : "opacity-50"}`} onClick={() => ubah(gantiCara(k, c))}>
            {NAMA_CARA_HITUNG[c]}
          </button>
        ))}
      </div>

      {/* Meja hitung: karcis kelompok pertama dan kedua */}
      <div className="rounded-2xl border-4 border-[#92400E] p-2" style={{ background: "repeating-linear-gradient(0deg,#E7D3A3 0 8px,#DCC38A 8px 10px)" }}>
        <div className="flex flex-wrap items-start justify-center gap-4">
          <div className="space-y-1">
            <p className="text-center text-xs font-black text-[#7F1D1D]">pertama: {kelompokA}</p>
            <Karcis n={kelompokA} sorot={k.cara === "genap" && bisa && k.langkah >= 1 ? a : kelompokA} warna="#FEF08A" />
          </div>
          <div className="space-y-1">
            <p className="text-center text-xs font-black text-[#7F1D1D]">ditambah: {kelompokB}</p>
            <Karcis n={kelompokB} terang={k.cara === "maju" && bisa ? maju : kelompokB} warna="#BAE6FD" />
          </div>
        </div>
        {bisa && k.cara === "maju" && k.langkah > 0 ? (
          <p className="mt-1 text-center text-sm font-black text-[#14532D]">
            {Array.from({ length: k.langkah }, (_, i) => a + 1 + i).join(", ")}
          </p>
        ) : null}
        {bisa && k.cara === "belasan" && k.langkah >= 1 ? (
          <p className="mt-1 text-center text-sm font-black text-[#14532D]">
            satuan {a % 10} + {b} = {(a % 10) + b}, puluhan tetap 1
          </p>
        ) : null}
        {bisa && k.cara === "genap" && k.langkah >= 1 ? (
          <p className="mt-1 text-center text-sm font-black text-[#14532D]">
            {a} + {pisah} = 10, sisanya {b - pisah}
          </p>
        ) : null}
        {selesai ? (
          <p className="mt-1 text-center text-lg font-black text-[#B91C1C]">
            {a} + {b} = {a + b}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        <button type="button" className={tombol} disabled={!bisa || selesai} onClick={() => ubah(langkahBerikut(k, R))}>
          {"\u{25B6}\u{FE0F}"} Langkah berikutnya {bisa && !selesai ? `(${k.langkah}/${total})` : ""}
        </button>
        <button type="button" className={tombol} disabled={k.langkah === 0} onClick={() => ubah(ulangHitung(k), false)}>
          {"\u{1F504}"} Ulang hitungan
        </button>
      </div>

      {/* Papan catatan loket */}
      <div className="rounded-2xl border-4 border-[#14532D] bg-[#166534] p-2">
        <p className="mb-1 text-center text-xs font-black text-white">{"\u{1F4DD}"} Papan catatan loket</p>
        <ul className="space-y-1">
          {R.map((r, i) => {
            const ab = i === R.length - 1 ? k.sendiri : { a: r.a, b: r.b };
            const dc = k.catat[i];
            return (
              <li key={r.id} className="rounded-md bg-white/90 px-2 py-1 text-xs font-black text-[#14532D]">
                {r.nama}: {dc.length ? `${ab.a} + ${ab.b} = ${ab.a + ab.b} (${dc.map((c) => NAMA_CARA_HITUNG[c].toLowerCase()).join(", ")})` : "belum dicatat"}
              </li>
            );
          })}
        </ul>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatKarcis(k, R)}
      </p>
    </div>
  );
}
