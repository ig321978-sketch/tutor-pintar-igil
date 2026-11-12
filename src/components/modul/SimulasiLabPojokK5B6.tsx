"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B6 } from "./eja-k5b6";
import { GambarKertas, GambarPojok } from "./model-pojok-k5b6";
import {
  DATA_BANDING,
  DATA_DETEKTIF,
  DATA_LIPAT,
  GESER_LANGKAH,
  awalPojokK5B6A,
  dataBanding,
  dataDetektif,
  dataLipat,
  idBanding,
  idDetektif,
  idLipat,
  keadaanPojokK5B6A,
  langkahPojokK5B6A,
  ucapBandingK5B6A,
  ucapDetektifK5B6A,
  ucapLipatK5B6A,
  type KeadaanPojokK5B6A,
} from "./lab-pojok-k5b6a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B6 Sub-Bab A): Lab Pojok. Satu alat, tiga tampilan.            */
/*  Lipat    : lipat kertas dua kali sampai jadi patokan siku-siku.           */
/*  Banding  : tempelkan patokan ke pojok benda, putuskan jenisnya.           */
/*  Detektif : periksa pojok benda dengan patokan, pilah siku-siku atau bukan. */
/* Logika: lab-pojok-k5b6a.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Lipat, geser lipatan kedua. Apa yang terjadi bila tepinya belum berimpit?",
  "Di Banding, tempelkan patokan. Bagaimana sisi pojok yang lebih sempit dari patokan?",
  "Di Detektif, pojok mana yang tidak berimpit dengan patokan?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";

export default function SimulasiLabPojokK5B6({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPojokK5B6A) => void }) {
  const [x, kirim] = useReducer(langkahPojokK5B6A, undefined, awalPojokK5B6A);
  const [lihat, setLihat] = useState<"lipat" | "banding" | "detektif">("lipat");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPojokK5B6A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "lipat" ? ucapLipatK5B6A(x) : lihat === "banding" ? ucapBandingK5B6A(x) : ucapDetektifK5B6A(x);
  const lp = dataLipat(x);
  const bd = dataBanding(x);
  const dt = dataDetektif(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Pojok</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Patokan siku-siku dipakai untuk memeriksa pojok benda.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B6(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "lipat"} onKlik={() => pilihTampilan("lipat")}>
          📄 Lipat
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={lihat === "detektif"} onKlik={() => pilihTampilan("detektif")}>
          🕵️ Detektif
        </Pilihan>
      </div>

      {lihat === "lipat" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih kertas">
            {DATA_LIPAT.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.lipat.data === i} onKlik={() => kirim({ t: "L_DATA", i })} label={`Kertas ${d.nama}`}>
                {x.pernah.includes(idLipat(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarKertas langkah={x.lipat.langkah} geser={x.lipat.geser} nama={lp.nama} />
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" aria-label="Lipat pertama" onClick={() => kirim({ t: "L_LIPAT1" })} className={TOMBOL_KECIL}>
              Lipat pertama
            </button>
            <button type="button" aria-label="Geser lipatan ke kiri" onClick={() => kirim({ t: "L_GESER", d: -GESER_LANGKAH })} className={TOMBOL_KECIL}>
              ◀ Geser
            </button>
            <button type="button" aria-label="Geser lipatan ke kanan" onClick={() => kirim({ t: "L_GESER", d: GESER_LANGKAH })} className={TOMBOL_KECIL}>
              Geser ▶
            </button>
            <button type="button" aria-label="Lipat kedua" onClick={() => kirim({ t: "L_LIPAT2" })} className={TOMBOL_KECIL}>
              Lipat kedua
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pojok benda">
            {DATA_BANDING.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.banding.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Pojok ${d.nama}`}>
                {x.pernah.includes(idBanding(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarPojok deg={bd.deg} patokan={x.banding.tempel} nama={bd.nama} />
          <div className="flex justify-center">
            <button type="button" aria-label="Tempel patokan" onClick={() => kirim({ t: "B_TEMPEL" })} className={TOMBOL_KECIL}>
              Tempel patokan
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Dibanding patokan, pojok ini …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jenis pojok">
            <button type="button" aria-label="Pilih siku-siku" onClick={() => kirim({ t: "B_JAWAB", jawab: "siku" })} className={TOMBOL_KECIL}>
              Berimpit (siku-siku)
            </button>
            <button type="button" aria-label="Pilih lancip" onClick={() => kirim({ t: "B_JAWAB", jawab: "lancip" })} className={TOMBOL_KECIL}>
              Lebih sempit (lancip)
            </button>
            <button type="button" aria-label="Pilih tumpul" onClick={() => kirim({ t: "B_JAWAB", jawab: "tumpul" })} className={TOMBOL_KECIL}>
              Lebih lebar (tumpul)
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "detektif" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pojok yang diperiksa">
            {DATA_DETEKTIF.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.detektif.data === i} onKlik={() => kirim({ t: "D_DATA", i })} label={`Periksa ${d.nama}`}>
                {x.pernah.includes(idDetektif(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarPojok deg={dt.deg} patokan nama={dt.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Pojok ini …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan siku-siku atau bukan">
            <button type="button" aria-label="Pilih siku-siku" onClick={() => kirim({ t: "D_JAWAB", jawab: "siku" })} className={TOMBOL_KECIL}>
              Siku-siku
            </button>
            <button type="button" aria-label="Pilih bukan siku-siku" onClick={() => kirim({ t: "D_JAWAB", jawab: "bukan" })} className={TOMBOL_KECIL}>
              Bukan siku-siku
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
          setLihat("lipat");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B6(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
