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
  HURUF, RONDE_SISA_CF, RONDE_SELISIH_CF, RONDE_SORTIR_CF, RONDE_PASANG_CF, RONDE_MEMORI_CF, RONDE_KETUK_CF, RONDE_SEMUA_CF, RONDE_CERITA_CF, RONDE_PAPAN_CF, RONDE_URUT_CF,
  RONDE_SELISIH_PF, RONDE_PASANG_PF, RONDE_MEMORI_PF, RONDE_TABEL_PF, RONDE_SEMUA_PF, RONDE_SORTIR_PF, RONDE_BENARSALAH_QF, RONDE_DETEKTIF_QF, PETA_KONSEP_QF, RONDE_CERITA_QF,
  cocokAmbil, perluAmbil, opsiSelisih, jumlahCerita, urutTampil, urutanTetap, type Jml,
} from "./data-k4b1";
import { buatKartu, KurangKoleksi, KurangModel, Numeral } from "./bantu-k4b1";
import { visualInfografisK4B1F } from "./infografis-k4b1";
import { SUB_F41 } from "./naskah-k4b1";

const J = SUB_F41.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const hasil = (a: number, b: number) => a - b;
const TEKS = { ambil: "perlu mengambil", tanpa: "tanpa mengambil" } as const;
const BIN = [
  { id: "tanpa", label: "Tanpa mengambil", warna: "#BBF7D0" },
  { id: "ambil", label: "Dengan mengambil", warna: "#FECACA" },
];
const idJ = (p: Jml) => `${p[0]}-${p[1]}`;
const ket = (a: number, b: number) => `${a} − ${b} = ${hasil(a, b)}. ${perluAmbil(a, b) ? "Perlu mengambil." : "Tanpa mengambil."}`;
const soalH = (a: number, b: number, visual: React.ReactNode, nomor: number, tanya = "Berapa hasilnya?"): SoalBertahap => {
  const o = opsiSelisih(hasil(a, b), nomor);
  return { visual, tanya, opsi: o.map(String), jawab: o.indexOf(hasil(a, b)), petunjuk: "Belum tepat. Kerjakan dari satuan.", pesan: ket(a, b), angka: true };
};
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);

const SUARA_INFO = "Ini poster rangkuman. Tekan tombol suara di setiap panel. Belum ada yang perlu dijawab.";
export function InfografisK4B1FKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_F41} judul="Pengurangan sampai 1.000" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1F()} speakGuru={speakGuru} />;
}

function K0(d: PropsLangkah) {
  return Kartu(d, 0, "k4b1f-rakit", "Rakit hasilnya, lalu tekan Periksa.", RONDE_SISA_CF.length, "Rakit semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit hasil" teks="Rakit hasil operasinya. Penukaran sepuluh otomatis." />
      <RakitEmpat key={r} soal={RONDE_SISA_CF[r].map(({ a, b, benda }) => ({ n: hasil(a, b), tanya: `Rakit ${a} − ${b}.`, nama: ["peti", "dus", "bungkus", "benda"] as [string, string, string, string], tampil: (rb, rr, p, s) => <KoleksiEmpat rb={rb} r={rr} p={p} s={s} benda={benda} ukuran={36} />, pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Semua hasil sudah dirakit." />
    </>
  ));
}
function K1(d: PropsLangkah) {
  return Kartu(d, 1, "k4b1f-hitung", "Pilih hasil yang benar.", RONDE_SELISIH_CF.length, "Jawab semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung" teks="Hitung dari satuan." />
      <PilihBertahap key={r} soal={RONDE_SELISIH_CF[r].map(([a, b], i) => soalH(a, b, <KurangKoleksi a={a} b={b} benda="jeruk" ukuran={16} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua sudah dihitung." />
    </>
  ));
}
function K2(d: PropsLangkah) {
  return Kartu(d, 2, "k4b1f-pilah", "Pilah pasangan ke kotak yang cocok.", RONDE_SORTIR_CF.length, "Pilah semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pilah" teks="Pilah tiap pasangan." />
      <Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_CF[r].length, r).map((i) => { const p = RONDE_SORTIR_CF[r][i]; return { id: idJ(p), label: `${p[0]} − ${p[1]}`, bin: perluAmbil(p[0], p[1]) ? "ambil" : "tanpa", petunjuk: ket(p[0], p[1]), ucapan: ket(p[0], p[1]) }; })} bin={BIN} onBeres={beres} pesanBeres="Semua sudah dipilah." />
    </>
  ));
}
function K3(d: PropsLangkah) {
  return Kartu(d, 3, "k4b1f-jodoh", "Jodohkan pasangan dengan hasil.", RONDE_PASANG_CF.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CF[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(hasil(p[0], p[1])), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan" teks="Ketuk pasangan, lalu hasilnya." />
        <PasangKartu key={r} kiri={ro.map((p, i) => ({ id: idJ(p), label: `P${HURUF[i]}`, isi: <KurangKoleksi a={p[0]} b={p[1]} benda="kue" ukuran={12} /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))} petunjuk={() => "Belum cocok. Hitung lagi."} onBeres={beres} pesanBeres="Semua cocok." />
      </>
    );
  });
}
function K4(d: PropsLangkah) {
  return Kartu(d, 4, "k4b1f-memori", "Memori soal dan hasil.", RONDE_MEMORI_CF.length, "Selesaikan memori dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori" teks="Cocokkan soal dengan hasil." />
      <MemoriKartu key={r} pasangan={RONDE_MEMORI_CF[r].map((p, i) => ({ id: idJ(p), a: <span className="text-sm font-black">{p[0]} − {p[1]}</span>, labelA: `soal ${HURUF[i]}`, b: <Numeral n={hasil(p[0], p[1])} kelas="text-3xl" />, labelB: String(hasil(p[0], p[1])) }))} onBeres={beres} pesanBeres="Memori selesai." />
    </>
  ));
}
function K5(d: PropsLangkah) {
  return Kartu(d, 5, "k4b1f-ketuk", "Ketuk pasangan berhasil tertentu.", RONDE_KETUK_CF.length, "Jawab semua dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CF[r];
    return (
      <>
        <IgilBicara pendek="Ketuk" teks="Hitung lalu ketuk yang diminta." />
        <KetukPilih key={r} kolom={3} item={ro.item.map((p, i) => ({ id: idJ(p), label: `P${HURUF[i]}`, isi: <KurangKoleksi a={p[0]} b={p[1]} benda="kelereng" ukuran={12} /> }))} soal={ro.tanya.map((n) => ({ tanya: `Ketuk yang hasilnya ${n}.`, jawab: idJ(ro.item.find((p) => hasil(p[0], p[1]) === n)!), petunjuk: "Hitung dari satuan.", pesan: `Hasilnya ${n}.` }))} onBeres={beres} pesanBeres="Semua tepat." />
      </>
    );
  });
}
function K6(d: PropsLangkah) {
  return Kartu(d, 6, "k4b1f-semua", "Ketuk semua yang cocok.", RONDE_SEMUA_CF.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CF[r];
    return (
      <>
        <IgilBicara pendek="Ketuk semua" teks={`Ketuk semua yang ${TEKS[ro.syarat]}.`} />
        <KetukSemua key={r} tanya={`Ketuk semua yang ${TEKS[ro.syarat]}.`} item={ro.pasangan.map((p) => ({ id: idJ(p), label: `${p[0]} − ${p[1]}`, benar: cocokAmbil(p, ro.syarat), penjelasan: ket(p[0], p[1]) }))} onBeres={beres} pesanBeres="Semua cocok ditemukan." />
      </>
    );
  });
}
function K7(d: PropsLangkah) {
  return Kartu(d, 7, "k4b1f-cerita", "Baca cerita, pilih hasil.", RONDE_CERITA_CF.length, "Jawab semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Cerita" teks="Baca cerita, lalu pilih hasil." />
      <PilihBertahap key={r} soal={RONDE_CERITA_CF[r].map((s, i) => { const h = s.a - s.b; const o = opsiSelisih(h, r * 2 + i); return { visual: <KurangKoleksi a={s.a} b={s.b} benda={s.benda} ukuran={14} />, tanya: s.teks, opsi: o.map(String), jawab: o.indexOf(h), petunjuk: "Modelkan dulu.", pesan: `Hasil ${h}.`, angka: true }; })} onBeres={beres} pesanBeres="Cerita selesai." />
    </>
  ));
}
function K8(d: PropsLangkah) {
  return Kartu(d, 8, "k4b1f-papan", "Tulis hasil di papan.", RONDE_PAPAN_CF.length, "Isi semua dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan" teks="Hitung lalu isi papan." />
      <PapanEmpat key={r} soal={RONDE_PAPAN_CF[r].map(([a, b]) => ({ visual: <KurangKoleksi a={a} b={b} benda="jeruk" ukuran={14} />, tanya: "Isi hasil.", jawab: hasil(a, b), petunjuk: "Dari satuan.", pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Papan selesai." />
    </>
  ));
}
function K9(d: PropsLangkah) {
  return Kartu(d, 9, "k4b1f-urut", "Urutkan hasil.", RONDE_URUT_CF.length, "Urutkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CF[r];
    const kunci = [...ro.angka].sort((x, y) => (ro.dari === "kecil" ? x - y : y - x)).map(String);
    return (
      <>
        <IgilBicara pendek="Urutkan" teks={`Urutkan dari yang ${ro.dari === "kecil" ? "terkecil" : "terbesar"}.`} />
        <UrutKetuk key={r} item={urutTampil(ro.angka.map(String), kunci, r).map((id) => ({ id, label: id }))} urutan={kunci} labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"} labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"} petunjuk={(i) => `Belum, ${i.label} bukan berikutnya.`} onBeres={beres} pesanBeres="Urutan benar." />
      </>
    );
  });
}

function P0(d: PropsLangkah) { return Kartu(d, 10, "k4b1f-sp", "Pilih hasil susun.", RONDE_SELISIH_PF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Susun" teks="Hitung cara susun dari satuan." /><PilihBertahap key={r} soal={RONDE_SELISIH_PF[r].map(([a, b], i) => soalH(a, b, <span className="text-2xl font-black">{a} − {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P1(d: PropsLangkah) { return Kartu(d, 11, "k4b1f-pp", "Papan dari model.", RONDE_SELISIH_PF.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Papan model" teks="Hitung dua model." /><PapanEmpat key={r} soal={RONDE_SELISIH_PF[r].map(([a, b]) => ({ visual: <KurangModel a={a} b={b} />, tanya: "Isi hasil.", jawab: hasil(a, b), petunjuk: "Dari satuan.", pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P2(d: PropsLangkah) { return Kartu(d, 12, "k4b1f-hp", "Hitung dua model.", RONDE_SELISIH_PF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Hitung model" teks="Hitung hasil dua model." /><PilihBertahap key={r} soal={RONDE_SELISIH_PF[r].map(([a, b], i) => soalH(a, b, <KurangModel a={a} b={b} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P3(d: PropsLangkah) {
  return Kartu(d, 13, "k4b1f-jp", "Jodohkan model dan hasil.", RONDE_PASANG_PF.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PF[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(hasil(p[0], p[1])), isi: null as React.ReactNode }));
    return (<><CatatanTempel pendek="Jodoh model" teks="Ketuk model, lalu hasil." /><PasangKartu key={r} kiri={ro.map((p, i) => ({ id: idJ(p), label: `M${HURUF[i]}`, isi: <KurangModel a={p[0]} b={p[1]} skala={0.4} /> }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P4(d: PropsLangkah) { return Kartu(d, 14, "k4b1f-mp", "Memori model.", RONDE_MEMORI_PF.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Memori" teks="Cocokkan model dengan hasil." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_PF[r].map((p, i) => ({ id: idJ(p), a: <KurangModel a={p[0]} b={p[1]} skala={0.35} />, labelA: `model ${HURUF[i]}`, b: <Numeral n={hasil(p[0], p[1])} kelas="text-3xl" />, labelB: String(hasil(p[0], p[1])) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P5(d: PropsLangkah) { return Kartu(d, 15, "k4b1f-tp", "Isi tabel hasil.", RONDE_TABEL_PF.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Tabel" teks="Hitung tiap baris." /><PilihBertahap key={r} soal={RONDE_TABEL_PF[r].map(({ a, b }, i) => soalH(a, b, <span className="text-lg font-black">{a} − {b}</span>, r * 2 + i, `Baris ${i + 1}`))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P6(d: PropsLangkah) {
  return Kartu(d, 16, "k4b1f-smp", "Ketuk semua model cocok.", RONDE_SEMUA_PF.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PF[r];
    return (<><CatatanTempel pendek="Ketuk semua" teks={`Ketuk semua yang ${TEKS[ro.syarat]}.`} /><KetukSemua key={r} tanya={`Ketuk semua yang ${TEKS[ro.syarat]}.`} item={ro.pasangan.map((p) => ({ id: idJ(p), label: idJ(p), isi: <KurangModel a={p[0]} b={p[1]} skala={0.35} />, benar: cocokAmbil(p, ro.syarat), penjelasan: ket(p[0], p[1]) }))} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function P7(d: PropsLangkah) {
  return Kartu(d, 17, "k4b1f-plp", "Pilah model.", RONDE_SORTIR_PF.length, "Pilah semua dulu, ya.", (r, beres) => (
    <><CatatanTempel pendek="Pilah" teks="Pilah menurut syarat." /><Sortir key={r} lebarItem={90} kolomBin={2} item={urutanKe(RONDE_SORTIR_PF[r].length, r).map((i) => { const p = RONDE_SORTIR_PF[r][i]; return { id: idJ(p), label: `${p[0]}−${p[1]}`, isi: <KurangModel a={p[0]} b={p[1]} skala={0.3} />, bin: perluAmbil(p[0], p[1]) ? "ambil" : "tanpa", petunjuk: ket(p[0], p[1]), ucapan: ket(p[0], p[1]) }; })} bin={BIN} onBeres={beres} pesanBeres="Selesai." /></>
  ));
}
function P8(d: PropsLangkah) { return Kartu(d, 18, "k4b1f-pj", "Cara panjang.", RONDE_SELISIH_PF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Panjang" teks="Urai dulu, lalu hitung." /><PilihBertahap key={r} soal={RONDE_SELISIH_PF[r].map(([a, b], i) => soalH(a, b, <span className="text-center text-sm font-black">{a} − {b}<br />cara panjang</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function P9(d: PropsLangkah) { return Kartu(d, 19, "k4b1f-lk", "Langkah hitung.", RONDE_SELISIH_PF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanTempel pendek="Langkah" teks="Selesaikan semua langkah." /><PilihBertahap key={r} soal={RONDE_SELISIH_PF[r].map(([a, b], i) => soalH(a, b, <span className="text-lg font-black">{a} − {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }

function Q0(d: PropsLangkah) { return Kartu(d, 20, "k4b1f-sq", "Hasil susun angka.", RONDE_SELISIH_CF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Susun" teks="Hitung bersusun." /><PilihBertahap key={r} soal={RONDE_SELISIH_CF[r].map(([a, b], i) => soalH(a, b, <span className="text-3xl font-black">{a} − {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q1(d: PropsLangkah) { return Kartu(d, 21, "k4b1f-pq", "Pilih hasil.", RONDE_SELISIH_CF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Pilih" teks="Hitung dengan teliti." /><PilihBertahap key={r} soal={RONDE_SELISIH_CF[r].map(([a, b], i) => soalH(a, b, <Numeral n={`${a} − ${b}`} />, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q2(d: PropsLangkah) { return Kartu(d, 22, "k4b1f-paq", "Tulis di papan.", RONDE_PAPAN_CF.length, "Isi semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Papan" teks="Isi hasil." /><PapanEmpat key={r} soal={RONDE_PAPAN_CF[r].map(([a, b]) => ({ visual: <Numeral n={`${a}−${b}`} />, tanya: "Isi hasil.", jawab: hasil(a, b), petunjuk: "Dari satuan.", pesan: ket(a, b) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q3(d: PropsLangkah) { return Kartu(d, 23, "k4b1f-lq", "Langkah akhir.", RONDE_SELISIH_CF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Langkah" teks="Selesaikan." /><PilihBertahap key={r} soal={RONDE_SELISIH_CF[r].map(([a, b], i) => soalH(a, b, <span className="text-xl font-black">{a} − {b}</span>, r * 2 + i))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q4(d: PropsLangkah) {
  return Kartu(d, 24, "k4b1f-jq", "Jodohkan soal dan hasil.", RONDE_PASANG_CF.length, "Jodohkan semua dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CF[r];
    const kanan = ro.map((p) => ({ id: idJ(p), label: String(hasil(p[0], p[1])), isi: null as React.ReactNode }));
    return (<><CatatanPensil pendek="Jodoh" teks="Ketuk soal, lalu hasil." /><PasangKartu key={r} kiri={ro.map((p) => ({ id: idJ(p), label: `${p[0]}−${p[1]}`, isi: null as React.ReactNode }))} kanan={urutanKe(kanan.length, r).map((i) => kanan[i])} kunci={Object.fromEntries(ro.map((p) => [idJ(p), idJ(p)]))} petunjuk={() => "Belum cocok."} onBeres={beres} pesanBeres="Selesai." /></>);
  });
}
function Q5(d: PropsLangkah) { return Kartu(d, 25, "k4b1f-mq", "Memori soal.", RONDE_MEMORI_CF.length, "Selesaikan memori dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Memori" teks="Cocokkan soal dengan hasil." /><MemoriKartu key={r} pasangan={RONDE_MEMORI_CF[r].map((p, i) => ({ id: idJ(p), a: <span className="text-sm font-black">{p[0]}−{p[1]}</span>, labelA: `soal ${HURUF[i]}`, b: <Numeral n={hasil(p[0], p[1])} kelas="text-3xl" />, labelB: String(hasil(p[0], p[1])) }))} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q6(d: PropsLangkah) { return Kartu(d, 26, "k4b1f-bs", "Benar atau salah.", RONDE_BENARSALAH_QF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Benar salah" teks="Nilai tiap pernyataan." /><BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QF[r]} onBeres={beres} pesanBeres="Selesai." /></>)); }
function Q7(d: PropsLangkah) {
  return Kartu(d, 27, "k4b1f-dt", "Detektif.", RONDE_DETEKTIF_QF.length, "Selesaikan semua dulu, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QF[r];
    return (<><CatatanPensil pendek="Detektif" teks="Baca petunjuk." /><DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, ${nama}.`} /></>);
  });
}
function Q8(d: PropsLangkah) { return Kartu(d, 28, "k4b1f-pt", "Peta konsep.", PETA_KONSEP_QF.length, "Selesaikan peta dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Peta" teks="Pilih isi kotak." /><PetaKonsepGame key={r} pusat={PETA_KONSEP_QF[r].pusat} kotak={PETA_KONSEP_QF[r].kotak} onBeres={beres} pesanBeres="Peta selesai." /></>)); }
function Q9(d: PropsLangkah) { return Kartu(d, 29, "k4b1f-cq", "Cerita angka.", RONDE_CERITA_QF.length, "Jawab semua dulu, ya.", (r, beres) => (<><CatatanPensil pendek="Cerita" teks="Baca dan hitung." /><PilihBertahap key={r} soal={RONDE_CERITA_QF[r].map((s, i) => { const h = s.a - s.b; const o = opsiSelisih(h, r * 2 + i); return { visual: <Numeral n={`${s.a}−${s.b}`} />, tanya: s.teks, opsi: o.map(String), jawab: o.indexOf(h), petunjuk: "Dari satuan.", pesan: `Hasil ${h}.`, angka: true }; })} onBeres={beres} pesanBeres="Selesai." /></>)); }

const KARTU_CONCRETE: KartuTahap[] = [K0, K1, K2, K3, K4, K5, K6, K7, K8, K9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_PICTURE: KartuTahap[] = [P0, P1, P2, P3, P4, P5, P6, P7, P8, P9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));
const KARTU_ABSTRACT: KartuTahap[] = [Q0, Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9].map((K, i) => ({ nomor: i + 1, render: (d) => <K {...d} /> }));

export function ConcreteK4B1F(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "➖", nama: "CONCRETE", cara: "Rakit dan hitung!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}
export function PictureK4B1F(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Model dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}
export function AbstractK4B1F(props: Umum) {
  return <TahapPermainan umum={props} tahap={6} pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Angka dan langkah", warna: "#1C01A5" }} kartu={KARTU_ABSTRACT} teksAkhir="LANJUTKAN KE POIN PENTING ⬇️" labelKartu="Langkah" poin={(selesai) => <PoinK2B2 s={SUB_F41} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB F ➡️" />} />;
}
