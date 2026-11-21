"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { KURANG_TEKS, KURSI_BARIS, LANGKAH_KURSI, NOMOR_PAPAN, PETUNJUK_PETA, SELESAI_PETA, TAMBAH_TEKS } from "./data-peta";

/**
 * Mind-map Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan": denah kursi penonton dilihat dari panggung. Lima baris kursi digambar sungguhan
 * (dua belas sampai dua puluh empat kursi, tiap kursi satu gambar kecil) dengan loncatan beda di sela baris, dan papan nomor tampil dengan loncatan kurang lima.
 * Enam label kosong menempel di samping baris yang cocok; ketuk satu per satu, judul langkah muncul dan dibacakan guru. Lanjut setelah semua terbuka. Satu layar tanpa gulir.
 */
const BIRU = "#1C01A5";
const MERAH = "#DC2626";
/** Ukuran denah: lebar gambar 166 (wadah dalam 298 px: gambar 166 + label sisanya), kiri 17 untuk banyak kursi; satu kursi mengambil 6 satuan. */
const LEBAR = 166;
const KIRI = 17;
const LEBAR_KISI = LEBAR - KIRI;
const JARAK = 6;
const LEBAR_KURSI = 4.5;
const TINGGI_BARIS = 44;

function DenahKursi() {
  const tinggi = KURSI_BARIS.length * TINGGI_BARIS;
  return (
    <svg viewBox={`0 0 ${LEBAR} ${tinggi}`} width={LEBAR} height={tinggi} className="shrink-0" role="img" aria-label="denah lima baris kursi, makin ke belakang makin banyak" data-uji="denah-kursi">
      {KURSI_BARIS.map((n, i) => {
        const x0 = KIRI + (LEBAR_KISI - n * JARAK) / 2;
        const y = i * TINGGI_BARIS + 14;
        return (
          <g key={i} data-baris={i} data-banyak={n}>
            <text x={1} y={y + 12} fontSize={12} fontWeight={900} fill={BIRU}>
              {n}
            </text>
            {Array.from({ length: n }, (_, k) => (
              <g key={k} data-kursi="1">
                <rect x={x0 + k * JARAK} y={y} width={LEBAR_KURSI} height={5} rx={1} fill="#B45309" />
                <rect x={x0 + k * JARAK} y={y + 7} width={LEBAR_KURSI} height={9} rx={1.5} fill="#F97316" stroke="#7C2D12" strokeWidth={0.6} />
              </g>
            ))}
            {i < KURSI_BARIS.length - 1 ? (
              <g data-loncat="1">
                <text x={KIRI + LEBAR_KISI / 2} y={y + 34} textAnchor="middle" fontSize={13} fontWeight={900} fill={MERAH}>
                  {`▼ ${TAMBAH_TEKS}`}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

/** Papan nomor tampil: tiga kartu bernomor dan satu kartu kosong, tiap pasangan dihubungkan lengkung loncatan kurang lima. */
function PapanNomor() {
  const lebarKartu = 30;
  const jeda = 10;
  const x0 = 8;
  const kartu = [...NOMOR_PAPAN, null];
  return (
    <svg viewBox={`0 0 ${LEBAR} 70`} width={LEBAR} height={70} className="shrink-0" role="img" aria-label="papan nomor tampil, tiga nomor makin kecil" data-uji="papan-nomor">
      <rect x={2} y={2} width={LEBAR - 4} height={66} rx={8} fill="#FEF3C7" stroke="#B45309" strokeWidth={2} />
      {kartu.map((n, i) => {
        const x = x0 + i * (lebarKartu + jeda);
        return (
          <g key={i} data-nomor={n ?? "kosong"}>
            <rect x={x} y={10} width={lebarKartu} height={30} rx={5} fill={n === null ? "#FFFFFF" : "#FDBA74"} stroke="#7C2D12" strokeWidth={2} strokeDasharray={n === null ? "4 3" : undefined} />
            {n !== null ? (
              <text x={x + lebarKartu / 2} y={31} textAnchor="middle" fontSize={14} fontWeight={900} fill={BIRU}>
                {n}
              </text>
            ) : null}
            {i < kartu.length - 1 ? (
              <g>
                <path d={`M${x + lebarKartu / 2} 40 Q${x + lebarKartu + jeda / 2} 54 ${x + lebarKartu + jeda + lebarKartu / 2} 40`} fill="none" stroke={MERAH} strokeWidth={2} />
                <text x={x + lebarKartu + jeda / 2} y={64} textAnchor="middle" fontSize={12} fontWeight={900} fill={MERAH}>
                  {KURANG_TEKS}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export default function BarisKursiK4B3({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<number[]>([]);
  const selesai = buka.length === LANGKAH_KURSI.length;
  const ketuk = (n: number) => {
    speakGuru(LANGKAH_KURSI[n].arti);
    if (!buka.includes(n)) setBuka((b) => [...b, n]);
  };
  const tombol = (n: number, tinggi: number) => {
    const l = LANGKAH_KURSI[n];
    const terbuka = buka.includes(n);
    return (
      <div key={l.judul} className="flex items-center" style={{ height: tinggi }}>
        <button
          type="button"
          onClick={() => ketuk(n)}
          aria-label={terbuka ? `Langkah ${n + 1}: ${l.judul}` : `Label kosong langkah ${n + 1}`}
          data-label={n}
          className={`flex min-h-[44px] w-full min-w-0 items-center gap-1 rounded-xl border-[3px] px-1 py-0.5 text-left text-[12px] font-black leading-[1.1] text-[#1C01A5] ${terbuka ? "lm-muncul border-[#15803D] bg-[#BBF7D0]" : "border-dashed border-[#B45309] bg-white/80"}`}
        >
          <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] text-white ${terbuka ? "bg-[#15803D]" : "bg-[#B45309]"}`}>
            {n + 1}
          </span>
          <span className="min-w-0 break-words">{terbuka ? l.judul : "?"}</span>
        </button>
      </div>
    );
  };
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(PETUNJUK_PETA)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{PETUNJUK_PETA}</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[3px] border-[#9A3412] bg-[#FFFBEB] p-1 shadow-[0_6px_0_rgba(0,0,0,0.25)]" data-uji="denah-konser">
        <div className="mb-1 rounded-t-3xl bg-[#7C2D12] py-0.5 text-center text-[12px] font-black tracking-widest text-[#FDE68A]" data-uji="panggung">
          PANGGUNG
        </div>
        <div className="grid grid-cols-[166px_minmax(0,1fr)] items-start gap-0.5">
          <DenahKursi />
          <div>{KURSI_BARIS.map((_, i) => tombol(i, TINGGI_BARIS))}</div>
        </div>
        <p className="mt-1 text-center text-[12px] font-black text-[#7C2D12]">Papan nomor tampil</p>
        <div className="grid grid-cols-[166px_minmax(0,1fr)] items-center gap-0.5">
          <PapanNomor />
          {tombol(KURSI_BARIS.length, 70)}
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {selesai ? SELESAI_PETA : `Sudah dibuka ${buka.length} dari ${LANGKAH_KURSI.length} langkah.`}
      </p>
      {selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export { BarisKursiK4B3 };
