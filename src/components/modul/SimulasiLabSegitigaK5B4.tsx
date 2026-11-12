"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B4 } from "./eja-k5b4";
import { Penggaris, Segitiga } from "./model-segitiga-k5b4";
import {
  DATA_JUMLAH,
  DATA_SAMA,
  DATA_UKUR,
  SKALA_UKUR,
  awalSegitigaK5B4B,
  dataJumlah,
  dataSama,
  dataUkur,
  jumlahSisi,
  keadaanSegitigaK5B4B,
  langkahSegitigaK5B4B,
  opsiJumlah,
  opsiSama,
  opsiUkur,
  semuaSama,
  ucapJumlahK5B4B,
  ucapSamaK5B4B,
  ucapUkurK5B4B,
  type KeadaanSegitigaK5B4B,
} from "./lab-segitiga-k5b4b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B4 Sub-Bab B): Lab Segitiga. Satu alat, tiga tampilan.         */
/*  Jumlah : ketuk ketiga sisi, lalu pilih keliling.                         */
/*  Sama   : periksa sisi sama panjang, baru boleh dikali tiga.              */
/*  Ukur   : baca tiap sisi pada penggaris, baru jumlahkan.                  */
/* Logika: lab-segitiga-k5b4b.ts.                                            */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Jumlah, ketuk sisi lima, empat, dan tujuh. Berapa jalur kamu berjalan di tepi?",
  "Di Sama, periksa segitiga yang sisinya enam, enam, dan empat. Bolehkah langsung dikali tiga?",
  "Di Ukur, baca ketiga sisi dulu. Mengapa kamu belum boleh menjumlahkan sebelum itu?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_SISI = "h-11 min-w-0 rounded-xl border-4 border-[#1C01A5] bg-white px-2 text-xs font-black leading-tight text-[#1C01A5]";
const TOMBOL_ANGKA = "h-9 min-w-0 rounded-md border-2 border-[#1C01A5] bg-white px-0 text-xs font-black leading-none text-[#1C01A5]";

export default function SimulasiLabSegitigaK5B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSegitigaK5B4B) => void }) {
  const [x, kirim] = useReducer(langkahSegitigaK5B4B, undefined, awalSegitigaK5B4B);
  const [lihat, setLihat] = useState<"jumlah" | "sama" | "ukur">("jumlah");
  const [sisiUkur, setSisiUkur] = useState(0);

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSegitigaK5B4B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "jumlah" ? ucapJumlahK5B4B(x) : lihat === "sama" ? ucapSamaK5B4B(x) : ucapUkurK5B4B(x);
  const sj = dataJumlah(x);
  const ss = dataSama(x);
  const su = dataUkur(x);
  const tanpaTanda = [false, false, false];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Segitiga</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Keliling segitiga adalah jumlah ketiga sisinya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "jumlah"} onKlik={() => pilihTampilan("jumlah")}>
          ➕ Jumlah
        </Pilihan>
        <Pilihan aktif={lihat === "sama"} onKlik={() => pilihTampilan("sama")}>
          🔺 Sama
        </Pilihan>
        <Pilihan aktif={lihat === "ukur"} onKlik={() => pilihTampilan("ukur")}>
          📏 Ukur
        </Pilihan>
      </div>

      {lihat === "jumlah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih segitiga">
            {DATA_JUMLAH.map((d, i) => (
              <Pilihan key={d.join("-")} aktif={x.jumlah.data === i} onKlik={() => kirim({ t: "JM_DATA", i })} label={`Segitiga ${d.join(", ")}`}>
                {x.pernah.includes(`jumlah:${i}`) ? "✅ " : ""}
                {d.join(", ")}
              </Pilihan>
            ))}
          </div>
          <Segitiga sisi={sj} lewat={x.jumlah.lewat} angka tanda={false} />
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Sisi segitiga">
            {sj.map((s, k) => (
              <button key={k} type="button" aria-label={`Sisi ${k + 1}`} aria-pressed={x.jumlah.lewat[k]} onClick={() => kirim({ t: "JM_SISI", k })} className={`${TOMBOL_SISI} ${x.jumlah.lewat[k] ? "!bg-[#FFE566]" : ""}`}>
                Sisi {k + 1}: {s} cm
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Jumlah sekarang: {jumlahSisi(sj.filter((_, k) => x.jumlah.lewat[k]))} cm
          </p>
          <p className="text-center text-sm font-black text-[#1C01A5]">Keliling segitiga …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling">
            {opsiJumlah(x.jumlah.data).map((n) => (
              <button key={n} type="button" aria-label={`Keliling ${n}`} onClick={() => kirim({ t: "JM_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "sama" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih segitiga untuk diperiksa">
            {DATA_SAMA.map((d, i) => (
              <Pilihan key={d.join("-")} aktif={x.sama.data === i} onKlik={() => kirim({ t: "SM_DATA", i })} label={`Periksa segitiga ${d.join(", ")}`}>
                {x.pernah.includes(`sama:${i}`) ? "✅ " : ""}
                {d.join(", ")}
              </Pilihan>
            ))}
          </div>
          <Segitiga sisi={ss} lewat={tanpaTanda} angka tanda={x.sama.tandaOk} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Apakah ketiga sisinya sama panjang?</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Jawaban sisi sama">
            <button type="button" aria-label="Ketiga sisi sama" onClick={() => kirim({ t: "SM_JAWAB", ya: true })} className={TOMBOL_KECIL}>
              Ya, ketiganya sama
            </button>
            <button type="button" aria-label="Tidak semuanya sama" onClick={() => kirim({ t: "SM_JAWAB", ya: false })} className={TOMBOL_KECIL}>
              Tidak semuanya
            </button>
          </div>
          {x.sama.tandaOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">{semuaSama(ss) ? `Keliling, 3 × ${ss[0]} …` : "Keliling, jumlah ketiga sisi …"}</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling sama">
                {opsiSama(x.sama.data).map((n) => (
                  <button key={n} type="button" aria-label={`Keliling sama ${n}`} onClick={() => kirim({ t: "SM_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                    {n} cm
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "ukur" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih segitiga untuk diukur">
            {DATA_UKUR.map((d, i) => (
              <Pilihan
                key={d.join("-")}
                aktif={x.ukur.data === i}
                onKlik={() => {
                  setSisiUkur(0);
                  kirim({ t: "UK_DATA", i });
                }}
                label={`Ukur segitiga ${i + 1}`}
              >
                {x.pernah.includes(`ukur:${i}`) ? "✅ " : ""}Segitiga {i + 1}
              </Pilihan>
            ))}
          </div>
          <Segitiga sisi={su} lewat={x.ukur.ok} angka={false} tanda={false} />
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Sisi yang diukur">
            {su.map((_, k) => (
              <button key={k} type="button" aria-label={`Ukur sisi ${k + 1}`} aria-pressed={sisiUkur === k} onClick={() => setSisiUkur(k)} className={`${TOMBOL_SISI} ${sisiUkur === k ? "!bg-[#FFE566]" : ""}`}>
                {x.ukur.ok[k] ? "✅ " : ""}Sisi {k + 1}
              </button>
            ))}
          </div>
          <Penggaris panjang={su[sisiUkur]} maks={SKALA_UKUR} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Ujung sisi {sisiUkur + 1} ada di angka …</p>
          <div className="grid grid-cols-6 gap-1" role="group" aria-label="Angka pada penggaris">
            {Array.from({ length: SKALA_UKUR }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" aria-label={`Angka ${n}`} onClick={() => kirim({ t: "UK_UKUR", k: sisiUkur, nilai: n })} className={TOMBOL_ANGKA}>
                {n}
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Keliling setelah diukur …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling ukur">
            {opsiUkur(x.ukur.data).map((n) => (
              <button key={n} type="button" aria-label={`Keliling ukur ${n}`} onClick={() => kirim({ t: "UK_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm
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
          setSisiUkur(0);
          setLihat("jumlah");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
