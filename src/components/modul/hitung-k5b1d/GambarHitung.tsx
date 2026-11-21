"use client";

import React from "react";
import { RENCANA, barisKartu, dasarDari, judulKartu, ketGambar, modelPapan, type Cara, type Langkah, type LangkahDasar, type Rupa, type Tanda } from "./logika-cpa";
import { angkaKolom, fmt, panjangBilangan } from "./logika-data";

/**
 * Gambar tugas CPA Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo": papan hitung stadion beremoji lama (Concrete: kartu bernada stadion, satu kartu mewakili satu di kolomnya),
 * kolom hitung dan garis bilangan polos tanpa emoji (Pictorial), dan kartu kata dan angka bercap panitia tanpa gambar (Abstract).
 * Semua gambar dihitung dari logika murni (logika-data.ts dan logika-cpa.ts). Tanpa skor dan tanpa jaringan.
 */

/** Kartu stadion untuk Concrete: satu kartu mewakili satu di kolomnya (satuan sampai puluh ribuan). Emoji lama, tanpa ZWJ. */
export const KARTU_KOLOM = ["\u{1F3AB}", "\u{1F9E2}", "\u{1F6A9}", "\u{26BD}", "\u{1F3C6}"];

export type BarisTampil = {
  label: string;
  angka: number | null;
  tanda: Tanda;
  /** Isi sel per kolom (indeks 0 = satuan) yang menggantikan angka: teks, atau null untuk sel kosong. */
  sel?: (string | null)[];
  /** Baris kecil di atas (simpanan atau pinjaman). */
  kecil?: boolean;
  /** Garis tebal di atas baris (garis hasil). */
  garisAtas?: boolean;
  /** Sel yang diberi warna lain (mis. angka yang berubah karena pinjaman). */
  tandai?: number[];
};

const WARNA = {
  benda: { garis: "#92400E", latar: "#FEF3C7", sel: "#FFFBEB", sumbu: "#78350F", sorot: "#FDE68A" },
  diagram: { garis: "#1D4ED8", latar: "#EFF6FF", sel: "#FFFFFF", sumbu: "#1E3A8A", sorot: "#BFDBFE" },
} as const;
const JUDUL_KOLOM: [string, string][] = [
  ["", "satuan"],
  ["", "puluhan"],
  ["", "ratusan"],
  ["", "ribuan"],
  ["puluh", "ribuan"],
];

/** Isi satu sel angka untuk satu baris. Baris `angka: null` tanpa `sel` tampil "?". */
function isiSel(b: BarisTampil, k: number): string | null {
  if (b.sel) return b.sel[k] ?? null;
  if (b.angka === null) return "?";
  return k < panjangBilangan(b.angka) ? String(angkaKolom(b.angka, k)) : null;
}

/** Papan kolom hitung: satu kolom tempat per angka, sorotan kolom, dan (Concrete) kartu stadion sebanyak angkanya. */
export function PapanKolom({ baris, sorot = [], rupa }: { baris: BarisTampil[]; sorot?: number[]; rupa: "benda" | "diagram" }) {
  const w = WARNA[rupa];
  const urut = [4, 3, 2, 1, 0];
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border-[3px] p-1" style={{ borderColor: w.garis, background: w.latar }} role="table" aria-label="papan kolom hitung" data-uji="papan-kolom" data-rupa={rupa}>
      <div className="grid items-end gap-1" style={{ gridTemplateColumns: "68px repeat(5, minmax(0, 1fr))" }} role="row">
        <span aria-hidden="true" />
        {urut.map((k) => (
          <span key={k} role="columnheader" className="text-center text-[10px] font-black leading-[11px]" style={{ color: w.sumbu }}>
            {JUDUL_KOLOM[k][0] ? (
              <>
                {JUDUL_KOLOM[k][0]}
                <br />
              </>
            ) : null}
            {JUDUL_KOLOM[k][1]}
          </span>
        ))}
      </div>
      {baris.map((b, i) => (
        <div key={`${i}${b.label}`} role="row" className="mt-px grid items-center gap-1" style={{ gridTemplateColumns: "68px repeat(5, minmax(0, 1fr))", borderTop: b.garisAtas ? `3px solid ${w.sumbu}` : undefined }} data-baris={i}>
          <span className={`px-1 text-[10px] font-black leading-[11px] ${b.kecil ? "opacity-80" : ""}`} style={{ color: w.sumbu }}>
            {b.tanda ? <span className="mr-0.5 text-sm">{b.tanda}</span> : null}
            {b.label}
            {rupa === "benda" && b.angka !== null && !b.kecil ? (
              <>
                <br />
                <span className="text-[11px]">{fmt(b.angka)}</span>
              </>
            ) : null}
          </span>
          {urut.map((k) => {
            const isi = isiSel(b, k);
            const nyala = sorot.includes(k);
            const angkaSel = b.sel === undefined && b.angka !== null && isi !== null ? Number(isi) : null;
            const kartu = rupa === "benda" && !b.kecil && angkaSel !== null && angkaSel > 0;
            return (
              <span
                key={k}
                role="cell"
                data-kolom={k}
                data-isi={isi ?? ""}
                className={`flex items-center justify-center rounded-md border text-center font-black ${b.kecil ? "min-h-[20px] text-xs" : kartu ? "min-h-[26px] py-0.5 text-base" : "min-h-[26px] text-lg"}`}
                style={{ borderColor: nyala ? "#DC2626" : w.garis, borderWidth: nyala ? 2.5 : 1, background: nyala ? w.sorot : b.kecil ? "#F8FAFC" : w.sel, color: b.tandai?.includes(k) ? "#B45309" : "#1C01A5" }}
              >
                {kartu ? (
                  <span className="grid grid-cols-3 place-items-center gap-px text-[11px] leading-[13px]" aria-label={`${angkaSel} kartu`}>
                    {Array.from({ length: angkaSel ?? 0 }, (_, q) => (
                      <span key={q} aria-hidden="true">
                        {KARTU_KOLOM[k]}
                      </span>
                    ))}
                  </span>
                ) : (
                  (isi ?? "")
                )}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu lembar hitung panitia (Abstract): satu baris satu keterangan, tanpa emoji dan tanpa gambar. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="relative mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#B45309] bg-white p-2" role="group" aria-label="Kartu lembar hitung panitia">
      <p className="text-xs font-black uppercase tracking-wide text-[#78350F]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
      <span className="absolute -right-1 -top-3 rotate-6 rounded-full border-2 border-[#B91C1C] bg-[#FEE2E2] px-2 text-[10px] font-black text-[#991B1B]" aria-hidden="true">
        cap panitia
      </span>
    </div>
  );
}
const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#78350F]">
        {b}
      </p>
    ))}
  </div>
);
const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { rencana: "kartu cara", jumlah: "kartu jumlah", kurang: "kartu selisih", kali: "kartu kali", bagi: "kartu bagi", cek: "kartu cek" };

/** Kartu situasi (tugas memilih cara): kotak keadaan beserta tiga nama cara tanpa petunjuk jawaban. */
function KartuSituasi({ r, rupa }: { r: number; rupa: "benda" | "diagram" }) {
  const w = WARNA[rupa];
  return (
    <div className="mx-auto max-w-[360px] rounded-xl border-[3px] p-2 text-center" style={{ borderColor: w.garis, background: w.latar }} data-uji="kartu-situasi">
      <p className="text-sm font-black text-[#1C01A5]">
        {rupa === "benda" ? <span aria-hidden="true">{"\u{26BD}"} </span> : null}
        {RENCANA[r].teks}
      </p>
    </div>
  );
}

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={barisKartu(d, cara)} />;
  if (d.tipe === "rencana") return <KartuSituasi r={d.r} rupa={rupa} />;
  const papan = modelPapan(d);
  return (
    <div className="space-y-1.5">
      {papan ? <PapanKolom rupa={rupa} sorot={papan.sorot} baris={papan.baris.map((b, i) => ({ ...b, garisAtas: i === papan.baris.length - 1 && papan.baris.length > 1 }))} /> : null}
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}

