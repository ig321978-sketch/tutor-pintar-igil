"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur } from "./komponen-lab";
import { ModelTiga } from "./diagram-k3b1";
import { digitDari, ejaK3 } from "./lab-tempat-k3b1";
import {
  NAMA_BAGIAN,
  analisisSusun,
  awalSusun,
  barisPanjang,
  kalimatPeriksa,
  kalimatSusun,
  keadaanSusun,
  langkahSusun,
  ucapSusun,
  type BagianSusun,
  type KeadaanSusun,
  type ModeSusun,
  type RepSusun,
  type StateSusun,
} from "./lab-susun-k3b1";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B1 Sub-Bab D dan E): Lab Susun. Satu model (puluhan dan satuan     */
/* dua bilangan), banyak perwakilan: blok, susun pendek, susun panjang, periksa.  */
/* Logika: lab-susun-k3b1.ts. Warna tabel: soal biru, jawaban hijau, simpanan     */
/* dan pinjaman merah kecil.                                                      */
/* ------------------------------------------------------------------------ */

const BIRU = "#1D4ED8";
const HIJAU = "#15803D";
const MERAH = "#DC2626";

const NAMA_REP: Record<RepSusun, string> = { blok: "Blok", pendek: "Susun pendek", panjang: "Susun panjang", periksa: "Periksa" };

const PENGATUR: { bagian: BagianSusun; nama: string; warna: string }[] = [
  { bagian: "ap", nama: "Puluhan pertama", warna: "#BFDBFE" },
  { bagian: "as", nama: "Satuan pertama", warna: "#FECACA" },
  { bagian: "bp", nama: "Puluhan kedua", warna: "#BFDBFE" },
  { bagian: "bs", nama: "Satuan kedua", warna: "#FECACA" },
];

const CATATAN: Record<ModeSusun, string[]> = {
  tambah: [
    "Buat 23 + 16, lalu 48 + 16. Apa bedanya saat satuan dijumlahkan?",
    "Buat penjumlahan yang menyimpan, lalu nyalakan Blok. Apa yang terjadi pada sepuluh satuan?",
    "Nyalakan Susun panjang pada 54 + 29. Mengapa hasilnya sama dengan susun pendek?",
  ],
  kurang: [
    "Buat 25 − 12, lalu 45 − 19. Kapan kamu perlu mengambil satu puluhan?",
    "Buat pengurangan yang mengambil, lalu nyalakan Blok. Apa yang terjadi pada satu puluhan?",
    "Nyalakan Periksa. Mengapa hasil ditambah pengurang kembali ke bilangan awal?",
  ],
};

function Sel({ isi, warna, kecil = false, tebal = true }: { isi: React.ReactNode; warna: string; kecil?: boolean; tebal?: boolean }) {
  return (
    <td className={`h-9 w-12 text-center ${kecil ? "text-sm" : "text-3xl"} ${tebal ? "font-black" : "font-bold"}`} style={{ color: warna }}>
      {isi}
    </td>
  );
}

/** Tabel susun pendek 4 kolom: tanda, ratusan, puluhan, satuan. */
function TabelSusun({ x }: { x: StateSusun }) {
  const an = analisisSusun(x);
  const tanda = x.mode === "tambah" ? "+" : "−";
  const h = digitDari(an.hasil);
  const kosongSel = <td className="w-12" />;
  const tampilHasilR = h.r > 0;
  return (
    <table className="mx-auto border-separate border-spacing-0" aria-label={`Susun pendek ${kalimatSusun(x)}`}>
      <thead>
        <tr>
          <th className="w-10" />
          <th className="px-1 text-[10px] font-black text-[#15803D]">Ratusan</th>
          <th className="px-1 text-[10px] font-black text-[#1D4ED8]">Puluhan</th>
          <th className="px-1 text-[10px] font-black text-[#DC2626]">Satuan</th>
        </tr>
      </thead>
      <tbody>
        {x.mode === "tambah" ? (
          <tr>
            <td />
            {kosongSel}
            <Sel isi={an.simpan ? "+1" : ""} warna={MERAH} kecil />
            {kosongSel}
          </tr>
        ) : (
          <tr>
            <td />
            {kosongSel}
            <Sel isi={an.ambil ? "−1" : ""} warna={MERAH} kecil />
            {kosongSel}
          </tr>
        )}
        <tr>
          <td />
          {kosongSel}
          <Sel isi={x.ap} warna={BIRU} />
          <Sel isi={x.as} warna={BIRU} />
        </tr>
        {x.mode === "kurang" ? (
          <tr>
            <td />
            {kosongSel}
            <Sel isi={an.ambil ? an.puluhanAtas : ""} warna={MERAH} kecil />
            <Sel isi={an.ambil ? an.satuanHitung : ""} warna={MERAH} kecil />
          </tr>
        ) : null}
        <tr>
          <td className="text-center text-3xl font-black text-[#1C01A5]">{tanda}</td>
          {kosongSel}
          <Sel isi={x.bp} warna={BIRU} />
          <Sel isi={x.bs} warna={BIRU} />
        </tr>
        <tr>
          <td />
          <td colSpan={3} className="border-t-4 border-[#1C01A5]" />
        </tr>
        <tr>
          <td />
          <Sel isi={tampilHasilR ? h.r : ""} warna={HIJAU} />
          <Sel isi={tampilHasilR || h.p > 0 || an.hasil >= 10 ? h.p : ""} warna={HIJAU} />
          <Sel isi={h.s} warna={HIJAU} />
        </tr>
        {x.mode === "tambah" ? (
          <tr>
            <td />
            {kosongSel}
            <Sel isi={an.simpan ? `${x.ap}+${x.bp}+1` : `${x.ap}+${x.bp}`} warna={MERAH} kecil tebal={false} />
            <Sel isi={`${x.as}+${x.bs}`} warna={MERAH} kecil tebal={false} />
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}

function BlokSusun({ x }: { x: StateSusun }) {
  const an = analisisSusun(x);
  const hasil = digitDari(an.hasil);
  const sel = "flex flex-col items-center gap-1 rounded-2xl bg-indigo-50/60 p-2";
  if (x.mode === "tambah") {
    return (
      <div className="flex flex-wrap items-end justify-center gap-3" aria-label="Blok penjumlahan">
        <div className={sel}>
          <ModelTiga r={0} p={x.ap} s={x.as} skala={0.7} />
          <span className="text-xs font-black text-[#1C01A5]">{an.a}</span>
        </div>
        <span className="text-2xl font-black text-[#1C01A5]">+</span>
        <div className={sel}>
          <ModelTiga r={0} p={x.bp} s={x.bs} skala={0.7} />
          <span className="text-xs font-black text-[#1C01A5]">{an.b}</span>
        </div>
        <span className="text-2xl font-black text-[#1C01A5]">=</span>
        <div className={sel}>
          <ModelTiga r={hasil.r} p={hasil.p} s={hasil.s} skala={0.7} />
          <span className="text-xs font-black text-[#1C01A5]">{an.hasil}</span>
        </div>
        {an.simpan ? <p className="w-full text-center text-sm font-black text-[#7F1D1D]">Satuan {an.satuanHitung}: sepuluh satuan ditukar satu puluhan.</p> : null}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-end justify-center gap-3" aria-label="Blok pengurangan">
      <div className={sel}>
        <ModelTiga r={0} p={an.puluhanAtas} s={an.satuanHitung} skala={0.7} />
        <span className="text-xs font-black text-[#1C01A5]">{an.ambil ? `${an.a}, setelah mengambil 1 puluhan` : `${an.a}`}</span>
      </div>
      <span className="text-2xl font-black text-[#1C01A5]">−</span>
      <div className={sel}>
        <ModelTiga r={0} p={x.bp} s={x.bs} skala={0.7} />
        <span className="text-xs font-black text-[#1C01A5]">{an.b} diambil</span>
      </div>
      <span className="text-2xl font-black text-[#1C01A5]">=</span>
      <div className={sel}>
        {an.hasil > 0 ? <ModelTiga r={0} p={Math.floor(an.hasil / 10)} s={an.hasil % 10} skala={0.7} /> : <span className="text-sm font-bold text-[#1C01A5]/60">tidak tersisa</span>}
        <span className="text-xs font-black text-[#1C01A5]">{an.hasil}</span>
      </div>
    </div>
  );
}

export default function SimulasiLabSusunK3({ mode, speakGuru, onKeadaan }: { mode: ModeSusun; speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusun) => void }) {
  const [x, kirim] = useReducer(langkahSusun, mode, awalSusun);

  useEffect(() => {
    onKeadaan?.(keadaanSusun(x));
  }, [onKeadaan, x]);

  const reps: RepSusun[] = mode === "tambah" ? ["blok", "pendek", "panjang"] : ["blok", "pendek", "panjang", "periksa"];
  const an = analisisSusun(x);
  const ucap = () => `${ejaK3(kalimatSusun(x))}. ${ejaK3(ucapSusun(x))}`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susun {mode === "tambah" ? "Tambah" : "Kurang"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur puluhan dan satuan dua bilangan. Nyalakan tampilan untuk melihat caranya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ucap())} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="grid gap-2">
          {PENGATUR.map((p) => (
            <Pengatur
              key={p.bagian}
              nama={p.nama}
              nilai={x[p.bagian]}
              warna={p.warna}
              kurangMati={false}
              tambahMati={false}
              kurangLabel={`Kurangi ${NAMA_BAGIAN[p.bagian]}`}
              tambahLabel={`Tambah ${NAMA_BAGIAN[p.bagian]}`}
              onKurang={() => kirim({ t: "UBAH", bagian: p.bagian, d: -1 })}
              onTambah={() => kirim({ t: "UBAH", bagian: p.bagian, d: 1 })}
            />
          ))}
        </div>
        <KalimatBesar teks={kalimatSusun(x)} />
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${x.pesan ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
          {x.pesan
            ? `⛔ ${x.pesan}`
            : mode === "tambah"
              ? an.simpan
                ? "🔧 Satuan sepuluh atau lebih: menyimpan satu puluhan."
                : "🔧 Satuan kurang dari sepuluh: tidak perlu menyimpan."
              : an.ambil
                ? "🔧 Satuan atas lebih kecil: ambil satu puluhan."
                : "🔧 Satuan atas cukup: tidak perlu mengambil."}
        </p>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilan</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
          {reps.map((r) => (
            <Cek key={r} aktif={x.tampil[r]} onKlik={() => kirim({ t: "TOGGLE", rep: r })}>
              {NAMA_REP[r]}
            </Cek>
          ))}
        </div>

        {x.tampil.blok ? <BlokSusun x={x} /> : null}
        {x.tampil.pendek ? <TabelSusun x={x} /> : null}
        {x.tampil.panjang ? (
          <div className="space-y-1" aria-label="Susun panjang">
            {barisPanjang(x).map((b, i) => (
              <KalimatBesar key={`${b}-${i}`} teks={b} warna={i === 3 ? "bg-[#E8F7EE]" : "bg-[#FFF7CC]"} />
            ))}
          </div>
        ) : null}
        {mode === "kurang" && x.tampil.periksa ? (
          <div className="space-y-1">
            <KalimatBesar teks={kalimatPeriksa(x)} warna="bg-[#E8F7EE]" />
            <p className="text-center text-xs font-bold text-[#1C01A5]/80">Hasil ditambah bilangan pengurang kembali ke bilangan awal, yaitu {an.a}.</p>
          </div>
        ) : null}

        <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
          🔁 Reset Semua
        </button>
      </div>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN[mode].map((c, i) => `${["Satu", "Dua", "Tiga"][i]}, ${ejaK3(c)}`).join(" ")}`)} langkah={CATATAN[mode]} />
    </div>
  );
}

export type { StateSusun };
