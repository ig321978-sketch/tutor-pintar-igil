"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B6 } from "./eja-k5b6";
import { GambarBusur, GambarUkuran } from "./model-busur-k5b6";
import {
  DATA_BACA,
  DATA_PASANG,
  DATA_PATOKAN,
  NAMA_UKURAN,
  PUTAR_LANGKAH,
  SEBUT_UKURAN,
  URAIAN_SKALA,
  awalBusurK5B6C,
  dataBaca,
  dataPasang,
  idBaca,
  idPasang,
  idPatokan,
  keadaanBusurK5B6C,
  langkahBusurK5B6C,
  opsiBaca,
  ucapBacaK5B6C,
  ucapPasangK5B6C,
  ucapPatokanK5B6C,
  ukuranPatokan,
  type KeadaanBusurK5B6C,
} from "./lab-busur-k5b6c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B6 Sub-Bab C): Lab Busur. Satu alat, tiga tampilan.            */
/*  Pasang  : pusat busur di titik sudut, garis dasar berimpit kaki pertama.   */
/*  Baca    : pilih skala dari nol di kaki pertama, lalu angka kaki kedua.     */
/*  Patokan : namai sudut dari ukurannya, nol sampai penuh.                    */
/* Logika: lab-busur-k5b6c.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Pasang, di mana pusat busur harus diletakkan? Dengan apa garis dasarnya berimpit?",
  "Di Baca, mengapa skala yang dipilih harus mulai dari nol di kaki pertama?",
  "Di Patokan, sudut berukuran 270° itu sudut apa? Mengapa bukan tumpul?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const NAMA_TOMBOL: Record<(typeof NAMA_UKURAN)[number], string> = { nol: "Nol", lancip: "Lancip", siku: "Siku-siku", tumpul: "Tumpul", lurus: "Lurus", releks: "Releks", penuh: "Penuh" };

export default function SimulasiLabBusurK5B6({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBusurK5B6C) => void }) {
  const [x, kirim] = useReducer(langkahBusurK5B6C, undefined, awalBusurK5B6C);
  const [lihat, setLihat] = useState<"pasang" | "baca" | "patokan">("pasang");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBusurK5B6C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "pasang" ? ucapPasangK5B6C(x) : lihat === "baca" ? ucapBacaK5B6C(x) : ucapPatokanK5B6C(x);
  const ps = dataPasang(x);
  const bc = dataBaca(x);
  const uk = ukuranPatokan(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Busur</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Sudut diukur dengan busur derajat, dan satuannya derajat (°).</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B6(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "pasang"} onKlik={() => pilihTampilan("pasang")}>
          📐 Pasang
        </Pilihan>
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          🔢 Baca
        </Pilihan>
        <Pilihan aktif={lihat === "patokan"} onKlik={() => pilihTampilan("patokan")}>
          ⭐ Patokan
        </Pilihan>
      </div>

      {lihat === "pasang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih sudut">
            {DATA_PASANG.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.pasang.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Pasang busur pada ${d.nama}`}>
                {x.pernah.includes(idPasang(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarBusur deg={ps.deg} sisi="kanan" geser={x.pasang.geser} putar={x.pasang.putar} skala={false} nama={ps.nama} />
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1 rounded-2xl border-2 border-[#1C01A5] bg-[#F5F3FF] p-2 text-center">
              <p className="text-xs font-black text-[#1C01A5]">Pusat busur</p>
              <div className="flex justify-center gap-2">
                <button type="button" aria-label="Geser busur ke kiri" onClick={() => kirim({ t: "P_GESER", d: -1 })} className={TOMBOL_KECIL}>
                  ◀
                </button>
                <button type="button" aria-label="Geser busur ke kanan" onClick={() => kirim({ t: "P_GESER", d: 1 })} className={TOMBOL_KECIL}>
                  ▶
                </button>
              </div>
            </div>
            <div className="space-y-1 rounded-2xl border-2 border-[#1C01A5] bg-[#F5F3FF] p-2 text-center">
              <p className="text-xs font-black text-[#1C01A5]">Garis dasar</p>
              <div className="flex justify-center gap-2">
                <button type="button" aria-label="Putar busur ke kiri" onClick={() => kirim({ t: "P_PUTAR", d: PUTAR_LANGKAH })} className={TOMBOL_KECIL}>
                  ↺
                </button>
                <button type="button" aria-label="Putar busur ke kanan" onClick={() => kirim({ t: "P_PUTAR", d: -PUTAR_LANGKAH })} className={TOMBOL_KECIL}>
                  ↻
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa pemasangan" onClick={() => kirim({ t: "P_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih sudut yang dibaca">
            {DATA_BACA.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.baca.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Baca sudut ${d.nama}`}>
                {x.pernah.includes(idBaca(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarBusur deg={bc.deg} sisi={bc.sisi} geser={0} putar={0} skala nama={`sudut ${bc.nama}`} />
          <p className="text-center text-xs font-bold text-[#1C01A5]">
            Kaki pertama (biru) ada di sisi {bc.sisi}. {URAIAN_SKALA}
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih skala">
            <button type="button" aria-label="Pakai skala luar" onClick={() => kirim({ t: "B_SKALA", skala: "luar" })} className={`${TOMBOL_KECIL} ${x.baca.skala === "luar" ? "ring-4 ring-[#F0AB00]" : ""}`}>
              Skala luar
            </button>
            <button type="button" aria-label="Pakai skala dalam" onClick={() => kirim({ t: "B_SKALA", skala: "dalam" })} className={`${TOMBOL_KECIL} ${x.baca.skala === "dalam" ? "ring-4 ring-[#F0AB00]" : ""}`}>
              Skala dalam
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Kaki kedua (emas) menunjuk angka …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan angka">
            {opsiBaca(bc).map((n) => (
              <button key={n} type="button" aria-label={`Angka ${n} derajat`} onClick={() => kirim({ t: "B_ANGKA", nilai: n })} className={TOMBOL_KECIL}>
                {n}°
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "patokan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ukuran sudut">
            {DATA_PATOKAN.map((d, i) => (
              <Pilihan key={d} aktif={x.patokan.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Sudut berukuran ${d} derajat`}>
                {x.pernah.includes(idPatokan(i)) ? "✅ " : ""}
                {d}°
              </Pilihan>
            ))}
          </div>
          <GambarUkuran deg={uk} nama={`sudut berukuran ${uk} derajat`} />
          <p className="text-center text-base font-black text-[#1C01A5]">Sudut berukuran {uk}° itu …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan nama sudut">
            {NAMA_UKURAN.map((n) => (
              <button key={n} type="button" aria-label={`Namai ${SEBUT_UKURAN[n]}`} onClick={() => kirim({ t: "T_JAWAB", nama: n })} className={TOMBOL_KECIL}>
                {NAMA_TOMBOL[n]}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("pasang");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B6(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
