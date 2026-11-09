"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PutarSudut, type SoalPutarMesin } from "./mesin-k3b4";
import { BendaSudutSvg, IrisanPizza } from "./dasar-k3b4b";
import { BusurSvg, SudutSvg } from "./diagram-k3b4b";
import {
  BENDA_SIKU, HURUF, NAMA_BENDA_SUDUT, PETA_KONSEP_QB, RONDE_BENARSALAH_QB, RONDE_BUSUR_PB, RONDE_CERITA_QB, RONDE_DETEKTIF_QB, RONDE_GAMBAR_PB, RONDE_IRISAN_CB, RONDE_JENIS_CB, RONDE_JENIS_PB, RONDE_JENIS_QB,
  RONDE_JODOH_CB, RONDE_JODOH_PB, RONDE_JODOH_QB, RONDE_KALIMAT_QB, RONDE_MEMORI_CB, RONDE_MEMORI_PB, RONDE_MEMORI_QB, RONDE_NAMA_PB, RONDE_NAMA_QB, RONDE_PILAH_PB, RONDE_SEMUA_CB, RONDE_SEMUA_PB, RONDE_SIKUBENDA_CB,
  RONDE_SIKU_CB, RONDE_STRIP_CB, RONDE_SUSUNKATA_QB, RONDE_TABEL_PB, RONDE_TERBUKA_CB, RONDE_URUT_CB, RONDE_URUT_PB, banyakIrisan, idSudut, jenisSudut, kapital, labelSudut, namaSudut, opsiAngka, opsiBusur, opsiCeritaSudut,
  opsiJenisSudut, opsiNamaSudut, pesanNamaSudut, pesanPutar, susunOpsi, tanyaNamaSudut, tanyaPutar, teksDerajat, urutTampil, urutanTetap,
  type SoalBendaSudut, type SoalPutar,
} from "./data-k3b4";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B4B } from "./infografis-k3b4";
import { SUB_B34 } from "./naskah-k3b4";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 4 Sub-Bab B: Sudut pada Bidang Datar. Tiga puluh permainan,        */
/* sepuluh per tahap.                                                            */
/*  Concrete  1 Strip Sudut  2 Kertas Lipat  3 Paling Terbuka  4 Jenis pada Benda  */
/*            5 Jodohkan  6 Memori  7 Ketuk Semua  8 Hitung Siku-siku  9 Urutkan   */
/*            10 Irisan Pizza                                                     */
/*  Picture  11 Busur Derajat  12 Jenis dari Gambar  13 Jodohkan  14 Memori        */
/*           15 Tabel  16 Ketuk Semua  17 Pilah  18 Urutkan  19 Nama Sudut          */
/*           20 Gambar Sudut                                                      */
/*  Abstract 21 Nama  22 Kalimat  23 Jenis  24 Jodohkan  25 Memori  26 Benar Salah  */
/*           27 Detektif  28 Peta  29 Cerita  30 Susun Kata                        */
/* Naskah: naskah-k3b4.ts (SUB_B34). Tanpa API.                                   */
/* ------------------------------------------------------------------------ */

const J = SUB_B34.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang sudut pada bidang datar. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B4BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B34} judul="Sudut pada Bidang Datar" suaraInfo={SUARA_INFO} visual={visualInfografisK3B4B()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const PETUNJUK_JENIS = "Belum tepat. Bandingkan dengan sudut siku-siku (90°) dan sudut lurus (180°). Lebih kecil dari 90° lancip, lebih dari 90° tumpul, dan lebih dari 180° refleks.";
const PETUNJUK_BANDING = "Belum tepat. Bandingkan dengan pojok kertas lipat yang tepat 90°. Lihat mana yang lebih sempit dan mana yang lebih lebar.";

/** Lebar tetap untuk gambar di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[300px]">{children}</div>;
const Emoji = ({ e, kelas = "text-4xl" }: { e: string; kelas?: string }) => (
  <span className={`flex shrink-0 justify-center leading-none ${kelas}`} aria-hidden="true">
    {e}
  </span>
);

const BIN_SUDUT = [
  { id: "lancip", label: "Lancip", warna: "#BBF7D0" },
  { id: "siku-siku", label: "Siku-siku", warna: "#FDE68A" },
  { id: "tumpul", label: "Tumpul", warna: "#BFDBFE" },
];

const keMesin = (tampilan: "strip" | "busur", langkah: number, maks: number) => (s: SoalPutar): SoalPutarMesin => ({
  ...s,
  tampilan,
  tanya: tanyaPutar(s),
  langkah,
  maks,
  pesan: pesanPutar(s),
});

const kataBenda = (s: SoalBendaSudut) => NAMA_BENDA_SUDUT[s.benda];

/* ------------------------------ Concrete ------------------------------ */

function KartuStripB(d: PropsLangkah) {
  return Kartu(d, 0, "k3b4b-strip", "Putar strip karton dengan tombol atau penggeser sampai sudutnya lebih besar atau lebih kecil dari garis putus, lalu tekan Periksa.", RONDE_STRIP_CB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Putar strip sudut" teks="Dua strip karton digabung dengan pengait. Putar satu strip. Makin jauh diputar, makin besar sudutnya. Bandingkan dengan garis putus, lalu tekan periksa." />
      <PutarSudut key={r} soal={RONDE_STRIP_CB[r].map(keMesin("strip", 15, 180))} onBeres={beres} pesanBeres="Semua strip sudah kamu putar dengan tepat." />
    </>
  ));
}

function KartuSikuB(d: PropsLangkah) {
  return Kartu(d, 1, "k3b4b-siku", "Putar strip sampai pas dengan pojok kertas lipat, atau sampai kedua strip membentuk garis lurus, lalu tekan Periksa.", RONDE_SIKU_CB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Bentuk sudut siku-siku" teks="Pojok kertas yang dilipat dua kali adalah sudut siku-siku. Putar strip sampai pas dengan pojok kertas. Dua sudut siku-siku membentuk sudut lurus." />
      <PutarSudut key={r} soal={RONDE_SIKU_CB[r].map(keMesin("strip", 15, 180))} onBeres={beres} pesanBeres="Semua sudut sudah kamu bentuk dengan tepat." />
    </>
  ));
}

function KartuTerbukaB(d: PropsLangkah) {
  return Kartu(d, 2, "k3b4b-terbuka", "Lihat tiga benda yang dibuka. Ketuk benda yang paling lebar atau paling sempit bukaannya.", RONDE_TERBUKA_CB.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_TERBUKA_CB[r];
    const nama = NAMA_BENDA_SUDUT[ro.benda];
    return (
      <>
        <IgilBicara pendek="Mana yang paling terbuka" teks="Makin lebar benda dibuka, makin besar sudutnya. Bandingkan ketiga benda, lalu ketuk yang ditanyakan." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.degs.map((deg, i) => ({ id: `d${deg}`, label: `${kapital(nama)} ${HURUF[i]}`, isi: <Lebar w={92}><BendaSudutSvg benda={ro.benda} deg={deg} /></Lebar> }))}
          soal={ro.tanya.map((t) => {
            const deg = t === "lebar" ? Math.max(...ro.degs) : Math.min(...ro.degs);
            const i = ro.degs.indexOf(deg);
            return {
              tanya: `Ketuk ${nama} yang paling ${t} bukaannya.`,
              jawab: `d${deg}`,
              petunjuk: "Belum tepat. Bandingkan lebar bukaan ketiga benda. Bukaan lebar berarti sudutnya besar.",
              pesan: `${kapital(nama)} ${HURUF[i]} paling ${t} bukaannya, jadi sudutnya paling ${t === "lebar" ? "besar" : "kecil"}.`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua benda sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuJenisBendaB(d: PropsLangkah) {
  return Kartu(d, 3, "k3b4b-jenisbenda", "Lihat benda yang dibuka. Pilih jenis sudut yang dibentuknya.", RONDE_JENIS_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Jenis sudut pada benda" teks="Bandingkan bukaan benda dengan sudut siku-siku. Lebih sempit lancip, tepat sama siku-siku, lebih lebar tumpul. Pilih jenis sudutnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_JENIS_CB[r].map((s, i): SoalBertahap => {
          const j = jenisSudut(s.deg);
          const o = opsiJenisSudut(j, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <BendaSudutSvg benda={s.benda} deg={s.deg} />
              </Penuh>
            ),
            tanya: `Sudut pada ${kataBenda(s)} yang dibuka ini adalah ...`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: PETUNJUK_BANDING,
            pesan: `${kapital(kataBenda(s))} yang dibuka seperti itu membentuk ${namaSudut(j)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jenis sudut sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJodohBendaB(d: PropsLangkah) {
  return Kartu(d, 4, "k3b4b-jodohbenda", "Ketuk satu benda di kiri, lalu ketuk jenis sudutnya di kanan.", RONDE_JODOH_CB.length, "Jodohkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CB[r];
    const kanan = ro.map((s) => ({ id: `j-${jenisSudut(s.deg)}`, label: labelSudut(jenisSudut(s.deg)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan jenis sudut" teks="Lihat bukaan tiap benda. Jodohkan benda dengan jenis sudutnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((s) => ({ id: idSudut(s), label: kapital(kataBenda(s)), isi: <Lebar w={112}><BendaSudutSvg benda={s.benda} deg={s.deg} /></Lebar> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((s) => [idSudut(s), `j-${jenisSudut(s.deg)}`]))}
          petunjuk={() => PETUNJUK_BANDING}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan jenis sudutnya."
        />
      </>
    );
  });
}

function KartuMemoriBendaB(d: PropsLangkah) {
  return Kartu(d, 5, "k3b4b-memoribenda", "Balik dua kartu. Cari benda dan jenis sudutnya.", RONDE_MEMORI_CB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori benda dan jenis sudut" teks="Balik dua kartu. Cari kartu benda dan kartu jenis sudutnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CB[r].map((s) => ({
          id: idSudut(s),
          a: <Lebar w={96}><BendaSudutSvg benda={s.benda} deg={s.deg} /></Lebar>,
          labelA: `${kapital(kataBenda(s))} yang dibuka`,
          b: <Numeral n={labelSudut(jenisSudut(s.deg))} kelas="text-base" />,
          labelB: labelSudut(jenisSudut(s.deg)),
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuSemuaBendaB(d: PropsLangkah) {
  return Kartu(d, 6, "k3b4b-semuabenda", "Ketuk semua benda yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CB[r];
    const tanya = `Ketuk semua benda yang membentuk ${namaSudut(ro.jenis)}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((s, i) => {
            const cocok = jenisSudut(s.deg) === ro.jenis;
            return {
              id: idSudut(s),
              label: `${kapital(kataBenda(s))} ${HURUF[i]}`,
              isi: <Lebar w={110}><BendaSudutSvg benda={s.benda} deg={s.deg} /></Lebar>,
              benar: cocok,
              penjelasan: `${kapital(kataBenda(s))} ${HURUF[i]} membentuk ${namaSudut(jenisSudut(s.deg))}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua benda yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSikuBendaB(d: PropsLangkah) {
  return Kartu(d, 7, "k3b4b-sikubenda", "Lihat benda sehari-hari. Hitung banyak sudut siku-siku pada benda itu.", RONDE_SIKUBENDA_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung sudut siku-siku" teks="Periksa tiap pojok benda dengan pojok kertas lipat. Hanya pojok yang tepat sembilan puluh derajat yang dihitung sebagai sudut siku-siku." />
      <PilihBertahap
        key={r}
        soal={RONDE_SIKUBENDA_CB[r].map((id, i): SoalBertahap => {
          const b = BENDA_SIKU[id];
          const o = opsiAngka(b.siku, r * 2 + i);
          return {
            visual: <Emoji e={b.emoji} kelas="text-7xl" />,
            tanya: `Berapa sudut siku-siku pada ${b.nama}?`,
            opsi: o.map(String),
            jawab: o.indexOf(b.siku),
            petunjuk: "Belum tepat. Periksa tiap pojok dengan pojok kertas lipat. Pojok yang membulat atau runcing bukan sudut siku-siku.",
            pesan: b.siku === 0 ? `${kapital(b.nama)} tidak punya sudut siku-siku.` : `${kapital(b.nama)} memiliki ${b.siku} sudut siku-siku.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua sudut siku-siku sudah kamu hitung."
      />
    </>
  ));
}

function KartuUrutBukaanB(d: PropsLangkah) {
  return Kartu(d, 8, "k3b4b-urutbukaan", "Lihat bukaan tiap benda. Ketuk benda satu per satu dari yang paling sempit atau paling lebar bukaannya.", RONDE_URUT_CB.length, "Urutkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const nama = NAMA_BENDA_SUDUT[ro.benda];
    const ids = ro.degs.map((deg) => `d${deg}`);
    const kunci = [...ro.degs].sort((x, y) => (ro.dari === "kecil" ? x - y : y - x)).map((deg) => `d${deg}`);
    const awal = ro.dari === "kecil" ? "paling sempit" : "paling lebar";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal}`} teks="Bandingkan bukaan ketiga benda. Lalu urutkan benda menurut besar bukaannya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = ids.indexOf(id);
            return { id, label: `${kapital(nama)} ${HURUF[i]}`, isi: <Lebar w={112}><BendaSudutSvg benda={ro.benda} deg={ro.degs[i]} /></Lebar> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "paling lebar" : "paling sempit"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Bandingkan lebar bukaannya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuIrisanB(d: PropsLangkah) {
  return Kartu(d, 9, "k3b4b-irisan", "Hitung banyak irisan pizza yang menutupi sudut AOB, lalu pilih jawabannya.", RONDE_IRISAN_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ukur dengan irisan pizza" teks="Satuan sudut tidak baku adalah irisan pizza. Hitung banyak irisan yang menutupi sudut AOB. Irisan yang lebih kecil memberi bilangan yang lebih besar." />
      <PilihBertahap
        key={r}
        soal={RONDE_IRISAN_CB[r].map((s, i): SoalBertahap => {
          const n = banyakIrisan(s);
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <IrisanPizza deg={s.deg} satuan={s.satuan} />
              </Penuh>
            ),
            tanya: "Berapa irisan yang menutupi sudut AOB?",
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: "Belum tepat. Hitung irisan satu per satu mulai dari kaki OA sampai kaki OB.",
            pesan: `Sudut AOB ditutupi ${n} irisan, jadi ukurannya ${n} satuan sudut.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua irisan sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Picture ------------------------------ */

function KartuBusurB(d: PropsLangkah) {
  return Kartu(d, 10, "k3b4b-busur", "Lihat busur derajat dan dua kaki sudut. Baca ukuran sudut AOB, lalu pilih jawabannya.", RONDE_BUSUR_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca busur derajat" teks="Kaki OA ada di garis nol. Bila OA di kanan, baca skala luar. Bila OA di kiri, baca skala dalam. Baca angka yang dilewati kaki OB." />
      <PilihBertahap
        key={r}
        soal={RONDE_BUSUR_PB[r].map((s, i): SoalBertahap => {
          const o = opsiBusur(s.deg, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <BusurSvg deg={s.deg} kiri={s.kiri} />
              </Penuh>
            ),
            tanya: "Berapa ukuran sudut AOB?",
            opsi: o.map(teksDerajat),
            jawab: o.indexOf(s.deg),
            petunjuk: s.kiri
              ? "Belum tepat. Kaki OA ada di kiri, jadi baca skala dalam yang dimulai dari 0 di kiri."
              : "Belum tepat. Kaki OA ada di kanan, jadi baca skala luar yang dimulai dari 0 di kanan.",
            pesan: `Ukuran ∠AOB = ${s.deg}°.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua ukuran sudut sudah kamu baca."
      />
    </>
  ));
}

function KartuJenisGambarB(d: PropsLangkah) {
  return Kartu(d, 11, "k3b4b-jenisgambar", "Lihat gambar sudut. Pilih jenisnya: lancip, siku-siku, tumpul, lurus, atau refleks.", RONDE_JENIS_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilih jenis sudut" teks="Bandingkan sudut dengan sudut siku-siku. Tanda kotak berarti sudut siku-siku. Pilih jenis yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_JENIS_PB[r].map((deg, i): SoalBertahap => {
          const j = jenisSudut(deg);
          const o = opsiJenisSudut(j, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <SudutSvg deg={deg} huruf={["A", "O", "B"]} />
              </Penuh>
            ),
            tanya: "Sudut AOB adalah ...",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: PETUNJUK_JENIS,
            pesan: `Sudut AOB adalah ${namaSudut(j)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jenis sudut sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJodohGambarB(d: PropsLangkah) {
  return Kartu(d, 12, "k3b4b-jodohgambar", "Ketuk satu gambar sudut di kiri, lalu ketuk jenisnya di kanan.", RONDE_JODOH_PB.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PB[r];
    const kanan = ro.map((deg) => ({ id: `j-${jenisSudut(deg)}`, label: labelSudut(jenisSudut(deg)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan sudut dan jenisnya" teks="Bandingkan tiap sudut dengan sudut siku-siku. Jodohkan gambar sudut dengan jenisnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((deg, i) => ({ id: `g${i}`, label: `Sudut ${HURUF[i]}`, isi: <Lebar w={112}><SudutSvg deg={deg} ringkas /></Lebar> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((deg, i) => [`g${i}`, `j-${jenisSudut(deg)}`]))}
          petunjuk={() => PETUNJUK_JENIS}
          onBeres={beres}
          pesanBeres="Semua sudut sudah cocok dengan jenisnya."
        />
      </>
    );
  });
}

function KartuMemoriGambarB(d: PropsLangkah) {
  return Kartu(d, 13, "k3b4b-memorigambar", "Balik dua kartu. Cari gambar sudut dan jenisnya.", RONDE_MEMORI_PB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori gambar sudut dan jenisnya" teks="Balik dua kartu. Cari kartu gambar sudut dan kartu jenisnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PB[r].map((deg, i) => ({
          id: `j-${jenisSudut(deg)}`,
          a: <Lebar w={104}><SudutSvg deg={deg} ringkas /></Lebar>,
          labelA: `gambar sudut ${HURUF[i]}`,
          b: <Numeral n={labelSudut(jenisSudut(deg))} kelas="text-base" />,
          labelB: labelSudut(jenisSudut(deg)),
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuTabelSudutB(d: PropsLangkah) {
  return Kartu(d, 14, "k3b4b-tabelsudut", "Ketuk baris tabel, lalu ketuk kartu jenis sudut yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PB[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel jenis sudut" teks="Ketuk baris tabel, lalu ketuk kartu jenis sudut yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Belum tepat. Bandingkan ${b.label} dengan 90° dan 180°.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuSemuaSudutB(d: PropsLangkah) {
  return Kartu(d, 15, "k3b4b-semuasudut", "Ketuk semua gambar sudut yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PB[r];
    const tanya = `Ketuk semua ${namaSudut(ro.jenis)}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.degs.map((deg, i) => {
            const cocok = jenisSudut(deg) === ro.jenis;
            return {
              id: `s${i}`,
              label: `Sudut ${HURUF[i]}`,
              isi: <Lebar w={112}><SudutSvg deg={deg} ringkas /></Lebar>,
              benar: cocok,
              penjelasan: `Sudut ${HURUF[i]} adalah ${namaSudut(jenisSudut(deg))}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua sudut yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahSudutB(d: PropsLangkah) {
  return Kartu(d, 16, "k3b4b-pilahsudut", "Seret atau ketuk tiap gambar sudut ke kotak: lancip, siku-siku, atau tumpul.", RONDE_PILAH_PB.length, "Pilah semua gambarnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah sudut" teks="Sudut lancip kurang dari 90°, siku-siku tepat 90°, dan tumpul lebih dari 90°. Pilah tiap gambar ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={100}
        kolomBin={3}
        item={urutanKe(RONDE_PILAH_PB[r].length, r).map((i) => {
          const deg = RONDE_PILAH_PB[r][i];
          const j = jenisSudut(deg);
          return {
            id: `s${i}`,
            label: `Sudut ${HURUF[i]}`,
            isi: <SudutSvg deg={deg} ringkas />,
            bin: j,
            petunjuk: `Belum tepat. Sudut ${HURUF[i]} adalah ${namaSudut(j)}.`,
            ucapan: `Sudut ${HURUF[i]} adalah ${namaSudut(j)}.`,
          };
        })}
        bin={BIN_SUDUT}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuUrutSudutB(d: PropsLangkah) {
  return Kartu(d, 17, "k3b4b-urutsudut", "Bandingkan ketiga sudut. Ketuk sudut satu per satu dari yang terkecil atau terbesar.", RONDE_URUT_PB.length, "Urutkan semua sudutnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_PB[r];
    const ids = ro.degs.map((deg) => `d${deg}`);
    const kunci = [...ro.degs].sort((x, y) => (ro.dari === "kecil" ? x - y : y - x)).map((deg) => `d${deg}`);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari yang ${awal}`} teks="Bandingkan ukuran ketiga sudut. Makin lebar bukaannya, makin besar sudutnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = ids.indexOf(id);
            return { id, label: `Sudut ${HURUF[i]}`, isi: <Lebar w={112}><SudutSvg deg={ro.degs[i]} ringkas /></Lebar> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Bandingkan lebar bukaan sudut.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuNamaSudutB(d: PropsLangkah) {
  return Kartu(d, 18, "k3b4b-namasudut", "Lihat sudut berhuruf. Pilih titik sudut, nama sudut, atau kaki sudut yang tepat.", RONDE_NAMA_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Titik sudut, kaki, dan nama" teks="Titik sudut adalah titik pertemuan kedua kaki. Nama sudut ditulis dengan titik sudut di tengah." />
      <PilihBertahap
        key={r}
        soal={RONDE_NAMA_PB[r].map((s, i): SoalBertahap => {
          const o = opsiNamaSudut(s, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <SudutSvg deg={s.deg} huruf={s.huruf} />
              </Penuh>
            ),
            tanya: tanyaNamaSudut(s),
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Titik sudut ada di tengah nama sudut, dan kedua kaki sudut berpangkal di titik sudut itu.",
            pesan: pesanNamaSudut(s),
          };
        })}
        onBeres={beres}
        pesanBeres="Semua nama bagian sudut sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuGambarSudutB(d: PropsLangkah) {
  return Kartu(d, 19, "k3b4b-gambarsudut", "Putar kaki OB dengan tombol atau penggeser sampai tepat di ukuran yang diminta, lalu tekan Periksa.", RONDE_GAMBAR_PB.length, "Gambar semua sudutnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Gambar sudut dengan busur derajat" teks="Kaki OA ada di garis nol. Putar kaki OB sampai tepat di ukuran yang diminta. Baca angka pada skala luar." />
      <PutarSudut
        key={r}
        soal={RONDE_GAMBAR_PB[r].map(
          (target): SoalPutarMesin => ({
            syarat: "sama",
            target,
            awal: target <= 90 ? 0 : 180,
            tampilan: "busur",
            tanya: `Gambarlah sudut ${target}°. Putar kaki OB sampai tepat di ${target}°.`,
            langkah: 5,
            maks: 180,
            pesan: `Kaki OB tepat di ${target}°, jadi ∠AOB = ${target}°.`,
          }),
        )}
        onBeres={beres}
        pesanBeres="Semua sudut sudah kamu gambar dengan tepat."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuNamaTeksB(d: PropsLangkah) {
  return Kartu(d, 20, "k3b4b-namateks", "Baca uraian. Pilih nama bagian sudut, alat ukur, atau satuan yang tepat.", RONDE_NAMA_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Nama bagian sudut dan alatnya" teks="Baca uraian dengan teliti. Pilih nama yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_NAMA_QB[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Ingat: titik sudut adalah titik pertemuan, kaki sudut adalah sinarnya, busur derajat mengukur, dan satuannya derajat.", pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua nama sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuKalimatSudutB(d: PropsLangkah) {
  return Kartu(d, 21, "k3b4b-kalimatsudut", "Lengkapi tiap kalimat tentang sudut dengan kata atau ukuran yang tepat.", RONDE_KALIMAT_QB.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat sudut" teks="Baca tiap kalimat tentang sudut. Pilih kata atau ukuran yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QB[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuJenisUkuranB(d: PropsLangkah) {
  return Kartu(d, 22, "k3b4b-jenisukuran", "Baca ukuran sudut. Pilih jenis sudutnya dengan membandingkan 90° dan 180°.", RONDE_JENIS_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Jenis sudut dari ukurannya" teks="Bandingkan ukuran sudut dengan sembilan puluh derajat dan seratus delapan puluh derajat. Pilih jenis sudut yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_JENIS_QB[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: PETUNJUK_JENIS, pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua jenis sudut sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJodohUkuranSudutB(d: PropsLangkah) {
  return Kartu(d, 23, "k3b4b-jodohukuran", "Ketuk satu ukuran di kiri, lalu ketuk jenis sudutnya di kanan.", RONDE_JODOH_QB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QB[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan ukuran dan jenis sudut" teks="Bandingkan tiap ukuran dengan sembilan puluh derajat dan seratus delapan puluh derajat. Jodohkan ukuran dengan jenis sudutnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => PETUNJUK_JENIS}
          onBeres={beres}
          pesanBeres="Semua ukuran sudah cocok dengan jenis sudutnya."
        />
      </>
    );
  });
}

function KartuMemoriUkuranSudutB(d: PropsLangkah) {
  return Kartu(d, 24, "k3b4b-memoriukuran", "Balik dua kartu. Cari ukuran sudut dan jenisnya.", RONDE_MEMORI_QB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori ukuran dan jenis sudut" teks="Balik dua kartu. Cari kartu ukuran sudut dan kartu jenisnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QB[r].map((p, i) => ({ id: `m${i}`, a: <Numeral n={p.a} kelas="text-2xl" />, labelA: p.a, b: <Numeral n={p.b} kelas="text-base" />, labelB: p.b }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahSudutB(d: PropsLangkah) {
  return Kartu(d, 25, "k3b4b-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang sudut dan derajat dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifSudutB(d: PropsLangkah) {
  return Kartu(d, 26, "k3b4b-detektif", "Baca semua petunjuk. Pilih ukuran sudut yang cocok dengan semuanya.", RONDE_DETEKTIF_QB.length, "Tebak dulu aku sudut berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (
      <>
        <CatatanPensil pendek="Detektif ukuran sudut" teks="Baca semua petunjuk dengan teliti. Pilih ukuran sudut yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(teksDerajat), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku sudut ${n}.`} />
      </>
    );
  });
}

function KartuPetaSudutB(d: PropsLangkah) {
  return Kartu(d, 27, "k3b4b-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QB.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QB[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaSudutB(d: PropsLangkah) {
  return Kartu(d, 28, "k3b4b-ceritasudut", "Baca soal cerita. Hitung ukuran sudutnya, lalu pilih jawabannya.", RONDE_CERITA_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QB[r].map((c, i) => {
      const o = opsiCeritaSudut(c, r * 2 + i);
      return { tanya: c.teks, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Ingat sudut lurus 180° dan satu putaran penuh 360°. Jumlahkan atau kurangkan dengan teliti.", pesan: c.pesan };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita ukuran sudut" teks="Baca soal cerita dengan teliti. Gunakan sudut lurus seratus delapan puluh derajat dan satu putaran penuh tiga ratus enam puluh derajat." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataSudutB(d: PropsLangkah) {
  return Kartu(d, 29, "k3b4b-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QB.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata tentang sudut" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QB[r].kata} pengecoh={RONDE_SUSUNKATA_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuStripB, KartuSikuB, KartuTerbukaB, KartuJenisBendaB, KartuJodohBendaB, KartuMemoriBendaB, KartuSemuaBendaB, KartuSikuBendaB, KartuUrutBukaanB, KartuIrisanB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBusurB, KartuJenisGambarB, KartuJodohGambarB, KartuMemoriGambarB, KartuTabelSudutB, KartuSemuaSudutB, KartuPilahSudutB, KartuUrutSudutB, KartuNamaSudutB, KartuGambarSudutB].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuNamaTeksB, KartuKalimatSudutB, KartuJenisUkuranB, KartuJodohUkuranSudutB, KartuMemoriUkuranSudutB, KartuBenarSalahSudutB, KartuDetektifSudutB, KartuPetaSudutB, KartuCeritaSudutB, KartuSusunKataSudutB].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "📎", nama: "CONCRETE", cara: "Putar strip dan lihat benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B4B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat sudut dan busur derajat", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B4B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Derajat dan jenis sudut", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B34} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
