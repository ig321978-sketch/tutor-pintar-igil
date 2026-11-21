"use client";

import React from "react";
import { barisKartu, dasarDari, garisLipat, kataPec, letakPecahan, potongBagian, tandaGaris, urutTerkecil, sektorLingkaran, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab A (pecahan berpembilang satu, membandingkan, garis pecahan):
 * Concrete = kain putih bermotif bunga beremoji di meja lipat dan garis tali jemuran berjepitan, Pictorial = pita, kertas lipat, dan garis polos di kertas pola,
 * Abstract = kartu kata dan angka. Bagian sama besar, bagian berarsir, garis lipatan, dan tanda pada garis dihitung dari logika murni (potongBagian, tandaGaris, letakPecahan),
 * jadi gambar sungguh sebanyak datanya. Dipakai bersama oleh tugas CPA (LangkahLipat) dan Simulasi Meja Lipat.
 */
const UNGU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda sanggar batik untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_SANGGAR: Record<string, string> = { bunga: "\u{1F338}", benang: "\u{1F9F5}", gunting: "✂", penggaris: "\u{1F4CF}", kertas: "\u{1F4C4}", daun: "\u{1F343}" };

export const WARNA_LIPAT = {
  benda: { latar: "#F5EBDD", garis: "#6D28D9", isi: "#FFFFFF", arsir: "#C4B5FD", tali: "#92400E", angka: UNGU },
  diagram: { latar: "#ECFDF5", garis: "#0F766E", isi: "#FFFFFF", arsir: "#5EEAD4", tali: "#0F766E", angka: "#134E4A" },
} as const;
export const warnaLipat = (rupa: Rupa) => (rupa === "benda" ? WARNA_LIPAT.benda : WARNA_LIPAT.diagram);

export function Gambar({ label, judul, children, rupa = "benda" }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={200} rx={12} fill={warnaLipat(rupa).latar} />
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/** Pecahan bersusun 1/n: pembilang di atas, garis, penyebut di bawah; pusat vertikal cy. `sorot`: bingkai merah di atas pembilang atau penyebut. */
export function PecahanBersusun({ x, cy, atas = "1", bawah, u = 14, warna = UNGU, sorot }: { x: number; cy: number; atas?: string; bawah: string | number; u?: number; warna?: string; sorot?: "atas" | "bawah" }) {
  return (
    <g>
      <text x={x} y={cy - 3} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {atas}
      </text>
      <line x1={x - u * 0.6} y1={cy} x2={x + u * 0.6} y2={cy} stroke={warna} strokeWidth={1.8} />
      <text x={x} y={cy + u} textAnchor="middle" fontSize={u} fontWeight={900} fill={warna}>
        {bawah}
      </text>
      {sorot ? <rect x={x - u * 0.8} y={sorot === "atas" ? cy - u - 2 : cy + 2} width={u * 1.6} height={u + 3} rx={3} fill="none" stroke="#DC2626" strokeWidth={2.4} /> : null}
    </g>
  );
}

/** Satu baris n bagian sama besar (kain atau pita); bagian di `arsir` berwarna. Concrete memberi bunga beremoji pada bagian berarsir. */
export function BarisBagian({ x0, y, lebar, h, n, arsir, rupa, lipat = false, bunga = true }: { x0: number; y: number; lebar: number; h: number; n: number; arsir: readonly number[]; rupa: Rupa; lipat?: boolean; bunga?: boolean }) {
  const w = warnaLipat(rupa);
  const bagian = potongBagian(n, x0, lebar, arsir);
  const lipatan = garisLipat(n, x0, lebar);
  return (
    <g>
      <rect x={x0} y={y} width={lebar} height={h} rx={3} fill={w.isi} stroke={w.garis} strokeWidth={2.2} />
      {bagian.map((b, i) =>
        b.arsir ? (
          <g key={i} data-bagian="arsir">
            <rect x={b.x} y={y} width={b.w} height={h} fill={w.arsir} stroke={w.garis} strokeWidth={1.4} />
            {rupa === "benda" && bunga && b.w >= 18 ? (
              <text x={b.x + b.w / 2} y={y + h / 2 + Math.min(b.w * 0.3, 8)} textAnchor="middle" fontSize={Math.min(b.w * 0.75, h * 0.6, 24)} aria-hidden="true">
                {EMOJI_SANGGAR.bunga}
              </text>
            ) : null}
          </g>
        ) : null,
      )}
      {lipatan.map((gx, i) => (
        <line key={i} data-bagian="garis" x1={gx} y1={y} x2={gx} y2={y + h} stroke={w.garis} strokeWidth={lipat ? 1.6 : 1.3} strokeDasharray={lipat ? "5 3" : undefined} />
      ))}
    </g>
  );
}

/**
 * Taplak atau lingkaran kertas terbagi n bagian sama besar (sektor sama besar dari titik pusat, mulai dari atas searah jarum jam); bagian pertama berarsir.
 * Sektor dihitung dari sudut (lingkaranBagian), jadi gambar sungguh sebanyak datanya. Concrete memberi bunga beremoji pada bagian berarsir.
 */
export function LingkaranBagian({ cx, cy, r, n, rupa }: { cx: number; cy: number; r: number; n: number; rupa: Rupa }) {
  const w = warnaLipat(rupa);
  const bagian = sektorLingkaran(n, cx, cy, r);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={w.isi} stroke={w.garis} strokeWidth={2.2} />
      {bagian.map((b, i) => (
        <g key={i} data-bagian={i === 0 ? "arsir" : "polos"}>
          <path d={b.d} fill={i === 0 ? w.arsir : w.isi} stroke={w.garis} strokeWidth={1.4} strokeLinejoin="round" />
          {rupa === "benda" && i === 0 ? (
            <text x={b.tx} y={b.ty + Math.min(r * 0.12, 6)} textAnchor="middle" fontSize={Math.min(r * 0.42, 22)} aria-hidden="true">
              {EMOJI_SANGGAR.bunga}
            </text>
          ) : null}
        </g>
      ))}
    </g>
  );
}

/** Garis dari nol sampai satu. Concrete = tali jemuran cokelat; Pictorial = garis polos. `tanda`: bagian sama panjang (null = hanya nol dan satu). */
export function GarisBil({ x0, lebar, y, rupa, tanda }: { x0: number; lebar: number; y: number; rupa: Rupa; tanda: number | null }) {
  const w = warnaLipat(rupa);
  const xs = tanda === null ? [x0, x0 + lebar] : tandaGaris(tanda, x0, lebar);
  return (
    <g>
      <line x1={x0 - 6} y1={y} x2={x0 + lebar + 6} y2={y} stroke={w.tali} strokeWidth={rupa === "benda" ? 3.4 : 2.4} strokeLinecap="round" />
      {xs.map((gx, i) => (
        <line key={i} data-tanda="1" x1={gx} y1={y - 6} x2={gx} y2={y + 6} stroke={w.garis} strokeWidth={1.6} />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.angka}>
        0
      </text>
      <text x={x0 + lebar} y={y + 20} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.angka}>
        1
      </text>
    </g>
  );
}

/** Jepitan atau titik penanda pada garis di posisi x, dengan batang sampai tinggi `atas`. */
function Penanda({ x, y, atas, rupa, warna }: { x: number; y: number; atas: number; rupa: Rupa; warna: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={atas} stroke={warna} strokeWidth={1.2} strokeDasharray="2 2" />
      {rupa === "benda" ? <rect x={x - 3} y={y - 9} width={6} height={12} rx={1.5} fill="#FACC15" stroke="#92400E" strokeWidth={1.2} /> : <circle cx={x} cy={y} r={4} fill={warna} stroke="#FFFFFF" strokeWidth={1.2} />}
    </g>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#F9A8D4] bg-[#FFF1F2] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#9D174D]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#500724]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#BE185D] bg-[#FCE7F3] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(157,23,77,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  arsir: "pecahan dari bagian",
  pita: "membandingkan pecahan",
  berat: "membandingkan berat",
  lipat: "membagi sama besar",
  garisUrut: "urutan pecahan",
  garisBagi: "penyebut pada garis",
  garisSisi: "letak pecahan",
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
  const w = warnaLipat(rupa);
  const benda = rupa === "benda";
  switch (d.tipe) {
    case "arsir":
      return (
        <Gambar
          rupa={rupa}
          label={d.bentuk === "lingkaran" ? "Satu bagian berarsir dari lingkaran yang dibagi sama besar" : "Satu bagian berarsir dari bagian-bagian sama besar"}
          judul={d.bentuk === "lingkaran" ? (benda ? "taplak bundar bagian sama besar" : "lingkaran bagian sama besar") : benda ? "kain dilipat bagian sama besar" : "bagian sama besar"}
        >
          {d.bentuk === "lingkaran" ? (
            <LingkaranBagian cx={150} cy={86} r={52} n={d.n} rupa={rupa} />
          ) : (
            <>
              {benda ? <rect x={22} y={126} width={256} height={8} rx={2} fill="#B7814A" stroke="#6B4423" strokeWidth={1.2} /> : null}
              <BarisBagian x0={30} y={62} lebar={240} h={64} n={d.n} arsir={[0]} rupa={rupa} />
            </>
          )}
          {cara === "suara" ? (
            <PecahanBersusun x={150} cy={160} bawah={d.n} u={17} warna={w.angka} sorot={d.istilah === "penyebut" ? "bawah" : "atas"} />
          ) : (
            <text x={150} y={158} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.garis}>
              satu bagian berarsir
            </text>
          )}
        </Gambar>
      );
    case "pita": {
      const x0 = 74;
      const lebar = 200;
      return (
        <Gambar rupa={rupa} label="Dua pita bagian sama besar, yang atas dan yang bawah" judul={benda ? "dua pita kain" : "dua pita"}>
          <PecahanBersusun x={38} cy={62} bawah={d.a} warna={w.angka} />
          <PecahanBersusun x={38} cy={122} bawah={d.b} warna={w.angka} />
          <BarisBagian x0={x0} y={44} lebar={lebar} h={36} n={d.a} arsir={[0]} rupa={rupa} bunga={false} />
          <BarisBagian x0={x0} y={104} lebar={lebar} h={36} n={d.b} arsir={[0]} rupa={rupa} bunga={false} />
          <line x1={letakPecahan(d.a, x0, lebar)} y1={40} x2={letakPecahan(d.a, x0, lebar)} y2={150} stroke="#DC2626" strokeWidth={1.6} strokeDasharray="4 3" />
          <line x1={letakPecahan(d.b, x0, lebar)} y1={40} x2={letakPecahan(d.b, x0, lebar)} y2={150} stroke="#2563EB" strokeWidth={1.6} strokeDasharray="4 3" />
          <text x={150} y={176} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.garis}>
            bagian berarsir kedua pita dibandingkan
          </text>
        </Gambar>
      );
    }
    case "berat": {
      const x0 = 74;
      const lebar = 190;
      const bahan = [
        { nama: "malam", n: d.a, y: 50, emoji: "\u{1F9C8}" },
        { nama: "pewarna", n: d.b, y: 110, emoji: "\u{1F3A8}" },
      ];
      return (
        <Gambar rupa={rupa} label="Dua batang satu kilogram, malam dan pewarna, masing-masing dibagi bagian sama besar dengan satu bagian berarsir" judul={benda ? "malam dan pewarna ditimbang" : "dua bahan ditimbang"}>
          {bahan.map((b) => (
            <g key={b.nama} data-bahan={b.nama}>
              <text x={x0} y={b.y - 5} fontSize={10} fontWeight={900} fill={w.garis}>
                {benda ? `${b.emoji} ` : ""}
                {b.nama}
              </text>
              <PecahanBersusun x={38} cy={b.y + 18} bawah={b.n} warna={w.angka} />
              <text x={56} y={b.y + 29} fontSize={10} fontWeight={900} fill={w.angka}>
                kg
              </text>
              <BarisBagian x0={x0} y={b.y} lebar={lebar} h={36} n={b.n} arsir={[0]} rupa={rupa} bunga={false} />
            </g>
          ))}
          <text x={150} y={176} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.garis}>
            satu batang penuh = 1 kg
          </text>
        </Gambar>
      );
    }
    case "lipat": {
      const x0 = 40;
      const lebar = 220;
      const nama = benda ? "kain" : "kertas";
      return (
        <Gambar rupa={rupa} label={`Dua ${nama} dilipat menjadi bagian sama besar, satu bagian berarsir`} judul={benda ? "dua kain dilipat" : "dua kertas dilipat"}>
          <text x={x0} y={36} fontSize={9} fontWeight={900} fill={w.garis}>
            {nama} pertama
          </text>
          <BarisBagian x0={x0} y={40} lebar={lebar} h={44} n={d.p} arsir={[0]} rupa={rupa} lipat />
          <text x={x0} y={108} fontSize={9} fontWeight={900} fill={w.garis}>
            {nama} kedua
          </text>
          <BarisBagian x0={x0} y={112} lebar={lebar} h={44} n={d.q} arsir={[0]} rupa={rupa} lipat />
          <text x={150} y={182} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.garis}>
            garis putus-putus = garis lipatan
          </text>
        </Gambar>
      );
    }
    case "garisUrut": {
      const x0 = 30;
      const lebar = 240;
      const y = 140;
      const urut = urutTerkecil(d.urut);
      const tinggi = [96, 72, 48];
      return (
        <Gambar rupa={rupa} label="Tiga pecahan pada garis dari nol sampai satu" judul={benda ? "tali jemuran dari 0 sampai 1" : "garis dari 0 sampai 1"}>
          <GarisBil x0={x0} lebar={lebar} y={y} rupa={rupa} tanda={null} />
          {urut.map((pen, i) => {
            const x = letakPecahan(pen, x0, lebar);
            return (
              <g key={pen}>
                <Penanda x={x} y={y} atas={tinggi[i] + 14} rupa={rupa} warna={["#DC2626", "#2563EB", "#16A34A"][i]} />
                <PecahanBersusun x={x} cy={tinggi[i] - 2} bawah={pen} u={12} warna={w.angka} />
              </g>
            );
          })}
        </Gambar>
      );
    }
    case "garisBagi": {
      const x0 = 30;
      const lebar = 240;
      const y = 110;
      return (
        <Gambar rupa={rupa} label="Garis dari nol sampai satu dibagi bagian sama panjang, satu titik ditandai" judul={benda ? "tali jemuran dibagi sama panjang" : "garis dibagi sama panjang"}>
          <GarisBil x0={x0} lebar={lebar} y={y} rupa={rupa} tanda={d.n} />
          <Penanda x={letakPecahan(d.n, x0, lebar)} y={y} atas={y - 30} rupa={rupa} warna="#DC2626" />
          <text x={150} y={170} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.garis}>
            satu titik ditandai pada garis
          </text>
        </Gambar>
      );
    }
    case "garisSisi": {
      const x0 = 30;
      const lebar = 240;
      const y = 104;
      return (
        <Gambar rupa={rupa} label={`Satu titik pada garis dari nol sampai satu, pecahan lain ${kataPec(d.b)}`} judul={benda ? "tali jemuran dari 0 sampai 1" : "garis dari 0 sampai 1"}>
          <GarisBil x0={x0} lebar={lebar} y={y} rupa={rupa} tanda={d.a} />
          <Penanda x={letakPecahan(d.a, x0, lebar)} y={y} atas={y - 22} rupa={rupa} warna="#DC2626" />
          <PecahanBersusun x={letakPecahan(d.a, x0, lebar)} cy={y - 40} bawah={d.a} u={12} warna={w.angka} />
          <text x={104} y={174} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.garis}>
            pecahan lain:
          </text>
          <PecahanBersusun x={170} cy={170} bawah={d.b} u={12} warna={w.angka} />
        </Gambar>
      );
    }
  }
}
