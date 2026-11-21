"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  BARAT_I,
  DATA_INFO,
  KOLOM_INFO_TRIBUN,
  KOLOM_PAPAN_NAMA,
  PESAN2_INFO_TRIBUN,
  PETUNJUK1_INFO_TRIBUN,
  PETUNJUK2_INFO_TRIBUN,
  SELESAI1_INFO_TRIBUN,
  digitBarat,
  kalimatAcuan,
  papanTribun,
  periodeBarat,
  suaraSel,
  teksBacaTribun,
} from "./data-kartu";
import { kolomNol, lambang, tataTempat } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 1 Sub-Bab A "Tiket Tribun Bu Ningsih" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan angka empat tribun, berlatar hijau tua berbingkai kayu: tiap tribun punya nama, tabel tempat lima kolom (angka sungguh di kolomnya, nol penjaga kuning),
 * angka bertitik, dan bacaannya; judul kolom tampil, isi kotak kosong (?) sampai diketuk lalu dibacakan Guru. Kartu 2 = kartu acuan: tabel Barat dengan periode kiri dan kanan,
 * lalu lima kolom, nol penjaga, titik pemisah, baca per periode, uraian, dan bilangan paling besar seratus ribu. Digital saja.
 */
const JUMLAH = DATA_INFO.length;
const TOTAL = JUMLAH * 4;

/** Tabel tempat tribun i: lima kotak tempat dengan angka sungguh; nol penjaga kuning, kotak di kiri angka pertama kosong. */
function TabelMini({ i }: { i: number }) {
  const p = papanTribun(i);
  return (
    <span className="grid w-full grid-cols-5 gap-1" data-tabel={i}>
      {p.map((a, j) => (
        <span
          key={j}
          data-angka={a === null ? "" : a}
          className={`flex h-6 items-center justify-center rounded-md border-2 text-base font-black leading-none ${a === null ? "border-dashed border-[#FDE68A]/50 text-transparent" : a === 0 ? "border-[#B45309] bg-[#FACC15] text-[#451A03]" : "border-[#FEF9C3] bg-[#FEF9C3] text-[#14532D]"}`}
        >
          {a === null ? "-" : a}
        </span>
      ))}
    </span>
  );
}

/** Tabel Barat pada kartu acuan: kotak tempat, titik pemisah, dan dua periode. */
function TabelPeriode() {
  const t = tataTempat(5, true);
  const d = digitBarat();
  const nolDariKiri = kolomNol(DATA_INFO[BARAT_I].n).map((k) => 4 - k);
  /* Kotak tempat di y 28 sampai 66; kurung periode di bawahnya. */
  const yAtas = 28;
  const yBrace = yAtas + 38 + 12;
  const kiriX1 = t.sel[0].x + 3;
  const kiriX2 = t.sel[1].x + t.sel[1].w - 3;
  const kananX1 = t.sel[2].x + 3;
  const kananX2 = t.sel[4].x + t.sel[4].w - 3;
  const p = periodeBarat();
  return (
    <svg viewBox={`0 0 300 ${yBrace + 36}`} className="mb-1.5 block h-auto w-full" role="img" aria-label={`Tabel tempat ${lambang(DATA_INFO[BARAT_I].n)} dengan periode kiri dan periode kanan`} data-tabel="periode">
      {t.sel.map((s, i) => (
        <g key={i} data-angka={d[i]}>
          {(s.kolom === 4 ? ["puluh", "ribuan"] : [KOLOM_PAPAN_NAMA[i]]).map((b, j, arr) => (
            <text key={b} x={s.x + s.w / 2} y={arr.length === 1 ? 21 : 12 + j * 11} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#7C2D12">
              {b}
            </text>
          ))}
          <rect x={s.x + 2} y={yAtas} width={s.w - 4} height={38} rx={6} fill={nolDariKiri.includes(i) ? "#FACC15" : "#FEF9C3"} stroke="#B45309" strokeWidth={1.8} />
          <text x={s.x + s.w / 2} y={yAtas + 28} textAnchor="middle" fontSize={22} fontWeight={900} fill="#14532D">
            {d[i]}
          </text>
        </g>
      ))}
      {t.titikX !== null ? <circle cx={t.titikX} cy={yAtas + 32} r={3.4} fill="#B91C1C" /> : null}
      <path d={`M${kiriX1} ${yBrace - 6} v6 h${kiriX2 - kiriX1} v-6`} fill="none" stroke="#1D4ED8" strokeWidth={2} />
      <path d={`M${kananX1} ${yBrace - 6} v6 h${kananX2 - kananX1} v-6`} fill="none" stroke="#B91C1C" strokeWidth={2} />
      <text x={(kiriX1 + kiriX2) / 2} y={yBrace + 16} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1E3A8A">
        {`periode kiri: ${p.kiri}`}
      </text>
      <text x={(kananX1 + kananX2) / 2} y={yBrace + 16} textAnchor="middle" fontSize={11} fontWeight={900} fill="#991B1B">
        {`periode kanan: ${p.kanan}`}
      </text>
      <text x={150} y={yBrace + 31} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#7C2D12">
        kotak kuning: nol penjaga
      </text>
    </svg>
  );
}

export default function InfoTribun({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const selesai = buka.length === TOTAL;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_TRIBUN : PETUNJUK2_INFO_TRIBUN;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const sel = (kunci: string, suara: string, isi: React.ReactNode, aria: string, kelas = "min-h-[24px]") => {
    const terbuka = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={terbuka ? aria : "Isi kosong"}
        className={`flex ${kelas} w-full min-w-0 items-center justify-center rounded-lg border-[3px] px-0.5 text-center ${terbuka ? "lm-muncul border-[#BBF7D0] bg-[#14532D]/70 text-white" : "border-dashed border-[#FDE68A] bg-black/20 text-lg font-black text-[#FDE68A]"}`}
      >
        {terbuka ? isi : "?"}
      </button>
    );
  };

  const kalimat = kalimatAcuan();
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[7px] border-[#92400E] bg-[#14532D] p-2 shadow-[0_5px_0_rgba(0,0,0,0.3)]" data-uji="papan-tribun">
          <p className="mb-1 text-center text-xs font-black tracking-wide text-[#FDE68A]">{"⚽"} PAPAN ANGKA STADION KOTA · kuning = nol penjaga</p>
          <div className="mb-1 grid grid-cols-[3.8rem_1fr] items-end gap-1">
            <span className="rounded-md bg-[#FDE68A] py-1 text-center text-[11px] font-black leading-tight text-[#7C2D12]">{KOLOM_INFO_TRIBUN[0]}</span>
            <span className="grid grid-cols-5 gap-1 px-[3px]">
              {KOLOM_PAPAN_NAMA.map((n) => (
                <span key={n} className="rounded-md bg-[#FDE68A] px-0 py-0.5 text-center text-[10px] font-black leading-[11px] tracking-tighter text-[#7C2D12]">
                  {n === "puluh ribuan" ? (
                    <>
                      puluh
                      <br />
                      ribuan
                    </>
                  ) : (
                    n
                  )}
                </span>
              ))}
            </span>
          </div>
          <div className="space-y-1">
            {DATA_INFO.map((t, i) => (
              <div key={t.nama} className="space-y-0.5 rounded-xl border-b-2 border-dashed border-[#FDE68A]/50 pb-0.5">
                <div className="grid grid-cols-[3.8rem_1fr] gap-1">
                  {sel(`${i}-0`, suaraSel(i, 0), <span className="text-[11px] font-black leading-tight">{t.nama}</span>, `Tribun ${t.nama}`, "min-h-[32px]")}
                  {sel(`${i}-2`, suaraSel(i, 2), <TabelMini i={i} />, `Tabel tempat tribun ${t.nama}`, "min-h-[32px]")}
                </div>
                <div className="grid grid-cols-[3.8rem_1fr] gap-1">
                  {sel(`${i}-1`, suaraSel(i, 1), <span className="text-[13px] font-black text-[#FDE68A]">{lambang(t.n)}</span>, `Angka ${lambang(t.n)}`)}
                  {sel(`${i}-3`, suaraSel(i, 3), <span className="text-[11px] font-black leading-tight">{teksBacaTribun(i)}</span>, `Dibaca ${teksBacaTribun(i)}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#FFFBEB] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="kartu-acuan">
          <TabelPeriode />
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
        {kartu === 1 ? (selesai ? SELESAI1_INFO_TRIBUN : `Sudah dibuka ${buka.length} dari ${TOTAL} kotak.`) : PESAN2_INFO_TRIBUN}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan angka">
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
export { InfoTribun };
