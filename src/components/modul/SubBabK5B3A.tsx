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
  HURUF, RONDE_BANDING_CA, RONDE_CAMPURAN_CA, RONDE_JENIS_CA, RONDE_SORTIR_CA, RONDE_PASANG_CA, RONDE_MEMORI_CA, RONDE_KETUK_CA, RONDE_SEMUA_CA, RONDE_CERITA_CA, RONDE_URUT_CA,
  RONDE_BANDING_PA, RONDE_CAMPURAN_PA, RONDE_PASANG_PA, RONDE_MEMORI_PA, RONDE_TABEL_PA, RONDE_SEMUA_PA, RONDE_SORTIR_PA, RONDE_JENIS_PA, RONDE_CERITA_PA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, PETA_KONSEP_QA, RONDE_CERITA_QA,
  opsiTeks, urutTampil, urutanTetap,
} from "./data-k5b3";
import { visualInfografisK5B3A } from "./infografis-k5b3";
import { SUB_A53 } from "./naskah-k5b3";

const J = SUB_A53.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "besar", label: "Lebih besar", warna: "#BBF7D0" },
  { id: "kecil", label: "Lebih kecil", warna: "#FECACA" },
];

export function InfografisK5B3AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A53} judul="Banding & Urut Pecahan" suaraInfo={SUARA_INFO} visual={visualInfografisK5B3A()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b3a-banding", "Bandingkan.", RONDE_BANDING_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Banding" teks="Pilih tanda yang tepat." /><PilihBertahap key={r} soal={RONDE_BANDING_CA[r].map((s) => ({ visual: <Numeral n={`${s.a} ? ${s.b}`} />, tanya: "Tanda?", opsi: ["<", ">", "="], jawab: ["<", ">", "="].indexOf(s.tanda), petunjuk: "Banding nilai.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b3a-campur", "Campuran.", RONDE_CAMPURAN_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Campuran" teks="Ubah ke pecahan biasa." /><PilihBertahap key={r} soal={RONDE_CAMPURAN_CA[r].map((s, i) => {
      const opsi = opsiTeks(s.biasa, [s.biasa === "11/4" ? "6/4" : "5/2", s.biasa === "7/2" ? "4/2" : "9/4"], r * 2 + i);
      return { visual: <Numeral n={s.campuran} />, tanya: "Bentuk biasa?", opsi, jawab: opsi.indexOf(s.biasa), petunjuk: "(bulat×q)+p.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b3a-arti", "Arti.", RONDE_JENIS_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b3a-sortir", "Pilah.", RONDE_SORTIR_CA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks={r === 0 ? "Lebih besar dari 1/4 ke bin Besar." : r === 1 ? "Lebih besar dari 4/8 ke bin Besar." : "Lebih besar dari 1 ke bin Besar."} /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_CA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CA[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-base" />, bin: s.bin, petunjuk: "Banding nilai.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b3a-jodoh", "Jodohkan.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b3a-memori", "Memori.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b3a-ketuk", "Ketuk.", RONDE_KETUK_CA.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk pecahan yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: n, label: `P${HURUF[i]}`, isi: <Numeral n={n} kelas="text-base" /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${n}.`, jawab: n, petunjuk: "Cocokkan.", pesan: n }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b3a-semua", "Ketuk semua.", RONDE_SEMUA_CA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b3a-cerita", "Cerita.", RONDE_CERITA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_CA[r].map((s) => ({ visual: <Numeral n="🏃" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b3a-urut", "Urutkan.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const tampil = urutTampil(ro.daftar, ro.kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={ro.kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b3a-pbanding", "Diagram banding.", RONDE_BANDING_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Banding" teks="Tanda?" /><PilihBertahap key={r} soal={RONDE_BANDING_PA[r].map((s) => ({ visual: <Numeral n={`${s.a} □ ${s.b}`} kelas="text-sm" />, tanya: "Isi tanda.", opsi: ["<", ">", "="], jawab: ["<", ">", "="].indexOf(s.tanda), petunjuk: "Nilai.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b3a-pcampur", "Diagram campuran.", RONDE_CAMPURAN_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Campuran" teks="Bentuk biasa?" /><PilihBertahap key={r} soal={RONDE_CAMPURAN_PA[r].map((s, i) => {
      const opsi = opsiTeks(s.biasa, ["5/4", "9/2"], r * 3 + i);
      return { visual: <Numeral n={s.campuran} />, tanya: "?", opsi, jawab: opsi.indexOf(s.biasa), petunjuk: "Ubah.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b3a-pj", "Jodohkan.", RONDE_PASANG_PA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b3a-pm", "Memori.", RONDE_MEMORI_PA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b3a-pt", "Isi tabel.", RONDE_TABEL_PA.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi." /><PilihBertahap key={r} soal={RONDE_TABEL_PA[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b3a-ps", "Ketuk semua.", RONDE_SEMUA_PA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b3a-pl", "Pilah diagram.", RONDE_SORTIR_PA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Besar atau kecil." /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PA[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-base" />, bin: s.bin, petunjuk: "Nilai.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b3a-ppilih", "Pilih.", RONDE_JENIS_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b3a-parti", "Arti diagram.", RONDE_JENIS_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_PA[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b3a-pst", "Cerita.", RONDE_CERITA_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_PA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b3a-qbanding", "Tulis tanda.", RONDE_BANDING_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tanda" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_BANDING_CA[r].map((s) => ({ visual: <Numeral n={`${s.a} ? ${s.b}`} kelas="text-sm" />, tanya: "Tanda?", opsi: ["<", ">", "="], jawab: ["<", ">", "="].indexOf(s.tanda), petunjuk: "Nilai.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b3a-qcampur", "Tulis biasa.", RONDE_CAMPURAN_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Biasa" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_CAMPURAN_CA[r].map((s, i) => {
      const opsi = opsiTeks(s.biasa, ["5/4", "9/2"], r * 4 + i);
      return { visual: <Numeral n={s.campuran} />, tanya: "?", opsi, jawab: opsi.indexOf(s.biasa), petunjuk: "Ubah.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b3a-qdef", "Definisi.", RONDE_JENIS_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Definisi" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b3a-qu", "Urutkan.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const tampil = urutTampil(ro.daftar, ro.kunci, r + 1);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={ro.kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b3a-qj", "Jodohkan.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b3a-qm", "Memori.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b3a-qbs", "Benar atau salah.", RONDE_BENARSALAH_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b3a-qd", "Detektif.", RONDE_DETEKTIF_QA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b3a-qpeta", "Peta konsep.", PETA_KONSEP_QA.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QA[r].pusat} kotak={PETA_KONSEP_QA[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b3a-qc", "Cerita.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK5B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "⚖️", nama: "CONCRETE", cara: "Banding pecahan!", warna: "#166534" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram banding", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi pecahan", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_A53} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />} />;
}
