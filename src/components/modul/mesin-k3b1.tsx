"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, Pencacah, TOMBOL_BESAR } from "./permainan-k2b2";
import { PapanTempat, WARNA_TEMPAT } from "./diagram-k3b1";
import { gabung3, tiga } from "./data-k3b1";

/* ------------------------------------------------------------------------ */
/* Mesin permainan Matematika Kelas 3 Bab 1 (bilangan tiga angka). Gambar        */
/* diberikan dari luar lewat props, jadi mesin ini aman dipakai tahap Concrete,  */
/* Picture, dan Abstract. Empat mesin: RakitTiga (menambah dan menukar kemasan), */
/* PapanTiga (papan ratusan, puluhan, satuan), TabelNilai (isi tabel dengan      */
/* mengetuk sel), dan SusunTigaKartu (tiga kartu angka pada tiga tempat).        */
/* Tanpa API dan tanpa acak.                                                     */
/* ------------------------------------------------------------------------ */

const TEMPAT = ["ratusan", "puluhan", "satuan"] as const;
const NILAI_TEMPAT = [100, 10, 1] as const;

/* ------------------------------ Rakit dengan penukaran ------------------------------ */

export type SoalRakit = {
  n: number;
  tanya: string;
  /** Gambar hasil rakitan sekarang. */
  tampil: (r: number, p: number, s: number) => React.ReactNode;
  /** Nama tiga jenis kemasan, mis. ["dus", "bungkus", "benda"] atau ["ratusan", "puluhan", "satuan"]. */
  nama: [string, string, string];
  pesan: string;
};

/**
 * Tekan tambah atau kurang pada tiga jenis kemasan. Sepuluh satuan otomatis ditukar menjadi satu puluhan, dan sepuluh
 * puluhan menjadi satu ratusan (juga sebaliknya). Tekan Periksa bila rakitan sama dengan bilangan yang diminta.
 */
export function RakitTiga({ soal, onBeres, pesanBeres }: { soal: SoalRakit[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [total, setTotal] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const d = tiga(total);

  const ubah = (langkah: number) => {
    if (beres) return;
    const baru = total + langkah;
    if (baru < 0 || baru > 999) return;
    const a = tiga(total);
    setTotal(baru);
    if (langkah === 1 && a.s === 9) setKabar({ teks: `Sepuluh ${s.nama[2]} ditukar menjadi satu ${s.nama[1]}.`, ok: true });
    else if (langkah === 10 && a.p === 9) setKabar({ teks: `Sepuluh ${s.nama[1]} ditukar menjadi satu ${s.nama[0]}.`, ok: true });
    else if (langkah === -1 && a.s === 0) setKabar({ teks: `Satu ${s.nama[1]} dibuka menjadi sepuluh ${s.nama[2]}, lalu diambil satu.`, ok: true });
    else if (langkah === -10 && a.p === 0) setKabar({ teks: `Satu ${s.nama[0]} dibuka menjadi sepuluh ${s.nama[1]}, lalu diambil satu.`, ok: true });
    else setKabar(null);
  };

  const periksa = () => {
    if (total === s.n) {
      if (nomor + 1 >= soal.length) {
        setKabar(null);
        letusan.picu();
        ucap(`${s.pesan} ${pesanBeres}`);
        setNomor(nomor + 1);
        onBeres();
      } else {
        setKabar({ teks: s.pesan, ok: true });
        setNomor(nomor + 1);
        setTotal(0);
      }
      return;
    }
    const t = tiga(s.n);
    const tujuan = [t.r, t.p, t.s];
    const sekarang = [d.r, d.p, d.s];
    const i = sekarang.findIndex((v, k) => v !== tujuan[k]);
    setKabar({ teks: `Banyak ${s.nama[i]} belum tepat. Bilangan ini punya ${tujuan[i]} ${TEMPAT[i]}. Kamu sekarang punya ${sekarang[i]}.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            <CatatanPensil pendek={s.tanya} />
            <div className="flex min-h-[96px] items-end justify-center rounded-2xl border-4 border-dashed border-[#1C01A5]/50 bg-white px-2 py-2" aria-live="polite">
              {total === 0 ? <span className="self-center text-sm font-black text-[#1C01A5]/50">Tekan tambah untuk mulai merakit</span> : s.tampil(d.r, d.p, d.s)}
            </div>
            <PapanTempat r={d.r} p={d.p} s={d.s} kecil />
            <div className="grid grid-cols-3 gap-1.5">
              {([0, 1, 2] as const).map((i) => {
                const w = WARNA_TEMPAT[TEMPAT[i]];
                const nilai = NILAI_TEMPAT[i];
                return (
                  <div key={i} className="overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white text-center">
                    <p className="px-1 py-0.5 text-[11px] font-black leading-tight" style={{ backgroundColor: w.isi, color: w.teks }}>
                      {s.nama[i]}
                    </p>
                    <div className="flex items-center justify-center gap-1 px-1 py-1.5">
                      <button type="button" aria-label={`Kurangi ${s.nama[i]}`} disabled={total - nilai < 0} onClick={() => ubah(-nilai)} className={`${TOMBOL_BESAR} h-11 w-11 !px-0 !py-0 text-2xl`}>
                        −
                      </button>
                      <button type="button" aria-label={`Tambah ${s.nama[i]}`} disabled={total + nilai > 999} onClick={() => ubah(nilai)} className={`${TOMBOL_BESAR} h-11 w-11 !px-0 !py-0 text-2xl`}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button type="button" aria-label="Periksa rakitan" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Papan tiga angka ------------------------------ */

export type SoalPapanTiga = { visual?: React.ReactNode; tanya: string; jawab: number; petunjuk: string; pesan: string };

/** Atur angka ratusan, puluhan, dan satuan pada papan nilai tempat sampai sama dengan jawaban. */
export function PapanTiga({ soal, onBeres, pesanBeres }: { soal: SoalPapanTiga[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [r, setR] = useState(0);
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const q = soal[Math.min(nomor, soal.length - 1)];

  const periksa = () => {
    if (gabung3(r, p, s) !== q.jawab) {
      const t = tiga(q.jawab);
      const salah = r !== t.r ? "ratusan" : p !== t.p ? "puluhan" : "satuan";
      setKabar({ teks: `${q.petunjuk} Periksa dulu angka ${salah}.`, ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${q.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: q.pesan, ok: true });
      setNomor(nomor + 1);
      setR(0);
      setP(0);
      setS(0);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            {q.visual ? <div className="flex justify-center">{q.visual}</div> : null}
            <CatatanPensil pendek={q.tanya} />
            <PapanTempat r={r} p={p} s={s} />
            <div className="space-y-1.5">
              {(["ratusan", "puluhan", "satuan"] as const).map((t, i) => (
                <div key={t} className="flex items-center justify-between gap-2 rounded-2xl border-2 px-2 py-1" style={{ borderColor: WARNA_TEMPAT[t].blok, backgroundColor: WARNA_TEMPAT[t].isi }}>
                  <p className="text-sm font-black" style={{ color: WARNA_TEMPAT[t].teks }}>
                    Angka {t}
                  </p>
                  <Pencacah nilai={[r, p, s][i]} min={0} max={9} onUbah={[setR, setP, setS][i]} label={t} />
                </div>
              ))}
            </div>
            <button type="button" aria-label="Periksa papan" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Tabel nilai tempat ------------------------------ */

export type BarisNilai = { label: React.ReactNode; jawab: [number, number, number]; nama: string };

/** Pilihan isi sel: angka 0 sampai 9, atau nilai (0, 100, ... 900), (0, 10, ... 90), (0 sampai 9). */
function pilihanSel(kolom: number, mode: "angka" | "nilai"): number[] {
  return Array.from({ length: 10 }, (_, i) => (mode === "angka" ? i : i * NILAI_TEMPAT[kolom]));
}

/**
 * Tabel dengan tiga sel per baris. Ketuk sebuah sel untuk memutar isinya (? lalu 0, 1, 2, ...). Mode "angka" mengisi angka
 * tiap tempat, mode "nilai" mengisi nilai tiap tempat (200, 50, 1). Tekan Periksa bila semua sel sudah terisi.
 */
export function TabelNilai({ baris, mode, kepala, onBeres, pesanBeres }: { baris: BarisNilai[]; mode: "angka" | "nilai"; kepala?: [string, string, string, string]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [isi, setIsi] = useState<(number | null)[][]>(() => baris.map(() => [null, null, null]));
  const [salah, setSalah] = useState<string[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const judul = kepala ?? [mode === "angka" ? "Model" : "Bilangan", "Ratusan", "Puluhan", "Satuan"];

  const putar = (b: number, k: number) => {
    if (selesai) return;
    const opsi = pilihanSel(k, mode);
    const sekarang = isi[b][k];
    const baru = sekarang === null ? opsi[0] : opsi[(opsi.indexOf(sekarang) + 1) % opsi.length];
    setIsi(isi.map((row, i) => (i === b ? row.map((v, j) => (j === k ? baru : v)) : row)));
    setSalah([]);
    setKabar(null);
  };

  const periksa = () => {
    const kosong = isi.some((row) => row.some((v) => v === null));
    if (kosong) {
      setKabar({ teks: "Masih ada sel bertanda tanya. Ketuk sel itu sampai angkanya sesuai.", ok: false });
      return;
    }
    const keliru: string[] = [];
    baris.forEach((b, i) => b.jawab.forEach((j, k) => isi[i][k] !== j && keliru.push(`${i}-${k}`)));
    if (keliru.length > 0) {
      setSalah(keliru);
      const [bi, ki] = keliru[0].split("-").map(Number);
      setKabar({ teks: `Isian ${TEMPAT[ki]} pada ${baris[bi].nama} belum tepat. Lihat tempat angkanya dengan teliti.`, ok: false });
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
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] text-center text-[11px] font-black leading-tight">
            <span className="bg-[#FEF3C7] px-1 py-1 text-[#1C01A5]">{judul[0]}</span>
            {([0, 1, 2] as const).map((k) => (
              <span key={k} className="px-1 py-1" style={{ backgroundColor: WARNA_TEMPAT[TEMPAT[k]].isi, color: WARNA_TEMPAT[TEMPAT[k]].teks }}>
                {judul[k + 1]}
              </span>
            ))}
          </div>
          {baris.map((b, i) => (
            <div key={i} className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center gap-1 px-1 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
              <div className="flex min-h-[48px] items-center justify-center">{b.label}</div>
              {([0, 1, 2] as const).map((k) => {
                const v = isi[i][k];
                const keliru = salah.includes(`${i}-${k}`);
                return (
                  <button
                    key={`${k}-${keliru ? "x" : "o"}`}
                    type="button"
                    disabled={selesai}
                    aria-label={`${b.nama}, ${TEMPAT[k]}: ${v === null ? "belum diisi" : v}. Ketuk untuk mengubah`}
                    onClick={() => putar(i, k)}
                    className={`mx-auto flex h-12 w-full max-w-[72px] items-center justify-center rounded-xl border-[3px] border-[#1C01A5] text-2xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] disabled:opacity-100 ${v === null ? "bg-white text-[#1C01A5]/40" : "bg-[#FFE566]"} ${keliru ? "igil-goyang !border-[#DC2626]" : ""}`}
                  >
                    {v === null ? "?" : v}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {selesai ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk sel untuk memutar isinya, lalu tekan Periksa.</p>
            <button type="button" aria-label="Periksa tabel" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Susun tiga kartu ------------------------------ */

export type SoalKartu3 = { kartu: number[]; jawab: number; tanya: string; pesan: string };

const WARNA_KALENG = { ratusan: "#BAE6FD", puluhan: "#DDD6FE", satuan: "#FEF08A" } as const;

function Kaleng({ judul, tempat, isi }: { judul: string; tempat: (typeof TEMPAT)[number]; isi: number | null }) {
  const w = WARNA_TEMPAT[tempat];
  return (
    <span className="flex flex-col items-center" aria-hidden="true">
      <svg viewBox="0 0 70 84" width="66" height="80">
        <ellipse cx="35" cy="72" rx="29" ry="9" fill={WARNA_KALENG[tempat]} stroke="#1C01A5" strokeWidth="2.4" />
        <rect x="6" y="14" width="58" height="58" fill={WARNA_KALENG[tempat]} stroke="none" />
        <line x1="6" y1="14" x2="6" y2="72" stroke="#1C01A5" strokeWidth="2.4" />
        <line x1="64" y1="14" x2="64" y2="72" stroke="#1C01A5" strokeWidth="2.4" />
        <ellipse cx="35" cy="14" rx="29" ry="9" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="2.4" />
        <text x="35" y="52" textAnchor="middle" fontSize="30" fontWeight="900" fill="#1C01A5">
          {isi === null ? "" : isi}
        </text>
      </svg>
      <span className="-mt-1 text-[11px] font-black" style={{ color: w.teks }}>
        {judul}
      </span>
    </span>
  );
}

/**
 * Tiga kartu angka disusun pada tempat ratusan, puluhan, dan satuan menjadi bilangan yang diminta. Ketuk kartu, lalu
 * ketuk tempatnya. Ketuk tempat yang terisi untuk mengambil kartunya kembali. Diperiksa otomatis saat tiga tempat penuh.
 * Gaya "kaleng" menggambar tiga kaleng (Aktivitas 2 di buku), gaya "papan" menggambar papan nilai tempat.
 */
export function SusunTigaKartu({ soal, gaya = "papan", onBeres, pesanBeres }: { soal: SoalKartu3[]; gaya?: "papan" | "kaleng"; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [slot, setSlot] = useState<(number | null)[]>([null, null, null]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const q = soal[Math.min(nomor, soal.length - 1)];
  const dipakai = slot.filter((x): x is number => x !== null);

  const periksaPenuh = (baru: (number | null)[]) => {
    const [a, b, c] = baru.map((x) => q.kartu[x as number]);
    const hasil = gabung3(a, b, c);
    if (hasil === q.jawab) {
      if (nomor + 1 >= soal.length) {
        setKabar(null);
        letusan.picu();
        ucap(`${q.pesan} ${pesanBeres}`);
        setNomor(nomor + 1);
        onBeres();
      } else {
        setKabar({ teks: q.pesan, ok: true });
        setNomor(nomor + 1);
        setSlot([null, null, null]);
        setDipilih(null);
      }
      return;
    }
    setKabar({ teks: `Susunanmu ${hasil}. Baca lagi perintahnya, lalu taruh tiap kartu di tempat yang tepat.`, ok: false });
    setSlot([null, null, null]);
  };

  const ketukSlot = (i: number) => {
    if (beres) return;
    if (slot[i] !== null) {
      const baru = [...slot];
      baru[i] = null;
      setSlot(baru);
      return;
    }
    if (dipilih === null) return;
    const baru = [...slot];
    baru[i] = dipilih;
    setSlot(baru);
    setDipilih(null);
    setKabar(null);
    if (baru.every((x) => x !== null)) periksaPenuh(baru);
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            <CatatanPensil pendek={q.tanya} />
            <div className="flex items-end justify-center gap-2">
              {([0, 1, 2] as const).map((i) => {
                const t = TEMPAT[i];
                const isi = slot[i] !== null ? q.kartu[slot[i] as number] : null;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Tempat ${t}${isi !== null ? `, berisi ${isi}` : ", kosong"}`}
                    onClick={() => ketukSlot(i)}
                    className={`flex flex-col items-center overflow-hidden rounded-xl bg-white ${gaya === "kaleng" ? "border-0 px-1" : "border-[3px] border-[#1C01A5]"} ${dipilih !== null && isi === null ? "ring-4 ring-[#F0AB00]/70" : ""}`}
                  >
                    {gaya === "kaleng" ? (
                      <Kaleng judul={t[0].toUpperCase() + t.slice(1)} tempat={t} isi={isi} />
                    ) : (
                      <>
                        <span className="w-full px-4 py-0.5 text-xs font-black" style={{ backgroundColor: WARNA_TEMPAT[t].isi, color: WARNA_TEMPAT[t].teks }}>
                          {t[0].toUpperCase() + t.slice(1)}
                        </span>
                        <span className="flex h-14 w-[4.2rem] items-center justify-center text-4xl font-black text-[#1C01A5]">{isi === null ? "" : isi}</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center gap-2" role="group" aria-label="Kartu angka">
              {q.kartu.map((angka, i) =>
                dipakai.includes(i) ? (
                  <span key={i} className="h-20 w-16" aria-hidden="true" />
                ) : (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Kartu ${angka}`}
                    aria-pressed={dipilih === i}
                    onClick={() => setDipilih(dipilih === i ? null : i)}
                    className={`flex h-20 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-5xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${dipilih === i ? "ring-4 ring-[#F0AB00]" : ""}`}
                  >
                    {angka}
                  </button>
                ),
              )}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kartu, lalu ketuk tempatnya. Ketuk tempat yang terisi untuk mengambil kartunya.</p>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
