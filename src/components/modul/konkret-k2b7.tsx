"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, PilihanAngka, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BendaB7, Koleksi, LepasBanyak, Wadah } from "./dasar-k2b7";
import { BENDA_INFO, opsiBilangan, type BendaId } from "./data-k2b7";

/* ------------------------------------------------------------------------ */
/* Permainan Concrete Sub-Bab A (Bab 7) yang memakai benda nyata: mengisi satu   */
/* wadah dengan sepuluh benda, merakit bilangan dari wadah penuh dan benda      */
/* lepas, dan mengikat sepuluh-sepuluh. Tanpa API dan tanpa acak.               */
/* ------------------------------------------------------------------------ */

/* ------------------------------ A1. Isi satu wadah dengan sepuluh benda ------------------------------ */

/** Masukkan benda satu per satu sampai wadah berisi sepuluh. Sepuluh satuan sama dengan satu puluhan. */
export function IsiBungkus({ benda, onBeres, pesanBeres }: { benda: BendaId; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const info = BENDA_INFO[benda];
  const [n, setN] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const penuh = n >= 10;

  const ubah = (baru: number) => {
    if (penuh || baru < 0 || baru > 10) return;
    setN(baru);
    if (baru === 10) {
      setKabar(null);
      letusan.picu();
      ucap(`Sepuluh ${info.nama}. Sepuluh satuan sama dengan satu puluhan, jadi satu ${info.wadah} adalah satu puluhan. ${pesanBeres}`);
      onBeres();
    } else if (baru > 0) {
      setKabar({ teks: `${baru} ${info.nama}. Masih kurang ${10 - baru} lagi.`, ok: true });
    } else {
      setKabar(null);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <CatatanPensil pendek={`Isi satu ${info.wadah} dengan sepuluh ${info.nama}`} />
        <div className="flex flex-col items-center gap-1">
          <div className={`flex w-[250px] flex-wrap content-center justify-center gap-1.5 rounded-3xl border-4 px-2 py-2 ${penuh ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5] bg-white"}`} role="img" aria-label={`${info.wadah} berisi ${n} ${info.nama}`}>
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${i < n ? "igil-muncul" : "bg-[#1C01A5]/10"}`}>
                {i < n ? <BendaB7 id={benda} ukuran={34} /> : null}
              </span>
            ))}
          </div>
          <p className="text-sm font-black text-[#1C01A5]">{penuh ? `1 ${info.wadah} = 1 puluhan` : `${info.wadah} berisi ${n} dari 10`}</p>
        </div>
        <div className="flex items-center justify-center gap-3" role="group" aria-label={`Banyak ${info.nama} di dalam ${info.wadah}`}>
          <button type="button" aria-label={`Keluarkan satu ${info.nama}`} disabled={penuh || n <= 0} onClick={() => ubah(n - 1)} className={`${TOMBOL_PUTIH} h-14 w-14 !px-0 text-3xl`}>
            −
          </button>
          <span className="flex h-14 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-2 text-4xl font-black text-[#1C01A5]" aria-live="polite">
            {n}
          </span>
          <button type="button" aria-label={`Masukkan satu ${info.nama}`} disabled={penuh || n >= 10} onClick={() => ubah(n + 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
            +
          </button>
        </div>
        {penuh ? <Berhasil>{`${info.wadah} sudah penuh: sepuluh ${info.nama} sama dengan 1 puluhan. ${pesanBeres}`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} bicara={false} />
    </>
  );
}

/* ------------------------------ A4. Rakit bilangan ------------------------------ */

/** Tambah wadah penuh (puluhan) dan benda lepas (satuan) sampai sama dengan bilangan yang diminta. */
export function RakitBilangan({ benda, target, onBeres, pesanBeres }: { benda: BendaId; target: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const info = BENDA_INFO[benda];
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const periksa = (np: number, ns: number, catatan: string | null) => {
    setP(np);
    setS(ns);
    const nilai = np * 10 + ns;
    if (nilai === target) {
      setSelesai(true);
      setKabar(null);
      letusan.picu();
      ucap(`${np} puluhan dan ${ns} satuan sama dengan ${np * 10} tambah ${ns}, yaitu ${target}. ${pesanBeres}`);
      onBeres();
      return;
    }
    if (catatan) setKabar({ teks: catatan, ok: true });
    else if (nilai > target) setKabar({ teks: `Sekarang sudah ${nilai}, melebihi ${target}. Kurangi dulu.`, ok: false });
    else setKabar(null);
  };
  const tambahPuluh = () => {
    if (!selesai && p < 10) periksa(p + 1, s, null);
  };
  const kurangPuluh = () => {
    if (!selesai && p > 0) periksa(p - 1, s, null);
  };
  const tambahSatu = () => {
    if (selesai) return;
    if (s === 9) {
      if (p < 10) periksa(p + 1, 0, `Sepuluh ${info.nama} lepas dimasukkan ke dalam satu ${info.wadah}, jadi menjadi satu puluhan.`);
      return;
    }
    periksa(p, s + 1, null);
  };
  const kurangSatu = () => {
    if (!selesai && s > 0) periksa(p, s - 1, null);
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <CatatanPensil pendek={`Rakit ${target} ${info.nama}`} teks={`Rakit bilangan ${target}. Tambahkan ${info.wadah} penuh berisi sepuluh dan ${info.nama} lepas sampai banyaknya ${target}.`} />
        <div className="flex min-h-[120px] items-end justify-center rounded-3xl border-4 border-dashed border-[#1C01A5]/40 bg-white px-2 py-2">
          {p === 0 && s === 0 ? <span className="text-base font-black text-[#1C01A5]/40">Belum ada benda</span> : <Koleksi p={p} s={s} benda={benda} ukuran={50} />}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          {p} puluhan dan {s} satuan
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" aria-label={`Tambah satu ${info.wadah} penuh`} disabled={selesai || p >= 10} onClick={tambahPuluh} className={`${TOMBOL_BESAR} !px-1 !text-sm`}>
            ＋ 1 {info.wadah} (10)
          </button>
          <button type="button" aria-label={`Tambah satu ${info.nama} lepas`} disabled={selesai} onClick={tambahSatu} className={`${TOMBOL_BESAR} !px-1 !text-sm`}>
            ＋ 1 {info.satu}
          </button>
          <button type="button" aria-label={`Kurangi satu ${info.wadah} penuh`} disabled={selesai || p <= 0} onClick={kurangPuluh} className={`${TOMBOL_PUTIH} !px-1 !text-sm`}>
            − 1 {info.wadah}
          </button>
          <button type="button" aria-label={`Kurangi satu ${info.nama} lepas`} disabled={selesai || s <= 0} onClick={kurangSatu} className={`${TOMBOL_PUTIH} !px-1 !text-sm`}>
            − 1 {info.satu}
          </button>
        </div>
        {selesai ? <Berhasil>{`${p} puluhan dan ${s} satuan sama dengan ${target}. ${pesanBeres}`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} bicara={false} />
    </>
  );
}

/* ------------------------------ A5. Ikat sepuluh ------------------------------ */

/** Ikat benda lepas sepuluh-sepuluh. Setelah tidak bisa diikat lagi, pilih banyak benda seluruhnya. */
export function IkatSepuluh({ benda, n, nomor, onBeres, pesanBeres }: { benda: BendaId; n: number; nomor: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const info = BENDA_INFO[benda];
  const [lepas, setLepas] = useState(n);
  const [ikat, setIkat] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const bisaIkat = lepas >= 10;
  const opsi = opsiBilangan(n, nomor);

  const ikatSepuluh = () => {
    if (!bisaIkat) return;
    setLepas(lepas - 10);
    setIkat(ikat + 1);
    setKabar({ teks: `Sepuluh ${info.nama} diikat menjadi satu ${info.wadah}. Sudah ${ikat + 1} puluhan.`, ok: true });
  };
  const pilih = (x: number) => {
    if (x !== n) {
      setKeliru(x);
      setKabar({ teks: `Belum tepat. Ada ${ikat} puluhan, yaitu ${ikat * 10}. Lalu tambahkan ${lepas} yang lepas.`, ok: false });
      return;
    }
    setKeliru(null);
    setSelesai(true);
    setKabar(null);
    letusan.picu();
    ucap(`${ikat} puluhan dan ${lepas} satuan sama dengan ${ikat * 10} tambah ${lepas}, yaitu ${n}. ${pesanBeres}`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <CatatanPensil pendek={`Ikat ${info.nama} sepuluh-sepuluh`} teks={`Ada ${info.nama} yang berserakan. Ikat setiap sepuluh menjadi satu ${info.wadah}, lalu hitung semuanya.`} />
        {ikat > 0 ? (
          <div className="flex flex-wrap items-end justify-center gap-1" role="group" aria-label={`${ikat} ${info.wadah} penuh`}>
            {Array.from({ length: ikat }, (_, i) => (
              <span key={i} className="igil-muncul">
                <Wadah benda={benda} ukuran={ikat > 3 ? 40 : 50} />
              </span>
            ))}
          </div>
        ) : null}
        {lepas > 0 ? (
          <div className="flex justify-center">
            <LepasBanyak n={lepas} benda={benda} ukuran={lepas > 30 ? 18 : 22} />
          </div>
        ) : null}
        {bisaIkat ? (
          <button type="button" aria-label="Ikat sepuluh benda" onClick={ikatSepuluh} className={`${TOMBOL_BESAR} w-full`}>
            🎀 Ikat sepuluh
          </button>
        ) : selesai ? (
          <Berhasil>{`${ikat} puluhan dan ${lepas} satuan sama dengan ${n}. ${pesanBeres}`}</Berhasil>
        ) : (
          <>
            <p className="rounded-xl bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black text-[#1C01A5]">
              {ikat} puluhan dan {lepas} lepas
            </p>
            <CatatanPensil pendek={`Berapa banyak ${info.nama} seluruhnya?`} />
            <PilihanAngka opsi={opsi} keliru={keliru} onPilih={pilih} />
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} bicara={false} />
    </>
  );
}
