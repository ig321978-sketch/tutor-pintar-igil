"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { BIRU, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, eja } from "./komponen-lab";
import {
  AWAL,
  MAKS,
  ORANG,
  PASANGAN,
  batasBanding,
  indeksTerbanyak,
  indeksTersedikit,
  kalimatDua,
  kalimatPaling,
  kalimatPasangan,
  kalimatUrut,
  pasangkan,
  simbol,
  ucapanPasang,
  ucapanTiga,
} from "./lab-banding-bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi "Banding dan Urutan" (Bab 5, Sub-Bab D), metode PhET.             */
/* Jeruk milik Kira, Tika, dan Wei. Dua orang dipasangkan satu-satu dan       */
/* diberi tanda; tiga orang dicari yang paling banyak dan paling sedikit,     */
/* diurutkan, dan ditandai di garis bilangan. Logika di lab-banding-bab5.ts.  */
/* ------------------------------------------------------------------------ */

export type TampilBanding = "pasang" | "tanda" | "benda" | "paling" | "urut" | "garis";
export const SEMUA_TAMPIL_BANDING: TampilBanding[] = ["pasang", "tanda", "benda", "paling", "urut", "garis"];

const LABEL: Record<TampilBanding, string> = {
  pasang: "Pasangkan satu-satu",
  tanda: "Tanda",
  benda: "Benda",
  paling: "Paling banyak dan sedikit",
  urut: "Urutan",
  garis: "Garis bilangan",
};

const WARNA = [MERAH, BIRU, HIJAU];
const INISIAL = ["K", "T", "W"];

/** Langkah selidik "Coba ini!" yang cocok dengan alat yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilBanding[]): string[] {
  const ada = (k: TampilBanding) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("pasang")) hasil.push("Tambah jeruk milik satu orang sampai ia punya sisa yang tidak berpasangan. Siapa yang lebih banyak?");
  if (ada("tanda")) hasil.push("Buat dua jumlah menjadi sama. Tanda apa yang muncul? Lalu tambah satu di salah satunya.");
  if (ada("paling")) hasil.push("Buat dua orang sama banyak dan satu orang berbeda. Lihat siapa saja yang disebut paling banyak.");
  if (ada("urut")) hasil.push("Ubah satu jumlah jeruk. Lihat urutan dari terkecil dan dari terbesar. Apa yang berubah?");
  if (ada("garis")) hasil.push("Lihat letak ketiga titik di garis bilangan. Titik paling kanan milik siapa?");
  return hasil.slice(0, 4);
}

function BarisJeruk({ n, nama }: { n: number; nama: string }) {
  return (
    <div className="grid grid-cols-10 gap-0.5" role="img" aria-label={`${nama} punya ${n} jeruk`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="igil-muncul flex justify-center">
          <BendaSvg jenis="jeruk" kelas="h-6 w-6" />
        </span>
      ))}
    </div>
  );
}

export default function SimulasiBanding({ speakGuru, tampil = SEMUA_TAMPIL_BANDING }: { speakGuru: (t: string) => void; tampil?: TampilBanding[] }) {
  const [jumlah, setJumlah] = useState<number[]>([...AWAL]);
  const [pas, setPas] = useState(0);
  const [lihatMentah, setLihat] = useState<Record<TampilBanding, boolean>>({ pasang: true, tanda: true, benda: true, paling: true, urut: true, garis: true });
  const tersedia = SEMUA_TAMPIL_BANDING.filter((k) => tampil.includes(k));
  const lihat = (k: TampilBanding) => tampil.includes(k) && lihatMentah[k];
  const dua = tampil.includes("pasang") || tampil.includes("tanda");
  const [i, j] = PASANGAN[pas];
  const a = jumlah[i];
  const b = jumlah[j];
  const coba = langkahCoba(tampil);
  const terbanyak = indeksTerbanyak(jumlah);
  const tersedikit = indeksTersedikit(jumlah);
  const semuaSama = terbanyak.length === jumlah.length;

  const ubah = (k: number, delta: number) => setJumlah((x) => x.map((v, idx) => (idx === k ? batasBanding(v + delta) : v)));
  const reset = () => {
    setJumlah([...AWAL]);
    setPas(0);
    setLihat({ pasang: true, tanda: true, benda: true, paling: true, urut: true, garis: true });
  };

  const ucapan = dua
    ? ucapanPasang(jumlah, [i, j], { pasangan: lihat("pasang"), tanda: lihat("tanda") })
    : ucapanTiga(jumlah, { paling: lihat("paling"), urut: lihat("urut") });

  const p = pasangkan(a, b);
  const kolom = Math.max(a, b);

  const pengatur = (k: number) => (
    <Pengatur
      key={k}
      nama={`Jeruk ${ORANG[k]}`}
      nilai={jumlah[k]}
      warna={k === 0 ? "#FEE2E2" : k === 1 ? "#DBEAFE" : "#DCFCE7"}
      onKurang={() => ubah(k, -1)}
      onTambah={() => ubah(k, 1)}
      kurangMati={jumlah[k] <= 0}
      tambahMati={jumlah[k] >= MAKS}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{dua ? "Banding Dua Kelompok" : "Paling Banyak dan Urutan"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {dua ? "Pilih dua anak. Ubah jeruknya, lalu lihat siapa yang lebih banyak." : "Ubah jeruk ketiga anak. Cari yang paling banyak dan paling sedikit."}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan perbandingan ini" onClick={() => speakGuru(eja(ucapan !== "" ? ucapan : "Ubah jumlah jeruk, lalu lihat perbandingannya."))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        {dua ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih dua anak">
              {PASANGAN.map(([x, y], k) => (
                <Pilihan key={k} aktif={pas === k} onKlik={() => setPas(k)}>
                  {ORANG[x]} dan {ORANG[y]}
                </Pilihan>
              ))}
            </div>
            {pengatur(i)}
            {pengatur(j)}
          </>
        ) : (
          <>
            {pengatur(0)}
            {pengatur(1)}
            {pengatur(2)}
          </>
        )}
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          {tersedia.length > 1
            ? tersedia.map((k) => (
                <Cek key={k} aktif={lihatMentah[k]} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
                  {LABEL[k]}
                </Cek>
              ))
            : null}
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      {lihat("pasang") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            Pasangkan satu-satu • {ORANG[i]} di atas, {ORANG[j]} di bawah
          </p>
          <div className="grid grid-cols-10 gap-x-0.5 gap-y-1" role="img" aria-label={`${ORANG[i]} ${a} jeruk, ${ORANG[j]} ${b} jeruk. ${p.berpasangan} berpasangan, sisa ${p.sisa}`}>
            {Array.from({ length: kolom }, (_, k) => {
              const adaA = k < a;
              const adaB = k < b;
              const sisa = adaA !== adaB;
              return (
                <span key={k} className={`igil-muncul flex flex-col items-center gap-0.5 rounded-lg py-0.5 ${sisa ? "border-2 border-[#F0AB00] bg-[#FFF7CC]" : "border-2 border-transparent"}`}>
                  <span className="flex h-6 w-6 items-center justify-center">{adaA ? <BendaSvg jenis="jeruk" kelas="h-6 w-6" /> : <span className="h-5 w-5 rounded-full border-2 border-dashed border-[#1C01A5]/20" />}</span>
                  <span className="flex h-6 w-6 items-center justify-center">{adaB ? <BendaSvg jenis="jeruk" kelas="h-6 w-6" /> : <span className="h-5 w-5 rounded-full border-2 border-dashed border-[#1C01A5]/20" />}</span>
                </span>
              );
            })}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatPasangan(ORANG[i], a, ORANG[j], b)}</p>
        </div>
      ) : null}

      {lihat("tanda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tanda perbandingan</p>
          <KalimatBesar teks={`${a} ${simbol(a, b)} ${b}`} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatDua(ORANG[i], a, ORANG[j], b)}</p>
        </div>
      ) : null}

      {lihat("benda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Jeruk ketiga anak</p>
          {ORANG.map((nama, k) => (
            <div key={nama} className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-2 py-1.5">
              <p className="mb-1 text-sm font-black text-[#1C01A5]">
                {nama}: {jumlah[k]}
              </p>
              {jumlah[k] > 0 ? <BarisJeruk n={jumlah[k]} nama={nama} /> : <p className="text-xs font-bold text-[#1C01A5]/50">belum punya jeruk</p>}
            </div>
          ))}
        </div>
      ) : null}

      {lihat("paling") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Paling banyak dan paling sedikit</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {ORANG.map((nama, k) => {
              const banyak = !semuaSama && terbanyak.includes(k);
              const sedikit = !semuaSama && tersedikit.includes(k);
              return (
                <div key={nama} className={`rounded-xl border-4 py-2 ${banyak ? "border-[#F0AB00] bg-[#FFF7CC]" : sedikit ? "border-[#3B82F6] bg-[#DBEAFE]" : "border-[#1C01A5]/20 bg-white"}`}>
                  <p className="text-xs font-black text-[#1C01A5]">{nama}</p>
                  <p className="text-3xl font-black text-[#1C01A5]">{jumlah[k]}</p>
                  <p className="text-[10px] font-black uppercase text-[#1C01A5]/70">{banyak ? "paling banyak" : sedikit ? "paling sedikit" : "di tengah"}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatPaling(jumlah)}</p>
        </div>
      ) : null}

      {lihat("urut") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Urutan bilangan</p>
          <KalimatBesar teks={jumlah.slice().sort((x, y) => x - y).join(", ")} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatUrut(jumlah, true)}</p>
          <KalimatBesar teks={jumlah.slice().sort((x, y) => y - x).join(", ")} warna="bg-[#DBEAFE]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatUrut(jumlah, false)}</p>
        </div>
      ) : null}

      {lihat("garis") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan 0 sampai 20</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan 0 sampai 20: ${ORANG.map((nama, k) => `${nama} ${jumlah[k]}`).join(", ")}`}
            penanda={(dua ? [i, j] : [0, 1, 2]).map((k) => ({ n: jumlah[k], warna: WARNA[k], teks: INISIAL[k] }))}
          />
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">K: Kira. T: Tika. W: Wei. Makin ke kanan, makin besar.</p>
        </div>
      ) : null}

      {coba.length > 0 ? (
        <CobaIni
          judul="Coba ini!"
          onDengar={() => speakGuru(eja(`Coba ini. ${coba.map((c, k) => `${["Satu", "Dua", "Tiga", "Empat"][k]}, ${c}`).join(" ")}`))}
          langkah={coba}
        />
      ) : null}
    </div>
  );
}
