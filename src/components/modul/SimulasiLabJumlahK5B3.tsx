"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B3 } from "./eja-k5b3";
import { BatangPecahan } from "./model-banding-k5b3";
import { BatangBulat, BatangDua } from "./model-jumlah-k5b3";
import {
  DATA_BEDA,
  DATA_HASIL,
  DATA_SAMA,
  awalJumlahK5B3B,
  bentukBenar,
  campuranDari,
  dataBeda,
  dataHasil,
  dataSama,
  hasilData,
  keadaanJumlahK5B3B,
  langkahJumlahK5B3B,
  opsiAtasBeda,
  opsiAtasSama,
  opsiBawahSama,
  opsiBentuk,
  opsiKpk,
  sederhana,
  teksPec,
  ubahKe,
  ucapBedaK5B3B,
  ucapHasilK5B3B,
  ucapSamaK5B3B,
  type KeadaanJumlahK5B3B,
} from "./lab-jumlah-k5b3b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B3 Sub-Bab B): Lab Jumlah Arsir. Satu alat, tiga tampilan.     */
/*  Sama  : dua arsir pada penyebut yang sama, pembilang dijumlahkan.         */
/*  Beda  : cari KPK, haluskan batang, lalu jumlahkan pembilang.              */
/*  Hasil : sederhanakan hasil atau ubah menjadi campuran.                    */
/* Logika: lab-jumlah-k5b3b.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Sama, jumlahkan satu per delapan dan dua per delapan. Mengapa penyebutnya tetap?",
  "Di Beda, jumlahkan satu per dua dan satu per tiga. Apa yang terjadi pada kedua batang?",
  "Di Beda, pilih hasil kali kedua penyebut. Mengapa itu belum KPK?",
  "Di Hasil, ubah tujuh per lima menjadi campuran. Berapa bulat penuhnya?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabJumlahK5B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJumlahK5B3B) => void }) {
  const [x, kirim] = useReducer(langkahJumlahK5B3B, undefined, awalJumlahK5B3B);
  const [lihat, setLihat] = useState<"sama" | "beda" | "hasil">("sama");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanJumlahK5B3B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "sama" ? ucapSamaK5B3B(x) : lihat === "beda" ? ucapBedaK5B3B(x) : ucapHasilK5B3B(x);
  const s = dataSama(x);
  const bd = dataBeda(x);
  const k = x.beda.k;
  const h = dataHasil(x);
  const hs = hasilData(x.hasil.data);
  const ch = campuranDari(hs);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Jumlah Arsir</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Arsiran digabung pada batang dengan bagian sama besar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "sama"} onKlik={() => pilihTampilan("sama")}>
          🟨 Sama
        </Pilihan>
        <Pilihan aktif={lihat === "beda"} onKlik={() => pilihTampilan("beda")}>
          🧩 Beda
        </Pilihan>
        <Pilihan aktif={lihat === "hasil"} onKlik={() => pilihTampilan("hasil")}>
          ✂️ Hasil
        </Pilihan>
      </div>

      {lihat === "sama" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan pecahan">
            {DATA_SAMA.map((p, i) => (
              <Pilihan key={`${teksPec(p.a)}-${teksPec(p.b)}`} aktif={x.sama.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Jumlahkan ${teksPec(p.a)} dan ${teksPec(p.b)}`}>
                {teksPec(p.a)} + {teksPec(p.b)}
              </Pilihan>
            ))}
          </div>
          <BatangDua q={s.a.q} p1={s.a.p} p2={s.b.p} nama={`${teksPec(s.a)} + ${teksPec(s.b)}`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Bagian terarsir seluruhnya …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan pembilang">
            {opsiAtasSama(x.sama.data).map((v) => (
              <button key={v} type="button" aria-label={`Pembilang ${v}`} onClick={() => kirim({ t: "S_ATAS", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          {x.sama.atasOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Penyebutnya …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan penyebut">
                {opsiBawahSama(x.sama.data).map((v) => (
                  <button key={v} type="button" aria-label={`Penyebut ${v}`} onClick={() => kirim({ t: "S_BAWAH", nilai: v })} className={TOMBOL_KECIL}>
                    {v}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "beda" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan pecahan">
            {DATA_BEDA.map((p, i) => (
              <Pilihan key={`${teksPec(p.a)}-${teksPec(p.b)}`} aktif={x.beda.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Jumlahkan ${teksPec(p.a)} dan ${teksPec(p.b)}`}>
                {teksPec(p.a)} + {teksPec(p.b)}
              </Pilihan>
            ))}
          </div>
          {k > 0 ? (
            <BatangDua q={k} p1={ubahKe(bd.a, k)} p2={ubahKe(bd.b, k)} nama={`${ubahKe(bd.a, k)}/${k} + ${ubahKe(bd.b, k)}/${k}`} />
          ) : (
            <>
              <BatangPecahan p={bd.a.p} q={bd.a.q} nama={teksPec(bd.a)} />
              <BatangPecahan p={bd.b.p} q={bd.b.q} nama={teksPec(bd.b)} />
            </>
          )}
          <p className="text-center text-sm font-black text-[#1C01A5]">KPK dari {bd.a.q} dan {bd.b.q} …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan KPK">
            {opsiKpk(x.beda.data).map((v) => (
              <button key={v} type="button" aria-label={`KPK ${v}`} onClick={() => kirim({ t: "B_KPK", nilai: v })} className={TOMBOL_KECIL}>
                {v}
              </button>
            ))}
          </div>
          {k > 0 ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Hasil penjumlahan …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan hasil">
                {opsiAtasBeda(x.beda.data).map((v) => (
                  <button key={v} type="button" aria-label={`Hasil ${v} per ${k}`} onClick={() => kirim({ t: "B_ATAS", nilai: v })} className={TOMBOL_KECIL}>
                    {v}/{k}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "hasil" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih hasil penjumlahan">
            {DATA_HASIL.map((d, i) => (
              <Pilihan key={`${teksPec(d.a)}-${teksPec(d.b)}`} aktif={x.hasil.data === i} onKlik={() => kirim({ t: "H_DATA", i })} label={`Hasil ${teksPec(d.a)} dan ${teksPec(d.b)}`}>
                {teksPec(d.a)} + {teksPec(d.b)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {teksPec(h.a)} + {teksPec(h.b)} = {teksPec(hs)}
          </p>
          {h.jenis === "campuran" ? <BatangBulat b={ch.b} p={ch.p} q={ch.q} /> : <BatangPecahan p={hs.p} q={hs.q} nama={teksPec(hs)} />}
          <p className="text-center text-sm font-black text-[#1C01A5]">{h.jenis === "sederhana" ? "Bentuk paling sederhana …" : "Bentuk campuran …"}</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan bentuk">
            {opsiBentuk(x.hasil.data).map((t) => (
              <button key={t} type="button" aria-label={`Bentuk ${t}`} onClick={() => kirim({ t: "H_BENTUK", teks: t })} className={TOMBOL_KECIL}>
                {t}
              </button>
            ))}
          </div>
          {h.jenis === "sederhana" && x.pernah.includes(`hasil:${x.hasil.data}`) ? <BatangPecahan p={sederhana(hs).p} q={sederhana(hs).q} nama={bentukBenar(x.hasil.data)} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("sama");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B3(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
