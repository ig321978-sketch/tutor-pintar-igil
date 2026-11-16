"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bangunSoal } from "@/lib/modul-kedua/generator";
import type { CatatanButir, Representasi, SoalJadi, SpesifikasiSoal } from "@/lib/modul-kedua/tipe";
import TombolSuara from "./TombolSuara";
import VisualSoalView from "./VisualSoal";
import { suaraNyala, ucapkan } from "./suara";

export const repDariGen = (gen: string): Representasi => (gen.startsWith("c-") ? "concrete" : gen.startsWith("p-") ? "pictorial" : "abstract");

export type HasilLatihan = { butir: CatatanButir[]; detik: number };

const WARNA_LEVEL = { Dasar: "bg-emerald-200 text-emerald-900", Mahir: "bg-amber-200 text-amber-900", Juara: "bg-rose-200 text-rose-900" } as const;
const kini = () => performance.now();
const TOMBOL = "min-h-16 rounded-2xl border-4 px-3 py-2 text-xl font-black transition active:scale-95";

function SoalLatihan({
  soal,
  nomor,
  total,
  mode,
  saatSelesai,
}: {
  soal: SoalJadi;
  nomor: number;
  total: number;
  mode: "latihan" | "tes";
  saatSelesai: (c: CatatanButir) => void;
}) {
  const [percobaan, setPercobaan] = useState(0);
  const [salah, setSalah] = useState<string[]>([]);
  const [petunjuk, setPetunjuk] = useState(0);
  const [hasil, setHasil] = useState<{ benar: boolean; percobaan: number; catatan: CatatanButir } | null>(null);
  const [keranjang, setKeranjang] = useState(0);
  const mulai = useRef(0);

  useEffect(() => {
    mulai.current = kini();
    if (suaraNyala()) ucapkan(soal.suara);
  }, [soal]);

  const catat = (benar: boolean, p: number): CatatanButir => ({
    idSoal: soal.id,
    gen: soal.gen,
    level: soal.level,
    kognitif: soal.kognitif,
    elemen: soal.elemen,
    benar,
    percobaan: p,
    petunjuk: mode === "tes" ? 0 : petunjuk,
    detik: Math.round((kini() - mulai.current) / 1000),
  });

  function jawab(nilai: string) {
    if (hasil) return;
    const benar = nilai === soal.kunci;
    if (mode === "tes") {
      saatSelesai(catat(benar, 1));
      return;
    }
    const p = percobaan + 1;
    setPercobaan(p);
    if (benar || p >= 3) setHasil({ benar, percobaan: p, catatan: catat(benar, p) });
    else setSalah((s) => [...s, nilai]);
  }

  const adaEmoji = soal.pilihan.some((p) => /\p{Extended_Pictographic}/u.test(p));
  const bukanBenar = percobaan > 0 && !hasil;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2 text-sm font-black">
        <span className="rounded-full bg-indigo-900 px-3 py-1 text-white">
          Soal {nomor} dari {total}
        </span>
        <span className={`rounded-full px-3 py-1 ${WARNA_LEVEL[soal.level]}`}>{soal.level}</span>
      </div>
      <div className="rounded-3xl border-4 border-amber-400 bg-white p-3">
        <p className="text-lg font-black leading-snug text-indigo-950">{soal.teks}</p>
        <div className="mt-2">
          <TombolSuara teks={soal.suara} label="Dengarkan soal" />
        </div>
      </div>
      <VisualSoalView visual={soal.visual} saatKeranjang={setKeranjang} />

      {soal.mode === "isi-keranjang" ? (
        <button
          type="button"
          disabled={!!hasil}
          onClick={() => jawab(String(keranjang))}
          className={`${TOMBOL} w-full border-emerald-700 bg-emerald-500 text-white disabled:opacity-50`}
        >
          Periksa jawabanku
        </button>
      ) : (
        <div className={`grid gap-2 ${soal.pilihan.length > 3 ? "grid-cols-2" : "grid-cols-1"} ${soal.pilihan.length === 3 ? "sm:grid-cols-3" : ""}`}>
          {soal.pilihan.map((p) => {
            const kenaSalah = salah.includes(p);
            const tampilBenar = !!hasil && p === soal.kunci;
            return (
              <button
                key={p}
                type="button"
                disabled={!!hasil || kenaSalah}
                onClick={() => jawab(p)}
                className={`${TOMBOL} ${adaEmoji ? "text-4xl" : ""} ${
                  tampilBenar
                    ? "border-emerald-700 bg-emerald-200 text-emerald-950"
                    : kenaSalah
                      ? "border-rose-400 bg-rose-100 text-rose-400 line-through"
                      : "border-indigo-900 bg-white text-indigo-950"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      )}

      {bukanBenar ? (
        <div role="status" className="rounded-2xl border-4 border-rose-400 bg-rose-50 p-3 text-base font-bold text-rose-900">
          Belum tepat. Jangan khawatir, coba lagi, ya.
        </div>
      ) : null}

      {mode === "latihan" && !hasil ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setPetunjuk((n) => n + 1)}
            className="min-h-12 rounded-2xl border-4 border-sky-400 bg-sky-100 px-4 text-base font-black text-sky-900"
          >
            💡 Petunjuk
          </button>
          {petunjuk > 0 ? (
            <p className="rounded-2xl bg-sky-50 p-3 text-base font-bold text-sky-900">
              {soal.petunjuk}{" "}
              <TombolSuara teks={soal.petunjuk} label="Dengarkan" kecil />
            </p>
          ) : null}
        </div>
      ) : null}

      {hasil ? (
        <div className={`space-y-2 rounded-3xl border-4 p-3 ${hasil.benar ? "border-emerald-500 bg-emerald-50" : "border-amber-500 bg-amber-50"}`}>
          <p className="text-xl font-black text-indigo-950">
            {hasil.benar ? (hasil.percobaan === 1 ? "Hebat! Tepat sekali." : "Benar! Kamu berhasil.") : `Jawabannya ${soal.kunci}.`}
          </p>
          <p className="text-base font-bold text-indigo-900">{soal.mengapa}</p>
          <TombolSuara teks={soal.mengapa} label="Dengarkan alasan" kecil />
          <details className="rounded-2xl bg-white p-2 text-sm text-indigo-950">
            <summary className="min-h-10 cursor-pointer py-2 font-black">Langkah berpikir (Polya)</summary>
            <ol className="space-y-1 pl-1">
              {soal.polya.map((l) => (
                <li key={l.tahap}>
                  <b>{l.tahap}:</b> {l.teks}
                </li>
              ))}
            </ol>
          </details>
          <button
            type="button"
            onClick={() => saatSelesai(hasil.catatan)}
            className={`${TOMBOL} w-full border-indigo-900 bg-indigo-700 text-white`}
          >
            {nomor === total ? "Selesai" : "Soal berikutnya"} ➜
          </button>
        </div>
      ) : null}
    </section>
  );
}

/** Pelari satu rangkaian soal berparameter. Dipakai Concrete, Pictorial, Abstract, pra/pasca-tes, dan remedial. */
export default function LatihanTahap({
  spesifikasi,
  benih,
  mode,
  saatSelesai,
}: {
  spesifikasi: SpesifikasiSoal[];
  benih: number;
  mode: "latihan" | "tes";
  saatSelesai: (h: HasilLatihan) => void;
}) {
  const soalList = useMemo(
    () => spesifikasi.map((s, i) => bangunSoal(s, (benih * 31 + i * 7919 + 17) >>> 0, repDariGen(s.gen))),
    [spesifikasi, benih],
  );
  const [idx, setIdx] = useState(0);
  const [butir, setButir] = useState<CatatanButir[]>([]);

  function selesaiSoal(c: CatatanButir) {
    const semua = [...butir, c];
    if (idx + 1 >= soalList.length) {
      saatSelesai({ butir: semua, detik: semua.reduce((a, b) => a + b.detik, 0) });
    } else {
      setButir(semua);
      setIdx(idx + 1);
    }
  }

  return <SoalLatihan key={`${idx}-${benih}`} soal={soalList[idx]} nomor={idx + 1} total={soalList.length} mode={mode} saatSelesai={selesaiSoal} />;
}
