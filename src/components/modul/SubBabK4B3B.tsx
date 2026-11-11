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
  HURUF, RONDE_BACA_CB, RONDE_LANJUT_CB, RONDE_SORTIR_CB, RONDE_PASANG_CB, RONDE_MEMORI_CB, RONDE_KETUK_CB, RONDE_SEMUA_CB, RONDE_CERITA_CB, RONDE_URUT_CB,
  RONDE_LANJUT_PB, RONDE_PASANG_PB, RONDE_MEMORI_PB, RONDE_TABEL_PB, RONDE_SEMUA_PB, RONDE_SORTIR_PB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, PETA_KONSEP_QB, RONDE_CERITA_QB,
  teksBeda, opsiAngka, urutTampil, urutanTetap, idSuku, cocokJenisPola, bedaPola,
} from "./data-k4b3";
import { buatKartu, VisualPola, Numeral } from "./bantu-k4b3";
import { visualInfografisK4B3B } from "./infografis-k4b3";
import { SUB_B43 } from "./naskah-k4b3";

const J = SUB_B43.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "membesar", label: "Membesar", warna: "#BBF7D0" },
  { id: "mengecil", label: "Mengecil", warna: "#FECACA" },
];

const lanjutArah = (arah: "besar" | "kecil", r: number) => {
  const semua = RONDE_LANJUT_CB.flat().filter((s) => (arah === "besar" ? bedaPola(s.awal) > 0 : bedaPola(s.awal) < 0));
  return [semua[r % semua.length], semua[(r + 1) % semua.length]];
};

export function InfografisK4B3BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B43} judul="Pola Bilangan" suaraInfo={SUARA_INFO} visual={visualInfografisK4B3B()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b3b-baca", "Baca pola bilangan.", RONDE_BACA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Baca" teks="Tentukan jenis pola." /><PilihBertahap key={r} soal={RONDE_BACA_CB[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["membesar", "mengecil", "tetap"][x]);
      return { visual: <VisualPola suku={s.suku} mode="angka" />, tanya: "Jenis polanya?", opsi, jawab: opsi.indexOf(s.jenis), petunjuk: "Lihat apakah bilangan naik atau turun.", pesan: `Beda ${teksBeda(s.beda)} → ${s.jenis}.` };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b3b-lanjut+", "Lanjutkan membesar.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Lanjut +" teks="Pilih suku berikutnya." /><PilihBertahap key={r} soal={lanjutArah("besar", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualPola suku={s.awal} mode="angka" />, tanya: "Bilangan berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Tambahkan beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b3b-lanjut-", "Lanjutkan mengecil.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Lanjut −" teks="Pilih suku berikutnya." /><PilihBertahap key={r} soal={lanjutArah("kecil", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i + 3);
      return { visual: <VisualPola suku={s.awal} mode="angka" />, tanya: "Bilangan berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Kurangkan beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b3b-sortir", "Pilah jenis pola.", RONDE_SORTIR_CB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Membesar atau mengecil." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_CB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CB[r][i];
      return { id: idSuku(s.suku), label: s.suku.join(","), isi: <VisualPola suku={s.suku} mode="angka" kecil />, bin: s.jenis, petunjuk: "Lihat arah perubahan.", ucapan: s.suku.join(" ") };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b3b-jodoh", "Jodohkan pola–beda.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.beda, label: s.beda, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk pola, lalu bedanya." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.beda, label: s.suku.join(","), isi: <VisualPola suku={s.suku} mode="angka" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.beda, s.beda]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b3b-memori", "Memori pola.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pola dan beda." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.beda, a: <VisualPola suku={s.suku} mode="angka" kecil />, labelA: `p ${HURUF[i]}`, b: <Numeral n={s.beda} />, labelB: s.beda }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b3b-ketuk", "Ketuk pola.", RONDE_KETUK_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((s, i) => ({ id: idSuku(s), label: `P${HURUF[i]}`, isi: <VisualPola suku={s} mode="angka" kecil /> }))} soal={ro.tanya.map((s) => ({ tanya: `Ketuk pola ${s.join(", ")}.`, jawab: idSuku(s), petunjuk: "Cocokkan suku.", pesan: s.join(", ") }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b3b-semua", "Ketuk semua jenis.", RONDE_SEMUA_CB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua yang ${ro.jenis}.`} /><KetukSemua key={r} tanya={`Ketuk semua pola ${ro.jenis}.`} item={ro.item.map((s) => ({ id: idSuku(s.suku), label: s.suku.join(","), benar: cocokJenisPola(s, ro.jenis), penjelasan: `${s.suku.join(",")} ${s.jenis}.` }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b3b-cerita", "Cerita telur/rak/TV.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Pakai beda tetap.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b3b-urut", "Urutkan bilangan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k4b3b-pb", "Rantai membesar.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Membesar" teks="Pilih lanjut." /><PilihBertahap key={r} soal={lanjutArah("besar", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualPola suku={s.awal} mode="angka" />, tanya: "Berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Tambah beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k4b3b-pk", "Rantai mengecil.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Mengecil" teks="Pilih lanjut." /><PilihBertahap key={r} soal={lanjutArah("kecil", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i + 1);
      return { visual: <VisualPola suku={s.awal} mode="angka" />, tanya: "Berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Kurangi beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b3b-pj", "Jodoh rantai.", RONDE_PASANG_PB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const kanan = ro.map((s) => ({ id: s.beda, label: s.beda, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk rantai." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.beda, label: s.suku.join(","), isi: <VisualPola suku={s.suku} mode="angka" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.beda, s.beda]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b3b-pm", "Memori rantai.", RONDE_MEMORI_PB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PB[r].map((s, i) => ({ id: s.beda, a: <VisualPola suku={s.suku} mode="angka" kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.beda} />, labelB: s.beda }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b3b-pt", "Tabel lanjut.", RONDE_TABEL_PB.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi suku berikutnya." /><PilihBertahap key={r} soal={RONDE_TABEL_PB[r].map((s, i) => {
      const o = opsiAngka(s.lanjut, r * 2 + i);
      return { visual: <VisualPola suku={s.suku} mode="angka" />, tanya: `Baris ${i + 1}: lanjut?`, opsi: o.map(String), jawab: o.indexOf(s.lanjut), petunjuk: "Pakai beda.", pesan: String(s.lanjut) };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b3b-ps", "Ketuk semua rantai.", RONDE_SEMUA_PB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis}.`} item={ro.item.map((s) => ({ id: idSuku(s.suku), label: s.suku.join(","), isi: <VisualPola suku={s.suku} mode="angka" kecil />, benar: cocokJenisPola(s, ro.jenis), penjelasan: s.jenis }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b3b-pl", "Pilah rantai.", RONDE_SORTIR_PB.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Jenis pola." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PB[r][i];
      return { id: idSuku(s.suku), label: s.suku.join(","), isi: <VisualPola suku={s.suku} mode="angka" kecil />, bin: s.jenis, petunjuk: "Arah perubahan.", ucapan: s.suku.join(" ") };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b3b-pd", "Temukan beda.", RONDE_PASANG_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Beda" teks="Pilih beda." /><PilihBertahap key={r} soal={RONDE_PASANG_PB[r].slice(0, 2).map((s, i) => {
      const dlt = bedaPola(s.suku);
      const opsi = urutanKe(3, r * 2 + i).map((x) => [s.beda, teksBeda(dlt + 1), teksBeda(dlt - 1)][x]);
      return { visual: <VisualPola suku={s.suku} mode="angka" />, tanya: "Berapa bedanya?", opsi, jawab: opsi.indexOf(s.beda), petunjuk: "Kurangi suku berurutan.", pesan: s.beda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b3b-pc", "Pilih berikutnya.", RONDE_LANJUT_PB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Suku berikutnya." /><PilihBertahap key={r} soal={RONDE_LANJUT_PB[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualPola suku={s.awal} mode="angka" />, tanya: "Berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Beda tetap.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b3b-pst", "Cerita rantai.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Pakai pola.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k4b3b-qw", "Tulis lanjut.", RONDE_LANJUT_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tulis" teks="Pilih suku berikutnya." /><PilihBertahap key={r} soal={RONDE_LANJUT_CB[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <Numeral n={`${s.awal.join(", ")}, …`} kelas="text-lg" />, tanya: "Lanjut?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Beda tetap.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k4b3b-qb", "Tulis beda.", RONDE_PASANG_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Beda" teks="Pilih beda." /><PilihBertahap key={r} soal={RONDE_PASANG_CB[r].slice(0, 2).map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [s.beda, "+1", "-1"][x]);
      return { visual: <Numeral n={s.suku.join(", ")} kelas="text-lg" />, tanya: "Beda?", opsi, jawab: opsi.indexOf(s.beda), petunjuk: "Suku kedua − suku pertama.", pesan: s.beda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k4b3b-qjns", "Pilih jenis.", RONDE_BACA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Jenis" teks="Membesar atau mengecil?" /><PilihBertahap key={r} soal={RONDE_BACA_CB[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["membesar", "mengecil", "tetap"][x]);
      return { visual: <Numeral n={s.suku.join(", ")} />, tanya: "Jenis?", opsi, jawab: opsi.indexOf(s.jenis), petunjuk: "Lihat beda.", pesan: s.jenis };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b3b-qu", "Urutkan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b3b-qj", "Jodohkan notasi.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.beda, label: s.beda, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.beda, label: s.suku.join(","), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.beda, s.beda]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k4b3b-qm", "Memori notasi.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.beda, a: <Numeral n={s.suku.join(",")} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.beda} />, labelB: s.beda }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k4b3b-qbs", "Benar atau salah.", RONDE_BENARSALAH_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b3b-qd", "Detektif.", RONDE_DETEKTIF_QB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k4b3b-qpeta", "Peta konsep.", PETA_KONSEP_QB.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QB[r].pusat} kotak={PETA_KONSEP_QB[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k4b3b-qc", "Cerita angka.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Beda tetap.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🔢", nama: "CONCRETE", cara: "Temukan beda bilangan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Rantai bilangan", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B3B(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Beda & lanjut", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_B43} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />} />;
}
