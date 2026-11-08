"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU } from "./simulasi-bersama";
import { Pengatur } from "./komponen-lab";
import {
  GESER_TAK_SEJAJAR,
  MAKS_PANJANG,
  MIN_PANJANG,
  PANJANG_AWAL,
  PITA,
  bandingDua,
  pilihPita,
  terpanjang,
  terpendek,
  ubahPanjang,
  ucapanBanding,
  urutanTampil,
} from "./lab-banding-panjang-bab7";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 7): Laboratorium Bandingkan Panjang, metode PhET.          */
/* Empat pita dalam satuan stik: atur, sejajarkan, urutkan, bandingkan.       */
/* Logika di lab-banding-panjang-bab7.ts. Tanpa jaringan.                     */
/* ------------------------------------------------------------------------ */

const SATUAN_PX = 26;
const GESER_PX = 10;
const X0 = 54;
const BARIS = 40;

export default function SimulasiBandingPanjang({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [panjang, setPanjang] = useState<number[]>(PANJANG_AWAL);
  const [sejajar, setSejajar] = useState(false);
  const [urut, setUrut] = useState(false);
  const [dipilih, setDipilih] = useState<number[]>([]);

  const urutan = urutanTampil(panjang, urut);
  const pendek = terpendek(panjang);
  const panjangnya = terpanjang(panjang);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Bandingkan Panjang</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur panjang pita dalam stik. Sejajarkan, urutkan, lalu bandingkan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan perbandingan ini" onClick={() => speakGuru(ucapanBanding(panjang, urut, sejajar))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <svg viewBox={`0 0 380 ${urutan.length * BARIS + 8}`} className="mx-auto block w-full max-w-[460px] rounded-2xl bg-[#F5F3FF]" role="group" aria-label="Empat pita">
          {sejajar ? <line x1={X0} y1="2" x2={X0} y2={urutan.length * BARIS + 6} stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 3" /> : null}
          {urutan.map((i, baris) => {
            const geser = sejajar ? 0 : GESER_TAK_SEJAJAR[i] * GESER_PX;
            const terpilih = dipilih.includes(i);
            const y = 6 + baris * BARIS;
            return (
              <g
                key={PITA[i].nama}
                role="button"
                tabIndex={0}
                aria-label={`Pita ${PITA[i].nama}, ${panjang[i]} stik${terpilih ? ", dipilih" : ""}`}
                aria-pressed={terpilih}
                className="cursor-pointer"
                onClick={() => setDipilih(pilihPita(dipilih, i))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDipilih(pilihPita(dipilih, i));
                  }
                }}
              >
                <rect x="0" y={y - 2} width="380" height={BARIS - 4} fill="transparent" />
                <text x="4" y={y + 20} fontSize="13" fontWeight="900" fill="#1C01A5">
                  {PITA[i].nama}
                </text>
                {Array.from({ length: panjang[i] }, (_, k) => (
                  <rect key={k} x={X0 + geser + k * SATUAN_PX} y={y} width={SATUAN_PX} height="28" rx="4" fill={PITA[i].warna} stroke={terpilih ? "#1C01A5" : "#FFFFFF"} strokeWidth={terpilih ? 3 : 2} />
                ))}
                <text x={X0 + geser + panjang[i] * SATUAN_PX + 6} y={y + 20} fontSize="14" fontWeight="900" fill="#1C01A5">
                  {panjang[i]}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Cek aktif={sejajar} onKlik={() => setSejajar((x) => !x)}>
            Sejajarkan ujung kiri
          </Cek>
          <Cek aktif={urut} onKlik={() => setUrut((x) => !x)}>
            Urutkan dari terpendek
          </Cek>
        </div>
        {!sejajar ? (
          <p role="status" className="rounded-xl bg-[#FFF7CC] px-3 py-1 text-center text-xs font-black text-[#1C01A5]">
            Ujung kiri pita belum sejajar, jadi mata mudah tertipu. Nyalakan Sejajarkan ujung kiri supaya adil.
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Atur panjang pita (stik)</p>
        <div className="grid grid-cols-1 gap-1.5 min-[480px]:grid-cols-2">
          {PITA.map((p, i) => (
            <Pengatur
              key={p.nama}
              nama={`Pita ${p.nama}`}
              nilai={panjang[i]}
              onKurang={() => setPanjang(ubahPanjang(panjang, i, -1))}
              onTambah={() => setPanjang(ubahPanjang(panjang, i, 1))}
              kurangMati={panjang[i] <= MIN_PANJANG}
              tambahMati={panjang[i] >= MAKS_PANJANG}
              kurangLabel={`Kurangi panjang pita ${p.nama}`}
              tambahLabel={`Tambah panjang pita ${p.nama}`}
            />
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Hasil perbandingan</p>
        <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
          Terpanjang: pita {panjangnya.map((i) => PITA[i].nama).join(" dan ")} ({panjang[panjangnya[0]]} stik). Terpendek: pita {pendek.map((i) => PITA[i].nama).join(" dan ")} ({panjang[pendek[0]]} stik).
        </p>
        <p className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]" aria-live="polite">
          {dipilih.length === 2 ? bandingDua(panjang, dipilih[0], dipilih[1]) : "Ketuk dua pita untuk membandingkan keduanya."}
        </p>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, lihat pita sebelum disejajarkan. Pita mana yang kamu kira paling panjang? Dua, nyalakan sejajarkan ujung kiri. Apakah kamu masih memilih pita yang sama? Tiga, ketuk dua pita. Berapa stik bedanya?"
          )
        }
        langkah={[
          "Lihat pita sebelum disejajarkan. Pita mana yang kamu kira paling panjang?",
          "Nyalakan Sejajarkan ujung kiri. Apakah kamu masih memilih pita yang sama?",
          "Ketuk dua pita. Berapa stik bedanya?",
        ]}
      />
    </div>
  );
}
