"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { Pengatur } from "./komponen-lab";
import { MAKS_SATUAN, PANJANG_BENDA, SATUAN, hasilBenar, kalimatTebak, satuanDari, susun, tabelHasil, ucapanUkur, type IdSatuan, type Susunan } from "./lab-ukur-bab7";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 7): Meja Ukur, metode laboratorium virtual 2D.             */
/* Pita diukur dengan satuan tak baku. Cara yang salah memberi hasil salah.   */
/* Logika di lab-ukur-bab7.ts. Tanpa jaringan.                                */
/* ------------------------------------------------------------------------ */

const SKALA = 24;
const X0 = 26;

const AWAL: Susunan = { id: "stik", n: 0, dariTengah: false, celah: false, tumpuk: false, campur: false };
const TEBAKAN_AWAL = 3;

export default function SimulasiMejaUkur({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [s, setS] = useState<Susunan>(AWAL);
  const [tebak, setTebak] = useState(TEBAKAN_AWAL);
  const sat = satuanDari(s.id);
  const h = susun(s);
  const gaya =
    h.status === "tepat"
      ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
      : h.status === "salah-cara"
        ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"
        : "border-[#F0AB00] bg-[#FFF7CC] text-[#1C01A5]";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Meja Ukur</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tebak dulu, lalu ukur pita dengan satuan. Coba juga cara yang salah, lalu lihat akibatnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan hasil ukur ini" onClick={() => speakGuru(ucapanUkur(s, tebak))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih satuan">
          {SATUAN.map((x) => (
            <Pilihan key={x.id} aktif={s.id === x.id} onKlik={() => setS({ ...s, id: x.id as IdSatuan, n: 0 })}>
              {x.nama}
            </Pilihan>
          ))}
        </div>
        <Pengatur
          nama={`Tebakanmu (${sat.nama.toLowerCase()})`}
          nilai={tebak}
          warna="#DBEAFE"
          onKurang={() => setTebak(Math.max(1, tebak - 1))}
          onTambah={() => setTebak(Math.min(MAKS_SATUAN, tebak + 1))}
          kurangMati={tebak <= 1}
          tambahMati={tebak >= MAKS_SATUAN}
          kurangLabel="Kurangi tebakan"
          tambahLabel="Tambah tebakan"
        />
        <svg viewBox="0 0 340 150" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-[#FDE9C4]" role="img" aria-label={`Pita sepanjang ${PANJANG_BENDA} ruas diukur dengan ${s.n} ${sat.nama.toLowerCase()}`}>
          <text x={X0} y="14" fontSize="12" fontWeight="900" fill="#1C01A5">
            Pita
          </text>
          <rect x={X0} y="20" width={PANJANG_BENDA * SKALA} height="26" rx="6" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="3" />
          {Array.from({ length: PANJANG_BENDA + 1 }, (_, i) => (
            <line key={i} x1={X0 + i * SKALA} y1={i % 4 === 0 ? 46 : 40} x2={X0 + i * SKALA} y2={i % 4 === 0 ? 52 : 46} stroke="#1C01A5" strokeWidth="1.5" opacity="0.4" />
          ))}
          <line x1={X0} y1="12" x2={X0} y2="136" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" />
          <line x1={X0 + PANJANG_BENDA * SKALA} y1="12" x2={X0 + PANJANG_BENDA * SKALA} y2="136" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" />
          {h.kotak.map((k, i) => (
            <g key={i} className="igil-muncul">
              <rect x={X0 + k.x * SKALA} y={64 + k.baris * 12} width={k.lebar * SKALA} height="26" rx="5" fill={satuanDari(k.id).warna} stroke="#1C01A5" strokeWidth="2.5" />
              <text x={X0 + (k.x + k.lebar / 2) * SKALA} y={82 + k.baris * 12} textAnchor="middle" fontSize="13" fontWeight="900" fill="#1C01A5">
                {i + 1}
              </text>
            </g>
          ))}
          <text x={X0} y="146" fontSize="11" fontWeight="900" fill="#7C3AED">
            ujung pita
          </text>
        </svg>
        <Pengatur
          nama={`Jumlah ${sat.nama.toLowerCase()}`}
          nilai={s.n}
          onKurang={() => setS({ ...s, n: Math.max(0, s.n - 1) })}
          onTambah={() => setS({ ...s, n: Math.min(MAKS_SATUAN, s.n + 1) })}
          kurangMati={s.n <= 0}
          tambahMati={s.n >= MAKS_SATUAN}
          kurangLabel="Ambil satu satuan"
          tambahLabel="Letakkan satu satuan"
        />
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Coba cara yang salah">
          <Cek aktif={s.dariTengah} onKlik={() => setS({ ...s, dariTengah: !s.dariTengah })}>
            Mulai dari tengah
          </Cek>
          <Cek aktif={s.celah} onKlik={() => setS({ ...s, celah: !s.celah })}>
            Beri celah
          </Cek>
          <Cek aktif={s.tumpuk} onKlik={() => setS({ ...s, tumpuk: !s.tumpuk })}>
            Tumpuk satuan
          </Cek>
          <Cek aktif={!!s.campur} onKlik={() => setS({ ...s, campur: !s.campur })}>
            Campur alat ukur
          </Cek>
          <button
            type="button"
            className={TOMBOL_BIASA}
            onClick={() => {
              setS(AWAL);
              setTebak(TEBAKAN_AWAL);
            }}
          >
            ↺ Reset semua
          </button>
        </div>
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gaya}`}>
          {h.status === "tepat" ? "✅ " : h.status === "salah-cara" ? "⛔ " : "📏 "}
          {h.pesan}
        </p>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          Bacaan: {s.n} {sat.nama.toLowerCase()}
        </p>
        {h.status === "tepat" ? (
          <p className="rounded-2xl bg-[#DBEAFE] px-3 py-1.5 text-center text-sm font-black text-[#1E3A8A]" aria-live="polite">
            {kalimatTebak(tebak, s.n, sat.nama)}
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pita yang sama, satuan berbeda</p>
        <div className="grid grid-cols-3 gap-1.5 text-center" role="table" aria-label="Hasil ukur tiap satuan">
          {tabelHasil().map((t) => (
            <p key={t.id} role="cell" className={`rounded-xl px-1 py-1.5 text-sm font-black text-[#1C01A5] ${t.id === s.id ? "bg-[#FFE566]" : "bg-[#F5F3FF]"}`}>
              {t.nama}
              <br />
              <span className="text-2xl">{t.n}</span>
            </p>
          ))}
        </div>
        <p className="text-center text-sm font-black text-[#14532D]">
          Satuan lebih panjang, bilangannya lebih sedikit. Karena itu satuan harus sama saat membandingkan. Dengan {sat.nama.toLowerCase()}: {hasilBenar(s.id)}.
        </p>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tebak dulu berapa stik panjang pita, lalu letakkan stik satu per satu sampai pas di ujung pita. Berapa selisih tebakan dan hasilnya? Dua, nyalakan beri celah atau campur alat ukur. Apakah hasilnya masih benar? Tiga, ganti satuan menjadi klip kecil. Berapa banyak klip yang dibutuhkan, lebih banyak atau lebih sedikit dari stik?"
          )
        }
        langkah={[
          "Tebak dulu, lalu letakkan stik satu per satu sampai pas di ujung pita. Berapa selisih tebakan dan hasilnya?",
          "Nyalakan Beri celah atau Campur alat ukur. Apakah hasilnya masih benar?",
          "Ganti satuan menjadi klip kecil. Lebih banyak atau lebih sedikit dari stik?",
        ]}
      />
    </div>
  );
}
