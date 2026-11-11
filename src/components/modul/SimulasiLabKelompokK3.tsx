"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { Pengatur } from "./komponen-lab";
import { ejaK3 } from "./lab-tempat-k3b1";
import {
  MODE_KEL,
  REP_KEL,
  awalKel,
  hasilBagi,
  keadaanKel,
  langkahKel,
  pernyataanHabis,
  type KeadaanKel,
  type ModeKel,
  type RepKel,
} from "./lab-kelompok-k3b1";
import PanelKaliK3 from "./PanelKaliK3";
import PanelBagiK3 from "./PanelBagiK3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B1 Sub-Bab F dan G): Lab Kelompok. Satu model (kelompok dan isi,    */
/* atau bilangan dan wadah), banyak perwakilan terhubung. Logika:                 */
/* lab-kelompok-k3b1.ts. Titik polos, bukan gambar benda.                         */
/* ------------------------------------------------------------------------ */

const NAMA_REP: Record<RepKel, string> = {
  tambah: "Tambah berulang",
  kalimat: "Kalimat kali",
  garis: "Garis loncat",
  tukar: "Tukar tempat",
  kurang: "Kurang berulang",
  nama: "Nama bilangan",
  periksa: "Periksa dengan kali",
};

const CATATAN: Record<ModeKel, string[]> = {
  kali: [
    "Buat 5 kelompok isi 2, lalu 2 kelompok isi 5. Apa yang sama dan apa yang berbeda?",
    "Nyalakan Garis loncat. Berapa kali kamu meloncat, dan sepanjang apa tiap loncatan?",
    "Cari dua perkalian yang berbeda tetapi hasilnya sama, misalnya yang hasilnya 12.",
  ],
  bagi: [
    "Bagi 12 ke 3 wadah. Berapa isi tiap wadah?",
    "Bagi 13 ke 4 wadah. Apa yang tersisa, dan mengapa tidak bisa dibagi lagi?",
    "Nyalakan Periksa dengan kali. Mengapa hasil bagi dikali pembagi kembali ke bilangan awal?",
  ],
};

const TOMBOL_KECIL = "min-h-11 min-w-11 rounded-xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_2px_0_#1C01A5] active:translate-y-0.5";

export default function SimulasiLabKelompokK3({ sub, speakGuru, onKeadaan }: { sub: "F" | "G"; speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKel) => void }) {
  const modeSub = MODE_KEL[sub];
  const [x, kirim] = useReducer(langkahKel, modeSub[0], awalKel);

  useEffect(() => {
    onKeadaan?.(keadaanKel(x));
  }, [onKeadaan, x]);

  const { q, sisa } = hasilBagi(x.T, x.w);
  const ucap = () =>
    x.mode === "kali"
      ? `${x.k} kelompok, isi tiap kelompok ${x.n}. ${ejaK3(`${x.k} × ${x.n} = ${x.k * x.n}`)}.`
      : `${ejaK3(pernyataanHabis(x.T, x.w))} ${ejaK3(sisa === 0 ? `${x.T} : ${x.w} = ${q}` : `${x.T} : ${x.w} = ${q} sisa ${sisa}`)}.`;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Kelompok {x.mode === "kali" ? "Kali" : "Bagi"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {x.mode === "kali" ? "Atur banyak kelompok dan isi tiap kelompok. Titik dan kalimat ikut berubah." : "Atur bilangan yang dibagi dan banyak wadah. Titik dan kalimat ikut berubah."}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan hasilnya" onClick={() => speakGuru(ucap())} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {modeSub.length > 1 ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih mode">
            {modeSub.map((m) => (
              <Pilihan key={m} aktif={x.mode === m} onKlik={() => kirim({ t: "MODE", mode: m })}>
                {m === "kali" ? "✖️ Kali" : "➗ Bagi"}
              </Pilihan>
            ))}
          </div>
        ) : null}

        {x.mode === "kali" ? (
          <div className="grid gap-2">
            <Pengatur
              nama="Banyak kelompok"
              nilai={x.k}
              warna="#BFDBFE"
              kurangMati={false}
              tambahMati={false}
              onKurang={() => kirim({ t: "UBAH_K", d: -1 })}
              onTambah={() => kirim({ t: "UBAH_K", d: 1 })}
            />
            <Pengatur
              nama="Isi tiap kelompok"
              nilai={x.n}
              warna="#FECACA"
              kurangMati={false}
              tambahMati={false}
              onKurang={() => kirim({ t: "UBAH_N", d: -1 })}
              onTambah={() => kirim({ t: "UBAH_N", d: 1 })}
            />
          </div>
        ) : (
          <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border-2 border-[#1C01A5] bg-[#FEF3C7] px-2 py-1.5">
              <span className="min-w-0 flex-1 text-xs font-black leading-tight text-[#1C01A5]">Bilangan yang dibagi</span>
              <button type="button" aria-label="Kurangi 10 bilangan yang dibagi" className={TOMBOL_KECIL} onClick={() => kirim({ t: "UBAH_T", d: -10 })}>
                −10
              </button>
              <button type="button" aria-label="Kurangi satu bilangan yang dibagi" className={TOMBOL_KECIL} onClick={() => kirim({ t: "UBAH_T", d: -1 })}>
                −
              </button>
              <span className="min-w-[2.75rem] text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
                {x.T}
              </span>
              <button type="button" aria-label="Tambah satu bilangan yang dibagi" className={TOMBOL_KECIL} onClick={() => kirim({ t: "UBAH_T", d: 1 })}>
                +
              </button>
              <button type="button" aria-label="Tambah 10 bilangan yang dibagi" className={TOMBOL_KECIL} onClick={() => kirim({ t: "UBAH_T", d: 10 })}>
                +10
              </button>
            </div>
            <Pengatur
              nama="Banyak wadah"
              nilai={x.w}
              warna="#BFDBFE"
              kurangMati={false}
              tambahMati={false}
              onKurang={() => kirim({ t: "UBAH_W", d: -1 })}
              onTambah={() => kirim({ t: "UBAH_W", d: 1 })}
            />
          </div>
        )}

        {x.pesan ? (
          <p role="status" className="rounded-2xl border-4 border-[#E98989] bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
            ⛔ {x.pesan}
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilan</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
          {REP_KEL[x.mode].map((r) => (
            <Cek key={r} aktif={x.tampil[r]} onKlik={() => kirim({ t: "TOGGLE", rep: r })}>
              {NAMA_REP[r]}
            </Cek>
          ))}
        </div>

        {x.mode === "kali" ? <PanelKaliK3 x={x} /> : <PanelBagiK3 x={x} />}

        <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
          🔁 Reset Semua
        </button>
      </div>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN[x.mode].map((c, i) => `${["Satu", "Dua", "Tiga"][i]}, ${ejaK3(c)}`).join(" ")}`)} langkah={CATATAN[x.mode]} />
    </div>
  );
}
