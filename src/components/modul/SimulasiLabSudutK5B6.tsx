"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B6 } from "./eja-k5b6";
import { GambarJam, GambarSudut } from "./model-sudut-k5b6";
import {
  DATA_BAGIAN,
  DATA_JAM,
  DEG_LANGKAH,
  KATA_JAM,
  NAMA_BAGIAN,
  SEBUT_BAGIAN,
  TUGAS_JENIS,
  NAMA_JENIS,
  awalSudutK5B6B,
  dataBagian,
  idBagian,
  idJam,
  idJenis,
  jamDipilih,
  keadaanSudutK5B6B,
  langkahSudutK5B6B,
  sorotBagian,
  ucapBagianK5B6B,
  ucapJamK5B6B,
  ucapJenisK5B6B,
  type KeadaanSudutK5B6B,
} from "./lab-sudut-k5b6b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B6 Sub-Bab B): Lab Sudut. Satu alat, tiga tampilan.            */
/*  Bagian : namai bagian sudut yang disorot (titik, kaki, daerah).           */
/*  Jenis  : buka atau tutup kaki sudut sampai lancip, siku-siku, atau tumpul. */
/*  Jam    : jenis sudut antara dua jarum jam pada pukul bulat.               */
/* Logika: lab-sudut-k5b6b.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Bagian, bagian mana yang disorot? Apa namanya?",
  "Di Jenis, buka kaki sudut lebih lebar dari patokan. Apa nama sudutnya?",
  "Di Jam, bagaimana sudut antara kedua jarum pada pukul dua?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";

export default function SimulasiLabSudutK5B6({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSudutK5B6B) => void }) {
  const [x, kirim] = useReducer(langkahSudutK5B6B, undefined, awalSudutK5B6B);
  const [lihat, setLihat] = useState<"bagian" | "jenis" | "jam">("bagian");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSudutK5B6B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "bagian" ? ucapBagianK5B6B(x) : lihat === "jenis" ? ucapJenisK5B6B(x) : ucapJamK5B6B(x);
  const bg = dataBagian(x);
  const sorot = sorotBagian(x);
  const jam = jamDipilih(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Sudut</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Sudut punya titik sudut dan dua kaki sudut, dan dikelompokkan dengan patokan siku-siku.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B6(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "bagian"} onKlik={() => pilihTampilan("bagian")}>
          ∠ Bagian
        </Pilihan>
        <Pilihan aktif={lihat === "jenis"} onKlik={() => pilihTampilan("jenis")}>
          📐 Jenis
        </Pilihan>
        <Pilihan aktif={lihat === "jam"} onKlik={() => pilihTampilan("jam")}>
          🕐 Jam
        </Pilihan>
      </div>

      {lihat === "bagian" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih sudut">
            {DATA_BAGIAN.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.bagian.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Sudut ${d.nama}`}>
                {x.pernah.includes(idBagian(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarSudut deg={bg.deg} sorot={sorot} nama={bg.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
            {sorot === null ? "Semua bagian sudah dinamai." : "Bagian yang disorot itu namanya …"}
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan nama bagian">
            {NAMA_BAGIAN.map((n) => (
              <button key={n} type="button" aria-label={`Namai ${SEBUT_BAGIAN[n]}`} onClick={() => kirim({ t: "G_NAMA", nama: n })} className={TOMBOL_KECIL}>
                {SEBUT_BAGIAN[n][0].toUpperCase()}
                {SEBUT_BAGIAN[n].slice(1)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "jenis" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tugas">
            {TUGAS_JENIS.map((j, i) => (
              <Pilihan key={j} aktif={x.jenis.tugas === i} onKlik={() => kirim({ t: "J_TUGAS", i })} label={`Buat sudut ${NAMA_JENIS[j]}`}>
                {x.pernah.includes(idJenis(j)) ? "✅ " : ""}
                Buat {NAMA_JENIS[j]}
              </Pilihan>
            ))}
          </div>
          <GambarSudut deg={x.jenis.deg} patokan nama="sudut yang diatur" />
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" aria-label="Tutup sudut lebih sempit" onClick={() => kirim({ t: "J_UBAH", d: -DEG_LANGKAH })} className={TOMBOL_KECIL}>
              ◀ Lebih sempit
            </button>
            <button type="button" aria-label="Buka sudut lebih lebar" onClick={() => kirim({ t: "J_UBAH", d: DEG_LANGKAH })} className={TOMBOL_KECIL}>
              Lebih lebar ▶
            </button>
            <button type="button" aria-label="Cek sudut" onClick={() => kirim({ t: "J_CEK" })} className={TOMBOL_KECIL}>
              Cek sudut
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "jam" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pukul">
            {DATA_JAM.map((h, i) => (
              <Pilihan key={h} aktif={x.jam.data === i} onKlik={() => kirim({ t: "M_DATA", i })} label={`Pukul ${KATA_JAM[h]}`}>
                {x.pernah.includes(idJam(i)) ? "✅ " : ""}
                {String(h).padStart(2, "0")}.00
              </Pilihan>
            ))}
          </div>
          <GambarJam jam={jam} nama={`jam dinding pukul ${KATA_JAM[jam]}`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Sudut antara kedua jarum …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jenis sudut">
            <button type="button" aria-label="Pilih lancip" onClick={() => kirim({ t: "M_JAWAB", jawab: "lancip" })} className={TOMBOL_KECIL}>
              Lancip
            </button>
            <button type="button" aria-label="Pilih siku-siku" onClick={() => kirim({ t: "M_JAWAB", jawab: "siku" })} className={TOMBOL_KECIL}>
              Siku-siku
            </button>
            <button type="button" aria-label="Pilih tumpul" onClick={() => kirim({ t: "M_JAWAB", jawab: "tumpul" })} className={TOMBOL_KECIL}>
              Tumpul
            </button>
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("bagian");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B6(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
