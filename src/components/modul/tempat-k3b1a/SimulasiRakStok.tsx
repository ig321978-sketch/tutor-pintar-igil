"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalStok,
  digit,
  kalimatBaca,
  kalimatPapan,
  kalimatTuang,
  kalimatTukar,
  kalimatTulis,
  kata,
  kosongkanTuang,
  mulaiLagiStok,
  periksaBaca,
  periksaPapan,
  periksaTulis,
  petunjukBaca,
  petunjukPapan,
  petunjukTulis,
  pilihanBaca,
  pilihBarang,
  pilihBaca,
  pilihModeStok,
  satuanBarang,
  tambahButir,
  tambahBungkus,
  tambahDus,
  targetBaca,
  targetPapan,
  targetTulis,
  ubahPapan,
  ubahTulis,
  type HasilTuang,
  type KeadaanStok,
  type ModeStok,
} from "./logika";
import { BARANG_STOK, MISI_STOK_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab A: Rak Stok (Misi Rak Stok). Benda stok (kaleng, sabun, kecap) dan bilangan sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Tuang (tuang benda lepas, sepuluh jadi satu otomatis, papan tiga tempat ikut berubah), Papan (atur papan tiga tempat agar sama dengan benda di rak), Baca (pilih cara membaca bilangan di papan)
 * dan Tulis (tulis angka dari kata bilangan dengan nol penjaga tempat).
 */
const MODE: { id: ModeStok; nama: string; ikon: string }[] = [
  { id: "tuang", nama: "Tuang", ikon: "\u{1F9FA}" },
  { id: "papan", nama: "Papan", ikon: "\u{1F5C2}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F5E3}" },
  { id: "tulis", nama: "Tulis", ikon: "\u{270D}" },
];
const WARNA = ["#16A34A", "#2563EB", "#DC2626"] as const;
const MUDA = ["#DCFCE7", "#DBEAFE", "#FEE2E2"] as const;
const NAMA = ["ratusan", "puluhan", "satuan"] as const;
const EMOJI_DUS = "\u{1F5C3}";
const EMOJI_PAK = "\u{1F4E6}";

/** Papan tiga tempat: kepala kolom berwarna, angka besar, dan (bila ada) benda di tiap kolom. */
function PapanTiga({ angka, benda, tanpaAngka }: { angka?: number[]; benda?: [React.ReactNode, React.ReactNode, React.ReactNode]; tanpaAngka?: boolean }) {
  return (
    <div className="mx-auto grid w-full max-w-[420px] grid-cols-3 gap-1 rounded-xl border-4 border-[#78350F] bg-[#FEF3C7] p-1" aria-label="Papan tiga tempat">
      {[0, 1, 2].map((c) => (
        <div key={c} className="overflow-hidden rounded-lg border-2" style={{ borderColor: WARNA[c], background: MUDA[c] }}>
          <p className="py-0.5 text-center text-[11px] font-black text-white" style={{ background: WARNA[c] }}>
            {NAMA[c]}
          </p>
          <div className="flex min-h-[64px] flex-wrap content-start justify-center gap-0.5 px-1 py-1 text-xl" aria-hidden="true">
            {benda ? benda[c] : null}
          </div>
          {tanpaAngka ? null : (
            <p className="py-0.5 text-center text-3xl font-black" style={{ color: WARNA[c] }}>
              {angka?.[c]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
const ulang = (n: number, e: string): React.ReactNode => Array.from({ length: n }, (_, i) => <span key={i}>{e}</span>);

export default function SimulasiRakStok({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanStok) => void }) {
  const [k, setK] = useState<KeadaanStok>(() => awalStok());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanStok, ucap?: string) => {
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
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-sm font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;
  const langkahAngka = "min-h-[44px] min-w-[44px] rounded-lg border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5]";

  const barang = BARANG_STOK[k.barang];
  const [a, b, c] = satuanBarang(k);

  const ganti = (m: ModeStok) => {
    ubah(
      pilihModeStok(k, m),
      m === "tuang"
        ? "Tuang barang ke rak. Sepuluh jadi satu, tempatnya naik."
        : m === "papan"
          ? "Hitung benda di tiap rak, lalu atur angka di papan tiga tempat."
          : m === "baca"
            ? "Baca bilangan di papan dari kiri, lalu pilih cara membacanya."
            : "Baca kata bilangannya, lalu tulis angkanya di papan.",
    );
  };
  const tuang = (r: HasilTuang, penuhPesan: string) => {
    if (!r.ok) return salah(penuhPesan);
    ubah(r.k, r.tukar ? kalimatTukar(r.tukar, r.k) : kalimatTuang(r.k));
  };
  const periksaPapanKu = () => {
    const r = periksaPapan(k);
    if (r.ok) return ubah(r.k, `Betul! Papan membaca ${kata(targetPapan(k))}.`);
    ubah(r.k);
    salah(petunjukPapan(k));
  };
  const ubahPapanKu = (t: number, arah: 1 | -1) => {
    const r = ubahPapan(k, t, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");
    ubah(r.k);
  };
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(targetBaca(k))}.`);
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  const ubahTulisKu = (t: number, arah: 1 | -1) => {
    const r = ubahTulis(k, t, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");
    ubah(r.k);
  };
  const periksaTulisKu = () => {
    const r = periksaTulis(k);
    if (r.ok) return ubah(r.k, `Betul! Ditulis dengan tiga angka, yaitu ${kata(targetTulis(k))}.`);
    ubah(r.k);
    salah(petunjukTulis(k));
  };

  const tp = targetPapan(k);
  const tb = targetBaca(k);
  const tt = targetTulis(k);
  const stepper = (onUbah: (t: number, arah: 1 | -1) => void) => (
    <div className="mx-auto grid w-full max-w-[420px] grid-cols-3 gap-1" role="group" aria-label="Atur angka tiap tempat">
      {[0, 1, 2].map((t) => (
        <div key={t} className="flex flex-col items-center gap-1">
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, 1)} aria-label={`Tambah angka ${NAMA[t]}`}>
            {"\u{2795}"}
          </button>
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, -1)} aria-label={`Kurangi angka ${NAMA[t]}`}>
            {"\u{2796}"}
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-3" data-uji="simulasi-rak-stok">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Rak Stok</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_STOK_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih barang stok">
        {BARANG_STOK.map((x, i) => (
          <button key={x.id} type="button" onClick={() => ubah(pilihBarang(k, i), `Barang stok sekarang ${x.nama}.`)} aria-pressed={k.barang === i} className={saklar(k.barang === i)}>
            <span aria-hidden="true">{x.emoji}</span> {x.nama}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tuang" ? (
          <div className="space-y-2">
            <PapanTiga angka={[k.dus, k.bungkus, k.butir]} benda={[ulang(k.dus, EMOJI_DUS), ulang(k.bungkus, EMOJI_PAK), ulang(k.butir, barang.emoji)]} />
            <p className="text-center text-xs font-bold text-[#7C2D12]">
              {a} lepas, satu {b} berisi sepuluh {a}, satu {c} berisi sepuluh {b}.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => tuang(tambahButir(k), "Rak sudah penuh. Kosongkan dulu.")}>
                {"\u{2795}"} {a}
              </button>
              <button type="button" className={tombol} onClick={() => tuang(tambahBungkus(k), "Rak sudah penuh. Kosongkan dulu.")}>
                {"\u{2795}"} {b}
              </button>
              <button type="button" className={tombol} onClick={() => tuang(tambahDus(k), "Rak sudah penuh. Kosongkan dulu.")}>
                {"\u{2795}"} {c}
              </button>
              <button type="button" className={tombol} onClick={() => ubah(kosongkanTuang(k), "Rak dikosongkan.")}>
                {"\u{1F5D1}"} Kosongkan
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "papan" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">Benda di rak (hitung dulu):</p>
            <PapanTiga tanpaAngka benda={[ulang(digit(tp, 0), EMOJI_DUS), ulang(digit(tp, 1), EMOJI_PAK), ulang(digit(tp, 2), barang.emoji)]} />
            <p className="text-center text-xs font-black text-[#1C01A5]">Papan tiga tempat milikmu:</p>
            <PapanTiga angka={k.papan} />
            {stepper(ubahPapanKu)}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPapanKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <PapanTiga angka={[digit(tb, 0), digit(tb, 1), digit(tb, 2)]} />
            <p className="text-center text-xs font-black text-[#1C01A5]">Bagaimana cara membaca bilangan di papan?</p>
            <div className="mx-auto grid max-w-[420px] gap-1.5" role="group" aria-label="Pilih cara membaca">
              {pilihanBaca(tb).map((p, i) => (
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

        {k.mode === "tulis" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#92400E] bg-[#FEF3C7] p-2 text-center">
              <p className="text-xs font-black text-[#7C2D12]">Tulis angkanya:</p>
              <p className="text-xl font-black text-[#1C01A5]">{kata(tt)}</p>
            </div>
            <PapanTiga angka={k.tulis} />
            {stepper(ubahTulisKu)}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTulisKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiStok(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "tuang" ? kalimatTuang(k) : k.mode === "papan" ? kalimatPapan(k) : k.mode === "baca" ? kalimatBaca(k) : kalimatTulis(k))}
      </p>
    </div>
  );
}
