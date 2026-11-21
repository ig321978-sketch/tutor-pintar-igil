"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { Keramik } from "./GambarEtalase";
import { ACUAN_ETALASE, KERAMIK_INFO, PESAN2_INFO_ETALASE, PETUNJUK1_INFO_ETALASE, PETUNJUK2_INFO_ETALASE, SELESAI1_INFO_ETALASE, sejajarInfo, sisiInfo, suaraSel, type KeramikInfo } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 5 Sub-Bab A (rancangan bebas, bukan komponen bersama): HALAMAN KATALOG Bu Dewi, dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = lembar katalog berisi lima kartu bangun (persegi, jajargenjang, trapesium, segienam beraturan, segitiga sama sisi) dengan gambar keramik, sedangkan nama,
 * banyak sisi, dan banyak pasang sisi sejajar tertutup (?) sampai diketuk. Tombol BERIKUTNYA hanya setelah semuanya terbuka. Angka dihitung dari koordinat bangun (data bersambung ke Sub-Bab B).
 * Kartu 2 = pohon keluarga segiempat dan jenis segitiga (gambar acuan) dengan kalimat ciri yang dibacakan bila diketuk.
 */

/** Simpul pohon keluarga: bangun, nama, dan pusatnya pada gambar acuan. */
const POHON: { b: string; nama: string; x: number; y: number }[] = [
  { b: "segiempat-sembarang", nama: "segiempat", x: 150, y: 22 },
  { b: "trapesium", nama: "trapesium", x: 50, y: 76 },
  { b: "jajargenjang", nama: "jajargenjang", x: 150, y: 76 },
  { b: "layang-layang", nama: "layang-layang", x: 250, y: 76 },
  { b: "persegi-panjang", nama: "persegi panjang", x: 100, y: 130 },
  { b: "belah-ketupat", nama: "belah ketupat", x: 200, y: 130 },
  { b: "persegi", nama: "persegi", x: 150, y: 184 },
];
/** Garis keluarga: dari induk (indeks) ke anak (indeks). */
const CABANG: [number, number][] = [[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [3, 5], [4, 6], [5, 6]];
const SEGITIGA: { b: string; nama: string; x: number }[] = [
  { b: "segitiga-sama-sisi", nama: "sama sisi", x: 38 },
  { b: "segitiga-sama-kaki", nama: "sama kaki", x: 112 },
  { b: "segitiga-sembarang", nama: "sembarang", x: 186 },
  { b: "segitiga-siku", nama: "siku-siku", x: 258 },
];

type Kunci = `${string}-${0 | 1 | 2}`;

export default function InfoEtalase({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const total = KERAMIK_INFO.length * 3;
  const selesai = buka.length === total;
  const ketuk = (k: KeramikInfo, kol: 1 | 2 | 3) => {
    const kunci: Kunci = `${k.kunci}-${(kol - 1) as 0 | 1 | 2}`;
    speakGuru(suaraSel(k, kol));
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const terbuka = (k: KeramikInfo, kol: 1 | 2 | 3) => buka.includes(`${k.kunci}-${kol - 1}`);
  const chip = (k: KeramikInfo, kol: 1 | 2 | 3, isi: React.ReactNode, label: string) => (
    <button
      type="button"
      onClick={() => ketuk(k, kol)}
      aria-label={terbuka(k, kol) ? `${label}: ${isi}` : `Isi kosong, ${label}`}
      className={`flex min-h-[26px] min-w-0 items-center justify-center rounded-md border-2 px-1 text-center text-[11px] font-black leading-tight ${terbuka(k, kol) ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/90 text-base text-[#B45309]"}`}
    >
      {terbuka(k, kol) ? isi : "?"}
    </button>
  );
  const kartuBangun = (k: KeramikInfo, i: number) => {
    const lebar = i === KERAMIK_INFO.length - 1 && KERAMIK_INFO.length % 2 === 1;
    return (
      <div key={k.kunci} className={`rounded-xl border-[3px] border-[#9A3412] bg-[#FFF7ED] p-1 shadow-[0_3px_0_rgba(124,45,18,0.25)] ${lebar ? "col-span-2 grid grid-cols-[38%_1fr] items-center gap-1" : ""}`} data-bangun={k.bangun}>
        <svg viewBox="0 0 100 52" className={lebar ? "h-[46px] w-full" : "h-[38px] w-full"} role="img" aria-label={`Keramik ${k.nama}`}>
          <Keramik kunci={k.bangun} x={6} y={2} w={88} h={48} rupa="benda" />
        </svg>
        <div className={`grid gap-1 ${lebar ? "" : "mt-0.5"}`}>
          {chip(k, 1, k.nama, "Nama")}
          <div className="grid grid-cols-2 gap-1">
            {chip(k, 2, `${sisiInfo(k)} sisi`, "Sisi")}
            {chip(k, 3, `${sejajarInfo(k)} pasang`, "Sisi sejajar")}
          </div>
        </div>
      </div>
    );
  };

  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_ETALASE : PETUNJUK2_INFO_ETALASE;
  return (
    <div className="space-y-1.5">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-[420px] rounded-xl border-[6px] border-[#C2410C] bg-[#FFFBEB] p-2" data-uji="lembar-katalog" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(194,65,12,0.12) 0 1px,transparent 1px 22px)" }}>
          <p className="mb-1 rounded-md bg-[#C2410C] py-0.5 text-center text-sm font-black text-[#FFEDD5]">{"\u{1F3FA}"} Katalog Bu Dewi</p>
          <div className="grid grid-cols-2 gap-2">
            {KERAMIK_INFO.map(kartuBangun)}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[420px] rounded-xl border-[6px] border-[#1C01A5] bg-[#F5F3FF] p-1.5" data-uji="kartu-acuan">
          <svg viewBox="0 0 300 286" className="block h-auto w-full" role="img" aria-label="Pohon keluarga segiempat dan jenis segitiga">
            {CABANG.map(([a, b]) => (
              <line key={`${a}-${b}`} x1={POHON[a].x} y1={POHON[a].y + 30} x2={POHON[b].x} y2={POHON[b].y - 14} stroke="#64748B" strokeWidth={1.4} />
            ))}
            {POHON.map((p) => (
              <g key={p.b}>
                <Keramik kunci={p.b} x={p.x - 20} y={p.y - 12} w={40} h={24} rupa="benda" />
                <text x={p.x} y={p.y + 25} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5" stroke="#F5F3FF" strokeWidth={3} paintOrder="stroke">
                  {p.nama}
                </text>
              </g>
            ))}
            <text x={8} y={224} fontSize={12} fontWeight={900} fill="#9A3412">
              Segitiga
            </text>
            {SEGITIGA.map((p) => (
              <g key={p.b}>
                <Keramik kunci={p.b} x={p.x - 24} y={230} w={48} h={34} rupa="benda" />
                <text x={p.x} y={280} textAnchor="middle" fontSize={12} fontWeight={900} fill="#1C01A5">
                  {p.nama}
                </text>
              </g>
            ))}
          </svg>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {ACUAN_ETALASE.kalimat.map((s, i) => (
              <button key={s.teks} type="button" onClick={() => speakGuru(s.suara)} className={`rounded-lg bg-[#DCFCE7] px-1 py-1 text-center text-[11px] font-black leading-tight text-[#14532D] ${i === ACUAN_ETALASE.kalimat.length - 1 ? "col-span-2" : ""}`}>
                {"\u{1F50A}"} {s.teks}
              </button>
            ))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai ? SELESAI1_INFO_ETALASE : `Sudah dibuka ${buka.length} dari ${total} kotak.`) : PESAN2_INFO_ETALASE}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke katalog">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 ? (
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
export { InfoEtalase };
