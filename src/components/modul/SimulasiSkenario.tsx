"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { adeganSk, awalSk, ceritaSk, langkahSk, opsiHitung, semuaKetuk, type DefSkenario, type PeristiwaSk, type Sk } from "./skenario-umum";

/* ------------------------------------------------------------------------ */
/* Skenario kontekstual umum. Tampilan untuk semua skenario Kelas 1 yang      */
/* ditulis sebagai data (skenario-kelas1.ts). Logika di skenario-umum.ts.     */
/* ------------------------------------------------------------------------ */

const TOMBOL_JAWAB =
  "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-2 text-lg font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5";

export default function SimulasiSkenario({
  def,
  speakGuru,
  onTuntas,
}: {
  def: DefSkenario;
  speakGuru: (t: string) => void;
  onTuntas: () => void;
}) {
  const [s, setS] = useState<Sk>(() => awalSk(def));
  const a = adeganSk(def, s);
  const total = def.adegan.length;

  const kirim = (p: PeristiwaSk) => {
    const baru = langkahSk(def, s, p);
    setS(baru);
    if (def.adegan[baru.i].jenis === "akhir" && a.jenis !== "akhir") onTuntas();
  };

  const dihitung = s.ketuk.filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Skenario: {def.judul}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">{def.latar}</p>
        </div>
        <TombolSuaraGuru label="Dengarkan adegan ini" onClick={() => speakGuru(ceritaSk(def, s))} />
      </div>

      <ol className="flex items-start justify-center gap-1.5" aria-label={`Adegan ${s.i + 1} dari ${total}`}>
        {def.adegan.map((x, i) => (
          <li
            key={x.id}
            aria-current={i === s.i ? "step" : undefined}
            className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-black ${
              i === s.i
                ? "border-[#F0AB00] bg-[#1C01A5] text-[#FFE566]"
                : i < s.i
                  ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
                  : "border-[#1C01A5]/30 bg-white text-[#1C01A5]/50"
            }`}
          >
            {i < s.i ? "✔" : i + 1}
          </li>
        ))}
      </ol>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex items-start gap-2">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FFF7CC] text-2xl" aria-hidden="true">
            {def.tokoh}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-black uppercase tracking-wide text-[#1C01A5]/60">{def.nama}</p>
            <p className="rounded-2xl rounded-tl-sm border-4 border-[#1C01A5] bg-[#F5F3FF] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">{a.cerita}</p>
          </div>
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

        {a.jenis === "narasi" ? (
          <div className="flex justify-center">
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
              {a.tombol ?? "Ayo mulai! ➡"}
            </button>
          </div>
        ) : null}

        {a.jenis === "pilih" ? (
          <div className="space-y-2" role="group" aria-label="Pilihan">
            {a.opsi.map((o, i) => (
              <button
                key={o.teks}
                type="button"
                aria-label={`Pilihan ${i + 1}: ${o.teks}`}
                onClick={() => kirim({ t: "PILIH", i })}
                className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-left text-base font-black leading-snug text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm">{i + 1}</span>
                <span>{o.teks}</span>
              </button>
            ))}
          </div>
        ) : null}

        {a.jenis === "soal" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Pertanyaan {Math.min(s.soalKe + 1, a.soal.length)} dari {a.soal.length}
            </p>
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-2 text-center text-lg font-black text-[#1C01A5]">{a.soal[s.soalKe].teks}</p>
            <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-3" role="group" aria-label="Pilihan jawaban">
              {a.soal[s.soalKe].opsi.map((o) => (
                <button key={o} type="button" aria-label={`Jawab ${o}`} onClick={() => kirim({ t: "JAWAB", nilai: o })} className={TOMBOL_JAWAB}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {a.jenis === "hitung" ? (
          <div className="space-y-3">
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Dihitung {dihitung} dari {a.jumlah}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Benda yang dihitung">
              {s.ketuk.map((sudah, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Benda ke-${i + 1}${sudah ? ", sudah dihitung" : ""}`}
                  onClick={() => kirim({ t: "KETUK", i })}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-xl border-2 ${sudah ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/40 bg-white"}`}
                >
                  <span className={sudah ? "opacity-50" : ""}>
                    <BendaSvg jenis={a.objek} kelas="h-9 w-9" />
                  </span>
                  {sudah ? <span className="igil-muncul absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1C01A5] text-[11px] font-black text-[#FFE566]">{s.ketuk.slice(0, i + 1).filter(Boolean).length}</span> : null}
                </button>
              ))}
            </div>
            {semuaKetuk(s) ? (
              <div className="igil-muncul space-y-2">
                <p className="text-center text-base font-black text-[#1C01A5]">{a.tanya}</p>
                <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilihan jawaban">
                  {opsiHitung(a).map((o) => (
                    <button key={o} type="button" aria-label={`Jawab ${o}`} onClick={() => kirim({ t: "JAWAB", nilai: o })} className={`${TOMBOL_JAWAB} py-3 text-3xl`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {a.jenis === "isi" ? (
          <div className="space-y-3">
            <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-1 rounded-2xl border-4 border-dashed border-[#A8672D] bg-[#FDE9C4] px-2 py-2" role="img" aria-label={`${s.isi} benda di keranjang`}>
              {s.isi === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">keranjang masih kosong</span> : null}
              {Array.from({ length: s.isi }, (_, k) => (
                <span key={k} className="igil-muncul">
                  <BendaSvg jenis={a.objek} kelas="h-9 w-9" />
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button type="button" aria-label="Kurangi satu" disabled={s.isi <= 0} onClick={() => kirim({ t: "UBAH", delta: -1 })} className="h-11 w-11 rounded-full border-4 border-[#1C01A5] bg-white text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-30">
                –
              </button>
              <span className="w-10 text-center text-3xl font-black text-[#1C01A5]" aria-live="polite">
                {s.isi}
              </span>
              <button type="button" aria-label="Tambah satu" disabled={s.isi >= a.maks} onClick={() => kirim({ t: "UBAH", delta: 1 })} className="h-11 w-11 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-30">
                +
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" aria-label="Periksa keranjang" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "PERIKSA" })}>
                ✔ Periksa keranjang
              </button>
            </div>
          </div>
        ) : null}

        {a.jenis === "akhir" ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Hebat!</p>
            <p className="text-sm font-black text-[#1C01A5]">
              {s.ulang === 0 ? "Semua pilihanmu langsung tepat. Luar biasa!" : `Kamu mencoba lagi ${s.ulang} kali sebelum menemukan cara yang tepat. Itu bagus!`}
            </p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi dari awal
            </button>
          </div>
        ) : null}
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru("Coba ini. Satu, pilih tindakan yang kurang tepat dulu. Apa akibatnya dalam cerita? Dua, main lagi dari awal dan ubah pilihanmu. Apakah ceritanya berubah?")}
        langkah={["Pilih tindakan yang kurang tepat dulu. Apa akibatnya dalam cerita?", "Main lagi dari awal dan ubah pilihanmu. Apakah ceritanya berubah?"]}
      />
    </div>
  );
}
