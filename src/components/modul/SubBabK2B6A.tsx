"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { BendaB6, NeracaBenda, Tumpukan } from "./dasar-k2b6";
import { BalokHuruf, BatangTegak, NeracaDuaBalok, NeracaRangka, TitikUkur } from "./diagram-k2b6";
import { GantunganTebak, JungkatLab, TanganAngkat, TimbangSatuan } from "./neraca-k2b6";
import {
  BuatTally, GarisAngkaGame, KetukPilih, KetukSemua, PasangKartu, PilihBertahap, SeimbangBagan, UrutKetuk,
  type SoalBertahap,
} from "./mesin-k2b6";
import {
  HURUF_PASANG, NAMA, NAMA_SATUAN, PETA_KONSEP_A, RAK_NAMA, RONDE_BACA_A, RONDE_BAGAN_A, RONDE_BANDINGANGKA_QA, RONDE_BATANG_A, RONDE_BENARSALAH_QA,
  RONDE_DETEKTIF_QA, RONDE_GANTUNGAN_A, RONDE_GARISANGKA_A, RONDE_GORESAN_A, RONDE_HITUNG_A, RONDE_HITUNG_QA, RONDE_JODOH_A, RONDE_JUNGKAT_A, RONDE_KALIMAT_QA,
  RONDE_KETUK_A, RONDE_KETUKSEMUA_QA, RONDE_PASANGNERACA_A, RONDE_RAK_A, RONDE_SORTIR_A, RONDE_SORTIRNERACA_A, RONDE_SUSUNKATA_QA, RONDE_TABEL_PA, RONDE_TABEL_QA,
  RONDE_TANGAN_A, RONDE_TIMBANG_A, RONDE_TITIK_A, RONDE_URUT_A, RONDE_URUTANGKA_QA, RONDE_URUTNERACA_A, jumlahSatuan, kalimatBalok, kalimatBenda, kalimatIsian,
  opsiAngka, opsiBandingHuruf, palingBerat, palingRingan, relBenda, relHuruf, susunOpsi, urutBerat, urutHuruf, urutTampil, urutanTetap,
  type BeratId, type Rel,
} from "./data-k2b6";
import { visualInfografisK2B6A } from "./infografis-k2b6";
import { SUB_A6 } from "./naskah-k2b6";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 6 Sub-Bab A: Berat. Tiga puluh permainan, sepuluh per tahap.    */
/*  Concrete 1 Angkat Dua Tangan  2 Jungkat-Jungkit  3 Gantungan Baju          */
/*           4 Urutkan Berat  5 Pilah  6 Timbang Satuan  7 Berapa Satuan?     */
/*           8 Paling Berat dan Ringan  9 Jodohkan Hasil Ukur  10 Keranjang    */
/*  Picture  11 Baca Neraca Balok  12 Urutan dari Neraca  13 Batang Berat       */
/*           14 Hitung Titik  15 Goresan  16 Tabel  17 Jodohkan Neraca          */
/*           18 Pilah Diagram  19 Garis Angka  20 Seimbangkan Bagan             */
/*  Abstract 21 Kalimat  22 Benar Salah  23 Susun Kalimat  24 Hitung Cerdas     */
/*           25 Tabel Kelipatan  26 Bandingkan Angka  27 Detektif  28 Peta      */
/*           29 Urutkan Angka  30 Ketuk Semua                                  */
/* Naskah: naskah-k2b6.ts (SUB_A6). Tanpa API.                                 */
/* ------------------------------------------------------------------------ */

const J = SUB_A6.games.map((g) => g.title);
const TOTAL = 10;

const SUARA_INFO =
  "Ini poster rangkuman tentang berat. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B6AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A6} judul="Berat Benda" suaraInfo={SUARA_INFO} visual={visualInfografisK2B6A()} speakGuru={speakGuru} />;
}

type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
  return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={TOTAL} isi={isi} />;
}

const item = (id: BeratId, ukuran = 38) => ({ id, label: NAMA[id], isi: <BendaB6 id={id} ukuran={ukuran} /> });
const hurufItem = (h: string, ukuran = 30) => ({ id: h, label: `Balok ${h}`, isi: <BalokHuruf huruf={h} ukuran={ukuran} /> });
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);

/* ------------------------------ Concrete ------------------------------ */

function KartuTanganA(d: PropsLangkah) {
  return Kartu(d, 0, "k2b6a-tangan", "Tekan Angkat dua-duanya. Tangan yang memegang benda lebih berat turun lebih rendah. Lalu pilih pernyataan yang tepat.", RONDE_TANGAN_A.length, "Jawab semua pasangan dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Angkat dengan dua tangan" teks="Ada tiga pasang benda. Tekan angkat dua-duanya. Rasakan tangan mana yang turun, lalu pilih benda yang lebih berat." />
      <TanganAngkat key={r} pasangan={RONDE_TANGAN_A[r]} nomorAwal={r * 3} onBeres={beres} pesanBeres="Semua pasangan sudah benar." />
    </>
  ));
}

function KartuJungkatA(d: PropsLangkah) {
  return Kartu(d, 1, "k2b6a-jungkat", "Ketuk benda, lalu ketuk piringan kiri atau kanan. Piringan yang berisi benda lebih berat akan turun. Lalu pilih benda yang lebih berat.", RONDE_JUNGKAT_A.length, "Timbang kedua benda dan jawab dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Jungkat-jungkit" teks="Taruh kedua benda di piringan jungkat-jungkit. Ketuk benda, lalu ketuk piringannya. Lihat piringan yang turun." />
      <JungkatLab key={r} a={RONDE_JUNGKAT_A[r][0]} b={RONDE_JUNGKAT_A[r][1]} nomor={r} onBeres={beres} pesanBeres="Kamu sudah menimbang dengan benar." />
    </>
  ));
}

function KartuGantunganA(d: PropsLangkah) {
  return Kartu(d, 2, "k2b6a-gantungan", "Tebak dulu benda mana yang lebih berat. Setelah kamu memilih, gantungan dilepas dan miringnya membuktikan jawabannya.", RONDE_GANTUNGAN_A.length, "Tebak dan buktikan semua pasangan dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Tebak dan buktikan" teks="Tebak dulu benda mana yang lebih berat. Setelah memilih, gantungan baju dilepas dan kita lihat buktinya." />
      <GantunganTebak key={r} pasangan={RONDE_GANTUNGAN_A[r]} nomorAwal={r * 2} onBeres={beres} pesanBeres="Tebakan dan buktinya sudah selesai." />
    </>
  ));
}

function KartuUrutA(d: PropsLangkah) {
  return Kartu(d, 3, "k2b6a-urut", "Ketuk benda satu per satu menurut urutan beratnya. Baca dulu apakah urutannya dari paling ringan atau dari paling berat.", RONDE_URUT_A.length, "Urutkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_A[r];
    const awal = ro.dari === "ringan" ? "paling ringan" : "paling berat";
    const akhir = ro.dari === "ringan" ? "paling berat" : "paling ringan";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari ${awal}`} teks={`Urutkan benda dari yang ${awal} sampai yang ${akhir}. Ketuk satu per satu.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.ids, urutBerat(ro.ids, ro.dari), r).map((id) => item(id))}
          urutan={urutBerat(ro.ids, ro.dari)}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Cari benda yang ${awal} di antara yang tersisa.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sampai yang ${akhir} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPilahA(d: PropsLangkah) {
  return Kartu(d, 4, "k2b6a-pilah", "Bandingkan tiap benda dengan benda acuan. Seret atau ketuk benda ke kotak yang tepat: lebih berat dari acuan atau lebih ringan dari acuan.", RONDE_SORTIR_A.length, "Pilah semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_A[r];
    return (
      <>
        <IgilBicara pendek={`Acuan: ${NAMA[ro.acuan]}`} teks={`Benda acuan kita adalah ${NAMA[ro.acuan]}. Pilah setiap benda: lebih berat dari ${NAMA[ro.acuan]}, atau lebih ringan dari ${NAMA[ro.acuan]}.`} />
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-1">
          <BendaB6 id={ro.acuan} ukuran={44} />
          <span className="text-sm font-black text-[#1C01A5]">Benda acuan: {NAMA[ro.acuan]}</span>
        </div>
        <Sortir
          key={r}
          item={urutanKe(ro.ids.length, r).map((i) => {
            const id = ro.ids[i];
            const rel = relBenda(id, ro.acuan);
            return {
              id,
              label: NAMA[id],
              isi: <BendaB6 id={id} ukuran={40} />,
              bin: rel === "lebih berat" ? "berat" : "ringan",
              petunjuk: `Belum tepat. ${kalimatBenda(id, ro.acuan)} Coba kotak yang lain.`,
              ucapan: kalimatBenda(id, ro.acuan),
            };
          })}
          bin={[
            { id: "berat", label: `Lebih berat dari ${NAMA[ro.acuan]}`, warna: "#FDE68A", ikon: "⬇️" },
            { id: "ringan", label: `Lebih ringan dari ${NAMA[ro.acuan]}`, warna: "#BAE6FD", ikon: "⬆️" },
          ]}
          onBeres={beres}
          pesanBeres="Semua benda sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuTimbangA(d: PropsLangkah) {
  return Kartu(d, 5, "k2b6a-timbang", "Tekan plus untuk menambah satuan di piringan kanan. Berhenti saat neraca seimbang. Hitung berapa satuan yang dipakai.", RONDE_TIMBANG_A.length, "Seimbangkan semua neracanya dulu, ya.", (r, beres) => {
    const t = RONDE_TIMBANG_A[r];
    return (
      <>
        <IgilBicara pendek={`${NAMA[t.benda]} dan ${NAMA_SATUAN[t.satuan]}`} teks={`Ukur berat ${NAMA[t.benda]} memakai ${NAMA_SATUAN[t.satuan]}. Tambah satu per satu sampai neraca seimbang.`} />
        <TimbangSatuan key={r} benda={t.benda} satuan={t.satuan} target={jumlahSatuan(t.benda, t.satuan) ?? 1} onBeres={beres} pesanBeres="Hasil pengukuranmu tepat." />
      </>
    );
  });
}

const soalHitungA = (r: number): SoalBertahap[] =>
  RONDE_HITUNG_A[r].map((t, i) => {
    const n = jumlahSatuan(t.benda, t.satuan) ?? 1;
    const o = opsiAngka(n, r * 2 + i);
    return {
      visual: <NeracaBenda miring={0} kiri={<BendaB6 id={t.benda} ukuran={46} />} kanan={<Tumpukan id={t.satuan} n={n} />} label={`Neraca seimbang. Kiri: ${NAMA[t.benda]}. Kanan: ${n} ${NAMA_SATUAN[t.satuan]}.`} />,
      tanya: `Berapa ${NAMA_SATUAN[t.satuan]} yang sama berat dengan ${NAMA[t.benda]}?`,
      opsi: o.map(String),
      jawab: o.indexOf(n),
      petunjuk: "Hitung satuan di piringan kanan satu per satu, ya.",
      pesan: `Berat 1 ${NAMA[t.benda]} sama dengan ${n} ${NAMA_SATUAN[t.satuan]}.`,
      angka: true,
    };
  });

function KartuHitungA(d: PropsLangkah) {
  return Kartu(d, 6, "k2b6a-hitung", "Neraca sudah seimbang. Hitung satuan di piringan kanan, lalu pilih angkanya.", RONDE_HITUNG_A.length, "Jawab semua gambar dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Berapa satuan?" teks="Neraca sudah seimbang. Hitung satuan di piringan kanan, lalu pilih angka yang tepat." />
      <PilihBertahap key={r} soal={soalHitungA(r)} onBeres={beres} pesanBeres="Hasil ukur sudah benar semua." />
    </>
  ));
}

function KartuPalingA(d: PropsLangkah) {
  return Kartu(d, 7, "k2b6a-paling", "Baca pertanyaan di atas gambar. Ketuk benda yang paling berat, lalu benda yang paling ringan.", RONDE_KETUK_A.length, "Temukan semua bendanya dulu, ya.", (r, beres) => {
    const ids = RONDE_KETUK_A[r];
    return (
      <>
        <IgilBicara pendek="Paling berat, paling ringan" teks="Lihat semua benda. Ketuk benda yang paling berat, lalu benda yang paling ringan. Besar belum tentu berat, jadi pikirkan baik-baik." />
        <KetukPilih
          key={r}
          item={ids.map((id) => item(id, 44))}
          kolom={ids.length >= 5 ? 3 : 2}
          soal={[
            { tanya: "Ketuk benda yang paling berat.", jawab: palingBerat(ids), petunjuk: "Belum yang paling berat. Bandingkan lagi: benda yang paling berat akan turun paling bawah.", pesan: `${NAMA[palingBerat(ids)]} paling berat.` },
            { tanya: "Ketuk benda yang paling ringan.", jawab: palingRingan(ids), petunjuk: "Belum yang paling ringan. Benda yang paling ringan akan naik paling atas.", pesan: `${NAMA[palingRingan(ids)]} paling ringan.` },
          ]}
          onBeres={beres}
          pesanBeres="Yang paling berat dan paling ringan sudah ketemu."
        />
      </>
    );
  });
}

function KartuJodohA(d: PropsLangkah) {
  return Kartu(d, 8, "k2b6a-jodoh", "Ketuk satu benda di kiri, lalu ketuk hasil ukurnya di kanan. Hasil ukur memakai satuan yang berbeda.", RONDE_JODOH_A.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_A[r];
    const kanan = ro.map((t, i) => ({ id: `h${i}`, label: `${jumlahSatuan(t.benda, t.satuan)} ${NAMA_SATUAN[t.satuan]}`, isi: <BendaB6 id={t.satuan} ukuran={32} /> }));
    return (
      <>
        <IgilBicara pendek="Jodohkan hasil ukur" teks="Setiap benda sudah ditimbang dengan satuan tidak baku. Jodohkan benda dengan hasil ukurnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((t, i) => ({ id: `b${i}`, label: NAMA[t.benda], isi: <BendaB6 id={t.benda} ukuran={38} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`b${i}`, `h${i}`]))}
          petunjuk={() => "Belum cocok. Bayangkan benda itu ditimbang dengan satuannya, lalu hitung berapa yang seimbang."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok."
        />
      </>
    );
  });
}

function KartuKeranjangA(d: PropsLangkah) {
  return Kartu(d, 9, "k2b6a-keranjang", "Ketuk belanjaan satu per satu. Taruh yang paling berat di dasar keranjang dulu, lalu yang lebih ringan di atasnya.", RONDE_RAK_A.length, "Tata semua belanjaannya dulu, ya.", (r, beres) => {
    const ids = RONDE_RAK_A[r];
    return (
      <>
        <IgilBicara pendek="Tata keranjang belanja" teks="Ibu belanja. Taruh belanjaan yang paling berat di dasar keranjang dulu, supaya yang ringan tidak tertekan." />
        <UrutKetuk
          key={r}
          tumpuk
          item={urutTampil(ids, urutBerat(ids, "berat"), r).map((id) => item(id, 40))}
          urutan={urutBerat(ids, "berat")}
          labelAwal="paling berat"
          labelAkhir="paling ringan"
          petunjuk={(i) => `${i.label} lebih ringan. Taruh yang paling berat di dasar dulu, ya.`}
          onBeres={beres}
          pesanBeres={`Keranjang sudah rapi: ${RAK_NAMA[0].toLowerCase()} paling berat, ${RAK_NAMA[2].toLowerCase()} paling ringan.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

const soalBacaA = (r: number): SoalBertahap[] =>
  RONDE_BACA_A[r].map(([ba, bb], i) => {
    const [a, b] = HURUF_PASANG[i];
    const o = opsiBandingHuruf(a, b, ba, bb, r * 3 + i);
    return {
      visual: <NeracaDuaBalok a={a} b={b} bobotA={ba} bobotB={bb} kelas="max-w-[300px]" />,
      tanya: `Bagaimana berat balok ${a} dan balok ${b}?`,
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Lihat sisi yang turun. Sisi yang turun memuat balok yang lebih berat.",
      pesan: kalimatBalok(a, relHuruf(ba, bb), b),
    };
  });

function KartuBacaA(d: PropsLangkah) {
  return Kartu(d, 10, "k2b6a-baca", "Lihat neraca balok. Sisi yang turun memuat balok yang lebih berat. Pilih pernyataan yang tepat.", RONDE_BACA_A.length, "Jawab semua neracanya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca neraca balok" teks="Lihat neraca. Sisi yang turun memuat balok yang lebih berat. Pilih pernyataan yang tepat." />
      <PilihBertahap key={r} soal={soalBacaA(r)} onBeres={beres} pesanBeres="Semua neraca sudah kamu baca dengan benar." />
    </>
  ));
}

function KartuUrutNeracaA(d: PropsLangkah) {
  return Kartu(d, 11, "k2b6a-urutneraca", "Baca semua neraca. Lalu ketuk balok berhuruf satu per satu menurut urutan beratnya.", RONDE_URUTNERACA_A.length, "Urutkan semua balok dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTNERACA_A[r];
    const huruf = Object.keys(ro.bobot);
    const awal = ro.dari === "ringan" ? "paling ringan" : "paling berat";
    const akhir = ro.dari === "ringan" ? "paling berat" : "paling ringan";
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari ${awal}`} teks={`Baca semua neraca. Lalu ketuk balok dari yang ${awal} sampai yang ${akhir}.`} />
        <div className="grid grid-cols-2 gap-2">
          {ro.diagram.map(([a, b]) => (
            <NeracaDuaBalok key={`${a}${b}`} a={a} b={b} bobotA={ro.bobot[a]} bobotB={ro.bobot[b]} ukuran={22} kelas="max-w-[170px]" />
          ))}
        </div>
        <UrutKetuk
          key={r}
          item={urutTampil(huruf, urutHuruf(ro.bobot, ro.dari), r).map((h) => hurufItem(h))}
          urutan={urutHuruf(ro.bobot, ro.dari)}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Baca lagi neraca yang memuatnya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sampai yang ${akhir} sudah benar.`}
        />
      </>
    );
  });
}

function KartuBatangA(d: PropsLangkah) {
  return Kartu(d, 12, "k2b6a-batang", "Makin tinggi batang, makin berat. Ketuk batang yang paling berat, lalu batang yang paling ringan.", RONDE_BATANG_A.length, "Temukan semua batangnya dulu, ya.", (r, beres) => {
    const b = RONDE_BATANG_A[r];
    const maks = Math.max(...b.map((x) => x.n));
    const tinggi = [...b].sort((x, y) => y.n - x.n)[0];
    const rendah = [...b].sort((x, y) => x.n - y.n)[0];
    return (
      <>
        <CatatanTempel pendek="Batang berat" teks="Makin tinggi batang, makin berat bendanya. Ketuk batang yang paling berat, lalu batang yang paling ringan." />
        <KetukPilih
          key={r}
          item={b.map((x) => ({ id: x.id, label: `Batang ${x.id}`, isi: <BatangTegak id={x.id} n={x.n} maks={maks} /> }))}
          kolom={b.length === 3 ? 3 : 4}
          soal={[
            { tanya: "Ketuk batang yang paling berat (paling tinggi).", jawab: tinggi.id, petunjuk: "Cari batang yang paling tinggi.", pesan: `Batang ${tinggi.id} paling berat.` },
            { tanya: "Ketuk batang yang paling ringan (paling rendah).", jawab: rendah.id, petunjuk: "Cari batang yang paling rendah.", pesan: `Batang ${rendah.id} paling ringan.` },
          ]}
          onBeres={beres}
          pesanBeres="Batang paling berat dan paling ringan sudah ketemu."
        />
      </>
    );
  });
}

const neracaTitik = (huruf: string, n: number, kecil = false) => (
  <NeracaRangka
    miring={0}
    kiri={<BalokHuruf huruf={huruf} ukuran={kecil ? 24 : 40} />}
    kanan={<TitikUkur n={n} ukuran={kecil ? (n > 6 ? 7 : 9) : n > 6 ? 13 : 16} />}
    label={`Neraca seimbang. Kiri: balok ${huruf}. Kanan: ${n} titik.`}
    kelas="max-w-[300px]"
  />
);

const soalTitikA = (r: number): SoalBertahap[] =>
  RONDE_TITIK_A[r].map((n, i) => {
    const huruf = ["P", "Q", "R", "S", "T", "U"][r * 2 + i];
    const o = opsiAngka(n, r * 2 + i);
    return {
      visual: neracaTitik(huruf, n),
      tanya: `Berapa titik yang sama berat dengan balok ${huruf}?`,
      opsi: o.map(String),
      jawab: o.indexOf(n),
      petunjuk: "Hitung titik di piringan kanan satu per satu.",
      pesan: `Balok ${huruf} sama berat dengan ${n} titik.`,
      angka: true,
    };
  });

function KartuTitikA(d: PropsLangkah) {
  return Kartu(d, 13, "k2b6a-titik", "Neraca sudah seimbang. Hitung titik di piringan kanan, lalu pilih angkanya.", RONDE_TITIK_A.length, "Hitung semua titiknya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung titik di neraca" teks="Neraca sudah seimbang. Hitung titik di piringan kanan, lalu pilih angka yang tepat." />
      <PilihBertahap key={r} soal={soalTitikA(r)} onBeres={beres} pesanBeres="Semua titik sudah kamu hitung dengan benar." />
    </>
  ));
}

function KartuGoresanA(d: PropsLangkah) {
  return Kartu(d, 14, "k2b6a-goresan", "Hitung titik di neraca. Lalu tekan Goresan sebanyak titik itu, dan tekan Periksa. Setiap lima goresan dikelompokkan.", RONDE_GORESAN_A.length, "Selesaikan semua goresannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Goresan titik" teks="Hitung titik di neraca. Lalu tekan goresan sebanyak titik itu, dan tekan periksa." />
      <BuatTally
        key={r}
        soal={RONDE_GORESAN_A[r].map((n, i) => {
          const huruf = ["V", "W", "X", "Y", "Z", "K"][r * 2 + i];
          return { visual: neracaTitik(huruf, n), tanya: `Balok ${huruf} sama berat dengan berapa titik? Buat goresannya.`, n, petunjuk: "Hitung lagi titik di piringan kanan.", pesan: `${n} goresan untuk ${n} titik.` };
        })}
        onBeres={beres}
        pesanBeres="Semua goresan sudah benar."
      />
    </>
  ));
}

function KartuTabelPA(d: PropsLangkah) {
  return Kartu(d, 15, "k2b6a-tabel", "Hitung titik pada tiap neraca. Ketuk baris tabel, lalu ketuk kartu angka yang tepat.", RONDE_TABEL_PA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PA[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel hasil" teks="Hitung titik pada setiap neraca. Lalu isi tabel dengan kartu angka yang tepat." />
        <div className="grid grid-cols-2 gap-2">
          {t.baris.map((b) => (
            <div key={b.label} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
              {neracaTitik(b.label.slice(-1), Number(b.jawab), true)}
            </div>
          ))}
        </div>
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `${b.label}: hitung lagi titik pada neracanya.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuJodohNeracaA(d: PropsLangkah) {
  return Kartu(d, 16, "k2b6a-jodohneraca", "Ketuk satu neraca di kiri, lalu ketuk kalimat yang cocok di kanan.", RONDE_PASANGNERACA_A.length, "Jodohkan semua neracanya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANGNERACA_A[r];
    const kanan = ro.map(([a, b, ba, bb], i) => ({ id: `k${i}`, label: kalimatBalok(a, relHuruf(ba, bb), b), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan neraca dan kalimat" teks="Lihat neraca. Sisi yang turun lebih berat. Jodohkan setiap neraca dengan kalimat yang cocok." />
        <PasangKartu
          key={r}
          kiri={ro.map(([a, b, ba, bb], i) => ({ id: `n${i}`, label: `Balok ${a} dan ${b}`, isi: <NeracaDuaBalok a={a} b={b} bobotA={ba} bobotB={bb} ukuran={20} kelas="max-w-[150px]" /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`n${i}`, `k${i}`]))}
          petunjuk={() => "Belum cocok. Lihat sisi yang turun, lalu cari kalimat yang menyebut balok itu lebih berat."}
          onBeres={beres}
          pesanBeres="Semua neraca sudah cocok dengan kalimatnya."
        />
      </>
    );
  });
}

function KartuPilahNeracaA(d: PropsLangkah) {
  return Kartu(d, 17, "k2b6a-pilahneraca", "Lihat sisi yang turun pada tiap diagram. Seret atau ketuk diagram ke kotak yang tepat.", RONDE_SORTIRNERACA_A.length, "Pilah semua diagramnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIRNERACA_A[r];
    return (
      <>
        <CatatanTempel pendek="Pilah diagram neraca" teks="Lihat sisi yang turun pada setiap diagram. Pilah diagram ke kotak kiri lebih berat, sama berat, atau kanan lebih berat." />
        <Sortir
          key={r}
          lebarItem={108}
          kolomBin={3}
          item={urutanKe(ro.length, r).map((i) => {
            const [a, b, ba, bb] = ro[i];
            const rel = relHuruf(ba, bb);
            return {
              id: `${a}${b}`,
              label: `${a} dan ${b}`,
              isi: <NeracaDuaBalok a={a} b={b} bobotA={ba} bobotB={bb} ukuran={18} kelas="max-w-[100px]" />,
              bin: rel === "lebih berat" ? "kiri" : rel === "lebih ringan" ? "kanan" : "sama",
              petunjuk: "Belum tepat. Lihat sisi yang turun, atau apakah neracanya datar.",
              ucapan: kalimatBalok(a, rel, b),
            };
          })}
          bin={[
            { id: "kiri", label: "Kiri lebih berat", warna: "#FDE68A", ikon: "↙" },
            { id: "sama", label: "Sama berat", warna: "#BBF7D0", ikon: "＝" },
            { id: "kanan", label: "Kanan lebih berat", warna: "#BAE6FD", ikon: "↘" },
          ]}
          onBeres={beres}
          pesanBeres="Semua diagram sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuGarisA(d: PropsLangkah) {
  return Kartu(d, 18, "k2b6a-garis", "Hitung titik di neraca seimbang. Lalu ketuk angka yang tepat pada garis angka.", RONDE_GARISANGKA_A.length, "Tandai semua angkanya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis angka titik" teks="Hitung titik di neraca yang seimbang. Lalu ketuk angka yang tepat pada garis angka." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARISANGKA_A[r].map((n, i) => {
          const huruf = ["C", "D", "E", "F", "G", "H", "J", "M", "N"][r * 3 + i];
          return { visual: neracaTitik(huruf, n), tanya: `Balok ${huruf} sama berat dengan berapa titik? Ketuk angkanya.`, dari: 1, sampai: 10, jawab: n, petunjuk: "Hitung lagi titik di piringan kanan.", pesan: `Balok ${huruf} sama berat dengan ${n} titik.` };
        })}
        onBeres={beres}
        pesanBeres="Semua angka sudah kamu tandai dengan benar."
      />
    </>
  ));
}

function KartuBaganA(d: PropsLangkah) {
  return Kartu(d, 19, "k2b6a-bagan", "Tekan plus untuk menambah titik di piringan kanan sampai neraca seimbang. Hitung berapa titik yang dipakai.", RONDE_BAGAN_A.length, "Seimbangkan semua neracanya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Seimbangkan bagan" teks="Tambah titik di piringan kanan satu per satu sampai neraca seimbang dengan balok di kiri." />
      <SeimbangBagan key={r} huruf={["K", "L", "M"][r]} target={RONDE_BAGAN_A[r]} onBeres={beres} pesanBeres="Bagannya sudah seimbang." />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuKalimatA(d: PropsLangkah) {
  return Kartu(d, 20, "k2b6a-kalimat", "Lengkapi tiap kalimat dengan kata yang tepat: lebih berat, lebih ringan, atau sama berat.", RONDE_KALIMAT_QA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat berat" teks="Baca kalimat. Pilih kata yang tepat untuk bagian kosong: lebih berat, lebih ringan, atau sama berat." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QA[r].map(([a, b], i) => kalimatIsian(a, b, r * 3 + i))} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuBenarSalahA(d: PropsLangkah) {
  return Kartu(d, 21, "k2b6a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuSusunA(d: PropsLangkah) {
  return Kartu(d, 22, "k2b6a-susun", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kalimat berat" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QA[r].kata} pengecoh={RONDE_SUSUNKATA_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

const soalHitungQA = (r: number): SoalBertahap[] =>
  RONDE_HITUNG_QA[r].map((s, i) => {
    const o = opsiAngka(s.jawab, r * 2 + i);
    return { tanya: s.teks, opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: s.petunjuk, pesan: `Jawabannya ${s.jawab} ${s.satuan}.`, angka: true };
  });

function KartuHitungQA(d: PropsLangkah) {
  return Kartu(d, 23, "k2b6a-hitungqa", "Baca soal cerita, lalu pilih jawabannya. Pikirkan berapa kali sama beratnya.", RONDE_HITUNG_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Hitung cerdas berat" teks="Baca soal cerita dengan teliti. Hitung dengan menjumlahkan berulang, lalu pilih jawabannya." />
      <PilihBertahap key={r} soal={soalHitungQA(r)} onBeres={beres} pesanBeres="Semua soal sudah kamu jawab dengan benar." />
    </>
  ));
}

function KartuTabelQA(d: PropsLangkah) {
  return Kartu(d, 24, "k2b6a-tabelqa", "Setiap baris naik dengan jumlah yang sama. Ketuk baris tabel, lalu ketuk kartu angka yang tepat.", RONDE_TABEL_QA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QA[r];
    return (
      <>
        <CatatanPensil pendek={t.judul} teks={`${t.judul}. Setiap baris naik dengan jumlah yang sama. Isi tabel dengan kartu angka yang tepat.`} />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `${b.label}: tambahkan jumlah yang sama seperti baris sebelumnya.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

const soalBandingAngkaQA = (r: number): SoalBertahap[] =>
  RONDE_BANDINGANGKA_QA[r].map((s, i) => {
    const rel: Rel = s.a > s.b ? "lebih berat" : s.a < s.b ? "lebih ringan" : "sama berat";
    const benar = rel === "lebih berat" ? "A lebih berat dari B" : rel === "lebih ringan" ? "B lebih berat dari A" : "A sama berat dengan B";
    const semua = ["A lebih berat dari B", "B lebih berat dari A", "A sama berat dengan B"];
    const o = susunOpsi(benar, semua.filter((x) => x !== benar) as [string, string], r * 2 + i);
    const sat = NAMA_SATUAN[s.satuan];
    return {
      tanya: `Berat benda A sama dengan ${s.a} ${sat}. Berat benda B sama dengan ${s.b} ${sat}. Bagaimana A dan B?`,
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: `Satuannya sama, yaitu ${sat}. Bandingkan angkanya: angka yang lebih besar berarti lebih berat.`,
      pesan: `${s.a > s.b ? "A" : s.a < s.b ? "B" : "A dan B"} ${rel === "sama berat" ? "sama berat" : "lebih berat"}.`,
    };
  });

function KartuBandingAngkaA(d: PropsLangkah) {
  return Kartu(d, 25, "k2b6a-banding", "Dua benda diukur dengan satuan yang sama. Bandingkan angkanya, lalu pilih pernyataan yang tepat.", RONDE_BANDINGANGKA_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Bandingkan dari angka" teks="Dua benda diukur dengan satuan yang sama. Angka yang lebih besar berarti lebih berat. Pilih pernyataan yang tepat." />
      <PilihBertahap key={r} soal={soalBandingAngkaQA(r)} onBeres={beres} pesanBeres="Semua perbandingan sudah benar." />
    </>
  ));
}

function KartuDetektifA(d: PropsLangkah) {
  return Kartu(d, 26, "k2b6a-detektif", "Baca dua petunjuk. Pilih benda yang cocok dengan kedua petunjuk.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku apa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    const opsi = s.opsi.map((id) => NAMA[id]);
    return (
      <>
        <CatatanPensil pendek="Detektif berat" teks="Baca dua petunjuk. Pilih benda yang cocok dengan kedua petunjuk." />
        <DetektifTeks
          key={r}
          soal={{
            petunjuk: s.klaim.map((k) => `Aku ${k.rel} dari ${NAMA[k.acuan]}.`),
            opsi,
            jawab: s.opsi.indexOf(s.jawab),
            salah: `Periksa kedua petunjuk satu per satu. Hanya ${NAMA[s.jawab]} yang cocok dengan keduanya.`,
          }}
          onBeres={beres}
          pesanBeres={(nama) => `Benar, aku ${nama}.`}
        />
      </>
    );
  });
}

function KartuPetaKonsepA(d: PropsLangkah) {
  return Kartu(d, 27, "k2b6a-konsep", "Lengkapi peta konsep berat. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_A.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_A[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuUrutAngkaA(d: PropsLangkah) {
  return Kartu(d, 28, "k2b6a-urutangka", "Tiap benda sudah diukur dengan satuan yang sama. Ketuk benda menurut angkanya, dari kecil atau dari besar sesuai perintah.", RONDE_URUTANGKA_QA.length, "Urutkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTANGKA_QA[r];
    const hasil = (id: BeratId) => jumlahSatuan(id, ro.satuan) ?? 0;
    const awal = ro.dari === "ringan" ? "paling ringan" : "paling berat";
    const akhir = ro.dari === "ringan" ? "paling berat" : "paling ringan";
    return (
      <>
        <CatatanPensil pendek={`Urutkan dari ${awal}`} teks={`Setiap benda sudah diukur dengan ${NAMA_SATUAN[ro.satuan]}. Ketuk benda dari yang ${awal} sampai yang ${akhir}. Angka yang lebih kecil berarti lebih ringan.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.ids, urutBerat(ro.ids, ro.dari), r).map((id) => ({ id, label: `${NAMA[id]}: ${hasil(id)} ${NAMA_SATUAN[ro.satuan]}` }))}
          urutan={urutBerat(ro.ids, ro.dari)}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Angka yang lebih kecil berarti lebih ringan, angka yang lebih besar berarti lebih berat.`}
          onBeres={beres}
          pesanBeres="Urutannya sudah benar."
        />
      </>
    );
  });
}

function KartuSemuaA(d: PropsLangkah) {
  return Kartu(d, 29, "k2b6a-semua", "Ketuk semua pernyataan yang benar. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_KETUKSEMUA_QA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_KETUKSEMUA_QA[r];
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang benar" teks={`${s.teks} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={s.teks}
          item={s.item.map((i) => ({ id: i.id, label: i.teks, benar: i.benar, penjelasan: `Pernyataan "${i.teks}" ${i.benar ? "benar" : "salah"}. Baca lagi dengan teliti.` }))}
          onBeres={beres}
          pesanBeres="Semua pernyataan yang benar sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuTanganA, KartuJungkatA, KartuGantunganA, KartuUrutA, KartuPilahA, KartuTimbangA, KartuHitungA, KartuPalingA, KartuJodohA, KartuKeranjangA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBacaA, KartuUrutNeracaA, KartuBatangA, KartuTitikA, KartuGoresanA, KartuTabelPA, KartuJodohNeracaA, KartuPilahNeracaA, KartuGarisA, KartuBaganA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuKalimatA, KartuBenarSalahA, KartuSusunA, KartuHitungQA, KartuTabelQA, KartuBandingAngkaA, KartuDetektifA, KartuPetaKonsepA, KartuUrutAngkaA, KartuSemuaA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK2B6A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Angkat, timbang, dan ukur!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B6A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B6A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A6} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
