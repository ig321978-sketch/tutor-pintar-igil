"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, PetaKonsepGame, Sortir } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk } from "./mesin-k2b6";
import { buatKartu, Numeral } from "./bantu-k5b2";

import {
  HURUF, RONDE_PERSEKUTUAN_CD, RONDE_FPB_CD, RONDE_JENIS_CD, RONDE_SORTIR_CD, RONDE_PASANG_CD, RONDE_MEMORI_CD, RONDE_KETUK_CD, RONDE_SEMUA_CD, RONDE_CERITA_CD, RONDE_URUT_CD,
  RONDE_PERSEKUTUAN_PD, RONDE_FPB_PD, RONDE_PASANG_PD, RONDE_MEMORI_PD, RONDE_TABEL_PD, RONDE_SEMUA_PD, RONDE_SORTIR_PD, RONDE_JENIS_PD, RONDE_CERITA_PD, RONDE_BENARSALAH_QD, RONDE_DETEKTIF_QD, PETA_KONSEP_QD, RONDE_CERITA_QD,
  opsiTeks, urutTampil, urutanTetap,
} from "./data-k5b2";
import { visualInfografisK5B2D } from "./infografis-k5b2";
import { SUB_D52 } from "./naskah-k5b2";

const J = SUB_D52.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "sama", label: "Persekutuan", warna: "#BBF7D0" },
  { id: "beda", label: "Bukan", warna: "#FECACA" },
];
const fmt = (n: number) => (n >= 1000 ? n.toLocaleString("id-ID") : String(n));

export function InfografisK5B2DKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_D52} judul="Faktor Persekutuan & FPB" suaraInfo={SUARA_INFO} visual={visualInfografisK5B2D()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b2d-pers", "Cek persekutuan.", RONDE_PERSEKUTUAN_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Irisan" teks="Apakah faktor keduanya?" /><PilihBertahap key={r} soal={RONDE_PERSEKUTUAN_CD[r].map((s) => ({ visual: <Numeral n={`${s.a} & ${s.b}`} />, tanya: `Apakah ${s.n} faktor persekutuan?`, opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Irisan faktor.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b2d-fpb", "Hitung FPB.", RONDE_FPB_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="FPB" teks="Cari yang terbesar." /><PilihBertahap key={r} soal={RONDE_FPB_CD[r].map((s, i) => {
      const benar = fmt(s.hasil);
      const opsi = opsiTeks(benar, [fmt(s.hasil + s.angka[0]), fmt(Math.max(1, s.hasil - 1))], r * 2 + i);
      return { visual: <Numeral n={s.angka.join(" & ")} />, tanya: "FPB?", opsi, jawab: opsi.indexOf(benar), petunjuk: "Irisan terbesar.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b2d-arti", "Arti.", RONDE_JENIS_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b2d-sortir", "Pilah.", RONDE_SORTIR_CD.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks={r === 0 ? "Persekutuan 12 & 18?" : r === 1 ? "Persekutuan 6 & 12?" : "Persekutuan 24 & 18?"} /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CD[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CD[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Irisan?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b2d-jodoh", "Jodohkan.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b2d-memori", "Memori.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b2d-ketuk", "Ketuk.", RONDE_KETUK_CD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CD[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk faktor persekutuan." /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${n}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: String(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b2d-semua", "Ketuk semua.", RONDE_SEMUA_CD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CD[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b2d-cerita", "Cerita.", RONDE_CERITA_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_CD[r].map((s) => ({ visual: <Numeral n="🌸" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b2d-urut", "Urutkan.", RONDE_URUT_CD.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CD[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b2d-ppers", "Diagram persekutuan.", RONDE_PERSEKUTUAN_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Irisan" teks="Cek." /><PilihBertahap key={r} soal={RONDE_PERSEKUTUAN_PD[r].map((s) => ({ visual: <Numeral n={`${s.n} ? (${s.a},${s.b})`} kelas="text-sm" />, tanya: "Faktor persekutuan?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Irisan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b2d-pfpb", "Diagram FPB.", RONDE_FPB_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="FPB" teks="Hasil?" /><PilihBertahap key={r} soal={RONDE_FPB_PD[r].map((s, i) => {
      const benar = fmt(s.hasil);
      const opsi = opsiTeks(benar, [fmt(s.hasil * 2), fmt(Math.max(1, s.hasil - 2))], r * 2 + i);
      return { visual: <Numeral n={s.angka.join(" & ")} />, tanya: "FPB?", opsi, jawab: opsi.indexOf(benar), petunjuk: "Terbesar.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b2d-pj", "Jodohkan.", RONDE_PASANG_PD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PD[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b2d-pm", "Memori.", RONDE_MEMORI_PD.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PD[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b2d-pt", "Isi tabel.", RONDE_TABEL_PD.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi." /><PilihBertahap key={r} soal={RONDE_TABEL_PD[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b2d-ps", "Ketuk semua.", RONDE_SEMUA_PD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PD[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b2d-pl", "Pilah diagram.", RONDE_SORTIR_PD.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Sama atau beda." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PD[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PD[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Irisan?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b2d-ppilih", "Pilih.", RONDE_JENIS_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b2d-parti", "Arti diagram.", RONDE_JENIS_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_PD[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b2d-pst", "Cerita.", RONDE_CERITA_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_PD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b2d-qpers", "Tulis cek.", RONDE_PERSEKUTUAN_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cek" teks="Ya/tidak." /><PilihBertahap key={r} soal={RONDE_PERSEKUTUAN_CD[r].map((s) => ({ visual: <Numeral n={`${s.n} ∈ fak(${s.a})∩fak(${s.b})?`} kelas="text-sm" />, tanya: "Jawaban?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Irisan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b2d-qfpb", "Tulis FPB.", RONDE_FPB_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="FPB" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_FPB_CD[r].map((s, i) => {
      const benar = fmt(s.hasil);
      const opsi = opsiTeks(benar, [fmt(s.hasil + 2), fmt(s.angka[0])], r * 3 + i);
      return { visual: <Numeral n={`FPB(${s.angka.join(",")})`} kelas="text-sm" />, tanya: "Hasil?", opsi, jawab: opsi.indexOf(benar), petunjuk: "Terbesar.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b2d-qdef", "Definisi.", RONDE_JENIS_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Definisi" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b2d-qu", "Urutkan.", RONDE_URUT_CD.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CD[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b2d-qj", "Jodohkan.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b2d-qm", "Memori.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b2d-qbs", "Benar atau salah.", RONDE_BENARSALAH_QD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QD[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b2d-qd", "Detektif.", RONDE_DETEKTIF_QD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QD[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b2d-qpeta", "Peta konsep.", PETA_KONSEP_QD.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QD[r].pusat} kotak={PETA_KONSEP_QD[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b2d-qc", "Cerita.", RONDE_CERITA_QD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK5B2D(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🏆", nama: "CONCRETE", cara: "Cari FPB!", warna: "#166534" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B2D(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram FPB", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B2D(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi FPB", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_D52} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB D ➡️" />} />;
}
