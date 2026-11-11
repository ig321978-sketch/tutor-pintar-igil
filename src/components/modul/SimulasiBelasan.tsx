"use client";

import React, { useEffect, useRef, useState } from "react";
import type { KeadaanBelasan } from "./misi-bab6";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, ejaHitung } from "./komponen-lab";
import {
  awalBelasan,
  batasB,
  hasilBelasan,
  kalimatBelasan,
  kalimatPecah,
  kalimatPeriksa,
  maksAwal,
  minAwal,
  rapikanBelasan,
  satuanDari,
  tabelBelasan,
  ucapanBelasan,
  type Belasan,
  type OpBelasan,
} from "./lab-belasan-bab6";

/* ------------------------------------------------------------------------ */
/* Laboratorium Belasan (Bab 6, Sub-Bab B dan C), metode PhET.                */
/* Menjumlah atau mengurang bilangan belasan dengan satuan: satu puluhan      */
/* tetap, hanya satuan yang berubah. Perwakilan: benda (lambang), tabel nilai */
/* tempat, pasangan bilangan, dan periksa (pengurangan). Logika di            */
/* lab-belasan-bab6.ts. Tanpa jaringan.                                       */
/* ------------------------------------------------------------------------ */

export type TampilBelasan = "benda" | "tabel" | "pecah" | "periksa";
export const SEMUA_TAMPIL_BELASAN: TampilBelasan[] = ["benda", "tabel", "pecah", "periksa"];

const LABEL: Record<TampilBelasan, string> = { benda: "Benda", tabel: "Tabel nilai tempat", pecah: "Pasangan bilangan", periksa: "Periksa" };

function langkahCoba(op: OpBelasan, tampil: TampilBelasan[]): string[] {
  const ada = (k: TampilBelasan) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("benda") || ada("tabel")) hasil.push(op === "tambah" ? "Tekan plus pada Ditambah. Bagian mana yang berubah, puluhan atau satuan?" : "Tekan plus pada Dikurangi. Bagian mana yang berubah, puluhan atau satuan?");
  if (ada("pecah")) hasil.push(op === "tambah" ? "Ganti Bilangan awal. Lihat bilangan itu dipisah menjadi sepuluh dan satuannya." : "Ganti Bilangan awal. Lihat satuan mana yang dikurangi, dan apa yang terjadi pada sepuluh.");
  if (ada("periksa") && op === "kurang") hasil.push("Lihat kalimat periksa. Apakah hasilnya kembali ke bilangan awal?");
  hasil.push(op === "tambah" ? "Cari pasangan yang hasilnya 19. Berapa bilangan awal dan penambahnya?" : "Cari pasangan yang hasilnya 10. Berapa bilangan awal dan pengurangnya?");
  return hasil.slice(0, 4);
}

function Titik({ warna, pudar = false }: { warna: string; pudar?: boolean }) {
  return <span className={`h-4 w-4 rounded-full border-2 ${pudar ? "border-dashed border-[#1C01A5]/40 bg-white opacity-60" : "border-[#1C01A5]"}`} style={pudar ? undefined : { backgroundColor: warna }} />;
}

export default function SimulasiBelasan({ speakGuru, op, tampil = SEMUA_TAMPIL_BELASAN, onKeadaan }: { speakGuru: (t: string) => void; op: OpBelasan; tampil?: TampilBelasan[]; /** Melapor keadaan ke papan misi (bila ada). */ onKeadaan?: (k: KeadaanBelasan) => void }) {
  const [m, setM] = useState<Belasan>(() => awalBelasan(op));
  const [lihatMentah, setLihat] = useState<Record<TampilBelasan, boolean>>({ benda: true, tabel: true, pecah: true, periksa: true });
  const tersedia = (Object.keys(LABEL) as TampilBelasan[]).filter((k) => tampil.includes(k) && (k !== "periksa" || op === "kurang"));
  const lihat = (k: TampilBelasan) => tampil.includes(k) && lihatMentah[k] && (k !== "periksa" || op === "kurang");
  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  const [fBenda, fTabel, fPecah, fPeriksa] = (["benda", "tabel", "pecah", "periksa"] as const).map((k) => lihat(k));
  useEffect(() => {
    lapor.current?.({ alat: "belasan", op, a: m.a, b: m.b, benda: fBenda, tabel: fTabel, pecah: fPecah, periksa: fPeriksa });
  }, [op, m.a, m.b, fBenda, fTabel, fPecah, fPeriksa]);
  const h = hasilBelasan(m, op);
  const s = satuanDari(m.a);
  const coba = langkahCoba(op, tampil);
  const tanda = op === "tambah" ? "+" : "−";
  const atur = (x: Belasan) => setM(rapikanBelasan(x, op));
  const reset = () => {
    setM(awalBelasan(op));
    setLihat({ benda: true, tabel: true, pecah: true, periksa: true });
  };
  const ucapan = ucapanBelasan(m, op, { tabel: lihat("tabel"), pecah: lihat("pecah"), periksa: lihat("periksa") });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{op === "tambah" ? "Menjumlah Belasan dan Satuan" : "Mengurang Belasan dan Satuan"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Satu puluhan tetap. Hanya satuan yang berubah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan hitungan ini" onClick={() => speakGuru(ejaHitung(ucapan))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <KalimatBesar teks={kalimatBelasan(m, op)} warna="bg-[#FFE566]" />
        <Pengatur nama="Bilangan awal" nilai={m.a} onKurang={() => atur({ ...m, a: m.a - 1 })} onTambah={() => atur({ ...m, a: m.a + 1 })} kurangMati={m.a <= minAwal(op)} tambahMati={m.a >= maksAwal(op)} />
        <Pengatur
          nama={op === "tambah" ? "Ditambah" : "Dikurangi"}
          nilai={m.b}
          warna="#DBEAFE"
          onKurang={() => atur({ ...m, b: m.b - 1 })}
          onTambah={() => atur({ ...m, b: m.b + 1 })}
          kurangMati={m.b <= 1}
          tambahMati={m.b >= batasB(m.a, op)}
        />
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

      {lihat("benda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Satu puluhan dan satuan lepas</p>
          <div className="flex flex-wrap items-center justify-center gap-3" role="img" aria-label={`Satu puluhan, ${s} satuan lepas, ${op === "tambah" ? `ditambah ${m.b}` : `${m.b} dikurangi`}`}>
            <div className="grid grid-cols-5 gap-1 rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] p-1.5" aria-label="Satu puluhan">
              {Array.from({ length: 10 }, (_, i) => (
                <Titik key={i} warna="#3B82F6" />
              ))}
            </div>
            <div className="flex max-w-[210px] flex-wrap items-center justify-center gap-1">
              {Array.from({ length: s }, (_, i) => {
                const diambil = op === "kurang" && i >= s - m.b;
                return <Titik key={`s${i}`} warna="#EF4444" pudar={diambil} />;
              })}
              {op === "tambah" ? Array.from({ length: m.b }, (_, i) => <Titik key={`t${i}`} warna="#16A34A" />) : null}
            </div>
          </div>
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">
            {op === "tambah" ? "Titik merah: satuan awal. Titik hijau: satuan yang ditambah." : "Titik merah: satuan yang tinggal. Titik putus-putus: satuan yang dikurangi."}
          </p>
        </div>
      ) : null}

      {lihat("tabel") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel nilai tempat</p>
          <div className="mx-auto grid w-full max-w-[320px] grid-cols-3 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel nilai tempat sebelum dan sesudah">
            <p role="columnheader" className="bg-[#F5F3FF] py-1 text-center text-sm font-black text-[#1C01A5]">Bilangan</p>
            <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-sm font-black text-[#7F1D1D]">Puluhan</p>
            <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-sm font-black text-[#1E3A8A]">Satuan</p>
            {tabelBelasan(m, op).map((r, i) => (
              <React.Fragment key={i}>
                <p role="cell" className="border-t-4 border-[#1C01A5] py-2 text-center text-2xl font-black text-[#1C01A5]">{r.nama}</p>
                <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-2 text-center text-3xl font-black text-[#1C01A5]">{r.puluhan}</p>
                <p role="cell" className={`border-l-4 border-t-4 border-[#1C01A5] py-2 text-center text-3xl font-black text-[#1C01A5] ${i === 1 ? "bg-[#FFF7CC]" : ""}`}>{r.satuan}</p>
              </React.Fragment>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Puluhannya tetap 1. Satuannya berubah dari {s} menjadi {satuanDari(h)}.</p>
        </div>
      ) : null}

      {lihat("pecah") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pasangan bilangan</p>
          {kalimatPecah(m, op).map((k, i) => (
            <KalimatBesar key={i} teks={k} warna={i === 1 ? "bg-[#FFE566]" : "bg-[#FFF7CC]"} />
          ))}
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Pisahkan sepuluh, hitung satuannya, lalu gabungkan lagi.</p>
        </div>
      ) : null}

      {lihat("periksa") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Periksa dengan penjumlahan</p>
          <KalimatBesar teks={kalimatPeriksa(m)} warna="bg-[#DCFCE7]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Hasil {h} ditambah {m.b} kembali ke {m.a}. Berarti {m.a} {tanda} {m.b} = {h} sudah benar.
          </p>
        </div>
      ) : null}

      {coba.length > 0 ? (
        <CobaIni
          judul="Coba ini!"
          onDengar={() => speakGuru(ejaHitung(`Coba ini. ${coba.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${c}`).join(" ")}`))}
          langkah={coba}
        />
      ) : null}
    </div>
  );
}
