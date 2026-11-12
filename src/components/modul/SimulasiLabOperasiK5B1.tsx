"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { KolomBersusun } from "./model-operasi-k5b1";
import {
  DATA_BERSUSUN,
  DATA_KB,
  DATA_PERKIRAAN,
  awalOperasiK5B1D,
  kbAktif,
  keadaanOperasiK5B1D,
  kolomSekarang,
  langkahOperasiK5B1D,
  masukKolom,
  opsiBulat,
  opsiKB,
  opsiKasar,
  perkAktif,
  selesaiSusun,
  susunAktif,
  titik,
  ucapBersusunK5B1D,
  ucapKaliBagiK5B1D,
  ucapPerkiraanK5B1D,
  type KeadaanOperasiK5B1D,
} from "./lab-operasi-k5b1d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B1 Sub-Bab D): Lab Operasi. Satu alat, tiga tampilan.          */
/*  Perkiraan : bulatkan ke ribuan terdekat, lalu hitung kasar.               */
/*  Bersusun  : isi hasil tiap kolom dari satuan, dengan simpanan dan pinjaman. */
/*  Kali-Bagi : pecah perkalian, bagi rata, lalu cek dengan perkalian.        */
/* Logika: lab-operasi-k5b1d.ts.                                              */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Perkiraan, pilih pembulatan ke bawah untuk tiga puluh delapan ribu enam ratus. Apa kata lab?",
  "Di Bersusun, kerjakan tiga puluh delapan ribu enam ratus ditambah empat belas ribu lima ratus tanpa simpanan. Apa yang terjadi?",
  "Di Bersusun, kurangi kolom puluhan dengan terbalik. Apa kata lab?",
  "Di Kali-Bagi, pilih hasil yang kelebihan satu nol. Mengapa keliru?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_ANGKA = "h-10 w-full rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] text-lg font-black text-[#1C01A5]";
const TOMBOL_JAWAB = "min-h-11 w-full rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1.5 text-base font-black text-[#1C01A5]";

export default function SimulasiLabOperasiK5B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanOperasiK5B1D) => void }) {
  const [x, kirim] = useReducer(langkahOperasiK5B1D, undefined, awalOperasiK5B1D);
  const [lihat, setLihat] = useState<"perkiraan" | "bersusun" | "kalibagi">("perkiraan");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanOperasiK5B1D(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "perkiraan" ? ucapPerkiraanK5B1D(x) : lihat === "bersusun" ? ucapBersusunK5B1D(x) : ucapKaliBagiK5B1D(x);
  const p = perkAktif(x);
  const b = susunAktif(x);
  const cur = kolomSekarang(x);
  const masuk = [0, 1, 2, 3, 4].map((c) => masukKolom(b, c));
  const kb = kbAktif(x);
  const langkahKB = kb.langkah[Math.min(x.kb.ke, kb.langkah.length - 1)];
  const selesaiKB = x.kb.ke >= kb.langkah.length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Operasi</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Perkirakan dulu, hitung teliti, lalu cek.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "perkiraan"} onKlik={() => pilihTampilan("perkiraan")}>
          🎯 Perkiraan
        </Pilihan>
        <Pilihan aktif={lihat === "bersusun"} onKlik={() => pilihTampilan("bersusun")}>
          📐 Bersusun
        </Pilihan>
        <Pilihan aktif={lihat === "kalibagi"} onKlik={() => pilihTampilan("kalibagi")}>
          ✖️ Kali-Bagi
        </Pilihan>
      </div>

      {lihat === "perkiraan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal perkiraan">
            {DATA_PERKIRAAN.map((d, i) => (
              <Pilihan key={`${d.a}${d.op}${d.b}`} aktif={x.perk.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Perkiraan ${titik(d.a)} ${d.op} ${titik(d.b)}`}>
                {titik(d.a)} {d.op} {titik(d.b)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-2xl font-black text-[#1C01A5]">
            {titik(p.a)} {p.op} {titik(p.b)}
          </p>
          {([["a", p.a, x.perk.ra, 0], ["b", p.b, x.perk.rb, 1]] as const).map(([w, n, rr, ke]) => (
            <div key={w} className="space-y-1">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                {titik(n)} dibulatkan ke ribuan terdekat menjadi {rr === null ? "…" : titik(rr)}
              </p>
              {rr === null ? (
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Pilihan pembulatan ${titik(n)}`}>
                  {opsiBulat(n, ke).map((v) => (
                    <button key={v} type="button" aria-label={`Bulatkan ${titik(n)} menjadi ${titik(v)}`} onClick={() => kirim({ t: "P_BULAT", w, v })} className={TOMBOL_KECIL}>
                      {titik(v)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {x.perk.ra !== null && x.perk.rb !== null ? (
            <div className="space-y-1">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                {titik(x.perk.ra)} {p.op} {titik(x.perk.rb)} kira-kira {x.perk.kasar ? titik(p.op === "+" ? x.perk.ra + x.perk.rb : x.perk.ra - x.perk.rb) : "…"}
              </p>
              {!x.perk.kasar ? (
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan hasil kasar">
                  {opsiKasar(p, p.a % 3).map((v) => (
                    <button key={v} type="button" aria-label={`Hasil kasar ${titik(v)}`} onClick={() => kirim({ t: "P_HASIL", v })} className={TOMBOL_KECIL}>
                      {titik(v)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          <p className="text-center text-[11px] font-bold text-[#1C01A5]/80">Ratusan 5 atau lebih, ribuan naik. Kurang dari 5, ribuan tetap.</p>
          <div className="flex justify-center">
            <button type="button" aria-label="Ulangi perkiraan" onClick={() => kirim({ t: "P_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "bersusun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal bersusun">
            {DATA_BERSUSUN.map((d, i) => (
              <Pilihan key={`${d.a}${d.op}${d.b}`} aktif={x.susun.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Bersusun ${titik(d.a)} ${d.op} ${titik(d.b)}`}>
                {titik(d.a)} {d.op} {titik(d.b)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">
            {selesaiSusun(x) ? "Semua kolom sudah terisi." : `Isi hasil kolom ${["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan"][cur]}. Mulai dari satuan.`}
          </p>
          <KolomBersusun a={b.a} b={b.b} op={b.op} isi={x.susun.isi} masuk={masuk} sekarang={cur} />
          <div className="grid grid-cols-5 gap-1" role="group" aria-label="Papan angka">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <button key={d} type="button" aria-label={`Isi digit ${d}`} onClick={() => kirim({ t: "S_ISI", d })} className={TOMBOL_ANGKA}>
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Batalkan kolom terakhir" onClick={() => kirim({ t: "S_BATAL" })} className={TOMBOL_KECIL}>
              ↩️ Batal
            </button>
            <button type="button" aria-label="Ulangi bersusun" onClick={() => kirim({ t: "S_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "kalibagi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal kali atau bagi">
            {DATA_KB.map((d, i) => (
              <Pilihan key={d.id} aktif={x.kb.data === i} onKlik={() => kirim({ t: "K_DATA", i })} label={`Soal ${d.ket}`}>
                {d.ket}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">
            Langkah {Math.min(x.kb.ke + 1, kb.langkah.length)} dari {kb.langkah.length}
          </p>
          {kb.langkah.slice(0, x.kb.ke).map((l, i) => (
            <p key={i} className="rounded-lg bg-[#E8F7EE] px-2 py-1 text-center text-sm font-black text-[#14532D]">
              {l.tanya.replace("…", titik(l.benar))}
            </p>
          ))}
          {!selesaiKB ? (
            <>
              <p className="text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
                {langkahKB.tanya}
              </p>
              <div className="space-y-2" role="group" aria-label="Pilihan jawaban">
                {opsiKB(x.kb.data, x.kb.ke).map((v) => (
                  <button key={v} type="button" aria-label={`Jawab ${titik(v)}`} onClick={() => kirim({ t: "K_JAWAB", v })} className={TOMBOL_JAWAB}>
                    {titik(v)}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-base font-black text-[#14532D]">Soal selesai. Pilih soal lain.</p>
          )}
          <div className="flex justify-center">
            <button type="button" aria-label="Ulangi kali bagi" onClick={() => kirim({ t: "K_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
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
          setLihat("perkiraan");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
