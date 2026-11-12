"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B4 } from "./eja-k5b4";
import { SegiBeda, SegiBeraturan } from "./model-segibanyak-k5b4";
import {
  DATA_BEDA,
  DATA_BERATURAN,
  DATA_TABEL,
  awalSegiBanyakK5B4D,
  dataBeda,
  dataBeraturan,
  dataTabel,
  jumlahSisi,
  keadaanSegiBanyakK5B4D,
  langkahSegiBanyakK5B4D,
  namaN,
  opsiBanyakSisi,
  opsiBeda,
  opsiBeraturan,
  opsiTabel,
  ucapBedaK5B4D,
  ucapBeraturanK5B4D,
  ucapTabelK5B4D,
  type KeadaanSegiBanyakK5B4D,
} from "./lab-segibanyak-k5b4d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B4 Sub-Bab D): Lab Segi Banyak. Satu alat, tiga tampilan.      */
/*  Beraturan : banyak sisi, lalu banyak sisi dikali panjang sisi.            */
/*  Beda      : sisi tidak sama panjang, jumlahkan satu per satu.             */
/*  Tabel     : isi keliling tiap baris dan temukan polanya.                  */
/* Logika: lab-segibanyak-k5b4d.ts.                                           */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Beraturan, hitung segi lima bersisi tiga. Mengapa boleh dikali lima?",
  "Di Beda, ketuk semua sisi. Mengapa sisi yang berbeda tidak boleh dikali banyak sisi?",
  "Di Tabel, isi sampai penuh. Pola apa yang kamu lihat pada kelilingnya?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_SISI = "h-11 min-w-0 rounded-xl border-4 border-[#1C01A5] bg-white px-2 text-xs font-black leading-tight text-[#1C01A5]";

export default function SimulasiLabSegiBanyakK5B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSegiBanyakK5B4D) => void }) {
  const [x, kirim] = useReducer(langkahSegiBanyakK5B4D, undefined, awalSegiBanyakK5B4D);
  const [lihat, setLihat] = useState<"ber" | "beda" | "tabel">("ber");
  const [baris, setBaris] = useState(0);

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSegiBanyakK5B4D(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "ber" ? ucapBeraturanK5B4D(x) : lihat === "beda" ? ucapBedaK5B4D(x) : ucapTabelK5B4D(x);
  const b = dataBeraturan(x);
  const d = dataBeda(x);
  const t = dataTabel(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Segi Banyak</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Sisi sama boleh dikali, sisi berbeda dijumlah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "ber"} onKlik={() => pilihTampilan("ber")}>
          🔷 Beraturan
        </Pilihan>
        <Pilihan aktif={lihat === "beda"} onKlik={() => pilihTampilan("beda")}>
          🔶 Beda
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          📋 Tabel
        </Pilihan>
      </div>

      {lihat === "ber" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih segi beraturan">
            {DATA_BERATURAN.map((v, i) => (
              <Pilihan key={`${v.n}-${v.s}`} aktif={x.ber.data === i} onKlik={() => kirim({ t: "BR_DATA", i })} label={`Pilih ${namaN(v.n)} sisi ${v.s}`}>
                {x.pernah.includes(`ber:${i}`) ? "✅ " : ""}
                {namaN(v.n)} sisi {v.s}
              </Pilihan>
            ))}
          </div>
          <SegiBeraturan n={b.n} s={b.s} tanda={x.ber.sisiOk} />
          <p className="text-center text-sm font-black text-[#1C01A5]">{namaN(b.n)} beraturan punya … sisi</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan banyak sisi">
            {opsiBanyakSisi(x.ber.data).map((v) => (
              <button key={v} type="button" aria-label={`Banyak sisi ${v}`} onClick={() => kirim({ t: "BR_SISI", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          {x.ber.sisiOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Keliling = {b.n} × {b.s} = …
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling beraturan">
                {opsiBeraturan(x.ber.data).map((v) => (
                  <button key={v} type="button" aria-label={`Keliling beraturan ${v}`} onClick={() => kirim({ t: "BR_HASIL", nilai: v })} className={TOMBOL_KECIL}>
                    {v} cm
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "beda" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih segi dengan sisi berbeda">
            {DATA_BEDA.map((v, i) => (
              <Pilihan key={v.join("-")} aktif={x.beda.data === i} onKlik={() => kirim({ t: "BD_DATA", i })} label={`Sisi berbeda ${v.join(", ")}`}>
                {x.pernah.includes(`beda:${i}`) ? "✅ " : ""}
                {v.join(", ")}
              </Pilihan>
            ))}
          </div>
          <SegiBeda sisi={d} lewat={x.beda.lewat} />
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Sisi segi banyak">
            {d.map((s, k) => (
              <button key={k} type="button" aria-label={`Sisi ${k + 1}`} aria-pressed={x.beda.lewat[k]} onClick={() => kirim({ t: "BD_SISI", k })} className={`${TOMBOL_SISI} ${x.beda.lewat[k] ? "!bg-[#FFE566]" : ""}`}>
                Sisi {k + 1}: {s} cm
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Jumlah sekarang: {jumlahSisi(d.filter((_, k) => x.beda.lewat[k]))} cm
          </p>
          <p className="text-center text-sm font-black text-[#1C01A5]">Keliling {namaN(d.length)} …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling sisi berbeda">
            {opsiBeda(x.beda.data).map((v) => (
              <button key={v} type="button" aria-label={`Keliling beda ${v}`} onClick={() => kirim({ t: "BD_HASIL", nilai: v })} className={TOMBOL_KECIL}>
                {v} cm
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tabel">
            {DATA_TABEL.map((v, i) => (
              <Pilihan
                key={v.s}
                aktif={x.tabel.data === i}
                onKlik={() => {
                  setBaris(0);
                  kirim({ t: "TB_DATA", i });
                }}
                label={`Tabel sisi ${v.s}`}
              >
                {x.pernah.includes(`tabel:${i}`) ? "✅ " : ""}
                sisi {v.s} cm
              </Pilihan>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Baris tabel">
            {t.baris.map((n, k) => (
              <button
                key={n}
                type="button"
                aria-label={`Baris ${namaN(n)}`}
                aria-pressed={baris === k}
                onClick={() => setBaris(Math.min(k, t.baris.length - 1))}
                className={`${TOMBOL_SISI} ${baris === k ? "!bg-[#FFE566]" : ""}`}
              >
                {namaN(n)} ({n} sisi): {x.tabel.ok[k] ? `${n * t.s} cm ✅` : "?"}
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Baris {namaN(t.baris[Math.min(baris, t.baris.length - 1)])}: keliling …
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan isi tabel">
            {opsiTabel(x.tabel.data, Math.min(baris, t.baris.length - 1)).map((v) => (
              <button key={v} type="button" aria-label={`Isi tabel ${v}`} onClick={() => kirim({ t: "TB_ISI", k: Math.min(baris, t.baris.length - 1), nilai: v })} className={TOMBOL_KECIL}>
                {v} cm
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
          setBaris(0);
          setLihat("ber");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
