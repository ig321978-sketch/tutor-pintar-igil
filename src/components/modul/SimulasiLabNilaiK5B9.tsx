"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B9 } from "./eja-k5b9";
import { TabelTempat } from "./model-nilai-k5b9";
import {
  BILANGAN_A,
  NAMA_TEMPAT,
  OPSI_JUTA,
  awalNilaiK5B9A,
  bilBaca,
  bilNilai,
  bilTabel,
  digitEnam,
  digitSalah,
  idBaca,
  idNilai,
  idSalah,
  idTabel,
  ID_JUTA,
  keadaanNilaiK5B9A,
  langkahNilaiK5B9A,
  opsiKanan,
  opsiKiri,
  opsiNilai,
  opsiTempat,
  titikRibuan,
  ucapBacaK5B9A,
  ucapNilaiK5B9A,
  ucapTabelK5B9A,
  bacaLengkap,
  type KeadaanNilaiK5B9A,
} from "./lab-nilai-k5b9a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B9 Sub-Bab A): Lab Nilai Tempat. Satu alat, tiga tampilan.      */
/*  Baca  : bacaan kelompok kiri lalu kelompok kanan.                          */
/*  Tabel : kata bilangan ditulis ke enam kolom, lalu cari kolom salah teman.  */
/*  Nilai : tempat dan nilai sebuah angka, serta 999.999 + 1 = satu juta.      */
/* Logika: lab-nilai-k5b9a.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Baca, baca dari kiri. Mengapa kelompok sebelum titik diikuti kata ribu?",
  "Di Tabel, isi enam kolom. Mengapa nol tetap ditulis walaupun tidak diucapkan?",
  "Di Nilai, kalikan angka dengan nilai tempatnya. Apa yang terjadi bila 999.999 ditambah 1?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const TOMBOL_KECIL = "min-h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 font-black text-[#1C01A5]";
const OPSI_TOMBOL = "min-h-11 w-full rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left text-sm font-black text-[#1C01A5]";

export default function SimulasiLabNilaiK5B9({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanNilaiK5B9A) => void }) {
  const [x, kirim] = useReducer(langkahNilaiK5B9A, undefined, awalNilaiK5B9A);
  const [lihat, setLihat] = useState<"baca" | "tabel" | "nilai">("baca");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanNilaiK5B9A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "baca" ? ucapBacaK5B9A(x) : lihat === "tabel" ? ucapTabelK5B9A(x) : ucapNilaiK5B9A(x);
  const ba = bilBaca(x);
  const tb = bilTabel(x);
  const ni = bilNilai(x);
  const kiri = opsiKiri(x.baca.data);
  const kanan = opsiKanan(x.baca.data);
  const tempat = opsiTempat(x.nilai.data);
  const nilai = opsiNilai(x.nilai.data);
  const tabelBenar = x.pernah.includes(idTabel(x.tabel.data));
  const salahTeman = digitSalah(x.tabel.data);
  const salahSelesai = x.pernah.includes(idSalah(x.tabel.data));
  const kolomNi = ni.kolomNilai;
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Nilai Tempat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Baca bilangan, isi tabel tempat, dan cari nilai angka.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B9(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "baca"} onKlik={() => pilihTampilan("baca")}>
          📖 Baca
        </Pilihan>
        <Pilihan aktif={lihat === "tabel"} onKlik={() => pilihTampilan("tabel")}>
          🧮 Tabel
        </Pilihan>
        <Pilihan aktif={lihat === "nilai"} onKlik={() => pilihTampilan("nilai")}>
          💎 Nilai
        </Pilihan>
      </div>

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan">
            {BILANGAN_A.map((b, i) => (
              <Pilihan key={b.n} aktif={x.baca.data === i} onKlik={() => kirim({ t: "B_DATA", i })} label={`Pilih bilangan ${b.nama}`}>
                {tanda(idBaca(i))}
                {titikRibuan(b.n)}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{ba.nama}</p>
          <p className="text-center text-3xl font-black text-[#1C01A5]">{titikRibuan(ba.n)}</p>
          <p className="text-center text-sm font-black text-[#1C01A5]">{x.baca.kiri ? "Kelompok kanan: baca tiga angka sesudah titik." : "Kelompok kiri: baca tiga angka sebelum titik, lalu ucapkan ribu."}</p>
          <div className="space-y-2" role="group" aria-label={x.baca.kiri ? "Pilih bacaan kelompok kanan" : "Pilih bacaan kelompok kiri"}>
            {(x.baca.kiri ? kanan : kiri).opsi.map((teks, o) => (
              <button key={teks} type="button" aria-label={`Bacaan ${teks}`} onClick={() => kirim({ t: x.baca.kiri ? "B_KANAN" : "B_KIRI", o })} className={OPSI_TOMBOL}>
                {teks}
              </button>
            ))}
          </div>
          {x.pernah.includes(idBaca(x.baca.data)) ? <p className="text-center text-sm font-black text-[#1C01A5]">{bacaLengkap(ba.n)}</p> : null}
        </div>
      ) : null}

      {lihat === "tabel" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan tabel">
            {BILANGAN_A.map((b, i) => (
              <Pilihan key={b.n} aktif={x.tabel.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Pilih tabel ${b.nama}`}>
                {x.pernah.includes(idSalah(i)) ? "✅✅ " : tanda(idTabel(i))}
                {b.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Tulis bilangan ini ke tabel: {bacaLengkap(tb.n)}</p>
          <TabelTempat digit={x.tabel.d.map((v) => (v < 0 ? null : v))} nama={tb.nama} />
          <div className="mx-auto grid w-full max-w-md grid-cols-6 gap-1" role="group" aria-label="Ubah angka tiap kolom">
            {NAMA_TEMPAT.map((nm, k) => (
              <div key={nm} className="flex flex-col items-center gap-1">
                <button type="button" aria-label={`Naikkan angka ${nm}`} onClick={() => kirim({ t: "T_UBAH", k, delta: 1 })} className={`${TOMBOL_KECIL} min-w-0 w-full px-0`}>
                  ▲
                </button>
                <button type="button" aria-label={`Turunkan angka ${nm}`} onClick={() => kirim({ t: "T_UBAH", k, delta: -1 })} className={`${TOMBOL_KECIL} min-w-0 w-full px-0`}>
                  ▼
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" aria-label="Periksa tabel" onClick={() => kirim({ t: "T_PERIKSA" })} className={TOMBOL_KECIL}>
              Periksa tabel
            </button>
          </div>
          {tabelBenar ? (
            <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
              <p className="text-center text-sm font-black text-[#1C01A5]">Tabel temanmu: ada kolom yang salah. Ketuk kolom yang salah, cocokkan dengan kata bilangan.</p>
              <TabelTempat digit={salahTeman} salah={x.tabel.tunjuk} nama={`teman ${tb.nama}`} />
              <div className="mx-auto grid w-full max-w-md grid-cols-6 gap-1" role="group" aria-label="Tunjuk kolom salah">
                {NAMA_TEMPAT.map((nm, k) => (
                  <button key={nm} type="button" aria-label={`Tunjuk kolom ${nm}`} onClick={() => kirim({ t: "T_TUNJUK", k })} className={`${TOMBOL_KECIL} min-w-0 w-full px-0 text-xs`}>
                    Tunjuk
                  </button>
                ))}
              </div>
              {salahSelesai ? <p className="text-center text-sm font-black text-[#1C01A5]">Yang benar: {titikRibuan(tb.n)} ({digitEnam(tb.n).join(" ")})</p> : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {lihat === "nilai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bilangan nilai">
            {BILANGAN_A.map((b, i) => (
              <Pilihan key={b.n} aktif={x.nilai.data === i} onKlik={() => kirim({ t: "N_DATA", i })} label={`Pilih nilai ${b.nama}`}>
                {tanda(idNilai(i))}
                {titikRibuan(b.n)}
              </Pilihan>
            ))}
          </div>
          <TabelTempat digit={digitEnam(ni.n)} sorot={[kolomNi]} nama={ni.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {x.nilai.tempat ? `Angka ${digitEnam(ni.n)[kolomNi]} yang ditandai bernilai …` : `Angka ${digitEnam(ni.n)[kolomNi]} yang ditandai ada di tempat …`}
          </p>
          <div className="space-y-2" role="group" aria-label={x.nilai.tempat ? "Pilih nilai" : "Pilih tempat"}>
            {x.nilai.tempat
              ? nilai.opsi.map((v, o) => (
                  <button key={v} type="button" aria-label={`Nilai ${titikRibuan(v)}`} onClick={() => kirim({ t: "N_NILAI", o })} className={OPSI_TOMBOL}>
                    {titikRibuan(v)}
                  </button>
                ))
              : tempat.opsi.map((nm, o) => (
                  <button key={nm} type="button" aria-label={`Tempat ${nm}`} onClick={() => kirim({ t: "N_TEMPAT", o })} className={OPSI_TOMBOL}>
                    {nm}
                  </button>
                ))}
          </div>
          <div className="space-y-2 rounded-xl border-2 border-dashed border-[#F0AB00] p-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">{x.pernah.includes(ID_JUTA) ? "✅ " : ""}Batas bab: 999.999</p>
            {x.nilai.tambah ? <TabelTempat digit={[0, 0, 0, 0, 0, 0]} juta nama="satu juta" /> : <TabelTempat digit={[9, 9, 9, 9, 9, 9]} nama="sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan" />}
            <div className="flex justify-center">
              <button type="button" aria-label="Tambah satu pada 999.999" onClick={() => kirim({ t: "N_TAMBAH" })} className={TOMBOL_KECIL}>
                + 1
              </button>
            </div>
            {x.nilai.tambah ? (
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih cara membaca 1.000.000">
                {OPSI_JUTA.map((teks, o) => (
                  <button key={teks} type="button" aria-label={`Bacaan ${teks}`} onClick={() => kirim({ t: "N_JUTA", o })} className={TOMBOL_KECIL}>
                    {teks}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
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

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK5B9(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
