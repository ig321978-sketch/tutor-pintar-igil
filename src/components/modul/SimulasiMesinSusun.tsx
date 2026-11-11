"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { Pengatur, PetaStasiun, RiwayatMesin, StatusMesin, eja } from "./komponen-lab";
import { TabelMenurun } from "./data-8-dasar";
import { BarisLambang, LambangSvg, TOMBOL_JAWAB } from "./diagram-lab-k2b8";
import {
  LAMBANG,
  MAKS_GAMBAR,
  SET,
  STASIUN_MESIN_SUSUN,
  awalMesinSusun,
  indeksStasiunSusun,
  kapital,
  kasusSusun,
  ketBenarSusun,
  langkahMesinSusun,
  opsiBacaSusun,
  opsiJudulSusun,
  opsiKetSusun,
  petunjukMesinSusun,
  type MesinSusun,
  type PeristiwaMesinSusun,
} from "./lab-data-k2b8";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B8 Sub-Bab B): Mesin Susun Diagram — mesin keadaan.              */
/* Judul → Keterangan → Gambar → Baca. Mesin menolak menggambar sebelum judul     */
/* dan keterangan, menolak judul atau keterangan yang tidak cocok, dan menolak     */
/* Periksa bila gambar belum sama dengan tabel (menyebut baris pertama yang beda).  */
/* Logika: lab-data-k2b8.ts.                                                        */
/* ------------------------------------------------------------------------ */

export default function SimulasiMesinSusun({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<MesinSusun>(() => awalMesinSusun());
  const d = kasusSusun(x);
  const ds = SET[d.set];
  const lam = LAMBANG[d.lambang];
  const aktif = indeksStasiunSusun(x.keadaan);
  const lewatJudul = x.keadaan !== "judul";
  const lewatKet = x.keadaan !== "judul" && x.keadaan !== "ket";

  const kirim = (e: PeristiwaMesinSusun) => {
    const baru = langkahMesinSusun(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai ? "Semua diagram sudah tersusun. Hebat, kamu penyusun diagram yang teliti!" : `Diagram ${x.misi + 1} dari ${x.daftar.length}: ${ds.judul}. ${petunjukMesinSusun(x)}`;
  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";
  const warnaBaris = (i: number) => ds.kategori[i].warna;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Susun Diagram</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Susun diagram gambar dari tabel data: judul, keterangan, gambar, lalu baca.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan petunjuknya" onClick={() => speakGuru(eja(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun stasiun={STASIUN_MESIN_SUSUN} aktif={aktif} nama="Peta mesin susun diagram" onPilih={(i) => kirim({ t: "LOMPAT", ke: i })} />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{x.selesai ? "Semua diagram selesai" : `Diagram ${x.misi + 1} dari ${x.daftar.length}`}</p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukMesinSusun(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua diagram tersusun!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              {x.tepat} dari {x.daftar.length} diagram disusun tanpa satu pun penolakan. {x.ditolak} kali mesin menolak langkah yang keliru atau melompat.
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : (
          <>
            <TabelMenurun judul={`Tabel data: ${ds.judul}`} kepala={["Jenis", "Banyak"]} baris={ds.kategori.map((k, i) => [kapital(k.nama), d.n[i]] as [string, number])} kecil />

            {lewatJudul ? (
              <div className="igil-muncul rounded-2xl border-2 border-[#1C01A5]/30 bg-white p-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/60">Judul</p>
                <p className="text-base font-black text-[#1C01A5]">{ds.judul}</p>
                {lewatKet ? <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-black text-[#1C01A5]"><LambangSvg jenis={d.lambang} kelas="h-5 w-5" /> {ketBenarSusun(d)}</p> : null}
              </div>
            ) : null}

            {x.keadaan === "judul" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Judul • Pilih judul yang cocok dengan tabel</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih judul">
                  {opsiJudulSusun(x.daftar, x.misi).map((o) => (
                    <button key={o} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "JUDUL", nilai: o })}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "ket" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Keterangan • Satu {lam.nama} mewakili berapa?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih keterangan">
                  {opsiKetSusun(d, x.misi).map((o) => (
                    <button key={o} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "KET", nilai: o })}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "judul" || x.keadaan === "ket" ? (
              <div className="text-center">
                <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TAMBAH", i: 0 })}>
                  🖍️ Langsung menggambar
                </button>
              </div>
            ) : null}

            {x.keadaan === "isi" || x.keadaan === "baca" ? (
              <div className="space-y-2">
                {x.keadaan === "isi" ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ds.kategori.map((k, i) => (
                      <Pengatur
                        key={k.id}
                        nama={kapital(k.nama)}
                        nilai={x.n[i]}
                        onKurang={() => kirim({ t: "KURANG", i })}
                        onTambah={() => kirim({ t: "TAMBAH", i })}
                        kurangMati={x.n[i] <= 0}
                        tambahMati={x.n[i] >= MAKS_GAMBAR}
                        kurangLabel={`Kurangi gambar ${k.nama}`}
                        tambahLabel={`Tambah gambar ${k.nama}`}
                        warna="#F5F3FF"
                      />
                    ))}
                  </div>
                ) : null}
                <div className="space-y-1.5 rounded-2xl bg-indigo-50/60 p-2" aria-label={`Diagram ${ds.judul}`}>
                  {ds.kategori.map((k, i) => (
                    <div key={k.id} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/30 bg-white px-2 py-1.5">
                      <span className="w-20 shrink-0 text-sm font-black text-[#1C01A5]">{kapital(k.nama)}</span>
                      <div className="min-w-0 flex-1">{x.n[i] > 0 ? <BarisLambang n={x.n[i]} jenis={d.lambang} warna={warnaBaris(i)} kelas="h-5 w-5" /> : <span className="text-xs font-bold text-[#1C01A5]/40">belum ada gambar</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "isi" ? (
              <div className="text-center">
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "PERIKSA" })}>
                  ✅ Periksa diagram
                </button>
              </div>
            ) : null}

            {x.keadaan === "baca" ? (
              <div className="space-y-2 text-center">
                <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Baca • Baris mana yang paling panjang?</p>
                <div className="flex flex-col items-stretch gap-2" role="group" aria-label="Pilih yang paling banyak">
                  {opsiBacaSusun(d, x.misi).map((i) => (
                    <button key={i} type="button" className={TOMBOL_JAWAB} onClick={() => kirim({ t: "JAWAB", i })}>
                      {kapital(ds.kategori[i].nama)}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {x.keadaan === "sudah" ? (
              <div className="space-y-2 text-center">
                <p className="igil-muncul text-base font-black text-[#14532D]">✅ {petunjukMesinSusun(x)}</p>
                <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
                  {x.misi + 1 < x.daftar.length ? "Diagram berikutnya ➡" : "Selesai 🏁"}
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
            "Coba ini. Satu, tekan langsung menggambar sebelum memilih judul. Apa kata mesin? Dua, pilih judul yang milik data lain. Apa kata mesin? Tiga, pilih keterangan satu gambar mewakili dua. Apa kata mesin? Empat, gambar dengan sengaja kurang satu, lalu tekan periksa."
          )
        }
        langkah={[
          "Tekan Langsung menggambar sebelum memilih judul. Apa kata mesin?",
          "Pilih judul yang bukan milik tabel ini. Apa kata mesin?",
          "Pilih keterangan yang salah, misalnya satu gambar mewakili dua. Apa kata mesin?",
          "Gambar dengan sengaja kurang satu pada satu baris, lalu tekan Periksa diagram.",
        ]}
      />
    </div>
  );
}
