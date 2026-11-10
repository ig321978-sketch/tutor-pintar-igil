"use client";

import React, { useState } from "react";
import { BIRU, EMAS, KUNING, Latar } from "./CeritaBandingB";
import { VideoCerita, type AdeganVideo, type PropsAdegan } from "./video-cerita";
import type { AdeganNaskah, VideoNaskah } from "./naskah-k2b2";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 2 Bab 2: daftar video yang diputar SATU PER SATU saat    */
/* siswa mengetuk Putar (tidak ada yang berjalan sendiri), dan bagian gambar    */
/* SVG bersama untuk adegan (jambu air, burung, donat, jalur bilangan, tabel   */
/* nilai tempat, bagan pasangan). Animasi gratis di perangkat siswa, tanpa      */
/* berkas video dan tanpa panggilan API. Naskah: naskah-k2b2.ts                 */
/* ------------------------------------------------------------------------ */

export const MERAH = "#E53E3E";
export const BIRU_SOAL = "#2563EB";
export const HIJAU_JAWAB = "#16A34A";
const JAMBU = "#F43F5E";

/** Kalimat video = ketukan di naskah (satu sumber). Papan judul dan render menyusul. */
export function buatAdegan(n: AdeganNaskah, render: (p: PropsAdegan) => React.ReactNode, opsi: { waktu?: boolean; minimal?: Partial<Record<number, number>> } = {}): AdeganVideo {
  return { id: n.id, judul: n.judul, ketukan: n.ketukan, render, waktu: opsi.waktu, minimal: opsi.minimal };
}

export type VideoSiap = { naskah: VideoNaskah; adegan: AdeganVideo[]; poster: { a: number; k: number } };

type PropsDaftar = {
  videos: VideoSiap[];
  speakGuru: (teks: string, selesai?: () => void) => void;
};

/**
 * Daftar video cerita. Tidak ada video yang berjalan sendiri. Siswa mengetuk Putar pada satu video, video itu
 * langsung berjalan dan video lain berhenti. Mengetuk Putar pada video lain menggantikan yang sedang berjalan.
 * Poster disusun horizontal di layar lebar agar tidak melebar vertikal.
 */
export function DaftarVideoCerita({ videos, speakGuru }: PropsDaftar) {
  const [aktif, setAktif] = useState<string | null>(null);
  const [ditonton, setDitonton] = useState<string[]>([]);
  const videoAktif = videos.find((v) => v.naskah.id === aktif);
  const indeksAktif = videoAktif ? videos.indexOf(videoAktif) : -1;
  const kolom =
    videos.length <= 1 ? "grid-cols-1" : videos.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="space-y-3">
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-2 text-center text-sm font-black leading-snug text-[#1C01A5]">
        🎬 Ada {videos.length} video cerita. Ketuk ▶ Putar pada video yang ingin kamu tonton. Hanya satu video yang berjalan pada satu waktu.
      </p>

      {videoAktif ? (
        <div className="space-y-2">
          <VideoCerita
            judul={videoAktif.naskah.judul}
            subjudul={videoAktif.naskah.subjudul}
            adegan={videoAktif.adegan}
            speakGuru={speakGuru}
            mulaiLangsung
            onSelesai={() => setDitonton((d) => (d.includes(videoAktif.naskah.id) ? d : [...d, videoAktif.naskah.id]))}
          />
          <button
            type="button"
            onClick={() => setAktif(null)}
            className="mx-auto block rounded-full border-4 border-[#1C01A5] bg-white px-5 py-1.5 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            ⏹ Tutup video {indeksAktif + 1}
          </button>
        </div>
      ) : null}

      <div className={`grid ${kolom} gap-3`}>
        {videos.map((v, i) => {
          const sedang = aktif === v.naskah.id;
          return (
            <article
              key={v.naskah.id}
              className={`overflow-hidden rounded-3xl border-4 bg-white shadow-[0_5px_0_rgba(28,1,165,0.22)] ${sedang ? "border-amber-400 ring-4 ring-amber-200" : "border-[#1C01A5]"}`}
            >
              <div className="relative aspect-[300/208] bg-[#DFF1FF]">
                <svg viewBox="0 0 300 208" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
                  <Latar />
                  {v.adegan[v.poster.a].render({ k: v.poster.k, t: 0 })}
                </svg>
                {sedang ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1C01A5]/45">
                    <span className="rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-3 py-1 text-xs font-black text-[#FFE566]">▶ Sedang diputar</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAktif(v.naskah.id)}
                    aria-label={`Putar video ${i + 1}: ${v.naskah.judul}`}
                    className="absolute inset-0 flex items-end justify-end bg-transparent p-2 transition hover:bg-[#1C01A5]/10 sm:p-3"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#FFE566] bg-[#1C01A5] text-xl text-[#FFE566] shadow-lg sm:h-14 sm:w-14 sm:text-2xl">▶</span>
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2 px-3 py-2 sm:min-h-[5.5rem]">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#1C01A5]/60 sm:text-xs">Video {i + 1} dari {videos.length}</p>
                  <h4 className="text-base font-black leading-tight text-[#1C01A5] sm:text-lg">{v.naskah.judul}</h4>
                  <p className="text-[10px] font-bold text-[#1C01A5]/70 sm:text-xs">{v.naskah.subjudul} • {v.adegan.length} adegan</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAktif(sedang ? null : v.naskah.id)}
                  className="w-full rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-3 py-1.5 text-sm font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
                >
                  {sedang ? "⏹ Tutup" : ditonton.includes(v.naskah.id) ? "↻ Putar lagi" : "▶ Putar"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="text-center text-xs font-black text-[#1C01A5]/70">
        Sudah ditonton: {ditonton.length} dari {videos.length}
        {ditonton.length === videos.length ? " ⭐ Hebat!" : ""}
      </p>
    </div>
  );
}

/* ------------------------------ Benda dalam gambar ------------------------------ */

/** Jambu air kecil berpusat di (x, y). */
export function JambuSvg({ x, y, s = 0.6, warna = JAMBU, redup = false }: { x: number; y: number; s?: number; warna?: string; redup?: boolean }) {
  return (
    <g transform={`translate(${x - 16 * s} ${y - 18 * s}) scale(${s})`} opacity={redup ? 0.28 : 1}>
      <path d="M16 6 C7 6 3.5 17 6.5 25.5 C8.5 31 12 33 16 33 C20 33 23.5 31 25.5 25.5 C28.5 17 25 6 16 6 Z" fill={warna} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M10 14 Q9 19 11 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" opacity="0.7" />
      <path d="M11 7 L16 11 L21 7 L19 4 L16 6 L13 4 Z" fill="#22C55E" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
    </g>
  );
}

/** Baris jambu: (x, y) pusat jambu pertama, `kolom` jambu per baris. */
export function JambuBaris({
  x,
  y,
  n,
  kolom = 10,
  s = 0.5,
  sorot = [],
  redup = [],
  warna = JAMBU,
  dari = 0,
}: {
  x: number;
  y: number;
  n: number;
  kolom?: number;
  s?: number;
  sorot?: number[];
  redup?: number[];
  warna?: string;
  /** Hanya gambar jambu dengan indeks mulai dari sini. */
  dari?: number;
}) {
  const jarak = 36 * s;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        if (i < dari) return null;
        const px = x + (i % kolom) * jarak;
        const py = y + Math.floor(i / kolom) * jarak * 1.05;
        return (
          <g key={i}>
            {sorot.includes(i) ? <rect x={px - jarak / 2 + 1} y={py - jarak / 2 + 1} width={jarak - 2} height={jarak - 2} rx="4" fill="#FFF3C4" stroke={EMAS} strokeWidth="1.8" className="vc-denyut" /> : null}
            <JambuSvg x={px} y={py} s={s} warna={warna} redup={redup.includes(i)} />
          </g>
        );
      })}
    </g>
  );
}

const TITIK_POHON: [number, number][] = [
  [-34, -10], [-12, -20], [14, -16], [36, -6], [-24, 8], [2, 2], [26, 10], [-42, 14], [-6, 18], [40, 20],
  [-30, -26], [8, -30], [-16, 28], [22, 26], [48, 4], [-46, -2], [0, -8], [32, -24], [-8, 6], [16, 14],
];

/** Pohon jambu air. (x, y) adalah pangkal batang. `buah` banyak jambu yang tergantung (sampai 20). */
export function PohonJambu({ x, y, buah, s = 1, sorot = [] }: { x: number; y: number; buah: number; s?: number; sorot?: number[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-7" y="-46" width="14" height="46" rx="3" fill="#A8672D" stroke={BIRU} strokeWidth="2.4" />
      <circle cx="-30" cy="-62" r="26" fill="#4ADE80" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="28" cy="-62" r="26" fill="#4ADE80" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="0" cy="-84" r="30" fill="#22C55E" stroke={BIRU} strokeWidth="2.6" />
      {TITIK_POHON.slice(0, Math.min(20, buah)).map(([px, py], i) => (
        <g key={i} className={sorot.includes(i) ? "vc-denyut" : undefined}>
          <JambuSvg x={px} y={py - 62} s={0.42} />
        </g>
      ))}
    </g>
  );
}

/** Keranjang berisi tulisan banyak isi. (x, y) kiri atas, lebar w. */
export function KeranjangSvg({ x, y, w = 96, h = 40, label, warna = "#FDE9C4" }: { x: number; y: number; w?: number; h?: number; label?: string; warna?: string }) {
  return (
    <g>
      <path d={`M${x} ${y} H${x + w} L${x + w - 8} ${y + h} Q${x + w / 2} ${y + h + 8} ${x + 8} ${y + h} Z`} fill={warna} stroke="#A8672D" strokeWidth="3" strokeLinejoin="round" />
      <path d={`M${x + 6} ${y + 12} H${x + w - 6} M${x + 9} ${y + 26} H${x + w - 9}`} stroke="#A8672D" strokeWidth="1.6" opacity="0.6" />
      {label ? (
        <text x={x + w / 2} y={y + h + 24} textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

/** Burung hijau atau merah, berpusat di (x, y). */
export function BurungSvg({ x, y, warna, s = 0.7, redup = false }: { x: number; y: number; warna: "hijau" | "merah"; s?: number; redup?: boolean }) {
  const badan = warna === "hijau" ? "#4ADE80" : "#F87171";
  const sayap = warna === "hijau" ? "#16A34A" : "#DC2626";
  return (
    <g transform={`translate(${x - 22 * s} ${y - 18 * s}) scale(${s})`} opacity={redup ? 0.3 : 1}>
      <path d="M6 22 L-1 17 L2 27 Z" fill={sayap} stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="21" cy="22" rx="15" ry="10.5" fill={badan} stroke={BIRU} strokeWidth="2.6" />
      <circle cx="32" cy="14" r="8" fill={badan} stroke={BIRU} strokeWidth="2.6" />
      <path d="M39 13 L45 15.5 L39 18 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="33.5" cy="12.5" r="2" fill={BIRU} />
      <path d="M12 20 Q20 12 28 22 Q20 28 12 20 Z" fill={sayap} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
    </g>
  );
}

/** Donat berpusat di (x, y). */
export function DonatSvg({ x, y, s = 0.6, warna = "#F9A8D4" }: { x: number; y: number; s?: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="16" fill="#E9B872" stroke={BIRU} strokeWidth="2.6" />
      <circle cx="0" cy="0" r="13" fill={warna} stroke={BIRU} strokeWidth="1.6" />
      <circle cx="0" cy="0" r="5" fill="#DFF1FF" stroke={BIRU} strokeWidth="2" />
      <path d="M-9 -6 L-6 -9 M7 -8 L10 -5 M-10 5 L-7 8 M6 9 L9 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** Jeruk berpusat di (x, y). */
export function JerukSvg({ x, y, s = 0.6 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="2" r="15" fill="#FB923C" stroke={BIRU} strokeWidth="2.6" />
      <path d="M-5 -14 Q0 -22 8 -16 Q2 -10 -5 -14 Z" fill="#22C55E" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M-8 -2 Q-6 4 -2 6" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

/** Boneka beruang berpusat di (x, y). */
export function BonekaSvg({ x, y, s = 0.6, warna = "#C08457" }: { x: number; y: number; s?: number; warna?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-11" cy="-14" r="6" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <circle cx="11" cy="-14" r="6" fill={warna} stroke={BIRU} strokeWidth="2.2" />
      <circle cx="0" cy="-6" r="13" fill={warna} stroke={BIRU} strokeWidth="2.4" />
      <ellipse cx="0" cy="-2" rx="6" ry="4.6" fill="#F3D5B5" stroke={BIRU} strokeWidth="1.6" />
      <circle cx="-4.5" cy="-8" r="1.8" fill={BIRU} />
      <circle cx="4.5" cy="-8" r="1.8" fill={BIRU} />
      <circle cx="0" cy="-3" r="1.8" fill={BIRU} />
      <ellipse cx="0" cy="15" rx="11" ry="10" fill={warna} stroke={BIRU} strokeWidth="2.4" />
    </g>
  );
}

/* ------------------------------ Diagram dalam gambar ------------------------------ */

/** Tulisan tebal berpusat di (x, y). */
export function Teks({ x, y, teks, ukuran = 14, warna = BIRU, anchor = "middle" }: { x: number; y: number; teks: string; ukuran?: number; warna?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={ukuran} fontWeight="900" fill={warna}>
      {teks}
    </text>
  );
}

/** Kartu putih berisi beberapa baris tulisan. (x, y) kiri atas. */
export function KartuTeks({ x, y, w, baris, ukuran = 13, warna = "#FFFFFF", tepi = BIRU, warnaTeks = BIRU }: { x: number; y: number; w: number; baris: string[]; ukuran?: number; warna?: string; tepi?: string; warnaTeks?: string }) {
  const tinggi = baris.length * (ukuran + 5) + 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={tinggi} rx="10" fill={warna} stroke={tepi} strokeWidth="3" />
      {baris.map((b, i) => (
        <text key={i} x={x + w / 2} y={y + 8 + (i + 1) * (ukuran + 5) - 4} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warnaTeks}>
          {b}
        </text>
      ))}
    </g>
  );
}

/**
 * Jalur kotak bilangan di gambar. `pos` adalah bilangan tempat penanda berdiri, `lompat` busur [asal, tujuan],
 * `sorot` kotak yang disorot. Lebar total `lebar` mulai dari x.
 */
export function JalurSvg({
  x,
  y,
  dari,
  sampai,
  pos,
  mulai,
  lompat = [],
  sorot = [],
  lebar = 284,
}: {
  x: number;
  y: number;
  dari: number;
  sampai: number;
  pos?: number;
  mulai?: number;
  lompat?: [number, number][];
  sorot?: number[];
  lebar?: number;
}) {
  const banyak = sampai - dari + 1;
  const bw = Math.min(30, lebar / banyak);
  const tx = (n: number) => x + (n - dari) * bw + bw / 2;
  return (
    <g>
      {lompat.map(([a, b], i) => {
        const x1 = tx(a);
        const x2 = tx(b);
        const arah = x2 >= x1 ? 1 : -1;
        const tinggi = Math.min(34, 12 + Math.abs(x2 - x1) * 0.25);
        return (
          <g key={`${a}-${b}-${i}`}>
            <path d={`M${x1} ${y - 3} Q${(x1 + x2) / 2} ${y - 3 - tinggi} ${x2} ${y - 3}`} fill="none" stroke={BIRU_SOAL} strokeWidth="2.6" strokeLinecap="round" />
            <path d={`M${x2 - 5 * arah} ${y - 8} L${x2} ${y - 2} L${x2 - 7 * arah} ${y}`} fill="none" stroke={BIRU_SOAL} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {Array.from({ length: banyak }, (_, i) => {
        const n = dari + i;
        const fill = n === mulai ? "#F9A8D4" : sorot.includes(n) || n === pos ? "#FDE68A" : "#EDE9FE";
        return (
          <g key={n}>
            <rect x={x + i * bw} y={y} width={bw} height="28" fill={fill} stroke={BIRU} strokeWidth="2" />
            <text x={tx(n)} y={y + 19} textAnchor="middle" fontSize={bw < 20 ? 10 : bw < 26 ? 12 : 13.5} fontWeight="900" fill={n % 10 === 0 ? MERAH : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {pos !== undefined && pos >= dari && pos <= sampai ? (
        <g style={{ transform: `translate(${tx(pos)}px, ${y + 38}px)`, transition: "transform .3s ease-out" }}>
          <path d="M0 -8 L-7 4 H7 Z" fill={EMAS} stroke={BIRU} strokeWidth="2" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
}

export type IsiSelSvg = { n: number | string | null; atas?: string; bawah?: string };

/**
 * Tabel susun ke bawah (Puluhan, Satuan) di gambar. Angka soal biru, jawaban hijau, catatan merah kecil.
 * (x, y) kiri atas. Lebar tabel 150.
 */
export function TabelSvg({
  x,
  y,
  op,
  atas,
  bawah,
  hasil,
  nyala = null,
}: {
  x: number;
  y: number;
  op: "+" | "−";
  atas: [IsiSelSvg, IsiSelSvg];
  bawah: [IsiSelSvg, IsiSelSvg];
  hasil: [IsiSelSvg, IsiSelSvg];
  nyala?: "p" | "s" | null;
}) {
  const cx = [x + 54, x + 112];
  const baris = (yy: number, sel: [IsiSelSvg, IsiSelSvg], warna: string) =>
    sel.map((c, i) => (
      <g key={i}>
        {nyala === (i === 0 ? "p" : "s") ? <rect x={cx[i] - 26} y={yy - 2} width="52" height="38" rx="8" fill="#FFF3C4" stroke={EMAS} strokeWidth="2" className="vc-denyut" /> : null}
        {c.n !== null && c.n !== "" ? (
          <text x={cx[i]} y={yy + 29} textAnchor="middle" fontSize="30" fontWeight="900" fill={warna}>
            {c.n}
          </text>
        ) : null}
        {c.atas ? (
          <text x={cx[i] + 20} y={yy + 6} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={MERAH}>
            {c.atas}
          </text>
        ) : null}
        {c.bawah ? (
          <text x={cx[i] + 18} y={yy + 44} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={MERAH}>
            {c.bawah}
          </text>
        ) : null}
      </g>
    ));
  return (
    <g>
      <rect x={x} y={y} width="144" height="168" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <rect x={x + 26} y={y + 6} width="56" height="20" rx="10" fill="#FECACA" stroke={BIRU} strokeWidth="2" />
      <rect x={x + 84} y={y + 6} width="56" height="20" rx="10" fill="#BFDBFE" stroke={BIRU} strokeWidth="2" />
      <Teks x={x + 54} y={y + 21} teks="Puluhan" ukuran={10.5} />
      <Teks x={x + 112} y={y + 21} teks="Satuan" ukuran={10.5} />
      {baris(y + 32, atas, BIRU_SOAL)}
      <Teks x={x + 12} y={y + 94} teks={op} ukuran={28} />
      {baris(y + 68, bawah, BIRU_SOAL)}
      <path d={`M${x + 8} ${y + 112} H${x + 136}`} stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
      {baris(y + 120, hasil, HIJAU_JAWAB)}
    </g>
  );
}

/** Bagan pasangan bilangan: satu bilangan di kiri dipisah jadi dua di kanan. (x, y) pusat bilangan kiri. */
export function BondSvg({ x, y, besar, a, b, nyala = [] }: { x: number; y: number; besar: number | string; a: number | string | null; b: number | string | null; nyala?: ("g" | "a" | "b")[] }) {
  const lingkar = (cx: number, cy: number, r: number, isi: number | string | null, warna: string, aktif: boolean) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={isi === null || isi === "?" ? "#FFFFFF" : warna} stroke={aktif ? EMAS : BIRU} strokeWidth={aktif ? 4.4 : 3} strokeDasharray={isi === null || isi === "?" ? "4 3" : undefined} className={aktif ? "vc-denyut" : undefined} />
      <text x={cx} y={cy + r * 0.36} textAnchor="middle" fontSize={r * 1.0} fontWeight="900" fill={BIRU}>
        {isi === null ? "" : isi}
      </text>
    </g>
  );
  return (
    <g>
      <path d={`M${x + 16} ${y - 12} L${x + 52} ${y - 28} M${x + 16} ${y + 12} L${x + 52} ${y + 28}`} stroke={BIRU} strokeWidth="3.2" strokeLinecap="round" />
      {lingkar(x, y, 24, besar, KUNING, nyala.includes("g"))}
      {lingkar(x + 70, y - 30, 19, a, "#C7D2FE", nyala.includes("a"))}
      {lingkar(x + 70, y + 30, 19, b, "#C7D2FE", nyala.includes("b"))}
    </g>
  );
}

/** Rentetan bilangan kecil yang muncul berurutan (misalnya "13, 14, 15"). */
export function Rentetan({ x, y, dari, banyak, sampai }: { x: number; y: number; dari: number; banyak: number; sampai?: number }) {
  const daftar = Array.from({ length: Math.min(banyak, sampai ?? banyak) }, (_, i) => dari + i);
  return (
    <Teks x={x} y={y} teks={daftar.join(", ")} ukuran={13} warna={BIRU_SOAL} />
  );
}
