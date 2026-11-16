"use client";

import React, { useEffect, useReducer, useRef, useState } from "react";
import { BendaSeret, TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, zonaTujuan } from "./simulasi-bersama";
import { BENDA } from "./story/kit/dunia-k1";
import {
  BATAS_O2K1A,
  COBA_INI_O2K1A,
  KANVAS_TULIS,
  TEKS_LAB_O2K1A as T,
  awalLabO2K1A,
  goresanTulis,
  keadaanLabO2K1A,
  langkahLabO2K1A,
  namaBil,
  namaBilKapital,
  sudahTertulis,
  ucapBanyakO2K1A,
  ucapTulisO2K1A,
  type KeadaanRingkasO2K1A,
} from "./o2k1a-lab";

/* ------------------------------------------------------------------------ */
/* Simulasi (K1B1 kedua, Sub-Bab A): Kebun dan Nampan Nenek. Satu alat, dua tampilan. */
/*  Keranjang dan Nampan : apel, nampan Bingkai Sepuluh, lambang, nama dan suara.     */
/*  Tulis Lambang        : jari mengikuti jalur lambang bilangan di keranjang.        */
/* Logika: o2k1a-lab.ts. Seret atau ketuk; papan ketik: Enter pada apel dan petak.    */
/* ------------------------------------------------------------------------ */

const APEL = BENDA.apel;
const WARNA_GORES = ["#DC2626", "#7C3AED", "#2563EB"];
/** Banyak apel di tumpukan kebun: persediaan tetap, bukan bagian dari hitungan. */
const TUMPUKAN = [0, 1, 2, 3];

export default function SimulasiLabO2K1A({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanRingkasO2K1A) => void }) {
  const [x, kirim] = useReducer(langkahLabO2K1A, undefined, awalLabO2K1A);
  const [lihat, setLihat] = useState<"keranjang" | "tulis">("keranjang");
  const menekan = useRef(false);

  useEffect(() => {
    onKeadaan?.(keadaanLabO2K1A(x));
  }, [onKeadaan, x]);

  const gores = goresanTulis(x.n);
  const tertulis = sudahTertulis(x);
  const ucap = lihat === "keranjang" ? ucapBanyakO2K1A(x.n) : ucapTulisO2K1A(x);

  const lepas = (id: string, px: number, py: number) => {
    const zona = zonaTujuan(px, py);
    if (id.startsWith("h") && zona === "keranjang") kirim({ t: "TAMBAH" });
    else if (id.startsWith("b") && zona === "kebun") kirim({ t: "KURANG" });
  };

  const titikJari = (e: React.PointerEvent<SVGSVGElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * KANVAS_TULIS.w, KANVAS_TULIS.y0 + ((e.clientY - r.top) / r.height) * KANVAS_TULIS.tinggi];
  };

  const tombolBulat = "h-12 w-12 shrink-0 rounded-full border-4 border-[#1C01A5] text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-30";

  const kendaliBanyak = (
    <div className="flex items-center justify-center gap-3">
      <button type="button" aria-label={T.kurang} disabled={x.n <= 0} onClick={() => kirim({ t: "KURANG" })} className={`${tombolBulat} bg-white`}>
        −
      </button>
      <span className="min-w-[3rem] text-center text-4xl font-black text-[#1C01A5]" aria-live="polite">
        {x.n}
      </span>
      <button type="button" aria-label={T.tambah} disabled={x.n >= BATAS_O2K1A} onClick={() => kirim({ t: "TAMBAH" })} className={`${tombolBulat} bg-[#FFE566]`}>
        +
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{T.judul}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">{T.sub}</p>
          <p className="mt-1 text-sm font-black text-[#7C4A03]">
            <span aria-hidden="true">🦉 </span>Igil: {T.igil}
          </p>
        </div>
        <TombolSuaraGuru label={T.dengar} onClick={() => speakGuru(ucap)} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
        <Pilihan aktif={lihat === "keranjang"} onKlik={() => setLihat("keranjang")}>
          🧺 {T.tabKeranjang}
        </Pilihan>
        <Pilihan aktif={lihat === "tulis"} onKlik={() => setLihat("tulis")}>
          ✍️ {T.tabTulis}
        </Pilihan>
      </div>

      {lihat === "keranjang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div data-zona="kebun" className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-2">
              <p className="text-xs font-black text-[#14532D]">{T.kebun}</p>
              <div className="flex min-h-[3.5rem] flex-wrap items-center gap-1">
                {TUMPUKAN.map((i) => (
                  <BendaSeret key={`h${i}`} id={`h${i}`} aktif={x.n < BATAS_O2K1A} label="Apel di kebun" onKetuk={() => kirim({ t: "TAMBAH" })} onLepas={lepas} kelas="text-4xl leading-none">
                    {APEL}
                  </BendaSeret>
                ))}
              </div>
            </div>
            <div data-zona="keranjang" className="rounded-2xl border-4 border-[#92400E] bg-[#E9C98B] p-2">
              <p className="text-xs font-black text-[#7C2D12]">{T.keranjang}</p>
              <div className="flex min-h-[3.5rem] flex-wrap items-center gap-1">
                {Array.from({ length: x.n }, (_, i) => (
                  <BendaSeret key={`b${i}`} id={`b${i}`} label="Apel di keranjang" onKetuk={() => kirim({ t: "KURANG" })} onLepas={lepas} kelas="text-3xl leading-none">
                    {APEL}
                  </BendaSeret>
                ))}
                {x.n === 0 ? <span className="text-xs font-bold text-[#7C2D12]/60">kosong</span> : null}
              </div>
            </div>
          </div>

          {kendaliBanyak}

          <div className="flex flex-wrap gap-2" role="group" aria-label="Tampilan">
            <Cek aktif={x.nampan} onKlik={() => kirim({ t: "TOGGLE", rep: "nampan" })}>
              {T.cekNampan}
            </Cek>
            <Cek aktif={x.lambang} onKlik={() => kirim({ t: "TOGGLE", rep: "lambang" })}>
              {T.cekLambang}
            </Cek>
            <Cek aktif={x.nama} onKlik={() => kirim({ t: "TOGGLE", rep: "nama" })}>
              {T.cekNama}
            </Cek>
          </div>

          {x.nampan ? (
            <div role="group" aria-label={T.nampan} className="rounded-2xl border-4 border-[#A8672D] bg-[#FBE3BC] p-2">
              <p className="mb-1 text-xs font-black text-[#7C2D12]">{T.nampan}</p>
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: BATAS_O2K1A }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Petak ${namaBil(i + 1)}${i < x.n ? ", terisi" : ", kosong"}`}
                    onClick={() => kirim({ t: "PETAK", i })}
                    className="flex h-12 items-center justify-center rounded-xl border-2 border-[#A8672D] bg-white text-3xl leading-none"
                  >
                    {i < x.n ? APEL : ""}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {x.lambang || x.nama ? (
            <div className="rounded-2xl bg-[#FFF7CC] p-3 text-center" aria-live="polite">
              {x.lambang ? <p className="text-6xl font-black text-[#DC2626]">{x.n}</p> : null}
              {x.nama ? <p className="text-2xl font-black text-[#1C01A5]">{namaBilKapital(x.n)}</p> : null}
            </div>
          ) : (
            <p className="rounded-xl bg-[#F3E8FF] p-2 text-center text-sm font-black text-[#1C01A5]">{T.mati}</p>
          )}

          <button type="button" className={TOMBOL_BIASA} onClick={() => speakGuru(ucapBanyakO2K1A(x.n))}>
            🔊 {T.hitung}
          </button>
        </div>
      ) : (
        <div className={`${KARTU} space-y-3`}>
          <div>
            <p className="text-base font-black text-[#1C01A5]">{T.tulisJudul}</p>
            <p className="text-sm font-bold text-[#1C01A5]/80">{T.tulisSub}</p>
          </div>
          {kendaliBanyak}
          <p className="text-center text-2xl leading-none" aria-hidden="true">
            {Array.from({ length: x.n }, () => APEL).join("")}
          </p>
          <div
            role="button"
            tabIndex={0}
            aria-label={`Papan tulis lambang ${namaBil(x.n)}. Enter menuntun satu goresan.`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                kirim({ t: "GORES" });
              }
            }}
            className="mx-auto w-full max-w-[18rem] rounded-2xl border-4 border-[#1C01A5] bg-white p-1"
            style={{ touchAction: "none" }}
          >
            <svg
              viewBox={`0 ${KANVAS_TULIS.y0} ${KANVAS_TULIS.w} ${KANVAS_TULIS.tinggi}`}
              className="block w-full select-none"
              style={{ touchAction: "none" }}
              onPointerDown={(e) => {
                menekan.current = true;
                e.currentTarget.setPointerCapture?.(e.pointerId);
                const [px, py] = titikJari(e);
                kirim({ t: "TITIK", x: px, y: py });
              }}
              onPointerMove={(e) => {
                if (!menekan.current) return;
                const [px, py] = titikJari(e);
                kirim({ t: "TITIK", x: px, y: py });
              }}
              onPointerUp={() => {
                menekan.current = false;
                kirim({ t: "ANGKAT" });
              }}
              onPointerCancel={() => {
                menekan.current = false;
                kirim({ t: "ANGKAT" });
              }}
            >
              <line x1="0" y1="2" x2={KANVAS_TULIS.w} y2="2" stroke="#BDB4F6" strokeDasharray="3 3" />
              <line x1="0" y1="90" x2={KANVAS_TULIS.w} y2="90" stroke="#BDB4F6" strokeDasharray="3 3" />
              {gores.map((s, i) => {
                const selesai = i < x.g;
                const aktif = i === x.g && !tertulis;
                return (
                  <g key={i}>
                    <path
                      d={s.d}
                      transform={`translate(${s.ox} 0)`}
                      fill="none"
                      stroke={selesai ? WARNA_GORES[i % WARNA_GORES.length] : aktif ? "#9CA3AF" : "#E5E7EB"}
                      strokeWidth={selesai ? 7 : 5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={selesai ? undefined : "2 7"}
                    />
                    {aktif && x.p > 1 ? (
                      <polyline points={s.titik.slice(0, x.p).map((t) => t.join(",")).join(" ")} fill="none" stroke={WARNA_GORES[i % WARNA_GORES.length]} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    ) : null}
                    {aktif && x.p === 0 ? <circle cx={s.titik[0][0]} cy={s.titik[0][1]} r="6" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" /> : null}
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tertulis ? `Lambang ${namaBil(x.n)} sudah tertulis.` : gores[x.g]?.petunjuk}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "GORES" })} disabled={tertulis}>
              👆 {T.tuntun}
            </button>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              ✏️ {T.tulisLagi}
            </button>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="rounded-xl bg-[#F3E8FF] p-2 text-center text-sm font-black text-[#1C01A5]">
        {x.pesan}
      </p>

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("keranjang");
        }}
      >
        🔁 {T.reset}
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${COBA_INI_O2K1A.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${c}`).join(" ")}`)} langkah={COBA_INI_O2K1A} />
    </div>
  );
}
