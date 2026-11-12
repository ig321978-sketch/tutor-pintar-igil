"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { KEPALA_TEMPAT_K5B1, KartuDigit, TitikDigit, WARNA_TEMPAT_K5B1 } from "./model-tempat-k5b1";
import {
  DATA_BACA,
  DATA_NILAI,
  DATA_TULIS,
  TEMPAT,
  awalTempatK5B1A,
  bacaBil,
  bilBaca,
  bilNilai,
  digitTulis,
  keadaanTempatK5B1A,
  langkahTempatK5B1A,
  nilaiTulis,
  opsiBaca,
  opsiNilai,
  targetTulis,
  titik,
  ucapBacaK5B1A,
  ucapNilaiK5B1A,
  ucapTulisK5B1A,
  type KeadaanTempatK5B1A,
} from "./lab-tempat-k5b1a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B1 Sub-Bab A): Lab Nilai Tempat. Satu alat, tiga tampilan.     */
/*  Tulis : tulis bilangan dari kata di tabel enam tempat.                   */
/*  Baca  : pilih bacaan bilangan per kelompok tiga digit.                   */
/*  Nilai : ketuk digit, pilih tempat, lalu pilih nilainya.                  */
/* Logika: lab-tempat-k5b1a.ts.                                              */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tulis, naikkan satu kolom sampai sembilan, lalu coba naikkan lagi. Apa kata lab?",
  "Di Tulis, tulis empat puluh ribu tiga ratus lima puluh tanpa nol. Apa yang terjadi?",
  "Di Baca, pilih bacaan digit satu per satu. Mengapa keliru?",
  "Di Nilai, ketuk kedua digit delapan pada bilangan pertama. Mengapa nilainya berbeda?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_PANAH = "h-8 w-full rounded-lg border-2 border-[#1C01A5] bg-[#FFE566] text-sm font-black leading-none text-[#1C01A5]";
const TOMBOL_JAWAB = "min-h-11 w-full rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1.5 text-sm font-black text-[#1C01A5]";

export default function SimulasiLabTempatK5B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTempatK5B1A) => void }) {
  const [x, kirim] = useReducer(langkahTempatK5B1A, undefined, awalTempatK5B1A);
  const [lihat, setLihat] = useState<"tulis" | "baca" | "nilai">("tulis");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanTempatK5B1A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tulis" ? ucapTulisK5B1A(x) : lihat === "baca" ? ucapBacaK5B1A(x) : ucapNilaiK5B1A(x);
  const nB = bilBaca(x);
  const nN = bilNilai(x);
  const digitN = digitTulis(nN);
  const pilih = x.nilai.pilih;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Nilai Tempat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Nilai digit bergantung pada tempatnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tulis"} onKlik={() => pilihTampilan("tulis")}>
          ✍️ Tulis
        </Pilihan>
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          🗣️ Baca
        </Pilihan>
        <Pilihan aktif={lihat === "nilai"} onKlik={() => pilihTampilan("nilai")}>
          💎 Nilai
        </Pilihan>
      </div>

      {lihat === "tulis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang ditulis">
            {DATA_TULIS.map((d, i) => (
              <Pilihan key={d.n} aktif={x.tulis.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Soal ${d.ket}`}>
                {d.ket}
              </Pilihan>
            ))}
          </div>
          <div className="rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2 text-center">
            <p className="text-xs font-black text-[#1C01A5]">Tulis dengan angka:</p>
            <p className="text-base font-black text-[#1C01A5]" aria-live="polite">
              {bacaBil(targetTulis(x))}
            </p>
          </div>
          <div className="grid grid-cols-6 gap-1" role="group" aria-label="Tabel nilai tempat">
            {TEMPAT.map((t, k) => (
              <div key={t} className="flex min-w-0 flex-col items-center gap-1 rounded-lg border-2 border-[#1C01A5]/40 p-1" style={{ background: `${WARNA_TEMPAT_K5B1[k]}55` }}>
                <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">
                  {KEPALA_TEMPAT_K5B1[k][0] || " "}
                  <br />
                  {KEPALA_TEMPAT_K5B1[k][1]}
                </span>
                <button type="button" aria-label={`Naikkan digit ${t}`} onClick={() => kirim({ t: "T_NAIK", k })} className={TOMBOL_PANAH}>
                  ▲
                </button>
                <span className="text-2xl font-black text-[#1C01A5]">{x.tulis.digit[k]}</span>
                <TitikDigit n={x.tulis.digit[k]} warna={WARNA_TEMPAT_K5B1[k]} />
                <button type="button" aria-label={`Turunkan digit ${t}`} onClick={() => kirim({ t: "T_TURUN", k })} className={TOMBOL_PANAH}>
                  ▼
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-2xl font-black text-[#1C01A5]">Bilanganmu: {titik(nilaiTulis(x))}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan tabel" onClick={() => kirim({ t: "T_ULANG" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa tulisan" onClick={() => kirim({ t: "T_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang dibaca">
            {DATA_BACA.map((d, i) => (
              <Pilihan key={d.n} aktif={x.baca.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Bilangan ${d.ket}`}>
                {d.ket}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-4xl font-black tracking-wide text-[#1C01A5]">{titik(nB)}</p>
          <p className="text-center text-xs font-black text-[#1C01A5]">Kelompokkan tiga digit dari kanan. Bagian kiri dibaca dengan kata ribu.</p>
          <div className="space-y-2" role="group" aria-label="Pilihan bacaan">
            {opsiBaca(x.baca.data).map((o) => (
              <button key={o} type="button" aria-label={`Jawab ${o}`} onClick={() => kirim({ t: "B_JAWAB", nilai: o })} className={TOMBOL_JAWAB}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "nilai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {DATA_NILAI.map((d, i) => (
              <Pilihan key={d.ket} aktif={x.nilai.data === i} onKlik={() => kirim({ t: "N_DATA", i })} label={`${d.ket}, ${titik(d.n)}`}>
                {titik(d.n)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk satu digit.</p>
          <div className="flex items-end justify-center gap-1" role="group" aria-label="Digit bilangan">
            {digitN.map((v, j) => (
              <React.Fragment key={j}>
                <KartuDigit
                  d={v.d}
                  aktif={pilih === j}
                  warna={WARNA_TEMPAT_K5B1[TEMPAT.indexOf(v.tempat)]}
                  onKlik={() => kirim({ t: "N_DIGIT", j })}
                  label={`Digit ${v.d}, ke-${j + 1} dari kiri`}
                />
                {digitN.length - j === 4 ? <span className="pb-1 text-2xl font-black text-[#1C01A5]">.</span> : null}
              </React.Fragment>
            ))}
          </div>
          {pilih !== null ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Digit {digitN[pilih].d} ada di tempat …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan tempat">
                {TEMPAT.slice(1).map((t) => (
                  <button key={t} type="button" aria-label={`Tempat ${t}`} onClick={() => kirim({ t: "N_TEMPAT", tempat: t })} className={TOMBOL_KECIL}>
                    {t}
                  </button>
                ))}
              </div>
            </>
          ) : null}
          {pilih !== null && x.nilai.tempatOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Digit {digitN[pilih].d} bernilai …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan nilai">
                {opsiNilai(nN, pilih).map((v) => (
                  <button key={v} type="button" aria-label={`Nilai ${titik(v)}`} onClick={() => kirim({ t: "N_NILAI", nilai: v })} className={TOMBOL_KECIL}>
                    {titik(v)}
                  </button>
                ))}
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
          setLihat("tulis");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
