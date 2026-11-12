"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B4 } from "./eja-k4b4";
import { Pengatur } from "./model-pecahan-k4b2";
import { KisiSel } from "./model-ukur-k4b4";
import {
  KISI_BARIS,
  KISI_KOLOM,
  UBIN,
  awalLuasK4B4A,
  keadaanLuasK4B4A,
  langkahLuasK4B4A,
  luasArsir,
  opsiUbah,
  petaMeja,
  selKosong,
  titik,
  ucapKisiK4B4A,
  ucapTutupK4B4A,
  ucapUbahK4B4A,
  type KeadaanLuasK4B4A,
} from "./lab-luas-k4b4a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B4 Sub-Bab A): Lab Luas. Satu alat, tiga tampilan.             */
/*  Tutup : tutup meja dengan ubin tanpa celah dan tanpa bertumpuk.           */
/*  Kisi  : arsir sel 1 cm di kertas berpetak, luas = banyak sel.             */
/*  Ubah  : m² ke cm² dan sebaliknya.                                         */
/* Logika: lab-luas-k4b4a.ts.                                                 */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tutup, tutup meja dengan kartu, lalu dengan origami. Mengapa banyaknya berbeda?",
  "Di Tutup, coba taruh ubin di atas ubin lain.",
  "Di Kisi, buat dua bangun berbeda bentuk yang luasnya sama.",
  "Di Ubah, pilih jawaban 100 untuk 1 m². Apa kata lab?",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const IKON_UBIN: Record<string, string> = { kartu: "🟦", uang: "💵", origami: "🟨" };

export default function SimulasiLabLuasK4B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLuasK4B4A) => void }) {
  const [x, kirim] = useReducer(langkahLuasK4B4A, undefined, awalLuasK4B4A);
  const [lihat, setLihat] = useState<"tutup" | "kisi" | "ubah">("tutup");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanLuasK4B4A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tutup" ? ucapTutupK4B4A(x) : lihat === "kisi" ? ucapKisiK4B4A(x) : ucapUbahK4B4A(x);
  const u = UBIN[x.ubin];
  const peta = petaMeja(u, x.pasang);
  const kosong = selKosong(u, x.pasang);
  const n = luasArsir(x.arsir);
  const opsi = opsiUbah(x.arah, x.n);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Luas</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Luas = banyak persegi satuan yang menutup permukaan tanpa celah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tutup"} onKlik={() => pilihTampilan("tutup")}>
          🟧 Tutup
        </Pilihan>
        <Pilihan aktif={lihat === "kisi"} onKlik={() => pilihTampilan("kisi")}>
          🔲 Kisi
        </Pilihan>
        <Pilihan aktif={lihat === "ubah"} onKlik={() => pilihTampilan("ubah")}>
          🔄 Ubah
        </Pilihan>
      </div>

      {lihat === "tutup" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ubin penutup">
            {UBIN.map((v, i) => (
              <Pilihan key={v.id} aktif={x.ubin === i} onKlik={() => kirim({ t: "T_UBIN", i })} label={`Ubin ${v.nama}`}>
                {IKON_UBIN[v.id]} {v.nama} ({v.lebar} × {v.tinggi} kotak)
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk kotak meja untuk menaruh {u.nama}. Kotak yang diketuk menjadi pojok kiri atas ubin.</p>
          <KisiSel
            isi={peta}
            label="Meja 4 baris, 6 kotak tiap baris"
            labelSel={(r, c) => `Kotak meja baris ${r + 1} kolom ${c + 1}`}
            onKetuk={(r, c) => kirim({ t: "T_TARUH", r, c })}
            ukuran={44}
            warnaUbin
          />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {x.pasang.length} {u.nama} terpasang · {kosong} kotak kosong
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Angkat ubin terakhir" onClick={() => kirim({ t: "T_HAPUS" })} className={TOMBOL_KECIL}>
              ↩️ Angkat
            </button>
            <button type="button" aria-label="Periksa tutupan meja" onClick={() => kirim({ t: "T_CEK" })} className={TOMBOL_KECIL}>
              Periksa
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "kisi" ? (
        <div className={`${KARTU} space-y-3`}>
          <p className="text-center text-xs font-black text-[#1C01A5]">Tiap persegi bersisi 1 cm, luasnya 1 cm². Ketuk sel untuk mengarsir atau menghapus.</p>
          <KisiSel
            isi={x.arsir.map((b) => b.map((v) => (v ? 1 : 0)))}
            label={`Kertas berpetak ${KISI_BARIS} baris, ${KISI_KOLOM} persegi tiap baris`}
            labelSel={(r, c) => `Sel baris ${r + 1} kolom ${c + 1}`}
            onKetuk={(r, c) => kirim({ t: "K_SEL", r, c })}
          />
          <p className="text-center text-sm font-black text-[#1C01A5]">Diarsir: {n} persegi</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Hapus semua arsiran" onClick={() => kirim({ t: "K_BERSIH" })} className={TOMBOL_KECIL}>
              🧽 Hapus
            </button>
            <button type="button" aria-label="Periksa luas bangun" onClick={() => kirim({ t: "K_CEK" })} className={TOMBOL_KECIL}>
              Periksa luas
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "ubah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih arah ubah">
            <Pilihan aktif={x.arah === "m2"} onKlik={() => kirim({ t: "U_ARAH", arah: "m2" })} label="Ubah m² ke cm²">
              m² → cm²
            </Pilihan>
            <Pilihan aktif={x.arah === "cm2"} onKlik={() => kirim({ t: "U_ARAH", arah: "cm2" })} label="Ubah cm² ke m²">
              cm² → m²
            </Pilihan>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-black text-[#1C01A5]">Banyak m²</span>
            <Pengatur nama="banyak meter persegi" nilai={x.n} onUbah={(d) => kirim({ t: "U_N", d })} />
          </div>
          <div className="flex flex-wrap items-end justify-center gap-2" role="img" aria-label={`${x.n} persegi bersisi 1 m, tiap sisi 100 cm`}>
            {Array.from({ length: x.n }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[10px] font-black text-[#1C01A5]">100 cm</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-black text-[#1C01A5] [writing-mode:vertical-rl]">100 cm</span>
                  <div className="h-14 w-14 border-4 border-[#1C01A5] bg-[#FFE566]" />
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-2xl font-black text-[#1C01A5]">{x.arah === "m2" ? `${x.n} m² = … cm²` : `${titik(x.n * 10000)} cm² = … m²`}</p>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih hasil ubah">
            {opsi.map((v) => (
              <button key={v} type="button" aria-label={`Jawab ${titik(v)}`} onClick={() => kirim({ t: "U_JAWAB", nilai: v })} className={TOMBOL_KECIL}>
                {titik(v)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("tutup");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
