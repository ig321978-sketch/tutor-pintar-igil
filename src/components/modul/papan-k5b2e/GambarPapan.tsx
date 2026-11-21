"use client";

import React from "react";
import { RENCANA, barisKartu, dasarDari, judulKartu, ketGambar, modelGambar, type BarisBagi, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { pohonTata } from "./logika-data";

/**
 * Gambar tugas CPA Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang": papan bilangan pasar beremoji lama (Concrete: kartu bilangan dan lampion berbingkai kayu),
 * tabel bilangan, pohon faktor, dan tabel pembagian berulang polos tanpa emoji (Pictorial), dan kartu kata dan angka bercap pengelola tanpa gambar (Abstract).
 * Semua gambar dihitung dari logika murni (logika-data.ts dan logika-cpa.ts). Tanpa skor dan tanpa jaringan.
 */
const WARNA = {
  benda: { garis: "#92400E", latar: "#FEF3C7", sel: "#FFFBEB", sumbu: "#78350F", sorot: "#FCA5A5" },
  diagram: { garis: "#6D28D9", latar: "#F5F3FF", sel: "#FFFFFF", sumbu: "#4C1D95", sorot: "#DDD6FE" },
} as const;

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu lembar pengelola (Abstract): satu baris satu keterangan, tanpa emoji dan tanpa gambar. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="relative mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#B45309] bg-white p-2" role="group" aria-label="Kartu lembar pengelola">
      <p className="text-xs font-black uppercase tracking-wide text-[#78350F]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
      <span className="absolute -right-1 -top-3 rotate-6 rounded-full border-2 border-[#B91C1C] bg-[#FEE2E2] px-2 text-[10px] font-black text-[#991B1B]" aria-hidden="true">
        cap pengelola
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
const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = {
  rencana: "kartu cara",
  prima: "kartu bilangan",
  hapus: "kartu saringan",
  banyakPrima: "kartu saringan",
  berikut: "kartu saringan",
  klaimPrima: "kartu catatan",
  faktor: "kartu faktor",
  ulang: "kartu pembagian",
};

/* ------------------------------ Kartu bilangan ------------------------------ */
/** Satu sampai tiga kartu bilangan. Concrete: kartu bergantung lampion beremoji; Pictorial: kotak polos. */
function KartuBilangan({ bilangan, rupa, judul }: { bilangan: number[]; rupa: "benda" | "diagram"; judul: string }) {
  const w = WARNA[rupa];
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border-[3px] p-2" style={{ borderColor: w.garis, background: w.latar }} data-uji="kartu-bilangan" data-rupa={rupa}>
      <p className="mb-1 text-center text-[11px] font-black" style={{ color: w.sumbu }}>
        {judul}
      </p>
      <div className="flex justify-center gap-2">
        {bilangan.map((n) => (
          <div key={n} className="flex min-w-[64px] flex-col items-center">
            {rupa === "benda" ? (
              <span aria-hidden="true" className="text-lg leading-none">
                {"\u{1F3EE}"}
              </span>
            ) : (
              <span aria-hidden="true" className="block h-3 w-px" style={{ background: w.garis }} />
            )}
            <span className="flex min-h-[44px] w-full items-center justify-center rounded-lg border-2 text-2xl font-black text-[#1C01A5]" style={{ borderColor: w.garis, background: w.sel }}>
              {n}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Tabel bilangan ------------------------------ */
/** Tabel bilangan satu sampai batas, sepuluh kolom. Bilangan prima yang diambil dilingkari; bilangan yang terhapus dicoret dan dipudarkan. */
export function TabelBilangan({ batas, lingkar, coret, rupa, judul }: { batas: number; lingkar: number[]; coret: number[]; rupa: "benda" | "diagram"; judul: string }) {
  const w = WARNA[rupa];
  const semua = Array.from({ length: batas }, (_, i) => i + 1);
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border-[3px] p-1.5" style={{ borderColor: w.garis, background: w.latar }} role="table" aria-label={judul} data-uji="tabel-bilangan" data-rupa={rupa}>
      <p className="mb-1 text-center text-[11px] font-black" style={{ color: w.sumbu }}>
        {rupa === "benda" ? (
          <span aria-hidden="true">{"\u{1F3EE}"} </span>
        ) : null}
        {judul}
      </p>
      <div className="grid grid-cols-10 gap-px" role="rowgroup">
        {semua.map((n) => {
          const dilingkar = lingkar.includes(n);
          const dicoret = coret.includes(n);
          return (
            <span
              key={n}
              role="cell"
              data-n={n}
              data-lingkar={dilingkar ? "ya" : undefined}
              data-coret={dicoret ? "ya" : undefined}
              className={`flex min-h-[26px] items-center justify-center rounded text-xs font-black ${dicoret ? "line-through opacity-40" : ""}`}
              style={{ background: dilingkar ? w.sorot : w.sel, color: "#1C01A5", border: dilingkar ? "2.5px solid #DC2626" : `1px solid ${w.garis}` }}
            >
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Pohon faktor ------------------------------ */
/** Pohon faktor yang baru dipecah satu kali: bilangan di akar, prima terkecil di kiri, sisanya di kanan, dan dua lingkaran "?" di bawah sisa. */
function PohonGambar({ n, rupa, judul }: { n: number; rupa: "benda" | "diagram"; judul: string }) {
  const w = WARNA[rupa];
  const t = pohonTata(n).node;
  const akar = t[0];
  const kiri = t[1];
  const kanan = t[2];
  /** Geser mendatar supaya pohon berada di tengah bidang. */
  const X = (x: number): number => x + 22;
  const bulatan = (x: number, y: number, isi: string, prima: boolean, putus = false) => (
    <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r={11} fill={prima ? "#BBF7D0" : "#FFFFFF"} stroke={w.garis} strokeWidth={1.6} strokeDasharray={putus ? "3 2" : undefined} />
      <text x={x} y={y + 4} fontSize={11} fontWeight={900} textAnchor="middle" fill="#1C01A5">
        {isi}
      </text>
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-xl border-[3px] p-1.5" style={{ borderColor: w.garis, background: w.latar }} data-uji="pohon-faktor" data-rupa={rupa}>
      <p className="text-center text-[11px] font-black" style={{ color: w.sumbu }}>
        {rupa === "benda" ? <span aria-hidden="true">{"\u{1F333}"} </span> : null}
        {judul}
      </p>
      <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full" role="img" aria-label={`Pohon faktor ${n}, baru dipecah satu kali`}>
        <path d={`M${X(akar.x)} ${akar.y} L${X(kiri.x)} ${kiri.y} M${X(akar.x)} ${akar.y} L${X(kanan.x)} ${kanan.y}`} fill="none" stroke={w.garis} strokeWidth={1.6} />
        <path d={`M${X(kanan.x)} ${kanan.y} L${X(kanan.x) - 14} ${kanan.y + 30} M${X(kanan.x)} ${kanan.y} L${X(kanan.x) + 14} ${kanan.y + 30}`} fill="none" stroke={w.garis} strokeWidth={1.4} strokeDasharray="3 2" />
        {bulatan(X(akar.x), akar.y, String(akar.bil), akar.prima)}
        {bulatan(X(kiri.x), kiri.y, String(kiri.bil), kiri.prima)}
        {bulatan(X(kanan.x), kanan.y, String(kanan.bil), kanan.prima)}
        {bulatan(X(kanan.x) - 14, kanan.y + 30, "?", false, true)}
        {bulatan(X(kanan.x) + 14, kanan.y + 30, "?", false, true)}
      </svg>
    </div>
  );
}

/* ------------------------------ Tabel pembagian berulang ------------------------------ */
/** Tabel pembagian berulang: kolom pembagi lalu satu kolom tiap bilangan; baris pertama bilangan awal. */
export function TabelBagiGambar({ bil, baris, rupa }: { bil: number[]; baris: BarisBagi[]; rupa: "benda" | "diagram" }) {
  const w = WARNA[rupa];
  const kolom = `64px repeat(${bil.length}, minmax(0, 1fr))`;
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-xl border-[3px] p-1.5" style={{ borderColor: w.garis, background: w.latar }} role="table" aria-label="Tabel pembagian berulang" data-uji="tabel-bagi" data-rupa={rupa}>
      <div className="grid items-center gap-1" style={{ gridTemplateColumns: kolom }} role="row">
        <span className="text-center text-[11px] font-black leading-tight" style={{ color: w.sumbu }} role="columnheader">
          {rupa === "benda" ? <span aria-hidden="true">{"\u{1F514}"} </span> : null}
          pembagi
        </span>
        {bil.map((n) => (
          <span key={n} className="flex min-h-[28px] items-center justify-center rounded-md border-2 text-base font-black text-[#1C01A5]" style={{ borderColor: w.garis, background: w.sel }} role="cell">
            {n}
          </span>
        ))}
      </div>
      {baris.map((b, i) => (
        <div key={`${i}-${b.p}`} className="mt-1 grid items-center gap-1" style={{ gridTemplateColumns: kolom }} role="row" data-baris={i}>
          <span className="text-center text-base font-black" style={{ color: w.sumbu }} role="rowheader">
            {b.p}
          </span>
          {b.sesudah.map((x, j) => (
            <span key={j} className="flex min-h-[28px] items-center justify-center rounded-md border text-base font-black text-[#1C01A5]" style={{ borderColor: w.garis, background: w.sel }} role="cell">
              {x}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Kartu situasi dan gambar dasar ------------------------------ */
/** Kartu situasi (tugas memilih cara): kotak keadaan tanpa petunjuk jawaban. */
function KartuSituasi({ r, rupa }: { r: number; rupa: "benda" | "diagram" }) {
  const w = WARNA[rupa];
  return (
    <div className="mx-auto max-w-[360px] rounded-xl border-[3px] p-2 text-center" style={{ borderColor: w.garis, background: w.latar }} data-uji="kartu-situasi">
      <p className="text-sm font-black text-[#1C01A5]">
        {rupa === "benda" ? <span aria-hidden="true">{"\u{1F3EE}"} </span> : null}
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
  const m = modelGambar(d);
  return (
    <div className="space-y-1.5">
      {m?.jenis === "kartu" ? <KartuBilangan bilangan={m.bilangan} rupa={rupa} judul={m.judul} /> : null}
      {m?.jenis === "tabel" ? <TabelBilangan batas={m.batas} lingkar={m.lingkar} coret={m.coret} rupa={rupa} judul={m.judul} /> : null}
      {m?.jenis === "pohon" ? <PohonGambar n={m.n} rupa={rupa} judul={m.judul} /> : null}
      {m?.jenis === "bagi" ? <TabelBagiGambar bil={m.bil} baris={m.baris} rupa={rupa} /> : null}
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
