"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B5 } from "./eja-k5b5";
import { GambarBagian, GambarSilang, GambarTumpang } from "./model-gabungan-k5b5";
import {
  DATA_SILANG,
  DATA_TUMPANG,
  DATA_URAIAN,
  NAMA_BAGIAN,
  awalGabunganK5B5C,
  dataSilang,
  dataTumpang,
  dataUraian,
  keadaanGabunganK5B5C,
  langkahGabunganK5B5C,
  opsiBagian,
  opsiIrisan,
  opsiSilang,
  opsiTotal,
  opsiTotalTumpang,
  ucapSilangK5B5C,
  ucapTumpangK5B5C,
  ucapUraikanK5B5C,
  type KeadaanGabunganK5B5C,
} from "./lab-gabungan-k5b5c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B5 Sub-Bab C): Lab Gabungan. Satu alat, tiga tampilan.         */
/*  Uraikan : hitung luas tiap bagian dengan rumusnya, lalu jumlahkan.        */
/*  Silang  : urai denah L dengan dua cara, lalu periksa hasilnya sama.       */
/*  Tumpang : bagian yang menumpuk dihitung satu kali.                        */
/* Logika: lab-gabungan-k5b5c.ts.                                             */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Uraikan, hitung luas tiap bagian dulu. Apa yang terjadi bila satu bagian terlewat?",
  "Di Silang, hitung denah L dengan cara satu dan cara dua. Mengapa hasilnya harus sama?",
  "Di Tumpang, hitung dulu bagian yang menumpuk. Mengapa luas gabungan bukan jumlah kedua luas?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabGabunganK5B5({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanGabunganK5B5C) => void }) {
  const [x, kirim] = useReducer(langkahGabunganK5B5C, undefined, awalGabunganK5B5C);
  const [lihat, setLihat] = useState<"uraikan" | "silang" | "tumpang">("uraikan");
  const [cara, setCara] = useState(1);

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanGabunganK5B5C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "uraikan" ? ucapUraikanK5B5C(x) : lihat === "silang" ? ucapSilangK5B5C(x) : ucapTumpangK5B5C(x);
  const u = dataUraian(x);
  const d = dataSilang(x);
  const t = dataTumpang(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Gabungan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Urai bangun gabungan menjadi bagian, hitung tiap bagian, lalu jumlahkan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "uraikan"} onKlik={() => pilihTampilan("uraikan")}>
          ✂️ Uraikan
        </Pilihan>
        <Pilihan aktif={lihat === "silang"} onKlik={() => pilihTampilan("silang")}>
          🔀 Silang
        </Pilihan>
        <Pilihan aktif={lihat === "tumpang"} onKlik={() => pilihTampilan("tumpang")}>
          🧩 Tumpang
        </Pilihan>
      </div>

      {lihat === "uraikan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun gabungan">
            {DATA_URAIAN.map((b, i) => (
              <Pilihan key={b.nama} aktif={x.uraikan.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Bangun ${b.nama}`}>
                {x.pernah.includes(`uraikan:${i}`) ? "✅ " : ""}
                {b.nama}
              </Pilihan>
            ))}
          </div>
          <GambarBagian u={u} ok={x.uraikan.bagianOk} />
          {u.bagian.map((b, k) => (
            <div key={k} className="space-y-1.5">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Bagian {k + 1}, {NAMA_BAGIAN[b.jenis]}, luasnya …
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Pilihan luas bagian ${k + 1}`}>
                {opsiBagian(x.uraikan.data, k).map((n) => (
                  <button key={n} type="button" aria-label={`Bagian ${k + 1} luas ${n}`} onClick={() => kirim({ t: "U_BAGIAN", k, nilai: n })} className={TOMBOL_KECIL}>
                    {n} cm²
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas seluruh bangun, jumlah semua bagian …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas seluruh bangun">
            {opsiTotal(x.uraikan.data).map((n) => (
              <button key={n} type="button" aria-label={`Luas seluruhnya ${n}`} onClick={() => kirim({ t: "U_TOTAL", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm²
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "silang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih denah">
            {DATA_SILANG.map((b, i) => (
              <Pilihan key={`${b.W}-${b.H}`} aktif={x.silang.data === i} onKlik={() => kirim({ t: "SI_DATA", i })} label={`Denah ${b.W} kali ${b.H} takik ${b.w} kali ${b.h}`}>
                {x.pernah.includes(`silang:${i}`) ? "✅ " : ""}
                {b.W} kali {b.H}, takik {b.w} kali {b.h}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih cara menguraikan">
            <Pilihan aktif={cara === 1} onKlik={() => setCara(1)} label="Tampilkan cara 1">
              Cara 1 (Yohana){x.silang.ok1 ? " ✅" : ""}
            </Pilihan>
            <Pilihan aktif={cara === 2} onKlik={() => setCara(2)} label="Tampilkan cara 2">
              Cara 2 (Komang){x.silang.ok2 ? " ✅" : ""}
            </Pilihan>
          </div>
          <GambarSilang d={d} cara={cara} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas denah dengan cara {cara} …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Pilihan luas cara ${cara}`}>
            {opsiSilang(x.silang.data, cara).map((n) => (
              <button key={n} type="button" aria-label={`Cara ${cara} luas ${n}`} onClick={() => kirim({ t: "SI_TOTAL", c: cara, nilai: n })} className={TOMBOL_KECIL}>
                {n} cm²
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Hasil kedua cara …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Bandingkan hasil kedua cara">
            <button type="button" aria-label="Hasil kedua cara sama" onClick={() => kirim({ t: "SI_SAMA", jawab: "sama" })} className={TOMBOL_KECIL}>
              Sama
            </button>
            <button type="button" aria-label="Hasil kedua cara beda" onClick={() => kirim({ t: "SI_SAMA", jawab: "beda" })} className={TOMBOL_KECIL}>
              Beda
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tumpang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bangun">
            {DATA_TUMPANG.map((b, i) => (
              <Pilihan key={`${b.A.w}-${b.B.w}`} aktif={x.tumpang.data === i} onKlik={() => kirim({ t: "TU_DATA", i })} label={`Pasangan ${b.A.w} kali ${b.A.h} dan ${b.B.w} kali ${b.B.h}`}>
                {x.pernah.includes(`tumpang:${i}`) ? "✅ " : ""}
                {b.A.w} kali {b.A.h} dan {b.B.w} kali {b.B.h}
              </Pilihan>
            ))}
          </div>
          <GambarTumpang t={t} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas bagian yang menumpuk …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan bagian yang menumpuk">
            {opsiIrisan(x.tumpang.data).map((n) => (
              <button key={n} type="button" aria-label={`Menumpuk ${n}`} onClick={() => kirim({ t: "TU_IRISAN", nilai: n })} className={TOMBOL_KECIL}>
                {n} cm²
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas gabungan kedua bangun …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas gabungan">
            {opsiTotalTumpang(x.tumpang.data).map((n) => (
              <button key={n} type="button" aria-label={`Gabungan ${n}`} onClick={() => kirim({ t: "TU_TOTAL", nilai: n })} className={TOMBOL_KECIL}>
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
          setLihat("uraikan");
          setCara(1);
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
