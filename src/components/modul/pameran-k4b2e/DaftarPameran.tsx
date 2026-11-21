"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { KOLOM_TABEL, KOTAK_ATURAN, PESAN_INFO_2, PETUNJUK_INFO_1, PETUNJUK_INFO_2, SELESAI_INFO_1, SELESAI_INFO_2, TABEL_PAMERAN } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti": dua kartu, tiap kartu satu layar tanpa gulir, dari angka Story E.
 * Kartu 1 "Tabel papan pameran": empat baris (nol koma tujuh lima, nol koma enam, nol koma empat, satu koma dua), tiap baris punya batang bergambar yang terisi sebanyak persennya
 * (di atas seratus persen ada batang kedua) dan tiga isi tertutup: desimal, pecahan, persen. Kartu 2 "Kotak aturan": dua batang dua puluh dari lima puluh dan empat puluh dari seratus,
 * lalu enam kotak aturan dengan label terlihat dan isi tertutup. Digital saja: suara dan kanvas hanya di CPA.
 */
const BIRU = "#1C01A5";
const COKLAT = "#92400E";

/** Batang persen (viewBox 64 x 30): batang penuh 56 satuan = seratus persen; terisi `p` persen, dan bila p di atas seratus ada batang kedua berisi sisanya. */
function Batang({ p }: { p: number }) {
  const lebar = 56;
  const dua = p > 100;
  const isi1 = (Math.min(p, 100) / 100) * lebar;
  const isi2 = dua ? ((p - 100) / 100) * lebar : 0;
  return (
    <svg viewBox="0 0 64 30" className="mx-auto w-full max-w-[64px]" role="img" aria-label={`batang terisi ${p} persen`} data-batang={p} data-batang-banyak={dua ? 2 : 1}>
      <path d="M2 1 H62 M14 1 V8 M50 1 V8" stroke={COKLAT} strokeWidth={1.4} fill="none" data-tali="1" />
      <rect x={4} y={dua ? 3 : 10} width={lebar} height={11} rx={2} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.6} />
      <rect x={4} y={dua ? 3 : 10} width={isi1} height={11} rx={2} fill="#FDE047" stroke={COKLAT} strokeWidth={1.6} data-isi1={Math.round(isi1)} />
      {dua ? (
        <g>
          <rect x={4} y={17} width={lebar} height={11} rx={2} fill="#FFFFFF" stroke={BIRU} strokeWidth={1.6} />
          <rect x={4} y={17} width={isi2} height={11} rx={2} fill="#FDE047" stroke={COKLAT} strokeWidth={1.6} data-isi2={Math.round(isi2)} />
        </g>
      ) : null}
    </svg>
  );
}

/** Dua batang sama panjang: dua puluh dari lima puluh sama terisi dengan empat puluh dari seratus (empat per sepuluh). */
function BatangPecahan() {
  return (
    <svg viewBox="0 0 220 72" className="mx-auto w-full max-w-[220px]" role="img" aria-label="dua puluh dari lima puluh sama dengan empat puluh dari seratus, dua batang sama terisi" data-batang-pecahan="1">
      <rect x={10} y={6} width={120} height={18} rx={3} fill="#FFFFFF" stroke={BIRU} strokeWidth={2} />
      <rect x={10} y={6} width={48} height={18} rx={3} fill="#FDE047" stroke={COKLAT} strokeWidth={2} />
      <text x={176} y={20} textAnchor="middle" fontSize={12} fontWeight={900} fill={BIRU}>
        20 dari 50
      </text>
      <text x={70} y={43} textAnchor="middle" fontSize={13} fontWeight={900} fill="#166534">
        × 2
      </text>
      <rect x={10} y={50} width={120} height={18} rx={3} fill="#FFFFFF" stroke={BIRU} strokeWidth={2} />
      <rect x={10} y={50} width={48} height={18} rx={3} fill="#FDE047" stroke={COKLAT} strokeWidth={2} />
      <text x={176} y={64} textAnchor="middle" fontSize={12} fontWeight={900} fill="#DC2626">
        40 dari 100
      </text>
    </svg>
  );
}

function Rahasia({ terbuka, teks, aria, onKetuk }: { terbuka: boolean; teks: string; aria: string; onKetuk: () => void }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={terbuka ? aria : "Isi kosong, ketuk untuk membuka"}
      className={`flex min-h-[44px] w-full items-center justify-center rounded-lg border-[3px] px-0.5 text-center text-[13px] font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#15803D]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
    >
      {terbuka ? teks : "?"}
    </button>
  );
}

export default function DaftarPameranK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = TABEL_PAMERAN.length * 3;
  const total2 = KOTAK_ATURAN.length;
  const buka1 = buka.filter((k) => k.startsWith("t")).length;
  const buka2 = buka.filter((k) => k.startsWith("a")).length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((x) => [...x, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const selesai = kartu === 1 ? buka1 === total1 : buka2 === total2;
  return (
    <div className="space-y-2">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#9A3412] bg-[#FFF7ED] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="tabel-pameran">
          <p className="mb-1.5 rounded-lg bg-[#9A3412] py-1 text-center text-sm font-black text-[#FDE68A]">{"\u{1F4CB}"} Tabel papan pameran</p>
          <div className="grid grid-cols-[64px_repeat(3,minmax(0,1fr))] items-center gap-1">
            <span aria-hidden="true" />
            {KOLOM_TABEL.map((k) => (
              <p key={k} className="text-center text-xs font-black text-[#9A3412]">
                {k}
              </p>
            ))}
            {TABEL_PAMERAN.map((b, i) => {
              const sel = [b.desimal, b.pecahan, b.persen];
              return (
                <React.Fragment key={b.id}>
                  <div className="rounded-md bg-white/80 p-0.5">
                    <Batang p={b.p} />
                  </div>
                  {sel.map((t, j) => {
                    const kunci = `t${i}-${j}`;
                    return <Rahasia key={kunci} terbuka={buka.includes(kunci)} teks={t} aria={`${KOLOM_TABEL[j]}: ${t}`} onKetuk={() => ketuk(kunci, b.suara[j])} />;
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#92400E] bg-[#FFF8E7] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="aturan-pameran">
          <p className="mb-1.5 rounded-lg bg-[#92400E] py-1 text-center text-sm font-black text-[#FDE68A]">{"\u{1F4AF}"} Kotak aturan</p>
          <div className="mb-1.5 rounded-xl border-2 border-[#E8C48F] bg-white/80 p-1">
            <BatangPecahan />
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {KOTAK_ATURAN.map((o, i) => {
              const kunci = `a${i}`;
              return (
                <div key={o.id} className="space-y-0.5 rounded-xl border-2 border-[#E8C48F] bg-white/80 p-1">
                  <p className="text-center text-xs font-black leading-tight text-[#92400E]">{o.label}</p>
                  <Rahasia terbuka={buka.includes(kunci)} teks={o.isi} aria={`${o.label}: ${o.isi}`} onKetuk={() => ketuk(kunci, o.suara)} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (buka1 === total1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : buka2 === total2 ? SELESAI_INFO_2 : PESAN_INFO_2}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke tabel papan pameran">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}

export { DaftarPameranK4B2 };
