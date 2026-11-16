"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { acak, banyakJenis, diRak, kata, pindahMainan, type KeadaanKamar, type MainanSim } from "./logika";
import { EMOJI, NAMA, RAK_KAMAR } from "./data";
import { CSS_LEMARI } from "./ui";

/**
 * Simulasi Kelas 1 Bab 1 Sub-Bab A: Misi Rumah Rapi bagian satu, kamar Kaka. Eksplorasi bebas tanpa skor:
 * ketuk mainan lalu ketuk rak (atau lantai). Tiap rak bisa dihitung (tunjuk satu, sebut satu; angka terakhir = banyaknya)
 * atau dilihat sekilas. Laci kelereng berupa laci sepuluh kotak. Tabel catatan Kaka diisi dengan tombol kurang dan tambah.
 * Angka berbeda dari Story: robot 6, yoyo 2, kelereng 8, pesawat 0.
 */

const LACI = 10;
const awalMainan = (): MainanSim[] =>
  acak(
    RAK_KAMAR.flatMap((r) => Array.from({ length: r.banyak }, (_, i) => ({ id: `${r.jenis}-${i}`, jenis: r.jenis, tempat: "lantai" }))),
    7,
  );

export default function SimulasiKamarKaka({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKamar) => void }) {
  const [k, setK] = useState<KeadaanKamar>(() => ({ alat: "kamar", mainan: awalMainan(), catat: Object.fromEntries(RAK_KAMAR.map((r) => [r.jenis, null])), dihitung: [], sekilas: [] }));
  const [pilih, setPilih] = useState<string | null>(null);
  const [hitung, setHitung] = useState<{ jenis: string; sampai: number } | null>(null);
  const [tutup, setTutup] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const timer = useRef<number[]>([]);
  const batas = useMemo(() => Object.fromEntries(RAK_KAMAR.filter((r) => r.laci).map((r) => [r.jenis, LACI])), []);

  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  useEffect(() => () => timer.current.forEach((t) => window.clearTimeout(t)), []);

  const taruh = (tempat: string) => {
    if (!pilih) return;
    const m = k.mainan.find((x) => x.id === pilih);
    if (!m) return;
    if (tempat !== "lantai" && tempat !== m.jenis) {
      setGoyang(tempat);
      window.setTimeout(() => setGoyang(null), 480);
      speakGuru(`Ini rak ${NAMA[tempat]}. ${NAMA[m.jenis]} punya rak sendiri.`);
      return;
    }
    setK((s) => pindahMainan(s, pilih, tempat, batas));
    setPilih(null);
  };

  const mulaiHitung = (jenis: string) => {
    timer.current.forEach((t) => window.clearTimeout(t));
    const n = diRak(k, jenis);
    if (n === 0) speakGuru(`Tidak ada ${NAMA[jenis]} di rak. Banyaknya nol.`);
    else speakGuru(`${Array.from({ length: n }, (_, i) => kata(i + 1)).join(", ")}. Angka terakhir ${kata(n)}. Ada ${kata(n)} ${NAMA[jenis]}.`);
    setHitung({ jenis, sampai: 0 });
    timer.current = Array.from({ length: n }, (_, i) => window.setTimeout(() => setHitung({ jenis, sampai: i + 1 }), 700 * (i + 1)));
    setK((s) => (s.dihitung.includes(jenis) ? s : { ...s, dihitung: [...s.dihitung, jenis] }));
  };

  const lihatSekilas = (jenis: string) => {
    speakGuru(`Lihat sekilas. Jangan dihitung. Berapa ${NAMA[jenis]}?`);
    setTutup(null);
    timer.current.push(window.setTimeout(() => setTutup(jenis), 1500));
    timer.current.push(window.setTimeout(() => setTutup(null), 4500));
    setK((s) => (s.sekilas.includes(jenis) ? s : { ...s, sekilas: [...s.sekilas, jenis] }));
  };

  const ubahCatat = (jenis: string, d: number) => {
    setK((s) => {
      const lama = s.catat[jenis];
      // Belum diisi: tombol tambah memberi satu, tombol kurang memberi nol.
      const baru = lama === null ? (d > 0 ? 1 : 0) : Math.max(0, Math.min(10, lama + d));
      return { ...s, catat: { ...s.catat, [jenis]: baru } };
    });
  };

  const tombolMainan = (m: MainanSim, angka?: number) => (
    <button
      key={m.id}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setPilih(pilih === m.id ? null : m.id);
      }}
      aria-pressed={pilih === m.id}
      aria-label={`${NAMA[m.jenis]}${pilih === m.id ? ", dipilih" : ""}`}
      className={`relative flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${pilih === m.id ? "bg-[#FFE566] ring-4 ring-[#1C01A5]" : "bg-white/70"}`}
    >
      {EMOJI[m.jenis]}
      {angka ? <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#DC2626] px-1.5 text-[11px] font-black text-white">{angka}</span> : null}
    </button>
  );

  const lantai = k.mainan.filter((m) => m.tempat === "lantai");

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Kamar Kaka berantakan. Ketuk mainan, lalu ketuk raknya. Tekan <b>Hitung</b> atau <b>Sekilas</b> di tiap rak.
      </p>

      <div
        role="button"
        tabIndex={0}
        onClick={() => taruh("lantai")}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && taruh("lantai")}
        aria-label="Lantai kamar"
        className="min-h-[64px] rounded-2xl border-4 border-[#92400E] bg-[#FDE7C8] p-2"
      >
        <p className="mb-1 text-xs font-black text-[#92400E]">Lantai kamar ({lantai.length === 0 ? "sudah bersih" : "ketuk mainan"})</p>
        <div className="flex flex-wrap gap-1.5">{lantai.map((m) => tombolMainan(m))}</div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {RAK_KAMAR.map((r) => {
          const isi = k.mainan.filter((m) => m.tempat === r.jenis);
          const sedangHitung = hitung?.jenis === r.jenis;
          const sudahHitung = k.dihitung.includes(r.jenis) && (!sedangHitung || hitung.sampai >= isi.length);
          return (
            <div
              key={r.jenis}
              role="button"
              tabIndex={0}
              onClick={() => taruh(r.jenis)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && taruh(r.jenis)}
              aria-label={`Rak ${NAMA[r.jenis]}`}
              className={`rounded-2xl border-4 border-[#78350F] bg-[#E8C48F] p-2 ${goyang === r.jenis ? "lm-goyang" : ""}`}
            >
              <div className="mb-1 flex items-center justify-between gap-1">
                <span className="text-sm font-black text-[#78350F]">
                  {EMOJI[r.jenis]} Rak {NAMA[r.jenis]}
                  {r.laci ? " (laci sepuluh kotak)" : ""}
                </span>
                {sudahHitung ? (
                  <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#DC2626]">
                    {isi.length} <span className="text-[#1C01A5]">{kata(isi.length)}</span>
                  </span>
                ) : null}
              </div>
              <div className="relative min-h-[52px] rounded-xl bg-[#F5D7A1] p-1.5">
                {r.laci ? (
                  <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: LACI }, (_, i) => (
                      <div key={i} className="flex h-11 items-center justify-center rounded-md border-2 border-[#78350F]/60 bg-white/60">
                        {isi[i] ? tombolMainan(isi[i], sedangHitung && hitung.sampai > i ? i + 1 : undefined) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {isi.length === 0 ? <span className="text-xs font-bold text-[#78350F]/70">Kotak kosong</span> : null}
                    {isi.map((m, i) => tombolMainan(m, sedangHitung && hitung.sampai > i ? i + 1 : undefined))}
                  </div>
                )}
                {tutup === r.jenis ? <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#1C01A5] text-sm font-black text-[#FFE566]">Berapa tadi?</div> : null}
              </div>
              <div className="mt-1.5 flex gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    mulaiHitung(r.jenis);
                  }}
                  className="min-h-[40px] flex-1 rounded-full border-2 border-[#1C01A5] bg-white text-xs font-black text-[#1C01A5]"
                >
                  {"\u{1F446}"} Hitung
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    lihatSekilas(r.jenis);
                  }}
                  className="min-h-[40px] flex-1 rounded-full border-2 border-[#1C01A5] bg-white text-xs font-black text-[#1C01A5]"
                >
                  {"\u{1F440}"} Sekilas
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <p className="mb-1 text-center text-sm font-black text-[#1C01A5]">{"\u{1F4DD}"} Tabel catatan Kaka</p>
        <div className="space-y-1">
          {RAK_KAMAR.map((r) => {
            const v = k.catat[r.jenis];
            const pas = v !== null && v === banyakJenis(k, r.jenis) && diRak(k, r.jenis) === banyakJenis(k, r.jenis);
            return (
              <div key={r.jenis} className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 px-2 py-1">
                <span className="text-sm font-black text-[#1C01A5]">
                  {EMOJI[r.jenis]} {NAMA[r.jenis]}
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => ubahCatat(r.jenis, -1)} aria-label={`Kurangi catatan ${NAMA[r.jenis]}`} className="h-10 w-10 rounded-full border-2 border-[#1C01A5] text-lg font-black text-[#1C01A5]">
                    −
                  </button>
                  <span className={`w-16 rounded-lg border-2 text-center text-lg font-black ${pas ? "border-[#16A34A] bg-[#DCFCE7] text-[#15803D]" : "border-[#1C01A5]/40 text-[#1C01A5]"}`} aria-live="polite">
                    {v === null ? "?" : v}
                  </span>
                  <button type="button" onClick={() => ubahCatat(r.jenis, 1)} aria-label={`Tambah catatan ${NAMA[r.jenis]}`} className="h-10 w-10 rounded-full border-2 border-[#1C01A5] text-lg font-black text-[#1C01A5]">
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
