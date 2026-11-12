"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { PesanLabK4, WARNA_TEMPAT_K4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  SOAL_E,
  TEMPAT_E,
  awalJumlahK4B1E,
  caraPanjang,
  digitKe,
  jumlahSoal,
  keadaanJumlahK4B1E,
  kunciSoal,
  lambangE,
  langkahJumlahK4B1E,
  rincianKolom,
  selesaiE,
  ucapJumlahK4B1E,
  type KeadaanJumlahK4B1E,
} from "./lab-jumlah-k4b1e";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab E): Lab Jumlah Bersusun.                             */
/*  Bersusun     : kolom demi kolom dari satuan; anak memilih angka dan simpanan. */
/*  Cara Panjang : jumlah nilai tiap tempat, lalu digabung.                      */
/* Logika: lab-jumlah-k4b1e.ts. Hanya angka dan warna tempat.                    */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Kerjakan 131 + 321. Adakah kolom yang menyimpan?",
  "Kerjakan 189 + 245. Coba tekan Tulis tanpa simpanan di kolom satuan. Apa kata lab?",
  "Nyalakan Cara Panjang. Apakah hasilnya sama dengan cara bersusun?",
  "Kerjakan 124 + 411 + 363. Boleh juga dua-dua dulu di kertas.",
];
/** Warna kolom: satuan merah, puluhan biru, ratusan hijau, ribuan ungu. */
const WARNA_KOLOM = [WARNA_TEMPAT_K4[3], WARNA_TEMPAT_K4[2], WARNA_TEMPAT_K4[1], WARNA_TEMPAT_K4[0]];
const KOLOM_TAMPIL = [3, 2, 1, 0];

export default function SimulasiLabJumlahK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJumlahK4B1E) => void }) {
  const [x, kirim] = useReducer(langkahJumlahK4B1E, undefined, awalJumlahK4B1E);

  useEffect(() => {
    onKeadaan?.(keadaanJumlahK4B1E(x));
  }, [onKeadaan, x]);

  const rinci = rincianKolom(x.soal);
  const panjang = caraPanjang(x.soal);
  const selesai = selesaiE(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Jumlah Bersusun</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Jumlahkan kolom demi kolom dari satuan. Simpan 1 bila jumlah kolom sepuluh atau lebih.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucapJumlahK4B1E(x)))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal">
        {SOAL_E.map((s, i) => (
          <Pilihan key={kunciSoal(s)} aktif={kunciSoal(x.soal) === kunciSoal(s)} onKlik={() => kirim({ t: "SOAL", i })} label={`Soal ${s.join(" + ")}`}>
            {s.join(" + ")}
          </Pilihan>
        ))}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="mx-auto grid max-w-xs grid-cols-[2rem_repeat(4,1fr)] gap-x-1 text-center font-black" aria-label="Penjumlahan bersusun">
          <span />
          {KOLOM_TAMPIL.map((c) => (
            <span key={`h${c}`} className={`text-[10px] uppercase ${c === x.kolom && !selesai ? "rounded bg-[#FFE566]" : ""}`} style={{ color: WARNA_KOLOM[c] }}>
              {TEMPAT_E[c]}
            </span>
          ))}
          <span className="text-xs text-[#B45309]">↷</span>
          {KOLOM_TAMPIL.map((c) => (
            <span key={`s${c}`} className="text-sm text-[#B45309]" aria-label={`simpanan ke ${TEMPAT_E[c]}`}>
              {c > 0 && c < 3 && x.kolom >= c && rinci[c].masuk ? rinci[c].masuk : c === 3 && x.kolom >= 3 && rinci[2].keluar ? rinci[2].keluar : ""}
            </span>
          ))}
          {x.soal.map((n, i) => (
            <React.Fragment key={`r${i}`}>
              <span className="text-xl text-[#1C01A5]">{i === x.soal.length - 1 ? "+" : ""}</span>
              {KOLOM_TAMPIL.map((c) => (
                <span key={`r${i}${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }}>
                  {c < 3 && (n >= 10 ** c || c === 0) ? digitKe(n, c) : ""}
                </span>
              ))}
            </React.Fragment>
          ))}
          <span className="col-span-5 border-t-4 border-[#1C01A5]" />
          <span />
          {KOLOM_TAMPIL.map((c) => (
            <span key={`h-${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }}>
              {x.tulis[c] ?? (c < 3 ? "…" : "")}
            </span>
          ))}
        </div>

        {!selesai ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Kolom {TEMPAT_E[x.kolom]}: {rinci[x.kolom].angka.join(" + ")}
              {rinci[x.kolom].masuk ? ` + simpanan ${rinci[x.kolom].masuk}` : ""}
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
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Simpanan">
              {[0, 1, ...(x.soal.length > 2 ? [2] : [])].map((n) => (
                <Pilihan key={n} aktif={x.simpan === n} onKlik={() => kirim({ t: "SIMPAN", n })}>
                  {n === 0 ? "Tanpa simpanan" : `Simpan ${n}`}
                </Pilihan>
              ))}
            </div>
            <div className="text-center">
              <button type="button" onClick={() => kirim({ t: "TULIS" })} className={TOMBOL_BIASA}>
                ✍️ Tulis
              </button>
            </div>
          </div>
        ) : null}
        <Cek aktif={x.panjang} onKlik={() => kirim({ t: "PANJANG" })}>
          Cara Panjang
        </Cek>
      </div>

      {selesai ? <KalimatBesar teks={`${x.soal.map(lambangE).join(" + ")} = ${lambangE(jumlahSoal(x.soal))}`} warna="bg-[#E8F7EE]" /> : null}
      {x.panjang ? (
        <div className={`${KARTU} space-y-1`} aria-label="Cara panjang">
          {panjang.baris.map((b) => (
            <p key={b} className="text-sm font-black text-[#1C01A5]">
              {b}
            </p>
          ))}
          <KalimatBesar teks={panjang.gabung} warna="bg-[#FFF7CC]" />
        </div>
      ) : null}

      <details className={`${KARTU}`}>
        <summary className="cursor-pointer text-sm font-black text-[#1C01A5]">✏️ Ubah bilangan sendiri</summary>
        <div className="mt-2 space-y-2">
          {x.soal.map((n, s) => (
            <div key={s} className="flex flex-wrap items-center gap-1">
              <span className="w-24 text-xs font-black text-[#1C01A5]">Bilangan {s + 1}: {n}</span>
              {[2, 1, 0].map((c) => (
                <span key={c} className="flex items-center gap-0.5">
                  <button type="button" aria-label={`Kurangi angka ${TEMPAT_E[c]} bilangan ${s + 1}`} onClick={() => kirim({ t: "ATUR", suku: s, c, d: -1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-white text-sm font-black text-[#1C01A5]">
                    −
                  </button>
                  <span className="text-xs font-black" style={{ color: WARNA_KOLOM[c] }}>
                    {TEMPAT_E[c].slice(0, 2)}
                  </span>
                  <button type="button" aria-label={`Tambah angka ${TEMPAT_E[c]} bilangan ${s + 1}`} onClick={() => kirim({ t: "ATUR", suku: s, c, d: 1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-sm font-black text-[#1C01A5]">
                    +
                  </button>
                </span>
              ))}
            </div>
          ))}
          <p className="text-xs font-bold text-[#1C01A5]/70">Jumlahnya paling banyak 1.000.</p>
        </div>
      </details>

      <PesanLabK4 pesan={x.pesan} />

      <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
