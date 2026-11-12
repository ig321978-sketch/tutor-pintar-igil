"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B2 } from "./eja-k4b2";
import { Batang, Kisi100, Pengatur, TulisPecahan } from "./model-pecahan-k4b2";
import {
  CERITA_E,
  awalPersenK4B2E,
  desimalSeratusan,
  keadaanPersenK4B2E,
  langkahCara,
  langkahPersenK4B2E,
  pengaliSeratus,
  ucapCeritaK4B2E,
  ucapKisiK4B2E,
  ucapUbahK4B2E,
  type KeadaanPersenK4B2E,
} from "./lab-persen-k4b2e";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B2 Sub-Bab E): Lab Persen. Satu alat, tiga tampilan.           */
/*  Kisi   : k kotak dari 100 = k% = 0,kk.                                     */
/*  Ubah   : desimal dan persen, cara biasa dan cara langsung.                 */
/*  Cerita : a dari b diubah penyebutnya menjadi seratus, lalu persen.         */
/* Logika: lab-persen-k4b2e.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Kisi, atur 36 kotak dan baca persennya.",
  "Ubah 0,75 menjadi persen dengan cara biasa dan cara langsung. Apakah hasilnya sama?",
  "Ubah 2,46 menjadi persen. Boleh lebih dari 100%?",
  "Di Cerita, ubah penyebut 20 dari 50 siswa menjadi seratus.",
];

const arsirBagian = (p: number): number[] => Array.from({ length: p }, (_, i) => i);
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 font-black text-[#1C01A5]";

export default function SimulasiLabPersenK4B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPersenK4B2E) => void }) {
  const [x, kirim] = useReducer(langkahPersenK4B2E, undefined, awalPersenK4B2E);
  const [lihat, setLihat] = useState<"kisi" | "ubah" | "cerita">("kisi");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPersenK4B2E(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "kisi" ? ucapKisiK4B2E(x) : lihat === "ubah" ? ucapUbahK4B2E(x) : ucapCeritaK4B2E(x);
  const cerita = CERITA_E[x.c];
  const f = pengaliSeratus(cerita.b);
  const nilaiUbah = x.arah === "persen" ? desimalSeratusan(x.h) : `${x.h}%`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Persen</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Persen artinya per seratus. Hubungkan desimal, pecahan, dan persen.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B2(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "kisi"} onKlik={() => pilihTampilan("kisi")}>
          🔲 Kisi
        </Pilihan>
        <Pilihan aktif={lihat === "ubah"} onKlik={() => pilihTampilan("ubah")}>
          🔁 Ubah
        </Pilihan>
        <Pilihan aktif={lihat === "cerita"} onKlik={() => pilihTampilan("cerita")}>
          📖 Cerita
        </Pilihan>
      </div>

      {lihat === "kisi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Kotak diarsir</span>
            <Pengatur nama="kotak diarsir persen" nilai={x.k} onUbah={(d) => kirim({ t: "K", d })} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-label="Kurangi sepuluh kotak" onClick={() => kirim({ t: "K", d: -10 })} className={TOMBOL_KECIL}>
              − 10
            </button>
            <button type="button" aria-label="Tambah sepuluh kotak" onClick={() => kirim({ t: "K", d: 10 })} className={TOMBOL_KECIL}>
              + 10
            </button>
            {[5, 25, 36, 50, 100].map((k) => (
              <button key={k} type="button" aria-label={`Atur ${k} kotak`} onClick={() => kirim({ t: "K_SET", k })} className={TOMBOL_KECIL}>
                {k}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Kisi100 arsir={x.k} ukuran={140} label={`Kisi seratus kotak, ${x.k} diarsir`} />
            <TulisPecahan p={x.k} q={100} besar />
          </div>
          <p className="text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
            {x.k}/100 = {desimalSeratusan(x.k)} = {x.k}%
          </p>
        </div>
      ) : null}

      {lihat === "ubah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Arah ubah">
            <Pilihan aktif={x.arah === "persen"} onKlik={() => kirim({ t: "ARAH", arah: "persen" })}>
              Desimal ke persen
            </Pilihan>
            <Pilihan aktif={x.arah === "desimal"} onKlik={() => kirim({ t: "ARAH", arah: "desimal" })}>
              Persen ke desimal
            </Pilihan>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih cara">
            <Pilihan aktif={x.cara === "biasa"} onKlik={() => kirim({ t: "CARA", cara: "biasa" })}>
              Cara biasa
            </Pilihan>
            <Pilihan aktif={x.cara === "langsung"} onKlik={() => kirim({ t: "CARA", cara: "langsung" })}>
              Cara langsung
            </Pilihan>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Bilangan {nilaiUbah}</span>
            <Pengatur nama="bilangan seratusan" nilai={x.h} onUbah={(d) => kirim({ t: "H", d })} />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-label="Kurangi sepuluh bilangan" onClick={() => kirim({ t: "H", d: -10 })} className={TOMBOL_KECIL}>
              − 10
            </button>
            <button type="button" aria-label="Tambah sepuluh bilangan" onClick={() => kirim({ t: "H", d: 10 })} className={TOMBOL_KECIL}>
              + 10
            </button>
            {[5, 18, 36, 75, 246].map((h) => (
              <button key={h} type="button" aria-label={`Pilih ${x.arah === "persen" ? desimalSeratusan(h) : `${h}%`}`} onClick={() => kirim({ t: "H_SET", h })} className={TOMBOL_KECIL}>
                {x.arah === "persen" ? desimalSeratusan(h) : `${h}%`}
              </button>
            ))}
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {x.arah === "persen" ? `${desimalSeratusan(x.h)} = ${x.h}%` : `${x.h}% = ${desimalSeratusan(x.h)}`}
          </p>
          <ol className="list-decimal space-y-0.5 pl-5 text-sm font-bold text-[#1C01A5]">
            {langkahCara(x.h, x.cara, x.arah).map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {lihat === "cerita" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih cerita">
            {CERITA_E.map((c, i) => (
              <Pilihan key={c.id} aktif={x.c === i} onKlik={() => kirim({ t: "CERITA", i })} label={`Cerita ${c.a} dari ${c.b}`}>
                {c.a} dari {c.b}
              </Pilihan>
            ))}
          </div>
          <p className="text-sm font-black text-[#1C01A5]">{cerita.nama}.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {x.cUbah ? (
              <Kisi100 arsir={cerita.a * f} ukuran={130} label={`Kisi seratus kotak, ${cerita.a * f} diarsir`} />
            ) : (
              <Batang bagian={cerita.b} arsir={arsirBagian(cerita.a)} lebar={180} tinggi={34} label={`Batang dibagi ${cerita.b} bagian, ${cerita.a} diarsir`} />
            )}
            <TulisPecahan p={x.cUbah ? cerita.a * f : cerita.a} q={x.cUbah ? 100 : cerita.b} besar />
          </div>
          <button type="button" aria-label="Ubah penyebut jadi seratus" onClick={() => kirim({ t: "UBAH_PENYEBUT" })} className={TOMBOL_KECIL}>
            Ubah penyebut jadi 100
          </button>
          {x.cUbah ? (
            <p className="text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
              {cerita.a}/{cerita.b} = {cerita.a * f}/100 = {cerita.a * f}%
            </p>
          ) : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("kisi");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B2(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
