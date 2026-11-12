"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { ejaK3B3 } from "./eja-k3b3";
import {
  BATAS_ALAT,
  BENDA_UKUR,
  NAMA_ALAT_UKUR,
  awalPenggaris,
  cariBenda,
  keadaanPenggaris,
  langkahPenggaris,
  muat,
  ucapPenggaris,
  ujungKanan,
  type AlatUkur,
  type KeadaanPenggaris,
  type LangkahGeser,
} from "./lab-penggaris-k3b3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B3 Sub-Bab A): Lab Penggaris. Benda di atas penggaris atau       */
/* meteran. Geser benda sampai ujung kirinya di angka 0, lalu baca panjangnya. */
/* Logika: lab-penggaris-k3b3.ts. Gambar hanya batang polos dan angka.          */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const CATATAN = [
  "Ukur pensil dengan penggaris. Tekan Baca panjang saat pensil belum di angka 0. Apa kata lab?",
  "Geser pensil sampai ujung kirinya di angka 0, lalu baca lagi. Apa bedanya?",
  "Ganti ke meteran dan pilih pintu. Mengapa penggaris tidak cocok?",
  "Ukur buku tulis 30 cm dengan penggaris. Apa yang kamu lihat di ujung penggaris?",
];

const LANGKAH_PENGGARIS: LangkahGeser[] = [-10, -1, 1, 10];

function Mistar({ jenis, benda, awal, tampil }: { jenis: AlatUkur; benda: string; awal: number; tampil: boolean }) {
  const maks = BATAS_ALAT[jenis];
  const b = cariBenda(benda);
  const skala = jenis === "penggaris" ? 18 : 2.4;
  const kiri = 14;
  const lebar = kiri * 2 + maks * skala;
  const langkahTanda = jenis === "penggaris" ? 1 : 10;
  const labelTiap = jenis === "penggaris" ? 5 : 50;
  const batang = muat({ jenis, benda });
  const x = (n: number) => kiri + n * skala;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${lebar} 120`} style={{ minWidth: jenis === "penggaris" ? 560 : 640 }} className="block h-28 w-full" role="img" aria-label={`${NAMA_ALAT_UKUR[jenis]} dengan ${b.nama.toLowerCase()} yang ujung kirinya di angka ${batang ? awal : "tidak ada"}`}>
        {batang ? (
          <g>
            <rect x={x(awal)} y="14" width={b.cm * skala} height="30" rx="6" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
            <text x={x(awal) + (b.cm * skala) / 2} y="35" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7C2D12">
              {b.nama}
            </text>
            {tampil ? (
              <g>
                <line x1={x(awal + b.cm)} y1="44" x2={x(awal + b.cm)} y2="62" stroke="#DC2626" strokeWidth="3" />
                <text x={x(awal + b.cm)} y="12" textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">
                  ujung kanan
                </text>
              </g>
            ) : null}
          </g>
        ) : (
          <text x={lebar / 2} y="34" textAnchor="middle" fontSize="14" fontWeight="900" fill="#B91C1C">
            {b.nama} {b.cm} cm: lebih panjang dari alat
          </text>
        )}
        <rect x={kiri - 6} y="62" width={maks * skala + 12} height="44" rx="6" fill="#DBEAFE" stroke={UNGU} strokeWidth="3" />
        {Array.from({ length: Math.floor(maks / langkahTanda) + 1 }, (_, i) => i * langkahTanda).map((n) => {
          const besar = n % labelTiap === 0;
          return (
            <g key={n}>
              <line x1={x(n)} y1="62" x2={x(n)} y2={besar ? 84 : 74} stroke={UNGU} strokeWidth={n === 0 ? 3 : 1.5} />
              {besar ? (
                <text x={x(n)} y="100" textAnchor="middle" fontSize={jenis === "penggaris" ? 12 : 11} fontWeight="900" fill={UNGU}>
                  {n}
                </text>
              ) : null}
            </g>
          );
        })}
        <line x1={x(0)} y1="14" x2={x(0)} y2="62" stroke="#16A34A" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    </div>
  );
}

export default function SimulasiLabPenggarisK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPenggaris) => void }) {
  const [x, kirim] = useReducer(langkahPenggaris, undefined, awalPenggaris);

  useEffect(() => {
    onKeadaan?.(keadaanPenggaris(x));
  }, [onKeadaan, x]);

  const b = cariBenda(x.benda);
  const batang = muat(x);
  const pas = batang && x.awal === 0;
  const pesanTampil = x.pesan || (batang ? (pas ? "Ujung kiri sudah di angka 0. Tekan Baca panjang." : `Ujung kiri di angka ${x.awal}, belum di nol. Geser benda ke kiri.`) : "Benda tidak muat di alat ini.");
  const langkah = x.jenis === "meteran" ? LANGKAH_PENGGARIS : ([-1, 1] as LangkahGeser[]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Penggaris</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Geser benda sampai ujung kirinya tepat di angka 0, lalu baca angka di ujung yang lain.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B3(ucapPenggaris(x)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih alat ukur">
          {(["penggaris", "meteran"] as AlatUkur[]).map((j) => (
            <Pilihan key={j} aktif={x.jenis === j} onKlik={() => kirim({ t: "ALAT", jenis: j })}>
              {j === "penggaris" ? "📏 Penggaris (sampai 30 cm)" : "🧰 Meteran (sampai 300 cm)"}
            </Pilihan>
          ))}
        </div>
        <Mistar jenis={x.jenis} benda={x.benda} awal={batang ? x.awal : 0} tampil={x.awal === 0 && batang && x.hasil !== ""} />
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${x.pesan && (x.pernahSalah || !batang) ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
          {x.hasil ? `✅ ${x.hasil}. ` : "🔧 "}
          {pesanTampil}
        </p>
        <p className="text-center text-xs font-bold text-[#1C01A5]/70">
          {batang ? `Ujung kiri di angka ${x.awal}, ujung kanan di angka ${ujungKanan(x)}.` : "Ganti alatnya dulu."}
        </p>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pilih benda</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih benda">
          {BENDA_UKUR.map((o) => (
            <Pilihan key={o.id} aktif={x.benda === o.id} onKlik={() => kirim({ t: "BENDA", id: o.id })} label={`${o.nama} ${o.cm} cm`}>
              {o.nama} {o.cm} cm
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Geser benda">
          {langkah.map((d) => (
            <button key={d} type="button" disabled={!batang} aria-label={`Geser benda ${Math.abs(d)} ${d < 0 ? "ke kiri" : "ke kanan"}`} onClick={() => kirim({ t: "GESER", d })} className={`${TOMBOL_BIASA} disabled:opacity-40`}>
              {d < 0 ? `◀ ${Math.abs(d)}` : `${d} ▶`}
            </button>
          ))}
          <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BACA" })}>
            🔍 Baca panjang
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
            🔁 Reset Semua
          </button>
        </div>
        <p className="text-xs font-bold text-[#1C01A5]/70">Benda ini {b.cm} cm. Satuan baku panjang: sentimeter (cm).</p>
      </div>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
