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
  HURUF, RONDE_BACA_CB, RONDE_BANDING_CB, RONDE_SORTIR_CB, RONDE_PASANG_CB, RONDE_MEMORI_CB, RONDE_KETUK_CB, RONDE_SEMUA_CB, RONDE_CERITA_CB, RONDE_URUT_CB,
  RONDE_BACA_PB, RONDE_BANDING_PB, RONDE_PASANG_PB, RONDE_MEMORI_PB, RONDE_TABEL_PB, RONDE_SEMUA_PB, RONDE_SORTIR_PB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, PETA_KONSEP_QB, RONDE_CERITA_QB,
  teksPec, relasiPec, nilaiPec, cocokPenyebut, opsiPec, urutTampil, urutanTetap, kataRelasi, type Pec,
} from "./data-k4b2";
import { buatKartu, VisualPec, Numeral, idPec } from "./bantu-k4b2";
import { DuaPecahan } from "./diagram-k4b2";
import { visualInfografisK4B2B } from "./infografis-k4b2";
import { SUB_B42 } from "./naskah-k4b2";

const J = SUB_B42.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B2BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B42} judul="Penyebut Sama" suaraInfo={SUARA_INFO} visual={visualInfografisK4B2B()} speakGuru={speakGuru} />;
}

const soalPec = (benar: Pec, visual: React.ReactNode, nomor: number, tanya = "Pecahan berapakah ini?"): SoalBertahap => {
  const o = opsiPec(benar, nomor);
  return { visual, tanya, opsi: o.map(teksPec), jawab: o.findIndex((x) => teksPec(x) === teksPec(benar)), petunjuk: "Hitung bagian diarsir.", pesan: `Jawaban ${teksPec(benar)}.` };
};
const BIN = [
  { id: "besar", label: "Pembilang ≥ 3", warna: "#BBF7D0" },
  { id: "kecil", label: "Pembilang < 3 / beda q", warna: "#FECACA" },
];

function K0(d: PropsLangkah) { return Kartu(d, 0, "k4b2b-baca", "Baca pecahan.", RONDE_BACA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Baca" teks="Baca daerah arsir." /><PilihBertahap key={r} soal={RONDE_BACA_CB[r].map((p, i) => soalPec(p, <VisualPec pec={p} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K1(d: PropsLangkah) { return Kartu(d, 1, "k4b2b-banding", "Mana lebih besar?", RONDE_BANDING_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Banding" teks="Penyebut sama, lihat pembilang." /><PilihBertahap key={r} soal={RONDE_BANDING_CB[r].map((s, i) => { const besar = nilaiPec(s.a) >= nilaiPec(s.b) ? s.a : s.b; const opsi = urutanKe(3, r * 2 + i).map((x) => [s.a, s.b, { p: s.a.p, q: s.a.q + 1 }][x]); return { visual: <DuaPecahan a={s.a} b={s.b} />, tanya: "Mana lebih besar?", opsi: opsi.map(teksPec), jawab: opsi.findIndex((x) => teksPec(x) === teksPec(besar)), petunjuk: "Lihat pembilang.", pesan: `${teksPec(s.a)} ${relasiPec(s.a, s.b)} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b2b-sortir", "Pilah menurut pembilang.", RONDE_SORTIR_CB.length, "Pilah semua dulu, ya.", (r, beres) => {
    const q = RONDE_SORTIR_CB[r][0].q;
    return (<><IgilBicara pendek="Pilah" teks={`Fokus penyebut ${q}.`} /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_CB[r].length, r).map((i) => { const p = RONDE_SORTIR_CB[r][i]; return { id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, bin: p.q === q && p.p >= 3 ? "besar" : "kecil", petunjuk: "Cek penyebut dan pembilang.", ucapan: teksPec(p) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b2b-jodoh", "Jodohkan.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.teks, label: s.teks, isi: null as React.ReactNode }));
    return (<><IgilBicara pendek="Jodoh" teks="Ketuk gambar, lalu teks." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.teks, label: s.teks, isi: <VisualPec pec={s.gambar} kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.teks, s.teks]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K4(d: PropsLangkah) { return Kartu(d, 4, "k4b2b-memori", "Memori.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><IgilBicara pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.teks, a: <VisualPec pec={s.gambar} kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.teks} />, labelB: s.teks }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b2b-ketuk", "Ketuk yang diminta.", RONDE_KETUK_CB.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (<><IgilBicara pendek="Ketuk" teks="Ketuk pecahan." /><KetukPilih key={r} kolom={3} item={ro.item.map((p, i) => ({ id: idPec(p), label: `P${HURUF[i]}`, isi: <VisualPec pec={p} kecil /> }))} soal={ro.tanya.map((p) => ({ tanya: `Ketuk ${teksPec(p)}.`, jawab: idPec(p), petunjuk: "Lihat arsir.", pesan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b2b-semua", "Ketuk semua syarat.", RONDE_SEMUA_CB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    return (<><IgilBicara pendek="Ketuk semua" teks={`Ketuk semua penyebut ${ro.q} dengan pembilang ≥ ${ro.minP}.`} /><KetukSemua key={r} tanya={`Ketuk semua p/${ro.q} dengan p ≥ ${ro.minP}.`} item={ro.item.map((p) => ({ id: idPec(p), label: teksPec(p), benar: cocokPenyebut(p, ro), penjelasan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function K7(d: PropsLangkah) { return Kartu(d, 7, "k4b2b-cerita", "Cerita tongkat.", RONDE_CERITA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Cerita" teks="Baca cerita." /><PilihBertahap key={r} soal={RONDE_CERITA_CB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Lihat pembilang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K8(d: PropsLangkah) { return Kartu(d, 8, "k4b2b-tanda", "Isi tanda.", RONDE_BANDING_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><IgilBicara pendek="Tanda" teks="Pilih > atau <." /><PilihBertahap key={r} soal={RONDE_BANDING_CB[r].map((s, i) => { const t = relasiPec(s.a, s.b); const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]); return { visual: <DuaPecahan a={s.a} b={s.b} mode="batang" />, tanya: `${teksPec(s.a)} … ${teksPec(s.b)}`, opsi, jawab: opsi.indexOf(t), petunjuk: "Pembilang.", pesan: `${teksPec(s.a)} ${t} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b2b-urut", "Urutkan.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? nilaiPec(x) - nilaiPec(y) : nilaiPec(y) - nilaiPec(x))).map(teksPec);
    return (<><IgilBicara pendek="Urutkan" teks="Urutkan pecahan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(teksPec), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b2b-pb", "Batang.", RONDE_BACA_PB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Batang" teks="Baca arsir." /><PilihBertahap key={r} soal={RONDE_BACA_PB[r].map((p, i) => soalPec(p, <VisualPec pec={p} mode="batang" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b2b-pl", "Lingkaran.", RONDE_BACA_PB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Lingkaran" teks="Baca arsir." /><PilihBertahap key={r} soal={RONDE_BACA_PB[r].map((p, i) => soalPec(p, <VisualPec pec={p} />, r * 2 + i + 1))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) {
  return Kartu(d, 12, "k4b2b-pj", "Jodoh diagram.", RONDE_PASANG_PB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const kanan = ro.map((s) => ({ id: s.teks, label: s.teks, isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk, lalu teks." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.teks, label: s.teks, isi: <VisualPec pec={s.gambar} mode="batang" kecil /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.teks, s.teks]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b2b-pm", "Memori diagram.", RONDE_MEMORI_PB.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PB[r].map((s, i) => ({ id: s.teks, a: <VisualPec pec={s.gambar} kecil />, labelA: `g ${HURUF[i]}`, b: <Numeral n={s.teks} />, labelB: s.teks }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b2b-pt", "Tabel.", RONDE_TABEL_PB.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Pilih teks." /><PilihBertahap key={r} soal={RONDE_TABEL_PB[r].map((s, i) => soalPec(s.gambar, <VisualPec pec={s.gambar} mode="batang" />, r * 2 + i, `Baris ${i + 1}`))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) {
  return Kartu(d, 15, "k4b2b-ps", "Ketuk semua.", RONDE_SEMUA_PB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks="Pilih semua yang cocok." /><KetukSemua key={r} tanya={`Ketuk semua p/${ro.q} dengan p ≥ ${ro.minP}.`} item={ro.item.map((p) => ({ id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, benar: cocokPenyebut(p, ro), penjelasan: teksPec(p) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b2b-plp", "Pilah diagram.", RONDE_SORTIR_PB.length, "Pilah semua dulu, ya.", (r, beres) => {
    const q = RONDE_SORTIR_PB[r][0].q;
    return (<><CatatanTempel pendek="Pilah" teks="Pilah." /><Sortir key={r} lebarItem={80} kolomBin={2} item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => { const p = RONDE_SORTIR_PB[r][i]; return { id: idPec(p), label: teksPec(p), isi: <VisualPec pec={p} kecil />, bin: p.q === q && p.p >= 3 ? "besar" : "kecil", petunjuk: "Cek p dan q.", ucapan: teksPec(p) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) { return Kartu(d, 17, "k4b2b-pr", "Aturan.", RONDE_BANDING_PB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Aturan" teks="Pilih yang lebih besar." /><PilihBertahap key={r} soal={RONDE_BANDING_PB[r].map((s, i) => { const besar = nilaiPec(s.a) >= nilaiPec(s.b) ? s.a : s.b; const opsi = urutanKe(3, r * 2 + i).map((x) => [s.a, s.b, { p: 9, q: 9 }][x]); return { visual: <DuaPecahan a={s.a} b={s.b} mode="batang" />, tanya: "Mana lebih besar? (penyebut sama)", opsi: opsi.map(teksPec), jawab: opsi.findIndex((x) => teksPec(x) === teksPec(besar)), petunjuk: "Pembilang.", pesan: teksPec(besar) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P8(d: PropsLangkah) { return Kartu(d, 18, "k4b2b-pcmp", "Banding gambar.", RONDE_BANDING_PB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Banding" teks="Pilih tanda." /><PilihBertahap key={r} soal={RONDE_BANDING_PB[r].map((s, i) => { const t = relasiPec(s.a, s.b); const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]); return { visual: <DuaPecahan a={s.a} b={s.b} />, tanya: "Isi tanda.", opsi, jawab: opsi.indexOf(t), petunjuk: "Pembilang.", pesan: `${teksPec(s.a)} ${t} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b2b-pst", "Cerita diagram.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Pembilang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b2b-qw", "Tulis p/q.", RONDE_BACA_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tulis" teks="Pilih notasi." /><PilihBertahap key={r} soal={RONDE_BACA_CB[r].map((p, i) => soalPec(p, <Numeral n={`${p.p} dari ${p.q}`} kelas="text-lg" />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b2b-qs", "Tanda angka.", RONDE_BANDING_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Tanda" teks="Pilih tanda." /><PilihBertahap key={r} soal={RONDE_BANDING_CB[r].map((s, i) => { const t = relasiPec(s.a, s.b); const opsi = urutanKe(3, r * 2 + i).map((x) => [">", "<", "="][x]); return { visual: <Numeral n={`${teksPec(s.a)} … ${teksPec(s.b)}`} />, tanya: "Isi tanda.", opsi, jawab: opsi.indexOf(t), petunjuk: "Pembilang.", pesan: `${teksPec(s.a)} ${t} ${teksPec(s.b)}.` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b2b-qp", "Pilih hasil.", RONDE_BANDING_CB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Mana lebih besar?" /><PilihBertahap key={r} soal={RONDE_BANDING_CB[r].map((s, i) => { const besar = nilaiPec(s.a) >= nilaiPec(s.b) ? s.a : s.b; const opsi = urutanKe(3, r * 2 + i).map((x) => [s.a, s.b, { p: 1, q: 2 }][x]); return { visual: <Numeral n={`${teksPec(s.a)} vs ${teksPec(s.b)}`} />, tanya: "Lebih besar?", opsi: opsi.map(teksPec), jawab: opsi.findIndex((x) => teksPec(x) === teksPec(besar)), petunjuk: "Pembilang.", pesan: teksPec(besar) }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b2b-qu", "Urutkan notasi.", RONDE_URUT_CB.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? nilaiPec(x) - nilaiPec(y) : nilaiPec(y) - nilaiPec(x))).map(teksPec);
    return (<><CatatanPensil pendek="Urut" teks="Urutkan." /><UrutKetuk key={r} item={urutTampil(ro.angka.map(teksPec), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label}.`} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b2b-qj", "Jodohkan teks.", RONDE_PASANG_CB.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.map((s) => ({ id: s.teks, label: `${s.gambar.p} dari ${s.gambar.q}`, isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk notasi." /><PasangKartu key={r} kiri={ro.map((s) => ({ id: s.teks, label: s.teks, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((s) => [s.teks, s.teks]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b2b-qm", "Memori notasi.", RONDE_MEMORI_CB.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CB[r].map((s, i) => ({ id: s.teks, a: <Numeral n={s.teks} />, labelA: `n ${HURUF[i]}`, b: <span className="text-xs font-black">{s.gambar.p} dari {s.gambar.q}</span>, labelB: `${s.gambar.p} dari ${s.gambar.q}` }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b2b-qbs", "Benar atau salah.", RONDE_BENARSALAH_QB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b2b-qd", "Detektif.", RONDE_DETEKTIF_QB.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b2b-qpeta", "Peta konsep.", PETA_KONSEP_QB.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QB[r].pusat} kotak={PETA_KONSEP_QB[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b2b-qc", "Cerita angka.", RONDE_CERITA_QB.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca." /><PilihBertahap key={r} soal={RONDE_CERITA_QB[r].map((s) => ({ visual: <Numeral n="?" />, tanya: s.teks, opsi: s.opsi, jawab: s.opsi.indexOf(s.jawab), petunjuk: "Pembilang.", pesan: s.pesan }))} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧱", nama: "CONCRETE", cara: "Banding pembilang!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Notasi dan tanda", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_B42} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />} />;
}

