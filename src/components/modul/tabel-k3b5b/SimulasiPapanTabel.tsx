"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalTabel,
  bacaKolom,
  ketukCacah,
  geserUrut,
  hapusCacah,
  jumlahCacah,
  kalimatBaca,
  kalimatCacah,
  kalimatIsi,
  kalimatUrut,
  kata,
  jawabanBaca,
  mulaiLagiTabel,
  pertanyaanBaca,
  periksaBaca,
  periksaCacah,
  periksaIsi,
  periksaUrut,
  pesanBundel,
  petunjukBaca,
  petunjukCacah,
  petunjukIsi,
  petunjukUrut,
  pilihanBaca,
  pilihBaca,
  pilihModeTabel,
  targetBaca,
  targetCacah,
  targetIsi,
  targetUrut,
  ubahIsi,
  type KeadaanTabel,
  type ModeTabel,
} from "./logika";
import { MISI_TABEL_TEKS } from "./data-sim";
import { TabelSvg, TurusSvg } from "./GambarTabel";

/**
 * Simulasi Kelas 3 Bab 5 Sub-Bab B: Papan Tabel (penutup bab, tema Bengkel Sepeda Pak Hasan). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Cacah (ketuk jenis sesuai daftar; garis kelima otomatis menjadi bundel lima), Isi (isi kolom banyak sesuai turus), Urut (geser baris tabel sampai urut),
 * dan Baca (tekan Baca kolom banyak, alat menolak menjawab sebelum itu, lalu jawab pertanyaan: terbanyak, tersedikit, lebih dari, atau selisih).
 */
const MODE: { id: ModeTabel; nama: string; ikon: string }[] = [
  { id: "cacah", nama: "Cacah", ikon: "\u{270F}" },
  { id: "isi", nama: "Isi", ikon: "\u{1F4CB}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F522}" },
  { id: "baca", nama: "Tanya", ikon: "\u{1F64B}" },
];
const WARNA_JENIS = ["#FCA5A5", "#93C5FD", "#86EFAC"];

/** Satu baris turus kecil (gambar) untuk daftar jenis. */
function BarisTurus({ n }: { n: number }) {
  return (
    <svg viewBox="0 0 110 28" className="h-7 w-[110px] shrink-0" role="img" aria-label={`turus ${n}`}>
      <TurusSvg n={n} x={4} y={3} tinggi={22} gap={4.2} />
    </svg>
  );
}

export default function SimulasiPapanTabel({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTabel) => void }) {
  const [k, setK] = useState<KeadaanTabel>(() => awalTabel());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanTabel, ucap?: string) => {
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
  const kecil = "min-h-[40px] min-w-[40px] rounded-full border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5] disabled:opacity-30";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#0F766E] bg-white text-[#0F766E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#5EEAD4] bg-white"}`;

  const ganti = (m: ModeTabel) => {
    ubah(
      pilihModeTabel(k, m),
      m === "cacah" ? "Baca daftar, lalu ketuk jenisnya untuk menambah turus." : m === "isi" ? "Hitung turus tiap baris, lalu isi kolom banyak." : m === "urut" ? "Geser baris tabel sampai urut." : "Tekan Baca kolom banyak, lalu jawab pertanyaan tabel.",
    );
  };

  const ketuk = (j: number) => {
    const r = ketukCacah(k, j);
    if (!r.ok) return salah("Turus pada jenis itu sudah dua puluh, tidak bisa ditambah lagi.");
    ubah(r.k, r.k.cacah[j] % 5 === 0 ? pesanBundel(r.k.cacah[j]) : undefined);
  };
  const periksaCacahKu = () => {
    const r = periksaCacah(k);
    if (r.ok) return ubah(r.k, `Betul! Semua data dalam daftar sudah tercatat dengan turus berlima.`);
    ubah(r.k);
    salah(petunjukCacah(k));
  };
  const isiUbah = (r: number, d: number) => {
    const h = ubahIsi(k, r, d);
    if (!h.ok) return salah(d < 0 ? "Angka sudah nol, tidak bisa lebih kecil." : "Angka sudah dua puluh, tidak bisa lebih besar.");
    ubah(h.k, kata(h.k.isi[r]));
  };
  const periksaIsiKu = () => {
    const r = periksaIsi(k);
    if (r.ok) return ubah(r.k, "Betul! Kolom banyak sudah sama dengan turusnya.");
    ubah(r.k);
    salah(petunjukIsi(k));
  };
  const geser = (pos: number, arah: -1 | 1) => {
    const r = geserUrut(k, pos, arah);
    if (!r.ok) return salah(arah < 0 ? "Baris itu sudah paling atas." : "Baris itu sudah paling bawah.");
    ubah(r.k);
  };
  const periksaUrutKu = () => {
    const r = periksaUrut(k);
    if (r.ok) return ubah(r.k, "Betul! Barisnya sudah urut sesuai kolom banyak.");
    ubah(r.k);
    salah(petunjukUrut(k));
  };
  const baca = () => ubah(bacaKolom(k), "Kolom banyak sudah terbaca. Pilih jawaban yang tepat.");
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, `Betul! Jawabannya ${/^\d+$/.test(jawabanBaca(k)) ? kata(Number(jawabanBaca(k))) : jawabanBaca(k)}.`);
    ubah(r.k);
    salah(petunjukBaca(k));
  };

  const tc = targetCacah(k);
  const ti = targetIsi(k);
  const tu = targetUrut(k);
  const tb = targetBaca(k);
  const total = tc.daftar.length;
  const nCacah = jumlahCacah(k);
  const pilBaca = pilihanBaca(k);

  return (
    <div className="space-y-3" data-uji="simulasi-papan-tabel">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0F766E] bg-[#F0FDFA] p-2">
        <p className="text-sm font-black text-[#134E4A]">Misi Papan Tabel</p>
        <p className="text-xs font-bold text-[#134E4A]/80">{MISI_TABEL_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "cacah" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#134E4A]">Daftar {tc.judul}</p>
            <div className="mx-auto flex max-w-[420px] flex-wrap justify-center gap-1" role="list" aria-label="Daftar peminjaman">
              {tc.daftar.map((j, i) => (
                <span key={i} role="listitem" className="rounded-md border-2 border-[#0F766E]/50 px-1.5 py-0.5 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: WARNA_JENIS[j] }}>
                  {tc.jenis[j]}
                </span>
              ))}
            </div>
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#0F766E] bg-white p-2">
              {tc.jenis.map((nama, j) => (
                <div key={nama} className="flex items-center gap-1.5">
                  <button type="button" onClick={() => ketuk(j)} aria-label={`Tambah satu turus ${nama}`} className="min-h-[44px] w-[78px] shrink-0 rounded-xl border-4 border-[#1C01A5] px-1 text-sm font-black text-[#1C01A5]" style={{ backgroundColor: WARNA_JENIS[j] }}>
                    {nama} +1
                  </button>
                  <BarisTurus n={k.cacah[j]} />
                  <span className="min-w-[1.5rem] text-right text-lg font-black text-[#15803D]">{k.cacah[j]}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Tercatat {nCacah} dari {total}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(hapusCacah(k), "Turus dihapus. Hitung lagi dari daftar.")}>
                {"\u{1F5D1}"} Hapus turus
              </button>
              <button type="button" className={tombol} onClick={periksaCacahKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "isi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#134E4A]">Isi kolom banyak sesuai turusnya.</p>
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#0F766E] bg-[#FFFBEB] p-2">
              <div className="flex items-center gap-2 text-[11px] font-black text-[#1C01A5]/70">
                <span className="w-[56px]">jenis</span>
                <span className="w-[110px]">turus</span>
                <span className="flex-1 text-center">banyak</span>
              </div>
              {ti.baris.map((b, r) => (
                <div key={b.nama} className="flex items-center gap-2">
                  <span className="w-[56px] text-sm font-black text-[#1C01A5]">{b.nama}</span>
                  <BarisTurus n={b.n} />
                  <div className="flex flex-1 items-center justify-center gap-1">
                    <button type="button" className={kecil} onClick={() => isiUbah(r, -1)} aria-label={`Kurangi banyak ${b.nama}`}>
                      {"−"}
                    </button>
                    <span className="min-w-[1.8rem] text-center text-lg font-black text-[#15803D]">{k.isi[r]}</span>
                    <button type="button" className={kecil} onClick={() => isiUbah(r, 1)} aria-label={`Tambah banyak ${b.nama}`}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaIsiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urut" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#134E4A]">{tu.arah === "naik" ? "Urutkan dari yang paling sedikit di atas." : "Urutkan dari yang paling banyak di atas."}</p>
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#0F766E] bg-[#FFFBEB] p-2">
              {k.urut.map((idx, pos) => {
                const b = tu.baris[idx];
                return (
                  <div key={b.nama} className="flex items-center gap-2">
                    <span className="w-[56px] text-sm font-black text-[#1C01A5]">{b.nama}</span>
                    <BarisTurus n={b.n} />
                    <span className="w-8 text-center text-lg font-black text-[#15803D]">{b.n}</span>
                    <button type="button" className={kecil} onClick={() => geser(pos, -1)} aria-label={`Naikkan baris ${b.nama}`}>
                      {"▲"}
                    </button>
                    <button type="button" className={kecil} onClick={() => geser(pos, 1)} aria-label={`Turunkan baris ${b.nama}`}>
                      {"▼"}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUrutKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <TabelSvg baris={tb.baris} rupa="diagram" acuan={tb.soal === "lebih" ? tb.acuan : undefined} />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={baca}>
                {"\u{1F441}"} Baca kolom banyak
              </button>
            </div>
            {k.sudahBaca ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">{pertanyaanBaca(k)}</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jawaban">
                  {pilBaca.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihBaca(k, i))} aria-pressed={k.bacaPilih === i} className={pilihan(k.bacaPilih === i)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBacaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTabel(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "cacah" ? kalimatCacah(k) : k.mode === "isi" ? kalimatIsi(k) : k.mode === "urut" ? kalimatUrut(k) : kalimatBaca(k))}
      </p>
    </div>
  );
}
