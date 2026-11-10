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
  HURUF, RONDE_BACA_CA, RONDE_BANDING_CA, RONDE_SORTIR_CA, RONDE_PASANG_CA, RONDE_MEMORI_CA, RONDE_KETUK_CA, RONDE_SEMUA_CA, RONDE_CERITA_CA, RONDE_URUT_CA,
  RONDE_BACA_PA, RONDE_BANDING_PA, RONDE_PASANG_PA, RONDE_MEMORI_PA, RONDE_TABEL_PA, RONDE_SEMUA_PA, RONDE_SORTIR_PA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, PETA_KONSEP_QA, RONDE_CERITA_QA,
  teksPec, relasiPec, nilaiPec, cocokUnit, opsiPec, urutTampil, urutanTetap, kataRelasi, type Pec,
} from "./data-k4b2";
import { buatKartu, VisualPec, Numeral, idPec } from "./bantu-k4b2";
import { DuaPecahan } from "./diagram-k4b2";
import { visualInfografisK4B2A } from "./infografis-k4b2";
import { SUB_A42 } from "./naskah-k4b2";

const J = SUB_A42.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B2AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A42} judul="Pecahan Pembilang Satu" suaraInfo={SUARA_INFO} visual={visualInfografisK4B2A()} speakGuru={speakGuru} />;
}

const soalPec = (benar: Pec, visual: React.ReactNode, nomor: number, tanya = "Pecahan berapakah ini?"): SoalBertahap => {
  const o = opsiPec(benar, nomor);
  return { visual, tanya, opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(benar)), petunjuk: "Hitung bagian diarsir per seluruh.", pesan: `Jawaban ${teksPec(benar)}.` };
};
const BIN = [
  { id: "besar", label: "Lebih besar dari acuan", warna: "#BBF7D0" },
  { id: "kecil", label: "Lebih kecil / sama", warna: "#FECACA" },
];

function K0(d: PropsLangkah) { return Kartu(d, 0, "k4b2a-pizza", "Pilih pecahan pizza.", RONDE_BACA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Pizza" teks="Baca bagian yang diambil." /><PilihBertahap key={r} soal={RONDE_BACA_CA[r].map((p, i) => soalPec(p, <VisualPec pec={p} />, r * 2 + i, "Berapa bagian yang diarsir?"))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K1(d: PropsLangkah) { return Kartu(d, 1, "k4b2a-arsir", "Baca daerah arsir.", RONDE_BACA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Arsir" teks="Tulis pecahan dari gambar." /><PilihBertahap key={r} soal={RONDE_BACA_CA[r].map((p, i) => soalPec(p, <VisualPec pec={p} mode="batang" />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K2(d: PropsLangkah) { return Kartu(d, 2, "k4b2a-banding", "Mana lebih besar?", RONDE_BANDING_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Banding" teks="Bandingkan dua pecahan unit." /><PilihBertahap key={r} soal={RONDE_BANDING_CA[r].map((s, i) => { const besar = nilaiPec(s.a) >= nilaiPec(s.b) ? s.a : s.b; const o = [s.a, s.b, { p: 1, q: Math.max(s.a.q, s.b.q) + 1 }]; const opsi = urutanKe(3, r * 2 + i).map((x) => o[x]); return { visual: <DuaPecahan a={s.a} b={s.b} />, tanya: "Mana lebih besar?", opsi: opsi.map(teksPec), jawab: opsi.findIndex((x) => teksPec(x) === teksPec(besar)), petunjuk: "Lihat daerah arsir.", pesan: `${teksPec(s.a)} ${relasiPec(s.a, s.b)} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b2a-sortir", "Pilah lebih besar dari 1/4.", RONDE_SORTIR_CA.length, "Pilah semua dulu, ya.", (r, beres) => {
    const acuan = { p: 1, q: 4 };
    return (<><IgilBicara pendek="Pilah" teks="Pilah pecahan unit." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CA[r].length, r).map((i) => { const p = RONDE_SORTIR_CA[r][i]; return { id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, bin: nilaiPec(p) > nilaiPec(acuan) ? "besar" : "kecil", petunjuk: `Bandingkan dengan ${teksPec(acuan)}.`, ucapan: teksPec(p) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b2a-jodoh", "Jodohkan gambar dan teks.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.teks, label: s.teks, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk gambar, lalu teks." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.teks, label: s.teks, isi: <VisualPec pec={s.gambar} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.teks, s.teks]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K5(d: PropsLangkah) { return Kartu(d, 5, "k4b2a-memori", "Memori pecahan unit.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan gambar dengan teks." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.teks, a: <VisualPec pec={s.gambar} kecil />, labelA: `gambar ${HURUF[i]}`, b: <Numeral n={s.teks} kelas="text-2xl" />, labelB: s.teks }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b2a-ketuk", "Ketuk pecahan yang diminta.", RONDE_KETUK_CA.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk pecahan yang diminta." /><KetukPilih key={r} kolom={3} item={ro.item.map((p, i) => ({ id: idPec(p), label: `P${HURUF[i]}`, isi: <VisualPec pec={p} kecil /> }))} soal={ro.tanya.map((p) => ({ tanya: `Ketuk ${teksPec(p)}.`, jawab: idPec(p), petunjuk: "Lihat arsir.", pesan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b2a-semua", "Ketuk semua sesuai syarat.", RONDE_SEMUA_CA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua yang ${ro.syarat === "besar" ? "lebih besar" : "lebih kecil"} dari ${teksPec(ro.acuan)}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.syarat === "besar" ? "lebih besar" : "lebih kecil"} dari ${teksPec(ro.acuan)}.`} item={ro.item.map((p) => ({ id: idPec(p), label: teksPec(p), benar: cocokUnit(p, ro), penjelasan: `${teksPec(p)} ${kataRelasi(relasiPec(p, ro.acuan))} ${teksPec(ro.acuan)}.` }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K8(d: PropsLangkah) { return Kartu(d, 8, "k4b2a-cerita", "Cerita pizza dan Tiara.", RONDE_CERITA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CA[r].map((s, i) => ({ visual: <VisualPec pec={s.jawab} />, tanya: s.teks, opsi: s.opsi.map(teksPec), jawab: s.opsi.findIndex((x) => teksPec(x) === teksPec(s.jawab)), petunjuk: "Bandingkan atau baca arsir.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b2a-urut", "Urutkan pecahan unit.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? nilaiPec(x) - nilaiPec(y) : nilaiPec(y) - nilaiPec(x))).map(teksPec);
    return (<><IgilBicara pendek="Urutkan" teks={`Urutkan dari yang ${ro.dari === "kecil" ? "terkecil" : "terbesar"}.`} /><UrutKetuk key={r} item={urutTampil(ro.angka.map(teksPec), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label} bukan berikutnya.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b2a-pc", "Baca lingkaran.", RONDE_BACA_PA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Lingkaran" teks="Baca arsir." /><PilihBertahap key={r} soal={RONDE_BACA_PA[r].map((p, i) => soalPec(p, <VisualPec pec={p} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b2a-pb", "Banding batang.", RONDE_BANDING_PA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Batang" teks="Pilih tanda." /><PilihBertahap key={r} soal={RONDE_BANDING_PA[r].map((s, i) => { const t = relasiPec(s.a, s.b); const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]); return { visual: <DuaPecahan a={s.a} b={s.b} mode="batang" />, tanya: `${teksPec(s.a)} … ${teksPec(s.b)}`, opsi, jawab: opsi.indexOf(t), petunjuk: "Lihat panjang arsir.", pesan: `${teksPec(s.a)} ${t} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b2a-pj", "Jodohkan diagram.", RONDE_PASANG_PA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((s) => ({ id: s.teks, label: s.teks, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk diagram, lalu teks." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.teks, label: s.teks, isi: <VisualPec pec={s.gambar} mode="batang" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.teks, s.teks]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b2a-pm", "Memori diagram.", RONDE_MEMORI_PA.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PA[r].map((s, i) => ({ id: s.teks, a: <VisualPec pec={s.gambar} kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.teks} />, labelB: s.teks }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b2a-pt", "Tabel gambar.", RONDE_TABEL_PA.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Pilih teks pecahan." /><PilihBertahap key={r} soal={RONDE_TABEL_PA[r].map((s, i) => soalPec(s.gambar, <VisualPec pec={s.gambar} mode="batang" />, r * 2 + i, `Baris ${i + 1}`))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b2a-ps", "Ketuk semua syarat.", RONDE_SEMUA_PA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua yang ${ro.syarat === "besar" ? ">" : "<"} ${teksPec(ro.acuan)}.`} item={ro.item.map((p) => ({ id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, benar: cocokUnit(p, ro), penjelasan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b2a-pl", "Pilah diagram.", RONDE_SORTIR_PA.length, "Pilah semua dulu, ya.", (r, beres) => {
    const acuan = { p: 1, q: 5 };
    return (<><CatatanTempel pendek="Pilah" teks={`Acuan ${teksPec(acuan)}.`} /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => { const p = RONDE_SORTIR_PA[r][i]; return { id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, bin: nilaiPec(p) > nilaiPec(acuan) ? "besar" : "kecil", petunjuk: "Banding nilai.", ucapan: teksPec(p) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) { return Kartu(d, 17, "k4b2a-pd", "Pengaruh penyebut.", RONDE_BANDING_PA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Penyebut" teks="Penyebut besar → nilai kecil." /><PilihBertahap key={r} soal={RONDE_BANDING_PA[r].map((s, i) => { const kecil = nilaiPec(s.a) <= nilaiPec(s.b) ? s.a : s.b; const opsi = urutanKe(3, r * 2 + i).map((x) => [s.a, s.b, { p: 1, q: 20 }][x]); return { visual: <DuaPecahan a={s.a} b={s.b} />, tanya: "Mana lebih kecil?", opsi: opsi.map(teksPec), jawab: opsi.findIndex((x) => teksPec(x) === teksPec(kecil)), petunjuk: "Lihat penyebut.", pesan: `${teksPec(kecil)} lebih kecil.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P8(d: PropsLangkah) { return Kartu(d, 18, "k4b2a-pg", "Pilih gambar cocok.", RONDE_BACA_PA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Pilih" teks="Pilih pecahan benar." /><PilihBertahap key={r} soal={RONDE_BACA_PA[r].map((p, i) => soalPec(p, <VisualPec pec={p} mode="notasi" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b2a-pst", "Cerita diagram.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Cerita" teks="Baca dan pilih." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <VisualPec pec={s.jawab} mode="batang" />, tanya: s.teks, opsi: s.opsi.map(teksPec), jawab: s.opsi.findIndex((x) => teksPec(x) === teksPec(s.jawab)), petunjuk: "Pikirkan arsir.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b2a-qw", "Tulis 1/n.", RONDE_BACA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tulis" teks="Pilih notasi." /><PilihBertahap key={r} soal={RONDE_BACA_CA[r].map((p, i) => soalPec(p, <Numeral n={`1 bagian dari ${p.q}`} kelas="text-lg" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b2a-qs", "Isi > atau <.", RONDE_BANDING_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tanda" teks="Pilih tanda." /><PilihBertahap key={r} soal={RONDE_BANDING_CA[r].map((s, i) => { const t = relasiPec(s.a, s.b); const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]); return { visual: <Numeral n={`${teksPec(s.a)} … ${teksPec(s.b)}`} />, tanya: "Isi tanda.", opsi, jawab: opsi.indexOf(t), petunjuk: "Banding nilai.", pesan: `${teksPec(s.a)} ${t} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b2a-qp", "Pilih pecahan.", RONDE_BACA_CA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Pilih jawaban." /><PilihBertahap key={r} soal={RONDE_BACA_CA[r].map((p, i) => soalPec(p, <VisualPec pec={p} mode="notasi" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b2a-qu", "Urutkan notasi.", RONDE_URUT_CA.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? nilaiPec(x) - nilaiPec(y) : nilaiPec(y) - nilaiPec(x))).map(teksPec);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(teksPec), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b2a-qj", "Jodohkan teks.", RONDE_PASANG_CA.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: s.teks, label: `satu per ${s.gambar.q}`, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk notasi, lalu kata." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.teks, label: s.teks, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.teks, s.teks]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b2a-qm", "Memori notasi.", RONDE_MEMORI_CA.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: s.teks, a: <Numeral n={s.teks} kelas="text-2xl" />, labelA: `n ${HURUF[i]}`, b: <span className="text-xs font-black">1 dari {s.gambar.q}</span>, labelB: `1 dari ${s.gambar.q}` }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b2a-qbs", "Benar atau salah.", RONDE_BENARSALAH_QA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b2a-qd", "Detektif.", RONDE_DETEKTIF_QA.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b2a-qpeta", "Peta konsep.", PETA_KONSEP_QA.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi kotak." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QA[r].pusat} kotak={PETA_KONSEP_QA[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b2a-qc", "Cerita angka.", RONDE_CERITA_QA.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca dan pilih." /><PilihBertahap key={r} soal={RONDE_CERITA_QA[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi.map(teksPec), jawab: s.opsi.findIndex((x) => teksPec(x) === teksPec(s.jawab)), petunjuk: "Ingat aturan unit.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🍕", nama: "CONCRETE", cara: "Potong dan banding!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi dan tanda", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_A42} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />} />;
}

