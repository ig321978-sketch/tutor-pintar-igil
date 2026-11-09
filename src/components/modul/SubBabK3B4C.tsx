"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { BendaGarisSvg, KertasLipatSvg, type GarisLipat } from "./dasar-k3b4c";
import { BangunSederhanaSvg, JarakPetakSvg, PetakSvg } from "./diagram-k3b4c";
import {
  BANGUN_SEDERHANA, BENDA_GARIS, HURUF, LIPATAN, PETA_KONSEP_QC, RONDE_BANGUNLIPAT_CC, RONDE_BENARSALAH_QC, RONDE_BENDA_CC, RONDE_CALON_PC, RONDE_CERITA_QC, RONDE_DETEKTIF_QC, RONDE_ISTILAH_QC, RONDE_JARAK_PC,
  RONDE_JENIS_PC, RONDE_JODOHLIPAT_CC, RONDE_JODOH_CC, RONDE_JODOH_PC, RONDE_JODOH_QC, RONDE_KALIMAT_QC, RONDE_LAMBANG_PC, RONDE_LAMBANG_QC, RONDE_LIPATAN_CC, RONDE_MEMORI_PC, RONDE_MEMORI_QC, RONDE_PILAH_CC,
  RONDE_PILAH_PC, RONDE_SEJAJARDENGAN_CC, RONDE_SEMUA_CC, RONDE_SEMUA_PC, RONDE_SIFAT_PC, RONDE_SUSUNKATA_QC, RONDE_TABEL_PC, RONDE_TEGAKLURUS_CC, RONDE_URUTLIPAT_CC, bangunTengah, bertemu, hitungSejajar,
  hitungTegakLurus, hubungan, hubunganBG, hubunganLipatan, hubunganPG, idBG, kapital, labelHubungan, namaBG, opsiAngka, opsiCiri, opsiHubungan, opsiLambang, pasanganJarak, susunOpsi, urutTampil, urutanTetap,
  type Hubungan, type PasanganGaris, type SoalBG,
} from "./data-k3b4";
import { buatKartu, Numeral } from "./bantu-k3b1";
import { visualInfografisK3B4C } from "./infografis-k3b4";
import { SUB_C34 } from "./naskah-k3b4";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 4 Sub-Bab C: Garis Tegak Lurus, Garis Sejajar, dan Bangun Datar     */
/* Sederhana. Tiga puluh permainan, sepuluh per tahap.                            */
/*  Concrete  1 Dua Garis pada Benda  2 Ketuk Semua  3 Jodohkan  4 Pilah  5 Hitung  */
/*            Sejajar  6 Hitung Tegak Lurus  7 Dua Lipatan  8 Bangun di Tengah       */
/*            9 Urutkan Kertas  10 Jodohkan Lipatan                                 */
/*  Picture  11 Jenis Pasangan  12 Jarak Petak  13 Jodohkan  14 Ketuk Semua  15 Pilah */
/*           16 Tabel Bangun  17 Memori Bangun  18 Lambang  19 Sisi dan Sudut         */
/*           20 Pilih Garis                                                         */
/*  Abstract 21 Istilah  22 Kalimat  23 Arti Lambang  24 Jodohkan  25 Memori         */
/*           26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata           */
/* Naskah: naskah-k3b4.ts (SUB_C34). Tanpa API.                                      */
/* ------------------------------------------------------------------------ */

const J = SUB_C34.games.map((g) => g.title);
const TOTAL = 30;
const Kartu = buatKartu(J, TOTAL);

const SUARA_INFO =
  "Ini poster rangkuman tentang garis tegak lurus, garis sejajar, dan bangun datar sederhana. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK3B4CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C34} judul="Garis Tegak Lurus dan Sejajar" suaraInfo={SUARA_INFO} visual={visualInfografisK3B4C()} speakGuru={speakGuru} />;
}

/** Urutan tampil beberapa pilihan: berputar tiap ronde, dan pada ronde pertama sudah berbeda dari urutan kunci. */
const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r + 1);

const PETUNJUK_HUBUNGAN =
  "Belum tepat. Garis sejajar jaraknya selalu sama dan tidak bertemu. Garis tegak lurus bertemu pada sudut siku-siku. Selain itu, bukan keduanya.";
const KATA_HUBUNGAN: Record<Hubungan, string> = { sejajar: "sejajar", "tegak-lurus": "tegak lurus", miring: "bukan sejajar dan bukan tegak lurus" };
const PESAN_HUBUNGAN: Record<Hubungan, string> = {
  sejajar: "Kedua garis berjarak sama dan tidak pernah bertemu, jadi sejajar.",
  "tegak-lurus": "Kedua garis bertemu pada sudut siku-siku, jadi tegak lurus.",
  miring: "Kedua garis tidak sejajar dan tidak membentuk sudut siku-siku, jadi bukan keduanya.",
};

/** Lebar tetap untuk gambar di dalam deretan (agar tidak menyusut). */
const Lebar = ({ w, children }: { w: number; children: React.ReactNode }) => (
  <div className="min-w-0 max-w-full" style={{ width: w }}>
    {children}
  </div>
);
const Penuh = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[300px]">{children}</div>;

const BIN_HUBUNGAN = [
  { id: "sejajar", label: "Sejajar", warna: "#BBF7D0" },
  { id: "tegak-lurus", label: "Tegak lurus", warna: "#FDE68A" },
  { id: "miring", label: "Bukan keduanya", warna: "#BFDBFE" },
];

const ruasBG = (s: SoalBG) => {
  const [x, y] = BENDA_GARIS[s.benda].pasangan[s.p];
  return { merah: x, biru: [y] };
};
const GambarBG = ({ s }: { s: SoalBG }) => {
  const g = ruasBG(s);
  return <BendaGarisSvg benda={s.benda} merah={g.merah} biru={g.biru} />;
};
const garisLipat = (id: string): GarisLipat => ({ a: LIPATAN[id].a, b: LIPATAN[id].b, warna: LIPATAN[id].warna });

/* ------------------------------ Concrete ------------------------------ */

function KartuBendaC(d: PropsLangkah) {
  return Kartu(d, 0, "k3b4c-benda", "Lihat benda dengan dua garis berwarna. Pilih hubungan kedua garis itu: sejajar, tegak lurus, atau bukan keduanya.", RONDE_BENDA_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Dua garis pada benda" teks="Garis sejajar jaraknya sama dan tidak bertemu. Garis tegak lurus bertemu pada sudut siku-siku. Lihat dua garis berwarna, lalu pilih hubungannya." />
      <PilihBertahap
        key={r}
        soal={RONDE_BENDA_CC[r].map((s, i): SoalBertahap => {
          const h = hubunganBG(s);
          const o = opsiHubungan(h, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <GambarBG s={s} />
              </Penuh>
            ),
            tanya: `Dua garis berwarna pada ${namaBG(s)} ini saling ...`,
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: PETUNJUK_HUBUNGAN,
            pesan: PESAN_HUBUNGAN[h],
          };
        })}
        onBeres={beres}
        pesanBeres="Semua hubungan garis sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuSemuaBendaC(d: PropsLangkah) {
  return Kartu(d, 1, "k3b4c-semuabenda", "Ketuk semua gambar benda yang dua garis berwarnanya cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_CC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_CC[r];
    const tanya = `Ketuk semua gambar yang dua garis berwarnanya ${KATA_HUBUNGAN[ro.hubungan]}.`;
    return (
      <>
        <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((s, i) => {
            const cocok = hubunganBG(s) === ro.hubungan;
            return {
              id: idBG(s),
              label: `${kapital(namaBG(s))} ${HURUF[i]}`,
              isi: (
                <Lebar w={116}>
                  <GambarBG s={s} />
                </Lebar>
              ),
              benar: cocok,
              penjelasan: `${kapital(namaBG(s))} ${HURUF[i]}: ${PESAN_HUBUNGAN[hubunganBG(s)]} ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuJodohBendaC(d: PropsLangkah) {
  return Kartu(d, 2, "k3b4c-jodohbenda", "Ketuk satu gambar benda di kiri, lalu ketuk hubungan kedua garis berwarnanya di kanan.", RONDE_JODOH_CC.length, "Jodohkan semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_CC[r];
    const kanan = ro.map((s) => ({ id: `h-${hubunganBG(s)}`, label: labelHubungan(hubunganBG(s)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan hubungan garis" teks="Lihat dua garis berwarna pada tiap benda. Jodohkan benda dengan hubungan garisnya." />
        <PasangKartu
          key={r}
          kiri={ro.map((s) => ({ id: idBG(s), label: kapital(namaBG(s)), isi: <Lebar w={120}><GambarBG s={s} /></Lebar> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((s) => [idBG(s), `h-${hubunganBG(s)}`]))}
          petunjuk={() => PETUNJUK_HUBUNGAN}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan hubungan garisnya."
        />
      </>
    );
  });
}

function KartuPilahBendaC(d: PropsLangkah) {
  return Kartu(d, 3, "k3b4c-pilahbenda", "Seret atau ketuk tiap gambar benda ke kotak: sejajar, tegak lurus, atau bukan keduanya.", RONDE_PILAH_CC.length, "Pilah semua gambarnya dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Pilah benda menurut garisnya" teks="Lihat dua garis berwarna pada tiap benda. Pilah benda ke kotak sejajar, tegak lurus, atau bukan keduanya." />
      <Sortir
        key={r}
        lebarItem={104}
        kolomBin={3}
        item={urutanKe(RONDE_PILAH_CC[r].length, r).map((i) => {
          const s = RONDE_PILAH_CC[r][i];
          const h = hubunganBG(s);
          return {
            id: `${idBG(s)}-${i}`,
            label: kapital(namaBG(s)),
            isi: <GambarBG s={s} />,
            bin: h,
            petunjuk: `Belum tepat. ${PESAN_HUBUNGAN[h]}`,
            ucapan: PESAN_HUBUNGAN[h],
          };
        })}
        bin={BIN_HUBUNGAN}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuSejajarDenganC(d: PropsLangkah) {
  return Kartu(d, 4, "k3b4c-sejajardengan", "Lihat satu garis merah dan beberapa garis biru. Hitung garis biru yang sejajar dengan garis merah.", RONDE_SEJAJARDENGAN_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung garis yang sejajar" teks="Garis sejajar jaraknya selalu sama dan tidak pernah bertemu. Hitung garis biru yang sejajar dengan garis merah." />
      <PilihBertahap
        key={r}
        soal={RONDE_SEJAJARDENGAN_CC[r].map((s, i): SoalBertahap => {
          const n = hitungSejajar(s);
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <BendaGarisSvg benda={s.benda} merah={s.merah} biru={s.lain} />
              </Penuh>
            ),
            tanya: `Ada berapa garis biru pada ${BENDA_GARIS[s.benda].nama} yang sejajar dengan garis merah?`,
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: "Belum tepat. Garis sejajar arahnya sama dengan garis merah dan tidak bertemu dengannya. Garis yang menyilang bukan sejajar.",
            pesan: `Ada ${n} garis biru yang sejajar dengan garis merah.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua garis sejajar sudah kamu hitung."
      />
    </>
  ));
}

function KartuTegakLurusDenganC(d: PropsLangkah) {
  return Kartu(d, 5, "k3b4c-tegaklurusdengan", "Lihat satu garis merah dan beberapa garis biru. Hitung garis biru yang tegak lurus dengan garis merah.", RONDE_TEGAKLURUS_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Hitung garis yang tegak lurus" teks="Garis tegak lurus bertemu pada sudut siku-siku. Hitung garis biru yang tegak lurus dengan garis merah." />
      <PilihBertahap
        key={r}
        soal={RONDE_TEGAKLURUS_CC[r].map((s, i): SoalBertahap => {
          const n = hitungTegakLurus(s);
          const o = opsiAngka(n, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <BendaGarisSvg benda={s.benda} merah={s.merah} biru={s.lain} />
              </Penuh>
            ),
            tanya: `Ada berapa garis biru pada ${BENDA_GARIS[s.benda].nama} yang tegak lurus dengan garis merah?`,
            opsi: o.map(String),
            jawab: o.indexOf(n),
            petunjuk: "Belum tepat. Garis tegak lurus bertemu dengan garis merah pada sudut siku-siku. Garis yang sejajar atau miring tidak dihitung.",
            pesan: `Ada ${n} garis biru yang tegak lurus dengan garis merah.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua garis tegak lurus sudah kamu hitung."
      />
    </>
  ));
}

function KartuLipatanC(d: PropsLangkah) {
  return Kartu(d, 6, "k3b4c-lipatan", "Lihat kertas berpetak dengan dua bekas lipatan berwarna. Pilih hubungan kedua lipatan.", RONDE_LIPATAN_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Dua lipatan pada kertas" teks="Bekas lipatan pada kertas adalah garis. Lihat dua bekas lipatan, lalu pilih apakah sejajar, tegak lurus, atau bukan keduanya." />
      <PilihBertahap
        key={r}
        soal={RONDE_LIPATAN_CC[r].map(([x, y], i): SoalBertahap => {
          const h = hubunganLipatan(x, y);
          const o = opsiHubungan(h, r * 2 + i);
          return {
            visual: (
              <div className="mx-auto w-full max-w-[210px]">
                <KertasLipatSvg garis={[garisLipat(x), garisLipat(y)]} />
              </div>
            ),
            tanya: "Dua bekas lipatan pada kertas ini saling ...",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: PETUNJUK_HUBUNGAN,
            pesan: PESAN_HUBUNGAN[h],
          };
        })}
        onBeres={beres}
        pesanBeres="Semua hubungan lipatan sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuBangunLipatC(d: PropsLangkah) {
  return Kartu(d, 7, "k3b4c-bangunlipat", "Lihat kertas dengan dua lipatan tegak dan dua lipatan mendatar. Pilih bangun yang terbentuk di tengah kertas.", RONDE_BANGUNLIPAT_CC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Bangun di tengah kertas" teks="Dua pasang garis sejajar bertemu dan membentuk sebuah bangun di tengah kertas. Hitung petaknya, lalu pilih nama bangunnya." />
      <PilihBertahap
        key={r}
        soal={RONDE_BANGUNLIPAT_CC[r].map((s, i): SoalBertahap => {
          const nama = bangunTengah(s);
          const salah: [string, string] = nama === "persegi" ? ["Persegi panjang", "Segitiga"] : ["Persegi", "Segitiga"];
          const o = susunOpsi(kapital(nama), salah, r * 2 + i);
          const garis: GarisLipat[] = [
            ...s.v.map((x) => ({ a: [x, 0] as [number, number], b: [x, s.h] as [number, number], warna: "#16A34A" })),
            ...s.hh.map((y) => ({ a: [0, y] as [number, number], b: [s.w, y] as [number, number], warna: "#F59E0B" })),
          ];
          const lebar = s.v[1] - s.v[0];
          const tinggi = s.hh[1] - s.hh[0];
          return {
            visual: (
              <div className="mx-auto w-full max-w-[230px]">
                <KertasLipatSvg w={s.w} h={s.h} garis={garis} tengah={[s.v[0], s.hh[0], s.v[1], s.hh[1]]} />
              </div>
            ),
            tanya: "Bangun apa yang terbentuk di tengah kertas (bagian kuning)?",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Hitung lebar dan tinggi bangun kuning dalam petak. Bila sama persegi, bila berbeda persegi panjang.",
            pesan: `Bangun kuning lebarnya ${lebar} petak dan tingginya ${tinggi} petak, jadi ${nama}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua bangun di tengah kertas sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuUrutLipatC(d: PropsLangkah) {
  return Kartu(d, 8, "k3b4c-urutlipat", "Hitung bekas lipatan pada tiap kertas. Ketuk kertas satu per satu dari yang paling sedikit atau paling banyak lipatannya.", RONDE_URUTLIPAT_CC.length, "Urutkan semua kertasnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUTLIPAT_CC[r];
    const ids = ro.kertas.map((_, i) => `k${i}`);
    const kunci = [...ids].sort((x, y) => (ro.dari === "kecil" ? ro.kertas[Number(x.slice(1))].length - ro.kertas[Number(y.slice(1))].length : ro.kertas[Number(y.slice(1))].length - ro.kertas[Number(x.slice(1))].length));
    const awal = ro.dari === "kecil" ? "paling sedikit" : "paling banyak";
    return (
      <>
        <IgilBicara pendek={`Urutkan dari yang ${awal} lipatannya`} teks="Hitung bekas lipatan berwarna pada tiap kertas. Lalu urutkan kertas menurut banyak lipatannya." />
        <UrutKetuk
          key={r}
          item={urutTampil(ids, kunci, r).map((id) => {
            const i = Number(id.slice(1));
            return { id, label: `Kertas ${HURUF[i]}`, isi: <Lebar w={110}><KertasLipatSvg ringkas garis={ro.kertas[i].map(garisLipat)} /></Lebar> };
          })}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={ro.dari === "kecil" ? "paling banyak" : "paling sedikit"}
          petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Hitung bekas lipatannya dengan teliti.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} lipatannya sudah benar.`}
        />
      </>
    );
  });
}

function KartuJodohLipatC(d: PropsLangkah) {
  return Kartu(d, 9, "k3b4c-jodohlipat", "Ketuk satu kertas berlipatan di kiri, lalu ketuk hubungan kedua lipatannya di kanan.", RONDE_JODOHLIPAT_CC.length, "Jodohkan semua kertasnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOHLIPAT_CC[r];
    const kanan = ro.map(([x, y]) => ({ id: `h-${hubunganLipatan(x, y)}`, label: labelHubungan(hubunganLipatan(x, y)), isi: null as React.ReactNode }));
    return (
      <>
        <IgilBicara pendek="Jodohkan lipatan dan hubungannya" teks="Lihat dua bekas lipatan pada tiap kertas. Jodohkan kertas dengan hubungan kedua lipatannya." />
        <PasangKartu
          key={r}
          kiri={ro.map(([x, y], i) => ({ id: `g${i}`, label: `Kertas ${HURUF[i]}`, isi: <Lebar w={104}><KertasLipatSvg ringkas garis={[garisLipat(x), garisLipat(y)]} /></Lebar> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map(([x, y], i) => [`g${i}`, `h-${hubunganLipatan(x, y)}`]))}
          petunjuk={() => PETUNJUK_HUBUNGAN}
          onBeres={beres}
          pesanBeres="Semua kertas sudah cocok dengan hubungan lipatannya."
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuJenisPasanganC(d: PropsLangkah) {
  return Kartu(d, 10, "k3b4c-jenispasangan", "Lihat sepasang garis pada kertas berpetak. Pilih hubungannya: sejajar, tegak lurus, atau bukan keduanya.", RONDE_JENIS_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Jenis pasangan garis" teks="Garis sejajar ditandai anak panah dan jaraknya sama. Garis tegak lurus bertemu pada sudut siku-siku. Pilih hubungan pasangan garis." />
      <PilihBertahap
        key={r}
        soal={RONDE_JENIS_PC[r].map((p, i): SoalBertahap => {
          const h = hubunganPG(p);
          const o = opsiHubungan(h, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <PetakSvg pasang={p} tanda={false} />
              </Penuh>
            ),
            tanya: "Pasangan garis merah dan biru ini ...",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: PETUNJUK_HUBUNGAN,
            pesan: PESAN_HUBUNGAN[h],
          };
        })}
        onBeres={beres}
        pesanBeres="Semua hubungan pasangan garis sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJarakC(d: PropsLangkah) {
  return Kartu(d, 11, "k3b4c-jarak", "Lihat jarak kedua garis di ujung kiri dan di ujung kanan. Garis sejajar jaraknya selalu sama. Pilih apakah kedua garis sejajar.", RONDE_JARAK_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Periksa jarak petak" teks="Hitung petak di ujung kiri dan di ujung kanan. Bila jaraknya sama, garisnya sejajar. Bila berbeda, garisnya bukan sejajar." />
      <PilihBertahap
        key={r}
        soal={RONDE_JARAK_PC[r].map((s, i): SoalBertahap => {
          const p = pasanganJarak(s);
          const sejajar = hubunganPG(p) === "sejajar";
          const o = (r * 2 + i) % 2 === 0 ? ["Sejajar", "Bukan sejajar"] : ["Bukan sejajar", "Sejajar"];
          return {
            visual: (
              <Penuh>
                <JarakPetakSvg jarak={s} pasang={p} />
              </Penuh>
            ),
            tanya: "Apakah kedua garis ini sejajar?",
            opsi: o,
            jawab: o.indexOf(sejajar ? "Sejajar" : "Bukan sejajar"),
            petunjuk: "Belum tepat. Bandingkan jarak di ujung kiri dan di ujung kanan. Sama berarti sejajar, berbeda berarti bukan sejajar.",
            pesan: sejajar ? `Jarak di kedua ujung sama, yaitu ${s.kiri} petak, jadi kedua garis sejajar.` : `Jarak di ujung kiri ${s.kiri} petak dan di ujung kanan ${s.kanan} petak berbeda, jadi bukan sejajar.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jarak petak sudah kamu periksa."
      />
    </>
  ));
}

function KartuJodohPasanganC(d: PropsLangkah) {
  return Kartu(d, 12, "k3b4c-jodohpasangan", "Ketuk satu gambar pasangan garis di kiri, lalu ketuk hubungannya di kanan.", RONDE_JODOH_PC.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_PC[r];
    const kanan = ro.map((p) => ({ id: `h-${hubunganPG(p)}`, label: labelHubungan(hubunganPG(p)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan pasangan garis dan hubungannya" teks="Periksa tiap pasangan garis. Jodohkan gambar dengan hubungannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `g${i}`, label: `Gambar ${HURUF[i]}`, isi: <Lebar w={104}><PetakSvg pasang={p} ringkas tanda={false} /></Lebar> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((p, i) => [`g${i}`, `h-${hubunganPG(p)}`]))}
          petunjuk={() => PETUNJUK_HUBUNGAN}
          onBeres={beres}
          pesanBeres="Semua gambar sudah cocok dengan hubungannya."
        />
      </>
    );
  });
}

function KartuSemuaPasanganC(d: PropsLangkah) {
  return Kartu(d, 13, "k3b4c-semuapasangan", "Ketuk semua gambar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_PC.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const ro = RONDE_SEMUA_PC[r];
    const tanya = `Ketuk semua gambar yang pasangan garisnya ${KATA_HUBUNGAN[ro.hubungan]}.`;
    return (
      <>
        <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanya}
          item={ro.item.map((p, i) => {
            const cocok = hubunganPG(p) === ro.hubungan;
            return {
              id: `p${i}`,
              label: `Gambar ${HURUF[i]}`,
              isi: <Lebar w={110}><PetakSvg pasang={p} ringkas tanda={false} /></Lebar>,
              benar: cocok,
              penjelasan: `Gambar ${HURUF[i]}: ${PESAN_HUBUNGAN[hubunganPG(p)]} ${cocok ? "Ini cocok." : "Ini belum cocok."}`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuPilahPasanganC(d: PropsLangkah) {
  return Kartu(d, 14, "k3b4c-pilahpasangan", "Seret atau ketuk tiap gambar pasangan garis ke kotak: sejajar, tegak lurus, atau bukan keduanya.", RONDE_PILAH_PC.length, "Pilah semua gambarnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Pilah pasangan garis" teks="Periksa tiap pasangan garis. Pilah gambar ke kotak sejajar, tegak lurus, atau bukan keduanya." />
      <Sortir
        key={r}
        lebarItem={104}
        kolomBin={3}
        item={urutanKe(RONDE_PILAH_PC[r].length, r).map((i) => {
          const p = RONDE_PILAH_PC[r][i];
          const h = hubunganPG(p);
          return {
            id: `p${i}`,
            label: `Gambar ${HURUF[i]}`,
            isi: <PetakSvg pasang={p} ringkas tanda={false} />,
            bin: h,
            petunjuk: `Belum tepat. ${PESAN_HUBUNGAN[h]}`,
            ucapan: `Gambar ${HURUF[i]}: ${PESAN_HUBUNGAN[h]}`,
          };
        })}
        bin={BIN_HUBUNGAN}
        onBeres={beres}
        pesanBeres="Semua gambar sudah masuk kotak yang tepat."
      />
    </>
  ));
}

function KartuTabelBangunC(d: PropsLangkah) {
  return Kartu(d, 15, "k3b4c-tabelbangun", "Ketuk baris tabel, lalu ketuk kartu ciri bangun datar yang tepat. Ada satu kartu yang tidak dipakai.", RONDE_TABEL_PC.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
    const t = RONDE_TABEL_PC[r];
    return (
      <>
        <CatatanTempel pendek="Isi tabel ciri bangun datar" teks="Ketuk baris tabel, lalu ketuk kartu ciri yang tepat. Ada satu kartu pengecoh." />
        <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={(b) => `Belum tepat. Hitung sisi dan sudut ${b.label.toLowerCase()}.`} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
      </>
    );
  });
}

function KartuMemoriBangunC(d: PropsLangkah) {
  return Kartu(d, 16, "k3b4c-memoribangun", "Balik dua kartu. Cari gambar bangun datar dan namanya.", RONDE_MEMORI_PC.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Memori bangun datar dan namanya" teks="Balik dua kartu. Cari kartu gambar bangun datar dan kartu namanya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_PC[r].map((j) => ({
          id: j,
          a: <Lebar w={104}><BangunSederhanaSvg jenis={j} ringkas /></Lebar>,
          labelA: `gambar ${BANGUN_SEDERHANA[j].nama.toLowerCase()}`,
          b: <Numeral n={BANGUN_SEDERHANA[j].nama} kelas="text-base" />,
          labelB: BANGUN_SEDERHANA[j].nama,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuLambangC(d: PropsLangkah) {
  return Kartu(d, 17, "k3b4c-lambang", "Lihat pasangan garis berhuruf. Pilih lambang yang tepat: ⊥ untuk tegak lurus atau // untuk sejajar.", RONDE_LAMBANG_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Lambang pasangan garis" teks="Tegak lurus ditulis dengan lambang tegak lurus, sejajar ditulis dengan dua garis miring. Pilih lambang yang tepat untuk pasangan garis ini." />
      <PilihBertahap
        key={r}
        soal={RONDE_LAMBANG_PC[r].map((s, i): SoalBertahap => {
          const o = opsiLambang(s, r * 2 + i);
          const h = hubunganPG(s.pasang);
          return {
            visual: (
              <Penuh>
                <PetakSvg pasang={s.pasang} huruf={s.huruf} tanda />
              </Penuh>
            ),
            tanya: "Lambang yang tepat untuk pasangan garis ini adalah ...",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Garis yang bertemu pada sudut siku-siku memakai lambang tegak lurus. Garis yang jaraknya sama memakai lambang sejajar.",
            pesan: `${o.opsi[o.jawab]}. ${PESAN_HUBUNGAN[h]}`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua lambang sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuSifatBangunC(d: PropsLangkah) {
  return Kartu(d, 18, "k3b4c-sifatbangun", "Lihat gambar bangun datar. Pilih ciri yang tepat: banyak sisi dan sudutnya.", RONDE_SIFAT_PC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Sisi dan sudut bangun datar" teks="Hitung sisi dan sudut bangun datar. Lingkaran dibatasi garis lengkung dan tidak punya sudut. Pilih ciri yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_SIFAT_PC[r].map((j, i): SoalBertahap => {
          const o = opsiCiri(j, r * 2 + i);
          return {
            visual: (
              <Penuh>
                <BangunSederhanaSvg jenis={j} />
              </Penuh>
            ),
            tanya: "Bangun datar ini memiliki ciri ...",
            opsi: o.opsi,
            jawab: o.jawab,
            petunjuk: "Belum tepat. Hitung ruas garis pembatasnya dan hitung sudutnya satu per satu.",
            pesan: `${BANGUN_SEDERHANA[j].nama}: ${BANGUN_SEDERHANA[j].ciri}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua ciri bangun datar sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuCalonC(d: PropsLangkah) {
  return Kartu(d, 19, "k3b4c-calon", "Garis biru sama di semua gambar. Ketuk gambar yang garis merahnya sejajar atau tegak lurus dengan garis biru.", RONDE_CALON_PC.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
    const ro = RONDE_CALON_PC[r];
    const urut = urutanKe(ro.kandidat.length, r);
    const pasang = (i: number): PasanganGaris => ({ r1: ro.kandidat[i], r2: ro.dasar });
    return (
      <>
        <CatatanTempel pendek="Pilih garis yang sejajar atau tegak lurus" teks="Garis biru tetap sama. Cari gambar yang garis merahnya sejajar atau tegak lurus dengan garis biru." />
        <KetukPilih
          key={r}
          kolom={3}
          item={urut.map((i, n) => ({ id: `c${i}`, label: `Gambar ${HURUF[n]}`, isi: <Lebar w={92}><PetakSvg pasang={pasang(i)} ringkas tanda={false} /></Lebar> }))}
          soal={ro.tanya.map((t) => {
            const i = ro.kandidat.findIndex((k) => hubungan(k, ro.dasar) === t && (t === "sejajar" || bertemu(k, ro.dasar)));
            return {
              tanya: `Ketuk gambar yang garis merahnya ${t === "sejajar" ? "sejajar" : "tegak lurus"} dengan garis biru.`,
              jawab: `c${i}`,
              petunjuk: PETUNJUK_HUBUNGAN,
              pesan: PESAN_HUBUNGAN[t],
            };
          })}
          onBeres={beres}
          pesanBeres="Semua gambar sudah kamu temukan."
        />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuIstilahC(d: PropsLangkah) {
  return Kartu(d, 20, "k3b4c-istilah", "Baca uraian. Pilih istilah garis yang tepat.", RONDE_ISTILAH_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Istilah garis" teks="Baca uraian dengan teliti. Pilih istilah yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_ISTILAH_QC[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Garis tegak lurus bertemu pada sudut siku-siku. Garis sejajar jaraknya selalu sama dan tidak bertemu.", pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua istilah sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuKalimatGarisC(d: PropsLangkah) {
  return Kartu(d, 21, "k3b4c-kalimat", "Lengkapi tiap kalimat tentang garis dan bangun datar dengan kata yang tepat.", RONDE_KALIMAT_QC.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Lengkapi kalimat garis dan bangun" teks="Baca tiap kalimat tentang garis dan bangun datar. Pilih kata yang tepat untuk bagian kosong." />
      <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QC[r]} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
    </>
  ));
}

function KartuArtiLambangC(d: PropsLangkah) {
  return Kartu(d, 22, "k3b4c-artilambang", "Baca atau tulis lambang garis. ⊥ dibaca tegak lurus dan // dibaca sejajar. Pilih jawaban yang tepat.", RONDE_LAMBANG_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Arti lambang garis" teks="Lambang tegak lurus dibaca tegak lurus. Lambang dua garis miring dibaca sejajar. Pilih jawaban yang tepat." />
      <PilihBertahap
        key={r}
        soal={RONDE_LAMBANG_QC[r].map((s, i): SoalBertahap => {
          const o = susunOpsi(s.benar, s.salah, r * 2 + i);
          return { tanya: s.tanya, opsi: o.opsi, jawab: o.jawab, petunjuk: "Belum tepat. Lambang ⊥ berarti tegak lurus, bertemu pada sudut siku-siku. Lambang // berarti sejajar, tidak pernah bertemu.", pesan: s.pesan };
        })}
        onBeres={beres}
        pesanBeres="Semua lambang sudah kamu pilih dengan tepat."
      />
    </>
  ));
}

function KartuJodohLambangC(d: PropsLangkah) {
  return Kartu(d, 23, "k3b4c-jodohlambang", "Ketuk satu lambang di kiri, lalu ketuk bacaannya di kanan.", RONDE_JODOH_QC.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_JODOH_QC[r];
    const kanan = ro.map((p, i) => ({ id: `n${i}`, label: p.kanan, isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan lambang dan bacaannya" teks="Lambang tegak lurus dibaca tegak lurus. Lambang dua garis miring dibaca sejajar. Jodohkan lambang dengan bacaannya." />
        <PasangKartu
          key={r}
          kiri={ro.map((p, i) => ({ id: `k${i}`, label: p.kiri, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`k${i}`, `n${i}`]))}
          petunjuk={() => "Belum cocok. Lambang ⊥ dibaca tegak lurus dan lambang // dibaca sejajar."}
          onBeres={beres}
          pesanBeres="Semua lambang sudah cocok dengan bacaannya."
        />
      </>
    );
  });
}

function KartuMemoriIstilahC(d: PropsLangkah) {
  return Kartu(d, 24, "k3b4c-memoriistilah", "Balik dua kartu. Cari istilah dan artinya.", RONDE_MEMORI_QC.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Memori istilah dan artinya" teks="Balik dua kartu. Cari kartu istilah dan kartu artinya." />
      <MemoriKartu
        key={r}
        kolom={2}
        pasangan={RONDE_MEMORI_QC[r].map((p, i) => ({
          id: `m${i}`,
          a: <span className="px-1 text-sm font-black leading-tight text-[#1C01A5]">{p.a}</span>,
          labelA: p.a,
          b: <span className="px-1 text-sm font-black leading-tight text-[#1C01A5]">{p.b}</span>,
          labelB: p.b,
        }))}
        onBeres={beres}
        pesanBeres="Semua pasangan sudah ketemu."
      />
    </>
  ));
}

function KartuBenarSalahGarisC(d: PropsLangkah) {
  return Kartu(d, 25, "k3b4c-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QC.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang garis dan bangun datar dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QC[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifBangunC(d: PropsLangkah) {
  return Kartu(d, 26, "k3b4c-detektif", "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", RONDE_DETEKTIF_QC.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QC[r];
    return (
      <>
        <CatatanPensil pendek="Detektif bangun datar" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
        <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(n) => `Benar, aku bilangan ${n}.`} />
      </>
    );
  });
}

function KartuPetaGarisC(d: PropsLangkah) {
  return Kartu(d, 27, "k3b4c-peta", "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QC.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QC[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuCeritaGarisC(d: PropsLangkah) {
  return Kartu(d, 28, "k3b4c-cerita", "Baca soal cerita. Hitung hasilnya, lalu pilih jawabannya.", RONDE_CERITA_QC.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const soal: SoalBertahap[] = RONDE_CERITA_QC[r].map((c, i) => {
      const o = opsiAngka(c.jawab, r * 2 + i);
      return { tanya: c.teks, opsi: o.map(String), jawab: o.indexOf(c.jawab), petunjuk: "Belum tepat. Baca ceritanya lagi. Apakah jumlah yang dicari digabung, atau jaraknya tetap sama?", pesan: c.pesan };
    });
    return (
      <>
        <CatatanPensil pendek="Soal cerita garis dan bangun" teks="Baca soal cerita dengan teliti. Ingat garis sejajar jaraknya selalu sama. Hitung hasilnya, lalu pilih jawabannya." />
        <PilihBertahap key={r} soal={soal} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    );
  });
}

function KartuSusunKataGarisC(d: PropsLangkah) {
  return Kartu(d, 29, "k3b4c-susunkata", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUNKATA_QC.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kata garis dan bangun" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUNKATA_QC[r].kata} pengecoh={RONDE_SUSUNKATA_QC[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuBendaC, KartuSemuaBendaC, KartuJodohBendaC, KartuPilahBendaC, KartuSejajarDenganC, KartuTegakLurusDenganC, KartuLipatanC, KartuBangunLipatC, KartuUrutLipatC, KartuJodohLipatC].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuJenisPasanganC, KartuJarakC, KartuJodohPasanganC, KartuSemuaPasanganC, KartuPilahPasanganC, KartuTabelBangunC, KartuMemoriBangunC, KartuLambangC, KartuSifatBangunC, KartuCalonC].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuIstilahC, KartuKalimatGarisC, KartuArtiLambangC, KartuJodohLambangC, KartuMemoriIstilahC, KartuBenarSalahGarisC, KartuDetektifBangunC, KartuPetaGarisC, KartuCeritaGarisC, KartuSusunKataGarisC].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK3B4C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🛤️", nama: "CONCRETE", cara: "Cari garis pada benda dan kertas lipat!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK3B4C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat garis pada kertas berpetak", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK3B4C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Istilah, lambang, dan ciri bangun", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_C34} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />}
    />
  );
}
