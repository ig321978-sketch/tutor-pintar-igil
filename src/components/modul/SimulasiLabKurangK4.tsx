"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { PesanLabK4, WARNA_TEMPAT_K4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  SOAL_F,
  TEMPAT_F,
  awalKurangK4B1F,
  digitF,
  kalimatPeriksa,
  keadaanKurangK4B1F,
  kolomF,
  kunciF,
  lambangF,
  langkahKurangK4B1F,
  selesaiF,
  ucapKurangK4B1F,
  uraianPanjang,
  type KeadaanKurangK4B1F,
} from "./lab-kurang-k4b1f";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab F): Lab Kurang Bersusun.                             */
/*  Bersusun     : kolom demi kolom dari satuan; Ambil 1 dari kiri bila kurang.  */
/*  Cara Panjang : uraian bilangan atas mengikuti pengambilan.                   */
/*  Periksa      : hasil + pengurang = bilangan awal.                            */
/* Logika: lab-kurang-k4b1f.ts. Hanya angka dan warna tempat.                    */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Kerjakan 241 − 129. Coba tulis 8 di satuan tanpa mengambil. Apa kata lab?",
  "Kerjakan 253 − 176. Berapa kali kamu mengambil?",
  "Nyalakan Cara Panjang saat mengambil. Bagaimana 241 diurai?",
  "Kerjakan 304 − 128. Puluhannya 0: ambil dari mana dulu?",
];
const WARNA_KOLOM = [WARNA_TEMPAT_K4[3], WARNA_TEMPAT_K4[2], WARNA_TEMPAT_K4[1], WARNA_TEMPAT_K4[0]];

export default function SimulasiLabKurangK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKurangK4B1F) => void }) {
  const [x, kirim] = useReducer(langkahKurangK4B1F, undefined, awalKurangK4B1F);
  const [panjang, setPanjang] = React.useState(false);

  useEffect(() => {
    onKeadaan?.(keadaanKurangK4B1F(x));
  }, [onKeadaan, x]);

  const n = kolomF(x.a);
  const kolom = Array.from({ length: n }, (_, i) => n - 1 - i);
  const selesai = selesaiF(x);
  const ur = uraianPanjang(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kurang Bersusun</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Kurangkan kolom demi kolom dari satuan. Bila angka atas kurang, ambil 1 dari tempat di kirinya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucapKurangK4B1F(x)))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal">
        {SOAL_F.map(([a, b], i) => (
          <Pilihan key={kunciF(a, b)} aktif={x.a === a && x.b === b} onKlik={() => kirim({ t: "SOAL", i })} label={`Soal ${lambangF(a)} − ${b}`}>
            {lambangF(a)} − {b}
          </Pilihan>
        ))}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="mx-auto grid max-w-xs gap-x-1 text-center font-black" style={{ gridTemplateColumns: `2rem repeat(${n}, 1fr)` }} aria-label="Pengurangan bersusun">
          <span />
          {kolom.map((c) => (
            <span key={`h${c}`} className={`text-[10px] uppercase ${c === x.kolom && !selesai ? "rounded bg-[#FFE566]" : ""}`} style={{ color: WARNA_KOLOM[c] }}>
              {TEMPAT_F[c]}
            </span>
          ))}
          <span />
          {kolom.map((c) => {
            const asli = digitF(x.a, c);
            const berubah = x.atas[c] !== asli;
            return (
              <span key={`a${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }} aria-label={`angka atas ${TEMPAT_F[c]} ${x.atas[c]}`}>
                {berubah ? (
                  <>
                    <span className="mr-0.5 text-sm text-[#9CA3AF] line-through">{asli}</span>
                    {x.atas[c]}
                  </>
                ) : (
                  asli
                )}
              </span>
            );
          })}
          <span className="text-xl text-[#1C01A5]">−</span>
          {kolom.map((c) => (
            <span key={`b${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }}>
              {x.b >= 10 ** c || c === 0 ? digitF(x.b, c) : ""}
            </span>
          ))}
          <span className="border-t-4 border-[#1C01A5]" style={{ gridColumn: `span ${n + 1}` }} />
          <span />
          {kolom.map((c) => (
            <span key={`h-${c}`} className="text-2xl" style={{ color: WARNA_KOLOM[c] }}>
              {x.tulis[c] ?? "…"}
            </span>
          ))}
        </div>

        {!selesai ? (
          <div className="space-y-2">
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Ambil dari kiri">
              {kolom
                .filter((c) => c < n - 1)
                .reverse()
                .map((c) => (
                  <button key={c} type="button" aria-label={`Ambil 1 untuk ${TEMPAT_F[c]}`} onClick={() => kirim({ t: "AMBIL", c })} className={TOMBOL_BIASA}>
                    ↩️ Ambil untuk {TEMPAT_F[c]}
                  </button>
                ))}
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Kolom {TEMPAT_F[x.kolom]}: {x.atas[x.kolom]} − {digitF(x.b, x.kolom)}
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
              <button type="button" onClick={() => kirim({ t: "TULIS" })} className={TOMBOL_BIASA}>
                ✍️ Tulis
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button type="button" onClick={() => kirim({ t: "PERIKSA" })} className={TOMBOL_BIASA}>
              🔍 Periksa
            </button>
          </div>
        )}
        <Cek aktif={panjang} onKlik={() => setPanjang((v) => !v)}>
          Cara Panjang
        </Cek>
      </div>

      {selesai ? <KalimatBesar teks={`${lambangF(x.a)} − ${lambangF(x.b)} = ${lambangF(x.a - x.b)}`} warna="bg-[#E8F7EE]" /> : null}
      {selesai && x.periksa ? <KalimatBesar teks={`Periksa: ${kalimatPeriksa(x)}`} warna="bg-[#FFF7CC]" /> : null}
      {panjang ? (
        <div className={`${KARTU} space-y-1 text-sm font-black text-[#1C01A5]`} aria-label="Cara panjang">
          <p>Atas: {ur.atas}</p>
          <p>Bawah: {ur.bawah}</p>
          <p>Kurangkan tiap tempat: {ur.selisih}</p>
        </div>
      ) : null}

      <details className={`${KARTU}`}>
        <summary className="cursor-pointer text-sm font-black text-[#1C01A5]">✏️ Ubah bilangan sendiri</summary>
        <div className="mt-2 space-y-2">
          {(["a", "b"] as const).map((bil) => (
            <div key={bil} className="flex flex-wrap items-center gap-1">
              <span className="w-28 text-xs font-black text-[#1C01A5]">
                Bilangan {bil === "a" ? "atas" : "bawah"}: {lambangF(x[bil])}
              </span>
              {[2, 1, 0].map((c) => (
                <span key={c} className="flex items-center gap-0.5">
                  <button type="button" aria-label={`Kurangi angka ${TEMPAT_F[c]} bilangan ${bil === "a" ? "atas" : "bawah"}`} onClick={() => kirim({ t: "ATUR", bil, c, d: -1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-white text-sm font-black text-[#1C01A5]">
                    −
                  </button>
                  <span className="text-xs font-black" style={{ color: WARNA_KOLOM[c] }}>
                    {TEMPAT_F[c].slice(0, 2)}
                  </span>
                  <button type="button" aria-label={`Tambah angka ${TEMPAT_F[c]} bilangan ${bil === "a" ? "atas" : "bawah"}`} onClick={() => kirim({ t: "ATUR", bil, c, d: 1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-sm font-black text-[#1C01A5]">
                    +
                  </button>
                </span>
              ))}
            </div>
          ))}
          <p className="text-xs font-bold text-[#1C01A5]/70">Bilangan atas harus lebih besar atau sama dengan bilangan bawah.</p>
        </div>
      </details>

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setPanjang(false);
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
