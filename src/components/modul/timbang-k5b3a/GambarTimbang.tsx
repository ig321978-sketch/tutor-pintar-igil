"use client";

import React from "react";
import {
  barisKartu,
  dasarDari,
  kpkPenyebut,
  pecGaris,
  teksTitik,
  type Cara,
  type Langkah,
  type LangkahDasar,
  type LCampuran,
  type LGaris,
  type LIgil,
  type LPenyebut,
  type Rupa,
} from "./logika-cpa";
import { TATA_GARIS, banyakBaris, selBar, tandaGaris, xGaris, type Pec } from "./logika-data";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab A (membandingkan dan mengurutkan pecahan):
 * Concrete = etalase roti (loyang berisi potongan roti beremoji, tali bilangan roti), Pictorial = kertas bar pecahan polos (bar berarsir dan garis bilangan; tanpa emoji),
 * Abstract = kartu kata dan angka bercap Toko Roti Keliling (tanpa gambar). Semua bentuk DIGAMBAR dari bilangan lewat logika-data.ts: sel bar berarsir sebanyak pembilang
 * dan bilangan bulat penuh, serta tanda garis bilangan tiap 1/q. Dipakai bersama oleh tugas CPA (LangkahTimbang) dan Simulasi Garis Timbang.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

export const WARNA_TIMBANG = {
  benda: { latar: "#FFF1F2", garis: "#9F1239", angka: "#4C0519", sel: "#FFFFFF", isi: "#FDE68A", tepi: "#B45309", sorot: "#FDA4AF", titik: "#BE123C" },
  diagram: { latar: "#F1F5F9", garis: "#334155", angka: "#0F172A", sel: "#FFFFFF", isi: "#93C5FD", tepi: "#1D4ED8", sorot: "#E2E8F0", titik: "#B91C1C" },
} as const;
export const warnaTimbang = (rupa: Rupa) => (rupa === "benda" ? WARNA_TIMBANG.benda : WARNA_TIMBANG.diagram);

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 140 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  const w = warnaTimbang(rupa);
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={w.latar} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={i * 30} y={0} width={30} height={5} fill={i % 2 === 0 ? "#F472B6" : "#FFFFFF"} />
          ))}
        </g>
      ) : null}
      <text x={150} y={19} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/* ------------------------------ Pecahan bertumpuk di SVG ------------------------------ */
/** Pecahan bertumpuk berpusat di (x, y): bilangan bulat di kiri (bila ada), pembilang di atas garis, penyebut di bawah. `tanya` menggantikan seluruhnya dengan tanda tanya. */
export function PecahanSvg({ f, x, y, u = 11.5, warna, tanya = false }: { f: Pec; x: number; y: number; u?: number; warna: string; tanya?: boolean }) {
  if (tanya)
    return (
      <text x={x} y={y + 4} textAnchor="middle" fontSize={u + 3} fontWeight={900} fill="#B91C1C">
        ?
      </text>
    );
  const lebarPecahan = Math.max(String(f.p).length, String(f.q).length) * u * 0.62 + 4;
  const lebarBulat = f.w > 0 ? String(f.w).length * (u + 2) * 0.62 + 3 : 0;
  const kiri = x - (lebarPecahan + lebarBulat) / 2;
  const px = kiri + lebarBulat + lebarPecahan / 2;
  return (
    <g data-pecahan={f.w > 0 ? `${f.w} ${f.p}/${f.q}` : `${f.p}/${f.q}`}>
      {f.w > 0 ? (
        <text x={kiri + lebarBulat / 2} y={y + 5} textAnchor="middle" fontSize={u + 2} fontWeight={900} fill={warna}>
          {f.w}
        </text>
      ) : null}
      <text x={px} y={y - 2.5} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {f.p}
      </text>
      <line x1={px - lebarPecahan / 2} y1={y} x2={px + lebarPecahan / 2} y2={y} stroke={warna} strokeWidth={1.4} />
      <text x={px} y={y + u - 0.5} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {f.q}
      </text>
    </g>
  );
}

/* ------------------------------ Bar pecahan (model arsir) ------------------------------ */
/** Bar pecahan f: w bar penuh dan satu bar sebagian, tiap bar q sel sama lebar mulai (x, y). Benda = potongan roti beremoji, diagram = sel berarsir polos. */
export function BarPecahan({ f, x, y, lebar, rupa, tinggiSel = 16, jarak = 2 }: { f: Pec; x: number; y: number; lebar: number; rupa: Rupa; tinggiSel?: number; jarak?: number }) {
  const w = warnaTimbang(rupa);
  const benda = rupa === "benda";
  const sel = lebar / f.q;
  const sel0 = selBar(f);
  return (
    <g data-bar={f.q} data-baris={banyakBaris(f)} data-isi={sel0.filter((s) => s.isi).length}>
      {sel0.map((s) => {
        const sx = x + s.kolom * sel;
        const sy = y + s.baris * (tinggiSel + jarak);
        return (
          <g key={`${s.baris}-${s.kolom}`} data-sel={s.isi ? "1" : "0"}>
            <rect x={sx + 0.5} y={sy} width={sel - 1} height={tinggiSel} rx={benda ? 3 : 1} fill={s.isi ? w.isi : w.sel} stroke={s.isi ? w.tepi : w.garis} strokeWidth={s.isi ? 1.4 : 1} strokeDasharray={s.isi ? undefined : "3 2"} />
            {benda && s.isi ? (
              <text x={sx + sel / 2} y={sy + tinggiSel - 2.2} textAnchor="middle" fontSize={Math.min(14, sel - 2, tinggiSel)}>
                {"\u{1F35E}"}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Dua susunan (igil) ------------------------------ */
/** Dua pecahan berdampingan sebagai susunan bar: label pecahan bertumpuk di atas tiap susunan. */
export function DuaSusunan({ d, rupa }: { d: LIgil; rupa: Rupa }) {
  const w = warnaTimbang(rupa);
  const baris = Math.max(banyakBaris(d.a), banyakBaris(d.b));
  const tinggi = 78 + baris * 18 + 8;
  return (
    <Gambar rupa={rupa} label={`${rupa === "benda" ? "Dua susunan loyang roti" : "Dua susunan bar"}: ${d.a.w > 0 ? `${d.a.w} ` : ""}${d.a.p} per ${d.a.q} dan ${d.b.w > 0 ? `${d.b.w} ` : ""}${d.b.p} per ${d.b.q} ${d.satuan}`} judul={`dua wadah (${d.satuan})`} tinggi={tinggi}>
      <g data-susunan="dua">
        {[d.a, d.b].map((f, j) => {
          const x0 = j === 0 ? 12 : 158;
          return (
            <g key={j} data-wadah={j + 1}>
              <text x={x0 + 65} y={36} textAnchor="middle" fontSize={14} fontWeight={800} fill={w.angka}>
                {j === 0 ? "wadah pertama" : "wadah kedua"}
              </text>
              <PecahanSvg f={f} x={x0 + 65} y={57} u={14.5} warna={w.angka} />
              <BarPecahan f={f} x={x0} y={78} lebar={130} rupa={rupa} />
            </g>
          );
        })}
      </g>
    </Gambar>
  );
}

/* ------------------------------ Garis bilangan (garis) ------------------------------ */
/** Garis bilangan 0 sampai maks, tiap satuan dibagi q bagian: tanda kecil tiap 1/q, tanda besar dan angka pada tiap bilangan bulat. `titik` = tanda yang diberi penanda (dengan label pecahan atau tanda tanya). */
export function GarisBilangan({ q, maks, titik, rupa, label, buat, rahasia = false }: { q: number; maks: number; titik: { i: number; nama?: string; tanya?: boolean; polos?: boolean }[]; rupa: Rupa; label?: string; buat?: number; rahasia?: boolean }) {
  const w = warnaTimbang(rupa);
  const benda = rupa === "benda";
  const tanda = tandaGaris(maks, q);
  return (
    <Gambar rupa={rupa} label={label ?? (rahasia ? `${benda ? "Tali bilangan roti" : "Garis bilangan"} nol sampai ${maks}` : `${benda ? "Tali bilangan roti" : "Garis bilangan"} nol sampai ${maks}, tiap satuan dibagi ${q} bagian`)} judul={benda ? "tali bilangan roti" : "garis bilangan"} tinggi={118}>
      <g data-garis="bilangan" data-maks={maks} data-q={q}>
        <line x1={TATA_GARIS.x0 - 6} y1={86} x2={TATA_GARIS.x1 + 6} y2={86} stroke={w.garis} strokeWidth={2.2} />
        {tanda.map((t) => {
          const x = xGaris(t.i, maks, q);
          const dipilih = buat !== undefined && t.i <= buat;
          return (
            <g key={t.i} data-tanda={t.i}>
              <line x1={x} y1={t.bulat ? 78 : 82} x2={x} y2={t.bulat ? 94 : 90} stroke={dipilih && !t.bulat ? w.titik : w.garis} strokeWidth={t.bulat ? 2 : 1.2} />
              {t.bulat ? (
                <text x={x} y={110} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.angka}>
                  {t.i / q}
                </text>
              ) : null}
            </g>
          );
        })}
        {titik.map((p, j) => {
          const x = xGaris(p.i, maks, q);
          const f = pecGaris(p.i, q);
          const bulat = p.i % q === 0;
          const atas = j % 2 === 0 ? 40 : 58;
          return (
            <g key={`${p.i}-${j}`} data-titik={p.i}>
              <line x1={x} y1={atas + 18} x2={x} y2={80} stroke={w.titik} strokeWidth={1.2} strokeDasharray="3 2" />
              {benda ? (
                <text x={x} y={86 + 4} textAnchor="middle" fontSize={15}>
                  {"\u{1F35E}"}
                </text>
              ) : (
                <circle cx={x} cy={86} r={4.8} fill={w.titik} stroke="#FFFFFF" strokeWidth={1.4} />
              )}
              {p.nama ? (
                <text x={x - (p.tanya ? 14 : bulat ? 12 : 20)} y={atas + 4} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.titik}>
                  {p.nama}
                </text>
              ) : null}
              {p.polos ? null : bulat && !p.tanya ? (
                <text x={x + 4} y={atas + 4} textAnchor="middle" fontSize={14.5} fontWeight={900} fill={w.angka}>
                  {p.i / q}
                </text>
              ) : (
                <PecahanSvg f={f} x={x + (p.nama ? 4 : 0)} y={atas} u={14.5} warna={w.angka} tanya={p.tanya} />
              )}
            </g>
          );
        })}
      </g>
    </Gambar>
  );
}

/* ------------------------------ Dua bar (penyebut) ------------------------------ */
/** Dua pecahan biasa dengan penyebut berbeda: bar pertama dan kedua sejajar, tiap bar dibagi sebanyak penyebutnya. */
export function DuaBar({ d, rupa }: { d: LPenyebut; rupa: Rupa }) {
  const w = warnaTimbang(rupa);
  return (
    <Gambar rupa={rupa} label={`${rupa === "benda" ? "Dua loyang roti" : "Dua bar pecahan"}: ${d.a.p} per ${d.a.q} dan ${d.b.p} per ${d.b.q} ${d.satuan}`} judul={`dua pecahan (${d.satuan})`} tinggi={128}>
      <g data-bar="dua">
        {[d.a, d.b].map((f, j) => {
          const y = 34 + j * 42;
          return (
            <g key={j}>
              <PecahanSvg f={f} x={38} y={y + 9} u={15} warna={w.angka} />
              <BarPecahan f={f} x={76} y={y} lebar={208} rupa={rupa} tinggiSel={24} />
            </g>
          );
        })}
        <text x={150} y={122} textAnchor="middle" fontSize={14} fontWeight={800} fill={w.angka}>
          {`penyebut ${d.a.q} dan ${d.b.q}`}
        </text>
      </g>
    </Gambar>
  );
}

/* ------------------------------ Loyang campuran (campuran) ------------------------------ */
/** Pecahan campuran f: w bar penuh dan satu bar sebagian, label pecahan campuran bertumpuk di kiri. */
export function LoyangCampuran({ d, rupa }: { d: LCampuran; rupa: Rupa }) {
  const w = warnaTimbang(rupa);
  const baris = banyakBaris(d.f);
  const tinggi = 52 + baris * 18 + 24;
  return (
    <Gambar rupa={rupa} label={`${rupa === "benda" ? "Loyang roti" : "Bar pecahan"}: ${d.f.w} ${d.f.p} per ${d.f.q} ${d.satuan}`} judul={`${rupa === "benda" ? "loyang" : "bar"} (${d.satuan})`} tinggi={tinggi}>
      <g data-loyang="campuran">
        <PecahanSvg f={d.f} x={44} y={44 + (baris * 18) / 2 - 8} u={15} warna={w.angka} />
        <BarPecahan f={d.f} x={96} y={38} lebar={180} rupa={rupa} tinggiSel={16} jarak={2} />
        <text x={150} y={tinggi - 8} textAnchor="middle" fontSize={14} fontWeight={800} fill={w.angka}>
          {`penyebut ${d.f.q}`}
        </text>
      </g>
    </Gambar>
  );
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#FDA4AF] bg-[#FFF1F2] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#9F1239]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#4C0519]">
          <TeksPecahan t={b} />
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#9F1239] bg-[#FFE4E6] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(159,18,57,0.12) 0 1px,transparent 1px 22px)" }}>
    <span className="absolute right-2 top-0.5 -rotate-6 rounded border-2 border-[#9F1239] px-1 text-[10px] font-black text-[#9F1239]" aria-hidden="true">
      TOKO ROTI KELILING
    </span>
    <div className="pt-5">{children}</div>
  </div>
);

/** Teks dengan pecahan "3/4" dan "2 3/4" digambar bertumpuk (pembilang di atas garis, penyebut di bawah) di dalam kalimat. */
export function TeksPecahan({ t }: { t: string }) {
  const bagian = t.split(/(\d+ \d+\/\d+|\d+\/\d+)/g);
  return (
    <>
      {bagian.map((b, i) => {
        const m = /^(?:(\d+) )?(\d+)\/(\d+)$/.exec(b);
        if (!m) return <React.Fragment key={i}>{b}</React.Fragment>;
        return (
          <span key={i} className="mx-[1px] inline-flex items-center align-middle font-black" aria-label={`${m[1] ? `${m[1]} ` : ""}${m[2]} per ${m[3]}`}>
            {m[1] ? <span className="mr-[2px]">{m[1]}</span> : null}
            <span className="inline-flex flex-col items-center text-center leading-none">
              <span className="border-b-[1.5px] border-current px-[2px] text-[0.8em]">{m[2]}</span>
              <span className="px-[2px] text-[0.8em]">{m[3]}</span>
            </span>
          </span>
        );
      })}
    </>
  );
}

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  igil: "membandingkan pecahan",
  garis: "garis bilangan",
  penyebut: "menyamakan penyebut",
  campuran: "campuran menjadi biasa",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
function TampilGaris({ d, rupa, cara }: { d: LGaris; rupa: Rupa; cara: Cara }) {
  if (cara === "klik") return <GarisBilangan q={d.q} maks={d.maks} rupa={rupa} titik={[{ i: d.n, tanya: true }]} />;
  if (cara === "kanvas") return <GarisBilangan q={d.q} maks={d.maks} rupa={rupa} titik={[{ i: d.n, polos: true }]} rahasia />;
  return (
    <GarisBilangan
      q={d.q}
      maks={d.maks}
      rupa={rupa}
      titik={[
        { i: d.n, nama: "A" },
        { i: d.m, nama: "B" },
      ]}
    />
  );
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
      return <DuaSusunan d={d} rupa={rupa} />;
    case "garis":
      return <TampilGaris d={d} rupa={rupa} cara={cara} />;
    case "penyebut":
      return <DuaBar d={d} rupa={rupa} />;
    case "campuran":
      return <LoyangCampuran d={d} rupa={rupa} />;
  }
}

export { kpkPenyebut, teksTitik };
