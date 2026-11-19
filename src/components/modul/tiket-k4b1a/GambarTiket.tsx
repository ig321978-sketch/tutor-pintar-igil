"use client";

import React from "react";
import { TEMPAT, barisKartu, dasarDari, empatAngka, fmt, kataBil, lupaNol, type Cara, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab A (membaca dan menulis bilangan sampai sepuluh ribu):
 * Concrete = tiket beremoji dan papan empat kotak kayu di loket beratap rumbia, Pictorial = tiket polos, bagan tempat angka polos, dan deret kartu angka polos di kertas denah,
 * Abstract = kartu kata dan angka. Bilangan selalu bertitik ribuan dan tiap angka sungguh berada di kotaknya. Dipakai bersama oleh tugas CPA (LangkahTiket) dan Simulasi Loket Tiket.
 */
const UNGU = "#1C01A5";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda pulau wisata untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_PULAU: Record<string, string> = { tiket: "\u{1F3AB}", pohon: "\u{1F334}", perahu: "\u{26F5}", kelapa: "\u{1F965}", lentera: "\u{1F3EE}", kerang: "\u{1F41A}" };

export function Gambar({ label, judul, children, rupa = "benda" }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={200} rx={12} fill={rupa === "benda" ? "#FFF7ED" : "#EFF6FF"} />
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

const WARNA = {
  benda: { papan: "#FDE68A", garis: "#92400E", tiket: "#FDBA74", tiketGaris: "#9A3412", kotak: "#FFFFFF", angka: UNGU },
  diagram: { papan: "#DBEAFE", garis: "#1D4ED8", tiket: "#FFFFFF", tiketGaris: "#1D4ED8", kotak: "#FFFFFF", angka: "#1E3A8A" },
} as const;
const tema = (rupa: Rupa) => (rupa === "benda" ? WARNA.benda : WARNA.diagram);

/** Tiket bernomor `teks` (tinggi 46) di tengah atas; Concrete memberi tiket beremoji dan pohon kelapa di kedua sisi. */
function TiketBilangan({ teks, rupa, y = 22 }: { teks: string; rupa: Rupa; y?: number }) {
  const w = tema(rupa);
  return (
    <g>
      {rupa === "benda" ? (
        <>
          <text x={30} y={y + 32} textAnchor="middle" fontSize={26} aria-hidden="true">
            {EMOJI_PULAU.tiket}
          </text>
          <text x={270} y={y + 32} textAnchor="middle" fontSize={26} aria-hidden="true">
            {EMOJI_PULAU.pohon}
          </text>
        </>
      ) : null}
      <rect x={62} y={y} width={176} height={46} rx={8} fill={w.tiket} stroke={w.tiketGaris} strokeWidth={2.4} />
      <circle cx={62} cy={y + 23} r={5} fill={rupa === "benda" ? "#FFF7ED" : "#EFF6FF"} stroke={w.tiketGaris} strokeWidth={1.6} />
      <circle cx={238} cy={y + 23} r={5} fill={rupa === "benda" ? "#FFF7ED" : "#EFF6FF"} stroke={w.tiketGaris} strokeWidth={1.6} />
      <text x={150} y={y + 31} textAnchor="middle" fontSize={teks.length > 6 ? 22 : 28} fontWeight={900} fill={w.angka}>
        {teks}
      </text>
    </g>
  );
}

/** Papan empat kotak. `isi`: angka tiap kotak (null atau "" = kosong). `label`: nama tempat di atas kotak. `sorot`: kotak berbingkai merah. */
function PapanEmpat({ isi, label, sorot = -1, rupa, y = 100 }: { isi: (string | number | null)[]; label: boolean; sorot?: number; rupa: Rupa; y?: number }) {
  const w = tema(rupa);
  const lebar = 56;
  const celah = 6;
  const x0 = (300 - (4 * lebar + 3 * celah)) / 2;
  return (
    <g>
      <rect x={x0 - 6} y={y - 6} width={4 * lebar + 3 * celah + 12} height={66} rx={8} fill={w.papan} stroke={w.garis} strokeWidth={2.4} />
      {[0, 1, 2, 3].map((i) => {
        const x = x0 + i * (lebar + celah);
        return (
          <g key={i}>
            {label ? (
              <text x={x + lebar / 2} y={y - 10} textAnchor="middle" fontSize={9} fontWeight={900} fill={w.garis}>
                {TEMPAT[i]}
              </text>
            ) : null}
            <rect x={x} y={y} width={lebar} height={54} rx={6} fill={w.kotak} stroke={i === sorot ? "#DC2626" : w.garis} strokeWidth={i === sorot ? 5 : 1.6} />
            <text x={x + lebar / 2} y={y + 38} textAnchor="middle" fontSize={32} fontWeight={900} fill={w.angka}>
              {isi[i] ?? ""}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Deret kartu angka (satu angka satu kartu), disusun dari kiri. */
function DeretKartu({ angka, rupa }: { angka: number; rupa: Rupa }) {
  const w = tema(rupa);
  const d = [...String(angka)];
  const lebar = 52;
  const celah = 8;
  const total = d.length * lebar + (d.length - 1) * celah;
  const x0 = (300 - total) / 2;
  return (
    <g>
      <rect x={x0 - 10} y={40} width={total + 20} height={96} rx={8} fill={w.papan} stroke={w.garis} strokeWidth={2.4} />
      {d.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * (lebar + celah)} y={52} width={lebar} height={72} rx={8} fill={w.kotak} stroke={w.garis} strokeWidth={2} />
          <text x={x0 + i * (lebar + celah) + lebar / 2} y={100} textAnchor="middle" fontSize={40} fontWeight={900} fill={w.angka}>
            {c}
          </text>
        </g>
      ))}
      <text x={150} y={160} textAnchor="middle" fontSize={11} fontWeight={900} fill={w.garis}>
        kartu angka dari kiri, ribuan lebih dulu
      </text>
    </g>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#FDBA74] bg-[#FFF7ED] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#9A3412]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#431407]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#C2410C] bg-[#FFEDD5] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(124,45,18,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  tulis: "menulis bilangan",
  baca: "membaca bilangan",
  tempat: "angka di tempatnya",
  namaTempat: "nama tempat angka",
  kartu: "kartu angka",
  bagian: "baca per bagian",
  nol: "periksa nol",
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
  const kosong = [null, null, null, null];
  const ds = empatAngka(d.angka);
  switch (d.tipe) {
    case "tulis":
      return (
        <Gambar rupa={rupa} label="Papan empat kotak kosong dan tiket yang belum bernomor" judul="tiket yang diucapkan Bu Maya">
          <TiketBilangan teks="?" rupa={rupa} />
          <text x={150} y={90} textAnchor="middle" fontSize={11} fontWeight={900} fill="#9A3412">
            {kataBil(d.angka)}
          </text>
          <PapanEmpat isi={kosong} label={false} rupa={rupa} y={104} />
        </Gambar>
      );
    case "baca":
      return (
        <Gambar rupa={rupa} label={`Tiket bernomor ${fmt(d.angka)} dan papan empat kotak`} judul="nomor tiket">
          <TiketBilangan teks={fmt(d.angka)} rupa={rupa} />
          <PapanEmpat isi={ds} label rupa={rupa} y={104} />
        </Gambar>
      );
    case "tempat":
      return (
        <Gambar rupa={rupa} label={`Tiket bernomor ${fmt(d.angka)} dan papan tempat angka yang ditanyakan`} judul="angka di tempatnya">
          <TiketBilangan teks={fmt(d.angka)} rupa={rupa} />
          <PapanEmpat isi={kosong} label sorot={TEMPAT.indexOf(d.tempat)} rupa={rupa} y={104} />
        </Gambar>
      );
    case "namaTempat":
      return (
        <Gambar rupa={rupa} label={`Tiket bernomor ${fmt(d.angka)}, satu angka diberi tanda`} judul="angka yang diberi tanda">
          <TiketBilangan teks={fmt(d.angka)} rupa={rupa} />
          <PapanEmpat isi={ds} label={false} sorot={d.urut} rupa={rupa} y={104} />
        </Gambar>
      );
    case "kartu":
      return (
        <Gambar rupa={rupa} label="Kartu angka disusun dari kiri" judul="kartu angka">
          <DeretKartu angka={d.angka} rupa={rupa} />
        </Gambar>
      );
    case "bagian":
      return (
        <Gambar rupa={rupa} label={`Tiket bernomor ${fmt(d.angka)} dibaca per bagian`} judul="baca per bagian dari kiri">
          <TiketBilangan teks={fmt(d.angka)} rupa={rupa} />
          <PapanEmpat isi={ds} label={false} rupa={rupa} y={104} />
        </Gambar>
      );
    case "nol":
      return cara === "klik" ? (
        <Gambar rupa={rupa} label="Tulisan Satria yang nolnya hilang" judul="tulisan Satria">
          <TiketBilangan teks={lupaNol(d.angka)} rupa={rupa} />
          <text x={150} y={96} textAnchor="middle" fontSize={11} fontWeight={900} fill="#9A3412">
            {kataBil(d.angka)}
          </text>
          <text x={150} y={150} textAnchor="middle" fontSize={11} fontWeight={900} fill={tema(rupa).garis}>
            tulisan Satria dan ucapan Bu Maya
          </text>
        </Gambar>
      ) : (
        <Gambar rupa={rupa} label={`Tiket bernomor ${fmt(d.angka)}`} judul="periksa angka dan nol">
          <TiketBilangan teks={fmt(d.angka)} rupa={rupa} />
          <PapanEmpat isi={String(d.angka).length === 4 ? ds : ["", ...String(d.angka)]} label={false} rupa={rupa} y={104} />
        </Gambar>
      );
  }
}
