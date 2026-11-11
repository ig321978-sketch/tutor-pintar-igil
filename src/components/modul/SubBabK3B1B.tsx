"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, LetakSlot, type SoalBertahap } from "./mesin-k2b6";
import { PapanTiga, RakitTiga, SusunTigaKartu, TabelNilai } from "./mesin-k3b1";
import { KelompokKemasan, KoleksiTiga } from "./dasar-k3b1";
import { AngkaBerwarna, ModelDari } from "./diagram-k3b1";
import {
  HURUF, Kapital, NAMA_TEMPAT, PETA_KONSEP_QB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, RONDE_GARIS_PB, RONDE_KALENG_CB, RONDE_KETUK_CB, RONDE_MEMORI_CB, RONDE_MEMORI_PB, RONDE_NILAI_CB,
  RONDE_NILAI_PB, RONDE_NILAI_QB, RONDE_PAPAN_PB, RONDE_PAPAN_QB, RONDE_PASANG_CB, RONDE_PASANG_PB, RONDE_RAKIT_CB, RONDE_SEMUA_CB, RONDE_SEMUA_PB, RONDE_SLOT_CB, RONDE_SORTIR_PB, RONDE_SUSUN_PB,
  RONDE_SUSUN_QB, RONDE_SUSUNKATA_QB, RONDE_TABEL_PB, RONDE_TABEL_QB, RONDE_TEMPAT_CB, RONDE_TEMPAT_QB, RONDE_URAI_PB, RONDE_URAI_QB, RONDE_URUT_CB, TEKS_SYARAT,
  angkaTempat, cocokSyarat, jendelaGaris, kalimatSusun, kalimatSusunUrai, kalimatUrai, kata, nilaiKelompok, nilaiTempat, susunan, tempatDari, tempatNilai, teksNilaiBenda, tiga, uraian, urutTampil, urutanTetap,
  type KelompokNilai, type Tempat,
} from "./data-k3b1";
import { buatKartu, Koleksi, Model, Numeral, namaDari, syaratBenda, wadahDari } from "./bantu-k3b1";
import { visualInfografisK3B1B } from "./infografis-k3b1";
import { SUB_B31 } from "./naskah-k3b1";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 1 Sub-Bab B: Nilai Tempat Bilangan Cacah sampai 1.000. Tiga      */
/* puluh permainan, sepuluh per tahap.                                          */
/*  Concrete  1 Tiga Kaleng  2 Nilai Kemasan  3 Jodohkan Nilai  4 Kaleng Slot    */
/*            5 Memori  6 Rakit Nilai  7 Ketuk Angka  8 Tempat Angka             */
/*            9 Ketuk Semua  10 Urutkan Nilai                                    */
/*  Picture  11 Tabel Nilai  12 Nilai Blok  13 Susun Bilangan  14 Urai Bilangan  */
/*           15 Jodohkan Uraian  16 Memori Uraian  17 Papan Uraian               */
/*           18 Garis Nilai  19 Pilah Nilai  20 Ketuk Semua                      */
/*  Abstract 21 Susun Kartu  22 Tempat Angka 8  23 Nilai Angka  24 Urai Kata     */
/*           25 Tulis dari Uraian  26 Tabel Uraian  27 Benar Salah  28 Detektif  */
/*           29 Peta Konsep  30 Susun Kata                                       */
/* Naskah: naskah-k3b1.ts (SUB_B31). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_B31.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);
const WARNA_BIN = ["#BBF7D0", "#BFDBFE", "#FECACA"];

const SUARA_INFO =
  "Ini poster rangkuman tentang nilai tempat bilangan sampai seribu. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B1BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B31} judul="Nilai Tempat" suaraInfo={SUARA_INFO} visual={visualInfografisK3B1B()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const TEMPAT_KUNCI = { r: "ratusan", p: "puluhan", s: "satuan" } as const;
const jenisKe = (t: Tempat): "r" | "p" | "s" => (t === "ratusan" ? "r" : t === "puluhan" ? "p" : "s");

/** Tiga pilihan nilai (angka, sepuluh kali, seratus kali), kunci berpindah tempat. */
function opsiNilai(n: number, tempat: Tempat, nomor: number): { opsi: string[]; jawab: number } {
  const angka = angkaTempat(n, tempat);
  const nilai = nilaiTempat(n, tempat);
  const kandidat = [angka === 0 ? 5 : angka, angka === 0 ? 50 : angka * 10, angka === 0 ? 500 : angka * 100, angka === 0 ? 7 : angka + 1];
  const salah = kandidat.filter((k) => k !== nilai).slice(0, 2);
  const semua = [nilai, salah[0], salah[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi: opsi.map(String), jawab: opsi.indexOf(nilai) };
}

/** Kelompok kemasan untuk kartu pilihan: k kemasan sejenis. */
const Kelompok = ({ g, benda, ukuran = 24 }: { g: KelompokNilai; benda: Parameters<typeof wadahDari>[0]; ukuran?: number }) => <KelompokKemasan jenis={g.jenis} k={g.k} benda={benda} ukuran={ukuran} />;
const namaKemasan = (jenis: "r" | "p" | "s", benda: Parameters<typeof wadahDari>[0]) => (jenis === "r" ? "dus" : jenis === "p" ? wadahDari(benda) : namaDari(benda));

/* ------------------------------ Concrete ------------------------------ */

function KartuKalengB(d: PropsLangkah) {
  return Kartu(d, 0, "k3b1b-kaleng", "Baca bilangannya. Ketuk kartu angka, lalu ketuk kaleng ratusan, puluhan, atau satuan. Ketuk kaleng yang terisi untuk mengambil kartunya.", RONDE_KALENG_CB.length, "Susun semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Tiga kaleng" teks="Kaleng ratusan, puluhan, dan satuan diletakkan dari kiri ke kanan. Ambil kartu, lalu susun menjadi bilangan yang dibacakan." />
      <SusunTigaKartu
        key={r}
        gaya="kaleng"
        soal={RONDE_KALENG_CB[r].map((s) => {
          const d3 = tiga(s.jawab);
          return { kartu: urutTampil([...s.kartu], [d3.r, d3.p, d3.s], r), jawab: s.jawab, tanya: `Susun kartu menjadi ${kata(s.jawab)}.`, pesan: `${Kapital(kata(s.jawab))} ditulis ${s.jawab}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua kartu sudah masuk kaleng yang tepat."
      />
    </>
  ));
}

function KartuNilaiKemasanB(d: PropsLangkah) {
  return Kartu(d, 1, "k3b1b-nilaikemasan", "Lihat kumpulan benda. Pilih berapa banyak benda pada jenis kemasan yang ditanya.", RONDE_NILAI_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_NILAI_CB[r].map((s, i) => {
      const o = opsiNilai(s.n, s.tempat, r * 2 + i);
      const a = angkaTempat(s.n, s.tempat);
      const nm = s.tempat === "puluhan" ? wadahDari(s.benda) : teksNilaiBenda(s.tempat);
      return {
        visual: <Koleksi n={s.n} benda={s.benda} ukuran={42} />,
        tanya: `Ada berapa ${namaDari(s.benda)} pada semua ${nm}?`,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Satu dus berisi 100 benda, satu bungkus berisi 10 benda, satu benda lepas berisi 1.",
        pesan: `${a} ${nm} berisi ${nilaiTempat(s.n, s.tempat)} ${namaDari(s.benda)}.`,
        angka: true,
      };
    });
    return (
      <>
        <IgilBicara pendek="Nilai satu kemasan" teks="Satu dus berisi seratus benda, satu bungkus berisi sepuluh benda, dan satu benda lepas berisi satu. Hitung benda pada jenis kemasan yang ditanya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua nilai kemasan sudah kamu hitung." />
      </>
    );
  });
}

function KartuJodohNilaiB(d: PropsLangkah) {
  return Kartu(d, 2, "k3b1b-jodohnilai", "Ketuk satu kelompok kemasan di kiri, lalu ketuk nilainya di kanan.", RONDE_PASANG_CB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.item.map((g) => ({ id: String(nilaiKelompok(g)), label: String(nilaiKelompok(g)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan kemasan dan nilai" teks="Hitung banyak kemasan pada tiap kelompok. Jodohkan dengan nilainya dalam benda." />
        <PasangKartu
          key={r}
          kiri={ro.item.map((g, i) => ({ id: String(nilaiKelompok(g)), label: `${g.k} ${namaKemasan(g.jenis, ro.benda)}`, isi: <Kelompok g={g} benda={ro.benda} ukuran={26} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.item.map((g) => [String(nilaiKelompok(g)), String(nilaiKelompok(g))]))}
          petunjuk={() => "Belum cocok. Satu dus 100, satu bungkus 10, satu benda 1. Kalikan banyak kemasannya."}
          onBeres={beres}
          pesanBeres="Semua kelompok sudah cocok dengan nilainya."
        />
      </>
    );
  });
}

function KartuKalengSlotB(d: PropsLangkah) {
  return Kartu(d, 3, "k3b1b-kalengslot", "Ketuk satu kelompok kemasan, lalu ketuk kaleng yang sesuai: ratusan, puluhan, atau satuan.", RONDE_SLOT_CB.length, "Masukkan semua kemasannya dulu, ya.", (r, beres) => {
    const ro = RONDE_SLOT_CB[r];
    const kartu = ro.item.map((g, i) => ({
      id: `k-${i}`,
      label: `${g.k} ${namaKemasan(g.jenis, ro.benda)}`,
      isi: <Kelompok g={g} benda={ro.benda} ukuran={24} />,
      slot: g.jenis,
      petunjuk: "Belum tepat. Dus masuk kaleng ratusan, bungkus masuk kaleng puluhan, benda lepas masuk kaleng satuan.",
      ucapan: `${g.k} ${namaKemasan(g.jenis, ro.benda)} masuk kaleng ${TEMPAT_KUNCI[g.jenis]}.`,
    }));
    return (
      <>
        <IgilBicara pendek="Masukkan kemasan ke kaleng" teks="Dus masuk kaleng ratusan, bungkus masuk kaleng puluhan, dan benda lepas masuk kaleng satuan." />
        <LetakSlot
          key={r}
          item={urutanKe(kartu.length, r).map((i) => kartu[i])}
          slot={[
            { id: "r", label: "Kaleng ratusan", ikon: "🥫", warna: "#BAE6FD" },
            { id: "p", label: "Kaleng puluhan", ikon: "🥫", warna: "#DDD6FE" },
            { id: "s", label: "Kaleng satuan", ikon: "🥫", warna: "#FEF08A" },
          ]}
          onBeres={beres}
          pesanBeres="Semua kemasan sudah masuk kaleng yang tepat."
        />
      </>
    );
  });
}

function KartuMemoriNilaiB(d: PropsLangkah) {
  return Kartu(d, 4, "k3b1b-memorinilai", "Balik dua kartu. Cari kelompok kemasan dan nilainya.", RONDE_MEMORI_CB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori kemasan dan nilai" teks="Balik dua kartu. Cari kartu kelompok kemasan dan kartu nilainya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_CB[r].item.map((g, i) => ({ id: String(nilaiKelompok(g)), a: <Kelompok g={g} benda={RONDE_MEMORI_CB[r].benda} ukuran={15} />, labelA: `kelompok ${HURUF[i]}`, b: <Numeral n={nilaiKelompok(g)} kelas="text-3xl" />, labelB: `nilai ${nilaiKelompok(g)}` }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuRakitNilaiB(d: PropsLangkah) {
  return Kartu(d, 5, "k3b1b-rakitnilai", "Rakit bilangan yang disusun dari ratusan, puluhan, dan satuan. Tekan Periksa.", RONDE_RAKIT_CB.length, "Rakit semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Rakit nilai" teks="Rakit kemasan sesuai penyusunan bilangan. Sepuluh benda ditukar satu bungkus, sepuluh bungkus satu dus." />
      <RakitTiga
        key={r}
        soal={RONDE_RAKIT_CB[r].map(({ n, benda }) => ({
          n,
          tanya: `Rakit ${susunan(n)}.`,
          nama: ["dus", wadahDari(benda), "benda lepas"] as [string, string, string],
          tampil: (a, b, c) => <KoleksiTiga r={a} p={b} s={c} benda={benda} ukuran={44} />,
          pesan: `${susunan(n)} sama dengan ${uraian(n)}, yaitu ${n}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu rakit."
      />
    </>
  ));
}

function KartuKetukAngkaB(d: PropsLangkah) {
  return Kartu(d, 6, "k3b1b-ketukangka", "Baca pertanyaannya. Ketuk kumpulan benda yang punya angka itu.", RONDE_KETUK_CB.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CB[r];
    return (
      <>
        <IgilBicara pendek="Ketuk kumpulan dengan angka tertentu" teks="Lihat jumlah dus, bungkus, dan benda lepas pada tiap kumpulan. Ketuk kumpulan yang cocok." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={22} /> }))}
          soal={ro.soal.map((s) => ({ tanya: `Ketuk kumpulan yang ${syaratBenda(s.syarat, ro.benda)}.`, jawab: String(s.jawab), petunjuk: "Belum tepat. Hitung dus dan bungkus pada tiap kumpulan.", pesan: `Kumpulan ${s.jawab} ${syaratBenda(s.syarat, ro.benda)}.` }))}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuTempatKumpulanB(d: PropsLangkah) {
  return Kartu(d, 7, "k3b1b-tempatkumpulan", "Lihat kumpulan benda. Pilih tempat angka 8: ratusan, puluhan, atau satuan.", RONDE_TEMPAT_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_TEMPAT_CB[r].map((s, i) => {
      const t = tempatDari(s.n, s.angka);
      const o = urutanKe(3, r * 2 + i).map((k) => NAMA_TEMPAT[k]);
      return {
        visual: <Koleksi n={s.n} benda={s.benda} ukuran={40} />,
        tanya: `Pada bilangan ${s.n}, angka ${s.angka} ada di tempat apa?`,
        opsi: [...o],
        jawab: o.indexOf(t),
        petunjuk: "Belum tepat. Hitung dus untuk ratusan, bungkus untuk puluhan, dan benda lepas untuk satuan.",
        pesan: `Pada ${s.n}, angka ${s.angka} ada di ${t}, bernilai ${nilaiTempat(s.n, t)}.`,
      };
    });
    return (
      <>
        <IgilBicara pendek="Tempat angka dalam kumpulan" teks="Cari angka delapan. Apakah ia menghitung dus, bungkus, atau benda lepas? Itu menunjukkan tempatnya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua tempat angka sudah kamu temukan." />
      </>
    );
  });
}

function KartuSemuaNilaiB(d: PropsLangkah) {
  return Kartu(d, 8, "k3b1b-semuanilai", "Ketuk semua kumpulan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    const tanya = `Ketuk semua kumpulan yang ${syaratBenda(ro.syarat, ro.benda)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua kumpulan yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokSyarat(ro.syarat, n);
            const d3 = tiga(n);
            return { id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={17} />, benar: cocok, penjelasan: `${d3.r} dus, ${d3.p} ${wadahDari(ro.benda)}, ${d3.s} benda lepas. ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua kumpulan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuUrutNilaiB(d: PropsLangkah) {
  return Kartu(d, 9, "k3b1b-urutnilai", "Hitung nilai tiap kelompok kemasan. Ketuk kelompok satu per satu menurut urutan nilainya.", RONDE_URUT_CB.length, "Urutkan semua kelompoknya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const ids = ro.item.map((_, i) => `k${i}`);
    const kunci = [...ids].sort((a, b) => {
      const va = nilaiKelompok(ro.item[ids.indexOf(a)]);
      const vb = nilaiKelompok(ro.item[ids.indexOf(b)]);
      return ro.dari === "kecil" ? va - vb : vb - va;
    });
    return (
      <>
        <IgilBicara pendek={`Urutkan nilai kemasan dari yang ${ro.dari === "kecil" ? "terkecil" : "terbesar"}`} teks="Satu dus seratus benda, satu bungkus sepuluh benda, satu benda satu. Hitung nilai tiap kelompok, lalu urutkan." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const g = ro.item[ids.indexOf(id)];
            return { id, label: `Kelompok ${HURUF[ids.indexOf(id)]}: ${g.k} ${namaKemasan(g.jenis, ro.benda)}`, isi: <Kelompok g={g} benda={ro.benda} ukuran={22} /> };
          })}
          urutan={kunci}
          labelAwal={ro.dari === "kecil" ? "terkecil" : "terbesar"}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung nilai tiap kelompok.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${ro.dari === "kecil" ? "terkecil" : "terbesar"} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuTabelNilaiB(d: PropsLangkah) {
  return Kartu(d, 10, "k3b1b-tabelnilai", "Hitung blok pada tiap baris. Ketuk sel untuk memutar nilainya sampai tepat, lalu tekan Periksa.", RONDE_TABEL_PB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Isi tabel nilai" teks="Lihat model blok. Ketuk sel untuk nilai ratusan, nilai puluhan, dan nilai satuan, misalnya dua ratus, lima puluh, dan satu." />
      <TabelNilai
        key={r}
        mode="nilai"
        kepala={["Model", "Nilai ratusan", "Nilai puluhan", "Nilai satuan"]}
        baris={RONDE_TABEL_PB[r].map((n, i) => ({ label: <ModelDari n={n} skala={0.55} />, jawab: [nilaiTempat(n, "ratusan"), nilaiTempat(n, "puluhan"), nilaiTempat(n, "satuan")] as [number, number, number], nama: `baris ${i + 1}` }))}
        onBeres={beres}
        pesanBeres="Tabel nilai sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuNilaiBlokB(d: PropsLangkah) {
  return Kartu(d, 11, "k3b1b-nilaiblok", "Lihat model blok. Pilih nilai angka pada tempat yang ditanya.", RONDE_NILAI_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_NILAI_PB[r].map((s, i) => {
      const o = opsiNilai(s.n, s.tempat, r * 2 + i);
      return {
        visual: <ModelDari n={s.n} skala={1} />,
        tanya: `Berapa nilai angka pada tempat ${s.tempat}?`,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Lempeng bernilai seratus, batang sepuluh, dan kotak satu. Kalikan dengan banyaknya.",
        pesan: `${angkaTempat(s.n, s.tempat)} ${s.tempat} bernilai ${nilaiTempat(s.n, s.tempat)}.`,
        angka: true,
      };
    });
    return (
      <>
        <CatatanTempel pendek="Nilai angka pada blok" teks="Lempeng hijau bernilai seratus, batang biru sepuluh, dan kotak merah satu. Pilih nilai pada tempat yang ditanya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua nilai angka sudah kamu temukan." />
      </>
    );
  });
}

function KartuSusunB(d: PropsLangkah) {
  return Kartu(d, 12, "k3b1b-susun", "Lihat model blok. Lengkapi tiap kalimat penyusunan bilangan dengan bilangan yang tepat.", RONDE_SUSUN_PB.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const n = RONDE_SUSUN_PB[r];
    return (
      <>
        <CatatanTempel pendek="Susun bilangan" teks="Menyusun bilangan berarti menjumlahkan ratusan, puluhan, dan satuan. Pilih bilangan yang tepat." />
        <div className="flex justify-center rounded-2xl bg-white px-2 py-2">
          <ModelDari n={n} skala={1} />
        </div>
        <IsiKalimatGame key={r} kalimat={kalimatSusun(n, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuUraiB(d: PropsLangkah) {
  return Kartu(d, 13, "k3b1b-urai", "Lihat model blok. Lengkapi uraian bilangan dengan nilai yang hilang.", RONDE_URAI_PB.length, "Lengkapi semua uraian dulu, ya.", (r, beres) => {
    const n = RONDE_URAI_PB[r];
    return (
      <>
        <CatatanTempel pendek="Urai bilangan" teks="Mengurai bilangan berarti menguraikannya menjadi ratusan, puluhan, dan satuan. Pilih nilai yang hilang." />
        <div className="flex justify-center rounded-2xl bg-white px-2 py-2">
          <ModelDari n={n} skala={1} />
        </div>
        <IsiKalimatGame key={r} kalimat={kalimatUrai(n, r)} onBeres={beres} pesanBeres="Semua uraian sudah lengkap." />
      </>
    );
  });
}

function KartuJodohUraianB(d: PropsLangkah) {
  return Kartu(d, 14, "k3b1b-jodohuraian", "Ketuk satu model blok di kiri, lalu ketuk uraiannya di kanan.", RONDE_PASANG_PB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const kanan = ro.map((n) => ({ id: String(n), label: uraian(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan blok dan uraian" teks="Hitung lempeng, batang, dan kotak. Jodohkan dengan uraian nilainya." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: String(n), label: `Model ${HURUF[i]}`, isi: <Model n={n} skala={0.62} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [String(n), String(n)]))}
          petunjuk={() => "Belum cocok. Lempeng seratus, batang sepuluh, kotak satu. Hitung nilainya."}
          onBeres={beres}
          pesanBeres="Semua model sudah cocok dengan uraiannya."
        />
      </>
    );
  });
}

function KartuMemoriUraianB(d: PropsLangkah) {
  return Kartu(d, 15, "k3b1b-memoriuraian", "Balik dua kartu. Cari model blok dan uraiannya.", RONDE_MEMORI_PB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori blok dan uraian" teks="Balik dua kartu. Cari kartu model blok dan kartu uraiannya." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PB[r].map((n, i) => ({ id: String(n), a: <Model n={n} skala={0.34} />, labelA: `model ${HURUF[i]}`, b: <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{uraian(n)}</span>, labelB: uraian(n) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuPapanUraianB(d: PropsLangkah) {
  return Kartu(d, 16, "k3b1b-papanuraian", "Baca uraiannya. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_PB.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan dari uraian" teks="Baca uraian bilangan. Tulis angka ratusan, puluhan, dan satuannya pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_PB[r].map((n) => ({
          visual: <span className="block rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-lg font-black text-[#1C01A5]">{uraian(n)}</span>,
          tanya: "Tulis bilangannya pada papan.",
          jawab: n,
          petunjuk: "Angka ratusan dari nilai ratusan dibagi seratus. Angka puluhan dari nilai puluhan dibagi sepuluh.",
          pesan: `${uraian(n)} sama dengan ${n}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tulis."
      />
    </>
  ));
}

function KartuGarisNilaiB(d: PropsLangkah) {
  return Kartu(d, 17, "k3b1b-garisnilai", "Baca bilangan dan tempat yang ditanya. Ketuk nilai angka itu pada garis bilangan.", RONDE_GARIS_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis bilangan: nilai angka" teks="Cari nilai angka pada tempat yang ditanya, lalu ketuk nilainya pada garis bilangan." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARIS_PB[r].map((s, i) => {
          const nilai = nilaiTempat(s.n, s.tempat);
          const garis = jendelaGaris(nilai, s.tempat === "ratusan" ? 100 : s.tempat === "puluhan" ? 10 : 1, r * 2 + i);
          return { tanya: `Pada ${s.n}, ketuk nilai angka di tempat ${s.tempat}.`, ...garis, jawab: nilai, petunjuk: `Belum tepat. Angka di ${s.tempat} adalah ${angkaTempat(s.n, s.tempat)}. Garis ini melompat ${garis.langkah}.`, pesan: `${angkaTempat(s.n, s.tempat)} ${s.tempat} bernilai ${nilai}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua nilai sudah kamu temukan pada garis."
      />
    </>
  ));
}

function KartuPilahNilaiB(d: PropsLangkah) {
  return Kartu(d, 18, "k3b1b-pilahnilai", "Seret atau ketuk tiap kartu nilai ke kotak: ratusan, puluhan, atau satuan.", RONDE_SORTIR_PB.length, "Pilah semua kartunya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah nilai" teks="Nilai seperti tiga ratus berasal dari tempat ratusan. Pilah tiap kartu nilai ke kotak tempatnya." />
      <Sortir
        key={r}
        lebarItem={70}
        kolomBin={3}
        kartuTeks
        item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => {
          const v = RONDE_SORTIR_PB[r][i];
          const t = tempatNilai(v);
          return { id: String(v), label: String(v), bin: jenisKe(t), petunjuk: `Belum tepat. ${v} adalah nilai dari tempat ${t}.`, ucapan: `${v} masuk ${t}.` };
        })}
        bin={[
          { id: "r", label: "Ratusan", warna: WARNA_BIN[0] },
          { id: "p", label: "Puluhan", warna: WARNA_BIN[1] },
          { id: "s", label: "Satuan", warna: WARNA_BIN[2] },
        ]}
        onBeres={beres}
        pesanBeres="Semua nilai sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuSemuaBlokNilaiB(d: PropsLangkah) {
  return Kartu(d, 19, "k3b1b-semuablok", "Ketuk semua model blok yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    const tanya = `Ketuk semua model yang ${TEKS_SYARAT[ro.syarat]}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua blok dengan nilai" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
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

/* ------------------------------ Abstract ------------------------------ */

function KartuSusunQB(d: PropsLangkah) {
  return Kartu(d, 20, "k3b1b-susunkartu", "Baca uraiannya. Ketuk kartu angka, lalu ketuk tempat ratusan, puluhan, atau satuan.", RONDE_SUSUN_QB.length, "Susun semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun tiga kartu dari uraian" teks="Baca uraian bilangan. Ketuk kartu angka, lalu ketuk tempatnya sampai menjadi bilangan yang diminta." />
      <SusunTigaKartu
        key={r}
        soal={RONDE_SUSUN_QB[r].map((n) => {
          const d3 = tiga(n);
          return { kartu: urutTampil([d3.r, d3.p, d3.s], [d3.r, d3.p, d3.s], r), jawab: n, tanya: `Susun kartu dari ${uraian(n)}.`, pesan: `${uraian(n)} sama dengan ${n}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu susun."
      />
    </>
  ));
}

function KartuTempatQB(d: PropsLangkah) {
  return Kartu(d, 21, "k3b1b-tempatangka", "Lihat bilangannya. Pilih tempat angka 8: ratusan, puluhan, atau satuan.", RONDE_TEMPAT_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_TEMPAT_QB[r].map((s, i) => {
      const t = tempatDari(s.n, s.angka);
      const o = urutanKe(3, r * 2 + i + 1).map((k) => NAMA_TEMPAT[k]);
      return {
        visual: <AngkaBerwarna n={s.n} ukuran="text-5xl" />,
        tanya: `Angka ${s.angka} pada bilangan ${s.n} ada di tempat apa?`,
        opsi: [...o],
        jawab: o.indexOf(t),
        petunjuk: "Belum tepat. Baca dari kiri: ratusan, puluhan, lalu satuan.",
        pesan: `Pada ${s.n}, angka ${s.angka} ada di ${t}, bernilai ${nilaiTempat(s.n, t)}.`,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Tempat angka 8" teks="Tentukan tempat angka delapan pada tiap bilangan. Baca dari kiri: ratusan, puluhan, satuan." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua tempat angka sudah kamu temukan." />
      </>
    );
  });
}

function KartuNilaiQB(d: PropsLangkah) {
  return Kartu(d, 22, "k3b1b-nilaiangka", "Lihat bilangannya. Pilih nilai angka pada tempat yang ditanya.", RONDE_NILAI_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_NILAI_QB[r].map((s, i) => {
      const o = opsiNilai(s.n, s.tempat, r * 2 + i + 1);
      return {
        visual: <AngkaBerwarna n={s.n} ukuran="text-5xl" />,
        tanya: `Berapa nilai angka pada tempat ${s.tempat}?`,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Kalikan angkanya dengan seratus untuk ratusan, sepuluh untuk puluhan, dan satu untuk satuan.",
        pesan: `Angka ${angkaTempat(s.n, s.tempat)} di tempat ${s.tempat} bernilai ${nilaiTempat(s.n, s.tempat)}.`,
        angka: true,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Nilai angka" teks="Angka di ratusan dikali seratus, di puluhan dikali sepuluh, dan di satuan dikali satu. Pilih nilainya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua nilai angka sudah kamu temukan." />
      </>
    );
  });
}

function KartuUraiQB(d: PropsLangkah) {
  return Kartu(d, 23, "k3b1b-uraikata", "Lengkapi uraian bilangan dengan angka yang hilang. Pilih satu dari tiga angka.", RONDE_URAI_QB.length, "Lengkapi semua uraian dulu, ya.", (r, beres) => {
    const n = RONDE_URAI_QB[r];
    return (
      <>
        <CatatanPensil pendek="Urai dengan kata" teks="Uraikan bilangan menjadi ratusan, puluhan, dan satuan. Pilih angka yang hilang." />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-lg font-black text-[#1C01A5]">{n}</p>
        <IsiKalimatGame key={r} kalimat={kalimatSusunUrai(n, r)} onBeres={beres} pesanBeres="Semua uraian sudah lengkap." />
      </>
    );
  });
}

function KartuPapanQB(d: PropsLangkah) {
  return Kartu(d, 24, "k3b1b-tulisuraian", "Baca uraiannya. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_QB.length, "Tulis semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Tulis bilangan dari uraian" teks="Baca uraian bilangan. Tulis bilangannya pada papan ratusan, puluhan, dan satuan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_QB[r].map((n) => ({
          visual: <span className="block rounded-2xl bg-[#FFF7CC] px-3 py-1.5 text-center text-xl font-black text-[#1C01A5]">{uraian(n)} = ?</span>,
          tanya: "Tulis bilangannya pada papan.",
          jawab: n,
          petunjuk: "Jumlahkan ratusan, puluhan, dan satuan, lalu tulis angka pada tempatnya.",
          pesan: `${uraian(n)} sama dengan ${n}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tulis."
      />
    </>
  ));
}

function KartuTabelUraianB(d: PropsLangkah) {
  return Kartu(d, 25, "k3b1b-tabel", "Ketuk baris tabel, lalu ketuk kartu uraiannya. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_QB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QB[r];
    return (
      <>
        <CatatanPensil pendek="Isi tabel uraian" teks="Ketuk baris tabel, lalu ketuk kartu uraian nilainya. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Uraikan ${b.label}: ratusan, puluhan, lalu satuan, masing-masing dengan nilainya.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuBenarSalahB(d: PropsLangkah) {
  return Kartu(d, 26, "k3b1b-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang nilai tempat dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifB(d: PropsLangkah) {
  return Kartu(d, 27, "k3b1b-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QB.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (
      <>
        <CatatanPensil pendek="Detektif nilai tempat" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}, yaitu ${uraian(Number(nama))}.`} />
      </>
    );
  });
}

function KartuPetaB(d: PropsLangkah) {
  return Kartu(d, 28, "k3b1b-peta", "Lengkapi peta konsep nilai tempat. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QB.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QB[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuSusunKataB(d: PropsLangkah) {
  return Kartu(d, 29, "k3b1b-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QB.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata nilai tempat" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QB[r].kata} pengecoh={RONDE_SUSUNKATA_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuKalengB, KartuNilaiKemasanB, KartuJodohNilaiB, KartuKalengSlotB, KartuMemoriNilaiB, KartuRakitNilaiB, KartuKetukAngkaB, KartuTempatKumpulanB, KartuSemuaNilaiB, KartuUrutNilaiB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuTabelNilaiB, KartuNilaiBlokB, KartuSusunB, KartuUraiB, KartuJodohUraianB, KartuMemoriUraianB, KartuPapanUraianB, KartuGarisNilaiB, KartuPilahNilaiB, KartuSemuaBlokNilaiB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSusunQB, KartuTempatQB, KartuNilaiQB, KartuUraiQB, KartuPapanQB, KartuTabelUraianB, KartuBenarSalahB, KartuDetektifB, KartuPetaB, KartuSusunKataB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B1B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🥫", nama: "CONCRETE", cara: "Kaleng, kartu, dan kemasan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B1B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat blok dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B1B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B31} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
