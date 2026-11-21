"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  angkaBagi,
  awalPapan,
  barisBagiSim,
  batasSaring,
  faktorGabung,
  giliranSaring,
  hasilGabung,
  hapusSaring,
  kalimatBagi,
  kalimatGabung,
  kalimatPohon,
  kalimatSaring,
  ketukGabung,
  ketukSaring,
  mulaiLagiPapan,
  pakaiPembagi,
  pecahPohon,
  periksaGabung,
  periksaPohon,
  periksaSaring,
  petunjukGabung,
  petunjukPohon,
  petunjukSaring,
  pilihDaunPohon,
  pilihModePapan,
  sisaSaring,
  sudahDipasang,
  targetBagi,
  targetGabung,
  targetPohon,
  type KeadaanPapan,
  type ModePapan,
} from "./logika";
import { MISI_PAPAN_TEKS, PEMBAGI_SIM } from "./data-sim";
import { TabelBagiGambar } from "./GambarPapan";
import { ucapkan } from "./logika-cpa";
import { fmt, laPrima, pembagianBerulang, tulisKali } from "./logika-data";

/**
 * Simulasi Kelas 5 Bab 2 Sub-Bab E: Pohon Papan (penutup bab, tema Pasar Kuliner Malam). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Saring (hapus satu, ambil prima berurutan; alat menolak bilangan yang sudah terhapus dan bilangan yang bukan gilirannya), Pohon (pilih daun, pecah dengan pembagi prima;
 * alat menolak pembagi yang tidak habis membagi dan prima yang dipecah), Gabung (pasangkan prima yang sama pada dua faktorisasi; alat menolak prima yang berbeda),
 * dan Bagi (pembagian berulang; alat menolak prima yang tidak membagi satu pun atau yang bukan prima terkecil yang bisa). Semua papan digambar dari data.
 * Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModePapan; nama: string; ikon: string }[] = [
  { id: "saring", nama: "Saring", ikon: "\u{1F50E}" },
  { id: "pohon", nama: "Pohon", ikon: "\u{1F333}" },
  { id: "gabung", nama: "Gabung", ikon: "\u{1F517}" },
  { id: "bagi", nama: "Bagi", ikon: "\u{2797}" },
];

export default function SimulasiPohonPapan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPapan) => void }) {
  const [k, setK] = useState<KeadaanPapan>(() => awalPapan());
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
  const ubah = (baru: KeadaanPapan, ucap?: string) => {
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
  const tolak = (baru: KeadaanPapan, ucap: string) => {
    setK(baru);
    salah(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#6D28D9] bg-white px-3 text-sm font-black text-[#4C1D95] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-2 text-sm font-black ${nyala ? "border-[#6D28D9] bg-[#6D28D9] text-white" : "border-[#6D28D9] bg-white text-[#6D28D9]"}`;

  const ganti = (m: ModePapan) => {
    ubah(
      pilihModePapan(k, m),
      m === "saring"
        ? "Hapus bilangan satu, lalu ambil bilangan prima terkecil yang tersisa dan lihat kelipatannya terhapus."
        : m === "pohon"
          ? "Pilih satu daun yang belum prima, lalu pecah dengan bilangan prima yang habis membagi."
          : m === "gabung"
            ? "Pasangkan bilangan prima yang sama pada kedua faktorisasi."
            : "Pilih bilangan prima terkecil yang bisa membagi, ulangi sampai semuanya satu.",
    );
  };

  /* ------------------------------ Saring ------------------------------ */
  const batas = batasSaring(k);
  const hapus = hapusSaring(k);
  const giliran = giliranSaring(k);
  const ketukSel = (n: number) => {
    const r = ketukSaring(k, n);
    if (r.ok) return ubah(r.k, r.jenis === "satu" ? "Satu dihapus, karena satu bukan bilangan prima." : `Ambil ${n}, lalu semua kelipatan ${n} sesudahnya terhapus.`);
    if (r.jenis === "terhapus") return tolak(r.k, "Alat menolak. Bilangan itu sudah terhapus oleh prima yang diambil lebih dulu.");
    tolak(r.k, !k.satuDihapus ? "Alat menolak. Hapus bilangan satu dulu, karena satu bukan bilangan prima." : "Alat menolak. Ambil bilangan terkecil yang masih tersisa dulu.");
  };
  const periksaS = () => {
    const sisa = sisaSaring(k);
    const r = periksaSaring(k);
    if (!r.ok) {
      setK(r.k);
      return salah(petunjukSaring(k));
    }
    ubah(r.k, `Betul! Yang tersisa semuanya prima: ${sisa.join(", ")}. Ada ${sisa.length} bilangan prima.`);
  };

  /* ------------------------------ Pohon ------------------------------ */
  const nPohon = targetPohon(k);
  const pecah = (p: number) => {
    const r = pecahPohon(k, p);
    if (r.ok) return ubah(r.k, `Daun dipecah menjadi ${p} dan hasil baginya.`);
    if (r.alasan === "belum") return salah("Pilih dulu satu daun yang belum prima.");
    tolak(r.k, r.alasan === "prima" ? "Alat menolak. Bilangan prima tidak dipecah lagi, karena ia sudah menjadi daun." : `Alat menolak. Daun itu tidak habis dibagi ${p}.`);
  };
  const periksaP = () => {
    const r = periksaPohon(k);
    if (!r.ok) {
      setK(r.k);
      return salah(petunjukPohon());
    }
    ubah(r.k, `Betul! ${nPohon} = ${tulisKali([...k.daun].sort((a, b) => a - b))}.`);
  };

  /* ------------------------------ Gabung ------------------------------ */
  const [bilA, bilB] = targetGabung(k);
  const [fa, fb] = faktorGabung(k);
  const chip = (baris: "a" | "b", i: number, f: number) => {
    const dipasang = sudahDipasang(k, baris, i);
    const dipilih = k.pilihGabung?.baris === baris && k.pilihGabung.i === i;
    return (
      <button
        key={`${baris}${i}`}
        type="button"
        disabled={dipasang}
        aria-pressed={dipilih}
        onClick={() => {
          const r = ketukGabung(k, baris, i);
          if (r.pasangan) return ubah(r.k, `Berpasangan: ${f} dan ${f}.`);
          if (r.ok) return ubah(r.k);
          tolak(r.k, "Alat menolak. Dua bilangan prima yang berbeda tidak berpasangan.");
        }}
        className={`flex h-11 w-11 items-center justify-center rounded-full border-4 text-base font-black text-[#1C01A5] ${dipasang ? "border-[#15803D] bg-[#BBF7D0]" : dipilih ? "border-[#DC2626] bg-[#FEE2E2]" : "border-[#6D28D9] bg-white"}`}
      >
        {f}
      </button>
    );
  };
  const periksaG = () => {
    const h = hasilGabung(k);
    const r = periksaGabung(k);
    if (!r.ok) {
      setK(r.k);
      return salah(petunjukGabung());
    }
    ubah(r.k, `Betul! KPK ${bilA} dan ${bilB}: ${tulisKali(h.kpk)} = ${fmt(h.kpk.reduce((a, b) => a * b, 1))}. FPB: ${h.fpb.length ? `${tulisKali(h.fpb)} = ${fmt(h.fpb.reduce((a, b) => a * b, 1))}` : "1"}.`);
  };

  /* ------------------------------ Bagi ------------------------------ */
  const bilBagi = targetBagi(k);
  const barisB = barisBagiSim(k);
  const pakai = (p: number) => {
    const r = pakaiPembagi(k, p);
    if (r.ok && r.selesai) {
      const h = pembagianBerulang([...bilBagi]);
      return ubah(r.k, `Betul! Semuanya satu. KPK = ${tulisKali(h.pembagi)} = ${fmt(h.kpk)}, dan FPB = ${fmt(h.fpb)}.`);
    }
    if (r.ok) return ubah(r.k, `Dibagi dengan ${p}: bilangan yang habis dibagi menjadi lebih kecil, yang lain ditulis ulang.`);
    tolak(r.k, r.alasan === "tidak" ? `Alat menolak. Tidak ada bilangan yang habis dibagi ${p}.` : "Alat menolak. Mulai dari bilangan prima terkecil yang bisa membagi.");
  };

  return (
    <div className="space-y-2" data-uji="simulasi-pohon-papan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#6D28D9] bg-[#F5F3FF] p-2">
        <p className="text-sm font-black text-[#4C1D95]">Misi Pohon Papan</p>
        <p className="text-xs font-bold text-[#4C1D95]/80">{MISI_PAPAN_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "saring" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">Tabel bilangan satu sampai {batas}. {giliran === null && k.satuDihapus ? "Semua prima yang perlu sudah diambil sampai tabel selesai." : k.satuDihapus ? "Ketuk bilangan terkecil yang masih tersisa." : "Ketuk bilangan satu dulu."}</p>
            <div className="mx-auto grid max-w-[320px] grid-cols-8 gap-1 rounded-xl border-[3px] border-[#6D28D9] bg-[#F5F3FF] p-1.5" role="group" aria-label="Tabel bilangan">
              {Array.from({ length: batas }, (_, i) => i + 1).map((n) => {
                const dihapus = hapus.has(n);
                const diambil = k.diambil.includes(n);
                return (
                  <button
                    key={`${k.saringKe}-${n}`}
                    type="button"
                    onClick={() => ketukSel(n)}
                    aria-label={dihapus ? `${n}, sudah terhapus` : diambil ? `${n}, diambil` : `${n}`}
                    className={`min-h-[36px] rounded-lg border-2 text-sm font-black ${dihapus ? "border-[#9CA3AF] bg-[#E5E7EB] text-[#6B7280] line-through" : diambil ? "border-[#15803D] bg-[#BBF7D0] text-[#14532D]" : "border-[#6D28D9] bg-white text-[#1C01A5]"}`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={periksaS}>
                {"\u{2705}"} Periksa saringan
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pohon" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">
              Pecah {nPohon} sampai semua daun prima. Daun sekarang: {k.daun.join(", ")}.
            </p>
            <div className="mx-auto flex max-w-[320px] flex-wrap justify-center gap-2 rounded-xl border-[3px] border-[#6D28D9] bg-[#F5F3FF] p-2" role="group" aria-label="Daun pohon">
              {k.daun.map((d, i) => (
                <button
                  key={`${i}-${d}`}
                  type="button"
                  aria-pressed={k.pilihDaun === i}
                  onClick={() => ubah(pilihDaunPohon(k, i))}
                  className={`flex h-11 min-w-[48px] items-center justify-center rounded-full border-4 px-2 text-base font-black text-[#1C01A5] ${laPrima(d) ? "border-[#15803D] bg-[#BBF7D0]" : k.pilihDaun === i ? "border-[#DC2626] bg-[#FEE2E2]" : "border-[#6D28D9] bg-white"}`}
                >
                  {d}
                </button>
              ))}
            </div>
            <div className="mx-auto grid max-w-[320px] grid-cols-4 gap-1.5" role="group" aria-label="Pilih pembagi prima">
              {PEMBAGI_SIM.map((p) => (
                <button key={p} type="button" className={tombol} onClick={() => pecah(p)}>
                  ÷ {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaP}>
                {"\u{2705}"} Periksa pohon
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "gabung" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">
              Faktorisasi prima {bilA} dan {bilB}. Pasangkan prima yang sama.
            </p>
            <div className="mx-auto max-w-[320px] space-y-2 rounded-xl border-[3px] border-[#6D28D9] bg-[#F5F3FF] p-2">
              <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-1">
                <span className="text-base font-black text-[#4C1D95]">{bilA}</span>
                <div className="flex flex-wrap gap-1.5">{fa.map((f, i) => chip("a", i, f))}</div>
              </div>
              <div className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-1">
                <span className="text-base font-black text-[#4C1D95]">{bilB}</span>
                <div className="flex flex-wrap gap-1.5">{fb.map((f, i) => chip("b", i, f))}</div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaG}>
                {"\u{2705}"} Periksa pasangan
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#4C1D95]">
              Bagi {bilBagi.join(", ")} dengan prima sampai semuanya satu. Sekarang: {angkaBagi(k).join(", ")}.
            </p>
            <TabelBagiGambar bil={[...bilBagi]} baris={barisB} rupa="diagram" />
            <div className="mx-auto grid max-w-[320px] grid-cols-4 gap-1.5" role="group" aria-label="Pilih pembagi prima">
              {PEMBAGI_SIM.map((p) => (
                <button key={p} type="button" className={tombol} onClick={() => pakai(p)}>
                  ÷ {p}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPapan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "saring" ? kalimatSaring(k) : k.mode === "pohon" ? kalimatPohon(k) : k.mode === "gabung" ? kalimatGabung(k) : kalimatBagi(k))}
      </p>
    </div>
  );
}
