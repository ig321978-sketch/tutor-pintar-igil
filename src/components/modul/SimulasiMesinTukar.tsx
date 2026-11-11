"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import {
  MISI_TUKAR,
  NAMA_TUKAR,
  STASIUN_TUKAR,
  URUT_TUKAR,
  awalTukar,
  isRingkas,
  langkahTukar,
  petunjukTukar,
  type KeadaanTukar,
  type PeristiwaTukar,
  type Tukar,
} from "./mesin-tukar-k2b1";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (K2B1): Mesin Tukar Puluhan — 10 satuan ↔ 1 puluhan.            */
/* Logika di mesin-tukar-k2b1.ts.                                             */
/* ------------------------------------------------------------------------ */

const TOMBOL_AKSI =
  "rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5 disabled:opacity-40";

function Bentuk({ puluhan, satuan }: { puluhan: number; satuan: number }) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-2 rounded-2xl bg-[#F5F3FF] px-2 py-3" role="img" aria-label={`${puluhan} puluhan dan ${satuan} satuan`}>
      {Array.from({ length: puluhan }, (_, i) => (
        <span key={`p${i}`} className="igil-muncul flex flex-col-reverse gap-0.5 rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] p-1">
          {Array.from({ length: 10 }, (_, k) => (
            <span key={k} className="h-1.5 w-7 rounded-sm bg-[#EF4444]" />
          ))}
        </span>
      ))}
      {Array.from({ length: Math.min(satuan, 40) }, (_, i) => (
        <span key={`s${i}`} className="igil-muncul h-4 w-4 rounded-full bg-[#3B82F6]" />
      ))}
      {puluhan === 0 && satuan === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">kosong</span> : null}
    </div>
  );
}

export default function SimulasiMesinTukar({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<Tukar>(() => awalTukar(0));
  const m = MISI_TUKAR[x.misi];
  const aktif = URUT_TUKAR.indexOf(x.keadaan);

  const kirim = (e: PeristiwaTukar) => {
    const baru = langkahTukar(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai
    ? "Semua misi selesai. Hebat! Kamu sudah menukar sepuluh satuan menjadi puluhan sampai bentuknya ringkas."
    : `Misi ${x.misi + 1} dari ${MISI_TUKAR.length}. Bilangan ${m.target}. Sekarang ${x.puluhan} puluhan dan ${x.satuan} satuan. ${petunjukTukar(x)}`;

  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Tukar Puluhan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ikat sepuluh satuan menjadi satu batang. Sampai satuan kurang dari sepuluh.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan misi ini" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun
          stasiun={STASIUN_TUKAR}
          aktif={aktif}
          nama="Peta mesin tukar"
          onPilih={(i) => kirim({ t: "LOMPAT", ke: URUT_TUKAR[i] as KeadaanTukar })}
        />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {x.selesai ? "Semua misi selesai" : `Misi ${x.misi + 1} dari ${MISI_TUKAR.length} • target ${m.target}`}
        </p>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          {x.puluhan} puluhan + {x.satuan} satuan = <span className="rounded-lg bg-[#FFE566] px-2 py-0.5 text-xl">{m.target}</span>
          {isRingkas(x.satuan) ? " · ringkas" : " · belum ringkas"}
        </p>
        <Bentuk puluhan={x.puluhan} satuan={x.satuan} />
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukTukar(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua misi selesai!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Bentuk ringkas sudah dikuasai.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            {x.keadaan === "mulai" ? (
              <div className="text-center">
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BACA" })}>
                  Mulai tukar ➡
                </button>
              </div>
            ) : null}

            {x.keadaan === "tukar" ? (
              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Aksi tukar">
                <button type="button" className={TOMBOL_AKSI} onClick={() => kirim({ t: "IKAT" })}>
                  🔗 Ikat 10 satuan
                </button>
                <button type="button" className={TOMBOL_AKSI} onClick={() => kirim({ t: "BUKA" })}>
                  📤 Buka 1 puluhan
                </button>
                <button
                  type="button"
                  className={`${TOMBOL_UTAMA} col-span-2`}
                  onClick={() => kirim({ t: "LANJUT" })}
                  disabled={!isRingkas(x.satuan)}
                >
                  {isRingkas(x.satuan) ? "Lanjut ke Ringkas ➡" : "Ikat dulu sampai ringkas"}
                </button>
              </div>
            ) : null}

            {x.keadaan === "ringkas" ? (
              <div className="space-y-2 text-center">
                <p className="text-base font-black text-[#14532D]">
                  ✅ Bentuk ringkas: {x.puluhan} puluhan dan {x.satuan} satuan = {m.target}
                </p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 >= MISI_TUKAR.length ? "Selesai ✔" : "Misi berikutnya ➡"}
                </button>
              </div>
            ) : null}

            <p className="text-center text-xs font-bold text-[#1C01A5]/70">Stasiun sekarang: {NAMA_TUKAR[x.keadaan]}</p>
          </>
        )}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, di nol puluhan dua puluh enam satuan, ikat dua kali. Apa yang muncul? Dua, coba maju ke Ringkas sebelum satuan kurang dari sepuluh. Apa kata mesin? Tiga, buka satu puluhan, lalu ikat lagi. Apakah jumlahnya sama?"
          )
        }
        langkah={[
          "Di 0 puluhan dan 26 satuan, ikat dua kali. Apa yang muncul?",
          "Coba maju ke Ringkas sebelum satuan < 10. Apa kata mesin?",
          "Buka satu puluhan, lalu ikat lagi. Apakah jumlahnya sama?",
        ]}
      />
    </div>
  );
}
