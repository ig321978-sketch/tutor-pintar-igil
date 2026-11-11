"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { HIJAU, KalimatBesar, Pengatur, ejaHitung } from "./komponen-lab";
import {
  AWAL_CERITA,
  MAKS_CERITA,
  NAMA_JENIS,
  URUT_JENIS,
  batangCerita,
  batasY,
  batasZ,
  ceritaTeks,
  diketahui,
  ditanya,
  hasilCerita,
  kesimpulan,
  labelCerita,
  operasiCerita,
  rapikanCerita,
  solusi,
  ucapanCerita,
  type Cerita,
  type JenisCerita,
  type KelasBagian,
} from "./lab-cerita-k2b2";
import type { KeadaanCerita } from "./misi-k2bab2";

/* ------------------------------------------------------------------------ */
/* Laboratorium Soal Cerita (K2B2 Sub-Bab C) — PhET. Satu cerita menggerakkan */
/* teks cerita, model batang, dan empat langkah (Diketahui, Ditanya, Solusi,  */
/* Kesimpulan). Logika murni di lab-cerita-k2b2.ts. Melapor lewat onKeadaan.  */
/* ------------------------------------------------------------------------ */

const GAYA_BAGIAN: Record<KelasBagian, string> = {
  ada: "border-[#EF4444] bg-[#FEE2E2] text-[#7F1D1D]",
  baru: "border-[#3B82F6] bg-[#DBEAFE] text-[#1E3A8A]",
  cari: "border-[#16A34A] bg-[#BBF7D0] text-[#14532D]",
  kurang: "border-dashed border-[#9CA3AF] bg-white text-[#4B5563]",
  tiga: "border-[#F0AB00] bg-[#FFF3B0] text-[#78350F]",
};

const KET_BAGIAN: Record<KelasBagian, string> = {
  ada: "yang ada",
  baru: "yang datang lagi",
  cari: "yang dicari",
  kurang: "yang kurang atau diberikan",
  tiga: "bilangan ketiga",
};

/** Cerita dengan kata kunci ditebalkan. */
function TeksCerita({ teks, kunci }: { teks: string; kunci: string }) {
  const i = teks.indexOf(kunci);
  if (i < 0) return <>{teks}</>;
  return (
    <>
      {teks.slice(0, i)}
      <mark className="rounded bg-[#FFE566] px-1 font-black text-[#1C01A5]">{kunci}</mark>
      {teks.slice(i + kunci.length)}
    </>
  );
}

export default function SimulasiLabCerita({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanCerita) => void }) {
  const [c, setC] = useState<Cerita>(AWAL_CERITA);
  const [batang, setBatang] = useState(true);
  const [langkah, setLangkah] = useState(true);

  const h = hasilCerita(c);
  const lab = labelCerita(c.jenis);
  const cerita = ceritaTeks(c);
  const op = operasiCerita(c);
  const bars = batangCerita(c);
  const tiga = c.jenis === "tiga";

  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  useEffect(() => {
    lapor.current?.({ alat: "cerita", jenis: c.jenis, x: c.x, y: c.y, z: c.z, batang, langkah });
  }, [c.jenis, c.x, c.y, c.z, batang, langkah]);

  // Bilangan dipertahankan saat jenis berganti (dirapikan ke batas jenis baru), supaya anak bisa membandingkan jenis dengan bilangan yang sama.
  const gantiJenis = (j: JenisCerita) => setC(rapikanCerita({ ...c, jenis: j }));
  const ubah = (bagian: Partial<Cerita>) => setC(rapikanCerita({ ...c, ...bagian }));
  const resetSemua = () => {
    setC(AWAL_CERITA);
    setBatang(true);
    setLangkah(true);
  };

  const dipakai = new Set<KelasBagian>(bars.flatMap((b) => b.bagian.map((x) => x.kelas)));

  const coba = [
    "Pilih Lebihnya, lalu ganti ke Kurangnya dengan bilangan yang sama. Apa yang berubah di batang dan di tanda hitungnya?",
    "Pilih Selisih. Bagian batang mana yang tidak berpasangan, dan berapa nilainya?",
    "Pilih Bilangan awal. Mengapa operasinya dibalik menjadi tambah?",
    "Pilih Tiga bilangan. Bagaimana kalau dua bilangan pertama berjumlah 10?",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Soal Cerita</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pilih jenis cerita dan ubah bilangannya. Lihat cerita, batang, dan langkahnya berubah bersama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan cerita ini" onClick={() => speakGuru(ejaHitung(ucapanCerita(c)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih jenis cerita">
          {URUT_JENIS.map((j) => (
            <Pilihan key={j} aktif={c.jenis === j} onKlik={() => gantiJenis(j)}>
              {NAMA_JENIS[j]}
            </Pilihan>
          ))}
        </div>
        <Pengatur
          nama={lab.x}
          nilai={c.x}
          onKurang={() => ubah({ x: c.x - 1 })}
          onTambah={() => ubah({ x: c.x + 1 })}
          kurangMati={c.x <= 0}
          tambahMati={c.x >= MAKS_CERITA}
        />
        <Pengatur
          nama={lab.y}
          nilai={c.y}
          warna="#DBEAFE"
          onKurang={() => ubah({ y: c.y - 1 })}
          onTambah={() => ubah({ y: c.y + 1 })}
          kurangMati={c.y <= 0}
          tambahMati={c.y >= batasY(c)}
        />
        {tiga ? (
          <Pengatur
            nama={lab.z}
            nilai={c.z}
            warna="#FFF3B0"
            onKurang={() => ubah({ z: c.z - 1 })}
            onTambah={() => ubah({ z: c.z + 1 })}
            kurangMati={c.z <= 0}
            tambahMati={c.z >= batasZ(c)}
          />
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          <Cek aktif={batang} onKlik={() => setBatang((x) => !x)}>
            Batang
          </Cek>
          <Cek aktif={langkah} onKlik={() => setLangkah((x) => !x)}>
            Langkah
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Ceritanya</p>
        <p className="text-base font-black leading-snug text-[#1C01A5]">
          <TeksCerita teks={cerita.teks} kunci={cerita.kunci} />
        </p>
        <p role="status" className="rounded-xl bg-[#F5F3FF] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
          Operasi: {op.op === "tambah" ? "tambah (+)" : "kurang (−)"} · {op.alasan}
        </p>
      </div>

      {batang ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Model batang (skala 0 sampai {MAKS_CERITA})</p>
          <div className="space-y-1.5" role="group" aria-label="Model batang">
            {bars.map((b) => (
              <div key={b.nama} className="flex items-center gap-2">
                <span className="w-14 shrink-0 text-xs font-black text-[#1C01A5]">{b.nama}</span>
                <div className="flex h-9 flex-1 items-center">
                  <div className="flex h-full" style={{ width: `${(b.bagian.reduce((s, x) => s + x.nilai, 0) / MAKS_CERITA) * 100}%` }}>
                    {b.bagian.map((x, i) => (
                      <span
                        key={`${x.kelas}-${i}`}
                        className={`flex h-full items-center justify-center border-2 text-sm font-black ${GAYA_BAGIAN[x.kelas]}`}
                        style={{ width: `${(x.nilai / b.bagian.reduce((s, y) => s + y.nilai, 0)) * 100}%` }}
                        aria-label={`${x.nilai}, ${KET_BAGIAN[x.kelas]}`}
                      >
                        {x.nilai}
                      </span>
                    ))}
                  </div>
                  {b.total !== undefined && b.bagian.length > 0 ? (
                    <span className="ml-1.5 shrink-0 text-sm font-black" style={{ color: HIJAU }}>
                      = {b.total}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <ul className="flex flex-wrap justify-center gap-1.5">
            {[...dipakai].map((k) => (
              <li key={k} className={`rounded-full border-2 px-2 py-0.5 text-xs font-black ${GAYA_BAGIAN[k]}`}>
                {KET_BAGIAN[k]}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {langkah ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Empat langkah</p>
          <dl className="space-y-1.5 text-sm font-bold text-[#1C01A5]">
            <div className="rounded-xl bg-[#F5F3FF] px-3 py-1.5">
              <dt className="text-xs font-black uppercase text-[#1C01A5]/70">1. Diketahui</dt>
              <dd>
                {diketahui(c).map((s) => (
                  <span key={s} className="block">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div className="rounded-xl bg-[#F5F3FF] px-3 py-1.5">
              <dt className="text-xs font-black uppercase text-[#1C01A5]/70">2. Ditanya</dt>
              <dd>{ditanya(c)}</dd>
            </div>
            <div className="rounded-xl bg-[#F5F3FF] px-3 py-1.5">
              <dt className="text-xs font-black uppercase text-[#1C01A5]/70">3. Solusi</dt>
              <dd>
                {solusi(c).map((s) => (
                  <span key={s} className="block text-base font-black text-green-700">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div className="rounded-xl bg-[#E8F7EE] px-3 py-1.5">
              <dt className="text-xs font-black uppercase text-[#14532D]/70">4. Kesimpulan</dt>
              <dd>{kesimpulan(c)}</dd>
            </div>
          </dl>
        </div>
      ) : null}

      <KalimatBesar teks={`Jawaban: ${h}`} warna="bg-[#FFE566]" />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, pilih lebihnya, lalu ganti ke kurangnya dengan bilangan yang sama. Apa yang berubah di batang dan di tanda hitungnya? Dua, pilih selisih. Bagian batang mana yang tidak berpasangan, dan berapa nilainya? Tiga, pilih bilangan awal. Mengapa operasinya dibalik menjadi tambah? Empat, pilih tiga bilangan. Bagaimana kalau dua bilangan pertama berjumlah sepuluh?"
          )
        }
        langkah={coba}
      />
    </div>
  );
}
