"use client";

import React from "react";
import {
  BIRU,
  BukuCerita,
  EMAS,
  HIJAU,
  KUNING,
  Latar,
  MERAH_MUDA,
  type Cerita,
} from "./CeritaBandingB";
import { Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { BIRU_B5, MERAH_B5 } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab D: Membandingkan Bilangan (Buku Siswa Kelas 1 hlm. 165-173). */
/* Maskot: Igil si burung hantu. Tokoh buku: Halim, Upe, Malosi, Kira, Wei,    */
/* Tika. Semua gambar dibuat di klien (SVG), tanpa panggilan API.             */
/* Naskah: naskah/mtk-1-bab5-sub-d-membandingkan-bilangan.md                  */
/* ------------------------------------------------------------------------ */

/** Label putih berbingkai. */
function Label({ x, y, w, teks, ukuran = 14 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="12" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

function Ket({ x, y, teks, warna = BIRU, ukuran = 12.5 }: { x: number; y: number; teks: string; warna?: string; ukuran?: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={warna}>
      {teks}
    </text>
  );
}

/** Satu bingkai sepuluh (lima kolom, dua baris). `isi` titik diisi dari kiri atas. */
function FrameTitik({ x, y, isi, warna, r = 5.4 }: { x: number; y: number; isi: number; warna: string; r?: number }) {
  return (
    <g>
      <rect x={x} y={y} width="72" height="30" rx="3" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.2" />
      <path d={`M${x} ${y + 15} H${x + 72} M${x + 14.4} ${y} V${y + 30} M${x + 28.8} ${y} V${y + 30} M${x + 43.2} ${y} V${y + 30} M${x + 57.6} ${y} V${y + 30}`} stroke={BIRU} strokeWidth="1" opacity="0.4" />
      {Array.from({ length: isi }, (_, i) => (
        <circle key={i} cx={x + 7.2 + (i % 5) * 14.4} cy={y + 7.5 + Math.floor(i / 5) * 15} r={r} fill={warna} stroke={BIRU} strokeWidth="1.3" />
      ))}
    </g>
  );
}

/** Satu bangunan titik dua bingkai: bingkai pertama penuh sepuluh, sisanya di bingkai kedua. */
function DuaFrame({ x, y, n, warna }: { x: number; y: number; n: number; warna: string }) {
  return (
    <g>
      <FrameTitik x={x} y={y} isi={Math.min(n, 10)} warna={warna} />
      {n > 10 ? <FrameTitik x={x} y={y + 34} isi={n - 10} warna={warna} /> : null}
    </g>
  );
}

const JERUK = "#F97316";

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 165: Halim punya 15 kelereng dan Upe punya 11. */
function AdeganDuaAnak() {
  return (
    <>
      <Latar />
      <Tokoh x={62} y={92} rambut="#1F2937" baju={HIJAU} s={0.72} angkat />
      <Tokoh x={238} y={92} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.72} angkat />
      <Lencana x={150} y={88} teks="?" r={19} />
      <DuaFrame x={26} y={100} n={15} warna={MERAH_B5} />
      <DuaFrame x={202} y={100} n={11} warna={MERAH_B5} />
      <Label x={14} y={172} w={96} teks="Halim: 15" ukuran={14} />
      <Label x={190} y={172} w={96} teks="Upe: 11" ukuran={14} />
      <Label x={46} y={4} w={208} teks="Siapa lebih banyak?" />
    </>
  );
}

/** Memasangkan satu-satu: delapan titik merah dan lima titik biru. Tiga titik merah tersisa. */
function AdeganPasangan() {
  return (
    <>
      <Latar />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${40 + i * 30} 76 V122`} stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={`a${i}`} cx={40 + i * 30} cy="66" r="11" fill={MERAH_B5} stroke={BIRU} strokeWidth="2.4" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <circle key={`b${i}`} cx={40 + i * 30} cy="132" r="11" fill={BIRU_B5} stroke={BIRU} strokeWidth="2.4" />
      ))}
      <rect x="168" y="48" width="86" height="36" rx="16" fill="none" stroke={EMAS} strokeWidth="3.6" strokeDasharray="7 5" />
      <Ket x={211} y={106} teks="sisa 3" warna="#B45309" ukuran={14} />
      <Tokoh x={276} y={192} rambut="#1F2937" baju={HIJAU} s={0.7} angkat />
      <Ket x={96} y={170} teks="merah lebih banyak 3" warna="#B91C1C" ukuran={13} />
      <Label x={50} y={4} w={200} teks="Pasangkan satu-satu" />
    </>
  );
}

/** Buku hlm. 166: jeruk Kira (10), Tika (14), dan Wei (12). */
function AdeganJeruk() {
  const kolom: { x: number; n: number; nama: string; ket: string; warna: string }[] = [
    { x: 14, n: 10, nama: "Kira 10", ket: "paling sedikit", warna: "#1D4ED8" },
    { x: 114, n: 14, nama: "Tika 14", ket: "paling banyak", warna: "#B91C1C" },
    { x: 214, n: 12, nama: "Wei 12", ket: "", warna: BIRU },
  ];
  return (
    <>
      <Latar />
      {kolom.map((k) => (
        <g key={k.nama}>
          <DuaFrame x={k.x} y={50} n={k.n} warna={JERUK} />
          <Ket x={k.x + 36} y={150} teks={k.nama} ukuran={14} />
          {k.ket ? <Ket x={k.x + 36} y={166} teks={k.ket} warna={k.warna} ukuran={11.5} /> : null}
        </g>
      ))}
      <Tokoh x={50} y={198} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.5} angkat />
      <Tokoh x={150} y={198} rambut="#1F2937" baju={EMAS} s={0.5} angkat />
      <Tokoh x={250} y={198} rambut="#7A4A1E" baju={HIJAU} s={0.5} angkat />
      <Label x={36} y={2} w={228} teks="Jeruk siapa paling banyak?" ukuran={13} />
    </>
  );
}

/** Tiga anak berbaris menurut bilangan di kartu mereka: 10, 12, 14. */
function AdeganBaris() {
  const anak: { x: number; tinggi: number; n: number; baju: string; rambut: string }[] = [
    { x: 64, tinggi: 10, n: 10, baju: MERAH_MUDA, rambut: "#7A4A1E" },
    { x: 150, tinggi: 28, n: 12, baju: HIJAU, rambut: "#1F2937" },
    { x: 236, tinggi: 46, n: 14, baju: EMAS, rambut: "#7A4A1E" },
  ];
  return (
    <>
      <Latar />
      {anak.map((a) => {
        const kaki = 176 - a.tinggi;
        return (
          <g key={a.n}>
            <rect x={a.x - 34} y={176 - a.tinggi} width="68" height={a.tinggi} rx="4" fill="#DDD6FE" stroke={BIRU} strokeWidth="2.6" />
            <Tokoh x={a.x} y={kaki} rambut={a.rambut} baju={a.baju} s={0.8} angkat />
            <rect x={a.x - 22} y={kaki - 92} width="44" height="34" rx="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
            <text x={a.x} y={kaki - 68} textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
              {a.n}
            </text>
          </g>
        );
      })}
      <path d="M30 194 H262" stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 9" />
      <polygon points="272,194 260,186 260,202" fill={EMAS} stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
      <Label x={46} y={2} w={208} teks="10, 12, 14: makin besar" ukuran={13} />
    </>
  );
}

/** Buku hlm. 173: dua stoples kelereng, A berisi 13 dan B berisi 16. */
function Stoples({ x, n, huruf }: { x: number; n: number; huruf: string }) {
  const warna = [MERAH_B5, BIRU_B5, "#16A34A", EMAS, "#9333EA"];
  return (
    <g>
      <rect x={x + 8} y="42" width="72" height="12" rx="4" fill="#F3B15A" stroke={BIRU} strokeWidth="2.6" />
      <rect x={x} y="52" width="88" height="100" rx="16" fill="#E0F2FE" fillOpacity="0.9" stroke={BIRU} strokeWidth="3.2" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={x + 14 + (i % 6) * 12.2} cy={142 - Math.floor(i / 6) * 13} r="5.6" fill={warna[i % warna.length]} stroke={BIRU} strokeWidth="1.5" />
      ))}
      <Ket x={x + 44} y={172} teks={`Stoples ${huruf}: ${n}`} ukuran={13} />
    </g>
  );
}

function AdeganStoples() {
  return (
    <>
      <Latar />
      <Stoples x={34} n={13} huruf="A" />
      <Stoples x={178} n={16} huruf="B" />
      <text x="150" y="112" textAnchor="middle" fontSize="38" fontWeight="900" fill="#B91C1C">
        &lt;
      </text>
      <Tokoh x={286} y={196} rambut="#7A4A1E" baju={KUNING} s={0.55} angkat />
      <Label x={50} y={2} w={200} teks="Ayo Berkarya: dua stoples" ukuran={13} />
    </>
  );
}

/** Garis bilangan: 15 di kanan 11, jadi 15 lebih besar. */
function AdeganGaris() {
  const x = (n: number) => 20 + (n - 10) * 26;
  return (
    <>
      <Latar />
      <path d="M10 118 H290 M284 112 L290 118 L284 124" fill="none" stroke={BIRU} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: 11 }, (_, i) => {
        const n = 10 + i;
        const sorot = n === 11 || n === 15;
        return (
          <g key={n}>
            <path d={`M${x(n)} ${sorot ? 108 : 111} V125`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
            <text x={x(n)} y="144" textAnchor="middle" fontSize={sorot ? 14 : 11.5} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
              {n}
            </text>
          </g>
        );
      })}
      {[11, 15].map((n, i) => (
        <g key={n}>
          <path d={`M${x(n)} 106 V84`} stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
          <circle cx={x(n)} cy="70" r="15" fill={i === 0 ? "#BFDBFE" : "#FFE566"} stroke={BIRU} strokeWidth="3" />
          <text x={x(n)} y="76" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
            {n}
          </text>
        </g>
      ))}
      <path d={`M${x(11) + 18} 52 H${x(15) - 18}`} stroke={EMAS} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <polygon points={`${x(15) - 12},52 ${x(15) - 24},44 ${x(15) - 24},60`} fill={EMAS} stroke={BIRU} strokeWidth="1.5" strokeLinejoin="round" />
      <Ket x={150} y={170} teks="makin ke kanan, makin besar" warna={BIRU} ukuran={13} />
      <Tokoh x={30} y={196} rambut="#1F2937" baju={MERAH_MUDA} s={0.55} angkat />
      <Label x={36} y={2} w={228} teks="Bandingkan di garis bilangan" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita membandingkan bilangan">
      {id === "D5-S1" && <AdeganDuaAnak />}
      {id === "D5-S2" && <AdeganPasangan />}
      {id === "D5-S3" && <AdeganJeruk />}
      {id === "D5-S4" && <AdeganBaris />}
      {id === "D5-S5" && <AdeganStoples />}
      {id === "D5-S6" && <AdeganGaris />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 165-173) dan pengayaan pasangan serta garis bilangan. */
export const CERITA_D5: Cerita[] = [
  {
    id: "D5-S1",
    sceneType: "dua-kelompok-kelereng",
    voiceNarration:
      "Halim memiliki lima belas kelereng. Upe memiliki sebelas kelereng. Kelereng siapa yang lebih banyak? Kelereng siapa yang lebih sedikit? Bagaimana kita tahu? Kita hitung dulu. Lima belas lebih banyak dari sebelas, dan sebelas lebih sedikit dari lima belas. Jadi kelereng Halim lebih banyak dari kelereng Upe, dan kelereng Upe lebih sedikit dari kelereng Halim.",
  },
  {
    id: "D5-S2",
    sceneType: "pasangkan-satu-satu",
    voiceNarration:
      "Ada cara lain untuk membandingkan, yaitu memasangkan satu-satu. Setiap benda di kelompok pertama dipasangkan dengan satu benda di kelompok kedua. Benda yang tidak punya pasangan adalah sisanya. Kelompok yang masih punya sisa adalah kelompok yang lebih banyak. Di gambar ini, titik merah masih punya sisa tiga, jadi titik merah lebih banyak tiga daripada titik biru.",
  },
  {
    id: "D5-S3",
    sceneType: "tiga-kelompok-jeruk",
    voiceNarration:
      "Kira mempunyai sepuluh jeruk. Tika mempunyai empat belas jeruk. Wei mempunyai dua belas jeruk. Jeruk siapa yang paling banyak? Jeruk siapa yang paling sedikit? Tika mempunyai jeruk paling banyak. Kira mempunyai jeruk paling sedikit. Kalau ada tiga kelompok atau lebih, kita memakai kata paling banyak dan paling sedikit.",
  },
  {
    id: "D5-S4",
    sceneType: "baris-bilangan",
    voiceNarration:
      "Bilangan sepuluh, empat belas, dan dua belas dapat kita urutkan. Urutan dari bilangan terkecil adalah sepuluh, dua belas, empat belas. Urutan dari bilangan terbesar adalah empat belas, dua belas, sepuluh. Ayo berbaris seperti angka-angka ini! Dari kiri ke kanan, bilangannya makin besar.",
  },
  {
    id: "D5-S5",
    sceneType: "dua-stoples",
    voiceNarration:
      "Ayo berkarya! Ada dua stoples kelereng. Stoples A berisi tiga belas kelereng, yaitu satu puluhan dan tiga satuan. Stoples B berisi enam belas kelereng, yaitu satu puluhan dan enam satuan. Kita bandingkan. Puluhannya sama, jadi kita lihat satuannya. Tiga lebih sedikit dari enam. Jadi kelereng di stoples A lebih sedikit dari stoples B.",
  },
  {
    id: "D5-S6",
    sceneType: "garis-bilangan-banding",
    voiceNarration:
      "Garis bilangan juga membantu kita membandingkan. Di garis bilangan, bilangan yang berada lebih ke kanan lebih besar. Lima belas berada di sebelah kanan sebelas, jadi lima belas lebih besar dari sebelas. Dan sebelas berada di sebelah kiri lima belas, jadi sebelas lebih kecil dari lima belas.",
  },
];

/** Peta pikiran enam simpul: dari menghitung sampai mengecek dengan puluhan dan garis bilangan. */
export const PETA_PIKIRAN_D5: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Hitung Masing-Masing",
    stepDesc:
      "Hitung banyak benda di setiap kelompok dengan teliti, satu per satu. Jangan menebak dari kelihatannya saja, karena kelompok yang tersebar bisa tampak lebih banyak padahal tidak.",
    icon: "🔢",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Pasangkan Satu-Satu",
    stepDesc:
      "Pasangkan satu benda dari kelompok pertama dengan satu benda dari kelompok kedua. Kelompok yang masih punya benda tanpa pasangan adalah kelompok yang lebih banyak. Banyak sisanya menunjukkan berapa lebihnya.",
    icon: "🔗",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Lebih Banyak, Lebih Sedikit",
    stepDesc:
      "Untuk dua kelompok: lima belas lebih banyak dari sebelas, dan sebelas lebih sedikit dari lima belas. Kalau jumlahnya sama, kita bilang sama banyak.",
    icon: "⚖️",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Paling Banyak, Paling Sedikit",
    stepDesc:
      "Untuk tiga kelompok atau lebih: ada yang paling banyak dan ada yang paling sedikit. Pada sepuluh, dua belas, dan empat belas, empat belas paling banyak dan sepuluh paling sedikit.",
    icon: "🏆",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Urutkan Bilangan",
    stepDesc:
      "Urutan dari terkecil: sepuluh, dua belas, empat belas. Urutan dari terbesar: empat belas, dua belas, sepuluh. Dari terkecil ke terbesar mirip menghitung maju, dan dari terbesar ke terkecil mirip menghitung mundur.",
    icon: "📶",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Cek dengan Puluhan dan Garis Bilangan",
    stepDesc:
      "Bandingkan puluhan lebih dulu. Kalau puluhannya sama, bandingkan satuannya. Di garis bilangan, bilangan yang lebih ke kanan lebih besar.",
    icon: "📏",
  },
];

export function CeritaPerbandinganD({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_D5} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
