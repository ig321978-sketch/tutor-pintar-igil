"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { GarisAngka, HIJAU, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { BATU_MAKS, MISI, awalKatak, langkahKatak, petunjukMisi, type Katak, type PeristiwaKatak } from "./mesin-katak-bab1";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 1): Katak Maju Mundur, metode mesin keadaan.               */
/* Keadaan = batu tempat katak berdiri. Mesin menolak langkah ke luar sungai. */
/* Logika di mesin-katak-bab1.ts. Tanpa jaringan.                             */
/* ------------------------------------------------------------------------ */

const TOMBOL_LANGKAH =
  "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5 disabled:opacity-40";

export default function SimulasiKatak({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [k, setK] = useState<Katak>(() => awalKatak(0));
  const m = MISI[k.misi];

  const kirim = (p: PeristiwaKatak) => {
    const baru = langkahKatak(k, p);
    setK(baru);
    if (baru.selesai && !k.selesai) onTuntas();
  };

  const suara = k.selesai
    ? "Semua misi selesai. Hebat! Katak sudah maju dan mundur dengan tepat."
    : `Misi ${k.misi + 1} dari ${MISI.length}. Katak berdiri di batu ${k.pos}. ${petunjukMisi(k)}`;
  const terakhir = k.riwayat.length > 0 ? `Mesin pindah ${k.riwayat[k.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Katak Maju Mundur</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Batu sungai adalah keadaan mesin. Antar katak sampai batu tujuan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan misi ini" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {k.selesai ? "Semua misi selesai" : `Misi ${k.misi + 1} dari ${MISI.length} • dari batu ${m.awal} ke batu ${m.tujuan}`}
        </p>
        <GarisAngka
          maks={BATU_MAKS}
          nama={`Sungai dengan batu 0 sampai 10. Katak di batu ${k.pos}. Tujuan batu ${m.tujuan}.`}
          sorot={k.selesai ? [] : [m.tujuan]}
          penanda={[{ n: k.pos, warna: HIJAU, teks: "🐸" }]}
        />
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          Keadaan mesin: katak di batu <span className="rounded-lg bg-[#FFE566] px-2 py-0.5 text-xl">{k.pos}</span>
        </p>
        <StatusMesin pesan={k.pesan} terakhir={terakhir} awal={`Mesin siap. ${petunjukMisi(k)}`} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {k.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua misi selesai!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              {k.langkah} langkah, {k.ditolak} kali mesin menolak.
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Langkah katak">
              <button type="button" aria-label="Mundur 2" onClick={() => kirim({ t: "MUNDUR", n: 2 })} className={TOMBOL_LANGKAH}>
                ⏪ Mundur 2
              </button>
              <button type="button" aria-label="Mundur 1" onClick={() => kirim({ t: "MUNDUR", n: 1 })} className={TOMBOL_LANGKAH}>
                ◀ Mundur 1
              </button>
              <button type="button" aria-label="Maju 1" onClick={() => kirim({ t: "MAJU", n: 1 })} className={TOMBOL_LANGKAH}>
                Maju 1 ▶
              </button>
              <button type="button" aria-label="Maju 2" onClick={() => kirim({ t: "MAJU", n: 2 })} className={TOMBOL_LANGKAH}>
                Maju 2 ⏩
              </button>
            </div>
            {k.tiba ? (
              <div className="igil-muncul space-y-2 text-center">
                <p className="text-base font-black text-[#14532D]">🐸 Katak tiba di batu {m.tujuan}!</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {k.misi + 1 >= MISI.length ? "Selesai ✔" : "Misi berikutnya ➡"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <RiwayatMesin riwayat={k.riwayat} ditolak={k.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, di batu nol, tekan mundur. Apa kata mesin? Dua, di batu sepuluh, tekan maju. Apa kata mesin? Tiga, selesaikan ketiga misi. Katak maju dan mundur, bilangan jadi lebih besar atau lebih kecil."
          )
        }
        langkah={[
          "Antar katak ke batu 0, lalu tekan Mundur. Apa kata mesin?",
          "Antar katak ke batu 10, lalu tekan Maju. Apa kata mesin?",
          "Selesaikan ketiga misi. Maju membuat bilangan lebih besar, mundur lebih kecil.",
        ]}
      />
    </div>
  );
}
