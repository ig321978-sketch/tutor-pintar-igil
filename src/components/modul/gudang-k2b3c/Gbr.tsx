"use client";

import React from "react";
import { BENDA, FAKTA, bendaDari, besar, type Bangun, type Datar, type LangkahNama, type Rupa } from "./logika";

/**
 * Gambar Kelas 2 Bab 3 Sub-Bab C. Concrete: benda berwarna dengan emoji. Pictorial: bentuk polos (bangun ruang dan bangun datar) tanpa emoji.
 * Abstract: kata dan kalimat saja.
 */
const BIRU = "#1C01A5";
const ISI = "#E2E8F0";
const ISI_ATAS = "#F8FAFC";
const ISI_SISI = "#CBD5E1";

/** Bentuk polos berukuran `ukuran` piksel: bangun ruang (kubus, balok, tabung, kerucut, bola) atau bangun datar. */
export function Bentuk({ bangun, datar, ukuran = 64, sorot, label }: { bangun?: Bangun; datar?: Datar; ukuran?: number; sorot?: boolean; label?: string }) {
  const garis = sorot ? "#B45309" : BIRU;
  const tebal = sorot ? 3.4 : 2;
  const sp = { stroke: garis, strokeWidth: tebal, strokeLinejoin: "round" as const };
  let isi: React.ReactNode = null;
  if (bangun === "kubus")
    isi = (
      <g>
        <polygon points="8,22 20,10 52,10 40,22" fill={ISI_ATAS} {...sp} />
        <polygon points="40,22 52,10 52,42 40,54" fill={ISI_SISI} {...sp} />
        <rect x={8} y={22} width={32} height={32} fill={ISI} {...sp} />
      </g>
    );
  else if (bangun === "balok")
    isi = (
      <g>
        <polygon points="6,28 18,16 58,16 46,28" fill={ISI_ATAS} {...sp} />
        <polygon points="46,28 58,16 58,40 46,52" fill={ISI_SISI} {...sp} />
        <rect x={6} y={28} width={40} height={24} fill={ISI} {...sp} />
      </g>
    );
  else if (bangun === "tabung")
    isi = (
      <g>
        <path d="M14 14 V48 A18 7 0 0 0 50 48 V14" fill={ISI} {...sp} />
        <ellipse cx={32} cy={14} rx={18} ry={7} fill={ISI_ATAS} {...sp} />
      </g>
    );
  else if (bangun === "kerucut")
    isi = (
      <g>
        <path d="M32 6 L14 50 A18 7 0 0 0 50 50 Z" fill={ISI} {...sp} />
        <path d="M14 50 A18 7 0 0 0 50 50" fill="none" stroke={garis} strokeWidth={tebal} />
      </g>
    );
  else if (bangun === "bola")
    isi = (
      <g>
        <circle cx={32} cy={32} r={24} fill={ISI} {...sp} />
        <ellipse cx={32} cy={32} rx={24} ry={7} fill="none" stroke={garis} strokeWidth={1.2} strokeDasharray="3 3" />
      </g>
    );
  else if (datar === "segitiga") isi = <polygon points="32,10 56,54 8,54" fill={ISI} {...sp} />;
  else if (datar === "lingkaran") isi = <circle cx={32} cy={32} r={24} fill={ISI} {...sp} />;
  else if (datar === "persegi") isi = <rect x={12} y={12} width={40} height={40} fill={ISI} {...sp} />;
  else if (datar === "persegi panjang") isi = <rect x={5} y={18} width={54} height={28} fill={ISI} {...sp} />;
  return (
    <svg viewBox="0 0 64 64" width={ukuran} height={ukuran} role="img" aria-label={label ?? bangun ?? datar ?? "bentuk"} className="shrink-0">
      {isi}
    </svg>
  );
}

const HURUF = "ABCDEFGHIJ";
/** Satu kartu benda (daftar id benda): benda berwarna (Concrete), bentuk polos berhuruf (Pictorial), atau kata (Abstract). */
export function KartuBenda({
  id,
  rupa,
  nomor,
  sorot,
  mati,
  onKlik,
  ukuran = 56,
}: {
  id: string;
  rupa: Rupa;
  nomor: number;
  sorot?: boolean;
  mati?: boolean;
  onKlik?: () => void;
  ukuran?: number;
}) {
  const b = bendaDari(id);
  const isi =
    rupa === "benda" ? (
      <>
        <span className="text-3xl leading-none" aria-hidden="true">
          {b.emoji}
        </span>
        <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{b.nama}</span>
      </>
    ) : rupa === "diagram" ? (
      <>
        <Bentuk bangun={b.bangun} datar={b.datar} ukuran={ukuran} sorot={sorot} label={`gambar ${HURUF[nomor]}`} />
        <span className="text-xs font-black text-[#1C01A5]">{HURUF[nomor]}</span>
      </>
    ) : (
      <span className="text-sm font-black text-[#1C01A5]">{b.nama}</span>
    );
  const gaya = `flex min-h-[64px] min-w-[72px] flex-col items-center justify-center gap-0.5 rounded-xl border-4 px-1.5 py-1 text-center ${sorot ? "border-[#B45309] ring-2 ring-[#FACC15]" : "border-[#1C01A5]"} ${mati ? "opacity-30" : ""}`;
  const warna = rupa === "benda" ? b.warna : "#FFFFFF";
  if (onKlik)
    return (
      <button type="button" onClick={onKlik} disabled={mati} aria-pressed={sorot} className={gaya} style={{ background: warna }}>
        {isi}
      </button>
    );
  return (
    <div className={gaya} style={{ background: warna }}>
      {isi}
    </div>
  );
}

export function DeretBenda({ isi, rupa, pilih, mati, onKlik }: { isi: string[]; rupa: Rupa; pilih?: number; mati?: number[]; onKlik?: (i: number) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {isi.map((id, i) => (
        <KartuBenda key={`${id}-${i}`} id={id} rupa={rupa} nomor={i} sorot={pilih === i} mati={mati?.includes(i)} onKlik={onKlik ? () => onKlik(i) : undefined} />
      ))}
    </div>
  );
}

/** Wakil benda untuk sebuah bangun (Concrete): benda pertama bangun itu. */
export const bendaUntuk = (b: Bangun) => BENDA.find((x) => x.bangun === b) ?? BENDA[0];

/** Bangun ruang yang dilihat: benda berwarna (Concrete), model polos (Pictorial), atau kata (Abstract). */
export function GambarBangun({ bangun, rupa, ukuran = 72 }: { bangun: Bangun; rupa: Rupa; ukuran?: number }) {
  if (rupa === "diagram") return <Bentuk bangun={bangun} ukuran={ukuran} />;
  if (rupa === "benda") {
    const b = bendaUntuk(bangun);
    return (
      <div className="flex flex-col items-center rounded-xl border-4 border-[#1C01A5] px-3 py-1" style={{ background: b.warna }}>
        <span className="text-4xl" aria-hidden="true">
          {b.emoji}
        </span>
        <span className="text-xs font-black text-[#1C01A5]">{b.nama}</span>
      </div>
    );
  }
  return <p className="rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1 text-base font-black text-[#1C01A5]">Bangun ruang: {bangun}</p>;
}

/** Daftar petunjuk: chip beremoji (Concrete), tabel (Pictorial), atau kalimat (Abstract). */
export function DaftarCiri({ judul, baris, rupa, ikon }: { judul: string; baris: string[]; rupa: Rupa; ikon: string }) {
  if (rupa === "diagram")
    return (
      <table className="mx-auto w-full max-w-sm border-collapse text-sm font-black text-[#1C01A5]">
        <thead>
          <tr>
            <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-2 py-1 text-left" colSpan={2}>
              {judul}
            </th>
          </tr>
        </thead>
        <tbody>
          {baris.map((b, i) => (
            <tr key={b}>
              <td className="w-8 border-2 border-[#1C01A5] bg-white px-2 py-1 text-center">{i + 1}</td>
              <td className="border-2 border-[#1C01A5] bg-white px-2 py-1">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  if (rupa === "lambang")
    return (
      <div className="mx-auto max-w-sm space-y-1 rounded-xl border-4 border-[#1C01A5] bg-white p-2 text-sm font-black text-[#1C01A5]">
        <p className="text-[#7C3AED]">{judul}</p>
        {baris.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </div>
    );
  return (
    <div className="mx-auto max-w-sm space-y-1">
      <p className="text-center text-sm font-black text-[#7C3AED]">
        <span aria-hidden="true">{ikon}</span> {judul}
      </p>
      {baris.map((b) => (
        <p key={b} className="rounded-xl border-2 border-[#1C01A5] bg-[#FEF9C3] px-2 py-1 text-sm font-black text-[#1C01A5]">
          {b}
        </p>
      ))}
    </div>
  );
}

const sebutBanyak = (n: number, jenis: string): string => (n === 0 ? `tidak ada permukaan ${jenis}` : `${n} permukaan ${jenis}`);

/** Petunjuk soal nama bangun: ciri tas, hasil cetak, tampak atas dan samping, atau dua pertanyaan (bisa diisi dan menggelinding). */
export function PetunjukNama({ l, rupa }: { l: LangkahNama; rupa: Rupa }) {
  const f = FAKTA[l.bangun];
  if (l.petunjuk === "tas")
    return (
      <div className="space-y-2">
        {rupa === "benda" ? (
          <p className="text-center text-5xl" aria-hidden="true">
            {"\u{1F45C}"}
            <span className="text-3xl font-black text-[#7C3AED]">?</span>
          </p>
        ) : null}
        <DaftarCiri judul="Ciri yang diraba" baris={f.ciri} rupa={rupa} ikon={"\u{1F90F}"} />
      </div>
    );
  if (l.petunjuk === "cetak")
    return (
      <div className="space-y-2">
        {rupa === "diagram" ? (
          <div className="flex flex-wrap items-center justify-center gap-3" aria-label="Hasil cetak">
            {f.cetak.length ? f.cetak.map((d, i) => <Bentuk key={i} datar={d} ukuran={56} />) : <p className="text-sm font-black text-[#1C01A5]">tidak ada hasil cetak</p>}
          </div>
        ) : null}
        <DaftarCiri judul="Hasil cetak di kertas" baris={[f.cetak.length ? `bentuk cetakannya: ${[...new Set(f.cetak)].join(" dan ")}` : "tidak ada bentuk yang tercetak", besar(f.cetakCiri)]} rupa={rupa} ikon={"\u{1F4C4}"} />
      </div>
    );
  if (l.petunjuk === "pandang")
    return (
      <div className="space-y-2">
        {rupa === "diagram" ? (
          <div className="flex items-end justify-center gap-6" aria-label="Tampak atas dan tampak samping">
            <div className="text-center">
              <Bentuk datar={f.atas} ukuran={60} />
              <p className="text-xs font-black text-[#1C01A5]">dari atas</p>
            </div>
            <div className="text-center">
              <Bentuk datar={f.samping} ukuran={60} />
              <p className="text-xs font-black text-[#1C01A5]">dari samping</p>
            </div>
          </div>
        ) : null}
        <DaftarCiri judul="Bayangan benda" baris={[`dari atas tampak ${f.atas}`, `dari samping tampak ${f.samping}`]} rupa={rupa} ikon={"\u{1F440}"} />
      </div>
    );
  return (
    <DaftarCiri
      judul="Dua pertanyaan"
      baris={["bisa diisi: ya", `bisa menggelinding: ${f.lengkung > 0 ? "ya" : "tidak"}`, sebutBanyak(f.datar, "datar"), sebutBanyak(f.lengkung, "lengkung")]}
      rupa={rupa}
      ikon={"\u{2753}"}
    />
  );
}
