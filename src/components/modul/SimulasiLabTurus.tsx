"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { TurusBaris } from "./diagram-lab-k2b8";
import {
  SET,
  SET_TURUS,
  MAKS_TURUS,
  awalLab,
  kalimatLab,
  kapital,
  kurangData,
  laporanTurus,
  nyalakanLab,
  pilihSetLab,
  resetLab,
  setKelompokLab,
  tambahData,
  totalLab,
  type KunciTampil,
} from "./lab-data-k2b8";
import type { KeadaanLabTurus } from "./misi-k2bab8";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B8 Sub-Bab A): Lab Turus — model PhET.                           */
/* Satu model (banyak data tiap jenis), banyak perwakilan: benda, turus,        */
/* tabel, dan kalimat. Kelompok lima bisa dimatikan supaya anak melihat           */
/* garis berjajar sulit dihitung. Satu garis selalu satu benda. Logika:          */
/* lab-data-k2b8.ts.                                                              */
/* ------------------------------------------------------------------------ */

const NAMA_TAMPIL: Partial<Record<KunciTampil, string>> = { turus: "Turus", benda: "Benda", tabel: "Tabel" };
const URUT: KunciTampil[] = ["turus", "benda", "tabel"];

export default function SimulasiLabTurus({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabTurus) => void }) {
  const [l, setL] = useState(() => awalLab("turus"));
  const ds = SET[l.set];

  const lap = useMemo(() => laporanTurus(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const teks = kalimatLab(l);
  const total = totalLab(l);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Turus</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Buat datamu sendiri. Satu garis turus mewakili satu benda. Lihat turus, benda, dan tabelnya berubah bersama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih data">
          <span className="text-xs font-black text-[#1C01A5]">Data:</span>
          {SET_TURUS.map((id) => (
            <Pilihan key={id} aktif={l.set === id} onKlik={() => setL((x) => pilihSetLab(x, id))}>
              {SET[id].judul}
            </Pilihan>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {ds.kategori.map((k, i) => (
            <Pengatur
              key={k.id}
              nama={`${k.ikon} ${kapital(k.nama)}`}
              nilai={l.n[i]}
              onKurang={() => setL((x) => kurangData(x, i))}
              onTambah={() => setL((x) => tambahData(x, i))}
              kurangMati={l.n[i] <= 0}
              tambahMati={l.n[i] >= MAKS_TURUS}
              kurangLabel={`Kurangi ${k.nama}`}
              tambahLabel={`Tambah ${k.nama}`}
              warna="#F5F3FF"
            />
          ))}
        </div>

        <div className="space-y-1.5 rounded-2xl bg-indigo-50/60 p-2" aria-label={ds.judul}>
          <div className="flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{ds.judul}</p>
            {l.tabel ? <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Banyak</p> : null}
          </div>
          {total === 0 ? <p className="px-1 text-sm font-bold text-[#1C01A5]/60">Belum ada data. Tekan tombol tambah.</p> : null}
          {ds.kategori.map((k, i) => {
            const n = l.n[i];
            return (
              <div key={k.id} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-2 py-1.5">
                <span className="w-24 shrink-0 text-sm font-black text-[#1C01A5]">
                  {k.ikon} {kapital(k.nama)}
                </span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  {l.turus ? n > 0 ? <TurusBaris n={n} kelompok={l.kelompok} /> : <span className="text-xs font-bold text-[#1C01A5]/40">belum ada garis</span> : null}
                  {l.benda && n > 0 ? (
                    <span className="flex flex-wrap text-lg leading-none" role="img" aria-label={`${n} ${k.nama}`}>
                      {Array.from({ length: n }, (_, j) => (
                        <span key={j}>{k.ikon}</span>
                      ))}
                    </span>
                  ) : null}
                  {!l.turus && !l.benda ? <span className="text-xs font-bold text-[#1C01A5]/40">Nyalakan Turus atau Benda</span> : null}
                </div>
                {l.tabel ? <span className="w-8 shrink-0 text-right text-2xl font-black text-[#1C01A5]">{n}</span> : null}
              </div>
            );
          })}
          {l.tabel ? (
            <div className="flex items-center justify-between rounded-xl bg-[#FFF7CC] px-3 py-1.5">
              <span className="text-sm font-black text-[#1C01A5]">Jumlah semuanya</span>
              <span className="text-2xl font-black text-[#1C01A5]">{total}</span>
            </div>
          ) : null}
        </div>

        {l.catatan ? (
          <p role="status" className="igil-muncul rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
            {l.catatan}
          </p>
        ) : null}
        <KalimatBesar teks={teks} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          {URUT.map((k) => (
            <Cek key={k} aktif={l[k]} onKlik={() => setL((x) => nyalakanLab(x, k, !x[k]))}>
              {NAMA_TAMPIL[k]}
            </Cek>
          ))}
          <Cek aktif={l.kelompok} onKlik={() => setL((x) => setKelompokLab(x, !x.kelompok))}>
            Kelompok lima
          </Cek>
        </div>
        {l.turus && !l.kelompok ? (
          <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">Garis berjajar tanpa kelompok lima. Coba hitung satu per satu, lalu nyalakan Kelompok lima.</p>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetLab(l))}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tambah satu jenis sampai lima. Apa yang terjadi pada garis turusnya? Dua, tambah sampai sepuluh. Berapa kelompok lima? Tiga, matikan kelompok lima dan buat sembilan. Mudahkah menghitungnya? Empat, nyalakan tabel dan buat datamu sendiri."
          )
        }
        langkah={[
          "Tambah satu jenis sampai 5. Apa yang terjadi pada garis turusnya?",
          "Tambah sampai 10. Ada berapa kelompok lima?",
          "Matikan Kelompok lima, lalu buat 9. Mudahkah menghitungnya? Nyalakan lagi dan bandingkan.",
          "Nyalakan Tabel dan buat datamu sendiri. Samakah angka banyak dengan turusnya?",
        ]}
      />
    </div>
  );
}
