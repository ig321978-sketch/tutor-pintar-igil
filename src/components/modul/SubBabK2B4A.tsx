"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { IsiKalimatGame, PetaKonsepGame } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { Panggung, PetaKotak, PilihKataPosisi, SusunBangunPetak, TebakPetak, TemukanKamar, type TugasDef, type ZonaDef } from "./posisi-k2b4";
import { BendaDi, BendaSvg, LatarKamar, LatarTaman, PoseG, UKURAN_BENDA } from "./dasar-k2b4";
import {
  NAMA_BENDA, PETA_KONSEP_A, RONDE_DIAGRAM_A, RONDE_KALIMAT_A, RONDE_KAMAR_A, RONDE_PETA_A, RONDE_PINDAH_A, RONDE_SUSUN_A, RONDE_TARUH_A, RONDE_TEBAK_A, STIKER_TAMAN_A, ZONA_ACUAN,
  frasaPosisi, kalimatPosisi, type BendaId,
} from "./data-k2b4";
import { visualInfografisK2B4A } from "./infografis-k2b4";
import { SUB_A4 } from "./naskah-k2b4";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 4 Sub-Bab A: Posisi Benda.                                      */
/*  Concrete 1 Taruh di Tempatnya  2 Pindahkan Benda  3 Temukan di Kamar       */
/*           4 Tempel Stiker di Taman                                         */
/*  Picture  5 Peta Kotak  6 Pilih Kata Posisi  7 Susun Bangun di Petak        */
/*  Abstract 8 Lengkapi Kalimat  9 Tebak Aku Apa?  10 Peta Konsep              */
/* Naskah: naskah-k2b4.ts (SUB_A4). Tanpa API.                                 */
/* ------------------------------------------------------------------------ */

const J = SUB_A4.games.map((g) => g.title);
const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SUARA_INFO =
  "Ini poster rangkuman posisi benda. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B4AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A4} judul="Posisi Benda" suaraInfo={SUARA_INFO} visual={visualInfografisK2B4A()} speakGuru={speakGuru} />;
}

/* ------------------------------ Gambar untuk panggung ------------------------------ */

const SKALA_ACUAN: Partial<Record<BendaId, number>> = { kotak: 1.5, meja: 1.3, kursi: 1.5, pohon: 1 };

function acuanSvg(id: BendaId): React.ReactNode {
  const [w, h] = UKURAN_BENDA[id];
  const s = SKALA_ACUAN[id] ?? 1.3;
  return <BendaDi id={id} x={50 - (w * s) / 2} y={40 - (h * s) / 2} w={w * s} h={h * s} />;
}

function zonaUntuk(acuan: BendaId): ZonaDef[] {
  return ZONA_ACUAN.map((z) => ({ id: z.id, kata: z.kata, acuanNama: NAMA_BENDA[acuan], x: z.x, y: z.y, skala: z.skala, lapis: z.lapis }));
}

function gambarBenda(benda: string, x: number, y: number, skala: number): React.ReactNode {
  if (benda === "halim") {
    return (
      <svg x={x - 7 * skala} y={y - 15 * skala} width={14 * skala} height={30 * skala} viewBox="0 0 100 100" preserveAspectRatio="none" overflow="visible">
        <PoseG pose="berdiri" baju="#A78BFA" />
      </svg>
    );
  }
  if (benda === "deretanBunga") {
    return (
      <g>
        {[-9, 0, 9].map((dx) => (
          <BendaDi key={dx} id="bunga" x={x + dx - 4} y={y - 7} w={8} h={13} />
        ))}
      </g>
    );
  }
  const [w, h] = UKURAN_BENDA[benda as BendaId];
  return <BendaDi id={benda as BendaId} x={x - (w * skala) / 2} y={y - (h * skala) / 2} w={w * skala} h={h * skala} />;
}

function nampanBenda(benda: string): React.ReactNode {
  if (benda === "halim") {
    return (
      <svg viewBox="0 0 100 100" className="h-12 w-12" role="img" aria-label="Halim">
        <PoseG pose="berdiri" baju="#A78BFA" />
      </svg>
    );
  }
  if (benda === "deretanBunga") {
    return (
      <div className="flex">
        {[0, 1, 2].map((i) => (
          <BendaSvg key={i} id="bunga" kelas="h-9 w-5" label="Bunga" />
        ))}
      </div>
    );
  }
  return <BendaSvg id={benda as BendaId} kelas="h-12 w-12" label={NAMA_BENDA[benda as BendaId]} />;
}

const adaLatar = (acuan: BendaId) => (acuan === "pohon" ? <LatarTaman /> : <LatarKamar />);

/* ------------------------------ Concrete ------------------------------ */

function KartuTaruhA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={0}
      judul={J[0]}
      id="k2b4a-taruh"
      petunjuk="Baca petunjuk di atas gambar. Seret benda dari nampan ke tempat yang diminta di sekitar benda acuan, atau ketuk benda lalu ketuk tempatnya. Kanan dan kiri sesuai dengan posisi kita yang melihat gambar."
      jumlahRonde={RONDE_TARUH_A.length}
      belumSiap="Taruh semua benda di tempatnya dulu, ya."
      isi={(r, beres) => {
        const ro = RONDE_TARUH_A[r];
        const tugas: TugasDef[] = ro.tugas.map((t, i) => ({
          id: `t${i}`,
          benda: t.benda,
          zona: t.kata,
          kalimat: `${Kapital(kalimatPosisi(NAMA_BENDA[t.benda], t.kata, NAMA_BENDA[t.acuan]))}.`,
          perintah: `Taruh ${NAMA_BENDA[t.benda]} ${frasaPosisi(t.kata)} ${NAMA_BENDA[t.acuan]}`,
        }));
        return (
          <>
            <IgilBicara pendek={`Taruh di sekitar ${NAMA_BENDA[ro.acuan]}`} teks={`Ada ${tugas.length === 3 ? "tiga" : "empat"} petunjuk. Baca tiap petunjuk, lalu taruh bendanya di tempat yang tepat di sekitar ${NAMA_BENDA[ro.acuan]}. Seret bendanya, atau ketuk bendanya lalu ketuk tempatnya. Benda di depan menutupi sebagian benda acuan, dan benda di belakang tertutup benda acuan.`} />
            <Panggung key={r} latar={adaLatar(ro.acuan)} acuan={acuanSvg(ro.acuan)} zona={zonaUntuk(ro.acuan)} tugas={tugas} gambar={gambarBenda} nampan={nampanBenda} jejak onBeres={beres} />
          </>
        );
      }}
    />
  );
}

function KartuPindahA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={1}
      judul={J[1]}
      id="k2b4a-pindah"
      petunjuk="Jalankan petunjuk satu per satu. Pindahkan benda ke tempat yang diminta. Setelah petunjuk terakhir, pilih posisi akhir benda."
      jumlahRonde={RONDE_PINDAH_A.length}
      belumSiap="Jalankan semua petunjuk dan jawab pertanyaannya dulu, ya."
      isi={(r, beres) => {
        const ro = RONDE_PINDAH_A[r];
        const tugas: TugasDef[] = ro.langkah.map((k, i) => ({
          id: `p${i}`,
          benda: ro.benda,
          zona: k,
          kalimat: `${Kapital(kalimatPosisi(NAMA_BENDA[ro.benda], k, NAMA_BENDA[ro.acuan]))}.`,
          perintah: i === 0 ? `Taruh ${NAMA_BENDA[ro.benda]} ${frasaPosisi(k)} ${NAMA_BENDA[ro.acuan]}` : `Pindahkan ${NAMA_BENDA[ro.benda]} ke ${k === "kanan" || k === "kiri" ? `sebelah ${k}` : k} ${NAMA_BENDA[ro.acuan]}`,
        }));
        return (
          <>
            <IgilBicara pendek={`Pindahkan ${NAMA_BENDA[ro.benda]}`} teks={`Pindahkan ${NAMA_BENDA[ro.benda]} sesuai petunjuk, satu per satu. Setelah petunjuk terakhir, jawab di manakah posisi ${NAMA_BENDA[ro.benda]} sekarang.`} />
            <Panggung key={r} latar={adaLatar(ro.acuan)} acuan={acuanSvg(ro.acuan)} zona={zonaUntuk(ro.acuan)} tugas={tugas} gambar={gambarBenda} nampan={nampanBenda} jejak={false} akhir={{ benda: NAMA_BENDA[ro.benda], acuan: NAMA_BENDA[ro.acuan], kata: ro.langkah[ro.langkah.length - 1], nomor: r }} onBeres={beres} />
          </>
        );
      }}
    />
  );
}

function KartuKamarA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={2}
      judul={J[2]}
      id="k2b4a-kamar"
      petunjuk="Baca pertanyaan di atas gambar kamar. Ketuk benda yang cocok dengan petunjuk posisi. Benda yang berkedip adalah benda acuan."
      jumlahRonde={RONDE_KAMAR_A.length}
      belumSiap="Temukan semua bendanya dulu, ya."
      isi={(r, beres) => (
        <>
          <IgilBicara pendek="Temukan di kamar" teks="Lihat gambar kamar. Baca pertanyaan, lalu ketuk benda yang posisinya cocok. Benda yang berkedip adalah benda acuan." />
          <TemukanKamar key={r} soal={RONDE_KAMAR_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuTamanA(d: PropsLangkah) {
  const kalimatStiker = STIKER_TAMAN_A;
  return (
    <KartuK2B5
      d={d}
      indeks={3}
      judul={J[3]}
      id="k2b4a-taman"
      petunjuk="Baca petunjuk satu per satu. Tempelkan stikernya di tempat yang tepat di sekitar Kira atau pohon. Seret stikernya, atau ketuk stiker lalu ketuk tempatnya."
      jumlahRonde={1}
      belumSiap="Tempelkan semua stiker dulu, ya."
      isi={(_r, beres) => {
        const tugas: TugasDef[] = kalimatStiker.map((s) => ({ id: s.id, benda: s.benda, zona: `${s.acuan}-${s.kata}`, kalimat: s.kalimat }));
        const zona: ZonaDef[] = [
          { id: "pohon-atas", kata: "atas", acuanNama: "pohon", x: 28, y: 9, skala: 1, lapis: "biasa" },
          { id: "pohon-kiri", kata: "kiri", acuanNama: "pohon", x: 8, y: 47, skala: 1, lapis: "biasa" },
          { id: "pohon-kanan", kata: "kanan", acuanNama: "pohon", x: 48, y: 47, skala: 1, lapis: "biasa" },
          { id: "kira-depan", kata: "depan", acuanNama: "Kira", x: 76, y: 62, skala: 1.1, lapis: "depan" },
          { id: "kira-belakang", kata: "belakang", acuanNama: "Kira", x: 70, y: 34, skala: 0.9, lapis: "belakang" },
        ];
        return (
          <>
            <CatatanTempel pendek="Tempel stiker" teks="Baca petunjuk di atas gambar. Tempelkan stiker di tempat yang tepat di sekitar Kira atau pohon. Kanan dan kiri sesuai dengan posisi kita yang melihat gambar." />
            <Panggung
              latar={<LatarTaman />}
              acuan={
                <g>
                  <BendaDi id="pohon" x={16} y={20} w={24} h={38} />
                  <svg x={64} y={28} width={16} height={34} viewBox="0 0 100 100" preserveAspectRatio="none" overflow="visible">
                    <PoseG pose="berdiri" baju="#EC4899" />
                  </svg>
                </g>
              }
              zona={zona}
              tugas={tugas}
              gambar={gambarBenda}
              nampan={nampanBenda}
              jejak
              onBeres={beres}
            />
          </>
        );
      }}
    />
  );
}

/* ------------------------------ Picture ------------------------------ */

function KartuPetaA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={4}
      judul={J[4]}
      id="k2b4a-peta"
      petunjuk="Ketuk kotak yang berada di atas, bawah, kiri, atau kanan lingkaran biru, sesuai pertanyaan."
      jumlahRonde={RONDE_PETA_A.length}
      belumSiap="Temukan semua kotaknya dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Peta kotak" teks="Lihat peta kotak. Baca pertanyaan, lalu ketuk kotak yang berada di atas, bawah, kiri, atau kanan lingkaran biru." />
          <PetaKotak key={r} ronde={RONDE_PETA_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuDiagramA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={5}
      judul={J[5]}
      id="k2b4a-diagram"
      petunjuk="Lihat lingkaran terhadap persegi biru. Pilih kata posisi yang tepat untuk tiap gambar. Lingkaran yang menutupi persegi ada di depan, dan yang tertutup ada di belakang."
      jumlahRonde={RONDE_DIAGRAM_A.length}
      belumSiap="Jawab semua gambar dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Pilih kata posisi" teks="Lihat letak lingkaran terhadap persegi biru. Pilih kata posisi yang tepat. Lingkaran yang menutupi persegi ada di depan, dan lingkaran yang tertutup persegi ada di belakang." />
          <PilihKataPosisi key={r} item={RONDE_DIAGRAM_A[r]} nomor={r} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuSusunA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={6}
      judul={J[6]}
      id="k2b4a-susun"
      petunjuk="Baca kalimat posisi. Ketuk bangun, lalu ketuk petak untuk menaruhnya. Semua kalimat harus terpenuhi, lalu tekan Periksa."
      jumlahRonde={RONDE_SUSUN_A.length}
      belumSiap="Susun bangun sesuai kalimat dan tekan Periksa dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanTempel pendek="Susun bangun" teks="Baca kalimat posisi. Ketuk bangun, lalu ketuk petak. Bangun yang bersebelahan harus sesuai kalimat. Kalau sudah, tekan Periksa." />
          <SusunBangunPetak key={r} ronde={RONDE_SUSUN_A[r]} onBeres={beres} />
        </>
      )}
    />
  );
}

/* ------------------------------ Abstract ------------------------------ */

function KartuKalimatA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={7}
      judul={J[7]}
      id="k2b4a-kalimat"
      petunjuk="Lengkapi tiap kalimat dengan memilih kata posisi yang berlawanan. Ingat: atas lawan bawah, depan lawan belakang, kanan lawan kiri."
      jumlahRonde={RONDE_KALIMAT_A.length}
      belumSiap="Lengkapi semua kalimat dulu, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Lawan kata posisi" teks="Baca kalimat. Kalau benda pertama ada di atas benda kedua, benda kedua ada di bawah benda pertama. Pilih kata yang tepat untuk bagian kosong." />
          <IsiKalimatGame kalimat={RONDE_KALIMAT_A[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap. Kata posisi selalu punya lawan katanya." />
        </>
      )}
    />
  );
}

function KartuTebakA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={8}
      judul={J[8]}
      id="k2b4a-tebak"
      petunjuk="Baca semua petunjuk, lalu cari kotak yang cocok dengan semuanya. Pilih nama benda itu. Satu petunjuk belum tentu cukup."
      jumlahRonde={RONDE_TEBAK_A.length}
      belumSiap="Tebak dulu aku apa, ya."
      isi={(r, beres) => (
        <>
          <CatatanPensil pendek="Tebak aku apa" teks="Baca semua petunjuk. Cari kotak yang cocok dengan semua petunjuk, lalu pilih namanya. Satu petunjuk belum tentu cukup." />
          <TebakPetak key={r} soal={RONDE_TEBAK_A[r]} nomor={r} onBeres={beres} />
        </>
      )}
    />
  );
}

function KartuPetaKonsepA(d: PropsLangkah) {
  return (
    <KartuK2B5
      d={d}
      indeks={9}
      judul={J[9]}
      id="k2b4a-konsep"
      petunjuk="Lengkapi peta konsep posisi benda. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat."
      jumlahRonde={PETA_KONSEP_A.length}
      belumSiap="Lengkapi peta konsepnya dulu, ya."
      isi={(r, beres) => {
        const p = PETA_KONSEP_A[r];
        return (
          <>
            <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
            <PetaKonsepGame pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
          </>
        );
      }}
    />
  );
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <KartuTaruhA {...d} /> },
  { nomor: 2, render: (d) => <KartuPindahA {...d} /> },
  { nomor: 3, render: (d) => <KartuKamarA {...d} /> },
  { nomor: 4, render: (d) => <KartuTamanA {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuPetaA {...d} /> },
  { nomor: 6, render: (d) => <KartuDiagramA {...d} /> },
  { nomor: 7, render: (d) => <KartuSusunA {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuKalimatA {...d} /> },
  { nomor: 9, render: (d) => <KartuTebakA {...d} /> },
  { nomor: 10, render: (d) => <KartuPetaKonsepA {...d} /> },
];

export function ConcreteK2B4A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Taruh, pindahkan, dan temukan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B4A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B4A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan petunjuk", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A4} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
