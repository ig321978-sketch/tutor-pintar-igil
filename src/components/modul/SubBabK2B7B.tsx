"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { GarisAngkaGame, KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { LangkahMaju, PapanDigit, SusunDuaKartu, TabelSeratus } from "./mesin-k2b7";
import { Capung, KoleksiDari } from "./dasar-k2b7";
import { DuaPapan, ModelDari, PapanBilangan, StripAngka } from "./diagram-k2b7";
import {
  BENDA_INFO, PETA_KONSEP_B, RONDE_AKU_QB, RONDE_ANTARA_B, RONDE_BANDING_B, RONDE_BANDINGPAPAN_PB, RONDE_BENARSALAH_QB, RONDE_DETEKTIF_QB, RONDE_DIGIT_QB, RONDE_GARIS_PB,
  RONDE_KALIMAT_QB, RONDE_KARTU_B, RONDE_LANGKAH_B, RONDE_LANGKAH_PB, RONDE_MEMORI_B, RONDE_MEMORI_PB, RONDE_MODELBESAR_PB, RONDE_PALING_B, RONDE_PASANGBANDING_B, RONDE_PILAH_B,
  RONDE_PILAHMODEL_PB, RONDE_SEMUA_B, RONDE_SEMUA_PB, RONDE_SEMUA_QB, RONDE_SIMBOL_PB, RONDE_SUSUN_QB, RONDE_TABEL_QB, RONDE_TABELSERATUS_PB, RONDE_URUTANGKA_QB, RONDE_URUTPAPAN_PB, RONDE_URUT_B,
  banding, cocokAcuan, hasilAku, hasilDigit, hasilGaris, jendela, jendelaDua, kalimatBanding, kalimatIsianBanding, kataPS, opsiBandingAnak, opsiBandingHuruf, opsiBilangan, tanda, tanyaGaris, teksKlue,
  teksAku, urutBilangan, urutTampil, urutanTetap, type BendaId,
} from "./data-k2b7";
import { visualInfografisK2B7B } from "./infografis-k2b7";
import { SUB_B7 } from "./naskah-k2b7";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 7 Sub-Bab B: Membandingkan Bilangan. Tiga puluh permainan,      */
/* sepuluh per tahap.                                                          */
/*  Concrete 1 Maju dan Mundur  2 Di Mana Aku?  3 Siapa Lebih Banyak?           */
/*           4 Paling Banyak dan Sedikit  5 Susun Dua Kartu  6 Urutkan Kantong   */
/*           7 Jodohkan Kiri Kanan  8 Memori  9 Pilah terhadap Acuan  10 Semua    */
/*  Picture  11 Garis Bilangan  12 Bandingkan Papan  13 Urutkan Papan           */
/*           14 Model Terbesar  15 Pilah Model  16 Papan dan Tanda  17 Tetangga   */
/*           18 Langkah Diagram  19 Memori Papan  20 Semua Model                 */
/*  Abstract 21 Kalimat  22 Benar Salah  23 Susun Kalimat  24 Aku Bilangan        */
/*           25 Tabel  26 Dua Angka  27 Detektif  28 Peta  29 Urutkan  30 Semua    */
/* Naskah: naskah-k2b7.ts (SUB_B7). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_B7.games.map((g) => g.title);
const TOTAL = 10;
const HURUF = ["A", "B", "C", "D", "E", "F"];
const BENDA_B: BendaId[] = ["kelereng", "rambutan", "kue"];

const SUARA_INFO =
  "Ini poster rangkuman tentang membandingkan bilangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B7BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B7} judul="Membandingkan Bilangan" suaraInfo={SUARA_INFO} visual={visualInfografisK2B7B()} speakGuru={speakGuru} />;
}

type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
  return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={TOTAL} isi={isi} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const kupu = <span className="text-2xl leading-none" role="img" aria-label="Kupu-kupu">🦋</span>;
const bulatan = <span className="block h-5 w-5 rounded-full border-4 border-[#1C01A5] bg-[#F0AB00]" aria-hidden="true" />;

/* ------------------------------ Concrete ------------------------------ */

function KartuLangkahB(d: PropsLangkah) {
  return Kartu(d, 0, "k2b7b-langkah", "Baca perintah di atas garis angka. Tekan Maju atau Mundur satu langkah demi satu langkah sampai di bilangan tujuan.", RONDE_LANGKAH_B.length, "Selesaikan semua langkahnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Maju dan mundur" teks="Kupu-kupu dan capung berjalan di garis angka. Tekan maju untuk menghitung maju, dan mundur untuk menghitung mundur, sesuai perintah." />
      <LangkahMaju key={r} soal={RONDE_LANGKAH_B[r]} penanda={(s) => (s.arah === "maju" ? kupu : <Capung ukuran={26} />)} onBeres={beres} pesanBeres="Semua langkah sudah benar." />
    </>
  ));
}

function KartuAntaraB(d: PropsLangkah) {
  return Kartu(d, 1, "k2b7b-antara", "Baca di antara dua bilangan mana capung berada. Ketuk bilangan tempat capung pada garis angka.", RONDE_ANTARA_B.length, "Temukan semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Di mana aku?" teks="Capung berada di antara dua bilangan. Ketuk bilangan tempat capung pada garis angka." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_ANTARA_B[r].map(([a, c], i) => {
          const jawab = (a + c) / 2;
          const [dari, sampai] = jendela(jawab, r * 3 + i);
          return {
            visual: <StripAngka dari={dari} sampai={sampai} tandai={jawab} sembunyi={[jawab]} penanda={<Capung ukuran={26} />} />,
            tanya: `Capung berada di antara ${a} dan ${c}. Ketuk bilangan tempat capung.`,
            dari,
            sampai,
            jawab,
            petunjuk: `Belum tepat. Cari bilangan yang urutannya setelah ${a} dan sebelum ${c}.`,
            pesan: `Capung berada di ${jawab}, di antara ${a} dan ${c}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah ketemu."
      />
    </>
  ));
}

const soalBandingB = (r: number): SoalBertahap[] =>
  RONDE_BANDING_B[r].map((s, i) => {
    const o = opsiBandingAnak(s, r * 2 + i);
    const benda = BENDA_B[r];
    return {
      visual: (
        <div className="grid w-full grid-cols-2 gap-2">
          {[[s.namaA, s.a], [s.namaB, s.b]].map(([nama, n]) => (
            <div key={nama as string} className="flex flex-col items-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
              <span className="text-sm font-black text-[#1C01A5]">{nama}</span>
              <KoleksiDari n={n as number} benda={benda} ukuran={38} />
            </div>
          ))}
        </div>
      ),
      tanya: `${BENDA_INFO[benda].nama} siapa yang lebih banyak?`.replace(/^./, (c) => c.toUpperCase()),
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Bandingkan puluhannya dulu. Bila puluhannya sama, bandingkan satuannya.",
      pesan: kalimatBanding(s.a, s.b),
    };
  });

function KartuBandingB(d: PropsLangkah) {
  return Kartu(d, 2, "k2b7b-banding", "Lihat kantong penuh dan benda lepas milik dua anak. Bandingkan puluhannya dulu, lalu pilih siapa yang lebih banyak.", RONDE_BANDING_B.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Siapa lebih banyak?" teks="Dua anak punya benda yang banyaknya berbeda. Bandingkan kantong penuh lebih dulu, lalu benda yang lepas." />
      <PilihBertahap key={r} soal={soalBandingB(r)} onBeres={beres} pesanBeres="Semua perbandingan sudah benar." />
    </>
  ));
}

function KartuPalingB(d: PropsLangkah) {
  return Kartu(d, 3, "k2b7b-paling", "Hitung puluhan tiap kumpulan. Ketuk kumpulan yang paling banyak, lalu yang paling sedikit.", RONDE_PALING_B.length, "Temukan semua kumpulannya dulu, ya.", (r, beres) => {
    const angka = RONDE_PALING_B[r];
    const maks = Math.max(...angka);
    const min = Math.min(...angka);
    const item = angka.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <KoleksiDari n={n} benda={BENDA_B[r]} ukuran={38} /> }));
    return (
      <>
        <IgilBicara pendek="Paling banyak, paling sedikit" teks="Bandingkan banyak puluhan tiap kumpulan. Ketuk kumpulan yang paling banyak, lalu yang paling sedikit." />
        <KetukPilih
          key={r}
          item={item}
          kolom={3}
          soal={[
            { tanya: "Ketuk kumpulan yang paling banyak.", jawab: String(maks), petunjuk: "Belum yang paling banyak. Bandingkan banyak puluhan dulu.", pesan: `Kumpulan ${HURUF[angka.indexOf(maks)]}, yaitu ${maks}, paling banyak.` },
            { tanya: "Ketuk kumpulan yang paling sedikit.", jawab: String(min), petunjuk: "Belum yang paling sedikit. Cari puluhan yang paling sedikit.", pesan: `Kumpulan ${HURUF[angka.indexOf(min)]}, yaitu ${min}, paling sedikit.` },
          ]}
          onBeres={beres}
          pesanBeres="Yang paling banyak dan paling sedikit sudah ketemu."
        />
      </>
    );
  });
}

function KartuDuaKartuB(d: PropsLangkah) {
  return Kartu(d, 4, "k2b7b-kartu", "Ketuk kartu angka, lalu ketuk tempat puluhan atau satuan. Susun bilangan yang diminta.", RONDE_KARTU_B.length, "Susun semua kartunya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Susun dua kartu" teks="Susun dua kartu angka pada papan nilai tempat. Buat bilangan paling besar atau paling kecil sesuai perintah." />
      <SusunDuaKartu key={r} soal={RONDE_KARTU_B[r]} onBeres={beres} pesanBeres="Kartu sudah tersusun dengan benar." />
    </>
  ));
}

function KartuUrutKantongB(d: PropsLangkah) {
  return Kartu(d, 5, "k2b7b-urutkantong", "Hitung banyak benda di tiap kantong. Ketuk kantong satu per satu menurut urutan banyaknya.", RONDE_URUT_B.length, "Urutkan semua kantongnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_B[r];
    const kunci = urutBilangan(ro.angka, ro.dari).map(String);
    const awal = ro.dari === "kecil" ? "paling sedikit" : "paling banyak";
    const akhir = ro.dari === "kecil" ? "paling banyak" : "paling sedikit";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari ${awal}`} teks={`Hitung banyak benda di tiap kantong. Ketuk kantong dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: `Kantong ${HURUF[ro.angka.indexOf(Number(x))]}`, isi: <KoleksiDari n={Number(x)} benda={BENDA_B[r]} ukuran={36} /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan banyak puluhan dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPasangB(d: PropsLangkah) {
  return Kartu(d, 6, "k2b7b-pasang", "Ketuk satu pasangan kumpulan di kiri, lalu ketuk pernyataan yang cocok di kanan.", RONDE_PASANGBANDING_B.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANGBANDING_B[r];
    const kata = { "lebih besar": "kiri lebih banyak", "lebih kecil": "kanan lebih banyak", "sama dengan": "sama banyak" } as const;
    const kanan = ro.map(([a, b]) => ({ id: banding(a, b), label: kata[banding(a, b)], isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan kiri dan kanan" teks="Setiap pasangan punya dua kumpulan benda. Bandingkan, lalu jodohkan dengan pernyataan yang cocok." />
        <PasangKartu
          key={r}
          kiri={ro.map(([a, b], i) => ({
            id: banding(a, b),
            label: `Pasangan ${HURUF[i]}`,
            isi: (
              <span className="flex items-center gap-1">
                <KoleksiDari n={a} benda={BENDA_B[r]} ukuran={32} />
                <span className="text-lg font-black text-[#1C01A5]">|</span>
                <KoleksiDari n={b} benda={BENDA_B[r]} ukuran={32} />
              </span>
            ),
          }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map(([a, b]) => [banding(a, b), banding(a, b)]))}
          petunjuk={() => "Belum cocok. Bandingkan banyak puluhan di kiri dan di kanan. Bila puluhannya sama, bandingkan satuannya."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok."
        />
      </>
    );
  });
}

function KartuMemoriB(d: PropsLangkah) {
  return Kartu(d, 7, "k2b7b-memori", "Balik dua kartu. Cari kumpulan benda dan lambang bilangan yang banyaknya sama.", RONDE_MEMORI_B.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Memori banyak benda" teks="Balik dua kartu. Cari kartu kumpulan benda dan kartu bilangan yang banyaknya sama." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_B[r].map((n, i) => ({
          id: String(n),
          a: <KoleksiDari n={n} benda={BENDA_B[r]} ukuran={34} />,
          labelA: `kumpulan ${HURUF[i]}`,
          b: <span className="text-4xl font-black text-[#1C01A5]">{n}</span>,
          labelB: `bilangan ${n}`,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuPilahAcuanB(d: PropsLangkah) {
  return Kartu(d, 8, "k2b7b-pilah", "Bandingkan banyak tiap kumpulan dengan bilangan acuan. Seret atau ketuk kumpulan ke kotak yang tepat.", RONDE_PILAH_B.length, "Pilah semua kumpulannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PILAH_B[r];
    return (
      <>
        <IgilBicara pendek={`Acuan: ${ro.acuan}`} teks={`Bilangan acuan kita ${ro.acuan}. Pilah setiap kumpulan: lebih dari ${ro.acuan}, atau kurang dari ${ro.acuan}.`} />
        <Sortir
          key={r}
          lebarItem={108}
          item={urutanKe(ro.angka.length, r).map((i) => {
            const n = ro.angka[i];
            const lebih = n > ro.acuan;
            return {
              id: String(n),
              label: `Kumpulan ${HURUF[i]}`,
              isi: <KoleksiDari n={n} benda={BENDA_B[r]} ukuran={36} />,
              bin: lebih ? "lebih" : "kurang",
              petunjuk: `Belum tepat. Kumpulan ini ${kataPS(n)}, yaitu ${n}. Bandingkan dengan ${ro.acuan}.`,
              ucapan: `${n} ${lebih ? "lebih besar dari" : "lebih kecil dari"} ${ro.acuan}.`,
            };
          })}
          bin={[
            { id: "lebih", label: `Lebih dari ${ro.acuan}`, warna: "#FDE68A", ikon: "⬆️" },
            { id: "kurang", label: `Kurang dari ${ro.acuan}`, warna: "#BAE6FD", ikon: "⬇️" },
          ]}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuSemuaB(d: PropsLangkah) {
  return Kartu(d, 9, "k2b7b-semua", "Ketuk semua kumpulan yang memenuhi perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_B.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_SEMUA_B[r];
    const tanya = `Ketuk semua kumpulan yang ${s.arah === "lebih" ? "lebih" : "kurang"} dari ${s.acuan}.`;
    return (
      <>
        <IgilBicara pendek={`Lebih atau kurang dari ${s.acuan}`} teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={s.angka.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <KoleksiDari n={n} benda={BENDA_B[r]} ukuran={30} />, benar: cocokAcuan(n, s), penjelasan: `Kumpulan ${HURUF[i]} ada ${n}. ${kalimatBanding(n, s.acuan)}` }))}
          onBeres={beres}
          pesanBeres="Semua kumpulan yang memenuhi sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuGarisPB(d: PropsLangkah) {
  return Kartu(d, 10, "k2b7b-garis", "Baca perintah, lalu ketuk bilangan yang tepat pada garis bilangan. Maju untuk lebihnya, mundur untuk kurangnya.", RONDE_GARIS_PB.length, "Tandai semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Garis bilangan" teks="Baca perintah, lalu ketuk bilangan yang tepat pada garis bilangan. Maju untuk lebihnya dan mundur untuk kurangnya." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_GARIS_PB[r].map((s, i) => {
          const jawab = hasilGaris(s);
          const [dari, sampai] = s.jenis === "antara" ? jendela(jawab, r * 3 + i + 1) : jendelaDua(s.n, jawab, r * 3 + i + 1);
          return { tanya: tanyaGaris(s), dari, sampai, jawab, petunjuk: s.jenis === "antara" ? "Belum tepat. Bilangan itu urutannya setelah yang pertama dan sebelum yang kedua." : s.jenis === "lebih" ? "Belum tepat. Hitung maju satu langkah demi satu langkah." : "Belum tepat. Hitung mundur satu langkah demi satu langkah.", pesan: `Jawabannya ${jawab}.` };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tandai."
      />
    </>
  ));
}

const soalBandingPapanPB = (r: number): SoalBertahap[] =>
  RONDE_BANDINGPAPAN_PB[r].map(([a, b], i) => {
    const o = opsiBandingHuruf(a, b, r * 2 + i);
    return {
      visual: <DuaPapan a={a} b={b} />,
      tanya: "Bagaimana papan A dan papan B?",
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Bandingkan angka puluhan dulu. Bila sama, bandingkan angka satuan.",
      pesan: kalimatBanding(a, b),
    };
  });

function KartuBandingPapanPB(d: PropsLangkah) {
  return Kartu(d, 11, "k2b7b-papan", "Lihat dua papan nilai tempat. Bandingkan puluhan dulu, lalu satuan, dan pilih pernyataan yang tepat.", RONDE_BANDINGPAPAN_PB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Bandingkan dua papan" teks="Lihat dua papan nilai tempat. Bandingkan puluhan dulu, lalu satuan, dan pilih pernyataan yang tepat." />
      <PilihBertahap key={r} soal={soalBandingPapanPB(r)} onBeres={beres} pesanBeres="Semua papan sudah kamu bandingkan." />
    </>
  ));
}

function KartuUrutPapanPB(d: PropsLangkah) {
  return Kartu(d, 12, "k2b7b-urutpapan", "Bandingkan bilangan pada tiap papan. Ketuk papan satu per satu menurut urutan.", RONDE_URUTPAPAN_PB.length, "Urutkan semua papannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTPAPAN_PB[r];
    const kunci = urutBilangan(ro.angka, ro.dari).map(String);
    const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
    const akhir = ro.dari === "kecil" ? "terbesar" : "terkecil";
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari yang ${awal}`} teks={`Bandingkan bilangan pada tiap papan. Ketuk papan dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: `Papan ${HURUF[ro.angka.indexOf(Number(x))]}`, isi: <PapanBilangan n={Number(x)} kecil /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan angka puluhan dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuModelBesarPB(d: PropsLangkah) {
  return Kartu(d, 13, "k2b7b-modelbesar", "Hitung batang puluhan dan kotak satuan tiap model. Ketuk model yang terbesar, lalu yang terkecil.", RONDE_MODELBESAR_PB.length, "Temukan semua modelnya dulu, ya.", (r, beres) => {
    const angka = RONDE_MODELBESAR_PB[r];
    const maks = Math.max(...angka);
    const min = Math.min(...angka);
    return (
      <>
        <CatatanTempel pendek="Model terbesar dan terkecil" teks="Hitung batang puluhan dan kotak satuan tiap model. Ketuk model yang terbesar, lalu yang terkecil." />
        <KetukPilih
          key={r}
          item={angka.map((n, i) => ({ id: String(n), label: `Model ${HURUF[i]}`, isi: <ModelDari n={n} skala={0.6} /> }))}
          kolom={3}
          soal={[
            { tanya: "Ketuk model yang terbesar.", jawab: String(maks), petunjuk: "Belum yang terbesar. Bandingkan banyak batang puluhan dulu.", pesan: `Model ${HURUF[angka.indexOf(maks)]}, yaitu ${maks}, terbesar.` },
            { tanya: "Ketuk model yang terkecil.", jawab: String(min), petunjuk: "Belum yang terkecil. Cari batang puluhan yang paling sedikit.", pesan: `Model ${HURUF[angka.indexOf(min)]}, yaitu ${min}, terkecil.` },
          ]}
          onBeres={beres}
          pesanBeres="Yang terbesar dan terkecil sudah ketemu."
        />
      </>
    );
  });
}

function KartuPilahModelPB(d: PropsLangkah) {
  return Kartu(d, 14, "k2b7b-pilahmodel", "Bandingkan tiap model dengan bilangan acuan. Seret atau ketuk model ke kotak yang tepat.", RONDE_PILAHMODEL_PB.length, "Pilah semua modelnya dulu, ya.", (r, beres) => {
    const ro = RONDE_PILAHMODEL_PB[r];
    return (
      <>
        <CatatanTempel pendek={`Acuan: ${ro.acuan}`} teks={`Bilangan acuan kita ${ro.acuan}. Pilah setiap model: lebih besar dari ${ro.acuan}, atau lebih kecil dari ${ro.acuan}.`} />
        <Sortir
          key={r}
          lebarItem={104}
          item={urutanKe(ro.angka.length, r).map((i) => {
            const n = ro.angka[i];
            const lebih = n > ro.acuan;
            return { id: String(n), label: `Model ${HURUF[i]}`, isi: <ModelDari n={n} skala={0.5} />, bin: lebih ? "lebih" : "kurang", petunjuk: `Belum tepat. Model ini ${kataPS(n)}, yaitu ${n}. Bandingkan dengan ${ro.acuan}.`, ucapan: `${n} ${lebih ? "lebih besar dari" : "lebih kecil dari"} ${ro.acuan}.` };
          })}
          bin={[
            { id: "lebih", label: `Lebih dari ${ro.acuan}`, warna: "#FDE68A" },
            { id: "kurang", label: `Kurang dari ${ro.acuan}`, warna: "#BAE6FD" },
          ]}
          onBeres={beres}
          pesanBeres="Semua model sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

function KartuSimbolPB(d: PropsLangkah) {
  return Kartu(d, 15, "k2b7b-simbol", "Ketuk satu pasang papan di kiri, lalu ketuk kartu tanda yang tepat di kanan. Tanda terbuka ke arah bilangan yang lebih besar.", RONDE_SIMBOL_PB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_SIMBOL_PB[r];
    const kanan = ro.map(([a, b]) => ({ id: tanda(a, b), label: `A ${tanda(a, b)} B`, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan papan dan tanda" teks="Bandingkan papan A dan papan B. Jodohkan dengan tanda yang tepat. Tanda terbuka ke arah bilangan yang lebih besar." />
        <PasangKartu
          key={r}
          kiri={ro.map(([a, b]) => ({
            id: tanda(a, b),
            label: `Papan ${a} dan ${b}`,
            isi: (
              <span className="flex items-center gap-1">
                <PapanBilangan n={a} kecil />
                <PapanBilangan n={b} kecil />
              </span>
            ),
          }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map(([a, b]) => [tanda(a, b), tanda(a, b)]))}
          petunjuk={() => "Belum cocok. Papan A di kiri dan papan B di kanan. Tanda terbuka ke arah bilangan yang lebih besar."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan tandanya."
        />
      </>
    );
  });
}

function KartuTetanggaPB(d: PropsLangkah) {
  return Kartu(d, 16, "k2b7b-tetangga", "Isi kotak yang menyala pada tabel bilangan. Lihat bilangan di kiri dan kanannya.", RONDE_TABELSERATUS_PB.length, "Lengkapi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Tetangga di tabel seratus" teks="Isi kotak yang menyala pada tabel bilangan. Lihat bilangan di kiri dan di kanannya." />
      <TabelSeratus key={r} tersembunyi={RONDE_TABELSERATUS_PB[r]} nomorAwal={r * 3 + 1} onBeres={beres} pesanBeres="Tabel sudah lengkap." />
    </>
  ));
}

function KartuLangkahPB(d: PropsLangkah) {
  return Kartu(d, 17, "k2b7b-langkahdiagram", "Bulatan berada di sebuah bilangan. Tekan Maju atau Mundur satu langkah demi satu langkah sesuai perintah.", RONDE_LANGKAH_PB.length, "Selesaikan semua langkahnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Langkah pada garis diagram" teks="Bulatan berada di sebuah bilangan. Tekan maju atau mundur satu langkah demi satu langkah sesuai perintah." />
      <LangkahMaju key={r} soal={RONDE_LANGKAH_PB[r]} penanda={bulatan} onBeres={beres} pesanBeres="Semua langkah sudah benar." />
    </>
  ));
}

function KartuMemoriPB(d: PropsLangkah) {
  return Kartu(d, 18, "k2b7b-memoripapan", "Balik dua kartu. Cari papan nilai tempat dan lambang bilangan yang sama.", RONDE_MEMORI_PB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori papan dan bilangan" teks="Balik dua kartu. Cari papan nilai tempat dan lambang bilangan yang sama." />
      <MemoriKartu
        key={r}
        pasangan={RONDE_MEMORI_PB[r].map((n, i) => ({
          id: String(n),
          a: <PapanBilangan n={n} kecil />,
          labelA: `papan ${HURUF[i]}`,
          b: <span className="text-4xl font-black text-[#1C01A5]">{n}</span>,
          labelB: `bilangan ${n}`,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuSemuaPB(d: PropsLangkah) {
  return Kartu(d, 19, "k2b7b-semuamodel", "Ketuk semua model yang memenuhi perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_SEMUA_PB[r];
    const tanya = `Ketuk semua model yang ${s.arah === "lebih" ? "lebih besar" : "lebih kecil"} dari ${s.acuan}.`;
    return (
      <>
        <CatatanTempel pendek={`Model terhadap ${s.acuan}`} teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={s.angka.map((n, i) => ({ id: String(n), label: `Model ${HURUF[i]}`, isi: <ModelDari n={n} skala={0.45} />, benar: cocokAcuan(n, s), penjelasan: `Model ${HURUF[i]} adalah ${n}. ${kalimatBanding(n, s.acuan)}` }))}
          onBeres={beres}
          pesanBeres="Semua model yang memenuhi sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuKalimatB(d: PropsLangkah) {
  return Kartu(d, 20, "k2b7b-kalimat", "Lengkapi tiap kalimat dengan kata perbandingan yang tepat. Bandingkan puluhan dulu.", RONDE_KALIMAT_QB.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat banding" teks="Baca kalimat. Pilih kata perbandingan yang tepat untuk bagian kosong. Bandingkan puluhan dulu." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QB[r].map(([a, b], i) => kalimatIsianBanding(a, b, r * 3 + i))} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuBenarSalahB(d: PropsLangkah) {
  return Kartu(d, 21, "k2b7b-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuSusunB(d: PropsLangkah) {
  return Kartu(d, 22, "k2b7b-susun", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUN_QB.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kalimat banding" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUN_QB[r].kata} pengecoh={RONDE_SUSUN_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

const soalAkuQB = (r: number): SoalBertahap[] =>
  RONDE_AKU_QB[r].map((s, i) => {
    const jawab = hasilAku(s);
    const o = opsiBilangan(jawab, r * 2 + i);
    return {
      tanya: teksAku(s),
      opsi: o.map(String),
      jawab: o.indexOf(jawab),
      petunjuk: s.arah === "lebih" ? `Belum tepat. Lebihnya berarti maju. Hitung maju ${s.k} langkah dari ${s.dasar}.` : `Belum tepat. Kurangnya berarti mundur. Hitung mundur ${s.k} langkah dari ${s.dasar}.`,
      pesan: `${s.k} ${s.arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${s.dasar} adalah ${jawab}.`,
      angka: true,
    };
  });

function KartuAkuB(d: PropsLangkah) {
  return Kartu(d, 23, "k2b7b-aku", "Baca teka-tekinya. Lebihnya berarti maju, dan kurangnya berarti mundur. Pilih bilangan yang tepat.", RONDE_AKU_QB.length, "Jawab semua teka-teki dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Aku adalah bilangan" teks="Baca teka-tekinya. Lebihnya berarti maju, dan kurangnya berarti mundur. Pilih bilangan yang tepat." />
      <PilihBertahap key={r} soal={soalAkuQB(r)} onBeres={beres} pesanBeres="Semua teka-teki sudah terjawab." />
    </>
  ));
}

function KartuTabelB(d: PropsLangkah) {
  return Kartu(d, 24, "k2b7b-tabel", "Ketuk baris tabel, lalu ketuk kartu angka yang tepat. Lebihnya berarti maju, kurangnya berarti mundur.", RONDE_TABEL_QB.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_QB[r];
    return (
      <>
        <CatatanPensil pendek={t.judul} teks={`${t.judul} bilangan. Isi tabel dengan kartu angka yang tepat.`} />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Bilangan ${b.label}: hitung ${r === 0 ? "maju" : "mundur"} satu langkah demi satu langkah.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuDuaAngkaB(d: PropsLangkah) {
  return Kartu(d, 25, "k2b7b-duaangka", "Hitung bilangan yang diminta, lalu atur angka puluhan dan angka satuan pada papan. Tekan Periksa.", RONDE_DIGIT_QB.length, "Tulis semua bilangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Tulis dua angka" teks="Hitung bilangan yang diminta, lalu atur angka puluhan dan angka satuan pada papan." />
      <PapanDigit
        key={r}
        soal={RONDE_DIGIT_QB[r].map((s) => ({
          tanya: `Tulis bilangan yang ${s.k} ${s.arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${s.dasar}.`,
          jawab: hasilDigit(s),
          petunjuk: s.arah === "lebih" ? `Belum tepat. Hitung maju ${s.k} langkah dari ${s.dasar}.` : `Belum tepat. Hitung mundur ${s.k} langkah dari ${s.dasar}.`,
          pesan: `${s.k} ${s.arah === "lebih" ? "lebihnya" : "kurangnya"} dari ${s.dasar} adalah ${hasilDigit(s)}.`,
        }))}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu tulis."
      />
    </>
  ));
}

function KartuDetektifB(d: PropsLangkah) {
  return Kartu(d, 26, "k2b7b-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QB.length, "Tebak dulu aku bilangan apa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    return (
      <>
        <CatatanPensil pendek="Detektif bilangan besar kecil" teks="Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks
          key={r}
          soal={{ petunjuk: s.klue.map(teksKlue), opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: `Periksa tiap petunjuk satu per satu. Hanya ${s.jawab} yang cocok dengan semuanya.` }}
          onBeres={beres}
          pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`}
        />
      </>
    );
  });
}

function KartuPetaKonsepB(d: PropsLangkah) {
  return Kartu(d, 27, "k2b7b-konsep", "Lengkapi peta konsep membandingkan bilangan. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_B.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_B[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuUrutAngkaB(d: PropsLangkah) {
  return Kartu(d, 28, "k2b7b-urutangka", "Ketuk bilangan satu per satu menurut urutan. Bandingkan puluhannya dulu.", RONDE_URUTANGKA_QB.length, "Urutkan semua bilangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTANGKA_QB[r];
    const kunci = urutBilangan(ro.angka, ro.dari).map(String);
    const awal = ro.dari === "kecil" ? "paling kecil" : "paling besar";
    const akhir = ro.dari === "kecil" ? "paling besar" : "paling kecil";
    return (
      <>
        <CatatanPensil pendek={`Urutkan dari ${awal}`} teks={`Ketuk bilangan dari yang ${awal} sampai yang ${akhir}. Bandingkan puluhannya dulu.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: x }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan banyak puluhan dulu, lalu satuannya.`}
          onBeres={beres}
          pesanBeres="Urutannya sudah benar."
        />
      </>
    );
  });
}

function KartuSemuaQB(d: PropsLangkah) {
  return Kartu(d, 29, "k2b7b-semuaqb", "Ketuk semua bilangan yang memenuhi perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_QB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_SEMUA_QB[r];
    const tanya = `Ketuk semua bilangan yang ${s.arah === "lebih" ? "lebih besar" : "lebih kecil"} dari ${s.acuan}.`;
    return (
      <>
        <CatatanPensil pendek="Ketuk semua terhadap acuan" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={s.angka.map((n) => ({ id: String(n), label: String(n), benar: cocokAcuan(n, s), penjelasan: kalimatBanding(n, s.acuan) }))}
          onBeres={beres}
          pesanBeres="Semua bilangan yang memenuhi sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuLangkahB, KartuAntaraB, KartuBandingB, KartuPalingB, KartuDuaKartuB, KartuUrutKantongB, KartuPasangB, KartuMemoriB, KartuPilahAcuanB, KartuSemuaB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuGarisPB, KartuBandingPapanPB, KartuUrutPapanPB, KartuModelBesarPB, KartuPilahModelPB, KartuSimbolPB, KartuTetanggaPB, KartuLangkahPB, KartuMemoriPB, KartuSemuaPB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuKalimatB, KartuBenarSalahB, KartuSusunB, KartuAkuB, KartuTabelB, KartuDuaAngkaB, KartuDetektifB, KartuPetaKonsepB, KartuUrutAngkaB, KartuSemuaQB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK2B7B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🦋", nama: "CONCRETE", cara: "Maju, mundur, dan bandingkan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B7B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B7B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B7} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
