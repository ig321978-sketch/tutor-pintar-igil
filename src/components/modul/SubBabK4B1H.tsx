"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, PetaKonsepGame, Sortir } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanEmpat, RakitEmpat } from "./mesin-k4b1";
import { KoleksiEmpat } from "./dasar-k4b1";
import {
  HURUF, RONDE_BAGI_CH, RONDE_BAGI_HASIL_CH, RONDE_SORTIR_CH, RONDE_PASANG_CH, RONDE_MEMORI_CH, RONDE_KETUK_CH, RONDE_SEMUA_CH, RONDE_CERITA_CH, RONDE_PAPAN_CH, RONDE_URUT_CH,
  RONDE_BAGI_PH, RONDE_PASANG_PH, RONDE_MEMORI_PH, RONDE_TABEL_PH, RONDE_SEMUA_PH, RONDE_SORTIR_PH, RONDE_BENARSALAH_QH, RONDE_DETEKTIF_QH, PETA_KONSEP_QH, RONDE_CERITA_QH,
  hasilBagi, habisBagi, cocokHabis, opsiBagi, urutTampil, urutanTetap, type Bagi,
} from "./data-k4b1";
import { buatKartu, BagiKelompok, Numeral } from "./bantu-k4b1";
import { visualInfografisK4B1H } from "./infografis-k4b1";
import { SUB_H41 } from "./naskah-k4b1";

const J = SUB_H41.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const hasil = (a: number, b: number) => hasilBagi(a, b);
const TEKS = { habis: "habis dibagi", sisa: "bersisa" } as const;
const BIN = [
  { id: "habis", label: "Habis dibagi", warna: "#BBF7D0" },
  { id: "sisa", label: "Bersisa", warna: "#FECACA" },
];
const idJ = (p: Bagi) => `${p[0]}:${p[1]}`;
const ket = (a: number, b: number) => `${a} : ${b} = ${hasil(a, b)}${habisBagi(a, b) ? " (habis)." : ` sisa ${a % b}.`}`;
const soalH = (a: number, b: number, visual: React.ReactNode, nomor: number, tanya = "Berapa hasilnya?"): SoalBertahap => {
  const o = opsiBagi(hasil(a, b), nomor);
  return { visual, tanya, opsi: o.map(String), jawab: o.indexOf(hasil(a, b)), petunjuk: "Belum tepat. Mulai dari puluhan.", pesan: ket(a, b), angka: true };
};
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B1HKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_H41} judul="Pembagian sampai 100" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1H()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b1h-rakit", "Rakit hasil bagi, lalu tekan Periksa.", RONDE_BAGI_CH.length, "Rakit semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Rakit hasil" teks="Rakit hasil pembagian." /><RakitEmpat key={r} soal={RONDE_BAGI_CH[r].map(({ a, b, benda }) => ({ n: hasil(a, b), tanya: `Rakit ${a} : ${b}.`, nama: ["peti", "dus", "bungkus", "benda"] as [string, string, string, string], tampil: (rb, rr, p, s) => <KoleksiEmpat rb={rb} r={rr} p={p} s={s} benda={benda} ukuran={36} />, pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Semua hasil sudah dirakit." /></>
  ));
}
function K1(d: PropsLangkah) { return Kartu(d, 1, "k4b1h-hitung", "Hitung hasil bagi.", RONDE_BAGI_CH.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Hitung" teks="Bagi sama banyak." /><PilihBertahap key={r} soal={RONDE_BAGI_CH[r].map(({ a, b, benda }, i) => soalH(a, b, <BagiKelompok total={a} kelompok={b} benda={benda} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua sudah dihitung." /></>)); }
function K2(d: PropsLangkah) { return Kartu(d, 2, "k4b1h-sortir", "Pilah habis atau bersisa.", RONDE_SORTIR_CH.length, "Pilah semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Pilah" teks="Cek sisa bagi." /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_CH[r].length, r).map((i) => { const p = RONDE_SORTIR_CH[r][i]; return { id: idJ(p), label: `${p[0]}:${p[1]}`, isi: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil />, bin: habisBagi(p[0], p[1]) ? "habis" : "sisa", petunjuk: ket(p[0], p[1]), ucapan: ket(p[0], p[1]) }; })} bin={BIN} onBeres={beres} pesanBeres="Semua sudah dipilah." /></>)); }
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b1h-jodoh", "Jodohkan soal dan hasil.", RONDE_PASANG_CH.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CH[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(hasil(p[0], p[1])), isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk soal, lalu hasil." /><PasangKartu key={r} kiri={ro.map((p) => ({ id: idJ(p), label: `${p[0]}:${p[1]}`, isi: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Semua pasangan cocok." /></>);
  });
}
function K4(d: PropsLangkah) { return Kartu(d, 4, "k4b1h-memori", "Memori soal dan hasil.", RONDE_MEMORI_CH.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan soal dengan hasil." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CH[r].map((p, i) => ({ id: idJ(p), a: <span className="text-sm font-black">{p[0]} : {p[1]}</span>, labelA: `soal ${HURUF[i]}`, b: <Numeral n={hasil(p[0], p[1])} kelas="text-3xl" />, labelB: String(hasil(p[0], p[1])) }))} onBeres={beres} pesanBeres="Memori selesai." /></>)); }
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b1h-ketuk", "Ketuk pasangan berhasil tertentu.", RONDE_KETUK_CH.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CH[r];
    return (<><IgilBicara pendek="Ketuk" teks="Hitung lalu ketuk yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((p, i) => ({ id: idJ(p), label: `P${HURUF[i]}`, isi: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk yang hasilnya ${n}.`, jawab: idJ(ro.item.find((p) => hasil(p[0], p[1]) === n)!), petunjuk: "Bagi sama banyak.", pesan: `Hasilnya ${n}.` }))} onBeres={beres} pesanBeres="Semua tepat." /></>);
  });
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b1h-semua", "Ketuk semua yang cocok.", RONDE_SEMUA_CH.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CH[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua yang ${TEKS[ro.syarat]}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${TEKS[ro.syarat]}.`} item={ro.pasangan.map((p) => ({ id: idJ(p), label: `${p[0]} : ${p[1]}`, benar: cocokHabis(p, ro.syarat), penjelasan: ket(p[0], p[1]) }))} onBeres={beres} pesanBeres="Semua cocok ditemukan." /></>);
  });
}
function K7(d: PropsLangkah) { return Kartu(d, 7, "k4b1h-cerita", "Baca cerita, pilih hasil.", RONDE_CERITA_CH.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita, lalu pilih hasil." /><PilihBertahap key={r} soal={RONDE_CERITA_CH[r].map((s, i) => { const h = hasil(s.a, s.b); const o = opsiBagi(h, r * 2 + i); return { visual: <BagiKelompok total={s.a} kelompok={s.b} benda={s.benda} />, tanya: s.teks, opsi: o.map(String), jawab: o.indexOf(h), petunjuk: "Bagi sama banyak.", pesan: `Hasil ${h}.`, angka: true }; })} onBeres={beres} pesanBeres="Cerita selesai." /></>)); }
function K8(d: PropsLangkah) { return Kartu(d, 8, "k4b1h-papan", "Tulis hasil di papan.", RONDE_PAPAN_CH.length, "Isi semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Papan" teks="Hitung lalu isi papan." /><PapanEmpat key={r} soal={RONDE_PAPAN_CH[r].map(([a, b]) => ({ visual: <BagiKelompok total={a} kelompok={b} benda="jeruk" kecil />, tanya: "Isi hasil.", jawab: hasil(a, b), petunjuk: "Dari puluhan.", pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Papan selesai." /></>)); }
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b1h-urut", "Urutkan hasil.", RONDE_URUT_CH.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CH[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? x - y : y - x)).map(String);
    return (<><IgilBicara pendek="Urutkan" teks={`Urutkan dari yang ${ro.dari === "kecil" ? "terkecil" : "terbesar"}.`} /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label} bukan berikutnya.`} onBeres={beres} pesanBeres="Urutan benar." /></>);
  });
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b1h-sp", "Pilih hasil model.", RONDE_BAGI_PH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Model" teks="Bagi ke kelompok sama." /><PilihBertahap key={r} soal={RONDE_BAGI_PH[r].map(([a, b], i) => soalH(a, b, <BagiKelompok total={a} kelompok={b} benda="kue" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b1h-lk", "Langkah bersusun.", RONDE_BAGI_PH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Langkah" teks="Mulai dari puluhan." /><PilihBertahap key={r} soal={RONDE_BAGI_PH[r].map(([a, b], i) => soalH(a, b, <span className="text-center text-sm font-black">{a} : {b}<br />puluhan dulu</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) { return Kartu(d, 12, "k4b1h-hp", "Hasil bersusun.", RONDE_BAGI_PH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Bersusun" teks="Hitung bersusun." /><PilihBertahap key={r} soal={RONDE_BAGI_PH[r].map(([a, b], i) => soalH(a, b, <span className="text-2xl font-black">{a} : {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b1h-jp", "Jodohkan model dan hasil.", RONDE_PASANG_PH.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PH[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(hasil(p[0], p[1])), isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk model, lalu hasil." /><PasangKartu key={r} kiri={ro.map((p, i) => ({ id: idJ(p), label: `M${HURUF[i]}`, isi: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b1h-mp", "Memori model.", RONDE_MEMORI_PH.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan model dengan hasil." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PH[r].map((p, i) => ({ id: idJ(p), a: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil />, labelA: `model ${HURUF[i]}`, b: <Numeral n={hasil(p[0], p[1])} kelas="text-3xl" />, labelB: String(hasil(p[0], p[1])) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) { return Kartu(d, 15, "k4b1h-tp", "Isi tabel hasil.", RONDE_TABEL_PH.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Hitung tiap baris." /><PilihBertahap key={r} soal={RONDE_TABEL_PH[r].map(({ a, b }, i) => soalH(a, b, <span className="text-lg font-black">{a} : {b}</span>, r * 2 + i, `Baris ${i + 1}`))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b1h-smp", "Ketuk semua yang habis.", RONDE_SEMUA_PH.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PH[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua yang ${TEKS[ro.syarat]}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${TEKS[ro.syarat]}.`} item={ro.pasangan.map((p) => ({ id: idJ(p), label: idJ(p), isi: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil />, benar: cocokHabis(p, ro.syarat), penjelasan: ket(p[0], p[1]) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) { return Kartu(d, 17, "k4b1h-plp", "Pilah model.", RONDE_SORTIR_PH.length, "Pilah semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Pilah" teks="Pilah menurut sisa." /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_PH[r].length, r).map((i) => { const p = RONDE_SORTIR_PH[r][i]; return { id: idJ(p), label: `${p[0]}:${p[1]}`, isi: <BagiKelompok total={p[0]} kelompok={p[1]} benda="kue" kecil />, bin: habisBagi(p[0], p[1]) ? "habis" : "sisa", petunjuk: ket(p[0], p[1]), ucapan: ket(p[0], p[1]) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P8(d: PropsLangkah) { return Kartu(d, 18, "k4b1h-cek", "Periksa dengan kali.", RONDE_BAGI_PH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Periksa" teks="Hasil × pembagi = yang dibagi." /><PilihBertahap key={r} soal={RONDE_BAGI_PH[r].map(([a, b], i) => soalH(a, b, <span className="text-center text-sm font-black">{a} : {b}<br />cek ×</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b1h-sisa", "Ada sisa?", RONDE_BAGI_PH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Sisa" teks="Pilih hasil bagi." /><PilihBertahap key={r} soal={RONDE_BAGI_PH[r].map(([a, b], i) => soalH(a, b, <span className="text-lg font-black">{a} : {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b1h-sq", "Hasil bersusun angka.", RONDE_BAGI_HASIL_CH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Bersusun" teks="Mulai dari puluhan." /><PilihBertahap key={r} soal={RONDE_BAGI_HASIL_CH[r].map(([a, b], i) => soalH(a, b, <span className="text-3xl font-black">{a} : {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b1h-pq", "Pilih hasil.", RONDE_BAGI_HASIL_CH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Hitung dengan teliti." /><PilihBertahap key={r} soal={RONDE_BAGI_HASIL_CH[r].map(([a, b], i) => soalH(a, b, <Numeral n={`${a} : ${b}`} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b1h-paq", "Tulis di papan.", RONDE_PAPAN_CH.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Papan" teks="Isi hasil." /><PapanEmpat key={r} soal={RONDE_PAPAN_CH[r].map(([a, b]) => ({ visual: <Numeral n={`${a}:${b}`} />, tanya: "Isi hasil.", jawab: hasil(a, b), petunjuk: "Dari puluhan.", pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) { return Kartu(d, 23, "k4b1h-lq", "Langkah puluhan.", RONDE_BAGI_HASIL_CH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Langkah" teks="Selesaikan." /><PilihBertahap key={r} soal={RONDE_BAGI_HASIL_CH[r].map(([a, b], i) => soalH(a, b, <span className="text-xl font-black">{a} : {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b1h-jq", "Jodohkan soal dan hasil.", RONDE_PASANG_CH.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CH[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(hasil(p[0], p[1])), isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk soal, lalu hasil." /><PasangKartu key={r} kiri={ro.map((p) => ({ id: idJ(p), label: `${p[0]}:${p[1]}`, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b1h-mq", "Memori soal.", RONDE_MEMORI_CH.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan soal dengan hasil." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CH[r].map((p, i) => ({ id: idJ(p), a: <span className="text-sm font-black">{p[0]}:{p[1]}</span>, labelA: `soal ${HURUF[i]}`, b: <Numeral n={hasil(p[0], p[1])} kelas="text-3xl" />, labelB: String(hasil(p[0], p[1])) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b1h-bs", "Benar atau salah.", RONDE_BENARSALAH_QH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai tiap pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QH[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b1h-dt", "Detektif.", RONDE_DETEKTIF_QH.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QH[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b1h-pt", "Peta konsep.", PETA_KONSEP_QH.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi kotak." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QH[r].pusat} kotak={PETA_KONSEP_QH[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b1h-cq", "Cerita angka.", RONDE_CERITA_QH.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca dan hitung." /><PilihBertahap key={r} soal={RONDE_CERITA_QH[r].map((s, i) => { const h = hasil(s.a, s.b); const o = opsiBagi(h, r * 2 + i); return { visual: <Numeral n={`${s.a}:${s.b}`} />, tanya: s.teks, opsi: o.map(String), jawab: o.indexOf(h), petunjuk: "Dari puluhan.", pesan: `Hasil ${h}.`, angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B1H(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "➗", nama: "CONCRETE", cara: "Bagi sama banyak!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B1H(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Model dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B1H(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Angka dan langkah", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_H41} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB H ➡️" />} />;
}
