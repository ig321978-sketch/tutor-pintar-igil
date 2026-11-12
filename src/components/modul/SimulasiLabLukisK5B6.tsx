"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B6 } from "./eja-k5b6";
import { GambarBusur } from "./model-busur-k5b6";
import { GambarLukis } from "./model-lukis-k5b6";
import {
  DATA_CEK,
  DATA_HUBUNG,
  DATA_LUKIS,
  SEBAB_CEK,
  SEBUT_JENIS,
  URAIAN_SEBAB,
  awalLukisK5B6D,
  dataCek,
  dataHubung,
  idCek,
  idHubung,
  idLukis,
  keadaanLukisK5B6D,
  langkahLukisK5B6D,
  opsiTanda,
  targetLukis,
  ucapCekK5B6D,
  ucapHubungK5B6D,
  ucapLukisK5B6D,
  type KeadaanLukisK5B6D,
} from "./lab-lukis-k5b6d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B6 Sub-Bab D): Lab Lukis. Satu alat, tiga tampilan.            */
/*  Lukis  : titik sudut dan kaki pertama, pasang busur, tanda, kaki kedua.   */
/*  Cek    : ukur ulang hasil lukisan, cocok atau meleset dan sebabnya.       */
/*  Hubung : pilih ukuran yang menghasilkan jenis sudut yang diminta.         */
/* Logika: lab-lukis-k5b6d.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Lukis, mengapa titik sudut dan kaki pertama dibuat lebih dulu sebelum busur dipasang?",
  "Di Cek, hasil ukur ulang berbeda dari target. Apa saja kemungkinan sebabnya?",
  "Di Hubung, berapa ukuran sudut yang tumpul? Mengapa 90° bukan tumpul?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const TOMBOL_BERIKUT = `${TOMBOL_KECIL} w-full text-left`;

export default function SimulasiLabLukisK5B6({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLukisK5B6D) => void }) {
  const [x, kirim] = useReducer(langkahLukisK5B6D, undefined, awalLukisK5B6D);
  const [lihat, setLihat] = useState<"lukis" | "cek" | "hubung">("lukis");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanLukisK5B6D(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "lukis" ? ucapLukisK5B6D(x) : lihat === "cek" ? ucapCekK5B6D(x) : ucapHubungK5B6D(x);
  const target = targetLukis(x);
  const ck = dataCek(x);
  const hb = dataHubung(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Lukis</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Lukis sudut dengan busur derajat, lalu ukur ulang hasilnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B6(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "lukis"} onKlik={() => pilihTampilan("lukis")}>
          ✏️ Lukis
        </Pilihan>
        <Pilihan aktif={lihat === "cek"} onKlik={() => pilihTampilan("cek")}>
          🔍 Cek
        </Pilihan>
        <Pilihan aktif={lihat === "hubung"} onKlik={() => pilihTampilan("hubung")}>
          🔗 Hubung
        </Pilihan>
      </div>

      {lihat === "lukis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ukuran yang dilukis">
            {DATA_LUKIS.map((d, i) => (
              <Pilihan key={d} aktif={x.lukis.data === i} onKlik={() => kirim({ t: "L_DATA", i })} label={`Lukis sudut ${d} derajat`}>
                {x.pernah.includes(idLukis(i)) ? "✅ " : ""}
                {d}°
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-base font-black text-[#1C01A5]">Lukis sudut {target}°</p>
          <GambarLukis langkah={x.lukis.langkah} tanda={x.lukis.tanda} nama={`sudut ${target} derajat`} />
          <div className="space-y-2">
            <button type="button" aria-label="Langkah satu, buat titik sudut dan kaki pertama" onClick={() => kirim({ t: "L_TITIK" })} className={TOMBOL_BERIKUT}>
              1. Titik sudut dan kaki pertama
            </button>
            <button type="button" aria-label="Langkah dua, pasang busur" onClick={() => kirim({ t: "L_BUSUR" })} className={TOMBOL_BERIKUT}>
              2. Pasang busur
            </button>
            <div className="rounded-xl border-4 border-[#1C01A5] bg-[#F5F3FF] p-2">
              <p className="mb-1 text-sm font-black text-[#1C01A5]">3. Tandai angka pada skala dari nol di kaki pertama</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan angka tanda">
                {opsiTanda(target).map((n) => (
                  <button key={n} type="button" aria-label={`Tanda angka ${n}`} onClick={() => kirim({ t: "L_TANDA", nilai: n })} className={TOMBOL_KECIL}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" aria-label="Langkah empat, gambar kaki kedua" onClick={() => kirim({ t: "L_KAKI" })} className={TOMBOL_BERIKUT}>
              4. Gambar kaki kedua
            </button>
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Ulangi lukisan" onClick={() => kirim({ t: "L_ULANG" })} className={TOMBOL_BIASA}>
              Ulangi dari awal
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "cek" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih hasil lukisan">
            {DATA_CEK.map((d, i) => (
              <Pilihan key={d.target} aktif={x.cek.data === i} onKlik={() => kirim({ t: "C_DATA", i })} label={`Cek lukisan target ${d.target} derajat`}>
                {x.pernah.includes(idCek(i)) ? "✅ " : ""}
                Target {d.target}°
              </Pilihan>
            ))}
          </div>
          <GambarBusur deg={ck.hasil} sisi="kanan" geser={ck.sebab === "pusat" ? 1 : 0} putar={ck.sebab === "dasar" ? 15 : 0} skala nama={`hasil lukisan target ${ck.target} derajat`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Target {ck.target}°. Hasil ukur ulang {ck.hasil}°.
          </p>
          <p className="text-center text-xs font-bold text-[#1C01A5]">Catatan: {ck.catatan}.</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Putuskan cocok atau meleset">
            <button type="button" aria-label="Putuskan cocok" onClick={() => kirim({ t: "C_PUTUS", putusan: "cocok" })} className={TOMBOL_KECIL}>
              Cocok
            </button>
            <button type="button" aria-label="Putuskan meleset" onClick={() => kirim({ t: "C_PUTUS", putusan: "meleset" })} className={TOMBOL_KECIL}>
              Meleset
            </button>
          </div>
          {x.cek.putusan === "meleset" ? (
            <div className="space-y-2" role="group" aria-label="Pilih sebab meleset">
              <p className="text-center text-sm font-black text-[#1C01A5]">Sebabnya …</p>
              {SEBAB_CEK.map((s) => (
                <button key={s} type="button" aria-label={`Sebab ${s}`} onClick={() => kirim({ t: "C_SEBAB", sebab: s })} className={TOMBOL_BERIKUT}>
                  {URAIAN_SEBAB[s][0].toUpperCase()}
                  {URAIAN_SEBAB[s].slice(1)}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {lihat === "hubung" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tugas">
            {DATA_HUBUNG.map((d, i) => (
              <Pilihan key={d.jenis} aktif={x.hubung.data === i} onKlik={() => kirim({ t: "H_DATA", i })} label={`Tugas ${SEBUT_JENIS[d.jenis]}`}>
                {x.pernah.includes(idHubung(i)) ? "✅ " : ""}
                {SEBUT_JENIS[d.jenis]}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-base font-black text-[#1C01A5]">Ukuran yang menghasilkan {SEBUT_JENIS[hb.jenis]} adalah …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan ukuran">
            {hb.opsi.map((n) => (
              <button key={n} type="button" aria-label={`Ukuran ${n} derajat`} onClick={() => kirim({ t: "H_UKURAN", nilai: n })} className={TOMBOL_KECIL}>
                {n}°
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
          setLihat("lukis");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B6(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
