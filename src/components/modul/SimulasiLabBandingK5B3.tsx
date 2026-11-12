"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B3 } from "./eja-k5b3";
import { BatangCampuran, BatangPecahan, GarisPecahan } from "./model-banding-k5b3";
import {
  DATA_BANDING,
  DATA_CAMPURAN,
  DATA_GARIS,
  TANDA,
  awalBandingK5B3A,
  dataBanding,
  dataCampuran,
  dataGaris,
  keadaanBandingK5B3A,
  langkahBandingK5B3A,
  maksGaris,
  opsiBagian,
  opsiPenyebut,
  opsiTotal,
  teksCampuran,
  teksPec,
  titikGaris,
  ubahKe,
  ucapBandingK5B3A,
  ucapCampuranK5B3A,
  ucapGarisK5B3A,
  type KeadaanBandingK5B3A,
} from "./lab-banding-k5b3a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B3 Sub-Bab A): Lab Banding Pecahan. Satu alat, tiga tampilan.   */
/*  Garis    : letakkan pecahan di garis bilangan, kanan lebih besar.         */
/*  Banding  : samakan penyebut, lalu pilih tanda.                            */
/*  Campuran : ubah pecahan campuran menjadi pecahan biasa.                   */
/* Logika: lab-banding-k5b3a.ts.                                              */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Garis, letakkan ketiga lompatan Yohana. Mana yang paling jauh dari nol?",
  "Di Banding, bandingkan satu per dua dan satu per lima. Bagian mana yang lebih besar?",
  "Di Banding, bandingkan satu per tiga dan dua per enam. Apa yang kamu lihat pada batangnya?",
  "Di Campuran, ubah tiga dan satu per dua. Berapa banyak bagian seluruhnya?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_TITIK = "h-9 min-w-0 rounded-md border-2 border-[#1C01A5] bg-white px-0 text-[10px] font-black leading-none text-[#1C01A5]";
const NAMA_TANDA: Record<string, string> = { "<": "lebih kecil", "=": "sama dengan", ">": "lebih besar" };

export default function SimulasiLabBandingK5B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBandingK5B3A) => void }) {
  const [x, kirim] = useReducer(langkahBandingK5B3A, undefined, awalBandingK5B3A);
  const [lihat, setLihat] = useState<"garis" | "banding" | "campuran">("garis");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBandingK5B3A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "garis" ? ucapGarisK5B3A(x) : lihat === "banding" ? ucapBandingK5B3A(x) : ucapCampuranK5B3A(x);
  const g = dataGaris(x);
  const { a, b } = dataBanding(x);
  const c = dataCampuran(x);
  const d = x.banding.d;
  const tempat = DATA_GARIS.filter((_, i) => x.garis.ok[i]);
  const titik = Array.from({ length: titikGaris(g) }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Banding Pecahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pecahan dibandingkan lewat bagian yang sama besar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "garis"} onKlik={() => pilihTampilan("garis")}>
          📏 Garis
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={lihat === "campuran"} onKlik={() => pilihTampilan("campuran")}>
          🔁 Campuran
        </Pilihan>
      </div>

      {lihat === "garis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pecahan yang diletakkan">
            {DATA_GARIS.map((t, i) => (
              <Pilihan key={teksPec(t)} aktif={x.garis.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Letakkan ${teksPec(t)}`}>
                {x.garis.ok[i] ? "✅ " : ""}
                {teksPec(t)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Letakkan {teksPec(g)} di garis. Tiap bulat dibagi {g.q} bagian.
          </p>
          <GarisPecahan q={g.q} maks={maksGaris(g)} pos={x.garis.pos} tempat={tempat} />
          <div className="grid w-full gap-0.5" style={{ gridTemplateColumns: `repeat(${Math.min(titik.length, 6)}, minmax(0, 1fr))` }} role="group" aria-label="Titik pada garis">
            {titik.map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Titik ${n}/${g.q}`}
                aria-pressed={x.garis.pos === n}
                onClick={() => kirim({ t: "G_POS", n })}
                className={`${TOMBOL_TITIK} ${x.garis.pos === n ? "!bg-[#FFE566]" : ""}`}
              >
                {n}/{g.q}
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            {x.garis.pos < 0 ? "Belum ada titik yang dipilih." : `Titik sekarang: ${teksCampuran({ p: x.garis.pos, q: g.q })}`}
          </p>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa letak titik" onClick={() => kirim({ t: "G_LETAK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan pecahan">
            {DATA_BANDING.map((p, i) => (
              <Pilihan key={`${teksPec(p.a)}-${teksPec(p.b)}`} aktif={x.banding.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Banding ${teksPec(p.a)} dan ${teksPec(p.b)}`}>
                {teksPec(p.a)} dan {teksPec(p.b)}
              </Pilihan>
            ))}
          </div>
          <BatangPecahan p={d > 0 ? ubahKe(a, d) : a.p} q={d > 0 ? d : a.q} nama={d > 0 ? `${teksPec(a)} = ${ubahKe(a, d)}/${d}` : teksPec(a)} />
          <BatangPecahan p={d > 0 ? ubahKe(b, d) : b.p} q={d > 0 ? d : b.q} nama={d > 0 ? `${teksPec(b)} = ${ubahKe(b, d)}/${d}` : teksPec(b)} />
          {a.q !== b.q ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Penyebut yang sama untuk keduanya …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan penyebut">
                {opsiPenyebut(x.banding.data).map((n) => (
                  <button key={n} type="button" aria-label={`Penyebut ${n}`} onClick={() => kirim({ t: "B_SAMA", nilai: n })} className={TOMBOL_KECIL}>
                    {n}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-xs font-black text-[#1C01A5]">Penyebutnya sudah sama, langsung pilih tandanya.</p>
          )}
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {teksPec(a)} … {teksPec(b)}
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan tanda">
            {TANDA.map((t) => (
              <button key={t} type="button" aria-label={`Tanda ${NAMA_TANDA[t]}`} onClick={() => kirim({ t: "B_TANDA", tanda: t })} className={TOMBOL_KECIL}>
                {t}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "campuran" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pecahan campuran">
            {DATA_CAMPURAN.map((k, i) => (
              <Pilihan key={`${k.b}-${k.p}-${k.q}`} aktif={x.campuran.data === i} onKlik={() => kirim({ t: "C_DATA", i })} label={`Campuran ${k.b} ${k.p}/${k.q}`}>
                {k.b} {k.p}/{k.q}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {c.b} {c.p}/{c.q} = … per {c.q}
          </p>
          <BatangCampuran b={c.b} p={c.p} q={c.q} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Banyak bagian pada {c.b} bulat …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan bagian bulat">
            {opsiBagian(x.campuran.data).map((v) => (
              <button key={v} type="button" aria-label={`Bagian bulat ${v}`} onClick={() => kirim({ t: "C_BAGIAN", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          {x.campuran.bagianOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Banyak bagian seluruhnya …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan bagian seluruhnya">
                {opsiTotal(x.campuran.data).map((v) => (
                  <button key={v} type="button" aria-label={`Bagian seluruhnya ${v}`} onClick={() => kirim({ t: "C_TOTAL", nilai: v })} className={TOMBOL_KECIL}>
                    {v}/{c.q}
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
          setLihat("garis");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B3(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
