"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { DeretManik, KartuAnggotaManik, TumpukanBenda, TumpukanLidi } from "./dasar-k3b5";
import { AngkaBesar, ChipData, KartuTurus, KartuTurusHuruf, TabelHurufTurus, TabelNilaiTurus, TitikKelompokLima } from "./diagram-k3b5";
import {
  BENDA_DATA, EMOJI_MANIK, HURUF, NAMA_MANIK, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, RONDE_HURUFKATA_QB, RONDE_ISITABEL_PB,
  RONDE_JODOH_CB, RONDE_JODOH_QB, RONDE_JUMLAH_PB, RONDE_KALIMAT_QB, RONDE_KELOMPOK_CB, RONDE_KELOMPOK_PB, RONDE_KURANG_QB,
  RONDE_LEBIH_QB, RONDE_LIDI_CB, RONDE_MANIKMERAH_CB, RONDE_MEMORI_CB, RONDE_NILAIBUKU_PB, RONDE_PALINGMANIK_CB, RONDE_PAPAN_CB,
  RONDE_PILIHTURUS_PB, RONDE_BEDA_PB, RONDE_SEMUA_PB, RONDE_SORTIR_CB, RONDE_SUSUNKATA_QB, RONDE_TABEL_QB, RONDE_TABELHURUF_PB,
  RONDE_TOTALMANIK_CB, RONDE_TURUS_PB, RONDE_URUTHURUF_PB, RONDE_URUTHURUF_QB, RONDE_URUTLIDI_CB, TABEL_NILAI_BUKU, anakPaling,
  banyakHuruf, banyakManik, cocokSyarat, hitungBandingData, hitungNilaiBuku, hurufPaling, idAnak, jawabTabelQB, jumlahAnak,
  jumlahHuruf, kataPaling, kataSyarat, kelompokLima, opsiAngka, opsiHuruf, urutTampil, urutanTetap,
} from "./data-k3b5";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B5B } from "./infografis-k3b5";
import { SUB_B35 } from "./naskah-k3b5";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 5 Sub-Bab B: Menyajikan Data dalam Bentuk Tabel. 30 permainan.  */
/*  Concrete  1 Kelompok Lima  2 Lidi  3 Urut Lidi  4 Manik Merah  5 Pilah      */
/*            6 Paling Manik  7 Papan  8 Jodoh  9 Total Manik  10 Memori         */
/*  Picture  11 Turus Angka  12 Pilih Turus  13 Tabel Huruf  14 Isi Tabel       */
/*           15 Urut Huruf  16 Selisih  17 Jumlah  18 Titik  19 Semua  20 Nilai */
/*  Abstract 21 Tabel Nilai  22 Lebih  23 Kurang  24 Huruf  25 Urut  26 Kalimat */
/*           27 Jodoh  28 Benar Salah  29 Detektif  30 Susun Kata               */
/* Naskah: naskah-k3b5.ts (SUB_B35). Tanpa API.                                 */
/* ------------------------------------------------------------------------ */

const J = SUB_B35.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const SUARA_INFO =
  "Ini poster rangkuman tentang menyajikan data dalam tabel. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B5BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B35} judul="Menyajikan Data dalam Bentuk Tabel" suaraInfo={SUARA_INFO} visual={visualInfografisK3B5B()} speakGuru={speakGuru} />;
}

const PETUNJUK_HITUNG = "Belum tepat. Hitung kelompok lima, lalu tambah sisanya.";
const PETUNJUK_URUT = "Belum tepat. Bandingkan banyaknya, lalu ketuk dari yang diminta.";
const BIN_MANIK = [
  { id: "m", label: "Merah", warna: "#FECACA", ikon: EMOJI_MANIK.m },
  { id: "b", label: "Biru", warna: "#BFDBFE", ikon: EMOJI_MANIK.b },
  { id: "h", label: "Hitam", warna: "#D4D4D8", ikon: EMOJI_MANIK.h },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuKelompokCB(d: PropsLangkah) {
  return Kartu(d, 0, "k3b5b-kelompok", "Hitung benda yang dikelompokkan lima-lima, lalu pilih hasilnya.", RONDE_KELOMPOK_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung kelompok lima" teks="Hitung kelompok lima benda, lalu tambah sisanya." />
      <PilihBertahap
        key={r}
        soal={RONDE_KELOMPOK_CB[r].map((s, i): SoalBertahap => {
          const o = opsiAngka(s.n, r * 2 + i);
          const k = kelompokLima(s.n);
          return {
            visual: <TumpukanBenda benda={s.benda} n={s.n} ukuran={16} />,
            tanya: `Berapa banyak ${BENDA_DATA[s.benda].nama}?`,
            opsi: o.map(String),
            jawab: o.indexOf(s.n),
            petunjuk: PETUNJUK_HITUNG,
            pesan: `${k.penuh} kelompok lima dan ${k.sisa} sisa = ${s.n}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua benda sudah kamu hitung."
      />
    </>
  ));
}

function KartuLidiCB(d: PropsLangkah) {
  return Kartu(d, 1, "k3b5b-lidi", "Hitung banyak lidi pada gambar, lalu pilih bilangannya.", RONDE_LIDI_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung lidi" teks="Hitung lidi satu per satu atau lima-lima, lalu pilih bilangannya." />
      <PilihBertahap
        key={r}
        soal={RONDE_LIDI_CB[r].map((n, i): SoalBertahap => {
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: <TumpukanLidi n={n} ukuran={18} />,
            tanya: "Berapa banyak lidi?",
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: PETUNJUK_HITUNG,
            pesan: `Ada ${n} lidi.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua lidi sudah kamu hitung."
      />
    </>
  ));
}

function KartuUrutLidiCB(d: PropsLangkah) {
  return Kartu(d, 2, "k3b5b-urutlidi", "Ketuk tumpukan lidi dari yang paling sedikit atau paling banyak.", RONDE_URUTLIDI_CB.length, "Urutkan semua tumpukannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTLIDI_CB[r];
    const kunciNilai = [...ro.n].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a));
    const itemDasar = ro.n.map((n, i) => ({ id: `l${i}`, n, huruf: HURUF[i] }));
    const kunci = kunciNilai.map((n) => (itemDasar.find((x) => x.n === n) as { id: string }).id);
    const tampil = urutTampil(
      itemDasar,
      kunciNilai.map((n) => itemDasar.find((x) => x.n === n)!),
      r,
    );
    return (
      <>
        <IgilBicara pendek="Urutkan lidi" teks={`Ketuk tumpukan dari yang paling ${ro.dari === "kecil" ? "sedikit" : "banyak"} dulu.`} />
        <UrutKetuk
          key={r}
          item={tampil.map((x) => ({ id: x.id, label: `Lidi ${x.huruf}`, isi: <TumpukanLidi n={x.n} ukuran={14} /> }))}
          urutan={kunci}
          petunjuk={() => PETUNJUK_URUT}
          onBeres={beres}
          pesanBeres="Semua tumpukan lidi sudah diurutkan."
        />
      </>
    );
  });
}

function KartuManikMerahCB(d: PropsLangkah) {
  return Kartu(d, 3, "k3b5b-manikmerah", "Hitung banyak manik merah pada deretan, lalu pilih bilangannya.", RONDE_MANIKMERAH_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung manik merah" teks="Hitung manik berwarna merah saja. Abaikan biru dan hitam." />
      <PilihBertahap
        key={r}
        soal={RONDE_MANIKMERAH_CB[r].map((deret, i): SoalBertahap => {
          const j = banyakManik(deret, "m");
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <DeretManik deret={deret} />,
            tanya: "Berapa manik merah?",
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Hitung hanya manik merah.",
            pesan: `Ada ${j} manik merah.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua manik merah sudah kamu hitung."
      />
    </>
  ));
}

function KartuSortirCB(d: PropsLangkah) {
  return Kartu(d, 4, "k3b5b-sortir", "Pilah manik ke kotak merah, biru, atau hitam.", RONDE_SORTIR_CB.length, "Pilah semua maniknya dulu, ya.", (r, beres) => {
    const deret = RONDE_SORTIR_CB[r];
    return (
      <>
        <IgilBicara pendek="Pilah manik menurut warna" teks="Ketuk manik, lalu ketuk kotak warnanya." />
        <Sortir
          key={r}
          lebarItem={56}
          kolomBin={3}
          item={[...deret].map((c, i) => ({
            id: `m${i}-${c}`,
            label: NAMA_MANIK[c as "m" | "b" | "h"],
            isi: <span className="text-3xl">{EMOJI_MANIK[c as "m" | "b" | "h"]}</span>,
            bin: c,
            petunjuk: `Belum tepat. Ini manik ${NAMA_MANIK[c as "m" | "b" | "h"]}.`,
            ucapan: `Manik ${NAMA_MANIK[c as "m" | "b" | "h"]} masuk kotaknya.`,
          }))}
          bin={BIN_MANIK}
          onBeres={beres}
          pesanBeres="Semua manik sudah masuk kotak warnanya."
        />
      </>
    );
  });
}

function KartuPalingManikCB(d: PropsLangkah) {
  return Kartu(d, 5, "k3b5b-palingmanik", "Ketuk anggota dengan manik merah paling banyak atau paling sedikit.", RONDE_PALINGMANIK_CB.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_PALINGMANIK_CB[r];
    return (
      <>
        <IgilBicara pendek="Ketuk anggota paling banyak atau sedikit" teks="Bandingkan banyak manik merah tiap anggota. Ketuk yang cocok." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.anggota.map((a) => ({ id: idAnak(a), label: a.nama, isi: <KartuAnggotaManik anak={a} /> }))}
          soal={ro.tanya.map((t) => {
            const a = anakPaling(ro.anggota, t);
            return { tanya: `Ketuk anggota yang ${kataPaling(t)}.`, jawab: idAnak(a), petunjuk: PETUNJUK_URUT, pesan: `${a.nama} ${kataPaling(t)} dengan ${a.n} manik merah.` };
          })}
          onBeres={beres}
          pesanBeres="Semua jawaban sudah benar."
        />
      </>
    );
  });
}

function KartuPapanCB(d: PropsLangkah) {
  return Kartu(d, 6, "k3b5b-papan", "Hitung lidi. Atur angka pada papan, lalu tekan Periksa.", RONDE_PAPAN_CB.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan banyak lidi" teks="Hitung lidi pada gambar. Tulis banyaknya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CB[r].map((n) => ({
          visual: <TumpukanLidi n={n} ukuran={16} />,
          tanya: "Berapa banyak lidi?",
          jawab: n,
          petunjuk: PETUNJUK_HITUNG,
          pesan: `Ada ${n} lidi.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuJodohCB(d: PropsLangkah) {
  return Kartu(d, 7, "k3b5b-jodohlidi", "Ketuk tumpukan lidi di kiri, lalu ketuk banyaknya di kanan.", RONDE_JODOH_CB.length, "Jodohkan semua tumpukannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CB[r];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan lidi dan banyaknya" teks="Hitung lidi tiap tumpukan. Jodohkan dengan bilangannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: `l${n}`, label: `Lidi ${HURUF[i]}`, isi: <TumpukanLidi n={n} ukuran={14} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`l${n}`, `n${n}`]))}
          petunjuk={() => PETUNJUK_HITUNG}
          onBeres={beres}
          pesanBeres="Semua lidi sudah cocok dengan banyaknya."
        />
      </>
    );
  });
}

function KartuTotalManikCB(d: PropsLangkah) {
  return Kartu(d, 8, "k3b5b-totalmanik", "Jumlahkan manik merah semua anggota, lalu pilih hasilnya.", RONDE_TOTALMANIK_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Jumlah manik merah semua anggota" teks="Jumlahkan banyak manik merah semua anggota." />
      <PilihBertahap
        key={r}
        soal={RONDE_TOTALMANIK_CB[r].map((anggota, i): SoalBertahap => {
          const j = jumlahAnak(anggota);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: (
              <span className="flex flex-wrap justify-center gap-2">
                {anggota.map((a) => (
                  <KartuAnggotaManik key={idAnak(a)} anak={a} ukuran={12} />
                ))}
              </span>
            ),
            tanya: "Berapa jumlah manik merah semua anggota?",
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Jumlahkan banyak manik merah tiap anggota.",
            pesan: `Jumlahnya ${j}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jumlah sudah kamu hitung."
      />
    </>
  ));
}

function KartuMemoriCB(d: PropsLangkah) {
  return Kartu(d, 9, "k3b5b-memorilidi", "Balik dua kartu. Cari tumpukan lidi dan banyaknya.", RONDE_MEMORI_CB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori lidi dan banyaknya" teks="Balik dua kartu. Cari kartu lidi dan kartu bilangannya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CB[r].map((n) => ({
          id: `n${n}`,
          a: <TumpukanLidi n={n} ukuran={12} />,
          labelA: `${n} lidi`,
          b: <Numeral n={String(n)} kelas="text-2xl" />,
          labelB: String(n),
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

/* ------------------------------ Picture ------------------------------ */

function KartuTurusPB(d: PropsLangkah) {
  return Kartu(d, 10, "k3b5b-turusangka", "Hitung turus kelompok lima, lalu pilih bilangannya.", RONDE_TURUS_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Turus ke angka" teks="Hitung kelompok lima, lalu tambah garis sisanya." />
      <PilihBertahap
        key={r}
        soal={RONDE_TURUS_PB[r].map((n, i): SoalBertahap => {
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: <KartuTurus n={n} />,
            tanya: "Berapa banyak data pada turus ini?",
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: PETUNJUK_HITUNG,
            pesan: `Turus ini menyatakan ${n}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua turus sudah kamu baca."
      />
    </>
  ));
}

function KartuPilihTurusPB(d: PropsLangkah) {
  return Kartu(d, 11, "k3b5b-pilihturus", "Ketuk turus yang banyaknya sama dengan bilangan yang diminta.", RONDE_PILIHTURUS_PB.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_PILIHTURUS_PB[r];
    return (
      <>
        <CatatanTempel pendek="Ketuk turus yang tepat" teks="Hitung garis tiap turus. Ketuk yang banyaknya sama dengan bilangan yang disebut." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.n.map((n, i) => ({ id: `t${i}`, label: `Turus ${HURUF[i]}`, isi: <KartuTurusHuruf n={n} huruf={HURUF[i]} kecil /> }))}
          soal={ro.tanya.map((n) => {
            const idx = ro.n.indexOf(n);
            return { tanya: `Ketuk turus yang menyatakan ${n}.`, jawab: `t${idx}`, petunjuk: PETUNJUK_HITUNG, pesan: `Turus ${HURUF[idx]} menyatakan ${n}.` };
          })}
          onBeres={beres}
          pesanBeres="Semua turus sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuTabelHurufPB(d: PropsLangkah) {
  return Kartu(d, 12, "k3b5b-tabelhuruf", "Baca tabel huruf. Pilih huruf terbanyak atau tersedikit.", RONDE_TABELHURUF_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca tabel huruf" teks="Lihat turus atau banyak pada tabel. Pilih huruf terbanyak atau tersedikit." />
      <PilihBertahap
        key={r}
        soal={RONDE_TABELHURUF_PB[r].map((s, i): SoalBertahap => {
          const kunci = hurufPaling(s.kata, s.tanya)[0];
          const o = opsiHuruf(s.kata, kunci, r * 2 + i);
          const huruf = [...new Set([...s.kata.toUpperCase()].filter((c) => /[A-Z]/.test(c)))].slice(0, 5);
          return {
            visual: <TabelHurufTurus kata={s.kata} huruf={huruf} kecil />,
            tanya: `Huruf manakah yang paling ${s.tanya === "terbanyak" ? "banyak" : "sedikit"}?`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Bandingkan banyak tiap huruf pada tabel.",
            pesan: `Huruf ${kunci} paling ${s.tanya === "terbanyak" ? "banyak" : "sedikit"}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua huruf sudah kamu temukan."
      />
    </>
  ));
}

function KartuIsiTabelPB(d: PropsLangkah) {
  return Kartu(d, 13, "k3b5b-isitabel", "Isi kolom banyak pada tabel huruf dan turus.", RONDE_ISITABEL_PB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const ro = RONDE_ISITABEL_PB[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel huruf dan turus" teks={`Kata ${ro.kata}. Ketuk baris, lalu ketuk kartu banyak yang tepat. Ada satu kartu pengecoh.`} />
        <IsiTabel
          key={r}
          kepala={ro.tabel.kepala}
          baris={ro.tabel.baris}
          kartu={ro.tabel.kartu}
          petunjuk={(b) => `Belum tepat. Hitung turus pada baris ${b.label}, lalu pilih banyaknya.`}
          onBeres={beres}
          pesanBeres="Tabel sudah terisi lengkap."
        />
      </>
    );
  });
}

function KartuUrutHurufPB(d: PropsLangkah) {
  return Kartu(d, 14, "k3b5b-uruthuruf", "Ketuk huruf menurut banyaknya pada kata.", RONDE_URUTHURUF_PB.length, "Urutkan semua hurufnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTHURUF_PB[r];
    const itemDasar = ro.huruf.map((h) => ({ id: h, h, n: banyakHuruf(ro.kata, h) }));
    const kunciItem = [...itemDasar].sort((a, b) => (ro.dari === "kecil" ? a.n - b.n : b.n - a.n));
    const kunci = kunciItem.map((x) => x.id);
    const tampil = urutTampil(itemDasar, kunciItem, r);
    return (
      <>
        <CatatanTempel pendek="Urutkan huruf menurut banyaknya" teks={`Kata ${ro.kata}. Ketuk dari yang paling ${ro.dari === "kecil" ? "sedikit" : "banyak"}.`} />
        <UrutKetuk
          key={r}
          item={tampil.map((x) => ({ id: x.id, label: x.h, isi: <KartuTurusHuruf n={x.n} huruf={x.h} kecil /> }))}
          urutan={kunci}
          petunjuk={() => PETUNJUK_URUT}
          onBeres={beres}
          pesanBeres="Semua huruf sudah diurutkan."
        />
      </>
    );
  });
}

function KartuBedaPB(d: PropsLangkah) {
  return Kartu(d, 15, "k3b5b-selisihhuruf", "Hitung selisih banyak dua huruf pada kata.", RONDE_BEDA_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Selisih banyak huruf" teks="Kurangkan banyak huruf yang lebih besar dengan yang lebih kecil." />
      <PilihBertahap
        key={r}
        soal={RONDE_BEDA_PB[r].map((s, i): SoalBertahap => {
          const na = banyakHuruf(s.kata, s.a);
          const nb = banyakHuruf(s.kata, s.b);
          const beda = Math.abs(na - nb);
          const o = opsiAngka(beda, r * 2 + i);
          return {
            visual: <TabelHurufTurus kata={s.kata} huruf={[s.a, s.b]} kecil />,
            tanya: `Berapa selisih banyak huruf ${s.a} dan ${s.b}?`,
            opsi: o.map(String),
            jawab: o.indexOf(beda),
            petunjuk: "Belum tepat. Kurangkan banyak kedua huruf.",
            pesan: `Selisihnya ${beda}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu hitung."
      />
    </>
  ));
}

function KartuJumlahPB(d: PropsLangkah) {
  return Kartu(d, 16, "k3b5b-jumlahhuruf", "Hitung jumlah semua huruf pada kata.", RONDE_JUMLAH_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Jumlah semua huruf" teks="Hitung semua huruf pada kata, termasuk yang berulang." />
      <PilihBertahap
        key={r}
        soal={RONDE_JUMLAH_PB[r].map((kata, i): SoalBertahap => {
          const j = jumlahHuruf(kata);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <AngkaBesar n={kata} kelas="text-xl" />,
            tanya: `Berapa jumlah semua huruf pada kata itu?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Hitung setiap huruf satu per satu.",
            pesan: `${kata} memiliki ${j} huruf.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jumlah huruf sudah kamu hitung."
      />
    </>
  ));
}

function KartuKelompokPB(d: PropsLangkah) {
  return Kartu(d, 17, "k3b5b-titiklima", "Hitung titik yang disusun kelompok lima.", RONDE_KELOMPOK_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung titik kelompok lima" teks="Setiap baris penuh berisi lima titik. Tambahkan titik sisanya." />
      <PilihBertahap
        key={r}
        soal={RONDE_KELOMPOK_PB[r].map((n, i): SoalBertahap => {
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: <TitikKelompokLima n={n} />,
            tanya: "Berapa banyak titik?",
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: PETUNJUK_HITUNG,
            pesan: `Ada ${n} titik.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua titik sudah kamu hitung."
      />
    </>
  ));
}

function KartuSemuaPB(d: PropsLangkah) {
  return Kartu(d, 18, "k3b5b-semuahuruf", "Ketuk semua huruf yang cocok dengan syarat. Lalu tekan Periksa.", RONDE_SEMUA_PB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    const tanya = `Ketuk semua huruf yang banyaknya ${kataSyarat(ro.syarat)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua huruf yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.huruf.map((h) => {
            const n = banyakHuruf(ro.kata, h);
            const cocok = cocokSyarat(ro.syarat, n);
            return {
              id: h,
              label: h,
              isi: <KartuTurusHuruf n={n} huruf={h} kecil />,
              benar: cocok,
              penjelasan: `Huruf ${h} ada ${n}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua huruf yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuNilaiBukuPB(d: PropsLangkah) {
  return Kartu(d, 19, "k3b5b-nilaibuku", "Baca tabel nilai. Hitung siswa dengan nilai sama, lebih, atau kurang dari acuan.", RONDE_NILAIBUKU_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca tabel nilai" teks="Jumlahkan kolom banyak pada baris yang cocok dengan pertanyaan." />
      <PilihBertahap
        key={r}
        soal={RONDE_NILAIBUKU_PB[r].map((s, i): SoalBertahap => {
          const j = hitungNilaiBuku(s);
          const o = opsiAngka(j, r * 2 + i);
          const teks = s.jenis === "sama" ? `sama dengan ${s.acuan}` : s.jenis === "lebih" ? `lebih dari ${s.acuan}` : `kurang dari ${s.acuan}`;
          return {
            visual: <TabelNilaiTurus baris={TABEL_NILAI_BUKU} kecil />,
            tanya: `Berapa siswa bernilai ${teks}?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Jumlahkan banyak pada baris yang cocok.",
            pesan: `Ada ${j} siswa.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua soal tabel nilai sudah kamu jawab."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuTabelQB(d: PropsLangkah) {
  return Kartu(d, 20, "k3b5b-tabelnilai", "Baca data nilai. Pilih nilai terbanyak atau banyak siswa pada nilai tertentu.", RONDE_TABEL_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Baca tabel nilai" teks="Cacah kemunculan tiap nilai. Jawab pertanyaan tentang terbanyak atau banyak nilai tertentu." />
      <PilihBertahap
        key={r}
        soal={RONDE_TABEL_QB[r].map((s, i): SoalBertahap => {
          const j = jawabTabelQB(s);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <ChipData data={s.data.length > 14 ? s.data.slice(0, 14) : s.data} />,
            tanya: s.tanya === "terbanyak" ? "Nilai manakah yang paling banyak muncul?" : `Berapa kali nilai ${s.nilai} muncul?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Cacah kemunculan tiap nilai pada data.",
            pesan: s.tanya === "terbanyak" ? `Nilai ${j} paling banyak.` : `Nilai ${s.nilai} muncul ${j} kali.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua soal tabel sudah kamu jawab."
      />
    </>
  ));
}

function KartuLebihQB(d: PropsLangkah) {
  return Kartu(d, 21, "k3b5b-lebih", "Hitung banyak data yang lebih dari bilangan acuan.", RONDE_LEBIH_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lebih dari pada data" teks="Hitung berapa data yang lebih dari bilangan acuan." />
      <PilihBertahap
        key={r}
        soal={RONDE_LEBIH_QB[r].map((s, i): SoalBertahap => {
          const j = hitungBandingData(s);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <ChipData data={s.data.length > 14 ? s.data.slice(0, 14) : s.data} />,
            tanya: `Berapa data yang lebih dari ${s.acuan}?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Hitung data yang lebih besar dari acuan.",
            pesan: `Ada ${j} data yang lebih dari ${s.acuan}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua soal sudah kamu jawab."
      />
    </>
  ));
}

function KartuKurangQB(d: PropsLangkah) {
  return Kartu(d, 22, "k3b5b-kurang", "Hitung banyak data yang kurang dari bilangan acuan.", RONDE_KURANG_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Kurang dari pada data" teks="Hitung berapa data yang kurang dari bilangan acuan." />
      <PilihBertahap
        key={r}
        soal={RONDE_KURANG_QB[r].map((s, i): SoalBertahap => {
          const j = hitungBandingData(s);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <ChipData data={s.data.length > 14 ? s.data.slice(0, 14) : s.data} />,
            tanya: `Berapa data yang kurang dari ${s.acuan}?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Hitung data yang lebih kecil dari acuan.",
            pesan: `Ada ${j} data yang kurang dari ${s.acuan}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua soal sudah kamu jawab."
      />
    </>
  ));
}

function KartuHurufKataQB(d: PropsLangkah) {
  return Kartu(d, 23, "k3b5b-hurufkata", "Hitung banyak sebuah huruf pada kata.", RONDE_HURUFKATA_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Banyak huruf pada kata" teks="Cacah kemunculan huruf yang ditanyakan pada kata." />
      <PilihBertahap
        key={r}
        soal={RONDE_HURUFKATA_QB[r].map((s, i): SoalBertahap => {
          const j = banyakHuruf(s.kata, s.huruf);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <AngkaBesar n={s.kata} kelas="text-lg" />,
            tanya: `Berapa kali huruf ${s.huruf} muncul?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Hitung huruf itu satu per satu pada kata.",
            pesan: `Huruf ${s.huruf} muncul ${j} kali.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua huruf sudah kamu hitung."
      />
    </>
  ));
}

function KartuUrutHurufQB(d: PropsLangkah) {
  return Kartu(d, 24, "k3b5b-uruthurufabs", "Ketuk huruf menurut banyaknya pada kata.", RONDE_URUTHURUF_QB.length, "Urutkan semua hurufnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTHURUF_QB[r];
    const itemDasar = ro.huruf.map((h) => ({ id: h, h, n: banyakHuruf(ro.kata, h) }));
    const kunciItem = [...itemDasar].sort((a, b) => (ro.dari === "kecil" ? a.n - b.n : b.n - a.n));
    const kunci = kunciItem.map((x) => x.id);
    const tampil = urutTampil(itemDasar, kunciItem, r);
    return (
      <>
        <CatatanPensil pendek="Urutkan huruf menurut banyaknya" teks={`Kata ${ro.kata}. Ketuk dari yang paling ${ro.dari === "kecil" ? "sedikit" : "banyak"}.`} />
        <UrutKetuk
          key={r}
          item={tampil.map((x) => ({ id: x.id, label: `${x.h} (${x.n})`, isi: <AngkaBesar n={x.h} kelas="text-3xl" /> }))}
          urutan={kunci}
          petunjuk={() => PETUNJUK_URUT}
          onBeres={beres}
          pesanBeres="Semua huruf sudah diurutkan."
        />
      </>
    );
  });
}

function KartuKalimatQB(d: PropsLangkah) {
  return Kartu(d, 25, "k3b5b-kalimat", "Pilih kata yang tepat untuk melengkapi kalimat tentang tabel dan turus.", RONDE_KALIMAT_QB.length, "Lengkapi semua kalimatnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat tabel dan turus" teks="Baca kalimat. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QB[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuJodohQB(d: PropsLangkah) {
  return Kartu(d, 26, "k3b5b-jodohistilah", "Ketuk istilah di kiri, lalu ketuk artinya di kanan.", RONDE_JODOH_QB.length, "Jodohkan semua istilahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QB[r];
    const kanan = ro.map((p, i) => ({ id: `k${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan istilah tabel dan artinya" teks="Ketuk istilah, lalu ketuk arti yang cocok." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `l${i}`, label: p.kiri, isi: null }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`l${i}`, `k${i}`]))}
          petunjuk={() => "Belum tepat. Baca lagi arti tiap istilah."}
          onBeres={beres}
          pesanBeres="Semua istilah sudah cocok dengan artinya."
        />
      </>
    );
  });
}

function KartuBenarSalahQB(d: PropsLangkah) {
  return Kartu(d, 27, "k3b5b-benarsalah", "Baca pernyataan. Pilih Benar atau Salah.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah tentang tabel" teks="Baca pernyataan. Pilih benar atau salah. Setiap jawaban ada penjelasannya." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifQB(d: PropsLangkah) {
  return Kartu(d, 28, "k3b5b-detektif", "Baca dua petunjuk. Pilih bilangan yang cocok keduanya.", RONDE_DETEKTIF_QB.length, "Jawab semua soal detektifnya dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (
      <>
        <CatatanPensil pendek="Detektif tabel" teks="Baca dua petunjuk. Hanya satu bilangan yang cocok keduanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuSusunQB(d: PropsLangkah) {
  return Kartu(d, 29, "k3b5b-susunkata", "Susun kartu kata menjadi kalimat yang benar. Ada satu kartu pengecoh.", RONDE_SUSUNKATA_QB.length, "Susun semua kalimatnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata tentang tabel" teks="Ketuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QB[r].kata} pengecoh={RONDE_SUSUNKATA_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  KartuKelompokCB, KartuLidiCB, KartuUrutLidiCB, KartuManikMerahCB, KartuSortirCB,
  KartuPalingManikCB, KartuPapanCB, KartuJodohCB, KartuTotalManikCB, KartuMemoriCB,
].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

const KARTU_PICTURE: KartuTahap[] = [
  KartuTurusPB, KartuPilihTurusPB, KartuTabelHurufPB, KartuIsiTabelPB, KartuUrutHurufPB,
  KartuBedaPB, KartuJumlahPB, KartuKelompokPB, KartuSemuaPB, KartuNilaiBukuPB,
].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

const KARTU_ABSTRACT: KartuTahap[] = [
  KartuTabelQB, KartuLebihQB, KartuKurangQB, KartuHurufKataQB, KartuUrutHurufQB,
  KartuKalimatQB, KartuJodohQB, KartuBenarSalahQB, KartuDetektifQB, KartuSusunQB,
].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK3B5B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📖", nama: "CONCRETE", cara: "Lidi, manik, dan kelompok lima!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B5B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Turus dan tabel", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B5B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Tabel, huruf, dan istilah", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B35} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
