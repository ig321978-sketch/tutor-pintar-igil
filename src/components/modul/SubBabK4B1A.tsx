"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, Sortir, SusunKata } from "./permainan-k2b3";
import { GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, type SoalBertahap } from "./mesin-k2b6";
import { PapanEmpat, RakitEmpat, SusunEmpatKartu, TabelNilai4 } from "./mesin-k4b1";
import { KelompokKemasan4, KoleksiEmpat } from "./dasar-k4b1";
import { AngkaBerwarna, ModelDari } from "./diagram-k4b1";
import {
  HURUF, Kapital, RONDE_BACA_CA, RONDE_BACA_QA, RONDE_BENARSALAH_QA, RONDE_DETEKTIF_QA, RONDE_GARIS_PA, RONDE_HITUNG_CA, RONDE_HITUNG_PA, RONDE_KALIMAT_PA, RONDE_KETUK_CA, RONDE_KETUK_PA,
  RONDE_MEMORI_CA, RONDE_MEMORI_PA, RONDE_MEMORI_QA, RONDE_PAPAN_CA, RONDE_PAPAN_PA, RONDE_PAPAN_QA, RONDE_PASANG_CA, RONDE_PASANG_PA, RONDE_PASANG_QA, RONDE_RAKIT_CA, RONDE_SEMUA_CA,
  RONDE_SEMUA_PA, RONDE_SEMUA_QA, RONDE_SORTIR_CA, RONDE_SORTIR_PA, RONDE_SUSUN_QA, RONDE_SUSUNKATA_QA, RONDE_TABEL_PA, RONDE_TABEL_QA, RONDE_TUKAR_CA, TEKS_SYARAT,
  adaNol, cocokSyarat, kalimatTempat, kata, lambang, opsiAngka4, opsiKata4, susunOpsi, empat, urutTampil, urutanTetap,
} from "./data-k4b1";
import { buatKartu, Koleksi, Model, Numeral, namaDari, syaratBenda, wadahDari } from "./bantu-k4b1";
import { visualInfografisK4B1A } from "./infografis-k4b1";
import { SUB_A41 } from "./naskah-k4b1";

/* ------------------------------------------------------------------------ */
/* Kelas 4 Bab 1 Sub-Bab A: Bilangan dan Lambang Bilangan Cacah sampai 10.000.   */
/* Tiga puluh permainan, sepuluh per tahap.                                     */
/*  Concrete  1 Rakit  2 Hitung  3 Pilah  4 Jodohkan  5 Memori  6 Ketuk Dibaca  */
/*            7 Ketuk Semua  8 Baca Kumpulan  9 Papan  10 Tukar                  */
/*  Picture  11 Hitung Blok  12 Papan Blok  13 Tabel Blok  14 Jodohkan           */
/*           15 Memori  16 Ketuk Blok  17 Garis Bilangan  18 Ketuk Semua         */
/*           19 Pilah Nol  20 Lengkapi Kalimat                                   */
/*  Abstract 21 Susun Kartu  22 Baca  23 Tulis di Papan  24 Jodohkan  25 Memori  */
/*           26 Tabel  27 Benar Salah  28 Detektif  29 Ketuk Semua  30 Susun Kata */
/* Naskah: naskah-k4b1.ts (SUB_A41). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_A41.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const WARNA_BIN = ["#BBF7D0", "#BFDBFE", "#FECACA"];

const SUARA_INFO =
  "Ini poster ringkasan cara menyebut dan menulis bilangan sampai sepuluh ribu. Ketuk tombol suara pada tiap panel untuk mendengar penjelasannya. Belum ada soal. Permainan menunggu di tahap berikutnya.";

export function InfografisK4B1AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A41} judul="Membaca dan Menulis Bilangan sampai 10.000" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1A()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const kalimatBenda = (n: number, benda: Parameters<typeof wadahDari>[0]) => {
  const d = empat(n);
  return `${d.rb} peti, ${d.r} dus, ${d.p} ${wadahDari(benda)}, dan ${d.s} ${namaDari(benda)} lepas bernilai ${n}.`;
};

/* ------------------------------ Concrete ------------------------------ */

function KartuRakitA(d: PropsLangkah) {
  return Kartu(d, 0, "k4b1a-rakit", "Atur jumlah peti, dus, bungkus, dan benda lepas supaya nilainya sama dengan bilangan yang disebut. Lalu tekan Periksa.", RONDE_RAKIT_CA.length, "Rakit semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit kemasan" teks="Aku akan menyebut sebuah bilangan. Atur kemasannya sampai nilainya pas, lalu tekan periksa. Kalau sepuluh kemasan kecil terkumpul, mereka menyatu menjadi satu kemasan yang lebih besar." />
      <RakitEmpat
        key={r}
        soal={RONDE_RAKIT_CA[r].map(({ n, benda }) => ({
          n,
          tanya: `Rakit ${kata(n)}.`,
          nama: ["peti", "dus", wadahDari(benda), "benda lepas"] as [string, string, string, string],
          tampil: (rb, r, p, s) => <KoleksiEmpat rb={rb} r={r} p={p} s={s} benda={benda} ukuran={44} />,
          pesan: `${Kapital(kata(n))} adalah ${n}. ${kalimatBenda(n, benda)}`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu rakit."
      />
    </>
  ));
}

const soalHitungCA = (r: number): SoalBertahap[] =>
  RONDE_HITUNG_CA[r].map((s, i) => {
    const o = opsiAngka4(s.n, r * 2 + i);
    return {
      visual: <Koleksi n={s.n} benda={s.benda} ukuran={42} />,
      tanya: "Berapa nilai seluruh kumpulan ini?",
      opsi: o.map(String),
      jawab: o.indexOf(s.n),
      petunjuk: "Belum tepat. Mulailah dari peti, lalu dus, bungkus, dan benda lepas.",
      pesan: kalimatBenda(s.n, s.benda),
      angka: true,
    };
  });

function KartuHitungA(d: PropsLangkah) {
  return Kartu(d, 1, "k4b1a-hitung", "Hitung isi tiap tingkat kemasan, lalu pilih angka yang cocok.", RONDE_HITUNG_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung kemasan" teks="Peti bernilai seribu, dus seratus, bungkus sepuluh, dan benda lepas satu. Hitung tiap tingkat, lalu pilih angkanya." />
      <PilihBertahap key={r} soal={soalHitungCA(r)} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu hitung." />
    </>
  ));
}

function KartuPilahA(d: PropsLangkah) {
  return Kartu(d, 2, "k4b1a-pilah", "Seret atau ketuk setiap kelompok ke kotak ribuan, ratusan, puluhan, atau satuan.", RONDE_SORTIR_CA.length, "Pilah semua kemasannya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_CA[r];
    const nama = { rb: "peti", r: "dus", p: wadahDari(ro.benda), s: "benda lepas" } as const;
    const nilai = { rb: "ribuan", r: "ratusan", p: "puluhan", s: "satuan" } as const;
    return (
      <>
        <IgilBicara pendek="Pilah kemasan" teks="Setiap jenis kemasan punya tempat sendiri. Peti di ribuan, dus di ratusan, bungkus di puluhan, dan benda lepas di satuan." />
        <Sortir
          key={r}
          lebarItem={84}
          kolomBin={4}
          item={urutanKe(ro.item.length, r).map((i) => {
            const g = ro.item[i];
            return {
              id: `${r}-${i}`,
              label: `${g.k} ${nama[g.jenis]}`,
              isi: <KelompokKemasan4 jenis={g.jenis} k={g.k} benda={ro.benda} ukuran={26} />,
              bin: g.jenis,
              petunjuk: `Belum tepat. ${Kapital(nama[g.jenis])} berada di tempat ${nilai[g.jenis]}.`,
              ucapan: `${g.k} ${nama[g.jenis]} dimasukkan ke ${nilai[g.jenis]}.`,
            };
          })}
          bin={[
            { id: "rb", label: "Ribuan (peti)", warna: "#DDD6FE", ikon: "📦" },
            { id: "r", label: "Ratusan (dus)", warna: WARNA_BIN[0], ikon: "📦" },
            { id: "p", label: `Puluhan (${wadahDari(ro.benda)})`, warna: WARNA_BIN[1], ikon: "🧺" },
            { id: "s", label: "Satuan (benda)", warna: WARNA_BIN[2], ikon: "🔴" },
          ]}
          onBeres={beres}
          pesanBeres="Semua kemasan sudah masuk kotak nilainya."
        />
      </>
    );
  });
}

function KartuJodohKemasanA(d: PropsLangkah) {
  return Kartu(d, 3, "k4b1a-jodohkemasan", "Ketuk satu kumpulan di kiri, lalu ketuk angka yang nilainya sama di kanan.", RONDE_PASANG_CA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: String(s.n), label: String(s.n), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan kemasan dan bilangan" teks="Hitung dulu isi tiap kumpulan, dari peti sampai benda lepas. Baru cari angkanya." />
        <PasangKartu
          key={r}
          kiri={ro.map((s, i) => ({ id: String(s.n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={s.n} benda={s.benda} ukuran={26} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((s) => [String(s.n), String(s.n)]))}
          petunjuk={() => "Belum cocok. Hitung peti, dus, bungkus, lalu benda lepas."}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuMemoriKemasanA(d: PropsLangkah) {
  return Kartu(d, 4, "k4b1a-memorikemasan", "Buka dua kartu. Cari kumpulan benda dan angka yang bernilai sama.", RONDE_MEMORI_CA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori kemasan dan bilangan" teks="Buka dua kartu. Kalau kumpulan dan angkanya bernilai sama, keduanya tetap terbuka." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_CA[r].map((s, i) => ({ id: String(s.n), a: <Koleksi n={s.n} benda={s.benda} ukuran={18} />, labelA: `kumpulan ${HURUF[i]}`, b: <Numeral n={s.n} kelas="text-3xl" />, labelB: `bilangan ${s.n}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukDibacaA(d: PropsLangkah) {
  return Kartu(d, 5, "k4b1a-ketukdibaca", "Dengarkan bilangan yang disebut, lalu ketuk kumpulan yang nilainya sama.", RONDE_KETUK_CA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (
      <>
        <IgilBicara pendek="Ketuk kumpulan yang dibaca" teks="Dengarkan bilangannya baik-baik. Kumpulan yang tampak mirip bisa berbeda letak nol atau letak kemasannya." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={22} /> }))}
          soal={ro.tanya.map((n) => ({ tanya: `Ketuk kumpulan ${kata(n)}.`, jawab: String(n), petunjuk: "Belum tepat. Cek lagi jumlah di tiap tingkat, terutama tempat yang bernilai nol.", pesan: `${Kapital(kata(n))} adalah ${n}.` }))}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaBendaA(d: PropsLangkah) {
  return Kartu(d, 6, "k4b1a-semuabenda", "Pilih setiap kumpulan yang memenuhi perintah, jumlahnya bisa lebih dari satu. Setelah itu tekan Periksa.", RONDE_SEMUA_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    const benda = ro.benda ?? "kue";
    const tanya = `Ketuk semua kumpulan yang ${syaratBenda(ro.syarat, benda)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Bisa lebih dari satu yang sesuai. Setelah itu, tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return { id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={benda} ukuran={18} />, benar: cocok, penjelasan: `${kalimatBenda(n, benda)} ${cocok ? "Kumpulan ini memenuhi perintah." : "Kumpulan ini tidak memenuhi perintah."} Baca lagi perintahnya.` };
          })}
          onBeres={beres}
          pesanBeres="Semua kumpulan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

const soalBacaCA = (r: number): SoalBertahap[] =>
  RONDE_BACA_CA[r].map((s, i) => {
    const o = opsiKata4(s.n, r * 2 + i);
    return {
      visual: <Koleksi n={s.n} benda={s.benda} ukuran={42} />,
      tanya: "Bagaimana bilangan ini disebut?",
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Belum tepat. Hitung tiap tingkat dulu, dan ingat nol tidak disebut.",
      pesan: `${Kapital(kata(s.n))}. ${kalimatBenda(s.n, s.benda)}`,
    };
  });

function KartuBacaKumpulanA(d: PropsLangkah) {
  return Kartu(d, 7, "k4b1a-bacakumpulan", "Hitung isi kumpulan, lalu pilih bacaan yang tepat.", RONDE_BACA_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca kumpulan" teks="Hitung tiap tingkat kemasan. Setelah itu pilih cara menyebutnya. Tempat bernilai nol tidak disebut." />
      <PilihBertahap key={r} soal={soalBacaCA(r)} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu baca." />
    </>
  ));
}

function KartuPapanKumpulanA(d: PropsLangkah) {
  return Kartu(d, 8, "k4b1a-papankumpulan", "Hitung isi kumpulan, lalu atur angka ribuan, ratusan, puluhan, dan satuan pada papan. Tekan Periksa.", RONDE_PAPAN_CA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan dari kumpulan" teks="Peti menunjukkan angka ribuan, dus angka ratusan, bungkus angka puluhan, dan benda lepas angka satuan. Isi papan menurut kumpulan." />
      <PapanEmpat
        key={r}
        soal={RONDE_PAPAN_CA[r].map((s) => ({ visual: <Koleksi n={s.n} benda={s.benda} ukuran={42} />, tanya: "Atur papan empat tempat sesuai kumpulan.", jawab: s.n, petunjuk: "Peti untuk ribuan, dus untuk ratusan, bungkus untuk puluhan, benda lepas untuk satuan.", pesan: kalimatBenda(s.n, s.benda) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuTukarA(d: PropsLangkah) {
  return Kartu(d, 9, "k4b1a-tukar", "Baca pertanyaannya, lalu pilih penggabungan atau pembukaan kemasan yang benar.", RONDE_TUKAR_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const ro = RONDE_TUKAR_CA[r];
    const soal: SoalBertahap[] = ro.soal.map((s, i) => {
      const o = susunOpsi(s.benar, s.salah, r * 2 + i);
      return {
        visual: <span className="text-4xl font-black text-[#6D28D9]">🔄</span>,
        tanya: s.tanya,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Sepuluh benda jadi satu bungkus, sepuluh bungkus jadi satu dus, sepuluh dus jadi satu peti.",
        pesan: s.pesan,
      };
    });
    return (
      <>
        <IgilBicara pendek="Tukar kemasan" teks="Sepuluh kemasan kecil bisa digabung menjadi satu kemasan di atasnya. Pilih hasil yang tepat." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua penukaran sudah kamu pahami." />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

const soalHitungPA = (r: number): SoalBertahap[] =>
  RONDE_HITUNG_PA[r].map((n, i) => {
    const o = opsiAngka4(n, r * 2 + i);
    const d = empat(n);
    return {
      visual: <ModelDari n={n} skala={1} />,
      tanya: "Blok ini menunjukkan bilangan berapa?",
      opsi: o.map(String),
      jawab: o.indexOf(n),
      petunjuk: "Belum tepat. Mulai dari kubus ribuan, lalu lempeng, batang, dan kotak.",
      pesan: `${d.rb} ribuan, ${d.r} ratusan, ${d.p} puluhan, dan ${d.s} satuan adalah ${lambang(n)}.`,
      angka: true,
    };
  });

function KartuHitungBlokA(d: PropsLangkah) {
  return Kartu(d, 10, "k4b1a-hitungblok", "Hitung kubus ribuan, lempeng ratusan, batang puluhan, dan kotak satuan, lalu pilih angkanya.", RONDE_HITUNG_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung blok" teks="Kubus ungu bernilai seribu, lempeng hijau seratus, batang biru sepuluh, dan kotak merah satu. Hitung tiap warna." />
      <PilihBertahap key={r} soal={soalHitungPA(r)} onBeres={beres} pesanBeres="Semua blok sudah kamu hitung." />
    </>
  ));
}

function KartuPapanBlokA(d: PropsLangkah) {
  return Kartu(d, 11, "k4b1a-papanblok", "Hitung blok, lalu isi papan empat tempat. Tekan Periksa.", RONDE_PAPAN_PA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan dari blok" teks="Satu warna untuk satu tempat. Ungu ribuan, hijau ratusan, biru puluhan, merah satuan. Isi papan sesuai gambar." />
      <PapanEmpat
        key={r}
        soal={RONDE_PAPAN_PA[r].map((n) => {
          const d3 = empat(n);
          return { visual: <ModelDari n={n} skala={1} />, tanya: "Isi papan dari gambar blok.", jawab: n, petunjuk: "Hitung tiap warna blok, lalu isi tempatnya.", pesan: `${d3.rb} ribuan, ${d3.r} ratusan, ${d3.p} puluhan, dan ${d3.s} satuan adalah ${lambang(n)}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuTabelBlokA(d: PropsLangkah) {
  return Kartu(d, 12, "k4b1a-tabelblok", "Hitung blok di tiap baris, lalu ketuk sel untuk mengubah angkanya sampai tepat. Terakhir, tekan Periksa.", RONDE_TABEL_PA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Isi tabel blok" teks="Setiap baris menampilkan satu gambar blok. Ketuk sel ribuan, ratusan, puluhan, dan satuan sampai angkanya sesuai, lalu periksa." />
      <TabelNilai4
        key={r}
        mode="angka"
        baris={RONDE_TABEL_PA[r].map((n, i) => {
          const d3 = empat(n);
          return { label: <ModelDari n={n} skala={0.55} />, jawab: [d3.rb, d3.r, d3.p, d3.s] as [number, number, number, number], nama: `baris ${i + 1}` };
        })}
        onBeres={beres}
        pesanBeres="Tabel sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuJodohBlokA(d: PropsLangkah) {
  return Kartu(d, 13, "k4b1a-jodohblok", "Ketuk satu gambar blok di kiri, lalu ketuk angka yang sama di kanan.", RONDE_PASANG_PA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((n) => ({ id: String(n), label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan blok dan bilangan" teks="Hitung kubus, lempeng, batang, dan kotak pada tiap gambar, lalu cari angkanya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: String(n), label: `Gambar ${HURUF[i]}`, isi: <Model n={n} skala={0.62} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))}
          petunjuk={() => "Belum cocok. Hitung ribuan, ratusan, puluhan, lalu satuan."}
          onBeres={beres}
          pesanBeres="Semua blok sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuMemoriBlokA(d: PropsLangkah) {
  return Kartu(d, 14, "k4b1a-memoriblok", "Buka dua kartu. Cari gambar blok dan kata bilangan yang bernilai sama.", RONDE_MEMORI_PA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori blok dan kata" teks="Baca gambar blok menjadi kata bilangan, lalu cari kartu pasangannya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PA[r].map((n, i) => ({ id: String(n), a: <Model n={n} skala={0.34} />, labelA: `model ${HURUF[i]}`, b: <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kata(n)}</span>, labelB: kata(n) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukBlokA(d: PropsLangkah) {
  return Kartu(d, 15, "k4b1a-ketukblok", "Dengarkan bilangan yang disebut. Ketuk gambar blok yang bernilai sama.", RONDE_KETUK_PA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_PA[r];
    return (
      <>
        <CatatanTempel pendek="Ketuk blok yang dibaca" teks="Perhatikan gambar yang tidak punya batang atau kotak. Tempat itu bernilai nol." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Gambar ${HURUF[i]}`, isi: <Model n={n} skala={0.5} /> }))}
          soal={ro.tanya.map((n) => ({ tanya: `Ketuk gambar ${kata(n)}.`, jawab: String(n), petunjuk: "Belum tepat. Hitung kubus, lempeng, batang, dan kotak pada tiap gambar.", pesan: `${Kapital(kata(n))} adalah ${n}.` }))}
          onBeres={beres}
          pesanBeres="Semua model sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuGarisA(d: PropsLangkah) {
  return Kartu(d, 16, "k4b1a-garis", "Dengarkan bilangan yang disebut, lalu ketuk titiknya pada garis bilangan.", RONDE_GARIS_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis bilangan: ketuk bilangan" teks="Tiap titik pada garis ini berselisih sama besar. Cari titik bilangan yang disebut." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARIS_PA[r].map((s) => ({
          tanya: `Ketuk titik ${kata(s.jawab)}.`,
          dari: s.dari,
          sampai: s.sampai,
          langkah: s.langkah,
          jawab: s.jawab,
          petunjuk: `Belum tepat. Tiap titik berselisih ${s.langkah}. Cari ${s.jawab}.`,
          pesan: `${Kapital(kata(s.jawab))} adalah ${s.jawab}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu temukan pada garis."
      />
    </>
  ));
}

function KartuSemuaBlokA(d: PropsLangkah) {
  return Kartu(d, 17, "k4b1a-semuablok", "Pilih semua gambar blok yang memenuhi perintah. Bisa lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    const tanya = `Ketuk semua gambar yang ${TEKS_SYARAT[ro.syarat as Exclude<typeof ro.syarat, "lebih" | "kurang">]}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua blok" teks={`${tanya} Bisa lebih dari satu. Setelah itu, tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return { id: String(n), label: `Gambar ${HURUF[i]}`, isi: <Model n={n} skala={0.55} />, benar: cocok, penjelasan: `Gambar ini bernilai ${n}, ${cocok ? "memenuhi perintah" : "belum memenuhi perintah"}. Baca lagi perintahnya.` };
          })}
          onBeres={beres}
          pesanBeres="Semua model yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahNolA(d: PropsLangkah) {
  return Kartu(d, 18, "k4b1a-pilahnol", "Seret atau ketuk tiap gambar ke kotak: ada angka 0 atau tanpa angka 0.", RONDE_SORTIR_PA.length, "Pilah semua modelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah blok: ada nol atau tidak" teks="Tempat tanpa blok berarti angka nol. Kelompokkan tiap gambar ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={92}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
          const n = RONDE_SORTIR_PA[r][i];
          return {
            id: String(n),
            label: `Gambar ${n}`,
            isi: <Model n={n} skala={0.5} />,
            bin: adaNol(n) ? "nol" : "tanpa",
            petunjuk: adaNol(n) ? "Belum tepat. Ada tempat tanpa blok pada gambar ini, jadi ada angka 0." : "Belum tepat. Setiap tempat berisi blok pada gambar ini, jadi tidak ada angka 0.",
            ucapan: `${n} ${adaNol(n) ? "ada angka nol" : "tidak ada angka nol"}.`,
          };
        })}
        bin={[
          { id: "nol", label: "Ada angka 0", warna: "#FDE68A" },
          { id: "tanpa", label: "Tanpa angka 0", warna: "#BAE6FD" },
        ]}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuKalimatBlokA(d: PropsLangkah) {
  return Kartu(d, 19, "k4b1a-kalimatblok", "Lihat gambar blok, lalu lengkapi tiap kalimat dengan pilihan yang tepat.", RONDE_KALIMAT_PA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const n = RONDE_KALIMAT_PA[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kalimat blok" teks="Hitung blok di tiap tempat. Setelah itu, pilih angka yang tepat untuk bagian kosong." />
        <div className="flex justify-center rounded-2xl bg-white px-2 py-2">
          <ModelDari n={n} skala={1} />
        </div>
        <IsiKalimatGame key={r} kalimat={kalimatTempat(n, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuSusunKartuA(d: PropsLangkah) {
  return Kartu(d, 20, "k4b1a-susunkartu", "Baca kata bilangannya, ketuk sebuah kartu angka, lalu ketuk tempatnya di papan sampai lengkap.", RONDE_SUSUN_QA.length, "Susun semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun empat kartu" teks="Pasang tiap kartu angka pada tempatnya sampai membentuk bilangan yang disebut." />
      <SusunEmpatKartu
        key={r}
        soal={RONDE_SUSUN_QA[r].map((n) => {
          const d3 = empat(n);
          return { kartu: urutTampil([d3.rb, d3.r, d3.p, d3.s], [d3.rb, d3.r, d3.p, d3.s], r), jawab: n, tanya: `Susun kartu: ${kata(n)}.`, pesan: `${Kapital(kata(n))} ditulis ${lambang(n)}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu susun."
      />
    </>
  ));
}

const soalBacaQA = (r: number): SoalBertahap[] =>
  RONDE_BACA_QA[r].map((n, i) => {
    const o = opsiKata4(n, r * 2 + i);
    return {
      visual: <AngkaBerwarna n={n} ukuran="text-5xl" />,
      tanya: "Bagaimana bilangan ini disebut?",
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Belum tepat. Sebut ribuan, ratusan, puluhan, lalu satuan. Nol dilewati.",
      pesan: `${lambang(n)} dibaca ${kata(n)}.`,
    };
  });

function KartuBacaQA(d: PropsLangkah) {
  return Kartu(d, 21, "k4b1a-baca", "Lihat angkanya, lalu pilih cara menyebutnya yang benar.", RONDE_BACA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Baca bilangan" teks="Ungu menandai ribuan, hijau ratusan, biru puluhan, dan merah satuan. Pilih bacaan yang tepat." />
      <PilihBertahap key={r} soal={soalBacaQA(r)} onBeres={beres} pesanBeres="Semua bilangan sudah kamu baca." />
    </>
  ));
}

function KartuPapanQA(d: PropsLangkah) {
  return Kartu(d, 22, "k4b1a-papanquiz", "Baca kata bilangannya, lalu atur papan empat tempat dan tekan Periksa.", RONDE_PAPAN_QA.length, "Tulis semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Tulis lambang di papan" teks="Dengarkan kata ribu, ratus, dan puluh untuk menemukan tiap angka, lalu tulis di papan." />
      <PapanEmpat
        key={r}
        soal={RONDE_PAPAN_QA[r].map((n) => ({
          visual: <span className="block rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-base font-black text-[#1C01A5]">{Kapital(kata(n))}</span>,
          tanya: "Tulis bilangan itu pada papan.",
          jawab: n,
          petunjuk: "Cari kata ribu, ratus, dan puluh. Bagian yang tidak disebut berarti bernilai nol.",
          pesan: `${Kapital(kata(n))} ditulis ${n}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tulis."
      />
    </>
  ));
}

function KartuJodohKataA(d: PropsLangkah) {
  return Kartu(d, 23, "k4b1a-jodohkata", "Ketuk satu angka di kiri, lalu ketuk bacaannya di kanan.", RONDE_PASANG_QA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QA[r];
    const kanan = ro.map((n) => ({ id: String(n), label: kata(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan angka dan kata" teks="Pasangkan tiap angka dengan bacaannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n) => ({ id: String(n), label: String(n), isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))}
          petunjuk={() => "Belum cocok. Sebut ribuan, ratusan, puluhan, lalu satuan."}
          onBeres={beres}
          pesanBeres="Semua angka sudah cocok dengan bacaannya."
        />
      </>
    );
  });
}

function KartuMemoriKataA(d: PropsLangkah) {
  return Kartu(d, 24, "k4b1a-memorikata", "Buka dua kartu. Cari angka dan bacaan yang bernilai sama.", RONDE_MEMORI_QA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori angka dan kata" teks="Cocokkan kartu angka dengan kartu bacaannya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_QA[r].map((n, i) => ({ id: String(n), a: <Numeral n={n} kelas="text-3xl" />, labelA: `angka ${HURUF[i]}`, b: <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{kata(n)}</span>, labelB: kata(n) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelBacaA(d: PropsLangkah) {
  return Kartu(d, 25, "k4b1a-tabel", "Ketuk satu baris tabel, lalu ketuk kartu bacaannya. Satu kartu tidak dipakai.", RONDE_TABEL_QA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QA[r];
    return (
      <>
        <CatatanPensil pendek="Isi tabel cara membaca" teks="Pasangkan tiap baris dengan kartu bacaannya. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Baca lagi ${b.label}: ribuan, ratusan, puluhan, lalu satuan.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuBenarSalahA(d: PropsLangkah) {
  return Kartu(d, 26, "k4b1a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Penjelasan muncul setelah kamu menjawab.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Pertimbangkan tiap pernyataan tentang menyebut dan menulis bilangan, lalu putuskan benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifA(d: PropsLangkah) {
  return Kartu(d, 27, "k4b1a-detektif", "Baca kedua petunjuk, lalu pilih bilangan yang cocok dengan keduanya.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (
      <>
        <CatatanPensil pendek="Detektif bilangan" teks="Pakai kedua petunjuk sekaligus untuk menemukan bilangan rahasia." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(lambang), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}, dibaca ${kata(Number(nama))}.`} />
      </>
    );
  });
}

function KartuSemuaAngkaA(d: PropsLangkah) {
  return Kartu(d, 28, "k4b1a-semuaangka", "Pilih semua bilangan yang memenuhi perintah. Bisa lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_QA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_QA[r];
    const tanya = `Ketuk semua bilangan yang ${TEKS_SYARAT[ro.syarat as Exclude<typeof ro.syarat, "lebih" | "kurang">]}.`;
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang cocok" teks={`${tanya} Bisa lebih dari satu. Setelah itu, tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return { id: String(n), label: String(n), benar: cocok, penjelasan: `${n} ${cocok ? "memenuhi" : "belum memenuhi"} perintah. Lihat angka pada tempat yang ditanyakan.` };
          })}
          onBeres={beres}
          pesanBeres="Semua bilangan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSusunKataA(d: PropsLangkah) {
  return Kartu(d, 29, "k4b1a-susunkata", "Ketuk kata satu per satu sampai kalimatnya benar. Satu kata tidak dipakai.", RONDE_SUSUNKATA_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata bilangan" teks="Rangkai kata-kata menjadi kalimat yang benar. Ada satu kata pengecoh." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QA[r].kata} pengecoh={RONDE_SUSUNKATA_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuRakitA, KartuHitungA, KartuPilahA, KartuJodohKemasanA, KartuMemoriKemasanA, KartuKetukDibacaA, KartuSemuaBendaA, KartuBacaKumpulanA, KartuPapanKumpulanA, KartuTukarA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuHitungBlokA, KartuPapanBlokA, KartuTabelBlokA, KartuJodohBlokA, KartuMemoriBlokA, KartuKetukBlokA, KartuGarisA, KartuSemuaBlokA, KartuPilahNolA, KartuKalimatBlokA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSusunKartuA, KartuBacaQA, KartuPapanQA, KartuJodohKataA, KartuMemoriKataA, KartuTabelBacaA, KartuBenarSalahA, KartuDetektifA, KartuSemuaAngkaA, KartuSusunKataA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK4B1A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📦", nama: "CONCRETE", cara: "Rakit dan tukar kemasan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK4B1A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat blok dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK4B1A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A41} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A & LANJUTKAN ➡️" />}
    />
  );
}
