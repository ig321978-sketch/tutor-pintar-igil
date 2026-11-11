"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { BIRU, BaganPasangan, Bingkai, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import type { KeadaanTambah } from "./misi-bab2";
import { MAKS, bendaGabung, hitungMaju, jumlah, kalimat, kalimatTukar, selGabung, tukar, ubahKelompok, ucapanTambah } from "./lab-tambah-bab2";

/**
 * Perwakilan dan alat yang boleh tampil. Di dalam Materi, tiap sub-bab hanya membuka yang sudah diajarkan
 * sampai sub-bab itu (mis. Tukar tempat dan Bagan pasangan baru di Sub-Bab B), jadi pembungkus memilih `tampil`.
 * `tukar` adalah tombol Tukar tempat (dan kalimat tukarnya), bukan kartu perwakilan.
 */
export type TampilTambah = "benda" | "kalimat" | "bingkai" | "garis" | "bagan" | "tukar";
export const SEMUA_TAMPIL_TAMBAH: TampilTambah[] = ["benda", "kalimat", "bingkai", "garis", "bagan", "tukar"];

type KartuTambah = Exclude<TampilTambah, "tukar">;
const KARTU_TAMBAH: KartuTambah[] = ["benda", "kalimat", "bingkai", "garis", "bagan"];
const LABEL_KARTU: Record<KartuTambah, string> = {
  benda: "Benda",
  kalimat: "Kalimat",
  bingkai: "Bingkai sepuluh",
  garis: "Garis bilangan",
  bagan: "Bagan pasangan",
};

/** Langkah selidik "Coba ini!" yang cocok dengan alat yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilTambah[]): string[] {
  const ada = (k: TampilTambah) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("benda")) hasil.push("Nyalakan Gabungkan kelompok. Hitung semua benda dari 1.");
  if (ada("kalimat")) hasil.push("Ubah kelompok merah atau biru. Lihat kalimat penjumlahannya ikut berubah.");
  if (ada("tukar")) hasil.push("Tekan Tukar tempat. Apakah jumlahnya berubah?");
  if (ada("garis")) hasil.push("Lihat garis bilangan. Mulai dari bilangan merah, lalu hitung maju sebanyak bilangan biru.");
  if (ada("bingkai")) hasil.push("Tambah kelompok biru sampai jumlahnya 10. Apa yang terjadi di bingkai sepuluh?");
  if (ada("bagan")) hasil.push("Lihat bagan pasangan. Dua lingkaran kecil digabung menjadi lingkaran besar.");
  return hasil.slice(0, 4);
}

const KATA_URUT = ["Satu", "Dua", "Tiga", "Empat"];

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 2): Laboratorium Penjumlahan, metode PhET.                 */
/* Dua kelompok digabung dan terlihat sebagai benda, bingkai, bagan, dan      */
/* garis bilangan. Logika di lab-tambah-bab2.ts. Tanpa jaringan.              */
/* ------------------------------------------------------------------------ */

export default function SimulasiTambah({
  speakGuru,
  tampil = SEMUA_TAMPIL_TAMBAH,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  /** Perwakilan dan alat yang tersedia. Bawaan: semuanya (tab Simulasi lama). */
  tampil?: TampilTambah[];
  /** Melapor keadaan ke papan misi (bila ada). */
  onKeadaan?: (k: KeadaanTambah) => void;
}) {
  const [p, setP] = useState({ a: 3, b: 4 });
  const [pesan, setPesan] = useState("");
  const [gabung, setGabung] = useState(false);
  const [ditukar, setDitukar] = useState(0);
  const [lihatMentah, setLihat] = useState<Record<KartuTambah, boolean>>({ benda: true, kalimat: true, bingkai: true, garis: true, bagan: true });
  const c = jumlah(p.a, p.b);

  // Perwakilan di luar `tampil` tidak pernah menyala.
  const ada = (k: TampilTambah) => tampil.includes(k);
  const lihat = (k: KartuTambah) => ada(k) && lihatMentah[k];
  const kartuAda = KARTU_TAMBAH.filter((k) => ada(k));
  const bisaDiatur = kartuAda.length > 1;
  const coba = langkahCoba(tampil);
  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  const benda = lihat("benda"), kalimatTampil = lihat("kalimat"), bingkai = lihat("bingkai"), garis = lihat("garis"), bagan = lihat("bagan");
  useEffect(() => {
    lapor.current?.({ alat: "tambah", a: p.a, b: p.b, ditukar, gabung: gabung && benda, benda, kalimat: kalimatTampil, bingkai, garis, bagan });
  }, [p.a, p.b, ditukar, gabung, benda, kalimatTampil, bingkai, garis, bagan]);

  const ubah = (k: "a" | "b", delta: 1 | -1) => {
    const baru = ubahKelompok(p, k, delta);
    setP({ a: baru.a, b: baru.b });
    setPesan(baru.pesan);
  };

  // Ucapan mengikuti alat yang tampil: kalimat tukar hanya disebut bila Tukar tempat sudah diajarkan.
  const gabungUcap = gabung || !ada("benda");
  const ucapan = ucapanTambah(p.a, p.b, gabungUcap, ada("tukar"));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Penjumlahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur dua kelompok. Gabungkan, lalu lihat jumlahnya di banyak gambar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan penjumlahan ini" onClick={() => speakGuru(ejaHitung(ucapan))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <Pengatur nama="Kelompok merah" nilai={p.a} warna="#FEE2E2" onKurang={() => ubah("a", -1)} onTambah={() => ubah("a", 1)} kurangMati={p.a <= 0} tambahMati={false} />
        <Pengatur nama="Kelompok biru" nilai={p.b} warna="#DBEAFE" onKurang={() => ubah("b", -1)} onTambah={() => ubah("b", 1)} kurangMati={p.b <= 0} tambahMati={false} />
        {pesan ? (
          <p role="status" className="rounded-xl border-2 border-[#E98989] bg-[#FDECEC] px-3 py-1 text-center text-xs font-black text-[#7F1D1D]">
            {pesan}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {ada("benda") ? (
            <Cek aktif={gabung} onKlik={() => setGabung((x) => !x)}>
              Gabungkan kelompok
            </Cek>
          ) : null}
          {ada("tukar") ? (
            <button
              type="button"
              className={TOMBOL_BIASA}
              onClick={() => {
                setP(tukar(p));
                setDitukar((x) => x + 1);
                setPesan("");
              }}
            >
              🔄 Tukar tempat
            </button>
          ) : null}
        </div>
        {bisaDiatur ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
            {kartuAda.map((k) => (
              <Cek key={k} aktif={lihatMentah[k]} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
                {LABEL_KARTU[k]}
              </Cek>
            ))}
          </div>
        ) : null}
      </div>

      {lihat("benda") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Benda • {gabung ? "sudah digabung" : "dua kelompok"}</p>
          {gabung ? (
            <div className="flex min-h-[56px] flex-wrap items-end justify-center gap-1 rounded-2xl border-4 border-[#1C01A5]/40 bg-[#F5F3FF] px-2 py-2" role="img" aria-label={`Semua benda: ${c}`}>
              {c === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">belum ada benda</span> : null}
              {bendaGabung(p.a, p.b).map((x) => (
                <span key={x.no} className="igil-muncul flex flex-col items-center">
                  <BendaSvg jenis={x.grup === "a" ? "bola-merah" : "bola-biru"} kelas="h-8 w-8" />
                  <span className="text-[10px] font-black text-[#1C01A5]">{x.no}</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["a", "Kelompok merah", "#FEE2E2", "bola-merah"],
                  ["b", "Kelompok biru", "#DBEAFE", "bola-biru"],
                ] as const
              ).map(([k, nama, warna, jenis]) => (
                <div key={k} className="flex min-h-[72px] flex-col items-center gap-1 rounded-2xl border-4 border-[#1C01A5]/40 px-1 py-1.5" style={{ backgroundColor: warna }} role="img" aria-label={`${nama}: ${p[k]}`}>
                  <span className="text-[10px] font-black uppercase text-[#1C01A5]/70">
                    {nama} • {p[k]}
                  </span>
                  <span className="flex flex-wrap items-center justify-center gap-0.5">
                    {Array.from({ length: p[k] }, (_, i) => (
                      <span key={i} className="igil-muncul">
                        <BendaSvg jenis={jenis} kelas="h-7 w-7" />
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {lihat("bingkai") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bingkai sepuluh</p>
          <Bingkai sel={selGabung(p.a, p.b)} nama={`Bingkai sepuluh: ${p.a} merah, ${p.b} biru`} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {c} kotak terisi, {MAKS - c} kosong
          </p>
        </div>
      ) : null}

      {lihat("garis") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan • mulai dari {p.a}, maju {p.b}</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan: mulai dari ${p.a}, maju ${p.b} sampai ${c}`}
            penanda={[{ n: p.a, warna: MERAH }, ...(p.b > 0 ? [{ n: c, warna: HIJAU }] : [])]}
            lompatan={p.b > 0 ? [{ dari: p.a, ke: c, warna: BIRU }] : []}
            sorot={[c]}
          />
          <p className="text-center text-xs font-bold text-[#1C01A5]/70">Hitung maju: {hitungMaju(p.a, p.b).join(", ")}</p>
        </div>
      ) : null}

      {lihat("bagan") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bagan pasangan</p>
          <BaganPasangan total={c} a={p.a} b={p.b} />
        </div>
      ) : null}

      {lihat("kalimat") || ada("tukar") ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kalimat penjumlahan</p>
          {lihat("kalimat") ? <KalimatBesar teks={kalimat(p.a, p.b)} warna="bg-[#FFE566]" /> : null}
          {ada("tukar") ? (
            <>
              <KalimatBesar teks={kalimatTukar(p.a, p.b)} />
              <p className="text-center text-sm font-black text-[#14532D]">Tukar tempat, jumlahnya tetap {c}.</p>
            </>
          ) : null}
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
