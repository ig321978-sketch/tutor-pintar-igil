"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { Pengatur } from "./komponen-lab";
import {
  GAYA_BAWAAN,
  GESER_TAK_SEJAJAR,
  MAKS_PANJANG,
  MIN_PANJANG,
  PANJANG_AWAL,
  PITA,
  bandingDua,
  kalimatPaling,
  pilihPita,
  ubahPanjang,
  ucapanBanding,
  ucapanDua,
  urutanTampil,
  type Gaya,
} from "./lab-banding-panjang-bab7";

/* ------------------------------------------------------------------------ */
/* Laboratorium Bandingkan Panjang (Bab 7), metode PhET.                      */
/* Pita atau pensil: atur, sejajarkan, urutkan, bandingkan. Sub-Bab A memakai */
/* gaya tanpa angka (hanya mata: lebih, paling), Sub-Bab B memakai gaya       */
/* berangka (hasil ukur dalam kotak). Logika di lab-banding-panjang-bab7.ts.  */
/* Tanpa jaringan.                                                            */
/* ------------------------------------------------------------------------ */

export type TampilPanjang = "sejajar" | "urut" | "paling" | "dua";
export const SEMUA_TAMPIL_PANJANG: TampilPanjang[] = ["sejajar", "urut", "paling", "dua"];

const SATUAN_PX = 26;
const GESER_PX = 10;
const X0 = 54;
const BARIS = 40;

function langkahCoba(tampil: TampilPanjang[], jumlah: number, gaya: Gaya): string[] {
  const ada = (k: TampilPanjang) => tampil.includes(k);
  const b = gaya.benda;
  const hasil: string[] = [];
  if (ada("sejajar")) hasil.push(`Lihat ${b} sebelum disejajarkan. ${kapital(b)} mana yang kamu kira paling panjang?`);
  if (ada("sejajar")) hasil.push(`Nyalakan Sejajarkan ujung kiri. Apakah kamu masih memilih ${b} yang sama?`);
  if (ada("dua")) hasil.push(gaya.angka ? `Ketuk dua ${b}. Berapa ${gaya.satuan} bedanya?` : `Ketuk dua ${b}. Mana yang lebih panjang dan mana yang lebih pendek?`);
  if (jumlah > 2 && ada("paling")) hasil.push(`Ubah panjang satu ${b}. Siapa yang sekarang paling panjang dan paling pendek?`);
  if (ada("urut")) hasil.push("Nyalakan Urutkan dari terpendek. Siapa yang pertama dan siapa yang terakhir?");
  return hasil.slice(0, 4);
}

const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SimulasiBandingPanjang({
  speakGuru,
  tampil = SEMUA_TAMPIL_PANJANG,
  jumlah = 4,
  gaya = GAYA_BAWAAN,
  awal = PANJANG_AWAL,
  judul,
}: {
  speakGuru: (t: string) => void;
  tampil?: TampilPanjang[];
  jumlah?: number;
  gaya?: Gaya;
  awal?: number[];
  judul?: string;
}) {
  const awalPas = awal.slice(0, jumlah);
  const [panjang, setPanjang] = useState<number[]>(awalPas);
  const [sejajar, setSejajar] = useState(false);
  const [urut, setUrut] = useState(false);
  const [dipilih, setDipilih] = useState<number[]>([]);

  const ada = (k: TampilPanjang) => tampil.includes(k);
  const urutan = urutanTampil(panjang, ada("urut") && urut);
  const B = kapital(gaya.benda);
  const coba = langkahCoba(tampil, jumlah, gaya);
  const reset = () => {
    setPanjang(awalPas);
    setSejajar(false);
    setUrut(false);
    setDipilih([]);
  };
  const ucapan = jumlah === 2 ? ucapanDua(panjang, sejajar, dipilih, gaya) : ucapanBanding(panjang, ada("urut") && urut, sejajar, gaya);
  const kotak = gaya.satuan === "kotak";
  const tinggiSvg = urutan.length * BARIS + 8;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{judul ?? "Laboratorium Bandingkan Panjang"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {gaya.angka ? `Atur panjang ${gaya.benda} dalam ${gaya.satuan}. Sejajarkan, urutkan, lalu bandingkan.` : `Ubah panjang ${gaya.benda}. Sejajarkan ujungnya, lalu bandingkan dengan mata.`}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan perbandingan ini" onClick={() => speakGuru(ucapan)} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <svg viewBox={`0 0 380 ${tinggiSvg}`} className="mx-auto block w-full max-w-[460px] rounded-2xl bg-[#F5F3FF]" role="group" aria-label={`${jumlah} ${gaya.benda}`}>
          {kotak
            ? Array.from({ length: MAKS_PANJANG + 4 }, (_, k) => <line key={`v${k}`} x1={X0 + k * SATUAN_PX} y1="0" x2={X0 + k * SATUAN_PX} y2={tinggiSvg} stroke="#C4B5FD" strokeWidth="1" opacity="0.6" />)
            : null}
          {sejajar ? <line x1={X0} y1="2" x2={X0} y2={tinggiSvg - 2} stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" /> : null}
          {urutan.map((i, baris) => {
            const geser = sejajar ? 0 : GESER_TAK_SEJAJAR[i] * GESER_PX;
            const terpilih = dipilih.includes(i);
            const y = 6 + baris * BARIS;
            const label = gaya.angka ? `${B} ${PITA[i].nama}, ${panjang[i]} ${gaya.satuan}` : `${B} ${PITA[i].nama}`;
            return (
              <g
                key={PITA[i].nama}
                role="button"
                tabIndex={0}
                aria-label={`${label}${terpilih ? ", dipilih" : ""}`}
                aria-pressed={terpilih}
                className="cursor-pointer"
                onClick={() => setDipilih(pilihPita(dipilih, i))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDipilih(pilihPita(dipilih, i));
                  }
                }}
              >
                <rect x="0" y={y - 2} width="380" height={BARIS - 4} fill="transparent" />
                <text x="4" y={y + 20} fontSize="13" fontWeight="900" fill="#1C01A5">
                  {PITA[i].nama}
                </text>
                {gaya.angka ? (
                  Array.from({ length: panjang[i] }, (_, k) => (
                    <rect key={k} x={X0 + geser + k * SATUAN_PX} y={y} width={SATUAN_PX} height="28" rx="4" fill={PITA[i].warna} stroke={terpilih ? "#1C01A5" : "#FFFFFF"} strokeWidth={terpilih ? 3 : 2} />
                  ))
                ) : (
                  <rect x={X0 + geser} y={y} width={panjang[i] * SATUAN_PX} height="28" rx="8" fill={PITA[i].warna} stroke={terpilih ? "#1C01A5" : "#FFFFFF"} strokeWidth={terpilih ? 3 : 2} />
                )}
                {gaya.angka ? (
                  <text x={X0 + geser + panjang[i] * SATUAN_PX + 6} y={y + 20} fontSize="14" fontWeight="900" fill="#1C01A5">
                    {panjang[i]}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {ada("sejajar") ? (
            <Cek aktif={sejajar} onKlik={() => setSejajar((x) => !x)}>
              Sejajarkan ujung kiri
            </Cek>
          ) : null}
          {ada("urut") ? (
            <Cek aktif={urut} onKlik={() => setUrut((x) => !x)}>
              Urutkan dari terpendek
            </Cek>
          ) : null}
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
        {ada("sejajar") && !sejajar ? (
          <p role="status" className="rounded-xl bg-[#FFF7CC] px-3 py-1 text-center text-xs font-black text-[#1C01A5]">
            Ujung kiri {gaya.benda} belum sejajar, jadi mata mudah tertipu. Nyalakan Sejajarkan ujung kiri supaya adil.
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{gaya.angka ? `Atur panjang ${gaya.benda} (${gaya.satuan})` : `Ubah panjang ${gaya.benda}`}</p>
        <div className="grid grid-cols-1 gap-1.5 min-[480px]:grid-cols-2">
          {PITA.slice(0, jumlah).map((p, i) => (
            <Pengatur
              key={p.nama}
              nama={`${B} ${p.nama}`}
              nilai={gaya.angka ? panjang[i] : ""}
              onKurang={() => setPanjang(ubahPanjang(panjang, i, -1))}
              onTambah={() => setPanjang(ubahPanjang(panjang, i, 1))}
              kurangMati={panjang[i] <= MIN_PANJANG}
              tambahMati={panjang[i] >= MAKS_PANJANG}
              kurangLabel={gaya.angka ? `Kurangi panjang ${gaya.benda} ${p.nama}` : `Pendekkan ${gaya.benda} ${p.nama}`}
              tambahLabel={gaya.angka ? `Tambah panjang ${gaya.benda} ${p.nama}` : `Panjangkan ${gaya.benda} ${p.nama}`}
            />
          ))}
        </div>
      </div>

      {ada("paling") || ada("dua") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Hasil perbandingan</p>
          {ada("paling") ? <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">{kalimatPaling(panjang, gaya)}</p> : null}
          {ada("dua") ? (
            <p className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]" aria-live="polite">
              {dipilih.length === 2 ? bandingDua(panjang, dipilih[0], dipilih[1], gaya) : `Ketuk ${jumlah === 2 ? "kedua" : "dua"} ${gaya.benda} untuk membandingkan ${jumlah === 2 ? "keduanya" : "keduanya"}.`}
            </p>
          ) : null}
        </div>
      ) : null}

      {coba.length > 0 ? (
        <CobaIni
          judul="Coba ini!"
          onDengar={() => speakGuru(`Coba ini. ${coba.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${c}`).join(" ")}`)}
          langkah={coba}
        />
      ) : null}
    </div>
  );
}
