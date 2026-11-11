"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, UNGU, eja } from "./komponen-lab";
import {
  CONTOH_URAI,
  GARIS_URAI,
  NAMA_BENTUK_URAI,
  POLIGON_URAI,
  URUT_BENTUK,
  geserKeping,
  kalimatUrai,
  pusatBentuk,
  ringkas,
  ucapanUrai,
  uraikan,
  type BentukUrai,
  type Titik,
} from "./lab-urai-k2b3";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (K2B3): Bengkel Urai dan Susun — lab virtual 2D.                */
/* Anak memilih garis potong di kanvas, mesin menghitung dan menamai keping.  */
/* Renggangkan lalu rapatkan: bentuk kembali seperti semula.                  */
/* ------------------------------------------------------------------------ */

const WARNA_KEPING: Record<string, string> = {
  Segitiga: "#FDE68A",
  Persegi: "#BFDBFE",
  "Persegi panjang": "#BBF7D0",
  "Segi empat": "#DDD6FE",
  "Segi lima": "#FBCFE8",
  "Segi enam": "#A5F3FC",
};

const poin = (t: Titik[]) => t.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

export default function SimulasiBengkelUrai({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [bentuk, setBentuk] = useState<BentukUrai>("persegi");
  const [terpilih, setTerpilih] = useState<string[]>([]);
  const [renggang, setRenggang] = useState(0);
  const [lihatNomor, setLihatNomor] = useState(true);
  const [lihatTabel, setLihatTabel] = useState(true);

  const garis = GARIS_URAI[bentuk];
  const keping = uraikan(bentuk, terpilih);
  const pusat = pusatBentuk(bentuk);
  const hitung = ringkas(keping);

  const gantiBentuk = (b: BentukUrai) => {
    setBentuk(b);
    setTerpilih([]);
  };
  const ketuk = (id: string) => setTerpilih((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const resetSemua = () => {
    setBentuk("persegi");
    setTerpilih([]);
    setRenggang(0);
    setLihatNomor(true);
    setLihatTabel(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Bengkel Urai dan Susun</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pilih garis potong. Lihat bentuk terurai menjadi keping, lalu rapatkan lagi.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan hasil uraian" onClick={() => speakGuru(eja(ucapanUrai(bentuk, keping)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bentuk">
          {URUT_BENTUK.map((b) => (
            <Pilihan key={b} aktif={bentuk === b} onKlik={() => gantiBentuk(b)}>
              {NAMA_BENTUK_URAI[b]}
            </Pilihan>
          ))}
        </div>

        <svg viewBox="-10 -10 120 120" className="mx-auto block w-full max-w-[300px] rounded-2xl bg-indigo-50/60" role="img" aria-label={`${NAMA_BENTUK_URAI[bentuk]} terurai menjadi ${keping.length} keping`}>
          {keping.map((k, i) => {
            const t = geserKeping(k, pusat, renggang);
            const tengah: Titik = [t.reduce((s, p) => s + p[0], 0) / t.length, t.reduce((s, p) => s + p[1], 0) / t.length];
            return (
              <g key={`${bentuk}-${i}-${terpilih.join("")}`}>
                <polygon points={poin(t)} fill={WARNA_KEPING[k.nama] ?? "#E5E7EB"} stroke={UNGU} strokeWidth={1.4} strokeLinejoin="round" />
                {lihatNomor && keping.length > 1 ? (
                  <text x={tengah[0]} y={tengah[1] + 3} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
                    {i + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
          {renggang === 0
            ? garis.map((g) => {
                const aktif = terpilih.includes(g.id);
                return (
                  <g
                    key={g.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={aktif}
                    aria-label={`Garis potong ${g.nama}`}
                    className="cursor-pointer outline-none"
                    onClick={() => ketuk(g.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        ketuk(g.id);
                      }
                    }}
                  >
                    <line x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} stroke="transparent" strokeWidth={8} />
                    <line x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} stroke={aktif ? "#EF4444" : UNGU} strokeWidth={aktif ? 1.8 : 0.9} strokeDasharray={aktif ? "0" : "3 2"} opacity={aktif ? 1 : 0.5} />
                  </g>
                );
              })
            : null}
        </svg>
        <p className="text-center text-xs font-black text-[#1C01A5]/70">
          {renggang === 0 ? "Ketuk garis putus-putus atau pilih tombolnya di bawah." : "Rapatkan keping untuk menggambar garis potong di bentuk."}
        </p>
        <Pengatur
          nama="Renggang keping"
          nilai={renggang}
          warna="#DBEAFE"
          onKurang={() => setRenggang((r) => Math.max(0, r - 1))}
          onTambah={() => setRenggang((r) => Math.min(3, r + 1))}
          kurangMati={renggang <= 0}
          tambahMati={renggang >= 3}
          kurangLabel="Rapatkan keping"
          tambahLabel="Renggangkan keping"
        />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis potong</p>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih garis potong">
          {garis.map((g) => (
            <Pilihan key={g.id} aktif={terpilih.includes(g.id)} onKlik={() => ketuk(g.id)}>
              {g.nama}
            </Pilihan>
          ))}
        </div>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Contoh cepat</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {CONTOH_URAI[bentuk].map((c) => (
            <button key={c.nama} type="button" className={TOMBOL_BIASA} onClick={() => setTerpilih(c.garis)}>
              {c.nama}
            </button>
          ))}
          <button type="button" className={TOMBOL_BIASA} onClick={() => setTerpilih([])}>
            Bentuk utuh
          </button>
        </div>
        <KalimatBesar teks={kalimatUrai(keping)} warna="bg-[#FFE566]" />
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={lihatNomor} onKlik={() => setLihatNomor((x) => !x)}>
            Nomor keping
          </Cek>
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((x) => !x)}>
            Tabel keping
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      {lihatTabel ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tabel keping</p>
          <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel keping">
            <div role="row" className="grid grid-cols-2 bg-indigo-50 text-center text-xs font-black text-[#1C01A5]">
              <p role="columnheader" className="px-1 py-1.5">Bentuk keping</p>
              <p role="columnheader" className="border-l-2 border-[#1C01A5]/30 px-1 py-1.5">Banyaknya</p>
            </div>
            {hitung.map((h) => (
              <div key={h.nama} role="row" className="grid grid-cols-2 border-t-2 border-[#1C01A5]/40 bg-white text-center font-black text-[#1C01A5]">
                <p role="cell" className="flex items-center justify-center gap-1.5 px-1 py-1.5 text-sm">
                  <span aria-hidden="true" className="inline-block h-3 w-3 rounded-sm border border-[#1C01A5]" style={{ backgroundColor: WARNA_KEPING[h.nama] ?? "#E5E7EB" }} />
                  {h.nama}
                </p>
                <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1 text-2xl text-blue-700">
                  {h.jumlah}
                </p>
              </div>
            ))}
            <div role="row" className="grid grid-cols-2 border-t-4 border-[#1C01A5] bg-[#E8F7EE] text-center font-black text-[#14532D]">
              <p role="cell" className="px-1 py-1.5 text-sm">Semua keping</p>
              <p role="cell" className="border-l-2 border-[#1C01A5]/30 px-1 py-1 text-2xl text-green-700">
                {keping.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, pada persegi nyalakan satu diagonal. Apa bentuk kepingnya? Dua, tambah diagonal kedua. Berapa keping sekarang? Tiga, pada segi enam bandingkan dari satu titik dengan lewat tengah. Mana yang kepingnya lebih banyak? Empat, rapatkan keping. Apakah bentuknya kembali seperti semula?"
          )
        }
        langkah={[
          "Pada persegi, nyalakan 1 diagonal. Apa bentuk kepingnya?",
          "Tambah diagonal kedua. Berapa keping sekarang?",
          "Pada segi enam, bandingkan “Dari satu titik” dan “Lewat tengah”. Mana yang kepingnya lebih banyak?",
          "Rapatkan keping. Apakah bentuknya kembali seperti semula?",
        ]}
      />
    </div>
  );
}
