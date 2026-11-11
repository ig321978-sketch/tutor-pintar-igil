"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import {
  ANALISIS_LENGKUNG,
  TANTANGAN,
  UKURAN,
  analisis,
  hapusPakuTerakhir,
  jalurKaret,
  papanKosong,
  pasangPaku,
  tutupBentuk,
  ucapanBentuk,
  type Papan,
  type Titik,
} from "./lab-papan-paku-bab4";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 4): Papan Paku Bebas, metode laboratorium virtual 2D.      */
/* Karet dipasang di paku, mesin mengenali bentuk dan cirinya.                */
/* Logika di lab-papan-paku-bab4.ts. Tanpa jaringan.                          */
/* ------------------------------------------------------------------------ */

const JARAK = 60;
const TEPI = 30;
const px = (p: Titik): [number, number] => [TEPI + p[0] * JARAK, TEPI + p[1] * JARAK];

export default function SimulasiPapanPaku({ speakGuru, tampilSiku = true }: { speakGuru: (t: string) => void; /** Sudut siku belum diajarkan di Sub-Bab A, jadi di dalam Materi bisa dimatikan. */ tampilSiku?: boolean }) {
  const [papan, setPapan] = useState<Papan>(papanKosong);
  const [lengkung, setLengkung] = useState(false);
  const [tercapai, setTercapai] = useState<string[]>([]);

  const terapkan = (baru: Papan, lk: boolean) => {
    setPapan(baru);
    if (baru.tertutup) {
      const nama = lk ? ANALISIS_LENGKUNG.nama : analisis(baru.titik).nama;
      setTercapai((x) => ((TANTANGAN as readonly string[]).includes(nama) && !x.includes(nama) ? [...x, nama] : x));
    }
  };

  const ringkas = papan.tertutup ? (lengkung ? ANALISIS_LENGKUNG : analisis(papan.titik)) : null;
  const jalur = jalurKaret(papan.titik, papan.tertutup, lengkung, px);
  const pakuPertama = papan.titik[0];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Papan Paku Bebas</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pasang karet di paku. Mesin akan menyebut nama bentukmu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bentuk ini" onClick={() => speakGuru(ucapanBentuk(papan, lengkung, tampilSiku))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <svg viewBox="0 0 300 300" className="mx-auto block w-full max-w-[340px] rounded-2xl bg-[#FDE9C4]" role="group" aria-label="Papan paku lima kali lima">
          {Array.from({ length: UKURAN }, (_, i) => (
            <g key={`g${i}`} stroke="#A8672D" strokeOpacity="0.25" strokeWidth="1">
              <line x1={TEPI} y1={TEPI + i * JARAK} x2={TEPI + (UKURAN - 1) * JARAK} y2={TEPI + i * JARAK} />
              <line x1={TEPI + i * JARAK} y1={TEPI} x2={TEPI + i * JARAK} y2={TEPI + (UKURAN - 1) * JARAK} />
            </g>
          ))}
          {jalur ? (
            <path d={jalur} fill={papan.tertutup ? "rgba(240,171,0,0.28)" : "none"} stroke="#B45309" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" className={papan.tertutup ? "igil-muncul" : ""} />
          ) : null}
          {Array.from({ length: UKURAN * UKURAN }, (_, k) => {
            const kol = k % UKURAN;
            const bar = Math.floor(k / UKURAN);
            const p: Titik = [kol, bar];
            const [x, y] = px(p);
            const urut = papan.titik.findIndex((t) => t[0] === kol && t[1] === bar);
            const dipakai = urut >= 0;
            return (
              <g
                key={k}
                role="button"
                tabIndex={0}
                aria-label={`Paku baris ${bar + 1} kolom ${kol + 1}${dipakai ? `, paku ke-${urut + 1}` : ""}`}
                className="cursor-pointer"
                onClick={() => terapkan(pasangPaku(papan, p), lengkung)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    terapkan(pasangPaku(papan, p), lengkung);
                  }
                }}
              >
                <rect x={x - 28} y={y - 28} width="56" height="56" fill="transparent" />
                <circle cx={x} cy={y} r={dipakai ? 11 : 8} fill={dipakai ? "#FFE566" : "#7C5A2E"} stroke="#1C01A5" strokeWidth={dipakai ? 3 : 1.5} />
                {dipakai ? (
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#1C01A5">
                    {urut + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        {papan.pesan ? (
          <p role="status" className="rounded-xl border-2 border-[#E98989] bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
            {papan.pesan}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={TOMBOL_UTAMA} onClick={() => terapkan(tutupBentuk(papan), lengkung)}>
            ✔ Tutup bentuk
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => terapkan(hapusPakuTerakhir(papan), lengkung)}>
            ↩ Hapus paku terakhir
          </button>
          <button
            type="button"
            className={TOMBOL_BIASA}
            onClick={() => {
              setPapan(papanKosong());
              setLengkung(false);
            }}
          >
            🗑 Hapus karet
          </button>
          <Cek
            aktif={lengkung}
            onKlik={() => {
              setLengkung((x) => !x);
              if (papan.tertutup) terapkan(papan, !lengkung);
            }}
          >
            Karet lengkung
          </Cek>
        </div>
        {pakuPertama && !papan.tertutup && papan.titik.length >= 3 ? <p className="text-center text-xs font-bold text-[#1C01A5]/70">Ketuk paku ke-1 lagi untuk menutup bentuk.</p> : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Nama dan ciri bentukmu</p>
        {ringkas ? (
          <div className="space-y-2 text-center">
            <p className="igil-muncul text-2xl font-black text-[#1C01A5]" aria-live="polite">
              {ringkas.nama}
            </p>
            <div className={`grid gap-1.5 ${tampilSiku ? "grid-cols-3" : "grid-cols-2"}`}>
              <p className="rounded-xl bg-[#F5F3FF] px-1 py-1.5 text-sm font-black text-[#1C01A5]">Sisi lurus<br /><span className="text-2xl">{ringkas.sisi}</span></p>
              <p className="rounded-xl bg-[#F5F3FF] px-1 py-1.5 text-sm font-black text-[#1C01A5]">Sudut<br /><span className="text-2xl">{ringkas.sudut}</span></p>
              {tampilSiku ? <p className="rounded-xl bg-[#F5F3FF] px-1 py-1.5 text-sm font-black text-[#1C01A5]">Sudut siku<br /><span className="text-2xl">{lengkung ? 0 : ringkas.siku}</span></p> : null}
            </div>
            <p className="text-sm font-bold text-[#1C01A5]/80">
              {lengkung
                ? "Karet melengkung, jadi tidak ada sisi lurus dan tidak ada sudut."
                : ringkas.sisi === 4 && ringkas.siku === 4 && ringkas.sisiSama
                  ? tampilSiku
                    ? "Empat sisi sama panjang dan empat sudut siku."
                    : "Empat sisi sama panjang dan empat sudut."
                  : "Hitung sisi dan sudutnya, lalu cocokkan dengan namanya."}
            </p>
          </div>
        ) : (
          <p className="text-center text-sm font-black text-[#1C01A5]/60">Karet masih terbuka. Tutup bentuknya untuk melihat nama.</p>
        )}
      </div>

      <div className={`${KARTU} space-y-1.5`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tantangan • {tercapai.length} dari {TANTANGAN.length}</p>
        <ul className="grid grid-cols-2 gap-1.5" aria-label="Tantangan bentuk">
          {TANTANGAN.map((t) => (
            <li key={t} className={`rounded-xl border-2 px-2 py-1 text-sm font-black ${tercapai.includes(t) ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]"}`}>
              {tercapai.includes(t) ? "✔ " : "☐ "}
              {t}
            </li>
          ))}
        </ul>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, buat persegi dengan empat paku. Dua, geser satu paku sehingga bukan persegi lagi. Apa nama barunya? Tiga, nyalakan karet lengkung. Berapa sisi lurus dan sudutnya?"
          )
        }
        langkah={[
          "Buat persegi dengan empat paku, lalu tutup bentuknya.",
          "Ganti satu paku sehingga bukan persegi lagi. Apa nama barunya?",
          "Nyalakan Karet lengkung. Berapa sisi lurus dan sudutnya?",
        ]}
      />
    </div>
  );
}
