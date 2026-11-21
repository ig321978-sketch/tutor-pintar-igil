"use client";

import React from "react";
import { barisKartu, dasarDari, nIgil, type Cara, type Langkah, type LangkahDasar, type LIgil, type LLompat, type LTabel, type Rupa } from "./logika-cpa";
import { TATA_TABEL, banyakBaris, berwarna, lambang, posisiSel, potongPita, selTabel } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab A (kelipatan):
 * Concrete = stan lonceng pasar (tali lonceng, tali lompat, papan bilangan, pita) dengan lonceng beremoji, Pictorial = kertas jadwal polos (lingkaran, garis lompat, tabel bilangan, pita; tanpa emoji),
 * Abstract = kartu kata dan angka bercap pengelola pasar (tanpa gambar). Semua bentuk DIGAMBAR dari bilangan lewat logika-data.ts: banyak lonceng, banyak lompatan, sel tabel berwarna, dan potongan pita.
 * Dipakai bersama oleh tugas CPA (LangkahLonceng) dan Simulasi Lompat Lonceng.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_LONCENG = {
  benda: { latar: "#FEF3C7", garis: "#B45309", angka: "#78350F", sel: "#FFFFFF", warna: "#FDBA74", tepi: "#C2410C", sorot: "#FDE68A", sisa: "#FECACA" },
  diagram: { latar: "#F1F5F9", garis: "#334155", angka: "#0F172A", sel: "#FFFFFF", warna: "#BFDBFE", tepi: "#1D4ED8", sorot: "#E2E8F0", sisa: "#E2E8F0" },
} as const;
export const warnaLonceng = (rupa: Rupa) => (rupa === "benda" ? WARNA_LONCENG.benda : WARNA_LONCENG.diagram);

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 140 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaLonceng(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={i * 30} y={0} width={30} height={5} fill={i % 2 === 0 ? "#DC2626" : "#FFFFFF"} />
          ))}
        </g>
      ) : null}
      <text x={150} y={19} textAnchor="middle" fontSize={12.5} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/* ------------------------------ Deret bunyi (igil) ------------------------------ */
/** Lonceng berderet pada satu tali: tiap lonceng diberi bilangan kelipatannya; `tutup` menyembunyikan bilangan lonceng terakhir (diganti ?) atau semua kecuali terakhir. */
export function DeretBunyi({ d, cara, rupa }: { d: LIgil; cara: Cara; rupa: Rupa }) {
  const w = warnaLonceng(rupa);
  const benda = rupa === "benda";
  const p = d.p;
  const dx = Math.min(32, 262 / p);
  const x0 = 150 - ((p - 1) * dx) / 2;
  const nilai = (i: number): string => (cara === "klik" ? (i === p ? "?" : String(i * d.b)) : cara === "kanvas" ? (i === p ? lambang(nIgil(d)) : "") : i === p ? lambang(nIgil(d)) : "");
  return (
    <Gambar rupa={rupa} label={`${benda ? "Deret lonceng" : "Deret bilangan"} ${p} bunyi tiap ${d.b} ${d.satuan}`} judul={`bunyi tiap ${d.b} ${d.satuan}`} tinggi={124}>
      <g data-deret="bunyi" data-banyak={p}>
        <line x1={x0 - 14} y1={52} x2={x0 + (p - 1) * dx + 14} y2={52} stroke={w.garis} strokeWidth={2.4} />
        {Array.from({ length: p }, (_, j) => {
          const i = j + 1;
          const x = x0 + j * dx;
          const akhir = i === p;
          return (
            <g key={i} data-bunyi={i}>
              {benda ? (
                <text x={x} y={66} textAnchor="middle" fontSize={21}>
                  {"\u{1F514}"}
                </text>
              ) : (
                <circle cx={x} cy={58} r={9} fill={akhir ? w.sorot : w.warna} stroke={w.tepi} strokeWidth={1.8} />
              )}
              {nilai(i) ? (
                <text x={x} y={92} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={akhir ? "#B91C1C" : w.angka}>
                  {nilai(i)}
                </text>
              ) : null}
            </g>
          );
        })}
        <text x={150} y={116} textAnchor="middle" fontSize={11} fontWeight={800} fill={w.angka}>
          {cara === "suara" ? `${p} × ${d.b} = ${nIgil(d)}` : `bunyi pertama pada ${d.satuan} ke ${d.b}`}
        </text>
      </g>
    </Gambar>
  );
}

/* ------------------------------ Garis lompat (lompat) ------------------------------ */
/** Garis lompat dari nol: tiap lompatan sama panjang digambar sebagai busur; bilangan pendaratan tertulis kecuali yang ditanyakan. */
export function GarisLompat({ b, p, rupa, label, bertanda = [], sembunyi = [], satuan, tinggi = 118, buat }: { b: number; p: number; rupa: Rupa; label?: string; bertanda?: number[]; sembunyi?: number[]; satuan: string; tinggi?: number; buat?: number }) {
  const w = warnaLonceng(rupa);
  const benda = rupa === "benda";
  const dx = 264 / p;
  const xs = Array.from({ length: p + 1 }, (_, i) => 18 + i * dx);
  const dikunjungi = (i: number): boolean => buat === undefined || i <= buat;
  const tulis = (i: number): string => (buat !== undefined ? (i <= buat ? String(i * b) : "") : sembunyi.includes(i) ? "?" : bertanda.includes(i) ? String(i * b) : "");
  return (
    <Gambar rupa={rupa} label={label ?? `Garis lompat ${p} lompatan berjarak ${b} ${satuan}`} judul={`lompat tiap ${b} ${satuan}`} tinggi={tinggi}>
      <g data-garis="lompat" data-lompatan={p}>
        <line x1={10} y1={84} x2={292} y2={84} stroke={w.garis} strokeWidth={2} />
        {xs.slice(0, -1).filter((_, i) => dikunjungi(i + 1)).map((x, i) => (
          <path key={`b${i}`} d={`M${x} 84 Q${(x + xs[i + 1]) / 2} 40 ${xs[i + 1]} 84`} fill="none" stroke={w.tepi} strokeWidth={2} strokeDasharray={benda ? undefined : "5 3"} data-busur={i + 1} />
        ))}
        {xs.map((x, i) => (
          <g key={`p${i}`} data-titik={i}>
            {benda && i > 0 && dikunjungi(i) ? (
              <text x={x} y={80} textAnchor="middle" fontSize={15}>
                {"\u{1F514}"}
              </text>
            ) : (
              <circle cx={x} cy={84} r={i === 0 ? 4.5 : 4} fill={i === 0 || !dikunjungi(i) ? "#FFFFFF" : w.tepi} stroke={dikunjungi(i) ? w.tepi : "#94A3B8"} strokeWidth={2} />
            )}
            <text x={x} y={104} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={sembunyi.includes(i) ? "#B91C1C" : w.angka}>
              {i === 0 ? "0" : tulis(i)}
            </text>
          </g>
        ))}
      </g>
    </Gambar>
  );
}

/* ------------------------------ Tabel bilangan (tabel) ------------------------------ */
/** Tabel bilangan satu sampai `sampai`, sepuluh kolom: `warna` = bilangan yang diwarnai, `sorot` = bilangan yang disorot, `tanya` = kotak bertanda tanya. */
export function TabelBilangan({ sampai, warna = [], sorot = [], tanya, rupa, label, legenda }: { sampai: number; warna?: number[]; sorot?: number[]; tanya?: number; rupa: Rupa; label?: string; legenda?: string }) {
  const w = warnaLonceng(rupa);
  const benda = rupa === "benda";
  const tinggi = TATA_TABEL.y0 + banyakBaris(sampai) * TATA_TABEL.h + 30;
  return (
    <Gambar rupa={rupa} label={label ?? `${benda ? "Papan bilangan pasar" : "Tabel bilangan"} satu sampai ${sampai}`} judul={benda ? "papan bilangan pasar" : "tabel bilangan"} tinggi={tinggi}>
      <g data-tabel="bilangan" data-sampai={sampai}>
        {selTabel(sampai).map((s) => {
          const { x, y } = posisiSel(s.n);
          const berwarnaIni = warna.includes(s.n);
          const so = sorot.includes(s.n);
          const tn = tanya === s.n;
          return (
            <g key={s.n} data-bilangan={s.n} data-warna={berwarnaIni ? "1" : "0"}>
              <rect
                x={x + 1}
                y={y + 1}
                width={TATA_TABEL.w - 2}
                height={TATA_TABEL.h - 2}
                rx={benda ? 5 : 2}
                fill={tn ? "#FFFFFF" : berwarnaIni ? w.warna : so ? w.sorot : w.sel}
                stroke={tn ? "#B91C1C" : so ? "#B91C1C" : berwarnaIni ? w.tepi : w.garis}
                strokeWidth={tn || so ? 2.4 : 1}
                strokeDasharray={tn ? "3 2" : undefined}
              />
              <text x={x + TATA_TABEL.w / 2} y={y + 15.5} textAnchor="middle" fontSize={11.5} fontWeight={berwarnaIni || so || tn ? 900 : 600} fill={tn ? "#B91C1C" : w.angka}>
                {tn ? "?" : s.n}
              </text>
            </g>
          );
        })}
        <text x={150} y={tinggi - 9} textAnchor="middle" fontSize={11} fontWeight={800} fill={w.angka}>
          {legenda ?? ""}
        </text>
      </g>
    </Gambar>
  );
}

/* ------------------------------ Pita bagi (cek) ------------------------------ */
/** Pita sepanjang n dipotong tiap b: potongan penuh bertulis b, sisa (bila ada) berarsir dan tidak bertulis. */
export function PitaBagi({ n, b, rupa, satuan }: { n: number; b: number; rupa: Rupa; satuan: string }) {
  const w = warnaLonceng(rupa);
  const benda = rupa === "benda";
  const { penuh, sisa } = potongPita(n, b);
  const satu = n === 0 ? 0 : 264 / n;
  return (
    <Gambar rupa={rupa} label={n === 0 ? `Pita kosong sepanjang nol ${satuan}` : `Pita sepanjang ${n} ${satuan} dipotong tiap ${b}: ${penuh} potongan${sisa > 0 ? " dan sisa" : ""}`} judul={`pita ${n} ${satuan}, dipotong tiap ${b}`} tinggi={116}>
      <g data-pita="bagi" data-penuh={penuh} data-sisa={sisa > 0 ? "1" : "0"}>
        {n === 0 ? (
          <g>
            <rect x={18} y={44} width={264} height={30} rx={6} fill="none" stroke={w.garis} strokeWidth={1.8} strokeDasharray="5 4" />
            <text x={150} y={64} textAnchor="middle" fontSize={13} fontWeight={900} fill={w.angka}>
              {benda ? "\u{1F380} tidak ada pita: panjang 0" : "tidak ada pita: panjang 0"}
            </text>
          </g>
        ) : (
          <g>
            {Array.from({ length: penuh }, (_, i) => (
              <g key={i} data-potong={i + 1}>
                <rect x={18 + i * b * satu} y={44} width={b * satu} height={30} rx={benda ? 5 : 1} fill={i % 2 === 0 ? w.warna : w.sorot} stroke={w.tepi} strokeWidth={1.6} />
                <text x={18 + (i * b + b / 2) * satu} y={64} textAnchor="middle" fontSize={12} fontWeight={900} fill={w.angka}>
                  {b}
                </text>
              </g>
            ))}
            {sisa > 0 ? (
              <rect x={18 + penuh * b * satu} y={44} width={sisa * satu} height={30} rx={benda ? 5 : 1} fill={w.sisa} stroke="#B91C1C" strokeWidth={1.8} strokeDasharray="4 3" data-sisa-pita="1" />
            ) : null}
            <path d={`M18 84 v8 h264 v-8`} fill="none" stroke={w.garis} strokeWidth={1.6} />
            <text x={150} y={108} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={w.angka}>
              {`panjang pita: ${lambang(n)} ${satuan}`}
            </text>
          </g>
        )}
      </g>
    </Gambar>
  );
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#A5B4FC] bg-[#EEF2FF] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#3730A3]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#1E1B4B]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#4338CA] bg-[#E0E7FF] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(67,56,202,0.14) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#B91C1C] px-1 text-[10px] font-black text-[#B91C1C]" aria-hidden="true">
      PENGELOLA PASAR
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "bunyi lonceng",
  lompat: "daftar kelipatan",
  tabel: "tabel bilangan",
  cek: "cek dengan bagi",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
function TampilLompat({ d, rupa, cara }: { d: LLompat; rupa: Rupa; cara: Cara }) {
  const titik = Array.from({ length: d.p }, (_, i) => i + 1);
  if (cara === "klik") return <GarisLompat b={d.b} p={d.p} rupa={rupa} satuan={d.satuan} bertanda={titik.filter((i) => i < d.p)} sembunyi={[d.p]} />;
  if (cara === "kanvas") return <GarisLompat b={d.b} p={d.p} rupa={rupa} satuan={d.satuan} bertanda={[d.p]} />;
  return <GarisLompat b={d.b} p={d.p} rupa={rupa} satuan={d.satuan} bertanda={titik.filter((i) => i > 1)} sembunyi={[1]} />;
}
function TampilTabel({ d, rupa, cara }: { d: LTabel; rupa: Rupa; cara: Cara }) {
  if (cara === "kanvas") return <TabelBilangan sampai={d.sampai} warna={berwarna(d.b, d.sampai)} rupa={rupa} legenda={`diwarnai: kelipatan ${d.b}`} />;
  if (cara === "suara") return <TabelBilangan sampai={d.sampai} warna={berwarna(d.b, d.sampai).filter((x) => x !== d.n)} tanya={d.n} rupa={rupa} legenda={`diwarnai: kelipatan ${d.b}`} />;
  const lain = d.n + 2 <= d.sampai ? [d.n + 1, d.n + 2] : [d.n - 1, d.n - 2];
  return <TabelBilangan sampai={d.sampai} sorot={[d.n, ...lain]} rupa={rupa} legenda={`akan diwarnai: kelipatan ${d.b}`} />;
}

export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  switch (d.tipe) {
    case "igil":
      return <DeretBunyi d={d} cara={cara} rupa={rupa} />;
    case "lompat":
      return <TampilLompat d={d} rupa={rupa} cara={cara} />;
    case "tabel":
      return <TampilTabel d={d} rupa={rupa} cara={cara} />;
    case "cek":
      return <PitaBagi n={d.n} b={d.b} rupa={rupa} satuan={d.satuan} />;
  }
}
