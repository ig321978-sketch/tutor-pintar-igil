"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { BarisAnakBenda, KartuAnakBenda, TumpukanBenda } from "./dasar-k3b5";
import { AngkaBesar, ChipData, KartuTurus, KartuTurusHuruf, TabelAnakTurus, TabelNilaiTurus } from "./diagram-k3b5";
import {
  BENDA_DATA, HURUF, PETA_KONSEP_QA, RONDE_BACA_PA, RONDE_BEDA_CA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, RONDE_JANGKAUAN_PA, RONDE_JANGKAUAN_QA,
  RONDE_JODOH_CA, RONDE_JODOH_PA, RONDE_JODOH_QA, RONDE_KALIMAT_QA, RONDE_LEBIH_PA, RONDE_MEMORI_CA, RONDE_MEMORI_PA, RONDE_MINMAX_QA,
  RONDE_BANYAKNILAI_QA, RONDE_PALING_CA, RONDE_PALING_PA, RONDE_PAPAN_CA, RONDE_PILAH_CA, RONDE_PILAH_PA, RONDE_SELISIH_CA, RONDE_SEMUA_CA,
  RONDE_SEMUA_PA, RONDE_SUSUNKATA_QA, RONDE_TERBANYAK_PA, RONDE_TOTAL_CA, RONDE_URUT_CA, RONDE_URUT_PA, RONDE_URUTNILAI_QA, anakPaling,
  binBanyak, binTurus, banyakNilai, cocokSyarat, hitungLebihKurang, idAnak, jangkauan, jangkauanAnak, jawabMinMax, jumlahAnak,
  kataPaling, kataSyarat, nilaiTerbanyak, opsiAngka, urutNaik, urutTampil, urutanTetap,
} from "./data-k3b5";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B5A } from "./infografis-k3b5";
import { SUB_A35 } from "./naskah-k3b5";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 5 Sub-Bab A: Mengurutkan dan Membandingkan Data. 30 permainan.  */
/*  Concrete  1 Urutkan  2 Paling  3 Selisih  4 Jodohkan  5 Memori  6 Semua     */
/*            7 Papan  8 Jumlah  9 Pilah  10 Beda                               */
/*  Picture  11 Baca Turus  12 Urut Turus  13 Paling  14 Jangkauan  15 Jodoh    */
/*           16 Memori  17 Semua  18 Pilah  19 Terbanyak  20 Lebih/Kurang       */
/*  Abstract 21 Urut Nilai  22 Min Max  23 Jangkauan  24 Banyak Nilai  25 Kalimat*/
/*           26 Jodoh  27 Benar Salah  28 Detektif  29 Peta  30 Susun Kata      */
/* Naskah: naskah-k3b5.ts (SUB_A35). Tanpa API.                                 */
/* ------------------------------------------------------------------------ */

const J = SUB_A35.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const SUARA_INFO =
  "Ini poster rangkuman tentang mengurutkan dan membandingkan data. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B5AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A35} judul="Mengurutkan dan Membandingkan Data" suaraInfo={SUARA_INFO} visual={visualInfografisK3B5A()} speakGuru={speakGuru} />;
}

const PETUNJUK_HITUNG = "Belum tepat. Hitung bendanya satu per satu, atau lima-lima lalu tambah sisanya.";
const PETUNJUK_JANGKAUAN = "Belum tepat. Jangkauan sama dengan data terbesar dikurangi data terkecil.";
const PETUNJUK_URUT = "Belum tepat. Bandingkan banyaknya, lalu ketuk dari yang diminta.";

const BIN_BANYAK = [
  { id: "sedikit", label: "Sedikit (<5)", warna: "#BAE6FD" },
  { id: "sedang", label: "Sedang (5–7)", warna: "#FDE68A" },
  { id: "banyak", label: "Banyak (>7)", warna: "#BBF7D0" },
];
const BIN_TURUS = [
  { id: "kecil", label: "Kurang dari 5", warna: "#BAE6FD" },
  { id: "tengah", label: "5 sampai 9", warna: "#FDE68A" },
  { id: "besar", label: "10 atau lebih", warna: "#BBF7D0" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuUrutCA(d: PropsLangkah) {
  return Kartu(d, 0, "k3b5a-urut", "Ketuk anak satu per satu menurut banyak bendanya, dari terkecil atau dari terbesar.", RONDE_URUT_CA.length, "Urutkan semua anaknya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.anak].sort((a, b) => (ro.dari === "kecil" ? a.n - b.n : b.n - a.n));
    const tampil = urutTampil(ro.anak, kunci, r);
    return (
      <>
        <IgilBicara pendek="Urutkan anak menurut banyak benda" teks={`Ketuk anak dari yang bendanya paling ${ro.dari === "kecil" ? "sedikit" : "banyak"} dulu.`} />
        <UrutKetuk
          key={r}
          item={tampil.map((a) => ({ id: idAnak(a), label: a.nama, isi: <KartuAnakBenda anak={a} benda={ro.benda} ukuran={14} kecil /> }))}
          urutan={kunci.map(idAnak)}
          petunjuk={() => PETUNJUK_URUT}
          onBeres={beres}
          pesanBeres="Semua anak sudah diurutkan."
        />
      </>
    );
  });
}

function KartuPalingCA(d: PropsLangkah) {
  return Kartu(d, 1, "k3b5a-paling", "Ketuk anak yang bendanya paling banyak atau paling sedikit.", RONDE_PALING_CA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_PALING_CA[r];
    return (
      <>
        <IgilBicara pendek="Ketuk yang paling banyak atau sedikit" teks="Bandingkan tumpukan benda tiap anak. Ketuk anak yang cocok dengan pertanyaan." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.anak.map((a) => ({ id: idAnak(a), label: a.nama, isi: <KartuAnakBenda anak={a} benda={ro.benda} ukuran={14} kecil /> }))}
          soal={ro.tanya.map((t) => {
            const a = anakPaling(ro.anak, t);
            return { tanya: `Ketuk anak yang ${kataPaling(t)}.`, jawab: idAnak(a), petunjuk: PETUNJUK_HITUNG, pesan: `${a.nama} ${kataPaling(t)} dengan ${a.n} ${BENDA_DATA[ro.benda].nama}.` };
          })}
          onBeres={beres}
          pesanBeres="Semua jawaban sudah benar."
        />
      </>
    );
  });
}

function KartuSelisihCA(d: PropsLangkah) {
  return Kartu(d, 2, "k3b5a-selisih", "Hitung selisih banyak benda terbanyak dan tersedikit (jangkauan).", RONDE_SELISIH_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Selisih terbanyak dan tersedikit" teks="Cari tumpukan terbanyak dan tersedikit. Kurangkan. Itulah jangkauannya." />
      <PilihBertahap
        key={r}
        soal={RONDE_SELISIH_CA[r].map((s, i): SoalBertahap => {
          const j = jangkauanAnak(s.anak);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <BarisAnakBenda anak={s.anak} benda={s.benda} />,
            tanya: "Berapa selisih terbanyak dan tersedikit?",
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: PETUNJUK_JANGKAUAN,
            pesan: `Jangkauannya ${j}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jangkauan sudah kamu hitung."
      />
    </>
  ));
}

function KartuJodohCA(d: PropsLangkah) {
  return Kartu(d, 3, "k3b5a-jodoh", "Ketuk tumpukan di kiri, lalu ketuk banyaknya di kanan.", RONDE_JODOH_CA.length, "Jodohkan semua tumpukannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CA[r];
    const kanan = ro.anak.map((a) => ({ id: `n${a.n}`, label: String(a.n), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan tumpukan dan banyaknya" teks="Hitung benda pada tiap tumpukan. Jodohkan dengan bilangannya." />
        <PasangKartu
          key={r}
          kiri={ro.anak.map((a) => ({ id: idAnak(a), label: a.nama, isi: <KartuAnakBenda anak={a} benda={ro.benda} ukuran={14} kecil /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.anak.map((a) => [idAnak(a), `n${a.n}`]))}
          petunjuk={() => PETUNJUK_HITUNG}
          onBeres={beres}
          pesanBeres="Semua tumpukan sudah cocok dengan banyaknya."
        />
      </>
    );
  });
}

function KartuMemoriCA(d: PropsLangkah) {
  return Kartu(d, 4, "k3b5a-memori", "Balik dua kartu. Cari tumpukan dan banyaknya.", RONDE_MEMORI_CA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_MEMORI_CA[r];
    return (
      <>
        <IgilBicara pendek="Memori tumpukan dan banyaknya" teks="Balik dua kartu. Cari kartu tumpukan dan kartu bilangannya." />
        <MemoriKartu
          key={r}
          kolom={2}
          pasangan={ro.n.map((n) => ({
            id: `n${n}`,
            a: <TumpukanBenda benda={ro.benda} n={n} ukuran={16} />,
            labelA: `${n} ${BENDA_DATA[ro.benda].nama}`,
            b: <Numeral n={String(n)} kelas="text-2xl" />,
            labelB: String(n),
          }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    );
  });
}

function KartuSemuaCA(d: PropsLangkah) {
  return Kartu(d, 5, "k3b5a-semua", "Ketuk semua tumpukan yang cocok dengan syarat. Lalu tekan Periksa.", RONDE_SEMUA_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    const tanya = `Ketuk semua yang ${kataSyarat(ro.syarat)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.anak.map((a) => {
            const cocok = cocokSyarat(ro.syarat, a.n);
            return {
              id: idAnak(a),
              label: a.nama,
              isi: <KartuAnakBenda anak={a} benda={ro.benda} ukuran={12} kecil />,
              benar: cocok,
              penjelasan: `${a.nama} punya ${a.n}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua tumpukan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPapanCA(d: PropsLangkah) {
  return Kartu(d, 6, "k3b5a-papan", "Hitung bendanya. Atur angka pada papan, lalu tekan Periksa.", RONDE_PAPAN_CA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan banyak benda" teks="Hitung benda pada gambar. Tulis banyaknya pada papan puluhan dan satuan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CA[r].map((s) => ({
          visual: <TumpukanBenda benda={s.benda} n={s.n} ukuran={18} />,
          tanya: `Berapa banyak ${BENDA_DATA[s.benda].nama}?`,
          jawab: s.n,
          petunjuk: PETUNJUK_HITUNG,
          pesan: `Ada ${s.n} ${BENDA_DATA[s.benda].nama}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuTotalCA(d: PropsLangkah) {
  return Kartu(d, 7, "k3b5a-total", "Jumlahkan semua benda pada gambar, lalu pilih hasilnya.", RONDE_TOTAL_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Jumlah benda semua anak" teks="Jumlahkan banyak benda semua anak. Lalu pilih hasilnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_TOTAL_CA[r].map((s, i): SoalBertahap => {
          const j = jumlahAnak(s.anak);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <BarisAnakBenda anak={s.anak} benda={s.benda} />,
            tanya: `Berapa jumlah semua ${BENDA_DATA[s.benda].nama}?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Jumlahkan banyak benda tiap anak.",
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

function KartuPilahCA(d: PropsLangkah) {
  return Kartu(d, 8, "k3b5a-pilah", "Pilah tumpukan: sedikit (kurang dari 5), sedang (5 sampai 7), atau banyak (lebih dari 7).", RONDE_PILAH_CA.length, "Pilah semua tumpukannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PILAH_CA[r];
    return (
      <>
        <IgilBicara pendek="Pilah tumpukan menurut banyaknya" teks="Sedikit kurang dari lima. Sedang lima sampai tujuh. Banyak lebih dari tujuh." />
        <Sortir
          key={r}
          lebarItem={72}
          kolomBin={3}
          item={ro.n.map((n, i) => ({
            id: `t${i}-${n}`,
            label: `${n} ${BENDA_DATA[ro.benda].nama}`,
            isi: <TumpukanBenda benda={ro.benda} n={n} ukuran={12} />,
            bin: binBanyak(n),
            petunjuk: `Belum tepat. ${n} termasuk ${binBanyak(n)}.`,
            ucapan: `${n} masuk kotak ${binBanyak(n)}.`,
          }))}
          bin={BIN_BANYAK}
          onBeres={beres}
          pesanBeres="Semua tumpukan sudah masuk kotaknya."
        />
      </>
    );
  });
}

function KartuBedaCA(d: PropsLangkah) {
  return Kartu(d, 9, "k3b5a-beda", "Hitung berapa lebih banyak benda satu anak dibanding anak lain.", RONDE_BEDA_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Berapa lebih banyak" teks="Kurangkan banyak benda yang lebih besar dengan yang lebih kecil." />
      <PilihBertahap
        key={r}
        soal={RONDE_BEDA_CA[r].map((s, i): SoalBertahap => {
          const beda = Math.abs(s.a.n - s.b.n);
          const o = opsiAngka(beda, r * 2 + i);
          const lebih = s.a.n > s.b.n ? s.a : s.b;
          const kurang = s.a.n > s.b.n ? s.b : s.a;
          return {
            visual: (
              <span className="flex flex-wrap justify-center gap-2">
                <KartuAnakBenda anak={s.a} benda={s.benda} ukuran={14} kecil />
                <KartuAnakBenda anak={s.b} benda={s.benda} ukuran={14} kecil />
              </span>
            ),
            tanya: `Berapa lebih banyak ${lebih.nama} dibanding ${kurang.nama}?`,
            opsi: o.map(String),
            jawab: o.indexOf(beda),
            petunjuk: "Belum tepat. Kurangkan banyak yang lebih besar dengan yang lebih kecil.",
            pesan: `${lebih.nama} lebih banyak ${beda}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Picture ------------------------------ */

function KartuBacaPA(d: PropsLangkah) {
  return Kartu(d, 10, "k3b5a-bacaturus", "Hitung garis turus, lalu pilih bilangannya.", RONDE_BACA_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca turus" teks="Hitung garis turus. Kelompok lima dihitung lima, lalu tambah sisanya." />
      <PilihBertahap
        key={r}
        soal={RONDE_BACA_PA[r].map((n, i): SoalBertahap => {
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: <KartuTurus n={n} />,
            tanya: "Berapa banyak data pada turus ini?",
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: "Belum tepat. Hitung kelompok lima, lalu tambah garis sisanya.",
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

function KartuUrutPA(d: PropsLangkah) {
  return Kartu(d, 11, "k3b5a-urutturus", "Ketuk turus satu per satu dari yang paling kecil atau paling besar.", RONDE_URUT_PA.length, "Urutkan semua turusnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_PA[r];
    const kunciNilai = [...ro.n].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a));
    const itemDasar = ro.n.map((n, i) => ({ id: `t${i}`, n, huruf: HURUF[i] }));
    const kunci = kunciNilai.map((n) => (itemDasar.find((x) => x.n === n) as { id: string }).id);
    const tampil = urutTampil(itemDasar, kunciNilai.map((n) => itemDasar.find((x) => x.n === n)!), r);
    return (
      <>
        <CatatanTempel pendek="Urutkan turus" teks={`Ketuk turus dari yang paling ${ro.dari === "kecil" ? "sedikit" : "banyak"} dulu.`} />
        <UrutKetuk
          key={r}
          item={tampil.map((x) => ({ id: x.id, label: `Turus ${x.huruf}`, isi: <KartuTurusHuruf n={x.n} huruf={x.huruf} kecil /> }))}
          urutan={kunci}
          petunjuk={() => PETUNJUK_URUT}
          onBeres={beres}
          pesanBeres="Semua turus sudah diurutkan."
        />
      </>
    );
  });
}

function KartuPalingPA(d: PropsLangkah) {
  return Kartu(d, 12, "k3b5a-palingturus", "Ketuk turus yang paling banyak atau paling sedikit.", RONDE_PALING_PA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_PALING_PA[r];
    return (
      <>
        <CatatanTempel pendek="Ketuk turus paling banyak atau sedikit" teks="Bandingkan banyak garis tiap turus. Ketuk yang cocok." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.n.map((n, i) => ({ id: `t${i}`, label: `Turus ${HURUF[i]}`, isi: <KartuTurusHuruf n={n} huruf={HURUF[i]} kecil /> }))}
          soal={ro.tanya.map((t) => {
            const target = t === "banyak" ? Math.max(...ro.n) : Math.min(...ro.n);
            const idx = ro.n.indexOf(target);
            return { tanya: `Ketuk turus yang ${kataPaling(t)}.`, jawab: `t${idx}`, petunjuk: PETUNJUK_URUT, pesan: `Turus ${HURUF[idx]} ${kataPaling(t)} dengan ${target}.` };
          })}
          onBeres={beres}
          pesanBeres="Semua jawaban sudah benar."
        />
      </>
    );
  });
}

function KartuJangkauanPA(d: PropsLangkah) {
  return Kartu(d, 13, "k3b5a-jangkauanturus", "Hitung jangkauan dari tabel nama dan turus.", RONDE_JANGKAUAN_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Jangkauan dari tabel turus" teks="Cari turus terbanyak dan tersedikit pada tabel. Kurangkan." />
      <PilihBertahap
        key={r}
        soal={RONDE_JANGKAUAN_PA[r].map((anak, i): SoalBertahap => {
          const j = jangkauanAnak(anak);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <TabelAnakTurus judul="Data anak" anak={anak} kecil />,
            tanya: "Berapa jangkauan data pada tabel?",
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: PETUNJUK_JANGKAUAN,
            pesan: `Jangkauannya ${j}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jangkauan sudah kamu hitung."
      />
    </>
  ));
}

function KartuJodohPA(d: PropsLangkah) {
  return Kartu(d, 14, "k3b5a-jodohturus", "Ketuk turus di kiri, lalu ketuk banyaknya di kanan.", RONDE_JODOH_PA.length, "Jodohkan semua turusnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PA[r];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan turus dan banyaknya" teks="Hitung garis tiap turus. Jodohkan dengan bilangannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: `t${n}`, label: `Turus ${HURUF[i]}`, isi: <KartuTurus n={n} kecil /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`t${n}`, `n${n}`]))}
          petunjuk={() => "Belum tepat. Hitung garis turusnya."}
          onBeres={beres}
          pesanBeres="Semua turus sudah cocok dengan banyaknya."
        />
      </>
    );
  });
}

function KartuMemoriPA(d: PropsLangkah) {
  return Kartu(d, 15, "k3b5a-memoritrus", "Balik dua kartu. Cari turus dan banyaknya.", RONDE_MEMORI_PA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori turus dan banyaknya" teks="Balik dua kartu. Cari kartu turus dan kartu bilangannya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PA[r].map((n) => ({
          id: `n${n}`,
          a: <KartuTurus n={n} kecil />,
          labelA: `turus ${n}`,
          b: <Numeral n={String(n)} kelas="text-2xl" />,
          labelB: String(n),
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuSemuaPA(d: PropsLangkah) {
  return Kartu(d, 16, "k3b5a-semuaturus", "Ketuk semua turus yang cocok dengan syarat. Lalu tekan Periksa.", RONDE_SEMUA_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    const tanya = `Ketuk semua turus yang ${kataSyarat(ro.syarat)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua turus yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.n.map((n, i) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return {
              id: `t${i}`,
              label: `Turus ${HURUF[i]}`,
              isi: <KartuTurusHuruf n={n} huruf={HURUF[i]} kecil />,
              benar: cocok,
              penjelasan: `Turus ${HURUF[i]} = ${n}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua turus yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahPA(d: PropsLangkah) {
  return Kartu(d, 17, "k3b5a-pilahturus", "Pilah turus: kurang dari 5, 5 sampai 9, atau 10 atau lebih.", RONDE_PILAH_PA.length, "Pilah semua turusnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah turus menurut banyaknya" teks="Kurang dari lima, lima sampai sembilan, atau sepuluh atau lebih." />
      <Sortir
        key={r}
        lebarItem={70}
        kolomBin={3}
        item={RONDE_PILAH_PA[r].map((n, i) => ({
          id: `t${i}-${n}`,
          label: `Turus ${n}`,
          isi: <KartuTurus n={n} kecil />,
          bin: binTurus(n),
          petunjuk: `Belum tepat. ${n} termasuk ${binTurus(n)}.`,
          ucapan: `${n} masuk kotak ${binTurus(n)}.`,
        }))}
        bin={BIN_TURUS}
        onBeres={beres}
        pesanBeres="Semua turus sudah masuk kotaknya."
      />
    </>
  ));
}

function KartuTerbanyakPA(d: PropsLangkah) {
  return Kartu(d, 18, "k3b5a-terbanyak", "Baca tabel nilai dan turus. Pilih nilai yang paling banyak muncul.", RONDE_TERBANYAK_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Nilai yang terbanyak" teks="Lihat kolom banyak. Nilai dengan angka terbesar itulah yang terbanyak." />
      <PilihBertahap
        key={r}
        soal={RONDE_TERBANYAK_PA[r].map((tabel, i): SoalBertahap => {
          const v = nilaiTerbanyak(tabel);
          const o = opsiAngka(v, r * 2 + i);
          return {
            visual: <TabelNilaiTurus baris={tabel} kecil />,
            tanya: "Nilai manakah yang paling banyak muncul?",
            opsi: o.map(String),
            jawab: o.indexOf(v),
            petunjuk: "Belum tepat. Bandingkan angka pada kolom banyak.",
            pesan: `Nilai ${v} paling banyak muncul.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua nilai terbanyak sudah kamu temukan."
      />
    </>
  ));
}

function KartuLebihPA(d: PropsLangkah) {
  return Kartu(d, 19, "k3b5a-lebihkurang", "Hitung banyak siswa yang nilainya lebih atau kurang dari acuan.", RONDE_LEBIH_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Lebih atau kurang dari nilai" teks="Jumlahkan kolom banyak pada baris yang nilainya lebih atau kurang dari acuan." />
      <PilihBertahap
        key={r}
        soal={RONDE_LEBIH_PA[r].map((s, i): SoalBertahap => {
          const j = hitungLebihKurang(s);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <TabelNilaiTurus baris={s.tabel} kecil />,
            tanya: `Berapa siswa bernilai ${s.jenis === "lebih" ? "lebih" : "kurang"} dari ${s.acuan}?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Jumlahkan banyak pada baris yang cocok dengan syarat.",
            pesan: `Ada ${j} siswa.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua soal sudah kamu jawab."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuUrutQA(d: PropsLangkah) {
  return Kartu(d, 20, "k3b5a-urutnilai", "Ketuk bilangan satu per satu menurut urutan yang diminta.", RONDE_URUTNILAI_QA.length, "Urutkan semua bilangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTNILAI_QA[r];
    const naik = urutNaik(ro.nilai);
    const kunciNilai = ro.dari === "kecil" ? naik : [...naik].reverse();
    const itemDasar = ro.nilai.map((n, i) => ({ id: `v${i}`, n }));
    const kunci = kunciNilai.map((n) => (itemDasar.find((x) => x.n === n) as { id: string }).id);
    const tampil = urutTampil(itemDasar, kunciNilai.map((n) => itemDasar.find((x) => x.n === n)!), r);
    return (
      <>
        <CatatanPensil pendek="Urutkan nilai data" teks={`Ketuk bilangan dari yang paling ${ro.dari === "kecil" ? "kecil" : "besar"} dulu.`} />
        <UrutKetuk
          key={r}
          item={tampil.map((x) => ({ id: x.id, label: String(x.n), isi: <AngkaBesar n={x.n} kelas="text-3xl" /> }))}
          urutan={kunci}
          petunjuk={() => PETUNJUK_URUT}
          onBeres={beres}
          pesanBeres="Semua nilai sudah diurutkan."
        />
      </>
    );
  });
}

function KartuMinMaxQA(d: PropsLangkah) {
  return Kartu(d, 21, "k3b5a-minmax", "Pilih data terkecil atau data terbesar pada daftar nilai.", RONDE_MINMAX_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Nilai terkecil dan terbesar" teks="Cari bilangan paling kecil atau paling besar pada data." />
      <PilihBertahap
        key={r}
        soal={RONDE_MINMAX_QA[r].map((s, i): SoalBertahap => {
          const j = jawabMinMax(s);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <ChipData data={s.data.length > 12 ? s.data.slice(0, 12) : s.data} />,
            tanya: `Berapakah data ${s.tanya}?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: `Belum tepat. Cari bilangan paling ${s.tanya === "terkecil" ? "kecil" : "besar"}.`,
            pesan: `Data ${s.tanya} adalah ${j}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua nilai sudah kamu temukan."
      />
    </>
  ));
}

function KartuJangkauanQA(d: PropsLangkah) {
  return Kartu(d, 22, "k3b5a-jangkauan", "Hitung jangkauan: data terbesar dikurangi data terkecil.", RONDE_JANGKAUAN_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Jangkauan data" teks="Kurangkan data terbesar dengan data terkecil." />
      <PilihBertahap
        key={r}
        soal={RONDE_JANGKAUAN_QA[r].map((data, i): SoalBertahap => {
          const j = jangkauan(data);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <ChipData data={data.length > 12 ? [...new Set(urutNaik(data))] : data} />,
            tanya: "Berapa jangkauan data ini?",
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: PETUNJUK_JANGKAUAN,
            pesan: `Jangkauannya ${j}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jangkauan sudah kamu hitung."
      />
    </>
  ));
}

function KartuBanyakNilaiQA(d: PropsLangkah) {
  return Kartu(d, 23, "k3b5a-banyaknilai", "Hitung berapa kali sebuah nilai muncul pada data.", RONDE_BANYAKNILAI_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Banyak nilai pada data" teks="Cacah berapa kali nilai itu muncul pada daftar." />
      <PilihBertahap
        key={r}
        soal={RONDE_BANYAKNILAI_QA[r].map((s, i): SoalBertahap => {
          const j = banyakNilai(s.data, s.nilai);
          const o = opsiAngka(j, r * 2 + i);
          return {
            visual: <ChipData data={s.data} />,
            tanya: `Berapa kali nilai ${s.nilai} muncul?`,
            opsi: o.map(String),
            jawab: o.indexOf(j),
            petunjuk: "Belum tepat. Hitung satu per satu kemunculan nilai itu.",
            pesan: `Nilai ${s.nilai} muncul ${j} kali.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua frekuensi sudah kamu hitung."
      />
    </>
  ));
}

function KartuKalimatQA(d: PropsLangkah) {
  return Kartu(d, 24, "k3b5a-kalimat", "Pilih kata yang tepat untuk melengkapi kalimat tentang data.", RONDE_KALIMAT_QA.length, "Lengkapi semua kalimatnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat tentang data" teks="Baca kalimat. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QA[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuJodohQA(d: PropsLangkah) {
  return Kartu(d, 25, "k3b5a-jodohistilah", "Ketuk istilah di kiri, lalu ketuk artinya di kanan.", RONDE_JODOH_QA.length, "Jodohkan semua istilahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QA[r];
    const kanan = ro.map((p, i) => ({ id: `k${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan istilah dan artinya" teks="Ketuk istilah, lalu ketuk arti yang cocok." />
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

function KartuBenarSalahQA(d: PropsLangkah) {
  return Kartu(d, 26, "k3b5a-benarsalah", "Baca pernyataan. Pilih Benar atau Salah.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah tentang data" teks="Baca pernyataan. Pilih benar atau salah. Setiap jawaban ada penjelasannya." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifQA(d: PropsLangkah) {
  return Kartu(d, 27, "k3b5a-detektif", "Baca dua petunjuk. Pilih bilangan yang cocok keduanya.", RONDE_DETEKTIF_QA.length, "Jawab semua soal detektifnya dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (
      <>
        <CatatanPensil pendek="Detektif data" teks="Baca dua petunjuk. Hanya satu bilangan yang cocok keduanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaQA(d: PropsLangkah) {
  return Kartu(d, 28, "k3b5a-peta", "Pilih kartu yang tepat untuk kotak yang menyala pada peta konsep.", PETA_KONSEP_QA.length, "Lengkapi semua peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QA[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Pilih kartu yang tepat untuk kotak yang menyala.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuSusunQA(d: PropsLangkah) {
  return Kartu(d, 29, "k3b5a-susunkata", "Susun kartu kata menjadi kalimat yang benar. Ada satu kartu pengecoh.", RONDE_SUSUNKATA_QA.length, "Susun semua kalimatnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata tentang data" teks="Ketuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QA[r].kata} pengecoh={RONDE_SUSUNKATA_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  KartuUrutCA, KartuPalingCA, KartuSelisihCA, KartuJodohCA, KartuMemoriCA,
  KartuSemuaCA, KartuPapanCA, KartuTotalCA, KartuPilahCA, KartuBedaCA,
].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

const KARTU_PICTURE: KartuTahap[] = [
  KartuBacaPA, KartuUrutPA, KartuPalingPA, KartuJangkauanPA, KartuJodohPA,
  KartuMemoriPA, KartuSemuaPA, KartuPilahPA, KartuTerbanyakPA, KartuLebihPA,
].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

const KARTU_ABSTRACT: KartuTahap[] = [
  KartuUrutQA, KartuMinMaxQA, KartuJangkauanQA, KartuBanyakNilaiQA, KartuKalimatQA,
  KartuJodohQA, KartuBenarSalahQA, KartuDetektifQA, KartuPetaQA, KartuSusunQA,
].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK3B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📖", nama: "CONCRETE", cara: "Urutkan dan bandingkan benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Baca turus dan tabel", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B5A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Nilai, jangkauan, dan istilah", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A35} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
