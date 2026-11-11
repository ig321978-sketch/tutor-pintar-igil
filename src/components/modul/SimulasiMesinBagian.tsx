"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import GambarPotong from "./gambar-potong-k2b5";
import {
  OPSI_BANDING,
  STASIUN_MESIN_BAGIAN,
  awalMesinBagian,
  indeksStasiunBagian,
  kasusAktif,
  langkahMesinBagian,
  opsiHitung,
  opsiSebut,
  petunjukMesinBagian,
  ringkasBagian,
  type MesinBagian,
  type PeristiwaMesinBagian,
} from "./mesin-bagian-k2b5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B5 Sub-Bab A): Mesin Pemeriksa Bagian — mesin keadaan.          */
/* Hitung → Bandingkan → Sebut. Mesin menolak lompatan dan memberi petunjuk,   */
/* tanpa hukuman. Logika: mesin-bagian-k2b5.ts.                                */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiMesinBagian({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinBagian>(() => awalMesinBagian());
  /** Bagian yang sudah diketuk anak untuk dihitung (indeks), diulang di tiap bentuk. */
  const [tanda, setTanda] = useState<number[]>([]);
  const d = kasusAktif(x);
  const aktif = indeksStasiunBagian(x.keadaan);

  const kirim = (e: PeristiwaMesinBagian) => {
    const baru = langkahMesinBagian(x, e);
    if (baru.misi !== x.misi || e.t === "ULANG") setTanda([]);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const ketukBagian = (i: number) => {
    if (x.keadaan !== "hitung") return;
    setTanda((t) => (t.includes(i) ? t.filter((j) => j !== i) : [...t, i]));
  };

  const suara = x.selesai ? "Semua bentuk sudah diperiksa. Hebat, kamu pemeriksa bagian!" : `Bentuk ${x.misi + 1} dari ${x.daftar.length}, ${d.nama}. ${petunjukMesinBagian(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";
  const teks = x.keadaan === "hitung" ? Array.from({ length: d.bagian }, (_, i) => (tanda.includes(i) ? String(tanda.indexOf(i) + 1) : null)) : undefined;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Pemeriksa Bagian</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Jawab tiga pertanyaan berurutan untuk memeriksa setiap bentuk.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pertanyaannya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_BAGIAN} aktif={aktif} nama="Peta mesin pemeriksa bagian" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua bentuk selesai" : `Bentuk ${x.misi + 1} dari ${x.daftar.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinBagian(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua bentuk diperiksa!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Urutan pemeriksaanmu sudah rapi.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-sm font-black text-[#1C01A5]">{d.nama}</p>
            <div className="flex justify-center">
              <GambarPotong
                bentuk={d.bentuk}
                garis={d.garis}
                teks={teks}
                onKetuk={x.keadaan === "hitung" ? ketukBagian : undefined}
                kelas="h-44 w-44"
                label={`${d.nama} yang sudah dibelah garis`}
              />
            </div>
            {x.keadaan === "hitung" ? <p className="text-center text-xs font-bold text-[#1C01A5]/70">Ketuk bagian satu per satu untuk menghitung.</p> : null}

            {x.keadaan === "hitung" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Hitung • Ada berapa bagian?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih banyak bagian">
                  {opsiHitung(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "HITUNG", nilai: Number(o.kunci) })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "banding" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Bandingkan • Sama besar atau tidak?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Sama besar atau tidak">
                  {OPSI_BANDING.map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "BANDING", nilai: o.kunci as "sama" | "beda" })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sebut" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Sebut • Setengah atau bukan?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih sebutan">
                  {opsiSebut(x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "SEBUT", nilai: o.kunci })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {ringkasBagian(d)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Bentuk berikutnya ➡" : "Selesai 🏁"}
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
            "Coba ini. Satu, ketuk stasiun Sebut sebelum menghitung bagian. Apa kata mesin? Dua, pada Kue Bolu, kenapa dua bagian ini bukan setengah? Tiga, pada Puding, bagiannya sama besar. Mengapa tetap bukan setengah?"
          )
        }
        langkah={[
          "Ketuk stasiun Sebut sebelum menghitung bagian. Apa kata mesin?",
          "Pada Kue Bolu, kenapa dua bagian ini bukan setengah?",
          "Pada Puding, bagiannya sama besar. Mengapa tetap bukan setengah?",
        ]}
      />
    </div>
  );
}
