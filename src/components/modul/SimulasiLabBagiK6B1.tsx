"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B1 } from "./eja-k6b1";
import { Pecahan, Tanda, TeksPecahan } from "./model-kali-k6b1";
import { Angka, BatangPotong } from "./model-bagi-k6b1";
import {
  SOAL_MUAT,
  SOAL_POTONG,
  SOAL_SILANG,
  awalBagiK6B1B,
  hasilMuat,
  hasilPotong,
  hasilSilang,
  idMuat,
  idPotong,
  idSilang,
  keadaanBagiK6B1B,
  langkahAktifBagi,
  langkahBagiK6B1B,
  sederhanaTeks,
  sudahLangkah,
  tahapSelesai,
  ucapMuatK6B1B,
  ucapPotongK6B1B,
  ucapSilangK6B1B,
  type AlatBagi,
  type KeadaanBagiK6B1B,
  type LangkahBagi,
} from "./lab-bagi-k6b1b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B1 Sub-Bab B): Lab Bagi Pecahan. Satu alat, tiga tampilan.      */
/*  Potong : pecahan : asli, tiap potongan dipotong lagi.                      */
/*  Silang : pembagi dibalik, bagi menjadi kali, atas kali atas, bawah kali bawah. */
/*  Muat   : asli : pecahan, berapa kali muat, lalu dicek dengan perkalian.    */
/* Logika: lab-bagi-k6b1b.ts.                                                  */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Potong, potong tiap potongan lagi. Mengapa penyebutnya menjadi lebih besar?",
  "Di Silang, balik pembagi lalu kalikan. Mengapa pembagian bisa diganti perkalian?",
  "Di Muat, bagilah bilangan asli dengan pecahan kecil. Mengapa hasilnya lebih besar dari bilangan awal?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

function PilihTiga({ l, onPilih }: { l: LangkahBagi; onPilih: (o: number) => void }) {
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{l.judul}</p>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={l.judul}>
        {l.opsi.map((v, o) => (
          <button key={v} type="button" aria-label={`${l.awalan} ${ejaK6B1(v)}`} onClick={() => onPilih(o)} className={OPSI_TOMBOL}>
            <TeksPecahan teks={v} />
          </button>
        ))}
      </div>
    </div>
  );
}

const Teks = ({ t }: { t: string }) => <span className="px-1 text-2xl font-black text-[#1C01A5]">{t}</span>;

export default function SimulasiLabBagiK6B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBagiK6B1B) => void }) {
  const [x, kirim] = useReducer(langkahBagiK6B1B, undefined, awalBagiK6B1B);
  const [lihat, setLihat] = useState<AlatBagi>("potong");

  const pilihTampilan = (v: AlatBagi) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanBagiK6B1B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "potong" ? ucapPotongK6B1B(x) : lihat === "silang" ? ucapSilangK6B1B(x) : ucapMuatK6B1B(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const po = SOAL_POTONG[x.potong.data];
  const si = SOAL_SILANG[x.silang.data];
  const mu = SOAL_MUAT[x.muat.data];
  const aktif = langkahAktifBagi(x, lihat);
  const sd = (a: AlatBagi, n: Parameters<typeof sudahLangkah>[2]) => sudahLangkah(x, a, n);
  const [poAtas, poBawah] = hasilPotong(po);
  const [siAtas, siBawah] = hasilSilang(si);
  const [muAtas, muBawah] = hasilMuat(mu);
  const jawab = (alat: AlatBagi) => (o: number) => aktif && kirim({ t: "JAWAB", alat, langkah: aktif.nama, o });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Bagi Pecahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Potong, balik lalu silang, dan hitung berapa kali muat.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "potong"} onKlik={() => pilihTampilan("potong")}>
          ✂️ Potong
        </Pilihan>
        <Pilihan aktif={lihat === "silang"} onKlik={() => pilihTampilan("silang")}>
          ✖️ Silang
        </Pilihan>
        <Pilihan aktif={lihat === "muat"} onKlik={() => pilihTampilan("muat")}>
          🥤 Muat
        </Pilihan>
      </div>

      {lihat === "potong" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal potong">
            {SOAL_POTONG.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.potong.data === i} onKlik={() => kirim({ t: "DATA", alat: "potong", i })} label={`Pilih soal potong ${s.nama}`}>
                {tanda(idPotong(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={ejaK6B1(`${po.a}/${po.b} : ${po.c}`)}>
            <Pecahan atas={po.a} bawah={po.b} />
            <Tanda t=":" />
            <Teks t={String(po.c)} />
            <Tanda t="=" />
            <Pecahan atas={sd("potong", "pemb") ? poAtas : "?"} bawah={sd("potong", "peny") ? poBawah : "?"} />
            {tahapSelesai(x, "potong") && sederhanaTeks(poAtas, poBawah) !== `${poAtas}/${poBawah}` ? (
              <>
                <Tanda t="=" />
                <TeksPecahan teks={sederhanaTeks(poAtas, poBawah)} />
              </>
            ) : null}
          </div>
          <BatangPotong a={po.a} b={po.b} c={po.c} dipotong={sd("potong", "peny")} nama={po.nama} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {sd("potong", "peny") ? `Tiap kotak dipotong menjadi ${po.c} bagian sama. Satu dari ${po.c} bagian sama berwarna ungu.` : `Batang ini menunjukkan ${po.a}/${po.b}. Potong tiap kotak menjadi ${po.c} bagian sama.`}
          </p>
          {aktif ? <PilihTiga l={aktif} onPilih={jawab("potong")} /> : null}
        </div>
      ) : null}

      {lihat === "silang" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal silang">
            {SOAL_SILANG.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.silang.data === i} onKlik={() => kirim({ t: "DATA", alat: "silang", i })} label={`Pilih soal silang ${s.nama}`}>
                {tanda(idSilang(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={ejaK6B1(`${si.a}/${si.b} : ${si.p}/${si.q}`)}>
            <Angka atas={si.a} bawah={si.b} />
            <Tanda t=":" />
            <Angka atas={si.p} bawah={si.q} />
          </div>
          {sd("silang", "balik") ? (
            <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={`${ejaK6B1(`${si.a}/${si.b}`)} kali ${ejaK6B1(`${si.q}/${si.p}`)}`}>
              <Angka atas={si.a} bawah={si.b} />
              <Tanda t="×" />
              <Pecahan atas={si.q} bawah={si.p} kotak />
              <Tanda t="=" />
              <Pecahan atas={sd("silang", "atas") ? siAtas : "?"} bawah={sd("silang", "bawah") ? siBawah : "?"} />
              {tahapSelesai(x, "silang") && sederhanaTeks(siAtas, siBawah) !== `${siAtas}/${siBawah}` ? (
                <>
                  <Tanda t="=" />
                  <TeksPecahan teks={sederhanaTeks(siAtas, siBawah)} />
                </>
              ) : null}
            </div>
          ) : null}
          <p className="text-center text-sm font-black text-[#1C01A5]">Panah silang: balik pembagi, lalu kali. Atas dikali atas, bawah dikali bawah.</p>
          {aktif ? <PilihTiga l={aktif} onPilih={jawab("silang")} /> : null}
        </div>
      ) : null}

      {lihat === "muat" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal muat">
            {SOAL_MUAT.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.muat.data === i} onKlik={() => kirim({ t: "DATA", alat: "muat", i })} label={`Pilih soal muat ${s.nama}`}>
                {tanda(idMuat(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={ejaK6B1(`${mu.w} : ${mu.p}/${mu.q}`)}>
            <Teks t={String(mu.w)} />
            <Tanda t=":" />
            <Pecahan atas={mu.p} bawah={mu.q} />
            <Tanda t="=" />
            {sd("muat", "hasil") ? <TeksPecahan teks={sederhanaTeks(muAtas, muBawah)} /> : <Teks t="?" />}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            Berapa kali {mu.p}/{mu.q} muat pada {mu.w}?
          </p>
          {aktif ? <PilihTiga l={aktif} onPilih={jawab("muat")} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("potong");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
