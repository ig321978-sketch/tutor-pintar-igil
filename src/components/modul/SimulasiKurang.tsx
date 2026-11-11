"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU } from "./simulasi-bersama";
import { BIRU, BaganPasangan, Bingkai, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import { MAKS, awalCoret, banyakDicoret, keluargaFakta, ketukBenda, kalimatKurang, selKurang, sisa, ubahAmbil, ubahTotal, ucapanKurang } from "./lab-kurang-bab3";
import type { KeadaanKurang } from "./misi-bab3";

/**
 * Perwakilan yang boleh tampil. Di dalam Materi, tiap sub-bab hanya membuka perwakilan yang sudah diajarkan
 * sampai sub-bab itu (mis. garis bilangan mundur dan bagan baru di Sub-Bab B, keluarga fakta di Sub-Bab C),
 * jadi pembungkus memilih `tampil` per sub-bab.
 * `dua` adalah dua pengurangan dari satu bagan (Sub-Bab B); `keluarga` adalah empat kalimat tambah dan kurang (Sub-Bab C).
 */
export type TampilKurang = "benda" | "kalimat" | "garis" | "bingkai" | "dua" | "bagan" | "keluarga";
export const SEMUA_TAMPIL_KURANG: TampilKurang[] = ["benda", "kalimat", "garis", "bingkai", "dua", "bagan", "keluarga"];

const LABEL_TAMPIL: Record<TampilKurang, string> = {
  benda: "Benda",
  kalimat: "Kalimat",
  garis: "Garis bilangan",
  bingkai: "Bingkai sepuluh",
  dua: "Dua pengurangan",
  bagan: "Bagan pasangan",
  keluarga: "Keluarga fakta",
};

/** Langkah selidik "Coba ini!" yang cocok dengan perwakilan yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilKurang[]): string[] {
  const ada = (k: TampilKurang) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("benda")) hasil.push("Coret semua benda. Berapa sisanya?");
  if (ada("kalimat")) hasil.push("Ubah Semua benda atau Benda diambil. Lihat kalimat pengurangannya ikut berubah.");
  if (ada("garis")) hasil.push("Atur Benda diambil menjadi 0. Apa yang terjadi di garis bilangan?");
  if (ada("bingkai")) hasil.push("Lihat bingkai sepuluh. Berapa petak yang dicoret, dan berapa yang tidak?");
  if (ada("dua")) hasil.push("Lihat dua pengurangan dari satu bagan. Apa yang sama dari keduanya?");
  if (ada("bagan")) hasil.push("Lihat bagan pasangan. Gabungan ada di lingkaran besar, sebagian di lingkaran kecil.");
  if (ada("keluarga")) hasil.push("Lihat keluarga fakta. Apa yang sama dari keempat kalimat itu?");
  return hasil.slice(0, 4);
}

const KATA_URUT = ["Satu", "Dua", "Tiga", "Empat"];

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 3): Laboratorium Pengurangan, metode PhET.                 */
/* Benda dicoret, bingkai, garis bilangan mundur, bagan, dan keluarga fakta   */
/* terhubung. Logika di lab-kurang-bab3.ts. Tanpa jaringan.                   */
/* ------------------------------------------------------------------------ */

export default function SimulasiKurang({
  speakGuru,
  tampil = SEMUA_TAMPIL_KURANG,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  /** Perwakilan yang tersedia. Bawaan: semuanya (tab Simulasi lama). */
  tampil?: TampilKurang[];
  /** Melapor keadaan ke papan misi (bila ada). */
  onKeadaan?: (k: KeadaanKurang) => void;
}) {
  const [coret, setCoret] = useState<boolean[]>(() => awalCoret(8, 3));
  const [lihatMentah, setLihat] = useState<Record<TampilKurang, boolean>>({ benda: true, kalimat: true, garis: true, bingkai: true, dua: true, bagan: true, keluarga: true });
  const s = { t: coret.length, k: banyakDicoret(coret) };
  const hasil = sisa(s.t, s.k);

  // Perwakilan di luar `tampil` tidak pernah menyala.
  const tersedia = SEMUA_TAMPIL_KURANG.filter((k) => tampil.includes(k));
  const lihat = (k: TampilKurang) => tampil.includes(k) && lihatMentah[k];
  const bisaDiatur = tersedia.length > 1;
  const coba = langkahCoba(tampil);
  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  const [fBenda, fKalimat, fGaris, fBingkai, fDua, fBagan, fKeluarga] = (["benda", "kalimat", "garis", "bingkai", "dua", "bagan", "keluarga"] as const).map((k) => lihat(k));
  useEffect(() => {
    lapor.current?.({ alat: "kurang", t: s.t, k: s.k, benda: fBenda, kalimat: fKalimat, garis: fGaris, bingkai: fBingkai, dua: fDua, bagan: fBagan, keluarga: fKeluarga });
  }, [s.t, s.k, fBenda, fKalimat, fGaris, fBingkai, fDua, fBagan, fKeluarga]);
  // Pasangan tambah baru disebut bila bagan atau keluarga fakta sudah diajarkan.
  const ucapan = ucapanKurang(s.t, s.k, tampil.includes("keluarga"));
  const duaKurang = [`${s.t} − ${s.k} = ${hasil}`, `${s.t} − ${hasil} = ${s.k}`].filter((x, i, a) => a.indexOf(x) === i);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Pengurangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Coret benda yang diambil. Lihat sisanya di banyak gambar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pengurangan ini" onClick={() => speakGuru(ejaHitung(ucapan))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <Pengatur nama="Semua benda" nilai={s.t} onKurang={() => setCoret(ubahTotal(coret, -1))} onTambah={() => setCoret(ubahTotal(coret, 1))} kurangMati={s.t <= 0} tambahMati={s.t >= MAKS} />
        <Pengatur nama="Benda diambil" nilai={s.k} warna="#FEE2E2" onKurang={() => setCoret(ubahAmbil(coret, -1))} onTambah={() => setCoret(ubahAmbil(coret, 1))} kurangMati={s.k <= 0} tambahMati={s.k >= s.t} />
        {bisaDiatur ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
            {tersedia.map((k) => (
              <Cek key={k} aktif={lihatMentah[k]} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
                {LABEL_TAMPIL[k]}
              </Cek>
            ))}
          </div>
        ) : null}
      </div>

      {lihat("benda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Benda • ketuk benda untuk mencoret</p>
          <div className="grid grid-cols-5 gap-1.5 min-[420px]:grid-cols-10" role="group" aria-label={`${s.t} benda, ${s.k} dicoret`}>
            {coret.map((sudah, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Benda ke-${i + 1}${sudah ? ", dicoret" : ""}`}
                  aria-pressed={sudah}
                  onClick={() => setCoret(ketukBenda(coret, i))}
                  className={`relative flex items-center justify-center rounded-lg border-2 px-0.5 py-1 ${sudah ? "border-[#E98989] bg-[#FDECEC]" : "border-[#1C01A5]/40 bg-white"}`}
                >
                  <span className={sudah ? "opacity-40" : ""}>
                    <BendaSvg jenis="jeruk" kelas="h-8 w-8" />
                  </span>
                  {sudah ? (
                    <svg viewBox="0 0 30 30" className="absolute inset-0 m-auto h-8 w-8" aria-hidden="true">
                      <path d="M5 5 L25 25 M25 5 L5 25" stroke="#B91C1C" strokeWidth="3.4" strokeLinecap="round" />
                    </svg>
                  ) : null}
                </button>
              );
            })}
            {s.t === 0 ? <span className="col-span-full text-center text-sm font-black text-[#1C01A5]/50">belum ada benda</span> : null}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Sisa {hasil} benda tidak dicoret</p>
        </div>
      ) : null}

      {lihat("bingkai") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bingkai sepuluh</p>
          <Bingkai sel={selKurang(s.t, s.k)} nama={`Bingkai sepuluh: sisa ${hasil}, dicoret ${s.k}`} />
        </div>
      ) : null}

      {lihat("garis") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan • mulai dari {s.t}, mundur {s.k}</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan: mulai dari ${s.t}, mundur ${s.k} sampai ${hasil}`}
            penanda={[{ n: s.t, warna: MERAH }, ...(s.k > 0 ? [{ n: hasil, warna: HIJAU }] : [])]}
            lompatan={s.k > 0 ? [{ dari: s.t, ke: hasil, warna: BIRU }] : []}
            sorot={[hasil]}
          />
        </div>
      ) : null}

      {lihat("bagan") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bagan pasangan</p>
          <BaganPasangan total={s.t} a={hasil} b={s.k} tanda="-" />
        </div>
      ) : null}

      {lihat("dua") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Dua pengurangan dari satu bagan</p>
          <div className="grid grid-cols-2 gap-1.5" role="list" aria-label="Dua pengurangan">
            {duaKurang.map((f) => (
              <p key={f} role="listitem" className="rounded-xl bg-[#F5F3FF] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
                {f}
              </p>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#14532D]">Gabungan selalu ditulis pertama.</p>
        </div>
      ) : null}

      {lihat("kalimat") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kalimat pengurangan</p>
          <KalimatBesar teks={kalimatKurang(s.t, s.k)} warna="bg-[#FFE566]" />
        </div>
      ) : null}

      {lihat("keluarga") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Keluarga fakta</p>
          <div className="grid grid-cols-2 gap-1.5" role="list" aria-label="Keluarga fakta">
            {keluargaFakta(s.t, s.k).map((f) => (
              <p key={f} role="listitem" className="rounded-xl bg-[#F5F3FF] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
                {f}
              </p>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#14532D]">
            {keluargaFakta(s.t, s.k).length >= 4
              ? "Tiga bilangan yang sama, empat kalimat yang berpasangan."
              : "Tiga bilangan yang sama, kalimatnya saling berpasangan."}
          </p>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru(`Coba ini. ${coba.map((l, i) => `${KATA_URUT[i]}, ${l}`).join(" ")}`)}
        langkah={coba}
      />
    </div>
  );
}
