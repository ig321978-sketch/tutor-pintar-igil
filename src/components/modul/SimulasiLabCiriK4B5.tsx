"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B5 } from "./eja-k4b5";
import { GambarBangun, GambarJalur, PapanPaku } from "./model-bangun-k4b5";
import {
  KELOMPOK,
  KELOMPOK_KENALI,
  KENALI,
  MODE_PILAH,
  NAMA_KENALI,
  PILAH,
  UKURAN_PAPAN,
  awalCiriK4B5A,
  keadaanCiriK4B5A,
  langkahCiriK4B5A,
  modeAktif,
  ucapKenaliK4B5A,
  ucapPakuK4B5A,
  ucapPilahK4B5A,
  type KeadaanCiriK4B5A,
  type Pilahan,
} from "./lab-ciri-k4b5a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B5 Sub-Bab A): Lab Ciri. Satu alat, tiga tampilan.             */
/*  Paku   : pasang karet di papan paku, lab menghitung ciri dan nama bangun. */
/*  Pilah  : kelompokkan bangun menurut sudut, sisi, atau beraturan.          */
/*  Kenali : segi banyak atau bukan, dan namanya menurut banyak sisi.         */
/* Logika: lab-ciri-k4b5a.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Paku, bentuk persegi panjang, lalu persegi. Apa bedanya menurut lab?",
  "Di Paku, pasang karet di tiga paku segaris.",
  "Di Pilah, ganti ke pilahan sisi. Segitiga mana yang sama kaki?",
  "Di Kenali, mengapa lingkaran bukan segi banyak?",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const LABEL_MODE: Record<string, string> = { sudut: "📐 Sudut", sisi: "📏 Sisi", beraturan: "✅ Beraturan" };

function KartuBangun({
  pilihan,
  i,
  label,
  onKetuk,
  nama = (k) => k,
  children,
}: {
  pilihan: Pilahan;
  i: number;
  label: string;
  onKetuk: () => void;
  nama?: (k: string) => string;
  children: React.ReactNode;
}) {
  const kelompok = pilihan.letak[i];
  const letak = kelompok === null ? null : nama(kelompok);
  const dipilih = pilihan.dipilih === i;
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={dipilih}
      onClick={onKetuk}
      className={`flex flex-col items-center rounded-xl border-4 p-1 ${dipilih ? "border-[#F0AB00] bg-[#FFF3C4]" : "border-[#1C01A5]/30 bg-white"}`}
    >
      {children}
      <span className="min-h-4 text-[11px] font-black leading-tight text-[#1C01A5]">{letak ?? "…"}</span>
    </button>
  );
}

export default function SimulasiLabCiriK4B5({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanCiriK4B5A) => void }) {
  const [x, kirim] = useReducer(langkahCiriK4B5A, undefined, awalCiriK4B5A);
  const [lihat, setLihat] = useState<"paku" | "pilah" | "kenali">("paku");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanCiriK4B5A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "paku" ? ucapPakuK4B5A(x) : lihat === "pilah" ? ucapPilahK4B5A(x) : ucapKenaliK4B5A(x);
  const m = modeAktif(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Ciri</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ciri bangun dilihat dari sisi, sudut, dan sisi sejajar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "paku"} onKlik={() => pilihTampilan("paku")}>
          📌 Paku
        </Pilihan>
        <Pilihan aktif={lihat === "pilah"} onKlik={() => pilihTampilan("pilah")}>
          🗂️ Pilah
        </Pilihan>
        <Pilihan aktif={lihat === "kenali"} onKlik={() => pilihTampilan("kenali")}>
          🔍 Kenali
        </Pilihan>
      </div>

      {lihat === "paku" ? (
        <div className={`${KARTU} space-y-3`}>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk paku satu per satu untuk memasang karet. Ketuk paku pertama (jingga) untuk menutup karet. Ketuk paku terakhir untuk melepasnya.</p>
          <PapanPaku ukuran={UKURAN_PAPAN} paku={x.paku} onKetuk={(i) => kirim({ t: "P_PAKU", i })} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Karet melewati {x.paku.length} paku</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Lepas paku terakhir" onClick={() => kirim({ t: "P_HAPUS" })} className={TOMBOL_KECIL}>
              ↩️ Lepas
            </button>
            <button type="button" aria-label="Lepas semua karet" onClick={() => kirim({ t: "P_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Kosongkan
            </button>
            <button type="button" aria-label="Tutup karet dan periksa ciri" onClick={() => kirim({ t: "P_CEK" })} className={TOMBOL_KECIL}>
              Tutup dan periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "pilah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ciri pemilah">
            {MODE_PILAH.map((v, i) => (
              <Pilihan key={v} aktif={x.mode === i} onKlik={() => kirim({ t: "S_MODE", m: i })} label={`Pilah menurut ${v}`}>
                {LABEL_MODE[v]}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">
            Ketuk satu bangun, lalu ketuk kelompoknya.{m === "sudut" ? " Bandingkan sudut terbesarnya dengan pojok buku." : " Angka di tepi adalah panjang sisi dalam cm."}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {PILAH[m].map((b, i) => (
              <KartuBangun key={b.id} pilihan={x.pilah} i={i} label={`Bangun ${i + 1}${x.pilah.letak[i] ? `, di kelompok ${x.pilah.letak[i]}` : ""}`} onKetuk={() => kirim({ t: "S_PILIH", i })}>
                <GambarBangun sisi={b.sisi} sudut={b.sudut} label={m !== "sudut"} w={84} h={70} />
              </KartuBangun>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Kelompok">
            {KELOMPOK[m].map((k) => (
              <button key={k} type="button" aria-label={`Masukkan ke kelompok ${k}`} onClick={() => kirim({ t: "S_KE", k })} className={TOMBOL_KECIL}>
                {k}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Ulangi pilahan" onClick={() => kirim({ t: "S_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
            <button type="button" aria-label="Periksa pilahan" onClick={() => kirim({ t: "S_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "kenali" ? (
        <div className={`${KARTU} space-y-3`}>
          <p className="text-center text-xs font-black text-[#1C01A5]">Segi banyak tertutup dan dibatasi ruas garis lurus. Ketuk satu gambar, lalu ketuk kelompoknya.</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {KENALI.map((g, i) => (
              <KartuBangun
                key={g.id}
                pilihan={x.kenali}
                i={i}
                label={`Gambar ${i + 1}${x.kenali.letak[i] ? `, di kelompok ${NAMA_KENALI[x.kenali.letak[i] as string]}` : ""}`}
                onKetuk={() => kirim({ t: "K_PILIH", i })}
                nama={(k) => NAMA_KENALI[k]}
              >
                <GambarJalur titik={g.titik} lengkung={g.lengkung} w={72} h={72} />
              </KartuBangun>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Kelompok gambar">
            {KELOMPOK_KENALI.map((k) => (
              <button key={k} type="button" aria-label={`Masukkan ke kelompok ${NAMA_KENALI[k]}`} onClick={() => kirim({ t: "K_KE", k })} className={TOMBOL_KECIL}>
                {NAMA_KENALI[k]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Ulangi pengelompokan gambar" onClick={() => kirim({ t: "K_ULANG" })} className={TOMBOL_KECIL}>
              🔁 Ulangi
            </button>
            <button type="button" aria-label="Periksa pengelompokan gambar" onClick={() => kirim({ t: "K_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("paku");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
