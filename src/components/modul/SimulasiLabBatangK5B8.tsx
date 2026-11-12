"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B8 } from "./eja-k5b8";
import { GambarBatang, WARNA_SERI } from "./model-batang-k5b8";
import {
  DATA_BATANG,
  DATA_GANDA,
  MULAI_BUKAN_NOL,
  SKALA_BUKAN_NOL,
  SKALA_LONCAT,
  SKALA_PILIHAN,
  awalBatangK5B8C,
  dataBaca,
  dataBanding,
  dataSkala,
  idBaca,
  idPilih,
  idSelisih,
  idTren,
  keadaanBatangK5B8C,
  langkahBatangK5B8C,
  opsiBacaBatang,
  opsiPenyajian,
  opsiSelisih,
  opsiTren,
  ucapBacaK5B8C,
  ucapBandingK5B8C,
  ucapSkalaK5B8C,
  type KeadaanBatangK5B8C,
} from "./lab-batang-k5b8c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B8 Sub-Bab C): Lab Batang. Satu alat, tiga tampilan.            */
/*  Baca    : judul, skala, lalu tinggi batang menjadi nilai.                  */
/*  Skala   : pilih langkah sumbu, putuskan skala baik atau tidak.             */
/*  Banding : batang ganda, selisih, tren, dan penyajian yang tepat.           */
/* Logika: lab-batang-k5b8c.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Baca, lihat judul, lalu skala, lalu tinggi batang. Mengapa urutannya begitu?",
  "Di Skala, pilih langkah sumbu. Mengapa sumbu harus mulai dari nol dan jaraknya teratur?",
  "Di Banding, cari selisih dua batang. Mengapa skalanya harus sama?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";

const labelSkala = (c: number): string => (c === SKALA_LONCAT ? "Tidak teratur" : c === SKALA_BUKAN_NOL ? "Mulai bukan nol" : String(c));

export default function SimulasiLabBatangK5B8({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBatangK5B8C) => void }) {
  const [x, kirim] = useReducer(langkahBatangK5B8C, undefined, awalBatangK5B8C);
  const [lihat, setLihat] = useState<"baca" | "skala" | "banding">("baca");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBatangK5B8C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "baca" ? ucapBacaK5B8C(x) : lihat === "skala" ? ucapSkalaK5B8C(x) : ucapBandingK5B8C(x);
  const ba = dataBaca(x);
  const sk = dataSkala(x);
  const bd = dataBanding(x);
  const pilBaca = opsiBacaBatang(x.baca.data);
  const pilSelisih = opsiSelisih(x.banding.data);
  const pilTren = opsiTren(x.banding.data);
  const pilSaji = opsiPenyajian(x.banding.data);
  const sudahSkala = (i: number) => x.pernah.some((p) => p.startsWith(`skala:${i}:`) || p.startsWith(`tolak:${i}:`));
  const selisihBenar = x.pernah.includes(idSelisih(x.banding.data));
  const trenBenar = x.pernah.includes(idTren(x.banding.data));
  const c = x.skala.pilih;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Batang</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Baca batang, atur skala, dan bandingkan dua kelompok.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B8(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          📖 Baca
        </Pilihan>
        <Pilihan aktif={lihat === "skala"} onKlik={() => pilihTampilan("skala")}>
          📏 Skala
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => pilihTampilan("banding")}>
          ⚖️ Banding
        </Pilihan>
      </div>

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data baca">
            {DATA_BATANG.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.baca.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Pilih baca ${d.nama}`}>
                {x.pernah.includes(idBaca(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarBatang
            judul={x.baca.judul ? ba.judul : null}
            kategori={ba.kategori}
            seri={[{ nama: ba.nama, nilai: ba.nilai, warna: WARNA_SERI[0] }]}
            langkah={ba.langkah}
            labelSkala={x.baca.skala ? "normal" : "tersembunyi"}
            nama={ba.nama}
          />
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Protokol membaca">
            <button type="button" aria-label="Lihat judul" onClick={() => kirim({ t: "B_JUDUL" })} className={TOMBOL_KECIL}>
              {x.baca.judul ? "✅ " : ""}1. Lihat judul
            </button>
            <button type="button" aria-label="Lihat skala" onClick={() => kirim({ t: "B_SKALA" })} className={TOMBOL_KECIL}>
              {x.baca.skala ? "✅ " : ""}2. Lihat skala
            </button>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">3. Nilai {ba.kategori[ba.target]} adalah …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan nilai">
            {pilBaca.opsi.map((n, o) => (
              <button key={n} type="button" aria-label={`Jawab nilai ${n}`} onClick={() => kirim({ t: "B_JAWAB", o })} className={TOMBOL_KECIL}>
                {n}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {lihat === "skala" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data skala">
            {DATA_BATANG.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.skala.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Pilih skala ${d.nama}`}>
                {sudahSkala(i) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Skala untuk {sk.nama}. Langkah tiap garis …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih skala">
            {SKALA_PILIHAN.map((v) => (
              <Pilihan key={v} aktif={c === v} onKlik={() => kirim({ t: "S_PILIH", c: v })} label={`Pilih langkah ${v}`}>
                {x.pernah.includes(`skala:${x.skala.data}:${v}`) || x.pernah.includes(`tolak:${x.skala.data}:${v}`) ? "✅ " : ""}
                {labelSkala(v)}
              </Pilihan>
            ))}
          </div>
          {c !== null ? (
            <GambarBatang
              judul={sk.judul}
              kategori={sk.kategori}
              seri={[{ nama: sk.nama, nilai: sk.nilai, warna: WARNA_SERI[0] }]}
              langkah={c > 0 ? c : sk.langkah}
              mulai={c === SKALA_BUKAN_NOL ? MULAI_BUKAN_NOL : 0}
              labelSkala={c === SKALA_LONCAT ? "loncat" : "normal"}
              nama={sk.nama}
            />
          ) : null}
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Putuskan skala">
            <button type="button" aria-label="Skala baik" onClick={() => kirim({ t: "S_JAWAB", jawab: "baik" })} className={TOMBOL_KECIL}>
              Skala baik
            </button>
            <button type="button" aria-label="Skala tidak baik" onClick={() => kirim({ t: "S_JAWAB", jawab: "tidak" })} className={TOMBOL_KECIL}>
              Tidak baik
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data banding">
            {DATA_GANDA.map((d, i) => (
              <Pilihan key={d.nama} aktif={x.banding.data === i} onKlik={() => kirim({ t: "G_DATA", i })} label={`Pilih banding ${d.nama}`}>
                {x.pernah.includes(idPilih(i)) ? "✅✅ " : x.pernah.includes(idSelisih(i)) ? "✅ " : ""}
                {d.nama}
              </Pilihan>
            ))}
          </div>
          <GambarBatang
            judul={bd.judul}
            kategori={bd.kategori}
            seri={[
              { nama: bd.kelompok[0], nilai: bd.l, warna: WARNA_SERI[0] },
              { nama: bd.kelompok[1], nilai: bd.p, warna: WARNA_SERI[1] },
            ]}
            langkah={bd.langkah}
            nama={bd.nama}
          />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            1. Selisih {bd.kelompok[0]} dan {bd.kelompok[1]} pada {bd.kategori[bd.target]} adalah …
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan selisih">
            {pilSelisih.opsi.map((n, o) => (
              <button key={n} type="button" aria-label={`Jawab selisih ${n}`} onClick={() => kirim({ t: "G_SELISIH", o })} className={TOMBOL_KECIL}>
                {n}
              </button>
            ))}
          </div>
          {selisihBenar ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">
                2. Dari {bd.kategori[0]} ke {bd.kategori[3]}, batang {bd.kelompok[0]} …
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan tren">
                {pilTren.opsi.map((t, o) => (
                  <button key={t} type="button" aria-label={`Jawab tren ${t}`} onClick={() => kirim({ t: "G_TREN", o })} className={TOMBOL_KECIL}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {trenBenar ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">3. {bd.tujuan} Penyajian yang paling cocok …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan penyajian">
                {pilSaji.opsi.map((t, o) => (
                  <button key={t} type="button" aria-label={`Pilih penyajian ${t}`} onClick={() => kirim({ t: "G_PILIH", o })} className={TOMBOL_KECIL}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("baca");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c2, i) => `${SEBUT[i]}, ${ejaK5B8(c2)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
