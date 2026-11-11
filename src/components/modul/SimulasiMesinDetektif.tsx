"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, UNGU, eja } from "./komponen-lab";
import { titikPola } from "./lab-pola-k2b3";
import {
  STASIUN_DETEKTIF,
  awalDetektif,
  bentukAktif,
  indeksStasiun,
  langkahDet,
  petunjukDet,
  pilihanNama,
  pilihanSisi,
  type Detektif,
  type KeadaanDet,
  type PeristiwaDet,
} from "./mesin-detektif-k2b3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B3): Mesin Tiga Pertanyaan — mesin keadaan detektif bentuk.    */
/* Tepi → Ciri → Nama. Mesin menolak lompatan dan memberi petunjuk.           */
/* Logika: mesin-detektif-k2b3.ts.                                            */
/* ------------------------------------------------------------------------ */

const ISI = "#C7D2FE";
const URUT: KeadaanDet[] = ["tepi", "ciri", "nama", "sudah"];

const poin = (t: [number, number][]) => t.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");

function Misterius({ id, putar, cetakan, terbuka }: { id: string; putar: number; cetakan: boolean; terbuka: boolean }) {
  // Nama bentuk disembunyikan sampai stasiun Nama selesai: gambar hanya "siluet" bentuk.
  const tampil = (
    <>
      {id === "segi5" ? <polygon points={poin(titikPola(5, 70, [100, 100]))} fill={ISI} stroke={UNGU} strokeWidth={4} strokeLinejoin="round" /> : null}
      {id === "segi3" ? <polygon points={poin(titikPola(3, 76, [100, 108]))} fill={ISI} stroke={UNGU} strokeWidth={4} strokeLinejoin="round" /> : null}
      {id === "lingkaran" ? <circle cx={100} cy={100} r={66} fill={ISI} stroke={UNGU} strokeWidth={4} /> : null}
      {id === "lonjong" ? <ellipse cx={100} cy={100} rx={72} ry={44} fill={ISI} stroke={UNGU} strokeWidth={4} transform={`rotate(${putar} 100 100)`} /> : null}
    </>
  );
  return (
    <svg viewBox="0 0 200 200" className="mx-auto block w-full max-w-[220px] rounded-2xl bg-indigo-50/60" role="img" aria-label={terbuka ? "Bentuk misterius sudah dikenali" : "Bentuk misterius"}>
      {cetakan && id === "lingkaran" ? <circle cx={100} cy={100} r={66} fill="#FEE2E2" stroke="#EF4444" strokeWidth={3} strokeDasharray="6 4" /> : null}
      {cetakan && id === "lonjong" ? <ellipse cx={100} cy={100} rx={72} ry={44} fill="#FEE2E2" stroke="#EF4444" strokeWidth={3} strokeDasharray="6 4" /> : null}
      {tampil}
    </svg>
  );
}

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-4 py-2 text-base font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiMesinDetektif({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<Detektif>(() => awalDetektif());
  const [putar, setPutar] = useState(0);
  const d = bentukAktif(x);
  const aktif = indeksStasiun(x.keadaan);

  const kirim = (e: PeristiwaDet) => {
    const baru = langkahDet(x, e);
    setX(baru);
    if (e.t === "LANJUT" || e.t === "ULANG") setPutar(0);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai
    ? "Semua bentuk misterius sudah dikenali. Hebat, kamu detektif bentuk!"
    : `Bentuk misterius ${x.misi + 1} dari ${x.daftar.length}. ${petunjukDet(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";
  const diUjiPutar = x.keadaan === "ciri" && x.jalur === "lengkung";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Tiga Pertanyaan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Jawab tiga pertanyaan secara berurutan untuk mengenali bentuk misterius.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan misi ini" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun
          stasiun={STASIUN_DETEKTIF}
          aktif={aktif}
          nama="Peta mesin detektif"
          onPilih={(i) => kirim({ t: "LOMPAT", ke: i })}
        />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {x.selesai ? "Semua bentuk selesai" : `Bentuk ${x.misi + 1} dari ${x.daftar.length}`}
        </p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukDet(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua bentuk dikenali!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Urutan pertanyaanmu sudah rapi.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <Misterius id={d.id} putar={putar} cetakan={diUjiPutar} terbuka={x.keadaan === "sudah"} />

            {x.keadaan === "tepi" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Tepi</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Jenis tepi">
                  <button type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "TEPI", nilai: "lurus" })}>
                    Garis lurus
                  </button>
                  <button type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "TEPI", nilai: "lengkung" })}>
                    Garis lengkung
                  </button>
                </div>
              </div>
            ) : null}

            {x.keadaan === "ciri" && x.jalur === "lurus" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Ciri • Berapa sisi lurusnya?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih banyak sisi">
                  {pilihanSisi(d, x.misi).map((s) => (
                    <button key={s} type="button" className={`${TOMBOL_JAWAB} w-16`} onClick={() => kirim({ t: "SISI", nilai: s })}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {diUjiPutar ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Ciri • Putar di atas cetakannya</p>
                <button type="button" className={TOMBOL_BIASA} onClick={() => setPutar((p) => (p + 30) % 360)} aria-label="Putar bentuk 30 derajat">
                  Putar ⟳ ({putar}°)
                </button>
                <p className="text-sm font-black text-[#1C01A5]">Apakah bentuk ini selalu pas dengan cetakannya?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Selalu pas atau tidak">
                  <button type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "PUTAR", nilai: "selalu" })}>
                    Selalu pas
                  </button>
                  <button type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "PUTAR", nilai: "tidak" })}>
                    Tidak selalu pas
                  </button>
                </div>
              </div>
            ) : null}

            {x.keadaan === "nama" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Nama • Siapa namanya?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih nama bentuk">
                  {pilihanNama(d, x.misi).map((n) => (
                    <button key={n} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "NAMA", nilai: n })}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-xl font-black text-[#14532D]">✅ {d.nama}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Bentuk berikutnya ➡" : "Selesai 🏁"}
                </button>
              </div>
            ) : null}

            <p className="text-center text-xs font-bold text-[#1C01A5]/70">Stasiun sekarang: {STASIUN_DETEKTIF[Math.min(URUT.indexOf(x.keadaan), 3)].nama}</p>
          </>
        )}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, coba langsung menyebut nama bentuk sebelum menjawab tepi. Apa kata mesin? Dua, pada bentuk lengkung, putar dulu di atas cetakannya. Tiga, hitung sisi segi lima dengan menandai satu sisi sebagai awal."
          )
        }
        langkah={[
          "Coba ketuk stasiun Nama sebelum menjawab Tepi. Apa kata mesin?",
          "Pada bentuk lengkung, putar dulu di atas cetakannya. Apa yang kamu lihat?",
          "Hitung sisi segi lima: tandai satu sisi sebagai awal, hitung berputar.",
        ]}
      />
    </div>
  );
}
