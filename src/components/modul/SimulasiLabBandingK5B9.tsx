"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B9 } from "./eja-k5b9";
import { TabelBanding } from "./model-banding-k5b9";
import {
  PASANGAN_B,
  SIMBOL_B,
  URUT_B,
  awalBandingK5B9B,
  idBanding,
  idSimbol,
  idUrut,
  keadaanBandingK5B9B,
  langkahBandingK5B9B,
  opsiBanding,
  opsiSimbol,
  pasanganBanding,
  pasanganSimbol,
  setUrut,
  titikRibuan,
  ucapBandingK5B9B,
  ucapSimbolK5B9B,
  ucapUrutK5B9B,
  type KeadaanBandingK5B9B,
} from "./lab-banding-k5b9b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B9 Sub-Bab B): Lab Banding. Satu alat, tiga tampilan.           */
/*  Banding : geser dari kolom paling kiri, berhenti di kolom pertama beda.    */
/*  Urut    : urutkan bilangan naik atau turun dengan membandingkan berulang.  */
/*  Simbol  : pilih tanda lebih besar, lebih kecil, atau sama dengan.          */
/* Logika: lab-banding-k5b9b.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Banding, mulai dari kolom paling kiri. Mengapa kita berhenti di kolom pertama yang berbeda?",
  "Di Urut, bandingkan dua bilangan bertetangga. Apa bedanya urut naik dan urut turun?",
  "Di Simbol, pilih tanda yang tepat. Kapan dua bilangan sama dengan?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const OPSI_TOMBOL = "min-h-11 w-full rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left text-sm font-black text-[#1C01A5]";

export default function SimulasiLabBandingK5B9({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBandingK5B9B) => void }) {
  const [x, kirim] = useReducer(langkahBandingK5B9B, undefined, awalBandingK5B9B);
  const [lihat, setLihat] = useState<"banding" | "urut" | "simbol">("banding");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBandingK5B9B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "banding" ? ucapBandingK5B9B(x) : lihat === "urut" ? ucapUrutK5B9B(x) : ucapSimbolK5B9B(x);
  const pa = pasanganBanding(x);
  const ur = setUrut(x);
  const si = pasanganSimbol(x);
  const ob = opsiBanding(x.banding.data);
  const os = opsiSimbol(x.simbol.data);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Banding</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bandingkan bilangan, urutkan, dan pilih tanda.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B9(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={lihat === "urut"} onKlik={() => pilihTampilan("urut")}>
          📊 Urut
        </Pilihan>
        <Pilihan aktif={lihat === "simbol"} onKlik={() => pilihTampilan("simbol")}>
          🔣 Simbol
        </Pilihan>
      </div>

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bilangan">
            {PASANGAN_B.map((p, i) => (
              <Pilihan key={p.nama} aktif={x.banding.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Pilih pasangan ${p.nama}`}>
                {tanda(idBanding(i))}
                {p.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {titikRibuan(pa.a)} dan {titikRibuan(pa.b)}
          </p>
          <TabelBanding a={pa.a} b={pa.b} kolom={x.banding.kolom} berhenti={x.banding.berhenti} nama={pa.nama} />
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" aria-label="Geser ke kanan" onClick={() => kirim({ t: "G_GESER" })} className={TOMBOL_KECIL}>
              Geser ke kanan
            </button>
            <button type="button" aria-label="Berhenti di kolom ini" onClick={() => kirim({ t: "G_BERHENTI" })} className={TOMBOL_KECIL}>
              Berhenti di kolom ini
            </button>
            <button type="button" aria-label="Bandingkan dari satuan" onClick={() => kirim({ t: "G_SATUAN" })} className={TOMBOL_KECIL}>
              {tanda(`satuan:${x.banding.data}`)}Coba dari satuan
            </button>
          </div>
          {x.banding.berhenti ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Mana yang lebih besar?</p>
              <div className="space-y-2" role="group" aria-label="Pilih hasil banding">
                {ob.opsi.map((teks, o) => (
                  <button key={teks} type="button" aria-label={`Hasil ${teks}`} onClick={() => kirim({ t: "G_PILIH", o })} className={OPSI_TOMBOL}>
                    {teks}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {lihat === "urut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih kelompok bilangan">
            {URUT_B.map((u, i) => (
              <Pilihan key={u.nama} aktif={x.urut.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Pilih urutan ${u.nama}`}>
                {tanda(idUrut(i))}
                {u.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Urutkan {ur.arah}: dari {ur.arah === "naik" ? "paling kecil ke paling besar" : "paling besar ke paling kecil"}.
          </p>
          <div className="space-y-2" role="group" aria-label="Daftar bilangan">
            {x.urut.daftar.map((n, k) => (
              <div key={n} className="flex items-center justify-between gap-2 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-3 py-1">
                <span className="text-lg font-black text-[#1C01A5]">{titikRibuan(n)}</span>
                {k < x.urut.daftar.length - 1 ? (
                  <button type="button" aria-label={`Turunkan ${titikRibuan(n)}`} onClick={() => kirim({ t: "U_TURUN", k })} className={TOMBOL_KECIL}>
                    ▼ Turunkan
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa urutan" onClick={() => kirim({ t: "U_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa urutan
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "simbol" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan simbol">
            {SIMBOL_B.map((p, i) => (
              <Pilihan key={`${p.a}-${p.b}`} aktif={x.simbol.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Pilih simbol pasangan ${i + 1}`}>
                {tanda(idSimbol(i))}
                Pasangan {i + 1}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-2xl font-black text-[#1C01A5]">
            {titikRibuan(si.a)} … {titikRibuan(si.b)}
          </p>
          <div className="space-y-2" role="group" aria-label="Pilih tanda">
            {os.opsi.map((teks, o) => (
              <button key={teks} type="button" aria-label={`Tanda ${teks}`} onClick={() => kirim({ t: "S_PILIH", o })} className={OPSI_TOMBOL}>
                {teks}
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
          setLihat("banding");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B9(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
