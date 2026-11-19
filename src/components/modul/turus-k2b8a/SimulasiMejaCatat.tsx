"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  JENIS_BENDA,
  awalCatat,
  banyakJenis,
  catatJawaban,
  dibaris,
  jawabanKe,
  kalimatBanding,
  kalimatBaca,
  kalimatData,
  kalimatPilah,
  kalimatTabel,
  kalimatTurus,
  mulaiLagiCatat,
  periksaBaca,
  periksaTabel,
  periksaTurus,
  petunjukBaca,
  petunjukData,
  petunjukPilah,
  petunjukTabel,
  petunjukTurus,
  pilihBanding,
  pilihBenda,
  pilihJenisTurus,
  pilihLebih,
  pilihMax,
  pilihModeCatat,
  taruhBenda,
  ubahTabel,
  ubahTurus,
  type KeadaanCatat,
  type ModeCatat,
} from "./logika";
import { BENDA_SIM, JAWABAN_DATA, MISI_CATAT_TEKS, PILIHAN_LEBIH, WARNA_DATA } from "./data-peta";

/**
 * Simulasi Kelas 2 Bab 8 Sub-Bab A: Meja Catat (Misi Meja Catat). Benda panggung (lampu, kursi lipat, kabel, mikrofon) dan data warna kostum berbeda dari Story. Eksplorasi bebas tanpa skor, lima alat:
 * Pilah (pilah benda panggung ke baris jenisnya), Turus (tulis satu garis untuk satu benda, bundel lima terbentuk sendiri), Tabel (lengkapi banyaknya tiap jenis), Baca (pilih yang paling banyak dan lebihnya,
 * bandingkan dua jenis) dan Data (kumpulkan data sendiri dengan satu garis per jawaban). Banyak benda tidak ditulis: anak menghitung untuk mengetahuinya.
 */
const MODE: { id: ModeCatat; nama: string; ikon: string }[] = [
  { id: "pilah", nama: "Pilah", ikon: "\u{1F9FA}" },
  { id: "turus", nama: "Turus", ikon: "\u{270F}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CB}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F50D}" },
  { id: "data", nama: "Data", ikon: "\u{1F64B}" },
];

/** Turus `n` garis dengan bundel lima. */
function TurusSvg({ n, lebar = 150, tinggi = 28 }: { n: number; lebar?: number; tinggi?: number }) {
  const s = 6;
  const antar = 4 * s + 4;
  return (
    <svg viewBox={`0 0 ${lebar} ${tinggi}`} className="block" style={{ width: lebar, height: tinggi }} aria-label={`Turus dengan ${n} garis`} role="img">
      {Array.from({ length: n }, (_, i) => {
        const j = Math.floor(i / 5);
        const p = i % 5;
        const bx = 6 + j * antar;
        return p < 4 ? (
          <line key={`g${i}`} x1={bx + p * s} y1={3} x2={bx + p * s} y2={tinggi - 3} stroke="#1D4ED8" strokeWidth={2.2} strokeLinecap="round" />
        ) : (
          <line key={`m${j}`} x1={bx - 2} y1={tinggi - 5} x2={bx + 3 * s + 2} y2={5} stroke="#DC2626" strokeWidth={2.2} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

export default function SimulasiMejaCatat({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanCatat) => void }) {
  const [k, setK] = useState<KeadaanCatat>(() => awalCatat());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanCatat, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;
  const angka = (nyala: boolean) => `min-h-[44px] min-w-[44px] rounded-lg border-2 px-2 text-base font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`;

  const ganti = (m: ModeCatat) => {
    ubah(
      pilihModeCatat(k, m),
      m === "pilah"
        ? "Ketuk satu benda di tumpukan, lalu ketuk baris jenisnya."
        : m === "turus"
          ? "Pilih jenis benda, lalu tulis satu garis untuk satu benda."
          : m === "tabel"
            ? "Hitung benda tiap jenis, lalu isi banyaknya di tabel."
            : m === "baca"
              ? "Baca turusnya: cari yang paling banyak, atau bandingkan dua jenis."
              : "Catat jawaban tiap anak dengan satu garis di baris warnanya.",
    );
  };
  const ketukBenda = (i: number) => {
    const r = pilihBenda(k, i);
    if (r.ok) ubah(r.k, `Ini ${BENDA_SIM[JENIS_BENDA[i]].nama}. Ketuk barisnya.`);
  };
  const ketukBaris = (j: number) => {
    const r = taruhBenda(k, j);
    if (r.ok) return ubah(r.k, kalimatPilah(r.k));
    if (r.alasan === "belum") return salah(petunjukPilah(k));
    ubah(r.k);
    salah(petunjukPilah(k));
  };
  const periksaTurusKu = () => {
    const r = periksaTurus(k);
    if (r.ok) return ubah(r.k, `Betul! ${kalimatTurus(r.k)}`);
    ubah(r.k);
    salah(petunjukTurus(k));
  };
  const turusUbah = (arah: 1 | -1) => {
    const r = ubahTurus(k, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu jenis paling banyak sepuluh garis." : "Belum ada garis yang bisa dihapus.");
    ubah(r.k, kalimatTurus(r.k));
  };
  const tabelUbah = (j: number, arah: 1 | -1) => {
    const r = ubahTabel(k, j, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu kolom paling banyak sembilan." : "Kolom itu sudah nol.");
    ubah(r.k);
  };
  const periksaTabelKu = () => {
    const r = periksaTabel(k);
    if (r.ok) return ubah(r.k, kalimatTabel(r.k));
    ubah(r.k);
    salah(petunjukTabel(k));
  };
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, kalimatBaca(r.k));
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  const banding = (j: number) => {
    const baru = pilihBanding(k, j);
    ubah(baru, baru.banding.length === 2 ? kalimatBanding(baru) : `${BENDA_SIM[j].nama}. Ketuk satu jenis lagi.`);
  };
  const catat = (baris: number) => {
    const r = catatJawaban(k, baris);
    if (r.ok) return ubah(r.k, kalimatData(r.k));
    if (k.dataSelesai) return;
    ubah(r.k);
    salah(petunjukData(k));
  };

  const sisa = k.letak.map((b, i) => (b < 0 ? i : -1)).filter((i) => i >= 0);
  return (
    <div className="space-y-3" data-uji="simulasi-meja-catat">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B91C1C] bg-[#FEF2F2] p-2">
        <p className="text-sm font-black text-[#7F1D1D]">Misi Meja Catat</p>
        <p className="text-xs font-bold text-[#7F1D1D]/80">{MISI_CATAT_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "pilah" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#B91C1C] bg-[#FEE2E2] p-2">
              <p className="mb-1 text-xs font-black text-[#7F1D1D]">Tumpukan campur</p>
              <div className="flex min-h-[48px] flex-wrap gap-1" role="group" aria-label="Benda di tumpukan">
                {sisa.length === 0 ? <span className="text-sm font-black text-[#15803D]">Tumpukan kosong, semua sudah terpilah.</span> : null}
                {sisa.map((i) => (
                  <button key={i} type="button" onClick={() => ketukBenda(i)} aria-pressed={k.pilih === i} aria-label={BENDA_SIM[JENIS_BENDA[i]].nama} className={`min-h-[44px] min-w-[44px] rounded-lg border-2 text-2xl ${k.pilih === i ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCA5A5] bg-white"}`}>
                    {BENDA_SIM[JENIS_BENDA[i]].emoji}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1" role="group" aria-label="Baris jenis">
              {BENDA_SIM.map((b, j) => (
                <button key={b.id} type="button" onClick={() => ketukBaris(j)} className="flex min-h-[48px] w-full items-center gap-2 rounded-xl border-4 border-[#0369A1] bg-[#E0F2FE] px-2 text-left">
                  <span className="w-24 shrink-0 text-xs font-black text-[#0C4A6E]">
                    <span aria-hidden="true">{b.emoji} </span>
                    {b.nama}
                  </span>
                  <span className="flex flex-wrap gap-0.5 text-lg" aria-hidden="true">
                    {Array.from({ length: dibaris(k, j) }, (_, i) => (
                      <span key={i}>{b.emoji}</span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {k.mode === "turus" ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Pilih jenis benda">
              {BENDA_SIM.map((b, j) => (
                <button key={b.id} type="button" onClick={() => ubah(pilihJenisTurus(k, j))} aria-pressed={k.jenis === j} className={pilihan(k.jenis === j)}>
                  <span className="block text-2xl" aria-hidden="true">
                    {b.emoji}
                  </span>
                  {b.nama}
                  {k.turusBenar.includes(j) ? " \u{2705}" : ""}
                </button>
              ))}
            </div>
            <div className="mx-auto flex max-w-[420px] items-center justify-center rounded-xl border-4 border-[#1D4ED8] bg-[#F0F9FF] p-2">
              {k.turus[k.jenis] === 0 ? <span className="text-xs font-bold text-[#64748B]">belum ada garis</span> : <TurusSvg n={k.turus[k.jenis]} />}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => turusUbah(1)}>
                {"\u{2795}"} Tambah garis
              </button>
              <button type="button" className={tombol} onClick={() => turusUbah(-1)}>
                {"\u{2796}"} Hapus garis
              </button>
              <button type="button" className={tombol} onClick={periksaTurusKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tabel" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#1D4ED8] bg-white p-1" aria-label="Tabel turus">
              <p className="text-center text-xs font-black text-[#B91C1C]">Benda di Panggung</p>
              <div className="grid grid-cols-[5.5rem_1fr_6.5rem] gap-px bg-[#1D4ED8] text-center text-xs font-black">
                <span className="bg-[#DBEAFE] py-1">Nama</span>
                <span className="bg-[#DBEAFE] py-1">Turus</span>
                <span className="bg-[#DBEAFE] py-1">Banyaknya</span>
                {BENDA_SIM.map((b, j) => (
                  <React.Fragment key={b.id}>
                    <span className="flex items-center justify-center gap-1 bg-white px-1 py-1.5 text-[#1C01A5]">
                      <span aria-hidden="true">{b.emoji}</span>
                      {b.nama}
                    </span>
                    <span className="flex items-center justify-center bg-white py-1">{k.turus[j] === 0 ? <span className="text-[10px] text-[#94A3B8]">kosong</span> : <TurusSvg n={k.turus[j]} lebar={100} tinggi={24} />}</span>
                    <span className="flex items-center justify-center gap-1 bg-white py-1">
                      <button type="button" className={angka(false)} onClick={() => tabelUbah(j, -1)} aria-label={`Kurangi banyak ${b.nama}`}>
                        {"\u{2796}"}
                      </button>
                      <span className="w-4 text-base font-black text-[#1C01A5]">{k.tabel[j]}</span>
                      <button type="button" className={angka(false)} onClick={() => tabelUbah(j, 1)} aria-label={`Tambah banyak ${b.nama}`}>
                        {"\u{2795}"}
                      </button>
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="rounded-xl border-2 border-[#0369A1] bg-[#E0F2FE] p-1.5" aria-label="Benda yang sudah terpilah">
              {BENDA_SIM.map((b) => (
                <p key={b.id} className="text-sm leading-tight" aria-hidden="true">
                  {Array.from({ length: b.banyak }, (_, i) => (
                    <span key={i}>{b.emoji}</span>
                  ))}
                </p>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTabelKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#1D4ED8] bg-white p-1" aria-label="Diagram turus untuk dibaca">
              {BENDA_SIM.map((b, j) => (
                <div key={b.id} className="flex items-center gap-2 border-b border-[#CBD5E1] py-1 last:border-b-0">
                  <span className="w-24 shrink-0 text-xs font-black text-[#1C01A5]">
                    <span aria-hidden="true">{b.emoji} </span>
                    {b.nama}
                  </span>
                  <TurusSvg n={banyakJenis(j)} lebar={150} tinggi={24} />
                </div>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Jenis apa yang paling banyak?</p>
            <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Pilih jenis paling banyak">
              {BENDA_SIM.map((b, j) => (
                <button key={b.id} type="button" onClick={() => ubah(pilihMax(k, j))} aria-pressed={k.bacaMax === j} className={pilihan(k.bacaMax === j)}>
                  <span aria-hidden="true">{b.emoji} </span>
                  {b.nama}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Lebihnya dari jenis yang paling sedikit?</p>
            <div className="flex justify-center gap-2" role="group" aria-label="Pilih lebihnya">
              {PILIHAN_LEBIH.map((n) => (
                <button key={n} type="button" onClick={() => ubah(pilihLebih(k, n))} aria-pressed={k.bacaLebih === n} className={angka(k.bacaLebih === n)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBacaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Bandingkan dua jenis: ketuk dua jenis.</p>
            <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Pilih dua jenis">
              {BENDA_SIM.map((b, j) => (
                <button key={b.id} type="button" onClick={() => banding(j)} aria-pressed={k.banding.includes(j)} className={pilihan(k.banding.includes(j))}>
                  <span aria-hidden="true">{b.emoji} </span>
                  {b.nama}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {k.mode === "data" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#B91C1C] bg-[#FEF2F2] p-2 text-center">
              <p className="text-xs font-black text-[#7F1D1D]">Warna kostum yang paling disukai</p>
              {k.dataSelesai ? (
                <p className="text-sm font-black text-[#15803D]">Semua jawaban sudah tercatat.</p>
              ) : (
                <p className="text-sm font-black text-[#1C01A5]">
                  <span aria-hidden="true">{"\u{1F9D2}"}</span> Anak nomor {k.dataKe + 1} menjawab {WARNA_DATA[jawabanKe(k)].nama}
                </p>
              )}
              <p className="text-[11px] font-bold text-[#7F1D1D]/70">
                Jawaban {Math.min(k.dataKe + 1, JAWABAN_DATA.length)} dari {JAWABAN_DATA.length}
              </p>
            </div>
            <div className="space-y-1" role="group" aria-label="Baris warna">
              {WARNA_DATA.map((w, j) => (
                <button key={w.id} type="button" onClick={() => catat(j)} className="flex min-h-[48px] w-full items-center gap-2 rounded-xl border-4 border-[#1D4ED8] bg-white px-2 text-left">
                  <span className="w-24 shrink-0 text-xs font-black text-[#1C01A5]">
                    <span aria-hidden="true">{w.emoji} </span>
                    {w.nama}
                  </span>
                  {k.dataGaris[j] === 0 ? <span className="text-[10px] text-[#94A3B8]">kosong</span> : <TurusSvg n={k.dataGaris[j]} lebar={80} tinggi={24} />}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiCatat(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "pilah" ? kalimatPilah(k) : k.mode === "turus" ? kalimatTurus(k) : k.mode === "tabel" ? kalimatTabel(k) : k.mode === "baca" ? kalimatBaca(k) : kalimatData(k))}
      </p>
    </div>
  );
}
