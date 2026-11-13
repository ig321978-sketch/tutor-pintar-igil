"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B1 } from "./eja-k6b1";
import { Pecahan, Tanda, TeksPecahan } from "./model-kali-k6b1";
import { KisiDesimal, TabelDesimal } from "./model-desimal-k6b1";
import {
  SOAL_TEMPAT,
  SOAL_UBAH,
  SOAL_URUT,
  awalDesK6B1C,
  belakangDes,
  bulatDes,
  digitDes,
  idTempat,
  idUbah,
  idUrut,
  keadaanDesK6B1C,
  langkahAktifDes,
  langkahDesK6B1C,
  nilaiUbah,
  pembilangBaru,
  sudahLangkahDes,
  tahapSelesaiDes,
  tandaUrut,
  teksDes,
  ucapTempatK6B1C,
  ucapUbahK6B1C,
  ucapUrutK6B1C,
  urutanSet,
  type AlatDes,
  type KeadaanDesK6B1C,
  type LangkahDes,
} from "./lab-desimal-k6b1c";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B1 Sub-Bab C): Lab Desimal. Satu alat, tiga tampilan.           */
/*  Ubah   : pecahan ke penyebut 10 atau 100, lalu ke desimal, dengan kisi.    */
/*  Tempat : tabel satuan, koma, persepuluhan, perseratusan.                   */
/*  Urut   : samakan angka di belakang koma, cari yang terkecil atau terbesar, lalu urutkan. */
/* Logika: lab-desimal-k6b1c.ts.                                               */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Ubah, ubah penyebut menjadi sepuluh atau seratus. Mengapa pembilang dan penyebut dikali bilangan yang sama?",
  "Di Tempat, lihat kolom persepuluhan dan perseratusan. Mengapa angka di belakang koma dibaca satu per satu?",
  "Di Urut, samakan banyak angka di belakang koma. Mengapa panjang angka bukan besar nilai?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];
const OPSI_TOMBOL = "min-h-12 min-w-16 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]";

function PilihTiga({ l, onPilih }: { l: LangkahDes; onPilih: (o: number) => void }) {
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

export default function SimulasiLabDesimalK6B1({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDesK6B1C) => void }) {
  const [x, kirim] = useReducer(langkahDesK6B1C, undefined, awalDesK6B1C);
  const [lihat, setLihat] = useState<AlatDes>("ubah");

  const pilihTampilan = (v: AlatDes) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanDesK6B1C(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "ubah" ? ucapUbahK6B1C(x) : lihat === "tempat" ? ucapTempatK6B1C(x) : ucapUrutK6B1C(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const ub = SOAL_UBAH[x.ubah.data];
  const te = SOAL_TEMPAT[x.tempat.data];
  const ur = SOAL_URUT[x.urut.data];
  const aktif = langkahAktifDes(x, lihat);
  const sd = (a: AlatDes, n: Parameters<typeof sudahLangkahDes>[2]) => sudahLangkahDes(x, a, n);
  const jawab = (alat: AlatDes) => (o: number) => aktif && kirim({ t: "JAWAB", alat, langkah: aktif.nama, o });
  const disamakan = sd("urut", "samakan");
  const urutSelesai = tahapSelesaiDes(x, "urut");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Desimal</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ubah pecahan, baca tempatnya, lalu bandingkan dan urutkan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B1(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "ubah"} onKlik={() => pilihTampilan("ubah")}>
          🔄 Ubah
        </Pilihan>
        <Pilihan aktif={lihat === "tempat"} onKlik={() => pilihTampilan("tempat")}>
          🧮 Tempat
        </Pilihan>
        <Pilihan aktif={lihat === "urut"} onKlik={() => pilihTampilan("urut")}>
          ⚖️ Urut
        </Pilihan>
      </div>

      {lihat === "ubah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal ubah">
            {SOAL_UBAH.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.ubah.data === i} onKlik={() => kirim({ t: "DATA", alat: "ubah", i })} label={`Pilih soal ubah ${s.nama}`}>
                {tanda(idUbah(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1" role="img" aria-label={ejaK6B1(`${ub.a}/${ub.b}`)}>
            <Pecahan atas={ub.a} bawah={ub.b} />
            <Tanda t="=" />
            <Pecahan atas={sd("ubah", "pemb") ? pembilangBaru(ub) : "?"} bawah={sd("ubah", "tujuan") ? ub.t : "?"} />
            <Tanda t="=" />
            <Teks t={sd("ubah", "desimal") ? teksDes(nilaiUbah(ub)) : "?"} />
          </div>
          {sd("ubah", "tujuan") ? (
            <KisiDesimal t={ub.t} terisi={sd("ubah", "pemb") ? pembilangBaru(ub) : 0} nama={ub.nama} />
          ) : (
            <p className="text-center text-sm font-black text-[#1C01A5]">Kisi sepuluh atau seratus kotak muncul setelah penyebut tujuan dipilih.</p>
          )}
          {aktif ? <PilihTiga l={aktif} onPilih={jawab("ubah")} /> : null}
        </div>
      ) : null}

      {lihat === "tempat" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal tempat">
            {SOAL_TEMPAT.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.tempat.data === i} onKlik={() => kirim({ t: "DATA", alat: "tempat", i })} label={`Pilih soal tempat ${s.nama}`}>
                {tanda(idTempat(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-3xl font-black text-[#1C01A5]">{teksDes(te.v)}</p>
          <TabelDesimal
            bulat={bulatDes(te.v)}
            p={digitDes(te.v, 1)}
            s={belakangDes(te.v) % 10 === 0 ? null : digitDes(te.v, 2)}
            sorot={te.k}
            nama={te.nama}
          />
          <p className="text-center text-sm font-black text-[#1C01A5]">Angka {te.d} yang ditandai emas.</p>
          {aktif ? <PilihTiga l={aktif} onPilih={jawab("tempat")} /> : null}
        </div>
      ) : null}

      {lihat === "urut" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal urut">
            {SOAL_URUT.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.urut.data === i} onKlik={() => kirim({ t: "DATA", alat: "urut", i })} label={`Pilih soal urut ${s.nama}`}>
                {tanda(idUrut(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2" role="img" aria-label={`Bilangan: ${ur.v.map((v) => ejaK6B1(teksDes(v, disamakan))).join(", ")}`}>
            {ur.v.map((v) => (
              <span key={v} className="rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-xl font-black text-[#1C01A5]">
                {teksDes(v, disamakan)}
              </span>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{ur.dari === "kecil" ? "Urutkan dari kecil ke besar." : "Urutkan dari besar ke kecil."}</p>
          {urutSelesai ? <p className="text-center text-lg font-black text-[#1C01A5]">{urutanSet(ur).map((v) => teksDes(v, true)).join(tandaUrut(ur))}</p> : null}
          {aktif ? <PilihTiga l={aktif} onPilih={jawab("urut")} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("ubah");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B1(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
