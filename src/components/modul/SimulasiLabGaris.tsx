"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { PapanNilai } from "./diagram-k2b7";
import {
  LEBAR_JENDELA,
  MAKS_GARIS,
  MAKS_LANGKAH,
  MIN_GARIS,
  aturPosisiGaris,
  awalGaris,
  awalJendela,
  bisaMaju,
  bisaMundur,
  catatanPapanGaris,
  kalimatGaris,
  laporanGaris,
  majuGaris,
  mundurGaris,
  nyalakanGaris,
  puluhanGaris,
  resetGaris,
  satuanGaris,
  ubahLangkahGaris,
  ubahPosisiGaris,
  type TampilGaris,
} from "./lab-garis-k2b7";
import type { KeadaanLabGaris } from "./misi-k2bab7";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B7 Sub-Bab B): Lab Garis Seratus — model PhET.                    */
/* Satu model (posisi dan banyak langkah), banyak perwakilan: garis bilangan,      */
/* lengkung lompatan, papan nilai tempat sebelum dan sesudah, dan kalimat.         */
/* Maju mencari yang lebihnya, mundur mencari yang kurangnya. Garis berhenti di    */
/* 1 dan 100. Logika: lab-garis-k2b7.ts.                                           */
/* ------------------------------------------------------------------------ */

const NAMA_TAMPIL: Record<TampilGaris, string> = { lengkung: "Lengkung lompatan", papan: "Papan nilai tempat" };
const TOMBOL_LOMPAT =
  "min-h-12 flex-1 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiLabGaris({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabGaris) => void }) {
  const [l, setL] = useState(awalGaris);

  const lap = useMemo(() => laporanGaris(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const t = l.terakhir;
  const teks = kalimatGaris(l);
  // Jendela mengikuti penanda. Bila lengkung menyala, jendela memuat kedua ujung lompatan.
  const mulai =
    l.lengkung && t !== null ? Math.max(MIN_GARIS, Math.min(MAKS_GARIS - LEBAR_JENDELA + 1, Math.min(t.dari, t.ke) - 1)) : awalJendela(l.n);
  const sel = Array.from({ length: LEBAR_JENDELA }, (_, i) => mulai + i);
  const tengah = (x: number) => (x - mulai + 0.5) * 10;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Garis Seratus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur posisi kupu-kupu dan banyak langkah, lalu maju atau mundur. Garis ini berhenti di 1 dan 100.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="space-y-0.5" role="group" aria-label={`Garis bilangan ${mulai} sampai ${mulai + LEBAR_JENDELA - 1}, penanda di ${l.n}`}>
          {l.lengkung && t !== null ? (
            <svg viewBox={`0 0 ${LEBAR_JENDELA * 10} 34`} className="block h-auto w-full" role="img" aria-label={`Lompatan ${t.arah} ${t.k} langkah dari ${t.dari} ke ${t.ke}`}>
              <path
                d={`M ${tengah(t.dari)} 32 Q ${(tengah(t.dari) + tengah(t.ke)) / 2} -8 ${tengah(t.ke)} 32`}
                fill="none"
                stroke={t.arah === "maju" ? "#3B82F6" : "#EF4444"}
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx={tengah(t.ke)} cy="32" r="2.6" fill={t.arah === "maju" ? "#3B82F6" : "#EF4444"} />
              <text x={(tengah(t.dari) + tengah(t.ke)) / 2} y="9" textAnchor="middle" fontSize="8" fontWeight="900" fill={t.arah === "maju" ? "#1D4ED8" : "#B91C1C"}>
                {t.arah === "maju" ? `maju ${t.k}` : `mundur ${t.k}`}
              </text>
            </svg>
          ) : null}
          <div className="flex w-full items-end gap-0.5">
            {sel.map((x) => (
              <div key={x} className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                <div className="flex h-7 items-end justify-center text-xl leading-none" aria-hidden="true">
                  {x === l.n ? "🦋" : null}
                </div>
                <button
                  type="button"
                  aria-label={`Bilangan ${x}${x === l.n ? ", penanda ada di sini" : ""}`}
                  onClick={() => setL((s) => aturPosisiGaris(s, x))}
                  className={`flex h-9 w-full items-center justify-center rounded-md border-[3px] text-[11px] font-black leading-none text-[#1C01A5] ${
                    x === l.n ? "border-[#F0AB00] bg-[#FFF7CC]" : x % 10 === 0 ? "border-[#1C01A5] bg-[#E0E7FF]" : "border-[#1C01A5]/60 bg-white"
                  }`}
                >
                  {x}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] font-bold text-[#1C01A5]/60">Kotak biru muda: puluhan penuh (10, 20, 30, ...). Ketuk sebuah kotak untuk memindahkan kupu-kupu.</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Pengatur
            nama="Posisi"
            nilai={l.n}
            onKurang={() => setL((s) => ubahPosisiGaris(s, -1))}
            onTambah={() => setL((s) => ubahPosisiGaris(s, 1))}
            kurangMati={l.n <= MIN_GARIS}
            tambahMati={l.n >= MAKS_GARIS}
            kurangLabel="Geser posisi satu ke kiri"
            tambahLabel="Geser posisi satu ke kanan"
            warna="#E0F2FE"
          />
          <Pengatur
            nama="Langkah"
            nilai={l.k}
            onKurang={() => setL((s) => ubahLangkahGaris(s, -1))}
            onTambah={() => setL((s) => ubahLangkahGaris(s, 1))}
            kurangMati={l.k <= 1}
            tambahMati={l.k >= MAKS_LANGKAH}
            kurangLabel="Kurangi banyak langkah"
            tambahLabel="Tambah banyak langkah"
            warna="#FEF9C3"
          />
        </div>

        <div className="flex gap-2">
          <button type="button" className={`${TOMBOL_LOMPAT} ${bisaMundur(l) ? "" : "opacity-50"}`} onClick={() => setL((s) => mundurGaris(s))}>
            ⬅ Mundur {l.k}
          </button>
          <button type="button" className={`${TOMBOL_LOMPAT} ${bisaMaju(l) ? "" : "opacity-50"}`} onClick={() => setL((s) => majuGaris(s))}>
            Maju {l.k} ➡
          </button>
        </div>

        {l.catatan ? (
          <p role="status" className="igil-muncul rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
            {l.catatan}
          </p>
        ) : null}
        <KalimatBesar teks={teks} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          {(["lengkung", "papan"] as TampilGaris[]).map((k) => (
            <Cek key={k} aktif={l[k]} onKlik={() => setL((s) => nyalakanGaris(s, k, !s[k]))}>
              {NAMA_TAMPIL[k]}
            </Cek>
          ))}
        </div>

        {l.papan ? (
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="space-y-1 text-center">
                <p className="text-xs font-black text-[#1C01A5]">{t !== null ? `Sebelum: ${t.dari}` : `Sekarang: ${l.n}`}</p>
                <PapanNilai p={puluhanGaris(t !== null ? t.dari : l.n)} s={satuanGaris(t !== null ? t.dari : l.n)} kecil />
              </div>
              {t !== null ? (
                <>
                  <span className="text-2xl font-black text-[#1C01A5]" aria-hidden="true">
                    {t.arah === "maju" ? "➡" : "⬅"}
                  </span>
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-black text-[#1C01A5]">Sesudah: {t.ke}</p>
                    <PapanNilai p={puluhanGaris(t.ke)} s={satuanGaris(t.ke)} kecil />
                  </div>
                </>
              ) : null}
            </div>
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">{catatanPapanGaris(l)}</p>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetGaris())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, atur kupu-kupu di lima puluh delapan, atur dua langkah, lalu maju. Ke mana kupu-kupu sampai? Dua, atur di tujuh puluh lima, atur tiga langkah, lalu mundur. Bilangan apa itu? Tiga, nyalakan papan nilai tempat, lalu maju dari lima puluh delapan empat langkah. Apa yang berubah? Empat, atur di sembilan puluh sembilan dan maju dua langkah. Apa kata garisnya?"
          )
        }
        langkah={[
          "Atur kupu-kupu di 58, atur 2 langkah, lalu maju. Ke mana ia sampai?",
          "Atur di 75, atur 3 langkah, lalu mundur. Bilangan apa itu?",
          "Nyalakan Papan nilai tempat. Dari 58, maju 4 langkah. Puluhan dan satuannya berubah bagaimana?",
          "Atur di 99, lalu maju 2 langkah. Apa kata garisnya?",
        ]}
      />
    </div>
  );
}
