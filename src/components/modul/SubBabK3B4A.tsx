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
import { PenggarisBenda } from "./dasar-k3b3";
import { BangunSvg, JenisGarisSvg, RuasPenggaris } from "./diagram-k3b4";
import {
  BENDA_SISI, GARIS_BENDA, HURUF, NAMA_GARIS, kapital, PETA_KONSEP_QA, RONDE_BACA_CA, RONDE_BENARSALAH_QA, RONDE_CERITA_QA, RONDE_DETEKTIF_QA, RONDE_HITUNG_CA, RONDE_JENIS_PA, RONDE_JODOH_CA, RONDE_JODOH_PA,
  RONDE_JODOH_QA, RONDE_JUMLAH_CA, RONDE_KALIMAT_QA, RONDE_KETUK_CA, RONDE_LANGKAH_PA, RONDE_MEMORI_CA, RONDE_MEMORI_PA, RONDE_MEMORI_QA, RONDE_MIRIP_CA, RONDE_NAMA_QA, RONDE_PAPAN_CA, RONDE_PAPAN_PA,
  RONDE_PENGGARIS_PA, RONDE_PILAH_PA, RONDE_SEMUA_CA, RONDE_SEMUA_PA, RONDE_SISI_PA, RONDE_SUSUNKATA_QA, RONDE_TABEL_PA, RONDE_UBAH_QA, RONDE_URUT_CA, idMm, labelSisi, lurus, namaGaris, opsiAngka, opsiCerita, opsiJenis,
  opsiPenggaris, opsiSisi, sisiDari, susunOpsi, tanyaSisi, teksDesimalCm, teksMm, urutTampil, urutanTetap,
} from "./data-k3b4";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B4A } from "./infografis-k3b4";
import { SUB_A34 } from "./naskah-k3b4";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 4 Sub-Bab A: Sisi pada Bangun Datar. Tiga puluh permainan,       */
/* sepuluh per tahap.                                                           */
/*  Concrete  1 Hitung Sisi  2 Mirip  3 Baca mm  4 Jodohkan  5 Memori  6 Ketuk    */
/*            7 Ketuk Semua  8 Papan mm  9 Urutkan  10 Jumlah Sisi                */
/*  Picture  11 Jenis Garis  12 Penggaris  13 Jodohkan  14 Memori  15 Tabel       */
/*           16 Ketuk Bangun  17 Pilah Garis  18 Langkah  19 Papan  20 Nama Sisi  */
/*  Abstract 21 Nama  22 Kalimat  23 Ubah  24 Jodohkan  25 Memori  26 Benar Salah  */
/*           27 Detektif  28 Peta  29 Cerita  30 Susun Kata                       */
/* Naskah: naskah-k3b4.ts (SUB_A34). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_A34.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang sisi pada bangun datar. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B4AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A34} judul="Sisi pada Bangun Datar" suaraInfo={SUARA_INFO} visual={visualInfografisK3B4A()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const PETUNJUK_SISI = "Belum tepat. Hitung ruas garis lurus yang menjadi batas bangun itu satu per satu.";
const PETUNJUK_MM = "Belum tepat. Baca angka sentimeter di ujung ruas garis, lalu hitung garis kecilnya. Lima milimeter sama dengan setengah sentimeter.";
const PETUNJUK_UBAH = "Belum tepat. Ingat 1 cm sama dengan 10 mm, dan 5 mm sama dengan 0,5 cm.";

/** Lebar tetap untuk gambar di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[340px]">{children}</div>;
const Emoji = ({ e, kelas = "text-4xl" }: { e: string; kelas?: string }) => (
  <span className={`flex shrink-0 justify-center leading-none ${kelas}`} aria-hidden="true">
    {e}
  </span>
);

const BIN_LURUS = [
  { id: "lurus", label: "Garis lurus", warna: "#BBF7D0" },
  { id: "lengkung", label: "Garis lengkung", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuHitungSisiA(d: PropsLangkah) {
  return Kartu(d, 0, "k3b4a-hitungsisi", "Lihat benda sehari-hari. Hitung banyak sisinya, yaitu ruas garis lurus yang menjadi batasnya.", RONDE_HITUNG_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung sisi benda" teks="Sisi adalah ruas garis lurus yang menjadi batas bangun. Hitung sisinya satu per satu, lalu pilih jawabannya." />
      <PilihBertahap
        key={r}
        soal={RONDE_HITUNG_CA[r].map((id, i): SoalBertahap => {
          const b = BENDA_SISI[id];
          const o = opsiAngka(b.sisi, r * 2 + i);
          return { visual: <Emoji e={b.emoji} kelas="text-7xl" />, tanya: `Berapa sisi pada ${b.nama}?`, opsi: o.map(String), jawab: o.indexOf(b.sisi), petunjuk: PETUNJUK_SISI, pesan: `${kapital(b.nama)} memiliki ${b.sisi} sisi.` };
        })}
        onBeres={beres}
        pesanBeres="Semua sisi sudah kamu hitung."
      />
    </>
  ));
}

function KartuMiripA(d: PropsLangkah) {
  return Kartu(d, 1, "k3b4a-mirip", "Lihat benda di sekitar. Pilih garis yang mirip dengan benda itu.", RONDE_MIRIP_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Bendanya mirip apa" teks="Sinar senter mirip sinar garis. Rel mirip garis. Pensil mirip ruas garis. Pelangi mirip kurva. Pilih garis yang mirip." />
      <PilihBertahap
        key={r}
        soal={RONDE_MIRIP_CA[r].map((id, i): SoalBertahap => {
          const b = GARIS_BENDA[id];
          const o = opsiJenis(b.jenis, r * 2 + i);
          return {
            visual: <Emoji e={b.emoji} kelas="text-7xl" />,
            tanya: `${kapital(b.nama)} mirip dengan ...`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Sinar garis berpangkal di satu titik, garis tanpa ujung, ruas garis berujung dua, dan kurva melengkung.",
            pesan: `${kapital(b.nama)} mirip ${NAMA_GARIS[b.jenis].toLowerCase()}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua benda sudah kamu cocokkan dengan garisnya."
      />
    </>
  ));
}

function KartuBacaMmA(d: PropsLangkah) {
  return Kartu(d, 2, "k3b4a-bacamm", "Benda dimulai dari angka 0. Baca panjangnya dalam sentimeter dan milimeter, lalu pilih jawabannya.", RONDE_BACA_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca panjang dalam cm dan mm" teks="Ujung benda yang lain menunjukkan panjangnya. Garis tengah antara dua angka sama dengan lima milimeter." />
      <PilihBertahap
        key={r}
        soal={RONDE_BACA_CA[r].map((s, i): SoalBertahap => {
          const o = opsiPenggaris(s.mm, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <PenggarisBenda jenis={s.jenis} panjang={s.mm / 10} mm />
              </Penuh>
            ),
            tanya: "Berapa panjang benda?",
            opsi: o.map(teksMm),
            jawab: o.indexOf(s.mm),
            petunjuk: PETUNJUK_MM,
            pesan: `Panjangnya ${teksMm(s.mm)}, yaitu ${s.mm} mm.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua panjang sudah kamu baca."
      />
    </>
  ));
}

function KartuJodohSisiA(d: PropsLangkah) {
  return Kartu(d, 3, "k3b4a-jodohsisi", "Ketuk satu benda di kiri, lalu ketuk banyak sisinya di kanan.", RONDE_JODOH_CA.length, "Jodohkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CA[r];
    const kanan = ro.map((id) => ({ id: `s${BENDA_SISI[id].sisi}`, label: labelSisi(BENDA_SISI[id].sisi), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan banyak sisi" teks="Hitung ruas garis lurus pada tiap benda. Jodohkan benda dengan banyak sisinya." />
        <PasangKartu
          key={r}
          kiri={ro.map((id) => ({ id, label: BENDA_SISI[id].nama, isi: <Emoji e={BENDA_SISI[id].emoji} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((id) => [id, `s${BENDA_SISI[id].sisi}`]))}
          petunjuk={() => PETUNJUK_SISI}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan banyak sisinya."
        />
      </>
    );
  });
}

function KartuMemoriSisiA(d: PropsLangkah) {
  return Kartu(d, 4, "k3b4a-memorisisi", "Balik dua kartu. Cari benda dan banyak sisinya.", RONDE_MEMORI_CA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori benda dan sisi" teks="Balik dua kartu. Cari kartu benda dan kartu banyak sisinya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CA[r].map((id) => ({ id, a: <Emoji e={BENDA_SISI[id].emoji} kelas="text-5xl" />, labelA: BENDA_SISI[id].nama, b: <Numeral n={labelSisi(BENDA_SISI[id].sisi)} kelas="text-xl" />, labelB: labelSisi(BENDA_SISI[id].sisi) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukSisiA(d: PropsLangkah) {
  return Kartu(d, 5, "k3b4a-ketuksisi", "Hitung sisi tiap benda. Ketuk benda yang banyak sisinya sama dengan yang disebut.", RONDE_KETUK_CA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (
      <>
        <IgilBicara pendek="Ketuk benda dengan sisi" teks="Hitung ruas garis lurus pada tiap benda. Ketuk benda yang banyak sisinya sama dengan yang disebut." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((id) => ({ id, label: BENDA_SISI[id].nama, isi: <Emoji e={BENDA_SISI[id].emoji} kelas="text-5xl" /> }))}
          soal={ro.tanya.map((n) => {
            const b = ro.item.map((id) => BENDA_SISI[id]).find((x) => x.sisi === n) ?? BENDA_SISI[ro.item[0]];
            return { tanya: `Ketuk benda yang ${tanyaSisi(n)}.`, jawab: b.id, petunjuk: PETUNJUK_SISI, pesan: `${kapital(b.nama)} ${n === 0 ? "tidak punya sisi lurus" : `punya ${n} sisi`}.` };
          })}
          onBeres={beres}
          pesanBeres="Semua benda sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaSisiA(d: PropsLangkah) {
  return Kartu(d, 6, "k3b4a-semuasisi", "Ketuk semua benda yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    const tanya = `Ketuk semua benda yang ${tanyaSisi(ro.sisi)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((id) => {
            const b = BENDA_SISI[id];
            const cocok = b.sisi === ro.sisi;
            return { id, label: b.nama, isi: <Emoji e={b.emoji} kelas="w-12 text-4xl" />, benar: cocok, penjelasan: `${kapital(b.nama)} ${b.sisi === 0 ? "tidak punya sisi lurus" : `punya ${b.sisi} sisi`}. ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua benda yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPapanMmA(d: PropsLangkah) {
  return Kartu(d, 7, "k3b4a-papanmm", "Baca panjang benda. Ubah ke milimeter, atur angka pada papan, lalu tekan Periksa.", RONDE_PAPAN_CA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan panjang dalam milimeter" teks="Satu sentimeter sama dengan sepuluh milimeter. Baca panjang benda, ubah ke milimeter, lalu tulis pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_CA[r].map((s) => ({
          visual: (
            <Penuh>
              <PenggarisBenda jenis={s.jenis} panjang={s.mm / 10} mm />
            </Penuh>
          ),
          tanya: "Isi papan dengan panjang benda dalam milimeter.",
          jawab: s.mm,
          petunjuk: PETUNJUK_UBAH,
          pesan: `${teksMm(s.mm)} = ${s.mm} mm.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutMmA(d: PropsLangkah) {
  return Kartu(d, 8, "k3b4a-urutmm", "Baca panjang tiap benda. Ketuk benda satu per satu dari yang paling pendek atau paling panjang.", RONDE_URUT_CA.length, "Urutkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const ids = ro.item.map(idMm);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? x.mm - y.mm : y.mm - x.mm)).map(idMm);
    const awal = ro.dari === "kecil" ? "terpendek" : "terpanjang";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal}`} teks="Bandingkan panjang tiap benda pada penggaris. Lalu urutkan benda menurut panjangnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = ids.indexOf(id);
            const s = ro.item[i];
            return {
              id,
              label: `Benda ${HURUF[i]}`,
              isi: (
                <Lebar w={150}>
                  <PenggarisBenda jenis={s.jenis} panjang={s.mm / 10} ringkas />
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

function soalJumlah(ids: string[], nomor: number): SoalBertahap {
  const [a, b] = ids.map((id) => BENDA_SISI[id]);
  const n = a.sisi + b.sisi;
  const o = opsiAngka(n, nomor);
  return {
    visual: (
      <div className="flex items-center justify-center gap-2">
        <Emoji e={a.emoji} kelas="text-6xl" />
        <span className="text-3xl font-black text-[#1C01A5]">+</span>
        <Emoji e={b.emoji} kelas="text-6xl" />
      </div>
    ),
    tanya: `Berapa jumlah sisi ${a.nama} dan ${b.nama}?`,
    opsi: o.map(String),
    jawab: o.indexOf(n),
    petunjuk: PETUNJUK_SISI,
    pesan: `${a.sisi} + ${b.sisi} = ${n}, jadi jumlah sisinya ${n}.`,
  };
}

function KartuJumlahSisiA(d: PropsLangkah) {
  return Kartu(d, 9, "k3b4a-jumlahsisi", "Hitung sisi dua benda. Jumlahkan banyak sisinya, lalu pilih jawabannya.", RONDE_JUMLAH_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Jumlah sisi dua benda" teks="Hitung sisi benda pertama dan sisi benda kedua. Lalu jumlahkan." />
      <PilihBertahap
        key={r}
        soal={[soalJumlah(RONDE_JUMLAH_CA[r], r)]}
        onBeres={beres}
        pesanBeres="Jumlah sisi sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Picture ------------------------------ */

function KartuJenisGarisA(d: PropsLangkah) {
  return Kartu(d, 10, "k3b4a-jenisgaris", "Lihat gambar garis. Pilih namanya: sinar garis, garis, ruas garis, atau kurva.", RONDE_JENIS_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilih nama garis" teks="Sinar garis punya satu anak panah. Garis punya dua anak panah. Ruas garis tanpa anak panah. Kurva melengkung." />
      <PilihBertahap
        key={r}
        soal={RONDE_JENIS_PA[r].map((g, i): SoalBertahap => {
          const o = opsiJenis(g.jenis, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <JenisGarisSvg g={g} />
              </Penuh>
            ),
            tanya: `Gambar ini adalah ... ${g.a}${g.b}`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Lihat ujungnya: satu anak panah sinar garis, dua anak panah garis, tanpa anak panah ruas garis, melengkung kurva.",
            pesan: `Ini ${namaGaris(g)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua nama garis sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuPenggarisA(d: PropsLangkah) {
  return Kartu(d, 11, "k3b4a-penggaris", "Ruas garis dimulai dari angka 0. Baca panjangnya dalam sentimeter dan milimeter, lalu pilih jawabannya.", RONDE_PENGGARIS_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca ruas garis pada penggaris" teks="Letakkan angka nol di titik awal. Baca angka di titik akhir. Garis tengah antara dua angka sama dengan lima milimeter." />
      <PilihBertahap
        key={r}
        soal={RONDE_PENGGARIS_PA[r].map((mm, i): SoalBertahap => {
          const o = opsiPenggaris(mm, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <RuasPenggaris mm={mm} />
              </Penuh>
            ),
            tanya: "Berapa panjang ruas garis AB?",
            opsi: o.map(teksMm),
            jawab: o.indexOf(mm),
            petunjuk: PETUNJUK_MM,
            pesan: `AB = ${teksMm(mm)}, atau ${teksDesimalCm(mm)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua panjang ruas garis sudah kamu baca."
      />
    </>
  ));
}

function KartuJodohRuasA(d: PropsLangkah) {
  return Kartu(d, 12, "k3b4a-jodohruas", "Ketuk satu ruas garis di kiri, lalu ketuk panjangnya di kanan.", RONDE_JODOH_PA.length, "Jodohkan semua ruas garisnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PA[r];
    const kanan = ro.map((mm) => ({ id: `m${mm}`, label: teksMm(mm), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan ruas garis dan panjang" teks="Baca panjang tiap ruas garis dari penggaris. Jodohkan dengan panjang yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((mm, i) => ({ id: `m${mm}`, label: `Ruas ${HURUF[i]}`, isi: <RuasPenggaris mm={mm} ringkas /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((mm) => [`m${mm}`, `m${mm}`]))}
          petunjuk={() => PETUNJUK_MM}
          onBeres={beres}
          pesanBeres="Semua ruas garis sudah cocok dengan panjangnya."
        />
      </>
    );
  });
}

function KartuMemoriGarisA(d: PropsLangkah) {
  return Kartu(d, 13, "k3b4a-memorigaris", "Balik dua kartu. Cari gambar garis dan namanya.", RONDE_MEMORI_PA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori garis dan namanya" teks="Balik dua kartu. Cari kartu gambar garis dan kartu namanya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PA[r].map((g, i) => ({ id: `${g.jenis}${g.a}${g.b}`, a: <JenisGarisSvg g={g} ringkas />, labelA: `garis ${HURUF[i]}`, b: <Numeral n={namaGaris(g)} kelas="text-lg" />, labelB: namaGaris(g) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelSisiA(d: PropsLangkah) {
  return Kartu(d, 14, "k3b4a-tabelsisi", "Ketuk baris tabel, lalu ketuk kartu banyak sisi yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PA[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel sisi bangun datar" teks="Ketuk baris tabel, lalu ketuk kartu banyak sisi yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Belum tepat. Hitung ruas garis pembatas ${b.label.toLowerCase()}.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaBangunA(d: PropsLangkah) {
  return Kartu(d, 15, "k3b4a-semuabangun", "Ketuk semua bangun yang punya banyak sisi seperti perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    const tanya = `Ketuk semua bangun yang punya ${ro.n} sisi.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((n, i) => {
            const cocok = n === ro.n;
            return {
              id: `b${i}`,
              label: `Bangun ${HURUF[i]}`,
              isi: (
                <Lebar w={110}>
                  <BangunSvg n={n} ringkas />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `Bangun ${HURUF[i]} punya ${n} sisi. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua bangun yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahGarisA(d: PropsLangkah) {
  return Kartu(d, 16, "k3b4a-pilahgaris", "Seret atau ketuk tiap gambar garis ke kotak: garis lurus, atau garis lengkung.", RONDE_PILAH_PA.length, "Pilah semua gambarnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah garis" teks="Sinar garis, garis, dan ruas garis adalah garis lurus. Kurva adalah garis lengkung. Pilah tiap gambar ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={130}
        kolomBin={2}
        item={urutanKe(RONDE_PILAH_PA[r].length, r).map((i) => {
          const g = RONDE_PILAH_PA[r][i];
          return {
            id: `${g.jenis}${g.a}${g.b}`,
            label: namaGaris(g),
            isi: <JenisGarisSvg g={g} ringkas />,
            bin: lurus(g) ? "lurus" : "lengkung",
            petunjuk: `Belum tepat. ${kapital(namaGaris(g))} ${lurus(g) ? "adalah garis lurus" : "adalah garis lengkung"}.`,
            ucapan: `${kapital(namaGaris(g))} ${lurus(g) ? "adalah garis lurus" : "adalah garis lengkung"}.`,
          };
        })}
        bin={BIN_LURUS}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuLangkahUkurA(d: PropsLangkah) {
  return Kartu(d, 17, "k3b4a-langkahukur", "Ketuk langkah-langkah mengukur ruas garis satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PA.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
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
          petunjuk={() => "Belum, itu bukan langkah berikutnya. Mulailah dari titik awal dan angka nol."}
          onBeres={beres}
          pesanBeres="Urutan langkah sudah benar."
        />
      </>
    );
  });
}

function KartuPapanRuasA(d: PropsLangkah) {
  return Kartu(d, 18, "k3b4a-papanruas", "Baca panjang ruas garis. Ubah ke milimeter, atur angka pada papan, lalu tekan Periksa.", RONDE_PAPAN_PA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan milimeter dari penggaris" teks="Baca panjang ruas garis dari penggaris. Ubah ke milimeter, lalu tulis pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_PA[r].map((mm) => ({
          visual: (
            <Penuh>
              <RuasPenggaris mm={mm} />
            </Penuh>
          ),
          tanya: "Isi papan dengan panjang ruas garis dalam milimeter.",
          jawab: mm,
          petunjuk: PETUNJUK_UBAH,
          pesan: `${teksMm(mm)} = ${mm} mm.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuNamaSisiA(d: PropsLangkah) {
  return Kartu(d, 19, "k3b4a-namasisi", "Lihat bangun datar berhuruf. Pilih daftar sisi yang tepat.", RONDE_SISI_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Nama sisi bangun datar" teks="Sisi adalah ruas garis antara dua titik sudut yang bersebelahan. Pilih daftar sisi yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_SISI_PA[r].map((s, i): SoalBertahap => {
          const o = opsiSisi(s.huruf, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <BangunSvg n={s.huruf.length} huruf={s.huruf} />
              </Penuh>
            ),
            tanya: "Sisi apa saja pada bangun ini?",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Tiap sisi menghubungkan dua titik sudut yang bersebelahan, dan semua sisi harus disebut.",
            pesan: `Bangun ini punya ${s.huruf.length} sisi, yaitu ${sisiDari(s.huruf).join(", ")}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua daftar sisi sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuNamaTeksA(d: PropsLangkah) {
  return Kartu(d, 20, "k3b4a-namateks", "Baca uraian. Pilih nama yang tepat.", RONDE_NAMA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Nama garis dan bagian bangun datar" teks="Baca uraian dengan teliti. Pilih nama yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_NAMA_QA[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Baca lagi uraiannya: berapa sisi yang boleh diperpanjang, dan apakah ujungnya berhenti?", pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua nama sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuKalimatGarisA(d: PropsLangkah) {
  return Kartu(d, 21, "k3b4a-kalimatgaris", "Lengkapi tiap kalimat tentang garis dan sisi dengan kata yang tepat.", RONDE_KALIMAT_QA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat garis dan sisi" teks="Baca tiap kalimat tentang garis dan sisi. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QA[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuUbahA(d: PropsLangkah) {
  return Kartu(d, 22, "k3b4a-ubah", "Ubah ukuran antara sentimeter dan milimeter. Pilih hasil yang benar.", RONDE_UBAH_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Ubah sentimeter dan milimeter" teks="Satu sentimeter sama dengan sepuluh milimeter. Lima milimeter sama dengan nol koma lima sentimeter. Pilih hasil yang benar." />
      <PilihBertahap
        key={r}
        soal={RONDE_UBAH_QA[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: PETUNJUK_UBAH, pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua ukuran sudah kamu ubah dengan tepat."
      />
    </>
  ));
}

function KartuJodohUkuranA(d: PropsLangkah) {
  return Kartu(d, 23, "k3b4a-jodohukuran", "Ketuk satu ukuran di kiri, lalu ketuk ukuran yang sama di kanan.", RONDE_JODOH_QA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QA[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan ukuran panjang" teks="Satu sentimeter sama dengan sepuluh milimeter. Jodohkan ukuran dengan ukuran yang sama panjangnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => PETUNJUK_UBAH}
          onBeres={beres}
          pesanBeres="Semua ukuran sudah cocok dengan pasangannya."
        />
      </>
    );
  });
}

function KartuMemoriUkuranA(d: PropsLangkah) {
  return Kartu(d, 24, "k3b4a-memoriukuran", "Balik dua kartu. Cari dua ukuran yang sama panjangnya.", RONDE_MEMORI_QA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori ukuran panjang" teks="Balik dua kartu. Cari dua cara menulis ukuran panjang yang sama." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QA[r].map((p, i) => ({ id: `m${i}`, a: <Numeral n={p.a} kelas="text-2xl" />, labelA: p.a, b: <Numeral n={p.b} kelas="text-2xl" />, labelB: p.b }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahA(d: PropsLangkah) {
  return Kartu(d, 25, "k3b4a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang garis, ukuran, dan sisi dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifA(d: PropsLangkah) {
  return Kartu(d, 26, "k3b4a-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (
      <>
        <CatatanPensil pendek="Detektif ruas garis dan sisi" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaA(d: PropsLangkah) {
  return Kartu(d, 27, "k3b4a-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QA.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QA[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaSisiA(d: PropsLangkah) {
  return Kartu(d, 28, "k3b4a-ceritasisi", "Baca soal cerita. Hitung panjangnya, lalu pilih jawabannya.", RONDE_CERITA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QA[r].map((c, i) => {
      const o = opsiCerita(c, r * 2 + i);
      return { tanya: c.teks, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Ubah dulu semuanya ke satuan yang sama, lalu hitung. Ingat 1 cm sama dengan 10 mm.", pesan: c.pesan };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita ruas garis dan sisi" teks="Baca soal cerita dengan teliti. Ubah ukuran ke satuan yang sama bila perlu, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataGarisA(d: PropsLangkah) {
  return Kartu(d, 29, "k3b4a-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata garis dan sisi" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QA[r].kata} pengecoh={RONDE_SUSUNKATA_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuHitungSisiA, KartuMiripA, KartuBacaMmA, KartuJodohSisiA, KartuMemoriSisiA, KartuKetukSisiA, KartuSemuaSisiA, KartuPapanMmA, KartuUrutMmA, KartuJumlahSisiA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuJenisGarisA, KartuPenggarisA, KartuJodohRuasA, KartuMemoriGarisA, KartuTabelSisiA, KartuSemuaBangunA, KartuPilahGarisA, KartuLangkahUkurA, KartuPapanRuasA, KartuNamaSisiA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuNamaTeksA, KartuKalimatGarisA, KartuUbahA, KartuJodohUkuranA, KartuMemoriUkuranA, KartuBenarSalahA, KartuDetektifA, KartuPetaA, KartuCeritaSisiA, KartuSusunKataGarisA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B4A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📖", nama: "CONCRETE", cara: "Hitung sisi dan ukur benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B4A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat garis dan bangun datar", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B4A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Garis, ukuran, dan sisi", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A34} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
