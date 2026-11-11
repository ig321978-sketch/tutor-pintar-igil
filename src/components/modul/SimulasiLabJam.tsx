"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { JamMuka } from "./diagram-k2b6";
import {
  URUT_BAGIAN_JAM,
  angkaJam12,
  bagianHariJam,
  digitalJam,
  jamPadanan,
  kalimatJam,
  kalimatPadanan,
  ketukAngka,
  laporanJam,
  nyalakanBagian,
  nyalakanDigital,
  resetJam,
  sebutPukulJam,
  ubahJam,
  awalJam,
  type BagianHariJam,
} from "./lab-jam-k2b6";
import type { KeadaanLabJam } from "./misi-k2bab6";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B6 Sub-Bab B): Lab Jam — model PhET.                            */
/* Satu model (jam 0 sampai 23), banyak perwakilan: jam analog, jam digital,    */
/* bagian hari, dan kalimat. Jam kedua di bawah memperlihatkan bahwa jarum yang */
/* sama muncul dua kali sehari. Hanya jam tepat. Logika: lab-jam-k2b6.ts.        */
/* ------------------------------------------------------------------------ */

const IKON_BAGIAN: Record<BagianHariJam, string> = { pagi: "🌅", siang: "☀️", sore: "🌇", malam: "🌙" };

export default function SimulasiLabJam({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabJam) => void }) {
  const [l, setL] = useState(awalJam);

  const lap = useMemo(() => laporanJam(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const j = l.jam24;
  const p = jamPadanan(j);
  const teks = kalimatJam(l);
  const bagian = bagianHariJam(j);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Jam</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Putar jam atau ketuk angka di muka jam. Jarum panjang tetap di angka 12, jadi selalu pukul tepat.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-col items-center gap-2">
          <JamMuka jam={j} onAngka={(n) => setL((x) => ketukAngka(x, n))} kelas="w-full max-w-[220px]" label={`Jam: jarum pendek di angka ${angkaJam12(j)}, jarum panjang di angka 12`} />
          {l.digital ? (
            <p className="igil-muncul rounded-xl border-4 border-[#1C01A5] bg-[#0F0A3C] px-4 py-1 font-mono text-3xl font-black tracking-widest text-[#FFE566]" aria-label={`Jam digital ${digitalJam(j)}`}>
              {digitalJam(j)}
            </p>
          ) : null}
          {l.bagian ? (
            <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label={`Bagian hari: ${bagian}`}>
              {URUT_BAGIAN_JAM.map((b) => (
                <span
                  key={b}
                  className={`rounded-full border-2 px-3 py-1 text-xs font-black ${b === bagian ? "border-[#F0AB00] bg-[#FFE566] text-[#1C01A5]" : "border-[#1C01A5]/25 bg-white text-[#1C01A5]/50"}`}
                >
                  {IKON_BAGIAN[b]} {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <Pengatur
          nama={`Pukul ${angkaJam12(j)}`}
          nilai={angkaJam12(j)}
          onKurang={() => setL((x) => ubahJam(x, -1))}
          onTambah={() => setL((x) => ubahJam(x, 1))}
          kurangMati={false}
          tambahMati={false}
          kurangLabel="Mundur satu jam"
          tambahLabel="Maju satu jam"
        />
        <KalimatBesar teks={teks} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={l.digital} onKlik={() => setL((x) => nyalakanDigital(x, !x.digital))}>
            Jam digital
          </Cek>
          <Cek aktif={l.bagian} onKlik={() => setL((x) => nyalakanBagian(x, !x.bagian))}>
            Bagian hari
          </Cek>
        </div>

        <div className="space-y-1 rounded-2xl bg-indigo-50/60 p-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Jarum yang sama, waktu yang berbeda</p>
          <div className="flex items-center justify-center gap-3">
            <div className="text-center">
              <JamMuka jam={j} kelas="w-24" label={`Jam pertama: ${sebutPukulJam(j)}`} />
              <p className="text-xs font-black text-[#1C01A5]">{sebutPukulJam(j)}</p>
            </div>
            <span className="text-xl font-black text-[#1C01A5]" aria-hidden="true">
              =
            </span>
            <div className="text-center">
              <JamMuka jam={p} kelas="w-24" label={`Jam kedua dengan jarum yang sama: ${sebutPukulJam(p)}`} />
              <p className="text-xs font-black text-[#1C01A5]">{sebutPukulJam(p)}</p>
            </div>
          </div>
          <p className="text-center text-xs font-bold text-[#1C01A5]/80">{kalimatPadanan(l)}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetJam())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, putar sampai jarum pendek di angka lima. Pukul berapa itu? Dua, nyalakan jam digital. Apa tulisan untuk pukul lima pagi dan pukul lima sore? Tiga, nyalakan bagian hari. Jam berapa saja yang termasuk pagi? Empat, ketuk angka dua belas, lalu angka enam. Ke mana jarum pendek pergi?"
          )
        }
        langkah={[
          "Putar sampai jarum pendek di angka 5. Pukul berapa itu?",
          "Nyalakan Jam digital. Apa tulisannya untuk pukul 5 pagi dan pukul 5 sore?",
          "Nyalakan Bagian hari. Jam berapa saja yang termasuk pagi?",
          "Ketuk angka 12, lalu angka 6. Ke mana jarum pendek pergi?",
        ]}
      />
    </div>
  );
}
