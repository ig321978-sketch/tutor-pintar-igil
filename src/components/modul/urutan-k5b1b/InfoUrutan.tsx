"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  GARIS_INFO,
  IKON_TRIBUN,
  JUDUL_INFO_1,
  JUDUL_INFO_2,
  PASANGAN_LALU,
  PESAN_BELUM_BALIK,
  PETUNJUK_INFO_1,
  PETUNJUK_INFO_2,
  SELESAI_INFO_1,
  SELESAI_INFO_2,
  SUARA_BALIK_NAIK,
  SUARA_BALIK_TURUN,
  SUARA_TITIK,
  TRIBUN,
  barisPapan,
} from "./data-info";
import { fmt } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (label kosong): DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan urutan keempat tribun dari paling sepi (data bersambung dari Sub-Bab A): kolom banyak angka dan tanda ke tribun di bawahnya berisi sel kosong "?" yang diketuk,
 * dan tombol Balik mengubah urutan naik menjadi turun. Kartu 2 = garis bilangan berpatokan dengan empat titik berlabel kosong "?" (posisi sebanding bilangannya)
 * dan pasangan Utara minggu ini dan pekan lalu untuk "geser sampai angkanya berbeda". Komponen sendiri: gambar dan tata letak mengikuti isi materi.
 */
const TEKS_TANDA = { ">": "lebih besar", "<": "lebih kecil", "=": "sama dengan" } as const;

export default function InfoUrutanK5B1({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [naik, setNaik] = useState(true);
  const [sudahBalik, setSudahBalik] = useState(false);
  const [bukaAngka, setBukaAngka] = useState<number[]>([]);
  const [bukaTanda, setBukaTanda] = useState<string[]>([]);
  const [bukaTitik, setBukaTitik] = useState<string[]>([]);
  const [bukaLalu, setBukaLalu] = useState(false);
  const baris = barisPapan(naik ? "naik" : "turun");
  const tandaNaik = barisPapan("naik").filter((b) => b.tanda !== null);
  const tandaTurun = barisPapan("turun").filter((b) => b.tanda !== null);
  const tandaSemua = tandaNaik.every((b) => bukaTanda.includes(`naik${b.i}`)) && tandaTurun.every((b) => bukaTanda.includes(`turun${b.i}`));
  const selesai1 = bukaAngka.length === TRIBUN.length && tandaSemua && sudahBalik;
  const selesai2 = bukaTitik.length === TRIBUN.length && bukaLalu;

  const ketukAngka = (i: number, suara: string) => {
    speakGuru(suara);
    if (!bukaAngka.includes(i)) setBukaAngka((b) => [...b, i]);
  };
  const ketukTanda = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!bukaTanda.includes(kunci)) setBukaTanda((b) => [...b, kunci]);
  };
  const balik = () => {
    setNaik((n) => !n);
    setSudahBalik(true);
    speakGuru(naik ? SUARA_BALIK_TURUN : SUARA_BALIK_NAIK);
  };
  const ketukTitik = (nama: string) => {
    speakGuru(SUARA_TITIK[nama]);
    if (!bukaTitik.includes(nama)) setBukaTitik((b) => [...b, nama]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const status =
    kartu === 1
      ? selesai1
        ? SELESAI_INFO_1
        : bukaAngka.length === TRIBUN.length && tandaNaik.every((b) => bukaTanda.includes(`naik${b.i}`)) && !sudahBalik
          ? PESAN_BELUM_BALIK
          : `Sudah dibuka ${bukaAngka.length + bukaTanda.length} dari ${TRIBUN.length + tandaNaik.length + tandaTurun.length} sel.`
      : selesai2
        ? SELESAI_INFO_2
        : `Sudah dibuka ${bukaTitik.length} dari ${TRIBUN.length} titik${bukaLalu ? "." : ", pasangan pekan lalu belum."}`;
  const g = GARIS_INFO;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#C2410C] bg-[#FFF7ED] p-2 shadow-[0_5px_0_rgba(124,45,18,0.3)]" data-uji="papan-urutan">
          <p className="mb-1 rounded-lg bg-[#C2410C] py-1 text-center text-sm font-black text-[#FFEDD5]">
            {IKON_TRIBUN} {JUDUL_INFO_1} ({naik ? "naik" : "turun"})
          </p>
          <div className="grid grid-cols-[28px_1fr_74px_66px] items-end gap-1 px-0.5 pb-0.5 text-center text-[10px] font-black leading-tight text-[#7C2D12]" aria-hidden="true">
            <span>No.</span>
            <span className="text-left">Tribun dan penonton</span>
            <span>Banyak angka</span>
            <span>Tanda ke bawah</span>
          </div>
          <div className="space-y-1" role="list">
            {baris.map((b, pos) => (
              <div key={b.nama} role="listitem" className="grid grid-cols-[28px_1fr_74px_66px] items-center gap-1 rounded-lg border-2 border-[#FDBA74] bg-white px-0.5 py-0.5" data-baris={b.n}>
                <span className="text-center text-sm font-black text-[#7C2D12]">{pos + 1}</span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-xs font-black text-[#1C01A5]">{b.nama}</span>
                  <span className="block text-base font-black text-[#1C01A5]">{fmt(b.n)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => ketukAngka(b.i, b.suaraAngka)}
                  aria-label={bukaAngka.includes(b.i) ? `Banyak angka ${b.nama}: ${b.angka}` : `Sel kosong banyak angka ${b.nama}`}
                  className={`min-h-[44px] rounded-lg border-2 text-lg font-black ${bukaAngka.includes(b.i) ? "lm-muncul border-[#15803D] bg-[#BBF7D0] text-[#14532D]" : "border-dashed border-[#B45309] bg-white text-[#B45309]"}`}
                >
                  {bukaAngka.includes(b.i) ? b.angka : "?"}
                </button>
                {b.tanda ? (
                  <button
                    type="button"
                    onClick={() => ketukTanda(`${naik ? "naik" : "turun"}${b.i}`, b.suaraTanda)}
                    aria-label={bukaTanda.includes(`${naik ? "naik" : "turun"}${b.i}`) ? `Tanda ${b.nama}: ${TEKS_TANDA[b.tanda]}` : `Sel kosong tanda ${b.nama}`}
                    className={`min-h-[44px] rounded-lg border-2 text-xl font-black ${bukaTanda.includes(`${naik ? "naik" : "turun"}${b.i}`) ? "lm-muncul border-[#15803D] bg-[#BBF7D0] text-[#14532D]" : "border-dashed border-[#B45309] bg-white text-[#B45309]"}`}
                  >
                    {bukaTanda.includes(`${naik ? "naik" : "turun"}${b.i}`) ? b.tanda : "?"}
                  </button>
                ) : (
                  <span className="text-center text-sm font-black text-[#7C2D12]/60" aria-hidden="true">
                    -
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-center">
            <button type="button" onClick={balik} aria-pressed={!naik} className="min-h-[44px] rounded-full border-2 border-[#C2410C] bg-white px-4 text-sm font-black text-[#C2410C]">
              {"\u{1F501}"} Balik
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#C2410C] bg-[#FFF7ED] p-2 shadow-[0_5px_0_rgba(124,45,18,0.3)]" data-uji="garis-info">
          <p className="mb-1 rounded-lg bg-[#C2410C] py-1 text-center text-sm font-black text-[#FFEDD5]">
            {"\u{1F4CF}"} {JUDUL_INFO_2}
          </p>
          <svg viewBox={`0 0 ${g.lebar} ${g.tinggi}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={`garis bilangan dengan patokan ${g.patokan.map((p) => p.angka).join(", ")} dan empat titik tribun`} data-patokan={g.patokan.length}>
            <rect x={2} y={2} width={g.lebar - 4} height={g.tinggi - 4} rx={10} fill="#FFFFFF" stroke="#B45309" strokeWidth={1.2} strokeDasharray="5 3" opacity={0.9} />
            <line x1={g.x0 - 10} y1={g.y} x2={g.x1 + 10} y2={g.y} stroke="#7C2D12" strokeWidth={2.2} />
            <path d={`M${g.x1 + 10} ${g.y} l-6 -3.5 v7 z`} fill="#7C2D12" />
            {g.patokan.map((p) => (
              <g key={p.n}>
                <line x1={p.x} y1={g.y - 6} x2={p.x} y2={g.y + 6} stroke="#7C2D12" strokeWidth={2} />
                <text x={p.x} y={g.y + 20} textAnchor="middle" fontSize={9} fontWeight={800} fill="#7C2D12">
                  {p.angka}
                </text>
              </g>
            ))}
            {g.titik.map((t) => {
              const terbuka = bukaTitik.includes(t.nama);
              return (
                <g
                  key={t.nama}
                  role="button"
                  tabIndex={0}
                  aria-label={terbuka ? `Titik ${t.nama}: ${fmt(t.n)}` : `Label kosong titik ${t.nama}`}
                  onClick={() => ketukTitik(t.nama)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? ketukTitik(t.nama) : undefined)}
                  style={{ cursor: "pointer" }}
                  data-titik-n={t.n}
                  data-titik-x={t.x.toFixed(2)}
                >
                  <line x1={t.x} y1={g.y} x2={t.x} y2={t.y + 3} stroke="#DC2626" strokeWidth={1.2} strokeDasharray="2 2" />
                  <circle cx={t.x} cy={g.y} r={4.5} fill="#DC2626" stroke="#7F1D1D" strokeWidth={1.2} />
                  <rect x={t.x - 20} y={t.y - 11} width={40} height={15} rx={5} fill={terbuka ? "#DCFCE7" : "#FFFFFF"} stroke={terbuka ? "#15803D" : "#B45309"} strokeWidth={1.5} strokeDasharray={terbuka ? undefined : "3 2"} />
                  <text x={t.x} y={t.y + 0.5} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={terbuka ? "#14532D" : "#B45309"}>
                    {terbuka ? t.nama : "?"}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-1 grid grid-cols-2 gap-1" aria-live="polite">
            {TRIBUN.map((t) => (
              <p key={t.nama} className={`min-h-[26px] rounded-md border-2 px-1 py-0.5 text-center text-xs font-black ${bukaTitik.includes(t.nama) ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#FDBA74] bg-white text-[#B45309]"}`}>
                {bukaTitik.includes(t.nama) ? `${t.nama}: ${fmt(t.n)}` : "?"}
              </p>
            ))}
          </div>
          <div className="mt-1.5 flex justify-center">
            <button
              type="button"
              onClick={() => {
                speakGuru(PASANGAN_LALU.suara);
                setBukaLalu(true);
              }}
              className={`min-h-[48px] w-full rounded-xl border-[3px] px-2 py-1 text-left text-xs font-black leading-tight ${bukaLalu ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#B45309] bg-white text-[#1C01A5]"}`}
            >
              {PASANGAN_LALU.teks}: penentunya di <span className="text-[#B45309]">{bukaLalu ? PASANGAN_LALU.penentu : "?"}</span>
            </button>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {status}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan urutan">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
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

export { InfoUrutanK5B1 };
