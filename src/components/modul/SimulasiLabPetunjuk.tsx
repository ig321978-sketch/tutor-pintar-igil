"use client";

import React, { useEffect, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import { BendaSvg } from "./dasar-k2b4";
import type { BendaId } from "./data-k2b4";
import {
  MAKS_PETUNJUK,
  NAMA_ISI,
  NAMA_MODE,
  NAMA_PAPAN,
  PAPAN_ISI,
  URUT_ARAH,
  URUT_PAPAN,
  awalPetunjuk,
  frasaArah,
  kalimatPetunjuk,
  kandidat,
  langkahPet,
  ucapanPetunjuk,
  type ArahPet,
  type LabPetunjuk,
  type Mode,
  type PerPet,
  type Papan,
} from "./lab-petunjuk-k2b4";
import type { KeadaanLabPetunjuk } from "./misi-k2bab4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B4 Sub-Bab A): Lab Petunjuk Ganda — PhET.                      */
/* Papan 3 x 3 berisi sembilan benda. Pilih satu benda sebagai Aku, susun      */
/* petunjuk posisi satu per satu, dan lihat berapa benda yang masih cocok.     */
/* Dua cara baca: di mana saja, atau tepat di sebelahnya. Tanpa skor.          */
/* Logika: lab-petunjuk-k2b4.ts.                                               */
/* ------------------------------------------------------------------------ */

const nama = (n: string) => NAMA_ISI[n] ?? n;

const PENJELAS: Record<Mode, string> = {
  mana: "Di mana saja: \"di atas jam\" berarti di baris mana pun yang lebih atas dari jam.",
  tepat: "Tepat di sebelahnya: \"di atas jam\" berarti persis menempel di atas jam.",
};

export default function SimulasiLabPetunjuk({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabPetunjuk) => void }) {
  const [x, setX] = useState<LabPetunjuk>(() => awalPetunjuk());
  const [kata, setKata] = useState<ArahPet | null>(null);
  const [gantiAku, setGantiAku] = useState(false);
  const [pesan, setPesan] = useState("");
  const [baik, setBaik] = useState(true);
  const [tampilTabel, setTampilTabel] = useState(false);

  const cocok = kandidat(x.papan, x.mode, x.petunjuk);
  const sisa = cocok.length;

  useEffect(() => {
    onKeadaan?.({ alat: "petunjuk", papan: x.papan, mode: x.mode, target: x.target, petunjuk: x.petunjuk.length, sisa });
  }, [onKeadaan, x.papan, x.mode, x.target, x.petunjuk.length, sisa]);

  const kirim = (p: PerPet) => {
    const h = langkahPet(x, p);
    setX(h.x);
    setPesan(h.pesan);
    setBaik(h.baik);
    return h;
  };

  const ketukSel = (n: string) => {
    if (!x.target || gantiAku) {
      kirim({ t: "TARGET", nama: n });
      setGantiAku(false);
      return;
    }
    if (!kata) {
      setPesan("Pilih dulu kata posisinya: atas, bawah, kiri, atau kanan.");
      setBaik(false);
      return;
    }
    kirim({ t: "TAMBAH", kata, acuan: n });
  };

  const resetSemua = () => {
    kirim({ t: "RESET" });
    setKata(null);
    setGantiAku(false);
    setTampilTabel(false);
    setPesan("");
    setBaik(true);
  };

  const petunjukAwal = !x.target
    ? "Ketuk satu benda di papan sebagai Aku."
    : x.petunjuk.length === 0
      ? `Aku adalah ${nama(x.target)}. Pilih kata posisi, lalu ketuk benda acuan.`
      : kalimatPetunjuk(x.petunjuk);

  const ketemu = x.target !== null && x.petunjuk.length > 0 && sisa === 1;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Petunjuk Ganda</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Satu petunjuk sering belum cukup. Tambah petunjuk sampai tinggal satu benda yang cocok.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan petunjuknya" onClick={() => speakGuru(eja(ucapanPetunjuk(x)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Papan">
          <span className="text-xs font-black text-[#1C01A5]">Papan:</span>
          {URUT_PAPAN.map((p: Papan) => (
            <Pilihan
              key={p}
              aktif={x.papan === p}
              onKlik={() => {
                kirim({ t: "PAPAN", nilai: p });
                setKata(null);
                setGantiAku(false);
              }}
            >
              {NAMA_PAPAN[p]}
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Cara membaca petunjuk">
          <span className="text-xs font-black text-[#1C01A5]">Cara baca:</span>
          {(["mana", "tepat"] as Mode[]).map((m) => (
            <Pilihan key={m} aktif={x.mode === m} onKlik={() => kirim({ t: "MODE", nilai: m })}>
              {NAMA_MODE[m]}
            </Pilihan>
          ))}
        </div>
        <p className="text-xs font-bold leading-snug text-[#1C01A5]/80">{PENJELAS[x.mode]}</p>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]" aria-live="polite">
          {petunjukAwal}
        </p>
        <div className="mx-auto grid w-full max-w-[330px] grid-cols-3 gap-1.5" role="group" aria-label={`Papan tiga kali tiga: ${NAMA_PAPAN[x.papan]}`}>
          {PAPAN_ISI[x.papan].flat().map((n) => {
            const aku = x.target === n;
            const masih = x.petunjuk.length > 0 && cocok.includes(n);
            const gugur = x.petunjuk.length > 0 && !cocok.includes(n);
            return (
              <button
                key={n}
                type="button"
                onClick={() => ketukSel(n)}
                aria-label={`${nama(n)}${aku ? ", ini Aku" : masih ? ", masih cocok" : gugur ? ", sudah tidak cocok" : ""}`}
                className={`relative flex min-h-[78px] flex-col items-center justify-center gap-0.5 rounded-2xl border-4 px-1 py-1 text-xs font-black text-[#1C01A5] ${
                  aku ? "border-[#F0AB00] bg-[#FFF3B0] shadow-[0_3px_0_#F0AB00]" : masih ? "border-[#16A34A] bg-[#ECFDF3]" : gugur ? "border-[#1C01A5]/15 bg-white opacity-40" : "border-[#1C01A5]/40 bg-white"
                }`}
              >
                {aku ? <span className="absolute -top-2.5 rounded-full bg-[#1C01A5] px-2 text-[10px] font-black text-[#FFE566]">AKU</span> : null}
                <BendaSvg id={n as BendaId} kelas="h-10 w-10" label="" />
                <span>{nama(n)}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Kata posisi">
          <span className="text-xs font-black text-[#1C01A5]">Aku ada…</span>
          {URUT_ARAH.map((a) => (
            <Pilihan key={a} aktif={kata === a} onKlik={() => setKata(kata === a ? null : a)} label={`Kata posisi ${frasaArah(a)}`}>
              {frasaArah(a)}
            </Pilihan>
          ))}
        </div>
        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Lalu ketuk benda acuan di papan. {x.target ? "" : "(Pilih Aku dulu.)"}</p>
        {x.target ? (
          <div className="flex justify-center">
            <button type="button" className={TOMBOL_BIASA} onClick={() => setGantiAku(!gantiAku)} aria-pressed={gantiAku}>
              {gantiAku ? "Ketuk benda yang jadi Aku…" : "🔄 Ganti Aku"}
            </button>
          </div>
        ) : null}

        {pesan ? (
          <p className={`rounded-2xl px-3 py-2 text-center text-sm font-black ${baik ? "bg-[#E8F7EE] text-[#14532D]" : "bg-[#FFF1F2] text-[#9F1239]"}`} role="status">
            {pesan}
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-black text-[#1C01A5]">
            Petunjuk ({x.petunjuk.length} dari {MAKS_PETUNJUK})
          </h4>
          {x.petunjuk.length > 0 ? (
            <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "BERSIH" })}>
              Hapus semua
            </button>
          ) : null}
        </div>
        {x.petunjuk.length === 0 ? (
          <p className="text-xs font-bold text-[#1C01A5]/70">Belum ada petunjuk.</p>
        ) : (
          <ul className="flex flex-wrap gap-1.5">
            {x.petunjuk.map((p, i) => (
              <li key={`${p.kata}-${p.acuan}`} className="flex items-center gap-1 rounded-full border-2 border-[#1C01A5] bg-[#FFF7CC] py-1 pl-3 pr-1 text-xs font-black text-[#1C01A5]">
                Aku {frasaArah(p.kata)} {nama(p.acuan)}
                <button type="button" aria-label={`Hapus petunjuk ${i + 1}`} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C01A5] text-[#FFE566]" onClick={() => kirim({ t: "HAPUS", i })}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
        <KalimatBesar
          teks={
            !x.target
              ? "Pilih satu benda sebagai Aku."
              : ketemu
                ? `Hanya satu benda yang cocok: ${nama(cocok[0])}. Petunjukmu sudah cukup!`
                : x.petunjuk.length === 0
                  ? `Belum ada petunjuk, jadi semua ${sisa} benda masih cocok.`
                  : `Masih ada ${sisa} benda yang cocok.`
          }
          warna={ketemu ? "bg-[#E8F7EE]" : "bg-[#FFF7CC]"}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Cek aktif={tampilTabel} onKlik={() => setTampilTabel(!tampilTabel)}>
            Daftar benda yang cocok
          </Cek>
        </div>
        {tampilTabel ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Benda yang masih cocok">
            {cocok.length === 0 ? <li className="text-xs font-bold text-[#1C01A5]/70">Tidak ada.</li> : null}
            {cocok.map((n) => (
              <li key={n} className="flex items-center gap-1 rounded-full border-2 border-[#16A34A] bg-[#ECFDF3] px-2 py-0.5 text-xs font-black text-[#14532D]">
                <BendaSvg id={n as BendaId} kelas="h-5 w-5" label="" />
                {nama(n)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, pilih satu benda sebagai Aku, lalu beri satu petunjuk. Berapa benda yang masih cocok? Dua, tambah petunjuk sampai tinggal satu. Berapa petunjuk yang kamu butuhkan? Tiga, pilih benda di tengah papan. Lebih mudah atau lebih sulit? Empat, ganti cara baca menjadi tepat di sebelahnya. Apa yang berubah?"
          )
        }
        langkah={[
          "Pilih satu benda sebagai Aku, lalu beri satu petunjuk. Berapa benda yang masih cocok?",
          "Tambah petunjuk sampai tinggal satu benda. Berapa petunjuk yang kamu butuhkan?",
          "Coba benda di pojok papan, lalu benda di tengah papan. Mana yang butuh petunjuk lebih banyak?",
          "Ganti Cara baca menjadi Tepat di sebelahnya. Apa yang berubah pada jumlah benda yang cocok?",
        ]}
      />
    </div>
  );
}
