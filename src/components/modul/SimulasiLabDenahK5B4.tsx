"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B4 } from "./eja-k5b4";
import { GambarDenah } from "./model-denah-k5b4";
import {
  DATA_BUNGKUS,
  DATA_HILANG,
  DATA_LUAR,
  awalDenahK5B4E,
  dataBungkus,
  dataHilang,
  dataLuar,
  jumlahSisi,
  keadaanDenahK5B4E,
  langkahDenahK5B4E,
  opsiBungkus,
  opsiHasilHilang,
  opsiHilang,
  opsiLuar,
  panjangSekat,
  sisiDenah,
  ucapBungkusK5B4E,
  ucapHilangK5B4E,
  ucapLuarK5B4E,
  type KeadaanDenahK5B4E,
} from "./lab-denah-k5b4e";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B4 Sub-Bab E): Lab Denah. Satu alat, tiga tampilan.            */
/*  Luar    : jumlahkan hanya sisi luar, sekat dalam diabaikan.              */
/*  Bungkus : bungkus denah dengan persegi panjang bila cocok.               */
/*  Hilang  : cari sisi yang belum diketahui dari selisih, lalu jumlahkan.   */
/* Logika: lab-denah-k5b4e.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Luar, ketuk sekat dalam yang putus-putus. Apa kata lab tentang sekat?",
  "Di Bungkus, periksa denah berbentuk U. Mengapa pembungkus tidak cocok?",
  "Di Hilang, lengkapi sisi yang bertanda tanya. Mengapa dicari dengan selisih, bukan dijumlah?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_SISI = "h-11 min-w-0 rounded-xl border-4 border-[#1C01A5] bg-white px-2 text-xs font-black leading-tight text-[#1C01A5]";
const TOMBOL_SEKAT = "h-11 min-w-0 rounded-xl border-4 border-dashed border-[#6B7280] bg-white px-2 text-xs font-black leading-tight text-[#374151]";

export default function SimulasiLabDenahK5B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDenahK5B4E) => void }) {
  const [x, kirim] = useReducer(langkahDenahK5B4E, undefined, awalDenahK5B4E);
  const [lihat, setLihat] = useState<"luar" | "bungkus" | "hilang">("luar");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanDenahK5B4E(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "luar" ? ucapLuarK5B4E(x) : lihat === "bungkus" ? ucapBungkusK5B4E(x) : ucapHilangK5B4E(x);
  const dl = dataLuar(x);
  const sl = sisiDenah(dl.v);
  const db = dataBungkus(x);
  const dh = dataHilang(x);
  const sh = sisiDenah(dh.v);
  const tanpa: boolean[] = [];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Denah</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Keliling gabungan adalah jalur di batas luar saja.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "luar"} onKlik={() => pilihTampilan("luar")}>
          🏠 Luar
        </Pilihan>
        <Pilihan aktif={lihat === "bungkus"} onKlik={() => pilihTampilan("bungkus")}>
          📦 Bungkus
        </Pilihan>
        <Pilihan aktif={lihat === "hilang"} onKlik={() => pilihTampilan("hilang")}>
          ❓ Hilang
        </Pilihan>
      </div>

      {lihat === "luar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih denah">
            {DATA_LUAR.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.luar.data === i} onKlik={() => kirim({ t: "LR_DATA", i })} label={`Denah ${d.nama}`}>
                {x.pernah.includes(`luar:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarDenah v={dl.v} sisi={sl} sekat={dl.sekat} lewat={x.luar.lewat} hilang={[]} bungkus={false} angka />
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Sisi luar denah">
            {sl.map((s, k) => (
              <button key={k} type="button" aria-label={`Sisi luar ${k + 1}`} aria-pressed={x.luar.lewat[k]} onClick={() => kirim({ t: "LR_SISI", k })} className={`${TOMBOL_SISI} ${x.luar.lewat[k] ? "!bg-[#FFE566]" : ""}`}>
                Sisi {k + 1}: {s} m
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Sekat dalam denah">
            {dl.sekat.map((s, j) => (
              <button key={j} type="button" aria-label={`Sekat ${j + 1}`} onClick={() => kirim({ t: "LR_SEKAT", j })} className={TOMBOL_SEKAT}>
                Sekat {j + 1}: {panjangSekat(s)} m
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Jumlah sisi luar: {jumlahSisi(sl.filter((_, k) => x.luar.lewat[k]))} m
          </p>
          <p className="text-center text-sm font-black text-[#1C01A5]">Keliling denah …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling luar">
            {opsiLuar(x.luar.data).map((n) => (
              <button key={n} type="button" aria-label={`Keliling luar ${n}`} onClick={() => kirim({ t: "LR_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                {n} m
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "bungkus" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih denah untuk dibungkus">
            {DATA_BUNGKUS.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.bungkus.data === i} onKlik={() => kirim({ t: "BG_DATA", i })} label={`Bungkus denah ${d.nama}`}>
                {x.pernah.includes(`bungkus:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarDenah v={db.v} sisi={sisiDenah(db.v)} sekat={[]} lewat={tanpa} hilang={[]} bungkus angka />
          <p className="text-center text-sm font-black text-[#1C01A5]">Apakah pembungkus cocok?</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Jawaban pembungkus">
            <button type="button" aria-label="Pembungkus cocok" onClick={() => kirim({ t: "BG_COCOK", ya: true })} className={TOMBOL_KECIL}>
              Cocok
            </button>
            <button type="button" aria-label="Pembungkus tidak cocok" onClick={() => kirim({ t: "BG_COCOK", ya: false })} className={TOMBOL_KECIL}>
              Tidak cocok
            </button>
          </div>
          {x.bungkus.tahuOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Keliling denah …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling bungkus">
                {opsiBungkus(x.bungkus.data).map((n) => (
                  <button key={n} type="button" aria-label={`Keliling bungkus ${n}`} onClick={() => kirim({ t: "BG_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                    {n} m
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "hilang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih denah dengan sisi hilang">
            {DATA_HILANG.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.hilang.data === i} onKlik={() => kirim({ t: "HL_DATA", i })} label={`Hilang denah ${d.nama}`}>
                {x.pernah.includes(`hilang:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarDenah v={dh.v} sisi={sh} sekat={[]} lewat={tanpa} hilang={dh.hilang.filter((g, h) => !x.hilang.ok[h]).map((g) => g.sisi)} bungkus={false} angka />
          {dh.hilang.map((g, h) => (
            <div key={g.sisi} className="space-y-1">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Sisi hilang {h + 1}: {x.hilang.ok[h] ? `${sh[g.sisi]} m` : "…"}
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Pilihan sisi hilang ${h + 1}`}>
                {opsiHilang(x.hilang.data, h).map((n) => (
                  <button key={n} type="button" aria-label={`Sisi hilang ${h + 1} isi ${n}`} onClick={() => kirim({ t: "HL_ISI", h, nilai: n })} className={TOMBOL_KECIL}>
                    {n} m
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-sm font-black text-[#1C01A5]">Keliling setelah dilengkapi …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling hilang">
            {opsiHasilHilang(x.hilang.data).map((n) => (
              <button key={n} type="button" aria-label={`Keliling hilang ${n}`} onClick={() => kirim({ t: "HL_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                {n} m
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
          setLihat("luar");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
