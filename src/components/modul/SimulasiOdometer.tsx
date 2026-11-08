"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { MISI_ODO, ODO_MAKS, awalOdo, langkahOdo, petunjukOdo, uraiOdo, type Odo, type PeristiwaOdo } from "./mesin-odometer-bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 5): Odometer Bilangan, metode mesin keadaan.               */
/* Dua roda (puluhan, satuan). Satuan penuh lalu naik: diikat jadi puluhan.   */
/* Satuan 0 lalu turun: puluhan dibuka. Logika di mesin-odometer-bab5.ts.     */
/* ------------------------------------------------------------------------ */

const TOMBOL_RODA =
  "rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-1.5 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

function Roda({ nilai, nama, warna }: { nilai: number; nama: string; warna: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{nama}</p>
      <span key={nilai} className="igil-muncul flex h-20 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-5xl font-black text-[#1C01A5] shadow-[inset_0_-6px_0_rgba(28,1,165,0.12)]" style={{ backgroundColor: warna }} aria-label={`Roda ${nama}: ${nilai}`}>
        {nilai}
      </span>
    </div>
  );
}

export default function SimulasiOdometer({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [o, setO] = useState<Odo>(() => awalOdo(0));
  const m = MISI_ODO[o.misi];
  const { p, s } = uraiOdo(o.n);

  const kirim = (e: PeristiwaOdo) => {
    const baru = langkahOdo(o, e);
    setO(baru);
    if (baru.selesai && !o.selesai) onTuntas();
  };

  const suara = o.selesai
    ? "Semua misi selesai. Hebat! Kamu sudah memutar puluhan dan satuan dengan tepat."
    : `Misi ${o.misi + 1} dari ${MISI_ODO.length}. Mesin menunjukkan ${o.n}. Itu ${p} puluhan dan ${s} satuan. ${petunjukOdo(o)}`;
  const terakhir = o.info !== "" ? o.info : o.riwayat.length > 0 ? `Mesin pindah ${o.riwayat[o.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Odometer Bilangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Putar roda puluhan dan satuan sampai angka tujuan. Perhatikan apa kata mesin.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan misi ini" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {o.selesai ? "Semua misi selesai" : `Misi ${o.misi + 1} dari ${MISI_ODO.length} • dari ${m.awal} ke ${m.tujuan}`}
        </p>
        <div className="flex items-end justify-center gap-4">
          <Roda nilai={p} nama="Puluhan" warna="#FEE2E2" />
          <Roda nilai={s} nama="Satuan" warna="#DBEAFE" />
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          Keadaan mesin: <span className="rounded-lg bg-[#FFE566] px-2 py-0.5 text-xl">{o.n}</span> ({p} puluhan, {s} satuan)
        </p>
        <div className="flex flex-wrap items-end justify-center gap-1.5 rounded-2xl bg-[#F5F3FF] px-2 py-2" role="img" aria-label={`${p} ikatan sepuluh dan ${s} satuan lepas`}>
          {Array.from({ length: p }, (_, i) => (
            <span key={`p${i}`} className="igil-muncul flex flex-wrap justify-center gap-0.5 rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] p-1" style={{ width: 66 }}>
              {Array.from({ length: 10 }, (_, k) => (
                <span key={k} className="h-2.5 w-2.5 rounded-full bg-[#3B82F6]" />
              ))}
            </span>
          ))}
          {Array.from({ length: s }, (_, i) => (
            <span key={`s${i}`} className="igil-muncul h-4 w-4 rounded-full bg-[#EF4444]" />
          ))}
          {o.n === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">kosong</span> : null}
        </div>
        <StatusMesin pesan={o.pesan} terakhir={terakhir} awal={`Mesin siap. ${petunjukOdo(o)}`} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {o.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua misi selesai!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              {o.langkah} putaran, {o.ditolak} kali mesin menolak.
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Putar roda">
              <button type="button" aria-label="Puluhan naik" onClick={() => kirim({ t: "PULUHAN", d: 1 })} className={TOMBOL_RODA}>
                ▲ Puluhan naik
              </button>
              <button type="button" aria-label="Satuan naik" onClick={() => kirim({ t: "SATUAN", d: 1 })} className={TOMBOL_RODA}>
                ▲ Satuan naik
              </button>
              <button type="button" aria-label="Puluhan turun" onClick={() => kirim({ t: "PULUHAN", d: -1 })} className={TOMBOL_RODA}>
                ▼ Puluhan turun
              </button>
              <button type="button" aria-label="Satuan turun" onClick={() => kirim({ t: "SATUAN", d: -1 })} className={TOMBOL_RODA}>
                ▼ Satuan turun
              </button>
            </div>
            {o.tiba ? (
              <div className="igil-muncul space-y-2 text-center">
                <p className="text-base font-black text-[#14532D]">✅ Mesin tiba di angka {m.tujuan}!</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {o.misi + 1 >= MISI_ODO.length ? "Selesai ✔" : "Misi berikutnya ➡"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <RiwayatMesin riwayat={o.riwayat} ditolak={o.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, putar satuan naik sampai sembilan, lalu naik sekali lagi. Apa yang terjadi pada puluhan? Dua, dari sepuluh, putar satuan turun. Apa kata mesin? Tiga, di angka dua puluh, tekan satuan naik. Apa kata mesin?"
          )
        }
        langkah={[
          "Putar Satuan naik sampai 9, lalu naik sekali lagi. Apa yang terjadi pada puluhan?",
          "Dari angka 10, tekan Satuan turun. Apa kata mesin?",
          `Di angka ${ODO_MAKS}, tekan Satuan naik. Apa kata mesin?`,
        ]}
      />
    </div>
  );
}
