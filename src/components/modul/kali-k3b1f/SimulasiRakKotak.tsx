"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { KotakIsi, LarikGambar } from "./GambarKali";
import { BATAS_BARIS, BATAS_ISI, BATAS_KOTAK, BESAR_MAKS, BESAR_MIN, MISI_ISI_TEKS } from "./data-sim";
import {
  SUARA_MODE,
  awalIsi,
  berulangIsi,
  jumlahIsi,
  kalimatIsi,
  lanjutSusun,
  lompatSekali,
  mulaiLagiIsi,
  periksaIsi,
  periksaSusun,
  periksaTulis,
  pilihModeIsi,
  putarSusun,
  tugasIsi,
  tugasLompat,
  tugasSusun,
  tugasTulis,
  ubahBaris,
  ubahBesar,
  ubahIsi,
  ubahKolom,
  ubahKotak,
  ubahTulisA,
  ubahTulisB,
  ulangIsi,
  ulangLompat,
  ulangSusun,
  ulangTulis,
  type Hasil,
  type KeadaanIsi,
  type ModeIsi,
} from "./logika";
import type { Isi, Larik } from "./logika-cpa";
import { pendaratan } from "./logika-cpa";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab F: Rak Kotak (Misi Rak Kotak). Empat alat tanpa skor: Isi (susun kotak berisi sama banyak), Tulis (tulis perkalian dari susunan kotak),
 * Susun (susun baris dan kolom lalu putar), Lompat (lompat sama besar sampai tepat di sasaran).
 */
const MODE: { id: ModeIsi; nama: string; ikon: string }[] = [
  { id: "isi", nama: "Isi", ikon: "\u{1F4E6}" },
  { id: "tulis", nama: "Tulis", ikon: "\u{270F}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F4D0}" },
  { id: "lompat", nama: "Lompat", ikon: "\u{1F438}" },
];

/** Garis bilangan lompatan: busur tiap lompatan dari nol, penanda posisi, dan bendera sasaran. */
function GarisLompat({ besar, lompatan, target }: { besar: number; lompatan: number; target: number }) {
  const x = (v: number) => 24 + (252 * v) / target;
  const y = 120;
  return (
    <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90" role="img" aria-label={`Garis bilangan sampai ${target}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#F0FDF4" stroke="#0F766E" strokeWidth={2} />
      <line x1={16} y1={y} x2={284} y2={y} stroke="#1C01A5" strokeWidth={2.4} />
      <text x={x(0)} y={y + 18} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
        0
      </text>
      <line x1={x(0)} y1={y - 5} x2={x(0)} y2={y + 5} stroke="#1C01A5" strokeWidth={1.8} />
      {pendaratan(besar, lompatan)
        .slice(1)
        .map((v, i) => (
          <g key={i}>
            <path d={`M${x(v - besar)} ${y - 2} Q${(x(v - besar) + x(v)) / 2} ${y - 44} ${x(v)} ${y - 2}`} fill="none" stroke="#DC2626" strokeWidth={2} strokeLinecap="round" />
            <line x1={x(v)} y1={y - 5} x2={x(v)} y2={y + 5} stroke="#1C01A5" strokeWidth={1.8} />
            <text x={x(v)} y={y + 18} textAnchor="middle" fontSize={9} fontWeight={900} fill="#1C01A5">
              {v}
            </text>
          </g>
        ))}
      <line x1={x(target)} y1={y - 22} x2={x(target)} y2={y + 5} stroke="#16A34A" strokeWidth={2.4} />
      <polygon points={`${x(target)},${y - 22} ${x(target) + 14},${y - 17} ${x(target)},${y - 12}`} fill="#16A34A" />
      <text x={x(target)} y={y + 34} textAnchor="middle" fontSize={10} fontWeight={900} fill="#16A34A">
        sasaran {target}
      </text>
    </svg>
  );
}

const TOMBOL_KECIL = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";

/** Satu baris pengatur bilangan: nama, tombol kurang, nilai, tombol tambah. */
function Pengatur({ nama, nilai, batas, min = 0, kurang, tambah }: { nama: string; nilai: number; batas: number; min?: number; kurang: () => void; tambah: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-white px-2 py-1">
      <span className="w-28 text-sm font-black text-[#1C01A5]">{nama}</span>
      <button type="button" className={TOMBOL_KECIL} aria-label={`Kurangi ${nama}`} disabled={nilai <= min} onClick={kurang}>
        -
      </button>
      <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{nilai}</span>
      <button type="button" className={TOMBOL_KECIL} aria-label={`Tambah ${nama}`} disabled={nilai >= batas} onClick={tambah}>
        +
      </button>
    </div>
  );
}

export default function SimulasiRakKotak({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanIsi) => void }) {
  const [k, setK] = useState<KeadaanIsi>(() => awalIsi());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanIsi, ucap?: string) => {
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
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#7C2D12] bg-[#7C2D12] text-white" : "border-[#7C2D12] bg-white text-[#7C2D12]"}`;
  const ganti = (m: ModeIsi) => ubah(pilihModeIsi(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "isi") ubah(ulangIsi(k), "Susunan dikosongkan. Atur lagi banyak kotak dan isinya.");
    else if (k.mode === "tulis") ubah(ulangTulis(k), "Bilangan dikembalikan. Hitung lagi kotak dan isinya.");
    else if (k.mode === "susun") ubah(ulangSusun(k), "Susunan dikosongkan. Atur lagi baris dan kolomnya.");
    else ubah(ulangLompat(k), "Kembali ke nol. Lompat lagi.");
  };
  const ti = tugasIsi(k);
  const wadahIsi: Isi = { wadah: ti.wadah, benda: ti.benda, ikon: ti.ikon };
  const tt = tugasTulis(k);
  const wadahTulis: Isi = { wadah: tt.wadah, benda: tt.benda, ikon: tt.ikon };
  const ts = tugasSusun(k);
  const larik: Larik = { benda: ts.benda, ikon: ts.ikon, r: k.baris, c: k.kolom };
  const tl = tugasLompat(k);

  return (
    <div className="space-y-3" data-uji="simulasi-rak-kotak">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#7C2D12] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Rak Kotak</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_ISI_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#A97B3F] bg-[#FDE9C8] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "isi" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">
              Sasaran: {ti.g} {ti.wadah}, tiap {ti.wadah} berisi {ti.s} {ti.benda}
            </p>
            <KotakIsi banyak={Array.from({ length: k.kotak }, () => k.isi)} rupa="benda" isi={wadahIsi} />
            <div className="mt-2 grid grid-cols-1 gap-1">
              <Pengatur nama={`Banyak ${ti.wadah}`} nilai={k.kotak} batas={BATAS_KOTAK} kurang={() => ubah(ubahKotak(k, -1))} tambah={() => ubah(ubahKotak(k, 1))} />
              <Pengatur nama={`Isi tiap ${ti.wadah}`} nilai={k.isi} batas={BATAS_ISI} kurang={() => ubah(ubahIsi(k, -1))} tambah={() => ubah(ubahIsi(k, 1))} />
            </div>
            <p className="mt-1 text-center text-sm font-black text-[#1C01A5]">{berulangIsi(k) ? `${berulangIsi(k)} = ${jumlahIsi(k)}` : "Atur kotak dan isinya dulu."}</p>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaIsi(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "tulis" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">Hitung kotak dan isinya, lalu tulis perkalian dan tekan Periksa</p>
            <KotakIsi banyak={Array.from({ length: tt.g }, () => tt.s)} rupa="benda" isi={wadahTulis} />
            <div className="mt-2 grid grid-cols-1 gap-1">
              <Pengatur nama="Bilangan pertama" nilai={k.tulisA} batas={BATAS_KOTAK} kurang={() => ubah(ubahTulisA(k, -1))} tambah={() => ubah(ubahTulisA(k, 1))} />
              <Pengatur nama="Bilangan kedua" nilai={k.tulisB} batas={BATAS_ISI} kurang={() => ubah(ubahTulisB(k, -1))} tambah={() => ubah(ubahTulisB(k, 1))} />
            </div>
            <p className="mt-1 text-center text-lg font-black text-[#1C01A5]">
              {k.tulisA} × {k.tulisB} = {k.tulisA * k.tulisB}
            </p>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaTulis(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "susun" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">
              Sasaran: {ts.r} baris dan {ts.c} kolom {ts.benda}
            </p>
            <LarikGambar la={larik} rupa="benda" putar={k.sudahPutar} />
            <div className="mt-2 grid grid-cols-1 gap-1">
              <Pengatur nama="Banyak baris" nilai={k.baris} batas={BATAS_BARIS} kurang={() => ubah(ubahBaris(k, -1))} tambah={() => ubah(ubahBaris(k, 1))} />
              <Pengatur nama="Banyak kolom" nilai={k.kolom} batas={BATAS_BARIS} kurang={() => ubah(ubahKolom(k, -1))} tambah={() => ubah(ubahKolom(k, 1))} />
            </div>
            <p className="mt-1 text-center text-lg font-black text-[#1C01A5]">
              {k.baris} × {k.kolom} = {k.baris * k.kolom}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(putarSusun(k), "Susunan diputar. Baris menjadi kolom dan kolom menjadi baris.")}>
                {"\u{1F504}"} Putar
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaSusun(k))}>
                Periksa
              </button>
              <button type="button" className={tombol} disabled={!k.susunBenar.includes(k.susunIndeks)} onClick={() => ubah(lanjutSusun(k), "Ada sasaran susunan baru.")}>
                Sasaran berikutnya
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "lompat" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">Pilih besar lompatan, lalu lompat sampai tepat di sasaran</p>
            <GarisLompat besar={k.besar} lompatan={k.lompatan} target={tl.target} />
            <div className="mt-2 grid grid-cols-1 gap-1">
              <Pengatur nama="Besar lompatan" nilai={k.besar} batas={BESAR_MAKS} min={BESAR_MIN} kurang={() => ubah(ubahBesar(k, -1))} tambah={() => ubah(ubahBesar(k, 1))} />
            </div>
            <p className="mt-1 text-center text-sm font-black text-[#1C01A5]">
              Posisi {k.posisi}, {k.lompatan} lompatan
            </p>
            <div className="mt-2 flex justify-center gap-2">
              <button type="button" className={tombol} onClick={() => terapkan(lompatSekali(k))}>
                {"\u{1F438}"} Lompat
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiIsi(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatIsi(k)}
      </p>
    </div>
  );
}
