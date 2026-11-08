"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { CobaIni, KARTU } from "./simulasi-bersama";
import { BIRU, BaganPasangan, Bingkai, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import { MAKS, awalCoret, banyakDicoret, keluargaFakta, ketukBenda, kalimatKurang, selKurang, sisa, ubahAmbil, ubahTotal, ucapanKurang } from "./lab-kurang-bab3";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 3): Laboratorium Pengurangan, metode PhET.                 */
/* Benda dicoret, bingkai, garis bilangan mundur, bagan, dan keluarga fakta   */
/* terhubung. Logika di lab-kurang-bab3.ts. Tanpa jaringan.                   */
/* ------------------------------------------------------------------------ */

export default function SimulasiKurang({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [coret, setCoret] = useState<boolean[]>(() => awalCoret(8, 3));
  const s = { t: coret.length, k: banyakDicoret(coret) };
  const hasil = sisa(s.t, s.k);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Pengurangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Coret benda yang diambil. Lihat sisanya di banyak gambar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pengurangan ini" onClick={() => speakGuru(ejaHitung(ucapanKurang(s.t, s.k)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <Pengatur nama="Semua benda" nilai={s.t} onKurang={() => setCoret(ubahTotal(coret, -1))} onTambah={() => setCoret(ubahTotal(coret, 1))} kurangMati={s.t <= 0} tambahMati={s.t >= MAKS} />
        <Pengatur nama="Benda diambil" nilai={s.k} warna="#FEE2E2" onKurang={() => setCoret(ubahAmbil(coret, -1))} onTambah={() => setCoret(ubahAmbil(coret, 1))} kurangMati={s.k <= 0} tambahMati={s.k >= s.t} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Benda • ketuk benda untuk mencoret</p>
        <div className="grid grid-cols-5 gap-1.5 min-[420px]:grid-cols-10" role="group" aria-label={`${s.t} benda, ${s.k} dicoret`}>
          {coret.map((sudah, i) => {
            return (
              <button
                key={i}
                type="button"
                aria-label={`Benda ke-${i + 1}${sudah ? ", dicoret" : ""}`}
                aria-pressed={sudah}
                onClick={() => setCoret(ketukBenda(coret, i))}
                className={`relative flex items-center justify-center rounded-lg border-2 px-0.5 py-1 ${sudah ? "border-[#E98989] bg-[#FDECEC]" : "border-[#1C01A5]/40 bg-white"}`}
              >
                <span className={sudah ? "opacity-40" : ""}>
                  <BendaSvg jenis="jeruk" kelas="h-8 w-8" />
                </span>
                {sudah ? (
                  <svg viewBox="0 0 30 30" className="absolute inset-0 m-auto h-8 w-8" aria-hidden="true">
                    <path d="M5 5 L25 25 M25 5 L5 25" stroke="#B91C1C" strokeWidth="3.4" strokeLinecap="round" />
                  </svg>
                ) : null}
              </button>
            );
          })}
          {s.t === 0 ? <span className="col-span-full text-center text-sm font-black text-[#1C01A5]/50">belum ada benda</span> : null}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Sisa {hasil} benda tidak dicoret
        </p>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bingkai sepuluh</p>
        <Bingkai sel={selKurang(s.t, s.k)} nama={`Bingkai sepuluh: sisa ${hasil}, dicoret ${s.k}`} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan • mulai dari {s.t}, mundur {s.k}</p>
        <GarisAngka
          maks={MAKS}
          nama={`Garis bilangan: mulai dari ${s.t}, mundur ${s.k} sampai ${hasil}`}
          penanda={[{ n: s.t, warna: MERAH }, ...(s.k > 0 ? [{ n: hasil, warna: HIJAU }] : [])]}
          lompatan={s.k > 0 ? [{ dari: s.t, ke: hasil, warna: BIRU }] : []}
          sorot={[hasil]}
        />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bagan pasangan dan keluarga fakta</p>
        <BaganPasangan total={s.t} a={hasil} b={s.k} tanda="-" />
        <KalimatBesar teks={kalimatKurang(s.t, s.k)} warna="bg-[#FFE566]" />
        <div className="grid grid-cols-2 gap-1.5" role="list" aria-label="Keluarga fakta">
          {keluargaFakta(s.t, s.k).map((f) => (
            <p key={f} role="listitem" className="rounded-xl bg-[#F5F3FF] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
              {f}
            </p>
          ))}
        </div>
        <p className="text-center text-sm font-black text-[#14532D]">Tiga bilangan yang sama, empat kalimat yang berpasangan.</p>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, ketuk benda untuk mencoretnya. Lihat bingkai dan garis bilangan ikut berubah. Dua, coret semua benda. Berapa sisanya? Tiga, lihat keluarga fakta. Apa yang sama dari keempat kalimat itu?"
          )
        }
        langkah={[
          "Ketuk benda untuk mencoretnya. Lihat bingkai dan garis bilangan ikut berubah.",
          "Coret semua benda. Berapa sisanya?",
          "Lihat keluarga fakta. Apa yang sama dari keempat kalimat itu?",
        ]}
      />
    </div>
  );
}
