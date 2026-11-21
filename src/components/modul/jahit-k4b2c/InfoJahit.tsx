"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { KANTONG, PETUNJUK_INFO_1, PETUNJUK_INFO_2, POTONGAN, SELESAI_INFO_1, SELESAI_INFO_2, type Sel } from "./data-info";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar": dua kartu, tiap kartu satu layar tanpa gulir, dari potongan kain dan angka Story.
 * Kartu 1 "Deret potongan": lima potongan kain tergantung berdampingan di tali jemuran, digambar sebanyak bagiannya, dengan garis setengah yang sama tinggi di semua potongan;
 * dua isian tertutup di bawah tiap potongan (pecahan dan caranya) diketuk, muncul dan dibacakan.
 * Kartu 2 "Kotak jahit": lima kantong aturan, label terlihat, isi tertutup. Digital saja.
 */
const BIRU = "#1C01A5";
const MAWAR = "#BE185D";
const MERAH = "#DC2626";

/** Pecahan bertingkat HTML (pembilang, garis, penyebut). */
function Tingkat({ p, q }: { p: number; q: number }) {
  return (
    <span className="inline-flex flex-col items-center text-[15px] font-black leading-none" aria-hidden="true">
      <span>{p}</span>
      <span className="my-[3px] h-[2px] w-full min-w-[1.4rem] bg-current" />
      <span>{q}</span>
    </span>
  );
}

function Rahasia({ terbuka, sel, aria, tutup, onKetuk }: { terbuka: boolean; sel: Sel; aria: string; tutup: string; onKetuk: () => void }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={terbuka ? aria : tutup}
      className={`flex min-h-[44px] w-full items-center justify-center rounded-lg border-[3px] px-0.5 py-0.5 text-center text-[13px] font-black leading-tight ${terbuka ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#15803D]" : "border-dashed border-[#9D174D] bg-white/80 text-lg text-[#9D174D]"}`}
    >
      {terbuka ? sel.pec ? <Tingkat p={sel.pec[0]} q={sel.pec[1]} /> : sel.t : "?"}
    </button>
  );
}

/** Satu potongan kain tergantung: n bagian sama besar dari atas, k bagian diarsir; garis putus-putus di setengah tinggi. */
function KainGantung({ n, k, salah }: { n: number; k: number; salah: boolean }) {
  const y0 = 12;
  const t = 104;
  return (
    <svg viewBox="0 0 52 126" className="mx-auto w-full max-w-[56px]" role="img" aria-label={`potongan kain ${n} bagian, ${k} bagian diarsir`} data-kain={`${k}/${n}`}>
      <circle cx={26} cy={6} r={5} fill="#F59E0B" stroke="#92400E" strokeWidth={1.5} />
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={11} y={y0 + (i * t) / n} width={30} height={t / n} fill={i < k ? (salah ? "#F9A8D4" : MAWAR) : "#FFFFFF"} stroke={BIRU} strokeWidth={1.3} data-arsir={i < k ? 1 : 0} />
      ))}
      <line x1={0} y1={y0 + t / 2} x2={52} y2={y0 + t / 2} stroke={MERAH} strokeWidth={2} strokeDasharray="4 3" />
    </svg>
  );
}

/** Dua potongan kecil sejajar (Cocokkan Daerah): n bagian sama besar, k diarsir; garis putus-putus di ujung arsiran. */
function DuaPotongan({ potong }: { potong: { n: number; k: number }[] }) {
  const w = 104;
  return (
    <svg viewBox="0 0 120 38" className="mx-auto w-full max-w-[130px]" role="img" aria-label="dua potongan kain dengan arsiran sama panjang" data-dua="1">
      {potong.map((s, j) => (
        <g key={s.n} data-kain={`${s.k}/${s.n}`}>
          {Array.from({ length: s.n }, (_, i) => (
            <rect key={i} x={8 + (i * w) / s.n} y={3 + j * 18} width={w / s.n} height={15} fill={i < s.k ? MAWAR : "#FFFFFF"} stroke={BIRU} strokeWidth={1.3} data-arsir={i < s.k ? 1 : 0} />
          ))}
        </g>
      ))}
      <line x1={8 + (w * potong[0].k) / potong[0].n} y1={0} x2={8 + (w * potong[0].k) / potong[0].n} y2={38} stroke={MERAH} strokeWidth={2} strokeDasharray="4 3" />
    </svg>
  );
}

export default function InfoJahitK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = POTONGAN.length * 2;
  const total2 = KANTONG.length;
  const buka1 = buka.filter((k) => k.startsWith("p")).length;
  const buka2 = buka.filter((k) => k.startsWith("k")).length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((x) => [...x, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const selesai = kartu === 1 ? buka1 === total1 : buka2 === total2;
  return (
    <div className="space-y-1.5">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-center gap-1.5 rounded-xl border-[3px] border-[#1C01A5] bg-[#FFF7CC] p-1.5">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-[13px] font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#9D174D] bg-[#FDF2F8] p-1.5 shadow-[0_4px_0_rgba(0,0,0,0.25)]" data-uji="deret-potongan">
          <div className="mb-1 h-[6px] rounded-full bg-[#92400E]" aria-hidden="true" data-tali="1" />
          <div className="grid grid-cols-5 gap-1">
            {POTONGAN.map((pt, i) => (
              <div key={pt.id} className={`flex flex-col gap-1 rounded-xl border-2 p-0.5 ${pt.salah ? "border-[#DC2626] bg-[#FEF2F2]" : "border-[#F9A8D4] bg-white/80"}`}>
                <KainGantung n={pt.q} k={pt.p} salah={pt.salah} />
                {pt.sel.map((s, j) => {
                  const kunci = `p${i}-${j}`;
                  return <Rahasia key={kunci} terbuka={buka.includes(kunci)} sel={s} aria={`${pt.nama}: ${s.suara}`} tutup={`${j === 0 ? "Pecahan" : "Cara"} potongan ${pt.nama}, belum dibuka`} onKetuk={() => ketuk(kunci, s.suara)} />;
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#92400E] bg-[#FFF8E7] p-1.5 shadow-[0_4px_0_rgba(0,0,0,0.25)]" data-uji="kotak-jahit">
          <div className="grid grid-cols-2 gap-1.5">
            {KANTONG.map((kt, i) => {
              const kunci = `k${i}`;
              const sel: Sel = { t: kt.isi, suara: kt.suara };
              return (
                <div key={kt.id} className={`space-y-0.5 rounded-xl border-2 border-[#E8C48F] bg-white/85 p-1 ${i === KANTONG.length - 1 ? "col-span-2" : ""}`}>
                  <p className="flex items-center justify-center gap-1 text-[13px] font-black leading-tight text-[#92400E]">
                    <span aria-hidden="true">{kt.ikon}</span>
                    {kt.label}
                  </p>
                  <div className="flex min-h-[40px] items-center justify-center text-[#1C01A5]">
                    {kt.gambar ? <DuaPotongan potong={kt.gambar} /> : kt.lihat ? <Tingkat p={kt.lihat[0]} q={kt.lihat[1]} /> : null}
                  </div>
                  <Rahasia terbuka={buka.includes(kunci)} sel={sel} aria={`${kt.label}: ${kt.suara}`} tutup={`Aturan kantong ${kt.label}, belum dibuka`} onKetuk={() => ketuk(kunci, kt.suara)} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (buka1 === total1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : buka2 === total2 ? SELESAI_INFO_2 : `Sudah dibuka ${buka2} dari ${total2} kantong.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke deret potongan">
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
    </div>
  );
}

export { InfoJahitK4B2 };
