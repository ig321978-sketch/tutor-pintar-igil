"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Anak } from "./CeritaBandingB";
import { BendaSvg, TabelMenurun, Turus } from "./data-8-dasar";
import { CobaIni, DiagramSim, KARTU, RAMBUT, TOMBOL_BIASA, TOMBOL_UTAMA, WARNA_KOLOM, sebut } from "./simulasi-bersama-bab8";
import {
  NAMA_KEADAAN,
  URUT,
  awal,
  ceritaData,
  dataRonde,
  halanganMaju,
  langkah,
  turusPer,
  type Keadaan,
  type Mesin,
  type Peristiwa,
} from "./mesin-data-bab8";

/* ------------------------------------------------------------------------ */
/* Simulasi 3 (Bab 8): Mesin Data Ajaib, metode mesin keadaan (state machine).*/
/* Lima stasiun harus dijalani berurutan. Mesin menolak lompatan dan          */
/* menyebutkan alasannya. Logika ada di mesin-data-bab8.ts. Tanpa jaringan.   */
/* ------------------------------------------------------------------------ */

const STASIUN: { k: Keadaan; ikon: string }[] = [
  { k: "tanya", ikon: "📣" },
  { k: "turus", ikon: "✏️" },
  { k: "tabel", ikon: "📋" },
  { k: "diagram", ikon: "📊" },
  { k: "cerita", ikon: "📖" },
];

/** Angka pada kalimat dieja supaya terbaca jelas oleh suara guru. */
const eja = (teks: string) => teks.replace(/\d+/g, (n) => sebut(Number(n)));

function suaraKeadaan(m: Mesin): string {
  const d = dataRonde(m.ronde);
  switch (m.keadaan) {
    case "tanya":
      return `Stasiun satu, Tanya. Mesin ini hanya jalan kalau urutannya benar. Tekan tombol Tanyakan. Pertanyaannya: ${d.pertanyaan}`;
    case "turus":
      return "Stasiun dua, Turus. Ketuk teman satu per satu. Setiap jawaban menjadi satu goresan turus.";
    case "tabel":
      return "Stasiun tiga, Tabel. Pindahkan banyak turus ke setiap baris tabel.";
    case "diagram":
      return "Stasiun empat, Diagram. Warnai satu gambar untuk satu data, sampai sama dengan tabel.";
    case "cerita":
      return `Stasiun lima, Cerita. ${eja(ceritaData(m).join(" "))}`;
    case "selesai":
      return "Mesin selesai. Hebat! Kamu menjalani semua stasiun dengan urutan yang benar.";
  }
}

export default function SimulasiMesinData({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [m, setM] = useState<Mesin>(() => awal(0));
  const d = dataRonde(m.ronde);
  const kat = d.kategori;
  const turus = turusPer(m);
  const posisi = URUT.indexOf(m.keadaan);
  const halangan = halanganMaju(m);

  const kirim = (p: Peristiwa) => {
    const baru = langkah(m, p);
    setM(baru);
    if (baru.keadaan === "selesai" && m.keadaan !== "selesai") onTuntas();
  };

  const maju = (ke: Keadaan) => kirim({ t: "LOMPAT", ke });

  const status =
    m.pesan !== ""
      ? { gaya: "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]", teks: `⛔ Mesin berhenti: ${m.pesan}` }
      : m.riwayat.length > 0
        ? { gaya: "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]", teks: `✅ Mesin pindah: ${m.riwayat[m.riwayat.length - 1]}` }
        : { gaya: "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]", teks: "🔧 Mesin siap. Mulai dari stasiun Tanya." };

  const tombolMaju = (ke: Keadaan, teks: string) => (
    <button type="button" aria-disabled={halangan !== null} onClick={() => maju(ke)} className={`${TOMBOL_UTAMA} ${halangan !== null ? "opacity-60" : ""}`}>
      {teks}
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Data Ajaib</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Mesin hanya jalan kalau urutannya benar. Coba, dan lihat apa kata mesin.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan stasiun ini" onClick={() => speakGuru(suaraKeadaan(m))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Peta stasiun • {d.judul}</p>
        <ol className="flex items-start justify-between gap-0.5" aria-label="Peta keadaan mesin">
          {STASIUN.map((s, i) => {
            const aktif = m.keadaan === s.k;
            const lewat = i < posisi;
            return (
              <React.Fragment key={s.k}>
                <li className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                  <button
                    type="button"
                    aria-label={`Stasiun ${NAMA_KEADAAN[s.k]}${aktif ? ", sedang di sini" : lewat ? ", sudah dilewati" : ", belum"}`}
                    aria-current={aktif ? "step" : undefined}
                    onClick={() => maju(s.k)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-4 text-xl ${
                      aktif
                        ? "scale-110 border-[#F0AB00] bg-[#FFE566] shadow-[0_3px_0_#F0AB00]"
                        : lewat
                          ? "border-[#7FCB96] bg-[#E8F7EE]"
                          : "border-[#1C01A5]/30 bg-white opacity-70"
                    }`}
                  >
                    <span aria-hidden="true">{lewat ? "✔️" : aktif ? s.ikon : "🔒"}</span>
                  </button>
                  <span className={`text-[10px] font-black leading-tight ${aktif ? "text-[#1C01A5]" : "text-[#1C01A5]/60"}`}>{NAMA_KEADAAN[s.k]}</span>
                </li>
                {i < STASIUN.length - 1 ? (
                  <li aria-hidden="true" className={`mt-3 shrink-0 text-lg font-black ${i < posisi ? "text-[#16A34A]" : "text-[#1C01A5]/30"}`}>
                    ➜
                  </li>
                ) : null}
              </React.Fragment>
            );
          })}
        </ol>
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${status.gaya}`}>
          {status.teks}
        </p>
      </div>

      <div className={`${KARTU} space-y-3`}>
        {m.keadaan === "tanya" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 1 • Tanya</p>
            <p className="text-xl font-black text-[#1C01A5]">“{d.pertanyaan}”</p>
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "TANYA" })}>
              📣 Tanyakan ke teman-teman
            </button>
          </div>
        ) : null}

        {m.keadaan === "turus" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 2 • Turus ({m.dicatat.filter(Boolean).length} dari {d.teman.length} teman)</p>
            <div className="flex flex-wrap items-start justify-center gap-1.5" role="group" aria-label="Teman-teman yang ditanya">
              {d.teman.map((j, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Teman ke-${i + 1}${m.dicatat[i] ? `, suka ${kat[j].nama}` : ", belum ditanya"}`}
                  onClick={() => kirim({ t: "CATAT", i })}
                  className="flex w-12 flex-col items-center rounded-xl px-0.5 py-0.5"
                  style={{ backgroundColor: m.dicatat[i] ? `${WARNA_KOLOM[j % WARNA_KOLOM.length]}88` : "#FFF7CC" }}
                >
                  <svg viewBox="-24 -28 48 50" className="block h-8 w-8" aria-hidden="true">
                    <Anak x={0} y={0} rambut={RAMBUT[i % RAMBUT.length]} pita={i % 3 === 1} />
                  </svg>
                  {m.dicatat[i] ? <BendaSvg jenis={kat[j].jenis} kelas="h-5 w-5 igil-muncul" /> : <span className="h-5 text-sm font-black text-[#1C01A5]">?</span>}
                </button>
              ))}
            </div>
            <div className="space-y-1" role="group" aria-label="Turus">
              {kat.map((c, k) => (
                <div key={c.nama} className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-2 py-1">
                  <BendaSvg jenis={c.jenis} kelas="h-6 w-6" />
                  <span className="w-16 shrink-0 text-xs font-black text-[#1C01A5]">{c.nama}</span>
                  <span className="min-w-0 flex-1">{turus[k] > 0 ? <Turus n={turus[k]} /> : <span className="text-xs font-black text-[#1C01A5]/40">…</span>}</span>
                  <span className="w-7 text-right text-lg font-black text-[#1C01A5]">{turus[k]}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">{tombolMaju("tabel", "➡ Pindah ke stasiun Tabel")}</div>
          </div>
        ) : null}

        {m.keadaan === "tabel" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 3 • Tabel</p>
            <TabelMenurun
              judul={`Tabel ${d.judul}`}
              kepala={["Nama", "Banyak anak"]}
              baris={kat.map((c, k): [string, number | string] => [c.nama, m.tabel[k] ?? "?"])}
              kecil
            />
            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
              {kat.map((c, k) => (
                <button
                  key={c.nama}
                  type="button"
                  aria-label={`Isi baris ${c.nama} dengan ${turus[k]}`}
                  disabled={m.tabel[k] !== null}
                  onClick={() => kirim({ t: "ISI_TABEL", k })}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-1.5 text-sm font-black text-[#1C01A5] disabled:bg-[#E8F7EE] disabled:opacity-70"
                >
                  <BendaSvg jenis={c.jenis} kelas="h-6 w-6" />
                  {m.tabel[k] !== null ? `✔ ${c.nama}` : `Isi ${c.nama} (turus ${turus[k]})`}
                </button>
              ))}
            </div>
            <div className="flex justify-center">{tombolMaju("diagram", "➡ Pindah ke stasiun Diagram")}</div>
          </div>
        ) : null}

        {m.keadaan === "diagram" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 4 • Diagram (1 gambar = 1 anak)</p>
            <div className="overflow-x-auto px-1.5 pb-1.5 pt-1.5">
              <div className="mx-auto w-max">
                <DiagramSim arah="tegak" kat={kat} jumlah={m.diagram} lambang="benda" banding={[]} sorotMax={[]} sorotMin={[]} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
              {kat.map((c, k) => (
                <button
                  key={c.nama}
                  type="button"
                  aria-label={`Warnai satu gambar ${c.nama}`}
                  onClick={() => kirim({ t: "WARNAI", k })}
                  className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-1.5 text-sm font-black text-[#1C01A5]"
                >
                  <BendaSvg jenis={c.jenis} kelas="h-6 w-6" />＋ {c.nama} ({m.diagram[k]}/{m.tabel[k] ?? 0})
                </button>
              ))}
            </div>
            <div className="flex justify-center">{tombolMaju("cerita", "➡ Pindah ke stasiun Cerita")}</div>
          </div>
        ) : null}

        {m.keadaan === "cerita" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun 5 • Cerita</p>
            <div className="space-y-1">
              {ceritaData(m).map((l) => (
                <p key={l} className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-sm font-black text-[#1C01A5]">
                  {l}
                </p>
              ))}
            </div>
            <button
              type="button"
              className={TOMBOL_UTAMA}
              onClick={() => {
                speakGuru(suaraKeadaan(m));
                kirim({ t: "CERITA" });
              }}
            >
              📖 Ceritakan hasilnya
            </button>
          </div>
        ) : null}

        {m.keadaan === "selesai" ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Mesin selesai!</p>
            <div className="space-y-1">
              {ceritaData(m).map((l) => (
                <p key={l} className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-sm font-black text-[#14532D]">
                  {l}
                </p>
              ))}
            </div>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Putar lagi dengan data baru
            </button>
          </div>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-1`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Riwayat mesin • {m.ditolak} kali ditolak
        </p>
        {m.riwayat.length === 0 ? (
          <p className="text-sm font-bold text-[#1C01A5]/50">Belum ada perpindahan.</p>
        ) : (
          <ol className="flex flex-wrap gap-1.5">
            {m.riwayat.map((r, i) => (
              <li key={`${r}-${i}`} className="rounded-full bg-[#F5F3FF] px-2 py-0.5 text-xs font-black text-[#1C01A5]">
                {r}
              </li>
            ))}
          </ol>
        )}
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tekan stasiun Diagram sebelum waktunya. Apa kata mesin? Dua, selesaikan semua stasiun sampai selesai. Tiga, putar lagi dengan data baru. Apakah urutannya tetap sama?"
          )
        }
        langkah={[
          "Tekan stasiun Diagram sebelum waktunya. Apa kata mesin?",
          "Selesaikan semua stasiun sampai Selesai.",
          "Putar lagi dengan data baru. Apakah urutannya tetap sama?",
        ]}
      />
    </div>
  );
}
