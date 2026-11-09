"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { RakitKelompok } from "./mesin-k3b1f";
import { KelompokBenda } from "./dasar-k3b1f";
import { type BendaId } from "./data-k2b7";
import { TitikKotak } from "./diagram-k3b1f";
import {
  HURUF, PETA_KONSEP_QF, RONDE_BENARSALAH_QF, RONDE_CERITA_QF, RONDE_DETEKTIF_QF, RONDE_GARIS_PF, RONDE_HITUNG_CF, RONDE_HITUNG_PF, RONDE_HITUNG_QF, RONDE_KALIMAT_PF, RONDE_KETUK_CF, RONDE_MEMORI_CF,
  RONDE_MEMORI_PF, RONDE_MEMORI_QF, RONDE_PAPAN_CF, RONDE_PAPAN_QF, RONDE_PASANG_CF, RONDE_PASANG_PF, RONDE_PASANG_QF, RONDE_RAKIT_CF, RONDE_RAKIT_PF, RONDE_SEMUA_CF, RONDE_SEMUA_PF, RONDE_SORTIR_PF,
  RONDE_SUSUNKATA_QF, RONDE_TABEL_PF, RONDE_TAMBAH_CF, RONDE_TUKARFAKTOR_PF, RONDE_TUKAR_CF, RONDE_TULIS_QF, RONDE_URUT_CF, cocokKali, duaPuluhAtauLebih, hasilKali, kalimatKali, opsiFaktor, opsiKali, opsiTambah,
  susunOpsi, teksKali, teksTambah, urutTampil, urutanTetap,
  type Kali,
} from "./data-k3b1";
import { buatKartu, namaDari, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B1F } from "./infografis-k3b1";
import { SUB_F31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 1 Sub-Bab F: Perkalian Bilangan Cacah sampai 100. Tiga puluh     */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Rakit Piring  2 Hitung  3 Tulis Tambah  4 Jodohkan  5 Memori      */
/*            6 Ketuk Jumlah  7 Ketuk Lebih Kurang  8 Tukar Tempat  9 Papan  10 Urutkan */
/*  Picture  11 Hitung Titik  12 Kalimat  13 Jodohkan  14 Memori  15 Garis Loncat  */
/*           16 Tabel  17 Ketuk Lebih Kurang  18 Pilah  19 Tukar Faktor  20 Rakit Kotak */
/*  Abstract 21 Tambah ke Kali  22 Hitung Hasil  23 Papan  24 Jodohkan  25 Memori  */
/*           26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata        */
/* Naskah: naskah-k3b1.ts (SUB_F31). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_F31.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang perkalian sampai seratus. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B1FKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_F31} judul="Perkalian sampai 100" suaraInfo={SUARA_INFO} visual={visualInfografisK3B1F()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const idK = (p: Kali) => `${p[0]}x${p[1]}`;
/** Keterangan hasil: perkalian, penjumlahan berulang, dan hasilnya. */
const ketKali = (p: Kali): string => `${teksKali(p)} = ${teksTambah(p)} = ${hasilKali(p)}.`;
const PETUNJUK_KALI = "Belum tepat. Jumlahkan isi tiap kelompok berulang kali, sebanyak banyak kelompoknya.";
const soalKali = (p: Kali, visual: React.ReactNode, nomor: number, tanya = "Berapa jumlah seluruhnya?"): SoalBertahap => {
  const o = opsiKali(p, nomor);
  return { visual, tanya, opsi: o.map(String), jawab: o.indexOf(hasilKali(p)), petunjuk: PETUNJUK_KALI, pesan: ketKali(p), angka: true };
};
const teksKurang = (acuan: number, arah: "lebih" | "kurang") => `${arah} dari ${acuan}`;
const BIN_DUAPULUH = [
  { id: "kurang", label: "Kurang dari 20", warna: "#BBF7D0" },
  { id: "lebih", label: "20 atau lebih", warna: "#FDE68A" },
];

/** Dua susunan piring bertanda Susunan A dan Susunan B (tahap Concrete). */
function DuaSusunan({ a, b, benda }: { a: Kali; b: Kali; benda: BendaId }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {([["Susunan A", a], ["Susunan B", b]] as [string, Kali][]).map(([nama, p]) => (
        <div key={nama} className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
          <KelompokBenda k={p[0]} n={p[1]} benda={benda} ukuran={9} />
          <span className="text-[11px] font-black text-[#1C01A5]">{nama}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Concrete ------------------------------ */

function KartuRakitPiringF(d: PropsLangkah) {
  return Kartu(d, 0, "k3b1f-rakitpiring", "Baca isi tiap piring dan jumlah yang diminta. Tambah piring sampai jumlahnya tepat. Tekan Periksa.", RONDE_RAKIT_CF.length, "Rakit semua piringnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit piring" teks="Baca isi tiap piring dan jumlah yang diminta. Tambah piring yang isinya sama, sampai jumlah seluruhnya tepat. Lalu tekan periksa." />
      <RakitKelompok
        key={r}
        soal={RONDE_RAKIT_CF[r].map(({ benda, p }) => ({
          n: p[1],
          total: hasilKali(p),
          tanya: `Tiap piring berisi ${p[1]} ${namaDari(benda)}. Rakit ${hasilKali(p)} ${namaDari(benda)}. Berapa piring?`,
          tampil: (k) => <KelompokBenda k={k} n={p[1]} benda={benda} ukuran={14} />,
          wadah: "piring",
          pesan: ketKali(p),
          maks: 10,
        }))}
        onBeres={beres}
        pesanBeres="Semua piring sudah kamu rakit dengan tepat."
      />
    </>
  ));
}

function KartuHitungKelompokF(d: PropsLangkah) {
  return Kartu(d, 1, "k3b1f-hitungkelompok", "Lihat piring-piring yang isinya sama. Hitung jumlah seluruhnya, lalu pilih hasilnya.", RONDE_HITUNG_CF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung kelompok" teks="Hitung banyak piring dan isi tiap piring. Jumlahkan isi tiap piring berulang kali. Lalu pilih hasilnya." />
      <PilihBertahap key={r} soal={RONDE_HITUNG_CF[r].map((s, i) => soalKali(s.p, <KelompokBenda k={s.p[0]} n={s.p[1]} benda={s.benda} ukuran={13} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua jumlah sudah kamu hitung." />
    </>
  ));
}

function KartuTulisTambahF(d: PropsLangkah) {
  return Kartu(d, 2, "k3b1f-tulistambah", "Lihat gambar piring. Pilih kalimat penjumlahan berulang yang sesuai.", RONDE_TAMBAH_CF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Tulis penjumlahan berulang" teks="Hitung banyak piring, lalu lihat isi tiap piring. Tulis isi tiap piring sebanyak piringnya. Pilih kalimat yang sesuai." />
      <PilihBertahap
        key={r}
        soal={RONDE_TAMBAH_CF[r].map((s, i): SoalBertahap => {
          const o = opsiTambah(s.p, r * 2 + i);
          return {
            visual: <KelompokBenda k={s.p[0]} n={s.p[1]} benda={s.benda} ukuran={13} />,
            tanya: "Pilih kalimat penjumlahan berulang yang sesuai dengan gambar.",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Hitung banyak piring dulu, lalu tulis isi tiap piring sebanyak piringnya.",
            pesan: `${teksTambah(s.p)} = ${hasilKali(s.p)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua kalimat sudah kamu pilih."
      />
    </>
  ));
}

function KartuJodohKelompokF(d: PropsLangkah) {
  return Kartu(d, 3, "k3b1f-jodohkelompok", "Ketuk satu gambar piring di kiri, lalu ketuk perkaliannya di kanan.", RONDE_PASANG_CF.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CF[r];
    const kanan = ro.kali.map((p) => ({ id: idK(p), label: teksKali(p), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan gambar dan perkalian" teks="Hitung banyak piring dan isi tiap piring. Jodohkan dengan perkalian yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.kali.map((p, i) => ({ id: idK(p), label: `Gambar ${HURUF[i]}`, isi: <KelompokBenda k={p[0]} n={p[1]} benda={ro.benda} ukuran={9} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.kali.map((p) => [idK(p), idK(p)]))}
          petunjuk={() => "Belum cocok. Bilangan pertama adalah banyak piring, bilangan kedua adalah isi tiap piring."}
          onBeres={beres}
          pesanBeres="Semua gambar sudah cocok dengan perkaliannya."
        />
      </>
    );
  });
}

function KartuMemoriKelompokF(d: PropsLangkah) {
  return Kartu(d, 4, "k3b1f-memorikelompok", "Balik dua kartu. Cari gambar piring dan jumlah seluruhnya.", RONDE_MEMORI_CF.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori kelompok dan hasil" teks="Balik dua kartu. Cari kartu gambar piring dan kartu jumlah seluruhnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_CF[r].kali.map((p, i) => ({ id: idK(p), a: <KelompokBenda k={p[0]} n={p[1]} benda={RONDE_MEMORI_CF[r].benda} ukuran={8} />, labelA: `gambar ${HURUF[i]}`, b: <Numeral n={hasilKali(p)} kelas="text-3xl" />, labelB: `hasil ${hasilKali(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukJumlahF(d: PropsLangkah) {
  return Kartu(d, 5, "k3b1f-ketukjumlah", "Hitung jumlah tiap gambar. Ketuk gambar yang jumlahnya sama dengan bilangan yang disebut.", RONDE_KETUK_CF.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CF[r];
    return (
      <>
        <IgilBicara pendek="Ketuk kelompok dengan jumlah" teks="Hitung jumlah seluruh benda pada tiap gambar. Ketuk gambar yang jumlahnya sama dengan bilangan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((p, i) => ({ id: idK(p), label: `Gambar ${HURUF[i]}`, isi: <KelompokBenda k={p[0]} n={p[1]} benda={ro.benda} ukuran={9} /> }))}
          soal={ro.tanya.map((t) => {
            const p = ro.item.find((x) => hasilKali(x) === t) ?? ro.item[0];
            return { tanya: `Ketuk gambar yang jumlahnya ${t}.`, jawab: idK(p), petunjuk: "Belum tepat. Hitung banyak piring, lalu jumlahkan isinya berulang kali.", pesan: ketKali(p) };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaBandingF(d: PropsLangkah) {
  return Kartu(d, 6, "k3b1f-semuabanding", "Ketuk semua gambar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CF.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CF[r];
    const tanya = `Ketuk semua gambar yang jumlahnya ${teksKurang(ro.acuan, ro.arah)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.kali.map((p, i) => {
            const cocok = cocokKali(p, ro.acuan, ro.arah);
            return { id: idK(p), label: HURUF[i], isi: <KelompokBenda k={p[0]} n={p[1]} benda={ro.benda} ukuran={8} />, benar: cocok, penjelasan: `${ketKali(p)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuTukarKelompokF(d: PropsLangkah) {
  return Kartu(d, 7, "k3b1f-tukarkelompok", "Lihat dua susunan piring. Pilih susunan yang lebih banyak, atau sama banyak.", RONDE_TUKAR_CF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Tukar tempat kelompok" teks="Hitung jumlah benda pada dua susunan piring. Pilih susunan yang lebih banyak, atau pilih sama banyak bila jumlahnya sama." />
      <PilihBertahap
        key={r}
        soal={RONDE_TUKAR_CF[r].pasang.map(([a, b], i): SoalBertahap => {
          const ha = hasilKali(a);
          const hb = hasilKali(b);
          const benar = ha === hb ? "Sama banyak" : ha > hb ? "Susunan A" : "Susunan B";
          const opsi = urutanKe(3, r * 2 + i).map((x) => ["Susunan A", "Susunan B", "Sama banyak"][x]);
          return {
            visual: <DuaSusunan a={a} b={b} benda={RONDE_TUKAR_CF[r].benda} />,
            tanya: "Mana yang jumlahnya lebih banyak?",
            opsi,
            jawab: opsi.indexOf(benar),
            petunjuk: "Belum tepat. Hitung jumlah seluruhnya pada tiap susunan.",
            pesan: `${teksKali(a)} = ${ha} dan ${teksKali(b)} = ${hb}. ${ha === hb ? "Jumlahnya sama, bilangannya hanya ditukar tempatnya." : `Susunan ${ha > hb ? "A" : "B"} lebih banyak.`}`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua susunan sudah kamu bandingkan."
      />
    </>
  ));
}

function KartuPapanKelompokF(d: PropsLangkah) {
  return Kartu(d, 8, "k3b1f-papankelompok", "Hitung jumlah seluruhnya. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CF.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan hasil kelompok" teks="Hitung jumlah seluruh benda pada piring-piring. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CF[r].map((s) => ({ visual: <KelompokBenda k={s.p[0]} n={s.p[1]} benda={s.benda} ukuran={11} />, tanya: "Isi papan dengan jumlah seluruhnya.", jawab: hasilKali(s.p), petunjuk: PETUNJUK_KALI, pesan: ketKali(s.p) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutKelompokF(d: PropsLangkah) {
  return Kartu(d, 9, "k3b1f-urutkelompok", "Hitung jumlah tiap gambar. Ketuk gambar satu per satu dari jumlah paling kecil atau paling besar.", RONDE_URUT_CF.length, "Urutkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CF[r];
    const ids = ro.item.map(idK);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? hasilKali(x) - hasilKali(y) : hasilKali(y) - hasilKali(x))).map(idK);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari jumlah ${awal}`} teks="Hitung jumlah seluruh benda pada tiap gambar. Lalu urutkan gambar menurut jumlahnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const p = ro.item[ids.indexOf(id)];
            return { id, label: `Gambar ${HURUF[ids.indexOf(id)]}`, isi: <KelompokBenda k={p[0]} n={p[1]} benda={ro.benda} ukuran={9} /> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung jumlah tiap gambar.`}
          onBeres={beres}
          pesanBeres={`Urutan dari jumlah ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuHitungTitikF(d: PropsLangkah) {
  return Kartu(d, 10, "k3b1f-hitungtitik", "Lihat kotak-kotak berisi titik yang sama banyak. Hitung jumlah titik seluruhnya, lalu pilih hasilnya.", RONDE_HITUNG_PF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung titik berkelompok" teks="Hitung banyak kotak dan isi tiap kotak. Jumlahkan isi tiap kotak berulang kali. Lalu pilih hasilnya." />
      <PilihBertahap key={r} soal={RONDE_HITUNG_PF[r].map((p, i) => soalKali(p, <TitikKotak k={p[0]} n={p[1]} ukuran={9} />, r * 2 + i, "Berapa jumlah titik seluruhnya?"))} onBeres={beres} pesanBeres="Semua titik sudah kamu hitung." />
    </>
  ));
}

function KartuKalimatPerkalianF(d: PropsLangkah) {
  return Kartu(d, 11, "k3b1f-kalimat", "Lihat gambar kotak titik. Lengkapi tiap kalimat dengan angka yang tepat.", RONDE_KALIMAT_PF.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const p = RONDE_KALIMAT_PF[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kalimat perkalian" teks="Lihat gambar kotak titik. Lengkapi penjumlahan berulang, perkalian, dan perkalian yang ditukar tempat." />
        <TitikKotak k={p[0]} n={p[1]} ukuran={10} />
        <IsiKalimatGame key={r} kalimat={kalimatKali(p, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuJodohTitikF(d: PropsLangkah) {
  return Kartu(d, 12, "k3b1f-jodohtitik", "Ketuk satu gambar kotak titik di kiri, lalu ketuk perkaliannya di kanan.", RONDE_PASANG_PF.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PF[r];
    const kanan = ro.map((p) => ({ id: idK(p), label: teksKali(p), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan titik dan perkalian" teks="Hitung banyak kotak dan isi tiap kotak. Jodohkan dengan perkalian yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: idK(p), label: `Gambar ${HURUF[i]}`, isi: <TitikKotak k={p[0]} n={p[1]} ukuran={8} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idK(p), idK(p)]))}
          petunjuk={() => "Belum cocok. Bilangan pertama adalah banyak kotak, bilangan kedua adalah isi tiap kotak."}
          onBeres={beres}
          pesanBeres="Semua gambar sudah cocok dengan perkaliannya."
        />
      </>
    );
  });
}

function KartuMemoriTitikF(d: PropsLangkah) {
  return Kartu(d, 13, "k3b1f-memorititik", "Balik dua kartu. Cari gambar kotak titik dan hasilnya.", RONDE_MEMORI_PF.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori titik dan hasil" teks="Balik dua kartu. Cari kartu gambar kotak titik dan kartu hasilnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PF[r].map((p, i) => ({ id: idK(p), a: <TitikKotak k={p[0]} n={p[1]} ukuran={6} />, labelA: `gambar ${HURUF[i]}`, b: <Numeral n={hasilKali(p)} kelas="text-3xl" />, labelB: `hasil ${hasilKali(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuGarisLoncatF(d: PropsLangkah) {
  return Kartu(d, 14, "k3b1f-garisloncat", "Mulai dari 0. Hitung loncatan sama besar, lalu ketuk titik pendaratan terakhir pada garis bilangan.", RONDE_GARIS_PF.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Loncatan pada garis bilangan" teks="Mulai dari nol. Loncat beberapa kali dengan besar yang sama. Ketuk titik pendaratan terakhir." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARIS_PF[r].map(({ n, k }) => ({
          tanya: `Mulai dari 0. Loncat ${k} kali, tiap loncatan sebesar ${n}. Di mana pendaratan terakhir?`,
          dari: 0,
          sampai: n * 5,
          langkah: n,
          jawab: n * k,
          petunjuk: `Belum tepat. Hitung loncatan satu per satu: tiap loncatan sebesar ${n}.`,
          pesan: `${k} × ${n} = ${teksTambah([k, n])} = ${k * n}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua loncatan sudah mendarat dengan tepat."
      />
    </>
  ));
}

function KartuTabelKaliF(d: PropsLangkah) {
  return Kartu(d, 15, "k3b1f-tabelkali", "Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PF.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PF[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel perkalian" teks="Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Hitung lagi ${b.label}: jumlahkan berulang kali.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaBandingTitikF(d: PropsLangkah) {
  return Kartu(d, 16, "k3b1f-semuabandingtitik", "Ketuk semua gambar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PF.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PF[r];
    const tanya = `Ketuk semua gambar yang jumlahnya ${teksKurang(ro.acuan, ro.arah)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.kali.map((p, i) => {
            const cocok = cocokKali(p, ro.acuan, ro.arah);
            return { id: idK(p), label: HURUF[i], isi: <TitikKotak k={p[0]} n={p[1]} ukuran={7} />, benar: cocok, penjelasan: `${ketKali(p)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahTitikF(d: PropsLangkah) {
  return Kartu(d, 17, "k3b1f-pilahtitik", "Seret atau ketuk tiap gambar ke kotak: kurang dari 20, atau 20 atau lebih.", RONDE_SORTIR_PF.length, "Pilah semua gambarnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah gambar" teks="Hitung jumlah titik pada tiap gambar. Pilah menjadi kurang dari dua puluh, atau dua puluh atau lebih." />
      <Sortir
        key={r}
        lebarItem={150}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PF[r].length, r).map((i) => {
          const p = RONDE_SORTIR_PF[r][i];
          return {
            id: idK(p),
            label: teksKali(p),
            isi: <TitikKotak k={p[0]} n={p[1]} ukuran={7} />,
            bin: duaPuluhAtauLebih(p) ? "lebih" : "kurang",
            petunjuk: `Belum tepat. Hitung ${teksKali(p)}: jumlahkan berulang kali, lalu bandingkan dengan 20.`,
            ucapan: `${teksKali(p)} sama dengan ${hasilKali(p)}, ${duaPuluhAtauLebih(p) ? "dua puluh atau lebih" : "kurang dari dua puluh"}.`,
          };
        })}
        bin={BIN_DUAPULUH}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuTukarFaktorF(d: PropsLangkah) {
  return Kartu(d, 18, "k3b1f-tukarfaktor", "Lihat gambar kotak titik. Pilih bilangan yang tepat bila dua bilangan pada perkalian ditukar tempatnya.", RONDE_TUKARFAKTOR_PF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Tukar faktor" teks="Bilangan pada perkalian boleh ditukar tempatnya. Pilih bilangan yang tepat untuk bagian kosong." />
      <PilihBertahap
        key={r}
        soal={RONDE_TUKARFAKTOR_PF[r].map((p, i): SoalBertahap => {
          const o = opsiFaktor(p, r * 2 + i);
          return {
            visual: <TitikKotak k={p[0]} n={p[1]} ukuran={8} />,
            tanya: `${p[0]} × ${p[1]} = ${p[1]} × ...`,
            opsi: o.map(String),
            jawab: o.indexOf(p[0]),
            petunjuk: "Belum tepat. Bila dua bilangan ditukar tempatnya, hasilnya tetap sama. Bilangan yang tadi di depan pindah ke belakang.",
            pesan: `${teksKali(p)} = ${p[1]} × ${p[0]} = ${hasilKali(p)}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tukar dengan tepat."
      />
    </>
  ));
}

function KartuRakitKotakF(d: PropsLangkah) {
  return Kartu(d, 19, "k3b1f-rakitkotak", "Baca isi tiap kotak dan jumlah titik yang diminta. Tambah kotak sampai jumlahnya tepat. Tekan Periksa.", RONDE_RAKIT_PF.length, "Rakit semua kotaknya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Rakit kotak titik" teks="Baca isi tiap kotak dan jumlah titik yang diminta. Tambah kotak yang isinya sama sampai jumlahnya tepat. Lalu tekan periksa." />
      <RakitKelompok
        key={r}
        soal={RONDE_RAKIT_PF[r].map((p) => ({
          n: p[1],
          total: hasilKali(p),
          tanya: `Tiap kotak berisi ${p[1]} titik. Rakit ${hasilKali(p)} titik. Berapa kotak?`,
          tampil: (k) => <TitikKotak k={k} n={p[1]} ukuran={10} />,
          wadah: "kotak",
          pesan: ketKali(p),
          maks: 10,
        }))}
        onBeres={beres}
        pesanBeres="Semua kotak sudah kamu rakit dengan tepat."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

const SoalTulis = ({ p }: { p: Kali }) => <p className="rounded-2xl bg-[#FFF7CC] px-3 py-2 text-center text-lg font-black leading-snug text-[#1C01A5]">{teksTambah(p)} = ?</p>;

const SoalHasil = ({ p }: { p: Kali }) => (
  <p className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF7CC] px-4 py-2 text-4xl font-black text-[#1C01A5]">
    <span>{p[0]}</span>
    <span>×</span>
    <span>{p[1]}</span>
    <span>=</span>
    <span>?</span>
  </p>
);

function KartuTulisKaliQF(d: PropsLangkah) {
  return Kartu(d, 20, "k3b1f-tulisperkalian", "Baca penjumlahan berulang. Pilih perkalian dan hasil yang sama dengannya.", RONDE_TULIS_QF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Dari penjumlahan ke perkalian" teks="Hitung berapa kali bilangan itu ditambahkan. Banyaknya adalah banyak kelompok. Pilih perkalian dan hasil yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_TULIS_QF[r].map((p, i): SoalBertahap => {
          const [k, n] = p;
          const o = susunOpsi(`${k} × ${n} = ${k * n}`, [`${k + 1} × ${n} = ${(k + 1) * n}`, `${k - 1} × ${n} = ${(k - 1) * n}`], r * 2 + i);
          return {
            visual: <SoalTulis p={p} />,
            tanya: "Pilih perkalian dan hasil yang sama dengan penjumlahan berulang ini.",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Hitung berapa kali bilangan itu ditambahkan. Itulah bilangan pertama pada perkalian.",
            pesan: ketKali(p),
          };
        })}
        onBeres={beres}
        pesanBeres="Semua penjumlahan berulang sudah kamu ubah menjadi perkalian."
      />
    </>
  ));
}

function KartuHitungHasilQF(d: PropsLangkah) {
  return Kartu(d, 21, "k3b1f-hitunghasil", "Hitung perkaliannya. Pilih hasil yang benar dari tiga pilihan.", RONDE_HITUNG_QF.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Hitung hasil kali" teks="Ubah perkalian menjadi penjumlahan berulang bila perlu. Pilih hasil yang benar." />
      <PilihBertahap key={r} soal={RONDE_HITUNG_QF[r].map((p, i) => soalKali(p, <SoalHasil p={p} />, r * 2 + i, `${teksKali(p)} = ?`))} onBeres={beres} pesanBeres="Semua hasil kali sudah kamu pilih." />
    </>
  ));
}

function KartuPapanQF(d: PropsLangkah) {
  return Kartu(d, 22, "k3b1f-papanhasil", "Hitung perkaliannya. Atur angka puluhan dan satuan hasilnya pada papan, lalu tekan Periksa.", RONDE_PAPAN_QF.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Papan hasil kali" teks="Hitung hasil perkalian. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit key={r} soal={RONDE_PAPAN_QF[r].map((p) => ({ visual: <SoalHasil p={p} />, tanya: "Isi papan dengan hasil kalinya.", jawab: hasilKali(p), petunjuk: PETUNJUK_KALI, pesan: ketKali(p) }))} onBeres={beres} pesanBeres="Semua papan sudah terisi dengan benar." />
    </>
  ));
}

function KartuJodohTambahQF(d: PropsLangkah) {
  return Kartu(d, 23, "k3b1f-jodohtambah", "Ketuk satu penjumlahan berulang di kiri, lalu ketuk perkaliannya di kanan.", RONDE_PASANG_QF.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QF[r];
    const kanan = ro.map((p) => ({ id: idK(p), label: teksKali(p), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan tambah dan kali" teks="Hitung berapa kali bilangan itu ditambahkan. Jodohkan penjumlahan berulang dengan perkalian yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((p) => ({ id: idK(p), label: teksTambah(p).replace(/ /g, ""), isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idK(p), idK(p)]))}
          petunjuk={() => "Belum cocok. Hitung berapa kali bilangan itu ditambahkan. Itulah bilangan pertama pada perkalian."}
          onBeres={beres}
          pesanBeres="Semua penjumlahan sudah cocok dengan perkaliannya."
        />
      </>
    );
  });
}

function KartuMemoriKaliQF(d: PropsLangkah) {
  return Kartu(d, 24, "k3b1f-memorikali", "Balik dua kartu. Cari perkalian dan hasilnya.", RONDE_MEMORI_QF.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori perkalian dan hasil" teks="Balik dua kartu. Cari kartu perkalian dan kartu hasilnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_QF[r].map((p, i) => ({ id: idK(p), a: <Numeral n={`${p[0]}×${p[1]}`} kelas="text-xl" />, labelA: `soal ${HURUF[i]}`, b: <Numeral n={hasilKali(p)} kelas="text-3xl" />, labelB: `hasil ${hasilKali(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahF(d: PropsLangkah) {
  return Kartu(d, 25, "k3b1f-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QF.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang perkalian dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QF[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifF(d: PropsLangkah) {
  return Kartu(d, 26, "k3b1f-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QF.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QF[r];
    return (
      <>
        <CatatanPensil pendek="Detektif perkalian" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`} />
      </>
    );
  });
}

function KartuPetaF(d: PropsLangkah) {
  return Kartu(d, 27, "k3b1f-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QF.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QF[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaQF(d: PropsLangkah) {
  return Kartu(d, 28, "k3b1f-ceritaangka", "Baca soal cerita. Tulis kalimat perkaliannya dalam hati, lalu pilih hasilnya.", RONDE_CERITA_QF.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QF[r].map((c, i) => {
      const o = opsiKali(c.p, r * 2 + i);
      return {
        visual: <p className="rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-xl font-black text-[#1C01A5]">{teksKali(c.p)} = ?</p>,
        tanya: c.teks,
        opsi: o.map(String),
        jawab: o.indexOf(hasilKali(c.p)),
        petunjuk: PETUNJUK_KALI,
        pesan: ketKali(c.p),
        angka: true,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita perkalian" teks="Baca soal cerita dengan teliti. Cari banyak kelompok dan isi tiap kelompok, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataF(d: PropsLangkah) {
  return Kartu(d, 29, "k3b1f-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QF.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata perkalian" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QF[r].kata} pengecoh={RONDE_SUSUNKATA_QF[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuRakitPiringF, KartuHitungKelompokF, KartuTulisTambahF, KartuJodohKelompokF, KartuMemoriKelompokF, KartuKetukJumlahF, KartuSemuaBandingF, KartuTukarKelompokF, KartuPapanKelompokF, KartuUrutKelompokF].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuHitungTitikF, KartuKalimatPerkalianF, KartuJodohTitikF, KartuMemoriTitikF, KartuGarisLoncatF, KartuTabelKaliF, KartuSemuaBandingTitikF, KartuPilahTitikF, KartuTukarFaktorF, KartuRakitKotakF].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuTulisKaliQF, KartuHitungHasilQF, KartuPapanQF, KartuJodohTambahQF, KartuMemoriKaliQF, KartuBenarSalahF, KartuDetektifF, KartuPetaF, KartuCeritaQF, KartuSusunKataF].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B1F(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🍽️", nama: "CONCRETE", cara: "Isi piring dan hitung semuanya!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B1F(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat kotak titik dan garis", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B1F(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Bilangan dan hasil kali", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_F31} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB F ➡️" />}
    />
  );
}
