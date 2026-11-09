"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanTiga } from "./mesin-k3b1";
import { BandulSusun } from "./dasar-k3b3cd";
import { RakitBandul } from "./rakit-k3b3d";
import { GarisBeratDua, GarisBeratSambung, GarisBeratSvg } from "./diagram-k3b3cd";
import {
  BANDUL, HURUF, PETA_KONSEP_QD, RONDE_BENARSALAH_QD, RONDE_CERITA_QD, RONDE_DETEKTIF_QD, RONDE_G_QD, RONDE_GARIS_PD, RONDE_GKEKG_CD, RONDE_HITUNG_CD, RONDE_JODOH_CD, RONDE_JODOH_PD,
  RONDE_JODOH_QD, RONDE_KALIMAT_PD, RONDE_KETUK_CD, RONDE_KG_QD, RONDE_KGKEG_CD, RONDE_LANGKAH_PD, RONDE_MEMORI_CD, RONDE_MEMORI_PD, RONDE_MEMORI_QD, RONDE_ONS_CD, RONDE_ONS_QD, RONDE_PILAH_PD, RONDE_RAKIT_CD,
  RONDE_SAMBUNG_PD, RONDE_SELISIH_PD, RONDE_SEMUA_CD, RONDE_SEMUA_PD, RONDE_SUSUNKATA_QD, RONDE_TABEL_PD, RONDE_URUT_CD, URUT_BANDUL, gramKG, gramSusunan, idSusunan, jawabCerita, kalimatKonversiBerat,
  labelKG, opsiAngka, opsiBerat500, opsiCeritaKg, opsiGram, opsiKgG, opsiKgKeG, pasKg, susunOpsi, teksGram, teksKgG, teksSusunan, titik, urutTampil, urutanTetap, type Susunan,
} from "./data-k3b3";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B3D } from "./infografis-k3b3";
import { SUB_D33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 3 Sub-Bab D: Hubungan Antarsatuan Baku Berat. Tiga puluh          */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Rakit Bandul  2 Hitung  3 Kg ke G  4 G ke Kg  5 Jodohkan          */
/*            6 Memori  7 Ketuk Bandul  8 Ketuk Sama  9 Papan Ons  10 Urutkan     */
/*  Picture  11 Hitung Garis  12 Kalimat  13 Jodohkan  14 Memori  15 Tabel         */
/*           16 Ketuk Sama  17 Pilah  18 Langkah  19 Selisih  20 Sambung           */
/*  Abstract 21 Kg ke G  22 G ke Kg dan G  23 Ons  24 Jodohkan  25 Memori          */
/*           26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata        */
/* Naskah: naskah-k3b3.ts (SUB_D33). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_D33.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang hubungan antarsatuan baku berat. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B3DKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_D33} judul="Kilogram, Ons, dan Gram" suaraInfo={SUARA_INFO} visual={visualInfografisK3B3D()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const PETUNJUK_KG = "Belum tepat. Ingat 1 kilogram sama dengan 1.000 gram.";
const PETUNJUK_ONS = "Belum tepat. Ingat 1 ons sama dengan 100 gram, dan 1 kilogram sama dengan 10 ons.";
const PETUNJUK_BANDUL = "Belum tepat. Jumlahkan berat semua bandul: 1/2 ons 50 g, 1 ons 100 g, 2 ons 200 g, 1/2 kg 500 g, 1 kg 1.000 g.";
/** Uraian berat satu susunan bandul, mis. "1.000 g + 2 × 100 g = 1.200 g". */
const uraianSusunan = (s: Susunan): string =>
  `${URUT_BANDUL.filter((j) => (s[j] ?? 0) > 0)
    .map((j) => ((s[j] ?? 0) === 1 ? `${titik(BANDUL[j])} g` : `${s[j]} × ${titik(BANDUL[j])} g`))
    .join(" + ")} = ${teksGram(gramSusunan(s))}`;

/** Lebar tetap untuk gambar di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[340px]">{children}</div>;
const Soal = ({ teks }: { teks: string }) => <p className="rounded-2xl bg-[#FFF7CC] px-3 py-2 text-center text-2xl font-black leading-snug text-[#1C01A5]">{teks}</p>;

const BIN_KG = [
  { id: "pas", label: "Pas dalam kilogram", warna: "#BBF7D0" },
  { id: "sisa", label: "Bersisa gram", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuRakitBandulD(d: PropsLangkah) {
  return Kartu(d, 0, "k3b3d-rakitbandul", "Baca berat yang diminta. Tambah bandul sampai layar menunjukkan berat itu. Tekan Periksa.", RONDE_RAKIT_CD.length, "Rakit semua beratnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit berat dengan bandul" teks="Timbangan kodok memakai bandul. Tambah bandul sampai berat di layar sama dengan yang diminta. Lalu tekan periksa." />
      <RakitBandul
        key={r}
        soal={RONDE_RAKIT_CD[r].map((t) => ({ target: t, tanya: `Rakit bandul seberat ${teksGram(t)}.`, pesan: `Berat semua bandul ${teksGram(t)}, yaitu ${teksKgG(t)}.` }))}
        onBeres={beres}
        pesanBeres="Semua berat sudah kamu rakit dengan tepat."
      />
    </>
  ));
}

function KartuHitungBandulD(d: PropsLangkah) {
  return Kartu(d, 1, "k3b3d-hitungbandul", "Lihat bandul-bandul pada timbangan kodok. Hitung berat semuanya dalam gram, lalu pilih jawabannya.", RONDE_HITUNG_CD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung berat bandul" teks="Tiap bandul punya berat sendiri. Jumlahkan berat semua bandul dalam gram. Lalu pilih jawabannya." />
      <PilihBertahap
        key={r}
        soal={RONDE_HITUNG_CD[r].map((s, i): SoalBertahap => {
          const n = gramSusunan(s);
          const o = opsiGram(n, r * 2 + i);
          return { visual: <BandulSusun s={s} />, tanya: "Berapa gram berat semua bandul?", opsi: o.map(teksGram), jawab: o.indexOf(n), petunjuk: PETUNJUK_BANDUL, pesan: `${uraianSusunan(s)}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua berat bandul sudah kamu hitung."
      />
    </>
  ));
}

function KartuKgKeGBandulD(d: PropsLangkah) {
  return Kartu(d, 2, "k3b3d-kgkegbandul", "Lihat bandul satu kilogram. Ubah beratnya ke gram, lalu pilih jawabannya.", RONDE_KGKEG_CD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ubah kilogram ke gram" teks="Tiap bandul satu kilogram sama dengan seribu gram. Hitung banyak bandul, lalu kalikan dengan seribu." />
      <PilihBertahap
        key={r}
        soal={RONDE_KGKEG_CD[r].map((m, i): SoalBertahap => {
          const o = opsiKgKeG(m, r * 2 + i);
          return { visual: <BandulSusun s={{ k: m }} />, tanya: `${m} kg = ... g`, opsi: o.opsi, jawab: o.jawab, petunjuk: `${PETUNJUK_KG} Kalikan banyak kilogram dengan 1.000.`, pesan: `${m} kg = ${m} × 1.000 g = ${teksGram(m * 1000)}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua kilogram sudah kamu ubah menjadi gram."
      />
    </>
  ));
}

function KartuGKeKgBandulD(d: PropsLangkah) {
  return Kartu(d, 3, "k3b3d-gkekgbandul", "Lihat bandul satu kilogram. Ubah beratnya ke kilogram, lalu pilih jawabannya.", RONDE_GKEKG_CD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ubah gram ke kilogram" teks="Tiap seribu gram adalah satu kilogram. Hitung berapa bandul satu kilogram yang ada." />
      <PilihBertahap
        key={r}
        soal={RONDE_GKEKG_CD[r].map((g, i): SoalBertahap => {
          const m = g / 1000;
          const o = opsiAngka(m, r * 2 + i);
          return { visual: <BandulSusun s={{ k: m }} />, tanya: `${teksGram(g)} = ... kg`, opsi: o.map((n) => `${n} kg`), jawab: o.indexOf(m), petunjuk: `${PETUNJUK_KG} Bagi berat dalam gram dengan 1.000.`, pesan: `${teksGram(g)} : 1.000 = ${m} kg.` };
        })}
        onBeres={beres}
        pesanBeres="Semua gram sudah kamu ubah menjadi kilogram."
      />
    </>
  ));
}

function KartuJodohBandulD(d: PropsLangkah) {
  return Kartu(d, 4, "k3b3d-jodohbandul", "Ketuk satu kumpulan bandul di kiri, lalu ketuk beratnya di kanan.", RONDE_JODOH_CD.length, "Jodohkan semua bandulnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CD[r];
    const kanan = ro.map((s) => ({ id: idSusunan(s), label: teksGram(gramSusunan(s)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan bandul dan berat" teks="Jumlahkan berat tiap kumpulan bandul. Jodohkan dengan beratnya dalam gram." />
        <PasangKartu
          key={r}
          kiri={ro.map((s, i) => ({ id: idSusunan(s), label: `Bandul ${HURUF[i]}`, isi: <BandulSusun s={s} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((s) => [idSusunan(s), idSusunan(s)]))}
          petunjuk={() => PETUNJUK_BANDUL}
          onBeres={beres}
          pesanBeres="Semua bandul sudah cocok dengan beratnya."
        />
      </>
    );
  });
}

function KartuMemoriBandulD(d: PropsLangkah) {
  return Kartu(d, 5, "k3b3d-memoribandul", "Balik dua kartu. Cari kumpulan bandul dan beratnya.", RONDE_MEMORI_CD.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori bandul dan berat" teks="Balik dua kartu. Cari kartu kumpulan bandul dan kartu beratnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: idSusunan(s), a: <BandulSusun s={s} />, labelA: `bandul ${HURUF[i]}`, b: <Numeral n={teksGram(gramSusunan(s))} kelas="text-2xl" />, labelB: teksGram(gramSusunan(s)) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukBandulD(d: PropsLangkah) {
  return Kartu(d, 6, "k3b3d-ketukbandul", "Jumlahkan berat tiap kumpulan bandul. Ketuk kumpulan yang beratnya sama dengan yang disebut.", RONDE_KETUK_CD.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CD[r];
    return (
      <>
        <IgilBicara pendek="Ketuk bandul dengan berat" teks="Jumlahkan berat tiap kumpulan bandul. Ketuk kumpulan yang beratnya sama dengan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((s, i) => ({ id: idSusunan(s), label: `Bandul ${HURUF[i]}`, isi: <BandulSusun s={s} /> }))}
          soal={ro.tanya.map((t) => {
            const s = ro.item.find((x) => gramSusunan(x) === t) ?? ro.item[0];
            return { tanya: `Ketuk kumpulan bandul yang beratnya ${teksGram(t)}.`, jawab: idSusunan(s), petunjuk: PETUNJUK_BANDUL, pesan: `${uraianSusunan(s)}.` };
          })}
          onBeres={beres}
          pesanBeres="Semua kumpulan bandul sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaSamaD(d: PropsLangkah) {
  return Kartu(d, 7, "k3b3d-semuasama", "Ketuk semua kumpulan bandul yang beratnya sama dengan berat acuan. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CD.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CD[r];
    const tanya = `Ketuk semua kumpulan bandul yang beratnya sama dengan ${teksGram(ro.acuan)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang sama" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((s) => {
            const cocok = gramSusunan(s) === ro.acuan;
            return {
              id: teksSusunan(s),
              label: teksSusunan(s),
              isi: (
                <div className="min-w-0 max-w-[55%] shrink-0">
                  <BandulSusun s={s} />
                </div>
              ),
              benar: cocok,
              penjelasan: `${uraianSusunan(s)}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua kumpulan bandul yang sama sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuOnsKeGramD(d: PropsLangkah) {
  return Kartu(d, 8, "k3b3d-onskegram", "Lihat bandul satu ons. Ubah beratnya ke gram. Atur angka pada papan, lalu tekan Periksa.", RONDE_ONS_CD.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ubah ons ke gram" teks="Satu ons sama dengan seratus gram. Hitung banyak bandul satu ons, lalu tulis beratnya dalam gram pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_ONS_CD[r].map((n) => ({
          visual: <BandulSusun s={{ s: n }} />,
          tanya: `${n} ons = ... g. Isi papan dengan gramnya.`,
          jawab: n * 100,
          petunjuk: PETUNJUK_ONS,
          pesan: `${n} ons = ${n} × 100 g = ${teksGram(n * 100)}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutBandulD(d: PropsLangkah) {
  return Kartu(d, 9, "k3b3d-urutbandul", "Jumlahkan berat tiap kumpulan bandul. Ketuk kumpulan satu per satu dari yang teringan atau terberat.", RONDE_URUT_CD.length, "Urutkan semua kumpulannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CD[r];
    const ids = ro.item.map(idSusunan);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? gramSusunan(x) - gramSusunan(y) : gramSusunan(y) - gramSusunan(x))).map(idSusunan);
    const awal = ro.dari === "kecil" ? "teringan" : "terberat";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal}`} teks="Jumlahkan berat tiap kumpulan bandul. Lalu urutkan kumpulan menurut beratnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = ids.indexOf(id);
            return {
              id,
              label: `Bandul ${HURUF[i]}`,
              isi: (
                <Lebar w={170}>
                  <BandulSusun s={ro.item[i]} />
                </Lebar>
              ),
            };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terberat" : "teringan"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Jumlahkan berat tiap kumpulan bandul.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

const ketGarisBerat = (g: number) => `Batang berhenti di ${teksGram(g)}, yaitu ${teksKgG(g)}.`;

function KartuHitungGarisD(d: PropsLangkah) {
  return Kartu(d, 10, "k3b3d-hitunggaris", "Lihat batang pada garis berat. Hitung beratnya dalam gram, lalu pilih jawabannya.", RONDE_GARIS_PD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung garis berat" teks="Garis panjang menunjukkan satu kilogram, sama dengan seribu gram. Garis pendek di antaranya lima ratus gram. Hitung berat batang." />
      <PilihBertahap
        key={r}
        soal={RONDE_GARIS_PD[r].map((g, i): SoalBertahap => {
          const o = opsiBerat500(g, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <GarisBeratSvg gram={g} kg={4} />
              </Penuh>
            ),
            tanya: "Berapa gram berat batang?",
            opsi: o.map(teksGram),
            jawab: o.indexOf(g),
            petunjuk: `${PETUNJUK_KG} Garis pendek di antara dua kilogram adalah 500 g.`,
            pesan: ketGarisBerat(g),
          };
        })}
        onBeres={beres}
        pesanBeres="Semua berat batang sudah kamu hitung."
      />
    </>
  ));
}

function KartuKalimatUbahBeratD(d: PropsLangkah) {
  return Kartu(d, 11, "k3b3d-kalimatubahberat", "Lengkapi tiap kalimat tentang kilogram dan gram dengan angka yang tepat.", RONDE_KALIMAT_PD.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Lengkapi kalimat ubah berat" teks="Seribu gram sama dengan satu kilogram. Lengkapi kalimat tentang kilogram dan gram dengan angka yang tepat." />
      <IsiKalimatGame key={r} kalimat={kalimatKonversiBerat(RONDE_KALIMAT_PD[r], r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuJodohGarisD(d: PropsLangkah) {
  return Kartu(d, 12, "k3b3d-jodohgaris", "Ketuk satu garis berat di kiri, lalu ketuk beratnya di kanan.", RONDE_JODOH_PD.length, "Jodohkan semua garisnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PD[r];
    const kanan = ro.map((g) => ({ id: `g${g}`, label: teksKgG(g), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan garis dan berat" teks="Baca berat tiap batang pada garis berat. Jodohkan dengan beratnya dalam kilogram dan gram." />
        <PasangKartu
          key={r}
          kiri={ro.map((g, i) => ({ id: `g${g}`, label: `Garis ${HURUF[i]}`, isi: <GarisBeratSvg gram={g} kg={4} ringkas /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((g) => [`g${g}`, `g${g}`]))}
          petunjuk={() => "Belum cocok. Garis bertanda angka kilogram adalah 1.000 g, 2.000 g, dan seterusnya. Garis pendek di antaranya 500 g."}
          onBeres={beres}
          pesanBeres="Semua garis sudah cocok dengan beratnya."
        />
      </>
    );
  });
}

function KartuMemoriGarisD(d: PropsLangkah) {
  return Kartu(d, 13, "k3b3d-memorigaris", "Balik dua kartu. Cari garis berat dan beratnya.", RONDE_MEMORI_PD.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori garis dan berat" teks="Balik dua kartu. Cari kartu garis berat dan kartu beratnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PD[r].map((g, i) => ({ id: `g${g}`, a: <GarisBeratSvg gram={g} kg={4} ringkas />, labelA: `garis ${HURUF[i]}`, b: <Numeral n={teksKgG(g)} kelas="text-2xl" />, labelB: teksKgG(g) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelBeratD(d: PropsLangkah) {
  return Kartu(d, 14, "k3b3d-tabelberat", "Ketuk baris tabel, lalu ketuk kartu berat yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PD.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PD[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel ubah berat" teks="Ketuk baris tabel, lalu ketuk kartu berat yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Ingat 1 kg = 1.000 g dan 1 ons = 100 g. Hitung lagi ${b.label}.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaGarisD(d: PropsLangkah) {
  return Kartu(d, 15, "k3b3d-semuagaris", "Ketuk semua garis yang beratnya sama dengan berat acuan. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PD.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PD[r];
    const tanya = `Ketuk semua garis yang beratnya sama dengan ${teksGram(ro.acuan)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang sama" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((u) => {
            const cocok = gramKG(u) === ro.acuan;
            return {
              id: labelKG(u),
              label: labelKG(u),
              isi: (
                <Lebar w={180}>
                  <GarisBeratSvg gram={gramKG(u)} kg={5} ringkas />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `${labelKG(u)} = ${teksGram(gramKG(u))}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua garis yang sama sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahKgD(d: PropsLangkah) {
  return Kartu(d, 16, "k3b3d-pilahkg", "Seret atau ketuk tiap berat ke kotak: pas dalam kilogram, atau bersisa gram.", RONDE_PILAH_PD.length, "Pilah semua beratnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah berat" teks="Bila berat dalam gram dapat dibagi seribu tanpa sisa, beratnya pas dalam kilogram. Bila ada sisa, beratnya bersisa gram. Pilah tiap berat." />
      <Sortir
        key={r}
        lebarItem={96}
        kolomBin={2}
        item={urutanKe(RONDE_PILAH_PD[r].length, r).map((i) => {
          const g = RONDE_PILAH_PD[r][i];
          return {
            id: `g${g}`,
            label: teksGram(g),
            bin: pasKg(g) ? "pas" : "sisa",
            petunjuk: `Belum tepat. Bagi ${teksGram(g)} dengan 1.000. ${pasKg(g) ? "Tidak ada sisa." : "Masih ada sisa."}`,
            ucapan: `${teksGram(g)} sama dengan ${teksKgG(g)}, ${pasKg(g) ? "pas dalam kilogram" : "bersisa gram"}.`,
          };
        })}
        bin={BIN_KG}
        onBeres={beres}
        pesanBeres="Semua berat sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuLangkahUbahBeratD(d: PropsLangkah) {
  return Kartu(d, 17, "k3b3d-langkahubahberat", "Ketuk langkah-langkah mengubah satuan berat satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PD.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_LANGKAH_PD[r];
    const ids = ro.langkah.map((_, i) => `l${i}`);
    return (
      <>
        <CatatanTempel pendek="Urutkan langkah" teks={`${ro.judul}. Ketuk langkah satu per satu menurut urutan yang benar.`} />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-sm font-black text-[#1C01A5]">{ro.judul}</p>
        <UrutKetuk
          key={r}
          item={urutTampil(ids, ids, r).map((id) => ({ id, label: ro.langkah[ids.indexOf(id)] }))}
          urutan={ids}
          labelAwal="pertama"
          labelAkhir="terakhir"
          petunjuk={() => "Belum, itu bukan langkah berikutnya. Mulailah dengan menulis ukurannya, lalu ingat hubungan kilogram, ons, dan gram."}
          onBeres={beres}
          pesanBeres="Urutan langkah sudah benar."
        />
      </>
    );
  });
}

function KartuSelisihGarisD(d: PropsLangkah) {
  return Kartu(d, 18, "k3b3d-selisihgaris", "Dua batang berhimpit dari angka 0. Hitung selisih beratnya, lalu pilih jawabannya.", RONDE_SELISIH_PD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Selisih dua garis berat" teks="Dua batang sama-sama dimulai dari angka nol. Kurangkan berat batang yang besar dengan yang kecil. Itulah selisihnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_SELISIH_PD[r].map(([a, b], i): SoalBertahap => {
          const dd = a - b;
          const o = opsiBerat500(dd, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <GarisBeratDua a={a} b={b} kg={4} />
              </Penuh>
            ),
            tanya: "Berapa selisih berat kedua batang?",
            opsi: o.map(teksKgG),
            jawab: o.indexOf(dd),
            petunjuk: "Belum tepat. Baca berat tiap batang, lalu kurangkan yang besar dengan yang kecil.",
            pesan: `${teksGram(a)} − ${teksGram(b)} = ${teksGram(dd)}, yaitu ${teksKgG(dd)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu hitung."
      />
    </>
  ));
}

function KartuSambungGarisD(d: PropsLangkah) {
  return Kartu(d, 19, "k3b3d-sambunggaris", "Dua batang disambung pada garis berat. Hitung berat gabungannya, lalu pilih jawabannya.", RONDE_SAMBUNG_PD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Sambung dua garis berat" teks="Batang merah lalu batang biru disambung pada garis berat. Hitung berat tiap batang, lalu jumlahkan." />
      <PilihBertahap
        key={r}
        soal={RONDE_SAMBUNG_PD[r].map(([a, b], i): SoalBertahap => {
          const s = a + b;
          const o = opsiBerat500(s, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <GarisBeratSambung a={a} b={b} kg={4} />
              </Penuh>
            ),
            tanya: "Berapa berat gabungan kedua batang?",
            opsi: o.map(teksKgG),
            jawab: o.indexOf(s),
            petunjuk: "Belum tepat. Baca berat batang merah dan batang biru dari garis, lalu jumlahkan.",
            pesan: `${teksGram(a)} + ${teksGram(b)} = ${teksGram(s)}, yaitu ${teksKgG(s)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua berat gabungan sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuKgKeGQD(d: PropsLangkah) {
  return Kartu(d, 20, "k3b3d-kgkegq", "Ubah kilogram ke gram. Pilih hasil yang benar dari tiga pilihan.", RONDE_KG_QD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Ubah kilogram ke gram" teks="Satu kilogram sama dengan seribu gram. Kalikan banyak kilogram dengan seribu. Pilih hasil yang benar." />
      <PilihBertahap
        key={r}
        soal={RONDE_KG_QD[r].map((m, i): SoalBertahap => {
          const o = opsiKgKeG(m, r * 2 + i);
          return { visual: <Soal teks={`${m} kg = ... g`} />, tanya: `${m} kg = ... g`, opsi: o.opsi, jawab: o.jawab, petunjuk: `${PETUNJUK_KG} Kalikan banyak kilogram dengan 1.000.`, pesan: `${m} kg = ${m} × 1.000 g = ${teksGram(m * 1000)}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua kilogram sudah kamu ubah menjadi gram."
      />
    </>
  ));
}

function KartuGKeKgGQD(d: PropsLangkah) {
  return Kartu(d, 21, "k3b3d-gkekggq", "Ubah gram menjadi kilogram dan gram. Pilih hasil yang benar.", RONDE_G_QD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Ubah gram ke kilogram dan gram" teks="Ambil tiap seribu gram sebagai satu kilogram. Sisanya tetap gram. Pilih hasil yang benar." />
      <PilihBertahap
        key={r}
        soal={RONDE_G_QD[r].map((g, i): SoalBertahap => {
          const o = opsiKgG(g, r * 2 + i);
          const k = Math.floor(g / 1000);
          return {
            visual: <Soal teks={`${teksGram(g)} = ... kg ... g`} />,
            tanya: `${teksGram(g)} = ... kg ... g`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Ambil tiap 1.000 gram sebagai 1 kilogram, sisanya tetap gram.",
            pesan: `${teksGram(g)} = ${teksGram(k * 1000)} + ${g % 1000} g = ${teksKgG(g)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua berat sudah kamu ubah."
      />
    </>
  ));
}

function KartuOnsQD(d: PropsLangkah) {
  return Kartu(d, 22, "k3b3d-onsq", "Ubah antara kilogram, ons, dan gram. Pilih hasil yang benar.", RONDE_ONS_QD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Ubah kilogram, ons, dan gram" teks="Satu kilogram sama dengan sepuluh ons. Satu ons sama dengan seratus gram. Pilih hasil yang benar." />
      <PilihBertahap
        key={r}
        soal={RONDE_ONS_QD[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { visual: <Soal teks={s.tanya} />, tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: PETUNJUK_ONS, pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua satuan sudah kamu ubah dengan tepat."
      />
    </>
  ));
}

function KartuJodohBeratQD(d: PropsLangkah) {
  return Kartu(d, 23, "k3b3d-jodohberat", "Ketuk satu berat di kiri, lalu ketuk berat yang sama di kanan.", RONDE_JODOH_QD.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QD[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan berat" teks="Satu kilogram sama dengan seribu gram dan sepuluh ons. Jodohkan berat dengan berat yang sama." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => "Belum cocok. Ubah kedua berat ke gram, lalu bandingkan."}
          onBeres={beres}
          pesanBeres="Semua berat sudah cocok dengan pasangannya."
        />
      </>
    );
  });
}

function KartuMemoriBeratQD(d: PropsLangkah) {
  return Kartu(d, 24, "k3b3d-memoriberat", "Balik dua kartu. Cari dua berat yang sama.", RONDE_MEMORI_QD.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori berat" teks="Balik dua kartu. Cari dua cara menulis berat yang sama." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QD[r].map((p, i) => ({ id: `m${i}`, a: <Numeral n={p.a} kelas="text-2xl" />, labelA: p.a, b: <Numeral n={p.b} kelas="text-2xl" />, labelB: p.b }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahD(d: PropsLangkah) {
  return Kartu(d, 25, "k3b3d-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QD.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang kilogram, ons, dan gram dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QD[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifD(d: PropsLangkah) {
  return Kartu(d, 26, "k3b3d-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QD.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QD[r];
    return (
      <>
        <CatatanPensil pendek="Detektif satuan berat" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(titik), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaD(d: PropsLangkah) {
  return Kartu(d, 27, "k3b3d-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QD.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QD[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaBeratD(d: PropsLangkah) {
  return Kartu(d, 28, "k3b3d-ceritaberat", "Baca soal cerita. Hitung beratnya, lalu pilih jawabannya dalam kilogram dan gram.", RONDE_CERITA_QD.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QD[r].map((c, i) => {
      const o = opsiCeritaKg(c, r * 2 + i);
      const j = jawabCerita(c);
      const pesan =
        c.jenis === "+"
          ? `${teksKgG(c.a)} + ${teksKgG(c.b)}: jumlahkan kilogram dengan kilogram dan gram dengan gram. Hasilnya ${teksKgG(j)}.`
          : c.jenis === "−"
            ? `${teksKgG(c.a)} − ${teksKgG(c.b)} = ${teksKgG(j)}. Ubah dulu semuanya ke gram bila perlu.`
            : `${teksGram(c.a)} = 1.000 g + ${c.a - 1000} g = ${teksKgG(j)}.`;
      return {
        tanya: c.teks,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: c.jenis === "u" ? "Belum tepat. Ambil tiap 1.000 gram sebagai 1 kilogram, sisanya tetap gram." : "Belum tepat. Ubah ke satuan yang sama, hitung, lalu tulis hasilnya dengan kilogram dan gram.",
        pesan,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita satuan berat" teks="Baca soal cerita dengan teliti. Tentukan apakah beratnya dijumlahkan, dikurangkan, atau diubah satuannya, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataD(d: PropsLangkah) {
  return Kartu(d, 29, "k3b3d-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QD.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata satuan berat" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QD[r].kata} pengecoh={RONDE_SUSUNKATA_QD[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuRakitBandulD, KartuHitungBandulD, KartuKgKeGBandulD, KartuGKeKgBandulD, KartuJodohBandulD, KartuMemoriBandulD, KartuKetukBandulD, KartuSemuaSamaD, KartuOnsKeGramD, KartuUrutBandulD].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuHitungGarisD, KartuKalimatUbahBeratD, KartuJodohGarisD, KartuMemoriGarisD, KartuTabelBeratD, KartuSemuaGarisD, KartuPilahKgD, KartuLangkahUbahBeratD, KartuSelisihGarisD, KartuSambungGarisD].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuKgKeGQD, KartuGKeKgGQD, KartuOnsQD, KartuJodohBeratQD, KartuMemoriBeratQD, KartuBenarSalahD, KartuDetektifD, KartuPetaD, KartuCeritaBeratD, KartuSusunKataD].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B3D(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🏋️", nama: "CONCRETE", cara: "Timbang dengan bandul!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B3D(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat garis berat", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B3D(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kilogram, ons, gram, dan bilangan", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_D33} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB D ➡️" />}
    />
  );
}
