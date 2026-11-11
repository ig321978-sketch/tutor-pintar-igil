"use client";

import React, { useEffect, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { EMAS, KalimatBesar, Pengatur, UNGU, eja } from "./komponen-lab";
import {
  AWAL_SISI,
  NAMA_LENGKUNG,
  NAMA_SEGI,
  NAMA_SKALA,
  SEGI,
  SKALA,
  batasSisi,
  ciri,
  kalimatBentuk,
  kalimatPas,
  kategori,
  namaBentuk,
  pasDenganCetakan,
  putarBatas,
  titikNomorSisi,
  titikSegi,
  ucapanBentuk,
  type Bentuk,
  type Lengkung,
  type Sisi,
} from "./lab-bentuk-k2b3";
import type { KeadaanBentuk } from "./misi-k2bab3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B3): Laboratorium Bentuk Datar — PhET.                         */
/* Satu bentuk → gambar, sisi bernomor, sudut, tabel ciri, kalimat.           */
/* Memutar dan membesarkan tidak mengubah ciri. Cetakan (garis putus-putus)   */
/* menunjukkan siapa yang selalu pas bila diputar. Logika: lab-bentuk-k2b3.ts. */
/* ------------------------------------------------------------------------ */

const JARI_DASAR = 62;
const WARNA_ISI = "#C7D2FE";

export default function SimulasiBentukDatar({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBentuk) => void }) {
  const [tipe, setTipe] = useState<"segi" | "lengkung">("segi");
  const [n, setN] = useState<Sisi>(AWAL_SISI);
  const [lk, setLk] = useState<Lengkung>("lingkaran");
  const [putar, setPutar] = useState(0);
  const [skala, setSkala] = useState(1);
  const [lihatSisi, setLihatSisi] = useState(true);
  const [lihatSudut, setLihatSudut] = useState(false);
  const [lihatTabel, setLihatTabel] = useState(true);
  const [lihatCetakan, setLihatCetakan] = useState(false);

  const bentuk: Bentuk = tipe === "segi" ? { tipe: "segi", n } : { tipe: "lengkung", jenis: lk };
  const pas = pasDenganCetakan(bentuk, putar);
  const c = ciri(bentuk);

  useEffect(() => {
    onKeadaan?.({ alat: "bentuk", tipe, n, jenis: lk, putar, skala, cetakan: lihatCetakan, pas, sisi: lihatSisi });
  }, [onKeadaan, tipe, n, lk, putar, skala, lihatCetakan, pas, lihatSisi]);
  const jari = JARI_DASAR * SKALA[skala];
  const titik = tipe === "segi" ? titikSegi(n, jari, putar, [100, 100]) : [];
  const nomor = tipe === "segi" ? titikNomorSisi(titik, 13, [100, 100]) : [];
  const poin = titik.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  const poinCetakan = tipe === "segi" ? titikSegi(n, jari, 0, [100, 100]).map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ") : "";

  const resetSemua = () => {
    setTipe("segi");
    setN(AWAL_SISI);
    setLk("lingkaran");
    setPutar(0);
    setSkala(1);
    setLihatSisi(true);
    setLihatSudut(false);
    setLihatTabel(true);
    setLihatCetakan(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Bentuk Datar</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ubah sisinya, putar, dan besarkan. Lihat apa yang tetap sama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bentuk ini" onClick={() => speakGuru(eja(ucapanBentuk(bentuk, putar, skala)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Jenis bentuk">
          <Pilihan aktif={tipe === "segi"} onKlik={() => setTipe("segi")}>
            Segi banyak
          </Pilihan>
          <Pilihan aktif={tipe === "lengkung"} onKlik={() => setTipe("lengkung")}>
            Bentuk lengkung
          </Pilihan>
        </div>

        {tipe === "segi" ? (
          <Pengatur
            nama="Banyak sisi"
            nilai={n}
            onKurang={() => setN(batasSisi(n - 1))}
            onTambah={() => setN(batasSisi(n + 1))}
            kurangMati={n <= SEGI[0]}
            tambahMati={n >= SEGI[SEGI.length - 1]}
          />
        ) : (
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bentuk lengkung">
            {(Object.keys(NAMA_LENGKUNG) as Lengkung[]).map((j) => (
              <Pilihan key={j} aktif={lk === j} onKlik={() => setLk(j)}>
                {NAMA_LENGKUNG[j]}
              </Pilihan>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <button type="button" className={TOMBOL_BIASA} aria-label="Putar ke kiri 30 derajat" onClick={() => setPutar(putarBatas(putar - 30))}>
            ⟲ Putar
          </button>
          <span className="min-w-[3.5rem] text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
            {putar}°
          </span>
          <button type="button" className={TOMBOL_BIASA} aria-label="Putar ke kanan 30 derajat" onClick={() => setPutar(putarBatas(putar + 30))}>
            Putar ⟳
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Ukuran bentuk">
          {NAMA_SKALA.map((nama, i) => (
            <Pilihan key={nama} aktif={skala === i} onKlik={() => setSkala(i)}>
              {nama}
            </Pilihan>
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {namaBentuk(bentuk)} • {kategori(bentuk)}
        </p>
        <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[280px] rounded-2xl bg-indigo-50/60" role="img" aria-label={`${namaBentuk(bentuk)}. ${kalimatBentuk(bentuk)}`}>
          {lihatCetakan ? (
            tipe === "segi" ? (
              <polygon points={poinCetakan} fill="#FEE2E2" stroke="#EF4444" strokeWidth={3} strokeDasharray="6 4" strokeLinejoin="round" />
            ) : lk === "lingkaran" ? (
              <circle cx={100} cy={100} r={jari} fill="#FEE2E2" stroke="#EF4444" strokeWidth={3} strokeDasharray="6 4" />
            ) : (
              <ellipse cx={100} cy={100} rx={jari} ry={jari * 0.62} fill="#FEE2E2" stroke="#EF4444" strokeWidth={3} strokeDasharray="6 4" />
            )
          ) : null}
          {tipe === "segi" ? (
            <>
              <polygon points={poin} fill={WARNA_ISI} stroke={UNGU} strokeWidth={4} strokeLinejoin="round" />
              {lihatSudut
                ? titik.map((p, i) => (
                    <g key={`sd${i}`}>
                      <circle cx={p[0]} cy={p[1]} r={7} fill={EMAS} stroke={UNGU} strokeWidth={2} />
                    </g>
                  ))
                : null}
              {lihatSisi
                ? nomor.map((p, i) => (
                    <g key={`ns${i}`}>
                      <circle cx={p[0]} cy={p[1]} r={9} fill="#fff" stroke={UNGU} strokeWidth={2} />
                      <text x={p[0]} y={p[1] + 4.5} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
                        {i + 1}
                      </text>
                    </g>
                  ))
                : null}
            </>
          ) : lk === "lingkaran" ? (
            <circle cx={100} cy={100} r={jari} fill={WARNA_ISI} stroke={UNGU} strokeWidth={4} />
          ) : (
            <ellipse cx={100} cy={100} rx={jari} ry={jari * 0.62} fill={WARNA_ISI} stroke={UNGU} strokeWidth={4} transform={`rotate(${putar} 100 100)`} />
          )}
        </svg>
        <KalimatBesar teks={kalimatBentuk(bentuk)} warna="bg-[#FFE566]" />
        {lihatCetakan ? (
          <p role="status" className={`rounded-xl px-3 py-1.5 text-center text-sm font-black ${pas ? "bg-[#E8F7EE] text-[#14532D]" : "bg-[#FDECEC] text-[#7F1D1D]"}`}>
            {pas ? "✅ Pas." : "⚠️ Tidak pas."} {kalimatPas(bentuk, putar)}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={lihatSisi} onKlik={() => setLihatSisi((x) => !x)}>
            Nomor sisi
          </Cek>
          <Cek aktif={lihatCetakan} onKlik={() => setLihatCetakan((x) => !x)}>
            Cetakan
          </Cek>
          <Cek aktif={lihatSudut} onKlik={() => setLihatSudut((x) => !x)}>
            Titik sudut
          </Cek>
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((x) => !x)}>
            Tabel ciri
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      {lihatTabel ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel ciri</p>
          <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel ciri bentuk">
            <div role="row" className="grid grid-cols-4 bg-indigo-50 text-center text-xs font-black text-[#1C01A5]">
              <p role="columnheader" className="px-1 py-1.5">Bentuk</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Sisi lurus</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Sudut</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Garis lengkung</p>
            </div>
            <div role="row" className="grid grid-cols-4 border-t-4 border-[#1C01A5] bg-white text-center font-black text-[#1C01A5]">
              <p role="cell" className="px-1 py-2 text-sm">
                {tipe === "segi" ? NAMA_SEGI[n] : NAMA_LENGKUNG[lk]}
              </p>
              <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-2 text-2xl text-blue-700">
                {c.sisiLurus}
              </p>
              <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-2 text-2xl text-blue-700">
                {c.sudut}
              </p>
              <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-2 text-2xl text-blue-700">
                {c.garisLengkung ? "Ada" : "Tidak"}
              </p>
            </div>
          </div>
          <p role="status" className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
            {putar !== 0 || skala !== 1 ? "Sudah diputar atau diubah ukurannya, ciri tetap sama." : "Putar atau besarkan, lalu lihat tabelnya."}
          </p>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, atur enam sisi lalu hitung sisinya lewat nomor. Dua, putar dan besarkan bentuknya. Apakah jumlah sisinya berubah? Tiga, pindah ke bentuk lengkung. Berapa sisi lurusnya? Empat, kurangi sisi sampai tiga. Apa namanya? Lima, nyalakan cetakan lalu putar lingkaran dan bentuk lonjong. Mana yang selalu pas?"
          )
        }
        langkah={[
          "Atur 6 sisi, lalu hitung sisinya lewat nomor.",
          "Putar dan besarkan bentuknya. Apakah jumlah sisinya berubah?",
          "Pindah ke Bentuk lengkung. Berapa sisi lurusnya?",
          "Kurangi sisi sampai 3. Apa namanya?",
          "Nyalakan Cetakan, lalu putar lingkaran dan bentuk lonjong. Mana yang selalu pas?",
        ]}
      />
    </div>
  );
}
