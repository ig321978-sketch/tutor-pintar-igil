"use client";

import React from "react";
import { type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, KotakPoster, PoinK2B2, TabelPoster } from "./kit-k2b2";
import { BIRU, BendaDatarSvg, BentukSvg } from "./dasar-k2b3";
import { DetektifTeks, IsiTabel, PetaKonsepGame } from "./permainan-k2b3";
import { PETA_KONSEP_A, RONDE_DETEKTIF_A, RONDE_TABEL_A, namaSegi } from "./data-k2b3";
import { SUB_A3 } from "./naskah-k2b3";
import { LangkahCariK2B3A, LangkahCetakK2B3A, LangkahPapanK2B3A, LangkahPilahK2B3A } from "./SubBabK2B3AConcrete";
import { KartuGarisK2B3A, KartuTandaiK2B3A, KartuWarnaiK2B3A } from "./SubBabK2B3APicture";
import { UbinBentuk } from "./dasar-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab A: Bangun Datar. Poster Infografis (sepuluh panel dari */
/* naskah), tiga permainan Abstract, dan pembungkus tiga tahap permainan.      */
/* Naskah: naskah/mtk-2-bab3-sub-a-bangun-datar.md. Tanpa API.                 */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman bangun datar. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

/** Lintasan segi enam datar untuk sarang lebah. */
function heksa(cx: number, cy: number, r: number): string {
  return `M${Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" L")} Z`;
}

function SarangLebah() {
  const r = 15;
  const jarak = Math.sqrt(3) * r;
  const pusat: [number, number][] = [[50, 43]];
  for (let k = 0; k < 6; k += 1) {
    const a = ((30 + 60 * k) * Math.PI) / 180;
    pusat.push([50 + jarak * Math.cos(a), 43 + jarak * Math.sin(a)]);
  }
  return (
    <svg viewBox="0 0 100 86" className="h-28 w-32" role="img" aria-label="Sarang lebah: banyak segi enam berdempetan">
      {pusat.map(([x, y], i) => (
        <path key={i} d={heksa(x, y, r - 0.6)} fill={i === 0 ? "#FBBF24" : "#FDE68A"} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

function SisiDanPojok() {
  return (
    <svg viewBox="0 0 150 100" className="mx-auto h-28 w-44" role="img" aria-label="Segitiga dengan tiga sisi dan tiga pojok">
      <path d="M75 10 L130 88 L20 88 Z" fill="#FEF3C7" stroke={BIRU} strokeWidth="3.4" strokeLinejoin="round" />
      {[[75, 10], [130, 88], [20, 88]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.6" fill="#E53E3E" stroke={BIRU} strokeWidth="1.6" />
      ))}
      <text x="112" y="44" fontSize="11" fontWeight="900" fill={BIRU}>sisi 1</text>
      <text x="56" y="99" fontSize="11" fontWeight="900" fill={BIRU}>sisi 2</text>
      <text x="14" y="44" fontSize="11" fontWeight="900" fill={BIRU}>sisi 3</text>
      <text x="85" y="14" fontSize="10" fontWeight="900" fill="#B91C1C">pojok</text>
    </svg>
  );
}

function visualInfografis(): React.ReactNode[] {
  return [
    /* 1 Sarang Lebah Segi Enam */
    <div key="1" className="flex items-center justify-center gap-3">
      <SarangLebah />
      <KotakPoster warna="#FEF3C7">
        <p className="text-center text-4xl font-black text-[#1C01A5]">6</p>
        <p className="text-center text-sm font-black leading-tight text-[#1C01A5]">sisi</p>
        <p className="text-center text-xs font-black text-[#1C01A5]/70">segi enam</p>
      </KotakPoster>
    </div>,
    /* 2 Tiga Bentuk Dasar */
    <div key="2" className="grid grid-cols-3 gap-2">
      <UbinBentuk id="segitiga" nama="Segitiga" warna="#FDE68A" />
      <UbinBentuk id="persegi" nama="Segi empat" warna="#BFDBFE" />
      <UbinBentuk id="lingkaran" nama="Bentuk lengkung" warna="#FBCFE8" />
    </div>,
    /* 3 Garis Lurus dan Sisi */
    <SisiDanPojok key="3" />,
    /* 4 Segi Banyak */
    <div key="4" className="grid grid-cols-4 gap-1.5">
      <UbinBentuk id="segitiga" nama="3 sisi" warna="#FDE68A" />
      <UbinBentuk id="persegi" nama="4 sisi" warna="#BFDBFE" />
      <UbinBentuk id="segiLima" nama="5 sisi" warna="#BBF7D0" />
      <UbinBentuk id="segiEnam" nama="6 sisi" warna="#FBCFE8" />
    </div>,
    /* 5 Kurva dan Bentuk Lengkung */
    <div key="5" className="grid grid-cols-3 gap-2">
      <UbinBentuk id="lingkaran" nama="Lingkaran" warna="#FDE68A" />
      <UbinBentuk id="oval" nama="Bentuk telur" warna="#BFDBFE" />
      <UbinBentuk id="hati" nama="Bentuk hati" warna="#FBCFE8" />
    </div>,
    /* 6 Banyak Sisi Menentukan Nama */
    <TabelPoster
      key="6"
      kolom="0.8fr 1.4fr"
      kepala={["Banyak sisi", "Nama bangun"]}
      baris={[
        ["3", "Segitiga"],
        ["4", "Segi empat"],
        ["5", "Segi lima"],
        ["6", "Segi enam"],
      ]}
    />,
    /* 7 Segi Lima dan Segi Enam di Sekitar Kita */
    <div key="7" className="space-y-1.5">
      <p className="text-sm font-black text-[#1C01A5]">Segi lima (5 sisi)</p>
      <div className="grid grid-cols-3 gap-1.5">
        {(["rumahBurung", "tehCelup", "rumah"] as const).map((id, i) => (
          <KotakPoster key={id}>
            <BendaDatarSvg id={id} kelas="mx-auto h-12 w-12" />
            <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{["Rumah burung", "Teh celup", "Rumah"][i]}</p>
          </KotakPoster>
        ))}
      </div>
      <p className="text-sm font-black text-[#1C01A5]">Segi enam (6 sisi)</p>
      <div className="grid grid-cols-3 gap-1.5">
        {(["sarangLebah", "ubinLantai", "jamDinding"] as const).map((id, i) => (
          <KotakPoster key={id}>
            <BendaDatarSvg id={id} kelas="mx-auto h-12 w-12" />
            <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{["Sarang lebah", "Ubin lantai", "Jam dinding"][i]}</p>
          </KotakPoster>
        ))}
      </div>
    </div>,
    /* 8 Pola Nama Segi Banyak */
    <div key="8" className="grid grid-cols-3 gap-1.5">
      {(
        [
          ["segitiga", 3],
          ["persegi", 4],
          ["segiLima", 5],
          ["segiEnam", 6],
          ["segiTujuh", 7],
          ["segiDelapan", 8],
        ] as const
      ).map(([id, n], i) => (
        <UbinBentuk key={id} id={id} nama={`${n} sisi: ${namaSegi(n)}`} warna={["#FDE68A", "#BFDBFE", "#BBF7D0", "#FBCFE8", "#DDD6FE", "#FDBA74"][i]} />
      ))}
    </div>,
    /* 9 Lingkaran: Cetak dan Putar */
    <div key="9" className="grid grid-cols-3 gap-1.5">
      <KotakPoster>
        <BendaDatarSvg id="koin" kelas="mx-auto h-14 w-14" />
        <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">1. Letakkan koin</p>
      </KotakPoster>
      <KotakPoster>
        <BentukSvg id="lingkaran" kosong putus kelas="mx-auto h-14 w-14" />
        <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">2. Cetak tepinya</p>
      </KotakPoster>
      <KotakPoster>
        <div className="relative mx-auto h-14 w-14">
          <BentukSvg id="lingkaran" warna="#FCD34D" kelas="h-14 w-14" />
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-black text-[#1C01A5]">↻</span>
        </div>
        <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">3. Putar: selalu pas</p>
      </KotakPoster>
    </div>,
    /* 10 Tiga Pertanyaan Detektif */
    <div key="10" className="space-y-1.5">
      {[
        ["1", "Dibatasi garis lurus atau garis lengkung?"],
        ["2", "Kalau garis lurus, berapa sisinya?"],
        ["3", "Kalau garis lengkung, pas bila diputar?"],
      ].map(([n, t]) => (
        <KotakPoster key={n} warna={n === "1" ? "#DBEAFE" : n === "2" ? "#FEF3C7" : "#FCE7F3"}>
          <p className="flex items-center gap-2 text-sm font-black leading-snug text-[#1C01A5]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-white">{n}</span>
            {t}
          </p>
        </KotakPoster>
      ))}
    </div>,
  ];
}

export function InfografisK2B3AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A3} judul="Bangun Datar" suaraInfo={SUARA_INFO} visual={visualInfografis()} speakGuru={speakGuru} />;
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar benda.                 */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Isi Tabel Ciri ------------------------------------ */

function RondeTabel({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_TABEL_A[ronde];
  return (
    <>
      <CatatanPensil pendek={r.judul} teks={`${r.judul}. Ketuk baris tabel, lalu ketuk kartu jawaban yang tepat. Nama segi banyak mengikuti banyak sisinya.`} />
      <IsiTabel
        kepala={ronde === 0 ? ["Bangun datar", "Banyak sisi"] : ["Banyak sisi", "Nama"]}
        baris={r.baris}
        kartu={r.kartu}
        petunjuk={(b) => (ronde === 0 ? `Hitung sisinya. ${b.label} punya ${b.jawab} sisi.` : `Nama mengikuti banyak sisi. ${b.label} namanya ${b.jawab.toLowerCase()}.`)}
        onBeres={onBeres}
        pesanBeres="Tabel sudah lengkap. Banyak sisi menentukan nama segi banyak."
      />
    </>
  );
}

export function KartuTabelK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Tabel Ciri"
      warna="#BBF7D0"
      petunjuk="Ketuk baris tabel, lalu ketuk kartu jawaban yang tepat. Pada ronde pertama, tulis banyak sisi. Pada ronde kedua, tulis nama bangunnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-tabel"
      jumlahRonde={RONDE_TABEL_A.length}
      belumSiap="Isi semua baris tabel dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Bentuk Misterius ------------------------- */

function RondeDetektif({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  return (
    <>
      <CatatanPensil pendek="Baca dua petunjuk" teks="Baca kedua petunjuk. Ketuk petunjuk untuk mendengarnya. Lalu pilih nama bangun datar yang cocok dengan kedua petunjuk." />
      <DetektifTeks soal={RONDE_DETEKTIF_A[ronde]} onBeres={onBeres} pesanBeres={(n) => `Betul! Bangun datar itu adalah ${n}.`} />
    </>
  );
}

export function KartuDetektifK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Bentuk Misterius"
      warna="#FDE68A"
      petunjuk="Baca kedua petunjuk tentang bangun datar misterius. Lalu pilih nama yang cocok dengan kedua petunjuk."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-detektif"
      jumlahRonde={RONDE_DETEKTIF_A.length}
      belumSiap="Temukan namanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Peta Konsep Bangun Datar ------------------------- */

function RondePeta({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const p = PETA_KONSEP_A[ronde];
  return (
    <>
      <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
      <PetaKonsepGame pusat={p.pusat} kotak={p.kotak} onBeres={onBeres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
    </>
  );
}

export function KartuPetaK2B3A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Peta Konsep Bangun Datar"
      warna="#C7D2FE"
      petunjuk="Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat untuk kotak itu."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3a-peta"
      jumlahRonde={PETA_KONSEP_A.length}
      belumSiap="Lengkapi peta konsepnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePeta ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahPilahK2B3A {...d} /> },
  { nomor: 2, render: (d) => <LangkahPapanK2B3A {...d} /> },
  { nomor: 3, render: (d) => <LangkahCetakK2B3A {...d} /> },
  { nomor: 4, render: (d) => <LangkahCariK2B3A {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuTandaiK2B3A {...d} /> },
  { nomor: 6, render: (d) => <KartuGarisK2B3A {...d} /> },
  { nomor: 7, render: (d) => <KartuWarnaiK2B3A {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuTabelK2B3A {...d} /> },
  { nomor: 9, render: (d) => <KartuDetektifK2B3A {...d} /> },
  { nomor: 10, render: (d) => <KartuPetaK2B3A {...d} /> },
];

export function ConcreteK2B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Pegang, seret, dan hitung!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B3A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A3} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
