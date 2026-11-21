"use client";

import React from "react";
import { barisKartu, dasarDari, tampilan, type Cara, type Langkah, type LangkahDasar, type Rupa, type TampilanLoyang } from "./logika-cpa";
import { BAR, ikonBahan, tataBar, type BarisBar } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab B (menjumlahkan pecahan):
 * Concrete = loyang berpotongan dengan emoji roti atau bahan, Pictorial = bar pecahan polos (kotak SVG berwarna, tanpa emoji),
 * Abstract = kartu angka bercap Toko Roti Keliling (tanpa gambar). Sel DIGAMBAR dari data lewat tataBar (logika-data.ts):
 * sungguh sebanyak penyebut, yang terisi sebanyak pembilang, dan bilangan bulat digambar sebagai bar penuh. Dipakai bersama oleh tugas CPA (LangkahLoyang) dan Simulasi Gabung Loyang.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_LOYANG = {
  benda: { latar: "#FFF7ED", garis: "#9A3412", angka: "#7C2D12" },
  diagram: { latar: "#EFF6FF", garis: "#1E3A8A", angka: "#1E3A8A" },
} as const;
export const warnaLoyang = (rupa: Rupa) => (rupa === "benda" ? WARNA_LOYANG.benda : WARNA_LOYANG.diagram);

const ISI_BARIS = ["#FCD34D", "#FDA4AF", "#86EFAC"];
const GARIS_BARIS = ["#B45309", "#BE123C", "#15803D"];
const ISI_POLOS = ["#93C5FD", "#FDBA74", "#A7F3D0"];
const GARIS_POLOS = ["#1D4ED8", "#C2410C", "#047857"];

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaLoyang(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={i * 30} y={0} width={30} height={7} fill={i % 2 === 0 ? "#F87171" : "#FFFFFF"} stroke="#9A3412" strokeWidth={0.6} />
          ))}
        </g>
      ) : null}
      <text x={150} y={rupa === "benda" ? 21 : 17} textAnchor="middle" fontSize={Math.min(14, Math.round((285 / (0.6 * Math.max(judul.length, 1))) * 10) / 10)} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Bar pecahan: tiap sel satu kotak; sel terisi berwarna (dengan emoji bahan pada Concrete), sel kosong putih bergaris putus. Bilangan bulat berupa bar penuh. */
function IsiBar({ baris, ikon }: { baris: BarisBar[]; ikon?: string }) {
  const t = tataBar(baris);
  const polos = ikon === undefined;
  return (
    <g data-papan={polos ? "bar" : "loyang"}>
      {t.bar.map((b, i) =>
        b.label ? (
          <text key={`l${i}`} x={4} y={b.y + 13} fontSize={14} fontWeight={900} fill={polos ? WARNA_LOYANG.diagram.angka : WARNA_LOYANG.benda.angka} data-label={b.label}>
            {b.label}
          </text>
        ) : null,
      )}
      {t.sel.map((c, i) => (
        <g key={`s${i}`}>
          <rect
            x={c.x + 0.5}
            y={c.y}
            width={Math.max(2, c.w - 1)}
            height={c.h}
            rx={polos ? 1.5 : 4}
            fill={c.isi ? (polos ? ISI_POLOS : ISI_BARIS)[c.baris % 3] : "#FFFFFF"}
            stroke={c.isi ? (polos ? GARIS_POLOS : GARIS_BARIS)[c.baris % 3] : "#94A3B8"}
            strokeWidth={c.isi ? 1.2 : 1}
            strokeDasharray={c.isi ? undefined : "3 2"}
            data-sel={c.bar}
            data-isi={c.isi ? 1 : 0}
          />
          {c.isi && !polos ? (
            <text x={c.x + c.w / 2} y={c.y + 13} textAnchor="middle" fontSize={Math.min(14.5, Math.max(11, c.w - 2))} data-emoji={c.bar}>
              {ikon}
            </text>
          ) : null}
        </g>
      ))}
    </g>
  );
}

/** Loyang berpotongan beremoji. */
export function PapanLoyang({ baris, bahan, judul, label }: { baris: BarisBar[]; bahan: string; judul?: string; label?: string }) {
  const t = tataBar(baris);
  return (
    <Gambar rupa="benda" label={label ?? `Loyang ${bahan}: ${baris.map((b) => b.label).join(" dan ")}`} judul={judul ?? `${bahan} ${baris.map((b) => b.label).join(" + ")}`} tinggi={Math.max(t.tinggi, 70)}>
      <IsiBar baris={baris} ikon={ikonBahan(bahan)} />
    </Gambar>
  );
}

/** Bar pecahan polos tanpa emoji. */
export function BarPecahan({ baris, judul, label }: { baris: BarisBar[]; judul?: string; label?: string }) {
  const t = tataBar(baris);
  return (
    <Gambar rupa="diagram" label={label ?? `Bar pecahan ${baris.map((b) => b.label).join(" dan ")}`} judul={judul ?? baris.map((b) => b.label).join(" + ")} tinggi={Math.max(t.tinggi, 70)}>
      <IsiBar baris={baris} />
    </Gambar>
  );
}

/** Gambar satu tampilan tugas (loyang beremoji atau bar polos). */
export function PapanTampilan({ t }: { t: TampilanLoyang }) {
  return t.mode === "loyang" ? <PapanLoyang baris={t.baris} bahan={t.bahan} judul={t.judul} /> : <BarPecahan baris={t.baris} judul={t.judul} />;
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#FDBA74] bg-[#FFFBF5] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#C2410C]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#431407]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#9A3412] bg-[#FFFBEB] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(154,52,18,0.14) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#B91C1C] px-1 text-[10px] font-black text-[#B91C1C]" aria-hidden="true">
      TOKO ROTI KELILING
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "gabung bagian",
  atas: "jumlahkan pembilang",
  bawah: "samakan penyebut",
  bulat: "bulat lalu pecahan",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  return <PapanTampilan t={tampilan(d, cara, rupa)} />;
}

export { BAR };
