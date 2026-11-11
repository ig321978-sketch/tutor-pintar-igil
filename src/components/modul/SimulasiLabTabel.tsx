"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import {
  MAKS_TABEL,
  awalTabel,
  bilanganSekolom,
  bisaGerakTabel,
  gerakTabel,
  kalimatTabel,
  ketukKotakTabel,
  laporanTabel,
  nyalakanTabel,
  resetTabel,
  tetanggaTabel,
  type ArahTabel,
  type TampilTabel,
} from "./lab-tabel-k2b7";
import type { KeadaanLabTabel } from "./misi-k2bab7";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B7 Sub-Bab A): Tabel Seratus — lab 2D.                           */
/* Satu penanda bergerak di tabel 1 sampai 100. Turun menambah sepuluh, kanan     */
/* menambah satu. Ujung baris adalah batas: penanda tidak melompat ke baris lain,  */
/* dan penjelasan muncul. Tetangga, Jejak, dan Kolom bisa dinyalakan sendiri-sendiri. */
/* Logika: lab-tabel-k2b7.ts.                                                     */
/* ------------------------------------------------------------------------ */

const NAMA_TAMPIL: Record<TampilTabel, string> = { tetangga: "Tetangga", jejak: "Jejak", kolom: "Satu kolom" };
const PANAH: Record<ArahTabel, { ikon: string; label: string }> = {
  atas: { ikon: "⬆️", label: "Naik satu baris, kurang sepuluh" },
  bawah: { ikon: "⬇️", label: "Turun satu baris, tambah sepuluh" },
  kiri: { ikon: "⬅️", label: "Geser ke kiri, kurang satu" },
  kanan: { ikon: "➡️", label: "Geser ke kanan, tambah satu" },
};
const TOMBOL_PANAH =
  "flex h-12 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiLabTabel({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabTabel) => void }) {
  const [l, setL] = useState(awalTabel);

  const lap = useMemo(() => laporanTabel(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const teks = kalimatTabel(l);
  const tet = tetanggaTabel(l);
  const tetSet = new Set<number>(l.tetangga ? (Object.values(tet).filter((x) => x !== null) as number[]) : []);
  const kolomSet = new Set<number>(l.kolom ? bilanganSekolom(l.n) : []);
  const jejakSet = new Set<number>(l.jejak ? l.lintasan : []);
  const semua = Array.from({ length: MAKS_TABEL }, (_, i) => i + 1);

  const gaya = (x: number) => {
    if (x === l.n) return "bg-[#FFE566] text-[#1C01A5] ring-4 ring-[#F0AB00] z-10";
    if (tetSet.has(x)) return "bg-[#DCFCE7] text-[#14532D] ring-2 ring-[#16A34A]";
    if (jejakSet.has(x)) return "bg-[#FDE68A] text-[#1C01A5]";
    if (kolomSet.has(x)) return "bg-[#BAE6FD] text-[#1C01A5]";
    return "bg-white text-[#1C01A5]";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Tabel Seratus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ketuk sebuah kotak atau pakai tombol panah. Turun satu baris menambah sepuluh. Geser ke kanan menambah satu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="grid grid-cols-10 gap-[2px] rounded-xl border-4 border-[#1C01A5] bg-[#1C01A5]/30 p-[2px]" role="grid" aria-label="Tabel bilangan 1 sampai 100">
          {semua.map((x) => (
            <button
              key={x}
              type="button"
              aria-label={`Kotak ${x}${x === l.n ? ", penanda ada di sini" : ""}`}
              aria-current={x === l.n ? "true" : undefined}
              onClick={() => setL((s) => ketukKotakTabel(s, x))}
              className={`flex h-7 items-center justify-center rounded-[4px] text-[11px] font-black leading-none ${gaya(x)}`}
            >
              {x}
            </button>
          ))}
        </div>

        <div className="mx-auto grid w-fit grid-cols-3 gap-1.5" role="group" aria-label="Gerakkan penanda">
          <span />
          <button type="button" aria-label={PANAH.atas.label} className={`${TOMBOL_PANAH} ${bisaGerakTabel(l, "atas") ? "" : "opacity-50"}`} onClick={() => setL((s) => gerakTabel(s, "atas"))}>
            {PANAH.atas.ikon}
          </button>
          <span />
          <button type="button" aria-label={PANAH.kiri.label} className={`${TOMBOL_PANAH} ${bisaGerakTabel(l, "kiri") ? "" : "opacity-50"}`} onClick={() => setL((s) => gerakTabel(s, "kiri"))}>
            {PANAH.kiri.ikon}
          </button>
          <span className="flex h-12 w-14 items-center justify-center rounded-2xl bg-[#1C01A5] text-xl font-black text-[#FFE566]" aria-label={`Penanda di ${l.n}`}>
            {l.n}
          </span>
          <button type="button" aria-label={PANAH.kanan.label} className={`${TOMBOL_PANAH} ${bisaGerakTabel(l, "kanan") ? "" : "opacity-50"}`} onClick={() => setL((s) => gerakTabel(s, "kanan"))}>
            {PANAH.kanan.ikon}
          </button>
          <span />
          <button type="button" aria-label={PANAH.bawah.label} className={`${TOMBOL_PANAH} ${bisaGerakTabel(l, "bawah") ? "" : "opacity-50"}`} onClick={() => setL((s) => gerakTabel(s, "bawah"))}>
            {PANAH.bawah.ikon}
          </button>
          <span />
        </div>

        {l.catatan ? (
          <p role="status" className="igil-muncul rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
            {l.catatan}
          </p>
        ) : null}
        <KalimatBesar teks={teks} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          {(["tetangga", "jejak", "kolom"] as TampilTabel[]).map((k) => (
            <Cek key={k} aktif={l[k]} onKlik={() => setL((s) => nyalakanTabel(s, k, !s[k]))}>
              {NAMA_TAMPIL[k]}
            </Cek>
          ))}
        </div>
        <p className="text-xs font-bold text-[#1C01A5]/70">Hijau: tetangga. Kuning muda: kotak yang baru dilewati. Biru muda: satu kolom dengan penanda.</p>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetTabel())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan panah turun empat kali. Berapa yang bertambah? Dua, nyalakan satu kolom dan ketuk kotak empat puluh tujuh. Apa yang sama dari bilangan sekolom? Tiga, geser kanan sampai ujung baris, lalu geser kanan lagi. Apa katanya? Empat, nyalakan tetangga dan ketuk kotak lima puluh lima."
          )
        }
        langkah={[
          "Tekan panah turun 4 kali. Berapa yang bertambah dari awal?",
          "Nyalakan Satu kolom dan ketuk kotak 47. Apa yang sama dari bilangan sekolom?",
          "Geser kanan sampai ujung baris, lalu sekali lagi. Apa katanya?",
          "Nyalakan Tetangga dan ketuk kotak 55. Mana yang satu lebihnya?",
        ]}
      />
    </div>
  );
}
