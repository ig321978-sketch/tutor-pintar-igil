"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalKayu,
  catatPasangan,
  geserKiri,
  jumlahTumpukan,
  kalimatBagan,
  kalimatIsi,
  kalimatPeriksa,
  kalimatRak,
  kalimatTambah,
  kalimatTukarKayu,
  kalimatTumpukan,
  kananRak,
  kata,
  mulaiLagiKayu,
  periksaBagan,
  periksaIsi,
  periksaPeriksa,
  periksaTambah,
  petunjukBagan,
  petunjukIsi,
  petunjukPeriksa,
  petunjukTambah,
  pilihanBagan,
  pilihanIsi,
  pilihBagan,
  pilihIsi,
  pilihModeKayu,
  pilihPeriksa,
  tambahBundel,
  tambahSatu,
  targetBagan,
  targetIsi,
  targetPeriksa,
  targetTambah,
  ulangiTambah,
  type HasilTambah,
  type KeadaanKayu,
  type ModeKayu,
} from "./logika";
import { JUMLAH_RAK, MISI_KAYU_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 3 Bab 2 Sub-Bab A: Tumpukan Kayu (Misi Kayu). Bilangan sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, lima alat:
 * Tambah (tambah batang kayu sampai sama dengan papan jumlah, sepuluh batang lepas ditukar otomatis jadi satu bundel), Bagan (pilih bagian yang belum diketahui pada bagan jumlah dan bagian),
 * Isi (isi titik-titik di depan atau di tengah dengan kartu bilangan), Periksa (jumlahkan, pilih cocok atau tidak cocok), dan Rak (catat pasangan bilangan untuk dua rak yang jumlahnya sama).
 */
const MODE: { id: ModeKayu; nama: string; ikon: string }[] = [
  { id: "tambah", nama: "Tambah", ikon: "\u{2795}" },
  { id: "bagan", nama: "Bagan", ikon: "\u{1F4CA}" },
  { id: "isi", nama: "Isi", ikon: "\u{270F}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{2705}" },
  { id: "rak", nama: "Rak", ikon: "\u{1F5C4}" },
];

/** Satu batang kayu (kotak cokelat) dan satu bundel sepuluh batang (kotak lebih besar dengan pita merah). */
const Batang = () => <span aria-hidden="true" className="inline-block h-2.5 w-6 rounded-sm border border-[#6B4423] bg-[#B7814A]" />;
const Bundel = () => (
  <span aria-hidden="true" className="relative inline-block h-6 w-9 rounded-sm border-2 border-[#6B4423] bg-[#D6A15E]">
    <span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-[#DC2626]" />
  </span>
);
const ulang = (n: number, f: (i: number) => React.ReactNode): React.ReactNode => Array.from({ length: n }, (_, i) => <React.Fragment key={i}>{f(i)}</React.Fragment>);

/** Papan angka kecil untuk kalimat Matematika: bilangan dan titik-titik. */
function Kalimat({ a, c, depan, isi }: { a: number; c: number; depan: boolean; isi?: number }) {
  const titik = isi !== undefined ? String(isi) : "\u{2026}";
  return (
    <p className="rounded-xl border-4 border-[#78350F] bg-[#FEF3C7] px-2 py-2 text-center text-3xl font-black text-[#1C01A5]" aria-label="Kalimat Matematika">
      {depan ? `${titik} + ${a} = ${c}` : `${a} + ${titik} = ${c}`}
    </p>
  );
}

export default function SimulasiTumpukanKayu({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKayu) => void }) {
  const [k, setK] = useState<KeadaanKayu>(() => awalKayu());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanKayu, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeKayu) => {
    ubah(
      pilihModeKayu(k, m),
      m === "tambah"
        ? "Tambah batang kayu sampai sama dengan papan jumlah."
        : m === "bagan"
          ? "Baca bagan, lalu pilih bagian yang belum diketahui."
          : m === "isi"
            ? "Isi titik-titik dengan kartu bilangan yang tepat."
            : m === "periksa"
              ? "Jumlahkan, lalu pilih cocok atau tidak cocok."
              : "Atur rak kiri, rak kanan ikut berubah, lalu catat pasangannya.",
    );
  };
  const tambah = (r: HasilTambah) => {
    if (!r.ok) return salah("Tumpukan sudah penuh sampai seratus batang. Tekan ulangi.");
    ubah(r.k, r.tukar ? kalimatTukarKayu() : kalimatTumpukan(r.k));
  };
  const periksaTambahKu = () => {
    const r = periksaTambah(k);
    if (r.ok) return ubah(r.k, `Betul! Tumpukan sama dengan papan jumlah, yaitu ${kata(targetTambah(k).c)}.`);
    ubah(r.k);
    salah(petunjukTambah(k));
  };
  const periksaBaganKu = () => {
    const r = periksaBagan(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(targetBagan(k).total)} dikurangi ${kata(targetBagan(k).bagian)} sama dengan ${kata(targetBagan(k).total - targetBagan(k).bagian)}.`);
    ubah(r.k);
    salah(petunjukBagan(k));
  };
  const periksaIsiKu = () => {
    const r = periksaIsi(k);
    if (r.ok) return ubah(r.k, `Betul! Titik-titik diisi ${kata(targetIsi(k).c - targetIsi(k).a)}.`);
    ubah(r.k);
    salah(petunjukIsi(k));
  };
  const periksaPeriksaKu = () => {
    const r = periksaPeriksa(k);
    if (r.ok) return ubah(r.k, "Betul! Pemeriksaannya tepat.");
    ubah(r.k);
    salah(petunjukPeriksa(k));
  };
  const geser = (d: number) => {
    const r = geserKiri(k, d);
    if (!r.ok) return salah("Rak kiri paling sedikit nol dan paling banyak seratus.");
    ubah(r.k);
  };
  const catat = () => {
    const r = catatPasangan(k);
    if (!r.ok) return salah(r.alasan === "sudah" ? "Pasangan itu sudah dicatat. Coba pasangan lain." : "Isi kedua rak dengan paling sedikit satu batang.");
    ubah(r.k, `Dicatat: ${kata(r.k.kiri)} tambah ${kata(kananRak(r.k))} sama dengan seratus.`);
  };

  const tt = targetTambah(k);
  const tb = targetBagan(k);
  const ti = targetIsi(k);
  const tp = targetPeriksa(k);
  const n = jumlahTumpukan(k);
  const pilBagan = pilihanBagan(k);
  const pilIsi = pilihanIsi(k);

  return (
    <div className="space-y-3" data-uji="simulasi-tumpukan-kayu">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Tumpukan Kayu</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_KAYU_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tambah" ? (
          <div className="space-y-2">
            <Kalimat a={tt.a} c={tt.c} depan={false} />
            <p className="rounded-xl border-4 border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">Papan jumlah: {tt.c} batang</p>
            <div className="mx-auto flex min-h-[72px] max-w-[420px] flex-wrap items-end gap-1 rounded-xl border-4 border-[#6B4423] bg-[#FDE7C2] p-2" aria-label="Tumpukan kayu">
              {ulang(k.bundel, () => (
                <Bundel />
              ))}
              {ulang(k.lepas, () => (
                <Batang />
              ))}
            </div>
            <p className="text-center text-xs font-bold text-[#7C2D12]">
              {k.bundel} bundel (sepuluh batang) dan {k.lepas} batang lepas = {n} batang
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => tambah(tambahSatu(k))}>
                {"\u{2795}"} 1 batang
              </button>
              <button type="button" className={tombol} onClick={() => tambah(tambahBundel(k))}>
                {"\u{2795}"} 1 bundel
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangiTambah(k), "Tumpukan kembali ke awal.")}>
                {"\u{1F504}"} Ulangi
              </button>
              <button type="button" className={tombol} onClick={periksaTambahKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagan" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#78350F] bg-[#FEF3C7] p-2" aria-label="Bagan jumlah dan bagian">
              <p className="rounded bg-[#F59E0B] py-1 text-center text-lg font-black text-white">jumlah semuanya: {tb.total}</p>
              <div className="flex gap-1">
                <p className="rounded bg-[#16A34A] py-1 text-center text-base font-black text-white" style={{ width: `${(tb.bagian / tb.total) * 100}%` }}>
                  {tb.bagian}
                </p>
                <p className="flex-1 rounded border-2 border-dashed border-[#D97706] bg-white py-1 text-center text-base font-black text-[#D97706]">?</p>
              </div>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa bagian yang belum diketahui?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bilangan">
              {pilBagan.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihBagan(k, i))} aria-pressed={k.baganPilih === i} className={pilihan(k.baganPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBaganKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "isi" ? (
          <div className="space-y-2">
            <Kalimat a={ti.a} c={ti.c} depan={ti.depan} isi={k.isiPilih >= 0 ? pilIsi[k.isiPilih] : undefined} />
            <p className="text-center text-xs font-black text-[#1C01A5]">{ti.depan ? "Titik-titik di depan." : "Titik-titik di tengah."} Pilih kartu bilangannya:</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih kartu bilangan">
              {pilIsi.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihIsi(k, i))} aria-pressed={k.isiPilih === i} className={pilihan(k.isiPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaIsiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "periksa" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-4 border-[#78350F] bg-[#FEF3C7] px-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
              {tp.a} + {tp.u} = ?
            </p>
            <p className="text-center text-sm font-black text-[#7C2D12]">Jumlah semuanya di papan: {tp.c}</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Cocok atau tidak cocok">
              {["cocok", "tidak cocok"].map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihPeriksa(k, i))} aria-pressed={k.periksaPilih === i} className={pilihan(k.periksaPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPeriksaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "rak" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-4 border-[#78350F] bg-[#FEF3C7] px-2 py-2 text-center text-2xl font-black text-[#1C01A5]">
              {k.kiri} + {kananRak(k)} = {JUMLAH_RAK}
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-2">
              <div className="rounded-xl border-4 border-[#6B4423] bg-[#FDE7C2] p-2 text-center">
                <p className="text-xs font-black text-[#7C2D12]">Rak kiri</p>
                <p className="text-3xl font-black text-[#15803D]">{k.kiri}</p>
              </div>
              <div className="rounded-xl border-4 border-[#6B4423] bg-[#FDE7C2] p-2 text-center">
                <p className="text-xs font-black text-[#7C2D12]">Rak kanan</p>
                <p className="text-3xl font-black text-[#B45309]">{kananRak(k)}</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Atur rak kiri">
              {[-10, -1, 1, 10].map((d) => (
                <button key={d} type="button" className={tombol} onClick={() => geser(d)} aria-label={`${d > 0 ? "Tambah" : "Kurangi"} rak kiri ${Math.abs(d)}`}>
                  {d > 0 ? `+${d}` : `\u{2212}${Math.abs(d)}`}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={catat}>
                {"\u{1F4DD}"} Catat pasangan
              </button>
            </div>
            {k.pasangan.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-1" aria-label="Pasangan yang dicatat">
                {k.pasangan.map((p) => (
                  <li key={p} className="rounded-full border-2 border-[#15803D] bg-[#F0FDF4] px-2 py-0.5 text-xs font-black text-[#14532D]">
                    {p} + {JUMLAH_RAK - p}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiKayu(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "tambah" ? kalimatTambah(k) : k.mode === "bagan" ? kalimatBagan(k) : k.mode === "isi" ? kalimatIsi(k) : k.mode === "periksa" ? kalimatPeriksa(k) : kalimatRak(k))}
      </p>
    </div>
  );
}
