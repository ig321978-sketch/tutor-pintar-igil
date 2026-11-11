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
import { BagiBergiliran } from "./mesin-k3b1g";
import { BagiAwal, KelompokBenda, TumpukanBenda } from "./dasar-k3b1f";
import { BagiTitik, TitikKotak } from "./diagram-k3b1f";
import {
  HURUF, PETA_KONSEP_QG, RONDE_BAGI_CG, RONDE_BAGI_PG, RONDE_BENARSALAH_QG, RONDE_CERITA_CG, RONDE_CERITA_QG, RONDE_DETEKTIF_QG, RONDE_GARIS_PG, RONDE_HITUNG_CG, RONDE_HITUNG_QG, RONDE_KALIMAT_PG,
  RONDE_KETUK_CG, RONDE_KURANG_QG, RONDE_MEMORI_CG, RONDE_MEMORI_PG, RONDE_MEMORI_QG, RONDE_PAPAN_CG, RONDE_PAPAN_QG, RONDE_PASANG_CG, RONDE_PASANG_PG, RONDE_PASANG_QG, RONDE_PERIKSA_PG, RONDE_RAKIT_PG,
  RONDE_SEMUA_CG, RONDE_SEMUA_PG, RONDE_SORTIR_PG, RONDE_SUSUNKATA_QG, RONDE_TABEL_PG, RONDE_TULIS_CG, RONDE_URUT_CG, TEKS_CERITA_CG, cocokBagi, hasilBagi, kalimatBagi, kunciBagi, limaAtauLebih, opsiBagi,
  opsiKurang, opsiPeriksa, teksBagi, teksKurangBerulang, teksPeriksaBagi, urutTampil, urutanTetap,
  type Bagi,
} from "./data-k3b1";
import { buatKartu, namaDari, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B1G } from "./infografis-k3b1";
import { SUB_G31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 1 Sub-Bab G: Pembagian Bilangan Cacah sampai 100. Tiga puluh     */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Bagikan Bergiliran  2 Hitung Bagian  3 Tulis Kurang Berulang     */
/*            4 Jodohkan  5 Memori  6 Ketuk Hasil Bagi  7 Ketuk Lebih Kurang      */
/*            8 Cerita  9 Papan  10 Urutkan                                      */
/*  Picture  11 Bagi Titik  12 Kalimat  13 Jodohkan  14 Memori  15 Loncat Mundur */
/*           16 Tabel  17 Ketuk Lebih Kurang  18 Pilah  19 Periksa Kali  20 Rakit */
/*  Abstract 21 Kurang Berulang  22 Hitung Hasil  23 Papan  24 Jodohkan Kali      */
/*           25 Memori  26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun */
/* Naskah: naskah-k3b1.ts (SUB_G31). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_G31.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang pembagian sampai seratus. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B1GKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_G31} judul="Pembagian sampai 100" suaraInfo={SUARA_INFO} visual={visualInfografisK3B1G()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const idB = (p: Bagi) => `${p[0]}b${p[1]}`;
/** Keterangan hasil: pembagian, pengurangan berulang, dan perkalian pemeriksa. */
const ketBagi = (p: Bagi): string => `${teksBagi(p)} = ${hasilBagi(p)}. ${teksKurangBerulang(p)} = 0, jadi bilangan ${p[1]} dikurangkan ${hasilBagi(p)} kali. Periksa: ${teksPeriksaBagi(p)}.`;
const PETUNJUK_BAGI = "Belum tepat. Kurangkan pembagi berulang kali sampai habis, lalu hitung berapa kali. Periksa dengan perkalian.";
const soalBagi = (p: Bagi, visual: React.ReactNode, nomor: number, tanya = "Berapa hasil baginya?"): SoalBertahap => {
  const o = opsiBagi(p, nomor);
  return { visual, tanya, opsi: o.map(String), jawab: o.indexOf(hasilBagi(p)), petunjuk: PETUNJUK_BAGI, pesan: ketBagi(p), angka: true };
};
const teksBanding = (acuan: number, arah: "lebih" | "kurang") => `${arah} dari ${acuan}`;
const BIN_LIMA = [
  { id: "kurang", label: "Kurang dari 5", warna: "#BBF7D0" },
  { id: "lebih", label: "5 atau lebih", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuBagiBergiliranG(d: PropsLangkah) {
  return Kartu(d, 0, "k3b1g-bagibergiliran", "Baca banyak benda dan banyak piring. Tekan Bagikan satu putaran sampai tumpukan habis.", RONDE_BAGI_CG.length, "Bagikan semua tumpukannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Bagikan bergiliran" teks="Bagikan satu benda untuk tiap piring, lagi dan lagi, sampai tumpukan habis. Lihat kalimat pengurangannya bertambah panjang." />
      <BagiBergiliran
        key={r}
        soal={RONDE_BAGI_CG[r].map(({ benda, p }) => ({
          total: p[0],
          g: p[1],
          tanya: `Ada ${p[0]} ${namaDari(benda)}. Bagikan sama banyak ke ${p[1]} piring.`,
          tampil: (putaran) => (
            <div className="flex w-full flex-col items-center gap-2">
              <TumpukanBenda n={p[0] - putaran * p[1]} benda={benda} ukuran={13} />
              <KelompokBenda k={p[1]} n={putaran} benda={benda} ukuran={12} />
            </div>
          ),
          pesan: ketBagi(p),
        }))}
        onBeres={beres}
        pesanBeres="Semua tumpukan sudah kamu bagikan sampai habis."
      />
    </>
  ));
}

function KartuHitungBagianG(d: PropsLangkah) {
  return Kartu(d, 1, "k3b1g-hitungbagian", "Lihat tumpukan dan piring kosong. Hitung berapa benda tiap piring, lalu pilih hasilnya.", RONDE_HITUNG_CG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung bagian" teks="Bagi tumpukan sama banyak ke semua piring. Kurangkan banyak piring berulang kali dari tumpukan. Lalu pilih berapa benda tiap piring." />
      <PilihBertahap key={r} soal={RONDE_HITUNG_CG[r].map((s, i) => soalBagi(s.p, <BagiAwal t={s.p[0]} g={s.p[1]} benda={s.benda} />, r * 2 + i, "Berapa benda di tiap piring?"))} onBeres={beres} pesanBeres="Semua bagian sudah kamu hitung." />
    </>
  ));
}

function KartuTulisKurangG(d: PropsLangkah) {
  return Kartu(d, 2, "k3b1g-tuliskurang", "Lihat tumpukan dan piring. Pilih kalimat pengurangan berulang yang sesuai.", RONDE_TULIS_CG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Tulis pengurangan berulang" teks="Kurangkan banyak piring dari tumpukan berulang kali sampai nol. Pilih kalimat dengan banyak pengurangan yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_TULIS_CG[r].map((s, i): SoalBertahap => {
          const o = opsiKurang(s.p, r * 2 + i);
          return {
            visual: <BagiAwal t={s.p[0]} g={s.p[1]} benda={s.benda} ukuran={11} />,
            tanya: "Pilih kalimat pengurangan berulang yang sesuai dengan pembagian ini.",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Hitung berapa kali banyak piring dikurangkan sampai tumpukan habis.",
            pesan: `${teksKurangBerulang(s.p)} = 0, jadi ${teksBagi(s.p)} = ${hasilBagi(s.p)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua kalimat sudah kamu pilih."
      />
    </>
  ));
}

function KartuJodohBagiG(d: PropsLangkah) {
  return Kartu(d, 3, "k3b1g-jodohbagi", "Ketuk satu gambar piring di kiri, lalu ketuk pembagiannya di kanan.", RONDE_PASANG_CG.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CG[r];
    const kanan = ro.bagi.map((p) => ({ id: idB(p), label: teksBagi(p), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan gambar dan pembagian" teks="Hitung semua benda pada piring, lalu lihat banyak piringnya. Jodohkan dengan pembagian yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.bagi.map((p, i) => ({ id: idB(p), label: `Gambar ${HURUF[i]}`, isi: <KelompokBenda k={p[1]} n={hasilBagi(p)} benda={ro.benda} ukuran={9} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.bagi.map((p) => [idB(p), idB(p)]))}
          petunjuk={() => "Belum cocok. Jumlah seluruh benda adalah bilangan yang dibagi. Banyak piring adalah pembagi."}
          onBeres={beres}
          pesanBeres="Semua gambar sudah cocok dengan pembagiannya."
        />
      </>
    );
  });
}

function KartuMemoriBagiG(d: PropsLangkah) {
  return Kartu(d, 4, "k3b1g-memoribagi", "Balik dua kartu. Cari gambar piring dan hasil baginya.", RONDE_MEMORI_CG.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori gambar dan hasil bagi" teks="Balik dua kartu. Cari kartu gambar piring dan kartu hasil baginya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_CG[r].bagi.map((p, i) => ({ id: idB(p), a: <KelompokBenda k={p[1]} n={hasilBagi(p)} benda={RONDE_MEMORI_CG[r].benda} ukuran={8} />, labelA: `gambar ${HURUF[i]}`, b: <Numeral n={hasilBagi(p)} kelas="text-3xl" />, labelB: `hasil bagi ${hasilBagi(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukBagiG(d: PropsLangkah) {
  return Kartu(d, 5, "k3b1g-ketukbagi", "Lihat tiap gambar piring. Ketuk gambar yang hasil baginya sama dengan bilangan yang disebut.", RONDE_KETUK_CG.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CG[r];
    return (
      <>
        <IgilBicara pendek="Ketuk gambar dengan hasil bagi" teks="Hitung berapa benda tiap piring pada tiap gambar. Ketuk gambar yang hasil baginya sama dengan bilangan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((p, i) => ({ id: idB(p), label: `Gambar ${HURUF[i]}`, isi: <KelompokBenda k={p[1]} n={hasilBagi(p)} benda={ro.benda} ukuran={9} /> }))}
          soal={ro.tanya.map((t) => {
            const p = ro.item.find((x) => hasilBagi(x) === t) ?? ro.item[0];
            return { tanya: `Ketuk gambar yang hasil baginya ${t}.`, jawab: idB(p), petunjuk: "Belum tepat. Hitung berapa benda di satu piring.", pesan: ketBagi(p) };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaBandingG(d: PropsLangkah) {
  return Kartu(d, 6, "k3b1g-semuabanding", "Ketuk semua gambar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CG.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CG[r];
    const tanya = `Ketuk semua gambar yang hasil baginya ${teksBanding(ro.acuan, ro.arah)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.bagi.map((p, i) => {
            const cocok = cocokBagi(p, ro.acuan, ro.arah);
            return { id: idB(p), label: HURUF[i], isi: <KelompokBenda k={p[1]} n={hasilBagi(p)} benda={ro.benda} ukuran={8} />, benar: cocok, penjelasan: `${teksBagi(p)} = ${hasilBagi(p)}. ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuCeritaBagiG(d: PropsLangkah) {
  return Kartu(d, 7, "k3b1g-ceritabagi", "Baca ceritanya, lihat tumpukan dan piring, lalu pilih hasil baginya.", RONDE_CERITA_CG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Cerita pembagian" teks="Baca cerita dengan teliti. Bagi benda sama banyak ke semua tempat, lalu pilih berapa benda tiap tempat." />
      <PilihBertahap key={r} soal={RONDE_CERITA_CG[r].map((s, i) => soalBagi(s.p, <BagiAwal t={s.p[0]} g={s.p[1]} benda={s.benda} ukuran={11} />, r * 2 + i, TEKS_CERITA_CG[kunciBagi(s)]))} onBeres={beres} pesanBeres="Semua cerita sudah kamu selesaikan." />
    </>
  ));
}

function KartuPapanBagiG(d: PropsLangkah) {
  return Kartu(d, 8, "k3b1g-papanbagi", "Hitung hasil bagi tumpukan. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CG.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan hasil bagi" teks="Bagi tumpukan sama banyak ke semua piring. Tulis puluhan dan satuan hasil baginya pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_PAPAN_CG[r].map((s) => ({ visual: <BagiAwal t={s.p[0]} g={s.p[1]} benda={s.benda} ukuran={10} />, tanya: "Isi papan dengan hasil baginya.", jawab: hasilBagi(s.p), petunjuk: PETUNJUK_BAGI, pesan: ketBagi(s.p) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutBagiG(d: PropsLangkah) {
  return Kartu(d, 9, "k3b1g-urutbagi", "Hitung hasil bagi tiap gambar. Ketuk gambar satu per satu dari hasil bagi paling kecil atau paling besar.", RONDE_URUT_CG.length, "Urutkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CG[r];
    const ids = ro.item.map(idB);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? hasilBagi(x) - hasilBagi(y) : hasilBagi(y) - hasilBagi(x))).map(idB);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari hasil bagi ${awal}`} teks="Hitung berapa benda tiap piring pada tiap gambar. Lalu urutkan gambar menurut hasil baginya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const p = ro.item[ids.indexOf(id)];
            return { id, label: `Gambar ${HURUF[ids.indexOf(id)]}`, isi: <KelompokBenda k={p[1]} n={hasilBagi(p)} benda={ro.benda} ukuran={9} /> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung benda di satu piring.`}
          onBeres={beres}
          pesanBeres={`Urutan dari hasil bagi ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuBagiTitikG(d: PropsLangkah) {
  return Kartu(d, 10, "k3b1g-bagititik", "Lihat kotak berisi banyak titik dan kotak-kotak kosong. Pilih banyak titik tiap kotak bila dibagi sama banyak.", RONDE_BAGI_PG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Bagi titik" teks="Bagi titik sama banyak ke semua kotak kosong. Pilih berapa titik tiap kotak." />
      <PilihBertahap key={r} soal={RONDE_BAGI_PG[r].map((p, i) => soalBagi(p, <BagiTitik t={p[0]} g={p[1]} />, r * 2 + i, "Berapa titik di tiap kotak?"))} onBeres={beres} pesanBeres="Semua titik sudah kamu bagi." />
    </>
  ));
}

function KartuKalimatBagiG(d: PropsLangkah) {
  return Kartu(d, 11, "k3b1g-kalimatbagi", "Lihat gambar kotak titik. Lengkapi tiap kalimat dengan angka yang tepat.", RONDE_KALIMAT_PG.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const p = RONDE_KALIMAT_PG[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kalimat pembagian" teks="Lihat gambar kotak titik. Lengkapi pengurangan berulang, pembagian, dan perkalian pemeriksa." />
        <TitikKotak k={p[1]} n={hasilBagi(p)} ukuran={10} />
        <IsiKalimatGame key={r} kalimat={kalimatBagi(p, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuJodohTitikBagiG(d: PropsLangkah) {
  return Kartu(d, 12, "k3b1g-jodohtitikbagi", "Ketuk satu gambar kotak titik di kiri, lalu ketuk pembagiannya di kanan.", RONDE_PASANG_PG.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PG[r];
    const kanan = ro.map((p) => ({ id: idB(p), label: teksBagi(p), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan titik dan pembagian" teks="Hitung semua titik, lalu lihat banyak kotaknya. Jodohkan dengan pembagian yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: idB(p), label: `Gambar ${HURUF[i]}`, isi: <TitikKotak k={p[1]} n={hasilBagi(p)} ukuran={8} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idB(p), idB(p)]))}
          petunjuk={() => "Belum cocok. Jumlah seluruh titik adalah bilangan yang dibagi. Banyak kotak adalah pembagi."}
          onBeres={beres}
          pesanBeres="Semua gambar sudah cocok dengan pembagiannya."
        />
      </>
    );
  });
}

function KartuMemoriTitikBagiG(d: PropsLangkah) {
  return Kartu(d, 13, "k3b1g-memorititikbagi", "Balik dua kartu. Cari gambar kotak titik dan hasil baginya.", RONDE_MEMORI_PG.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori titik dan hasil bagi" teks="Balik dua kartu. Cari kartu gambar kotak titik dan kartu hasil baginya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PG[r].map((p, i) => ({ id: idB(p), a: <TitikKotak k={p[1]} n={hasilBagi(p)} ukuran={6} />, labelA: `gambar ${HURUF[i]}`, b: <Numeral n={hasilBagi(p)} kelas="text-3xl" />, labelB: `hasil bagi ${hasilBagi(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuLoncatMundurG(d: PropsLangkah) {
  return Kartu(d, 14, "k3b1g-loncatmundur", "Mulai dari bilangan yang dibagi. Hitung loncatan mundur sama besar, lalu ketuk titik pendaratan.", RONDE_GARIS_PG.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Loncat mundur" teks="Mulai dari bilangan yang dibagi. Loncat mundur beberapa kali dengan besar yang sama. Ketuk titik pendaratan." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARIS_PG[r].map(({ t, d, k }) => ({
          tanya: `Mulai dari ${t}. Loncat mundur ${k} kali, tiap loncatan sebesar ${d}. Di mana mendarat?`,
          dari: 0,
          sampai: t,
          langkah: d,
          jawab: t - k * d,
          petunjuk: `Belum tepat. Kurangkan ${d} satu per satu sebanyak ${k} kali dari ${t}.`,
          pesan: `${teksKurangBerulang([t, d], k)} = ${t - k * d}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua loncatan mundur sudah mendarat dengan tepat."
      />
    </>
  ));
}

function KartuTabelBagiG(d: PropsLangkah) {
  return Kartu(d, 15, "k3b1g-tabelbagi", "Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PG.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PG[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel pembagian" teks="Ketuk baris tabel, lalu ketuk kartu hasil yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Hitung lagi ${b.label}: kurangkan pembagi berulang kali sampai habis.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaBandingTitikG(d: PropsLangkah) {
  return Kartu(d, 16, "k3b1g-semuabandingtitik", "Ketuk semua gambar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PG.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PG[r];
    const tanya = `Ketuk semua gambar yang hasil baginya ${teksBanding(ro.acuan, ro.arah)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.bagi.map((p, i) => {
            const cocok = cocokBagi(p, ro.acuan, ro.arah);
            return { id: idB(p), label: HURUF[i], isi: <TitikKotak k={p[1]} n={hasilBagi(p)} ukuran={7} />, benar: cocok, penjelasan: `${teksBagi(p)} = ${hasilBagi(p)}. ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahTitikBagiG(d: PropsLangkah) {
  return Kartu(d, 17, "k3b1g-pilahtitikbagi", "Seret atau ketuk tiap gambar ke kotak: hasil bagi kurang dari 5, atau 5 atau lebih.", RONDE_SORTIR_PG.length, "Pilah semua gambarnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah gambar" teks="Hitung titik tiap kotak pada tiap gambar. Pilah menjadi hasil bagi kurang dari lima, atau lima atau lebih." />
      <Sortir
        key={r}
        lebarItem={150}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PG[r].length, r).map((i) => {
          const p = RONDE_SORTIR_PG[r][i];
          return {
            id: idB(p),
            label: teksBagi(p),
            isi: <TitikKotak k={p[1]} n={hasilBagi(p)} ukuran={7} />,
            bin: limaAtauLebih(p) ? "lebih" : "kurang",
            petunjuk: `Belum tepat. Hitung ${teksBagi(p)}, lalu bandingkan dengan 5.`,
            ucapan: `${teksBagi(p)} sama dengan ${hasilBagi(p)}, ${limaAtauLebih(p) ? "lima atau lebih" : "kurang dari lima"}.`,
          };
        })}
        bin={BIN_LIMA}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuPeriksaKaliG(d: PropsLangkah) {
  return Kartu(d, 18, "k3b1g-periksakali", "Lihat gambar kotak titik. Pilih hasil perkalian pemeriksa yang tepat.", RONDE_PERIKSA_PG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Periksa dengan perkalian" teks="Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Pilih hasil perkalian pemeriksa." />
      <PilihBertahap
        key={r}
        soal={RONDE_PERIKSA_PG[r].map((p, i): SoalBertahap => {
          const o = opsiPeriksa(p, r * 2 + i);
          return {
            visual: <TitikKotak k={p[1]} n={hasilBagi(p)} ukuran={8} />,
            tanya: `${teksBagi(p)} = ${hasilBagi(p)}. Maka ${hasilBagi(p)} × ${p[1]} = ...`,
            opsi: o.map(String),
            jawab: o.indexOf(p[0]),
            petunjuk: "Belum tepat. Hasil bagi dikali pembagi sama dengan bilangan yang dibagi.",
            pesan: `${teksPeriksaBagi(p)}. Bilangan yang dibagi adalah ${p[0]}.`,
            angka: true,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua perkalian pemeriksa sudah kamu pilih."
      />
    </>
  ));
}

function KartuRakitKotakBagiG(d: PropsLangkah) {
  return Kartu(d, 19, "k3b1g-rakitkotakbagi", "Baca isi tiap kotak dan jumlah titik yang diminta. Tambah kotak sampai jumlahnya tepat. Tekan Periksa.", RONDE_RAKIT_PG.length, "Rakit semua kotaknya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Rakit kotak pembagi" teks="Baca isi tiap kotak dan jumlah titik yang diminta. Tambah kotak yang isinya sama sampai jumlahnya tepat. Banyak kotak adalah hasil baginya." />
      <RakitKelompok
        key={r}
        soal={RONDE_RAKIT_PG[r].map((p) => ({
          n: p[1],
          total: p[0],
          tanya: `Tiap kotak berisi ${p[1]} titik. Rakit ${p[0]} titik. Berapa kotak?`,
          tampil: (k) => <TitikKotak k={k} n={p[1]} ukuran={10} />,
          wadah: "kotak",
          pesan: `${teksBagi(p)} = ${p[0] / p[1]}. Ada ${p[0] / p[1]} kotak berisi ${p[1]} titik.`,
          maks: 10,
        }))}
        onBeres={beres}
        pesanBeres="Semua kotak sudah kamu rakit dengan tepat."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

const SoalBagiTeks = ({ p }: { p: Bagi }) => (
  <p className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF7CC] px-4 py-2 text-4xl font-black text-[#1C01A5]">
    <span>{p[0]}</span>
    <span>:</span>
    <span>{p[1]}</span>
    <span>=</span>
    <span>?</span>
  </p>
);

function KartuKurangBerulangQG(d: PropsLangkah) {
  return Kartu(d, 20, "k3b1g-kurangberulang", "Baca pembagiannya. Pilih pengurangan berulang yang sama dengannya.", RONDE_KURANG_QG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Tulis pengurangan berulang" teks="Kurangkan pembagi dari bilangan yang dibagi berulang kali sampai nol. Pilih kalimat dengan banyak pengurangan yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_KURANG_QG[r].map((p, i): SoalBertahap => {
          const o = opsiKurang(p, r * 2 + i);
          return {
            visual: <SoalBagiTeks p={p} />,
            tanya: "Pilih pengurangan berulang yang sama dengan pembagian ini.",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: `Belum tepat. Bilangan ${p[1]} dikurangkan dari ${p[0]} berulang kali sampai tepat nol.`,
            pesan: ketBagi(p),
          };
        })}
        onBeres={beres}
        pesanBeres="Semua pengurangan berulang sudah kamu pilih."
      />
    </>
  ));
}

function KartuHitungHasilBagiQG(d: PropsLangkah) {
  return Kartu(d, 21, "k3b1g-hitunghasilbagi", "Hitung pembagiannya. Pilih hasil yang benar dari tiga pilihan.", RONDE_HITUNG_QG.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Hitung hasil bagi" teks="Kurangkan pembagi berulang kali atau ingat perkalian. Pilih hasil bagi yang benar." />
      <PilihBertahap key={r} soal={RONDE_HITUNG_QG[r].map((p, i) => soalBagi(p, <SoalBagiTeks p={p} />, r * 2 + i, `${teksBagi(p)} = ?`))} onBeres={beres} pesanBeres="Semua hasil bagi sudah kamu pilih." />
    </>
  ));
}

function KartuPapanQG(d: PropsLangkah) {
  return Kartu(d, 22, "k3b1g-papanhasilbagi", "Hitung pembagiannya. Atur angka puluhan dan satuan hasilnya pada papan, lalu tekan Periksa.", RONDE_PAPAN_QG.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Papan hasil bagi" teks="Hitung hasil pembagian. Tulis puluhan dan satuannya pada papan." />
      <PapanDigit key={r} soal={RONDE_PAPAN_QG[r].map((p) => ({ visual: <SoalBagiTeks p={p} />, tanya: "Isi papan dengan hasil baginya.", jawab: hasilBagi(p), petunjuk: PETUNJUK_BAGI, pesan: ketBagi(p) }))} onBeres={beres} pesanBeres="Semua papan sudah terisi dengan benar." />
    </>
  ));
}

function KartuJodohKaliQG(d: PropsLangkah) {
  return Kartu(d, 23, "k3b1g-jodohkalibagi", "Ketuk satu pembagian di kiri, lalu ketuk perkalian pemeriksanya di kanan.", RONDE_PASANG_QG.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QG[r];
    const kanan = ro.map((p) => ({ id: idB(p), label: `${hasilBagi(p)} × ${p[1]}`, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan bagi dan kali" teks="Hasil bagi dikali pembagi sama dengan bilangan yang dibagi. Jodohkan pembagian dengan perkalian pemeriksanya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p) => ({ id: idB(p), label: teksBagi(p), isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p) => [idB(p), idB(p)]))}
          petunjuk={() => "Belum cocok. Perkalian pemeriksa memakai pembagi yang sama dan hasilnya sama dengan bilangan yang dibagi."}
          onBeres={beres}
          pesanBeres="Semua pembagian sudah cocok dengan perkaliannya."
        />
      </>
    );
  });
}

function KartuMemoriBagiQG(d: PropsLangkah) {
  return Kartu(d, 24, "k3b1g-memoribagiangka", "Balik dua kartu. Cari soal pembagian dan hasilnya.", RONDE_MEMORI_QG.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori pembagian dan hasil" teks="Balik dua kartu. Cari kartu soal pembagian dan kartu hasilnya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_QG[r].map((p, i) => ({ id: idB(p), a: <Numeral n={`${p[0]}:${p[1]}`} kelas="text-xl" />, labelA: `soal ${HURUF[i]}`, b: <Numeral n={hasilBagi(p)} kelas="text-3xl" />, labelB: `hasil ${hasilBagi(p)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahG(d: PropsLangkah) {
  return Kartu(d, 25, "k3b1g-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QG.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang pembagian dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QG[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifG(d: PropsLangkah) {
  return Kartu(d, 26, "k3b1g-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QG.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QG[r];
    return (
      <>
        <CatatanPensil pendek="Detektif pembagian" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`} />
      </>
    );
  });
}

function KartuPetaG(d: PropsLangkah) {
  return Kartu(d, 27, "k3b1g-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QG.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QG[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaQG(d: PropsLangkah) {
  return Kartu(d, 28, "k3b1g-ceritaangkabagi", "Baca soal cerita. Tulis kalimat pembagiannya dalam hati, lalu pilih hasil baginya.", RONDE_CERITA_QG.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QG[r].map((c, i) => soalBagi(c.p, <p className="rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-xl font-black text-[#1C01A5]">{teksBagi(c.p)} = ?</p>, r * 2 + i, c.teks));
    return (
      <>
        <CatatanPensil pendek="Soal cerita pembagian" teks="Baca soal cerita dengan teliti. Cari bilangan yang dibagi dan pembaginya, lalu pilih hasil baginya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataG(d: PropsLangkah) {
  return Kartu(d, 29, "k3b1g-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QG.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata pembagian" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QG[r].kata} pengecoh={RONDE_SUSUNKATA_QG[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuBagiBergiliranG, KartuHitungBagianG, KartuTulisKurangG, KartuJodohBagiG, KartuMemoriBagiG, KartuKetukBagiG, KartuSemuaBandingG, KartuCeritaBagiG, KartuPapanBagiG, KartuUrutBagiG].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBagiTitikG, KartuKalimatBagiG, KartuJodohTitikBagiG, KartuMemoriTitikBagiG, KartuLoncatMundurG, KartuTabelBagiG, KartuSemuaBandingTitikG, KartuPilahTitikBagiG, KartuPeriksaKaliG, KartuRakitKotakBagiG].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuKurangBerulangQG, KartuHitungHasilBagiQG, KartuPapanQG, KartuJodohKaliQG, KartuMemoriBagiQG, KartuBenarSalahG, KartuDetektifG, KartuPetaG, KartuCeritaQG, KartuSusunKataG].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B1G(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🍽️", nama: "CONCRETE", cara: "Bagikan benda ke piring!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B1G(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Bagi titik dan loncat mundur", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B1G(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Bilangan dan hasil bagi", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_G31} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB G ➡️" />}
    />
  );
}
