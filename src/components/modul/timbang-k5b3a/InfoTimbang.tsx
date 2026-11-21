"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  CONTOH_BIASA,
  KANTONG,
  KPK_INFO,
  MAKS_GARIS_INFO,
  PETUNJUK1_INFO_TIMBANG,
  PETUNJUK2_INFO_TIMBANG,
  SATUAN_INFO,
  SELESAI1_INFO_TIMBANG,
  SELESAI2_INFO_TIMBANG,
  pembilangKpk,
  posisiRuasInfo,
  suaraBiasa,
  suaraBulat,
  suaraCampuran,
  suaraGaris,
  suaraKpk,
  suaraPembilang,
  suaraSama,
  suaraTanda,
  suaraUbah,
  suaraUrutan,
  tandaInfo,
  tandaSama,
  urutanInfo,
} from "./data-kartu";
import { GarisBilangan, PecahanSvg, TeksPecahan } from "./GambarTimbang";
import { keBiasa, teksPec, tandaBanding } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = rak tiga kantong tepung berlabel pecahan (dua bulat tiga per empat, tiga bulat satu per dua, satu bulat tujuh per delapan kilogram): kotak istilah pecahan biasa dan campuran,
 * kotak bilangan bulat tiap kantong, dan kotak campuran diubah menjadi biasa. Kartu 2 = garis bilangan nol sampai empat (tiap satuan delapan bagian) tempat tiga kantong ditaruh, kotak KPK penyebut,
 * pembilang setelah disamakan, tiga kotak tanda (lebih besar, lebih kecil, sama dengan), dan kotak urutan. Tiap kotak kosong (?) berisi sampai diketuk lalu dibacakan Guru. Digital saja.
 */
const TOTAL1 = 2 + KANTONG.length * 2;
const TOTAL2 = KANTONG.length + 1 + KANTONG.length + 3 + 1;

function Rak() {
  return (
    <svg viewBox="0 0 300 104" className="block h-auto w-full rounded-xl" role="img" aria-label="Rak dengan tiga kantong tepung: dua bulat tiga per empat, tiga bulat satu per dua, dan satu bulat tujuh per delapan kilogram">
      <rect x={0} y={0} width={300} height={104} fill="#FFF1F2" />
      <rect x={6} y={78} width={288} height={7} rx={2} fill="#92400E" />
      <rect x={14} y={85} width={5} height={14} fill="#78350F" />
      <rect x={281} y={85} width={5} height={14} fill="#78350F" />
      {KANTONG.map((k, i) => {
        const x = 54 + i * 96;
        return (
          <g key={k.nama} data-kantong={i}>
            <path d={`M${x - 18} 40 L${x + 18} 40 L${x + 23} 56 L${x + 23} 72 Q${x + 23} 78 ${x + 17} 78 L${x - 17} 78 Q${x - 23} 78 ${x - 23} 72 L${x - 23} 56 Z`} fill="#FEF3C7" stroke="#92400E" strokeWidth={1.6} />
            <path d={`M${x - 12} 40 L${x - 15} 32 L${x + 15} 32 L${x + 12} 40`} fill="#FDE68A" stroke="#92400E" strokeWidth={1.3} />
            <line x1={x - 13} y1={40} x2={x + 13} y2={40} stroke="#B91C1C" strokeWidth={2} />
            <rect x={x - 23} y={46} width={46} height={31} rx={5} fill="#FFFFFF" stroke="#B45309" strokeWidth={1} />
            <PecahanSvg f={k.f} x={x} y={59} u={13} warna="#4C0519" />
            <text x={x} y={12} textAnchor="middle" fontSize={12.5} fontWeight={900} fill="#831843">
              kantong
            </text>
            <text x={x} y={26} textAnchor="middle" fontSize={12.5} fontWeight={900} fill="#831843">
              {k.nama}
            </text>
            <text x={x} y={97} textAnchor="middle" fontSize={12.5} fontWeight={800} fill="#78350F">
              {SATUAN_INFO}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function InfoTimbang({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const banyak1 = buka.filter((k) => k.startsWith("p-")).length;
  const banyak2 = buka.filter((k) => k.startsWith("t-")).length;
  const selesai1 = banyak1 === TOTAL1;
  const selesai2 = banyak2 === TOTAL2;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_TIMBANG : PETUNJUK2_INFO_TIMBANG;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const terbuka = (kunci: string) => buka.includes(kunci);

  const sel = (kunci: string, label: string, suara: string, atas: string, bawah: string, gaya = "") => {
    const buk = terbuka(kunci);
    return (
      <div key={kunci} className="min-w-0 space-y-0.5 text-center">
        <p className="text-[10px] font-black leading-tight text-[#4C0519]">{label}</p>
        <button
          type="button"
          onClick={() => ketuk(kunci, suara)}
          aria-label={buk ? `${label}: ${atas} ${bawah}` : `Kotak kosong ${label}`}
          data-isi={buk ? atas : ""}
          className={`flex min-h-[38px] w-full min-w-0 flex-col items-center justify-center rounded-lg border-[3px] px-0.5 leading-tight ${gaya} ${buk ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#9F1239] bg-white text-lg font-black text-[#9F1239]"}`}
        >
          {buk ? (
            <>
              <span className="text-[13px] font-black">
                <TeksPecahan t={atas} />
              </span>
              <span className="text-[10px] font-bold">{bawah}</span>
            </>
          ) : (
            "?"
          )}
        </button>
      </div>
    );
  };

  const titikGaris = KANTONG.map((_, i) => i)
    .filter((i) => terbuka(`t-g${i}`))
    .map((i) => ({ i: posisiRuasInfo(i), nama: String(i + 1) }));

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
        <div className="mx-auto w-full max-w-xl space-y-1.5 rounded-2xl border-[7px] border-[#BE185D] bg-[#FFF1F2] p-2 shadow-[0_5px_0_rgba(0,0,0,0.3)]" data-uji="rak-kantong">
          <p className="text-center text-xs font-black tracking-wide text-[#831843]">{"\u{1F35E}"} RAK TIGA KANTONG TEPUNG BU RATNA</p>
          <Rak />
          <div className="grid grid-cols-2 gap-1.5">
            {sel("p-bi", "pecahan biasa", suaraBiasa, teksPec(CONTOH_BIASA), "pembilang, penyebut")}
            {sel("p-ca", "pecahan campuran", suaraCampuran, teksPec(KANTONG[0].f), "bulat dan biasa")}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {KANTONG.map((k, i) => sel(`p-b${i}`, `bulat kantong ${i + 1}`, suaraBulat(i), String(k.f.w), i === 1 ? "terbesar" : i === 2 ? "terkecil" : "dibandingkan dulu"))}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {KANTONG.map((k, i) => sel(`p-u${i}`, `jadi biasa ${i + 1}`, suaraUbah(i), `${keBiasa(k.f).p}/${k.f.q}`, `${k.f.w}×${k.f.q}+${k.f.p}`))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl space-y-1 rounded-2xl border-[6px] border-[#9F1239] bg-[#FFF1F2] p-1.5 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="garis-kpk">
          <div className="mx-auto w-full max-w-[300px]">
          <GarisBilangan q={KPK_INFO} maks={MAKS_GARIS_INFO} rupa="benda" titik={titikGaris} label="Garis bilangan nol sampai empat, tiap satuan dibagi delapan bagian, tempat tiga kantong tepung ditaruh" />
          </div>
          <div className="grid grid-cols-3 gap-1">
            {KANTONG.map((k, i) => sel(`t-g${i}`, `kantong ${i + 1}`, suaraGaris(i), teksPec(k.f), `antara ${k.f.w} dan ${k.f.w + 1}`))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {sel("t-k", "KPK 4, 2, 8", suaraKpk, String(KPK_INFO), "penyebut baru")}
            {KANTONG.map((k, i) => sel(`t-s${i}`, `k${i + 1} per ${KPK_INFO}`, suaraPembilang(i), `${pembilangKpk(i)}/${KPK_INFO}`, `${keBiasa(k.f).p}/${k.f.q} ×${KPK_INFO / k.f.q}`))}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {sel("t-d1", "tanda besar", suaraTanda(1, 0), tandaInfo(1, 0), `${pembilangKpk(1)} ${tandaBanding(KANTONG[1].f, KANTONG[0].f)} ${pembilangKpk(0)}`)}
            {sel("t-d2", "tanda kecil", suaraTanda(2, 0), tandaInfo(2, 0), `${pembilangKpk(2)} ${tandaBanding(KANTONG[2].f, KANTONG[0].f)} ${pembilangKpk(0)}`)}
            {sel("t-sm", "tanda sama", suaraSama(1), tandaSama(1), "sama besar")}
          </div>
          {sel("t-ur", "urutan dari terkecil", suaraUrutan, urutanInfo(), "kiri ke kanan")}
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1
          ? selesai1
            ? SELESAI1_INFO_TIMBANG
            : `Sudah dibuka ${banyak1} dari ${TOTAL1} kotak.`
          : selesai2
            ? SELESAI2_INFO_TIMBANG
            : `Sudah dibuka ${banyak2} dari ${TOTAL2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke rak kantong">
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
      <p className="sr-only" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}
export { InfoTimbang };
