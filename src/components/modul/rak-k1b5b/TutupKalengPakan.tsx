"use client";

import React from "react";
import { BakiLabel, CSS_LEMARI, TOMBOL_UTAMA, useTempel } from "../lemari-k1b1a/ui";
import type { Tempat } from "./logika";
import { BARIS_KALENG, KELOMPOK_KALENG, KOLOM_KALENG, SUARA_KALENG, TEMPAT_KALENG } from "./data";

/**
 * Infografis Kelas 1 Bab 5 Sub-Bab B: Catatan di Tutup Kaleng Pakan. Tabel data ditulis di tutup kaleng pakan yang bundar berbibir logam;
 * tiap baris satu kegiatan dari Story (pakan maju, lampu mundur, di antara, nomor hilang, kisi rak) dengan tiga kotak kosong:
 * Petunjuk, Hasil, Cara.
 */
const NAMA_KOLOM: Record<string, string> = { petunjuk: "Petunjuk", hasil: "Hasil", cara: "Cara" };

export default function TutupKalengPakan({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const tp = useTempel(
    TEMPAT_KALENG,
    73,
    (l, tujuan) => {
      const t = TEMPAT_KALENG.find((x) => x.kunci === l.teks);
      if (t && t.kelompok === tujuan.kelompok) return "Kolomnya sudah benar, tetapi barisnya bukan ini. Cocokkan dengan kegiatan di baris ini.";
      return t ? KELOMPOK_KALENG[t.kelompok] : "Coba tempat yang lain.";
    },
    speakGuru,
  );
  const kotak = (t: Tempat) => {
    const teks = tp.teksDi(t);
    return (
      <button
        key={t.id}
        type="button"
        onClick={() => tp.ketukTempat(t)}
        aria-label={teks ?? `Kotak kosong kolom ${NAMA_KOLOM[t.kelompok]}`}
        className={`flex min-h-[44px] w-full items-center justify-center rounded-md border-2 px-1 text-center text-xs font-black leading-tight ${teks ? "border-[#1C01A5] bg-white text-[#1C01A5] lm-muncul" : "border-dashed border-[#B45309] bg-white/50 text-[#B45309]/70"} ${tp.goyang === t.id ? "lm-goyang" : ""}`}
      >
        {teks ?? "?"}
      </button>
    );
  };
  const KOL = "grid-cols-[3.6rem_1fr_1fr_1fr]";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(SUARA_KALENG)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Catatan di tutup kaleng pakan. Tiap baris satu kegiatan di rak. Tempelkan petunjuknya, hasilnya, dan caranya.</p>
      </div>

      {/* Tutup kaleng bundar: bibir logam berulir, permukaan bercat oranye, catatan di tengah */}
      <div
        className="relative mx-auto w-full max-w-xl rounded-[46%/18%] p-3"
        style={{ background: "repeating-conic-gradient(from 0deg,#94A3B8 0 4deg,#CBD5E1 4deg 8deg)", boxShadow: "0 6px 0 #475569" }}
      >
        <div className="rounded-[44%/16%] border-4 border-[#64748B] px-3 py-4 sm:px-6" style={{ background: "radial-gradient(ellipse at 50% 35%,#FFEDD5 0 45%,#FDBA74 75%,#F97316 100%)" }}>
          <p className="text-center text-lg font-black text-[#7C2D12]">{"\u{1F963}"} Catatan Pakan Pagi</p>
          <div className={`mb-1 mt-2 grid ${KOL} gap-1`}>
            <span className="text-center text-[10px] font-black text-[#7C2D12]">Kegiatan</span>
            {KOLOM_KALENG.map((k) => (
              <span key={k} className="rounded-sm bg-[#7C2D12] px-0.5 text-center text-[10px] font-black leading-tight text-[#FFEDD5]">
                {k}
              </span>
            ))}
          </div>
          {BARIS_KALENG.map((b, i) => (
            <div key={b.nama} className="mb-1 border-b-2 border-dashed border-[#9A3412]/40 pb-1">
              <div className={`grid ${KOL} items-center gap-1`}>
                <span className="flex flex-col items-center text-[10px] font-black text-[#7C2D12]">
                  <span className="text-lg" aria-hidden="true">
                    {b.ikon}
                  </span>
                  {b.nama}
                </span>
                {[0, 1, 2].map((c) => kotak(TEMPAT_KALENG[i * 3 + c]))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BakiLabel sisa={tp.sisa} pilih={tp.pilih} onPilih={tp.ketukLabel} warna="#FFEDD5" />
      <p role="status" aria-live="polite" className="min-h-[1.5rem] text-center text-sm font-black text-[#1C01A5]">
        {tp.selesai ? "Catatan lengkap! Maju makin besar, mundur makin kecil, dan nomor hilang dicari dari tetangganya." : tp.pesan}
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
