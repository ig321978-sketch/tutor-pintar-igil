"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  CONTOH_PESANAN,
  MAKS_LEPAS,
  aturPesanan,
  awalKasir,
  bilanganKartu,
  bilanganMeja,
  bukaKotak,
  caraTulis,
  kalimatKasir,
  kata,
  kemasSepuluh,
  kurangiKotak,
  kurangiLepas,
  pilihModeKasir,
  tambahKotak,
  tambahLepas,
  tukarKartu,
  ubahKartu,
  type KeadaanKasir,
  type Kolom,
  type ModeKasir,
} from "./logika";
import { MISI_MEJA, SETS } from "./data";

/**
 * Simulasi Kelas 2 Bab 1 Sub-Bab B: Meja Kasir (Misi Meja Kasir bagian satu). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat untuk satu meja:
 * Meja (susun pesanan dari kotak penuh isi sepuluh dan kue lepas, kemas sepuluh kue lepas jadi satu kotak, atau buka kotak), Tabel (puluhan dan satuan dari meja),
 * Kartu (dua kartu angka yang bisa ditukar tempat), dan Bentuk panjang (puluhan ditambah satuan, cara paling ringkas dan satu cara lain).
 */
const E = SETS.kue.emoji;
const MODE: { id: ModeKasir; nama: string; ikon: string }[] = [
  { id: "meja", nama: "Meja", ikon: "\u{1F4E6}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CB}" },
  { id: "kartu", nama: "Kartu", ikon: "\u{1F5C2}\u{FE0F}" },
  { id: "uraian", nama: "Bentuk panjang", ikon: "\u{2795}" },
];
const KAYU = "repeating-linear-gradient(0deg,#C2884D 0 22px,#B77A3F 22px 24px)";

function KotakPenuh() {
  return (
    <span className="relative inline-flex h-12 w-[4.2rem] items-center justify-center rounded-lg border-[3px] border-[#92400E] bg-[#FDE68A] text-xl shadow-[0_2px_0_rgba(69,26,3,0.3)]" aria-label="kotak penuh isi sepuluh">
      <span className="absolute inset-x-1 top-1 h-0.5 bg-[#92400E]" aria-hidden="true" />
      <span aria-hidden="true">{E}</span>
    </span>
  );
}
function KueLepas() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#92400E] bg-[#FBCFE8] text-base" aria-label="kue lepas">
      <span aria-hidden="true">{E}</span>
    </span>
  );
}

export default function SimulasiMejaKasir({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKasir) => void }) {
  const [k, setK] = useState<KeadaanKasir>(() => awalKasir());
  const [goyang, setGoyang] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanKasir, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const aksi = (id: string, hasil: { k: KeadaanKasir; ok: boolean }, tolak: string) => {
    if (hasil.ok) ubah(hasil.k, kalimatKasir(hasil.k));
    else {
      setGoyang(id);
      window.setTimeout(() => setGoyang(""), 480);
      speakGuru(tolak);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#78350F] bg-[#78350F] text-white" : "border-[#78350F] bg-white text-[#78350F]"}`;
  const pindahMode = (m: ModeKasir) => {
    const baru = pilihModeKasir(k, m);
    ubah(baru, kalimatKasir(baru));
  };
  const n = bilanganMeja(k);
  const baruTukar = tukarKartu(k);
  const cara = caraTulis(k);
  const goyangCls = (id: string) => (goyang === id ? "lm-goyang" : "");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_MEJA}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja kasir">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => pindahMode(m.id)}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#78350F] p-2" style={{ background: KAYU }}>
        {k.mode === "meja" ? (
          <div className="space-y-2">
            <div className="rounded-xl bg-white/90 p-2">
              <p className="text-xs font-black text-[#78350F]">Kotak penuh isi sepuluh (puluhan): {k.kotak}</p>
              <div className="mt-1 flex min-h-[3.4rem] flex-wrap items-center gap-1.5" aria-label="Kotak penuh di meja">
                {k.kotak === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Belum ada kotak penuh.</span> : Array.from({ length: k.kotak }, (_, i) => <KotakPenuh key={i} />)}
              </div>
            </div>
            <div className="rounded-xl bg-white/90 p-2">
              <p className="text-xs font-black text-[#78350F]">Kue lepas (satuan): {k.lepas}</p>
              <div className="mt-1 flex min-h-[2.4rem] flex-wrap items-center gap-1" aria-label="Kue lepas di meja">
                {k.lepas === 0 ? <span className="text-xs font-bold text-[#78350F]/60">Belum ada kue lepas.</span> : Array.from({ length: k.lepas }, (_, i) => <KueLepas key={i} />)}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button type="button" className={`${tombol} ${goyangCls("+k")}`} onClick={() => aksi("+k", tambahKotak(k), "Meja sudah penuh. Bilangan paling besar lima puluh.")}>
                {"\u{2795}"} Kotak
              </button>
              <button type="button" className={`${tombol} ${goyangCls("-k")}`} disabled={k.kotak === 0} onClick={() => aksi("-k", kurangiKotak(k), "Tidak ada kotak penuh yang bisa diambil.")}>
                {"\u{2796}"} Kotak
              </button>
              <button type="button" className={`${tombol} ${goyangCls("+l")}`} onClick={() => aksi("+l", tambahLepas(k), k.lepas >= MAKS_LEPAS ? "Kue lepas sudah banyak. Kemas dulu jadi kotak." : "Meja sudah penuh. Bilangan paling besar lima puluh.")}>
                {"\u{2795}"} Kue lepas
              </button>
              <button type="button" className={`${tombol} ${goyangCls("-l")}`} disabled={k.lepas === 0} onClick={() => aksi("-l", kurangiLepas(k), "Tidak ada kue lepas yang bisa diambil.")}>
                {"\u{2796}"} Kue lepas
              </button>
              <button type="button" className={`${tombol} ${goyangCls("kemas")}`} onClick={() => aksi("kemas", kemasSepuluh(k), "Kue lepas belum sampai sepuluh. Tambah dulu sampai sepuluh, lalu kemas.")}>
                {"\u{1F4E6}"} Kemas sepuluh
              </button>
              <button type="button" className={`${tombol} ${goyangCls("buka")}`} onClick={() => aksi("buka", bukaKotak(k), "Buka kotak hanya bila ada kotak penuh dan kue lepas masih kurang dari sepuluh.")}>
                {"\u{1F4E4}"} Buka kotak
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-xs font-black text-[#FEF3C7]">Pesanan contoh:</span>
              {CONTOH_PESANAN.map((c) => (
                <button key={c} type="button" className={tombol} onClick={() => ubah(aturPesanan(k, c), kalimatKasir(aturPesanan(k, c)))}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {k.mode === "tabel" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Tabel Puluhan dan Satuan</p>
            <table className="mx-auto w-full max-w-[18rem] border-collapse text-sm font-black text-[#1C01A5]">
              <thead>
                <tr>
                  <th className="border-2 border-[#1C01A5] bg-[#BFDBFE] px-1 py-1">Puluhan</th>
                  <th className="border-2 border-[#1C01A5] bg-[#FBCFE8] px-1 py-1">Satuan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-[#1C01A5] px-1 py-2 text-3xl">{k.kotak}</td>
                  <td className="border-2 border-[#1C01A5] px-1 py-2 text-3xl">{k.lepas}</td>
                </tr>
              </tbody>
            </table>
            {n === 0 ? <p className="text-xs font-bold text-[#1C01A5]/70">Susun pesanan di meja dulu.</p> : null}
            {k.lepas >= 10 ? <p className="text-xs font-black text-[#B45309]">Satuannya sepuluh atau lebih. Kemas dulu jadi kotak di alat Meja.</p> : null}
            {n > 0 && k.lepas < 10 ? (
              <p className="text-sm font-black text-[#15803D]">
                Bilangannya {n}
                {k.lepas === 0 && k.kotak > 0 ? ". Angka nol di satuan artinya tidak ada kue lepas." : "."}
              </p>
            ) : null}
          </div>
        ) : null}

        {k.mode === "kartu" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Dua kartu angka. Ketuk kartu untuk mengganti angkanya.</p>
            <div className="flex items-end justify-center gap-3">
              {(["puluhan", "satuan"] as Kolom[]).map((kol) => (
                <div key={kol} className="text-center">
                  <p className="text-xs font-black text-[#1C01A5]">{kol === "puluhan" ? "Puluhan" : "Satuan"}</p>
                  <button
                    type="button"
                    aria-label={`kartu ${kol}`}
                    onClick={() => ubah(ubahKartu(k, kol), `Kartu ${kol} jadi ${kata(kol === "puluhan" ? ubahKartu(k, kol).kartuP : ubahKartu(k, kol).kartuS)}.`)}
                    className={`h-20 w-16 rounded-xl border-4 text-5xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] ${kol === "puluhan" ? "border-[#1D4ED8] bg-[#DBEAFE]" : "border-[#BE185D] bg-[#FCE7F3]"}`}
                  >
                    {kol === "puluhan" ? k.kartuP : k.kartuS}
                  </button>
                </div>
              ))}
            </div>
            <p className="text-lg font-black text-[#1C01A5]">Bilangannya {bilanganKartu(k)}</p>
            <button type="button" className={`${tombol} ${goyangCls("tukar")}`} onClick={() => aksi("tukar", baruTukar, "Kalau ditukar, bilangannya lebih dari lima puluh. Ganti angka kartunya dulu.")}>
              {"\u{1F504}"} Tukar kartu
            </button>
            {k.tukarTuntas > 0 ? <p className="text-xs font-bold text-[#15803D]">Angkanya sama, letaknya beda, jadi artinya beda.</p> : null}
          </div>
        ) : null}

        {k.mode === "uraian" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Bentuk Panjang</p>
            {n === 0 ? (
              <p className="text-xs font-bold text-[#1C01A5]/70">Susun pesanan di meja dulu.</p>
            ) : k.lepas >= 10 ? (
              <p className="text-xs font-black text-[#B45309]">Kemas dulu sepuluh kue lepas jadi satu kotak. Bentuk panjang yang ringkas punya satuan kurang dari sepuluh.</p>
            ) : (
              <>
                <p className="rounded-xl border-4 border-[#15803D] bg-[#F0FDF4] px-2 py-2 text-2xl font-black text-[#14532D]">
                  {n} = {cara.ringkas[0]} + {cara.ringkas[1]}
                </p>
                <p className="text-xs font-black text-[#15803D]">Cara paling ringkas: satuannya kurang dari sepuluh.</p>
                {cara.lain ? (
                  <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-2 py-1 text-base font-black text-[#92400E]">
                    {n} = {cara.lain[0]} + {cara.lain[1]} <span className="text-xs">(benar, tetapi belum ringkas)</span>
                  </p>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        <button type="button" className={tombol} onClick={() => ubah(awalKasir(), "Meja kasir dirapikan. Main lagi dari awal.")}>
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatKasir(k)}
      </p>
    </div>
  );
}
