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
  HURUF, RONDE_PRIMA_CE, RONDE_FAKTORISASI_CE, RONDE_KPKFPB_CE, RONDE_JENIS_CE, RONDE_SORTIR_CE, RONDE_PASANG_CE, RONDE_MEMORI_CE, RONDE_KETUK_CE, RONDE_SEMUA_CE, RONDE_CERITA_CE, RONDE_URUT_CE,
  RONDE_PRIMA_PE, RONDE_FAKTORISASI_PE, RONDE_KPKFPB_PE, RONDE_PASANG_PE, RONDE_MEMORI_PE, RONDE_TABEL_PE, RONDE_SEMUA_PE, RONDE_SORTIR_PE, RONDE_JENIS_PE, RONDE_CERITA_PE, RONDE_BENARSALAH_QE, RONDE_DETEKTIF_QE, PETA_KONSEP_QE, RONDE_CERITA_QE,
  opsiTeks, urutTampil, urutanTetap,
} from "./data-k5b2";
import { visualInfografisK5B2E } from "./infografis-k5b2";
import { SUB_E52 } from "./naskah-k5b2";

const J = SUB_E52.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "ya", label: "Prima", warna: "#BBF7D0" },
  { id: "tidak", label: "Bukan", warna: "#FECACA" },
];
const fmt = (n: number) => (n >= 1000 ? n.toLocaleString("id-ID") : String(n));

export function InfografisK5B2EKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_E52} judul="Faktor Prima & KPK/FPB" suaraInfo={SUARA_INFO} visual={visualInfografisK5B2E()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b2e-prima", "Cek prima.", RONDE_PRIMA_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Prima" teks="Apakah bilangan prima?" /><PilihBertahap key={r} soal={RONDE_PRIMA_CE[r].map((s) => ({ visual: <Numeral n={s.n} />, tanya: `Apakah ${s.n} bilangan prima?`, opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Hanya 1 dan dirinya?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b2e-fakt", "Faktorisasi.", RONDE_FAKTORISASI_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Faktorisasi" teks="Pilih uraian prima." /><PilihBertahap key={r} soal={RONDE_FAKTORISASI_CE[r].map((s, i) => {
      const pengecoh = r === 0 ? ["2 × 6", "3 × 4"] : r === 1 ? ["14 × 14", "2 × 98"] : ["2 × 30", "4 × 15"];
      const opsi = opsiTeks(s.teks, pengecoh, r * 2 + i);
      return { visual: <Numeral n={s.n} />, tanya: "Faktorisasi prima?", opsi, jawab: opsi.indexOf(s.teks), petunjuk: "Urai sampai prima.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b2e-kpkfpb", "KPK & FPB prima.", RONDE_KPKFPB_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="KPK FPB" teks="Pakai faktorisasi." /><PilihBertahap key={r} soal={RONDE_KPKFPB_CE[r].map((s, i) => {
      const benar = fmt(s.hasil);
      const opsi = opsiTeks(benar, [fmt(s.hasil === 1800 ? 6 : s.hasil * 2), fmt(s.a)], r * 2 + i);
      return { visual: <Numeral n={`${s.jenis}(${s.a},${s.b})`} kelas="text-sm" />, tanya: `${s.jenis}?`, opsi, jawab: opsi.indexOf(benar), petunjuk: s.jenis === "FPB" ? "Pangkat min." : "Pangkat max.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b2e-arti", "Arti.", RONDE_JENIS_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_JENIS_CE[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b2e-sortir", "Pilah.", RONDE_SORTIR_CE.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Prima atau bukan?" /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CE[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CE[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "1 dan dirinya?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b2e-jodoh", "Jodohkan.", RONDE_PASANG_CE.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CE[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b2e-memori", "Memori.", RONDE_MEMORI_CE.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CE[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b2e-ketuk", "Ketuk.", RONDE_KETUK_CE.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CE[r];
    return (<><IgilBicara pendek="Ketuk" teks={r === 2 ? "Ketuk hasil KPK/FPB." : "Ketuk bilangan prima."} /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n >= 1000 ? fmt(n) : n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${n >= 1000 ? fmt(n) : n}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: String(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b2e-semua", "Ketuk semua.", RONDE_SEMUA_CE.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CE[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b2e-cerita", "Cerita.", RONDE_CERITA_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_CE[r].map((s) => ({ visual: <Numeral n="🌳" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b2e-psaring", "Diagram saringan.", RONDE_PRIMA_PE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Saringan" teks="Prima?" /><PilihBertahap key={r} soal={RONDE_PRIMA_PE[r].map((s) => ({ visual: <Numeral n={`saring ${s.n}`} />, tanya: "Lolos saringan?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Prima?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b2e-ppohon", "Diagram pohon.", RONDE_FAKTORISASI_PE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pohon" teks="Uraian?" /><PilihBertahap key={r} soal={RONDE_FAKTORISASI_PE[r].map((s, i) => {
      const pengecoh = ["2 × 6", "3 × 4"];
      const opsi = opsiTeks(s.teks, pengecoh, r * 5 + i);
      return { visual: <Numeral n={`pohon ${s.n}`} kelas="text-sm" />, tanya: "Faktorisasi?", opsi, jawab: opsi.indexOf(s.teks), petunjuk: "Prima saja.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b2e-pkpkfpb", "Diagram KPK/FPB.", RONDE_KPKFPB_PE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="KPK FPB" teks="Hasil?" /><PilihBertahap key={r} soal={RONDE_KPKFPB_PE[r].map((s, i) => {
      const benar = fmt(s.hasil);
      const opsi = opsiTeks(benar, [fmt(s.hasil === 6 ? 1800 : s.b), fmt(s.a + s.b)], r * 4 + i);
      return { visual: <Numeral n={`${s.jenis}(${s.a},${s.b})`} kelas="text-sm" />, tanya: "Hasil?", opsi, jawab: opsi.indexOf(benar), petunjuk: "Prima.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b2e-pj", "Jodohkan.", RONDE_PASANG_PE.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PE[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b2e-pm", "Memori.", RONDE_MEMORI_PE.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PE[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b2e-pt", "Isi tabel.", RONDE_TABEL_PE.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi." /><PilihBertahap key={r} soal={RONDE_TABEL_PE[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b2e-ps", "Ketuk semua.", RONDE_SEMUA_PE.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PE[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b2e-pl", "Pilah diagram.", RONDE_SORTIR_PE.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Prima atau bukan." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PE[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PE[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} />, bin: s.bin, petunjuk: "Prima?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b2e-ppilih", "Pilih.", RONDE_JENIS_PE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PE[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b2e-pst", "Cerita.", RONDE_CERITA_PE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_PE[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b2e-qprima", "Tulis cek prima.", RONDE_PRIMA_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Prima" teks="Ya/tidak." /><PilihBertahap key={r} soal={RONDE_PRIMA_CE[r].map((s) => ({ visual: <Numeral n={`${s.n} prima?`} kelas="text-sm" />, tanya: "Jawaban?", opsi: ["ya", "tidak", "tidak tahu"], jawab: ["ya", "tidak", "tidak tahu"].indexOf(s.ya ? "ya" : "tidak"), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b2e-qfakt", "Tulis faktorisasi.", RONDE_FAKTORISASI_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Faktorisasi" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_FAKTORISASI_CE[r].map((s, i) => {
      const opsi = opsiTeks(s.teks, ["2 × 6", "3 × 4"], r * 7 + i);
      return { visual: <Numeral n={s.n} />, tanya: "Uraian?", opsi, jawab: opsi.indexOf(s.teks), petunjuk: "Prima.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b2e-qkpkfpb", "Tulis KPK/FPB.", RONDE_KPKFPB_CE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="KPK FPB" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_KPKFPB_CE[r].map((s, i) => {
      const benar = fmt(s.hasil);
      const opsi = opsiTeks(benar, [fmt(s.hasil === 1800 ? 222 : s.hasil + 1), fmt(s.b)], r * 8 + i);
      return { visual: <Numeral n={`${s.jenis}(${s.a},${s.b})`} kelas="text-sm" />, tanya: "Hasil?", opsi, jawab: opsi.indexOf(benar), petunjuk: "Prima.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b2e-qu", "Urutkan.", RONDE_URUT_CE.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CE[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id === "1800" ? "1.800" : id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b2e-qj", "Jodohkan.", RONDE_PASANG_CE.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CE[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b2e-qm", "Memori.", RONDE_MEMORI_CE.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CE[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b2e-qbs", "Benar atau salah.", RONDE_BENARSALAH_QE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QE[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b2e-qd", "Detektif.", RONDE_DETEKTIF_QE.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QE[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b2e-qpeta", "Peta konsep.", PETA_KONSEP_QE.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QE[r].pusat} kotak={PETA_KONSEP_QE[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b2e-qc", "Cerita.", RONDE_CERITA_QE.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QE[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK5B2E(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "✨", nama: "CONCRETE", cara: "Prima & pohon!", warna: "#166534" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B2E(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram prima", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B2E(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi prima", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_E52} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB E ➡️" />} />;
}
