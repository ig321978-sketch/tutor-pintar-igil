"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B4 } from "./eja-k5b4";
import { KisiLuas, SegiEmpat } from "./model-segiempat-k5b4";
import {
  DATA_BEDA,
  DATA_PERSEGI,
  DATA_PP,
  awalSegiEmpatK5B4C,
  dataBeda,
  dataPP,
  dataPersegi,
  keadaanSegiEmpatK5B4C,
  langkahSegiEmpatK5B4C,
  opsiBedaKeliling,
  opsiBedaLuas,
  opsiJumlahPP,
  opsiKaliPP,
  opsiPersegi,
  ucapBedaK5B4C,
  ucapPPK5B4C,
  ucapPersegiK5B4C,
  type KeadaanSegiEmpatK5B4C,
} from "./lab-segiempat-k5b4c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B4 Sub-Bab C): Lab Segi Empat. Satu alat, tiga tampilan.       */
/*  Persegi Panjang : jumlahkan panjang dan lebar, lalu kalikan dua.         */
/*  Persegi         : empat kali sisi.                                        */
/*  Beda            : keliling dibedakan dari luas.                           */
/* Logika: lab-segiempat-k5b4c.ts.                                            */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Persegi Panjang, hitung lima dan tiga. Mengapa jumlah panjang dan lebar dikali dua?",
  "Di Persegi, hitung sisi lima. Apa bedanya dengan sisi dikali sisi?",
  "Di Beda, hitung keliling dan luas delapan dan empat. Apakah hasilnya sama?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabSegiEmpatK5B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSegiEmpatK5B4C) => void }) {
  const [x, kirim] = useReducer(langkahSegiEmpatK5B4C, undefined, awalSegiEmpatK5B4C);
  const [lihat, setLihat] = useState<"pp" | "persegi" | "beda">("pp");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSegiEmpatK5B4C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "pp" ? ucapPPK5B4C(x) : lihat === "persegi" ? ucapPersegiK5B4C(x) : ucapBedaK5B4C(x);
  const b = dataPP(x);
  const s = dataPersegi(x);
  const d = dataBeda(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Segi Empat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Sisi yang berhadapan sama panjang.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "pp"} onKlik={() => pilihTampilan("pp")}>
          🔲 Persegi Panjang
        </Pilihan>
        <Pilihan aktif={lihat === "persegi"} onKlik={() => pilihTampilan("persegi")}>
          ⬛ Persegi
        </Pilihan>
        <Pilihan aktif={lihat === "beda"} onKlik={() => pilihTampilan("beda")}>
          ⚖️ Beda
        </Pilihan>
      </div>

      {lihat === "pp" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih persegi panjang">
            {DATA_PP.map((v, i) => (
              <Pilihan key={`${v.p}-${v.l}`} aktif={x.pp.data === i} onKlik={() => kirim({ t: "PP_DATA", i })} label={`Persegi panjang ${v.p} dan ${v.l}`}>
                {x.pernah.includes(`pp:${i}`) ? "✅ " : ""}
                {v.p} dan {v.l}
              </Pilihan>
            ))}
          </div>
          <SegiEmpat p={b.p} l={b.l} tanda="pp" angka />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Panjang + lebar = {b.p} + {b.l} = …
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jumlah panjang dan lebar">
            {opsiJumlahPP(x.pp.data).map((n) => (
              <button key={n} type="button" aria-label={`Jumlah ${n}`} onClick={() => kirim({ t: "PP_JUMLAH", nilai: n })} className={TOMBOL_KECIL}>
                {n}
              </button>
            ))}
          </div>
          {x.pp.jumlahOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Keliling = 2 × ({b.p} + {b.l}) = …
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling persegi panjang">
                {opsiKaliPP(x.pp.data).map((n) => (
                  <button key={n} type="button" aria-label={`Kali dua ${n}`} onClick={() => kirim({ t: "PP_KALI", nilai: n })} className={TOMBOL_KECIL}>
                    {n} cm
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "persegi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih persegi">
            {DATA_PERSEGI.map((v, i) => (
              <Pilihan key={v} aktif={x.persegi.data === i} onKlik={() => kirim({ t: "PS_DATA", i })} label={`Persegi sisi ${v}`}>
                {x.pernah.includes(`persegi:${i}`) ? "✅ " : ""}
                sisi {v}
              </Pilihan>
            ))}
          </div>
          <SegiEmpat p={s} l={s} tanda="persegi" angka />
          <p className="text-center text-sm font-black text-[#1C01A5]">Keliling = 4 × {s} = …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling persegi">
            {opsiPersegi(x.persegi.data).map((n) => (
              <button key={n} type="button" aria-label={`Keliling persegi ${n}`} onClick={() => kirim({ t: "PS_HASIL", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "beda" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun">
            {DATA_BEDA.map((v, i) => (
              <Pilihan key={`${v.p}-${v.l}`} aktif={x.beda.data === i} onKlik={() => kirim({ t: "BD_DATA", i })} label={`Bangun ${v.p} dan ${v.l}`}>
                {x.pernah.includes(`beda:${i}`) ? "✅ " : ""}
                {v.p} dan {v.l}
              </Pilihan>
            ))}
          </div>
          <KisiLuas p={d.p} l={d.l} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Keliling = 2 × ({d.p} + {d.l}) = …
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan keliling">
            {opsiBedaKeliling(x.beda.data).map((n) => (
              <button key={n} type="button" aria-label={`Keliling beda ${n}`} onClick={() => kirim({ t: "BD_KELILING", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Luas = {d.p} × {d.l} = …
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas">
            {opsiBedaLuas(x.beda.data).map((n) => (
              <button key={n} type="button" aria-label={`Luas beda ${n}`} onClick={() => kirim({ t: "BD_LUAS", nilai: n })} className={TOMBOL_KECIL}>
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
          setLihat("pp");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
