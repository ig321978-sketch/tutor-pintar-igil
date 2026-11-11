"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { BendaB7 } from "./dasar-k2b7";
import { sebarTitik, type BendaId } from "./data-k2b7";
import {
  NAMA_JENIS_BANYAK,
  STASIUN_MESIN_BANYAK,
  awalMesinBanyak,
  indeksStasiunBanyak,
  kasusBanyak,
  langkahMesinBanyak,
  opsiHitungBanyak,
  opsiTebakBanyak,
  petunjukMesinBanyak,
  type JenisBanyak,
  type MesinBanyak,
  type PeristiwaMesinBanyak,
} from "./mesin-tebak-banyak-k2b7";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B7 Sub-Bab A): Mesin Tebak Banyak — mesin keadaan.               */
/* Tebak → Kelompokkan → Hitung. Menebak selalu diterima. Yang ditolak mesin      */
/* adalah mengelompokkan atau menghitung sebelum menebak, dan menghitung sebelum    */
/* semua sepuluh diikat. Logika: mesin-tebak-banyak-k2b7.ts.                       */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

/** Satu unit: benda atau titik polos. */
function Unit({ jenis, ukuran }: { jenis: JenisBanyak; ukuran: number }) {
  if (jenis === "titik") {
    return <span className="inline-block shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#38BDF8]" style={{ width: ukuran * 0.62, height: ukuran * 0.62, margin: ukuran * 0.19 }} aria-hidden="true" />;
  }
  return <BendaB7 id={jenis as BendaId} ukuran={ukuran} />;
}

function Sebar({ n, jenis, ukuran }: { n: number; jenis: JenisBanyak; ukuran: number }) {
  const pos = sebarTitik(n, 100, 60);
  return (
    <span className="relative block w-full max-w-[300px] rounded-xl border-4 border-[#1C01A5] bg-white" style={{ aspectRatio: "100 / 60" }} role="img" aria-label={`${n} ${NAMA_JENIS_BANYAK[jenis]} bertebaran`}>
      {pos.map(([x, y], i) => (
        <span key={i} className="absolute" style={{ left: `${x}%`, top: `${(y / 60) * 100}%`, transform: "translate(-50%, -50%)" }}>
          <Unit jenis={jenis} ukuran={ukuran} />
        </span>
      ))}
    </span>
  );
}

export default function SimulasiMesinTebakBanyak({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinBanyak>(() => awalMesinBanyak());
  const d = kasusBanyak(x);
  const aktif = indeksStasiunBanyak(x.keadaan);
  const nama = NAMA_JENIS_BANYAK[d.jenis];

  const kirim = (e: PeristiwaMesinBanyak) => {
    const baru = langkahMesinBanyak(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai ? "Semua kumpulan sudah dihitung. Hebat, kamu penghitung yang teliti!" : `Kumpulan ${x.misi + 1} dari ${x.daftar.length}: ${nama}. ${petunjukMesinBanyak(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Tebak Banyak</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tebak dulu, lalu ikat sepuluh-sepuluh, lalu hitung puluhan dan satuannya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan petunjuknya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_BANYAK} aktif={aktif} nama="Peta mesin tebak banyak" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua kumpulan selesai" : `Kumpulan ${x.misi + 1} dari ${x.daftar.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinBanyak(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua kumpulan dihitung!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              Tebakanmu paling dekat {x.tepat} kali dari {x.daftar.length}. Menebak boleh keliru, karena menghitung yang membuktikan. {x.ditolak} kali mesin menolak langkah yang melompat.
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              {x.keadaan === "tebak" ? (
                <Sebar n={d.n} jenis={d.jenis} ukuran={d.jenis === "titik" ? 22 : 24} />
              ) : x.keadaan === "kelompok" ? (
                <div className="w-full max-w-[300px] space-y-1 rounded-xl border-4 border-[#1C01A5] bg-white p-1.5" role="img" aria-label={`${x.ikat} kelompok sepuluh dan ${x.lepas} ${nama} masih lepas`}>
                  {Array.from({ length: x.ikat }, (_, r) => (
                    <span key={r} className="igil-muncul flex items-center justify-center rounded-full border-2 border-dashed border-[#1C01A5] bg-[#E0F2FE]">
                      {Array.from({ length: 10 }, (_, c) => (
                        <Unit key={c} jenis={d.jenis} ukuran={18} />
                      ))}
                    </span>
                  ))}
                  {x.lepas > 0 ? (
                    <span className="flex flex-wrap items-center justify-start gap-0 px-1">
                      {Array.from({ length: x.lepas }, (_, c) => (
                        <Unit key={c} jenis={d.jenis} ukuran={18} />
                      ))}
                    </span>
                  ) : null}
                </div>
              ) : (
                <div className="w-full max-w-[300px] space-y-1 rounded-xl border-4 border-[#1C01A5] bg-white p-1.5" role="img" aria-label={`${x.ikat} puluhan dan ${x.lepas} satuan lepas`}>
                  <p className="text-center text-lg font-black text-[#1C01A5]">
                    {x.ikat} puluhan dan {x.lepas} satuan
                  </p>
                  <span className="flex flex-wrap items-center justify-center gap-0.5">
                    {Array.from({ length: x.ikat }, (_, r) => (
                      <span key={r} className="rounded-md border-2 border-[#1C01A5] bg-[#7DD3FC] px-1.5 py-0.5 text-xs font-black text-[#1C01A5]">
                        10
                      </span>
                    ))}
                    {Array.from({ length: x.lepas }, (_, c) => (
                      <span key={c} className="rounded-md border-2 border-[#1C01A5] bg-[#FDE047] px-1.5 py-0.5 text-xs font-black text-[#1C01A5]">
                        1
                      </span>
                    ))}
                  </span>
                </div>
              )}
              <p className="text-center text-sm font-black text-[#1C01A5]">Kumpulan {nama}</p>
            </div>

            {x.keadaan === "tebak" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Tebak • Kira-kira berapa banyak {nama}?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih tebakan">
                  {opsiTebakBanyak(d, x.misi).map((o) => (
                    <button key={o} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "TEBAK", nilai: o })}>
                      Kira-kira {o}
                    </button>
                  ))}
                </div>
                <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "IKAT" })}>
                  🎀 Ikat sekarang
                </button>
              </div>
            ) : null}

            {x.keadaan === "kelompok" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Kelompokkan • Tebakanmu: {x.tebakan}</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "IKAT" })}>
                    🎀 Ikat 10
                  </button>
                  <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "SIAP" })}>
                    ✅ Siap menghitung
                  </button>
                </div>
              </div>
            ) : null}

            {x.keadaan === "hitung" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Hitung • Berapa {nama} seluruhnya?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih banyaknya">
                  {opsiHitungBanyak(d, x.misi).map((o) => (
                    <button key={o} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "JAWAB", nilai: o })}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {petunjukMesinBanyak(x)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Kumpulan berikutnya ➡" : "Selesai 🏁"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan ikat sekarang sebelum menebak. Apa kata mesin? Dua, tebak, lalu ikat sepuluh-sepuluh. Berapa puluhan dan berapa satuan yang tersisa? Tiga, pilih tebakan yang jauh. Apa kata mesin saat selesai? Empat, bandingkan tebakan paling dekat di tiap kumpulan."
          )
        }
        langkah={[
          "Tekan Ikat sekarang sebelum menebak. Apa kata mesin?",
          "Tebak, lalu ikat sepuluh-sepuluh. Berapa puluhan dan berapa satuan yang tersisa?",
          "Pilih tebakan yang jauh dari banyaknya. Apa kata mesin saat selesai?",
          "Perhatikan: tebakan yang mana paling dekat di tiap kumpulan?",
        ]}
      />
    </div>
  );
}
