"use client";

import React from "react";
import { PAPAN } from "./papan-data";
import { barisKartu, dasarDari, garisTugas, jenisGambar, judulKartu, ketGambar, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { NAMA_KOLOM, adaTitikSetelah, fmt, selKolom, type Garis } from "./logika-data";

/**
 * Gambar tugas CPA Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto": papan tiket stadion beremoji lama (Concrete), diagram polos tanpa emoji (Pictorial),
 * dan kartu angka panitia tanpa gambar (Abstract). Papan kolom digambar dari angka bilangannya (kolom lurus ke bawah, nol penjaga tampak, kolom di depan bilangan kosong),
 * garis bilangan digambar dari geometri murni (logika-data.ts): titik tepat sebanding dengan bilangannya, patokan berjarak sama, label tidak bertabrakan. Tanpa skor dan tanpa jaringan.
 */

type RupaGambar = "benda" | "diagram";
const WARNA = {
  benda: { garis: "#B45309", latar: "#FFF7ED", sumbu: "#7C2D12", kartu: "#FFEDD5", sel: "#FFFFFF" },
  diagram: { garis: "#7C3AED", latar: "#F5F3FF", sumbu: "#4C1D95", kartu: "#EDE9FE", sel: "#FFFFFF" },
} as const;

/* ------------------------------ Papan kolom ------------------------------ */
export type BarisPapan = { nama: string; n: number; ikon?: string };
/** Papan kolom: tiap bilangan satu baris, tempat angka lurus ke bawah (puluh ribuan di kiri), titik pemisah ribuan tampil. `tengah`: teks di antara dua baris (mis. "?"). */
export function PapanKolom({ baris, rupa, tengah, judul }: { baris: BarisPapan[]; rupa: RupaGambar; tengah?: string; judul?: string }) {
  const w = WARNA[rupa];
  const kepala = (
    <div className="flex items-end gap-0.5 pl-[72px]" aria-hidden="true">
      {NAMA_KOLOM.slice()
        .reverse()
        .map((k, i) => (
          <React.Fragment key={k}>
            <span className="w-[34px] text-center text-[10px] font-black leading-tight" style={{ color: w.sumbu }}>
              {k.split(" ").map((s) => (
                <span key={s} className="block">
                  {s}
                </span>
              ))}
            </span>
            <span className={i === 1 ? "w-2" : "w-0"} />
          </React.Fragment>
        ))}
    </div>
  );
  const sel = (b: BarisPapan, kunci: string) => {
    const s = selKolom(b.n);
    return (
      <div key={kunci} className="flex items-center gap-0.5" data-baris={b.n}>
        <p className="w-[70px] shrink-0 truncate text-xs font-black leading-tight" style={{ color: "#1C01A5" }}>
          {b.ikon && rupa === "benda" ? <span aria-hidden="true">{b.ikon} </span> : null}
          {b.nama}
        </p>
        {s.map((d, i) => (
          <React.Fragment key={i}>
            <span
              className="flex h-[38px] w-[34px] items-center justify-center rounded-md border-2 text-xl font-black"
              style={{ borderColor: w.garis, background: d === null ? "transparent" : w.sel, color: "#1C01A5", borderStyle: d === null ? "dashed" : "solid", opacity: d === null ? 0.4 : 1 }}
              data-sel={d ?? ""}
            >
              {d}
            </span>
            <span className={`${i === 1 ? "w-2" : "w-0"} text-center text-base font-black leading-none`} style={{ color: w.sumbu }} aria-hidden="true">
              {i === 1 && adaTitikSetelah(b.n, i) ? "." : ""}
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };
  return (
    <div className="mx-auto w-full max-w-[320px] space-y-1 rounded-xl border-2 p-1.5" style={{ borderColor: w.garis, background: w.kartu }} role="img" aria-label={`papan tempat angka${judul ? `: ${judul}` : ""}: ${baris.map((b) => `${b.nama} ${fmt(b.n)}`).join(", ")}`}>
      {kepala}
      {baris.length === 2 && tengah ? (
        <>
          {sel(baris[0], "a")}
          <p className="mx-auto w-14 rounded-full border-2 border-dashed text-center text-base font-black" style={{ borderColor: "#B45309", color: "#B45309", background: "#FFFFFF" }}>
            {tengah}
          </p>
          {sel(baris[1], "b")}
        </>
      ) : (
        baris.map((b, i) => sel(b, String(i)))
      )}
    </div>
  );
}

/* ------------------------------ Garis bilangan ------------------------------ */
const lebarTeks = (t: string): number => t.length * 6.2;
/** Garis bilangan berpatokan: titik dan patokan sesuai bilangan. `sorot`: patokan yang diberi warna merah. `tampilAngka`: tulis angka bilangan di label titik. */
export function GarisSvg({ g, rupa, sorot = [], tampilAngka = true, ukuran = "max-w-[300px]" }: { g: Garis; rupa: RupaGambar; sorot?: number[]; tampilAngka?: boolean; ukuran?: string }) {
  const w = WARNA[rupa];
  return (
    <svg viewBox={`0 0 ${g.lebar} ${g.tinggi}`} className={`mx-auto w-full ${ukuran}`} role="img" aria-label={`garis bilangan dengan patokan ${g.patokan.map((p) => p.angka).join(", ")}`} data-patokan={g.patokan.length} data-titik={g.titik.length}>
      <rect x={2} y={2} width={g.lebar - 4} height={g.tinggi - 4} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.8} />
      <line x1={g.x0 - 10} y1={g.y} x2={g.x1 + 10} y2={g.y} stroke={w.sumbu} strokeWidth={2.2} />
      <path d={`M${g.x1 + 10} ${g.y} l-6 -3.5 v7 z`} fill={w.sumbu} />
      {g.patokan.map((p) => (
        <g key={p.n}>
          <line x1={p.x} y1={g.y - 6} x2={p.x} y2={g.y + 6} stroke={sorot.includes(p.n) ? "#DC2626" : w.sumbu} strokeWidth={sorot.includes(p.n) ? 3 : 2} />
          <text x={p.x} y={g.y + 20} textAnchor="middle" fontSize={9} fontWeight={800} fill={sorot.includes(p.n) ? "#DC2626" : w.sumbu}>
            {p.angka}
          </text>
        </g>
      ))}
      {g.titik.map((t) => {
        const teks = tampilAngka && g.titik.length === 1 ? `${t.nama} ${fmt(t.n)}` : t.nama;
        const lebar = lebarTeks(teks);
        const pusat = Math.min(g.lebar - 3 - lebar / 2, Math.max(3 + lebar / 2, t.x));
        return (
          <g key={`${t.nama}${t.n}`} data-titik-n={t.n} data-titik-x={t.x.toFixed(2)}>
            <line x1={t.x} y1={g.y} x2={t.x} y2={t.y + 3} stroke="#DC2626" strokeWidth={1.2} strokeDasharray="2 2" />
            <circle cx={t.x} cy={g.y} r={4.5} fill="#DC2626" stroke="#7F1D1D" strokeWidth={1.2} />
            <text x={pusat} y={t.y} textAnchor="middle" fontSize={10.5} fontWeight={900} fill="#1C01A5">
              {teks}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu angka panitia (Abstract): satu baris satu keterangan, tanpa emoji dan tanpa gambar. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="relative mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#7E22CE] bg-white p-2" role="group" aria-label="Kartu angka panitia">
      <p className="text-xs font-black uppercase tracking-wide text-[#581C87]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#7E22CE] bg-[#FAF5FF] px-2 py-1 text-sm font-bold text-[#1C01A5]">
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
      <p key={b} className="text-xs font-black text-[#581C87]">
        {b}
      </p>
    ))}
  </div>
);
const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = {
  tanda: "kartu tanda",
  banyakAngka: "kartu angka",
  sebutTanda: "kartu tanda",
  penentu: "kartu kolom",
  kolomKe: "kartu kolom",
  mana: "kartu banding",
  ruas: "kartu ruas",
  patKiri: "kartu patokan",
  kanan: "kartu garis",
  dekat: "kartu patokan",
  urutKe: "kartu urutan",
  sisi: "kartu sisi",
};

/** Daftar bilangan tak berurut (tugas urutan): satu kartu per bilangan. */
function DaftarKartu({ papan, rupa }: { papan: string; rupa: RupaGambar }) {
  const P = PAPAN[papan];
  const w = WARNA[rupa];
  return (
    <div className="mx-auto grid max-w-[320px] grid-cols-2 gap-1.5" role="list" aria-label={P.judul}>
      {P.item.map((x) => (
        <div key={x.nama} role="listitem" className="rounded-xl border-2 px-2 py-1.5 text-center" style={{ borderColor: w.garis, background: w.kartu }} data-kartu={x.n}>
          <p className="text-xs font-black text-[#1C01A5]">
            {x.ikon && rupa === "benda" ? <span aria-hidden="true">{x.ikon} </span> : null}
            {x.nama}
          </p>
          <p className="text-lg font-black leading-tight text-[#1C01A5]">{fmt(x.n)}</p>
          <p className="text-[10px] font-bold" style={{ color: w.sumbu }}>
            {P.satuan}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={barisKartu(d, cara)} />;
  const r: RupaGambar = rupa === "benda" ? "benda" : "diagram";
  const jenis = jenisGambar(d);
  const P = PAPAN[d.p];
  let gambar: React.ReactNode = null;
  if (jenis === "papan") {
    const idx = d.tipe === "banyakAngka" ? [d.a] : "b" in d ? [d.a, d.b] : [];
    gambar = <PapanKolom baris={idx.map((i) => P.item[i])} rupa={r} judul={P.judul} tengah={d.tipe === "tanda" || d.tipe === "sebutTanda" ? "?" : undefined} />;
  } else if (jenis === "garis") {
    const g = garisTugas(d);
    gambar = g ? <GarisSvg g={g} rupa={r} sorot={d.tipe === "sisi" ? [d.pat] : []} /> : null;
  } else gambar = <DaftarKartu papan={d.p} rupa={r} />;
  return (
    <div className="space-y-1.5">
      {gambar}
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
