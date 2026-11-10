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
  HURUF, RONDE_HITUNG_CC, RONDE_RUMUS_CC, RONDE_SORTIR_CC, RONDE_PASANG_CC, RONDE_MEMORI_CC, RONDE_KETUK_CC, RONDE_SEMUA_CC, RONDE_CERITA_CC, RONDE_URUT_CC,
  RONDE_HITUNG_PC, RONDE_RUMUS_PC, RONDE_PASANG_PC, RONDE_MEMORI_PC, RONDE_TABEL_PC, RONDE_SEMUA_PC, RONDE_SORTIR_PC, RONDE_CERITA_PC, RONDE_BENARSALAH_QC, RONDE_DETEKTIF_QC, PETA_KONSEP_QC, RONDE_CERITA_QC,
  opsiAngka, urutTampil, urutanTetap,
} from "./data-k5b4";
import { visualInfografisK5B4C } from "./infografis-k5b4";
import { SUB_C54 } from "./naskah-k5b4";

const J = SUB_C54.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [{ id: "pp", label: "PP", warna: "#BBF7D0" }, { id: "persegi", label: "Persegi", warna: "#BFDBFE" }];

export function InfografisK5B4CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C54} judul="Keliling Segi Empat" suaraInfo={SUARA_INFO} visual={visualInfografisK5B4C()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b4c-hitung", "Hitung.", RONDE_HITUNG_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Hitung" teks="Hitung keliling." /><PilihBertahap key={r} soal={RONDE_HITUNG_CC[r].map((s, i) => {
      const opsi = opsiAngka(s.hasil, r * 2 + i);
      return { visual: <Numeral n={s.jenis === "persegi" ? ("sisi " + s.a) : ("p=" + s.a + " l=" + s.b)} kelas="text-base" />, tanya: "Keliling?", opsi, jawab: opsi.indexOf(String(s.hasil)), petunjuk: "2(p+l) atau 4×s.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b4c-arti", "Rumus.", RONDE_RUMUS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Rumus" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_RUMUS_CC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat rumus/definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b4c-pilih", "Pilih.", RONDE_RUMUS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilih" teks="Pilih jawaban." /><PilihBertahap key={r} soal={RONDE_RUMUS_CC[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b4c-sortir", "Pilah.", RONDE_SORTIR_CC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks={"Persegi panjang atau persegi?"} /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_CC[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CC[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-sm" />, bin: s.bin, petunjuk: "Pilah.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b4c-jodoh", "Jodohkan.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b4c-memori", "Memori.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b4c-ketuk", "Ketuk.", RONDE_KETUK_CC.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CC[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk hasil yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${n}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: String(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b4c-semua", "Ketuk semua.", RONDE_SEMUA_CC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b4c-cerita", "Cerita.", RONDE_CERITA_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_CC[r].map((s) => ({ visual: <Numeral n="📏" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b4c-urut", "Urutkan.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b4c-phitung", "Diagram hitung.", RONDE_HITUNG_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Hitung" teks="Keliling?" /><PilihBertahap key={r} soal={RONDE_HITUNG_PC[r].map((s, i) => {
      const opsi = opsiAngka(s.hasil, r * 2 + i);
      return { visual: <Numeral n={s.jenis === "persegi" ? ("sisi " + s.a) : ("p=" + s.a + " l=" + s.b)} kelas="text-base" />, tanya: "Keliling?", opsi, jawab: opsi.indexOf(String(s.hasil)), petunjuk: "2(p+l) atau 4×s.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b4c-parti", "Diagram arti.", RONDE_RUMUS_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_RUMUS_PC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b4c-pj", "Jodoh diagram.", RONDE_PASANG_PC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b4c-pm", "Memori diagram.", RONDE_MEMORI_PC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b4c-pt", "Isi tabel.", RONDE_TABEL_PC.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi." /><PilihBertahap key={r} soal={RONDE_TABEL_PC[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b4c-ps", "Ketuk semua.", RONDE_SEMUA_PC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b4c-pl", "Pilah diagram.", RONDE_SORTIR_PC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks={"Persegi panjang atau persegi?"} /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_PC[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PC[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-sm" />, bin: s.bin, petunjuk: "Pilah.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b4c-ppilih", "Pilih diagram.", RONDE_RUMUS_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_RUMUS_PC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b4c-parti2", "Arti diagram.", RONDE_RUMUS_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_RUMUS_PC[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b4c-pst", "Cerita diagram.", RONDE_CERITA_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_PC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b4c-qhitung", "Tulis hitung.", RONDE_HITUNG_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Hitung" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_HITUNG_CC[r].map((s, i) => {
      const opsi = opsiAngka(s.hasil, r * 2 + i);
      return { visual: <Numeral n={s.jenis === "persegi" ? ("sisi " + s.a) : ("p=" + s.a + " l=" + s.b)} kelas="text-base" />, tanya: "Keliling?", opsi, jawab: opsi.indexOf(String(s.hasil)), petunjuk: "2(p+l) atau 4×s.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b4c-qarti", "Tulis arti.", RONDE_RUMUS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Arti" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_RUMUS_CC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b4c-qdef", "Definisi.", RONDE_RUMUS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Definisi" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_RUMUS_CC[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b4c-qu", "Urutkan.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    const tampil = urutTampil(ro.angka.map(String), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b4c-qj", "Jodohkan notasi.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b4c-qm", "Memori notasi.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b4c-qbs", "Benar atau salah.", RONDE_BENARSALAH_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b4c-qd", "Detektif.", RONDE_DETEKTIF_QC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b4c-qpeta", "Peta konsep.", PETA_KONSEP_QC.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QC[r].pusat} kotak={PETA_KONSEP_QC[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b4c-qc", "Cerita angka.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baca teliti.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK5B4C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📏", nama: "CONCRETE", cara: "2(p+l) / 4×s!", warna: "#15803D" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B4C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram keliling", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B4C(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi keliling", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_C54} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />} />;
}
