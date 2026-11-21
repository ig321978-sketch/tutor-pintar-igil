"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK5B1 } from "../eja-k5b1";
import {
  awalBundel,
  bilanganSusun,
  bilanganUrai,
  hurufBesar,
  kalimatSama,
  kalimatSusun,
  kalimatTukar,
  kalimatUrai,
  ketukSusun,
  mulaiLagiBundel,
  periksaSama,
  periksaSusun,
  periksaTukar,
  periksaUrai,
  petunjukPeriksaTukar,
  petunjukSama,
  petunjukSusun,
  petunjukTukar,
  petunjukUrai,
  pilihModeBundel,
  sasaranSama,
  sasaranTukar,
  susunanSasaranTukar,
  totalUrai,
  tukarSatu,
  ubahSama,
  ubahUrai,
  type ArahTukar,
  type KeadaanBundel,
  type ModeBundel,
} from "./logika";
import { MISI_BUNDEL_TEKS } from "./data-sim";
import { KOLOM, lambang, teksSusunan, teksUraian } from "./logika-data";
import { PapanBundel } from "./GambarBundel";

/**
 * Simulasi Kelas 5 Bab 1 Sub-Bab C: Tukar Bundel (Misi Bundel). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Uraikan (atur banyak bundel tiap kolom sampai sama dengan bilangan), Tukar (tukar sepuluh dengan satu atau sebaliknya sampai sama dengan susunan sasaran; alat menolak bila bundelnya tidak cukup),
 * Susun (isi tiap kolom dengan satu angka, termasuk nol; alat menolak kolom yang belum diisi), dan Samakan (pilih semua susunan yang jumlahnya sama).
 * Semua bundel digambar dari data.
 */
const MODE: { id: ModeBundel; nama: string; ikon: string }[] = [
  { id: "urai", nama: "Uraikan", ikon: "\u{1F4E6}" },
  { id: "tukar", nama: "Tukar", ikon: "\u{1F501}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F4DD}" },
  { id: "sama", nama: "Samakan", ikon: "\u{2696}\u{FE0F}" },
];
const PISAH_TEMPAT = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];

export default function SimulasiTukarBundel({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBundel) => void }) {
  const [k, setK] = useState<KeadaanBundel>(() => awalBundel());
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
  const ubah = (baru: KeadaanBundel, ucap?: string) => {
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
  const tombol = "min-h-[44px] rounded-full border-2 border-[#92400E] bg-white px-3 text-sm font-black text-[#78350F] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full min-w-0 rounded-xl border-4 px-2 py-2 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#B45309] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;
  const kecil = "min-h-[44px] w-full rounded-lg border-2 border-[#92400E] bg-white text-xl font-black text-[#78350F]";

  const ganti = (m: ModeBundel) =>
    ubah(
      pilihModeBundel(k, m),
      m === "urai"
        ? "Atur banyak bundel tiap kolom sampai sama dengan bilangan di papan."
        : m === "tukar"
          ? "Tukar bundel sampai sama dengan susunan sasaran."
          : m === "susun"
            ? "Isi tiap kolom dengan angka sampai bilangannya tepat."
            : "Pilih semua susunan yang jumlahnya sama dengan bilangan.",
    );

  /* ------------------------------ Uraikan ------------------------------ */
  const periksaUraiKu = () => {
    const r = periksaUrai(k);
    if (r.ok) return ubah(r.k, "Betul! Bundel tiap kolom sama dengan angka pada bilangan itu.");
    ubah(r.k);
    salah(petunjukUrai(k));
  };
  /* ------------------------------ Tukar ------------------------------ */
  const st = sasaranTukar(k);
  const besar = KOLOM[st.i].bundel;
  const kecilNama = KOLOM[st.i + 1].bundel;
  const tukarKu = (arah: ArahTukar) => {
    const r = tukarSatu(k, arah);
    ubah(r.k, r.ok ? (arah === "turun" ? `Satu ${besar} ditukar dengan sepuluh ${kecilNama}.` : `Sepuluh ${kecilNama} ditukar dengan satu ${besar}.`) : undefined);
    if (!r.ok) salah(petunjukTukar(k, arah));
  };
  const periksaTukarKu = () => {
    const r = periksaTukar(k);
    if (r.ok) return ubah(r.k, "Betul! Sepuluh bundel kecil sama dengan satu bundel besar, dan jumlah tiketnya tetap.");
    ubah(r.k);
    salah(petunjukPeriksaTukar(k));
  };
  /* ------------------------------ Susun ------------------------------ */
  const periksaSusunKu = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, "Betul! Tiap bagian sudah di kolomnya, dan kolom yang kosong diisi nol.");
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  /* ------------------------------ Samakan ------------------------------ */
  const sm = sasaranSama(k);
  const periksaSamaKu = () => {
    const r = periksaSama(k);
    if (r.ok) return ubah(r.k, "Betul! Susunan yang ditukar dengan benar jumlahnya tetap sama.");
    ubah(r.k);
    salah(petunjukSama(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-tukar-bundel">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Tukar Bundel</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_BUNDEL_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "urai" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#92400E] bg-white px-2 py-1 text-center text-sm font-black text-[#78350F]">Bilangan di papan: {lambang(bilanganUrai(k))}</p>
            <PapanBundel s={k.uraiIsi} rupa="benda" judul="rak kamu" />
            <p className="text-center text-xs font-black text-[#1C01A5]">Jumlah tiket di rak: {lambang(totalUrai(k))}</p>
            <div key={`ur${k.uraiKe}`} className="mx-auto grid max-w-[420px] grid-cols-5 gap-1 px-1" role="group" aria-label="Atur bundel tiap kolom">
              {KOLOM.map((kol, j) => (
                <div key={kol.bundel} className="rounded-xl border-2 border-[#FCD34D] bg-white px-0.5 pb-0.5 pt-1">
                  <span className="block truncate text-center text-[11px] font-black leading-tight text-[#1C01A5]">{kol.bundel}</span>
                  <button type="button" aria-label={`Tambah ${kol.bundel}`} onClick={() => ubah(ubahUrai(k, j, 1))} className={kecil}>
                    +
                  </button>
                  <span className="block py-0.5 text-center text-lg font-black text-[#1C01A5]">{k.uraiIsi[j]}</span>
                  <button type="button" aria-label={`Kurangi ${kol.bundel}`} onClick={() => ubah(ubahUrai(k, j, -1))} className={kecil}>
                    −
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUraiKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tukar" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#92400E] bg-white px-2 py-1 text-center text-sm font-black text-[#78350F]">Susunan sasaran: {teksSusunan(susunanSasaranTukar(k))}</p>
            <PapanBundel s={k.tukarS} rupa="benda" tandai={[st.i, st.i + 1]} judul="susunan sekarang" />
            <div key={`tk${k.tukarKe}`} className="mx-auto grid max-w-[420px] grid-cols-2 gap-2 px-2" role="group" aria-label="Tukar bundel">
              <button type="button" onClick={() => tukarKu("turun")} className={pilihan(false)}>
                1 {besar} jadi 10 {kecilNama}
              </button>
              <button type="button" onClick={() => tukarKu("naik")} className={pilihan(false)}>
                10 {kecilNama} jadi 1 {besar}
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTukarKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "susun" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#92400E] bg-white px-2 py-1 text-center text-sm font-black text-[#78350F]">Uraian: {teksUraian(bilanganSusun(k))}</p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk tiap kolom untuk mengisi angkanya</p>
            <div key={`su${k.susunKe}`} className="mx-auto grid max-w-[420px] grid-cols-5 gap-1 px-1" role="group" aria-label="Isi angka tiap kolom">
              {PISAH_TEMPAT.map((nama, j) => (
                <button key={nama} type="button" onClick={() => ubah(ketukSusun(k, j))} aria-label={`Kolom ${nama}`} className="rounded-xl border-4 border-[#B45309] bg-[#FEF3C7] px-0.5 py-1 text-center">
                  <span className="block text-[10px] font-black leading-tight text-[#78350F]">
                    {nama.split(" ").map((w) => (
                      <span key={w} className="block">
                        {w}
                      </span>
                    ))}
                  </span>
                  <span className="block pt-1 text-2xl font-black text-[#1C01A5]">{k.susunIsi[j] < 0 ? "?" : k.susunIsi[j]}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSusunKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sama" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#92400E] bg-white px-2 py-1 text-center text-sm font-black text-[#78350F]">Bilangan di papan: {lambang(sm.n)}</p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk semua susunan yang jumlahnya sama</p>
            <div key={`sa${k.samaKe}`} className="mx-auto grid max-w-[420px] grid-cols-1 gap-2 px-2" role="group" aria-label="Pilih susunan">
              {sm.opsi.map((s, i) => (
                <button key={teksSusunan(s)} type="button" onClick={() => ubah(ubahSama(k, i))} aria-pressed={k.samaPilih[i]} className={pilihan(k.samaPilih[i])}>
                  {k.samaPilih[i] ? "✔ " : ""}
                  {teksSusunan(s)}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSamaKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiBundel(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "urai" ? kalimatUrai(k) : k.mode === "tukar" ? kalimatTukar(k) : k.mode === "susun" ? kalimatSusun(k) : kalimatSama(k)))}
      </p>
    </div>
  );
}
