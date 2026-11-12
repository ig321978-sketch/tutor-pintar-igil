"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { KartuAngka } from "./model-jalur-k5b2";
import { KotakKelompok } from "./model-bersama-k5b2";
import {
  DATA_BAGI,
  DATA_DAFTAR,
  DATA_JEMBATAN,
  awalBersamaK5B2D,
  dataBagi,
  faktorDari,
  isiTiapKelompok,
  keadaanBersamaK5B2D,
  langkahBersamaK5B2D,
  opsiFpbDaftar,
  opsiFpbJembatan,
  opsiKpkJ,
  pasanganDaftar,
  pasanganJembatan,
  rataSekarang,
  ucapBagiK5B2D,
  ucapDaftarK5B2D,
  ucapJembatanK5B2D,
  type KeadaanBersamaK5B2D,
} from "./lab-bersama-k5b2d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B2 Sub-Bab D): Lab Faktor Bersama. Satu alat, tiga tampilan.   */
/*  Daftar   : tandai faktor di kedua daftar, pilih yang terbesar.           */
/*  Bagi     : bagi benda rata ke sebanyak mungkin kelompok.                 */
/*  Jembatan : FPB dikali KPK sama dengan hasil kali dua bilangan.           */
/* Logika: lab-bersama-k5b2d.ts.                                              */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Daftar, pilih bilangan yang bukan terbesar sebagai FPB. Apa kata lab?",
  "Di Daftar, coba lima belas dan dua puluh delapan. Apa satu-satunya faktor persekutuan?",
  "Di Bagi, coba banyak vas yang tidak rata. Apa yang tersisa?",
  "Di Jembatan, bandingkan hasil kali kedua bilangan dengan FPB dikali KPK. Apa yang kamu lihat?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabBersamaK5B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBersamaK5B2D) => void }) {
  const [x, kirim] = useReducer(langkahBersamaK5B2D, undefined, awalBersamaK5B2D);
  const [lihat, setLihat] = useState<"daftar" | "bagi" | "jembatan">("daftar");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBersamaK5B2D(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "daftar" ? ucapDaftarK5B2D(x) : lihat === "bagi" ? ucapBagiK5B2D(x) : ucapJembatanK5B2D(x);
  const [fa, fb] = pasanganDaftar(x);
  const bg = dataBagi(x);
  const [ja, jb] = pasanganJembatan(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Faktor Bersama</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Cari faktor yang sama, lalu yang terbesar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "daftar"} onKlik={() => pilihTampilan("daftar")}>
          📋 Daftar
        </Pilihan>
        <Pilihan aktif={lihat === "bagi"} onKlik={() => pilihTampilan("bagi")}>
          🧺 Bagi
        </Pilihan>
        <Pilihan aktif={lihat === "jembatan"} onKlik={() => pilihTampilan("jembatan")}>
          🌉 Jembatan
        </Pilihan>
      </div>

      {lihat === "daftar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bilangan">
            {DATA_DAFTAR.map(([p, q], i) => (
              <Pilihan key={`${p}-${q}`} aktif={x.daftar.data === i} onKlik={() => kirim({ t: "F_DATA", i })} label={`Faktor ${p} dan ${q}`}>
                {p} dan {q}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk faktor yang ada di kedua daftar. Ketuk lagi untuk melepas tanda.</p>
          <div className="space-y-2" role="group" aria-label="Dua daftar faktor">
            {[
              { d: fa, warna: "#FFE566" },
              { d: fb, warna: "#C4B5FD" },
            ].map((baris) => (
              <div key={baris.d} className="flex flex-wrap items-center gap-1">
                <span className="w-full text-xs font-black text-[#1C01A5]">Faktor {baris.d}</span>
                {faktorDari(baris.d).map((v) => (
                  <KartuAngka key={v} n={v} tandai={x.daftar.tanda.includes(v)} onKlik={() => kirim({ t: "F_KLIK", n: v })} label={`Tandai ${v} di faktor ${baris.d}`} warna={baris.warna} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Bersihkan tanda" onClick={() => kirim({ t: "F_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Bersihkan
            </button>
            <button type="button" aria-label="Periksa tanda" onClick={() => kirim({ t: "F_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
          {x.daftar.tandaOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Yang terbesar di antara faktor yang ditandai …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan yang terbesar">
                {opsiFpbDaftar(x.daftar.data).map((v) => (
                  <button key={v} type="button" aria-label={`Terbesar ${v}`} onClick={() => kirim({ t: "F_FPB", nilai: v })} className={TOMBOL_KECIL}>
                    {v}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "bagi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih benda yang dibagi">
            {DATA_BAGI.map((d, i) => (
              <Pilihan key={d.kelompok} aktif={x.bagi.data === i} onKlik={() => kirim({ t: "R_DATA", i })} label={`Bagi ${d.item.join(" dan ")}`}>
                {d.kelompok === "vas" ? "Vas mawar" : "Paket"}
              </Pilihan>
            ))}
          </div>
          <p className="rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2 text-center text-sm font-black text-[#1C01A5]">
            {bg.item.map((v, i) => `${v} ${bg.nama[i]}`).join(", ")}. Bagi rata ke {bg.kelompok} sebanyak mungkin, tanpa sisa.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button type="button" aria-label="Kurangi kelompok" onClick={() => kirim({ t: "R_TURUN" })} className={TOMBOL_KECIL}>
              −
            </button>
            <p className="min-w-24 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
              {x.bagi.k} {bg.kelompok}
            </p>
            <button type="button" aria-label="Tambah kelompok" onClick={() => kirim({ t: "R_NAIK" })} className={TOMBOL_KECIL}>
              +
            </button>
          </div>
          <KotakKelompok k={x.bagi.k} rata={rataSekarang(x)} nama={bg.kelompok} />
          <p className="text-center text-xs font-black text-[#1C01A5]">{rataSekarang(x) ? `Tiap ${bg.kelompok}: ${isiTiapKelompok(x)}` : "Ada benda yang bersisa."}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Coba banyak ini" onClick={() => kirim({ t: "R_COBA" })} className={TOMBOL_KECIL}>
              Coba
            </button>
            <button type="button" aria-label="Pilih yang terbanyak" onClick={() => kirim({ t: "R_PILIH" })} className={TOMBOL_KECIL}>
              Ini yang terbanyak
            </button>
          </div>
          <div className="flex min-h-9 flex-wrap items-center justify-center gap-1.5" aria-label="Banyak yang sudah rata">
            <span className="text-xs font-black text-[#1C01A5]">Sudah rata:</span>
            {x.bagi.rata.length === 0 ? <span className="text-xs font-black text-[#1C01A5]">belum ada</span> : null}
            {x.bagi.rata.map((v) => (
              <KartuAngka key={v} n={v} tandai={false} />
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "jembatan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bilangan">
            {DATA_JEMBATAN.map(([p, q], i) => (
              <Pilihan key={`${p}-${q}`} aktif={x.jembatan.data === i} onKlik={() => kirim({ t: "J_DATA", i })} label={`Jembatan ${p} dan ${q}`}>
                {p} dan {q}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-base font-black text-[#1C01A5]">
            {ja} × {jb} = {ja * jb}
          </p>
          <p className="text-center text-sm font-black text-[#1C01A5]">FPB dari {ja} dan {jb} adalah …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan FPB">
            {opsiFpbJembatan(x.jembatan.data).map((v) => (
              <button key={v} type="button" aria-label={`FPB ${v}`} onClick={() => kirim({ t: "J_FPB", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">KPK dari {ja} dan {jb} adalah …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan KPK">
            {opsiKpkJ(x.jembatan.data).map((v) => (
              <button key={v} type="button" aria-label={`KPK ${v}`} onClick={() => kirim({ t: "J_KPK", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa jembatan" onClick={() => kirim({ t: "J_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa jembatan
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
          setLihat("daftar");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B1(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
