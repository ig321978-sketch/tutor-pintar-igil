"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { ItemSvg } from "./dasar-k2b5";
import { NAMA_ITEM } from "./data-k2b5";
import {
  OPSI_CEK,
  STASIUN_MESIN_KUMPULAN,
  awalMesinKumpulan,
  indeksStasiunKumpulan,
  kumpulanAktif,
  langkahMesinKumpulan,
  opsiHasil,
  opsiHitungKumpulan,
  petunjukMesinKumpulan,
  ringkasKumpulan,
  type MesinKumpulan,
  type PeristiwaMesinKumpulan,
} from "./mesin-kumpulan-k2b5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B5 Sub-Bab B): Mesin Pembagi Adil — mesin keadaan.              */
/* Hitung → Cek → Hasil. Mesin menolak lompatan dan memberi petunjuk, tanpa    */
/* hukuman. Logika: mesin-kumpulan-k2b5.ts.                                    */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

const warnaBenda = (benda: keyof typeof NAMA_ITEM, i: number) => NAMA_ITEM[benda].warna[i % NAMA_ITEM[benda].warna.length];

export default function SimulasiMesinKumpulan({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinKumpulan>(() => awalMesinKumpulan());
  const [tanda, setTanda] = useState<number[]>([]);
  const d = kumpulanAktif(x);
  const aktif = indeksStasiunKumpulan(x.keadaan);

  const kirim = (e: PeristiwaMesinKumpulan) => {
    const baru = langkahMesinKumpulan(x, e);
    if (baru.misi !== x.misi || e.t === "ULANG") setTanda([]);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const ketuk = (i: number) => {
    if (x.keadaan !== "hitung") return;
    setTanda((t) => (t.includes(i) ? t.filter((j) => j !== i) : [...t, i]));
  };

  const suara = x.selesai ? "Semua kumpulan sudah diperiksa. Hebat, kamu pembagi yang adil!" : `Kumpulan ${x.misi + 1} dari ${x.daftar.length}, ${d.nama}. ${petunjukMesinKumpulan(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";
  const jumlahPasang = Math.floor(d.n / 2);
  const adaSisa = d.n % 2 === 1;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Pembagi Adil</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Jawab tiga pertanyaan berurutan untuk memeriksa setiap kumpulan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pertanyaannya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_KUMPULAN} aktif={aktif} nama="Peta mesin pembagi adil" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua kumpulan selesai" : `Kumpulan ${x.misi + 1} dari ${x.daftar.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinKumpulan(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua kumpulan diperiksa!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Urutan pemeriksaanmu sudah rapi.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-sm font-black text-[#1C01A5]">{d.nama}</p>

            {x.keadaan === "hitung" ? (
              <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-indigo-50/60 p-2" role="group" aria-label={`Kumpulan benda, ketuk untuk menghitung`}>
                {Array.from({ length: d.n }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => ketuk(i)}
                    aria-label={`${NAMA_ITEM[d.benda].tunggal} ke-${i + 1}${tanda.includes(i) ? `, sudah dihitung nomor ${tanda.indexOf(i) + 1}` : ""}`}
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl border-2 ${tanda.includes(i) ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-transparent bg-white"}`}
                  >
                    <ItemSvg jenis={d.benda} warna={warnaBenda(d.benda, i)} kelas="h-9 w-9" />
                    {tanda.includes(i) ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1C01A5] px-1 text-[11px] font-black text-white">{tanda.indexOf(i) + 1}</span> : null}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-indigo-50/60 p-2" role="img" aria-label={`${d.n} ${NAMA_ITEM[d.benda].jamak} berpasangan, ${jumlahPasang} pasang${adaSisa ? ", sisa satu" : ""}`}>
                {Array.from({ length: jumlahPasang }, (_, p) => (
                  <span key={p} className="flex items-center gap-0.5 rounded-xl border-2 border-[#7FCB96] bg-[#E8F7EE] px-1 py-0.5">
                    <ItemSvg jenis={d.benda} warna={warnaBenda(d.benda, 2 * p)} kelas="h-8 w-8" />
                    <ItemSvg jenis={d.benda} warna={warnaBenda(d.benda, 2 * p + 1)} kelas="h-8 w-8" />
                  </span>
                ))}
                {adaSisa ? (
                  <span className="flex items-center rounded-xl border-2 border-dashed border-[#DC2626] bg-[#FEE2E2] px-1 py-0.5">
                    <ItemSvg jenis={d.benda} warna={warnaBenda(d.benda, d.n - 1)} kelas="h-8 w-8" />
                    <span className="px-1 text-[11px] font-black text-[#7F1D1D]">tanpa pasangan</span>
                  </span>
                ) : null}
              </div>
            )}
            {x.keadaan === "hitung" ? <p className="text-center text-xs font-bold text-[#1C01A5]/70">Ketuk benda satu per satu untuk menghitung.</p> : null}

            {x.keadaan === "hitung" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Hitung • Ada berapa semuanya?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih banyak benda">
                  {opsiHitungKumpulan(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "HITUNG", nilai: Number(o.kunci) })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "cek" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Cek • Bisa dibagi dua sama banyak?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Bisa dibagi atau tidak">
                  {OPSI_CEK.map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "CEK", nilai: o.kunci as "bisa" | "tidak" })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "hasil" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Hasil • {d.n % 2 === 0 ? "Berapa di setiap kelompok?" : "Apa yang terjadi?"}</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih hasil">
                  {opsiHasil(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "HASIL", nilai: o.kunci })}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {ringkasKumpulan(d)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Kumpulan berikutnya ➡" : "Selesai 🏁"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, ketuk stasiun Hasil sebelum menghitung. Apa kata mesin? Dua, pada Apel Tika, mengapa tidak bisa dibagi dua sama banyak? Tiga, bandingkan Kelereng Malosi dan Balon Kira. Apa yang berbeda pada pasangannya?"
          )
        }
        langkah={[
          "Ketuk stasiun Hasil sebelum menghitung. Apa kata mesin?",
          "Pada Apel Tika, mengapa tidak bisa dibagi dua sama banyak?",
          "Bandingkan Kelereng Malosi dan Balon Kira. Apa yang berbeda pada pasangannya?",
        ]}
      />
    </div>
  );
}
