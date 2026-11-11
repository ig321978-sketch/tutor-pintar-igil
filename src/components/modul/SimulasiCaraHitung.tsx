"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { BIRU, BaganPasangan, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import {
  AWAL_A,
  AWAL_B,
  MAKS,
  batasOperan,
  catatanSusun,
  hasilCara,
  hasilKolom,
  kalimatCara,
  rapikan,
  rencanaGaris,
  ucapanCara,
  urai,
  type Cara,
  type Op,
} from "./lab-cara-k2b2";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (K2B2): Laboratorium Cara Hitung — PhET.                        */
/* Satu model a,b,op → garis, pasangan, bersusun. Logika lab-cara-k2b2.ts.    */
/* ------------------------------------------------------------------------ */

export default function SimulasiCaraHitung({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [op, setOp] = useState<Op>("tambah");
  const [p, setP] = useState<Cara>({ a: AWAL_A, b: AWAL_B });
  const [lihatGaris, setLihatGaris] = useState(true);
  const [lihatPasangan, setLihatPasangan] = useState(true);
  const [lihatSusun, setLihatSusun] = useState(true);

  const hops = rencanaGaris(p, op);
  const hasil = hasilCara(p, op);
  const cat = catatanSusun(p, op);
  const A = urai(p.a);
  const B = urai(p.b);
  const H = hasilKolom(p, op);
  const warna = op === "tambah" ? BIRU : MERAH;

  const gantiOp = (o: Op) => {
    setOp(o);
    setP(rapikan(p, o));
  };

  const resetSemua = () => {
    setOp("tambah");
    setP({ a: AWAL_A, b: AWAL_B });
    setLihatGaris(true);
    setLihatPasangan(true);
    setLihatSusun(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Cara Hitung</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Satu hitungan, tiga cara. Lihat garis, pasangan, dan bersusun berubah bersama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan hitungan ini" onClick={() => speakGuru(ejaHitung(ucapanCara(p, op)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih operasi">
          <Pilihan aktif={op === "tambah"} onKlik={() => gantiOp("tambah")}>
            Tambah
          </Pilihan>
          <Pilihan aktif={op === "kurang"} onKlik={() => gantiOp("kurang")}>
            Kurang
          </Pilihan>
        </div>
        <Pengatur
          nama="Bilangan pertama"
          nilai={p.a}
          onKurang={() => setP(rapikan({ a: p.a - 1, b: p.b }, op))}
          onTambah={() => setP(rapikan({ a: p.a + 1, b: p.b }, op))}
          kurangMati={p.a <= 0}
          tambahMati={p.a >= MAKS}
        />
        <Pengatur
          nama="Bilangan kedua"
          nilai={p.b}
          warna="#DBEAFE"
          onKurang={() => setP(rapikan({ a: p.a, b: p.b - 1 }, op))}
          onTambah={() => setP(rapikan({ a: p.a, b: p.b + 1 }, op))}
          kurangMati={p.b <= 0}
          tambahMati={p.b >= batasOperan(p.a, op)}
        />
        <KalimatBesar teks={kalimatCara(p, op)} warna="bg-[#FFE566]" />
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={lihatGaris} onKlik={() => setLihatGaris((x) => !x)}>
            Garis
          </Cek>
          <Cek aktif={lihatPasangan} onKlik={() => setLihatPasangan((x) => !x)}>
            Pasangan
          </Cek>
          <Cek aktif={lihatSusun} onKlik={() => setLihatSusun((x) => !x)}>
            Bersusun
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      {lihatGaris ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            {op === "tambah" ? "Menghitung maju" : "Menghitung mundur"} • {hops.length} lompatan
          </p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan ${kalimatCara(p, op)}`}
            sorot={[10, p.a, hasil]}
            penanda={[
              { n: p.a, warna: MERAH },
              { n: hasil, warna: HIJAU },
            ]}
            lompatan={hops.map((h) => ({ dari: h.dari, ke: h.ke, warna, label: h.label }))}
          />
        </div>
      ) : null}

      {lihatPasangan ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pasangan bilangan</p>
          {op === "tambah" ? (
            <BaganPasangan total={hasil} a={p.a} b={p.b} tanda="+" />
          ) : (
            <BaganPasangan total={p.a} a={hasil} b={p.b} tanda="−" />
          )}
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {op === "tambah" ? `${hasil} terdiri dari ${p.a} dan ${p.b}` : `${p.a} dipecah menjadi ${hasil} dan ${p.b}`}
          </p>
        </div>
      ) : null}

      {lihatSusun ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bersusun (nilai tempat)</p>
          <div className="mx-auto grid w-full max-w-[240px] grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Bersusun nilai tempat">
            <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-sm font-black text-[#7F1D1D]">
              Puluhan
            </p>
            <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-sm font-black text-[#1E3A8A]">
              Satuan
            </p>
            <p role="cell" className="border-t-4 border-[#1C01A5] py-1 text-center text-2xl font-black text-blue-700">
              {A.puluhan || ""}
            </p>
            <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-1 text-center text-2xl font-black text-blue-700">
              {A.satuan}
            </p>
            <p role="cell" className="border-t-2 border-[#1C01A5]/40 py-1 text-center text-2xl font-black text-blue-700">
              {op === "tambah" ? "+" : "−"}
              {B.puluhan || ""}
            </p>
            <p role="cell" className="border-l-4 border-t-2 border-[#1C01A5]/40 py-1 text-center text-2xl font-black text-blue-700">
              {B.satuan}
            </p>
            <p role="cell" className="border-t-4 border-[#1C01A5] bg-[#E8F7EE] py-1 text-center text-3xl font-black text-green-700">
              {H.puluhan || "0"}
            </p>
            <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] bg-[#E8F7EE] py-1 text-center text-3xl font-black text-green-700">
              {H.satuan}
            </p>
          </div>
          {cat.jenis === "simpan" ? (
            <p role="status" className="rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              +1 simpan di puluhan · {cat.teks}
            </p>
          ) : cat.jenis === "urai" ? (
            <p role="status" className="rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              −1 urai dari puluhan · {cat.teks}
            </p>
          ) : (
            <p role="status" className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
              {cat.teks}
            </p>
          )}
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, hitung delapan ditambah lima di ketiga tampilan. Apakah hasilnya sama? Dua, ganti ke kurang: empat belas dikurangi enam. Apa yang berubah di garis? Tiga, matikan satu perwakilan. Apakah hitungannya berubah?"
          )
        }
        langkah={[
          "Hitung 8 + 5 di ketiga tampilan. Apakah hasilnya sama?",
          "Ganti ke Kurang: 14 − 6. Apa yang berubah di garis?",
          "Matikan satu perwakilan. Apakah hitungannya berubah?",
        ]}
      />
    </div>
  );
}
