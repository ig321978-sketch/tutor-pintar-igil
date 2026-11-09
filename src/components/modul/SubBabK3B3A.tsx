"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { GeserUkur, type SoalGeser } from "./mesin-k3b3";
import { PenggarisBenda } from "./dasar-k3b3";
import { PenggarisBatang, PenggarisDuaBatang } from "./diagram-k3b3";
import {
  HURUF, NAMA_ALAT, NAMA_BENDA, PETA_KONSEP_QA, RONDE_ALAT_CA, RONDE_ALAT_QA, RONDE_BACA_CA, RONDE_BACA_PA, RONDE_BENARSALAH_QA, RONDE_CERITA_QA, RONDE_DETEKTIF_QA, RONDE_GESER_CA, RONDE_GESER_PA, RONDE_JODOH_CA,
  RONDE_JODOH_PA, RONDE_JODOH_QA, RONDE_KALIMAT_QA, RONDE_KETUK_CA, RONDE_LANGKAH_PA, RONDE_MEMORI_CA, RONDE_MEMORI_PA, RONDE_MEMORI_QA, RONDE_PAPAN_CA, RONDE_PAPAN_PA, RONDE_PILAH_PA, RONDE_SATUAN_QA,
  RONDE_SELISIH_PA, RONDE_SEMUA_CA, RONDE_SEMUA_PA, RONDE_SUSUNKATA_QA, RONDE_UJUNG_CA, RONDE_UJUNG_PA, RONDE_URUT_CA, alatUntuk, cocokBanding, idBenda, labelUkur, opsiAngka, susunOpsi, urutTampil, urutanTetap,
  type SoalBenda,
} from "./data-k3b3";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B3A } from "./infografis-k3b3";
import { SUB_A33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 3 Sub-Bab A: Pengukuran Panjang dengan Satuan Baku. Tiga puluh   */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Geser ke Nol  2 Baca  3 Ujung  4 Pilih Alat  5 Jodohkan          */
/*            6 Memori  7 Ketuk Panjang  8 Ketuk Alat  9 Papan  10 Urutkan       */
/*  Picture  11 Geser Batang  12 Baca Batang  13 Ujung Batang  14 Jodohkan       */
/*           15 Memori  16 Pilah Alat  17 Ketuk Lebih Kurang  18 Langkah         */
/*           19 Papan  20 Selisih                                                */
/*  Abstract 21 Satuan  22 Alat  23 Kalimat  24 Jodohkan  25 Memori  26 Benar    */
/*           Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata               */
/* Naskah: naskah-k3b3.ts (SUB_A33). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_A33.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang pengukuran panjang dengan satuan baku. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B3AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A33} judul="Pengukuran Panjang dengan Satuan Baku" suaraInfo={SUARA_INFO} visual={visualInfografisK3B3A()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);
const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const nama = (s: SoalBenda) => NAMA_BENDA[s.jenis];

const PETUNJUK_BACA = "Belum tepat. Lihat angka di ujung benda yang lain. Benda dimulai dari angka 0.";
const ketPanjang = (cm: number, benda: string) => `Ujung ${benda} berhenti di angka ${cm}, jadi panjangnya ${cm} cm.`;
const soalPanjang = (cm: number, visual: React.ReactNode, nomor: number, tanya: string, benda: string): SoalBertahap => {
  const o = opsiAngka(cm, nomor);
  return { visual, tanya, opsi: o.map((n) => `${n} cm`), jawab: o.indexOf(cm), petunjuk: PETUNJUK_BACA, pesan: ketPanjang(cm, benda) };
};

/** Lebar tetap untuk gambar penggaris di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[340px]">{children}</div>;

const BIN_ALAT = [
  { id: "penggaris", label: "Penggaris", warna: "#BBF7D0" },
  { id: "meteran", label: "Meteran", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuGeserBendaA(d: PropsLangkah) {
  return Kartu(d, 0, "k3b3a-geserbenda", "Geser benda sampai ujung kirinya tepat di angka 0 pada penggaris. Lalu pilih panjang benda.", RONDE_GESER_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Geser ke angka nol" teks="Letakkan ujung kiri benda tepat di angka nol pada penggaris. Geser bendanya, lalu baca angka di ujung yang lain." />
      <GeserUkur
        key={r}
        soal={RONDE_GESER_CA[r].map(
          (s): SoalGeser => ({
            cm: s.cm,
            awal: s.awal,
            maks: 15,
            tanya: `Geser ${NAMA_BENDA[s.jenis]} sampai ujung kirinya tepat di angka 0.`,
            gambar: (o) => <PenggarisBenda jenis={s.jenis} panjang={s.cm} offset={o} />,
            pesan: `Ujung kiri ${NAMA_BENDA[s.jenis]} di angka 0 dan ujung kanannya di angka ${s.cm}, jadi panjangnya ${s.cm} cm.`,
          }),
        )}
        onBeres={beres}
        pesanBeres="Semua benda sudah kamu ukur dengan tepat."
      />
    </>
  ));
}

function KartuBacaBendaA(d: PropsLangkah) {
  return Kartu(d, 1, "k3b3a-bacabenda", "Ujung kiri benda sudah di angka 0. Baca angka di ujung yang lain, lalu pilih panjangnya.", RONDE_BACA_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca panjang benda" teks="Ujung kiri benda sudah di angka nol. Baca angka di ujung benda yang lain. Itulah panjang benda." />
      <PilihBertahap
        key={r}
        soal={RONDE_BACA_CA[r].map((s, i) =>
          soalPanjang(
            s.cm,
            <Penuh>
              <PenggarisBenda jenis={s.jenis} panjang={s.cm} />
            </Penuh>,
            r * 2 + i,
            `Berapa panjang ${nama(s)}?`,
            nama(s),
          ),
        )}
        onBeres={beres}
        pesanBeres="Semua panjang sudah kamu baca."
      />
    </>
  ));
}

function KartuUjungBendaA(d: PropsLangkah) {
  return Kartu(d, 2, "k3b3a-ujungbenda", "Lihat benda pada penggaris. Ketuk angka di garis bilangan tempat ujung kanan benda berhenti.", RONDE_UJUNG_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ketuk ujung benda" teks="Lihat ujung kanan benda pada penggaris. Ketuk angka di garis bilangan yang sama dengan ujung itu." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_UJUNG_CA[r].map((s) => ({
          tanya: `Ketuk angka di ujung kanan ${nama(s)}.`,
          dari: 0,
          sampai: 10,
          jawab: s.cm,
          visual: (
            <Penuh>
              <PenggarisBenda jenis={s.jenis} panjang={s.cm} maks={10} />
            </Penuh>
          ),
          petunjuk: "Belum tepat. Lihat ujung kanan benda, lalu cari angka yang sama pada garis bilangan.",
          pesan: ketPanjang(s.cm, nama(s)),
        }))}
        onBeres={beres}
        pesanBeres="Semua ujung benda sudah kamu temukan."
      />
    </>
  ));
}

function KartuPilihAlatA(d: PropsLangkah) {
  return Kartu(d, 3, "k3b3a-pilihalat", "Lihat benda sehari-hari. Pilih alat ukur yang paling tepat untuk mengukur panjangnya.", RONDE_ALAT_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pilih alat ukur" teks="Benda pendek diukur dengan penggaris. Benda yang lebih panjang dari penggaris diukur dengan meteran. Pilih alat yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_ALAT_CA[r].map((b, i): SoalBertahap => {
          const benar = NAMA_ALAT[b.alat];
          const lain = ["Penggaris", "Meteran", "Timbangan"].filter((x) => x !== benar) as [string, string];
          const o = susunOpsi(benar, lain, r * 2 + i);
          return {
            visual: (
              <span className="flex justify-center text-7xl" role="img" aria-label={b.nama}>
                {b.emoji}
              </span>
            ),
            tanya: `Alat ukur apa yang tepat untuk mengukur panjang ${b.nama}?`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Benda pendek memakai penggaris, benda yang lebih panjang dari penggaris memakai meteran. Timbangan untuk berat, bukan panjang.",
            pesan: `${kapital(b.nama)} ${b.alat === "penggaris" ? "pendek, jadi memakai penggaris" : "lebih panjang dari penggaris, jadi memakai meteran"}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua alat ukur sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJodohBendaA(d: PropsLangkah) {
  return Kartu(d, 4, "k3b3a-jodohbenda", "Ketuk satu benda di kiri, lalu ketuk panjangnya di kanan.", RONDE_JODOH_CA.length, "Jodohkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CA[r];
    const kanan = ro.map((s) => ({ id: `c${s.cm}`, label: `${s.cm} cm`, isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan panjang" teks="Baca panjang tiap benda dari penggaris. Jodohkan dengan panjang yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((s, i) => ({ id: idBenda(s), label: `Benda ${HURUF[i]}`, isi: <PenggarisBenda jenis={s.jenis} panjang={s.cm} maks={10} ringkas /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((s) => [idBenda(s), `c${s.cm}`]))}
          petunjuk={() => "Belum cocok. Ujung benda harus tepat di angka 0, lalu baca angka di ujung yang lain."}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan panjangnya."
        />
      </>
    );
  });
}

function KartuMemoriBendaA(d: PropsLangkah) {
  return Kartu(d, 5, "k3b3a-memoribenda", "Balik dua kartu. Cari benda pada penggaris dan panjangnya.", RONDE_MEMORI_CA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori benda dan panjang" teks="Balik dua kartu. Cari kartu benda pada penggaris dan kartu panjangnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CA[r].map((s) => ({
          id: idBenda(s),
          a: <PenggarisBenda jenis={s.jenis} panjang={s.cm} maks={10} ringkas />,
          labelA: nama(s),
          b: <Numeral n={`${s.cm} cm`} kelas="text-3xl" />,
          labelB: `${s.cm} cm`,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukPanjangA(d: PropsLangkah) {
  return Kartu(d, 6, "k3b3a-ketukpanjang", "Baca panjang tiap benda. Ketuk benda yang panjangnya sama dengan bilangan yang disebut.", RONDE_KETUK_CA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (
      <>
        <IgilBicara pendek="Ketuk benda dengan panjang" teks="Baca panjang tiap benda dari penggaris. Ketuk benda yang panjangnya sama dengan bilangan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((s, i) => ({ id: idBenda(s), label: `Benda ${HURUF[i]}`, isi: <PenggarisBenda jenis={s.jenis} panjang={s.cm} maks={10} ringkas /> }))}
          soal={ro.tanya.map((t) => {
            const s = ro.item.find((x) => x.cm === t) ?? ro.item[0];
            return { tanya: `Ketuk benda yang panjangnya ${t} cm.`, jawab: idBenda(s), petunjuk: PETUNJUK_BACA, pesan: ketPanjang(s.cm, nama(s)) };
          })}
          onBeres={beres}
          pesanBeres="Semua benda sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaAlatA(d: PropsLangkah) {
  return Kartu(d, 7, "k3b3a-semuaalat", "Ketuk semua benda yang cocok dengan alat ukur yang disebut. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    const tanya = `Ketuk semua benda yang tepat diukur dengan ${ro.alat}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang tepat" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((b) => {
            const cocok = b.alat === ro.alat;
            return {
              id: b.nama,
              label: b.nama,
              isi: (
                <span className="flex w-12 shrink-0 justify-center text-4xl" aria-hidden="true">
                  {b.emoji}
                </span>
              ),
              benar: cocok,
              penjelasan: `${kapital(b.nama)} ${b.alat === "penggaris" ? "pendek, jadi diukur dengan penggaris" : "lebih panjang dari penggaris, jadi diukur dengan meteran"}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua benda yang tepat sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPapanBendaA(d: PropsLangkah) {
  return Kartu(d, 8, "k3b3a-papanbenda", "Baca panjang benda dari penggaris. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan panjang benda" teks="Baca panjang benda dari penggaris. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CA[r].map((s) => ({
          visual: (
            <Penuh>
              <PenggarisBenda jenis={s.jenis} panjang={s.cm} />
            </Penuh>
          ),
          tanya: `Isi papan dengan panjang ${nama(s)} dalam sentimeter.`,
          jawab: s.cm,
          petunjuk: PETUNJUK_BACA,
          pesan: ketPanjang(s.cm, nama(s)),
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutBendaA(d: PropsLangkah) {
  return Kartu(d, 9, "k3b3a-urutbenda", "Bandingkan panjang tiga benda. Ketuk benda satu per satu dari yang paling pendek atau paling panjang.", RONDE_URUT_CA.length, "Urutkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const ids = ro.item.map(idBenda);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? x.cm - y.cm : y.cm - x.cm)).map(idBenda);
    const awal = ro.dari === "kecil" ? "terpendek" : "terpanjang";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal}`} teks="Bandingkan panjang tiap benda pada penggaris. Lalu urutkan benda menurut panjangnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const s = ro.item[ids.indexOf(id)];
            return {
              id,
              label: `Benda ${HURUF[ids.indexOf(id)]}`,
              isi: (
                <Lebar w={150}>
                  <PenggarisBenda jenis={s.jenis} panjang={s.cm} ringkas />
                </Lebar>
              ),
            };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terpanjang" : "terpendek"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Bandingkan ujung benda pada penggaris.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuGeserBatangA(d: PropsLangkah) {
  return Kartu(d, 10, "k3b3a-geserbatang", "Geser batang sampai ujung kirinya tepat di angka 0 pada penggaris. Lalu pilih panjang batang.", RONDE_GESER_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Geser batang ke angka nol" teks="Letakkan ujung kiri batang tepat di angka nol pada penggaris. Geser batangnya, lalu baca angka di ujung yang lain." />
      <GeserUkur
        key={r}
        soal={RONDE_GESER_PA[r].map(
          (s): SoalGeser => ({
            cm: s.cm,
            awal: s.awal,
            maks: 15,
            tanya: "Geser batang sampai ujung kirinya tepat di angka 0.",
            gambar: (o) => <PenggarisBatang panjang={s.cm} offset={o} />,
            pesan: `Ujung kiri batang di angka 0 dan ujung kanannya di angka ${s.cm}, jadi panjangnya ${s.cm} cm.`,
          }),
        )}
        onBeres={beres}
        pesanBeres="Semua batang sudah kamu ukur dengan tepat."
      />
    </>
  ));
}

function KartuBacaBatangA(d: PropsLangkah) {
  return Kartu(d, 11, "k3b3a-bacabatang", "Ujung kiri batang sudah di angka 0. Baca angka di ujung yang lain, lalu pilih panjangnya.", RONDE_BACA_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca panjang batang" teks="Ujung kiri batang sudah di angka nol. Baca angka di ujung batang yang lain. Itulah panjang batang." />
      <PilihBertahap
        key={r}
        soal={RONDE_BACA_PA[r].map((cm, i) =>
          soalPanjang(
            cm,
            <Penuh>
              <PenggarisBatang panjang={cm} />
            </Penuh>,
            r * 2 + i,
            "Berapa panjang batang?",
            "batang",
          ),
        )}
        onBeres={beres}
        pesanBeres="Semua panjang sudah kamu baca."
      />
    </>
  ));
}

function KartuUjungBatangA(d: PropsLangkah) {
  return Kartu(d, 12, "k3b3a-ujungbatang", "Lihat batang pada penggaris. Ketuk angka di garis bilangan tempat ujung kanan batang berhenti.", RONDE_UJUNG_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Ketuk ujung batang" teks="Lihat ujung kanan batang pada penggaris. Ketuk angka di garis bilangan yang sama dengan ujung itu." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_UJUNG_PA[r].map((cm) => ({
          tanya: "Ketuk angka di ujung kanan batang.",
          dari: 0,
          sampai: 10,
          jawab: cm,
          visual: (
            <Penuh>
              <PenggarisBatang panjang={cm} maks={10} />
            </Penuh>
          ),
          petunjuk: "Belum tepat. Lihat ujung kanan batang, lalu cari angka yang sama pada garis bilangan.",
          pesan: ketPanjang(cm, "batang"),
        }))}
        onBeres={beres}
        pesanBeres="Semua ujung batang sudah kamu temukan."
      />
    </>
  ));
}

function KartuJodohBatangA(d: PropsLangkah) {
  return Kartu(d, 13, "k3b3a-jodohbatang", "Ketuk satu batang di kiri, lalu ketuk panjangnya di kanan.", RONDE_JODOH_PA.length, "Jodohkan semua batangnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PA[r];
    const kanan = ro.map((cm) => ({ id: `c${cm}`, label: `${cm} cm`, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan batang dan panjang" teks="Baca panjang tiap batang dari penggaris. Jodohkan dengan panjang yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((cm, i) => ({ id: `c${cm}`, label: `Batang ${HURUF[i]}`, isi: <PenggarisBatang panjang={cm} maks={10} ringkas /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((cm) => [`c${cm}`, `c${cm}`]))}
          petunjuk={() => "Belum cocok. Ujung batang harus tepat di angka 0, lalu baca angka di ujung yang lain."}
          onBeres={beres}
          pesanBeres="Semua batang sudah cocok dengan panjangnya."
        />
      </>
    );
  });
}

function KartuMemoriBatangA(d: PropsLangkah) {
  return Kartu(d, 14, "k3b3a-memoribatang", "Balik dua kartu. Cari batang pada penggaris dan panjangnya.", RONDE_MEMORI_PA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori batang dan panjang" teks="Balik dua kartu. Cari kartu batang pada penggaris dan kartu panjangnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PA[r].map((cm, i) => ({ id: `c${cm}`, a: <PenggarisBatang panjang={cm} maks={10} ringkas />, labelA: `batang ${HURUF[i]}`, b: <Numeral n={`${cm} cm`} kelas="text-3xl" />, labelB: `${cm} cm` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuPilahAlatA(d: PropsLangkah) {
  return Kartu(d, 15, "k3b3a-pilahalat", "Seret atau ketuk tiap ukuran ke kotak: cocok diukur dengan penggaris, atau dengan meteran.", RONDE_PILAH_PA.length, "Pilah semua ukurannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah ukuran" teks="Penggaris dipakai untuk benda sampai tiga puluh sentimeter. Benda yang lebih panjang diukur dengan meteran. Pilah tiap ukuran ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={84}
        kolomBin={2}
        item={urutanKe(RONDE_PILAH_PA[r].length, r).map((i) => {
          const cm = RONDE_PILAH_PA[r][i];
          const alat = alatUntuk(cm);
          return {
            id: `c${cm}`,
            label: labelUkur(cm),
            bin: alat,
            petunjuk: `Belum tepat. Penggaris dipakai untuk benda sampai 30 cm. ${labelUkur(cm)} ${cm <= 30 ? "tidak lebih dari 30 cm" : "lebih dari 30 cm"}.`,
            ucapan: `${labelUkur(cm)} ${cm <= 30 ? "tidak lebih dari tiga puluh sentimeter, jadi memakai penggaris" : "lebih dari tiga puluh sentimeter, jadi memakai meteran"}.`,
          };
        })}
        bin={BIN_ALAT}
        onBeres={beres}
        pesanBeres="Semua ukuran sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuSemuaBatangA(d: PropsLangkah) {
  return Kartu(d, 16, "k3b3a-semuabatang", "Ketuk semua batang yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    const tanya = `Ketuk semua batang yang panjangnya ${ro.arah} dari ${ro.acuan} cm.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((cm, i) => {
            const cocok = cocokBanding(cm, ro.acuan, ro.arah);
            return {
              id: `c${cm}`,
              label: `Batang ${HURUF[i]}`,
              isi: (
                <Lebar w={180}>
                  <PenggarisBatang panjang={cm} ringkas />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `Batang ${HURUF[i]} panjangnya ${cm} cm. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua batang yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuLangkahUkurA(d: PropsLangkah) {
  return Kartu(d, 17, "k3b3a-langkahukur", "Ketuk langkah-langkah mengukur satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PA.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_LANGKAH_PA[r];
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
          petunjuk={() => "Belum, itu bukan langkah berikutnya. Pikirkan apa yang dilakukan lebih dulu."}
          onBeres={beres}
          pesanBeres="Urutan langkah mengukur sudah benar."
        />
      </>
    );
  });
}

function KartuPapanBatangA(d: PropsLangkah) {
  return Kartu(d, 18, "k3b3a-papanbatang", "Baca panjang batang dari penggaris. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_PA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan panjang batang" teks="Baca panjang batang dari penggaris. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_PA[r].map((cm) => ({
          visual: (
            <Penuh>
              <PenggarisBatang panjang={cm} />
            </Penuh>
          ),
          tanya: "Isi papan dengan panjang batang dalam sentimeter.",
          jawab: cm,
          petunjuk: PETUNJUK_BACA,
          pesan: ketPanjang(cm, "batang"),
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuSelisihBatangA(d: PropsLangkah) {
  return Kartu(d, 19, "k3b3a-selisihbatang", "Dua batang sama-sama mulai dari angka 0. Hitung selisih panjang keduanya, lalu pilih jawabannya.", RONDE_SELISIH_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Selisih dua batang" teks="Dua batang sama-sama dimulai dari angka nol. Kurangkan panjang batang yang besar dengan yang kecil. Itulah selisihnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_SELISIH_PA[r].map(([a, b], i): SoalBertahap => {
          const d2 = a - b;
          const o = opsiAngka(d2, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <PenggarisDuaBatang a={a} b={b} />
              </Penuh>
            ),
            tanya: "Berapa sentimeter selisih panjang kedua batang?",
            opsi: o.map((n) => `${n} cm`),
            jawab: o.indexOf(d2),
            petunjuk: "Belum tepat. Baca panjang tiap batang, lalu kurangkan yang besar dengan yang kecil.",
            pesan: `${a} − ${b} = ${d2}, jadi selisihnya ${d2} cm.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuSatuanBakuA(d: PropsLangkah) {
  return Kartu(d, 20, "k3b3a-satuanbaku", "Baca benda yang diukur. Pilih satuan baku yang paling tepat.", RONDE_SATUAN_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Pilih satuan baku" teks="Benda yang pendek diukur dengan sentimeter. Benda yang panjang diukur dengan meter. Pilih satuan baku yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_SATUAN_QA[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Benda yang pendek memakai sentimeter, benda yang panjang memakai meter.", pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua satuan sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuAlatTeksA(d: PropsLangkah) {
  return Kartu(d, 21, "k3b3a-alatteks", "Baca benda yang diukur. Pilih alat ukur yang paling tepat.", RONDE_ALAT_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Pilih alat ukur" teks="Benda pendek diukur dengan penggaris. Benda yang lebih panjang dari penggaris diukur dengan meteran. Pilih alat yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_ALAT_QA[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Benda pendek memakai penggaris, benda yang lebih panjang memakai meteran.", pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua alat ukur sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuKalimatUkurA(d: PropsLangkah) {
  return Kartu(d, 22, "k3b3a-kalimatukur", "Lengkapi tiap kalimat tentang pengukuran panjang dengan kata yang tepat.", RONDE_KALIMAT_QA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat pengukuran" teks="Baca tiap kalimat tentang pengukuran panjang. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QA[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuJodohAlatA(d: PropsLangkah) {
  return Kartu(d, 23, "k3b3a-jodohalat", "Ketuk satu benda di kiri, lalu ketuk alat ukurnya di kanan.", RONDE_JODOH_QA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QA[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan benda dan alat ukur" teks="Pikirkan benda pendek atau panjang. Jodohkan benda dengan alat ukur yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => "Belum cocok. Benda pendek memakai penggaris, benda panjang memakai meteran gulung, tinggi badan memakai pengukur tinggi badan."}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan alat ukurnya."
        />
      </>
    );
  });
}

function KartuMemoriUkuranA(d: PropsLangkah) {
  return Kartu(d, 24, "k3b3a-memoriukuran", "Balik dua kartu. Cari benda dan ukuran panjangnya yang wajar.", RONDE_MEMORI_QA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori benda dan ukuran" teks="Balik dua kartu. Cari kartu benda dan kartu ukuran panjangnya yang wajar." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QA[r].map((p, i) => ({
          id: `m${i}`,
          a: <span className="px-1 text-base font-black leading-tight text-[#1C01A5]">{p.a}</span>,
          labelA: p.a,
          b: <Numeral n={p.b} kelas="text-3xl" />,
          labelB: p.b,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahA(d: PropsLangkah) {
  return Kartu(d, 25, "k3b3a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang pengukuran panjang dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifA(d: PropsLangkah) {
  return Kartu(d, 26, "k3b3a-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (
      <>
        <CatatanPensil pendek="Detektif pengukuran" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaA(d: PropsLangkah) {
  return Kartu(d, 27, "k3b3a-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QA.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QA[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaUkurA(d: PropsLangkah) {
  return Kartu(d, 28, "k3b3a-ceritaukur", "Baca soal cerita. Hitung panjangnya dalam sentimeter, lalu pilih jawabannya.", RONDE_CERITA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QA[r].map((c, i) => {
      const o = opsiAngka(c.jawab, r * 2 + i);
      return {
        tanya: c.teks,
        opsi: o.map((n) => `${n} cm`),
        jawab: o.indexOf(c.jawab),
        petunjuk: "Belum tepat. Baca ceritanya lagi. Apakah panjangnya digabung, atau dicari selisihnya?",
        pesan: c.pesan,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita pengukuran" teks="Baca soal cerita dengan teliti. Tentukan apakah panjangnya digabung atau dicari selisihnya, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataA(d: PropsLangkah) {
  return Kartu(d, 29, "k3b3a-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata pengukuran" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QA[r].kata} pengecoh={RONDE_SUSUNKATA_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuGeserBendaA, KartuBacaBendaA, KartuUjungBendaA, KartuPilihAlatA, KartuJodohBendaA, KartuMemoriBendaA, KartuKetukPanjangA, KartuSemuaAlatA, KartuPapanBendaA, KartuUrutBendaA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuGeserBatangA, KartuBacaBatangA, KartuUjungBatangA, KartuJodohBatangA, KartuMemoriBatangA, KartuPilahAlatA, KartuSemuaBatangA, KartuLangkahUkurA, KartuPapanBatangA, KartuSelisihBatangA].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSatuanBakuA, KartuAlatTeksA, KartuKalimatUkurA, KartuJodohAlatA, KartuMemoriUkuranA, KartuBenarSalahA, KartuDetektifA, KartuPetaA, KartuCeritaUkurA, KartuSusunKataA].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📏", nama: "CONCRETE", cara: "Ukur benda dengan penggaris!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat batang dan penggaris", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B3A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Satuan, alat, dan bilangan", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A33} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
