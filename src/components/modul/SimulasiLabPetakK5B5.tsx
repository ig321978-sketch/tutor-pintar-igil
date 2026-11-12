"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B5 } from "./eja-k5b5";
import { KisiBaris, KisiPotong, KisiTutup } from "./model-petak-k5b5";
import {
  DATA_BARIS,
  DATA_POTONG,
  DATA_TUTUP,
  awalPetakK5B5A,
  dataBaris,
  dataPotong,
  dataTutup,
  idPetak,
  keadaanPetakK5B5A,
  langkahPetakK5B5A,
  luasPotong,
  menonjol,
  opsiBaris,
  opsiTutup,
  tertutup,
  ucapBarisK5B5A,
  ucapPotongK5B5A,
  ucapTutupK5B5A,
  type KeadaanPetakK5B5A,
} from "./lab-petak-k5b5a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B5 Sub-Bab A): Lab Petak. Satu alat, tiga tampilan.            */
/*  Tutup  : tutup daerah dengan petak satuan sampai rapat, lalu pilih luas.  */
/*  Baris  : susun baris dan kolom petak, lalu pilih banyak petaknya.         */
/*  Potong : pindahkan petak yang menonjol ke lubang, luas tetap.             */
/* Logika: lab-petak-k5b5a.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tutup, ketuk semua petak sampai rapat. Apa yang terjadi bila masih ada celah?",
  "Di Baris, atur baris dan kolom. Mengapa baris ditambah kolom bukan banyak petaknya?",
  "Di Potong, pindahkan petak yang menonjol ke lubang. Apakah luasnya berubah?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_PUTAR = "h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30";

export default function SimulasiLabPetakK5B5({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPetakK5B5A) => void }) {
  const [x, kirim] = useReducer(langkahPetakK5B5A, undefined, awalPetakK5B5A);
  const [lihat, setLihat] = useState<"tutup" | "baris" | "potong">("tutup");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanPetakK5B5A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tutup" ? ucapTutupK5B5A(x) : lihat === "baris" ? ucapBarisK5B5A(x) : ucapPotongK5B5A(x);
  const t = dataTutup(x);
  const s = dataBaris(x);
  const p = dataPotong(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Petak</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Luas adalah banyak petak satuan yang menutup daerah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tutup"} onKlik={() => pilihTampilan("tutup")}>
          🟨 Tutup
        </Pilihan>
        <Pilihan aktif={lihat === "baris"} onKlik={() => pilihTampilan("baris")}>
          🔢 Baris
        </Pilihan>
        <Pilihan aktif={lihat === "potong"} onKlik={() => pilihTampilan("potong")}>
          ✂️ Potong
        </Pilihan>
      </div>

      {lihat === "tutup" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih daerah">
            {DATA_TUTUP.map((d, i) => (
              <Pilihan key={`${d.w}-${d.h}`} aktif={x.tutup.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Daerah ${d.w} petak ke samping dan ${d.h} petak ke bawah`}>
                {x.pernah.includes(`tutup:${i}`) ? "✅ " : ""}
                {d.w} dan {d.h} petak
              </Pilihan>
            ))}
          </div>
          <KisiTutup w={t.w} h={t.h} petak={x.tutup.petak} onKetuk={(ru, k) => kirim({ t: "T_PETAK", ru, k })} />
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Petak tertutup: {tertutup(x)} dari {t.w * t.h}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa tutupan" onClick={() => kirim({ t: "T_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Luas daerah, banyak petak satuan …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan luas daerah">
            {opsiTutup(x.tutup.data).map((n) => (
              <button key={n} type="button" aria-label={`Luas ${n} ${t.sat}`} onClick={() => kirim({ t: "T_LUAS", nilai: n })} className={TOMBOL_KECIL}>
                {n} {t.sat}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "baris" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tugas susunan">
            {DATA_BARIS.map((d, i) => (
              <Pilihan key={`${d.r}-${d.k}`} aktif={x.baris.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Tugas ${d.r} baris dan ${d.k} kolom`}>
                {x.pernah.includes(`baris:${i}`) ? "✅ " : ""}
                {d.r} baris, {d.k} kolom
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Susun {s.r} baris dan {s.k} kolom petak.
          </p>
          <KisiBaris r={x.baris.r} k={x.baris.k} />
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Atur baris dan kolom">
            <div className="flex items-center justify-between gap-1 rounded-2xl border-2 border-[#1C01A5] bg-[#F5F3FF] px-2 py-1.5">
              <span className="text-xs font-black text-[#1C01A5]">Baris</span>
              <button type="button" aria-label="Kurangi baris" disabled={x.baris.r <= 1} onClick={() => kirim({ t: "B_BARIS", d: -1 })} className={`${TOMBOL_PUTAR} bg-white`}>
                –
              </button>
              <span className="w-5 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
                {x.baris.r}
              </span>
              <button type="button" aria-label="Tambah baris" onClick={() => kirim({ t: "B_BARIS", d: 1 })} className={`${TOMBOL_PUTAR} bg-[#FFE566]`}>
                +
              </button>
            </div>
            <div className="flex items-center justify-between gap-1 rounded-2xl border-2 border-[#1C01A5] bg-[#F5F3FF] px-2 py-1.5">
              <span className="text-xs font-black text-[#1C01A5]">Kolom</span>
              <button type="button" aria-label="Kurangi kolom" disabled={x.baris.k <= 1} onClick={() => kirim({ t: "B_KOLOM", d: -1 })} className={`${TOMBOL_PUTAR} bg-white`}>
                –
              </button>
              <span className="w-5 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
                {x.baris.k}
              </span>
              <button type="button" aria-label="Tambah kolom" onClick={() => kirim({ t: "B_KOLOM", d: 1 })} className={`${TOMBOL_PUTAR} bg-[#FFE566]`}>
                +
              </button>
            </div>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Banyak petak seluruhnya …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan banyak petak">
            {opsiBaris(x.baris.data).map((n) => (
              <button key={n} type="button" aria-label={`Banyak petak ${n}`} onClick={() => kirim({ t: "B_LUAS", nilai: n })} className={TOMBOL_KECIL}>
                {n} petak
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "potong" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun">
            {DATA_POTONG.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.potong.data === i} onKlik={() => kirim({ t: "PO_DATA", i })} label={`Bangun ${d.nama}`}>
                {x.pernah.includes(`potong:${i}`) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <KisiPotong
            d={p}
            petak={x.potong.petak}
            pilih={x.potong.pilih}
            onKlik={(ru, k) => kirim(x.potong.petak.includes(idPetak(ru, k)) ? { t: "PO_AMBIL", ru, k } : { t: "PO_TARUH", ru, k })}
          />
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            Luas sekarang: {x.potong.petak.length} petak (awal {luasPotong(p)}). Menonjol: {menonjol(p, x.potong.petak)}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Mulai lagi bangun" onClick={() => kirim({ t: "PO_DATA", i: x.potong.data })} className={TOMBOL_BIASA}>
              Mulai lagi
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
          setLihat("tutup");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
