"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  aturRibu,
  awalKelapa,
  bilanganSusun,
  caraLain,
  cekBagan,
  hurufBesar,
  jumlahIsi,
  kalimatBagan,
  kalimatLain,
  kalimatPecah,
  kalimatSusun,
  kata,
  kurangKeranjang,
  maksRibu,
  mulaiLagiKelapa,
  periksaBagan,
  periksaPecah,
  periksaSusun,
  petunjukBagan,
  petunjukLain,
  petunjukPecah,
  petunjukSusun,
  petunjukTolak,
  pilihanBagan,
  pilihanSusun,
  pilihBagan,
  pilihModeKelapa,
  pilihSusun,
  simpanCara,
  sisaBagianKu,
  tambahKeranjang,
  targetBagan,
  targetLain,
  targetPecah,
  targetSusun,
  type KeadaanKelapa,
  type ModeKelapa,
} from "./logika";
import { CARA_DIPERLUKAN, MISI_KELAPA_TEKS } from "./data-sim";
import { rb, URUT_TEMPAT } from "./logika-cpa";
import { BaganUtuh, Rak } from "./GambarKelapa";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab D: Kios Kelapa (Misi Kios). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Pecah (isi keranjang tiap tempat sampai jumlahnya sama dengan bilangan; alat menolak sepuluh keranjang di satu tempat), Susun (pilih bilangan yang tersusun dari keranjang, tempat kosong diisi nol),
 * Bagan (cari bagian yang hilang, Cek Bagan, lalu Periksa), dan Lain (simpan tiga cara berbeda menguraikan satu bilangan; alat menolak cara yang sama).
 */
const MODE: { id: ModeKelapa; nama: string; ikon: string }[] = [
  { id: "pecah", nama: "Pecah", ikon: "\u{1F528}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F9F1}" },
  { id: "bagan", nama: "Bagan", ikon: "\u{1F4CA}" },
  { id: "lain", nama: "Cara lain", ikon: "\u{1F500}" },
];
const NAMA_KOLOM = ["ribuan", "ratusan", "puluhan", "satuan"];

export default function SimulasiKiosKelapa({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKelapa) => void }) {
  const [k, setK] = useState<KeadaanKelapa>(() => awalKelapa());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [hasilCek, setHasilCek] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanKelapa, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#C2410C] bg-[#C2410C] text-white" : "border-[#C2410C] bg-white text-[#C2410C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-1 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FDBA74] bg-white"}`;

  const ganti = (m: ModeKelapa) => {
    setHasilCek("");
    ubah(
      pilihModeKelapa(k, m),
      m === "pecah"
        ? "Isi keranjang di tiap tempat sampai jumlahnya sama dengan bilangan."
        : m === "susun"
          ? "Lihat keranjang di tiap tempat, lalu pilih bilangan yang tersusun."
          : m === "bagan"
            ? "Pilih bagian yang lain, lalu tekan Cek Bagan."
            : "Ubah ribuan bagian pertama, lalu simpan tiga cara yang berbeda.",
    );
  };

  /* ------------------------------ Pecah ------------------------------ */
  const tambah = (i: number) => {
    const r = tambahKeranjang(k, i);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukTolak());
    }
    ubah(r.k);
  };
  const kurang = (i: number) => {
    const r = kurangKeranjang(k, i);
    if (!r.ok) return salah("Tempat itu sudah kosong, tidak ada keranjang yang bisa diambil.");
    ubah(r.k);
  };
  const periksaPecahKu = () => {
    const r = periksaPecah(k);
    if (r.ok) return ubah(r.k, `Betul! Keranjang sudah pas untuk ${kata(targetPecah(k).n)}.`);
    ubah(r.k);
    salah(petunjukPecah(k));
  };
  /* ------------------------------ Susun ------------------------------ */
  const periksaSusunKu = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, `Betul! Keranjang itu tersusun menjadi ${kata(bilanganSusun(k))}.`);
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  /* ------------------------------ Bagan ------------------------------ */
  const cek = () => {
    const r = cekBagan(k);
    if (!r.ok) return salah(petunjukBagan(k));
    ubah(r.k);
    const t = targetBagan(k);
    const lain = pilihanBagan(k)[k.bagPilih];
    const pesan = r.cocok
      ? `${kata(t.bagian)} ditambah ${kata(lain)} sama dengan ${kata(r.hasil)}, sama dengan bilangan utuh. Bagiannya cocok.`
      : `${kata(t.bagian)} ditambah ${kata(lain)} sama dengan ${kata(r.hasil)}, belum sama dengan bilangan utuh. Hitung ulang bagiannya.`;
    setHasilCek(`${rb(t.bagian)} + ${rb(lain)} = ${rb(r.hasil)} ${r.cocok ? "(sama dengan utuh)" : "(belum sama dengan utuh)"}`);
    setCatatan(pesan);
    speakGuru(pesan);
  };
  const periksaBaganKu = () => {
    const r = periksaBagan(k);
    if (r.ok) {
      setHasilCek("");
      return ubah(r.k, `Betul! Bagian yang lain adalah ${kata(sisaBagianKu(k))}.`);
    }
    ubah(r.k);
    salah(petunjukBagan(k));
  };
  /* ------------------------------ Lain ------------------------------ */
  const atur = (d: -1 | 1) => {
    const r = aturRibu(k, d);
    if (!r.ok) return salah(d > 0 ? "Bagian pertama tidak boleh lebih besar dari bilangan." : "Bagian pertama paling sedikit satu ribu.");
    ubah(r.k);
  };
  const simpan = () => {
    const r = simpanCara(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukLain(k));
    }
    if (r.selesai) return ubah(r.k, `Betul! Tiga cara berbeda sudah tersimpan untuk ${kata(targetLain(k).n)}.`);
    ubah(r.k, `Cara itu tersimpan. Sudah ${kata(r.k.lainSimpan.length)} cara.`);
  };

  const tp = targetPecah(k);
  const ts = targetSusun(k);
  const tb = targetBagan(k);
  const tl = targetLain(k);
  const pilS = pilihanSusun(k);
  const pilB = pilihanBagan(k);

  return (
    <div className="space-y-3" data-uji="simulasi-kios-kelapa">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Kios Kelapa</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_KELAPA_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "pecah" ? (
          <div className="space-y-2">
            <Rak isi={k.isi} benda={tp.benda} judul={`pecah bilangan ${rb(tp.n)}: isi keranjang`} />
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5" role="group" aria-label="Keranjang tiap tempat">
              {URUT_TEMPAT.map((t, i) => (
                <div key={t} className="space-y-1 rounded-xl border-2 border-[#FDBA74] bg-white p-1 text-center">
                  <p className="text-[11px] font-black text-[#9A3412]">{NAMA_KOLOM[i]}</p>
                  <p className="text-xl font-black text-[#1C01A5]">{k.isi[i]}</p>
                  <div className="flex justify-center gap-1">
                    <button type="button" className={`${tombol} min-w-[40px] px-0`} onClick={() => kurang(i)} aria-label={`Ambil satu keranjang ${t}`}>
                      {"\u{2796}"}
                    </button>
                    <button type="button" className={`${tombol} min-w-[40px] px-0`} onClick={() => tambah(i)} aria-label={`Tambah satu keranjang ${t}`}>
                      {"\u{2795}"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-black text-[#7C2D12]">Jumlah keranjang sekarang: {rb(jumlahIsi(k))}</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPecahKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "susun" ? (
          <div className="space-y-2">
            <Rak isi={[...ts.isi]} benda={ts.benda} judul={`keranjang ${ts.benda}: susun jadi satu bilangan`} />
            <p className="text-center text-xs font-black text-[#1C01A5]">Bilangan mana yang tersusun?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bilangan">
              {pilS.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihSusun(k, i))} aria-pressed={k.susunPilih === i} className={pilihan(k.susunPilih === i)}>
                  {rb(p)}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSusunKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagan" ? (
          <div className="space-y-2">
            <BaganUtuh utuh={rb(tb.utuh)} bagian={rb(tb.bagian)} lain={k.bagPilih >= 0 ? rb(pilB[k.bagPilih]) : "?"} judul="bagan bagian utuh" />
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa bagian yang lain?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bagian yang lain">
              {pilB.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setHasilCek("");
                    ubah(pilihBagan(k, i));
                  }}
                  aria-pressed={k.bagPilih === i}
                  className={pilihan(k.bagPilih === i)}
                >
                  {rb(p)}
                </button>
              ))}
            </div>
            {hasilCek ? <p className="rounded-xl border-2 border-dashed border-[#C2410C] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">{hasilCek}</p> : null}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={cek}>
                {"\u{1F4CA}"} Cek Bagan
              </button>
              <button type="button" className={tombol} onClick={periksaBaganKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "lain" ? (
          <div className="space-y-2">
            <BaganUtuh utuh={rb(tl.n)} bagian={rb(k.lainA * 1000)} lain={rb(tl.n - k.lainA * 1000)} judul={`satu bilangan, banyak cara (${kata(maksRibu(k))} ribu paling banyak)`} />
            <div className="mx-auto flex max-w-[420px] items-center justify-center gap-2">
              <button type="button" className={tombol} onClick={() => atur(-1)} aria-label="Kurangi ribuan bagian pertama">
                {"\u{2796}"}
              </button>
              <p className="min-w-[150px] text-center text-lg font-black text-[#1C01A5]">{caraLain(k)}</p>
              <button type="button" className={tombol} onClick={() => atur(1)} aria-label="Tambah ribuan bagian pertama">
                {"\u{2795}"}
              </button>
            </div>
            <div className="mx-auto max-w-[420px] rounded-xl border-2 border-dashed border-[#C2410C] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]" aria-label="Cara yang sudah disimpan">
              {k.lainSimpan.length === 0 ? "Belum ada cara tersimpan" : k.lainSimpan.map((a) => caraLain(k, a)).join("  |  ")}
              <span className="block text-[11px]">
                {k.lainSimpan.length} dari {CARA_DIPERLUKAN} cara
              </span>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={simpan}>
                {"\u{1F4BE}"} Simpan cara
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasilCek("");
            ubah(mulaiLagiKelapa(), "Mulai lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "pecah" ? kalimatPecah(k) : k.mode === "susun" ? kalimatSusun(k) : k.mode === "bagan" ? kalimatBagan(k) : kalimatLain(k)))}
      </p>
    </div>
  );
}
