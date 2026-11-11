"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { BuatTally, GarisAngkaGame, KetukPilih, KetukSemua, LetakSlot, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { TulisAngka } from "./mesin-k2b7";
import { CatatData, IsiBanyak } from "./mesin-k2b8";
import { Ikon, Kumpulan } from "./dasar-k2b8";
import { KartuTurus } from "./diagram-k2b8";
import {
  DATA, HURUF, PETA_KONSEP_QA, RONDE_BACA_PA, RONDE_BEDA_CA, RONDE_BENARSALAH_QA, RONDE_BUAT_PA, RONDE_CATAT_A, RONDE_DETEKTIF_QA, RONDE_HITUNG_A, RONDE_ISI_PA, RONDE_JUMLAH_QA,
  RONDE_KALIMAT_QA, RONDE_KELOMPOK_PA, RONDE_LEBIH_PA, RONDE_MEMORI_CA, RONDE_MEMORI_PA, RONDE_PALING_CA, RONDE_PASANG_CA, RONDE_PASANG_PA, RONDE_PASANG_QA, RONDE_SEMUA_QA, RONDE_SLOT_CA,
  RONDE_SORTIR_A, RONDE_SORTIR_PA, RONDE_SUSUN_QA, RONDE_TABEL_QA, RONDE_TALLY_A, RONDE_TEPAT_PA, RONDE_URUT_CA, RONDE_URUT_PA, RONDE_URUT_QA,
  Kapital, aliran, banyak, cocokSemua, hasilBeda, hasilJumlah, jendelaGaris, kalimatIsianData, kat, kataAkhir, kataAwal, opsiAngka, opsiKelompok, opsiTurus, palingTunggal,
  tanyaJumlah, tanyaLebih, tanyaSemua, teksKelompok, teksKlue, urutAngka, urutKategori, urutTampil, urutanTetap, hasilLebih, kataAngka,
} from "./data-k2b8";
import { visualInfografisK2B8A } from "./infografis-k2b8";
import { SUB_A8 } from "./naskah-k2b8";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 8 Sub-Bab A: Diagram Turus. Tiga puluh permainan, sepuluh per    */
/* tahap.                                                                      */
/*  Concrete 1 Kelompokkan  2 Hitung Jenis  3 Catat Turus  4 Buat Turus         */
/*           5 Jodohkan  6 Memori  7 Paling Banyak  8 Urutkan  9 Lebihnya        */
/*           10 Kartu ke Kotak                                                   */
/*  Picture  11 Baca Turus  12 Kolom Banyak  13 Gambar Turus  14 Turus Tepat     */
/*           15 Jodohkan  16 Memori  17 Kelompok Lima  18 Urutkan  19 Pilah      */
/*           20 Garis Bilangan                                                   */
/*  Abstract 21 Jodohkan  22 Kalimat  23 Susun Kata  24 Tabel  25 Benar Salah    */
/*           26 Detektif  27 Peta  28 Urutkan  29 Ketuk Semua  30 Jumlah          */
/* Naskah: naskah-k2b8.ts (SUB_A8). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_A8.games.map((g) => g.title);
const TOTAL = 10;
const WARNA_BIN = ["#BAE6FD", "#FDE68A", "#FBCFE8", "#BBF7D0"];

const SUARA_INFO =
  "Ini poster rangkuman tentang diagram turus. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B8AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A8} judul="Diagram Turus" suaraInfo={SUARA_INFO} visual={visualInfografisK2B8A()} speakGuru={speakGuru} />;
}

type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
  return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={TOTAL} isi={isi} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const nm = (set: Parameters<typeof kat>[0], id: string) => kat(set, id).nama;
const Nm = (set: Parameters<typeof kat>[0], id: string) => Kapital(nm(set, id));

/* ------------------------------ Concrete ------------------------------ */

function KartuSortirA(d: PropsLangkah) {
  return Kartu(d, 0, "k2b8a-sortir", "Seret atau ketuk tiap benda ke kotak jenisnya. Satu kotak untuk satu jenis.", RONDE_SORTIR_A.length, "Pilah semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_A[r];
    const cacah: Record<string, number> = {};
    const butir = aliran(ro.hitung, r).map((id) => {
      cacah[id] = (cacah[id] ?? 0) + 1;
      return { id, no: cacah[id] };
    });
    return (
      <>
        <IgilBicara pendek="Kelompokkan benda" teks="Sebelum menghitung, kelompokkan benda menurut jenisnya. Ketuk benda, lalu ketuk kotak jenis yang sama." />
        <Sortir
          key={r}
          lebarItem={70}
          kolomBin={3}
          item={butir.map((b, i) => {
            const k = kat(ro.set, b.id);
            return {
              id: `${b.id}-${b.no}`,
              label: `${k.nama} ${i + 1}`,
              isi: <Ikon ikon={k.ikon} ukuran={34} />,
              bin: b.id,
              petunjuk: `Belum tepat. Ini ${k.nama}. Cari kotak ${k.nama}.`,
              ucapan: `${Kapital(k.nama)} masuk kotak ${k.nama}.`,
            };
          })}
          bin={ro.hitung.map(([id], i) => ({ id, label: Nm(ro.set, id), warna: WARNA_BIN[i], ikon: kat(ro.set, id).ikon }))}
          onBeres={beres}
          pesanBeres="Semua benda sudah masuk kotak jenisnya."
        />
      </>
    );
  });
}

const soalHitungCA = (r: number): SoalBertahap[] =>
  RONDE_HITUNG_A[r].map((s, i) => {
    const k = kat(s.set, s.k);
    const o = opsiAngka(k.n, r * 2 + i);
    return {
      visual: <Kumpulan ikon={k.ikon} n={k.n} ukuran={28} label={`${k.n} ${k.nama}`} />,
      tanya: `Ada berapa ${k.nama}?`,
      opsi: o.map(String),
      jawab: o.indexOf(k.n),
      petunjuk: "Belum tepat. Hitung bendanya lima-lima, lalu tambahkan sisanya.",
      pesan: `${Kapital(k.nama)} ada ${k.n}.`,
      angka: true,
    };
  });

function KartuHitungJenisA(d: PropsLangkah) {
  return Kartu(d, 1, "k2b8a-hitungjenis", "Hitung banyak benda dari satu jenis, lalu pilih bilangannya.", RONDE_HITUNG_A.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung tiap jenis" teks="Benda disusun lima-lima supaya mudah dihitung. Hitung satu kelompok lima, lalu tambahkan sisanya." />
      <PilihBertahap key={r} soal={soalHitungCA(r)} onBeres={beres} pesanBeres="Semua benda sudah kamu hitung." />
    </>
  ));
}

function KartuCatatA(d: PropsLangkah) {
  return Kartu(d, 2, "k2b8a-catat", "Data muncul satu per satu. Ketuk baris jenis yang cocok, lalu satu garis turus ditulis. Garis kelima mencoret miring.", RONDE_CATAT_A.length, "Catat semua datanya dulu, ya.", (r, beres) => {
    const ro = RONDE_CATAT_A[r];
    return (
      <>
        <IgilBicara pendek="Catat turus" teks="Lihat gambar yang muncul. Ketuk baris jenisnya, dan satu garis turus ditulis. Setiap lima garis dikelompokkan dengan coretan miring." />
        <CatatData
          key={r}
          kategori={ro.hitung.map(([id]) => {
            const k = kat(ro.set, id);
            return { id, nama: k.nama, ikon: k.ikon, warna: k.warna };
          })}
          aliran={aliran(ro.hitung, r)}
          lambang="turus"
          onBeres={beres}
          pesanBeres="Semua data sudah dicatat dengan turus."
        />
      </>
    );
  });
}

function KartuBuatTurusA(d: PropsLangkah) {
  return Kartu(d, 3, "k2b8a-buatturus", "Hitung bendanya, lalu tekan tambah goresan sampai turusnya sama banyak. Tekan Periksa.", RONDE_TALLY_A.length, "Buat semua turusnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Buat turus dari benda" teks="Hitung bendanya satu per satu. Satu garis untuk satu benda. Garis kelima mencoret miring." />
      <BuatTally
        key={r}
        soal={RONDE_TALLY_A[r].map((s) => {
          const k = kat(s.set, s.k);
          return {
            visual: <Kumpulan ikon={k.ikon} n={k.n} ukuran={24} label={`${k.n} ${k.nama}`} />,
            tanya: `Hitung ${k.nama}, lalu buat turusnya.`,
            n: k.n,
            petunjuk: "Hitung bendanya satu per satu. Satu garis untuk satu benda.",
            pesan: `${Kapital(k.nama)} ada ${k.n}, ditulis ${teksKelompok(k.n)}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua turus sudah kamu buat."
      />
    </>
  ));
}

function KartuJodohBendaA(d: PropsLangkah) {
  return Kartu(d, 4, "k2b8a-jodohbenda", "Ketuk satu kelompok benda di kiri, lalu ketuk turus yang banyaknya sama di kanan.", RONDE_PASANG_CA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CA[r];
    const kanan = ro.hitung.map(([id], i) => ({ id, label: `Turus ${HURUF[i]}`, isi: <KartuTurus n={banyak(ro.set, id)} kecil /> }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan turus" teks="Hitung benda pada tiap kelompok. Jodohkan dengan turus yang banyaknya sama." />
        <PasangKartu
          key={r}
          kiri={ro.hitung.map(([id], i) => ({ id, label: `Kumpulan ${HURUF[i]}`, isi: <Kumpulan ikon={kat(ro.set, id).ikon} n={banyak(ro.set, id)} ukuran={22} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.hitung.map(([id]) => [id, id]))}
          petunjuk={() => "Belum cocok. Hitung bendanya, lalu hitung garis turusnya."}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan turusnya."
        />
      </>
    );
  });
}

function KartuMemoriBendaA(d: PropsLangkah) {
  return Kartu(d, 5, "k2b8a-memori", "Balik dua kartu. Cari kelompok benda dan turus yang banyaknya sama.", RONDE_MEMORI_CA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => {
    const set = RONDE_MEMORI_CA[r];
    return (
      <>
        <IgilBicara pendek="Memori benda dan turus" teks="Balik dua kartu. Cari kartu kelompok benda dan kartu turus yang banyaknya sama." />
        <MemoriKartu
          key={r}
          pasangan={DATA[set].kategori.map((k, i) => ({
            id: k.id,
            a: <Kumpulan ikon={k.ikon} n={k.n} ukuran={14} />,
            labelA: `kumpulan ${HURUF[i]}`,
            b: <KartuTurus n={k.n} kecil />,
            labelB: `turus ${k.n}`,
          }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    );
  });
}

function KartuPalingBendaA(d: PropsLangkah) {
  return Kartu(d, 6, "k2b8a-paling", "Hitung benda tiap kelompok. Ketuk kelompok yang paling banyak, lalu yang paling sedikit.", RONDE_PALING_CA.length, "Temukan semua kelompoknya dulu, ya.", (r, beres) => {
    const set = RONDE_PALING_CA[r];
    const item = DATA[set].kategori.map((k, i) => ({ id: k.id, label: `Kelompok ${HURUF[i]}`, isi: <Kumpulan ikon={k.ikon} n={k.n} ukuran={set === "hewan" ? 15 : 20} /> }));
    const banyakK = palingTunggal(set, "banyak");
    const sedikitK = palingTunggal(set, "sedikit");
    const soal = [
      { tanya: "Ketuk kelompok yang paling banyak.", jawab: banyakK?.id ?? "", petunjuk: "Belum tepat. Hitung semua kelompok, lalu cari yang terbanyak.", pesan: `Yang paling banyak adalah ${banyakK?.nama}, yaitu ${banyakK?.n}.` },
      { tanya: "Ketuk kelompok yang paling sedikit.", jawab: sedikitK?.id ?? "", petunjuk: "Belum tepat. Hitung semua kelompok, lalu cari yang tersedikit.", pesan: `Yang paling sedikit adalah ${sedikitK?.nama}, yaitu ${sedikitK?.n}.` },
    ];
    return (
      <>
        <IgilBicara pendek="Paling banyak, paling sedikit" teks="Hitung benda pada tiap kelompok. Cari kelompok yang paling banyak, lalu yang paling sedikit." />
        <KetukPilih key={r} item={item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua kelompok sudah kamu temukan." />
      </>
    );
  });
}

function KartuUrutBendaA(d: PropsLangkah) {
  return Kartu(d, 7, "k2b8a-urutbenda", "Hitung benda tiap kelompok. Ketuk kelompok satu per satu menurut urutan banyaknya.", RONDE_URUT_CA.length, "Urutkan semua kelompoknya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CA[r];
    const kunci = urutKategori(ro.set, ro.ids, ro.dari);
    const awal = kataAwal(ro.dari);
    const akhir = kataAkhir(ro.dari);
    return (
      <>
        <IgilBicara pendek={`Urutkan dari ${awal}`} teks={`Hitung benda pada tiap kelompok. Ketuk kelompok dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.ids, kunci, r).map((id) => ({ id, label: `Kelompok ${HURUF[ro.ids.indexOf(id)]}`, isi: <Kumpulan ikon={kat(ro.set, id).ikon} n={banyak(ro.set, id)} ukuran={ro.set === "buah" ? 22 : 18} /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Hitung bendanya, lalu bandingkan.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuLebihBendaA(d: PropsLangkah) {
  return Kartu(d, 8, "k2b8a-lebih", "Hitung dua kelompok benda. Atur penghitung sampai sama dengan selisihnya, lalu tekan Periksa.", RONDE_BEDA_CA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Lebihnya dan kurangnya" teks="Hitung benda pada dua kelompok. Cari berapa lebihnya kelompok yang lebih banyak." />
      <TulisAngka
        key={r}
        soal={RONDE_BEDA_CA[r].map((s) => {
          const a = kat(s.set, s.a);
          const b = kat(s.set, s.b);
          const sel = hasilBeda(s);
          return {
            visual: (
              <span className="flex items-start justify-center gap-3">
                <span className="flex flex-col items-center gap-0.5">
                  <Kumpulan ikon={a.ikon} n={a.n} ukuran={a.n > 8 ? 15 : 20} />
                  <span className="text-[11px] font-black text-[#1C01A5]">{a.nama}</span>
                </span>
                <span className="flex flex-col items-center gap-0.5">
                  <Kumpulan ikon={b.ikon} n={b.n} ukuran={b.n > 8 ? 15 : 20} />
                  <span className="text-[11px] font-black text-[#1C01A5]">{b.nama}</span>
                </span>
              </span>
            ),
            tanya: `Banyak ${a.nama} berapa lebihnya dari banyak ${b.nama}?`,
            jawab: sel,
            min: 0,
            max: 12,
            label: "lebihnya",
            petunjuk: `Hitung ${a.nama} dan ${b.nama}. Cari berapa benda yang tidak punya pasangan.`,
            pesan: `${Kapital(a.nama)} ${a.n} dan ${b.nama} ${b.n}. Banyak ${a.nama} ${sel} lebihnya dari banyak ${b.nama}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu temukan."
      />
    </>
  ));
}

function KartuSlotBendaA(d: PropsLangkah) {
  return Kartu(d, 9, "k2b8a-slot", "Ketuk kartu turus, lalu ketuk kotak benda yang banyaknya sama.", RONDE_SLOT_CA.length, "Taruh semua kartunya dulu, ya.", (r, beres) => {
    const ro = RONDE_SLOT_CA[r];
    const kartu = ro.hitung.map(([id], i) => {
      const k = kat(ro.set, id);
      return { id: `t-${id}`, label: `Turus ${HURUF[i]}`, isi: <KartuTurus n={k.n} kecil />, slot: id, petunjuk: "Belum tepat. Hitung garis turus, lalu hitung benda di kotak.", ucapan: `Turus ${k.n} cocok dengan ${k.n} ${k.nama}.` };
    });
    return (
      <>
        <IgilBicara pendek="Kartu turus ke kotak benda" teks="Hitung garis turus pada kartu. Taruh kartu di kotak yang banyak bendanya sama." />
        <LetakSlot
          key={r}
          item={urutanKe(kartu.length, r).map((i) => kartu[i])}
          slot={ro.hitung.map(([id], i) => {
            const k = kat(ro.set, id);
            return { id, label: Nm(ro.set, id), ikon: k.ikon.repeat(k.n), warna: WARNA_BIN[i] };
          })}
          onBeres={beres}
          pesanBeres="Semua kartu turus sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuBacaTurusA(d: PropsLangkah) {
  return Kartu(d, 10, "k2b8a-bacaturus", "Hitung kelompok lima dan garis sisa pada turus. Atur penghitung sampai sama, lalu tekan Periksa.", RONDE_BACA_PA.length, "Baca semua turusnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Baca turus" teks="Hitung garis turus. Satu kelompok lima ditandai coretan miring. Lalu tulis banyaknya." />
      <TulisAngka
        key={r}
        soal={RONDE_BACA_PA[r].map((s) => {
          const k = kat(s.set, s.k);
          return {
            visual: <KartuTurus n={k.n} />,
            tanya: `Turus ${DATA[s.set].judul.toLowerCase()}: ${k.nama}. Berapa banyaknya?`,
            jawab: k.n,
            min: 0,
            max: 14,
            label: "banyaknya",
            petunjuk: "Hitung kelompok lima dulu, lalu tambahkan garis yang tersisa.",
            pesan: `${Kapital(teksKelompok(k.n))}, jadi ${k.n}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua turus sudah kamu baca."
      />
    </>
  ));
}

const kartuKolom = (set: Parameters<typeof kat>[0]): number[] => {
  const n = DATA[set].kategori.map((k) => k.n);
  return [...new Set([...n, Math.max(...n) + 1, Math.max(1, Math.min(...n) - 1)])].sort((a, b) => a - b);
};

function KartuIsiBanyakA(d: PropsLangkah) {
  return Kartu(d, 11, "k2b8a-isibanyak", "Hitung turus pada baris yang menyala, lalu pilih kartu bilangannya.", RONDE_ISI_PA.length, "Lengkapi semua tabelnya dulu, ya.", (r, beres) => {
    const set = RONDE_ISI_PA[r];
    const ds = DATA[set];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kolom banyak" teks="Hitung turus pada baris yang menyala. Pilih kartu bilangan yang tepat untuk kolom banyaknya." />
        <IsiBanyak
          key={r}
          judul={`Diagram Turus ${ds.judul}`}
          kolom={[ds.kolom[0].split(" ")[0] === "Nama" ? "Nama" : ds.kolom[0], "Turus", "Banyak"]}
          baris={ds.kategori.map((k) => ({ id: k.id, nama: Kapital(k.nama), visual: <KartuTurus n={k.n} kecil />, jawab: k.n }))}
          kartu={kartuKolom(set)}
          onBeres={beres}
          pesanBeres="Kolom banyaknya sudah lengkap."
        />
      </>
    );
  });
}

function KartuGambarTurusA(d: PropsLangkah) {
  return Kartu(d, 12, "k2b8a-gambarturus", "Tambah goresan satu per satu sampai sama dengan bilangan yang diminta. Tekan Periksa.", RONDE_BUAT_PA.length, "Gambar semua turusnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Gambar turus" teks="Tulis satu garis untuk satu benda. Garis kelima mencoret miring." />
      <BuatTally
        key={r}
        soal={RONDE_BUAT_PA[r].map((n) => ({
          tanya: `Buat turus untuk ${n}.`,
          n,
          petunjuk: "Tulis satu garis untuk satu benda, dan coret miring pada garis kelima.",
          pesan: `${n} ditulis ${teksKelompok(n)}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua turus sudah kamu gambar."
      />
    </>
  ));
}

function KartuTurusTepatA(d: PropsLangkah) {
  return Kartu(d, 13, "k2b8a-turustepat", "Baca bilangan di pertanyaan. Hitung garis pada tiap turus, lalu ketuk yang tepat.", RONDE_TEPAT_PA.length, "Temukan semua turusnya dulu, ya.", (r, beres) => {
    const soal = RONDE_TEPAT_PA[r].map((n, i) => {
      const o = opsiTurus(n, r * 2 + i);
      return {
        tanya: `Ketuk turus yang menunjukkan ${n}.`,
        jawab: String(n),
        petunjuk: "Belum tepat. Hitung kelompok lima dulu, lalu garis yang tersisa.",
        pesan: `Benar, ${n} ditulis ${teksKelompok(n)}.`,
        item: o.map((x, j) => ({ id: String(x), label: `Turus ${HURUF[j]}`, isi: <KartuTurus n={x} kecil /> })),
      };
    });
    return (
      <>
        <CatatanTempel pendek="Turus yang tepat" teks="Baca bilangannya. Hitung garis pada tiap turus, lalu ketuk turus yang banyaknya sama." />
        <KetukPilih key={r} item={soal[0].item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua turus sudah kamu temukan." />
      </>
    );
  });
}

function KartuJodohTurusA(d: PropsLangkah) {
  return Kartu(d, 14, "k2b8a-jodohturus", "Ketuk satu turus di kiri, lalu ketuk bilangan yang sama di kanan.", RONDE_PASANG_PA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PA[r];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan turus dan bilangan" teks="Hitung garis pada tiap turus. Jodohkan dengan bilangan yang sama." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: `n${n}`, label: `Turus ${HURUF[i]}`, isi: <KartuTurus n={n} kecil /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`n${n}`, `n${n}`]))}
          petunjuk={() => "Belum cocok. Hitung kelompok lima dan garis yang tersisa."}
          onBeres={beres}
          pesanBeres="Semua turus sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuMemoriTurusA(d: PropsLangkah) {
  return Kartu(d, 15, "k2b8a-memoriturus", "Balik dua kartu. Cari turus dan bilangan yang sama.", RONDE_MEMORI_PA.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori turus dan bilangan" teks="Balik dua kartu. Cari kartu turus dan kartu bilangan yang sama." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PA[r].map((n, i) => ({
          id: String(n),
          a: <KartuTurus n={n} kecil />,
          labelA: `turus ${HURUF[i]}`,
          b: <span className="text-4xl font-black text-[#1C01A5]">{n}</span>,
          labelB: `bilangan ${n}`,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuKelompokLimaA(d: PropsLangkah) {
  return Kartu(d, 16, "k2b8a-kelompoklima", "Hitung kelompok lima pada turus dan garis sisanya. Pilih kalimat yang tepat.", RONDE_KELOMPOK_PA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Kelompok lima dan sisa" teks="Setiap lima garis dikelompokkan dengan coretan miring. Hitung kelompoknya, lalu garis yang tersisa." />
      <PilihBertahap
        key={r}
        soal={RONDE_KELOMPOK_PA[r].map((n, i) => {
          const { opsi, jawab } = opsiKelompok(n, r * 2 + i);
          return {
            visual: <KartuTurus n={n} />,
            tanya: "Ada berapa kelompok lima dan berapa garis sisa?",
            opsi,
            jawab,
            petunjuk: "Belum tepat. Satu coretan miring menandai satu kelompok lima. Hitung kelompoknya, lalu garis sisanya.",
            pesan: `${Kapital(teksKelompok(n))}. Jumlahnya ${n}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua turus sudah kamu kelompokkan."
      />
    </>
  ));
}

function KartuUrutTurusA(d: PropsLangkah) {
  return Kartu(d, 17, "k2b8a-urutturus", "Hitung garis tiap turus. Ketuk turus satu per satu menurut urutan banyaknya.", RONDE_URUT_PA.length, "Urutkan semua turusnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_PA[r];
    const kunci = urutAngka(ro.angka, ro.dari).map(String);
    const awal = kataAwal(ro.dari);
    const akhir = kataAkhir(ro.dari);
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari ${awal}`} teks={`Hitung garis tiap turus. Ketuk turus dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: `Turus ${HURUF[ro.angka.indexOf(Number(x))]}`, isi: <KartuTurus n={Number(x)} kecil /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Hitung dulu kelompok lima dan garisnya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPilahTurusA(d: PropsLangkah) {
  return Kartu(d, 18, "k2b8a-pilahturus", "Turus dengan coretan miring berarti lima atau lebih. Pilah tiap turus ke kotak yang tepat.", RONDE_SORTIR_PA.length, "Pilah semua turusnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah turus" teks="Turus yang punya coretan miring berarti lima atau lebih. Pilah setiap turus ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={110}
        item={urutanKe(RONDE_SORTIR_PA[r].length, r).map((i) => {
          const n = RONDE_SORTIR_PA[r][i];
          return {
            id: String(n),
            label: `Turus ${HURUF[i]}`,
            isi: <KartuTurus n={n} kecil />,
            bin: n < 5 ? "kurang" : "lima",
            petunjuk: `Belum tepat. Turus ini ${n < 5 ? "belum punya coretan miring" : "sudah punya coretan miring"}.`,
            ucapan: `${Kapital(teksKelompok(n))}, jadi ${n} ${n < 5 ? "kurang dari lima" : "lima atau lebih"}.`,
          };
        })}
        bin={[
          { id: "kurang", label: "Kurang dari 5", warna: "#BAE6FD" },
          { id: "lima", label: "5 atau lebih", warna: "#FDE68A" },
        ]}
        onBeres={beres}
        pesanBeres="Semua turus sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuGarisLebihA(d: PropsLangkah) {
  return Kartu(d, 19, "k2b8a-garislebih", "Baca banyak data awal. Lalu ketuk banyak data yang diminta pada garis bilangan.", RONDE_LEBIH_PA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Lebihnya dan kurangnya pada garis" teks="Baca banyak data awal. Hitung maju untuk lebihnya dan mundur untuk kurangnya pada garis bilangan." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_LEBIH_PA[r].map((s, i) => {
          const jawab = hasilLebih(s);
          const [dari, sampai] = jendelaGaris(banyak(s.set, s.dari), jawab, r * 2 + i);
          return {
            tanya: tanyaLebih(s),
            dari,
            sampai,
            jawab,
            petunjuk: s.jenis === "lebih" ? "Belum tepat. Hitung maju dari banyak data awal." : "Belum tepat. Hitung mundur dari banyak data awal.",
            pesan: `${Kapital(nm(s.set, s.ke))} ada ${jawab}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu temukan."
      />
    </>
  ));
}

/* ------------------------------ Abstract ------------------------------ */

function KartuJodohNamaA(d: PropsLangkah) {
  return Kartu(d, 20, "k2b8a-jodohnama", "Ketuk satu nama di kiri, lalu ketuk bilangan banyaknya di kanan.", RONDE_PASANG_QA.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QA[r];
    const ds = DATA[ro.set];
    const kanan = ro.hitung.map(([id]) => ({ id, label: String(banyak(ro.set, id)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan nama dan banyaknya" teks={`Data: ${ds.judul}. Baca kalimat data, lalu jodohkan nama dengan banyaknya.`} />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]">{ro.hitung.map(([id]) => `${Kapital(nm(ro.set, id))} ${kataAngka(banyak(ro.set, id))}`).join(" • ")}</p>
        <PasangKartu
          key={r}
          kiri={ro.hitung.map(([id]) => ({ id, label: Nm(ro.set, id), isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.hitung.map(([id]) => [id, id]))}
          petunjuk={() => "Belum cocok. Baca lagi kalimat datanya."}
          onBeres={beres}
          pesanBeres="Semua nama sudah cocok dengan banyaknya."
        />
      </>
    );
  });
}

function KartuKalimatDataA(d: PropsLangkah) {
  return Kartu(d, 21, "k2b8a-kalimat", "Lengkapi tiap kalimat dengan bilangan yang tepat sesuai diagram turus.", RONDE_KALIMAT_QA.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const ds = DATA[RONDE_KALIMAT_QA[r][0].set];
    return (
      <>
        <CatatanPensil pendek="Lengkapi kalimat data" teks={`Data: ${ds.judul}. Baca datanya, lalu pilih bilangan yang tepat untuk bagian kosong.`} />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]">{ds.kategori.map((k) => `${Kapital(k.nama)} ${k.n}`).join(" • ")}</p>
        <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QA[r].map((s, i) => kalimatIsianData(s.set, s.k, r * 3 + i))} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuSusunDataA(d: PropsLangkah) {
  return Kartu(d, 22, "k2b8a-susun", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUN_QA.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kalimat data" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUN_QA[r].kata} pengecoh={RONDE_SUSUN_QA[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

function KartuTabelTurusA(d: PropsLangkah) {
  return Kartu(d, 23, "k2b8a-tabel", "Baca kalimat data yang ditulis dengan kata. Ketuk baris tabel, lalu ketuk kartu bilangannya.", RONDE_TABEL_QA.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QA[r];
    const set = (["hewan", "sayur", "warna"] as const)[r];
    return (
      <>
        <CatatanPensil pendek="Isi tabel turus" teks="Baca data yang ditulis dengan kata. Ketuk baris tabel, lalu ketuk kartu bilangan yang tepat." />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]">{DATA[set].kategori.map((k) => `${Kapital(k.nama)} ${kataAngka(k.n)}`).join(" • ")}</p>
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Baca lagi data untuk ${b.label}, lalu pilih bilangannya.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuBenarSalahDataA(d: PropsLangkah) {
  return Kartu(d, 24, "k2b8a-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QA.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang diagram turus dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QA[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifDataA(d: PropsLangkah) {
  return Kartu(d, 25, "k2b8a-detektif", "Baca semua petunjuk dan data. Pilih nama yang cocok dengan semuanya.", RONDE_DETEKTIF_QA.length, "Tebak dulu aku siapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QA[r];
    const ds = DATA[s.set];
    const idxJawab = s.opsi.indexOf(s.jawab);
    return (
      <>
        <CatatanPensil pendek="Detektif data" teks={`Data: ${ds.judul}. Baca semua petunjuk. Pilih nama yang cocok dengan semuanya.`} />
        <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]">{ds.kategori.map((k) => `${Kapital(k.nama)} ${k.n}`).join(" • ")}</p>
        <DetektifTeks
          key={r}
          soal={{
            petunjuk: s.klue.map((k) => teksKlue(s.set, k)),
            opsi: s.opsi.map((id) => Nm(s.set, id)),
            jawab: idxJawab,
            salah: `Periksa tiap petunjuk satu per satu. Hanya ${nm(s.set, s.jawab)} yang cocok dengan semuanya.`,
          }}
          onBeres={beres}
          pesanBeres={(nama) => `Benar, aku ${nama.toLowerCase()}.`}
        />
      </>
    );
  });
}

function KartuPetaKonsepTurusA(d: PropsLangkah) {
  return Kartu(d, 26, "k2b8a-konsep", "Lengkapi peta konsep diagram turus. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QA.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QA[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuUrutDataA(d: PropsLangkah) {
  return Kartu(d, 27, "k2b8a-urutdata", "Ketuk nama satu per satu menurut urutan banyaknya.", RONDE_URUT_QA.length, "Urutkan semua datanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_QA[r];
    const kunci = urutKategori(ro.set, ro.ids, ro.dari);
    const awal = kataAwal(ro.dari);
    const akhir = kataAkhir(ro.dari);
    return (
      <>
        <CatatanPensil pendek={`Urutkan dari ${awal}`} teks={`Ketuk nama dari yang ${awal} sampai yang ${akhir}. Lihat angka di belakang nama.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.ids, kunci, r).map((id) => ({ id, label: `${Nm(ro.set, id)} ${banyak(ro.set, id)}` }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan angkanya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuSemuaDataA(d: PropsLangkah) {
  return Kartu(d, 28, "k2b8a-semua", "Ketuk semua data yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_QA.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_SEMUA_QA[r];
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang cocok" teks={`${tanyaSemua(s)} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanyaSemua(s)}
          item={DATA[s.set].kategori.map((k) => ({ id: k.id, label: `${Kapital(k.nama)} ${k.n}`, benar: cocokSemua(k.id, s), penjelasan: `${Kapital(k.nama)} ada ${k.n}. ${cocokSemua(k.id, s) ? "Ini cocok." : "Ini belum cocok."} Baca lagi perintahnya.` }))}
          onBeres={beres}
          pesanBeres="Semua data yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuJumlahDataA(d: PropsLangkah) {
  return Kartu(d, 29, "k2b8a-jumlah", "Jumlahkan banyak data yang diminta. Atur penghitung sampai sama dengan jumlahnya, lalu tekan Periksa.", RONDE_JUMLAH_QA.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Hitung jumlah data" teks="Baca datanya, lalu jumlahkan banyak data yang diminta." />
      <TulisAngka
        key={r}
        soal={RONDE_JUMLAH_QA[r].map((s) => {
          const ds = DATA[s.set];
          const jml = hasilJumlah(s);
          return {
            visual: <span className="block rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]">{ds.kategori.map((k) => `${Kapital(k.nama)} ${k.n}`).join(" • ")}</span>,
            tanya: tanyaJumlah(s),
            jawab: jml,
            min: 0,
            max: 30,
            label: "jumlahnya",
            petunjuk: "Ambil banyak data yang diminta saja, lalu jumlahkan satu per satu.",
            pesan: `${s.ids.map((id) => banyak(s.set, id)).join(" ditambah ")} sama dengan ${jml}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jumlah data sudah kamu temukan."
      />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuSortirA, KartuHitungJenisA, KartuCatatA, KartuBuatTurusA, KartuJodohBendaA, KartuMemoriBendaA, KartuPalingBendaA, KartuUrutBendaA, KartuLebihBendaA, KartuSlotBendaA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBacaTurusA, KartuIsiBanyakA, KartuGambarTurusA, KartuTurusTepatA, KartuJodohTurusA, KartuMemoriTurusA, KartuKelompokLimaA, KartuUrutTurusA, KartuPilahTurusA, KartuGarisLebihA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuJodohNamaA, KartuKalimatDataA, KartuSusunDataA, KartuTabelTurusA, KartuBenarSalahDataA, KartuDetektifDataA, KartuPetaKonsepTurusA, KartuUrutDataA, KartuSemuaDataA, KartuJumlahDataA].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK2B8A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Kelompokkan dan catat!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B8A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat turus dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B8A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A8} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
