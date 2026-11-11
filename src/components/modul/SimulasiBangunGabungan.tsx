"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, ejaHitung } from "./komponen-lab";
import { BANGUN, bangunDari, hitungJenis, kalimatKurang, kalimatTambah, totalBagian, ucapanBangun } from "./lab-gabung-bab4";

const KATA_URUT = ["Satu", "Dua", "Tiga", "Empat"];

const COBA = [
  "Tekan Uraikan bangun. Bagian apa saja yang terlihat?",
  "Ketuk tiap jenis bagian. Berapa banyak bagian tiap jenis?",
  "Lihat kalimat jumlahnya. Apa arti tiap bilangan di kalimat itu?",
  "Ambil satu jenis bagian. Berapa sisanya?",
];

/* ------------------------------------------------------------------------ */
/* Simulasi (Bab 4, Sub-Bab C): Laboratorium Bangun Gabungan, metode PhET.    */
/* Bangun diuraikan jadi bagian, bagian dihitung per jenis. Logika di         */
/* lab-gabung-bab4.ts. Tanpa jaringan.                                        */
/* ------------------------------------------------------------------------ */

export default function SimulasiBangunGabungan({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [idBangun, setIdBangun] = useState("kereta");
  const [urai, setUrai] = useState(false);
  const [jenis, setJenis] = useState<string | null>(null);
  const [diambil, setDiambil] = useState(false);
  const [lihatTabel, setLihatTabel] = useState(true);
  const [lihatKalimat, setLihatKalimat] = useState(true);

  const bangun = bangunDari(idBangun);
  const hitung = hitungJenis(bangun);
  const total = totalBagian(bangun);
  const kurang = jenis && diambil ? kalimatKurang(bangun, jenis) : null;
  const ucapan = ucapanBangun(bangun, urai, jenis, diambil);

  const pilihBangun = (id: string) => {
    setIdBangun(id);
    setJenis(null);
    setDiambil(false);
  };
  const reset = () => {
    setIdBangun("kereta");
    setUrai(false);
    setJenis(null);
    setDiambil(false);
    setLihatTabel(true);
    setLihatKalimat(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Bangun Gabungan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Uraikan bangunnya menjadi bagian. Lalu hitung tiap jenis bagian.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bangun ini" onClick={() => speakGuru(ejaHitung(ucapan))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pilih bangun</p>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bangun">
          {BANGUN.map((b) => (
            <Pilihan key={b.id} aktif={idBangun === b.id} onKlik={() => pilihBangun(b.id)}>
              {b.nama}
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          <Cek aktif={urai} onKlik={() => setUrai((x) => !x)}>
            Uraikan bangun
          </Cek>
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((x) => !x)}>
            Tabel hitung
          </Cek>
          <Cek aktif={lihatKalimat} onKlik={() => setLihatKalimat((x) => !x)}>
            Kalimat jumlah
          </Cek>
        </div>
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {bangun.nama} • {urai ? "diuraikan" : "tersusun"} dari {total} {bangun.satuan}
        </p>
        <svg viewBox="0 0 160 90" className="mx-auto block w-full max-w-[360px] rounded-2xl bg-[#F5F3FF]" role="img" aria-label={`${bangun.nama}, ${urai ? "diuraikan" : "tersusun"} dari ${total} ${bangun.satuan}`}>
          {bangun.bagian.map((p) => {
            const dipilih = jenis !== null && p.jenis === jenis;
            const redup = jenis !== null && !dipilih && !diambil;
            const ambil = diambil && dipilih;
            const geser = urai ? `translate(${p.dx}px, ${p.dy}px)` : "translate(0px, 0px)";
            return (
              <g key={p.id} style={{ transform: geser, transition: "transform 0.5s", opacity: redup ? 0.3 : ambil ? 0.3 : 1 }}>
                {dipilih && !ambil ? <path d={p.d} fill="none" stroke="#F0AB00" strokeWidth={p.garis ? 10 : 5} strokeLinejoin="round" strokeLinecap="round" /> : null}
                {p.garis ? (
                  <path d={p.d} fill="none" stroke={p.warna} strokeWidth="5" strokeLinecap="round" strokeDasharray={ambil ? "2 7" : undefined} />
                ) : (
                  <path d={p.d} fill={ambil ? "none" : p.warna} stroke="#1C01A5" strokeWidth="1.6" strokeLinejoin="round" strokeDasharray={ambil ? "3 3" : undefined} />
                )}
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Tunjuk jenis bagian">
          <Pilihan
            aktif={jenis === null}
            onKlik={() => {
              setJenis(null);
              setDiambil(false);
            }}
          >
            Semua
          </Pilihan>
          {hitung.map((j) => (
            <Pilihan key={j.id} aktif={jenis === j.id} onKlik={() => setJenis(jenis === j.id ? null : j.id)}>
              {j.nama} {j.jumlah}
            </Pilihan>
          ))}
        </div>
        {jenis !== null ? (
          <div className="flex justify-center">
            <Cek aktif={diambil} onKlik={() => setDiambil((x) => !x)}>
              Ambil jenis yang ditunjuk
            </Cek>
          </div>
        ) : null}
      </div>

      {lihatTabel ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel hitung</p>
          <table className="w-full border-collapse text-center text-base font-black text-[#1C01A5]" aria-label="Tabel banyak bagian tiap jenis">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-[#1C01A5]/70">
                <th className="border-b-2 border-[#1C01A5]/30 py-1">Jenis</th>
                <th className="border-b-2 border-[#1C01A5]/30 py-1">Banyak</th>
              </tr>
            </thead>
            <tbody>
              {hitung.map((j) => (
                <tr key={j.id} className={jenis === j.id ? "bg-[#FFF7CC]" : ""}>
                  <td className="border-b border-[#1C01A5]/15 py-1">{j.nama}</td>
                  <td className="border-b border-[#1C01A5]/15 py-1 text-2xl">{j.jumlah}</td>
                </tr>
              ))}
              <tr className="bg-[#E8F7EE]">
                <td className="py-1">Semua {bangun.satuan}</td>
                <td className="py-1 text-2xl">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      {lihatKalimat ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kalimat jumlah</p>
          <KalimatBesar teks={kalimatTambah(bangun)} warna="bg-[#FFE566]" />
          {kurang ? (
            <>
              <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Satu jenis diambil</p>
              <KalimatBesar teks={kurang} warna="bg-[#FEE2E2]" />
            </>
          ) : null}
        </div>
      ) : null}

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${COBA.map((l, i) => `${KATA_URUT[i]}, ${l}`).join(" ")}`)} langkah={COBA} />
    </div>
  );
}
