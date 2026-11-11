"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { BarisLambang, LambangSvg, TurusBaris } from "./diagram-lab-k2b8";
import {
  DAFTAR_LAMBANG,
  LAMBANG,
  MAKS_GAMBAR,
  SET,
  SET_GAMBAR,
  awalLab,
  kalimatLab,
  kapital,
  kurangData,
  laporanGambar,
  nyalakanLab,
  pilihLambangLab,
  pilihSetLab,
  resetLab,
  tambahData,
  totalLab,
  type KunciTampil,
} from "./lab-data-k2b8";
import type { KeadaanLabGambar } from "./misi-k2bab8";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B8 Sub-Bab B): Lab Diagram Gambar — model PhET.                  */
/* Satu model (banyak data tiap baris), banyak perwakilan: diagram gambar,       */
/* tabel, turus, serta judul dan keterangan. Lambang boleh diganti, banyaknya      */
/* tetap. Semua gambar sama bentuk dan sama ukuran, satu gambar mewakili satu.      */
/* Tanpa gambar benda (hanya lambang polos). Logika: lab-data-k2b8.ts.              */
/* ------------------------------------------------------------------------ */

const NAMA_TAMPIL: Partial<Record<KunciTampil, string>> = { gambar: "Diagram gambar", tabel: "Tabel", turus: "Turus", ket: "Judul dan keterangan" };
const URUT: KunciTampil[] = ["gambar", "tabel", "turus", "ket"];

export default function SimulasiLabGambar({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabGambar) => void }) {
  const [l, setL] = useState(() => awalLab("gambar"));
  const ds = SET[l.set];
  const lam = LAMBANG[l.lambang];

  const lap = useMemo(() => laporanGambar(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const teks = kalimatLab(l);
  const total = totalLab(l);
  const adaTampil = l.gambar || l.turus || l.tabel;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Diagram Gambar</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Buat diagram gambarmu sendiri. Satu gambar mewakili satu. Ganti lambangnya, lalu lihat banyaknya tetap sama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih data">
          <span className="text-xs font-black text-[#1C01A5]">Data:</span>
          {SET_GAMBAR.map((id) => (
            <Pilihan key={id} aktif={l.set === id} onKlik={() => setL((x) => pilihSetLab(x, id))}>
              {SET[id].judul}
            </Pilihan>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih lambang">
          <span className="text-xs font-black text-[#1C01A5]">Lambang:</span>
          {DAFTAR_LAMBANG.map((j) => (
            <Pilihan key={j} aktif={l.lambang === j} onKlik={() => setL((x) => pilihLambangLab(x, j))}>
              <span className="flex items-center gap-1">
                <LambangSvg jenis={j} kelas="h-5 w-5" />
                {LAMBANG[j].nama}
              </span>
            </Pilihan>
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {ds.kategori.map((k, i) => (
            <Pengatur
              key={k.id}
              nama={kapital(k.nama)}
              nilai={l.n[i]}
              onKurang={() => setL((x) => kurangData(x, i))}
              onTambah={() => setL((x) => tambahData(x, i))}
              kurangMati={l.n[i] <= 0}
              tambahMati={l.n[i] >= MAKS_GAMBAR}
              kurangLabel={`Kurangi ${k.nama}`}
              tambahLabel={`Tambah ${k.nama}`}
              warna="#F5F3FF"
            />
          ))}
        </div>

        <div className="space-y-1.5 rounded-2xl bg-indigo-50/60 p-2" aria-label={ds.judul}>
          {l.ket ? <p className="px-1 text-center text-base font-black text-[#1C01A5]">{ds.judul}</p> : null}
          <div className="flex items-center justify-between gap-2 px-1">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{l.ket ? "Diagram" : ds.judul}</p>
            {l.tabel ? <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Banyak</p> : null}
          </div>
          {total === 0 ? <p className="px-1 text-sm font-bold text-[#1C01A5]/60">Belum ada data. Tekan tombol tambah.</p> : null}
          {ds.kategori.map((k, i) => {
            const n = l.n[i];
            return (
              <div key={k.id} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-2 py-1.5">
                <span className="w-20 shrink-0 text-sm font-black text-[#1C01A5]">{kapital(k.nama)}</span>
                <div className="min-w-0 flex-1 space-y-0.5">
                  {l.gambar ? n > 0 ? <BarisLambang n={n} jenis={l.lambang} warna={k.warna} kelas="h-5 w-5" /> : <span className="text-xs font-bold text-[#1C01A5]/40">belum ada gambar</span> : null}
                  {l.turus && n > 0 ? <TurusBaris n={n} kelompok tinggi={18} /> : null}
                  {!adaTampil ? <span className="text-xs font-bold text-[#1C01A5]/40">Nyalakan Diagram gambar, Turus, atau Tabel</span> : null}
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
          {l.ket ? (
            <p className="flex items-center justify-center gap-1.5 px-1 text-sm font-black text-[#1C01A5]">
              <LambangSvg jenis={l.lambang} kelas="h-5 w-5" />
              Satu {lam.nama} mewakili satu {ds.satuan}.
            </p>
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
        </div>
        {!l.ket && total > 0 ? <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">Diagram tanpa judul dan keterangan membuat pembaca bingung. Nyalakan Judul dan keterangan.</p> : null}
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
            "Coba ini. Satu, isi data lalu ganti lambangnya. Apakah banyaknya berubah? Dua, nyalakan turus dan diagram gambar bersamaan. Samakah banyaknya? Tiga, buat dua jenis yang sama banyak. Bagaimana barisnya? Empat, matikan judul dan keterangan. Apa yang kurang?"
          )
        }
        langkah={[
          "Isi data, lalu ganti lambangnya. Apakah banyaknya berubah?",
          "Nyalakan Turus dan Diagram gambar bersamaan. Samakah banyaknya di keduanya?",
          "Buat dua jenis yang sama banyak. Bagaimana panjang barisnya?",
          "Nyalakan lalu matikan Judul dan keterangan. Apa yang kurang bila dimatikan?",
        ]}
      />
    </div>
  );
}
