"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, LetakSlot, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import {
  HURUF, Kapital, OPSI_RELASI, PETA_KONSEP_QC, RONDE_ANTARA_CC, RONDE_BANDING_CC, RONDE_BANDING_PC, RONDE_BANDING_QC, RONDE_BENARSALAH_QC, RONDE_CERITA_CC, RONDE_DETEKTIF_QC, RONDE_KALIMAT_PC,
  RONDE_PALING_CC, RONDE_PALING_PC, RONDE_PASANG_CC, RONDE_PASANG_PC, RONDE_PASANG_QC, RONDE_RATUSAN_CC, RONDE_SEMUA_CC, RONDE_SEMUA_PC, RONDE_SEMUA_QC, RONDE_SLOT_CC, RONDE_SLOT_PC, RONDE_SORTIR_PC,
  RONDE_SUSUNKATA_QC, RONDE_TABEL_PC, RONDE_TABEL_QC, RONDE_TANDA_CC, RONDE_TANDA_PC, RONDE_TEMPAT_QC, RONDE_URUT_CC, RONDE_URUT_PC, RONDE_URUT_QC, cocokBanding, kalimatBanding, kataRelasi, namaPalingCerita,
  opsiKumpulan, opsiRelasi, opsiTempatBeda, ratusanBesar, relasi, susunOpsi, teksRelasi, tempatBeda, urutNaik, urutTampil, urutanTetap,
} from "./data-k3b1";
import { buatKartu, DuaKoleksi, DuaModel, Koleksi, Model, Numeral, penjelasanBanding } from "./bantu-k4b1";
import { visualInfografisK4B1C } from "./infografis-k4b1";
import { SUB_C41 } from "./naskah-k4b1";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 1 Sub-Bab C: Membandingkan dan Mengurutkan Bilangan Cacah sampai */
/* 1.000. Tiga puluh permainan, sepuluh per tahap.                              */
/*  Concrete  1 Bandingkan  2 Tanda  3 Urutkan  4 Paling  5 Jodohkan  6 Urutan   */
/*            7 Ketuk Semua  8 Ratusan Sama  9 Di Antara  10 Cerita              */
/*  Picture  11 Bandingkan  12 Tanda  13 Tabel Tanda  14 Urutkan  15 Jodohkan    */
/*           16 Paling  17 Ketuk Semua  18 Pilah Ratusan  19 Kalimat  20 Urutan  */
/*  Abstract 21 Bandingkan  22 Tabel  23 Tempat  24 Urutkan  25 Jodohkan          */
/*           26 Benar Salah  27 Detektif  28 Ketuk Semua  29 Peta  30 Susun Kata  */
/* Naskah: naskah-k4b1.ts (SUB_C41). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_C41.games.map((g) => g.title);
const TOTAL = 10;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang membandingkan dan mengurutkan bilangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK4B1CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C41} judul="Membandingkan dan Mengurutkan" suaraInfo={SUARA_INFO} visual={visualInfografisK4B1C()} speakGuru={speakGuru} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const idPasang = (a: number, b: number) => `${a}-${b}`;
const KATA_URUT = { kecil: "terkecil", besar: "terbesar" } as const;
const SLOT_URUT = [
  { id: "kecil", label: "Terkecil", ikon: "1️⃣", warna: "#BBF7D0" },
  { id: "tengah", label: "Tengah", ikon: "2️⃣", warna: "#FDE68A" },
  { id: "besar", label: "Terbesar", ikon: "3️⃣", warna: "#BFDBFE" },
];
/** Posisi sebuah bilangan di antara tiga bilangan: terkecil, tengah, atau terbesar. */
const posisiSlot = (angka: number[], n: number): "kecil" | "tengah" | "besar" => {
  const urut = urutNaik(angka, "kecil");
  return urut[0] === n ? "kecil" : urut[2] === n ? "besar" : "tengah";
};

/* ------------------------------ Concrete ------------------------------ */

const soalBandingBenda = (r: number, ro: { benda: Parameters<typeof Koleksi>[0]["benda"]; pasang: [number, number][] }): SoalBertahap[] =>
  ro.pasang.map(([a, b], i) => {
    const o = opsiKumpulan(relasi(a, b), r * 2 + i);
    return {
      visual: <DuaKoleksi a={a} b={b} benda={ro.benda} ukuran={20} />,
      tanya: "Kumpulan mana yang lebih banyak?",
      opsi: o.opsi,
      jawab: o.jawab,
      petunjuk: "Belum tepat. Bandingkan jumlah dus lebih dulu, lalu bungkus, lalu benda lepas.",
      pesan: penjelasanBanding(a, b),
    };
  });

function KartuBandingKumpulanC(d: PropsLangkah) {
  return Kartu(d, 0, "k3b1c-bandingkumpulan", "Lihat dua kumpulan benda. Pilih kumpulan yang lebih banyak, atau sama banyak.", RONDE_BANDING_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Bandingkan kumpulan" teks="Bandingkan dus lebih dulu. Bila sama, bandingkan bungkus. Bila sama lagi, bandingkan benda lepas." />
      <PilihBertahap key={r} soal={soalBandingBenda(r, RONDE_BANDING_CC[r])} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu bandingkan." />
    </>
  ));
}

function KartuTandaKumpulanC(d: PropsLangkah) {
  return Kartu(d, 1, "k3b1c-tandakumpulan", "Lihat dua kumpulan. Pilih tanda yang tepat untuk Kumpulan A terhadap Kumpulan B.", RONDE_TANDA_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const ro = RONDE_TANDA_CC[r];
    const soal: SoalBertahap[] = ro.pasang.map(([a, b], i) => {
      const o = opsiRelasi(relasi(a, b), r * 2 + i);
      return {
        visual: <DuaKoleksi a={a} b={b} benda={ro.benda} ukuran={20} />,
        tanya: "Kumpulan A ... Kumpulan B?",
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Baca A dulu, lalu pilih tanda, lalu baca B. Mulut tanda terbuka ke bilangan yang lebih besar.",
        pesan: `${penjelasanBanding(a, b)} Ditulis ${a} ${relasi(a, b)} ${b}.`,
      };
    });
    return (
      <>
        <IgilBicara pendek="Tanda untuk kumpulan" teks="Tanda lebih dari, kurang dari, dan sama dengan. Mulut tanda terbuka ke arah kumpulan yang lebih banyak." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua tanda sudah kamu pilih." />
      </>
    );
  });
}

function KartuUrutKumpulanC(d: PropsLangkah) {
  return Kartu(d, 2, "k3b1c-urutkumpulan", "Ketuk kumpulan satu per satu menurut urutan banyaknya.", RONDE_URUT_CC.length, "Urutkan semua kumpulannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CC[r];
    const ids = ro.angka.map(String);
    const kunci = urutNaik(ro.angka, ro.dari).map(String);
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${KATA_URUT[ro.dari]}`} teks="Hitung dus, bungkus, dan benda lepas pada tiap kumpulan. Lalu urutkan dengan mengetuk." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => ({ id, label: `Kumpulan ${HURUF[ids.indexOf(id)]}`, isi: <Koleksi n={Number(id)} benda={ro.benda} ukuran={16} /> }))}
          urutan={kunci}
          labelAwal={KATA_URUT[ro.dari]}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Bandingkan dus lebih dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${KATA_URUT[ro.dari]} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPalingC(d: PropsLangkah) {
  return Kartu(d, 3, "k3b1c-paling", "Bandingkan kumpulan. Ketuk yang paling banyak, lalu yang paling sedikit.", RONDE_PALING_CC.length, "Temukan semua kumpulannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PALING_CC[r];
    const maks = Math.max(...ro.item);
    const mini = Math.min(...ro.item);
    return (
      <>
        <IgilBicara pendek="Paling banyak, paling sedikit" teks="Bandingkan dus lebih dulu. Cari kumpulan yang paling banyak, lalu yang paling sedikit." />
        <KetukPilih
          key={r}
          kolom={2}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={16} /> }))}
          soal={[
            { tanya: "Ketuk kumpulan yang paling banyak.", jawab: String(maks), petunjuk: "Belum tepat. Bandingkan dus lebih dulu, lalu bungkus.", pesan: `Yang paling banyak adalah ${maks}.` },
            { tanya: "Ketuk kumpulan yang paling sedikit.", jawab: String(mini), petunjuk: "Belum tepat. Cari yang dusnya paling sedikit.", pesan: `Yang paling sedikit adalah ${mini}.` },
          ]}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPasangTandaC(d: PropsLangkah) {
  return Kartu(d, 4, "k3b1c-pasangtanda", "Ketuk satu pasangan kumpulan di kiri, lalu ketuk tanda yang menghubungkannya di kanan.", RONDE_PASANG_CC.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CC[r];
    const kanan = (["<", ">", "="] as const).map((t) => ({ id: t, label: teksRelasi(t), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan pasangan dan tanda" teks="Bandingkan kumpulan di kiri dengan yang di kanan pada tiap pasangan. Lalu pilih tandanya." />
        <PasangKartu
          key={r}
          kiri={ro.pasang.map(([a, b], i) => ({ id: idPasang(a, b), label: `Pasangan ${HURUF[i]}`, isi: <DuaKoleksi a={a} b={b} benda={ro.benda} ukuran={14} /> }))}
          kanan={urutanKe(3, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.pasang.map(([a, b]) => [idPasang(a, b), relasi(a, b)]))}
          petunjuk={() => "Belum cocok. Bandingkan dus lebih dulu. Mulut tanda terbuka ke yang lebih banyak."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan tandanya."
        />
      </>
    );
  });
}

function KartuSlotUrutC(d: PropsLangkah) {
  return Kartu(d, 5, "k3b1c-slotkumpulan", "Ketuk satu kumpulan, lalu ketuk tempat: terkecil, tengah, atau terbesar.", RONDE_SLOT_CC.length, "Taruh semua kumpulannya dulu, ya.", (r, beres) => {
    const ro = RONDE_SLOT_CC[r];
    const kartu = ro.angka.map((n, i) => ({
      id: `k-${n}`,
      label: `Kumpulan ${HURUF[i]}`,
      isi: <Koleksi n={n} benda={ro.benda} ukuran={16} />,
      slot: posisiSlot(ro.angka, n),
      petunjuk: "Belum tepat. Bandingkan ketiga kumpulan, dus lebih dulu.",
      ucapan: `${n} ada di tempat ${posisiSlot(ro.angka, n)}.`,
    }));
    return (
      <>
        <IgilBicara pendek="Taruh di urutan" teks="Cari kumpulan yang paling sedikit, yang paling banyak, dan yang di tengah. Taruh di tempatnya." />
        <LetakSlot key={r} item={urutanKe(kartu.length, r).map((i) => kartu[i])} slot={SLOT_URUT} onBeres={beres} pesanBeres="Semua kumpulan sudah ada di tempatnya." />
      </>
    );
  });
}

function KartuSemuaBandingC(d: PropsLangkah) {
  return Kartu(d, 6, "k3b1c-semuabanding", "Ketuk semua kumpulan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    const tanya = `Ketuk semua kumpulan yang ${ro.arah === "lebih" ? "lebih banyak" : "lebih sedikit"} dari kumpulan acuan (${ro.acuan}).`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Acuannya ada di bawah. Boleh lebih dari satu. Lalu tekan periksa.`} />
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white px-2 py-1.5">
          <span className="text-xs font-black text-[#1C01A5]">Acuan</span>
          <Koleksi n={ro.acuan} benda={ro.benda} ukuran={16} />
        </div>
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokBanding(n, ro.acuan, ro.arah);
            return { id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={15} />, benar: cocok, penjelasan: `${penjelasanBanding(n, ro.acuan)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua kumpulan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuRatusanSamaC(d: PropsLangkah) {
  return Kartu(d, 7, "k3b1c-ratusansama", "Kedua kumpulan punya dus yang sama banyak. Lihat bungkus, lalu benda lepas, dan pilih yang lebih banyak.", RONDE_RATUSAN_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Ratusan sama, lihat berikutnya" teks="Bila jumlah dus sama, bandingkan bungkus. Bila bungkus juga sama, bandingkan benda lepas." />
      <PilihBertahap key={r} soal={soalBandingBenda(r + 10, RONDE_RATUSAN_CC[r])} onBeres={beres} pesanBeres="Semua kumpulan sudah kamu bandingkan." />
    </>
  ));
}

function KartuAntaraC(d: PropsLangkah) {
  return Kartu(d, 8, "k3b1c-antara", "Lihat dua kumpulan batas. Ketuk kumpulan yang jumlahnya di antara keduanya.", RONDE_ANTARA_CC.length, "Temukan kumpulannya dulu, ya.", (r, beres) => {
    const ro = RONDE_ANTARA_CC[r];
    const [lo, hi] = ro.batas;
    const jawab = ro.item.find((n) => n > lo && n < hi) ?? lo;
    return (
      <>
        <IgilBicara pendek="Di antara dua kumpulan" teks="Cari kumpulan yang lebih banyak dari batas bawah dan lebih sedikit dari batas atas." />
        <div className="grid grid-cols-2 gap-2">
          {[["Batas bawah", lo], ["Batas atas", hi]].map(([nama, n]) => (
            <div key={nama as string} className="flex flex-col items-center gap-1 rounded-2xl bg-white px-1 py-1">
              <Koleksi n={n as number} benda={ro.benda} ukuran={15} />
              <span className="text-[11px] font-black text-[#1C01A5]">{nama as string}</span>
            </div>
          ))}
        </div>
        <KetukPilih
          key={r}
          kolom={3}
          item={ro.item.map((n, i) => ({ id: String(n), label: `Kumpulan ${HURUF[i]}`, isi: <Koleksi n={n} benda={ro.benda} ukuran={14} /> }))}
          soal={[{ tanya: "Ketuk kumpulan yang jumlahnya di antara batas bawah dan batas atas.", jawab: String(jawab), petunjuk: "Belum tepat. Harus lebih banyak dari batas bawah dan lebih sedikit dari batas atas.", pesan: `${lo} < ${jawab} < ${hi}. Jadi ${jawab} ada di antara ${lo} dan ${hi}.` }]}
          onBeres={beres}
          pesanBeres="Kumpulan di antara sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuCeritaC(d: PropsLangkah) {
  return Kartu(d, 9, "k3b1c-cerita", "Baca ceritanya. Lihat banyak benda tiap anak, lalu pilih nama yang ditanya.", RONDE_CERITA_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const ro = RONDE_CERITA_CC[r];
    const soal: SoalBertahap[] = ro.soal.map((jenis, i) => {
      const nama = namaPalingCerita(ro, jenis);
      const o = susunOpsi(nama, ro.nama.filter((x) => x !== nama) as [string, string], r * 2 + i);
      return {
        visual: (
          <div className="grid w-full grid-cols-3 gap-1">
            {ro.nama.map((nm, k) => (
              <div key={nm} className="flex flex-col items-center gap-0.5 rounded-2xl bg-white px-0.5 py-1">
                <Koleksi n={ro.angka[k]} benda={ro.benda} ukuran={11} />
                <span className="text-[11px] font-black text-[#1C01A5]">{nm}</span>
                <span className="text-xs font-black text-[#1C01A5]/70">{ro.angka[k]}</span>
              </div>
            ))}
          </div>
        ),
        tanya: `Siapa yang punya paling ${jenis === "banyak" ? "banyak" : "sedikit"}?`,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Bandingkan ketiga bilangan, mulai dari ratusan.",
        pesan: `${nama} punya ${jenis === "banyak" ? Math.max(...ro.angka) : Math.min(...ro.angka)}, paling ${jenis === "banyak" ? "banyak" : "sedikit"}.`,
      };
    });
    return (
      <>
        <IgilBicara pendek="Cerita perbandingan" teks="Bandingkan bilangan ketiga anak, mulai dari ratusan. Pilih nama yang punya paling banyak atau paling sedikit." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua cerita sudah kamu selesaikan." />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuBandingBlokC(d: PropsLangkah) {
  return Kartu(d, 10, "k3b1c-bandingblok", "Lihat dua model blok. Pilih model yang lebih banyak, atau sama banyak.", RONDE_BANDING_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_BANDING_PC[r].map(([a, b], i) => {
      const o = opsiKumpulan(relasi(a, b), r * 2 + i);
      return {
        visual: <DuaModel a={a} b={b} skala={0.85} />,
        tanya: "Model mana yang lebih banyak?",
        opsi: o.opsi.map((t) => t.replace("Kumpulan", "Model")),
        jawab: o.jawab,
        petunjuk: "Belum tepat. Bandingkan lempeng ratusan dulu, lalu batang puluhan, lalu kotak satuan.",
        pesan: penjelasanBanding(a, b),
      };
    });
    return (
      <>
        <CatatanTempel pendek="Bandingkan blok" teks="Bandingkan lempeng ratusan dulu. Bila sama, bandingkan batang puluhan. Bila sama lagi, bandingkan kotak satuan." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua model sudah kamu bandingkan." />
      </>
    );
  });
}

function KartuTandaBlokC(d: PropsLangkah) {
  return Kartu(d, 11, "k3b1c-tandablok", "Lihat dua model blok. Pilih tanda yang tepat untuk Model A terhadap Model B.", RONDE_TANDA_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_TANDA_PC[r].map(([a, b], i) => {
      const o = opsiRelasi(relasi(a, b), r * 2 + i);
      return {
        visual: <DuaModel a={a} b={b} skala={0.85} />,
        tanya: "Model A ... Model B?",
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Baca A dulu, pilih tanda, lalu baca B. Mulut tanda terbuka ke yang lebih besar.",
        pesan: `${penjelasanBanding(a, b)} Ditulis ${a} ${relasi(a, b)} ${b}.`,
      };
    });
    return (
      <>
        <CatatanTempel pendek="Tanda untuk blok" teks="Pilih tanda lebih dari, kurang dari, atau sama dengan untuk dua model blok." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua tanda sudah kamu pilih." />
      </>
    );
  });
}

function KartuTabelTandaC(d: PropsLangkah) {
  return Kartu(d, 12, "k3b1c-tabeltanda", "Ketuk baris tabel, lalu ketuk kartu tanda yang tepat.", RONDE_TABEL_PC.length, "Isi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Isi tabel tanda" teks="Ketuk baris tabel, lalu ketuk kartu tanda yang tepat untuk pasangan bilangan di baris itu." />
      <IsiTabel
        key={r}
        kepala={["Pasangan", "Tanda"]}
        baris={RONDE_TABEL_PC[r].map(([a, b]) => ({ label: `${a} ... ${b}`, jawab: relasi(a, b) }))}
        kartu={[">", "<", "="]}
        petunjuk={(b) => `Bandingkan lagi ${b.label}: mulai dari ratusan.`}
        onBeres={beres}
        pesanBeres="Tabel sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuUrutBlokC(d: PropsLangkah) {
  return Kartu(d, 13, "k3b1c-urutblok", "Ketuk model blok satu per satu menurut urutan banyaknya.", RONDE_URUT_PC.length, "Urutkan semua modelnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_PC[r];
    const ids = ro.angka.map(String);
    const kunci = urutNaik(ro.angka, ro.dari).map(String);
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari yang ${KATA_URUT[ro.dari]}`} teks="Bandingkan model blok, ratusan lebih dulu. Lalu urutkan dengan mengetuk." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => ({ id, label: `Model ${HURUF[ids.indexOf(id)]}`, isi: <Model n={Number(id)} skala={0.5} /> }))}
          urutan={kunci}
          labelAwal={KATA_URUT[ro.dari]}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Bandingkan lempeng ratusan dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${KATA_URUT[ro.dari]} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPasangTandaBlokC(d: PropsLangkah) {
  return Kartu(d, 14, "k3b1c-pasangtandablok", "Ketuk satu pasangan model di kiri, lalu ketuk tanda yang menghubungkannya di kanan.", RONDE_PASANG_PC.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PC[r];
    const kanan = (["<", ">", "="] as const).map((t) => ({ id: t, label: teksRelasi(t), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan pasangan blok dan tanda" teks="Bandingkan dua model pada tiap pasangan. Lalu pilih tanda yang menghubungkannya." />
        <PasangKartu
          key={r}
          kiri={ro.map(([a, b], i) => ({ id: idPasang(a, b), label: `Pasangan ${HURUF[i]}`, isi: <DuaModel a={a} b={b} skala={0.5} /> }))}
          kanan={urutanKe(3, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map(([a, b]) => [idPasang(a, b), relasi(a, b)]))}
          petunjuk={() => "Belum cocok. Bandingkan lempeng ratusan dulu. Mulut tanda terbuka ke yang lebih besar."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan tandanya."
        />
      </>
    );
  });
}

function KartuPalingBlokC(d: PropsLangkah) {
  return Kartu(d, 15, "k3b1c-palingblok", "Bandingkan model blok. Ketuk yang paling banyak, lalu yang paling sedikit.", RONDE_PALING_PC.length, "Temukan semua modelnya dulu, ya.", (r, beres) => {
    const item = RONDE_PALING_PC[r];
    const maks = Math.max(...item);
    const mini = Math.min(...item);
    return (
      <>
        <CatatanTempel pendek="Paling banyak, paling sedikit" teks="Bandingkan model blok. Cari yang paling banyak, lalu yang paling sedikit." />
        <KetukPilih
          key={r}
          kolom={2}
          item={item.map((n, i) => ({ id: String(n), label: `Model ${HURUF[i]}`, isi: <Model n={n} skala={0.6} /> }))}
          soal={[
            { tanya: "Ketuk model yang paling banyak.", jawab: String(maks), petunjuk: "Belum tepat. Cari yang lempeng ratusannya paling banyak.", pesan: `Yang paling banyak adalah ${maks}.` },
            { tanya: "Ketuk model yang paling sedikit.", jawab: String(mini), petunjuk: "Belum tepat. Cari yang lempeng ratusannya paling sedikit.", pesan: `Yang paling sedikit adalah ${mini}.` },
          ]}
          onBeres={beres}
          pesanBeres="Semua model sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuSemuaBlokC(d: PropsLangkah) {
  return Kartu(d, 16, "k3b1c-semuablok", "Ketuk semua model yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    const tanya = `Ketuk semua model yang ${ro.arah === "lebih" ? "lebih dari" : "kurang dari"} ${ro.acuan}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua blok yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n, i) => {
            const cocok = cocokBanding(n, ro.acuan, ro.arah);
            return { id: String(n), label: `Model ${HURUF[i]}`, isi: <Model n={n} skala={0.5} />, benar: cocok, penjelasan: `${penjelasanBanding(n, ro.acuan)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua model yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahRatusanC(d: PropsLangkah) {
  return Kartu(d, 17, "k3b1c-pilahratusan", "Seret atau ketuk tiap model ke kotak: ratusan kurang dari 5, atau ratusan 5 atau lebih.", RONDE_SORTIR_PC.length, "Pilah semua modelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah blok menurut ratusan" teks="Hitung lempeng ratusan pada tiap model. Pilah ke kotak yang tepat." />
      <Sortir
        key={r}
        lebarItem={92}
        kolomBin={2}
        item={urutanKe(RONDE_SORTIR_PC[r].length, r).map((i) => {
          const n = RONDE_SORTIR_PC[r][i];
          return {
            id: String(n),
            label: `Model ${n}`,
            isi: <Model n={n} skala={0.5} />,
            bin: ratusanBesar(n) ? "besar" : "kecil",
            petunjuk: "Belum tepat. Hitung dulu lempeng ratusannya, apakah kurang dari lima atau lima atau lebih.",
            ucapan: `${n} punya ${Math.floor(n / 100)} ratusan, ${ratusanBesar(n) ? "lima atau lebih" : "kurang dari lima"}.`,
          };
        })}
        bin={[
          { id: "kecil", label: "Ratusan kurang dari 5", warna: "#BBF7D0" },
          { id: "besar", label: "Ratusan 5 atau lebih", warna: "#BFDBFE" },
        ]}
        onBeres={beres}
        pesanBeres="Semua model sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuKalimatBandingC(d: PropsLangkah) {
  return Kartu(d, 18, "k3b1c-kalimatbanding", "Lihat dua model. Lengkapi tiap kalimat dengan pilihan yang tepat.", RONDE_KALIMAT_PC.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const [a, b] = RONDE_KALIMAT_PC[r];
    return (
      <>
        <CatatanTempel pendek="Lengkapi kalimat perbandingan" teks="Hitung ratusan pada tiap model. Lalu lengkapi kalimat, termasuk kata lebih dari atau kurang dari." />
        <DuaModel a={a} b={b} skala={0.8} />
        <IsiKalimatGame key={r} kalimat={kalimatBanding(a, b, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuSlotBlokC(d: PropsLangkah) {
  return Kartu(d, 19, "k3b1c-slotblok", "Ketuk satu model, lalu ketuk tempat: terkecil, tengah, atau terbesar.", RONDE_SLOT_PC.length, "Taruh semua modelnya dulu, ya.", (r, beres) => {
    const angka = RONDE_SLOT_PC[r];
    const kartu = angka.map((n, i) => ({
      id: `m-${n}`,
      label: `Model ${HURUF[i]}`,
      isi: <Model n={n} skala={0.55} />,
      slot: posisiSlot(angka, n),
      petunjuk: "Belum tepat. Bandingkan ketiga model, lempeng ratusan dulu.",
      ucapan: `${n} ada di tempat ${posisiSlot(angka, n)}.`,
    }));
    return (
      <>
        <CatatanTempel pendek="Taruh blok di urutan" teks="Cari model yang paling kecil, yang paling besar, dan yang di tengah. Taruh di tempatnya." />
        <LetakSlot key={r} item={urutanKe(kartu.length, r).map((i) => kartu[i])} slot={SLOT_URUT.map((s) => ({ ...s, ikon: "" }))} onBeres={beres} pesanBeres="Semua model sudah ada di tempatnya." />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuBandingQC(d: PropsLangkah) {
  return Kartu(d, 20, "k3b1c-bandinglambang", "Lihat dua bilangan. Pilih tanda yang tepat.", RONDE_BANDING_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_BANDING_QC[r].map(([a, b], i) => {
      const o = opsiRelasi(relasi(a, b), r * 2 + i);
      return {
        visual: (
          <p className="flex items-center justify-center gap-3 rounded-2xl bg-[#FFF7CC] px-4 py-2 text-4xl font-black text-[#1C01A5]">
            <span>{a}</span>
            <span className="text-3xl text-[#1C01A5]/50">○</span>
            <span>{b}</span>
          </p>
        ),
        tanya: `${a} ... ${b}?`,
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Bandingkan ratusan dulu. Bila sama, bandingkan puluhan, lalu satuan.",
        pesan: `${penjelasanBanding(a, b)} Ditulis ${a} ${relasi(a, b)} ${b}.`,
      };
    });
    return (
      <>
        <CatatanPensil pendek="Bandingkan lambang" teks="Bandingkan dua bilangan mulai dari ratusan. Pilih lebih dari, kurang dari, atau sama dengan." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua bilangan sudah kamu bandingkan." />
      </>
    );
  });
}

function KartuTabelQC(d: PropsLangkah) {
  return Kartu(d, 21, "k3b1c-tabelbanding", "Ketuk baris tabel, lalu ketuk kartu tanda yang tepat.", RONDE_TABEL_QC.length, "Isi semua tabelnya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Isi tabel perbandingan" teks="Ketuk baris tabel, lalu ketuk kartu tanda yang tepat untuk pasangan bilangan." />
      <IsiTabel
        key={r}
        kepala={["Pasangan", "Tanda"]}
        baris={RONDE_TABEL_QC[r].map(([a, b]) => ({ label: `${a} ... ${b}`, jawab: relasi(a, b) }))}
        kartu={[">", "<", "="]}
        petunjuk={(b) => `Bandingkan lagi ${b.label}: ratusan dulu.`}
        onBeres={beres}
        pesanBeres="Tabel sudah terisi dengan benar."
      />
    </>
  ));
}

function KartuTempatQC(d: PropsLangkah) {
  return Kartu(d, 22, "k3b1c-tempatmenentukan", "Lihat dua bilangan. Pilih tempat pertama yang angkanya berbeda, yaitu tempat yang menentukan.", RONDE_TEMPAT_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_TEMPAT_QC[r].map(([a, b], i) => {
      const o = opsiTempatBeda(a, b, r * 2 + i);
      return {
        visual: (
          <p className="flex items-center justify-center gap-3 rounded-2xl bg-[#FFF7CC] px-4 py-2 text-4xl font-black text-[#1C01A5]">
            <span>{a}</span>
            <span className="text-3xl text-[#1C01A5]/50">dan</span>
            <span>{b}</span>
          </p>
        ),
        tanya: "Tempat mana yang menentukan hasil perbandingan?",
        opsi: o.opsi,
        jawab: o.jawab,
        petunjuk: "Belum tepat. Cari tempat pertama dari kiri yang angkanya berbeda.",
        pesan: penjelasanBanding(a, b),
      };
    });
    return (
      <>
        <CatatanPensil pendek="Tempat yang menentukan" teks="Bandingkan dua bilangan dari kiri. Tempat pertama yang angkanya berbeda adalah tempat yang menentukan." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua tempat penentu sudah kamu temukan." />
      </>
    );
  });
}

function KartuUrutQC(d: PropsLangkah) {
  return Kartu(d, 23, "k3b1c-urutlambang", "Ketuk bilangan satu per satu menurut urutan yang diminta.", RONDE_URUT_QC.length, "Urutkan semua bilangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_QC[r];
    const ids = ro.angka.map(String);
    const kunci = urutNaik(ro.angka, ro.dari).map(String);
    return (
      <>
        <CatatanPensil pendek={`Urutkan dari yang ${KATA_URUT[ro.dari]}`} teks="Bandingkan bilangan mulai dari ratusan. Lalu urutkan dengan mengetuk." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => ({ id, label: id, isi: <Numeral n={id} kelas="text-2xl" /> }))}
          urutan={kunci}
          labelAwal={KATA_URUT[ro.dari]}
          labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Bandingkan ratusan dulu.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${KATA_URUT[ro.dari]} sudah benar.`}
        />
      </>
    );
  });
}

function KartuPasangKataQC(d: PropsLangkah) {
  return Kartu(d, 24, "k3b1c-pasangkata", "Ketuk satu pasangan bilangan di kiri, lalu ketuk kata yang menghubungkannya di kanan.", RONDE_PASANG_QC.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QC[r];
    const kanan = (["<", ">", "="] as const).map((t) => ({ id: t, label: Kapital(kataRelasi(t)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan pasangan dan kata" teks="Bandingkan dua bilangan pada tiap pasangan. Pilih kata yang menghubungkannya." />
        <PasangKartu
          key={r}
          kiri={ro.map(([a, b]) => ({ id: idPasang(a, b), label: `${a} dan ${b}`, isi: null as React.ReactNode }))}
          kanan={urutanKe(3, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map(([a, b]) => [idPasang(a, b), relasi(a, b)]))}
          petunjuk={() => "Belum cocok. Bandingkan ratusan dulu, lalu puluhan, lalu satuan."}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah cocok dengan katanya."
        />
      </>
    );
  });
}

function KartuBenarSalahC(d: PropsLangkah) {
  return Kartu(d, 25, "k3b1c-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QC.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang membandingkan dan mengurutkan bilangan dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifC(d: PropsLangkah) {
  return Kartu(d, 26, "k3b1c-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QC.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (
      <>
        <CatatanPensil pendek="Detektif perbandingan" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`} />
      </>
    );
  });
}

function KartuSemuaQC(d: PropsLangkah) {
  return Kartu(d, 27, "k3b1c-semualambang", "Ketuk semua bilangan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_QC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_QC[r];
    const tanya = `Ketuk semua bilangan yang ${ro.arah === "lebih" ? "lebih dari" : "kurang dari"} ${ro.acuan}.`;
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.angka.map((n) => {
            const cocok = cocokBanding(n, ro.acuan, ro.arah);
            return { id: String(n), label: String(n), benar: cocok, penjelasan: `${penjelasanBanding(n, ro.acuan)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
          })}
          onBeres={beres}
          pesanBeres="Semua bilangan yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPetaC(d: PropsLangkah) {
  return Kartu(d, 28, "k3b1c-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QC.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QC[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuSusunKataC(d: PropsLangkah) {
  return Kartu(d, 29, "k3b1c-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QC.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata perbandingan" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QC[r].kata} pengecoh={RONDE_SUSUNKATA_QC[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuBandingKumpulanC, KartuTandaKumpulanC, KartuUrutKumpulanC, KartuPalingC, KartuPasangTandaC, KartuSlotUrutC, KartuSemuaBandingC, KartuRatusanSamaC, KartuAntaraC, KartuCeritaC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBandingBlokC, KartuTandaBlokC, KartuTabelTandaC, KartuUrutBlokC, KartuPasangTandaBlokC, KartuPalingBlokC, KartuSemuaBlokC, KartuPilahRatusanC, KartuKalimatBandingC, KartuSlotBlokC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuBandingQC, KartuTabelQC, KartuTempatQC, KartuUrutQC, KartuPasangKataQC, KartuBenarSalahC, KartuDetektifC, KartuSemuaQC, KartuPetaC, KartuSusunKataC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

export function ConcreteK4B1C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "⚖️", nama: "CONCRETE", cara: "Bandingkan kumpulan benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK4B1C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat blok dan tanda", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK4B1C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Bilangan dan tanda", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_C41} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />}
    />
  );
}
