"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B6 } from "./eja-k4b6";
import { DiagramBatang } from "./model-batang-k4b6";
import {
  DATA_BANDING,
  DATA_BANGUN,
  DATA_LABEL,
  GARIS,
  PILIHAN_JUDUL,
  PILIHAN_LABEL,
  SKALA_SUMBU,
  awalBatangK4B6B,
  bandingAktif,
  dataBangun,
  dataLabel,
  keadaanBatangK4B6B,
  langkahBatangK4B6B,
  tanyaAktif,
  ucapBandingK4B6B,
  ucapBangunK4B6B,
  ucapLabelK4B6B,
  type KeadaanBatangK4B6B,
} from "./lab-batang-k4b6b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B6 Sub-Bab B): Lab Batang. Satu alat, tiga tampilan.           */
/*  Bangun  : pilih langkah sumbu, atur tinggi tiap batang.                   */
/*  Label   : beri judul dan label sumbu, ubah arah tegak atau mendatar.      */
/*  Banding : baca nilai, selisih dua batang, dan jumlah semua batang.        */
/* Logika: lab-batang-k4b6b.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Bangun, pilih siswa per kelas dengan langkah sumbu 2. Apa kata lab?",
  "Di Label, ubah diagram buku dipinjam menjadi mendatar. Label mana yang harus bertukar?",
  "Di Banding, pilih siswa per kelas lalu ketuk Kelas 3. Mengapa banyak garis belum tentu nilainya?",
  "Di Bangun, buat buku dipinjam dengan langkah 4, lalu dengan langkah 2. Mana yang lebih mudah dibaca?",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const TOMBOL_BULAT = "h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black leading-none text-[#1C01A5]";

export default function SimulasiLabBatangK4B6({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBatangK4B6B) => void }) {
  const [x, kirim] = useReducer(langkahBatangK4B6B, undefined, awalBatangK4B6B);
  const [lihat, setLihat] = useState<"bangun" | "label" | "banding">("bangun");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBatangK4B6B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "bangun" ? ucapBangunK4B6B(x) : lihat === "label" ? ucapLabelK4B6B(x) : ucapBandingK4B6B(x);
  const dG = dataBangun(x);
  const dL = dataLabel(x);
  const dB = bandingAktif(x);
  const q = tanyaAktif(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Batang</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Panjang batang menunjukkan nilai, dibaca dari skala sumbu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B6(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "bangun"} onKlik={() => pilihTampilan("bangun")}>
          📊 Bangun
        </Pilihan>
        <Pilihan aktif={lihat === "label"} onKlik={() => pilihTampilan("label")}>
          🏷️ Label
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
      </div>

      {lihat === "bangun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data diagram">
            {DATA_BANGUN.map((d, i) => (
              <Pilihan key={d.id} aktif={x.bangun.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Data ${d.judul}`}>
                {d.judul}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Pilih langkah sumbu">
            <span className="text-xs font-black text-[#1C01A5]">Langkah sumbu:</span>
            {SKALA_SUMBU.map((s) => (
              <Pilihan key={s} aktif={x.bangun.skala === s} onKlik={() => kirim({ t: "G_SKALA", s })} label={`Langkah sumbu ${s}`}>
                {s}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">
            Data: {dG.kategori.map((k) => `${k.label} ${k.nilai}`).join(", ")}. Ketuk garis di atas nama untuk mengatur tinggi batang.
          </p>
          <DiagramBatang
            judul={dG.judul}
            kategori={dG.kategori.map((k) => k.label)}
            tinggi={x.bangun.tinggi}
            skala={x.bangun.skala}
            garis={GARIS}
            arah="tegak"
            labelTegak={dG.namaNilai}
            labelDatar={dG.namaKategori}
            onAtur={(r, garis) => kirim({ t: "G_ATUR", r, garis })}
          />
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {dG.kategori.map((k, r) => (
              <div key={k.id} className="flex items-center justify-between gap-1 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-1 py-0.5">
                <span className="truncate text-xs font-black text-[#1C01A5]">{k.label}</span>
                <span className="flex items-center gap-1">
                  <button type="button" aria-label={`Kurangi satu batang ${k.label}`} onClick={() => kirim({ t: "G_KURANG", r })} className={TOMBOL_BULAT}>
                    −
                  </button>
                  <button type="button" aria-label={`Tambah satu batang ${k.label}`} onClick={() => kirim({ t: "G_TAMBAH", r })} className={TOMBOL_BULAT}>
                    +
                  </button>
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Kosongkan semua batang" onClick={() => kirim({ t: "G_ULANG" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Periksa diagram batang" onClick={() => kirim({ t: "G_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "label" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih diagram">
            {DATA_LABEL.map((b, i) => (
              <Pilihan key={b.data.id} aktif={x.label.data === i} onKlik={() => kirim({ t: "L_DATA", i })} label={`Diagram data ${i + 1}`}>
                Diagram {i + 1}
              </Pilihan>
            ))}
          </div>
          <DiagramBatang
            judul={x.label.judul}
            kategori={dL.data.kategori.map((k) => k.label)}
            tinggi={dL.data.kategori.map((k) => k.nilai)}
            skala={dL.skala}
            garis={GARIS}
            arah={x.label.arah}
            labelTegak={x.label.tegak}
            labelDatar={x.label.datar}
          />
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Pilih arah batang">
            <span className="text-xs font-black text-[#1C01A5]">Arah:</span>
            <Pilihan aktif={x.label.arah === "tegak"} onKlik={() => kirim({ t: "L_ARAH", a: "tegak" })} label="Arah tegak">
              ⬆️ Tegak
            </Pilihan>
            <Pilihan aktif={x.label.arah === "mendatar"} onKlik={() => kirim({ t: "L_ARAH", a: "mendatar" })} label="Arah mendatar">
              ➡️ Mendatar
            </Pilihan>
          </div>
          {(
            [
              ["Judul", PILIHAN_JUDUL, x.label.judul, (v: string) => kirim({ t: "L_JUDUL", v })],
              ["Sumbu tegak", PILIHAN_LABEL, x.label.tegak, (v: string) => kirim({ t: "L_TEGAK", v })],
              ["Sumbu datar", PILIHAN_LABEL, x.label.datar, (v: string) => kirim({ t: "L_DATAR", v })],
            ] as const
          ).map(([nama, daftar, aktif, pilih]) => (
            <div key={nama} className="flex flex-wrap items-center gap-1" role="group" aria-label={`Pilih ${nama.toLowerCase()}`}>
              <span className="w-24 text-xs font-black text-[#1C01A5]">{nama}:</span>
              {daftar.map((v) => (
                <Pilihan key={v} aktif={aktif === v} onKlik={() => pilih(v)} label={`${nama}: ${v}`}>
                  {v}
                </Pilihan>
              ))}
            </div>
          ))}
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa label" onClick={() => kirim({ t: "L_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih diagram banding">
            {DATA_BANDING.map((b, i) => (
              <Pilihan key={b.data.id} aktif={x.banding.data === i} onKlik={() => kirim({ t: "D_DATA", i })} label={`Banding ${b.data.judul}`}>
                {b.data.judul}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk satu batang untuk nilainya, dua batang untuk selisihnya.</p>
          <DiagramBatang
            judul={dB.data.judul}
            kategori={dB.data.kategori.map((k) => k.label)}
            tinggi={dB.data.kategori.map((k) => k.nilai)}
            skala={dB.skala}
            garis={GARIS}
            arah={dB.arah}
            labelTegak={dB.arah === "tegak" ? dB.data.namaNilai : dB.data.namaKategori}
            labelDatar={dB.arah === "tegak" ? dB.data.namaKategori : dB.data.namaNilai}
            pilih={x.banding.pilih}
            onPilih={(r) => kirim({ t: "D_PILIH", r })}
          />
          <div className="flex justify-center">
            <button type="button" aria-label="Tanya jumlah semua batang" onClick={() => kirim({ t: "D_SEMUA" })} className={TOMBOL_KECIL}>
              ➕ Semua batang
            </button>
          </div>
          {q ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">{q.tanya}</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan jawaban">
                {q.opsi.map((o) => (
                  <button key={o} type="button" aria-label={`Jawab ${o}`} onClick={() => kirim({ t: "D_JAWAB", nilai: o })} className={TOMBOL_KECIL}>
                    {o}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("bangun");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B6(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
