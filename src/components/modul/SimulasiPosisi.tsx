"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { Pengatur } from "./komponen-lab";
import {
  KUPU,
  MAKS_TINGGI,
  MIN_TINGGI,
  TINGGI_AWAL,
  bandingPosisi,
  kalimatPalingPosisi,
  pilihKupu,
  ubahTinggi,
  ucapanPosisi,
} from "./lab-posisi-bab7";
import type { KeadaanPosisi } from "./misi-bab7";

/* ------------------------------------------------------------------------ */
/* Tinggi dan Rendah (Bab 7, Sub-Bab A), metode PhET.                         */
/* Tiga kupu-kupu: naikkan, turunkan, lalu baca lebih tinggi, lebih rendah,   */
/* paling tinggi, paling rendah. Tanpa angka. Logika di lab-posisi-bab7.ts.   */
/* Tanpa jaringan.                                                            */
/* ------------------------------------------------------------------------ */

const TINGGI_SVG = 190;
const DASAR = 176;
const LANGKAH = 15;

export default function SimulasiPosisi({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPosisi) => void }) {
  const [tinggi, setTinggi] = useState<number[]>(TINGGI_AWAL);
  const [dipilih, setDipilih] = useState<number[]>([]);
  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  useEffect(() => {
    lapor.current?.({ alat: "posisi", tinggi, dipilih });
  }, [tinggi, dipilih]);
  const reset = () => {
    setTinggi(TINGGI_AWAL);
    setDipilih([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Tinggi dan Rendah</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Naikkan atau turunkan kupu-kupu. Lalu baca siapa yang lebih tinggi.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan posisi ini" onClick={() => speakGuru(ucapanPosisi(tinggi, dipilih))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <svg viewBox={`0 0 300 ${TINGGI_SVG}`} className="mx-auto block w-full max-w-[420px] rounded-2xl bg-[#DBEAFE]" role="group" aria-label="Tiga kupu-kupu terbang">
          <rect x="0" y={DASAR + 6} width="300" height={TINGGI_SVG - DASAR - 6} fill="#86EFAC" />
          {KUPU.map((k, i) => {
            const terpilih = dipilih.includes(i);
            const cx = 55 + i * 95;
            const cy = DASAR - tinggi[i] * LANGKAH;
            return (
              <g
                key={k.nama}
                role="button"
                tabIndex={0}
                aria-label={`Kupu-kupu ${k.nama}${terpilih ? ", dipilih" : ""}`}
                aria-pressed={terpilih}
                className="cursor-pointer"
                onClick={() => setDipilih(pilihKupu(dipilih, i))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDipilih(pilihKupu(dipilih, i));
                  }
                }}
              >
                <line x1={cx} y1={cy + 16} x2={cx} y2={DASAR + 6} stroke="#1C01A5" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
                <circle cx={cx} cy={cy} r="20" fill={k.warna} stroke={terpilih ? "#1C01A5" : "#FFFFFF"} strokeWidth={terpilih ? 4 : 3} />
                <text x={cx} y={cy + 7} textAnchor="middle" fontSize="20">
                  🦋
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Naikkan atau turunkan</p>
        <div className="grid grid-cols-1 gap-1.5 min-[480px]:grid-cols-3">
          {KUPU.map((k, i) => (
            <Pengatur
              key={k.nama}
              nama={`Kupu-kupu ${k.nama}`}
              nilai=""
              onKurang={() => setTinggi(ubahTinggi(tinggi, i, -1))}
              onTambah={() => setTinggi(ubahTinggi(tinggi, i, 1))}
              kurangMati={tinggi[i] <= MIN_TINGGI}
              tambahMati={tinggi[i] >= MAKS_TINGGI}
              kurangLabel={`Turunkan kupu-kupu ${k.nama}`}
              tambahLabel={`Naikkan kupu-kupu ${k.nama}`}
            />
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Hasil perbandingan</p>
        <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">{kalimatPalingPosisi(tinggi)}</p>
        <p className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]" aria-live="polite">
          {dipilih.length === 2 ? bandingPosisi(tinggi, dipilih[0], dipilih[1]) : "Ketuk dua kupu-kupu untuk membandingkan keduanya."}
        </p>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, naikkan kupu-kupu kuning sampai lebih tinggi dari kupu-kupu merah. Siapa yang paling tinggi sekarang? Dua, ketuk dua kupu-kupu. Siapa yang terbang lebih rendah? Tiga, buat dua kupu-kupu sama tinggi. Kata apa yang muncul?"
          )
        }
        langkah={[
          "Naikkan kupu-kupu kuning sampai lebih tinggi dari kupu-kupu merah. Siapa yang paling tinggi sekarang?",
          "Ketuk dua kupu-kupu. Siapa yang terbang lebih rendah?",
          "Buat dua kupu-kupu sama tinggi. Kata apa yang muncul?",
        ]}
      />
    </div>
  );
}
