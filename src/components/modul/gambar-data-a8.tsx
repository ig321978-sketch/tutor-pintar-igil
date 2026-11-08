"use client";

import React from "react";
import { BIRU, BukuCerita, MERAH_MUDA, type Cerita } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { BendaG, RuangToko, WARNA_TITIK, kocok, tebar, type JenisBenda } from "./data-8-dasar";
import { AlasTeks, Ket, Label } from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab A: Mengelompokkan Data (Buku Siswa Kelas 1 hlm. 221-228).    */
/* Maskot: Igil si burung hantu. Tokoh buku: Kira, Paman, Upe. Semua gambar   */
/* dibuat di klien (SVG), tanpa panggilan API.                                */
/* Naskah: naskah/mtk-1-bab8-sub-a-mengelompokkan-data.md                     */
/* ------------------------------------------------------------------------ */

const GARIS = { stroke: BIRU, strokeWidth: 2.4 };

/** Teks rata kiri untuk daftar dan tabel di dalam adegan. */
function Tulis({ x, y, teks, ukuran = 11, warna = BIRU, rata = "start" }: { x: number; y: number; teks: string; ukuran?: number; warna?: string; rata?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} textAnchor={rata} fontSize={ukuran} fontWeight="900" fill={warna}>
      {teks}
    </text>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 221: toko mainan Paman berantakan, Kira membantu merapikan. */
function AdeganBerantakan() {
  const barang: [number, number, JenisBenda, number][] = [
    [40, 164, "pesawat", -20],
    [88, 172, "bola", 0],
    [122, 160, "mobil", 15],
    [152, 172, "boneka", -10],
    [186, 164, "pesawat", 30],
    [68, 166, "mobil", -25],
    [202, 174, "bola", 0],
    [238, 168, "boneka", 20],
    [268, 172, "pesawat", -35],
    [18, 172, "boneka", 10],
    [108, 174, "bola", 0],
    [170, 156, "mobil", 5],
  ];
  return (
    <>
      <RuangToko />
      <rect x="14" y="36" width="98" height="64" rx="4" fill="#E9A15B" {...GARIS} />
      <path d="M14 58 H112 M14 80 H112" stroke={BIRU} strokeWidth="2" />
      <BendaG jenis="pesawat" x={40} y={50} s={0.62} />
      <BendaG jenis="bola" x={92} y={72} s={0.62} />
      <rect x="214" y="112" width="80" height="34" rx="5" fill="#FDBA74" {...GARIS} />
      <Tokoh x={64} y={152} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.6} angkat />
      <Tokoh x={256} y={150} rambut="#111827" baju="#60A5FA" s={0.72} />
      {barang.map(([x, y, j, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y - 6})`}>
          <BendaG jenis={j} x={x} y={y - 6} s={0.9} />
        </g>
      ))}
      <AlasTeks y={184} h={20} />
      <Ket x={150} y={198} teks="Ayo kita bantu Kira menghitung mainan" ukuran={11} />
      <Label x={20} y={2} w={210} teks="Toko mainan berantakan" ukuran={13} />
    </>
  );
}

/** Buku hlm. 222: toko yang sudah rapi, mainan yang sama di rak yang sama. */
function AdeganRapi() {
  const rak: { j: JenisBenda; nama: string }[] = [
    { j: "pesawat", nama: "pesawat" },
    { j: "mobil", nama: "mobil-mobilan" },
    { j: "boneka", nama: "boneka" },
    { j: "bola", nama: "bola" },
  ];
  return (
    <>
      <RuangToko />
      {rak.map((r, i) => {
        const x = 10 + i * 72;
        return (
          <g key={r.nama}>
            <rect x={x} y={28} width="66" height="106" rx="4" fill="#E9A15B" {...GARIS} />
            <path d={`M${x} 62 H${x + 66} M${x} 96 H${x + 66}`} stroke={BIRU} strokeWidth="2" />
            {[0, 1, 2].map((b) =>
              [0, 1].map((k) => <BendaG key={`${b}${k}`} jenis={r.j} x={x + 19 + k * 28} y={46 + b * 34} s={0.62} />)
            )}
            <Ket x={x + 33} y={148} teks={r.nama} ukuran={10} />
          </g>
        );
      })}
      <AlasTeks y={162} h={44} />
      <Ket x={150} y={178} teks="Mainan yang sama di rak yang sama" ukuran={12} />
      <Ket x={150} y={196} teks="Toko rapi, mainan mudah dihitung" ukuran={12} />
      <Label x={20} y={0} w={210} teks="Toko yang sudah rapi" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 222: daftar mainan di toko. */
function AdeganDaftar() {
  const baris: { j: JenisBenda; n: number; teks: string }[] = [
    { j: "pesawat", n: 12, teks: "Ada 12 pesawat." },
    { j: "mobil", n: 8, teks: "Ada 8 mobil-mobilan." },
    { j: "boneka", n: 10, teks: "Ada 10 boneka." },
    { j: "bola", n: 6, teks: "Ada 6 bola." },
  ];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#F5F3FF" />
      <rect x="8" y="30" width="284" height="172" rx="10" fill="#FFFFFF" {...GARIS} />
      <rect x="8" y="30" width="284" height="26" rx="10" fill="#E9D8F3" {...GARIS} />
      <Ket x={150} y={48} teks="Daftar Mainan di Toko" ukuran={13} />
      {baris.map((b, i) => {
        const y = 60 + i * 34;
        return (
          <g key={b.teks}>
            <rect x="12" y={y} width="276" height="30" rx="5" fill={i % 2 ? "#F5F3FF" : "#EDE9FE"} />
            <Tulis x={18} y={y + 19} teks={b.teks} ukuran={10.5} />
            {Array.from({ length: b.n }, (_, k) => (
              <BendaG key={k} jenis={b.j} x={143 + k * 12.4} y={y + 15} s={0.42} />
            ))}
          </g>
        );
      })}
      <Label x={20} y={0} w={190} teks="Daftar mainan" ukuran={13} />
    </>
  );
}

/** Buku hlm. 223: bola dikelompokkan menurut warna dan dihitung. */
function AdeganBola() {
  const warna = [
    ...Array.from({ length: 7 }, () => "bola-merah" as JenisBenda),
    ...Array.from({ length: 4 }, () => "bola-kuning" as JenisBenda),
    ...Array.from({ length: 6 }, () => "bola-hijau" as JenisBenda),
  ];
  const acak = kocok(warna, 11);
  const pos = tebar(acak.length, 246, 54, 5);
  const baris: { w: keyof typeof WARNA_TITIK; n: number }[] = [
    { w: "merah", n: 7 },
    { w: "kuning", n: 4 },
    { w: "hijau", n: 6 },
  ];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#EEF2FF" />
      <rect x="14" y="30" width="272" height="72" rx="8" fill="#BAE6FD" {...GARIS} />
      {acak.map((j, i) => (
        <BendaG key={i} jenis={j} x={27 + pos[i].x} y={38 + pos[i].y} s={0.58} />
      ))}
      {baris.map((b, i) => {
        const y = 108 + i * 24;
        return (
          <g key={b.w}>
            <rect x="14" y={y} width="272" height="21" rx="5" fill={i % 2 ? "#F5F3FF" : "#EDE9FE"} />
            <Tulis x={20} y={y + 15} teks={`Ada ${b.n} bola ${b.w}.`} ukuran={11} />
            {Array.from({ length: b.n }, (_, k) => (
              <circle key={k} cx={160 + k * 17} cy={y + 10.5} r="6.4" fill={WARNA_TITIK[b.w]} stroke={BIRU} strokeWidth="1.5" />
            ))}
          </g>
        );
      })}
      <AlasTeks y={180} h={28} />
      <Ket x={150} y={193} teks="Paling banyak: merah, ada 7" ukuran={11} />
      <Ket x={150} y={205} teks="Paling sedikit: kuning, ada 4" ukuran={11} />
      <Label x={20} y={0} w={210} teks="Kelompokkan bola" ukuran={13} />
    </>
  );
}

/** Buku hlm. 224: tabel bola Upe, baris dan kolom. */
function AdeganTabelUpe() {
  const x0 = 14;
  const y0 = 46;
  const lh = 26;
  const data: [string, string][] = [
    ["Warna Bola", "Banyaknya"],
    ["Merah", "7"],
    ["Kuning", "4"],
    ["Hijau", "6"],
  ];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#F5F3FF" />
      {data.map(([a, b], r) => {
        const y = y0 + r * lh;
        const isiA = r === 0 ? "#E9D8F3" : r === 2 ? "#BBF7D0" : "#FFFFFF";
        const isiB = r === 0 ? "#E9D8F3" : r === 2 ? "#BBF7D0" : "#FEF3C7";
        return (
          <g key={a}>
            <rect x={x0} y={y} width="98" height={lh} fill={isiA} {...GARIS} />
            <rect x={x0 + 98} y={y} width="98" height={lh} fill={isiB} {...GARIS} />
            <Ket x={x0 + 49} y={y + 17.5} teks={a} ukuran={r === 0 ? 11 : 12} />
            <Ket x={x0 + 147} y={y + 17.5} teks={b} ukuran={r === 0 ? 11 : 13} />
          </g>
        );
      })}
      <path d={`M${x0 + 196} ${y0 + 2.5 * lh} H228`} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <rect x="228" y={y0 + 2.5 * lh - 11} width="58" height="22" rx="11" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.6" />
      <Ket x={257} y={y0 + 2.5 * lh + 5} teks="Baris" ukuran={12} />
      <path d={`M${x0 + 147} ${y0 + 4 * lh + 2} V${y0 + 4 * lh + 8}`} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <rect x={x0 + 112} y={y0 + 4 * lh + 8} width="70" height="22" rx="11" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.6" />
      <Ket x={x0 + 147} y={y0 + 4 * lh + 24} teks="Kolom" ukuran={12} />
      <Tokoh x={262} y={196} rambut="#7A4A1E" baju="#FDE047" s={0.72} angkat />
      <Ket x={106} y={200} teks="Tabel terdiri dari baris dan kolom" ukuran={11.5} />
      <Label x={20} y={0} w={190} teks="Tabel bola Upe" ukuran={13} />
    </>
  );
}

/** Buku hlm. 225: tabel menurun (A) dan tabel mendatar (B) memuat data yang sama. */
function AdeganMenurunMendatar() {
  const sel = (x: number, y: number, w: number, h: number, teks: string, isi: string, ukuran = 10.5) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} fill={isi} {...GARIS} strokeWidth={2} />
      <Ket x={x + w / 2} y={y + h / 2 + 4} teks={teks} ukuran={ukuran} />
    </g>
  );
  const nama = ["Merah", "Kuning", "Hijau"];
  const nilai = ["7", "4", "6"];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#F5F3FF" />
      <rect x="8" y="30" width="118" height="22" rx="11" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2.6" />
      <Ket x={67} y={45} teks="Tabel A: menurun ⬇" ukuran={10.5} />
      {sel(8, 58, 59, 24, "Warna Bola", "#E9D8F3", 9)}
      {sel(67, 58, 59, 24, "Banyaknya", "#E9D8F3", 9)}
      {nama.map((n, i) => (
        <React.Fragment key={n}>
          {sel(8, 82 + i * 24, 59, 24, n, "#FFFFFF")}
          {sel(67, 82 + i * 24, 59, 24, nilai[i], "#FEF3C7", 12)}
        </React.Fragment>
      ))}
      <rect x="136" y="30" width="156" height="22" rx="11" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.6" />
      <Ket x={214} y={45} teks="Tabel B: mendatar ➡" ukuran={10.5} />
      {sel(136, 58, 44, 24, "Warna", "#E9D8F3", 9)}
      {nama.map((n, i) => sel(180 + i * 37.33, 58, 37.33, 24, n, "#E9D8F3", 9))}
      {sel(136, 82, 44, 24, "Banyak", "#F5F3FF", 9)}
      {nilai.map((v, i) => sel(180 + i * 37.33, 82, 37.33, 24, v, "#FEF3C7", 12))}
      {[
        ["Judul data", "di atas tabel"],
        ["Benda yang didata", "nama warna"],
        ["Banyak setiap data", "angka"],
      ].map(([a, b], i) => (
        <g key={a}>
          <rect x="136" y={112 + i * 20} width="156" height="18" rx="9" fill="#FFEDD5" stroke="#F59E0B" strokeWidth="2" />
          <Ket x={214} y={125 + i * 20} teks={`${a}: ${b}`} ukuran={9} />
        </g>
      ))}
      <AlasTeks y={176} h={32} />
      <Ket x={150} y={190} teks="Datanya sama, bentuk tabelnya berbeda" ukuran={11.5} />
      <Ket x={150} y={203} teks="Tabel memudahkan kita membaca data" ukuran={11} />
      <Label x={20} y={0} w={210} teks="Cara membaca tabel" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita mengelompokkan data">
      {id === "A8-S1" && <AdeganBerantakan />}
      {id === "A8-S2" && <AdeganRapi />}
      {id === "A8-S3" && <AdeganDaftar />}
      {id === "A8-S4" && <AdeganBola />}
      {id === "A8-S5" && <AdeganTabelUpe />}
      {id === "A8-S6" && <AdeganMenurunMendatar />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 221-225): toko berantakan, rapi, daftar, bola, tabel, dan tabel menurun mendatar. */
export const CERITA_A8: Cerita[] = [
  {
    id: "A8-S1",
    sceneType: "toko-mainan-berantakan",
    voiceNarration:
      "Kira pergi ke toko mainan Paman. Kira ingin membantu Paman berjualan. Sampai di toko mainan, Kira kaget. Toko mainan Paman sangat berantakan. Pesawat, mobil-mobilan, boneka, dan bola berserakan di lantai. Kira membantu Paman merapikan mainannya. Ayo kita bantu Kira menghitung mainan.",
  },
  {
    id: "A8-S2",
    sceneType: "toko-mainan-rapi",
    voiceNarration:
      "Kira merapikan toko mainan. Mainan yang sama dikelompokkan di rak yang sama. Pesawat di satu rak, mobil-mobilan di rak lain, boneka di rak berikutnya, dan bola di rak terakhir. Mengelompokkan membuat toko menjadi rapi dan mainan mudah dihitung.",
  },
  {
    id: "A8-S3",
    sceneType: "daftar-mainan",
    voiceNarration:
      "Ayo kita hitung mainan yang sudah disusun. Ada dua belas pesawat. Ada delapan mobil-mobilan. Ada sepuluh boneka. Ada enam bola. Mainan apa yang paling banyak? Pesawat paling banyak, yaitu dua belas. Pesawat, boneka, bola, dan mobil-mobilan adalah contoh data. Data bisa dikelompokkan. Data bisa ditulis dalam daftar. Data menjadi mudah dibaca.",
  },
  {
    id: "A8-S4",
    sceneType: "kelompok-bola",
    voiceNarration:
      "Ayo kita kelompokkan bola dan hitung banyaknya. Ada tujuh bola merah. Ada empat bola kuning. Ada enam bola hijau. Bola yang paling banyak berwarna merah, banyaknya ada tujuh. Bola yang paling sedikit berwarna kuning, banyaknya ada empat. Kita juga bisa menghitung dengan turus. Satu goresan untuk satu bola, dan setiap lima goresan dicoret miring.",
  },
  {
    id: "A8-S5",
    sceneType: "tabel-bola-upe",
    voiceNarration:
      "Upe mempunyai banyak bola. Ada tujuh bola merah, empat bola kuning, dan enam bola hijau. Upe ingin menyajikan data bolanya dalam tabel. Tabel terdiri dari baris dan kolom. Baris berjalan ke samping. Kolom berjalan ke bawah. Pada tabel bola Upe, merah ada tujuh, kuning ada empat, dan hijau ada enam.",
  },
  {
    id: "A8-S6",
    sceneType: "tabel-menurun-mendatar",
    voiceNarration:
      "Ayo belajar membaca tabel. Tabel A bentuknya menurun, jadi nama warna ada di bawah satu sama lain. Tabel B bentuknya mendatar, jadi nama warna berjajar ke samping. Kedua tabel memuat data yang sama. Setiap tabel punya judul data, benda yang didata, dan banyak setiap data. Tabel memudahkan kita membaca data.",
  },
];

/** Peta pikiran enam simpul: dari mengamati benda sampai menceritakan data. */
export const PETA_PIKIRAN_A8: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Amati dan Kelompokkan",
    stepDesc:
      "Amati benda yang berserakan. Kumpulkan benda yang sama dalam satu kelompok, misalnya pesawat dengan pesawat dan bola dengan bola.",
    icon: "🧺",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Hitung Tiap Kelompok",
    stepDesc:
      "Hitung setiap kelompok satu per satu. Kamu boleh memakai turus, satu goresan untuk satu benda, dan lima goresan dicoret miring.",
    icon: "✋",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Tulis dalam Daftar",
    stepDesc:
      "Tulis hasil hitunganmu dalam daftar. Contohnya ada 12 pesawat, ada 8 mobil-mobilan. Data yang ditulis dalam daftar mudah dibaca.",
    icon: "📝",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Sajikan dalam Tabel",
    stepDesc:
      "Pindahkan data ke tabel. Tabel punya judul, baris, dan kolom. Tabel bisa menurun atau mendatar, dan datanya tetap sama.",
    icon: "📋",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Baca dan Bandingkan",
    stepDesc:
      "Baca tabel untuk mencari yang paling banyak, yang paling sedikit, dan yang sama banyak. Cari selisihnya dan jumlah semuanya.",
    icon: "🔍",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Ceritakan Datamu",
    stepDesc:
      "Ceritakan hasil datamu dengan kalimat. Misalnya bola merah paling banyak, ada tujuh. Periksa jumlahnya sama dengan banyak benda yang kamu hitung.",
    icon: "🗣️",
  },
];

export function CeritaDataA({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_A8} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
