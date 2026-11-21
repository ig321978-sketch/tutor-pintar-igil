"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { Pec } from "../lipat-k4b2a/Pec";
import { TangkiBak } from "./TangkiBak";
import { ATURAN_WARNA, BAK_PASANG, BAK_URUT, LAPIS_BAK, PETUNJUK1_INFO_WARNA, PETUNJUK2_INFO_WARNA, SELESAI1_INFO_WARNA, SELESAI2_INFO_WARNA, SUARA_TANDA_PASANG, SUARA_URUT, suaraBak } from "./data-kartu";

/**
 * Infografis Kelas 4 Bab 2 Sub-Bab B (dirancang sendiri, dua kartu, tiap kartu satu layar tanpa gulir): data dari Story.
 * Kartu 1 = papan takaran Pak Joyo: bak biru (tiga per delapan) dan bak merah (enam per delapan) dengan kotak tanda di antaranya,
 * lalu tiga bak (dua, lima, tujuh per delapan) dengan kotak urutan; bak digambar sungguh delapan lapis, pecahan dan tanda kosong sampai diketuk.
 * Kartu 2 = kartu aturan Pak Joyo: bak biru dan bak merah berdiri mengapit tiga aturan (penyebut sama, banding pembilang, tanda banding), lalu garis pecahan dengan aturannya; aturan kosong sampai diketuk. Digital saja.
 */
const LEBAR_GARIS = 112;
function GarisMini() {
  const x = (k: number) => 8 + ((LEBAR_GARIS - 16) * k) / LAPIS_BAK;
  return (
    <svg width={LEBAR_GARIS} height={40} viewBox={`0 0 ${LEBAR_GARIS} 40`} role="img" aria-label="Garis pecahan dari nol sampai satu dibagi delapan, panah ke kanan menunjuk yang lebih besar" data-garis={1}>
      <line x1={8} y1={14} x2={LEBAR_GARIS - 8} y2={14} stroke="#334155" strokeWidth={3} strokeLinecap="round" />
      {Array.from({ length: LAPIS_BAK + 1 }, (_, k) => (
        <line key={k} x1={x(k)} y1={9} x2={x(k)} y2={19} stroke="#334155" strokeWidth={2} />
      ))}
      <text x={8} y={36} textAnchor="middle" fontSize={12} fontWeight={900} fill="#0F172A">
        0
      </text>
      <text x={LEBAR_GARIS - 8} y={36} textAnchor="middle" fontSize={12} fontWeight={900} fill="#0F172A">
        1
      </text>
      <text x={LEBAR_GARIS / 2} y={36} textAnchor="middle" fontSize={14} fontWeight={900} fill="#DC2626">
        {"➡"}
      </text>
    </svg>
  );
}

export default function DaftarWarnaK4B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [buka, setBuka] = useState<string[]>([]);
  const total1 = BAK_PASANG.length + 1 + BAK_URUT.length + 1;
  const buka1 = buka.filter((k) => k.startsWith("b-") || k.startsWith("u-") || k === "tanda" || k === "urutan").length;
  const buka2 = buka.filter((k) => k.startsWith("a-")).length;
  const selesai1 = buka1 === total1;
  const selesai2 = buka2 === ATURAN_WARNA.length;
  const ketuk = (kunci: string, suara: string) => {
    speakGuru(suara);
    if (!buka.includes(kunci)) setBuka((b) => [...b, kunci]);
  };
  const petunjuk = kartu === 1 ? PETUNJUK1_INFO_WARNA : PETUNJUK2_INFO_WARNA;

  const kotak = (kunci: string, suara: string, isi: React.ReactNode, aria: string, tinggi = "min-h-[40px]") => {
    const t = buka.includes(kunci);
    return (
      <button
        key={kunci}
        type="button"
        onClick={() => ketuk(kunci, suara)}
        aria-label={t ? aria : `Isi kosong: ${aria.split(":")[0]}`}
        className={`flex ${tinggi} w-full items-center justify-center rounded-lg border-[3px] px-1 text-center text-xs font-black leading-tight ${t ? "lm-muncul border-[#15803D] bg-[#ECFDF5] text-[#1C01A5]" : "border-dashed border-[#B45309] bg-white/80 text-lg text-[#B45309]"}`}
      >
        {t ? isi : "?"}
      </button>
    );
  };

  const aturanKotak = (kunci: string) => {
    const a = ATURAN_WARNA.find((x) => x.kunci === kunci)!;
    return (
      <div key={a.kunci}>
        <p className="text-center text-xs font-black leading-none text-[#7C2D12]">{a.sebut}</p>
        {kotak(`a-${a.kunci}`, a.suara, a.isi, `${a.sebut}: ${a.isi}`, "min-h-[38px]")}
      </div>
    );
  };

  const kolomBak = (b: (typeof BAK_PASANG)[number], awal: "b" | "u") => (
    <div key={b.kunci} className="flex flex-col items-center gap-1">
      <TangkiBak isi={b.isi} warna={b.warna} lebar={44} lapisTinggi={7} nama={b.nama} />
      {kotak(`${awal}-${b.kunci}`, suaraBak(b), <Pec p={b.isi} q={LAPIS_BAK} />, `Pecahan ${b.nama}: ${b.isi} per ${LAPIS_BAK}`)}
    </div>
  );

  return (
    <div className="space-y-2" data-uji="info-papan-takaran">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#1E293B] bg-[#F1F5F9] p-2 shadow-[0_5px_0_rgba(30,41,59,0.4)]" data-uji="papan-takaran">
          {/* dua bak dibandingkan */}
          <div className="grid grid-cols-[1fr_1.1fr_1fr] items-end gap-1.5 rounded-lg bg-white p-1.5">
            {kolomBak(BAK_PASANG[0], "b")}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-black text-[#1E293B]">{"⬅ banding ➡"}</span>
              {kotak("tanda", SUARA_TANDA_PASANG, <span className="inline-flex items-center gap-0.5">
                <Pec p={BAK_PASANG[0].isi} q={LAPIS_BAK} />
                <span aria-hidden="true" className="text-base">{"<"}</span>
                <Pec p={BAK_PASANG[1].isi} q={LAPIS_BAK} />
              </span>, `Tanda: ${BAK_PASANG[0].isi} per ${LAPIS_BAK} kurang dari ${BAK_PASANG[1].isi} per ${LAPIS_BAK}`, "min-h-[56px]")}
            </div>
            {kolomBak(BAK_PASANG[1], "b")}
          </div>
          {/* tiga bak diurutkan */}
          <div className="mt-1.5 rounded-lg bg-white p-1.5">
            <div className="grid grid-cols-3 items-end gap-1.5">
              {BAK_URUT.map((b) => kolomBak(b, "u"))}
            </div>
            <div className="mt-1">{kotak("urutan", SUARA_URUT, <span className="text-xs">{"urut naik: "}{BAK_URUT.map((b, i) => (<React.Fragment key={b.kunci}>{i > 0 ? " < " : ""}<Pec p={b.isi} q={LAPIS_BAK} /></React.Fragment>))}</span>, "Urutan: dua, lima, tujuh per delapan")}</div>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#9A3412] bg-[#FFF7ED] p-2 shadow-[0_5px_0_rgba(154,52,18,0.35)]" data-uji="kartu-aturan-warna">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-lg bg-white p-1.5">
            <TangkiBak isi={BAK_PASANG[0].isi} warna={BAK_PASANG[0].warna} lebar={40} lapisTinggi={9} nama={BAK_PASANG[0].nama} />
            <div className="space-y-1">
              {["sama", "bilang", "tanda"].map((k) => aturanKotak(k))}
            </div>
            <TangkiBak isi={BAK_PASANG[1].isi} warna={BAK_PASANG[1].warna} lebar={40} lapisTinggi={9} nama={BAK_PASANG[1].nama} />
          </div>
          <div className="mt-1.5 grid grid-cols-[7rem_1fr] items-center gap-2 rounded-lg bg-white p-1.5">
            <div className="flex flex-col items-center">
              <GarisMini />
            </div>
            {aturanKotak("garis")}
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {kartu === 1 ? (selesai1 ? SELESAI1_INFO_WARNA : `Sudah dibuka ${buka1} dari ${total1} kotak.`) : selesai2 ? SELESAI2_INFO_WARNA : `Sudah dibuka ${buka2} dari ${ATURAN_WARNA.length} kotak.`}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke papan takaran">
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
    </div>
  );
}
export { DaftarWarnaK4B2 };
