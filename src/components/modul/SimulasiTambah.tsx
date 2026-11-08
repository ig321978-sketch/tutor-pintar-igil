"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { BIRU, BaganPasangan, Bingkai, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import { MAKS, bendaGabung, hitungMaju, jumlah, kalimat, kalimatTukar, selGabung, tukar, ubahKelompok, ucapanTambah } from "./lab-tambah-bab2";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 2): Laboratorium Penjumlahan, metode PhET.                 */
/* Dua kelompok digabung dan terlihat sebagai benda, bingkai, bagan, dan      */
/* garis bilangan. Logika di lab-tambah-bab2.ts. Tanpa jaringan.              */
/* ------------------------------------------------------------------------ */

export default function SimulasiTambah({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [p, setP] = useState({ a: 3, b: 4 });
  const [pesan, setPesan] = useState("");
  const [gabung, setGabung] = useState(false);
  const c = jumlah(p.a, p.b);

  const ubah = (k: "a" | "b", delta: 1 | -1) => {
    const baru = ubahKelompok(p, k, delta);
    setP({ a: baru.a, b: baru.b });
    setPesan(baru.pesan);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Penjumlahan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur dua kelompok. Gabungkan, lalu lihat jumlahnya di banyak gambar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan penjumlahan ini" onClick={() => speakGuru(ejaHitung(ucapanTambah(p.a, p.b, gabung)))} />
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
          <Cek aktif={gabung} onKlik={() => setGabung((x) => !x)}>
            Gabungkan kelompok
          </Cek>
          <button
            type="button"
            className={TOMBOL_BIASA}
            onClick={() => {
              setP(tukar(p));
              setPesan("");
            }}
          >
            🔄 Tukar tempat
          </button>
        </div>
      </div>

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

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bingkai sepuluh</p>
        <Bingkai sel={selGabung(p.a, p.b)} nama={`Bingkai sepuluh: ${p.a} merah, ${p.b} biru`} />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {c} kotak terisi, {MAKS - c} kosong
        </p>
      </div>

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

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bagan pasangan dan kalimat</p>
        <BaganPasangan total={c} a={p.a} b={p.b} />
        <KalimatBesar teks={kalimat(p.a, p.b)} warna="bg-[#FFE566]" />
        <KalimatBesar teks={kalimatTukar(p.a, p.b)} />
        <p className="text-center text-sm font-black text-[#14532D]">Tukar tempat, jumlahnya tetap {c}.</p>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan gabungkan kelompok. Hitung semua benda dari satu. Dua, tekan tukar tempat. Apakah jumlahnya berubah? Tiga, tambah kelompok biru sampai jumlahnya sepuluh. Apa yang terjadi di bingkai sepuluh?"
          )
        }
        langkah={[
          "Nyalakan Gabungkan kelompok. Hitung semua benda dari 1.",
          "Tekan Tukar tempat. Apakah jumlahnya berubah?",
          "Tambah kelompok biru sampai jumlahnya 10. Apa yang terjadi di bingkai sepuluh?",
        ]}
      />
    </div>
  );
}
