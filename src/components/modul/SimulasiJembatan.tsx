"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { BIRU, BaganPasangan, GarisAngka, HIJAU, MERAH, Pengatur, PetaStasiun, RiwayatMesin, StatusMesin, ejaHitung } from "./komponen-lab";
import {
  URUT_JEMBATAN,
  awalJembatan,
  bagianPertama,
  halanganJembatan,
  langkahJembatan,
  pilihanSisa,
  soalRonde,
  type Jembatan,
  type KeadaanJembatan,
  type PeristiwaJembatan,
} from "./mesin-jembatan-bab6";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 6): Jembatan Sepuluh, metode mesin keadaan.                */
/* Soal → Pecah → Genapkan → Sisa. Menjumlah lewat sepuluh dengan urutan      */
/* yang dijaga mesin. Logika di mesin-jembatan-bab6.ts. Tanpa jaringan.       */
/* ------------------------------------------------------------------------ */

const STASIUN = [
  { id: "soal", nama: "Soal", ikon: "📜" },
  { id: "pecah", nama: "Pecah", ikon: "✂️" },
  { id: "genapkan", nama: "Genapkan", ikon: "🌉" },
  { id: "sisa", nama: "Sisa", ikon: "❓" },
];

function suaraJembatan(m: Jembatan): string {
  const s = soalRonde(m.ronde);
  switch (m.keadaan) {
    case "soal":
      return `Stasiun satu, Soal. Mesin ini hanya jalan kalau urutannya benar. Soalnya ${s.a} ditambah ${s.b}. Tekan Baca soal.`;
    case "pecah":
      return `Stasiun dua, Pecah. Pecah ${s.b} menjadi dua bagian. Bagian pertama harus pas untuk menggenapkan ${s.a} menjadi sepuluh.`;
    case "genapkan":
      return `Stasiun tiga, Genapkan. Tambahkan ${m.x} ke ${s.a} sampai tepat sepuluh. Tekan Genapkan.`;
    case "sisa":
      return `Stasiun empat, Sisa. Sekarang kamu di sepuluh. Tambahkan sisanya, ${s.b - bagianPertama(s.a)}. Pilih hasil akhirnya.`;
    case "selesai":
      return `Soal selesai. ${s.a} ditambah ${s.b} sama dengan ${s.a + s.b}. Hebat!`;
  }
}

export default function SimulasiJembatan({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [m, setM] = useState<Jembatan>(() => awalJembatan(0));
  const s = soalRonde(m.ronde);
  const posisi = URUT_JEMBATAN.indexOf(m.keadaan);
  const halangan = halanganJembatan(m);
  const y = s.b - bagianPertama(s.a);

  const kirim = (e: PeristiwaJembatan) => {
    const baru = langkahJembatan(m, e);
    setM(baru);
    if (baru.keadaan === "selesai" && m.keadaan !== "selesai") onTuntas();
  };
  const maju = (ke: KeadaanJembatan) => kirim({ t: "LOMPAT", ke });
  const tombolMaju = (ke: KeadaanJembatan, teks: string) => (
    <button type="button" aria-disabled={halangan !== null} onClick={() => maju(ke)} className={`${TOMBOL_UTAMA} ${halangan !== null ? "opacity-60" : ""}`}>
      {teks}
    </button>
  );

  const sudahGenap = m.genap || m.keadaan === "sisa" || m.keadaan === "selesai";
  const lompatan = [
    ...(sudahGenap ? [{ dari: s.a, ke: 10, warna: BIRU, label: `+${bagianPertama(s.a)}` }] : []),
    ...(m.keadaan === "selesai" ? [{ dari: 10, ke: s.a + s.b, warna: HIJAU, label: `+${y}` }] : []),
  ];
  const penanda = m.keadaan === "selesai" ? [{ n: s.a, warna: MERAH }, { n: s.a + s.b, warna: HIJAU }] : sudahGenap ? [{ n: s.a, warna: MERAH }, { n: 10, warna: BIRU }] : [{ n: s.a, warna: MERAH }];
  const terakhir = m.riwayat.length > 0 ? `Mesin pindah: ${m.riwayat[m.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Jembatan Sepuluh</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Mesin hanya jalan kalau urutannya benar. Coba, dan lihat apa kata mesin.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan stasiun ini" onClick={() => speakGuru(ejaHitung(suaraJembatan(m)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Peta stasiun • soal {s.a} + {s.b}
        </p>
        <PetaStasiun stasiun={STASIUN} aktif={Math.min(posisi, STASIUN.length - 1) + (m.keadaan === "selesai" ? 1 : 0)} onPilih={(i) => maju(URUT_JEMBATAN[i])} />
        <GarisAngka maks={20} nama={`Garis bilangan: soal ${s.a} + ${s.b}`} sorot={[10]} lompatan={lompatan} penanda={penanda} />
        <StatusMesin pesan={m.pesan} terakhir={terakhir} awal="Mesin siap. Mulai dari stasiun Soal." />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {m.keadaan === "soal" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 1 • Soal</p>
            <p className="mx-auto w-max rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] px-4 py-2 text-3xl font-black text-[#1C01A5]">
              {s.a} + {s.b} = ?
            </p>
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BACA" })}>
              📜 Baca soal
            </button>
          </div>
        ) : null}

        {m.keadaan === "pecah" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 2 • Pecah {s.b} menjadi dua bagian</p>
            <BaganPasangan total={s.b} a={m.x} b={s.b - m.x} />
            <Pengatur nama="Bagian pertama" nilai={m.x} warna="#DBEAFE" onKurang={() => kirim({ t: "PECAH", delta: -1 })} onTambah={() => kirim({ t: "PECAH", delta: 1 })} kurangMati={m.x <= 0} tambahMati={false} />
            <p className="text-center text-sm font-bold text-[#1C01A5]/80">
              Petunjuk: {s.a} harus menjadi 10 lebih dulu. Berapa lagi yang dibutuhkan?
            </p>
            <div className="flex justify-center">{tombolMaju("genapkan", "➡ Ke stasiun Genapkan")}</div>
          </div>
        ) : null}

        {m.keadaan === "genapkan" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 3 • Genapkan</p>
            <p className="mx-auto w-max rounded-xl bg-[#DBEAFE] px-4 py-2 text-2xl font-black text-[#1C01A5]">
              {s.a} + {m.x} = {m.genap ? 10 : "?"}
            </p>
            {m.genap ? null : (
              <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "GENAPKAN" })}>
                🌉 Genapkan jadi 10
              </button>
            )}
            <div className="flex justify-center">{tombolMaju("sisa", "➡ Ke stasiun Sisa")}</div>
          </div>
        ) : null}

        {m.keadaan === "sisa" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 4 • Sisa</p>
            <p className="text-2xl font-black text-[#1C01A5]">
              10 + {y} = ?
            </p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilihan hasil akhir">
              {pilihanSisa(m.ronde).map((n) => (
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
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Soal selesai!</p>
            <div className="space-y-1">
              <p className="rounded-xl bg-[#E8F7EE] px-3 py-1 text-base font-black text-[#14532D]">
                {s.a} + {bagianPertama(s.a)} = 10
              </p>
              <p className="rounded-xl bg-[#E8F7EE] px-3 py-1 text-base font-black text-[#14532D]">
                10 + {y} = {s.a + s.b}
              </p>
              <p className="rounded-xl bg-[#FFE566] px-3 py-1 text-xl font-black text-[#1C01A5]">
                {s.a} + {s.b} = {s.a + s.b}
              </p>
            </div>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Ambil soal baru
            </button>
          </div>
        ) : null}
      </div>

      <RiwayatMesin riwayat={m.riwayat} ditolak={m.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan stasiun Sisa sebelum waktunya. Apa kata mesin? Dua, di stasiun Pecah, pilih bagian pertama yang salah lalu tekan pindah. Apa kata mesin? Tiga, selesaikan semua stasiun. Lalu ambil soal baru."
          )
        }
        langkah={[
          "Tekan stasiun Sisa sebelum waktunya. Apa kata mesin?",
          "Di Pecah, pilih bagian pertama yang salah, lalu tekan pindah. Apa kata mesin?",
          "Selesaikan semua stasiun, lalu ambil soal baru.",
        ]}
      />
    </div>
  );
}
