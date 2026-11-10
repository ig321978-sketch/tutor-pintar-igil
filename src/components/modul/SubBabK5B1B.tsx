"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, PetaKonsepGame, Sortir } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk } from "./mesin-k2b6";
import {
  HURUF, RONDE_BANDING_CB, RONDE_JENIS_CB, RONDE_SORTIR_CB, RONDE_PASANG_CB, RONDE_MEMORI_CB, RONDE_KETUK_CB, RONDE_SEMUA_CB, RONDE_CERITA_CB, RONDE_URUT_CB,
  RONDE_BANDING_PB, RONDE_PASANG_PB, RONDE_MEMORI_PB, RONDE_TABEL_PB, RONDE_SEMUA_PB, RONDE_SORTIR_PB, RONDE_JENIS_PB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, PETA_KONSEP_QB, RONDE_CERITA_QB,
  opsiTeks, urutTampil, urutanTetap, lambang,
} from "./data-k5b1";
import { buatKartu, VisualBanding, VisualPapan, Numeral } from "./bantu-k5b1";
import { visualInfografisK5B1B } from "./infografis-k5b1";
import { SUB_B51 } from "./naskah-k5b1";

const J = SUB_B51.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "besar", label: "Lebih besar", warna: "#BBF7D0" },
  { id: "kecil", label: "Lebih kecil", warna: "#FECACA" },
];

export function InfografisK5B1BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B51} judul="Membandingkan & Mengurutkan" suaraInfo={SUARA_INFO} visual={visualInfografisK5B1B()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b1b-banding", "Isi tanda.", RONDE_BANDING_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Banding" teks="Pilih tanda yang benar." /><PilihBertahap key={r} soal={RONDE_BANDING_CB[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]);
      return { visual: <VisualBanding a={s.a} b={s.b} tanda="?" />, tanya: `${lambang(s.a)} ? ${lambang(s.b)}`, opsi, jawab: opsi.indexOf(s.tanda), petunjuk: "Mulai dari puluh ribuan.", pesan: s.tanda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b1b-strategi", "Strategi.", RONDE_JENIS_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Strategi" teks="Pilih langkah yang tepat." /><PilihBertahap key={r} soal={RONDE_JENIS_CB[r].map((s) => ({ visual: <Numeral n="⬅️" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Dari kiri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b1b-ekstrem", "Ekstrem.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Ekstrem" teks="Cari paling besar/kecil." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="🏆" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Banding dari kiri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b1b-sortir", "Pilah ukuran.", RONDE_SORTIR_CB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Besar atau kecil relatif." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_CB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CB[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-sm" />, bin: s.bin, petunjuk: "Bandingkan dengan 60.000.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b1b-jodoh", "Jodohkan banding.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b1b-memori", "Memori banding.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b1b-ketuk", "Ketuk bilangan.", RONDE_KETUK_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk bilangan yang diminta." /><KetukPilih key={r} kolom={2} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${lambang(n)}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b1b-semua", "Ketuk semua.", RONDE_SEMUA_CB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b1b-cerita", "Cerita dakon.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Banding dari kiri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b1b-urut", "Urutkan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map((n) => lambang(n));
    const tampil = urutTampil(ro.angka.map((n) => lambang(n)), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan bilangan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b1b-pband", "Diagram banding.", RONDE_BANDING_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Banding" teks="Pilih tanda." /><PilihBertahap key={r} soal={RONDE_BANDING_PB[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]);
      return { visual: <VisualBanding a={s.a} b={s.b} tanda="?" />, tanya: "Tanda?", opsi, jawab: opsi.indexOf(s.tanda), petunjuk: "Dari puluh ribuan.", pesan: s.tanda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b1b-purut", "Diagram urut.", RONDE_URUT_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const terurut = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a));
    const opsi = opsiTeks(lambang(terurut[0]), [lambang(terurut[terurut.length - 1]), lambang(terurut[1] ?? terurut[0])], r);
    return (<><CatatanTempel pendek="Urut" teks="Pilih ujung urutan." /><PilihBertahap key={r} soal={[{ visual: <Numeral n={ro.angka.map(lambang).join(", ")} kelas="text-sm" />, tanya: ro.dari === "kecil" ? "Paling kecil?" : "Paling besar?", opsi, jawab: opsi.indexOf(lambang(terurut[0])), petunjuk: "Urutkan dulu.", pesan: lambang(terurut[0]) }]} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b1b-pj", "Jodoh diagram.", RONDE_PASANG_PB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b1b-pm", "Memori diagram.", RONDE_MEMORI_PB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b1b-pt", "Tabel banding.", RONDE_TABEL_PB.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi jawaban." /><PilihBertahap key={r} soal={RONDE_TABEL_PB[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Banding/urut.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b1b-ps", "Ketuk semua.", RONDE_SEMUA_PB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b1b-pl", "Pilah diagram.", RONDE_SORTIR_PB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Ukuran relatif." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PB[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-sm" />, bin: s.bin, petunjuk: "Banding 60.000.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b1b-ppapan", "Papan banding.", RONDE_BANDING_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Papan" teks="Banding kolom." /><PilihBertahap key={r} soal={RONDE_BANDING_PB[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]);
      return { visual: <div className="flex gap-2"><VisualPapan n={s.a} kecil /><VisualPapan n={s.b} kecil /></div>, tanya: "Hasil banding?", opsi, jawab: opsi.indexOf(s.tanda), petunjuk: "Banding digit kiri dulu.", pesan: s.tanda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b1b-pc", "Pilih strategi.", RONDE_JENIS_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Strategi tempat.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b1b-pst", "Cerita diagram.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Banding.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b1b-qw", "Tulis tanda.", RONDE_BANDING_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tanda" teks="Pilih > < =." /><PilihBertahap key={r} soal={RONDE_BANDING_CB[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]);
      return { visual: <Numeral n={`${lambang(s.a)} ? ${lambang(s.b)}`} kelas="text-base" />, tanya: "Tanda?", opsi, jawab: opsi.indexOf(s.tanda), petunjuk: "Dari kiri.", pesan: s.tanda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b1b-qe", "Tulis ekstrem.", RONDE_URUT_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const terurut = [...ro.angka].sort((a, b) => a - b);
    const target = ro.dari === "kecil" ? terurut[0] : terurut[terurut.length - 1];
    const opsi = opsiTeks(lambang(target), [lambang(terurut[1]), lambang(terurut[terurut.length - 2] ?? terurut[0])], r);
    return (<><CatatanPensil pendek="Ekstrem" teks="Pilih bilangan." /><PilihBertahap key={r} soal={[{ visual: <Numeral n={ro.angka.map(lambang).join(", ")} kelas="text-sm" />, tanya: ro.dari === "kecil" ? "Terkecil?" : "Terbesar?", opsi, jawab: opsi.indexOf(lambang(target)), petunjuk: "Urutkan mental.", pesan: lambang(target) }]} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b1b-qjns", "Pilih langkah.", RONDE_JENIS_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Langkah" teks="Strategi." /><PilihBertahap key={r} soal={RONDE_JENIS_CB[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Dari kiri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b1b-qu", "Urutkan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map((n) => lambang(n));
    const tampil = urutTampil(ro.angka.map((n) => lambang(n)), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b1b-qj", "Jodohkan notasi.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b1b-qm", "Memori notasi.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b1b-qbs", "Benar atau salah.", RONDE_BENARSALAH_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b1b-qd", "Detektif.", RONDE_DETEKTIF_QB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b1b-qpeta", "Peta konsep.", PETA_KONSEP_QB.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QB[r].pusat} kotak={PETA_KONSEP_QB[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b1b-qc", "Cerita angka.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Banding.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK5B1B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "⚖️", nama: "CONCRETE", cara: "Banding nyata!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B1B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram banding", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B1B(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Tanda & urut", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_B51} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />} />;
}
