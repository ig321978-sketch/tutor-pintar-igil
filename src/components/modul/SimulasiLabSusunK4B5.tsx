"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B5 } from "./eja-k4b5";
import { BangunUrai, PapanPerempat } from "./model-susun-k4b5";
import {
  ARAH_SEGITIGA,
  SILUET,
  SUSUN_BARIS,
  SUSUN_KOLOM,
  TANGRAM,
  TANGRAM_SISI,
  URAI,
  awalSusunK4B5B,
  bagianUrai,
  bentukKeping,
  keadaanSusunK4B5B,
  langkahSusunK4B5B,
  perempatKeping,
  perempatPasang,
  perempatSiluet,
  titikUrai,
  ucapSusunK4B5B,
  ucapTangramK4B5B,
  ucapUraiK4B5B,
  type KeadaanSusunK4B5B,
} from "./lab-susun-k4b5b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B5 Sub-Bab B): Lab Susun. Satu alat, tiga tampilan.            */
/*  Susun   : taruh keping segitiga dan persegi, lab menamai bangun gabungan. */
/*  Urai    : potong bangun dari titik ke titik, lab menamai tiap bagian.     */
/*  Tangram : tutup siluet dengan tujuh keping tangram.                       */
/* Logika: lab-susun-k4b5b.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Susun, buat rumah dari 2 persegi dan 2 segitiga. Berapa sisinya?",
  "Di Urai, urai persegi dengan dua cara berbeda.",
  "Di Urai, potong trapesium menjadi segitiga sama sisi.",
  "Di Tangram, tutup segitiga besar dengan cara lain.",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const PETAK = 52;
const PETAK_TANGRAM = 54;

export default function SimulasiLabSusunK4B5({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusunK4B5B) => void }) {
  const [x, kirim] = useReducer(langkahSusunK4B5B, undefined, awalSusunK4B5B);
  const [lihat, setLihat] = useState<"susun" | "urai" | "tangram">("susun");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSusunK4B5B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "susun" ? ucapSusunK4B5B(x) : lihat === "urai" ? ucapUraiK4B5B(x) : ucapTangramK4B5B(x);
  const b = URAI[x.bentuk];
  const bagian = bagianUrai(b, x.potong);
  const terpasang = new Set(x.tangram.map((p) => p.k));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susun</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Susun bagian menjadi satu bangun, atau urai satu bangun menjadi bagian.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "susun"} onKlik={() => pilihTampilan("susun")}>
          🧱 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "urai"} onKlik={() => pilihTampilan("urai")}>
          ✂️ Urai
        </Pilihan>
        <Pilihan aktif={lihat === "tangram"} onKlik={() => pilihTampilan("tangram")}>
          🪁 Tangram
        </Pilihan>
      </div>

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih keping">
            {ARAH_SEGITIGA.map((nama, i) => (
              <Pilihan key={nama} aktif={x.jenis === "segitiga" && x.arah === i} onKlik={() => kirim({ t: "S_ARAH", arah: i })} label={`Keping segitiga, siku di ${nama}`}>
                <PapanPerempat baris={1} kolom={1} ukuran={22} isi={perempatKeping({ jenis: "segitiga", arah: i, r: 0, c: 0 }).map((q) => ({ q, k: 0 }))} label={`Segitiga siku di ${nama}`} />
              </Pilihan>
            ))}
            <Pilihan aktif={x.jenis === "persegi"} onKlik={() => kirim({ t: "S_JENIS", jenis: "persegi" })} label="Keping persegi">
              <PapanPerempat baris={1} kolom={1} ukuran={22} isi={perempatKeping({ jenis: "persegi", arah: 0, r: 0, c: 0 }).map((q) => ({ q, k: 1 }))} label="Persegi" />
            </Pilihan>
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Pilih keping, lalu ketuk petak untuk menaruhnya. Segitiga adalah setengah petak; persegi satu petak penuh.</p>
          <PapanPerempat
            baris={SUSUN_BARIS}
            kolom={SUSUN_KOLOM}
            ukuran={PETAK}
            isi={x.keping.flatMap((k, i) => perempatKeping(k).map((q) => ({ q, k: i })))}
            label={`Papan ${SUSUN_BARIS} baris, ${SUSUN_KOLOM} petak tiap baris`}
            onKetuk={(r, c) => kirim({ t: "S_TARUH", r, c })}
          />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {x.keping.filter((k) => k.jenis === "segitiga").length} segitiga · {x.keping.filter((k) => k.jenis === "persegi").length} persegi
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Angkat keping terakhir" onClick={() => kirim({ t: "S_ANGKAT" })} className={TOMBOL_KECIL}>
              ↩️ Angkat
            </button>
            <button type="button" aria-label="Kosongkan papan" onClick={() => kirim({ t: "S_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa bangun susunan" onClick={() => kirim({ t: "S_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "urai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun utuh">
            {URAI.map((u, i) => (
              <Pilihan key={u.id} aktif={x.bentuk === i} onKlik={() => kirim({ t: "U_BENTUK", i })} label={`Bangun ${u.nama}`}>
                {u.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk dua titik untuk memotong lurus dari titik ke titik. Titik yang dipilih berwarna jingga.</p>
          <BangunUrai kisi={b.metrik} bagian={bagian} titik={titikUrai(b)} pilih={x.titikPilih} onTitik={(i) => kirim({ t: "U_TITIK", i })} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {x.potong.length} potongan · {bagian.length} bagian
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Batalkan potongan terakhir" onClick={() => kirim({ t: "U_BATAL" })} className={TOMBOL_KECIL}>
              ↩️ Batal
            </button>
            <button type="button" aria-label="Utuhkan lagi bangunnya" onClick={() => kirim({ t: "U_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Utuhkan
            </button>
            <button type="button" aria-label="Periksa hasil uraian" onClick={() => kirim({ t: "U_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "tangram" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih siluet">
            {SILUET.map((s, i) => (
              <Pilihan key={s.id} aktif={x.siluet === i} onKlik={() => kirim({ t: "G_SILUET", i })} label={`Siluet ${s.nama}`}>
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih keping tangram">
            {TANGRAM.map((t, k) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Keping ${k + 1}, ${t.nama}${terpasang.has(k) ? ", sudah dipasang" : ""}`}
                aria-pressed={x.tPilih === k}
                onClick={() => kirim({ t: "G_PILIH", k })}
                className={`rounded-xl border-4 p-1 ${x.tPilih === k ? "border-[#F0AB00] bg-[#FFF3C4]" : "border-[#1C01A5]/30 bg-white"} ${terpasang.has(k) ? "opacity-40" : ""}`}
              >
                <PapanPerempat baris={TANGRAM_SISI} kolom={TANGRAM_SISI} ukuran={11} isi={bentukKeping(k, 0, false).map((q) => ({ q, k }))} label={t.nama} />
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-black text-[#1C01A5]">Keping dipilih:</span>
            <PapanPerempat baris={TANGRAM_SISI} kolom={TANGRAM_SISI} ukuran={14} isi={bentukKeping(x.tPilih, x.tPutar, x.tBalik).map((q) => ({ q, k: x.tPilih }))} label={`Keping ${TANGRAM[x.tPilih].nama} setelah diputar`} />
            <button type="button" aria-label="Putar keping seperempat putaran" onClick={() => kirim({ t: "G_PUTAR" })} className={TOMBOL_KECIL}>
              🔄 Putar
            </button>
            <button type="button" aria-label="Balik keping" onClick={() => kirim({ t: "G_BALIK" })} className={TOMBOL_KECIL}>
              ↔️ Balik
            </button>
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk petak untuk menaruh keping. Petak yang diketuk menjadi pojok kiri atas keping.</p>
          <PapanPerempat
            baris={TANGRAM_SISI}
            kolom={TANGRAM_SISI}
            ukuran={PETAK_TANGRAM}
            isi={x.tangram.flatMap((p) => perempatPasang(p).map((q) => ({ q, k: p.k })))}
            bayang={perempatSiluet(x.siluet)}
            label={`Siluet ${SILUET[x.siluet].nama}`}
            onKetuk={(r, c) => kirim({ t: "G_TARUH", r, c })}
          />
          <p className="text-center text-sm font-black text-[#1C01A5]">{x.tangram.length} keping terpasang</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Angkat keping tangram terakhir" onClick={() => kirim({ t: "G_ANGKAT" })} className={TOMBOL_KECIL}>
              ↩️ Angkat
            </button>
            <button type="button" aria-label="Periksa siluet tangram" onClick={() => kirim({ t: "G_CEK" })} className={TOMBOL_KECIL}>
              Periksa
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
          setLihat("susun");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
