"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import { ItemSvg } from "./dasar-k2b5";
import { NAMA_ITEM } from "./data-k2b5";
import {
  AWAL_JENIS,
  AWAL_N,
  MAKS_N,
  MIN_N,
  NAMA_KUMPULAN,
  URUT_KUMPULAN,
  awalGrup,
  bagiSatuSatu,
  hitungGrup,
  kalimatKumpulan,
  kalimatPasangan,
  pasangan,
  pindah,
  samaBanyak,
  tabelPola,
  tandaiBilangan,
  ubahN,
  type JenisKumpulan,
  type Kelompok,
} from "./lab-kumpulan-k2b5";
import type { KeadaanLabKumpulan } from "./misi-k2bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B5 Sub-Bab B): Lab Kumpulan — model PhET.                       */
/* Satu model (banyak benda + pembagian dua kelompok), banyak perwakilan:      */
/* benda, hitungan, pasangan satu-satu, tabel pola, dan kalimat. Setengah       */
/* dari kumpulan hanya ada bila dua kelompok sama banyak. Logika:               */
/* lab-kumpulan-k2b5.ts.                                                        */
/* ------------------------------------------------------------------------ */

const warnaBenda = (jenis: JenisKumpulan, i: number) => NAMA_ITEM[jenis].warna[i % NAMA_ITEM[jenis].warna.length];

export default function SimulasiLabKumpulan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabKumpulan) => void }) {
  const [jenis, setJenis] = useState<JenisKumpulan>(AWAL_JENIS);
  const [grup, setGrup] = useState<Kelompok[]>(() => awalGrup(AWAL_N));
  const [tampilPasangan, setTampilPasangan] = useState(false);
  const [tabel, setTabel] = useState(false);
  const [berhasil, setBerhasil] = useState<number[]>([]);
  const [jenisBerhasil, setJenisBerhasil] = useState<string[]>([]);

  const n = grup.length;
  const { kiri, kanan } = hitungGrup(grup);
  const sama = samaBanyak(grup);
  const { pasang, sisa } = useMemo(() => pasangan(grup), [grup]);
  const nomorPasang = useMemo(() => {
    const peta = new Map<number, number>();
    pasang.forEach(([a, b], p) => {
      peta.set(a, p + 1);
      peta.set(b, p + 1);
    });
    return peta;
  }, [pasang]);

  /** Mengganti pembagian dan mencatat keberhasilan. Dipanggil dari penanganan aksi, bukan dari efek. */
  const terapkan = (baru: Kelompok[]) => {
    setGrup(baru);
    if (samaBanyak(baru)) {
      setBerhasil((b) => tandaiBilangan(b, baru.length));
      setJenisBerhasil((j) => (j.includes(jenis) ? j : [...j, jenis]));
    }
  };

  useEffect(() => {
    onKeadaan?.({ alat: "kumpulan", n, jenis, kiri, kanan, sama, sisa: sisa.length, pasangan: tampilPasangan, tabel, berhasil, jenisBerhasil });
  }, [onKeadaan, n, jenis, kiri, kanan, sama, sisa.length, tampilPasangan, tabel, berhasil, jenisBerhasil]);

  const nama = NAMA_KUMPULAN[jenis];
  const teks = kalimatKumpulan(nama, grup);

  const resetSemua = () => {
    setJenis(AWAL_JENIS);
    setGrup(awalGrup(AWAL_N));
    setTampilPasangan(false);
    setTabel(false);
  };

  const benda = (kelompok: Kelompok) =>
    grup.map((g, i) =>
      g === kelompok ? (
        <button
          key={i}
          type="button"
          onClick={() => terapkan(pindah(grup, i))}
          aria-label={`${NAMA_ITEM[jenis].tunggal} ke-${i + 1} di kelompok ${kelompok}, ketuk untuk memindahkan`}
          className="igil-muncul relative flex h-12 w-12 items-center justify-center rounded-xl border-2 border-transparent bg-white active:scale-95"
        >
          <ItemSvg jenis={jenis} warna={warnaBenda(jenis, i)} kelas="h-9 w-9" />
          {tampilPasangan && nomorPasang.has(i) ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1C01A5] px-1 text-[11px] font-black text-white">{nomorPasang.get(i)}</span> : null}
          {tampilPasangan && sisa.includes(i) ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#DC2626] px-1 text-[11px] font-black text-white">?</span> : null}
        </button>
      ) : null
    );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kumpulan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bagi sekumpulan benda ke dua kelompok. Ketuk benda untuk memindahkannya. Lihat kapan kedua kelompok sama banyak.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Jenis benda">
          <span className="text-xs font-black text-[#1C01A5]">Benda:</span>
          {URUT_KUMPULAN.map((j) => (
            <Pilihan key={j} aktif={jenis === j} onKlik={() => {
                setJenis(j);
                if (sama) setJenisBerhasil((x) => (x.includes(j) ? x : [...x, j]));
              }} label={`Benda ${NAMA_KUMPULAN[j]}`}>
              <span className="inline-flex items-center gap-1">
                <ItemSvg jenis={j} warna={warnaBenda(j, 0)} kelas="h-5 w-5" label="" />
                {NAMA_KUMPULAN[j]}
              </span>
            </Pilihan>
          ))}
        </div>
        <Pengatur
          nama="Banyak benda"
          nilai={n}
          onKurang={() => terapkan(ubahN(grup, n - 1))}
          onTambah={() => terapkan(ubahN(grup, n + 1))}
          kurangMati={n <= MIN_N}
          tambahMati={n >= MAKS_N}
          kurangLabel="Kurangi satu benda"
          tambahLabel="Tambah satu benda"
        />
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={TOMBOL_UTAMA} onClick={() => terapkan(bagiSatuSatu(n))}>
            🤝 Bagi satu-satu
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => terapkan(awalGrup(n))}>
            ↩ Kumpulkan lagi
          </button>
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-h-24 space-y-1 rounded-2xl border-4 border-dashed border-[#1C01A5]/50 bg-[#F5F3FF] p-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">Kelompok kiri: {kiri}</p>
            <div className="flex flex-wrap justify-center gap-1">{benda("kiri")}</div>
          </div>
          <div className="min-h-24 space-y-1 rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC]/60 p-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">Kelompok kanan: {kanan}</p>
            <div className="flex flex-wrap justify-center gap-1">{benda("kanan")}</div>
          </div>
        </div>
        <KalimatBesar teks={teks} />
        {tampilPasangan ? <KalimatBesar teks={kalimatPasangan(grup)} warna="bg-[#E0E7FF]" /> : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={tampilPasangan} onKlik={() => setTampilPasangan(!tampilPasangan)}>
            Pasangan satu-satu
          </Cek>
          <Cek aktif={tabel} onKlik={() => setTabel(!tabel)}>
            Tabel pola
          </Cek>
        </div>

        {tabel ? (
          <table className="w-full border-collapse overflow-hidden rounded-2xl text-center text-xs font-black text-[#1C01A5]" aria-label="Tabel setengah dari banyak benda">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="p-1">Semua</th>
                <th className="p-1">Setengahnya</th>
                <th className="p-1">Sudah kamu bagi?</th>
              </tr>
            </thead>
            <tbody>
              {tabelPola().map((r) => (
                <tr key={r.n} className={`border-t-2 border-[#1C01A5]/20 ${r.n === n ? "bg-[#FFE566]" : "bg-white"}`}>
                  <td className="p-1">{r.n}</td>
                  <td className="p-1">{r.setengah ?? "tidak ada"}</td>
                  <td className="p-1">{berhasil.includes(r.n) ? "✔" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Sudah berhasil dibagi dua sama banyak untuk {berhasil.length} bilangan.</p>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan bagi satu-satu pada enam benda. Berapa di setiap kelompok? Dua, ubah jadi tujuh benda lalu bagi satu-satu. Apa yang terjadi? Tiga, nyalakan pasangan satu-satu. Apa tandanya ganjil? Empat, nyalakan tabel pola. Bilangan mana yang tidak punya setengah?"
          )
        }
        langkah={[
          "Tekan Bagi satu-satu pada 6 benda. Berapa di setiap kelompok?",
          "Ubah jadi 7 benda lalu bagi satu-satu. Apa yang terjadi?",
          "Nyalakan Pasangan satu-satu. Apa tandanya bilangan ganjil?",
          "Nyalakan Tabel pola. Bilangan mana yang tidak punya setengah?",
        ]}
      />
    </div>
  );
}
