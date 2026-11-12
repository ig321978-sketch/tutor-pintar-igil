"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  DAFTAR_N,
  awalFaktorK4B1I,
  dalamRentang,
  faktorDari,
  faktorDitemukan,
  faktorLengkap,
  kelipatanDari,
  keadaanFaktorK4B1I,
  langkahFaktorK4B1I,
  maksLompatan,
  pasanganDitemukan,
  ucapFaktorK4B1I,
  ucapKelipatanK4B1I,
  type KeadaanFaktorK4B1I,
} from "./lab-faktor-k4b1i";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab I, sub-bab terakhir): Lab Faktor. Satu alat, dua tampilan. */
/*  Faktor    : coba pembagi satu per satu; sisa nol berarti faktor.            */
/*  Kelipatan : lompat sama jauh dari 0; rentang lebih dari a dan kurang dari b. */
/* Logika: lab-faktor-k4b1i.ts. Hanya angka, kotak polos, dan garis bilangan.    */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Cari semua faktor 12. Coba juga pembagi 5. Apa kata lab?",
  "Cari faktor 13. Mengapa hanya ada dua faktor?",
  "Lompat dengan lompatan 2 sebanyak 7 kali, seperti Karel.",
  "Nyalakan Rentang untuk kelipatan 5. Mengapa 17 dan 35 sendiri tidak ikut?",
];

export default function SimulasiLabFaktorK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanFaktorK4B1I) => void }) {
  const [x, kirim] = useReducer(langkahFaktorK4B1I, undefined, awalFaktorK4B1I);
  const [lihat, setLihat] = useState<"faktor" | "kelipatan">("faktor");

  useEffect(() => {
    onKeadaan?.(keadaanFaktorK4B1I(x));
  }, [onKeadaan, x]);

  const kel = kelipatanDari(x.k, x.m);
  const semuaKel = kelipatanDari(x.k, maksLompatan(x.k));
  const masuk = dalamRentang(x.k, x.a, x.b);
  const pasangan = pasanganDitemukan(x);
  const ucap = lihat === "faktor" ? ucapFaktorK4B1I(x) : ucapKelipatanK4B1I(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Faktor</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Cari faktor dengan mencoba pembagi. Lompat untuk menemukan kelipatan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "faktor"} onKlik={() => setLihat("faktor")}>
          ➗ Faktor
        </Pilihan>
        <Pilihan aktif={lihat === "kelipatan"} onKlik={() => setLihat("kelipatan")}>
          📶 Kelipatan
        </Pilihan>
      </div>

      {lihat === "faktor" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {DAFTAR_N.map((n, i) => (
              <Pilihan key={n} aktif={x.n === n} onKlik={() => kirim({ t: "N", i })} label={`Bilangan ${n}`}>
                {n}
              </Pilihan>
            ))}
          </div>
          <p className="text-sm font-black text-[#1C01A5]">Coba pembagi untuk {x.n}. Ketuk satu per satu.</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Pembagi yang bisa dicoba">
            {Array.from({ length: x.n }, (_, i) => i + 1).map((d) => {
              const sudah = x.dicoba.includes(d);
              const fak = x.n % d === 0;
              return (
                <button
                  key={d}
                  type="button"
                  aria-label={`Coba pembagi ${d}`}
                  aria-pressed={sudah}
                  onClick={() => kirim({ t: "COBA", d })}
                  className={`h-10 w-10 rounded-lg border-2 text-base font-black ${sudah ? (fak ? "border-green-700 bg-[#DCFCE7] text-green-900" : "border-red-300 bg-[#FEE2E2] text-red-800 line-through") : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <p className="text-sm font-black text-[#1C01A5]" aria-live="polite">
            Faktor {x.n} yang ditemukan: {faktorDitemukan(x).join(", ") || "belum ada"}
          </p>
          {pasangan.length ? <p className="text-xs font-bold text-[#1C01A5]/80">Pasangan: {pasangan.join(" · ")}</p> : null}
          <button type="button" onClick={() => kirim({ t: "N", i: DAFTAR_N.indexOf(x.n) })} className={TOMBOL_BIASA}>
            ↺ Coba lagi
          </button>
        </div>
      ) : null}
      {lihat === "faktor" && faktorLengkap(x) && x.dicoba.length > 0 ? (
        <KalimatBesar teks={`Semua faktor ${x.n}: ${faktorDari(x.n).join(", ")} (${faktorDari(x.n).length} faktor)`} warna="bg-[#E8F7EE]" />
      ) : null}

      {lihat === "kelipatan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-black text-[#1C01A5]">Lompatan:</span>
            <button type="button" aria-label="Kurangi lompatan" onClick={() => kirim({ t: "K", d: -1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
              −
            </button>
            <span className="w-8 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
              {x.k}
            </span>
            <button type="button" aria-label="Tambah lompatan" onClick={() => kirim({ t: "K", d: 1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
              +
            </button>
            <button type="button" aria-label="Lompat satu kali" onClick={() => kirim({ t: "LOMPAT", d: 1 })} className={TOMBOL_BIASA}>
              🦘 Lompat
            </button>
            <button type="button" aria-label="Mundur satu lompatan" onClick={() => kirim({ t: "LOMPAT", d: -1 })} className={TOMBOL_BIASA}>
              ↩ Mundur
            </button>
          </div>
          <p className="text-sm font-black text-[#1C01A5]" aria-live="polite">
            Kelipatan {x.k} ({x.m} lompatan): {kel.join(", ") || "belum ada"}
          </p>
          <Cek aktif={x.rentang} onKlik={() => kirim({ t: "RENTANG" })}>
            Rentang
          </Cek>
          {x.rentang ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-[#1C01A5]">Lebih dari:</span>
                <button type="button" aria-label="Kurangi batas bawah" onClick={() => kirim({ t: "A", d: -1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{x.a}</span>
                <button type="button" aria-label="Tambah batas bawah" onClick={() => kirim({ t: "A", d: 1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
                <span className="text-sm font-black text-[#1C01A5]">Kurang dari:</span>
                <button type="button" aria-label="Kurangi batas atas" onClick={() => kirim({ t: "B", d: -1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{x.b}</span>
                <button type="button" aria-label="Tambah batas atas" onClick={() => kirim({ t: "B", d: 1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-1" role="list" aria-label="Kelipatan dan rentang">
                {semuaKel.map((v) => (
                  <span key={v} role="listitem" className={`rounded-md border-2 px-1.5 py-0.5 text-sm font-black ${masuk.includes(v) ? "border-[#F0AB00] bg-[#FFE566] text-[#1C01A5]" : "border-[#1C01A5]/20 text-[#1C01A5]/40"}`}>
                    {v}
                  </span>
                ))}
              </div>
              <KalimatBesar teks={masuk.length ? `Kelipatan ${x.k} di antara ${x.a} dan ${x.b}: ${masuk.join(", ")}` : `Tidak ada kelipatan ${x.k} di antara ${x.a} dan ${x.b}`} warna="bg-[#FFF7CC]" />
              <p className="text-xs font-bold text-[#1C01A5]/70">{x.a} dan {x.b} sendiri tidak ikut.</p>
            </div>
          ) : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("faktor");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
