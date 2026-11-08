"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU, sebut } from "./simulasi-bersama";
import { BIRU, Bingkai, GarisAngka, KalimatBesar, MERAH, Pengatur, eja } from "./komponen-lab";
import { MAKS, bandingkanNilaiTempat, batas, bisaIkat, kalimatNilai, ketukBenda, selDuaBingkai, ucapanPuluhan, uraiNilai } from "./lab-puluhan-bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 5): Laboratorium Puluhan dan Satuan, metode PhET.          */
/* Satu bilangan 0 sampai 20 di benda, dua bingkai, tabel nilai tempat, dan   */
/* garis bilangan. Logika di lab-puluhan-bab5.ts. Tanpa jaringan.             */
/* ------------------------------------------------------------------------ */

export default function SimulasiPuluhan({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [n, setN] = useState(14);
  const [m, setM] = useState(12);
  const [ikat, setIkat] = useState(false);
  const [banding, setBanding] = useState(false);
  const u = uraiNilai(n);
  const [bingkai1, bingkai2] = selDuaBingkai(n);
  const kb = bandingkanNilaiTempat(n, m);
  const diikat = ikat && bisaIkat(n);

  const blok = (awal: number, jenis: "kelereng-merah" | "kelereng-biru", nama: string) => {
    const adaBungkus = awal === 0 && diikat;
    return (
      <div className={`rounded-2xl px-1.5 py-1.5 ${adaBungkus ? "border-4 border-[#F0AB00] bg-[#FFF7CC]" : "border-2 border-[#1C01A5]/20 bg-white"}`}>
        <p className="mb-1 text-center text-[10px] font-black uppercase tracking-wide text-[#1C01A5]/70">{adaBungkus ? "1 puluhan (diikat)" : nama}</p>
        <div className="grid grid-cols-5 gap-1">
          {Array.from({ length: 10 }, (_, k) => {
            const i = awal + k;
            const ada = i < n;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Benda ke-${i + 1}${ada ? "" : ", kosong"}`}
                onClick={() => setN(ketukBenda(n, i))}
                className={`flex flex-col items-center rounded-lg border px-0.5 py-0.5 ${ada ? "border-[#1C01A5]/30 bg-white" : "border-dashed border-[#1C01A5]/20 bg-[#F5F3FF]"}`}
              >
                <span className={ada ? "igil-muncul" : "opacity-15"}>
                  <BendaSvg jenis={jenis} kelas="h-6 w-6" />
                </span>
                <span className={`text-[10px] font-black ${ada ? "text-[#1C01A5]" : "text-[#1C01A5]/25"}`}>{i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Puluhan dan Satuan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur satu bilangan. Lihat puluhan dan satuannya di semua gambar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bilangan ini" onClick={() => speakGuru(eja(ucapanPuluhan(n, ikat)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-center">
          <span className="flex h-16 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-4xl font-black text-[#1C01A5]" aria-live="polite" aria-label={`Bilangan ${n}`}>
            {n}
          </span>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">{sebut(n)}</p>
        <Pengatur nama="Bilangan" nilai={n} onKurang={() => setN(batas(n - 1))} onTambah={() => setN(batas(n + 1))} kurangMati={n <= 0} tambahMati={n >= MAKS} />
        {banding ? <Pengatur nama="Bilangan kedua" nilai={m} warna="#DBEAFE" onKurang={() => setM(batas(m - 1))} onTambah={() => setM(batas(m + 1))} kurangMati={m <= 0} tambahMati={m >= MAKS} /> : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={ikat} onKlik={() => setIkat((x) => !x)}>
            Ikat sepuluh
          </Cek>
          <Cek aktif={banding} onKlik={() => setBanding((x) => !x)}>
            Bandingkan
          </Cek>
        </div>
        {ikat && !bisaIkat(n) ? (
          <p role="status" className="rounded-xl bg-[#F5F3FF] px-3 py-1 text-center text-xs font-black text-[#1C01A5]">
            Belum ada sepuluh benda untuk diikat. Tambah bilangannya sampai 10.
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Benda • ketuk benda untuk mengatur</p>
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
          {blok(0, "kelereng-merah", "Sepuluh pertama")}
          {blok(10, "kelereng-biru", "Sepuluh berikutnya")}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Dua bingkai sepuluh</p>
        <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
          <Bingkai sel={bingkai1} nama={`Bingkai pertama: ${Math.min(n, 10)} terisi`} />
          <Bingkai sel={bingkai2} nama={`Bingkai kedua: ${Math.max(0, n - 10)} terisi`} />
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel nilai tempat</p>
        <div className="mx-auto grid w-full max-w-[280px] grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel nilai tempat">
          <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-sm font-black text-[#7F1D1D]">Puluhan</p>
          <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-sm font-black text-[#1E3A8A]">Satuan</p>
          <p role="cell" className="border-t-4 border-[#1C01A5] py-2 text-center text-4xl font-black text-[#1C01A5]">{u.puluhan}</p>
          <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-2 text-center text-4xl font-black text-[#1C01A5]">{u.satuan}</p>
        </div>
        <KalimatBesar teks={kalimatNilai(n)} warna="bg-[#FFE566]" />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan 0 sampai 20 • ketuk angka untuk mengatur</p>
        <GarisAngka
          maks={MAKS}
          nama={`Garis bilangan 0 sampai 20, bilangan pertama ${n}${banding ? `, bilangan kedua ${m}` : ""}`}
          sorot={[10, n]}
          penanda={[{ n, warna: MERAH }, ...(banding ? [{ n: m, warna: BIRU }] : [])]}
          onPilih={(x) => setN(batas(x))}
        />
        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Lingkaran emas besar menandai 10 dan bilanganmu.</p>
      </div>

      {banding ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Membandingkan dengan nilai tempat</p>
          <KalimatBesar teks={`${n} ${kb.simbol} ${m}`} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{kb.alasan}</p>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, atur bilangan sampai sepuluh lalu nyalakan ikat sepuluh. Apa yang terjadi di tabel? Dua, tambah satu lagi. Apa yang berubah, puluhan atau satuan? Tiga, nyalakan bandingkan. Lihat mana yang dibandingkan lebih dulu, puluhan atau satuan."
          )
        }
        langkah={[
          "Atur bilangan sampai 10, lalu nyalakan Ikat sepuluh. Apa yang terjadi di tabel?",
          "Tambah satu lagi. Apa yang berubah, puluhan atau satuan?",
          "Nyalakan Bandingkan. Lihat mana yang dibandingkan lebih dulu, puluhan atau satuan.",
        ]}
      />
    </div>
  );
}
