"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B8 } from "./eja-k5b8";
import { GambarPiktogram, type BarisPik } from "./model-piktogram-k5b8";
import {
  DATA_PIK,
  JENIS_CACAT,
  KUNCI_PILIHAN,
  MAKS_SIMBOL,
  NAMA_CACAT,
  awalPiktogramK5B8B,
  barisBisa,
  dataBaca,
  dataKunci,
  dataPeriksa,
  idBaca,
  idCacat,
  idKunci,
  idPerbaiki,
  idTolak,
  keadaanPiktogramK5B8B,
  langkahPiktogramK5B8B,
  opsiBaca,
  opsiKunciPeriksa,
  penuhBaris,
  sisaBaris,
  ucapBacaK5B8B,
  ucapKunciK5B8B,
  ucapPeriksaK5B8B,
  type DataPik,
  type KeadaanPiktogramK5B8B,
} from "./lab-piktogram-k5b8b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B8 Sub-Bab B): Lab Piktogram. Satu alat, tiga tampilan.          */
/*  Kunci   : pilih nilai satu simbol, putuskan bisa atau tidak untuk tabel.   */
/*  Baca    : nilai = banyak simbol dikali kunci, setengah simbol setengah kunci. */
/*  Periksa : cari cacat piktogram (jumlah, ukuran, kunci) lalu perbaiki.      */
/* Logika: lab-piktogram-k5b8b.ts.                                             */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Kunci, pilih nilai satu simbol. Mengapa sisa pembagian harus nol atau setengah kunci?",
  "Di Baca, hitung banyak simbol lalu kalikan dengan kunci. Berapa nilai satu setengah simbol?",
  "Di Periksa, cari cacat piktogram. Mengapa semua simbol harus sama ukurannya?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const BARIS = "flex items-center justify-between gap-2 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-2 py-1";

/** Baris gambar untuk kunci yang dipilih: baris yang tidak bisa digambar ditandai sisanya. */
function barisKunci(d: DataPik, k: number): BarisPik[] {
  return d.kategori.map((nama, j) => {
    const f = d.f[j];
    const penuh = penuhBaris(f, k);
    const bisa = barisBisa(f, k);
    const setengah = bisa && sisaBaris(f, k) > 0;
    const banyak = penuh + (setengah ? 1 : 0) > MAKS_SIMBOL;
    if (banyak) return { nama, penuh: MAKS_SIMBOL, setengah: false, tanda: "terlalu banyak" };
    return { nama, penuh, setengah, tanda: bisa ? undefined : `sisa ${sisaBaris(f, k)}` };
  });
}

/** Baris gambar piktogram jadi untuk Baca dan Periksa. */
function barisJadi(d: DataPik, periksa: boolean): BarisPik[] {
  return d.kategori.map((nama, j) => {
    const f = d.f[j];
    const penuh = penuhBaris(f, d.kunciBaca) + (periksa && d.cacat.jenis === "jumlah" && d.cacat.k === j ? 1 : 0);
    return { nama, penuh, setengah: sisaBaris(f, d.kunciBaca) > 0, besar: periksa && d.cacat.jenis === "ukuran" && d.cacat.k === j };
  });
}

export default function SimulasiLabPiktogramK5B8({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPiktogramK5B8B) => void }) {
  const [x, kirim] = useReducer(langkahPiktogramK5B8B, undefined, awalPiktogramK5B8B);
  const [lihat, setLihat] = useState<"kunci" | "baca" | "periksa">("kunci");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPiktogramK5B8B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "kunci" ? ucapKunciK5B8B(x) : lihat === "baca" ? ucapBacaK5B8B(x) : ucapPeriksaK5B8B(x);
  const ku = dataKunci(x);
  const ba = dataBaca(x);
  const pe = dataPeriksa(x);
  const pilBaca = opsiBaca(x.baca.data);
  const pilKunci = opsiKunciPeriksa(x.periksa.data);
  const sudahBenar = (i: number) => x.pernah.some((p) => p.startsWith(`kunci:${i}:`) || p.startsWith(`tolak:${i}:`));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Piktogram</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pilih kunci, baca nilai simbol, dan periksa piktogram.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B8(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "kunci"} onKlik={() => pilihTampilan("kunci")}>
          🔑 Kunci
        </Pilihan>
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          🔢 Baca
        </Pilihan>
        <Pilihan aktif={lihat === "periksa"} onKlik={() => pilihTampilan("periksa")}>
          🔍 Periksa
        </Pilihan>
      </div>

      {lihat === "kunci" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data">
            {DATA_PIK.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.kunci.data === i} onKlik={() => kirim({ t: "K_DATA", i })} label={`Pilih data ${d.nama}`}>
                {sudahBenar(i) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <div className="space-y-1" role="group" aria-label="Tabel frekuensi">
            {ku.kategori.map((nama, j) => (
              <div key={nama} className={BARIS}>
                <span className="font-black text-[#1C01A5]">{nama}</span>
                <span className="text-lg font-black text-[#1C01A5]">{ku.f[j]}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Satu simbol sama dengan …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih kunci">
            {KUNCI_PILIHAN.map((k) => (
              <Pilihan key={k} aktif={x.kunci.pilih === k} onKlik={() => kirim({ t: "K_PILIH", k })} label={`Pilih kunci ${k}`}>
                {x.pernah.includes(idKunci(x.kunci.data, k)) || x.pernah.includes(idTolak(x.kunci.data, k)) ? "✅ " : ""}
                {k}
              </Pilihan>
            ))}
          </div>
          {x.kunci.pilih !== null ? <GambarPiktogram baris={barisKunci(ku, x.kunci.pilih)} kunci={x.kunci.pilih} nama={ku.nama} /> : null}
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Putuskan kunci">
            <button type="button" aria-label="Kunci bisa dipakai" onClick={() => kirim({ t: "K_JAWAB", jawab: "bisa" })} className={TOMBOL_KECIL}>
              Bisa dipakai
            </button>
            <button type="button" aria-label="Kunci tidak bisa dipakai" onClick={() => kirim({ t: "K_JAWAB", jawab: "tidak" })} className={TOMBOL_KECIL}>
              Tidak bisa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data baca">
            {DATA_PIK.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.baca.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Pilih baca ${d.nama}`}>
                {x.pernah.includes(idBaca(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarPiktogram baris={barisJadi(ba, false)} kunci={ba.kunciBaca} nama={ba.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Nilai {ba.kategori[ba.targetBaca]} adalah …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan nilai">
            {pilBaca.opsi.map((n, o) => (
              <button key={n} type="button" aria-label={`Jawab nilai ${n}`} onClick={() => kirim({ t: "B_JAWAB", o })} className={TOMBOL_KECIL}>
                {n}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "periksa" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data periksa">
            {DATA_PIK.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.periksa.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Pilih periksa ${d.nama}`}>
                {x.pernah.includes(idPerbaiki(i)) ? "✅✅ " : x.pernah.includes(idCacat(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Tabel: {pe.kategori.map((n, j) => `${n} ${pe.f[j]}`).join(", ")}</p>
          <GambarPiktogram baris={barisJadi(pe, true)} kunci={pe.cacat.jenis === "kunci" ? null : pe.kunciBaca} nama={pe.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Apa cacat piktogram ini?</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jenis cacat">
            {JENIS_CACAT.map((j) => (
              <button key={j} type="button" aria-label={`Cacat ${NAMA_CACAT[j]}`} onClick={() => kirim({ t: "P_JENIS", jenis: j })} className={TOMBOL_KECIL}>
                {NAMA_CACAT[j]}
              </button>
            ))}
          </div>
          {x.periksa.ditemukan ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              {pe.cacat.jenis === "kunci" ? (
                <>
                  <p className="text-center text-sm font-black text-[#1C01A5]">Kunci mana yang cocok dengan tabel?</p>
                  <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan kunci perbaikan">
                    {pilKunci.opsi.map((n, o) => (
                      <button key={n} type="button" aria-label={`Kunci cocok ${n}`} onClick={() => kirim({ t: "P_KUNCI", o })} className={TOMBOL_KECIL}>
                        1 simbol = {n}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-center text-sm font-black text-[#1C01A5]">Ketuk baris yang perlu diperbaiki.</p>
                  <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih baris perbaikan">
                    {pe.kategori.map((nama, k) => (
                      <button key={nama} type="button" aria-label={`Perbaiki baris ${nama}`} onClick={() => kirim({ t: "P_TUNJUK", k })} className={TOMBOL_KECIL}>
                        {nama}
                      </button>
                    ))}
                  </div>
                </>
              )}
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
          setLihat("kunci");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B8(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
