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
  HURUF, RONDE_KOMPOS_CC, RONDE_DEKOM_CC, RONDE_CARA_CC, RONDE_SORTIR_CC, RONDE_PASANG_CC, RONDE_MEMORI_CC, RONDE_KETUK_CC, RONDE_SEMUA_CC, RONDE_CERITA_CC, RONDE_URUT_CC,
  RONDE_KOMPOS_PC, RONDE_DEKOM_PC, RONDE_PASANG_PC, RONDE_MEMORI_PC, RONDE_TABEL_PC, RONDE_SEMUA_PC, RONDE_SORTIR_PC, RONDE_CARA_PC, RONDE_BENARSALAH_QC, RONDE_DETEKTIF_QC, PETA_KONSEP_QC, RONDE_CERITA_QC,
  opsiTeks, urutTampil, urutanTetap, lambang, jumlahPecahan,
} from "./data-k5b1";
import { buatKartu, VisualPapan, Numeral } from "./bantu-k5b1";
import { visualInfografisK5B1C } from "./infografis-k5b1";
import { SUB_C51 } from "./naskah-k5b1";

const J = SUB_C51.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "sama", label: "Sama 38.600 / target", warna: "#BBF7D0" },
  { id: "beda", label: "Beda total", warna: "#FECACA" },
];
const teksPecahan = (p: { pr?: number; rb?: number; r?: number; p?: number; s?: number }) => {
  const bagian: string[] = [];
  if (p.pr) bagian.push(`${p.pr}×10rb`);
  if (p.rb) bagian.push(`${p.rb}×1rb`);
  if (p.r) bagian.push(`${p.r}×100`);
  if (p.p) bagian.push(`${p.p}×10`);
  if (p.s) bagian.push(`${p.s}`);
  return bagian.join(" + ") || "0";
};

export function InfografisK5B1CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C51} judul="Komposisi & Dekomposisi" suaraInfo={SUARA_INFO} visual={visualInfografisK5B1C()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k5b1c-kompos", "Pilih total.", RONDE_KOMPOS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Susun" teks="Jumlahkan pecahan." /><PilihBertahap key={r} soal={RONDE_KOMPOS_CC[r].map((s, i) => {
      const opsi = opsiTeks(lambang(s.total), [lambang(s.total + 1000), lambang(Math.max(0, s.total - 2000))], r * 2 + i);
      return { visual: <Numeral n={teksPecahan(s.pecahan)} kelas="text-sm" />, tanya: "Total?", opsi, jawab: opsi.indexOf(lambang(s.total)), petunjuk: "Jumlahkan nilai.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k5b1c-dekom", "Pilih uraian.", RONDE_DEKOM_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Urai" teks="Pilih bentuk panjang." /><PilihBertahap key={r} soal={RONDE_DEKOM_CC[r].map((s, i) => {
      const opsi = opsiTeks(s.uraian, [`${lambang(s.n)} saja`, "tanpa uraian"], r * 2 + i);
      return { visual: <Numeral n={s.n} />, tanya: "Bentuk panjang?", opsi, jawab: opsi.indexOf(s.uraian), petunjuk: "Nilai tempat.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k5b1c-cara", "Cara setara.", RONDE_CARA_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cara" teks="Pilih jawaban." /><PilihBertahap key={r} soal={RONDE_CARA_CC[r].map((s) => ({ visual: <Numeral n={s.total} />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung total.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k5b1c-sortir", "Pilah setara.", RONDE_SORTIR_CC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Sama atau beda total." /><Sortir key={r} lebarItem={120} kolomBin={2} item={urutanKe(RONDE_SORTIR_CC[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CC[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-[11px]" />, bin: s.bin, petunjuk: "Hitung dulu.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k5b1c-jodoh", "Jodohkan.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k5b1c-memori", "Memori.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-[11px]" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k5b1c-ketuk", "Ketuk bilangan.", RONDE_KETUK_CC.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CC[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk bilangan yang diminta." /><KetukPilih key={r} kolom={2} item={ro.item.map((n, i) => ({ id: String(n), label: `P${HURUF[i]}`, isi: <Numeral n={n} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${lambang(n)}.`, jawab: String(n), petunjuk: "Cocokkan.", pesan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k5b1c-semua", "Ketuk semua.", RONDE_SEMUA_CC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.label}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k5b1c-cerita", "Cerita.", RONDE_CERITA_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CC[r].map((s) => ({ visual: <Numeral n="🧩" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Jumlahkan pecahan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k5b1c-urut", "Urutkan.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map((n) => lambang(n));
    const tampil = urutTampil(ro.angka.map((n) => lambang(n)), kunci, r);
    return (<><IgilBicara pendek="Urut" teks="Urutkan bilangan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k5b1c-pkompos", "Papan susun.", RONDE_KOMPOS_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Papan" teks="Hitung dari papan." /><PilihBertahap key={r} soal={RONDE_KOMPOS_PC[r].map((s, i) => {
      const n = jumlahPecahan(s.pecahan);
      const opsi = opsiTeks(lambang(n), [lambang(n + 1000), lambang(Math.max(0, n - 2000))], r * 2 + i);
      return { visual: <VisualPapan n={n} kecil />, tanya: "Total papan?", opsi, jawab: opsi.indexOf(lambang(n)), petunjuk: "Baca kolom.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k5b1c-pdekom", "Diagram uraian.", RONDE_DEKOM_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Urai" teks="Pilih bentuk panjang." /><PilihBertahap key={r} soal={RONDE_DEKOM_PC[r].map((s, i) => {
      const opsi = opsiTeks(s.uraian, ["hanya digit", "tanpa plus"], r * 2 + i);
      return { visual: <Numeral n={s.n} />, tanya: "Uraian?", opsi, jawab: opsi.indexOf(s.uraian), petunjuk: "Nilai tempat.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k5b1c-pj", "Jodoh diagram.", RONDE_PASANG_PC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k5b1c-pm", "Memori diagram.", RONDE_MEMORI_PC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-[11px]" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k5b1c-pt", "Tabel komposisi.", RONDE_TABEL_PC.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi jawaban." /><PilihBertahap key={r} soal={RONDE_TABEL_PC[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Komposisi/dekomposisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k5b1c-ps", "Ketuk semua.", RONDE_SEMUA_PC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.label}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k5b1c-pl", "Pilah diagram.", RONDE_SORTIR_PC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Sama atau beda." /><Sortir key={r} lebarItem={120} kolomBin={2} item={urutanKe(RONDE_SORTIR_PC[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PC[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-[11px]" />, bin: s.bin, petunjuk: "Hitung total.", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k5b1c-pcara", "Cara fleksibel.", RONDE_CARA_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cara" teks="Pilih." /><PilihBertahap key={r} soal={RONDE_CARA_PC[r].map((s) => ({ visual: <Numeral n={s.total} />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k5b1c-ppilih", "Pilih pernyataan.", RONDE_CARA_PC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_CARA_PC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Komposisi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k5b1c-pst", "Cerita diagram.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Susun/urai.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k5b1c-qtotal", "Tulis total.", RONDE_KOMPOS_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Total" teks="Pilih lambang." /><PilihBertahap key={r} soal={RONDE_KOMPOS_CC[r].map((s, i) => {
      const opsi = opsiTeks(lambang(s.total), [lambang(s.total + 2000), lambang(Math.max(0, s.total - 1000))], r * 3 + i);
      return { visual: <Numeral n={teksPecahan(s.pecahan)} kelas="text-sm" />, tanya: "Total?", opsi, jawab: opsi.indexOf(lambang(s.total)), petunjuk: "Jumlahkan.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k5b1c-qurai", "Tulis uraian.", RONDE_DEKOM_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Uraian" teks="Pilih bentuk panjang." /><PilihBertahap key={r} soal={RONDE_DEKOM_CC[r].map((s, i) => {
      const opsi = opsiTeks(s.uraian, ["digit saja", "kata saja"], r * 3 + i);
      return { visual: <Numeral n={s.n} />, tanya: "Uraian?", opsi, jawab: opsi.indexOf(s.uraian), petunjuk: "Nilai tempat.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k5b1c-qcara", "Pilih cara.", RONDE_CARA_CC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cara" teks="Setara?" /><PilihBertahap key={r} soal={RONDE_CARA_CC[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-sm" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k5b1c-qu", "Urutkan.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map((n) => lambang(n));
    const tampil = urutTampil(ro.angka.map((n) => lambang(n)), kunci, r);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={tampil.map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k5b1c-qj", "Jodohkan notasi.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k5b1c-qm", "Memori notasi.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-[11px]" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k5b1c-qbs", "Benar atau salah.", RONDE_BENARSALAH_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k5b1c-qd", "Detektif.", RONDE_DETEKTIF_QC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k5b1c-qpeta", "Peta konsep.", PETA_KONSEP_QC.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QC[r].pusat} kotak={PETA_KONSEP_QC[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k5b1c-qc", "Cerita angka.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Susun.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK5B1C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧩", nama: "CONCRETE", cara: "Susun pecahan!", warna: "#166534" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK5B1C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram komposisi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK5B1C(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi susun/urai", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_C51} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />} />;
}
