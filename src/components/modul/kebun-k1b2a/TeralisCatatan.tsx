"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_TERALIS, EMOJI, KELOMPOK_TERALIS, KOLOM_TERALIS, SUARA_TERALIS, TEMPAT_TERALIS } from "./data";

/**
 * Infografis Kelas 1 Bab 2 Sub-Bab A: Teralis Catatan Tanam. Tabel data di atas teralis bambu; tiap batang bambu mendatar satu baris
 * (bedeng dari Story), tiga papan nama kayu yang tergantung kosong per baris: Mula-mula, Ditambah, Kalimat.
 */
const NAMA_KOLOM: Record<string, string> = { mula: "Mula-mula", tambah: "Ditambah", kalimat: "Kalimat" };

export default function TeralisCatatan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_TERALIS,
    59,
    (l) => {
      const t = TEMPAT_TERALIS.find((x) => x.kunci === l.teks);
      return t ? KELOMPOK_TERALIS[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const papan = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <div key={t.id} className="flex flex-col items-center">
        <span className="h-3 w-0.5 bg-[#78350F]" aria-hidden="true" />
        <button
          type="button"
          onClick={() => tp.ketukTempat(t)}
          aria-label={teks ?? `Papan kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
          className={`relative flex min-h-[40px] w-full items-center justify-center rounded-md border-2 px-1 pt-1.5 text-center font-black leading-tight ${t.kelompok === "kalimat" ? "text-sm" : "text-xs"} ${teks ? "border-[#78350F] bg-[#FDE68A] text-[#1C01A5] lm-muncul" : "border-dashed border-[#78350F]/60 bg-[#FEF3C7]/70 text-[#78350F]/60"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
        >
          <span className="absolute left-1/2 top-0.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#78350F]" aria-hidden="true" />
          {teks ?? "?"}
        </button>
      </div>
    );
  };
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_TERALIS)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Teralis catatan tanam. Tiap batang bambu satu bedeng dari cerita. Gantungkan mula-mula, yang ditambah, dan kalimatnya.</p>
      </div>

      <div
        className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#A3A635] p-3"
        style={{
          backgroundColor: "#ECFCCB",
          backgroundImage: "repeating-linear-gradient(45deg,rgba(163,166,53,0.35) 0 4px,transparent 4px 34px),repeating-linear-gradient(-45deg,rgba(163,166,53,0.35) 0 4px,transparent 4px 34px)",
        }}
      >
        <p className="text-center text-lg font-black text-[#3F6212]">{"\u{1F33F}"} Catatan Tanam Kebun Mamah</p>
        <div className="mb-1 mt-2 grid grid-cols-[4.2rem_0.8fr_1fr_1.4fr] gap-1.5">
          <span className="text-center text-[11px] font-black text-[#3F6212]">Bedeng</span>
          {KOLOM_TERALIS.map((k) => (
            <span key={k} className="rounded bg-white/80 text-center text-[11px] font-black text-[#3F6212]">
              {k}
            </span>
          ))}
        </div>
        {BARIS_TERALIS.map((b, i) => (
          <div key={b.nama} className="relative pb-2 pt-1">
            {/* Batang bambu mendatar */}
            <div className="absolute left-0 right-0 top-1 h-3 rounded-full border border-[#65A30D]" style={{ background: "repeating-linear-gradient(90deg,#BEF264 0 38px,#84CC16 38px 41px)" }} aria-hidden="true" />
            <div className="relative grid grid-cols-[4.2rem_0.8fr_1fr_1.4fr] items-start gap-1.5 pt-1">
              <span className="flex flex-col items-center pt-2 text-[10px] font-black text-[#1C01A5]">
                <span className="text-xl" aria-hidden="true">
                  {EMOJI[b.benda]}
                </span>
                {b.nama}
              </span>
              {papan(TEMPAT_TERALIS[i * 3])}
              {papan(TEMPAT_TERALIS[i * 3 + 1])}
              {papan(TEMPAT_TERALIS[i * 3 + 2])}
            </div>
          </div>
        ))}
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FEF9C3" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Teralis lengkap! Mula-mula ditambah yang datang, hasilnya ditulis dengan tanda sama dengan." : tp.pesan}
      </p>
      {tp.selesai ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
