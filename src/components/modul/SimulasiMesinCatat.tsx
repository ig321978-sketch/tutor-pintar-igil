"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { TOMBOL_JAWAB, TurusBaris } from "./diagram-lab-k2b8";
import {
  STASIUN_MESIN_CATAT,
  awalMesinCatat,
  dataBerikutCatat,
  ikonCatat,
  indeksStasiunCatat,
  kapital,
  kasusCatat,
  langkahMesinCatat,
  namaCatat,
  opsiJumlahCatat,
  opsiPalingCatat,
  petunjukMesinCatat,
  totalCatat,
  SET,
  type MesinCatat,
  type PeristiwaMesinCatat,
} from "./lab-data-k2b8";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B8 Sub-Bab A): Mesin Catat Turus — mesin keadaan.                */
/* Catat → Hitung → Baca. Data datang satu per satu dan anak mengetuk baris yang   */
/* tepat untuk menulis satu garis. Mesin menolak baris yang salah, menghitung       */
/* sebelum semua data dicatat, dan membaca sebelum menghitung. Logika:              */
/* lab-data-k2b8.ts.                                                                */
/* ------------------------------------------------------------------------ */

export default function SimulasiMesinCatat({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinCatat>(() => awalMesinCatat());
  const d = kasusCatat(x);
  const aktif = indeksStasiunCatat(x.keadaan);
  const judulData = SET[d.set].judul;
  const berikut = dataBerikutCatat(x);

  const kirim = (e: PeristiwaMesinCatat) => {
    const baru = langkahMesinCatat(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai ? "Semua ronde sudah dicatat. Hebat, kamu pencatat yang teliti!" : `Ronde ${x.misi + 1} dari ${x.daftar.length}: ${judulData}. ${petunjukMesinCatat(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Catat Turus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Data datang satu per satu. Tulis satu garis di baris yang tepat, lalu hitung dan baca turusnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan petunjuknya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_CATAT} aktif={aktif} nama="Peta mesin catat turus" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua ronde selesai" : `Ronde ${x.misi + 1} dari ${x.daftar.length} • ${judulData}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinCatat(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua ronde dicatat!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              {x.tepat} dari {x.daftar.length} ronde dicatat tanpa salah baris. {x.ditolak} kali mesin menolak langkah yang keliru atau melompat.
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            {x.keadaan === "catat" && berikut !== null ? (
              <div className="igil-muncul rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFFDF2] p-2 text-center" aria-live="polite">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
                  Data ke-{x.posisi + 1} dari {totalCatat(d)}
                </p>
                <p className="text-3xl font-black text-[#1C01A5]">
                  {ikonCatat(d, berikut)} {kapital(namaCatat(d, berikut))}
                </p>
                <p className="text-xs font-bold text-[#1C01A5]/70">Ketuk barisnya di bawah untuk menulis satu garis.</p>
              </div>
            ) : null}

            <div className="space-y-1.5 rounded-2xl bg-indigo-50/60 p-2" role="group" aria-label="Baris turus">
              <p className="px-1 text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{judulData}</p>
              {[0, 1, 2].map((i) => {
                const n = x.turus[i];
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Baris ${namaCatat(d, i)}, ${n} garis`}
                    onClick={() => kirim({ t: "CATAT", i })}
                    className="flex min-h-14 w-full items-center gap-2 rounded-xl border-4 border-[#1C01A5]/40 bg-white px-2 py-1.5 text-left active:border-[#F0AB00]"
                  >
                    <span className="w-24 shrink-0 text-sm font-black text-[#1C01A5]">
                      {ikonCatat(d, i)} {kapital(namaCatat(d, i))}
                    </span>
                    <span className="min-w-0 flex-1">{n > 0 ? <TurusBaris n={n} kelompok /> : <span className="text-xs font-bold text-[#1C01A5]/40">belum ada garis</span>}</span>
                    {x.keadaan !== "catat" && x.keadaan !== "hitung" ? <span className="w-8 shrink-0 text-right text-2xl font-black text-[#1C01A5]">{n}</span> : null}
                  </button>
                );
              })}
            </div>

            {x.keadaan === "hitung" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Hitung • Ada berapa data seluruhnya?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih jumlah data">
                  {opsiJumlahCatat(d, x.misi).map((o) => (
                    <button key={o} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "JUMLAH", nilai: o })}>
                      {o} data
                    </button>
                  ))}
                </div>
                <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "PALING", i: 0 })}>
                  👀 Langsung baca
                </button>
              </div>
            ) : null}

            {x.keadaan === "baca" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Baca • Jenis apa yang paling banyak?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih yang paling banyak">
                  {opsiPalingCatat(x.misi).map((i) => (
                    <button key={i} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "PALING", i })}>
                      {ikonCatat(d, i)} {kapital(namaCatat(d, i))}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "catat" ? (
              <div className="text-center">
                <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "JUMLAH", nilai: totalCatat(d) })}>
                  🔢 Langsung hitung
                </button>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {petunjukMesinCatat(x)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Ronde berikutnya ➡" : "Selesai 🏁"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, ketuk baris yang bukan jenis data yang datang. Apa kata mesin? Dua, tekan langsung hitung sebelum semua data dicatat. Apa kata mesin? Tiga, catat semua data, lalu perhatikan kelompok lima pada turus. Empat, pilih jenis yang bukan paling banyak. Apa kata mesin?"
          )
        }
        langkah={[
          "Ketuk baris yang bukan jenis data yang sedang datang. Apa kata mesin?",
          "Tekan Langsung hitung sebelum semua data dicatat. Apa kata mesin?",
          "Catat semua data. Perhatikan kapan turus membentuk kelompok lima.",
          "Pilih jenis yang bukan paling banyak. Apa kata mesin?",
        ]}
      />
    </div>
  );
}
