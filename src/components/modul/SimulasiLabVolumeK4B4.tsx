"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK4B4 } from "./eja-k4b4";
import { Pengatur } from "./model-pecahan-k4b2";
import { BatangWadah, GelasTakar, LapisanKubus } from "./model-ukur-k4b4";
import {
  BALOK,
  GELAS_ML,
  TAKARAN_B,
  TUANG_B,
  awalVolumeK4B4B,
  hitungKubus,
  isiTuang,
  keadaanVolumeK4B4B,
  langkahVolumeK4B4B,
  titikB,
  ucapKubusK4B4B,
  ucapTakarK4B4B,
  ucapTuangK4B4B,
  volBalok,
  type KeadaanVolumeK4B4B,
} from "./lab-volume-k4b4b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K4B4 Sub-Bab B): Lab Volume. Satu alat, tiga tampilan.           */
/*  Tuang : isi wadah besar dari takaran kecil (satuan tidak baku).           */
/*  Kubus : alas baris × kolom dan lapisan; hitung kubus satuan (cm³).        */
/*  Takar : gelas takar 1.000 ml; celup balok untuk melihat cm³ = ml.         */
/* Logika: lab-volume-k4b4b.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Tuang, isi botol A dari botol B, lalu dari botol C. Mengapa banyaknya berbeda?",
  "Di Tuang, tuang lagi setelah botol penuh.",
  "Di Kubus, ubah lapisan dari 1 ke 2. Berapa kubus bertambah?",
  "Di Takar, tuang air lalu celupkan balok. Lihat muka airnya.",
];
const URUT = ["Satu", "Dua", "Tiga", "Empat"];
const TOMBOL_KECIL = "h-10 min-w-12 rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 font-black text-[#1C01A5]";
const IKON_TAKAR: Record<string, string> = { sendok: "🥄", gelas: "🥛", cangkir: "☕" };

export default function SimulasiLabVolumeK4B4({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanVolumeK4B4B) => void }) {
  const [x, kirim] = useReducer(langkahVolumeK4B4B, undefined, awalVolumeK4B4B);
  const [lihat, setLihat] = useState<"tuang" | "kubus" | "takar">("tuang");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanVolumeK4B4B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "tuang" ? ucapTuangK4B4B(x) : lihat === "kubus" ? ucapKubusK4B4B(x) : ucapTakarK4B4B(x);
  const k = TUANG_B[x.kasus];
  const isi = isiTuang(k, x.tuang);
  const naik = x.celup ? volBalok() : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Volume</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Volume = banyak satuan yang mengisi ruang sampai penuh.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK4B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "tuang"} onKlik={() => pilihTampilan("tuang")}>
          🧴 Tuang
        </Pilihan>
        <Pilihan aktif={lihat === "kubus"} onKlik={() => pilihTampilan("kubus")}>
          🧊 Kubus
        </Pilihan>
        <Pilihan aktif={lihat === "takar"} onKlik={() => pilihTampilan("takar")}>
          🥛 Takar
        </Pilihan>
      </div>

      {lihat === "tuang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih wadah dan takaran">
            {TUANG_B.map((v, i) => (
              <Pilihan key={v.id} aktif={x.kasus === i} onKlik={() => kirim({ t: "V_KASUS", i })} label={`Isi ${v.wadah} dari ${v.takar}`}>
                {v.wadah} ← {v.takar}
              </Pilihan>
            ))}
          </div>
          <div className="flex items-end justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <BatangWadah isi={isi} penuh={k.besar} takar={k.kecil} label={`${k.wadah} berisi ${x.tuang} ${k.takar}`} />
              <span className="text-xs font-black text-[#1C01A5]">{k.wadah}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BatangWadah isi={k.kecil} penuh={k.besar} takar={k.kecil} label={`Satu ${k.takar} penuh`} />
              <span className="text-xs font-black text-[#1C01A5]">1 {k.takar}</span>
            </div>
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Sudah dituang: {x.tuang} {k.takar}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label={`Tuang satu ${k.takar}`} onClick={() => kirim({ t: "V_TUANG" })} className={TOMBOL_KECIL}>
              Tuang 1 {k.takar}
            </button>
            <button type="button" aria-label="Kosongkan wadah" onClick={() => kirim({ t: "V_KOSONG" })} className={TOMBOL_KECIL}>
              Kosongkan
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "kubus" ? (
        <div className={`${KARTU} space-y-3`}>
          <p className="text-center text-xs font-black text-[#1C01A5]">Tiap kubus satuan bersisi 1 cm, volumenya 1 cm³.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="w-16 text-sm font-black text-[#1C01A5]">Baris</span>
            <Pengatur nama="baris alas" nilai={x.baris} onUbah={(d) => kirim({ t: "Q_BARIS", d })} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="w-16 text-sm font-black text-[#1C01A5]">Kolom</span>
            <Pengatur nama="kolom alas" nilai={x.kolom} onUbah={(d) => kirim({ t: "Q_KOLOM", d })} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="w-16 text-sm font-black text-[#1C01A5]">Lapisan</span>
            <Pengatur nama="lapisan" nilai={x.lapisan} onUbah={(d) => kirim({ t: "Q_LAPIS", d })} />
          </div>
          <LapisanKubus baris={x.baris} kolom={x.kolom} lapisan={x.lapisan} />
          <div className="flex justify-center">
            <button type="button" aria-label="Hitung kubus satuan" onClick={() => kirim({ t: "Q_CEK" })} className={TOMBOL_KECIL}>
              Hitung kubus
            </button>
          </div>
        </div>
      ) : null}

      {lihat === "takar" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih takaran">
            {TAKARAN_B.map((v, i) => (
              <Pilihan key={v.id} aktif={x.takar === i} onKlik={() => kirim({ t: "R_TAKAR", i })} label={`Takaran ${v.nama}`}>
                {IKON_TAKAR[v.id]} {v.nama} {v.ml} ml
              </Pilihan>
            ))}
          </div>
          <div className="flex items-end justify-center gap-3">
            <GelasTakar air={x.air} naik={naik} penuh={GELAS_ML} label={`Gelas takar: air ${x.air} ml${x.celup ? `, balok tercelup, muka air ${x.air + naik} ml` : ""}`} />
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Air {titikB(x.air)} ml{x.celup ? ` · muka air ${titikB(x.air + naik)} ml (balok ${BALOK.baris} × ${BALOK.kolom} × ${BALOK.lapisan} = ${hitungKubus(BALOK.baris, BALOK.kolom, BALOK.lapisan)} kubus)` : ""}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label={`Tuang satu ${TAKARAN_B[x.takar].nama}`} onClick={() => kirim({ t: "R_TUANG" })} className={TOMBOL_KECIL}>
              Tuang
            </button>
            <button type="button" aria-label={x.celup ? "Angkat balok" : "Celupkan balok"} onClick={() => kirim({ t: "R_CELUP" })} className={TOMBOL_KECIL}>
              {x.celup ? "Angkat balok" : "Celupkan balok"}
            </button>
            <button type="button" aria-label="Buang air" onClick={() => kirim({ t: "R_BUANG" })} className={TOMBOL_KECIL}>
              Buang air
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
          setLihat("tuang");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${URUT[i]}, ${ejaK4B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
