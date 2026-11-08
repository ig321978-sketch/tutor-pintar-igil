"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Anak } from "./CeritaBandingB";
import { BendaSvg, TabelMenurun, Turus } from "./data-8-dasar";
import { CobaIni, DiagramSim, KARTU, RAMBUT, TOMBOL_BIASA, TOMBOL_UTAMA, WARNA_KOLOM } from "./simulasi-bersama";
import {
  URUT_ADEGAN,
  awalSkenario,
  ceritaAdegan,
  langkahSkenario,
  pertanyaanBaca,
  pilihanAdegan,
  totalSkenario,
  turusSkenario,
  varianKe,
  type IdAdegan,
  type PeristiwaSkenario,
  type Skenario,
} from "./skenario-pesta-bab8";

/* ------------------------------------------------------------------------ */
/* Simulasi 4 (Bab 8): Skenario kontekstual "Sekretaris Kelas".               */
/* Anak membantu Bu Guru memutuskan dengan data. Pilihan punya akibat dalam   */
/* cerita. Logika ada di skenario-pesta-bab8.ts. Tanpa jaringan.              */
/* ------------------------------------------------------------------------ */

const NAMA_ADEGAN: Record<IdAdegan, string> = {
  mulai: "Mulai",
  cara: "Cara",
  kumpul: "Kumpul",
  sajikan: "Sajikan",
  baca: "Baca",
  putuskan: "Putuskan",
  akhir: "Akhir",
};

export default function SimulasiSkenarioPesta({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [s, setS] = useState<Skenario>(() => awalSkenario(0));
  const v = varianKe(s.varian);
  const kat = v.kategori;
  const total = totalSkenario(v);
  const turus = turusSkenario(s);
  const posisi = URUT_ADEGAN.indexOf(s.adegan);
  const pilihan = pilihanAdegan(s);
  const kumpulLengkap = s.dicatat.every(Boolean);

  const kirim = (p: PeristiwaSkenario) => {
    const baru = langkahSkenario(s, p);
    setS(baru);
    if (baru.adegan === "akhir" && s.adegan !== "akhir") onTuntas();
  };

  /** Data yang dibaca Bu Guru, sesuai cara menyajikan yang dipilih anak. */
  const sajian = (
    <div className="space-y-2">
      {s.saji === "tabel" ? (
        <TabelMenurun judul={`Tabel ${v.judul}`} kepala={["Nama", "Banyak anak"]} baris={kat.map((c, k): [string, number] => [c.nama, total[k]])} kecil />
      ) : null}
      {s.saji === "diagram" ? (
        <div className="overflow-x-auto px-1.5 pb-1.5 pt-1.5">
          <div className="mx-auto w-max">
            <DiagramSim arah="tegak" kat={kat} jumlah={total} lambang="benda" banding={[]} sorotMax={[]} sorotMin={[]} />
          </div>
        </div>
      ) : null}
      {s.saji === "daftar" ? (
        <div className="space-y-1" role="group" aria-label="Daftar kalimat">
          {kat.map((c, k) => (
            <p key={c.nama} className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-3 py-1 text-base font-black text-[#1C01A5]">
              <BendaSvg jenis={c.jenis} kelas="h-6 w-6" />
              Ada {total[k]} anak suka {c.nama.toLowerCase()}.
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );

  const pq = s.adegan === "baca" ? pertanyaanBaca(s) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Skenario: Sekretaris Kelas</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">{v.judul}. Bantu Bu Guru memutuskan dengan data.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan adegan ini" onClick={() => speakGuru(ceritaAdegan(s))} />
      </div>

      <ol className="flex items-start justify-between gap-0.5" aria-label={`Adegan ${posisi + 1} dari ${URUT_ADEGAN.length}`}>
        {URUT_ADEGAN.map((a, i) => (
          <li key={a} aria-current={i === posisi ? "step" : undefined} className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-black ${
                i === posisi
                  ? "border-[#F0AB00] bg-[#1C01A5] text-[#FFE566]"
                  : i < posisi
                    ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
                    : "border-[#1C01A5]/30 bg-white text-[#1C01A5]/50"
              }`}
            >
              {i < posisi ? "✔" : i + 1}
            </span>
            <span className={`text-[9px] font-black uppercase leading-tight ${i === posisi ? "text-[#1C01A5]" : "text-[#1C01A5]/50"}`}>{NAMA_ADEGAN[a]}</span>
          </li>
        ))}
      </ol>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex items-start gap-2">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] text-2xl" aria-hidden="true">
            👩‍🏫
          </span>
          <p className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border-4 border-[#1C01A5] bg-[#F5F3FF] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
            {s.adegan === "baca" && pq ? `Bu Guru membaca datamu dan bertanya: ${pq.teks}` : ceritaAdegan(s)}
          </p>
        </div>

        {s.umpan ? (
          <p
            role="status"
            className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${
              s.umpanBaik ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"
            }`}
          >
            {s.umpanBaik ? "👍 " : "🤔 "}
            {s.umpan}
          </p>
        ) : null}

        {s.adegan === "mulai" ? (
          <div className="flex justify-center">
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
              Siap, Bu Guru! ➡
            </button>
          </div>
        ) : null}

        {s.adegan === "cara" || s.adegan === "sajikan" || s.adegan === "putuskan" ? (
          <div className="space-y-2" role="group" aria-label="Pilihan">
            {pilihan.map((p, i) => (
              <button
                key={p.teks}
                type="button"
                aria-label={`Pilihan ${i + 1}: ${p.teks}`}
                onClick={() => kirim({ t: "PILIH", i })}
                className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-left text-base font-black leading-snug text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm">{i + 1}</span>
                <span>{p.teks}</span>
              </button>
            ))}
          </div>
        ) : null}

        {s.adegan === "kumpul" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Ditanya {s.dicatat.filter(Boolean).length} dari {v.teman.length} teman • “{v.pertanyaanSurvei}”
            </p>
            <div className="flex flex-wrap items-start justify-center gap-1.5" role="group" aria-label="Teman-teman sekelas">
              {v.teman.map((j, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Teman ke-${i + 1}${s.dicatat[i] ? `, suka ${kat[j].nama}` : ", belum ditanya"}`}
                  onClick={() => kirim({ t: "CATAT", i })}
                  className="flex w-12 flex-col items-center rounded-xl px-0.5 py-0.5"
                  style={{ backgroundColor: s.dicatat[i] ? `${WARNA_KOLOM[j % WARNA_KOLOM.length]}88` : "#FFF7CC" }}
                >
                  <svg viewBox="-24 -28 48 50" className="block h-8 w-8" aria-hidden="true">
                    <Anak x={0} y={0} rambut={RAMBUT[i % RAMBUT.length]} pita={i % 3 === 1} />
                  </svg>
                  {s.dicatat[i] ? <BendaSvg jenis={kat[j].jenis} kelas="h-5 w-5 igil-muncul" /> : <span className="h-5 text-sm font-black text-[#1C01A5]">?</span>}
                </button>
              ))}
            </div>
            <div className="space-y-1" role="group" aria-label="Catatan turus">
              {kat.map((c, k) => (
                <div key={c.nama} className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-2 py-1">
                  <BendaSvg jenis={c.jenis} kelas="h-6 w-6" />
                  <span className="w-24 shrink-0 text-xs font-black text-[#1C01A5]">{c.nama}</span>
                  <span className="min-w-0 flex-1">{turus[k] > 0 ? <Turus n={turus[k]} /> : <span className="text-xs font-black text-[#1C01A5]/40">…</span>}</span>
                  <span className="w-7 text-right text-lg font-black text-[#1C01A5]">{turus[k]}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" aria-disabled={!kumpulLengkap} className={`${TOMBOL_UTAMA} ${kumpulLengkap ? "" : "opacity-60"}`} onClick={() => kirim({ t: "LANJUT" })}>
                ➡ Serahkan catatan ke Bu Guru
              </button>
            </div>
          </div>
        ) : null}

        {s.adegan === "baca" && pq ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pertanyaan {s.bacaKe + 1} dari 3</p>
            {sajian}
            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3" role="group" aria-label="Pilihan jawaban">
              {pq.opsi.map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-label={`Jawab ${o}`}
                  onClick={() => kirim({ t: "JAWAB", nilai: o })}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-2 text-lg font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {s.adegan === "putuskan" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Catatan datamu</p>
            <TabelMenurun kepala={["Nama", "Banyak anak"]} baris={kat.map((c, k): [string, number] => [c.nama, total[k]])} kecil />
          </div>
        ) : null}

        {s.adegan === "akhir" ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Pesta berhasil!</p>
            <TabelMenurun judul={`Tabel ${v.judul}`} kepala={["Nama", "Banyak anak"]} baris={kat.map((c, k): [string, number] => [c.nama, total[k]])} kecil />
            <p className="text-sm font-black text-[#1C01A5]">Kamu mencoba lagi {s.percobaanUlang} kali sebelum menemukan cara yang tepat. Itu bagus!</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi dengan data baru
            </button>
          </div>
        ) : null}
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, pilih cara yang salah dulu. Apa kata Bu Guru? Dua, sajikan dengan tabel, lalu main lagi dan sajikan dengan diagram. Mana yang lebih mudah dibaca? Tiga, coba membeli sama banyak. Apa akibatnya bagi teman-teman?"
          )
        }
        langkah={[
          "Pilih cara yang salah dulu. Apa kata Bu Guru?",
          "Sajikan dengan tabel, lalu main lagi dan sajikan dengan diagram. Mana yang lebih mudah dibaca?",
          "Coba membeli sama banyak. Apa akibatnya bagi teman-teman?",
        ]}
      />
    </div>
  );
}
