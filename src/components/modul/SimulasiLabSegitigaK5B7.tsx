"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B7 } from "./eja-k5b7";
import { GambarSedotan, GambarSisiSegitiga, GambarSudutSegitiga } from "./model-segitiga-k5b7";
import {
  DATA_SEDOTAN,
  DATA_SISI,
  DATA_SUDUT,
  JUMLAH_SUDUT,
  awalSegitigaK5B7A,
  dataSedotan,
  dataSisi,
  dataSudut,
  idHier,
  idSedotan,
  idSisi,
  idSudut,
  keadaanSegitigaK5B7A,
  langkahSegitigaK5B7A,
  sudutKetiga,
  ucapSedotanK5B7A,
  ucapSisiK5B7A,
  ucapSudutK5B7A,
  hierarki,
  jenisSisi,
  ujiPasangan,
  pasanganImpit,
  type KeadaanSegitigaK5B7A,
} from "./lab-segitiga-k5b7a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B7 Sub-Bab A): Lab Segitiga. Satu alat, tiga tampilan.         */
/*  Sedotan : uji tiga pasangan sisi, jumlah dua sisi harus lebih dari ketiga. */
/*  Sudut   : cari sudut ketiga dari jumlah 180°, tentukan jenis segitiga.    */
/*  Sisi    : impitkan sisi, tentukan jenis, lalu hierarki sama sisi dan kaki. */
/* Logika: lab-segitiga-k5b7a.ts.                                              */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Sedotan, uji ketiga pasangan. Apa yang terjadi bila satu pasangan gagal?",
  "Di Sudut, hitung sudut ketiga. Mengapa dua sudut siku-siku tidak bisa membentuk segitiga?",
  "Di Sisi, impitkan sisinya. Apakah segitiga sama sisi juga termasuk sama kaki?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const NAMA_PASANG = ["a + b", "a + c", "b + c"];

export default function SimulasiLabSegitigaK5B7({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSegitigaK5B7A) => void }) {
  const [x, kirim] = useReducer(langkahSegitigaK5B7A, undefined, awalSegitigaK5B7A);
  const [lihat, setLihat] = useState<"sedotan" | "sudut" | "sisi">("sedotan");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSegitigaK5B7A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "sedotan" ? ucapSedotanK5B7A(x) : lihat === "sudut" ? ucapSudutK5B7A(x) : ucapSisiK5B7A(x);
  const sd = dataSedotan(x);
  const su = dataSudut(x);
  const si = dataSisi(x);
  const hier = hierarki(jenisSisi(si.sisi));
  const sisiSudahJenis = x.pernah.includes(idSisi(x.sisi.data));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Segitiga</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Uji sisi, hitung sudut, dan bandingkan ciri segitiga.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B7(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "sedotan"} onKlik={() => pilihTampilan("sedotan")}>
          🥤 Sedotan
        </Pilihan>
        <Pilihan aktif={lihat === "sudut"} onKlik={() => pilihTampilan("sudut")}>
          ∠ Sudut
        </Pilihan>
        <Pilihan aktif={lihat === "sisi"} onKlik={() => pilihTampilan("sisi")}>
          📏 Sisi
        </Pilihan>
      </div>

      {lihat === "sedotan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih sedotan">
            {DATA_SEDOTAN.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.sedotan.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Pilih ${d.nama}`}>
                {x.pernah.includes(idSedotan(i)) ? "✅ " : ""}
                {d.sisi.join(", ")}
              </Pilihan>
            ))}
          </div>
          <GambarSedotan sisi={sd.sisi} selesaiUji={x.sedotan.uji.length === 3} nama={sd.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            a = {sd.sisi[0]}, b = {sd.sisi[1]}, c = {sd.sisi[2]}
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Uji pasangan sisi">
            {[0, 1, 2].map((k) => {
              const u = ujiPasangan(sd.sisi, k);
              const sudah = x.sedotan.uji.includes(k);
              return (
                <button key={k} type="button" aria-label={`Uji ${NAMA_PASANG[k]}`} onClick={() => kirim({ t: "S_UJI", k })} className={TOMBOL_KECIL}>
                  {sudah ? (u.lolos ? "✅ " : "❌ ") : ""}
                  {NAMA_PASANG[k]}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Sedotan ini …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan bisa atau tidak">
            <button type="button" aria-label="Pilih bisa jadi segitiga" onClick={() => kirim({ t: "S_JAWAB", jawab: "bisa" })} className={TOMBOL_KECIL}>
              Bisa jadi segitiga
            </button>
            <button type="button" aria-label="Pilih tidak bisa jadi segitiga" onClick={() => kirim({ t: "S_JAWAB", jawab: "tidak" })} className={TOMBOL_KECIL}>
              Tidak bisa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "sudut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih potongan kertas">
            {DATA_SUDUT.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.sudut.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Pilih ${d.nama}`}>
                {x.pernah.includes(idSudut(i)) ? "✅ " : ""}
                {d.p}° dan {d.q}°
              </Pilihan>
            ))}
          </div>
          <GambarSudutSegitiga p={su.p} q={su.q} ketiga={x.sudut.hitung ? (sudutKetiga(su.p, su.q) > 0 ? `${sudutKetiga(su.p, su.q)}°` : "tidak ada") : `${JUMLAH_SUDUT}° − … = ?`} nama={su.nama} />
          <div className="flex justify-center">
            <button type="button" aria-label="Hitung sudut ketiga" onClick={() => kirim({ t: "U_HITUNG" })} className={TOMBOL_KECIL}>
              Hitung sudut ketiga
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Bangun ini …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jenis segitiga menurut sudut">
            <button type="button" aria-label="Pilih segitiga lancip" onClick={() => kirim({ t: "U_JAWAB", jawab: "lancip" })} className={TOMBOL_KECIL}>
              Segitiga lancip
            </button>
            <button type="button" aria-label="Pilih segitiga siku-siku" onClick={() => kirim({ t: "U_JAWAB", jawab: "siku" })} className={TOMBOL_KECIL}>
              Segitiga siku-siku
            </button>
            <button type="button" aria-label="Pilih segitiga tumpul" onClick={() => kirim({ t: "U_JAWAB", jawab: "tumpul" })} className={TOMBOL_KECIL}>
              Segitiga tumpul
            </button>
            <button type="button" aria-label="Pilih bukan segitiga" onClick={() => kirim({ t: "U_JAWAB", jawab: "bukan" })} className={TOMBOL_KECIL}>
              Bukan segitiga
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "sisi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih hiasan">
            {DATA_SISI.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.sisi.data === i} onKlik={() => kirim({ t: "I_DATA", i })} label={`Pilih ${d.nama}`}>
                {x.pernah.includes(idHier(i)) ? "✅ " : x.pernah.includes(idSisi(i)) ? "☑ " : ""}
                {d.sisi.join(", ")}
              </Pilihan>
            ))}
          </div>
          <GambarSisiSegitiga sisi={si.sisi} sorot={x.sisi.impit.slice(-1)} nama={si.nama} />
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Impitkan pasangan sisi">
            {[0, 1, 2].map((k) => {
              const [u, v] = pasanganImpit(si.sisi, k);
              const sudah = x.sisi.impit.includes(k);
              return (
                <button key={k} type="button" aria-label={`Impitkan ${NAMA_PASANG[k].replace("+", "dan")}`} onClick={() => kirim({ t: "I_IMPIT", k })} className={TOMBOL_KECIL}>
                  {sudah ? (u === v ? "= " : "≠ ") : ""}
                  Impit {k === 0 ? "a dan b" : k === 1 ? "a dan c" : "b dan c"}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Menurut sisinya, segitiga ini …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jenis segitiga menurut sisi">
            <button type="button" aria-label="Pilih sama kaki" onClick={() => kirim({ t: "I_JAWAB", jawab: "sama-kaki" })} className={TOMBOL_KECIL}>
              Sama kaki
            </button>
            <button type="button" aria-label="Pilih sama sisi" onClick={() => kirim({ t: "I_JAWAB", jawab: "sama-sisi" })} className={TOMBOL_KECIL}>
              Sama sisi
            </button>
            <button type="button" aria-label="Pilih sembarang" onClick={() => kirim({ t: "I_JAWAB", jawab: "sembarang" })} className={TOMBOL_KECIL}>
              Sembarang
            </button>
          </div>
          {sisiSudahJenis ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">{hier.tanya}</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan hierarki">
                <button type="button" aria-label="Jawab ya" onClick={() => kirim({ t: "I_HIER", jawab: "ya" })} className={TOMBOL_KECIL}>
                  Ya
                </button>
                <button type="button" aria-label="Jawab tidak" onClick={() => kirim({ t: "I_HIER", jawab: "tidak" })} className={TOMBOL_KECIL}>
                  Tidak
                </button>
              </div>
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
          setLihat("sedotan");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B7(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
