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
  HURUF, RONDE_BACA_CA, RONDE_LANJUT_CA, RONDE_SORTIR_CA, RONDE_PASANG_CA, RONDE_MEMORI_CA, RONDE_KETUK_CA, RONDE_SEMUA_CA, RONDE_CERITA_CA, RONDE_URUT_CA,
  RONDE_LANJUT_PA, RONDE_PASANG_PA, RONDE_MEMORI_PA, RONDE_TABEL_PA, RONDE_SEMUA_PA, RONDE_SORTIR_PA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, PETA_KONSEP_QA, RONDE_CERITA_QA,
  teksBeda, opsiAngka, urutTampil, urutanTetap, idSuku, cocokJenisPola, bedaPola,
} from "./data-k4b3";
import { buatKartu, VisualPola, Numeral } from "./bantu-k4b3";
import { visualInfografisK4B3A } from "./infografis-k4b3";
import { SUB_A43 } from "./naskah-k4b3";

const J = SUB_A43.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
const BIN = [
  { id: "membesar", label: "Membesar", warna: "#BBF7D0" },
  { id: "mengecil", label: "Mengecil", warna: "#FECACA" },
];

const lanjutArah = (arah: "besar" | "kecil", r: number) => {
  const semua = RONDE_LANJUT_CA.flat().filter((s) => (arah === "besar" ? bedaPola(s.awal) > 0 : bedaPola(s.awal) < 0));
  const a = semua[r % semua.length];
  const b = semua[(r + 1) % semua.length];
  return [a, b];
};

export function InfografisK4B3AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A43} judul="Pola Gambar" suaraInfo={SUARA_INFO} visual={visualInfografisK4B3A()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b3a-baca", "Baca pola gambar.", RONDE_BACA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Baca" teks="Tentukan jenis atau beda." /><PilihBertahap key={r} soal={RONDE_BACA_CA[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["membesar", "mengecil", "tetap"][x]);
      return { visual: <VisualPola suku={s.suku} emoji={s.beda > 0 ? "🟠" : "🍬"} />, tanya: "Jenis polanya?", opsi, jawab: opsi.indexOf(s.jenis), petunjuk: "Lihat apakah benda bertambah atau berkurang.", pesan: `Beda ${teksBeda(s.beda)} → ${s.jenis}.` };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b3a-lanjut+", "Lanjutkan membesar.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Lanjut +" teks="Pilih suku berikutnya." /><PilihBertahap key={r} soal={lanjutArah("besar", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualPola suku={s.awal} emoji="🟠" />, tanya: "Banyak benda berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Tambahkan beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b3a-lanjut-", "Lanjutkan mengecil.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Lanjut −" teks="Pilih suku berikutnya." /><PilihBertahap key={r} soal={lanjutArah("kecil", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i + 3);
      return { visual: <VisualPola suku={s.awal} emoji="🍬" />, tanya: "Banyak benda berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Kurangkan beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b3a-sortir", "Pilah jenis pola.", RONDE_SORTIR_CA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Membesar atau mengecil." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_CA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_CA[r][i];
      return { id: idSuku(s.suku), label: s.suku.join(","), isi: <VisualPola suku={s.suku} kecil emoji={s.jenis === "membesar" ? "🟠" : "🍬"} />, bin: s.jenis, petunjuk: "Lihat arah perubahan.", ucapan: s.suku.join(" ") };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b3a-jodoh", "Jodohkan pola–beda.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.beda, label: s.beda, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk pola, lalu bedanya." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.beda, label: s.suku.join(","), isi: <VisualPola suku={s.suku} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.beda, s.beda]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b3a-memori", "Memori pola.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Memori" teks="Cocokkan pola dan beda." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.beda, a: <VisualPola suku={s.suku} kecil />, labelA: `p ${HURUF[i]}`, b: <Numeral n={s.beda} />, labelB: s.beda }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b3a-ketuk", "Ketuk pola.", RONDE_KETUK_CA.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((s, i) => ({ id: idSuku(s), label: `P${HURUF[i]}`, isi: <VisualPola suku={s} kecil /> }))} soal={ro.tanya.map((s) => ({ tanya: `Ketuk pola ${s.join(", ")}.`, jawab: idSuku(s), petunjuk: "Cocokkan suku.", pesan: s.join(", ") }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b3a-semua", "Ketuk semua jenis.", RONDE_SEMUA_CA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua yang ${ro.jenis}.`} /><KetukSemua key={r} tanya={`Ketuk semua pola ${ro.jenis}.`} item={ro.item.map((s) => ({ id: idSuku(s.suku), label: s.suku.join(","), benar: cocokJenisPola(s, ro.jenis), penjelasan: `${s.suku.join(",")} ${s.jenis}.` }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b3a-cerita", "Cerita jeruk/permen.", RONDE_CERITA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Pakai beda tetap.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b3a-urut", "Urutkan banyak benda.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><IgilBicara pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) {
  return Kartu(d, 10, "k4b3a-pb", "Diagram membesar.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Membesar" teks="Pilih lanjut." /><PilihBertahap key={r} soal={lanjutArah("besar", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualPola suku={s.awal} emoji="🟠" />, tanya: "Berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Tambah beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P1(d: PropsLangkah) {
  return Kartu(d, 11, "k4b3a-pk", "Diagram mengecil.", 3, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Mengecil" teks="Pilih lanjut." /><PilihBertahap key={r} soal={lanjutArah("kecil", r).map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i + 1);
      return { visual: <VisualPola suku={s.awal} emoji="🍬" />, tanya: "Berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Kurangi beda.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b3a-pj", "Jodoh diagram.", RONDE_PASANG_PA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((s) => ({ id: s.beda, label: s.beda, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk diagram." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.beda, label: s.suku.join(","), isi: <VisualPola suku={s.suku} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.beda, s.beda]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b3a-pm", "Memori diagram.", RONDE_MEMORI_PA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PA[r].map((s, i) => ({ id: s.beda, a: <VisualPola suku={s.suku} kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.beda} />, labelB: s.beda }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b3a-pt", "Tabel lanjut.", RONDE_TABEL_PA.length, "Isi semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Tabel" teks="Isi suku berikutnya." /><PilihBertahap key={r} soal={RONDE_TABEL_PA[r].map((s, i) => {
      const o = opsiAngka(s.lanjut, r * 2 + i);
      return { visual: <VisualPola suku={s.suku} mode="angka" />, tanya: `Baris ${i + 1}: lanjut?`, opsi: o.map(String), jawab: o.indexOf(s.lanjut), petunjuk: "Pakai beda.", pesan: String(s.lanjut) };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b3a-ps", "Ketuk semua diagram.", RONDE_SEMUA_PA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua ${ro.jenis}.`} item={ro.item.map((s) => ({ id: idSuku(s.suku), label: s.suku.join(","), isi: <VisualPola suku={s.suku} kecil />, benar: cocokJenisPola(s, ro.jenis), penjelasan: s.jenis }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b3a-pl", "Pilah diagram.", RONDE_SORTIR_PA.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Jenis pola." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
      const s = RONDE_SORTIR_PA[r][i];
      return { id: idSuku(s.suku), label: s.suku.join(","), isi: <VisualPola suku={s.suku} kecil />, bin: s.jenis, petunjuk: "Arah perubahan.", ucapan: s.suku.join(" ") };
    })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b3a-pd", "Temukan beda.", RONDE_PASANG_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Beda" teks="Pilih beda." /><PilihBertahap key={r} soal={RONDE_PASANG_PA[r].slice(0, 2).map((s, i) => {
      const d = bedaPola(s.suku);
      const opsi = urutanKe(3, r * 2 + i).map((x) => [s.beda, teksBeda(d + 1), teksBeda(d - 1)][x]);
      return { visual: <VisualPola suku={s.suku} />, tanya: "Berapa bedanya?", opsi, jawab: opsi.indexOf(s.beda), petunjuk: "Kurangi suku berurutan.", pesan: s.beda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b3a-pc", "Pilih berikutnya.", RONDE_LANJUT_PA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilih" teks="Suku berikutnya." /><PilihBertahap key={r} soal={RONDE_LANJUT_PA[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <VisualPola suku={s.awal} mode="angka" />, tanya: "Berikutnya?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Beda tetap.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b3a-pst", "Cerita diagram.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Pakai pola.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k4b3a-qw", "Tulis lanjut.", RONDE_LANJUT_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Tulis" teks="Pilih suku berikutnya." /><PilihBertahap key={r} soal={RONDE_LANJUT_CA[r].map((s, i) => {
      const o = opsiAngka(s.jawab, r * 2 + i);
      return { visual: <Numeral n={`${s.awal.join(", ")}, …`} kelas="text-lg" />, tanya: "Lanjut?", opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: "Beda tetap.", pesan: s.pesan };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) {
  return Kartu(d, 21, "k4b3a-qb", "Tulis beda.", RONDE_PASANG_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Beda" teks="Pilih beda." /><PilihBertahap key={r} soal={RONDE_PASANG_CA[r].slice(0, 2).map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [s.beda, "+1", "-1"][x]);
      return { visual: <Numeral n={s.suku.join(", ")} kelas="text-lg" />, tanya: "Beda?", opsi, jawab: opsi.indexOf(s.beda), petunjuk: "Suku kedua − suku pertama.", pesan: s.beda };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q2(d: PropsLangkah) {
  return Kartu(d, 22, "k4b3a-qjns", "Pilih jenis.", RONDE_BACA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Jenis" teks="Membesar atau mengecil?" /><PilihBertahap key={r} soal={RONDE_BACA_CA[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => ["membesar", "mengecil", "tetap"][x]);
      return { visual: <Numeral n={s.suku.join(", ")} />, tanya: "Jenis?", opsi, jawab: opsi.indexOf(s.jenis), petunjuk: "Lihat beda.", pesan: s.jenis };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b3a-qu", "Urutkan.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((a, b) => (ro.dari === "kecil" ? a - b : b - a)).map(String);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b3a-qj", "Jodohkan notasi.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.beda, label: s.beda, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.beda, label: s.suku.join(","), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.beda, s.beda]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k4b3a-qm", "Memori notasi.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.beda, a: <Numeral n={s.suku.join(",")} kelas="text-sm" />, labelA: `n ${HURUF[i]}`, b: <Numeral n={s.beda} />, labelB: s.beda }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q6(d: PropsLangkah) {
  return Kartu(d, 26, "k4b3a-qbs", "Benar atau salah.", RONDE_BENARSALAH_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b3a-qd", "Detektif.", RONDE_DETEKTIF_QA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k4b3a-qpeta", "Peta konsep.", PETA_KONSEP_QA.length, "Selesaikan peta dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QA[r].pusat} kotak={PETA_KONSEP_QA[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>
  ));
}
function Q9(d: PropsLangkah) {
  return Kartu(d, 29, "k4b3a-qc", "Cerita angka.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.map(String).indexOf(String(s.jawab)), petunjuk: "Beda tetap.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🟠", nama: "CONCRETE", cara: "Susun pola benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram pola", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B3A(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Beda & lanjut", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_A43} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />} />;
}
