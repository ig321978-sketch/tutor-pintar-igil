"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  angkaDibawa,
  awalHitung,
  bagianKali,
  bawahKurang,
  hasilBenarKurang,
  hasilKaliSim,
  kalimatBagi,
  kalimatJumlah,
  kalimatKali,
  kalimatKurang,
  kurangkanKolom,
  langkahBagi,
  mulaiLagiHitung,
  periksaKali,
  periksaKolomBagi,
  periksaKolomJumlah,
  petunjukBagi,
  petunjukJumlah,
  petunjukKali,
  pilKali,
  pilihKali,
  pilihModeHitung,
  pinjamKolom,
  pisahkan,
  simpananMasuk,
  susunTargetJumlah,
  targetBagi,
  targetJumlah,
  targetKali,
  targetKurang,
  ubahSimpan,
  ubahTulis,
  ubahTulisBagi,
  type KeadaanHitung,
  type ModeHitung,
} from "./logika";
import { PapanKolom, type BarisTampil } from "./GambarHitung";
import { MISI_HITUNG_TEKS } from "./data-sim";
import { ucapkan } from "./logika-cpa";
import { NAMA_KOLOM, angkaSemua, fmt } from "./logika-data";

/**
 * Simulasi Kelas 5 Bab 1 Sub-Bab D: Susun Hitung (penutup bab, tema Hari Pertandingan di Stadion Kota). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Jumlah (jumlah bersusun kolom demi kolom; alat menolak satu kolom diisi sepuluh atau lebih), Kurang (kurang bersusun; alat menolak mengurangkan sebelum meminjam dan menolak meminjam yang tidak perlu),
 * Kali (pisah pengali lalu pilih hasil; alat menolak Periksa sebelum dipisah), dan Bagi (bagi per kolom dari kiri; alat menolak angka sepuluh pada satu kolom hasil).
 * Semua papan digambar dari data. Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeHitung; nama: string; ikon: string }[] = [
  { id: "jumlah", nama: "Jumlah", ikon: "\u{2795}" },
  { id: "kurang", nama: "Kurang", ikon: "\u{2796}" },
  { id: "kali", nama: "Kali", ikon: "\u{2716}" },
  { id: "bagi", nama: "Bagi", ikon: "\u{2797}" },
];

export default function SimulasiSusunHitung({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanHitung) => void }) {
  const [k, setK] = useState<KeadaanHitung>(() => awalHitung());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap perubahan keadaan mengosongkan pesan lama; pesan baru hanya bila diberikan. Suara mengeja bilangan. */
  const ubah = (baru: KeadaanHitung, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ucapkan(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucapkan(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-2 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-1 py-2 text-center text-sm font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeHitung) => {
    ubah(
      pilihModeHitung(k, m),
      m === "jumlah"
        ? "Jumlahkan kolom demi kolom dari kanan: atur angka yang ditulis dan yang disimpan."
        : m === "kurang"
          ? "Kurangkan kolom demi kolom dari kanan, dan pinjam bila angka atas lebih kecil."
          : m === "kali"
            ? "Pisah pengali dulu, lalu pilih hasil kalinya."
            : "Bagi per kolom dari kiri: atur angka hasil tiap kolom.",
    );
  };

  /* ------------------------------ Jumlah ------------------------------ */
  const tj = targetJumlah(k);
  const sj = susunTargetJumlah(k);
  const belJ = (x: number): string | null => (x < k.kolJ ? String(sj.kolom[x].tulis) : x === k.kolJ ? "?" : null);
  const barisJumlah: BarisTampil[] = [
    { label: "simpan", angka: null, tanda: "", kecil: true, sel: [0, 1, 2, 3, 4].map((x) => (x >= 1 && x <= k.kolJ && sj.kolom[x].masuk > 0 ? String(sj.kolom[x].masuk) : null)) },
    { label: tj.nama[0], angka: tj.a, tanda: "" },
    { label: tj.nama[1], angka: tj.b, tanda: "+" },
    { label: "Jumlah", angka: null, tanda: "", garisAtas: true, sel: [0, 1, 2, 3, 4].map(belJ) },
  ];
  const tulisNaik = (arah: 1 | -1) => {
    const r = ubahTulis(k, arah);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Satu kolom hanya memuat satu angka, jadi kelebihannya disimpan ke kolom kiri.");
  };
  const periksaJ = () => {
    const r = periksaKolomJumlah(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukJumlah());
    }
    const c = sj.kolom[k.kolJ];
    if (r.selesai) return ubah(r.k, `Betul! Jumlahnya ${fmt(sj.hasil)} ${tj.satuan}.`);
    ubah(r.k, `Betul! Kolom ${NAMA_KOLOM[c.k]} ditulis ${c.tulis}${c.simpan ? ` dan ${c.simpan} disimpan` : ""}.`);
  };

  /* ------------------------------ Kurang ------------------------------ */
  const tr = targetKurang(k);
  const asli = angkaSemua(tr.a);
  const barisKurang: BarisTampil[] = [
    { label: tr.nama[0], angka: null, tanda: "", sel: k.atasK.map((x) => String(x)), tandai: [0, 1, 2, 3, 4].filter((x) => k.atasK[x] !== asli[x]) },
    { label: tr.nama[1], angka: tr.b, tanda: "−" },
    { label: "Selisih", angka: null, tanda: "", garisAtas: true, sel: [0, 1, 2, 3, 4].map((x) => (x < k.hasilK.length ? String(k.hasilK[x]) : x === k.kolK ? "?" : null)) },
  ];
  const pinjamTekan = () => {
    const r = pinjamKolom(k);
    if (r.ok) return ubah(r.k, `Meminjam dari kolom ${NAMA_KOLOM[r.sumber]}${r.sumber - k.kolK > 1 ? ", dan kolom nol di antaranya menjadi sembilan" : ""}.`);
    if (r.k !== k) ubah(r.k, "Alat menolak. Kolom ini tidak perlu meminjam, karena angka atas sudah cukup.");
  };
  const kurangTekan = () => {
    const r = kurangkanKolom(k);
    if (!r.ok) return ubah(r.k, "Alat menolak. Angka atas lebih kecil dari angka bawah, jadi pinjam dulu dari kolom kiri.");
    if (r.selesai) return ubah(r.k, `Betul! Selisihnya ${fmt(hasilBenarKurang(k))} ${tr.satuan}.`);
    ubah(r.k, `Betul! Kolom ${NAMA_KOLOM[k.kolK]} ditulis ${k.atasK[k.kolK] - bawahKurang(k)}.`);
  };

  /* ------------------------------ Kali ------------------------------ */
  const tk = targetKali(k);
  const bg = bagianKali(k);
  const barisKali: BarisTampil[] = [
    { label: tk.nama[0], angka: tk.a, tanda: "" },
    { label: tk.nama[1], angka: tk.b, tanda: "×" },
    { label: "Hasil", angka: null, tanda: "", garisAtas: true },
  ];
  const periksaK = () => {
    const r = periksaKali(k);
    if (r.ok) return ubah(r.k, `Betul! ${bg.map((p) => `${p} × ${fmt(tk.a)} = ${fmt(p * tk.a)}`).join(" dan ")}, jumlahnya ${fmt(hasilKaliSim(k))} ${tk.satuan}.`);
    if (r.ditolak) return ubah(r.k, "Alat menolak. Pengali belum dipisah, jadi tekan Pisah dulu sebelum memeriksa.");
    ubah(r.k);
    salah(petunjukKali(k));
  };

  /* ------------------------------ Bagi ------------------------------ */
  const tb = targetBagi(k);
  const lb = langkahBagi(k);
  const belB = (x: number): string | null => {
    const j = 4 - x;
    return j < k.langkahB ? String(lb.langkah[j].q) : j === k.langkahB ? "?" : null;
  };
  const barisBagi: BarisTampil[] = [
    { label: tb.nama[0], angka: tb.a, tanda: "" },
    { label: tb.nama[1], angka: tb.b, tanda: ":" },
    { label: "Hasil", angka: null, tanda: "", garisAtas: true, sel: [0, 1, 2, 3, 4].map(belB) },
  ];
  const tulisBagiNaik = (arah: 1 | -1) => {
    const r = ubahTulisBagi(k, arah);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Satu kolom hasil hanya memuat satu angka, jadi angka sepuluh tidak boleh ditulis.");
  };
  const periksaB = () => {
    const r = periksaKolomBagi(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukBagi());
    }
    const l = lb.langkah[k.langkahB];
    if (r.selesai) return ubah(r.k, `Betul! ${fmt(tb.a)} : ${tb.b} = ${fmt(lb.hasil)}. Cek: ${fmt(lb.hasil)} × ${tb.b} = ${fmt(tb.a)}.`);
    ubah(r.k, `Betul! ${l.angka} : ${tb.b} = ${l.q}${l.sisa ? `, sisa ${l.sisa} ditukar menjadi sepuluh di kolom kanan` : ""}.`);
  };

  return (
    <div className="space-y-2" data-uji="simulasi-susun-hitung">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Susun Hitung</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_HITUNG_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "jumlah" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">
              Jumlahkan {fmt(tj.a)} dan {fmt(tj.b)} {tj.satuan}. Kolom {NAMA_KOLOM[k.kolJ]}
              {simpananMasuk(k) > 0 ? `, ada simpanan ${simpananMasuk(k)}` : ""}.
            </p>
            <PapanKolom rupa="diagram" baris={barisJumlah} sorot={[k.kolJ]} />
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-2">
              <div className="rounded-xl border-2 border-[#FCD34D] bg-white px-1.5 py-1.5">
                <p className="mb-1 text-center text-xs font-black text-[#1C01A5]">Tulis</p>
                <div className="flex items-center justify-between gap-1">
                  <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label="Kurangi angka yang ditulis" onClick={() => tulisNaik(-1)} disabled={k.tulisJ === 0}>
                    {"➖"}
                  </button>
                  <span className="min-w-[2ch] text-center text-lg font-black text-[#1C01A5]">{k.tulisJ}</span>
                  <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label="Tambah angka yang ditulis" onClick={() => tulisNaik(1)}>
                    {"➕"}
                  </button>
                </div>
              </div>
              <div className="rounded-xl border-2 border-[#FCD34D] bg-white px-1.5 py-1.5">
                <p className="mb-1 text-center text-xs font-black text-[#1C01A5]">Simpan</p>
                <div className="flex items-center justify-between gap-1">
                  <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label="Kurangi simpanan" onClick={() => ubah(ubahSimpan(k, -1))} disabled={k.simpanJ === 0}>
                    {"➖"}
                  </button>
                  <span className="min-w-[2ch] text-center text-lg font-black text-[#1C01A5]">{k.simpanJ}</span>
                  <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label="Tambah simpanan" onClick={() => ubah(ubahSimpan(k, 1))}>
                    {"➕"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaJ}>
                {"\u{2705}"} Periksa kolom
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kurang" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">
              Kurangkan {fmt(tr.a)} dengan {fmt(tr.b)} {tr.satuan}. Kolom {NAMA_KOLOM[k.kolK]}.
            </p>
            <PapanKolom rupa="diagram" baris={barisKurang} sorot={[k.kolK]} />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={pinjamTekan}>
                {"\u{1F4E5}"} Pinjam
              </button>
              <button type="button" className={tombol} onClick={kurangTekan}>
                {"\u{2796}"} Kurangkan
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kali" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">
              {fmt(tk.a)} × {tk.b} {tk.satuan}. {k.dipisah ? `Pengali dipisah: ${tk.b} = ${bg.join(" + ")}.` : "Tekan Pisah untuk memisah pengali."}
            </p>
            <PapanKolom rupa="diagram" baris={barisKali} sorot={k.dipisah ? [0, 1] : []} />
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={() => ubah(pisahkan(k))} aria-pressed={k.dipisah}>
                {"✂️"} Pisah
              </button>
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil kali">
              {pilKali(k).map((t, i) => (
                <button key={`${k.kaliKe}-${t}`} type="button" onClick={() => ubah(pilihKali(k, i))} aria-pressed={k.pilihKali === i} className={pilihan(k.pilihKali === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaK}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">
              Bagi {fmt(tb.a)} dengan {tb.b}. Kolom {NAMA_KOLOM[lb.langkah[k.langkahB].k]}: angka yang dibawa {angkaDibawa(k)}.
            </p>
            <PapanKolom rupa="diagram" baris={barisBagi} sorot={[lb.langkah[k.langkahB].k]} />
            <div className="mx-auto max-w-[220px] rounded-xl border-2 border-[#FCD34D] bg-white px-1.5 py-1.5">
              <p className="mb-1 text-center text-xs font-black text-[#1C01A5]">Angka hasil</p>
              <div className="flex items-center justify-between gap-1">
                <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label="Kurangi angka hasil" onClick={() => tulisBagiNaik(-1)} disabled={k.tulisB === 0}>
                  {"➖"}
                </button>
                <span className="min-w-[2ch] text-center text-lg font-black text-[#1C01A5]">{k.tulisB}</span>
                <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label="Tambah angka hasil" onClick={() => tulisBagiNaik(1)}>
                  {"➕"}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaB}>
                {"\u{2705}"} Periksa kolom
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiHitung(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "jumlah" ? kalimatJumlah(k) : k.mode === "kurang" ? kalimatKurang(k) : k.mode === "kali" ? kalimatKali(k) : kalimatBagi(k))}
      </p>
    </div>
  );
}
