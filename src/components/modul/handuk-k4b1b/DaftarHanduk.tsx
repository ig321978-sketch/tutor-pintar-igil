"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  ANGKA_TUKAR,
  BAGAN_GUDANG,
  JUDUL_KARTU1_GUDANG,
  KARTU_JENIS,
  PETUNJUK1_INFO_GUDANG,
  PETUNJUK2_INFO_GUDANG,
  SEL_TOTAL_GUDANG,
  SELESAI1_INFO_GUDANG,
  SELESAI2_INFO_GUDANG,
  TEMPAT_GUDANG,
  WARNA_TEMPAT_GUDANG,
  titik,
  type KartuJenis,
  type SelInfo,
} from "./data-info";

/**
 * Infografis Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = empat kartu jenis gudang dengan gambar sebanyak datanya (dua peti, tiga kotak, tidak ada ikat, empat lembar); tempat angka dan isi lembar tiap jenis tertutup (?), begitu juga jumlah seluruhnya.
 * Kartu 2 = dua bagan tempat (2.304 dan setelah tukar 3.204); arti angka dua, arti angka tiga, dan bacaan tertutup sampai diketuk. Digital saja.
 */
function Gambar({ j }: { j: KartuJenis }) {
  const n = j.jumlah;
  const label = n === 0 ? `tidak ada ${j.nama}` : `${n} ${j.nama}`;
  return (
    <svg viewBox="0 0 120 36" className="h-7 w-full max-w-[110px]" role="img" aria-label={label} data-jumlah={n} data-jenis={j.id}>
      {n === 0 ? <rect x={4} y={4} width={112} height={28} rx={6} fill="none" stroke="#9CA3AF" strokeWidth={2.5} strokeDasharray="6 4" /> : null}
      {Array.from({ length: n }, (_, k) => {
        if (j.id === "peti")
          return (
            <g key={k}>
              <rect x={4 + k * 48} y={4} width={42} height={30} fill="#D97706" stroke="#78350F" strokeWidth={2.5} />
              <line x1={4 + k * 48} y1={14} x2={46 + k * 48} y2={14} stroke="#78350F" strokeWidth={2} />
              <line x1={4 + k * 48} y1={24} x2={46 + k * 48} y2={24} stroke="#78350F" strokeWidth={2} />
            </g>
          );
        if (j.id === "kotak")
          return (
            <g key={k}>
              <rect x={4 + k * 38} y={8} width={34} height={26} fill="#F59E0B" stroke="#78350F" strokeWidth={2.5} />
              <line x1={21 + k * 38} y1={8} x2={21 + k * 38} y2={34} stroke="#FEF3C7" strokeWidth={4} />
            </g>
          );
        return (
          <g key={k}>
            <rect x={4 + k * 28} y={14} width={24} height={18} rx={3} fill={["#38BDF8", "#FB923C", "#4ADE80", "#F472B6"][k % 4]} stroke="#1F2937" strokeWidth={2} />
            <line x1={8 + k * 28} y1={23} x2={24 + k * 28} y2={23} stroke="#FFFFFF" strokeWidth={2} opacity={0.8} />
          </g>
        );
      })}
    </svg>
  );
}

export default function DaftarHandukK4B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const ids1 = [...KARTU_JENIS.flatMap((j) => [j.tempatSel.id, j.lembarSel.id]), SEL_TOTAL_GUDANG.id];
  const ids2 = BAGAN_GUDANG.flatMap((b) => [b.artiDua.id, b.artiTiga.id, b.baca.id]);
  const buka1 = ids1.filter((i) => buka.includes(i)).length;
  const buka2 = ids2.filter((i) => buka.includes(i)).length;
  const selesai1 = buka1 === ids1.length;
  const selesai2 = buka2 === ids2.length;
  const ketuk = (s: SelInfo) => {
    speakGuru(s.suara);
    if (!buka.includes(s.id)) setBuka((b) => [...b, s.id]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_GUDANG : PETUNJUK2_INFO_GUDANG;

  const sel = (s: SelInfo, aria: string, tinggi = "min-h-[40px]") => {
    const t = buka.includes(s.id);
    return (
      <button
        key={s.id}
        type="button"
        onClick={() => ketuk(s)}
        aria-label={t ? `${aria}: ${s.tampil}` : `Isi kosong: ${aria}`}
        className={`flex ${tinggi} w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-0.5 text-center font-black leading-tight tracking-tight ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[11px] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-xl text-[#B45309]"}`}
      >
        <span className="min-w-0 break-words">{t ? s.tampil : "?"}</span>
      </button>
    );
  };

  return (
    <div className="space-y-1.5" data-uji="info-gudang">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border-[4px] border-[#78350F] bg-[#F5E6C8] p-1 shadow-[0_5px_0_rgba(120,53,15,0.4)]" data-uji="isi-gudang">
          <p className="mb-1.5 rounded-md bg-[#78350F] py-0.5 text-center text-sm font-black text-[#FDE68A]">{JUDUL_KARTU1_GUDANG}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {KARTU_JENIS.map((j) => (
              <div key={j.id} className="rounded-xl border-2 bg-[#FFF8E7] p-1" style={{ borderColor: j.warna }} data-jenis={j.id}>
                <div className="flex items-center justify-between gap-1">
                  <Gambar j={j} />
                </div>
                <p className="mt-0.5 text-center text-sm font-black text-[#78350F]">
                  {j.jumlah} {j.nama}
                </p>
                <div className="mt-1 grid grid-cols-2 gap-1">
                  <div className="space-y-0.5">
                    <p className="text-center text-[10px] font-black text-[#78350F]">tempat</p>
                    {sel(j.tempatSel, `${j.nama}, tempat angka`)}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-center text-[10px] font-black text-[#78350F]">isinya</p>
                    {sel(j.lembarSel, `${j.nama}, isi lembar`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-xl border-[3px] border-[#78350F] bg-[#FFF8E7] p-1.5">
            <span className="shrink-0 text-xs font-black leading-tight text-[#78350F]">seluruh handuk</span>
            <div className="min-w-0 flex-1">{sel(SEL_TOTAL_GUDANG, "jumlah seluruh handuk")}</div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[320px] rounded-2xl border-[6px] border-[#0369A1] bg-[#E0F2FE] p-2 shadow-[0_5px_0_rgba(3,105,161,0.4)]" data-uji="tukar-gudang">
                    <div className="space-y-1.5">
            {BAGAN_GUDANG.map((b, bi) => (
              <React.Fragment key={b.id}>
                {bi === 1 ? (
                  <p className="text-center text-[12px] font-black text-[#0C4A6E]" aria-label={`Angka ${ANGKA_TUKAR[0]} dan ${ANGKA_TUKAR[1]} bertukar tempat`}>
                    {"\u{1F501}"} tukar angka {ANGKA_TUKAR[0]} dan {ANGKA_TUKAR[1]}: angka sama, tempat beda
                  </p>
                ) : null}
                <div className="rounded-xl bg-white/85 p-1.5" data-bilangan={b.bilangan}>
                  <p className="mb-1 text-center text-[11px] font-black text-[#0C4A6E]">
                    {b.judul}: {titik(b.bilangan)}
                  </p>
                  <div className="grid grid-cols-4 gap-1">
                    {b.digit.map((d, i) => (
                      <div key={i} className="space-y-0.5">
                        <p className="text-center text-[11px] font-black" style={{ color: WARNA_TEMPAT_GUDANG[i] }}>
                          {TEMPAT_GUDANG[i]}
                        </p>
                        <p className={`flex h-8 items-center justify-center rounded-lg text-2xl font-black text-white ${ANGKA_TUKAR.includes(d as 2 | 3) ? "ring-4 ring-[#FDE047]" : ""}`} style={{ background: WARNA_TEMPAT_GUDANG[i] }} data-angka={d}>
                          {d}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-[1fr_1fr_1.8fr] gap-1">
                    <div className="space-y-0.5">
                      <p className="text-center text-[10px] font-black text-[#0C4A6E]">arti angka 2</p>
                      {sel(b.artiDua, `arti angka dua pada ${titik(b.bilangan)}`, "min-h-[36px]")}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-center text-[10px] font-black text-[#0C4A6E]">arti angka 3</p>
                      {sel(b.artiTiga, `arti angka tiga pada ${titik(b.bilangan)}`, "min-h-[36px]")}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-center text-[10px] font-black text-[#0C4A6E]">dibaca</p>
                      {sel(b.baca, `bacaan ${titik(b.bilangan)}`, "min-h-[36px]")}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_GUDANG : `Sudah dibuka ${buka1} dari ${ids1.length} kotak.`) : selesai2 ? SELESAI2_INFO_GUDANG : `Sudah dibuka ${buka2} dari ${ids2.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke isi gudang">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
    </div>
  );
}
export { DaftarHandukK4B1 };
