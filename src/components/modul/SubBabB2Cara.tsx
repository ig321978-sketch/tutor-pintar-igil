"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { BingkaiMini, Kepik } from "./gambar-cara-b2";
import { Bagan } from "./gambar-pasangan-d";
import {
  GameRonde,
  IgilBicara,
  Kelompok,
  KERTAS_ANGKA,
  KERTAS_GAMBAR,
  Persamaan,
  PilihAngka,
  TOMBOL_KECIL,
  TOTAL_GAME,
  kataK,
  opsiTiga,
  ucapTambah,
  type Isi,
  type PropsLangkah,
} from "./SubBabA2Penjumlahan";
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
  LencanaSuara,
  PitaTahap,
  SuaraCtx,
  TombolSuaraGuru,
  useBicara,
  zonaDi,
} from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Bab 2 Sub-Bab B: Berbagai Cara Melakukan Penjumlahan (Buku Siswa hlm. 51-64). */
/* Semua di klien, tanpa API. Naskah: naskah/mtk-1-bab2-sub-b-berbagai-cara.md.  */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Dua Keranjang Apel (seret dan tukar), 2 Lompat di Petak Angka  */
/*            (ketuk petak), 3 Kepik Kembar (samakan totol), 4 Sepuluh Jari    */
/*            (buka jari).                                                    */
/*  Picture:  5 Isi Bagan Pasangan (pilih angka), 6 Tabel Tambah di Garis      */
/*            Bilangan (ketuk hasil), 7 Kartu Dua Bingkai (cari pasangan).     */
/*  Abstract: 8 Susun Tukar Tempat (kartu angka), 9 Kembar atau Bukan?         */
/*            (tentukan, cari hasil), 10 Kanvas Guratan dan Suara.             */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Bagian bersama -------------------------- */

/** Deretan petak angka 1 sampai 10. Penanda berdiri di atas petak `tanda`. */
function DeretPetak({
  tanda,
  sorot = [],
  onKetuk,
  mati = false,
}: {
  tanda?: number;
  sorot?: number[];
  onKetuk?: (n: number) => void;
  mati?: boolean;
}) {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="grid grid-cols-10 gap-0.5" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="flex h-7 items-end justify-center text-xl leading-none">
            {tanda === i + 1 ? <span className="igil-lompat">🧒</span> : null}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-10 gap-0.5" role="group" aria-label="Garis bilangan satu sampai sepuluh">
        {Array.from({ length: 10 }, (_, i) => {
          const n = i + 1;
          const nyala = sorot.includes(n);
          const kelas = `flex aspect-square w-full items-center justify-center rounded-lg border-[3px] border-[#1C01A5] p-0 text-base font-black leading-none text-[#1C01A5] sm:text-lg ${
            tanda === n ? "bg-[#F0AB00] ring-2 ring-[#1C01A5]" : nyala ? "bg-[#FFE566]" : "bg-[#EDE9FE]"
          }`;
          return onKetuk ? (
            <button key={n} type="button" aria-label={`Petak ${n}`} disabled={mati} onClick={() => onKetuk(n)} className={`${kelas} disabled:opacity-80`}>
              {n}
            </button>
          ) : (
            <span key={n} className={kelas}>
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman berbagai cara penjumlahan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_B2 = [
  { ikon: "🔵", nama: "Gabungan", ket: "Semuanya setelah digabung", suara: "Gabungan adalah jumlah semuanya setelah dua bagian digabung. Tiga dan dua, gabungannya lima." },
  { ikon: "🟡", nama: "Sebagian", ket: "Satu bagian dari gabungan", suara: "Sebagian adalah satu bagian dari gabungan. Pada lima, sebagiannya tiga dan dua." },
  { ikon: "🏃", nama: "Maju", ket: "Lompat ke depan", suara: "Menghitung maju artinya melompat ke depan sebanyak bilangan kedua. Mulai dari lima, lompat tiga, sampai di delapan." },
  { ikon: "👯", nama: "Kembar", ket: "Dua bilangan sama", suara: "Kembar artinya dua bilangan yang sama. Tiga ditambah tiga adalah penjumlahan berulang." },
];

const PASANGAN_SEPULUH: [number, number][] = [
  [9, 1],
  [8, 2],
  [7, 3],
  [6, 4],
  [5, 5],
];

export function InfografisCaraB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Berbagai Cara Menjumlahkan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="PASANGAN BILANGAN"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Cara pertama, pasangan bilangan. Lima apel terdiri dari tiga apel merah dan dua apel hijau. Tiga dan dua digabung menjadi lima. Dua dan tiga juga lima."
      >
        <div className="space-y-2 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Kelompok ikon="🍎" n={3} kelas="text-2xl" />
            <Kelompok ikon="🍏" n={2} kelas="text-2xl" />
          </div>
          <Bagan gabungan={5} a={3} b={2} nama kelas="w-full max-w-[200px]" />
          <Persamaan a={3} b={2} c={5} kecil />
          <Persamaan a={2} b={3} c={5} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="MENGHITUNG MAJU"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Cara kedua, menghitung maju. Mulai dari lima. Lompat tiga langkah ke depan: enam, tujuh, delapan. Lima ditambah tiga sama dengan delapan."
      >
        <div className="space-y-2 text-center">
          <DeretPetak tanda={5} sorot={[5, 6, 7, 8]} />
          <p className="inline-block rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-base font-black text-[#1C01A5]">
            5 → 6, 7, 8
          </p>
          <Persamaan a={5} b={3} c={8} kecil />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="PENJUMLAHAN BERULANG"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Cara ketiga, penjumlahan berulang. Menambahkan bilangan yang sama. Satu tambah satu dua. Dua tambah dua empat. Tiga tambah tiga enam. Empat tambah empat delapan. Lima tambah lima sepuluh."
      >
        <div className="space-y-2 text-center">
          <Kepik kiri={3} kanan={3} kelas="h-auto w-full max-w-[150px]" />
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className="rounded-full border-4 border-[#1C01A5] bg-white px-2.5 py-0.5 text-base font-black text-[#1C01A5]"
              >
                {n} + {n} = {n * 2}
              </span>
            ))}
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="HASILNYA 10"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Cara keempat, penjumlahan yang hasilnya sepuluh. Sembilan tambah satu. Delapan tambah dua. Tujuh tambah tiga. Enam tambah empat. Lima tambah lima. Semuanya sepuluh."
      >
        <div className="grid grid-cols-3 gap-2 text-center">
          {PASANGAN_SEPULUH.map(([m, b]) => (
            <div key={m} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
              <BingkaiMini merah={m} biru={b} kelas="w-full" />
              <p className="text-sm font-black text-[#1C01A5]">
                {m} + {b} = 10
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="TUKAR TEMPAT"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Dua bilangan boleh ditukar tempat. Tiga ditambah empat sama dengan tujuh. Empat ditambah tiga juga sama dengan tujuh."
      >
        <div className="space-y-1 text-center">
          <Persamaan a={3} b={4} c={7} kecil />
          <p className="text-2xl" aria-hidden="true">
            🔄
          </p>
          <Persamaan a={4} b={3} c={7} kecil />
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_B2.map((g) => (
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
              <LencanaSuara kelas="h-7 w-7" />
            </button>
          ))}
        </div>
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete. Empat permainan dengan benda yang bisa dipegang.        */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 1. Dua Keranjang Apel (hlm. 51-54) ------------------- */

const RONDE_KERANJANG = [
  { ikonA: "🍎", ikonB: "🍏", a: 3, b: 2, nama: "apel" },
  { ikonA: "🍊", ikonB: "🍋", a: 4, b: 1, nama: "jeruk" },
];

function RondeKeranjang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KERANJANG[ronde];
  const c = d.a + d.b;
  const benda = [...Array.from({ length: d.a }, () => "a" as const), ...Array.from({ length: d.b }, () => "b" as const)];
  const [masuk, setMasuk] = useState<boolean[]>(() => benda.map(() => false));
  const [tukar, setTukar] = useState(false);
  const letusan = useLetusan();
  const penuh = masuk.every(Boolean);
  const akhir = ronde === RONDE_KERANJANG.length - 1;
  const suara = panel.suara["b2-keranjang"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(tukar, `${ucapTambah(d.a, d.b, c)}. ${ucapTambah(d.b, d.a, c)}.`);

  const ke = (i: number, nilai: boolean) => {
    if (tukar) return;
    const baru = masuk.slice();
    baru[i] = nilai;
    setMasuk(baru);
  };
  const jumlah = (w: "a" | "b") => benda.filter((x, i) => x === w && masuk[i]).length;
  const ikon = (w: "a" | "b") => (w === "a" ? d.ikonA : d.ikonB);
  const urut: ("a" | "b")[] = tukar ? ["b", "a"] : ["a", "b"];

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : tukar ? "Ucapkan: semua buah" : penuh ? "Tukar tempat dua kelompok!" : "Masukkan semua buah!"}
        teks={`Ada ${kataK(d.a)} ${d.nama} pertama dan ${kataK(d.b)} ${d.nama} kedua. Seret semua buah ke keranjang, atau ketuk buahnya. Lalu tukar tempat dua kelompok, dan ucapkan berapa semuanya.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[72px] flex-wrap items-end justify-center gap-3 rounded-2xl border-4 border-dashed border-[#A8672D] bg-white/70 p-2">
          {benda.map((w, i) =>
            masuk[i] ? null : (
              <BendaSeret
                key={i}
                id={String(i)}
                aktif={!tukar}
                label={`${d.nama} ${w === "a" ? "pertama" : "kedua"}`}
                onKetuk={() => ke(i, true)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "b2-keranjang") ke(i, true);
                }}
              >
                <span className="text-5xl leading-none">{ikon(w)}</span>
              </BendaSeret>
            )
          )}
          {penuh ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div
          data-zona="b2-keranjang"
          className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#F3C98A] px-2 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]"
        >
          <p className="text-center text-sm font-black text-[#1C01A5]/70">Keranjang</p>
          <div className="grid min-h-[84px] grid-cols-2 gap-2">
            {urut.map((w) => (
              <div key={w} className="igil-muncul flex flex-wrap content-center items-center justify-center gap-1 rounded-2xl border-4 border-dashed border-[#A8672D] bg-white/80 p-1">
                {benda.map((x, i) =>
                  x === w && masuk[i] ? (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Keluarkan ${d.nama}`}
                      disabled={tukar}
                      onClick={() => ke(i, false)}
                      className="igil-tanpa-tepi p-0 text-4xl leading-none"
                    >
                      {ikon(w)}
                    </button>
                  ) : null
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {urut.map((w) => jumlah(w)).join(" dan ")}
          </p>
        </div>
        {penuh && !tukar ? (
          <button type="button" onClick={() => { setTukar(true); letusan.picu(); onBeres(); }} className={TOMBOL_KECIL}>
            🔄 Tukar tempat
          </button>
        ) : null}
        {penuh ? (
          <div className="space-y-1.5">
            <Persamaan a={d.a} b={d.b} c={bukaC ? c : "?"} kecil />
            {tukar ? <Persamaan a={d.b} b={d.a} c={bukaC ? c : "?"} kecil /> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahKeranjang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Dua Keranjang Apel"
      warna="#FFE566"
      petunjuk="Seret semua buah ke keranjang, atau ketuk buahnya. Lalu tekan tukar tempat supaya dua kelompok bertukar. Terakhir, ucapkan berapa semua buah."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-keranjang"
      jumlahRonde={RONDE_KERANJANG.length}
      kunciAkhir={5}
      belumSiap="Masukkan semua buah, lalu tukar tempat, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKeranjang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Lompat di Petak Angka (hlm. 55-58) ---------------- */

const RONDE_LOMPAT: [number, number][] = [
  [1, 2],
  [4, 3],
  [5, 3],
];

function RondeLompat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [a, b] = RONDE_LOMPAT[ronde];
  const c = a + b;
  const ucap = useContext(SuaraCtx);
  const [lompat, setLompat] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const posisi = a + lompat;
  const beres = lompat >= b;
  const akhir = ronde === RONDE_LOMPAT.length - 1;
  const suara = panel.suara["b2-lompat"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(a, b, c)}.`);

  const ketuk = (n: number) => {
    if (beres) return;
    if (n === posisi + 1) {
      setKabar(null);
      const baru = lompat + 1;
      setLompat(baru);
      ucap(kataK(n));
      if (baru >= b) {
        letusan.picu();
        onBeres();
      }
    } else if (n <= posisi) {
      setKabar({ teks: "Petak itu sudah dilewati. Lompat ke depan, ya.", ok: false });
    } else {
      setKabar({ teks: "Lompat satu petak saja, ke petak berikutnya.", ok: false });
    }
  };

  const jejak = Array.from({ length: lompat }, (_, i) => a + i + 1);

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: berapa sekarang?" : `Lompat ${kataK(b)} petak ke depan!`}
        teks={`Kira berdiri di angka ${kataK(a)}. Ketuk petak berikutnya satu per satu. Lompat ${kataK(b)} kali. Lalu ucapkan Kira ada di angka berapa.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <DeretPetak
          tanda={posisi}
          sorot={Array.from({ length: lompat + 1 }, (_, i) => a + i)}
          onKetuk={ketuk}
          mati={beres}
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Mulai {a}</span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">
            Lompatan {lompat} dari {b}
          </span>
        </div>
        {jejak.length > 0 ? (
          <p className="igil-muncul text-center text-lg font-black text-[#1C01A5]">
            {a} → {jejak.join(", ")}
          </p>
        ) : null}
        <Persamaan a={a} b={b} c={beres && bukaC ? c : "?"} />
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahLompat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Lompat di Petak Angka"
      warna="#FFE566"
      petunjuk="Kira berdiri di satu angka. Ketuk petak berikutnya satu per satu untuk melompat ke depan. Setelah selesai melompat, ucapkan Kira ada di angka berapa."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-lompat"
      jumlahRonde={RONDE_LOMPAT.length}
      kunciAkhir={8}
      belumSiap="Selesaikan lompatannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLompat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Kepik Kembar (hlm. 59-60) ------------------------- */

const RONDE_KEPIK = [2, 3, 4];

function RondeKepik({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_KEPIK[ronde];
  const c = n + n;
  const [kanan, setKanan] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = kanan === n;
  const akhir = ronde === RONDE_KEPIK.length - 1;
  const suara = panel.suara["b2-kepik"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(n, n, c)}. Bilangan yang sama ditambahkan, itu penjumlahan berulang.`);

  const ubah = (delta: number) => {
    if (beres) return;
    const baru = kanan + delta;
    if (baru < 0) return;
    if (baru > n + 1) {
      setKabar({ teks: "Terlalu banyak. Samakan dengan sayap kiri.", ok: false });
      return;
    }
    setKanan(baru);
    if (baru === n) {
      setKabar(null);
      letusan.picu();
      onBeres();
    } else if (baru > n) {
      setKabar({ teks: "Terlalu banyak. Kurangi satu totol.", ok: false });
    } else {
      setKabar(null);
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua totol" : "Samakan totol sayap kanan!"}
        teks={`Sayap kiri kepik punya ${kataK(n)} totol. Tambahkan totol di sayap kanan sampai sama banyak. Lalu ucapkan berapa semua totolnya.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-2">
          <Kepik kiri={n} kanan={kanan} />
          <div className="mt-1 grid grid-cols-2 gap-2 text-center text-sm font-black text-[#14532D]">
            <span>Kiri {n}</span>
            <span>Kanan {kanan}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Kurangi totol sayap kanan"
            disabled={beres || kanan === 0}
            onClick={() => ubah(-1)}
            className="h-14 w-14 rounded-full border-4 border-[#1C01A5] bg-white text-3xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] disabled:opacity-40"
          >
            −
          </button>
          <span className="text-sm font-black text-[#1C01A5]">Totol sayap kanan</span>
          <button
            type="button"
            aria-label="Tambah totol sayap kanan"
            disabled={beres}
            onClick={() => ubah(1)}
            className="h-14 w-14 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-3xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] disabled:opacity-40"
          >
            +
          </button>
        </div>
        <KabarChip kabar={kabar} />
        {beres ? (
          <div className="space-y-1">
            <p className="igil-muncul text-center text-base font-black text-[#92400E]">👯 Kembar! Dua bilangan sama.</p>
            <Persamaan a={n} b={n} c={bukaC ? c : "?"} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahKepik({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kepik Kembar"
      warna="#FFE566"
      petunjuk="Sayap kiri kepik punya beberapa totol. Tekan tombol tambah sampai sayap kanan punya totol yang sama banyak. Lalu ucapkan berapa semua totolnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-kepik"
      jumlahRonde={RONDE_KEPIK.length}
      kunciAkhir={8}
      belumSiap="Samakan totol sayap kanan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKepik ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Sepuluh Jari (hlm. 61) ---------------------------- */

const RONDE_JARI = [8, 7, 6];

function RondeJari({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_JARI[ronde];
  const sisa = 10 - n;
  const [buka, setBuka] = useState<boolean[]>(() => Array.from({ length: 10 }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = buka.filter(Boolean).length;
  const beres = jumlah === n;
  const akhir = ronde === RONDE_JARI.length - 1;
  const suara = panel.suara["b2-jari"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(n, sisa, 10)}. Semuanya ada sepuluh jari.`);

  const ketuk = (i: number) => {
    if (beres) return;
    const baru = buka.slice();
    if (baru[i]) {
      baru[i] = false;
      setBuka(baru);
      setKabar(null);
      return;
    }
    if (jumlah >= n) {
      setKabar({ teks: `Cukup! Buka ${kataK(n)} jari saja.`, ok: false });
      return;
    }
    baru[i] = true;
    setKabar(null);
    setBuka(baru);
    if (baru.filter(Boolean).length === n) {
      letusan.picu();
      onBeres();
    }
  };

  const tangan = (mulai: number, nama: string) => (
    <div className="flex flex-col items-center">
      <div className="flex items-end justify-center gap-1">
        {Array.from({ length: 5 }, (_, k) => {
          const i = mulai + k;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Jari ${i + 1} ${buka[i] ? "terbuka" : "tertutup"}`}
              disabled={beres}
              onClick={() => ketuk(i)}
              className="igil-tanpa-tepi flex h-[84px] w-9 items-end justify-center p-0"
            >
              <span
                className={`block w-8 rounded-t-full rounded-b-lg border-4 border-[#1C01A5] transition-all ${
                  buka[i] ? "h-[76px] bg-[#F7C59F]" : "h-8 bg-[#E5E7EB]"
                }`}
              />
            </button>
          );
        })}
      </div>
      <div className="h-8 w-full rounded-3xl border-4 border-[#1C01A5] bg-[#F7C59F]" aria-hidden="true" />
      <span className="pt-1 text-xs font-black text-[#1C01A5]/70">{nama}</span>
    </div>
  );

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semua jari" : `Buka ${kataK(n)} jari!`}
        teks={`Buka ${kataK(n)} jari. Ketuk jari untuk membukanya. Jari yang tidak dibuka adalah jari yang tertutup. Lalu ucapkan berapa semua jari.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-2">
          {tangan(0, "Tangan kiri")}
          {tangan(5, "Tangan kanan")}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">
            Terbuka {jumlah}
          </span>
          <span className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">
            Tertutup {10 - jumlah}
          </span>
        </div>
        {beres ? <Persamaan a={n} b={sisa} c={bukaC ? 10 : "?"} /> : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function LangkahJari({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Sepuluh Jari"
      warna="#FFE566"
      petunjuk="Buka jari sebanyak yang diminta. Jari sisanya tertutup. Setelah itu, ucapkan berapa semua jari."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-jari"
      jumlahRonde={RONDE_JARI.length}
      kunciAkhir={10}
      belumSiap="Buka jarimu sesuai perintah dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJari ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "keranjang" | "lompat" | "kepik" | "jari";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "keranjang" },
  { nomor: 2, tipe: "lompat" },
  { nomor: 3, tipe: "kepik" },
  { nomor: 4, tipe: "jari" },
];

export function ConcreteCaraB(props: Umum) {
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
  const dasar = {
    speakGuru,
    lanjut,
    nomor: langkah.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE PICTURE ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan pindahkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span
            key={l.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "keranjang" ? <LangkahKeranjang {...dasar} /> : null}
        {langkah.tipe === "lompat" ? <LangkahLompat {...dasar} /> : null}
        {langkah.tipe === "kepik" ? <LangkahKepik {...dasar} /> : null}
        {langkah.tipe === "jari" ? <LangkahJari {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Tiga permainan dengan gambar dan diagram.                */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Isi Bagan Pasangan (hlm. 51-54) ------------------- */

const RONDE_BAGAN = [
  { ikonA: "🍎", ikonB: "🍏", a: 3, b: 2 },
  { ikonA: "🌼", ikonB: "🌷", a: 2, b: 4 },
  { ikonA: "🍓", ikonB: "🍇", a: 6, b: 3 },
];

function RondeBagan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BAGAN[ronde];
  const c = d.a + d.b;
  const target: ("a" | "b" | "g")[] = ["a", "b", "g"];
  const nilai = { a: d.a, b: d.b, g: c };
  const [langkah, setLangkah] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  const akhir = ronde === RONDE_BAGAN.length - 1;
  const suara = panel.suara["b2-bagan"] === true && akhir;
  const bukaC = !akhir || suara;
  useBicara(beres, `${ucapTambah(d.a, d.b, c)}. ${ucapTambah(d.b, d.a, c)}.`);

  const pilih = (n: number) => {
    if (beres) return;
    const sasaran = target[langkah];
    if (n === nilai[sasaran]) {
      setKeliru(null);
      setKabar(null);
      const baru = langkah + 1;
      setLangkah(baru);
      if (baru >= 3) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(n);
      setKabar({
        teks: sasaran === "g" ? "Gabungan adalah semuanya. Hitung semua gambar." : "Hitung gambar kelompok ini, ya.",
        ok: false,
      });
    }
  };

  const sasaran = target[Math.min(langkah, 2)];
  const label = sasaran === "a" ? "lingkaran Sebagian atas" : sasaran === "b" ? "lingkaran Sebagian bawah" : "lingkaran Gabungan";

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: semuanya" : `Isi ${label}`}
        teks="Hitung gambarnya. Isi bagan pasangan bilangan secara berurutan: Sebagian atas, Sebagian bawah, lalu Gabungan. Pilih angka yang tepat."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
            <Kelompok ikon={d.ikonA} n={d.a} />
          </div>
          <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
            <Kelompok ikon={d.ikonB} n={d.b} />
          </div>
        </div>
        <Bagan
          gabungan={langkah > 2 ? c : "?"}
          a={langkah > 0 ? d.a : "?"}
          b={langkah > 1 ? d.b : "?"}
          nama
          kelas="w-full max-w-[220px]"
          nyala={beres ? [] : [sasaran]}
        />
        {!beres ? <PilihAngka opsi={opsiTiga(nilai[sasaran])} keliru={keliru} onPilih={pilih} /> : null}
        {beres ? (
          <div className="space-y-1.5">
            <Persamaan a={d.a} b={d.b} c={bukaC ? c : "?"} kecil />
            <Persamaan a={d.b} b={d.a} c={bukaC ? c : "?"} kecil />
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuBagan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Isi Bagan Pasangan"
      warna="#FDE68A"
      petunjuk="Hitung gambar tiap kelompok. Lalu isi bagan pasangan bilangan dengan memilih angka yang tepat. Setelah itu, ucapkan jumlah semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-bagan"
      jumlahRonde={RONDE_BAGAN.length}
      kunciAkhir={9}
      belumSiap="Isi ketiga lingkaran bagan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBagan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tabel Tambah di Garis Bilangan (hlm. 55-58) ------- */

const RONDE_TABEL: { tambah: number; awal: number[] }[] = [
  { tambah: 1, awal: [1, 2, 3, 4] },
  { tambah: 2, awal: [1, 2, 3, 4] },
  { tambah: 3, awal: [2, 3, 4, 5] },
];

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TABEL[ronde];
  const [baris, setBaris] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = baris >= d.awal.length;
  const akhir = ronde === RONDE_TABEL.length - 1;
  const suara = panel.suara["b2-tabel"] === true && akhir;
  const awalSaatIni = d.awal[Math.min(baris, d.awal.length - 1)];
  useBicara(beres, `Tabel tambah ${kataK(d.tambah)} sudah lengkap. ${ucapTambah(d.awal[3], d.tambah, d.awal[3] + d.tambah)}.`);

  const ketuk = (n: number) => {
    if (beres) return;
    const benar = awalSaatIni + d.tambah;
    if (n === benar) {
      setKabar(null);
      const baru = baris + 1;
      setBaris(baru);
      if (baru >= d.awal.length) {
        letusan.picu();
        onBeres();
      }
    } else if (n <= awalSaatIni) {
      setKabar({ teks: `Maju ke kanan, ya. Lompat ${kataK(d.tambah)} petak dari ${kataK(awalSaatIni)}.`, ok: false });
    } else {
      setKabar({ teks: `Hitung lompatannya lagi: dari ${kataK(awalSaatIni)}, maju ${kataK(d.tambah)}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: hasil terakhir" : `Ketuk petak hasil ${awalSaatIni} + ${d.tambah}`}
        teks={`Lihat baris tabel yang menyala. Mulai dari bilangan pertama, maju sebanyak ${kataK(d.tambah)} petak. Ketuk petak hasilnya di garis bilangan.`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="space-y-2 rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            Tabel tambah {d.tambah} • baris {Math.min(baris + 1, d.awal.length)} dari {d.awal.length}
          </p>
          <div className="flex min-h-[34px] flex-wrap items-center justify-center gap-1.5">
            {d.awal.slice(0, baris).map((m) => (
              <span key={m} className="igil-muncul rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-2.5 py-0.5 text-sm font-black text-[#1C01A5]">
                {m} + {d.tambah} = {m + d.tambah}
              </span>
            ))}
          </div>
          {!beres ? (
            <div className="rounded-xl bg-[#FFF7CC] py-1 ring-4 ring-[#F0AB00]">
              <Persamaan a={awalSaatIni} b={d.tambah} c="?" />
            </div>
          ) : null}
        </div>
        <DeretPetak
          tanda={beres ? undefined : awalSaatIni}
          onKetuk={ketuk}
          mati={beres}
        />
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Tabel Tambah di Garis Bilangan"
      warna="#FDE68A"
      petunjuk="Lihat baris tabel yang menyala. Mulai dari bilangan pertama, lalu maju. Ketuk petak hasilnya di garis bilangan. Setelah semua baris lengkap, ucapkan hasil baris terakhir."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={8}
      belumSiap="Lengkapi semua baris tabel dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Kartu Dua Bingkai (hlm. 62-64) -------------------- */

const RONDE_KARTU: number[][] = [
  [7, 2, 9, 4, 3, 8, 1, 6],
  [5, 3, 8, 2, 5, 7, 6, 4],
];

function RondeKartu({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const nilai = RONDE_KARTU[ronde];
  const [cocok, setCocok] = useState<boolean[]>(() => nilai.map(() => false));
  const [pilih, setPilih] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<[number, number][]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = cocok.every(Boolean);
  const akhir = ronde === RONDE_KARTU.length - 1;
  const suara = panel.suara["b2-kartu"] === true && akhir;
  useBicara(beres, "Semua pasangan berjumlah sepuluh. Tujuh dan tiga, delapan dan dua, sembilan dan satu, enam dan empat. Semuanya sepuluh.");

  const ketuk = (i: number) => {
    if (beres || cocok[i]) return;
    setKeliru(null);
    if (pilih === null) {
      setPilih(i);
      setKabar(null);
      return;
    }
    if (pilih === i) {
      setPilih(null);
      return;
    }
    const x = nilai[pilih];
    const y = nilai[i];
    if (x + y === 10) {
      const baru = cocok.slice();
      baru[pilih] = true;
      baru[i] = true;
      setCocok(baru);
      setPilih(null);
      setPasangan((p) => [...p, [x, y]]);
      setKabar({ teks: `${x} + ${y} = 10. Bingkainya penuh!`, ok: true });
      if (baru.every(Boolean)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(i);
      setPilih(null);
      setKabar({ teks: `${x} dan ${y} belum penuh sepuluh. Coba pasangan lain.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: berapa sepuluh?" : "Cari dua bingkai yang jadi penuh"}
        teks="Ada delapan kartu bingkai. Ketuk dua kartu yang jika digabung membuat bingkai sepuluh menjadi penuh. Temukan semua pasangannya."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-4 gap-1.5">
          {nilai.map((n, i) => (
            <button
              key={`${i}-${keliru === i ? "x" : "o"}`}
              type="button"
              aria-label={`Kartu bingkai berisi ${n} bola`}
              aria-pressed={pilih === i}
              disabled={cocok[i]}
              onClick={() => ketuk(i)}
              className={`rounded-xl border-4 p-1 shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
                cocok[i]
                  ? "border-[#16A34A] bg-[#DCFCE7] opacity-70"
                  : pilih === i
                    ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]"
                    : "border-[#1C01A5] bg-white"
              } ${keliru === i ? "igil-goyang" : ""}`}
            >
              <BingkaiMini merah={n} biru={0} kelas="w-full" />
            </button>
          ))}
        </div>
        <div className="flex min-h-[32px] flex-wrap items-center justify-center gap-1.5">
          {pasangan.map(([x, y], i) => (
            <span key={i} className="igil-muncul rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-2.5 py-0.5 text-sm font-black text-[#1C01A5]">
              {x} + {y} = 10
            </span>
          ))}
        </div>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuBingkaiB({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kartu Dua Bingkai"
      warna="#FDE68A"
      petunjuk="Ketuk dua kartu bingkai yang jika digabung membuat bingkai sepuluh penuh. Temukan semua pasangannya. Setelah itu, ucapkan berapa jumlah tiap pasangan."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-kartu"
      jumlahRonde={RONDE_KARTU.length}
      kunciAkhir={10}
      belumSiap="Temukan semua pasangan bingkai dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKartu ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Picture --------------------------------------------- */

type TipePicture = "bagan" | "tabel" | "kartu";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "bagan" },
  { nomor: 6, tipe: "tabel" },
  { nomor: 7, tipe: "kartu" },
];

export function PictureCaraB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_PICTURE[indeks];
  const terakhir = indeks >= KARTU_PICTURE.length - 1;

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
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span
            key={k.nomor}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "bagan" ? <KartuBagan {...dasar} /> : null}
        {kartu.tipe === "tabel" ? <KartuTabel {...dasar} /> : null}
        {kartu.tipe === "kartu" ? <KartuBingkaiB {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tiga permainan angka dan simbol, lalu Poin Penting.     */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Susun Tukar Tempat (hlm. 51-54) ------------------- */

const RONDE_TUKAR: [number, number, number][] = [
  [3, 2, 5],
  [1, 4, 5],
  [5, 3, 8],
];

function RondeTukar({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const [a, b, c] = RONDE_TUKAR[ronde];
  const urutan: (number | string)[] = [b, "+", a, "=", c];
  const kartu: (number | string)[] = ["=", c, a, "+", b];
  const [n, setN] = useState(0);
  const [pakai, setPakai] = useState<(number | string)[]>([]);
  const [keliru, setKeliru] = useState<number | string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = n >= 5;
  useBicara(beres, `${ucapTambah(a, b, c)}. Ditukar tempat, ${ucapTambah(b, a, c)}.`);

  const taruh = (v: number | string) => {
    if (beres) return;
    if (v === urutan[n]) {
      setKeliru(null);
      setKabar(null);
      setPakai((p) => [...p, v]);
      const baru = n + 1;
      setN(baru);
      if (baru >= 5) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(v);
      const harusTanda = n === 1 || n === 3;
      setKabar({
        teks: harusTanda
          ? n === 1
            ? "Sekarang pilih tanda tambah."
            : "Sekarang pilih tanda sama dengan."
          : n === 0
            ? "Tukar tempat: angka kedua jadi yang pertama."
            : n === 2
              ? "Angka pertama pindah ke belakang tanda tambah."
              : "Hasilnya tetap sama, ya.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Kalimat tukar tempat sudah jadi!" : "Susun kalimat tukar tempat"}
        teks="Lihat kalimat yang pertama. Sekarang tukar tempat dua angka yang ditambahkan. Susun kalimat barunya dengan mengetuk kartu secara berurutan."
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white py-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kalimat awal</p>
          <Persamaan a={a} b={b} c={c} kecil />
        </div>
        <p className="text-center text-2xl" aria-hidden="true">
          🔄
        </p>
        <Persamaan
          a={n > 0 ? b : null}
          t1={n > 1 ? "+" : null}
          b={n > 2 ? a : null}
          t2={n > 3 ? "=" : null}
          c={n > 4 ? c : null}
          nyala={beres ? [] : [n]}
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {kartu.map((v) =>
            pakai.includes(v) ? null : (
              <button
                key={`${v}-${keliru === v ? "x" : "o"}`}
                type="button"
                aria-label={`Kartu ${v}`}
                disabled={beres}
                onClick={() => taruh(v)}
                className={`h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-3xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                  keliru === v ? "igil-goyang" : ""
                }`}
              >
                {v}
              </button>
            )
          )}
        </div>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuTukar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Susun Tukar Tempat"
      warna="#C7D2FE"
      petunjuk="Lihat kalimat yang pertama. Tukar tempat dua angka yang ditambahkan. Susun kalimat barunya dengan mengetuk kartu secara berurutan. Terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-tukar"
      jumlahRonde={RONDE_TUKAR.length}
      kunciAkhir={8}
      belumSiap="Susun kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTukar ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Kembar atau Bukan? (hlm. 59-60) ------------------- */

const RONDE_KEMBAR: [number, number][] = [
  [3, 3],
  [2, 5],
  [5, 5],
  [4, 4],
];

function RondeKembar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [a, b] = RONDE_KEMBAR[ronde];
  const c = a + b;
  const kembar = a === b;
  const akhir = ronde === RONDE_KEMBAR.length - 1;
  const [fase, setFase] = useState<0 | 1 | 2>(0);
  const [keliru, setKeliru] = useState<string | number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["b2-kembar"] === true && akhir;
  const bukaC = fase === 2 && (!akhir || suara);
  useBicara(fase === 2, kembar ? `${ucapTambah(a, b, c)}. Dua bilangan yang sama, itu kembar.` : `${ucapTambah(a, b, c)}. Dua bilangan ini tidak sama.`);

  const tentukan = (jawab: boolean) => {
    if (fase !== 0) return;
    if (jawab === kembar) {
      setKeliru(null);
      setKabar({ teks: kembar ? "Benar! Dua bilangannya sama." : "Benar! Dua bilangannya berbeda.", ok: true });
      if (akhir) {
        setFase(2);
        letusan.picu();
        onBeres();
      } else {
        setFase(1);
      }
    } else {
      setKeliru(jawab ? "k" : "b");
      setKabar({ teks: kembar ? "Lihat lagi. Kedua angkanya sama." : "Lihat lagi. Kedua angkanya tidak sama.", ok: false });
    }
  };

  const pilihHasil = (n: number) => {
    if (fase !== 1) return;
    if (n === c) {
      setKeliru(null);
      setKabar(null);
      setFase(2);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Hitung lagi, ya. Kamu pasti bisa.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : fase === 2 ? "Ucapkan hasilnya" : fase === 1 ? "Pilih hasilnya" : "Kembar atau bukan?"}
        teks="Lihat dua bilangan yang ditambahkan. Kalau kedua bilangannya sama, itu kembar. Pilih kembar atau bukan, lalu cari hasilnya."
      />
      <div className={KERTAS_ANGKA}>
        <Persamaan a={a} b={b} c={bukaC ? c : "?"} />
        {fase === 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["k", "👯 Kembar", true],
                ["b", "👤 Bukan kembar", false],
              ] as const
            ).map(([kode, teks, nilai]) => (
              <button
                key={`${kode}-${keliru === kode ? "x" : "o"}`}
                type="button"
                onClick={() => tentukan(nilai)}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-lg font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                  keliru === kode ? "igil-goyang" : ""
                }`}
              >
                {teks}
              </button>
            ))}
          </div>
        ) : null}
        {fase === 1 ? <PilihAngka opsi={opsiTiga(c)} keliru={typeof keliru === "number" ? keliru : null} onPilih={pilihHasil} /> : null}
        {fase === 2 && kembar ? (
          <p className="igil-muncul text-center text-base font-black text-[#92400E]">
            👯 {a} + {b}: dua bilangan sama
          </p>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuKembar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kembar atau Bukan?"
      warna="#C7D2FE"
      petunjuk="Lihat dua bilangan yang ditambahkan. Kalau kedua bilangannya sama, itu kembar. Pilih kembar atau bukan, lalu cari hasilnya. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b2-kembar"
      jumlahRonde={RONDE_KEMBAR.length}
      kunciAkhir={8}
      belumSiap="Tentukan kembar atau bukan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKembar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara (hlm. 51-64) ------------ */

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [a, setA] = useState(4);
  const [b, setB] = useState(4);
  const [lulus, setLulus] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const jumlahA = tahap === 0 ? 7 : a;
  const jumlahB = tahap === 0 ? 3 : b;
  const c = jumlahA + jumlahB;
  const id = tahap === 0 ? "b2-tulis-1" : `b2-tulis-2-${a}-${b}`;
  const suara = panel.suara[id] === true;
  useBicara(suara, `${ucapTambah(jumlahA, jumlahB, c)}.`);

  const ubah = (sisi: "a" | "b", delta: number) => {
    if (suara) return;
    const na = sisi === "a" ? a + delta : a;
    const nb = sisi === "b" ? b + delta : b;
    if (na < 1 || nb < 1) {
      setKabar({ teks: "Paling sedikit satu, ya.", ok: false });
      return;
    }
    if (na + nb > 10) {
      setKabar({ teks: "Jumlahnya paling banyak sepuluh, ya.", ok: false });
      return;
    }
    setKabar(null);
    setA(na);
    setB(nb);
  };

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() =>
          speakGuru("Ucapkan hasil penjumlahan, lalu guratkan angkanya di kanvas. Setelah itu, buat kalimat penjumlahanmu sendiri dengan cara yang kamu suka.")
        }
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
        {tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}
      </p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Ucapkan hasilnya" : "Buat kalimatmu, lalu ucapkan"}
          teks={
            tahap === 0
              ? "Tujuh ditambah tiga sama dengan berapa? Ucapkan hasilnya, lalu guratkan angkanya di kanvas."
              : "Ayo mencoba. Pilih dua bilangan sesukamu, paling banyak jumlahnya sepuluh. Boleh kembar, boleh tidak. Ucapkan hasilnya, lalu guratkan angkanya."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 ? (
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  ["a", a, "🐞"],
                  ["b", b, "🍎"],
                ] as const
              ).map(([sisi, nilai, ikon]) => (
                <div key={sisi} className="space-y-1 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-1 py-2">
                  <Kelompok ikon={ikon} n={nilai} kelas="text-xl" />
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      aria-label={`Kurangi ${sisi === "a" ? "bilangan pertama" : "bilangan kedua"}`}
                      disabled={suara}
                      onClick={() => ubah(sisi, -1)}
                      className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-white text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-3xl font-black text-[#1C01A5]">{nilai}</span>
                    <button
                      type="button"
                      aria-label={`Tambah ${sisi === "a" ? "bilangan pertama" : "bilangan kedua"}`}
                      disabled={suara}
                      onClick={() => ubah(sisi, 1)}
                      className="h-10 w-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-2xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <Persamaan a={jumlahA} b={jumlahB} c={suara ? c : "?"} />
          <KabarChip kabar={kabar} />
        </div>
        <JawabSuara id={id} jumlah={c} panel={panel} siap belumSiap="" />
        {suara ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={c} kata={kata(c)} onCompletedTrace={() => setLulus(true)} />
            <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
          </div>
        ) : null}
        {suara && tahap === 0 ? (
          <button
            type="button"
            onClick={() => {
              panel.bersih();
              setLulus(false);
              setTahap(1);
            }}
            className={TOMBOL_KECIL}
          >
            ▶ Ayo Mencoba
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Ada banyak cara menjumlahkan. Pasangan bilangan boleh ditukar tempat. Menghitung maju: mulai dari bilangan pertama, lompat sebanyak bilangan kedua. Penjumlahan berulang: bilangan yang sama ditambahkan. Pasangan sepuluh: sembilan dan satu, delapan dan dua, tujuh dan tiga, enam dan empat, lima dan lima.";

const POIN_B2: { ikon: string; nama: string; suara: string; a: number; b: number; c: Isi }[] = [
  {
    ikon: "🍎",
    nama: "Pasangan bilangan",
    suara: "Pasangan bilangan. Tiga dan dua digabung menjadi lima. Dua dan tiga juga menjadi lima.",
    a: 3,
    b: 2,
    c: 5,
  },
  {
    ikon: "🏃",
    nama: "Menghitung maju",
    suara: "Menghitung maju. Mulai dari lima, lompat tiga langkah ke depan. Sampai di delapan.",
    a: 5,
    b: 3,
    c: 8,
  },
  {
    ikon: "🐞",
    nama: "Penjumlahan berulang",
    suara: "Penjumlahan berulang. Bilangan yang sama ditambahkan. Tiga ditambah tiga sama dengan enam.",
    a: 3,
    b: 3,
    c: 6,
  },
  {
    ikon: "🔟",
    nama: "Hasilnya 10",
    suara: "Ada banyak pasangan yang hasilnya sepuluh. Tujuh ditambah tiga sama dengan sepuluh.",
    a: 7,
    b: 3,
    c: 10,
  },
  {
    ikon: "🔄",
    nama: "Tukar tempat",
    suara: "Dua bilangan boleh ditukar tempat. Dua ditambah empat sama dengan enam. Empat ditambah dua juga enam.",
    a: 2,
    b: 4,
    c: "?" as Isi,
  },
];

function PoinPentingB2({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_B2.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="igil-tanpa-tepi block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            <Persamaan a={p.a} b={p.b} c={p.c} kecil />
          </button>
        ))}
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">💡</span>
          <p className="text-sm font-black leading-snug text-[#14532D]">Semua cara hasilnya sama. Pilih caramu, lalu periksa dengan cara lain.</p>
        </div>
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB B ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "tukar" | "kembar" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "tukar" },
  { nomor: 9, tipe: "kembar" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractCaraB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_ABSTRACT.length;
  const kartu = KARTU_ABSTRACT[Math.min(indeks, KARTU_ABSTRACT.length - 1)];
  const langkahTotal = KARTU_ABSTRACT.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: indeks >= KARTU_ABSTRACT.length - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan simbol" warna="#1C01A5" />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      {poin ? (
        <PoinPentingB2
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "tukar" ? <KartuTukar {...dasar} /> : null}
          {kartu.tipe === "kembar" ? <KartuKembar {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
