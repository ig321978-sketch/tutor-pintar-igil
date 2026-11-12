"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { GarisRuas, HURUF_PENANDA_K5B1, WARNA_PENANDA_K5B1 } from "./model-banding-k5b1";
import {
  DATA_BANDING,
  DATA_GARIS,
  DATA_URUT,
  RUAS,
  TANDA,
  TEMPAT5,
  awalBandingK5B1B,
  digitLima,
  garisAktif,
  keadaanBandingK5B1B,
  langkahBandingK5B1B,
  pasangAktif,
  penentu,
  penentuKetemu,
  titik,
  ucapBandingK5B1B,
  ucapGarisK5B1B,
  ucapUrutK5B1B,
  urutAktif,
  type KeadaanBandingK5B1B,
} from "./lab-banding-k5b1b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B1 Sub-Bab B): Lab Banding. Satu alat, tiga tampilan.          */
/*  Banding : periksa kolom dari kiri sampai ketemu penentu, lalu pilih tanda. */
/*  Garis   : letakkan bilangan di ruas garis bilangan dengan acuan.          */
/*  Urut    : ketuk bilangan menurut urutan naik atau turun.                  */
/* Logika: lab-banding-k5b1b.ts.                                             */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Banding, ketuk kolom satuan lebih dulu. Apa kata lab?",
  "Di Banding, pilih tanda sebelum menemukan penentu. Mengapa ditolak?",
  "Di Garis, letakkan empat puluh ribu dua ratus di kiri acuan. Apa yang terjadi?",
  "Di Urut, susun skor dakon dari yang terbesar. Apa kata lab?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const NAMA_TANDA: Record<string, string> = { "<": "lebih kecil dari", ">": "lebih besar dari", "=": "sama dengan" };
const SINGKAT = ["PRb", "Rb", "R", "P", "S"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabBandingK5B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBandingK5B1B) => void }) {
  const [x, kirim] = useReducer(langkahBandingK5B1B, undefined, awalBandingK5B1B);
  const [lihat, setLihat] = useState<"banding" | "garis" | "urut">("banding");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBandingK5B1B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "banding" ? ucapBandingK5B1B(x) : lihat === "garis" ? ucapGarisK5B1B(x) : ucapUrutK5B1B(x);
  const ps = pasangAktif(x);
  const p = penentu(ps);
  const ketemu = penentuKetemu(x);
  const baris = [ps.a, ps.b].map(digitLima);
  const g = garisAktif(x);
  const u = urutAktif(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Banding</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bandingkan dari tempat terbesar di kiri.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={lihat === "garis"} onKlik={() => pilihTampilan("garis")}>
          📏 Garis
        </Pilihan>
        <Pilihan aktif={lihat === "urut"} onKlik={() => pilihTampilan("urut")}>
          📶 Urut
        </Pilihan>
      </div>

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bilangan">
            {DATA_BANDING.map((d, i) => (
              <Pilihan key={`${d.a}-${d.b}`} aktif={x.banding.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Pasangan ${titik(d.a)} dan ${titik(d.b)}`}>
                {i + 1}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk kolom dari kiri satu per satu sampai digitnya berbeda.</p>
          <div className="grid grid-cols-5 gap-1" role="group" aria-label="Kolom tempat">
            {TEMPAT5.map((t, k) => {
              const dibuka = k < x.banding.buka;
              const tentu = dibuka && k === p;
              return (
                <button
                  key={t}
                  type="button"
                  aria-label={`Periksa kolom ${t}`}
                  onClick={() => kirim({ t: "B_KOLOM", k })}
                  className={`flex min-w-0 flex-col items-center gap-1 rounded-xl border-4 py-1 ${tentu ? "border-[#F0AB00] bg-[#FFE566]" : dibuka ? "border-[#1C01A5]/40 bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"}`}
                >
                  <span className="text-[10px] font-black text-[#1C01A5]">{SINGKAT[k]}</span>
                  {baris.map((d, i) => (
                    <span key={i} className="text-2xl font-black leading-none text-[#1C01A5]">
                      {d[k]}
                    </span>
                  ))}
                  <span className="text-xs font-black text-[#1C01A5]">{dibuka ? (tentu ? "beda" : "sama") : "?"}</span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-[11px] font-bold text-[#1C01A5]/80">PRb puluh ribuan, Rb ribuan, R ratusan, P puluhan, S satuan.</p>
          <p className="text-center text-lg font-black text-[#1C01A5]">
            {titik(ps.a)} {ketemu ? "…" : "?"} {titik(ps.b)}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Pilihan tanda">
            {TANDA.map((t) => (
              <button key={t} type="button" aria-label={`Tanda ${NAMA_TANDA[t]}`} onClick={() => kirim({ t: "B_TANDA", tanda: t })} className={`${TOMBOL_KECIL} text-xl`}>
                {t}
              </button>
            ))}
            <button type="button" aria-label="Ulangi pemeriksaan kolom" onClick={() => kirim({ t: "B_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "garis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih garis bilangan">
            {DATA_GARIS.map((d, i) => (
              <Pilihan key={d.id} aktif={x.garis.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Garis ${d.ket}`}>
                {d.ket}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk satu bilangan, lalu ketuk ruasnya. Tiap ruas {titik(g.langkah)}.</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Bilangan yang diletakkan">
            {g.angka.map((n, j) => (
              <button
                key={n}
                type="button"
                aria-label={`Pilih bilangan ${titik(n)}`}
                aria-pressed={x.garis.pilih === j}
                onClick={() => kirim({ t: "G_PILIH", j })}
                className={`flex items-center gap-1 rounded-xl border-4 px-2 py-1 text-sm font-black text-[#1C01A5] ${x.garis.pilih === j ? "border-[#F0AB00] ring-4 ring-[#FFE566]" : "border-[#1C01A5]"}`}
                style={{ background: WARNA_PENANDA_K5B1[j] }}
              >
                <span>{HURUF_PENANDA_K5B1[j]}</span>
                <span>{titik(n)}</span>
                <span aria-hidden="true">{x.garis.letak[j] === null ? "" : "✔"}</span>
              </button>
            ))}
          </div>
          <GarisRuas dari={g.dari} langkah={g.langkah} ruas={RUAS} acuan={g.acuan} letak={x.garis.letak} onRuas={(r) => kirim({ t: "G_RUAS", r })} />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan garis" onClick={() => kirim({ t: "G_ULANG" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa garis" onClick={() => kirim({ t: "G_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "urut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan yang diurutkan">
            {DATA_URUT.map((d, i) => (
              <Pilihan key={d.id} aktif={x.urut.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Urutkan ${d.ket}`}>
                {d.ket}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Urut {u.arah}: {u.arah === "naik" ? "ketuk dari yang terkecil" : "ketuk dari yang terbesar"}.
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Bilangan">
            {u.angka.map((n, j) => {
              const ke = x.urut.susun.indexOf(j);
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Ketuk ${titik(n)}`}
                  onClick={() => kirim({ t: "U_KETUK", j })}
                  className={`min-h-11 rounded-xl border-4 px-3 text-base font-black text-[#1C01A5] ${ke >= 0 ? "border-[#1C01A5]/30 bg-[#E8F7EE] opacity-60" : "border-[#1C01A5] bg-[#FFE566]"}`}
                >
                  {titik(n)}
                </button>
              );
            })}
          </div>
          <div className="flex min-h-12 flex-wrap items-center justify-center gap-1 rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2" aria-live="polite">
            {x.urut.susun.length === 0 ? (
              <span className="text-xs font-black text-[#1C01A5]/70">Belum ada yang diketuk.</span>
            ) : (
              x.urut.susun.map((j, i) => (
                <React.Fragment key={j}>
                  {i > 0 ? <span className="text-lg font-black text-[#1C01A5]">{u.arah === "naik" ? "<" : ">"}</span> : null}
                  <span className="rounded-lg bg-white px-2 py-0.5 text-sm font-black text-[#1C01A5]">{titik(u.angka[j])}</span>
                </React.Fragment>
              ))
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Batalkan ketukan terakhir" onClick={() => kirim({ t: "U_BATAL" })} className={TOMBOL_KECIL}>
              ↩️ Batal
            </button>
            <button type="button" aria-label="Ulangi urutan" onClick={() => kirim({ t: "U_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
            <button type="button" aria-label="Periksa urutan" onClick={() => kirim({ t: "U_CEK" })} className={TOMBOL_KECIL}>
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
          setLihat("banding");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
