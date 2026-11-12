"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B7 } from "./eja-k5b7";
import { GambarBangun, GambarSejajar, GambarTangga } from "./model-segiempat-k5b7";
import {
  BANGUN,
  CIRI,
  CIRI_BANGUN,
  DATA_SEJAJAR,
  DATA_TANGGA,
  NAMA_BANGUN,
  awalSegiempatK5B7B,
  bangunCiri,
  dataSejajar,
  dataTangga,
  idCiri,
  idSejajar,
  idTangga,
  keadaanSegiempatK5B7B,
  langkahSegiempatK5B7B,
  ucapCiriK5B7B,
  ucapSejajarK5B7B,
  ucapTanggaK5B7B,
  type KeadaanSegiempatK5B7B,
} from "./lab-segiempat-k5b7b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B7 Sub-Bab B): Lab Segi Empat. Satu alat, tiga tampilan.       */
/*  Ciri    : periksa enam ciri satu bangun, beri nama yang paling tepat.      */
/*  Sejajar : uji sisi atas dan sisi kiri dengan kanan, putuskan trapesium.    */
/*  Tangga  : apakah bangun A termasuk bangun B (hierarki inklusif).           */
/* Logika: lab-segiempat-k5b7b.ts.                                              */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Ciri, periksa keenam ciri. Bangun mana yang punya semua ciri?",
  "Di Sejajar, uji sisi atas dengan garis tegak lurus. Kapan jaraknya sama?",
  "Di Tangga, mengapa persegi termasuk persegi panjang, tetapi persegi panjang belum tentu persegi?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";

export default function SimulasiLabSegiEmpatK5B7({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSegiempatK5B7B) => void }) {
  const [x, kirim] = useReducer(langkahSegiempatK5B7B, undefined, awalSegiempatK5B7B);
  const [lihat, setLihat] = useState<"ciri" | "sejajar" | "tangga">("ciri");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSegiempatK5B7B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "ciri" ? ucapCiriK5B7B(x) : lihat === "sejajar" ? ucapSejajarK5B7B(x) : ucapTanggaK5B7B(x);
  const bc = bangunCiri(x);
  const sj = dataSejajar(x);
  const tg = dataTangga(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Segi Empat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Periksa ciri, uji sisi sejajar, dan naiki tangga bangun.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B7(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "ciri"} onKlik={() => pilihTampilan("ciri")}>
          ✅ Ciri
        </Pilihan>
        <Pilihan aktif={lihat === "sejajar"} onKlik={() => pilihTampilan("sejajar")}>
          ∥ Sejajar
        </Pilihan>
        <Pilihan aktif={lihat === "tangga"} onKlik={() => pilihTampilan("tangga")}>
          ⬆️ Tangga
        </Pilihan>
      </div>

      {lihat === "ciri" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun">
            {BANGUN.map((b, i) => (
              <Pilihan key={b} aktif={x.ciri.data === i} onKlik={() => kirim({ t: "C_DATA", i })} label={`Pilih ${NAMA_BANGUN[b]}`}>
                {x.pernah.includes(idCiri(i)) ? "✅ " : ""}
                {NAMA_BANGUN[b]}
              </Pilihan>
            ))}
          </div>
          <GambarBangun bangun={bc} periksa={x.ciri.periksa} nama={NAMA_BANGUN[bc]} />
          <div className="space-y-1" role="group" aria-label="Periksa ciri">
            {CIRI.map((c, k) => {
              const sudah = x.ciri.periksa.includes(k);
              return (
                <button key={c} type="button" aria-label={`Periksa ciri ${c}`} onClick={() => kirim({ t: "C_PERIKSA", k })} className={`${TOMBOL_KECIL} w-full text-left`}>
                  {sudah ? (CIRI_BANGUN[bc][k] ? "✅ " : "❌ ") : "🔍 "}
                  {c}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Nama yang paling tepat …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih nama bangun">
            {BANGUN.map((b) => (
              <button key={b} type="button" aria-label={`Nama ${NAMA_BANGUN[b]}`} onClick={() => kirim({ t: "C_NAMA", jawab: b })} className={TOMBOL_KECIL}>
                {NAMA_BANGUN[b]}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "sejajar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun yang diuji">
            {DATA_SEJAJAR.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.sejajar.data === i} onKlik={() => kirim({ t: "J_DATA", i })} label={`Uji ${d.nama}`}>
                {x.pernah.includes(idSejajar(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarSejajar titik={sj.titik} atas={x.sejajar.atas} kiri={x.sejajar.kiri} nama={sj.nama} />
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Uji sisi">
            <button type="button" aria-label="Uji sisi atas dengan alas" onClick={() => kirim({ t: "J_ATAS" })} className={TOMBOL_KECIL}>
              {x.sejajar.atas ? "☑ " : ""}Uji sisi atas dan alas
            </button>
            <button type="button" aria-label="Uji sisi kiri dengan kanan" onClick={() => kirim({ t: "J_KIRI" })} className={TOMBOL_KECIL}>
              {x.sejajar.kiri ? "☑ " : ""}Uji sisi kiri dan kanan
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Setidaknya sepasang sisi sejajar. Bangun ini trapesium?</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan trapesium atau bukan">
            <button type="button" aria-label="Jawab trapesium" onClick={() => kirim({ t: "J_JAWAB", jawab: "ya" })} className={TOMBOL_KECIL}>
              Ya, trapesium
            </button>
            <button type="button" aria-label="Jawab bukan trapesium" onClick={() => kirim({ t: "J_JAWAB", jawab: "tidak" })} className={TOMBOL_KECIL}>
              Bukan trapesium
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tangga" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pertanyaan tangga">
            {DATA_TANGGA.map((d, i) => (
              <Pilihan key={`${d.a}-${d.b}`} aktif={x.tangga.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`${NAMA_BANGUN[d.a]} dan ${NAMA_BANGUN[d.b]}`}>
                {x.pernah.includes(idTangga(i)) ? "✅ " : ""}
                {i + 1}
              </Pilihan>
            ))}
          </div>
          <GambarTangga a={tg.a} b={tg.b} namaA={NAMA_BANGUN[tg.a]} namaB={NAMA_BANGUN[tg.b]} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Apakah {NAMA_BANGUN[tg.a]} termasuk {NAMA_BANGUN[tg.b]}?
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan termasuk atau tidak">
            <button type="button" aria-label="Jawab termasuk" onClick={() => kirim({ t: "T_JAWAB", jawab: "ya" })} className={TOMBOL_KECIL}>
              Ya, termasuk
            </button>
            <button type="button" aria-label="Jawab tidak termasuk" onClick={() => kirim({ t: "T_JAWAB", jawab: "tidak" })} className={TOMBOL_KECIL}>
              Tidak termasuk
            </button>
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("ciri");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B7(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
