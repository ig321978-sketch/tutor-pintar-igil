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
  HURUF, RONDE_DES_PERS_CE, RONDE_BESAR_CE, RONDE_BALIK_CE, RONDE_PASANG_CE, RONDE_MEMORI_CE, RONDE_SORTIR_CE, RONDE_KETUK_CE, RONDE_SEMUA_CE, RONDE_CERITA_CE, RONDE_URUT_CE,
  RONDE_DES_PERS_PE, RONDE_BESAR_PE, RONDE_BALIK_PE, RONDE_PASANG_PE, RONDE_MEMORI_PE, RONDE_SORTIR_PE, RONDE_SEMUA_PE, RONDE_TABEL_PE, RONDE_BENARSALAH_QE, RONDE_DETEKTIF_QE, PETA_KONSEP_QE, RONDE_CERITA_QE,
  teksPec, opsiPersen, opsiDes, urutTampil, urutanTetap, nilaiDes, cocokPersenSyarat, type PasanganPersen,
} from "./data-k4b2";
import { buatKartu, VisualPec, Numeral } from "./bantu-k4b2";
import { visualInfografisK4B2E } from "./infografis-k4b2";
import { SUB_E42 } from "./naskah-k4b2";

const J = SUB_E42.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B2EKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_E42} judul="Desimal Perseratusan & Persen" suaraInfo={SUARA_INFO} visual={visualInfografisK4B2E()} speakGuru={speakGuru} />;
}
const BIN = [
  { id: "persen", label: "Bentuk %", warna: "#BBF7D0" },
  { id: "desimal", label: "Bentuk desimal", warna: "#FECACA" },
];
const soalPersen = (s: PasanganPersen, visual: React.ReactNode, nomor: number, tanya = "Berapa persen?") => {
  const o = opsiPersen(s.persen, nomor);
  return { visual, tanya, opsi: o, jawab: o.indexOf(s.persen), petunjuk: "× 100% atau lewat /100.", pesan: `${s.des} = ${teksPec(s.pec)} = ${s.persen}.` };
};
const soalDesDariPersen = (persen: string, des: string, nomor: number) => {
  const o = opsiDes(des, nomor);
  return { visual: <Numeral n={persen} kelas="text-3xl" />, tanya: "Desimal perseratusannya?", opsi: o, jawab: o.indexOf(des), petunjuk: "Bagi 100.", pesan: `${persen} = ${des}.` };
};

function K0(d: PropsLangkah) { return Kartu(d, 0, "k4b2e-des", "Desimal jadi persen.", RONDE_DES_PERS_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Desimal" teks="Ubah ke persen." /><PilihBertahap key={r} soal={RONDE_DES_PERS_CE[r].map((s, i) => soalPersen(s, <Numeral n={s.des} kelas="text-3xl" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K1(d: PropsLangkah) { return Kartu(d, 1, "k4b2e-besar", "Persen > 100.", RONDE_BESAR_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Besar" teks="Desimal lebih dari 1." /><PilihBertahap key={r} soal={RONDE_BESAR_CE[r].map((s, i) => soalPersen(s, <Numeral n={s.des} kelas="text-3xl" />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K2(d: PropsLangkah) { return Kartu(d, 2, "k4b2e-balik", "Persen jadi desimal.", RONDE_BALIK_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Balik" teks="Ubah ke desimal." /><PilihBertahap key={r} soal={RONDE_BALIK_CE[r].map((s, i) => soalDesDariPersen(s.persen, s.des, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K3(d: PropsLangkah) { return Kartu(d, 3, "k4b2e-langsung", "Cara langsung ×100%.", RONDE_DES_PERS_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Langsung" teks="Kalikan seratus persen." /><PilihBertahap key={r} soal={RONDE_DES_PERS_CE[r].map((s, i) => soalPersen(s, <Numeral n={`${s.des} × 100%`} kelas="text-xl" />, r * 2 + i + 2))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b2e-sortir", "Pilah persen/desimal.", RONDE_SORTIR_CE.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Persen atau desimal." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CE[r].length, r).map((i) => { const s = RONDE_SORTIR_CE[r][i]; return { id: s.teks, label: s.teks, isi: <Numeral n={s.teks} kelas="text-lg" />, bin: s.jenis, petunjuk: "Ada tanda %?", ucapan: s.teks }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b2e-jodoh", "Jodohkan desimal–persen.", RONDE_PASANG_CE.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CE[r];
    const kanan = ro.map((s) => ({ id: s.des, label: s.persen, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk desimal, lalu persen." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.des, label: s.des, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.des, s.des]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K6(d: PropsLangkah) { return Kartu(d, 6, "k4b2e-memori", "Memori persen.", RONDE_MEMORI_CE.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CE[r].map((s, i) => ({ id: s.des, a: <Numeral n={s.des} />, labelA: `d ${HURUF[i]}`, b: <Numeral n={s.persen} />, labelB: s.persen }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b2e-ketuk", "Ketuk yang diminta.", RONDE_KETUK_CE.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CE[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk jawaban." /><KetukPilih key={r} kolom={3} item={ro.item.map((t, i) => ({ id: t, label: `P${HURUF[i]}`, isi: <Numeral n={t} kelas="text-lg" /> }))} soal={ro.tanya.map((t) => ({ tanya: `Ketuk ${t}.`, jawab: t, petunjuk: "Cermati angka.", pesan: t }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b2e-semua", "Ketuk semua syarat.", RONDE_SEMUA_CE.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CE[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={ro.syarat === "kurang100" ? "Ketuk persen < 100%." : "Ketuk persen > 100%."} /><KetukSemua key={r} tanya={ro.syarat === "kurang100" ? "Ketuk semua persen kurang dari 100%." : "Ketuk semua persen lebih dari 100%."} item={ro.item.map((t) => ({ id: t, label: t, benar: cocokPersenSyarat(t, ro.syarat), penjelasan: t }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K9(d: PropsLangkah) { return Kartu(d, 9, "k4b2e-cerita", "Cerita diskon dan kelas.", RONDE_CERITA_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CE[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "×100% atau samakan /100.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b2e-pb", "Batang ke persen.", RONDE_DES_PERS_PE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Batang" teks="Ubah ke persen." /><PilihBertahap key={r} soal={RONDE_DES_PERS_PE[r].map((s, i) => soalPersen(s, <VisualPec pec={s.pec} mode="batang" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b2e-pg", "Kotak ke persen.", RONDE_DES_PERS_PE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Kotak" teks="Grid seratus." /><PilihBertahap key={r} soal={RONDE_DES_PERS_PE[r].map((s, i) => soalPersen(s, <VisualPec pec={s.pec} mode="kotak" />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b2e-pj", "Jodoh diagram.", RONDE_PASANG_PE.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PE[r];
    const kanan = ro.map((s) => ({ id: s.des, label: s.persen, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.des, label: s.des, isi: <Numeral n={s.des} kelas="text-lg" /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.des, s.des]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b2e-pm", "Memori diagram.", RONDE_MEMORI_PE.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PE[r].map((s, i) => ({ id: s.des, a: <Numeral n={s.des} />, labelA: `d ${HURUF[i]}`, b: <Numeral n={s.persen} />, labelB: s.persen }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b2e-pt", "Tabel des→%.", RONDE_TABEL_PE.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Isi persen." /><PilihBertahap key={r} soal={RONDE_TABEL_PE[r].map((s, i) => soalPersen(s, <Numeral n={s.des} />, r * 2 + i, `Baris ${i + 1}`))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b2e-ps", "Ketuk semua.", RONDE_SEMUA_PE.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PE[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={ro.syarat === "kurang100" ? "Ketuk persen < 100%." : "Ketuk persen > 100%."} item={ro.item.map((t) => ({ id: t, label: t, isi: <Numeral n={t} kelas="text-lg" />, benar: cocokPersenSyarat(t, ro.syarat), penjelasan: t }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b2e-pl", "Pilah bentuk.", RONDE_SORTIR_PE.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Persen atau desimal." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PE[r].length, r).map((i) => { const s = RONDE_SORTIR_PE[r][i]; return { id: s.teks, label: s.teks, isi: <Numeral n={s.teks} kelas="text-lg" />, bin: s.jenis, petunjuk: "Ada %?", ucapan: s.teks }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) { return Kartu(d, 17, "k4b2e-pgeser", "Geser koma.", RONDE_DES_PERS_PE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Geser" teks="Geser koma dua kali ke kanan." /><PilihBertahap key={r} soal={RONDE_DES_PERS_PE[r].map((s, i) => soalPersen(s, <Numeral n={`geser ${s.des}`} kelas="text-xl" />, r * 2 + i + 3))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P8(d: PropsLangkah) { return Kartu(d, 18, "k4b2e-pc", "Pilih persen.", RONDE_BESAR_PE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Pilih" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_BESAR_PE[r].map((s, i) => soalPersen(s, <Numeral n={s.des} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b2e-pst", "Cerita diagram.", RONDE_CERITA_QE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QE[r].map((s) => ({ visual: <Numeral n="%" kelas="text-2xl" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat dua cara.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b2e-qw", "Tulis persen.", RONDE_DES_PERS_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tulis" teks="Pilih persen." /><PilihBertahap key={r} soal={RONDE_DES_PERS_CE[r].map((s, i) => soalPersen(s, <Numeral n={s.des} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b2e-qb", "Tulis desimal dari %.", RONDE_BALIK_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Balik" teks="Pilih desimal." /><PilihBertahap key={r} soal={RONDE_BALIK_CE[r].map((s, i) => soalDesDariPersen(s.persen, s.des, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b2e-qp", "Pilih hasil.", RONDE_BESAR_CE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Hasil persen." /><PilihBertahap key={r} soal={RONDE_BESAR_CE[r].map((s, i) => soalPersen(s, <Numeral n={`${s.des} × 100%`} kelas="text-lg" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b2e-qu", "Urutkan.", RONDE_URUT_CE.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CE[r];
    const kunci = [...ro.angka].sort((x, y) => {
      const vx = x.includes("%") ? Number(x.replace("%", "")) / 100 : nilaiDes(x);
      const vy = y.includes("%") ? Number(y.replace("%", "")) / 100 : nilaiDes(y);
      return ro.dari === "kecil" ? vx - vy : vy - vx;
    });
    return (<><CatatanPensil pendek="Urut" teks="Urutkan nilai." /><UrutKetuk key={r} item={urutTampil(ro.angka, kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b2e-qj", "Jodohkan notasi.", RONDE_PASANG_CE.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CE[r];
    const kanan = ro.map((s) => ({ id: s.des, label: s.persen, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.des, label: s.des, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.des, s.des]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b2e-qm", "Memori notasi.", RONDE_MEMORI_CE.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CE[r].map((s, i) => ({ id: s.des, a: <Numeral n={s.des} />, labelA: `d ${HURUF[i]}`, b: <Numeral n={s.persen} />, labelB: s.persen }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b2e-qbs", "Benar atau salah.", RONDE_BENARSALAH_QE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QE[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b2e-qd", "Detektif.", RONDE_DETEKTIF_QE.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QE[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b2e-qpeta", "Peta konsep.", PETA_KONSEP_QE.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QE[r].pusat} kotak={PETA_KONSEP_QE[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b2e-qc", "Cerita angka.", RONDE_CERITA_QE.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QE[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "×100% atau /100.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B2E(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "％", nama: "CONCRETE", cara: "Desimal ke persen!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B2E(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram persen", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B2E(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "×100% & balik", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_E42} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB E ➡️" />} />;
}
