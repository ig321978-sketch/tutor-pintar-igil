"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { PesanLabK4, WARNA_TEMPAT_K4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  MAKS_ISI,
  MAKS_KOTAK,
  SOAL_G,
  TEMPAT_G,
  awalKaliK4B1G,
  caraPanjangG,
  keadaanKaliK4B1G,
  kunciG,
  langkahKaliK4B1G,
  rincianKali,
  selesaiG,
  teksBerulang,
  ucapArrayG,
  ucapBelahG,
  ucapBersusunG,
  type KeadaanKaliK4B1G,
} from "./lab-kali-k4b1g";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab G): Lab Kali. Satu alat, tiga tampilan.              */
/*  Array    : kotak dan isi; penjumlahan berulang; hasil dihitung.            */
/*  Belah    : cara panjang (puluhan + satuan) × pengali.                      */
/*  Bersusun : kolom satuan lalu puluhan, dengan menyimpan.                    */
/* Logika: lab-kali-k4b1g.ts. Hanya titik, angka, dan warna tempat.             */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Atur array 12 kotak berisi 4. Lihat penjumlahan berulangnya.",
  "Belah 12 × 4 menjadi (10 + 2) × 4. Apakah hasilnya 48?",
  "Kerjakan 14 × 5 bersusun. Apa yang terjadi bila simpanan dilupakan?",
  "Selesaikan 25 × 4. Hasilnya tepat 100. Berapa simpanan di tiap kolom?",
];
type Tampilan = "array" | "belah" | "bersusun";
const WARNA_KOLOM = [WARNA_TEMPAT_K4[3], WARNA_TEMPAT_K4[2], WARNA_TEMPAT_K4[1]];

export default function SimulasiLabKaliK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKaliK4B1G) => void }) {
  const [x, kirim] = useReducer(langkahKaliK4B1G, undefined, awalKaliK4B1G);
  const [lihat, setLihat] = useState<Tampilan>("array");

  useEffect(() => {
    onKeadaan?.(keadaanKaliK4B1G(x));
  }, [onKeadaan, x]);

  const cp = caraPanjangG(x.n, x.k);
  const rinci = rincianKali(x.n, x.k);
  const selesai = selesaiG(x);
  const ucap = lihat === "array" ? ucapArrayG(x) : lihat === "belah" ? ucapBelahG(x) : ucapBersusunG(x);
  const pilihSoal = (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal">
      {SOAL_G.map(([n, k], i) => (
        <Pilihan key={kunciG(n, k)} aktif={x.n === n && x.k === k} onKlik={() => kirim({ t: "SOAL", i })} label={`Soal ${n} × ${k}`}>
          {n} × {k}
        </Pilihan>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kali</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Perkalian adalah penjumlahan berulang. Susun array, belah bilangan, dan kalikan bersusun.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "array"} onKlik={() => setLihat("array")}>
          🍩 Array
        </Pilihan>
        <Pilihan aktif={lihat === "belah"} onKlik={() => setLihat("belah")}>
          📜 Belah
        </Pilihan>
        <Pilihan aktif={lihat === "bersusun"} onKlik={() => setLihat("bersusun")}>
          ⬇️ Bersusun
        </Pilihan>
      </div>

      {lihat === "array" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["kotak", "isi"] as const).map((b) => (
              <div key={b} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 px-2 py-1">
                <span className="w-16 text-xs font-black text-[#1C01A5]">{b === "kotak" ? "Kotak" : "Isi tiap kotak"}</span>
                <button type="button" aria-label={`Kurangi 1 ${b}`} onClick={() => kirim({ t: b === "kotak" ? "KOTAK" : "ISI", d: -1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
                  {x[b]}
                </span>
                <button type="button" aria-label={`Tambah 1 ${b}`} onClick={() => kirim({ t: b === "kotak" ? "KOTAK" : "ISI", d: 1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
              </div>
            ))}
          </div>
          <div className="mx-auto grid w-fit gap-1" style={{ gridTemplateColumns: `repeat(${x.isi}, 0.9rem)` }} role="img" aria-label={`Array ${x.kotak} baris, ${x.isi} kolom, ${x.kotak * x.isi} titik`}>
            {Array.from({ length: x.kotak * x.isi }, (_, i) => (
              <span key={i} className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: Math.floor(i / x.isi) % 2 === 0 ? "#FFE566" : "#DDD6FE" }} />
            ))}
          </div>
          <p className="text-xs font-bold text-[#1C01A5]/70">
            Paling banyak {MAKS_KOTAK} kotak dan {MAKS_ISI} isi, hasilnya paling banyak 100.
          </p>
        </div>
      ) : null}
      {lihat === "array" ? (
        <>
          <KalimatBesar teks={teksBerulang(x.kotak, x.isi)} warna="bg-[#FFF7CC]" />
          <KalimatBesar teks={`${x.kotak} × ${x.isi} = ${x.kotak * x.isi}`} warna="bg-[#E8F7EE]" />
        </>
      ) : null}

      {lihat !== "array" ? <div className={`${KARTU} space-y-3`}>
        {pilihSoal}
        <details>
          <summary className="cursor-pointer text-sm font-black text-[#1C01A5]">✏️ Ubah bilangan sendiri</summary>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {(["puluhan", "satuan", "pengali"] as const).map((b) => (
              <span key={b} className="flex items-center gap-1 text-xs font-black text-[#1C01A5]">
                <button type="button" aria-label={`Kurangi ${b === "pengali" ? "pengali" : `angka ${b}`}`} onClick={() => kirim({ t: "ATUR", bagian: b, d: -1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-white font-black">
                  −
                </button>
                {b}
                <button type="button" aria-label={`Tambah ${b === "pengali" ? "pengali" : `angka ${b}`}`} onClick={() => kirim({ t: "ATUR", bagian: b, d: 1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] font-black">
                  +
                </button>
              </span>
            ))}
          </div>
        </details>
      </div> : null}

      {lihat === "belah" ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-center text-3xl font-black text-[#1C01A5]">
            {x.n} × {x.k}
          </p>
          <Cek aktif={x.belah} onKlik={() => kirim({ t: "BELAH" })}>
            Cara Panjang
          </Cek>
          {x.belah ? (
            <div className="space-y-1" aria-label="Cara panjang">
              <p className="text-lg font-black text-[#1C01A5]">{cp.uraian}</p>
              {cp.baris.map((b) => (
                <p key={b} className="text-sm font-black text-[#1C01A5]">
                  {b}
                </p>
              ))}
              <KalimatBesar teks={cp.gabung} warna="bg-[#FFF7CC]" />
            </div>
          ) : (
            <p className="text-sm font-bold text-[#1C01A5]/70">Nyalakan Cara Panjang untuk menguraikan {x.n} menjadi puluhan dan satuan.</p>
          )}
        </div>
      ) : null}

      {lihat === "bersusun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="mx-auto grid max-w-xs grid-cols-[2rem_repeat(3,1fr)] gap-x-1 text-center font-black" aria-label="Perkalian bersusun">
            <span />
            {[2, 1, 0].map((c) => (
              <span key={`h${c}`} className={`text-[10px] uppercase ${c === x.kolom && !selesai ? "rounded bg-[#FFE566]" : ""}`} style={{ color: WARNA_KOLOM[c] }}>
                {TEMPAT_G[c]}
              </span>
            ))}
            <span className="text-xs text-[#B45309]">↷</span>
            {[2, 1, 0].map((c) => (
              <span key={`s${c}`} className="text-sm text-[#B45309]">
                {c === 1 && x.kolom >= 1 && rinci[0].keluar ? rinci[0].keluar : c === 2 && x.kolom >= 2 && rinci[1].keluar ? rinci[1].keluar : ""}
              </span>
            ))}
            <span />
            {[2, 1, 0].map((c) => (
              <span key={`n${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }}>
                {c === 1 ? Math.floor(x.n / 10) : c === 0 ? x.n % 10 : ""}
              </span>
            ))}
            <span className="text-xl text-[#1C01A5]">×</span>
            {[2, 1, 0].map((c) => (
              <span key={`k${c}`} className="text-2xl text-[#1C01A5]">
                {c === 0 ? x.k : ""}
              </span>
            ))}
            <span className="col-span-4 border-t-4 border-[#1C01A5]" />
            <span />
            {[2, 1, 0].map((c) => (
              <span key={`t${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }}>
                {x.tulis[c] ?? (c < 2 ? "…" : "")}
              </span>
            ))}
          </div>
          {!selesai ? (
            <div className="space-y-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Kolom {TEMPAT_G[x.kolom]}: {rinci[x.kolom].kali}
                {x.kolom === 1 ? ` + simpanan ${rinci[0].keluar}` : ""}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-black text-[#1C01A5]">Tulis angka:</span>
                <button type="button" aria-label="Kurangi angka yang ditulis" onClick={() => kirim({ t: "DIGIT", d: -1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
                  {x.digit}
                </span>
                <button type="button" aria-label="Tambah angka yang ditulis" onClick={() => kirim({ t: "DIGIT", d: 1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-black text-[#1C01A5]">Simpan:</span>
                <button type="button" aria-label="Kurangi simpanan" onClick={() => kirim({ t: "SIMPAN", d: -1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-2xl font-black text-[#B45309]" aria-live="polite">
                  {x.simpan}
                </span>
                <button type="button" aria-label="Tambah simpanan" onClick={() => kirim({ t: "SIMPAN", d: 1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
                <button type="button" onClick={() => kirim({ t: "TULIS" })} className={TOMBOL_BIASA}>
                  ✍️ Tulis
                </button>
              </div>
            </div>
          ) : (
            <KalimatBesar teks={`${x.n} × ${x.k} = ${x.n * x.k}`} warna="bg-[#E8F7EE]" />
          )}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("array");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
