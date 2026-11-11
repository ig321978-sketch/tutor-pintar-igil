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
  HURUF, RONDE_FAKTOR_CC, RONDE_PASANGAN_CC, RONDE_JENIS_CC, RONDE_SORTIR_CC, RONDE_PASANG_CC, RONDE_MEMORI_CC, RONDE_KETUK_CC, RONDE_SEMUA_CC, RONDE_CERITA_CC, RONDE_URUT_CC,
  RONDE_FAKTOR_PC, RONDE_PASANGAN_PC, RONDE_PASANG_PC, RONDE_MEMORI_PC, RONDE_TABEL_PC, RONDE_SEMUA_PC, RONDE_SORTIR_PC, RONDE_JENIS_PC, RONDE_BENARSALAH_QC, RONDE_DETEKTIF_QC, PETA_KONSEP_QC, RONDE_CERITA_QC,
  opsiTeks, urutTampil, urutanTetap,
} from "./data-k5b2";
import { visualInfografisK5B2C } from "./infografis-k5b2";
import { SUB_C52 } from "./naskah-k5b2";

const J = SUB_C52.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "ya", label: "Faktor", warna: "#BBF7D0" },
  { id: "tidak", label: "Bukan", warna: "#FECACA" },
];

export function InfografisK5B2CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C52} judul="Faktor" suaraInfo={SUARA_INFO} visual={visualInfografisK5B2C()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b2c-cek", "Cek faktor.", RONDE_FAKTOR_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cek" teks="Apakah faktor?" /><PilihBertahap key={r} soal={RONDE_FAKTOR_CC[r].map((s) => ({ visual: <Numeral n={`faktor ${s.n}`} />, tanya: `Apakah ${s.tanya} faktor ${s.n}?`, opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Bagi habis?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b2c-pasang", "Pasangan.", RONDE_PASANGAN_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pasangan" teks="Lengkapi pasangan." /><PilihBertahap key={r} soal={RONDE_PASANGAN_CC[r].map((s, i) => {
      const opsi = opsiTeks(String(s.b), [String(s.b + 1), String(Math.max(1, s.b - 1))], r * 2 + i);
      return { visual: <Numeral n={`${s.a} × ? = ${s.n}`} />, tanya: "Pasangan?", opsi, jawab: opsi.indexOf(String(s.b)), petunjuk: `${s.n} ÷ ${s.a}`, pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b2c-arti", "Arti.", RONDE_JENIS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b2c-sortir", "Pilah.", RONDE_SORTIR_CC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks={r === 0 ? "Faktor 12?" : r === 1 ? "Faktor 18?" : "Faktor 24?"} /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CC[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CC[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Bagi habis?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b2c-jodoh", "Jodohkan.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b2c-memori", "Memori.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b2c-ketuk", "Ketuk.", RONDE_KETUK_CC.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CC[r];
    return (<><IgilBicara pendek="Ketuk" teks={`Ketuk faktor ${ro.n}.`} /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${n}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: String(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b2c-semua", "Ketuk semua.", RONDE_SEMUA_CC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b2c-cerita", "Cerita.", RONDE_CERITA_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_CC[r].map((s) => ({ visual: <Numeral n="📏" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b2c-urut", "Urutkan.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b2c-pbagi", "Diagram bagi.", RONDE_FAKTOR_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Bagi" teks="Faktor?" /><PilihBertahap key={r} soal={RONDE_FAKTOR_PC[r].map((s) => ({ visual: <Numeral n={`${s.n} ÷ ${s.tanya}`} />, tanya: "Habis tanpa sisa?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Sisa?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b2c-ppasang", "Diagram pasangan.", RONDE_PASANGAN_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pasangan" teks="Lengkapi." /><PilihBertahap key={r} soal={RONDE_PASANGAN_PC[r].map((s, i) => {
      const opsi = opsiTeks(String(s.b), [String(s.b + 2), String(s.a)], r * 2 + i);
      return { visual: <Numeral n={`${s.a} ↔ ?  (${s.n})`} kelas="text-base" />, tanya: "Pasangan?", opsi, jawab: opsi.indexOf(String(s.b)), petunjuk: "Hasil kali.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b2c-pj", "Jodohkan.", RONDE_PASANG_PC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b2c-pm", "Memori.", RONDE_MEMORI_PC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b2c-pt", "Isi tabel.", RONDE_TABEL_PC.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi." /><PilihBertahap key={r} soal={RONDE_TABEL_PC[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b2c-ps", "Ketuk semua.", RONDE_SEMUA_PC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b2c-pl", "Pilah diagram.", RONDE_SORTIR_PC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Faktor atau bukan." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PC[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PC[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Bagi.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b2c-ppilih", "Pilih.", RONDE_JENIS_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b2c-parti", "Arti diagram.", RONDE_JENIS_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_PC[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b2c-pst", "Cerita.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b2c-qcek", "Tulis cek.", RONDE_FAKTOR_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cek" teks="Ya/tidak." /><PilihBertahap key={r} soal={RONDE_FAKTOR_CC[r].map((s) => ({ visual: <Numeral n={`${s.tanya} | ${s.n}?`} kelas="text-sm" />, tanya: "Faktor?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Bagi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b2c-qpasang", "Tulis pasangan.", RONDE_PASANGAN_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Pasangan" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_PASANGAN_CC[r].map((s, i) => {
      const opsi = opsiTeks(String(s.b), [String(s.b + 1), String(s.n - s.a)], r * 3 + i);
      return { visual: <Numeral n={`${s.a} × ? = ${s.n}`} />, tanya: "?", opsi, jawab: opsi.indexOf(String(s.b)), petunjuk: "Bagi.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b2c-qdef", "Definisi.", RONDE_JENIS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Definisi" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b2c-qu", "Urutkan.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b2c-qj", "Jodohkan.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b2c-qm", "Memori.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b2c-qbs", "Benar atau salah.", RONDE_BENARSALAH_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b2c-qd", "Detektif.", RONDE_DETEKTIF_QC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b2c-qpeta", "Peta konsep.", PETA_KONSEP_QC.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QC[r].pusat} kotak={PETA_KONSEP_QC[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b2c-qc", "Cerita.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK5B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "➗", nama: "CONCRETE", cara: "Cari faktor!", warna: "#166534" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram faktor", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi faktor", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_C52} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />} />;
}
