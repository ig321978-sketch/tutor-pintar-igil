"use client";

import React from "react";
import { DIAGRAM } from "./diagram-data";
import { barisKartu, dasarDari, garisBantu, judulKartu, ketGambar, sorotBatang, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";
import { angkaSumbu, rancang, type Diagram } from "./logika-data";

/**
 * Gambar tugas CPA Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi": papan data bazar beremoji lama (Concrete), diagram polos tanpa emoji (Pictorial),
 * dan kartu tabel panitia tanpa gambar (Abstract). Diagram digambar dari geometri murni (logika-data.ts): ujung batang tepat pada garis skala,
 * angka sumbu tidak bertabrakan, sumbu diberi satuan. Tanpa skor dan tanpa jaringan.
 */

type RupaGambar = "benda" | "diagram";
const WARNA = {
  benda: { garis: "#92400E", latar: "#FEF3C7", gridG: "#D6B98A", sumbu: "#78350F" },
  diagram: { garis: "#1D4ED8", latar: "#EFF6FF", gridG: "#BFDBFE", sumbu: "#1E3A8A" },
} as const;
export const WARNA_BATANG = ["#F97316", "#FACC15", "#22C55E", "#38BDF8", "#A78BFA"];
const pecah = (nama: string): string[] => (nama.includes(" ") ? [nama.slice(0, nama.indexOf(" ")), nama.slice(nama.indexOf(" ") + 1)] : [nama]);

export type OpsiDiagram = {
  d: Diagram;
  rupa: RupaGambar;
  /** Batang yang diberi garis tebal merah. */
  sorot?: number[];
  /** Garis skala ke-k yang digambar putus-putus merah menyeberangi diagram. */
  garisBantuK?: number | null;
  /** Label di atas (tegak) atau di kanan (datar) tiap batang, mis. "?" pada Infografis. Jika diberikan, tiap batang menjadi tombol. */
  label?: Record<number, string>;
  onBatang?: (i: number) => void;
};

/** Diagram batang digambar SVG dari geometri murni. */
export function DiagramSvg({ d, rupa, sorot = [], garisBantuK = null, label, onBatang }: OpsiDiagram) {
  const w = WARNA[rupa];
  const g = rancang(d);
  const tegak = g.arah === "tegak";
  const isi = (i: number) => (rupa === "benda" ? WARNA_BATANG[i % WARNA_BATANG.length] : "#93C5FD");
  const angka = angkaSumbu(d);
  return (
    <svg viewBox={`0 0 ${g.lebar} ${g.tinggi}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={`diagram batang ${g.arah}: ${d.judul}, sumbu dalam ${d.satuan}, naik ${d.tingkat} tiap garis`} data-arah={g.arah} data-batang={d.batang.length} data-garis={g.garis.length - 1}>
      <rect x={2} y={2} width={g.lebar - 4} height={g.tinggi - 4} rx={10} fill={w.latar} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.7} />
      {g.garis.map((s) =>
        tegak ? (
          <g key={s.k}>
            <line x1={g.x0} y1={s.pos} x2={g.x1} y2={s.pos} stroke={s.k === 0 ? w.sumbu : w.gridG} strokeWidth={s.k === 0 ? 2 : 1} />
            <text x={g.x0 - 5} y={s.pos + 3.5} textAnchor="end" fontSize={10.5} fontWeight={700} fill={w.sumbu}>
              {angka[s.k]}
            </text>
          </g>
        ) : (
          <g key={s.k}>
            <line x1={s.pos} y1={g.y0} x2={s.pos} y2={g.y1} stroke={s.k === 0 ? w.sumbu : w.gridG} strokeWidth={s.k === 0 ? 2 : 1} />
            {g.jarakGaris >= 17 || s.k === g.garis.length - 1 || (s.k % 2 === 0 && s.k < g.garis.length - 2) ? (
              <text x={s.pos} y={g.y1 + 14} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={w.sumbu}>
                {angka[s.k]}
              </text>
            ) : null}
          </g>
        ),
      )}
      {tegak ? <line x1={g.x0} y1={g.y0} x2={g.x0} y2={g.y1} stroke={w.sumbu} strokeWidth={2} /> : <line x1={g.x0} y1={g.y0} x2={g.x0} y2={g.y1} stroke={w.sumbu} strokeWidth={2} />}
      <text x={tegak ? 3 : g.x1} y={tegak ? 13 : g.tinggi - 12} textAnchor={tegak ? "start" : "end"} fontSize={10.5} fontWeight={900} fill={w.sumbu}>
        {d.satuan}
      </text>
      {garisBantuK !== null ? (
        tegak ? (
          <line x1={g.x0} y1={g.garis[garisBantuK].pos} x2={g.x1} y2={g.garis[garisBantuK].pos} stroke="#DC2626" strokeWidth={1.8} strokeDasharray="5 3" data-garis-bantu={garisBantuK} />
        ) : (
          <line x1={g.garis[garisBantuK].pos} y1={g.y0} x2={g.garis[garisBantuK].pos} y2={g.y1} stroke="#DC2626" strokeWidth={1.8} strokeDasharray="5 3" data-garis-bantu={garisBantuK} />
        )
      ) : null}
      {g.batang.map((b) => {
        const kena = sorot.includes(b.i);
        const cx = tegak ? b.x + b.w / 2 : 0;
        const cy = tegak ? 0 : b.y + b.h / 2;
        const bar = <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill={isi(b.i)} stroke={kena ? "#DC2626" : w.garis} strokeWidth={kena ? 3 : 1.8} data-batang={b.i} data-ujung={b.ujung} data-banyak={b.banyak} />;
        const nama = pecah(b.nama);
        const ikon = d.batang[b.i].ikon;
        const lab = label?.[b.i];
        return (
          <g
            key={b.i}
            role={onBatang ? "button" : undefined}
            aria-label={onBatang ? `Batang ${b.nama}` : undefined}
            tabIndex={onBatang ? 0 : undefined}
            onClick={onBatang ? () => onBatang(b.i) : undefined}
            onKeyDown={onBatang ? (e) => (e.key === "Enter" || e.key === " " ? onBatang(b.i) : undefined) : undefined}
            style={onBatang ? { cursor: "pointer" } : undefined}
          >
            {bar}
            {tegak ? (
              <>
                {ikon && rupa === "benda" ? (
                  <text x={cx} y={g.y1 + 15} textAnchor="middle" fontSize={14}>
                    {ikon}
                  </text>
                ) : null}
                {nama.map((n, j) => (
                  <text key={j} x={cx} y={g.y1 + (ikon && rupa === "benda" ? 29 : 16) + j * 11} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#1C01A5">
                    {n}
                  </text>
                ))}
                {lab !== undefined ? (
                  <g>
                    <rect x={cx - 18} y={b.y - 24} width={36} height={20} rx={6} fill={lab === "?" ? "#FFFFFF" : "#DCFCE7"} stroke={lab === "?" ? "#B45309" : "#15803D"} strokeWidth={2} strokeDasharray={lab === "?" ? "4 2" : undefined} />
                    <text x={cx} y={b.y - 10} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={lab === "?" ? "#B45309" : "#14532D"}>
                      {lab}
                    </text>
                  </g>
                ) : null}
              </>
            ) : (
              <>
                {ikon && rupa === "benda" ? (
                  <text x={1} y={cy + 5} fontSize={13}>
                    {ikon}
                  </text>
                ) : null}
                {nama.map((n, j) => (
                  <text key={j} x={g.x0 - 4} y={cy + 3.5 + (j - (nama.length - 1) / 2) * 11} textAnchor="end" fontSize={10.5} fontWeight={800} fill="#1C01A5">
                    {n}
                  </text>
                ))}
                {lab !== undefined ? (
                  <g>
                    <rect x={b.ujung + 4} y={cy - 10} width={32} height={20} rx={6} fill={lab === "?" ? "#FFFFFF" : "#DCFCE7"} stroke={lab === "?" ? "#B45309" : "#15803D"} strokeWidth={2} strokeDasharray={lab === "?" ? "4 2" : undefined} />
                    <text x={b.ujung + 20} y={cy + 4} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={lab === "?" ? "#B45309" : "#14532D"}>
                      {lab}
                    </text>
                  </g>
                ) : null}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------ Kartu kata ------------------------------ */
/** Kartu tabel panitia (Abstract): satu baris satu keterangan, tanpa emoji dan tanpa gambar. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="relative mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#B45309] bg-white p-2" role="group" aria-label="Kartu tabel panitia">
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
const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { tingkat: "kartu sumbu", sebut: "kartu arah", telusur: "kartu garis", adu: "kartu adu", putar: "kartu putar" };
const judulKartuDasar = (d: LangkahDasar): string => (d.tipe === "putar" ? (d.hasil === "jumlah" ? "kartu jumlah" : d.hasil === "garis" ? "kartu garis" : "kartu panjang") : NAMA_KARTU[d.tipe]);

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya. */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, judulKartuDasar(d))} baris={barisKartu(d, cara)} />;
  return (
    <div className="space-y-1.5">
      <DiagramSvg d={d.tipe === "putar" && d.diputar ? { ...DIAGRAM[d.d], arah: DIAGRAM[d.d].arah === "tegak" ? "datar" : "tegak" } : DIAGRAM[d.d]} rupa={rupa} sorot={sorotBatang(d)} garisBantuK={garisBantu(d)} />
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
