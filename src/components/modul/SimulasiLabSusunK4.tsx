"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { NAMA_TEMPAT_K4, PesanLabK4, WARNA_TEMPAT_K4 } from "./papan-k4b1";
import { ejaK4B1 } from "./eja-k4b1";
import {
  PECAHAN,
  SASARAN_UANG,
  SASARAN_URAI,
  awalSusunK4B1D,
  jumlahKeping,
  jumlahUang,
  kalimatSusun,
  keadaanSusunK4B1D,
  kepingBaku,
  lambangD,
  langkahSusunK4B1D,
  statusUrai,
  sukuUraian,
  teksUang,
  ucapSusunK4B1D,
  ucapUangK4B1D,
  ucapUraiK4B1D,
  type KeadaanSusunK4B1D,
} from "./lab-susun-k4b1d";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B1 Sub-Bab D): Lab Susun-Urai. Satu alat, tiga tampilan.        */
/*  Susun : komposisi dari keping (boleh lebih dari 9); Kelompokkan.           */
/*  Urai  : dekomposisi dengan cek balik; menurut tempat atau cara lain.       */
/*  Uang  : pecahan rupiah sampai Rp7.300 dan Rp10.000.                        */
/* Logika: lab-susun-k4b1d.ts. Keping polos berwarna dan angka.                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Susun, ada 12 keping ratusan. Tekan Kelompokkan. Apakah bilangannya berubah?",
  "Di Urai, urai 3.035 menurut tempat, lalu dengan 2 keping ribuan dan 10 keping ratusan. Keduanya benar?",
  "Nyalakan Tulis nol untuk 6.035. Suku mana yang bernilai 0?",
  "Di Uang, susun Rp10.000 dengan dua cara berbeda.",
];
const NAMA_PECAHAN = ["lima ribu", "dua ribu", "seribu", "lima ratus", "seratus"];

function BarisKeping({ i, v, onUbah, akhiran }: { i: number; v: number; onUbah: (d: 1 | -1) => void; akhiran: string }) {
  const nama = NAMA_TEMPAT_K4[i].toLowerCase();
  return (
    <li className="flex items-center gap-2 rounded-xl border-2 px-2 py-1" style={{ borderColor: WARNA_TEMPAT_K4[i] }}>
      <span className="w-20 shrink-0 text-xs font-black" style={{ color: WARNA_TEMPAT_K4[i] }}>
        {NAMA_TEMPAT_K4[i]}
        <span className="block text-[10px] text-[#1C01A5]/60">{lambangD([1000, 100, 10, 1][i])} tiap keping</span>
      </span>
      <span className="flex min-w-0 flex-1 flex-wrap gap-0.5" aria-hidden="true">
        {Array.from({ length: v }, (_, k) => (
          <span key={k} className="inline-block h-3 w-3 rounded-sm border-2" style={{ borderColor: WARNA_TEMPAT_K4[i] }} />
        ))}
      </span>
      <button type="button" aria-label={`Kurangi 1 keping ${nama}${akhiran}`} onClick={() => onUbah(-1)} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-lg font-black leading-none text-[#1C01A5]">
        −
      </button>
      <span className={`w-7 shrink-0 text-center text-lg font-black ${v > 9 ? "text-[#B45309]" : "text-[#1C01A5]"}`}>{v}</span>
      <button type="button" aria-label={`Tambah 1 keping ${nama}${akhiran}`} onClick={() => onUbah(1)} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black leading-none text-[#1C01A5]">
        +
      </button>
    </li>
  );
}

export default function SimulasiLabSusunK4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusunK4B1D) => void }) {
  const [x, kirim] = useReducer(langkahSusunK4B1D, undefined, awalSusunK4B1D);
  const [lihat, setLihat] = useState<"susun" | "urai" | "uang">("susun");

  useEffect(() => {
    onKeadaan?.(keadaanSusunK4B1D(x));
  }, [onKeadaan, x]);

  const sas = SASARAN_URAI[x.sasaran];
  const st = statusUrai(x.urai, sas);
  const sasUang = SASARAN_UANG[x.sasaranUang];
  const jUang = jumlahUang(x.uang);
  const ucap = lihat === "susun" ? ucapSusunK4B1D(x) : lihat === "urai" ? ucapUraiK4B1D(x) : ucapUangK4B1D(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susun-Urai</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Susun bilangan dari keping, urai dengan lebih dari satu cara, dan susun uang.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "susun"} onKlik={() => setLihat("susun")}>
          🧩 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "urai"} onKlik={() => setLihat("urai")}>
          🔓 Urai
        </Pilihan>
        <Pilihan aktif={lihat === "uang"} onKlik={() => setLihat("uang")}>
          💰 Uang
        </Pilihan>
      </div>

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <ul className="space-y-1.5" aria-label="Keping susun">
            {x.susun.map((v, i) => (
              <BarisKeping key={i} i={i} v={v} akhiran="" onUbah={(d) => kirim({ t: "SUSUN", i, d })} />
            ))}
          </ul>
          <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
            {lambangD(jumlahKeping(x.susun))}
          </p>
          <button type="button" onClick={() => kirim({ t: "KELOMPOK" })} className={TOMBOL_BIASA}>
            🔄 Kelompokkan
          </button>
          {!kepingBaku(x.susun) ? <p className="text-xs font-bold text-[#B45309]">Ada tempat dengan lebih dari 9 keping. Bilangannya tetap benar, tetapi bisa dikelompokkan.</p> : null}
        </div>
      ) : null}
      {lihat === "susun" ? <KalimatBesar teks={kalimatSusun(x.susun)} warna="bg-[#FFF7CC]" /> : null}

      {lihat === "urai" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex items-center justify-between gap-2">
            <button type="button" aria-label="Bilangan sebelumnya" onClick={() => kirim({ t: "SASARAN", d: -1 })} className={TOMBOL_BIASA}>
              ◀
            </button>
            <p className="text-center">
              <span className="block text-xs font-bold text-[#1C01A5]/70">Urai bilangan</span>
              <span className="text-3xl font-black text-[#1C01A5]">{lambangD(sas)}</span>
            </p>
            <button type="button" aria-label="Bilangan berikutnya" onClick={() => kirim({ t: "SASARAN", d: 1 })} className={TOMBOL_BIASA}>
              ▶
            </button>
          </div>
          <ul className="space-y-1.5" aria-label="Keping urai">
            {x.urai.map((v, i) => (
              <BarisKeping key={i} i={i} v={v} akhiran=" untuk urai" onUbah={(d) => kirim({ t: "URAI", i, d })} />
            ))}
          </ul>
          <Cek aktif={x.nol} onKlik={() => kirim({ t: "NOL" })}>
            Tulis nol
          </Cek>
          <p className={`rounded-xl p-2 text-center text-sm font-black ${st.cocok ? "bg-[#E8F7EE] text-[#14532D]" : "bg-[#F5F3FF] text-[#1C01A5]"}`} aria-live="polite">
            Jumlah kepingmu {lambangD(st.jumlah)}. {st.cocok ? `Sama dengan ${lambangD(sas)} ✓` : st.selisih > 0 ? `Masih kurang ${lambangD(st.selisih)}.` : `Kelebihan ${lambangD(-st.selisih)}.`}
          </p>
        </div>
      ) : null}
      {lihat === "urai" && st.cocok ? (
        <KalimatBesar teks={`${lambangD(sas)} = ${sukuUraian(x.urai, x.nol).join(" + ")}${kepingBaku(x.urai) ? (x.nol || !x.urai.slice(0, 3).includes(0) ? " (menurut tempat)" : " (menurut tempat; nyalakan Tulis nol untuk melihat suku 0)") : " (cara lain)"}`} warna="bg-[#E8F7EE]" />
      ) : null}

      {lihat === "uang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih uang sasaran">
            {SASARAN_UANG.map((s, i) => (
              <Pilihan key={s} aktif={x.sasaranUang === i} onKlik={() => (i !== x.sasaranUang ? kirim({ t: "SASARAN_UANG", d: 1 }) : undefined)}>
                {teksUang(s)}
              </Pilihan>
            ))}
          </div>
          <ul className="space-y-1.5" aria-label="Uang pecahan">
            {PECAHAN.map((p, i) => (
              <li key={p} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 px-2 py-1">
                <span className="w-20 shrink-0 text-sm font-black text-[#1C01A5]">{teksUang(p)}</span>
                <span className="min-w-0 flex-1 text-xs font-bold text-[#1C01A5]/60">{x.uang[i] ? `${x.uang[i]} lembar atau keping ${NAMA_PECAHAN[i]}` : ""}</span>
                <button type="button" aria-label={`Kurangi 1 uang ${teksUang(p)}`} onClick={() => kirim({ t: "UANG", i, d: -1 })} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-lg font-black leading-none text-[#1C01A5]">
                  −
                </button>
                <span className="w-6 shrink-0 text-center text-lg font-black text-[#1C01A5]">{x.uang[i]}</span>
                <button type="button" aria-label={`Tambah 1 uang ${teksUang(p)}`} onClick={() => kirim({ t: "UANG", i, d: 1 })} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black leading-none text-[#1C01A5]">
                  +
                </button>
              </li>
            ))}
          </ul>
          <p className={`rounded-xl p-2 text-center text-sm font-black ${jUang === sasUang ? "bg-[#E8F7EE] text-[#14532D]" : "bg-[#F5F3FF] text-[#1C01A5]"}`} aria-live="polite">
            Jumlah {teksUang(jUang)} dari {teksUang(sasUang)}. {jUang === sasUang ? "Pas ✓" : jUang < sasUang ? `Kurang ${teksUang(sasUang - jUang)}.` : `Lebih ${teksUang(jUang - sasUang)}.`}
          </p>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("susun");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK4B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
