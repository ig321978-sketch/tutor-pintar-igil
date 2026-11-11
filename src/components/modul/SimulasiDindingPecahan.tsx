"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import {
  BAGIAN,
  LAMBANG,
  NAMA_BARIS,
  URUT_BARIS,
  awalDinding,
  hitungWarna,
  kalimatDinding,
  ketukBagian,
  panjangWarna,
  pasanganSama,
  ucapanDinding,
  type BarisDinding,
  type Dinding,
} from "./dinding-k2b5";
import type { KeadaanDinding } from "./misi-k2bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B5 Sub-Bab C): Dinding Pecahan — model PhET.                    */
/* Tiga batang sama panjang: satu utuh, dua setengah, empat seperempat.         */
/* Mewarnai bagian mengubah panjang berwarna, garis banding, dan kalimat.       */
/* Logika: dinding-k2b5.ts.                                                     */
/* ------------------------------------------------------------------------ */

const WARNA_BARIS: Record<BarisDinding, string> = { u: "#1C01A5", s: "#7C3AED", q: "#0F766E" };

export default function SimulasiDindingPecahan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDinding) => void }) {
  const [d, setD] = useState<Dinding>(() => awalDinding());
  const [garis, setGaris] = useState(true);
  const [tabel, setTabel] = useState(false);

  const h = hitungWarna(d);
  const p = panjangWarna(d);
  const sama = useMemo(() => pasanganSama(d), [d]);
  const kodePasangan = useMemo(() => sama.map(([a, b]) => `${a}-${b}`), [sama]);

  useEffect(() => {
    onKeadaan?.({ alat: "dinding", u: h.u, s: h.s, q: h.q, pasangan: kodePasangan });
  }, [onKeadaan, h.u, h.s, h.q, kodePasangan]);

  const teks = kalimatDinding(d);
  const maksPanjang = Math.max(p.u, p.s, p.q);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Dinding Pecahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ketuk bagian di tiga batang untuk mewarnainya. Lihat batang mana yang berwarna sama panjang.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(ucapanDinding(d)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="relative space-y-2">
          {URUT_BARIS.map((b) => (
            <div key={b} className="flex items-center gap-2">
              <span className="w-7 shrink-0 text-center text-lg font-black text-[#1C01A5]" aria-hidden="true">
                {LAMBANG[b]}
              </span>
              <div className="relative flex h-12 flex-1 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="group" aria-label={`Batang ${NAMA_BARIS[b]}, ${h[b]} dari ${BAGIAN[b]} bagian berwarna`}>
                {d[b].map((nyala, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setD((x) => ketukBagian(x, b, i))}
                    aria-label={`Bagian ${i + 1} dari ${BAGIAN[b]} pada batang ${NAMA_BARIS[b]}${nyala ? ", berwarna" : ""}`}
                    aria-pressed={nyala}
                    className={`flex flex-1 items-center justify-center text-sm font-black ${i > 0 ? "border-l-4 border-[#1C01A5]" : ""} ${nyala ? "bg-[#F0AB00] text-[#1C01A5]" : "bg-white text-[#1C01A5]/50"}`}
                  >
                    {LAMBANG[b]}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {garis && maksPanjang > 0 ? (
            <div className="pointer-events-none absolute bottom-0 top-0 border-r-4 border-dashed border-[#DC2626]" style={{ left: `calc(2.25rem + (100% - 2.25rem) * ${maksPanjang / 4})`, transform: "translateX(-2px)" }} aria-hidden="true" />
          ) : null}
        </div>
        <KalimatBesar teks={teks} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={garis} onKlik={() => setGaris(!garis)}>
            Garis banding
          </Cek>
          <Cek aktif={tabel} onKlik={() => setTabel(!tabel)}>
            Tabel panjang
          </Cek>
        </div>
        {tabel ? (
          <table className="w-full border-collapse overflow-hidden rounded-2xl text-center text-sm font-black text-[#1C01A5]" aria-label="Panjang berwarna tiap batang">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="p-1.5">Batang</th>
                <th className="p-1.5">Bagian berwarna</th>
                <th className="p-1.5">Seperempat yang tertutup</th>
              </tr>
            </thead>
            <tbody>
              {URUT_BARIS.map((b) => (
                <tr key={b} className="border-t-2 border-[#1C01A5]/20 bg-white">
                  <td className="p-1.5" style={{ color: WARNA_BARIS[b] }}>
                    {NAMA_BARIS[b]}
                  </td>
                  <td className="p-1.5">
                    {h[b]} dari {BAGIAN[b]}
                  </td>
                  <td className="p-1.5">{p[b]} dari 4</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className={TOMBOL_BIASA}
          onClick={() => {
            setD(awalDinding());
            setGaris(true);
            setTabel(false);
          }}
        >
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, warnai dua seperempat dan satu setengah. Apa yang sama? Dua, warnai empat seperempat. Sama dengan batang yang mana? Tiga, warnai satu seperempat. Adakah batang lain yang sama panjang? Empat, warnai dua setengah. Apa namanya?"
          )
        }
        langkah={[
          "Warnai dua seperempat dan satu setengah. Apa yang sama?",
          "Warnai empat seperempat. Sama dengan batang yang mana?",
          "Warnai satu seperempat saja. Adakah batang lain yang sama panjang?",
          "Warnai dua setengah. Apa namanya?",
        ]}
      />
    </div>
  );
}
