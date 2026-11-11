"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import { TurusBaris } from "./diagram-lab-k2b8";
import {
  SET,
  SET_BACA,
  awalBaca,
  banyakBaca,
  kalimatBaca,
  kapital,
  ketukBaca,
  laporanBaca,
  nyalakanBaca,
  palingBaca,
  pilihSetBaca,
  resetBaca,
} from "./lab-data-k2b8";
import type { KeadaanLabBaca } from "./misi-k2bab8";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B8 Sub-Bab A): Lab Baca Turus — lab virtual 2D.                  */
/* Data nyata tetap (hewan, bunga, sayur, mainan). Anak mengetuk dua baris untuk   */
/* dibandingkan: lebihnya dan kurangnya, serta selisihnya. Paling banyak dan        */
/* paling sedikit bisa disorot. Dua baris yang sama panjang tidak punya satu         */
/* pun yang "paling". Logika: lab-data-k2b8.ts.                                      */
/* ------------------------------------------------------------------------ */

export default function SimulasiLabBaca({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabBaca) => void }) {
  const [l, setL] = useState(awalBaca);
  const ds = SET[l.set];

  const lap = useMemo(() => laporanBaca(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const teks = kalimatBaca(l);
  const maks = Math.max(...ds.nyata);
  const mx = palingBaca(l.set, "banyak");
  const mn = palingBaca(l.set, "sedikit");
  const pasangan = l.a !== null && l.b !== null ? ([l.a, l.b] as const) : null;
  const na = pasangan ? banyakBaca(l.set, pasangan[0]) : 0;
  const nb = pasangan ? banyakBaca(l.set, pasangan[1]) : 0;
  const besar = Math.max(na, nb);
  const kecil = Math.min(na, nb);

  const lencana = (id: string): { teks: string; kelas: string } | null => {
    if (!l.paling) return null;
    if (mx.sama.includes(id)) return mx.tunggal ? { teks: "Paling banyak", kelas: "bg-[#DCFCE7] text-[#14532D]" } : { teks: "Sama banyak (paling banyak)", kelas: "bg-[#FEF3C7] text-[#92400E]" };
    if (mn.sama.includes(id)) return mn.tunggal ? { teks: "Paling sedikit", kelas: "bg-[#FEE2E2] text-[#991B1B]" } : { teks: "Sama banyak (paling sedikit)", kelas: "bg-[#FEF3C7] text-[#92400E]" };
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Baca Turus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ketuk dua baris untuk dibandingkan. Cari yang paling banyak, paling sedikit, dan lebihnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih data">
          <span className="text-xs font-black text-[#1C01A5]">Data:</span>
          {SET_BACA.map((id) => (
            <Pilihan key={id} aktif={l.set === id} onKlik={() => setL((x) => pilihSetBaca(x, id))}>
              {SET[id].judul}
            </Pilihan>
          ))}
        </div>

        <div className="space-y-1.5 rounded-2xl bg-indigo-50/60 p-2" role="group" aria-label={`${ds.judul}, ketuk dua baris`}>
          <p className="px-1 text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{ds.judul}</p>
          {ds.kategori.map((k, i) => {
            const n = ds.nyata[i];
            const dipilih = l.a === k.id ? "A" : l.b === k.id ? "B" : null;
            const lb = lencana(k.id);
            return (
              <button
                key={k.id}
                type="button"
                aria-pressed={dipilih !== null}
                aria-label={`${kapital(k.nama)}, ${n}${dipilih ? `, dipilih ${dipilih}` : ""}`}
                onClick={() => setL((x) => ketukBaca(x, k.id))}
                className={`flex w-full items-center gap-2 rounded-xl border-4 bg-white px-2 py-1.5 text-left ${dipilih === "A" ? "border-[#1C01A5]" : dipilih === "B" ? "border-[#F0AB00]" : "border-[#1C01A5]/25"}`}
              >
                <span className="w-24 shrink-0 text-sm font-black text-[#1C01A5]">
                  {k.ikon} {kapital(k.nama)}
                </span>
                <span className="min-w-0 flex-1 space-y-0.5">
                  <TurusBaris n={n} kelompok />
                  {lb ? <span className={`igil-muncul inline-block rounded-full px-2 py-0.5 text-[11px] font-black ${lb.kelas}`}>{lb.teks}</span> : null}
                </span>
                <span className="w-8 shrink-0 text-right text-2xl font-black text-[#1C01A5]">{n}</span>
                {dipilih ? <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-black ${dipilih === "A" ? "bg-[#1C01A5] text-[#FFE566]" : "bg-[#FFE566] text-[#1C01A5]"}`}>{dipilih}</span> : null}
              </button>
            );
          })}
        </div>

        {l.selisih && pasangan && na !== nb ? (
          <div className="space-y-1.5 rounded-2xl border-2 border-[#1C01A5]/30 bg-white p-2" aria-label="Selisih dua baris">
            {pasangan.map((id) => {
              const n = banyakBaca(l.set, id);
              return (
                <div key={id} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-xs font-black text-[#1C01A5]">{kapital(SET[l.set].kategori.find((k) => k.id === id)?.nama ?? id)}</span>
                  <span className="relative block h-5 flex-1 overflow-hidden rounded-md border-2 border-[#1C01A5]/40 bg-[#F5F3FF]">
                    <span className="absolute inset-y-0 left-0 bg-[#1C01A5]" style={{ width: `${(Math.min(n, kecil) / maks) * 100}%` }} />
                    {n > kecil ? <span className="absolute inset-y-0 bg-[#F0AB00]" style={{ left: `${(kecil / maks) * 100}%`, width: `${((n - kecil) / maks) * 100}%` }} /> : null}
                  </span>
                  <span className="w-6 shrink-0 text-right text-sm font-black text-[#1C01A5]">{n}</span>
                </div>
              );
            })}
            <p className="text-center text-lg font-black text-[#1C01A5]">
              {besar} − {kecil} = {besar - kecil}
            </p>
          </div>
        ) : null}

        <KalimatBesar teks={teks} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Alat baca">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={l.paling} onKlik={() => setL((x) => nyalakanBaca(x, "paling", !x.paling))}>
            Paling banyak dan paling sedikit
          </Cek>
          <Cek aktif={l.selisih} onKlik={() => setL((x) => nyalakanBaca(x, "selisih", !x.selisih))}>
            Selisih
          </Cek>
        </div>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetBaca())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, ketuk bebek dan ayam. Siapa yang lebihnya, dan berapa? Dua, nyalakan paling banyak dan paling sedikit. Baris mana yang terpanjang? Tiga, pilih data bunga. Apakah ada satu yang paling sedikit? Empat, nyalakan selisih dan bandingkan kambing dengan sapi."
          )
        }
        langkah={[
          "Pada data hewan, ketuk bebek dan ayam. Siapa yang lebihnya, dan berapa?",
          "Nyalakan Paling banyak dan paling sedikit. Baris mana yang terpanjang?",
          "Pilih data bunga dan lihat paling sedikit. Apakah ada satu yang paling sedikit?",
          "Nyalakan Selisih, lalu bandingkan kambing dengan sapi.",
        ]}
      />
    </div>
  );
}
