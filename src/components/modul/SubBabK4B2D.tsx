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
  HURUF, RONDE_UBAH_CD, RONDE_UBAH100_CD, RONDE_PASANG_CD, RONDE_MEMORI_CD, RONDE_SORTIR_CD, RONDE_KETUK_CD, RONDE_SEMUA_CD, RONDE_CERITA_CD, RONDE_URUT_CD,
  RONDE_UBAH_PD, RONDE_UBAH100_PD, RONDE_PASANG_PD, RONDE_MEMORI_PD, RONDE_TABEL_PD, RONDE_SEMUA_PD, RONDE_SORTIR_PD, RONDE_BENARSALAH_QD, RONDE_DETEKTIF_QD, PETA_KONSEP_QD, RONDE_CERITA_QD,
  teksPec, opsiDes, opsiPec, urutTampil, urutanTetap, nilaiDes, cocokJenisDes, type PasanganDes,
} from "./data-k4b2";
import { buatKartu, VisualPec, Numeral, idPec } from "./bantu-k4b2";
import { visualInfografisK4B2D } from "./infografis-k4b2";
import { SUB_D42 } from "./naskah-k4b2";

const J = SUB_D42.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B2DKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_D42} judul="Desimal Persepuluhan & Perseratusan" suaraInfo={SUARA_INFO} visual={visualInfografisK4B2D()} speakGuru={speakGuru} />;
}
const BIN = [
  { id: "persepuluhan", label: "Persepuluhan (/10)", warna: "#BBF7D0" },
  { id: "perseratusan", label: "Perseratusan (/100)", warna: "#FECACA" },
];
const soalDes = (s: PasanganDes, visual: React.ReactNode, nomor: number, tanya = "Desimal berapakah?") => {
  const o = opsiDes(s.des, nomor);
  return { visual, tanya, opsi: o, jawab: o.indexOf(s.des), petunjuk: s.jenis === "persepuluhan" ? "Satu digit di belakang koma." : "Dua digit di belakang koma.", pesan: `${teksPec(s.pec)} = ${s.des}.` };
};
const soalPecDariDes = (s: PasanganDes, nomor: number) => {
  const o = opsiPec(s.pec, nomor);
  return { visual: <Numeral n={s.des} kelas="text-3xl" />, tanya: "Pecahan biasanya?", opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.pec)), petunjuk: "Lihat digit di belakang koma.", pesan: `${s.des} = ${teksPec(s.pec)}.` };
};

function K0(d: PropsLangkah) { return Kartu(d, 0, "k4b2d-roti", "Roti /10 ke desimal.", RONDE_UBAH_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Roti" teks="Ubah ke desimal persepuluhan." /><PilihBertahap key={r} soal={RONDE_UBAH_CD[r].map((s, i) => soalDes(s, <VisualPec pec={s.pec} />, r * 2 + i, "Bentuk desimal?"))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K1(d: PropsLangkah) { return Kartu(d, 1, "k4b2d-biskuit", "Biskuit /100 ke desimal.", RONDE_UBAH100_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Biskuit" teks="Ubah ke desimal perseratusan." /><PilihBertahap key={r} soal={RONDE_UBAH100_CD[r].map((s, i) => soalDes(s, <VisualPec pec={s.pec} mode="kotak" />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K2(d: PropsLangkah) { return Kartu(d, 2, "k4b2d-ubah10", "Ubah persepuluhan.", RONDE_UBAH_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Ubah" teks="Pilih desimal." /><PilihBertahap key={r} soal={RONDE_UBAH_CD[r].map((s, i) => soalDes(s, <Numeral n={teksPec(s.pec)} />, r * 2 + i + 2))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K3(d: PropsLangkah) { return Kartu(d, 3, "k4b2d-ubah100", "Ubah perseratusan.", RONDE_UBAH100_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Ubah 100" teks="Pilih desimal." /><PilihBertahap key={r} soal={RONDE_UBAH100_CD[r].map((s, i) => soalDes(s, <Numeral n={teksPec(s.pec)} />, r * 2 + i + 3))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b2d-sortir", "Pilah jenis desimal.", RONDE_SORTIR_CD.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Persepuluhan atau perseratusan." /><Sortir key={r} lebarItem={88} kolomBin={2} item={urutanKe(RONDE_SORTIR_CD[r].length, r).map((i) => { const s = RONDE_SORTIR_CD[r][i]; return { id: s.des, label: s.des, isi: <VisualPec pec={s.pec} kecil />, bin: s.jenis, petunjuk: "Hitung digit di belakang koma.", ucapan: s.des }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b2d-jodoh", "Jodohkan pecahan–desimal.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((s) => ({ id: s.des, label: s.des, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk pecahan, lalu desimal." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.des, label: teksPec(s.pec), isi: <VisualPec pec={s.pec} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.des, s.des]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K6(d: PropsLangkah) { return Kartu(d, 6, "k4b2d-memori", "Memori desimal.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan pecahan dan desimal." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: s.des, a: <VisualPec pec={s.pec} kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.des} />, labelB: s.des }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b2d-ketuk", "Ketuk desimal.", RONDE_KETUK_CD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CD[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((s, i) => ({ id: s.des, label: `D${HURUF[i]}`, isi: <VisualPec pec={s.pec} kecil /> }))} soal={ro.tanya.map((des) => ({ tanya: `Ketuk ${des}.`, jawab: des, petunjuk: "Lihat arsir.", pesan: des }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b2d-semua", "Ketuk semua jenis.", RONDE_SEMUA_CD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CD[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua ${ro.jenis}.`} /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis}.`} item={ro.item.map((s) => ({ id: s.des, label: s.des, benar: cocokJenisDes(s, ro.jenis), penjelasan: `${s.des} adalah ${s.jenis}.` }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K9(d: PropsLangkah) { return Kartu(d, 9, "k4b2d-cerita", "Cerita roti dan biskuit.", RONDE_CERITA_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat digit koma.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b2d-pb", "Batang sepuluh.", RONDE_UBAH_PD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Batang" teks="Baca lalu pilih desimal." /><PilihBertahap key={r} soal={RONDE_UBAH_PD[r].map((s, i) => soalDes(s, <VisualPec pec={s.pec} mode="batang" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b2d-pg", "Kotak seratus.", RONDE_UBAH100_PD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Kotak" teks="Baca grid." /><PilihBertahap key={r} soal={RONDE_UBAH100_PD[r].map((s, i) => soalDes(s, <VisualPec pec={s.pec} mode="kotak" />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b2d-pj", "Jodoh diagram.", RONDE_PASANG_PD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PD[r];
    const kanan = ro.map((s) => ({ id: s.des, label: s.des, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk diagram." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.des, label: teksPec(s.pec), isi: <VisualPec pec={s.pec} mode="batang" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.des, s.des]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b2d-pm", "Memori diagram.", RONDE_MEMORI_PD.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PD[r].map((s, i) => ({ id: s.des, a: <VisualPec pec={s.pec} kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.des} />, labelB: s.des }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b2d-pt", "Tabel ubah.", RONDE_TABEL_PD.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Pilih desimal." /><PilihBertahap key={r} soal={RONDE_TABEL_PD[r].map((s, i) => soalDes({ ...s, jenis: s.pec.q === 10 ? "persepuluhan" : "perseratusan" }, <VisualPec pec={s.pec} mode="batang" />, r * 2 + i, `Baris ${i + 1}`))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b2d-ps", "Ketuk semua diagram.", RONDE_SEMUA_PD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PD[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis}.`} item={ro.item.map((s) => ({ id: s.des, label: s.des, isi: <VisualPec pec={s.pec} kecil />, benar: cocokJenisDes(s, ro.jenis), penjelasan: s.des }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b2d-pl", "Pilah diagram.", RONDE_SORTIR_PD.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Pilah jenis." /><Sortir key={r} lebarItem={88} kolomBin={2} item={urutanKe(RONDE_SORTIR_PD[r].length, r).map((i) => { const s = RONDE_SORTIR_PD[r][i]; return { id: s.des, label: s.des, isi: <VisualPec pec={s.pec} kecil />, bin: s.jenis, petunjuk: "Digit koma.", ucapan: s.des }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) { return Kartu(d, 17, "k4b2d-pr", "Aturan digit.", RONDE_CERITA_QD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Aturan" teks="Digit koma." /><PilihBertahap key={r} soal={RONDE_CERITA_QD[r].map((s) => ({ visual: <Numeral n="koma" kelas="text-lg" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Hitung digit.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P8(d: PropsLangkah) { return Kartu(d, 18, "k4b2d-pc", "Pilih desimal.", RONDE_UBAH_PD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Pilih" teks="Pilih jawaban." /><PilihBertahap key={r} soal={RONDE_UBAH_PD[r].map((s, i) => soalDes(s, <VisualPec pec={s.pec} mode="notasi" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b2d-pst", "Cerita diagram.", RONDE_CERITA_QD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat aturan.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b2d-qw10", "Tulis 0,p.", RONDE_UBAH_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tulis" teks="Pilih desimal." /><PilihBertahap key={r} soal={RONDE_UBAH_CD[r].map((s, i) => soalDes(s, <Numeral n={teksPec(s.pec)} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b2d-qw100", "Tulis 0,pp.", RONDE_UBAH100_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tulis 100" teks="Pilih desimal." /><PilihBertahap key={r} soal={RONDE_UBAH100_CD[r].map((s, i) => soalDes(s, <Numeral n={teksPec(s.pec)} />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b2d-qp", "Pilih bentuk.", RONDE_UBAH_CD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Desimal atau pecahan." /><PilihBertahap key={r} soal={RONDE_UBAH_CD[r].map((s, i) => soalPecDariDes(s, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b2d-qu", "Urutkan desimal.", RONDE_URUT_CD.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CD[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? nilaiDes(x) - nilaiDes(y) : nilaiDes(y) - nilaiDes(x)));
    return (<><CatatanPensil pendek="Urut" teks="Urutkan nilai." /><UrutKetuk key={r} item={urutTampil(ro.angka, kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b2d-qj", "Jodohkan notasi.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((s) => ({ id: s.des, label: s.des, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk pecahan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.des, label: teksPec(s.pec), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.des, s.des]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b2d-qm", "Memori notasi.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CD[r].map((s, i) => ({ id: s.des, a: <Numeral n={teksPec(s.pec)} />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.des} />, labelB: s.des }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b2d-qbs", "Benar atau salah.", RONDE_BENARSALAH_QD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QD[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b2d-qd", "Detektif.", RONDE_DETEKTIF_QD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QD[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b2d-qpeta", "Peta konsep.", PETA_KONSEP_QD.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QD[r].pusat} kotak={PETA_KONSEP_QD[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b2d-qc", "Cerita angka.", RONDE_CERITA_QD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QD[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Digit koma.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B2D(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🍞", nama: "CONCRETE", cara: "Roti & biskuit!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B2D(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Batang & kotak", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B2D(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Desimal & aturan", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_D42} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB D ➡️" />} />;
}
