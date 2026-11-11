"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { PetaStasiun, RiwayatMesin, StatusMesin, ejaHitung } from "./komponen-lab";
import {
  MISI_SIMPAN,
  NAMA_SIMPAN,
  STASIUN_SIMPAN,
  URUT_SIMPAN,
  awalSimpan,
  langkahSimpan,
  misiAktif,
  perluSimpan,
  perluUrai,
  petunjukSimpan,
  pilihanHasil,
  type KeadaanSimpan,
  type PeristiwaSimpan,
  type Simpan,
} from "./mesin-simpan-k2b2";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (K2B2): Mesin Simpan dan Urai.                                  */
/* Logika di mesin-simpan-k2b2.ts.                                            */
/* ------------------------------------------------------------------------ */

function TabelSusun({ a, b, op }: { a: number; b: number; op: "tambah" | "kurang" }) {
  const Ap = Math.floor(a / 10);
  const As = a % 10;
  const Bp = Math.floor(b / 10);
  const Bs = b % 10;
  return (
    <div className="mx-auto grid w-full max-w-[220px] grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Tabel susun">
      <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-xs font-black text-[#7F1D1D]">
        Puluhan
      </p>
      <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-xs font-black text-[#1E3A8A]">
        Satuan
      </p>
      <p role="cell" className="border-t-4 border-[#1C01A5] py-1 text-center text-2xl font-black text-blue-700">
        {Ap || ""}
      </p>
      <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-1 text-center text-2xl font-black text-blue-700">
        {As}
      </p>
      <p role="cell" className="border-t-2 border-[#1C01A5]/40 py-1 text-center text-2xl font-black text-blue-700">
        {op === "tambah" ? "+" : "−"}
        {Bp || ""}
      </p>
      <p role="cell" className="border-l-4 border-t-2 border-[#1C01A5]/40 py-1 text-center text-2xl font-black text-blue-700">
        {Bs}
      </p>
    </div>
  );
}

export default function SimulasiMesinSimpan({ speakGuru, onTuntas }: { speakGuru: (t: string) => void; onTuntas: () => void }) {
  const [x, setX] = useState<Simpan>(() => awalSimpan(0));
  const m = misiAktif(x);
  const aktif = URUT_SIMPAN.indexOf(x.keadaan);
  const tanda = m.op === "tambah" ? "+" : "−";

  const kirim = (e: PeristiwaSimpan) => {
    const baru = langkahSimpan(x, e);
    setX(baru);
    if (baru.selesai && !x.selesai) onTuntas();
  };

  const suara = x.selesai
    ? "Semua misi selesai. Hebat! Kamu sudah menyimpan dan mengurai dengan urutan yang benar."
    : `Misi ${x.misi + 1} dari ${MISI_SIMPAN.length}. ${m.a} ${m.op === "tambah" ? "ditambah" : "dikurangi"} ${m.b}. ${petunjukSimpan(x)}`;

  const terakhir = x.riwayat.length > 0 ? `Mesin pindah ${x.riwayat[x.riwayat.length - 1]}` : "";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Mesin Simpan dan Urai</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Mesin hanya jalan kalau urutannya benar. Simpan saat tambah, urai saat kurang.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan misi ini" onClick={() => speakGuru(ejaHitung(suara))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <PetaStasiun
          stasiun={STASIUN_SIMPAN}
          aktif={aktif}
          nama="Peta mesin simpan"
          onPilih={(i) => kirim({ t: "LOMPAT", ke: URUT_SIMPAN[i] as KeadaanSimpan })}
        />
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          {x.selesai ? "Semua misi selesai" : `Misi ${x.misi + 1} dari ${MISI_SIMPAN.length} • ${m.a} ${tanda} ${m.b}`}
        </p>
        <StatusMesin pesan={x.pesan} terakhir={terakhir} awal={petunjukSimpan(x)} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        {x.selesai ? (
          <div className="space-y-3 text-center">
            <p className="igil-muncul text-2xl font-black text-[#14532D]">🎉 Semua misi selesai!</p>
            <p className="text-sm font-black text-[#1C01A5]">{x.ditolak} kali mesin menolak. Urutanmu sudah rapi.</p>
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "ULANG" })}>
              🔁 Main lagi
            </button>
          </div>
        ) : null}

        {x.keadaan === "soal" ? (
          <div className="space-y-3 text-center">
            <p className="mx-auto w-max rounded-xl border-4 border-dashed border-[#F0AB00] bg-[#FFF7CC] px-4 py-2 text-3xl font-black text-[#1C01A5]">
              {m.a} {tanda} {m.b} = ?
            </p>
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BACA" })}>
              Baca soal ➡
            </button>
          </div>
        ) : null}

        {x.keadaan === "susun" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Susun</p>
            <TabelSusun a={m.a} b={m.b} op={m.op} />
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
              Lanjut ke Tukar ➡
            </button>
          </div>
        ) : null}

        {x.keadaan === "tukar" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Tukar</p>
            <TabelSusun a={m.a} b={m.b} op={m.op} />
            {perluSimpan(m) ? (
              <button type="button" className={TOMBOL_UTAMA} disabled={x.sudahTukar} onClick={() => kirim({ t: "TUKAR" })}>
                {x.sudahTukar ? "✅ Sudah disimpan" : "🔗 Simpan 10 satuan → 1 puluhan"}
              </button>
            ) : null}
            {perluUrai(m) ? (
              <button type="button" className={TOMBOL_UTAMA} disabled={x.sudahTukar} onClick={() => kirim({ t: "TUKAR" })}>
                {x.sudahTukar ? "✅ Sudah diurai" : "📤 Urai 1 puluhan → 10 satuan"}
              </button>
            ) : null}
            {!perluSimpan(m) && !perluUrai(m) ? (
              <p className="text-sm font-black text-[#14532D]">Tidak perlu menukar untuk soal ini.</p>
            ) : null}
            <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "LANJUT" })}>
              Lanjut ke Hasil ➡
            </button>
          </div>
        ) : null}

        {x.keadaan === "hasil" ? (
          <div className="space-y-3 text-center">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Stasiun Hasil • {m.a} {tanda} {m.b}</p>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih hasil">
              {pilihanHasil(x.misi).map((n) => (
                <button
                  key={n}
                  type="button"
                  className="h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5"
                  onClick={() => kirim({ t: "JAWAB", nilai: n })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {!x.selesai ? <p className="text-center text-xs font-bold text-[#1C01A5]/70">Stasiun sekarang: {NAMA_SIMPAN[x.keadaan]}</p> : null}
      </div>

      <RiwayatMesin riwayat={x.riwayat} ditolak={x.ditolak} />

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, coba maju ke Hasil sebelum Tukar. Apa kata mesin? Dua, di delapan ditambah lima, simpan sekali. Apa yang tertulis? Tiga, di empat belas dikurangi enam, urai dulu. Mengapa satuan jadi cukup?"
          )
        }
        langkah={[
          "Coba maju ke Hasil sebelum Tukar. Apa kata mesin?",
          "Di 8 + 5, simpan sekali. Apa yang tertulis di puluhan?",
          "Di 14 − 6, urai dulu. Mengapa satuan jadi cukup?",
        ]}
      />
    </div>
  );
}
