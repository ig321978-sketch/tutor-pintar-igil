"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { GarisLompat, KelompokTitik, TabelSeratus } from "./model-kelipatan-k5b2";
import {
  DATA_CEK,
  DATA_TABEL,
  JARAK,
  MAKS_LOMPAT,
  awalKelipatanK5B2A,
  bagiCek,
  daftarLompat,
  dasarTabel,
  dataCek,
  jarakLompat,
  keadaanKelipatanK5B2A,
  langkahKelipatanK5B2A,
  opsiSisa,
  ucapCekK5B2A,
  ucapLompatK5B2A,
  ucapTabelK5B2A,
  type KeadaanKelipatanK5B2A,
} from "./lab-kelipatan-k5b2a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B2 Sub-Bab A): Lab Lompat Kelipatan. Satu alat, tiga tampilan.  */
/*  Lompat : lompat dengan jarak sama di garis bilangan.                      */
/*  Tabel  : warnai kelipatan di tabel seratus.                               */
/*  Cek    : kelompokkan titik, tentukan sisa, putuskan kelipatan atau bukan. */
/* Logika: lab-kelipatan-k5b2a.ts.                                            */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Lompat, mendaratlah sampai sepuluh kali. Apa yang terjadi pada angka pendaratan?",
  "Di Lompat, bandingkan jarak tiga dan jarak tujuh. Pendaratan mana yang lebih cepat bertambah?",
  "Di Tabel, warnai kelipatan sembilan. Pola apa yang terlihat?",
  "Di Cek, periksa dua puluh lima titik dalam kelompok berisi empat. Mengapa bukan kelipatan?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_JAWAB = "min-h-11 w-full rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1.5 text-sm font-black text-[#1C01A5]";

export default function SimulasiLabKelipatanK5B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKelipatanK5B2A) => void }) {
  const [x, kirim] = useReducer(langkahKelipatanK5B2A, undefined, awalKelipatanK5B2A);
  const [lihat, setLihat] = useState<"lompat" | "tabel" | "cek">("lompat");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanKelipatanK5B2A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "lompat" ? ucapLompatK5B2A(x) : lihat === "tabel" ? ucapTabelK5B2A(x) : ucapCekK5B2A(x);
  const J = jarakLompat(x);
  const mendarat = daftarLompat(x);
  const c = dataCek(x);
  const bagi = bagiCek(c.n, c.d);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Lompat Kelipatan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Kelipatan datang dari lompatan berjarak sama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "lompat"} onKlik={() => pilihTampilan("lompat")}>
          🦘 Lompat
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          🧮 Tabel
        </Pilihan>
        <Pilihan aktif={lihat === "cek"} onKlik={() => pilihTampilan("cek")}>
          ➗ Cek
        </Pilihan>
      </div>

      {lihat === "lompat" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih jarak lompatan">
            {JARAK.map((j, i) => (
              <Pilihan key={j} aktif={x.lompat.jarak === i} onKlik={() => kirim({ t: "L_JARAK", i })} label={`Jarak ${j}`}>
                Jarak {j}
              </Pilihan>
            ))}
          </div>
          <GarisLompat jarak={J} k={x.lompat.k} maks={MAKS_LOMPAT} />
          <div className="flex min-h-9 flex-wrap items-center justify-center gap-1.5" aria-live="polite" aria-label="Pendaratan">
            {mendarat.length === 0 ? <span className="text-xs font-black text-[#1C01A5]">Kamu masih di nol. Tekan Lompat.</span> : null}
            {mendarat.map((v) => (
              <span key={v} className="rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] px-2 py-0.5 text-sm font-black text-[#1C01A5]">
                {v}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Lompat" onClick={() => kirim({ t: "L_LOMPAT" })} className={TOMBOL_KECIL}>
              🦘 Lompat
            </button>
            <button type="button" aria-label="Mulai lagi dari nol" onClick={() => kirim({ t: "L_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Mulai lagi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih kelipatan yang diwarnai">
            {DATA_TABEL.map((d, i) => (
              <Pilihan key={d} aktif={x.tabel.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Warnai kelipatan ${d}`}>
                Kelipatan {d}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk semua kelipatan {dasarTabel(x)}. Ketuk lagi untuk melepas warna.</p>
          <TabelSeratus warna={x.tabel.warna} onKlik={(n) => kirim({ t: "G_KLIK", n })} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Diwarnai: {x.tabel.warna.length} bilangan</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Bersihkan warna" onClick={() => kirim({ t: "G_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Bersihkan
            </button>
            <button type="button" aria-label="Periksa warna" onClick={() => kirim({ t: "G_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "cek" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang dicek">
            {DATA_CEK.map((d, i) => (
              <Pilihan key={`${d.n}-${d.d}`} aktif={x.cek.data === i} onKlik={() => kirim({ t: "C_DATA", i })} label={`${d.n} titik, kelompok ${d.d}`}>
                {d.n} ÷ {d.d}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {c.n} titik dalam kelompok berisi {c.d}
          </p>
          <KelompokTitik q={bagi.q} d={c.d} r={bagi.r} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Sisa titik di luar kelompok penuh …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan sisa">
            {opsiSisa(x.cek.data).map((v) => (
              <button key={v} type="button" aria-label={`Sisa ${v}`} onClick={() => kirim({ t: "C_SISA", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          {x.cek.sisaOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Apakah {c.n} kelipatan {c.d}?
              </p>
              <div className="space-y-2" role="group" aria-label="Putusan">
                <button type="button" aria-label="Jawab ya, kelipatan" onClick={() => kirim({ t: "C_JAWAB", ya: true })} className={TOMBOL_JAWAB}>
                  Ya, kelipatan {c.d}
                </button>
                <button type="button" aria-label="Jawab bukan kelipatan" onClick={() => kirim({ t: "C_JAWAB", ya: false })} className={TOMBOL_JAWAB}>
                  Bukan kelipatan {c.d}
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("lompat");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B1(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
