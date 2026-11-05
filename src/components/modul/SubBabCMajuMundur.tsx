"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { BIRU, EMAS, KUNING } from "./CeritaBandingB";
import { KatakWajah } from "./gambar-maju-mundur-c";
import {
  AnakPapan,
  GarisBilangan,
  HubungkanTitik,
  TumpukanBalok,
  warnaBalok,
  type Titik,
} from "./alat-c";
import {
  JawabSuara,
  JudulGame,
  KABAR_TULIS_OK,
  KabarChip,
  Letusan,
  PanelPoster,
  STIKER,
  TombolLanjut,
  kata,
  useLetusan,
  type Kabar,
  type PanelSuara,
  type Umum,
} from "./SubBabBBanding";
import {
  ALAS,
  BendaSeret,
  CatatanPensil,
  CatatanTempel,
  GAYA_KERTAS,
  GAYA_KOTAK,
  GAYA_MEJA,
  GAYA_POSTER,
  PitaTahap,
  SpiralBuku,
  SuaraCtx,
  useBicara,
  zonaDi,
} from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Sub-Bab C: Menghitung Maju dan Mundur. Semua di klien, tanpa API.          */
/* Naskah: naskah/mtk-1-bab1-sub-c-maju-mundur.md                             */
/* Gaya: permainan anak. Katak pemandu, tangga balok, kereta, roket.          */
/* Tanpa simbol tambah dan kurang. Hanya panah, kata, dan bilangan.           */
/* ------------------------------------------------------------------------ */

/** Katak dan gelembung kata pendek. Diketuk, katak membacakan petunjuk lengkapnya. */
function KatakBicara({ pendek, teks }: { pendek: string; teks?: string }) {
  const ucap = useContext(SuaraCtx);
  const isi = teks ?? pendek;
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${isi}`}
      onClick={() => ucap(isi)}
      className="igil-tanpa-tepi flex w-full items-end gap-2 text-left"
    >
      <KatakWajah kelas="h-14 w-20 shrink-0 igil-lompat" />
      <span className="relative flex min-w-0 flex-1 items-center justify-between gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-lg font-black leading-snug text-[#1C01A5]">
        <span className="min-w-0">{pendek}</span>
        <span aria-hidden="true">🔊</span>
      </span>
    </button>
  );
}

function urut(dari: number, sampai: number): number[] {
  const hasil: number[] = [];
  if (dari <= sampai) for (let n = dari; n <= sampai; n++) hasil.push(n);
  else for (let n = dari; n >= sampai; n--) hasil.push(n);
  return hasil;
}

const jepit = (n: number) => Math.min(10, Math.max(1, n));

/** Deretan bilangan beranak panah. Dipakai untuk poster dan hasil kartu. */
function Rantai({ deret, warna = KUNING }: { deret: (number | string)[]; warna?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1.5">
      {deret.map((n, i) => (
        <React.Fragment key={i}>
          {i > 0 ? (
            <span className="text-lg font-black leading-none text-[#1C01A5]" aria-hidden="true">
              →
            </span>
          ) : null}
          <span
            className="flex h-9 min-w-9 items-center justify-center rounded-full border-4 border-[#1C01A5] px-1 text-lg font-black leading-none text-[#1C01A5]"
            style={{ backgroundColor: warna }}
          >
            {n}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman menghitung maju dan mundur. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

function TanggaMini({ arah }: { arah: "naik" | "turun" }) {
  return (
    <svg
      viewBox="0 0 300 130"
      className="block h-auto w-full"
      role="img"
      aria-label={arah === "naik" ? "Tangga balok naik satu sampai sepuluh" : "Tangga balok turun sepuluh sampai satu"}
    >
      <line x1="2" x2="298" y1="109" y2="109" stroke={BIRU} strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 10 }, (_, i) => {
        const n = arah === "naik" ? i + 1 : 10 - i;
        const h = n * 8;
        const x = 6 + i * 29;
        const cx = x + 13.5;
        const ty = 108 - h - 13;
        return (
          <g key={i}>
            <rect x={x} y={108 - h} width="27" height={h} rx="3" fill={warnaBalok(n)} stroke={BIRU} strokeWidth="2" />
            <text x={cx} y={123} textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
              {n}
            </text>
            <polygon
              points={
                arah === "naik"
                  ? `${cx - 6},${ty + 9} ${cx + 6},${ty + 9} ${cx},${ty}`
                  : `${cx - 6},${ty} ${cx + 6},${ty} ${cx},${ty + 9}`
              }
              fill={arah === "naik" ? EMAS : BIRU}
              stroke={BIRU}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

const INGAT = [
  {
    ikon: "⬆️",
    nama: "Maju",
    ket: "kecil → besar",
    suara: "Hitung maju. Mulai dari bilangan kecil ke besar. Setiap langkah bertambah satu.",
  },
  {
    ikon: "⬇️",
    nama: "Mundur",
    ket: "besar → kecil",
    suara: "Hitung mundur. Mulai dari bilangan besar ke kecil. Setiap langkah berkurang satu.",
  },
  {
    ikon: "🧭",
    nama: "Tetangga",
    ket: "sebelum, sesudah",
    suara: "Cek tetangga. Mundur satu langkah adalah sebelum. Maju satu langkah adalah sesudah.",
  },
];

export function InfografisMajuMundurC({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <div className="space-y-3 rounded-[2rem] border-4 border-[#16A34A] bg-[#F0FDF4] p-3" style={GAYA_POSTER}>
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Tangga Maju dan Mundur</h3>
        <button
          type="button"
          onClick={() => speakGuru(SUARA_INFO)}
          className="shrink-0 rounded-full border-[3px] border-[#FFE566] bg-[#1C01A5] px-3 py-2 text-xs font-black text-[#FFE566] shadow-md"
        >
          🔊 Suara Guru
        </button>
      </div>

      <PanelPoster
        nomor={1}
        judul="MAJU: 1 SAMPAI 10"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Menghitung maju dimulai dari bilangan kecil ke besar: satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh. Setiap langkah bertambah satu."
      >
        <TanggaMini arah="naik" />
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="MUNDUR: 10 SAMPAI 1"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Menghitung mundur dimulai dari bilangan besar ke kecil: sepuluh, sembilan, delapan, tujuh, enam, lima, empat, tiga, dua, satu. Setiap langkah berkurang satu."
      >
        <TanggaMini arah="turun" />
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="LANJUTKAN DARI TENGAH"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Kita boleh mulai menghitung dari bilangan mana saja. Maju dari empat: empat, lima, enam, tujuh, delapan. Mundur dari delapan: delapan, tujuh, enam, lima, empat."
      >
        <div className="space-y-2">
          <div className="space-y-1">
            <p className="text-center text-xs font-black text-[#92400E]">⬆️ Maju dari 4</p>
            <Rantai deret={urut(4, 8)} warna={KUNING} />
          </div>
          <div className="space-y-1">
            <p className="text-center text-xs font-black text-[#1E3A8A]">⬇️ Mundur dari 8</p>
            <Rantai deret={urut(8, 4)} warna="#C7D2FE" />
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="SEBELUM, DI ANTARA, SESUDAH"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Di sekitar angka enam: satu langkah mundur adalah lima, satu langkah maju adalah tujuh. Enam ada di antara lima dan tujuh."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { n: 5, nama: "Sebelum", sorot: false },
            { n: 6, nama: "Di antara", sorot: true },
            { n: 7, nama: "Sesudah", sorot: false },
          ].map((b) => (
            <div key={b.n} className="space-y-1">
              <p className="text-xs font-black text-[#1C01A5]">{b.nama}</p>
              <div
                className={`flex h-16 items-center justify-center rounded-[50%] border-4 border-[#1C01A5] text-4xl font-black text-[#1C01A5] ${
                  b.sorot ? "bg-[#FFE566] shadow-[0_4px_0_rgba(240,171,0,0.7)]" : "bg-[#F1ECE0]"
                }`}
              >
                {b.n}
              </div>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="GARIS BILANGAN"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Pada garis bilangan, melompat ke kanan berarti menghitung maju. Melompat ke kiri berarti menghitung mundur."
      >
        <div className="space-y-1">
          <GarisBilangan
            posisi={5}
            busur={[
              { dari: 5, ke: 8, warna: EMAS },
              { dari: 5, ke: 2, warna: BIRU },
            ]}
          />
          <div className="flex justify-between px-2 text-sm font-black text-[#1C01A5]">
            <span>⬅️ Mundur</span>
            <span>Maju ➡️</span>
          </div>
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-3 gap-2">
          {INGAT.map((g) => (
            <button
              key={g.nama}
              type="button"
              aria-label={`Dengarkan: ${g.nama}`}
              onClick={() => speakGuru(g.suara)}
              className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl bg-[#F0FDF4] px-1 py-2 text-center"
            >
              <span className="text-3xl">{g.ikon}</span>
              <span className="text-base font-black leading-tight text-[#14532D]">{g.nama}</span>
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]/80">{g.ket}</span>
              <span className="text-sm" aria-hidden="true">
                🔊
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete (tujuh kegiatan)                                         */
/* ------------------------------------------------------------------------ */

type LangkahC = {
  kegiatan: number;
  tipe: "tangga" | "lengkapi" | "berantai" | "gerbong" | "cerita" | "tulis" | "lab";
  putaran?: 0 | 1;
};

const LANGKAH_CONCRETE: LangkahC[] = [
  { kegiatan: 1, tipe: "tangga", putaran: 0 },
  { kegiatan: 1, tipe: "tangga", putaran: 1 },
  { kegiatan: 2, tipe: "lengkapi" },
  { kegiatan: 3, tipe: "berantai" },
  { kegiatan: 4, tipe: "gerbong" },
  { kegiatan: 5, tipe: "cerita" },
  { kegiatan: 6, tipe: "tulis" },
  { kegiatan: 7, tipe: "lab" },
];

const JUMLAH_KEGIATAN = 7;

const SUARA_TANGGA =
  "Ayo bantu Upe menaiki tangga balok satu per satu. Pasang balok dari kiri ke kanan, lalu ucapkan bilangan pada tangga terakhir.";
const SUARA_LENGKAPI =
  "Ada anak tangga yang belum terisi. Perhatikan urutan bilangannya, lalu seret tumpukan balok yang tepat ke tempat yang kosong.";
const SUARA_BERANTAI =
  "Enam sekawan sedang bermain hitung berantai. Lihat papan angka yang mereka pegang, lalu pilih bilangan untuk anak di ujung.";
const SUARA_GERBONG =
  "Susun gerbong kereta di atas rel sesuai aba-aba. Putaran pertama menghitung maju, putaran kedua menghitung mundur.";
const SUARA_CERITA =
  "Upe mulai dari anak tangga empat, lalu naik tiga anak tangga lagi. Lihat di mana Upe berhenti, lalu ucapkan bilangannya.";
const SUARA_TULIS =
  "Lihat batu pijakan yang dihitung mundur dari sepuluh. Ada satu batu yang angkanya hilang. Tulis angka dan katanya di kanvas.";
const SUARA_LAB =
  "Selamat datang di laboratorium. Pilih satu permainan. Kamu boleh mencoba sebanyak yang kamu suka.";

type PropsLangkah = { speakGuru: (t: string) => void; lanjut: () => void; nomor: number };

/** Kegiatan 1: pasang balok ke anak tangga dari kiri ke kanan, lalu ucapkan nomor puncak. */
function LangkahTangga({
  putaran,
  speakGuru,
  lanjut,
  nomor,
  panel,
}: PropsLangkah & { putaran: 0 | 1; panel: PanelSuara }) {
  const awal = putaran === 0 ? 1 : 6;
  const akhir = putaran === 0 ? 5 : 9;
  const angka = urut(awal, akhir);
  const total = angka.length;
  const [pakai, setPakai] = useState<number[]>([]);
  const letusan = useLetusan();
  const id = `c-tangga-${putaran + 1}`;
  const suara = panel.suara[id] === true;
  const penuh = pakai.length >= total;

  const taruh = (i: number) => {
    if (pakai.includes(i) || pakai.length >= total) return;
    const baru = [...pakai, i];
    setPakai(baru);
    if (baru.length >= total) letusan.picu();
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Naik Tangga" onSuara={() => speakGuru(SUARA_TANGGA)} warna="#FDE68A" />
      <KatakBicara
        pendek={suara ? "Hebat!" : penuh ? "Ucapkan nomor puncak" : "Pasang balok satu-satu"}
        teks={
          suara
            ? "Hebat! Kamu sudah menyebut nomor anak tangga paling ujung."
            : penuh
              ? "Semua balok sudah terpasang! Lihat nomor anak tangga paling ujung, lalu ucapkan."
              : "Pasang balok tangga satu per satu dari kiri ke kanan. Lalu ucapkan nomor anak tangga paling ujung!"
        }
      />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        <div data-zona="tangga" className="rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#FFF6E5] p-2">
          <p className="mb-1 text-xs font-black tracking-wide text-[#6B3F12]">🧱 TANGGA UPE</p>
          <div className="flex items-end gap-1.5">
            {angka.map((n, i) => {
              const terisi = i < pakai.length;
              return (
                <TumpukanBalok
                  key={n}
                  n={n}
                  petak={10}
                  label={terisi ? n : "\u00a0"}
                  kosong={!terisi}
                  nyala={terisi && i === pakai.length - 1 && !penuh}
                  kelas={`flex-1 ${terisi ? "igil-muncul" : ""}`}
                />
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: total }, (_, i) =>
            pakai.includes(i) ? (
              <span key={i} className="block h-14 rounded-2xl border-2 border-dashed border-[#A8672D]/50" />
            ) : (
              <BendaSeret
                key={i}
                id={`blok-${i}`}
                label="Balok tangga, pasang ke tangga"
                onKetuk={() => taruh(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "tangga") taruh(i);
                }}
                kelas="flex h-14 items-center justify-center"
              >
                <span className="block text-4xl drop-shadow-[0_4px_2px_rgba(90,50,10,0.45)]">🧱</span>
              </BendaSeret>
            )
          )}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <JawabSuara id={id} jumlah={akhir} panel={panel} siap={penuh} belumSiap="Pasang semua balok dulu, ya." />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/** Kegiatan 2: seret tumpukan balok ke celah tangga yang kosong. */
const RONDE_LENGKAP = [
  { penuh: [1, 2, 3, 4, 5], celah: [2], pilihan: [2, 3, 5] },
  { penuh: [4, 5, 6, 7, 8], celah: [1, 3], pilihan: [3, 5, 7, 9] },
];

function LangkahLengkapi({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [ronde, setRonde] = useState(0);
  const data = RONDE_LENGKAP[ronde];
  const [terisi, setTerisi] = useState<Record<number, number>>({});
  const [kabar, setKabar] = useState<Kabar>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const letusan = useLetusan();
  const sisa = data.celah.filter((c) => terisi[c] === undefined);
  const selesai = sisa.length === 0;
  const terakhir = ronde >= RONDE_LENGKAP.length - 1;

  const coba = (n: number, celah: number | null) => {
    if (selesai) return;
    const tujuan = celah ?? sisa.find((c) => data.penuh[c] === n) ?? null;
    if (tujuan === null || terisi[tujuan] !== undefined || data.penuh[tujuan] !== n) {
      setKeliru(n);
      setKabar({ teks: "Belum pas. Ingat, setiap naik satu tangga, baloknya bertambah satu.", ok: false });
      return;
    }
    setKeliru(null);
    const baru = { ...terisi, [tujuan]: n };
    setTerisi(baru);
    if (data.celah.every((c) => baru[c] !== undefined)) {
      setKabar({ teks: "Pas sekali! Tangga baloknya sekarang naik berurutan tanpa celah.", ok: true });
      letusan.picu();
    } else {
      setKabar({ teks: "Benar. Isi celah yang lain.", ok: true });
    }
  };

  const pakai = Object.values(terisi);

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Isi Tangga" onSuara={() => speakGuru(SUARA_LENGKAPI)} warna="#BBF7D0" />
      <KatakBicara pendek="Isi celah yang kosong" teks="Lihat tinggi tangga di kiri dan kanannya. Seret tumpukan balok yang pas untuk mengisi tangga yang kosong!" />
      <div className="relative space-y-3">
        <div className={`p-3 ${ALAS}`}>
          <div className="flex items-end gap-1.5">
            {data.penuh.map((n, i) => {
              const celah = data.celah.includes(i);
              const isi = terisi[i];
              if (!celah)
                return <TumpukanBalok key={i} n={n} petak={9} label={n} kelas="flex-1" />;
              return (
                <div
                  key={i}
                  data-zona={`celah-${i}`}
                  className={`flex min-h-24 flex-1 items-end justify-center rounded-xl border-4 px-0.5 pb-1 ${
                    isi !== undefined ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#7C4A1D]/70 bg-[#FFF6E5]"
                  }`}
                >
                  {isi !== undefined ? (
                    <TumpukanBalok n={isi} petak={9} label={isi} kelas="w-full" />
                  ) : (
                    <span className="mb-6 text-3xl font-black text-[#7C4A1D]/60">?</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2">
          <p className="mb-1 text-xs font-black tracking-wide text-[#6B3F12]">🧱 PILIH TUMPUKAN</p>
          <div className="flex items-end justify-around gap-1">
            {data.pilihan.map((n) =>
              pakai.includes(n) ? (
                <span key={n} className="block h-16 w-12 rounded-xl border-2 border-dashed border-[#A8672D]/50" />
              ) : (
                <BendaSeret
                  key={n}
                  id={`opsi-${n}`}
                  label={`Tumpukan ${n} balok`}
                  onKetuk={() => coba(n, null)}
                  onLepas={(_, x, y) => {
                    const z = zonaDi(x, y);
                    if (z && z.startsWith("celah-")) coba(n, Number(z.slice(6)));
                  }}
                  kelas={keliru === n ? "igil-goyang" : ""}
                >
                  <div className="w-12">
                    <TumpukanBalok n={n} petak={9} label={n} />
                  </div>
                </BendaSeret>
              )
            )}
          </div>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {selesai ? (
        <TombolLanjut
          teks={terakhir ? "LANJUTKAN ⬇️" : "PUTARAN 2 ➡️"}
          onClick={() => {
            if (terakhir) {
              lanjut();
              return;
            }
            setRonde(ronde + 1);
            setTerisi({});
            setKabar(null);
            setKeliru(null);
          }}
        />
      ) : null}
    </>
  );
}

/** Kegiatan 3: hitung berantai. Pilih papan angka untuk anak di ujung. */
const RONDE_BERANTAI = [
  {
    anak: [
      ["Upe", 3],
      ["Kira", 4],
      ["Malosi", 5],
      ["Wei", 6],
    ] as [string, number][],
    pilihan: [2, 6, 8],
  },
  {
    anak: [
      ["Tika", 10],
      ["Halim", 9],
      ["Wei", 8],
      ["Malosi", 7],
    ] as [string, number][],
    pilihan: [7, 9, 10],
  },
  {
    anak: [
      ["Kira", 6],
      ["Upe", 5],
      ["Halim", 4],
      ["Tika", 3],
    ] as [string, number][],
    pilihan: [1, 3, 5],
  },
];

function LangkahBerantai({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [ronde, setRonde] = useState(0);
  const data = RONDE_BERANTAI[ronde];
  const kunci = data.anak[3][1];
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const terakhir = ronde >= RONDE_BERANTAI.length - 1;

  const pilih = (n: number) => {
    if (benar) return;
    if (n === kunci) {
      setBenar(true);
      setKeliru(null);
      setKabar({ teks: "Betul! Barisan hitung berantainya tersambung dengan kompak.", ok: true });
      letusan.picu();
    } else {
      setKeliru(n);
      setKabar({ teks: "Coba cek lagi arah hitungannya: makin besar atau makin kecil?", ok: false });
    }
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Hitung Berantai" onSuara={() => speakGuru(SUARA_BERANTAI)} warna="#FED7AA" />
      <KatakBicara pendek="Siapa berikutnya?" teks="Perhatikan apakah barisan temanmu sedang menghitung maju atau mundur, lalu ketuk papan bilangan berikutnya!" />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        <div className="flex items-end justify-between gap-0.5">
          {data.anak.map(([nama, n], i) => (
            <React.Fragment key={`${ronde}-${nama}`}>
              {i > 0 ? (
                <span className="mb-10 text-xl font-black leading-none text-[#1C01A5]" aria-hidden="true">
                  →
                </span>
              ) : null}
              <AnakPapan nama={nama} nomor={i === 3 && !benar ? "?" : n} sorot={i === 3 && benar} />
            </React.Fragment>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {data.pilihan.map((n) => (
            <button
              key={`${ronde}-${n}`}
              type="button"
              aria-label={`Papan ${n}`}
              onClick={() => pilih(n)}
              className={`rounded-2xl border-4 border-[#1C01A5] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                benar && n === kunci ? "bg-[#7FCB96]" : "bg-[#FFE566]"
              } ${keliru === n && !benar ? "igil-goyang" : ""}`}
            >
              {n}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {benar ? (
        <TombolLanjut
          teks={terakhir ? "LANJUTKAN ⬇️" : `PUTARAN ${ronde + 2} ➡️`}
          onClick={() => {
            if (terakhir) {
              lanjut();
              return;
            }
            setRonde(ronde + 1);
            setBenar(false);
            setKeliru(null);
            setKabar(null);
          }}
        />
      ) : null}
    </>
  );
}

/** Kegiatan 4: susun gerbong kereta di atas rel. */
const RONDE_GERBONG = [
  { kartu: [8, 10, 6, 9, 7], urut: [6, 7, 8, 9, 10], aba: "Kecil → besar", ikon: "⬆️" },
  { kartu: [2, 5, 1, 4, 3], urut: [5, 4, 3, 2, 1], aba: "Besar → kecil", ikon: "⬇️" },
];

function Gerbong({ n, kecil = false }: { n: number; kecil?: boolean }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`flex w-full items-center justify-center rounded-lg border-4 border-[#1C01A5] font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] ${
          kecil ? "h-11 text-2xl" : "h-14 text-3xl"
        }`}
        style={{ backgroundColor: warnaBalok(n) }}
      >
        {n}
      </div>
      <div className="-mt-1 flex w-full justify-around px-1" aria-hidden="true">
        <span className="h-3 w-3 rounded-full border-2 border-[#1C01A5] bg-white" />
        <span className="h-3 w-3 rounded-full border-2 border-[#1C01A5] bg-white" />
      </div>
    </div>
  );
}

function LangkahGerbong({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [ronde, setRonde] = useState(0);
  const data = RONDE_GERBONG[ronde];
  const [slot, setSlot] = useState<(number | null)[]>(() => data.urut.map(() => null));
  const [kabar, setKabar] = useState<Kabar>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const letusan = useLetusan();
  const selesai = slot.every((s) => s !== null);
  const terakhir = ronde >= RONDE_GERBONG.length - 1;

  const taruh = (n: number, i: number) => {
    if (selesai || slot.includes(n) || slot[i] !== null) return;
    if (data.urut[i] === n) {
      const baru = [...slot];
      baru[i] = n;
      setSlot(baru);
      setKeliru(null);
      if (baru.every((s) => s !== null)) {
        setKabar({ teks: "Keretanya sudah urut. Hebat!", ok: true });
        letusan.picu();
      } else {
        setKabar({ teks: "Benar. Pasang gerbong berikutnya.", ok: true });
      }
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum pas. Lihat aba-aba di kepala kereta, lalu pilih gerbong yang tepat.", ok: false });
    }
  };
  const ketuk = (n: number) => {
    const i = slot.findIndex((s) => s === null);
    if (i >= 0) taruh(n, i);
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Kereta Angka" onSuara={() => speakGuru(SUARA_GERBONG)} warna="#C7D2FE" />
      <KatakBicara pendek={data.aba} teks="Perhatikan aba-aba di kepala kereta: susun maju dari kecil ke besar, atau susun mundur dari besar ke kecil!" />
      <div className="relative space-y-3">
        <div className={`space-y-2 p-3 ${ALAS}`}>
          <div className="flex items-center gap-2">
            <span className="text-4xl" aria-hidden="true">
              🚂
            </span>
            <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1 text-base font-black text-[#1C01A5]">
              {data.ikon} {data.aba}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 border-b-8 border-double border-[#7C4A1D] pb-2">
            {slot.map((n, i) => (
              <div
                key={i}
                data-zona={`slot-${i}`}
                className={`flex min-h-16 items-center justify-center rounded-lg ${
                  n !== null ? "igil-muncul" : "border-4 border-dashed border-[#7C4A1D]/60 bg-[#FFF6E5]"
                }`}
              >
                {n !== null ? <Gerbong n={n} kecil /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1.5 rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2">
          {data.kartu.map((n) =>
            slot.includes(n) ? (
              <span key={n} className="block h-14 rounded-lg border-2 border-dashed border-[#A8672D]/50" />
            ) : (
              <BendaSeret
                key={n}
                id={`gerbong-${n}`}
                label={`Gerbong ${n}`}
                onKetuk={() => ketuk(n)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("slot-")) taruh(n, Number(z.slice(5)));
                }}
                kelas={keliru === n ? "igil-goyang" : ""}
              >
                <Gerbong n={n} kecil />
              </BendaSeret>
            )
          )}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      {selesai ? (
        <TombolLanjut
          teks={terakhir ? "LANJUTKAN ⬇️" : "PUTARAN 2 ➡️"}
          onClick={() => {
            if (terakhir) {
              lanjut();
              return;
            }
            const berikut = RONDE_GERBONG[ronde + 1];
            setRonde(ronde + 1);
            setSlot(berikut.urut.map(() => null));
            setKabar(null);
            setKeliru(null);
          }}
        />
      ) : null}
    </>
  );
}

/** Kegiatan 5: cerita Upe di tangga taman. Naik tiga tangga, lalu turun satu. */
function LangkahCerita({ speakGuru, lanjut, nomor, panel }: PropsLangkah & { panel: PanelSuara }) {
  const [pos, setPos] = useState(4);
  const [jalan, setJalan] = useState(false);
  const [naikSelesai, setNaikSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [turunBenar, setTurunBenar] = useState(false);
  const timer = useRef<number[]>([]);
  const letusan = useLetusan();
  const id = "c-cerita-tangga";
  const suara = panel.suara[id] === true;
  useBicara(suara, "Sekarang Upe turun satu anak tangga. Di anak tangga nomor berapa Upe berdiri?");

  useEffect(() => {
    const semua = timer.current;
    return () => semua.forEach((t) => window.clearTimeout(t));
  }, []);

  const naik = () => {
    if (jalan || naikSelesai) return;
    setJalan(true);
    [5, 6, 7].forEach((n, i) => {
      timer.current.push(
        window.setTimeout(() => {
          setPos(n);
          if (n === 7) {
            setJalan(false);
            setNaikSelesai(true);
            letusan.picu();
          }
        }, (i + 1) * 600)
      );
    });
  };

  const pilihTurun = (n: number) => {
    if (turunBenar) return;
    if (n === 6) {
      setTurunBenar(true);
      setPos(6);
      setKabar({ teks: "Betul! Turun satu anak tangga, Upe berdiri di tangga enam.", ok: true });
      letusan.picu();
    } else {
      setKabar({ teks: "Belum tepat. Turun artinya mundur satu langkah. Coba lagi.", ok: false });
    }
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Cerita Upe" onSuara={() => speakGuru(SUARA_CERITA)} warna="#FBCFE8" />
      <KatakBicara
        pendek={naikSelesai ? "Ucapkan nomor Upe" : "Upe di tangga 4"}
        teks={
          naikSelesai
            ? "Upe sudah berhenti. Lihat di anak tangga nomor berapa Upe berdiri, lalu ucapkan bilangannya."
            : "Tekan tombol supaya Upe melangkah naik, hitung pijakannya, lalu ucapkan nomor anak tangganya!"
        }
      />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        <div className="flex items-end gap-1">
          {urut(1, 10).map((n) => {
            return (
              <div key={n} className="flex min-w-0 flex-1 flex-col items-center justify-end">
                <span className="h-8 text-2xl leading-8">
                  {n === pos ? (
                    <span key={pos} className="igil-lompat inline-block">
                      🧒
                    </span>
                  ) : null}
                </span>
                <TumpukanBalok n={n} petak={8} label={n} nyala={n >= 4 && n <= pos} kelas="w-full" />
              </div>
            );
          })}
        </div>
        {!naikSelesai ? (
          <button
            type="button"
            onClick={naik}
            disabled={jalan}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-lg font-black text-[#FFE566] shadow-[0_5px_0_rgba(28,1,165,0.35)] disabled:opacity-60"
          >
            ⬆️ Upe naik 3 tangga
          </button>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <JawabSuara id={id} jumlah={7} panel={panel} siap={naikSelesai} belumSiap="Tekan tombol naik dulu, ya." />
      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#1C01A5] bg-white p-3 text-center">
          <p className="text-lg font-black text-[#1C01A5]">⬇️ Upe turun 1 tangga</p>
          <div className="grid grid-cols-2 gap-2">
            {[6, 8].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Anak tangga ${n}`}
                onClick={() => pilihTurun(n)}
                className={`rounded-2xl border-4 border-[#1C01A5] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                  turunBenar && n === 6 ? "bg-[#7FCB96]" : "bg-[#FFE566]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <KabarChip kabar={kabar} />
        </div>
      ) : null}
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/** Kegiatan 6: tulis bilangan yang hilang pada batu pijakan urutan mundur. */
function LangkahTulis({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [lulus, setLulus] = useState(false);
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Menulis" onSuara={() => speakGuru(SUARA_TULIS)} warna="#FED7AA" />
      <KatakBicara pendek="Tulis angka yang hilang" teks="Hitung mundur dari sepuluh: sepuluh, sembilan, lalu berapa sebelum tujuh? Tebalkan di kanvas!" />
      <div className={`space-y-2 p-3 ${ALAS}`}>
        <div className="flex items-center justify-between gap-0.5">
          {[10, 9, null, 7, 6].map((n, i) => (
            <React.Fragment key={i}>
              {i > 0 ? (
                <span className="text-lg font-black text-[#1C01A5]" aria-hidden="true">
                  →
                </span>
              ) : null}
              <span
                className={`flex aspect-square min-w-0 max-w-[3.4rem] flex-1 items-center justify-center rounded-[50%] border-4 text-2xl font-black text-[#1C01A5] ${
                  n === null
                    ? lulus
                      ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]"
                      : "border-dashed border-[#1C01A5] bg-white"
                    : "border-[#1C01A5] bg-[#F1ECE0]"
                }`}
              >
                {n === null ? (lulus ? 8 : "?") : n}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
        <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
        <DottedNumberTracingCanvas key="c-tulis" digit={8} kata={kata(8)} onCompletedTrace={() => setLulus(true)} />
        <KabarChip
          kabar={lulus ? { teks: "Tulisanmu rapi dan tepat! Mundur satu langkah dari sembilan adalah delapan.", ok: true } : null}
        />
      </div>
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

/* ------------------------------ Laboratorium ----------------------------- */

const KAPAL: Titik[] = [
  [30, 150],
  [70, 192],
  [230, 192],
  [270, 150],
  [160, 150],
  [160, 28],
  [248, 118],
  [160, 118],
  [78, 118],
  [120, 62],
];

function HasilKapal() {
  return (
    <g>
      <circle cx="42" cy="42" r="20" fill={KUNING} stroke={EMAS} strokeWidth="3" />
      <path d="M0 206 q15 -10 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" fill="none" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
      <polygon points="30,150 70,192 230,192 270,150" fill={EMAS} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="160,28 248,118 160,118" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      <polygon points="120,62 78,118 160,118" fill="#C7D2FE" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

function titikBintang(): Titik[] {
  const hasil: Titik[] = [];
  for (let i = 0; i < 10; i++) {
    const luar = i % 2 === 0;
    const sudut = ((-90 + i * 36) * Math.PI) / 180;
    const r = luar ? 92 : 40;
    hasil.push([Math.round((150 + r * Math.cos(sudut)) * 10) / 10, Math.round((116 + r * Math.sin(sudut)) * 10) / 10]);
  }
  return hasil;
}
export const BINTANG: Titik[] = titikBintang();

function HasilBintang() {
  return (
    <g>
      <polygon
        points={BINTANG.map((t) => t.join(",")).join(" ")}
        fill={KUNING}
        stroke={EMAS}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="136" cy="112" r="4" fill={BIRU} />
      <circle cx="164" cy="112" r="4" fill={BIRU} />
      <path d="M136 128 Q150 142 164 128" fill="none" stroke={BIRU} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function LabTangga({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [pos, setPos] = useState(1);
  const [oto, setOto] = useState<"maju" | "mundur" | null>(null);
  const timer = useRef<number | null>(null);

  const berhenti = () => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    setOto(null);
  };
  useEffect(
    () => () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    },
    []
  );

  const langkah = (arah: "maju" | "mundur") => {
    berhenti();
    const n = jepit(arah === "maju" ? pos + 1 : pos - 1);
    setPos(n);
    speakGuru(kata(n));
  };

  const putar = (arah: "maju" | "mundur") => {
    berhenti();
    const geser = arah === "maju" ? 1 : -1;
    const ujung = arah === "maju" ? 10 : 1;
    let sekarang = arah === "maju" ? 1 : 10;
    setPos(sekarang);
    setOto(arah);
    speakGuru(kata(sekarang));
    timer.current = window.setInterval(() => {
      if (sekarang === ujung) {
        berhenti();
        return;
      }
      sekarang += geser;
      setPos(sekarang);
      speakGuru(kata(sekarang));
      if (sekarang === ujung) berhenti();
    }, 1100);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-1 rounded-2xl border-4 border-[#7C4A1D]/60 bg-[#FFF6E5] p-2">
        {urut(1, 10).map((n) => (
          <TumpukanBalok key={n} n={n} petak={8} label={n} nyala={n === pos} kelas="flex-1" />
        ))}
      </div>
      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-1">
        <GarisBilangan posisi={pos} tandai={[pos]} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { nama: "Sebelum", n: pos > 1 ? pos - 1 : null, sorot: false },
          { nama: "Sekarang", n: pos, sorot: true },
          { nama: "Sesudah", n: pos < 10 ? pos + 1 : null, sorot: false },
        ].map((b) => (
          <div key={b.nama} className="space-y-0.5">
            <p className="text-[11px] font-black text-[#1C01A5]">{b.nama}</p>
            <div
              className={`flex h-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-3xl font-black text-[#1C01A5] ${
                b.sorot ? "bg-[#FFE566]" : "bg-white"
              }`}
            >
              {b.n ?? "–"}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => langkah("mundur")}
          disabled={pos <= 1}
          className="rounded-2xl border-4 border-[#1C01A5] bg-[#C7D2FE] py-3 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40"
        >
          ⬇️ Mundur
        </button>
        <button
          type="button"
          onClick={() => langkah("maju")}
          disabled={pos >= 10}
          className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40"
        >
          ⬆️ Maju
        </button>
        <button
          type="button"
          onClick={() => (oto === "mundur" ? berhenti() : putar("mundur"))}
          className="rounded-full border-2 border-dashed border-[#1C01A5]/60 bg-white py-2 text-sm font-black text-[#1C01A5]"
        >
          {oto === "mundur" ? "⏹️ Berhenti" : "◀️ Otomatis 10 → 1"}
        </button>
        <button
          type="button"
          onClick={() => (oto === "maju" ? berhenti() : putar("maju"))}
          className="rounded-full border-2 border-dashed border-[#1C01A5]/60 bg-white py-2 text-sm font-black text-[#1C01A5]"
        >
          {oto === "maju" ? "⏹️ Berhenti" : "▶️ Otomatis 1 → 10"}
        </button>
      </div>
    </div>
  );
}

function LabTitik({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [arah, setArah] = useState<"maju" | "mundur">("maju");
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            { a: "maju" as const, teks: "⬆️ Maju 1 → 10" },
            { a: "mundur" as const, teks: "⬇️ Mundur 10 → 1" },
          ] as const
        ).map((m) => (
          <button
            key={m.a}
            type="button"
            onClick={() => setArah(m.a)}
            className={`rounded-full border-4 border-[#1C01A5] py-2 text-sm font-black text-[#1C01A5] ${
              arah === m.a ? "bg-[#FFE566] shadow-[0_3px_0_rgba(28,1,165,0.3)]" : "bg-white"
            }`}
          >
            {m.teks}
          </button>
        ))}
      </div>
      <HubungkanTitik
        key={arah}
        titik={KAPAL}
        urutan={arah === "maju" ? urut(1, 10) : urut(10, 1)}
        hasil={<HasilKapal />}
        onSelesai={() => speakGuru("Perahu layar selesai! Hebat sekali.")}
      />
    </div>
  );
}

function LabRoket({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [sudah, setSudah] = useState(0);
  const [keliru, setKeliru] = useState<{ n: number; kali: number } | null>(null);
  const letusan = useLetusan();
  const berikut = 10 - sudah;
  const lepas = sudah >= 10;

  const ketuk = (n: number) => {
    if (lepas || n > 10 - sudah) return;
    if (n === berikut) {
      const baru = sudah + 1;
      setSudah(baru);
      setKeliru(null);
      if (baru >= 10) {
        speakGuru("Satu! Roket meluncur!");
        letusan.picu();
      } else {
        speakGuru(kata(n));
      }
    } else {
      setKeliru({ n, kali: (keliru?.kali ?? 0) + 1 });
      speakGuru("Belum. Hitung mundur, mulai dari bilangan yang paling besar.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative h-44 overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-[#1C01A5]">
        {[
          [12, 14],
          [78, 8],
          [40, 52],
          [88, 60],
          [60, 28],
        ].map(([x, y], i) => (
          <span key={i} className="igil-denyut absolute text-lg" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }} aria-hidden="true">
            ✨
          </span>
        ))}
        <span
          className="absolute bottom-2 left-1/2 -ml-8 block text-6xl"
          style={{
            transform: lepas ? "translateY(-190px)" : `translateY(${-sudah * 9}px)`,
            transition: lepas ? "transform 1.6s ease-in" : "transform 0.5s ease",
          }}
          aria-hidden="true"
        >
          🚀
        </span>
        <div className="absolute inset-x-0 bottom-0 h-3 bg-[#FFE566]" aria-hidden="true" />
        <Letusan id={letusan.id} />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {urut(10, 1).map((n) => {
          const dipakai = n > 10 - sudah;
          return (
            <button
              key={dipakai ? `${n}-d` : keliru?.n === n ? `${n}-${keliru.kali}` : n}
              type="button"
              aria-label={`Bilangan ${n}`}
              onClick={() => ketuk(n)}
              className={`rounded-2xl border-4 border-[#1C01A5] py-3 text-2xl font-black text-[#1C01A5] ${
                dipakai ? "bg-[#FFE566]" : "bg-white shadow-[0_4px_0_rgba(28,1,165,0.25)]"
              } ${keliru?.n === n && !dipakai ? "igil-goyang" : ""}`}
            >
              {dipakai ? "✔" : n}
            </button>
          );
        })}
      </div>
      {lepas ? (
        <button
          type="button"
          onClick={() => {
            setSudah(0);
            setKeliru(null);
          }}
          className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-6 py-2 text-base font-black text-[#FFE566]"
        >
          🔁 Main lagi
        </button>
      ) : null}
    </div>
  );
}

const TAB_LAB = [
  { id: "tangga" as const, ikon: "🧱", nama: "Tangga" },
  { id: "titik" as const, ikon: "⛵", nama: "Titik" },
  { id: "roket" as const, ikon: "🚀", nama: "Roket" },
];

function LangkahLab({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [tab, setTab] = useState<"tangga" | "titik" | "roket">("tangga");
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Laboratorium" onSuara={() => speakGuru(SUARA_LAB)} warna="#FEF08A" />
      <KatakBicara
        pendek="Bermain bebas!"
        teks="Selamat datang di laboratorium. Pilih satu permainan: tangga, titik, atau roket. Kamu boleh mencoba sebanyak yang kamu suka."
      />
      <div className="grid grid-cols-3 gap-2">
        {TAB_LAB.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center rounded-2xl border-4 border-[#1C01A5] py-2 text-sm font-black text-[#1C01A5] ${
              tab === t.id ? "bg-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.3)]" : "bg-white"
            }`}
          >
            <span className="text-3xl">{t.ikon}</span>
            {t.nama}
          </button>
        ))}
      </div>
      <div className={`p-3 ${ALAS}`}>
        {tab === "tangga" ? <LabTangga speakGuru={speakGuru} /> : null}
        {tab === "titik" ? <LabTitik speakGuru={speakGuru} /> : null}
        {tab === "roket" ? <LabRoket speakGuru={speakGuru} /> : null}
      </div>
      <TombolLanjut teks="LANJUTKAN KE PICTORIAL ⬇️" onClick={lanjut} />
    </>
  );
}

export function ConcreteMajuMundurC(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <ConcreteIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function ConcreteIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const langkah = LANGKAH_CONCRETE[indeks];
  const terakhir = indeks >= LANGKAH_CONCRETE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = { speakGuru, lanjut, nomor: langkah.kegiatan };

  return (
    <div className="space-y-3 rounded-[2rem] border-4 border-[#A8672D] p-3" style={GAYA_MEJA}>
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan pindahkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Kegiatan ${langkah.kegiatan} dari ${JUMLAH_KEGIATAN}`}>
        {Array.from({ length: JUMLAH_KEGIATAN }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${
              i < langkah.kegiatan ? "bg-[#FFE566]" : "bg-white"
            }`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "tangga" ? <LangkahTangga putaran={langkah.putaran ?? 0} panel={panel} {...dasar} /> : null}
        {langkah.tipe === "lengkapi" ? <LangkahLengkapi {...dasar} /> : null}
        {langkah.tipe === "berantai" ? <LangkahBerantai {...dasar} /> : null}
        {langkah.tipe === "gerbong" ? <LangkahGerbong {...dasar} /> : null}
        {langkah.tipe === "cerita" ? <LangkahCerita panel={panel} {...dasar} /> : null}
        {langkah.tipe === "tulis" ? <LangkahTulis {...dasar} /> : null}
        {langkah.tipe === "lab" ? <LangkahLab {...dasar} /> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture (empat kartu diagram)                                     */
/* ------------------------------------------------------------------------ */

type KartuGambarC = {
  id: string;
  bentuk: "tangga" | "garis" | "titik";
  judul: string;
  deret?: (number | null)[];
  kunci: number;
  pendekBantu: string;
  tugasPendek: string;
  suara: string;
  bantuan: string;
  hasil: string;
  rangkaian: number[];
  tulis: boolean;
};

const KARTU_GAMBAR_C: KartuGambarC[] = [
  {
    id: "c-gambar-p1",
    bentuk: "tangga",
    judul: "Tangga Naik",
    deret: [1, 2, 3, 4, null, 6],
    kunci: 5,
    pendekBantu: "Isi kolom kosong!",
    tugasPendek: "Ucapkan bilangannya",
    suara:
      "Lihat diagram tangga yang naik dari kiri ke kanan. Isi kolom yang kosong di antara empat dan enam, lalu ucapkan bilangannya.",
    bantuan: "Tambah atau kurangi petak di kolom kosong sampai tingginya pas seperti anak tangga, lalu ucapkan jumlah petaknya.",
    hasil: "Maju satu langkah dari empat adalah lima.",
    rangkaian: [1, 2, 3, 4, 5, 6],
    tulis: false,
  },
  {
    id: "c-gambar-p2",
    bentuk: "tangga",
    judul: "Tangga Turun",
    deret: [9, 8, null, 6, 5],
    kunci: 7,
    pendekBantu: "Isi kolom kosong!",
    tugasPendek: "Ucapkan bilangannya",
    suara:
      "Diagram tangga ini menurun dari sembilan ke lima. Bangun kolom yang kosong, lalu ucapkan bilangannya.",
    bantuan: "Tangga ini turun satu petak setiap langkah. Isi kolom yang kosong di antara delapan dan enam, lalu ucapkan.",
    hasil: "Mundur satu langkah dari delapan adalah tujuh.",
    rangkaian: [9, 8, 7, 6, 5],
    tulis: false,
  },
  {
    id: "c-gambar-p3",
    bentuk: "garis",
    judul: "Lompat Katak",
    kunci: 9,
    pendekBantu: "Ketuk katak!",
    tugasPendek: "Ucapkan dan tulis",
    suara:
      "Katak berada di titik enam dan ingin melompat maju tiga langkah ke kanan. Ketuk kataknya, lalu ucapkan dan tulis bilangan tempat ia mendarat.",
    bantuan: "Ketuk katak supaya melompat maju tiga kali dari titik enam. Ucapkan dan tulis bilangan tempat katak berhenti.",
    hasil: "Dari enam maju tiga langkah berhenti di sembilan.",
    rangkaian: [6, 7, 8, 9],
    tulis: true,
  },
  {
    id: "c-gambar-p4",
    bentuk: "titik",
    judul: "Titik Bintang",
    kunci: 10,
    pendekBantu: "Hubungkan titik!",
    tugasPendek: "Ucapkan yang terakhir",
    suara:
      "Hubungkan titik-titik bilangan secara berurutan sampai selesai. Gambar apa yang muncul? Lalu ucapkan bilangan paling akhir.",
    bantuan: "Ketuk titik berikutnya satu per satu sampai gambarnya selesai. Sesudah itu ucapkan bilangan terakhir.",
    hasil: "Garis dari satu sampai sepuluh membentuk gambar bintang yang utuh!",
    rangkaian: urut(1, 10),
    tulis: false,
  },
];

function IsiKartuGambarC({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: {
  kartu: KartuGambarC;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const [tinggi, setTinggi] = useState(0);
  const [lompat, setLompat] = useState(0);
  const [titikSelesai, setTitikSelesai] = useState(false);
  const [lulus, setLulus] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara[kartu.id] === true;
  const terakhir = indeks >= total - 1;

  const penuh =
    kartu.bentuk === "tangga" ? tinggi === kartu.kunci : kartu.bentuk === "garis" ? lompat >= 3 : titikSelesai;
  useBicara(suara, kartu.hasil);

  const ubah = (d: number) => {
    if (penuh) return;
    const t = Math.min(10, Math.max(0, tinggi + d));
    setTinggi(t);
    if (t === kartu.kunci) letusan.picu();
  };
  const lompatMaju = () => {
    if (lompat >= 3) return;
    const baru = lompat + 1;
    setLompat(baru);
    if (baru >= 3) letusan.picu();
  };

  const hint = suara ? "Hebat! Lihat rangkaiannya di bawah." : penuh ? kartu.tugasPendek : kartu.bantuan;

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul={kartu.judul} onSuara={() => speakGuru(kartu.suara)} warna="#FDE68A" />
      <CatatanTempel pendek={suara ? "Hebat!" : penuh ? kartu.tugasPendek : kartu.pendekBantu} teks={hint} />

      <div className="relative space-y-3 rounded-lg border-[3px] border-[#6B7280] bg-white/90 p-3 shadow-[3px_4px_0_rgba(0,0,0,0.12)]">
        {kartu.bentuk === "tangga" && kartu.deret ? (
          <>
            <div className="flex items-end gap-1.5 rounded-xl border-2 border-dashed border-[#9CA3AF] bg-white px-1 pb-1 pt-2">
              {kartu.deret.map((n, i) =>
                n !== null ? (
                  <TumpukanBalok key={i} n={n} petak={11} label={n} kelas="flex-1" />
                ) : (
                  <div key={i} className="flex min-w-0 flex-1 flex-col items-center justify-end" aria-label="Kolom kosong">
                    {tinggi > 0 ? (
                      <TumpukanBalok
                        n={tinggi}
                        petak={11}
                        label={suara ? kartu.kunci : "?"}
                        nyala={penuh}
                        kelas={`w-full ${penuh ? "igil-muncul" : ""}`}
                      />
                    ) : (
                      <>
                        <span className="mb-0.5 text-base font-black leading-none text-[#1C01A5]">?</span>
                        <TumpukanBalok n={1} petak={11} kosong kelas="w-full" />
                      </>
                    )}
                  </div>
                )
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => ubah(-1)}
                disabled={penuh || tinggi <= 0}
                className="rounded-2xl border-4 border-[#1C01A5] bg-[#C7D2FE] py-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40"
              >
                ⬇️ Turunkan
              </button>
              <button
                type="button"
                onClick={() => ubah(1)}
                disabled={penuh}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
                  !penuh && tinggi === 0 ? "igil-lompat" : ""
                }`}
              >
                ⬆️ Naikkan
              </button>
            </div>
          </>
        ) : null}

        {kartu.bentuk === "garis" ? (
          <button
            type="button"
            aria-label="Ketuk katak supaya melompat"
            onClick={lompatMaju}
            className="igil-tanpa-tepi block w-full space-y-1 rounded-xl border-2 border-dashed border-[#9CA3AF] bg-white p-1 text-center"
          >
            <GarisBilangan
              posisi={6 + lompat}
              tandai={[6]}
              busur={Array.from({ length: lompat }, (_, i) => ({ dari: 6 + i, ke: 7 + i, warna: EMAS }))}
            />
            <span className={`inline-block text-lg font-black text-[#1C01A5] ${lompat < 3 ? "igil-lompat" : ""}`}>
              {lompat < 3 ? "👆 Ketuk katak" : "🌟"}
            </span>
          </button>
        ) : null}

        {kartu.bentuk === "titik" ? (
          <HubungkanTitik
            titik={BINTANG}
            urutan={urut(1, 10)}
            awal={7}
            tutup
            hasil={<HasilBintang />}
            onSelesai={() => setTitikSelesai(true)}
          />
        ) : null}
        <Letusan id={letusan.id} />
      </div>

      <JawabSuara id={kartu.id} jumlah={kartu.kunci} panel={panel} siap={penuh} belumSiap="Selesaikan diagramnya dulu, ya." />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-3xl">🌟</p>
          <Rantai deret={kartu.rangkaian} />
        </div>
      ) : null}

      {kartu.tulis ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
          <DottedNumberTracingCanvas
            key={`gambar-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
        </div>
      ) : null}

      <TombolLanjut teks={terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} />
    </>
  );
}

export function PictureMajuMundurC(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_GAMBAR_C[indeks];
  const terakhir = indeks >= KARTU_GAMBAR_C.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };

  return (
    <div className="space-y-3 rounded-2xl border-4 border-[#6B7280] p-3 pt-0" style={GAYA_KERTAS}>
      <SpiralBuku />
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5">
        {KARTU_GAMBAR_C.map((k, i) => (
          <span
            key={k.id}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <IsiKartuGambarC
        key={kartu.id}
        kartu={kartu}
        indeks={indeks}
        total={KARTU_GAMBAR_C.length}
        speakGuru={speakGuru}
        panel={panel}
        lanjut={lanjut}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract (tiga kartu lambang) dan Poin Penting                    */
/* ------------------------------------------------------------------------ */

type KartuLambangC = {
  id: string;
  deret: (number | null)[];
  pilihan: number[];
  kunci: number;
  pendek: string;
  bantuan: string;
  suara: string;
  salah: string;
  kalimat: string;
  tulis: boolean;
};

const KARTU_LAMBANG_C: KartuLambangC[] = [
  {
    id: "c-lambang-l1",
    deret: [4, 5, null, 7, 8],
    pilihan: [3, 6, 9],
    kunci: 6,
    pendek: "Isi kotak kosong",
    bantuan: "Lihat urutan maju dari empat ke delapan. Pilih angka yang hilang, lalu ucapkan sekali.",
    suara:
      "Perhatikan barisan bilangan yang maju dari empat sampai delapan. Pilih bilangan yang tepat untuk mengisi kotak kosong, lalu ucapkan.",
    salah: "Belum tepat. Ini hitung maju dari kecil ke besar. Habis empat lalu lima, sesudah lima berapa?",
    kalimat: "Menghitung maju: empat, lima, enam, tujuh, delapan. Sesudah lima adalah enam.",
    tulis: false,
  },
  {
    id: "c-lambang-l2",
    deret: [10, 9, 8, null, 6],
    pilihan: [5, 7, 9],
    kunci: 7,
    pendek: "Isi kotak kosong",
    bantuan: "Lihat urutan mundur dari sepuluh ke enam. Pilih angka yang hilang, lalu ucapkan sekali.",
    suara:
      "Perhatikan barisan bilangan yang mundur dari sepuluh sampai enam. Pilih bilangan yang hilang di kotak kosong, lalu ucapkan.",
    salah: "Belum tepat. Ini hitung mundur dari besar ke kecil. Setiap langkah berkurang satu.",
    kalimat: "Menghitung mundur: sepuluh, sembilan, delapan, tujuh, enam. Sebelum delapan adalah tujuh.",
    tulis: false,
  },
  {
    id: "c-lambang-l3",
    deret: [8, 7, 6, null, 4],
    pilihan: [3, 5, 8],
    kunci: 5,
    pendek: "Isi, ucapkan, tulis",
    bantuan: "Lihat urutan mundur dari delapan ke empat. Pilih angkanya, ucapkan, lalu tulis di kanvas.",
    suara:
      "Barisan ini menghitung mundur dari delapan sampai empat. Pilih bilangan yang hilang, ucapkan dengan lantang, lalu tebalkan di kanvas.",
    salah: "Belum tepat. Ini hitung mundur dari besar ke kecil. Setiap langkah berkurang satu.",
    kalimat: "Menghitung mundur dari delapan: sebelum enam dan sesudah empat adalah lima.",
    tulis: true,
  },
];

function IsiKartuLambangC({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: {
  kartu: KartuLambangC;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const [dipilih, setDipilih] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [lulus, setLulus] = useState(false);
  const suara = panel.suara[kartu.id] === true;
  useBicara(suara, kartu.kalimat);

  const pilih = (n: number) => {
    if (dipilih) return;
    if (n === kartu.kunci) {
      setDipilih(true);
      setKeliru(null);
      setKabar({ teks: "Angkanya sudah pas! Sekarang ucapkan bilangannya.", ok: true });
    } else {
      setKeliru(n);
      setKabar({ teks: kartu.salah, ok: false });
    }
  };

  const hint = suara ? "Hebat! Lihat barisannya di bawah." : dipilih ? "Sekarang ucapkan bilangannya." : kartu.bantuan;
  const lengkap = kartu.deret.map((n) => n ?? kartu.kunci);

  return (
    <>
      <JudulGame nomor={indeks + 1} total={total} judul="Angka Hilang" onSuara={() => speakGuru(kartu.suara)} warna="#C7D2FE" />
      <CatatanPensil pendek={suara ? "Hebat!" : dipilih ? "Ucapkan bilangannya" : kartu.pendek} teks={hint} />

      <div className="flex items-center justify-between gap-0.5 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-2">
        {kartu.deret.map((n, i) => (
          <React.Fragment key={i}>
            {i > 0 ? (
              <span className="text-xl font-black text-[#1C01A5]" aria-hidden="true">
                →
              </span>
            ) : null}
            <span
              className={`flex h-14 min-w-0 max-w-[3.2rem] flex-1 items-center justify-center rounded-xl border-4 ${n !== null && n >= 10 ? "text-2xl" : "text-3xl"} font-black text-[#1C01A5] ${
                n === null
                  ? dipilih
                    ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]"
                    : "border-dashed border-[#1C01A5] bg-[#FFF7CC]"
                  : "border-[#1C01A5] bg-white"
              }`}
            >
              {n === null ? (dipilih ? kartu.kunci : "?") : n}
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {kartu.pilihan.map((n) => (
          <button
            key={`${n}-${keliru === n ? "x" : "o"}`}
            type="button"
            aria-label={`Pilih angka ${n}`}
            onClick={() => pilih(n)}
            disabled={dipilih && n !== kartu.kunci}
            className={`rounded-2xl border-4 border-[#1C01A5] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${
              dipilih && n === kartu.kunci ? "bg-[#7FCB96]" : "bg-[#FFE566]"
            } ${keliru === n && !dipilih ? "igil-goyang" : ""}`}
          >
            {n}
          </button>
        ))}
      </div>
      <KabarChip kabar={kabar} />

      <JawabSuara id={kartu.id} jumlah={kartu.kunci} panel={panel} siap={dipilih} belumSiap="Pilih angka yang hilang dulu, ya." />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-3xl">🌟</p>
          <Rantai deret={lengkap} />
        </div>
      ) : null}

      {kartu.tulis ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
          <DottedNumberTracingCanvas
            key={`lambang-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
        </div>
      ) : null}

      <TombolLanjut teks={indeks >= total - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} />
    </>
  );
}

const SUARA_POIN =
  "Ingat selalu! Menghitung maju dimulai dari bilangan kecil ke besar, setiap langkah bertambah satu. Menghitung mundur dimulai dari bilangan besar ke kecil, setiap langkah berkurang satu. Satu langkah maju adalah bilangan sesudah, dan satu langkah mundur adalah bilangan sebelum.";

const POIN_C = [
  {
    ikon: "⬆️",
    nama: "Maju",
    suara: "Menghitung maju. Mulai dari bilangan kecil ke besar. Setiap langkah bertambah satu.",
    deret: [3, 4, 5, 6, 7],
    warna: KUNING,
  },
  {
    ikon: "⬇️",
    nama: "Mundur",
    suara: "Menghitung mundur. Mulai dari bilangan besar ke kecil. Setiap langkah berkurang satu.",
    deret: [9, 8, 7, 6, 5],
    warna: "#C7D2FE",
  },
  {
    ikon: "🏁",
    nama: "Mulai dari mana saja",
    suara: "Kita bisa menghitung maju atau mundur mulai dari bilangan mana pun di tengah. Tidak harus selalu dari satu atau dari sepuluh.",
    deret: [4, 5, 6],
    warna: "#FFFFFF",
  },
  {
    ikon: "🧭",
    nama: "Sebelum dan sesudah",
    suara: "Satu langkah maju adalah bilangan sesudah. Satu langkah mundur adalah bilangan sebelum.",
    deret: [5, 6, 7],
    warna: "#BBF7D0",
  },
];

function PoinPentingC({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <button
          type="button"
          onClick={() => speakGuru(SUARA_POIN)}
          className="shrink-0 rounded-full border-[3px] border-[#FFE566] bg-[#1C01A5] px-3 py-2 text-xs font-black text-[#FFE566] shadow-md"
        >
          🔊 Suara Guru
        </button>
      </div>
      <div className="space-y-2">
        {POIN_C.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="igil-tanpa-tepi block w-full space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <span aria-hidden="true">🔊</span>
            </span>
            <Rantai deret={p.deret} warna={p.warna} />
          </button>
        ))}
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB C ➡️" onClick={onSelesai} />
    </>
  );
}

export function AbstractMajuMundurC(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_LAMBANG_C.length;
  const kartu = KARTU_LAMBANG_C[Math.min(indeks, KARTU_LAMBANG_C.length - 1)];
  const langkahTotal = KARTU_LAMBANG_C.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };

  return (
    <div className="space-y-3 rounded-2xl border-4 border-[#1C01A5] p-3" style={GAYA_KOTAK}>
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan panah" warna="#1C01A5" />
      <div className="flex items-center gap-1.5">
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      {poin ? (
        <PoinPentingC
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <IsiKartuLambangC
          key={kartu.id}
          kartu={kartu}
          indeks={indeks}
          total={KARTU_LAMBANG_C.length}
          speakGuru={speakGuru}
          panel={panel}
          lanjut={lanjut}
        />
      )}
    </div>
  );
}
