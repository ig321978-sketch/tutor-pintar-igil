"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B5 } from "./eja-k5b5";
import { GambarKawat } from "./model-kawat-k5b5";
import {
  DATA_PILIH,
  DATA_URUT,
  KELILING_KAWAT,
  PERUBAHAN,
  awalKawatK5B5D,
  dataPilih,
  keadaanKawatK5B5D,
  kelilingKawat,
  langkahKawatK5B5D,
  lebarDari,
  luasKawat,
  ucapKawatK5B5D,
  ucapPilihK5B5D,
  ucapUrutK5B5D,
  type KeadaanKawatK5B5D,
} from "./lab-kawat-k5b5d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B5 Sub-Bab D): Lab Kawat. Satu alat, tiga tampilan.            */
/*  Kawat : kawat 60 cm, atur panjang, lihat luas berubah, catat bentuknya.   */
/*  Pilih : pagar dan kawat memakai keliling, ubin dan pasir memakai luas.    */
/*  Urut  : urutkan lima kerangka dari luas terkecil.                         */
/* Logika: lab-kawat-k5b5d.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Kawat, ubah panjang sampai lima belas. Apa yang terjadi pada luasnya, sedangkan keliling tetap?",
  "Di Pilih, pilih yang dihitung untuk pagar dan untuk ubin. Mengapa keduanya berbeda?",
  "Di Urut, urutkan lima kerangka dari luas terkecil. Bentuk mana yang paling besar luasnya?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const NAMA_UBAH: Record<number, string> = { [-5]: "Kurangi panjang lima", [-1]: "Kurangi panjang satu", 1: "Tambah panjang satu", 5: "Tambah panjang lima" };
const TEKS_UBAH: Record<number, string> = { [-5]: "−5", [-1]: "−1", 1: "+1", 5: "+5" };

export default function SimulasiLabKawatK5B5({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKawatK5B5D) => void }) {
  const [x, kirim] = useReducer(langkahKawatK5B5D, undefined, awalKawatK5B5D);
  const [lihat, setLihat] = useState<"kawat" | "pilih" | "urut">("kawat");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanKawatK5B5D(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "kawat" ? ucapKawatK5B5D(x) : lihat === "pilih" ? ucapPilihK5B5D(x) : ucapUrutK5B5D(x);
  const p = x.kawat.p;
  const k = dataPilih(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kawat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Keliling sama belum tentu luasnya sama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "kawat"} onKlik={() => pilihTampilan("kawat")}>
          🧵 Kawat
        </Pilihan>
        <Pilihan aktif={lihat === "pilih"} onKlik={() => pilihTampilan("pilih")}>
          🤔 Pilih
        </Pilihan>
        <Pilihan aktif={lihat === "urut"} onKlik={() => pilihTampilan("urut")}>
          📊 Urut
        </Pilihan>
      </div>

      {lihat === "kawat" ? (
        <div className={`${KARTU} space-y-3`}>
          <GambarKawat p={p} />
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Panjang {p}, lebar {lebarDari(p)}. Keliling {kelilingKawat(p)} cm, luas {luasKawat(p)} cm².
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Atur panjang kerangka">
            {PERUBAHAN.map((d) => (
              <button key={d} type="button" aria-label={NAMA_UBAH[d]} onClick={() => kirim({ t: "K_UBAH", d })} className={TOMBOL_KECIL}>
                {TEKS_UBAH[d]}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Catat bentuk ini" onClick={() => kirim({ t: "K_CATAT" })} className={TOMBOL_KECIL}>
              Catat bentuk ini
            </button>
          </div>
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Kawat {KELILING_KAWAT} cm, jadi panjang ditambah lebar selalu 30 cm.</p>
        </div>
      ) : null}

      {lihat === "pilih" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih kebutuhan">
            {DATA_PILIH.map((d, i) => (
              <Pilihan key={d.teks} aktif={x.pilih.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Kebutuhan ${d.teks}`}>
                {x.pernah.includes(`pilih:${i}`) ? "✅ " : ""}
                {d.teks}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-base font-black text-[#1C01A5]">Untuk {k.teks}, yang dihitung …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan yang dihitung">
            <button type="button" aria-label="Yang dihitung keliling" onClick={() => kirim({ t: "P_JAWAB", jawab: "keliling" })} className={TOMBOL_KECIL}>
              Keliling
            </button>
            <button type="button" aria-label="Yang dihitung luas" onClick={() => kirim({ t: "P_JAWAB", jawab: "luas" })} className={TOMBOL_KECIL}>
              Luas
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "urut" ? (
        <div className={`${KARTU} space-y-3`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">Kelima kerangka berkeliling 60 cm. Pilih dari luas terkecil.</p>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Kerangka kawat">
            {DATA_URUT.map((d, i) => {
              const urutan = x.urut.dipilih.indexOf(i);
              return (
                <button
                  key={`${d.p}-${d.l}`}
                  type="button"
                  aria-label={`Kerangka ${d.p} kali ${d.l}`}
                  aria-pressed={urutan >= 0}
                  onClick={() => kirim({ t: "U_PILIH", k: i })}
                  className={`h-12 rounded-xl border-4 border-[#1C01A5] px-2 font-black text-[#1C01A5] ${urutan >= 0 ? "bg-[#FFE566]" : "bg-white"}`}
                >
                  {urutan >= 0 ? `${urutan + 1}. ` : ""}
                  {d.p} × {d.l}
                </button>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Urut ulang" onClick={() => kirim({ t: "U_ULANG" })} className={TOMBOL_BIASA}>
              Urut ulang
            </button>
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("kawat");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
