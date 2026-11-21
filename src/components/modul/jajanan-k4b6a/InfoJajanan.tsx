"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  DATA_INFO,
  IKON_LEMPER_SKALA_LIMA,
  IKON_LEMPER_SKALA_SATU,
  KOLOM_INFO_JAJANAN,
  LEMPER_I,
  PESAN2_INFO_JAJANAN,
  PETUNJUK1_INFO_JAJANAN,
  PETUNJUK2_INFO_JAJANAN,
  SELESAI1_INFO_JAJANAN,
  ikonInfo,
  jumlahIkonInfo,
  jumlahPorsiInfo,
  kalimatAcuan,
  porsiInfo,
  suaraJumlah,
  suaraSel,
} from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 6 Sub-Bab A "Piktogram Jajanan Bu Rini" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan data bazar berbingkai kayu, berlatar hijau tua seperti papan kapur: tabel jajanan (gambar dan kata, ikon digambar sungguh sebanyak data, banyak porsi)
 * dan baris jumlah; judul kolom tampil, isi sel kosong (?) sampai diketuk lalu dibacakan Guru. Kartu 2 = kartu acuan: lemper dengan skala satu dan skala lima (data sama),
 * lalu paling banyak dan paling sedikit, selisih, dan jumlah. Digital saja.
 */
const GRID = "grid-cols-[4.4rem_1fr_3.4rem]";
const JUMLAH_BARIS = DATA_INFO.seri.length;

function DeretIkon({ ikon, n }: { ikon: string; n: number }) {
  return (
    <svg viewBox={`0 0 ${n * 17} 20`} style={{ width: n * 17, maxWidth: "100%" }} className="block h-[20px]" role="img" aria-label={`${n} ikon`} data-ikon={n}>
      {Array.from({ length: n }, (_, i) => (
        <text key={i} x={i * 17 + 8.5} y={16} textAnchor="middle" fontSize={15}>
          {ikon}
        </text>
      ))}
    </svg>
  );
}

export default function InfoJajanan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const total = (JUMLAH_BARIS + 1) * KOLOM_INFO_JAJANAN.length;
  const selesai = buka.length === total;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_JAJANAN : PETUNJUK2_INFO_JAJANAN;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const sel = (kunci: string, suara: string, isi: React.ReactNode, aria: string) => {
    const terbuka = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={terbuka ? aria : "Isi kosong"}
        className={`flex min-h-[46px] items-center justify-center rounded-lg border-[3px] px-0.5 text-center ${terbuka ? "lm-muncul border-[#BBF7D0] bg-[#14532D]/70 text-white" : "border-dashed border-[#FDE68A] bg-black/20 text-lg font-black text-[#FDE68A]"}`}
      >
        {terbuka ? isi : "?"}
      </button>
    );
  };

  const kalimat = kalimatAcuan();
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[7px] border-[#92400E] bg-[#14532D] p-2 shadow-[0_5px_0_rgba(0,0,0,0.3)]" data-uji="tabel-data">
          <p className="mb-1.5 text-center text-xs font-black tracking-wide text-[#FDE68A]">PAPAN DATA BAZAR · 1 ikon = {DATA_INFO.skala} porsi</p>
          <div className={`mb-1.5 grid ${GRID} items-center gap-1`}>
            {KOLOM_INFO_JAJANAN.map((k) => (
              <span key={k} className="rounded-md bg-[#FDE68A] py-1 text-center text-xs font-black text-[#7C2D12]">
                {k}
              </span>
            ))}
          </div>
          <div className="space-y-1">
            {DATA_INFO.seri.map((s, i) => (
              <div key={s.nama} className={`grid ${GRID} items-center gap-1`}>
                {sel(
                  `${i}-0`,
                  suaraSel(i, 0),
                  <span className="flex flex-col items-center leading-tight">
                    <span className="text-xl">{s.ikon}</span>
                    <span className="text-[10px] font-black">{s.nama}</span>
                  </span>,
                  `Jajanan: ${s.nama}`,
                )}
                {sel(`${i}-1`, suaraSel(i, 1), <DeretIkon ikon={s.ikon} n={ikonInfo(i)} />, `Ikon: ${ikonInfo(i)}`)}
                {sel(
                  `${i}-2`,
                  suaraSel(i, 2),
                  <span className="flex flex-col items-center leading-tight">
                    <span className="text-lg font-black text-[#FDE68A]">{porsiInfo(i)}</span>
                    <span className="text-[9px] font-black">porsi</span>
                  </span>,
                  `Porsi: ${porsiInfo(i)}`,
                )}
              </div>
            ))}
            <div className={`grid ${GRID} items-center gap-1 border-t-2 border-dashed border-[#FDE68A]/60 pt-1`}>
              {sel(`${JUMLAH_BARIS}-0`, suaraJumlah(0), <span className="text-[11px] font-black">Jumlah</span>, "Jumlah")}
              {sel(`${JUMLAH_BARIS}-1`, suaraJumlah(1), <span className="text-sm font-black">{jumlahIkonInfo()} ikon</span>, `Jumlah ikon: ${jumlahIkonInfo()}`)}
              {sel(`${JUMLAH_BARIS}-2`, suaraJumlah(2), <span className="text-lg font-black text-[#FDE68A]">{jumlahPorsiInfo()}</span>, `Jumlah porsi: ${jumlahPorsiInfo()}`)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#FFFBEB] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="kartu-acuan">
          <svg viewBox="0 0 300 70" className="mb-1.5 block h-auto w-full" role="img" aria-label="Lemper dengan skala satu dan skala lima">
            <text x={4} y={11} fontSize={11} fontWeight={900} fill="#7C2D12">
              {`skala satu (1 ikon = 1 porsi): ${IKON_LEMPER_SKALA_SATU()} ikon`}
            </text>
            {Array.from({ length: IKON_LEMPER_SKALA_SATU() }, (_, i) => (
              <text key={i} x={12 + i * 19} y={28} textAnchor="middle" fontSize={14}>
                {DATA_INFO.seri[LEMPER_I].ikon}
              </text>
            ))}
            <text x={4} y={44} fontSize={11} fontWeight={900} fill="#7C2D12">
              {`skala lima (1 ikon = ${DATA_INFO.skala} porsi): ${IKON_LEMPER_SKALA_LIMA()} ikon`}
            </text>
            {Array.from({ length: IKON_LEMPER_SKALA_LIMA() }, (_, i) => (
              <text key={i} x={20 + i * 32} y={64} textAnchor="middle" fontSize={18}>
                {DATA_INFO.seri[LEMPER_I].ikon}
              </text>
            ))}
          </svg>
          <div className="space-y-1">
            {kalimat.map((s) => (
              <button key={s.teks} type="button" onClick={() => speakGuru(s.suara)} className="w-full rounded-xl bg-[#DCFCE7] px-2 py-1 text-center text-[13px] font-black leading-tight text-[#14532D]">
                {"\u{1F50A}"} {s.teks}
              </button>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai ? SELESAI1_INFO_JAJANAN : `Sudah dibuka ${buka.length} dari ${total} kotak.`) : PESAN2_INFO_JAJANAN}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan data">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}
export { InfoJajanan };
