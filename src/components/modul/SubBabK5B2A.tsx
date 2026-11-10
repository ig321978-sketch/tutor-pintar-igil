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
  HURUF, RONDE_KELIPATAN_CA, RONDE_LANJUT_CA, RONDE_JENIS_CA, RONDE_SORTIR_CA, RONDE_PASANG_CA, RONDE_MEMORI_CA, RONDE_KETUK_CA, RONDE_SEMUA_CA, RONDE_CERITA_CA, RONDE_URUT_CA,
  RONDE_KELIPATAN_PA, RONDE_LANJUT_PA, RONDE_PASANG_PA, RONDE_MEMORI_PA, RONDE_TABEL_PA, RONDE_SEMUA_PA, RONDE_SORTIR_PA, RONDE_JENIS_PA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, PETA_KONSEP_QA, RONDE_CERITA_QA,
  opsiTeks, urutTampil, urutanTetap,
} from "./data-k5b2";
import { buatKartu, Numeral } from "./bantu-k5b2";
import { visualInfografisK5B2A } from "./infografis-k5b2";
import { SUB_A52 } from "./naskah-k5b2";

const J = SUB_A52.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";

const BIN = [
  { id: "ya", label: "Kelipatan", warna: "#BBF7D0" },
  { id: "tidak", label: "Bukan", warna: "#FECACA" },
];

export function InfografisK5B2AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A52} judul="Kelipatan" suaraInfo={SUARA_INFO} visual={visualInfografisK5B2A()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b2a-cek", "Cek kelipatan.", RONDE_KELIPATAN_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cek" teks="Apakah kelipatan?" /><PilihBertahap key={r} soal={RONDE_KELIPATAN_CA[r].map((s) => ({ visual: <Numeral n={`kelipatan ${s.dari}`} kelas="text-base" />, tanya: `Apakah ${s.tanya} kelipatan ${s.dari}?`, opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Bagi habis?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b2a-lanjut", "Lanjutkan.", RONDE_LANJUT_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Lanjut" teks="Lanjutkan barisan." /><PilihBertahap key={r} soal={RONDE_LANJUT_CA[r].map((s, i) => {
      const opsi = opsiTeks(String(s.lanjut), [String(s.lanjut + 1), String(s.lanjut - s.dari)], r * 2 + i);
      return { visual: <Numeral n={s.awal.join(", ") + ", …"} kelas="text-base" />, tanya: "Lanjutan?", opsi, jawab: opsi.indexOf(String(s.lanjut)), petunjuk: `Tambah ${s.dari}.`, pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b2a-arti", "Arti.", RONDE_JENIS_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Arti" teks="Pilih jawaban." /><PilihBertahap key={r} soal={RONDE_JENIS_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b2a-sortir", "Pilah.", RONDE_SORTIR_CA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks={r === 0 ? "Kelipatan 3?" : r === 1 ? "Kelipatan 7?" : "Kelipatan 9?"} /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CA[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Bagi habis?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b2a-jodoh", "Jodohkan.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b2a-memori", "Memori.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b2a-ketuk", "Ketuk.", RONDE_KETUK_CA.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (<><IgilBicara pendek="Ketuk" teks={`Ketuk kelipatan ${ro.dari}.`} /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${n}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: String(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b2a-semua", "Ketuk semua.", RONDE_SEMUA_CA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b2a-cerita", "Cerita.", RONDE_CERITA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_CA[r].map((s) => ({ visual: <Numeral n="👏" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Kelipatan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b2a-urut", "Urutkan.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b2a-ptabel", "Tabel.", RONDE_TABEL_PA.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi." /><PilihBertahap key={r} soal={RONDE_TABEL_PA[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Kelipatan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b2a-planjut", "Diagram lanjut.", RONDE_LANJUT_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Lanjut" teks="Lanjutkan." /><PilihBertahap key={r} soal={RONDE_LANJUT_PA[r].map((s, i) => {
      const opsi = opsiTeks(String(s.lanjut), [String(s.lanjut + 2), String(Math.max(0, s.lanjut - s.dari))], r * 2 + i);
      return { visual: <Numeral n={s.awal.join(" → ")} kelas="text-base" />, tanya: "Berikutnya?", opsi, jawab: opsi.indexOf(String(s.lanjut)), petunjuk: `+${s.dari}`, pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b2a-pj", "Jodoh diagram.", RONDE_PASANG_PA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b2a-pm", "Memori diagram.", RONDE_MEMORI_PA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b2a-pcek", "Cek diagram.", RONDE_KELIPATAN_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cek" teks="Kelipatan?" /><PilihBertahap key={r} soal={RONDE_KELIPATAN_PA[r].map((s) => ({ visual: <Numeral n={`${s.tanya} ? kelipatan ${s.dari}`} kelas="text-sm" />, tanya: "Hasil?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Bagi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b2a-ps", "Ketuk semua.", RONDE_SEMUA_PA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b2a-pl", "Pilah diagram.", RONDE_SORTIR_PA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Ya atau tidak." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PA[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Cek.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b2a-ppilih", "Pilih.", RONDE_JENIS_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b2a-parti", "Arti diagram.", RONDE_JENIS_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_PA[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b2a-pst", "Cerita diagram.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Kelipatan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b2a-qcek", "Tulis cek.", RONDE_KELIPATAN_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cek" teks="Ya atau tidak." /><PilihBertahap key={r} soal={RONDE_KELIPATAN_CA[r].map((s) => ({ visual: <Numeral n={`${s.tanya} kelipatan ${s.dari}?`} kelas="text-sm" />, tanya: "Jawaban?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Bagi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b2a-qlanjut", "Tulis lanjut.", RONDE_LANJUT_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Lanjut" teks="Pilih angka." /><PilihBertahap key={r} soal={RONDE_LANJUT_CA[r].map((s, i) => {
      const opsi = opsiTeks(String(s.lanjut), [String(s.lanjut + s.dari), String(s.lanjut - 1)], r * 3 + i);
      return { visual: <Numeral n={s.awal.join(", ")} kelas="text-base" />, tanya: "Berikutnya?", opsi, jawab: opsi.indexOf(String(s.lanjut)), petunjuk: `+${s.dari}`, pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b2a-qdef", "Definisi.", RONDE_JENIS_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Definisi" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b2a-qu", "Urutkan.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b2a-qj", "Jodohkan notasi.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b2a-qm", "Memori notasi.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b2a-qbs", "Benar atau salah.", RONDE_BENARSALAH_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b2a-qd", "Detektif.", RONDE_DETEKTIF_QA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b2a-qpeta", "Peta konsep.", PETA_KONSEP_QA.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QA[r].pusat} kotak={PETA_KONSEP_QA[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b2a-qc", "Cerita angka.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Kelipatan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK5B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "👏", nama: "CONCRETE", cara: "Tepuk kelipatan!", warna: "#9A3412" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Tabel & diagram", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi kelipatan", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_A52} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />} />;
}
