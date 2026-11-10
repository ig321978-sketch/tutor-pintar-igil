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
  HURUF, RONDE_HITUNG_CB, RONDE_SATUAN_CB, RONDE_KONVERSI_CB, RONDE_SORTIR_CB, RONDE_PASANG_CB, RONDE_MEMORI_CB, RONDE_KETUK_CB, RONDE_SEMUA_CB, RONDE_CERITA_CB, RONDE_URUT_CB,
  RONDE_HITUNG_PB, RONDE_PASANG_PB, RONDE_MEMORI_PB, RONDE_TABEL_PB, RONDE_SEMUA_PB, RONDE_SORTIR_PB, RONDE_KONVERSI_PB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, PETA_KONSEP_QB, RONDE_CERITA_QB,
  opsiAngka, urutTampil, urutanTetap, cocokJenisVol, teksVol,
} from "./data-k4b4";
import { buatKartu, VisualVolume, Numeral } from "./bantu-k4b4";
import { visualInfografisK4B4B } from "./infografis-k4b4";
import { SUB_B44 } from "./naskah-k4b4";

const J = SUB_B44.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "baku", label: "Satuan baku", warna: "#BBF7D0" },
  { id: "tidak", label: "Tidak baku", warna: "#FECACA" },
];

export function InfografisK4B4BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B44} judul="Pengukuran Volume" suaraInfo={SUARA_INFO} visual={visualInfografisK4B4B()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b4b-hitung", "Hitung kubus satuan.", RONDE_HITUNG_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Hitung" teks="Hitung kubus." /><PilihBertahap key={r} soal={RONDE_HITUNG_CB[r].map((s, i) => {
      const o = opsiAngka(s.volume, r * 2 + i);
      return { visual: <VisualVolume bentuk={s} />, tanya: "Berapa volumenya?", opsi: o.map(String), jawab: o.indexOf(s.volume), petunjuk: "Jumlahkan kubus.", pesan: teksVol(s.volume, "kubus") };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b4b-satuan", "Pilih satuan volume.", RONDE_SATUAN_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Satuan" teks="Pilih satuan yang cocok." /><PilihBertahap key={r} soal={RONDE_SATUAN_CB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.tanya, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Cairan atau pejal?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b4b-konversi", "Konversi volume.", RONDE_KONVERSI_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Konversi" teks="Hitung konversi baku." /><PilihBertahap key={r} soal={RONDE_KONVERSI_CB[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <Numeral n={s.teks} kelas="text-lg" />, tanya: `Hasil (${s.label})?`, opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "1 l = 1.000 ml.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b4b-sortir", "Pilah satuan.", RONDE_SORTIR_CB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Baku atau tidak baku." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_CB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CB[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-sm" />, bin: s.jenis, petunjuk: "Apakah resmi baku?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b4b-jodoh", "Jodohkan konsep.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu kanan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b4b-memori", "Memori volume.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `k ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b4b-ketuk", "Ketuk bangun.", RONDE_KETUK_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk bangun dengan volume diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((s, i) => ({ id: s.id, label: `P${HURUF[i]}`, isi: <VisualVolume bentuk={s} kecil /> }))} soal={ro.tanya.map((vol) => ({ tanya: `Ketuk bangun volume ${vol}.`, jawab: ro.item.find((x) => x.volume === vol)!.id, petunjuk: "Hitung kubus.", pesan: teksVol(vol, "kubus") }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b4b-semua", "Ketuk semua jenis.", RONDE_SEMUA_CB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua satuan ${ro.jenis === "baku" ? "baku" : "tidak baku"}.`} /><KetukSemua key={r} tanya={`Ketuk semua satuan ${ro.jenis === "baku" ? "baku" : "tidak baku"}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: cocokJenisVol(s, ro.jenis), penjelasan: `${s.label} → ${s.jenis}.` }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b4b-cerita", "Cerita botol Helen.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Ingat kegiatan buku.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b4b-urut", "Urutkan volume.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><IgilBicara pendek="Urut" teks="Urutkan nilai volume." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k4b4b-pb", "Diagram kubus.", RONDE_HITUNG_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Kubus" teks="Hitung kubus." /><PilihBertahap key={r} soal={RONDE_HITUNG_PB[r].map((s, i) => {
      const o = opsiAngka(s.volume, r * 2 + i);
      return { visual: <VisualVolume bentuk={s} />, tanya: "Volume?", opsi: o.map(String), jawab: o.indexOf(s.volume), petunjuk: "Jumlahkan.", pesan: teksVol(s.volume, "cm3") };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k4b4b-pcair", "Cairan ml/l.", RONDE_TABEL_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cairan" teks="Pilih volume cairan." /><PilihBertahap key={r} soal={RONDE_TABEL_PB[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-base" />, tanya: "Nilai?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat contoh buku.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b4b-pj", "Jodoh diagram.", RONDE_PASANG_PB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b4b-pm", "Memori diagram.", RONDE_MEMORI_PB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b4b-pt", "Tabel satuan.", RONDE_TABEL_PB.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi jawaban." /><PilihBertahap key={r} soal={RONDE_TABEL_PB[r].map((s) => ({ visual: <Numeral n={s.baris} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat konversi.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b4b-ps", "Ketuk semua.", RONDE_SEMUA_PB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis === "baku" ? "baku" : "tidak baku"}.`} item={ro.item.map((s) => ({ id: s.id, label: s.label, benar: cocokJenisVol(s, ro.jenis), penjelasan: s.jenis }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b4b-pl", "Pilah diagram.", RONDE_SORTIR_PB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Jenis satuan." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PB[r][i];
      return { id: s.id, label: s.label, isi: <Numeral n={s.label} kelas="text-xs" />, bin: s.jenis, petunjuk: "Baku?", ucapan: s.label };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b4b-pk", "Konversi visual.", RONDE_KONVERSI_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Konversi" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_KONVERSI_PB[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i + 1);
      return { visual: <Numeral n={s.teks} kelas="text-lg" />, tanya: "Hasil?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "1 l = 1.000 ml.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b4b-pc", "Pilih volume.", RONDE_HITUNG_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Pilih volume benar." /><PilihBertahap key={r} soal={RONDE_HITUNG_PB[r].map((s, i) => {
      const o = opsiAngka(s.volume, r * 2 + i);
      return { visual: <VisualVolume bentuk={s} />, tanya: "Volume (cm³)?", opsi: o.map(String), jawab: o.indexOf(s.volume), petunjuk: "Setiap kubus 1 cm³.", pesan: teksVol(s.volume, "cm3") };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b4b-pst", "Cerita diagram.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Pikirkan volume.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k4b4b-qw", "Tulis satuan.", RONDE_SATUAN_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tulis" teks="Pilih satuan." /><PilihBertahap key={r} soal={RONDE_SATUAN_CB[r].map((s) => ({ visual: <Numeral n={s.tanya} kelas="text-base" />, tanya: "Jawaban?", opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Baku atau tidak?", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k4b4b-qk", "Tulis konversi.", RONDE_KONVERSI_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Konversi" teks="Pilih angka." /><PilihBertahap key={r} soal={RONDE_KONVERSI_CB[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <Numeral n={s.teks} kelas="text-lg" />, tanya: "Hasil?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Konversi baku.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k4b4b-qjns", "Pilih jenis.", RONDE_SORTIR_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Jenis" teks="Baku atau tidak?" /><PilihBertahap key={r} soal={RONDE_SORTIR_CB[r].slice(0, 2).map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["baku", "tidak baku", "luas"][x]);
      const jawabTeks = s.jenis === "baku" ? "baku" : "tidak baku";
      return { visual: <Numeral n={s.label} />, tanya: "Jenis satuan?", opsi, jawab: opsi.indexOf(jawabTeks), petunjuk: "Apakah resmi?", pesan: jawabTeks };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b4b-qu", "Urutkan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b4b-qj", "Jodohkan notasi.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.kanan, label: s.kanan, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.kanan, label: s.kiri, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.kanan, s.kanan]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k4b4b-qm", "Memori notasi.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.kanan, a: <Numeral n={s.kiri} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.kanan} kelas="text-sm" />, labelB: s.kanan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k4b4b-qbs", "Benar atau salah.", RONDE_BENARSALAH_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b4b-qd", "Detektif.", RONDE_DETEKTIF_QB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k4b4b-qpeta", "Peta konsep.", PETA_KONSEP_QB.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QB[r].pusat} kotak={PETA_KONSEP_QB[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k4b4b-qc", "Cerita angka.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Konsep volume.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧴", nama: "CONCRETE", cara: "Isi wadah!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Kubus dan cairan", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "ml · l · cm³", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_B44} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />} />;
}
