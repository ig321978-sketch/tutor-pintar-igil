"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, ejaHitung } from "./komponen-lab";
import { KAPASITAS_BUS, awalBus, bolehBerangkat, langkahBus, ruteRonde, tugasHalte, type Bus, type PeristiwaBus } from "./mesin-bus-bab3";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 3): Bus Sekolah, metode mesin keadaan.                     */
/* Di tiap halte: turun dulu, naik kemudian, baru berangkat. Mesin menolak    */
/* langkah yang salah urutan atau melebihi tugas. Logika di mesin-bus-bab3.ts.*/
/* ------------------------------------------------------------------------ */

const TOMBOL_AKSI =
  "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiMesinBus({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [b, setB] = useState<Bus>(() => awalBus(0));
  const r = ruteRonde(b.ronde);
  const stasiun = [...r.halte.map((h, i) => ({ id: `h${i}`, nama: h.nama, ikon: "🚏" })), { id: "akhir", nama: "Terminal", ikon: "🏁" }];

  const kirim = (e: PeristiwaBus) => {
    const baru = langkahBus(b, e);
    setB(baru);
    if (baru.selesai && !b.selesai) onTuntas();
  };

  const suara = `${r.nama}. ${tugasHalte(b)} Di bus ada ${b.isi} penumpang.${b.selesai ? "" : " Penumpang turun dulu, lalu naik, baru bus berangkat."}`;
  const terakhir = b.riwayat.length > 0 ? `Bus berangkat. ${b.riwayat[b.riwayat.length - 1]}` : "";
  const siap = bolehBerangkat(b);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Bus Sekolah</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Di tiap halte: turun dulu, naik kemudian, baru berangkat. Coba langgar urutannya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan halte ini" onClick={() => speakGuru(ejaHitung(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{r.nama} • bus mulai dengan {r.awal} penumpang</p>
        <PetaStasiun stasiun={stasiun} aktif={b.h} nama="Peta halte" />
        <StatusMesin pesan={b.pesan} terakhir={terakhir} awal="Mesin siap. Bus berhenti di halte pertama." />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {b.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🏁 Bus tiba di terminal!</p>
            <p className="text-base font-black text-[#1C01A5]">Penumpang di bus: {b.isi}</p>
            <ol className="space-y-1" aria-label="Catatan perjalanan">
              {b.riwayat.map((x) => (
                <li key={x} className="rounded-xl bg-[#E8F7EE] px-3 py-1 text-sm font-black text-[#14532D]">
                  {x}
                </li>
              ))}
            </ol>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi, rute baru
            </button>
          </div>
        ) : (
          <>
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-base font-black text-[#1C01A5]">{tugasHalte(b)}</p>
            <div className="grid grid-cols-5 gap-1 rounded-2xl border-4 border-[#1C01A5]/40 bg-[#F5F3FF] p-1.5" role="img" aria-label={`Isi bus: ${b.isi} dari ${KAPASITAS_BUS} kursi`}>
              {Array.from({ length: KAPASITAS_BUS }, (_, i) => (
                <span key={i} className="flex h-10 items-center justify-center rounded-lg border-2 border-dashed border-[#1C01A5]/25 bg-white">
                  {i < b.isi ? (
                    <span className="igil-muncul">
                      <BendaSvg jenis="boneka" kelas="h-8 w-8" />
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
              Isi bus: <span className="rounded-lg bg-[#FFE566] px-2 py-0.5 text-xl">{b.isi}</span> dari {KAPASITAS_BUS} kursi • sisa turun {b.turunSisa}, sisa naik {b.naikSisa}
            </p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Penumpang">
              <button type="button" aria-label="Turunkan satu anak" onClick={() => kirim({ t: "TURUN" })} className={TOMBOL_AKSI}>
                ⬇ Turunkan 1 anak
              </button>
              <button type="button" aria-label="Naikkan satu anak" onClick={() => kirim({ t: "NAIK" })} className={TOMBOL_AKSI}>
                ⬆ Naikkan 1 anak
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" aria-disabled={!siap} onClick={() => kirim({ t: "BERANGKAT" })} className={`${TOMBOL_UTAMA} ${siap ? "" : "opacity-60"}`}>
                🚌 Berangkat ke halte berikutnya ➡
              </button>
            </div>
          </>
        )}
      </div>

      <RiwayatMesin riwayat={b.riwayat} ditolak={b.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan naikkan di halte yang masih ada yang turun. Apa kata mesin? Dua, tekan berangkat sebelum semua anak turun. Apa kata mesin? Tiga, selesaikan semua halte. Lihat catatan perjalanan, itu kalimat pengurangan dan penjumlahan."
          )
        }
        langkah={[
          "Tekan Naikkan padahal masih ada yang harus turun. Apa kata mesin?",
          "Tekan Berangkat sebelum semua anak turun. Apa kata mesin?",
          "Selesaikan semua halte. Catatan perjalanan adalah kalimat pengurangan dan penjumlahan.",
        ]}
      />
    </div>
  );
}
