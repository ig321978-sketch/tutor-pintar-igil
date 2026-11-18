"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  CONTOH_STOK,
  ambilSatu,
  awalStok,
  bolehSepuluh,
  bukaKalimat,
  bukaPuluhan,
  kalimatContoh,
  kalimatStok,
  kata,
  pasangSatu,
  periksaStok,
  pilihContohStok,
  pilihModeStok,
  selisihStok,
  sepuluhMaju,
  sisaStok,
  sudahAmbilSemua,
  ulangStok,
  type KeadaanStok,
  type ModeStok,
} from "./logika";
import { MISI_STOK } from "./data";

/**
 * Simulasi Kelas 2 Bab 2 Sub-Bab B: Meja Stok (Misi Meja Stok bagian satu). Data berbeda dari Story. Eksplorasi bebas tanpa skor, lima alat untuk satu kartu stok:
 * Pasangkan (topi dan dasi satu-satu untuk mencari selisih), Kurangi (ambil barang yang terjual satu per satu, buka satu puluhan bila barang lepas tidak cukup),
 * Periksa (sisa ditambah yang terjual harus sama dengan stok awal), Keluarga (empat kalimat dari tiga bilangan), dan Kurangi dari Sepuluh (dua langkah).
 */
const TOPI = "\u{1F9E2}";
const DASI = "\u{1F454}";
const BARANG = "\u{1F9E2}";
const MODE: { id: ModeStok; nama: string; ikon: string }[] = [
  { id: "pasang", nama: "Pasangkan", ikon: "\u{1F517}" },
  { id: "kurang", nama: "Kurangi", ikon: "\u{2796}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{1F50D}" },
  { id: "keluarga", nama: "Keluarga", ikon: "\u{1F46A}" },
  { id: "sepuluh", nama: "Kurangi dari Sepuluh", ikon: "\u{1F51F}" },
];
const GABUS = "radial-gradient(circle at 20% 30%,rgba(120,72,24,0.35) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,rgba(120,72,24,0.28) 0 1.5px,transparent 2.5px),#C9A66B";

function Kecil({ e, mark, redup }: { e: string; mark?: "hijau" | "merah" | "kuning"; redup?: boolean }) {
  const garis = mark === "hijau" ? "border-[#15803D] bg-[#DCFCE7]" : mark === "merah" ? "border-[#DC2626] bg-[#FEE2E2]" : mark === "kuning" ? "border-[#B45309] bg-[#FEF3C7]" : "border-[#92400E] bg-[#FFFBEB]";
  return (
    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 text-base ${garis} ${redup ? "opacity-35" : ""}`} aria-hidden="true">
      {e}
    </span>
  );
}

export default function SimulasiMejaStok({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanStok) => void }) {
  const [k, setK] = useState<KeadaanStok>(() => awalStok());
  const [goyang, setGoyang] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanStok, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const aksi = (id: string, hasil: { k: KeadaanStok; ok: boolean }, tolak: string) => {
    if (hasil.ok) ubah(hasil.k, kalimatStok(hasil.k));
    else {
      setGoyang(id);
      window.setTimeout(() => setGoyang(""), 480);
      speakGuru(tolak);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#78350F] bg-[#78350F] text-white" : "border-[#78350F] bg-white text-[#78350F]"}`;
  const pindahMode = (m: ModeStok) => {
    const baru = pilihModeStok(k, m);
    ubah(baru, kalimatStok(baru));
  };
  const goyangCls = (id: string) => (goyang === id ? "lm-goyang" : "");
  const c = selisihStok(k);
  const kal = kalimatContoh(k);
  const selesaiAmbil = sudahAmbilSemua(k);
  const tolakAmbil = (h: ReturnType<typeof ambilSatu>) => (h.sebab === "cukup" ? "Semua barang yang terjual sudah diambil. Sekarang periksa hasilnya." : "Barang lepas sudah habis. Buka dulu satu puluhan.");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_STOK}</p>

      <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih contoh stok">
        <span className="text-xs font-black text-[#1C01A5]">Contoh stok:</span>
        {CONTOH_STOK.map((x) => (
          <button key={`${x.a}-${x.b}`} type="button" aria-pressed={k.a === x.a && k.b === x.b} className={saklar(k.a === x.a && k.b === x.b)} onClick={() => ubah(pilihContohStok(k, x.a, x.b), `Contoh baru: ${kata(x.a)} dikurangi ${kata(x.b)}.`)}>
            {x.a} − {x.b}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja stok">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => pindahMode(m.id)}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-[6px] border-[#A16207] p-2" style={{ background: GABUS }}>
        <div className="mx-auto mb-2 max-w-xs rounded-sm border-2 border-[#92400E] bg-[#FFFBEB] px-2 py-1 text-center shadow-[0_3px_0_rgba(69,26,3,0.3)]">
          <p className="text-[11px] font-black text-[#92400E]">Kartu stok</p>
          <p className="text-lg font-black text-[#1C01A5]">
            {k.a} − {k.b} = {k.mode === "kurang" || k.mode === "periksa" ? (selesaiAmbil ? c : "?") : "?"}
          </p>
          <p className="text-xs font-black text-[#15803D]">{k.mode === "kurang" || k.mode === "periksa" ? `Stok sekarang: ${sisaStok(k)}` : "Stok awal: " + k.a}</p>
        </div>

        {k.mode === "pasang" ? (
          <div className="space-y-2 rounded-xl bg-white/90 p-2">
            <p className="text-xs font-black text-[#78350F]">Topi: {k.a}</p>
            <div className="flex flex-wrap gap-1" aria-label="Deret topi">
              {Array.from({ length: k.a }, (_, i) => (
                <Kecil key={i} e={TOPI} mark={i < k.pasang ? "hijau" : k.pasang >= k.b ? "kuning" : undefined} />
              ))}
            </div>
            <p className="text-xs font-black text-[#78350F]">Dasi: {k.b}</p>
            <div className="flex flex-wrap gap-1" aria-label="Deret dasi">
              {Array.from({ length: k.b }, (_, i) => (
                <Kecil key={i} e={DASI} mark={i < k.pasang ? "hijau" : undefined} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button type="button" className={`${tombol} ${goyangCls("pasang")}`} onClick={() => aksi("pasang", pasangSatu(k), "Semua dasi sudah berpasangan.")}>
                {"\u{1F517}"} Pasangkan satu
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangStok(k), "Pasangan dirapikan. Mulai lagi.")}>
                {"\u{1F504}"} Ulang
              </button>
            </div>
            {k.pasang >= k.b ? (
              <p className="rounded-xl border-4 border-[#15803D] bg-[#F0FDF4] px-2 py-1 text-center text-sm font-black text-[#14532D]">
                Ada {c} topi yang tidak berpasangan. Selisihnya {c}.
              </p>
            ) : null}
          </div>
        ) : null}

        {k.mode === "kurang" || k.mode === "periksa" ? (
          <div className="space-y-2 rounded-xl bg-white/90 p-2">
            <p className="text-xs font-black text-[#78350F]">Ikat sepuluh: {k.p} · Barang lepas: {k.s} · Sudah diambil: {k.diambil} dari {k.b}</p>
            <div className="flex min-h-[3rem] flex-wrap items-center gap-1.5" aria-label="Ikat sepuluh di rak">
              {k.p === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Tidak ada ikat sepuluh.</span> : null}
              {Array.from({ length: k.p }, (_, i) => (
                <button key={i} type="button" onClick={() => aksi("buka", bukaPuluhan(k), k.p < 1 ? "Tidak ada ikat sepuluh yang bisa dibuka." : "Barang lepas masih cukup. Ambil dulu yang terjual, buka ikat hanya bila barang lepas kurang.")} aria-label="ikat sepuluh, ketuk untuk membuka" className={`relative inline-flex h-12 w-[4.2rem] items-center justify-center rounded-lg border-[3px] border-[#92400E] bg-[#F5D7A1] text-xl shadow-[0_2px_0_rgba(69,26,3,0.3)] ${goyangCls("buka")}`}>
                  <span className="absolute inset-x-1 top-1 h-0.5 bg-[#92400E]" aria-hidden="true" />
                  <span aria-hidden="true">{BARANG}</span>
                </button>
              ))}
            </div>
            <div className="flex min-h-[2.4rem] flex-wrap items-center gap-1" aria-label="Barang lepas di rak">
              {k.s === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Tidak ada barang lepas.</span> : null}
              {Array.from({ length: k.s }, (_, i) => (
                <button key={i} type="button" onClick={() => aksi("ambil", ambilSatu(k), tolakAmbil(ambilSatu(k)))} aria-label="barang lepas, ketuk untuk mengambil" className={goyangCls("ambil")}>
                  <Kecil e={BARANG} />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button type="button" className={`${tombol} ${goyangCls("ambil")}`} onClick={() => aksi("ambil", ambilSatu(k), tolakAmbil(ambilSatu(k)))}>
                {"\u{2796}"} Ambil satu
              </button>
              <button type="button" className={`${tombol} ${goyangCls("buka")}`} onClick={() => aksi("buka", bukaPuluhan(k), k.p < 1 ? "Tidak ada ikat sepuluh yang bisa dibuka." : "Barang lepas masih cukup. Ambil dulu yang terjual, buka ikat hanya bila barang lepas kurang.")}>
                {"\u{1F4E4}"} Buka satu puluhan
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangStok(k), "Rak dirapikan. Kurangi lagi dari awal.")}>
                {"\u{1F504}"} Ulang
              </button>
              {k.mode === "periksa" ? (
                <button type="button" className={`${tombol} ${goyangCls("periksa")}`} onClick={() => aksi("periksa", periksaStok(k), "Kurangi stoknya dulu sampai semua yang terjual diambil, baru periksa.")}>
                  {"\u{1F50D}"} Periksa dengan tambah
                </button>
              ) : null}
            </div>
            {k.mode === "periksa" ? (
              <p className={`rounded-xl border-4 px-2 py-1 text-center text-base font-black ${selesaiAmbil ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-dashed border-[#B45309] bg-[#FFFBEB] text-[#92400E]"}`}>
                {selesaiAmbil ? `${c} + ${k.b} = ${k.a}${k.periksaTuntas > 0 ? " ✓ cocok" : ""}` : "Kurangi stoknya dulu di alat Kurangi."}
              </p>
            ) : null}
          </div>
        ) : null}

        {k.mode === "keluarga" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">
              Keluarga bilangan: {k.b}, {c}, dan {k.a}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {kal.map((t, i) => {
                const buka = (k.keluargaMask & (1 << i)) !== 0;
                return (
                  <button key={i} type="button" onClick={() => ubah(bukaKalimat(k, i), kalimatStok(k))} aria-label={buka ? `kalimat ${t}` : `kalimat tertutup nomor ${i + 1}`} className={`min-h-[48px] rounded-xl border-4 px-1 text-base font-black ${buka ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-dashed border-[#1C01A5] bg-[#FFF7CC] text-[#1C01A5]"}`}>
                    {buka ? t : "ketuk untuk membuka"}
                  </button>
                );
              })}
            </div>
            {k.keluargaTuntas ? <p className="text-xs font-black text-[#15803D]">Dua penjumlahan dan dua pengurangan dari tiga bilangan yang sama.</p> : null}
          </div>
        ) : null}

        {k.mode === "sepuluh" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Kurangi dari Sepuluh</p>
            {!bolehSepuluh(k) ? (
              <p className="text-xs font-black text-[#B45309]">Cara ini untuk bilangan awal sebelas sampai dua puluh. Pilih contoh yang lain.</p>
            ) : (
              <>
                <p className={`rounded-xl border-2 px-2 py-1 text-xl font-black ${k.sepuluhLangkah >= 1 ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-dashed border-[#1C01A5] text-[#1C01A5]"}`}>10 − {k.b} = {k.sepuluhLangkah >= 1 ? 10 - k.b : "?"}</p>
                <p className={`rounded-xl border-2 px-2 py-1 text-xl font-black ${k.sepuluhLangkah >= 2 ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-dashed border-[#1C01A5] text-[#1C01A5]"}`}>
                  {k.sepuluhLangkah >= 1 ? 10 - k.b : "?"} + {k.a - 10} = {k.sepuluhLangkah >= 2 ? c : "?"}
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <button type="button" className={`${tombol} ${goyangCls("sepuluh")}`} disabled={k.sepuluhLangkah >= 2} onClick={() => aksi("sepuluh", sepuluhMaju(k), "Kedua langkah sudah selesai.")}>
                    {k.sepuluhLangkah === 0 ? "Langkah 1: kurangi dari sepuluh" : "Langkah 2: tambahkan sisanya"}
                  </button>
                  <button type="button" className={tombol} onClick={() => ubah(ulangStok(k), "Dimulai lagi dari langkah pertama.")}>
                    {"\u{1F504}"} Ulang
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatStok(k)}
      </p>
    </div>
  );
}
