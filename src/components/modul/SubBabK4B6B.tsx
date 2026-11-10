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
  HURUF, RONDE_BACA_CB, RONDE_JENIS_CB, RONDE_SORTIR_CB, RONDE_PASANG_CB, RONDE_MEMORI_CB, RONDE_KETUK_CB, RONDE_SEMUA_CB, RONDE_CERITA_CB, RONDE_URUT_CB,
  RONDE_BACA_PB, RONDE_PASANG_PB, RONDE_MEMORI_PB, RONDE_TABEL_PB, RONDE_SEMUA_PB, RONDE_SORTIR_PB, RONDE_JENIS_PB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, PETA_KONSEP_QB, RONDE_CERITA_QB,
  opsiAngka, urutTampil, urutanTetap, cocokArah,
} from "./data-k4b6";
import { buatKartu, VisualBatang, Numeral } from "./bantu-k4b6";
import { visualInfografisK4B6B } from "./infografis-k4b6";
import { SUB_B46 } from "./naskah-k4b6";

const J = SUB_B46.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "tegak", label: "Tegak", warna: "#BBF7D0" },
  { id: "mendatar", label: "Mendatar", warna: "#FECACA" },
];

export function InfografisK4B6BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B46} judul="Diagram Batang" suaraInfo={SUARA_INFO} visual={visualInfografisK4B6B()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b6b-baca", "Baca batang.", RONDE_BACA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Baca" teks="Baca nilai batang." /><PilihBertahap key={r} soal={RONDE_BACA_CB[r].map((s) => {
      const opsi = s.opsi.map(String);
      return { visual: <VisualBatang batang={s.batang} arah={s.batang[0]?.arah === "mendatar" ? "mendatar" : "tegak"} />, tanya: s.tanya, opsi, jawab: opsi.indexOf(String(s.jawab)), petunjuk: "Lihat tinggi/panjang.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b6b-jenis", "Tegak/mendatar.", RONDE_JENIS_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Jenis" teks="Pilih istilah." /><PilihBertahap key={r} soal={RONDE_JENIS_CB[r].map((s) => ({ visual: <Numeral n="▮" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat sumbu & arah.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b6b-sumbu", "Sumbu.", RONDE_JENIS_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Sumbu" teks="Pilih arti sumbu." /><PilihBertahap key={r} soal={RONDE_JENIS_CB[(r + 1) % 3].map((s) => ({ visual: <Numeral n="➕" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Sumbu tegak/datar.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b6b-sortir", "Pilah arah.", RONDE_SORTIR_CB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Tegak atau mendatar." /><Sortir key={r} lebarItem={120} kolomBin={2} item={urutanKe(RONDE_SORTIR_CB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CB[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-xs" />, bin: s.bin, petunjuk: "Arah batang?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b6b-jodoh", "Jodohkan batang.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b6b-memori", "Memori batang.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b6b-ketuk", "Ketuk batang.", RONDE_KETUK_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk batang yang diminta." /><KetukPilih key={r} kolom={3} item={ro.batang.map((s, i) => ({ id: s.id, label: `P${HURUF[i]}`, isi: <VisualBatang batang={[s]} arah={s.arah} /> }))} soal={ro.tanya.map((nama) => ({ tanya: `Ketuk ${nama}.`, jawab: ro.batang.find((x) => x.label === nama)!.id, petunjuk: "Lihat label.", pesan: nama }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b6b-semua", "Ketuk semua arah.", RONDE_SEMUA_CB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.jenis}.`} /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: cocokArah(s, ro.jenis), penjelasan: `${s.label} → ${s.bin}.` }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b6b-cerita", "Cerita batang.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Baca nilai batang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b6b-urut", "Urutkan nilai.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><IgilBicara pendek="Urut" teks="Urutkan nilai batang." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k4b6b-ptegak", "Batang tegak.", RONDE_BACA_PB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const soal = RONDE_BACA_PB[r].filter((s) => s.batang[0]?.arah !== "mendatar");
    const pakai = soal.length ? soal : RONDE_BACA_PB[r];
    return (<><CatatanTempel pendek="Tegak" teks="Baca tinggi." /><PilihBertahap key={r} soal={pakai.map((s) => {
      const opsi = s.opsi.map(String);
      return { visual: <VisualBatang batang={s.batang} arah="tegak" />, tanya: s.tanya, opsi, jawab: opsi.indexOf(String(s.jawab)), petunjuk: "Tinggi batang.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k4b6b-pmendatar", "Batang mendatar.", RONDE_BACA_PB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const semua = RONDE_BACA_PB.flat().filter((s) => s.batang.some((b) => b.arah === "mendatar"));
    const soal = semua.length ? [semua[r % semua.length], semua[(r + 1) % semua.length]] : RONDE_BACA_PB[r];
    return (<><CatatanTempel pendek="Mendatar" teks="Baca panjang." /><PilihBertahap key={r} soal={soal.map((s) => {
      const opsi = s.opsi.map(String);
      return { visual: <VisualBatang batang={s.batang} arah="mendatar" />, tanya: s.tanya, opsi, jawab: opsi.indexOf(String(s.jawab)), petunjuk: "Panjang batang.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b6b-pj", "Jodoh diagram.", RONDE_PASANG_PB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b6b-pm", "Memori diagram.", RONDE_MEMORI_PB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b6b-pt", "Tabel sumbu.", RONDE_TABEL_PB.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi jawaban." /><PilihBertahap key={r} soal={RONDE_TABEL_PB[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Sumbu & nilai.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b6b-ps", "Ketuk semua.", RONDE_SEMUA_PB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: cocokArah(s, ro.jenis), penjelasan: s.bin }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b6b-pl", "Pilah diagram.", RONDE_SORTIR_PB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Arah batang." /><Sortir key={r} lebarItem={120} kolomBin={2} item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PB[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-xs" />, bin: s.bin, petunjuk: "Tegak/mendatar?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b6b-pband", "Bandingkan.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Banding" teks="Pilih ekstrem." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="📊" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Bandingkan batang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b6b-pc", "Pilih bacaan.", RONDE_JENIS_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih pernyataan." /><PilihBertahap key={r} soal={RONDE_JENIS_PB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Definisi batang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b6b-pst", "Cerita diagram.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Batang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k4b6b-qw", "Tulis istilah.", RONDE_JENIS_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tulis" teks="Pilih istilah." /><PilihBertahap key={r} soal={RONDE_JENIS_CB[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Istilah buku.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k4b6b-qh", "Tulis nilai.", RONDE_BACA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Nilai" teks="Pilih angka/teks." /><PilihBertahap key={r} soal={RONDE_BACA_CB[r].map((s, i) => {
      const opsi = s.opsi.map(String);
      return { visual: <Numeral n={s.tanya} kelas="text-base" />, tanya: "Jawaban?", opsi, jawab: opsi.indexOf(String(s.jawab)), petunjuk: "Dari batang.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k4b6b-qjns", "Pilih arah.", RONDE_SORTIR_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Arah" teks="Tegak?" /><PilihBertahap key={r} soal={RONDE_SORTIR_CB[r].slice(0, 2).map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["tegak", "mendatar", "piktogram"][x]);
      return { visual: <Numeral n={s.label} kelas="text-sm" />, tanya: "Arah?", opsi, jawab: opsi.indexOf(s.bin), petunjuk: "Orientasi.", pesan: s.bin };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b6b-qu", "Urutkan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b6b-qj", "Jodohkan notasi.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k4b6b-qm", "Memori notasi.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k4b6b-qbs", "Benar atau salah.", RONDE_BENARSALAH_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b6b-qd", "Detektif.", RONDE_DETEKTIF_QB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k4b6b-qpeta", "Peta konsep.", PETA_KONSEP_QB.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QB[r].pusat} kotak={PETA_KONSEP_QB[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k4b6b-qc", "Cerita angka.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Batang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B6B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📊", nama: "CONCRETE", cara: "Baca batang nyata!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B6B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram sumbu", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B6B(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Sumbu & nilai", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_B46} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />} />;
}
