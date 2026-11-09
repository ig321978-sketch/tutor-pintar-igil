"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BERAT, BERAT_SATUAN, NAMA_SATUAN, NAMA, kalimatRel, relBenda, relBerat, susunOpsi, type BeratId, type Rel, type SatuanId } from "./data-k2b6";
import { BendaB6, NeracaBenda, Tumpukan, miringDariRel } from "./dasar-k2b6";

/* ------------------------------------------------------------------------ */
/* Permainan Concrete Sub-Bab A (Berat) yang memakai benda nyata: dua tangan,  */
/* jungkat-jungkit, gantungan baju, dan menimbang dengan satuan tidak baku.    */
/* Kunci dihitung dari tabel berat (data-k2b6.ts). Tanpa API dan tanpa acak.   */
/* ------------------------------------------------------------------------ */

const NAMA_RAPI = (id: BeratId) => NAMA[id];

/** Tiga pilihan hubungan dua benda: A lebih berat, B lebih berat, atau sama berat. Urutan tetap berpindah menurut `nomor`. */
export function opsiBanding(a: BeratId, b: BeratId, nomor: number): { opsi: string[]; jawab: number } {
  const r = relBenda(a, b);
  const benarTeks = r === "lebih berat" ? `${NAMA_RAPI(a)} lebih berat` : r === "lebih ringan" ? `${NAMA_RAPI(b)} lebih berat` : "Sama berat";
  const semua = [`${NAMA_RAPI(a)} lebih berat`, `${NAMA_RAPI(b)} lebih berat`, "Sama berat"];
  const pengecoh = semua.filter((t) => t !== benarTeks) as [string, string];
  return susunOpsi(benarTeks, pengecoh, nomor);
}

/** Kalimat penjelasan setelah jawaban benar. */
export const penjelasBanding = (a: BeratId, b: BeratId): string => kalimatRel(NAMA_RAPI(a), relBenda(a, b), NAMA_RAPI(b));

/** Petunjuk bila jawaban salah, tanpa membocorkan kunci. */
export const petunjukBanding = (a: BeratId, b: BeratId): string =>
  relBenda(a, b) === "sama berat"
    ? "Lihat kedua sisi. Kalau datar, artinya sama berat."
    : "Lihat sisi yang turun. Sisi yang turun memuat benda yang lebih berat.";

/* ------------------------------ A1. Angkat dengan dua tangan ------------------------------ */

type Pasang = [BeratId, BeratId];

/** Dua tangan mengangkat dua benda. Tangan dengan benda lebih berat turun lebih rendah. */
export function TanganAngkat({ pasangan, nomorAwal = 0, onBeres, pesanBeres }: { pasangan: Pasang[]; nomorAwal?: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [terangkat, setTerangkat] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= pasangan.length;
  const [a, b] = pasangan[Math.min(nomor, pasangan.length - 1)];
  const r = relBenda(a, b);
  const o = opsiBanding(a, b, nomorAwal + nomor);
  const geser = (sisi: "kiri" | "kanan"): number => {
    if (!terangkat || r === "sama berat") return 0;
    const kiriBerat = r === "lebih berat";
    const sisiBerat = (sisi === "kiri") === kiriBerat;
    return sisiBerat ? 22 : -14;
  };
  const rasa = (sisi: "kiri" | "kanan"): string => {
    if (!terangkat) return "";
    if (r === "sama berat") return "terasa sama";
    return (sisi === "kiri") === (r === "lebih berat") ? "terasa berat" : "terasa ringan";
  };

  const pilih = (i: number) => {
    if (i !== o.jawab) {
      setKeliru(i);
      setKabar({ teks: petunjukBanding(a, b), ok: false });
      return;
    }
    setKeliru(null);
    if (nomor + 1 >= pasangan.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${penjelasBanding(a, b)} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: penjelasBanding(a, b), ok: true });
      setNomor(nomor + 1);
      setTerangkat(false);
    }
  };

  const tangan = (sisi: "kiri" | "kanan", id: BeratId) => (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs font-black text-[#1C01A5]/75">Tangan {sisi}</p>
      <div className="flex h-[150px] w-full flex-col items-center justify-start pt-5">
        <div className="flex flex-col items-center transition-transform duration-700 ease-out" style={{ transform: `translateY(${geser(sisi)}px)` }}>
          <BendaB6 id={id} ukuran={54} />
          <span className="text-5xl leading-none" aria-hidden="true">
            🤲
          </span>
          <span className="mt-0.5 min-h-[18px] text-xs font-black text-[#1C01A5]">{rasa(sisi)}</span>
        </div>
      </div>
      <p className="text-center text-sm font-black text-[#1C01A5]">{NAMA_RAPI(id)}</p>
    </div>
  );

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Pasangan {nomor + 1} dari {pasangan.length}
            </p>
            <div className="grid grid-cols-2 gap-2 rounded-3xl border-4 border-[#1C01A5] bg-[#EEF2FF] px-2 py-2">
              {tangan("kiri", a)}
              {tangan("kanan", b)}
            </div>
            {terangkat ? (
              <>
                <CatatanPensil pendek="Mana yang lebih berat?" />
                <PilihanTeks opsi={o.opsi} keliru={keliru} onPilih={pilih} />
              </>
            ) : (
              <button type="button" onClick={() => setTerangkat(true)} className={`${TOMBOL_BESAR} w-full`}>
                ✋ Angkat dua-duanya
              </button>
            )}
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A2. Jungkat-jungkit ------------------------------ */

/** Taruh dua benda pada dua piringan. Piringan yang berisi benda lebih berat turun. */
export function JungkatLab({ a, b, nomor, onBeres, pesanBeres }: { a: BeratId; b: BeratId; nomor: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<BeratId | null>(null);
  const [kiri, setKiri] = useState<BeratId | null>(null);
  const [kanan, setKanan] = useState<BeratId | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const o = opsiBanding(a, b, nomor);
  const dua = kiri !== null && kanan !== null;
  const miring = ((): -1 | 0 | 1 => {
    if (dua) return miringDariRel(relBenda(kiri, kanan));
    if (kiri !== null) return -1;
    if (kanan !== null) return 1;
    return 0;
  })();
  const sisa = [a, b].filter((x) => x !== kiri && x !== kanan);

  const taruh = (sisi: "kiri" | "kanan") => {
    if (!dipilih) return;
    if (sisi === "kiri" && kiri === null) setKiri(dipilih);
    else if (sisi === "kanan" && kanan === null) setKanan(dipilih);
    else return;
    setDipilih(null);
  };
  const ulang = () => {
    setKiri(null);
    setKanan(null);
    setDipilih(null);
    setKeliru(null);
  };
  const pilih = (i: number) => {
    if (i !== o.jawab) {
      setKeliru(i);
      setKabar({ teks: petunjukBanding(a, b), ok: false });
      return;
    }
    setSelesai(true);
    setKabar(null);
    letusan.picu();
    ucap(`${penjelasBanding(a, b)} ${pesanBeres}`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <NeracaBenda
          miring={miring}
          kiri={kiri ? <BendaB6 id={kiri} ukuran={42} /> : null}
          kanan={kanan ? <BendaB6 id={kanan} ukuran={42} /> : null}
          label={`Jungkat-jungkit. Kiri: ${kiri ? NAMA_RAPI(kiri) : "kosong"}. Kanan: ${kanan ? NAMA_RAPI(kanan) : "kosong"}.`}
        />
        {!dua ? (
          <>
            <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#1C01A5]/40 bg-white/80 px-2 py-2" role="group" aria-label="Benda yang belum ditimbang">
              {sisa.map((id) => (
                <button key={id} type="button" aria-label={NAMA_RAPI(id)} aria-pressed={dipilih === id} onClick={() => setDipilih(dipilih === id ? null : id)} className={`flex flex-col items-center rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1 ${dipilih === id ? "ring-4 ring-[#F0AB00]" : ""}`}>
                  <BendaB6 id={id} ukuran={40} />
                  <span className="text-xs font-black text-[#1C01A5]">{NAMA_RAPI(id)}</span>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" aria-label="Taruh di piringan kiri" disabled={!dipilih || kiri !== null} onClick={() => taruh("kiri")} className={TOMBOL_BESAR}>
                ⬅ Piringan kiri
              </button>
              <button type="button" aria-label="Taruh di piringan kanan" disabled={!dipilih || kanan !== null} onClick={() => taruh("kanan")} className={TOMBOL_BESAR}>
                Piringan kanan ➡
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk benda, lalu ketuk piringan tempat menaruhnya.</p>
          </>
        ) : selesai ? (
          <Berhasil>{`${penjelasBanding(a, b)} ${pesanBeres}`}</Berhasil>
        ) : (
          <>
            <CatatanPensil pendek="Mana yang lebih berat?" />
            <PilihanTeks opsi={o.opsi} keliru={keliru} onPilih={pilih} />
            <button type="button" onClick={ulang} className={`${TOMBOL_PUTIH} w-full`}>
              ↺ Tukar tempat
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A3. Gantungan baju (tebak lalu buktikan) ------------------------------ */

/** Pilih tebakan dulu. Setelah memilih, gantungan dilepas dan miringnya membuktikan jawabannya. */
export function GantunganTebak({ pasangan, nomorAwal = 0, onBeres, pesanBeres }: { pasangan: Pasang[]; nomorAwal?: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [lepas, setLepas] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= pasangan.length;
  const [a, b] = pasangan[Math.min(nomor, pasangan.length - 1)];
  const o = opsiBanding(a, b, nomorAwal + nomor);

  const pilih = (i: number) => {
    setLepas(true);
    if (i !== o.jawab) {
      setKeliru(i);
      setKabar({ teks: `Tebakanmu belum tepat. Lihat gantungannya. ${petunjukBanding(a, b)}`, ok: false });
      return;
    }
    setKeliru(null);
    if (nomor + 1 >= pasangan.length) {
      setKabar(null);
      letusan.picu();
      ucap(`Tebakanmu tepat. ${penjelasBanding(a, b)} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: `Tebakanmu tepat. ${penjelasBanding(a, b)}`, ok: true });
      setNomor(nomor + 1);
      setLepas(false);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Tebakan {nomor + 1} dari {pasangan.length}
            </p>
            <NeracaBenda
              varian="gantung"
              miring={lepas ? miringDariRel(relBenda(a, b)) : 0}
              kiri={<BendaB6 id={a} ukuran={44} />}
              kanan={<BendaB6 id={b} ukuran={44} />}
              label={`Gantungan baju. Kiri: ${NAMA_RAPI(a)}. Kanan: ${NAMA_RAPI(b)}. ${lepas ? "Gantungan sudah dilepas." : "Gantungan masih ditahan datar."}`}
            />
            <CatatanPensil pendek="Tebak dulu: mana yang lebih berat?" teks="Tebak dulu. Mana yang lebih berat? Setelah kamu memilih, gantungan akan dilepas." />
            <PilihanTeks opsi={o.opsi} keliru={keliru} onPilih={pilih} />
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A6. Timbang dengan satuan tidak baku ------------------------------ */

/** Tambah satuan di piringan kanan sampai neraca seimbang dengan benda di piringan kiri. */
export function TimbangSatuan({ benda, satuan, target, onBeres, pesanBeres }: { benda: BeratId; satuan: SatuanId; target: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [n, setN] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const maks = Math.min(24, target + 4);
  const beratKanan = n * BERAT_SATUAN[satuan];
  const r: Rel = relBerat(BERAT[benda], beratKanan);
  const miring = miringDariRel(r);

  const ubah = (baru: number) => {
    if (selesai || baru < 0 || baru > maks) return;
    setN(baru);
    const rr = relBerat(BERAT[benda], baru * BERAT_SATUAN[satuan]);
    if (rr === "sama berat") {
      setSelesai(true);
      setKabar(null);
      letusan.picu();
      ucap(`Seimbang! ${NAMA_RAPI(benda)} sama berat dengan ${baru} ${NAMA_SATUAN[satuan]}. ${pesanBeres}`);
      onBeres();
    } else if (rr === "lebih ringan") {
      setKabar({ teks: `Sisi ${NAMA_SATUAN[satuan]} sekarang lebih berat. Kurangi satu.`, ok: false });
    } else if (baru > 0) {
      setKabar({ teks: `Sisi ${NAMA_RAPI(benda)} masih lebih berat. Tambah lagi.`, ok: true });
    } else {
      setKabar(null);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <CatatanPensil pendek={`Seimbangkan ${NAMA_RAPI(benda)} dengan ${NAMA_SATUAN[satuan]}`} />
        <NeracaBenda
          miring={miring}
          kiri={<BendaB6 id={benda} ukuran={50} />}
          kanan={<Tumpukan id={satuan} n={n} />}
          label={`Neraca. Kiri: ${NAMA_RAPI(benda)}. Kanan: ${n} ${NAMA_SATUAN[satuan]}. ${r === "sama berat" ? "Seimbang." : r === "lebih berat" ? "Sisi kiri turun." : "Sisi kanan turun."}`}
        />
        <div className="flex items-center justify-center gap-3" role="group" aria-label={`Banyak ${NAMA_SATUAN[satuan]}`}>
          <button type="button" aria-label={`Kurangi ${NAMA_SATUAN[satuan]}`} disabled={selesai || n <= 0} onClick={() => ubah(n - 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
            −
          </button>
          <span className="flex h-14 min-w-16 items-center justify-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 text-4xl font-black text-[#1C01A5]" aria-live="polite">
            {n}
          </span>
          <button type="button" aria-label={`Tambah ${NAMA_SATUAN[satuan]}`} disabled={selesai || n >= maks} onClick={() => ubah(n + 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
            +
          </button>
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">{NAMA_SATUAN[satuan]}</p>
        {selesai ? <Berhasil>{`${NAMA_RAPI(benda)} sama berat dengan ${n} ${NAMA_SATUAN[satuan]}. ${pesanBeres}`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} bicara={false} />
    </>
  );
}
