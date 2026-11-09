"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { IkonKegiatan } from "./dasar-k2b6";
import { BatangDatar, JalurJam, JamMuka } from "./diagram-k2b6";
import { AturJam, JamMaju } from "./jam-k2b6";
import { BuatTally, GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, LetakSlot, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import {
  BAGIAN_HARI, Kapital, KEGIATAN, PETA_KONSEP_B, RONDE_BACAJAM_B, RONDE_BACAJAM_PB, RONDE_BATANGLAMA_PB, RONDE_BENARSALAH_QB, RONDE_BLOK_PB, RONDE_DETEKTIF_QB, RONDE_DIGITAL_PB,
  RONDE_GAMBARJARUM_PB, RONDE_GARIS_B, RONDE_GARISJAM_PB, RONDE_HITUNG_QB, RONDE_JODOH_B, RONDE_KALIMAT_QB, RONDE_KETUKBAGIAN_QB, RONDE_LAMA_B, RONDE_MEMORI_B, RONDE_PILIHBAGIAN_QB,
  RONDE_PUTAR_B, RONDE_SELISIH_B, RONDE_SORTIR_B, RONDE_SORTIRJAM_PB, RONDE_SUSUNKATA_QB, RONDE_TABEL_PB, RONDE_TABEL_QB, RONDE_TALLYJAM_PB, RONDE_TEMUKANJAM_B, RONDE_URUT_B,
  RONDE_URUTDIGITAL_QB, RONDE_URUTJAM_PB, bagianHari, digital, jam12, lamaTeks, lebihLama, opsiAngka, pilihanPukul, susunOpsi, urutKegiatan, urutTampil, urutanTetap,
  type BagianHari, type KegiatanId,
} from "./data-k2b6";
import { visualInfografisK2B6B } from "./infografis-k2b6";
import { SUB_B6 } from "./naskah-k2b6";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 6 Sub-Bab B: Waktu. Tiga puluh permainan, sepuluh per tahap.    */
/*  Concrete 1 Pukul Berapa?  2 Putar Jarum  3 Pilah Bagian Hari  4 Jodohkan   */
/*           5 Mana Lebih Lama?  6 Urutkan Hariku  7 Garis Waktu  8 Memori     */
/*           9 Majukan Jam  10 Temukan Jam                                    */
/*  Picture  11 Baca Jam Digital  12 Gambar Jarum  13 Batang Lama  14 Jodohkan  */
/*           15 Urutkan Jam  16 Pilah Jam  17 Kotak Jam  18 Tabel  19 Goresan   */
/*           20 Garis Angka Jam                                                */
/*  Abstract 21 Kalimat  22 Benar Salah  23 Susun Kalimat  24 Berapa Jam         */
/*           25 Tabel  26 Pilih Bagian  27 Detektif  28 Peta  29 Urutkan Digital */
/*           30 Ketuk Semua                                                    */
/* Naskah: naskah-k2b6.ts (SUB_B6). Tanpa API.                                 */
/* ------------------------------------------------------------------------ */

const J = SUB_B6.games.map((g) => g.title);
const TOTAL = 30;

const SUARA_INFO =
  "Ini poster rangkuman tentang waktu. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B6BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B6} judul="Waktu" suaraInfo={SUARA_INFO} visual={visualInfografisK2B6B()} speakGuru={speakGuru} />;
}

type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
  return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={TOTAL} isi={isi} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const HURUF = ["A", "B", "C", "D", "E", "F"];
const kalimatKegiatan = (id: KegiatanId) => `${Kapital(KEGIATAN[id].nama)} pukul ${jam12(KEGIATAN[id].jam24)} ${bagianHari(KEGIATAN[id].jam24)}.`;
const BAGIAN_WARNA: Record<BagianHari, string> = { pagi: "#FEF3C7", siang: "#FEF9C3", sore: "#FFEDD5", malam: "#E0E7FF" };
const BAGIAN_IKON: Record<BagianHari, string> = { pagi: "🌅", siang: "☀️", sore: "🌇", malam: "🌙" };
const artiDigital = (j: number) => `${digital(j)} berarti pukul ${jam12(j)} ${bagianHari(j)}.`;

/* ------------------------------ Concrete ------------------------------ */

const soalBacaJamB = (r: number): SoalBertahap[] =>
  RONDE_BACAJAM_B[r].map((jam, i) => {
    const n = jam12(jam);
    const pil = pilihanPukul(jam, r * 3 + i);
    return {
      visual: <JamMuka jam={jam} gaya="dinding" kelas="w-full max-w-[180px]" />,
      tanya: "Jam ini menunjukkan pukul berapa?",
      opsi: pil.map((x) => `Pukul ${x}`),
      jawab: pil.indexOf(n),
      petunjuk: "Lihat jarum pendek dulu. Jarum panjang di angka dua belas, jadi pukul tepat.",
      pesan: `Pukul ${n} tepat.`,
    };
  });

function KartuBacaJamB(d: PropsLangkah) {
  return Kartu(d, 0, "k2b6b-bacajam", "Lihat jarum pendek, lalu jarum panjang. Jarum panjang di angka dua belas berarti pukul tepat. Pilih pukul yang tepat.", RONDE_BACAJAM_B.length, "Jawab semua jam dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pukul berapa?" teks="Lihat jam dinding. Jarum pendek menunjukkan jam. Pilih pukul yang tepat." />
      <PilihBertahap key={r} soal={soalBacaJamB(r)} onBeres={beres} pesanBeres="Semua jam sudah kamu baca dengan benar." />
    </>
  ));
}

function KartuPutarB(d: PropsLangkah) {
  return Kartu(d, 1, "k2b6b-putar", "Baca cerita, lalu arahkan jarum pendek ke pukul yang disebut. Ketuk angka di jam atau pakai tombol jam, lalu tekan Periksa.", RONDE_PUTAR_B.length, "Putar semua jamnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Putar jarum jam" teks="Baca ceritanya. Arahkan jarum pendek ke pukul yang disebut. Jarum panjang tetap di angka dua belas." />
      <AturJam
        key={r}
        gaya="dinding"
        soal={RONDE_PUTAR_B[r].map((id) => ({
          tanya: `${kalimatKegiatan(id)} Putar jarum pendek ke pukul itu.`,
          jam24: KEGIATAN[id].jam24,
          petunjuk: "Belum tepat. Cari angka jam pada cerita, lalu arahkan jarum pendek ke angka itu.",
          pesan: `Pukul ${jam12(KEGIATAN[id].jam24)} tepat.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua jarum sudah di tempat yang tepat."
      />
    </>
  ));
}

function KartuPilahBagianB(d: PropsLangkah) {
  return Kartu(d, 2, "k2b6b-pilah", "Baca kegiatan dan jamnya. Seret atau ketuk kegiatan ke kotak pagi, siang, sore, atau malam.", RONDE_SORTIR_B.length, "Pilah semua kegiatannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pilah menurut bagian hari" teks="Baca kegiatan dan jamnya. Pilah ke kotak pagi, siang, sore, atau malam." />
      <Sortir
        key={r}
        lebarItem={92}
        item={urutanKe(RONDE_SORTIR_B[r].length, r).map((i) => {
          const id = RONDE_SORTIR_B[r][i];
          const k = KEGIATAN[id];
          const b = bagianHari(k.jam24);
          return {
            id,
            label: `${k.nama}, pukul ${jam12(k.jam24)}`,
            isi: <IkonKegiatan id={id} ukuran={40} />,
            bin: b,
            petunjuk: `Belum tepat. ${kalimatKegiatan(id)} Cari kotak yang lain.`,
            ucapan: kalimatKegiatan(id),
          };
        })}
        bin={BAGIAN_HARI.map((b) => ({ id: b, label: Kapital(b), warna: BAGIAN_WARNA[b], ikon: BAGIAN_IKON[b] }))}
        onBeres={beres}
        pesanBeres="Semua kegiatan sudah masuk bagian harinya."
      />
    </>
  ));
}

function KartuJodohB(d: PropsLangkah) {
  return Kartu(d, 3, "k2b6b-jodoh", "Ketuk satu kegiatan di kiri, lalu ketuk jam yang menunjukkan waktunya di kanan.", RONDE_JODOH_B.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ids = RONDE_JODOH_B[r];
    const kanan = ids.map((id, i) => ({ id: `j${i}`, label: `Jam ${HURUF[i]}`, isi: <JamMuka jam={KEGIATAN[id].jam24} gaya="dinding" kelas="w-full max-w-[84px]" /> }));
    return (
      <>
        <IgilBicara pendek="Jodohkan kegiatan dan jam" teks="Setiap kegiatan punya waktunya. Jodohkan kegiatan dengan jam yang menunjukkan waktunya." />
        <PasangKartu
          key={r}
          kiri={ids.map((id, i) => ({ id: `k${i}`, label: kalimatKegiatan(id).replace(/\.$/, ""), isi: <IkonKegiatan id={id} ukuran={38} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ids.map((_, i) => [`k${i}`, `j${i}`]))}
          petunjuk={() => "Belum cocok. Cari angka yang ditunjuk jarum pendek, lalu cocokkan dengan jam di cerita."}
          onBeres={beres}
          pesanBeres="Semua kegiatan sudah cocok dengan jamnya."
        />
      </>
    );
  });
}

function KartuLamaB(d: PropsLangkah) {
  return Kartu(d, 4, "k2b6b-lama", "Baca pertanyaan di atas gambar. Ketuk kegiatan yang lebih lama atau lebih sebentar.", RONDE_LAMA_B.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const soal = RONDE_LAMA_B[r].map((p) => {
      const nama = (id: KegiatanId) => KEGIATAN[id].nama;
      const kata = p.tanya === "lama" ? "lebih lama" : "lebih sebentar";
      const menang = lebihLama(p);
      const kalah = menang === p.a ? p.b : p.a;
      return {
        tanya: `Mana yang ${kata}: ${nama(p.a)} atau ${nama(p.b)}?`,
        jawab: menang,
        petunjuk: `${Kapital(nama(p.a))} sekitar ${lamaTeks(KEGIATAN[p.a].menit)}, dan ${nama(p.b)} sekitar ${lamaTeks(KEGIATAN[p.b].menit)}. Bandingkan lagi.`,
        pesan: `${Kapital(nama(menang))} ${kata} dari ${nama(kalah)}.`,
        item: [p.a, p.b].map((id) => ({ id, label: nama(id), isi: <IkonKegiatan id={id} ukuran={52} /> })),
      };
    });
    return (
      <>
        <IgilBicara pendek="Mana lebih lama?" teks="Bandingkan lama dua kegiatan. Ketuk kegiatan yang lebih lama atau yang lebih sebentar, sesuai pertanyaan." />
        <KetukPilih key={r} item={soal[0].item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua perbandingan lama kegiatan sudah benar." />
      </>
    );
  });
}

function KartuUrutB(d: PropsLangkah) {
  return Kartu(d, 5, "k2b6b-urut", "Ketuk kegiatan satu per satu mulai dari yang paling awal dalam satu hari. Lihat jam dan kegiatannya.", RONDE_URUT_B.length, "Urutkan semua kegiatannya dulu, ya.", (r, beres) => {
    const ids = RONDE_URUT_B[r];
    return (
      <>
        <IgilBicara pendek="Urutkan hariku" teks="Ketuk kegiatan satu per satu, mulai dari yang paling awal dalam satu hari." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, urutKegiatan(ids), r).map((id) => {
            return {
              id,
              label: KEGIATAN[id].nama,
              isi: (
                <span className="flex items-center gap-1">
                  <IkonKegiatan id={id} ukuran={30} />
                  <JamMuka jam={KEGIATAN[id].jam24} gaya="dinding" kelas="h-10 w-10" />
                </span>
              ),
            };
          })}
          urutan={urutKegiatan(ids)}
          labelAwal="paling awal"
          labelAkhir="paling akhir"
          petunjuk={(i) => `Belum, bukan ${i.label}. Cari kegiatan yang terjadi lebih awal dalam satu hari.`}
          onBeres={beres}
          pesanBeres="Urutan kegiatan sudah benar."
        />
      </>
    );
  });
}

function KartuGarisWaktuB(d: PropsLangkah) {
  return Kartu(d, 6, "k2b6b-garis", "Ketuk kegiatan, lalu ketuk bagian harinya: pagi, siang, sore, atau malam. Tiap bagian hari diisi satu kegiatan.", RONDE_GARIS_B.length, "Taruh semua kegiatannya dulu, ya.", (r, beres) => {
    const ids = RONDE_GARIS_B[r];
    return (
      <>
        <IgilBicara pendek="Garis waktu hariku" teks="Setiap bagian hari diisi satu kegiatan. Ketuk kegiatan, lalu ketuk bagian harinya." />
        <LetakSlot
          key={r}
          item={urutanKe(ids.length, r).map((i) => {
            const id = ids[i];
            return { id, label: `${KEGIATAN[id].nama}, pukul ${jam12(KEGIATAN[id].jam24)}`, isi: <IkonKegiatan id={id} ukuran={40} />, slot: bagianHari(KEGIATAN[id].jam24), petunjuk: `Belum tepat. ${kalimatKegiatan(id)} Coba bagian hari yang lain.`, ucapan: kalimatKegiatan(id) };
          })}
          slot={BAGIAN_HARI.map((b) => ({ id: b, label: Kapital(b), ikon: BAGIAN_IKON[b], warna: BAGIAN_WARNA[b] }))}
          onBeres={beres}
          pesanBeres="Garis waktu hariku sudah lengkap."
        />
      </>
    );
  });
}

function KartuMemoriB(d: PropsLangkah) {
  return Kartu(d, 7, "k2b6b-memori", "Balik dua kartu. Cari pasangan kegiatan dan jam yang menunjukkan waktunya.", RONDE_MEMORI_B.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori kegiatan dan jam" teks="Balik dua kartu. Cari kartu kegiatan dan kartu jam yang menunjukkan waktu kegiatan itu." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_B[r].map((id) => ({
          id,
          a: <IkonKegiatan id={id} ukuran={34} />,
          labelA: KEGIATAN[id].nama,
          b: <JamMuka jam={KEGIATAN[id].jam24} gaya="dinding" kelas="w-full max-w-[60px]" />,
          labelB: `pukul ${jam12(KEGIATAN[id].jam24)}`,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuMajuB(d: PropsLangkah) {
  return Kartu(d, 8, "k2b6b-maju", "Tekan Maju 1 jam sampai jam menunjukkan waktu selesai. Lalu pilih berapa jam yang sudah berlalu.", RONDE_SELISIH_B.length, "Selesaikan semua ceritanya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Majukan jam" teks="Baca cerita. Majukan jam satu jam setiap ketukan sampai waktu selesai. Lalu pilih berapa jam yang sudah berlalu." />
      <JamMaju
        key={r}
        soal={RONDE_SELISIH_B[r].map((s) => ({
          cerita: `${s.kegiatan} mulai pukul ${jam12(s.mulai)} sampai pukul ${jam12(s.selesai)}. Majukan jam sampai pukul ${jam12(s.selesai)}.`,
          mulai: s.mulai,
          selesai: s.selesai,
          petunjuk: "Belum tepat. Hitung berapa kali kamu menekan Maju 1 jam.",
          pesan: `Jarum pendek bergerak ${s.selesai - s.mulai} jam.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua lama kegiatan sudah kamu hitung."
      />
    </>
  ));
}

function KartuTemukanJamB(d: PropsLangkah) {
  return Kartu(d, 9, "k2b6b-temukan", "Baca pertanyaan di atas gambar. Ketuk jam dinding yang menunjukkan pukul yang diminta.", RONDE_TEMUKANJAM_B.length, "Temukan semua jamnya dulu, ya.", (r, beres) => {
    const jam = RONDE_TEMUKANJAM_B[r];
    const item = jam.map((j, i) => ({ id: String(j), label: `Jam ${HURUF[i]}`, isi: <JamMuka jam={j} gaya="dinding" kelas="w-full max-w-[100px]" /> }));
    const pilih = [jam[r % 4], jam[(r + 2) % 4]];
    return (
      <>
        <IgilBicara pendek="Temukan jam di dinding" teks="Ada empat jam di dinding. Ketuk jam yang menunjukkan pukul yang diminta." />
        <KetukPilih
          key={r}
          item={item}
          kolom={2}
          soal={pilih.map((j) => ({ tanya: `Ketuk jam yang menunjukkan pukul ${j}.`, jawab: String(j), petunjuk: "Belum tepat. Lihat jarum pendek dulu, lalu cocokkan dengan angka yang diminta.", pesan: `Benar, itu pukul ${j}.` }))}
          onBeres={beres}
          pesanBeres="Semua jam sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

const soalBacaJamPB = (r: number): SoalBertahap[] =>
  RONDE_BACAJAM_PB[r].map((jam, i) => {
    const pil = pilihanPukul(jam, r * 3 + i);
    return {
      visual: <JamMuka jam={jam} gaya="garis" kelas="w-full max-w-[170px]" />,
      tanya: "Pilih jam digital yang sama dengan jam ini.",
      opsi: pil.map((x) => digital(x)),
      jawab: pil.indexOf(jam12(jam)),
      petunjuk: "Lihat jarum pendek. Dua angka pertama pada jam digital adalah jam.",
      pesan: `Pukul ${jam12(jam)} tepat ditulis ${digital(jam12(jam))}.`,
    };
  });

function KartuBacaDigitalPB(d: PropsLangkah) {
  return Kartu(d, 10, "k2b6b-digital", "Lihat gambar jam. Pilih jam digital yang menunjukkan waktu yang sama.", RONDE_BACAJAM_PB.length, "Jawab semua jam dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca jam digital" teks="Lihat gambar jam. Pilih jam digital yang menunjukkan waktu yang sama." />
      <PilihBertahap key={r} soal={soalBacaJamPB(r)} onBeres={beres} pesanBeres="Semua jam digital sudah benar." />
    </>
  ));
}

function KartuGambarJarumPB(d: PropsLangkah) {
  return Kartu(d, 11, "k2b6b-gambarjarum", "Baca jam digital. Arahkan jarum pendek pada gambar jam ke angka yang sama, lalu tekan Periksa.", RONDE_GAMBARJARUM_PB.length, "Gambar semua jarum dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Gambar jarum jam" teks="Baca jam digital. Arahkan jarum pendek ke angka yang sama, lalu tekan periksa." />
      <AturJam
        key={r}
        gaya="garis"
        soal={RONDE_GAMBARJARUM_PB[r].map((j) => ({ tanya: `Arahkan jarum pendek untuk jam digital ${digital(j)}.`, jam24: j, petunjuk: "Belum tepat. Dua angka pertama pada jam digital adalah jam. Arahkan jarum pendek ke angka itu.", pesan: `${digital(j)} adalah pukul ${j} tepat.` }))}
        onBeres={beres}
        pesanBeres="Semua jarum sudah di tempat yang tepat."
      />
    </>
  ));
}

function KartuBatangLamaPB(d: PropsLangkah) {
  return Kartu(d, 12, "k2b6b-batang", "Satu kotak sama dengan satu jam. Ketuk batang yang paling lama, lalu yang paling sebentar.", RONDE_BATANGLAMA_PB.length, "Temukan semua batangnya dulu, ya.", (r, beres) => {
    const b = RONDE_BATANGLAMA_PB[r];
    const maks = Math.max(...b.map((x) => x.jam));
    const lama = [...b].sort((x, y) => y.jam - x.jam)[0];
    const cepat = [...b].sort((x, y) => x.jam - y.jam)[0];
    return (
      <>
        <CatatanTempel pendek="Batang lama kegiatan" teks="Satu kotak sama dengan satu jam. Makin panjang batang, makin lama kegiatannya. Ketuk batang yang paling lama, lalu yang paling sebentar." />
        <KetukPilih
          key={r}
          item={b.map((x) => ({ id: x.id, label: `Kegiatan ${x.id}`, isi: <BatangDatar id={x.id} jam={x.jam} maks={maks} /> }))}
          kolom={2}
          soal={[
            { tanya: "Ketuk batang yang paling lama (paling panjang).", jawab: lama.id, petunjuk: "Cari batang yang paling panjang.", pesan: `Kegiatan ${lama.id} paling lama, ${lama.jam} jam.` },
            { tanya: "Ketuk batang yang paling sebentar (paling pendek).", jawab: cepat.id, petunjuk: "Cari batang yang paling pendek.", pesan: `Kegiatan ${cepat.id} paling sebentar, ${cepat.jam} jam.` },
          ]}
          onBeres={beres}
          pesanBeres="Yang paling lama dan paling sebentar sudah ketemu."
        />
      </>
    );
  });
}

function KartuJodohDigitalPB(d: PropsLangkah) {
  return Kartu(d, 13, "k2b6b-jodohdigital", "Ketuk satu gambar jam di kiri, lalu ketuk jam digital yang sama di kanan.", RONDE_DIGITAL_PB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const jam = RONDE_DIGITAL_PB[r];
    const kanan = jam.map((j, i) => ({ id: `d${i}`, label: digital(j), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan jam dan angka digital" teks="Lihat jarum pendek pada tiap gambar jam. Jodohkan dengan jam digital yang sama." />
        <PasangKartu
          key={r}
          kiri={jam.map((j, i) => ({ id: `a${i}`, label: `Jam ${HURUF[i]}`, isi: <JamMuka jam={j} gaya="garis" kelas="w-full max-w-[84px]" /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(jam.map((_, i) => [`a${i}`, `d${i}`]))}
          petunjuk={() => "Belum cocok. Dua angka pertama pada jam digital adalah jam yang ditunjuk jarum pendek."}
          onBeres={beres}
          pesanBeres="Semua jam sudah cocok dengan jam digitalnya."
        />
      </>
    );
  });
}

function KartuUrutJamPB(d: PropsLangkah) {
  return Kartu(d, 14, "k2b6b-urutjam", "Lihat gambar jam dan bagian harinya. Ketuk jam satu per satu mulai dari waktu yang paling awal dalam satu hari.", RONDE_URUTJAM_PB.length, "Urutkan semua jamnya dulu, ya.", (r, beres) => {
    const jam = RONDE_URUTJAM_PB[r];
    return (
      <>
        <CatatanTempel pendek="Urutkan gambar jam" teks="Lihat gambar jam dan bagian harinya. Ketuk jam dari waktu yang paling awal dalam satu hari." />
        <UrutKetuk
          key={r}
          item={urutTampil(jam, [...jam].sort((x, y) => x - y), r).map((j) => ({ id: String(j), label: bagianHari(j), isi: <JamMuka jam={j} gaya="garis" kelas="w-full max-w-[84px]" /> }))}
          urutan={[...jam].sort((x, y) => x - y).map(String)}
          labelAwal="paling awal"
          labelAkhir="paling akhir"
          petunjuk={(i) => `Belum, bukan jam ${i.label} itu. Cari waktu yang lebih awal dalam satu hari.`}
          onBeres={beres}
          pesanBeres="Urutan jam sudah benar."
        />
      </>
    );
  });
}

function KartuPilahJamPB(d: PropsLangkah) {
  return Kartu(d, 15, "k2b6b-pilahjam", "Lihat jam digital pada tiap gambar. Seret atau ketuk jam ke kotak pagi, siang, sore, atau malam.", RONDE_SORTIRJAM_PB.length, "Pilah semua jamnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah jam ke bagian hari" teks="Lihat jam digital pada tiap gambar. Pilah jam ke kotak pagi, siang, sore, atau malam. Pukul empat sore ditulis enam belas titik nol nol." />
      <Sortir
        key={r}
        lebarItem={96}
        item={urutanKe(RONDE_SORTIRJAM_PB[r].length, r).map((i) => {
          const j = RONDE_SORTIRJAM_PB[r][i];
          return {
            id: String(j),
            label: digital(j),
            isi: <JamMuka jam={j} gaya="garis" kelas="w-full max-w-[84px]" />,
            bin: bagianHari(j),
            petunjuk: `Belum tepat. ${artiDigital(j)}`,
            ucapan: artiDigital(j),
          };
        })}
        bin={BAGIAN_HARI.map((b) => ({ id: b, label: Kapital(b), warna: BAGIAN_WARNA[b] }))}
        onBeres={beres}
        pesanBeres="Semua jam sudah masuk bagian harinya."
      />
    </>
  ));
}

const soalBlokPB = (r: number): SoalBertahap[] =>
  RONDE_BLOK_PB[r].map(([mulai, selesai], i) => {
    const n = selesai - mulai;
    const o = opsiAngka(n, r * 2 + i);
    return {
      visual: <JalurJam mulai={mulai} selesai={selesai} />,
      tanya: `Berapa kotak jam dari pukul ${jam12(mulai)} sampai pukul ${jam12(selesai)}?`,
      opsi: o.map(String),
      jawab: o.indexOf(n),
      petunjuk: "Hitung kotak kuning satu per satu, dari angka mulai sampai angka selesai.",
      pesan: `Ada ${n} kotak, jadi ${n} jam.`,
      angka: true,
    };
  });

function KartuKotakJamPB(d: PropsLangkah) {
  return Kartu(d, 16, "k2b6b-kotak", "Setiap kotak kuning sama dengan satu jam. Hitung kotak dari angka mulai sampai angka selesai.", RONDE_BLOK_PB.length, "Hitung semua kotaknya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Hitung kotak jam" teks="Setiap kotak kuning sama dengan satu jam. Hitung kotak dari angka mulai sampai angka selesai." />
      <PilihBertahap key={r} soal={soalBlokPB(r)} onBeres={beres} pesanBeres="Semua jalur jam sudah kamu hitung." />
    </>
  ));
}

function KartuTabelJamPB(d: PropsLangkah) {
  return Kartu(d, 17, "k2b6b-tabeljam", "Lihat gambar jam dan jam digitalnya. Ketuk baris tabel, lalu ketuk kartu bagian hari yang tepat.", RONDE_TABEL_PB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PB[r];
    return (
      <>
        <CatatanTempel pendek="Tabel jam dan bagian hari" teks="Lihat gambar jam dan jam digitalnya. Isi tabel dengan bagian hari yang tepat." />
        <div className="grid grid-cols-4 gap-1.5">
          {t.baris.map((b) => (
            <div key={b.label} className="flex flex-col items-center rounded-xl border-2 border-[#1C01A5] bg-white px-0.5 py-1">
              <JamMuka jam={Number(b.label.slice(0, 2))} gaya="garis" kelas="w-full max-w-[64px]" />
              <span className="text-[11px] font-black text-[#1C01A5]">{b.label}</span>
            </div>
          ))}
        </div>
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `${artiDigital(Number(b.label.slice(0, 2)))} Coba kartu yang lain.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuTallyJamPB(d: PropsLangkah) {
  return Kartu(d, 18, "k2b6b-tally", "Hitung kotak jam. Lalu tekan Goresan sebanyak jam yang berlalu, dan tekan Periksa.", RONDE_TALLYJAM_PB.length, "Selesaikan semua goresannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Goresan jam" teks="Hitung kotak jam. Lalu tekan goresan sebanyak jam yang berlalu, dan tekan periksa." />
      <BuatTally
        key={r}
        soal={RONDE_TALLYJAM_PB[r].map(([mulai, selesai]) => ({
          visual: <JalurJam mulai={mulai} selesai={selesai} />,
          tanya: `Dari pukul ${jam12(mulai)} sampai pukul ${jam12(selesai)} ada berapa jam? Buat goresannya.`,
          n: selesai - mulai,
          petunjuk: "Hitung lagi kotak jamnya.",
          pesan: `${selesai - mulai} goresan untuk ${selesai - mulai} jam.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua goresan sudah benar."
      />
    </>
  ));
}

function KartuGarisJamPB(d: PropsLangkah) {
  return Kartu(d, 19, "k2b6b-garisjam", "Lihat jarum pendek pada gambar jam. Ketuk angka yang ditunjuk jarum pendek pada garis angka.", RONDE_GARISJAM_PB.length, "Tandai semua angkanya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis angka jam" teks="Lihat jarum pendek pada gambar jam. Ketuk angka yang ditunjuk jarum pendek pada garis angka." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARISJAM_PB[r].map((h) => ({
          visual: <JamMuka jam={h} gaya="garis" kelas="w-full max-w-[150px]" />,
          tanya: "Jarum pendek menunjuk angka berapa? Ketuk angkanya.",
          dari: 1,
          sampai: 12,
          jawab: h,
          petunjuk: "Belum tepat. Lihat ujung jarum pendek, lalu baca angkanya.",
          pesan: `Jarum pendek menunjuk angka ${h}, jadi pukul ${h} tepat.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua angka jam sudah kamu tandai."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuKalimatB(d: PropsLangkah) {
  return Kartu(d, 20, "k2b6b-kalimat", "Lengkapi tiap kalimat dengan kata yang tepat tentang waktu.", RONDE_KALIMAT_QB.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat waktu" teks="Baca kalimat. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QB[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuBenarSalahB(d: PropsLangkah) {
  return Kartu(d, 21, "k2b6b-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuSusunB(d: PropsLangkah) {
  return Kartu(d, 22, "k2b6b-susun", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QB.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kalimat waktu" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QB[r].kata} pengecoh={RONDE_SUSUNKATA_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

const soalHitungQB = (r: number): SoalBertahap[] =>
  RONDE_HITUNG_QB[r].map((s, i) => {
    const o = opsiAngka(s.jawab, r * 2 + i);
    return { tanya: s.teks, opsi: o.map(String), jawab: o.indexOf(s.jawab), petunjuk: s.petunjuk, pesan: `Jawabannya ${s.jawab} ${s.satuan}.`, angka: true };
  });

function KartuHitungQB(d: PropsLangkah) {
  return Kartu(d, 23, "k2b6b-hitungjam", "Baca cerita, lalu hitung berapa jam kegiatannya. Hitung dari pukul mulai sampai pukul selesai.", RONDE_HITUNG_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Hitung berapa jam" teks="Baca cerita. Hitung berapa jam kegiatannya, dari pukul mulai sampai pukul selesai." />
      <PilihBertahap key={r} soal={soalHitungQB(r)} onBeres={beres} pesanBeres="Semua soal sudah kamu jawab dengan benar." />
    </>
  ));
}

function KartuTabelQB(d: PropsLangkah) {
  return Kartu(d, 24, "k2b6b-tabelqb", "Baca kegiatan pada tiap baris. Ketuk baris tabel, lalu ketuk kartu bagian hari yang tepat.", RONDE_TABEL_QB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QB[r];
    return (
      <>
        <CatatanPensil pendek={t.judul} teks={`${t.judul}. Isi tabel dengan bagian hari yang tepat untuk tiap kegiatan.`} />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `${Kapital(b.label)}: pikirkan jam kegiatannya, lalu pilih bagian harinya.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

const soalBagianQB = (r: number): SoalBertahap[] =>
  RONDE_PILIHBAGIAN_QB[r].map((j, i) => {
    const benar = bagianHari(j);
    const lain = BAGIAN_HARI.filter((b) => b !== benar);
    const o = susunOpsi(benar, [lain[(r + i) % 3], lain[(r + i + 1) % 3]], r * 3 + i);
    return {
      tanya: `Pukul ${digital(j)} termasuk bagian hari apa?`,
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: `Belum tepat. ${artiDigital(j)} Pikirkan lagi.`,
      pesan: artiDigital(j),
    };
  });

function KartuPilihBagianQB(d: PropsLangkah) {
  return Kartu(d, 25, "k2b6b-bagian", "Baca jam digitalnya. Pilih bagian hari yang tepat: pagi, siang, sore, atau malam.", RONDE_PILIHBAGIAN_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Pilih bagian hari" teks="Baca jam digitalnya. Pilih bagian hari yang tepat. Pukul empat sore ditulis enam belas titik nol nol." />
      <PilihBertahap key={r} soal={soalBagianQB(r)} onBeres={beres} pesanBeres="Semua bagian hari sudah benar." />
    </>
  ));
}

function KartuDetektifQB(d: PropsLangkah) {
  return Kartu(d, 26, "k2b6b-detektif", "Baca dua petunjuk. Pilih kegiatan yang cocok dengan kedua petunjuk.", RONDE_DETEKTIF_QB.length, "Tebak dulu aku apa, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Detektif waktu" teks="Baca dua petunjuk. Pilih kegiatan yang cocok dengan kedua petunjuk." />
      <DetektifTeks key={r} soal={RONDE_DETEKTIF_QB[r]} onBeres={beres} pesanBeres={(nama) => `Benar, aku ${nama}.`} />
    </>
  ));
}

function KartuPetaKonsepQB(d: PropsLangkah) {
  return Kartu(d, 27, "k2b6b-konsep", "Lengkapi peta konsep waktu. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_B.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_B[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuUrutDigitalQB(d: PropsLangkah) {
  return Kartu(d, 28, "k2b6b-urutdigital", "Ketuk jam digital satu per satu, mulai dari yang paling awal dalam satu hari. Angka yang lebih kecil lebih awal.", RONDE_URUTDIGITAL_QB.length, "Urutkan semua jamnya dulu, ya.", (r, beres) => {
    const jam = RONDE_URUTDIGITAL_QB[r];
    return (
      <>
        <CatatanPensil pendek="Urutkan jam digital" teks="Ketuk jam digital satu per satu, mulai dari yang paling awal dalam satu hari. Angka yang lebih kecil lebih awal." />
        <UrutKetuk
          key={r}
          item={urutTampil(jam, [...jam].sort((x, y) => x - y), r).map((j) => ({ id: String(j), label: digital(j) }))}
          urutan={[...jam].sort((x, y) => x - y).map(String)}
          labelAwal="paling awal"
          labelAkhir="paling akhir"
          petunjuk={(i) => `Belum, bukan ${i.label}. Cari angka jam yang lebih kecil dulu.`}
          onBeres={beres}
          pesanBeres="Urutan jam digital sudah benar."
        />
      </>
    );
  });
}

function KartuSemuaQB(d: PropsLangkah) {
  return Kartu(d, 29, "k2b6b-semua", "Ketuk semua jam digital yang termasuk bagian hari yang diminta. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_KETUKBAGIAN_QB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_KETUKBAGIAN_QB[r];
    const tanya = `Ketuk semua jam yang termasuk ${s.bagian}.`;
    return (
      <>
        <CatatanPensil pendek={`Ketuk semua waktu ${s.bagian}`} teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={s.jam.map((j) => ({ id: String(j), label: digital(j), benar: bagianHari(j) === s.bagian, penjelasan: artiDigital(j) }))}
          onBeres={beres}
          pesanBeres={`Semua jam ${s.bagian} sudah kamu temukan.`}
        />
      </>
    );
  });
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuBacaJamB, KartuPutarB, KartuPilahBagianB, KartuJodohB, KartuLamaB, KartuUrutB, KartuGarisWaktuB, KartuMemoriB, KartuMajuB, KartuTemukanJamB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBacaDigitalPB, KartuGambarJarumPB, KartuBatangLamaPB, KartuJodohDigitalPB, KartuUrutJamPB, KartuPilahJamPB, KartuKotakJamPB, KartuTabelJamPB, KartuTallyJamPB, KartuGarisJamPB].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuKalimatB, KartuBenarSalahB, KartuSusunB, KartuHitungQB, KartuTabelQB, KartuPilihBagianQB, KartuDetektifQB, KartuPetaKonsepQB, KartuUrutDigitalQB, KartuSemuaQB].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK2B6B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "⏰", nama: "CONCRETE", cara: "Putar jam dan susun hariku!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B6B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B6B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B6} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
