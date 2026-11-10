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
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);
const WARNA_BIN = ["#BBF7D0", "#BFDBFE", "#FECACA"];

const SUARA_INFO =
  "Ini poster rangkuman tentang membaca dan menulis bilangan sampai sepuluh ribu. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK4B1AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A41} judul="Membaca dan Menulis Bilangan sampai 10.000" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1A()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const kalimatBenda = (n: number, benda: Parameters<typeof wadahDari>[0]) => {
  const d = empat(n);
  return `${d.r} dus, ${d.p} ${wadahDari(benda)}, dan ${d.s} ${namaDari(benda)} lepas adalah ${n}.`;
};

/* ------------------------------ Concrete ------------------------------ */

function KartuRakitA(d: PropsLangkah) {
  return Kartu(d, 0, "k4b1a-rakit", "Tekan tambah atau kurang pada dus, bungkus, dan benda lepas sampai sama dengan bilangan yang dibaca. Tekan Periksa.", RONDE_RAKIT_CA.length, "Rakit semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit kemasan" teks="Sepuluh benda ditukar menjadi satu bungkus, dan sepuluh bungkus ditukar menjadi satu dus. Rakit bilangan yang dibacakan, lalu tekan periksa." />
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
      tanya: "Ada berapa semuanya?",
      opsi: o.map(String),
      jawab: o.indexOf(s.n),
      petunjuk: "Belum tepat. Hitung peti untuk ribuan, dus untuk ratusan, bungkus untuk puluhan, lalu benda lepas untuk satuan.",
      pesan: kalimatBenda(s.n, s.benda),
      angka: true,
    };
  });

function KartuHitungA(d: PropsLangkah) {
  return Kartu(d, 1, "k4b1a-hitung", "Hitung peti, dus, bungkus, dan benda lepas, lalu pilih bilangannya.", RONDE_HITUNG_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung kemasan" teks="Satu peti adalah satu ribuan, satu dus adalah satu ratusan, satu bungkus adalah satu puluhan, dan satu benda adalah satu satuan. Hitung ketiganya." />
      <PilihBertahap key={r} soal={soalHitungCA(r)} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu hitung." />
    </>
  ));
}

function KartuPilahA(d: PropsLangkah) {
  return Kartu(d, 2, "k4b1a-pilah", "Seret atau ketuk tiap kelompok kemasan ke kotak nilainya: ratusan, puluhan, atau satuan.", RONDE_SORTIR_CA.length, "Pilah semua kemasannya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_CA[r];
    const nama = { rb: "peti", r: "dus", p: wadahDari(ro.benda), s: "benda lepas" } as const;
    const nilai = { rb: "ribuan", r: "ratusan", p: "puluhan", s: "satuan" } as const;
    return (
      <>
        <IgilBicara pendek="Pilah kemasan" teks="Peti adalah ribuan, dus adalah ratusan, bungkus adalah puluhan, dan benda lepas adalah satuan. Pilah tiap kelompok ke kotak nilainya." />
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
              petunjuk: `Belum tepat. ${Kapital(nama[g.jenis])} adalah ${nilai[g.jenis]}.`,
              ucapan: `${g.k} ${nama[g.jenis]} masuk ${nilai[g.jenis]}.`,
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
  return Kartu(d, 3, "k4b1a-jodohkemasan", "Ketuk satu kumpulan di kiri, lalu ketuk lambang bilangan yang sama di kanan.", RONDE_PASANG_CA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.map((s) => ({ id: String(s.n), label: String(s.n), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan kemasan dan bilangan" teks="Hitung peti, dus, bungkus, dan benda lepas pada tiap kumpulan. Jodohkan dengan lambang bilangannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((s, i) => ({ id: String(s.n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={s.n} benda={s.benda} ukuran={26} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((s) => [String(s.n), String(s.n)]))}
          petunjuk={() => "Belum cocok. Hitung dus, bungkus, lalu benda lepas."}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuMemoriKemasanA(d: PropsLangkah) {
  return Kartu(d, 4, "k4b1a-memorikemasan", "Balik dua kartu. Cari kumpulan benda dan lambang bilangan yang sama.", RONDE_MEMORI_CA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori kemasan dan bilangan" teks="Balik dua kartu. Cari kartu kumpulan benda dan kartu lambang bilangan yang sama." />
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
  return Kartu(d, 5, "k4b1a-ketukdibaca", "Dengarkan kata bilangannya. Ketuk kumpulan benda yang bilangannya sama.", RONDE_KETUK_CA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CA[r];
    return (
      <>
        <IgilBicara pendek="Ketuk kumpulan yang dibaca" teks="Baca kata bilangan dengan teliti. Perhatikan angka nol dan letak dus, bungkus, dan benda lepas." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={22} /> }))}
          soal={ro.tanya.map((n) => ({ tanya: `Ketuk kumpulan ${kata(n)}.`, jawab: String(n), petunjuk: "Belum tepat. Perhatikan angka nol dan letak ribuan, ratusan, puluhan, serta satuan.", pesan: `${Kapital(kata(n))} adalah ${n}.` }))}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaBendaA(d: PropsLangkah) {
  return Kartu(d, 6, "k4b1a-semuabenda", "Ketuk semua kumpulan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CA[r];
    const benda = ro.benda ?? "kue";
    const tanya = `Ketuk semua kumpulan yang ${syaratBenda(ro.syarat, benda)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return { id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={benda} ukuran={18} />, benar: cocok, penjelasan: `${kalimatBenda(n, benda)} ${cocok ? "Ini cocok." : "Ini belum cocok."} Baca lagi perintahnya.` };
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
      tanya: "Bagaimana cara membacanya?",
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Belum tepat. Hitung dulu ribuan, ratusan, puluhan, dan satuannya. Angka nol tidak dibaca.",
      pesan: `${Kapital(kata(s.n))}. ${kalimatBenda(s.n, s.benda)}`,
    };
  });

function KartuBacaKumpulanA(d: PropsLangkah) {
  return Kartu(d, 7, "k4b1a-bacakumpulan", "Hitung kumpulan benda, lalu pilih cara membacanya yang benar.", RONDE_BACA_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca kumpulan" teks="Hitung peti, dus, bungkus, dan benda lepas. Lalu pilih cara membacanya. Ingat, angka nol tidak dibaca." />
      <PilihBertahap key={r} soal={soalBacaCA(r)} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu baca." />
    </>
  ));
}

function KartuPapanKumpulanA(d: PropsLangkah) {
  return Kartu(d, 8, "k4b1a-papankumpulan", "Hitung peti, dus, bungkus, dan benda lepas. Atur angka ribuan, ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan dari kumpulan" teks="Peti untuk ribuan, dus untuk ratusan, bungkus untuk puluhan, dan benda lepas untuk satuan. Isi papan sesuai kumpulan." />
      <PapanEmpat
        key={r}
        soal={RONDE_PAPAN_CA[r].map((s) => ({ visual: <Koleksi n={s.n} benda={s.benda} ukuran={42} />, tanya: "Isi papan ribuan, ratusan, puluhan, dan satuan.", jawab: s.n, petunjuk: "Hitung dus untuk ratusan, bungkus untuk puluhan, benda lepas untuk satuan.", pesan: kalimatBenda(s.n, s.benda) }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuTukarA(d: PropsLangkah) {
  return Kartu(d, 9, "k4b1a-tukar", "Baca pertanyaannya, lihat gambar kemasan, lalu pilih jawaban yang benar.", RONDE_TUKAR_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const ro = RONDE_TUKAR_CA[r];
    const soal: SoalBertahap[] = ro.soal.map((s, i) => {
      const o = susunOpsi(s.benar, s.salah, r * 2 + i);
      return {
        visual: <span className="text-4xl font-black text-[#6D28D9]">🔄</span>,
        tanya: s.tanya,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Ingat: sepuluh benda satu bungkus, sepuluh bungkus satu dus, sepuluh dus satu peti.",
        pesan: s.pesan,
      };
    });
    return (
      <>
        <IgilBicara pendek="Tukar kemasan" teks="Sepuluh benda satu bungkus, sepuluh bungkus satu dus, sepuluh dus satu peti. Pilih hasil penukaran yang benar." />
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
      tanya: "Bilangan berapa yang ditunjukkan blok ini?",
      opsi: o.map(String),
      jawab: o.indexOf(n),
      petunjuk: "Belum tepat. Hitung lempeng ratusan, batang puluhan, lalu kotak satuan.",
      pesan: `${d.rb} ribuan, ${d.r} ratusan, ${d.p} puluhan, dan ${d.s} satuan adalah ${lambang(n)}.`,
      angka: true,
    };
  });

function KartuHitungBlokA(d: PropsLangkah) {
  return Kartu(d, 10, "k4b1a-hitungblok", "Hitung lempeng ratusan, batang puluhan, dan kotak satuan, lalu pilih bilangannya.", RONDE_HITUNG_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung blok" teks="Kubus ungu adalah ribuan, lempeng hijau ratusan, batang biru puluhan, dan kotak merah satuan. Hitung ketiganya." />
      <PilihBertahap key={r} soal={soalHitungPA(r)} onBeres={beres} pesanBeres="Semua blok sudah kamu hitung." />
    </>
  ));
}

function KartuPapanBlokA(d: PropsLangkah) {
  return Kartu(d, 11, "k4b1a-papanblok", "Hitung blok, lalu atur angka ribuan, ratusan, puluhan, dan satuan pada papan. Tekan Periksa.", RONDE_PAPAN_PA.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan dari blok" teks="Isilah papan nilai tempat sesuai gambar blok. Lempeng hijau ratusan, batang biru puluhan, kotak merah satuan." />
      <PapanEmpat
        key={r}
        soal={RONDE_PAPAN_PA[r].map((n) => {
          const d3 = empat(n);
          return { visual: <ModelDari n={n} skala={1} />, tanya: "Isi papan dari model blok.", jawab: n, petunjuk: "Hitung lempeng ratusan, batang puluhan, dan kotak satuan.", pesan: `${d3.rb} ribuan, ${d3.r} ratusan, ${d3.p} puluhan, dan ${d3.s} satuan adalah ${lambang(n)}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuTabelBlokA(d: PropsLangkah) {
  return Kartu(d, 12, "k4b1a-tabelblok", "Hitung blok pada tiap baris. Ketuk sel untuk memutar angkanya sampai tepat, lalu tekan Periksa.", RONDE_TABEL_PA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Isi tabel blok" teks="Lihat model blok di tiap baris. Ketuk sel ribuan, ratusan, puluhan, dan satuan sampai angkanya cocok, lalu tekan periksa." />
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
  return Kartu(d, 13, "k4b1a-jodohblok", "Ketuk satu model blok di kiri, lalu ketuk lambang bilangan yang sama di kanan.", RONDE_PASANG_PA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((n) => ({ id: String(n), label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan blok dan bilangan" teks="Hitung lempeng, batang, dan kotak pada tiap model. Jodohkan dengan lambang bilangannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: String(n), label: `Model ${HURUF[i]}`, isi: <Model n={n} skala={0.62} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))}
          petunjuk={() => "Belum cocok. Hitung ratusan, puluhan, lalu satuan."}
          onBeres={beres}
          pesanBeres="Semua blok sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuMemoriBlokA(d: PropsLangkah) {
  return Kartu(d, 14, "k4b1a-memoriblok", "Balik dua kartu. Cari model blok dan kata bilangan yang sama.", RONDE_MEMORI_PA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori blok dan kata" teks="Balik dua kartu. Cari kartu model blok dan kartu kata bilangan yang sama." />
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
  return Kartu(d, 15, "k4b1a-ketukblok", "Dengarkan kata bilangannya. Ketuk model blok yang bilangannya sama.", RONDE_KETUK_PA.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_PA[r];
    return (
      <>
        <CatatanTempel pendek="Ketuk blok yang dibaca" teks="Baca kata bilangan dengan teliti. Perhatikan model yang tidak punya batang atau kotak." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Model ${HURUF[i]}`, isi: <Model n={n} skala={0.5} /> }))}
          soal={ro.tanya.map((n) => ({ tanya: `Ketuk model ${kata(n)}.`, jawab: String(n), petunjuk: "Belum tepat. Hitung lempeng, batang, dan kotak pada tiap model.", pesan: `${Kapital(kata(n))} adalah ${n}.` }))}
          onBeres={beres}
          pesanBeres="Semua model sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuGarisA(d: PropsLangkah) {
  return Kartu(d, 16, "k4b1a-garis", "Dengarkan kata bilangannya. Ketuk bilangan itu pada garis bilangan.", RONDE_GARIS_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis bilangan: ketuk bilangan" teks="Garis bilangan ini melompat seratus atau sepuluh. Ketuk bilangan yang dibacakan." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARIS_PA[r].map((s) => ({
          tanya: `Ketuk bilangan ${kata(s.jawab)}.`,
          dari: s.dari,
          sampai: s.sampai,
          langkah: s.langkah,
          jawab: s.jawab,
          petunjuk: `Belum tepat. Garis ini melompat ${s.langkah}. Cari ${s.jawab}.`,
          pesan: `${Kapital(kata(s.jawab))} adalah ${s.jawab}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu temukan pada garis."
      />
    </>
  ));
}

function KartuSemuaBlokA(d: PropsLangkah) {
  return Kartu(d, 17, "k4b1a-semuablok", "Ketuk semua model blok yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PA[r];
    const tanya = `Ketuk semua model yang ${TEKS_SYARAT[ro.syarat as Exclude<typeof ro.syarat, "lebih" | "kurang">]}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua blok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return { id: String(n), label: `Model ${HURUF[i]}`, isi: <Model n={n} skala={0.55} />, benar: cocok, penjelasan: `Model ini menunjukkan ${n}, ${cocok ? "cocok dengan perintah" : "belum cocok dengan perintah"}. Baca lagi perintahnya.` };
          })}
          onBeres={beres}
          pesanBeres="Semua model yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahNolA(d: PropsLangkah) {
  return Kartu(d, 18, "k4b1a-pilahnol", "Seret atau ketuk tiap model ke kotak: ada angka 0 atau tanpa angka 0.", RONDE_SORTIR_PA.length, "Pilah semua modelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah blok: ada nol atau tidak" teks="Angka nol berarti tidak ada batang atau kotak di tempat itu. Pilah tiap model ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={92}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
          const n = RONDE_SORTIR_PA[r][i];
          return {
            id: String(n),
            label: `Model ${n}`,
            isi: <Model n={n} skala={0.5} />,
            bin: adaNol(n) ? "nol" : "tanpa",
            petunjuk: adaNol(n) ? "Belum tepat. Ada tempat yang kosong pada model ini, jadi ada angka 0." : "Belum tepat. Semua tempat terisi pada model ini, jadi tidak ada angka 0.",
            ucapan: `${n} ${adaNol(n) ? "ada angka nol" : "tidak ada angka nol"}.`,
          };
        })}
        bin={[
          { id: "nol", label: "Ada angka 0", warna: "#FDE68A" },
          { id: "tanpa", label: "Tanpa angka 0", warna: "#BAE6FD" },
        ]}
        onBeres={beres}
        pesanBeres="Semua model sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuKalimatBlokA(d: PropsLangkah) {
  return Kartu(d, 19, "k4b1a-kalimatblok", "Lihat model blok. Lengkapi tiap kalimat dengan angka yang tepat.", RONDE_KALIMAT_PA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const n = RONDE_KALIMAT_PA[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kalimat blok" teks="Hitung lempeng ratusan, batang puluhan, dan kotak satuan. Lalu pilih angka yang tepat untuk bagian kosong." />
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
  return Kartu(d, 20, "k4b1a-susunkartu", "Baca kata bilangannya. Ketuk kartu angka, lalu ketuk tempat ribuan, ratusan, puluhan, atau satuan.", RONDE_SUSUN_QA.length, "Susun semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun empat kartu" teks="Baca kata bilangan. Ketuk kartu angka, lalu ketuk tempatnya sampai menjadi lambang bilangan." />
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
      tanya: "Bagaimana cara membacanya?",
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Belum tepat. Baca ribuan, ratusan, puluhan, lalu satuan. Angka nol tidak dibaca.",
      pesan: `${lambang(n)} dibaca ${kata(n)}.`,
    };
  });

function KartuBacaQA(d: PropsLangkah) {
  return Kartu(d, 21, "k4b1a-baca", "Lihat lambang bilangan, lalu pilih cara membacanya yang benar.", RONDE_BACA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Baca bilangan" teks="Lihat lambang bilangan. Ungu ribuan, hijau ratusan, biru puluhan, merah satuan. Pilih cara membacanya." />
      <PilihBertahap key={r} soal={soalBacaQA(r)} onBeres={beres} pesanBeres="Semua bilangan sudah kamu baca." />
    </>
  ));
}

function KartuPapanQA(d: PropsLangkah) {
  return Kartu(d, 22, "k4b1a-papanquiz", "Baca kata bilangannya. Atur angka ribuan, ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_QA.length, "Tulis semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Tulis lambang di papan" teks="Baca kata bilangan. Cari angka ribuan, ratusan, puluhan, dan satuan, lalu tulis pada papan." />
      <PapanEmpat
        key={r}
        soal={RONDE_PAPAN_QA[r].map((n) => ({
          visual: <span className="block rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-base font-black text-[#1C01A5]">{Kapital(kata(n))}</span>,
          tanya: "Tulis lambang bilangannya pada papan.",
          jawab: n,
          petunjuk: "Dengarkan kata ratus, kata puluh, dan sisanya satuan. Bila tidak ada kata puluh, puluhannya nol.",
          pesan: `${Kapital(kata(n))} ditulis ${n}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tulis."
      />
    </>
  ));
}

function KartuJodohKataA(d: PropsLangkah) {
  return Kartu(d, 23, "k4b1a-jodohkata", "Ketuk satu lambang bilangan di kiri, lalu ketuk cara membacanya di kanan.", RONDE_PASANG_QA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QA[r];
    const kanan = ro.map((n) => ({ id: String(n), label: kata(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan angka dan kata" teks="Pasangkan lambang bilangan dengan cara membacanya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n) => ({ id: String(n), label: String(n), isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))}
          petunjuk={() => "Belum cocok. Baca ribuan, ratusan, puluhan, lalu satuan."}
          onBeres={beres}
          pesanBeres="Semua lambang sudah cocok dengan bacaannya."
        />
      </>
    );
  });
}

function KartuMemoriKataA(d: PropsLangkah) {
  return Kartu(d, 24, "k4b1a-memorikata", "Balik dua kartu. Cari lambang bilangan dan kata bilangan yang sama.", RONDE_MEMORI_QA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori angka dan kata" teks="Balik dua kartu. Cari kartu lambang bilangan dan kartu kata bilangan yang sama." />
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
  return Kartu(d, 25, "k4b1a-tabel", "Ketuk baris tabel, lalu ketuk kartu cara membacanya. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_QA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QA[r];
    return (
      <>
        <CatatanPensil pendek="Isi tabel cara membaca" teks="Ketuk baris tabel, lalu ketuk kartu cara membacanya. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Baca lagi ${b.label}: ratusan, puluhan, lalu satuan.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuBenarSalahA(d: PropsLangkah) {
  return Kartu(d, 26, "k4b1a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang membaca dan menulis bilangan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifA(d: PropsLangkah) {
  return Kartu(d, 27, "k4b1a-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    return (
      <>
        <CatatanPensil pendek="Detektif bilangan" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(lambang), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}, dibaca ${kata(Number(nama))}.`} />
      </>
    );
  });
}

function KartuSemuaAngkaA(d: PropsLangkah) {
  return Kartu(d, 28, "k4b1a-semuaangka", "Ketuk semua bilangan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_QA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_QA[r];
    const tanya = `Ketuk semua bilangan yang ${TEKS_SYARAT[ro.syarat as Exclude<typeof ro.syarat, "lebih" | "kurang">]}.`;
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n) => {
            const cocok = cocokSyarat(ro.syarat, n);
            return { id: String(n), label: String(n), benar: cocok, penjelasan: `${n} ${cocok ? "cocok" : "belum cocok"} dengan perintah. Lihat angka pada tempat yang ditanya.` };
          })}
          onBeres={beres}
          pesanBeres="Semua bilangan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSusunKataA(d: PropsLangkah) {
  return Kartu(d, 29, "k4b1a-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata bilangan" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
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
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSusunKartuA, KartuBacaQA, KartuPapanQA, KartuJodohKataA, KartuMemoriKataA, KartuTabelBacaA, KartuBenarSalahA, KartuDetektifA, KartuSemuaAngkaA, KartuSusunKataA].map((K, i) => ({
  nomor: i + 21,
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
