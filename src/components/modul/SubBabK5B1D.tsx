"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, PetaKonsepGame } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk } from "./mesin-k2b6";
import {
  HURUF, RONDE_TAMBAH_CD, RONDE_KURANG_CD, RONDE_KALI_CD, RONDE_BAGI_CD, RONDE_PASANG_CD, RONDE_MEMORI_CD, RONDE_KETUK_CD, RONDE_SEMUA_CD, RONDE_CERITA_CD, RONDE_URUT_CD,
  RONDE_TAMBAH_PD, RONDE_KURANG_PD, RONDE_KALI_PD, RONDE_BAGI_PD, RONDE_PASANG_PD, RONDE_MEMORI_PD, RONDE_TABEL_PD, RONDE_SEMUA_PD, RONDE_CERITA_PD, RONDE_BENARSALAH_QD, RONDE_DETEKTIF_QD, PETA_KONSEP_QD, RONDE_CERITA_QD,
  opsiTeks, urutTampil, urutanTetap, lambang,
} from "./data-k5b1";
import { buatKartu, Numeral } from "./bantu-k5b1";
import { visualInfografisK5B1D } from "./infografis-k5b1";
import { SUB_D51 } from "./naskah-k5b1";

const J = SUB_D51.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";

export function InfografisK5B1DKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_D51} judul="Operasi Hitung sampai 100.000" suaraInfo={SUARA_INFO} visual={visualInfografisK5B1D()} speakGuru={speakGuru} />;
}

function soalHasil(ronde: { a: number; b: number; hasil: number; pesan: string }[], op: string, r: number) {
  return ronde.map((s, i) => {
    const opsi = opsiTeks(lambang(s.hasil), [lambang(s.hasil + 1000), lambang(Math.max(0, s.hasil - 2000))], r * 2 + i);
    return { visual: <Numeral n={`${lambang(s.a)} ${op} ${lambang(s.b)}`} kelas="text-base" />, tanya: "Hasil?", opsi, jawab: opsi.indexOf(lambang(s.hasil)), petunjuk: "Hitung teliti.", pesan: s.pesan };
  });
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b1d-tambah", "Jumlahkan.", RONDE_TAMBAH_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Tambah" teks="Jumlahkan." /><PilihBertahap key={r} soal={soalHasil(RONDE_TAMBAH_CD[r], "+", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b1d-kurang", "Kurangkan.", RONDE_KURANG_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Kurang" teks="Cari sisa." /><PilihBertahap key={r} soal={soalHasil(RONDE_KURANG_CD[r], "−", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b1d-kali", "Kalikan.", RONDE_KALI_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Kali" teks="Gandakan." /><PilihBertahap key={r} soal={soalHasil(RONDE_KALI_CD[r], "×", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b1d-bagi", "Bagi.", RONDE_BAGI_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Bagi" teks="Bagi rata." /><PilihBertahap key={r} soal={soalHasil(RONDE_BAGI_CD[r], "÷", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b1d-jodoh", "Jodohkan.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b1d-memori", "Memori.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b1d-ketuk", "Ketuk hasil.", RONDE_KETUK_CD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CD[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk hasil yang diminta." /><KetukPilih key={r} kolom={2} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${lambang(n)}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b1d-semua", "Ketuk semua.", RONDE_SEMUA_CD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CD[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b1d-cerita", "Cerita.", RONDE_CERITA_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CD[r].map((s) => ({ visual: <Numeral n="🛒" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Pilih operasi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b1d-urut", "Urutkan.", RONDE_URUT_CD.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CD[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map((n) => lambang(n));
    const tampil = urutTampil(ro.angka.map((n) => lambang(n)), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan hasil." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b1d-ptambah", "Diagram +.", RONDE_TAMBAH_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tambah" teks="Jumlahkan." /><PilihBertahap key={r} soal={soalHasil(RONDE_TAMBAH_PD[r], "+", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b1d-pkurang", "Diagram −.", RONDE_KURANG_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Kurang" teks="Kurangkan." /><PilihBertahap key={r} soal={soalHasil(RONDE_KURANG_PD[r], "−", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b1d-pkali", "Diagram ×.", RONDE_KALI_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Kali" teks="Kalikan." /><PilihBertahap key={r} soal={soalHasil(RONDE_KALI_PD[r], "×", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b1d-pbagi", "Diagram ÷.", RONDE_BAGI_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Bagi" teks="Bagikan." /><PilihBertahap key={r} soal={soalHasil(RONDE_BAGI_PD[r], "÷", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b1d-pj", "Jodoh diagram.", RONDE_PASANG_PD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PD[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b1d-pm", "Memori diagram.", RONDE_MEMORI_PD.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PD[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b1d-pt", "Tabel operasi.", RONDE_TABEL_PD.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi jawaban." /><PilihBertahap key={r} soal={RONDE_TABEL_PD[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b1d-ps", "Ketuk semua.", RONDE_SEMUA_PD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PD[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b1d-ppilih", "Pilih kalimat.", RONDE_TABEL_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_TABEL_PD[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Hasil?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Operasi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b1d-pst", "Cerita diagram.", RONDE_CERITA_PD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_PD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b1d-qjml", "Tulis jumlah.", RONDE_TAMBAH_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Jumlah" teks="Pilih hasil." /><PilihBertahap key={r} soal={soalHasil(RONDE_TAMBAH_CD[r], "+", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b1d-qsisa", "Tulis sisa.", RONDE_KURANG_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Sisa" teks="Pilih hasil." /><PilihBertahap key={r} soal={soalHasil(RONDE_KURANG_CD[r], "−", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b1d-qkali", "Tulis kali.", RONDE_KALI_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Kali" teks="Pilih hasil." /><PilihBertahap key={r} soal={soalHasil(RONDE_KALI_CD[r], "×", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b1d-qbagi", "Tulis bagi.", RONDE_BAGI_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Bagi" teks="Pilih hasil." /><PilihBertahap key={r} soal={soalHasil(RONDE_BAGI_CD[r], "÷", r)} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b1d-qj", "Jodohkan notasi.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b1d-qm", "Memori notasi.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b1d-qbs", "Benar atau salah.", RONDE_BENARSALAH_QD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QD[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b1d-qd", "Detektif.", RONDE_DETEKTIF_QD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QD[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b1d-qpeta", "Peta konsep.", PETA_KONSEP_QD.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QD[r].pusat} kotak={PETA_KONSEP_QD[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b1d-qc", "Cerita angka.", RONDE_CERITA_QD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK5B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧮", nama: "CONCRETE", cara: "Hitung nyata!", warna: "#92400E" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram operasi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi operasi", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_D51} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB D ➡️" />} />;
}
