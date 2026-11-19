"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalPersediaan,
  bagikanBenda,
  banyakTerjual,
  bilDigit,
  catatPasangan,
  catatanCocok,
  jawabAwal,
  jawabKurang,
  kalimatAwal,
  kalimatBagikan,
  kalimatKurang,
  kalimatPasangan,
  kalimatPeriksa,
  kata,
  kembalikanBagikan,
  mulaiLagiPersediaan,
  periksaAwal,
  periksaBagikan,
  periksaKurang,
  periksaPeriksa,
  petunjukAwal,
  petunjukBagikan,
  petunjukKurang,
  petunjukPeriksa,
  pilihBarangPos,
  pilihModePersediaan,
  pilihPeriksa,
  satuanBarangPos,
  sisaBagikan,
  sisaPasangan,
  targetAwal,
  targetBagikan,
  targetKurang,
  targetPeriksa,
  ubahAwal,
  ubahKurang,
  ubahTerjual,
  type KeadaanPersediaan,
  type ModePersediaan,
} from "./logika";
import { AWAL_PASANGAN, BARANG_POS, MISI_PERSEDIAAN_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 3 Bab 2 Sub-Bab B: Pos Persediaan (Misi Pos Persediaan), simulasi penutup bab. Benda persediaan (kaleng sarden, senter, apel) dan bilangan sasaran berbeda dari Story.
 * Eksplorasi bebas tanpa skor, lima alat: Bagikan (ambil benda dari rak sampai sisa sesuai sasaran), Dikurangkan (awal dikurangi sisa), Awal (dikurangkan ditambah sisa),
 * Periksa (kurangkan lagi: cocok atau tidak cocok) dan Pasangan (banyak kemungkinan terjual dan sisa untuk seratus).
 */
const MODE: { id: ModePersediaan; nama: string; ikon: string }[] = [
  { id: "bagikan", nama: "Bagikan", ikon: "\u{1F9FA}" },
  { id: "kurang", nama: "Dikurangkan", ikon: "\u{2796}" },
  { id: "awal", nama: "Awal", ikon: "\u{2795}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{2705}" },
  { id: "pasangan", nama: "Pasangan", ikon: "\u{1F4AF}" },
];
const EMOJI_DUS = "\u{1F4E6}";

/** Kumpulan benda: krat berisi sepuluh dan benda lepas. */
function Tumpukan({ n, emoji, judul, warna }: { n: number; emoji: string; judul: string; warna: string }) {
  return (
    <div className="min-h-[84px] flex-1 rounded-xl border-4 bg-white/90 p-1" style={{ borderColor: warna }}>
      <p className="text-center text-[11px] font-black" style={{ color: warna }}>
        {judul}: {n}
      </p>
      <div className="flex flex-wrap content-start justify-center gap-0.5 text-lg" aria-hidden="true">
        {Array.from({ length: Math.floor(n / 10) }, (_, i) => (
          <span key={`d${i}`}>{EMOJI_DUS}</span>
        ))}
        {Array.from({ length: n % 10 }, (_, i) => (
          <span key={`s${i}`} className="text-base">
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
/** Bagan batang: batang atas bilangan awal, dua batang bawah dua bagian. */
function Bagan({ atas, kiri, kanan, nama }: { atas: string; kiri: string; kanan: string; nama: [string, string] }) {
  return (
    <div className="mx-auto w-full max-w-[420px] space-y-1" aria-label="Bagan batang">
      <div className="rounded-lg border-2 border-[#1C01A5] bg-[#2563EB] py-1 text-center text-base font-black text-white">{atas}</div>
      <div className="grid grid-cols-2 gap-1">
        <div className="rounded-lg border-2 border-[#1C01A5] bg-[#DC2626] py-1 text-center text-base font-black text-white">{kiri}</div>
        <div className="rounded-lg border-2 border-[#1C01A5] bg-[#16A34A] py-1 text-center text-base font-black text-white">{kanan}</div>
      </div>
      <div className="grid grid-cols-2 gap-1 text-center text-[11px] font-black">
        <span className="text-[#B91C1C]">{nama[0]}</span>
        <span className="text-[#15803D]">{nama[1]}</span>
      </div>
    </div>
  );
}

export default function SimulasiPosPersediaan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPersediaan) => void }) {
  const [k, setK] = useState<KeadaanPersediaan>(() => awalPersediaan());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPersediaan, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#166534] bg-[#166534] text-white" : "border-[#166534] bg-white text-[#166534]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] flex-1 rounded-xl border-4 px-2 py-1 text-center text-sm font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#86EFAC] bg-white"}`;
  const langkahAngka = "min-h-[44px] min-w-[44px] rounded-lg border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5]";

  const barang = BARANG_POS[k.barang];
  const [a, b] = satuanBarangPos(k);

  const ganti = (m: ModePersediaan) => {
    ubah(
      pilihModePersediaan(k, m),
      m === "bagikan"
        ? "Bagikan benda dari rak sampai sisanya sesuai. Lihat kalimat pengurangannya."
        : m === "kurang"
          ? "Cari bilangan yang dikurangkan dengan awal dikurangi sisa."
          : m === "awal"
            ? "Cari bilangan awal dengan menambah yang dikurangkan dan sisa."
            : m === "periksa"
              ? "Kurangkan lagi, lalu pilih cocok atau tidak cocok."
              : "Cari pasangan terjual dan sisa untuk seratus.",
    );
  };
  const bagikan = (n: number) => {
    const r = bagikanBenda(k, n);
    if (!r.ok) return salah("Isi rak tidak cukup untuk dibagikan sebanyak itu.");
    ubah(r.k);
  };
  const periksaBagikanKu = () => {
    const r = periksaBagikan(k);
    if (r.ok) return ubah(r.k, `Betul! Sisanya ${kata(targetBagikan(k).sisa)}.`);
    ubah(r.k);
    salah(petunjukBagikan(k));
  };
  const periksaKurangKu = () => {
    const r = periksaKurang(k);
    if (r.ok) return ubah(r.k, `Betul! Bilangan yang dikurangkan adalah ${kata(jawabKurang(k))}.`);
    ubah(r.k);
    salah(petunjukKurang(k));
  };
  const periksaAwalKu = () => {
    const r = periksaAwal(k);
    if (r.ok) return ubah(r.k, `Betul! Bilangan awalnya ${kata(jawabAwal(k))}.`);
    ubah(r.k);
    salah(petunjukAwal(k));
  };
  const periksaPeriksaKu = () => {
    const r = periksaPeriksa(k);
    if (r.ok) return ubah(r.k, catatanCocok(k) ? "Betul! Hasilnya cocok dengan sisa." : "Betul! Hasilnya tidak cocok dengan sisa yang dicatat.");
    ubah(r.k);
    salah(petunjukPeriksa(k));
  };
  const catat = () => {
    const r = catatPasangan(k);
    if (!r.ok) return salah(r.alasan === "kembar" ? "Pasangan itu sudah dicatat. Cari pasangan yang lain." : "Atur dulu banyak yang terjual, paling sedikit satu.");
    ubah(r.k, `Dicatat: ${kata(banyakTerjual(k))} terjual dan ${kata(sisaPasangan(k))} tersisa.`);
  };
  const stepper = (onUbah: (t: number, arah: 1 | -1) => void) => (
    <div className="mx-auto grid w-full max-w-[420px] grid-cols-2 gap-1" role="group" aria-label="Atur angka tiap tempat">
      {["puluhan", "satuan"].map((nama, t) => (
        <div key={nama} className="flex flex-col items-center gap-1">
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, 1)} aria-label={`Tambah angka ${nama}`}>
            {"\u{2795}"}
          </button>
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, -1)} aria-label={`Kurangi angka ${nama}`}>
            {"\u{2796}"}
          </button>
          <span className="text-[11px] font-black text-[#166534]">{nama}</span>
        </div>
      ))}
    </div>
  );
  const kotakAngka = (d: readonly number[], warna: string) => (
    <div className="mx-auto flex max-w-[420px] justify-center gap-2" aria-label="Angka yang diatur">
      {d.map((x, i) => (
        <span key={i} className="flex h-14 w-12 items-center justify-center rounded-xl border-4 bg-white text-3xl font-black" style={{ borderColor: warna, color: warna }}>
          {x}
        </span>
      ))}
    </div>
  );

  const tb = targetBagikan(k);
  const tk = targetKurang(k);
  const ta = targetAwal(k);
  const tp = targetPeriksa(k);
  const terjual = banyakTerjual(k);
  const bagian = (n: number) => (n === 0 ? "…" : String(n));

  return (
    <div className="space-y-3" data-uji="simulasi-pos-persediaan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#166534] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Pos Persediaan</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_PERSEDIAAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih benda persediaan">
        {BARANG_POS.map((x, i) => (
          <button key={x.id} type="button" onClick={() => ubah(pilihBarangPos(k, i), `Benda persediaan sekarang ${x.nama}.`)} aria-pressed={k.barang === i} className={saklar(k.barang === i)}>
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
        {k.mode === "bagikan" ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Tumpukan n={sisaBagikan(k)} emoji={barang.emoji} judul="Sisa di rak" warna="#16A34A" />
              <Tumpukan n={k.dibagikan} emoji={barang.emoji} judul="Dibagikan" warna="#DC2626" />
            </div>
            <p className="text-center text-xl font-black text-[#1C01A5]">
              {tb.awal} {"−"} {k.dibagikan} = {sisaBagikan(k)}
            </p>
            <p className="text-center text-xs font-black text-[#14532D]">
              Sasaran sisa: {tb.sisa}. Satu {b} berisi sepuluh {a}.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => bagikan(1)}>
                {"\u{2796}"} 1 {a}
              </button>
              <button type="button" className={tombol} onClick={() => bagikan(10)}>
                {"\u{2796}"} 1 {b}
              </button>
              <button type="button" className={tombol} onClick={() => ubah(kembalikanBagikan(k), "Benda dikembalikan ke rak.")}>
                {"\u{21A9}"} Kembalikan
              </button>
              <button type="button" className={tombol} onClick={periksaBagikanKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kurang" ? (
          <div className="space-y-2">
            <Bagan atas={String(tk.awal)} kiri={bilDigit(k.kurang) === 0 ? "?" : String(bilDigit(k.kurang))} kanan={String(tk.sisa)} nama={["dikurangkan", "sisa"]} />
            <p className="text-center text-xl font-black text-[#1C01A5]">
              {tk.awal} {"−"} {bagian(bilDigit(k.kurang))} = {tk.sisa}
            </p>
            <p className="text-center text-xs font-black text-[#14532D]">Atur bilangan yang dikurangkan:</p>
            {kotakAngka(k.kurang, "#DC2626")}
            {stepper((t, arah) => {
              const r = ubahKurang(k, t, arah);
              if (!r.ok) return salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");
              ubah(r.k);
            })}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKurangKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "awal" ? (
          <div className="space-y-2">
            <Bagan atas={bilDigit(k.awal) === 0 ? "?" : String(bilDigit(k.awal))} kiri={String(ta.kurang)} kanan={String(ta.sisa)} nama={["dikurangkan", "sisa"]} />
            <p className="text-center text-xl font-black text-[#1C01A5]">
              {bagian(bilDigit(k.awal))} {"−"} {ta.kurang} = {ta.sisa}
            </p>
            <p className="text-center text-xs font-black text-[#14532D]">Atur bilangan awal:</p>
            {kotakAngka(k.awal, "#2563EB")}
            {stepper((t, arah) => {
              const r = ubahAwal(k, t, arah);
              if (!r.ok) return salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");
              ubah(r.k);
            })}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaAwalKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "periksa" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#166534] bg-white p-2 text-center">
              <p className="text-xs font-black text-[#14532D]">Catatan pos:</p>
              <p className="text-xl font-black text-[#1C01A5]">
                {tp.awal} {"−"} {tp.kurang} = {tp.sisa}
              </p>
              <p className="text-xs font-bold text-[#14532D]/80">Kurangkan lagi: {tp.awal} dikurangi {tp.kurang}. Samakah hasilnya dengan sisa yang dicatat?</p>
            </div>
            <div className="mx-auto flex max-w-[420px] gap-2" role="group" aria-label="Pilih hasil pemeriksaan">
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

        {k.mode === "pasangan" ? (
          <div className="space-y-2">
            <Bagan atas={String(AWAL_PASANGAN)} kiri={terjual === 0 ? "?" : String(terjual)} kanan={terjual === 0 ? "?" : String(sisaPasangan(k))} nama={["terjual", "sisa"]} />
            <div className="flex gap-2">
              <Tumpukan n={terjual} emoji={barang.emoji} judul="Terjual" warna="#DC2626" />
              <Tumpukan n={terjual === 0 ? 0 : sisaPasangan(k)} emoji={barang.emoji} judul="Sisa" warna="#16A34A" />
            </div>
            {kotakAngka(k.terjual, "#DC2626")}
            {stepper((t, arah) => {
              const r = ubahTerjual(k, t, arah);
              if (!r.ok) return salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");
              ubah(r.k);
            })}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={catat}>
                {"\u{1F4DD}"} Catat pasangan
              </button>
            </div>
            <ul className="flex flex-wrap justify-center gap-1" aria-label="Pasangan yang dicatat">
              {k.pasangan.map((n) => (
                <li key={n} className="rounded-full border-2 border-[#166534] bg-[#DCFCE7] px-2 py-0.5 text-[11px] font-black text-[#14532D]">
                  {n} + {AWAL_PASANGAN - n} = {AWAL_PASANGAN}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPersediaan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "bagikan" ? kalimatBagikan(k) : k.mode === "kurang" ? kalimatKurang(k) : k.mode === "awal" ? kalimatAwal(k) : k.mode === "periksa" ? kalimatPeriksa(k) : kalimatPasangan(k))}
      </p>
    </div>
  );
}
