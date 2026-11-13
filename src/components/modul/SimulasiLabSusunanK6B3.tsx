"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B3 } from "./eja-k6b3";
import { KisiLantai, PilihTiga, Tumpukan } from "./model-susunan-k6b3";
import {
  SOAL_LAPISAN,
  SOAL_PENYANGGA,
  SOAL_SUSUN,
  awalSusunanK6B3A,
  dasarLapisan,
  idLapisan,
  idPenyangga,
  idSusun,
  keadaanSusunanK6B3A,
  kubusLapisan,
  kubusPenyangga,
  kubusSusun,
  langkahSusunanK6B3A,
  melayangPenyangga,
  opsiDasarLapisan,
  opsiHitungSusun,
  opsiKurangSusun,
  opsiMelayang,
  opsiPutusan,
  opsiSisaLapisan,
  opsiTotalLapisan,
  opsiTotalPenyangga,
  opsiUraiSusun,
  soalLapisan,
  soalPenyangga,
  soalSusun,
  totalSusun,
  ucapLapisanK6B3A,
  ucapPenyanggaK6B3A,
  ucapSusunK6B3A,
  type KeadaanSusunanK6B3A,
  type Petak,
} from "./lab-susunan-k6b3a";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B3 Sub-Bab A): Lab Susunan. Satu alat, tiga tampilan.           */
/*  Susun     : hitung kubus, cari yang kurang, urai satu lantai.              */
/*  Lapisan   : kubus satu lantai, seluruh kubus, sisa sesudah satu lantai lepas. */
/*  Penyangga : kubus lantai kedua tidak boleh melayang.                       */
/* Logika: lab-susunan-k6b3a.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Susun, hitung kubus lantai demi lantai. Mengapa kubus yang tertutup tetap dihitung?",
  "Di Lapisan, kalikan kubus satu lantai dengan banyak lantai. Mengapa tidak cukup menghitung satu lantai?",
  "Di Penyangga, cari kubus yang melayang. Apa yang harus ditambah agar susunannya sah?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];

const lebarKisi = (lantai: readonly Petak[]) => Math.max(1, ...lantai.map((p) => p[0] + 1));
const tinggiKisi = (lantai: readonly Petak[]) => Math.max(1, ...lantai.map((p) => p[1] + 1));

export default function SimulasiLabSusunanK6B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusunanK6B3A) => void }) {
  const [x, kirim] = useReducer(langkahSusunanK6B3A, undefined, awalSusunanK6B3A);
  const [lihat, setLihat] = useState<"susun" | "lapisan" | "penyangga">("susun");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanSusunanK6B3A(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "susun" ? ucapSusunK6B3A(x) : lihat === "lapisan" ? ucapLapisanK6B3A(x) : ucapPenyanggaK6B3A(x);
  const su = soalSusun(x);
  const la = soalLapisan(x);
  const pe = soalPenyangga(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const susunP = Math.max(...su.lantai.map(lebarKisi));
  const susunL = Math.max(...su.lantai.map(tinggiKisi));
  const bawahP = Math.max(lebarKisi(pe.bawah), lebarKisi(pe.atas));
  const bawahL = Math.max(tinggiKisi(pe.bawah), tinggiKisi(pe.atas));
  const mela = pe.atas.filter((p) => !pe.bawah.some((q) => q[0] === p[0] && q[1] === p[1]));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Susunan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Susun kubus, hitung per lantai, dan jaga penyangganya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "susun"} onKlik={() => pilihTampilan("susun")}>
          🧱 Susun
        </Pilihan>
        <Pilihan aktif={lihat === "lapisan"} onKlik={() => pilihTampilan("lapisan")}>
          📚 Lapisan
        </Pilihan>
        <Pilihan aktif={lihat === "penyangga"} onKlik={() => pilihTampilan("penyangga")}>
          ⬇️ Penyangga
        </Pilihan>
      </div>

      {lihat === "susun" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal susun">
            {SOAL_SUSUN.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.susun.data === i} onKlik={() => kirim({ t: "S_DATA", i })} label={`Pilih soal susun ${s.nama}`}>
                {tanda(idSusun(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {su.nama}: {su.lantai.length} lantai. Target: {su.namaTarget}.
          </p>
          <Tumpukan kubus={kubusSusun(su)} label={`${su.nama}, ${su.lantai.length} lantai`} />
          <div className="flex flex-wrap items-end justify-center gap-3">
            {su.lantai.map((f, k) => (
              <KisiLantai key={k} nama={`Lantai ${k + 1}`} lantai={f} ke={k} p={susunP} l={susunL} />
            ))}
          </div>
          {x.susun.tahap >= 1 ? <p className="text-center text-sm font-black text-[#1C01A5]">Sudah ada {totalSusun(su)} kubus. Kebutuhan {su.namaTarget}: {su.target} kubus.</p> : null}
          {x.susun.tahap === 0 ? <PilihTiga judul="Berapa seluruh kubus yang sudah tersusun, termasuk yang tertutup?" awalan="Seluruh kubus" opsi={opsiHitungSusun(x.susun.data).opsi} onPilih={(o) => kirim({ t: "S_HITUNG", o })} /> : null}
          {x.susun.tahap === 1 ? <PilihTiga judul={`Berapa kubus yang kurang untuk ${su.namaTarget}?`} awalan="Kubus kurang" opsi={opsiKurangSusun(x.susun.data).opsi} onPilih={(o) => kirim({ t: "S_KURANG", o })} /> : null}
          {x.susun.tahap === 2 ? <PilihTiga judul="Lantai teratas diurai. Berapa kubus yang masih tersusun?" awalan="Kubus tersisa" opsi={opsiUraiSusun(x.susun.data).opsi} onPilih={(o) => kirim({ t: "S_URAI", o })} /> : null}
        </div>
      ) : null}

      {lihat === "lapisan" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal lapisan">
            {SOAL_LAPISAN.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.lapisan.data === i} onKlik={() => kirim({ t: "L_DATA", i })} label={`Pilih soal lapisan ${s.nama}`}>
                {tanda(idLapisan(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Balok penuh {la.p} × {la.l} × {la.t}.
          </p>
          <Tumpukan kubus={kubusLapisan(la)} label={`Balok ${la.p} kali ${la.l} kali ${la.t}`} />
          {x.lapisan.tahap >= 1 ? <p className="text-center text-sm font-black text-[#1C01A5]">Satu lantai: {dasarLapisan(la)} kubus.</p> : null}
          {x.lapisan.tahap === 0 ? <PilihTiga judul={`Berapa kubus pada satu lantai berukuran ${la.p} × ${la.l}?`} awalan="Kubus satu lantai" opsi={opsiDasarLapisan(x.lapisan.data).opsi} onPilih={(o) => kirim({ t: "L_DASAR", o })} /> : null}
          {x.lapisan.tahap === 1 ? <PilihTiga judul={`Balok setinggi ${la.t} lantai penuh. Berapa seluruh kubusnya?`} awalan="Seluruh kubus" opsi={opsiTotalLapisan(x.lapisan.data).opsi} onPilih={(o) => kirim({ t: "L_TOTAL", o })} /> : null}
          {x.lapisan.tahap === 2 ? <PilihTiga judul="Satu lantai dilepas. Berapa kubus yang masih tersusun?" awalan="Kubus tersisa" opsi={opsiSisaLapisan(x.lapisan.data).opsi} onPilih={(o) => kirim({ t: "L_SISA", o })} /> : null}
        </div>
      ) : null}

      {lihat === "penyangga" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal penyangga">
            {SOAL_PENYANGGA.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.penyangga.data === i} onKlik={() => kirim({ t: "P_DATA", i })} label={`Pilih soal penyangga ${s.nama}`}>
                {tanda(idPenyangga(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {pe.nama}: lantai dasar {pe.bawah.length} kubus, lantai kedua {pe.atas.length} kubus. Garis putus merah menandai kubus tanpa kubus di bawahnya.
          </p>
          <Tumpukan kubus={kubusPenyangga(pe)} melayang={mela.map((p) => [p[0], p[1], 1] as const)} label={`${pe.nama}, ${melayangPenyangga(pe)} kubus melayang`} />
          <div className="flex flex-wrap items-end justify-center gap-3">
            <KisiLantai nama="Lantai 1" lantai={pe.bawah} ke={0} p={bawahP} l={bawahL} />
            <KisiLantai nama="Lantai 2" lantai={pe.atas} ke={1} p={bawahP} l={bawahL} merah={mela} />
          </div>
          {x.penyangga.tahap === 0 ? <PilihTiga judul="Berapa kubus lantai kedua yang melayang?" awalan="Kubus melayang" opsi={opsiMelayang(x.penyangga.data).opsi} onPilih={(o) => kirim({ t: "P_MELAYANG", o })} /> : null}
          {x.penyangga.tahap === 1 ? <PilihTiga judul="Apa keputusan untuk susunan ini?" awalan="Keputusan" opsi={opsiPutusan(x.penyangga.data).opsi} onPilih={(o) => kirim({ t: "P_PUTUSAN", o })} /> : null}
          {x.penyangga.tahap === 2 ? <PilihTiga judul="Berapa seluruh kubus sesudah susunan sah, termasuk yang tertutup?" awalan="Seluruh kubus" opsi={opsiTotalPenyangga(x.penyangga.data).opsi} onPilih={(o) => kirim({ t: "P_TOTAL", o })} /> : null}
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

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
