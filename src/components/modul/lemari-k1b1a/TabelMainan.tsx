"use client";

import React, { useState } from "react";
import { BARIS_RAK, EMOJI, NAMA } from "./data";
import { kata } from "./logika";
import { CSS_LEMARI, TOMBOL_UTAMA } from "./ui";

/**
 * PILOT Infografis Kelas 1 Bab 1 Sub-Bab A: tabel DATA mainan Igil dari cerita (jenis, gambar, kata, angka).
 * Judul kolom SELALU tampil. Yang dikosongkan adalah ISI TABEL (tiap sel): anak mengetuk sel satu per satu,
 * lalu isinya muncul dan dibacakan guru. Digital saja (tanpa kanvas dan tanpa rekam suara).
 */
const KOLOM = ["Mainan", "Gambar", "Kata", "Angka"] as const;
type Kol = (typeof KOLOM)[number];
/** Tabel bantu Angka dan Kata untuk bilangan materi Sub-Bab A: nol sampai sepuluh. */
const DERET_ANGKA = Array.from({ length: 11 }, (_, i) => i);
const GRID ="grid-cols-[3.4rem_1fr_3.4rem_3.2rem]";

export default function TabelMainan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const total = BARIS_RAK.length * KOLOM.length;
  const petunjuk = kartu === 1 ? "Tabel mainan Igil. Ketuk tanda tanya di tiap kotak untuk melihat isinya." : "Angka dan kata untuk nol sampai sepuluh. Ketuk satu baris untuk mendengar katanya.";
  const selesai = buka.length === total;

  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };

  /** Satu sel isi tabel: kosong bertanda tanya sampai diketuk. */
  const sel = (jenis: string, n: number, kol: Kol) => {
    const kunci = `${jenis}-${kol}`;
    const terbuka = buka.includes(kunci);
    const nama = NAMA[jenis];
    const suara =
      kol === "Mainan" ? `Mainan ini adalah ${nama}.` : kol === "Gambar" ? (n === 0 ? `Tidak ada ${nama}, kotaknya kosong.` : `Gambar ${kata(n)} ${nama}.`) : kol === "Kata" ? `Dibaca ${kata(n)}.` : `Angkanya ${kata(n)}.`;
    const isi =
      kol === "Mainan" ? (
        <div className="flex flex-col items-center leading-none">
          <span className="text-2xl" aria-hidden="true">
            {EMOJI[jenis]}
          </span>
          <span className="mt-0.5 text-[10px] font-black text-[#78350F]">{nama}</span>
        </div>
      ) : kol === "Gambar" ? (
        <div className="grid w-full grid-cols-5 gap-0.5" role="img" aria-label={`${n} ${nama}`} data-banyak={n}>
          {n === 0 ? (
            <span className="col-span-5 text-center text-[11px] font-black leading-7 text-[#78350F]">kosong</span>
          ) : (
            Array.from({ length: n }, (_, i) => (
              <span key={i} aria-hidden="true" className="flex items-center justify-center text-base leading-none">
                {EMOJI[jenis]}
              </span>
            ))
          )}
        </div>
      ) : kol === "Kata" ? (
        <span className="text-xs font-black text-[#1C01A5]">{kata(n)}</span>
      ) : (
        <span className="text-2xl font-black text-[#1C01A5]">{n}</span>
      );
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={terbuka ? `${kol}: ${kol === "Gambar" ? `${n} ${nama}` : kol === "Mainan" ? nama : kata(n)}` : `Isi kosong, kolom ${kol}, baris ${nama}`}
        className={`flex min-h-[48px] items-center justify-center rounded-lg border-[3px] px-0.5 text-center ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5]" : "border-dashed border-[#B45309] bg-white/80 text-lg font-black text-[#B45309]"}`}
      >
        {terbuka ? isi : "?"}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button
          type="button"
          onClick={() => speakGuru(petunjuk)}
          className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm"
          aria-label="Dengar petunjuk"
        >
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#78350F] bg-[#FFF8E7] p-2 shadow-[0_5px_0_rgba(120,53,15,0.4)]">
          <div className={`mb-1.5 grid ${GRID} items-center gap-1.5`}>
            {KOLOM.map((k) => (
              <span key={k} className="rounded-lg bg-[#78350F] py-1.5 text-center text-xs font-black text-[#FDE68A] sm:text-sm">
                {k}
              </span>
            ))}
          </div>
          {BARIS_RAK.map((b) => (
            <div key={b.jenis} className={`grid ${GRID} items-center gap-1.5 border-t-2 border-[#E8C48F] py-1`}>
              {KOLOM.map((k) => sel(b.jenis, b.n, k))}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#1C01A5] bg-[#F5F3FF] p-2 shadow-[0_5px_0_rgba(28,1,165,0.3)]" data-uji="angka-kata">
          <div className="grid grid-cols-2 gap-2">
            {[DERET_ANGKA.slice(0, 6), DERET_ANGKA.slice(6)].map((blok, q) => (
              <div key={q}>
                <div className="mb-1 grid grid-cols-[2.6rem_1fr] gap-1">
                  {["Angka", "Kata"].map((k) => (
                    <span key={k} className="rounded-md bg-[#78350F] py-1 text-center text-[11px] font-black text-[#FDE68A]">
                      {k}
                    </span>
                  ))}
                </div>
                {blok.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => speakGuru(`${kata(n)}.`)}
                    aria-label={`Angka ${kata(n)}`}
                    className="grid min-h-[46px] w-full grid-cols-[2.6rem_1fr] items-center gap-1 border-t-2 border-[#DDD6FE] active:bg-[#EDE9FE]"
                  >
                    <span className="text-center text-2xl font-black leading-none text-[#1C01A5]">{n}</span>
                    <span className="text-center text-sm font-black text-[#1C01A5]">{kata(n)}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai ? "Tabel lengkap! Gambar, kata, dan angkanya sama." : `Sudah dibuka ${buka.length} dari ${total} kotak.`) : "Ketuk satu baris untuk mendengar katanya."}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke tabel mainan">
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
