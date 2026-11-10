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
  HURUF, RONDE_HITUNG_CA, RONDE_JENIS_CA, RONDE_SORTIR_CA, RONDE_PASANG_CA, RONDE_MEMORI_CA, RONDE_KETUK_CA, RONDE_SEMUA_CA, RONDE_CERITA_CA, RONDE_URUT_CA,
  RONDE_HITUNG_PA, RONDE_PASANG_PA, RONDE_MEMORI_PA, RONDE_TABEL_PA, RONDE_SEMUA_PA, RONDE_SORTIR_PA, RONDE_JENIS_PA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, PETA_KONSEP_QA, RONDE_CERITA_QA,
  opsiAngka, urutTampil, urutanTetap, byId,
} from "./data-k4b5";
import { buatKartu, VisualBangun, Numeral } from "./bantu-k4b5";
import { visualInfografisK4B5A } from "./infografis-k4b5";
import { SUB_A45 } from "./naskah-k4b5";

const J = SUB_A45.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "beraturan", label: "Beraturan", warna: "#BBF7D0" },
  { id: "tak", label: "Tak beraturan", warna: "#FECACA" },
];

export function InfografisK4B5AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A45} judul="Ciri-Ciri Bangun Datar" suaraInfo={SUARA_INFO} visual={visualInfografisK4B5A()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b5a-hitung", "Hitung sisi/sudut.", RONDE_HITUNG_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Hitung" teks="Hitung sisi atau sudut." /><PilihBertahap key={r} soal={RONDE_HITUNG_CA[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualBangun bangun={s.bangun} />, tanya: `Berapa banyak ${s.tanya}?`, opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Hitung yang diminta.", pesan: `${s.jawab} ${s.tanya}.` };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b5a-jenis", "Pilih jenis bangun.", RONDE_JENIS_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Jenis" teks="Pilih nama yang cocok." /><PilihBertahap key={r} soal={RONDE_JENIS_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat ciri buku.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b5a-aturan", "Beraturan?", RONDE_SORTIR_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Aturan" teks="Beraturan atau tidak?" /><PilihBertahap key={r} soal={RONDE_SORTIR_CA[r].slice(0, 2).map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["beraturan", "tak beraturan", "bukan bangun"][x]);
      const jawab = s.bin === "beraturan" ? "beraturan" : "tak beraturan";
      return { visual: <Numeral n={s.label} kelas="text-base" />, tanya: "Jenis?", opsi, jawab: opsi.indexOf(jawab), petunjuk: "Sisi & sudut sama?", pesan: jawab };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b5a-sortir", "Pilah beraturan.", RONDE_SORTIR_CA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Beraturan atau tak." /><Sortir key={r} lebarItem={110} kolomBin={2} item={urutanKe(RONDE_SORTIR_CA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CA[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-xs" />, bin: s.bin, petunjuk: "Sisi & sudut sama?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b5a-jodoh", "Jodohkan ciri.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b5a-memori", "Memori ciri.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b5a-ketuk", "Ketuk bangun.", RONDE_KETUK_CA.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk bangun yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((s, i) => ({ id: s.id, label: `P${HURUF[i]}`, isi: <VisualBangun bangun={s} kecil /> }))} soal={ro.tanya.map((nama) => ({ tanya: `Ketuk ${nama}.`, jawab: ro.item.find((x) => x.nama === nama)!.id, petunjuk: "Lihat bentuk.", pesan: nama }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b5a-semua", "Ketuk semua.", RONDE_SEMUA_CA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.bin}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.bin}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b5a-cerita", "Cerita bangun.", RONDE_CERITA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Ingat ciri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b5a-urut", "Urutkan sisi.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><IgilBicara pendek="Urut" teks="Urutkan banyak sisi." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k4b5a-pb", "Diagram sisi.", RONDE_HITUNG_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Sisi" teks="Hitung sisi." /><PilihBertahap key={r} soal={RONDE_HITUNG_PA[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualBangun bangun={s.bangun} />, tanya: `Banyak ${s.tanya}?`, opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Hitung.", pesan: String(s.jawab) };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k4b5a-psudut", "Jenis sudut.", RONDE_JENIS_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Sudut" teks="Pilih jenis." /><PilihBertahap key={r} soal={RONDE_JENIS_PA[r].map((s) => ({ visual: <Numeral n="△" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Lancip/siku/tumpul.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b5a-pj", "Jodoh diagram.", RONDE_PASANG_PA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b5a-pm", "Memori diagram.", RONDE_MEMORI_PA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b5a-pt", "Tabel sisi–sudut.", RONDE_TABEL_PA.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi jawaban." /><PilihBertahap key={r} soal={RONDE_TABEL_PA[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Tabel buku.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b5a-ps", "Ketuk semua.", RONDE_SEMUA_PA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.bin}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: s.cocok, penjelasan: s.label }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b5a-pl", "Pilah diagram.", RONDE_SORTIR_PA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Beraturan?" /><Sortir key={r} lebarItem={110} kolomBin={2} item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PA[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-xs" />, bin: s.bin, petunjuk: "Sisi & sudut?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b5a-pq", "Ciri segiempat.", RONDE_JENIS_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Segiempat" teks="Pilih ciri." /><PilihBertahap key={r} soal={RONDE_JENIS_PA[(r + 2) % 3].map((s) => ({ visual: <VisualBangun bangun={byId("ps")} kecil />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ciri segiempat.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b5a-pc", "Pilih bangun.", RONDE_KETUK_CA.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    const target = ro.item[0];
    const opsiNama = urutanKe(3, r).map((x) => [target.nama, ro.item[1].nama, ro.item[2].nama][x]);
    return (<><CatatanTempel pendek="Pilih" teks="Pilih nama." /><PilihBertahap key={r} soal={[{ visual: <VisualBangun bangun={target} />, tanya: "Bangun apakah ini?", opsi: opsiNama, jawab: opsiNama.indexOf(target.nama), petunjuk: "Lihat sisi/sudut.", pesan: target.nama }]} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b5a-pst", "Cerita diagram.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Ciri bangun.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k4b5a-qw", "Tulis nama.", RONDE_JENIS_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tulis" teks="Pilih nama." /><PilihBertahap key={r} soal={RONDE_JENIS_CA[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ciri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k4b5a-qjml", "Tulis jumlah.", RONDE_HITUNG_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Jumlah" teks="Pilih angka." /><PilihBertahap key={r} soal={RONDE_HITUNG_CA[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <Numeral n={s.bangun.nama} kelas="text-base" />, tanya: `Banyak ${s.tanya}?`, opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Hitung.", pesan: String(s.jawab) };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k4b5a-qjns", "Pilih klasifikasi.", RONDE_SORTIR_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Jenis" teks="Beraturan?" /><PilihBertahap key={r} soal={RONDE_SORTIR_CA[r].slice(0, 2).map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["beraturan", "tak beraturan", "lingkaran"][x]);
      const jawab = s.bin === "beraturan" ? "beraturan" : "tak beraturan";
      return { visual: <Numeral n={s.label} />, tanya: "Klasifikasi?", opsi, jawab: opsi.indexOf(jawab), petunjuk: "Sisi & sudut?", pesan: jawab };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b5a-qu", "Urutkan.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b5a-qj", "Jodohkan notasi.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k4b5a-qm", "Memori notasi.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k4b5a-qbs", "Benar atau salah.", RONDE_BENARSALAH_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b5a-qd", "Detektif.", RONDE_DETEKTIF_QA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k4b5a-qpeta", "Peta konsep.", PETA_KONSEP_QA.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QA[r].pusat} kotak={PETA_KONSEP_QA[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k4b5a-qc", "Cerita angka.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Ciri.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🔺", nama: "CONCRETE", cara: "Amati bangun nyata!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram bangun", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B5A(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Nama & ciri", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_A45} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />} />;
}
