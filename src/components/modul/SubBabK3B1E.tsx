"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir } from "./permainan-k2b3";
import { SusunBawah } from "./permainan-k2b2";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { RakitTiga } from "./mesin-k3b1";
import { KoleksiTiga } from "./dasar-k3b1";
import { KurangKoleksi } from "./dasar-k3b1f";
import { KurangModel } from "./diagram-k3b1f";
import {
  HURUF, PETA_KONSEP_QE, RONDE_BENARSALAH_QE, RONDE_CERITA_CE, RONDE_CERITA_QE, RONDE_DETEKTIF_QE, RONDE_HITUNG_CE, RONDE_KETUK_CE, RONDE_LANGKAH_PE, RONDE_LANGKAH_QE, RONDE_MEMORI_CE, RONDE_MEMORI_PE,
  RONDE_MEMORI_QE, RONDE_PAPAN_CE, RONDE_PAPAN_PE, RONDE_PAPAN_QE, RONDE_PASANG_CE, RONDE_PASANG_PE, RONDE_PASANG_QE, RONDE_SELISIH_PE, RONDE_SELISIH_QE, RONDE_SEMUA_CE, RONDE_SEMUA_PE,
  RONDE_SISA_CE, RONDE_SORTIR_CE, RONDE_SORTIR_PE, RONDE_SUSUN_PE, RONDE_SUSUN_QE, RONDE_TABEL_PE, RONDE_URAI_PE, RONDE_URUT_CE, TEKS_CERITA_CE, cocokAmbil, kalimatLangkahKurang, kalimatPanjangKurang,
  kunciCerita, opsiSelisih, perluMengambil, puluhanDari, satuanDari, urutTampil, urutanTetap,
  type Jml,
} from "./data-k3b1";
import { buatKartu, namaDari, Numeral, wadahDari } from "./bantu-k3b1";
import { visualInfografisK3B1E } from "./infografis-k3b1";
import { SUB_E31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 1 Sub-Bab E: Pengurangan Bilangan Cacah sampai 100. Tiga puluh   */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Rakit Sisa  2 Hitung Sisa  3 Pilah  4 Jodohkan  5 Memori          */
/*            6 Ketuk Sisa  7 Ketuk Mengambil  8 Cerita  9 Papan  10 Urutkan Sisa */
/*  Picture  11 Susun Bawah  12 Papan  13 Hitung Model  14 Jodohkan  15 Memori   */
/*           16 Tabel Hasil  17 Ketuk Mengambil  18 Pilah  19 Cara Panjang  20 Langkah */
/*  Abstract 21 Susun Bawah  22 Pilih Selisih  23 Papan  24 Langkah  25 Jodohkan  */
/*           26 Memori  27 Benar Salah  28 Detektif  29 Peta  30 Cerita           */
/* Naskah: naskah-k3b1.ts (SUB_E31). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_E31.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang pengurangan sampai seratus. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B1EKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_E31} judul="Pengurangan sampai 100" suaraInfo={SUARA_INFO} visual={visualInfografisK3B1E()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const idJ = (p: Jml) => `${p[0]}-${p[1]}`;
const sisa = (p: Jml) => p[0] - p[1];
/** Keterangan hasil pengurangan, termasuk perlu mengambil satu puluhan atau tidak. */
const ket = (a: number, b: number): string => {
  const sa = satuanDari(a);
  const sb = satuanDari(b);
  const ta = puluhanDari(a);
  const tb = puluhanDari(b);
  if (perluMengambil(a, b)) return `${a} − ${b} = ${a - b}. Satuan ${sa} kurang dari ${sb}, jadi ambil 1 puluhan: ${sa + 10} − ${sb} = ${sa + 10 - sb}. Puluhan ${ta - 1} − ${tb} = ${ta - 1 - tb}.`;
  return `${a} − ${b} = ${a - b}. Satuan ${sa} − ${sb} = ${sa - sb}. Puluhan ${ta} − ${tb} = ${ta - tb}.`;
};
const soalSisa = (a: number, b: number, visual: React.ReactNode, nomor: number, tanya = "Berapa sisanya?"): SoalBertahap => {
  const o = opsiSelisih(a - b, nomor);
  return {
    visual,
    tanya,
    opsi: o.map(String),
    jawab: o.indexOf(a - b),
    petunjuk: "Belum tepat. Kurangkan satuan lebih dulu. Bila satuan atas lebih kecil, ambil satu puluhan.",
    pesan: ket(a, b),
    angka: true,
  };
};
const TEKS_SYARAT_AMBIL = { ambil: "perlu mengambil satu puluhan (satuan atas lebih kecil dari satuan bawah)", tanpa: "tanpa mengambil (satuan atas cukup untuk dikurangi)" } as const;
const BIN_AMBIL = [
  { id: "tanpa", label: "Tanpa mengambil", warna: "#BBF7D0" },
  { id: "ambil", label: "Dengan mengambil", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuRakitSisaE(d: PropsLangkah) {
  return Kartu(d, 0, "k3b1e-rakitsisa", "Baca ada berapa benda dan berapa yang diambil. Rakit sisanya dengan tombol tambah dan kurang. Tekan Periksa.", RONDE_SISA_CE.length, "Rakit semua sisanya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit sisa benda" teks="Baca ada berapa benda dan berapa yang diambil. Rakit sisanya. Sepuluh benda ditukar satu bungkus. Lalu tekan periksa." />
      <RakitTiga
        key={r}
        soal={RONDE_SISA_CE[r].map(({ a, b, benda }) => ({
          n: a - b,
          tanya: `Ada ${a} ${namaDari(benda)}. Diambil ${b}. Rakit sisanya.`,
          nama: ["dus", wadahDari(benda), "benda lepas"] as [string, string, string],
          tampil: (x, y, z) => <KoleksiTiga r={x} p={y} s={z} benda={benda} ukuran={40} />,
          pesan: ket(a, b),
        }))}
        onBeres={beres}
        pesanBeres="Semua sisa sudah kamu rakit."
      />
    </>
  ));
}

function KartuHitungSisaE(d: PropsLangkah) {
  return Kartu(d, 1, "k3b1e-hitungsisa", "Lihat kumpulan yang diambil sebagian. Hitung sisanya, lalu pilih hasilnya.", RONDE_HITUNG_CE.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung sisa" teks="Kurangkan benda lepas dulu. Bila benda lepas tidak cukup, buka satu bungkus menjadi sepuluh benda. Lalu kurangkan bungkus." />
      <PilihBertahap key={r} soal={RONDE_HITUNG_CE[r].map((s, i) => soalSisa(s.a, s.b, <KurangKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={20} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua sisa sudah kamu hitung." />
    </>
  ));
}

function KartuPilahSoalE(d: PropsLangkah) {
  return Kartu(d, 2, "k3b1e-pilahsoal", "Seret atau ketuk tiap soal ke kotak: tanpa mengambil, atau dengan mengambil.", RONDE_SORTIR_CE.length, "Pilah semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_CE[r];
    return (
      <>
        <IgilBicara pendek="Pilah soal" teks="Bandingkan benda lepas pada tiap soal. Bila benda lepas atas lebih sedikit, soal itu dengan mengambil." />
        <Sortir
          key={r}
          lebarItem={150}
          kolomBin={2}
          item={urutanKe(ro.pasang.length, r).map((i) => {
            const [a, b] = ro.pasang[i];
            return {
              id: idJ(ro.pasang[i]),
              label: `${a} − ${b}`,
              isi: <KurangKoleksi a={a} b={b} benda={ro.benda} ukuran={11} />,
              bin: perluMengambil(a, b) ? "ambil" : "tanpa",
              petunjuk: `Belum tepat. Bandingkan satuan ${a % 10} dan ${b % 10}: apakah satuan atas cukup?`,
              ucapan: `${a} − ${b} ${perluMengambil(a, b) ? "perlu mengambil" : "tanpa mengambil"}.`,
            };
          })}
          bin={BIN_AMBIL}
          onBeres={beres}
          pesanBeres="Semua soal sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuJodohSisaE(d: PropsLangkah) {
  return Kartu(d, 3, "k3b1e-jodohsisa", "Ketuk satu pasangan kumpulan di kiri, lalu ketuk sisanya di kanan.", RONDE_PASANG_CE.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CE[r];
    const kanan = ro.pasang.map((p) => ({ id: idJ(p), label: String(sisa(p)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan pasangan dan sisa" teks="Kurangkan kumpulan yang diambil pada tiap pasangan. Jodohkan dengan sisanya." />
        <PasangKartu
          key={r}
          kiri={ro.pasang.map((p, i) => ({ id: idJ(p), label: `Pasangan ${HURUF[i]}`, isi: <KurangKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={13} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.pasang.map((p) => [idJ(p), idJ(p)]))}
          petunjuk={() => "Belum cocok. Kurangkan satuan, ambil satu puluhan bila perlu, lalu kurangkan puluhan."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan sisanya."
        />
      </>
    );
  });
}

function KartuMemoriSisaE(d: PropsLangkah) {
  return Kartu(d, 4, "k3b1e-memorisisa", "Balik dua kartu. Cari pasangan kumpulan dan sisanya.", RONDE_MEMORI_CE.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori pasangan dan sisa" teks="Balik dua kartu. Cari kartu pasangan kumpulan dan kartu sisanya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_CE[r].pasang.map((p, i) => ({ id: idJ(p), a: <KurangKoleksi a={p[0]} b={p[1]} benda={RONDE_MEMORI_CE[r].benda} ukuran={9} />, labelA: `pasangan ${HURUF[i]}`, b: <Numeral n={sisa(p)} kelas="text-3xl" />, labelB: `sisa ${sisa(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukSisaE(d: PropsLangkah) {
  return Kartu(d, 5, "k3b1e-ketuksisa", "Hitung sisa tiap pasangan. Ketuk pasangan yang sisanya sama dengan bilangan yang disebut.", RONDE_KETUK_CE.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CE[r];
    return (
      <>
        <IgilBicara pendek="Ketuk pasangan dengan sisa" teks="Kurangkan kumpulan yang diambil pada tiap pasangan. Ketuk pasangan yang sisanya sama dengan bilangan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((p, i) => ({ id: idJ(p), label: `Pasangan ${HURUF[i]}`, isi: <KurangKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={12} /> }))}
          soal={ro.tanya.map((t) => {
            const p = ro.item.find((x) => sisa(x) === t) ?? ro.item[0];
            return { tanya: `Ketuk pasangan yang sisanya ${t}.`, jawab: idJ(p), petunjuk: "Belum tepat. Kurangkan satuan dulu, lalu puluhan.", pesan: ket(p[0], p[1]) };
          })}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaAmbilE(d: PropsLangkah) {
  return Kartu(d, 6, "k3b1e-semuaambil", "Ketuk semua pasangan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CE.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CE[r];
    const tanya = `Ketuk semua soal yang ${TEKS_SYARAT_AMBIL[ro.syarat]}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.pasang.map((p, i) => {
            const cocok = cocokAmbil(p, ro.syarat);
            return { id: idJ(p), label: `Soal ${HURUF[i]}`, isi: <KurangKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={9} lebar="isi" />, benar: cocok, penjelasan: `${ket(p[0], p[1])} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua soal yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuCeritaE(d: PropsLangkah) {
  return Kartu(d, 7, "k3b1e-cerita", "Baca ceritanya, lihat kumpulan yang diambil, lalu pilih sisanya.", RONDE_CERITA_CE.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Cerita pengurangan" teks="Baca cerita dengan teliti. Kurangkan banyak benda yang diambil dari banyak benda semula, lalu pilih sisanya." />
      <PilihBertahap key={r} soal={RONDE_CERITA_CE[r].map((s, i) => soalSisa(s.a, s.b, <KurangKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={18} />, r * 2 + i, TEKS_CERITA_CE[kunciCerita(s)]))} onBeres={beres} pesanBeres="Semua cerita sudah kamu selesaikan." />
    </>
  ));
}

function KartuPapanKumpulanE(d: PropsLangkah) {
  return Kartu(d, 8, "k3b1e-papankumpulan", "Hitung sisa kumpulan. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CE.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan sisa kumpulan" teks="Kurangkan kumpulan yang diambil. Tulis puluhan dan satuan sisanya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CE[r].map((s) => ({ visual: <KurangKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={18} />, tanya: "Isi papan dengan sisanya.", jawab: s.a - s.b, petunjuk: "Kurangkan satuan lebih dulu, ambil satu puluhan bila perlu, lalu puluhan.", pesan: ket(s.a, s.b) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutSisaE(d: PropsLangkah) {
  return Kartu(d, 9, "k3b1e-urutsisa", "Hitung sisa tiap pasangan. Ketuk pasangan satu per satu dari sisa paling kecil atau paling besar.", RONDE_URUT_CE.length, "Urutkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CE[r];
    const ids = ro.pasang.map(idJ);
    const kunci = [...ro.pasang].sort((x, y) => (ro.dari === "kecil" ? sisa(x) - sisa(y) : sisa(y) - sisa(x))).map(idJ);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari sisa ${awal}`} teks="Kurangkan kumpulan yang diambil pada tiap pasangan. Lalu urutkan pasangan menurut sisanya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const p = ro.pasang[ids.indexOf(id)];
            return { id, label: `Pasangan ${HURUF[ids.indexOf(id)]}`, isi: <KurangKoleksi a={p[0]} b={p[1]} benda={ro.benda} ukuran={11} /> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung sisa tiap pasangan.`}
          onBeres={beres}
          pesanBeres={`Urutan dari sisa ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuSusunBawahE(d: PropsLangkah) {
  return Kartu(d, 10, "k3b1e-susunbawah", "Susun bilangan ke bawah. Kurangkan satuan, ambil satu puluhan bila perlu, lalu kurangkan puluhan.", RONDE_SUSUN_PE.length, "Selesaikan soal susunnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Susun kurang ke bawah" teks="Susun puluhan lurus dengan puluhan dan satuan lurus dengan satuan. Kurangkan satuan lebih dulu, lalu puluhan." />
      <SusunBawah key={r} op="−" a={RONDE_SUSUN_PE[r][0]} b={RONDE_SUSUN_PE[r][1]} onBeres={() => beres()} />
    </>
  ));
}

function KartuPapanSusunE(d: PropsLangkah) {
  return Kartu(d, 11, "k3b1e-papansusun", "Lihat soal pengurangan. Atur angka puluhan dan satuan hasilnya pada papan, lalu tekan Periksa.", RONDE_PAPAN_PE.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan hasil pengurangan" teks="Hitung hasil dua bilangan dengan cara susun. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_PE[r].map(([a, b]) => ({ visual: <KurangModel a={a} b={b} skala={0.7} />, tanya: "Isi papan dengan hasilnya.", jawab: a - b, petunjuk: "Kurangkan satuan lebih dulu, ambil satu puluhan bila perlu, lalu puluhan.", pesan: ket(a, b) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuHitungModelE(d: PropsLangkah) {
  return Kartu(d, 12, "k3b1e-hitungmodel", "Lihat dua model. Hitung sisanya, lalu pilih hasilnya.", RONDE_SELISIH_PE.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung model" teks="Kurangkan kotak satuan dan batang puluhan dari dua model. Bila kotak satuan tidak cukup, buka satu batang puluhan menjadi sepuluh kotak." />
      <PilihBertahap key={r} soal={RONDE_SELISIH_PE[r].map(([a, b], i) => soalSisa(a, b, <KurangModel a={a} b={b} skala={0.75} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua model sudah kamu kurangkan." />
    </>
  ));
}

function KartuJodohModelE(d: PropsLangkah) {
  return Kartu(d, 13, "k3b1e-jodohmodel", "Ketuk satu pasangan model di kiri, lalu ketuk sisanya di kanan.", RONDE_PASANG_PE.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PE[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(sisa(p)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan model dan sisa" teks="Kurangkan dua model pada tiap pasangan. Jodohkan dengan sisanya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: idJ(p), label: `Pasangan ${HURUF[i]}`, isi: <KurangModel a={p[0]} b={p[1]} skala={0.55} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))}
          petunjuk={() => "Belum cocok. Kurangkan satuan, ambil satu puluhan bila perlu, lalu puluhan."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan sisanya."
        />
      </>
    );
  });
}

function KartuMemoriModelE(d: PropsLangkah) {
  return Kartu(d, 14, "k3b1e-memorimodel", "Balik dua kartu. Cari pasangan model dan sisanya.", RONDE_MEMORI_PE.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori model dan sisa" teks="Balik dua kartu. Cari kartu pasangan model dan kartu sisanya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PE[r].map((p, i) => ({ id: idJ(p), a: <KurangModel a={p[0]} b={p[1]} skala={0.4} />, labelA: `pasangan ${HURUF[i]}`, b: <Numeral n={sisa(p)} kelas="text-3xl" />, labelB: `sisa ${sisa(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelHasilE(d: PropsLangkah) {
  return Kartu(d, 15, "k3b1e-tabelhasil", "Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PE.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PE[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel hasil" teks="Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Hitung lagi ${b.label}: satuan dulu, lalu puluhan.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaAmbilModelE(d: PropsLangkah) {
  return Kartu(d, 16, "k3b1e-semuaambilmodel", "Ketuk semua soal yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PE.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PE[r];
    const tanya = `Ketuk semua soal yang ${TEKS_SYARAT_AMBIL[ro.syarat]}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.pasang.map((p, i) => {
            const cocok = cocokAmbil(p, ro.syarat);
            return { id: idJ(p), label: `${HURUF[i]}: ${p[0]} − ${p[1]}`, isi: <KurangModel a={p[0]} b={p[1]} skala={0.4} lebar="isi" />, benar: cocok, penjelasan: `${ket(p[0], p[1])} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua soal yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahSusunE(d: PropsLangkah) {
  return Kartu(d, 17, "k3b1e-pilahsusun", "Seret atau ketuk tiap soal ke kotak: tanpa mengambil, atau dengan mengambil.", RONDE_SORTIR_PE.length, "Pilah semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah soal susun" teks="Bandingkan satuan pada tiap soal. Bila satuan atas lebih kecil, soal itu dengan mengambil." />
      <Sortir
        key={r}
        lebarItem={150}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PE[r].length, r).map((i) => {
          const [a, b] = RONDE_SORTIR_PE[r][i];
          return {
            id: idJ(RONDE_SORTIR_PE[r][i]),
            label: `${a} − ${b}`,
            isi: <KurangModel a={a} b={b} skala={0.45} />,
            bin: perluMengambil(a, b) ? "ambil" : "tanpa",
            petunjuk: `Belum tepat. Bandingkan satuan ${a % 10} dan ${b % 10}: apakah satuan atas cukup?`,
            ucapan: `${a} − ${b} ${perluMengambil(a, b) ? "perlu mengambil" : "tanpa mengambil"}.`,
          };
        })}
        bin={BIN_AMBIL}
        onBeres={beres}
        pesanBeres="Semua soal sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuCaraPanjangE(d: PropsLangkah) {
  return Kartu(d, 18, "k3b1e-carapanjang", "Lihat soal. Lengkapi tiap kalimat cara panjang dengan angka yang tepat.", RONDE_URAI_PE.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const [a, b] = RONDE_URAI_PE[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi cara panjang" teks="Uraikan bilangan menjadi puluhan dan satuan. Lalu pilih angka yang tepat untuk bagian kosong." />
        <KurangModel a={a} b={b} skala={0.75} />
        <IsiKalimatGame key={r} kalimat={kalimatPanjangKurang(a, b, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuLangkahE(d: PropsLangkah) {
  return Kartu(d, 19, "k3b1e-langkah", "Ketuk langkah satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PE.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_LANGKAH_PE[r];
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

function KartuSusunBawahQE(d: PropsLangkah) {
  return Kartu(d, 20, "k3b1e-susunbawahlambang", "Susun bilangan ke bawah. Kurangkan satuan, ambil satu puluhan bila perlu, lalu kurangkan puluhan.", RONDE_SUSUN_QE.length, "Selesaikan soal susunnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kurang ke bawah" teks="Susun bilangan sesuai nilai tempat. Kurangkan satuan lebih dulu, lalu puluhan." />
      <SusunBawah key={r} op="−" a={RONDE_SUSUN_QE[r][0]} b={RONDE_SUSUN_QE[r][1]} onBeres={() => beres()} />
    </>
  ));
}

const Soal = ({ a, b }: { a: number; b: number }) => (
  <p className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF7CC] px-4 py-2 text-4xl font-black text-[#1C01A5]">
    <span>{a}</span>
    <span>−</span>
    <span>{b}</span>
    <span>=</span>
    <span>?</span>
  </p>
);

function KartuPilihSelisihE(d: PropsLangkah) {
  return Kartu(d, 21, "k3b1e-pilihselisih", "Hitung pengurangannya. Pilih hasil yang benar dari tiga pilihan.", RONDE_SELISIH_QE.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Pilih selisihnya" teks="Hitung dengan cara yang menurutmu mudah. Pilih hasil yang benar. Hati-hati bila harus mengambil satu puluhan." />
      <PilihBertahap key={r} soal={RONDE_SELISIH_QE[r].map(([a, b], i) => soalSisa(a, b, <Soal a={a} b={b} />, r * 2 + i, `${a} − ${b} = ?`))} onBeres={beres} pesanBeres="Semua selisih sudah kamu pilih." />
    </>
  ));
}

function KartuPapanQE(d: PropsLangkah) {
  return Kartu(d, 22, "k3b1e-papanselisih", "Hitung pengurangannya. Atur angka puluhan dan satuan hasilnya pada papan, lalu tekan Periksa.", RONDE_PAPAN_QE.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Papan selisih" teks="Hitung hasil pengurangan. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_QE[r].map(([a, b]) => ({ visual: <Soal a={a} b={b} />, tanya: "Isi papan dengan hasilnya.", jawab: a - b, petunjuk: "Kurangkan satuan lebih dulu, ambil satu puluhan bila perlu, lalu puluhan.", pesan: ket(a, b) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuLangkahQE(d: PropsLangkah) {
  return Kartu(d, 23, "k3b1e-langkahkalimat", "Lengkapi langkah mengurangkan satuan, puluhan, dan hasil akhirnya.", RONDE_LANGKAH_QE.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const [a, b] = RONDE_LANGKAH_QE[r];
    return (
      <>
        <CatatanPensil pendek="Satuan, puluhan, selisih" teks="Kurangkan satuan lebih dulu. Bila satuan atas lebih kecil, ambil satu puluhan. Lalu kurangkan puluhan." />
        <Soal a={a} b={b} />
        <IsiKalimatGame key={r} kalimat={kalimatLangkahKurang(a, b, r * 3)} onBeres={beres} pesanBeres="Semua langkah sudah lengkap." />
      </>
    );
  });
}

function KartuJodohSoalE(d: PropsLangkah) {
  return Kartu(d, 24, "k3b1e-jodohsoal", "Ketuk satu soal di kiri, lalu ketuk sisanya di kanan.", RONDE_PASANG_QE.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QE[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(sisa(p)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan soal dan sisa" teks="Hitung tiap soal pengurangan. Jodohkan dengan hasilnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p) => ({ id: idJ(p), label: `${p[0]} − ${p[1]}`, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))}
          petunjuk={() => "Belum cocok. Kurangkan satuan, ambil satu puluhan bila perlu, lalu puluhan."}
          onBeres={beres}
          pesanBeres="Semua soal sudah cocok dengan hasilnya."
        />
      </>
    );
  });
}

function KartuMemoriSoalE(d: PropsLangkah) {
  return Kartu(d, 25, "k3b1e-memorisoal", "Balik dua kartu. Cari soal dan hasilnya.", RONDE_MEMORI_QE.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori soal dan sisa" teks="Balik dua kartu. Cari kartu soal pengurangan dan kartu hasilnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_QE[r].map((p, i) => ({ id: idJ(p), a: <Numeral n={`${p[0]}−${p[1]}`} kelas="text-xl" />, labelA: `soal ${HURUF[i]}`, b: <Numeral n={sisa(p)} kelas="text-3xl" />, labelB: `hasil ${sisa(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahE(d: PropsLangkah) {
  return Kartu(d, 26, "k3b1e-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QE.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang pengurangan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QE[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifE(d: PropsLangkah) {
  return Kartu(d, 27, "k3b1e-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QE.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QE[r];
    return (
      <>
        <CatatanPensil pendek="Detektif pengurangan" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`} />
      </>
    );
  });
}

function KartuPetaE(d: PropsLangkah) {
  return Kartu(d, 28, "k3b1e-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QE.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QE[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaQE(d: PropsLangkah) {
  return Kartu(d, 29, "k3b1e-ceritaangka", "Baca soal cerita. Tulis kalimat pengurangannya dalam hati, lalu pilih hasilnya.", RONDE_CERITA_QE.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QE[r].map((c, i) => {
      const o = opsiSelisih(c.a - c.b, r * 2 + i);
      return {
        visual: <p className="rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-xl font-black text-[#1C01A5]">{c.a} − {c.b} = ?</p>,
        tanya: c.teks,
        opsi: o.map(String),
        jawab: o.indexOf(c.a - c.b),
        petunjuk: "Belum tepat. Kurangkan satuan dulu. Ambil satu puluhan bila perlu.",
        pesan: ket(c.a, c.b),
        angka: true,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita pengurangan" teks="Baca soal cerita dengan teliti. Tulis kalimat pengurangannya, hitung, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuRakitSisaE, KartuHitungSisaE, KartuPilahSoalE, KartuJodohSisaE, KartuMemoriSisaE, KartuKetukSisaE, KartuSemuaAmbilE, KartuCeritaE, KartuPapanKumpulanE, KartuUrutSisaE].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuSusunBawahE, KartuPapanSusunE, KartuHitungModelE, KartuJodohModelE, KartuMemoriModelE, KartuTabelHasilE, KartuSemuaAmbilModelE, KartuPilahSusunE, KartuCaraPanjangE, KartuLangkahE].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSusunBawahQE, KartuPilihSelisihE, KartuPapanQE, KartuLangkahQE, KartuJodohSoalE, KartuMemoriSoalE, KartuBenarSalahE, KartuDetektifE, KartuPetaE, KartuCeritaQE].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B1E(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Ambil benda dan hitung sisanya!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B1E(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat model dan susun", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B1E(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Bilangan dan hasil", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_E31} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB E ➡️" />}
    />
  );
}
