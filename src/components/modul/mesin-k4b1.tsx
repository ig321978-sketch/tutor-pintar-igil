"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, Pencacah, TOMBOL_BESAR } from "./permainan-k2b2";
import { PapanTempat, WARNA_TEMPAT } from "./diagram-k4b1";
import { empat, gabung4, lambang } from "./data-k4b1";

/* ------------------------------------------------------------------------ */
/* Mesin permainan Kelas 4 Bab 1 (bilangan empat angka sampai 10.000).         */
/* RakitEmpat, PapanEmpat, TabelNilai4, SusunEmpatKartu. Tanpa API/acak.       */
/* ------------------------------------------------------------------------ */

const TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
const NILAI_TEMPAT = [1000, 100, 10, 1] as const;

export type SoalRakit4 = {
  n: number;
  tanya: string;
  tampil: (rb: number, r: number, p: number, s: number) => React.ReactNode;
  nama: [string, string, string, string];
  pesan: string;
};

/** Rakit empat tingkat dengan penukaran 10→1 otomatis. Maksimal 9.999. */
export function RakitEmpat({ soal, onBeres, pesanBeres }: { soal: SoalRakit4[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [total, setTotal] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const d = empat(total);

  const ubah = (langkah: number) => {
    if (beres) return;
    const baru = total + langkah;
    if (baru < 0 || baru > 9999) return;
    const a = empat(total);
    setTotal(baru);
    if (langkah === 1 && a.s === 9) setKabar({ teks: `Sepuluh ${s.nama[3]} ditukar menjadi satu ${s.nama[2]}.`, ok: true });
    else if (langkah === 10 && a.p === 9) setKabar({ teks: `Sepuluh ${s.nama[2]} ditukar menjadi satu ${s.nama[1]}.`, ok: true });
    else if (langkah === 100 && a.r === 9) setKabar({ teks: `Sepuluh ${s.nama[1]} ditukar menjadi satu ${s.nama[0]}.`, ok: true });
    else if (langkah === -1 && a.s === 0) setKabar({ teks: `Satu ${s.nama[2]} dibuka menjadi sepuluh ${s.nama[3]}, lalu diambil satu.`, ok: true });
    else if (langkah === -10 && a.p === 0) setKabar({ teks: `Satu ${s.nama[1]} dibuka menjadi sepuluh ${s.nama[2]}, lalu diambil satu.`, ok: true });
    else if (langkah === -100 && a.r === 0) setKabar({ teks: `Satu ${s.nama[0]} dibuka menjadi sepuluh ${s.nama[1]}, lalu diambil satu.`, ok: true });
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
    const t = empat(s.n);
    const tujuan = [t.rb, t.r, t.p, t.s];
    const sekarang = [d.rb, d.r, d.p, d.s];
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
              {total === 0 ? <span className="self-center text-sm font-black text-[#1C01A5]/50">Tekan tambah untuk mulai merakit</span> : s.tampil(d.rb, d.r, d.p, d.s)}
            </div>
            <PapanTempat rb={d.rb} r={d.r} p={d.p} s={d.s} kecil />
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {([0, 1, 2, 3] as const).map((i) => {
                const w = WARNA_TEMPAT[TEMPAT[i]];
                const nilai = NILAI_TEMPAT[i];
                return (
                  <div key={i} className="overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white text-center">
                    <p className="px-1 py-0.5 text-[10px] font-black leading-tight" style={{ backgroundColor: w.isi, color: w.teks }}>
                      {s.nama[i]}
                    </p>
                    <div className="flex items-center justify-center gap-1 px-1 py-1.5">
                      <button type="button" aria-label={`Kurangi ${s.nama[i]}`} disabled={total - nilai < 0} onClick={() => ubah(-nilai)} className={`${TOMBOL_BESAR} h-10 w-10 !px-0 !py-0 text-xl`}>
                        −
                      </button>
                      <button type="button" aria-label={`Tambah ${s.nama[i]}`} disabled={total + nilai > 9999} onClick={() => ubah(nilai)} className={`${TOMBOL_BESAR} h-10 w-10 !px-0 !py-0 text-xl`}>
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

export type SoalPapan4 = { visual?: React.ReactNode; tanya: string; jawab: number; petunjuk: string; pesan: string };

export function PapanEmpat({ soal, onBeres, pesanBeres }: { soal: SoalPapan4[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [rb, setRb] = useState(0);
  const [r, setR] = useState(0);
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const q = soal[Math.min(nomor, soal.length - 1)];

  const reset = () => {
    setRb(0);
    setR(0);
    setP(0);
    setS(0);
  };

  const periksa = () => {
    if (gabung4(rb, r, p, s) !== q.jawab) {
      const t = empat(q.jawab);
      const salah = rb !== t.rb ? "ribuan" : r !== t.r ? "ratusan" : p !== t.p ? "puluhan" : "satuan";
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
      reset();
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
            <PapanTempat rb={rb} r={r} p={p} s={s} />
            <div className="space-y-1.5">
              {(["ribuan", "ratusan", "puluhan", "satuan"] as const).map((t, i) => (
                <div key={t} className="flex items-center justify-between gap-2 rounded-2xl border-2 px-2 py-1" style={{ borderColor: WARNA_TEMPAT[t].blok, backgroundColor: WARNA_TEMPAT[t].isi }}>
                  <p className="text-sm font-black" style={{ color: WARNA_TEMPAT[t].teks }}>
                    Angka {t}
                  </p>
                  <Pencacah nilai={[rb, r, p, s][i]} min={0} max={9} onUbah={[setRb, setR, setP, setS][i]} label={t} />
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

export type BarisNilai4 = { label: React.ReactNode; jawab: [number, number, number, number]; nama: string };

function pilihanSel(kolom: number, mode: "angka" | "nilai"): number[] {
  return Array.from({ length: 10 }, (_, i) => (mode === "angka" ? i : i * NILAI_TEMPAT[kolom]));
}

export function TabelNilai4({ baris, mode, kepala, onBeres, pesanBeres }: { baris: BarisNilai4[]; mode: "angka" | "nilai"; kepala?: [string, string, string, string, string]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [isi, setIsi] = useState<(number | null)[][]>(() => baris.map(() => [null, null, null, null]));
  const [salah, setSalah] = useState<string[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const judul = kepala ?? [mode === "angka" ? "Model" : "Bilangan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];

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
    if (isi.some((row) => row.some((v) => v === null))) {
      setKabar({ teks: "Masih ada sel bertanda tanya. Ketuk sel itu sampai angkanya sesuai.", ok: false });
      return;
    }
    const keliru: string[] = [];
    baris.forEach((b, i) => b.jawab.forEach((j, k) => isi[i][k] !== j && keliru.push(`${i}-${k}`)));
    if (keliru.length > 0) {
      setSalah(keliru);
      const [bi, ki] = keliru[0].split("-").map(Number);
      setKabar({ teks: `Isian ${TEMPAT[ki]} pada ${baris[bi].nama} belum tepat.`, ok: false });
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
        <div className="overflow-x-auto overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid min-w-[320px] grid-cols-[1.3fr_1fr_1fr_1fr_1fr] text-center text-[10px] font-black leading-tight">
            <span className="bg-[#FEF3C7] px-1 py-1 text-[#1C01A5]">{judul[0]}</span>
            {([0, 1, 2, 3] as const).map((k) => (
              <span key={k} className="px-1 py-1" style={{ backgroundColor: WARNA_TEMPAT[TEMPAT[k]].isi, color: WARNA_TEMPAT[TEMPAT[k]].teks }}>
                {judul[k + 1]}
              </span>
            ))}
          </div>
          {baris.map((b, i) => (
            <div key={i} className={`grid min-w-[320px] grid-cols-[1.3fr_1fr_1fr_1fr_1fr] items-center gap-1 px-1 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
              <div className="flex min-h-[44px] items-center justify-center">{b.label}</div>
              {([0, 1, 2, 3] as const).map((k) => {
                const v = isi[i][k];
                const keliru = salah.includes(`${i}-${k}`);
                return (
                  <button
                    key={`${k}-${keliru ? "x" : "o"}`}
                    type="button"
                    disabled={selesai}
                    aria-label={`${b.nama}, ${TEMPAT[k]}: ${v === null ? "belum" : v}`}
                    onClick={() => putar(i, k)}
                    className={`mx-auto flex h-11 w-full max-w-[64px] items-center justify-center rounded-xl border-[3px] border-[#1C01A5] text-xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] ${v === null ? "bg-white text-[#1C01A5]/40" : "bg-[#FFE566]"} ${keliru ? "igil-goyang !border-[#DC2626]" : ""}`}
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

export type SoalKartu4 = { kartu: number[]; jawab: number; tanya: string; pesan: string };

export function SusunEmpatKartu({ soal, onBeres, pesanBeres }: { soal: SoalKartu4[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [slot, setSlot] = useState<(number | null)[]>([null, null, null, null]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const q = soal[Math.min(nomor, soal.length - 1)];
  const dipakai = slot.filter((x): x is number => x !== null);

  const periksaPenuh = (baru: (number | null)[]) => {
    const digits = baru.map((x) => q.kartu[x as number]);
    const hasil = gabung4(digits[0], digits[1], digits[2], digits[3]);
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
        setSlot([null, null, null, null]);
        setDipilih(null);
      }
      return;
    }
    setKabar({ teks: `Susunanmu ${lambang(hasil)}. Baca lagi perintahnya, lalu taruh tiap kartu di tempat yang tepat.`, ok: false });
    setSlot([null, null, null, null]);
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
            <div className="flex flex-wrap items-end justify-center gap-1.5">
              {([0, 1, 2, 3] as const).map((i) => {
                const t = TEMPAT[i];
                const isi = slot[i] !== null ? q.kartu[slot[i] as number] : null;
                return (
                  <button key={i} type="button" aria-label={`Tempat ${t}`} onClick={() => ketukSlot(i)} className={`flex flex-col items-center overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white ${dipilih !== null && isi === null ? "ring-4 ring-[#F0AB00]/70" : ""}`}>
                    <span className="w-full px-2 py-0.5 text-[10px] font-black" style={{ backgroundColor: WARNA_TEMPAT[t].isi, color: WARNA_TEMPAT[t].teks }}>
                      {t[0].toUpperCase() + t.slice(1)}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center text-3xl font-black text-[#1C01A5]">{isi === null ? "" : isi}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Kartu angka">
              {q.kartu.map((angka, i) =>
                dipakai.includes(i) ? (
                  <span key={i} className="h-16 w-14" aria-hidden="true" />
                ) : (
                  <button key={i} type="button" aria-label={`Kartu ${angka}`} aria-pressed={dipilih === i} onClick={() => setDipilih(dipilih === i ? null : i)} className={`flex h-16 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${dipilih === i ? "ring-4 ring-[#F0AB00]" : ""}`}>
                    {angka}
                  </button>
                ),
              )}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kartu, lalu ketuk tempatnya.</p>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
