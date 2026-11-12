"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin } from "./komponen-lab";
import { ejaK3 } from "./lab-tempat-k3b1";
import { awalMesin, indeksStasiun, kasusAktif, langkahAktif, langkahMesin, petunjukMesin, type DefMesin, type PeristiwaMesin, type StateMesin } from "./mesin-bertahap-k3b1";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B1): Mesin berstasiun. Satu komponen, enam definisi (lihat        */
/* mesin-data-k3b1.ts). Mesin menolak lompatan dan menjawab salah dengan         */
/* petunjuk, tanpa hukuman. Logika: mesin-bertahap-k3b1.ts.                      */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiMesinBertahapK3({
  def,
  coba,
  speakGuru,
  onTuntas,
  eja = ejaK3,
}: {
  def: DefMesin;
  /** Tiga langkah selidik "Coba ini!" khusus mesin ini. */
  coba: string[];
  speakGuru: (t: string) => void;
  onTuntas: (id: string) => void;
  /** Pengeja suara. Bawaan ejaK3 (bilangan sampai 1.000); bab dengan bilangan lebih besar memberi pengejanya sendiri. */
  eja?: (t: string) => string;
}) {
  const [x, setX] = useState<StateMesin>(() => awalMesin(def));
  const kasus = kasusAktif(x);
  const langkah = langkahAktif(x);
  const aktif = indeksStasiun(x);

  const kirim = (e: PeristiwaMesin) => {
    const baru = langkahMesin(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas(def.selesaiId);
  };

  const suara = x.selesai ? "Semua kasus sudah diperiksa. Hebat!" : `Kasus ${x.misi + 1} dari ${def.kasus.length}, ${kasus.nama}. ${petunjukMesin(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";
  const sudahDijawab = x.fase === "jalan" ? kasus.langkah.slice(0, x.ke) : x.fase === "sudah" ? kasus.langkah : [];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{def.judul}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Jawab pertanyaan di tiap stasiun, berurutan, untuk memeriksa setiap kasus.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pertanyaannya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={def.stasiun} aktif={aktif} nama={`Peta ${def.judul}`} onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua kasus selesai" : `Kasus ${x.misi + 1} dari ${def.kasus.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={langkah ? `Pertanyaan ${x.ke + 1} dari ${def.stasiun.length}` : petunjukMesin(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua kasus diperiksa!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Urutan langkahmu sudah rapi.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-xl font-black text-[#1C01A5]">{kasus.nama}</p>

            {sudahDijawab.length > 0 ? (
              <ol className="space-y-1" aria-label="Langkah yang sudah dijawab">
                {sudahDijawab.map((l, i) => (
                  <li key={l.stasiun} className="rounded-xl bg-[#E8F7EE] px-2 py-1 text-xs font-bold text-[#14532D]">
                    ✅ {i + 1}. {l.tanya} <span className="font-black">{l.benar}</span>
                  </li>
                ))}
              </ol>
            ) : null}

            {langkah ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
                  Stasiun {def.stasiun[x.ke].nama} • Pertanyaan {x.ke + 1} dari {def.stasiun.length}
                </p>
                <p className="text-base font-black text-[#1C01A5]">{langkah.tanya}</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jawaban">
                  {langkah.opsi.map((o) => (
                    <button key={o} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "JAWAB", nilai: o })}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.fase === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {kasus.ringkas}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < def.kasus.length ? "Kasus berikutnya ➡" : "Selesai 🏁"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${coba.map((c, i) => `${["Satu", "Dua", "Tiga"][i]}, ${eja(c)}`).join(" ")}`)} langkah={coba} />
    </div>
  );
}
