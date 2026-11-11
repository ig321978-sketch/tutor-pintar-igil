"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { SusunBawah } from "./permainan-k2b2";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { RakitTiga } from "./mesin-k3b1";
import { KoleksiTiga } from "./dasar-k3b1";
import {
  HURUF, PETA_KONSEP_QD, RONDE_BENARSALAH_QD, RONDE_CERITA_CD, RONDE_CERITA_QD, RONDE_DETEKTIF_QD, RONDE_GABUNG_CD, RONDE_JUMLAH_CD, RONDE_JUMLAH_PD, RONDE_JUMLAH_QD, RONDE_KETUK_CD, RONDE_LANGKAH_PD,
  RONDE_LANGKAH_QD, RONDE_MEMORI_CD, RONDE_MEMORI_PD, RONDE_MEMORI_QD, RONDE_PAPAN_CD, RONDE_PAPAN_PD, RONDE_PAPAN_QD, RONDE_PASANG_CD, RONDE_PASANG_PD, RONDE_PASANG_QD, RONDE_SEMUA_CD, RONDE_SEMUA_PD,
  RONDE_SORTIR_CD, RONDE_SORTIR_PD, RONDE_SUSUN_PD, RONDE_SUSUN_QD, RONDE_TABEL_PD, RONDE_URAI_PD, RONDE_URUT_CD, cocokSimpan, jumlahCerita, kalimatLangkah, kalimatPanjang, opsiJumlah, perluSimpan, urutTampil, urutanTetap,
  type Jml,
} from "./data-k3b1";
import { buatKartu, Numeral, TambahKoleksi, TambahModel, wadahDari } from "./bantu-k3b1";
import { visualInfografisK3B1D } from "./infografis-k3b1";
import { SUB_D31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 1 Sub-Bab D: Penjumlahan Bilangan Cacah sampai 100. Tiga puluh   */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Gabungkan  2 Hitung  3 Pilah  4 Jodohkan  5 Memori  6 Ketuk Jumlah */
/*            7 Ketuk Simpan  8 Cerita  9 Papan  10 Urutkan Jumlah               */
/*  Picture  11 Susun Bawah  12 Papan  13 Hitung Model  14 Jodohkan  15 Memori   */
/*           16 Tabel Hasil  17 Ketuk Simpan  18 Pilah  19 Cara Panjang  20 Langkah */
/*  Abstract 21 Susun Bawah  22 Pilih Jumlah  23 Papan  24 Langkah  25 Jodohkan   */
/*           26 Memori  27 Benar Salah  28 Detektif  29 Peta  30 Cerita           */
/* Naskah: naskah-k3b1.ts (SUB_D31). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_D31.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang penjumlahan sampai seratus. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B1DKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_D31} judul="Penjumlahan sampai 100" suaraInfo={SUARA_INFO} visual={visualInfografisK3B1D()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const idJ = (p: Jml) => `${p[0]}-${p[1]}`;
const jml = (p: Jml) => p[0] + p[1];
/** Keterangan hasil jumlah, termasuk perlu menyimpan atau tidak. */
const ket = (a: number, b: number): string =>
  `${a} + ${b} = ${a + b}. ${perluSimpan(a, b) ? `Satuan ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, jadi simpan 1 puluhan.` : "Satuan dijumlahkan tanpa menyimpan."}`;
const soalJumlah = (a: number, b: number, visual: React.ReactNode, nomor: number, tanya = "Berapa jumlahnya?"): SoalBertahap => {
  const o = opsiJumlah(a + b, nomor);
  return {
    visual,
    tanya,
    opsi: o.map(String),
    jawab: o.indexOf(a + b),
    petunjuk: "Belum tepat. Jumlahkan satuan lebih dulu. Bila sepuluh atau lebih, simpan satu puluhan.",
    pesan: ket(a, b),
    angka: true,
  };
};
const TEKS_SYARAT_SIMPAN = { simpan: "perlu menyimpan (satuannya berjumlah 10 atau lebih)", tanpa: "tanpa menyimpan (satuannya berjumlah kurang dari 10)" } as const;
const BIN_SIMPAN = [
  { id: "tanpa", label: "Tanpa menyimpan", warna: "#BBF7D0" },
  { id: "simpan", label: "Dengan menyimpan", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuGabungD(d: PropsLangkah) {
  return Kartu(d, 0, "k3b1d-gabung", "Baca dua banyak yang digabung. Rakit jumlahnya dengan tombol tambah dan kurang. Tekan Periksa.", RONDE_GABUNG_CD.length, "Rakit semua jumlahnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Gabungkan kumpulan" teks="Gabungkan dua kumpulan. Sepuluh benda ditukar satu bungkus. Rakit jumlahnya, lalu tekan periksa." />
      <RakitTiga
        key={r}
        soal={RONDE_GABUNG_CD[r].map(({ a, b, benda }) => ({
          n: a + b,
          tanya: `Gabungkan ${a} dan ${b}. Rakit jumlahnya.`,
          nama: ["dus", wadahDari(benda), "benda lepas"] as [string, string, string],
          tampil: (x, y, z) => <KoleksiTiga r={x} p={y} s={z} benda={benda} ukuran={40} />,
          pesan: ket(a, b),
        }))}
        onBeres={beres}
        pesanBeres="Semua jumlah sudah kamu rakit."
      />
    </>
  ));
}

function KartuHitungGabunganD(d: PropsLangkah) {
  return Kartu(d, 1, "k3b1d-hitunggabungan", "Lihat dua kumpulan yang digabung. Hitung jumlahnya, lalu pilih hasilnya.", RONDE_JUMLAH_CD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung gabungan" teks="Jumlahkan benda lepas dulu. Bila sepuluh atau lebih, tukar menjadi satu bungkus. Lalu jumlahkan bungkus." />
      <PilihBertahap key={r} soal={RONDE_JUMLAH_CD[r].map((s, i) => soalJumlah(s.a, s.b, <TambahKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={20} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua jumlah sudah kamu hitung." />
    </>
  ));
}

function KartuPilahSoalD(d: PropsLangkah) {
  return Kartu(d, 2, "k3b1d-pilahsoal", "Seret atau ketuk tiap soal ke kotak: tanpa menyimpan, atau dengan menyimpan.", RONDE_SORTIR_CD.length, "Pilah semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_CD[r];
    return (
      <>
        <IgilBicara pendek="Pilah soal" teks="Jumlahkan benda lepas pada tiap soal. Bila sepuluh atau lebih, soal itu dengan menyimpan." />
        <Sortir
          key={r}
          lebarItem={150}
          kolomBin={2}
          item={urutanKe(ro.pasang.length, r).map((i) => {
            const [a, b] = ro.pasang[i];
            return {
              id: idJ(ro.pasang[i]),
              label: `${a} + ${b}`,
              isi: <TambahKoleksi a={a} b={b} benda={ro.benda} ukuran={11} />,
              bin: perluSimpan(a, b) ? "simpan" : "tanpa",
              petunjuk: `Belum tepat. Jumlahkan satuan ${a % 10} + ${b % 10}: apakah sepuluh atau lebih?`,
              ucapan: `${a} + ${b} ${perluSimpan(a, b) ? "perlu menyimpan" : "tanpa menyimpan"}.`,
            };
          })}
          bin={BIN_SIMPAN}
          onBeres={beres}
          pesanBeres="Semua soal sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuJodohJumlahD(d: PropsLangkah) {
  return Kartu(d, 3, "k3b1d-jodohjumlah", "Ketuk satu pasangan kumpulan di kiri, lalu ketuk jumlahnya di kanan.", RONDE_PASANG_CD.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.pasang.map((p) => ({ id: idJ(p), label: String(jml(p)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan pasangan dan jumlah" teks="Jumlahkan dua kumpulan pada tiap pasangan. Jodohkan dengan jumlahnya." />
        <PasangKartu
          key={r}
          kiri={ro.pasang.map((p, i) => ({ id: idJ(p), label: `Pasangan ${HURUF[i]}`, isi: <TambahKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={13} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.pasang.map((p) => [idJ(p), idJ(p)]))}
          petunjuk={() => "Belum cocok. Jumlahkan satuan, simpan bila perlu, lalu jumlahkan puluhan."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan jumlahnya."
        />
      </>
    );
  });
}

function KartuMemoriJumlahD(d: PropsLangkah) {
  return Kartu(d, 4, "k3b1d-memorijumlah", "Balik dua kartu. Cari pasangan kumpulan dan jumlahnya.", RONDE_MEMORI_CD.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori pasangan dan jumlah" teks="Balik dua kartu. Cari kartu pasangan kumpulan dan kartu jumlahnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_CD[r].pasang.map((p, i) => ({ id: idJ(p), a: <TambahKoleksi a={p[0]} b={p[1]} benda={RONDE_MEMORI_CD[r].benda} ukuran={9} />, labelA: `pasangan ${HURUF[i]}`, b: <Numeral n={jml(p)} kelas="text-3xl" />, labelB: `jumlah ${jml(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukJumlahD(d: PropsLangkah) {
  return Kartu(d, 5, "k3b1d-ketukjumlah", "Hitung jumlah tiap pasangan. Ketuk pasangan yang jumlahnya sama dengan bilangan yang disebut.", RONDE_KETUK_CD.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CD[r];
    return (
      <>
        <IgilBicara pendek="Ketuk pasangan dengan jumlah" teks="Jumlahkan dua kumpulan pada tiap pasangan. Ketuk pasangan yang jumlahnya sama dengan bilangan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((p, i) => ({ id: idJ(p), label: `Pasangan ${HURUF[i]}`, isi: <TambahKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={12} /> }))}
          soal={ro.tanya.map((t) => {
            const p = ro.item.find((x) => jml(x) === t) ?? ro.item[0];
            return { tanya: `Ketuk pasangan yang jumlahnya ${t}.`, jawab: idJ(p), petunjuk: "Belum tepat. Jumlahkan satuan dulu, lalu puluhan.", pesan: ket(p[0], p[1]) };
          })}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaSimpanD(d: PropsLangkah) {
  return Kartu(d, 6, "k3b1d-semuasimpan", "Ketuk semua pasangan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CD.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CD[r];
    const tanya = `Ketuk semua soal yang ${TEKS_SYARAT_SIMPAN[ro.syarat]}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.pasang.map((p, i) => {
            const cocok = cocokSimpan(p, ro.syarat);
            return { id: idJ(p), label: `${HURUF[i]}: ${p[0]} + ${p[1]}`, isi: <TambahKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={11} />, benar: cocok, penjelasan: `${ket(p[0], p[1])} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua soal yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuCeritaD(d: PropsLangkah) {
  return Kartu(d, 7, "k3b1d-cerita", "Baca ceritanya, lihat dua kumpulan, lalu pilih jumlahnya.", RONDE_CERITA_CD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Cerita penjumlahan" teks="Baca cerita dengan teliti. Gabungkan dua banyak benda, lalu pilih jumlahnya." />
      <PilihBertahap key={r} soal={RONDE_CERITA_CD[r].map((s, i) => soalJumlah(s.a, s.b, <TambahKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={18} />, r * 2 + i, s.teks))} onBeres={beres} pesanBeres="Semua cerita sudah kamu selesaikan." />
    </>
  ));
}

function KartuPapanKumpulanD(d: PropsLangkah) {
  return Kartu(d, 8, "k3b1d-papankumpulan", "Hitung jumlah dua kumpulan. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CD.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan jumlah kumpulan" teks="Jumlahkan dua kumpulan. Tulis puluhan dan satuan hasilnya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CD[r].map((s) => ({ visual: <TambahKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={18} />, tanya: "Isi papan dengan jumlahnya.", jawab: s.a + s.b, petunjuk: "Jumlahkan satuan lebih dulu, simpan bila perlu, lalu puluhan.", pesan: ket(s.a, s.b) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutJumlahD(d: PropsLangkah) {
  return Kartu(d, 9, "k3b1d-urutjumlah", "Hitung jumlah tiap pasangan. Ketuk pasangan satu per satu dari jumlah paling kecil atau paling besar.", RONDE_URUT_CD.length, "Urutkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CD[r];
    const ids = ro.pasang.map(idJ);
    const kunci = [...ro.pasang].sort((x, y) => (ro.dari === "kecil" ? jml(x) - jml(y) : jml(y) - jml(x))).map(idJ);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari jumlah ${awal}`} teks="Jumlahkan dua kumpulan pada tiap pasangan. Lalu urutkan pasangan menurut jumlahnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const p = ro.pasang[ids.indexOf(id)];
            return { id, label: `Pasangan ${HURUF[ids.indexOf(id)]}`, isi: <TambahKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={11} /> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung jumlah tiap pasangan.`}
          onBeres={beres}
          pesanBeres={`Urutan dari jumlah ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuSusunBawahD(d: PropsLangkah) {
  return Kartu(d, 10, "k3b1d-susunbawah", "Susun bilangan ke bawah. Jumlahkan satuan, simpan bila perlu, lalu jumlahkan puluhan.", RONDE_SUSUN_PD.length, "Selesaikan soal susunnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Susun ke bawah" teks="Susun puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Jumlahkan satuan lebih dulu, lalu puluhan." />
      <SusunBawah key={r} op="+" a={RONDE_SUSUN_PD[r][0]} b={RONDE_SUSUN_PD[r][1]} onBeres={() => beres()} />
    </>
  ));
}

function KartuPapanSusunD(d: PropsLangkah) {
  return Kartu(d, 11, "k3b1d-papansusun", "Lihat soal penjumlahan. Atur angka puluhan dan satuan hasilnya pada papan, lalu tekan Periksa.", RONDE_PAPAN_PD.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan hasil susun" teks="Hitung hasil dua bilangan dengan cara susun. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_PD[r].map(([a, b]) => ({ visual: <TambahModel a={a} b={b} skala={0.7} />, tanya: "Isi papan dengan hasilnya.", jawab: a + b, petunjuk: "Jumlahkan satuan lebih dulu, simpan bila perlu, lalu puluhan.", pesan: ket(a, b) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuHitungModelD(d: PropsLangkah) {
  return Kartu(d, 12, "k3b1d-hitungmodel", "Lihat dua model. Hitung jumlahnya, lalu pilih hasilnya.", RONDE_JUMLAH_PD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung model" teks="Jumlahkan batang puluhan dan kotak satuan dari dua model. Bila kotak satuan sepuluh atau lebih, ganti dengan satu batang." />
      <PilihBertahap key={r} soal={RONDE_JUMLAH_PD[r].map(([a, b], i) => soalJumlah(a, b, <TambahModel a={a} b={b} skala={0.75} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua model sudah kamu jumlahkan." />
    </>
  ));
}

function KartuJodohModelD(d: PropsLangkah) {
  return Kartu(d, 13, "k3b1d-jodohmodel", "Ketuk satu pasangan model di kiri, lalu ketuk jumlahnya di kanan.", RONDE_PASANG_PD.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PD[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(jml(p)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan model dan jumlah" teks="Jumlahkan dua model pada tiap pasangan. Jodohkan dengan jumlahnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: idJ(p), label: `Pasangan ${HURUF[i]}`, isi: <TambahModel a={p[0]} b={p[1]} skala={0.55} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))}
          petunjuk={() => "Belum cocok. Jumlahkan satuan, simpan bila perlu, lalu puluhan."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan jumlahnya."
        />
      </>
    );
  });
}

function KartuMemoriModelD(d: PropsLangkah) {
  return Kartu(d, 14, "k3b1d-memorimodel", "Balik dua kartu. Cari pasangan model dan jumlahnya.", RONDE_MEMORI_PD.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori model dan jumlah" teks="Balik dua kartu. Cari kartu pasangan model dan kartu jumlahnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PD[r].map((p, i) => ({ id: idJ(p), a: <TambahModel a={p[0]} b={p[1]} skala={0.4} />, labelA: `pasangan ${HURUF[i]}`, b: <Numeral n={jml(p)} kelas="text-3xl" />, labelB: `jumlah ${jml(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelHasilD(d: PropsLangkah) {
  return Kartu(d, 15, "k3b1d-tabelhasil", "Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PD.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PD[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel hasil" teks="Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Hitung lagi ${b.label}: satuan dulu, lalu puluhan.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaSimpanModelD(d: PropsLangkah) {
  return Kartu(d, 16, "k3b1d-semuasimpanmodel", "Ketuk semua soal yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PD.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PD[r];
    const tanya = `Ketuk semua soal yang ${TEKS_SYARAT_SIMPAN[ro.syarat]}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.pasang.map((p, i) => {
            const cocok = cocokSimpan(p, ro.syarat);
            return { id: idJ(p), label: `${HURUF[i]}: ${p[0]} + ${p[1]}`, isi: <TambahModel a={p[0]} b={p[1]} skala={0.45} />, benar: cocok, penjelasan: `${ket(p[0], p[1])} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua soal yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahSusunD(d: PropsLangkah) {
  return Kartu(d, 17, "k3b1d-pilahsusun", "Seret atau ketuk tiap soal ke kotak: tanpa menyimpan, atau dengan menyimpan.", RONDE_SORTIR_PD.length, "Pilah semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah soal susun" teks="Jumlahkan satuan pada tiap soal. Bila sepuluh atau lebih, soal itu dengan menyimpan." />
      <Sortir
        key={r}
        lebarItem={150}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PD[r].length, r).map((i) => {
          const [a, b] = RONDE_SORTIR_PD[r][i];
          return {
            id: idJ(RONDE_SORTIR_PD[r][i]),
            label: `${a} + ${b}`,
            isi: <TambahModel a={a} b={b} skala={0.45} />,
            bin: perluSimpan(a, b) ? "simpan" : "tanpa",
            petunjuk: `Belum tepat. Jumlahkan satuan ${a % 10} + ${b % 10}: apakah sepuluh atau lebih?`,
            ucapan: `${a} + ${b} ${perluSimpan(a, b) ? "perlu menyimpan" : "tanpa menyimpan"}.`,
          };
        })}
        bin={BIN_SIMPAN}
        onBeres={beres}
        pesanBeres="Semua soal sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuCaraPanjangD(d: PropsLangkah) {
  return Kartu(d, 18, "k3b1d-carapanjang", "Lihat soal. Lengkapi tiap kalimat cara panjang dengan angka yang tepat.", RONDE_URAI_PD.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const [a, b] = RONDE_URAI_PD[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi cara panjang" teks="Uraikan bilangan menjadi puluhan dan satuan. Lalu pilih angka yang tepat untuk bagian kosong." />
        <TambahModel a={a} b={b} skala={0.75} />
        <IsiKalimatGame key={r} kalimat={kalimatPanjang(a, b, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuLangkahD(d: PropsLangkah) {
  return Kartu(d, 19, "k3b1d-langkah", "Ketuk langkah satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PD.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
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
          petunjuk={() => "Belum, itu bukan langkah berikutnya. Mulai dari menyusun, lalu satuan, lalu puluhan."}
          onBeres={beres}
          pesanBeres="Urutan langkah sudah benar."
        />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuSusunBawahQD(d: PropsLangkah) {
  return Kartu(d, 20, "k3b1d-susunbawahlambang", "Susun bilangan ke bawah. Jumlahkan satuan, simpan bila perlu, lalu jumlahkan puluhan.", RONDE_SUSUN_QD.length, "Selesaikan soal susunnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun ke bawah" teks="Susun bilangan sesuai nilai tempat. Jumlahkan satuan lebih dulu, lalu puluhan." />
      <SusunBawah key={r} op="+" a={RONDE_SUSUN_QD[r][0]} b={RONDE_SUSUN_QD[r][1]} onBeres={() => beres()} />
    </>
  ));
}

const Soal = ({ a, b }: { a: number; b: number }) => (
  <p className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF7CC] px-4 py-2 text-4xl font-black text-[#1C01A5]">
    <span>{a}</span>
    <span>+</span>
    <span>{b}</span>
    <span>=</span>
    <span>?</span>
  </p>
);

function KartuPilihJumlahD(d: PropsLangkah) {
  return Kartu(d, 21, "k3b1d-pilihjumlah", "Hitung penjumlahannya. Pilih hasil yang benar dari tiga pilihan.", RONDE_JUMLAH_QD.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Pilih jumlahnya" teks="Hitung dengan cara yang menurutmu mudah. Pilih hasil yang benar. Hati-hati dengan menyimpan." />
      <PilihBertahap key={r} soal={RONDE_JUMLAH_QD[r].map(([a, b], i) => soalJumlah(a, b, <Soal a={a} b={b} />, r * 2 + i, `${a} + ${b} = ?`))} onBeres={beres} pesanBeres="Semua jumlah sudah kamu pilih." />
    </>
  ));
}

function KartuPapanQD(d: PropsLangkah) {
  return Kartu(d, 22, "k3b1d-papanjumlah", "Hitung penjumlahannya. Atur angka puluhan dan satuan hasilnya pada papan, lalu tekan Periksa.", RONDE_PAPAN_QD.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Papan jumlah" teks="Hitung hasil penjumlahan. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_QD[r].map(([a, b]) => ({ visual: <Soal a={a} b={b} />, tanya: "Isi papan dengan hasilnya.", jawab: a + b, petunjuk: "Jumlahkan satuan lebih dulu, simpan bila perlu, lalu puluhan.", pesan: ket(a, b) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuLangkahQD(d: PropsLangkah) {
  return Kartu(d, 23, "k3b1d-langkahkalimat", "Lengkapi langkah menjumlahkan satuan, puluhan, dan hasil akhirnya.", RONDE_LANGKAH_QD.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const [a, b] = RONDE_LANGKAH_QD[r];
    return (
      <>
        <CatatanPensil pendek="Satuan, puluhan, jumlah" teks="Jumlahkan satuan lebih dulu. Bila sepuluh atau lebih, simpan satu puluhan. Lalu jumlahkan puluhan." />
        <Soal a={a} b={b} />
        <IsiKalimatGame key={r} kalimat={kalimatLangkah(a, b, r * 3)} onBeres={beres} pesanBeres="Semua langkah sudah lengkap." />
      </>
    );
  });
}

function KartuJodohSoalD(d: PropsLangkah) {
  return Kartu(d, 24, "k3b1d-jodohsoal", "Ketuk satu soal di kiri, lalu ketuk hasilnya di kanan.", RONDE_PASANG_QD.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QD[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(jml(p)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan soal dan hasil" teks="Hitung tiap soal penjumlahan. Jodohkan dengan hasilnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p) => ({ id: idJ(p), label: `${p[0]} + ${p[1]}`, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))}
          petunjuk={() => "Belum cocok. Jumlahkan satuan, simpan bila perlu, lalu puluhan."}
          onBeres={beres}
          pesanBeres="Semua soal sudah cocok dengan hasilnya."
        />
      </>
    );
  });
}

function KartuMemoriSoalD(d: PropsLangkah) {
  return Kartu(d, 25, "k3b1d-memorisoal", "Balik dua kartu. Cari soal dan hasilnya.", RONDE_MEMORI_QD.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori soal dan hasil" teks="Balik dua kartu. Cari kartu soal penjumlahan dan kartu hasilnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_QD[r].map((p, i) => ({ id: idJ(p), a: <Numeral n={`${p[0]}+${p[1]}`} kelas="text-xl" />, labelA: `soal ${HURUF[i]}`, b: <Numeral n={jml(p)} kelas="text-3xl" />, labelB: `hasil ${jml(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahD(d: PropsLangkah) {
  return Kartu(d, 26, "k3b1d-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QD.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang penjumlahan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QD[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifD(d: PropsLangkah) {
  return Kartu(d, 27, "k3b1d-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QD.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QD[r];
    return (
      <>
        <CatatanPensil pendek="Detektif penjumlahan" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`} />
      </>
    );
  });
}

function KartuPetaD(d: PropsLangkah) {
  return Kartu(d, 28, "k3b1d-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QD.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QD[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaQD(d: PropsLangkah) {
  return Kartu(d, 29, "k3b1d-ceritaangka", "Baca soal cerita. Tulis kalimat penjumlahannya dalam hati, lalu pilih jumlahnya.", RONDE_CERITA_QD.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QD[r].map((c, i) => {
      const total = jumlahCerita(c);
      const o = opsiJumlah(total, r * 2 + i);
      return {
        visual: <p className="rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-xl font-black text-[#1C01A5]">{c.angka.join(" + ")} = ?</p>,
        tanya: c.teks,
        opsi: o.map(String),
        jawab: o.indexOf(total),
        petunjuk: "Belum tepat. Jumlahkan dua-dua, satuan dulu. Simpan satu puluhan bila perlu.",
        pesan: `${c.angka.join(" + ")} = ${total}.`,
        angka: true,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita penjumlahan" teks="Baca soal cerita dengan teliti. Jumlahkan semua banyaknya, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuGabungD, KartuHitungGabunganD, KartuPilahSoalD, KartuJodohJumlahD, KartuMemoriJumlahD, KartuKetukJumlahD, KartuSemuaSimpanD, KartuCeritaD, KartuPapanKumpulanD, KartuUrutJumlahD].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuSusunBawahD, KartuPapanSusunD, KartuHitungModelD, KartuJodohModelD, KartuMemoriModelD, KartuTabelHasilD, KartuSemuaSimpanModelD, KartuPilahSusunD, KartuCaraPanjangD, KartuLangkahD].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSusunBawahQD, KartuPilihJumlahD, KartuPapanQD, KartuLangkahQD, KartuJodohSoalD, KartuMemoriSoalD, KartuBenarSalahD, KartuDetektifD, KartuPetaD, KartuCeritaQD].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Gabungkan kumpulan benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat model dan susun", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B1D(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Bilangan dan hasil", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_D31} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB D ➡️" />}
    />
  );
}
