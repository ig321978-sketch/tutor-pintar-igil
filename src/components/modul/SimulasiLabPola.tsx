"use client";

import React, { useEffect, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, UNGU, eja } from "./komponen-lab";
import {
  AWAL_N,
  MAKS_N,
  MIN_N,
  NAMA_CARA,
  NAMA_N,
  URUT_CARA,
  banyakSegitiga,
  batasN,
  kalimatPola,
  rumusPola,
  tabelPola,
  titikPola,
  titikSegitiga,
  ucapanPola,
  type CaraPola,
} from "./lab-pola-k2b3";
import type { KeadaanPola } from "./misi-k2bab3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B3): Lab Pola Segitiga — PhET.                                 */
/* Segi banyak diurai menjadi segitiga dengan dua cara. Gambar, hitungan,     */
/* tabel, dan kalimat berubah bersama. Logika: lab-pola-k2b3.ts.              */
/* ------------------------------------------------------------------------ */

const WARNA = ["#FDE68A", "#BFDBFE", "#BBF7D0", "#FBCFE8", "#DDD6FE", "#A5F3FC", "#FED7AA", "#E9D5FF"];
const JARI = 74;
const PUSAT: [number, number] = [100, 100];

const poin = (t: [number, number][]) => t.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

function GambarPola({ n, cara, judul }: { n: number; cara: CaraPola; judul?: string }) {
  const tri = titikSegitiga(n, cara, JARI, PUSAT);
  const pojok = titikPola(n, JARI, PUSAT);
  return (
    <figure className="min-w-0 flex-1">
      {judul ? <figcaption className="mb-1 text-center text-xs font-black text-[#1C01A5]">{judul}</figcaption> : null}
      <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[260px] rounded-2xl bg-indigo-50/60" role="img" aria-label={`${NAMA_N[n]} diurai ${NAMA_CARA[cara].toLowerCase()} menjadi ${banyakSegitiga(n, cara)} segitiga`}>
        {tri.map((t, i) => (
          <g key={i}>
            <polygon points={poin(t)} fill={WARNA[i % WARNA.length]} stroke={UNGU} strokeWidth={2.5} strokeLinejoin="round" />
            <text
              x={(t[0][0] + t[1][0] + t[2][0]) / 3}
              y={(t[0][1] + t[1][1] + t[2][1]) / 3 + 4.5}
              textAnchor="middle"
              fontSize={n >= 7 ? 10 : 13}
              fontWeight={900}
              fill={UNGU}
            >
              {i + 1}
            </text>
          </g>
        ))}
        <polygon points={poin(pojok)} fill="none" stroke={UNGU} strokeWidth={4} strokeLinejoin="round" />
      </svg>
    </figure>
  );
}

export default function SimulasiLabPola({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPola) => void }) {
  const [n, setN] = useState(AWAL_N);
  const [cara, setCara] = useState<CaraPola>("pojok");
  const [banding, setBanding] = useState(false);
  const [tabel, setTabel] = useState(true);

  const lain: CaraPola = cara === "pojok" ? "tengah" : "pojok";
  const jumlah = banyakSegitiga(n, cara);

  useEffect(() => {
    onKeadaan?.({ alat: "pola", n, cara, banding, tabel });
  }, [onKeadaan, n, cara, banding, tabel]);

  const resetSemua = () => {
    setN(AWAL_N);
    setCara("pojok");
    setBanding(false);
    setTabel(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Pola Segitiga</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Uraikan segi banyak menjadi segitiga. Ganti cara dan lihat banyaknya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pola ini" onClick={() => speakGuru(eja(ucapanPola(n, cara, banding)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <Pengatur nama="Banyak sisi" nilai={n} onKurang={() => setN(batasN(n - 1))} onTambah={() => setN(batasN(n + 1))} kurangMati={n <= MIN_N} tambahMati={n >= MAKS_N} />
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Cara menguraikan">
          {URUT_CARA.map((c) => (
            <Pilihan key={c} aktif={cara === c} onKlik={() => setCara(c)}>
              {NAMA_CARA[c]}
            </Pilihan>
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {NAMA_N[n]} • {NAMA_CARA[cara]}
        </p>
        <div className="flex flex-wrap items-start justify-center gap-2">
          <GambarPola n={n} cara={cara} judul={banding ? NAMA_CARA[cara] : undefined} />
          {banding ? <GambarPola n={n} cara={lain} judul={NAMA_CARA[lain]} /> : null}
        </div>
        <p className="text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
          {jumlah} segitiga
        </p>
        <p className="text-center text-sm font-black text-[#7C2D12]">{rumusPola(n, cara)}</p>
        <KalimatBesar teks={kalimatPola(n, cara)} warna="bg-[#FFE566]" />
        {banding ? (
          <p role="status" className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
            {NAMA_CARA[lain]}: {banyakSegitiga(n, lain)} segitiga. Selisihnya {Math.abs(banyakSegitiga(n, "tengah") - banyakSegitiga(n, "pojok"))}.
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={banding} onKlik={() => setBanding((x) => !x)}>
            Bandingkan
          </Cek>
          <Cek aktif={tabel} onKlik={() => setTabel((x) => !x)}>
            Tabel pola
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      {tabel ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel pola</p>
          <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel pola segitiga">
            <div role="row" className="grid grid-cols-3 bg-indigo-50 text-center text-xs font-black text-[#1C01A5]">
              <p role="columnheader" className="px-1 py-1.5">Bentuk</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Dari satu pojok</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Dari titik tengah</p>
            </div>
            {tabelPola().map((b) => (
              <div key={b.n} role="row" className={`grid grid-cols-3 border-t-2 border-[#1C01A5]/30 text-center text-sm font-black ${b.n === n ? "bg-[#FFE566]" : "bg-white"}`}>
                <p role="cell" className="px-1 py-1.5 text-[#1C01A5]">{b.nama}</p>
                <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5 text-[#1C01A5]">{b.pojok}</p>
                <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5 text-[#1C01A5]">{b.tengah}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, atur lima sisi dan urai dari satu pojok. Berapa segitiganya? Dua, ganti ke titik tengah. Apa yang berubah? Tiga, atur enam sisi dan nyalakan Bandingkan. Berapa selisihnya? Empat, lihat tabel. Bisakah kamu menebak segitiga pada segi delapan?"
          )
        }
        langkah={[
          "Atur 5 sisi dan urai dari satu pojok. Berapa segitiganya?",
          "Ganti ke titik tengah. Apa yang berubah?",
          "Atur 6 sisi dan nyalakan Bandingkan. Berapa selisihnya?",
          "Lihat tabel. Bisakah kamu menebak segitiga pada segi delapan?",
        ]}
      />
    </div>
  );
}
