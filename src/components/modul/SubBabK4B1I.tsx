"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, PetaKonsepGame, Sortir } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanEmpat } from "./mesin-k4b1";
import {
  HURUF, RONDE_FAKTOR_CI, RONDE_SORTIR_CI, RONDE_PASANG_CI, RONDE_MEMORI_CI, RONDE_KETUK_CI, RONDE_SEMUA_CI, RONDE_KELIPATAN_CI, RONDE_PAPAN_CI, RONDE_URUT_CI,
  RONDE_FAKTOR_PI, RONDE_PASANG_PI, RONDE_MEMORI_PI, RONDE_TABEL_PI, RONDE_SEMUA_PI, RONDE_SORTIR_PI, RONDE_KELIPATAN_PI, RONDE_BENARSALAH_QI, RONDE_DETEKTIF_QI, PETA_KONSEP_QI, RONDE_CERITA_QI,
  adalahFaktor, opsiKali, urutTampil, urutanTetap,
} from "./data-k4b1";
import { buatKartu, ArrayKali, Numeral } from "./bantu-k4b1";
import { visualInfografisK4B1I } from "./infografis-k4b1";
import { SUB_I41 } from "./naskah-k4b1";

const J = SUB_I41.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const BIN = [
  { id: "faktor", label: "Faktor", warna: "#BBF7D0" },
  { id: "bukan", label: "Bukan faktor", warna: "#FECACA" },
];
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const opsiAngka = (h: number, seed: number) => opsiKali(h, seed);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B1IKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_I41} judul="Faktor dan Kelipatan" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1I()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b1i-pasangan", "Pilih pasangan faktor.", RONDE_FAKTOR_CI.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pasangan" teks="Pilih pasangan yang hasilnya n." /><PilihBertahap key={r} soal={RONDE_FAKTOR_CI[r].map((s, i) => {
      const f = s.faktor[1] ?? 2;
      const pasangan = s.n / f;
      const o = [`${f} × ${pasangan}`, `${f} × ${pasangan + 1}`, `${f + 1} × ${pasangan}`];
      const opsi = urutanKe(3, r * 2 + i).map((x) => o[x]);
      return { visual: <ArrayKali a={f} b={pasangan} benda="kue" />, tanya: `Pasangan faktor ${s.n}?`, opsi, jawab: opsi.indexOf(`${f} × ${pasangan}`), petunjuk: "Hasil kali harus n.", pesan: `${f} × ${pasangan} = ${s.n}.` };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b1i-daftar", "Pilih daftar faktor.", RONDE_PASANG_CI.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Daftar" teks="Pilih daftar faktor benar." /><PilihBertahap key={r} soal={RONDE_PASANG_CI[r].map((s, i) => {
      const opsi = urutanKe(3, r * 2 + i).map((x) => [s.daftar, s.daftar.replace(/,\d+$/, ""), "1,2,5"][x]);
      return { visual: <Numeral n={s.n} kelas="text-4xl" />, tanya: `Faktor ${s.n}?`, opsi, jawab: opsi.indexOf(s.daftar), petunjuk: "Semua pembagi habis.", pesan: `Faktor ${s.n}: ${s.daftar}.` };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b1i-sortir", "Pilah faktor atau bukan.", RONDE_SORTIR_CI.length, "Pilah semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_CI[r];
    return (<><IgilBicara pendek="Pilah" teks={`Pilah kandidat faktor ${ro.n}.`} /><Sortir key={r} lebarItem={70} kolomBin={2} item={urutanKe(ro.kandidat.length, r).map((i) => { const f = ro.kandidat[i]; return { id: String(f), label: String(f), isi: <Numeral n={f} kelas="text-2xl" />, bin: adalahFaktor(ro.n, f) ? "faktor" : "bukan", petunjuk: adalahFaktor(ro.n, f) ? `${ro.n} : ${f} habis.` : `${ro.n} : ${f} bersisa.`, ucapan: `Angka ${f}.` }; })} bin={BIN} onBeres={beres} pesanBeres="Semua sudah dipilah." /></>);
  });
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b1i-jodoh", "Jodohkan bilangan dan faktor.", RONDE_PASANG_CI.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CI[r];
    const kanan = ro.map((s) => ({ id: String(s.n), label: s.daftar, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk bilangan, lalu daftar faktor." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: String(s.n), label: String(s.n), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [String(s.n), String(s.n)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Semua pasangan cocok." /></>);
  });
}
function K4(d: PropsLangkah) { return Kartu(d, 4, "k4b1i-memori", "Memori bilangan dan faktor.", RONDE_MEMORI_CI.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan n dengan daftar faktor." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CI[r].map((s, i) => ({ id: String(s.n), a: <Numeral n={s.n} kelas="text-3xl" />, labelA: `bilangan ${HURUF[i]}`, b: <span className="text-[10px] font-black leading-tight">{s.daftar}</span>, labelB: s.daftar }))} onBeres={beres} pesanBeres="Memori selesai." /></>)); }
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b1i-ketuk", "Ketuk faktor yang diminta.", RONDE_KETUK_CI.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CI[r];
    return (<><IgilBicara pendek="Ketuk" teks={`Ketuk faktor ${ro.n}.`} /><KetukPilih key={r} kolom={3} item={ro.item.map((f) => ({ id: String(f), label: String(f), isi: <Numeral n={f} kelas="text-2xl" /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk faktor ${n}.`, jawab: String(n), petunjuk: `Apakah ${ro.n} habis dibagi?`, pesan: `${n} faktor ${ro.n}.` }))} onBeres={beres} pesanBeres="Semua tepat." /></>);
  });
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b1i-semua", "Ketuk semua faktor.", RONDE_SEMUA_CI.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CI[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua faktor ${ro.n}.`} /><KetukSemua key={r} tanya={`Ketuk semua faktor ${ro.n}.`} item={ro.item.map((f) => ({ id: String(f), label: String(f), benar: adalahFaktor(ro.n, f), penjelasan: adalahFaktor(ro.n, f) ? `${f} membagi ${ro.n}.` : `${f} bukan faktor.` }))} onBeres={beres} pesanBeres="Semua faktor ditemukan." /></>);
  });
}
function K7(d: PropsLangkah) { return Kartu(d, 7, "k4b1i-cerita", "Cerita kelipatan.", RONDE_CERITA_QI.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_QI[r].map((s, i) => ({ visual: <Numeral n="?" kelas="text-4xl" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat faktor atau kelipatan.", pesan: s.pesan, angka: true }))} onBeres={beres} pesanBeres="Cerita selesai." /></>)); }
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b1i-hilang", "Lengkapi deret kelipatan.", RONDE_KELIPATAN_CI.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Deret" teks="Pilih bilangan yang hilang." /><PilihBertahap key={r} soal={RONDE_KELIPATAN_CI[r].map((s, i) => {
      const tampil = s.deret.map((x) => (x === s.hilang ? "…" : String(x))).join(", ");
      const o = opsiAngka(s.hilang, r * 2 + i);
      return { visual: <span className="text-sm font-black">{tampil}</span>, tanya: `Kelipatan ${s.n}: angka hilang?`, opsi: o.map(String), jawab: o.indexOf(s.hilang), petunjuk: `Loncat ${s.n}.`, pesan: `Yang hilang ${s.hilang}.`, angka: true };
    })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b1i-urut", "Urutkan kelipatan.", RONDE_URUT_CI.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CI[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? x - y : y - x)).map(String);
    return (<><IgilBicara pendek="Urutkan" teks={`Urutkan dari yang ${ro.dari === "kecil" ? "terkecil" : "terbesar"}.`} /><UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label} bukan berikutnya.`} onBeres={beres} pesanBeres="Urutan benar." /></>);
  });
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b1i-pp", "Pasangan di tabel.", RONDE_TABEL_PI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Pasangan" teks="Lengkapi f × ? = n." /><PilihBertahap key={r} soal={RONDE_TABEL_PI[r].map((s, i) => { const o = opsiAngka(s.pasangan, r * 2 + i); return { visual: <span className="text-lg font-black">{s.f} × ? = {s.n}</span>, tanya: "Berapa pasangannya?", opsi: o.map(String), jawab: o.indexOf(s.pasangan), petunjuk: "Bagi n dengan f.", pesan: `${s.f} × ${s.pasangan} = ${s.n}.`, angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b1i-arr", "Array faktor.", RONDE_FAKTOR_PI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Array" teks="Array menunjukkan faktor." /><PilihBertahap key={r} soal={RONDE_FAKTOR_PI[r].map((s, i) => { const f = s.faktor[2] ?? 3; const pasangan = s.n / f; const o = [`${f} dan ${pasangan}`, `${f} dan ${pasangan + 1}`, `1 dan ${s.n + 1}`]; const opsi = urutanKe(3, r * 2 + i).map((x) => o[x]); return { visual: <ArrayKali a={f} b={pasangan} titik />, tanya: `Faktor array ${s.n}?`, opsi, jawab: opsi.indexOf(`${f} dan ${pasangan}`), petunjuk: "Baris dan kolom.", pesan: `${f} dan ${pasangan}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b1i-jp", "Jodohkan model faktor.", RONDE_PASANG_PI.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PI[r];
    const kanan = ro.map((s) => ({ id: String(s.n), label: s.daftar, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk n, lalu daftar." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: String(s.n), label: String(s.n), isi: <ArrayKali a={2} b={Math.max(1, Math.floor(s.n / 2))} titik /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [String(s.n), String(s.n)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b1i-mp", "Memori model.", RONDE_MEMORI_PI.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan n dengan faktor." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PI[r].map((s, i) => ({ id: String(s.n), a: <Numeral n={s.n} kelas="text-3xl" />, labelA: `n ${HURUF[i]}`, b: <span className="text-[10px] font-black">{s.daftar}</span>, labelB: s.daftar }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b1i-tp", "Tabel pasangan.", RONDE_TABEL_PI.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Isi pasangan." /><PilihBertahap key={r} soal={RONDE_TABEL_PI[r].map((s, i) => { const o = opsiAngka(s.pasangan, r * 2 + i); return { visual: <span className="text-lg font-black">{s.n} : {s.f} = ?</span>, tanya: `Baris ${i + 1}`, opsi: o.map(String), jawab: o.indexOf(s.pasangan), petunjuk: "Bagi.", pesan: `${s.n} : ${s.f} = ${s.pasangan}.`, angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b1i-smp", "Ketuk semua faktor.", RONDE_SEMUA_PI.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PI[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua faktor ${ro.n}.`} /><KetukSemua key={r} tanya={`Ketuk semua faktor ${ro.n}.`} item={ro.item.map((f) => ({ id: String(f), label: String(f), benar: adalahFaktor(ro.n, f), penjelasan: adalahFaktor(ro.n, f) ? "Faktor." : "Bukan." }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b1i-plp", "Pilah label faktor.", RONDE_SORTIR_PI.length, "Pilah semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_PI[r];
    return (<><CatatanTempel pendek="Pilah" teks="Faktor atau bukan." /><Sortir key={r} lebarItem={70} kolomBin={2} item={urutanKe(ro.kandidat.length, r).map((i) => { const f = ro.kandidat[i]; return { id: String(f), label: String(f), isi: <Numeral n={f} kelas="text-xl" />, bin: adalahFaktor(ro.n, f) ? "faktor" : "bukan", petunjuk: `Untuk ${ro.n}.`, ucapan: String(f) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b1i-deret", "Deret kelipatan.", RONDE_KELIPATAN_PI.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Deret" teks="Lengkapi deret." /><PilihBertahap key={r} soal={RONDE_KELIPATAN_PI[r].map((s, i) => { const tampil = s.deret.map((x) => (x === s.hilang ? "…" : String(x))).join(", "); const o = opsiAngka(s.hilang, r * 2 + i); return { visual: <span className="text-sm font-black">{tampil}</span>, tanya: `Kelipatan ${s.n}`, opsi: o.map(String), jawab: o.indexOf(s.hilang), petunjuk: `Loncat ${s.n}.`, pesan: `Hilang ${s.hilang}.`, angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b1i-hari", "Hari ke-n.", RONDE_KELIPATAN_PI.length, "Jawab semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Hari" teks="Kelipatan hari." /><PilihBertahap key={r} soal={RONDE_KELIPATAN_PI[r].map((s, i) => { const hari = s.deret.indexOf(s.hilang) + 1; const o = opsiAngka(s.hilang, r * 2 + i); return { visual: <span className="text-sm font-black">hari ke-{hari}, loncat {s.n}</span>, tanya: "Berapa isinya?", opsi: o.map(String), jawab: o.indexOf(s.hilang), petunjuk: `${hari} × ${s.n}.`, pesan: `Hari ke-${hari} = ${s.hilang}.`, angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b1i-bukan", "Mengapa bukan faktor.", RONDE_SORTIR_PI.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_PI[r];
    const bukan = ro.kandidat.find((f) => !adalahFaktor(ro.n, f)) ?? 5;
    const benar = `sisa ${ro.n % bukan}`;
    const opsi = urutanKe(3, r).map((x) => [benar, "sisa 0", "karena genap"][x]);
    return (<><CatatanTempel pendek="Alasan" teks="Pilih alasan." /><PilihBertahap key={r} soal={[{ visual: <Numeral n={`${ro.n} : ${bukan}`} />, tanya: `Mengapa ${bukan} bukan faktor ${ro.n}?`, opsi, jawab: opsi.indexOf(benar), petunjuk: "Lihat sisa.", pesan: benar }]} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b1i-df", "Daftar faktor angka.", RONDE_PASANG_CI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Daftar" teks="Pilih daftar." /><PilihBertahap key={r} soal={RONDE_PASANG_CI[r].map((s, i) => { const opsi = urutanKe(3, r * 2 + i).map((x) => [s.daftar, "1,2,5,7", "2,4,8"][x]); return { visual: <Numeral n={s.n} kelas="text-4xl" />, tanya: `Faktor ${s.n}`, opsi, jawab: opsi.indexOf(s.daftar), petunjuk: "Pembagi habis.", pesan: s.daftar }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b1i-kl", "Pilih kelipatan.", RONDE_KELIPATAN_CI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Kelipatan" teks="Pilih yang hilang." /><PilihBertahap key={r} soal={RONDE_KELIPATAN_CI[r].map((s, i) => { const o = opsiAngka(s.hilang, r * 2 + i); return { visual: <span className="text-sm font-black">{s.deret.map((x) => (x === s.hilang ? "…" : x)).join(", ")}</span>, tanya: `Kelipatan ${s.n}`, opsi: o.map(String), jawab: o.indexOf(s.hilang), petunjuk: `×${s.n}`, pesan: String(s.hilang), angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b1i-pap", "Banyak faktor di papan.", RONDE_PAPAN_CI.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Papan" teks="Tulis banyak faktor." /><PapanEmpat key={r} soal={RONDE_PAPAN_CI[r].map((s) => ({ visual: <Numeral n={s.n} />, tanya: "Berapa banyak faktor?", jawab: s.jawab, petunjuk: "Hitung semua pembagi.", pesan: `${s.n} punya ${s.jawab} faktor.` }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) { return Kartu(d, 23, "k4b1i-hil", "Angka hilang.", RONDE_KELIPATAN_CI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Hilang" teks="Lengkapi." /><PilihBertahap key={r} soal={RONDE_KELIPATAN_CI[r].map((s, i) => { const o = opsiAngka(s.hilang, r * 2 + i + 1); return { visual: <Numeral n={`kelipatan ${s.n}`} />, tanya: `Yang hilang dari ${s.deret.join(",")}`, opsi: o.map(String), jawab: o.indexOf(s.hilang), petunjuk: "Loncat tetap.", pesan: String(s.hilang), angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b1i-jq", "Jodohkan n dan faktor.", RONDE_PASANG_CI.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CI[r];
    const kanan = ro.map((s) => ({ id: String(s.n), label: s.daftar, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk n, lalu faktor." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: String(s.n), label: String(s.n), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [String(s.n), String(s.n)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b1i-mq", "Memori n dan faktor.", RONDE_MEMORI_CI.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CI[r].map((s, i) => ({ id: String(s.n), a: <Numeral n={s.n} kelas="text-3xl" />, labelA: `n ${HURUF[i]}`, b: <span className="text-[10px] font-black">{s.daftar}</span>, labelB: s.daftar }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b1i-bs", "Benar atau salah.", RONDE_BENARSALAH_QI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai tiap pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QI[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b1i-dt", "Detektif.", RONDE_DETEKTIF_QI.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QI[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b1i-pt", "Peta konsep.", PETA_KONSEP_QI.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi kotak." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QI[r].pusat} kotak={PETA_KONSEP_QI[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b1i-cq", "Cerita angka.", RONDE_CERITA_QI.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca dan hitung." /><PilihBertahap key={r} soal={RONDE_CERITA_QI[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), petunjuk: "Faktor atau kelipatan.", pesan: s.pesan, angka: true }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B1I(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧩", nama: "CONCRETE", cara: "Faktor dan deret!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B1I(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Model dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B1I(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Angka dan konsep", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_I41} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB I ➡️" />} />;
}
