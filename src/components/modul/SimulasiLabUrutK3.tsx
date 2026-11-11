"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { AngkaBerwarna } from "./diagram-k3b1";
import { ejaK3, kataBilangan } from "./lab-tempat-k3b1";
import { HIMPUNAN_URUT, awalUrut, keadaanUrut, langkahUrut, penentuUrut, sudahUrut, ucapUrut, type KeadaanUrut } from "./lab-urut-k3b1";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B1 Sub-Bab C): Lab Urut. Manipulasi langsung: ketuk dua kartu     */
/* untuk menukar letaknya, lalu urutkan naik atau turun. Logika: lab-urut-k3b1.ts. */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Urutkan himpunan pertama dari yang terkecil. Tempat mana yang kamu lihat lebih dulu?",
  "Ganti ke Turun. Apa yang berubah pada urutan kartu?",
  "Coba himpunan ketiga. Angka-angkanya sama, hanya tempatnya berbeda. Bagaimana mengurutkannya?",
];

export default function SimulasiLabUrutK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanUrut) => void }) {
  const [x, kirim] = useReducer(langkahUrut, undefined, awalUrut);
  const urut = sudahUrut(x.kartu, x.arah);

  useEffect(() => {
    onKeadaan?.(keadaanUrut(x));
  }, [onKeadaan, x]);

  const pasangan = x.kartu.slice(0, -1).map((a, i) => ({ a, b: x.kartu[i + 1], tempat: penentuUrut(a, x.kartu[i + 1]) }));
  const ucap = () => `${ucapUrut(x)} ${x.kartu.map((n) => kataBilangan(n)).join(", ")}.`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Urut</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ketuk dua kartu untuk menukar letaknya. Urutkan dari kiri ke kanan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kartunya" onClick={() => speakGuru(ucap())} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Arah urutan">
          <Pilihan aktif={x.arah === "naik"} onKlik={() => kirim({ t: "ARAH", arah: "naik" })}>
            ⬆️ Naik: kecil ke besar
          </Pilihan>
          <Pilihan aktif={x.arah === "turun"} onKlik={() => kirim({ t: "ARAH", arah: "turun" })}>
            ⬇️ Turun: besar ke kecil
          </Pilihan>
        </div>

        <ol className="flex flex-wrap justify-center gap-2" aria-label="Kartu bilangan">
          {x.kartu.map((n, i) => (
            <li key={`${x.himpunan}-${n}`}>
              <button
                type="button"
                aria-label={`Kartu ke-${i + 1}: ${n}${x.pilih === i ? ", dipilih" : ""}`}
                aria-pressed={x.pilih === i}
                onClick={() => kirim({ t: "KETUK", i })}
                className={`flex min-h-16 min-w-[4.5rem] flex-col items-center justify-center rounded-2xl border-4 px-2 py-1 ${
                  x.pilih === i ? "border-[#F0AB00] bg-[#FFF7CC] shadow-[0_3px_0_#F0AB00]" : "border-[#1C01A5] bg-white"
                }`}
              >
                <span className="text-[10px] font-black text-[#1C01A5]/60">{i + 1}</span>
                <AngkaBerwarna n={n} ukuran="text-3xl" />
              </button>
            </li>
          ))}
        </ol>

        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${urut ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
          {urut ? `✅ ${ucapUrut(x)}` : `🔧 ${ucapUrut(x)}`}
        </p>

        <div className="space-y-0.5 text-xs font-bold text-[#1C01A5]/80" aria-label="Tempat yang menentukan tiap pasangan bertetangga">
          {pasangan.map((p, i) => (
            <p key={`${p.a}-${p.b}-${i}`}>
              {p.a} dan {p.b}: {p.tempat === "sama" ? "sama besar" : `${p.tempat} menentukan`}
            </p>
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Himpunan kartu</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih himpunan kartu">
          {HIMPUNAN_URUT.map((_, k) => (
            <Pilihan key={k} aktif={x.himpunan === k} onKlik={() => kirim({ t: "HIMPUNAN", k })}>
              Himpunan {k + 1}
            </Pilihan>
          ))}
        </div>
        <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
          🔁 Reset Semua
        </button>
      </div>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga"][i]}, ${ejaK3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
