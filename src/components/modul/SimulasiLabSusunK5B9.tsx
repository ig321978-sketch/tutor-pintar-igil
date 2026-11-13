"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B9 } from "./eja-k5b9";
import { TabelSusun } from "./model-susun-k5b9";
import {
  BILANGAN_C,
  NAMA_TEMPAT,
  NILAI_TEMPAT,
  awalSusunK5B9C,
  bagianDisebut,
  bilCara,
  bilSusun,
  bilUrai,
  idCara,
  idSusun,
  idTolak,
  idUrai,
  jumlahKolom,
  keadaanSusunK5B9C,
  langkahSusunK5B9C,
  titikRibuan,
  totalIsi,
  ucapCaraK5B9C,
  ucapSusunK5B9C,
  ucapUraiK5B9C,
  type KeadaanSusunK5B9C,
} from "./lab-susun-k5b9c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B9 Sub-Bab C): Lab Susun. Satu alat, tiga tampilan.             */
/*  Susun     : susun bagian nilai tempat menjadi bilangan utuh.               */
/*  Urai      : uraikan bilangan menjadi jumlah nilai tempat.                  */
/*  Cara Lain : pecah satu tempat menjadi sepuluh tempat di kanannya.          */
/* Logika: lab-susun-k5b9c.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Susun, isi enam kolom dari bagian yang disebut. Mengapa tempat yang tidak disebut diisi nol?",
  "Di Urai, jumlahkan nilai tiap tempat. Apa yang kamu dapat bila uraiannya benar?",
  "Di Cara Lain, pecah satu tempat menjadi sepuluh tempat di kanannya. Mengapa totalnya tetap sama?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const TOMBOL_KOLOM = "min-h-10 w-full min-w-0 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-0 py-1 text-xs font-black text-[#1C01A5]";

export default function SimulasiLabSusunK5B9({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusunK5B9C) => void }) {
  const [x, kirim] = useReducer(langkahSusunK5B9C, undefined, awalSusunK5B9C);
  const [lihat, setLihat] = useState<"susun" | "urai" | "cara">("susun");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSusunK5B9C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "susun" ? ucapSusunK5B9C(x) : lihat === "urai" ? ucapUraiK5B9C(x) : ucapCaraK5B9C(x);
  const su = bilSusun(x);
  const ur = bilUrai(x);
  const ca = bilCara(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const nilaiUrai = x.urai.d.map((d, k) => titikRibuan(d * NILAI_TEMPAT[k]));
  const jumlahUrai = jumlahKolom(x.urai.d);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susun</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Susun bilangan, uraikan, dan cari cara lain.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B9(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "susun"} onKlik={() => pilihTampilan("susun")}>
          🧩 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "urai"} onKlik={() => pilihTampilan("urai")}>
          🔬 Urai
        </Pilihan>
        <Pilihan aktif={lihat === "cara"} onKlik={() => pilihTampilan("cara")}>
          🔁 Cara Lain
        </Pilihan>
      </div>

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan susun">
            {BILANGAN_C.map((b, i) => (
              <Pilihan key={b.n} aktif={x.susun.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Pilih susun ${b.nama}`}>
                {tanda(idSusun(i))}
                {b.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Susun: {bagianDisebut(su.n).join(" + ")}</p>
          <TabelSusun isi={x.susun.d.map((v) => (v < 0 ? null : v))} nama={su.nama} />
          <div className="mx-auto grid w-full max-w-md grid-cols-6 gap-1" role="group" aria-label="Ubah angka tiap kolom susun">
            {NAMA_TEMPAT.map((nm, k) => (
              <div key={nm} className="flex flex-col items-center gap-1">
                <button type="button" aria-label={`Naikkan susun ${nm}`} onClick={() => kirim({ t: "S_UBAH", k, delta: 1 })} className={TOMBOL_KOLOM}>
                  ▲
                </button>
                <button type="button" aria-label={`Turunkan susun ${nm}`} onClick={() => kirim({ t: "S_UBAH", k, delta: -1 })} className={TOMBOL_KOLOM}>
                  ▼
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa susunan" onClick={() => kirim({ t: "S_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa susunan
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "urai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan urai">
            {BILANGAN_C.map((b, i) => (
              <Pilihan key={b.n} aktif={x.urai.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Pilih urai ${b.nama}`}>
                {tanda(idUrai(i))}
                {b.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]">{titikRibuan(ur.n)}</p>
          <TabelSusun isi={nilaiUrai} kecil nama={`urai ${ur.nama}`} />
          <div className="mx-auto grid w-full max-w-md grid-cols-6 gap-1" role="group" aria-label="Ubah angka tiap kolom urai">
            {NAMA_TEMPAT.map((nm, k) => (
              <div key={nm} className="flex flex-col items-center gap-1">
                <button type="button" aria-label={`Naikkan urai ${nm}`} onClick={() => kirim({ t: "U_UBAH", k, delta: 1 })} className={TOMBOL_KOLOM}>
                  ▲
                </button>
                <button type="button" aria-label={`Turunkan urai ${nm}`} onClick={() => kirim({ t: "U_UBAH", k, delta: -1 })} className={TOMBOL_KOLOM}>
                  ▼
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Jumlah uraian = {titikRibuan(jumlahUrai)} · Bilangan awal = {titikRibuan(ur.n)}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa uraian" onClick={() => kirim({ t: "U_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa uraian
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "cara" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan cara lain">
            {BILANGAN_C.map((b, i) => (
              <Pilihan key={b.n} aktif={x.cara.data === i} onKlik={() => kirim({ t: "K_DATA", i })} label={`Pilih cara ${b.nama}`}>
                {x.pernah.includes(idCara(i)) ? "✅ " : ""}
                {x.pernah.includes(idTolak(i)) ? "🚫 " : ""}
                {b.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Bilangan {titikRibuan(ca.n)} · Total sekarang {titikRibuan(totalIsi(x.cara.c))}
          </p>
          <TabelSusun isi={x.cara.c} sorot={[ca.kolomPecah]} nama={`cara ${ca.nama}`} />
          <div className="mx-auto grid w-full max-w-md grid-cols-6 gap-1" role="group" aria-label="Pecah isi kolom">
            {NAMA_TEMPAT.map((nm, k) => (
              <button key={nm} type="button" disabled={k === 5} aria-label={`Pecah ${nm}`} onClick={() => kirim({ t: "K_PECAH", k })} className={`${TOMBOL_KOLOM} disabled:opacity-40`}>
                Pecah
              </button>
            ))}
            {NAMA_TEMPAT.map((nm, k) => (
              <button key={nm} type="button" disabled={k === 5} aria-label={`Gabung ke ${nm}`} onClick={() => kirim({ t: "K_GABUNG", k })} className={`${TOMBOL_KOLOM} disabled:opacity-40`}>
                Gabung
              </button>
            ))}
            {NAMA_TEMPAT.map((nm, k) => (
              <button key={nm} type="button" aria-label={`Tambah satu ${nm}`} onClick={() => kirim({ t: "K_TAMBAH", k })} className={TOMBOL_KOLOM}>
                +1
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Kembalikan isi kolom" onClick={() => kirim({ t: "K_ULANG" })} className={TOMBOL_KECIL}>
              Kembalikan
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
          setLihat("susun");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B9(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
