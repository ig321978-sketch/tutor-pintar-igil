"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { Pengatur, PetaStasiun, RiwayatMesin, StatusMesin, ejaHitung } from "./komponen-lab";
import {
  URUT_TAMBAH,
  awalTambah,
  halanganTambah,
  langkahTambah,
  pesananRonde,
  pilihanHasil,
  type KeadaanTambah,
  type MesinTambah,
  type PeristiwaTambah,
} from "./mesin-tambah-bab2";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 2): Mesin Tambah, metode mesin keadaan.                    */
/* Pesanan → Kotak A → Kotak B → Gabung → Hasil. Mesin menolak lompatan.      */
/* Logika di mesin-tambah-bab2.ts. Tanpa jaringan.                            */
/* ------------------------------------------------------------------------ */

const STASIUN = [
  { id: "pesan", nama: "Pesanan", ikon: "📨" },
  { id: "kotakA", nama: "Kotak A", ikon: "🔴" },
  { id: "kotakB", nama: "Kotak B", ikon: "🔵" },
  { id: "gabung", nama: "Gabung", ikon: "🔗" },
  { id: "hasil", nama: "Hasil", ikon: "❓" },
];

function Kotak({ n, jenis, nama }: { n: number; jenis: "bola-merah" | "bola-biru"; nama: string }) {
  return (
    <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-0.5 rounded-2xl border-4 border-dashed border-[#A8672D] bg-[#FDE9C4] px-2 py-1.5" role="img" aria-label={`${nama}: ${n} bola`}>
      {n === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">kotak kosong</span> : null}
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="igil-muncul">
          <BendaSvg jenis={jenis} kelas="h-8 w-8" />
        </span>
      ))}
    </div>
  );
}

function suaraTambah(m: MesinTambah): string {
  const p = pesananRonde(m.ronde);
  switch (m.keadaan) {
    case "pesan":
      return `Stasiun satu, Pesanan. Mesin ini hanya jalan kalau urutannya benar. Pesanannya: ${p.a} ditambah ${p.b}. Tekan Terima pesanan.`;
    case "kotakA":
      return `Stasiun dua, Kotak A. Isi kotak A dengan ${p.a} bola merah.`;
    case "kotakB":
      return `Stasiun tiga, Kotak B. Isi kotak B dengan ${p.b} bola biru.`;
    case "gabung":
      return "Stasiun empat, Gabung. Tekan Gabungkan untuk menyatukan kedua kotak.";
    case "hasil":
      return `Stasiun lima, Hasil. ${p.a} ditambah ${p.b} sama dengan berapa? Pilih jawabannya.`;
    case "selesai":
      return `Pesanan selesai. ${p.a} ditambah ${p.b} sama dengan ${p.a + p.b}. Hebat!`;
  }
}

export default function SimulasiMesinTambah({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [m, setM] = useState<MesinTambah>(() => awalTambah(0));
  const p = pesananRonde(m.ronde);
  const posisi = URUT_TAMBAH.indexOf(m.keadaan);
  const halangan = halanganTambah(m);

  const kirim = (e: PeristiwaTambah) => {
    const baru = langkahTambah(m, e);
    setM(baru);
    if (baru.keadaan === "selesai" && m.keadaan !== "selesai") onTuntas();
  };
  const maju = (ke: KeadaanTambah) => kirim({ t: "LOMPAT", ke });

  const tombolMaju = (ke: KeadaanTambah, teks: string) => (
    <button type="button" aria-disabled={halangan !== null} onClick={() => maju(ke)} className={`${TOMBOL_UTAMA} ${halangan !== null ? "opacity-60" : ""}`}>
      {teks}
    </button>
  );

  const terakhir = m.riwayat.length > 0 ? `Mesin pindah: ${m.riwayat[m.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Tambah</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Mesin hanya jalan kalau urutannya benar. Coba, dan lihat apa kata mesin.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan stasiun ini" onClick={() => speakGuru(ejaHitung(suaraTambah(m)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Peta stasiun • pesanan {p.a} + {p.b}
        </p>
        <PetaStasiun stasiun={STASIUN} aktif={Math.min(posisi, STASIUN.length - 1) + (m.keadaan === "selesai" ? 1 : 0)} onPilih={(i) => maju(URUT_TAMBAH[i])} />
        <StatusMesin pesan={m.pesan} terakhir={terakhir} awal="Mesin siap. Mulai dari stasiun Pesanan." />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {m.keadaan === "pesan" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 1 • Pesanan</p>
            <p className="mx-auto w-max rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] px-4 py-2 text-3xl font-black text-[#1C01A5]">
              {p.a} + {p.b} = ?
            </p>
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "TERIMA" })}>
              📨 Terima pesanan
            </button>
          </div>
        ) : null}

        {m.keadaan === "kotakA" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 2 • Kotak A (isi {p.a} bola merah)</p>
            <Kotak n={m.a} jenis="bola-merah" nama="Kotak A" />
            <Pengatur nama="Kotak A" nilai={m.a} warna="#FEE2E2" onKurang={() => kirim({ t: "UBAH", k: "a", delta: -1 })} onTambah={() => kirim({ t: "UBAH", k: "a", delta: 1 })} kurangMati={m.a <= 0} tambahMati={false} />
            <div className="flex justify-center">{tombolMaju("kotakB", "➡ Ke stasiun Kotak B")}</div>
          </div>
        ) : null}

        {m.keadaan === "kotakB" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 3 • Kotak B (isi {p.b} bola biru)</p>
            <Kotak n={m.a} jenis="bola-merah" nama="Kotak A" />
            <Kotak n={m.b} jenis="bola-biru" nama="Kotak B" />
            <Pengatur nama="Kotak B" nilai={m.b} warna="#DBEAFE" onKurang={() => kirim({ t: "UBAH", k: "b", delta: -1 })} onTambah={() => kirim({ t: "UBAH", k: "b", delta: 1 })} kurangMati={m.b <= 0} tambahMati={false} />
            <div className="flex justify-center">{tombolMaju("gabung", "➡ Ke stasiun Gabung")}</div>
          </div>
        ) : null}

        {m.keadaan === "gabung" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 4 • Gabung</p>
            {m.digabung ? (
              <div className="flex flex-wrap items-center justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5]/40 bg-[#F5F3FF] px-2 py-2" role="img" aria-label={`Kotak gabungan: ${m.a + m.b} bola`}>
                {Array.from({ length: m.a + m.b }, (_, i) => (
                  <span key={i} className="igil-muncul">
                    <BendaSvg jenis={i < m.a ? "bola-merah" : "bola-biru"} kelas="h-8 w-8" />
                  </span>
                ))}
              </div>
            ) : (
              <>
                <Kotak n={m.a} jenis="bola-merah" nama="Kotak A" />
                <Kotak n={m.b} jenis="bola-biru" nama="Kotak B" />
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "GABUNG" })}>
                  🔗 Gabungkan
                </button>
              </>
            )}
            <div className="flex justify-center">{tombolMaju("hasil", "➡ Ke stasiun Hasil")}</div>
          </div>
        ) : null}

        {m.keadaan === "hasil" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 5 • Hasil</p>
            <p className="text-2xl font-black text-[#1C01A5]">
              {p.a} + {p.b} = ?
            </p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilihan hasil">
              {pilihanHasil(m.ronde).map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Hasil ${n}`}
                  onClick={() => kirim({ t: "JAWAB", nilai: n })}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-3xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {m.keadaan === "selesai" ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Pesanan selesai!</p>
            <p className="mx-auto w-max rounded-xl bg-[#E8F7EE] px-4 py-2 text-2xl font-black text-[#14532D]">
              {p.a} + {p.b} = {p.a + p.b}
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Ambil pesanan baru
            </button>
          </div>
        ) : null}
      </div>

      <RiwayatMesin riwayat={m.riwayat} ditolak={m.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            `Coba ini. Satu, tekan stasiun Hasil sebelum waktunya. Apa kata mesin? Dua, di stasiun Kotak A, isi kotak kurang dari pesanan lalu tekan pindah. Apa kata mesin? Tiga, selesaikan semua stasiun. Lalu ambil pesanan baru.`
          )
        }
        langkah={[
          "Tekan stasiun Hasil sebelum waktunya. Apa kata mesin?",
          "Di Kotak A, isi kotak kurang dari pesanan, lalu tekan pindah. Apa kata mesin?",
          "Selesaikan semua stasiun, lalu ambil pesanan baru.",
        ]}
      />
    </div>
  );
}