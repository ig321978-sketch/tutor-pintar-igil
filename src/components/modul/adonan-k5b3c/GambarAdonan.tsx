"use client";

import React from "react";
import { barisKartu, dasarDari, tampilan, type Cara, type Langkah, type Rupa, type TampilanAdonan } from "./logika-cpa";
import { ikonRoti, tataGambar } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab C (pengurangan pecahan):
 * Concrete = loyang kue beremoji yang dibagi sama besar, Pictorial = bar pecahan polos (kotak SVG berwarna, tanpa emoji),
 * Abstract = kartu tabel dan angka bercap Toko Roti Keliling (tanpa gambar). Bagian loyang DIGAMBAR dari data lewat tataGambar (logika-data.ts):
 * sungguh sebanyak bagian dan sesuai arsir dan coretnya. Dipakai bersama oleh tugas CPA (LangkahAdonan) dan Simulasi Sisa Adonan.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_ADONAN = {
  benda: { latar: "#FDF2F8", garis: "#9D174D", angka: "#831843" },
  diagram: { latar: "#EFF6FF", garis: "#1E40AF", angka: "#1E3A8A" },
} as const;
export const warnaAdonan = (rupa: Rupa) => (rupa === "benda" ? WARNA_ADONAN.benda : WARNA_ADONAN.diagram);

/* ------------------------------ Pecahan bertumpuk ------------------------------ */
/** Pecahan bertumpuk: pembilang di atas garis, penyebut di bawah; bilangan bulat di kiri. Teks lain dikembalikan apa adanya. */
export function TeksPec({ teks }: { teks: string }) {
  const m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(teks.trim());
  if (!m) return <>{teks}</>;
  return (
    <span className="inline-flex items-center gap-1 align-middle" role="img" aria-label={teks}>
      {m[1] ? <span>{m[1]}</span> : null}
      <span className="inline-flex flex-col items-center leading-[1.05]" aria-hidden="true">
        <span className="px-0.5">{m[2]}</span>
        <span className="block h-[2px] w-full bg-current" />
        <span className="px-0.5">{m[3]}</span>
      </span>
    </span>
  );
}
/** Satu baris teks; tiap pecahan di dalamnya tampil bertumpuk. */
export function TeksBaris({ t }: { t: string }) {
  const potong = t.split(/((?:\d+ )?\d+\/\d+)/g);
  return (
    <>
      {potong.map((p, i) => (/^(?:\d+ )?\d+\/\d+$/.test(p) ? <TeksPec key={i} teks={p} /> : <React.Fragment key={i}>{p}</React.Fragment>))}
    </>
  );
}

/* ------------------------------ Gambar bar ------------------------------ */
export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200, besar = false, luas = false }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number; besar?: boolean; luas?: boolean }) {
  const w = warnaAdonan(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <polygon key={i} points={`${8 + i * 30},3 ${30 + i * 30},3 ${19 + i * 30},13`} fill={["#F472B6", "#60A5FA", "#FDE047"][i % 3]} />
          ))}
        </g>
      ) : null}
      <text x={150} y={luas ? (rupa === "benda" ? 27 : 22) : rupa === "benda" ? 24 : 17} textAnchor="middle" fontSize={luas ? 16 : besar ? 14 : judul.length > 30 ? 11 : 12.5} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

const WARNA_SEL = {
  isi: { isi: "#93C5FD", garis: "#1E40AF" },
  ambil: { isi: "#FDBA74", garis: "#C2410C" },
  coret: { isi: "#FEE2E2", garis: "#B91C1C" },
  kosong: { isi: "#FFFFFF", garis: "#94A3B8" },
} as const;

/** Bar loyang: tiap bagian satu kotak (Concrete: kue beremoji, Pictorial: kotak polos). Bagian dicoret diberi garis silang merah, bagian kosong bergaris putus. */
export function PapanBar({ t, label, besar = false }: { t: TampilanAdonan; label?: string; besar?: boolean }) {
  const luas = !besar;
  const g = tataGambar(t.rangkaian, luas);
  const benda = t.mode === "loyang";
  const ikon = ikonRoti(t.item);
  const tinggi = Math.max(g.tinggi, 70);
  return (
    <Gambar rupa={benda ? "benda" : "diagram"} label={label ?? `Gambar ${g.strip} bar pecahan: ${t.judul}`} judul={t.judul} tinggi={tinggi} besar={besar} luas={luas}>
      <g data-papan="bar" data-strip={g.strip} data-sel={g.sel.length}>
        {g.label.map((l, i) => (
          <text key={`l${i}`} x={l.x} y={l.y} fontSize={luas ? 15 : 14} fontWeight={800} fill={warnaAdonan(benda ? "benda" : "diagram").angka}>
            {l.teks}
          </text>
        ))}
        {g.sel.map((c, i) => {
          const w = WARNA_SEL[c.status];
          return (
            <g key={`c${i}`} data-sel-bar={c.strip} data-status={c.status}>
              <rect
                x={c.x + 0.6}
                y={c.y}
                width={Math.max(3, c.w - 1.2)}
                height={c.h}
                rx={2}
                fill={benda && (c.status === "isi" || c.status === "ambil") ? (c.status === "isi" ? "#FFFBEB" : "#FFEDD5") : w.isi}
                stroke={w.garis}
                strokeWidth={1}
                strokeDasharray={c.status === "kosong" ? "3 2" : undefined}
              />
              {benda && c.status !== "kosong" ? (
                <text x={c.x + c.w / 2} y={c.y + c.h - (luas ? 1.8 : 2.2)} textAnchor="middle" fontSize={luas ? Math.min(14, c.w - 3) : Math.min(11.5, c.w - 4)} opacity={c.status === "coret" ? 0.45 : 1}>
                  {ikon}
                </text>
              ) : null}
              {c.status === "coret" ? (
                <g stroke="#DC2626" strokeWidth={1.6} strokeLinecap="round">
                  <line x1={c.x + 3} y1={c.y + 2} x2={c.x + c.w - 3} y2={c.y + c.h - 2} />
                  <line x1={c.x + c.w - 3} y1={c.y + 2} x2={c.x + 3} y2={c.y + c.h - 2} />
                </g>
              ) : null}
            </g>
          );
        })}
      </g>
    </Gambar>
  );
}

/** Gambar satu tampilan tugas (loyang beremoji atau bar polos). */
export function PapanTampilan({ t }: { t: TampilanAdonan }) {
  return <PapanBar t={t} />;
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#EAB308] bg-[#FFFDF2] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#A16207]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#422006]">
          <TeksBaris t={b} />
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#CA8A04] bg-[#FEFCE8] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(161,98,7,0.14) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#BE185D] px-1 text-[10px] font-black text-[#BE185D]" aria-hidden="true">
      TOKO ROTI KELILING
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<Langkah["tipe"], string> = {
  igil: "baca pembagian loyang",
  sama: "kurangi pembilang",
  samakan: "samakan lalu kurangi",
  pisah: "pisah bulat dan pecahan",
  salah: "periksa jawaban",
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
  return <PapanTampilan t={tampilan(d, rupa)} />;
}
