"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanTiga } from "./mesin-k3b1";
import { TimbanganDigital, TimbanganDuduk } from "./dasar-k3b3cd";
import { JarumTimbangan, LayarTimbangan } from "./diagram-k3b3cd";
import {
  BENDA_BERAT, HURUF, NAMA_TIMBANGAN, PETA_KONSEP_QC, RONDE_BACA_CC, RONDE_BACA_JARUM_CC, RONDE_BENARSALAH_QC, RONDE_CERITA_QC, RONDE_DETEKTIF_QC, RONDE_JARUM_PC, RONDE_JODOH_CC, RONDE_JODOH_PC,
  RONDE_JODOH_QC, RONDE_KALIMAT_QC, RONDE_KETUK_CC, RONDE_LANGKAH_PC, RONDE_LAYAR_PC, RONDE_MEMORI_CC, RONDE_MEMORI_PC, RONDE_MEMORI_QC, RONDE_PAPAN_CC, RONDE_PAPAN_PC, RONDE_PILAH_PC, RONDE_SATUAN_QC,
  RONDE_SELISIH_PC, RONDE_SEMUA_CC, RONDE_SEMUA_PC, RONDE_SIAP_CC, RONDE_SIAP_PC, RONDE_SUSUNKATA_QC, RONDE_TIMBANGAN_CC, RONDE_TIMBANGAN_QC, RONDE_URUT_CC, cocokBanding, idBerat, jawabCerita, opsiAngka,
  opsiBerat500, opsiCeritaG, opsiGram, susunOpsi, teksGram, teksKgG, titik, urutTampil, urutanTetap, type JenisTimbangan,
} from "./data-k3b3";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B3C } from "./infografis-k3b3";
import { SUB_C33 } from "./naskah-k3b3";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 3 Sub-Bab C: Pengukuran Berat dengan Satuan Baku. Tiga puluh      */
/* permainan, sepuluh per tahap.                                                */
/*  Concrete  1 Baca Digital  2 Siap  3 Baca Jarum  4 Pilih Timbangan            */
/*            5 Jodohkan  6 Memori  7 Ketuk Timbangan  8 Ketuk Satuan  9 Papan   */
/*            10 Urutkan                                                         */
/*  Picture  11 Jarum Kilogram  12 Layar  13 Jodohkan  14 Memori  15 Jarum Siap   */
/*           16 Pilah Satuan  17 Ketuk Lebih Kurang  18 Langkah  19 Papan         */
/*           20 Selisih                                                          */
/*  Abstract 21 Satuan  22 Timbangan  23 Kalimat  24 Jodohkan  25 Memori          */
/*           26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata       */
/* Naskah: naskah-k3b3.ts (SUB_C33). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_C33.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang pengukuran berat dengan satuan baku. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B3CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C33} judul="Pengukuran Berat dengan Satuan Baku" suaraInfo={SUARA_INFO} visual={visualInfografisK3B3C()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);
const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const PETUNJUK_LAYAR = "Belum tepat. Baca angka pada layar timbangan, lalu tulis dengan satuan gram.";
const PETUNJUK_JARUM = "Belum tepat. Lihat angka yang ditunjuk jarum. Garis besar menunjukkan satu kilogram, garis sedang lima ratus gram.";
const soalGram = (gram: number, visual: React.ReactNode, nomor: number, tanya: string, benda: string): SoalBertahap => {
  const o = opsiGram(gram, nomor);
  return { visual, tanya, opsi: o.map(teksGram), jawab: o.indexOf(gram), petunjuk: PETUNJUK_LAYAR, pesan: `Layar timbangan untuk ${benda} menunjukkan ${teksGram(gram)}.` };
};

/** Lebar tetap untuk gambar di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[340px]">{children}</div>;
const Emoji = ({ e, kelas = "text-4xl" }: { e: string; kelas?: string }) => (
  <span className={`flex shrink-0 justify-center leading-none ${kelas}`} aria-hidden="true">
    {e}
  </span>
);

const BIN_SATUAN = [
  { id: "gram", label: "Gram (g)", warna: "#BBF7D0" },
  { id: "kilogram", label: "Kilogram (kg)", warna: "#FDE68A" },
];

/* ------------------------------ Concrete ------------------------------ */

function KartuBacaDigitalC(d: PropsLangkah) {
  return Kartu(d, 0, "k3b3c-bacadigital", "Lihat benda di atas timbangan digital. Baca angka pada layar, lalu pilih beratnya dalam gram.", RONDE_BACA_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca timbangan digital" teks="Benda diletakkan di atas timbangan digital. Baca angka yang muncul pada layar. Itulah berat benda dalam gram." />
      <PilihBertahap
        key={r}
        soal={RONDE_BACA_CC[r].map((s, i) => {
          const b = BENDA_BERAT[s.b];
          return soalGram(
            s.gram,
            <Penuh>
              <TimbanganDigital emoji={b.emoji} gram={s.gram} />
            </Penuh>,
            r * 2 + i,
            `Berapa gram berat ${b.nama}?`,
            b.nama,
          );
        })}
        onBeres={beres}
        pesanBeres="Semua berat sudah kamu baca."
      />
    </>
  ));
}

function KartuSiapC(d: PropsLangkah) {
  return Kartu(d, 1, "k3b3c-siap", "Lihat tiga timbangan duduk. Ketuk timbangan yang jarumnya tepat di angka 0, tanda siap menimbang.", RONDE_SIAP_CC.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_SIAP_CC[r];
    const benar = ro.indexOf(0);
    return (
      <>
        <IgilBicara pendek="Timbangan yang siap" teks="Sebelum menimbang, jarum timbangan harus tepat di angka nol. Ketuk timbangan yang sudah siap digunakan." />
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.map((g, i) => ({ id: `t${i}`, label: `Timbangan ${HURUF[i]}`, isi: <TimbanganDuduk gram={g} ringkas /> }))}
          soal={[{ tanya: "Ketuk timbangan yang siap menimbang.", jawab: `t${benar}`, petunjuk: "Belum tepat. Timbangan siap bila jarumnya tepat di angka 0. Bila tidak, hasil timbangan akan keliru.", pesan: `Jarum timbangan ${HURUF[benar]} tepat di angka 0, jadi siap menimbang.` }]}
          onBeres={beres}
          pesanBeres="Semua timbangan yang siap sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuBacaJarumC(d: PropsLangkah) {
  return Kartu(d, 2, "k3b3c-bacajarum", "Lihat buah di atas timbangan duduk. Baca angka yang ditunjuk jarum, lalu pilih beratnya.", RONDE_BACA_JARUM_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca timbangan jarum" teks="Buah diletakkan di atas timbangan duduk. Baca angka yang ditunjuk jarum. Garis besar adalah satu kilogram, garis sedang adalah lima ratus gram." />
      <PilihBertahap
        key={r}
        soal={RONDE_BACA_JARUM_CC[r].map((s, i): SoalBertahap => {
          const b = BENDA_BERAT[s.b];
          const o = opsiBerat500(s.gram, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <TimbanganDuduk emoji={b.emoji} gram={s.gram} />
              </Penuh>
            ),
            tanya: `Berapa berat ${b.nama}?`,
            opsi: o.map(teksKgG),
            jawab: o.indexOf(s.gram),
            petunjuk: PETUNJUK_JARUM,
            pesan: `Jarum menunjuk ${teksKgG(s.gram)}, jadi ${b.nama} beratnya ${teksKgG(s.gram)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua berat sudah kamu baca."
      />
    </>
  ));
}

const NAMA_JENIS: JenisTimbangan[] = ["digital", "duduk", "badan"];
const PETUNJUK_TIMBANGAN = "Belum tepat. Benda ringan memakai timbangan digital, buah atau benda yang lebih berat memakai timbangan duduk, dan berat badan memakai timbangan badan.";

function KartuPilihTimbanganC(d: PropsLangkah) {
  return Kartu(d, 3, "k3b3c-pilihtimbangan", "Lihat benda yang akan ditimbang. Pilih timbangan yang paling tepat untuknya.", RONDE_TIMBANGAN_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pilih timbangan" teks="Benda ringan ditimbang dengan timbangan digital. Buah yang lebih berat ditimbang dengan timbangan duduk. Berat badan ditimbang dengan timbangan badan." />
      <PilihBertahap
        key={r}
        soal={RONDE_TIMBANGAN_CC[r].map((id, i): SoalBertahap => {
          const b = BENDA_BERAT[id];
          const lain = NAMA_JENIS.filter((j) => j !== b.timbangan).map((j) => NAMA_TIMBANGAN[j]) as [string, string];
          const o = susunOpsi(NAMA_TIMBANGAN[b.timbangan], lain, r * 2 + i);
          return {
            visual: <Emoji e={b.emoji} kelas="text-7xl" />,
            tanya: `Timbangan apa yang tepat untuk menimbang ${b.nama}?`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: PETUNJUK_TIMBANGAN,
            pesan: `${kapital(b.nama)} ditimbang dengan ${NAMA_TIMBANGAN[b.timbangan].toLowerCase()}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua timbangan sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJodohTimbanganC(d: PropsLangkah) {
  return Kartu(d, 4, "k3b3c-jodohtimbangan", "Ketuk satu benda di kiri, lalu ketuk timbangan yang tepat di kanan.", RONDE_JODOH_CC.length, "Jodohkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CC[r];
    const kanan = ro.map((id) => ({ id: BENDA_BERAT[id].timbangan, label: NAMA_TIMBANGAN[BENDA_BERAT[id].timbangan], isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan timbangan" teks="Pikirkan benda itu ringan atau berat. Jodohkan benda dengan timbangan yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((id) => ({ id, label: BENDA_BERAT[id].nama, isi: <Emoji e={BENDA_BERAT[id].emoji} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((id) => [id, BENDA_BERAT[id].timbangan]))}
          petunjuk={() => PETUNJUK_TIMBANGAN}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan timbangannya."
        />
      </>
    );
  });
}

function KartuMemoriTimbanganC(d: PropsLangkah) {
  return Kartu(d, 5, "k3b3c-memoritimbangan", "Balik dua kartu. Cari timbangan digital dan berat yang ditunjukkan layarnya.", RONDE_MEMORI_CC.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori timbangan dan berat" teks="Balik dua kartu. Cari kartu timbangan digital dan kartu beratnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_CC[r].map((g, i) => ({ id: `g${g}`, a: <TimbanganDigital gram={g} ringkas />, labelA: `timbangan ${HURUF[i]}`, b: <Numeral n={teksGram(g)} kelas="text-3xl" />, labelB: teksGram(g) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKetukTimbanganC(d: PropsLangkah) {
  return Kartu(d, 6, "k3b3c-ketuktimbangan", "Baca berat pada tiap timbangan. Ketuk timbangan yang beratnya sama dengan bilangan yang disebut.", RONDE_KETUK_CC.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_KETUK_CC[r];
    return (
      <>
        <IgilBicara pendek="Ketuk timbangan dengan berat" teks="Baca angka pada layar tiap timbangan. Ketuk timbangan yang beratnya sama dengan yang disebut." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((s, i) => ({ id: idBerat(s), label: `Timbangan ${HURUF[i]}`, isi: <TimbanganDigital emoji={BENDA_BERAT[s.b].emoji} gram={s.gram} ringkas /> }))}
          soal={ro.tanya.map((t) => {
            const s = ro.item.find((x) => x.gram === t) ?? ro.item[0];
            return { tanya: `Ketuk timbangan yang menunjukkan ${teksGram(t)}.`, jawab: idBerat(s), petunjuk: PETUNJUK_LAYAR, pesan: `Layar menunjukkan ${teksGram(t)}.` };
          })}
          onBeres={beres}
          pesanBeres="Semua timbangan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaSatuanC(d: PropsLangkah) {
  return Kartu(d, 7, "k3b3c-semuasatuan", "Ketuk semua benda yang ditimbang dengan satuan yang disebut. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    const tanya = `Ketuk semua benda yang ditimbang dengan satuan ${ro.satuan}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((id) => {
            const b = BENDA_BERAT[id];
            const cocok = b.satuan === ro.satuan;
            return {
              id,
              label: b.nama,
              isi: <Emoji e={b.emoji} kelas="w-12 text-4xl" />,
              benar: cocok,
              penjelasan: `${kapital(b.nama)} ${b.satuan === "gram" ? "ringan, jadi ditimbang dengan gram" : "lebih berat, jadi ditimbang dengan kilogram"}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua benda yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPapanGramC(d: PropsLangkah) {
  return Kartu(d, 8, "k3b3c-papangram", "Baca berat pada layar timbangan. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_CC.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Papan berat dalam gram" teks="Baca berat pada layar timbangan. Tulis ratusan, puluhan, dan satuannya pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_CC[r].map((s) => ({
          visual: (
            <Penuh>
              <TimbanganDigital emoji={BENDA_BERAT[s.b].emoji} gram={s.gram} />
            </Penuh>
          ),
          tanya: `Isi papan dengan berat ${BENDA_BERAT[s.b].nama} dalam gram.`,
          jawab: s.gram,
          petunjuk: PETUNJUK_LAYAR,
          pesan: `Layar menunjukkan ${teksGram(s.gram)}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutBeratC(d: PropsLangkah) {
  return Kartu(d, 9, "k3b3c-urutberat", "Baca berat tiap benda. Ketuk benda satu per satu dari yang paling ringan atau paling berat.", RONDE_URUT_CC.length, "Urutkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const ids = ro.item.map(idBerat);
    const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? x.gram - y.gram : y.gram - x.gram)).map(idBerat);
    const awal = ro.dari === "kecil" ? "teringan" : "terberat";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal}`} teks="Baca berat tiap benda pada layar timbangan. Lalu urutkan benda menurut beratnya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = ids.indexOf(id);
            const s = ro.item[i];
            return {
              id,
              label: `Benda ${HURUF[i]}`,
              isi: (
                <Lebar w={150}>
                  <TimbanganDigital emoji={BENDA_BERAT[s.b].emoji} gram={s.gram} ringkas />
                </Lebar>
              ),
            };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "terberat" : "teringan"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Baca angka pada layar tiap timbangan.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuJarumKgC(d: PropsLangkah) {
  return Kartu(d, 10, "k3b3c-jarumkg", "Lihat jarum timbangan. Baca angka kilogram yang ditunjuk jarum, lalu pilih beratnya.", RONDE_JARUM_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca jarum dalam kilogram" teks="Jarum timbangan menunjuk salah satu angka kilogram. Baca angka itu, lalu pilih beratnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_JARUM_PC[r].map((kg, i): SoalBertahap => {
          const o = opsiAngka(kg, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <JarumTimbangan gram={kg * 1000} />
              </Penuh>
            ),
            tanya: "Berapa kilogram berat yang ditunjuk jarum?",
            opsi: o.map((n) => `${n} kg`),
            jawab: o.indexOf(kg),
            petunjuk: PETUNJUK_JARUM,
            pesan: `Jarum menunjuk angka ${kg}, jadi beratnya ${kg} kg.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua berat sudah kamu baca."
      />
    </>
  ));
}

function KartuLayarC(d: PropsLangkah) {
  return Kartu(d, 11, "k3b3c-layar", "Lihat layar timbangan. Baca angka pada layar, lalu pilih beratnya dalam gram.", RONDE_LAYAR_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca layar timbangan" teks="Baca angka pada layar timbangan. Itulah berat benda dalam gram." />
      <PilihBertahap
        key={r}
        soal={RONDE_LAYAR_PC[r].map((g, i) =>
          soalGram(
            g,
            <Penuh>
              <LayarTimbangan gram={g} />
            </Penuh>,
            r * 2 + i,
            "Berapa gram berat yang ditunjukkan layar?",
            "benda",
          ),
        )}
        onBeres={beres}
        pesanBeres="Semua berat sudah kamu baca."
      />
    </>
  ));
}

function KartuJodohJarumC(d: PropsLangkah) {
  return Kartu(d, 12, "k3b3c-jodohjarum", "Ketuk satu jarum timbangan di kiri, lalu ketuk beratnya di kanan.", RONDE_JODOH_PC.length, "Jodohkan semua jarumnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PC[r];
    const kanan = ro.map((kg) => ({ id: `k${kg}`, label: `${kg} kg`, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan jarum dan berat" teks="Baca angka yang ditunjuk tiap jarum. Jodohkan dengan beratnya dalam kilogram." />
        <PasangKartu
          key={r}
          kiri={ro.map((kg, i) => ({ id: `k${kg}`, label: `Jarum ${HURUF[i]}`, isi: <JarumTimbangan gram={kg * 1000} ringkas /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((kg) => [`k${kg}`, `k${kg}`]))}
          petunjuk={() => "Belum cocok. Lihat angka yang ditunjuk ujung jarum merah."}
          onBeres={beres}
          pesanBeres="Semua jarum sudah cocok dengan beratnya."
        />
      </>
    );
  });
}

function KartuMemoriLayarC(d: PropsLangkah) {
  return Kartu(d, 13, "k3b3c-memorilayar", "Balik dua kartu. Cari layar timbangan dan beratnya.", RONDE_MEMORI_PC.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori layar dan berat" teks="Balik dua kartu. Cari kartu layar timbangan dan kartu beratnya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PC[r].map((g, i) => ({ id: `g${g}`, a: <LayarTimbangan gram={g} ringkas />, labelA: `layar ${HURUF[i]}`, b: <Numeral n={teksGram(g)} kelas="text-3xl" />, labelB: teksGram(g) }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuSemuaSiapC(d: PropsLangkah) {
  return Kartu(d, 14, "k3b3c-semuasiap", "Ketuk semua jarum yang tepat di angka 0. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SIAP_PC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SIAP_PC[r];
    const tanya = "Ketuk semua jarum yang siap menimbang, yaitu tepat di angka 0.";
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang siap" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.map((g, i) => {
            const cocok = g === 0;
            return {
              id: `j${i}`,
              label: `Jarum ${HURUF[i]}`,
              isi: (
                <Lebar w={96}>
                  <JarumTimbangan gram={g} ringkas />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `Jarum ${HURUF[i]} menunjuk ${g === 0 ? "angka 0" : teksKgG(g)}. ${cocok ? "Ini siap." : "Ini belum siap, jarum harus tepat di angka 0."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua jarum yang siap sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahSatuanC(d: PropsLangkah) {
  return Kartu(d, 15, "k3b3c-pilahsatuan", "Seret atau ketuk tiap nama benda ke kotak: ditimbang dengan gram, atau dengan kilogram.", RONDE_PILAH_PC.length, "Pilah semua bendanya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah gram atau kilogram" teks="Benda ringan ditimbang dengan gram. Benda yang lebih berat ditimbang dengan kilogram. Pilah tiap nama benda ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={110}
        kolomBin={2}
        item={urutanKe(RONDE_PILAH_PC[r].length, r).map((i) => {
          const b = BENDA_BERAT[RONDE_PILAH_PC[r][i]];
          return {
            id: b.id,
            label: b.nama,
            bin: b.satuan,
            petunjuk: `Belum tepat. ${kapital(b.nama)} ${b.satuan === "gram" ? "ringan, jadi memakai gram" : "lebih berat, jadi memakai kilogram"}.`,
            ucapan: `${kapital(b.nama)} ${b.satuan === "gram" ? "ringan, jadi ditimbang dengan gram" : "lebih berat, jadi ditimbang dengan kilogram"}.`,
          };
        })}
        bin={BIN_SATUAN}
        onBeres={beres}
        pesanBeres="Semua benda sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuSemuaLayarC(d: PropsLangkah) {
  return Kartu(d, 16, "k3b3c-semualayar", "Ketuk semua layar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    const tanya = `Ketuk semua layar yang beratnya ${ro.arah} dari ${ro.acuan} g.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((g, i) => {
            const cocok = cocokBanding(g, ro.acuan, ro.arah);
            return {
              id: `g${g}`,
              label: `Layar ${HURUF[i]}`,
              isi: (
                <Lebar w={130}>
                  <LayarTimbangan gram={g} ringkas />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `Layar ${HURUF[i]} menunjukkan ${teksGram(g)}. ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua layar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuLangkahTimbangC(d: PropsLangkah) {
  return Kartu(d, 17, "k3b3c-langkahtimbang", "Ketuk langkah-langkah menimbang satu per satu menurut urutan yang benar.", RONDE_LANGKAH_PC.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
    const ro = RONDE_LANGKAH_PC[r];
    const ids = ro.langkah.map((_, i) => `l${i}`);
    return (
      <>
        <CatatanTempel pendek="Urutkan langkah" teks={`${ro.judul}. Ketuk langkah satu per satu menurut urutan yang benar.`} />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-sm font-black text-[#1C01A5]">{ro.judul}</p>
        <UrutKetuk
          key={r}
          item={urutTampil(ids, ids, r).map((id) => ({ id, label: ro.langkah[ids.indexOf(id)] }))}
          urutan={ids}
          labelAwal="pertama"
          labelAkhir="terakhir"
          petunjuk={() => "Belum, itu bukan langkah berikutnya. Mulailah dengan memastikan angka awal nol, baru letakkan benda."}
          onBeres={beres}
          pesanBeres="Urutan langkah menimbang sudah benar."
        />
      </>
    );
  });
}

function KartuPapanLayarC(d: PropsLangkah) {
  return Kartu(d, 18, "k3b3c-papanlayar", "Baca berat pada layar. Atur angka ratusan, puluhan, dan satuan pada papan, lalu tekan Periksa.", RONDE_PAPAN_PC.length, "Isi semua papannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Papan dari layar" teks="Baca berat pada layar timbangan. Tulis ratusan, puluhan, dan satuannya pada papan." />
      <PapanTiga
        key={r}
        soal={RONDE_PAPAN_PC[r].map((g) => ({
          visual: (
            <Penuh>
              <LayarTimbangan gram={g} />
            </Penuh>
          ),
          tanya: "Isi papan dengan berat pada layar dalam gram.",
          jawab: g,
          petunjuk: PETUNJUK_LAYAR,
          pesan: `Layar menunjukkan ${teksGram(g)}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua papan sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuSelisihLayarC(d: PropsLangkah) {
  return Kartu(d, 19, "k3b3c-selisihlayar", "Dua timbangan menunjukkan dua berat. Hitung selisih beratnya, lalu pilih jawabannya.", RONDE_SELISIH_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Selisih dua layar" teks="Baca berat pada dua layar. Kurangkan berat yang besar dengan berat yang kecil. Itulah selisihnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_SELISIH_PC[r].map(([a, b], i): SoalBertahap => {
          const dd = b - a;
          const o = opsiGram(dd, r * 2 + i);
          return {
            visual: (
              <div className="grid w-full grid-cols-2 gap-2">
                {([["Pertama", a], ["Kedua", b]] as [string, number][]).map(([nama, g]) => (
                  <div key={nama} className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[#1C01A5]/30 bg-white px-1 py-1">
                    <LayarTimbangan gram={g} ringkas />
                    <span className="text-[11px] font-black text-[#1C01A5]">{nama}</span>
                  </div>
                ))}
              </div>
            ),
            tanya: "Berapa gram berat tambahannya?",
            opsi: o.map(teksGram),
            jawab: o.indexOf(dd),
            petunjuk: "Belum tepat. Baca kedua layar, lalu kurangkan berat yang besar dengan yang kecil.",
            pesan: `${b} − ${a} = ${dd}, jadi berat tambahannya ${teksGram(dd)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu hitung."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

const PETUNJUK_SATUAN = "Belum tepat. Benda yang ringan memakai gram, benda yang lebih berat memakai kilogram.";

function KartuSatuanBeratC(d: PropsLangkah) {
  return Kartu(d, 20, "k3b3c-satuanberat", "Baca benda yang ditimbang. Pilih satuan baku yang paling tepat.", RONDE_SATUAN_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Pilih satuan berat" teks="Benda yang ringan ditimbang dengan gram. Benda yang lebih berat ditimbang dengan kilogram. Pilih satuan baku yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_SATUAN_QC[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: PETUNJUK_SATUAN, pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua satuan sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuTimbanganTeksC(d: PropsLangkah) {
  return Kartu(d, 21, "k3b3c-timbanganteks", "Baca benda yang ditimbang. Pilih alat ukur yang paling tepat.", RONDE_TIMBANGAN_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Timbangan yang tepat" teks="Benda ringan memakai timbangan digital. Buah yang lebih berat memakai timbangan duduk. Berat badan memakai timbangan badan." />
      <PilihBertahap
        key={r}
        soal={RONDE_TIMBANGAN_QC[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: PETUNJUK_TIMBANGAN, pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua timbangan sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuKalimatBeratC(d: PropsLangkah) {
  return Kartu(d, 22, "k3b3c-kalimatberat", "Lengkapi tiap kalimat tentang pengukuran berat dengan kata yang tepat.", RONDE_KALIMAT_QC.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat pengukuran berat" teks="Baca tiap kalimat tentang pengukuran berat. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QC[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuJodohTimbanganTeksC(d: PropsLangkah) {
  return Kartu(d, 23, "k3b3c-jodohtimbanganteks", "Ketuk satu berat di kiri, lalu ketuk timbangannya di kanan.", RONDE_JODOH_QC.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QC[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan berat dan timbangan" teks="Pikirkan benda itu ringan atau berat. Jodohkan dengan timbangan yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => PETUNJUK_TIMBANGAN}
          onBeres={beres}
          pesanBeres="Semua berat sudah cocok dengan timbangannya."
        />
      </>
    );
  });
}

function KartuMemoriBeratWajarC(d: PropsLangkah) {
  return Kartu(d, 24, "k3b3c-memoriberatwajar", "Balik dua kartu. Cari benda dan berat yang wajar untuknya.", RONDE_MEMORI_QC.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori benda dan berat" teks="Balik dua kartu. Cari kartu benda dan kartu berat yang wajar untuknya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QC[r].map((p, i) => ({
          id: `m${i}`,
          a: <span className="px-1 text-base font-black leading-tight text-[#1C01A5]">{p.a}</span>,
          labelA: p.a,
          b: <Numeral n={p.b} kelas="text-3xl" />,
          labelB: p.b,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahC(d: PropsLangkah) {
  return Kartu(d, 25, "k3b3c-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QC.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang pengukuran berat dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifC(d: PropsLangkah) {
  return Kartu(d, 26, "k3b3c-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QC.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (
      <>
        <CatatanPensil pendek="Detektif pengukuran berat" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(titik), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaC(d: PropsLangkah) {
  return Kartu(d, 27, "k3b3c-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QC.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QC[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaBeratC(d: PropsLangkah) {
  return Kartu(d, 28, "k3b3c-ceritaberat", "Baca soal cerita. Hitung beratnya dalam gram, lalu pilih jawabannya.", RONDE_CERITA_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QC[r].map((c, i) => {
      const o = opsiCeritaG(c, r * 2 + i);
      const j = jawabCerita(c);
      return {
        tanya: c.teks,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Baca ceritanya lagi. Apakah beratnya digabung, atau dicari selisihnya?",
        pesan: `${teksGram(c.a)} ${c.jenis} ${teksGram(c.b)} = ${teksGram(j)}.`,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita berat" teks="Baca soal cerita dengan teliti. Tentukan apakah beratnya digabung atau dicari selisihnya, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataC(d: PropsLangkah) {
  return Kartu(d, 29, "k3b3c-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QC.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata pengukuran berat" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QC[r].kata} pengecoh={RONDE_SUSUNKATA_QC[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuBacaDigitalC, KartuSiapC, KartuBacaJarumC, KartuPilihTimbanganC, KartuJodohTimbanganC, KartuMemoriTimbanganC, KartuKetukTimbanganC, KartuSemuaSatuanC, KartuPapanGramC, KartuUrutBeratC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuJarumKgC, KartuLayarC, KartuJodohJarumC, KartuMemoriLayarC, KartuSemuaSiapC, KartuPilahSatuanC, KartuSemuaLayarC, KartuLangkahTimbangC, KartuPapanLayarC, KartuSelisihLayarC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuSatuanBeratC, KartuTimbanganTeksC, KartuKalimatBeratC, KartuJodohTimbanganTeksC, KartuMemoriBeratWajarC, KartuBenarSalahC, KartuDetektifC, KartuPetaC, KartuCeritaBeratC, KartuSusunKataC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B3C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "⚖️", nama: "CONCRETE", cara: "Timbang benda dan baca timbangan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B3C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat layar dan jarum timbangan", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B3C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Satuan, timbangan, dan bilangan", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_C33} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />}
    />
  );
}
