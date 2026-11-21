"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  BARIS_FPB,
  FAKTOR_KLEPON,
  FAKTOR_ONDE,
  FPB_KOTAK,
  ISI_KLEPON,
  ISI_ONDE,
  JUDUL_INFO_1,
  JUDUL_INFO_2,
  KLEPON,
  ONDE,
  PAPAN,
  PERTAMA_12_18,
  PETUNJUK_INFO_1,
  PETUNJUK_INFO_2,
  SAMA_KOTAK,
  SELESAI_INFO_1,
  SELESAI_INFO_2,
  SUARA_CATATAN,
  SUARA_DUA_BIJI,
  SUARA_FAKTOR_KLEPON,
  SUARA_FAKTOR_ONDE,
  SUARA_FPB_KOTAK,
  SUARA_KOTAK,
} from "./data-info";
import { daftarTeks, fpb } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (label kosong): DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = papan congklak kayu dengan 24 lubang bernomor (dua baris), biji merah di faktor 24 dan biji putih di faktor 18 digambar SUNGGUH dari data, lubang berisi dua biji berlingkar kuning, dan FPB bertanda hijau;
 * empat sel kosong "?" di bawahnya yang diketuk (faktor 24, faktor 18, lubang dua biji, FPB).
 * Kartu 2 = enam kotak bingkisan berisi klepon dan onde-onde (digambar sebanyak isinya) dan tabel FPB (8 dan 20, 12 dan 18, serta tiga bilangan 12, 18, 24) berlabel kosong, ditambah catatan
 * bahwa FPB bukan faktor persekutuan pertama setelah satu. Komponen sendiri: gambar dan tata letak mengikuti isi materi, tanpa PetaLabel dan InfoKartu.
 */
const MERAH = "#DC2626";
const MERAH_TUA = "#7F1D1D";
const KAYU = "#B7814A";
const KAYU_TUA = "#6B4423";

/** Papan congklak: 24 lubang dalam dua baris, biji sesuai bukaan sel. */
function PapanCongklak({ merah, putih, dua, besar }: { merah: boolean; putih: boolean; dua: boolean; besar: boolean }) {
  return (
    <svg viewBox="0 0 312 120" role="img" aria-label="Papan congklak dengan 24 lubang bernomor" className="h-auto w-full" data-uji="papan-congklak">
      <rect x={2} y={2} width={308} height={116} rx={14} fill={KAYU} stroke={KAYU_TUA} strokeWidth={3} />
      {PAPAN.map((l, i) => {
        const baris = i < 12 ? 0 : 1;
        const kol = i % 12;
        const cx = 16 + kol * 25.4;
        const cy = baris === 0 ? 30 : 86;
        const adaMerah = merah && l.a;
        const adaPutih = putih && l.b;
        const pas = adaMerah && adaPutih;
        return (
          <g key={l.nomor} data-lubang={l.nomor} data-biji={l.biji}>
            <circle cx={cx} cy={cy} r={10.5} fill="#78350F" stroke="#3F2A14" strokeWidth={1.5} />
            {adaMerah ? <circle cx={pas ? cx - 4.6 : cx} cy={cy} r={3.8} fill={MERAH} stroke={MERAH_TUA} strokeWidth={1} /> : null}
            {adaPutih ? <circle cx={pas ? cx + 4.6 : cx} cy={cy} r={3.8} fill="#FFFFFF" stroke="#64748B" strokeWidth={1} /> : null}
            {dua && l.biji === 2 ? <circle cx={cx} cy={cy} r={13.5} fill="none" stroke="#FACC15" strokeWidth={2.6} /> : null}
            {besar && l.nomor === FPB_KOTAK ? (
              <g>
                <circle cx={cx} cy={cy} r={15} fill="none" stroke="#22C55E" strokeWidth={3} />
                <text x={cx} y={cy - 18} fontSize={12.5} fontWeight={900} textAnchor="middle" fill="#FEF9C3">
                  FPB
                </text>
              </g>
            ) : null}
            <text x={cx} y={cy + 25} fontSize={12.5} fontWeight={800} textAnchor="middle" fill="#FEF3C7">
              {l.nomor}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Enam kotak bingkisan: tertutup berlabel "?" atau terbuka berisi klepon (merah) dan onde-onde (putih) sebanyak isinya. */
function RakKotak({ buka, onKetuk }: { buka: boolean; onKetuk: () => void }) {
  return (
    <button type="button" onClick={onKetuk} aria-label={buka ? `${FPB_KOTAK} kotak, tiap kotak berisi ${ISI_KLEPON} klepon dan ${ISI_ONDE} onde-onde` : "Kotak bingkisan tertutup: ketuk untuk membuka"} className="block w-full" data-uji="rak-kotak">
      <svg viewBox="0 0 312 90" className="h-auto w-full">
        {Array.from({ length: FPB_KOTAK }, (_, i) => {
          const x = 4 + i * 52;
          return (
            <g key={i} data-kotak={i}>
              <rect x={x} y={10} width={46} height={76} rx={4} fill={buka ? "#FEF3C7" : "#FFFFFF"} stroke="#92400E" strokeWidth={2} strokeDasharray={buka ? undefined : "5 3"} />
              {buka ? (
                <g>
                  <rect x={x} y={10} width={46} height={11} rx={3} fill={MERAH} stroke={MERAH_TUA} strokeWidth={1.4} />
                  {Array.from({ length: ISI_KLEPON }, (_m, q) => (
                    <circle key={`m${q}`} cx={x + 14 + (q % 2) * 18} cy={36 + Math.floor(q / 2) * 15} r={5.5} fill={MERAH} stroke={MERAH_TUA} strokeWidth={1.2} />
                  ))}
                  {Array.from({ length: ISI_ONDE }, (_m, q) => (
                    <circle key={`p${q}`} cx={x + 9 + q * 14} cy={72} r={5.5} fill="#FFFFFF" stroke="#475569" strokeWidth={1.3} />
                  ))}
                </g>
              ) : (
                <text x={x + 23} y={56} fontSize={22} fontWeight={900} textAnchor="middle" fill="#B45309">
                  ?
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </button>
  );
}

/** Tombol sel kosong "?" yang menampilkan isinya setelah diketuk. */
function Tanya({ buka, isi, onKetuk, nama }: { buka: boolean; isi: React.ReactNode; onKetuk: () => void; nama: string }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={buka ? nama : `Sel kosong: ${nama}`}
      className={`min-h-[36px] w-full rounded-lg border-2 px-1 text-center text-sm font-black leading-tight ${buka ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#B45309] bg-white text-lg text-[#B45309]"}`}
    >
      {buka ? isi : "?"}
    </button>
  );
}

const teksSel = "text-[11px] font-black leading-tight text-[#78350F]";
const sebut = (xs: number[]): string => daftarTeks(xs);

export default function InfoKotak({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [merah, setMerah] = useState(false);
  const [putih, setPutih] = useState(false);
  const [dua, setDua] = useState(false);
  const [besar, setBesar] = useState(false);
  const [kotak, setKotak] = useState(false);
  const [sama, setSama] = useState<number[]>([]);
  const [fpbBuka, setFpbBuka] = useState<number[]>([]);
  const [catatan, setCatatan] = useState(false);

  const total1 = 4;
  const buka1 = [merah, putih, dua, besar].filter(Boolean).length;
  const total2 = 1 + BARIS_FPB.length * 2 + 1;
  const buka2 = (kotak ? 1 : 0) + sama.length + fpbBuka.length + (catatan ? 1 : 0);
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === total2;
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const status = kartu === 1 ? (selesai1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${total1} tanda tanya.`) : selesai2 ? SELESAI_INFO_2 : `Sudah dibuka ${buka2} dari ${total2} tanda tanya.`;

  const bukaDan = (set: (b: boolean) => void, suara: string) => {
    speakGuru(suara);
    set(true);
  };
  const tambahIndeks = (daftar: number[], set: (b: number[]) => void, i: number, suara: string) => {
    speakGuru(suara);
    if (!daftar.includes(i)) set([...daftar, i]);
  };

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
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#92400E] bg-[#FFFBEB] p-2 shadow-[0_5px_0_rgba(107,68,35,0.35)]" data-uji="kartu-congklak">
          <p className="mb-1.5 rounded-md bg-[#7F1D1D] py-0.5 text-center text-sm font-black text-[#FEF3C7]">
            {"\u{1F3B2}"} {JUDUL_INFO_1}
          </p>
          <PapanCongklak merah={merah} putih={putih} dua={dua} besar={besar} />
          <div className="mt-1.5 space-y-1">
            <div className="grid items-center gap-1" style={{ gridTemplateColumns: "84px minmax(0, 1fr)" }} data-baris="merah">
              <span className={teksSel}>Biji merah: faktor {KLEPON}</span>
              <Tanya buka={merah} isi={sebut(FAKTOR_KLEPON)} onKetuk={() => bukaDan(setMerah, SUARA_FAKTOR_KLEPON)} nama={`faktor ${KLEPON}`} />
            </div>
            <div className="grid items-center gap-1" style={{ gridTemplateColumns: "84px minmax(0, 1fr)" }} data-baris="putih">
              <span className={teksSel}>Biji putih: faktor {ONDE}</span>
              <Tanya buka={putih} isi={sebut(FAKTOR_ONDE)} onKetuk={() => bukaDan(setPutih, SUARA_FAKTOR_ONDE)} nama={`faktor ${ONDE}`} />
            </div>
            <div className="grid items-center gap-1" style={{ gridTemplateColumns: "84px minmax(0, 1fr)" }} data-baris="dua">
              <span className={teksSel}>Lubang dua biji</span>
              <Tanya buka={dua} isi={sebut(SAMA_KOTAK)} onKetuk={() => bukaDan(setDua, SUARA_DUA_BIJI)} nama="faktor persekutuan" />
            </div>
            <div className="grid items-center gap-1" style={{ gridTemplateColumns: "84px minmax(0, 1fr)" }} data-baris="fpb">
              <span className={teksSel}>Yang terbesar: FPB</span>
              <Tanya buka={besar} isi={String(fpb([KLEPON, ONDE]))} onKetuk={() => bukaDan(setBesar, SUARA_FPB_KOTAK)} nama="FPB" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-dashed border-[#92400E] bg-[#FDF6E3] p-2 shadow-[0_5px_0_rgba(107,68,35,0.35)]" data-uji="kartu-kotak">
          <p className="mb-1.5 rounded-md bg-[#7F1D1D] py-0.5 text-center text-sm font-black text-[#FEF3C7]">
            {"\u{1F381}"} {JUDUL_INFO_2}
          </p>
          <RakKotak buka={kotak} onKetuk={() => bukaDan(setKotak, SUARA_KOTAK)} />
          <p className="min-h-[2.2rem] text-center text-[11px] font-black leading-tight text-[#78350F]">
            {kotak ? `${FPB_KOTAK} kotak: ${KLEPON} : ${FPB_KOTAK} = ${ISI_KLEPON} klepon dan ${ONDE} : ${FPB_KOTAK} = ${ISI_ONDE} onde-onde tiap kotak` : `${KLEPON} klepon dan ${ONDE} onde-onde dibagi sama rata ke kotak sebanyak-banyaknya`}
          </p>
          <div className="mt-1 grid items-end gap-1" style={{ gridTemplateColumns: "76px minmax(0, 1fr) 52px" }}>
            <span className={teksSel}>Bilangan</span>
            <span className={`${teksSel} text-center`}>Faktor persekutuan</span>
            <span className={`${teksSel} text-center`}>FPB</span>
          </div>
          <div className="mt-0.5 space-y-1">
            {BARIS_FPB.map((b, i) => (
              <div key={b.teks} className="grid items-center gap-1" style={{ gridTemplateColumns: "76px minmax(0, 1fr) 52px" }} data-baris={b.teks}>
                <span className="text-xs font-black leading-tight text-[#1C01A5]">{b.teks}</span>
                <Tanya buka={sama.includes(i)} isi={sebut(b.sama)} onKetuk={() => tambahIndeks(sama, setSama, i, b.suaraSama)} nama={`faktor persekutuan ${b.teks}`} />
                <Tanya buka={fpbBuka.includes(i)} isi={String(b.fpb)} onKetuk={() => tambahIndeks(fpbBuka, setFpbBuka, i, b.suaraFpb)} nama={`FPB ${b.teks}`} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 grid items-center gap-1" style={{ gridTemplateColumns: "76px minmax(0, 1fr)" }} data-baris="catatan">
            <span className={teksSel}>Hati-hati</span>
            <Tanya
              buka={catatan}
              isi={<span className="block px-1 text-[11px] leading-tight">Pada 12 dan 18, yang pertama setelah 1 adalah {PERTAMA_12_18}, tetapi FPB-nya {fpb([12, 18])}, yang terbesar</span>}
              onKetuk={() => bukaDan(setCatatan, SUARA_CATATAN)}
              nama="FPB bukan faktor persekutuan pertama"
            />
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {status}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke kartu pertama">
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

export { InfoKotak };
