"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, PetaKonsepGame, Sortir } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import {
  HURUF, RONDE_SENILAI_CC, RONDE_KALI_CC, RONDE_BAGI_CC, RONDE_PASANG_CC, RONDE_MEMORI_CC, RONDE_SORTIR_CC, RONDE_KETUK_CC, RONDE_SEMUA_CC, RONDE_CERITA_CC, RONDE_URUT_CC,
  RONDE_SENILAI_PC, RONDE_KALI_PC, RONDE_BAGI_PC, RONDE_PASANG_PC, RONDE_MEMORI_PC, RONDE_SORTIR_PC, RONDE_SEMUA_PC, RONDE_TABEL_PC, RONDE_BENARSALAH_QC, RONDE_DETEKTIF_QC, PETA_KONSEP_QC, RONDE_CERITA_QC,
  teksPec, senilai, kaliSenilai, opsiPec, urutTampil, urutanTetap, nilaiPec, type Pec,
} from "./data-k4b2";
import { buatKartu, VisualPec, Numeral, idPec } from "./bantu-k4b2";
import { DuaPecahan } from "./diagram-k4b2";
import { visualInfografisK4B2C } from "./infografis-k4b2";
import { SUB_C42 } from "./naskah-k4b2";

const J = SUB_C42.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B2CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C42} judul="Pecahan Senilai" suaraInfo={SUARA_INFO} visual={visualInfografisK4B2C()} speakGuru={speakGuru} />;
}

const BIN = [
  { id: "sama", label: "Senilai", warna: "#BBF7D0" },
  { id: "beda", label: "Tidak senilai", warna: "#FECACA" },
];

function K0(d: PropsLangkah) { return Kartu(d, 0, "k4b2c-coklat", "Sama atau beda?", RONDE_SENILAI_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Coklat" teks="Apakah senilai?" /><PilihBertahap key={r} soal={RONDE_SENILAI_CC[r].map((s, i) => { const jawab = s.sama ? "sama" : "beda"; const opsi = urutanKe(3, r * 2 + i).map((x) => ["sama", "beda", "tidak tahu"][x]); return { visual: <DuaPecahan a={s.a} b={s.b} op="?" />, tanya: `${teksPec(s.a)} dan ${teksPec(s.b)}?`, opsi, jawab: opsi.indexOf(jawab), petunjuk: "Banding nilai.", pesan: s.sama ? "Senilai." : "Tidak senilai." }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K1(d: PropsLangkah) { return Kartu(d, 1, "k4b2c-kali", "Kalikan jadi senilai.", RONDE_KALI_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Kali" teks="Kalikan pembilang dan penyebut." /><PilihBertahap key={r} soal={RONDE_KALI_CC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <Numeral n={`${teksPec(s.asal)} ×${s.k}/×${s.k}`} kelas="text-lg" />, tanya: "Hasil senilai?", opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "Kalikan keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K2(d: PropsLangkah) { return Kartu(d, 2, "k4b2c-bagi", "Bagi jadi senilai.", RONDE_BAGI_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Bagi" teks="Bagi pembilang dan penyebut." /><PilihBertahap key={r} soal={RONDE_BAGI_CC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <Numeral n={`${teksPec(s.asal)} ÷${s.k}/÷${s.k}`} kelas="text-lg" />, tanya: "Hasil senilai?", opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "Bagi keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b2c-sortir", "Pilah senilai.", RONDE_SORTIR_CC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><IgilBicara pendek="Pilah" teks="Senilai atau tidak." /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_CC[r].length, r).map((i) => { const s = RONDE_SORTIR_CC[r][i]; const id = `${teksPec(s.a)}-${teksPec(s.b)}`; return { id, label: `${teksPec(s.a)} ? ${teksPec(s.b)}`, isi: <DuaPecahan a={s.a} b={s.b} />, bin: senilai(s.a, s.b) ? "sama" : "beda", petunjuk: "Hitung nilai.", ucapan: id }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b2c-jodoh", "Jodohkan senilai.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: teksPec(s.a), label: teksPec(s.b), isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk kiri, lalu pasangan senilai." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: teksPec(s.a), label: teksPec(s.a), isi: <VisualPec pec={s.a} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [teksPec(s.a), teksPec(s.a)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) { return Kartu(d, 5, "k4b2c-memori", "Memori senilai.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan pasangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: teksPec(s.a), a: <VisualPec pec={s.a} kecil />, labelA: `a ${HURUF[i]}`, b: <Numeral n={teksPec(s.b)} />, labelB: teksPec(s.b) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b2c-ketuk", "Ketuk yang senilai.", RONDE_KETUK_CC.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CC[r];
    return (<><IgilBicara pendek="Ketuk" teks={`Ketuk yang senilai ${teksPec(ro.pasangan)}.`} /><KetukPilih key={r} kolom={3} item={ro.item.map((p, i) => ({ id: idPec(p), label: `P${HURUF[i]}`, isi: <VisualPec pec={p} kecil /> }))} soal={ro.tanya.map((p) => ({ tanya: `Ketuk ${teksPec(p)} (senilai ${teksPec(ro.pasangan)}).`, jawab: idPec(p), petunjuk: "Cek nilai.", pesan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b2c-semua", "Ketuk semua senilai.", RONDE_SEMUA_CC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua yang senilai ${teksPec(ro.acuan)}.`} /><KetukSemua key={r} tanya={`Ketuk semua senilai ${teksPec(ro.acuan)}.`} item={ro.item.map((p) => ({ id: idPec(p), label: teksPec(p), benar: senilai(p, ro.acuan), penjelasan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) { return Kartu(d, 8, "k4b2c-cerita", "Cerita senilai.", RONDE_CERITA_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "×k atau :k.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b2c-urut", "Urutkan nilai.", RONDE_URUT_CC.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? nilaiPec(x) - nilaiPec(y) : nilaiPec(y) - nilaiPec(x))).map(teksPec);
    return (<><IgilBicara pendek="Urutkan" teks="Urutkan menurut nilai." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(teksPec), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b2c-pg", "Kotak senilai.", RONDE_SENILAI_PC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Kotak" teks="Sama atau beda?" /><PilihBertahap key={r} soal={RONDE_SENILAI_PC[r].map((s, i) => { const jawab = s.sama ? "sama" : "beda"; const opsi = urutanKe(3, r * 2 + i).map((x) => ["sama", "beda", "tidak tahu"][x]); return { visual: <div className="flex gap-2"><VisualPec pec={s.a} mode="kotak" /><VisualPec pec={s.b} mode="kotak" /></div>, tanya: "Senilai?", opsi, jawab: opsi.indexOf(jawab), petunjuk: "Luas arsir.", pesan: jawab }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b2c-pbar", "Batang senilai.", RONDE_SENILAI_PC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Batang" teks="Banding batang." /><PilihBertahap key={r} soal={RONDE_SENILAI_PC[r].map((s, i) => { const jawab = s.sama ? "sama" : "beda"; const opsi = urutanKe(3, r * 2 + i).map((x) => ["sama", "beda", "hampir"][x]); return { visual: <DuaPecahan a={s.a} b={s.b} mode="batang" />, tanya: "Senilai?", opsi, jawab: opsi.indexOf(jawab), petunjuk: "Panjang arsir.", pesan: jawab }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) { return Kartu(d, 12, "k4b2c-pk", "×k diagram.", RONDE_KALI_PC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Kali" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_KALI_PC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <VisualPec pec={s.asal} />, tanya: `×${s.k} pada pembilang & penyebut`, opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "Kalikan keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b2c-pbg", ":k diagram.", RONDE_BAGI_PC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Bagi" teks="Pilih hasil." /><PilihBertahap key={r} soal={RONDE_BAGI_PC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <VisualPec pec={s.asal} mode="batang" />, tanya: `÷${s.k} pada pembilang & penyebut`, opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "Bagi keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b2c-pj", "Jodoh diagram.", RONDE_PASANG_PC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PC[r];
    const kanan = ro.map((s) => ({ id: teksPec(s.a), label: teksPec(s.b), isi: <VisualPec pec={s.b} kecil /> }));
    return (<><CatatanTempel pendek="Jodoh" teks="Pasangkan senilai." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: teksPec(s.a), label: teksPec(s.a), isi: <VisualPec pec={s.a} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [teksPec(s.a), teksPec(s.a)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P5(d: PropsLangkah) { return Kartu(d, 15, "k4b2c-pm", "Memori diagram.", RONDE_MEMORI_PC.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PC[r].map((s, i) => ({ id: teksPec(s.a), a: <VisualPec pec={s.a} kecil />, labelA: `a ${HURUF[i]}`, b: <VisualPec pec={s.b} kecil />, labelB: teksPec(s.b) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P6(d: PropsLangkah) { return Kartu(d, 16, "k4b2c-pt", "Tabel ×k.", RONDE_TABEL_PC.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Isi hasil." /><PilihBertahap key={r} soal={RONDE_TABEL_PC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <Numeral n={`${teksPec(s.asal)} ×${s.k}`} kelas="text-lg" />, tanya: `Baris ${i + 1}`, opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "×k keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b2c-ps", "Ketuk semua.", RONDE_SEMUA_PC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Senilai acuan." /><KetukSemua key={r} tanya={`Ketuk semua senilai ${teksPec(ro.acuan)}.`} item={ro.item.map((p) => ({ id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, benar: senilai(p, ro.acuan), penjelasan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b2c-plp", "Pilah diagram.", RONDE_SORTIR_PC.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Senilai?" /><Sortir key={r} lebarItem={100} kolomBin={2} item={urutanKe(RONDE_SORTIR_PC[r].length, r).map((i) => { const s = RONDE_SORTIR_PC[r][i]; const id = `${teksPec(s.a)}-${teksPec(s.b)}`; return { id, label: id, isi: <DuaPecahan a={s.a} b={s.b} mode="batang" />, bin: senilai(s.a, s.b) ? "sama" : "beda", petunjuk: "Nilai.", ucapan: id }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b2c-pr", "Dua cara.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Cara" teks="Pilih jawaban." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="×k / ÷k" kelas="text-lg" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Ingat dua cara.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b2c-qe", "Apakah senilai?", RONDE_SENILAI_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cek" teks="Sama atau beda?" /><PilihBertahap key={r} soal={RONDE_SENILAI_CC[r].map((s, i) => { const jawab = s.sama ? "sama" : "beda"; const opsi = urutanKe(3, r * 2 + i).map((x) => ["sama", "beda", "tidak tahu"][x]); return { visual: <Numeral n={`${teksPec(s.a)} ? ${teksPec(s.b)}`} />, tanya: "Senilai?", opsi, jawab: opsi.indexOf(jawab), petunjuk: "Samakan nilai.", pesan: jawab }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b2c-qk", "Hitung ×k.", RONDE_KALI_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Kali" teks="Kalikan." /><PilihBertahap key={r} soal={RONDE_KALI_CC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <Numeral n={`${teksPec(s.asal)} ×${s.k}/×${s.k}`} />, tanya: "Hasil?", opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "× keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b2c-qb", "Hitung :k.", RONDE_BAGI_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Bagi" teks="Bagi." /><PilihBertahap key={r} soal={RONDE_BAGI_CC[r].map((s, i) => { const o = opsiPec(s.hasil, r * 2 + i); return { visual: <Numeral n={`${teksPec(s.asal)} ÷${s.k}/÷${s.k}`} />, tanya: "Hasil?", opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.hasil)), petunjuk: "÷ keduanya.", pesan: teksPec(s.hasil) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) { return Kartu(d, 23, "k4b2c-qp", "Pilih senilai.", RONDE_PASANG_CC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Pilih pasangan." /><PilihBertahap key={r} soal={RONDE_PASANG_CC[r].map((s, i) => { const o = opsiPec(s.b, r * 2 + i); return { visual: <Numeral n={teksPec(s.a)} kelas="text-3xl" />, tanya: "Yang senilai?", opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(s.b)), petunjuk: "Nilai sama.", pesan: teksPec(s.b) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b2c-qj", "Jodohkan bentuk.", RONDE_PASANG_CC.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = ro.map((s) => ({ id: teksPec(s.a), label: teksPec(s.b), isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Pasangkan." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: teksPec(s.a), label: teksPec(s.a), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [teksPec(s.a), teksPec(s.a)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b2c-qm", "Memori bentuk.", RONDE_MEMORI_CC.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CC[r].map((s, i) => ({ id: teksPec(s.a), a: <Numeral n={teksPec(s.a)} />, labelA: `a ${HURUF[i]}`, b: <Numeral n={teksPec(s.b)} />, labelB: teksPec(s.b) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b2c-qbs", "Benar atau salah.", RONDE_BENARSALAH_QC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b2c-qd", "Detektif.", RONDE_DETEKTIF_QC.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b2c-qpeta", "Peta konsep.", PETA_KONSEP_QC.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QC[r].pusat} kotak={PETA_KONSEP_QC[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b2c-qc", "Cerita angka.", RONDE_CERITA_QC.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QC[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "×k atau ÷k.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🍫", nama: "CONCRETE", cara: "Cari yang senilai!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram senilai", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "×k dan ÷k", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_C42} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />} />;
}

