"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { GambarTurus, LambangSvg } from "./diagram-k2b8";
import type { Lambang } from "./data-k2b8";

/* ------------------------------------------------------------------------ */
/* Mesin permainan Matematika Kelas 2 Bab 8 (Berbagai Diagram):                 */
/*  - CatatData: data datang satu per satu, siswa mencatatnya sebagai turus     */
/*    atau gambar pada baris jenisnya (alur survei kelas).                      */
/*  - GambarDiagram: mengisi lambang pada tiap baris sampai sama dengan data.   */
/*  - IsiBanyak: melengkapi kolom banyaknya pada diagram.                       */
/* Gambar diberikan dari luar lewat props. Tanpa API dan tanpa acak.            */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Mencatat data satu per satu ------------------------------ */

export type KategoriCatat = { id: string; nama: string; ikon: string; warna: string };

/**
 * Data muncul satu per satu sebagai gambar benda. Siswa mengetuk baris jenis yang cocok, lalu satu garis turus
 * (atau satu gambar) ditulis pada baris itu. Garis kelima mencoret miring. Setelah selesai, banyak tiap baris tampil.
 */
export function CatatData({
  kategori,
  aliran,
  lambang,
  onBeres,
  pesanBeres,
}: {
  kategori: KategoriCatat[];
  aliran: string[];
  lambang: "turus" | "ikon";
  onBeres: () => void;
  pesanBeres: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [idx, setIdx] = useState(0);
  const [hitung, setHitung] = useState<Record<string, number>>({});
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const selesai = idx >= aliran.length;
  const sekarang = selesai ? null : (kategori.find((k) => k.id === aliran[idx]) ?? null);

  const catat = (id: string) => {
    if (selesai || !sekarang) return;
    if (id !== sekarang.id) {
      setKeliru(id);
      const salah = kategori.find((k) => k.id === id);
      setKabar({ teks: `Belum tepat. Gambar yang muncul adalah ${sekarang.nama}, bukan ${salah?.nama ?? "itu"}. Ketuk baris ${sekarang.nama}.`, ok: false });
      return;
    }
    setKeliru(null);
    const n = (hitung[id] ?? 0) + 1;
    const baru = { ...hitung, [id]: n };
    setHitung(baru);
    const berikut = idx + 1;
    setIdx(berikut);
    if (berikut >= aliran.length) {
      setKabar(null);
      letusan.picu();
      const ringkas = kategori.map((k) => `${k.nama} ${baru[k.id] ?? 0}`).join(", ");
      ucap(`Semua data sudah dicatat. ${ringkas}. ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: lambang === "turus" ? (n % 5 === 0 ? `${sekarang.nama}: garis kelima mencoret miring.` : `${sekarang.nama}: satu garis ditulis.`) : `${sekarang.nama}: satu gambar ditempel.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {selesai ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-2 text-center" aria-live="polite">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Data ke-{idx + 1} dari {aliran.length}
            </p>
            <span className="text-6xl leading-none" role="img" aria-label={`Data sekarang: ${sekarang?.nama ?? ""}`}>
              {sekarang?.ikon}
            </span>
          </div>
        )}
        <CatatanPensil pendek={selesai ? "Diagram sudah selesai" : "Ketuk baris untuk jenis ini"} />
        <div className="space-y-1.5" role="group" aria-label="Baris diagram">
          {kategori.map((k) => {
            const n = hitung[k.id] ?? 0;
            return (
              <button
                key={`${k.id}-${keliru === k.id ? "x" : "o"}`}
                type="button"
                aria-label={`Catat ${k.nama}`}
                disabled={selesai}
                onClick={() => catat(k.id)}
                className={`grid w-full grid-cols-[88px_1fr_28px] items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5 text-left shadow-[0_3px_0_rgba(28,1,165,0.22)] active:translate-y-0.5 ${keliru === k.id ? "igil-goyang" : ""}`}
              >
                <span className="flex items-center gap-1 text-xs font-black text-[#1C01A5]">
                  <span aria-hidden="true" className="text-xl leading-none">
                    {k.ikon}
                  </span>
                  {k.nama}
                </span>
                <span className="flex min-h-[28px] items-center">
                  {lambang === "turus" ? (
                    n > 0 ? <GambarTurus n={n} tinggi={26} /> : null
                  ) : (
                    <span className="flex flex-wrap gap-[2px]">
                      {Array.from({ length: n }, (_, i) => (
                        <span key={i} aria-hidden="true" className="text-lg leading-none">
                          {k.ikon}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <span className="text-center text-lg font-black text-[#1C01A5]">{selesai ? n : ""}</span>
              </button>
            );
          })}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Mengisi lambang pada diagram ------------------------------ */

export type BarisGambar = { id: string; nama: string; n: number; warna: string; kiri?: React.ReactNode; ikon?: string };
export type SelGambar = { jenis: Lambang } | "ikon";

/**
 * Tiap baris punya sel kosong. Mengetuk sel ke-k mengisi lambang sampai sel itu (mengetuk sel terakhir yang terisi
 * mengosongkannya satu). Tekan Periksa bila semua baris sudah sama banyak dengan datanya.
 */
export function GambarDiagram({
  baris,
  sel,
  maks,
  tanya,
  onBeres,
  pesanBeres,
}: {
  baris: BarisGambar[];
  sel: SelGambar;
  maks: number;
  tanya: string;
  onBeres: () => void;
  pesanBeres: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [isi, setIsi] = useState<Record<string, number>>({});
  const [kabar, setKabar] = useState<Kabar>(null);
  const [selesai, setSelesai] = useState(false);
  const letusan = useLetusan();

  const ketuk = (id: string, k: number) => {
    if (selesai) return;
    const sekarang = isi[id] ?? 0;
    setIsi({ ...isi, [id]: sekarang === k ? k - 1 : k });
    setKabar(null);
  };

  const periksa = () => {
    const salah = baris.find((b) => (isi[b.id] ?? 0) !== b.n);
    if (salah) {
      const v = isi[salah.id] ?? 0;
      setKabar({ teks: v < salah.n ? `Baris ${salah.nama} masih kurang gambar. Hitung lagi datanya.` : `Baris ${salah.nama} terlalu banyak gambar. Hitung lagi datanya.`, ok: false });
      return;
    }
    setSelesai(true);
    setKabar(null);
    letusan.picu();
    ucap(pesanBeres);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <CatatanPensil pendek={tanya} />
        <div className="space-y-1.5">
          {baris.map((b) => {
            const terisi = isi[b.id] ?? 0;
            return (
              <div key={b.id} className="rounded-2xl border-2 border-[#1C01A5]/40 bg-white px-2 py-1.5">
                <div className="flex items-center justify-between gap-2 pb-1">
                  <span className="text-xs font-black text-[#1C01A5]">{b.nama}</span>
                  {b.kiri ? <span className="flex justify-end">{b.kiri}</span> : null}
                </div>
                <div className="flex gap-[3px]" role="group" aria-label={`Baris ${b.nama}`}>
                  {Array.from({ length: maks }, (_, i) => {
                    const k = i + 1;
                    const penuh = k <= terisi;
                    return (
                      <button
                        key={k}
                        type="button"
                        aria-label={`Isi ${b.nama} sampai ${k}`}
                        aria-pressed={penuh}
                        disabled={selesai}
                        onClick={() => ketuk(b.id, k)}
                        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border-2 ${penuh ? "border-[#1C01A5] bg-[#FFF7CC]" : "border-dashed border-[#1C01A5]/40 bg-white"}`}
                      >
                        {penuh ? sel === "ikon" ? <span className="text-lg leading-none">{b.ikon}</span> : <LambangSvg jenis={sel.jenis} warna={b.warna} ukuran={22} /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {selesai ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <button type="button" aria-label="Periksa diagram" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
            Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Melengkapi kolom banyaknya ------------------------------ */

export type BarisIsi = { id: string; nama: string; visual: React.ReactNode; jawab: number };

/** Tabel dengan tiga kolom (nama, gambar, banyaknya). Baris yang menyala menunggu kartu bilangan yang tepat. */
export function IsiBanyak({
  judul,
  kolom,
  baris,
  kartu,
  onBeres,
  pesanBeres,
}: {
  judul: string;
  kolom: [string, string, string];
  baris: BarisIsi[];
  kartu: number[];
  onBeres: () => void;
  pesanBeres: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [terisi, setTerisi] = useState<string[]>([]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const aktif = baris.find((b) => !terisi.includes(b.id)) ?? null;
  const selesai = aktif === null;

  const pilih = (n: number) => {
    if (!aktif) return;
    if (n !== aktif.jawab) {
      setKeliru(n);
      setKabar({ teks: `Belum tepat. Hitung gambar pada baris ${aktif.nama} satu per satu.`, ok: false });
      return;
    }
    setKeliru(null);
    const baru = [...terisi, aktif.id];
    setTerisi(baru);
    if (baru.length === baris.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${aktif.nama} ada ${n}. ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: `${aktif.nama} ada ${n}.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <p className="text-center text-xs font-black text-[#1C01A5]">{judul}</p>
        <table className="w-full border-collapse overflow-hidden rounded-xl bg-white text-sm font-black text-[#1C01A5]">
          <thead>
            <tr>
              {kolom.map((k) => (
                <th key={k} className="border border-[#A78BFA]/70 bg-[#EDE9FE] px-2 py-1.5 text-center text-xs font-black">
                  {k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {baris.map((b) => {
              const sudah = terisi.includes(b.id);
              const menyala = aktif?.id === b.id;
              return (
                <tr key={b.id} className={menyala ? "bg-[#FFF7CC]" : ""}>
                  <td className="border border-[#A78BFA]/70 px-2 py-1.5">{b.nama}</td>
                  <td className="border border-[#A78BFA]/70 px-2 py-1.5">{b.visual}</td>
                  <td className={`border border-[#A78BFA]/70 px-2 py-1.5 text-center text-lg ${menyala ? "outline outline-4 -outline-offset-4 outline-[#F0AB00]" : ""}`} aria-label={sudah ? `${b.nama}: ${b.jawab}` : menyala ? `${b.nama}: kotak menyala, isi dengan kartu` : `${b.nama}: belum`}>
                    {sudah ? b.jawab : "…"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {selesai ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <CatatanPensil pendek={`Berapa banyaknya pada baris ${aktif?.nama ?? ""}?`} />
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Kartu bilangan">
              {kartu.map((n) => (
                <button key={`${n}-${keliru === n ? "x" : "o"}`} type="button" aria-label={`Kartu ${n}`} onClick={() => pilih(n)} className={`${TOMBOL_PUTIH} !px-1 !text-2xl ${keliru === n ? "igil-goyang" : ""}`}>
                  {n}
                </button>
              ))}
            </div>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
