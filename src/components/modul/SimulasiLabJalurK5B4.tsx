"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B4 } from "./eja-k5b4";
import { BangunJalan, KisiBanding, KisiTanah } from "./model-jalur-k5b4";
import {
  DATA_BANDING,
  DATA_JALAN,
  DATA_PAGAR,
  KEPERLUAN,
  TEPI,
  awalJalurK5B4A,
  dataBanding,
  dataJalan,
  dataPagar,
  jumlahSisi,
  keadaanJalurK5B4A,
  langkahJalurK5B4A,
  opsiIsi,
  opsiJalur,
  panjangTepi,
  totalRuas,
  ucapBandingK5B4A,
  ucapJalanK5B4A,
  ucapPagarK5B4A,
  type KeadaanJalurK5B4A,
} from "./lab-jalur-k5b4a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B4 Sub-Bab A): Lab Jalur. Satu alat, tiga tampilan.            */
/*  Jalan   : susuri sisi bangun sampai kembali ke sudut awal.               */
/*  Pagar   : pasang ruas pagar di tepi tanah berpetak.                      */
/*  Banding : bedakan jalur tepi dari isi petak.                             */
/* Logika: lab-jalur-k5b4a.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Jalan, susuri persegi sisi empat sentimeter. Berapa jauh kamu berjalan sampai kembali ke awal?",
  "Di Pagar, pasang ruas di semua tepi tanah. Apa bedanya dengan banyak petak di dalam?",
  "Di Banding, bandingkan dua bangun yang jalur tepinya sama. Apakah isinya sama?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_SISI = "h-11 min-w-0 rounded-xl border-4 border-[#1C01A5] bg-white px-2 text-xs font-black leading-tight text-[#1C01A5]";
const TOMBOL_PUTAR = "h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30";

export default function SimulasiLabJalurK5B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJalurK5B4A) => void }) {
  const [x, kirim] = useReducer(langkahJalurK5B4A, undefined, awalJalurK5B4A);
  const [lihat, setLihat] = useState<"jalan" | "pagar" | "banding">("jalan");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanJalurK5B4A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "jalan" ? ucapJalanK5B4A(x) : lihat === "pagar" ? ucapPagarK5B4A(x) : ucapBandingK5B4A(x);
  const b = dataJalan(x);
  const t = dataPagar(x);
  const q = dataBanding(x);
  const kep = KEPERLUAN[x.banding.data];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Jalur</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Keliling adalah panjang jalur di tepi bangun.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "jalan"} onKlik={() => pilihTampilan("jalan")}>
          🚶 Jalan
        </Pilihan>
        <Pilihan aktif={lihat === "pagar"} onKlik={() => pilihTampilan("pagar")}>
          🧱 Pagar
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
      </div>

      {lihat === "jalan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun yang ditelusuri">
            {DATA_JALAN.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.jalan.data === i} onKlik={() => kirim({ t: "J_DATA", i })} label={`Telusuri ${d.nama}`}>
                {x.pernah.includes(`jalan:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <BangunJalan sisi={b.sisi} langkah={x.jalan.langkah} selesai={x.jalan.selesai} />
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Jalur sekarang: {x.jalan.langkah === 0 ? "0" : jumlahSisi(b.sisi, x.jalan.langkah)} cm
          </p>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Sisi bangun">
            {b.sisi.map((s, k) => (
              <button key={k} type="button" aria-label={`Sisi ${k + 1}`} aria-pressed={k < x.jalan.langkah} onClick={() => kirim({ t: "J_SISI", k })} className={`${TOMBOL_SISI} ${k < x.jalan.langkah ? "!bg-[#FFE566]" : ""}`}>
                Sisi {k + 1}: {s} cm
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" aria-label="Kembali ke sudut awal" onClick={() => kirim({ t: "J_KEMBALI" })} className={TOMBOL_KECIL}>
              Kembali ke sudut awal
            </button>
            <button type="button" aria-label="Mulai lagi" onClick={() => kirim({ t: "J_DATA", i: x.jalan.data })} className={TOMBOL_BIASA}>
              Mulai lagi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "pagar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tanah">
            {DATA_PAGAR.map((d, i) => (
              <Pilihan key={`${d.w}-${d.h}`} aktif={x.pagar.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Tanah ${d.w} petak panjang ${d.h} petak lebar`}>
                {x.pernah.includes(`pagar:${i}`) ? "✅ " : ""}
                {d.w} dan {d.h} petak
              </Pilihan>
            ))}
          </div>
          <KisiTanah w={t.w} h={t.h} ruas={x.pagar.ruas} />
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ruas pagar tiap tepi">
            {TEPI.map((nama, k) => (
              <div key={nama} className="flex items-center justify-between gap-1 rounded-2xl border-2 border-[#1C01A5] bg-[#F5F3FF] px-2 py-1.5">
                <span className="text-xs font-black leading-tight text-[#1C01A5]">
                  Tepi {nama}
                  <br />
                  <span className="font-bold">{panjangTepi(t, k)} petak</span>
                </span>
                <button type="button" aria-label={`Kurangi ruas ${nama}`} disabled={x.pagar.ruas[k] <= 0} onClick={() => kirim({ t: "P_RUAS", k, d: -1 })} className={`${TOMBOL_PUTAR} bg-white`}>
                  –
                </button>
                <span className="w-5 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
                  {x.pagar.ruas[k]}
                </span>
                <button type="button" aria-label={`Tambah ruas ${nama}`} onClick={() => kirim({ t: "P_RUAS", k, d: 1 })} className={`${TOMBOL_PUTAR} bg-[#FFE566]`}>
                  +
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Ruas pagar terpasang: {totalRuas(x)}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa pagar" onClick={() => kirim({ t: "P_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun">
            {DATA_BANDING.map((d, i) => (
              <Pilihan key={`${d.w}-${d.h}`} aktif={x.banding.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Bangun ${d.w} petak panjang ${d.h} petak lebar`}>
                {x.pernah.includes(`jalur:${i}`) && x.pernah.includes(`isi:${i}`) ? "✅ " : ""}
                {d.w} dan {d.h} petak
              </Pilihan>
            ))}
          </div>
          <KisiBanding w={q.w} h={q.h} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Untuk {kep.teks}, yang dihitung …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keperluan">
            <button type="button" aria-label="Keperluan jalur tepi" onClick={() => kirim({ t: "B_PERLU", jawab: "jalur" })} className={TOMBOL_KECIL}>
              Jalur tepi
            </button>
            <button type="button" aria-label="Keperluan isi petak" onClick={() => kirim({ t: "B_PERLU", jawab: "isi" })} className={TOMBOL_KECIL}>
              Isi petak
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Jalur tepi, jumlah semua sisi …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jalur tepi">
            {opsiJalur(x.banding.data).map((n) => (
              <button key={n} type="button" aria-label={`Jalur tepi ${n}`} onClick={() => kirim({ t: "B_JALUR", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Isi, banyak petak di dalam …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan isi petak">
            {opsiIsi(x.banding.data).map((n) => (
              <button key={n} type="button" aria-label={`Isi petak ${n}`} onClick={() => kirim({ t: "B_ISI", nilai: n })} className={TOMBOL_KECIL}>
                {n} petak
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
          setLihat("jalan");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
