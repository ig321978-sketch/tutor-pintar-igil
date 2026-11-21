"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  B_BAKSO,
  B_WEDANG,
  KOLOM_INFO,
  KOTAK_CEK,
  KOTAK_WARNA,
  PETUNJUK1_INFO_LONCENG,
  PETUNJUK2_INFO_LONCENG,
  SAMPAI_INFO,
  SATUAN_INFO,
  SELESAI1_INFO_LONCENG,
  SELESAI2_INFO_LONCENG,
  banyakWarna,
  kelipatanBakso,
  kelipatanWedang,
  selInfo,
  suaraBunyi,
  suaraCek,
  suaraNol,
  suaraWarna,
} from "./data-kartu";
import { adalahKelipatan, hasilBagi, sisaBagi } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (komponen milik Sub-Bab ini): dua kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = pita jadwal lonceng di papan kayu: dua pita (lonceng wedang tiap empat menit dengan sembilan kotak, lonceng bakso tiap enam menit dengan enam kotak) dan kotak nol;
 * tiap kotak kosong (?) memuat kelipatan dan asalnya (bilangan bulat dikali jaraknya) sampai diketuk lalu dibacakan Guru. Kartu 2 = tabel bilangan satu sampai tiga puluh enam (enam kolom)
 * yang diwarnai lewat dua kotak warna (kelipatan empat, kelipatan enam) dan diperiksa lewat tiga kotak cek dengan pembagian. Digital saja.
 */
const TOTAL1 = kelipatanWedang.length + kelipatanBakso.length + 1;
const TOTAL2 = KOTAK_WARNA.length + KOTAK_CEK.length;

export default function InfoLonceng({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [buka, setBuka] = useState<string[]>([]);
  const [kartu, setKartu] = useState<1 | 2>(1);
  const banyak1 = buka.filter((k) => k.startsWith("p-")).length;
  const banyak2 = buka.filter((k) => k.startsWith("t-")).length;
  const selesai1 = banyak1 === TOTAL1;
  const selesai2 = banyak2 === TOTAL2;
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_LONCENG : PETUNJUK2_INFO_LONCENG;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const terbuka = (kunci: string) => buka.includes(kunci);

  const pita = (b: number, daftar: number[], awalan: string, nama: string) => (
    <div className="space-y-0.5">
      <p className="text-[11px] font-black leading-tight text-[#7C2D12]">
        {nama} · tiap {b} {SATUAN_INFO}
      </p>
      <div className="grid grid-cols-9 gap-[3px]" data-pita={b}>
        {daftar.map((n, j) => {
          const i = j + 1;
          const kunci = `${awalan}-${i}`;
          const buk = terbuka(kunci);
          return (
            <button
              key={kunci}
              type="button"
              onClick={() => ketuk(kunci, suaraBunyi(b, i))}
              aria-label={buk ? `Bunyi ke ${i}: ${n} ${SATUAN_INFO}` : `Kotak kosong bunyi ke ${i}`}
              data-kelipatan={buk ? n : ""}
              className={`flex min-h-[46px] min-w-0 flex-col items-center justify-center rounded-md border-2 px-0 leading-none ${buk ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#B45309] bg-white text-lg font-black text-[#B45309]"}`}
            >
              {buk ? (
                <>
                  <span className="text-[13px] font-black">{n}</span>
                  <span className="mt-0.5 text-[10px] font-bold">{`${i}×${b}`}</span>
                </>
              ) : (
                "?"
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const warnaSel = (n: number): React.CSSProperties => {
    const a = terbuka("t-w4") && adalahKelipatan(n, B_WEDANG);
    const c = terbuka("t-w6") && adalahKelipatan(n, B_BAKSO);
    if (a && c) return { backgroundImage: "linear-gradient(135deg,#FDBA74 50%,#7DD3FC 50%)", borderColor: "#7C2D12" };
    if (a) return { backgroundColor: "#FDBA74", borderColor: "#C2410C" };
    if (c) return { backgroundColor: "#7DD3FC", borderColor: "#0369A1" };
    return { backgroundColor: "#FFFFFF", borderColor: "#CBD5E1" };
  };
  const kotak = (kunci: string, label: string, suara: string, atas: string, bawah: string) => {
    const buk = terbuka(kunci);
    return (
      <div key={kunci} className="min-w-0 space-y-0.5 text-center">
        <p className="text-[10px] font-black leading-tight text-[#1E1B4B]">{label}</p>
        <button
          type="button"
          onClick={() => ketuk(kunci, suara)}
          aria-label={buk ? `${label}: ${atas} ${bawah}` : `Kotak kosong ${label}`}
          className={`flex min-h-[46px] w-full min-w-0 flex-col items-center justify-center rounded-lg border-[3px] px-0.5 leading-tight ${buk ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#4338CA] bg-white text-lg font-black text-[#4338CA]"}`}
        >
          {buk ? (
            <>
              <span className="text-[14px] font-black">{atas}</span>
              <span className="text-[10px] font-bold">{bawah}</span>
            </>
          ) : (
            "?"
          )}
        </button>
      </div>
    );
  };

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
        <div className="mx-auto w-full max-w-xl space-y-2 rounded-2xl border-[7px] border-[#92400E] bg-[#FEF3C7] p-2 shadow-[0_5px_0_rgba(0,0,0,0.3)]" data-uji="pita-jadwal">
          <p className="text-center text-xs font-black tracking-wide text-[#7C2D12]">{"\u{1F514}"} PITA JADWAL LONCENG PASAR · nol tidak ikut</p>
          {pita(B_WEDANG, kelipatanWedang, "p-w", "Wedang Bu Marni")}
          {pita(B_BAKSO, kelipatanBakso, "p-b", "Bakso Pak Tarno")}
          <div className="space-y-0.5">
            <p className="text-[11px] font-black leading-tight text-[#7C2D12]">Nol: ikut daftar atau tidak?</p>
            <button
              type="button"
              onClick={() => ketuk("p-n", suaraNol)}
              aria-label={terbuka("p-n") ? "Nol bukan kelipatan empat" : "Kotak kosong nol"}
              data-nol={terbuka("p-n") ? "1" : ""}
              className={`flex min-h-[46px] w-full items-center justify-center rounded-md border-2 px-1 text-center leading-tight ${terbuka("p-n") ? "lm-muncul border-[#B91C1C] bg-[#FEE2E2] text-[#7F1D1D]" : "border-dashed border-[#B45309] bg-white text-lg font-black text-[#B45309]"}`}
            >
              {terbuka("p-n") ? <span className="text-[13px] font-black">{"0×4 = 0 → bukan kelipatan"}</span> : "?"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl space-y-2 rounded-2xl border-[6px] border-[#4338CA] bg-[#EEF2FF] p-2 shadow-[0_5px_0_rgba(0,0,0,0.25)]" data-uji="tabel-berwarna">
          <p className="text-center text-xs font-black tracking-wide text-[#312E81]">TABEL BILANGAN 1 SAMPAI {SAMPAI_INFO}</p>
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${KOLOM_INFO}, minmax(0, 1fr))` }} data-tabel="bilangan">
            {selInfo.map((n) => (
              <span key={n} data-bilangan={n} className="flex h-7 items-center justify-center rounded-md border-2 text-[13px] font-black text-[#1E1B4B]" style={warnaSel(n)}>
                {n}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {KOTAK_WARNA.map((w) => kotak(`t-${w.kunci}`, w.label, suaraWarna(w.b), String(banyakWarna(w.b)), "bilangan"))}
            {KOTAK_CEK.map((c) => kotak(`t-${c.kunci}`, `${c.n} : ${c.b}`, suaraCek(c.n, c.b), String(hasilBagi(c.n, c.b)), sisaBagi(c.n, c.b) === 0 ? "habis" : `sisa ${sisaBagi(c.n, c.b)}`))}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1
          ? selesai1
            ? SELESAI1_INFO_LONCENG
            : `Sudah dibuka ${banyak1} dari ${TOTAL1} kotak.`
          : selesai2
            ? SELESAI2_INFO_LONCENG
            : `Sudah dibuka ${banyak2} dari ${TOTAL2} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke pita jadwal">
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
export { InfoLonceng };
