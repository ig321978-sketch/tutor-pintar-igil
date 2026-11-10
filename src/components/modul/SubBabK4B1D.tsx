"use client";
import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, type SoalBertahap } from "./mesin-k2b6";
import { PapanEmpat, RakitEmpat, SusunEmpatKartu, TabelNilai4 } from "./mesin-k4b1";
import { KoleksiEmpat } from "./dasar-k4b1";
import { ModelDari } from "./diagram-k4b1";
import {
  HURUF, Kapital, RONDE_BENARSALAH_QD, RONDE_DETEKTIF_QD, RONDE_DEKOMPOSISI_CD, RONDE_KALIMAT_PD, RONDE_KETUK_CD, RONDE_KETUK_PD,
  RONDE_KOMPOSISI_CD, RONDE_KOMPOSISI_PD, RONDE_MEMORI_CD, RONDE_MEMORI_PD, RONDE_MEMORI_QD, RONDE_PAPAN_CD, RONDE_PAPAN_PD, RONDE_PAPAN_QD,
  RONDE_PASANG_CD, RONDE_PASANG_PD, RONDE_PASANG_QD, RONDE_SEMUA_CD, RONDE_SEMUA_PD, RONDE_SEMUA_QD, RONDE_SORTIR_PD, RONDE_SUSUN_CD, RONDE_SUSUN_QD,
  RONDE_SUSUNKATA_QD, RONDE_TABEL_CD, RONDE_TABEL_PD, RONDE_TABEL_QD, RONDE_UANG_CD, RONDE_URAI_CD, RONDE_URAI_QD, PETA_KONSEP_QD,
  adaNol, cocokSyarat, empat, kata, lambang, opsiAngka4, susunOpsi, uraian, susunan, urutTampil, urutanTetap, TEKS_SYARAT,
} from "./data-k4b1";
import { buatKartu, Koleksi, Model, Numeral, syaratBenda } from "./bantu-k4b1";
import { visualInfografisK4B1D } from "./infografis-k4b1";
import { SUB_D41 } from "./naskah-k4b1";

const J = SUB_D41.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const SUARA_INFO = "Ini poster rangkuman komposisi dan dekomposisi. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";

export function InfografisK4B1DKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_D41} judul="Komposisi dan Dekomposisi" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1D()} speakGuru={speakGuru} />;
}

function soalUrai(n: number, visual: React.ReactNode, nomor: number): SoalBertahap {
  const benar = uraian(n);
  const salah = [uraian(n + 10), uraian(n - 100)].filter((x) => x !== benar);
  const o = susunOpsi(benar, [salah[0], salah[1]], nomor);
  return { visual, tanya: "Pilih uraian yang benar.", opsi: o.opsi, jawab: o.jawab, petunjuk: "Hitung nilai tiap tempat.", pesan: `${lambang(n)} = ${benar}.` };
}
function soalSusun(n: number, visual: React.ReactNode, nomor: number): SoalBertahap {
  const o = opsiAngka4(n, nomor);
  return { visual, tanya: "Bilangan berapakah ini?", opsi: o.map(lambang), jawab: o.indexOf(n), petunjuk: "Jumlahkan nilai tempat.", pesan: `${susunan(n)} = ${lambang(n)}.`, angka: true };
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b1d-rakit", "Rakit bilangan dari nilai tempat.", RONDE_KOMPOSISI_CD.length, "Rakit semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Susun bilangan" teks="Rakit peti, dus, bungkus, dan benda sesuai bilangan." />
      <RakitEmpat key={r} soal={RONDE_KOMPOSISI_CD[r].map(({ n, benda }) => ({ n, tanya: `Rakit ${susunan(n)}.`, nama: ["peti", "dus", "bungkus", "benda"] as [string, string, string, string], tampil: (rb, rr, p, s) => <KoleksiEmpat rb={rb} r={rr} p={p} s={s} benda={benda ?? "jeruk"} ukuran={36} />, pesan: `${susunan(n)} = ${lambang(n)}.` }))} onBeres={beres} pesanBeres="Semua bilangan sudah disusun." />
    </>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b1d-urai", "Pilih uraian kumpulan.", RONDE_DEKOMPOSISI_CD.length, "Jawab semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Uraikan" teks="Hitung nilai tiap tempat, lalu pilih uraian." />
      <PilihBertahap key={r} soal={RONDE_DEKOMPOSISI_CD[r].map((n, i) => soalUrai(n, <Koleksi n={n} benda="kue" ukuran={28} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua uraian benar." />
    </>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b1d-papan", "Isi papan dari uraian.", RONDE_PAPAN_CD.length, "Isi semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan" teks="Baca uraian, isi digit di papan." />
      <PapanEmpat key={r} soal={RONDE_PAPAN_CD[r].map((n) => ({ visual: <span className="text-center text-sm font-black">{susunan(n)}</span>, tanya: "Isi papan.", jawab: n, petunjuk: "Isi ribuan sampai satuan.", pesan: `${lambang(n)}.` }))} onBeres={beres} pesanBeres="Papan selesai." />
    </>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b1d-jodoh", "Jodohkan uraian dan bilangan.", RONDE_PASANG_CD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CD[r];
    const kanan = ro.map((n) => ({ id: String(n), label: lambang(n), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan" teks="Ketuk uraian, lalu bilangannya." />
        <PasangKartu key={r} kiri={ro.map((n, i) => ({ id: String(n), label: `U${HURUF[i]}`, isi: <span className="text-[10px] font-black leading-tight">{uraian(n)}</span> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Semua cocok." />
      </>
    );
  });
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b1d-memori", "Memori nilai tempat.", RONDE_MEMORI_CD.length, "Selesaikan memori dulu, ya.", (r, beres) => {
    const vals = RONDE_MEMORI_CD[r];
    const n = vals[0] + vals[1] + vals[2] + vals[3];
    return (
      <>
        <IgilBicara pendek="Memori" teks="Cocokkan nilai tempat dengan jumlahnya." />
        <MemoriKartu key={r} pasangan={[
          { id: "rb", a: <Numeral n={vals[0]} />, labelA: "ribuan", b: <span className="text-xs font-black">ribuan</span>, labelB: "ribuan" },
          { id: "r", a: <Numeral n={vals[1]} />, labelA: "ratusan", b: <span className="text-xs font-black">ratusan</span>, labelB: "ratusan" },
          { id: "p", a: <Numeral n={vals[2]} />, labelA: "puluhan", b: <span className="text-xs font-black">puluhan</span>, labelB: "puluhan" },
          { id: "s", a: <Numeral n={vals[3]} />, labelA: "satuan", b: <span className="text-xs font-black">satuan</span>, labelB: "satuan" },
        ]} onBeres={beres} pesanBeres={`Nilai-nilai itu menyusun ${lambang(n)}.`} />
      </>
    );
  });
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b1d-ketuk", "Ketuk bilangan dari uraian.", RONDE_KETUK_CD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CD[r];
    return (
      <>
        <IgilBicara pendek="Ketuk" teks="Dengar uraian, ketuk bilangannya." />
        <KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `B${HURUF[i]}`, isi: <Koleksi n={n} benda="jeruk" ukuran={16} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${susunan(n)}.`, jawab: String(n), petunjuk: "Jumlahkan nilai tempat.", pesan: `${lambang(n)}.` }))} onBeres={beres} pesanBeres="Semua tepat." />
      </>
    );
  });
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b1d-semua", "Ketuk semua yang cocok.", RONDE_SEMUA_CD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CD[r];
    const benda = ro.benda ?? "kue";
    const tanya = `Ketuk semua yang ${syaratBenda(ro.syarat, benda)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua" teks={tanya} />
        <KetukSemua key={r} tanya={tanya} item={ro.angka.map((n, i) => ({ id: String(n), label: `K${HURUF[i]}`, isi: <Koleksi n={n} benda={benda} ukuran={14} />, benar: cocokSyarat(ro.syarat, n), penjelasan: `${lambang(n)}.` }))} onBeres={beres} pesanBeres="Semua cocok ditemukan." />
      </>
    );
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b1d-uang", "Uraikan uang Helen.", RONDE_UANG_CD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const s = RONDE_UANG_CD[r];
    const teks = s.pecahan.map((p) => `${p.banyak} × ${p.nilai}`).join(" + ");
    const o = opsiAngka4(s.total, r);
    return (
      <>
        <IgilBicara pendek="Uang" teks="Jumlahkan pecahan uang Helen." />
        <PilihBertahap key={r} soal={[{ visual: <span className="text-center text-sm font-black">{teks}</span>, tanya: `Berapa total uang?`, opsi: o.map(lambang), jawab: o.indexOf(s.total), petunjuk: "Kalikan lalu jumlahkan.", pesan: `Total ${lambang(s.total)}.`, angka: true }]} onBeres={beres} pesanBeres="Uang selesai." />
      </>
    );
  });
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b1d-tabel", "Isi tabel digit.", RONDE_TABEL_CD.length, "Isi semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Tabel" teks="Isi digit dari bilangan." />
      <TabelNilai4 key={r} mode="angka" baris={RONDE_TABEL_CD[r].map((n, i) => { const d = empat(n); return { label: <Koleksi n={n} benda="kue" ukuran={14} />, jawab: [d.rb, d.r, d.p, d.s] as [number, number, number, number], nama: `baris ${i + 1}` }; })} onBeres={beres} pesanBeres="Tabel selesai." />
    </>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b1d-pilah", "Pilah ada nol / tanpa nol.", RONDE_SORTIR_PD.length, "Pilah semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pilah nol" teks="Pilah bilangan yang memuat nol dan yang tidak." />
      <Sortir key={r} lebarItem={84} kolomBin={2} item={urutanKe(RONDE_SORTIR_PD[r].length, r).map((i) => { const n = RONDE_SORTIR_PD[r][i]; return { id: String(n), label: lambang(n), bin: adaNol(n) ? "nol" : "penuh", petunjuk: adaNol(n) ? "Ada angka 0." : "Tidak ada 0.", ucapan: `${lambang(n)} ${adaNol(n) ? "ada nol" : "penuh"}.` }; })} bin={[{ id: "nol", label: "Ada nol", warna: "#FDE68A" }, { id: "penuh", label: "Tanpa nol", warna: "#BBF7D0" }]} onBeres={beres} pesanBeres="Pilah selesai." />
    </>
  ));
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b1d-blok", "Susun dari blok.", RONDE_KOMPOSISI_PD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Blok" teks="Hitung blok menjadi bilangan." /><PilihBertahap key={r} soal={RONDE_KOMPOSISI_PD[r].map((n, i) => soalSusun(n, <ModelDari n={n} skala={0.55} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b1d-uraib", "Uraikan model.", RONDE_KOMPOSISI_PD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Urai blok" teks="Pilih uraian model." /><PilihBertahap key={r} soal={RONDE_KOMPOSISI_PD[r].map((n, i) => soalUrai(n, <ModelDari n={n} skala={0.55} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) { return Kartu(d, 12, "k4b1d-papanb", "Papan dari blok.", RONDE_PAPAN_PD.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Papan blok" teks="Isi papan dari model." /><PapanEmpat key={r} soal={RONDE_PAPAN_PD[r].map((n) => ({ visual: <ModelDari n={n} skala={0.5} />, tanya: "Isi papan.", jawab: n, petunjuk: "Hitung tiap tempat.", pesan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P3(d: PropsLangkah) { return Kartu(d, 13, "k4b1d-tabelb", "Tabel dari blok.", RONDE_TABEL_PD.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel blok" teks="Isi digit dari model." /><TabelNilai4 key={r} mode="angka" baris={RONDE_TABEL_PD[r].map((n, i) => { const d = empat(n); return { label: <ModelDari n={n} skala={0.4} />, jawab: [d.rb, d.r, d.p, d.s] as [number, number, number, number], nama: `baris ${i + 1}` }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P4(d: PropsLangkah) {
  return Kartu(d, 14, "k4b1d-jodohb", "Jodohkan blok dan uraian.", RONDE_PASANG_PD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PD[r];
    const kanan = ro.map((n) => ({ id: String(n), label: uraian(n), isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh" teks="Ketuk model, lalu uraian." /><PasangKartu key={r} kiri={ro.map((n, i) => ({ id: String(n), label: `M${HURUF[i]}`, isi: <Model n={n} skala={0.4} /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P5(d: PropsLangkah) { return Kartu(d, 15, "k4b1d-memorib", "Memori blok.", RONDE_MEMORI_PD.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan model dengan bilangan." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PD[r].map((n, i) => ({ id: String(n), a: <Model n={n} skala={0.34} />, labelA: `model ${HURUF[i]}`, b: <Numeral n={lambang(n)} kelas="text-xl" />, labelB: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b1d-ketukb", "Ketuk blok dari uraian.", RONDE_KETUK_PD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_PD[r];
    return (<><CatatanTempel pendek="Ketuk blok" teks="Ketuk model sesuai uraian." /><KetukPilih key={r} kolom={3} item={ro.item.map((n, i) => ({ id: String(n), label: `M${HURUF[i]}`, isi: <Model n={n} skala={0.4} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk ${uraian(n)}.`, jawab: String(n), petunjuk: "Hitung blok.", pesan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b1d-semuab", "Ketuk semua blok cocok.", RONDE_SEMUA_PD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PD[r];
    const tanya = `Ketuk semua yang ${TEKS_SYARAT[ro.syarat as Exclude<typeof ro.syarat, "lebih" | "kurang">]}.`;
    return (<><CatatanTempel pendek="Ketuk semua" teks={tanya} /><KetukSemua key={r} tanya={tanya} item={ro.angka.map((n, i) => ({ id: String(n), label: `M${HURUF[i]}`, isi: <Model n={n} skala={0.35} />, benar: cocokSyarat(ro.syarat, n), penjelasan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P8(d: PropsLangkah) {
  return Kartu(d, 18, "k4b1d-pilahb", "Pilah blok menurut nol.", RONDE_SORTIR_PD.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Ada nol atau tanpa nol." /><Sortir key={r} lebarItem={84} kolomBin={2} item={urutanKe(RONDE_SORTIR_PD[r].length, r).map((i) => { const n = RONDE_SORTIR_PD[r][i]; return { id: String(n), label: lambang(n), isi: <Model n={n} skala={0.3} />, bin: adaNol(n) ? "nol" : "penuh", petunjuk: "Lihat digit 0.", ucapan: lambang(n) }; })} bin={[{ id: "nol", label: "Ada nol", warna: "#FDE68A" }, { id: "penuh", label: "Tanpa nol", warna: "#BBF7D0" }]} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P9(d: PropsLangkah) {
  return Kartu(d, 19, "k4b1d-kalimat", "Lengkapi kalimat uraian.", RONDE_KALIMAT_PD.length, "Jawab semua dulu, ya.", (r, beres) => {
    const n = RONDE_KALIMAT_PD[r];
    const o = opsiAngka4(empat(n).rb, r);
    return (<><CatatanTempel pendek="Kalimat" teks="Isi digit yang hilang." /><PilihBertahap key={r} soal={[{ visual: <ModelDari n={n} skala={0.5} />, tanya: `Berapa digit ribuan pada ${lambang(n)}?`, opsi: o.map(String), jawab: o.indexOf(empat(n).rb), petunjuk: "Lihat tempat ribuan.", pesan: `Ribuan ${empat(n).rb}.`, angka: true }]} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}

function Q0(d: PropsLangkah) {
  return Kartu(d, 20, "k4b1d-susunq", "Susun empat kartu dari uraian.", RONDE_SUSUN_QD.length, "Susun semua dulu, ya.", (r, beres) => (
    <><CatatanPensil pendek="Susun kartu" teks="Susun digit dari uraian." /><SusunEmpatKartu key={r} soal={RONDE_SUSUN_QD[r].map((n) => { const d = empat(n); return { kartu: urutTampil([d.rb, d.r, d.p, d.s], [d.rb, d.r, d.p, d.s], r), jawab: n, tanya: `Susun: ${susunan(n)}.`, pesan: lambang(n) }; })} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b1d-uraiq", "Pilih uraian angka.", RONDE_URAI_QD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Urai" teks="Pilih uraian benar." /><PilihBertahap key={r} soal={RONDE_URAI_QD[r].map((n, i) => soalUrai(n, <Numeral n={lambang(n)} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b1d-papanq", "Tulis di papan dari uraian.", RONDE_PAPAN_QD.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Papan" teks="Isi dari uraian." /><PapanEmpat key={r} soal={RONDE_PAPAN_QD[r].map((n) => ({ visual: <span className="text-sm font-black">{uraian(n)}</span>, tanya: "Isi papan.", jawab: n, petunjuk: "Baca tiap suku.", pesan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) {
  return Kartu(d, 23, "k4b1d-jodohq", "Jodohkan angka dan uraian.", RONDE_PASANG_QD.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QD[r];
    const kanan = ro.map((n) => ({ id: String(n), label: uraian(n), isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk angka, lalu uraian." /><PasangKartu key={r} kiri={ro.map((n) => ({ id: String(n), label: lambang(n), isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q4(d: PropsLangkah) { return Kartu(d, 24, "k4b1d-memoriq", "Memori angka dan uraian.", RONDE_MEMORI_QD.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan angka dengan uraian." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_QD[r].map((n, i) => ({ id: String(n), a: <Numeral n={lambang(n)} kelas="text-xl" />, labelA: `angka ${HURUF[i]}`, b: <span className="text-[10px] font-black leading-tight">{uraian(n)}</span>, labelB: uraian(n) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q5(d: PropsLangkah) {
  return Kartu(d, 25, "k4b1d-tabelq", "Isi tabel uraian.", RONDE_TABEL_QD.length, "Isi semua dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QD[r];
    return (<><CatatanPensil pendek="Tabel" teks="Isi uraian tiap bilangan." /><IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Urai ${b.label}.`} onBeres={beres} pesanBeres="Tabel selesai." /></>);
  });
}
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b1d-bs", "Benar atau salah.", RONDE_BENARSALAH_QD.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai tiap pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QD[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b1d-det", "Detektif komposisi.", RONDE_DETEKTIF_QD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QD[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(lambang), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) {
  return Kartu(d, 28, "k4b1d-semuaq", "Ketuk semua angka cocok.", RONDE_SEMUA_QD.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_QD[r];
    const tanya = `Ketuk semua yang ${TEKS_SYARAT[ro.syarat as Exclude<typeof ro.syarat, "lebih" | "kurang">]}.`;
    return (<><CatatanPensil pendek="Ketuk semua" teks={tanya} /><KetukSemua key={r} tanya={tanya} item={ro.angka.map((n) => ({ id: String(n), label: lambang(n), benar: cocokSyarat(ro.syarat, n), penjelasan: lambang(n) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b1d-kata", "Susun kata komposisi.", RONDE_SUSUNKATA_QD.length, "Susun semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Susun kata" teks="Susun kalimat. Satu kata tidak dipakai." /><SusunKata key={r} kata={RONDE_SUSUNKATA_QD[r].kata} pengecoh={RONDE_SUSUNKATA_QD[r].pengecoh} nomor={r} onBeres={beres} /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 11, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 21, render: (d) => <K {...d} /> }));

export function ConcreteK4B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧩", nama: "CONCRETE", cara: "Susun dan uraikan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Blok dan uraian", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B1D(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Angka dan uraian", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_D41} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB D ➡️" />} />;
}
