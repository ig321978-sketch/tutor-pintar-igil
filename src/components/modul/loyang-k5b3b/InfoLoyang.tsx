"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  ARSIR,
  BEDA,
  ID_KARTU1,
  ID_KARTU2,
  PETUNJUK1_INFO_LOYANG,
  PETUNJUK2_INFO_LOYANG,
  SEL_KARTU1,
  SEL_KARTU2,
  SELESAI1_INFO_LOYANG,
  SELESAI2_INFO_LOYANG,
  type SelInfo,
} from "./data-kartu";
import { kpk } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan pesanan Pak Seno berpapan jepit kayu: syarat penyebut sama, model arsir satu per delapan + dua per delapan, pembilang dijumlahkan penyebut tetap,
 * dan campuran dengan dua cara. Kartu 2 = loyang gabungan berbingkai logam: KPK empat dan enam, pecahan yang sama besar, jumlah lima per dua belas,
 * campuran berpenyebut beda, dan menyederhanakan hasil. Bar pecahan DIGAMBAR dari data. Sel kosong (?) diketuk, isinya muncul dan dibacakan Guru;
 * kartu berikutnya baru terbuka setelah semua sel terbuka. Digital saja.
 */
const ISI = ["#F59E0B", "#60A5FA"];
const GARIS = ["#B45309", "#1D4ED8"];

/** Bar kecil: `d` sel, `n` sel terisi mulai dari sel ke-`mulai`; warna menurut `w` (0 atau 1). Digambar sungguh sebanyak sel. */
function BarMini({
  id,
  d,
  n,
  mulai = 0,
  w = 0,
  lebar = 124,
}: {
  id: string;
  d: number;
  n: number;
  mulai?: number;
  w?: number;
  lebar?: number;
}) {
  const sw = lebar / d;
  return (
    <svg
      viewBox={`0 0 ${lebar + 4} 14`}
      className="block h-[14px] shrink-0"
      style={{ width: lebar + 4 }}
      role="img"
      aria-label={`Bar ${n} dari ${d} bagian`}
      data-bar-mini={id}
    >
      {Array.from({ length: d }, (_, i) => (
        <rect
          key={`${id}${i}`}
          x={2 + i * sw}
          y={2}
          width={Math.max(1.5, sw - 1)}
          height={10}
          rx={1.5}
          fill={i >= mulai && i < mulai + n ? ISI[w] : "#FFFFFF"}
          stroke={i >= mulai && i < mulai + n ? GARIS[w] : "#94A3B8"}
          strokeWidth={0.9}
        />
      ))}
    </svg>
  );
}

export default function InfoLoyang({
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  speakGuru: (t: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const buka1 = ID_KARTU1.filter((k) => buka.includes(k)).length;
  const buka2 = ID_KARTU2.filter((k) => buka.includes(k)).length;
  const selesai1 = buka1 === ID_KARTU1.length;
  const selesai2 = buka2 === ID_KARTU2.length;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_LOYANG : PETUNJUK2_INFO_LOYANG;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const sel = (
    s: SelInfo,
    judulSel: string,
    isi: React.ReactNode,
    tinggi = "min-h-[44px]",
  ) => {
    const terbuka = buka.includes(s.kunci);
    return (
      <div key={s.kunci} className="min-w-0">
        <button
          type="button"
          onClick={() => ketuk(s.kunci, s.suara)}
          aria-label={terbuka ? s.teks.join(", ") : `Isi kosong: ${judulSel}`}
          className={`flex ${tinggi} w-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border-[3px] px-1 py-1 text-center ${terbuka ? "lm-muncul border-[#B45309] bg-[#FFFBEB] text-[#431407]" : "border-dashed border-[#B45309] bg-white/70 font-black text-[#B45309]"}`}
        >
          {terbuka ? (
            isi
          ) : (
            <span className="text-[12.5px] font-black leading-tight">
              {judulSel} ?
            </span>
          )}
        </button>
      </div>
    );
  };
  const baris = (teks: string[], tebal = true) =>
    teks.map((t) => (
      <span
        key={t}
        className={`block text-[12.5px] leading-tight ${tebal ? "font-black" : "font-bold"}`}
      >
        {t}
      </span>
    ));

  const k1 = SEL_KARTU1;
  const k2 = SEL_KARTU2;
  const m = kpk(BEDA.p, BEDA.q);
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
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">
          {petunjuk}
        </p>
      </div>

      {kartu === 1 ? (
        <div
          className="relative mx-auto w-full max-w-xl rounded-xl border-[7px] border-[#92400E] bg-[#FEF3C7] p-2 pt-4 shadow-[0_5px_0_rgba(120,53,15,0.3)]"
          data-uji="papan-pesanan"
        >
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[-9px] h-4 w-16 -translate-x-1/2 rounded-md border-2 border-[#64748B] bg-[#CBD5E1]"
          />
          <p className="mb-1 text-center text-xs font-black tracking-wide text-[#7C2D12]">
            PAPAN PESANAN PAK SENO · PENYEBUT SAMA
          </p>
          <div className="space-y-1">
            {sel(k1.syarat, "Syarat menjumlahkan", baris(k1.syarat.teks))}
            {sel(
              k1.arsir,
              "Model arsir",
              <>
                <BarMini id="ar1" d={ARSIR.d} n={ARSIR.a} w={0} />
                <BarMini
                  id="ar2"
                  d={ARSIR.d}
                  n={ARSIR.b}
                  mulai={ARSIR.a}
                  w={1}
                />
                {baris(k1.arsir.teks)}
              </>,
              "min-h-[62px]",
            )}
            {sel(k1.tetap, "Pembilang dan penyebut", baris(k1.tetap.teks))}
            <div className="grid grid-cols-2 gap-1">
              {sel(
                k1.cara1,
                "Pecahan campuran",
                <>
                  <span className="block text-[11px] font-black text-[#B45309]">
                    Cara 1
                  </span>
                  {baris(k1.cara1.teks, false)}
                </>,
                "min-h-[70px]",
              )}
              {sel(
                k1.cara2,
                "Pecahan campuran",
                <>
                  <span className="block text-[11px] font-black text-[#B45309]">
                    Cara 2
                  </span>
                  {baris(k1.cara2.teks, false)}
                </>,
                "min-h-[70px]",
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#64748B] bg-[#F1F5F9] p-2 shadow-[0_5px_0_rgba(51,65,85,0.25)]"
          data-uji="loyang-gabungan"
        >
          <p className="mb-1 text-center text-xs font-black tracking-wide text-[#334155]">
            LOYANG GABUNGAN · PENYEBUT BEDA
          </p>
          <div className="space-y-1">
            {sel(k2.kpk, "Penyebut beda", baris(k2.kpk.teks))}
            {sel(
              k2.samakan,
              "Pecahan sama besar",
              <>
                <BarMini id="sm1" d={m} n={(BEDA.a * m) / BEDA.p} w={0} />
                <BarMini id="sm2" d={m} n={(BEDA.b * m) / BEDA.q} w={1} />
                {baris(k2.samakan.teks)}
              </>,
              "min-h-[70px]",
            )}
            {sel(
              k2.jumlah,
              "Jumlahkan",
              <>
                <BarMini id="jm1" d={m} n={(BEDA.a * m) / BEDA.p} w={0} />
                <BarMini
                  id="jm2"
                  d={m}
                  n={(BEDA.b * m) / BEDA.q}
                  mulai={(BEDA.a * m) / BEDA.p}
                  w={1}
                />
                {baris(k2.jumlah.teks)}
              </>,
              "min-h-[62px]",
            )}
            {sel(
              k2.campur,
              "Campuran beda penyebut",
              baris(k2.campur.teks, false),
              "min-h-[58px]",
            )}
            <div className="grid grid-cols-2 gap-1">
              {sel(k2.sed1, "Sederhanakan", baris(k2.sed1.teks))}
              {sel(k2.sed2, "Sederhanakan", baris(k2.sed2.teks))}
            </div>
          </div>
        </div>
      )}

      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]"
      >
        {kartu === 1
          ? selesai1
            ? SELESAI1_INFO_LOYANG
            : `Sudah dibuka ${buka1} dari ${ID_KARTU1.length} kotak.`
          : selesai2
            ? SELESAI2_INFO_LOYANG
            : `Sudah dibuka ${buka2} dari ${ID_KARTU2.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button
            type="button"
            onClick={() => setKartu(1)}
            className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]"
            aria-label="Kembali ke papan pesanan"
          >
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button
            type="button"
            onClick={() => setKartu(2)}
            className={TOMBOL_UTAMA}
          >
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p
        className="text-center text-[11px] font-black text-[#6B7280]"
        aria-label={`Kartu ${kartu} dari 2`}
      >
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}
export { InfoLoyang };
