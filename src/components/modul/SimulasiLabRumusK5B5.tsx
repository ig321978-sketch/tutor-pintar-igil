"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B5 } from "./eja-k5b5";
import { GambarKali, GambarSetengah, GambarTrap } from "./model-rumus-k5b5";
import {
  DATA_KALI,
  DATA_SETENGAH,
  DATA_TRAP,
  awalRumusK5B5B,
  dataKali,
  dataSetengah,
  dataTrap,
  keadaanRumusK5B5B,
  langkahRumusK5B5B,
  opsiAlas,
  opsiKali,
  opsiSetengah,
  opsiTinggi,
  opsiTrap,
  ucapKaliK5B5B,
  ucapSetengahK5B5B,
  ucapTrapK5B5B,
  type KeadaanRumusK5B5B,
} from "./lab-rumus-k5b5b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B5 Sub-Bab B): Lab Rumus. Satu alat, tiga tampilan.            */
/*  Kali      : luas sama dengan alas dikali tinggi (tinggi bukan sisi miring). */
/*  Setengah  : dua bangun yang sama menyusun persegi panjang.                */
/*  Trapesium : dua trapesium menyusun jajargenjang.                          */
/* Logika: lab-rumus-k5b5b.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Kali, pilih jajargenjang alas delapan. Mengapa sisi miring tidak dikalikan dengan alas?",
  "Di Setengah, susun dua segitiga menjadi persegi panjang. Mengapa luas satu segitiga hanya setengahnya?",
  "Di Trapesium, susun dua trapesium menjadi jajargenjang. Apa yang menjadi alas jajargenjang itu?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabRumusK5B5({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanRumusK5B5B) => void }) {
  const [x, kirim] = useReducer(langkahRumusK5B5B, undefined, awalRumusK5B5B);
  const [lihat, setLihat] = useState<"kali" | "setengah" | "trapesium">("kali");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanRumusK5B5B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "kali" ? ucapKaliK5B5B(x) : lihat === "setengah" ? ucapSetengahK5B5B(x) : ucapTrapK5B5B(x);
  const k = dataKali(x);
  const s = dataSetengah(x);
  const t = dataTrap(x);
  const tinggiPilih = opsiTinggi(x.kali.data);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Rumus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Luas bangun dihitung dari ukuran, tanpa menghitung petak satu per satu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "kali"} onKlik={() => pilihTampilan("kali")}>
          ✖️ Kali
        </Pilihan>
        <Pilihan aktif={lihat === "setengah"} onKlik={() => pilihTampilan("setengah")}>
          ➗ Setengah
        </Pilihan>
        <Pilihan aktif={lihat === "trapesium"} onKlik={() => pilihTampilan("trapesium")}>
          📐 Trapesium
        </Pilihan>
      </div>

      {lihat === "kali" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun">
            {DATA_KALI.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.kali.data === i} onKlik={() => kirim({ t: "K_DATA", i })} label={`Bangun ${d.nama}`}>
                {x.pernah.includes(`kali:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarKali d={k} tinggiOk={x.kali.tinggiOk} />
          {tinggiPilih.length > 0 ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Yang menjadi tinggi adalah …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan tinggi">
                {tinggiPilih.map((n) => (
                  <button key={n} type="button" aria-label={`Tinggi ${n}`} onClick={() => kirim({ t: "K_TINGGI", nilai: n })} className={TOMBOL_KECIL}>
                    {n} cm
                  </button>
                ))}
              </div>
            </>
          ) : null}
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas, alas dikali tinggi …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas">
            {opsiKali(x.kali.data).map((n) => (
              <button key={n} type="button" aria-label={`Luas ${n}`} onClick={() => kirim({ t: "K_LUAS", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm²
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "setengah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun">
            {DATA_SETENGAH.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.setengah.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Bangun ${d.nama}`}>
                {x.pernah.includes(`setengah:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarSetengah d={s} ganda={x.setengah.ganda} />
          <div className="flex justify-center">
            <button type="button" aria-label="Gandakan bangun" onClick={() => kirim({ t: "S_GANDA" })} className={TOMBOL_KECIL}>
              Gandakan jadi persegi panjang
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas satu bangun …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas satu bangun">
            {opsiSetengah(x.setengah.data).map((n) => (
              <button key={n} type="button" aria-label={`Luas satu bangun ${n}`} onClick={() => kirim({ t: "S_LUAS", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm²
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "trapesium" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih trapesium">
            {DATA_TRAP.map((d, i) => (
              <Pilihan key={`${d.a}-${d.b}`} aktif={x.trap.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Trapesium ${d.a} dan ${d.b} tinggi ${d.t}`}>
                {x.pernah.includes(`trap:${i}`) ? "✅ " : ""}
                {d.a} dan {d.b}, tinggi {d.t}
              </Pilihan>
            ))}
          </div>
          <GambarTrap d={t} ganda={x.trap.ganda} />
          <div className="flex justify-center">
            <button type="button" aria-label="Susun jajargenjang" onClick={() => kirim({ t: "T_GANDA" })} className={TOMBOL_KECIL}>
              Susun dua trapesium
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Alas jajargenjang …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan alas jajargenjang">
            {opsiAlas(x.trap.data).map((n) => (
              <button key={n} type="button" aria-label={`Alas ${n}`} onClick={() => kirim({ t: "T_ALAS", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas satu trapesium …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas trapesium">
            {opsiTrap(x.trap.data).map((n) => (
              <button key={n} type="button" aria-label={`Luas trapesium ${n}`} onClick={() => kirim({ t: "T_LUAS", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm²
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
          setLihat("kali");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
