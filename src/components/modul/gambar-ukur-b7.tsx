"use client";

import React from "react";
import { BIRU, BukuCerita, HIJAU, Latar, type Cerita } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import {
  AlasTeks,
  BukuG,
  DepaG,
  HurufBulat,
  Ket,
  KakiG,
  KlipG,
  KoinG,
  Label,
  MERAH_B7,
  MejaG,
  PensilG,
  SedotanG,
  StikG,
  TanganG,
} from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab B: Mengukur Panjang Benda (Buku Siswa Kelas 1 hlm. 208-218). */
/* Maskot: Igil si burung hantu. Tokoh buku: Malosi, Kira. Semua gambar       */
/* dibuat di klien (SVG), tanpa panggilan API.                                */
/* Naskah: naskah/mtk-1-bab7-sub-b-mengukur-panjang-benda.md                  */
/* ------------------------------------------------------------------------ */

/** Dinding dan lantai ruangan untuk adegan dalam kelas. */
function Ruang() {
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#FDF2D6" />
      <rect x="0" y="162" width="300" height="46" fill="#E8CFA0" />
      <path d="M0 162 H300" stroke="#C9A96A" strokeWidth="2" />
    </>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 208: Malosi paling tinggi. Berapa kira-kira tinggi badannya? */
function AdeganMalosi() {
  return (
    <>
      <Latar />
      <Tokoh x={66} y={176} rambut="#111827" baju={HIJAU} s={1.45} />
      <path d="M108 92 V176 M103 98 L108 92 L113 98 M103 170 L108 176 L113 170" fill="none" stroke={MERAH_B7} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <Ket x={128} y={142} teks="?" warna={MERAH_B7} ukuran={30} />
      <TanganG x={190} y={104} s={1} panah />
      <Ket x={190} y={142} teks="jengkal" ukuran={10.5} />
      <KakiG x={250} y={104} s={0.9} panah />
      <Ket x={250} y={148} teks="telapak kaki" ukuran={10} />
      <AlasTeks y={184} h={21} />
      <Ket x={150} y={198} teks="Kita bisa mengukur tinggi Malosi" ukuran={11.5} />
      <Label x={20} y={2} w={200} teks="Berapa tinggi Malosi?" ukuran={13} />
    </>
  );
}

/** Buku hlm. 208: alat ukur di sekitar kita. */
function AdeganAlat() {
  const panel = (c: number, r: number) => ({ x: 5 + c * 73, y: r === 0 ? 34 : 122 });
  const kotak = (c: number, r: number, nama: string, isi: React.ReactNode, ukuran = 9.5) => {
    const p = panel(c, r);
    return (
      <g key={nama}>
        <rect x={p.x} y={p.y} width="68" height="80" rx="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
        {isi}
        <Ket x={p.x + 34} y={p.y + 75} teks={nama} ukuran={ukuran} />
      </g>
    );
  };
  const p = (c: number, r: number) => panel(c, r);
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#EEF2FF" />
      {kotak(0, 0, "jengkal", <TanganG x={p(0, 0).x + 38} y={p(0, 0).y + 38} s={0.9} panah />)}
      {kotak(1, 0, "telapak kaki", <KakiG x={p(1, 0).x + 34} y={p(1, 0).y + 33} s={0.82} panah />)}
      {kotak(2, 0, "depa", <DepaG x={p(2, 0).x + 34} y={p(2, 0).y + 58} s={0.95} panah />)}
      {kotak(3, 0, "stik es krim", <StikG x={p(3, 0).x + 10} y={p(3, 0).y + 30} w={48} h={16} />)}
      {kotak(0, 1, "pensil", <PensilG x={p(0, 1).x + 6} y={p(0, 1).y + 38} panjang={56} warna="#EF4444" />)}
      {kotak(1, 1, "koin", <KoinG x={p(1, 1).x + 19} y={p(1, 1).y + 21} d={30} />)}
      {kotak(2, 1, "sedotan", <SedotanG x={p(2, 1).x + 6} y={p(2, 1).y + 34} w={56} h={10} />)}
      {kotak(3, 1, "penjepit kertas", <KlipG x={p(3, 1).x + 12} y={p(3, 1).y + 30} w={44} h={18} />, 7.6)}
      <Label x={40} y={2} w={220} teks="Alat ukur di sekitar" ukuran={13} />
    </>
  );
}

/** Buku hlm. 209: mengukur meja dengan sedotan. Panjang meja 4 sedotan. */
function AdeganMeja() {
  return (
    <>
      <Ruang />
      <path d="M30 70 V114 M270 70 V114" stroke={MERAH_B7} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <MejaG x={30} y={106} w={240} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <SedotanG x={30 + i * 60} y={97} w={60} h={9} urut={i} />
          <HurufBulat x={60 + i * 60} y={80} teks={String(i + 1)} />
        </g>
      ))}
      <Ket x={150} y={178} teks="Panjang meja = 4 sedotan" warna={MERAH_B7} ukuran={15} />
      <Ket x={150} y={196} teks="mulai dari ujung, rapat, tidak bertumpuk, tidak miring" ukuran={9.5} />
      <Label x={20} y={2} w={200} teks="Mengukur meja" ukuran={13} />
    </>
  );
}

/** Buku hlm. 209: cara mengukur yang benar dan yang salah. */
export function AdeganCara() {
  const lebarMeja = 70;
  const panel = (c: number, r: number) => ({ x: 6 + c * 98, y: r === 0 ? 34 : 118 });
  const lencana = (x: number, y: number, benar: boolean) => (
    <g>
      <circle cx={x} cy={y} r="9" fill={benar ? "#16A34A" : "#DC2626"} stroke={BIRU} strokeWidth="1.8" />
      <path d={benar ? `M${x - 4} ${y} L${x - 1} ${y + 3.4} L${x + 4.4} ${y - 3.6}` : `M${x - 3.4} ${y - 3.4} L${x + 3.4} ${y + 3.4} M${x + 3.4} ${y - 3.4} L${x - 3.4} ${y + 3.4}`} fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  const isiPanel = (c: number, r: number, nama: string, benar: boolean, sedotan: React.ReactNode) => {
    const p = panel(c, r);
    const x0 = p.x + 10;
    const y0 = p.y + 40;
    return (
      <g key={nama}>
        <rect x={p.x} y={p.y} width="92" height="78" rx="10" fill="#FFFFFF" stroke={benar ? "#16A34A" : "#DC2626"} strokeWidth="2.6" />
        {lencana(p.x + 14, p.y + 14, benar)}
        <MejaG x={x0} y={y0} w={lebarMeja} kaki={14} />
        {sedotan}
        <Ket x={p.x + 46} y={p.y + 73} teks={nama} ukuran={9.5} />
      </g>
    );
  };
  const x = (c: number, r: number) => panel(c, r).x + 10;
  const y = (c: number, r: number) => panel(c, r).y + 40;
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#EEF2FF" />
      {isiPanel(0, 0, "benar", true, [0, 1, 2, 3].map((i) => <SedotanG key={i} x={x(0, 0) + i * 17.5} y={y(0, 0) - 7} w={17.5} h={7} urut={i} />))}
      {isiPanel(1, 0, "bukan dari ujung", false, [0, 1, 2].map((i) => <SedotanG key={i} x={x(1, 0) + 14 + i * 17.5} y={y(1, 0) - 7} w={17.5} h={7} urut={i} />))}
      {isiPanel(2, 0, "ada celah", false, [0, 1, 2, 3].map((i) => <SedotanG key={i} x={x(2, 0) + i * 19} y={y(2, 0) - 7} w={14} h={7} urut={i} />))}
      {isiPanel(0, 1, "bertumpuk", false, [0, 1, 2, 3].map((i) => <SedotanG key={i} x={x(0, 1) + i * 12} y={y(0, 1) - 7 - (i % 2) * 5} w={20} h={7} urut={i} />))}
      {isiPanel(
        1,
        1,
        "miring",
        false,
        <g transform={`rotate(-14 ${x(1, 1)} ${y(1, 1) - 3})`}>
          {[0, 1, 2, 3].map((i) => (
            <SedotanG key={i} x={x(1, 1) + i * 17.5} y={y(1, 1) - 7} w={17.5} h={7} urut={i} />
          ))}
        </g>
      )}
      {isiPanel(
        2,
        1,
        "alat campur",
        false,
        <g>
          <SedotanG x={x(2, 1)} y={y(2, 1) - 8} w={22} h={8} urut={0} />
          <StikG x={x(2, 1) + 22} y={y(2, 1) - 11} w={26} h={11} />
          <KoinG x={x(2, 1) + 48} y={y(2, 1) - 20} d={20} />
        </g>
      )}
      <Label x={30} y={2} w={240} teks="Cara mengukur yang benar" ukuran={13} />
    </>
  );
}

/** Buku hlm. 209-210: mengukur meja dengan jengkal tangan. Panjang meja 5 jengkal. */
function AdeganJengkal() {
  return (
    <>
      <Ruang />
      <MejaG x={30} y={124} w={212} />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <TanganG x={55 + i * 42} y={104} s={1} />
          <HurufBulat x={51 + i * 42} y={62} teks={String(i + 1)} />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${30 + i * 42} 72 V124`} stroke={MERAH_B7} strokeWidth="1.6" strokeDasharray="3 4" opacity="0.7" />
      ))}
      <Ket x={150} y={180} teks="Panjang meja = 5 jengkal tangan" warna={MERAH_B7} ukuran={13.5} />
      <Ket x={150} y={198} teks="jengkal tangan setiap orang berbeda" ukuran={10.5} />
      <Label x={20} y={2} w={200} teks="Mengukur dengan jengkal" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 210: panjang buku diukur dengan stik es krim dan dengan koin. */
function AdeganBuku() {
  return (
    <>
      <Ruang />
      <path d="M30 34 V160 M270 34 V160" stroke={MERAH_B7} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <BukuG x={30} y={36} w={240} h={50} />
      {[0, 1].map((i) => (
        <StikG key={i} x={30 + i * 120} y={96} w={120} h={14} />
      ))}
      <Ket x={150} y={128} teks="2 stik es krim" ukuran={12} />
      {Array.from({ length: 12 }, (_, i) => (
        <KoinG key={i} x={30 + i * 20} y={138} d={20} />
      ))}
      <Ket x={150} y={174} teks="12 koin" ukuran={12} />
      <Ket x={150} y={192} teks="Alat ukurnya berbeda panjang," ukuran={10.5} />
      <Ket x={150} y={205} teks="jadi hasilnya berbeda" ukuran={10.5} />
      <Label x={40} y={2} w={220} teks="Buku diukur dua cara" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita mengukur panjang benda">
      {id === "B7-S1" && <AdeganMalosi />}
      {id === "B7-S2" && <AdeganAlat />}
      {id === "B7-S3" && <AdeganMeja />}
      {id === "B7-S4" && <AdeganCara />}
      {id === "B7-S5" && <AdeganJengkal />}
      {id === "B7-S6" && <AdeganBuku />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 208-210): tinggi Malosi, alat ukur, sedotan, aturan, jengkal, dan dua alat ukur. */
export const CERITA_B7: Cerita[] = [
  {
    id: "B7-S1",
    sceneType: "tinggi-malosi",
    voiceNarration:
      "Malosi adalah siswa paling tinggi di kelas. Menurut kamu, berapa kira-kira tinggi badan Malosi? Kita bisa mengukur tinggi badan Malosi. Kita juga bisa mengukur panjang benda. Kita bisa mengukurnya menggunakan jengkal, telapak kaki, atau benda lain di sekitar kita. Sebelum mengukur, coba tebak dulu berapa panjangnya.",
  },
  {
    id: "B7-S2",
    sceneType: "alat-ukur-sekitar",
    voiceNarration:
      "Inilah benda yang bisa kita pakai untuk mengukur. Ada jengkal, telapak kaki, dan depa. Ada stik es krim, pensil, koin, sedotan, dan penjepit kertas. Kamu juga boleh memakai benda lain di sekitarmu. Benda yang dipakai untuk mengukur disebut alat ukur.",
  },
  {
    id: "B7-S3",
    sceneType: "meja-sedotan",
    voiceNarration:
      "Bagaimana cara mengukur meja menggunakan sedotan? Mulai dari ujung meja. Taruh sedotan satu per satu, rapat, tidak bertumpuk, dan tidak miring. Lalu hitung banyak sedotannya. Satu, dua, tiga, empat. Panjang meja adalah empat sedotan.",
  },
  {
    id: "B7-S4",
    sceneType: "cara-mengukur-benar",
    voiceNarration:
      "Inilah cara mengukur yang benar. Pertama, mulai dari ujung benda. Kedua, alat ukur rapat. Ketiga, alat ukur tidak bertumpuk. Keempat, alat ukur tidak miring. Gambar yang bertanda centang hijau itu benar. Gambar yang bertanda silang merah itu salah. Ingat juga, gunakan satu jenis alat ukur yang sama dari awal sampai akhir.",
  },
  {
    id: "B7-S5",
    sceneType: "meja-jengkal",
    voiceNarration:
      "Bagaimana cara mengukur meja dengan jengkal tangan? Rentangkan jari-jarimu, lalu pindahkan tanganmu satu per satu. Ujung kelingking menyentuh tempat ujung jempol untuk jengkal berikutnya. Satu, dua, tiga, empat, lima. Panjang meja adalah lima jengkal tangan. Jengkal tangan setiap orang berbeda.",
  },
  {
    id: "B7-S6",
    sceneType: "buku-dua-alat-ukur",
    voiceNarration:
      "Berapa panjang buku? Kalau diukur dengan stik es krim, panjang buku adalah dua stik es krim. Kalau diukur dengan koin, panjang buku adalah dua belas koin. Mengapa hasilnya berbeda? Karena panjang stik es krim dan koin berbeda. Hasil pengukuran buku dengan stik es krim dan koin berbeda. Jadi kalau kita membandingkan, pakai alat ukur yang sama.",
  },
];

/** Peta pikiran enam simpul: dari menebak sampai memakai ukuran dalam hidup sehari-hari. */
export const PETA_PIKIRAN_B7: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Tebak Dulu",
    stepDesc:
      "Sebelum mengukur, tebak kira-kira berapa panjangnya. Tebakan membantu kita memeriksa apakah hasil ukur masuk akal.",
    icon: "🤔",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Pilih Alat Ukur",
    stepDesc:
      "Pilih alat ukur seperti jengkal, telapak kaki, depa, stik es krim, pensil, koin, sedotan, atau penjepit kertas. Pakai satu jenis saja sampai selesai.",
    icon: "🧰",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Ukur dengan Benar",
    stepDesc:
      "Mulai dari ujung benda. Letakkan alat ukur rapat, tidak bertumpuk, dan tidak miring. Pindahkan alat ukur satu per satu.",
    icon: "📏",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Tulis Hasilnya",
    stepDesc:
      "Hitung banyak alat ukur, lalu tulis dengan angka dan nama alat ukurnya. Contohnya panjang meja adalah 4 sedotan.",
    icon: "✍️",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Bandingkan Hasilnya",
    stepDesc:
      "Alat ukur yang berbeda memberi hasil yang berbeda. Kalau alat ukurnya sama, angka yang lebih besar berarti benda yang lebih panjang.",
    icon: "⚖️",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Pakai dalam Hidup",
    stepDesc:
      "Gunakan ukuran untuk menjaga diri, misalnya jarak aman membaca buku kira-kira 3 jengkal supaya mata sehat. Ayo ukur kakimu sendiri.",
    icon: "👣",
  },
];

export function CeritaUkurB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B7} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
