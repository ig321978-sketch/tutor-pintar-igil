"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { NeracaRangka } from "./diagram-k2b6";
import { BendaLab, pikselBenda } from "./gambar-lab-k2b6";
import {
  NAMA_BENDA_MESIN,
  STASIUN_MESIN_TEBAK,
  awalMesinTebak,
  indeksStasiunTebak,
  kasusAktif,
  langkahMesinTebak,
  miringTebak,
  opsiTebak,
  opsiTulis,
  petunjukMesinTebak,
  ringkasTebak,
  type MesinTebak,
  type PeristiwaMesinTebak,
} from "./mesin-tebak-k2b6";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B6 Sub-Bab A): Mesin Tebak dan Buktikan — mesin keadaan.         */
/* Tebak → Timbang → Tulis. Menebak selalu diterima; yang ditolak adalah        */
/* menulis kesimpulan sebelum menimbang. Ukuran benda tampak apa adanya, jadi   */
/* benda besar yang ringan bisa mengecoh tebakan. Logika: mesin-tebak-k2b6.ts.   */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiMesinTebak({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinTebak>(() => awalMesinTebak());
  const d = kasusAktif(x);
  const aktif = indeksStasiunTebak(x.keadaan);

  const kirim = (e: PeristiwaMesinTebak) => {
    const baru = langkahMesinTebak(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const sudahTimbang = x.keadaan === "tulis" || x.keadaan === "sudah";
  const miring = sudahTimbang ? miringTebak(d) : 0;
  const a = NAMA_BENDA_MESIN[d.kiri];
  const b = NAMA_BENDA_MESIN[d.kanan];
  const suara = x.selesai ? "Semua pasangan sudah ditimbang. Hebat, kamu penimbang yang teliti!" : `Pasangan ${x.misi + 1} dari ${x.daftar.length}: ${a} dan ${b}. ${petunjukMesinTebak(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";
  const tebakanLabel = x.tebakan ? opsiTebak(d, x.misi).find((o) => o.kunci === x.tebakan)?.label : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Tebak dan Buktikan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tebak dulu, lalu buktikan dengan menimbang, lalu tulis kesimpulannya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pertanyaannya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_TEBAK} aktif={aktif} nama="Peta mesin tebak dan buktikan" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua pasangan selesai" : `Pasangan ${x.misi + 1} dari ${x.daftar.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinTebak(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua pasangan ditimbang!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              Tebakanmu meleset {x.meleset} kali dari {x.daftar.length}. Itu wajar, karena itulah gunanya menimbang. {x.ditolak} kali mesin menolak langkah yang melompat.
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <NeracaRangka
              miring={miring}
              kiri={<BendaLab id={d.kiri} ukuran={pikselBenda(d.kiri, true)} />}
              kanan={<BendaLab id={d.kanan} ukuran={pikselBenda(d.kanan, true)} />}
              label={`Neraca: ${a} di kiri, ${b} di kanan. ${sudahTimbang ? (miring === 0 ? "Seimbang." : miring === -1 ? "Sisi kiri turun." : "Sisi kanan turun.") : "Belum ditimbang, ditahan datar."}`}
            />
            <p className="text-center text-sm font-black text-[#1C01A5]">
              {a} di kiri, {b} di kanan
            </p>

            {x.keadaan === "tebak" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Tebak • Menurutmu, mana yang lebih berat?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih tebakan">
                  {opsiTebak(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "TEBAK", nilai: o.kunci })}>
                      {o.label}
                    </button>
                  ))}
                </div>
                <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "BUKTIKAN" })}>
                  ⚖️ Timbang sekarang
                </button>
              </div>
            ) : null}

            {x.keadaan === "timbang" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Timbang • Tebakanmu: {tebakanLabel}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BUKTIKAN" })}>
                  ⚖️ Timbang sekarang
                </button>
              </div>
            ) : null}

            {x.keadaan === "tulis" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Tulis • Pilih kalimat yang cocok dengan neraca</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih kalimat kesimpulan">
                  {opsiTulis(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "TULIS", nilai: o.kunci })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {ringkasTebak(d, x.tebakan)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Pasangan berikutnya ➡" : "Selesai 🏁"}
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
            "Coba ini. Satu, tekan timbang sekarang sebelum menebak. Apa kata mesin? Dua, pada balon dan batu, tebak dulu, lalu buktikan. Apakah tebakanmu tepat? Tiga, bandingkan balon dan batu dengan kelapa dan batu. Apa yang sama dari keduanya?"
          )
        }
        langkah={[
          "Tekan Timbang sekarang sebelum menebak. Apa kata mesin?",
          "Pada balon dan batu, tebak dulu, lalu buktikan. Apakah tebakanmu tepat?",
          "Bandingkan balon dan batu dengan kelapa dan batu. Apa yang sama dari keduanya?",
        ]}
      />
    </div>
  );
}
