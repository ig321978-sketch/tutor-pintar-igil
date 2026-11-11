"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { UnsurSvg } from "./dasar-k2b4";
import {
  NAMA_MESIN_UNSUR,
  STASIUN_MESIN_POLA,
  awalMesinPola,
  barisanAktif,
  indeksStasiunPola,
  jalurBarisan,
  langkahMesinPola,
  opsiBukti,
  opsiCiri,
  petunjukMesinPola,
  ringkasMesin,
  sebutMesin,
  type MesinPola,
  type PeristiwaMesinPola,
} from "./mesin-pola-k2b4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B4 Sub-Bab B): Mesin Tiga Pemeriksaan — mesin keadaan.          */
/* Cek → Ciri → Bukti. Mesin menolak lompatan dan memberi petunjuk, tanpa      */
/* hukuman. Logika: mesin-pola-k2b4.ts.                                        */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "min-h-12 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiMesinPola({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinPola>(() => awalMesinPola());
  const d = barisanAktif(x);
  const aktif = indeksStasiunPola(x.keadaan);
  const jenis = d.jenis;

  const kirim = (e: PeristiwaMesinPola) => {
    const baru = langkahMesinPola(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai ? "Semua barisan sudah diperiksa. Hebat, kamu pemeriksa pola!" : `Barisan ${x.misi + 1} dari ${x.daftar.length}, ${d.nama}. ${petunjukMesinPola(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";

  const ikon = (t: string, kelas = "h-9 w-9") => <UnsurSvg jenis={jenis} token={t} kelas={kelas} label="" />;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Tiga Pemeriksaan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Jawab tiga pertanyaan berurutan untuk memeriksa setiap barisan.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan pertanyaannya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_POLA} aktif={aktif} nama="Peta mesin pemeriksa pola" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua barisan selesai" : `Barisan ${x.misi + 1} dari ${x.daftar.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinPola(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua barisan diperiksa!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Urutan pemeriksaanmu sudah rapi.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-sm font-black text-[#1C01A5]">{d.nama}</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-indigo-50/60 p-2" role="img" aria-label={`Barisan: ${sebutMesin(d.seq)}`}>
              {d.seq.map((t, i) => (
                <React.Fragment key={i}>{ikon(t, "h-10 w-10")}</React.Fragment>
              ))}
              {x.keadaan === "bukti" && x.jalur === "pola" ? <span className="flex h-10 w-10 items-center justify-center rounded-xl border-4 border-dashed border-[#16A34A] text-lg font-black text-[#14532D]">?</span> : null}
            </div>

            {x.keadaan === "cek" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Cek • Pola atau bukan?</p>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pola atau bukan pola">
                  <button type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "CEK", nilai: "pola" })}>
                    ✔ Ini pola
                  </button>
                  <button type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "CEK", nilai: "bukan" })}>
                    ✘ Bukan pola
                  </button>
                </div>
              </div>
            ) : null}

            {x.keadaan === "ciri" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
                  Stasiun Ciri • {x.jalur === "pola" ? "Kelompok terpendek yang berulang?" : "Apa alasannya bukan pola?"}
                </p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih ciri">
                  {opsiCiri(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={`${TOMBOL_JAWAB} flex items-center justify-center gap-1.5`} onClick={() => kirim({ t: "CIRI", nilai: o.kunci })} aria-label={o.label}>
                      {jalurBarisan(d) === "pola" ? o.kunci.split(",").map((t, i) => <React.Fragment key={i}>{ikon(t)}</React.Fragment>) : o.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "bukti" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
                  Stasiun Bukti • {x.jalur === "pola" ? "Unsur apa yang berikutnya?" : "Supaya jadi pola, barisan harus bagaimana?"}
                </p>
                <div className={x.jalur === "pola" ? "flex flex-wrap justify-center gap-2" : "flex flex-col items-stretch gap-2"} role="group" aria-label="Pilih bukti">
                  {opsiBukti(d, x.misi).map((o) => (
                    <button key={o.kunci} type="button" className={`${TOMBOL_JAWAB} flex items-center justify-center gap-1.5`} onClick={() => kirim({ t: "BUKTI", nilai: o.kunci })} aria-label={o.label}>
                      {x.jalur === "pola" ? (
                        <span className="flex flex-col items-center text-[11px]">
                          {ikon(o.kunci)}
                          {NAMA_MESIN_UNSUR[o.kunci] ?? o.kunci}
                        </span>
                      ) : (
                        o.label
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {ringkasMesin(d)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Barisan berikutnya ➡" : "Selesai 🏁"}
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
            "Coba ini. Satu, ketuk stasiun Bukti sebelum menjawab Cek. Apa kata mesin? Dua, pada barisan yang semuanya sama, apa alasan ia bukan pola? Tiga, jawab salah dengan sengaja. Baca petunjuk mesin, lalu coba lagi."
          )
        }
        langkah={[
          "Ketuk stasiun Bukti sebelum menjawab Cek. Apa kata mesin?",
          "Pada Gelang Kuning, apa alasan barisan ini bukan pola?",
          "Jawab salah dengan sengaja. Baca petunjuk mesin, lalu coba lagi.",
        ]}
      />
    </div>
  );
}
