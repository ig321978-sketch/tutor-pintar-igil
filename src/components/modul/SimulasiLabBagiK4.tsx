"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  SOAL_H,
  awalBagiK4B1H,
  hasilBagi,
  hasilTulisH,
  kalimatPeriksaH,
  keadaanBagiK4B1H,
  kunciH,
  langkahBagi,
  langkahBagiK4B1H,
  selesaiH,
  tabelPercobaan,
  ucapBersusunH,
  ucapWadahH,
  wadahSelesai,
  type KeadaanBagiK4B1H,
} from "./lab-bagi-k4b1h";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab H): Lab Bagi. Satu alat, dua tampilan.               */
/*  Wadah    : bagikan benda bergiliran; isi tiap wadah dan sisa dihitung.      */
/*  Bersusun : bagi dari puluhan ke satuan; Periksa dengan perkalian.           */
/* Logika: lab-bagi-k4b1h.ts. Hanya titik, angka, dan wadah polos.               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Bagikan 48 benda ke 4 wadah sampai habis. Berapa sisanya?",
  "Coba 5 wadah. Mengapa tersisa benda?",
  "Selesaikan 48 : 4 bersusun. Turunkan angka 8 setelah puluhan.",
  "Selesaikan 36 : 4. Mengapa puluhannya 0?",
];

export default function SimulasiLabBagiK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBagiK4B1H) => void }) {
  const [x, kirim] = useReducer(langkahBagiK4B1H, undefined, awalBagiK4B1H);
  const [lihat, setLihat] = useState<"wadah" | "bersusun">("wadah");

  useEffect(() => {
    onKeadaan?.(keadaanBagiK4B1H(x));
  }, [onKeadaan, x]);

  const selesaiW = wadahSelesai(x) && x.putaran > 0;
  const hb = hasilBagi(x.nWadah, x.w);
  const tabel = tabelPercobaan(x.nWadah);
  const st = !selesaiH(x) ? langkahBagi(x.n, x.d)[x.langkah] : null;
  const ucap = lihat === "wadah" ? ucapWadahH(x) : ucapBersusunH(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Bagi</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bagi sama banyak. Bagikan ke wadah, lalu bagi bersusun dari puluhan ke satuan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "wadah"} onKlik={() => setLihat("wadah")}>
          🥣 Wadah
        </Pilihan>
        <Pilihan aktif={lihat === "bersusun"} onKlik={() => setLihat("bersusun")}>
          ⬇️ Bersusun
        </Pilihan>
      </div>

      {lihat === "wadah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 px-2 py-1">
              <span className="w-16 text-xs font-black text-[#1C01A5]">Benda</span>
              <button type="button" aria-label="Benda sebelumnya" onClick={() => kirim({ t: "BENDA", d: -1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                ◀
              </button>
              <span className="w-8 text-center text-xl font-black text-[#1C01A5]">{x.nWadah}</span>
              <button type="button" aria-label="Benda berikutnya" onClick={() => kirim({ t: "BENDA", d: 1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                ▶
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 px-2 py-1">
              <span className="w-16 text-xs font-black text-[#1C01A5]">Wadah</span>
              <button type="button" aria-label="Kurangi 1 wadah" onClick={() => kirim({ t: "WADAH", d: -1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                −
              </button>
              <span className="w-8 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
                {x.w}
              </span>
              <button type="button" aria-label="Tambah 1 wadah" onClick={() => kirim({ t: "WADAH", d: 1 })} className="h-8 w-8 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                +
              </button>
            </div>
          </div>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(x.w, 5)}, minmax(0, 1fr))` }} role="img" aria-label={`${x.w} wadah, tiap wadah ${x.putaran} benda`}>
            {Array.from({ length: x.w }, (_, i) => (
              <div key={i} className="flex min-h-[3rem] flex-wrap content-start gap-0.5 rounded-b-xl border-4 border-t-0 border-[#1C01A5] bg-[#F5F3FF] p-1">
                {Array.from({ length: x.putaran }, (_, k) => (
                  <span key={k} className="inline-block h-2.5 w-2.5 rounded-full bg-[#F0AB00]" />
                ))}
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Sisa benda: {x.sisaBenda} dari {x.nWadah}. Tiap wadah: {x.putaran}.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => kirim({ t: "PUTARAN" })} className={TOMBOL_BIASA}>
              ➕ Bagi 1 putaran
            </button>
            <button type="button" onClick={() => kirim({ t: "HABIS" })} className={TOMBOL_BIASA}>
              ⏩ Bagi sampai habis
            </button>
            <button type="button" onClick={() => kirim({ t: "ULANG_WADAH" })} className={TOMBOL_BIASA}>
              ↺ Ulang
            </button>
          </div>
        </div>
      ) : null}
      {lihat === "wadah" && selesaiW ? (
        <KalimatBesar teks={`${x.nWadah} : ${x.w} = ${hb.hasil}, sisa ${hb.sisa}${hb.sisa === 0 ? " (habis dibagi)" : ""}`} warna={hb.sisa === 0 ? "bg-[#E8F7EE]" : "bg-[#FFF7CC]"} />
      ) : null}
      {lihat === "wadah" ? (
        <div className={`${KARTU}`}>
          <p className="mb-1 text-xs font-black text-[#1C01A5]">Tabel percobaan untuk {x.nWadah} benda (dihitung)</p>
          <table className="w-full border-collapse text-sm" aria-label="Tabel percobaan wadah">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="border-2 border-[#1C01A5] px-2 py-0.5">Wadah</th>
                <th className="border-2 border-[#1C01A5] px-2 py-0.5">Tiap wadah</th>
                <th className="border-2 border-[#1C01A5] px-2 py-0.5">Sisa</th>
              </tr>
            </thead>
            <tbody>
              {tabel.map((b) => (
                <tr key={b.w} className={b.w === x.w ? "bg-[#FFE566]" : "bg-white"}>
                  <td className="border-2 border-[#1C01A5] px-2 py-0.5 text-center font-black text-[#1C01A5]">{b.w}</td>
                  <td className="border-2 border-[#1C01A5] px-2 py-0.5 text-center font-black text-[#1C01A5]">{b.isi}</td>
                  <td className="border-2 border-[#1C01A5] px-2 py-0.5 text-center font-black text-[#1C01A5]">{b.sisa === 0 ? "0 ✓" : b.sisa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {lihat === "bersusun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal">
            {SOAL_H.map(([n, d], i) => (
              <Pilihan key={kunciH(n, d)} aktif={x.n === n && x.d === d} onKlik={() => kirim({ t: "SOAL", i })} label={`Soal ${n} : ${d}`}>
                {n} : {d}
              </Pilihan>
            ))}
          </div>
          <div className="mx-auto max-w-xs space-y-1 text-center font-black text-[#1C01A5]" aria-label="Pembagian bersusun">
            <p className="text-3xl">
              {x.d} ) {x.n}
            </p>
            <p className="text-2xl">
              Hasil: {x.hasil[0] === null ? "…" : x.hasil[0] === 0 && x.hasil[1] !== null ? "" : x.hasil[0]}
              {x.hasil[1] === null ? (x.langkah >= 1 ? "…" : "") : x.hasil[1]}
            </p>
            {x.langkah >= 1 && st ? <p className="text-sm text-[#B45309]">Turunkan {x.n % 10}: bilangannya {st.cur}</p> : null}
          </div>
          {!selesaiH(x) && st ? (
            <div className="space-y-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Langkah {x.langkah === 0 ? "puluhan" : "satuan"}: {st.cur} dibagi {x.d}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-black text-[#1C01A5]">Hasil:</span>
                <button type="button" aria-label="Kurangi hasil" onClick={() => kirim({ t: "DIGIT", d: -1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
                  {x.digit}
                </span>
                <button type="button" aria-label="Tambah hasil" onClick={() => kirim({ t: "DIGIT", d: 1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm font-black text-[#1C01A5]">Sisa:</span>
                <button type="button" aria-label="Kurangi sisa" onClick={() => kirim({ t: "SISA", d: -1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                  −
                </button>
                <span className="w-8 text-center text-2xl font-black text-[#B45309]" aria-live="polite">
                  {x.sisa}
                </span>
                <button type="button" aria-label="Tambah sisa" onClick={() => kirim({ t: "SISA", d: 1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                  +
                </button>
                <button type="button" onClick={() => kirim({ t: "TULIS" })} className={TOMBOL_BIASA}>
                  ✍️ Tulis
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-center">
              <KalimatBesar teks={`${x.n} : ${x.d} = ${hasilTulisH(x)}${hasilBagi(x.n, x.d).sisa ? `, sisa ${hasilBagi(x.n, x.d).sisa}` : ""}`} warna="bg-[#E8F7EE]" />
              <button type="button" onClick={() => kirim({ t: "PERIKSA" })} className={TOMBOL_BIASA}>
                🔍 Periksa
              </button>
              {x.periksa ? <KalimatBesar teks={`Periksa: ${kalimatPeriksaH(x)}`} warna="bg-[#FFF7CC]" /> : null}
            </div>
          )}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("wadah");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
