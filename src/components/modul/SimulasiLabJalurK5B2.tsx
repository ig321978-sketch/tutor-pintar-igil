"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK5B1 } from "./eja-k5b1";
import { JalurGanda, KartuAngka } from "./model-jalur-k5b2";
import {
  DATA_IRISAN,
  DATA_JADWAL,
  DATA_JALUR,
  MAKS_JALUR,
  awalJalurK5B2B,
  dataJadwal,
  daftarIrisan,
  jarakJalur,
  keadaanJalurK5B2B,
  langkahJalurK5B2B,
  opsiHari,
  opsiKpkIrisan,
  opsiTanggal,
  pasanganIrisan,
  pendaratanJalur,
  sejajarJalur,
  ucapIrisanK5B2B,
  ucapJadwalK5B2B,
  ucapJalurK5B2B,
  type KeadaanJalurK5B2B,
} from "./lab-jalur-k5b2b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K5B2 Sub-Bab B): Lab Dua Jalur. Satu alat, tiga tampilan.        */
/*  Jalur  : dua pelompat berjarak berbeda, cari pendaratan yang sama.       */
/*  Irisan : tandai bilangan di kedua daftar, pilih yang terkecil.           */
/*  Jadwal : lama hari sampai bertemu lagi, lalu tanggalnya.                 */
/* Logika: lab-jalur-k5b2b.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Jalur, lompatkan pelompat pertama berkali-kali saja. Apakah kedua pelompat bertemu?",
  "Di Jalur, setelah bertemu, teruskan melompat. Apa arti pendaratan bersama yang berikutnya?",
  "Di Irisan, tandai semua bilangan yang ada di kedua daftar. Mana yang kamu pilih, dan mengapa?",
  "Di Jadwal, pilih dua kali lama hari. Mengapa itu bukan pertemuan berikutnya?",
];
const SEBUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";

export default function SimulasiLabJalurK5B2({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJalurK5B2B) => void }) {
  const [x, kirim] = useReducer(langkahJalurK5B2B, undefined, awalJalurK5B2B);
  const [lihat, setLihat] = useState<"jalur" | "irisan" | "jadwal">("jalur");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanJalurK5B2B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "jalur" ? ucapJalurK5B2B(x) : lihat === "irisan" ? ucapIrisanK5B2B(x) : ucapJadwalK5B2B(x);
  const [ja, jb] = jarakJalur(x);
  const lompat = pendaratanJalur(x);
  const sejajar = sejajarJalur(x);
  const [ia, ib] = pasanganIrisan(x);
  const daftar = daftarIrisan(x);
  const d = dataJadwal(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Dua Jalur</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Cari kelipatan yang sama dari dua bilangan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK5B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "jalur"} onKlik={() => pilihTampilan("jalur")}>
          🛤️ Jalur
        </Pilihan>
        <Pilihan aktif={lihat === "irisan"} onKlik={() => pilihTampilan("irisan")}>
          🔀 Irisan
        </Pilihan>
        <Pilihan aktif={lihat === "jadwal"} onKlik={() => pilihTampilan("jadwal")}>
          🗓️ Jadwal
        </Pilihan>
      </div>

      {lihat === "jalur" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan jarak">
            {DATA_JALUR.map(([p, q], i) => (
              <Pilihan key={`${p}-${q}`} aktif={x.jalur.data === i} onKlik={() => kirim({ t: "J_DATA", i })} label={`Jarak ${p} dan ${q}`}>
                {p} dan {q}
              </Pilihan>
            ))}
          </div>
          <JalurGanda a={ja} b={jb} daftarA={lompat.a} daftarB={lompat.b} maks={Math.max(ja, jb) * MAKS_JALUR} />
          <div className="space-y-1.5" aria-live="polite" aria-label="Pendaratan">
            <div className="flex min-h-8 flex-wrap items-center gap-1">
              <span className="text-xs font-black text-[#1C01A5]">Pelompat {ja}:</span>
              {lompat.a.map((v) => (
                <KartuAngka key={v} n={v} tandai={sejajar.includes(v)} />
              ))}
            </div>
            <div className="flex min-h-8 flex-wrap items-center gap-1">
              <span className="text-xs font-black text-[#1C01A5]">Pelompat {jb}:</span>
              {lompat.b.map((v) => (
                <KartuAngka key={v} n={v} tandai={sejajar.includes(v)} warna="#C4B5FD" />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" aria-label={`Lompat pelompat ${ja}`} onClick={() => kirim({ t: "J_A" })} className={TOMBOL_KECIL}>
              🦘 Lompat {ja}
            </button>
            <button type="button" aria-label={`Lompat pelompat ${jb}`} onClick={() => kirim({ t: "J_B" })} className={TOMBOL_KECIL}>
              🦘 Lompat {jb}
            </button>
            <button type="button" aria-label="Mulai lagi dari nol" onClick={() => kirim({ t: "J_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Mulai lagi
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "irisan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan bilangan">
            {DATA_IRISAN.map(([p, q], i) => (
              <Pilihan key={`${p}-${q}`} aktif={x.irisan.data === i} onKlik={() => kirim({ t: "I_DATA", i })} label={`Daftar kelipatan ${p} dan ${q}`}>
                {p} dan {q}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk bilangan yang ada di kedua daftar. Ketuk lagi untuk melepas tanda.</p>
          <div className="space-y-2" role="group" aria-label="Dua daftar kelipatan">
            {[
              { d: ia, isi: daftar.a, warna: "#FFE566" },
              { d: ib, isi: daftar.b, warna: "#C4B5FD" },
            ].map((baris) => (
              <div key={baris.d} className="flex flex-wrap items-center gap-1">
                <span className="w-full text-xs font-black text-[#1C01A5]">Kelipatan {baris.d}</span>
                {baris.isi.map((v) => (
                  <KartuAngka key={v} n={v} tandai={x.irisan.tanda.includes(v)} onKlik={() => kirim({ t: "I_KLIK", n: v })} label={`Tandai ${v} di daftar ${baris.d}`} warna={baris.warna} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Bersihkan tanda" onClick={() => kirim({ t: "I_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Bersihkan
            </button>
            <button type="button" aria-label="Periksa tanda" onClick={() => kirim({ t: "I_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
          {x.irisan.tandaOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Yang terkecil di antara bilangan yang ditandai …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan yang terkecil">
                {opsiKpkIrisan(x.irisan.data).map((v) => (
                  <button key={v} type="button" aria-label={`Terkecil ${v}`} onClick={() => kirim({ t: "I_KPK", nilai: v })} className={TOMBOL_KECIL}>
                    {v}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {lihat === "jadwal" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih pasangan tokoh">
            {DATA_JADWAL.map((j, i) => (
              <Pilihan key={j.namaA} aktif={x.jadwal.data === i} onKlik={() => kirim({ t: "D_DATA", i })} label={`${j.namaA} dan ${j.namaB}`}>
                {j.namaA} dan {j.namaB}
              </Pilihan>
            ))}
          </div>
          <p className="rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8DC] p-2 text-center text-sm font-black text-[#1C01A5]">
            {d.namaA} {d.kegiatan} tiap {d.a} hari. {d.namaB} tiap {d.b} hari. Pertama kali mereka bertemu pada {d.awal} Agustus.
          </p>
          <p className="text-center text-sm font-black text-[#1C01A5]">Mereka bertemu lagi setelah … hari</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan lama hari">
            {opsiHari(x.jadwal.data).map((v) => (
              <button key={v} type="button" aria-label={`Hari ${v}`} onClick={() => kirim({ t: "D_HARI", nilai: v })} className={TOMBOL_KECIL}>
                {v} hari
              </button>
            ))}
          </div>
          {x.jadwal.hariOk ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">Mereka bertemu lagi pada tanggal …</p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilihan tanggal">
                {opsiTanggal(x.jadwal.data).map((v) => (
                  <button key={v} type="button" aria-label={`Tanggal ${v} Agustus`} onClick={() => kirim({ t: "D_TANGGAL", nilai: v })} className={TOMBOL_KECIL}>
                    {v} Agustus
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
          setLihat("jalur");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((t, i) => `${SEBUT[i]}, ${ejaK5B1(t)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
