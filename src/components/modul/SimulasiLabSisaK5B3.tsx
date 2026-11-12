"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B3 } from "./eja-k5b3";
import { BatangPecahan } from "./model-banding-k5b3";
import { BatangAmbil } from "./model-sisa-k5b3";
import {
  DATA_BEDA,
  DATA_HASIL,
  DATA_SAMA,
  awalSisaK5B3C,
  dataBeda,
  dataHasil,
  dataSama,
  hasilData,
  keadaanSisaK5B3C,
  langkahSisaK5B3C,
  opsiAtasBeda,
  opsiAtasSama,
  opsiBawahSama,
  opsiBentuk,
  opsiCek,
  opsiKpk,
  sederhana,
  teksPec,
  ubahKe,
  ucapBedaK5B3C,
  ucapHasilK5B3C,
  ucapSamaK5B3C,
  type KeadaanSisaK5B3C,
} from "./lab-sisa-k5b3c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B3 Sub-Bab C): Lab Sisa Arsir. Satu alat, tiga tampilan.        */
/*  Sama  : ambil sebagian bagian, kurangkan pembilang, penyebut tetap.       */
/*  Beda  : cari KPK, haluskan batang, lalu kurangkan pembilang.              */
/*  Hasil : sederhanakan, lalu periksa dengan penjumlahan.                    */
/* Logika: lab-sisa-k5b3c.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Sama, dari dua per tiga ambil satu per tiga. Mengapa penyebutnya tetap?",
  "Di Beda, dari dua per tiga ambil satu per dua. Apa yang terjadi pada kedua batang?",
  "Di Beda, pilih hasil kali kedua penyebut. Mengapa itu belum KPK?",
  "Di Hasil, periksa dengan penjumlahan. Mengapa sisa ditambah yang diambil kembali ke pecahan awal?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabSisaK5B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSisaK5B3C) => void }) {
  const [x, kirim] = useReducer(langkahSisaK5B3C, undefined, awalSisaK5B3C);
  const [lihat, setLihat] = useState<"sama" | "beda" | "hasil">("sama");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSisaK5B3C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "sama" ? ucapSamaK5B3C(x) : lihat === "beda" ? ucapBedaK5B3C(x) : ucapHasilK5B3C(x);
  const s = dataSama(x);
  const bd = dataBeda(x);
  const k = x.beda.k;
  const h = dataHasil(x);
  const hs = hasilData(x.hasil.data);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Sisa Arsir</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bagian yang diambil dari batang menyisakan bagian lain.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "sama"} onKlik={() => pilihTampilan("sama")}>
          🟦 Sama
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
              <Pilihan key={`${teksPec(p.a)}-${teksPec(p.b)}`} aktif={x.sama.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Kurangkan ${teksPec(p.a)} dan ${teksPec(p.b)}`}>
                {teksPec(p.a)} − {teksPec(p.b)}
              </Pilihan>
            ))}
          </div>
          <BatangAmbil q={s.a.q} p={s.a.p} ambil={s.b.p} nama={`${teksPec(s.a)} diambil ${teksPec(s.b)}`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Bagian yang tersisa …</p>
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
              <Pilihan key={`${teksPec(p.a)}-${teksPec(p.b)}`} aktif={x.beda.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Kurangkan ${teksPec(p.a)} dan ${teksPec(p.b)}`}>
                {teksPec(p.a)} − {teksPec(p.b)}
              </Pilihan>
            ))}
          </div>
          {k > 0 ? (
            <BatangAmbil q={k} p={ubahKe(bd.a, k)} ambil={ubahKe(bd.b, k)} nama={`${ubahKe(bd.a, k)}/${k} diambil ${ubahKe(bd.b, k)}/${k}`} />
          ) : (
            <>
              <BatangPecahan p={bd.a.p} q={bd.a.q} nama={teksPec(bd.a)} />
              <BatangPecahan p={bd.b.p} q={bd.b.q} nama={`diambil ${teksPec(bd.b)}`} />
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
              <p className="text-center text-sm font-black text-[#1C01A5]">Hasil pengurangan …</p>
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
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih hasil pengurangan">
            {DATA_HASIL.map((d, i) => (
              <Pilihan key={`${teksPec(d.a)}-${teksPec(d.b)}`} aktif={x.hasil.data === i} onKlik={() => kirim({ t: "H_DATA", i })} label={`Hasil ${teksPec(d.a)} dan ${teksPec(d.b)}`}>
                {teksPec(d.a)} − {teksPec(d.b)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {teksPec(h.a)} − {teksPec(h.b)} = {teksPec(hs)}
          </p>
          <BatangAmbil q={hs.q} p={ubahKe(h.a, hs.q)} ambil={ubahKe(h.b, hs.q)} nama={`${teksPec(h.a)} diambil ${teksPec(h.b)}`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Bentuk paling sederhana …</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan bentuk">
            {opsiBentuk(x.hasil.data).map((t) => (
              <button key={t} type="button" aria-label={`Bentuk ${t}`} onClick={() => kirim({ t: "H_BENTUK", teks: t })} className={TOMBOL_KECIL}>
                {t}
              </button>
            ))}
          </div>
          {x.hasil.bentukOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                Periksa: {teksPec(sederhana(hs))} + {teksPec(h.b)} = …
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan periksa">
                {opsiCek(x.hasil.data).map((t) => (
                  <button key={t} type="button" aria-label={`Periksa ${t}`} onClick={() => kirim({ t: "H_CEK", teks: t })} className={TOMBOL_KECIL}>
                    {t}
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
          setLihat("sama");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B3(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
